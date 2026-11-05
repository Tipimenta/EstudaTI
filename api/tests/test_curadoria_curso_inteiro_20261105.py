"""Auditoria editorial que percorre o curso todo, não apenas a aula 1.

A contagem de textos NÃO garante qualidade. Revisão individual (se existe patch
pedagógico original) é distinta de verificação mecânica (tamanho e estrutura).
"""
import json
import re
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
ACADEMY=ROOT/"web"/"src"/"academy"
BASE=[
"intro1","intro2","intro3","core1a","core1b","advancedNetworks",
"nineCore","coreExpansion1","coreExpansion2","coreExpansion3",
"completedRED","completedSEG","completedSO","completedPOR",
"completedGOV","completedBD","completedENG","completedLOG","completedLEG"
]
EARLIER_REWRITES=[
"rewrittenInfrastructure","rewrittenFoundations","rewrittenPractice",
"rewrittenOps","rewrittenPlanning","rewrittenIntegration",
"beginnerNetwork","beginnerNetworkNext","beginnerCrossA","beginnerCrossB"
]
MIDDLE=["middleExplainedA","middleExplainedB","middleExplainedC"]
SUBJECTS={
"RED":{1,2,3,24},"SEG":{4,31},"SO":{6,41},"POR":{8,49},
"GOV":{10,56},"BD":{12,64},"ENG":{14,68},"LOG":{16,78},
"LEG":{17,87}
}

def read_module(name):
    text=(ACADEMY/(name+".ts")).read_text(encoding="utf-8")
    m=re.search(r"\s*=\s*([\[{])",text)
    assert m, f"Não encontrado array ou objeto JSON em {name}"
    payload=json.loads(text[m.start(1):].strip().rstrip(";"))
    return payload if isinstance(payload,list) else list(payload.values())

def audit_course():
    base={}
    for filename in BASE:
        for lesson in read_module(filename):
            id=lesson["id"]
            assert id not in base, f"ID de aula duplicado no curso base: {id}"
            base[id]=lesson
    patch_by_id={}
    for filename in EARLIER_REWRITES+MIDDLE:
        for patch in read_module(filename):
            id=patch["id"]
            assert id in base, f"Patch sem aula correspondente: {id}"
            assert id not in patch_by_id, f"Duas reescritas concorrentes para aula {id}"
            patch_by_id[id]=patch
    return base,patch_by_id

def test_scope_is_all_169_lessons_not_just_intro():
    base,patches=audit_course()
    assert len(base)==169, f"Total inesperado: {len(base)}"
    assert len(patches)==38, f"Revisões individuais esperadas: 38, obtidas {len(patches)}"
    assert len(base)-len(patches)==131
    for subject,ids in SUBJECTS.items():
        assert ids.issubset(patches),f"Falta revisão introdutória ou intermediária de {subject}: {ids-set(patches)}"

def test_middle_lessons_are_progressive_and_explain_terms():
    _,patches=audit_course()
    ids={24,31,41,49,56,64,68,78,87}
    for id in ids:
        unit=patches[id]
        assert len(unit["steps"])>=4,id
        assert len(unit["worked"]["body"])>600,id
        assert len(unit["pitfalls"])>=4,id
        assert len(unit["review"])>=4,id
        assert sum(len(s["body"]) for s in unit["steps"])>2600,id
        assert len({s["title"] for s in unit["steps"]})==len(unit["steps"]),id

def test_middle_questions_are_unique_and_explain_distractors():
    q=json.loads((ROOT/"api"/"enrichment"/"intermediarias_questoes_20261105.json").read_text(encoding="utf-8"))
    assert len(q)==9
    assert {x["topic_id"] for x in q}=={24,31,41,49,56,64,68,78,87}
    assert len({x["fingerprint"] for x in q})==9
    for x in q:
        assert len(x["choices"])==4
        assert 0<=x["correct_index"]<4
        assert set(x["choice_rationales"])==set("ABCD")
        assert all(len(v)>35 for v in x["choice_rationales"].values())

if __name__=="__main__":
    base,patches=audit_course()
    print(f"Curso: {len(base)} aulas; {len(patches)} com revisão editorial individual; {len(base)-len(patches)} aguardando revisão.")
