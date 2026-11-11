"""Testes de ponta a ponta da API. Rodar:  cd backend && python -m pytest -q   (ou: python tests/test_api.py)"""
import io
import os
import sys
import tempfile

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
_tmp = tempfile.mkdtemp()
os.environ["DATABASE_PATH"] = os.path.join(_tmp, "test.sqlite3")
os.environ["AI_PROVIDER"] = "fake"
os.environ["APP_SECRET"] = "x" * 40

from app import app  # noqa: E402

c = app.test_client()


def auth(email="admin@teste.com", name="Admin"):
    r = c.post("/api/auth/register", json={"name": name, "email": email, "password": "senha-forte-1"})
    if r.status_code == 409:
        r = c.post("/api/auth/login", json={"email": email, "password": "senha-forte-1"})
    return {"Authorization": "Bearer " + r.get_json()["token"]}


ADMIN = auth()
ALUNO = auth("aluno@teste.com", "Aluno")


def test_first_user_is_admin_and_second_is_not():
    assert c.get("/api/me", headers=ADMIN).get_json()["user"]["is_admin"] is True
    assert c.get("/api/me", headers=ALUNO).get_json()["user"]["is_admin"] is False
    assert c.get("/api/admin/overview", headers=ALUNO).status_code == 403


def test_login_errors_are_clear():
    r = c.post("/api/auth/login", json={"email": "aluno@teste.com", "password": "errada"})
    assert r.status_code == 401 and "incorretos" in r.get_json()["error"]
    assert c.get("/api/today").status_code == 401


def enroll(headers, role_name="Analista"):
    roles = c.get("/api/catalog", headers=headers).get_json()["roles"]
    role = next(r for r in roles if role_name in r["name"])
    assert c.post("/api/enrollments", json={"role_id": role["id"], "minutes_per_day": 120}, headers=headers).status_code == 200
    return role


def test_catalog_has_seed_packs():
    roles = c.get("/api/catalog", headers=ALUNO).get_json()["roles"]
    names = {r["name"] for r in roles}
    assert {"Analista de Tecnologia da Informação", "Escrivão de Polícia"} <= names
    ti = next(r for r in roles if r["name"].startswith("Analista"))
    assert ti["n_topics"] >= 150 and ti["n_lessons"] == ti["n_topics"]


def test_study_flow_lesson_questions_review():
    assert c.get("/api/today", headers=ALUNO).get_json().get("needs_onboarding")
    enroll(ALUNO)
    plan = c.get("/api/today", headers=ALUNO).get_json()
    lesson_task = next(t for t in plan["tasks"] if t["type"] == "aula")
    tid = lesson_task["topic_id"]
    topic = c.get(f"/api/topics/{tid}", headers=ALUNO).get_json()
    assert topic["lesson"]["body"] and topic["n_questions"] >= 1
    assert c.post(f"/api/topics/{tid}/done", headers=ALUNO).status_code == 200
    qs = c.get(f"/api/practice?topic_id={tid}&limit=5", headers=ALUNO).get_json()["questions"]
    assert qs and "answer" not in qs[0]
    r = c.post(f"/api/questions/{qs[0]['id']}/answer", json={"chosen": "Z", "seconds": 30}, headers=ALUNO).get_json()
    assert r["correct"] is False and r["answer"] in "ABCDE"
    # questão errada volta na revisão amanhã; a lista de erradas a inclui
    wrong = c.get("/api/practice?mode=erradas", headers=ALUNO).get_json()["questions"]
    assert any(q["id"] == qs[0]["id"] for q in wrong)
    t2 = c.get(f"/api/topics/{tid}", headers=ALUNO).get_json()
    assert t2["done"] and t2["stats"]["status"] == "estudando"


def test_flashcard_grading():
    roles = c.get("/api/catalog", headers=ALUNO).get_json()["roles"]
    assert roles
    plan = c.get("/api/trail", headers=ALUNO).get_json()
    tid = plan["subjects"][0]["topics"][0]["id"]
    cards = c.get(f"/api/topics/{tid}/flashcards", headers=ALUNO).get_json()["cards"]
    assert cards
    r = c.post(f"/api/flashcards/{cards[0]['id']}/grade", json={"grade": 3}, headers=ALUNO).get_json()
    assert r["interval_days"] >= 1


def test_personalized_simulado():
    enroll(ALUNO)
    aid = c.post("/api/simulados/start", json={"n": 20}, headers=ALUNO).get_json()["id"]
    at = c.get(f"/api/attempts/{aid}", headers=ALUNO).get_json()
    assert len(at["questions"]) == 20 and "answer" not in at["questions"][0]
    responses = {str(q["id"]): "A" for q in at["questions"][:10]}
    assert c.patch(f"/api/attempts/{aid}", json={"responses": responses}, headers=ALUNO).status_code == 200
    res = c.post(f"/api/attempts/{aid}/finish", json={}, headers=ALUNO).get_json()["result"]
    assert res["total"] == 20 and res["blank"] == 10 and res["subjects"]
    done = c.get(f"/api/attempts/{aid}", headers=ALUNO).get_json()
    assert "answer" in done["questions"][0]


def test_ai_generation_for_empty_topic():
    enroll(ALUNO, "Escrivão")
    trail = c.get("/api/trail", headers=ALUNO).get_json()
    penal = next(s for s in trail["subjects"] if s["name"] == "Direito Penal")
    tid = penal["topics"][0]["id"]
    assert not penal["topics"][0]["has_lesson"]
    r = c.post(f"/api/topics/{tid}/generate", json={}, headers=ALUNO).get_json()
    assert r["lesson"] and r["questions"] == 5 and r["flashcards"] == 4
    t = c.get(f"/api/topics/{tid}", headers=ALUNO).get_json()
    assert t["lesson"]["origin"] == "ia" and t["n_questions"] == 5
    assert c.post("/api/tutor", json={"topic_id": tid, "question": "O que é dolo?"}, headers=ALUNO).get_json()["answer"]


def test_edital_import():
    text = "CONTEÚDO PROGRAMÁTICO " + "Língua Portuguesa: crase, concordância. " * 10
    prop = c.post("/api/admin/edital/parse", data={"text": text}, headers=ADMIN).get_json()
    assert prop["subjects"][0]["existing_id"]  # Língua Portuguesa já existe e é reaproveitada
    r = c.post("/api/admin/edital/apply", json={"exam": {"org": "TJ Teste", "banca": "FGV"},
                                                "role": {"name": "Técnico Judiciário"}, "subjects": prop["subjects"]},
               headers=ADMIN).get_json()
    assert r["topics"] == 3
    st = c.get(f"/api/admin/roles/{r['role_id']}/structure", headers=ADMIN).get_json()
    assert [s["name"] for s in st["subjects"]] == ["Língua Portuguesa", "Direito Penal"]


def test_prior_exam_local_extraction_and_simulado():
    prova = "\n".join(
        f"{n}. Enunciado da questão número {n} sobre crase?\n(A) um\n(B) dois\n(C) três\n(D) quatro\n(E) cinco" for n in range(1, 6))
    gab = "1-A 2-B 3-C 4-D 5-X"
    r = c.post("/api/admin/prior-exams/extract",
               data={"prova": (io.BytesIO(prova.encode()), "prova.txt"), "gabarito_text": gab, "use_ai": "0"},
               headers=ADMIN, content_type="multipart/form-data").get_json()
    assert r["method"] == "local" and len(r["questions"]) == 5
    assert [q["answer"] for q in r["questions"]] == ["A", "B", "C", "D", "X"]
    sid = c.get("/api/admin/subjects", headers=ADMIN).get_json()["subjects"][0]["id"]
    for q in r["questions"]:
        q["subject_id"] = sid
    saved = c.post("/api/admin/prior-exams", json={"exam": {"title": "Prova Teste 2024", "banca": "Vunesp", "year": 2024,
                                                             "duration_min": 30, "publish": True},
                                                    "questions": r["questions"]}, headers=ADMIN).get_json()
    assert saved["saved"] == 5
    sims = c.get("/api/simulados", headers=ALUNO).get_json()["exams"]
    exam = next(e for e in sims if e["title"] == "Prova Teste 2024")
    aid = c.post("/api/simulados/start", json={"prior_exam_id": exam["id"]}, headers=ALUNO).get_json()["id"]
    at = c.get(f"/api/attempts/{aid}", headers=ALUNO).get_json()
    resp = {str(q["id"]): "A" for q in at["questions"]}
    res = c.post(f"/api/attempts/{aid}/finish", json={"responses": resp}, headers=ALUNO).get_json()["result"]
    assert res["correct"] == 2  # questão 1 certa + questão 5 anulada


def test_prior_exam_ai_extraction():
    prova = "\n".join(f"{n}. Texto da questão {n}" for n in range(1, 4))
    r = c.post("/api/admin/prior-exams/extract",
               data={"prova_text": prova, "gabarito_text": "1 A 2 B 3 C 4 D 5 E", "use_ai": "1"},
               headers=ADMIN, content_type="multipart/form-data").get_json()
    assert r["method"] == "ia" and [q["answer"] for q in r["questions"]] == ["A", "B", "C"]
    assert r["questions"][0]["subject_id"]  # "Língua Portuguesa" casou com a matéria existente


def test_question_import_with_duplicates():
    csv_text = ("enunciado;A;B;C;D;gabarito;materia;assunto\n"
                "Qual é a capital do Brasil?;Rio;Brasília;Salvador;Recife;B;Atualidades;Geografia\n"
                "Qual é a capital do Brasil?;Brasília;Rio;Salvador;Recife;A;Atualidades;Geografia\n")
    r = c.post("/api/admin/questions/import", data={"file": (io.BytesIO(csv_text.encode()), "q.csv"), "publish": "1"},
               headers=ADMIN, content_type="multipart/form-data").get_json()
    assert r["created"] == 1 and r["duplicates"] == 1


def test_discursive_and_stats():
    items = c.get("/api/discursivas", headers=ALUNO).get_json()["items"]
    did = items[0]["id"]
    r = c.post(f"/api/discursivas/{did}/answer", json={"text": "Resposta longa " * 10}, headers=ALUNO).get_json()
    assert r["score"] == 7
    s = c.get("/api/stats", headers=ALUNO).get_json()
    assert s["answered"] >= 1 and len(s["days"]) == 28


def test_spa_fallback_and_api_404():
    assert c.get("/api/nao-existe").status_code == 404


if __name__ == "__main__":
    import inspect

    fns = [(n, f) for n, f in globals().items() if n.startswith("test_") and inspect.isfunction(f)]
    for n, f in fns:
        f()
        print("ok", n)
    print(f"{len(fns)} testes passaram")
