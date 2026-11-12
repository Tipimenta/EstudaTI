# Estuda — diagnóstico HTTP público (2026-11-12)

Execução real em GitHub Actions, sem credenciais de usuário.
Não utiliza variáveis do Neon, não faz login e não altera tabelas.

## Render: https://estudati-api.onrender.com/api/health

```json
{
  "http_status": 200,
  "ai": false,
  "counts": {
    "exams": 3,
    "flashcards": 1316,
    "lessons": 362,
    "questions": 351,
    "roles": 12,
    "topics": 417,
    "users": 1
  },
  "database": "postgres",
  "editorial": {
    "migration_applied": true,
    "revision": "2.2-editorial-03",
    "storage": "database",
    "supplements": 169
  },
  "ok": true,
  "schema": "estuda",
  "secret_ok": true,
  "version": "2.2"
}
```

## Vercel: https://estudati.vercel.app/api/health

```json
{
  "http_status": 200,
  "ai": false,
  "counts": {
    "exams": 3,
    "flashcards": 1316,
    "lessons": 362,
    "questions": 351,
    "roles": 12,
    "topics": 417,
    "users": 1
  },
  "database": "postgres",
  "editorial": {
    "migration_applied": true,
    "revision": "2.2-editorial-03",
    "storage": "database",
    "supplements": 169
  },
  "ok": true,
  "schema": "estuda",
  "secret_ok": true,
  "version": "2.2"
}
```

## Saída de `python scripts/verificar_producao.py`

Código de saída: 0

```text
[OK] Render responde: 200
[OK] Versão 2.2: 2.2
[OK] Banco PostgreSQL: postgres
[OK] Esquema isolado: estuda
[OK] APP_SECRET configurado
[OK] Cargos carregados: 12
[OK] Aulas cadastradas: 362
[OK] Aprofundamentos em todos os tópicos: 169
[OK] Revisão editorial do Estuda 2.2: 2.2-editorial-03
[OK] Textos editoriais persistidos em lessons.body
   Contagens (não são dados pessoais): {'roles': 12, 'topics': 417, 'lessons': 362, 'questions': 351, 'flashcards': 1316}
[OK] Vercel encaminha /api/: 200
[OK] Vercel e Render concordam em version
[OK] Vercel e Render concordam em database
[OK] Vercel e Render concordam em schema
[OK] Vercel e Render concordam em secret_ok
[OK] Vercel e Render concordam em counts
[OK] Vercel e Render concordam em editorial

Validação sem falhas nas verificações executadas.
```

## Autenticação
O comando com `--email MEU_EMAIL` não foi executado: o argumento é
um marcador, não uma conta, e a senha pessoal não foi fornecida.
Para testar login, execute localmente e digite a senha no prompt.


## Validação final do downloader de PDF público
Executado: 2026-11-12T13:11:01.648267+00:00

PDF de teste: https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf

**NÃO CONFIRMADO**: ApiError: Não há texto selecionável nesse PDF (provavelmente é escaneado). Passe um OCR antes ou cole o texto.

## Verificação final pós-publicação (sem login)

```text
[OK] Render responde: 200
[OK] Versão 2.2: 2.2
[OK] Banco PostgreSQL: postgres
[OK] Esquema isolado: estuda
[OK] APP_SECRET configurado
[OK] Cargos carregados: 12
[OK] Aulas cadastradas: 362
[OK] Aprofundamentos em todos os tópicos: 169
[OK] Revisão editorial do Estuda 2.2: 2.2-editorial-03
[OK] Textos editoriais persistidos em lessons.body
   Contagens (não são dados pessoais): {'roles': 12, 'topics': 417, 'lessons': 362, 'questions': 351, 'flashcards': 1316}
[OK] Vercel encaminha /api/: 200
[OK] Vercel e Render concordam em version
[OK] Vercel e Render concordam em database
[OK] Vercel e Render concordam em schema
[OK] Vercel e Render concordam em secret_ok
[OK] Vercel e Render concordam em counts
[OK] Vercel e Render concordam em editorial

Validação sem falhas nas verificações executadas.

```
