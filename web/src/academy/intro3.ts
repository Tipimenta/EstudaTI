import type {PedagogicalLesson} from './intro1';
export const intro3:PedagogicalLesson[]=[
  {
    "id": 13,
    "title": "Modelagem relacional: chaves, relações e índices",
    "goal": "Transformar um problema em tabelas corretas e reconhecer redundância, relacionamentos e integridade.",
    "steps": [
      {
        "title": "Modele os fatos, não a tela",
        "body": "Antes de abrir um SGBD, identifique **entidades** (paciente, profissional, agendamento), **atributos** (nome, horário) e **relacionamentos** (paciente possui agendamentos). O modelo conceitual descreve o domínio; o modelo lógico relacional organiza tabelas e chaves. Não crie uma coluna para cada exame do paciente se ele pode ter quantidade variável: isso gera grupos repetitivos e torna consultas difíceis."
      },
      {
        "title": "Chave primária e estrangeira",
        "body": "**PRIMARY KEY (PK)** identifica unicamente uma linha e não aceita nulos. **FOREIGN KEY (FK)** vincula uma coluna a uma chave candidata/única válida em outra tabela. Uma FK pode aceitar NULL se sua coluna o permitir; não precisa ser única para cada linha. No relacionamento **1:N** entre paciente e agendamento, múltiplos agendamentos referenciam o mesmo paciente. No relacionamento **N:N** entre médico e especialidade, é comum criar tabela associativa medico_especialidade(medico_id,especialidade_id), com chave composta ou UNIQUE no par."
      },
      {
        "title": "Normalização evita incoerência",
        "body": "Imagine a tabela Exame(id, id_paciente, nome_paciente, data_exame). Se o nome muda, centenas de registros podem precisar de atualização. Isso cria risco de **anomalia de atualização**. A **1FN** exige atributos com valores atômicos conforme domínio e evita grupos repetitivos. A **2FN** elimina dependências parciais de atributos não-primos sobre partes de chaves candidatas compostas. A **3FN** evita dependências transitivas inadequadas de atributos não-chave. Em vez de decorar apenas números de formas normais, pergunte: **de que chave cada fato realmente depende?**"
      },
      {
        "title": "Índice não é restrição de negócio completa",
        "body": "Índices como **B-tree** podem melhorar filtros e ordenações, dependendo de seletividade, tamanho da tabela e plano. Consomem espaço e exigem manutenção nas escritas. **UNIQUE** pode ajudar a impedir pares duplicados, mas UNIQUE(profissional_id,inicio) não detecta sobreposição de horários quando inícios são diferentes. Regras como 'não permitir duas consultas sobrepostas' exigem modelagem de intervalos e mecanismo apropriado."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: agenda de exames",
      "body": "**1. Entidades:** paciente, profissional e agendamento.\n\n**2. Tabelas:** paciente(id PK,nome); profissional(id PK,nome); agendamento(id PK,paciente_id FK,profissional_id FK,inicio,fim,status).\n\n**3. Cardinalidade:** um paciente tem vários agendamentos; um agendamento aponta para um paciente. Um profissional participa de vários agendamentos.\n\n**4. Integridade:** paciente_id e profissional_id NOT NULL quando todo agendamento exige essas relações; CHECK(fim > inicio) para impedir duração negativa.\n\n**5. Questão de prova:** 'Uma FK sempre é UNIQUE?' Não. Em 1:N, a FK repete valores de pai em várias linhas filhas.\n\n**6. Limite:** CHECK(fim > inicio) não impede, sozinho, duas consultas simultâneas com horários sobrepostos."
    },
    "pitfalls": [
      "PK identifica uma linha; FK protege referência, não exige unicidade no lado filho.",
      "1:N normalmente usa FK no lado N; N:N normalmente usa tabela associativa.",
      "Normalização reduz redundância indevida, mas não significa 'uma tabela para cada palavra'.",
      "Índice não conserta relacionamento lógico mal modelado."
    ],
    "review": [
      {
        "ask": "Um estudante pode cursar várias disciplinas e cada disciplina ter vários estudantes. Qual estrutura é apropriada?",
        "answer": "Relacionamento N:N via tabela de matrícula com FKs para estudante e disciplina, além de restrição para evitar duplicatas."
      },
      {
        "ask": "Qual problema existe ao repetir nome_cliente em todos os pedidos?",
        "answer": "Redundância com anomalias de atualização: cópias do mesmo fato podem divergir."
      }
    ],
    "extra": "**Aprofundamento:** pesquise dependências funcionais e formas normais 2FN/3FN com chaves compostas; teste EXPLAIN em consultas SQL para compreender custo de índices, sem tratar todo plano como garantido."
  },
  {
    "id": 14,
    "title": "Requisitos, testes e versionamento: desenvolver com qualidade",
    "goal": "Distinguir o que o software faz, como deve se comportar e como provar que funciona.",
    "steps": [
      {
        "title": "Problema de negócio vira requisito verificável",
        "body": "Requisitos **funcionais** descrevem comportamentos: 'O sistema permite emitir segunda via de agendamento'. Requisitos **não funcionais** descrevem restrições e qualidades: desempenho, segurança, disponibilidade, acessibilidade, recuperação. 'O sistema deve ser rápido' é vago; '95% das consultas devem responder em até 2 segundos sob carga definida' é mais verificável. Bons requisitos deixam claros ator, condição, comportamento e resultado esperado."
      },
      {
        "title": "Histórias de usuário e critérios de aceite",
        "body": "Uma história de usuário típica diz: '**Como** recepcionista, **quero** buscar agendamentos por data, **para** organizar a fila'. Ela comunica intenção, mas não substitui critérios de aceite. Exemplo: ao selecionar data, listar somente agendamentos do dia; preservar filtros após paginação; informar quando não houver registros. Critérios permitem demonstrar comportamento de maneira objetiva e reduzem interpretações diferentes entre cliente e equipe."
      },
      {
        "title": "Testes em camadas",
        "body": "**Teste de unidade** verifica parte pequena da lógica, isolando dependências quando apropriado. **Integração** verifica a interação entre módulos, API e banco. **Sistema** observa o produto integrado; **aceitação** verifica adequação aos critérios acordados. Um teste unitário de cálculo pode passar e a aplicação real falhar porque o campo enviado pela API tem outro nome. Cobertura elevada de código não garante ausência de defeitos ou adequação ao requisito."
      },
      {
        "title": "Git e mudanças rastreáveis",
        "body": "**Commit** registra um conjunto de alterações; **branch** permite desenvolver uma linha de trabalho; **merge** integra históricos e pode exigir resolver conflitos. Uma boa mensagem descreve intenção da mudança. Revisão de código e testes automatizados em **CI** ajudam a detectar regressões antes da publicação. **CD** automatiza etapas de entrega/implantação conforme fluxo e aprovações; automação não significa dispensar critérios de segurança."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: novo botão para fechar exame",
      "body": "**Requisito funcional:** ao selecionar exame e confirmar, registrar fechamento no banco, identificando usuário e horário.\n\n**Critérios de aceite:** impedir fechamento duplicado; exigir perfil autorizado; mostrar confirmação; manter histórico de auditoria.\n\n**Teste de unidade:** valida regra 'não fechar exame já encerrado'.\n\n**Teste de integração:** confirma que API salva estado e evento no banco.\n\n**Teste de sistema:** executa o fluxo real no navegador.\n\n**Versionamento:** alteração em branch separada, revisão, testes na pipeline e merge somente após validação. Se a tela exibe sucesso mas o banco não muda, o teste de interface sozinho não basta."
    },
    "pitfalls": [
      "Funcional descreve comportamento; não funcional, atributos/restrições de qualidade.",
      "História de usuário sem critérios de aceite não prova resultado correto.",
      "Teste unitário não substitui teste de integração do fluxo real.",
      "CI detecta problemas cedo; não garante automaticamente software perfeito."
    ],
    "review": [
      {
        "ask": "'Busca deve responder em menos de 2 s para 95% das solicitações' é que tipo de requisito?",
        "answer": "Não funcional, de desempenho, com critério mensurável."
      },
      {
        "ask": "Se API e banco falham juntos, mas funções isoladas passam, qual classe de teste ajuda?",
        "answer": "Teste de integração/contrato entre os componentes."
      }
    ],
    "extra": "**Aprofundamento:** teste de regressão, integração contínua, versionamento semântico, trunk-based development, critérios INVEST e estratégias de teste baseadas em risco."
  },
  {
    "id": 15,
    "title": "API REST e HTTP: recursos, métodos e autorização",
    "goal": "Ler corretamente uma API HTTP e distinguir códigos, métodos, autenticação e idempotência.",
    "steps": [
      {
        "title": "O que a API expõe",
        "body": "Uma API oferece um **contrato** para outros sistemas consumirem funções e dados. Em interfaces HTTP de estilo REST, os endpoints costumam representar **recursos**: /pacientes, /pacientes/42, /agendamentos/15. Um cliente envia método, URL, cabeçalhos e opcionalmente corpo; o servidor responde com status, cabeçalhos e representação. REST descreve restrições arquiteturais, não simplesmente 'usar JSON por HTTP'."
      },
      {
        "title": "Métodos e o que eles pretendem fazer",
        "body": "**GET** consulta recurso e é considerado método seguro (não se espera alteração intencional de estado). **POST** costuma criar recurso ou executar operação. **PUT** substitui/define representação e é semanticamente **idempotente**: repetir mesma solicitação deve ter o mesmo efeito pretendido. **PATCH** modifica parcialmente e **não é necessariamente idempotente**; depende da semântica da atualização. **DELETE** é idempotente quanto ao efeito pretendido, ainda que respostas a repetições possam diferir."
      },
      {
        "title": "Como interpretar os principais status",
        "body": "**200 OK** indica sucesso com resposta; **201 Created** indica criação; **204 No Content** sucesso sem corpo. **400 Bad Request** refere-se a requisição inválida; **401 Unauthorized** indica necessidade/problema de autenticação; **403 Forbidden** significa acesso negado; **404 Not Found** recurso não encontrado; **409 Conflict** conflito com estado; **500 Internal Server Error** falha do lado servidor; **503 Service Unavailable** serviço indisponível naquele momento. Status indica classe do problema, não a causa única."
      },
      {
        "title": "Autenticação, autorização e repetição",
        "body": "Uma API pode usar sessão, token ou outras credenciais. **Autenticação** confirma identidade; **autorização** decide acesso à operação ou ao recurso. **Rate limiting** e validação de entradas protegem recursos, enquanto consultas parametrizadas reduzem injeção de SQL. Um POST de criação repetido após timeout pode gerar duplicatas; quando adequado, uma **chave de idempotência** pode ajudar a deduplicar solicitações."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: criar agendamento com segurança",
      "body": "**1. Cliente solicita:** POST /agendamentos com paciente_id, data e profissional_id.\n\n**2. Servidor autentica e autoriza:** o usuário tem permissão para agendar?\n\n**3. Validação:** data válida? profissional livre? paciente existente?\n\n**4. Transação:** registra agendamento sob as restrições necessárias; se houver conflito com regra de agenda, retorna resposta apropriada como **409**.\n\n**5. Sucesso:** um recurso criado normalmente pode retornar **201 Created** com identificador ou Location.\n\n**6. Falha de rede:** se o cliente não recebeu resposta, não assuma que nada foi gravado. Use verificação de estado ou chave de idempotência para evitar pedido duplicado."
    },
    "pitfalls": [
      "Uma API que usa JSON não vira REST automaticamente.",
      "GET é seguro; PUT e DELETE são idempotentes semanticamente; PATCH não necessariamente.",
      "401 está ligado à autenticação; 403, à proibição da ação/recurso.",
      "Status 503 aponta indisponibilidade, não necessariamente erro de DNS."
    ],
    "review": [
      {
        "ask": "Uma API respondeu 403 após o usuário autenticar-se. O que isso sugere?",
        "answer": "Acesso negado por autorização/política para a operação ou recurso, embora a identidade possa ter sido validada."
      },
      {
        "ask": "Qual método é semanticamente idempotente e geralmente define/substitui recurso?",
        "answer": "PUT; repeti-lo com mesma intenção deve produzir o mesmo efeito pretendido."
      }
    ],
    "extra": "**Aprofundamento:** leia as semânticas HTTP em RFC 9110, estude ETag e controle de concorrência, OpenAPI, paginação, códigos problem+json e autenticação baseada em sessão ou token. Fonte: https://www.rfc-editor.org/rfc/rfc9110.html."
  },
  {
    "id": 16,
    "title": "Raciocínio lógico: proposições, conectivos e implicação",
    "goal": "Traduzir frases em proposições e decidir valor lógico usando conectivos e equivalências.",
    "steps": [
      {
        "title": "Quando uma frase é proposição",
        "body": "Uma **proposição** é uma sentença declarativa à qual é possível atribuir valor verdadeiro ou falso. 'O servidor está ligado' pode ser proposição; 'Desligue o servidor!' é uma ordem, não proposição com valor de verdade usual. Letras como **P** e **Q** representam proposições. Uma frase composta usa conectivos: **¬P** (não), **P∧Q** (e), **P∨Q** (ou inclusivo) e **P→Q** (se P, então Q)."
      },
      {
        "title": "Entenda os conectivos com casos",
        "body": "**E** é verdadeiro somente quando ambas são verdadeiras. **Ou inclusivo** é verdadeiro quando pelo menos uma é verdadeira, inclusive as duas. **Não** inverte valor. **Condicional P→Q** só é falsa quando P é verdadeira e Q falsa. Por exemplo: 'Se a senha está correta, então o acesso é liberado' é contraditada por um caso com senha correta e acesso não liberado. Quando a senha está errada, a condicional lógica não é automaticamente falsa: ela não impôs condição sobre esse caso."
      },
      {
        "title": "A contrapositiva é a equivalência mais útil",
        "body": "**P→Q** equivale a **¬Q→¬P**. Exemplo: 'Se há acesso autorizado, então existe credencial válida' equivale a 'Se não existe credencial válida, então não há acesso autorizado' — como forma lógica, assumidas as proposições. Não confunda com a **recíproca Q→P**, que pode ser falsa. A negação da condicional é **P∧¬Q**: acontece o antecedente e não acontece o consequente."
      },
      {
        "title": "O que as bancas tentam trocar",
        "body": "Os itens frequentemente substituem **e** por **ou**, invertem termos da implicação ou confundem 'não são todos' com 'nenhum'. Para quantificadores, negar '**todos**' resulta '**existe pelo menos um que não**'; negar '**existe alguém que**' resulta '**ninguém**' ou '**todos não**', conforme predicado. Não memorize uma frase sem relacioná-la ao valor lógico."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: verificar a condicional",
      "body": "**Proposição:** 'Se P (o servidor está online), então Q (o painel abre)'.\n\n**Caso 1:** P=V, Q=V → condicional **V**.\n\n**Caso 2:** P=V, Q=F → condicional **F**. É o único contraexemplo.\n\n**Caso 3:** P=F, Q=V → condicional **V**, na lógica proposicional clássica.\n\n**Caso 4:** P=F, Q=F → condicional **V**.\n\n**Contrapositiva:** 'Se o painel não abre, então o servidor não está online' = ¬Q→¬P.\n\n**Negação:** 'Servidor online E painel não abre' = P∧¬Q. Compare os quatro casos antes de decorar equivalência."
    },
    "pitfalls": [
      "P→Q é falsa apenas com P verdadeiro e Q falso.",
      "Contrapositiva ¬Q→¬P é equivalente à original; recíproca Q→P não é necessariamente.",
      "Ou lógico inclusivo aceita as duas proposições verdadeiras.",
      "Negação de 'todos' é 'ao menos um não', não necessariamente 'nenhum'."
    ],
    "review": [
      {
        "ask": "A implicação P→Q é falsa quando?",
        "answer": "Somente quando P é verdadeira e Q falsa."
      },
      {
        "ask": "Qual a negação de 'Todos os candidatos entregaram documentos'?",
        "answer": "Pelo menos um candidato não entregou documentos."
      }
    ],
    "extra": "**Aprofundamento:** pratique equivalências de De Morgan: ¬(P∧Q) ≡ ¬P∨¬Q e ¬(P∨Q) ≡ ¬P∧¬Q. Use tabelas-verdade para verificar cada equivalência em vez de decorar resultados."
  },
  {
    "id": 17,
    "title": "LGPD: princípios, bases legais e responsabilidades",
    "goal": "Distinguir dados pessoais e sensíveis, identificar papéis e aplicar princípios sem confundir LGPD com consentimento obrigatório.",
    "steps": [
      {
        "title": "Qual dado e qual tratamento?",
        "body": "A **LGPD (Lei 13.709/2018)** protege o tratamento de dados pessoais em situações abrangidas por sua aplicação. **Dado pessoal** relaciona-se a pessoa natural identificada ou identificável. **Dado pessoal sensível** inclui informações de saúde, biométricas vinculadas a pessoa natural e outras categorias legais. **Tratamento** é amplo: coleta, consulta, compartilhamento, armazenamento, eliminação etc. Uma imagem médica associada a paciente exige cuidados específicos quanto a finalidade, necessidade, segurança e acesso."
      },
      {
        "title": "Papéis: controlador, operador e titular",
        "body": "**Titular** é a pessoa natural a quem os dados se referem. **Controlador** toma decisões referentes ao tratamento; **operador** trata em nome do controlador, conforme operações e instruções. O papel depende de quem decide finalidades e meios essenciais, não do cargo declarado num contrato. O **encarregado** atua como canal de comunicação nos termos da lei e orientações aplicáveis. Prestadores podem ter responsabilidades diferentes conforme o tratamento concreto."
      },
      {
        "title": "Princípios organizam a decisão",
        "body": "A LGPD contempla, entre outros, **finalidade** (propósito legítimo e informado), **adequação** (compatibilidade com finalidade), **necessidade** (limitar ao mínimo pertinente), **transparência**, **segurança**, **prevenção** e **responsabilização**. Exemplo: exigir CPF, nome, histórico médico integral e biometria para emitir comprovante simples pode contrariar necessidade, dependendo da base e da finalidade. Uma política sem execução e evidência não comprova atendimento ao princípio."
      },
      {
        "title": "Bases legais não se resumem a consentimento",
        "body": "A lei prevê **diversas hipóteses legais** para tratar dados, e o enquadramento depende do objetivo, da condição do agente e da categoria de dado. Dados sensíveis seguem regras específicas. **Consentimento** não é solução automática nem sempre é a base adequada, sobretudo quando há obrigação legal ou prestação de serviços públicos sob competência prevista. Anote a base pertinente, finalidade, dados estritamente necessários e mecanismo para exercício dos direitos cabíveis."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: clínica recebe resultado de exame",
      "body": "**1. Dados:** identificação do paciente e informação de saúde; parte é sensível.\n\n**2. Finalidade:** disponibilizar resultado ao paciente ou a destinatário legitimamente autorizado.\n\n**3. Necessidade:** acessar apenas dados necessários para identificação e entrega.\n\n**4. Papéis:** mapear quem decide finalidade/operacionaliza serviço, inclusive fornecedores de software e armazenamento.\n\n**5. Segurança:** autenticação, autorização por perfil, logs proporcionais, controle de compartilhamento e gestão de incidentes.\n\n**6. Documentação:** registrar finalidade, base legal pertinente e medidas adotadas. Não conclua que 'o paciente assinou consentimento' dispensa os demais princípios e controles."
    },
    "pitfalls": [
      "Consentimento não é a única base legal de tratamento.",
      "Dado de saúde é sensível e demanda análise das hipóteses legais específicas.",
      "Controlador decide sobre tratamento; operador age em nome do controlador conforme atividades.",
      "Transparência não significa publicar dados pessoais irrestritamente."
    ],
    "review": [
      {
        "ask": "Uma organização armazena todo histórico médico apenas para emitir lembrete de consulta. Qual princípio merece atenção?",
        "answer": "Necessidade: limitar os dados ao mínimo pertinente e proporcional à finalidade."
      },
      {
        "ask": "A LGPD sempre exige consentimento?",
        "answer": "Não. Existem outras bases legais, com regras e requisitos que dependem da categoria de dado e contexto."
      }
    ],
    "extra": "**Aprofundamento e verificação:** consulte a redação atualizada da Lei 13.709/2018 e orientações da ANPD sobre agentes de tratamento e pequenas empresas. Não trate exemplos didáticos como parecer jurídico. Fonte: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm."
  },
  {
    "id": 18,
    "title": "Lei 14.133/2021: planejar e fiscalizar contratações de TI",
    "goal": "Entender necessidade, planejamento, ETP, TR, critérios de seleção e fiscalização sem decorar nomes isolados.",
    "steps": [
      {
        "title": "Contratação pública começa por necessidade",
        "body": "A **Lei 14.133/2021** estabelece normas gerais de licitação e contratação para os entes abrangidos. Uma contratação adequada não começa pela marca de um sistema: primeiro identifica-se problema, resultado esperado, restrições, alternativas e justificativa da solução. Em TI, requisitos de segurança, interoperabilidade, disponibilidade, suporte e proteção de dados precisam ser considerados conforme o objeto e as normas específicas aplicáveis ao órgão."
      },
      {
        "title": "ETP e TR têm funções diferentes",
        "body": "O **Estudo Técnico Preliminar (ETP)** busca caracterizar necessidade, alternativas e elementos que sustentem a viabilidade e a escolha da solução, quando aplicável. O **Termo de Referência (TR)** especifica o objeto e condições de contratação: definição, execução, gestão, medição, pagamento, estimativas e seleção, conforme hipóteses legais. Confundir ETP e TR é comum em provas: um estuda e justifica a solução; outro detalha a contratação em parâmetros executáveis, sem eliminar as exigências de planejamento."
      },
      {
        "title": "Modalidade, julgamento e objeto",
        "body": "A Lei 14.133 apresenta modalidades como **pregão**, **concorrência**, **concurso**, **leilão** e **diálogo competitivo**, com condições específicas. **Pregão** é associado a bens e serviços comuns, conforme enquadramento legal. Modalidade não é o mesmo que **critério de julgamento** (por exemplo, menor preço ou técnica e preço, nas condições legais). Para TI, avalie se a descrição do serviço permite padrões de desempenho e qualidade objetivamente definidos; não suponha que qualquer contratação de software é automaticamente de uma modalidade específica."
      },
      {
        "title": "Fiscalização acompanha entrega e resultado",
        "body": "Depois de contratar, deve haver acompanhamento da execução conforme contratos e deveres legais. Fiscalização documenta ocorrências, conformidade com níveis de serviço, entregas, falhas e medidas cabíveis. Exemplo: um contrato de suporte prevê atendimento em tempo determinado; não basta atestar nota fiscal sem verificar evidências da execução. A responsabilidade e a formalização dependem de designações e regras aplicáveis."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: contratar sistema de agendamento",
      "body": "**1. Problema:** filas elevadas e dificuldade de confirmar agendamentos.\n\n**2. ETP:** estudar necessidades, soluções disponíveis (implantação, adaptação, integrações), viabilidade, riscos e justificativa da opção.\n\n**3. TR:** especificar escopo, integrações, perfis, proteção de dados, disponibilidade, indicadores, testes de aceite, suporte e critérios de medição.\n\n**4. Seleção:** aplicar modalidade e critério adequados ao objeto e às regras vigentes, sem pré-definir marca injustificadamente.\n\n**5. Execução:** registrar entregas, inconformidades, testes e níveis de serviço.\n\n**6. Avaliação:** comparar resultado alcançado à necessidade original. Uma contratação 'assinada' não equivale a problema público resolvido."
    },
    "pitfalls": [
      "ETP e TR não são nomes intercambiáveis.",
      "Modalidade de licitação difere de critério de julgamento.",
      "Planejamento não é mera escolha da solução preferida antes de estudar necessidade.",
      "Fiscalização contratual requer evidência de execução; pagamento não substitui acompanhamento."
    ],
    "review": [
      {
        "ask": "Qual documento geralmente examina alternativas e viabilidade antes da especificação final?",
        "answer": "Estudo Técnico Preliminar, conforme hipóteses e regras aplicáveis."
      },
      {
        "ask": "A modalidade pregão se associa tipicamente a que tipo de objeto?",
        "answer": "Bens e serviços comuns nas condições previstas em lei."
      }
    ],
    "extra": "**Aprofundamento e verificação:** confira a redação vigente da Lei 14.133/2021 e normativos específicos do ente contratante; regras de planejamento e documentos podem ter particularidades. Fonte: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm."
  }
];
