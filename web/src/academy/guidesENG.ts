import type {LessonGuide} from './guidesTypes'
export const guidesENG:LessonGuide[]=[
  {
    "id": 14,
    "code": "ENG",
    "title": "Requisitos, testes e versionamento",
    "objective": "Identificar tipos de requisito e teste.",
    "theory": "Requisitos funcionais descrevem comportamentos do sistema; não funcionais tratam qualidades, restrições e características como desempenho. Testes de unidade verificam componentes menores; testes de integração verificam colaboração entre componentes.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Exemplo de requisito não funcional?",
        "back": "Tempo máximo de resposta ou disponibilidade esperada."
      },
      {
        "front": "Teste de integração verifica o quê?",
        "back": "Interação de dois ou mais componentes do sistema."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 15,
    "code": "ENG",
    "title": "API REST e controle de versão",
    "objective": "Relacionar HTTP e versionamento.",
    "theory": "APIs permitem integração entre sistemas. No HTTP, GET deve recuperar representação, enquanto POST geralmente cria ou processa recursos. Git registra histórico de alterações por commits e permite branches de desenvolvimento.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é o propósito habitual de GET em HTTP?",
        "back": "Obter uma representação de recurso sem provocar alteração intencional no estado do servidor."
      },
      {
        "front": "Qual a finalidade de um commit no Git?",
        "back": "Registrar um conjunto de mudanças no histórico do repositório."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 67,
    "code": "ENG",
    "title": "Requisitos funcionais e não funcionais",
    "objective": "Explicar e aplicar: Requisitos funcionais e não funcionais.",
    "theory": "Requisitos funcionais descrevem serviços/comportamentos; não funcionais especificam qualidades como disponibilidade, latência, segurança e manutenibilidade. Bons requisitos são claros, verificáveis e rastreáveis.",
    "practical": "\"O sistema deve registrar a senha retirada\" é funcional; \"95% das consultas devem responder em até 1s\" é de desempenho.",
    "warning": "\"Sistema rápido\" é vago e difícil de testar.",
    "recall": [
      {
        "front": "\"A API deve responder em até 500 ms\" é requisito:",
        "back": "Não funcional de desempenho. Limite de latência expressa qualidade de serviço."
      },
      {
        "front": "Qual característica favorece teste de requisitos?",
        "back": "Critério mensurável de aceitação. Requisito testável contém critérios verificáveis."
      },
      {
        "front": "Qual armadilha evitar em Requisitos funcionais e não funcionais?",
        "back": "\"Sistema rápido\" é vago e difícil de testar."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 68,
    "code": "ENG",
    "title": "UML e modelagem",
    "objective": "Explicar e aplicar: UML e modelagem.",
    "theory": "Diagramas de casos de uso mostram interações entre atores e funcionalidades; diagramas de sequência enfatizam mensagens no tempo; diagramas de classes descrevem estruturas, atributos e relacionamentos. Modelos são instrumentos de comunicação, não substituem código automaticamente.",
    "practical": "No sistema de agendamento, um caso de uso pode ser \"Agendar exame\"; sequência mostra paciente, API e banco interagindo.",
    "warning": "Ator de caso de uso pode ser sistema externo, não necessariamente pessoa.",
    "recall": [
      {
        "front": "Qual diagrama UML enfatiza troca de mensagens ao longo do tempo?",
        "back": "Diagrama de sequência. Sequência representa ordem temporal de interações."
      },
      {
        "front": "Qual diagrama representa atores e objetivos de interação com sistema?",
        "back": "Casos de uso. Use case modela serviços percebidos por atores."
      },
      {
        "front": "Qual armadilha evitar em UML e modelagem?",
        "back": "Ator de caso de uso pode ser sistema externo, não necessariamente pessoa."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 69,
    "code": "ENG",
    "title": "Testes: unidade, integração e aceitação",
    "objective": "Explicar e aplicar: Testes: unidade, integração e aceitação.",
    "theory": "Teste unitário verifica pequena unidade isoladamente; integração examina colaboração entre componentes; aceitação verifica critérios de negócio. Pirâmide de testes costuma favorecer maior quantidade de testes rápidos e determinísticos.",
    "practical": "Teste de API que grava e lê no banco é integração; teste de função de subnetting pode ser unitário.",
    "warning": "Cobertura de código alta não prova ausência de defeitos ou correção de requisitos.",
    "recall": [
      {
        "front": "Qual teste verifica cooperação entre API e banco de dados?",
        "back": "Integração. Integração valida interação entre componentes."
      },
      {
        "front": "Qual afirmação sobre cobertura de testes é correta?",
        "back": "Cobertura elevada não garante inexistência de bugs. Cobertura é métrica de execução e precisa de avaliação de qualidade."
      },
      {
        "front": "Qual armadilha evitar em Testes: unidade, integração e aceitação?",
        "back": "Cobertura de código alta não prova ausência de defeitos ou correção de requisitos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 70,
    "code": "ENG",
    "title": "Git: commits, branches e merges",
    "objective": "Explicar e aplicar: Git: commits, branches e merges.",
    "theory": "Git armazena histórico de snapshots por commits; branches são referências móveis para linhas de desenvolvimento. Merge integra históricos; rebase reaplica commits sobre outra base, reescrevendo commits e exigindo cuidado em branches compartilhadas.",
    "practical": "Criar branch feature/flashcards permite desenvolver sem alterar branch principal até revisão.",
    "warning": "Commits não substituem backup externo do repositório remoto, e rebase público pode atrapalhar colaboradores.",
    "recall": [
      {
        "front": "Qual comando cria um registro de mudanças staged no Git?",
        "back": "git commit. Commit registra alterações preparadas para o índice."
      },
      {
        "front": "Qual comando usualmente integra branch no ramo atual por merge?",
        "back": "git merge. git merge incorpora histórico de outro ramo."
      },
      {
        "front": "Qual armadilha evitar em Git: commits, branches e merges?",
        "back": "Commits não substituem backup externo do repositório remoto, e rebase público pode atrapalhar colaboradores."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 71,
    "code": "ENG",
    "title": "REST: recursos e métodos HTTP",
    "objective": "Explicar e aplicar: REST: recursos e métodos HTTP.",
    "theory": "REST representa arquitetura centrada em recursos. GET é seguro/idempotente em sua semântica, POST geralmente cria/aciona processamento, PUT substitui representação de recurso, PATCH altera parcialmente e DELETE remove. Respostas devem usar status coerente.",
    "practical": "GET /questoes/10 consulta; PATCH /questoes/10/status atualiza estado parcial.",
    "warning": "Idempotência não significa resposta byte a byte idêntica em toda execução.",
    "recall": [
      {
        "front": "Qual método HTTP é mais indicado para atualização parcial de recurso?",
        "back": "PATCH. PATCH aplica alterações parciais a representação."
      },
      {
        "front": "Qual método é considerado seguro pela semântica HTTP?",
        "back": "GET. GET não deveria provocar mudança de estado solicitada pelo cliente."
      },
      {
        "front": "Qual armadilha evitar em REST: recursos e métodos HTTP?",
        "back": "Idempotência não significa resposta byte a byte idêntica em toda execução."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 72,
    "code": "ENG",
    "title": "API: autenticação e autorização",
    "objective": "Explicar e aplicar: API: autenticação e autorização.",
    "theory": "Autenticação verifica identidade; autorização verifica permissão para ação/recurso. JWT é formato de token, não estratégia completa de segurança. Sessões com cookies HttpOnly e Secure sob HTTPS protegem contra certas exposições, mas exigem análise de CSRF e configuração correta.",
    "practical": "Usuário válido obtém 403 ao tentar acessar questão administrativa fora de sua permissão, ainda que esteja autenticado.",
    "warning": "Não confunda token assinado com token criptografado ou com garantia de segurança automática.",
    "recall": [
      {
        "front": "Qual processo determina se usuário pode executar ação?",
        "back": "Autorização. Autorização checa permissões."
      },
      {
        "front": "Qual atributo impede leitura de cookie por JavaScript de página?",
        "back": "HttpOnly. HttpOnly restringe acesso via document.cookie."
      },
      {
        "front": "Qual armadilha evitar em API: autenticação e autorização?",
        "back": "Não confunda token assinado com token criptografado ou com garantia de segurança automática."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 73,
    "code": "ENG",
    "title": "CI/CD e análise de código",
    "objective": "Explicar e aplicar: CI/CD e análise de código.",
    "theory": "Integração contínua automatiza validação frequente de mudanças, com build e testes. Entrega/implantação contínua automatiza preparação ou publicação conforme controles. Linters, testes e análise de dependências ajudam a detectar problemas cedo.",
    "practical": "Pipeline faz lint, testes da API, build da interface e análise de vulnerabilidades antes de produzir imagem Docker.",
    "warning": "Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção.",
    "recall": [
      {
        "front": "Qual é objetivo comum de CI?",
        "back": "Executar validações frequentes automaticamente. CI integra e valida alterações regularmente."
      },
      {
        "front": "Qual etapa detecta quebra de build TypeScript?",
        "back": "Compilação/verificação de tipos. Build e checagem de tipos identificam inconsistências estáticas."
      },
      {
        "front": "Qual armadilha evitar em CI/CD e análise de código?",
        "back": "Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 74,
    "code": "ENG",
    "title": "Complexidade e estruturas de dados",
    "objective": "Explicar e aplicar: Complexidade e estruturas de dados.",
    "theory": "A complexidade assintótica descreve crescimento de custo com entrada. Busca binária em vetor ordenado tem O(log n) no pior caso; varredura linear tem O(n). Pilha opera LIFO, fila FIFO; mapas hash têm operações médias rápidas sob condições típicas.",
    "practical": "Procurar número em lista ordenada por busca binária reduz espaço de busca pela metade a cada comparação.",
    "warning": "Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados.",
    "recall": [
      {
        "front": "Qual a ordem típica da busca binária em arranjo ordenado?",
        "back": "O(log n). A cada etapa é reduzida aproximadamente metade das possibilidades."
      },
      {
        "front": "Qual estrutura segue FIFO?",
        "back": "Fila. First In, First Out descreve fila."
      },
      {
        "front": "Qual armadilha evitar em Complexidade e estruturas de dados?",
        "back": "Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 109,
    "code": "ENG",
    "title": "Requisitos, histórias de usuário e modelagem",
    "objective": "Distinguir requisitos e transformar necessidade de negócio em critérios verificáveis.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Requisitos funcionais** expressam comportamentos e capacidades do sistema: “o usuário deve reagendar consulta”. **Não funcionais** descrevem qualidades e restrições verificáveis: disponibilidade, desempenho, segurança, acessibilidade, conformidade, usabilidade. “Sistema rápido” é vago; “95% das consultas respondem em menos de 2 s sob carga definida” é mensurável. **Regra de negócio** impõe política de domínio: “não permitir duas reservas simultâneas do mesmo profissional”.\n\nTécnicas de levantamento incluem entrevistas, oficinas, observação de trabalho, análise documental, protótipos e modelagem. **História de usuário** (“Como [papel], quero [capacidade], para [benefício]”) facilita conversas, mas não substitui critérios de aceitação. **Casos de uso** detalham interações e fluxos alternativos. Diagramas UML são ferramentas de comunicação e exigem escolher representação apropriada: atividade para fluxo, sequência para mensagens, classes para estrutura.\n\nA **rastreabilidade** conecta necessidade → requisito → decisão → implementação → teste. Quando um requisito muda, esse vínculo permite analisar impacto e regressão. Critérios de aceitação devem prever casos de sucesso, erros, autorização e dados de borda. Separar validação (estamos construindo o produto certo?) e verificação (produto atende especificação?) evita confusões clássicas.\n\n## Exemplo resolvido passo a passo\nRequisito bruto: “preciso melhorar o agendamento”. Detalhe com usuários: médicos, recepcionistas e pacientes. História: “Como recepcionista, quero visualizar horários disponíveis para evitar marcação duplicada”.\n\nCritérios: (1) não exibir slot reservado como livre; (2) conflito de duas tentativas simultâneas resulta em uma confirmação e uma rejeição; (3) acesso limitado ao perfil autorizado; (4) resposta dentro do tempo-alvo medido.\n\nModelo de entidades inclui `agenda`, `slot`, `reserva`; no teste de integração, valide concorrência e persistência. Regra “um slot ativo tem no máximo uma reserva confirmada” deve ser garantida também no banco/transação, não apenas na tela.\n\n## Erros clássicos nas bancas\n**Pegadinha:** não funcional pode ser testável e fundamental; não significa “opcional”. **Pegadinha:** mockup não garante requisitos capturados. **Pegadinha:** usuário dizer “quero um botão” não substitui entender o problema de negócio. **Pegadinha:** caso de uso não precisa ser necessariamente interface gráfica.\n\n## Pratique sem consultar\nTransforme “o sistema deve ser seguro” em três requisitos verificáveis (autorização, log, sessão). Crie história de usuário com três critérios testáveis e um cenário de corrida. Associe cada requisito a um teste correspondente.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nISO/IEC/IEEE 29148 — engenharia de requisitos (visão de referência): https://www.iso.org/standard/72089.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Diferença entre requisito funcional e não funcional?",
        "back": "Funcional define comportamento; não funcional define qualidades, restrições e condições de operação."
      },
      {
        "front": "O que diferencia critérios de aceitação de uma história genérica?",
        "back": "Eles expressam condições observáveis e testáveis para considerar a funcionalidade concluída."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 110,
    "code": "ENG",
    "title": "REST, HTTP, APIs e autenticação web",
    "objective": "Interpretar métodos, códigos, idempotência e controles de uma API.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**HTTP** organiza requisições e respostas por métodos, URI, cabeçalhos, corpo e status. **GET** é seguro no sentido semântico (não deveria solicitar alteração de estado); GET, PUT e DELETE são definidos como idempotentes pela semântica HTTP, embora o servidor possa registrar logs e outras consequências indiretas. **POST** não é idempotente por padrão; **PATCH** não é necessariamente idempotente. A idempotência significa que repetir requisições equivalentes produz o mesmo efeito pretendido no estado do servidor, não respostas de bytes idênticos.\n\n**Status**: 200 sucesso com representação, 201 recurso criado, 204 sucesso sem conteúdo, 400 requisição inválida, 401 não autenticado/credenciais inadequadas, 403 acesso proibido, 404 recurso ausente, 409 conflito de estado, 429 limite de requisições, 500 erro interno. 401 e 403 são muito cobrados em provas.\n\nUma API precisa tratar autenticação, autorização por objeto, validação de entrada, limites de requisição e logs sem vazar dados. **Cookie HttpOnly** dificulta leitura do cookie via JS da página; **Secure** exige envio em conexões seguras; **SameSite** auxilia mitigação de certos cenários de CSRF, mas não substitui análise completa. Um JWT assinado não é necessariamente criptografado. O frontend nunca deve ser o único guardião de permissões.\n\n## Exemplo resolvido passo a passo\nRecurso `questoes/42`: `GET /questoes/42` lê sem alteração pretendida; `PATCH /questoes/42` ajusta parte do registro; `DELETE /questoes/42` solicita remoção. Uma chamada `POST /simulados` pode criar nova tentativa e responder `201 Created`.\n\nSe um usuário autenticado tenta ver tentativas de outro usuário e não tem permissão, resposta adequada frequentemente é `403` (ou `404` para não revelar existência, por escolha de segurança). Se não está autenticado, `401` exige autenticação. Repita um `PUT` com mesmo estado: efeito pretendido não deve criar modificações adicionais diferentes. Observe ETag/If-Match para evitar sobrescrita concorrente quando requerido.\n\n## Erros clássicos nas bancas\n**Pegadinha:** “DELETE não é idempotente porque segunda resposta pode ser 404” é conceitualmente incorreto: as respostas podem diferir sem violar idempotência. **Pegadinha:** 401 não significa simplesmente “sem permissão” para usuário já identificado; 403 é mais representativo. **Pegadinha:** REST não significa usar JSON obrigatoriamente; é um estilo arquitetural.\n\n## Pratique sem consultar\nDesenhe quatro endpoints de uma plataforma de simulados, com método, código de sucesso e situação de erro. Explique como impedir usuário de acessar histórico de terceiros e por que o servidor precisa validar permissão mesmo quando o botão está escondido no frontend.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nRFC 9110 — semântica HTTP: https://www.rfc-editor.org/rfc/rfc9110.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que significa idempotência de um método HTTP?",
        "back": "Repetições equivalentes produzem o mesmo efeito pretendido no estado; a resposta não precisa ser idêntica."
      },
      {
        "front": "401 e 403: qual a diferença frequente?",
        "back": "401 sinaliza falta/invalidade de autenticação; 403 indica que servidor recusa ação mesmo conhecendo a identidade."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 111,
    "code": "ENG",
    "title": "Testes, Git, CI/CD e qualidade",
    "objective": "Criar estratégia de testes e pipeline sem confundir cobertura com correção.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Teste unitário** exercita unidade pequena com isolamento controlado; **integração** verifica componentes colaborando (API + banco), **sistema** valida conjunto completo e **aceitação** observa critérios do usuário/negócio. Pirâmide de testes sugere muitos testes rápidos e determinísticos, com menos testes caros de ponta a ponta; não é regra fixa de porcentagens. **Regressão** detecta se alterações quebraram comportamentos antes corretos.\n\n**Git** registra commits e branches; o commit captura uma versão do repositório e não substitui backup do banco em produção. Merge integra históricos; rebase reaplica commits e pode reescrever histórico, exigindo cuidado com branches compartilhadas. Pull request viabiliza revisão. **CI** executa build, testes e validações em integração frequente. **CD** pode significar entrega contínua (artefato pronto para publicação) ou implantação contínua (publicação automatizada), conforme contexto.\n\nA segurança do pipeline exige controle de segredos, dependências, permissões mínimas e revisão de atualizações. Métricas: tempo de build, testes instáveis, cobertura e defeitos em produção. Cobertura 100% significa execução das linhas/ramificações medidas, **não prova ausência de bugs**. Testes devem conter casos de erro, fronteiras, concorrência e autorização, não apenas “caminho feliz”.\n\n## Exemplo resolvido passo a passo\nEm EstudaTI, teste unitário valida cálculo de subnetting; integração valida `/api/quiz/submit` escrevendo e lendo SQLite; ponta a ponta simula usuário abrindo aula e respondendo questão no navegador. Pipeline executa: formatação/lint → verificação de tipos TS → testes Python → build React → análise de dependências → imagem Docker.\n\nUma mudança adiciona progresso em aulas: migração cria tabela com `CREATE TABLE IF NOT EXISTS`, não apaga históricos; teste cria banco antigo, inicia nova versão e verifica se tentativas permanecem. Essa é regressão de dados. Para publicação, use versão anterior disponível e backup testado.\n\n## Erros clássicos nas bancas\n**Pegadinha:** teste de integração não é necessariamente teste de ponta a ponta. **Pegadinha:** “pipeline verde” indica verificações escolhidas passaram, não auditoria completa de segurança. **Pegadinha:** Git não armazena dados de SQLite que nunca foram adicionados ao repositório. **Pegadinha:** `git rebase` de branch pública pode causar conflitos de histórico.\n\n## Pratique sem consultar\nEscreva uma estratégia de quatro testes para o cadastro de usuário: unidade, integração, autorização e navegador. Defina caso de limite de senha, erro de banco e tentativa de acesso sem cookie. Em seguida, liste etapas de CI que impediriam a entrega com build React quebrado.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\npytest — documentação de testes: https://docs.pytest.org/en/stable/\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que diferencia CI de implantação contínua?",
        "back": "CI valida integração frequente; implantação contínua automatiza publicação após etapas de verificação."
      },
      {
        "front": "Por que testes de migração são importantes em atualizações?",
        "back": "Verificam que esquema novo funciona sem destruir registros ou alterar comportamentos existentes."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 141,
    "code": "ENG",
    "title": "Testes: unidade, integração e sistema",
    "objective": "Compreender e aplicar testes: unidade, integração e sistema em provas.",
    "theory": "Testes de unidade verificam componentes pequenos em isolamento; integração investiga interação entre módulos; testes de sistema verificam comportamento end-to-end no escopo definido.\n\nA pirâmide de testes sugere muitas verificações pequenas e rápidas, complementadas por testes de integração e poucas jornadas críticas completas; proporção real depende do sistema. Teste automatizado não substitui análise de requisitos e oráculos corretos.",
    "practical": "Um teste de API pode validar que importar questões preserva histórico. Uma jornada ponta a ponta verifica login, aula, questão e resultado no navegador.",
    "warning": "Cobertura de linhas alta não garante ausência de defeitos de regra de negócio.",
    "recall": [
      {
        "front": "Qual é o conceito central de Testes: unidade, integração e sistema?",
        "back": "Testes de unidade verificam componentes pequenos em isolamento; integração investiga interação entre módulos; testes de sistema verificam comportamento end-to-end no escopo definido."
      },
      {
        "front": "Qual erro de prova evitar em Testes: unidade, integração e sistema?",
        "back": "Cobertura de linhas alta não garante ausência de defeitos de regra de negócio."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 142,
    "code": "ENG",
    "title": "APIs REST, idempotência e HTTP",
    "objective": "Compreender e aplicar apis rest, idempotência e http em provas.",
    "theory": "REST é estilo arquitetural com recursos e interface uniforme; métodos HTTP têm semânticas relevantes, incluindo segurança e idempotência.\n\nGET não deve causar alteração intencional de estado; PUT costuma ser idempotente quando representa substituição do recurso; POST em geral não é idempotente por definição. Status 201 é típico de recurso criado, 204 de sucesso sem conteúdo. Autorização e validação de entrada são essenciais para qualquer API.",
    "practical": "Repetir PUT /preferencias/42 com o mesmo corpo deve convergir para mesmo estado, enquanto repetir POST /pedidos pode criar duplicatas se não houver mecanismo específico.",
    "warning": "Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques.",
    "recall": [
      {
        "front": "Qual é o conceito central de APIs REST, idempotência e HTTP?",
        "back": "REST é estilo arquitetural com recursos e interface uniforme; métodos HTTP têm semânticas relevantes, incluindo segurança e idempotência."
      },
      {
        "front": "Qual erro de prova evitar em APIs REST, idempotência e HTTP?",
        "back": "Idempotência não significa ausência de qualquer efeito e não implica segurança contra ataques."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 143,
    "code": "ENG",
    "title": "Git: commit, branch e merge",
    "objective": "Compreender e aplicar git: commit, branch e merge em provas.",
    "theory": "Git registra snapshots versionados; branches são referências móveis para sequências de commits.\n\nCriar branch para funcionalidade isolada permite revisar alterações sem afetar diretamente a principal. Merge integra históricos; rebase reescreve a base de commits, exigindo cuidado com branches já compartilhadas. Um commit não cria backup remoto automaticamente: push publica referências conforme configuração.",
    "practical": "Ao atualizar EstudaTI, use branch de versão, testes e tag de release antes de copiar arquivos para produção.",
    "warning": "Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório.",
    "recall": [
      {
        "front": "Qual é o conceito central de Git: commit, branch e merge?",
        "back": "Git registra snapshots versionados; branches são referências móveis para sequências de commits."
      },
      {
        "front": "Qual erro de prova evitar em Git: commit, branch e merge?",
        "back": "Git não substitui backup do banco de dados nem guarda dados que não foram adicionados ao repositório."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 164,
    "code": "ENG",
    "title": "Histórias de usuário, critérios de aceite e testes",
    "objective": "Converter pedidos vagos em critérios verificáveis e identificar casos de teste com resultado esperado.",
    "theory": "# Caso de prova — o requisito “o sistema deve ser rápido”\nUma clínica solicita um portal que “abra rápido” e “seja seguro”. Esses enunciados são intenções, não critérios suficientemente testáveis. Para especificar, traduza cada pedido em **comportamento observável, métrica, condição e resultado esperado**. Por exemplo: “Sob carga de 100 usuários concorrentes no ambiente de homologação, 95% das consultas do histórico devem retornar em até dois segundos”. O requisito de desempenho tem unidade, limite e cenário mensurável, mas ainda pode precisar de ressalvas sobre volume dos dados e infraestrutura.\n\n## Da necessidade à história testável\nUma história de usuário pode ser: “Como recepcionista, quero visualizar horários disponíveis para agendar exames”. Critérios de aceite devem cobrir caminho feliz, validação e exceções. Exemplo: dado usuário autenticado com permissão e agenda aberta, quando consultar dia sem horários, o sistema deve retornar lista vazia com mensagem apropriada, não erro 500. Quando não estiver autenticado, deve exigir autorização. Quando duas pessoas reservarem o mesmo horário simultaneamente, a persistência deve impedir dupla ocupação.\n\n## Casos de teste — escreva entradas e saídas\nTeste 1: usuário autorizado consulta data válida com horários; espera HTTP 200 e lista consistente. Teste 2: consulta sem token; espera resposta de não autenticado conforme contrato. Teste 3: tenta agendar horário já reservado; espera falha controlada e nenhuma duplicação. Teste 4: consulta com data inválida; espera erro de validação apropriado. Note que o teste precisa de **pré-condição, ação e oráculo**, isto é, o que permite decidir se passou.\n\n## Qual nível de teste usar?\nUnidade testa função ou componente delimitado com dependências controladas. Integração verifica cooperação de componentes, como API e banco. End-to-end percorre fluxo de negócio, mas pode ser mais lento e frágil. Não se espera que um único teste prove todos os requisitos não funcionais; performance demanda ambiente e medição apropriados.\n\n## O que provas cobram\nA banca pode trocar requisito funcional (“usuário pode agendar”) por não funcional (“99,9% disponibilidade”) ou confundir caso de uso com caso de teste. Um caso de uso descreve interação e objetivo; um caso de teste especifica condições e verificação. Um critério de aceite ruim é “funcionar corretamente”; um bom tem situação e saída esperada observáveis.\n\n## Exercício sem consulta\nEscreva três critérios de aceite usando Dado/Quando/Então para reagendamento: sucesso; conflito de horário; usuário sem permissão. Garanta que o avaliador consiga conferir o resultado sem interpretar adjetivos vagos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é a estrutura mínima de um caso de teste verificável?",
        "back": "Pré-condição, ação/entrada e resultado esperado (oráculo)."
      },
      {
        "front": "Qual diferença principal entre requisito funcional e não funcional?",
        "back": "Funcional descreve capacidade/comportamento; não funcional define qualidade ou restrição mensurável."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 165,
    "code": "ENG",
    "title": "API HTTP: contratos, idempotência e falhas",
    "objective": "Escolher métodos e códigos HTTP pela semântica e prever comportamento seguro diante de repetição de pedidos.",
    "theory": "# Caso de prova — pedido duplicado por falha de rede\nUm aplicativo envia uma solicitação para criar agendamento; ocorre timeout e ele repete o pedido. Se o backend aceitar as duas requisições sem controle, pode criar agendamentos duplicados. Esse problema exige entender **semântica de métodos HTTP, idempotência e controle de duplicação no estado do servidor**.\n\n## Métodos não são intercambiáveis\n`GET` recupera representação e é definido como seguro: clientes não deveriam provocar alteração intencional de estado por simples consulta. `PUT` substitui/define estado de um recurso de maneira idempotente conforme contrato; repetir a mesma requisição tem o mesmo efeito pretendido que executar uma vez. `DELETE` também tem propriedade idempotente no efeito pretendido, embora respostas a pedidos repetidos possam diferir. `POST` geralmente solicita processamento cuja repetição **não é garantidamente idempotente**: uma criação repetida pode produzir efeitos duplicados.\n\n## Estratégia para criação robusta\nUma API de agendamento pode receber uma chave de idempotência por solicitação lógica, armazenando resultado associado e aplicando restrições de unicidade apropriadas. Se a mesma operação for repetida, a API devolve a representação ou resposta previamente determinada, em vez de criar novo recurso. A chave deve ser associada ao contexto e ao conteúdo esperado; não é mecanismo de autenticação. Chaves estrangeiras, índices únicos e transações protegem invariantes no banco. Lembre que “mesmo método HTTP” não prova existência de controle de duplicação na aplicação.\n\n## Status e erros: não decore somente números\n`200 OK` indica sucesso genérico; `201 Created` é apropriado quando um recurso foi criado; `204 No Content` pode indicar sucesso sem corpo; `400 Bad Request` sinaliza pedido inválido em termos gerais; `401 Unauthorized` refere-se a ausência ou falha de autenticação; `403 Forbidden` a recusa de acesso no contexto; `409 Conflict` a conflito com estado atual. O comportamento concreto deve ser documentado no contrato e verificado em testes.\n\n## Exemplo de caso de teste\nDado um pedido identificado pela chave K e válido, quando o cliente envia duas vezes por timeout, então a aplicação deve registrar um único agendamento e dar resposta consistente com o contrato. Um teste de carga que apenas verifica taxa de resposta não detecta necessariamente duplicação funcional; são medidas diferentes.\n\n## Armadilhas de prova\n- Idempotência descreve efeito pretendido da repetição, não igualdade garantida de todos os códigos ou cabeçalhos.\n- GET deve ter semântica segura; implementar alteração de dados em GET viola expectativa de clientes e caches.\n- Código 401 não significa “acesso proibido após autenticação” em toda situação; esse caso normalmente se relaciona a 403.\n- JSON é formato de representação, não protocolo que determina autenticação, consistência ou idempotência.\n\n## Exercício\nExplique em até seis linhas a diferença entre PUT e POST em contexto de repetição. Em seguida, proponha um requisito de idempotência para reservas com timeout e um teste que comprove o efeito.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual método HTTP possui semântica segura de recuperação?",
        "back": "GET; não deve gerar alteração intencional de estado pela simples consulta."
      },
      {
        "front": "Por que chave de idempotência não substitui autenticação?",
        "back": "Evita repetição lógica de operações, mas não prova identidade nem concede autorização."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
