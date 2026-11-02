"""Matriz de edital manual e rastreável: vínculo explícito, sem inventar tópicos."""
from __future__ import annotations
from fastapi import Depends,HTTPException
from pydantic import BaseModel,Field
from typing import Optional


def setup(db):
    db.executescript('''
    CREATE TABLE IF NOT EXISTS syllabus_items (
      id INTEGER PRIMARY KEY, contest_id INTEGER NOT NULL REFERENCES contests(id),
      subject_id INTEGER NOT NULL REFERENCES subjects(id),
      lesson_id INTEGER REFERENCES topics(id),
      name TEXT NOT NULL, section_ref TEXT NOT NULL DEFAULT '',
      importance INTEGER NOT NULL DEFAULT 3 CHECK(importance BETWEEN 1 AND 5),
      confirmed INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS ix_syllabus_contest ON syllabus_items(contest_id,subject_id);
    ''')

class SyllabusCreate(BaseModel):
    contest_id:int=Field(ge=1)
    subject_code:str=Field(min_length=2,max_length=8)
    lesson_id:Optional[int]=Field(default=None,ge=1)
    name:str=Field(min_length=4,max_length=240)
    section_ref:str=Field(default='',max_length=120)
    importance:int=Field(default=3,ge=1,le=5)
    confirmed:bool=False

class SyllabusUpdate(BaseModel):
    importance:Optional[int]=Field(default=None,ge=1,le=5)
    confirmed:Optional[bool]=None
    lesson_id:Optional[int]=Field(default=None,ge=1)
    section_ref:Optional[str]=Field(default=None,max_length=120)

def register(app,authorized,conn,nowstr):
    @app.get('/api/syllabus')
    def get_syllabus(contest_id:int,_=Depends(authorized)):
        with conn() as db:
            if not db.execute('SELECT 1 FROM contests WHERE id=?',(contest_id,)).fetchone():
                raise HTTPException(404,'Concurso não encontrado.')
            rows=db.execute('''SELECT y.*,s.code,s.name subject,t.title lesson_title,
              COALESCE(lp.completed,0) lesson_completed,
              (SELECT COUNT(DISTINCT qa.question_id) FROM quiz_answers qa
                 JOIN questions q ON q.id=qa.question_id
                 WHERE q.topic_id=y.lesson_id) distinct_questions,
              (SELECT CAST(SUM(z.correct) AS REAL)/COUNT(*) FROM
               (SELECT a.question_id,MAX(a.id) latest_id FROM quiz_answers a GROUP BY a.question_id) last
               JOIN quiz_answers z ON z.id=last.latest_id JOIN questions q2 ON q2.id=z.question_id
               WHERE q2.topic_id=y.lesson_id) latest_accuracy
              FROM syllabus_items y JOIN subjects s ON s.id=y.subject_id
              LEFT JOIN topics t ON t.id=y.lesson_id
              LEFT JOIN lesson_progress lp ON lp.topic_id=y.lesson_id
              WHERE y.contest_id=? ORDER BY y.confirmed DESC,y.importance DESC,y.id DESC''',(contest_id,)).fetchall()
            items=[]
            for row in rows:
                it=dict(row)
                it['latest_accuracy']=round(100*it['latest_accuracy']) if it['latest_accuracy'] is not None else None
                if not it['confirmed']:it['stage']='pendente_de_conferencia'
                elif not it['lesson_id']:it['stage']='sem_aula_vinculada'
                elif not it['lesson_completed']:it['stage']='aula_pendente'
                elif it['distinct_questions']<5:it['stage']='poucas_questoes'
                elif it['latest_accuracy'] is not None and it['latest_accuracy']<75:it['stage']='reforcar'
                else:it['stage']='praticado'
                items.append(it)
            return {'contest_id':contest_id,'items':items,
                    'summary':{'total':len(items),'confirmed':sum(bool(x['confirmed']) for x in items),
                               'linked':sum(bool(x['lesson_id']) for x in items),
                               'practiced':sum(x['stage']=='praticado' for x in items)},
                    'disclaimer':'Matriz preenchida manualmente: não atesta cobertura integral do edital nem prevê aprovação. O indicador usa última resposta por questão distinta.'}

    @app.post('/api/syllabus')
    def add_item(payload:SyllabusCreate,_=Depends(authorized)):
        with conn() as db:
            if not db.execute('SELECT 1 FROM contests WHERE id=?',(payload.contest_id,)).fetchone():
                raise HTTPException(404,'Concurso não encontrado.')
            subject=db.execute('SELECT id FROM subjects WHERE code=?',(payload.subject_code.upper(),)).fetchone()
            if not subject:raise HTTPException(422,'Disciplina inválida.')
            if payload.lesson_id is not None:
                lesson=db.execute('SELECT subject_id FROM topics WHERE id=?',(payload.lesson_id,)).fetchone()
                if not lesson or lesson['subject_id']!=subject['id']:
                    raise HTTPException(422,'A aula deve pertencer à mesma disciplina do tópico.')
            name=payload.name.strip()
            if len(name)<4:raise HTTPException(422,'Tópico precisa de nome.')
            dup=db.execute('''SELECT id FROM syllabus_items WHERE contest_id=? AND subject_id=?
                 AND lower(trim(name))=lower(?)''',(payload.contest_id,subject['id'],name)).fetchone()
            if dup:raise HTTPException(409,'Esse tópico já está cadastrado para o concurso e disciplina.')
            cur=db.execute('''INSERT INTO syllabus_items(contest_id,subject_id,lesson_id,name,section_ref,
                       importance,confirmed,updated_at) VALUES(?,?,?,?,?,?,?,?)''',
                       (payload.contest_id,subject['id'],payload.lesson_id,name,payload.section_ref.strip(),
                        payload.importance,int(payload.confirmed),nowstr()))
            return {'id':cur.lastrowid,'ok':True}

    @app.patch('/api/syllabus/{item_id}')
    def update_item(item_id:int,payload:SyllabusUpdate,_=Depends(authorized)):
        values=payload.model_dump(exclude_unset=True)
        if not values:raise HTTPException(422,'Nenhuma alteração enviada.')
        with conn() as db:
            old=db.execute('SELECT * FROM syllabus_items WHERE id=?',(item_id,)).fetchone()
            if not old:raise HTTPException(404,'Tópico não encontrado.')
            if 'lesson_id' in values and values['lesson_id'] is not None:
                t=db.execute('SELECT subject_id FROM topics WHERE id=?',(values['lesson_id'],)).fetchone()
                if not t or t['subject_id']!=old['subject_id']:
                    raise HTTPException(422,'Aula não pertence à disciplina.')
            if 'confirmed' in values:values['confirmed']=int(values['confirmed'])
            if 'section_ref' in values:values['section_ref']=values['section_ref'].strip()
            values['updated_at']=nowstr()
            pairs=list(values.items())
            db.execute('UPDATE syllabus_items SET '+','.join(k+'=?' for k,v in pairs)+' WHERE id=?',
                       [v for k,v in pairs]+[item_id])
            return {'ok':True}

    @app.delete('/api/syllabus/{item_id}')
    def delete_item(item_id:int,_=Depends(authorized)):
        with conn() as db:
            r=db.execute('DELETE FROM syllabus_items WHERE id=?',(item_id,))
            if not r.rowcount:raise HTTPException(404,'Tópico não encontrado.')
            return {'ok':True,'note':'Removido somente da matriz. Aulas e histórico de estudo continuam intactos.'}
