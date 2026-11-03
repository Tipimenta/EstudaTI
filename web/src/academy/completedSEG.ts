import type {PedagogicalLesson} from './intro1'
export const completedSEG:PedagogicalLesson[]=[
  {
    "id": 30,
    "title": "PKI, certificados e TLS",
    "goal": "Explicar e aplicar: PKI, certificados e TLS.",
    "steps": [
      {
        "title": "O que é PKI, certificados e TLS e para que serve?",
        "body": "Certificados digitais vinculam uma chave pública a uma identidade, conforme confiança em uma autoridade certificadora. Um cliente valida cadeia de confiança, nome e validade. TLS protege confidencialidade e integridade em trânsito.\n\n**Veja o conceito aplicado:** Erro de hostname em HTTPS ocorre quando o certificado não corresponde ao nome acessado; simplesmente ignorar o alerta é inseguro."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual informação central é vinculada à identidade em um certificado digital?\n\n**Resposta fundamentada:** Uma chave pública.\n\n**Por que essa é a resposta:** O certificado associa identidade e chave pública."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Um certificado TLS válido para api.exemplo.org é apresentado ao navegador para outro nome não abrangido pelo certificado. Qual verificação tende a falhar?\n\n**Resposta fundamentada:** Correspondência entre certificado e nome do host.\n\n**Por que essa é a resposta:** A validação TLS inclui nome do servidor, cadeia de confiança e período de validade, entre outros critérios.\n\n**Atenção ao limite do conceito:** Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: PKI, certificados e TLS",
      "body": "**1. Identifique a pergunta e o assunto.** Na verificação de TLS, incompatibilidade entre domínio acessado e certificado aponta para:\n\n**2. Recupere a regra que explica a resposta.** A validação confere se o nome do certificado corresponde ao host.\n\n**3. Aplique ao cenário e conclua.** Falha na validação de identidade."
    },
    "pitfalls": [
      "Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades.",
      "Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades."
    ],
    "review": [
      {
        "ask": "Qual informação central é vinculada à identidade em um certificado digital?",
        "answer": "Uma chave pública. O certificado associa identidade e chave pública."
      },
      {
        "ask": "Na verificação de TLS, incompatibilidade entre domínio acessado e certificado aponta para:",
        "answer": "Falha na validação de identidade. A validação confere se o nome do certificado corresponde ao host."
      },
      {
        "ask": "Qual armadilha evitar em PKI, certificados e TLS?",
        "answer": "Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades."
      }
    ],
    "extra": ""
  },
  {
    "id": 31,
    "title": "Resposta a incidentes e evidências",
    "goal": "Explicar e aplicar: Resposta a incidentes e evidências.",
    "steps": [
      {
        "title": "O que é Resposta a incidentes e evidências e para que serve?",
        "body": "Resposta a incidentes envolve preparação, detecção/análise, contenção, erradicação, recuperação e lições aprendidas, com variantes conforme o referencial. Registre horário, origem, ações e evidências para investigar e comunicar adequadamente.\n\n**Veja o conceito aplicado:** Ao identificar conta comprometida: acione o plano, preserve logs, isole acesso conforme análise e recupere serviço com segurança."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual é um dos objetivos da etapa de contenção de incidentes?\n\n**Resposta fundamentada:** Limitar propagação e danos.\n\n**Por que essa é a resposta:** Contenção busca reduzir impacto enquanto a investigação continua."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Por que registrar cadeia de custódia de evidências?\n\n**Resposta fundamentada:** Preservar rastreabilidade de coleta e manuseio.\n\n**Por que essa é a resposta:** Rastreabilidade ajuda a demonstrar integridade e origem da evidência.\n\n**Atenção ao limite do conceito:** Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Resposta a incidentes e evidências",
      "body": "**1. Identifique a pergunta e o assunto.** Um analista coleta evidência de incidente e registra hash e cadeia de custódia. Qual objetivo principal?\n\n**2. Recupere a regra que explica a resposta.** Hash e registro de manuseio ajudam a demonstrar preservação e rastreabilidade; não provam sozinhos autoria do ataque.\n\n**3. Aplique ao cenário e conclua.** Preservar integridade e rastreabilidade da evidência."
    },
    "pitfalls": [
      "Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências.",
      "Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências."
    ],
    "review": [
      {
        "ask": "Qual é um dos objetivos da etapa de contenção de incidentes?",
        "answer": "Limitar propagação e danos. Contenção busca reduzir impacto enquanto a investigação continua."
      },
      {
        "ask": "Por que registrar cadeia de custódia de evidências?",
        "answer": "Preservar rastreabilidade de coleta e manuseio. Rastreabilidade ajuda a demonstrar integridade e origem da evidência."
      },
      {
        "ask": "Qual armadilha evitar em Resposta a incidentes e evidências?",
        "answer": "Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências."
      }
    ],
    "extra": ""
  },
  {
    "id": 32,
    "title": "Cópias de segurança e ransomware",
    "goal": "Explicar e aplicar: Cópias de segurança e ransomware.",
    "steps": [
      {
        "title": "O que é Cópias de segurança e ransomware e para que serve?",
        "body": "A estratégia 3-2-1 é uma heurística: múltiplas cópias, mídias/tipos diferentes e ao menos uma cópia separada; variantes incluem backup offline/imutável. RPO mede perda máxima de dados tolerável; RTO mede tempo de recuperação desejado.\n\n**Veja o conceito aplicado:** RPO de 1 hora pede estratégia que limite a perda de alterações a aproximadamente uma hora; RTO de 4 horas orienta capacidade de restaurar dentro desse prazo."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Há duas cópias de backup na mesma sala física. Qual risco permanece especialmente relevante?\n\n**Resposta fundamentada:** Falha de uma fonte única de alimentação e desastre local.\n\n**Por que essa é a resposta:** Um único incidente físico pode destruir as duas cópias; segregação e testes de restauração fortalecem continuidade."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual indicador mede perda de dados aceitável em janela de tempo?\n\n**Resposta fundamentada:** RPO.\n\n**Por que essa é a resposta:** Recovery Point Objective relaciona-se ao ponto até o qual recuperar dados.\n\n**Atenção ao limite do conceito:** Backup que nunca foi restaurado em teste não comprova recuperação."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Cópias de segurança e ransomware",
      "body": "**1. Identifique a pergunta e o assunto.** Qual prática aumenta confiança na estratégia de backup?\n\n**2. Recupere a regra que explica a resposta.** Testes de restauração validam recuperabilidade, não apenas existência de cópias.\n\n**3. Aplique ao cenário e conclua.** Teste periódico de restauração."
    },
    "pitfalls": [
      "Backup que nunca foi restaurado em teste não comprova recuperação.",
      "Backup que nunca foi restaurado em teste não comprova recuperação."
    ],
    "review": [
      {
        "ask": "Qual indicador mede perda de dados aceitável em janela de tempo?",
        "answer": "RPO. Recovery Point Objective relaciona-se ao ponto até o qual recuperar dados."
      },
      {
        "ask": "Qual prática aumenta confiança na estratégia de backup?",
        "answer": "Teste periódico de restauração. Testes de restauração validam recuperabilidade, não apenas existência de cópias."
      },
      {
        "ask": "Qual armadilha evitar em Cópias de segurança e ransomware?",
        "answer": "Backup que nunca foi restaurado em teste não comprova recuperação."
      }
    ],
    "extra": ""
  },
  {
    "id": 33,
    "title": "NIST CSF 2.0 e governança",
    "goal": "Explicar e aplicar: NIST CSF 2.0 e governança.",
    "steps": [
      {
        "title": "O que é NIST CSF 2.0 e governança e para que serve?",
        "body": "O NIST CSF 2.0 organiza resultados em seis funções: Govern, Identify, Protect, Detect, Respond e Recover. Govern foi enfatizada como função de governança, supervisão de riscos e responsabilidades. O framework descreve resultados, não uma lista única de ferramentas obrigatórias.\n\n**Veja o conceito aplicado:** Uma política de risco aprovada se relaciona à função Govern; inventário de ativos se alinha a Identify."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Em qual função do NIST CSF 2.0 se encaixa a gestão de inventário e identificação de ativos?\n\n**Resposta fundamentada:** Identify.\n\n**Por que essa é a resposta:** Identify aborda entendimento de ativos e contexto de riscos."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual função do NIST CSF 2.0 enfatiza atribuições organizacionais, políticas e supervisão?\n\n**Resposta fundamentada:** Governar.\n\n**Por que essa é a resposta:** GV estabelece contexto, estratégia, responsabilidades, políticas e supervisão; as demais funções executam outras ações de gestão de riscos.\n\n**Atenção ao limite do conceito:** CSF 2.0 não é uma certificação automática, nem uma lei brasileira."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: NIST CSF 2.0 e governança",
      "body": "**1. Identifique a pergunta e o assunto.** Qual função foi explicitamente incorporada ao núcleo do NIST CSF 2.0?\n\n**2. Recupere a regra que explica a resposta.** Govern explicita governança no núcleo do CSF 2.0.\n\n**3. Aplique ao cenário e conclua.** Govern."
    },
    "pitfalls": [
      "CSF 2.0 não é uma certificação automática, nem uma lei brasileira.",
      "CSF 2.0 não é uma certificação automática, nem uma lei brasileira."
    ],
    "review": [
      {
        "ask": "Qual função foi explicitamente incorporada ao núcleo do NIST CSF 2.0?",
        "answer": "Govern. Govern explicita governança no núcleo do CSF 2.0."
      },
      {
        "ask": "Em qual função do NIST CSF 2.0 se encaixa a gestão de inventário e identificação de ativos?",
        "answer": "Identify. Identify aborda entendimento de ativos e contexto de riscos."
      },
      {
        "ask": "Qual armadilha evitar em NIST CSF 2.0 e governança?",
        "answer": "CSF 2.0 não é uma certificação automática, nem uma lei brasileira."
      }
    ],
    "extra": ""
  },
  {
    "id": 34,
    "title": "OWASP Top 10 e aplicações",
    "goal": "Explicar e aplicar: OWASP Top 10 e aplicações.",
    "steps": [
      {
        "title": "O que é OWASP Top 10 e aplicações e para que serve?",
        "body": "Segurança de aplicações envolve controles no projeto, na implementação e na operação. Controle de acesso quebrado permite agir fora das permissões; injection ocorre quando dados não confiáveis interferem na interpretação de comandos ou consultas. Parametrização previne classes importantes de SQL Injection.\n\n**Veja o conceito aplicado:** Em vez de montar SELECT concatenando texto de formulário, utilize parâmetros vinculados pelo driver do banco."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual falha permite que usuário comum acesse recurso restrito a administradores?\n\n**Resposta fundamentada:** Controle de acesso quebrado.\n\n**Por que essa é a resposta:** A autorização incorreta é uma falha de controle de acesso."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual técnica é prioritária para reduzir risco de SQL Injection?\n\n**Resposta fundamentada:** Consultas parametrizadas.\n\n**Por que essa é a resposta:** Parâmetros evitam interpretar valores externos como parte da sintaxe SQL.\n\n**Atenção ao limite do conceito:** Validar entrada só no navegador não dispensa validação e autorização no servidor."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: OWASP Top 10 e aplicações",
      "body": "**1. Identifique a pergunta e o assunto.** Uma API concatena entrada do usuário em instrução SQL sem parametrização. Qual risco clássico é exemplificado?\n\n**2. Recupere a regra que explica a resposta.** Construir SQL por concatenação de entrada pode permitir alterar a consulta; parametrização é controle essencial.\n\n**3. Aplique ao cenário e conclua.** SQL injection."
    },
    "pitfalls": [
      "Validar entrada só no navegador não dispensa validação e autorização no servidor.",
      "Validar entrada só no navegador não dispensa validação e autorização no servidor."
    ],
    "review": [
      {
        "ask": "Qual técnica é prioritária para reduzir risco de SQL Injection?",
        "answer": "Consultas parametrizadas. Parâmetros evitam interpretar valores externos como parte da sintaxe SQL."
      },
      {
        "ask": "Qual falha permite que usuário comum acesse recurso restrito a administradores?",
        "answer": "Controle de acesso quebrado. A autorização incorreta é uma falha de controle de acesso."
      },
      {
        "ask": "Qual armadilha evitar em OWASP Top 10 e aplicações?",
        "answer": "Validar entrada só no navegador não dispensa validação e autorização no servidor."
      }
    ],
    "extra": ""
  },
  {
    "id": 94,
    "title": "Risco, controles e NIST CSF 2.0",
    "goal": "Distinguir ativo, ameaça, vulnerabilidade, risco, tratamento e função do NIST CSF.",
    "steps": [
      {
        "title": "Compreenda Risco, controles e NIST CSF 2.0",
        "body": "Segurança da informação não se resume ao trio **confidencialidade, integridade e disponibilidade** (CID). Autenticidade, responsabilização e capacidade de recuperação importam conforme o contexto. O risco pode ser descrito pela possibilidade de um evento afetar objetivos, considerando probabilidade e impacto, conforme metodologia adotada. Um **ativo** é algo que tem valor; uma **ameaça** é fonte potencial de dano; uma **vulnerabilidade** é fraqueza explorável; um **controle** altera o risco. Evite confundir impacto com probabilidade."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "O **NIST CSF 2.0** apresenta seis funções contínuas: Governar (Govern), Identificar, Proteger, Detectar, Responder e Recuperar. Não são fases obrigatoriamente sequenciais. Governar inclui contexto, estratégia, papéis, políticas, risco na cadeia de suprimentos e supervisão. Identificar envolve ativos e riscos. Proteger inclui gestão de identidade, treinamento e proteção de dados. Detectar monitora eventos; Responder contém incidentes; Recuperar restaura serviços e comunica progresso. O CSF descreve resultados desejados, não prescreve uma tecnologia específica."
      },
      {
        "title": "Observe as relações e condições",
        "body": "Um controle pode ser preventivo (MFA), detectivo (alerta de log) ou corretivo (reestabelecimento de serviço). Essas classificações são funções analíticas e um mesmo mecanismo pode desempenhar mais de um papel. Não confunda “tem firewall” com “governança e segurança estão completas”."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Risco, controles e NIST CSF 2.0",
      "body": "Clínica com PACS local e backup na mesma sala: ativo = imagens médicas e serviços; ameaça = incêndio/ransomware; vulnerabilidade = cópia única ou sem isolamento adequado; impactos = indisponibilidade do atendimento e perda de dados.\n\nPasso 1: identificar processos críticos, requisitos de recuperação e responsáveis. Passo 2: mapear cópias, privilégios, dependências e fornecedores. Passo 3: definir tratamento: cópia segregada, testes de restauração e controle de acesso. Passo 4: registrar evidências e acompanhar efetividade.\n\nA prova pode perguntar onde se enquadra uma política formal de gestão de fornecedores: principalmente **Governar**, não apenas Proteger. Um alerta em SIEM se associa a Detectar; um procedimento de contenção e erradicação, a Responder; retorno controlado do PACS, a Recuperar."
    },
    "pitfalls": [
      "Não extrapole o enunciado: use os dados e condições específicos de Risco, controles e NIST CSF 2.0.",
      "Não extrapole o enunciado: use os dados e condições específicos de Risco, controles e NIST CSF 2.0."
    ],
    "review": [
      {
        "ask": "Quais são as seis funções do NIST CSF 2.0?",
        "answer": "Govern, Identify, Protect, Detect, Respond, Recover."
      },
      {
        "ask": "Diferença entre ameaça e vulnerabilidade?",
        "answer": "Ameaça é fonte potencial de evento danoso; vulnerabilidade é fragilidade que pode ser explorada."
      }
    ],
    "extra": ""
  },
  {
    "id": 95,
    "title": "Criptografia, TLS, hashes e IAM",
    "goal": "Relacionar propriedades criptográficas e controles de identidade sem confundir conceitos.",
    "steps": [
      {
        "title": "Compreenda Criptografia, TLS, hashes e IAM",
        "body": "**Criptografia simétrica** utiliza a mesma chave secreta para cifrar e decifrar (ex.: AES); costuma ser eficiente para dados em volume. **Assimétrica** utiliza pares de chaves pública/privada (ex.: RSA e criptografia de curvas elípticas, conforme esquema), com aplicações como assinatura, troca/encapsulamento de chaves e estabelecimento de confiança. O uso concreto depende do algoritmo, modo e protocolo; não presuma que “qualquer cifra assimétrica cifra um arquivo inteiro”."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "**Hash criptográfico** produz resumo de tamanho definido, usado para integridade, assinaturas e outros protocolos. Hash não é reversível como cifra; senhas devem usar funções de derivação adequadas com salt e parâmetros custosos, e não apenas SHA-256 direto. Uma **assinatura digital** normalmente assina hash/representação com chave privada e é verificada com chave pública, sustentando integridade e autenticidade da origem conforme o esquema. Cifra por si só não dá garantia equivalente de assinatura."
      },
      {
        "title": "Observe as relações e condições",
        "body": "**TLS** autentica endpoints conforme certificados e configurações e protege confidencialidade e integridade do canal. Cadeias de certificação precisam ser validadas; HTTPS não significa que o próprio site seja honesto. Em IAM, diferencie autenticação (identidade), autorização (permissão) e auditoria (registro). MFA exige fatores de categorias distintas, como senha (conhecimento) + chave de segurança física (posse); duas senhas não constituem MFA."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Criptografia, TLS, hashes e IAM",
      "body": "Considere uma aplicação de exames que permite acesso externo: 1) gere conexão HTTPS com certificado para nome de domínio correto; 2) exija identidade individual e MFA em perfis privilegiados; 3) atribua permissões por função e necessidade; 4) registre acesso a dados sensíveis; 5) proteja dados em repouso com gestão apropriada de chaves.\n\nSe um arquivo sofre alteração, um hash previamente registrado pode indicar diferença, mas isoladamente não comprova quem publicou o hash. Se for necessário comprovar procedência, acrescente mecanismo de assinatura/autenticação. Se o navegador mostra certificado inválido, não “resolva” permanentemente desativando validação TLS. A prova pode oferecer “criptografia assimétrica sempre é mais rápida que AES” como alternativa falsa."
    },
    "pitfalls": [
      "criptografia não elimina necessidade de controle de acesso. **Pegadinha:** hash não é compressão recuperável. **Pegadinha:** MFA não é “digitar a mesma senha duas vezes”. **Pegadinha:** sessão HTTPS válida não impede phishing. **Pegadinha:** chave pública não deve ser confundida com segredo: é destinada à distribuição, enquanto a privada exige proteção.",
      "Não extrapole o enunciado: use os dados e condições específicos de Criptografia, TLS, hashes e IAM."
    ],
    "review": [
      {
        "ask": "Hash e criptografia têm o mesmo objetivo?",
        "answer": "Não: hash é resumo unidirecional para verificação, enquanto cifra busca confidencialidade com decriptação autorizada."
      },
      {
        "ask": "Qual é a diferença entre autenticação e autorização?",
        "answer": "Autenticação comprova identidade; autorização determina os recursos e ações permitidos."
      }
    ],
    "extra": ""
  },
  {
    "id": 96,
    "title": "Incidentes, continuidade, RTO/RPO e recuperação",
    "goal": "Planejar respostas defensivas e distinguir metas de tempo e perda aceitável.",
    "steps": [
      {
        "title": "Compreenda Incidentes, continuidade, RTO/RPO e recuperação",
        "body": "**Evento** é ocorrência observada; **incidente de segurança** envolve comprometimento real ou potencial que requer processo de resposta. A resposta pode incluir preparação, identificação/análise, contenção, erradicação, recuperação e lições aprendidas. O encadeamento exato depende do referencial; nenhuma etapa dispensa gestão de evidências e comunicação."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "**RTO** (Recovery Time Objective) é o tempo-alvo de restauração de uma atividade ou serviço. **RPO** (Recovery Point Objective) é o ponto máximo de perda de dados tolerável medido em tempo. Se backup acontece a cada 24h, a perda potencial desde o último backup pode chegar perto de 24h; isso não demonstra RPO de uma hora. **Backup**, **replicação**, **alta disponibilidade** e **plano de continuidade** não são sinônimos: replicação também pode replicar corrupção, e alta disponibilidade não garante cópia histórica segura."
      },
      {
        "title": "Observe as relações e condições",
        "body": "Estratégia prática defensiva: classificar criticidade, manter inventário, segmentar acessos, ter cópias segregadas e imutáveis quando viável, testar recuperação em ambiente controlado, definir comunicação e exercícios. Logs devem ser preservados com cuidado e acesso restrito; não reinstale imediatamente uma máquina comprometida sem avaliar preservação de evidências e orientação dos responsáveis."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Incidentes, continuidade, RTO/RPO e recuperação",
      "body": "Uma clínica recebe alertas de criptografia indevida em um servidor. Primeiro, acione o plano de resposta, valide os indícios e contenha propagação conforme procedimento autorizado; preserve registros e envolva responsáveis. Não religue serviços suspeitos sem análise. Em paralelo, decida com os gestores quais atendimentos podem continuar degradados.\n\nSistema A: a organização admite no máximo 2h sem funcionar (RTO=2h) e perder no máximo 15min de atualizações (RPO=15min). Um backup noturno não cumpre automaticamente esse RPO. A solução técnica deve corresponder às metas e passar por testes documentados.\n\nNo pós-incidente, identifique causa, gaps de detecção e prevenção, atualize runbooks e registre testes. A questão de prova pode trocar “RTO” por “perda de dados aceitável”, uma confusão frequente."
    },
    "pitfalls": [
      "RTO = tempo de recuperação, não intervalo de backup. **Pegadinha 2:** RPO se refere à antiguidade tolerável dos dados recuperados. **Pegadinha 3:** replicação contínua sem versionamento pode perpetuar alterações maliciosas. **Pegadinha 4:** estabilidade de rede não substitui plano de comunicação com a direção e áreas de negócio.",
      "Não extrapole o enunciado: use os dados e condições específicos de Incidentes, continuidade, RTO/RPO e recuperação."
    ],
    "review": [
      {
        "ask": "RTO e RPO: qual a diferença?",
        "answer": "RTO = prazo-alvo para recuperar o serviço. RPO = quanto de dados, medido em tempo, pode ser perdido."
      },
      {
        "ask": "Por que alta disponibilidade não é igual a backup?",
        "answer": "HA tenta manter serviço ativo após falhas; backup retém cópias recuperáveis, idealmente com histórico e segregação."
      }
    ],
    "extra": ""
  },
  {
    "id": 122,
    "title": "NIST CSF 2.0 e função Govern",
    "goal": "Compreender e aplicar nist csf 2.0 e função govern em provas.",
    "steps": [
      {
        "title": "O que é NIST CSF 2.0 e função Govern e para que serve?",
        "body": "O CSF 2.0 organiza resultados de segurança nas funções Govern, Identify, Protect, Detect, Respond e Recover.\n\nA função Govern define contexto organizacional, estratégia de riscos, papéis, políticas, supervisão e cadeia de fornecimento. As demais funções representam atividades complementares; elas não são estágios rígidos nem uma receita de implantação. Uma empresa pode ter bons firewalls e ainda apresentar lacunas de governança.\n\n**Veja o conceito aplicado:** Uma clínica com MFA, backups e EDR, mas sem política aprovada de terceiros, demonstra controles técnicos sem maturidade equivalente em Govern."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Uma diretoria define apetite a risco, responsabilidades e supervisão de cibersegurança. Essa decisão representa sobretudo:\n\n**Resposta fundamentada:** Governança.\n\n**Por que essa é a resposta:** Apetite, accountability e direção estratégica são elementos centrais da governança de riscos."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Uma clínica com MFA, backups e EDR, mas sem política aprovada de terceiros, demonstra controles técnicos sem maturidade equivalente em Govern.\n\n**A questão pergunta:** Em qual função se enquadram papéis, políticas e supervisão do risco de cibersegurança?\n\n**Resposta fundamentada:** Govern.\n\n**Por que essa é a resposta:** Govern trata do contexto e direcionamento da governança de riscos.\n\n**Não confunda:** Não confunda a função Govern com simples aquisição de ferramentas de segurança."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: NIST CSF 2.0 e função Govern",
      "body": "**1. Identifique a pergunta e o assunto.** Em qual função se enquadram papéis, políticas e supervisão do risco de cibersegurança?\n\n**2. Recupere a regra que explica a resposta.** Govern trata do contexto e direcionamento da governança de riscos.\n\n**3. Aplique ao cenário e conclua.** Govern."
    },
    "pitfalls": [
      "Não confunda a função Govern com simples aquisição de ferramentas de segurança.",
      "Não confunda a função Govern com simples aquisição de ferramentas de segurança."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de NIST CSF 2.0 e função Govern?",
        "answer": "O CSF 2.0 organiza resultados de segurança nas funções Govern, Identify, Protect, Detect, Respond e Recover."
      },
      {
        "ask": "Qual erro de prova evitar em NIST CSF 2.0 e função Govern?",
        "answer": "Não confunda a função Govern com simples aquisição de ferramentas de segurança."
      }
    ],
    "extra": ""
  },
  {
    "id": 123,
    "title": "RTO, RPO e continuidade",
    "goal": "Compreender e aplicar rto, rpo e continuidade em provas.",
    "steps": [
      {
        "title": "O que é RTO, RPO e continuidade e para que serve?",
        "body": "RTO especifica tempo-alvo de recuperação de um serviço; RPO indica a perda de dados máxima tolerável expressa em intervalo de tempo.\n\nRTO de quatro horas significa objetivo de restabelecer um serviço em até quatro horas após interrupção dentro das hipóteses do plano. RPO de uma hora indica que a organização aceita perder até uma hora de alterações em determinado cenário. Backups frequentes ajudam RPO; redundância e procedimentos testados ajudam RTO.\n\n**Veja o conceito aplicado:** Para sistema RIS/PACS, é possível estabelecer RPO de 15 minutos para metadados críticos e RTO diferente para visualizar exames históricos, conforme impacto operacional."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual indicador descreve a janela máxima de dados que pode ser perdida?\n\n**Resposta fundamentada:** RPO.\n\n**Por que essa é a resposta:** O Recovery Point Objective expressa perda de dados em tempo."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Para sistema RIS/PACS, é possível estabelecer RPO de 15 minutos para metadados críticos e RTO diferente para visualizar exames históricos, conforme impacto operacional.\n\n**A questão pergunta:** Um serviço deve voltar em até duas horas e admite perda máxima de dados correspondente a dez minutos. Esses dois objetivos são, respectivamente:\n\n**Resposta fundamentada:** RTO e RPO.\n\n**Por que essa é a resposta:** RTO corresponde à meta de tempo de recuperação; RPO à antiguidade máxima tolerável dos dados recuperados.\n\n**Não confunda:** Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: RTO, RPO e continuidade",
      "body": "**1. Identifique a pergunta e o assunto.** Um serviço deve voltar em até duas horas e admite perda máxima de dados correspondente a dez minutos. Esses dois objetivos são, respectivamente:\n\n**2. Recupere a regra que explica a resposta.** RTO corresponde à meta de tempo de recuperação; RPO à antiguidade máxima tolerável dos dados recuperados.\n\n**3. Aplique ao cenário e conclua.** RTO e RPO."
    },
    "pitfalls": [
      "Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação.",
      "Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de RTO, RPO e continuidade?",
        "answer": "RTO especifica tempo-alvo de recuperação de um serviço; RPO indica a perda de dados máxima tolerável expressa em intervalo de tempo."
      },
      {
        "ask": "Qual erro de prova evitar em RTO, RPO e continuidade?",
        "answer": "Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação."
      }
    ],
    "extra": ""
  },
  {
    "id": 124,
    "title": "Zero Trust e controle de acesso",
    "goal": "Compreender e aplicar zero trust e controle de acesso em provas.",
    "steps": [
      {
        "title": "O que é Zero Trust e controle de acesso e para que serve?",
        "body": "Zero Trust é uma abordagem de segurança que evita confiar automaticamente em identidade ou rede por localização.\n\nDecisões devem considerar autenticação forte, identidade, postura do dispositivo, políticas e sinais contextuais; o acesso deve ser mínimo e continuamente avaliado conforme arquitetura. VPN não substitui segmentação nem controle de autorização. Logs úteis precisam ter integridade, retenção e análise.\n\n**Veja o conceito aplicado:** Um técnico remoto autenticado por VPN continua sujeito a permissões específicas e MFA em serviços sensíveis."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Em uma abordagem Zero Trust, qual decisão é mais coerente?\n\n**Resposta fundamentada:** Verificar continuamente acesso conforme identidade, contexto e menor privilégio.\n\n**Por que essa é a resposta:** Zero Trust evita confiança implícita por localização de rede e favorece verificação contextual, política e privilégio mínimo."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Um técnico remoto autenticado por VPN continua sujeito a permissões específicas e MFA em serviços sensíveis.\n\n**A questão pergunta:** Qual prática é coerente com Zero Trust?\n\n**Resposta fundamentada:** Autorizar cada acesso conforme identidade e contexto.\n\n**Por que essa é a resposta:** A filosofia exige verificação explícita e menor privilégio.\n\n**Não confunda:** Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Zero Trust e controle de acesso",
      "body": "**1. Identifique a pergunta e o assunto.** Qual prática é coerente com Zero Trust?\n\n**2. Recupere a regra que explica a resposta.** A filosofia exige verificação explícita e menor privilégio.\n\n**3. Aplique ao cenário e conclua.** Autorizar cada acesso conforme identidade e contexto."
    },
    "pitfalls": [
      "Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos.",
      "Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Zero Trust e controle de acesso?",
        "answer": "Zero Trust é uma abordagem de segurança que evita confiar automaticamente em identidade ou rede por localização."
      },
      {
        "ask": "Qual erro de prova evitar em Zero Trust e controle de acesso?",
        "answer": "Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos."
      }
    ],
    "extra": ""
  },
  {
    "id": 154,
    "title": "Resposta a incidente com evidências e continuidade",
    "goal": "Priorizar contenção, preservar evidência e definir recuperação com RTO e RPO distintos.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — comportamento suspeito em servidor crítico\nUma organização identifica aumento abrupto de renomeações de arquivos num compartilhamento clínico, enquanto o monitoramento aponta tentativa de execução incomum em estação de trabalho. O gestor recebe a orientação: “reinicie todos os servidores e restaure o backup”. Essa resposta pode destruir evidências, ampliar indisponibilidade e deixar o vetor de entrada aberto. Uma abordagem profissional distingue **triagem, contenção, erradicação e recuperação**, com decisões proporcionais ao risco e coordenadas com os responsáveis."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Plano fundamentado\n**Triagem:** registre tempo, ativos, contas, alertas e alterações confirmadas; classifique criticidade e envolva os responsáveis pela resposta. **Contenção:** com autorização apropriada, isole ativos suspeitos e bloqueie credenciais comprometidas, preservando dados necessários à investigação. A ordem exata depende do risco operacional: desligar um sistema crítico de saúde pode ter impacto assistencial. **Análise:** colete registros disponíveis com cadeia de custódia adequada à finalidade, verifique persistência e escopo. **Erradicação:** remova causa e mecanismos de reinfecção, atualize controles, altere segredos expostos. **Recuperação:** restaure a partir de cópias confiáveis, valide integridade, monitore reinfecção e faça lições aprendidas."
      },
      {
        "title": "Construindo a solução",
        "body": "## RTO e RPO no mesmo cenário\nO serviço de agendamento possui RTO de quatro horas e RPO de quinze minutos. Isso significa **metas diferentes**: restabelecimento do serviço em até quatro horas, sob as condições do plano, e perda de alterações equivalente a no máximo quinze minutos. Não significa que um backup “feito a cada 15 minutos” garante RPO de 15 minutos: é preciso verificar execução, consistência, replicação e restauração. Um sistema que volta em 30 minutos com dados da semana passada pode cumprir o RTO e violar gravemente o RPO."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Resposta a incidente com evidências e continuidade",
      "body": "**A questão pergunta:** Após isolar uma máquina comprometida, o time apaga seus registros antes de documentar o evento. Qual problema principal?\n\n**Resposta fundamentada:** Dificuldade de investigação e perda de evidência.\n\n**Por que essa é a resposta:** Eliminar dados antes de coleta e documentação pode comprometer análise, auditoria e responsabilização."
    },
    "pitfalls": [
      "Uma alternativa incorreta seria **RTO de 15 minutos**. O erro é: RTO limita a duração da interrupção, não a perda temporal de dados.",
      "Não extrapole o enunciado: use os dados e condições específicos de Resposta a incidente com evidências e continuidade."
    ],
    "review": [
      {
        "ask": "Como distinguir RTO de RPO em uma interrupção?",
        "answer": "RTO: meta de tempo para restabelecer serviço; RPO: meta de perda máxima de alterações expressa em tempo."
      },
      {
        "ask": "Por que reiniciar todos os servidores não é resposta padrão a incidente?",
        "answer": "Pode ampliar impacto, destruir evidências e deixar causas de comprometimento ativas."
      }
    ],
    "extra": ""
  },
  {
    "id": 155,
    "title": "Matriz de acesso, MFA e risco residual",
    "goal": "Projetar controles de identidade sem confundir autenticação, autorização e rastreabilidade.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — funcionário precisa acessar três sistemas\nUma equipe de TI administra sistema financeiro, prontuário eletrônico e servidor de arquivos. Um funcionário do suporte solicita permissão de administrador geral “para não precisar abrir chamados”. A medida reduz conveniência operacional imediata, mas expande o impacto de credencial comprometida ou erro humano. O primeiro passo é mapear **papel, recurso, ação permitida e justificativa**. Autenticação prova uma identidade em determinado grau de confiança; autorização decide se a identidade pode praticar uma ação sobre um recurso; auditoria registra a decisão e o uso."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Matriz mínima de autorização\nDefina papéis: atendimento, suporte, gestor de infraestrutura e auditor. Para cada recurso, especifique ações como consultar, alterar, instalar, aprovar e exportar. Em vez de liberar privilégios administrativos permanentes, avalie elevação temporária controlada, contas separadas, revisão periódica e trilhas de auditoria. **MFA** fortalece a etapa de autenticação, mas não impede que uma identidade legitimamente autenticada receba autorizações excessivas. Da mesma forma, VPN protege um canal de acesso, mas não é substituto de regra de menor privilégio."
      },
      {
        "title": "Construindo a solução",
        "body": "## Exemplo de decisão\nO suporte precisa reiniciar serviço de impressão, mas não consultar prontuário nem exportar a base de pacientes. A solução de menor privilégio concede ação específica no recurso necessário e preserva aprovação para elevação emergencial. O papel de auditor pode ler logs, mas não alterá-los. Um usuário com acessos antigos de departamento anterior requer processo de desligamento ou revisão — a recertificação é um controle de ciclo de vida de identidade."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Matriz de acesso, MFA e risco residual",
      "body": "**A questão pergunta:** O funcionário migrou do financeiro para suporte. Qual medida responde ao risco de privilégios acumulados?\n\n**Resposta fundamentada:** Revisar e revogar acessos incompatíveis com a nova função.\n\n**Por que essa é a resposta:** A revisão do ciclo de vida da identidade reduz acúmulo indevido de permissões."
    },
    "pitfalls": [
      "Uma alternativa incorreta seria **Adicionar ao grupo de administradores**. O erro é: Administrador oferece privilégios incompatíveis com a necessidade.",
      "Não extrapole o enunciado: use os dados e condições específicos de Matriz de acesso, MFA e risco residual."
    ],
    "review": [
      {
        "ask": "MFA resolve sozinho excesso de permissões?",
        "answer": "Não. MFA fortalece autenticação; autorização e revisão de privilégios são controles distintos."
      },
      {
        "ask": "O que é risco residual?",
        "answer": "Risco que permanece após tratamento e controles aplicados, sujeito a avaliação e decisão formal."
      }
    ],
    "extra": ""
  }
];
