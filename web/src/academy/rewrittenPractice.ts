import type {PedagogicalLesson} from './intro1'
export const rewrittenPractice:Record<number,Partial<PedagogicalLesson>>={
  "71": {
    "id": 71,
    "goal": "Escolher corretamente métodos HTTP, status e operações sobre recursos, sem confundir REST, segurança e idempotência.",
    "steps": [
      {
        "title": "Entenda o que a API chama de recurso",
        "body": "Imagine um aplicativo que consulta chamados de suporte. A URL **/chamados/42** identifica um recurso, e o método HTTP expressa o que o cliente pretende fazer com ele. A abordagem **REST** orienta a organização de recursos e suas representações; o método HTTP possui semântica própria, independente do nome dado à rota.\n\nEm uma resposta, o servidor devolve uma representação, por exemplo JSON, acompanhada de status HTTP. JSON é formato de dados, não é sinônimo de REST. Autenticação (quem é o cliente?) e autorização (ele pode consultar este chamado?) são controles adicionais."
      },
      {
        "title": "GET, POST, PUT, PATCH e DELETE",
        "body": "**GET** busca uma representação e é classificado como método seguro pela semântica HTTP: o cliente não está solicitando alteração de estado. **POST** envia uma representação para processamento, frequentemente criando um recurso quando o servidor escolhe o identificador. **PUT** solicita substituir ou estabelecer o estado do recurso-alvo conhecido, com semântica idempotente. **PATCH** aplica uma alteração parcial, cujo comportamento idempotente depende do modo como a operação é definida. **DELETE** remove a associação/representação atual do recurso-alvo e também é idempotente quanto ao efeito pretendido.\n\nNão decida o método apenas pela tradução das palavras. Uma requisição POST não é automaticamente 'errada' para operações que não criam recursos; a semântica de processamento é mais abrangente."
      },
      {
        "title": "Seguro não é a mesma coisa que idempotente",
        "body": "Uma operação é **segura** quando a intenção da requisição não é produzir mudança de estado no servidor. Uma operação é **idempotente** quando repetir o mesmo pedido tem o mesmo efeito pretendido sobre o estado do recurso. GET é seguro e idempotente. PUT e DELETE são idempotentes, mas não seguros. POST não possui garantia geral de idempotência.\n\nExemplo: enviar **DELETE /chamados/42** remove o recurso na primeira vez. Repetir pode retornar HTTP 404, mas o recurso continua removido: o efeito pretendido é o mesmo. **Idempotência não exige que os códigos de resposta sejam iguais**. O servidor pode registrar logs a cada tentativa; isso não contradiz a definição."
      },
      {
        "title": "Como interpretar respostas e evitar erros de prova",
        "body": "**200 OK** indica processamento bem-sucedido com representação ou informações apropriadas. **201 Created** é comum quando foi criado um recurso. **204 No Content** sinaliza sucesso sem corpo de resposta. **400 Bad Request** indica problema na requisição; **401 Unauthorized** normalmente aponta ausência ou invalidez das credenciais necessárias; **403 Forbidden** indica que o servidor entendeu mas recusou executar; **404 Not Found** indica recurso não encontrado/representação não disponível.\n\nA banca gosta de misturar autorização com recursos: um usuário autenticado pode receber 403 por não ter permissão. Consulte [RFC 9110 — semântica HTTP](https://www.rfc-editor.org/rfc/rfc9110.html) para conceitos normativos."
      }
    ],
    "worked": {
      "title": "Uma operação DELETE repetida: o que aconteceu?",
      "body": "**Cenário:** um aplicativo envia DELETE /arquivos/5. O servidor devolve 204, removendo o arquivo. A rede falha antes de o aplicativo registrar a resposta, e a mesma requisição é reenviada; agora o servidor devolve 404.\n\n**Passo 1.** O efeito solicitado é remover a representação atual do recurso 5.\n\n**Passo 2.** Depois da primeira tentativa, ela não existe mais. A segunda deixa o recurso no mesmo estado de ausência.\n\n**Passo 3.** A diferença entre 204 e 404 é diferença de **resposta**, não diferença do efeito pretendido.\n\n**Conclusão:** DELETE continua sendo considerado **idempotente**. Não é seguro, porque pede alteração de estado."
    },
    "pitfalls": [
      "GET não deve ser usado para efetuar mudanças solicitadas pelo usuário, mesmo que seja simples implementar.",
      "PUT costuma tratar a representação do recurso-alvo; PATCH trata alterações parciais.",
      "Idempotência não garante duas respostas HTTP iguais.",
      "401 normalmente se relaciona às credenciais de autenticação; 403, à recusa de acesso apesar de compreender a solicitação."
    ],
    "review": [
      {
        "ask": "Qual método HTTP é seguro e idempotente?",
        "answer": "GET, pela semântica do protocolo."
      },
      {
        "ask": "DELETE repetido retorna 204 e depois 404. Perdeu idempotência?",
        "answer": "Não. O efeito pretendido de remoção continua o mesmo."
      },
      {
        "ask": "Qual a diferença usual entre PUT e PATCH?",
        "answer": "PUT expressa substituição/definição do estado do recurso; PATCH expressa alteração parcial."
      },
      {
        "ask": "Quando uma API normalmente retorna 403?",
        "answer": "Quando compreende a requisição, mas recusa executá-la, frequentemente por falta de autorização."
      }
    ]
  },
  "77": {
    "id": 77,
    "goal": "Negar afirmações com todo, algum e nenhum sem trocar indevidamente conectivos ou confundir um contraexemplo com o conjunto inteiro.",
    "steps": [
      {
        "title": "O que os quantificadores dizem",
        "body": "Considere duas frases: **'Todos os servidores têm backup'** e **'Algum servidor tem backup'**. A primeira afirma uma condição sobre cada elemento do conjunto considerado; a segunda afirma que existe pelo menos um elemento que atende à condição. Em lógica, usamos símbolos como **∀** (para todo) e **∃** (existe).\n\nQuantificadores trabalham sobre um **universo de discurso**. Em 'todos os técnicos possuem crachá', não estamos falando de todas as pessoas do mundo, mas das pessoas que pertencem ao conjunto dos técnicos do contexto. Definir esse universo evita interpretar mal a proposição."
      },
      {
        "title": "Negar todos é encontrar um contraexemplo",
        "body": "A negação de **'Todos os candidatos foram aprovados'** não é 'Nenhum candidato foi aprovado'. Basta que **um único candidato** não tenha sido aprovado para tornar a afirmação original falsa. Portanto, a negação correta é: **'Pelo menos um candidato não foi aprovado'**.\n\nFormalmente, a negação de ∀x P(x) é ∃x ¬P(x). Isso não significa afirmar que quase todos falharam. É suficiente encontrar **um** caso que viola a condição universal."
      },
      {
        "title": "Negar existe é afirmar nenhum",
        "body": "A frase **'Algum servidor está indisponível'** é verdadeira se pelo menos um servidor estiver indisponível. Sua negação precisa eliminar toda possibilidade: **'Nenhum servidor está indisponível'**, equivalente a 'Todos os servidores estão disponíveis'.\n\nEm símbolos, negar ∃x P(x) produz ∀x ¬P(x). Cuidado com 'alguns' em linguagem cotidiana: numa prova de lógica, quando usado como quantificador existencial, significa ao menos um e **não obriga que existam vários**.\n\n**Verificação rápida com três casos.** Se três técnicos estão no domínio e só dois utilizam MFA, a frase “Todos os técnicos do domínio utilizam MFA” é falsa mesmo que a maioria cumpra a regra: o terceiro técnico é um contraexemplo suficiente. Por outro lado, “Existe técnico do domínio sem MFA” é verdadeira nesse cenário. Para negar uma frase, não é necessário saber a porcentagem de pessoas que atende à condição; basta identificar qual situação torna a afirmação original falsa."
      },
      {
        "title": "Condicionais dentro de quantificadores",
        "body": "A frase **'Todo técnico que administra o AD possui acesso VPN'** combina uma condição ('administra o AD') com a consequência ('possui VPN'). A estrutura é: para cada técnico, **se administra o AD, então possui VPN**.\n\nPara negá-la, precisamos demonstrar **um técnico que administra o AD e não possui VPN**. Por isso o procedimento seguro é: 1) troque **todos** por **existe pelo menos um**; 2) mantenha a característica que define o grupo; 3) negue a propriedade exigida. A banca costuma errar ao negar também a característica de entrada."
      }
    ],
    "worked": {
      "title": "Negação de uma política interna",
      "body": "**Proposição original:** 'Todos os computadores que utilizam o sistema RIS estão no domínio.'\n\n**Passo 1 — Identifique o conjunto relevante.** Os computadores que utilizam o RIS.\n\n**Passo 2 — Observe a condição afirmada.** Estar no domínio. Para ser falsa, a afirmação precisa de pelo menos um contraexemplo.\n\n**Passo 3 — Formule o contraexemplo.** Existe computador que utiliza o RIS **e** não está no domínio.\n\n**Resultado:** 'Pelo menos um computador que utiliza o RIS não está no domínio'.\n\n**Por que a alternativa errada engana:** 'Nenhum computador que utiliza o RIS está no domínio' é muito mais forte; pode ser falsa mesmo quando a frase original também é falsa."
    },
    "pitfalls": [
      "Negação de 'todos' é 'pelo menos um não', e não 'nenhum'.",
      "Negação de 'existe um' é 'nenhum existe', não 'todos existem'.",
      "Em 'todo A é B', o contraexemplo pertence a A e não pertence a B.",
      "Quantificador 'algum' na lógica não exige pluralidade de elementos, salvo definição explícita diferente."
    ],
    "review": [
      {
        "ask": "Qual a negação de 'todos os candidatos passaram'?",
        "answer": "Pelo menos um candidato não passou."
      },
      {
        "ask": "Qual a negação de 'algum servidor está fora do ar'?",
        "answer": "Nenhum servidor está fora do ar."
      },
      {
        "ask": "Negar 'todo A é B' exige qual contraexemplo?",
        "answer": "Existe ao menos um elemento que é A e não é B."
      },
      {
        "ask": "O símbolo ∃ significa o quê?",
        "answer": "Existe pelo menos um elemento no universo considerado."
      }
    ]
  },
  "85": {
    "id": 85,
    "goal": "Identificar os principais direitos do titular da LGPD e responder solicitações sem prometer eliminação irrestrita de dados.",
    "steps": [
      {
        "title": "Quem é o titular e quem responde ao pedido",
        "body": "A **LGPD** protege informações relativas a pessoas naturais identificadas ou identificáveis. O **titular** é a pessoa a quem esses dados se referem. Uma organização que decide finalidades e meios essenciais de tratamento atua, conforme o contexto, como **controladora**. Um prestador que trata dados seguindo instruções pode atuar como **operador**.\n\nO artigo 18 estabelece direitos que o titular pode exercer em relação aos dados tratados pelo controlador. O objetivo é permitir que a pessoa conheça, corrija e controle aspectos do tratamento, dentro das condições previstas na lei. Pedidos devem ser registrados e encaminhados por fluxo responsável; não é adequado deixá-los sem resposta ou encaminhá-los indiscriminadamente a qualquer funcionário."
      },
      {
        "title": "Conheça os principais direitos pelo que pedem",
        "body": "**Confirmação de tratamento:** saber se a organização trata dados do titular. **Acesso:** obter informações sobre os dados tratados, nos termos aplicáveis. **Correção:** atualizar dados incompletos, inexatos ou desatualizados. **Anonimização, bloqueio ou eliminação:** quando os dados forem desnecessários, excessivos ou tratados em desconformidade com a lei.\n\nOutras hipóteses incluem **portabilidade**, nos limites da regulamentação; **informação sobre compartilhamentos**; e **revogação do consentimento**, quando essa for a base utilizada. O exercício de direitos exige avaliar a natureza do pedido e o fundamento legal específico, e não tratar todas as solicitações como simples exclusão de cadastro."
      },
      {
        "title": "Por que não é sempre possível apagar imediatamente",
        "body": "Imagine que um paciente solicita que todo o histórico de exames seja excluído no dia seguinte ao atendimento. Dados de saúde são **dados pessoais sensíveis**, mas a conclusão não é 'apagar tudo' nem 'nunca apagar'. É preciso verificar **qual base e finalidade sustentam o tratamento**, exigências de retenção e hipóteses legais aplicáveis.\n\nO direito de eliminação dos dados tratados com **consentimento** possui ressalvas, e o art. 16 prevê hipóteses de conservação. Uma obrigação legal de manutenção documental pode impedir a exclusão imediata de determinados registros. O correto é examinar cada conjunto de informações, justificar a decisão e informar o titular pelos canais adequados."
      },
      {
        "title": "Como resolver questões da banca sobre o art. 18",
        "body": "Em provas, busque os verbos do pedido: **'quero saber se armazenam dados meus' → confirmação**; **'quero ver os dados' → acesso**; **'meu nome está errado' → correção**; **'quero saber com quem compartilharam' → informação sobre compartilhamento**.\n\nDesconfie de respostas absolutas como 'a eliminação é sempre obrigatória e imediata' ou 'o órgão público nunca precisa atender o titular'. A LGPD prevê condições, hipóteses legais e direitos que precisam ser compatibilizados. Consulte a [redação atualizada da LGPD, arts. 17 e 18](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) para concursos que cobrem literalidade."
      }
    ],
    "worked": {
      "title": "Pedido de exclusão de dados em um serviço de saúde",
      "body": "**Situação:** uma paciente solicita a exclusão imediata de todos os dados relacionados a exames que realizou. O serviço possui dados cadastrais, registros clínicos e dados de contato utilizados em comunicações opcionais.\n\n**Passo 1 — Separe as finalidades.** O mesmo titular pode ter dados mantidos por finalidades e bases legais diferentes. Não trate todo o conjunto como se fosse um único cadastro.\n\n**Passo 2 — Examine a base e a retenção.** Verifique obrigações legais e eventuais hipóteses de conservação antes de decidir sobre os registros clínicos. Para informações usadas apenas em contato opcional, examine consentimento e sua revogação, se aplicável.\n\n**Passo 3 — Responda fundamentadamente.** O fluxo deve registrar o pedido e informar o atendimento integral, parcial ou a justificativa legal das restrições, conforme as regras pertinentes.\n\n**Conclusão:** a LGPD estabelece direitos do titular, mas **não transforma todo pedido de eliminação em apagamento incondicional**."
    },
    "pitfalls": [
      "Dados de saúde são sensíveis e exigem atenção às hipóteses legais específicas.",
      "Direito de acesso e direito de correção são direitos diferentes.",
      "Retenção exigida por lei pode restringir eliminação de parte dos dados; não autoriza retenção ilimitada de tudo.",
      "Consentimento não é a única hipótese legal de tratamento, especialmente em serviços de saúde e execução de políticas públicas."
    ],
    "review": [
      {
        "ask": "Quem é o titular dos dados pessoais?",
        "answer": "A pessoa natural a quem os dados se referem."
      },
      {
        "ask": "Qual direito permite corrigir informações desatualizadas?",
        "answer": "Direito de correção, art. 18 da LGPD."
      },
      {
        "ask": "O titular pode solicitar eliminação de todo dado em qualquer hipótese sem exceções?",
        "answer": "Não. É necessário avaliar base, finalidade e hipóteses legais de conservação, incluindo arts. 16 e 18."
      },
      {
        "ask": "Como classificar o pedido 'quero saber se a empresa trata dados meus'?",
        "answer": "Confirmação da existência de tratamento."
      }
    ]
  }
};
