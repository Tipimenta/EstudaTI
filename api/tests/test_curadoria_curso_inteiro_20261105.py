"""Validação de integridade e conteúdo do curso inteiro.

O curso é constituído por 169 IDs já existentes no banco.
Este teste verifica que todos recebem um capítulo editorial individual,
com caso resolvido e cartões de revisão. A qualidade semântica, como
qualquer material didático, exige também revisão humana e atualização.
"""
import json
import re
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
"beginnerNetwork","beginnerNetworkNext","beginnerCrossA","beginnerCrossB",
"middleExplainedA","middleExplainedB","middleExplainedC"
]
FULL=["fullRED","fullSEG","fullSO","fullPOR","fullGOV","fullBD","fullENG","fullLOG","fullLEG"]
SUBJECTS={
"RED":{1,2,3,24},"SEG":{4,31},"SO":{6,41},"POR":{8,49},
"GOV":{10,56},"BD":{12,64},"ENG":{14,68},"LOG":{16,78},
"LEG":{17,87}
}

def read_module(name):
    source=(ACADEMY/(name+".ts")).read_text(encoding="utf-8")
    if name in FULL:
        marker="export const "+name+"=buildChapters("
        assert marker in source, name
        start=source.index(marker)+len(marker)
        end=source.index(" satisfies EditorialSeed[]",start)
        data=json.loads(source[start:end].strip())
        return data
    m=re.search(r"export const\s+"+re.escape(name)+r"\s*:[^\n]*=\s*([\[{])",source)
    assert m, "Declaração de lições não encontrada: "+name
    data=json.loads(source[m.start(1):].strip().rstrip(";"))
    return data if isinstance(data,list) else list(data.values())

def audit_course():
    base={}
    for filename in BASE:
        for lesson in read_module(filename):
            topic_id=lesson["id"]
            assert topic_id not in base, f"ID de base duplicado: {topic_id}"
            base[topic_id]=lesson
    reviewed={}
    for filename in EARLIER_REWRITES+FULL:
        for patch in read_module(filename):
            topic_id=patch["id"]
            assert topic_id in base, f"Capítulo sem aula existente: {topic_id}"
            assert topic_id not in reviewed, f"Revisões concorrentes para {topic_id}: {reviewed.get(topic_id)}, {filename}"
            reviewed[topic_id]=filename
    return base,reviewed

def test_complete_scope_all_169_topics_reviewed():
    base,reviewed=audit_course()
    assert len(base)==169, f"Base possui {len(base)}"
    assert len(reviewed)==169, f"Revisadas {len(reviewed)} de 169"
    assert set(base)==set(reviewed),f"IDs pendentes: {set(base)-set(reviewed)}"
    assert len([x for x in reviewed.values() if x in FULL])==131
    assert len([x for x in reviewed.values() if x in EARLIER_REWRITES])==38
    for subject,ids in SUBJECTS.items():
        assert ids.issubset(reviewed), f"Faltam fundamentos em {subject}"

def test_new_chapters_have_unique_teaching_and_practice():
    for module in FULL:
        chapters=read_module(module)
        assert len(chapters)>=14
        for unit in chapters:
            assert len(unit["goal"])>=60,(module,unit["id"])
            assert len(unit["context"])>=170,(module,unit["id"],"context")
            assert len(unit["explanation"])>=190,(module,unit["id"],"explanation")
            assert len(unit["connection"])>=150,(module,unit["id"],"connection")
            assert len(unit["exam"])>=150,(module,unit["id"],"exam")
            assert len(unit["caseSteps"])==4,(module,unit["id"])
            assert len(" ".join(unit["caseSteps"]))>=160,(module,unit["id"])
            assert len(unit["pitfalls"])==4,(module,unit["id"])
            assert len(unit["cards"])==4,(module,unit["id"])
            assert len({q for q,a in unit["cards"]})==4,(module,unit["id"])
            assert all(len(a)>=35 for q,a in unit["cards"]),(module,unit["id"])

def test_app_loads_all_revisions():
    text=(ACADEMY/"index.ts").read_text(encoding="utf-8")
    for name in FULL:
        assert ("import {"+name+"} from './"+name+"'") in text
        assert name+"[lesson.id]" in text
    assert "pedagogicalBoosts[lesson.id]" in text
    assert "const more=patch?undefined:" in text

def test_middle_lessons_remain_intact():
    ids={24,31,41,49,56,64,68,78,87}
    values={item["id"]:item for name in ["middleExplainedA","middleExplainedB","middleExplainedC"] for item in read_module(name)}
    for topic_id in ids:
        chapter=values[topic_id]
        assert len(chapter["steps"])>=4
        assert len(chapter["worked"]["body"])>600
        assert len(chapter["review"])>=4

def test_middle_questions_are_grounded():
    questions=json.loads((ROOT/"api"/"enrichment"/"intermediarias_questoes_20261105.json").read_text(encoding="utf-8"))
    assert len(questions)==9
    assert {x["topic_id"] for x in questions}=={24,31,41,49,56,64,68,78,87}
    assert len({x["fingerprint"] for x in questions})==9
    for question in questions:
        assert len(question["choices"])==4
        assert set(question["choice_rationales"])==set("ABCD")
        assert all(len(value)>35 for value in question["choice_rationales"].values())

if __name__=="__main__":
    old,new=audit_course()
    print(f"Aulas no banco: {len(old)} | revisão editorial: {len(new)} | pendentes: {len(old)-len(new)}")
