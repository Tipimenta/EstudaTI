"""Converte o conteúdo do EstudaTI (V1.3) no pacote de conteúdo da nova plataforma.

Entradas (geradas a partir do repositório antigo):
  --db           banco SQLite do EstudaTI já semeado (todas as aulas, questões, flashcards e discursivas)
  --academy      JSON com as aulas pedagógicas (web/src/academy exportado)
  --curriculum   JSON com a ordem dos módulos (web/src/academy/curriculum.ts exportado)
Saída:
  api/conteudo/packs/ti_birigui.json

Uso: python scripts/converter_estudati.py --db old.sqlite3 --academy academy.json --curriculum curriculum.json
"""
from __future__ import annotations

import argparse
import json
import re
import sqlite3
from pathlib import Path

SUBJECT_NAMES = {
    "RED": "Redes de Computadores", "SEG": "Segurança da Informação", "SO": "Sistemas Operacionais e Virtualização",
    "POR": "Língua Portuguesa", "GOV": "Governança e Gestão de TI", "BD": "Banco de Dados e SQL",
    "ENG": "Engenharia de Software", "LOG": "Raciocínio Lógico", "LEG": "Legislação e Governo Digital",
}
ORDER = ["POR", "LOG", "LEG", "GOV", "RED", "SO", "SEG", "BD", "ENG"]
LETTERS = "ABCDE"


def clean_title(t: str) -> str:
    t = t.strip()
    m = re.match(r"\[(Aprofundamento|Oficina)\]\s*(.+)", t)
    if m:
        kind, rest = m.groups()
        return f"Oficina: {rest}" if kind == "Oficina" else f"{rest} (aprofundamento)"
    return t


def render_lesson(a: dict) -> str:
    parts = []
    if a.get("goal"):
        parts.append("## Para que serve\n\n" + a["goal"].strip())
    steps = a.get("steps") or []
    if steps:
        parts.append("## Explicação")
        for s in steps:
            title = re.sub(r"^\d+\.\s*", "", s.get("title", "")).strip()
            parts.append(f"### {title}\n\n{s.get('body', '').strip()}")
    w = a.get("worked") or {}
    if w.get("body"):
        parts.append(f"## Exemplo resolvido\n\n**{w.get('title', '').strip()}**\n\n{w['body'].strip()}")
    if a.get("pitfalls"):
        parts.append("## Pegadinhas\n\n" + "\n".join(f"- {p.strip()}" for p in a["pitfalls"]))
    if a.get("review"):
        parts.append("## Resumo para revisar\n\n" + "\n".join(f"- **{r['ask'].strip()}** {r['answer'].strip()}" for r in a["review"]))
    if a.get("extra"):
        parts.append("## Para ir além\n\n" + a["extra"].strip())
    return "\n\n".join(parts)


def rationales(raw, n: int) -> list:
    v = json.loads(raw or "null")
    if isinstance(v, dict) and v:
        return [str(v.get(LETTERS[i], "")) for i in range(n)]
    if isinstance(v, list):
        return [str(x) for x in v][:n]
    return []


def old_content_to_md(content: str) -> str:
    c = content.strip()
    c = re.sub(r"(?m)^# ", "## ", c)
    return c


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", required=True)
    ap.add_argument("--academy", required=True)
    ap.add_argument("--curriculum", required=True)
    ap.add_argument("--out", default=str(Path(__file__).resolve().parents[1] / "api/conteudo/packs/ti_birigui.json"))
    args = ap.parse_args()

    db = sqlite3.connect(args.db)
    db.row_factory = sqlite3.Row
    academy = json.loads(Path(args.academy).read_text())
    curriculum = json.loads(Path(args.curriculum).read_text())
    position = {}
    for code, modules in curriculum.items():
        i = 0
        for m in modules:
            for tid in m["topicIds"]:
                position[tid] = i
                i += 1

    subjects = []
    stats = {"topics": 0, "questions": 0, "flashcards": 0}
    for code in ORDER:
        srow = db.execute("SELECT id FROM subjects WHERE code=?", (code,)).fetchone()
        topics = []
        rows = db.execute("SELECT * FROM topics WHERE subject_id=?", (srow["id"],)).fetchall()
        rows = sorted(rows, key=lambda r: (position.get(r["id"], 1000 + r["id"]), r["id"]))
        seen_names = set()
        for r in rows:
            a = academy.get(str(r["id"]))
            name = clean_title(r["title"])
            if name.lower() in seen_names:
                name = f"{name} ({r['id']})"
            seen_names.add(name.lower())
            body = render_lesson(a) if a else old_content_to_md(r["content"])
            summary = (a or {}).get("goal") or r["objective"] or ""
            qs = []
            for q in db.execute("SELECT * FROM questions WHERE topic_id=? AND review_status='revisada' ORDER BY id", (r["id"],)):
                opts = json.loads(q["choices_json"])
                if not (0 <= q["correct_index"] < len(opts)):
                    continue
                qs.append({"kind": "multipla", "statement": q["question"], "options": opts,
                           "answer": LETTERS[q["correct_index"]], "explanation": q["explanation"] or "",
                           "rationales": rationales(q["choice_rationales_json"], len(opts)),
                           "origin": "autoral" if q["origin"] in ("autoral", "", None) else q["origin"],
                           "banca": q["board"] or "", "year": int(q["year"]) if str(q["year"] or "").isdigit() else None,
                           "source": q["exam"] or ""})
            cards = [{"front": f["front"], "back": f["back"]}
                     for f in db.execute("SELECT front, back FROM flashcards WHERE topic_id=? ORDER BY id", (r["id"],))]
            if len(cards) < 3 and a:
                cards += [{"front": x["ask"], "back": x["answer"]} for x in a.get("review", [])][: 4 - len(cards)]
            topics.append({"name": name, "lesson": {"body": body, "summary": summary[:300],
                                                    "minutes": int(r["minutes"] or 20), "origin": "autoral"},
                           "questions": qs, "flashcards": cards, "general": not r["title"].startswith("[Oficina]")})
            stats["topics"] += 1
            stats["questions"] += len(qs)
            stats["flashcards"] += len(cards)
        subjects.append({"name": SUBJECT_NAMES[code], "code": code, "topics": topics})

    discursives = []
    for d in db.execute("SELECT d.*, s.code FROM discursive_questions d JOIN subjects s ON s.id=d.subject_id ORDER BY d.id"):
        discursives.append({"subject": SUBJECT_NAMES[d["code"]], "title": d["title"], "prompt": d["prompt"],
                            "model_answer": d["model_answer"], "rubric": json.loads(d["rubric_json"] or "[]"),
                            "origin": d["origin"] or "autoral"})

    pack = {
        "name": "Tecnologia da Informação (conteúdo do EstudaTI)",
        "subjects": subjects,
        "discursives": discursives,
        "exams": [{
            "org": "Prefeitura de Birigui/SP", "name": "Concurso Prefeitura de Birigui 2026", "banca": "Instituto ACCESS",
            "year": 2026, "edital_url": "",
            "notes": "Edital 220/2026 (com Retificações I e II). Matriz montada a partir do Anexo II. Confira retificações.",
            "roles": [{"name": "Analista de Tecnologia da Informação", "level": "Superior", "question_style": "multipla",
                       "description": "Matriz do edital 220/2026 com todo o conteúdo autoral do EstudaTI.",
                       "subjects": [{"name": SUBJECT_NAMES[c], "weight": 1.5 if c not in ("POR", "LOG") else 1,
                                     "topics": "*"} for c in ORDER]}],
        }],
    }
    Path(args.out).write_text(json.dumps(pack, ensure_ascii=False, indent=1))
    print(f"Pacote salvo em {args.out}: {stats} e {len(discursives)} discursivas")


if __name__ == "__main__":
    main()
