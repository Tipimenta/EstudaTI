#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/api"
[ -d .venv-estuda ] || { python3 -m venv .venv-estuda; . .venv-estuda/bin/activate; pip install -r requirements-estuda.txt; }
. .venv-estuda/bin/activate
[ -f ../.env ] && set -a && . ../.env && set +a
echo "Estuda rodando em http://localhost:8000"
python app.py
