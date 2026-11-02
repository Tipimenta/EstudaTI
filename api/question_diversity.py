"""Verificação conservadora de duplicação e semelhança para importação.

Sem modelos externos e sem custo de API. Semelhanças são alertas, não bloqueios:
pequenas diferenças podem mudar completamente o gabarito.
"""
import hashlib
import re
import unicodedata
from difflib import SequenceMatcher

STOPWORDS = frozenset('a o as os de da do das dos e em um uma uns umas para por com sem na no nas nos que qual quais como sobre entre assinale alternativa corretas correta correto incorretas incorreta incorreto considere seguinte seguintes acordo afirmacao afirmacoes questao texto item acerca'.split())


def canonical(text):
    text = unicodedata.normalize('NFKD', str(text or '').casefold())
    text = ''.join(c for c in text if not unicodedata.combining(c))
    return ' '.join(re.findall(r'[a-z0-9]+', text))


def canonical_fingerprint(question, choices):
    """Mesma questão e alternativas, independentemente de ordem e pontuação."""
    source = canonical(question)+'\n'+'\n'.join(sorted(canonical(c) for c in choices))
    return hashlib.sha256(source.encode('utf-8')).hexdigest()


def resembles(stem_a, stem_b):
    """Retorna pontuação ou None; é um alerta, jamais prova de duplicação."""
    a, b = canonical(stem_a), canonical(stem_b)
    if a == b and len(a) >= 24:
        return 1.0
    if min(len(a),len(b)) < 65:
        return None
    if min(len(a),len(b))/max(len(a),len(b)) < .75:
        return None
    tokens_a={w for w in a.split() if w not in STOPWORDS}
    tokens_b={w for w in b.split() if w not in STOPWORDS}
    if len(tokens_a|tokens_b)<4: return None
    jaccard=len(tokens_a & tokens_b)/len(tokens_a | tokens_b)
    if jaccard < .72: return None
    ratio=SequenceMatcher(None,a,b,autojunk=False).ratio()
    return round(ratio,3) if ratio >= .88 else None
