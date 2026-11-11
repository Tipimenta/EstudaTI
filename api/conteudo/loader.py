"""Carrega os pacotes de conteúdo (conteudo/packs/*.json) quando o banco está vazio.

Formato do pacote:
  subjects: [{name, topics: [{name, lesson?, questions?, flashcards?, general?}]}]
  discursives: [{subject, title, prompt, model_answer, rubric}]
  exams: [{org, name, banca, year, notes, roles: [{name, level, question_style, subjects: [{name, weight, questions, topics}]}]}]
  Em roles.subjects.topics: "*" = todos os tópicos da matéria; "general" = todos menos oficinas específicas;
  ou uma lista de nomes.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

from db import dumps, fingerprint, now, slugify, tx

PACKS = Path(__file__).parent / "packs"


def _subject(db, name: str) -> int:
    row = db.one("SELECT id FROM subjects WHERE slug=?", (slugify(name),))
    return row["id"] if row else db.insert("subjects", {"name": name, "slug": slugify(name), "area": ""})


def load_pack(db, pack: dict) -> dict:
    """Carrega em lotes (executemany): poucas idas ao banco, rápido mesmo com PostgreSQL remoto."""
    general_flags: dict[int, bool] = {}
    stats = {"topics": 0, "lessons": 0, "questions": 0, "flashcards": 0}
    known_fp = {r["fingerprint"] for r in db.q("SELECT fingerprint FROM questions")}
    has_lesson = {r["topic_id"] for r in db.q("SELECT topic_id FROM lessons")}
    ts = now()
    for s in pack.get("subjects", []):
        sid = _subject(db, s["name"])
        existing = {r["name"]: r["id"] for r in db.q("SELECT id, name FROM topics WHERE subject_id=?", (sid,))}
        base = db.val("SELECT MAX(position) FROM topics WHERE subject_id=?", (sid,), 0)
        new_rows = [(sid, t["name"], base + i + 1, ts) for i, t in enumerate(s.get("topics", [])) if t["name"] not in existing]
        db.many("INSERT INTO topics(subject_id, name, position, created_at) VALUES (?,?,?,?)", new_rows)
        stats["topics"] += len(new_rows)
        ids = {r["name"]: r["id"] for r in db.q("SELECT id, name FROM topics WHERE subject_id=?", (sid,))}
        lessons, questions, cards = [], [], []
        for t in s.get("topics", []):
            tid = ids[t["name"]]
            general_flags[tid] = t.get("general", True)
            les = t.get("lesson")
            if les and tid not in has_lesson:
                has_lesson.add(tid)
                lessons.append((tid, les["body"], les.get("summary", ""), les.get("minutes", 15), les.get("origin", "autoral"), "publicado", ts))
            for q in t.get("questions", []):
                fp = fingerprint(q["statement"], q.get("options", []))
                if fp in known_fp:
                    continue
                known_fp.add(fp)
                questions.append((sid, tid, q.get("kind", "multipla"), q["statement"], dumps(q.get("options", [])), q["answer"],
                                  q.get("explanation", ""), dumps(q.get("rationales", [])), q.get("origin", "autoral"), "publicada",
                                  q.get("banca", ""), q.get("year"), q.get("source", ""), fp, ts))
            for c in t.get("flashcards", []):
                cards.append((tid, c["front"], c["back"], "autoral", "publicada", ts))
        db.many("""INSERT INTO lessons(topic_id, body, summary, minutes, origin, status, updated_at) VALUES (?,?,?,?,?,?,?)""", lessons)
        db.many("""INSERT INTO questions(subject_id, topic_id, kind, statement, options, answer, explanation, rationales, origin,
                   status, banca, year, source, fingerprint, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", questions)
        db.many("INSERT INTO flashcards(topic_id, front, back, origin, status, created_at) VALUES (?,?,?,?,?,?)", cards)
        stats["lessons"] += len(lessons)
        stats["questions"] += len(questions)
        stats["flashcards"] += len(cards)
    db.many("""INSERT INTO discursives(subject_id, title, prompt, model_answer, rubric, max_lines, origin, created_at)
               VALUES (?,?,?,?,?,?,?,?)""",
            [(_subject(db, d["subject"]), d["title"], d["prompt"], d.get("model_answer", ""), dumps(d.get("rubric", [])),
              d.get("max_lines", 30), d.get("origin", "autoral"), ts) for d in pack.get("discursives", [])])
    for x in pack.get("exams", []):
        eid = db.insert("exams", {"org": x["org"], "name": x.get("name") or x["org"], "banca": x.get("banca", ""),
                                  "year": x.get("year"), "edital_url": x.get("edital_url", ""), "notes": x.get("notes", ""),
                                  "published": 1, "created_at": ts})
        for r in x.get("roles", []):
            rid = db.insert("roles", {"exam_id": eid, "name": r["name"], "level": r.get("level", ""),
                                      "exam_date": r.get("exam_date"), "question_style": r.get("question_style", "multipla"),
                                      "description": r.get("description", ""), "created_at": ts})
            links = []
            for pos, s in enumerate(r.get("subjects", [])):
                sid = _subject(db, s["name"])
                db.x("""INSERT INTO role_subjects(role_id, subject_id, weight, questions, position) VALUES (?,?,?,?,?)
                        ON CONFLICT(role_id, subject_id) DO NOTHING""",
                     (rid, sid, s.get("weight", 1), s.get("questions", 0), pos))
                topics = db.q("SELECT id, name FROM topics WHERE subject_id=? ORDER BY position, id", (sid,))
                sel = s.get("topics", "*")
                if sel == "general":
                    topics = [t for t in topics if general_flags.get(t["id"], True) and not t["name"].startswith("Oficina:")]
                elif isinstance(sel, list):
                    topics = [t for t in topics if t["name"] in sel]
                links += [(rid, t["id"]) for t in topics]
            db.many("INSERT INTO role_topics(role_id, topic_id) VALUES (?,?) ON CONFLICT(role_id, topic_id) DO NOTHING", links)
    return stats


def seed_if_empty():
    with tx() as db:
        if db.val("SELECT COUNT(*) FROM subjects", (), 0):
            return
        wanted = [p.strip() for p in os.getenv("SEED_PACKS", "ti_birigui,pcsp_escrivao").split(",") if p.strip()]
        for name in wanted:
            path = PACKS / f"{name}.json"
            if path.exists():
                load_pack(db, json.loads(path.read_text(encoding="utf-8")))
