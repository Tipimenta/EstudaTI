import type {PedagogicalLesson} from './intro1'
export const rewrittenFoundations:Record<number,Partial<PedagogicalLesson>>={
  "44": {
    "id": 44,
    "goal": "Reconhecer quando o verbo deve ficar no singular e diferenciar haver/fazer impessoais de usos pessoais em questões de concordância.",
    "steps": [
      {
        "title": "Comece pela pergunta certa: existe sujeito?",
        "body": "Na concordância verbal, a regra mais frequente é o verbo concordar em número e pessoa com o sujeito. Em **'Os servidores apresentaram falha'**, o sujeito está no plural e o verbo acompanha. Em **'O servidor apresentou falha'**, o sujeito está no singular. Antes de decorar exceções, localize quem pratica ou experimenta aquilo que o verbo expressa.\n\nHá, porém, verbos **impessoais**, que não apresentam sujeito naquele uso. Eles ficam na **terceira pessoa do singular**. É aqui que as bancas exploram o verbo **haver** com sentido de existir e **fazer** indicando tempo decorrido ou fenômeno meteorológico."
      },
      {
        "title": "Haver significando existir: nunca concorde com o complemento",
        "body": "Compare: **'Existem muitos chamados pendentes'** e **'Há muitos chamados pendentes'**. O verbo **existir** tem sujeito: *muitos chamados pendentes*, por isso fica no plural. O verbo **haver**, quando significa existir, é impessoal: não possui sujeito, logo permanece no singular.\n\nO mesmo princípio vale no passado: **'Havia três equipamentos disponíveis'**, e não *'Haviam três equipamentos disponíveis'*. Mesmo que o complemento seja plural, a forma verbal continua singular. A banca frequentemente usa a inversão da frase para distrair: **'No laboratório havia muitos computadores'** continua correta."
      },
      {
        "title": "Locuções verbais e o verbo fazer",
        "body": "Uma locução verbal também respeita a impessoalidade de **haver** existencial: **'Deve haver alternativas'**, e não *'Devem haver alternativas'*. O auxiliar assume o singular. Se trocarmos por **existir**, a concordância muda: **'Devem existir alternativas'**. Trocar palavras sem ajustar a estrutura pode gerar erro.\n\nCom **fazer** indicando tempo decorrido, use **'Faz dois anos que o edital saiu'** e **'Fazia três meses que o sistema operava'**. Em locuções: **'Deve fazer dois meses'**. Aqui, **'dois anos'** é expressão temporal, não sujeito plural para comandar o verbo."
      },
      {
        "title": "Quando haver é pessoal e pode ir ao plural",
        "body": "Não conclua que **haver é sempre singular**. Como auxiliar de tempos compostos, ele flexiona: **'Os técnicos haviam concluído a instalação'**. O sujeito 'os técnicos' está no plural e o verbo auxiliar concorda com ele. Também pode flexionar em outros usos pessoais, conforme contexto.\n\nO segredo de prova é analisar o **sentido e a função**, não apenas reconhecer a palavra 'haver'. Pergunte: ele significa 'existir' ou atua como auxiliar de outro verbo? O mesmo termo pode ter comportamento diferente."
      }
    ],
    "worked": {
      "title": "Reescrita de uma frase com duas pegadinhas",
      "body": "**Enunciado:** escolha a reescrita correta de 'Há equipamentos disponíveis e faz três meses que o setor foi inaugurado'.\n\n**Passo 1.** O primeiro **há** tem sentido de 'existem' e permanece singular. Não escreva *'Hão equipamentos disponíveis'*. \n\n**Passo 2.** O segundo **faz** indica tempo decorrido e também é impessoal: 'faz três meses'. O numeral plural não altera o verbo.\n\n**Passo 3.** Se o examinador propuser 'Devem haver equipamentos disponíveis', há erro no auxiliar. A forma correta é **'Deve haver equipamentos disponíveis'**.\n\n**Passo 4.** Se a alternativa usar 'Devem existir equipamentos disponíveis', ela pode estar correta porque **existir** concorda com 'equipamentos'.\n\n**Conclusão:** duas frases com significado semelhante podem exigir concordâncias diferentes."
    },
    "pitfalls": [
      "'Houveram muitos problemas' é incorreto para haver existencial: use 'Houve muitos problemas'.",
      "Em 'deve haver', o auxiliar não fica no plural.",
      "Em 'faz cinco anos', a expressão de tempo não é sujeito.",
      "'Os servidores haviam respondido' está correto: haver como auxiliar é pessoal."
    ],
    "review": [
      {
        "ask": "Qual frase está correta: 'havia erros' ou 'haviam erros'?",
        "answer": "'Havia erros': haver existencial é impessoal e singular."
      },
      {
        "ask": "Qual é a forma correta: 'deve haver vagas' ou 'devem haver vagas'?",
        "answer": "'Deve haver vagas', pois o verbo principal haver é impessoal."
      },
      {
        "ask": "Por que 'devem existir soluções' está correto?",
        "answer": "Existir possui sujeito ('soluções') e concorda com ele."
      },
      {
        "ask": "Em 'eles haviam concluído o trabalho', haver é impessoal?",
        "answer": "Não. Atua como auxiliar e concorda com o sujeito 'eles'."
      }
    ]
  },
  "53": {
    "id": 53,
    "goal": "Diferenciar governança de gestão no COBIT 2019 e classificar decisões nos domínios EDM, APO, BAI, DSS e MEA.",
    "steps": [
      {
        "title": "Por que a direção não deve fazer tudo e a TI não deve decidir sozinha",
        "body": "Considere uma instituição que investe em serviços de nuvem. A diretoria precisa decidir **qual nível de risco aceitar**, **quais benefícios esperar** e **como monitorar o resultado**. A equipe de tecnologia precisa executar contratos, configurar sistemas, acompanhar incidentes e medir indicadores. Ambos trabalham com TI, mas exercem responsabilidades diferentes.\n\nO **COBIT 2019**, da ISACA, apresenta um modelo para governança e gestão da informação e tecnologia corporativa. Governança não significa apenas 'checar se está funcionando': significa **avaliar opções, direcionar prioridades e monitorar resultados**. Gestão envolve planejar, construir, operar e monitorar atividades alinhadas à direção recebida."
      },
      {
        "title": "O domínio EDM representa a governança",
        "body": "A sigla **EDM — Evaluate, Direct and Monitor** resume três ações do órgão de governança: **avaliar** necessidades e opções, **direcionar** a organização por decisões e prioridades e **monitorar** se resultados são obtidos. A governança procura assegurar valor e equilíbrio entre benefícios, riscos e recursos.\n\nExemplo: o comitê aprova a política de continuidade de serviços críticos, define que falhas prolongadas são inaceitáveis e cobra relatórios periódicos de risco. Isso é governança; o comitê não precisa configurar cada rotina de backup para cumprir seu papel."
      },
      {
        "title": "Os quatro domínios de gestão",
        "body": "O COBIT 2019 organiza os objetivos de gestão em quatro conjuntos. **APO (Align, Plan and Organize)** trata de alinhamento, estratégia, planejamento e suporte organizacional. **BAI (Build, Acquire and Implement)** abrange desenho, construção, aquisição e implantação de soluções. **DSS (Deliver, Service and Support)** acompanha a operação, suporte e entrega de serviços. **MEA (Monitor, Evaluate and Assess)** envolve monitorar desempenho e avaliar conformidade, controles e resultados de gestão.\n\nUm mesmo projeto pode envolver todos: planejar a contratação (APO), implantar o novo sistema (BAI), operar e atender chamados (DSS) e medir conformidade e resultados (MEA). Nenhum deles substitui a função de governança EDM."
      },
      {
        "title": "Aprenda a identificar a ação, não apenas a sigla",
        "body": "As bancas costumam perguntar qual domínio seria mais adequado para uma atividade específica. Procure o verbo principal: **alinhou e planejou → APO; construiu ou implantou → BAI; prestou serviço ou tratou incidente → DSS; acompanhou desempenho ou avaliou conformidade → MEA**. Quando a questão trouxer direção estratégica pelo órgão de governança, pense em EDM.\n\nNão trate COBIT como uma ordem cronológica obrigatória de cinco fases. São conjuntos de objetivos de governança e gestão que operam de modo integrado. [Referência: ISACA — COBIT 2019](https://www.isaca.org/resources/news-and-trends/industry-news/2019/employing-cobit-2019-for-enterprise-governance-strategy)."
      }
    ],
    "worked": {
      "title": "Quem decide e quem executa a continuidade de TI?",
      "body": "Uma organização relata indisponibilidade frequente de um sistema essencial.\n\n**Situação A:** a direção define que o risco deve ser reduzido e exige evidências trimestrais de continuidade. Trata-se de **EDM**, porque houve avaliação, direção e acompanhamento estratégico.\n\n**Situação B:** a equipe elabora um plano de continuidade e estabelece orçamento: essa atividade se aproxima de **APO**.\n\n**Situação C:** a equipe implanta infraestrutura de redundância: o foco é **BAI**.\n\n**Situação D:** operadores tratam indisponibilidade e restauram serviço: o foco é **DSS**.\n\n**Situação E:** auditores avaliam o atendimento a controles e metas: o foco é **MEA**.\n\n**Conclusão:** a distinção depende do papel e do objetivo de cada ação, não do fato de tudo ocorrer na mesma organização."
    },
    "pitfalls": [
      "EDM é domínio de governança; APO, BAI, DSS e MEA são de gestão.",
      "Governança define direção e supervisiona resultados; não precisa executar cada controle técnico.",
      "MEA é avaliação e monitoramento de gestão, não sinônimo automático de toda governança.",
      "COBIT e ITIL podem ser complementares; não cumprem exatamente a mesma finalidade."
    ],
    "review": [
      {
        "ask": "Qual domínio do COBIT 2019 pertence à governança?",
        "answer": "EDM — Avaliar, Direcionar e Monitorar."
      },
      {
        "ask": "Qual domínio trata da entrega e suporte operacional de serviços?",
        "answer": "DSS — Deliver, Service and Support."
      },
      {
        "ask": "Qual domínio tende a cobrir implantação de um sistema novo?",
        "answer": "BAI — Build, Acquire and Implement."
      },
      {
        "ask": "Qual domínio acompanha avaliação de conformidade e desempenho da gestão?",
        "answer": "MEA — Monitor, Evaluate and Assess."
      }
    ]
  },
  "62": {
    "id": 62,
    "goal": "Explicar as quatro propriedades ACID, reconhecer problemas de concorrência e interpretar isolamento sem decorar listas isoladas.",
    "steps": [
      {
        "title": "Por que uma transferência precisa de transação",
        "body": "Imagine que um sistema transfere R$ 100 entre duas contas. O programa deve reduzir R$ 100 da conta de origem e acrescentar R$ 100 à de destino. Se houver falha depois do débito, mas antes do crédito, não podemos deixar os saldos incoerentes. Uma **transação** reúne operações relacionadas numa unidade de trabalho com regras de confirmação ou desfazimento.\n\nEm bancos relacionais, comandos como **BEGIN**, **COMMIT** e **ROLLBACK** delimitam a transação e seu desfecho. A transação não é apenas 'uma consulta SQL': ela envolve o conjunto lógico de mudanças que precisa ser consistente."
      },
      {
        "title": "ACID explicado por problemas concretos",
        "body": "**Atomicidade:** ou o conjunto é confirmado por completo ou seus efeitos são desfeitos. **Consistência:** as alterações devem preservar as restrições e invariantes definidas para o banco; não significa que regras de negócio mal definidas sejam corrigidas magicamente. **Isolamento:** transações simultâneas não devem interferir de forma proibida pelo nível escolhido. **Durabilidade:** após confirmação, o banco deve preservar os efeitos mesmo diante de falhas abrangidas por seus mecanismos de recuperação.\n\nO macete é associar cada propriedade a uma pergunta: tudo ou nada? (**A**); regras continuam válidas? (**C**); concorrentes se enxergam indevidamente? (**I**); o confirmado permanece? (**D**)."
      },
      {
        "title": "Leitura suja, não repetível e fantasmas",
        "body": "**Leitura suja (dirty read):** uma transação vê dados que outra ainda não confirmou. Se a segunda desfizer a alteração, a primeira usou um valor que nunca se consolidou. **Leitura não repetível:** a mesma transação consulta uma linha duas vezes e encontra valores diferentes após outra transação confirmar uma mudança. **Leitura fantasma:** a mesma condição de pesquisa retorna um conjunto diferente de linhas porque outra transação incluiu ou removeu linhas que atendem ao filtro.\n\nEsses fenômenos são distintos. Uma consulta que muda de 200 para 250 não é necessariamente 'leitura suja': se a outra transação já confirmou o valor, o fenômeno se aproxima de leitura não repetível."
      },
      {
        "title": "Isolamento: o que uma prova de PostgreSQL pode cobrar",
        "body": "No PostgreSQL, o nível **Read Committed** é o padrão e cada comando enxerga seu próprio snapshot de dados confirmados. Por isso, dois SELECTs sucessivos dentro da mesma transação podem retornar valores diferentes caso outra transação confirme mudanças entre eles.\n\nEm **Repeatable Read**, o snapshot se mantém para os comandos seguintes da transação, oferecendo proteção mais forte contra mudanças visíveis durante a execução. Ainda existem considerações de serialização; não conclua que qualquer anomalia concorrente é impossível. **Serializable** busca resultado equivalente a uma ordem serial, podendo exigir repetição de transações em caso de conflito. [Referência: documentação PostgreSQL](https://www.postgresql.org/docs/current/transaction-iso.html)."
      }
    ],
    "worked": {
      "title": "O saldo mudou sem que a transação escrevesse nada",
      "body": "**Cenário:** T1 começa e consulta saldo de R$ 200. T2 altera saldo para R$ 250 e faz COMMIT. Ainda aberta, T1 consulta o mesmo saldo novamente e recebe R$ 250.\n\n**Passo 1.** As duas leituras são da **mesma linha** pela mesma transação T1. A mudança ocorreu fora de T1.\n\n**Passo 2.** A alteração de T2 já foi **confirmada**; portanto não é uma leitura suja.\n\n**Passo 3.** O valor mudou entre leituras: é o fenômeno de **leitura não repetível**. Em PostgreSQL Read Committed, a descrição é compatível com os snapshots por comando.\n\n**Como identificar a alternativa correta:** procure 'mesma linha lida duas vezes com valor diferente após confirmação de outra transação'. Se o enunciado falar em mudança no **conjunto de linhas** que atende a um filtro, avalie 'phantom read'."
    },
    "pitfalls": [
      "Atomicidade não significa executar todas as operações no mesmo instante; significa tudo ou nada no resultado transacional.",
      "Consistência depende das restrições e regras corretamente especificadas.",
      "Uma mudança confirmada entre dois SELECTs não é leitura suja.",
      "O nível de isolamento determina quais interferências são permitidas; não confunda com a durabilidade após COMMIT."
    ],
    "review": [
      {
        "ask": "Qual propriedade ACID significa tudo ou nada?",
        "answer": "Atomicidade."
      },
      {
        "ask": "Uma transação lê dado não confirmado por outra. Qual fenômeno?",
        "answer": "Leitura suja (dirty read). "
      },
      {
        "ask": "T1 lê a mesma linha duas vezes e obtém valores confirmados diferentes. Fenômeno?",
        "answer": "Leitura não repetível."
      },
      {
        "ask": "Qual é o nível de isolamento padrão do PostgreSQL?",
        "answer": "Read Committed, com snapshot por comando."
      }
    ]
  }
};
