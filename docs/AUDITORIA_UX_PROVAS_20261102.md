# Auditoria de coerência e simplificação do EstudaTI — 02/11/2026

## Proposta validada

O EstudaTI deve permitir estudar para concursos de TI em um fluxo objetivo: **Aulas → Questões → Revisar → Simulados / Provas anteriores → Progresso**. A seção de provas anteriores deve oferecer **cadernos reais para resolver dentro do próprio sistema**, com busca/atualização **somente após clique**, sem exigir download ou importação manual pelo aluno. O catálogo de links pode existir internamente como pesquisa e rastreabilidade, mas não deve ocupar a tela principal.

## Estado encontrado antes desta revisão

- 169 aulas existentes, 625 questões autorais e 507 flashcards no Neon.
- 35 referências no catálogo externo, embora nenhuma delas por si só importasse questões automaticamente: excesso de elementos de navegação sem ação pedagógica.
- 4 cadernos oficiais da **Dataprev 2024 — FGV** integrados por importação manual acionada no site: 257 questões gravadas no banco das provas originais, 0 tentativas de prova no momento da auditoria.
- A contagem de questões oficiais não aparecia no banco de exercícios porque as provas reais vivem em tabela independente. A própria interface dizia falsamente que os simulados autorais misturavam essas questões.
- Tela “Biblioteca de provas” continha simultaneamente catálogo de dezenas de links, importador manual de PDFs, fontes avulsas e importador automático. A lógica de estudo estava fragmentada.
- Falha material de confiabilidade: parte dos enunciados depende de figuras, trechos anteriores ou destaque tipográfico não preservado. Várias alternativas E traziam **rodapé, títulos de seção ou introdução de outro texto** anexados. A simples comparação do número da questão com o gabarito oficial não garante que o enunciado esteja íntegro.
- Exportação de backup não incluía as tabelas novas de provas anteriores.
- Histórico de desempenho não contabilizava provas oficiais resolvidas separadamente.
- Alguns flashcards de questões gerais eram classificados incorretamente sob disciplinas técnicas.

## Correções implementadas sem apagar dados

1. **Tela única de Provas anteriores**. Remove da UI o mural de 35 links e o segundo importador de PDF. Mostra somente cadernos realmente disponíveis para resolução; um botão principal pesquisa/importa/atualiza o conjunto compatível. Os links do PDF e gabarito continuam apenas em detalhes opcionais de cada prova para rastreabilidade.
2. **Navegação simplificada**. Mantém cinco abas principais (Início, Aulas, Questões, Revisar e Progresso). Exibe Provas anteriores, Simulados por matéria, Plano e Concursos em grupo secundário. Funções complementares foram recolhidas como “Ferramentas opcionais”, preservando suas rotas.
3. **Treino autoral não é prova oficial.** Banco de questões mostra a contagem real de itens dos cadernos importados, inclui atalho para a seção correta e recolhe a importação CSV/JSON em um painel opcional. Simulados por matéria informam claramente que utilizam o banco de estudos; há atalho para prova oficial.
4. **Auditoria do extrator de PDF**. Verifica referências a texto externo, figuras, tabela/código não incluído, destaque perdido, enunciados curtos e cabeçalhos anexados às alternativas. Quando há marcador de rodapé identificável, recorta apenas o marcador. Quando faltam informações relevantes, a questão é bloqueada. O gabarito nunca é inferido pela IA.
5. **Revisão não destrutiva do material já importado**. Registros existentes são reavaliados sem downloads ao iniciar a API. Itens suspeitos ficam bloqueados; eventuais correções automáticas de rodapé são registradas na tabela de auditoria `official_exam_repairs`. Tentativas, questões autorais, aulas e flashcards são preservados. Na próxima atualização por clique, o extrator revisado substitui itens aptos e bloqueia os demais sem manter liberações antigas.
6. **Progresso e backup**. Relatório de desempenho mostra tentativas oficiais e percentual de acerto separados dos exercícios autorais. Exportação JSON passa a conter fontes, questões, tentativas e log de reparos do acervo oficial. Corrigido texto de localização dos dados (Neon na nuvem; SQLite no Docker local).
7. **Flashcards**. Questões de Português e Raciocínio Lógico recebem disciplina correta; Inglês/Atualidades sem trilha própria não são atribuídas indevidamente à especialidade técnica.

## Limites concretos que permanecem

- **O botão não pesquisa genericamente a Internet inteira.** Nesta versão, verifica fontes **predefinidas da FGV/Dataprev 2024**, com extração de gabarito definitivo por cargo e tipo. A ampliação para INSS, IBGE, VUNESP, FAPEC, COMPERVE etc. requer parser e fontes confiáveis para cada banca. Não exibir essas fontes como “importadas”.
- **Não há revisão editorial de 100% das questões originais.** A verificação conservadora automatizada não garante fidelidade absoluta, especialmente quando PDF usa destaque gráfico, imagens ou textos comuns a várias questões. Itens suspeitos não devem contar como disponíveis.
- **Correção de provas reais** usa a alternativa oficial; comentário explicativo pedagógico ainda não é gerado automaticamente para todas as questões. Não afirmar que já existem justificativas detalhadas de todas as alternativas.
- Questões comuns a cadernos diferentes são intencionalmente preservadas quando fazem parte da prova original; não duplicar essas questões no banco autoral.
- Não instalar cron/scraper automático e não contratar serviços pagos. O fluxo continua exclusivamente sob demanda pelo botão.
- Reproduzir material oficial depende das condições de uso da fonte; app pessoal com acesso autenticado não deve ser divulgado como repositório público de cadernos sem autorização.

## Critérios de verificação

- GitHub Actions: testes Python, frontend Vite/TypeScript, integração PostgreSQL e testes de qualidade do PDF.
- Render Free com `autoDeploy=no`: exige disparo manual de deploy a cada alteração de API; confirmar `/api/health` com `database=ready` antes de avaliar UX.
- Vercel: exigir deployment de produção do commit final após as modificações.
- Neon: verificar itens liberados e bloqueados por concurso após o novo backend iniciar; preservar contagens das questões autorais e histórico de aulas.
