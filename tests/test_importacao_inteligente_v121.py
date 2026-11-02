"""Integridade de banco e avisos de quase duplicação na V1.2.1."""
from test_workflow import client_for
from question_diversity import resembles, canonical_fingerprint


def make(stem, choices=None, correct='A'):
    choices=choices or ['Verificar rota e gateway','Configurar impressora USB','Ajustar resolução da tela','Apagar logs do servidor']
    return {'subject_code':'RED','question':stem,
            **{f'option_{letter}':answer for letter,answer in zip('abcde',choices)},
            'correct':correct,
            'explanation':'A resposta indicada exige análise de roteamento e encaminhamento de pacotes.',
            'origin':'autoral'}


def test_dedup_order_and_punctuation(tmp_path):
    c=client_for(tmp_path)
    stem='Um roteador não conhece a rede de destino: qual a primeira verificação técnica recomendada?'
    choices=['Consultar a tabela de rotas','Verificar o disco do sistema','Desabilitar o DNS','Trocar o monitor']
    a=make(stem,choices)
    b=make(stem+' ',list(reversed(choices)),'D')
    result=c.post('/api/questions/import',json={'questions':[a,b]}).json()
    assert result['imported']==1
    assert result['duplicates']==1
    assert result['similar_count']==0


def test_similar_questions_are_flagged_but_preserved(tmp_path):
    c=client_for(tmp_path)
    a=make('Em um ambiente corporativo com VLANs distintas e roteamento interno, um cliente acessa seu gateway, mas não consegue alcançar outra sub-rede. Qual seria a verificação mais apropriada?')
    b=make('Em um ambiente corporativo com VLANs distintas e roteamento interno, um cliente acessa seu gateway, mas não consegue alcançar uma segunda sub-rede. Qual seria a verificação mais apropriada?',
           ['Inspecionar as rotas entre as VLANs','Alterar a resolução de vídeo','Trocar o driver de impressão','Desligar o antivírus'])
    r=c.post('/api/questions/import',json={'questions':[a,b]}).json()
    assert r['imported']==2
    assert r['duplicates']==0
    assert r['similar_count']==1
    assert r['similar'][0]['row']==2
    assert c.get('/api/questions/list?status=rascunho').json()['total']==2


def test_similarity_is_not_a_semantic_judge():
    a='A falha ocorreu com endereço IPv4 10.10.0.1 em uma VLAN restrita de produção, qual regra permite acesso?'
    b='A falha ocorreu com endereço IPv4 10.10.0.2 em uma VLAN restrita de produção, qual regra permite acesso?'
    assert resembles(a,b) is not None  # aviso, nunca prova de mesmo gabarito
    assert canonical_fingerprint(a,['sim','não'])!=canonical_fingerprint(b,['sim','não'])


def test_normal_quiz_prefers_unseen_after_practice(tmp_path):
    c=client_for(tmp_path)
    first=c.get('/api/quiz/questions?limit=1').json()[0]
    submit=c.post('/api/quiz/submit',json={'answers':[{'question_id':first['id'],'choice_index':0}], 'duration_sec':7})
    assert submit.status_code==200
    next_batch=c.get('/api/quiz/questions?limit=40').json()
    assert len(next_batch)==40
    assert first['id'] not in {q['id'] for q in next_batch}
    assert len({q['id'] for q in next_batch})==40
