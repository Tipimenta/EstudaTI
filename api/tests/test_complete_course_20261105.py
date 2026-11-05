"""Controle de cobertura do currículo EstudaTI.

Garante que todas as 169 aulas possuem uma revisão editorial específica,
sem conflitos entre revisões anteriores e novas. Testes de estrutura não
substituem avaliação humana da precisão e clareza.
"""
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
FOLDER=ROOT/"web"/"src"/"academy"
FILES=("fullRED","fullSEG","fullSO","fullPOR","fullGOV","fullBD","fullENG","fullLOG","fullLEG")
PREVIOUS={1,2,3,4,6,8,10,12,14,16,17,21,23,30,33,37,38,44,46,53,55,62,63,71,72,77,80,85,86,24,31,41,49,56,64,68,78,87}

def chapters():
    results=[]
    for name in FILES:
        raw=(FOLDER/(name+".ts")).read_text(encoding="utf-8")
        m=re.search(r"buildChapters\s*\(\s*(\[)",raw)
        assert m, f"Falta chamada buildChapters em {name}"
        end=raw.index(" satisfies EditorialSeed[]",m.end(1))
        data=json.loads(raw[m.start(1):end])
        results.extend(data)
    return results

def test_all_169_have_an_individual_rewrite():
    data=chapters()
    ids=[x["id"] for x in data]
    assert len(ids)==131, f"Esperadas 131 aulas, encontradas {len(ids)}"
    assert len(set(ids))==len(ids), "Aula revisada em dois arquivos novos"
    assert not (set(ids)&PREVIOUS), "Nova revisão sobrepõe capítulo anterior"
    assert set(ids)|PREVIOUS==set(range(1,170)), "Existe aula sem versão pedagógica"

def test_each_chapter_teaches_topic_not_generic_append():
    data=chapters()
    for item in data:
        id=item["id"]
        for field in ("title","goal","context","explanation","connection","exam","caseTitle"):
            assert isinstance(item[field],str) and item[field].strip(), (id,field)
        for field in ("context","explanation","connection","exam"):
            assert len(item[field])>=170, (id,field)
        assert len(item["caseSteps"])==4,id
        assert all(len(s)>=25 for s in item["caseSteps"]),(id,"caseSteps")
        assert len(item["pitfalls"])==4,id
        assert len(item["cards"])==4,id
        assert all(len(q)==2 and len(q[0])>=15 and len(q[1])>=25 for q in item["cards"]),id
        assert "Explicar e aplicar:" not in item["goal"],id

def test_frontend_merges_rewrite_without_generic_boosts():
    source=(FOLDER/"index.ts").read_text(encoding="utf-8")
    for name in FILES:
        assert source.count(f"import {{{name}}} from './{name}'")==1,name
        assert source.count(f"{name}[lesson.id]")==1,name
    assert "pedagogicalBoosts" not in source
    assert "recallSupplement" not in source

def test_editorial_builder_renders_four_connected_sections():
    content=(FOLDER/"editorialBuilder.ts").read_text(encoding="utf-8")
    for label in ("Comece entendendo o problema","Como funciona, passo a passo",
                  "Conecte com o que você já aprendeu","Como a banca explora esse assunto"):
        assert label in content
