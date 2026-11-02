"""Regressões de qualidade: arquivamento idempotente das cópias autorais."""
from test_workflow import client_for

def test_identical_authored_questions_archived_without_erasing_history(tmp_path):
    client=client_for(tmp_path)
    import main
    with main.conn() as db:
        rows=db.execute('''SELECT id,review_status FROM questions
                   WHERE question='Qual afirmação sobre consentimento na LGPD está correta?'
                   ORDER BY id''').fetchall()
        assert len(rows)==2
        assert [r['review_status'] for r in rows]==['revisada','arquivada']
    main.init_db()  # a migração não cria novas duplicações
    with main.conn() as db:
        rows=db.execute('''SELECT id,review_status FROM questions
                   WHERE question='Qual afirmação sobre consentimento na LGPD está correta?'
                   ORDER BY id''').fetchall()
        assert len(rows)==2
        assert [r['review_status'] for r in rows]==['revisada','arquivada']
    archive=client.get('/api/questions/list?status=arquivada').json()
    assert archive['total']>=1
    assert archive['items'][0]['review_status']=='arquivada'
    assert client.patch(f'/api/questions/{rows[-1]["id"]}/status',json={'status':'revisada'}).status_code==200


def test_reactivated_question_is_not_archived_again(tmp_path):
    client=client_for(tmp_path)
    import main
    with main.conn() as db:
        item=db.execute("SELECT id FROM questions WHERE review_status='arquivada' AND origin='autoral' ORDER BY id LIMIT 1").fetchone()
    assert item
    assert client.patch(f'/api/questions/{item["id"]}/status',json={'status':'revisada'}).status_code==200
    main.init_db()
    with main.conn() as db:
        restored=db.execute('SELECT review_status FROM questions WHERE id=?',(item['id'],)).fetchone()
        assert restored['review_status']=='revisada'
