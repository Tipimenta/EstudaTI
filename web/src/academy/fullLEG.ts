import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullLEG=buildChapters([
  {
    "id": 18,
    "title": "Lei 14.133 e contratações de TI: por que o planejamento vem antes da compra",
    "goal": "Entender necessidade pública, planejamento, ETP, termo de referência, edital, seleção e fiscalização sem decorar um fluxo cego.",
    "context": "Uma prefeitura quer contratar um novo sistema de atendimento. Antes de escolher fornecedor, precisa explicar **qual problema público será resolvido**, quais alternativas existem e quanto a solução custará ao longo de sua utilização. A **Lei 14.133/2021** estabelece normas gerais de licitações e contratos administrativos dentro de seu âmbito de aplicação. **Licitação** é o procedimento formal para seleção de propostas em condições legais, não simplesmente leilão de preços; **contrato** define obrigações da Administração e do contratado. A decisão precisa buscar solução adequada ao interesse público, não só a menor mensalidade anunciada.",
    "explanation": "A fase **preparatória** considera planejamento da contratação. Um **Estudo Técnico Preliminar (ETP)**, conforme exigibilidade e regulamentos, analisa necessidade, soluções possíveis e justificativas. O **Termo de Referência (TR)** detalha características, condições de execução, medição, entrega e fiscalização do objeto conforme situação. O **edital** comunica regras da disputa aos interessados, e o julgamento avalia propostas segundo critério definido. Após contratação, responsáveis acompanham entrega e resultado, respeitando atribuições de gestão e fiscalização.",
    "connection": "Em TI, uma solução pode exigir integração, migração de dados, segurança, suporte, treinamento e continuidade. Esses requisitos influenciam TR e contrato. Uma assinatura do fornecedor não comprova que o sistema entrega tudo: aceite técnico exige evidências. **Modalidade** de licitação (como pregão ou concorrência) não é o mesmo que **critério de julgamento** (como menor preço ou técnica e preço quando cabível). O procedimento deve observar a lei e os regulamentos aplicáveis, e existem hipóteses específicas de contratação direta, que não são uma 'modalidade' adicional.",
    "exam": "Se a questão apresenta 'comprar software sem levantar requisitos e descobrir depois que não integra', a falha é de planejamento e especificação. Se mistura ETP e TR como documentos idênticos, examine funções. Se descreve uma modalidade como sinônimo de tipo de julgamento, identifique a confusão. A prova pode exigir detalhes de artigo e exceção: consulte a versão legal prevista no edital. Fonte: [Lei 14.133/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm).",
    "caseTitle": "Contratação de sistema que não conversa com a base existente",
    "caseSteps": [
      "A Administração precisa substituir sistema legado, mas não conhece formatos de integração e migração.",
      "Na preparação, identifica necessidade e alternativas no ETP conforme aplicabilidade, incluindo custos e riscos.",
      "O TR descreve interfaces, segurança, testes, aceite e suporte verificáveis; edital incorpora regras do procedimento.",
      "Na execução, fiscais conferem entregas e testes reais de integração antes de atestar cumprimento integral."
    ],
    "pitfalls": [
      "Licitação não é apenas comparar o preço final sem requisitos.",
      "ETP e TR têm papéis diferentes no planejamento, conforme casos e normas.",
      "Modalidade não é sinônimo de critério de julgamento.",
      "Assinatura do contrato não equivale a aceite técnico da entrega."
    ],
    "cards": [
      [
        "Por que planejar contratação de TI antes de licitar?",
        "Para identificar necessidade, alternativas, requisitos, riscos e critérios de aceite do serviço público."
      ],
      [
        "O que o ETP procura demonstrar?",
        "A necessidade e análise preliminar de soluções e justificativas para contratação, quando exigível."
      ],
      [
        "O que um TR especifica?",
        "Objeto, condições, requisitos e critérios para execução e verificação da entrega conforme contratação."
      ],
      [
        "Por que fiscalização contratual importa?",
        "Porque verifica evidências de execução e cumprimento das obrigações, além da assinatura do contrato."
      ]
    ]
  },
  {
    "id": 83,
    "title": "LGPD: o que é dado pessoal e quem decide seu tratamento?",
    "goal": "Distinguir dado, dado pessoal, dado sensível, titular, controlador e operador numa situação de serviço de saúde.",
    "context": "Uma pessoa agenda exame e informa nome, telefone e histórico médico. Esses registros não são 'números sem importância': podem identificar alguém e afetar sua privacidade. **Dado pessoal** é informação relacionada à pessoa natural identificada ou identificável. **Dado sensível** inclui, entre outras categorias legais, informação referente à saúde. **Titular** é a pessoa a quem o dado se refere. A **LGPD — Lei 13.709/2018** disciplina tratamento de dados pessoais em situações abrangidas por sua aplicação, incluindo operações em meios digitais e físicos.",
    "explanation": "**Tratamento** é um conceito amplo: coletar, consultar, armazenar, transmitir, alterar e eliminar são exemplos de operações. O **controlador** toma decisões referentes ao tratamento; o **operador** trata dados em nome do controlador. Esses papéis devem ser analisados **por operação concreta**, não apenas pelo nome do contrato. Um laboratório pode ser controlador de determinadas atividades; um fornecedor que processa dados conforme instruções pode atuar como operador naquele contexto. O **encarregado** atua como canal de comunicação sobre proteção de dados conforme regras aplicáveis.",
    "connection": "Dado sensível possui hipóteses específicas de tratamento, relacionadas ao art. 11, além dos princípios. Ter permissão no sistema ou consentimento genérico não torna todo uso adequado: é necessário analisar finalidade, necessidade, transparência, segurança e base legal aplicável. Identificar os papéis ajuda decidir quem responde a solicitações e incidentes. Guias da ANPD explicam que uma organização pode exercer papéis distintos conforme o tratamento considerado.",
    "exam": "Se a banca diz que dado pessoal é somente CPF, rejeite: identificadores indiretos também podem ser pessoais. Se afirma que armazenar não é tratamento, é falso. Se diz que trabalhador subordinado dentro da empresa é automaticamente operador independente da empresa, desconfie: a análise de agentes considera entidades e relação efetiva de tratamento. Fonte: [ANPD — orientações](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes).",
    "caseTitle": "Quem toma decisões sobre dados de exames?",
    "caseSteps": [
      "Uma clínica decide quais dados coletar no agendamento e por quanto tempo mantê-los conforme obrigações.",
      "Um prestador de software processa dados em nome da clínica seguindo instruções para operação específica.",
      "Analise a clínica como possível controladora daquela finalidade e o fornecedor como possível operador, conforme fatos.",
      "Registre finalidades, papéis e responsabilidade por acesso, incidentes e pedidos dos titulares."
    ],
    "pitfalls": [
      "Dado pessoal não se limita a CPF ou nome completo.",
      "Dado de saúde é sensível conforme LGPD.",
      "Armazenar e consultar também são tratamento.",
      "Controlador e operador são papéis analisados por operação, não apenas título comercial."
    ],
    "cards": [
      [
        "O que é dado pessoal segundo LGPD?",
        "Informação relacionada a pessoa natural identificada ou identificável."
      ],
      [
        "Por que resultado de exame exige atenção especial?",
        "Porque dados referentes à saúde são dados pessoais sensíveis com regras específicas."
      ],
      [
        "Qual papel do controlador?",
        "Tomar decisões referentes às operações de tratamento de dados pessoais."
      ],
      [
        "Qual papel do operador?",
        "Realizar tratamento em nome do controlador conforme operação e relação efetiva."
      ]
    ]
  },
  {
    "id": 84,
    "title": "LGPD: bases legais e princípios antes de pedir consentimento",
    "goal": "Entender o motivo de uma base legal, os princípios de finalidade e necessidade e limites do consentimento.",
    "context": "Um cadastro exige que a pessoa clique 'Aceito todos os usos possíveis' para conseguir atendimento. Esse botão não resolve automaticamente a questão jurídica. A LGPD exige fundamento para **cada operação de tratamento**, chamado usualmente **base legal**, além de observar princípios. **Finalidade** exige propósitos legítimos, específicos, explícitos e informados nas condições legais. **Necessidade** orienta limitar o tratamento ao mínimo pertinente para realizar essas finalidades. Um dado não deixa de ser excessivo apenas porque o aplicativo colocou uma caixa de seleção.",
    "explanation": "O art. 7º traz hipóteses legais de tratamento de dados pessoais comuns, como consentimento, cumprimento de obrigação legal ou regulatória e execução de políticas públicas, conforme critérios. O art. 11 disciplina dados **sensíveis**, como dados de saúde, com hipóteses próprias, incluindo tutela da saúde em condições específicas. **Consentimento** é uma das bases possíveis, não a única nem uma autorização irrestrita. A organização deve identificar qual hipótese se aplica a cada uso, documentar finalidade e apresentar informações de modo acessível aos titulares.",
    "connection": "Uma clínica pode precisar registrar informações para prestar atendimento e cumprir obrigações legais. Mas usar os mesmos dados para publicidade desvinculada exige avaliação jurídica própria; o motivo inicial não autoriza automaticamente novo tratamento. **Adequação** trata compatibilidade do uso com finalidades informadas; **segurança** exige medidas para proteger dados; **transparência** permite ao titular compreender operações. Os princípios atuam juntos, sem substituir base legal.",
    "exam": "A banca pode perguntar se consentimento é obrigatório em toda operação: não. Pode dizer que dados tornados públicos ficam sem proteção pela LGPD: a lei ainda possui regras e princípios aplicáveis. Se descreve coleta de dez informações para executar tarefa que usa apenas duas, o princípio da necessidade é diretamente relevante. Fonte: [ANPD — Perguntas Frequentes](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes).",
    "caseTitle": "É necessário coletar data de nascimento para todo contato?",
    "caseSteps": [
      "Uma instituição quer enviar aviso de manutenção e solicita nome, e-mail, CPF, data de nascimento e histórico clínico.",
      "Defina finalidade específica do envio e quais dados são realmente necessários para alcançá-la.",
      "Avalie base legal apropriada e necessidade de cada campo; dados sensíveis requerem hipótese específica.",
      "Reduza coleta sem justificativa, informe finalidade e proteja os dados efetivamente utilizados."
    ],
    "pitfalls": [
      "Consentimento não é a única base legal.",
      "Base legal não substitui princípios de finalidade e necessidade.",
      "Dados de saúde seguem hipóteses específicas do art. 11.",
      "Um clique genérico não justifica automaticamente qualquer uso futuro dos dados."
    ],
    "cards": [
      [
        "O que é base legal?",
        "Hipótese prevista na LGPD que autoriza determinada operação de tratamento, conforme o caso."
      ],
      [
        "O que exige princípio da finalidade?",
        "Propósitos legítimos, específicos, explícitos e informados segundo a lei."
      ],
      [
        "O que exige princípio da necessidade?",
        "Limitação do tratamento ao mínimo pertinente e proporcional para a finalidade."
      ],
      [
        "Consentimento é obrigatório em todos os tratamentos?",
        "Não. A LGPD prevê diferentes bases legais, escolhidas conforme operação e tipo de dado."
      ]
    ]
  },
  {
    "id": 88,
    "title": "Lei de Acesso à Informação: publicidade e sigilo sem confusão",
    "goal": "Entender transparência ativa, passiva, pedido de acesso e proteção de informações pessoais no setor público.",
    "context": "Um cidadão deseja saber quanto a prefeitura gastou com manutenção de computadores. Essa informação pode ser de interesse público e deve ser tratada conforme regras de transparência. A **Lei 12.527/2011 (LAI)** regulamenta o acesso à informação pública no seu âmbito, com a publicidade como regra e restrições de acesso nas hipóteses legais. **Transparência ativa** é disponibilizar informações de interesse coletivo de forma proativa, sem esperar pedido individual. **Transparência passiva** ocorre quando a Administração responde a solicitação de acesso apresentada pelo interessado.",
    "explanation": "Um pedido de acesso pode tratar dados sobre contratos, despesas, serviços e atos públicos. A Administração deve possuir canais e procedimentos para receber, avaliar e responder, observando prazos e regras legais; existem hipóteses de informações classificadas e proteção de informações pessoais. Não é correto dizer que LAI torna todos os documentos inteiramente públicos sem exceção. **Sigilo** deve ter fundamento e ser aplicado nas condições previstas, não por simples preferência do gestor. Quando há partes públicas e pessoais, pode ser necessário fornecimento parcial com proteção do trecho restrito.",
    "connection": "LAI e **LGPD** não são rivais: transparência de atos públicos e proteção de dados pessoais devem ser conciliadas conforme finalidade e regras aplicáveis. Publicar um contrato pode ser obrigatório, mas divulgar dados sensíveis desnecessários de indivíduos não é consequência automática. A **anonimização**, quando efetivamente impede identificação nos critérios da lei, pode ajudar disponibilizar estatísticas; suprimir o nome isoladamente nem sempre impede reidentificação.",
    "exam": "Se a questão disser que qualquer cidadão precisa justificar interesse pessoal no pedido para ter acesso a informação pública, examine as regras: em geral não se exige motivação quanto ao uso da informação nas condições da LAI. Se oferecer divulgação irrestrita de prontuários como exemplo de transparência, rejeite. O examinador costuma perguntar o princípio 'publicidade como regra, sigilo como exceção', sem apagar exceções legalmente justificadas.",
    "caseTitle": "Cidadão pede gastos da prefeitura com TI",
    "caseSteps": [
      "O pedido busca valores e contratos de tecnologia custeados pelo poder público, sujeitos a transparência conforme a LAI.",
      "O órgão localiza documentos e avalia eventual dado pessoal ou restrição legal específica.",
      "Fornece informações acessíveis, eventualmente com tratamento de trechos protegidos e resposta fundamentada.",
      "Caso negue acesso dentro das hipóteses legais, informa fundamento e meios de revisão/recurso conforme procedimento."
    ],
    "pitfalls": [
      "LAI não significa divulgação irrestrita de qualquer informação pessoal.",
      "Publicidade é regra, mas há restrições legais justificadas.",
      "Transparência ativa difere de resposta a pedido individual.",
      "Proteção de dados e transparência devem ser conciliadas."
    ],
    "cards": [
      [
        "O que significa transparência ativa?",
        "Divulgação proativa de informações públicas de interesse coletivo, conforme exigências legais."
      ],
      [
        "O que significa transparência passiva?",
        "Atendimento a pedidos de acesso à informação apresentados por interessados."
      ],
      [
        "Qual princípio geral da LAI?",
        "Publicidade como regra e sigilo nas hipóteses legais, com justificativa adequada."
      ],
      [
        "LAI autoriza publicar prontuários pessoais indiscriminadamente?",
        "Não. Acesso público deve respeitar restrições, privacidade e proteção das informações pessoais."
      ]
    ]
  },
  {
    "id": 89,
    "title": "Governo digital: serviço online deve ser acessível e útil",
    "goal": "Compreender a Lei 14.129/2021, simplificação, canais digitais, interoperabilidade e foco no cidadão.",
    "context": "Uma pessoa precisa solicitar um documento à prefeitura. O órgão cria um site, mas exige que o cidadão imprima formulário, assine e leve presencialmente sem justificativa. Digitalizar a capa de um processo não significa melhorar o serviço. A **Lei 14.129/2021** estabelece princípios, regras e instrumentos para Governo Digital e eficiência pública nos âmbitos em que se aplica. **Serviço digital** é serviço público oferecido com interação por meios digitais; a experiência deve considerar acesso, clareza, segurança e simplificação.",
    "explanation": "**Interoperabilidade** é a capacidade de sistemas trocar e utilizar informações com significado e regras adequadas; por exemplo, evitar solicitar novamente dado que a Administração já pode obter legitimamente de outra base. **Usabilidade** refere-se à facilidade com que pessoas conseguem realizar tarefas; **acessibilidade** busca permitir utilização por pessoas com diferentes condições e necessidades. A oferta digital pode envolver autenticação, integração de dados e comunicação transparente sobre o andamento do pedido.",
    "connection": "Governo digital se relaciona a **LGPD** porque integração de bases exige finalidade, base legal e proteção adequada; e à **LAI** porque acesso à informação e transparência podem ser oferecidos digitalmente. Digitalização não significa divulgar todo dado ao público. Também não se trata de obrigar que todo cidadão possua dispositivo sofisticado, ignorando exclusão digital e condições legais de atendimento. O resultado deve ser serviço efetivo, não apenas aplicativo publicado.",
    "exam": "Se a banca afirma que governo digital é instalar computadores e abandonar atendimento humano sem avaliar leis e necessidades, a descrição é insuficiente. Se pergunta por troca organizada de informações entre sistemas, pense em interoperabilidade. Se fala em orientar formulários pela tarefa do cidadão, pense em usabilidade e simplificação. Fonte: [Lei 14.129/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm).",
    "caseTitle": "Portal digital exige cinco visitas presenciais",
    "caseSteps": [
      "Mapeie a jornada do cidadão, identificando etapas presenciais sem necessidade legal demonstrada.",
      "Avalie simplificar exigências e integrar dados legitimamente disponíveis em órgãos compatíveis.",
      "Ofereça acompanhamento digital, informações claras, autenticação proporcional e mecanismos acessíveis.",
      "Meça tempo e conclusão da solicitação, não apenas quantidade de páginas criadas no portal."
    ],
    "pitfalls": [
      "Publicar portal não prova simplificação do serviço.",
      "Interoperabilidade não autoriza compartilhar dados sem finalidade e base apropriada.",
      "Acessibilidade e usabilidade são dimensões diferentes e complementares.",
      "Governo digital não significa ignorar desigualdade de acesso aos serviços."
    ],
    "cards": [
      [
        "O que é interoperabilidade entre sistemas públicos?",
        "Capacidade de trocar e utilizar informações com significado e regras adequadas."
      ],
      [
        "Por que governo digital não é só criar website?",
        "Porque precisa melhorar o resultado e a experiência do serviço, com segurança, acesso e simplificação."
      ],
      [
        "Qual relação com LGPD?",
        "Troca e uso de dados pessoais precisam de finalidade, base legal e medidas de proteção."
      ],
      [
        "Como medir benefício de serviço digital?",
        "Por tempo, acessibilidade, conclusão de tarefas e satisfação/qualidade percebida, não só telas publicadas."
      ]
    ]
  },
  {
    "id": 90,
    "title": "Ética e princípios administrativos: o que significa LIMPE na prática?",
    "goal": "Explicar legalidade, impessoalidade, moralidade, publicidade e eficiência por decisões públicas concretas.",
    "context": "Um gestor decide comprar software da empresa de um amigo apenas porque confia nele. Mesmo que o produto funcione, a decisão pode contrariar princípios que orientam a Administração Pública. O art. 37 da Constituição traz princípios expressos conhecidos pelo mnemônico **LIMPE**: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. A sigla é útil para lembrar os nomes, mas não ensina por que cada princípio existe. É necessário relacionar cada um a deveres e situações reais.",
    "explanation": "**Legalidade** exige atuar conforme competências e normas aplicáveis; **impessoalidade** impede favorecer ou prejudicar pessoas por preferências pessoais em decisões públicas. **Moralidade** envolve padrões éticos de conduta administrativa, além de formalidade isolada. **Publicidade** orienta transparência de atos, respeitando hipóteses legais de sigilo e proteção de dados. **Eficiência** busca boa utilização de recursos e resultados apropriados, sem dispensar legalidade. Uma contratação aparentemente barata pode ser inadequada se direcionada ou sem necessidade.",
    "connection": "Os princípios convivem: publicidade não obriga divulgar dados sensíveis indevidamente; eficiência não permite ignorar licitação aplicável; impessoalidade não significa tratamento mecânico que desconsidere regras de prioridade legal. A **ética administrativa** envolve prevenção de conflitos de interesse e responsabilidade pelas decisões. Os princípios são parâmetros para planejamento, execução e fiscalização dos serviços, não apenas um acrônimo para decorar.",
    "exam": "Uma alternativa que afirma 'eficiência permite contratar amigo sem procedimento legal' é errada. Outra que define 'publicidade' como divulgação total de qualquer dado também é incorreta. Em questão que descreve favorecimento por relação pessoal, impessoalidade é ponto central. Mas o mesmo fato pode envolver mais de um princípio; escolha aquele diretamente cobrado pelo enunciado.",
    "caseTitle": "Servidor recomenda fornecedor sem análise técnica",
    "caseSteps": [
      "A chefia decide escolher empresa de conhecido sem justificar necessidade, comparar opções ou aplicar procedimento devido.",
      "O favorecimento pessoal coloca em risco impessoalidade e moralidade, além da legalidade conforme situação.",
      "Uma contratação legítima exige critérios objetivos, publicidade adequada e observância do regime aplicável.",
      "A eficiência deve ser avaliada por resultado e custo total, não usada para afastar os demais princípios."
    ],
    "pitfalls": [
      "Eficiência não autoriza descumprir lei.",
      "Publicidade possui limites legais de sigilo e dados pessoais.",
      "Impessoalidade proíbe favorecimento pessoal no exercício da função.",
      "Memorizar LIMPE não substitui entender consequências administrativas."
    ],
    "cards": [
      [
        "O que significa legalidade administrativa?",
        "Atuar no exercício de competências e dentro das normas aplicáveis à Administração."
      ],
      [
        "O que impessoalidade procura impedir?",
        "Decisões de favorecimento ou perseguição individual baseadas em preferências pessoais."
      ],
      [
        "Publicidade significa expor todo dado pessoal?",
        "Não. Há restrições legais e deveres de proteção de informações pessoais."
      ],
      [
        "Eficiência permite ignorar procedimento legal?",
        "Não. Busca bons resultados e uso adequado dos recursos dentro das exigências legais."
      ]
    ]
  },
  {
    "id": 115,
    "title": "LGPD aplicada: quando consentimento não é a resposta automática",
    "goal": "Analisar finalidade, base legal, agentes e necessidade com casos de serviço público e saúde.",
    "context": "Uma instituição pública solicita cadastro para prestar serviço previsto em política pública e apresenta caixa 'Concordo' como única explicação. O tratamento de dados depende de **base legal**, não de uma fórmula mágica de consentimento. A LGPD prevê hipóteses legais distintas conforme dados e finalidade, incluindo regras específicas para setor público e para dados sensíveis. **Controlador** decide sobre o tratamento; **operador** realiza tratamento em nome do controlador. Compreender esses papéis ajuda definir quais informações serão coletadas e quem responde por seu uso.",
    "explanation": "Comece identificando a operação: coletar nome para agendamento, guardar laudo para obrigação, enviar publicidade, compartilhar com fornecedor. Cada finalidade pode exigir análise própria. **Consentimento** é base prevista em hipóteses legais, mas não precisa ser a base de todas as operações. **Cumprimento de obrigação legal**, **execução de políticas públicas** e **tutela da saúde** são exemplos de hipóteses relevantes em contextos definidos, observando artigos distintos para dados comuns e sensíveis. O princípio da **necessidade** limita coleta ao mínimo pertinente; **transparência** informa propósitos e direitos.",
    "connection": "Uma base legal permite tratar dados para finalidade específica sob condições; não significa poder enviar todo cadastro a qualquer fornecedor. **Compartilhamento** requer avaliação de papéis, finalidade, segurança e regras legais. Um sistema pode estar tecnicamente protegido por HTTPS e ainda realizar coleta excessiva, o que mostra diferença entre **segurança** e **adequação legal do tratamento**. Documentar operações favorece responder a titulares e verificar controles.",
    "exam": "Quando a banca pergunta 'consentimento é obrigatório em todos os tratamentos?', a resposta é não. Se traz dados de saúde, avalie hipóteses do art. 11 e não apenas art. 7. Se diz que uma empresa deixa de responder porque terceirizou tratamento a software, analise papéis e obrigações: terceirização não elimina automaticamente responsabilidade. Use [FAQ ANPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes).",
    "caseTitle": "Instituição quer usar dados do atendimento em campanha publicitária",
    "caseSteps": [
      "O cadastro foi coletado para serviço de atendimento com finalidade e base legal específicas.",
      "Uma campanha publicitária introduz finalidade diferente, que não fica automaticamente autorizada pelo tratamento inicial.",
      "Avalie hipótese legal própria, transparência, necessidade e opções de titular conforme operação.",
      "Não presuma que consentimento genérico antigo resolve novo uso sem análise e registros adequados."
    ],
    "pitfalls": [
      "Base legal depende da operação e do tipo de dado.",
      "Consentimento não é escolha automática para todo tratamento.",
      "Dados de saúde recebem regras específicas de tratamento.",
      "Finalidade inicial não autoriza automaticamente usos incompatíveis posteriores."
    ],
    "cards": [
      [
        "O que deve ser definido antes de escolher base legal?",
        "Qual dado será tratado, para qual finalidade, por quem e em quais condições."
      ],
      [
        "Qual a diferença entre art. 7º e 11 da LGPD?",
        "O art. 7º trata hipóteses gerais e o 11 prevê hipóteses para dados pessoais sensíveis."
      ],
      [
        "Consentimento genérico cobre qualquer finalidade futura?",
        "Não. Tratamentos precisam respeitar bases, finalidades e demais princípios específicos."
      ],
      [
        "Por que documentar operações?",
        "Para demonstrar finalidade, papéis, base, medidas de proteção e capacidade de responder a titulares."
      ]
    ]
  },
  {
    "id": 116,
    "title": "ETP, termo de referência e fiscalização: não compre sem definir como testar",
    "goal": "Relacionar necessidade, escolha da solução, especificação e acompanhamento de contrato de tecnologia.",
    "context": "Um órgão compra solução de backup porque o fornecedor promete 'proteção completa'. Meses depois, descobre que não consegue recuperar o banco em tempo útil. O erro começou antes da implantação: a necessidade não foi traduzida em requisitos e critérios de aceite. **ETP** é estudo preliminar para examinar necessidade e alternativas, quando exigível; **TR** especifica objeto e condições de execução de contratação, conforme normas; **fiscalização** acompanha se o contratado cumpre as obrigações. São funções encadeadas, não documentos com nomes diferentes para a mesma coisa.",
    "explanation": "O planejamento pergunta quais dados são críticos e quais metas de recuperação existem. No TR, formule requisitos verificáveis: cópias protegidas, retenção, periodicidade, **RTO** (tempo-alvo de recuperação), **RPO** (perda de dados tolerável) e testes de restauração. Durante contrato, o fiscal técnico pode examinar logs, relatórios de execução e testes, registrando não conformidade. O **aceite** deve seguir critérios pactuados e atribuições dos responsáveis, não apenas a apresentação de nota fiscal.",
    "connection": "A Lei 14.133 exige observar procedimentos e responsabilidades aplicáveis. A gestão do contrato envolve área técnica e administrativa, e mudanças nas condições precisam seguir instrumentos legais e contratuais. **SLA** estabelece compromissos de nível de serviço; **SLI** mede desempenho observado. Esses indicadores alimentam fiscalização, mas não são sinônimos de ETP ou TR. Uma boa especificação reduz discussões posteriores porque define o que será considerado atendimento.",
    "exam": "A banca pode perguntar em qual etapa se compara alternativas para resolver a necessidade: ETP, conforme regime. Se pergunta por requisitos detalhados e critérios de medição: TR e documentos de contratação apropriados. Se pergunta por verificar se fornecedor entregou e registrar descumprimento: fiscalização/gestão contratual. Não conclua que toda compra exige exatamente os mesmos documentos em todas hipóteses; exceções e regulamentos importam.",
    "caseTitle": "Backup entregue, mas restauração leva 36 horas",
    "caseSteps": [
      "O órgão necessitava recuperar em até quatro horas, porém a contratação não especificou nem testou o tempo.",
      "No planejamento, a necessidade deve ser convertida em RTO e outras exigências mensuráveis.",
      "O TR e contrato precisam incorporar condições verificáveis, incluindo teste de restauração.",
      "A fiscalização mede resultado, registra eventual não conformidade e segue providências contratuais cabíveis."
    ],
    "pitfalls": [
      "ETP e TR não são sinônimos nem têm exatamente a mesma função.",
      "Nota fiscal não comprova cumprimento técnico completo.",
      "SLA sem medição dificulta verificar execução de contrato.",
      "Fiscalização precisa de critérios definidos antes da entrega."
    ],
    "cards": [
      [
        "Qual pergunta o ETP busca responder?",
        "Qual necessidade precisa ser atendida e quais soluções são pertinentes e justificadas, conforme aplicabilidade."
      ],
      [
        "Qual papel do TR?",
        "Especificar objeto, requisitos, execução e critérios de verificação conforme contratação."
      ],
      [
        "Qual papel da fiscalização?",
        "Acompanhar e documentar se obrigações e entregas estão sendo cumpridas."
      ],
      [
        "Por que RTO/RPO precisam estar claros?",
        "Porque recuperação e perda tolerável precisam ser testadas contra metas explícitas."
      ]
    ]
  },
  {
    "id": 117,
    "title": "Transparência e privacidade: LAI, LGPD e serviço digital juntas",
    "goal": "Entender como disponibilizar informação pública sem expor dados pessoais desnecessários.",
    "context": "Um cidadão solicita relatórios de atendimento de uma unidade pública. Os relatórios podem incluir quantidade de serviços, despesas, nomes de funcionários e informações identificáveis de pacientes. A Administração deve lidar com dois interesses legítimos: **transparência de atos públicos**, orientada pela LAI, e **proteção de dados pessoais**, orientada pela LGPD. Não é necessário escolher 'publicar tudo' ou 'esconder tudo'. É necessário avaliar natureza de cada informação e regras legais aplicáveis.",
    "explanation": "**LAI** prevê procedimentos para acesso e transparência, com publicidade como regra e restrições fundamentadas. **LGPD** disciplina tratamento de dados pessoais, inclusive operações de compartilhamento e publicação. Uma resposta pode disponibilizar valores agregados e informações de gestão, protegendo partes pessoais não necessárias ao interesse do pedido. **Anonimizar** exige considerar possibilidade de identificação direta ou indireta; apenas tirar o nome nem sempre torna um conjunto anônimo. A informação deve ser compreensível e acessível, inclusive por canais digitais.",
    "connection": "A **Lei 14.129/2021** trata de governo digital em seu âmbito, incentivando serviços e informações acessíveis, eficientes e com uso adequado de dados. Disponibilizar portal sem clareza nem segurança não cumpre por si o objetivo de transparência. A organização precisa de responsáveis, controles de acesso e procedimentos para analisar pedidos e responder corretamente. Transparência e proteção de dados podem ser conciliadas por avaliação de finalidade e conteúdo.",
    "exam": "Se a questão afirma que LGPD revogou LAI, rejeite: são normas com finalidades relacionadas, que precisam de harmonização. Se diz que todo dado de órgão público é público sem exceção, incorreto. Se propõe negar pedido inteiro quando parte poderia ser fornecida sem informação pessoal protegida, examine possibilidade legal de acesso parcial. A solução deve ser fundamentada, não baseada no medo genérico de multas.",
    "caseTitle": "Solicitação de relatório com nomes de pacientes",
    "caseSteps": [
      "O cidadão pede quantitativo e gastos do serviço, mas o arquivo contém identificadores de pacientes.",
      "Separe dados de gestão potencialmente públicos dos dados pessoais sem necessidade para atender o pedido.",
      "Avalie anonimização ou supressão adequada e regras da LAI/LGPD para fornecer informação legítima.",
      "Registre fundamento da resposta e preserve direitos dos titulares, evitando publicação indevida."
    ],
    "pitfalls": [
      "LAI e LGPD não são leis mutuamente excludentes.",
      "Remover apenas o nome pode não anonimizar dados reidentificáveis.",
      "Publicidade como regra admite restrições previstas em lei.",
      "Negativa genérica sem avaliar acesso parcial pode ser inadequada."
    ],
    "cards": [
      [
        "Por que LAI e LGPD devem ser conciliadas?",
        "Porque transparência de atos públicos e proteção de dados pessoais são deveres relacionados."
      ],
      [
        "O que é acesso parcial à informação?",
        "Disponibilizar parte acessível de documento enquanto se protege informação sujeita a restrição legal."
      ],
      [
        "Remover nomes garante anonimização?",
        "Não necessariamente; outros atributos podem permitir reidentificação direta ou indireta."
      ],
      [
        "O que governo digital deve oferecer além de portal?",
        "Serviços e informações claros, acessíveis, eficientes e protegidos conforme normas aplicáveis."
      ]
    ]
  },
  {
    "id": 148,
    "title": "LGPD no setor público: finalidade e base legal para cada serviço",
    "goal": "Diferenciar política pública, obrigação legal, consentimento e tratamento de dados sensíveis em órgãos públicos.",
    "context": "Uma prefeitura precisa registrar informações de cidadãos para executar uma política de saúde. Alguns agentes imaginam que precisam solicitar consentimento para todo dado, inclusive quando a própria atividade decorre de dever legal ou política pública. A **LGPD** prevê hipóteses distintas de **base legal**, analisadas de acordo com finalidade e categoria de dados. No setor público, o tratamento tem regras específicas de transparência, finalidade pública e competências legais. Isso não significa que todo dado recebido possa ser usado livremente entre secretarias.",
    "explanation": "Uma operação de dados comuns pode enquadrar-se em execução de política pública nas condições do art. 7º e regras aplicáveis; dados sensíveis, como saúde, têm hipóteses específicas no art. 11. O **consentimento** não é ferramenta universal nem precisa ser escolhido automaticamente. O órgão deve mapear finalidade, tipos de dados, compartilhamentos, responsáveis, transparência e medidas de segurança. O **princípio da necessidade** impede coletar informações desproporcionais à finalidade, mesmo quando há base legal.",
    "connection": "Um sistema de governo digital pode facilitar compartilhamento entre órgãos para serviço público, mas deve respeitar regras e contextos legais; não existe autorização geral para vender dados ou expô-los. O controlador define decisões de tratamento, e fornecedores contratados podem atuar como operadores conforme operação. A **LAI** permite transparência sobre políticas públicas sem exigir divulgação indiscriminada de registros pessoais sensíveis.",
    "exam": "A banca pode dizer que órgão público é dispensado de todos princípios da LGPD: falso. Também pode sugerir 'sempre consentimento' ao tratar dado de política pública; examine hipótese adequada ao regime e ao dado. Identifique distinção entre dado comum e sensível e entre compartilhar para finalidade legal e fornecer dados para publicidade desvinculada.",
    "caseTitle": "Dois órgãos querem compartilhar registros para serviço público",
    "caseSteps": [
      "Descreva finalidade pública e fundamento legal de cada órgão para acessar os dados necessários.",
      "Classifique dados pessoais e eventuais sensíveis, verificando bases e condições específicas.",
      "Defina campos mínimos, controles, responsabilidades, registros de compartilhamento e transparência.",
      "Avalie se o novo uso permanece compatível com finalidade; não confunda integração técnica com autorização jurídica."
    ],
    "pitfalls": [
      "Setor público não está isento de LGPD.",
      "Consentimento não é exigência automática para toda política pública.",
      "Compartilhamento de dados não é irrestrito entre órgãos.",
      "Dados de saúde exigem avaliar regras especiais de dados sensíveis."
    ],
    "cards": [
      [
        "Qual é a primeira pergunta ao compartilhar dados públicos?",
        "Qual finalidade e competência legal justificam a operação, considerando categoria de dados."
      ],
      [
        "Consentimento é sempre necessário em políticas públicas?",
        "Não. Podem existir bases próprias de tratamento, conforme operação e regras da LGPD."
      ],
      [
        "Que princípio limita campos coletados?",
        "Necessidade, limitando tratamento ao mínimo pertinente à finalidade."
      ],
      [
        "Por que integrar sistemas não autoriza qualquer uso de dados?",
        "Porque capacidade técnica de compartilhamento não substitui finalidade e base legal."
      ]
    ]
  },
  {
    "id": 149,
    "title": "Controlador, operador e encarregado: quem responde por qual decisão?",
    "goal": "Identificar papéis de proteção de dados e responsabilidades por operação, inclusive contratação de fornecedores.",
    "context": "Uma clínica contrata software de agendamento em nuvem e os técnicos do fornecedor acessam registros para suporte. Quem é **controlador**, **operador** e **encarregado**? A classificação não depende de chamar alguém de 'parceiro de tecnologia'. **Controlador** decide sobre finalidade e meios essenciais de tratamento; **operador** realiza tratamento em nome do controlador. **Encarregado** atua como canal de comunicação entre agentes, titulares e ANPD nas condições previstas. O papel da empresa deve ser analisado pela atividade efetivamente realizada.",
    "explanation": "Na operação de agendamento, a clínica pode decidir o que coletar e por quanto tempo manter dados conforme obrigações, atuando como controladora. O fornecedor pode tratar dados em nome dela para hospedar e dar suporte, atuando como operador nessa operação. Em outras atividades próprias, um fornecedor pode ser controlador de tratamentos distintos. O encarregado pode receber demandas e orientar colaboradores; a nomeação e possíveis dispensas seguem lei e regulamentação. A ANPD possui regras e guias específicos para atuação e indicação do encarregado.",
    "connection": "Empregados que atuam dentro da estrutura da pessoa jurídica controladora normalmente não se tornam operadores independentes apenas por lidar com dados. Um contrato deve delimitar instruções, acesso, incidentes e responsabilidades. **LGPD** também impõe transparência e segurança, independentemente de qual empresa instala o servidor. Uma conta com privilégio técnico não concede direito jurídico ilimitado de consultar dados de pacientes.",
    "exam": "Se a questão descreve quem **decide finalidade**, pense em controlador; quem **executa em nome de outro**, operador. Se fala em canal para reclamações de titulares e comunicações ANPD, encarregado. Não memorize que todo prestador é sempre operador em toda atividade. Fonte: [Guia ANPD sobre agentes](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/anonimizado___guia_de_agente_de_tratamento_e_encarregado_da_anpd_novo.pdf).",
    "caseTitle": "Fornecedor de nuvem usa dados para finalidade própria",
    "caseSteps": [
      "A clínica contratou armazenamento de dados para atendimento e determinou finalidade operacional.",
      "O fornecedor pretende usar registros pessoais para estudo comercial próprio, fora da instrução da clínica.",
      "Essa atividade exige análise separada de papéis, finalidade e base legal; não é automaticamente autorizada pelo contrato inicial.",
      "Avalie responsabilidades, impeça uso incompatível e atualize controles e instruções conforme regras."
    ],
    "pitfalls": [
      "Controlador e operador são papéis analisados por operação.",
      "Empregado subordinado não se torna automaticamente operador distinto da pessoa jurídica.",
      "Encarregado é canal de comunicação e orientação, não substitui decisões do controlador.",
      "Fornecedor não pode inventar finalidade própria sem fundamento adequado."
    ],
    "cards": [
      [
        "Quem é controlador na LGPD?",
        "Agente a quem competem decisões referentes ao tratamento de dados pessoais."
      ],
      [
        "Quem é operador?",
        "Agente que trata dados pessoais em nome do controlador, conforme operação efetiva."
      ],
      [
        "Qual função central do encarregado?",
        "Atuar como canal de comunicação e orientação sobre proteção de dados nas condições regulatórias."
      ],
      [
        "Um fornecedor pode ter papéis diferentes?",
        "Sim. Pode ser operador numa atividade e controlador em outra, dependendo de decisões e finalidade."
      ]
    ]
  },
  {
    "id": 150,
    "title": "ETP, TR e fiscalização de TI: diferencie os documentos pelo problema que resolvem",
    "goal": "Distinguir análise preliminar, especificação contratual e verificação contínua de entrega tecnológica.",
    "context": "Uma instituição quer contratar serviço de monitoramento. O **problema inicial** é saber por que a contratação é necessária e quais alternativas poderiam resolver a indisponibilidade. Depois surge a pergunta **'o que o fornecedor deve entregar e como será medido?'**. Por fim, após assinatura, é preciso perguntar **'ele está cumprindo o combinado?'**. Essas três fases relacionam-se respectivamente a **planejamento preliminar**, **especificação contratual** e **fiscalização**. ETP e TR são documentos de papéis distintos conforme a Lei 14.133 e regulamentações.",
    "explanation": "O **ETP** pode avaliar soluções, custos, benefícios, riscos e justificativa para contratação quando exigível. O **TR** define requisitos e condições de execução, como monitorar indisponibilidade com critérios claros e gerar relatórios úteis. A **gestão e fiscalização** acompanham execução ao longo do contrato, registrando métricas, falhas, providências e aceite. Não conclua que o responsável técnico pode alterar livremente preço, escopo ou consequências sem os procedimentos administrativos cabíveis.",
    "connection": "Em contratos de nuvem, perguntas sobre backup, segurança, recuperação, localização de dados e proteção LGPD precisam aparecer no planejamento e na especificação. **SLA** formaliza compromissos de nível de serviço e **SLI** permite observar cumprimento. Uma ferramenta pode funcionar tecnicamente mas não cumprir obrigação contratual específica. Integrar esses conceitos ajuda entender porque uma compra 'bem-sucedida' na entrega inicial pode falhar no segundo mês.",
    "exam": "A banca pode oferecer alternativas com 'ETP é a fiscalização depois do contrato' ou 'TR serve apenas para receber nota fiscal': ambas confundem fases. Se pergunta por análise de soluções, considere ETP; se exige requisitos e aceitação, TR; se mede execução após assinatura, fiscalização. Questões específicas podem incluir hipóteses de dispensa e regulamentações, então observe enunciado e lei aplicável.",
    "caseTitle": "Serviço de monitoramento apresenta relatórios, mas não detectou a falha",
    "caseSteps": [
      "No planejamento, a instituição deveria definir quais serviços críticos precisam ser monitorados.",
      "TR precisa especificar eventos de monitoramento, periodicidade, alertas e critérios de teste.",
      "Durante execução, o fiscal verifica relatórios e simula cenário para observar se alertas funcionam.",
      "Se requisitos não foram cumpridos, registra não conformidade e segue medidas conforme contrato e normas."
    ],
    "pitfalls": [
      "ETP e TR não são a mesma peça apenas com nomes diferentes.",
      "Fiscalização começa na execução e exige evidência de entrega.",
      "Nota fiscal não comprova por si eficácia do serviço contratado.",
      "Regras de contratação podem variar por hipótese e regulamentação aplicáveis."
    ],
    "cards": [
      [
        "Qual papel do ETP?",
        "Examinar necessidade e alternativas da contratação na fase preliminar, quando previsto."
      ],
      [
        "Qual papel do TR?",
        "Descrever objeto, requisitos, execução e critérios de verificação do serviço pretendido."
      ],
      [
        "Qual papel da fiscalização?",
        "Conferir e registrar execução e cumprimento de obrigações ao longo do contrato."
      ],
      [
        "Por que SLA e SLI ajudam fiscalização?",
        "Porque ligam compromisso de serviço a evidências mensuráveis de funcionamento."
      ]
    ]
  },
  {
    "id": 151,
    "title": "LAI e LGPD: quando publicar, restringir ou anonimizar dados",
    "goal": "Conciliar transparência pública, privacidade e resposta a pedidos de informação sem soluções extremas.",
    "context": "Um jornalista pede acesso a planilha de despesas de uma unidade de saúde. A planilha contém valores públicos e identificação de pacientes. A resposta não é necessariamente negar tudo nem divulgar cada célula. A **LAI** orienta acesso a informações públicas, com publicidade como regra e sigilo nas hipóteses legais. A **LGPD** regula tratamento de dados pessoais e exige finalidades e proteção apropriadas. Para decidir, a Administração precisa separar informações de gestão e informações pessoais, respeitando limites legais.",
    "explanation": "**Transparência ativa** disponibiliza informações proativamente; **passiva** responde a pedidos individuais. Quando parte do documento é acessível e outra exige restrição, pode ser adequado fornecer versão com trechos protegidos, observando lei. **Anonimização** consiste em procedimentos que tornam identificação não razoavelmente possível pelos meios considerados nos parâmetros legais, não simplesmente substituir nome por código numérico que continua ligado a pessoa em outra base acessível. A organização deve registrar fundamento de restrições e garantir meios de recurso conforme LAI.",
    "connection": "Governo digital pode disponibilizar dados abertos e painéis agregados, mas não elimina dever de proteger registros pessoais. A **publicidade** constitucional convive com proteção da intimidade. Para estatísticas de atendimento, totais por mês e serviço podem ter utilidade pública sem expor identidade de cada paciente; porém grupos muito pequenos ou combinação de atributos podem aumentar risco de reidentificação. A decisão considera contexto.",
    "exam": "Se a banca afirma que LGPD impede qualquer divulgação de informações públicas, é generalização falsa. Se diz que LAI revoga todos deveres de privacidade, também falsa. A solução exige analisar tipo de dado, fundamento de acesso e possibilidade de fornecer parte acessível. Evite respostas absolutas como 'sempre publicar' ou 'sempre esconder'.",
    "caseTitle": "Relatório de gastos com dados de pacientes",
    "caseSteps": [
      "Separe despesas públicas e informações de gestão de dados individualizados de saúde.",
      "Avalie quais campos atendem ao pedido e quais possuem restrição legal por privacidade.",
      "Produza resposta fundamentada, com proteção de campos pessoais e dados públicos acessíveis conforme normas.",
      "Documente método, possibilidade de reidentificação e canais de esclarecimento/recurso aplicáveis."
    ],
    "pitfalls": [
      "LAI e LGPD não são mutuamente excludentes.",
      "Remover nome pode ser insuficiente para anonimização efetiva.",
      "Informação pública pode estar num documento misto com parte pessoal protegida.",
      "Resposta deve ser fundamentada em lei, não mera preferência do servidor."
    ],
    "cards": [
      [
        "Qual regra geral orienta a LAI?",
        "Publicidade da informação pública como regra, com sigilo nas hipóteses legalmente justificadas."
      ],
      [
        "O que é anonimização relevante à LGPD?",
        "Tratamento que busca impedir identificação da pessoa nos critérios legais aplicáveis, considerando meios razoáveis."
      ],
      [
        "Por que compartilhar apenas dados agregados pode ajudar?",
        "Porque pode permitir transparência de resultados sem expor detalhes pessoais desnecessários."
      ],
      [
        "O que fazer com documento que mistura dados públicos e pessoais?",
        "Avaliar acesso parcial e proteger informações legalmente restritas, justificando decisões."
      ]
    ]
  },
  {
    "id": 168,
    "title": "Oficina LGPD: cadastro, finalidade e transferência de dados públicos",
    "goal": "Analisar dados coletados, base legal, operação de compartilhamento e transparência em um fluxo real.",
    "context": "Um órgão oferece atendimento digital e exige nome, documento, telefone, histórico médico e informações de familiares para qualquer solicitação. A área técnica afirma que 'o banco permite armazenar tudo'. Essa resposta confunde **possibilidade técnica** com **necessidade e licitude do tratamento**. A **LGPD** exige avaliar finalidade, base legal e proporcionalidade para cada operação relevante; registros de saúde são **sensíveis**. A Administração deve identificar dados indispensáveis e quem terá acesso, com responsabilidade pelas decisões.",
    "explanation": "Mapeie fluxo: formulário coleta dados, API grava, banco conserva, equipe consulta, fornecedor dá suporte e outro órgão solicita compartilhamento. Em cada etapa, pergunte **qual finalidade** e **qual base legal** justificam operação, qual o mínimo necessário, quem é o controlador e se um terceiro atua como operador. Forneça informações claras ao titular sobre uso e contato adequado, respeitando exceções e regras específicas. Controles técnicos incluem autenticação, autorização, logs, criptografia conforme risco e retenção adequada.",
    "connection": "A interoperabilidade de governo digital pode reduzir pedidos repetidos de dados, mas **não autoriza compartilhar irrestritamente** entre órgãos. A LAI permite acesso a informações públicas, mas não transforma informações clínicas pessoais em dados abertos. Se houve acesso indevido, a organização também precisa tratar incidente, avaliar obrigações de comunicação e prevenir recorrência conforme regulamentos. Não use consentimento genérico para ignorar necessidade.",
    "exam": "Uma banca pode propor 'colete tudo para garantir futuras necessidades' — isso contraria limitação à finalidade definida. Outra pode defender que funcionário autenticado possa consultar todo banco: autenticação não equivale a autorização. A resposta adequada identifica operação, base, minimização e controles com responsáveis, em vez de apenas tecnologia.",
    "caseTitle": "Um atendimento simples solicita histórico de saúde sem justificativa",
    "caseSteps": [
      "Identifique o serviço concreto e o objetivo do cadastro: registrar solicitação e permitir retorno ao cidadão.",
      "Liste campos realmente necessários e destaque os sensíveis que exigem justificativa específica.",
      "Avalie base legal, finalidade, transparência e papéis de controlador/operador para cada etapa.",
      "Retire campos não pertinentes, proteja acessos e registre decisões e testes de adequação."
    ],
    "pitfalls": [
      "Capacidade de armazenar não justifica coletar qualquer informação.",
      "Dados sensíveis exigem análise de hipóteses específicas.",
      "Login válido não autoriza consultar todo cadastro.",
      "Compartilhamento entre órgãos precisa de finalidade e fundamento adequados."
    ],
    "cards": [
      [
        "O que avaliar antes de criar um campo no formulário?",
        "Finalidade, necessidade, base legal, categoria do dado e quem realmente precisará acessá-lo."
      ],
      [
        "Por que dados de saúde exigem cuidado adicional?",
        "Porque são dados pessoais sensíveis sujeitos a hipóteses e medidas específicas da LGPD."
      ],
      [
        "Qual diferença entre capacidade técnica e licitude?",
        "Software conseguir armazenar não significa que há fundamento legal e necessidade para fazê-lo."
      ],
      [
        "O que analisar ao compartilhar dados?",
        "Finalidade, hipótese legal, papéis, campos mínimos, segurança e transparência adequadas."
      ]
    ]
  },
  {
    "id": 169,
    "title": "Oficina de contratação: ETP, TR e fiscalização de backup de TI",
    "goal": "Elaborar sequência lógica de planejamento e verificação contratual de solução crítica de tecnologia.",
    "context": "Uma prefeitura deseja substituir solução de backup depois de descobrir que a última cópia não era restaurável. Contratar outro produto sem analisar falhas pode repetir o problema. A decisão pública exige **planejamento da necessidade**, exame de alternativas, especificação e fiscalização. O **ETP**, quando aplicável, ajuda a justificar a solução; o **TR** descreve condições verificáveis de entrega; **fiscais** acompanham cumprimento do contrato nas atribuições pertinentes. A Lei 14.133/2021 estabelece o regime geral de licitações e contratos conforme seu âmbito.",
    "explanation": "Defina primeiro quais bancos e serviços precisam de proteção e o impacto de perda. Especifique **RPO**, ponto de recuperação admissível, e **RTO**, tempo-alvo de restabelecimento. Compare cópia local, externa, imutável e testes, considerando custo total e riscos. No TR, registre periodicidade, retenção, criptografia/acesso, monitoramento e demonstração de restauração. Em execução, exija relatórios e testes periódicos, com critérios previamente definidos. Não confunda backup executado com backup recuperável.",
    "connection": "A fiscalização pode comparar o compromisso **SLA** com indicadores observados **SLI**; se meta não é atendida, registre não conformidade conforme procedimento. A LGPD exige proteção adequada quando os backups contêm dados pessoais, especialmente saúde. A continuidade da instituição depende não só de fornecedor, mas de rede, infraestrutura de restauração, responsáveis e documentação. A avaliação completa conecta planejamento, direito administrativo e operação de TI.",
    "exam": "Se a questão diz que ETP substitui TR e dispensa fiscalização, está errada. Se diz que backup '100% concluído' comprova restauração, também não. Se o objetivo é recuperar em uma hora, não aceite proposta cujo procedimento testado exige vinte horas sem discutir descumprimento. A resposta correta costuma exigir **requisitos verificáveis, responsabilidades e evidências**, não apenas menor mensalidade anunciada.",
    "caseTitle": "Compre uma solução de backup que possa ser testada",
    "caseSteps": [
      "Levante dados críticos, riscos e metas RPO/RTO com áreas responsáveis, documentando necessidade e alternativas.",
      "Detalhe no TR cópias, retenção, segurança, restauração, evidências e critérios de aceite conforme legislação aplicável.",
      "Durante execução, realize testes periódicos de restauração e meça tempo/perda observados.",
      "Registre resultados e não conformidades e siga procedimento contratual apropriado, preservando dados e continuidade."
    ],
    "pitfalls": [
      "Escolher produto não dispensa planejamento e avaliação de alternativas.",
      "ETP e TR possuem papéis distintos, conforme hipóteses legais.",
      "Backup concluído sem restauração testada é evidência incompleta.",
      "Fiscalização precisa de critérios, responsáveis e registros de execução."
    ],
    "cards": [
      [
        "Qual informação deve existir antes de contratar backup?",
        "Serviços e dados críticos, riscos, RPO/RTO e critérios concretos de recuperação."
      ],
      [
        "Como TR torna backup fiscalizável?",
        "Define periodicidade, retenção, segurança e testes de restauração com critérios verificáveis."
      ],
      [
        "Como verificar cumprimento após assinatura?",
        "Acompanhar relatórios, realizar testes e medir resultados conforme contrato."
      ],
      [
        "Por que LGPD importa em backups públicos?",
        "Porque cópias podem conter dados pessoais e sensíveis sujeitos a medidas e regras adequadas."
      ]
    ]
  }
] satisfies EditorialSeed[])
