"""Extração orientativa sem IA para PDFs públicos quando AI_PROVIDER não existe.

Somente segmenta títulos e tópicos LITERALMENTE presentes no texto. Não inventa
banca, vagas, data, órgão ou disciplinas e não cadastra nada automaticamente.
"""
from __future__ import annotations

import re
import unicodedata

from auth import ApiError

HEADINGS = {
    "LINGUA PORTUGUESA": "Língua Portuguesa",
    "PORTUGUES": "Língua Portuguesa",
    "REDACAO OFICIAL": "Redação Oficial",
    "RACIOCINIO LOGICO": "Raciocínio Lógico",
    "RACIOCINIO LOGICO MATEMATICO": "Raciocínio Lógico",
    "MATEMATICA": "Matemática",
    "MATEMATICA FINANCEIRA": "Matemática Financeira",
    "ESTATISTICA": "Estatística e Análise de Dados",
    "DIREITO CONSTITUCIONAL": "Direito Constitucional",
    "NOCOES DE DIREITO CONSTITUCIONAL": "Direito Constitucional",
    "DIREITO ADMINISTRATIVO": "Direito Administrativo",
    "NOCOES DE DIREITO ADMINISTRATIVO": "Direito Administrativo",
    "LEGISLACAO": "Legislação e Governo Digital",
    "LEGISLACAO ESPECIFICA": "Legislação Específica",
    "NOCOES DE INFORMATICA": "Informática",
    "INFORMATICA": "Informática",
    "TECNOLOGIA DA INFORMACAO": "Tecnologia da Informação",
    "SEGURANCA DA INFORMACAO": "Segurança da Informação",
    "SEGURANCA CIBERNETICA": "Segurança da Informação",
    "REDES DE COMPUTADORES": "Redes de Computadores",
    "SISTEMAS OPERACIONAIS": "Sistemas Operacionais e Virtualização",
    "BANCO DE DADOS": "Banco de Dados e SQL",
    "BANCO DE DADOS E SQL": "Banco de Dados e SQL",
    "ENGENHARIA DE SOFTWARE": "Engenharia de Software",
    "PROGRAMACAO": "Programação e Algoritmos",
    "ALGORITMOS": "Programação e Algoritmos",
    "GOVERNANCA DE TI": "Governança e Gestão de TI",
    "GESTAO DE TI": "Governança e Gestão de TI",
    "ADMINISTRACAO PUBLICA": "Administração Pública e Gestão",
    "ARQUIVOLOGIA": "Arquivologia e Gestão Documental",
    "LINGUA INGLESA": "Inglês Instrumental para TI",
    "INGLES": "Inglês Instrumental para TI",
    "ATUALIDADES": "Atualidades",
}


def normalize(value: str) -> str:
    value = unicodedata.normalize("NFKD", value or "")
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    return re.sub(r"\s+", " ", value.strip().upper())


def _heading(line: str) -> tuple[str, str] | None:
    clean = re.sub(r"^\s*(?:\d{1,2}[\.\-\)]\s*)", "", line).strip()
    clean = re.sub(r"^[\-• ]+", "", clean)
    pieces = re.split(r"\s*:\s*", clean, maxsplit=1)
    key = normalize(pieces[0]).strip(" :-")
    if key not in HEADINGS:
        return None
    # Evita tratar frases corridas como cabeçalho.
    return HEADINGS[key], pieces[1].strip() if len(pieces) > 1 else ""


def _split_topics(block: str) -> list[str]:
    block = re.sub(r"\s+", " ", block).strip()
    if not block:
        return []
    # Separa itens enumerados e lista por ponto e vírgula; não quebra
    # arbitrariamente frases e artigos de lei.
    blocks = re.split(r"\s*;\s*|\s+(?=\d{1,2}[\.\)]\s+[A-ZÀ-Ú])", block)
    result = []
    for part in blocks:
        part = re.sub(r"^\d{1,2}[\.\)]\s*", "", part).strip(" .;:,-")
        if len(part) >= 6 and part not in result:
            result.append(part[:300])
        if len(result) >= 80:
            break
    return result


def parse_edital_local(text: str, role_hint: str = "") -> dict:
    subjects: list[dict] = []
    current: dict | None = None
    fragments: list[str] = []

    def finish():
        if current is None:
            return
        topics = _split_topics(" ".join(fragments))
        if topics:
            current["topics"] = topics
            subjects.append(current)

    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        candidate = _heading(line)
        if candidate:
            finish()
            name, same_line = candidate
            current = {"name": name, "weight": 1, "questions": 0, "topics": []}
            fragments = [same_line] if same_line else []
        elif current is not None:
            # Não inclua o resto do edital inteiro se uma seção termina.
            if normalize(line).startswith(("ANEXO ", "CRONOGRAMA ", "FORMULARIO ")):
                break
            fragments.append(line)
    finish()
    if not subjects:
        raise ApiError(
            422,
            "Não identifiquei matérias com segurança pelo modo local. "
            "Use as páginas do conteúdo programático ou configure a IA."
        )
    # Junta seções repetidas sem fabricar informações e preserva ordem.
    merged: dict[str, dict] = {}
    for item in subjects:
        if item["name"] not in merged:
            merged[item["name"]] = item
        else:
            seen = set(merged[item["name"]]["topics"])
            merged[item["name"]]["topics"].extend(t for t in item["topics"] if t not in seen)
    return {
        "org": "", "banca": "", "role": role_hint.strip()[:140],
        "exam_date": "", "style": "multipla", "subjects": list(merged.values()),
        "analysis_method": "local_sem_ia",
        "warning": "Leitura local sem IA: não valida o edital nem garante cobertura de todos os tópicos. "
                   "Revise cada assunto e o órgão antes de cadastrar.",
    }
