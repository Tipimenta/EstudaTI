"""EstudaTI — motor transparente de prioridades, avaliações e revisão de questões.
Não é um modelo validado de previsão de aprovação; oferece explicações auditáveis.
"""
import math
from datetime import date,datetime,timedelta
from collections import defaultdict
from question_diversity import resembles

DEFAULT_WEIGHTS={'RED':5,'SEG':5,'SO':5,'POR':4,'GOV':4,'BD':4,'ENG':4,'LOG':3,'LEG':3}


def setup(db):
    db.executescript('''
    CREATE TABLE IF NOT EXISTS subject_weights (
        subject_id INTEGER PRIMARY KEY REFERENCES subjects(id), weight INTEGER NOT NULL DEFAULT 3 CHECK(weight BETWEEN 1 AND 5));
    CREATE TABLE IF NOT EXISTS question_reviews (
        question_id INTEGER PRIMARY KEY REFERENCES questions(id), due_date TEXT NOT NULL,
        interval_days INTEGER NOT NULL DEFAULT 0, ease REAL NOT NULL DEFAULT 2.5,
        reps INTEGER NOT NULL DEFAULT 0, last_correct INTEGER NOT NULL DEFAULT 0,
        last_review TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS recall_checks (
        id INTEGER PRIMARY KEY, topic_id INTEGER NOT NULL REFERENCES topics(id),
        prompt TEXT NOT NULL, self_score INTEGER NOT NULL CHECK(self_score BETWEEN 0 AND 3),
        reflection TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS ix_recall_topic ON recall_checks(topic_id,created_at);
    CREATE INDEX IF NOT EXISTS ix_question_reviews_due ON question_reviews(due_date);
    ''')
    for row in db.execute('SELECT id,code FROM subjects').fetchall():
        db.execute('INSERT OR IGNORE INTO subject_weights(subject_id,weight) VALUES (?,?)',
                   (row['id'], DEFAULT_WEIGHTS.get(row['code'],3)))


def review_question(db, qid, correct, today):
    old=db.execute('SELECT * FROM question_reviews WHERE question_id=?',(qid,)).fetchone()
    reps = int(old['reps']) if old else 0
    interval = int(old['interval_days']) if old else 0
    ease = float(old['ease']) if old else 2.5
    if not correct:
        reps=0; interval=1; ease=max(1.3,ease-.2)
    else:
        interval=1 if reps==0 else 3 if reps==1 else max(4, round(interval*ease))
        reps+=1; ease=min(3.0,ease+.04)
    due=str(today+timedelta(days=interval))
    db.execute('''INSERT INTO question_reviews(question_id,due_date,interval_days,ease,reps,last_correct,last_review)
                  VALUES(?,?,?,?,?,?,?) ON CONFLICT(question_id) DO UPDATE SET
                  due_date=excluded.due_date,interval_days=excluded.interval_days,ease=excluded.ease,
                  reps=excluded.reps,last_correct=excluded.last_correct,last_review=excluded.last_review''',
               (qid,due,interval,ease,reps,int(bool(correct)),str(today)))


def get_overview(db, today:date):
    weights={r['subject_id']:r['weight'] for r in db.execute('SELECT * FROM subject_weights')}
    rows=db.execute('''SELECT t.id,t.subject_id,t.title,t.minutes,s.name subject,s.code,
             COALESCE(lp.completed,0) completed,COALESCE(lm.track,'Introdução') track,
             (SELECT COUNT(*) FROM questions q WHERE q.topic_id=t.id AND q.review_status='revisada') question_count,
             (SELECT COUNT(*) FROM flashcards f WHERE f.topic_id=t.id AND substr(f.due_at,1,10)<=?) due_cards,
             (SELECT COUNT(*) FROM question_reviews r JOIN questions q ON q.id=r.question_id
               WHERE q.topic_id=t.id AND r.due_date<=?) due_questions
             FROM topics t JOIN subjects s ON s.id=t.subject_id
             LEFT JOIN lesson_progress lp ON lp.topic_id=t.id
             LEFT JOIN lesson_meta lm ON lm.topic_id=t.id
             ORDER BY t.id''',(str(today),str(today))).fetchall()
    # Pontuar a última resposta para cada questão, evitando inflar domínio por repetição.
    latest=db.execute('''SELECT q.topic_id, a.question_id, a.correct, z.created_at
        FROM quiz_answers a JOIN questions q ON q.id=a.question_id
        JOIN quiz_attempts z ON z.id=a.attempt_id
        WHERE a.id IN (SELECT MAX(qa.id) FROM quiz_answers qa GROUP BY qa.question_id)''').fetchall()
    attempts=defaultdict(list)
    for a in latest: attempts[a['topic_id']].append(dict(a))
    recalls=db.execute('''SELECT topic_id,self_score FROM recall_checks WHERE id IN
        (SELECT MAX(id) FROM recall_checks GROUP BY topic_id)''').fetchall()
    recall_map={r['topic_id']:r['self_score'] for r in recalls}
    topics=[]
    for r in rows:
        t=dict(r); ans=attempts.get(t['id'],[]); n=len(ans); hits=sum(x['correct'] for x in ans)
        # Posterior simples Beta(1,1), não um percentual de aprovação.
        smoothed=round(100*(hits+1)/(n+2))
        observed=round(100*hits/n) if n else None
        review=int(t['due_questions'] or 0); cards=int(t['due_cards'] or 0)
        weight=int(weights.get(t['subject_id'],3))
        # Tratamento conservador de assuntos sem questões: não os marque como dominados.
        uncertainty=1/(math.sqrt(1+n))
        priority=round(100*(0.34*(1-smoothed/100)+0.24*uncertainty+
                   0.14*min(1,cards/4)+0.15*min(1,review/3)+
                   0.13*(weight/5)),1)
        if not t['completed']: priority+=8
        if recall_map.get(t['id'])==0:priority+=10
        if recall_map.get(t['id'])==1:priority+=5
        t.update(n=n,correct=hits,accuracy=observed,estimate=smoothed,
                 weight=weight,priority=min(100,round(priority,1)),
                 recall_score=recall_map.get(t['id']),fresh=n<5,
                 due_question_count=review,due_card_count=cards)
        if n==0:reason='Ainda não avaliado: comece com a aula e questões inéditas.'
        elif review:reason=f'{review} questão(ões) chegaram à revisão espaçada.'
        elif observed is not None and observed<70:reason=f'Acertos recentes por questão distinta: {observed}%.'
        elif not t['completed']:reason='Você ainda não concluiu a aula.'
        else:reason='Manutenção do domínio com exercícios inéditos.'
        t['reason']=reason
        topics.append(t)
    topics.sort(key=lambda x:(-x['priority'],x['id']))
    by_subject=[]
    for sid in sorted(set(t['subject_id'] for t in topics)):
        subset=[t for t in topics if t['subject_id']==sid]
        total=sum(t['n'] for t in subset);hits=sum(t['correct'] for t in subset)
        by_subject.append({'subject_id':sid,'code':subset[0]['code'],'subject':subset[0]['subject'],
                           'weight':weights.get(sid,3),'lessons':len(subset),
                           'completed':sum(t['completed'] for t in subset),
                           'unique_questions':total,'correct':hits,
                           'accuracy':round(100*hits/total) if total else None,
                           'due_cards':sum(t['due_card_count'] for t in subset),
                           'due_questions':sum(t['due_question_count'] for t in subset)})
    return {'as_of':str(today),'subjects':by_subject,'topics':topics,
            'total_review_questions':sum(t['due_question_count'] for t in topics),
            'disclaimer':'Prioridade heurística baseada em pesos definidos por você, última resposta por questão, revisões e cobertura. Não prevê probabilidade de aprovação. Com menos de cinco questões distintas, a amostra é insuficiente para estimar domínio.'}


def smart_quiz(db,limit:int,subject_id:int|None=None,seed:int|None=None):
    """Prefere revisões vencidas, questões inéditas, e só depois questões repetidas."""
    import random
    rand=random.Random(seed)
    rows=[dict(r) for r in db.execute('''SELECT q.id,q.topic_id,q.question,q.choices_json,q.origin,q.board,q.exam,q.year,
             q.source_url,q.question_number,t.title,s.name subject,t.subject_id,
             CASE WHEN qr.due_date<=date('now') THEN 1 ELSE 0 END due,
             (SELECT COUNT(*) FROM quiz_answers a WHERE a.question_id=q.id) repeats
             FROM questions q JOIN topics t ON t.id=q.topic_id JOIN subjects s ON s.id=t.subject_id
             LEFT JOIN question_reviews qr ON qr.question_id=q.id
             WHERE q.review_status='revisada' AND (? IS NULL OR t.subject_id=?)''',(subject_id,subject_id))]
    # Evita excesso da mesma aula e não reproduz a mesma ordem em cada sessão.
    rand.shuffle(rows)
    rows.sort(key=lambda r:(0 if r['due'] else 1 if r['repeats']==0 else 2,r['repeats']))
    chosen=[]; seen_topics={}
    # Primeira passagem: evita repetir um enunciado quase igual dentro da mesma prova.
    # Segunda: se o acervo não oferecer variedade suficiente, completa sem repetir IDs.
    for strict in (True,False):
        for row in rows:
            if len(chosen)>=limit:break
            if any(p['id']==row['id'] for p in chosen):continue
            if strict and seen_topics.get(row['topic_id'],0)>=3 and len(rows)>limit:continue
            if strict and any(resembles(row['question'],p['question']) is not None for p in chosen):continue
            if not strict and len(rows)>limit and seen_topics.get(row['topic_id'],0)>=5:continue
            seen_topics[row['topic_id']]=seen_topics.get(row['topic_id'],0)+1
            item=dict(row)
            item['choices']=__import__('json').loads(item.pop('choices_json'))
            item.pop('subject_id',None);item.pop('due',None);item.pop('repeats',None)
            chosen.append(item)
        if len(chosen)>=limit:break
    return chosen
