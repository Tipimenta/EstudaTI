import type {PedagogicalLesson} from './intro1'
/** Curadoria intermediária: UML, probabilidade e modalidades da Lei 14.133. */
export const middleExplainedC:Record<number,Partial<PedagogicalLesson>>={
  "68": {
    "id": 68,
    "goal": "Entender por que diagramas UML existem e quando escolher casos de uso, classes, sequência ou atividades para explicar um software.",
    "steps": [
      {
        "title": "Antes de desenhar: o que precisamos comunicar sobre um sistema?",
        "body": "Imagine que uma equipe vai construir um aplicativo de agendamentos. O gerente quer saber **o que o usuário poderá fazer**; o programador quer entender **quais informações precisam existir**; a equipe de testes quer acompanhar **o que acontece quando uma pessoa confirma uma reserva**. Um único texto pode ficar difícil de consultar, porque cada pessoa precisa enxergar um aspecto do software.\n\nChamamos de **modelo** uma representação simplificada de algo, criada para destacar informações importantes. A **UML** (*Unified Modeling Language*), ou Linguagem de Modelagem Unificada, oferece tipos padronizados de diagramas para representar estruturas e comportamentos de sistemas. É uma linguagem visual, não uma linguagem de programação que executa sozinha o sistema.\n\nO valor está em escolher a representação de acordo com a pergunta que queremos responder, não em desenhar a maior quantidade de símbolos possível."
      },
      {
        "title": "Casos de uso: o que o usuário deseja realizar?",
        "body": "O **diagrama de casos de uso** representa funções vistas do ponto de vista dos participantes externos ao sistema. Esses participantes são chamados de **atores** — pessoas, sistemas ou outros elementos que interagem com a solução. Um ator não precisa ser uma pessoa específica: pode ser o papel 'Recepcionista'.\n\nImagine os casos **Consultar horários** e **Agendar exame**, ligados ao ator Recepcionista. Isso comunica quais objetivos ou interações o sistema oferece. O diagrama não explica cada tela, a ordem exata de cliques ou como o código será escrito.\n\nSe a pergunta de prova pede representar **quem interage com o sistema e quais funcionalidades utiliza**, pense em caso de uso. Mas, se pedir a ordem das mensagens entre objetos, precisamos de outro tipo de representação."
      },
      {
        "title": "Classes e relacionamentos: quais informações o programa organiza?",
        "body": "Uma **classe** é uma descrição de objetos de determinado tipo, com características (**atributos**) e comportamentos (**operações/métodos**). Por exemplo, a classe `Paciente` pode ter `nome` e `telefone`, enquanto `Agendamento` pode ter `data`, `hora` e uma operação para confirmar a reserva.\n\nUm **diagrama de classes** pode mostrar que Paciente se relaciona com Agendamento. Também pode expressar **multiplicidades**: quantos objetos de um tipo podem estar relacionados aos objetos de outro tipo. Por exemplo, um paciente pode ter muitos agendamentos, enquanto cada agendamento está associado a um paciente, conforme as regras escolhidas.\n\nO diagrama de classes ajuda a discutir estrutura e relacionamentos. Ele não substitui automaticamente o modelo de banco nem mostra a sequência temporal das mensagens de uma operação."
      },
      {
        "title": "Sequência e atividades: como a operação acontece?",
        "body": "Se a pergunta for 'em que ordem o navegador, a API e o banco conversam para registrar um agendamento?', o **diagrama de sequência** é adequado. Ele mostra participantes e **mensagens** trocadas ao longo do tempo. Por exemplo: navegador solicita reserva, API consulta disponibilidade, banco responde, API confirma ou recusa, navegador exibe o resultado.\n\nSe a pergunta for 'qual caminho de decisões e tarefas o processo percorre?', um **diagrama de atividades** pode mostrar o fluxo. Exemplo: receber pedido → verificar horário → **horário livre?** → se sim, confirmar; se não, informar indisponibilidade. Ele enfatiza atividades e condições de decisão.\n\n**Conexão final:** caso de uso representa objetivos do ator; classes mostram estrutura; sequência mostra mensagens ordenadas; atividades mostram fluxo de tarefas. Não são quatro maneiras equivalentes de desenhar o mesmo detalhe."
      }
    ],
    "worked": {
      "title": "Exercício: qual diagrama usar para cada pergunta?",
      "body": "**Cenário:** uma secretaria quer desenvolver um portal de agendamento e precisa de quatro representações.\n\n**Pergunta 1:** 'Quais funções o médico e o paciente podem utilizar?' Escolha **casos de uso**, porque queremos representar atores e objetivos de interação.\n\n**Pergunta 2:** 'Quais dados existem em Paciente, Médico e Consulta, e como se relacionam?' Escolha **classes**, porque o foco é estrutural.\n\n**Pergunta 3:** 'Em que ordem a aplicação consulta o banco e responde ao usuário quando há conflito de horário?' Escolha **sequência**, porque importam as mensagens e sua ordem.\n\n**Pergunta 4:** 'Quais atividades ocorrem desde solicitar até confirmar a consulta, incluindo decisões de horário?' Escolha **atividades**, porque o foco é fluxo de trabalho.\n\n**Conclusão:** o modelo correto começa pela pergunta a ser respondida, não pelo diagrama mais conhecido."
    },
    "pitfalls": [
      "UML é linguagem de modelagem, não código executável por si só.",
      "Ator em caso de uso representa papel externo de interação, não necessariamente uma pessoa única.",
      "Classes representam estruturas e relações; sequência representa mensagens ao longo do tempo.",
      "Diagramas de atividades enfatizam fluxo e decisões, não substituem automaticamente a ordem entre objetos."
    ],
    "review": [
      {
        "ask": "Qual é a função de um diagrama de casos de uso?",
        "answer": "Mostrar atores externos e os objetivos ou funcionalidades que eles utilizam no sistema."
      },
      {
        "ask": "O que o diagrama de classes representa?",
        "answer": "Estruturas de tipos de objetos, atributos, operações e relacionamentos entre classes."
      },
      {
        "ask": "Quando utilizar um diagrama de sequência?",
        "answer": "Quando queremos entender a ordem das mensagens trocadas entre participantes durante uma interação."
      },
      {
        "ask": "Quando utilizar um diagrama de atividades?",
        "answer": "Quando a intenção é representar tarefas, decisões e caminhos possíveis de um processo."
      }
    ],
    "extra": ""
  },
  "78": {
    "id": 78,
    "goal": "Compreender probabilidade como medida de chance e resolver casos de evento, complemento e independência sem aplicar fórmulas sem sentido.",
    "steps": [
      {
        "title": "O que significa uma probabilidade de 25%?",
        "body": "Imagine uma caixa com quatro cartões do mesmo tamanho: um azul e três vermelhos. Você retira um cartão sem olhar. Se todos os cartões tiverem a mesma chance de serem escolhidos, a probabilidade de retirar o azul é **1 em 4**, ou **25%**.\n\nA **probabilidade** representa numericamente quão possível é a ocorrência de um evento, segundo um modelo de resultados. Um **experimento aleatório** é uma situação cujo resultado específico não sabemos antecipadamente, como sortear um cartão. O **espaço amostral** é o conjunto de resultados possíveis. Um **evento** é um conjunto de resultados que nos interessa, como 'sair azul'.\n\nA conta 'casos favoráveis dividido pelo total' funciona quando os resultados elementares são **equiprováveis**, ou seja, todos têm a mesma probabilidade. Ela não pode ser aplicada cegamente quando as chances são diferentes."
      },
      {
        "title": "Como identificar casos favoráveis e o total?",
        "body": "Imagine um dado convencional com seis faces numeradas de 1 a 6, todas igualmente prováveis. O espaço amostral é `{1,2,3,4,5,6}`. O evento 'sair um número par' inclui `{2,4,6}`: são **três resultados favoráveis** em seis possíveis.\n\nPor isso, `P(par) = 3/6 = 1/2 = 50%`. `P` significa probabilidade; o texto entre parênteses descreve o evento. Antes de qualquer divisão, confira se não estamos contando um resultado duas vezes ou deixando possibilidades de fora.\n\nSe a pergunta disser 'sair um número maior que quatro', os favoráveis são `{5,6}` e a probabilidade será `2/6 = 1/3`. O raciocínio é sempre o mesmo: definir o conjunto de resultados e só depois calcular."
      },
      {
        "title": "Evento complementar: o que significa 'não acontecer'?",
        "body": "Voltando ao dado, defina o evento **A = sair um número par**. O **evento complementar** de A, indicado como `Aᶜ`, é 'não sair par', isto é, sair ímpar. Como um resultado ou pertence a A ou ao seu complemento, as probabilidades somam 1, ou 100%.\n\nLogo, `P(Aᶜ) = 1 − P(A)`. Se a chance de um serviço falhar em determinado intervalo for modelada como 5%, a chance complementar de **não ocorrer essa falha naquele intervalo** é 95%, de acordo com o mesmo modelo.\n\nO complemento não significa 'o contrário de um evento qualquer'. É precisamente o conjunto de resultados **fora do evento definido**, dentro do espaço amostral. Se o evento for 'tirar um número acima de 4', o complemento é 'tirar um número até 4'."
      },
      {
        "title": "Independência: por que dois sorteios podem ser tratados separadamente?",
        "body": "Considere duas moedas equilibradas lançadas de forma independente. O resultado da primeira não altera a probabilidade de cara na segunda. Chamamos isso de **independência de eventos**. Nessas condições, a probabilidade de duas caras é `1/2 × 1/2 = 1/4`.\n\nMas não podemos multiplicar todas as probabilidades dessa maneira sem verificar independência. Imagine uma urna com uma bola azul e três vermelhas. Ao retirar uma bola **sem reposição**, a composição muda: o resultado do primeiro sorteio afeta as chances do segundo.\n\nEm problemas de prova, as expressões **com reposição**, **sem reposição**, **sorteios independentes** e **condicionado ao resultado anterior** mudam o cálculo. A fórmula só faz sentido depois de entender o mecanismo do experimento."
      }
    ],
    "worked": {
      "title": "Exercício: duas retiradas sem reposição",
      "body": "**Cenário:** uma urna possui duas bolas azuis e duas vermelhas. São retiradas duas bolas, sem reposição. Qual a probabilidade de ambas serem azuis?\n\n**Passo 1.** Na primeira retirada, duas das quatro bolas são azuis. Portanto, `P(azul na primeira) = 2/4 = 1/2`.\n\n**Passo 2.** Se a primeira foi azul, restam três bolas, das quais **uma é azul**. Por isso, a probabilidade da segunda ser azul **nessa condição** é `1/3`.\n\n**Passo 3.** Multiplique as probabilidades das etapas encadeadas: `1/2 × 1/3 = 1/6`, aproximadamente 16,7%.\n\n**Conclusão:** não seria correto fazer `1/2 × 1/2`, porque a primeira retirada altera a composição da urna. A expressão 'sem reposição' é parte central do raciocínio."
    },
    "pitfalls": [
      "A fórmula favoráveis/total exige resultados elementares equiprováveis.",
      "Evento complementar reúne os resultados em que o evento definido não acontece.",
      "Independência não pode ser presumida apenas porque existem dois sorteios.",
      "Sem reposição, a primeira retirada pode alterar a chance da segunda."
    ],
    "review": [
      {
        "ask": "O que é um espaço amostral?",
        "answer": "É o conjunto de resultados possíveis de um experimento aleatório, usado como referência para definir eventos."
      },
      {
        "ask": "Quando casos favoráveis/total é adequado?",
        "answer": "Quando os resultados elementares considerados têm chances iguais de ocorrer, isto é, são equiprováveis."
      },
      {
        "ask": "Se P(A)=0,3, quanto é P(não A)?",
        "answer": "É 0,7, pois o evento e seu complementar cobrem todos os resultados e suas probabilidades somam 1."
      },
      {
        "ask": "Por que duas retiradas sem reposição não costumam ser independentes?",
        "answer": "Porque a primeira retirada altera a composição do conjunto e, com isso, pode mudar a probabilidade da segunda."
      }
    ],
    "extra": ""
  },
  "87": {
    "id": 87,
    "goal": "Diferenciar as cinco modalidades de licitação previstas no art. 28 da Lei 14.133/2021 a partir do objetivo da contratação e sem confundir modalidade com critério de julgamento.",
    "steps": [
      {
        "title": "O que é uma licitação e por que uma compra pública é diferente da compra pessoal?",
        "body": "Quando uma pessoa compra um computador para casa, pode escolher livremente a loja que prefere. Já a Administração Pública lida com recursos públicos e precisa observar regras legais para selecionar fornecedores e contratar bens ou serviços. A **licitação** é o procedimento de seleção previsto em lei, orientado por princípios como isonomia, publicidade, planejamento e busca da proposta vantajosa conforme as condições da contratação.\n\nA Lei **14.133/2021** estabelece regras gerais aplicáveis a licitações e contratos administrativos dentro de seu âmbito. Uma **modalidade** é o tipo de procedimento licitatório escolhido segundo a natureza do objeto e as condições legais. Ela não é a mesma coisa que **critério de julgamento**, que define como as propostas serão comparadas (por exemplo, preço ou técnica, conforme o caso).\n\nAntes de decorar nomes, pergunte: **o que o órgão está tentando contratar ou alienar?** Essa necessidade ajuda a entender as modalidades."
      },
      {
        "title": "Pregão e concorrência: por que nem toda compra exige a mesma seleção?",
        "body": "**Pregão** é modalidade usada para aquisição de **bens e serviços comuns**, quando os padrões de desempenho e qualidade podem ser definidos objetivamente por especificações usuais de mercado. Por exemplo, comprar computadores com características mínimas verificáveis pode, dependendo da situação, admitir especificações objetivas.\n\n**Concorrência** é usada para objetos previstos na lei, como bens e serviços especiais e obras e serviços de engenharia, observadas as regras aplicáveis. **Serviço especial** é aquele cuja natureza ou complexidade não se enquadra como comum nas definições legais.\n\nO ponto não é simplesmente o preço ser alto ou baixo. A escolha depende do **enquadramento do objeto na legislação**. Uma contratação de alto valor não deixa automaticamente de ser comum; a banca costuma explorar a confusão entre valor e natureza do bem ou serviço."
      },
      {
        "title": "Concurso e leilão: quando não estamos escolhendo um fornecedor comum?",
        "body": "A modalidade **concurso** da Lei 14.133 é destinada à escolha de **trabalho técnico, científico ou artístico**, mediante prêmio ou remuneração ao vencedor, conforme o edital. Não confunda esse **concurso** com concurso público para contratar servidores efetivos: são procedimentos com finalidades distintas, apesar do mesmo nome.\n\nO **leilão** é usado para **alienação de bens** nas condições legais, isto é, a Administração está vendendo um bem, não adquirindo um serviço comum. O julgamento leva em conta a oferta conforme as regras aplicáveis, frequentemente associada ao **maior lance**.\n\n**Conexão:** pregão e concorrência tratam de selecionar propostas para determinadas contratações; concurso escolhe trabalho técnico/científico/artístico; leilão trata de alienação. Ao ler a questão, observe se a Administração quer **comprar, contratar, selecionar trabalho ou vender**."
      },
      {
        "title": "Diálogo competitivo: quando o problema é complexo e a solução precisa ser discutida?",
        "body": "Em certas contratações complexas, a Administração conhece a necessidade pública, mas não consegue definir de imediato os meios técnicos ou jurídicos mais adequados para atendê-la. O **diálogo competitivo** é modalidade com condições legais específicas em que a Administração realiza diálogos com licitantes previamente selecionados para desenvolver alternativas capazes de atender à necessidade, antes das propostas finais.\n\nIsso não significa autorização para negociar informalmente com qualquer empresa ou ignorar regras de igualdade e transparência. A modalidade possui procedimento próprio e pressupostos previstos na lei.\n\n**Revisão do quebra-cabeça:** modalidade = caminho legal de seleção; critério = regra para comparar propostas; objeto = o que se deseja adquirir, contratar, escolher ou alienar. Referência: [Lei 14.133, arts. 28 a 32](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)."
      }
    ],
    "worked": {
      "title": "Exercício: associe a necessidade pública à modalidade",
      "body": "**Situação A:** um órgão compra materiais de escritório padronizados, com especificações comuns de mercado. A modalidade usual a avaliar é **pregão**, respeitado o enquadramento legal.\n\n**Situação B:** o órgão vai selecionar um projeto artístico mediante prêmio previsto no edital. A modalidade é **concurso**, no sentido da Lei 14.133 — diferente de concurso para provimento de cargo.\n\n**Situação C:** o órgão pretende vender um bem público sob condições legais. A modalidade a examinar é **leilão**, pois trata de alienação.\n\n**Situação D:** uma contratação complexa preenche os pressupostos legais e exige diálogo para identificar a melhor solução. Pode caber **diálogo competitivo**.\n\n**Passo final:** se a questão perguntar 'menor preço' ou 'melhor técnica', ela pode estar perguntando **critério de julgamento**, não modalidade. O primeiro passo é separar essas duas perguntas.\n\n**Conclusão:** a modalidade não é apenas uma palavra para decorar: decorre da natureza e das condições do objeto da seleção."
    },
    "pitfalls": [
      "Modalidade de licitação não é o mesmo que critério de julgamento.",
      "Concurso licitatório para escolher trabalho técnico, científico ou artístico não é concurso público para cargo.",
      "Leilão é modalidade ligada à alienação de bens, não à compra comum de equipamentos.",
      "Pregão relaciona-se a bens e serviços comuns objetivamente especificáveis, conforme a lei."
    ],
    "review": [
      {
        "ask": "O que distingue modalidade de critério de julgamento?",
        "answer": "Modalidade define o procedimento de seleção; critério define como comparar as propostas, como preço ou técnica."
      },
      {
        "ask": "Para que serve a modalidade concurso na Lei 14.133?",
        "answer": "Para escolher trabalho técnico, científico ou artístico com prêmio ou remuneração, conforme regras do edital."
      },
      {
        "ask": "Qual modalidade é relacionada à alienação de bens?",
        "answer": "Leilão, utilizado quando a Administração vende bens nas hipóteses e condições previstas em lei."
      },
      {
        "ask": "Por que diálogo competitivo não é uma negociação informal?",
        "answer": "Porque possui condições legais de cabimento e procedimento próprio, com diálogo estruturado e competição conforme a lei."
      }
    ],
    "extra": ""
  }
};
