> **Documento histórico (até V0.3).** Para a auditoria e pendências atuais da V1.1.1, consulte `AUDITORIA_V1.1.1.md`. Algumas metas previstas aqui foram parcialmente implementadas em versões posteriores.

# EstudaTI — estado real e próximas entregas

## Concluído até V0.3

- API local, login, dashboard, controle de sessões, cronograma e histórico.
- Banco com **180 questões autorais**, **90 aulas**, **252 flashcards**, 9 matérias.
- Exportação de apostilas Markdown, base JSON/CSV e arquivo `EstudaTI_Offline.html` autônomo.
- Biblioteca com links oficiais a provas e materiais de referência.
- Importação de questões CSV/JSON e aprovação manual de registros.
- Importação **assistida** de prova PDF: retorna candidatos quando o layout permite; não inventa gabarito.
- Importação exploratória de edital PDF com páginas/trechos e palavras-chave.
- Mapa de cobertura por tópico e disciplina, diferencia questões distintas.
- Cronograma heurístico em três blocos (revisão, teoria, questões).
- Monitoramento por hash de páginas cadastradas (avisa mudança; não interpreta retificações).
- Backup íntegro de SQLite por ferramenta CLI, exportação JSON e testes automatizados.

## Limitações e próximos desenvolvimentos

### V0.4 — Qualidade pedagógica e banco oficial

1. Aprimorar heurísticas para PDF de provas em colunas, alternativas com imagens e tabelas.
2. Vincular questões a subassuntos com classificação e **revisão humana**.
3. Modos de prova específicos: critérios próprios de pontuação e penalidade conforme edital.
4. Filtro por tipo de caderno (tipo 1, 2), anulações e revisões de gabarito.
5. Mais exercícios e apostilas para todo programa de português, matemática e conhecimentos gerais.

### V0.5 — Professor IA com fontes

1. IA opcional, com chamada pelo backend e custos controlados pelo usuário.
2. Explicação das alternativas com fontes identificadas e sinalização de incerteza.
3. Perguntas socráticas, prática de recuperação ativa e exemplos graduados.
4. Criar exercícios **autorais**, jamais rotular como prova oficial.

### V0.6 — Acompanhamento de editais e metas

1. Integração com APIs/RSS oficiais quando permitidas; leitura semiautomática de retificações.
2. Matriz por edital: tópico, presença, profundidade, peso e prazo; revisão e confirmação manual.
3. Replanejar com peso e proximidade real da prova, não apenas acertos.
4. Painel de notificações/alertas sobre mudanças **verificadas**.

### V1.0 — Publicação para uso contínuo

1. Endurecimento de autenticação e teste de segurança.
2. HTTPS/VPN e operação remota segura.
3. Migrar para PostgreSQL se necessário; migrações versionadas e backup/restauração na interface.
4. Pipeline de testes frontend e E2E; build Docker testado em ambiente real.
5. Revisão da qualidade dos conteúdos e conformidade com licenças de fontes.

## Princípios permanentes

CiberInsight e CMO são sistemas **independentes e intocados**. Questão autoral nunca é apresentada como prova real. Retificação só entra como verdade após fonte oficial verificada. Aprovação da pós-graduação não substitui apresentação de certificado/declaração para progressão ou incentivo.
