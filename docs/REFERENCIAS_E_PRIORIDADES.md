# EstudaTI — Referências open source e evolução orientada por qualidade (02/11/2026)

> **Análise técnica**, não implementação concluída. Repositório EstudaTI separado de CyberInsight e CMO.

## Fontes consultadas e lições aproveitáveis

| Referência | Recurso observado | Ideia apropriada ao EstudaTI |
|---|---|---|
| [Track Concursos](https://github.com/michel-softwares/track-concursos) | Editais verticalizados, ciclo flexível, prioridades e materiais vinculados por tópico | Importador de edital com hierarquia e mapa de cobertura verificável; ciclo adaptativo |
| [Banco-Questoes](https://github.com/feliperjj/Banco-Questoes) | Funil PDF/DOCX → extração → questões/gabaritos → evidência → revisão humana; versões imutáveis | Importar provas oficiais com rastreabilidade, pendências independentes para enunciado e gabarito |
| [Moodle — banco de questões](https://docs.moodle.org/503/en/question_bank) | Questões com status, versões, histórico de uso e dados de qualidade | Ciclo rascunho → revisada → publicada → arquivada, sem apagar respostas anteriores |
| [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | Algoritmo de repetição espaçada FSRS | Substituição **opcional** do algoritmo atual, com migração do histórico, replay e testes; versão atual exige Node >=24 |
| [ExamCopilot](https://github.com/nobleqbit/examcopilot) | Explicações por alternativa, adaptação por dificuldade, FSRS | Priorizar explicações de cada distrator; testar adaptação só com dados suficientes |
| [Agentic RAG Tutor](https://github.com/vdeeplearning/agentic-rag-tutor) | Recuperação de trechos, respostas citadas, verificação de evidência | IA responde/corrige a partir de fontes verificadas; recusa julgamento sem material suficiente |

**Direitos autorais:** usar referências como inspiração de arquitetura e UX. Não copiar código sem verificar licença nem importar materiais comerciais protegidos.

## Fotografia técnica verificada no ZIP EstudaTI V1.2.1

- `api/pdf_import.py`: extrai candidatos de PDF usando regex de enunciados e alternativas; não analisa todos os layouts, gabaritos ou imagens.
- `api/question_diversity.py`: fingerprint SHA-256 da questão + alternativas normalizadas; similaridade lexical por Jaccard e `SequenceMatcher`. Não identifica paráfrases semânticas.
- `api/intelligence.py`: priorização heurística e repetição estilo SM-2 (`ease` e intervalos), não FSRS nem modelo de previsão de aprovação.
- `api/discursive_api.py`: recupera trechos por termos coincidentes, não embeddings; a avaliação por IA é opcional, não gabarito oficial.
- `web/Dockerfile`: build com `node:22-alpine`. Biblioteca `ts-fsrs` v6 requer Node 24 ou superior; migrar só após avaliar impactos.

## Ordem de implementação recomendada

### P0 — Publicação segura e preservação de dados (bloqueia uso pela nuvem)

1. Publicar código no GitHub por importação única do pacote V1.2.1, com exclusão de dados pessoais, secrets e binários particulares.
2. Build real frontend, teste API e verificação de segurança em CI antes do deploy.
3. Backend persistente: configurar FastAPI + PostgreSQL hospedado (ou alternativa com persistência garantida) e migração idempotente do SQLite; preservar local Docker.
4. Autenticação segura, limites de requisições, HTTPS, variáveis privadas de ambiente, backups e restauração.
5. Criar Vercel Preview e só liberar produção depois de smoke test de login, resposta, tempo de estudo, discursiva, salvamento e retorno.

**Critério de aceite:** iniciar estudo no Android, responder questões e ver os mesmos dados após reload, novo deploy e reinício do backend, sem perdas nem dados expostos.

### P1 — Banco oficial confiável e não repetitivo

1. Separar questão **oficial validada**, **autoral** e **gerada por IA**; manter origem, banca, ano, cargo, versão, caderno, número oficial, página, link de prova e fonte de gabarito.
2. Pré-visualização de importação com percentuais por lote e pendências; conferência de gabarito preliminar/definitivo, anulação e caderno.
3. Duplicata textual exata + similaridade semântica com limiar conservador, nunca excluir automaticamente questões com sentido diferente.
4. Versão imutável de questão e gabarito para preservar tentativas, uso e auditoria.
5. Classificar por subassunto do edital, não jogar questões sem classificação na primeira aula.

**Critério:** cada questão oficial publicada permite abrir o documento fonte e explicar por que aquela alternativa é correta.

### P1 — Ensino que gera domínio e não só conclusão

1. Estruturar currículo para cada edital em matéria > assunto > subtópico > objetivos > teoria > exemplo > exercícios > revisão.
2. Auditar profundidade: tópicos contemplados, confiabilidade de fontes, dificuldade e variação de raciocínio.
3. Priorizar explicações de cada alternativa errada, casos de TI e exercícios graduados.
4. Histórico de erros por conceito e transferência de habilidade para cenário novo.

**Critério:** objetivos de aprendizagem validados com exercícios inéditos de formatos diversos.

### P2 — Revisão e personalização adaptativa

1. Manter histórico separado de `question_attempts` e `flashcard_reviews` e definir versões de agendamento.
2. Comparar algoritmo atual com FSRS em testes reproduzíveis; não alterar intervalos existentes sem migração.
3. Só considerar IRT/adaptação calibrada após volume suficiente de questões e tentativas: evitar pontuação ilusória com amostras pequenas.
4. Ciclo de estudo com peso do edital, data, dificuldade, revisões vencidas e tempo disponível.

### P2 — IA/RAG auditável nas discursivas

1. Indexação de documentos permitidos com origem, trecho, versão e página; separar retrieval e avaliação.
2. Espelho/rubrica por critério, conteúdo separado de forma e comentários por trecho original.
3. Resposta melhorada **sem inventar** ideias que o aluno não apresentou, e modelo ideal identificado à parte.
4. Teste com respostas de referência e verificação de citações. Resultado de IA como **estimativa**, não nota oficial.

## Não fazer

- Não adicionar milhares de questões para inflar contagem sem validade e proveniência.
- Não rotular conteúdo gerado por IA como oficial.
- Não copiar apostilas comerciais ou códigos com licenças incompatíveis.
- Não colocar SQLite temporário em produção sem garantia de persistência.
- Não modificar os outros projetos da conta GitHub.

## Próxima entrega concretamente necessária
Concluir primeiro **P0 (código no GitHub + deploy funcional e seguro)**, depois banco oficial e qualidade pedagógica. A versão V1.2.1 atual ainda não está publicada.
