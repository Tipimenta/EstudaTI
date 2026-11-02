"""Contrato de persistência PostgreSQL, executado apenas com instância de testes isolada.

A CI inicia um contêiner Postgres efêmero e passa ESTUDATI_PG_TEST_URL.
Nunca apontar ESTUDATI_PG_TEST_URL para o Neon de produção.
"""
import importlib
import os
import sys

import pytest
from fastapi.testclient import TestClient


@pytest.mark.skipif(
    not os.getenv("ESTUDATI_PG_TEST_URL"),
    reason="O PostgreSQL isolado não foi configurado (CI opcional).",
)
def test_postgres_seed_login_and_persistence():
    url = os.environ["ESTUDATI_PG_TEST_URL"]
    # Evita execução acidental em banco remoto ou com credenciais reais.
    if not (url.startswith("postgresql://estudati_test@") and
            ("@localhost:" in url or "@127.0.0.1:" in url)):
        pytest.fail("O alvo do teste deve ser PostgreSQL local descartável.")
    os.environ["DATABASE_URL"] = url
    os.environ["APP_PASSWORD"] = "senha-exclusiva-de-teste-12345678"
    os.environ["APP_SECRET"] = "segredo-exclusivo-de-teste-" * 3
    os.environ["ENABLE_MONITOR"] = "false"
    sys.modules.pop("main", None)
    import main
    importlib.reload(main)
    main.init_db()

    app = TestClient(main.app)
    assert app.post("/api/login",
                    json={"password": os.environ["APP_PASSWORD"]}).status_code == 200
    assert app.get("/api/me").status_code == 200
    assert app.get("/api/dashboard").json()["question_count"] == 321
    assert len(app.get("/api/topics").json()) == 169

    # Criação e segunda leitura em conexões distintas.
    old = app.get("/api/settings").json()
    changed = app.patch("/api/settings", json={"daily_minutes": 75})
    assert changed.status_code in (200, 204), changed.text
    assert app.get("/api/settings").json()["daily_minutes"] == 75

    # A segunda execução do seed nunca recria histórico nem duplica questões.
    main.init_db()
    assert app.get("/api/dashboard").json()["question_count"] == 321
    assert app.get("/api/settings").json()["daily_minutes"] == 75
