"""Motor de IA: gera aulas, questões e flashcards, lê editais e provas, explica erros.

Provedores (variável AI_PROVIDER):
  anthropic  -> API da Anthropic (Claude)
  openai     -> qualquer API compatível com OpenAI (OpenAI, Groq, OpenRouter, Ollama...) via AI_BASE_URL
  gemini     -> Google Gemini
  fake       -> respostas determinísticas, só para testes automatizados
"""
from __future__ import annotations

import json
import os
import re

import requests

from auth import ApiError

DEFAULT_MODELS = {
    "anthropic": "claude-sonnet-5-5",
    "openai": "gpt-5-mini",
    "gemini": "gemini-2.5-flash",
    "fake": "fake",
}

SYSTEM = (
    "Você é professor de cursinho preparatório para concursos públicos no Brasil, com didática clara, "
    "exemplos do dia a dia e foco no que as bancas cobram. Escreva em português do Brasil. "
    "Seja tecnicamente correto. Em Direito, cite o dispositivo legal (artigo e lei) quando existir e não invente "
    "súmulas, artigos ou jurisprudência. Se algo depender de atualização legislativa recente, avise o aluno para conferir."
)


def provider() -> str:
    return os.getenv("AI_PROVIDER", "").strip().lower()


def status() -> dict:
    p = provider()
    enabled = p == "fake" or (p in DEFAULT_MODELS and bool(os.getenv("AI_API_KEY", "").strip()))
    return {"enabled": enabled, "provider": p or None, "model": model() if enabled else None}


def model() -> str:
    return os.getenv("AI_MODEL", "").strip() or DEFAULT_MODELS.get(provider(), "")


def complete(prompt: str, max_tokens: int = 4000, system: str = SYSTEM) -> str:
    p = provider()
    key = os.getenv("AI_API_KEY", "").strip()
    if p == "fake":
        return _fake(prompt)
    if p not in DEFAULT_MODELS or not key:
        raise ApiError(409, "A IA não está configurada. Defina AI_PROVIDER e AI_API_KEY no servidor.")
    timeout = int(os.getenv("AI_TIMEOUT", "120"))
    try:
        if p == "anthropic":
            r = requests.post(
                "https://api.anthropic.com/v1/messages",
                headers={"x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json"},
                json={"model": model(), "max_tokens": max_tokens, "system": system,
                      "messages": [{"role": "user", "content": prompt}]},
                timeout=timeout,
            )
            r.raise_for_status()
            return "".join(b.get("text", "") for b in r.json().get("content", []) if b.get("type") == "text")
        if p == "openai":
            base = os.getenv("AI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
            r = requests.post(
                f"{base}/chat/completions",
                headers={"Authorization": f"Bearer {key}", "content-type": "application/json"},
                json={"model": model(), "messages": [{"role": "system", "content": system},
                                                      {"role": "user", "content": prompt}]},
                timeout=timeout,
            )
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"] or ""
        if p == "gemini":
            r = requests.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/{model()}:generateContent",
                params={"key": key},
                json={"systemInstruction": {"parts": [{"text": system}]},
                      "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                      "generationConfig": {"maxOutputTokens": max_tokens}},
                timeout=timeout,
            )
            r.raise_for_status()
            parts = r.json()["candidates"][0]["content"]["parts"]
            return "".join(x.get("text", "") for x in parts)
    except requests.HTTPError as e:
        detail = e.response.text[:300] if e.response is not None else ""
        raise ApiError(502, f"O provedor de IA recusou o pedido ({e.response.status_code if e.response is not None else '?'}). {detail}")
    except requests.RequestException:
        raise ApiError(502, "Não foi possível falar com o provedor de IA. Verifique a conexão e tente de novo.")
    raise ApiError(409, "Provedor de IA desconhecido.")


def complete_json(prompt: str, max_tokens: int = 6000):
    text = complete(prompt + "\n\nResponda SOMENTE com JSON válido, sem comentários e sem blocos de código.", max_tokens)
    return parse_json(text)


def parse_json(text: str):
    t = text.strip()
    t = re.sub(r"^```(?:json)?\s*|\s*```$", "", t)
    try:
        return json.loads(t)
    except ValueError:
        pass
    for open_c, close_c in (("{", "}"), ("[", "]")):
        a, b = t.find(open_c), t.rfind(close_c)
        if a != -1 and b > a:
            try:
                return json.loads(t[a:b + 1])
            except ValueError:
                continue
    raise ApiError(502, "A IA devolveu uma resposta fora do formato esperado. Tente gerar de novo.")


# ---------------------------------------------------------------------------
# Tarefas pedagógicas
# ---------------------------------------------------------------------------

def _ctx(subject: str, topic: str, role: str = "", banca: str = "") -> str:
    parts = [f"Matéria: {subject}", f"Tópico do edital: {topic}"]
    if role:
        parts.append(f"Cargo/concurso: {role}")
    if banca:
        parts.append(f"Banca: {banca}")
    return "\n".join(parts)


def generate_lesson(subject: str, topic: str, role: str = "", banca: str = "") -> dict:
    prompt = f"""{_ctx(subject, topic, role, banca)}

Escreva a aula completa deste tópico em Markdown, para quem está começando mas precisa chegar ao nível de prova.
Estrutura obrigatória (use exatamente estes títulos de nível 2):
## Para que serve
## Explicação
## Exemplo resolvido
## Como a banca cobra
## Pegadinhas
## Resumo para revisar

Regras: parágrafos curtos; negrito só em termos-chave; listas quando ajudarem; na Explicação, avance do simples ao detalhado
com subtítulos de nível 3; em "Como a banca cobra" mostre o padrão de cobrança e a forma típica do enunciado;
em "Resumo para revisar" no máximo 8 itens curtos. Entre 900 e 1800 palavras.

Devolva JSON: {{"summary": "uma frase dizendo o que o aluno vai dominar", "minutes": número estimado de minutos de leitura atenta, "body": "markdown"}}"""
    data = complete_json(prompt, 8000)
    if not isinstance(data, dict) or not str(data.get("body", "")).strip():
        raise ApiError(502, "A IA não devolveu o texto da aula. Tente de novo.")
    return {"summary": str(data.get("summary", ""))[:300], "minutes": int(data.get("minutes") or 20),
            "body": str(data["body"])}


def generate_questions(subject: str, topic: str, lesson: str = "", n: int = 8, kind: str = "multipla",
                       role: str = "", banca: str = "") -> list[dict]:
    if kind == "certo_errado":
        fmt = ('Cada item é uma afirmação para julgar como CERTO ou ERRADO (estilo Cebraspe). '
               'Formato: {"statement": "...", "answer": "C" ou "E", "explanation": "...", "difficulty": 1-3}. '
               'Equilibre itens certos e errados.')
    else:
        fmt = ('Cada questão tem 5 alternativas. Formato: {"statement": "...", "options": ["...","...","...","...","..."], '
               '"answer": "A".."E", "explanation": "por que a correta está certa", '
               '"rationales": ["por que cada alternativa está certa ou errada, na mesma ordem"], "difficulty": 1-3}. '
               'Distribua a letra correta entre A e E. Distratores plausíveis, sem "todas as anteriores".')
    base = f"\nUse como referência a aula abaixo, mas não copie frases dela:\n---\n{lesson[:9000]}\n---\n" if lesson else ""
    prompt = f"""{_ctx(subject, topic, role, banca)}
{base}
Crie {n} questões inéditas de concurso sobre este tópico, no estilo da banca indicada (se houver), misturando
questões conceituais, de aplicação a casos e de pegadinhas comuns. Dificuldade crescente.
{fmt}
Devolva JSON: {{"questions": [ ... ]}}"""
    data = complete_json(prompt, 9000)
    items = data.get("questions", []) if isinstance(data, dict) else data
    return [q for q in (normalize_question(x, kind) for x in items or []) if q]


def generate_flashcards(subject: str, topic: str, lesson: str = "", n: int = 10) -> list[dict]:
    base = f"\nBaseie-se na aula:\n---\n{lesson[:9000]}\n---\n" if lesson else ""
    prompt = f"""{_ctx(subject, topic)}
{base}
Crie {n} flashcards de memorização para concurso: frente com pergunta direta, verso com resposta curta (até 2 frases).
Priorize conceitos cobrados, prazos, exceções, números e distinções que confundem.
Devolva JSON: {{"cards": [{{"front": "...", "back": "..."}}]}}"""
    data = complete_json(prompt, 4000)
    cards = data.get("cards", []) if isinstance(data, dict) else data
    out = []
    for c in cards or []:
        if isinstance(c, dict) and str(c.get("front", "")).strip() and str(c.get("back", "")).strip():
            out.append({"front": str(c["front"]).strip()[:600], "back": str(c["back"]).strip()[:1200]})
    return out


def parse_edital(text: str, role_hint: str = "") -> dict:
    prompt = f"""Abaixo está o texto (ou parte) de um edital de concurso público.
{('Cargo de interesse: ' + role_hint) if role_hint else ''}
Extraia o conteúdo programático do cargo. Para cada matéria liste os tópicos exatamente como o edital organiza,
quebrando enumerações longas em tópicos estudáveis (um assunto por tópico, sem perder nenhum item).
Se o edital informar quantidade de questões ou peso por matéria, registre. Também identifique banca, órgão,
nome do cargo e data da prova se aparecerem. Use nomes de matérias padronizados (ex.: "Língua Portuguesa",
"Direito Constitucional", "Raciocínio Lógico").

Devolva JSON:
{{"org": "", "banca": "", "role": "", "exam_date": "AAAA-MM-DD ou vazio", "style": "multipla" ou "certo_errado",
  "subjects": [{{"name": "", "questions": 0, "weight": 1, "topics": ["", ""]}}]}}

TEXTO DO EDITAL:
---
{text[:60000]}
---"""
    data = complete_json(prompt, 12000)
    if not isinstance(data, dict) or not data.get("subjects"):
        raise ApiError(502, "Não encontrei o conteúdo programático nesse texto. Envie a parte do edital com as matérias.")
    return data


def extract_exam(prova_text: str, gabarito_text: str = "", style: str = "multipla") -> list[dict]:
    """Extrai questões de um caderno de prova. Processa em blocos para cadernos longos."""
    chunks = _split_exam(prova_text)
    out: list[dict] = []
    for chunk in chunks:
        kind_rule = ('Itens de julgamento CERTO/ERRADO: use "kind": "certo_errado" e "options": [].'
                     if style == "certo_errado" else
                     'Questões de múltipla escolha: "kind": "multipla" e "options" com o texto de cada alternativa, sem a letra.')
        prompt = f"""Converta o trecho de caderno de prova abaixo em dados estruturados. Copie enunciados e alternativas
fielmente (corrija apenas quebras de linha e hifenização do PDF). Se um texto-base for compartilhado por várias
questões, repita-o no início do enunciado de cada uma. Ignore cabeçalhos, rodapés e instruções.
{kind_rule}
Para cada questão sugira a matéria ("subject") pelo assunto. NÃO invente gabarito: deixe "answer" vazio.

Devolva JSON: {{"questions": [{{"number": 1, "kind": "multipla", "statement": "", "options": [], "subject": ""}}]}}

TRECHO:
---
{chunk}
---"""
        data = complete_json(prompt, 12000)
        for item in (data.get("questions", []) if isinstance(data, dict) else data) or []:
            if isinstance(item, dict) and str(item.get("statement", "")).strip():
                out.append(item)
    key = parse_answer_key(gabarito_text) if gabarito_text else {}
    seen = set()
    result = []
    for item in out:
        try:
            num = int(item.get("number"))
        except (TypeError, ValueError):
            continue
        if num in seen:
            continue
        seen.add(num)
        kind = "certo_errado" if (item.get("kind") == "certo_errado" or style == "certo_errado") else "multipla"
        options = [str(o).strip() for o in item.get("options") or [] if str(o).strip()]
        result.append({"number": num, "kind": kind, "statement": str(item["statement"]).strip(),
                       "options": options if kind == "multipla" else [],
                       "answer": key.get(num, ""), "subject": str(item.get("subject", "")).strip()})
    result.sort(key=lambda x: x["number"])
    return result


def _split_exam(text: str, size: int = 14000) -> list[str]:
    text = text.strip()
    if len(text) <= size:
        return [text]
    chunks, start = [], 0
    while start < len(text):
        end = min(len(text), start + size)
        if end < len(text):
            # corta no início de uma questão para não partir enunciados ao meio
            m = list(re.finditer(r"\n\s*(?:QUEST[ÃA]O\s*)?\d{1,3}\s*[\.\)\-–]?\s", text[start + size // 2:end]))
            if m:
                end = start + size // 2 + m[-1].start()
        chunks.append(text[start:end])
        start = end
    return chunks


def parse_answer_key(text: str) -> dict[int, str]:
    """Lê gabaritos em formatos comuns: '1 A', '01-C', '1) E', tabelas 'Questão/Resposta', 'C' 'E' para Cebraspe.
    Itens anulados (X, *, ANULADA) ficam como 'X'."""
    key: dict[int, str] = {}
    norm = text.upper().replace("ANULADA", " X ").replace("ANULADO", " X ")
    for m in re.finditer(r"(?<!\d)(\d{1,3})\s*[\)\.\-–:=]?\s*([A-E]|X|\*)(?![A-Z])", norm):
        n = int(m.group(1))
        if 1 <= n <= 300 and n not in key:
            key[n] = "X" if m.group(2) in ("X", "*") else m.group(2)
    if len(key) >= 5:
        return key
    # Formato em tabela: linha de números seguida de linha de letras
    lines = [ln.split() for ln in norm.splitlines() if ln.strip()]
    for i in range(len(lines) - 1):
        nums, lets = lines[i], lines[i + 1]
        if all(x.isdigit() for x in nums) and all(re.fullmatch(r"[A-EX*]", x) for x in lets) and len(nums) == len(lets):
            for n, l in zip(nums, lets):
                key.setdefault(int(n), "X" if l in ("X", "*") else l)
    return key


def explain_answer(question: dict, chosen: str) -> str:
    opts = "\n".join(f"{chr(65 + i)}) {o}" for i, o in enumerate(question.get("options") or []))
    prompt = f"""Um aluno errou ou ficou em dúvida nesta questão de concurso.
Enunciado: {question['statement']}
{opts}
Gabarito: {question['answer']}
Resposta do aluno: {chosen or '(não respondeu)'}
Explicação já cadastrada: {question.get('explanation') or '(nenhuma)'}

Explique como um professor paciente, em Markdown curto (até 250 palavras): por que o gabarito está certo,
qual o provável raciocínio que levou o aluno ao erro, e uma dica para não errar mais. Se o gabarito parecer
incorreto, diga isso com cuidado."""
    return complete(prompt, 1500)


def tutor(subject: str, topic: str, lesson: str, question: str) -> str:
    prompt = f"""{_ctx(subject, topic)}
Aula que o aluno está lendo (referência):
---
{lesson[:12000]}
---
Pergunta do aluno: {question}

Responda de forma didática e direta em Markdown (até 300 palavras), usando exemplos. Se a pergunta fugir do tópico,
responda brevemente e traga de volta ao que cai na prova."""
    return complete(prompt, 2000)


def grade_discursive(prompt_text: str, rubric: list, model_answer: str, answer: str) -> dict:
    prompt = f"""Corrija a resposta discursiva de um candidato a concurso.
Enunciado: {prompt_text}
Critérios (rubrica): {json.dumps(rubric, ensure_ascii=False)}
Padrão de resposta esperado: {model_answer or '(não informado)'}
Resposta do candidato:
---
{answer[:12000]}
---
Avalie conteúdo técnico e linguagem separadamente. Nota de 0 a 10 orientativa.
Devolva JSON: {{"score": 0-10, "content": "comentário sobre o conteúdo", "language": "comentário sobre a escrita",
"criteria": [{{"name": "", "score": 0-10, "comment": ""}}], "rewrite_tips": ["trecho -> sugestão"]}}"""
    data = complete_json(prompt, 4000)
    if not isinstance(data, dict):
        raise ApiError(502, "A correção veio fora do formato. Tente de novo.")
    return data


def normalize_question(x, kind: str = "multipla") -> dict | None:
    if not isinstance(x, dict):
        return None
    st = str(x.get("statement", "")).strip()
    ans = str(x.get("answer", "")).strip().upper()[:1]
    if not st:
        return None
    if kind == "certo_errado":
        if ans not in ("C", "E"):
            return None
        return {"kind": "certo_errado", "statement": st, "options": [], "answer": ans,
                "explanation": str(x.get("explanation", "")).strip(), "rationales": []}
    opts = [str(o).strip() for o in x.get("options") or [] if str(o).strip()]
    opts = [re.sub(r"^[A-Ea-e][\)\.\-]\s+", "", o) for o in opts]
    if len(opts) < 2 or ans not in "ABCDE"[:len(opts)] or not ans:
        return None
    rats = [str(r) for r in x.get("rationales") or []][:len(opts)]
    return {"kind": "multipla", "statement": st, "options": opts, "answer": ans,
            "explanation": str(x.get("explanation", "")).strip(), "rationales": rats}


# ---------------------------------------------------------------------------
# Provedor falso para testes: devolve conteúdo previsível conforme o pedido
# ---------------------------------------------------------------------------

def _fake(prompt: str) -> str:
    if "conteúdo programático" in prompt:
        return json.dumps({"org": "Órgão Teste", "banca": "Banca Teste", "role": "Cargo Teste", "exam_date": "",
                           "style": "multipla", "subjects": [
                               {"name": "Língua Portuguesa", "questions": 10, "weight": 1, "topics": ["Crase", "Concordância verbal"]},
                               {"name": "Direito Penal", "questions": 15, "weight": 1.5, "topics": ["Legítima defesa"]}]})
    if "caderno de prova" in prompt:
        nums = re.findall(r"(?m)^\s*(\d{1,3})[\.\)]\s", prompt)
        return json.dumps({"questions": [{"number": int(n), "kind": "multipla", "statement": f"Enunciado {n}",
                                          "options": ["um", "dois", "três", "quatro", "cinco"], "subject": "Língua Portuguesa"}
                                         for n in nums]})
    if "Escreva a aula completa" in prompt:
        return json.dumps({"summary": "Resumo de teste", "minutes": 12,
                           "body": "## Para que serve\nTexto.\n## Explicação\nTexto.\n## Exemplo resolvido\nTexto.\n"
                                   "## Como a banca cobra\nTexto.\n## Pegadinhas\n- Uma.\n## Resumo para revisar\n- Item."})
    if "CERTO ou ERRADO" in prompt:
        return json.dumps({"questions": [{"statement": f"Afirmação {i}", "answer": "CE"[i % 2], "explanation": "Porque sim."} for i in range(4)]})
    if "questões inéditas" in prompt:
        return json.dumps({"questions": [{"statement": f"Questão gerada {i}", "options": ["a", "b", "c", "d", "e"],
                                          "answer": "ABCDE"[i % 5], "explanation": "Explicação.", "rationales": []} for i in range(5)]})
    if "flashcards" in prompt:
        return json.dumps({"cards": [{"front": f"Pergunta {i}", "back": f"Resposta {i}"} for i in range(4)]})
    if "resposta discursiva" in prompt:
        return json.dumps({"score": 7, "content": "Bom.", "language": "Clara.", "criteria": [], "rewrite_tips": []})
    return "Explicação de teste."
