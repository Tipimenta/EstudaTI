"""Importação sob demanda de provas públicas de TI, sem cron nem IA paga.

O usuário solicita via botão; a API baixa apenas URLs pré-aprovadas da FGV,
compara cargo/tipo com gabarito DEFINITIVO e não publica itens incertos.
Registros ficam em tabelas independentes do banco autoral EstudaTI.
"""
from __future__ import annotations

import hashlib
import json
import re
from datetime import datetime
from html import unescape
from urllib.parse import urlparse, urljoin

import requests
from fastapi import Depends, HTTPException
from pydantic import BaseModel, Field

from official_exam_parser import extract_exam, extract_definitive_key, fingerprint

SOURCE_PAGE = "https://conhecimento.fgv.br/concursos/dataprev24"
KEY_URL = "https://conhecimento.fgv.br/sites/default/files/concursos/dataprev_gabarito_definitivo-1.pdf"
PDF_ROOT = "https://conhecimento.fgv.br/sites/default/files/concursos/"
EXAMS = [
    {"code": "dp24infra", "board": "FGV", "year": 2024,
     "contest": "Dataprev 2024", "role": "Arquitetura, Engenharia e Sustentação Tecnológica",
     "fragment": "Arquitetura, Engenharia e Sustentação Tecnológica",
     "filename": "ati-arquitetura-engenharia-e-sustentacao-tecnologica-cns002-tipo-01.pdf",
     "focus": "Infraestrutura e suporte", "subject": "RED"},
    {"code": "dp24seg", "board": "FGV", "year": 2024,
     "contest": "Dataprev 2024", "role": "Segurança Cibernética e Proteção de Dados",
     "fragment": "Segurança Cibernética e Proteção de Dados",
     "filename": "ati-seguranca-cibernetica-e-protecao-de-dados-cns005-tipo-01.pdf",
     "focus": "Segurança", "subject": "SEG"},
    {"code": "dp24serv", "board": "FGV", "year": 2024,
     "contest": "Dataprev 2024", "role": "Gestão de Serviços de TIC",
     "fragment": "Gestão de Serviços de TIC",
     "filename": "ati-gestao-de-servicos-de-tic-cns006-tipo-01.pdf",
     "focus": "Gestão e serviços", "subject": "GOV"},
    {"code": "dp24dev", "board": "FGV", "year": 2024,
     "contest": "Dataprev 2024", "role": "Desenvolvimento de Software",
     "fragment": "Desenvolvimento de Software",
     "filename": "ati-desenvolvimento-de-software-cns003-tipo-01.pdf",
     "focus": "Desenvolvimento", "subject": "ENG"},
]
BY_CODE = {ex["code"]: ex for ex in EXAMS}
ALLOWED_HOST = "conhecimento.fgv.br"


def setup(db):
    db.executescript("""
    CREATE TABLE IF NOT EXISTS official_exam_sources (
        code TEXT PRIMARY KEY,
        board TEXT NOT NULL,
        contest TEXT NOT NULL,
        role TEXT NOT NULL,
        year INTEGER NOT NULL,
        book_type INTEGER NOT NULL DEFAULT 1,
        source_url TEXT NOT NULL,
        answer_url TEXT NOT NULL,
        last_checked_at TEXT,
        state TEXT NOT NULL DEFAULT 'nao_importada',
        extracted_count INTEGER NOT NULL DEFAULT 0,
        ready_count INTEGER NOT NULL DEFAULT 0,
        skipped_count INTEGER NOT NULL DEFAULT 0,
        diagnostic TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS official_exam_items (
        exam_code TEXT NOT NULL REFERENCES official_exam_sources(code),
        number INTEGER NOT NULL,
        page INTEGER NOT NULL,
        question TEXT NOT NULL,
        choices_json TEXT NOT NULL,
        correct_index INTEGER NOT NULL,
        fingerprint TEXT NOT NULL,
        source_url TEXT NOT NULL,
        key_url TEXT NOT NULL,
        status TEXT NOT NULL,
        reason TEXT NOT NULL DEFAULT '',
        PRIMARY KEY(exam_code, number)
    );
    CREATE TABLE IF NOT EXISTS official_exam_attempts (
        attempt_key TEXT PRIMARY KEY,
        exam_code TEXT NOT NULL REFERENCES official_exam_sources(code),
        created_at TEXT NOT NULL,
        answers_json TEXT NOT NULL,
        correct_count INTEGER NOT NULL,
        total INTEGER NOT NULL,
        duration_sec INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS ix_official_exam_status
    ON official_exam_items(exam_code,status);
    """)
    for e in EXAMS:
        db.execute("""INSERT INTO official_exam_sources
          (code,board,contest,role,year,book_type,source_url,answer_url)
          VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(code) DO NOTHING""",
          (e["code"], e["board"], e["contest"], e["role"], e["year"],
           1, PDF_ROOT + e["filename"], KEY_URL))


def _download(url: str, binary: bool = True):
    parsed = urlparse(url)
    if (parsed.scheme != "https" or parsed.hostname != ALLOWED_HOST or parsed.port or
        parsed.username or parsed.password or parsed.query):
        raise ValueError("Fonte não pertence ao domínio oficial permitido.")
    with requests.get(url, timeout=(7, 23), allow_redirects=False, stream=True,
                      headers={"User-Agent":"EstudaTI/1.4 (importador pessoal; consulta sob demanda)"}) as response:
        if response.status_code != 200:
            raise ValueError(f"Fonte oficial retornou HTTP {response.status_code}.")
        mime = response.headers.get("content-type", "").lower()
        data = bytearray()
        for chunk in response.iter_content(65536):
            data.extend(chunk)
            if len(data) > (12 * 1024 * 1024 if binary else 1024 * 1024):
                raise ValueError("Fonte excedeu limite de transferência.")
        raw = bytes(data)
    if binary and (not raw.startswith(b"%PDF-") or "html" in mime):
        raise ValueError("A banca não entregou um PDF válido.")
    if not binary and (not raw or b"<" not in raw[:2000]):
        raise ValueError("A página da banca não retornou HTML.")
    return raw


def _discover(exam):
    """Scraping só quando o usuário clica: confirmar links presentes na página."""
    html = _download(SOURCE_PAGE, binary=False).decode("utf-8", "replace")
    links = [urljoin(SOURCE_PAGE, unescape(u)) for u in re.findall(
        r"href\s*=\s*[\"']([^\"']+)[\"']", html, re.I)]
    expected = exam["filename"]
    pdf = next((u for u in links if urlparse(u).path.endswith("/" + expected)
                and urlparse(u).hostname == ALLOWED_HOST), None)
    key = next((u for u in links if "dataprev_gabarito_definitivo-1.pdf" in urlparse(u).path
                and urlparse(u).hostname == ALLOWED_HOST), None)
    # A página pode mudar a estrutura HTML, mas os URLs conhecidos permanecem
    # candidatos: o download final precisa validar PDF, cargo e gabarito.
    return pdf or PDF_ROOT + expected, key or KEY_URL, bool(pdf), bool(key)


def _record_failure(conn, code, nowstr, message):
    with conn() as db:
        db.execute("""UPDATE official_exam_sources SET last_checked_at=?,state='erro',
           diagnostic=? WHERE code=?""", (nowstr(), message[:280], code))


def refresh_one(exam, conn, nowstr):
    code = exam["code"]
    try:
        pdf_url, key_url, linked_pdf, linked_key = _discover(exam)
        pdf_data = _download(pdf_url)
        key_data = _download(key_url)
        key = extract_definitive_key(key_data, exam["fragment"], 1)
        parsed = extract_exam(pdf_data)
        if len(parsed) < 45:
            raise ValueError("Extração incompleta: menos de 45 marcadores de questões. Nenhuma prova liberada.")
        present = {q["number"] for q in parsed}
        if len(present) < 45 or len(present) != len(parsed):
            raise ValueError("Sequência duplicada ou incompleta do caderno. Nenhuma prova liberada.")
        rows = []
        blocked = 0
        for q in parsed:
            number = q["number"]
            if q["status"] != "extraida" or key[number] == "*":
                blocked += 1
                continue
            answer = key[number]
            options = q.get("choices") or []
            if len(options) != 5 or answer not in "ABCDE" or len(q["question"]) < 18:
                blocked += 1
                continue
            rows.append((code, number, q["page"], q["question"],
                         json.dumps(options, ensure_ascii=False), "ABCDE".index(answer),
                         fingerprint(q["question"], options), pdf_url, key_url,
                         "verificada", "Gabarito definitivo oficial: " + answer))
        if len(rows) < 30:
            raise ValueError("Validação insuficiente: menos de 30 questões com texto e gabarito compatíveis.")
        with conn() as db:
            # Sem apagar dados de tentativas. UPSERT idempotente pelas questões
            # numeradas do mesmo cargo/tipo.
            for row in rows:
                db.execute("""INSERT INTO official_exam_items
                (exam_code,number,page,question,choices_json,correct_index,fingerprint,
                 source_url,key_url,status,reason)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT(exam_code,number) DO UPDATE SET
                  page=excluded.page,question=excluded.question,
                  choices_json=excluded.choices_json,correct_index=excluded.correct_index,
                  fingerprint=excluded.fingerprint,source_url=excluded.source_url,
                  key_url=excluded.key_url,status=excluded.status,reason=excluded.reason
                """, row)
            db.execute("""UPDATE official_exam_sources SET source_url=?,answer_url=?,
                last_checked_at=?,state='parcial' ,extracted_count=?,ready_count=?,
                skipped_count=?,diagnostic=? WHERE code=?""",
                (pdf_url,key_url,nowstr(),len(parsed),len(rows),blocked,
                ("Importação pessoal de fonte pública. " +
                 ("Link localizado na página da banca. " if linked_pdf and linked_key
                  else "URLs oficiais confirmados diretamente. ") +
                 "Questões com figura, texto compartilhado ou anulação foram excluídas.")[:280], code))
        return {"ok": True, "exam_code": code, "extracted":len(parsed),
                "imported":len(rows), "blocked":blocked,
                "message":"Questões conferidas por número e gabarito definitivo; itens ambíguos não foram liberados."}
    except (ValueError, requests.RequestException, RuntimeError) as exc:
        reason = str(exc)[:280]
        _record_failure(conn, code, nowstr, reason)
        return {"ok":False, "exam_code":code, "imported":0,
                "blocked":None, "message":reason}


class Answer(BaseModel):
    number: int = Field(ge=1, le=70)
    choice_index: int = Field(ge=0, le=4)


class Submission(BaseModel):
    answers: list[Answer] = Field(min_length=1, max_length=70)
    duration_sec: int = Field(default=0, ge=0, le=18000)


def register(app, authorized, conn, nowstr):
    @app.get("/api/provas/oficiais")
    def catalog(_: None = Depends(authorized)):
        with conn() as db:
            rows = [dict(r) for r in db.execute("""SELECT s.*, (SELECT COUNT(*)
               FROM official_exam_items i WHERE i.exam_code=s.code AND i.status='verificada') live_count,
               (SELECT COUNT(*) FROM official_exam_attempts a WHERE a.exam_code=s.code) attempts
               FROM official_exam_sources s ORDER BY year DESC,role""")]
        for row in rows:
            row["focus"] = BY_CODE[row["code"]]["focus"]
            row["source_page"] = SOURCE_PAGE
        return {"items":rows,"mode":"manual", "note":"Sem busca agendada; use Atualizar somente quando desejar."}

    @app.post("/api/provas/oficiais/{code}/atualizar")
    def refresh(code:str,_:None=Depends(authorized)):
        exam=BY_CODE.get(code)
        if not exam:
            raise HTTPException(404,"Esta banca/cargo ainda não possui extrator automático.")
        return refresh_one(exam,conn,nowstr)

    @app.get("/api/provas/oficiais/{code}/questoes")
    def questions(code:str,_:None=Depends(authorized)):
        if code not in BY_CODE: raise HTTPException(404,"Prova não catalogada.")
        with conn() as db:
            rows=[dict(r) for r in db.execute("""SELECT number,page,question,choices_json,
                    source_url,status FROM official_exam_items
                    WHERE exam_code=? AND status='verificada' ORDER BY number""",(code,))]
        for row in rows:
            row["choices"]=json.loads(row.pop("choices_json"))
        return {"exam_code":code,"role":BY_CODE[code]["role"],
                "total":len(rows),"complete":len(rows)==70,"items":rows}

    @app.post("/api/provas/oficiais/{code}/corrigir")
    def submit(code:str, payload:Submission,_:None=Depends(authorized)):
        if code not in BY_CODE: raise HTTPException(404,"Prova não catalogada.")
        numbers=[a.number for a in payload.answers]
        if len(numbers)!=len(set(numbers)):
            raise HTTPException(400,"Uma questão foi respondida mais de uma vez.")
        with conn() as db:
            rows=[dict(r) for r in db.execute("""SELECT number,correct_index,status,source_url,key_url
                FROM official_exam_items WHERE exam_code=? AND status='verificada'""",(code,))]
            key={r["number"]:r for r in rows}
            if any(n not in key for n in numbers):
                raise HTTPException(409,"Alguma questão não foi liberada após validação.")
            details=[]
            correct=0
            for a in payload.answers:
                item=key[a.number]
                ok=a.choice_index==item["correct_index"]
                correct+=int(ok)
                details.append({"number":a.number,"correct":ok,
                                "your_choice":a.choice_index,
                                "correct_index":item["correct_index"],
                                "explanation":"Gabarito definitivo da FGV: letra " +
                                "ABCDE"[item["correct_index"]] +
                                ". Consulte o caderno oficial para a fundamentação.",
                                "key_url":item["key_url"]})
            attempt_key=hashlib.sha256((code+nowstr()+repr(numbers)+str(payload.duration_sec)).encode()).hexdigest()
            db.execute("""INSERT INTO official_exam_attempts
                (attempt_key,exam_code,created_at,answers_json,correct_count,total,duration_sec)
                VALUES (?,?,?,?,?,?,?)""",(attempt_key,code,nowstr(),
                 json.dumps([x.model_dump() for x in payload.answers]),
                 correct,len(payload.answers),payload.duration_sec))
        return {"attempt_key":attempt_key,"total":len(payload.answers),"correct":correct,
                "results":details}

    @app.get("/api/provas/oficiais/{code}/historico")
    def history(code:str,_:None=Depends(authorized)):
        if code not in BY_CODE: raise HTTPException(404,"Prova não catalogada.")
        with conn() as db:
            rows=[dict(r) for r in db.execute("""SELECT attempt_key,created_at,correct_count,
              total,duration_sec FROM official_exam_attempts WHERE exam_code=?
              ORDER BY created_at DESC LIMIT 30""",(code,))]
        return {"items":rows}
