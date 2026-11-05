"""Guardrails editoriais das aulas iniciais reescritas de 2026-11-05.

Apenas propriedades verificáveis automaticamente. A avaliação de clareza
pedagógica ainda requer revisão de conteúdo; contagem de caracteres NÃO
equivale a aprendizado.
"""
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
MODULES=[
 ("beginnerNetwork.ts",[1]),
 ("beginnerNetworkNext.ts",[2,3]),
 ("beginnerCrossA.ts",[4,6,8,10]),
 ("beginnerCrossB.ts",[12,14,16,17]),
]
EXPECTED={1,2,3,4,6,8,10,12,14,16,17}

def get_lessons():
    all_lessons={}
    for filename, expected_ids in MODULES:
        path=ROOT/"web"/"src"/"academy"/filename
        raw=path.read_text(encoding="utf-8")
        entries=json.loads(raw.split("=",1)[1].strip().rstrip(";"))
        actual_ids=set(map(int,entries))
        assert actual_ids==set(expected_ids),f"{filename}: esperadas {expected_ids}, encontrado {actual_ids}"
        for key,chapter in entries.items():
            assert int(key) not in all_lessons
            all_lessons[int(key)]=chapter
    return all_lessons

def test_each_subject_has_beginner_friendly_entry():
    data=get_lessons()
    assert set(data)==EXPECTED
    for id,lesson in data.items():
        assert len(lesson["goal"])>85, id
        assert len(lesson["steps"])>=4, id
        assert len(lesson["worked"]["body"])>=500, id
        assert len(lesson["pitfalls"])>=4, id
        assert len(lesson["review"])>=4, id
        assert len({s["title"] for s in lesson["steps"]})==len(lesson["steps"]),id
        assert len({x["ask"] for x in lesson["review"]})==len(lesson["review"]),id
        for step in lesson["steps"]:
            assert len(step["body"])>=650,(id,step["title"])
        assert all(len(q["answer"])>45 for q in lesson["review"]),id

def test_osi_teaches_mac_session_and_context_instead_of_listing_terms():
    item=get_lessons()[1]
    sections="\n".join(s["body"] for s in item["steps"])
    for fragment in ("**Camada 1", "**Camada 2","**camada 3","**camada 4",
                     "**Camada 5","**Camada 6","**camada 7",
                     "**endereço MAC**","**sessão**","**porta","**encapsulamento**"):
        assert fragment.casefold() in sections.casefold(),fragment
    assert "controle de sessões em modelos conceituais" not in sections.casefold()
    assert "sessão de login" in sections.casefold()
    assert "switch" in sections.casefold()
    assert "roteador" in sections.casefold()
    assert "quadro" in sections.casefold()
    assert "pacote" in sections.casefold()
    assert "uma coisa é" in sections.casefold()

def test_questions_are_explanatory_not_answer_letter_only():
    src=ROOT/"api"/"enrichment"/"fundamentos_questoes_20261105.json"
    questions=json.loads(src.read_text(encoding="utf-8"))
    assert len(questions)==15
    assert {q["topic_id"] for q in questions}==EXPECTED
    assert len({q["fingerprint"] for q in questions})==len(questions)
    for q in questions:
        assert len(q["choices"])==4
        assert 0<=q["correct_index"]<4
        assert set(q["choice_rationales"])==set("ABCD")
        assert len(q["explanation"])>=55
        assert all(len(v)>45 for v in q["choice_rationales"].values())
