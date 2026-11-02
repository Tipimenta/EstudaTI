# EstudaTI V1.2.1 — Adicionar questões, ampliar a base e evitar repetições

## 1. As três formas de alimentar o banco

### Importar um CSV ou JSON

1. Abra o EstudaTI em `http://localhost:8088` e entre em **Banco de questões**.
2. Use o exemplo `examples/questoes_modelo.csv` (ou `.json`) no projeto. Ele aceita até **500 questões por arquivo**, com limite de **2 MB**. Use arquivos menores para revisão em lotes.
3. No Excel, edite uma cópia do CSV; mantenha os nomes das colunas. Em Windows PT-BR, confirme ao salvar em CSV **UTF-8 separado por vírgulas** (não ponto e vírgula).
4. Preencha `subject_code`, `question`, `option_a` a `option_d` ou `option_e`, `correct` (A–E) e `explanation` (comentário de no mínimo 10 caracteres). Para questões certo/errado, use apenas as alternativas A e B.
5. Informe `origin`: `autoral`, `oficial` ou `adaptada`. Para `oficial`, são obrigatórios `year`, `board`, `exam`, `source_url` (HTTPS). Inclua `question_number` e `license_note` quando possível.
6. Se souber o `topic_id` apropriado, use-o. Sem esse campo, a versão atual associa a questão ao **primeiro tópico da disciplina**, o que reduz a precisão da análise por assunto. Não confunda `subject_code` (RED, SEG...) com código de tópico.
7. Importe. O resultado informa: adicionadas, duplicatas descartadas, questões parecidas (para revisar), e inválidas.
8. Filtre o catálogo por **A revisar**, confira enunciado, alternativas, comentário, fonte e gabarito definitivo. Só então marque **Revisada**, para entrar nos simulados.

### Importar provas anteriores PDF

1. Na aba **Biblioteca e provas antigas**, abra **Assistente de importação de prova PDF**.
2. Escolha um PDF digital (até 12 MB) de uma fonte permitida e clique em *Identificar questões no PDF*.
3. Para cada candidato detectado, confira o enunciado e **todas** as alternativas na prova original, marque a questão, selecione o gabarito **definitivo** e redija o comentário.
4. Informe banca, concurso, ano, link HTTPS e disciplina. Confirme permissão de utilização.
5. Importe as questões selecionadas como rascunho. Após conferir a fonte no Banco de questões, marque-as como revisadas.

Limitação: a extração é heurística; provas com colunas, tabelas, imagens, questões que se estendem por páginas ou PDFs digitalizados podem falhar. O leitor **não** obtém nem valida gabarito automaticamente e não faz OCR completo.

### Produzir questões inéditas autorais

Baseie questões no conteúdo do edital, em material oficial ou de licença permitida. Varie **competência** (conceito, aplicação, diagnóstico, comparação, legislação), não apenas números e nomes. Para cada questão, registre a fonte de fundamentação, uma alternativa correta demonstrável e explicação das incorretas. Caso use IA, passe a revisão técnica humana antes de liberar; IA pode inventar fatos ou alternativas.

## 2. Como a nova proteção contra repetição funciona

- **Exata:** importações de mesmo enunciado e mesmas alternativas são ignoradas mesmo com pontuação diferente ou alternativas em outra ordem.
- **Parecida:** textos muito semelhantes na mesma disciplina são importados como rascunho, mas com alerta e identificador da questão correspondente. Não são excluídos automaticamente: diferença de IP, valor, conectivo ou negação pode mudar a resposta.
- **Simulado comum:** prefere questões nunca respondidas e depois as respondidas há mais tempo; evita questões parecidas na mesma prova quando possível.
- **Simulado inteligente:** continua preferindo revisões vencidas, questões inéditas e só depois repetidas, com variedade de tópicos. Repetir em revisão espaçada é **intencional**.
- Se o banco tiver poucas questões com os filtros escolhidos, pode haver repetição. O sistema não inventa questões nem reutiliza a mesma ID no mesmo simulado.

Esses mecanismos são heurísticos, sem embeddings/RAG semântico e não garantem detectar todas as paráfrases. Não use similaridade textual isoladamente para descartar questões oficiais distintas.

## 3. Estratégia de estudo sem decorar gabaritos

Recomendação inicial: no começo do estudo, use **Apenas inéditas**; na manutenção, **Priorizar revisões e questões inéditas**; uma vez por semana, **Simulado misto** por matéria ou banca.

Exemplo de 20 perguntas: 12 inéditas, 5 erros/revisões vencidas, 3 aplicações contextualizadas — apenas como meta de distribuição, não regra fixa implementada no motor. Se não houver variedade suficiente, complete o banco em vez de obrigar o aluno a refazer as mesmas frases.

## 4. Fontes oficiais de provas (links para consultar e baixar conforme condições)

- FGV — Dataprev 2024: https://conhecimento.fgv.br/concursos/dataprev24
- FGV — Dataprev 2026: https://conhecimento.fgv.br/concursos/dataprev26
- Para outros órgãos, use a página do concurso da banca, o edital, a prova e o gabarito definitivo da mesma versão/tipo de caderno.

Não utilize coleta automatizada de plataformas comerciais sem autorização nem redistribua apostilas de terceiros. Questões adaptadas devem ser rotuladas como `adaptada`, nunca como `oficial`.

## 5. Instalação e segurança dos dados

Antes de atualizar, execute `BACKUP_DADOS_WINDOWS.bat` na versão atual. Preserve `.env`, backups e os volumes Docker. Copie o novo código para `C:\Projetos\EstudaTI` e execute `ATUALIZAR_ESTUDATI_WINDOWS.bat`. Não use `docker compose down -v`.

Os arquivos alterados nesta versão foram: `api/question_diversity.py` (novo), `api/main.py`, `api/intelligence.py`, `web/src/QuestionBank.tsx`, `web/src/StudyLibrary.tsx`, testes e esta documentação. O banco existente é preservado; não há migração destrutiva.
