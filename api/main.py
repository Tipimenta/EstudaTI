"""EstudaTI - API local de estudos (projeto inicial de usuário único)."""
import base64
import hashlib
import hmac
import ipaddress
import json
import os
import random
import socket
import sqlite3
import threading
import time
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from pathlib import Path
from urllib.parse import urlparse

import requests
from fastapi import Depends, FastAPI, HTTPException, Request, Response, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from seed import CONTESTS, SUBJECTS, TOPICS
from advanced_seed import prepare_units, RESOURCES
from extra_resources import EXTRA_RESOURCES
RESOURCES.extend(EXTRA_RESOURCES)
from questions_tools import clean_question, fingerprint
from question_diversity import canonical_fingerprint, resembles
from quality_control import setup as setup_quality, register as register_quality, status_allowed, audit as audit_question
from syllabus import setup as setup_syllabus, register as register_syllabus
from curated_cases import seed as seed_curated_cases
from intelligence import setup as setup_intelligence, review_question
from pedagogical_workshops import seed_workshops
from expert_seed import seed_expert_units
from learning_api import register as register_learning_routes
from discursive_api import setup as setup_discursive, register as register_discursive

DB_PATH = os.getenv('DATABASE_PATH', '/data/estudati.sqlite3')
DATABASE_URL = os.getenv('DATABASE_URL', '').strip()
PASSWORD = os.getenv('APP_PASSWORD', '')
SECRET = os.getenv('APP_SECRET', '')
COOKIE_SECURE = os.getenv('COOKIE_SECURE', 'false').lower() == 'true'
ENABLE_MONITOR = os.getenv('ENABLE_MONITOR', 'true').lower() == 'true'
now = lambda: datetime.now(ZoneInfo(os.getenv('APP_TIMEZONE', 'America/Sao_Paulo'))) 
nowstr = lambda: now().isoformat(timespec='seconds')
app = FastAPI(title='EstudaTI API', version='1.3.0', docs_url=None, redoc_url=None)
stop_monitor = threading.Event()
login_attempts = {}
login_lock = threading.Lock()
boot_status = {'state': 'starting'}


@app.middleware('http')
async def init_guard(request: Request, call_next):
    if request.url.path != '/api/health' and boot_status['state'] != 'ready':
        return JSONResponse(status_code=503, content={'detail':'Banco de dados inicializando; tente novamente.'})
    return await call_next(request)


@app.get('/api/health')
def health():
    state=boot_status['state']
    return JSONResponse(status_code=200 if state == 'ready' else 503,
                        content={'app':'EstudaTI','database':state})


def conn():
    if DATABASE_URL:
        from postgres_compat import connect as pg_connect
        return pg_connect(DATABASE_URL)
    db = sqlite3.connect(DB_PATH, timeout=30)
    db.row_factory = sqlite3.Row
    db.execute('PRAGMA foreign_keys=ON')
    return db


def jrows(rows):
    return [dict(x) for x in rows]


def init_db():
    if not DATABASE_URL:
        Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)
    with conn() as db:
        db.executescript('''
        PRAGMA journal_mode=WAL;
        CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY, code TEXT UNIQUE, name TEXT, category TEXT);
        CREATE TABLE IF NOT EXISTS topics (
          id INTEGER PRIMARY KEY, subject_id INTEGER NOT NULL REFERENCES subjects(id),
          title TEXT NOT NULL, content TEXT NOT NULL, objective TEXT, minutes INTEGER DEFAULT 40);
        CREATE TABLE IF NOT EXISTS flashcards (
          id INTEGER PRIMARY KEY, topic_id INTEGER NOT NULL REFERENCES topics(id),
          front TEXT NOT NULL, back TEXT NOT NULL, ease REAL DEFAULT 2.5,
          repetitions INTEGER DEFAULT 0, interval_days INTEGER DEFAULT 0,
          due_at TEXT NOT NULL, last_review_at TEXT);
        CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY, topic_id INTEGER REFERENCES topics(id), question TEXT,
          choices_json TEXT, correct_index INTEGER, explanation TEXT);
        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id INTEGER PRIMARY KEY, created_at TEXT, count INTEGER, correct INTEGER, duration_sec INTEGER);
        CREATE TABLE IF NOT EXISTS quiz_answers (
          id INTEGER PRIMARY KEY, attempt_id INTEGER REFERENCES quiz_attempts(id),
          question_id INTEGER REFERENCES questions(id), choice_index INTEGER, correct INTEGER);
        CREATE TABLE IF NOT EXISTS lesson_progress (
          topic_id INTEGER PRIMARY KEY REFERENCES topics(id),
          completed INTEGER NOT NULL DEFAULT 0,
          notes TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS sessions (
          id INTEGER PRIMARY KEY, created_at TEXT, topic_id INTEGER REFERENCES topics(id),
          minutes INTEGER, mode TEXT);
        CREATE TABLE IF NOT EXISTS plan_items (
          id INTEGER PRIMARY KEY, study_date TEXT, topic_id INTEGER REFERENCES topics(id),
          minutes INTEGER, completed INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS contests (
          id INTEGER PRIMARY KEY, name TEXT, position TEXT, location TEXT,
          salary REAL, registration_deadline TEXT, url TEXT NOT NULL, notes TEXT,
          last_checked_at TEXT, last_fingerprint TEXT, changed INTEGER DEFAULT 0,
          last_error TEXT, last_http_status INTEGER);
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY CHECK(id=1), daily_minutes INTEGER DEFAULT 90);
        INSERT OR IGNORE INTO settings (id,daily_minutes) VALUES (1,90);
        ''')
        # Migração aditiva v0.2; preserva histórico do SQLite da versão 0.1.
        extra_columns = {
          'origin': "TEXT NOT NULL DEFAULT 'autoral'",
          'question_type': "TEXT NOT NULL DEFAULT 'multipla'",
          'board': "TEXT NOT NULL DEFAULT ''", 'exam': "TEXT NOT NULL DEFAULT ''",
          'year': 'INTEGER', 'question_number': "TEXT NOT NULL DEFAULT ''",
          'source_url': "TEXT NOT NULL DEFAULT ''", 'license_note': "TEXT NOT NULL DEFAULT ''",
          'fingerprint': "TEXT NOT NULL DEFAULT ''",
          'review_status': "TEXT NOT NULL DEFAULT 'revisada'",
        }
        known = {r['name'] for r in db.execute('PRAGMA table_info(questions)')}
        for name, definition in extra_columns.items():
            if name not in known:
                db.execute(f'ALTER TABLE questions ADD COLUMN {name} {definition}')
        db.execute('CREATE INDEX IF NOT EXISTS idx_questions_metadata ON questions(origin,board,year,review_status)')
        db.execute('CREATE INDEX IF NOT EXISTS idx_answers_question ON quiz_answers(question_id,correct)')
        count = db.execute('SELECT COUNT(*) FROM subjects').fetchone()[0]
        if count == 0:
            for code, name, category in SUBJECTS:
                db.execute('INSERT INTO subjects(code,name,category) VALUES (?,?,?)', (code,name,category))
            sub = {r['code']:r['id'] for r in db.execute('SELECT id,code FROM subjects')}
            for code,title,content,objective,cards,questions in TOPICS:
                cur=db.execute('INSERT INTO topics(subject_id,title,content,objective,minutes) VALUES (?,?,?,?,?)',
                               (sub[code],title,content,objective,45))
                topic_id=cur.lastrowid
                for front,back in cards:
                    db.execute('INSERT INTO flashcards(topic_id,front,back,due_at) VALUES (?,?,?,?)',
                               (topic_id,front,back,nowstr()))
                for stem,choices,index,explanation in questions:
                    db.execute('INSERT INTO questions(topic_id,question,choices_json,correct_index,explanation) VALUES (?,?,?,?,?)',
                               (topic_id,stem,json.dumps(choices,ensure_ascii=False),index,explanation))
        plan_cols={r['name'] for r in db.execute('PRAGMA table_info(plan_items)')}
        if 'activity' not in plan_cols:
            db.execute("ALTER TABLE plan_items ADD COLUMN activity TEXT NOT NULL DEFAULT 'conteúdo'")
        # Migração v0.3: aulas autorais adicionais SEM recriar históricos existentes.
        sub = {r['code']:r['id'] for r in db.execute('SELECT id,code FROM subjects')}
        for code,title,content,objective,cards,questions in prepare_units():
            existing=db.execute('SELECT id FROM topics WHERE subject_id=? AND title=?',(sub[code],title)).fetchone()
            if existing:continue
            tid=db.execute('INSERT INTO topics(subject_id,title,content,objective,minutes) VALUES (?,?,?,?,?)',
                           (sub[code],title,content,objective,35)).lastrowid
            for front,back in cards:
                db.execute('INSERT INTO flashcards(topic_id,front,back,due_at) VALUES (?,?,?,?)',
                           (tid,front,back,nowstr()))
            for stem,choices,index,explanation in questions:
                db.execute('''INSERT INTO questions(topic_id,question,choices_json,correct_index,explanation,
                      fingerprint,origin,review_status) VALUES (?,?,?,?,?,?,?,?)''',
                      (tid,stem,json.dumps(choices,ensure_ascii=False),index,explanation,
                       fingerprint(stem,choices),'autoral','revisada'))
        # V0.5: expansão aditiva e idempotente de aulas aprofundadas.
        # Nunca modifica o conteúdo das aulas existentes nem apaga tentativas,
        # cartões, notas, cronograma ou progresso previamente salvos.
        db.execute('''CREATE TABLE IF NOT EXISTS lesson_meta (
          topic_id INTEGER PRIMARY KEY REFERENCES topics(id),
          track TEXT NOT NULL DEFAULT 'Introdução',
          source_url TEXT NOT NULL DEFAULT '',
          source_label TEXT NOT NULL DEFAULT '',
          module_order INTEGER NOT NULL DEFAULT 0,
          material_version TEXT NOT NULL DEFAULT ''
        )''')
        import random as _random
        with open(Path(__file__).parent/'deep_course.json',encoding='utf-8') as course_file:
            deep_units=json.load(course_file)
        for rank,unit in enumerate(deep_units,1):
            if unit['code'] not in sub:
                raise RuntimeError('Disciplina de aprofundamento desconhecida: '+unit['code'])
            found=db.execute('SELECT id FROM topics WHERE subject_id=? AND title=?',
                             (sub[unit['code']],unit['title'])).fetchone()
            if found:
                tid=found['id']
            else:
                tid=db.execute('''INSERT INTO topics(subject_id,title,content,objective,minutes)
                                  VALUES (?,?,?,?,?)''',
                               (sub[unit['code']],unit['title'],unit['content'],
                                unit['objective'],unit.get('minutes',65))).lastrowid
                for front,back in unit['cards']:
                    db.execute('INSERT INTO flashcards(topic_id,front,back,due_at) VALUES (?,?,?,?)',
                               (tid,front,back,nowstr()))
                for j,question in enumerate(unit['questions']):
                    choices=list(question['choices'])
                    correct=choices[question['correct_index']]
                    # Evita posição previsível do gabarito sem alterar o conteúdo.
                    seed=int(hashlib.sha256(f'{unit["code"]}:{unit["title"]}:{j}'.encode()).hexdigest()[:12],16)
                    _random.Random(seed).shuffle(choices)
                    db.execute('''INSERT INTO questions(topic_id,question,choices_json,correct_index,
                          explanation,fingerprint,origin,review_status) VALUES (?,?,?,?,?,?,?,?)''',
                        (tid,question['stem'],json.dumps(choices,ensure_ascii=False),
                         choices.index(correct),question['explanation'],
                         fingerprint(question['stem'],choices),'autoral','revisada'))
            db.execute('''INSERT INTO lesson_meta(topic_id,track,source_url,source_label,module_order,material_version)
                          VALUES (?,?,?,?,?,?)
                          ON CONFLICT(topic_id) DO UPDATE SET
                            track=excluded.track,source_url=excluded.source_url,
                            source_label=excluded.source_label,module_order=excluded.module_order,
                            material_version=excluded.material_version''',
                       (tid,unit['track'],unit['source_url'],unit['source_label'],
                        rank,unit['version']))
        contest_known={r['name'] for r in db.execute('PRAGMA table_info(contests)')}
        if 'active' not in contest_known:
            db.execute('ALTER TABLE contests ADD COLUMN active INTEGER NOT NULL DEFAULT 1')
        if 'priority' not in contest_known:
            db.execute('ALTER TABLE contests ADD COLUMN priority INTEGER NOT NULL DEFAULT 3')
        if 'verified_at' not in contest_known:
            db.execute('ALTER TABLE contests ADD COLUMN verified_at TEXT')
        for row in db.execute("SELECT id,question,choices_json FROM questions WHERE fingerprint='' ").fetchall():
            db.execute('UPDATE questions SET fingerprint=? WHERE id=?',
                       (fingerprint(row['question'],json.loads(row['choices_json'])),row['id']))
        if db.execute('SELECT COUNT(*) FROM contests').fetchone()[0] == 0:
            db.executemany('INSERT INTO contests(name,position,location,salary,registration_deadline,url,notes) VALUES (?,?,?,?,?,?,?)',CONTESTS)
        setup_intelligence(db)
        seed_expert_units(db,sub)
        # Revisão V1.1.1: uma única limpeza não destrutiva de duplicatas literais.
        # O marcador impede nova alteração se o usuário decidir reativá-las.
        db.execute('CREATE TABLE IF NOT EXISTS data_migrations (key TEXT PRIMARY KEY, applied_at TEXT)')
        if not db.execute('SELECT 1 FROM data_migrations WHERE key=?',('archive_duplicate_authored_111',)).fetchone():
            repeated=set()
            for item in db.execute('''SELECT q.id,q.question,q.review_status,s.code
                     FROM questions q JOIN topics t ON t.id=q.topic_id
                     JOIN subjects s ON s.id=t.subject_id
                     WHERE q.origin='autoral' ORDER BY q.id''').fetchall():
                key=(item['code'],' '.join(item['question'].casefold().split()))
                if key in repeated and item['review_status']=='revisada':
                    db.execute("UPDATE questions SET review_status='arquivada' WHERE id=?",(item['id'],))
                repeated.add(key)
            db.execute('INSERT INTO data_migrations(key,applied_at) VALUES(?,?)',('archive_duplicate_authored_111',nowstr()))
        setup_discursive(db)
        setup_quality(db)
        setup_syllabus(db)
        # V1.2: adicionar oficinas de transferência em 9 disciplinas, sem alterar aulas existentes.
        seed_workshops(db,sub,nowstr)
        seed_curated_cases(db,nowstr)
    # So aceitar requisicoes apos o commit da inicializacao.
    boot_status['state']='ready'


def sign_session():
    timestamp = str(int(time.time())+14*86400)
    payload=f'v1:{timestamp}'
    mac=hmac.new(SECRET.encode(),payload.encode(),hashlib.sha256).hexdigest()
    return base64.urlsafe_b64encode(f'{payload}:{mac}'.encode()).decode()


def is_valid_session(token):
    if not token or not SECRET: return False
    try:
        raw=base64.urlsafe_b64decode(token.encode()).decode()
        version,until,mac=raw.split(':',2)
        payload=f'{version}:{until}'
        expected=hmac.new(SECRET.encode(),payload.encode(),hashlib.sha256).hexdigest()
        return version=='v1' and int(until)>time.time() and hmac.compare_digest(mac,expected)
    except (ValueError,TypeError,UnicodeDecodeError): return False


def authorized(request:Request):
    if not is_valid_session(request.cookies.get('estudati_session')):
        raise HTTPException(401,'Faça login para continuar.')


class Login(BaseModel):
    password: str


@app.post('/api/login')
def login(body:Login,request:Request,response:Response):
    if not PASSWORD or len(PASSWORD)<12 or PASSWORD.startswith('TROQUE_') or len(SECRET)<32 or SECRET.startswith('TROQUE_'):
        raise HTTPException(503,'Escolha uma senha de 12+ caracteres e APP_SECRET aleatória de 32+ caracteres no .env.')
    ip=request.client.host if request.client else 'local'
    with login_lock:
        history=[x for x in login_attempts.get(ip,[]) if x>time.time()-600]
        if len(history)>=10: raise HTTPException(429,'Muitas tentativas; tente mais tarde.')
    if not hmac.compare_digest(body.password.encode(),PASSWORD.encode()):
        with login_lock: login_attempts[ip]=history+[time.time()]
        raise HTTPException(401,'Senha incorreta.')
    with login_lock: login_attempts.pop(ip,None)
    response.set_cookie('estudati_session',sign_session(),max_age=14*86400,httponly=True,
                        secure=COOKIE_SECURE,samesite='lax',path='/')
    return {'ok': True}


@app.post('/api/logout')
def logout(response:Response,_=Depends(authorized)):
    response.delete_cookie('estudati_session',path='/')
    return {'ok':True}


@app.get('/api/me')
def me(_=Depends(authorized)):
    return {'logged_in':True,'app':'EstudaTI','version':'1.3.0'}


@app.get('/api/dashboard')
def dashboard(_=Depends(authorized)):
    today=now().date()
    weekstart=today-timedelta(days=today.weekday())
    with conn() as db:
        today_min=db.execute('SELECT COALESCE(SUM(minutes),0) FROM sessions WHERE substr(created_at,1,10)=?',(str(today),)).fetchone()[0]
        week_min=db.execute('SELECT COALESCE(SUM(minutes),0) FROM sessions WHERE substr(created_at,1,10)>=?',(str(weekstart),)).fetchone()[0]
        cards=db.execute('SELECT COUNT(*) FROM flashcards WHERE due_at <= ?', (nowstr(),)).fetchone()[0]
        questions=db.execute("SELECT COUNT(*) FROM questions WHERE review_status='revisada'").fetchone()[0]
        total=db.execute('SELECT COUNT(*) FROM quiz_attempts').fetchone()[0]
        best=db.execute('SELECT COALESCE(ROUND(100.0*SUM(correct)/NULLIF(SUM(count),0),0),0) FROM quiz_attempts').fetchone()[0]
        goal=db.execute('SELECT daily_minutes FROM settings WHERE id=1').fetchone()[0]
        recent=jrows(db.execute('SELECT q.id,q.created_at,q.count,q.correct,q.duration_sec FROM quiz_attempts q ORDER BY q.id DESC LIMIT 5'))
        nextplan=jrows(db.execute('SELECT p.id,p.study_date,p.minutes,p.completed,p.activity,t.title,s.name subject FROM plan_items p JOIN topics t ON p.topic_id=t.id JOIN subjects s ON t.subject_id=s.id WHERE p.study_date>=? ORDER BY p.study_date,p.id LIMIT 5',(str(today),)))
        return {'minutes_today':today_min,'minutes_week':week_min,'cards_due':cards,'question_count':questions,
                'quizzes_completed':total,'quiz_accuracy':best,'daily_goal':goal,
                'recent_quizzes':recent,'next_plan':nextplan}


@app.get('/api/subjects')
def subjects(_=Depends(authorized)):
    with conn() as db:
        return jrows(db.execute('SELECT s.*, (SELECT COUNT(*) FROM topics t WHERE t.subject_id=s.id) topic_count FROM subjects s ORDER BY s.id'))


@app.get('/api/topics')
def topics(subject_id:int|None=None,_=Depends(authorized)):
    with conn() as db:
        if subject_id: rows=db.execute('SELECT t.*,s.name subject,s.code FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE s.id=? ORDER BY t.id',(subject_id,))
        else: rows=db.execute('SELECT t.*,s.name subject,s.code FROM topics t JOIN subjects s ON s.id=t.subject_id ORDER BY t.id')
        return jrows(rows)


@app.get('/api/topics/{topic_id}')
def topic(topic_id:int,_=Depends(authorized)):
    with conn() as db:
        row=db.execute('SELECT t.*,s.name subject FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE t.id=?',(topic_id,)).fetchone()
        if not row: raise HTTPException(404,'Assunto não encontrado')
        return dict(row)


# v0.4: trilha por disciplina, progresso e notas salvos no mesmo banco existente.
@app.get('/api/study/lessons')
def study_lessons(_=Depends(authorized)):
    with conn() as db:
        rows=db.execute('''SELECT t.id,t.subject_id,t.title,t.objective,t.minutes,s.code,
                          s.name subject,COALESCE(lp.completed,0) completed,
                          COALESCE(lp.notes,'') notes,COALESCE(lm.track,'Introdução') track,
                          COALESCE(lm.module_order,0) module_order
                          FROM topics t JOIN subjects s ON s.id=t.subject_id
                          LEFT JOIN lesson_progress lp ON lp.topic_id=t.id
                          LEFT JOIN lesson_meta lm ON lm.topic_id=t.id
                          ORDER BY s.id,CASE WHEN lm.track='Aprofundamento' THEN 0 WHEN lm.track='Oficina de prova' THEN 1 ELSE 2 END,
                          lm.module_order,t.id''').fetchall()
        return jrows(rows)

@app.get('/api/study/lessons/{topic_id}')
def study_lesson(topic_id:int,_=Depends(authorized)):
    with conn() as db:
        row=db.execute('''SELECT t.*,s.name subject,s.code,
                          COALESCE(lp.completed,0) completed, COALESCE(lp.notes,'') notes,
                          COALESCE(lm.track,'Introdução') track, COALESCE(lm.source_url,'') source_url,
                          COALESCE(lm.source_label,'') source_label
                          FROM topics t JOIN subjects s ON s.id=t.subject_id
                          LEFT JOIN lesson_progress lp ON lp.topic_id=t.id
                          LEFT JOIN lesson_meta lm ON lm.topic_id=t.id WHERE t.id=?''',(topic_id,)).fetchone()
        if not row: raise HTTPException(404,'Aula não encontrada')
        questions=jrows(db.execute('''SELECT id,question,choices_json FROM questions
                 WHERE topic_id=? AND review_status='revisada' ORDER BY id LIMIT 5''',(topic_id,)))
        for q in questions:q['choices']=json.loads(q.pop('choices_json'))
        return {**dict(row),'questions':questions}

class LessonProgressPatch(BaseModel):
    completed:bool|None=None
    notes:str|None=Field(default=None,max_length=10000)

@app.patch('/api/study/lessons/{topic_id}')
def update_lesson(topic_id:int,body:LessonProgressPatch,_=Depends(authorized)):
    if body.completed is None and body.notes is None:raise HTTPException(400,'Informe uma alteração')
    with conn() as db:
        if not db.execute('SELECT 1 FROM topics WHERE id=?',(topic_id,)).fetchone():
            raise HTTPException(404,'Aula não encontrada')
        db.execute('''INSERT OR IGNORE INTO lesson_progress(topic_id,completed,notes,updated_at)
                      VALUES(?,?,?,?)''',(topic_id,0,'',nowstr()))
        if body.completed is not None:
            db.execute('UPDATE lesson_progress SET completed=?,updated_at=? WHERE topic_id=?',
                       (int(body.completed),nowstr(),topic_id))
        if body.notes is not None:
            db.execute('UPDATE lesson_progress SET notes=?,updated_at=? WHERE topic_id=?',
                       (body.notes,nowstr(),topic_id))
        row=db.execute('SELECT completed,notes,updated_at FROM lesson_progress WHERE topic_id=?',(topic_id,)).fetchone()
        return dict(row)

@app.get('/api/study/handbooks/{subject_code}')
def get_handbook(subject_code:str,_=Depends(authorized)):
    with open(Path(__file__).parent / 'handbooks.json',encoding='utf-8') as handle:
        data=json.load(handle)
    code=subject_code.upper()
    if code not in data:raise HTTPException(404,'Disciplina não encontrada')
    return data[code]

@app.get('/api/flashcards/due')
def due_flashcards(limit:int=15,_=Depends(authorized)):
    with conn() as db:
        return jrows(db.execute('SELECT f.id,f.front,f.back,f.due_at,f.repetitions,t.title,s.name subject FROM flashcards f JOIN topics t ON f.topic_id=t.id JOIN subjects s ON t.subject_id=s.id WHERE f.due_at <= ? ORDER BY f.due_at LIMIT ?', (nowstr(),min(max(limit,1),100))))


class Review(BaseModel):
    quality:int=Field(ge=0,le=5)


@app.post('/api/flashcards/{card_id}/review')
def review_flashcard(card_id:int,data:Review,_=Depends(authorized)):
    with conn() as db:
        row=db.execute('SELECT * FROM flashcards WHERE id=?',(card_id,)).fetchone()
        if not row:raise HTTPException(404,'Card não encontrado')
        ease=float(row['ease']); repetitions=int(row['repetitions']); interval=int(row['interval_days'])
        q=data.quality
        if q<3:
            repetitions=0; interval=0
            due=now()+timedelta(minutes=10)
        else:
            interval=1 if repetitions==0 else (6 if repetitions==1 else max(1,round(interval*ease)))
            repetitions+=1
            due=now()+timedelta(days=interval)
        ease=max(1.3,ease+(.1-(5-q)*(.08+(5-q)*.02)))
        db.execute('UPDATE flashcards SET ease=?,repetitions=?,interval_days=?,due_at=?,last_review_at=? WHERE id=?',
                   (ease,repetitions,interval,due.isoformat(timespec='seconds'),nowstr(),card_id))
    return {'ok':True,'next_due':due.isoformat(timespec='seconds'),'interval_days':interval}



@app.get('/api/questions/meta')
def question_meta(_=Depends(authorized)):
    with conn() as db:
        totals = jrows(db.execute("SELECT origin,review_status,COUNT(*) total FROM questions GROUP BY origin,review_status"))
        boards=[r[0] for r in db.execute("SELECT DISTINCT board FROM questions WHERE board!='' ORDER BY board")]
        years=[r[0] for r in db.execute("SELECT DISTINCT year FROM questions WHERE year IS NOT NULL ORDER BY year DESC")]
        wrong=db.execute('SELECT COUNT(DISTINCT question_id) FROM quiz_answers WHERE correct=0').fetchone()[0]
        return {'counts':totals,'boards':boards,'years':years,'wrong_count':wrong}


@app.get('/api/questions/list')
def list_questions(q:str='',origin:str='',status:str='',board:str='',subject_id:int|None=None,
                   page:int=1,page_size:int=30,_=Depends(authorized)):
    page=max(page,1);page_size=min(max(page_size,1),100)
    clauses=[];params=[]
    if q.strip(): clauses.append('q.question LIKE ?');params.append('%'+q.strip()[:100]+'%')
    if origin in ('autoral','oficial','adaptada'): clauses.append('q.origin=?');params.append(origin)
    if status in ('rascunho','revisada','anulada','arquivada'): clauses.append('q.review_status=?');params.append(status)
    if board: clauses.append('q.board=?');params.append(board)
    if subject_id: clauses.append('t.subject_id=?');params.append(subject_id)
    where='WHERE '+' AND '.join(clauses) if clauses else ''
    with conn() as db:
        query=f'''FROM questions q JOIN topics t ON q.topic_id=t.id JOIN subjects s ON s.id=t.subject_id {where}'''
        total=db.execute('SELECT COUNT(*) '+query,params).fetchone()[0]
        rows=jrows(db.execute('SELECT q.*,t.title topic,s.name subject '+query+' ORDER BY q.id DESC LIMIT ? OFFSET ?',params+[page_size,(page-1)*page_size]))
        for x in rows:
            x['choices']=json.loads(x.pop('choices_json'))
            x['choice_rationales']=json.loads(x.pop('choice_rationales_json') or '{}')
        return {'total':total,'page':page,'items':rows}


class QuestionImport(BaseModel):
    questions:list[dict]=Field(min_length=1,max_length=500)


@app.post('/api/questions/import')
def import_questions(payload:QuestionImport,_=Depends(authorized)):
    inserted=0; duplicates=0; errors=[]; similar=[]
    with conn() as db:
        subject_ids={r['code']:r['id'] for r in db.execute('SELECT id,code FROM subjects')}
        subjects={code:db.execute('SELECT id FROM topics WHERE subject_id=? ORDER BY id LIMIT 1',
                (sid,)).fetchone()[0] for code,sid in subject_ids.items()}
        topic_subject={r['id']:r['subject_id'] for r in db.execute('SELECT id,subject_id FROM topics')}
        topics=set(topic_subject)
        # Uma consulta ao banco: inclui questões anteriores e as recém-importadas.
        existing_by_subject={sid:[] for sid in subject_ids.values()}
        canonical_seen=set(); fingerprints=set()
        for record in db.execute('SELECT id,topic_id,question,choices_json,fingerprint FROM questions'):
            choices=json.loads(record['choices_json'])
            sub_id=topic_subject.get(record['topic_id'])
            if sub_id is None: continue
            existing_by_subject.setdefault(sub_id,[]).append((record['id'],record['question']))
            canonical_seen.add(canonical_fingerprint(record['question'],choices))
            if record['fingerprint']:fingerprints.add(record['fingerprint'])
        for idx,raw in enumerate(payload.questions,1):
            try:
                item=clean_question(raw,subjects,topics)
                choices=json.loads(item['choices_json'])
                canon_hash=canonical_fingerprint(item['question'],choices)
                if canon_hash in canonical_seen or item['fingerprint'] in fingerprints:
                    duplicates+=1
                    continue
                sub_id=topic_subject[item['topic_id']]
                # Somente sinaliza semelhança na mesma disciplina; não bloqueia.
                match=None
                for existing_id,existing_stem in existing_by_subject.get(sub_id,[]):
                    score=resembles(item['question'],existing_stem)
                    if score is not None and (match is None or score>match[1]):
                        match=(existing_id,score,existing_stem)
                        if score==1.0: break
                fields=list(item)
                cur=db.execute(f"INSERT INTO questions({','.join(fields)}) VALUES ({','.join('?' for _ in fields)})",list(item.values()))
                inserted+=1
                canonical_seen.add(canon_hash)
                fingerprints.add(item['fingerprint'])
                existing_by_subject.setdefault(sub_id,[]).append((cur.lastrowid,item['question']))
                if match:
                    similar.append({'row':idx,'question_id':cur.lastrowid,'existing_question_id':match[0],
                                    'similarity':match[1],'existing_excerpt':match[2][:150]})
            except (ValueError,TypeError,KeyError,IndexError) as e:
                errors.append({'row':idx,'error':str(e)})
    return {'imported':inserted,'duplicates':duplicates,'similar_count':len(similar),'similar':similar[:100],
            'errors':errors[:100], 'errors_count':len(errors),
            'status':'Questões novas ficam em rascunho. Semelhanças exigem conferência humana; não foram removidas.'}


class QuestionStatus(BaseModel):
    status:str=Field(pattern='^(rascunho|revisada|anulada|arquivada)$')


@app.patch('/api/questions/{question_id}/status')
def question_status(question_id:int,body:QuestionStatus,_=Depends(authorized)):
    with conn() as db:
        old=db.execute('SELECT review_status FROM questions WHERE id=?',(question_id,)).fetchone()
        if not old:raise HTTPException(404,'Questão não encontrada')
        if body.status=='revisada':status_allowed(db,question_id)
        if old['review_status']!=body.status:
            db.execute('UPDATE questions SET review_status=? WHERE id=?',(body.status,question_id))
            audit_question(db,question_id,'situacao',{'review_status':old['review_status']},
                           {'review_status':body.status},nowstr())
    return {'ok':True}


@app.post('/api/questions/{question_id}/flashcard')
def question_card(question_id:int,_=Depends(authorized)):
    with conn() as db:
        r=db.execute('SELECT * FROM questions WHERE id=?',(question_id,)).fetchone()
        if not r: raise HTTPException(404,'Questão não encontrada')
        if r['review_status']!='revisada': raise HTTPException(400,'Revise a questão primeiro.')
        opts=json.loads(r['choices_json'])
        front='Conceito da questão: '+r['question'][:650]
        back='Resposta: '+opts[r['correct_index']]+'\nComentário: '+r['explanation']
        if db.execute('SELECT 1 FROM flashcards WHERE front=? AND topic_id=?',(front,r['topic_id'])).fetchone():
            return {'ok':True,'duplicate':True}
        db.execute('INSERT INTO flashcards(topic_id,front,back,due_at) VALUES (?,?,?,?)',(r['topic_id'],front,back,nowstr()))
    return {'ok':True,'duplicate':False}


@app.get('/api/study/recommendations')
def study_recommendations(_=Depends(authorized)):
    with conn() as db:
        rows=jrows(db.execute('''SELECT s.name subject,s.id subject_id,
          COUNT(a.id) answers,ROUND(100.0*AVG(CAST(a.correct AS REAL)),0) accuracy,
          SUM(CASE WHEN a.correct=0 THEN 1 ELSE 0 END) errors
          FROM subjects s JOIN topics t ON t.subject_id=s.id
          JOIN questions q ON q.topic_id=t.id JOIN quiz_answers a ON a.question_id=q.id
          GROUP BY s.id HAVING COUNT(a.id)>=3 ORDER BY accuracy,answers DESC LIMIT 5'''))
        due=db.execute('SELECT COUNT(*) FROM flashcards WHERE due_at<=?',(nowstr(),)).fetchone()[0]
        unseen=db.execute('''SELECT COUNT(*) FROM questions q WHERE q.review_status='revisada'
          AND NOT EXISTS(SELECT 1 FROM quiz_answers a WHERE a.question_id=q.id)''').fetchone()[0]
    return {'weak_subjects':rows,'cards_due':due,'unseen_questions':unseen,
            'note':'Prioridades estimadas; baixa amostra e peso do edital não são considerados.'}


@app.post('/api/editais/analisar')
async def analyze_edital(file:UploadFile=File(...),_=Depends(authorized)):
    from io import BytesIO
    from pypdf import PdfReader
    if file.content_type not in ('application/pdf','application/octet-stream') or not file.filename.lower().endswith('.pdf'):
        raise HTTPException(400,'Envie um PDF.')
    content=await file.read(12*1024*1024+1)
    if len(content)>12*1024*1024:raise HTTPException(413,'PDF maior que 12 MB.')
    if not content.startswith(b'%PDF-'):raise HTTPException(400,'Não parece ser um PDF válido.')
    try:
        reader=PdfReader(BytesIO(content),strict=False)
        if reader.is_encrypted:raise ValueError('PDF protegido por senha.')
        if len(reader.pages)>150:raise ValueError('Limite de 150 páginas.')
        pages=[(i+1,(p.extract_text() or '')[:40000]) for i,p in enumerate(reader.pages)]
    except Exception as e:raise HTTPException(400,f'Não foi possível ler o PDF: {str(e)[:150]}')
    corpus='\n'.join(t for _,t in pages).casefold()
    if not corpus.strip():raise HTTPException(422,'PDF sem texto selecionável. Use uma cópia digital ou OCR local.')
    from collections import Counter
    with conn() as db:
        subjects=jrows(db.execute('SELECT code,name FROM subjects ORDER BY id'))
    patterns={
       'redes':('tcp/ip','tcp ip','ipv4','dns','roteamento','redes de computadores'),
       'seguranca':('segurança da informação','criptografia','incidentes de segurança','firewall','lgpd'),
       'sistemas':('linux','windows server','sistemas operacionais','virtualização','docker'),
       'portugues':('língua portuguesa','interpretação de textos','regência verbal','concordância'),
       'governanca':('cobit','itil','governança de ti','gestão de ti','pdti'),
       'dados':('sql','banco de dados','modelagem de dados','transações'),
       'engenharia':('engenharia de software','metodologias ágeis','scrum','requisitos de software'),
       'logica':('raciocínio lógico','matrizes','probabilidade','sequências lógicas'),
    }
    # Apenas contagem textual aproximada. Não equivale à interpretação do edital.
    keywords=[]
    for label,terms in patterns.items():
        found=[w for w in terms if w in corpus]
        if found:keywords.append({'group':label,'hits':found})
    role='analista de tecnologia da informação'
    extracts=[]
    for page,text in pages:
        lower=text.casefold()
        for term in (role,'conhecimentos específicos - analista de tecnologia da informação','conteúdo programático'):
            i=lower.find(term)
            if i>=0:
                extracts.append({'page':page,'keyword':term,'excerpt':text[max(0,i-100):i+1100]})
                break
        if len(extracts)>=8:break
    return {'filename':file.filename,'pages':len(pages),'chars':len(corpus),'keyword_matches':keywords,
            'extracts':extracts,'warning':'Análise exploratória por palavras-chave. Confira as páginas e transcreva manualmente o conteúdo válido do seu cargo; não cria programa nem altera o cronograma automaticamente.'}

@app.get('/api/quiz/questions')
def get_questions(limit:int=10,subject_id:int|None=None,origin:str|None=None,board:str|None=None,
                  year:int|None=None,only_wrong:bool=False,unseen:bool=False,_=Depends(authorized)):
    limit=min(max(limit,1),40)
    clauses=["q.review_status='revisada'"]
    args=[]
    if subject_id: clauses.append('t.subject_id=?');args.append(subject_id)
    if origin in ('autoral','oficial','adaptada'): clauses.append('q.origin=?');args.append(origin)
    if board: clauses.append('q.board=?');args.append(board)
    if year: clauses.append('q.year=?');args.append(year)
    if only_wrong:
        clauses.append('EXISTS(SELECT 1 FROM quiz_answers qa WHERE qa.question_id=q.id AND qa.correct=0)')
    if unseen:
        clauses.append('NOT EXISTS(SELECT 1 FROM quiz_answers qa WHERE qa.question_id=q.id)')
    where=' AND '.join(clauses)
    with conn() as db:
        rows=jrows(db.execute(f'''SELECT q.id,q.topic_id,q.question,q.choices_json,q.origin,q.board,q.exam,q.year,
              q.source_url,q.question_number,t.title,s.name subject
              FROM questions q JOIN topics t ON q.topic_id=t.id JOIN subjects s ON t.subject_id=s.id
              WHERE {where}''',args))
        # Escolhe primeiro questões inéditas e, depois, as menos recentes.
        # Repetições continuam disponíveis quando são necessárias ao treino.
        last_seen={r['question_id']:r['last_seen'] for r in db.execute('''
            SELECT a.question_id,MAX(z.created_at) last_seen
            FROM quiz_answers a JOIN quiz_attempts z ON z.id=a.attempt_id
            GROUP BY a.question_id''')}
        random.shuffle(rows)  # desempate aleatório sem ordem fixa
        rows.sort(key=lambda row:(1 if row['id'] in last_seen else 0, last_seen.get(row['id'],'') or ''))
        selected=[]
        for strict in (True,False):
            for item in rows:
                if len(selected)>=limit:break
                if any(r['id']==item['id'] for r in selected):continue
                if strict and any(resembles(item['question'],r['question']) is not None for r in selected):continue
                selected.append(item)
            if len(selected)>=limit:break
        for item in selected:
            item['choices']=json.loads(item.pop('choices_json'))
        return selected


class SubmittedAnswer(BaseModel):
    question_id:int
    choice_index:int=Field(ge=-1,le=4)


class QuizSubmission(BaseModel):
    answers:list[SubmittedAnswer]=Field(min_length=1,max_length=40)
    duration_sec:int=Field(ge=0,le=14400)


@app.post('/api/quiz/submit')
def submit_quiz(payload:QuizSubmission,_=Depends(authorized)):
    ids=[a.question_id for a in payload.answers]
    if len(set(ids))!=len(ids):raise HTTPException(400,'Questões duplicadas')
    with conn() as db:
        qrows=db.execute('SELECT * FROM questions WHERE id IN ('+','.join('?'*len(ids))+')',ids).fetchall()
        questions={r['id']:dict(r) for r in qrows}
        if len(questions)!=len(ids): raise HTTPException(400,'Questão inválida')
        if any(q['review_status']!='revisada' for q in questions.values()):
            raise HTTPException(409,'Simulados aceitam apenas questões revisadas e liberadas.')
        results=[]; hits=0
        for a in payload.answers:
            q=questions[a.question_id]
            if a.choice_index>=len(json.loads(q['choices_json'])):
                raise HTTPException(400,'Alternativa inexistente para a questão.')
            ok=int(q['correct_index']==a.choice_index)
            hits+=ok
            results.append({'question_id':q['id'],'question':q['question'],'correct':bool(ok),
                            'your_choice':a.choice_index,'correct_index':q['correct_index'],
                            'choices':json.loads(q['choices_json']),'explanation':q['explanation'],
                            'choice_rationales':json.loads(q['choice_rationales_json'] or '{}')})
        cur=db.execute('INSERT INTO quiz_attempts(created_at,count,correct,duration_sec) VALUES (?,?,?,?)',
                       (nowstr(),len(payload.answers),hits,payload.duration_sec))
        attempt_id=cur.lastrowid
        db.executemany('INSERT INTO quiz_answers(attempt_id,question_id,choice_index,correct) VALUES (?,?,?,?)',
                       [(attempt_id,a.question_id,a.choice_index,int(questions[a.question_id]['correct_index']==a.choice_index)) for a in payload.answers])
        for a in payload.answers:
            review_question(db,a.question_id,a.choice_index==questions[a.question_id]['correct_index'],now().date())
    return {'attempt_id':attempt_id,'correct':hits,'total':len(payload.answers),'results':results}


def regenerate(db,days=14):
    """Rodízio em 3 blocos por dia, com baixa amostra penalizada suavemente.

    Plano NÃO afirma ser cálculo validado de aprovação; não substitui edital.
    """
    today=now().date()
    topics=jrows(db.execute('''SELECT t.id,t.subject_id,
      (SELECT COUNT(DISTINCT a.question_id) FROM quiz_answers a JOIN questions q ON q.id=a.question_id WHERE q.topic_id=t.id) distinct_answered,
      (SELECT AVG(CAST(a.correct AS REAL)) FROM quiz_answers a JOIN questions q ON q.id=a.question_id WHERE q.topic_id=t.id) accuracy,
      (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id AND f.due_at<=?) due_cards
      FROM topics t ORDER BY t.id''',(nowstr(),)))
    if not topics:return
    daily_minutes=db.execute('SELECT daily_minutes FROM settings WHERE id=1').fetchone()[0]
    daily_minutes=max(15,int(daily_minutes))
    review=min(25,max(5,round(daily_minutes*.15)))
    lecture=max(5,round((daily_minutes-review)*.48))
    exercises=daily_minutes-review-lecture
    # Pontuação ilustrativa: primeiro cobrir assuntos nunca resolvidos, depois erros e cartões vencidos.
    weight=[]
    for t in topics:
        answered=t['distinct_answered'] or 0
        accuracy=t['accuracy'] if t['accuracy'] is not None else .68
        priority=(1.1 if answered==0 else .6)+2.2*(1.0-accuracy)+.4*min(4,t['due_cards'] or 0)
        weight.append((priority,t))
    weight.sort(key=lambda pair:(-pair[0],pair[1]['id']))
    for d in range(days):
        date=str(today+timedelta(days=d))
        if db.execute('SELECT COUNT(*) FROM plan_items WHERE study_date=?',(date,)).fetchone()[0]:continue
        i=(d+today.toordinal())%len(weight)
        main_topic=weight[i][1]
        choices=[t for _,t in weight if t['subject_id']!=main_topic['subject_id']]
        second=choices[(d*3+today.toordinal())%len(choices)] if choices else main_topic
        due_sorted=sorted(topics,key=lambda t:(-t['due_cards'],t['id']))
        review_topic=due_sorted[(d+today.toordinal())%min(14,len(due_sorted))] if due_sorted[0]['due_cards'] else second
        slots=[(review_topic['id'],review,'revisão'),(main_topic['id'],lecture,'teoria'),(second['id'],exercises,'questões')]
        for tid,minutes,activity in slots:
            if minutes<=0:continue
            db.execute('INSERT INTO plan_items(study_date,topic_id,minutes,activity) VALUES (?,?,?,?)',
                       (date,tid,minutes,activity))


@app.get('/api/plan')
def plan(days:int=14,_=Depends(authorized)):
    days=min(max(days,1),60)
    with conn() as db:
        regenerate(db,days)
        start=str(now().date()); end=str(now().date()+timedelta(days=days-1))
        return jrows(db.execute('''SELECT p.id,p.study_date,p.minutes,p.completed,p.activity,t.title,t.id topic_id,s.name subject
          FROM plan_items p JOIN topics t ON p.topic_id=t.id JOIN subjects s ON t.subject_id=s.id
          WHERE p.study_date BETWEEN ? AND ? ORDER BY p.study_date,p.id''',(start,end)))


class PlanUpdate(BaseModel):
    completed:bool


@app.patch('/api/plan/{plan_id}')
def patch_plan(plan_id:int,data:PlanUpdate,_=Depends(authorized)):
    with conn() as db:
        cur=db.execute('UPDATE plan_items SET completed=? WHERE id=?',(int(data.completed),plan_id))
        if cur.rowcount==0:raise HTTPException(404,'Tarefa não encontrada')
    return {'ok':True}


@app.post('/api/plan/regenerate')
def regen_plan(_=Depends(authorized)):
    with conn() as db:
        db.execute('DELETE FROM plan_items WHERE study_date>=? AND completed=0',(str(now().date()),))
        regenerate(db,14)
    return {'ok':True}


class SessionPayload(BaseModel):
    topic_id:int|None=None
    minutes:int=Field(ge=1,le=600)
    mode:str=Field(pattern=r'^(foco|leitura|exercicios|revisao)$')


@app.post('/api/sessions')
def save_session(body:SessionPayload,_=Depends(authorized)):
    with conn() as db:
        if body.topic_id and not db.execute('SELECT 1 FROM topics WHERE id=?',(body.topic_id,)).fetchone():
            raise HTTPException(400,'Assunto inválido')
        db.execute('INSERT INTO sessions(created_at,topic_id,minutes,mode) VALUES (?,?,?,?)',
                   (nowstr(),body.topic_id,body.minutes,body.mode))
    return {'ok':True}


@app.get('/api/progress')
def progress(_=Depends(authorized)):
    with conn() as db:
        items=jrows(db.execute('''SELECT s.id,s.name,s.category,
          COALESCE((SELECT SUM(x.minutes) FROM sessions x JOIN topics t ON t.id=x.topic_id WHERE t.subject_id=s.id),0) minutes,
          (SELECT COUNT(*) FROM quiz_answers a JOIN questions q ON a.question_id=q.id JOIN topics t ON q.topic_id=t.id WHERE t.subject_id=s.id) answers,
          COALESCE((SELECT ROUND(AVG(CAST(a.correct AS REAL))*100,0) FROM quiz_answers a JOIN questions q ON a.question_id=q.id JOIN topics t ON q.topic_id=t.id WHERE t.subject_id=s.id),0) accuracy
          FROM subjects s ORDER BY s.id'''))
        weekly=jrows(db.execute('''SELECT substr(created_at,1,10) day,SUM(minutes) minutes
          FROM sessions GROUP BY substr(created_at,1,10) ORDER BY day DESC LIMIT 14'''))
        return {'subjects':items,'days':weekly}


class ContestUpdate(BaseModel):
    name:str=Field(min_length=3,max_length=130)
    position:str=Field(min_length=3,max_length=130)
    location:str=Field(min_length=2,max_length=120)
    salary:float|None=Field(default=None,ge=0,le=500000)
    registration_deadline:str|None=None
    url:str=Field(min_length=12,max_length=1000)
    notes:str=Field(default='',max_length=1000)
    active:bool=True
    priority:int=Field(default=3,ge=1,le=5)


def validate_contest(item:ContestUpdate):
    if item.registration_deadline:
        try:
            if datetime.strptime(item.registration_deadline,'%Y-%m-%d').strftime('%Y-%m-%d')!=item.registration_deadline:
                raise ValueError()
        except ValueError:
            raise HTTPException(400,'Data deve ser AAAA-MM-DD.')
    parsed=urlparse(item.url)
    if parsed.scheme!='https' or not parsed.hostname or parsed.username or parsed.password:
        raise HTTPException(400,'Informe um link HTTPS de fonte oficial.')
    if not parsed.hostname.endswith(('.gov.br','.edu.br','.leg.br','.jus.br','.org.br','.ufrn.br','.ufms.br')) and parsed.hostname not in ('conhecimento.fgv.br','access.selecao.net.br','selecao.net.br'):
        raise HTTPException(400,'Para monitorar, utilize fonte oficial ou banca incluída na lista de domínios permitidos.')
    return item


@app.post('/api/contests')
def new_contest(item:ContestUpdate,_=Depends(authorized)):
    validate_contest(item)
    with conn() as db:
        cur=db.execute('''INSERT INTO contests(name,position,location,salary,registration_deadline,url,notes,active,priority,verified_at)
          VALUES (?,?,?,?,?,?,?,?,?,?)''',
          (item.name,item.position,item.location,item.salary,item.registration_deadline,item.url,
           item.notes,int(item.active),item.priority,None))
        return {'id':cur.lastrowid,'ok':True}


@app.patch('/api/contests/{contest_id}')
def edit_contest(contest_id:int,item:ContestUpdate,_=Depends(authorized)):
    validate_contest(item)
    with conn() as db:
        old=db.execute('SELECT url FROM contests WHERE id=?',(contest_id,)).fetchone()
        if not old:raise HTTPException(404,'Concurso não encontrado.')
        changed=(old['url']!=item.url)
        db.execute('''UPDATE contests SET name=?,position=?,location=?,salary=?,registration_deadline=?,url=?,notes=?,
          active=?,priority=?,last_fingerprint=CASE WHEN ? THEN NULL ELSE last_fingerprint END,
          changed=CASE WHEN ? THEN 0 ELSE changed END,
          verified_at=? WHERE id=?''',
          (item.name,item.position,item.location,item.salary,item.registration_deadline,item.url,item.notes,
           int(item.active),item.priority,int(changed),int(changed),nowstr(),contest_id))
    return {'ok':True}


@app.get('/api/contests')
def contests(_=Depends(authorized)):
    with conn() as db:
        return jrows(db.execute('SELECT * FROM contests ORDER BY priority,id'))


def is_safe_url(url):
    parsed=urlparse(url)
    host=(parsed.hostname or '').lower()
    allowed=host.endswith(('.gov.br','.edu.br','.leg.br','.jus.br','.org.br','.ufrn.br','.ufms.br')) or host in ('conhecimento.fgv.br','access.selecao.net.br','selecao.net.br')
    if parsed.scheme!='https' or not allowed or parsed.port not in (None,443):
        raise ValueError('A fonte precisa ser HTTPS e de domínio oficial ou banca autorizada.')
    for info in socket.getaddrinfo(host,443,type=socket.SOCK_STREAM):
        ip=ipaddress.ip_address(info[4][0])
        if not ip.is_global:raise ValueError('Endereço interno/reservado não permitido.')
    return url


def monitor_one(contest_id):
    with conn() as db:
        row=db.execute('SELECT * FROM contests WHERE id=?',(contest_id,)).fetchone()
    if not row:raise ValueError('Concurso não encontrado.')
    tstamp=nowstr()
    try:
        url=is_safe_url(row['url'])
        resp=requests.get(url,headers={'User-Agent':'EstudaTI/0.1 (+monitor pessoal de fontes públicas)'},
                          timeout=(5,12),allow_redirects=False,stream=True)
        with resp:
            if resp.status_code in (301,302,303,307,308):raise ValueError('Fonte redirecionou: confira o endereço oficial.')
            if resp.status_code!=200:raise ValueError(f'HTTP {resp.status_code}')
            content=b''
            for chunk in resp.iter_content(chunk_size=32768):
                content+=chunk
                if len(content)>6*1024*1024:raise ValueError('Página superior a 6 MB; verificação interrompida.')
            digest=hashlib.sha256(content).hexdigest()
        prev=row['last_fingerprint']
        changed=1 if prev and prev!=digest else 0
        with conn() as db:
            db.execute('UPDATE contests SET last_checked_at=?,last_fingerprint=?,changed=?,last_error=NULL,last_http_status=200 WHERE id=?',
                       (tstamp,digest,changed,contest_id))
        return {'ok':True,'changed':bool(changed),'first_check':not bool(prev),'checked_at':tstamp}
    except Exception as e:
        with conn() as db:
            db.execute('UPDATE contests SET last_checked_at=?,last_error=?,last_http_status=NULL WHERE id=?',
                       (tstamp,str(e)[:220],contest_id))
        return {'ok':False,'error':str(e)[:220],'checked_at':tstamp}


@app.post('/api/contests/{contest_id}/check')
def check_contest(contest_id:int,_=Depends(authorized)):
    return monitor_one(contest_id)


@app.post('/api/contests/{contest_id}/ack')
def acknowledge(contest_id:int,_=Depends(authorized)):
    with conn() as db:
        db.execute('UPDATE contests SET changed=0 WHERE id=?',(contest_id,))
    return {'ok':True}


@app.get('/api/settings')
def settings(_=Depends(authorized)):
    with conn() as db:return dict(db.execute('SELECT * FROM settings WHERE id=1').fetchone())


class SettingsPayload(BaseModel):
    daily_minutes:int=Field(ge=15,le=360)


@app.patch('/api/settings')
def save_settings(body:SettingsPayload,_=Depends(authorized)):
    with conn() as db:db.execute('UPDATE settings SET daily_minutes=? WHERE id=1',(body.daily_minutes,))
    return {'ok':True}


@app.get('/api/export')
def export_data(_=Depends(authorized)):
    with conn() as db:
        tables=('subjects','topics','flashcards','questions','quiz_attempts','quiz_answers','sessions','plan_items','contests','settings','lesson_progress','lesson_meta','subject_weights','question_reviews','recall_checks','discursive_questions','discursive_attempts','syllabus_items','question_quality','question_audit')
        data={t:jrows(db.execute('SELECT * FROM '+t)) for t in tables}
    return {'exported_at':nowstr(),'version':'1.3.0','data':data}


@app.get('/api/resources')
def resources(category:str='',_=Depends(authorized)):
    rows=[r for r in RESOURCES if not category or r['category']==category]
    return {'items':rows,'categories':sorted(set(r['category'] for r in RESOURCES)),
            'note':'Fontes externas: verifique datas, versões, licenças e eventuais mudanças. Nenhum conteúdo externo é copiado automaticamente.'}


@app.get('/api/study/mastery')
def mastery(_=Depends(authorized)):
    # Questões distintas respondidas: evita confundir repetir uma questão com domínio real.
    with conn() as db:
        rows=jrows(db.execute('''SELECT t.id,t.title,s.name subject,s.code,
          COUNT(DISTINCT q.id) question_count,
          COUNT(DISTINCT a.question_id) attempted,
          COUNT(DISTINCT CASE WHEN a.correct=1 THEN a.question_id END) solved_at_least_once,
          COUNT(DISTINCT CASE WHEN a.correct=0 THEN a.question_id END) missed_at_least_once,
          COALESCE(ROUND(100.0*AVG(CAST(a.correct AS REAL)),1),0) accuracy,
          (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id AND f.due_at<=?) cards_due
          FROM topics t JOIN subjects s ON s.id=t.subject_id
          LEFT JOIN questions q ON q.topic_id=t.id
          LEFT JOIN quiz_answers a ON a.question_id=q.id
          GROUP BY t.id ORDER BY s.id,t.id''',(nowstr(),)))
        coverage=jrows(db.execute('''SELECT s.name subject,s.code,COUNT(DISTINCT t.id) topics,
           COUNT(DISTINCT a.question_id) attempted_questions,COUNT(DISTINCT q.id) question_count
           FROM subjects s JOIN topics t ON t.subject_id=s.id
           LEFT JOIN questions q ON q.topic_id=t.id
           LEFT JOIN quiz_answers a ON a.question_id=q.id
           GROUP BY s.id ORDER BY s.id'''))
    for x in rows:
        n=x['attempted'];x['status']='não iniciado' if n==0 else ('em observação' if n<4 else
            ('precisa revisar' if x['accuracy']<65 else ('praticando' if x['accuracy']<85 else 'bom desempenho')))
    return {'topics':rows,'subjects':coverage,
            'warning':'Classificação indicativa. O domínio não é inferido com segurança apenas por acertos repetidos; novas questões e revisões são necessárias.'}


@app.post('/api/provas/extrair')
async def extract_exam_pdf(file:UploadFile=File(...),_=Depends(authorized)):
    from pdf_import import extract_candidates
    if not file.filename or not file.filename.lower().endswith('.pdf'):
        raise HTTPException(400,'Envie um PDF de prova.')
    raw=await file.read(12*1024*1024+1)
    if len(raw)>12*1024*1024:raise HTTPException(413,'Limite de 12 MB por PDF.')
    try:return extract_candidates(raw)
    except Exception as e:raise HTTPException(422,str(e)[:300])


def monitor_loop():
    # Repete a cada 24 horas. Verificação ocorre apenas após inicialização do serviço.
    while not stop_monitor.wait(15):
        try:
            with conn() as db:
                rows=jrows(db.execute('SELECT id,last_checked_at FROM contests WHERE active=1'))
            for row in rows:
                if stop_monitor.is_set():return
                try:
                    stamp=datetime.fromisoformat(row['last_checked_at']) if row['last_checked_at'] else None
                    if stamp is None or now()-stamp>timedelta(hours=24):monitor_one(row['id'])
                except Exception:pass
        except Exception:pass
        if stop_monitor.wait(24*3600):return


register_learning_routes(app,authorized,conn,now,nowstr)
register_discursive(app,authorized,conn,nowstr)
register_quality(app,authorized,conn,nowstr)
register_syllabus(app,authorized,conn,nowstr)

@app.on_event('startup')
def startup():
    # Neon remoto pode demorar no primeiro seed. Nao bloquear a porta Render.
    def initialize():
        try:
            init_db()
        except Exception as exc:
            boot_status['state']='error'
            # Nunca logar DATABASE_URL, senhas ou mensagem com DSN.
            print('Falha na inicializacao do banco:', type(exc).__name__, flush=True)
            return
        if ENABLE_MONITOR:
            thread=threading.Thread(target=monitor_loop,daemon=True,name='monitor-fontes')
            thread.start()
    threading.Thread(target=initialize,daemon=True,name='seed-inicial').start()


@app.on_event('shutdown')
def shutdown():
    stop_monitor.set()
