"""Contas de usuário: senha com PBKDF2 (biblioteca padrão) e token assinado (itsdangerous)."""
from __future__ import annotations

import hashlib
import hmac
import os
import secrets
import time
from functools import wraps

from flask import g, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from db import tx
from version import APP_SECRET_MIN_LENGTH

TOKEN_DAYS = 30
_attempts: dict[str, list[float]] = {}


class ApiError(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status
        self.message = message


def secret_key() -> str:
    key = os.getenv("APP_SECRET", "")
    if len(key) < APP_SECRET_MIN_LENGTH:
        # Em desenvolvimento gera uma chave por processo; em produção, defina APP_SECRET.
        key = os.environ.setdefault("APP_SECRET", secrets.token_hex(32))
    return key


def _serializer():
    return URLSafeTimedSerializer(secret_key(), salt="estuda-login")


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 310_000).hex()
    return f"pbkdf2${salt}${digest}"


def check_password(password: str, stored: str) -> bool:
    try:
        _, salt, digest = stored.split("$", 2)
    except ValueError:
        return False
    test = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 310_000).hex()
    return hmac.compare_digest(test, digest)


def make_token(user_id: int) -> str:
    return _serializer().dumps({"uid": user_id})


def rate_limit(key: str, limit: int = 10, window: int = 600):
    t = time.time()
    hist = [x for x in _attempts.get(key, []) if x > t - window]
    if len(hist) >= limit:
        raise ApiError(429, "Muitas tentativas. Aguarde alguns minutos e tente de novo.")
    hist.append(t)
    _attempts[key] = hist


def clear_rate(key: str):
    _attempts.pop(key, None)


def current_user():
    header = request.headers.get("Authorization", "")
    token = header[7:] if header.startswith("Bearer ") else ""
    if not token:
        return None
    try:
        data = _serializer().loads(token, max_age=TOKEN_DAYS * 86400)
    except (BadSignature, SignatureExpired):
        return None
    with tx() as db:
        return db.one("SELECT id,email,name,is_admin FROM users WHERE id=?", (data.get("uid"),))


def login_required(fn):
    @wraps(fn)
    def wrapper(*a, **k):
        user = current_user()
        if not user:
            raise ApiError(401, "Entre na sua conta para continuar.")
        g.user = user
        return fn(*a, **k)

    return wrapper


def admin_required(fn):
    @wraps(fn)
    def wrapper(*a, **k):
        user = current_user()
        if not user:
            raise ApiError(401, "Entre na sua conta para continuar.")
        if not user["is_admin"]:
            raise ApiError(403, "Somente administradores podem fazer isso.")
        g.user = user
        return fn(*a, **k)

    return wrapper
