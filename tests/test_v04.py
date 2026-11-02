"""Testes do curso por disciplina e progresso, incluindo migração sem apagar histórico."""
from test_workflow import client_for


def test_new_lessons_progress_notes_and_handbooks(tmp_path):
    c=client_for(tmp_path)
    lessons=c.get('/api/study/lessons').json()
    assert len(lessons)==169
    assert len({l['code'] for l in lessons})==9
    target=lessons[0]
    one=c.get(f"/api/study/lessons/{target['id']}").json()
    assert one['completed']==0 and one['notes']==''
    assert one['questions'] and 'correct_index' not in one['questions'][0]
    assert c.patch(f"/api/study/lessons/{target['id']}",json={'completed':True,'notes':'Rever CIDR /26'}).status_code==200
    reread=c.get(f"/api/study/lessons/{target['id']}").json()
    assert reread['completed']==1 and reread['notes']=='Rever CIDR /26'
    assert c.get(f"/api/study/handbooks/{target['code']}").json()['chapters']
    assert c.get('/api/study/handbooks/NENHUMA').status_code==404
    exp=c.get('/api/export').json()
    assert len(exp['data']['lesson_progress'])==1
    import main
    with main.conn() as db:
        main.init_db()
        row=db.execute('SELECT completed,notes FROM lesson_progress WHERE topic_id=?',(target['id'],)).fetchone()
        assert row['completed']==1 and row['notes']=='Rever CIDR /26'


def test_validation_and_auth(tmp_path):
    c=client_for(tmp_path)
    assert c.patch('/api/study/lessons/999999',json={'completed':True}).status_code==404
    assert c.patch('/api/study/lessons/1',json={}).status_code==400
    assert c.patch('/api/study/lessons/1',json={'notes':'x'*10001}).status_code==422
    c.post('/api/logout')
    assert c.get('/api/study/lessons').status_code==401
