"""Extração conservadora de cadernos de prova PDF (sem adivinhar gabaritos).

Os padrões variam por banca. Retornamos CANDIDATOS, nunca questões validadas.
"""
import re
from io import BytesIO
from pypdf import PdfReader

QUESTION_MARK = re.compile(r'(?mi)^\s*(?:quest[ãa]o\s*(?:n[º°.]\s*)?|quest[aã]o\s+)(\d{1,3})\s*[:.\-–]?\s*$')
ALT_MARK = re.compile(r'(?mi)^\s*\(?([A-E])\)\s+(.+?)\s*$')


def extract_candidates(pdfbytes:bytes, max_pages=130):
    if not pdfbytes.startswith(b'%PDF-'):
        raise ValueError('Arquivo não aparenta ser PDF.')
    reader=PdfReader(BytesIO(pdfbytes), strict=False)
    if reader.is_encrypted:
        raise ValueError('PDF com senha não é suportado.')
    if len(reader.pages)>max_pages:
        raise ValueError(f'PDF com mais de {max_pages} páginas não é suportado.')
    parts=[]; chars=0
    for i,p in enumerate(reader.pages,1):
        text=p.extract_text(extraction_mode='plain') or ''
        chars+=len(text)
        if text.strip():parts.append({'page':i,'text':text[:48000]})
    if not parts:raise ValueError('Não há texto extraível: use caderno digital em PDF ou OCR externo.')
    candidates=[]
    for block in parts:
        page=block['page'];text=block['text']
        matches=list(QUESTION_MARK.finditer(text))
        for idx,m in enumerate(matches):
            fragment=text[m.end():matches[idx+1].start() if idx+1<len(matches) else len(text)]
            answers=list(ALT_MARK.finditer(fragment))
            if len(answers)<2:continue
            lead=fragment[:answers[0].start()].strip()
            if not lead:continue
            options=[]
            for j,a in enumerate(answers[:5]):
                e=answers[j+1].start() if j+1<len(answers[:5]) else len(fragment)
                txt=fragment[a.start():e]
                txt=re.sub(r'^\s*\(?[A-E]\)\s*','',txt).strip()
                options.append({'letter':a.group(1),'text':txt[:1100]})
            seen=[q['letter'] for q in options]
            if len(seen)!=len(set(seen)) or seen != list('ABCDE'[:len(seen)]):continue
            candidates.append({'number':int(m.group(1)),'page':page,'question':lead[:2200], 'options':options,
                               'confidence':'candidata', 'correct':None})
    return {'pages':len(reader.pages),'pages_with_text':len(parts),'chars':chars,'candidates':candidates[:120],
            'warning':'Detector heurístico. NÃO contém gabarito: faça conferência manual com o gabarito definitivo e revisão das alternativas antes da importação. Questões com layout fora do padrão podem não ser detectadas.',
            'page_samples':[{'page':x['page'],'text':x['text'][:1200]} for x in parts[:3]]}
