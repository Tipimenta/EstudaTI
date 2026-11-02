"""Extrai texto de PDFs digitais para conferência manual. NÃO reconstrói questões/gabaritos.
Uso: python tools/extrair_texto_pdf.py prova.pdf prova.txt
Instale: pip install pypdf
"""
import sys
from pathlib import Path
from pypdf import PdfReader

if len(sys.argv) != 3:
    raise SystemExit('Uso: python tools/extrair_texto_pdf.py <prova.pdf> <saida.txt>')
src, dest = Path(sys.argv[1]), Path(sys.argv[2])
reader = PdfReader(str(src))
parts = []
for index, page in enumerate(reader.pages, start=1):
    content = (page.extract_text() or '').strip()
    parts.append(f'\n=== PÁGINA {index} ===\n{content or "[SEM TEXTO: imagem/scan ou extração indisponível]"}\n')
dest.write_text(''.join(parts), encoding='utf-8')
print(f'Extraídas {len(reader.pages)} páginas para {dest}; confira o gabarito definitivo antes da importação.')
