"""Importação e validação de questões. Sem coleta não autorizada de provas."""
import hashlib
import json
import re
from urllib.parse import urlsplit

FIELDS = ('subject_code', 'topic_id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'option_e', 'correct', 'explanation', 'origin', 'board', 'exam', 'year', 'question_number', 'source_url', 'license_note')
ALLOWED_ORIGINS = {'autoral', 'oficial', 'adaptada'}


def normalize_text(text):
    return ' '.join(str(text or '').split()).strip()


def fingerprint(text, options):
    source = normalize_text(text).casefold() + '\n' + '\n'.join(normalize_text(v).casefold() for v in options)
    return hashlib.sha256(source.encode('utf-8')).hexdigest()


def clean_question(item, subjects, topics):
    if not isinstance(item, dict):
        raise ValueError('Questão precisa ser objeto JSON.')
    question = normalize_text(item.get('question'))
    options = [normalize_text(item.get(f'option_{letter}', '')) for letter in 'abcde']
    while options and not options[-1]:options.pop()
    correct = normalize_text(item.get('correct')).upper()
    explanation = normalize_text(item.get('explanation'))
    origin = normalize_text(item.get('origin') or 'autoral').lower()
    if not (12 <= len(question) <= 6000): raise ValueError('Enunciado: use de 12 a 6000 caracteres.')
    if len(options) not in (2,4,5) or any(not 1 <= len(v) <= 1800 for v in options):
        raise ValueError('Use 2 (certo/errado), 4 ou 5 alternativas, com 1 a 1800 caracteres cada.')
    if len(set(x.casefold() for x in options)) != len(options): raise ValueError('Alternativas duplicadas.')
    if correct not in 'ABCDE'[:len(options)] or len(correct) != 1: raise ValueError('Gabarito fora das alternativas disponíveis.')
    if len(explanation) < 10: raise ValueError('Comentário precisa ter ao menos 10 caracteres.')
    if origin not in ALLOWED_ORIGINS: raise ValueError('Origem deve ser autoral, oficial ou adaptada.')
    if (len(question) + sum(len(v) for v in options)) > 12000: raise ValueError('Texto da questão excede o limite.')
    year = normalize_text(item.get('year'))
    if year:
        if not re.fullmatch(r'20\d{2}|19\d{2}', year): raise ValueError('Ano inválido.')
        if not 1980 <= int(year) <= 2100: raise ValueError('Ano fora do intervalo permitido.')
    url = normalize_text(item.get('source_url'))
    if url:
        parsed = urlsplit(url)
        if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password or len(url)>1000:
            raise ValueError('Fonte precisa ser uma URL pública HTTPS válida.')
    if origin == 'oficial' and (not year or not normalize_text(item.get('board')) or not normalize_text(item.get('exam')) or not url):
        raise ValueError('Questão oficial exige ano, banca, concurso e URL da fonte para conferência.')
    topic_id = item.get('topic_id')
    if topic_id not in (None, ''):
        try: topic_id = int(topic_id)
        except Exception: raise ValueError('topic_id deve ser numérico.')
        if topic_id not in topics: raise ValueError('topic_id não existe.')
    else:
        code = normalize_text(item.get('subject_code')).upper()
        if code not in subjects: raise ValueError('subject_code inválido; consulte a tabela de disciplinas.')
        topic_id = subjects[code]
    # Explicação por alternativa é facultativa; não fabricar justificativas.
    rationales={}
    for letter in 'abcde'[:len(options)]:
        text=normalize_text(item.get('explanation_'+letter, ''))
        if text and len(text)<12: raise ValueError('Justificativa da alternativa '+letter.upper()+' deve ter ao menos 12 caracteres.')
        if len(text)>2500: raise ValueError('Justificativa de alternativa excede 2500 caracteres.')
        if text: rationales[letter.upper()]=text
    meta = {key: normalize_text(item.get(key))[:180] for key in ('board', 'exam', 'question_number')}
    return {
        'topic_id': topic_id, 'question': question, 'choices_json': json.dumps(options, ensure_ascii=False),
        'correct_index': 'ABCDE'.index(correct), 'explanation': explanation,
        'question_type': 'certo_errado' if len(options)==2 else 'multipla',
        'origin': origin, 'board': meta['board'], 'exam': meta['exam'],
        'year': int(year) if year else None, 'question_number': meta['question_number'],
        'source_url': url, 'license_note': normalize_text(item.get('license_note'))[:500],
        'fingerprint': fingerprint(question, options),
        'choice_rationales_json': json.dumps(rationales, ensure_ascii=False),
        'review_status': 'rascunho',
    }
