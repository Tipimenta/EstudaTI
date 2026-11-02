import io
import importlib
import sys
from pathlib import Path
from pypdf import PdfWriter
from test_workflow import client_for


def test_content_library_and_mastery(tmp_path):
    c=client_for(tmp_path)
    topics=c.get('/api/topics').json()
    assert len(topics)==169
    assert len(c.get('/api/resources').json()['items'])>=15
    mastery=c.get('/api/study/mastery').json()
    assert len(mastery['topics'])==169
    assert len(mastery['subjects'])==9
    assert all(x['status']=='não iniciado' for x in mastery['topics'])
    # comprovamos que flashcards e questões nasceram com a lição
    import main
    with main.conn() as db:
        assert db.execute('SELECT COUNT(*) FROM questions').fetchone()[0]==322
        assert db.execute('SELECT COUNT(*) FROM flashcards').fetchone()[0]==410
        assert db.execute("SELECT COUNT(*) FROM questions WHERE correct_index NOT BETWEEN 0 AND 3").fetchone()[0]==0


def test_migration_preserves_progress(tmp_path):
    c=client_for(tmp_path)
    imported=c.get('/api/quiz/questions?limit=1').json()[0]
    qid=imported['id']
    assert c.post('/api/quiz/submit',json={'answers':[{'question_id':qid,'choice_index':0}], 'duration_sec':5}).status_code==200
    import main
    with main.conn() as db:
        attempts=db.execute('SELECT COUNT(*) FROM quiz_attempts').fetchone()[0]
        topics=db.execute('SELECT COUNT(*) FROM topics').fetchone()[0]
        main.init_db()
        assert db.execute('SELECT COUNT(*) FROM quiz_attempts').fetchone()[0]==attempts
        assert db.execute('SELECT COUNT(*) FROM topics').fetchone()[0]==topics


def test_exam_pdf_without_text(tmp_path):
    c=client_for(tmp_path)
    w=PdfWriter(); w.add_blank_page(width=612,height=792)
    b=io.BytesIO(); w.write(b)
    res=c.post('/api/provas/extrair',files={'file':('prova.pdf',b.getvalue(),'application/pdf')})
    assert res.status_code==422


def test_pdf_parser_regex():
    import pdf_import
    from unittest.mock import patch
    assert pdf_import.QUESTION_MARK.search('Questão 32\nEnunciado')
    assert len(pdf_import.ALT_MARK.findall('(A) primeira\n(B) segunda\n(C) terceira\n(D) quarta'))==4


def test_adaptive_plan_three_blocks(tmp_path):
    c=client_for(tmp_path)
    data=c.get('/api/plan?days=2').json()
    assert len(data)==6
    bydate={d: [x for x in data if x['study_date']==d] for d in {x['study_date'] for x in data}}
    assert len(bydate)==2
    assert all({x['activity'] for x in xs}=={'revisão','teoria','questões'} for xs in bydate.values())
    assert all(sum(x['minutes'] for x in xs)==90 for xs in bydate.values())
    assert c.post('/api/plan/regenerate').status_code==200
    assert len(c.get('/api/plan?days=2').json())==6
