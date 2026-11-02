# EstudaTI — GOV: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# ITIL: incidente, problema, mudança e serviço

# Objetivo e contexto
Classificar casos e organizar fluxo de atendimento e melhoria contínua.

## Aula detalhada — entenda o mecanismo
**Gestão de incidentes** busca restaurar o serviço normal o mais rapidamente possível, limitando o impacto. **Gestão de problemas** identifica e gerencia causas e riscos subjacentes de um ou vários incidentes; pode resultar em workaround e erro conhecido. **Habilitação de mudanças (change enablement)** avalia riscos e coordena alterações para elevar o sucesso, sem exigir um ritual burocrático idêntico para toda mudança. **Service request** trata pedidos usuais e predefinidos, como acesso ou fornecimento de equipamento.

SLAs expressam compromissos de nível de serviço, como disponibilidade e prazo; OLAs descrevem acordos operacionais internos; contratos com fornecedores podem empregar compromissos de suporte. Indicadores úteis: incidentes por criticidade, tempo de restauração, recorrência, mudanças malsucedidas, satisfação e incidentes reabertos. **SLA não é o mesmo que tempo médio de resolução.** O tempo pode depender da prioridade e horário de operação.

A perspectiva de valor do serviço considera cliente, usuário, resultados, custos e riscos. ITIL 4 descreve práticas e princípios orientadores, mas a instituição pode adaptar processos à sua maturidade. Uma requisição de acesso não vira automaticamente incidente apenas porque foi registrada em service desk.

## Exemplo resolvido passo a passo
Exemplo: setor relata que o PACS ficou indisponível. É incidente; o suporte restabelece temporariamente. Uma investigação identifica saturação recorrente de armazenamento: é problema. Uma alteração programada de configuração, com teste e plano de retorno, passa por mudança. Novo usuário solicita acesso ao RIS: pedido de serviço.

Você implementa triagem: gravidade definida por impacto e urgência, registro de horário, responsável, comunicação de status e escalonamento. Após restaurar, registra causa provável e decide se investigação de problema será aberta. A prova pode dizer que gestão de problema “tem como objetivo principal restaurar rapidamente”; isso descreve sobretudo incidente.

## Erros clássicos nas bancas
**Pegadinha:** incidente e problema podem coexistir; não são mutuamente excludentes. **Pegadinha:** priorização exige impacto e urgência, não apenas “ordem de chegada” em todos os casos. **Pegadinha:** change enablement não se limita a aprovar compras; trata controle de mudanças em produtos e serviços. **Pegadinha:** número de tickets fechados não mede isoladamente qualidade do atendimento.

## Pratique sem consultar
Classifique cinco ocorrências de TI entre incidente, problema, mudança e solicitação: senha resetada, aplicativo indisponível, causa recorrente de crash, atualização planejada e pedido de monitor. Crie uma matriz de prioridade com impacto x urgência e explique quando informar gestores.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
PeopleCert — ITIL (referência oficial do framework): https://www.peoplecert.org/frameworks/itil-framework
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual prática de gestão de serviços visa restaurar operação normal com rapidez após interrupção?

A) Gestão de incidentes
B) Gestão de problemas exclusivamente
C) Gestão de portfólio
D) Gestão de orçamento

**Gabarito:** A — Incidentes se concentram em restauração do serviço; problemas investigam causas subjacentes.

**Questão 2.** Uma investigação da causa recorrente de falhas em um banco de dados é principalmente:

A) Gestão de problemas
B) Solicitação padrão de serviço
C) Gestão de capacidade humana exclusivamente
D) Provisionamento de conta

**Gabarito:** A — Gestão de problemas investiga causas e reduz probabilidade/impacto de incidentes repetidos.


---

# Governança x gestão, COBIT e PDTI

# Objetivo e contexto
Separar definição de direção, execução de controles e planejamento de TI.

## Aula detalhada — entenda o mecanismo
**Governança** avalia necessidades, define direção e acompanha resultados/prestação de contas. **Gestão** planeja, constrói, executa e monitora atividades para alcançar diretrizes. No COBIT, domínios de governança incluem **EDM** (Evaluate, Direct and Monitor) e domínios de gestão incluem **APO, BAI, DSS e MEA**. Não é necessário decorar siglas isoladas: associe cada domínio à sua responsabilidade.

Um **PDTI** (Plano Diretor de Tecnologia da Informação) traduz necessidades institucionais em objetivos, iniciativas, prioridades, recursos, riscos e métricas para período definido. Sua elaboração envolve diagnóstico, alinhamento estratégico, planejamento, aprovação e acompanhamento. Um inventário de equipamentos é insumo, não substitui PDTI. O comitê/autoridade de governança decide prioridades e tolerância a riscos; a equipe de TI estrutura execução e acompanhamento.

**Indicadores** devem refletir resultados: disponibilidade crítica, tempo de restauração, custo total por serviço, satisfação do usuário, conformidade, entregas e risco residual. Métricas de volume sem contexto (“número de tickets”) não necessariamente indicam valor. Em concursos públicos, conecte PDTI a planejamento de contratações e transformação digital sem presumir que todo ente siga norma federal idêntica.

## Exemplo resolvido passo a passo
Uma prefeitura precisa escolher entre renovar 100 computadores e modernizar conectividade das UBS. A governança define prioridades ligadas à missão e critérios como impacto no cidadão, risco e custo. A gestão levanta requisitos, estimativas e viabilidade, elabora iniciativas com responsáveis e cronograma.

PDTI exemplo: objetivo = aumentar disponibilidade dos sistemas críticos de 97% para 99,5% em 12 meses; iniciativa = monitoramento e redundância de links; responsável = coordenador de infraestrutura; indicador = disponibilidade medida; risco = orçamento insuficiente; revisão = trimestral. Isso é mais auditável do que “melhorar a internet” sem meta.

## Erros clássicos nas bancas
**Pegadinha:** COBIT é governança e gestão, não ferramenta de antivírus. **Pegadinha:** indicadores não precisam ter objetivo universal fixo; devem ser associados ao contexto. **Pegadinha:** planejar TI não é sinônimo de terceirizar TI. **Pegadinha:** governança avalia e direciona, gestão entrega e opera — funções complementares.

## Pratique sem consultar
Elabore um mini-PDTI com duas prioridades, indicadores mensuráveis, riscos, responsáveis e metas. Identifique quem decide a prioridade institucional e quem executa os projetos. Classifique uma atividade de revisão de desempenho como governança/gestão segundo o contexto.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
ISACA — COBIT: https://www.isaca.org/resources/cobit
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** No COBIT, qual domínio está associado à governança, avaliando, direcionando e monitorando?

A) EDM
B) DSS
C) BAI
D) APO

**Gabarito:** A — EDM significa Evaluate, Direct and Monitor e trata do sistema de governança; demais domínios são de gestão.

**Questão 2.** Qual exemplo caracteriza objetivo de PDTI bem formulado?

A) Aumentar disponibilidade de sistema crítico para meta mensurável com prazo
B) Comprar computadores sem definir necessidade
C) Anotar os modelos de mouse atuais apenas
D) Criar lista de sugestões sem responsáveis

**Gabarito:** A — Um objetivo gerenciável associa resultado, indicador, prazo e responsabilidade.


---

# Ágil, Scrum, Kanban e métricas de entrega

# Objetivo e contexto
Entender processos ágeis sem confundir métodos, papéis e indicadores.

## Aula detalhada — entenda o mecanismo
**Scrum** é um framework leve para lidar com problemas complexos, com papéis de responsabilidade (Product Owner, Scrum Master e Developers), eventos (Sprint, Sprint Planning, Daily Scrum, Sprint Review, Retrospective) e artefatos (Product Backlog, Sprint Backlog, Increment). O objetivo da Sprint orienta decisões. A Daily Scrum é reunião dos Developers para inspecionar progresso em direção à meta; não é reunião de prestação de contas ao gerente.

**Kanban** enfatiza visualização do fluxo, limites de trabalho em progresso (WIP), gestão de fluxo, políticas explícitas e melhoria. Uma fila com 30 tarefas “em andamento” pode ocultar gargalos; limitar WIP reduz multitarefa e revela bloqueios. **Lead time** mede tempo decorrido entre solicitação e entrega (conforme definição do fluxo); **cycle time** mede do início do trabalho até conclusão. **Throughput** representa itens concluídos por unidade de tempo. São métricas de processo, não avaliação simplista de produtividade individual.

Um time pode combinar práticas, mas não atribua ao Scrum oficialmente papéis inexistentes como “gerente de projeto obrigatório”. Kanban não exige Sprints. Priorize valor, feedback e entrega verificável, respeitando controles de mudanças, LGPD e disponibilidade em ambientes públicos.

## Exemplo resolvido passo a passo
Equipe entrega sistema de agendamento para unidade de saúde. Backlog inclui autenticação, agenda, confirmações e relatórios. PO define valor e ordena necessidades; Developers escolhem como construir; Scrum Master auxilia efetividade do Scrum. A cada Sprint, há Increment potencialmente utilizável atendendo à Definition of Done.

Se equipe leva oito dias da solicitação até a entrega, mas só quatro dias efetivamente em trabalho ativo conforme definição adotada, lead time é oito e cycle time quatro. Quadro Kanban revela aprovação do jurídico como gargalo; criar tarefas adicionais sem resolver aprovação aumenta WIP e não necessariamente entrega.

## Erros clássicos nas bancas
**Pegadinha:** Daily Scrum não é “reunião diária do chefe”. **Pegadinha:** velocidade em pontos de história não compara qualidade de equipes diferentes. **Pegadinha:** Scrum não é sinônimo de “sem documentação” e Agile não dispensa controles. **Pegadinha:** lead time e cycle time são distintos conforme início da contagem.

## Pratique sem consultar
Esboce quadro Kanban com A Fazer, Em Execução, Em Revisão e Concluído, definindo WIP de duas tarefas por coluna operacional. Em um ciclo fictício, calcule lead e cycle time e explique como um bloqueio em revisão afeta ambos. Liste eventos do Scrum e seu objetivo.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Scrum Guide — versão oficial disponível: https://scrumguides.org/scrum-guide.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual prática está diretamente associada a Kanban?

A) Limitar trabalho em progresso (WIP)
B) Exigir Sprints de duração fixa
C) Criar cargo obrigatório de gerente Scrum
D) Eliminar visualização do fluxo

**Gabarito:** A — Limites de WIP ajudam a gerenciar fluxo e exposição de gargalos; Kanban não requer Sprints.

**Questão 2.** Em Scrum, qual evento é dedicado à inspeção e adaptação da forma de trabalho da equipe?

A) Sprint Retrospective
B) Sprint Review exclusivamente
C) Sprint Planning exclusivamente
D) Product Backlog Refinement como evento formal obrigatório

**Gabarito:** A — Retrospective inspeciona como a última Sprint ocorreu e planeja melhorias na efetividade.
