import type {PedagogicalLesson} from './intro1'
export const completedENG:PedagogicalLesson[]=[
  {
    "id": 68,
    "title": "UML e modelagem",
    "goal": "Explicar e aplicar: UML e modelagem.",
    "steps": [
      {
        "title": "Entenda UML e modelagem",
        "body": "Diagramas de casos de uso mostram interações entre atores e funcionalidades; diagramas de sequência enfatizam mensagens no tempo; diagramas de classes descrevem estruturas, atributos e relacionamentos. Modelos são instrumentos de comunicação, não substituem código automaticamente.\n\n**Exemplo do assunto:** No sistema de agendamento, um caso de uso pode ser \"Agendar exame\"; sequência mostra paciente, API e banco interagindo."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual diagrama UML enfatiza troca de mensagens ao longo do tempo?\n\n**Resposta:** Diagrama de sequência.\n\n**Explicação:** Sequência representa ordem temporal de interações."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual diagrama representa atores e objetivos de interação com sistema?\n\n**Resposta:** Casos de uso.\n\n**Explicação:** Use case modela serviços percebidos por atores.\n\n**Cuidado:** Ator de caso de uso pode ser sistema externo, não necessariamente pessoa."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — UML e modelagem",
      "body": "**1. O que a questão quer saber?** Em UML, qual diagrama costuma representar classes, atributos, operações e associações?\n\n**2. Que conceito resolve?** Diagrama de classes expressa estrutura estática, tipos e relacionamentos, não execução temporal detalhada.\n\n**3. Qual é a conclusão?** Diagrama de classes.\n\n"
    },
    "pitfalls": [
      "Ator de caso de uso pode ser sistema externo, não necessariamente pessoa.",
      "Ator de caso de uso pode ser sistema externo, não necessariamente pessoa."
    ],
    "review": [
      {
        "ask": "Qual diagrama UML enfatiza troca de mensagens ao longo do tempo?",
        "answer": "Diagrama de sequência. Sequência representa ordem temporal de interações."
      },
      {
        "ask": "Qual diagrama representa atores e objetivos de interação com sistema?",
        "answer": "Casos de uso. Use case modela serviços percebidos por atores."
      },
      {
        "ask": "Qual armadilha evitar em UML e modelagem?",
        "answer": "Ator de caso de uso pode ser sistema externo, não necessariamente pessoa."
      }
    ],
    "extra": ""
  },
  {
    "id": 71,
    "title": "REST: recursos e métodos HTTP",
    "goal": "Explicar e aplicar: REST: recursos e métodos HTTP.",
    "steps": [
      {
        "title": "Entenda REST: recursos e métodos HTTP",
        "body": "REST representa arquitetura centrada em recursos. GET é seguro/idempotente em sua semântica, POST geralmente cria/aciona processamento, PUT substitui representação de recurso, PATCH altera parcialmente e DELETE remove. Respostas devem usar status coerente.\n\n**Exemplo do assunto:** GET /questoes/10 consulta; PATCH /questoes/10/status atualiza estado parcial."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual método HTTP é mais indicado para atualização parcial de recurso?\n\n**Resposta:** PATCH.\n\n**Explicação:** PATCH aplica alterações parciais a representação."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual método é considerado seguro pela semântica HTTP?\n\n**Resposta:** GET.\n\n**Explicação:** GET não deveria provocar mudança de estado solicitada pelo cliente.\n\n**Cuidado:** Idempotência não significa resposta byte a byte idêntica em toda execução."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — REST: recursos e métodos HTTP",
      "body": "**1. O que a questão quer saber?** Um cliente envia requisição GET para uma API e recebe 404. A interpretação mais comum é:\n\n**2. Que conceito resolve?** HTTP 404 indica que a origem não encontrou representação para o recurso solicitado naquele contexto.\n\n**3. Qual é a conclusão?** O recurso solicitado não foi encontrado.\n\n"
    },
    "pitfalls": [
      "Idempotência não significa resposta byte a byte idêntica em toda execução.",
      "Idempotência não significa resposta byte a byte idêntica em toda execução."
    ],
    "review": [
      {
        "ask": "Qual método HTTP é mais indicado para atualização parcial de recurso?",
        "answer": "PATCH. PATCH aplica alterações parciais a representação."
      },
      {
        "ask": "Qual método é considerado seguro pela semântica HTTP?",
        "answer": "GET. GET não deveria provocar mudança de estado solicitada pelo cliente."
      },
      {
        "ask": "Qual armadilha evitar em REST: recursos e métodos HTTP?",
        "answer": "Idempotência não significa resposta byte a byte idêntica em toda execução."
      }
    ],
    "extra": ""
  },
  {
    "id": 72,
    "title": "API: autenticação e autorização",
    "goal": "Explicar e aplicar: API: autenticação e autorização.",
    "steps": [
      {
        "title": "Entenda API: autenticação e autorização",
        "body": "Autenticação verifica identidade; autorização verifica permissão para ação/recurso. JWT é formato de token, não estratégia completa de segurança. Sessões com cookies HttpOnly e Secure sob HTTPS protegem contra certas exposições, mas exigem análise de CSRF e configuração correta.\n\n**Exemplo do assunto:** Usuário válido obtém 403 ao tentar acessar questão administrativa fora de sua permissão, ainda que esteja autenticado."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual atributo impede leitura de cookie por JavaScript de página?\n\n**Resposta:** HttpOnly.\n\n**Explicação:** HttpOnly restringe acesso via document.cookie."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Um usuário autenticado tenta acessar relatório reservado a administradores e recebe HTTP 403. Qual controle falhou ou negou o acesso?\n\n**Resposta:** Autorização.\n\n**Explicação:** HTTP 403 indica que a solicitação foi entendida, mas a ação foi negada; identificação/autenticação não implica autorização.\n\n**Cuidado:** Não confunda token assinado com token criptografado ou com garantia de segurança automática."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — API: autenticação e autorização",
      "body": "**1. O que a questão quer saber?** Qual processo determina se usuário pode executar ação?\n\n**2. Que conceito resolve?** Autorização checa permissões.\n\n**3. Qual é a conclusão?** Autorização.\n\n"
    },
    "pitfalls": [
      "Não confunda token assinado com token criptografado ou com garantia de segurança automática.",
      "Não confunda token assinado com token criptografado ou com garantia de segurança automática."
    ],
    "review": [
      {
        "ask": "Qual processo determina se usuário pode executar ação?",
        "answer": "Autorização. Autorização checa permissões."
      },
      {
        "ask": "Qual atributo impede leitura de cookie por JavaScript de página?",
        "answer": "HttpOnly. HttpOnly restringe acesso via document.cookie."
      },
      {
        "ask": "Qual armadilha evitar em API: autenticação e autorização?",
        "answer": "Não confunda token assinado com token criptografado ou com garantia de segurança automática."
      }
    ],
    "extra": ""
  },
  {
    "id": 73,
    "title": "CI/CD e análise de código",
    "goal": "Explicar e aplicar: CI/CD e análise de código.",
    "steps": [
      {
        "title": "Entenda CI/CD e análise de código",
        "body": "Integração contínua automatiza validação frequente de mudanças, com build e testes. Entrega/implantação contínua automatiza preparação ou publicação conforme controles. Linters, testes e análise de dependências ajudam a detectar problemas cedo.\n\n**Exemplo do assunto:** Pipeline faz lint, testes da API, build da interface e análise de vulnerabilidades antes de produzir imagem Docker."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Uma pipeline falha porque testes automatizados apontaram regressão. Qual prática de CI está demonstrada?\n\n**Resposta:** Validar mudanças continuamente antes da integração/implantação.\n\n**Explicação:** Integração contínua combina builds e testes para detectar problemas cedo e impedir promoção indevida."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual etapa detecta quebra de build TypeScript?\n\n**Resposta:** Compilação/verificação de tipos.\n\n**Explicação:** Build e checagem de tipos identificam inconsistências estáticas.\n\n**Cuidado:** Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — CI/CD e análise de código",
      "body": "**1. O que a questão quer saber?** Qual é objetivo comum de CI?\n\n**2. Que conceito resolve?** CI integra e valida alterações regularmente.\n\n**3. Qual é a conclusão?** Executar validações frequentes automaticamente.\n\n"
    },
    "pitfalls": [
      "Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção.",
      "Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção."
    ],
    "review": [
      {
        "ask": "Qual é objetivo comum de CI?",
        "answer": "Executar validações frequentes automaticamente. CI integra e valida alterações regularmente."
      },
      {
        "ask": "Qual etapa detecta quebra de build TypeScript?",
        "answer": "Compilação/verificação de tipos. Build e checagem de tipos identificam inconsistências estáticas."
      },
      {
        "ask": "Qual armadilha evitar em CI/CD e análise de código?",
        "answer": "Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção."
      }
    ],
    "extra": ""
  },
  {
    "id": 74,
    "title": "Complexidade e estruturas de dados",
    "goal": "Explicar e aplicar: Complexidade e estruturas de dados.",
    "steps": [
      {
        "title": "Entenda Complexidade e estruturas de dados",
        "body": "A complexidade assintótica descreve crescimento de custo com entrada. Busca binária em vetor ordenado tem O(log n) no pior caso; varredura linear tem O(n). Pilha opera LIFO, fila FIFO; mapas hash têm operações médias rápidas sob condições típicas.\n\n**Exemplo do assunto:** Procurar número em lista ordenada por busca binária reduz espaço de busca pela metade a cada comparação."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual a ordem típica da busca binária em arranjo ordenado?\n\n**Resposta:** O(log n).\n\n**Explicação:** A cada etapa é reduzida aproximadamente metade das possibilidades."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Um algoritmo percorre uma lista com n elementos uma única vez. Qual complexidade de tempo típica do laço é esperada?\n\n**Resposta:** O(n).\n\n**Explicação:** Um percurso linear que faz trabalho constante por elemento cresce proporcionalmente a n.\n\n**Cuidado:** Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Complexidade e estruturas de dados",
      "body": "**1. O que a questão quer saber?** Qual estrutura segue FIFO?\n\n**2. Que conceito resolve?** First In, First Out descreve fila.\n\n**3. Qual é a conclusão?** Fila.\n\n"
    },
    "pitfalls": [
      "Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados.",
      "Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados."
    ],
    "review": [
      {
        "ask": "Qual a ordem típica da busca binária em arranjo ordenado?",
        "answer": "O(log n). A cada etapa é reduzida aproximadamente metade das possibilidades."
      },
      {
        "ask": "Qual estrutura segue FIFO?",
        "answer": "Fila. First In, First Out descreve fila."
      },
      {
        "ask": "Qual armadilha evitar em Complexidade e estruturas de dados?",
        "answer": "Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados."
      }
    ],
    "extra": ""
  },
  {
    "id": 109,
    "title": "Requisitos, histórias de usuário e modelagem",
    "goal": "Distinguir requisitos e transformar necessidade de negócio em critérios verificáveis.",
    "steps": [
      {
        "title": "Compreenda Requisitos, histórias de usuário e modelagem",
        "body": "**Requisitos funcionais** expressam comportamentos e capacidades do sistema: “o usuário deve reagendar consulta”. **Não funcionais** descrevem qualidades e restrições verificáveis: disponibilidade, desempenho, segurança, acessibilidade, conformidade, usabilidade. “Sistema rápido” é vago; “95% das consultas respondem em menos de 2 s sob carga definida” é mensurável. **Regra de negócio** impõe política de domínio: “não permitir duas reservas simultâneas do mesmo profissional”."
      },
      {
        "title": "Como funciona na prática",
        "body": "Técnicas de levantamento incluem entrevistas, oficinas, observação de trabalho, análise documental, protótipos e modelagem. **História de usuário** (“Como [papel], quero [capacidade], para [benefício]”) facilita conversas, mas não substitui critérios de aceitação. **Casos de uso** detalham interações e fluxos alternativos. Diagramas UML são ferramentas de comunicação e exigem escolher representação apropriada: atividade para fluxo, sequência para mensagens, classes para estrutura."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "A **rastreabilidade** conecta necessidade → requisito → decisão → implementação → teste. Quando um requisito muda, esse vínculo permite analisar impacto e regressão. Critérios de aceitação devem prever casos de sucesso, erros, autorização e dados de borda. Separar validação (estamos construindo o produto certo?) e verificação (produto atende especificação?) evita confusões clássicas."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Requisitos, histórias de usuário e modelagem",
      "body": "Requisito bruto: “preciso melhorar o agendamento”. Detalhe com usuários: médicos, recepcionistas e pacientes. História: “Como recepcionista, quero visualizar horários disponíveis para evitar marcação duplicada”.\n\nCritérios: (1) não exibir slot reservado como livre; (2) conflito de duas tentativas simultâneas resulta em uma confirmação e uma rejeição; (3) acesso limitado ao perfil autorizado; (4) resposta dentro do tempo-alvo medido.\n\nModelo de entidades inclui `agenda`, `slot`, `reserva`; no teste de integração, valide concorrência e persistência. Regra “um slot ativo tem no máximo uma reserva confirmada” deve ser garantida também no banco/transação, não apenas na tela."
    },
    "pitfalls": [
      "não funcional pode ser testável e fundamental; não significa “opcional”. **Pegadinha:** mockup não garante requisitos capturados. **Pegadinha:** usuário dizer “quero um botão” não substitui entender o problema de negócio. **Pegadinha:** caso de uso não precisa ser necessariamente interface gráfica.",
      "Considere as condições específicas de Requisitos, histórias de usuário e modelagem: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Diferença entre requisito funcional e não funcional?",
        "answer": "Funcional define comportamento; não funcional define qualidades, restrições e condições de operação."
      },
      {
        "ask": "O que diferencia critérios de aceitação de uma história genérica?",
        "answer": "Eles expressam condições observáveis e testáveis para considerar a funcionalidade concluída."
      }
    ],
    "extra": ""
  },
  {
    "id": 110,
    "title": "REST, HTTP, APIs e autenticação web",
    "goal": "Interpretar métodos, códigos, idempotência e controles de uma API.",
    "steps": [
      {
        "title": "Compreenda REST, HTTP, APIs e autenticação web",
        "body": "**HTTP** organiza requisições e respostas por métodos, URI, cabeçalhos, corpo e status. **GET** é seguro no sentido semântico (não deveria solicitar alteração de estado); GET, PUT e DELETE são definidos como idempotentes pela semântica HTTP, embora o servidor possa registrar logs e outras consequências indiretas. **POST** não é idempotente por padrão; **PATCH** não é necessariamente idempotente. A idempotência significa que repetir requisições equivalentes produz o mesmo efeito pretendido no estado do servidor, não respostas de bytes idênticos."
      },
      {
        "title": "Como funciona na prática",
        "body": "**Status**: 200 sucesso com representação, 201 recurso criado, 204 sucesso sem conteúdo, 400 requisição inválida, 401 não autenticado/credenciais inadequadas, 403 acesso proibido, 404 recurso ausente, 409 conflito de estado, 429 limite de requisições, 500 erro interno. 401 e 403 são muito cobrados em provas."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "Uma API precisa tratar autenticação, autorização por objeto, validação de entrada, limites de requisição e logs sem vazar dados. **Cookie HttpOnly** dificulta leitura do cookie via JS da página; **Secure** exige envio em conexões seguras; **SameSite** auxilia mitigação de certos cenários de CSRF, mas não substitui análise completa. Um JWT assinado não é necessariamente criptografado. O frontend nunca deve ser o único guardião de permissões."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — REST, HTTP, APIs e autenticação web",
      "body": "Recurso `questoes/42`: `GET /questoes/42` lê sem alteração pretendida; `PATCH /questoes/42` ajusta parte do registro; `DELETE /questoes/42` solicita remoção. Uma chamada `POST /simulados` pode criar nova tentativa e responder `201 Created`.\n\nSe um usuário autenticado tenta ver tentativas de outro usuário e não tem permissão, resposta adequada frequentemente é `403` (ou `404` para não revelar existência, por escolha de segurança). Se não está autenticado, `401` exige autenticação. Repita um `PUT` com mesmo estado: efeito pretendido não deve criar modificações adicionais diferentes. Observe ETag/If-Match para evitar sobrescrita concorrente quando requerido."
    },
    "pitfalls": [
      "“DELETE não é idempotente porque segunda resposta pode ser 404” é conceitualmente incorreto: as respostas podem diferir sem violar idempotência. **Pegadinha:** 401 não significa simplesmente “sem permissão” para usuário já identificado; 403 é mais representativo. **Pegadinha:** REST não significa usar JSON obrigatoriamente; é um estilo arquitetural.",
      "Considere as condições específicas de REST, HTTP, APIs e autenticação web: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "O que significa idempotência de um método HTTP?",
        "answer": "Repetições equivalentes produzem o mesmo efeito pretendido no estado; a resposta não precisa ser idêntica."
      },
      {
        "ask": "401 e 403: qual a diferença frequente?",
        "answer": "401 sinaliza falta/invalidade de autenticação; 403 indica que servidor recusa ação mesmo conhecendo a identidade."
      }
    ],
    "extra": ""
  },
  {
    "id": 111,
    "title": "Testes, Git, CI/CD e qualidade",
    "goal": "Criar estratégia de testes e pipeline sem confundir cobertura com correção.",
    "steps": [
      {
        "title": "Compreenda Testes, Git, CI/CD e qualidade",
        "body": "**Teste unitário** exercita unidade pequena com isolamento controlado; **integração** verifica componentes colaborando (API + banco), **sistema** valida conjunto completo e **aceitação** observa critérios do usuário/negócio. Pirâmide de testes sugere muitos testes rápidos e determinísticos, com menos testes caros de ponta a ponta; não é regra fixa de porcentagens. **Regressão** detecta se alterações quebraram comportamentos antes corretos."
      },
      {
        "title": "Como funciona na prática",
        "body": "**Git** registra commits e branches; o commit captura uma versão do repositório e não substitui backup do banco em produção. Merge integra históricos; rebase reaplica commits e pode reescrever histórico, exigindo cuidado com branches compartilhadas. Pull request viabiliza revisão. **CI** executa build, testes e validações em integração frequente. **CD** pode significar entrega contínua (artefato pronto para publicação) ou implantação contínua (publicação automatizada), conforme contexto."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "A segurança do pipeline exige controle de segredos, dependências, permissões mínimas e revisão de atualizações. Métricas: tempo de build, testes instáveis, cobertura e defeitos em produção. Cobertura 100% significa execução das linhas/ramificações medidas, **não prova ausência de bugs**. Testes devem conter casos de erro, fronteiras, concorrência e autorização, não apenas “caminho feliz”."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Testes, Git, CI/CD e qualidade",
      "body": "Em EstudaTI, teste unitário valida cálculo de subnetting; integração valida `/api/quiz/submit` escrevendo e lendo SQLite; ponta a ponta simula usuário abrindo aula e respondendo questão no navegador. Pipeline executa: formatação/lint → verificação de tipos TS → testes Python → build React → análise de dependências → imagem Docker.\n\nUma mudança adiciona progresso em aulas: migração cria tabela com `CREATE TABLE IF NOT EXISTS`, não apaga históricos; teste cria banco antigo, inicia nova versão e verifica se tentativas permanecem. Essa é regressão de dados. Para publicação, use versão anterior disponível e backup testado."
    },
    "pitfalls": [
      "teste de integração não é necessariamente teste de ponta a ponta. **Pegadinha:** “pipeline verde” indica verificações escolhidas passaram, não auditoria completa de segurança. **Pegadinha:** Git não armazena dados de SQLite que nunca foram adicionados ao repositório. **Pegadinha:** `git rebase` de branch pública pode causar conflitos de histórico.",
      "Considere as condições específicas de Testes, Git, CI/CD e qualidade: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "O que diferencia CI de implantação contínua?",
        "answer": "CI valida integração frequente; implantação contínua automatiza publicação após etapas de verificação."
      },
      {
        "ask": "Por que testes de migração são importantes em atualizações?",
        "answer": "Verificam que esquema novo funciona sem destruir registros ou alterar comportamentos existentes."
      }
    ],
    "extra": ""
  },
  {
    "id": 141,
    "title": "Testes: unidade, integração e sistema",
    "goal": "Compreender e aplicar testes: unidade, integração e sistema em provas.",
    "steps": [
      {
        "title": "Entenda Testes: unidade, integração e sistema",
        "body": "Testes de unidade verificam componentes pequenos em isolamento; integração investiga interação entre módulos; testes de sistema verificam comportamento end-to-end no escopo definido.\n\nA pirâmide de testes sugere muitas verificações pequenas e rápidas, complementadas por testes de integração e poucas jornadas críticas completas; proporção real depende do sistema. Teste automatizado não substitui análise de requisitos e oráculos corretos.\n\n**Exemplo do assunto:** Um teste de API pode validar que importar questões preserva histórico. Uma jornada ponta a ponta verifica login, aula, questão e resultado no navegador."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual tipo de teste é mais diretamente voltado à interação entre componentes?\n\n**Resposta:** Teste de integração.\n\n**Explicação:** Integração verifica contratos e comunicação entre partes."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Um teste de API pode validar que importar questões preserva histórico. Uma jornada ponta a ponta verifica login, aula, questão e resultado no navegador.\n\n**Questão:** Um teste verifica o método 'calcularDesconto' isolando dependências externas com mocks. Em geral, trata-se de:\n\n**Resposta:** Teste de unidade.\n\n**Explicação:** Teste de unidade verifica comportamento de unidade pequena isolando dependências conforme escopo.\n\n**Cuidado:** Cobertura de linhas alta não garante ausência de defeitos de regra de negócio."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Testes: unidade, integração e sistema",
      "body": "**1. O que a questão quer saber?** Um teste verifica o método 'calcularDesconto' isolando dependências externas com mocks. Em geral, trata-se de:\n\n**2. Que conceito resolve?** Teste de unidade verifica comportamento de unidade pequena isolando dependências conforme escopo.\n\n**3. Qual é a conclusão?** Teste de unidade.\n\n"
    },
    "pitfalls": [
      "Cobertura de linhas alta não garante ausência de defeitos de regra de negócio.",
      "Cobertura de linhas alta não garante ausência de defeitos de regra de negócio."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Testes: unidade, integração e sistema?",
        "answer": "Testes de unidade verificam componentes pequenos em isolamento; integração investiga interação entre módulos; testes de sistema verificam comportamento end-to-end no escopo definido."
      },
      {
        "ask": "Qual erro de prova evitar em Testes: unidade, integração e sistema?",
        "answer": "Cobertura de linhas alta não garante ausência de defeitos de regra de negócio."
      }
    ],
    "extra": ""
  },
  {
    "id": 142,
    "title": "APIs REST, idempotência e HTTP",
    "goal": "Compreender e aplicar apis rest, idempotência e http em provas.",
    "steps": [
      {
        "title": "Entenda APIs REST, idempotência e HTTP",
        "body": "REST é estilo arquitetural com recursos e interface uniforme; métodos HTTP têm semânticas relevantes, incluindo segurança e idempotência.\n\nGET não deve causar alteração intencional de estado; PUT costuma ser idempotente quando representa substituição do recurso; POST em geral não é idempotente por definição. Status 201 é típico de recurso criado, 204 de sucesso sem conteúdo. Autorização e validação de entrada são essenciais para qualquer API.\n\n**Exemplo do assunto:** Repetir PUT /preferencias/42 com o mesmo corpo deve convergir para mesmo estado, enquanto repetir POST /pedidos pode criar duplicatas se não houver mecanismo específico."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual método HTTP costuma ser idempotente ao substituir um recurso com mesma representação?\n\n**Resposta:** PUT.\n\n**Explicação:** PUT é definido como idempotente em sua semântica."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Repetir PUT /preferencias/42 com o mesmo corpo deve convergir para mesmo estado, enquanto repetir POST /pedidos pode criar duplicatas se não houver mecanismo específico.\n\n**Questão:** Uma API expõe PATCH para alterar parte de recurso. Qual afirmação é correta?\n\n**Resposta:** PATCH não é necessariamente idempotente; depende da semântica da operação.\n\n**Explicação:** PATCH aplica alterações parciais e a idempotência depende do formato e operação; diferentemente de PUT, não é uma garantia geral.\n\n**Cuidado:** Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — APIs REST, idempotência e HTTP",
      "body": "**1. O que a questão quer saber?** Uma API expõe PATCH para alterar parte de recurso. Qual afirmação é correta?\n\n**2. Que conceito resolve?** PATCH aplica alterações parciais e a idempotência depende do formato e operação; diferentemente de PUT, não é uma garantia geral.\n\n**3. Qual é a conclusão?** PATCH não é necessariamente idempotente; depende da semântica da operação.\n\n"
    },
    "pitfalls": [
      "Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques.",
      "Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de APIs REST, idempotência e HTTP?",
        "answer": "REST é estilo arquitetural com recursos e interface uniforme; métodos HTTP têm semânticas relevantes, incluindo segurança e idempotência."
      },
      {
        "ask": "Qual erro de prova evitar em APIs REST, idempotência e HTTP?",
        "answer": "Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques."
      }
    ],
    "extra": ""
  },
  {
    "id": 143,
    "title": "Git: commit, branch e merge",
    "goal": "Compreender e aplicar git: commit, branch e merge em provas.",
    "steps": [
      {
        "title": "Entenda Git: commit, branch e merge",
        "body": "Git registra snapshots versionados; branches são referências móveis para sequências de commits.\n\nCriar branch para funcionalidade isolada permite revisar alterações sem afetar diretamente a principal. Merge integra históricos; rebase reescreve a base de commits, exigindo cuidado com branches já compartilhadas. Um commit não cria backup remoto automaticamente: push publica referências conforme configuração.\n\n**Exemplo do assunto:** Ao atualizar EstudaTI, use branch de versão, testes e tag de release antes de copiar arquivos para produção."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual comando publica commits locais em repositório remoto configurado?\n\n**Resposta:** git push.\n\n**Explicação:** Push envia commits e referências conforme configuração."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Ao atualizar EstudaTI, use branch de versão, testes e tag de release antes de copiar arquivos para produção.\n\n**Questão:** Duas pessoas alteram a mesma linha de um arquivo em branches diferentes. Que situação pode surgir ao mesclar?\n\n**Resposta:** Conflito de merge a resolver.\n\n**Explicação:** Alterações concorrentes incompatíveis podem exigir resolução manual de conflitos ao integrar branches.\n\n**Cuidado:** Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Git: commit, branch e merge",
      "body": "**1. O que a questão quer saber?** Duas pessoas alteram a mesma linha de um arquivo em branches diferentes. Que situação pode surgir ao mesclar?\n\n**2. Que conceito resolve?** Alterações concorrentes incompatíveis podem exigir resolução manual de conflitos ao integrar branches.\n\n**3. Qual é a conclusão?** Conflito de merge a resolver.\n\n"
    },
    "pitfalls": [
      "Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório.",
      "Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Git: commit, branch e merge?",
        "answer": "Git registra snapshots versionados; branches são referências móveis para sequências de commits."
      },
      {
        "ask": "Qual erro de prova evitar em Git: commit, branch e merge?",
        "answer": "Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório."
      }
    ],
    "extra": ""
  },
  {
    "id": 164,
    "title": "Histórias de usuário, critérios de aceite e testes",
    "goal": "Converter pedidos vagos em critérios verificáveis e identificar casos de teste com resultado esperado.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — o requisito “o sistema deve ser rápido”\nUma clínica solicita um portal que “abra rápido” e “seja seguro”. Esses enunciados são intenções, não critérios suficientemente testáveis. Para especificar, traduza cada pedido em **comportamento observável, métrica, condição e resultado esperado**. Por exemplo: “Sob carga de 100 usuários concorrentes no ambiente de homologação, 95% das consultas do histórico devem retornar em até dois segundos”. O requisito de desempenho tem unidade, limite e cenário mensurável, mas ainda pode precisar de ressalvas sobre volume dos dados e infraestrutura."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Da necessidade à história testável\nUma história de usuário pode ser: “Como recepcionista, quero visualizar horários disponíveis para agendar exames”. Critérios de aceite devem cobrir caminho feliz, validação e exceções. Exemplo: dado usuário autenticado com permissão e agenda aberta, quando consultar dia sem horários, o sistema deve retornar lista vazia com mensagem apropriada, não erro 500. Quando não estiver autenticado, deve exigir autorização. Quando duas pessoas reservarem o mesmo horário simultaneamente, a persistência deve impedir dupla ocupação."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## Casos de teste — escreva entradas e saídas\nTeste 1: usuário autorizado consulta data válida com horários; espera HTTP 200 e lista consistente. Teste 2: consulta sem token; espera resposta de não autenticado conforme contrato. Teste 3: tenta agendar horário já reservado; espera falha controlada e nenhuma duplicação. Teste 4: consulta com data inválida; espera erro de validação apropriado. Note que o teste precisa de **pré-condição, ação e oráculo**, isto é, o que permite decidir se passou."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Histórias de usuário, critérios de aceite e testes",
      "body": "**Questão:** Um serviço de agendamento recebe horário inválido e deve responder HTTP 422 sem criar registro. Qual teste verifica melhor esse requisito?\n\n**Resposta:** Enviar payload inválido, conferir HTTP 422 e ausência de registro persistido.\n\n**Explicação:** Um teste de integração/contrato deve verificar resposta e efeito de negócio, incluindo ausência de gravação indevida.\n\n**Alternativa incorreta:** Medir apenas a cor do botão de agendar. **Motivo:** A aparência não avalia o contrato de validação da API."
    },
    "pitfalls": [
      "Considere as condições específicas de Histórias de usuário, critérios de aceite e testes: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de Histórias de usuário, critérios de aceite e testes: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Qual é a estrutura mínima de um caso de teste verificável?",
        "answer": "Pré-condição, ação/entrada e resultado esperado (oráculo)."
      },
      {
        "ask": "Qual diferença principal entre requisito funcional e não funcional?",
        "answer": "Funcional descreve capacidade/comportamento; não funcional define qualidade ou restrição mensurável."
      }
    ],
    "extra": ""
  },
  {
    "id": 165,
    "title": "API HTTP: contratos, idempotência e falhas",
    "goal": "Escolher métodos e códigos HTTP pela semântica e prever comportamento seguro diante de repetição de pedidos.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — pedido duplicado por falha de rede\nUm aplicativo envia uma solicitação para criar agendamento; ocorre timeout e ele repete o pedido. Se o backend aceitar as duas requisições sem controle, pode criar agendamentos duplicados. Esse problema exige entender **semântica de métodos HTTP, idempotência e controle de duplicação no estado do servidor**."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Métodos não são intercambiáveis\n`GET` recupera representação e é definido como seguro: clientes não deveriam provocar alteração intencional de estado por simples consulta. `PUT` substitui/define estado de um recurso de maneira idempotente conforme contrato; repetir a mesma requisição tem o mesmo efeito pretendido que executar uma vez. `DELETE` também tem propriedade idempotente no efeito pretendido, embora respostas a pedidos repetidos possam diferir. `POST` geralmente solicita processamento cuja repetição **não é garantidamente idempotente**: uma criação repetida pode produzir efeitos duplicados."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## Estratégia para criação robusta\nUma API de agendamento pode receber uma chave de idempotência por solicitação lógica, armazenando resultado associado e aplicando restrições de unicidade apropriadas. Se a mesma operação for repetida, a API devolve a representação ou resposta previamente determinada, em vez de criar novo recurso. A chave deve ser associada ao contexto e ao conteúdo esperado; não é mecanismo de autenticação. Chaves estrangeiras, índices únicos e transações protegem invariantes no banco. Lembre que “mesmo método HTTP” não prova existência de controle de duplicação na aplicação."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — API HTTP: contratos, idempotência e falhas",
      "body": "**Questão:** Uma API expõe PUT /usuarios/42 para substituir o recurso por um mesmo documento. Qual característica de PUT deve orientar o tratamento de repetidas requisições idênticas?\n\n**Resposta:** Repetir a mesma operação deve preservar o efeito pretendido após a primeira aplicação.\n\n**Explicação:** Idempotência significa que repetir uma operação tem o mesmo efeito pretendido que aplicá-la uma vez; não significa necessariamente resposta idêntica.\n\n**Alternativa incorreta:** Cada repetição precisa criar novo usuário. **Motivo:** Gerar um novo recurso a cada repetição contraria a idempotência de PUT."
    },
    "pitfalls": [
      "Considere as condições específicas de API HTTP: contratos, idempotência e falhas: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de API HTTP: contratos, idempotência e falhas: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Qual método HTTP possui semântica segura de recuperação?",
        "answer": "GET; não deve gerar alteração intencional de estado pela simples consulta."
      },
      {
        "ask": "Por que chave de idempotência não substitui autenticação?",
        "answer": "Evita repetição lógica de operações, mas não prova identidade nem concede autorização."
      }
    ],
    "extra": ""
  }
];
