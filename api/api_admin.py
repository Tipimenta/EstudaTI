"""Rotas de administração: concursos, cargos, edital, conteúdo, importação de provas e questões, usuários."""
from __future__ import annotations

import unicodedata

from flask import Blueprint, g, request

import ai
from api_study import Q_SELECT, generate_for_topic, q_reveal
from auth import ApiError, admin_required
from db import dumps, fingerprint, loads, now, slugify, tx
from importers import extract_exam_local, parse_questions_file, read_upload_text


bp = Blueprint("admin", __name__, url_prefix="/api/admin")


def body() -> dict:
    return request.get_json(force=True, silent=True) or {}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()
    return " ".join("".join(c if c.isalnum() else " " for c in s).split())


def get_or_create_subject(db, name: str) -> int:
    name = " ".join(name.split())[:120]
    slug = slugify(name)
    row = db.one("SELECT id FROM subjects WHERE slug=?", (slug,))
    if row:
        return row["id"]
    return db.insert("subjects", {"name": name, "slug": slug, "area": ""})


def get_or_create_topic(db, subject_id: int, name: str, position: int = 0) -> int:
    name = " ".join(name.split())[:300]
    n = norm(name)
    for t in db.q("SELECT id, name FROM topics WHERE subject_id=?", (subject_id,)):
        if norm(t["name"]) == n:
            return t["id"]
    return db.insert("topics", {"subject_id": subject_id, "name": name, "position": position, "created_at": now()})


def link_subject(db, role_id: int, subject_id: int, weight: float = 1, questions: int = 0):
    pos = db.val("SELECT COUNT(*) FROM role_subjects WHERE role_id=?", (role_id,), 0)
    db.x("""INSERT INTO role_subjects(role_id, subject_id, weight, questions, position) VALUES (?,?,?,?,?)
            ON CONFLICT(role_id, subject_id) DO UPDATE SET weight=excluded.weight, questions=excluded.questions""",
         (role_id, subject_id, weight, questions, pos))


def link_topic(db, role_id: int, topic_id: int):
    db.x("INSERT INTO role_topics(role_id, topic_id) VALUES (?,?) ON CONFLICT(role_id, topic_id) DO NOTHING", (role_id, topic_id))



@bp.get("/content-quality")
@admin_required
def content_quality():
    """Diagnóstico editorial somente leitura — não interpreta tamanho como qualidade."""
    with tx() as db:
        rows = db.q("""SELECT t.id, t.name AS topic, s.name AS subject,
                              l.body, l.origin, l.status AS lesson_status
                       FROM topics t JOIN subjects s ON s.id=t.subject_id
                       LEFT JOIN lessons l ON l.topic_id=t.id
                       ORDER BY s.name, t.position, t.id""")
        qdata = {r["topic_id"]: r for r in db.q(
            """SELECT topic_id, COUNT(*) AS total,
                      SUM(CASE WHEN rationales IS NOT NULL
                                AND rationales <> '[]' AND rationales <> ''
                               THEN 1 ELSE 0 END) AS reasoned
               FROM questions WHERE status='publicada' AND topic_id IS NOT NULL
               GROUP BY topic_id"""
        )}
        fdata = {r["topic_id"]: r["total"] for r in db.q(
            "SELECT topic_id, COUNT(*) AS total FROM flashcards WHERE status='publicada' GROUP BY topic_id"
        )}
    topics = []
    for row in rows:
        text = row["body"] or ""
        deepened = "## Aprofundamento" in text
        words = len(text.split())
        qs = qdata.get(row["id"], {})
        n_q = int(qs.get("total") or 0)
        n_rat = int(qs.get("reasoned") or 0)
        problems = []
        if not row["body"] or row["lesson_status"] != "publicado":
            problems.append("Aula ausente ou não publicada")
        elif words < 800:
            problems.append("Aula abaixo de 800 palavras (sinal de revisão)")
        if n_q < 3:
            problems.append("Menos de 3 questões")
        if n_q and n_rat < n_q:
            problems.append("Alternativas sem justificativas completas")
        if not deepened and row["body"]:
            problems.append("Sem aprofundamento editorial adicional")
        topics.append({
            "id": row["id"], "subject": row["subject"], "topic": row["topic"],
            "words": words, "questions": n_q, "with_rationales": n_rat,
            "flashcards": int(fdata.get(row["id"], 0)),
            "deepened": deepened,
            "issues": problems, "pending": bool(problems),
        })
    topics.sort(key=lambda x: (-len(x["issues"]), x["subject"], x["topic"]))
    return {
        "total": len(topics),
        "with_lesson": sum(bool(row["body"]) for row in rows),
        "deepened": sum(t["deepened"] for t in topics),
        "question_total": sum(t["questions"] for t in topics),
        "rationale_total": sum(t["with_rationales"] for t in topics),
        "pending": sum(t["pending"] for t in topics),
        "topics": topics,
        "disclaimer": "Indicadores de triagem, não certificação pedagógica nem garantia de exatidão.",
    }

# ---------------------------------------------------------------------------
# Visão geral
# ---------------------------------------------------------------------------

@bp.get("/overview")
@admin_required
def overview():
    with tx() as db:
        c = lambda sql: db.val(sql, (), 0)
        data = {
            "exams": c("SELECT COUNT(*) FROM exams"), "roles": c("SELECT COUNT(*) FROM roles"),
            "subjects": c("SELECT COUNT(*) FROM subjects"), "topics": c("SELECT COUNT(*) FROM topics"),
            "lessons": c("SELECT COUNT(*) FROM lessons"), "questions": c("SELECT COUNT(*) FROM questions WHERE status='publicada'"),
            "drafts": c("SELECT COUNT(*) FROM questions WHERE status='rascunho'"),
            "ai_questions": c("SELECT COUNT(*) FROM questions WHERE origin='ia' AND status='publicada'"),
            "ai_lessons": c("SELECT COUNT(*) FROM lessons WHERE origin='ia'"),
            "flashcards": c("SELECT COUNT(*) FROM flashcards"), "prior_exams": c("SELECT COUNT(*) FROM prior_exams"),
            "users": c("SELECT COUNT(*) FROM users"),
        }
        roles = db.q("""SELECT r.id, r.name, x.org, x.name AS exam, x.banca, x.published, r.exam_id,
                               (SELECT COUNT(*) FROM role_topics rt WHERE rt.role_id=r.id) AS n_topics,
                               (SELECT COUNT(*) FROM role_topics rt JOIN lessons l ON l.topic_id=rt.topic_id WHERE rt.role_id=r.id) AS n_lessons,
                               (SELECT COUNT(DISTINCT rt.topic_id) FROM role_topics rt JOIN questions q ON q.topic_id=rt.topic_id
                                  WHERE rt.role_id=r.id AND q.status='publicada') AS n_with_questions
                        FROM roles r JOIN exams x ON x.id=r.exam_id ORDER BY x.org, r.name""")
    return {**data, "roles_list": roles, "ai": ai.status()}


# ---------------------------------------------------------------------------
# Concursos e cargos
# ---------------------------------------------------------------------------

EXAM_FIELDS = ("org", "name", "banca", "year", "edital_url", "notes", "published")
ROLE_FIELDS = ("name", "level", "exam_date", "question_style", "description")


@bp.get("/exams")
@admin_required
def list_exams():
    with tx() as db:
        exams = db.q("SELECT * FROM exams ORDER BY org, name")
        for x in exams:
            x["roles"] = db.q("SELECT * FROM roles WHERE exam_id=? ORDER BY name", (x["id"],))
    return {"exams": exams}


@bp.post("/discovered-draft")
@admin_required
def discovered_draft():
    """Cria rascunho a partir de notícia, SEM afirmar existência de edital.

    O administrador confirma órgão/cargo e decide depois se publica.
    Copiar uma trilha preparatória é opcional e não altera a trilha original.
    """
    from urllib.parse import urlparse
    b = body()
    org = str(b.get("org") or "").strip()[:120]
    role_name = str(b.get("role") or "").strip()[:140]
    headline = str(b.get("headline") or "").strip()[:240]
    source = str(b.get("source_url") or "").strip()[:700]
    copy_from = b.get("copy_from")
    if not org or not role_name or not headline:
        raise ApiError(400, "Informe órgão, cargo e título da publicação.")
    u = urlparse(source)
    if u.scheme != "https" or not u.netloc:
        raise ApiError(400, "A fonte precisa ser um link HTTPS.")
    with tx() as db:
        template = None
        if copy_from:
            try:
                copy_id = int(copy_from)
            except (ValueError, TypeError):
                raise ApiError(400, "Modelo de trilha inválido.")
            template = db.one("SELECT id FROM roles WHERE id=?", (copy_id,))
            if not template:
                raise ApiError(404, "Trilha de referência não encontrada.")
        eid = db.insert("exams", {
            "org": org, "name": "Rascunho — " + headline[:140],
            "banca": "", "year": None, "edital_url": "",
            "notes": "RASCUNHO NÃO CONFIRMADO. Fonte de notícia (não é edital): " +
                     source + "\nPublicação: " + headline,
            "published": 0, "created_at": now(),
        })
        rid = db.insert("roles", {
            "exam_id": eid, "name": role_name, "level": "",
            "exam_date": None, "question_style": "multipla",
            "description": "Trilha em revisão. Confirmar edital, banca, regime, fases, "
                           "prazo, data de prova, peso e matérias antes da publicação.",
            "created_at": now(),
        })
        if template:
            for subj in db.q("SELECT subject_id, weight, questions FROM role_subjects WHERE role_id=?",
                             (copy_id,)):
                link_subject(db, rid, subj["subject_id"], subj["weight"], subj["questions"])
            for topic in db.q("SELECT topic_id FROM role_topics WHERE role_id=?", (copy_id,)):
                link_topic(db, rid, topic["topic_id"])
    return {"exam_id": eid, "role_id": rid, "published": False}


@bp.post("/exams")
@admin_required
def create_exam():
    b = body()
    if not str(b.get("org", "")).strip():
        raise ApiError(400, "Informe o órgão.")
    with tx() as db:
        eid = db.insert("exams", {"org": b["org"].strip(), "name": (b.get("name") or b["org"]).strip(),
                                  "banca": (b.get("banca") or "").strip(), "year": b.get("year") or None,
                                  "edital_url": b.get("edital_url") or "", "notes": b.get("notes") or "",
                                  "published": 1 if b.get("published", True) else 0, "created_at": now()})
    return {"id": eid}


@bp.patch("/exams/<int:eid>")
@admin_required
def update_exam(eid: int):
    b = body()
    with tx() as db:
        db.update("exams", eid, {k: (int(bool(b[k])) if k == "published" else b[k]) for k in EXAM_FIELDS if k in b})
    return {"ok": True}


@bp.delete("/exams/<int:eid>")
@admin_required
def delete_exam(eid: int):
    with tx() as db:
        db.x("DELETE FROM exams WHERE id=?", (eid,))
    return {"ok": True}


@bp.post("/roles")
@admin_required
def create_role():
    b = body()
    if not b.get("exam_id") or not str(b.get("name", "")).strip():
        raise ApiError(400, "Informe o concurso e o nome do cargo.")
    with tx() as db:
        rid = db.insert("roles", {"exam_id": int(b["exam_id"]), "name": b["name"].strip(), "level": b.get("level") or "",
                                  "exam_date": b.get("exam_date") or None,
                                  "question_style": b.get("question_style") if b.get("question_style") in ("multipla", "certo_errado") else "multipla",
                                  "description": b.get("description") or "", "created_at": now()})
        if b.get("copy_from"):
            src = int(b["copy_from"])
            for s in db.q("SELECT * FROM role_subjects WHERE role_id=?", (src,)):
                link_subject(db, rid, s["subject_id"], s["weight"], s["questions"])
            for t in db.q("SELECT topic_id FROM role_topics WHERE role_id=?", (src,)):
                link_topic(db, rid, t["topic_id"])
    return {"id": rid}


@bp.patch("/roles/<int:rid>")
@admin_required
def update_role(rid: int):
    b = body()
    with tx() as db:
        db.update("roles", rid, {k: b[k] for k in ROLE_FIELDS if k in b})
    return {"ok": True}


@bp.delete("/roles/<int:rid>")
@admin_required
def delete_role(rid: int):
    with tx() as db:
        db.x("DELETE FROM roles WHERE id=?", (rid,))
    return {"ok": True}


@bp.get("/roles/<int:rid>/structure")
@admin_required
def role_structure(rid: int):
    with tx() as db:
        role = db.one("SELECT r.*, x.org, x.name AS exam, x.banca FROM roles r JOIN exams x ON x.id=r.exam_id WHERE r.id=?", (rid,))
        if not role:
            raise ApiError(404, "Cargo não encontrado.")
        subjects = db.q("""SELECT s.id, s.name, rs.weight, rs.questions, rs.position FROM role_subjects rs
                           JOIN subjects s ON s.id=rs.subject_id WHERE rs.role_id=? ORDER BY rs.position, s.name""", (rid,))
        for s in subjects:
            s["topics"] = db.q(
                """SELECT t.id, t.name, t.position,
                          (SELECT l.origin FROM lessons l WHERE l.topic_id=t.id) AS lesson_origin,
                          (SELECT COUNT(*) FROM questions q WHERE q.topic_id=t.id AND q.status='publicada') AS n_questions,
                          (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id) AS n_cards
                   FROM role_topics rt JOIN topics t ON t.id=rt.topic_id
                   WHERE rt.role_id=? AND t.subject_id=? ORDER BY t.position, t.id""", (rid, s["id"]))
    return {"role": role, "subjects": subjects}


@bp.post("/roles/<int:rid>/subjects")
@admin_required
def add_subject(rid: int):
    b = body()
    name = str(b.get("name", "")).strip()
    if not name:
        raise ApiError(400, "Informe o nome da matéria.")
    with tx() as db:
        sid = get_or_create_subject(db, name)
        link_subject(db, rid, sid, float(b.get("weight") or 1), int(b.get("questions") or 0))
        if b.get("include_existing_topics"):
            for t in db.q("SELECT id FROM topics WHERE subject_id=?", (sid,)):
                link_topic(db, rid, t["id"])
    return {"id": sid}


@bp.patch("/roles/<int:rid>/subjects/<int:sid>")
@admin_required
def update_role_subject(rid: int, sid: int):
    b = body()
    with tx() as db:
        for k in ("weight", "questions", "position"):
            if k in b:
                db.x(f"UPDATE role_subjects SET {k}=? WHERE role_id=? AND subject_id=?", (b[k], rid, sid))
        if b.get("name"):
            db.x("UPDATE subjects SET name=? WHERE id=?", (b["name"].strip(), sid))
    return {"ok": True}


@bp.delete("/roles/<int:rid>/subjects/<int:sid>")
@admin_required
def unlink_subject(rid: int, sid: int):
    with tx() as db:
        db.x("DELETE FROM role_subjects WHERE role_id=? AND subject_id=?", (rid, sid))
        db.x("DELETE FROM role_topics WHERE role_id=? AND topic_id IN (SELECT id FROM topics WHERE subject_id=?)", (rid, sid))
    return {"ok": True}


@bp.post("/roles/<int:rid>/topics")
@admin_required
def add_topic(rid: int):
    b = body()
    names = [n.strip() for n in str(b.get("names") or b.get("name") or "").splitlines() if n.strip()]
    sid = int(b.get("subject_id") or 0)
    if not names or not sid:
        raise ApiError(400, "Informe a matéria e pelo menos um tópico.")
    ids = []
    with tx() as db:
        base = db.val("SELECT MAX(position) FROM topics WHERE subject_id=?", (sid,), 0)
        for i, n in enumerate(names):
            tid = get_or_create_topic(db, sid, n, base + i + 1)
            link_topic(db, rid, tid)
            ids.append(tid)
    return {"ids": ids}


@bp.patch("/topics/<int:tid>")
@admin_required
def rename_topic(tid: int):
    b = body()
    with tx() as db:
        data = {k: b[k] for k in ("name", "position") if k in b}
        db.update("topics", tid, data)
    return {"ok": True}


@bp.delete("/roles/<int:rid>/topics/<int:tid>")
@admin_required
def unlink_topic(rid: int, tid: int):
    with tx() as db:
        db.x("DELETE FROM role_topics WHERE role_id=? AND topic_id=?", (rid, tid))
    return {"ok": True}


@bp.get("/subjects")
@admin_required
def subjects():
    with tx() as db:
        rows = db.q("""SELECT s.id, s.name, (SELECT COUNT(*) FROM topics t WHERE t.subject_id=s.id) AS n_topics,
                              (SELECT COUNT(*) FROM questions q WHERE q.subject_id=s.id) AS n_questions
                       FROM subjects s ORDER BY s.name""")
    return {"subjects": rows}


@bp.get("/subjects/<int:sid>/topics")
@admin_required
def subject_topics(sid: int):
    with tx() as db:
        return {"topics": db.q("SELECT id, name FROM topics WHERE subject_id=? ORDER BY position, id", (sid,))}


# ---------------------------------------------------------------------------
# Edital: a IA lê o PDF e propõe matérias e tópicos; o admin confere e aplica
# ---------------------------------------------------------------------------

@bp.post("/edital/parse")
@admin_required
def edital_parse():
    text = request.form.get("text", "")
    if "file" in request.files:
        text = read_upload_text(request.files["file"])
    if len(text.strip()) < 100:
        raise ApiError(400, "Envie o PDF do edital ou cole o trecho do conteúdo programático.")
    proposal = ai.parse_edital(text, request.form.get("role_hint", ""))
    with tx() as db:
        known = {r["slug"]: r for r in db.q("SELECT id, name, slug FROM subjects")}
        for s in proposal.get("subjects", []):
            k = known.get(slugify(str(s.get("name", ""))))
            s["existing_id"] = k["id"] if k else None
            s["topics"] = [str(t).strip() for t in s.get("topics") or [] if str(t).strip()]
            if k:
                existing = {norm(t["name"]) for t in db.q("SELECT name FROM topics WHERE subject_id=?", (k["id"],))}
                s["existing_topics"] = sum(1 for t in s["topics"] if norm(t) in existing)
    return proposal


@bp.post("/edital/apply")
@admin_required
def edital_apply():
    b = body()
    subjects_in = b.get("subjects") or []
    if not subjects_in:
        raise ApiError(400, "Nenhuma matéria para aplicar.")
    with tx() as db:
        role_id = int(b.get("role_id") or 0)
        if not role_id:
            exam_id = int(b.get("exam_id") or 0)
            if not exam_id:
                ex = b.get("exam") or {}
                if not str(ex.get("org", "")).strip():
                    raise ApiError(400, "Informe o órgão do concurso.")
                exam_id = db.insert("exams", {"org": ex["org"].strip(), "name": (ex.get("name") or ex["org"]).strip(),
                                              "banca": ex.get("banca") or "", "year": ex.get("year") or None,
                                              "edital_url": ex.get("edital_url") or "", "notes": "", "published": 1,
                                              "created_at": now()})
            ro = b.get("role") or {}
            if not str(ro.get("name", "")).strip():
                raise ApiError(400, "Informe o nome do cargo.")
            role_id = db.insert("roles", {"exam_id": exam_id, "name": ro["name"].strip(), "level": ro.get("level") or "",
                                          "exam_date": ro.get("exam_date") or None,
                                          "question_style": ro.get("question_style") if ro.get("question_style") in ("multipla", "certo_errado") else "multipla",
                                          "description": "", "created_at": now()})
        n_topics = 0
        for s in subjects_in:
            name = str(s.get("name", "")).strip()
            if not name:
                continue
            sid = get_or_create_subject(db, name)
            link_subject(db, role_id, sid, float(s.get("weight") or 1), int(s.get("questions") or 0))
            base = db.val("SELECT MAX(position) FROM topics WHERE subject_id=?", (sid,), 0)
            for i, t in enumerate(s.get("topics") or []):
                if str(t).strip():
                    link_topic(db, role_id, get_or_create_topic(db, sid, str(t), base + i + 1))
                    n_topics += 1
    return {"role_id": role_id, "topics": n_topics}


# ---------------------------------------------------------------------------
# Conteúdo
# ---------------------------------------------------------------------------

@bp.get("/roles/<int:rid>/gaps")
@admin_required
def gaps(rid: int):
    with tx() as db:
        rows = db.q("""SELECT t.id, t.name, s.name AS subject,
                              (SELECT COUNT(*) FROM lessons l WHERE l.topic_id=t.id) AS has_lesson,
                              (SELECT COUNT(*) FROM questions q WHERE q.topic_id=t.id AND q.status='publicada') AS n_questions,
                              (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id) AS n_cards
                       FROM role_topics rt JOIN topics t ON t.id=rt.topic_id JOIN subjects s ON s.id=t.subject_id
                       JOIN role_subjects rs ON rs.role_id=rt.role_id AND rs.subject_id=s.id
                       WHERE rt.role_id=? ORDER BY rs.position, t.position, t.id""", (rid,))
    return {"topics": rows}


@bp.post("/topics/<int:tid>/generate")
@admin_required
def admin_generate(tid: int):
    b = body()
    parts = [p for p in b.get("parts", ["lesson", "questions", "flashcards"]) if p in ("lesson", "questions", "flashcards")]
    return generate_for_topic(tid, parts, None, int(b.get("n") or 8))


@bp.get("/topics/<int:tid>/content")
@admin_required
def topic_content(tid: int):
    with tx() as db:
        t = db.one("SELECT t.*, s.name AS subject FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE t.id=?", (tid,))
        if not t:
            raise ApiError(404, "Tópico não encontrado.")
        lesson = db.one("SELECT * FROM lessons WHERE topic_id=?", (tid,))
        qs = [q_reveal(q) | {"status": q["status"]} for q in db.q(f"{Q_SELECT} WHERE q.topic_id=? ORDER BY q.id", (tid,))]
        cards = db.q("SELECT * FROM flashcards WHERE topic_id=? ORDER BY id", (tid,))
    return {"topic": t, "lesson": lesson, "questions": qs, "flashcards": cards}


@bp.put("/topics/<int:tid>/lesson")
@admin_required
def save_lesson(tid: int):
    b = body()
    text = str(b.get("body", "")).strip()
    if not text:
        raise ApiError(400, "A aula está vazia.")
    with tx() as db:
        db.x("""INSERT INTO lessons(topic_id, body, summary, minutes, origin, status, updated_at) VALUES (?,?,?,?,?,?,?)
                ON CONFLICT(topic_id) DO UPDATE SET body=excluded.body, summary=excluded.summary, minutes=excluded.minutes,
                status=excluded.status, origin=CASE WHEN lessons.origin='ia' THEN 'ia_revisada' ELSE lessons.origin END,
                updated_at=excluded.updated_at""",
             (tid, text, str(b.get("summary", ""))[:300], int(b.get("minutes") or 15), "autoral",
              "rascunho" if b.get("status") == "rascunho" else "publicado", now()))
    return {"ok": True}


@bp.delete("/topics/<int:tid>/lesson")
@admin_required
def delete_lesson(tid: int):
    with tx() as db:
        db.x("DELETE FROM lessons WHERE topic_id=?", (tid,))
    return {"ok": True}


@bp.get("/questions")
@admin_required
def list_questions():
    a = request.args
    where, params = ["1=1"], []
    for k, col in (("status", "q.status"), ("origin", "q.origin")):
        if a.get(k):
            where.append(f"{col}=?")
            params.append(a[k])
    for k, col in (("topic_id", "q.topic_id"), ("subject_id", "q.subject_id"), ("prior_exam_id", "q.prior_exam_id")):
        if a.get(k):
            where.append(f"{col}=?")
            params.append(int(a[k]))
    if a.get("q"):
        where.append("LOWER(q.statement) LIKE ?")
        params.append(f"%{a['q'].lower()}%")
    page = max(1, int(a.get("page", 1)))
    with tx() as db:
        total = db.val(f"SELECT COUNT(*) FROM questions q WHERE {' AND '.join(where)}", params, 0)
        rows = db.q(f"{Q_SELECT} WHERE {' AND '.join(where)} ORDER BY q.id DESC LIMIT 30 OFFSET ?", [*params, (page - 1) * 30])
    return {"total": total, "page": page, "questions": [q_reveal(r) | {"status": r["status"]} for r in rows]}


def _question_data(b: dict, partial: bool = False) -> dict:
    data = {}
    if "statement" in b or not partial:
        st = str(b.get("statement", "")).strip()
        if not st:
            raise ApiError(400, "O enunciado está vazio.")
        data["statement"] = st
    kind = b.get("kind")
    if kind is not None or not partial:
        data["kind"] = "certo_errado" if kind == "certo_errado" else "multipla"
    if "options" in b or not partial:
        data["options"] = dumps([str(o).strip() for o in b.get("options") or [] if str(o).strip()])
    if "answer" in b or not partial:
        ans = str(b.get("answer", "")).strip().upper()[:1]
        if ans and ans not in "ABCDECEX":
            raise ApiError(400, "Gabarito inválido.")
        data["answer"] = ans
    for k in ("explanation", "banca", "source", "origin"):
        if k in b:
            data[k] = str(b[k] or "")
    for k in ("subject_id", "topic_id", "year", "number"):
        if k in b:
            data[k] = int(b[k]) if b[k] not in (None, "") else None
    if "status" in b:
        data["status"] = "publicada" if b["status"] == "publicada" else ("arquivada" if b["status"] == "arquivada" else "rascunho")
    if "rationales" in b:
        data["rationales"] = dumps(b["rationales"] or [])
    return data


@bp.post("/questions")
@admin_required
def create_question():
    b = body()
    data = _question_data(b)
    if not data.get("subject_id") and not b.get("subject_id"):
        raise ApiError(400, "Escolha a matéria.")
    data.setdefault("status", "publicada")
    data.setdefault("origin", "autoral")
    data["fingerprint"] = fingerprint(data["statement"], loads(data["options"], []))
    data["created_at"] = now()
    with tx() as db:
        qid = db.insert("questions", data)
    return {"id": qid}


@bp.patch("/questions/<int:qid>")
@admin_required
def update_question(qid: int):
    data = _question_data(body(), partial=True)
    with tx() as db:
        q = db.one("SELECT * FROM questions WHERE id=?", (qid,))
        if not q:
            raise ApiError(404, "Questão não encontrada.")
        if data.get("status") == "publicada" and not (data.get("answer") or q["answer"]):
            raise ApiError(400, "Defina o gabarito antes de publicar.")
        if "statement" in data or "options" in data:
            data["fingerprint"] = fingerprint(data.get("statement", q["statement"]), loads(data.get("options", q["options"]), []))
        db.update("questions", qid, data)
    return {"ok": True}


@bp.delete("/questions/<int:qid>")
@admin_required
def delete_question(qid: int):
    with tx() as db:
        db.x("DELETE FROM questions WHERE id=?", (qid,))
    return {"ok": True}


@bp.post("/questions/import")
@admin_required
def import_questions():
    if "file" not in request.files:
        raise ApiError(400, "Envie um arquivo CSV ou JSON.")
    f = request.files["file"]
    items = parse_questions_file(read_upload_text(f), f.filename or "")
    default_subject = int(request.form.get("subject_id") or 0)
    default_topic = int(request.form.get("topic_id") or 0) or None
    status = "publicada" if request.form.get("publish") == "1" else "rascunho"
    report = {"created": 0, "duplicates": 0, "skipped": 0, "total": len(items)}
    with tx() as db:
        for it in items:
            sid = default_subject or (get_or_create_subject(db, it["subject"]) if it["subject"] else 0)
            if not sid:
                report["skipped"] += 1
                continue
            tid = default_topic or (get_or_create_topic(db, sid, it["topic"]) if it["topic"] else None)
            fp = fingerprint(it["statement"], it["options"])
            if db.one("SELECT id FROM questions WHERE fingerprint=?", (fp,)):
                report["duplicates"] += 1
                continue
            db.insert("questions", {"subject_id": sid, "topic_id": tid, "kind": it["kind"], "statement": it["statement"],
                                    "options": dumps(it["options"]), "answer": it["answer"], "explanation": it["explanation"],
                                    "origin": it["origin"] if it["origin"] in ("autoral", "oficial", "ia", "adaptada") else "autoral",
                                    "status": status, "banca": it["banca"], "year": it["year"], "source": it["source"],
                                    "fingerprint": fp, "created_at": now()})
            report["created"] += 1
    return report


@bp.post("/topics/<int:tid>/flashcards")
@admin_required
def add_card(tid: int):
    b = body()
    if not str(b.get("front", "")).strip() or not str(b.get("back", "")).strip():
        raise ApiError(400, "Preencha frente e verso.")
    with tx() as db:
        fid = db.insert("flashcards", {"topic_id": tid, "front": b["front"].strip(), "back": b["back"].strip(),
                                       "origin": "autoral", "status": "publicada", "created_at": now()})
    return {"id": fid}


@bp.delete("/flashcards/<int:fid>")
@admin_required
def delete_card(fid: int):
    with tx() as db:
        db.x("DELETE FROM flashcards WHERE id=?", (fid,))
    return {"ok": True}


# ---------------------------------------------------------------------------
# Provas anteriores: PDF da prova + gabarito -> questões -> revisão -> simulado
# ---------------------------------------------------------------------------

@bp.post("/prior-exams/extract")
@admin_required
def extract_prior_exam():
    if "prova" not in request.files and not request.form.get("prova_text"):
        raise ApiError(400, "Envie o PDF da prova.")
    prova = read_upload_text(request.files["prova"]) if "prova" in request.files else request.form["prova_text"]
    gab = ""
    if "gabarito" in request.files:
        gab = read_upload_text(request.files["gabarito"])
    gab = gab or request.form.get("gabarito_text", "")
    style = request.form.get("style", "multipla")
    use_ai = request.form.get("use_ai", "1") == "1" and ai.status()["enabled"]
    if use_ai:
        items = ai.extract_exam(prova, gab, style)
        method = "ia"
    else:
        items = extract_exam_local(prova, style)
        key = ai.parse_answer_key(gab) if gab else {}
        for it in items:
            it["answer"] = key.get(it["number"], "")
        method = "local"
    role_id = int(request.form.get("role_id") or 0)
    with tx() as db:
        subjects = db.q("""SELECT s.id, s.name FROM role_subjects rs JOIN subjects s ON s.id=rs.subject_id WHERE rs.role_id=?""",
                        (role_id,)) if role_id else db.q("SELECT id, name FROM subjects")
    by_norm = {norm(s["name"]): s["id"] for s in subjects}
    for it in items:
        it["subject_id"] = by_norm.get(norm(it.get("subject", "")))
        if not it["subject_id"]:
            n = norm(it.get("subject", ""))
            it["subject_id"] = next((sid for k, sid in by_norm.items() if n and (n in k or k in n)), None)
    missing = sum(1 for it in items if not it["answer"])
    return {"method": method, "questions": items, "without_answer": missing, "subjects": subjects}


@bp.post("/prior-exams")
@admin_required
def save_prior_exam():
    b = body()
    meta = b.get("exam") or {}
    qs = b.get("questions") or []
    if not str(meta.get("title", "")).strip():
        raise ApiError(400, "Dê um título à prova (ex.: PC-SP 2023 — Escrivão).")
    if not qs:
        raise ApiError(400, "Nenhuma questão para salvar.")
    style = meta.get("style") if meta.get("style") in ("multipla", "certo_errado") else "multipla"
    publish = bool(meta.get("publish"))
    with tx() as db:
        pid = db.insert("prior_exams", {"exam_id": meta.get("exam_id") or None, "role_id": meta.get("role_id") or None,
                                        "title": meta["title"].strip(), "banca": meta.get("banca") or "",
                                        "year": meta.get("year") or None, "style": style,
                                        "duration_min": int(meta.get("duration_min") or 240),
                                        "status": "publicada" if publish else "rascunho",
                                        "source_note": meta.get("source_note") or "", "created_at": now()})
        fallback = db.val("SELECT id FROM subjects ORDER BY id LIMIT 1", (), None)
        saved = 0
        for q in qs:
            st = str(q.get("statement", "")).strip()
            if not st:
                continue
            opts = [str(o).strip() for o in q.get("options") or [] if str(o).strip()]
            ans = str(q.get("answer", "")).strip().upper()[:1]
            sid = int(q.get("subject_id") or 0) or fallback
            db.insert("questions", {"subject_id": sid, "topic_id": q.get("topic_id") or None,
                                    "kind": "certo_errado" if (q.get("kind") == "certo_errado" or style == "certo_errado") else "multipla",
                                    "statement": st, "options": dumps(opts), "answer": ans,
                                    "explanation": q.get("explanation") or "", "origin": "oficial",
                                    "status": "publicada" if (publish and ans) else "rascunho",
                                    "banca": meta.get("banca") or "", "year": meta.get("year") or None,
                                    "source": meta["title"].strip(), "prior_exam_id": pid, "number": q.get("number"),
                                    "fingerprint": fingerprint(st, opts), "created_at": now()})
            saved += 1
    return {"id": pid, "saved": saved}


@bp.get("/prior-exams")
@admin_required
def list_prior_exams():
    with tx() as db:
        rows = db.q("""SELECT p.*, r.name AS role,
                              (SELECT COUNT(*) FROM questions q WHERE q.prior_exam_id=p.id) AS n_questions,
                              (SELECT COUNT(*) FROM questions q WHERE q.prior_exam_id=p.id AND q.status='publicada') AS n_published,
                              (SELECT COUNT(*) FROM questions q WHERE q.prior_exam_id=p.id AND q.answer='') AS n_no_answer
                       FROM prior_exams p LEFT JOIN roles r ON r.id=p.role_id ORDER BY p.id DESC""")
    return {"exams": rows}


@bp.get("/prior-exams/<int:pid>")
@admin_required
def get_prior_exam(pid: int):
    with tx() as db:
        p = db.one("SELECT * FROM prior_exams WHERE id=?", (pid,))
        if not p:
            raise ApiError(404, "Prova não encontrada.")
        qs = [q_reveal(q) | {"status": q["status"]} for q in db.q(f"{Q_SELECT} WHERE q.prior_exam_id=? ORDER BY q.number, q.id", (pid,))]
    return {"exam": p, "questions": qs}


@bp.patch("/prior-exams/<int:pid>")
@admin_required
def update_prior_exam(pid: int):
    b = body()
    with tx() as db:
        data = {k: b[k] for k in ("title", "banca", "year", "duration_min", "style", "role_id", "exam_id", "source_note") if k in b}
        if "status" in b:
            data["status"] = "publicada" if b["status"] == "publicada" else "rascunho"
            if data["status"] == "publicada":
                db.x("UPDATE questions SET status='publicada' WHERE prior_exam_id=? AND answer<>'' AND status='rascunho'", (pid,))
        db.update("prior_exams", pid, data)
    return {"ok": True}


@bp.delete("/prior-exams/<int:pid>")
@admin_required
def delete_prior_exam(pid: int):
    with tx() as db:
        db.x("DELETE FROM questions WHERE prior_exam_id=?", (pid,))
        db.x("DELETE FROM prior_exams WHERE id=?", (pid,))
    return {"ok": True}


# ---------------------------------------------------------------------------
# Usuários
# ---------------------------------------------------------------------------

@bp.get("/users")
@admin_required
def users():
    with tx() as db:
        rows = db.q("""SELECT u.id, u.name, u.email, u.is_admin, u.created_at,
                              (SELECT COUNT(*) FROM answers a WHERE a.user_id=u.id) AS answers
                       FROM users u ORDER BY u.id""")
    return {"users": rows}


@bp.patch("/users/<int:uid>")
@admin_required
def update_user(uid: int):
    b = body()
    if uid == g.user["id"] and "is_admin" in b and not b["is_admin"]:
        raise ApiError(400, "Você não pode remover o próprio acesso de administrador.")
    with tx() as db:
        if "is_admin" in b:
            db.update("users", uid, {"is_admin": 1 if b["is_admin"] else 0})
    return {"ok": True}
