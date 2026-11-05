import type {PedagogicalLesson} from './intro1'
/** Ensino dos fundamentos nas quatro disciplinas restantes: conceitos antes dos nomes. */
export const beginnerCrossB:Record<number,Partial<PedagogicalLesson>>={
  "12": {
    "id": 12,
    "title": "Banco de dados e SQL: primeiro entenda os dados, depois os comandos",
    "goal": "Entender para que serve um banco de dados relacional, o que são tabelas, linhas, colunas, chaves e consultas, e só então aplicar SELECT, WHERE, JOIN e transações.",
    "steps": [
      {
        "title": "1. Por que organizar informações em um banco de dados?",
        "body": "Imagine uma empresa que guarda os cadastros de clientes em várias planilhas. Se uma pessoa muda de telefone, a alteração pode ser feita em uma planilha, mas esquecida em outra. Além disso, duas pessoas podem tentar atualizar a mesma informação ao mesmo tempo. Um **banco de dados** ajuda a armazenar e organizar informações para consultá-las e modificá-las de maneira controlada.\n\nUm **SGBD** (*Sistema Gerenciador de Banco de Dados*) é o software que realiza esse gerenciamento. O PostgreSQL é um exemplo. O SGBD recebe comandos de aplicações e usuários autorizados, acessa os dados armazenados e procura preservar propriedades como integridade e recuperação.\n\n**Banco de dados não é a mesma coisa que SQL.** O banco guarda as informações; **SQL** é uma linguagem usada para conversar com muitos bancos relacionais, expressando operações como consultar ou alterar registros."
      },
      {
        "title": "2. Tabela, linha, coluna e chave: comece com uma lista de clientes",
        "body": "Pense numa tabela chamada **Clientes** com três colunas: `id`, `nome` e `telefone`. Cada **linha** representa o registro de um cliente, como `12 | Ana | 9999-0000`. A **coluna** descreve uma característica que será guardada, como o nome. Numa linguagem de bancos relacionais, essas características também são chamadas de **atributos**.\n\nMas duas clientes podem se chamar Ana. Por isso é útil um identificador que diferencie os registros. A **chave primária** é uma coluna ou conjunto de colunas escolhido para identificar de maneira única cada linha. Neste exemplo, pode ser o `id`.\n\nAgora crie uma tabela **Pedidos** com colunas `pedido_id`, `cliente_id` e `data`. O `cliente_id` pode funcionar como **chave estrangeira**: um valor que estabelece ligação com a chave de Clientes. Assim, o pedido se relaciona ao cliente sem repetir todas as informações da pessoa a cada compra. Essa conexão será essencial para entender JOIN."
      },
      {
        "title": "3. SELECT, WHERE e JOIN resolvem perguntas diferentes",
        "body": "Imagine que a tabela Clientes possui Ana, Bruno e Carla. O comando **SELECT** serve para solicitar dados. `SELECT nome FROM Clientes` pede a coluna nome. O comando `WHERE` acrescenta uma **condição de filtro**: `SELECT nome FROM Clientes WHERE id = 12` procura o nome do cliente identificado como 12.\n\nSe queremos descobrir o nome de quem fez determinado pedido, precisamos **relacionar duas tabelas**. O **JOIN** faz essa combinação conforme uma condição. Exemplo: `SELECT Clientes.nome FROM Pedidos JOIN Clientes ON Pedidos.cliente_id = Clientes.id`. O `ON` expressa como uma linha de Pedidos se relaciona à linha correspondente de Clientes.\n\n**ORDER BY** controla a ordem da resposta, como ordenar nomes alfabeticamente. **GROUP BY** permite formar grupos para cálculos de agregação, como contar pedidos por cliente. Um aluno entende esses comandos melhor quando consegue responder **qual pergunta sobre os dados cada um resolve**."
      },
      {
        "title": "4. O que acontece se uma alteração falhar pela metade?",
        "body": "Imagine uma transferência de R$ 100 entre duas contas. O sistema reduz R$ 100 de uma conta e adiciona R$ 100 à outra. Se a energia acaba depois do débito, mas antes do crédito, os dados ficam incoerentes. Para tratar operações relacionadas, usamos **transações**.\n\nUma **transação** é uma unidade de trabalho do banco. **COMMIT** confirma as alterações; **ROLLBACK** desfaz as mudanças ainda não confirmadas. Isso está relacionado à **atomicidade**, que significa tratar o conjunto como 'tudo ou nada'.\n\nOutras propriedades de transações são **consistência**, preservação das regras e restrições definidas; **isolamento**, controle de como transações simultâneas interferem entre si; e **durabilidade**, preservação de alterações confirmadas conforme as garantias do SGBD. Juntas, formam a sigla **ACID**. Agora a lista tem um motivo: proteger operações reais contra resultados incorretos."
      }
    ],
    "worked": {
      "title": "Exercício resolvido: buscar o nome de quem realizou um pedido",
      "body": "**Dados:** Clientes(id, nome) tem `5 | Maria` e `8 | Paulo`. Pedidos(pedido_id, cliente_id) tem `101 | 8`.\n\n**Pergunta:** qual cliente realizou o pedido 101?\n\n**Passo 1 — Identifique a informação existente.** A tabela Pedidos diz que o pedido 101 pertence a `cliente_id = 8`. Ela não contém diretamente o nome.\n\n**Passo 2 — Entenda o vínculo.** O campo `cliente_id` se refere ao `id` da tabela Clientes, que identifica Paulo.\n\n**Passo 3 — Escreva a consulta:** `SELECT Clientes.nome FROM Pedidos JOIN Clientes ON Pedidos.cliente_id = Clientes.id WHERE Pedidos.pedido_id = 101;`.\n\n**Passo 4 — Interprete o resultado.** A condição WHERE escolhe o pedido 101; JOIN conecta o pedido ao cliente; SELECT pede o nome. O resultado é **Paulo**.\n\n**Conclusão:** a consulta faz sentido porque compreendemos as tabelas e a relação entre elas — não por decorar a sintaxe do JOIN isoladamente."
    },
    "pitfalls": [
      "SQL é uma linguagem de consulta/manipulação; o SGBD é o software que administra o banco.",
      "Uma chave primária identifica registros; uma chave estrangeira representa relacionamento com outra chave.",
      "WHERE filtra linhas antes da agregação; GROUP BY organiza grupos para cálculos como COUNT.",
      "COMMIT confirma uma transação; ROLLBACK desfaz mudanças ainda não confirmadas."
    ],
    "review": [
      {
        "ask": "Qual a diferença entre banco de dados e SGBD?",
        "answer": "Banco é o conjunto organizado de dados; SGBD é o software que os administra."
      },
      {
        "ask": "O que uma chave primária resolve?",
        "answer": "Permite identificar de forma única as linhas de uma tabela."
      },
      {
        "ask": "Por que usar JOIN?",
        "answer": "Para combinar dados de tabelas relacionadas segundo uma condição."
      },
      {
        "ask": "Por que uma transferência entre contas precisa de transação?",
        "answer": "Para que as alterações relacionadas não fiquem confirmadas apenas pela metade."
      }
    ],
    "extra": ""
  },
  "14": {
    "id": 14,
    "title": "Desenvolvimento de software: da necessidade ao programa testado",
    "goal": "Entender o que significa requisito, comportamento, critério de aceite, teste, versão e commit por meio da criação gradual de um sistema simples.",
    "steps": [
      {
        "title": "1. Por que começar pelo problema do usuário, não pelo código?",
        "body": "Imagine que uma clínica quer um programa para agendar exames. É tentador começar escolhendo uma linguagem de programação e desenhando telas. Mas a primeira pergunta é: **qual problema precisamos resolver?** Talvez a recepção precise localizar horários disponíveis e evitar dois agendamentos no mesmo horário.\n\nUm **requisito** é uma necessidade ou condição que o sistema deve atender. Por exemplo: 'O atendente deve conseguir consultar horários livres de um equipamento'. Isso descreve algo que o software precisa fazer. Antes de programar, a equipe deve entender **quem usa**, **qual tarefa realiza**, **qual resultado espera** e **que restrições existem**.\n\nEsse cuidado é a base da engenharia de software: desenvolver um produto que resolva necessidades reais e cuja qualidade possa ser avaliada, não apenas produzir código que executa."
      },
      {
        "title": "2. Requisitos funcionais e não funcionais: duas perguntas diferentes",
        "body": "Um **requisito funcional** descreve **uma função ou comportamento** do sistema: registrar paciente, consultar horário ou emitir comprovante. Já um requisito **não funcional** descreve uma qualidade ou restrição importante, como desempenho, disponibilidade, segurança ou acessibilidade.\n\nCompare: 'O sistema permite buscar agendamentos por data' é funcional. 'A pesquisa deve retornar em até dois segundos para a carga definida' é uma exigência de desempenho. Dizer apenas 'o sistema deve ser rápido' é muito vago: diferentes pessoas entenderão coisas diferentes.\n\nBancas gostam de trocar os exemplos. Para decidir, pergunte: **estamos descrevendo uma tarefa que o sistema executa ou uma característica que essa execução deve possuir?** Alguns requisitos misturam aspectos; em prova, observe o foco do enunciado."
      },
      {
        "title": "3. Como saber se uma funcionalidade ficou correta?",
        "body": "Se um programador afirma 'terminei a tela de agendamento', como o usuário consegue conferir? Precisamos de **critérios de aceite**, isto é, condições observáveis que mostram quando a funcionalidade atende ao que foi combinado.\n\nExemplo: ao escolher a data de amanhã, a tela deve listar os horários disponíveis; ao selecionar um horário já ocupado, deve impedir um segundo agendamento; ao salvar com sucesso, deve apresentar confirmação. Cada caso pode ser verificado por um **teste**, uma atividade planejada para observar se o sistema se comporta conforme o esperado.\n\nUm **teste unitário** avalia uma pequena parte do software, como uma função que calcula duração de exame. Um **teste de integração** verifica se componentes trabalham juntos, por exemplo API e banco. Um **teste de sistema** verifica o produto integrado. O fato de um teste passar não garante que todos os requisitos foram atendidos: depende do que efetivamente foi testado."
      },
      {
        "title": "4. Git, commit e versão: por que guardar o histórico das mudanças?",
        "body": "Imagine que a aplicação funcionava ontem e apresentou erro depois de uma alteração. Sem histórico, descobrir o que mudou é difícil. Um **sistema de controle de versões**, como o Git, registra as alterações do projeto e ajuda a comparar estados do código.\n\nUm **commit** é um registro de um conjunto de mudanças acompanhado de informações como autor e mensagem. Uma **branch** é uma linha de desenvolvimento para organizar trabalho e testar alterações sem misturá-las imediatamente à versão principal. Um **merge** integra essas mudanças quando apropriado.\n\nIsso se conecta aos testes: a equipe altera o código, registra o commit, executa verificações e só depois distribui uma versão. **CI (integração contínua)** é uma prática de integrar e testar mudanças com frequência. Esses nomes não são etapas mágicas; fazem parte de um processo que busca reduzir erros e permitir rastreabilidade."
      }
    ],
    "worked": {
      "title": "Exercício resolvido: transformar um pedido vago em algo testável",
      "body": "**Pedido do gerente:** 'Preciso que o agendamento seja rápido e não dê erro'.\n\n**Passo 1 — Descubra a tarefa.** O atendente precisa cadastrar paciente, selecionar exame e confirmar um horário. Isso sugere requisitos funcionais concretos.\n\n**Passo 2 — Traduza 'rápido'.** Defina condições mensuráveis, como tempo máximo de resposta sob uma carga de usuários conhecida. Assim o requisito deixa de ser apenas uma impressão.\n\n**Passo 3 — Identifique um risco.** Duas pessoas podem tentar reservar o mesmo horário. Crie um critério de aceite: a segunda tentativa não pode gerar duplicidade e deve informar conflito.\n\n**Passo 4 — Planeje testes.** Um teste verifica agendamento normal; outro simula duas tentativas concorrentes; outro mede tempo de resposta.\n\n**Passo 5 — Registre a mudança.** Após desenvolvimento e testes, salve um commit com mensagem que explique a alteração.\n\n**Conclusão:** requisito, teste e versionamento são partes de uma mesma história: transformar uma necessidade em comportamento comprovável e rastreável."
    },
    "pitfalls": [
      "Requisito funcional descreve o que o sistema faz; não funcional frequentemente descreve qualidade ou restrição.",
      "'Ser rápido' é vago sem condição e métrica para verificação.",
      "Um teste que passou não prova que todas as funcionalidades possíveis funcionam.",
      "Commit é registro de mudança; branch é linha de desenvolvimento; merge integra históricos."
    ],
    "review": [
      {
        "ask": "O que é um requisito de software?",
        "answer": "Uma necessidade ou condição que o produto deve atender."
      },
      {
        "ask": "'Permitir agendar exame' é funcional ou não funcional?",
        "answer": "Funcional, pois descreve um comportamento oferecido pelo sistema."
      },
      {
        "ask": "Para que serve um critério de aceite?",
        "answer": "Definir condições observáveis que permitem verificar se o requisito foi atendido."
      },
      {
        "ask": "O que um commit do Git registra?",
        "answer": "Um conjunto de alterações no histórico do projeto, com identificação e mensagem associadas."
      }
    ],
    "extra": ""
  },
  "16": {
    "id": 16,
    "title": "Lógica desde o início: frases, verdadeiro/falso e conectivos",
    "goal": "Aprender o que é proposição e como 'não', 'e', 'ou' e 'se... então' mudam o valor lógico, antes de montar tabelas-verdade.",
    "steps": [
      {
        "title": "1. O que é uma proposição e por que isso importa?",
        "body": "No dia a dia, fazemos perguntas, damos ordens e afirmamos fatos. A lógica de concursos começa identificando quais frases podem ser classificadas como **verdadeiras ou falsas**. Chamamos essas frases declarativas de **proposições**.\n\nExemplos: **'O servidor está ligado'** pode ser verdadeiro ou falso, mesmo que você ainda não saiba qual é o caso. **'Desligue o servidor!'** é uma ordem; não faz sentido dizer que a ordem, por si só, é verdadeira ou falsa. **'Qual é a senha?'** é uma pergunta, não uma proposição desse tipo.\n\nPara não repetir frases longas, usamos letras: `P` pode representar 'O servidor está ligado' e `Q` pode representar 'A rede está funcionando'. Essas letras não são fórmulas misteriosas; são **apelidos para frases** cujos valores lógicos queremos analisar."
      },
      {
        "title": "2. O que significa negar uma frase?",
        "body": "Se `P` é a frase 'O servidor está ligado', então **'não P'** é 'O servidor não está ligado'. O símbolo `¬P` representa essa **negação**. Se P for verdadeira, ¬P será falsa; se P for falsa, ¬P será verdadeira. Negar é inverter o valor lógico de uma proposição.\n\nAgora imagine que P seja 'Todos os equipamentos funcionam'. Negar não significa afirmar 'Nenhum equipamento funciona'. Basta que **um equipamento falhe** para a frase original ser falsa. Por isso, a negação adequada é 'Pelo menos um equipamento não funciona'.\n\nEssa ideia prepara o estudo de quantificadores: primeiro entenda **qual situação tornaria a frase falsa**; depois aprenda a escrever essa situação com precisão."
      },
      {
        "title": "3. 'E' e 'ou': quando duas condições precisam acontecer?",
        "body": "Considere `P`: 'O usuário tem senha válida' e `Q`: 'O usuário tem permissão para o relatório'. A frase **P e Q** exige que **as duas** sejam verdadeiras. Se ele tem senha válida, mas não tem permissão, a conjunção é falsa.\n\nA frase **P ou Q**, na lógica proposicional usual de concursos, é um **ou inclusivo**: basta pelo menos uma ser verdadeira, e também pode acontecer de ambas serem verdadeiras. Isso é diferente de certas situações do cotidiano em que 'ou' significa uma escolha exclusiva.\n\nPor exemplo, 'Possui notebook ou tablet' pode ser verdadeiro para alguém que possui os dois. Ao ler o enunciado, verifique se o examinador está usando o 'ou' inclusivo típico da lógica ou estabeleceu explicitamente uma escolha exclusiva."
      },
      {
        "title": "4. 'Se P, então Q': por que só há um caso que torna a frase falsa?",
        "body": "Considere a afirmação **'Se o pedido foi aprovado, então ele aparece no sistema'**. A primeira parte (`P`) é a **condição antecedente**; a segunda (`Q`) é a **consequência**. Na lógica proposicional, a implicação `P → Q` é falsa quando **P é verdadeira e Q é falsa**: o pedido foi aprovado, mas não aparece, contrariando o que a frase prometeu.\n\nSe o pedido não foi aprovado, a frase condicional não afirma que ele obrigatoriamente aparece ou deixa de aparecer. Por isso a condicional clássica é considerada verdadeira nos casos em que P é falsa. Essa é a parte mais contraintuitiva, e entender a ideia de **violação da promessa condicional** ajuda a lembrar o único caso falso.\n\nNão inverta sem cuidado: 'Se P, então Q' **não é equivalente**, em geral, a 'Se Q, então P'. A frase equivalente chamada **contrapositiva** é 'Se não Q, então não P'."
      }
    ],
    "worked": {
      "title": "Questão resolvida: quando uma promessa condicional foi quebrada?",
      "body": "**Frase:** 'Se a senha está correta, então o usuário consegue acessar o sistema'.\n\n**Cenário 1:** senha correta e acesso liberado. A condição ocorreu e a consequência também; a condicional é verdadeira.\n\n**Cenário 2:** senha correta, mas acesso negado. A condição ocorreu e a consequência não; **é o único caso que torna a condicional falsa** na lógica proposicional clássica.\n\n**Cenário 3:** senha incorreta e acesso negado. A condição não ocorreu; a condicional não foi contradita pelo caso descrito.\n\n**Cenário 4:** senha incorreta e acesso liberado. Novamente, a condição não ocorreu; a condicional não estabelecia regra para esse caso.\n\n**Conclusão:** não basta olhar apenas a consequência. Para avaliar `P → Q`, pergunte: **P aconteceu? Se sim, Q aconteceu?** Isso ajuda a construir a tabela-verdade compreendendo cada linha."
    },
    "pitfalls": [
      "Proposição é frase declarativa que pode receber valor lógico; perguntas e ordens não são proposições nesse sentido.",
      "'P e Q' exige ambas verdadeiras.",
      "O 'ou' lógico inclusivo permite que P e Q sejam verdadeiras ao mesmo tempo.",
      "'Se P, então Q' só é falsa quando P é verdadeira e Q é falsa."
    ],
    "review": [
      {
        "ask": "Por que 'Feche a janela!' não é proposição clássica?",
        "answer": "É uma ordem, não uma frase declarativa à qual se atribui verdadeiro ou falso."
      },
      {
        "ask": "Quando 'P e Q' é verdadeira?",
        "answer": "Quando P e Q são ambas verdadeiras, pois a conjunção exige que as duas condições sejam atendidas."
      },
      {
        "ask": "Quando 'P ou Q' inclusivo é falso?",
        "answer": "Quando P e Q são ambas falsas, porque o 'ou' inclusivo fica verdadeiro se ao menos uma delas ocorrer."
      },
      {
        "ask": "Qual é o único caso falso de 'se P, então Q'?",
        "answer": "Quando a condição P ocorre e a consequência Q não ocorre, contrariando a promessa feita pela condicional."
      }
    ],
    "extra": ""
  },
  "17": {
    "id": 17,
    "title": "LGPD desde o básico: dados pessoais e decisões sobre seu uso",
    "goal": "Entender o que é dado pessoal, tratamento, titular, controlador, operador, finalidade e base legal por meio de um cadastro real.",
    "steps": [
      {
        "title": "1. Por que uma lei precisa regular o uso de informações sobre pessoas?",
        "body": "Imagine que uma clínica solicita nome, telefone e informações de saúde para agendar exames. A organização precisa desses dados para realizar atividades, mas a pessoa pode sofrer consequências se as informações forem expostas, usadas para outra finalidade ou mantidas sem critério.\n\nA **LGPD** é a **Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018)**. Ela estabelece regras e direitos relacionados ao **tratamento de dados pessoais** nas situações abrangidas por sua aplicação. Um **dado pessoal** é informação relacionada a uma **pessoa natural** — uma pessoa humana — identificada ou que possa ser identificada, inclusive pela combinação de informações.\n\nExemplo: um nome completo associado a telefone pode identificar um paciente. Um identificador aparentemente aleatório também pode ser dado pessoal quando alguém consegue relacioná-lo à pessoa. A ideia não se limita a CPF ou endereço."
      },
      {
        "title": "2. Dados pessoais e sensíveis: por que saúde exige atenção especial?",
        "body": "A lei distingue os **dados pessoais comuns** de categorias de **dados pessoais sensíveis**, que recebem regras específicas. Informações sobre saúde são exemplos de dados sensíveis. Não significa que qualquer dado sensível seja proibido de utilizar: significa que seu tratamento precisa se enquadrar nas hipóteses e cuidados aplicáveis.\n\nUm nome usado para identificar um paciente é dado pessoal. Um resultado de exame relacionado à pessoa envolve informação sobre saúde e exige cuidados adicionais. **Tratamento** é um termo amplo que inclui coletar, consultar, armazenar, compartilhar, alterar, bloquear e eliminar informações. Portanto, não é necessário publicar um dado na Internet para existir tratamento: **simplesmente armazená-lo também é uma operação de tratamento**.\n\nEssa explicação evita uma pegadinha comum: pensar que LGPD só se aplica a vazamento. A lei também alcança a maneira como dados são obtidos e utilizados."
      },
      {
        "title": "3. Quem é titular, controlador e operador?",
        "body": "O **titular** é a pessoa natural a quem os dados se referem. Se Ana realiza um exame, Ana é a titular dos dados pessoais relacionados a ela.\n\nO **controlador** é o agente que toma decisões referentes ao tratamento, dentro das responsabilidades previstas em lei. Por exemplo, uma instituição pode decidir por quais finalidades um cadastro é mantido e quais informações precisa coletar. O **operador** realiza tratamento **em nome do controlador**, conforme sua relação e as decisões aplicáveis. Um prestador de tecnologia pode desempenhar esse papel em determinado serviço.\n\nO papel não depende apenas do nome no contrato. É necessário observar **quem decide** e **quem realiza o tratamento em nome de quem**. Um mesmo negócio pode ter diferentes papéis em operações distintas. Entender isso é mais importante do que decorar 'controlador manda, operador faz' sem analisar o caso."
      },
      {
        "title": "4. Finalidade, necessidade e base legal: três perguntas que se conectam",
        "body": "Antes de coletar um dado, a organização deveria responder: **para que vamos utilizá-lo?** Isso está relacionado ao princípio da **finalidade**: o uso precisa ter propósitos legítimos, específicos e informados conforme a lei. A segunda pergunta é: **precisamos realmente dessa informação?** O princípio da **necessidade** orienta limitar o tratamento ao mínimo pertinente para a finalidade.\n\nA terceira pergunta é: **qual hipótese da lei autoriza esse tratamento?** Essa justificativa é frequentemente chamada de **base legal**. A LGPD apresenta diferentes bases, dependendo da categoria de dados e da operação. **Consentimento** é uma delas, mas **não é a única**. Obrigações legais, tutela da saúde e outras hipóteses previstas podem ser relevantes conforme o caso e o tipo de informação.\n\nA escolha precisa ser compatível com a realidade. Pedir 'aceito tudo' não resolve automaticamente a coleta de dados desnecessários, nem elimina obrigações de segurança e transparência."
      }
    ],
    "worked": {
      "title": "Caso resolvido: o cadastro exige dados demais?",
      "body": "**Situação:** um sistema permite imprimir um comprovante simples de agendamento, mas obriga a pessoa a fornecer nome, telefone, informações de saúde extensas e dados de familiares, sem apresentar motivo para todos esses campos.\n\n**Passo 1 — Identifique o titular.** É a pessoa a quem os dados se referem.\n\n**Passo 2 — Descubra a finalidade.** O objetivo declarado é emitir um comprovante de agendamento.\n\n**Passo 3 — Verifique a necessidade.** Pergunte se todos os campos são pertinentes e proporcionais a esse objetivo. Informações sobre familiares ou histórico médico extenso podem exigir justificativas específicas.\n\n**Passo 4 — Examine a base legal.** A organização precisa avaliar a hipótese legal aplicável a cada finalidade, principalmente se há dados de saúde, que são sensíveis.\n\n**Conclusão:** a análise adequada não é 'proibir todo tratamento' nem 'permitir tudo com uma caixa de consentimento'. É vincular **finalidade, necessidade, base e proteção** ao uso real dos dados."
    },
    "pitfalls": [
      "Dado pessoal não se limita a CPF: identificadores indiretos também podem identificar alguém.",
      "Armazenar, consultar e compartilhar são exemplos de tratamento de dados.",
      "Dados de saúde são sensíveis e têm hipóteses legais específicas.",
      "Consentimento não é a única base legal, nem autoriza automaticamente coleta desnecessária."
    ],
    "review": [
      {
        "ask": "O que é dado pessoal?",
        "answer": "Informação relacionada a uma pessoa natural identificada ou identificável."
      },
      {
        "ask": "Guardar um cadastro, sem compartilhá-lo, é tratamento?",
        "answer": "Sim. Armazenamento é uma operação de tratamento."
      },
      {
        "ask": "Qual a diferença entre titular e controlador?",
        "answer": "Titular é a pessoa a quem os dados se referem; controlador toma decisões referentes ao tratamento."
      },
      {
        "ask": "Por que finalidade e necessidade devem ser analisadas juntas?",
        "answer": "Porque precisamos saber para que o dado será usado e limitar a coleta ao que for pertinente para esse objetivo."
      }
    ],
    "extra": ""
  }
};
