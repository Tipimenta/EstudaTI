"""Testes de ponta a ponta da API. Rodar:  cd api && python -m pytest -q testes_estuda   (ou: python testes_estuda/test_api.py)"""
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
    # Resposta incorreta precisa ser uma opção existente: letra inválida é erro 400.
    from db import tx
    with tx() as db:
        answer = db.one("SELECT answer,options FROM questions WHERE id=?", (qs[0]["id"],))
    from db import loads
    wrong = next(l for l in "ABCDE"[:len(loads(answer["options"], []))] if l != answer["answer"])
    r = c.post(f"/api/questions/{qs[0]['id']}/answer",
               json={"chosen": wrong, "seconds": 30}, headers=ALUNO).get_json()
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



def test_estuda_dominio_nao_depende_de_cinco_questoes():
    """Questões escassas não devem tornar o status Dominado impossível."""
    from db import tx
    headers = auth("dominio-2dias@teste.local", "Retenção")
    enroll(headers)
    tid = next(
        t["id"] for sub in c.get("/api/trail", headers=headers).get_json()["subjects"]
        for t in sub["topics"] if t["name"] == "Modelo OSI e TCP/IP"
    )
    uid = c.get("/api/me", headers=headers).get_json()["user"]["id"]
    with tx() as db:
        qs = db.q("SELECT id, answer FROM questions WHERE topic_id=? ORDER BY id LIMIT 2", (tid,))
    assert len(qs) == 2
    assert c.post(f"/api/topics/{tid}/done", headers=headers).status_code == 200
    with tx() as db:
        for q in qs:
            db.insert("answers", {"user_id": uid, "question_id": q["id"],
                                  "chosen": q["answer"], "correct": 1,
                                  "context": "treino", "seconds": 30,
                                  "created_at": "2026-11-10T12:00:00+00:00"})
    first = c.get(f"/api/topics/{tid}", headers=headers).get_json()["stats"]
    assert first["status"] == "estudando"
    assert first["study_days"] == 1
    with tx() as db:
        for q in qs:
            db.insert("answers", {"user_id": uid, "question_id": q["id"],
                                  "chosen": q["answer"], "correct": 1,
                                  "context": "revisao", "seconds": 20,
                                  "created_at": "2026-11-11T12:00:00+00:00"})
    final = c.get(f"/api/topics/{tid}", headers=headers).get_json()["stats"]
    assert final["status"] == "dominado"
    assert final["study_days"] == 2 and final["attempts"] == 4
    assert final["accuracy"] == 1.0


def test_estuda_conclusao_repetida_nao_inflaciona_atividade():
    headers = auth("conclusao-unica@teste.local", "Conclusão")
    enroll(headers)
    tid = next(
        t["id"] for s in c.get("/api/trail", headers=headers).get_json()["subjects"]
        for t in s["topics"] if t.get("has_lesson")
    )
    before = c.get("/api/today", headers=headers).get_json()["today"]
    first = c.post(f"/api/topics/{tid}/done", headers=headers).get_json()
    once = c.get("/api/today", headers=headers).get_json()["today"]
    again = c.post(f"/api/topics/{tid}/done", headers=headers).get_json()
    twice = c.get("/api/today", headers=headers).get_json()["today"]
    assert first["newly_completed"] is True
    assert again["newly_completed"] is False
    assert once["items"] == before["items"] + 1
    assert twice["items"] == once["items"] and twice["minutes"] == once["minutes"]


def test_estuda_guias_especificos_existentes_em_todos_os_grupos():
    from conteudo.aprofundamentos import SUPPLEMENTS, apply_supplement
    import json
    from pathlib import Path
    file = Path(HERE) / "conteudo" / "packs" / "ti_birigui.json"
    pack = json.loads(file.read_text(encoding="utf-8"))
    real = {(sub["name"], topic["name"]):
            topic["lesson"] for sub in pack["subjects"] for topic in sub["topics"]}
    assert len(SUPPLEMENTS) == 169
    assert set(SUPPLEMENTS) == set(real)
    unique_material = set()
    for key in SUPPLEMENTS:
        text = SUPPLEMENTS[key].strip()
        assert len(text.split()) >= 85, f"Material insuficiente: {key}"
        assert text not in unique_material, f"Complemento repetido: {key}"
        unique_material.add(text)
        res = apply_supplement(key[0], key[1], real[key])
        assert len(res["body"]) > len(real[key]["body"])
        assert "## Aprofundamento" in res["body"]
        assert res["editorial_revision"].startswith("2.2-")
        # A composição deve ser idempotente, sem duplicar a revisão.
        second = apply_supplement(key[0], key[1], res)
        assert second["body"] == res["body"]


def test_estuda_feedback_gratuito_usa_trecho_especifico_de_aula():
    headers = auth("feedback-material@teste.local", "Treino de explicação")
    enroll(headers)
    tr = c.get("/api/trail", headers=headers).get_json()
    t = next(t for s in tr["subjects"] for t in s["topics"]
             if t["name"] == "Modelo OSI e TCP/IP")
    qs = c.get(f"/api/practice?topic_id={t['id']}&limit=5", headers=headers).get_json()["questions"]
    assert qs
    q = qs[0]
    correct = c.post(f"/api/questions/{q['id']}/answer",
                     headers=headers, json={"chosen": "A", "context": "treino", "seconds": 5})
    assert correct.status_code == 200
    explain = c.post(f"/api/questions/{q['id']}/explain",
                     headers=headers, json={"chosen": "A"})
    assert explain.status_code == 200
    result = explain.get_json()
    assert result["source"] == "editorial"
    assert result["ai_used"] is False
    assert "Reforce o conceito na aula" in result["explanation"]
    assert "Modo gratuito, sem IA" in result["explanation"]


def test_estuda_tutor_exige_modo_valido():
    headers = auth("tutor-modos@teste.local", "Tutor")
    enroll(headers)
    tid = next(
        t["id"] for s in c.get("/api/trail", headers=headers).get_json()["subjects"]
        for t in s["topics"] if t.get("has_lesson")
    )
    assert c.post("/api/tutor", json={"topic_id": tid, "mode": "invalido",
                                      "question": "Explique"}, headers=headers).status_code == 400
    r = c.post("/api/tutor", json={"topic_id": tid, "mode": "do_zero",
                                   "question": "Explique o assunto do zero."},
               headers=headers)
    assert r.status_code == 200
    assert r.get_json()["mode"] == "do_zero"
    assert r.get_json()["source"] == "material"
    assert r.get_json()["ai_used"] is False
    assert r.get_json()["answer"]
    assert "Modo gratuito, sem IA" in r.get_json()["answer"]
    r2 = c.post("/api/tutor", json={"topic_id": tid, "mode": "exemplo",
                                    "question": "Explique com um caso real.",
                                    "use_ai": True}, headers=headers)
    assert r2.status_code == 200
    assert r2.get_json()["source"] == "ai" and r2.get_json()["ai_used"] is True


def test_estuda_exportacao_privada_nao_vaza_hash_ou_dados_de_outra_conta():
    first = auth("export-privado-1@teste.local", "Exportação A")
    second = auth("export-privado-2@teste.local", "Exportação B")
    enroll(first)
    enroll(second)
    assert c.get("/api/account/export").status_code == 401
    result = c.get("/api/account/export", headers=first)
    assert result.status_code == 200
    payload = result.get_json()
    assert payload["format"] == "estuda-study-export-v1"
    assert payload["profile"]["email"] == "export-privado-1@teste.local"
    assert "password_hash" not in payload["profile"]
    assert "token" not in payload
    assert "lesson_progress" in payload["data"]
    assert "reviews" in payload["data"]
    assert "answers" in payload["data"]
    assert all(e["user_id"] == payload["profile"]["id"] for e in payload["data"]["enrollments"])


def test_estuda_auditoria_pedagogica_so_para_admin_e_sem_dados_pessoais():
    student = auth("auditoria-aluno@teste.local", "Estudante")
    assert c.get("/api/admin/content-quality", headers=student).status_code == 403
    result = c.get("/api/admin/content-quality", headers=ADMIN)
    assert result.status_code == 200
    audit = result.get_json()
    assert audit["with_lesson"] >= 169
    assert audit["deepened"] >= 36
    assert audit["topics"]
    assert "issues" in audit["topics"][0]
    assert "body" not in audit["topics"][0]
    assert "email" not in audit["topics"][0]


def test_estuda_nao_registra_resposta_vazia_e_nao_expoe_rascunho():
    from db import tx
    headers = auth("seguranca-questoes@teste.local", "Proteger respostas")
    enroll(headers)
    q = c.get("/api/practice?limit=4", headers=headers).get_json()["questions"][0]
    qid = q["id"]
    for chosen in ("", "Z", "?"):
        r = c.post(f"/api/questions/{qid}/answer",
                   headers=headers, json={"chosen": chosen, "context": "treino"})
        assert r.status_code == 400
    uid = c.get("/api/me", headers=headers).get_json()["user"]["id"]
    with tx() as db:
        assert db.val("SELECT COUNT(*) FROM answers WHERE user_id=? AND question_id=?",
                      (uid, qid), 0) == 0
        db.x("UPDATE questions SET status='rascunho' WHERE id=?", (qid,))
    try:
        r = c.post(f"/api/questions/{qid}/answer",
                   headers=headers, json={"chosen": "A"})
        assert r.status_code == 404
        r2 = c.post(f"/api/questions/{qid}/explain",
                    headers=headers, json={"chosen": "A"})
        assert r2.status_code == 404
    finally:
        with tx() as db:
            db.x("UPDATE questions SET status='publicada' WHERE id=?", (qid,))


def test_estuda_rejeita_revisao_de_flashcard_inexistente():
    headers = auth("cartao-inexistente@teste.local", "Cartão")
    enroll(headers)
    r = c.post("/api/flashcards/999999999/grade",
               headers=headers, json={"grade": 3})
    assert r.status_code == 404


if __name__ == "__main__":
    import inspect

    fns = [(n, f) for n, f in globals().items() if n.startswith("test_") and inspect.isfunction(f)]
    for n, f in fns:
        f()
        print("ok", n)
    print(f"{len(fns)} testes passaram")


def test_anotacao_nao_conclui_aula():
    """Anotar é diferente de estudar: não deve inflar o progresso."""
    headers = auth("anotacoes-regressao@teste.local", "Anotações")
    role = enroll(headers)
    tr = c.get("/api/trail", headers=headers).get_json()
    tid = tr["subjects"][0]["topics"][0]["id"]
    before = c.get(f"/api/topics/{tid}", headers=headers).get_json()
    assert before["done"] is False and before["stats"]["status"] == "novo"
    assert c.post(f"/api/topics/{tid}/notes", json={"notes": "Minha dúvida inicial"},
                  headers=headers).status_code == 200
    after = c.get(f"/api/topics/{tid}", headers=headers).get_json()
    assert after["notes"] == "Minha dúvida inicial"
    assert after["done"] is False
    assert after["stats"]["status"] == "novo"
    assert c.post(f"/api/topics/{tid}/done", headers=headers).status_code == 200
    studied = c.get(f"/api/topics/{tid}", headers=headers).get_json()
    assert studied["done"] is True and studied["stats"]["status"] == "estudando"


def test_explicacao_sem_credito_ia_e_sem_gabarito_antecipado():
    headers = auth("explicacao-regressao@teste.local", "Explicação")
    enroll(headers)
    qs = c.get("/api/practice?limit=10", headers=headers).get_json()["questions"]
    qid = next(q["id"] for q in qs if q["kind"] == "multipla")
    # Antes de responder não deve ser possível revelar o gabarito por esta rota.
    early = c.post(f"/api/questions/{qid}/explain", json={"chosen": "A"}, headers=headers)
    assert early.status_code == 409
    response = c.post(f"/api/questions/{qid}/answer", json={"chosen": "A"}, headers=headers)
    assert response.status_code == 200
    explanation = c.post(f"/api/questions/{qid}/explain", json={"chosen": "A"}, headers=headers)
    assert explanation.status_code == 200
    payload = explanation.get_json()
    assert payload["explanation"].strip() and payload["source"] == "editorial"
    assert payload["ai_used"] is False


def test_aprofundamento_pedagogico_preserva_dados_do_aluno():
    headers = auth("aprof-regressao@teste.local", "Aprofundamento")
    enroll(headers)
    tr = c.get("/api/trail", headers=headers).get_json()
    t = next((x for subject in tr["subjects"] for x in subject["topics"] if x["name"] == "Modelo OSI e TCP/IP"), None)
    assert t is not None
    response = c.get(f"/api/topics/{t['id']}", headers=headers).get_json()
    lesson = response["lesson"]
    assert "Aprofundamento 2.2" in lesson["body"]
    assert "Bit I/G" in lesson["body"] and "Bit U/L" in lesson["body"]
    from conteudo.aprofundamentos import REVISION
    assert lesson["editorial_revision"] == REVISION
    assert response["done"] is False
