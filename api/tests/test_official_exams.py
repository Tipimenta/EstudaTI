"""Offline smoke tests: PDF sintético sem copiar provas de terceiros."""
import os
import sqlite3
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
import fitz
from official_exam_parser import extract_definitive_key, extract_exam
from official_exams import setup, refresh_one, EXAMS, SOURCE_PAGE, KEY_URL


def build_exam():
    pdf=fitz.open()
    for _ in range(2):
        pdf.new_page(width=600,height=850)
    for pageno in range(7):
        page=pdf.new_page(width=600,height=850)
        for col in range(2):
            x=38 if col==0 else 325
            for j in range(5):
                number=pageno*10+col*5+j+1
                y=85+j*140
                page.insert_text((x,y),str(number),fontsize=11)
                page.insert_text((x,y+17),"Qual afirmacao representa um caso de teste?",fontsize=9)
                for n,letter in enumerate("ABCDE"):
                    page.insert_text((x,y+34+n*13),"("+letter+") Opcao numero "+str(n+1)+" da questao.",fontsize=8)
    b=pdf.tobytes()
    pdf.close()
    return b


def build_key():
    pdf=fitz.open()
    page=pdf.new_page(width=680,height=850)
    page.insert_text((38,75),"Analista de TI - Gestao de Servicos de TIC - TIPO 1",fontsize=12)
    for i,start in enumerate([1,21,41,61]):
        y=110+36*i
        count=min(20,71-start)
        for k in range(count):
            x=40+k*28
            page.insert_text((x,y),str(start+k),fontsize=9)
            page.insert_text((x,y+14),"*" if start+k==13 else "A",fontsize=9)
    b=pdf.tobytes()
    pdf.close()
    return b


class TestOfficialExamParser(unittest.TestCase):
    def test_full_exam_columns(self):
        exam=extract_exam(build_exam())
        self.assertEqual([x["number"] for x in exam],list(range(1,71)))
        self.assertEqual(sum(x["status"]=="extraida" for x in exam),70)
        self.assertEqual(len(exam[0]["choices"]),5)

    def test_key_number_to_answer(self):
        key=extract_definitive_key(build_key(),"Gestao de Servicos de TIC")
        self.assertEqual(len(key),70)
        self.assertEqual(key[13],"*")
        self.assertEqual(key[70],"A")

    def test_manual_refresh_import_no_duplicates(self):
        with tempfile.TemporaryDirectory() as folder:
            path=os.path.join(folder,"db.sqlite")
            def conn():
                db=sqlite3.connect(path)
                db.row_factory=sqlite3.Row
                return db
            with conn() as db:
                setup(db)
            exam=next(x for x in EXAMS if x["code"]=="dp24serv")
            def fetch(url,binary=True):
                if not binary:return b"<html><a href='/pdf'></a></html>"
                return build_key() if "gabarito" in url else build_exam()
            with patch("official_exams._download",side_effect=fetch):
                result=refresh_one(exam,conn,lambda:"2026-11-02T19:00:00-03:00")
                self.assertTrue(result["ok"],result)
                self.assertEqual(result["imported"],69)
                result=refresh_one(exam,conn,lambda:"2026-11-02T19:00:00-03:00")
                self.assertTrue(result["ok"],result)
            with conn() as db:
                self.assertEqual(db.execute("SELECT count(*) FROM official_exam_items").fetchone()[0],69)


if __name__=="__main__":
    unittest.main()
