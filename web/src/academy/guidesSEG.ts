import type {LessonGuide} from './guidesTypes'
export const guidesSEG:LessonGuide[]=[
  {
    "id": 4,
    "code": "SEG",
    "title": "CIA, controle de acesso e autenticação",
    "objective": "Aplicar princípios básicos de segurança.",
    "theory": "A tríade da segurança é confidencialidade, integridade e disponibilidade. Princípio do menor privilégio significa dar apenas os acessos necessários. MFA combina dois ou mais fatores independentes de autenticação.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que significa CIA em segurança?",
        "back": "Confidencialidade, Integridade e Disponibilidade."
      },
      {
        "front": "O que é menor privilégio?",
        "back": "Conceder apenas permissões necessárias à função."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 5,
    "code": "SEG",
    "title": "Criptografia, backup e incidentes",
    "objective": "Diferenciar criptografia e recuperação.",
    "theory": "Criptografia simétrica utiliza a mesma chave para cifrar e decifrar. Criptografia assimétrica usa par de chaves. Cópias de segurança requerem testes de restauração, segregação e retenção. Um plano de resposta a incidentes define papéis e procedimentos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Criptografia simétrica usa quantas chaves principais por operação?",
        "back": "A mesma chave secreta para cifrar e decifrar."
      },
      {
        "front": "Backup sem teste de restauração é suficiente?",
        "back": "Não; testes confirmam a recuperabilidade."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 27,
    "code": "SEG",
    "title": "Gestão de riscos e tratamento",
    "objective": "Explicar e aplicar: Gestão de riscos e tratamento.",
    "theory": "Risco combina incerteza e consequências para objetivos; em segurança é útil analisar cenário, probabilidade e impacto. Respostas comuns: reduzir, aceitar, evitar e compartilhar/transferir. O risco residual permanece após controles.",
    "practical": "Manter backups imutáveis reduz impactos de ransomware, mas não zera risco de indisponibilidade.",
    "warning": "Vulnerabilidade isolada não descreve todo o risco; contexto, ameaça, exposição e impacto importam.",
    "recall": [
      {
        "front": "Como se denomina o risco remanescente após controles?",
        "back": "Risco residual. Risco residual persiste após medidas de tratamento."
      },
      {
        "front": "Comprar seguro para compartilhar parte das consequências financeiras é exemplo de:",
        "back": "Compartilhamento ou transferência de risco. Seguro transfere ou compartilha consequências, sem eliminar o evento."
      },
      {
        "front": "Qual armadilha evitar em Gestão de riscos e tratamento?",
        "back": "Vulnerabilidade isolada não descreve todo o risco; contexto, ameaça, exposição e impacto importam."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 28,
    "code": "SEG",
    "title": "Autenticação multifator e acesso",
    "objective": "Explicar e aplicar: Autenticação multifator e acesso.",
    "theory": "MFA combina fatores de categorias distintas, como algo que você sabe, possui ou é. Dois segredos do mesmo tipo não constituem necessariamente MFA. Privilégio mínimo concede apenas permissões necessárias; revisões periódicas reduzem acessos excessivos.",
    "practical": "Conta administrativa separada para tarefas elevadas reduz exposição do privilégio em navegação cotidiana.",
    "warning": "Senha + PIN são ambos fatores de conhecimento; podem não representar dois fatores independentes.",
    "recall": [
      {
        "front": "Qual combinação tipicamente constitui autenticação multifator?",
        "back": "Senha e token físico. Senha é conhecimento; token é posse."
      },
      {
        "front": "Qual princípio recomenda conceder apenas permissões indispensáveis?",
        "back": "Privilégio mínimo. Least privilege limita acessos ao estritamente necessário."
      },
      {
        "front": "Qual armadilha evitar em Autenticação multifator e acesso?",
        "back": "Senha + PIN são ambos fatores de conhecimento; podem não representar dois fatores independentes."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 29,
    "code": "SEG",
    "title": "Criptografia simétrica, assimétrica e hash",
    "objective": "Explicar e aplicar: Criptografia simétrica, assimétrica e hash.",
    "theory": "Algoritmos simétricos usam chave compartilhada. Assimétricos utilizam par pública/privada e suportam operações como assinatura e troca de chaves. Hash criptográfico produz resumo para integridade; sem segredo não equivale à criptografia reversível.",
    "practical": "TLS combina mecanismos criptográficos: negociação/autenticação, segredos de sessão e criptografia simétrica do tráfego.",
    "warning": "Não use hash simples como substituto de armazenamento robusto de senhas; são necessários derivadores adequados e salt.",
    "recall": [
      {
        "front": "Qual técnica utiliza uma mesma chave secreta para cifrar e decifrar?",
        "back": "Criptografia simétrica. Algoritmos simétricos operam com segredo compartilhado."
      },
      {
        "front": "Qual característica é esperada de um hash criptográfico seguro?",
        "back": "Resistência à colisão. Hashes robustos dificultam encontrar entradas distintas com mesma saída."
      },
      {
        "front": "Qual armadilha evitar em Criptografia simétrica, assimétrica e hash?",
        "back": "Não use hash simples como substituto de armazenamento robusto de senhas; são necessários derivadores adequados e salt."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 30,
    "code": "SEG",
    "title": "PKI, certificados e TLS",
    "objective": "Explicar e aplicar: PKI, certificados e TLS.",
    "theory": "Certificados digitais vinculam uma chave pública a uma identidade, conforme confiança em uma autoridade certificadora. Um cliente valida cadeia de confiança, nome e validade. TLS protege confidencialidade e integridade em trânsito.",
    "practical": "Erro de hostname em HTTPS ocorre quando o certificado não corresponde ao nome acessado; simplesmente ignorar o alerta é inseguro.",
    "warning": "Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades.",
    "recall": [
      {
        "front": "Qual informação central é vinculada à identidade em um certificado digital?",
        "back": "Uma chave pública. O certificado associa identidade e chave pública."
      },
      {
        "front": "Na verificação de TLS, incompatibilidade entre domínio acessado e certificado aponta para:",
        "back": "Falha na validação de identidade. A validação confere se o nome do certificado corresponde ao host."
      },
      {
        "front": "Qual armadilha evitar em PKI, certificados e TLS?",
        "back": "Certificado válido não torna automaticamente a aplicação livre de vulnerabilidades."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 31,
    "code": "SEG",
    "title": "Resposta a incidentes e evidências",
    "objective": "Explicar e aplicar: Resposta a incidentes e evidências.",
    "theory": "Resposta a incidentes envolve preparação, detecção/análise, contenção, erradicação, recuperação e lições aprendidas, com variantes conforme o referencial. Registre horário, origem, ações e evidências para investigar e comunicar adequadamente.",
    "practical": "Ao identificar conta comprometida: acione o plano, preserve logs, isole acesso conforme análise e recupere serviço com segurança.",
    "warning": "Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências.",
    "recall": [
      {
        "front": "Qual é um dos objetivos da etapa de contenção de incidentes?",
        "back": "Limitar propagação e danos. Contenção busca reduzir impacto enquanto a investigação continua."
      },
      {
        "front": "Por que registrar cadeia de custódia de evidências?",
        "back": "Preservar rastreabilidade de coleta e manuseio. Rastreabilidade ajuda a demonstrar integridade e origem da evidência."
      },
      {
        "front": "Qual armadilha evitar em Resposta a incidentes e evidências?",
        "back": "Não altere máquinas indiscriminadamente antes de avaliar necessidade de preservação de evidências."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 32,
    "code": "SEG",
    "title": "Cópias de segurança e ransomware",
    "objective": "Explicar e aplicar: Cópias de segurança e ransomware.",
    "theory": "A estratégia 3-2-1 é uma heurística: múltiplas cópias, mídias/tipos diferentes e ao menos uma cópia separada; variantes incluem backup offline/imutável. RPO mede perda máxima de dados tolerável; RTO mede tempo de recuperação desejado.",
    "practical": "RPO de 1 hora pede estratégia que limite a perda de alterações a aproximadamente uma hora; RTO de 4 horas orienta capacidade de restaurar dentro desse prazo.",
    "warning": "Backup que nunca foi restaurado em teste não comprova recuperação.",
    "recall": [
      {
        "front": "Qual indicador mede perda de dados aceitável em janela de tempo?",
        "back": "RPO. Recovery Point Objective relaciona-se ao ponto até o qual recuperar dados."
      },
      {
        "front": "Qual prática aumenta confiança na estratégia de backup?",
        "back": "Teste periódico de restauração. Testes de restauração validam recuperabilidade, não apenas existência de cópias."
      },
      {
        "front": "Qual armadilha evitar em Cópias de segurança e ransomware?",
        "back": "Backup que nunca foi restaurado em teste não comprova recuperação."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 33,
    "code": "SEG",
    "title": "NIST CSF 2.0 e governança",
    "objective": "Explicar e aplicar: NIST CSF 2.0 e governança.",
    "theory": "O NIST CSF 2.0 organiza resultados em seis funções: Govern, Identify, Protect, Detect, Respond e Recover. Govern foi enfatizada como função de governança, supervisão de riscos e responsabilidades. O framework descreve resultados, não uma lista única de ferramentas obrigatórias.",
    "practical": "Uma política de risco aprovada se relaciona à função Govern; inventário de ativos se alinha a Identify.",
    "warning": "CSF 2.0 não é uma certificação automática, nem uma lei brasileira.",
    "recall": [
      {
        "front": "Qual função foi explicitamente incorporada ao núcleo do NIST CSF 2.0?",
        "back": "Govern. Govern explicita governança no núcleo do CSF 2.0."
      },
      {
        "front": "Em qual função do NIST CSF 2.0 se encaixa a gestão de inventário e identificação de ativos?",
        "back": "Identify. Identify aborda entendimento de ativos e contexto de riscos."
      },
      {
        "front": "Qual armadilha evitar em NIST CSF 2.0 e governança?",
        "back": "CSF 2.0 não é uma certificação automática, nem uma lei brasileira."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 34,
    "code": "SEG",
    "title": "OWASP Top 10 e aplicações",
    "objective": "Explicar e aplicar: OWASP Top 10 e aplicações.",
    "theory": "Segurança de aplicações envolve controles no projeto, na implementação e na operação. Controle de acesso quebrado permite agir fora das permissões; injection ocorre quando dados não confiáveis interferem na interpretação de comandos ou consultas. Parametrização previne classes importantes de SQL Injection.",
    "practical": "Em vez de montar SELECT concatenando texto de formulário, utilize parâmetros vinculados pelo driver do banco.",
    "warning": "Validar entrada só no navegador não dispensa validação e autorização no servidor.",
    "recall": [
      {
        "front": "Qual técnica é prioritária para reduzir risco de SQL Injection?",
        "back": "Consultas parametrizadas. Parâmetros evitam interpretar valores externos como parte da sintaxe SQL."
      },
      {
        "front": "Qual falha permite que usuário comum acesse recurso restrito a administradores?",
        "back": "Controle de acesso quebrado. A autorização incorreta é uma falha de controle de acesso."
      },
      {
        "front": "Qual armadilha evitar em OWASP Top 10 e aplicações?",
        "back": "Validar entrada só no navegador não dispensa validação e autorização no servidor."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 94,
    "code": "SEG",
    "title": "Risco, controles e NIST CSF 2.0",
    "objective": "Distinguir ativo, ameaça, vulnerabilidade, risco, tratamento e função do NIST CSF.",
    "theory": "## Aula detalhada — entenda o mecanismo\nSegurança da informação não se resume ao trio **confidencialidade, integridade e disponibilidade** (CID). Autenticidade, responsabilização e capacidade de recuperação importam conforme o contexto. O risco pode ser descrito pela possibilidade de um evento afetar objetivos, considerando probabilidade e impacto, conforme metodologia adotada. Um **ativo** é algo que tem valor; uma **ameaça** é fonte potencial de dano; uma **vulnerabilidade** é fraqueza explorável; um **controle** altera o risco. Evite confundir impacto com probabilidade.\n\nO **NIST CSF 2.0** apresenta seis funções contínuas: Governar (Govern), Identificar, Proteger, Detectar, Responder e Recuperar. Não são fases obrigatoriamente sequenciais. Governar inclui contexto, estratégia, papéis, políticas, risco na cadeia de suprimentos e supervisão. Identificar envolve ativos e riscos. Proteger inclui gestão de identidade, treinamento e proteção de dados. Detectar monitora eventos; Responder contém incidentes; Recuperar restaura serviços e comunica progresso. O CSF descreve resultados desejados, não prescreve uma tecnologia específica.\n\nUm controle pode ser preventivo (MFA), detectivo (alerta de log) ou corretivo (reestabelecimento de serviço). Essas classificações são funções analíticas e um mesmo mecanismo pode desempenhar mais de um papel. Não confunda “tem firewall” com “governança e segurança estão completas”.\n\n## Exemplo resolvido passo a passo\nClínica com PACS local e backup na mesma sala: ativo = imagens médicas e serviços; ameaça = incêndio/ransomware; vulnerabilidade = cópia única ou sem isolamento adequado; impactos = indisponibilidade do atendimento e perda de dados.\n\nPasso 1: identificar processos críticos, requisitos de recuperação e responsáveis. Passo 2: mapear cópias, privilégios, dependências e fornecedores. Passo 3: definir tratamento: cópia segregada, testes de restauração e controle de acesso. Passo 4: registrar evidências e acompanhar efetividade.\n\nA prova pode perguntar onde se enquadra uma política formal de gestão de fornecedores: principalmente **Governar**, não apenas Proteger. Um alerta em SIEM se associa a Detectar; um procedimento de contenção e erradicação, a Responder; retorno controlado do PACS, a Recuperar.\n\n## Erros clássicos nas bancas\n**Armadilha:** “NIST CSF obriga ferramenta X” é falso: é orientado a resultados. **Armadilha:** “governança = inventário de TI” simplifica e confunde Governar com Identificar. **Armadilha:** backups existentes não provam recuperabilidade sem ensaio de restauração. **Armadilha:** risco residual não precisa ser zero; deve ser decidido conforme apetite e critérios organizacionais.\n\n## Pratique sem consultar\nConstrua uma matriz com três riscos de uma clínica: perda de acesso ao RIS, vazamento de imagens e interrupção de energia. Para cada risco, indique ativo, ameaça, vulnerabilidade, impacto, responsável, controle preventivo, detecção e teste da resposta. Depois aponte a função principal do NIST CSF de cada controle.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nNIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Quais são as seis funções do NIST CSF 2.0?",
        "back": "Govern, Identify, Protect, Detect, Respond, Recover."
      },
      {
        "front": "Diferença entre ameaça e vulnerabilidade?",
        "back": "Ameaça é fonte potencial de evento danoso; vulnerabilidade é fragilidade que pode ser explorada."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 95,
    "code": "SEG",
    "title": "Criptografia, TLS, hashes e IAM",
    "objective": "Relacionar propriedades criptográficas e controles de identidade sem confundir conceitos.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Criptografia simétrica** utiliza a mesma chave secreta para cifrar e decifrar (ex.: AES); costuma ser eficiente para dados em volume. **Assimétrica** utiliza pares de chaves pública/privada (ex.: RSA e criptografia de curvas elípticas, conforme esquema), com aplicações como assinatura, troca/encapsulamento de chaves e estabelecimento de confiança. O uso concreto depende do algoritmo, modo e protocolo; não presuma que “qualquer cifra assimétrica cifra um arquivo inteiro”.\n\n**Hash criptográfico** produz resumo de tamanho definido, usado para integridade, assinaturas e outros protocolos. Hash não é reversível como cifra; senhas devem usar funções de derivação adequadas com salt e parâmetros custosos, e não apenas SHA-256 direto. Uma **assinatura digital** normalmente assina hash/representação com chave privada e é verificada com chave pública, sustentando integridade e autenticidade da origem conforme o esquema. Cifra por si só não dá garantia equivalente de assinatura.\n\n**TLS** autentica endpoints conforme certificados e configurações e protege confidencialidade e integridade do canal. Cadeias de certificação precisam ser validadas; HTTPS não significa que o próprio site seja honesto. Em IAM, diferencie autenticação (identidade), autorização (permissão) e auditoria (registro). MFA exige fatores de categorias distintas, como senha (conhecimento) + chave de segurança física (posse); duas senhas não constituem MFA.\n\n## Exemplo resolvido passo a passo\nConsidere uma aplicação de exames que permite acesso externo: 1) gere conexão HTTPS com certificado para nome de domínio correto; 2) exija identidade individual e MFA em perfis privilegiados; 3) atribua permissões por função e necessidade; 4) registre acesso a dados sensíveis; 5) proteja dados em repouso com gestão apropriada de chaves.\n\nSe um arquivo sofre alteração, um hash previamente registrado pode indicar diferença, mas isoladamente não comprova quem publicou o hash. Se for necessário comprovar procedência, acrescente mecanismo de assinatura/autenticação. Se o navegador mostra certificado inválido, não “resolva” permanentemente desativando validação TLS. A prova pode oferecer “criptografia assimétrica sempre é mais rápida que AES” como alternativa falsa.\n\n## Erros clássicos nas bancas\n**Pegadinha:** criptografia não elimina necessidade de controle de acesso. **Pegadinha:** hash não é compressão recuperável. **Pegadinha:** MFA não é “digitar a mesma senha duas vezes”. **Pegadinha:** sessão HTTPS válida não impede phishing. **Pegadinha:** chave pública não deve ser confundida com segredo: é destinada à distribuição, enquanto a privada exige proteção.\n\n## Pratique sem consultar\nExplique como armazenaria senhas de usuários, como protegeria o tráfego entre navegador e API e como auditá-lo sem expor credenciais. Para cada decisão, declare qual propriedade de segurança está sendo atendida. Diferencie um token assinado de um token criptografado.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nNIST — Diretrizes de Identidade Digital: https://pages.nist.gov/800-63-4/\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Hash e criptografia têm o mesmo objetivo?",
        "back": "Não: hash é resumo unidirecional para verificação, enquanto cifra busca confidencialidade com decriptação autorizada."
      },
      {
        "front": "Qual é a diferença entre autenticação e autorização?",
        "back": "Autenticação comprova identidade; autorização determina os recursos e ações permitidos."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 96,
    "code": "SEG",
    "title": "Incidentes, continuidade, RTO/RPO e recuperação",
    "objective": "Planejar respostas defensivas e distinguir metas de tempo e perda aceitável.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Evento** é ocorrência observada; **incidente de segurança** envolve comprometimento real ou potencial que requer processo de resposta. A resposta pode incluir preparação, identificação/análise, contenção, erradicação, recuperação e lições aprendidas. O encadeamento exato depende do referencial; nenhuma etapa dispensa gestão de evidências e comunicação.\n\n**RTO** (Recovery Time Objective) é o tempo-alvo de restauração de uma atividade ou serviço. **RPO** (Recovery Point Objective) é o ponto máximo de perda de dados tolerável medido em tempo. Se backup acontece a cada 24h, a perda potencial desde o último backup pode chegar perto de 24h; isso não demonstra RPO de uma hora. **Backup**, **replicação**, **alta disponibilidade** e **plano de continuidade** não são sinônimos: replicação também pode replicar corrupção, e alta disponibilidade não garante cópia histórica segura.\n\nEstratégia prática defensiva: classificar criticidade, manter inventário, segmentar acessos, ter cópias segregadas e imutáveis quando viável, testar recuperação em ambiente controlado, definir comunicação e exercícios. Logs devem ser preservados com cuidado e acesso restrito; não reinstale imediatamente uma máquina comprometida sem avaliar preservação de evidências e orientação dos responsáveis.\n\n## Exemplo resolvido passo a passo\nUma clínica recebe alertas de criptografia indevida em um servidor. Primeiro, acione o plano de resposta, valide os indícios e contenha propagação conforme procedimento autorizado; preserve registros e envolva responsáveis. Não religue serviços suspeitos sem análise. Em paralelo, decida com os gestores quais atendimentos podem continuar degradados.\n\nSistema A: a organização admite no máximo 2h sem funcionar (RTO=2h) e perder no máximo 15min de atualizações (RPO=15min). Um backup noturno não cumpre automaticamente esse RPO. A solução técnica deve corresponder às metas e passar por testes documentados.\n\nNo pós-incidente, identifique causa, gaps de detecção e prevenção, atualize runbooks e registre testes. A questão de prova pode trocar “RTO” por “perda de dados aceitável”, uma confusão frequente.\n\n## Erros clássicos nas bancas\n**Pegadinha 1:** RTO = tempo de recuperação, não intervalo de backup. **Pegadinha 2:** RPO se refere à antiguidade tolerável dos dados recuperados. **Pegadinha 3:** replicação contínua sem versionamento pode perpetuar alterações maliciosas. **Pegadinha 4:** estabilidade de rede não substitui plano de comunicação com a direção e áreas de negócio.\n\n## Pratique sem consultar\nDefina RTO e RPO para PACS e RIS, justificando pelas necessidades de atendimento. Desenhe uma política que combina cópia local, cópia fora do local e teste periódico de restauração. Liste três indicadores de que o teste foi bem-sucedido (integridade, tempo, possibilidade de uso real).\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nNIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "RTO e RPO: qual a diferença?",
        "back": "RTO = prazo-alvo para recuperar o serviço. RPO = quanto de dados, medido em tempo, pode ser perdido."
      },
      {
        "front": "Por que alta disponibilidade não é igual a backup?",
        "back": "HA tenta manter serviço ativo após falhas; backup retém cópias recuperáveis, idealmente com histórico e segregação."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 122,
    "code": "SEG",
    "title": "NIST CSF 2.0 e função Govern",
    "objective": "Compreender e aplicar nist csf 2.0 e função govern em provas.",
    "theory": "O CSF 2.0 organiza resultados de segurança nas funções Govern, Identify, Protect, Detect, Respond e Recover.\n\nA função Govern define contexto organizacional, estratégia de riscos, papéis, políticas, supervisão e cadeia de fornecimento. As demais funções representam atividades complementares; elas não são estágios rígidos nem uma receita de implantação. Uma empresa pode ter bons firewalls e ainda apresentar lacunas de governança.",
    "practical": "Uma clínica com MFA, backups e EDR, mas sem política aprovada de terceiros, demonstra controles técnicos sem maturidade equivalente em Govern.",
    "warning": "Não confunda a função Govern com simples aquisição de ferramentas de segurança.",
    "recall": [
      {
        "front": "Qual é o conceito central de NIST CSF 2.0 e função Govern?",
        "back": "O CSF 2.0 organiza resultados de segurança nas funções Govern, Identify, Protect, Detect, Respond e Recover."
      },
      {
        "front": "Qual erro de prova evitar em NIST CSF 2.0 e função Govern?",
        "back": "Não confunda a função Govern com simples aquisição de ferramentas de segurança."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 123,
    "code": "SEG",
    "title": "RTO, RPO e continuidade",
    "objective": "Compreender e aplicar rto, rpo e continuidade em provas.",
    "theory": "RTO especifica tempo-alvo de recuperação de um serviço; RPO indica a perda de dados máxima tolerável expressa em intervalo de tempo.\n\nRTO de quatro horas significa objetivo de restabelecer um serviço em até quatro horas após interrupção dentro das hipóteses do plano. RPO de uma hora indica que a organização aceita perder até uma hora de alterações em determinado cenário. Backups frequentes ajudam RPO; redundância e procedimentos testados ajudam RTO.",
    "practical": "Para sistema RIS/PACS, é possível estabelecer RPO de 15 minutos para metadados críticos e RTO diferente para visualizar exames históricos, conforme impacto operacional.",
    "warning": "Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação.",
    "recall": [
      {
        "front": "Qual é o conceito central de RTO, RPO e continuidade?",
        "back": "RTO especifica tempo-alvo de recuperação de um serviço; RPO indica a perda de dados máxima tolerável expressa em intervalo de tempo."
      },
      {
        "front": "Qual erro de prova evitar em RTO, RPO e continuidade?",
        "back": "Backups não garantem continuidade sem teste de restauração, escopo e recursos de recuperação."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 124,
    "code": "SEG",
    "title": "Zero Trust e controle de acesso",
    "objective": "Compreender e aplicar zero trust e controle de acesso em provas.",
    "theory": "Zero Trust é uma abordagem de segurança que evita confiar automaticamente em identidade ou rede por localização.\n\nDecisões devem considerar autenticação forte, identidade, postura do dispositivo, políticas e sinais contextuais; o acesso deve ser mínimo e continuamente avaliado conforme arquitetura. VPN não substitui segmentação nem controle de autorização. Logs úteis precisam ter integridade, retenção e análise.",
    "practical": "Um técnico remoto autenticado por VPN continua sujeito a permissões específicas e MFA em serviços sensíveis.",
    "warning": "Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos.",
    "recall": [
      {
        "front": "Qual é o conceito central de Zero Trust e controle de acesso?",
        "back": "Zero Trust é uma abordagem de segurança que evita confiar automaticamente em identidade ou rede por localização."
      },
      {
        "front": "Qual erro de prova evitar em Zero Trust e controle de acesso?",
        "back": "Zero Trust não é um produto único nem significa proibir todos os usuários de acessar recursos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 154,
    "code": "SEG",
    "title": "Resposta a incidente com evidências e continuidade",
    "objective": "Priorizar contenção, preservar evidência e definir recuperação com RTO e RPO distintos.",
    "theory": "# Caso de prova — comportamento suspeito em servidor crítico\nUma organização identifica aumento abrupto de renomeações de arquivos num compartilhamento clínico, enquanto o monitoramento aponta tentativa de execução incomum em estação de trabalho. O gestor recebe a orientação: “reinicie todos os servidores e restaure o backup”. Essa resposta pode destruir evidências, ampliar indisponibilidade e deixar o vetor de entrada aberto. Uma abordagem profissional distingue **triagem, contenção, erradicação e recuperação**, com decisões proporcionais ao risco e coordenadas com os responsáveis.\n\n## Plano fundamentado\n**Triagem:** registre tempo, ativos, contas, alertas e alterações confirmadas; classifique criticidade e envolva os responsáveis pela resposta. **Contenção:** com autorização apropriada, isole ativos suspeitos e bloqueie credenciais comprometidas, preservando dados necessários à investigação. A ordem exata depende do risco operacional: desligar um sistema crítico de saúde pode ter impacto assistencial. **Análise:** colete registros disponíveis com cadeia de custódia adequada à finalidade, verifique persistência e escopo. **Erradicação:** remova causa e mecanismos de reinfecção, atualize controles, altere segredos expostos. **Recuperação:** restaure a partir de cópias confiáveis, valide integridade, monitore reinfecção e faça lições aprendidas.\n\n## RTO e RPO no mesmo cenário\nO serviço de agendamento possui RTO de quatro horas e RPO de quinze minutos. Isso significa **metas diferentes**: restabelecimento do serviço em até quatro horas, sob as condições do plano, e perda de alterações equivalente a no máximo quinze minutos. Não significa que um backup “feito a cada 15 minutos” garante RPO de 15 minutos: é preciso verificar execução, consistência, replicação e restauração. Um sistema que volta em 30 minutos com dados da semana passada pode cumprir o RTO e violar gravemente o RPO.\n\n## Evidência é parte do controle\nRegistros de eventos precisam de sincronização de horário, retenção e controle de acesso. Com logs incompletos, a conclusão deve declarar limitação de evidência. Um relatório responsável diferencia fato observado, hipótese e ação recomendada. Não atribua ataque a uma pessoa ou ferramenta específica com base em um único alerta.\n\n## Questão discursiva de treinamento\nEscreva 10 a 15 linhas explicando qual seria sua primeira sequência de decisões, como manteria evidências e de que maneira validaria a restauração. Separe três parágrafos: identificação e contenção; investigação e erradicação; recuperação e prevenção. Você não precisa listar comandos ofensivos nem reproduzir um ataque.\n\n## Armadilhas da banca\n- Backup não substitui política de retenção, teste de restauração e plano de continuidade.\n- Contenção não é sinônimo de desligar indiscriminadamente todos os equipamentos.\n- RTO mede prazo de retorno; RPO mede tolerância à perda de dados no tempo.\n- Controles do NIST CSF são resultados organizacionais, não sequência única e obrigatória de comandos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Como distinguir RTO de RPO em uma interrupção?",
        "back": "RTO: meta de tempo para restabelecer serviço; RPO: meta de perda máxima de alterações expressa em tempo."
      },
      {
        "front": "Por que reiniciar todos os servidores não é resposta padrão a incidente?",
        "back": "Pode ampliar impacto, destruir evidências e deixar causas de comprometimento ativas."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 155,
    "code": "SEG",
    "title": "Matriz de acesso, MFA e risco residual",
    "objective": "Projetar controles de identidade sem confundir autenticação, autorização e rastreabilidade.",
    "theory": "# Caso de prova — funcionário precisa acessar três sistemas\nUma equipe de TI administra sistema financeiro, prontuário eletrônico e servidor de arquivos. Um funcionário do suporte solicita permissão de administrador geral “para não precisar abrir chamados”. A medida reduz conveniência operacional imediata, mas expande o impacto de credencial comprometida ou erro humano. O primeiro passo é mapear **papel, recurso, ação permitida e justificativa**. Autenticação prova uma identidade em determinado grau de confiança; autorização decide se a identidade pode praticar uma ação sobre um recurso; auditoria registra a decisão e o uso.\n\n## Matriz mínima de autorização\nDefina papéis: atendimento, suporte, gestor de infraestrutura e auditor. Para cada recurso, especifique ações como consultar, alterar, instalar, aprovar e exportar. Em vez de liberar privilégios administrativos permanentes, avalie elevação temporária controlada, contas separadas, revisão periódica e trilhas de auditoria. **MFA** fortalece a etapa de autenticação, mas não impede que uma identidade legitimamente autenticada receba autorizações excessivas. Da mesma forma, VPN protege um canal de acesso, mas não é substituto de regra de menor privilégio.\n\n## Exemplo de decisão\nO suporte precisa reiniciar serviço de impressão, mas não consultar prontuário nem exportar a base de pacientes. A solução de menor privilégio concede ação específica no recurso necessário e preserva aprovação para elevação emergencial. O papel de auditor pode ler logs, mas não alterá-los. Um usuário com acessos antigos de departamento anterior requer processo de desligamento ou revisão — a recertificação é um controle de ciclo de vida de identidade.\n\n## Avalie o risco que sobra\nMesmo após MFA, segmentação e logs, permanece risco de engenharia social, vulnerabilidades, abuso interno e falhas operacionais. Esse **risco residual** deve ser aceito, tratado, transferido ou evitado por autoridade competente conforme critérios e apetite de risco. Não escreva que um controle “elimina todos os riscos”: esse absolutismo é frequentemente incorreto.\n\n## Exercício aplicado\nDesenhe uma matriz com quatro papéis e três sistemas. Para cada uma das doze combinações, anote a permissão e a justificativa. Identifique pelo menos um conflito de segregação de funções (por exemplo, cadastrar fornecedor e aprovar seu pagamento). Refaça a matriz supondo uma mudança de função e explique o que deve ser revogado.\n\n## Pegadinhas que aparecem em provas\n- Identificação não é automaticamente autenticação; autenticação não é autorização.\n- MFA depende de fatores distintos e implementação apropriada; duas senhas não formam dois fatores diferentes.\n- Zero Trust não obriga uma arquitetura única ou ferramenta específica.\n- O princípio da necessidade de acesso se refere a privilégios, enquanto a LGPD também exige necessidade no volume e finalidade dos dados tratados.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "MFA resolve sozinho excesso de permissões?",
        "back": "Não. MFA fortalece autenticação; autorização e revisão de privilégios são controles distintos."
      },
      {
        "front": "O que é risco residual?",
        "back": "Risco que permanece após tratamento e controles aplicados, sujeito a avaliação e decisão formal."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
