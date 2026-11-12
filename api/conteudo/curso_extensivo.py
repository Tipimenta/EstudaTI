"""Currículo autoral extensivo — aulas completas e 4 flashcards diferentes por aula.

Organização por disciplina > módulo > aula, alinhada a assuntos presentes
em editais oficiais de TI e conhecimentos gerais. Não reproduz materiais
proprietários nem inventa vínculo a edital de cargo específico.
"""
from __future__ import annotations

from .matriz_basica import CURRICULUM as BASIC
from .matriz_ti import CURRICULUM as TECH

if set(BASIC) & set(TECH):
    raise ValueError("A mesma disciplina foi definida duas vezes")

CURRICULUM = {**BASIC, **TECH}


def build_pack() -> dict:
    subjects = []
    for subject, units in CURRICULUM.items():
        topics = []
        seen = set()
        for unit in units:
            if len(unit) != 6:
                raise ValueError(f"Estrutura incompleta da aula de {subject}: {unit}")
            module, title, concept, mechanism, example, pitfall = unit
            name = f"{module} · {title}"
            if name.casefold() in seen:
                raise ValueError(f"Tema duplicado: {subject} / {name}")
            seen.add(name.casefold())
            for label, value in (
                ("conceito", concept),
                ("funcionamento", mechanism),
                ("exemplo", example),
                ("armadilha", pitfall),
            ):
                if len(value.strip()) < 75:
                    raise ValueError(f"{subject} / {name}: seção {label} insuficiente")
            body = f"""# {title}

**Disciplina:** {subject} · **Módulo:** {module}

## O que é, para que serve e qual o contexto?

{concept}

## Como funciona — regras, estrutura e mecanismos

{mechanism}

## Exemplo aplicado e explicado

{example}

## Limites, comparações e armadilhas de prova

{pitfall}

## Verificação de aprendizagem

**1. Conceito:** sem consultar, explique o conceito e sua finalidade.

**2. Funcionamento:** reconstrua a sequência ou os critérios de classificação descritos acima.

**3. Aplicação:** refaça o exemplo alterando um parâmetro ou condição. Se for cálculo, confira a unidade; se for norma, verifique o âmbito.

**4. Correção do erro:** descreva por que a afirmação enganosa da seção de armadilhas é inadequada.

Se não conseguir responder a algum desses pontos, releia a seção correspondente e use os flashcards do assunto. Questões de concursos anteriores precisam de origem e gabarito verificados antes de serem rotuladas como oficiais.
"""
            cards = [
                {"front": f"Qual conceito central de {title}?", "back": concept, "origin": "ia"},
                {"front": f"Como funciona {title}?", "back": mechanism, "origin": "ia"},
                {"front": f"Como aplicar {title} a um caso?", "back": example, "origin": "ia"},
                {"front": f"Qual erro evitar ao estudar {title}?", "back": pitfall, "origin": "ia"},
            ]
            topics.append({
                "name": name, "general": True,
                "lesson": {
                    "body": body,
                    "summary": concept[:375],
                    "minutes": 22,
                    "origin": "ia",
                },
                "questions": [],
                "flashcards": cards,
            })
        subjects.append({"name": subject, "topics": topics})
    return {"subjects": subjects, "exams": [], "discursives": []}


def stats() -> dict:
    pack = build_pack()
    return {
        "subjects": len(pack["subjects"]),
        "topics": sum(len(s["topics"]) for s in pack["subjects"]),
        "flashcards": sum(len(t["flashcards"]) for s in pack["subjects"] for t in s["topics"]),
        "questions": 0,
        "origin": "textos autorais preparados com auxílio de IA",
    }
