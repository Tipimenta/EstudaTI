"""Leitura de arquivos enviados: PDF (texto), CSV e JSON de questões, e extração local de provas sem IA."""
from __future__ import annotations

import csv
import io
import json
import re

from auth import ApiError


def pdf_text(data: bytes, max_pages: int = 200) -> str:
    if not data.startswith(b"%PDF"):
        raise ApiError(400, "O arquivo não é um PDF.")
    from pypdf import PdfReader

    reader = PdfReader(io.BytesIO(data), strict=False)
    if reader.is_encrypted:
        try:
            reader.decrypt("")
        except Exception:
            raise ApiError(400, "Esse PDF tem senha. Envie uma versão sem senha.")
    if len(reader.pages) > max_pages:
        raise ApiError(400, f"PDF com mais de {max_pages} páginas. Envie só a parte necessária.")
    parts = []
    for page in reader.pages:
        try:
            parts.append(page.extract_text() or "")
        except Exception:
            parts.append("")
    text = "\n".join(parts)
    text = re.sub(r"(\w)-\n(\w)", r"\1\2", text)  # junta palavras hifenizadas na quebra de linha
    if len(text.strip()) < 50:
        raise ApiError(400, "Não há texto selecionável nesse PDF (provavelmente é escaneado). "
                            "Passe um OCR antes ou cole o texto.")
    return text


def read_upload_text(file_storage) -> str:
    data = file_storage.read()
    name = (file_storage.filename or "").lower()
    if name.endswith(".pdf") or data.startswith(b"%PDF"):
        return pdf_text(data)
    for enc in ("utf-8-sig", "latin-1"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    raise ApiError(400, "Não consegui ler o arquivo. Use PDF, TXT, CSV ou JSON.")


LETTERS = "ABCDE"


def _q_from_row(r: dict) -> dict | None:
    """Aceita o formato novo e os formatos antigos do EstudaTI."""
    g = lambda *ks: next((str(r[k]).strip() for k in ks if k in r and r[k] not in (None, "")), "")
    st = g("statement", "enunciado", "question", "stem")
    if not st:
        return None
    opts = r.get("options") or r.get("choices") or r.get("alternativas")
    if isinstance(opts, str):
        opts = [o for o in opts.split("|")]
    if not opts:
        opts = [g(k, k.upper(), f"option_{k}", f"alternativa_{k}") for k in "abcde"]
    opts = [str(o).strip() for o in opts if str(o).strip()]
    ans = g("answer", "gabarito", "correct", "resposta").upper()
    if "correct_index" in r and r["correct_index"] not in (None, ""):
        ans = LETTERS[int(r["correct_index"])]
    elif ans.isdigit():
        ans = LETTERS[int(ans)]
    kind = g("kind", "tipo").lower() or ("certo_errado" if not opts and ans in ("C", "E") else "multipla")
    if kind in ("ce", "certo/errado", "certo_errado"):
        kind, opts = "certo_errado", []
    if kind == "multipla" and (len(opts) < 2 or not ans or ans not in LETTERS[:len(opts)]):
        return None
    if kind == "certo_errado" and ans not in ("C", "E"):
        return None
    year = g("year", "ano")
    return {
        "kind": kind, "statement": st, "options": opts, "answer": ans[:1],
        "explanation": g("explanation", "comentario", "explicacao"),
        "subject": g("subject", "materia", "disciplina", "subject_name"),
        "topic": g("topic", "assunto", "topico"),
        "banca": g("banca", "board"), "year": int(year) if year.isdigit() else None,
        "source": g("source", "fonte", "exam", "source_url"),
        "origin": g("origin", "origem") or "autoral",
    }


def parse_questions_file(text: str, filename: str = "") -> list[dict]:
    text = text.strip()
    rows: list[dict] = []
    if filename.lower().endswith(".json") or text[:1] in "[{":
        try:
            data = json.loads(text)
        except ValueError:
            raise ApiError(400, "JSON inválido. Confira vírgulas e aspas.")
        rows = data.get("questions", []) if isinstance(data, dict) else data
    else:
        sample = text[:2000]
        delim = ";" if sample.count(";") > sample.count(",") else ","
        rows = list(csv.DictReader(io.StringIO(text), delimiter=delim))
        rows = [{(k or "").strip().lower(): v for k, v in r.items()} for r in rows]
    if len(rows) > 2000:
        raise ApiError(400, "Envie no máximo 2.000 questões por arquivo.")
    return [q for q in (_q_from_row(r) for r in rows if isinstance(r, dict)) if q]


# Extração local (sem IA) — funciona em cadernos com numeração e alternativas bem marcadas.
Q_START = re.compile(r"(?m)^\s*(?:QUEST[ÃA]O\s*)?(\d{1,3})\s*[\.\)\-–]?\s+(?=\S)")
ALT = re.compile(r"(?m)^\s*\(?([A-Ea-e])\)\s*|^\s*([A-E])[\.\-–]\s+")


def extract_exam_local(text: str, style: str = "multipla") -> list[dict]:
    starts = list(Q_START.finditer(text))
    out, expected = [], 1
    for i, m in enumerate(starts):
        n = int(m.group(1))
        if n != expected:  # evita confundir números soltos (anos, artigos) com início de questão
            continue
        end = starts[i + 1].start() if i + 1 < len(starts) else len(text)
        for j in range(i + 1, len(starts)):
            if int(starts[j].group(1)) == n + 1:
                end = starts[j].start()
                break
        block = text[m.end():end].strip()
        if style == "certo_errado":
            st = " ".join(block.split())
            if st:
                out.append({"number": n, "kind": "certo_errado", "statement": st, "options": [], "answer": "", "subject": ""})
                expected += 1
            continue
        alts = list(ALT.finditer(block))
        if len(alts) < 4:
            continue
        stmt = " ".join(block[:alts[0].start()].split())
        opts = []
        for k, a in enumerate(alts[:5]):
            e = alts[k + 1].start() if k + 1 < min(len(alts), 5) else len(block)
            opts.append(" ".join(block[a.end():e].split()))
        if stmt:
            out.append({"number": n, "kind": "multipla", "statement": stmt, "options": opts, "answer": "", "subject": ""})
            expected += 1
    return out
