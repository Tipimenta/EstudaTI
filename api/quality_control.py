"""Rastreabilidade auditável de questões oficiais e revisão humana independente.

A confirmação humana significa conferência declarada pelo usuário: NÃO é
verificação automatizada da fonte nem endosso da banca.
"""
from __future__ import annotations

import json
from typing import Optional
from urllib.parse import urlsplit
from fastapi import Depends, HTTPException
from pydantic import BaseModel, Field


def setup(db):
    columns={r['name'] for r in db.execute('PRAGMA table_info(questions)')}
    if 'choice_rationales_json' not in columns:
        db.execute("ALTER TABLE questions ADD COLUMN choice_rationales_json TEXT NOT NULL DEFAULT '{}' ")
    db.executescript('''
        CREATE TABLE IF NOT EXISTS question_quality (
            question_id INTEGER PRIMARY KEY REFERENCES questions(id),
            content_checked INTEGER NOT NULL DEFAULT 0,
            answer_checked INTEGER NOT NULL DEFAULT 0,
            definitive_key INTEGER NOT NULL DEFAULT 0,
            page_number INTEGER,
            key_url TEXT NOT NULL DEFAULT '',
            review_note TEXT NOT NULL DEFAULT '',
            updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS question_audit (
            id INTEGER PRIMARY KEY,
            question_id INTEGER NOT NULL REFERENCES questions(id),
            action TEXT NOT NULL, before_json TEXT NOT NULL,
            after_json TEXT NOT NULL, created_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS ix_quality_audit_q ON question_audit(question_id,id);
    ''')


def good_url(text:str):
    p=urlsplit(text)
    return bool(text.startswith('https://') and p.scheme=='https' and p.netloc
                and not p.username and not p.password and len(text)<=1200)


def status_allowed(db, question_id):
    q=db.execute('SELECT origin,board,exam,year,source_url,question_number FROM questions WHERE id=?',(question_id,)).fetchone()
    if not q: raise HTTPException(404,'Questão não encontrada.')
    if q['origin']!='oficial':return True
    checks=db.execute('SELECT * FROM question_quality WHERE question_id=?',(question_id,)).fetchone()
    if not checks or not all(checks[k] for k in ('content_checked','answer_checked','definitive_key')):
        raise HTTPException(409,'Questão oficial exige conferência separada do enunciado, gabarito e versão definitiva.')
    if not good_url(checks['key_url']) or not checks['page_number']:
        raise HTTPException(409,'Informe a página do caderno e o link HTTPS do gabarito definitivo.')
    if not all([q['board'],q['exam'],q['year'],q['question_number']]) or not good_url(q['source_url']):
        raise HTTPException(409,'Questão oficial exige banca, concurso, ano, número e link HTTPS do caderno.')
    return True


def audit(db, qid:int, action:str, before, after, timestamp:str):
    db.execute('INSERT INTO question_audit(question_id,action,before_json,after_json,created_at) VALUES(?,?,?,?,?)',
       (qid,action,json.dumps(before,ensure_ascii=False,sort_keys=True),
        json.dumps(after,ensure_ascii=False,sort_keys=True),timestamp))


class QualityInput(BaseModel):
    content_checked:bool=False
    answer_checked:bool=False
    definitive_key:bool=False
    page_number:Optional[int]=Field(default=None,ge=1,le=10000)
    key_url:str=Field(default='',max_length=1200)
    review_note:str=Field(default='',max_length=2000)


def register(app,authorized,conn,nowstr):
    @app.get('/api/questions/{question_id}/quality')
    def get_quality(question_id:int,_=Depends(authorized)):
        with conn() as db:
            q=db.execute('SELECT id,origin,review_status,question,question_number,source_url FROM questions WHERE id=?',(question_id,)).fetchone()
            if q is None: raise HTTPException(404,'Questão não encontrada.')
            row=db.execute('SELECT * FROM question_quality WHERE question_id=?',(question_id,)).fetchone()
            events=db.execute('SELECT id,action,created_at FROM question_audit WHERE question_id=? ORDER BY id DESC LIMIT 10',(question_id,)).fetchall()
            return {'question':dict(q),'quality':dict(row) if row else None,
                    'audit':[dict(e) for e in events]}

    @app.patch('/api/questions/{question_id}/quality')
    def save_quality(question_id:int,payload:QualityInput,_=Depends(authorized)):
        if payload.key_url.strip() and not good_url(payload.key_url.strip()):
            raise HTTPException(422,'Use um endereço HTTPS válido para o gabarito.')
        with conn() as db:
            q=db.execute('SELECT origin,review_status FROM questions WHERE id=?',(question_id,)).fetchone()
            if not q:raise HTTPException(404,'Questão não encontrada.')
            if q['origin']!='oficial':raise HTTPException(400,'Conferência de gabarito oficial é exclusiva de questões oficiais.')
            previous=db.execute('SELECT * FROM question_quality WHERE question_id=?',(question_id,)).fetchone()
            new=payload.model_dump();new['key_url']=new['key_url'].strip();new['review_note']=new['review_note'].strip()
            if new['definitive_key'] and not (new['answer_checked'] and good_url(new['key_url'])):
                raise HTTPException(422,'Para marcar gabarito definitivo, confira-o e informe o link HTTPS.')
            if q['review_status']=='revisada' and not all(new[k] for k in ('content_checked','answer_checked','definitive_key')):
                raise HTTPException(409,'Retire a questão do simulado antes de revogar a conferência.')
            db.execute('''INSERT INTO question_quality(question_id,content_checked,answer_checked,definitive_key,
                        page_number,key_url,review_note,updated_at) VALUES(?,?,?,?,?,?,?,?)
                        ON CONFLICT(question_id) DO UPDATE SET content_checked=excluded.content_checked,
                        answer_checked=excluded.answer_checked,definitive_key=excluded.definitive_key,
                        page_number=excluded.page_number,key_url=excluded.key_url,
                        review_note=excluded.review_note,updated_at=excluded.updated_at''',
                       (question_id,int(new['content_checked']),int(new['answer_checked']),int(new['definitive_key']),
                        new['page_number'],new['key_url'],new['review_note'],nowstr()))
            audit(db,question_id,'conferencia',dict(previous) if previous else {},new,nowstr())
            return {'ok':True,'message':'Conferência declarada registrada com histórico. A verificação da fonte foi feita pelo usuário.'}
