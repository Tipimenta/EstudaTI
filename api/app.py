"""Estuda — plataforma de preparação para concursos.

Executar localmente:  python app.py   (abre em http://localhost:8000)
Produção:            gunicorn -w 2 -k gthread --threads 8 -b 0.0.0.0:$PORT app:app
"""
from __future__ import annotations

import os

from flask import Flask, jsonify, request, send_from_directory
from werkzeug.exceptions import HTTPException

import ai
from auth import ApiError, secret_key, check_password, clear_rate, current_user, hash_password, login_required, make_token, rate_limit
from db import close_cached, now, tx
from schema import migrate

STATIC_DIR = os.getenv("STATIC_DIR", os.path.join(os.path.dirname(__file__), "..", "web", "dist"))


def create_app() -> Flask:
    app = Flask(__name__, static_folder=None)
    if len(os.getenv("APP_SECRET", "")) < 32:
        print("AVISO: defina APP_SECRET (32+ caracteres). Sem ela, todos saem da conta a cada reinício.", flush=True)
    secret_key()  # gera antes dos workers se APP_SECRET faltar, para todos usarem a mesma chave
    app.config["MAX_CONTENT_LENGTH"] = int(os.getenv("MAX_UPLOAD_MB", "40")) * 1024 * 1024

    with tx() as db:
        migrate(db)
    if os.getenv("SEED_ON_START", "1") == "1":
        from conteudo.loader import seed_if_empty

        seed_if_empty()
    close_cached()  # com --preload, o processo principal não deve repassar a conexão aos workers

    from api_admin import bp as admin_bp
    from api_study import bp as study_bp

    app.register_blueprint(study_bp)
    app.register_blueprint(admin_bp)

    @app.errorhandler(ApiError)
    def api_error(e: ApiError):
        return jsonify({"error": e.message}), e.status

    @app.errorhandler(HTTPException)
    def http_error(e: HTTPException):
        if request.path.startswith("/api/"):
            msg = {404: "Não encontrado.", 405: "Método não permitido.", 413: "Arquivo grande demais."}.get(e.code, e.description)
            return jsonify({"error": msg}), e.code
        return e

    @app.errorhandler(Exception)
    def unexpected(e: Exception):
        app.logger.exception("Erro inesperado")
        return jsonify({"error": "Algo deu errado no servidor. Tente de novo; se continuar, veja os logs."}), 500

    @app.after_request
    def headers(resp):
        resp.headers.setdefault("X-Content-Type-Options", "nosniff")
        resp.headers.setdefault("Referrer-Policy", "same-origin")
        if request.path.startswith("/api/"):
            resp.headers["Cache-Control"] = "no-store"
        return resp

    @app.get("/api/health")
    def health():
        return {"ok": True}

    @app.get("/api/config")
    def config():
        with tx() as db:
            has_users = bool(db.val("SELECT COUNT(*) FROM users", (), 0))
        return {"ai": ai.status(), "has_users": has_users,
                "signup": os.getenv("ALLOW_SIGNUP", "1") == "1" or not has_users}

    @app.post("/api/auth/register")
    def register():
        body = request.get_json(force=True, silent=True) or {}
        name = str(body.get("name", "")).strip()[:80]
        email = str(body.get("email", "")).strip().lower()[:160]
        password = str(body.get("password", ""))
        rate_limit("reg:" + (request.remote_addr or ""), 20, 3600)
        if not name or "@" not in email or len(password) < 8:
            raise ApiError(400, "Informe nome, um e-mail válido e uma senha com pelo menos 8 caracteres.")
        with tx() as db:
            first = not db.val("SELECT COUNT(*) FROM users", (), 0)
            admin_email = os.getenv("ADMIN_EMAIL", "").strip().lower()
            if admin_email:
                # Com ADMIN_EMAIL definido, só esse e-mail vira administrador (protege o site recém-publicado).
                first = email == admin_email and not db.one("SELECT id FROM users WHERE is_admin=1")
            if not first and os.getenv("ALLOW_SIGNUP", "1") != "1":
                raise ApiError(403, "Novos cadastros estão fechados. Peça acesso ao administrador.")
            if db.one("SELECT id FROM users WHERE email=?", (email,)):
                raise ApiError(409, "Já existe uma conta com esse e-mail. Entre com sua senha.")
            uid = db.insert("users", {"email": email, "name": name, "password_hash": hash_password(password),
                                      "is_admin": 1 if first else 0, "created_at": now()})
        return {"token": make_token(uid), "user": {"id": uid, "name": name, "email": email, "is_admin": first}}

    @app.post("/api/auth/login")
    def login():
        body = request.get_json(force=True, silent=True) or {}
        email = str(body.get("email", "")).strip().lower()
        key = "login:" + (request.remote_addr or "") + email
        rate_limit(key)
        with tx() as db:
            user = db.one("SELECT * FROM users WHERE email=?", (email,))
        if not user or not check_password(str(body.get("password", "")), user["password_hash"]):
            raise ApiError(401, "E-mail ou senha incorretos.")
        clear_rate(key)
        return {"token": make_token(user["id"]),
                "user": {"id": user["id"], "name": user["name"], "email": user["email"], "is_admin": bool(user["is_admin"])}}

    @app.get("/api/me")
    @login_required
    def me():
        user = current_user()
        with tx() as db:
            enrollments = db.q(
                """SELECT e.id, e.role_id, e.exam_date, e.minutes_per_day, e.active, r.name AS role, r.question_style,
                          x.org, x.name AS exam, x.banca
                   FROM enrollments e JOIN roles r ON r.id=e.role_id JOIN exams x ON x.id=r.exam_id
                   WHERE e.user_id=? ORDER BY e.active DESC, e.id DESC""",
                (user["id"],),
            )
        return {"user": {**user, "is_admin": bool(user["is_admin"])}, "enrollments": enrollments,
                "active": next((e for e in enrollments if e["active"]), None), "ai": ai.status()}

    # Front-end (build do Vite) servido pelo mesmo processo: um só endereço, um só deploy.
    @app.get("/")
    @app.get("/<path:path>")
    def spa(path: str = ""):
        if path.startswith("api/"):
            raise ApiError(404, "Não encontrado.")
        full = os.path.join(STATIC_DIR, path)
        if path and os.path.isfile(full):
            resp = send_from_directory(STATIC_DIR, path)
            if path.startswith("assets/"):
                resp.headers["Cache-Control"] = "public, max-age=31536000, immutable"
            return resp
        if not os.path.isfile(os.path.join(STATIC_DIR, "index.html")):
            return ("Interface não compilada. Rode 'npm run build' em frontend/ ou use o Docker.", 503)
        resp = send_from_directory(STATIC_DIR, "index.html")
        resp.headers["Cache-Control"] = "no-cache"
        return resp

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=os.getenv("FLASK_DEBUG") == "1")
