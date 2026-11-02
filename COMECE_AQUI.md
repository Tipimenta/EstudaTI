# EstudaTI V1.2 — Comece aqui

**Se você já usa o EstudaTI no Windows:** leia `COMECE_AQUI_V12.md`, que apresenta o passo a passo seguro de atualização sem perder dados. Faça o backup **antes** de substituir o código.

**Se é uma instalação nova:** abra o Docker Desktop, extraia a pasta `EstudaTI`, execute `INSTALAR_E_ABRIR_WINDOWS.bat`, defina uma senha forte e acesse `http://localhost:8088`.

## O que há nesta versão

- **Nove disciplinas**, 169 aulas (151 preservadas + 18 oficinas de aplicação), 304 registros de questões autorais (303 ativas no banco inicial, uma arquivada), 410 flashcards e 27 dissertativas.
- Em `Matérias e aulas`, abra a disciplina e escolha `Trilha recomendada` (conceitos → oficinas) ou `Oficinas de prova` (somente casos aplicados).
- Cronômetro global, simulados, notas, caderno de erros e IA opcional continuam presentes.
- O material **não** é acervo licenciado de questões antigas, e **não** constitui cobertura integral de todo edital.

## Atualizar com backup

1. Execute `BACKUP_DADOS_WINDOWS.bat` na pasta do sistema atual; confira se o arquivo foi gerado.
2. Copie o conteúdo da pasta `EstudaTI` do ZIP, substituindo o código existente, **sem sobrescrever `.env` e sem excluir volumes ou backups**.
3. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` (tenta fazer outro backup antes de reconstruir os contêineres).
4. Abra `http://localhost:8088` e recarregue com `Ctrl + F5`.

**Se der erro:** execute `docker compose ps` e `docker compose logs --tail=100` no PowerShell, na pasta do projeto. Não execute `docker compose down -v`.

## Correção dissertativa e IA

A correção local dá indícios de escrita, sem nota confiável. A correção generativa com IA requer `OPENAI_API_KEY` no `.env`, conexão com o serviço de API e pode gerar custo adicional. A assinatura do ChatGPT não inclui automaticamente esse uso.

## Guia editorial

Leia `docs/REVISAO_PEDAGOGICA_V12.md` para a matriz das nove matérias, as competências avaliadas e as lacunas que continuam abertas.
