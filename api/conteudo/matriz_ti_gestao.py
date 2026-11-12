"""Governança, ITIL, COBIT e contratações de TI — temas autorais por edital."""
CURRICULUM = {
  "Governança e Gestão de TI": [
    [
      "Governança",
      "Governança versus gestão de TI",
      "Governança avalia necessidades e partes interessadas, direciona prioridades e monitora resultados; gestão planeja e executa atividades para alcançar objetivos. Papéis podem coexistir em pessoas diferentes ou na mesma organização pequena.",
      "Quando direção aprova apetite ao risco de indisponibilidade, atua na governança. TI implementa contingência, acompanha fornecedor e mede testes de recuperação como gestão. Indicadores de resultado devem retroalimentar decisões.",
      "Uma diretoria exige RTO de 2h para serviço clínico; TI realiza exercício e leva 5h. O teste mostra lacuna que precisa de análise e eventual nova decisão sobre investimentos e riscos.",
      "Pegadinha: comprar tecnologia não representa, por si, boa governança. Governança não é sinônimo de executar suporte diário."
    ],
    [
      "COBIT",
      "COBIT 2019: EDM, APO, BAI, DSS e MEA",
      "COBIT 2019 distingue objetivos de governança EDM (Evaluate, Direct, Monitor) dos objetivos de gestão APO, BAI, DSS e MEA. Domínios tratam alinhamento, construção/implementação, serviços e monitoramento.",
      "Separe decisão de política de sua execução: EDM avalia benefícios e riscos; APO organiza estratégia; BAI implanta solução; DSS mantém operação; MEA avalia desempenho e conformidade, conforme objetivos pertinentes.",
      "Projeto de trocar PACS envolve direção sobre risco, planejamento de investimento, migração/testes, suporte pós-cutover e avaliação de disponibilidade. Um único projeto atravessa domínios sem torná-los sinônimos.",
      "Pegadinha: domínio MEA 'monitora' na gestão e EDM 'monitora' na governança em níveis distintos. COBIT não obriga uma única escala de maturidade para qualquer avaliação."
    ],
    [
      "Serviços",
      "ITIL 4: incidente, problema, mudança e requisição",
      "Incidente é interrupção ou redução de qualidade; requisição é demanda de serviço normalmente predefinida; problema é causa real ou potencial de incidentes; mudança trata adição, modificação ou remoção de algo que afeta serviços.",
      "A equipe restaura atendimento em incidente, investiga causa recorrente como problema, e avalia implantação corretiva como mudança. Registrar as categorias permite métricas distintas e evita 'reabrir' eternamente ticket para mesma causa.",
      "PACS fica indisponível três vezes. TI faz contingência imediata para cada incidente, identifica conexão saturada como problema e executa mudança revisada no pool de conexões.",
      "Pegadinha: reiniciar sistema pode restaurar serviço sem resolver problema. Requisição para instalar impressora autorizada não é automaticamente incidente."
    ],
    [
      "Serviços",
      "ITIL 4: SLA, SLO, SLI e melhoria contínua",
      "Indicador SLI mede comportamento do serviço; objetivo SLO define meta para indicador; SLA formaliza compromisso e condições entre partes. A medição deve definir janela, elegibilidade, exclusões e fonte.",
      "Disponibilidade 99,9% em 30 dias permitiria aproximadamente 43,2 minutos de indisponibilidade sob janela integral de 43.200 minutos. Se serviço esteve fora 20, disponibilidade ≈99,9537%, mas latência e erros funcionais podem descumprir outros SLOs.",
      "Um fornecedor cumpre disponibilidade por ping, mas portal retorna HTTP 500. O indicador escolhido não reflete transação do usuário; redefina monitoramento conforme contrato.",
      "Pegadinha: SLA não é garantia de falha zero; percentual de uptime não substitui tempo de resposta e restauração."
    ],
    [
      "Planejamento",
      "PDTI/PDTIC e alinhamento estratégico",
      "PDTI/PDTIC organiza necessidades e iniciativas de tecnologia alinhadas a objetivos institucionalmente definidos, com prioridades, orçamento, prazos, responsáveis, dependências e métricas. Sem relação com resultados, vira lista de compras.",
      "Encadeie problema institucional → objetivo → necessidade de TI → solução comparada → ação → indicador → evidência. Revise plano em ciclos; mudanças de risco e fornecedor podem alterar prioridades.",
      "Objetivo 'reduzir atraso em laudos' pode gerar iniciativa de redundância de link, revisão de integração e capacitação; métricas devem medir atrasos reais e tempo de recuperação, não só compras concluídas.",
      "Pegadinha: percentual de execução de orçamento não prova cumprimento do objetivo. Planejamento precisa considerar continuidade e exigências de contratação."
    ],
    [
      "Projetos",
      "PMBOK, EAP, cronograma e risco",
      "Gerenciamento de projetos integra escopo, cronograma, custos, recursos, riscos, comunicação, aquisições e interessados conforme abordagem. EAP decompõe escopo em entregas, não é lista aleatória de tarefas.",
      "Identifique atividades e dependências, calcule caminhos críticos e reserve gestão de mudanças. Em projeto de migração, teste e plano de rollback são entregas críticas; não trate data de corte como único sucesso.",
      "Atividades: backup 2h, migração 4h após backup, teste 3h após migração. Caminho sequencial mínimo 9h; acrescentar paralelo de documentação não aumenta prazo se não bloquear caminho crítico.",
      "Pegadinha: cronograma e EAP são artefatos diferentes. Atraso em atividade não crítica pode consumir folga sem atrasar término."
    ],
    [
      "Ágil",
      "Scrum, Kanban, WIP e métricas de fluxo",
      "Scrum organiza Sprints, responsabilidades e inspeção/adaptação; Kanban visualiza fluxo e costuma limitar trabalho em andamento WIP. Métricas de fluxo incluem lead time, cycle time e throughput.",
      "Se há limite WIP=2 em desenvolvimento e dois itens ocupam a coluna, novo item aguarda ou equipe ajuda a finalizar, evitando iniciar dez tarefas sem concluir. Daily Scrum não é reunião obrigatória de reporte hierárquico.",
      "Equipe atende 15 chamados semanais, mas mantém 40 tarefas iniciadas; limitar WIP e classificar bloqueios pode melhorar previsibilidade mesmo sem aumentar efetivo.",
      "Pegadinha: story points não são horas padronizadas universalmente; comparar pontuação entre equipes pode distorcer produtividade."
    ],
    [
      "Contratos",
      "Gestão de fornecedores e contratos de TI",
      "Terceiros podem operar dados e serviços críticos; governança exige definir donos, requisitos de segurança, medição, acesso, continuidade, subcontratação e plano de saída. Fiscalização contrata evidências, não só promessas.",
      "Em serviço de backup gerenciado, cláusulas devem prever dados e ambientes, RTO/RPO, testes de restauração, acesso e responsabilização conforme contrato e lei. Riscos residuais devem ter registro e responsável.",
      "Fornecedor declara 100% de backups executados; restaurar banco e abrir aplicação em teste mostra se é recuperável. Se levar 8h contra RTO de 2h, há descumprimento operacional a tratar.",
      "Pegadinha: terceirizar hospedagem não transfere automaticamente todas as obrigações de controlador de dados; papéis dependem da operação e contrato."
    ],
    [
      "Auditoria",
      "Evidências de auditoria, controle e plano de ação",
      "Auditoria avalia critérios mediante evidências suficientes e adequadas. Política define intenção, procedimento descreve execução, registro demonstra prática e plano de ação trata lacunas com responsáveis e datas.",
      "Para requisito de treinamento semestral, confirme plano, lista de presença, conteúdo, avaliações e período aplicável. Um print solto pode ser evidência parcial, mas não comprovar eficácia ou abrangência de toda equipe.",
      "Documento afirma testes mensais de backup, porém logs só mostram um teste isolado há mais de um ano. A evidência não sustenta conformidade atual, ainda que o documento esteja assinado.",
      "Pegadinha: evidência de existência de controle não é necessariamente evidência de sua eficácia. Auditoria não cria obrigação que o critério não prevê."
    ],
    [
      "Contratações",
      "ETP, termo de referência e fiscalização em TI",
      "Estudo Técnico Preliminar examina necessidade, alternativas e viabilidade nos casos cabíveis; Termo de Referência define objeto, execução, critérios e aceite; fiscalização acompanha cumprimento no contrato.",
      "Em licitação de suporte, compare soluções, dimensione serviço e custos, descreva níveis de resposta e resolução, monitoramento, segurança e transição. Requisitos devem ser aferíveis, não frases como 'suporte excelente'.",
      "Contrato exige resposta a chamado em 30 minutos e resolução em quatro horas. Fornecedor respondeu em 20 minutos mas resolveu em seis: cumpriu uma meta e não a outra, segundo medição do caso.",
      "Pegadinha: modalidades de licitação e critérios de julgamento são classes distintas; Lei 14.133 exige exame da redação aplicável ao ente, objeto e data."
    ]
  ]
}
