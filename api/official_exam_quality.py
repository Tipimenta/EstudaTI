"""Auditoria conservadora de cadernos oficiais extraídos de PDF.

O gabarito confiável não valida a fidelidade do texto. Identificamos trechos
cortados, dependência de contexto visual e rodapés/seções grudados na letra E.
Nunca completamos enunciados por inferência.
"""
from __future__ import annotations

import json
import re

from official_exam_parser import fingerprint

# Cabeçalhos/rodapés e textos introdutórios da PRÓXIMA questão que podem ser
# anexados à última alternativa por ordenação das colunas no PDF FGV.
_FOOTER = re.compile(
    r"(?i)(?:"
    r"\bATI\s*[-–]\s*(?:Arquitetura|Gest[aã]o|Seguran[cç]a|Desenvolvimento)[^\n]{0,130}?\s*[-–]\s*TARDE\b"
    r"|\bS\s+C\s+O\s+OG\s+O\s+Ç[ÕO]\s+S\s+C\b"
    r"|\bUse\s+the\s+following\s+TEXT\s+to\s+answer\b"
    r"|\bLegisla[cç][aã]o\s+Acerca\s+de\s+Seguran[cç]a\b"
    r"|\bRacioc[ií]nio\s+L[oó]gico\s+Matem[aá]tico\b"
    r"|\bAtualidades\s*$"
    r"|\bRea\s+[cç][aã]o\s*$"
    r"|\bCONHECIMENTOS\s+(?:ESPEC[IÍ]FICOS|GERAIS)\b"
    r")"
)
# Questões que NÃO são autocontidas sem a página/estilo original.
_UNSAFE_STEM = re.compile(
    r"(?i)(?:"
    r"\bTEXT\b|\baccording\s+to\s+the\s+text\b"
    r"|\btexto\s+(?:acima|a\s+seguir|a\s+seguir\s+apresentado)\b"
    r"|\bfigura\b|\bimagem\b|\bgr[aá]fico\b|\bdiagrama\b"
    r"|\b(?:elemento|termo|palavra|express[aã]o|frase|verbos?|adjetivo)\s+destacad[ao]s?\b"
    r"|\bsublinhad[ao]s?\b|\bgrifad[ao]s?\b"
    r"|\btrecho\s+de\s+c[oó]digo\b|\bcomandos\s+SQL\s+a\s+seguir\b"
    r"|\btabela\s+a\s+seguir\b|\bna\s+tabela\s+(?:abaixo|acima)\b"
    r"|\bno\s+quadro\s+(?:a\s+seguir|abaixo)\b"
    r"|\bna\s+ilustra[cç][aã]o\b|\bnessa\s+figura\b"
    r")"
)
# Figuras/diagramas externos e recortes que parecem somente continuação.
_INCOMPLETE = re.compile(
    r"(?i)^\s*(?:nesse\s+contexto|no\s+contexto\s+acima|a\s+execu[cç][aã]o\s+da\s+consulta)\b"
)


def check_question(stem: str, choices: list[str]) -> tuple[list[str], str]:
    """Retorna cópia das alternativas, removendo SOMENTE rodapés detectados.

    reason != '' significa bloqueio (sem correção por IA ou resposta presumida).
    Não valida a exatidão jurídica/técnica de uma alternativa.
    """
    if not isinstance(choices, list) or len(choices) != 5 or not isinstance(stem, str):
        return choices, "Cinco alternativas íntegras não foram identificadas."
    cleaned = []
    for choice in choices:
        if not isinstance(choice, str):
            return choices, "Alternativa não textual."
        m = _FOOTER.search(choice)
        cleaned.append(choice[:m.start()].strip() if m else choice.strip())
    if len(stem.strip()) < 42 or _INCOMPLETE.search(stem) and len(stem) < 150:
        return cleaned, "Enunciado parece fragmento isolado ou insuficiente."
    if _UNSAFE_STEM.search(stem):
        return cleaned, "A questão depende de texto, imagem, destaque ou tabela ausente na extração."
    if len(stem) > 6000 or any(not (3 <= len(ch) <= 1800) for ch in cleaned):
        return cleaned, "Enunciado ou alternativa ausente/truncado."
    if any(_FOOTER.search(ch) for ch in cleaned):
        return cleaned, "Cabeçalho de outra seção misturado às alternativas."
    if len(set(x.casefold() for x in cleaned)) != len(cleaned):
        return cleaned, "Alternativas repetidas após extração."
    return cleaned, ""


def quarantine_existing(db, nowstr):
    """Migração reversível do acervo já importado, sem excluir respostas/dados.

    Só confere integridade sintática; não consulta a rede nem baixa PDFs.
    Uma futura atualização por botão poderá substituir versões problemáticas.
    """
    db.executescript("""
      CREATE TABLE IF NOT EXISTS official_exam_repairs (
          exam_code TEXT NOT NULL,
          number INTEGER NOT NULL,
          before_choices_json TEXT NOT NULL,
          before_status TEXT NOT NULL,
          after_status TEXT NOT NULL,
          reason TEXT NOT NULL,
          at TEXT NOT NULL,
          PRIMARY KEY(exam_code,number)
      );
    """)
    rows=db.execute("""SELECT exam_code,number,question,choices_json,status,fingerprint
        FROM official_exam_items WHERE status='verificada'""").fetchall()
    for row in rows:
        raw=row["choices_json"]
        try:
            choices=json.loads(raw)
        except (TypeError,ValueError):
            choices=[]
        cleaned,reason=check_question(row["question"],choices)
        if not reason and cleaned==choices:
            continue
        before=row["status"]
        after="bloqueada" if reason else "verificada"
        db.execute("""INSERT INTO official_exam_repairs
            (exam_code,number,before_choices_json,before_status,after_status,reason,at)
            VALUES(?,?,?,?,?,?,?) ON CONFLICT(exam_code,number) DO NOTHING""",
            (row["exam_code"],row["number"],raw,before,after,
             reason or "Rodapé destacado de alternativa contaminada",nowstr))
        if reason:
            db.execute("""UPDATE official_exam_items SET status='bloqueada',reason=?
                WHERE exam_code=? AND number=?""",
                (reason,row["exam_code"],row["number"]))
        else:
            db.execute("""UPDATE official_exam_items
                SET choices_json=?, fingerprint=?, reason=?
                WHERE exam_code=? AND number=?""",
                (json.dumps(cleaned,ensure_ascii=False),
                 fingerprint(row["question"],cleaned),
                 "Alternativa corrigida: rodapé de página excluído",
                 row["exam_code"],row["number"]))
    for source in db.execute("SELECT code FROM official_exam_sources").fetchall():
        code=source["code"]
        row=db.execute("""SELECT COUNT(*) total FROM official_exam_items
                        WHERE exam_code=? AND status='verificada'""",(code,)).fetchone()
        db.execute("UPDATE official_exam_sources SET ready_count=? WHERE code=?",
                   (row["total"],code))
