#!/usr/bin/env python3
"""Auditoria estrutural e sinais de aprofundamento didático do Estuda 2.2.

Uso: python scripts/auditar_conteudo.py
     python scripts/auditar_conteudo.py --json
     python scripts/auditar_conteudo.py --strict-structure

Os limites de palavras são ALERTAS editoriais, nunca prova de que uma aula
é boa ou ruim. Este script não acessa nem modifica o banco de dados.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "api" / "conteudo" / "packs"
sys.path.insert(0, str(ROOT / "api"))
from conteudo.aprofundamentos import SUPPLEMENTS  # noqa: E402


def audit() -> dict:
    rows = []
    issues = []
    for file in sorted(PACKS.glob("*.json")):
        pack = json.loads(file.read_text(encoding="utf-8"))
        for subject in pack.get("subjects", []):
            for topic in subject.get("topics", []):
                label = f"{subject['name']} / {topic['name']}"
                lesson = topic.get("lesson") or {}
                body = lesson.get("body") or ""
                questions = topic.get("questions") or []
                rationales = sum(bool(q.get("rationales")) for q in questions)
                if not body.strip():
                    issues.append(f"{file.name}: aula vazia em {label}")
                for q in questions:
                    if not q.get("statement") or not q.get("explanation"):
                        issues.append(f"{file.name}: questão sem enunciado/explicação em {label}")
                    if q.get("kind", "multipla") == "multipla":
                        opts = q.get("options") or []
                        if q.get("answer") not in "ABCDE" or len(opts) < 2:
                            issues.append(f"{file.name}: alternativas/gabarito incorretos em {label}")
                rows.append({
                    "pack": file.stem,
                    "subject": subject["name"],
                    "topic": topic["name"],
                    "words": len(body.split()),
                    "questions": len(questions),
                    "rationales": rationales,
                    "flashcards": len(topic.get("flashcards") or []),
                    "deepened": (subject["name"], topic["name"]) in SUPPLEMENTS,
                })
    unique = set()
    for row in rows:
        key = (row["pack"], row["subject"], row["topic"])
        if key in unique:
            issues.append(f"Tópico duplicado: {key}")
        unique.add(key)
    by_subject = {}
    for subject in sorted({x["subject"] for x in rows}):
        xs = [r for r in rows if r["subject"] == subject]
        by_subject[subject] = {
            "lessons": len(xs),
            "short_under_600_words": sum(r["words"] < 600 for r in xs),
            "few_questions_under_3": sum(r["questions"] < 3 for r in xs),
            "deepened": sum(r["deepened"] for r in xs),
        }
    return {
        "lessons": len(rows),
        "questions": sum(r["questions"] for r in rows),
        "flashcards": sum(r["flashcards"] for r in rows),
        "short_under_600_words": sum(r["words"] < 600 for r in rows),
        "short_under_800_words": sum(r["words"] < 800 for r in rows),
        "few_questions_under_3": sum(r["questions"] < 3 for r in rows),
        "questions_with_rationales": sum(r["rationales"] for r in rows),
        "deepened_with_supplement": sum(r["deepened"] for r in rows),
        "subjects": by_subject,
        "structural_issues": issues,
        "editorial_caveat": (
            "Comprimento e quantidade de itens apenas indicam prioridades. "
            "A precisão factual e a didática exigem revisão humana específica."
        ),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--strict-structure", action="store_true")
    args = ap.parse_args()
    result = audit()
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Aulas: {result['lessons']} | Questões: {result['questions']} | "
              f"Flashcards: {result['flashcards']}")
        print(f"Com aprofundamento 2.2 adicional: {result['deepened_with_supplement']}")
        print(f"Menos de 800 palavras: {result['short_under_800_words']} | "
              f"menos de 3 questões: {result['few_questions_under_3']} | "
              f"questões com justificativas por alternativa: "
              f"{result['questions_with_rationales']}")
        for name, v in result["subjects"].items():
            print(f"  {name}: {v['lessons']} aulas; "
                  f"{v['deepened']} aprofundada(s); "
                  f"{v['short_under_600_words']} abaixo de 600 palavras")
        for issue in result["structural_issues"]:
            print("ERRO DE ESTRUTURA:", issue)
        print("ATENÇÃO:", result["editorial_caveat"])
    return 1 if args.strict_structure and result["structural_issues"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
