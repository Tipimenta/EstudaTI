import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullSEG=buildChapters([
  {
    "id": 5,
    "title": "Criptografia, backup e incidentes: três proteções para riscos diferentes",
    "goal": "Identificar o que a criptografia protege, quando a cópia de segurança permite recuperar e o que significa responder a um incidente.",
    "context": "Imagine um servidor com arquivos de pacientes. Se um intruso conseguir copiar um arquivo, há risco de exposição; se alguém apagar a pasta, há risco de perda; se um malware interromper o atendimento, há risco de indisponibilidade. Nenhuma ferramenta sozinha resolve esses três problemas. **Criptografia** transforma dados usando algoritmos e chaves para dificultar a leitura sem a chave apropriada. **Backup** é uma cópia de dados planejada para permitir recuperação. **Incidente** é uma ocorrência que compromete ou pode comprometer objetivos de segurança, exigindo investigação e resposta.",
    "explanation": "Na criptografia **simétrica**, uma chave secreta é usada para cifrar e decifrar, como ocorre com AES. Na **assimétrica**, existe par de chaves com propriedades relacionadas: uma pública e outra privada. Em aplicações como TLS, os mecanismos trabalham em conjunto para proteger canais, dependendo do protocolo. Um backup útil precisa ser recuperável: copiar arquivos sem testar restauração pode produzir falsa sensação de segurança. Quando um incidente ocorre, a equipe analisa alcance, controla danos, preserva evidências e restabelece serviços de modo confiável.",
    "connection": "A tríade de segurança — **confidencialidade, integridade e disponibilidade** — ajuda a escolher controles. Criptografia pode apoiar confidencialidade; cópias de segurança podem apoiar recuperação e disponibilidade; controle de acesso reduz exposição; monitoramento e resposta limitam consequências de eventos. Mas dados criptografados podem ser apagados por usuário autorizado, e um backup íntegro pode conter versões antigas ou dados incorretos. Logo não existe equivalência entre criptografar, ter backup e estar seguro.",
    "exam": "Se a prova disser que criptografia substitui backup, rejeite: cifrar não cria uma cópia restaurável. Se disser que backup impede invasão, também não: ele é parte da recuperação. Um incidente de disponibilidade não exige necessariamente ataque — uma falha elétrica pode interromper serviço. Em situações de ransomware, não basta restaurar arquivo: investigue persistência do ataque, integridade das cópias e isolamento do ambiente antes de retomar produção.",
    "caseTitle": "O arquivo foi cifrado por ransomware: qual controle responde a quê?",
    "caseSteps": [
      "A equipe identifica arquivos ilegíveis e interrupção de serviço; isso configura indício de incidente, não simples falta de senha.",
      "Analisa e contém o comportamento suspeito, sem apagar provas úteis à investigação.",
      "Verifica cópias de segurança independentes e testa a restauração em ambiente confiável após avaliação do risco.",
      "Conclui que backup auxilia recuperação, mas não substitui contenção, proteção de acessos e resposta à causa."
    ],
    "pitfalls": [
      "Criptografia não cria cópia de recuperação nem elimina risco de exclusão.",
      "Backup não impede automaticamente vazamento de confidencialidade.",
      "Incidente pode ser causado por erro ou falha, não só por criminoso.",
      "Restauração de ransomware sem ambiente confiável pode provocar reinfecção."
    ],
    "cards": [
      [
        "O que criptografia procura proteger?",
        "A compreensão de dados por quem não possui a chave apropriada, dependendo de algoritmo e uso."
      ],
      [
        "O que torna backup realmente útil?",
        "Ser uma cópia adequada à finalidade, protegida e com capacidade de restauração comprovada."
      ],
      [
        "Por que um incidente exige investigação além do backup?",
        "Porque é necessário limitar consequências, compreender a causa e recuperar em ambiente confiável."
      ],
      [
        "Criptografia e backup substituem um ao outro?",
        "Não. Criptografia protege conteúdo; backup oferece mecanismo de recuperação de versões/cópias."
      ]
    ]
  },
  {
    "id": 27,
    "title": "Gestão de riscos: do ativo à decisão de tratamento",
    "goal": "Distinguir ativo, ameaça, vulnerabilidade, impacto, risco e tratamento em um cenário operacional.",
    "context": "Uma equipe sabe que um sistema é importante, mas não sabe em que medida investir na proteção. O primeiro passo é identificar o **ativo**, algo de valor para a organização: dados, processo, equipamento, serviço ou conhecimento. Em seguida, pergunte o que poderia impedir seu funcionamento. **Ameaça** é fonte ou causa potencial de dano; **vulnerabilidade** é uma fraqueza aproveitável ou que amplia consequências. O **risco** está relacionado à incerteza que pode afetar objetivos, incluindo a possibilidade e o impacto de eventos adversos.",
    "explanation": "Considere um servidor sem atualizações e sem cópias testadas. Uma ameaça pode ser exploração de falha de software; a vulnerabilidade é a versão sem correção. O **impacto** descreve consequências como interrupção de atendimento ou exposição de dados. A **probabilidade** é uma estimativa de chance ou plausibilidade, não um número que se inventa sem critério. A gestão do risco identifica, analisa, avalia e decide respostas. **Tratamento** pode incluir reduzir risco por controles, evitar atividade, compartilhar/transferir parte de consequências ou aceitar risco com justificativa e autoridade apropriada.",
    "connection": "Não confunda risco com vulnerabilidade técnica: uma falha existe no software, mas seu risco depende também de exposição, finalidade, usuários, impacto e controles atuais. Também não confunda risco **inerente** e **residual**: o primeiro é avaliado sem determinados controles; o residual é o que permanece após medidas. NIST CSF 2.0 usa governança para coordenar decisões de risco, mas o modelo não fornece automaticamente uma pontuação universal de probabilidade para cada falha.",
    "exam": "Ao ler 'um fornecedor terá acesso remoto a prontuários', não conclua apenas 'risco alto' sem identificar permissões, dados, controles e consequências. Uma alternativa correta costuma justificar **medida proporcional**, como limitar credenciais, exigir MFA e registrar acessos. Se a questão disser que tratamento elimina qualquer risco, rejeite: mesmo com controles pode permanecer risco residual, que deve ser conhecido e aceito por quem possui competência para isso.",
    "caseTitle": "Avalie um servidor exposto com acesso remoto",
    "caseSteps": [
      "Identifique o ativo: servidor de dados de atendimento e seus registros, com impacto de indisponibilidade e exposição.",
      "Reconheça ameaça plausível de acesso indevido e vulnerabilidade de conta administrativa compartilhada sem MFA.",
      "Considere controles: credenciais individuais, MFA, restrição de acesso e monitoramento; estime o risco restante.",
      "Registre responsável, decisão e prazo para verificar controles; aceitar risco requer justificativa, não omissão."
    ],
    "pitfalls": [
      "Ameaça não é a mesma coisa que vulnerabilidade.",
      "Risco não pode ser classificado apenas pelo nome da tecnologia sem contexto.",
      "Controle reduz risco, mas normalmente não garante risco zero.",
      "A aceitação de risco precisa de decisão explícita com responsável apropriado."
    ],
    "cards": [
      [
        "O que é um ativo na análise de riscos?",
        "Algo de valor para a organização que precisa ser protegido, como serviço, dado, processo ou equipamento."
      ],
      [
        "Qual a diferença entre ameaça e vulnerabilidade?",
        "Ameaça é fonte potencial de dano; vulnerabilidade é fragilidade que pode favorecer o evento ou agravar efeitos."
      ],
      [
        "O que é risco residual?",
        "O risco que permanece após a aplicação ou consideração dos controles escolhidos."
      ],
      [
        "Tratamento de risco é sempre comprar ferramenta?",
        "Não. Pode envolver políticas, processos, controle técnico, decisão de evitar, compartilhar ou aceitar justificadamente."
      ]
    ]
  },
  {
    "id": 28,
    "title": "MFA e menor privilégio: por que senha não resolve tudo",
    "goal": "Entender autenticação, fatores de segurança, autorização e princípio do menor privilégio usando acessos de trabalho.",
    "context": "Um colaborador usa usuário e senha para entrar no sistema. Se alguém descobrir a senha, pode tentar fingir ser essa pessoa. Por isso sistemas sensíveis podem exigir **MFA** (*Multi-Factor Authentication*), autenticação com fatores de categorias diferentes. Antes de decorar siglas, diferencie **autenticação** (verificar identidade) de **autorização** (decidir quais ações aquela identidade pode executar). Um usuário autenticado corretamente pode continuar proibido de consultar determinado relatório.",
    "explanation": "Categorias comuns de fator são **algo que você sabe** (senha ou PIN), **algo que você possui** (chave física ou dispositivo autenticador) e **algo que você é** (biometria, conforme implementação). Duas senhas são dois segredos, mas pertencem à mesma categoria e não demonstram, por si, MFA. Um código temporário gerado por aplicativo pode ser fator de posse em configuração adequada. **Menor privilégio** significa conceder somente permissões necessárias à tarefa, com revisão e retirada quando deixam de ser necessárias.",
    "connection": "MFA reduz determinados riscos de comprometimento de credencial, mas não impede que um usuário legítimo com permissão excessiva visualize dados desnecessários. Por isso MFA trabalha junto a **controle de acesso por papéis (RBAC)**, grupos, perfis e auditoria. E a autenticação não deve acontecer apenas no navegador: a API precisa validar a sessão e a autorização a cada recurso protegido. Um botão escondido não torna seguro um endpoint que responde para qualquer usuário autenticado.",
    "exam": "Uma alternativa pode propor 'senha e pergunta secreta' como MFA. Como ambas exigem conhecimento, não demonstram categorias distintas. Outra pode dizer que um administrador com MFA pode acessar qualquer prontuário: MFA valida identidade, não concede autorização universal. Para responder, identifique primeiro **qual fator é comprovado** e **qual privilégio é realmente necessário** para a tarefa descrita.",
    "caseTitle": "Recepcionista acessa contas de faturamento com a mesma senha",
    "caseSteps": [
      "O sistema autentica recepcionista por senha e a conta possui acesso a relatórios financeiros, embora não haja necessidade da função.",
      "Exigir MFA pode reduzir uso indevido de credencial roubada, mas não elimina privilégio excessivo.",
      "Remova acesso financeiro do perfil de recepção e aplique autorização no servidor para o recurso sensível.",
      "Valide com teste: login válido continua funcionando, mas a tentativa ao relatório restrito deve ser negada."
    ],
    "pitfalls": [
      "Duas senhas não equivalem necessariamente a MFA de categorias diferentes.",
      "Autenticação bem-sucedida não autoriza todas as operações.",
      "Ocultar um botão não substitui checagem de permissão na API.",
      "MFA reduz alguns riscos, mas não elimina fraude ou permissões excessivas."
    ],
    "cards": [
      [
        "O que diferencia MFA de duas senhas?",
        "MFA exige fatores de categorias distintas, não apenas dois segredos do mesmo tipo."
      ],
      [
        "O que é princípio do menor privilégio?",
        "Conceder apenas as permissões necessárias à função, revisando-as quando tarefas mudam."
      ],
      [
        "Por que MFA não resolve autorização inadequada?",
        "Porque comprova identidade, mas não decide por si quais dados o usuário pode acessar."
      ],
      [
        "Onde a API precisa verificar autorização?",
        "No servidor, considerando a identidade, o recurso concreto e a ação solicitada."
      ]
    ]
  },
  {
    "id": 29,
    "title": "Criptografia simétrica, assimétrica e hash sem misturar funções",
    "goal": "Explicar cifra, chave, assinatura, função hash e diferença entre sigilo e integridade.",
    "context": "Ao enviar um arquivo confidencial, você deseja que terceiros não leiam o conteúdo. Ao receber uma atualização de software, deseja saber se foi alterada indevidamente. São perguntas diferentes: **sigilo** e **integridade**. **Cifrar** é transformar informação por algoritmo e chave para restringir leitura; **hash criptográfico** produz um resumo de tamanho definido a partir de dados, usado, entre outras aplicações, para verificar alterações. Não podemos chamar tudo de 'criptografia' sem distinguir função e mecanismo.",
    "explanation": "Na cifra **simétrica**, participantes que precisam decifrar compartilham chave apropriada; AES é um algoritmo conhecido. Na **assimétrica**, usa-se par de chaves matematicamente relacionado: **pública** e **privada**. Em criptografia de chave pública, a operação realizada por uma chave possui papel diferente da outra conforme o esquema. **Assinatura digital** permite verificar autenticidade e integridade de mensagem sob suposições de segurança do algoritmo, usando a chave privada para assinar e a pública para verificar. Uma função **hash** como SHA-256 não é cifra reversível: normalmente não se 'descriptografa' o hash para recuperar o arquivo.",
    "connection": "Senhas devem ser armazenadas por mecanismos próprios de derivação/hash resistente a tentativas de adivinhação, com sal e configuração apropriada; não basta usar SHA-256 puro sem considerar custo de ataque. Em TLS, mecanismos assimétricos ajudam na autenticação/estabelecimento de chaves, enquanto cifragem simétrica protege grande volume de dados na sessão. Cada peça foi escolhida por propriedades diferentes. Ter um hash igual ao esperado detecta diferenças, mas não comprova sozinho quem forneceu o arquivo se o hash de referência também puder ser adulterado.",
    "exam": "Se a prova disser que uma assinatura digital fornece sigilo automaticamente, rejeite: autenticidade/integridade não equivalem a confidencialidade. Se disser que hash é método reversível para recuperar senha, rejeite. Se perguntar qual mecanismo cifra grande volume de dados eficientemente, considere criptografia simétrica. Se perguntar como provar origem com chave pública verificável, examine esquema de assinatura digital e cadeia de confiança.",
    "caseTitle": "Uma atualização foi baixada: como verificar integridade?",
    "caseSteps": [
      "O fornecedor publica arquivo e valor SHA-256 obtido por canal confiável; o usuário calcula hash do arquivo recebido.",
      "Se o hash calculado difere do valor confiável, há indício de alteração ou arquivo diferente.",
      "Para comprovar quem publicou a informação, assinatura digital válida é mais adequada do que confiar num hash isolado.",
      "Conclua que hash verifica comparação de integridade; assinatura acrescenta autenticação da origem conforme confiança."
    ],
    "pitfalls": [
      "Hash criptográfico não é cifra reversível do arquivo original.",
      "Assinatura digital não oferece sigilo automaticamente.",
      "Chave privada deve permanecer protegida; chave pública pode ser distribuída.",
      "Armazenar senha com hash simples sem proteção contra adivinhação é inadequado."
    ],
    "cards": [
      [
        "O que faz uma cifra simétrica?",
        "Utiliza chave secreta apropriada para cifrar e decifrar dados, como ocorre com AES."
      ],
      [
        "Qual é a função de um hash criptográfico?",
        "Gerar resumo de dados para aplicações de integridade e outras funções, sem ser cifra reversível."
      ],
      [
        "Assinatura digital protege principalmente quais propriedades?",
        "Autenticidade da origem e integridade da mensagem, conforme esquema e confiança na chave."
      ],
      [
        "Por que TLS combina mecanismos criptográficos?",
        "Porque estabelecimento/autenticação e proteção eficiente do tráfego exigem propriedades complementares."
      ]
    ]
  },
  {
    "id": 32,
    "title": "Backup contra ransomware: cópia, restauração e independência",
    "goal": "Projetar proteção de dados com cópias separadas, RPO/RTO, testes e entender limites da regra 3-2-1.",
    "context": "Uma clínica faz cópia diária dos seus arquivos para outra pasta do mesmo servidor. Depois de um ransomware, ambas as pastas ficam inacessíveis. Existia uma cópia, mas ela não estava suficientemente **isolada** do incidente. **Backup** é uma cópia planejada para recuperação, não apenas duplicação no mesmo lugar. A regra **3-2-1** é uma heurística amplamente usada para lembrar múltiplas cópias, diversidade de meios e ao menos uma separação do ambiente principal; o desenho preciso depende de riscos, tamanho e recursos.",
    "explanation": "Uma estratégia pode combinar cópias locais para restauração rápida, cópias **offline** (desconectadas em determinado período), cópias **imutáveis** (proteção contra alteração durante período conforme tecnologia) e cópias externas. Isso reduz a chance de uma única falha ou credencial comprometida destruir tudo. Porém cópia protegida só ajuda se o processo consegue **restaurar arquivos íntegros**. Faça testes reais de restauração e registre resultados. Planeje retenção: quantas versões antigas manter e por quanto tempo, conforme necessidades e exigências legais.",
    "connection": "**RPO** (*Recovery Point Objective*) é o ponto de recuperação desejado, frequentemente expresso como **perda de dados tolerável em tempo**; por exemplo, RPO de 1 hora indica tolerância de até cerca de uma hora de alterações perdidas conforme o plano. **RTO** (*Recovery Time Objective*) é o tempo-alvo para restabelecer função/serviço após interrupção. Backups mais frequentes ajudam a reduzir RPO; infraestrutura de recuperação e processos testados ajudam a atingir RTO. **RAID** pode permitir continuidade após falha de disco, mas não substitui backups contra exclusão ou ransomware.",
    "exam": "Se um órgão faz backup a cada 24 horas, não conclua que consegue cumprir RPO de 15 minutos sem mecanismo adicional: pode perder alterações desde a última cópia. Se uma cópia permanece online com as mesmas credenciais administrativas, a independência diante de ataque pode ser baixa. O examinador pode chamar snapshot ou RAID de backup definitivo; avalie se existe cópia independente e restaurável, e não apenas tecnologia com nome parecido.",
    "caseTitle": "Planeje continuidade de um sistema com RPO de 1 hora",
    "caseSteps": [
      "O sistema aceita perder no máximo uma hora de registros e precisa voltar em até quatro horas.",
      "Backups diários isolados podem ser insuficientes para RPO de 1 hora: estude cópias ou mecanismos de replicação/logs adequados.",
      "Mantenha versão protegida contra credenciais comprometidas e teste restauração de arquivos e dependências.",
      "Meça duração da recuperação; verificar que os dados voltaram não basta se o serviço só volta depois do RTO."
    ],
    "pitfalls": [
      "Backup não é apenas copiar para outra pasta do mesmo servidor.",
      "RAID não protege contra exclusão lógica e ataque que atinge o conjunto.",
      "RPO trata de perda de dados tolerável; RTO trata de tempo-alvo de restabelecimento.",
      "Backup não testado pode falhar exatamente no momento da recuperação."
    ],
    "cards": [
      [
        "Por que uma cópia offline pode ajudar contra ransomware?",
        "Porque reduz a possibilidade de o malware ou credencial comprometida alterar diretamente aquela cópia."
      ],
      [
        "O que RPO mede?",
        "A perda de dados tolerável expressa em intervalo de tempo em relação ao ponto de recuperação."
      ],
      [
        "O que RTO representa?",
        "O tempo-alvo para restabelecer serviço ou capacidade após interrupção."
      ],
      [
        "RAID substitui backup?",
        "Não. RAID ajuda em certas falhas de disco; backup oferece versões/cópias para recuperação de outras perdas."
      ]
    ]
  },
  {
    "id": 34,
    "title": "OWASP Top 10: por que uma aplicação pode vazar dados com HTTPS",
    "goal": "Entender falhas de autorização, injeção, configuração e validação sem reduzir segurança de aplicação a siglas.",
    "context": "Um aplicativo pode ter cadeado HTTPS, senhas fortes e banco atualizado, mas ainda permitir que um usuário acesse dados de outro mudando o número na URL. Isso mostra uma diferença essencial: **segurança do transporte** não garante **segurança das regras da aplicação**. O projeto OWASP mantém referências como **Top 10** para organizar riscos relevantes de aplicações web. Não se trata de dez truques que garantem proteção total; são categorias para orientar análise e correção, atualizadas em diferentes versões.",
    "explanation": "Uma falha de **controle de acesso** ocorre quando o sistema não verifica se aquela identidade possui permissão sobre **aquele recurso**, como um laudo. **Injeção** acontece quando entrada controlada pelo usuário altera indevidamente a interpretação de comandos, por exemplo ao construir SQL concatenando texto sem parametrização. **Configuração insegura** pode expor serviços ou deixar funções de depuração acessíveis. **Falhas de autenticação** podem permitir uso indevido de identidades/sessões. Para cada classe, procure a decisão de software que permite o problema, não apenas a palavra-chave.",
    "connection": "SQL parametrizado separa dados de instruções, reduzindo risco de injeção. Controle de acesso deve ser executado no **servidor**, não apenas por esconder botões no navegador. Logs e monitoramento ajudam a detectar tentativas, mas não substituem prevenção. **TLS** protege a comunicação, porém não impede que uma aplicação responda com dados proibidos. Assim, controles de rede, criptografia e autorização compõem camadas complementares de defesa.",
    "exam": "Se um atacante muda `/pacientes/10` para `/pacientes/11` e vê outro cadastro, a pista é falha de **autorização no objeto**, não ausência obrigatória de HTTPS. Se a entrada do usuário vira parte de um comando SQL, a pista é **injeção**, mitigada por consultas parametrizadas e privilégios adequados. Cuidado com classificação por versão: se o edital citar OWASP Top 10 de um ano específico, confira nomenclatura dessa edição, em vez de decorar uma lista sem contexto.",
    "caseTitle": "O usuário troca o número do laudo na URL",
    "caseSteps": [
      "A aplicação autentica o usuário e abre `/laudos/20`, ao qual ele tem acesso legítimo.",
      "Ele altera manualmente a rota para `/laudos/21` e recebe dados de pessoa que não deveria visualizar.",
      "A autenticação já ocorreu: a falha é não conferir autorização para o recurso 21 no servidor.",
      "Corrija a checagem por objeto/ação e teste tentativa de acessar recursos de outros usuários."
    ],
    "pitfalls": [
      "HTTPS não resolve autorização quebrada na aplicação.",
      "Ocultar botões no frontend não impede acesso direto à API.",
      "Parametrização SQL separa comandos de dados e ajuda contra injeção.",
      "OWASP Top 10 apresenta categorias de risco, não checklist capaz de eliminar toda vulnerabilidade."
    ],
    "cards": [
      [
        "O que é autorização no nível do objeto?",
        "Validar se a identidade pode executar a ação sobre aquele registro específico, não apenas se fez login."
      ],
      [
        "Por que HTTPS não impede vazamento por uma API mal autorizada?",
        "Porque TLS protege o canal, mas a aplicação pode entregar conteúdo indevido de forma tecnicamente cifrada."
      ],
      [
        "Qual prática ajuda a prevenir injeção SQL?",
        "Uso de consultas parametrizadas/vinculação de parâmetros, com controle de privilégios no banco."
      ],
      [
        "O que representam as categorias OWASP Top 10?",
        "Grupos de riscos relevantes de aplicações web usados para orientar análise e medidas de segurança."
      ]
    ]
  },
  {
    "id": 94,
    "title": "Risco e NIST CSF: da avaliação à decisão de governança",
    "goal": "Aplicar as seis funções do CSF 2.0 numa organização e diferenciar risco, controle, responsável e resultado.",
    "context": "Uma organização reúne backups, antivírus e firewall, mas ninguém sabe quem aprova riscos, quem testa a restauração ou quais sistemas são prioritários. O problema pode ser de **governança**, não somente falta de ferramentas. O **NIST Cybersecurity Framework (CSF) 2.0** é uma referência para organizar resultados de segurança. Ele contém seis funções: **Governar (GV), Identificar (ID), Proteger (PR), Detectar (DE), Responder (RS) e Recuperar (RC)**. Essas funções descrevem resultados que precisam ser alcançados, não seis equipes obrigatórias nem seis etapas que só podem ocorrer em ordem.",
    "explanation": "**Governar** define contexto, estratégia, papéis, política e supervisão de riscos. **Identificar** ajuda a conhecer ativos, sistemas, informações e riscos que importam. **Proteger** reúne controles para reduzir efeitos de incidentes, como acesso restrito e conscientização. **Detectar** reconhece sinais de comportamentos suspeitos; **Responder** coordena tratamento de incidentes; **Recuperar** organiza restabelecimento. Pense em perguntas: quem decide risco? o que temos? como protegemos? como percebemos? como agimos? como voltamos?",
    "connection": "O CSF 2.0 não é uma lei brasileira nem certifica uma organização por si só. Pode orientar programa de segurança em complemento à LGPD, políticas internas e referências específicas de tecnologia, respeitando cada obrigação aplicável. Uma avaliação identifica lacunas e define melhorias, mas **nota baixa não equivale automaticamente a violação legal**. Também não confunda funções com controles técnicos específicos: uma atividade de backup pode apoiar proteção e recuperação, dependendo do resultado esperado.",
    "exam": "Se a direção estabelece tolerância ao risco e cobra relatórios, o foco é **Governar**. Se o analista detecta tráfego suspeito, é **Detectar**. Se a equipe isola máquina comprometida, atua em **Responder**. Se restaura atendimento, atua em **Recuperar**. Em alternativas, suspeite de 'NIST exige instalar produto X': o framework define resultados e práticas possíveis, não marca obrigatória. Referência: [NIST CSF 2.0](https://www.nist.gov/cyberframework).",
    "caseTitle": "Classifique cinco atividades da clínica pelo CSF",
    "caseSteps": [
      "O comitê define que sistemas críticos exigem teste trimestral de restauração: decisão e supervisão de **Governar**.",
      "A TI inventaria servidores de imagens e dependências: **Identificar**; configura MFA e restrições: **Proteger**.",
      "Monitoramento reconhece tentativas anômalas: **Detectar**; resposta contém evento: **Responder**.",
      "A equipe restaura o serviço e verifica operação segura: **Recuperar**; as funções cooperam e não substituem responsabilidade de gestão."
    ],
    "pitfalls": [
      "CSF não é ordem temporal rígida de seis etapas.",
      "Governar trata estratégia e direção, não configuração de cada firewall.",
      "Uma pontuação de maturidade não é por si evidência de conformidade legal.",
      "Backup pode apoiar mais de uma função conforme objetivo de controle."
    ],
    "cards": [
      [
        "Qual função foi reforçada no NIST CSF 2.0?",
        "Governar (GV), relacionada a contexto, papéis, estratégia, políticas e supervisão do risco."
      ],
      [
        "Qual a diferença entre Detectar e Responder?",
        "Detectar reconhece sinais/eventos relevantes; Responder organiza ações para tratar o incidente identificado."
      ],
      [
        "NIST CSF é uma lei ou certificação obrigatória?",
        "Não. É um framework de resultados de segurança que pode apoiar práticas e decisões de gestão."
      ],
      [
        "Como diferenciar Proteger de Recuperar?",
        "Proteger reduz chances/consequências antes e durante eventos; Recuperar restabelece serviços e capacidades afetadas."
      ]
    ]
  },
  {
    "id": 95,
    "title": "Cifra, assinatura, TLS e identidade: como cada mecanismo se complementa",
    "goal": "Explicar confidencialidade, integridade, autenticidade, certificado e controle de acesso em uma comunicação segura.",
    "context": "Uma pessoa envia uma informação médica por uma aplicação web. Ela precisa impedir leitura por terceiros, detectar alteração no caminho e confirmar que o servidor é legítimo. Esses objetivos são diferentes. **Confidencialidade** busca restringir leitura; **integridade** protege contra modificações indevidas; **autenticidade** ajuda a verificar origem/identidade. O **TLS** é um protocolo que negocia um canal de comunicação protegido; um **certificado digital** pode vincular a identidade do servidor à sua chave pública conforme uma cadeia de confiança.",
    "explanation": "No estabelecimento do TLS moderno, cliente e servidor negociam parâmetros e chaves de sessão, verificando identidade e provas criptográficas aplicáveis. A proteção eficiente dos dados costuma usar mecanismos **simétricos autenticados** depois do estabelecimento. Uma **assinatura digital** usa par assimétrico de modo que a chave pública correspondente verifica assinatura criada com a chave privada. Um **hash criptográfico** contribui para diversos mecanismos de integridade, mas não é cifra reversível nem comprova sozinho quem criou os dados.",
    "connection": "**IAM** significa gestão de identidade e acesso. Mesmo que TLS confirme o servidor e proteja os bytes em trânsito, a aplicação precisa autenticar usuários e conferir permissões. Uma pessoa autenticada não deve conseguir visualizar todo documento. Tokens e sessões também precisam de expiração, validação e proteção. O certificado pode ser válido em prazo e assinado por autoridade conhecida e ainda estar incorreto para o domínio visitado: a identidade do host deve ser conferida.",
    "exam": "Se a questão pede proteção do **trânsito**, considere TLS com validação correta. Se pede comprovar que a **mesma informação** não foi alterada e a origem é confiável, avalie hash autenticado ou assinatura. Se pede decidir **quem pode ler prontuário**, a resposta é autorização, não simplesmente SSL/TLS. Não diga que JWT assinado é criptografado por padrão: assinatura protege integridade/autenticidade, não oculta automaticamente o payload.",
    "caseTitle": "O navegador acusa certificado de outro domínio",
    "caseSteps": [
      "O usuário acessa `laudos.exemplo.org`; o servidor apresenta certificado válido para `portal.exemplo.org`.",
      "Validade temporal e assinatura não bastam: o certificado precisa cobrir o nome do serviço acessado.",
      "A validação TLS rejeita a identidade incompatível, ainda que a rede IP e a porta estejam funcionando.",
      "Corrija a configuração/certificado do host correto, sem desabilitar verificação do cliente como solução permanente."
    ],
    "pitfalls": [
      "TLS não substitui autorização do aplicativo.",
      "Certificado confiável para outro domínio não valida automaticamente o host acessado.",
      "Assinatura digital não fornece sigilo automaticamente.",
      "Hash não é cifra reversível de arquivo ou senha."
    ],
    "cards": [
      [
        "Qual o objetivo do certificado TLS de servidor?",
        "Associar a identidade do serviço a chave pública verificável, conforme cadeia de confiança e nome correto."
      ],
      [
        "Por que TLS e autorização são controles distintos?",
        "TLS protege canal e identidade do servidor; autorização decide quais recursos o usuário pode acessar."
      ],
      [
        "JWT assinado é automaticamente secreto?",
        "Não. Assinatura protege integridade/autenticidade, enquanto sigilo exige proteção própria."
      ],
      [
        "O que significa autenticidade da origem?",
        "Poder verificar de forma adequada que dados ou mensagens provêm da entidade esperada."
      ]
    ]
  },
  {
    "id": 96,
    "title": "Continuidade: como RTO e RPO orientam recuperação",
    "goal": "Traduzir tempo de recuperação e perda de dados em requisitos verificáveis de backup, redundância e resposta.",
    "context": "Um hospital depende de um sistema de exames que não pode ficar indisponível por dias. Antes de comprar servidores, a direção precisa definir **quanto tempo de parada tolera** e **quantos dados pode perder**. **RTO** (*Recovery Time Objective*) é o tempo-alvo de restabelecimento de serviço após interrupção; **RPO** (*Recovery Point Objective*) representa o ponto-alvo de recuperação, frequentemente expresso como intervalo máximo de alterações que podem ser perdidas. Esses números orientam arquitetura, cópias, testes e prioridades.",
    "explanation": "Se o RPO é de 15 minutos, uma cópia diária não basta para garantir essa meta; pode ser necessário mecanismo mais frequente, como cópias de logs ou replicação adequada. Se o RTO é de duas horas, não é suficiente possuir backup que só leva doze horas para restaurar. A operação precisa de **plano de continuidade** com responsáveis, dependências, recursos e procedimentos testados. **BIA** (*Business Impact Analysis*) avalia impactos da interrupção sobre serviços e ajuda a definir prioridades; não é a mesma coisa que instalar um nobreak.",
    "connection": "Redundância de disco ou servidor pode ajudar disponibilidade, mas não corrige exclusão lógica ou corrupção replicada. Backups protegidos ajudam recuperação, mas seu RTO depende de armazenamento, máquinas, conectividade e equipe. Resposta a incidente trata contenção e segurança do retorno à operação, enquanto continuidade trata manter ou restaurar funções críticas. Os planos se relacionam, não são sinônimos. Também é importante distinguir **objetivo** de **resultado observado**: declarar RTO de duas horas não significa que testes o comprovem.",
    "exam": "Se a alternativa propõe backup a cada 24 horas para um RPO de 10 minutos sem outros mecanismos, está incompatível com a perda tolerada. Se confunde RTO e RPO, pergunte qual número fala da **duração da parada** e qual fala da **idade da cópia restaurada**. Uma questão pode fornecer interrupção às 14h e última cópia às 12h: a perda potencial é de cerca de duas horas de alterações, independentemente do tempo que a equipe leva para voltar.",
    "caseTitle": "O backup de ontem atende RPO de meia hora?",
    "caseSteps": [
      "O serviço parou às 14h; o backup recuperável mais recente é de 8h, e o RPO declarado é 30 minutos.",
      "Restaurar 8h implica risco de perder seis horas de alterações, acima do RPO de 30 minutos.",
      "Reveja mecanismo de recuperação de transações/logs e periodicidade para atingir o ponto de recuperação esperado.",
      "Meça também o tempo necessário para restabelecer o serviço e compare ao RTO separadamente."
    ],
    "pitfalls": [
      "RTO fala da recuperação em tempo; RPO fala do ponto de recuperação/perda tolerável.",
      "Ter backup não garante cumprir RTO ou RPO.",
      "Redundância não substitui recuperação de versões anteriores.",
      "Metas precisam ser testadas; declaração formal sozinha não comprova capacidade."
    ],
    "cards": [
      [
        "O que representa RTO?",
        "Tempo-alvo de restabelecimento do serviço após interrupção."
      ],
      [
        "O que representa RPO?",
        "Ponto-alvo de recuperação, associado ao intervalo de dados que a organização admite perder."
      ],
      [
        "Por que backup diário pode não atender RPO de 15 minutos?",
        "Porque a cópia mais recente pode estar muitas horas atrás do momento da falha."
      ],
      [
        "O que faz uma análise de impacto no negócio (BIA)?",
        "Avalia consequências de interrupções para priorizar serviços e orientar metas de continuidade."
      ]
    ]
  },
  {
    "id": 122,
    "title": "Governança de segurança: função Govern no NIST CSF 2.0",
    "goal": "Entender papéis, políticas, cadeia de suprimentos e acompanhamento estratégico sem reduzir Govern a instalação de ferramentas.",
    "context": "Uma equipe de TI protege computadores, mas cada gestor toma decisões isoladas sobre fornecedores, acessos e backups. Mesmo com controles técnicos, a organização pode não saber **qual risco aceita**, quem responde por cada decisão ou como comprovar resultados. Essa é uma lacuna de **governança**: direção, responsabilidades e supervisão dos objetivos de segurança. A função **Govern (GV)** do NIST CSF 2.0 estrutura resultados associados a contexto organizacional, estratégia, políticas, responsabilidades e supervisão.",
    "explanation": "Governar envolve identificar expectativas das partes interessadas, definir responsabilidades, estabelecer abordagem para gestão de riscos e monitorar desempenho. **Cadeia de suprimentos** de tecnologia inclui fornecedores de sistemas, infraestrutura, processamento em nuvem e serviços que afetam informação. Contratos e acessos de terceiros precisam de critérios, responsáveis e avaliação de riscos. A função Govern não exige que diretores instalem pessoalmente firewall: eles estabelecem direção, prioridades, recursos e cobram evidências de execução.",
    "connection": "Diferencie **governança** de **gestão**: governança avalia, direciona e monitora resultados; gestão planeja e executa atividades sob diretrizes. O COBIT também trabalha essa separação, mas NIST CSF trata de resultados de segurança. A LGPD pode impor deveres legais específicos, mas o CSF é referência, não lei automática. Uma política de backup sem teste operacional é direção insuficientemente comprovada; é necessário conectar responsabilidades à prática.",
    "exam": "Se uma banca descreve comitê definindo apetite de risco e exigindo relatórios de fornecedores, classifique como **Govern**, não como Detect. Se descreve analista configurando alerta, trata mais diretamente de Detect. A função Govern foi explicitamente destacada no CSF 2.0; não use lista antiga de apenas cinco funções quando o edital pede versão 2.0. Consulte [NIST CSF](https://www.nist.gov/cyberframework) para terminologia oficial.",
    "caseTitle": "Terceirizada acessa dados de pacientes sem responsável definido",
    "caseSteps": [
      "Identifique fornecedores e dados envolvidos, bem como quem na organização autorizou e supervisiona o acesso.",
      "Defina papéis, critérios de concessão, prazos, revogação e monitoramento no contexto da governança.",
      "Exija evidências de controles do fornecedor e fluxo de incidente compatível com risco e contrato.",
      "Monitore resultados e revise políticas; configurar uma senha sem responsabilidade não encerra o risco."
    ],
    "pitfalls": [
      "Governança não é sinônimo de executar configuração técnica.",
      "NIST CSF 2.0 possui seis funções, incluindo Govern.",
      "Fornecedor pode gerar risco mesmo quando opera fora das instalações.",
      "Política escrita não comprova funcionamento de controle sem evidência operacional."
    ],
    "cards": [
      [
        "Qual problema a função Govern ajuda a resolver?",
        "Definir direção, responsabilidades, estratégia, políticas e supervisão do risco de segurança."
      ],
      [
        "A função Govern exige que a direção configure servidores?",
        "Não. Direção e supervisão são distintas da execução operacional dos controles."
      ],
      [
        "Por que fornecedores entram na governança de segurança?",
        "Porque podem acessar dados ou afetar continuidade e precisam de responsabilidades e controles acompanhados."
      ],
      [
        "Como demonstrar que uma política funciona?",
        "Por resultados e evidências de execução, monitoramento e revisão, não apenas pela existência do documento."
      ]
    ]
  },
  {
    "id": 123,
    "title": "RTO, RPO e continuidade: quais decisões vêm antes do backup?",
    "goal": "Aplicar requisitos de continuidade a serviços de diferentes prioridades e medir se a recuperação atende aos limites.",
    "context": "Uma empresa possui sistema de emissão de notas e portal de notícias interno. Uma parada de quatro horas pode ter efeitos muito diferentes em cada um. A **continuidade** é a capacidade de manter ou retomar atividades relevantes durante interrupções, com prioridades definidas. Não se escolhe frequência de backup por hábito: primeiro avalia-se **impacto sobre o serviço** e a perda tolerável. **RTO** orienta tempo de recuperação; **RPO** orienta ponto a partir do qual os dados devem estar disponíveis após restauração.",
    "explanation": "Uma **BIA** analisa consequências da interrupção e dependências: pessoas, aplicações, rede, equipamentos, fornecedores. Após definir RTO/RPO, selecione soluções adequadas: redundância, cópias frequentes, replicação, plano manual de contingência e procedimentos de retorno. Cada tecnologia possui falhas que não cobre; replicação imediata pode replicar corrupção, enquanto cópias imutáveis podem ter restauração mais lenta. Por isso compare requisitos com **teste real de recuperação**, não apenas especificação do fornecedor.",
    "connection": "Quando ocorre incidente de segurança, **conter e investigar** é indispensável para recuperar em ambiente seguro. O plano de continuidade informa como manter atividades essenciais enquanto a TI responde. Uma política de backup contribui para RPO, mas o RTO pode falhar por depender de conectividade ou de configuração manual. Observe também a diferença entre meta e medição: se plano promete duas horas, o exercício de restauração deve medir o intervalo real entre interrupção simulada e retorno do serviço.",
    "exam": "Na questão 'perda de dados de no máximo 30 minutos', a resposta está ligada ao **RPO**, não ao RTO. Na questão 'serviço deve voltar em até três horas', está ligado ao **RTO**. Se a prova traz dois serviços com impactos muito diferentes e oferece a mesma meta sem análise, desconfie da falta de priorização. Se o enunciado pedir evidências, a melhor resposta tende a incluir testes documentados de recuperação e ajustes em falhas encontradas.",
    "caseTitle": "Duas aplicações precisam da mesma estratégia de recuperação?",
    "caseSteps": [
      "Sistema A realiza atendimento crítico e exige RTO de 30 minutos; sistema B é histórico interno e admite RTO de 48 horas.",
      "A BIA justifica priorizar recursos de redundância e procedimentos rápidos para A.",
      "Para B, backups mais lentos podem ser aceitáveis, desde que RPO e obrigações específicas também sejam respeitados.",
      "Valide por testes separados e não adote solução idêntica apenas porque ambos são aplicativos."
    ],
    "pitfalls": [
      "RTO e RPO são metas diferentes e complementares.",
      "BIA avalia impacto, não é apenas inventário de computadores.",
      "Replicação pode propagar erro lógico e não elimina backups independentes.",
      "Um plano sem testes não comprova capacidade de recuperação."
    ],
    "cards": [
      [
        "Por que realizar BIA antes de comprar solução de backup?",
        "Para identificar impacto e prioridades e definir metas proporcionais à importância dos serviços."
      ],
      [
        "RTO de 30 minutos significa o quê?",
        "Que o objetivo é restabelecer a função/serviço em até cerca de trinta minutos após a interrupção."
      ],
      [
        "RPO de 30 minutos significa o quê?",
        "Que o ponto-alvo de recuperação tolera aproximadamente até trinta minutos de alterações perdidas."
      ],
      [
        "Por que replicação não substitui backup?",
        "Porque alterações indevidas e corrupção podem ser replicadas, exigindo versões independentes para restauração."
      ]
    ]
  },
  {
    "id": 124,
    "title": "Zero Trust: por que estar na rede interna não basta",
    "goal": "Entender Zero Trust, validação contínua, acesso por contexto e relação com MFA e menor privilégio.",
    "context": "Uma empresa costuma pensar que quem está dentro da rede corporativa é confiável. Mas um notebook interno pode estar comprometido ou uma conta de usuário pode ter senha roubada. A abordagem **Zero Trust** parte da ideia de **não conceder confiança automaticamente pela localização de rede**. Isso não significa negar todo acesso nem desconfiar moralmente das pessoas: significa exigir verificação contextual e aplicar permissões apropriadas mesmo em ambientes considerados internos.",
    "explanation": "Uma decisão de acesso pode considerar identidade, dispositivo, condição de segurança, recurso, ação, contexto e políticas. **MFA** ajuda a confirmar identidade com fatores distintos. **Menor privilégio** limita o alcance da conta às tarefas necessárias. **Segmentação** reduz caminhos disponíveis entre sistemas. Logs e reavaliação de contexto ajudam a perceber alterações relevantes na sessão. O controle eficaz precisa ocorrer perto do recurso protegido: simplesmente esconder a tela ou confiar no IP interno não é suficiente.",
    "connection": "Zero Trust é uma **estratégia arquitetural**, não um produto único que se instala para 'ativar segurança'. Ela se relaciona a IAM, autenticação, autorização e monitoramento, mas não substitui backups nem a gestão de incidentes. Uma VPN pode oferecer canal protegido de acesso à empresa, porém entrar pela VPN não deve conceder automaticamente acesso a todo servidor. Na aplicação, APIs precisam verificar ações sobre recursos, não apenas a existência de cookie de login.",
    "exam": "Se a banca disser 'todo usuário da LAN interna pode acessar qualquer arquivo', isso contraria Zero Trust e menor privilégio. Se disser que Zero Trust proíbe VPN, também é generalização incorreta: VPN pode integrar uma arquitetura com decisões de acesso restritas. O foco é verificar explicitamente o pedido e limitar o alcance da autorização. Referência conceitual: [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final).",
    "caseTitle": "Usuário logado pela VPN tenta acessar banco financeiro",
    "caseSteps": [
      "O colaborador conecta pela VPN com MFA, comprovando determinada identidade e estabelecendo comunicação protegida.",
      "O aplicativo verifica que seu perfil exige apenas acesso ao sistema de atendimento, não ao banco financeiro.",
      "A regra nega o pedido ao banco; a conexão VPN continua válida para recursos permitidos.",
      "Registre decisão e revise privilégios: localização interna e login não substituem autorização do recurso específico."
    ],
    "pitfalls": [
      "Zero Trust não equivale a bloquear todo usuário sempre.",
      "Acesso por VPN não concede permissão irrestrita à rede interna.",
      "MFA valida identidade, não define todos os privilégios.",
      "Zero Trust é estratégia de controles e decisões, não marca de ferramenta obrigatória."
    ],
    "cards": [
      [
        "Qual o princípio central de Zero Trust?",
        "Não conceder confiança automática pela posição na rede; verificar acesso conforme identidade, recurso e contexto."
      ],
      [
        "Uma VPN dispensa autorização por sistema?",
        "Não. Ela pode proteger conectividade, mas cada recurso precisa de decisão de acesso adequada."
      ],
      [
        "Como menor privilégio se relaciona a Zero Trust?",
        "Limita o conjunto de ações e dados acessíveis à necessidade real da função."
      ],
      [
        "Zero Trust é apenas comprar uma ferramenta?",
        "Não. É arquitetura e abordagem de políticas, identidade, dispositivos, segmentação e monitoramento."
      ]
    ]
  },
  {
    "id": 154,
    "title": "Oficina de incidente: contenção, evidência e restauração segura",
    "goal": "Aplicar resposta defensiva a um incidente sem destruir evidências ou restaurar em ambiente ainda comprometido.",
    "context": "Um servidor que guarda documentos começa a renomear milhares de arquivos e usuários relatam falta de acesso. Antes de 'reiniciar tudo', a equipe precisa decidir se há comportamento suspeito, quais serviços estão sob risco e como reduzir danos. **Evidência digital** pode incluir logs, horários e estado de sistemas úteis para análise, desde que preservados com rastreabilidade e integridade. **Contenção** significa limitar propagação ou efeito adverso enquanto a investigação continua. É diferente de **erradicação**, que busca remover causas/artefatos da ameaça, e de **recuperação**, que procura restabelecer capacidades.",
    "explanation": "Organize responsabilidades: quem lidera o incidente, quem comunica operações e quem pode isolar o servidor? Uma resposta proporcional pode restringir rede e credenciais do ativo afetado, registrando horário e motivo. Preservar logs, cópias e metadados relevantes ajuda a reconstruir fatos; não se deve apagar tudo para liberar espaço. Investigue escopo, persistência e possíveis credenciais comprometidas. Depois de erradicar e corrigir, restaure serviços a partir de fontes confiáveis e acompanhe sinais de reinfecção.",
    "connection": "Essa oficina relaciona **segurança** e **continuidade**. Um RTO exigente não autoriza restaurar um servidor ainda sob controle de atacante; uma investigação infinita também pode prejudicar pacientes e usuários. A equipe precisa coordenar decisões entre responsáveis clínicos, operacionais e técnicos. Os **backups** devem ser protegidos e restauráveis; o plano de resposta inclui comunicação e evidência da sequência de decisões. Nem todo alerta confirma incidente, mas sinais graves justificam ação de triagem rápida.",
    "exam": "Em alternativa de prova, 'formatar o servidor imediatamente' pode destruir evidência e deixar causa não compreendida. 'Reativar todos os serviços após copiar arquivos' ignora integridade e permanência da ameaça. Uma resposta melhor identifica, contém conforme risco, preserva evidências, investiga causa, recupera em ambiente confiável e revisa controles. A ordem prática pode ter atividades sobrepostas, mas cada decisão deve ter justificativa e responsável.",
    "caseTitle": "Três passos errados e uma resposta adequada ao ransomware",
    "caseSteps": [
      "A equipe observa renomeação anormal e registra indícios, horário, máquinas afetadas e impacto; trata como incidente em investigação.",
      "Coordena contenção proporcional para impedir expansão, preservando registros relevantes e protegendo cópias de segurança.",
      "Investiga entrada, alcance e persistência; revoga credenciais comprometidas e corrige fragilidades verificadas.",
      "Restaura dados íntegros em ambiente confiável, monitora retorno e documenta melhorias para reduzir recorrência."
    ],
    "pitfalls": [
      "Formatar imediatamente pode eliminar evidências necessárias à investigação.",
      "Contenção e erradicação não são sinônimos.",
      "Restaurar em ambiente ainda comprometido pode reinfectar serviços.",
      "Logs e backups precisam de proteção e validação, não apenas existência nominal."
    ],
    "cards": [
      [
        "Qual o objetivo da contenção em um incidente?",
        "Limitar propagação e consequências enquanto equipes analisam e organizam resposta."
      ],
      [
        "Por que preservar evidências antes de alterações destrutivas?",
        "Para permitir análise posterior, reconstruir o ocorrido e sustentar decisões e responsabilidades."
      ],
      [
        "Quando a recuperação deve ser considerada segura?",
        "Quando a equipe avaliou a causa, reduziu risco de persistência e validou integridade das fontes e serviços restaurados."
      ],
      [
        "Qual o papel das lições aprendidas?",
        "Transformar descobertas do incidente em controles, responsáveis e verificações que reduzam recorrência."
      ]
    ]
  },
  {
    "id": 155,
    "title": "Oficina de acesso: MFA, matriz de permissões e risco residual",
    "goal": "Construir uma matriz de funções e acessos, verificar fatores de autenticação e avaliar risco que permanece depois dos controles.",
    "context": "Imagine uma organização com três sistemas: prontuários, financeiro e recursos humanos. Se todos os colaboradores acessam tudo por pertencerem à mesma rede, um erro ou credencial roubada pode expor informações de muitas pessoas. Uma **matriz de acesso** relaciona papéis/usuários a **recursos** e **ações permitidas**. Ela torna explícita a decisão de autorização, diferente do processo de autenticar a identidade. Essa representação é útil para verificar princípios como **menor privilégio** e **segregação de funções**.",
    "explanation": "Comece listando papéis de trabalho, por exemplo Recepção, Financeiro e Administração. Depois liste recursos e ações, como 'consultar cadastro', 'alterar pagamento' e 'exportar prontuário'. Para cada célula, registre se a atividade exige permissão e quem aprova. O **MFA** protege o processo de confirmação de identidade com fatores distintos; porém a autorização precisa conferir permissões sobre cada recurso. Mudança de função, desligamento e acesso temporário exigem revisão e revogação, não manutenção indefinida de privilégios antigos.",
    "connection": "Uma matriz documentada não resolve automaticamente falhas de API: o sistema deve aplicar as regras no servidor e registrar tentativas relevantes. O **risco residual** é o que permanece mesmo depois de MFA, grupos e revisão de acessos: por exemplo, um usuário legítimo autorizado pode cometer erro ou sofrer comprometimento da sessão. Monitoramento, treinamento e processos de auditoria reduzem outros riscos. Na LGPD, dados de saúde exigem cuidados adicionais, de acordo com a operação.",
    "exam": "Se uma questão sugerir dar acesso administrativo a todos para facilitar suporte, isso aumenta privilégio e superfície de dano. Se exigir MFA para todo login, mas manter todas as contas com poderes excessivos, a autenticação melhorou sem sanar autorização. Um caso de alteração de departamento deve levar a revisar grupos e permissões. A banca procura a distinção entre **quem é** a pessoa, **o que pode fazer** e **como verificar que a regra é respeitada**.",
    "caseTitle": "Monte a matriz mínima para três papéis",
    "caseSteps": [
      "Defina recursos: cadastro, faturamento e relatório sensível. Defina papéis: Recepção, Financeiro e Gestor.",
      "Conceda à Recepção apenas funções do cadastro; ao Financeiro funções necessárias a pagamentos; ao Gestor relatórios autorizados.",
      "Aplique regras no backend e teste tentativa de cada papel de acessar recurso fora do escopo, mesmo com login válido.",
      "Implemente revisão periódica e revogação após mudança de função; documente riscos residuais e responsáveis."
    ],
    "pitfalls": [
      "MFA não substitui autorização granular sobre recursos.",
      "Grupo amplo 'todos os usuários' não é sinônimo de menor privilégio.",
      "Permissão antiga deve ser revista quando o papel da pessoa muda.",
      "Matriz escrita só funciona se os sistemas aplicam e auditam as regras."
    ],
    "cards": [
      [
        "O que representa uma matriz de acesso?",
        "A relação entre identidades/papéis, recursos e ações autorizadas, explicitando limites de permissão."
      ],
      [
        "MFA evita todo acesso indevido?",
        "Não. Reduz riscos de autenticação, mas não corrige privilégios excessivos nem todas as fraudes de sessão."
      ],
      [
        "O que é segregação de funções?",
        "Separar responsabilidades críticas para que uma única pessoa não controle indevidamente todo um processo."
      ],
      [
        "O que é risco residual de acesso?",
        "O risco que permanece após controles de autenticação, autorização, revisão e monitoramento."
      ]
    ]
  }
] satisfies EditorialSeed[])
