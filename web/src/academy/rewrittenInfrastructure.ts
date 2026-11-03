import type {PedagogicalLesson} from './intro1'
export const rewrittenInfrastructure:Record<number,Partial<PedagogicalLesson>>={
  "21": {
    "id": 21,
    "goal": "Entender por que TCP entrega bytes em ordem, como a conexão nasce e por que a janela do receptor é diferente do congestionamento da rede.",
    "steps": [
      {
        "title": "O problema que TCP resolve",
        "body": "Quando um sistema envia um arquivo pela rede, o IP pode transportar pacotes por caminhos diferentes, mas não promete ao aplicativo que tudo chegará na ordem original. O **TCP**, na camada de transporte, cria uma comunicação entre processos identificados por endereços e portas. Para o programa, ele fornece um **fluxo ordenado de bytes**: se os segmentos chegarem fora de ordem, o TCP recompõe o fluxo antes de entregá-lo ao aplicativo.\n\nA confiabilidade é obtida por números de sequência, confirmações (**ACK**), temporizadores e retransmissões. Isso não significa que a conexão jamais cairá: significa que, enquanto a sessão for mantida e houver recuperação possível, o transporte detecta perdas e tenta entregar os dados corretamente. **TCP não criptografa**; uma aplicação web normalmente utiliza TLS para proteger o conteúdo."
      },
      {
        "title": "Como a conexão começa: SYN, SYN-ACK e ACK",
        "body": "Imagine um navegador querendo abrir uma conexão com um servidor HTTPS na porta 443. Primeiro, o cliente envia **SYN**: deseja iniciar a conexão e informa seu número inicial de sequência. O servidor responde **SYN-ACK**: reconhece o pedido e anuncia a própria sequência. O cliente confirma com **ACK**. Esse é o handshake clássico de três mensagens.\n\nO handshake não é uma 'troca de certificados': isso pertence ao TLS que pode acontecer depois. A banca costuma misturar camadas. Pergunte-se: estamos estabelecendo transporte (TCP), autenticação/cifra (TLS) ou solicitando um recurso web (HTTP)? São responsabilidades diferentes, embora trabalhem juntas."
      },
      {
        "title": "Controle de fluxo e controle de congestionamento",
        "body": "Há dois motivos diferentes para diminuir a velocidade de envio. O primeiro é **o receptor não conseguir consumir os dados**. Nesse caso, ele anuncia uma janela de recepção, **rwnd**. Se o programa receptor estiver lento, a rwnd pode diminuir ou até zerar: o emissor respeita o limite para não lotar o buffer alheio.\n\nO segundo problema é **a rede ficar sobrecarregada**. Nesse caso entram os algoritmos de controle de congestionamento e a janela **cwnd**, calculada pelo emissor conforme condições da rede. O limite prático de dados em trânsito é influenciado pelo menor valor entre rwnd e cwnd. Assim, uma rwnd pequena não prova perda de pacotes ou problema no roteador."
      },
      {
        "title": "O que significa retransmitir",
        "body": "Se o emissor não receber confirmação a tempo, pode retransmitir informações. Com ACKs e mecanismos de detecção de perda, o protocolo evita que o aplicativo receba duplicações indevidas de bytes. Entretanto, um sistema de negócio precisa tratar suas próprias repetições: **TCP confiável não significa que a operação de pagamento seja idempotente**.\n\nExemplo: a aplicação envia 'confirmar agendamento', a resposta se perde e o cliente envia novamente a requisição. O transporte não decide se o agendamento foi feito duas vezes; a aplicação deve usar controles apropriados, como identificadores de operação."
      }
    ],
    "worked": {
      "title": "Por que um servidor lento limita o cliente?",
      "body": "**Situação.** Um cliente envia um arquivo para um servidor. O caminho suporta bastante tráfego, mas o aplicativo servidor está processando registros lentamente. O TCP do servidor anuncia **rwnd = 4 KB**; o controle de congestionamento do cliente permitiria **cwnd = 12 KB**.\n\n**Passo 1 — Identifique os limites.** rwnd representa quanto o receptor aceita naquele momento; cwnd representa o quanto o emissor aceita colocar no caminho considerando o congestionamento.\n\n**Passo 2 — Compare.** O menor limite é 4 KB. Simplificando e desconsiderando detalhes de bytes já confirmados ou pendentes, ele é o teto relevante para os dados não confirmados.\n\n**Passo 3 — Conclua.** O gargalo observado é **controle de fluxo**, não necessariamente congestão de rede.\n\n**Como pode cair:** se o enunciado disser 'o receptor anuncia janela quase zero', procure a alternativa sobre capacidade do receptor, não sobre sinal de perda no roteador."
    },
    "pitfalls": [
      "TCP trata fluxo de bytes, não preserva automaticamente os limites das mensagens da aplicação.",
      "ACK significa confirmação de bytes recebidos, não que a aplicação concluiu a tarefa de negócio.",
      "Controle de fluxo (rwnd) e controle de congestionamento (cwnd) têm causas diferentes.",
      "TLS pode usar TCP como transporte, mas segurança criptográfica não é função nativa do TCP."
    ],
    "review": [
      {
        "ask": "Qual é a ordem do handshake TCP clássico?",
        "answer": "SYN → SYN-ACK → ACK, para estabelecer a conexão de transporte."
      },
      {
        "ask": "Qual diferença entre rwnd e cwnd?",
        "answer": "rwnd limita o envio pela capacidade do receptor; cwnd limita conforme condições de congestionamento da rede."
      },
      {
        "ask": "TCP criptografa os dados sozinho?",
        "answer": "Não. TCP oferece transporte confiável e ordenado; TLS pode acrescentar criptografia."
      },
      {
        "ask": "O ACK de TCP garante que o agendamento foi realizado no sistema?",
        "answer": "Não. Confirma recebimento do fluxo no nível de transporte, não a operação da aplicação."
      }
    ]
  },
  "33": {
    "id": 33,
    "goal": "Aplicar as seis funções do NIST CSF 2.0 a situações reais e diferenciar governança de execução técnica.",
    "steps": [
      {
        "title": "Por que existe um framework de cibersegurança?",
        "body": "Uma organização pode instalar antivírus e firewall e ainda ter riscos graves: não sabe quem aprova mudanças, desconhece servidores críticos, não testa restauração e não cobra os fornecedores. O **NIST CSF 2.0** ajuda a organizar **resultados de gestão de risco**, e não apenas uma lista de programas que precisam ser instalados.\n\nO CSF serve como linguagem comum entre direção, equipe técnica e parceiros. A organização compara sua situação atual com resultados desejados e decide o que priorizar segundo risco, recursos e contexto. Usar o framework não constitui, por si só, uma certificação ou prova de conformidade legal."
      },
      {
        "title": "Conheça as seis funções pelo que fazem",
        "body": "**Governar (Govern)** define estratégia, responsabilidades, políticas, supervisão e abordagem de riscos, incluindo relações com terceiros. **Identificar (Identify)** estabelece o que a organização possui, quais serviços dependem de quais ativos e que riscos existem. **Proteger (Protect)** reúne salvaguardas como gestão de identidades, capacitação e controles técnicos.\n\n**Detectar (Detect)** busca sinais de atividade suspeita e incidentes. **Responder (Respond)** trata um incidente identificado, incluindo análise, contenção, comunicação e coordenação. **Recuperar (Recover)** restabelece serviços e capacidades após o evento. As funções são relacionadas e podem ocorrer simultaneamente: não são seis etapas rígidas que uma equipe precisa concluir em sequência."
      },
      {
        "title": "Como diferenciar governança e operação",
        "body": "Considere uma clínica que utiliza um PACS externo. A diretoria estabelece que serviços críticos devem ter acordos de disponibilidade, define quem pode aceitar riscos e exige avaliação periódica de fornecedores. Isso é principalmente **Governar**. A TI realiza inventário de ativos (**Identificar**), configura MFA (**Proteger**), monitora logs (**Detectar**), isola uma conta comprometida (**Responder**) e restaura o serviço (**Recuperar**).\n\nA banca frequentemente apresenta controles técnicos e pergunta pela função. Leia o **objetivo da atividade**, não apenas o nome do sistema. Um relatório de logs pode ser produzido para detecção; a decisão de exigir auditorias periódicas é governança."
      },
      {
        "title": "Transforme uma lacuna em plano de ação",
        "body": "Imagine encontrar backups diários, mas nenhum teste de restauração. A lacuna não é 'falta de backup'; é falta de evidência de **recuperabilidade**. Identifique serviço afetado, impacto de indisponibilidade, responsável, teste necessário, frequência e critério de sucesso.\n\nUma medida só se torna gerenciável quando há alguém responsável, prazo e resultado observável. O CSF descreve **o resultado de segurança esperado**; ferramentas e processos concretos dependem da organização. Essa distinção explica por que frameworks de resultado não substituem análise de risco."
      }
    ],
    "worked": {
      "title": "Classifique seis decisões de uma clínica",
      "body": "Uma organização realiza as seguintes atividades: (1) aprova uma política de riscos; (2) lista servidores críticos; (3) ativa MFA; (4) cria alerta para logins suspeitos; (5) bloqueia credencial comprometida; (6) testa a restauração do PACS após incidente.\n\n**Etapa 1.** A política e a supervisão pertencem a **Governar**, porque estabelecem direção e responsabilidade.\n\n**Etapa 2.** Inventário corresponde a **Identificar**; MFA, a **Proteger**; alerta, a **Detectar**.\n\n**Etapa 3.** Bloquear conta durante incidente corresponde a **Responder**; retomar funcionamento com restauração corresponde a **Recuperar**.\n\n**Conclusão.** Não escolha pela ordem temporal, mas pelo resultado de segurança associado. Referência: [NIST CSF 2.0 — perguntas frequentes](https://www.nist.gov/cyberframework/faqs)."
    },
    "pitfalls": [
      "Governar não é uma configuração de firewall; envolve decisões organizacionais e supervisão.",
      "O CSF 2.0 possui seis funções; Govern é uma função central adicional em relação à forma clássica mais conhecida do CSF 1.1.",
      "As funções não são uma sequência obrigatória; proteção e detecção são esforços contínuos.",
      "Adotar o framework não comprova automaticamente atendimento à LGPD nem dispensa evidências."
    ],
    "review": [
      {
        "ask": "Quais são as seis funções do NIST CSF 2.0?",
        "answer": "Governar, Identificar, Proteger, Detectar, Responder e Recuperar."
      },
      {
        "ask": "A direção decide quem aceita riscos de fornecedor. Qual função?",
        "answer": "Governar: estratégia, atribuições, políticas e supervisão de risco."
      },
      {
        "ask": "Ativar MFA pertence principalmente a qual função?",
        "answer": "Proteger, pois estabelece salvaguarda de identidade e acesso."
      },
      {
        "ask": "Testar a retomada após um incidente se relaciona a qual função?",
        "answer": "Recuperar, enquanto políticas de testes e responsáveis também envolvem governança."
      }
    ]
  },
  "38": {
    "id": 38,
    "goal": "Explicar a função de domínio, OU, LDAP, Kerberos, DNS e GPO num ambiente Active Directory e diagnosticar falhas sem confundir conceitos.",
    "steps": [
      {
        "title": "Active Directory: diretório, identidades e estrutura",
        "body": "Imagine que vinte computadores de uma instituição exigem as mesmas regras de senha, impressora e acesso. Configurar cada máquina isoladamente é trabalhoso. O **Active Directory Domain Services (AD DS)** reúne identidades de usuários, computadores e grupos em um **domínio**. Controladores de domínio mantêm informações de diretório e prestam serviços relacionados à autenticação.\n\nDentro do domínio, **unidades organizacionais (OUs)** ajudam a estruturar objetos e delegar administração. Uma OU não é a mesma coisa que um grupo de segurança: grupos são usados, entre outras finalidades, para atribuir permissões; OUs organizam objetos e são pontos de aplicação de políticas."
      },
      {
        "title": "LDAP consulta, Kerberos autentica",
        "body": "**LDAP** é protocolo para acessar informações do diretório, por exemplo localizar um usuário ou consultar atributos. **Kerberos** é protocolo de autenticação baseado em tickets, muito utilizado em domínios Windows. Ambos podem aparecer no mesmo ambiente, mas não são sinônimos.\n\nNo fluxo simplificado, um usuário entra com credenciais, obtém tickets emitidos com apoio do serviço de autenticação do domínio e utiliza tickets de serviço para acessar recursos compatíveis. Se uma conta foi autenticada, isso ainda não significa que possui autorização para abrir qualquer compartilhamento. A checagem de permissões e grupos é outra etapa."
      },
      {
        "title": "DNS e políticas de grupo",
        "body": "O **DNS** tem papel fundamental na localização dos serviços do AD. Máquinas do domínio precisam consultar registros adequados para encontrar controladores de domínio. Um computador apontado para um DNS externo, sem resolução dos registros internos necessários, pode falhar na autenticação ou no ingresso no domínio mesmo tendo acesso à Internet.\n\nAs **Group Policy Objects (GPOs)** aplicam configurações a usuários e computadores conforme vínculo, escopo, herança e filtros. Uma política de computador vinculada a OU que contém apenas contas de usuário pode não atingir os computadores pretendidos. Sempre verifique **onde está o objeto** e **a que conjunto de configurações a política se refere**."
      },
      {
        "title": "Um diagnóstico ordenado evita tentativas aleatórias",
        "body": "Quando um usuário informa 'o compartilhamento não abre', primeiro descubra se o computador está conectado à rede, resolve o nome correto e alcança o servidor. Depois verifique autenticação e permissão de acesso ao recurso. Se o problema ocorrer após mudança de GPO, confira a OU, o vínculo e a aplicação de políticas.\n\nNão é adequado desligar firewall ou distribuir permissões de administrador como primeira tentativa: isso mascara sintomas e amplia o risco. Em concursos, a alternativa correta costuma separar conectividade, autenticação, autorização e política de configuração."
      }
    ],
    "worked": {
      "title": "Por que a GPO não chega aos computadores?",
      "body": "**Cenário.** A equipe deseja configurar bloqueio automático de tela dos computadores do laboratório. A GPO com configuração de computador foi vinculada à OU **Funcionários**, mas os computadores estão na OU **Estações**.\n\n**Passo 1 — Identifique o alvo.** Trata-se de configuração de **computador**, não de configuração da conta do usuário.\n\n**Passo 2 — Verifique o escopo.** O vínculo com a OU dos usuários não significa que as contas de computadores em outra OU vão receber a política automaticamente.\n\n**Passo 3 — Corrija o raciocínio.** A política precisa alcançar o escopo adequado dos computadores, respeitando herança e filtros. Depois é necessário verificar a aplicação efetiva com ferramentas de resultado de políticas.\n\n**Conclusão.** O problema central é **escopo da GPO** — não LDAP e nem Kerberos."
    },
    "pitfalls": [
      "Grupo de segurança serve à autorização; OU serve à organização, delegação e escopo de políticas.",
      "Autenticação bem-sucedida não concede autorização automática a todo recurso.",
      "DNS interno inadequado pode quebrar descoberta do controlador mesmo com navegação web funcionando.",
      "LDAP não é o mecanismo principal de tickets do domínio; isso é característico de Kerberos."
    ],
    "review": [
      {
        "ask": "LDAP e Kerberos têm a mesma função?",
        "answer": "Não. LDAP consulta diretórios; Kerberos autentica usando tickets."
      },
      {
        "ask": "Qual a diferença entre OU e grupo de segurança?",
        "answer": "OU organiza objetos e escopo de GPO; grupo ajuda a atribuir permissões."
      },
      {
        "ask": "Por que o DNS é importante no AD?",
        "answer": "Ajudar a localizar os serviços e controladores de domínio necessários."
      },
      {
        "ask": "O usuário entra no domínio mas não acessa pasta. Qual distinção investigar?",
        "answer": "Autenticação versus autorização: checar permissões do compartilhamento e do sistema de arquivos."
      }
    ]
  }
};
