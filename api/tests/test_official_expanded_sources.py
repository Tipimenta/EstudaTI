"""Regression: multi-concurso FGV requires exact cargo/type and 70/80 keys."""
import io
import os
import sqlite3
import sys
import unittest
sys.path.insert(0,os.path.join(os.path.dirname(__file__),".."))
import fitz
from official_exams import EXAMS,BY_CODE,setup
from official_exam_parser import extract_definitive_key

class MultiContestSources(unittest.TestCase):
 def test_official_sources_are_distinct_and_specific(self):
  self.assertEqual(len(EXAMS),11)
  self.assertEqual(len(BY_CODE),11)
  self.assertEqual({x['contest'] for x in EXAMS},{"Dataprev 2024","Prefeitura de São José dos Campos 2024","TJRN 2023","TJAP 2024"})
  for x in EXAMS:
   self.assertEqual(x['board'],'FGV')
   self.assertIn(x.get('total_questions',70),(70,80))
   self.assertTrue(x['fragment'])
   self.assertTrue(x['filename'].endswith('.pdf'))
   self.assertTrue(x.get('key_url','https://conhecimento.fgv.br/sites/default/files/concursos/dataprev_gabarito_definitivo-1.pdf').startswith('https://conhecimento.fgv.br/'))

 def test_setup_adds_sources_without_changing_existing_progress(self):
  con=sqlite3.connect(':memory:')
  con.row_factory=sqlite3.Row
  with con:
   setup(con)
   self.assertEqual(con.execute('SELECT COUNT(*) FROM official_exam_sources').fetchone()[0],11)
   con.execute("UPDATE official_exam_sources SET state='parcial',diagnostic='Caderno importado' WHERE code='dp24infra'")
   setup(con)
   actual=con.execute("SELECT state,diagnostic,ready_count FROM official_exam_sources WHERE code='dp24infra'").fetchone()
   self.assertEqual(actual["state"],'parcial')
   self.assertEqual(actual["diagnostic"],'Caderno importado')
   self.assertEqual(actual["ready_count"],0)  # Sem itens reais, a auditoria recalcula a contagem; não aceita número artificial.
  con.close()

 @staticmethod
 def key_pdf(total,role,answers,another=None):
  doc=fitz.open()
  page=doc.new_page(width=612,height=792)
  page.insert_text((35,90),role+' - TIPO 1',fontsize=11)
  for start in range(1,total+1,20):
   group=list(range(start,min(total+1,start+20)))
   k=(start-1)//20
   # Separate text insertions by column, just as the FGV key is built.
   for i,n in enumerate(group):
    page.insert_text((35+i*27,126+k*75),str(n),fontsize=10)
    page.insert_text((35+i*27,147+k*75),answers[n-1],fontsize=10)
  return doc.tobytes()

 def test_70_and_80_answers_and_anuladas(self):
  for total in (70,80):
   with self.subTest(total=total):
    key=['ABCDE'[(i*3)%5] for i in range(total)]
    key[23]='*'
    data=self.key_pdf(total,'Analista de TI - Segurança da Informação',key)
    self.assertEqual(extract_definitive_key(data,'Analista de TI - Segurança da Informação',1,total)[24],'*')
    self.assertEqual(len(extract_definitive_key(data,'Analista de TI - Segurança da Informação',1,total)),total)
    with self.assertRaises(ValueError):
     extract_definitive_key(data,'Analista de TI - Banco de Dados',1,total)

if __name__=='__main__':unittest.main()
