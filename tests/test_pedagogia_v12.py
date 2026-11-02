"""Integração e regressão das 18 oficinas de transferência."""
from test_workflow import client_for


def test_9_materias_18_oficinas_36_questoes(tmp_path):
    c=client_for(tmp_path)
    lessons=c.get('/api/study/lessons').json()
    assert len(lessons)==169
    cases=[x for x in lessons if x['track']=='Oficina de prova']
    assert len(cases)==18
    assert {x['code'] for x in cases}=={'RED','SEG','SO','POR','GOV','BD','ENG','LOG','LEG'}
    assert all(sum(x['code']==code for x in cases)==2 for code in {x['code'] for x in cases})
    for lesson in cases:
        detail=c.get(f"/api/study/lessons/{lesson['id']}").json()
        assert len(detail['content'].split())>=280
        assert all(term in detail['content'] for term in ('##','# Caso'))
        assert detail['source_url'].startswith('https://')
        assert 2<=len(detail['questions'])<=3
        assert all('correct_index' not in x for x in detail['questions'])
    assert c.get('/api/dashboard').json()['question_count']==321


def test_conserva_anotacoes_respostas_e_nao_duplica_migracao(tmp_path):
    c=client_for(tmp_path)
    lessons=c.get('/api/study/lessons').json()
    intro=next(x for x in lessons if x['track']=='Introdução')
    assert c.patch(f"/api/study/lessons/{intro['id']}",json={'completed':True,'notes':'Meu registro anterior'}).status_code==200
    case=next(x for x in lessons if x['track']=='Oficina de prova')
    q=c.get(f"/api/study/lessons/{case['id']}").json()['questions'][0]
    assert c.post('/api/quiz/submit',json={'answers':[{'question_id':q['id'],'choice_index':0}],'duration_sec':12}).status_code==200
    import main
    with main.conn() as db:
        before={name:db.execute(f'SELECT COUNT(*) FROM {name}').fetchone()[0]
                for name in ('topics','flashcards','questions','quiz_answers','lesson_progress')}
    main.init_db()
    with main.conn() as db:
        after={name:db.execute(f'SELECT COUNT(*) FROM {name}').fetchone()[0]
               for name in ('topics','flashcards','questions','quiz_answers','lesson_progress')}
        row=db.execute('SELECT completed,notes FROM lesson_progress WHERE topic_id=?',(intro['id'],)).fetchone()
    assert before==after
    assert row['completed']==1 and row['notes']=='Meu registro anterior'
