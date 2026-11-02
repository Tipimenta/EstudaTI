# EstudaTI — auditoria de duplicidade, coerência e funcionamento (V1.1.1)

**Base auditada:** o pacote V1.1, sem dados pessoais locais do usuário. A análise foi realizada no código-fonte e na base de conteúdos gerada pelo instalador; não equivale a teste de interface no Windows do usuário. **Versão V1.1.1:** correções conservadoras descritas abaixo.

## Inventário verificado

| Item | Encontrado no banco inicial |
|---|---:|
| Disciplinas | 9 |
| Aulas/tópicos | 151 (90 introdutórias, 61 aprofundamentos) |
| Questões objetivas autorais | 268 registros; 267 ativas após arquivar 1 duplicata exata |
| Questões oficiais incluídas de fábrica | 0 |
| Flashcards | 374 |
| Questões dissertativas autorais | 27 (3 por disciplina) |
| Concursos cadastrados | 7 (vários sem verificação/data/salário) |

## Problemas confirmados e tratados nesta atualização

1. **Build do frontend:** `web/src/App.tsx` utilizava `FileText` no menu sem importar o ícone. Corrigida a importação de `lucide-react`. A ausência poderia causar erro de compilação `TS2304`.
2. **Rascunho de discursiva:** ao navegar entre exercícios, um efeito gravava a resposta da seleção anterior na chave de armazenamento do novo exercício; havia risco de perda do rascunho. O salvamento agora acontece na digitação, vinculado ao ID da questão.
3. **Progresso inconsistente:** na tela geral de matérias, o numerador considerava **todas** as aulas concluídas, e o denominador apenas as aprofundadas. O indicador agora mostra `X de Y aulas concluídas`, com cálculo coerente.
4. **Apostila com clique sem efeito:** na trilha aprofundada, os capítulos introdutórios listados não tinham aulas com título correspondente no filtro atual. Agora, clicar nesses capítulos abre seu conteúdo complementar na própria tela, mesmo sem troca de aula.
5. **Questão literal duplicada:** o enunciado "Qual afirmação sobre consentimento na LGPD está correta?" aparecia duas vezes, com respostas equivalentes. A segunda cópia autoral é **arquivada**, não apagada. Seu ID, gabarito e histórico são preservados; a migração acontece apenas uma vez. Ela continua acessível por `Banco de questões > Arquivada`, podendo ser reativada manualmente.
6. **Nomes de arquivos:** seis apostilas tinham nomes corrompidos ao serem armazenadas no ZIP (`├` etc.). Agora usam nomes ASCII estáveis, preservando o conteúdo.
7. **Documentação antiga:** `docs/ROADMAP.md` descrevia etapas antigas como futuras. O arquivo foi sinalizado como histórico e vinculado a esta auditoria.
8. **Execução de testes:** incluído `pytest.ini` para rodar `python -m pytest` desde a raiz do projeto, sem precisar configurar `PYTHONPATH` manualmente.

## Repetições que permanecem (identificadas, não removidas automaticamente)

Existem **assuntos próximos** nas trilhas de introdução e aprofundamento. Exemplos: `Git: commits, branches e merges` / `Git: commit, branch e merge`; `NIST CSF 2.0 e governança` / `NIST CSF 2.0 e função Govern`; `Coesão: referência e conectivos` / `Coesão, coerência e conectivos`. Essas repetições podem ser didáticas, mas precisam diferenciar claramente **fundamento → aplicação → cobrança da banca**, evitando reexplicação superficial.

Há ainda questões objetivas semanticamente semelhantes sobre `LEFT JOIN`, filtro `WHERE`, gestão de problemas e princípio da necessidade na LGPD. **Não foram arquivadas automaticamente**, pois possuem enunciados diferentes e podem representar prática deliberada de conceitos. Recomenda-se revisão editorial humana para diversificar cenários e exigência cognitiva.

Não foram encontrados **títulos nem enunciados idênticos** dentro das 27 discursivas iniciais.

## Problemas importantes ainda pendentes

- **Profundidade pedagógica:** as 90 aulas introdutórias têm mediana aproximada de 116 palavras, e os 61 aprofundamentos, de 206 palavras. Isso ainda **não caracteriza um curso exaustivo** comparável a apostilas comerciais extensas; é necessário ampliar exemplos e exercícios por edital, com revisão técnica e linguística.
- **Organização de navegação:** o menu possui 17 itens; Orientador/Cronograma, Tutor/Discursivas e Fontes/Editais têm pontos de contato. Sugere-se agrupá-los em `Estudar`, `Praticar`, `Planejar`, `Concursos` e `Configurações`, sem eliminar funções ou histórico.
- **Concursos:** há sete registros de referência, mas alguns dados de data, salário e lotação estão vazios; o monitor informa mudanças de páginas, não confirma retificações automaticamente. Todos os fatos de edital devem passar por conferência oficial antes de dirigir o planejamento.
- **RAG:** a busca é textual/lexical e local. Não utiliza índice vetorial e pode recuperar trechos de relevância limitada. A correção por IA não foi validada contra um conjunto de respostas avaliadas por especialistas.
- **Questões oficiais:** o pacote não contém questões de provas antigas já transcritas e verificadas. A importação continua assistida por revisão manual.
- **Visão geral:** progresso e acertos dependem de dados reais do usuário; marcar uma aula concluída não confirma domínio. Não usar somente porcentagem de aulas para estimar aprovação.
- **Reprodutibilidade do frontend:** não há `package-lock.json`; `npm install` pode resolver novas versões permitidas pelo `package.json`. Recomenda-se gerar e versionar o lockfile após o primeiro build validado.
- **Acessibilidade / experiência móvel:** testes de ponta a ponta com navegador e dispositivos reais ainda não executados.

## Testes executados nesta revisão

- **21 testes automatizados da API aprovados** (incluindo regressões do arquivamento e reativação de questão repetida).
- **Inventário e verificação de duplicidade** a partir de banco SQLite inicial criado pelo backend.
- **Verificação sintática dos componentes React/TypeScript:** verificação de código-fonte; não equivale à compilação completa.
- **Build completo do frontend:** **não validado** neste ambiente, devido à indisponibilidade de dependências npm e do Docker em execução. Os reparos de interface precisam de verificação visual no Windows.

## Atualização segura no Windows

1. No EstudaTI que já funciona, execute `BACKUP_DADOS_WINDOWS.bat` e confirme o backup criado.
2. Extraia o novo ZIP, copie **o conteúdo da pasta EstudaTI** para `C:\Projetos\EstudaTI`, preservando `.env`, backups e volumes do Docker.
3. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` e confira `docker compose ps`.
4. Abra `http://localhost:8088` e faça recarga forçada (`Ctrl+F5`).
5. Verifique o menu de discursivas, rascunhos individuais, contador de matérias e capítulos de apostila. Não rode `docker compose down -v`.

**Princípio:** esta atualização não apaga questões nem tentativas, não reescreve anotações, não substitui seu banco e não altera os projetos CiberInsight e CMO.
