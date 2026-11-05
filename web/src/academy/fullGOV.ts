import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullGOV=buildChapters([
  {
    "id": 11,
    "title": "PDTI e governança: como transformar necessidades em prioridades",
    "goal": "Diferenciar objetivo institucional, necessidade, iniciativa, orçamento, responsável e indicador numa organização de TI.",
    "context": "Uma instituição recebe pedidos de novos computadores, sistema de agendamento e proteção contra indisponibilidade. Atender tudo por ordem de chegada pode desperdiçar recursos. **Governança de TI** envolve direção e supervisão para garantir que a tecnologia contribua para objetivos da organização. O **PDTI** — Plano Diretor de Tecnologia da Informação, conforme contexto institucional — é instrumento de planejamento que relaciona necessidades, prioridades, recursos e ações de TI. Não é apenas uma tabela de equipamentos a comprar.",
    "explanation": "Comece pelo **objetivo** institucional, como reduzir o tempo de atendimento. Identifique a **necessidade** que impede esse resultado, por exemplo integração deficiente entre sistemas. Compare **alternativas**, estimando risco, custo, benefícios e dependências. Transforme a alternativa escolhida em **iniciativa**, com responsável, prazo, orçamento e indicador verificável. **Indicador** é medida usada para acompanhar desempenho, como tempo médio de espera; já número de computadores adquiridos mede entrega de recurso, não necessariamente o benefício final.",
    "connection": "O planejamento se liga à **governança** porque a direção define prioridades e aceita determinados riscos; a **gestão** executa iniciativas dentro dessas diretrizes. Um documento que afirma 'modernizar toda a TI' sem indicar metas e medidas não demonstra resultado. A estratégia também deve ser revisável: novas leis, orçamento ou mudanças no serviço podem alterar prioridades, desde que decisões sejam documentadas e avaliadas.",
    "exam": "Se a banca pergunta qual iniciativa é melhor, não escolha automaticamente a mais barata ou solicitada primeiro. Observe criticidade, riscos, impacto ao usuário e alinhamento com objetivos. Se a alternativa propõe 'comprar 100 PCs' como resultado final de melhoria do atendimento, diferencie **produto entregue** de **resultado obtido**. PDTI não substitui diretamente edital de contratação, plano de continuidade ou auditoria, embora deva relacionar-se com eles.",
    "caseTitle": "Qual projeto deve ter prioridade?",
    "caseSteps": [
      "A organização precisa escolher entre trocar cores do portal e corrigir um sistema crítico sem suporte de segurança.",
      "Defina critérios: criticidade, risco, impacto no serviço, custos, prazo e dependências.",
      "Avalie por esses critérios: correção do sistema crítico tende a apresentar benefício e mitigação de risco maiores no cenário.",
      "Registre objetivo, responsável, indicador e revisão prevista, em vez de aprovar ação apenas por preferência pessoal."
    ],
    "pitfalls": [
      "PDTI não é somente inventário ou lista de compras.",
      "Compra realizada é indicador de entrega, não necessariamente de benefício ao usuário.",
      "Governança e gestão têm responsabilidades relacionadas, mas diferentes.",
      "Prioridade não deve depender apenas da ordem em que pedidos chegaram."
    ],
    "cards": [
      [
        "Para que serve um PDTI?",
        "Para conectar necessidades e iniciativas de TI à estratégia institucional, com prioridades, recursos e metas."
      ],
      [
        "Qual diferença entre produto entregue e resultado?",
        "Produto é a entrega, como PCs instalados; resultado é o efeito desejado, como reduzir tempo de atendimento."
      ],
      [
        "Quem define direção estratégica na governança?",
        "As instâncias responsáveis por avaliar opções, direcionar prioridades e monitorar resultados."
      ],
      [
        "Por que revisar o planejamento?",
        "Porque riscos, recursos e necessidades podem mudar, exigindo prioridades justificadas e documentadas."
      ]
    ]
  },
  {
    "id": 51,
    "title": "ITIL: incidente ou requisição de serviço?",
    "goal": "Reconhecer interrupção não planejada e pedido rotineiro, definindo atendimento adequado a cada tipo.",
    "context": "Um colaborador abre chamado dizendo 'não consigo imprimir'. Outro solicita 'preciso instalar uma impressora autorizada'. Ambos chegam ao suporte, mas significam situações distintas. **Incidente** é interrupção não planejada de um serviço ou redução de qualidade, como impressora que deixou de imprimir. **Requisição de serviço** é solicitação do usuário para algo previamente definido ou autorizado, como provisionar acesso ou disponibilizar equipamento. A diferença não depende da palavra 'chamado', mas do que o solicitante necessita.",
    "explanation": "No **gerenciamento de incidentes**, a prioridade é restaurar serviço normal o mais rápido possível, conforme impacto e urgência. Uma falha que impede todo o setor de atender clientes tende a exigir atenção maior que impressora auxiliar de uso eventual. No **gerenciamento de requisições**, a equipe executa pedido conhecido por fluxo com requisitos e aprovações apropriados: por exemplo liberar acesso a aplicativo ao novo funcionário, desde que aprovado. **Catálogo de serviços** pode apresentar opções disponíveis e orientar prazos e canais.",
    "connection": "Ambos podem ser atendidos por **central de serviços** (*service desk*), ponto de contato para usuários. Mas o fluxo e a avaliação podem mudar. Um pedido de criar conta administrativa exige controle de autorização, não deve ser tratado como simples 'resolver rápido'. Por outro lado, restaurar um serviço parado pode demandar **contorno**, solução temporária até a causa ser investigada pelo gerenciamento de problemas.",
    "exam": "Se o enunciado apresenta 'aplicação fora do ar desde as 8h', é incidente. Se descreve 'colaborador novo solicitando acesso previsto em catálogo', é requisição, desde que autorizado. A banca pode tentar chamar qualquer solicitação de incidente; pergunte se houve interrupção/degradação ou apenas pedido de serviço definido. Prioridade é calculada por impacto e urgência, não automaticamente por cargo do solicitante.",
    "caseTitle": "Classifique três chamados",
    "caseSteps": [
      "'O sistema de cadastro parou para toda a recepção': incidente, com avaliação de impacto e urgência.",
      "'Solicito instalar programa aprovado na estação': requisição de serviço com fluxo de autorização adequado.",
      "'Preciso de acesso extra à área financeira': requisição sujeita a autorização, não liberação automática só porque foi pedida.",
      "Conclua que o rótulo decorre do objetivo e do estado do serviço, não do formato do chamado."
    ],
    "pitfalls": [
      "Um chamado não é automaticamente incidente.",
      "Incidente visa restaurar funcionamento; requisição normalmente fornece serviço previsto.",
      "Requisições de acesso exigem aprovação adequada.",
      "Prioridade de incidente deve refletir impacto e urgência, não apenas preferência do usuário."
    ],
    "cards": [
      [
        "O que caracteriza incidente no ITIL?",
        "Interrupção não planejada ou redução de qualidade de um serviço."
      ],
      [
        "O que é requisição de serviço?",
        "Pedido de usuário para ação ou serviço previamente definido, sujeito a fluxo e autorizações adequados."
      ],
      [
        "Qual objetivo imediato do gerenciamento de incidentes?",
        "Restaurar o serviço normal rapidamente, minimizando impacto."
      ],
      [
        "Por que pedido de acesso não deve ser liberado automaticamente?",
        "Porque fornecer serviço não elimina a necessidade de autenticação, aprovação e menor privilégio."
      ]
    ]
  },
  {
    "id": 52,
    "title": "Problema, mudança e CMDB: por que registrar relações entre serviços?",
    "goal": "Diferenciar restaurar serviço, investigar causa, alterar ambiente e manter registros de itens de configuração.",
    "context": "O sistema de atendimento falha toda manhã, mas volta depois de reiniciar. Esse padrão evidencia que restaurar operação não necessariamente eliminou a causa. **Gerenciamento de problemas** busca identificar e administrar causas ou causas potenciais de incidentes. A correção pode exigir uma **mudança**, adição, alteração ou remoção de algo que pode afetar serviço. Para avaliar impacto da mudança, a equipe precisa conhecer **itens de configuração**, elementos como servidores, aplicativos, bancos e suas relações.",
    "explanation": "A **CMDB (Configuration Management Database)** é uma base de informações sobre itens de configuração (**CIs**) e suas relações, conforme finalidade e processo de gestão. Por exemplo, sistema de agendamento depende de servidor web, banco de dados e conectividade. Se uma alteração no banco exige interrupção, a CMDB ajuda a identificar serviços impactados. Uma **mudança** deve considerar risco, autorização, comunicação, plano de reversão e verificação. Nem toda alteração deve seguir burocracia idêntica, mas mudanças de alto risco exigem controle proporcional.",
    "connection": "Um **incidente** interrompe serviço; um **problema** investiga causa; uma **mudança** executa alteração controlada; a **CMDB** ajuda a conhecer dependências envolvidas. São conceitos relacionados, não sinônimos. A base de configuração precisa ser confiável e mantida; uma CMDB desatualizada pode induzir decisões erradas. Registros ajudam análise, mas não substituem monitoração e conhecimento operacional.",
    "exam": "Se a banca fala 'identificar causa raiz de falhas recorrentes', pense em problema. Se fala 'avaliar risco de atualização de banco', pense em mudança. Se fala 'quais serviços dependem deste servidor?', pense em itens de configuração e suas relações. Uma armadilha é definir CMDB como mero inventário de computadores: ela pode modelar relacionamentos que explicam impacto do serviço.",
    "caseTitle": "Atualização do banco pode afetar três aplicações",
    "caseSteps": [
      "A equipe identificou falha recorrente na biblioteca de banco usada por três serviços.",
      "A análise de problemas identifica componente como possível causa e propõe atualização.",
      "A CMDB permite localizar serviços dependentes do banco e planejar janela, comunicação e reversão.",
      "A mudança é executada e testada; o problema só é considerado tratado após evidência de correção."
    ],
    "pitfalls": [
      "Incidente, problema e mudança representam objetivos diferentes.",
      "CMDB pode conter relações entre sistemas, não apenas números de patrimônio.",
      "Uma alteração em componente compartilhado pode afetar vários serviços.",
      "Reiniciar serviço não comprova eliminação da causa."
    ],
    "cards": [
      [
        "O que o gerenciamento de problemas busca?",
        "Identificar e administrar causas ou causas potenciais de incidentes, reduzindo recorrência."
      ],
      [
        "O que caracteriza uma mudança de TI?",
        "Adicionar, modificar ou remover algo com potencial de afetar serviços, exigindo controle proporcional ao risco."
      ],
      [
        "Para que serve CMDB?",
        "Registrar itens de configuração e relações relevantes para entender dependências e impactos."
      ],
      [
        "Por que contorno não encerra sempre um problema?",
        "Porque pode restaurar serviço temporariamente sem remover a causa de recorrência."
      ]
    ]
  },
  {
    "id": 54,
    "title": "SLI, SLO e SLA: transforme 'sistema bom' em medidas",
    "goal": "Distinguir indicador medido, objetivo interno e compromisso de serviço em exemplos de disponibilidade.",
    "context": "Um gerente afirma que o portal 'está sempre disponível', mas usuários relatam falhas de acesso. Para analisar, precisamos medir. **SLI** (*Service Level Indicator*) é indicador quantitativo de comportamento do serviço, como proporção de requisições respondidas corretamente. **SLO** (*Service Level Objective*) é meta definida para esse indicador, por exemplo 99,9% de respostas bem-sucedidas em um período. **SLA** (*Service Level Agreement*) é acordo com compromissos de nível de serviço e condições associadas, conforme relação contratual ou organizacional.",
    "explanation": "Imagine que, em um mês, 99.000 de 100.000 pedidos relevantes receberam resposta de sucesso conforme definição. O SLI de sucesso é **99%**. Se a meta SLO é **99,9%**, houve diferença de 0,9 ponto percentual, e o objetivo não foi atingido. Um SLA pode especificar esse compromisso, critérios, janelas excluídas, responsabilidades e consequências da não conformidade. A definição do denominador importa: contar todas as requisições, inclusive monitoramento irrelevante, pode distorcer o resultado.",
    "connection": "Essas medidas se relacionam à **experiência do usuário**. A porcentagem de uptime do servidor pode ser alta, mas uma rota crítica falhar o dia inteiro. Por isso o SLI precisa representar comportamento útil ao serviço. Também se conectam à **continuidade**, pois RTO mede tempo-alvo de recuperação após interrupção, enquanto SLO mede alvo contínuo de nível de serviço; são complementares. KPI é termo mais amplo para indicador de desempenho, não sinônimo automático de SLA.",
    "exam": "Se a banca apresenta '99,9% de disponibilidade desejada', está falando de meta SLO. Se apresenta '99,6% de disponibilidade medida', fala de SLI observado. Se apresenta cláusula acordada com cliente e responsabilidades, provavelmente SLA. Não confunda **indicador, meta e acordo**. Um enunciado pode trazer 43.200 minutos e 43 minutos indisponíveis: a disponibilidade aproximada é `(43200−43)/43200 × 100 ≈ 99,9005%`.",
    "caseTitle": "Uma meta SLO de 99,9% foi atingida?",
    "caseSteps": [
      "O SLO prevê 99,9% de respostas satisfatórias em 10.000 requisições definidas.",
      "O sistema entregou 9.950 respostas satisfatórias, totalizando SLI observado de `9950/10000=99,5%`.",
      "Compare 99,5% com 99,9%: a meta não foi atingida.",
      "Se há SLA que incorpora a meta, consulte regras do acordo para obrigações e consequências; não deduza multa sem contrato."
    ],
    "pitfalls": [
      "SLI é medição; SLO é meta; SLA é compromisso acordado.",
      "Uptime do servidor pode não refletir disponibilidade da função usada pelo cliente.",
      "99,5% é inferior a 99,9%, mesmo que ambos pareçam números altos.",
      "Nem todo SLO é automaticamente cláusula contratual com multa."
    ],
    "cards": [
      [
        "O que é SLI?",
        "Indicador mensurável do nível de serviço observado, como proporção de respostas satisfatórias."
      ],
      [
        "O que é SLO?",
        "Objetivo ou meta para determinado indicador de serviço em período/condições definidos."
      ],
      [
        "O que é SLA?",
        "Acordo de nível de serviço que estabelece compromissos e condições entre partes."
      ],
      [
        "Por que medir requisições satisfatórias em vez de apenas 'servidor ligado'?",
        "Porque a medição deve refletir utilidade do serviço para usuários, não somente processo ativo."
      ]
    ]
  },
  {
    "id": 57,
    "title": "Contratos de TI: o que fiscalizar depois da assinatura?",
    "goal": "Entender planejamento, especificação, entrega, aceite e fiscalização de serviços tecnológicos.",
    "context": "Um órgão contrata serviço de backup e recebe a primeira nota fiscal. Pode pagar automaticamente porque o fornecedor afirmou que instalou a ferramenta? Não. Um **contrato de TI** estabelece objeto, entregas, responsabilidades, critérios de aceite e condições de pagamento, conforme o regime aplicável. **Fiscalização** é acompanhamento da execução para verificar se o que foi contratado está sendo entregue. Instalar software não comprova que os dados críticos são recuperáveis.",
    "explanation": "O planejamento identifica necessidade e define requisitos verificáveis, como frequência de cópia, tempo de restauração, retenção e proteção de dados. O **termo de referência** ou documento equivalente descreve objeto e condições conforme a contratação. Durante execução, responsáveis conferem **evidências**: relatórios de execução, testes de restauração, disponibilidade observada e tratamento de falhas. O **aceite** reconhece que uma entrega atende critérios definidos; ele não deve ser automático sem conferência técnica.",
    "connection": "A gestão contratual conecta áreas técnica, administrativa e jurídica. Uma equipe de TI pode comprovar funcionamento, mas não necessariamente decidir sozinha sobre todas as consequências financeiras ou jurídicas. **SLA** estabelece compromisso mensurável; **SLI** oferece dados observados; **SLO** representa meta. A qualidade das especificações iniciais determina o que pode ser fiscalizado depois. Se o contrato só diz 'backup confiável', faltam critérios claros para avaliar a obrigação.",
    "exam": "Uma questão pode perguntar se nota fiscal prova SLA cumprido: não. Também pode confundir contratação de suporte com aquisição simples de equipamento — serviços contínuos precisam de acompanhamento de desempenho ao longo do período. A fiscalização não deve alterar unilateralmente obrigações contratuais sem procedimento legal; registre não conformidade, evidência, comunicação e providências conforme o regime.",
    "caseTitle": "Fornecedor diz que o backup funciona, mas nunca restaurou dados",
    "caseSteps": [
      "O contrato exige cópias diárias e restauração demonstrada em teste mensal.",
      "A equipe confere relatórios de cópia e solicita teste real de restauração conforme escopo e critérios.",
      "Sem teste, não é possível atestar integralmente o requisito de recuperação apenas por relatório de sucesso de backup.",
      "Registre falha de evidência, acione fluxo contratual e acompanhe correção conforme responsáveis e condições pactuadas."
    ],
    "pitfalls": [
      "Nota fiscal não comprova sozinha qualidade técnica da entrega.",
      "Requisito vago dificulta fiscalização e aceite.",
      "Relatório 'backup concluído' não comprova restauração possível.",
      "Fiscalização precisa de registros objetivos e responsabilidades definidas."
    ],
    "cards": [
      [
        "O que fiscalizar num contrato de backup?",
        "Execução, retenção, proteção e capacidade real de restauração conforme os requisitos acordados."
      ],
      [
        "O que é aceite técnico?",
        "Verificação de que determinada entrega satisfaz critérios definidos no contrato ou documento de referência."
      ],
      [
        "Por que SLA precisa de medição?",
        "Porque compromisso sem critério observável dificulta conferir se o fornecedor atendeu ao acordado."
      ],
      [
        "Nota fiscal substitui prova de execução?",
        "Não. É necessário verificar entrega, evidências e critérios aplicáveis de fiscalização."
      ]
    ]
  },
  {
    "id": 58,
    "title": "Segurança por design e fornecedores: proteja antes de contratar",
    "goal": "Introduzir riscos de terceiros, acesso privilegiado, privacidade por projeto e responsabilidades no ciclo de fornecimento.",
    "context": "Um fornecedor pede acesso remoto permanente ao banco de dados de uma clínica para prestar suporte. A contratação pode melhorar atendimento, mas aumenta a quantidade de pessoas e sistemas com capacidade de acessar informações. **Gestão de terceiros** consiste em avaliar e acompanhar riscos associados a fornecedores, desde seleção até encerramento. **Segurança por design** significa considerar controles de proteção desde requisitos e arquitetura, em vez de tentar acrescentar tudo depois de implantar o sistema.",
    "explanation": "Antes de conceder acesso, defina **qual serviço será prestado**, quais dados são necessários, tempo de acesso e papel de cada parte. Controles possíveis incluem credenciais individuais, MFA, restrição de origem, autorização por função, registro de sessões e revogação quando o contrato termina. Cláusulas sobre incidentes, responsabilidades, retenção e exclusão de dados podem ser importantes conforme tipo de contratação e legislação. Um fornecedor não deve manter acesso administrativo indefinidamente apenas por conveniência.",
    "connection": "A **LGPD** exige avaliar papéis de controlador e operador conforme quem toma decisões e trata dados em nome de quem; o rótulo do contrato não resolve sozinho toda a análise. **NIST CSF 2.0** inclui governança de riscos da cadeia de suprimentos. A área de TI executa controles, enquanto instâncias de governança definem critérios e responsabilidades. Segurança por design se aplica também ao código: controles de autorização devem ser previstos na API, não apenas adicionados após reclamação de vazamento.",
    "exam": "Se a questão apresenta 'fornecedor antigo ainda tem VPN e senha de administrador', a falha envolve gestão do ciclo de acesso, não apenas ausência de antivírus. Se a solução proposta é compartilhar uma conta genérica entre todos os técnicos, perde-se rastreabilidade. Se afirma que terceirizar transfere integralmente responsabilidade e elimina deveres do contratante, desconfie; responsabilidade depende de lei, contratos e papel efetivo.",
    "caseTitle": "Terceirizada encerrou o contrato: e os acessos?",
    "caseSteps": [
      "Mapeie credenciais, VPN, contas de serviço, compartilhamentos e dados acessados pelo fornecedor durante o contrato.",
      "Defina procedimento de encerramento com devolução/eliminação adequada de ativos e revogação de acessos necessários.",
      "Valide nos logs e sistemas que contas e sessões foram desabilitadas, conforme regras e preservação de evidências.",
      "Revise riscos residuais e registre responsáveis; encerrar pagamento não desabilita tecnicamente uma senha."
    ],
    "pitfalls": [
      "Terceirização não elimina automaticamente responsabilidade do contratante.",
      "Acesso permanente de fornecedor deve ser justificado e revisado.",
      "Contas compartilhadas dificultam atribuir ações a pessoas específicas.",
      "Segurança por design começa nos requisitos, não apenas após incidente."
    ],
    "cards": [
      [
        "O que significa segurança por design?",
        "Incorporar requisitos e controles de proteção desde arquitetura e desenvolvimento do serviço."
      ],
      [
        "Por que credenciais individuais de fornecedores importam?",
        "Porque permitem autorização específica e rastreabilidade de ações, evitando conta genérica compartilhada."
      ],
      [
        "O que verificar no encerramento de contrato de TI?",
        "Revogação de acessos, devolução/gestão de ativos e tratamento de dados e responsabilidades."
      ],
      [
        "Gestão de terceiros termina na assinatura do contrato?",
        "Não. Envolve seleção, riscos, monitoramento contínuo e encerramento controlado."
      ]
    ]
  },
  {
    "id": 103,
    "title": "ITIL na operação: fluxo completo de incidente a solução permanente",
    "goal": "Acompanhar ocorrência recorrente pela central de serviços, contorno, investigação e mudança controlada.",
    "context": "O serviço de agendamento fica indisponível toda segunda-feira. A central atende dezenas de chamados e reinicia a aplicação. Na semana seguinte, tudo se repete. Esse cenário ensina por que **restaurar** não é sinônimo de **resolver a causa**. O gerenciamento de incidentes busca restabelecer serviço rapidamente; o gerenciamento de problemas investiga causas de ocorrências ou potenciais ocorrências. Um **contorno** é solução provisória que permite operar antes da correção definitiva.",
    "explanation": "Primeiro registre o incidente: horário, sintomas, usuários afetados, impacto e urgência. A prioridade deve refletir consequências e necessidade de resposta. A equipe pode utilizar contorno documentado, mantendo comunicação com usuários. Paralelamente, uma investigação de problemas busca padrões, logs, alterações recentes e possíveis causas. Quando a solução exigir atualizar componente, use controle de **mudança**: avalie risco, janela, aprovação, plano de reversão e testes. Depois, acompanhe a operação para confirmar que a recorrência cessou.",
    "connection": "Uma **requisição** é pedido definido do usuário, como instalar programa aprovado; não deve ser confundida com incidente. A **base de conhecimento** registra procedimentos e resultados úteis para atendimentos futuros, mas não substitui diagnóstico. A **CMDB** pode indicar dependências entre servidores e serviços durante a avaliação de mudança. Esse fluxo conecta a experiência do usuário às atividades técnicas, evitando que a central se limite a fechar chamados sem corrigir problemas recorrentes.",
    "exam": "Se o enunciado pergunta 'qual prática identifica causa subjacente?', escolha problemas. Se pergunta 'qual reduz impacto imediatamente?', escolha incidentes e contorno. Se pergunta 'como controlar atualização do sistema em produção?', escolha mudança. Não é necessário criar três equipes isoladas: são objetivos gerenciais distintos que podem ser executados de forma integrada.",
    "caseTitle": "A mesma falha voltou após quatro reinícios",
    "caseSteps": [
      "A central registra cada interrupção como incidente e executa contorno para restaurar atendimento.",
      "Analisa recorrência e cria investigação de problema com logs e correlação de eventos.",
      "Identifica incompatibilidade de versão; planeja mudança controlada com testes e reversão.",
      "Após atualização, monitora se a falha deixou de ocorrer e registra conclusão fundamentada."
    ],
    "pitfalls": [
      "Fechar incidente após contorno não elimina automaticamente o problema.",
      "Mudança é processo de alteração controlada, não sinônimo de incidente.",
      "Requisição de serviço é distinta de interrupção não planejada.",
      "CMDB e base de conhecimento ajudam análise, mas não substituem evidência do funcionamento."
    ],
    "cards": [
      [
        "Por que incidente e problema são práticas diferentes?",
        "Incidente foca restaurar serviço; problema investiga causas ou causas potenciais de falhas."
      ],
      [
        "O que é contorno?",
        "Solução temporária que permite continuar operação sem eliminar necessariamente a causa."
      ],
      [
        "Quando entra a gestão de mudança?",
        "Quando é preciso alterar algo que pode afetar serviços, avaliando risco e controlando execução."
      ],
      [
        "Como comprovar que um problema recorrente foi tratado?",
        "Com evidência da causa corrigida e monitoramento de que os incidentes deixaram de ocorrer."
      ]
    ]
  },
  {
    "id": 104,
    "title": "COBIT e PDTI: diretriz estratégica não é execução operacional",
    "goal": "Diferenciar governança, gestão, domínios COBIT e planejamento de TI num mesmo programa de melhoria.",
    "context": "Uma diretoria decide que deve reduzir risco de indisponibilidade. A equipe de TI responde propondo comprar dois servidores, mas ninguém avaliou se essa é a solução mais adequada. **Governança** consiste em avaliar necessidades, direcionar prioridades e monitorar resultados; **gestão** planeja e executa atividades de acordo com essas diretrizes. O **COBIT 2019** é uma referência para governança e gestão da informação e tecnologia empresarial. Seu domínio de governança **EDM** resume Evaluate, Direct and Monitor — Avaliar, Direcionar e Monitorar.",
    "explanation": "Os objetivos de **gestão** no COBIT são agrupados em **APO** (alinhamento, planejamento e organização), **BAI** (construção, aquisição e implementação), **DSS** (entrega, serviço e suporte) e **MEA** (monitoramento, avaliação e análise de gestão). Uma mesma iniciativa pode envolver planejamento da aquisição (APO), implantação (BAI), atendimento operacional (DSS) e acompanhamento de controles (MEA). O órgão de governança decide apetite de risco e cobra evidências, em vez de configurar cada servidor. **PDTI** concretiza necessidades e prioridades de planejamento, com ações, metas e recursos.",
    "connection": "Não confunda **governança** com **auditoria**. Uma auditoria pode fornecer evidências para monitoramento, mas não substitui o direcionamento estratégico. O mesmo vale para um plano de TI: se não há conexão com objetivos institucionais e métricas, vira inventário de compras. O COBIT pode ser usado em conjunto com ITIL, que tem foco mais específico em gestão de serviços; nenhum substitui automaticamente leis e regulamentações aplicáveis.",
    "exam": "A banca pode descrever diretoria definindo tolerância a risco e perguntar domínio: **EDM**. Pode descrever implantar sistema: **BAI**. Pode descrever atender chamados: **DSS**. Se descrever medir conformidade de controles e desempenho da gestão: **MEA**. Para atividades de planejamento e recursos: **APO**. Não trate as siglas como uma linha do tempo obrigatória; são domínios de objetivos que se relacionam.",
    "caseTitle": "Quem aprova e quem executa a continuidade de serviço?",
    "caseSteps": [
      "Comitê avalia impacto da indisponibilidade e exige serviço recuperável em até uma hora: atividade de governança EDM.",
      "A TI planeja estratégia e orçamento: APO, podendo refletir-se no PDTI.",
      "A equipe implementa infraestrutura de recuperação: BAI; depois opera e atende falhas: DSS.",
      "A organização acompanha indicadores e conformidade: MEA, com resultados supervisionados por governança."
    ],
    "pitfalls": [
      "EDM é domínio de governança; APO, BAI, DSS e MEA são de gestão.",
      "Aprovar direção não significa configurar pessoalmente controles técnicos.",
      "PDTI não é somente lista de equipamentos.",
      "COBIT e ITIL podem ser complementares, mas não têm exatamente o mesmo foco."
    ],
    "cards": [
      [
        "Qual domínio COBIT 2019 corresponde à governança?",
        "EDM — Avaliar, Direcionar e Monitorar."
      ],
      [
        "O que representa BAI?",
        "Construção, aquisição e implantação/implementação de soluções dentro da gestão."
      ],
      [
        "Qual domínio se relaciona à operação e suporte?",
        "DSS — entrega, serviços e suporte."
      ],
      [
        "Por que ligar PDTI à governança?",
        "Porque projetos e recursos precisam apoiar prioridades institucionais e resultados monitoráveis."
      ]
    ]
  },
  {
    "id": 105,
    "title": "Scrum e Kanban aplicados: por que medir fluxo antes de iniciar mais tarefas",
    "goal": "Relacionar Sprints, histórias, definição de pronto, lead time, cycle time e WIP à entrega real.",
    "context": "Uma equipe de desenvolvimento inicia dez tarefas na segunda-feira e conclui apenas uma na sexta. O quadro aparenta atividade, mas há pouco resultado para o usuário. Abordagens ágeis procuram entregar valor em ciclos e aprender com evidências. **Scrum** organiza trabalho em Sprints com objetivos, responsabilidades e eventos; **Kanban** ajuda a visualizar fluxo e controlar **WIP** (*Work in Progress*), isto é, quantidade de trabalho simultaneamente em andamento.",
    "explanation": "No Scrum, o **Product Backlog** organiza demandas do produto; o **Sprint Backlog** detalha o objetivo e o trabalho escolhido para a Sprint; a **Definition of Done** explicita critérios de qualidade para considerar incremento concluído. Em Kanban, um quadro mostra estados do trabalho e limites de WIP ajudam a não sobrecarregar etapas. **Lead time** costuma medir o tempo desde entrada/solicitação de trabalho até entrega, conforme definição adotada. **Cycle time** costuma medir a duração do trabalho a partir do início efetivo até conclusão. Definir início/fim é essencial para comparar números.",
    "connection": "Uma equipe pode combinar práticas de Kanban em trabalho baseado em Scrum, desde que preserve as regras e compromissos do framework quando afirma praticá-lo. Não confunda **velocidade** ou volume de tarefas com valor gerado: concluir itens irrelevantes não melhora o serviço. Métricas ajudam a encontrar gargalos e planejar capacidade, mas precisam ser interpretadas com contexto e qualidade, não usadas para premiar apenas contagem de cliques ou tickets.",
    "exam": "Se o enunciado diz que tarefas ficam presas em 'Em teste', a resposta coerente pode ser analisar gargalo e limite de WIP, não iniciar mais desenvolvimento. Se uma história está codificada, mas falha na Definition of Done, não deve ser contabilizada como incremento pronto no Scrum. 'Sprint Review' examina resultado do produto; 'Retrospective' examina como trabalhar melhor. Confundir esses eventos produz erros frequentes.",
    "caseTitle": "A coluna de testes virou gargalo",
    "caseSteps": [
      "Um quadro possui 12 itens 'Em teste', 7 'Em desenvolvimento' e apenas 2 concluídos na semana.",
      "Localize acúmulo na etapa de teste: iniciar mais itens tende a aumentar WIP e fila.",
      "Combine política de limite de WIP, colaboração para concluir testes e medição do cycle time.",
      "Acompanhe melhora por entregas concluídas com qualidade, não pelo número de itens iniciados."
    ],
    "pitfalls": [
      "Iniciar muitas tarefas não equivale a entregar valor.",
      "Definition of Done define qualidade mínima do incremento; código escrito pode não estar pronto.",
      "Lead time e cycle time dependem de marcos de início e fim claramente definidos.",
      "Review e Retrospective têm finalidades diferentes no Scrum."
    ],
    "cards": [
      [
        "O que é WIP?",
        "Quantidade de trabalhos em andamento em determinado momento ou etapa do fluxo."
      ],
      [
        "O que é Definition of Done?",
        "Conjunto formal de critérios de qualidade que um incremento precisa atender para ser considerado pronto."
      ],
      [
        "O que lead time costuma medir?",
        "Tempo decorrido desde solicitação/entrada no fluxo até entrega, conforme limites definidos."
      ],
      [
        "Por que limitar WIP pode ajudar?",
        "Porque evita acúmulo de trabalho iniciado e favorece conclusão de itens antes de iniciar outros."
      ]
    ]
  },
  {
    "id": 133,
    "title": "Incidentes, problemas e mudanças: classifique pela pergunta principal",
    "goal": "Resolver questões de ITIL classificando finalidade de atendimento, investigação e alteração do serviço.",
    "context": "As palavras **incidente**, **problema** e **mudança** aparecem juntas em editais e, por isso, são confundidas. A maneira mais segura é pensar em três perguntas: **'Como faço o serviço voltar agora?'** corresponde ao foco de incidente; **'Por que isso acontece e como reduzir recorrência?'** aponta a problema; **'Como alterar algo sem criar novo dano?'** aponta a mudança. Um chamado de usuário pode levar a atividades das três práticas, mas não significa que sejam sinônimas.",
    "explanation": "Uma falha no sistema de senha pode ser incidente, e o suporte utiliza contorno para restabelecer atendimento. Se a falha volta diariamente, a equipe investiga logs e dependências para gerenciar problema. Se descobre necessidade de nova versão, planeja uma mudança com avaliação de risco, janela, testes e reversão. **Impacto** informa quantas pessoas e serviços foram afetados; **urgência** informa a rapidez necessária. Ambos podem orientar a prioridade do incidente.",
    "connection": "A **central de serviços** coordena comunicação e recebe demandas; a **base de conhecimento** registra procedimentos úteis; a **CMDB** pode revelar quais serviços dependem do componente afetado. Todos ajudam, mas não mudam a finalidade de cada prática. Uma solicitação rotineira para criar conta aprovada é requisição de serviço, mesmo que chegue pelo mesmo sistema de chamados. A classificação evita que métricas de incidente se confundam com volume de solicitações comuns.",
    "exam": "Em enunciados com verbo 'identificar causa', pense em problemas; com 'restabelecer', pense em incidentes; com 'implantar correção em produção', em mudanças. Evite concluir que toda mudança é uma resposta a incidente: também pode ser evolução planejada. E nem toda ocorrência de erro exige abertura de problema separado, dependendo de política, impacto e padrões observados.",
    "caseTitle": "Uma interrupção gerou quatro chamados e uma atualização",
    "caseSteps": [
      "A falha afeta recepção: registre incidente e restabeleça o serviço por contorno controlado.",
      "A recorrência leva à investigação de problema para identificar a causa técnica.",
      "A correção exige atualização em produção; gerencie a mudança com risco, testes e reversão.",
      "Após implementação, monitore recorrência para verificar se a causa foi realmente eliminada."
    ],
    "pitfalls": [
      "Incidente e problema são práticas diferentes, mesmo relacionados.",
      "Contorno pode resolver impacto imediato sem tratar causa.",
      "Mudança não é necessariamente defeito; pode ser melhoria planejada.",
      "Requisição rotineira não deve ser classificada como incidente apenas por vir pelo suporte."
    ],
    "cards": [
      [
        "Qual é o foco de incidentes?",
        "Restaurar serviço normal rapidamente, reduzindo o impacto aos usuários."
      ],
      [
        "Qual é o foco de problemas?",
        "Identificar e administrar causas ou causas potenciais de incidentes."
      ],
      [
        "Qual é o foco de mudanças?",
        "Realizar alterações que afetem serviços com risco e execução controlados."
      ],
      [
        "O que é contorno?",
        "Solução temporária para manter operação enquanto uma correção definitiva pode ser investigada."
      ]
    ]
  },
  {
    "id": 134,
    "title": "COBIT em decisões práticas: EDM, APO, BAI, DSS e MEA",
    "goal": "Classificar atividades de tecnologia nos cinco domínios do COBIT sem decorar siglas fora de contexto.",
    "context": "Um órgão aprova política de risco, planeja um software, implanta a solução, presta atendimento e mede qualidade. Todas são atividades de TI, mas respondem a perguntas diferentes. O **COBIT** ajuda a organizar **governança** e **gestão** corporativa da informação e tecnologia. No COBIT 2019, **EDM** é o domínio de governança: avaliar opções, direcionar e monitorar resultados. Os outros quatro domínios tratam de objetivos de gestão, com responsabilidades operacionais e de planejamento.",
    "explanation": "**APO (Align, Plan and Organize)** reúne planejamento, alinhamento e organização. **BAI (Build, Acquire and Implement)** envolve construir, adquirir e implantar soluções. **DSS (Deliver, Service and Support)** foca entrega operacional, serviços e suporte. **MEA (Monitor, Evaluate and Assess)** trata de monitoramento, avaliação e conformidade no âmbito de gestão. Um mesmo sistema pode passar por APO no planejamento, BAI na implantação, DSS em operação e MEA em controle de resultados; EDM estabelece direção estratégica e supervisão ao longo desse ciclo.",
    "connection": "O uso de nomes semelhantes não transforma todos os objetivos em governança. MEA monitora e avalia questões de gestão, enquanto EDM inclui direção e supervisão estratégica. O **PDTI** apoia planejamento, mas sua elaboração não substitui a decisão de prioridades. COBIT e ITIL podem conviver: COBIT aborda governança e gestão empresarial da tecnologia; ITIL orienta práticas de gerenciamento de serviços. Não os trate como versões concorrentes do mesmo processo.",
    "exam": "Quando uma banca pergunta 'qual domínio do COBIT corresponde a restabelecer serviços e apoiar usuário?', pense em DSS. Quando descreve implantação, BAI. Para estratégia e planejamento, APO. Para avaliação de desempenho e conformidade, MEA. Para direção pelo órgão de governança, EDM. É melhor reconhecer o **verbo da ação** que decorar a posição da sigla numa lista.",
    "caseTitle": "Classifique um projeto de continuidade",
    "caseSteps": [
      "A diretoria define nível de risco tolerado e acompanha resultados: EDM.",
      "Equipe planeja estratégia e recursos: APO; implanta redundância: BAI.",
      "Operação atende incidentes e restaura serviços: DSS.",
      "Auditoria/gestão avalia desempenho e conformidade: MEA, fornecendo dados para supervisão."
    ],
    "pitfalls": [
      "EDM é governança, não um tipo de suporte técnico.",
      "BAI é implantação; DSS é operação e suporte.",
      "MEA monitora e avalia gestão, não assume automaticamente toda decisão estratégica.",
      "COBIT não é um processo cronológico obrigatório de cinco fases."
    ],
    "cards": [
      [
        "Qual domínio é governança no COBIT 2019?",
        "EDM: avaliar, direcionar e monitorar resultados."
      ],
      [
        "Qual domínio costuma cobrir implantação de soluções?",
        "BAI: construir, adquirir e implementar."
      ],
      [
        "Qual domínio cobre prestação e suporte de serviços?",
        "DSS: entregar, servir e apoiar a operação."
      ],
      [
        "Qual domínio analisa desempenho e conformidade de gestão?",
        "MEA: monitorar, avaliar e analisar resultados e controles."
      ]
    ]
  },
  {
    "id": 135,
    "title": "PDTI com indicadores: de uma promessa a uma meta mensurável",
    "goal": "Construir objetivos, iniciativas e métricas e distinguir resultado de esforço e de entregas.",
    "context": "Um plano declara 'melhorar a informatização'. Todos concordam, mas ninguém sabe o que verificar ao final. O **PDTI** precisa relacionar uma necessidade real a iniciativas e **indicadores** que mostram se o objetivo foi alcançado. Um **objetivo** descreve estado desejado, como reduzir interrupções. Uma **iniciativa** é atividade ou projeto para avançar nesse objetivo, como atualizar infraestrutura. Um **indicador** é medida observável, por exemplo minutos mensais de indisponibilidade do serviço.",
    "explanation": "Defina uma **linha de base**, o valor atual, antes de estabelecer meta. Se a interrupção mensal média é de 240 minutos, a meta pode ser reduzir a menos de 60 até uma data específica. Estabeleça fonte de dados, período, método de cálculo e responsável. O **indicador de esforço** pode ser horas trabalhadas; **indicador de entrega** pode ser quantidade de servidores substituídos; **indicador de resultado** mede benefício, como disponibilidade percebida pelo usuário. Os três podem ser úteis, mas não substituem um ao outro.",
    "connection": "A governança precisa comparar benefício esperado, risco e custo, porque recursos são limitados. Um PDTI coerente não garante sucesso automático: ações podem atrasar e as metas podem ser inadequadas. Revisão periódica ajuda ajustar prioridades com justificativa. Isso se conecta à fiscalização contratual: uma iniciativa financiada deve produzir evidências do que foi entregue e do resultado alcançado, não apenas notas fiscais.",
    "exam": "Se uma alternativa oferece 'realizar cinco reuniões' como indicador de atendimento mais rápido, avalie se mede resultado ou apenas atividade. Se promete reduzir falhas sem definir janela ou métrica, a meta é difícil de verificar. Em questões de priorização, evite escolher iniciativa por ser tecnicamente sofisticada; procure alinhamento a objetivos públicos ou institucionais e benefício verificável.",
    "caseTitle": "Transforme 'melhorar disponibilidade' em meta",
    "caseSteps": [
      "Meça a linha de base: sistema fica indisponível 240 minutos por mês, em média, no período definido.",
      "Defina meta: reduzir indisponibilidade para abaixo de 60 minutos/mês até dezembro, com mesmo método de medição.",
      "Selecione iniciativas de correção, monitoramento e continuidade, com responsáveis e orçamento.",
      "Reavalie indicadores mensalmente; se a meta não foi atingida, investigue causas em vez de declarar sucesso porque instalou equipamentos."
    ],
    "pitfalls": [
      "Número de reuniões mede esforço, não benefício de serviço.",
      "Indicador sem fonte e período definidos dificulta comparação.",
      "Meta precisa ser comparável à linha de base.",
      "Entrega de projeto não significa automaticamente obtenção do resultado esperado."
    ],
    "cards": [
      [
        "O que é linha de base de indicador?",
        "Valor observado antes da intervenção, usado para comparar se as metas foram alcançadas."
      ],
      [
        "Qual diferença entre indicador de entrega e de resultado?",
        "Entrega mede produto concluído; resultado mede efeito sobre o objetivo e usuário."
      ],
      [
        "Por que meta deve ter prazo e método de medição?",
        "Para permitir verificar objetivamente se a organização alcançou o que prometeu."
      ],
      [
        "O que fazer quando projeto foi entregue, mas indicador não melhorou?",
        "Investigar causas, reavaliar solução e ajustar plano, sem confundir execução com benefício."
      ]
    ]
  },
  {
    "id": 136,
    "title": "Acordos de serviço: SLA, SLO, SLI e métricas úteis",
    "goal": "Distinguir compromisso, objetivo e observação medidos em períodos e condições definidos.",
    "context": "Um contrato afirma que o suporte deve atender chamados 'rapidamente'. Quanto é rápido? Uma hora ou dois dias? Uma medida útil requer critérios. O **SLA** é acordo de nível de serviço, definindo compromissos e condições. O **SLO** é objetivo para uma medida específica de desempenho. O **SLI** é indicador observado do comportamento do serviço. A mesma organização pode ter vários indicadores, como taxa de resolução, tempo de resposta e disponibilidade, cada qual com método próprio.",
    "explanation": "Imagine meta de disponibilidade de 99,5% em um mês: isso é SLO. O monitor mede 99,2%: SLI. O SLA pode incorporar essa meta e definir responsabilidades, exclusões, comunicação e consequências conforme contrato. Calcule disponibilidade como `(tempo de serviço considerado disponível)/(tempo total considerado) × 100`, desde que definamos claramente período e eventos excluídos ou incluídos. **Tempo de resposta** mede intervalo até primeiro atendimento; **tempo de resolução** mede até solucionar o chamado. São indicadores distintos.",
    "connection": "Indicadores de serviço não são garantia de que o usuário conseguiu realizar uma atividade crítica. Um servidor web pode retornar HTTP 200 para página inicial enquanto a função de agendamento está indisponível. É melhor medir comportamento relevante ao usuário. Isso se conecta a **RTO**, objetivo de recuperação após interrupção, que não é idêntico a disponibilidade mensal agregada. Um SLA pode ter métricas de RTO, mas cada conceito possui finalidade própria.",
    "exam": "Se o enunciado apresenta 5 minutos de resposta e 2 horas de solução, não trate como a mesma meta. Se informa número medido de 98% e objetivo de 99,9%, a diferença indica meta não atingida, mesmo que o serviço tenha funcionado a maior parte do tempo. Evite assumir multa automática: consequências dependem do texto do acordo e do regime aplicável.",
    "caseTitle": "O monitor diz 98%, o contrato exige 99,9%",
    "caseSteps": [
      "Defina que o SLI observado de disponibilidade no período contratual foi 98%.",
      "Identifique a meta SLO de 99,9%; compare no mesmo período e método.",
      "Como 98% é menor que 99,9%, o objetivo não foi atingido.",
      "Avalie obrigações e consequências conforme o SLA, com dados de medição e possíveis exclusões previstas."
    ],
    "pitfalls": [
      "SLI é valor medido, SLO é meta e SLA é acordo.",
      "Tempo de primeiro atendimento é diferente de tempo até solução.",
      "Disponibilidade do servidor não é necessariamente disponibilidade da função de negócio.",
      "Consequências contratuais dependem do acordo, não apenas da comparação numérica."
    ],
    "cards": [
      [
        "O que é SLI?",
        "Indicador quantitativo observado do comportamento do serviço."
      ],
      [
        "O que é SLO?",
        "Objetivo ou meta para determinado indicador, com período e condições definidos."
      ],
      [
        "O que é SLA?",
        "Acordo que formaliza compromissos de serviço, responsabilidades e condições."
      ],
      [
        "Qual a diferença entre resposta e resolução de chamado?",
        "Resposta marca o início/primeiro atendimento; resolução marca conclusão do problema ou pedido."
      ]
    ]
  },
  {
    "id": 160,
    "title": "Oficina de SLA: calcule disponibilidade sem enganar o usuário",
    "goal": "Calcular nível de serviço observado e verificar se o indicador mede a função efetivamente utilizada.",
    "context": "Um portal está com o processo web ativo, mas o botão de agendamento falha para todos. A medição de CPU e uptime do servidor pode parecer perfeita, enquanto a experiência real do usuário é ruim. **SLI** é um indicador do comportamento de serviço; **SLO** define meta e **SLA** pode formalizar compromisso. O desenho do indicador é tão importante quanto o cálculo: ele precisa medir o comportamento que realmente importa e considerar condições de observação adequadas.",
    "explanation": "Para calcular disponibilidade numa janela definida, identifique **tempo total** e **tempo indisponível** conforme regras de medição. Se o mês considerado possui 43.200 minutos e o serviço ficou indisponível 86,4 minutos, o tempo disponível foi 43.113,6; taxa de disponibilidade é `(43113,6/43200)×100=99,8%`. Se a meta é 99,9%, houve descumprimento da meta. Uma aplicação pode ter várias funções críticas e precisar de verificações por jornada, não apenas ping ao host.",
    "connection": "Uma medição de **solicitações bem-sucedidas** também precisa distinguir tipos de resposta: HTTP 200 numa rota de saúde não comprova processamento correto de agendamento. É importante definir o que conta como sucesso. Em gestão de serviços, indicadores apoiam priorização e negociação de melhorias. Mas métricas não substituem relatos de usuários nem análise de incidentes; servem para orientá-las com evidências.",
    "exam": "A banca pode oferecer uma disponibilidade de 99,8% e perguntar se supera meta de 99,9%. Não: a diferença de 0,1 ponto percentual importa. Também pode esconder erro de denominador — incluir janela não prevista ou retirar falhas sem previsão. Procure **período, critério de sucesso e fontes de medição** antes de concluir que SLA foi cumprido.",
    "caseTitle": "Disponibilidade de 99,8% atende SLO de 99,9%?",
    "caseSteps": [
      "Tempo total monitorado: 43.200 minutos. Indisponibilidade relevante: 86,4 minutos.",
      "Tempo disponível: 43.113,6 minutos; disponibilidade calculada: 99,8%.",
      "Compare ao SLO de 99,9% no mesmo período: meta não foi alcançada.",
      "Registre e avalie consequência conforme SLA, com evidência de período e regras de exclusão válidas."
    ],
    "pitfalls": [
      "99,8% é menor que 99,9%, mesmo parecendo muito próximo.",
      "Uptime de processo não comprova disponibilidade da função usada pelo cidadão.",
      "Denominador e exclusões precisam estar definidos antes do cálculo.",
      "Meta não atingida não permite inventar multa sem verificar SLA."
    ],
    "cards": [
      [
        "Como calcular taxa de disponibilidade?",
        "Divida tempo considerado disponível pelo total do período e multiplique por 100, conforme critérios definidos."
      ],
      [
        "Qual é a disponibilidade com 86,4 minutos de parada em 43.200 minutos?",
        "99,8% no período considerado, abaixo de uma meta de 99,9%."
      ],
      [
        "Por que HTTP 200 da página inicial pode ser insuficiente?",
        "Porque uma função crítica como agendamento pode estar falhando apesar de a página responder."
      ],
      [
        "O que conferir antes de afirmar cumprimento de SLA?",
        "Período, método de medição, metas, exclusões e fontes de evidência acordadas."
      ]
    ]
  },
  {
    "id": 161,
    "title": "Oficina de priorização: risco, custo e responsabilidade de TI",
    "goal": "Escolher iniciativas sob orçamento limitado com critérios de impacto, valor, dependência e risco residual.",
    "context": "Uma empresa tem dinheiro para somente uma das três iniciativas: trocar switches com suporte encerrado, redesenhar portal de intranet ou comprar impressora adicional pouco utilizada. A escolha não deve se basear em quem pede mais alto, mas em critérios. **Priorização** é ordenar demandas conforme valor esperado, riscos e restrições. **Risco** combina incerteza e impacto potencial; **benefício** é resultado desejado; **dependência** é algo que precisa ocorrer antes para viabilizar outra ação.",
    "explanation": "Defina critérios transparentes: criticidade de serviço, exposição a falha ou ataque, exigência legal, impacto ao usuário, custo, prazo, capacidade da equipe e dependências. Atribua pesos apenas se os dados e decisões forem justificáveis; pontuações inventadas podem dar aparência de precisão e esconder decisões arbitrárias. Considere também custo de **não agir**, como continuidade em equipamento sem suporte ou perda recorrente de produtividade. Uma iniciativa menor pode ser prioritária se remover risco relevante e imediato.",
    "connection": "O PDTI registra necessidades e iniciativas, enquanto governança aprova direção e acompanha benefícios. Planos de ação devem indicar responsável, prazo e evidências. No âmbito de contratos, entrega técnica e resultado para o usuário precisam ser acompanhados. Aceitar o risco de não realizar uma iniciativa é decisão que deve ter autoridade e justificativa. Não é equivalente a ignorar um problema.",
    "exam": "Uma questão que apresenta orçamento limitado pode pedir 'melhor decisão de gestão'. Procure a alternativa que identifica critérios e justifica prioridades, em vez de 'atender primeiro o pedido mais recente'. Se um item propõe investimento com benefício aparente mas exige sistema prévio ainda inexistente, analise dependência. Se fala em risco de continuidade, não conclua apenas 'comprar redundância': compare alternativas como manutenção, recuperação testada e mitigação por processo.",
    "caseTitle": "Escolha uma ação com verba para um só projeto",
    "caseSteps": [
      "Liste três demandas e critério: risco, criticidade, custo, benefício e dependências.",
      "Switch crítico sem suporte atende serviço essencial e apresenta risco de indisponibilidade; portal estético tem benefício menor no cenário dado.",
      "Priorize mitigação de risco do switch conforme evidências, orçamento e alternativas, sem declarar regra universal para qualquer empresa.",
      "Registre responsável, prazo, indicador de resultado e risco residual das iniciativas postergadas."
    ],
    "pitfalls": [
      "Ordem de solicitação não é critério suficiente de prioridade.",
      "Pontuação sem dados pode criar falsa precisão.",
      "Entrega física de equipamento não comprova redução efetiva de risco.",
      "Risco adiado precisa ser conhecido e supervisionado, não simplesmente esquecido."
    ],
    "cards": [
      [
        "O que uma priorização de TI deve considerar?",
        "Criticidade, impacto, risco, benefícios, custo, prazo e dependências das iniciativas."
      ],
      [
        "Por que 'primeiro quem pediu' é critério fraco?",
        "Porque ignora objetivos institucionais, consequências e restrições reais."
      ],
      [
        "O que significa risco residual ao adiar projeto?",
        "A exposição que permanece enquanto a mitigação não é executada ou é executada parcialmente."
      ],
      [
        "Como verificar se uma prioridade gerou benefício?",
        "Medindo indicador relacionado ao objetivo, não apenas constatando que a compra ocorreu."
      ]
    ]
  }
] satisfies EditorialSeed[])
