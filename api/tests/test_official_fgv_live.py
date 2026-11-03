"""Teste de integração manual de PDFs oficiais; jamais altera a base de dados."""
import os
import sys
import unittest
sys.path.insert(0,os.path.dirname(os.path.dirname(__file__)))
from official_exams import _download,PDF_ROOT,KEY_URL,BY_CODE
from official_exam_parser import extract_exam,extract_definitive_key


@unittest.skipUnless(os.environ.get("ESTUDATI_FGV_LIVE") == "1","Rede pública: apenas teste explícito")
class RealFGVPdf(unittest.TestCase):
    def test_official_2024_book_and_key(self):
        source=BY_CODE["dp24infra"]
        pdf=_download(PDF_ROOT+source["filename"])
        key_pdf=_download(KEY_URL)
        content=extract_exam(pdf)
        key=extract_definitive_key(key_pdf,source["fragment"],1)
        counts={s:sum(1 for x in content if x["status"]==s) for s in ("extraida","bloqueada")}
        print("FGV diagnóstico (sem enunciados):",counts,"numeros",len(content),
              "gabarito",len(key),"anuladas",sum(x=="*" for x in key.values()))
        self.assertEqual([q["number"] for q in content],list(range(1,71)))
        self.assertEqual(len(key),70)
        self.assertGreaterEqual(counts["extraida"],30)
