# EstudaTI V1.3.0 — Ensino orientado a evidências

Data de empacotamento: 02/11/2026. Esta versão atualiza a V1.2.1 **sem substituir** respostas, notas, cronogramas, questões importadas ou progresso.

## Inspirações técnicas estudadas (não copiadas)

- **Track Concursos**: hierarquia dos editais, peso dos tópicos e ciclo de revisão. https://github.com/michel-softwares/track-concursos
- **Banco-Questoes**: importar caderno+gabarito, registrar evidências e exigir revisão humana sobre resultados duvidosos. https://github.com/feliperjj/Banco-Questoes
- **ExamCopilot**: questões com justificativas por opção e adaptação baseada no desempenho, com cautela na inferência estatística. https://github.com/nobleqbit/examcopilot
- **ts-fsrs**: algoritmos maduros de repetição espaçada para estudo futuro. https://github.com/open-spaced-repetition/ts-fsrs

Foram reaproveitadas **ideias** de produto, não apostilas, questões de concursos, códigos nem materiais protegidos dos projetos. A V1.3 não implementa IRT, FSRS, OCR universal, extração de gabarito definitivo nem busca vetorial: prometer isso seria impreciso.

## Mudanças efetivamente implementadas

### 1. Liberação de questões oficiais com conferência independente

1. Questões importadas entram em `rascunho`, indisponíveis nos simulados.
2. No **Banco de questões**, encontre uma de origem `oficial` e selecione **Conferir fonte e gabarito**.
3. Abra o caderno oficial e confira: cargo e tipo de prova, número, página, enunciado e todas as alternativas. Marque a primeira confirmação.
4. Abra o **gabarito definitivo**, confirme a letra e eventual anulação, informe o URL HTTPS e marque as outras duas confirmações.
5. Salve a conferência e somente então clique **Marcar revisada**.
6. A plataforma registra o histórico de conferência e mudanças de estado em tabelas próprias (`question_quality`, `question_audit`).

Importante: a ferramenta **não acessa os documentos automaticamente para confirmar a correção**. O check indica declaração humana, não verificação independente.

O endpoint de submissão de simulados também rejeita IDs que ainda estão em rascunho, anulados ou arquivados; a proteção não depende somente da interface.

### 2. Matriz de cobertura do edital, preenchida pelo estudante

Acesse **Matriz de editais**:
- Selecione um concurso da lista existente.
- Transcreva um tópico real do conteúdo programático do cargo e informe seção ou página.
- Marque que ele foi conferido no edital oficial, quando verdade.
- Opcionalmente vincule-o a uma aula da **mesma matéria**; o sistema rejeita vínculos cruzados.
- Os indicadores distinguem tópico **não conferido**, **sem aula**, **aula pendente**, **pouca prática** (menos de cinco questões distintas) e **precisa de reforço**.

O estágio "Praticado" é um indicador operacional com base na última resposta por questão distinta e um limite mínimo de cinco itens; **não significa preparação garantida nem cobre automaticamente todo o edital**. A matriz é manual: novos itens não são inventados a partir de palavras-chave do PDF.

Excluir um item desta matriz **não apaga** a aula, a anotação, o simulado nem qualquer histórico.

### 3. Questões autorais mais instrutivas

- 18 questões autorais de **cenário e aplicação**, duas por disciplina (RED, SEG, SO, POR, GOV, BD, ENG, LOG, LEG), vinculadas a aulas específicas.
- Cada uma contém comentários de **todas as quatro alternativas** (por que a correta é correta e cada distrator não corresponde ao enunciado).
- A correção dos simulados passa a exibir esses comentários quando existem.
- O importador CSV/JSON aceita campos opcionais `explanation_a`, `explanation_b`, `explanation_c`, `explanation_d`, `explanation_e` para suas futuras questões; os novos itens não são classificados como oficiais.
- As 18 questões são carregadas **idempotentemente**: reiniciar não as multiplica.

**Contadores novos (primeira instalação):** 9 disciplinas, 169 aulas, 322 questões cadastradas, **321 ativas** (sendo uma duplicata anterior arquivada) e 18 questões novas com justificativas por alternativa. Não significa cobertura exaustiva dos concursos.

## Compatibilidade e persistência

- O banco SQLite local mantém o volume Docker já existente. A migração acrescenta colunas e tabelas, sem excluir as antigas.
- O backup deve ser feito antes da atualização. **Nunca use `docker compose down -v` para atualizar.**
- `OPENAI_API_KEY` e outras configurações sensíveis pertencem exclusivamente ao `.env` local, nunca ao GitHub.
- O repositório privado `Tipimenta/EstudaTI` e a implantação futura na Vercel são uma etapa separada: **o frontend na Vercel, sozinho, não salva dados sem API persistente e autenticação segura**.

## Testes automatizados da V1.3

Cobertura acrescentada em `tests/test_quality_syllabus_v13.py`:
- Questão oficial não é liberada sem caderno e gabarito conferidos.
- Não é possível submeter questões não liberadas nem por chamada direta à API.
- URL de gabarito inválida não é aceita.
- Histórico auditável registra mudanças.
- Vínculo de tópico à aula de outra matéria é rejeitado.
- Tópicos duplicados no mesmo edital são recusados.
- Exclusão da matriz não remove o histórico de aulas.
- Reinicialização da migração não duplica questões nem registros.
- Justificativas das alternativas ficam disponíveis na correção.

Não foi possível executar o build completo React/Vite neste ambiente devido à indisponibilidade do registro npm. O GitHub Actions executará `npm install` e `npm run build` após importar o ZIP, para detectar erros antes de registrar o código na branch.

## Melhorias ainda pendentes

1. Banco oficial com classificação automática por tema/subtema e gabaritos versionados com conferência documental verificável.
2. Prévia semântica de duplicatas (com embeddings ou outro método), sem descarte automático.
3. Migração para backend e banco persistentes na nuvem; autenticação e backups adequados.
4. Integração de RAG com documentos de fonte permitida, página e versão; avaliação discursiva auditada.
5. Revisão espaçada opcional por FSRS após testes de migração de histórico; IRT somente com amostra/calibração suficiente.
