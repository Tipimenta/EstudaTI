"""Leitura conservadora de cadernos de prova FGV em duas colunas e gabarito em grades.

Nunca gera respostas por conhecimento do modelo. A letra vem exclusivamente do
gabarito definitivo, cargo e tipo correspondentes. Questões dependentes de
imagens, tabelas externas ou texto compartilhado ficam bloqueadas.
"""
from __future__ import annotations

import hashlib
import re
import unicodedata
from collections import defaultdict

import fitz  # PyMuPDF


def norm(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "")
    return re.sub(r"\s+", " ", "".join(ch for ch in text if not unicodedata.combining(ch))).upper().strip()


def pdf_open(raw: bytes, max_pages: int = 60):
    if not raw.startswith(b"%PDF-") or len(raw) > 12 * 1024 * 1024:
        raise ValueError("O arquivo não é PDF válido ou supera 12 MB.")
    doc = fitz.open(stream=raw, filetype="pdf")
    if doc.needs_pass or doc.page_count > max_pages or doc.page_count < 1:
        doc.close()
        raise ValueError("PDF protegido ou com quantidade de páginas não suportada.")
    return doc


_NUM = re.compile(r"^\s*(?:QUEST[ÃA]O\s+)?(\d{1,2})\s*$", re.I)
_ALT = re.compile(r"^\s*\(([A-E])\)\s*(.*)$")
_SUSPICIOUS = re.compile(
    r"(?:figura|imagem|gr[aá]fico|diagrama|fluxograma|c[oó]digo\s+a\s+seguir|"
    r"comandos\s+SQL\s+a\s+seguir|tabela\s+a\s+seguir|esquema\s+a\s+seguir|"
    r"texto\s+a\s+seguir\s+deve|use\s+o\s+texto\s+a\s+seguir|"
    r"na\s+ilustra[cç][aã]o)",
    re.I,
)


def _question_parts(doc):
    for page_no in range(2, doc.page_count):
        pg = doc[page_no]
        mid = pg.rect.width / 2
        # A diagramação FGV alterna coluna esquerda e direita, nessa ordem.
        for left, right in ((25, mid - 7), (mid + 7, pg.rect.width - 25)):
            area = fitz.Rect(left, 42, right, pg.rect.height - 34)
            text = pg.get_text("text", clip=area, sort=True)
            for line in text.splitlines():
                line = line.strip()
                if not line or "FGV CONHECIMENTO" in norm(line) or "PAGINA" in norm(line) and "TIPO" in norm(line):
                    continue
                yield page_no + 1, line


def extract_exam(raw: bytes):
    doc = pdf_open(raw)
    try:
        lines = list(_question_parts(doc))
        candidates = []
        current = None
        for page, line in lines:
            match = _NUM.match(line)
            if match and 1 <= int(match.group(1)) <= 70:
                num = int(match.group(1))
                # Só aceitar números crescentes; não confundir lista ou código com questão.
                if current is None and num != 1:
                    continue
                if current is not None and num <= current["number"]:
                    current["lines"].append(line)
                    continue
                if current is not None:
                    candidates.append(current)
                current = {"number": num, "page": page, "lines": []}
            elif current:
                current["lines"].append(line)
        if current:
            candidates.append(current)

        out = []
        for item in candidates:
            fragment = "\n".join(item["lines"])
            splits = list(_ALT.finditer(fragment))
            # No início de cada alternativa a letra deve ocorrer sozinha ou com texto.
            letters = [s.group(1) for s in splits]
            if letters != list("ABCDE"):
                out.append({"number": item["number"], "page": item["page"], "status": "bloqueada",
                            "reason": "Não foi possível identificar cinco alternativas completas."})
                continue
            stem = " ".join(fragment[:splits[0].start()].split())
            choices = []
            for i, found in enumerate(splits):
                end = splits[i + 1].start() if i + 1 < len(splits) else len(fragment)
                choice = " ".join(fragment[found.start():end].split())
                choice = re.sub(r"^\([A-E]\)\s*", "", choice)
                choices.append(choice)
            reason = ""
            if len(stem) < 18 or any(len(x) < 2 or len(x) > 1800 for x in choices):
                reason = "Enunciado ou alternativas incompletos."
            elif len(stem) > 6000 or _SUSPICIOUS.search(stem):
                reason = "Possível dependência de figura, tabela, código ou texto compartilhado."
            elif any("CONHECIMENTOS ESPECIFICOS" in norm(x) for x in choices):
                reason = "Trecho de outra seção misturado à questão."
            out.append({"number": item["number"], "page": item["page"],
                        "status": "bloqueada" if reason else "extraida",
                        "reason": reason, "question": stem[:6000],
                        "choices": choices})
        return out
    finally:
        doc.close()


def _word_lines(words):
    """A tabela PDF costuma representar cada célula como palavra independente."""
    group = []
    groups = []
    for w in sorted(words, key=lambda q: ((q[1] + q[3]) / 2, q[0])):
        ym = (w[1] + w[3]) / 2
        if group and abs(ym - group[0][0]) > 3.4:
            groups.append([x[2] for x in sorted(group, key=lambda x: x[1])])
            group = []
        group.append((ym, w[0], str(w[4]).strip()))
    if group:
        groups.append([x[2] for x in sorted(group, key=lambda x: x[1])])
    return groups


def extract_definitive_key(raw: bytes, role_fragment: str, book_type: int = 1):
    """Extrai a sequência 1..70 apenas da tabela que possui cargo+tipo exigidos."""
    doc = pdf_open(raw, max_pages=40)
    try:
        found = []
        target = norm(role_fragment)
        for pg in doc:
            h = pg.rect.height
            # Localiza título da tabela, que pode ocupar duas linhas.
            blocks = sorted(pg.get_text("blocks"), key=lambda b: (b[1], b[0]))
            headings = []
            for b in blocks:
                t = norm(str(b[4]))
                if target in t and re.search(r"\bTIPO\s*"+str(book_type)+r"\b", t):
                    headings.append(b[1])
            # Fallback: muitos PDFs deixam cargo e tipo em blocos diferentes.
            if not headings:
                words = pg.get_text("words")
                for y0 in (0, h / 2):
                    txt = norm(pg.get_text("text", clip=fitz.Rect(0, y0, pg.rect.width, min(h, y0 + h / 2))))
                    if target in txt and re.search(r"\bTIPO\s*"+str(book_type)+r"\b", txt):
                        headings.append(y0 + 40)
            if not headings:
                continue
            for y in headings:
                clip = fitz.Rect(25, y + 4, pg.rect.width - 25, min(h - 10, y + 280))
                lines = _word_lines(pg.get_text("words", clip=clip))
                answer_map = {}
                for i, tokens in enumerate(lines[:-1]):
                    numbers = [int(z) for z in tokens if z.isdigit()]
                    if len(numbers) not in (10, 20) or not numbers:
                        continue
                    start = numbers[0]
                    if start not in (1, 21, 41, 61):
                        continue
                    expected = min(20, 71 - start)
                    if len(numbers) != expected or numbers != list(range(start, start + expected)):
                        continue
                    for successor in lines[i+1:i+4]:
                        letters = [z.upper() for z in successor if re.fullmatch(r"[A-E*]", z, re.I)]
                        if len(letters) == expected:
                            answer_map.update(zip(numbers, letters))
                            break
                if len(answer_map) == 70 and set(answer_map) == set(range(1, 71)):
                    found.append(answer_map)
        if len(found) != 1:
            raise ValueError("Não foi possível conferir automaticamente o gabarito de 70 questões, cargo e tipo. Nada será liberado.")
        return found[0]
    finally:
        doc.close()


def fingerprint(question: str, choices: list[str]):
    payload = " ".join(question.casefold().split()) + "\n" + "\n".join(
        " ".join(x.casefold().split()) for x in choices)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()
