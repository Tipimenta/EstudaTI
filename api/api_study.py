"""Rotas do aluno: catálogo, matrícula, plano do dia, trilha, aulas, questões, revisão, simulados, desempenho."""
from __future__ import annotations

import os
import random
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone

from flask import Blueprint, g, request

import ai
import planner
import srs
from auth import ApiError, login_required
from db import dumps, fingerprint, loads, now, today, tx
from conteudo.aprofundamentos import apply_supplement
from conteudo.consulta_guiada import answer_from_material

bp = Blueprint("study", __name__, url_prefix="/api")
_ai_usage: dict[tuple[int, str], int] = {}


def body() -> dict:
    return request.get_json(force=True, silent=True) or {}


def active_enrollment(db, user_id: int) -> dict:
    e = db.one("SELECT * FROM enrollments WHERE user_id=? AND active=1 ORDER BY id DESC LIMIT 1", (user_id,))
    if not e:
        raise ApiError(409, "Escolha um concurso para começar.")
    return e


def role_subject_ids(db, role_id: int) -> list[int]:
    return [r["subject_id"] for r in db.q("SELECT subject_id FROM role_subjects WHERE role_id=?", (role_id,))]


def q_public(q: dict) -> dict:
    return {"id": q["id"], "kind": q["kind"], "statement": q["statement"], "options": loads(q["options"], []),
            "banca": q.get("banca") or "", "year": q.get("year"), "origin": q.get("origin"),
            "source": q.get("source") or "", "subject": q.get("subject_name") or "", "subject_id": q.get("subject_id"),
            "topic_id": q.get("topic_id"), "topic": q.get("topic_name") or "", "number": q.get("number")}


def q_reveal(q: dict) -> dict:
    return {**q_public(q), "answer": q["answer"], "explanation": q.get("explanation") or "",
            "rationales": loads(q.get("rationales"), [])}


Q_SELECT = """SELECT q.*, s.name AS subject_name, t.name AS topic_name FROM questions q
              JOIN subjects s ON s.id=q.subject_id LEFT JOIN topics t ON t.id=q.topic_id"""


def use_ai_quota(user) -> None:
    if user["is_admin"]:
        return
    limit = int(os.getenv("AI_DAILY_LIMIT", "40"))
    k = (user["id"], today())
    if _ai_usage.get(k, 0) >= limit:
        raise ApiError(429, f"Você atingiu o limite diário de {limit} pedidos à IA. Volte amanhã.")
    _ai_usage[k] = _ai_usage.get(k, 0) + 1


# ---------------------------------------------------------------------------
# Catálogo e matrícula
# ---------------------------------------------------------------------------

@bp.get("/catalog")
@login_required
def catalog():
    term = f"%{request.args.get('q', '').strip().lower()}%"
    with tx() as db:
        roles = db.q(
            """SELECT r.id, r.name, r.level, r.exam_date, r.question_style, r.description,
                      x.id AS exam_id, x.org, x.name AS exam, x.banca, x.year,
                      (SELECT COUNT(*) FROM role_subjects rs WHERE rs.role_id=r.id) AS n_subjects,
                      (SELECT COUNT(*) FROM role_topics rt WHERE rt.role_id=r.id) AS n_topics,
                      (SELECT COUNT(*) FROM role_topics rt JOIN lessons l ON l.topic_id=rt.topic_id
                        WHERE rt.role_id=r.id AND l.status='publicado') AS n_lessons
               FROM roles r JOIN exams x ON x.id=r.exam_id
               WHERE x.published=1 AND (LOWER(r.name) LIKE ? OR LOWER(x.org) LIKE ? OR LOWER(x.name) LIKE ? OR LOWER(x.banca) LIKE ?)
               ORDER BY x.org, r.name""",
            (term, term, term, term),
        )
        for r in roles:
            r["subjects"] = [s["name"] for s in db.q(
                "SELECT s.name FROM role_subjects rs JOIN subjects s ON s.id=rs.subject_id WHERE rs.role_id=? ORDER BY rs.position, s.name",
                (r["id"],))]
    return {"roles": roles}


@bp.post("/enrollments")
@login_required
def enroll():
    b = body()
    role_id = int(b.get("role_id") or 0)
    exam_date = (b.get("exam_date") or None) or None
    minutes = max(15, min(720, int(b.get("minutes_per_day") or 90)))
    with tx() as db:
        role = db.one("SELECT * FROM roles WHERE id=?", (role_id,))
        if not role:
            raise ApiError(404, "Cargo não encontrado.")
        db.x("UPDATE enrollments SET active=0 WHERE user_id=?", (g.user["id"],))
        existing = db.one("SELECT id FROM enrollments WHERE user_id=? AND role_id=?", (g.user["id"], role_id))
        if existing:
            db.update("enrollments", existing["id"], {"active": 1, "exam_date": exam_date or role["exam_date"],
                                                      "minutes_per_day": minutes})
            eid = existing["id"]
        else:
            eid = db.insert("enrollments", {"user_id": g.user["id"], "role_id": role_id,
                                            "exam_date": exam_date or role["exam_date"], "minutes_per_day": minutes,
                                            "active": 1, "created_at": now()})
    return {"id": eid}


@bp.patch("/enrollments/<int:eid>")
@login_required
def update_enrollment(eid: int):
    b = body()
    with tx() as db:
        e = db.one("SELECT * FROM enrollments WHERE id=? AND user_id=?", (eid, g.user["id"]))
        if not e:
            raise ApiError(404, "Inscrição não encontrada.")
        data = {}
        if "exam_date" in b:
            data["exam_date"] = b["exam_date"] or None
        if "minutes_per_day" in b:
            data["minutes_per_day"] = max(15, min(720, int(b["minutes_per_day"] or 90)))
        if b.get("active"):
            db.x("UPDATE enrollments SET active=0 WHERE user_id=?", (g.user["id"],))
            data["active"] = 1
        db.update("enrollments", eid, data)
    return {"ok": True}


@bp.delete("/enrollments/<int:eid>")
@login_required
def delete_enrollment(eid: int):
    with tx() as db:
        db.x("DELETE FROM enrollments WHERE id=? AND user_id=?", (eid, g.user["id"]))
    return {"ok": True}


# ---------------------------------------------------------------------------
# Hoje e trilha
# ---------------------------------------------------------------------------

@bp.get("/today")
@login_required
def today_plan():
    with tx() as db:
        e = db.one("SELECT * FROM enrollments WHERE user_id=? AND active=1 ORDER BY id DESC LIMIT 1", (g.user["id"],))
        if not e:
            return {"needs_onboarding": True}
        return planner.plan_today(db, g.user["id"], e)


@bp.get("/trail")
@login_required
def get_trail():
    with tx() as db:
        e = active_enrollment(db, g.user["id"])
        return planner.trail(db, g.user["id"], e["role_id"])


@bp.get("/account/export")
@login_required
def export_my_study():
    """Cópia portátil somente leitura do histórico da conta autenticada.

    Não inclui senha, hash, tokens, segredos do banco, nem dados de outros usuários.
    A exportação não modifica nenhuma linha do PostgreSQL.
    """
    uid = g.user["id"]
    with tx() as db:
        profile = db.one(
            "SELECT id, email, name, created_at FROM users WHERE id=?", (uid,)
        )
        collections = {
            "enrollments": db.q("SELECT * FROM enrollments WHERE user_id=? ORDER BY id", (uid,)),
            "lesson_progress": db.q(
                "SELECT topic_id, done_at, notes FROM lesson_progress WHERE user_id=? ORDER BY topic_id",
                (uid,)
            ),
            "answers": db.q(
                "SELECT question_id, chosen, correct, seconds, context, created_at "
                "FROM answers WHERE user_id=? ORDER BY id", (uid,)
            ),
            "reviews": db.q(
                "SELECT item_type, item_id, due, interval_days, ease, reps, lapses, last_at "
                "FROM reviews WHERE user_id=? ORDER BY item_type, item_id", (uid,)
            ),
            "study_log": db.q(
                "SELECT day, minutes, items FROM study_log WHERE user_id=? ORDER BY day", (uid,)
            ),
            "attempts": db.q(
                "SELECT role_id, prior_exam_id, title, style, question_ids, responses, "
                "duration_min, started_at, finished_at, result FROM attempts "
                "WHERE user_id=? ORDER BY id", (uid,)
            ),
            "discursive_answers": db.q(
                "SELECT discursive_id, text, feedback, score, created_at "
                "FROM discursive_answers WHERE user_id=? ORDER BY id", (uid,)
            ),
        }
    return {"format": "estuda-study-export-v1", "version": "2.2",
            "exported_at": now(), "profile": profile, "data": collections,
            "note": "Cópia individual; não é restauração automática. Guarde em local seguro."}


@bp.get("/topics/<int:tid>")
@login_required
def topic(tid: int):
    uid = g.user["id"]
    with tx() as db:
        t = db.one("SELECT t.*, s.name AS subject FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE t.id=?", (tid,))
        if not t:
            raise ApiError(404, "Tópico não encontrado.")
        lesson = db.one("SELECT body, summary, minutes, origin, status, updated_at FROM lessons WHERE topic_id=?", (tid,))
        if lesson and lesson["status"] != "publicado" and not g.user["is_admin"]:
            lesson = None
        prog = db.one("SELECT done_at, notes FROM lesson_progress WHERE user_id=? AND topic_id=?", (uid, tid))
        stats = planner.topic_stats(db, uid, [tid])[tid]
        n_q = db.val("SELECT COUNT(*) FROM questions WHERE topic_id=? AND status='publicada'", (tid,), 0)
        n_f = db.val("SELECT COUNT(*) FROM flashcards WHERE topic_id=? AND status='publicada'", (tid,), 0)
        nav = {"prev": None, "next": None}
        e = db.one("SELECT role_id FROM enrollments WHERE user_id=? AND active=1", (uid,))
        if e:
            ordered = db.q(
                """SELECT t.id, t.name FROM role_topics rt JOIN topics t ON t.id=rt.topic_id
                   WHERE rt.role_id=? AND t.subject_id=? ORDER BY t.position, t.id""",
                (e["role_id"], t["subject_id"]),
            )
            ids = [x["id"] for x in ordered]
            if tid in ids:
                i = ids.index(tid)
                nav["prev"] = ordered[i - 1] if i > 0 else None
                nav["next"] = ordered[i + 1] if i + 1 < len(ordered) else None
                nav["index"], nav["total"] = i + 1, len(ordered)
    return {"id": t["id"], "name": t["name"], "subject": t["subject"], "subject_id": t["subject_id"],
            "lesson": apply_supplement(t["subject"], t["name"], lesson), "done": bool(prog and prog["done_at"]), "notes": (prog or {}).get("notes", ""), "stats": stats,
            "n_questions": n_q, "n_cards": n_f, "nav": nav, "ai": ai.status()["enabled"]}


@bp.post("/topics/<int:tid>/done")
@login_required
def topic_done(tid: int):
    """Conclusão idempotente: não duplica tempo ou contagem de estudo."""
    with tx() as db:
        lesson = db.one("SELECT minutes FROM lessons WHERE topic_id=? AND status='publicado'", (tid,))
        if not lesson:
            raise ApiError(404, "Aula publicada não encontrada.")
        current = db.one(
            "SELECT done_at FROM lesson_progress WHERE user_id=? AND topic_id=?",
            (g.user["id"], tid),
        )
        newly_completed = not current or not current["done_at"]
        if newly_completed:
            db.x("""INSERT INTO lesson_progress(user_id, topic_id, done_at) VALUES (?,?,?)
                    ON CONFLICT(user_id, topic_id) DO UPDATE SET done_at=excluded.done_at""",
                 (g.user["id"], tid, now()))
            planner.log_activity(db, g.user["id"], 1, int(lesson["minutes"] or 15))
            # Preserva agendamentos existentes: não substitui revisões já avaliadas.
            for f in db.q("SELECT id FROM flashcards WHERE topic_id=? AND status='publicada'", (tid,)):
                db.x("""INSERT INTO reviews(user_id,item_type,item_id,due) VALUES (?,?,?,?)
                        ON CONFLICT(user_id,item_type,item_id) DO NOTHING""",
                     (g.user["id"], "f", f["id"], (date.today() + timedelta(days=1)).isoformat()))
    return {"ok": True, "newly_completed": newly_completed}

@bp.post("/topics/<int:tid>/notes")
@login_required
def topic_notes(tid: int):
    notes = str(body().get("notes", ""))[:20000]
    with tx() as db:
        db.x("""INSERT INTO lesson_progress(user_id, topic_id, done_at, notes) VALUES (?,?,?,?)
                ON CONFLICT(user_id, topic_id) DO UPDATE SET notes=excluded.notes""",
             (g.user["id"], tid, "", notes))
    return {"ok": True}


def topic_context(db, topic_id: int, user_id: int | None = None) -> dict:
    t = db.one("SELECT t.*, s.name AS subject FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE t.id=?", (topic_id,))
    if not t:
        raise ApiError(404, "Tópico não encontrado.")
    role, banca, style = "", "", "multipla"
    if user_id:
        r = db.one("""SELECT r.name, r.question_style, x.org, x.banca FROM enrollments e JOIN roles r ON r.id=e.role_id
                      JOIN exams x ON x.id=r.exam_id WHERE e.user_id=? AND e.active=1""", (user_id,))
        if r:
            role, banca, style = f"{r['name']} ({r['org']})", r["banca"], r["question_style"]
    lesson = db.one("SELECT body, origin FROM lessons WHERE topic_id=?", (topic_id,))
    return {**t, "role": role, "banca": banca, "style": style, "lesson_body": (apply_supplement(t["subject"], t["name"], lesson) or {}).get("body", "")}


def generate_for_topic(topic_id: int, parts: list[str], user_id: int | None, n_questions: int = 8) -> dict:
    """Gera o que faltar de um tópico. Chamadas à IA ficam fora da transação para não travar o banco."""
    with tx() as db:
        c = topic_context(db, topic_id, user_id)
        has_lesson = bool(db.val("SELECT COUNT(*) FROM lessons WHERE topic_id=?", (topic_id,), 0))
    created = {"lesson": False, "questions": 0, "flashcards": 0}
    lesson_body = c["lesson_body"]
    if "lesson" in parts and not has_lesson:
        les = ai.generate_lesson(c["subject"], c["name"], c["role"], c["banca"])
        with tx() as db:
            db.x("""INSERT INTO lessons(topic_id, body, summary, minutes, origin, status, updated_at)
                    VALUES (?,?,?,?, 'ia', 'publicado', ?) ON CONFLICT(topic_id) DO NOTHING""",
                 (topic_id, les["body"], les["summary"], max(5, min(90, les["minutes"])), now()))
        lesson_body = les["body"]
        created["lesson"] = True
    if "questions" in parts:
        qs = ai.generate_questions(c["subject"], c["name"], lesson_body, n_questions, c["style"], c["role"], c["banca"])
        with tx() as db:
            for q in qs:
                fp = fingerprint(q["statement"], q["options"])
                if db.one("SELECT id FROM questions WHERE fingerprint=?", (fp,)):
                    continue
                db.insert("questions", {"subject_id": c["subject_id"], "topic_id": topic_id, "kind": q["kind"],
                                        "statement": q["statement"], "options": dumps(q["options"]), "answer": q["answer"],
                                        "explanation": q["explanation"], "rationales": dumps(q["rationales"]),
                                        "origin": "ia", "status": "publicada", "banca": c["banca"] or "",
                                        "fingerprint": fp, "created_at": now()})
                created["questions"] += 1
    if "flashcards" in parts:
        cards = ai.generate_flashcards(c["subject"], c["name"], lesson_body)
        with tx() as db:
            for card in cards:
                db.insert("flashcards", {"topic_id": topic_id, "front": card["front"], "back": card["back"],
                                         "origin": "ia", "status": "publicada", "created_at": now()})
                created["flashcards"] += 1
    return created


@bp.post("/topics/<int:tid>/generate")
@login_required
def topic_generate(tid: int):
    parts = [p for p in body().get("parts", ["lesson", "questions", "flashcards"]) if p in ("lesson", "questions", "flashcards")]
    use_ai_quota(g.user)
    return generate_for_topic(tid, parts, g.user["id"], int(body().get("n", 8) or 8))


@bp.post("/tutor")
@login_required
def tutor():
    b = body()
    question = str(b.get("question", "")).strip()[:1500]
    if not question:
        raise ApiError(400, "Escreva sua dúvida.")
    mode = str(b.get("mode") or "passo_a_passo")
    if mode not in ("do_zero", "passo_a_passo", "exemplo", "comparar", "exercicio"):
        raise ApiError(400, "Modo de explicação inválido.")
    history = b.get("history")
    if not isinstance(history, list):
        history = []
    with tx() as db:
        c = topic_context(db, int(b.get("topic_id") or 0), g.user["id"])
        cards = db.q(
            "SELECT front FROM flashcards WHERE topic_id=? AND status='publicada' ORDER BY id LIMIT 12",
            (c["id"],)
        )
    if b.get("use_ai") is not True:
        return {
            "answer": answer_from_material(c["name"], c["lesson_body"], question, mode, cards),
            "mode": mode, "source": "material", "ai_used": False,
        }
    if not ai.status()["enabled"]:
        raise ApiError(503, "A IA não está configurada. Use a consulta gratuita ao material.")
    use_ai_quota(g.user)
    return {
        "answer": ai.tutor(c["subject"], c["name"], c["lesson_body"],
                           question, mode=mode, history=history[:10]),
        "mode": mode, "source": "ai", "ai_used": True,
    }


# ---------------------------------------------------------------------------
# Questões
# ---------------------------------------------------------------------------

@bp.get("/filters")
@login_required
def filters():
    with tx() as db:
        e = db.one("SELECT role_id FROM enrollments WHERE user_id=? AND active=1", (g.user["id"],))
        subjects = []
        if e:
            subjects = db.q(
                """SELECT s.id, s.name FROM role_subjects rs JOIN subjects s ON s.id=rs.subject_id
                   WHERE rs.role_id=? ORDER BY rs.position, s.name""", (e["role_id"],))
            for s in subjects:
                s["topics"] = db.q(
                    """SELECT t.id, t.name FROM role_topics rt JOIN topics t ON t.id=rt.topic_id
                       WHERE rt.role_id=? AND t.subject_id=? ORDER BY t.position, t.id""", (e["role_id"], s["id"]))
        bancas = [r["banca"] for r in db.q("SELECT DISTINCT banca FROM questions WHERE banca<>'' AND status='publicada' ORDER BY banca")]
    return {"subjects": subjects, "bancas": bancas}


@bp.get("/practice")
@login_required
def practice():
    uid = g.user["id"]
    a = request.args
    mode = a.get("mode", "inteligente")
    limit = max(1, min(60, int(a.get("limit", 10))))
    where, params = ["q.status='publicada'"], []
    with tx() as db:
        if a.get("topic_id"):
            where.append("q.topic_id=?")
            params.append(int(a["topic_id"]))
        elif a.get("subject_id"):
            where.append("q.subject_id=?")
            params.append(int(a["subject_id"]))
        else:
            e = db.one("SELECT role_id FROM enrollments WHERE user_id=? AND active=1", (uid,))
            if e:
                sids = role_subject_ids(db, e["role_id"])
                if sids:
                    where.append(f"q.subject_id IN ({','.join('?' for _ in sids)})")
                    params += sids
        if a.get("banca"):
            where.append("q.banca=?")
            params.append(a["banca"])
        if a.get("origin"):
            where.append("q.origin=?")
            params.append(a["origin"])
        rows = db.q(f"{Q_SELECT} WHERE {' AND '.join(where)}", params)
        last: dict[int, tuple[int, str]] = {}
        for r in db.q("SELECT question_id, correct, created_at FROM answers WHERE user_id=? ORDER BY id", (uid,)):
            last[r["question_id"]] = (r["correct"], r["created_at"])
    random.shuffle(rows)
    if mode == "novas":
        rows = [r for r in rows if r["id"] not in last]
    elif mode == "erradas":
        rows = [r for r in rows if r["id"] in last and not last[r["id"]][0]]
    elif mode == "inteligente":
        def prio(r):
            if r["id"] not in last:
                return (0, "")
            ok, at = last[r["id"]]
            return (1 if not ok else 2, at)
        rows.sort(key=prio)
    total = len(rows)
    return {"questions": [q_public(r) for r in rows[:limit]], "available": total}


@bp.post("/questions/<int:qid>/answer")
@login_required
def answer(qid: int):
    b = body()
    chosen = str(b.get("chosen", "")).strip().upper()[:1]
    seconds = max(0, min(3600, int(b.get("seconds") or 0)))
    context = b.get("context") if b.get("context") in ("treino", "revisao") else "treino"
    with tx() as db:
        q = db.one(f"{Q_SELECT} WHERE q.id=? AND q.status='publicada'", (qid,))
        if not q:
            raise ApiError(404, "Questão publicada não encontrada.")
        if q["kind"] == "multipla":
            valid = "ABCDE"[:len(loads(q["options"], []))]
        elif q["kind"] == "certo_errado":
            valid = "CE"
        else:
            raise ApiError(422, "Tipo de questão desconhecido.")
        if not chosen or chosen not in valid:
            raise ApiError(400, "Escolha uma alternativa válida antes de responder.")
        correct = 1 if chosen == q["answer"] else 0
        if q["answer"] == "X":  # anulada: qualquer resposta conta como certa
            correct = 1
        db.insert("answers", {"user_id": g.user["id"], "question_id": qid, "chosen": chosen or "-",
                              "correct": correct, "seconds": seconds, "context": context, "created_at": now()})
        review = srs.schedule(db, g.user["id"], "q", qid, 2 if correct else 0)
        planner.log_activity(db, g.user["id"], 1, max(1, round(seconds / 60)))
        stats = db.one("""SELECT COUNT(*) AS n, SUM(correct) AS c FROM answers WHERE question_id=?""", (qid,))
    return {**q_reveal(q), "correct": bool(correct), "chosen": chosen, "next_review": review["due"],
            "crowd": {"answered": stats["n"], "accuracy": round((stats["c"] or 0) / stats["n"], 2) if stats["n"] else None}}


@bp.post("/questions/<int:qid>/explain")
@login_required
def explain(qid: int):
    with tx() as db:
        q = db.one("SELECT * FROM questions WHERE id=? AND status='publicada'", (qid,))
        latest = db.one(
            "SELECT chosen FROM answers WHERE user_id=? AND question_id=? ORDER BY id DESC LIMIT 1",
            (g.user["id"], qid),
        ) if q else None
    if not q:
        raise ApiError(404, "Questão não encontrada.")
    if not latest:
        raise ApiError(409, "Responda à questão antes de consultar a explicação.")
    # Não aceite uma alternativa forjada no corpo da requisição:
    # o feedback deve corresponder à resposta efetivamente registrada.
    chosen = str(latest["chosen"] or "").strip().upper()[:1]
    if body().get("use_ai") is True:
        if not ai.status()["enabled"]:
            raise ApiError(503, "A IA não está configurada. A explicação autoral continua disponível.")
        use_ai_quota(g.user)
        options = loads(q.get("options"), [])
        return {
            "explanation": ai.explain_answer({**q, "options": options}, chosen),
            "source": "ai", "ai_used": True,
        }
    # As justificativas publicadas são gratuitas: IA só é consumida quando
    # não há explicação autoral disponível e o provedor está configurado.
    rationales = loads(q.get("rationales"), [])
    options = loads(q.get("options"), [])
    parts = []
    if q.get("explanation"):
        parts.append(q["explanation"])
    if q["kind"] == "multipla":
        if chosen and chosen in "ABCDE":
            i = ord(chosen) - ord("A")
            if i < len(rationales) and rationales[i]:
                parts.append("**Sobre a alternativa " + chosen + ":** " + rationales[i])
        right = str(q["answer"]).upper()
        if right in "ABCDE":
            i = ord(right) - ord("A")
            if i < len(rationales) and rationales[i] and (not chosen or chosen != right):
                parts.append("**Por que a alternativa " + right + " está correta:** " + rationales[i])
    elif rationales and any(rationales):
        parts.extend(x for x in rationales if x)
    if parts:
        # Todas as questões publicadas podem complementar a justificativa
        # com trecho da aula correspondente. É recuperação textual, não IA.
        if q.get("topic_id"):
            with tx() as db:
                context = topic_context(db, q["topic_id"])
            lookup = q["statement"]
            if q["kind"] == "multipla" and chosen in "ABCDE":
                idx = ord(chosen) - ord("A")
                if idx < len(options):
                    lookup += " " + str(options[idx])
            excerpt = answer_from_material(
                context["name"], context["lesson_body"], lookup, "passo_a_passo"
            )
            if excerpt and not excerpt.startswith("Não encontrei"):
                parts.append("### Reforce o conceito na aula\n\n" + excerpt)
        return {"explanation": "\n\n".join(parts), "source": "editorial", "ai_used": False}
    if not ai.status()["enabled"]:
        return {"explanation": "A questão ainda não possui justificativa detalhada cadastrada. Revise a explicação da aula e os conceitos do enunciado; não vamos inventar uma explicação.", "source": "pending", "ai_used": False}
    use_ai_quota(g.user)
    return {"explanation": ai.explain_answer({**q, "options": options}, chosen), "source": "ai", "ai_used": True}


# ---------------------------------------------------------------------------
# Revisão espaçada
# ---------------------------------------------------------------------------

@bp.get("/review")
@login_required
def review_queue():
    uid = g.user["id"]
    with tx() as db:
        due = db.q("SELECT item_type, item_id FROM reviews WHERE user_id=? AND due<=? ORDER BY due, item_id LIMIT 60", (uid, today()))
        qids = [d["item_id"] for d in due if d["item_type"] == "q"]
        fids = [d["item_id"] for d in due if d["item_type"] == "f"]
        qs = db.q(f"{Q_SELECT} WHERE q.id IN ({','.join('?' for _ in qids)})", qids) if qids else []
        fs = db.q(f"""SELECT f.*, t.name AS topic, s.name AS subject FROM flashcards f JOIN topics t ON t.id=f.topic_id
                      JOIN subjects s ON s.id=t.subject_id WHERE f.id IN ({','.join('?' for _ in fids)})""", fids) if fids else []
    items = [{"type": "q", "question": q_public(q)} for q in qs] + \
            [{"type": "f", "card": {"id": f["id"], "front": f["front"], "back": f["back"], "topic": f["topic"], "subject": f["subject"]}} for f in fs]
    random.shuffle(items)
    return {"items": items}


@bp.get("/topics/<int:tid>/flashcards")
@login_required
def topic_cards(tid: int):
    with tx() as db:
        cards = db.q("SELECT id, front, back FROM flashcards WHERE topic_id=? AND status='publicada' ORDER BY id", (tid,))
    return {"cards": cards}


@bp.post("/flashcards/<int:fid>/grade")
@login_required
def grade_card(fid: int):
    grade = int(body().get("grade", 2))
    if grade not in (0, 1, 2, 3):
        raise ApiError(400, "Nota inválida.")
    with tx() as db:
        existing = db.one("SELECT id FROM flashcards WHERE id=? AND status='publicada'", (fid,))
        if not existing:
            raise ApiError(404, "Flashcard publicado não encontrado.")
        res = srs.schedule(db, g.user["id"], "f", fid, grade)
        planner.log_activity(db, g.user["id"], 1, 1)
    return res


# ---------------------------------------------------------------------------
# Simulados
# ---------------------------------------------------------------------------

@bp.get("/simulados")
@login_required
def simulados():
    uid = g.user["id"]
    with tx() as db:
        e = db.one("SELECT * FROM enrollments WHERE user_id=? AND active=1", (uid,))
        exams = db.q(
            """SELECT p.*, r.name AS role, x.org,
                      (SELECT COUNT(*) FROM questions q WHERE q.prior_exam_id=p.id AND q.status='publicada') AS n_questions
               FROM prior_exams p LEFT JOIN roles r ON r.id=p.role_id LEFT JOIN exams x ON x.id=p.exam_id
               WHERE p.status='publicada' ORDER BY p.year DESC, p.title""")
        if e:
            sids = set(role_subject_ids(db, e["role_id"]))
            for p in exams:
                p["mine"] = p["role_id"] == e["role_id"]
                subj = {r["subject_id"] for r in db.q("SELECT DISTINCT subject_id FROM questions WHERE prior_exam_id=?", (p["id"],))}
                p["overlap"] = round(len(subj & sids) / len(subj), 2) if subj else 0
            exams.sort(key=lambda p: (not p["mine"], -p["overlap"], -(p["year"] or 0)))
        attempts = db.q("""SELECT id, title, style, started_at, finished_at, duration_min, result FROM attempts
                           WHERE user_id=? ORDER BY id DESC LIMIT 30""", (uid,))
        for at in attempts:
            at["result"] = loads(at["result"])
            at["n_questions"] = None
    return {"exams": [p for p in exams if p["n_questions"]], "attempts": attempts}


@bp.post("/simulados/start")
@login_required
def start_simulado():
    uid = g.user["id"]
    b = body()
    with tx() as db:
        e = db.one("SELECT * FROM enrollments WHERE user_id=? AND active=1", (uid,))
        if b.get("prior_exam_id"):
            p = db.one("SELECT * FROM prior_exams WHERE id=? AND status='publicada'", (int(b["prior_exam_id"]),))
            if not p:
                raise ApiError(404, "Prova não encontrada.")
            ids = [r["id"] for r in db.q("SELECT id FROM questions WHERE prior_exam_id=? AND status='publicada' ORDER BY number, id", (p["id"],))]
            title, style, minutes, prior = p["title"], p["style"], p["duration_min"], p["id"]
        else:
            if not e:
                raise ApiError(409, "Escolha um concurso para montar o simulado.")
            n = max(5, min(120, int(b.get("n") or 40)))
            subjects = db.q("SELECT subject_id, weight, questions FROM role_subjects WHERE role_id=?", (e["role_id"],))
            role = db.one("SELECT r.name, r.question_style FROM roles r WHERE r.id=?", (e["role_id"],))
            answered = {r["question_id"] for r in db.q("SELECT DISTINCT question_id FROM answers WHERE user_id=?", (uid,))}
            # cota por matéria: nº de questões do edital ou peso
            shares = {s["subject_id"]: (s["questions"] or s["weight"] or 1) for s in subjects}
            total_share = sum(shares.values()) or 1
            ids = []
            pools = {}
            for sid in shares:
                pool = [r["id"] for r in db.q("SELECT id FROM questions WHERE subject_id=? AND status='publicada' AND kind=?",
                                              (sid, role["question_style"]))]
                random.shuffle(pool)
                pool.sort(key=lambda i: i in answered)
                pools[sid] = pool
            for sid, share in shares.items():
                k = round(n * share / total_share)
                ids += pools[sid][:k]
                pools[sid] = pools[sid][k:]
            leftovers = [i for p in pools.values() for i in p]
            random.shuffle(leftovers)
            ids += leftovers[: max(0, n - len(ids))]
            ids = ids[:n]
            if len(ids) < 5:
                raise ApiError(409, "Ainda não há questões suficientes para um simulado deste cargo. "
                                    "Gere questões nos tópicos ou importe provas anteriores.")
            title = f"Simulado personalizado — {role['name']}"
            style = role["question_style"]
            minutes = int(b.get("minutes") or round(len(ids) * (2 if style == "certo_errado" else 3)))
            prior = None
        aid = db.insert("attempts", {"user_id": uid, "role_id": e["role_id"] if e else None, "prior_exam_id": prior,
                                     "title": title, "style": style, "question_ids": dumps(ids), "responses": "{}",
                                     "duration_min": minutes, "started_at": now()})
    return {"id": aid}


def _attempt(db, aid: int, uid: int) -> dict:
    at = db.one("SELECT * FROM attempts WHERE id=? AND user_id=?", (aid, uid))
    if not at:
        raise ApiError(404, "Simulado não encontrado.")
    at["question_ids"] = loads(at["question_ids"], [])
    at["responses"] = loads(at["responses"], {})
    at["result"] = loads(at["result"])
    return at


@bp.get("/attempts/<int:aid>")
@login_required
def get_attempt(aid: int):
    with tx() as db:
        at = _attempt(db, aid, g.user["id"])
        ids = at["question_ids"]
        rows = {r["id"]: r for r in db.q(f"{Q_SELECT} WHERE q.id IN ({','.join('?' for _ in ids)})", ids)} if ids else {}
    finished = bool(at["finished_at"])
    qs = [(q_reveal if finished else q_public)(rows[i]) for i in ids if i in rows]
    started = datetime.fromisoformat(at["started_at"])
    elapsed = (datetime.now(timezone.utc) - started).total_seconds()
    return {"id": at["id"], "title": at["title"], "style": at["style"], "questions": qs, "responses": at["responses"],
            "duration_min": at["duration_min"], "started_at": at["started_at"], "finished_at": at["finished_at"],
            "remaining_seconds": max(0, int(at["duration_min"] * 60 - elapsed)), "result": at["result"]}


@bp.patch("/attempts/<int:aid>")
@login_required
def save_attempt(aid: int):
    responses = body().get("responses") or {}
    with tx() as db:
        at = _attempt(db, aid, g.user["id"])
        if at["finished_at"]:
            raise ApiError(409, "Este simulado já foi entregue.")
        clean = {str(k): str(v)[:1].upper() for k, v in responses.items() if v}
        db.update("attempts", aid, {"responses": dumps(clean)})
    return {"ok": True}


@bp.post("/attempts/<int:aid>/finish")
@login_required
def finish_attempt(aid: int):
    uid = g.user["id"]
    b = body()
    with tx() as db:
        at = _attempt(db, aid, uid)
        if at["finished_at"]:
            return {"result": at["result"]}
        responses = {str(k): str(v)[:1].upper() for k, v in (b.get("responses") or at["responses"]).items() if v}
        ids = at["question_ids"]
        rows = {r["id"]: r for r in db.q(f"{Q_SELECT} WHERE q.id IN ({','.join('?' for _ in ids)})", ids)} if ids else {}
        per = defaultdict(lambda: {"total": 0, "correct": 0, "wrong": 0, "blank": 0})
        correct = wrong = blank = 0
        for i in ids:
            q = rows.get(i)
            if not q:
                continue
            ch = responses.get(str(i), "")
            s = per[q["subject_name"]]
            s["total"] += 1
            if q["answer"] == "X":
                ok = True
            elif not ch:
                blank += 1
                s["blank"] += 1
                continue
            else:
                ok = ch == q["answer"]
            if ok:
                correct += 1
                s["correct"] += 1
            else:
                wrong += 1
                s["wrong"] += 1
            db.insert("answers", {"user_id": uid, "question_id": i, "chosen": ch or "-", "correct": 1 if ok else 0,
                                  "seconds": 0, "context": "simulado", "created_at": now()})
            srs.schedule(db, uid, "q", i, 2 if ok else 0)
        total = sum(v["total"] for v in per.values()) or 1
        net = correct - wrong if at["style"] == "certo_errado" else correct
        started = datetime.fromisoformat(at["started_at"])
        spent = int((datetime.now(timezone.utc) - started).total_seconds() // 60)
        result = {"total": total, "correct": correct, "wrong": wrong, "blank": blank, "net": net,
                  "percent": round(max(net, 0) / total, 3), "minutes": spent,
                  "subjects": [{"name": k, **v, "percent": round(v["correct"] / v["total"], 3) if v["total"] else 0}
                               for k, v in sorted(per.items())]}
        db.update("attempts", aid, {"responses": dumps(responses), "finished_at": now(), "result": dumps(result)})
        planner.log_activity(db, uid, total, spent)
    return {"result": result}


# ---------------------------------------------------------------------------
# Desempenho
# ---------------------------------------------------------------------------

@bp.get("/stats")
@login_required
def stats():
    uid = g.user["id"]
    with tx() as db:
        e = db.one("SELECT * FROM enrollments WHERE user_id=? AND active=1", (uid,))
        rows = db.q("""SELECT a.question_id, a.correct, a.seconds, q.subject_id, s.name AS subject
                       FROM answers a JOIN questions q ON q.id=a.question_id JOIN subjects s ON s.id=q.subject_id
                       WHERE a.user_id=? ORDER BY a.id""", (uid,))
        last = {}
        for r in rows:
            last[r["question_id"]] = r
        subj = defaultdict(lambda: {"answered": 0, "correct": 0})
        for r in last.values():
            subj[(r["subject_id"], r["subject"])]["answered"] += 1
            subj[(r["subject_id"], r["subject"])]["correct"] += r["correct"]
        role_subjects = []
        if e:
            role_subjects = db.q("""SELECT s.id, s.name, rs.weight FROM role_subjects rs JOIN subjects s ON s.id=rs.subject_id
                                    WHERE rs.role_id=? ORDER BY rs.position, s.name""", (e["role_id"],))
        names = {s["id"]: s for s in role_subjects}
        by_subject = []
        for s in role_subjects:
            v = subj.get((s["id"], s["name"]), {"answered": 0, "correct": 0})
            by_subject.append({"id": s["id"], "name": s["name"], "weight": s["weight"], **v,
                               "accuracy": round(v["correct"] / v["answered"], 3) if v["answered"] else None})
        for (sid, name), v in subj.items():
            if sid not in names:
                by_subject.append({"id": sid, "name": name, "weight": 0, **v, "accuracy": round(v["correct"] / v["answered"], 3)})
        start = (date.today() - timedelta(days=27)).isoformat()
        log = {r["day"]: r for r in db.q("SELECT day, minutes, items FROM study_log WHERE user_id=? AND day>=?", (uid, start))}
        days = []
        for i in range(28):
            d = (date.today() - timedelta(days=27 - i)).isoformat()
            days.append({"day": d, "minutes": log.get(d, {}).get("minutes", 0), "items": log.get(d, {}).get("items", 0)})
        attempts = db.q("""SELECT id, title, finished_at, result FROM attempts WHERE user_id=? AND finished_at IS NOT NULL
                           ORDER BY id DESC LIMIT 12""", (uid,))
        for a in attempts:
            a["result"] = loads(a["result"], {})
        total_minutes = db.val("SELECT SUM(minutes) FROM study_log WHERE user_id=?", (uid,), 0)
        trail = planner.trail(db, uid, e["role_id"]) if e else None
        streak = planner.streak(db, uid)
    answered = len(last)
    correct = sum(r["correct"] for r in last.values())
    return {"answered": answered, "accuracy": round(correct / answered, 3) if answered else None,
            "total_answers": len(rows), "minutes": total_minutes, "by_subject": by_subject, "days": days,
            "attempts": list(reversed(attempts)), "progress": trail["progress"] if trail else 0,
            "counts": trail["counts"] if trail else None, "streak": streak}


# ---------------------------------------------------------------------------
# Discursivas
# ---------------------------------------------------------------------------

@bp.get("/discursivas")
@login_required
def discursivas():
    with tx() as db:
        e = db.one("SELECT role_id FROM enrollments WHERE user_id=? AND active=1", (g.user["id"],))
        sids = set(role_subject_ids(db, e["role_id"])) if e else set()
        items = db.q("""SELECT d.id, d.title, d.subject_id, s.name AS subject, d.max_lines,
                               (SELECT COUNT(*) FROM discursive_answers a WHERE a.discursive_id=d.id AND a.user_id=?) AS attempts
                        FROM discursives d JOIN subjects s ON s.id=d.subject_id ORDER BY s.name, d.id""", (g.user["id"],))
    for it in items:
        it["mine"] = it["subject_id"] in sids
    items.sort(key=lambda x: (not x["mine"], x["subject"]))
    return {"items": items, "ai": ai.status()["enabled"]}


@bp.get("/discursivas/<int:did>")
@login_required
def discursiva(did: int):
    with tx() as db:
        d = db.one("SELECT d.*, s.name AS subject FROM discursives d JOIN subjects s ON s.id=d.subject_id WHERE d.id=?", (did,))
        if not d:
            raise ApiError(404, "Questão discursiva não encontrada.")
        hist = db.q("SELECT id, text, feedback, score, created_at FROM discursive_answers WHERE user_id=? AND discursive_id=? ORDER BY id DESC",
                    (g.user["id"], did))
    for h in hist:
        h["feedback"] = loads(h["feedback"])
    d["rubric"] = loads(d["rubric"], [])
    return {**d, "history": hist, "ai": ai.status()["enabled"]}


@bp.post("/discursivas/<int:did>/answer")
@login_required
def discursiva_answer(did: int):
    text = str(body().get("text", "")).strip()
    if len(text) < 40:
        raise ApiError(400, "Escreva sua resposta (pelo menos algumas linhas) antes de enviar.")
    with tx() as db:
        d = db.one("SELECT * FROM discursives WHERE id=?", (did,))
    if not d:
        raise ApiError(404, "Questão discursiva não encontrada.")
    feedback, score = None, None
    if ai.status()["enabled"]:
        use_ai_quota(g.user)
        feedback = ai.grade_discursive(d["prompt"], loads(d["rubric"], []), d["model_answer"], text)
        try:
            score = float(feedback.get("score"))
        except (TypeError, ValueError):
            score = None
    with tx() as db:
        aid = db.insert("discursive_answers", {"user_id": g.user["id"], "discursive_id": did, "text": text,
                                               "feedback": dumps(feedback) if feedback else None, "score": score,
                                               "created_at": now()})
        planner.log_activity(db, g.user["id"], 1, 20)
    return {"id": aid, "feedback": feedback, "score": score, "model_answer": d["model_answer"]}
