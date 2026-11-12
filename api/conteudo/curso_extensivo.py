"""Matriz didática extensiva do Estuda. Textos e exemplos editoriais, nunca editais oficiais.

O conjunto é instalado aditivamente. Uma aula-base não deve ser confundida
com material aprofundado e revisado pedagogicamente.
"""
from __future__ import annotations

from .matriz_basica import CURRICULUM as BASIC
from .matriz_ti import CURRICULUM as TECH

CURRICULUM = {**BASIC, **TECH}
if set(BASIC) & set(TECH):
    raise ValueError("Disciplina duplicada na matriz extensiva.")


def build_pack() -> dict:
    """Cada registro tem: módulo, título, conceito, mecanismo, caso, pegadinha.

    Quatro flashcards recuperam conhecimentos DISTINTOS. Não são perguntas
    genéricas geradas de trechos arbitrários.
    """
    subjects = []
    for subject, items in CURRICULUM.items():
        topics, seen = [], set()
        for module, title, concept, mechanism, example, pitfall in items:
            key = title.casefold().strip()
            if key in seen:
                raise ValueError(f"Aula repetida em {subject}: {title}")
            seen.add(key)
            for field in (concept, mechanism, example, pitfall):
                if len(field) < 78:
                    raise ValueError(f"Aula com fundamentação insuficiente: {subject}: {title}")
            prefix = f"{module} · {title}"
            lesson = f"""# {title}

> **Percurso:** {subject} → {module} → {title}. Esta é uma aula-base para iniciar o estudo do tema. Aprofundamentos, legislação vigente e cobrança de banca devem ser conferidos no edital.

## 1. O conceito e a necessidade

{concept}

A primeira pergunta de prova é identificar qual problema ou obrigação está sendo tratado. Antes de memorizar nomes, separe **definição**, **finalidade** e **limites**. O mesmo termo pode ser empregado em contextos diferentes; só utilize uma regra quando o enunciado oferecer as condições que a sustentam.

## 2. Estrutura e funcionamento

{mechanism}

Ao interpretar uma situação, identifique a entrada, as condições aplicáveis, as etapas, a saída esperada e a evidência necessária para confirmar o resultado. Não trate uma ferramenta, um requisito e um efeito como se fossem sinônimos.

## 3. Exemplo contextualizado e raciocínio

{example}

Confira se o exemplo é compatível com as hipóteses do enunciado. Um caso ilustra o conceito, mas não significa que toda situação real obedeça às mesmas condições. Em cálculos, valide unidades e operações; em leis, consulte artigo, âmbito e redação aplicável.

## 4. Comparações, limitações e armadilhas

{pitfall}

**Como a banca pode confundir:** uma alternativa frequentemente troca uma condição necessária por suficiente, confunde autorização com obrigação, transforma hipótese em fato ou trata situação particular como regra universal. Para evitar esse erro, justifique por que a afirmação é correta **e por que a inversão seria incorreta**.

## 5. Recuperação ativa

Sem consultar os parágrafos anteriores, faça quatro exercícios: (a) defina o conceito; (b) explique o mecanismo ou sequência causal; (c) reconstrua o exemplo com seus próprios termos; (d) descreva a limitação indicada. Depois use os flashcards deste tópico e registre as dúvidas. Revise após intervalo, não apenas imediatamente após a leitura.

**Situação editorial:** aula-base em expansão, sem homologação como curso completo. Questões oficiais devem ser vinculadas apenas após conferência de fonte e gabarito.
"""
            cards = [
                {"front": f"Em {title}, qual é o conceito e a finalidade?", "back": concept},
                {"front": f"Em {title}, qual é o mecanismo ou a sequência?", "back": mechanism},
                {"front": f"Qual exemplo concreto demonstra {title}?", "back": example},
                {"front": f"Qual distinção ou pegadinha evitar em {title}?", "back": pitfall},
            ]
            topics.append({
                "name": prefix, "general": True,
                "lesson": {"body": lesson, "summary": concept[:380],
                           "minutes": 18, "origin": "ia"},
                "flashcards": [{**card, "origin": "ia"} for card in cards],
                "questions": [],
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
        "editorial": "aulas-base sem revisão humana independente",
    }
