"""Testes da ampliação autoral, segurança do gabarito e preservação de dados."""
from test_workflow import client_for


def test_deep_course_rich_content_and_questions(tmp_path):
    c=client_for(tmp_path)
    lessons=c.get('/api/study/lessons').json()
    deep=[x for x in lessons if x['track']=='Aprofundamento']
    assert len(deep)==61
    assert len({x['code'] for x in deep})==9
    assert all(x['minutes']>=50 for x in deep)
    assert len([x for x in deep if x['title'].startswith('[Aprofundamento]')])==27
    for lesson in deep:
        item=c.get(f"/api/study/lessons/{lesson['id']}").json()
        assert len(item['content'])>850
        assert ('Exemplo resolvido' in item['content'] and 'Erros clássicos' in item['content']) if lesson['title'].startswith('[Aprofundamento]') else 'CASO PRÁTICO' in item['content']
        assert item['source_url'].startswith('https://')
        assert 1<=len(item['questions'])<=2
        assert all('correct_index' not in q for q in item['questions'])
    assert c.get('/api/dashboard').json()['question_count']==321
    assert c.get('/api/export').json()['data']['lesson_meta']


def test_migration_does_not_duplicate_or_lose_progress(tmp_path):
    c=client_for(tmp_path)
    intro=next(x for x in c.get('/api/study/lessons').json() if x['track']=='Introdução')
    deep=next(x for x in c.get('/api/study/lessons').json() if x['track']=='Aprofundamento')
    assert c.patch(f"/api/study/lessons/{intro['id']}",json={'completed':True,'notes':'Minha anotação anterior'}).status_code==200
    assert c.patch(f"/api/study/lessons/{deep['id']}",json={'completed':True,'notes':'Nova anotação'}).status_code==200
    import main
    with main.conn() as db:
        before=(db.execute('select count(*) from topics').fetchone()[0],db.execute('select count(*) from questions').fetchone()[0],db.execute('select count(*) from flashcards').fetchone()[0])
    main.init_db()
    with main.conn() as db:
        after=(db.execute('select count(*) from topics').fetchone()[0],db.execute('select count(*) from questions').fetchone()[0],db.execute('select count(*) from flashcards').fetchone()[0])
    assert before==after
    assert c.get(f"/api/study/lessons/{intro['id']}").json()['notes']=='Minha anotação anterior'
    assert c.get(f"/api/study/lessons/{deep['id']}").json()['notes']=='Nova anotação'


def test_deep_quiz_randomized_answer_and_wrong_history(tmp_path):
    c=client_for(tmp_path)
    deep=next(x for x in c.get('/api/study/lessons').json() if x['track']=='Aprofundamento')
    item=c.get(f"/api/study/lessons/{deep['id']}").json()
    qid=item['questions'][0]['id']
    import main
    with main.conn() as db:
        correct=db.execute('SELECT correct_index FROM questions WHERE id=?',(qid,)).fetchone()['correct_index']
    correct_result=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':correct}],'duration_sec':45})
    assert correct_result.status_code==200 and correct_result.json()['correct']==1
    # Errar também deve manter o histórico, sem afetar notas e progresso.
    wrong=(correct+1)%4
    incorrect_result=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':wrong}],'duration_sec':45})
    assert incorrect_result.status_code==200 and incorrect_result.json()['correct']==0
    assert any(x['id']==qid for x in c.get('/api/quiz/questions?only_wrong=true&limit=100').json())
