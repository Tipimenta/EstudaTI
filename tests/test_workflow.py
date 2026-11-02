"""Testes de integração leves: PYTHONPATH=api pytest -q tests"""
import importlib
import io
import os
import sys

from fastapi.testclient import TestClient
from pypdf import PdfWriter


def client_for(tmp_path):
    os.environ['DATABASE_PATH'] = str(tmp_path/'test.sqlite3')
    os.environ['APP_PASSWORD'] = 'senha-de-teste-com-bastante-caracteres'
    os.environ['APP_SECRET'] = 'teste-chaves-1234567890' * 4
    os.environ['ENABLE_MONITOR'] = 'false'
    if 'main' in sys.modules:
        del sys.modules['main']
    import main
    importlib.reload(main)
    main.init_db()
    client = TestClient(main.app)
    assert client.post('/api/login',json={'password':os.environ['APP_PASSWORD']}).status_code == 200
    return client


def test_login_and_seed(tmp_path):
    client=client_for(tmp_path)
    assert client.get('/api/me').json()['version']=='1.3.0'
    assert client.get('/api/dashboard').json()['question_count']==321
    assert len(client.get('/api/topics').json())==169
    assert len(client.get('/api/contests').json())==7
    assert len(client.get('/api/quiz/questions?limit=4').json())==4


def test_import_review_practice_flashcard(tmp_path):
    c=client_for(tmp_path)
    raw={
      'subject_code':'RED', 'question':'Qual camada do modelo OSI corresponde ao roteamento entre redes distintas?',
      'option_a':'Sessão', 'option_b':'Rede', 'option_c':'Aplicação', 'option_d':'Física',
      'correct':'B', 'explanation':'O roteamento IP é executado na camada de rede, camada 3 do modelo OSI.',
      'origin':'oficial','board':'Banca Simulada','exam':'Concurso hipotético para teste','year':'2024',
      'question_number':'12','source_url':'https://example.org/prova.pdf',
      'license_note':'Somente para teste automatizado; não é questão oficial real.'
    }
    bad={**raw,'question':'Questão muito curta','correct':'Z'}
    result=c.post('/api/questions/import',json={'questions':[raw,raw,bad]}).json()
    assert result['imported']==1 and result['duplicates']==1 and result['errors_count']==1
    quiz=c.get('/api/quiz/questions?origin=oficial').json()
    assert len(quiz)==0
    catalog=c.get('/api/questions/list?origin=oficial').json()
    assert catalog['total']==1
    qid=catalog['items'][0]['id']
    # A V1.3 exige duas conferências independentes antes de liberar provas oficiais.
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'revisada'}).status_code==409
    verified={'content_checked':True,'answer_checked':True,'definitive_key':True,
              'page_number':3,'key_url':'https://example.org/gabarito-definitivo.pdf',
              'review_note':'Caderno e gabarito comparados para teste.'}
    assert c.patch(f'/api/questions/{qid}/quality',json=verified).status_code==200
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'revisada'}).status_code==200
    quiz=c.get('/api/quiz/questions?origin=oficial').json()
    assert len(quiz)==1 and quiz[0]['id']==qid
    res=c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':0}], 'duration_sec':20}).json()
    assert res['correct']==0 and res['total']==1
    assert c.get('/api/quiz/questions?only_wrong=true&origin=oficial').json()[0]['id']==qid
    flash=c.post(f'/api/questions/{qid}/flashcard',json={}).json()
    assert flash == {'ok':True,'duplicate':False}
    assert c.post(f'/api/questions/{qid}/flashcard',json={}).json()['duplicate'] is True
    assert c.get('/api/questions/meta').json()['wrong_count']>=1
    assert c.patch(f'/api/questions/{qid}/status',json={'status':'anulada'}).status_code==200
    assert c.get('/api/quiz/questions?origin=oficial').json()==[]


def test_pdf_without_text_is_not_misread(tmp_path):
    c=client_for(tmp_path)
    writer=PdfWriter();writer.add_blank_page(width=612,height=792)
    io_out=io.BytesIO();writer.write(io_out)
    r=c.post('/api/editais/analisar',files={'file':('edital.pdf',io_out.getvalue(),'application/pdf')})
    assert r.status_code==422
    assert 'OCR' in r.json()['detail']


def test_question_formats_and_contest_editor(tmp_path):
    c=client_for(tmp_path)
    ce={
      'subject_code':'SEG','question':'É correto afirmar que criptografia de ponta a ponta impede acesso por qualquer pessoa sem uma chave válida?',
      'option_a':'Certo','option_b':'Errado','correct':'B',
      'explanation':'A afirmação absoluta é falsa: usuários finais, chaves comprometidas e falhas de implementação podem comprometer a confidencialidade.',
      'origin':'autoral'
    }
    fifth={
      'subject_code':'SO','question':'Qual comando em Linux costuma mostrar os serviços gerenciados pelo systemd?',
      'option_a':'ifconfig','option_b':'systemctl','option_c':'hostname','option_d':'lsblk','option_e':'dig',
      'correct':'B','explanation':'systemctl interage com units de serviços e outros recursos no systemd.',
      'origin':'autoral'
    }
    import_result=c.post('/api/questions/import',json={'questions':[ce,fifth]}).json()
    assert import_result['imported']==2
    items=c.get('/api/questions/list?status=rascunho').json()['items']
    assert sorted(len(x['choices']) for x in items)==[2,5]
    for x in items:
        assert c.patch(f"/api/questions/{x['id']}/status",json={'status':'revisada'}).status_code==200
    ids={x['id']:len(x['choices']) for x in items}
    assert len(c.get('/api/quiz/questions?limit=40').json())==40
    short_id=next(i for i,n in ids.items() if n==2)
    assert c.post('/api/quiz/submit',json={'answers':[{'question_id':short_id,'choice_index':4}],'duration_sec':10}).status_code==400
    body={'name':'Órgão fictício','position':'Analista de Infraestrutura','location':'São Paulo/SP',
      'salary':8500,'registration_deadline':'2026-12-30','url':'https://conhecimento.fgv.br/concursos/dataprev26',
      'notes':'Somente para teste','active':True,'priority':1}
    new=c.post('/api/contests',json=body)
    assert new.status_code==200
    cid=new.json()['id']
    assert c.patch(f'/api/contests/{cid}',json={**body,'priority':2,'active':False}).status_code==200
    obj=next(x for x in c.get('/api/contests').json() if x['id']==cid)
    assert obj['active']==0 and obj['priority']==2
