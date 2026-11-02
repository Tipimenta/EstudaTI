# EstudaTI — SEG: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# Risco, controles e NIST CSF 2.0

# Objetivo e contexto
Distinguir ativo, ameaça, vulnerabilidade, risco, tratamento e função do NIST CSF.

## Aula detalhada — entenda o mecanismo
Segurança da informação não se resume ao trio **confidencialidade, integridade e disponibilidade** (CID). Autenticidade, responsabilização e capacidade de recuperação importam conforme o contexto. O risco pode ser descrito pela possibilidade de um evento afetar objetivos, considerando probabilidade e impacto, conforme metodologia adotada. Um **ativo** é algo que tem valor; uma **ameaça** é fonte potencial de dano; uma **vulnerabilidade** é fraqueza explorável; um **controle** altera o risco. Evite confundir impacto com probabilidade.

O **NIST CSF 2.0** apresenta seis funções contínuas: Governar (Govern), Identificar, Proteger, Detectar, Responder e Recuperar. Não são fases obrigatoriamente sequenciais. Governar inclui contexto, estratégia, papéis, políticas, risco na cadeia de suprimentos e supervisão. Identificar envolve ativos e riscos. Proteger inclui gestão de identidade, treinamento e proteção de dados. Detectar monitora eventos; Responder contém incidentes; Recuperar restaura serviços e comunica progresso. O CSF descreve resultados desejados, não prescreve uma tecnologia específica.

Um controle pode ser preventivo (MFA), detectivo (alerta de log) ou corretivo (reestabelecimento de serviço). Essas classificações são funções analíticas e um mesmo mecanismo pode desempenhar mais de um papel. Não confunda “tem firewall” com “governança e segurança estão completas”.

## Exemplo resolvido passo a passo
Clínica com PACS local e backup na mesma sala: ativo = imagens médicas e serviços; ameaça = incêndio/ransomware; vulnerabilidade = cópia única ou sem isolamento adequado; impactos = indisponibilidade do atendimento e perda de dados.

Passo 1: identificar processos críticos, requisitos de recuperação e responsáveis. Passo 2: mapear cópias, privilégios, dependências e fornecedores. Passo 3: definir tratamento: cópia segregada, testes de restauração e controle de acesso. Passo 4: registrar evidências e acompanhar efetividade.

A prova pode perguntar onde se enquadra uma política formal de gestão de fornecedores: principalmente **Governar**, não apenas Proteger. Um alerta em SIEM se associa a Detectar; um procedimento de contenção e erradicação, a Responder; retorno controlado do PACS, a Recuperar.

## Erros clássicos nas bancas
**Armadilha:** “NIST CSF obriga ferramenta X” é falso: é orientado a resultados. **Armadilha:** “governança = inventário de TI” simplifica e confunde Governar com Identificar. **Armadilha:** backups existentes não provam recuperabilidade sem ensaio de restauração. **Armadilha:** risco residual não precisa ser zero; deve ser decidido conforme apetite e critérios organizacionais.

## Pratique sem consultar
Construa uma matriz com três riscos de uma clínica: perda de acesso ao RIS, vazamento de imagens e interrupção de energia. Para cada risco, indique ativo, ameaça, vulnerabilidade, impacto, responsável, controle preventivo, detecção e teste da resposta. Depois aponte a função principal do NIST CSF de cada controle.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual das funções foi adicionada com destaque no NIST CSF 2.0 para coordenar estratégia, política e supervisão?

A) Governar (Govern)
B) Detectar (Detect)
C) Recuperar (Recover)
D) Proteger (Protect)

**Gabarito:** A — A função Govern estabelece e monitora a estratégia de gestão de risco cibernético.

**Questão 2.** Um backup que existe, mas nunca teve restauração testada, prova qual afirmação?

A) Existe cópia, mas a recuperabilidade ainda não foi demonstrada
B) É suficiente para RTO zero
C) Substitui o plano de continuidade
D) Elimina o risco de ransomware

**Gabarito:** A — Sem teste de restauração não há evidência suficiente de que dados e serviços podem ser recuperados no tempo necessário.


---

# Criptografia, TLS, hashes e IAM

# Objetivo e contexto
Relacionar propriedades criptográficas e controles de identidade sem confundir conceitos.

## Aula detalhada — entenda o mecanismo
**Criptografia simétrica** utiliza a mesma chave secreta para cifrar e decifrar (ex.: AES); costuma ser eficiente para dados em volume. **Assimétrica** utiliza pares de chaves pública/privada (ex.: RSA e criptografia de curvas elípticas, conforme esquema), com aplicações como assinatura, troca/encapsulamento de chaves e estabelecimento de confiança. O uso concreto depende do algoritmo, modo e protocolo; não presuma que “qualquer cifra assimétrica cifra um arquivo inteiro”.

**Hash criptográfico** produz resumo de tamanho definido, usado para integridade, assinaturas e outros protocolos. Hash não é reversível como cifra; senhas devem usar funções de derivação adequadas com salt e parâmetros custosos, e não apenas SHA-256 direto. Uma **assinatura digital** normalmente assina hash/representação com chave privada e é verificada com chave pública, sustentando integridade e autenticidade da origem conforme o esquema. Cifra por si só não dá garantia equivalente de assinatura.

**TLS** autentica endpoints conforme certificados e configurações e protege confidencialidade e integridade do canal. Cadeias de certificação precisam ser validadas; HTTPS não significa que o próprio site seja honesto. Em IAM, diferencie autenticação (identidade), autorização (permissão) e auditoria (registro). MFA exige fatores de categorias distintas, como senha (conhecimento) + chave de segurança física (posse); duas senhas não constituem MFA.

## Exemplo resolvido passo a passo
Considere uma aplicação de exames que permite acesso externo: 1) gere conexão HTTPS com certificado para nome de domínio correto; 2) exija identidade individual e MFA em perfis privilegiados; 3) atribua permissões por função e necessidade; 4) registre acesso a dados sensíveis; 5) proteja dados em repouso com gestão apropriada de chaves.

Se um arquivo sofre alteração, um hash previamente registrado pode indicar diferença, mas isoladamente não comprova quem publicou o hash. Se for necessário comprovar procedência, acrescente mecanismo de assinatura/autenticação. Se o navegador mostra certificado inválido, não “resolva” permanentemente desativando validação TLS. A prova pode oferecer “criptografia assimétrica sempre é mais rápida que AES” como alternativa falsa.

## Erros clássicos nas bancas
**Pegadinha:** criptografia não elimina necessidade de controle de acesso. **Pegadinha:** hash não é compressão recuperável. **Pegadinha:** MFA não é “digitar a mesma senha duas vezes”. **Pegadinha:** sessão HTTPS válida não impede phishing. **Pegadinha:** chave pública não deve ser confundida com segredo: é destinada à distribuição, enquanto a privada exige proteção.

## Pratique sem consultar
Explique como armazenaria senhas de usuários, como protegeria o tráfego entre navegador e API e como auditá-lo sem expor credenciais. Para cada decisão, declare qual propriedade de segurança está sendo atendida. Diferencie um token assinado de um token criptografado.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
NIST — Diretrizes de Identidade Digital: https://pages.nist.gov/800-63-4/
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Para armazenar senhas de usuários em um serviço web, qual é a opção adequada?

A) Função de derivação de senha com salt e parâmetros de custo
B) Criptografia reversível com chave fixa no código
C) SHA-256 simples sem salt como escolha ideal
D) Codificação Base64

**Gabarito:** A — Funções específicas como Argon2id, scrypt ou PBKDF2 conforme requisitos são desenhadas para dificultar ataques offline; Base64 não é proteção.

**Questão 2.** Qual cenário representa autenticação multifator com categorias diferentes?

A) Senha e chave de segurança física
B) Senha e pergunta secreta
C) Duas senhas distintas
D) PIN e outra informação memorizada

**Gabarito:** A — MFA combina fatores de categorias diferentes; apenas vários conhecimentos não constituem múltiplos fatores.


---

# Incidentes, continuidade, RTO/RPO e recuperação

# Objetivo e contexto
Planejar respostas defensivas e distinguir metas de tempo e perda aceitável.

## Aula detalhada — entenda o mecanismo
**Evento** é ocorrência observada; **incidente de segurança** envolve comprometimento real ou potencial que requer processo de resposta. A resposta pode incluir preparação, identificação/análise, contenção, erradicação, recuperação e lições aprendidas. O encadeamento exato depende do referencial; nenhuma etapa dispensa gestão de evidências e comunicação.

**RTO** (Recovery Time Objective) é o tempo-alvo de restauração de uma atividade ou serviço. **RPO** (Recovery Point Objective) é o ponto máximo de perda de dados tolerável medido em tempo. Se backup acontece a cada 24h, a perda potencial desde o último backup pode chegar perto de 24h; isso não demonstra RPO de uma hora. **Backup**, **replicação**, **alta disponibilidade** e **plano de continuidade** não são sinônimos: replicação também pode replicar corrupção, e alta disponibilidade não garante cópia histórica segura.

Estratégia prática defensiva: classificar criticidade, manter inventário, segmentar acessos, ter cópias segregadas e imutáveis quando viável, testar recuperação em ambiente controlado, definir comunicação e exercícios. Logs devem ser preservados com cuidado e acesso restrito; não reinstale imediatamente uma máquina comprometida sem avaliar preservação de evidências e orientação dos responsáveis.

## Exemplo resolvido passo a passo
Uma clínica recebe alertas de criptografia indevida em um servidor. Primeiro, acione o plano de resposta, valide os indícios e contenha propagação conforme procedimento autorizado; preserve registros e envolva responsáveis. Não religue serviços suspeitos sem análise. Em paralelo, decida com os gestores quais atendimentos podem continuar degradados.

Sistema A: a organização admite no máximo 2h sem funcionar (RTO=2h) e perder no máximo 15min de atualizações (RPO=15min). Um backup noturno não cumpre automaticamente esse RPO. A solução técnica deve corresponder às metas e passar por testes documentados.

No pós-incidente, identifique causa, gaps de detecção e prevenção, atualize runbooks e registre testes. A questão de prova pode trocar “RTO” por “perda de dados aceitável”, uma confusão frequente.

## Erros clássicos nas bancas
**Pegadinha 1:** RTO = tempo de recuperação, não intervalo de backup. **Pegadinha 2:** RPO se refere à antiguidade tolerável dos dados recuperados. **Pegadinha 3:** replicação contínua sem versionamento pode perpetuar alterações maliciosas. **Pegadinha 4:** estabilidade de rede não substitui plano de comunicação com a direção e áreas de negócio.

## Pratique sem consultar
Defina RTO e RPO para PACS e RIS, justificando pelas necessidades de atendimento. Desenhe uma política que combina cópia local, cópia fora do local e teste periódico de restauração. Liste três indicadores de que o teste foi bem-sucedido (integridade, tempo, possibilidade de uso real).

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Em continuidade de negócio, RPO de 30 minutos indica principalmente:

A) Limite-alvo de perda temporal de dados
B) Tempo máximo para recolocar servidores em produção
C) Intervalo fixo entre auditorias
D) Tempo máximo de bloqueio de usuário

**Gabarito:** A — RPO quantifica a janela de dados que a organização tolera perder no retorno a um ponto anterior.

**Questão 2.** Uma replicação que propaga todas as alterações substitui necessariamente backup com histórico?

A) Não, pois pode reproduzir corrupção e exclusões
B) Sim, porque cópias replicadas nunca são alteradas
C) Sim, porque RTO e RPO são idênticos
D) Sim, porque replicação dispensa testes

**Gabarito:** A — Replicação não substitui retenção de versões, segregação e testes de restauração.
