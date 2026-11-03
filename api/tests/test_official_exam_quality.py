"""Regressões: não confundir gabarito com fidelidade de texto PDF."""
import os
import sqlite3
import sys
import unittest
sys.path.insert(0,os.path.dirname(os.path.dirname(__file__)))
from official_exam_quality import check_question,quarantine_existing
from official_exams import setup

BASE=["Alternativa um adequada.","Alternativa dois pertinente.","Alternativa tres correta.","Alternativa quatro possível.","Alternativa cinco plausível."]


class QualityGate(unittest.TestCase):
    def test_clean_pdf_page_footer(self):
        stem="Em uma rede corporativa, qual configuração evita a repetição indevida?"
        options=BASE[:-1]+[BASE[-1]+" ATI - Arquitetura, Engenharia e Sustentação Tecnológica – TARDE G CO C O"]
        cleaned,reason=check_question(stem,options)
        self.assertEqual(reason,"")
        self.assertEqual(cleaned[-1],BASE[-1])

    def test_missing_english_passage_blocked(self):
        stem="By the end of TEXT, six people assessed the guide. Who said that?"
        _,reason=check_question(stem,BASE)
        self.assertIn("texto",reason.lower())

    def test_missing_highlight_blocked(self):
        stem="Assinale a opção em que a palavra destacada está correta."
        _,reason=check_question(stem,BASE)
        self.assertTrue(reason)

    def test_self_contained_question_kept(self):
        stem="Em um banco relacional, qual instrução serve para eliminar uma linha específica?"
        options,reason=check_question(stem,BASE)
        self.assertEqual(reason,"")
        self.assertEqual(options,BASE)

    def test_existing_import_reversible_status(self):
        db=sqlite3.connect(":memory:")
        db.row_factory=sqlite3.Row
        with db:
            setup(db)
            db.execute("""INSERT INTO official_exam_items
              (exam_code,number,page,question,choices_json,correct_index,fingerprint,
               source_url,key_url,status,reason) VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
               ("dp24infra",13,5,"What information is in TEXT?","[\"A\",\"B\",\"C\",\"D\",\"E\"]",
               2,"fingerprint","https://example.test/pdf","https://example.test/key","verificada",""))
            quarantine_existing(db,"2026-11-02T23:40:00-03:00")
            result=db.execute("SELECT status FROM official_exam_items WHERE number=13").fetchone()[0]
            self.assertEqual(result,"bloqueada")
            log=db.execute("SELECT before_status,after_status FROM official_exam_repairs WHERE number=13").fetchone()
            self.assertEqual(tuple(log),("verificada","bloqueada"))
            self.assertEqual(db.execute("SELECT COUNT(*) FROM official_exam_items").fetchone()[0],1)
        db.close()


if __name__=="__main__":
    unittest.main()
