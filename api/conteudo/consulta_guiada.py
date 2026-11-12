"""Consulta de estudo sem IA: recupera exclusivamente material já cadastrado.

Não gera explicações novas e não acessa serviços externos. É deliberadamente
limitada para evitar confundir busca textual com um professor generativo.
"""
from __future__ import annotations

import re
import unicodedata

STOPWORDS = {
    "para", "como", "quero", "sobre", "qual", "quais", "porque", "dessa", "dessas",
    "dele", "dela", "deles", "isso", "aqui", "mais", "menos", "muito", "tenho",
    "entender", "explique", "explica", "funciona", "assunto", "conceito",
    "exemplo", "passo", "aula", "aulas", "fazer", "quando", "onde", "tambem",
    "saber", "posso", "falar", "preciso", "parte", "todos", "todas",
}


def _normal(s: str) -> str:
    s = unicodedata.normalize("NFKD", s.lower())
    return "".join(c for c in s if not unicodedata.combining(c))


def _terms(s: str) -> set[str]:
    return {t for t in re.findall(r"[a-z0-9]{3,}", _normal(s))
            if t not in STOPWORDS}


def _paragraphs(markdown: str) -> list[str]:
    result = []
    for part in re.split(r"\n\s*\n+", markdown or ""):
        p = part.strip()
        if len(p) >= 45 and not p.startswith("|---"):
            result.append(p[:2500])
    return result


def answer_from_material(
    topic: str, lesson: str, question: str, mode: str = "passo_a_passo",
    flashcards: list[dict] | None = None,
) -> str:
    """Seleção textual de blocos relevantes, sem alegar compreensão generativa."""
    paras = _paragraphs(lesson)
    if not paras:
        return "Não encontrei uma aula cadastrada para consultar neste tópico."
    terms = _terms(question)
    cues = {
        "do_zero": {"conceito", "definicao", "primeiro", "comeco", "fundamentos"},
        "passo_a_passo": {"etapa", "passo", "processo", "funciona", "operacao"},
        "exemplo": {"exemplo", "imagine", "caso", "resolva", "conta"},
        "comparar": {"diferenca", "compare", "versus", "enquanto", "nao confunda"},
        "exercicio": {"exercicio", "teste", "questao", "pratique"},
    }.get(mode, set())

    ranked = []
    for i, para in enumerate(paras):
        norm = _normal(para)
        score = sum(3 if term in norm else 0 for term in terms)
        score += sum(1 for cue in cues if cue in norm)
        score += 0.15 if i < 3 else 0
        ranked.append((score, -i, para))
    ranked.sort(reverse=True)
    selected = [item[2] for item in ranked[:3] if item[0] > 0]
    if not selected:
        selected = paras[:2]

    header = (
        f"### Consulta ao conteúdo de {topic}\n\n"
        "**Modo gratuito, sem IA.** Os trechos abaixo foram selecionados do "
        "material cadastrado na aula. Esta busca não produz interpretação nova "
        "e pode não esclarecer perguntas complexas.\n\n"
    )
    if mode == "exercicio":
        cards = flashcards or []
        if cards:
            cards = sorted(cards, key=lambda c: -len(_terms(question) & _terms(c.get("front") or "")))
            return (
                header + "**Pergunta de recuperação ativa:**\n\n"
                + str(cards[0].get("front") or "")
                + "\n\nTente responder com suas palavras antes de abrir a aba "
                  "**Flashcards** para conferir e registrar sua revisão."
            )
    material = "\n\n---\n\n".join(selected)
    footer = (
        "\n\n**Para verificar se aprendeu:** explique, sem consultar o texto, "
        "o que o mecanismo faz, por que existe e uma exceção importante. "
        "Você também pode usar as questões e os flashcards do tópico."
    )
    return header + material + footer
