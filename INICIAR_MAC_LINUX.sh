#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/backend"
[ -d .venv ] || { python3 -m venv .venv; . .venv/bin/activate; pip install -r requirements.txt; }
. .venv/bin/activate
[ -f ../.env ] && set -a && . ../.env && set +a
echo "Estuda rodando em http://localhost:8000"
python app.py
