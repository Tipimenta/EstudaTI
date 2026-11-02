"""Teste adicional da migração inteligente, revisões e tutor sem IA."""
from test_workflow import client_for

def test_intelligence_migration_and_quiz(tmp_path):
    c=client_for(tmp_path)
    ov=c.get('/api/intelligence/overview')
    assert ov.status_code==200
    data=ov.json()
    assert len(data['subjects'])==9 and len(data['topics'])==169
    assert len(c.get('/api/intelligence/quiz?limit=20').json())==20
    assert c.patch('/api/intelligence/weights/1',json={'weight':9}).status_code==422
    assert c.patch('/api/intelligence/weights/1',json={'weight':3}).status_code==200
    assert c.get('/api/intelligence/plan').json()['tasks']
    import main
    with main.conn() as db:
        row=db.execute("SELECT id,correct_index FROM questions WHERE review_status='revisada' LIMIT 1").fetchone()
        qid=row['id'];correct=row['correct_index']
    res=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':correct}],'duration_sec':12})
    assert res.status_code==200
    with main.conn() as db:
        review=db.execute('SELECT * FROM question_reviews WHERE question_id=?',(qid,)).fetchone()
        assert review['reps']==1 and review['interval_days']==1
    data=c.get('/api/intelligence/overview').json()
    assert any(x['n'] for x in data['topics'])
    main.init_db() # idempotente e sem perda
    with main.conn() as db:assert db.execute('SELECT COUNT(*) FROM question_reviews').fetchone()[0]>=1


def test_local_tutor_and_recall(tmp_path):
    c=client_for(tmp_path)
    tid=c.get('/api/study/lessons').json()[0]['id']
    status=c.get('/api/ai/status').json()
    assert status['enabled'] is False
    t=c.post('/api/ai/tutor',json={'topic_id':tid,'question':'Como resolver uma questão desta matéria?','mode':'explicar'})
    assert t.status_code==200 and t.json()['enabled'] is False
    assert 'sem IA externa' in t.json()['answer'] or 'IA externa desativada' in t.json()['answer']
    r=c.post('/api/learning/recall',json={'topic_id':tid,'prompt':'Explicar o conteúdo sem consultar','self_score':1,'reflection':'Preciso revisar o conceito'});
    assert r.status_code==200
    assert c.get(f'/api/learning/recall/{tid}').json()[0]['self_score']==1
    exp=c.get('/api/export').json()['data']
    assert 'question_reviews' in exp and 'recall_checks' in exp and 'subject_weights' in exp
