import type {LessonGuide} from './guidesTypes'
export const guidesGOV:LessonGuide[]=[
  {
    "id": 10,
    "code": "GOV",
    "title": "ITIL, incidentes e mudanças",
    "objective": "Distinguir incidente, problema e mudança.",
    "theory": "Gestão de incidentes visa restaurar o serviço normal rapidamente. Gestão de problemas investiga causas e evita recorrências. Gestão de mudanças busca avaliar riscos e autorizações antes das alterações.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Objetivo da gestão de incidentes?",
        "back": "Restaurar a operação normal do serviço tão rapidamente quanto possível."
      },
      {
        "front": "Gestão de problemas investiga o quê?",
        "back": "Causas de incidentes e possíveis soluções permanentes."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 11,
    "code": "GOV",
    "title": "PDTI e governança",
    "objective": "Separar governança de gestão.",
    "theory": "PDTI articula objetivos, necessidades e iniciativas de tecnologia com a estratégia institucional. Governança define orientação, supervisão e prestação de contas; gestão executa planejamento e operações para alcançar objetivos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que significa PDTI?",
        "back": "Plano Diretor de Tecnologia da Informação."
      },
      {
        "front": "Governança e gestão são sinônimos?",
        "back": "Não. Governança direciona e supervisiona; gestão planeja e executa."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 51,
    "code": "GOV",
    "title": "ITIL: incidente e requisição",
    "objective": "Explicar e aplicar: ITIL: incidente e requisição.",
    "theory": "Incidente é interrupção não planejada ou redução da qualidade de um serviço; requisição de serviço é solicitação predefinida, como instalação autorizada. Gerenciar incidentes busca restabelecer serviço rapidamente, e não necessariamente descobrir a causa raiz na primeira resposta.",
    "practical": "Impressora compartilhada indisponível: incidente. Pedido regular para criar acesso autorizado: requisição de serviço.",
    "warning": "Incidente, requisição e problema têm fluxos diferentes, embora possam se relacionar.",
    "recall": [
      {
        "front": "Um pedido rotineiro de instalação de software homologado normalmente é:",
        "back": "Requisição de serviço. Service request é pedido predefinido de serviço."
      },
      {
        "front": "A principal prioridade do gerenciamento de incidentes costuma ser:",
        "back": "Restaurar serviço rapidamente. Foco é restaurar a operação normal com segurança."
      },
      {
        "front": "Qual armadilha evitar em ITIL: incidente e requisição?",
        "back": "Incidente, requisição e problema têm fluxos diferentes, embora possam se relacionar."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 52,
    "code": "GOV",
    "title": "ITIL: problema, mudança e CMDB",
    "objective": "Explicar e aplicar: ITIL: problema, mudança e CMDB.",
    "theory": "Gerenciamento de problemas busca causas e soluções duradouras para incidentes; habilitação de mudanças avalia riscos, autorizações e cronogramas. CMDB organiza registros de itens de configuração e seus relacionamentos, conforme o desenho da organização.",
    "practical": "Falha recorrente de autenticação pode gerar registro de problema; trocar controlador demanda mudança coordenada.",
    "warning": "Uma CMDB desatualizada pode prejudicar análise de impacto; inventário simples não garante relacionamentos.",
    "recall": [
      {
        "front": "Qual prática investiga a causa raiz de incidentes recorrentes?",
        "back": "Gerenciamento de problemas. Problemas foca causas e recorrência."
      },
      {
        "front": "Qual ferramenta organiza itens de configuração e relações entre eles?",
        "back": "CMDB. Configuration Management Database registra itens de configuração."
      },
      {
        "front": "Qual armadilha evitar em ITIL: problema, mudança e CMDB?",
        "back": "Uma CMDB desatualizada pode prejudicar análise de impacto; inventário simples não garante relacionamentos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 53,
    "code": "GOV",
    "title": "COBIT: governança versus gestão",
    "objective": "Explicar e aplicar: COBIT: governança versus gestão.",
    "theory": "COBIT diferencia objetivos de governança (avaliar, direcionar e monitorar) de objetivos de gestão (planejar, construir, executar e monitorar). É um framework para governança e gestão de informação e tecnologia, com foco no alinhamento e geração de valor.",
    "practical": "Gestão acompanha implementação de backup; governança define apetite a risco e acompanha resultados.",
    "warning": "COBIT não é ferramenta que instala firewall automaticamente.",
    "recall": [
      {
        "front": "Qual sequência é associada à governança no COBIT?",
        "back": "Avaliar, direcionar e monitorar. EDM corresponde a Evaluate, Direct and Monitor."
      },
      {
        "front": "O COBIT se destina principalmente a:",
        "back": "Governança e gestão da informação e tecnologia. COBIT organiza objetivos e práticas de governança/gestão."
      },
      {
        "front": "Qual armadilha evitar em COBIT: governança versus gestão?",
        "back": "COBIT não é ferramenta que instala firewall automaticamente."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 54,
    "code": "GOV",
    "title": "Indicadores: SLA, SLO e SLI",
    "objective": "Explicar e aplicar: Indicadores: SLA, SLO e SLI.",
    "theory": "SLI é indicador quantitativo do nível de serviço observado, como percentual de sucesso. SLO é objetivo para esse indicador e SLA é compromisso de nível de serviço, normalmente contratual ou formalizado, com condições específicas.",
    "practical": "SLI disponibilidade=99,8%; SLO desejado=99,9%; SLA pode prever obrigações e consequências se meta não for cumprida.",
    "warning": "Não confunda valor medido com a meta contratada.",
    "recall": [
      {
        "front": "Como é chamado o indicador quantitativo observado de serviço?",
        "back": "SLI. Service Level Indicator corresponde à medição."
      },
      {
        "front": "Qual termo representa uma meta definida para desempenho de um indicador?",
        "back": "SLO. Service Level Objective é o objetivo para um indicador."
      },
      {
        "front": "Qual armadilha evitar em Indicadores: SLA, SLO e SLI?",
        "back": "Não confunda valor medido com a meta contratada."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 55,
    "code": "GOV",
    "title": "PDTI e planejamento estratégico",
    "objective": "Explicar e aplicar: PDTI e planejamento estratégico.",
    "theory": "Plano Diretor de Tecnologia da Informação articula necessidades, prioridades, metas e recursos de TI alinhados à estratégia institucional. A elaboração deve observar contexto, riscos, dependências e governança.",
    "practical": "Se a organização pretende ampliar atendimentos digitais, o PDTI pode priorizar identidade, disponibilidade e integração de sistemas.",
    "warning": "Lista isolada de compras não substitui análise das necessidades e objetivos.",
    "recall": [
      {
        "front": "Qual documento estrutura iniciativas de TI alinhadas ao planejamento institucional?",
        "back": "PDTI. O PDTI relaciona iniciativas de TI a objetivos institucionais."
      },
      {
        "front": "Qual informação é mais relevante para priorizar iniciativas no PDTI?",
        "back": "Impacto sobre objetivos e riscos institucionais. Priorizar exige análise de valor, risco e dependências."
      },
      {
        "front": "Qual armadilha evitar em PDTI e planejamento estratégico?",
        "back": "Lista isolada de compras não substitui análise das necessidades e objetivos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 56,
    "code": "GOV",
    "title": "Agilidade: Scrum e Kanban",
    "objective": "Explicar e aplicar: Agilidade: Scrum e Kanban.",
    "theory": "Scrum organiza trabalho por ciclos, com papéis, eventos e artefatos; Kanban visualiza fluxo e pode limitar trabalho em progresso (WIP). A escolha depende da natureza do serviço e da necessidade de previsibilidade.",
    "practical": "Equipe de suporte pode usar Kanban para visualizar chamados; equipe de produto pode trabalhar com Sprints usando Scrum.",
    "warning": "Kanban não exige Sprints e Scrum não significa ausência de documentação.",
    "recall": [
      {
        "front": "Qual conceito limita quantidade de itens executados simultaneamente no Kanban?",
        "back": "WIP limit. Limites WIP reduzem sobrecarga no fluxo."
      },
      {
        "front": "No Scrum, como se denomina a iteração de duração fixa?",
        "back": "Sprint. Sprint é o ciclo de trabalho com duração definida."
      },
      {
        "front": "Qual armadilha evitar em Agilidade: Scrum e Kanban?",
        "back": "Kanban não exige Sprints e Scrum não significa ausência de documentação."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 57,
    "code": "GOV",
    "title": "Gestão de contratos de TI",
    "objective": "Explicar e aplicar: Gestão de contratos de TI.",
    "theory": "Na contratação pública, planejamento inclui necessidade, alternativas, requisitos e justificativas. Fiscalização e gestão de contratos acompanham entregas, níveis de serviço e conformidade com o pactuado. Papéis precisam de atribuição formal e registros.",
    "practical": "Para contratar link de internet, o termo técnico deve deixar claras disponibilidade, prazo e requisitos verificáveis.",
    "warning": "Fiscalização não se reduz a confirmar que a nota fiscal chegou; exige evidências de execução.",
    "recall": [
      {
        "front": "Qual prática dá suporte à fiscalização de contrato de serviço de TI?",
        "back": "Acompanhar níveis de serviço e evidências de entrega. Fiscalização verifica execução contratual mediante evidências."
      },
      {
        "front": "Em requisitos de contratação, qual característica melhora a verificação?",
        "back": "Ser mensurável e objetivo. Requisitos verificáveis facilitam recebimento e fiscalização."
      },
      {
        "front": "Qual armadilha evitar em Gestão de contratos de TI?",
        "back": "Fiscalização não se reduz a confirmar que a nota fiscal chegou; exige evidências de execução."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 58,
    "code": "GOV",
    "title": "Segurança por design e gestão de terceiros",
    "objective": "Explicar e aplicar: Segurança por design e gestão de terceiros.",
    "theory": "Gestão de terceiros inclui análise de riscos de acesso, contratos, responsabilidades, incidentes e devolução de ativos. Segurança e privacidade desde o projeto integram controles cedo no ciclo de vida, evitando correções tardias.",
    "practical": "Fornecedor de RIS com acesso remoto deve ter escopo, autenticação, registro e desligamento de acesso após encerramento.",
    "warning": "Ter contrato assinado não comprova, isoladamente, que controles estão operando.",
    "recall": [
      {
        "front": "Qual controle ajuda a reduzir risco de fornecedores com acesso remoto?",
        "back": "Revisão e revogação de acessos ao fim do contrato. Ciclo de vida de acesso de terceiro precisa ser controlado."
      },
      {
        "front": "Qual ideia descreve security by design?",
        "back": "Incorporar controles desde concepção e desenvolvimento. Controles projetados desde o início tendem a reduzir retrabalho e riscos."
      },
      {
        "front": "Qual armadilha evitar em Segurança por design e gestão de terceiros?",
        "back": "Ter contrato assinado não comprova, isoladamente, que controles estão operando."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 103,
    "code": "GOV",
    "title": "ITIL: incidente, problema, mudança e serviço",
    "objective": "Classificar casos e organizar fluxo de atendimento e melhoria contínua.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Gestão de incidentes** busca restaurar o serviço normal o mais rapidamente possível, limitando o impacto. **Gestão de problemas** identifica e gerencia causas e riscos subjacentes de um ou vários incidentes; pode resultar em workaround e erro conhecido. **Habilitação de mudanças (change enablement)** avalia riscos e coordena alterações para elevar o sucesso, sem exigir um ritual burocrático idêntico para toda mudança. **Service request** trata pedidos usuais e predefinidos, como acesso ou fornecimento de equipamento.\n\nSLAs expressam compromissos de nível de serviço, como disponibilidade e prazo; OLAs descrevem acordos operacionais internos; contratos com fornecedores podem empregar compromissos de suporte. Indicadores úteis: incidentes por criticidade, tempo de restauração, recorrência, mudanças malsucedidas, satisfação e incidentes reabertos. **SLA não é o mesmo que tempo médio de resolução.** O tempo pode depender da prioridade e horário de operação.\n\nA perspectiva de valor do serviço considera cliente, usuário, resultados, custos e riscos. ITIL 4 descreve práticas e princípios orientadores, mas a instituição pode adaptar processos à sua maturidade. Uma requisição de acesso não vira automaticamente incidente apenas porque foi registrada em service desk.\n\n## Exemplo resolvido passo a passo\nExemplo: setor relata que o PACS ficou indisponível. É incidente; o suporte restabelece temporariamente. Uma investigação identifica saturação recorrente de armazenamento: é problema. Uma alteração programada de configuração, com teste e plano de retorno, passa por mudança. Novo usuário solicita acesso ao RIS: pedido de serviço.\n\nVocê implementa triagem: gravidade definida por impacto e urgência, registro de horário, responsável, comunicação de status e escalonamento. Após restaurar, registra causa provável e decide se investigação de problema será aberta. A prova pode dizer que gestão de problema “tem como objetivo principal restaurar rapidamente”; isso descreve sobretudo incidente.\n\n## Erros clássicos nas bancas\n**Pegadinha:** incidente e problema podem coexistir; não são mutuamente excludentes. **Pegadinha:** priorização exige impacto e urgência, não apenas “ordem de chegada” em todos os casos. **Pegadinha:** change enablement não se limita a aprovar compras; trata controle de mudanças em produtos e serviços. **Pegadinha:** número de tickets fechados não mede isoladamente qualidade do atendimento.\n\n## Pratique sem consultar\nClassifique cinco ocorrências de TI entre incidente, problema, mudança e solicitação: senha resetada, aplicativo indisponível, causa recorrente de crash, atualização planejada e pedido de monitor. Crie uma matriz de prioridade com impacto x urgência e explique quando informar gestores.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nPeopleCert — ITIL (referência oficial do framework): https://www.peoplecert.org/frameworks/itil-framework\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Objetivo principal da gestão de incidentes?",
        "back": "Restabelecer o serviço com rapidez e minimizar impacto."
      },
      {
        "front": "Como diferenciar incidente e problema na ITIL?",
        "back": "Incidente é interrupção ou redução da qualidade; problema é causa, ou causa potencial, de um ou mais incidentes."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 104,
    "code": "GOV",
    "title": "Governança x gestão, COBIT e PDTI",
    "objective": "Separar definição de direção, execução de controles e planejamento de TI.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Governança** avalia necessidades, define direção e acompanha resultados/prestação de contas. **Gestão** planeja, constrói, executa e monitora atividades para alcançar diretrizes. No COBIT, domínios de governança incluem **EDM** (Evaluate, Direct and Monitor) e domínios de gestão incluem **APO, BAI, DSS e MEA**. Não é necessário decorar siglas isoladas: associe cada domínio à sua responsabilidade.\n\nUm **PDTI** (Plano Diretor de Tecnologia da Informação) traduz necessidades institucionais em objetivos, iniciativas, prioridades, recursos, riscos e métricas para período definido. Sua elaboração envolve diagnóstico, alinhamento estratégico, planejamento, aprovação e acompanhamento. Um inventário de equipamentos é insumo, não substitui PDTI. O comitê/autoridade de governança decide prioridades e tolerância a riscos; a equipe de TI estrutura execução e acompanhamento.\n\n**Indicadores** devem refletir resultados: disponibilidade crítica, tempo de restauração, custo total por serviço, satisfação do usuário, conformidade, entregas e risco residual. Métricas de volume sem contexto (“número de tickets”) não necessariamente indicam valor. Em concursos públicos, conecte PDTI a planejamento de contratações e transformação digital sem presumir que todo ente siga norma federal idêntica.\n\n## Exemplo resolvido passo a passo\nUma prefeitura precisa escolher entre renovar 100 computadores e modernizar conectividade das UBS. A governança define prioridades ligadas à missão e critérios como impacto no cidadão, risco e custo. A gestão levanta requisitos, estimativas e viabilidade, elabora iniciativas com responsáveis e cronograma.\n\nPDTI exemplo: objetivo = aumentar disponibilidade dos sistemas críticos de 97% para 99,5% em 12 meses; iniciativa = monitoramento e redundância de links; responsável = coordenador de infraestrutura; indicador = disponibilidade medida; risco = orçamento insuficiente; revisão = trimestral. Isso é mais auditável do que “melhorar a internet” sem meta.\n\n## Erros clássicos nas bancas\n**Pegadinha:** COBIT é governança e gestão, não ferramenta de antivírus. **Pegadinha:** indicadores não precisam ter objetivo universal fixo; devem ser associados ao contexto. **Pegadinha:** planejar TI não é sinônimo de terceirizar TI. **Pegadinha:** governança avalia e direciona, gestão entrega e opera — funções complementares.\n\n## Pratique sem consultar\nElabore um mini-PDTI com duas prioridades, indicadores mensuráveis, riscos, responsáveis e metas. Identifique quem decide a prioridade institucional e quem executa os projetos. Classifique uma atividade de revisão de desempenho como governança/gestão segundo o contexto.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nISACA — COBIT: https://www.isaca.org/resources/cobit\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual a distinção resumida entre governança e gestão de TI?",
        "back": "Governança avalia, direciona e monitora; gestão planeja, executa e acompanha a entrega."
      },
      {
        "front": "O que um PDTI deve relacionar?",
        "back": "Necessidades institucionais, prioridades, iniciativas, recursos, indicadores, riscos e responsabilidades."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 105,
    "code": "GOV",
    "title": "Ágil, Scrum, Kanban e métricas de entrega",
    "objective": "Entender processos ágeis sem confundir métodos, papéis e indicadores.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Scrum** é um framework leve para lidar com problemas complexos, com papéis de responsabilidade (Product Owner, Scrum Master e Developers), eventos (Sprint, Sprint Planning, Daily Scrum, Sprint Review, Retrospective) e artefatos (Product Backlog, Sprint Backlog, Increment). O objetivo da Sprint orienta decisões. A Daily Scrum é reunião dos Developers para inspecionar progresso em direção à meta; não é reunião de prestação de contas ao gerente.\n\n**Kanban** enfatiza visualização do fluxo, limites de trabalho em progresso (WIP), gestão de fluxo, políticas explícitas e melhoria. Uma fila com 30 tarefas “em andamento” pode ocultar gargalos; limitar WIP reduz multitarefa e revela bloqueios. **Lead time** mede tempo decorrido entre solicitação e entrega (conforme definição do fluxo); **cycle time** mede do início do trabalho até conclusão. **Throughput** representa itens concluídos por unidade de tempo. São métricas de processo, não avaliação simplista de produtividade individual.\n\nUm time pode combinar práticas, mas não atribua ao Scrum oficialmente papéis inexistentes como “gerente de projeto obrigatório”. Kanban não exige Sprints. Priorize valor, feedback e entrega verificável, respeitando controles de mudanças, LGPD e disponibilidade em ambientes públicos.\n\n## Exemplo resolvido passo a passo\nEquipe entrega sistema de agendamento para unidade de saúde. Backlog inclui autenticação, agenda, confirmações e relatórios. PO define valor e ordena necessidades; Developers escolhem como construir; Scrum Master auxilia efetividade do Scrum. A cada Sprint, há Increment potencialmente utilizável atendendo à Definition of Done.\n\nSe equipe leva oito dias da solicitação até a entrega, mas só quatro dias efetivamente em trabalho ativo conforme definição adotada, lead time é oito e cycle time quatro. Quadro Kanban revela aprovação do jurídico como gargalo; criar tarefas adicionais sem resolver aprovação aumenta WIP e não necessariamente entrega.\n\n## Erros clássicos nas bancas\n**Pegadinha:** Daily Scrum não é “reunião diária do chefe”. **Pegadinha:** velocidade em pontos de história não compara qualidade de equipes diferentes. **Pegadinha:** Scrum não é sinônimo de “sem documentação” e Agile não dispensa controles. **Pegadinha:** lead time e cycle time são distintos conforme início da contagem.\n\n## Pratique sem consultar\nEsboce quadro Kanban com A Fazer, Em Execução, Em Revisão e Concluído, definindo WIP de duas tarefas por coluna operacional. Em um ciclo fictício, calcule lead e cycle time e explique como um bloqueio em revisão afeta ambos. Liste eventos do Scrum e seu objetivo.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nScrum Guide — versão oficial disponível: https://scrumguides.org/scrum-guide.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Para que servem limites de WIP no Kanban?",
        "back": "Restringem atividades simultâneas, ajudam a identificar gargalos e favorecem fluxo."
      },
      {
        "front": "Diferença típica entre lead time e cycle time?",
        "back": "Lead time inclui espera desde a entrada definida da demanda até entrega; cycle time considera início efetivo do trabalho até conclusão."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 133,
    "code": "GOV",
    "title": "ITIL: incidente, problema e mudança",
    "objective": "Compreender e aplicar itil: incidente, problema e mudança em provas.",
    "theory": "Gestão de incidente busca restaurar o serviço; gestão de problema investiga causas subjacentes; habilitação de mudança avalia modificações e riscos.\n\nA indisponibilidade de um sistema RIS exige resposta imediata para retomada. Repetição da falha pode justificar análise de problema e causa raiz. Uma mudança de versão ou configuração deve ser planejada, autorizada conforme política e avaliada após execução. Métricas de tempo ajudam, mas não substituem qualidade do serviço.",
    "practical": "Reiniciar um serviço restaura operação (incidente), porém não explica por que caiu (problema).",
    "warning": "ITIL não significa que todo incidente depende de mudança nem que qualquer reinício é problema resolvido.",
    "recall": [
      {
        "front": "Qual é o conceito central de ITIL: incidente, problema e mudança?",
        "back": "Gestão de incidente busca restaurar o serviço; gestão de problema investiga causas subjacentes; habilitação de mudança avalia modificações e riscos."
      },
      {
        "front": "Qual erro de prova evitar em ITIL: incidente, problema e mudança?",
        "back": "ITIL não significa que todo incidente depende de mudança nem que qualquer reinício é problema resolvido."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 134,
    "code": "GOV",
    "title": "COBIT: objetivos de governança e gestão",
    "objective": "Compreender e aplicar cobit: objetivos de governança e gestão em provas.",
    "theory": "COBIT é estrutura para governança e gestão de informação e tecnologia corporativa, distinguindo avaliar, dirigir e monitorar de planejar, construir, entregar e monitorar.\n\nA família EDM está associada à governança. Os domínios APO, BAI, DSS e MEA tratam objetivos de gestão. A escolha do nível de formalização depende de contexto, risco e objetivos, não de implantar todos os processos indistintamente. Indicadores devem relacionar práticas aos objetivos de negócio.",
    "practical": "Uma clínica usa metas de disponibilidade dos sistemas e métricas de recuperação para demonstrar valor e risco controlado.",
    "warning": "COBIT não é ferramenta de firewall nem sinônimo de ITIL.",
    "recall": [
      {
        "front": "Qual é o conceito central de COBIT: objetivos de governança e gestão?",
        "back": "COBIT é estrutura para governança e gestão de informação e tecnologia corporativa, distinguindo avaliar, dirigir e monitorar de planejar, construir, entregar e monitorar."
      },
      {
        "front": "Qual erro de prova evitar em COBIT: objetivos de governança e gestão?",
        "back": "COBIT não é ferramenta de firewall nem sinônimo de ITIL."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 135,
    "code": "GOV",
    "title": "PDTI e indicadores de gestão",
    "objective": "Compreender e aplicar pdti e indicadores de gestão em provas.",
    "theory": "Planejamento Diretor de Tecnologia da Informação conecta necessidades organizacionais, prioridades, recursos, riscos e resultados esperados.\n\nInventariar demandas não basta. Um PDTI deve priorizar ações, explicitar responsáveis, orçamento e critérios de acompanhamento. Indicadores mensuráveis podem incluir disponibilidade, cumprimento de SLA, prazo para resolução e taxa de sucesso em restaurações testadas. O plano deve ser revisado quando contexto e prioridades mudam.",
    "practical": "Se uma secretaria solicita novo sistema, a análise deve considerar valor, integração, segurança, custo e capacidade de sustentação, não apenas a urgência percebida.",
    "warning": "Plano de compras não equivale sozinho a estratégia de TI; projetos precisam de justificativa e métricas.",
    "recall": [
      {
        "front": "Qual é o conceito central de PDTI e indicadores de gestão?",
        "back": "Planejamento Diretor de Tecnologia da Informação conecta necessidades organizacionais, prioridades, recursos, riscos e resultados esperados."
      },
      {
        "front": "Qual erro de prova evitar em PDTI e indicadores de gestão?",
        "back": "Plano de compras não equivale sozinho a estratégia de TI; projetos precisam de justificativa e métricas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 136,
    "code": "GOV",
    "title": "SLA, SLO e indicadores",
    "objective": "Compreender e aplicar sla, slo e indicadores em provas.",
    "theory": "SLA formaliza compromissos de serviço; SLO define metas objetivas para comportamento do serviço; indicadores fornecem medições.\n\nUm SLA de 99,9% de disponibilidade mensal depende da definição explícita de período, exclusões e método de apuração. SLO pode ser meta interna mais estrita. Média aritmética de disponibilidade de serviços diferentes pode mascarar indisponibilidade crítica. Transforme indicadores em ações corretivas.",
    "practical": "Se a disponibilidade alvo é 99,9% em 30 dias, o orçamento aproximado de indisponibilidade é 43,2 minutos (30×24×60×0,001).",
    "warning": "Não defina disponibilidade sem delimitar serviço, janela e exclusões acordadas.",
    "recall": [
      {
        "front": "Qual é o conceito central de SLA, SLO e indicadores?",
        "back": "SLA formaliza compromissos de serviço; SLO define metas objetivas para comportamento do serviço; indicadores fornecem medições."
      },
      {
        "front": "Qual erro de prova evitar em SLA, SLO e indicadores?",
        "back": "Não defina disponibilidade sem delimitar serviço, janela e exclusões acordadas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 160,
    "code": "GOV",
    "title": "SLA, SLI e SLO em gestão de serviços",
    "objective": "Interpretar indicadores de confiabilidade e distinguir metas internas de compromissos de nível de serviço.",
    "theory": "# Caso de prova — medir disponibilidade de um serviço público\nUma organização afirma que o portal “está bom porque ninguém reclamou”. Ausência de reclamação não substitui métrica. Para gerenciar qualidade de serviço, defina **o que medir, como medir e qual patamar aceitar**. Um indicador de nível de serviço (SLI) é uma medida observável, por exemplo proporção de solicitações bem-sucedidas. Um objetivo (SLO) é a meta para esse indicador, como 99,5% de disponibilidade em certo período. Um acordo (SLA) é compromisso documentado entre partes, com condições e consequências definidas.\n\n## Exemplo com cálculo\nConsidere mês de 30 dias, isto é, `30 × 24 × 60 = 43.200` minutos. Um objetivo de disponibilidade de `99,5%` admite, nesse modelo simplificado, até `0,5% × 43.200 = 216` minutos de indisponibilidade no período. É essencial declarar o denominador: manutenção programada excluída do SLA? Janelas de medição? Indisponibilidade parcial? Sem critério definido, a porcentagem parece precisa, mas não é auditável.\n\n## Escolha métricas úteis\nUm serviço de autenticação pode medir percentual de logins válidos concluídos, latência p95 e erros 5xx. A média simples de latência pode esconder cauda longa, então percentis são úteis. Não confunda número de chamados fechados com experiência real do usuário: encerrar tickets rapidamente enquanto o serviço segue indisponível incentiva comportamento inadequado.\n\n## Reação à degradação\nSe o SLI cai abaixo do SLO, registre impacto, investigue causa, reavalie capacidade e priorize correção. Um SLA contratual pode ter consequências específicas, mas não é toda meta interna que vira automaticamente obrigação contratual. Para comparar meses, use critérios idênticos de janela e exclusão; caso contrário, conclusões de melhora podem ser artificiais.\n\n## Transferência para concursos\nQuando a banca perguntar diferença entre “gerenciamento de incidentes” e “nível de serviço”, responda por objetivo: incidente restaura operação após interrupção; práticas de nível de serviço pactuam, medem e melhoram qualidade esperada. Uma coisa pode produzir dados para a outra, mas não são sinônimas.\n\n## Exercício aplicado\nCalcule o tempo máximo de indisponibilidade para 99,9% em 7 dias, sem exclusões. Em seguida, escreva uma frase de SLA que especifica métrica, janela e exclusões, em vez de afirmar apenas “alta disponibilidade”.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é a diferença fundamental entre SLI e SLO?",
        "back": "SLI = medida observada do serviço; SLO = meta definida para a medida."
      },
      {
        "front": "Quanto é 0,5% de 43.200 minutos?",
        "back": "216 minutos; corresponde à indisponibilidade máxima simplificada para SLO de 99,5% em 30 dias."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 161,
    "code": "GOV",
    "title": "Priorização de TI com risco, custo e responsabilidade",
    "objective": "Construir justificativa auditável de priorização de iniciativas tecnológicas e contratações.",
    "theory": "# Caso de prova — três demandas e recursos limitados\nUm órgão público recebe três pedidos: renovar switches com falhas recorrentes, contratar um sistema novo de relatórios e comprar telas para uma sala de reunião. O orçamento não cobre tudo. Uma decisão tecnicamente fundamentada não se reduz a quem pediu primeiro; é preciso avaliar **impacto nos serviços públicos, probabilidade e consequência de falha, obrigações legais, custo total e dependências**.\n\n## Uma matriz simples, sem falsa exatidão\nPara cada iniciativa, registre urgência, impacto no cidadão, risco de não executar, custo estimado, alternativas e capacidade de implantação. Por exemplo, switches com incidentes documentados que interrompem atendimento podem ser prioritários; telas para reunião podem ter benefício menor no cenário. Mas não atribua pontuações numéricas arbitrárias e depois trate o resultado como verdade objetiva: a escala precisa de critérios explícitos e validação de gestores.\n\n## Governança x gestão\nGovernança estabelece direção, accountability, tolerância a risco e acompanhamento de resultados; gestão planeja, contrata, implementa, opera e mede serviços. Uma diretoria pode aprovar prioridades, enquanto a TI elabora estudo de alternativas e cronograma. O fato de o analista executar etapas técnicas não lhe dá competência automática para autorizar despesa.\n\n## Documentos de decisão\nUma boa nota técnica descreve problema e evidência, soluções alternativas, consequências de não atuar, premissas, riscos, critérios de aceitação, responsabilidades e ações de acompanhamento. Quando a demanda virar contratação, observe o regime jurídico aplicável e os documentos exigidos; na Lei 14.133/2021, ETP e TR têm papéis diferentes e não devem ser tratados como sinônimos.\n\n## Exemplo resolvido\nOcorreram cinco incidentes de switch em um mês, com indisponibilidade total de atendimento de 12 horas. A equipe possui evidência de falhas de hardware, e a substituição reduz ponto único de falha. A priorização pode se apoiar na continuidade do serviço, no risco e no custo de paralisação, desde que a solução seja comparada com reparo, suporte e contingência. O responsável documenta a premissa de que o novo equipamento será instalado antes do fim da garantia da infraestrutura existente.\n\n## Pergunta aberta\nEscreva um parecer curto indicando por que a substituição dos switches pode superar a compra das telas. Use linguagem técnica, reconheça incertezas e proponha uma evidência adicional que poderia alterar a prioridade. Não confunda preferência pessoal com critério de governança.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Quais elementos devem constar em uma priorização auditável de TI?",
        "back": "Problema, evidência, riscos, alternativas, custos, responsáveis e critério de sucesso."
      },
      {
        "front": "Ter uma demanda urgente dispensa análise de alternativas?",
        "back": "Não necessariamente; a decisão deve ser compatível com urgência, evidência, regras e custo total."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
