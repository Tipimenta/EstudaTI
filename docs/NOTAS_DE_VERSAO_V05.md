# Notas de versão 0.5

- Expansão pedagógica original: 27 aulas aprofundadas em 9 disciplinas.
- Cada novo módulo inclui conceito técnico, exemplo resolvido, armadilhas, exercício sem consulta, questões comentadas e flashcards.
- Conteúdo novo: 54 questões e 54 cartões. Total: 117 aulas, 234 questões autorais, 306 cartões.
- UI: filtro entre trilha aprofundada, aulas introdutórias e todas as aulas; fontes de aprofundamento em cada módulo.
- Dados: tabela aditiva `lesson_meta` em SQLite, sem apagar `lesson_progress`, `quiz_answers`, `sessions`, `plan_items`, `flashcards` nem `contests`.
- Gabarito não fica disponível no endpoint de listagem de questões; embaralhamento determinístico de alternativas das novas questões.
- Documentação: fontes verificáveis, matriz de lacunas e exemplo de trilha de 12 semanas.
- Validação: 14 testes Python aprovados, 10 arquivos TS/TSX sem erros de sintaxe, arquivos de material conferidos. O build npm/Docker não foi realizado neste ambiente.

## Ainda não é equivalente a Gran, Estratégia ou Qconcursos

Faltam apostilas exaustivas por tópico, questões oficiais conferidas, videoaulas, tutoria IA real, atualização autônoma segura e testes de front-end no navegador. O conteúdo incluído é autoral e não foi copiado de cursos comerciais.
