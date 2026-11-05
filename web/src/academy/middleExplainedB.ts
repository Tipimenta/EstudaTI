import type {PedagogicalLesson} from './intro1'
/** Curadoria intermediária: sentido em Português, método de trabalho e índices SQL. */
export const middleExplainedB:Record<number,Partial<PedagogicalLesson>>={
  "49": {
    "id": 49,
    "goal": "Distinguir sentido literal, figurado, ambiguidade e efeitos do contexto por exemplos de frases e reescritas cobradas em concursos.",
    "steps": [
      {
        "title": "Por que uma palavra pode ter mais de um sentido?",
        "body": "Você lê em um relatório: **'O servidor caiu durante o atendimento.'** A palavra 'servidor' pode indicar um computador que oferece serviços de rede ou uma pessoa que trabalha em uma organização pública. E 'caiu' pode indicar queda física ou interrupção de funcionamento. **O contexto** é o conjunto de informações ao redor da frase que ajuda a decidir qual interpretação faz sentido.\n\nA **semântica** estuda o significado de palavras e enunciados. Ela ajuda a perceber que não basta conhecer o dicionário: palavras são usadas em situações, com intenções e relações. Quando uma prova pede o sentido de um termo, a primeira tarefa é perguntar **'o que a frase está dizendo neste contexto?'**, em vez de escolher uma definição isolada."
      },
      {
        "title": "Denotação: quando a palavra é usada no sentido mais literal",
        "body": "Chamamos de **denotação** o uso mais direto ou literal de uma palavra no contexto. Em **'O cabo de rede foi substituído'**, 'cabo' indica um componente físico que liga equipamentos, sem intenção figurada. Se a questão pergunta se a frase foi escrita em linguagem objetiva, precisamos observar como as palavras estão sendo usadas, e não apenas procurar verbos técnicos.\n\nUma frase denotativa não é automaticamente verdadeira. 'O cabo foi substituído ontem' pode ser falsa se a troca não ocorreu. **Sentido literal** é uma característica da maneira como a linguagem representa a informação; **verdade ou falsidade** depende dos fatos. Essa diferença é importante para não misturar semântica com verificação de acontecimentos."
      },
      {
        "title": "Conotação: quando a expressão cria um sentido figurado",
        "body": "Agora considere **'A equipe apagou o incêndio durante a implantação.'** Se não havia fogo, a expressão **'apagar incêndio'** foi usada de maneira **conotativa**, ou figurada: significa resolver uma situação urgente ou uma crise. A palavra produz um efeito que vai além de sua referência física mais comum.\n\nOutro exemplo: **'A empresa vive um momento de turbulência.'** Não significa que haja vento forte dentro do prédio. O leitor relaciona 'turbulência' a instabilidade ou dificuldade organizacional. Essa interpretação se apoia numa associação de sentidos.\n\nQuestões podem pedir para transformar linguagem figurada em objetiva sem alterar o sentido. Nesse caso, 'a equipe apagou o incêndio' poderia ser reescrito como **'a equipe resolveu uma falha urgente'**, se esse for o contexto relatado."
      },
      {
        "title": "Ambiguidade: quando duas leituras continuam possíveis",
        "body": "Uma frase é **ambígua** quando permite mais de uma interpretação relevante. Leia: **'O gestor encontrou o técnico com o equipamento.'** Quem estava com o equipamento: o gestor ou o técnico? O enunciado não esclarece. A ambiguidade pode ser involuntária, especialmente em relatórios e comunicações profissionais.\n\nPodemos reescrever: **'O gestor, que estava com o equipamento, encontrou o técnico'** ou **'O gestor encontrou o técnico que estava com o equipamento'**. Cada forma escolhe uma interpretação diferente. Não é correto dizer que uma delas representa necessariamente a intenção original sem mais contexto.\n\nNa prova, identifique a possível duplicidade de sentidos e observe se a alternativa proposta resolve o problema **sem acrescentar uma afirmação não sustentada** pelo enunciado."
      }
    ],
    "worked": {
      "title": "Exercício de concurso: substitua a linguagem figurada sem alterar o sentido",
      "body": "**Frase:** 'Após a mudança do sistema, o setor precisou correr contra o relógio para normalizar os atendimentos.'\n\n**Passo 1.** Identifique a expressão suspeita: 'correr contra o relógio'. Ninguém precisa literalmente correr ao lado de um relógio.\n\n**Passo 2.** Observe o contexto: houve mudança de sistema e necessidade de normalizar atendimentos em prazo curto.\n\n**Passo 3.** Traduza o sentido: a equipe precisou trabalhar com urgência ou sob restrição de tempo para restabelecer as atividades.\n\n**Passo 4.** Uma reescrita objetiva possível é: **'Após a mudança do sistema, o setor precisou agir com urgência para normalizar os atendimentos.'**\n\n**Conclusão:** a expressão original é **conotativa**. O sentido deve ser recuperado pela situação, não por decorar palavras isoladas."
    },
    "pitfalls": [
      "Denotação não é garantia de veracidade; significa uso literal dentro do contexto.",
      "Conotação é uso figurado, não sinônimo de erro gramatical.",
      "A mesma palavra pode assumir sentidos distintos conforme o contexto.",
      "Ambiguidade precisa ser avaliada sem inventar informações ausentes na frase."
    ],
    "review": [
      {
        "ask": "O que indica uso denotativo?",
        "answer": "Que a palavra está empregada em sentido direto ou literal, sem a associação figurada relevante no contexto."
      },
      {
        "ask": "Em 'a equipe apagou o incêndio', sem fogo real, qual sentido ocorre?",
        "answer": "Conotação: a expressão representa a solução de uma crise ou problema urgente, não um incêndio físico."
      },
      {
        "ask": "O que torna uma frase ambígua?",
        "answer": "A possibilidade de duas ou mais interpretações relevantes sem que o contexto esclareça qual é a pretendida."
      },
      {
        "ask": "Por que o contexto é essencial na interpretação semântica?",
        "answer": "Porque ajuda a escolher, entre sentidos possíveis, aquele que corresponde ao enunciado e à intenção comunicativa."
      }
    ],
    "extra": ""
  },
  "56": {
    "id": 56,
    "goal": "Entender por que equipes usam Scrum ou Kanban e como eventos, responsabilidades, fluxo de trabalho e limites de atividades ajudam a entregar valor.",
    "steps": [
      {
        "title": "Por que um projeto longo pode ser difícil de planejar inteiro?",
        "body": "Imagine uma equipe desenvolvendo um aplicativo de atendimento. No início ela não conhece todas as necessidades: ao testar a primeira versão, usuários podem descobrir obstáculos e pedir mudanças. Organizar trabalho apenas em um plano rígido de muitos meses aumenta o risco de entregar algo que já não atende às pessoas.\n\n**Agilidade** é uma abordagem que valoriza adaptação, colaboração e entrega frequente de valor. Isso não significa trabalhar sem planejamento; significa planejar com oportunidades regulares para observar resultados e ajustar prioridades. Dois nomes comuns nessa área são **Scrum** e **Kanban**, mas eles resolvem aspectos diferentes da organização do trabalho."
      },
      {
        "title": "Scrum: por que existem Sprints e o que a equipe faz nelas?",
        "body": "O **Scrum** é um framework, ou estrutura de trabalho, usado para lidar com problemas complexos. Ele organiza o trabalho em períodos de duração fixa chamados **Sprints**, de no máximo um mês segundo o Guia do Scrum de 2020. Dentro de uma Sprint, a equipe busca produzir um **incremento**, isto é, um resultado concreto que pode ser utilizado e avaliado conforme critérios definidos.\n\nAntes de começar, a equipe realiza o **Sprint Planning**, encontro de planejamento para discutir objetivo e como trabalhar. Durante a Sprint ocorre a **Daily Scrum**, oportunidade curta para os desenvolvedores avaliarem o progresso rumo ao objetivo e ajustarem o plano. Ao final, a **Sprint Review** avalia o resultado com interessados e possíveis adaptações, e a **Sprint Retrospective** busca melhorar a forma de trabalhar.\n\nNão são reuniões inventadas para criar burocracia: cada evento responde a uma pergunta sobre direção, resultado ou melhoria."
      },
      {
        "title": "Quem decide prioridade e quem ajuda o trabalho a acontecer?",
        "body": "No Scrum, há três conjuntos de **responsabilidades (accountabilities)**. O **Product Owner** concentra a responsabilidade de maximizar o valor do produto e gerenciar de forma eficaz o **Product Backlog**, lista ordenada de trabalho relevante ao produto. Os **Developers** são as pessoas que criam o incremento utilizável. O **Scrum Master** ajuda a equipe e a organização a compreender e aplicar Scrum de maneira efetiva.\n\nO **Product Backlog** não é uma lista aleatória de tarefas: seus itens devem contribuir para um objetivo do produto. O **Sprint Backlog** reúne objetivo da Sprint, itens escolhidos e plano para executá-los. Chamamos de **Definition of Done (Definição de Pronto)** o entendimento formal de critérios de qualidade que o incremento precisa atender.\n\nUm erro comum é tratar o Scrum Master como 'chefe que distribui tarefas'. A equipe é responsável por sua auto-organização ou autogestão dentro das regras do framework."
      },
      {
        "title": "Kanban: o que significa acompanhar o fluxo e limitar WIP?",
        "body": "Imagine um quadro com colunas **A fazer**, **Em execução** e **Concluído**. Cada cartão representa um trabalho que precisa avançar. Visualizar o fluxo ajuda a perceber onde os itens estão acumulados. Essa é uma prática associada ao **Kanban**.\n\nA sigla **WIP** significa *Work in Progress*, ou **trabalho em andamento**. Se dez tarefas começam e nenhuma termina, o quadro pode mostrar atividade intensa, mas pouca entrega. Um **limite de WIP** restringe quantas tarefas podem ocupar determinada etapa ao mesmo tempo, ajudando a equipe a concluir trabalhos antes de iniciar novos.\n\nO Kanban pode ser usado em serviços com demandas contínuas, como suporte técnico. Ele não exige necessariamente Sprints fixas como o Scrum. Para responder questões, pergunte: o enunciado enfatiza **cadência de Sprints e eventos Scrum** ou **fluxo contínuo e limites de trabalho em andamento**? Referência: [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)."
      }
    ],
    "worked": {
      "title": "Exercício: muita tarefa iniciada, pouca tarefa entregue",
      "body": "**Situação:** uma equipe de suporte possui vinte chamados marcados como 'Em execução' e apenas dois concluídos na semana. Novos chamados continuam sendo iniciados diariamente.\n\n**Passo 1.** Diferencie estar ocupado de entregar resultados. Muitos itens iniciados não significam que o trabalho está fluindo até a conclusão.\n\n**Passo 2.** Observe onde existe acúmulo: na coluna 'Em execução', que possui vinte itens. Isso sugere possível **gargalo**, ponto em que o fluxo desacelera.\n\n**Passo 3.** Uma medida coerente é definir um limite adequado para o WIP e priorizar concluir os itens já iniciados, em vez de iniciar todos os próximos.\n\n**Passo 4.** Se a equipe estiver adotando Scrum para desenvolvimento por Sprints, outros mecanismos de planejamento e inspeção se somam ao controle de fluxo.\n\n**Conclusão:** Kanban ajuda a visualizar e melhorar a continuidade do trabalho; Scrum fornece uma estrutura com responsabilidades, eventos e compromissos definidos."
    },
    "pitfalls": [
      "Scrum Master não é simplesmente gerente que distribui ordens à equipe.",
      "Sprints são períodos de duração fixa de um mês ou menos no Scrum Guide 2020.",
      "Review examina produto e próximas adaptações; retrospectiva examina a forma de trabalhar.",
      "WIP é trabalho em andamento; limitar WIP não significa proibir toda atividade nova para sempre."
    ],
    "review": [
      {
        "ask": "Por que a Sprint tem duração fixa?",
        "answer": "Para criar uma cadência de trabalho com oportunidades regulares de planejamento, inspeção e adaptação."
      },
      {
        "ask": "Qual diferença entre Sprint Review e Retrospective?",
        "answer": "A Review inspeciona resultados do produto e adaptações futuras; a Retrospective busca melhorar o processo da equipe."
      },
      {
        "ask": "O que é Product Backlog?",
        "answer": "Uma lista emergente e ordenada do trabalho necessário para melhorar o produto, gerenciada sob responsabilidade do Product Owner."
      },
      {
        "ask": "Por que limitar WIP pode ajudar no Kanban?",
        "answer": "Porque evita começar tarefas demais simultaneamente e favorece a conclusão de trabalhos ao longo do fluxo."
      }
    ],
    "extra": ""
  },
  "64": {
    "id": 64,
    "goal": "Compreender como um índice de banco de dados acelera certas buscas, por que pode custar espaço e escrita e quando o plano de execução importa.",
    "steps": [
      {
        "title": "Por que procurar um registro em um milhão de linhas pode demorar?",
        "body": "Imagine uma tabela com um milhão de pedidos. Você quer encontrar todos os pedidos de um cliente específico. Sem um caminho de busca adequado, o banco pode precisar examinar muitas linhas até identificar quais atendem à condição. Isso é semelhante a procurar uma palavra num livro sem índice: você talvez precise olhar página por página.\n\nUm **índice de banco de dados** é uma estrutura auxiliar que organiza informações para ajudar o **SGBD** a localizar linhas de forma eficiente em determinados padrões de consulta. Não é uma cópia completa da tabela para mostrar ao usuário: é um recurso interno para organizar acessos.\n\nO termo **consulta** representa uma pergunta expressa ao banco, por exemplo `SELECT * FROM pedidos WHERE cliente_id = 20`. O SGBD escolhe como obter a resposta, podendo utilizar o índice ou percorrer os dados diretamente."
      },
      {
        "title": "O que significa B-tree e como isso ajuda a localizar informação?",
        "body": "Um tipo comum de índice em bancos relacionais é o **B-tree**, uma estrutura de dados organizada em **nós** que permite encontrar faixas de chaves sem ler todas as entradas em sequência. Pense em um catálogo com divisões ordenadas: o sistema compara valores e escolhe por qual parte da estrutura continuar procurando.\n\nA estrutura é adequada a várias buscas por igualdade ou intervalos, como `cliente_id = 20` ou `data >= '2026-01-01'`, dependendo da coluna, do índice e de outras condições. O índice pode conter **referências a linhas**, para que o banco encontre os registros correspondentes depois de localizar as chaves.\n\nMas não existe garantia de que toda consulta ficará mais rápida só porque criamos um índice. O benefício depende de quantos registros correspondem ao filtro, dos dados, das estatísticas e do custo de acesso."
      },
      {
        "title": "Por que o índice acelera leitura e pode encarecer gravação?",
        "body": "Se uma tabela tem índice sobre `cliente_id` e chega um novo pedido, o banco precisa gravar o pedido **e atualizar a estrutura de índice correspondente**. Operações como INSERT, UPDATE e DELETE podem exigir manutenção dos índices afetados.\n\nIsso significa que índices usam **espaço de armazenamento** e geram trabalho adicional de escrita. Criar um índice para todas as colunas, sem análise, pode piorar o desempenho geral. Uma busca que retorna quase todas as linhas talvez seja mais eficiente lendo a tabela diretamente do que fazendo milhares de acessos pelo índice.\n\n**Seletividade** é a ideia de quantos registros um filtro deixa passar. Um filtro que encontra dez linhas em um milhão pode beneficiar-se mais de um índice que um filtro que encontra 900 mil, considerando as demais condições."
      },
      {
        "title": "Plano de execução: como o banco decide o caminho?",
        "body": "O **plano de execução** é a estratégia que o SGBD escolhe para realizar uma consulta. Ele pode incluir operações como leitura sequencial de tabela (**sequential scan**), acesso por índice, junções e ordenação. Ferramentas como `EXPLAIN` no PostgreSQL ajudam a observar a estratégia estimada.\n\nUm **otimizador de consultas** compara maneiras possíveis de executar a consulta, usando estimativas de custo e estatísticas. O fato de existir índice não obriga o banco a escolhê-lo: o otimizador pode estimar que outro caminho é melhor.\n\nAo resolver prova, diferencie **criar índice** de **garantir desempenho**. Um índice é ferramenta, não promessa universal. Consulte [Documentação PostgreSQL — Indexes](https://www.postgresql.org/docs/current/indexes.html) para aprofundar os tipos e as decisões do planejador."
      }
    ],
    "worked": {
      "title": "Exercício: buscar dez clientes numa tabela de um milhão de pedidos",
      "body": "**Situação:** um sistema possui um milhão de linhas na tabela Pedidos. Uma consulta frequente filtra `WHERE cliente_id = 20` e, geralmente, encontra apenas dez pedidos.\n\n**Passo 1.** A consulta seleciona poucas linhas em relação ao total, portanto o filtro é bastante seletivo nesse cenário.\n\n**Passo 2.** Um índice adequado em `cliente_id` pode permitir localizar essas linhas sem percorrer o milhão de registros um a um.\n\n**Passo 3.** O índice exige espaço e manutenção quando pedidos são inseridos, removidos ou têm a chave alterada.\n\n**Passo 4.** Para verificar se o banco realmente o utiliza, observe o plano estimado da consulta por ferramenta como `EXPLAIN`.\n\n**Conclusão:** um índice é promissor aqui, mas a decisão correta depende do padrão de consultas e custos; não é preciso criar índices indiscriminadamente."
    },
    "pitfalls": [
      "Índice não é cópia de segurança e não garante que o banco nunca precise examinar muitas linhas.",
      "Um índice pode acelerar buscas e aumentar o custo de escritas.",
      "O otimizador pode escolher uma leitura sequencial mesmo quando existe índice.",
      "Uma consulta que seleciona quase todas as linhas nem sempre se beneficia do índice."
    ],
    "review": [
      {
        "ask": "Para que serve um índice de banco de dados?",
        "answer": "Organizar informações auxiliares para localizar registros de modo eficiente em determinados tipos de busca."
      },
      {
        "ask": "Por que um índice tem custo em INSERT e UPDATE?",
        "answer": "Porque a estrutura auxiliar pode precisar ser modificada para acompanhar inserções ou alterações dos dados."
      },
      {
        "ask": "O que um plano de execução descreve?",
        "answer": "O caminho de operações que o SGBD escolhe para obter os dados da consulta, com acessos, filtros e junções."
      },
      {
        "ask": "Por que um índice existente pode não ser usado numa consulta?",
        "answer": "Porque o otimizador pode estimar que ler a tabela diretamente ou usar outra estratégia tem custo menor."
      }
    ],
    "extra": ""
  }
};
