#!/usr/bin/env python3
"""Diagnóstico de produção do Estuda 2.2 sem instalar bibliotecas.

python scripts/verificar_producao.py
python scripts/verificar_producao.py --email usuario@dominio.com

O login é opcional; a senha é solicitada no terminal e nunca impressa.
Este script não grava em nenhuma tabela de produção.
"""
from __future__ import annotations

import argparse
import getpass
import json
import sys
import urllib.error
import urllib.request

DEFAULT_RENDER = "https://estudati-api.onrender.com"
DEFAULT_VERCEL = "https://estudati.vercel.app"


def request_json(base, path, *, payload=None, token="", timeout=120):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(base.rstrip("/") + path, data=data,
                                 method="POST" if payload is not None else "GET")
    req.add_header("Accept", "application/json")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read())
        except (ValueError, UnicodeDecodeError):
            return e.code, {"error": "Resposta não-JSON"}
    except Exception as e:
        return 0, {"error": f"{type(e).__name__}: {e}"}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--render", default=DEFAULT_RENDER)
    p.add_argument("--vercel", default=DEFAULT_VERCEL)
    p.add_argument("--email", default="")
    args = p.parse_args()
    errors = []

    def verify(ok, title, detail=""):
        print(("[OK] " if ok else "[ERRO] ") + title + (": " + detail if detail else ""))
        if not ok:
            errors.append(title)

    status, health = request_json(args.render, "/api/health")
    verify(status == 200 and health.get("ok") is True, "Render responde", str(status))
    verify(health.get("version") == "2.2", "Versão 2.2", str(health.get("version")))
    verify(health.get("database") == "postgres", "Banco PostgreSQL", str(health.get("database")))
    verify(health.get("schema") == "estuda", "Esquema isolado", str(health.get("schema")))
    verify(health.get("secret_ok") is True, "APP_SECRET configurado")
    c = health.get("counts") or {}
    verify(c.get("roles", 0) >= 2, "Cargos carregados", str(c.get("roles", 0)))
    verify(c.get("lessons", 0) >= 169, "Aulas cadastradas", str(c.get("lessons", 0)))
    editorial = health.get("editorial") or {}
    verify(editorial.get("supplements") == 169, "Aprofundamentos em todos os tópicos",
           str(editorial.get("supplements")))
    verify(str(editorial.get("revision", "")).startswith("2.2-editorial-"),
           "Revisão editorial do Estuda 2.2", str(editorial.get("revision")))
    print("   Contagens (não são dados pessoais):", {
        key: c.get(key, 0) for key in ("roles", "topics", "lessons", "questions", "flashcards")
    })

    v_status, v_health = request_json(args.vercel, "/api/health")
    verify(v_status == 200 and v_health.get("ok") is True, "Vercel encaminha /api/", str(v_status))
    for key in ("version", "database", "schema", "secret_ok", "counts", "editorial"):
        verify(v_health.get(key) == health.get(key),
               "Vercel e Render concordam em " + key)

    if args.email:
        password = getpass.getpass("Senha do Estuda (não aparece): ")
        status, result = request_json(args.render, "/api/auth/login",
                                      payload={"email": args.email, "password": password})
        password = ""
        tok = result.get("token")
        verify(status == 200 and bool(tok), "Login com conta existente", str(status))
        if tok:
            for path in ("/api/me", "/api/catalog", "/api/today", "/api/trail"):
                st, response = request_json(args.render, path, token=tok)
                if st == 409 and path == "/api/trail":
                    print("[AVISO] Conta ainda sem concurso ativo.")
                else:
                    verify(st == 200, "Acesso autenticado a " + path, str(st))

    print("\n" + ("Validação sem falhas nas verificações executadas." if not errors
                  else f"Validação incompleta: {len(errors)} falha(s)."))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
