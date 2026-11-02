"""Teste de regras de qualidade oficial, importação com justificativas e matriz de edital."""
from test_workflow import client_for


def official():
    return {'subject_code':'RED','question':'Um cliente usa DNS correto, mas TCP 443 falha. Qual investigação é mais específica?',
        'option_a':'Verificar conectividade TCP na porta 443',
        'option_b':'Reinstalar o sistema sem teste','option_c':'Mudar o monitor','option_d':'Limpar cache de impressão',
        'correct':'A','explanation':'Resolver DNS não prova que a conexão TCP do serviço está funcionando.',
        'explanation_a':'Isola disponibilidade do transporte e da porta esperada.',
        'explanation_b':'É uma intervenção desproporcional sem diagnosticar a causa.',
        'explanation_c':'Periférico de vídeo não explica falha na conexão TCP.',
        'explanation_d':'Fila de impressão não explica conexão TCP 443.',
        'origin':'oficial','board':'Banca para teste','exam':'Concurso fictício (teste automatizado)','year':'2025',
        'question_number':'18','source_url':'https://example.org/prova-2025.pdf',
        'license_note':'Dados fictícios apenas em testes.'}


def test_official_gate_and_audit(tmp_path):
    c=client_for(tmp_path)
    out=c.post('/api/questions/import',json={'questions':[official()]})
    assert out.status_code==200 and out.json()['imported']==1
    r=c.get('/api/questions/list?origin=oficial').json()['items'][0];qid=r['id']
    assert r['choice_rationales']['B'].startswith('É uma intervenção')
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'revisada'}).status_code==409
    assert c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':0}],'duration_sec':2}).status_code==409
    assert c.patch(f'/api/questions/{qid}/quality',json={'content_checked':True,'answer_checked':True,
        'definitive_key':True,'page_number':18,'key_url':'http://example.org/gabarito.pdf'}).status_code==422
    assert c.patch(f'/api/questions/{qid}/quality',json={'content_checked':True,'answer_checked':True,
        'definitive_key':True,'page_number':18,'key_url':'https://example.org/gabarito-definitivo.pdf',
        'review_note':'Conferência humana de teste.'}).status_code==200
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'revisada'}).status_code==200
    q=c.get('/api/quiz/questions?origin=oficial').json()
    assert len(q)==1 and q[0]['id']==qid
    res=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':0}],'duration_sec':15})
    assert res.status_code==200
    assert len(res.json()['results'][0]['choice_rationales'])==4
    a=c.get(f'/api/questions/{qid}/quality').json()
    assert len(a['audit'])>=2
    # Revogar a evidência só depois de retirar a questão dos simulados.
    assert c.patch(f'/api/questions/{qid}/quality',json={'content_checked':False}).status_code==409
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'rascunho'}).status_code==200
    assert c.patch(f'/api/questions/{qid}/quality',json={'content_checked':False}).status_code==200
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'revisada'}).status_code==409


def test_syllabus_integrity_and_independent_progress(tmp_path):
    c=client_for(tmp_path)
    contest=c.get('/api/contests').json()[0]['id']
    lessons=c.get('/api/study/lessons').json()
    red=next(x for x in lessons if x['code']=='RED')
    so=next(x for x in lessons if x['code']=='SO')
    data={'contest_id':contest,'subject_code':'RED','name':'Configuração IPv4 e CIDR',
          'lesson_id':red['id'],'section_ref':'página 17 / seção 2.3', 'importance':5,'confirmed':True}
    bad={**data,'lesson_id':so['id']}
    assert c.post('/api/syllabus',json=bad).status_code==422
    created=c.post('/api/syllabus',json=data)
    assert created.status_code==200;item_id=created.json()['id']
    assert c.post('/api/syllabus',json=data).status_code==409
    summary=c.get('/api/syllabus?contest_id='+str(contest)).json()
    assert summary['summary']['total']==1 and summary['summary']['confirmed']==1
    assert summary['items'][0]['stage']=='aula_pendente'
    assert c.patch(f'/api/study/lessons/{red["id"]}',json={'completed':True,'notes':'Anotações preservadas'}).status_code==200
    assert c.get('/api/syllabus?contest_id='+str(contest)).json()['items'][0]['stage']=='poucas_questoes'
    assert c.patch('/api/syllabus/'+str(item_id),json={'importance':2,'confirmed':False}).status_code==200
    assert c.get('/api/syllabus?contest_id='+str(contest)).json()['items'][0]['stage']=='pendente_de_conferencia'
    import main
    with main.conn() as db:
        before={k:db.execute('SELECT COUNT(*) FROM '+k).fetchone()[0] for k in ('syllabus_items','question_quality','questions','quiz_answers')}
    main.init_db()
    with main.conn() as db:
        after={k:db.execute('SELECT COUNT(*) FROM '+k).fetchone()[0] for k in before}
    assert before==after
    assert c.delete('/api/syllabus/'+str(item_id)).status_code==200
    assert c.get('/api/syllabus?contest_id='+str(contest)).json()['summary']['total']==0
    assert c.get("/api/study/lessons/"+str(red["id"])).json()["notes"]=="Anotações preservadas"


def test_curated_case_pedagogical_variety(tmp_path):
    c=client_for(tmp_path)
    catalog=c.get('/api/questions/list?status=revisada&page_size=100').json()
    assert c.get('/api/dashboard').json()['question_count']==321
    assert catalog['total']==321
    import main
    with main.conn() as db:
        r=db.execute("SELECT id,question,choice_rationales_json FROM questions WHERE choice_rationales_json!='{}'").fetchall()
        assert len(r)==18
        assert len({x['question'] for x in r})==18
    qid=r[0]['id']
    answer=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':-1}],'duration_sec':0})
    assert answer.status_code==200
    assert len(answer.json()['results'][0]['choice_rationales'])==4
