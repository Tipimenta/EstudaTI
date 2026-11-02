# V1.0 — Registro de testes executados

**Realizados no ambiente de desenvolvimento da entrega:**

- 16 testes de integração Python/FastAPI aprovados (`PYTHONPATH=api python -m pytest -q`). Abrangem autenticação, questão, simulados, PDF sem texto, migração, flashcards, orientador inteligente, prioridade, histórico e tutor local.
- Migração real de banco v0.5: banco com 117 aulas, anotação e sessão de 30 minutos -> V1 com 151 aulas, mantendo anotação e sessão.
- Sintaxe dos 13 arquivos TypeScript/TSX: `typescript.transpileModule` sem erros sintáticos.
- Integridade ZIP verificada.

**Não realizados neste ambiente:**

- Instalação npm (registro inacessível: `EAI_AGAIN registry.npmjs.org`). Sem npm, não foi possível rodar `vite build` e checar tipos com as dependências React/ícones.
- Docker Compose real e navegador Windows, pois Docker não está instalado neste ambiente.
- Uma chamada real à OpenAI API, por não haver credenciais do usuário.
- Importação automática de quaisquer provas de terceiros sem revisão humana: a extração ainda é assistida.

Os testes de backend em SQLite local não são substitutos de homologação completa em Windows. As rotas de IA e o novo frontend precisam de teste na sua máquina.
