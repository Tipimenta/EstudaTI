import type {PedagogicalLesson} from './intro1'
export const rewrittenIntegration:Record<number,Partial<PedagogicalLesson>>={
  "72": {
    "id": 72,
    "goal": "Separar autenticação de autorização e interpretar cookies, tokens e status de acesso em APIs.",
    "steps": [
      {
        "title": "Dois controles para perguntas diferentes",
        "body": "Uma aplicação de agendamento identifica a pessoa que está entrando e decide quais informações ela pode acessar. A primeira pergunta é **quem é você?** — tarefa da **autenticação**. A segunda é **você tem permissão para realizar esta ação neste recurso?** — tarefa da **autorização**. O mesmo usuário pode autenticar corretamente e receber acesso negado a registros de outro setor.\n\nA banca costuma descrever uma sessão válida que não consegue abrir uma rota administrativa: se as credenciais foram aceitas, não conclua automaticamente que 'a autenticação falhou'. O problema pode ser uma decisão legítima de autorização."
      },
      {
        "title": "Sessões, cookies e tokens não substituem segurança",
        "body": "Uma aplicação web pode guardar um identificador de sessão num **cookie**; o servidor associa esse identificador à sessão autenticada. O atributo **HttpOnly** dificulta acesso ao cookie por scripts JavaScript na página; **Secure** restringe seu envio a conexões seguras; **SameSite** influencia quando ele é enviado em contextos entre sites. Cada atributo protege contra riscos específicos, mas nenhum deles sozinho torna a aplicação invulnerável.\n\nUm **JWT** é um formato estruturado de token. Ele pode carregar declarações e ser assinado, mas assinatura não significa criptografia do conteúdo. Seu uso exige validação de assinatura, emissor, audiência, expiração e demais critérios do projeto. Um token válido não deve autorizar qualquer operação."
      },
      {
        "title": "O que 401 e 403 comunicam",
        "body": "Na semântica HTTP, **401 Unauthorized** está ligado à necessidade de autenticação válida para a requisição. Em muitas APIs, aparece quando credenciais faltam ou são inválidas. **403 Forbidden** significa que o servidor entendeu o pedido, mas recusa executá-lo, inclusive quando o usuário está autenticado e não tem o privilégio exigido.\n\nExemplo: um médico autenticado tenta consultar um relatório administrativo restrito aos gestores e recebe 403. O servidor reconhece a identidade, mas nega a autorização. Se não houver sessão ou credencial válida para entrar na área, 401 pode ser apropriado conforme o mecanismo de autenticação."
      },
      {
        "title": "Como prevenir a falha 'usuário A abre recurso de B'",
        "body": "A checagem de permissões deve ser feita **no servidor e para cada recurso protegido**. Não basta esconder botões na interface. Uma API precisa verificar se o usuário pode executar a ação sobre aquele registro específico, evitando que a troca de um ID na URL exponha dados de outra pessoa.\n\nNa revisão de código, se uma rota retorna qualquer prontuário por número sem verificar a relação do usuário com o registro, o risco é de **autorização quebrada**, não apenas de 'interface com botão visível'."
      }
    ],
    "worked": {
      "title": "Autenticação passou, autorização falhou",
      "body": "**Cenário:** um colaborador acessa o sistema com usuário e senha corretos. Ele tenta GET /relatorios/financeiro e recebe HTTP 403.\n\n**Passo 1.** A autenticação já ocorreu; o sistema identificou o usuário.\n\n**Passo 2.** A operação requer permissão de relatório financeiro, não concedida ao colaborador.\n\n**Passo 3.** A resposta 403 expressa a recusa de acesso. Não seria adequado liberar o relatório apenas porque existe sessão válida.\n\n**Conclusão:** autenticação e autorização são controles complementares e independentes. Um login bem-sucedido não é carta branca para consultar qualquer dado."
    },
    "pitfalls": [
      "HttpOnly limita leitura do cookie por JavaScript, mas não resolve todos os ataques de sessão.",
      "JWT assinado não é necessariamente criptografado.",
      "Ocultar um botão na interface não substitui controle de permissão na API.",
      "401 costuma indicar autenticação necessária/inválida; 403, recusa de acesso a uma solicitação entendida."
    ],
    "review": [
      {
        "ask": "Qual diferença entre autenticação e autorização?",
        "answer": "Autenticação verifica identidade; autorização verifica permissão para o recurso e a ação."
      },
      {
        "ask": "Qual atributo impede leitura comum de cookie por JavaScript?",
        "answer": "HttpOnly."
      },
      {
        "ask": "JWT assinado é sempre sigiloso?",
        "answer": "Não. Assinatura protege integridade/autenticidade, não oculta automaticamente o payload."
      },
      {
        "ask": "Usuário logado recebe 403 ao acessar recurso restrito. Qual controle está atuando?",
        "answer": "Autorização."
      }
    ]
  },
  "80": {
    "id": 80,
    "goal": "Resolver problemas de conjuntos com a fórmula de inclusão-exclusão e identificar interseção, união e complemento sem contagem dupla.",
    "steps": [
      {
        "title": "Um mesmo estudante pode pertencer a dois grupos",
        "body": "Imagine 40 candidatos a concursos: 24 estudam Redes, 19 estudam Banco de Dados e alguns estudam ambas as matérias. Se somarmos 24 + 19, podemos contar uma mesma pessoa duas vezes. Para entender essa sobreposição, usamos **conjuntos**.\n\nA **união A ∪ B** reúne quem pertence a pelo menos um dos conjuntos. A **interseção A ∩ B** reúne quem pertence aos dois. A **diferença A − B** contém os elementos que pertencem a A, mas não a B. Cada expressão corresponde a uma pergunta diferente."
      },
      {
        "title": "Por que a fórmula subtrai a interseção",
        "body": "Suponha que 7 candidatos estudem as duas matérias. Ao somar |A| + |B|, essas 7 pessoas aparecem uma vez na contagem de Redes e outra em Banco de Dados. Para corrigir a contagem dupla, subtraímos exatamente uma ocorrência: **|A ∪ B| = |A| + |B| − |A ∩ B|**.\n\nCom 24, 19 e 7, temos 24 + 19 − 7 = **36** candidatos que estudam pelo menos uma das duas. Não se subtrai a interseção duas vezes: ela foi contada duas vezes na soma, e deve permanecer contada uma vez na união."
      },
      {
        "title": "Como descobrir somente A, somente B e nenhum",
        "body": "Se 24 estudam Redes e 7 também estudam Banco, então **somente Redes = 24 − 7 = 17**. Se 19 estudam Banco e 7 estudam Redes, **somente Banco = 19 − 7 = 12**. O total que estuda as duas é 7. Somando os grupos separados, 17 + 7 + 12 = 36, o mesmo resultado da fórmula.\n\nSe o universo contém 40 pessoas, **nenhuma das duas = 40 − 36 = 4**. O complemento exige conhecer o universo total; sem essa informação, não podemos calcular quantos estão fora de ambos.\n\n**Faça uma checagem por regiões.** Em um diagrama de Venn de dois conjuntos, há quatro regiões possíveis no universo: só A, só B, A e B, e nenhuma delas. A soma das quatro regiões deve coincidir com o número total de elementos do universo. Isso permite verificar se uma solução está coerente sem confiar apenas na fórmula. Se o total não fechar, procure um elemento contado duas vezes ou esquecido no complemento. Na expressão “pelo menos uma”, inclua a região de interseção; na expressão “exatamente uma”, exclua-a."
      },
      {
        "title": "Palavras que mudam a operação",
        "body": "Em provas, **'ao menos uma'**, **'uma ou outra'** e **'A ou B'** costumam apontar para **união**, entendendo o OU inclusivo. **'Ambas'** aponta para interseção. **'Apenas A'** requer retirar de A a parte comum. **'Nenhuma'** é o complemento da união no universo informado.\n\nLeia cuidadosamente o enunciado: alguns problemas utilizam 'ou' em sentido exclusivo e avisam que não podem ocorrer simultaneamente; nesse caso, a lógica muda. O seguro é identificar se a pergunta aceita elementos na interseção."
      }
    ],
    "worked": {
      "title": "Distribua candidatos em três regiões",
      "body": "**Dados:** 50 candidatos; 30 estudam Português (P); 26 estudam Lógica (L); 12 estudam ambas.\n\n**Passo 1.** Interseção P ∩ L = 12. Comece pela região comum para não duplicá-la.\n\n**Passo 2.** Apenas Português = 30 − 12 = **18**. Apenas Lógica = 26 − 12 = **14**.\n\n**Passo 3.** Pelo menos uma = 18 + 12 + 14 = **44**, equivalente a 30 + 26 − 12.\n\n**Passo 4.** Nenhuma = 50 − 44 = **6**.\n\n**Conclusão:** a conta é consequência das regiões do diagrama, não uma fórmula decorada sem interpretação."
    },
    "pitfalls": [
      "Somar |A| + |B| sem descontar a interseção conta elementos repetidos.",
      "'Somente A' é |A| − |A∩B|, não apenas |A|.",
      "Para achar 'nenhum', é necessário conhecer o universo.",
      "No sentido inclusivo, 'A ou B' admite quem está em A e B."
    ],
    "review": [
      {
        "ask": "Qual é a fórmula da inclusão-exclusão para dois conjuntos?",
        "answer": "|A∪B| = |A| + |B| − |A∩B|."
      },
      {
        "ask": "Se A tem 24 e a interseção tem 7, quantos estão apenas em A?",
        "answer": "17 elementos."
      },
      {
        "ask": "O que significa 'pelo menos uma das matérias'?",
        "answer": "A união dos conjuntos de estudantes das matérias."
      },
      {
        "ask": "Se o universo tem 50 e a união tem 44, quantos não pertencem a nenhum dos conjuntos?",
        "answer": "6 elementos."
      }
    ]
  },
  "86": {
    "id": 86,
    "goal": "Compreender a sequência de uma licitação na Lei 14.133 e os documentos de planejamento, sem confundir ETP, TR e fases do certame.",
    "steps": [
      {
        "title": "Antes de comprar, defina a necessidade pública",
        "body": "Um órgão deseja contratar um sistema para atendimento ao cidadão. A primeira tarefa não deveria ser escolher a marca do programa, mas entender **qual problema precisa ser resolvido**, quais requisitos são necessários, quais riscos existem e se a solução é viável. A **Lei 14.133/2021** reforça a importância do planejamento na contratação pública.\n\nO **Estudo Técnico Preliminar (ETP)** caracteriza a necessidade, considera alternativas e fundamenta decisões sobre a solução. O **Termo de Referência (TR)** especifica o objeto e condições de contratação conforme a hipótese aplicável. Eles têm funções relacionadas, mas não são documentos idênticos."
      },
      {
        "title": "O que acontece na fase preparatória",
        "body": "A fase preparatória envolve, conforme o caso, descrição da necessidade, definição do objeto, estimativa de custos, condições de execução e pagamento, justificativas e outros elementos técnicos, de mercado e de gestão. Em TI, é importante transformar necessidades em **requisitos verificáveis**, como capacidade de atendimento, interoperabilidade, disponibilidade e suporte.\n\nUm TR que apenas diz 'sistema moderno e eficiente' deixa margem excessiva a interpretações. A descrição 'o sistema deverá registrar data, hora e usuário responsável por cada alteração' é mais verificável. Bons requisitos ajudam tanto a seleção quanto a futura fiscalização do contrato."
      },
      {
        "title": "As fases do processo na ordem geral",
        "body": "O art. 17 estabelece, como sequência geral: **preparatória → divulgação do edital → apresentação de propostas e lances, quando aplicável → julgamento → habilitação → recursal → homologação**.\n\nA banca costuma tentar trocar **julgamento** por **habilitação**. Na sequência geral da Lei 14.133, o julgamento vem primeiro. A própria lei admite antecipação da habilitação em condições motivadas previstas no edital. Portanto, evite alternativas que afirmam que a ordem jamais poderá ser modificada sob nenhuma circunstância."
      },
      {
        "title": "Planejamento é diferente de fiscalização contratual",
        "body": "Depois da seleção e contratação, a Administração precisa acompanhar a execução conforme os instrumentos pactuados. Se a contratação prevê backup, disponibilidade e suporte, a fiscalização deve exigir evidências e verificar critérios de aceite. Uma nota fiscal não demonstra, por si, que todos os requisitos técnicos foram atendidos.\n\nEsse raciocínio ajuda a diferenciar **ETP** (compreender necessidade/alternativas), **TR** (detalhar o objeto e condições) e **fiscalização** (acompanhar execução). Para literalidade, consulte [Lei 14.133, arts. 17 e 18](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)."
      }
    ],
    "worked": {
      "title": "Compra de suporte de TI: qual documento primeiro?",
      "body": "**Cenário:** um órgão relata indisponibilidade frequente de suporte remoto. A equipe propõe contratar um serviço, mas ainda não definiu quantidade de usuários atendidos, horários, tempos de resposta ou critério de aceite.\n\n**Passo 1.** Na fase preparatória, caracterize o problema e avalie alternativas por meio do **ETP**, conforme a exigência legal aplicável.\n\n**Passo 2.** Defina o objeto e os requisitos verificáveis no documento adequado, frequentemente o **TR**. Exemplos: horários de cobertura, SLA, ferramenta de abertura de chamados e indicadores.\n\n**Passo 3.** Depois da seleção e contratação, a fiscalização deve comparar execução real e compromissos documentados.\n\n**Conclusão:** planejar, especificar e fiscalizar são atividades encadeadas, mas de finalidades distintas."
    },
    "pitfalls": [
      "ETP e TR não são sinônimos: um fundamenta a solução, o outro detalha o objeto e requisitos, conforme a contratação.",
      "A sequência geral do art. 17 posiciona julgamento antes de habilitação, com possibilidade legal de inversão motivada e prevista no edital.",
      "Requisito subjetivo como 'software excelente' dificulta verificação e aceite.",
      "A nota fiscal não substitui evidência de cumprimento de níveis de serviço contratados."
    ],
    "review": [
      {
        "ask": "Qual é o objetivo geral do ETP?",
        "answer": "Caracterizar a necessidade pública e fundamentar a solução e sua viabilidade."
      },
      {
        "ask": "Qual documento costuma especificar objeto e requisitos de contratação?",
        "answer": "Termo de Referência, nas hipóteses cabíveis."
      },
      {
        "ask": "Na ordem geral da Lei 14.133, o julgamento vem antes de qual fase?",
        "answer": "Antes da habilitação, ressalvadas exceções legais de inversão."
      },
      {
        "ask": "Receber nota fiscal basta para atestar SLA de suporte?",
        "answer": "Não. É necessário conferir execução e evidências conforme as condições contratuais."
      }
    ]
  }
};
