"""Exercícios dissertativos, rubrica, persistência, backup, ausência de chave e RAG lexical."""
from test_workflow import client_for


def test_discursive_workflow_and_migration(tmp_path):
    c=client_for(tmp_path)
    assert c.get('/api/discursive/questions').status_code==200
    items=c.get('/api/discursive/questions').json()
    assert len(items)==27
    assert len({i['code'] for i in items})==9
    q=items[0]
    detail=c.get(f'/api/discursive/questions/{q["id"]}').json()
    assert 'model_answer' not in detail
    assert len(detail['rubric'])==4
    assert sum(x['weight'] for x in detail['rubric'])==100
    assert c.post('/api/discursive/submit',json={'question_id':q['id'],'answer':'Curta demais','mode':'local'}).status_code==422
    text='O IP fornece endereçamento e encaminhamento entre redes por roteadores. TCP oferece entrega ordenada e retransmissão, usando portas. UDP permite transmissão sem garantias de entrega e é usado quando baixa latência é importante.'
    r=c.post('/api/discursive/submit',json={'question_id':q['id'],'answer':text,'mode':'local','duration_sec':123})
    assert r.status_code==200, r.text
    result=r.json()['feedback']
    assert result['score'] is None and result['mode']=='local'
    assert len(result['criteria'])==4
    assert result['model_answer']
    assert isinstance(result['sources'],list)
    assert c.get(f'/api/discursive/attempts?question_id={q["id"]}').json()[0]['answer']==text
    assert 'discursive_attempts' in c.get('/api/export').json()['data']
    assert c.post('/api/discursive/submit',json={'question_id':q['id'],'answer':text,'mode':'ai'}).status_code==409
    import main
    main.init_db()
    with main.conn() as db:
        assert db.execute('SELECT COUNT(*) FROM discursive_questions').fetchone()[0]==27
        assert db.execute('SELECT COUNT(*) FROM discursive_attempts').fetchone()[0]==1


def test_retriever_scoped_to_subject(tmp_path):
    c=client_for(tmp_path)
    import main
    from discursive_api import lexical_retrieve
    with main.conn() as db:
        q=dict(db.execute('SELECT * FROM discursive_questions ORDER BY id LIMIT 1').fetchone())
        sources=lexical_retrieve(db,q)
        assert sources and all(source['source_id'].startswith('aula:') for source in sources)
        for s in sources:
            row=db.execute('SELECT subject_id FROM topics WHERE id=?',(int(s['source_id'].split(':')[1]),)).fetchone()
            assert row['subject_id']==q['subject_id']


def test_ai_graded_response_mocked_and_saved_only_on_success(tmp_path,monkeypatch):
    import json
    c=client_for(tmp_path)
    question=c.get('/api/discursive/questions').json()[0]
    detail=c.get(f'/api/discursive/questions/{question["id"]}').json()
    import discursive_api
    monkeypatch.setenv('OPENAI_API_KEY','chave-falsa-apenas-teste')
    def fake_post(*args,**kwargs):
        assert kwargs['json']['store'] is False
        assert kwargs['json']['text']['format']['type']=='json_schema'
        assert 'Authorization' in kwargs['headers']
        items=[{'name':x['name'],'score':20,'comment':'A resposta atende parcialmente ao critério e poderia trazer exemplo.'} for x in detail['rubric']]
        payload={'criteria':items,'strengths':['Relacionou conceitos ao cenário'],
                 'improvements':['Aprofundar a justificativa'],
                 'improved_answer':'Resposta revisada com definições e exemplos específicos.',
                 'language_revision':'O IP permite a comunicação entre redes com roteamento e endereçamento lógico.',
                 'writing_score':90,
                 'writing_edits':[{'original':'O IP permite comunicação entre redes',
                                   'suggested':'O protocolo IP permite a comunicação entre redes',
                                   'reason':'Preferir nomenclatura técnica e artigo definido.'}],
                 'writing_feedback':{'clarity':'Clara.','structure':'Organizada.','precision':'Explicativa.','formality':'Registro formal adequado.'},
                 'source_ids':['aula:1','aula:999999']}
        class Dummy:
            def raise_for_status(self): pass
            def json(self):return {'output':[{'content':[{'type':'output_text','text':json.dumps(payload)}]}]}
        return Dummy()
    monkeypatch.setattr(discursive_api.requests,'post',fake_post)
    answer=('O IP permite comunicação entre redes com roteamento e endereçamento lógico. '
            'TCP usa portas e mecanismos de retransmissão para entrega ordenada. '
            'UDP reduz custos de transporte quando a aplicação cuida da confiabilidade.')
    res=c.post('/api/discursive/submit',json={'question_id':question['id'],'answer':answer,'mode':'ai'})
    assert res.status_code==200,res.text
    assert res.json()['feedback']['score']==80
    assert res.json()['feedback']['mode']=='ai-rag'
    assert res.json()['feedback']['writing_score']==90
    assert res.json()['feedback']['overall_score']==82
    assert len(res.json()['feedback']['writing_edits'])==1
    assert all(i['source_id']!='aula:999999' for i in res.json()['feedback']['sources'])
    count=len(c.get('/api/discursive/attempts').json())
    def fake_broken(*args,**kwargs):
        class Dummy:
            def raise_for_status(self):pass
            def json(self):return {'output':[{'content':[{'type':'output_text','text':'not JSON'}]}]}
        return Dummy()
    monkeypatch.setattr(discursive_api.requests,'post',fake_broken)
    res=c.post('/api/discursive/submit',json={'question_id':question['id'],'answer':answer,'mode':'ai'})
    assert res.status_code==502
    assert len(c.get('/api/discursive/attempts').json())==count
