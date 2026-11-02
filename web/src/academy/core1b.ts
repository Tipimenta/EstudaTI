import type {PedagogicalLesson} from './intro1';
export const core1b:PedagogicalLesson[]=[
  {
    "id": 59,
    "title": "SQL SELECT: filtros, ordenação e NULL",
    "goal": "Ler SELECT, WHERE e ORDER BY, filtrar com operadores e evitar erros envolvendo valores nulos.",
    "steps": [
      {
        "title": "Formule a pergunta antes da consulta",
        "body": "Considere a tabela **atendimentos(id, paciente, data, setor, status)**. Uma consulta pode responder 'quais atendimentos estão pendentes?' ou 'quais ocorreram hoje?'. **SELECT** escolhe colunas; **FROM** aponta origem; **WHERE** filtra linhas por condição; **ORDER BY** ordena o resultado. Colunas específicas são preferíveis a SELECT * quando o contrato do sistema exige um conjunto definido."
      },
      {
        "title": "WHERE, comparações e precedência",
        "body": "Condições usam operadores como =, <, >, BETWEEN, IN e LIKE. Combine **AND** e **OR** com parênteses para deixar intenção clara. Em SQL, **AND tem precedência sobre OR**. A expressão status='pendente' OR status='aguardando' AND setor='US' significa 'pendente em qualquer setor OU aguardando em US', não 'ambos os status apenas em US'. Para este último propósito, inclua parênteses ao redor do OR."
      },
      {
        "title": "NULL não é zero nem vazio",
        "body": "**NULL** representa ausência ou desconhecimento de valor na modelagem SQL. Comparar **coluna = NULL** não testa nulo da forma desejada; use **IS NULL** e **IS NOT NULL**. A lógica SQL pode resultar em **UNKNOWN**, que não é TRUE nem FALSE. Em filtros WHERE, linhas cuja condição não é TRUE são descartadas. Isso explica por que 'coluna <> 5' não inclui automaticamente linhas com NULL."
      },
      {
        "title": "Ordenação precisa ser explícita",
        "body": "Sem **ORDER BY**, não há garantia de ordem estável das linhas. **ASC** ordena crescente (padrão em vários usos); **DESC** decrescente. Para paginação consistente, use critério que resolva empates, por exemplo ORDER BY data DESC, id DESC. Tenha atenção a tipos: data armazenada como texto não padronizado pode ordenar diferente de um tipo temporal apropriado."
      }
    ],
    "worked": {
      "title": "Exemplo: pacientes aguardando, do mais antigo ao mais recente",
      "body": "**Pergunta:** quais atendimentos com status pendente, no setor US, estão mais antigos?\n\n**Consulta:**\n\nSELECT id, paciente, data FROM atendimentos WHERE setor = 'US' AND status = 'pendente' ORDER BY data ASC, id ASC;\n\n**Análise:** WHERE reduz as linhas, SELECT escolhe o que mostrar, ORDER BY coloca datas antigas primeiro. Id é critério adicional para desempate.\n\n**Variação:** para identificar registros sem data de retorno, use **WHERE data_retorno IS NULL**. Escrever data_retorno = NULL é erro clássico."
    },
    "pitfalls": [
      "WHERE filtra registros antes de agregações; HAVING será usado para grupos.",
      "NULL não é igual a string vazia ou zero.",
      "Sem ORDER BY, não confie na ordem dos resultados.",
      "AND e OR podem produzir filtros diferentes sem parênteses."
    ],
    "review": [
      {
        "ask": "Como selecionar apenas registros cujo telefone não foi informado?",
        "answer": "WHERE telefone IS NULL, não WHERE telefone = NULL."
      },
      {
        "ask": "O que faz ORDER BY data DESC, id DESC?",
        "answer": "Ordena por data decrescente; empates por id também decrescente."
      }
    ],
    "extra": "**Avançado:** explore funções COALESCE, filtros SARGable e impactos de usar função na coluna indexada. Consulte documentação PostgreSQL em https://www.postgresql.org/docs/current/queries.html."
  },
  {
    "id": 67,
    "title": "Requisitos funcionais e não funcionais: escrever para testar",
    "goal": "Converter expectativas vagas em critérios de aceitação e distinguir comportamento de atributo de qualidade.",
    "steps": [
      {
        "title": "Do pedido informal ao requisito",
        "body": "'Quero um sistema de agendamento fácil e rápido' contém objetivos, mas ainda não define comportamento testável. **Requisito funcional** especifica ações/serviços: pesquisar paciente, reservar horário, cancelar exame, emitir protocolo. **Requisito não funcional** descreve restrição ou qualidade: tempo de resposta, disponibilidade, confidencialidade, acessibilidade e limites operacionais."
      },
      {
        "title": "Escreva contexto, gatilho e resposta",
        "body": "Para tornar o requisito verificável, declare **quem** executa, **em que condição**, **qual ação**, **qual resultado** e **como comprovar**. Exemplo: 'Dado um horário livre e usuário autorizado, quando confirmar agendamento, o sistema deve registrar paciente, procedimento, horário e identificador da operação e exibir protocolo.' Isso gera casos de teste observáveis."
      },
      {
        "title": "Critérios para erros e limites",
        "body": "Não teste só caminho feliz. Inclua horário já ocupado, usuário sem permissão, falha do banco, conexão perdida e tentativa repetida. Para tempo de resposta, defina população/carga, percentil e ferramenta de medição. '99,9% do tempo disponível' exige período e exclusões do cálculo. Segurança como 'o sistema será seguro' é vago; regras sobre perfis, logs e criptografia devem ser específicas."
      },
      {
        "title": "Rastreabilidade impede perda de requisitos",
        "body": "Associe necessidade → requisito → implementação → teste → evidência de aceite. Se a tela muda, revise testes dependentes. Requisitos podem ser priorizados por valor, risco e obrigatoriedade, não apenas pela ordem em que foram solicitados. Evite acrescentar funcionalidades que não respondem ao problema (gold plating)."
      }
    ],
    "worked": {
      "title": "Exemplo: validar a regra de horário disponível",
      "body": "**Pedido original:** 'não pode ter dois exames no mesmo horário'.\n\n**Problema:** a frase ignora duração de exames, salas e equipamentos.\n\n**Reescrita:** 'Para o mesmo equipamento, o sistema deve impedir agendamentos com intervalos sobrepostos, considerando horário inicial e final de cada exame'.\n\n**Teste positivo:** 9h–9h30 e 9h30–10h não se sobrepõem se os intervalos forem meio abertos.\n\n**Teste negativo:** 9h–9h40 e 9h20–10h conflitam.\n\n**Teste de autorização:** usuário sem perfil adequado não pode ignorar bloqueio sem fluxo autorizado. Agora o requisito permite aceitar ou rejeitar a implementação."
    },
    "pitfalls": [
      "'Fácil' e 'rápido' não são critérios objetivos sem parâmetros.",
      "Um requisito funcional não é um requisito técnico apenas por mencionar API.",
      "Não testar falhas e extremos deixa lacunas importantes.",
      "História de usuário é ponto de partida; critérios de aceite tornam a entrega verificável."
    ],
    "review": [
      {
        "ask": "'O relatório deve abrir em até 2 s em 95% das requisições' é de que tipo?",
        "answer": "Requisito não funcional de desempenho, com métrica."
      },
      {
        "ask": "Por que 'não permitir agendamentos no mesmo horário' é ambíguo?",
        "answer": "É preciso considerar duração, recurso compartilhado e definição de sobreposição de intervalos."
      }
    ],
    "extra": "**Avançado:** atributos de qualidade ISO/IEC 25010, casos de uso, critérios INVEST e matriz de rastreabilidade entre requisito, teste e entrega."
  },
  {
    "id": 75,
    "title": "Tabelas-verdade: domine os conectivos pela lógica",
    "goal": "Construir tabela-verdade, reconhecer equivalências e evitar intuições equivocadas sobre 'ou' e 'se... então'.",
    "steps": [
      {
        "title": "Quatro combinações para duas proposições",
        "body": "Duas proposições **P e Q** geram **2²=4** linhas de valores: VV, VF, FV, FF. Para n proposições independentes, a tabela possui **2^n** linhas. Comece escrevendo essas combinações, depois calcule cada conectivo sem pular etapas."
      },
      {
        "title": "Como cada conectivo funciona",
        "body": "**¬P** inverte o valor de P. **P∧Q** só é verdadeira com ambos verdadeiros. **P∨Q** (ou inclusivo) é verdadeira quando pelo menos uma é verdadeira, inclusive com ambas. **P→Q** só é falsa se P=V e Q=F. **P↔Q** é verdadeira quando os dois lados têm o mesmo valor. Não confunda 'ou inclusivo' com escolha exclusiva de apenas uma alternativa."
      },
      {
        "title": "Equivalência e negação",
        "body": "Duas fórmulas são **equivalentes** quando têm as mesmas saídas em todas as linhas. **P→Q ≡ ¬P∨Q ≡ ¬Q→¬P**. **¬(P∧Q) ≡ ¬P∨¬Q** e **¬(P∨Q) ≡ ¬P∧¬Q** são Leis de De Morgan. **Negar P→Q** produz **P∧¬Q**; não é a contrapositiva. Você pode comprovar isso escrevendo as quatro linhas, sem confiar em memória frágil."
      }
    ],
    "worked": {
      "title": "Exemplo resolvido: (P∧Q)∨¬Q",
      "body": "Defina P=V e Q=F.\n\n**1.** P∧Q = V∧F = F.\n\n**2.** ¬Q = ¬F = V.\n\n**3.** (P∧Q)∨¬Q = F∨V = **V**.\n\n**Variação:** se P=F e Q=V, então P∧Q=F e ¬Q=F; expressão final **F**.\n\n**Estratégia de prova:** calcule de dentro para fora, respeitando parênteses, negação, conjunção e disjunção. Não tente 'sentir' a resposta."
    },
    "pitfalls": [
      "Ou lógico inclusivo admite P e Q verdadeiros simultaneamente.",
      "Implicação é falsa só no caso V→F.",
      "Contrapositiva não é negação; é equivalente à implicação.",
      "A quantidade de linhas da tabela para n proposições é 2^n."
    ],
    "review": [
      {
        "ask": "Quanto vale V→F?",
        "answer": "Falso; é o único caso que falsifica implicação."
      },
      {
        "ask": "Qual a negação de P∧Q?",
        "answer": "¬P∨¬Q, pela Lei de De Morgan."
      }
    ],
    "extra": "**Avançado:** tautologia, contradição, contingência e equivalências do bicondicional. Demonstre pelo quadro de todas as combinações em vez de decorar."
  },
  {
    "id": 83,
    "title": "LGPD aplicada: titular, controlador, operador e dado sensível",
    "goal": "Identificar papéis e categorias de dados em um processo real de tratamento.",
    "steps": [
      {
        "title": "Comece pelo titular e pelo dado",
        "body": "**Titular** é a pessoa natural a quem os dados se referem. Dados pessoais podem ser nome, CPF, telefone, registros de comportamento associados a pessoa identificada/identificável. **Dados sensíveis** incluem dados referentes à saúde e outras categorias legais. Dados efetivamente anonimizados, observados os critérios e possibilidades de reversão e a LGPD, possuem tratamento jurídico distinto de dados meramente pseudonimizados."
      },
      {
        "title": "Quem define a finalidade controla o tratamento",
        "body": "O **controlador** decide sobre finalidades e aspectos essenciais do tratamento. O **operador** executa tratamento em nome do controlador. O papel depende da realidade, não apenas da etiqueta usada em contrato. Um prestador de hospedagem que apenas processa informações segundo instruções pode atuar como operador; se define finalidades próprias para determinada operação, a análise do papel muda."
      },
      {
        "title": "Operações precisam de base, finalidade e controles",
        "body": "Coletar, armazenar, consultar, compartilhar e excluir são exemplos de **tratamento**. Documente objetivo, categoria de dado, base legal pertinente, responsáveis, prazo de retenção aplicável e controles. Dado de saúde demanda análise de hipóteses legais específicas: consentimento não é automaticamente a solução para qualquer situação. Princípios como finalidade, necessidade e segurança seguem relevantes independentemente da base escolhida."
      }
    ],
    "worked": {
      "title": "Exemplo: clínica, software terceirizado e paciente",
      "body": "**Paciente:** titular dos dados.\n\n**Clínica:** se decide finalidades de agendamento e entrega de exames, em regra atua como controladora dessas operações.\n\n**Fornecedor de software:** se hospeda ou processa dados conforme instruções da clínica, pode atuar como operador na operação específica.\n\n**Dado:** imagem com identificação de paciente pode envolver dado sensível referente à saúde.\n\n**Conformidade:** contratos, instruções, perfis de acesso, logs proporcionais, retenção e incidentes precisam ser mapeados. O fornecedor pode assumir outros papéis em outros tratamentos, conforme suas decisões."
    },
    "pitfalls": [
      "Dado sensível não significa apenas 'informação sigilosa por contrato'.",
      "Controlador e operador são papéis funcionais do tratamento, não sinônimos de empresa grande e pequena.",
      "Dados pseudonimizados podem continuar pessoais.",
      "Consentimento é uma base legal entre outras, com regras diferentes para dados sensíveis."
    ],
    "review": [
      {
        "ask": "Quem decide a finalidade e meios essenciais do tratamento?",
        "answer": "Em regra, o controlador da operação."
      },
      {
        "ask": "Dados de saúde associados a pessoa natural são de qual categoria na LGPD?",
        "answer": "Dado pessoal sensível, com regras específicas de tratamento."
      }
    ],
    "extra": "**Avançado:** titulares têm direitos previstos na LGPD, sujeitos a condições e exceções. Consulte a lei e orientações da ANPD sobre agentes de tratamento e hipóteses aplicáveis ao poder público: https://www.gov.br/anpd/pt-br."
  }
];
