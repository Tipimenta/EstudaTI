"""Progresso por tópico e plano do dia.

Estados de um tópico para o aluno:
  novo      -> ainda não leu a aula nem respondeu questões
  estudando -> começou, mas ainda não comprovou domínio
  dominado  -> leu a aula (ou respondeu bastante) e acerta 70%+ nas últimas respostas de 5+ questões
  reforco   -> respondeu 4+ questões e acerta menos de 50%
"""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone

from db import DB, today


def role_structure(db: DB, role_id: int) -> list[dict]:
    subjects = db.q(
        """SELECT s.id, s.name, s.slug, rs.weight, rs.questions, rs.position
           FROM role_subjects rs JOIN subjects s ON s.id=rs.subject_id
           WHERE rs.role_id=? ORDER BY rs.position, s.name""",
        (role_id,),
    )
    topics = db.q(
        """SELECT t.id, t.subject_id, t.name, t.position,
                  (SELECT COUNT(*) FROM lessons l WHERE l.topic_id=t.id AND l.status='publicado') AS has_lesson,
                  (SELECT l.minutes FROM lessons l WHERE l.topic_id=t.id AND l.status='publicado') AS minutes,
                  (SELECT COUNT(*) FROM questions q WHERE q.topic_id=t.id AND q.status='publicada') AS n_questions,
                  (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id AND f.status='publicada') AS n_cards
           FROM role_topics rt JOIN topics t ON t.id=rt.topic_id
           WHERE rt.role_id=? ORDER BY t.position, t.id""",
        (role_id,),
    )
    by_subject: dict[int, list] = {}
    for t in topics:
        by_subject.setdefault(t["subject_id"], []).append(t)
    for s in subjects:
        s["topics"] = by_subject.get(s["id"], [])
    return subjects


def topic_stats(db: DB, user_id: int, topic_ids: list[int]) -> dict[int, dict]:
    """Evidências de estudo e domínio; funciona também com 1–2 questões por tópico.

    Não marca domínio só por reler ou repetir uma questão no mesmo dia.
    Progresso existente, anotações e respostas permanecem intactos.
    """
    if not topic_ids:
        return {}
    marks = ",".join("?" for _ in topic_ids)
    stats = {tid: {
        "read": False, "answered": 0, "correct": 0, "attempts": 0,
        "study_days": 0, "stable_cards": 0
    } for tid in topic_ids}
    for r in db.q(
        f"SELECT topic_id, done_at FROM lesson_progress WHERE user_id=? "
        f"AND topic_id IN ({marks})", (user_id, *topic_ids)
    ):
        stats[r["topic_id"]]["read"] = bool(r["done_at"])

    # Mantém a última resposta por questão (domínio atual), mas exige
    # evidências em mais de um dia para não inflar progresso por repetição.
    last: dict[tuple[int, int], int] = {}
    days: dict[int, set[str]] = {tid: set() for tid in topic_ids}
    for r in db.q(
        f"""SELECT q.topic_id, a.question_id, a.correct, a.created_at
            FROM answers a JOIN questions q ON q.id=a.question_id
            WHERE a.user_id=? AND q.topic_id IN ({marks})
            ORDER BY a.id""", (user_id, *topic_ids)
    ):
        tid = r["topic_id"]
        stats[tid]["attempts"] += 1
        if r["created_at"]:
            days[tid].add(str(r["created_at"])[:10])
        last[(tid, r["question_id"])] = int(r["correct"])

    for (tid, _qid), ok in last.items():
        stats[tid]["answered"] += 1
        stats[tid]["correct"] += 1 if ok else 0

    # Cartões estabilizados: pelo menos duas avaliações positivas
    # registradas no algoritmo de repetição espaçada.
    for r in db.q(
        f"""SELECT f.topic_id, COUNT(*) AS stable
            FROM reviews rv JOIN flashcards f
              ON rv.item_type='f' AND rv.item_id=f.id
            WHERE rv.user_id=? AND f.topic_id IN ({marks})
              AND rv.reps>=2 AND rv.last_at IS NOT NULL
            GROUP BY f.topic_id""", (user_id, *topic_ids)
    ):
        stats[r["topic_id"]]["stable_cards"] = int(r["stable"] or 0)

    for tid, state in stats.items():
        n, c = state["answered"], state["correct"]
        acc = c / n if n else None
        state["accuracy"] = round(acc, 3) if acc is not None else None
        state["study_days"] = len(days[tid])
        enough_practice = state["attempts"] >= 4 and state["study_days"] >= 2
        mixed_evidence = n >= 2 or (n >= 1 and state["stable_cards"] >= 2)

        if state["read"] and acc is not None and acc >= 0.75 and enough_practice and mixed_evidence:
            state["status"] = "dominado"
            state["next_step"] = "Mantenha a retenção com revisões espaçadas."
        elif n >= 2 and acc is not None and acc < 0.5:
            state["status"] = "reforco"
            state["next_step"] = "Reestude o mecanismo e pratique o mesmo conceito com questões novas."
        elif state["read"] or state["attempts"]:
            state["status"] = "estudando"
            if not state["read"]:
                state["next_step"] = "Conclua a aula e retorne às questões."
            elif not n:
                state["next_step"] = "Resolva questões para verificar se compreendeu a aula."
            elif acc is not None and acc < 0.75:
                state["next_step"] = "Revise os erros e pratique para elevar o desempenho."
            elif state["study_days"] < 2:
                state["next_step"] = "Revise em outro dia: acerto imediato ainda não comprova retenção."
            elif state["attempts"] < 4:
                state["next_step"] = "Faça mais tentativas de recuperação, sem consultar o gabarito."
            else:
                state["next_step"] = "Revise dois flashcards ou pratique mais uma questão diferente."
        else:
            state["status"] = "novo"
            state["next_step"] = "Comece pela aula: aprenda os termos antes das questões."
    return stats

def trail(db: DB, user_id: int, role_id: int) -> dict:
    subjects = role_structure(db, role_id)
    ids = [t["id"] for s in subjects for t in s["topics"]]
    stats = topic_stats(db, user_id, ids)
    total_w = sum(s["weight"] * max(1, len(s["topics"])) for s in subjects) or 1
    weighted = 0.0
    counts = {"novo": 0, "estudando": 0, "dominado": 0, "reforco": 0}
    for s in subjects:
        done = 0.0
        for t in s["topics"]:
            t.update(stats.get(t["id"], {}))
            counts[t["status"]] += 1
            done += {"dominado": 1, "estudando": 0.4, "reforco": 0.25}.get(t["status"], 0)
        n = len(s["topics"]) or 1
        s["progress"] = round(done / n, 3)
        s["mastered"] = sum(1 for t in s["topics"] if t["status"] == "dominado")
        weighted += s["weight"] * done
    return {"subjects": subjects, "progress": round(weighted / total_w, 3), "counts": counts, "total_topics": len(ids)}


def due_reviews(db: DB, user_id: int) -> dict:
    t = today()
    q = db.val("SELECT COUNT(*) FROM reviews WHERE user_id=? AND item_type='q' AND due<=?", (user_id, t), 0)
    f = db.val("SELECT COUNT(*) FROM reviews WHERE user_id=? AND item_type='f' AND due<=?", (user_id, t), 0)
    return {"questions": q, "cards": f, "total": q + f}


def streak(db: DB, user_id: int) -> int:
    days = {r["day"] for r in db.q("SELECT day FROM study_log WHERE user_id=? AND items>0", (user_id,))}
    d = datetime.now(timezone.utc).date()
    if d.isoformat() not in days:
        d -= timedelta(days=1)
    n = 0
    while d.isoformat() in days:
        n += 1
        d -= timedelta(days=1)
    return n


def log_activity(db: DB, user_id: int, items: int = 1, minutes: int = 1):
    db.x(
        """INSERT INTO study_log(user_id, day, minutes, items) VALUES (?,?,?,?)
           ON CONFLICT(user_id, day) DO UPDATE SET minutes=study_log.minutes+excluded.minutes,
           items=study_log.items+excluded.items""",
        (user_id, today(), minutes, items),
    )


def plan_today(db: DB, user_id: int, enrollment: dict) -> dict:
    role_id = enrollment["role_id"]
    tr = trail(db, user_id, role_id)
    budget = int(enrollment.get("minutes_per_day") or 90)
    tasks: list[dict] = []
    reviews = due_reviews(db, user_id)
    if reviews["total"]:
        mins = max(5, round(reviews["total"] * 0.6))
        tasks.append({"type": "revisao", "title": "Revisar o que está vencendo",
                      "detail": _plural(reviews["questions"], "questão", "questões") + " e " +
                                _plural(reviews["cards"], "flashcard", "flashcards"),
                      "minutes": mins, "count": reviews["total"]})
        budget -= mins

    weak = [(s, t) for s in tr["subjects"] for t in s["topics"] if t["status"] == "reforco"]
    if weak and budget > 0:
        s, t = weak[0]
        tasks.append({"type": "reforco", "title": f"Reforçar {t['name']}", "detail": s["name"],
                      "topic_id": t["id"], "subject": s["name"], "minutes": 15,
                      "accuracy": t.get("accuracy")})
        budget -= 15

    # Escolhe a próxima matéria pelo menor progresso relativo ao peso, para avançar em todas ao mesmo tempo.
    picked: set[int] = {t["id"] for _, t in weak[:1]}
    guard = 0
    while budget > 5 and guard < 6:
        guard += 1
        candidates = []
        for s in tr["subjects"]:
            pending = [t for t in s["topics"] if t["status"] in ("estudando", "novo") and t["id"] not in picked]
            if not pending:
                continue
            pending.sort(key=lambda t: (0 if t["status"] == "estudando" else 1, t["position"], t["id"]))
            candidates.append(((s["progress"] + 0.05) / max(s["weight"], 0.1), s, pending[0]))
        if not candidates:
            break
        candidates.sort(key=lambda x: x[0])
        _, s, t = candidates[0]
        picked.add(t["id"])
        # para não repetir a mesma matéria em sequência, reduz a prioridade dela neste plano
        s["progress"] += 0.15
        if not t["read"] and t["has_lesson"]:
            mins = int(t.get("minutes") or 20)
            tasks.append({"type": "aula", "title": t["name"], "detail": s["name"], "topic_id": t["id"],
                          "subject": s["name"], "minutes": mins})
            budget -= mins
        elif not t["has_lesson"] and not t["n_questions"]:
            tasks.append({"type": "gerar", "title": t["name"], "detail": s["name"], "topic_id": t["id"],
                          "subject": s["name"], "minutes": 20})
            budget -= 20
            continue
        if budget > 5 and t["n_questions"]:
            tasks.append({"type": "questoes", "title": f"Questões de {t['name']}", "detail": s["name"],
                          "topic_id": t["id"], "subject": s["name"], "minutes": 15,
                          "count": min(10, t["n_questions"])})
            budget -= 15

    last_sim = db.one("SELECT started_at FROM attempts WHERE user_id=? AND finished_at IS NOT NULL ORDER BY id DESC LIMIT 1", (user_id,))
    answered = db.val("SELECT COUNT(DISTINCT question_id) FROM answers WHERE user_id=?", (user_id,), 0)
    if answered >= 40 and (not last_sim or last_sim["started_at"][:10] <= (date.today() - timedelta(days=7)).isoformat()):
        tasks.append({"type": "simulado", "title": "Fazer um simulado da semana",
                      "detail": "Mede seu nível com o peso real de cada matéria", "minutes": 60})

    days_left = None
    if enrollment.get("exam_date"):
        try:
            days_left = (date.fromisoformat(enrollment["exam_date"]) - date.today()).days
        except ValueError:
            days_left = None
    done_today = db.one("SELECT minutes, items FROM study_log WHERE user_id=? AND day=?", (user_id, today())) or {"minutes": 0, "items": 0}
    return {"tasks": tasks, "reviews": reviews, "progress": tr["progress"], "counts": tr["counts"],
            "total_topics": tr["total_topics"], "streak": streak(db, user_id), "days_left": days_left,
            "today": done_today, "minutes_per_day": enrollment.get("minutes_per_day") or 90}


def _plural(n: int, one: str, many: str) -> str:
    return f"{n} {one if n == 1 else many}"
