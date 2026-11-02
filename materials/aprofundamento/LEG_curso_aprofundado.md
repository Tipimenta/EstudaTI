# EstudaTI — LEG: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# LGPD: princípios, bases legais e agentes

# Objetivo e contexto
Distinguir tratamento, papéis e hipóteses legais sem simplificar consentimento.

## Aula detalhada — entenda o mecanismo
A **LGPD (Lei 13.709/2018)** disciplina tratamento de dados pessoais inclusive digitais por agentes públicos e privados, com exceções e regras próprias. **Dado pessoal** identifica ou torna identificável pessoa natural; **dado sensível** inclui dados sobre saúde, entre outras categorias legais; **tratamento** inclui coleta, acesso, armazenamento, compartilhamento e exclusão. Informação anonimizada, se realmente não identificável com meios razoáveis, segue enquadramento próprio; pseudonimização não é sinônimo de anonimização irreversível.

Princípios do art. 6º incluem finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização/prestação de contas. **Controlador** toma decisões sobre tratamento; **operador** realiza em nome do controlador; **encarregado** atua como canal de comunicação nos termos legais e regulamentares. A classificação depende das decisões e relações reais, não apenas do nome no contrato.

**Consentimento** é uma entre várias bases legais, e dados sensíveis possuem hipóteses do art. 11. Não suponha que toda operação em clínica depende de consentimento: proteção da vida, tutela da saúde nas condições legais e obrigações legais podem ser relevantes, devendo avaliar cenário concreto. Direitos dos titulares e deveres de segurança precisam ser interpretados junto de limitações e regras para o poder público.

## Exemplo resolvido passo a passo
Uma clínica registra identificação e imagens para realizar exame. Identifique quais dados são pessoais e quais são sensíveis; mapeie finalidade, necessidade, prazos legais, acessos e compartilhamentos. Determine papel de clínica e fornecedor PACS conforme quem decide finalidades/meios essenciais e quem processa por instruções, em vez de usar rótulos genéricos.

Um funcionário envia laudo para destinatário errado: pode ocorrer incidente de segurança com dados pessoais; contenha exposição, avalie risco, registre fatos, preserve evidências e siga regras de comunicação à ANPD e titulares aplicáveis ao caso. Não informe automaticamente que “qualquer erro deve ser comunicado em 24 horas”: procedimentos e prazos dependem de normas vigentes e enquadramento.

## Erros clássicos nas bancas
**Pegadinha:** GDPR e LGPD não são leis idênticas. **Pegadinha:** consentimento não é a única base. **Pegadinha:** dado de saúde é categoria sensível. **Pegadinha:** operador não é necessariamente empresa de TI; papel é funcional no tratamento. **Pegadinha:** “ter firewall” não prova cumprimento de todos os princípios da LGPD.

## Pratique sem consultar
Faça um inventário hipotético de dados do agendamento, separando dados comuns e sensíveis. Para cada tratamento, defina propósito, base legal a estudar, minimização, quem acessa, prazo e risco. Liste dois direitos dos titulares e confira redação vigente na fonte oficial.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Planalto — texto atualizado da LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Na LGPD, informação individual sobre diagnóstico de saúde é classificada em regra como:

A) Dado pessoal sensível
B) Dado não pessoal por padrão
C) Dado público sem restrições
D) Dado anônimo independentemente do contexto

**Gabarito:** A — Dados referentes à saúde são sensíveis; o tratamento exige enquadramento jurídico e proteção apropriados.

**Questão 2.** Qual afirmação sobre consentimento na LGPD está correta?

A) É uma das bases legais, não a única
B) É obrigatório em todo tratamento de dados pessoais
C) Substitui deveres de segurança e finalidade
D) Elimina necessidade de informação ao titular em qualquer caso

**Gabarito:** A — A LGPD contempla várias bases legais conforme dados e finalidade; consentimento não é universal.


---

# Lei 14.133/2021: ETP, TR e contratos de TI

# Objetivo e contexto
Compreender sequência de planejamento e fiscalização em contratações públicas.

## Aula detalhada — entenda o mecanismo
A **Lei 14.133/2021** estabelece normas gerais de licitações e contratos administrativos; regras locais e regulamentares complementam procedimentos. O **Estudo Técnico Preliminar (ETP)** investiga necessidade e solução mais adequada, avaliando viabilidade técnica/econômica; o **Termo de Referência (TR)** especifica objeto e condições de contratação de bens/serviços, conforme aplicação. O art. 18 trata da fase preparatória; a definição de TR no art. 6º, XXIII, inclui objeto, fundamentação, requisitos, execução, gestão, critérios de medição/pagamento e outros parâmetros.

Planejamento de compra de TI começa **pelo problema público**, não pela marca desejada. Descreva necessidades, alternativas tecnológicas, quantidades, custos de ciclo de vida, requisitos de segurança e interoperabilidade, critérios de aceite e riscos. A contratação deve observar impessoalidade, isonomia, planejamento e legislação. Gestão e fiscalização de contratos são atividades distintas de elaboração do edital, embora interfaces existam.

Em questões, não trate ETP e TR como sinônimos: ETP ajuda a justificar solução; TR detalha objeto e como contratar/medir. Há hipóteses e regulamentações específicas quanto à obrigatoriedade e conteúdo, portanto sempre consulte texto vigente, órgão e edital. Um profissional de TI pode contribuir tecnicamente, sem substituir atribuições jurídicas e administrativas das unidades competentes.

## Exemplo resolvido passo a passo
Prefeitura precisa contratar backup externo. ETP: qual problema? Risco de perda de dados e tempo de recuperação inadequado. Quais alternativas? Serviço gerenciado, solução própria, híbrida; compare custo total, localização e proteção de dados, retenção, recuperação, rede, dependência de fornecedor e requisitos.

TR: descreva volume de dados, criptografia, retenção, controle de acesso, localização, testes de recuperação, métricas, critérios de aceite, suporte, penalidades conforme jurídico e pagamentos. A fiscalização acompanha SLA, evidências de backup e restaurações aprovadas.

Se proposta de fornecedor promete “backup ilimitado”, sem delimitar volume, tráfego e recuperação, o objeto e os critérios de recebimento estão pouco claros. A prova pode perguntar em qual fase se estuda alternativas de solução: ETP.

## Erros clássicos nas bancas
**Pegadinha:** licitação não começa pela escolha da marca sem justificativa. **Pegadinha:** TR não é documento meramente publicitário; precisa critérios verificáveis. **Pegadinha:** ETP não “substitui automaticamente” o termo de referência. **Pegadinha:** fiscalização de contrato de TI não dispensa indicadores, aceite e documentação de execução.

## Pratique sem consultar
Escreva um mini-ETP de 12 linhas para contratar links redundantes para unidades de saúde e um mini-TR com objeto, requisito, testes de aceite, prazo, acompanhamento e critérios de medição. Identifique onde entram requisitos LGPD e segurança.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Planalto — Lei 14.133/2021: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual documento da fase preparatória se destina a estudar necessidade e viabilidade de alternativas de solução?

A) Estudo Técnico Preliminar (ETP)
B) Nota fiscal de serviço já executado
C) Termo de posse do fiscal
D) Ordem de pagamento

**Gabarito:** A — ETP fundamenta necessidade, alternativas e viabilidade da solução a contratar, na forma da legislação.

**Questão 2.** Qual requisito é coerente com um Termo de Referência de serviço de backup?

A) Definir objeto, retenção, testes de restauração e critérios de aceite
B) Escolher qualquer marca sem critérios
C) Dispensar condições de medição do contrato
D) Não especificar responsabilidades de segurança

**Gabarito:** A — TR precisa descrever condições e requisitos para seleção, execução e fiscalização do objeto.


---

# LAI, Governo Digital e transparência com privacidade

# Objetivo e contexto
Conciliar acesso à informação, proteção de dados e transformação digital.

## Aula detalhada — entenda o mecanismo
A **Lei 12.527/2011 (LAI)** regula acesso a informações públicas e obriga transparência ativa e passiva conforme regras, competências e exceções legais. Transparência ativa publica dados de interesse geral; passiva responde a solicitações. Informações pessoais podem ter restrições e tratamento próprios. Sigilo legal é exceção delimitada, não justificativa automática para negar todo documento.

A **Lei 14.129/2021 (Governo Digital)** busca eficiência, desburocratização, transformação digital e participação do cidadão nas esferas e hipóteses previstas. Serviços digitais devem considerar acessibilidade, interoperabilidade, simplificação, transparência e segurança, sem presumir que todos os dados do cidadão devem estar públicos. **Interoperabilidade** envolve troca e interpretação de dados entre sistemas, com padrões e governança, respeitando direitos e sigilos.

A LAI e a LGPD não se anulam: acesso público e privacidade devem ser conciliados. Uma planilha de gastos contratuais pode ser pública, mas dados de saúde de pacientes não devem ser divulgados indistintamente. **Anonimização** precisa avaliar possibilidade razoável de reidentificação, particularmente em pequenas populações e combinações de atributos. Nenhum “dashboard de transparência” dispensa análise de finalidade e requisitos normativos.

## Exemplo resolvido passo a passo
Um cidadão solicita informações sobre despesas de TI da prefeitura. A equipe identifica contratos, valores e critérios disponíveis para acesso, observando a LAI. Um documento também contém CPF e dados clínicos de um paciente anexados indevidamente. A solução não é publicar integralmente nem negar necessariamente todos os dados: avalie separar e proteger dados pessoais enquanto disponibiliza o que for acessível, segundo regras do órgão.

Para lançar serviço digital, equipe desenha formulário acessível, coleta mínimo necessário, valida identidade e autorização, registra auditoria e integra com cadastros permitidos. Teste o fluxo com usuários reais e assegure alternativa e suporte conforme legislação e desenho de serviço.

## Erros clássicos nas bancas
**Pegadinha:** “transparência = publicar qualquer dado pessoal” é falso. **Pegadinha:** LAI e LGPD podem ser aplicadas simultaneamente; não há revogação automática de uma pela outra. **Pegadinha:** acessibilidade não é apenas bom design visual; envolve acesso por pessoas com deficiências e tecnologias assistivas. **Pegadinha:** interoperabilidade não implica acesso irrestrito entre órgãos.

## Pratique sem consultar
Liste cinco informações de um contrato público de tecnologia que podem ser objeto de transparência, e duas informações pessoais sensíveis que exigem proteção. Explique a diferença de transparência ativa e passiva. Desenhe um serviço digital de solicitação de documento com autenticação, rastreabilidade e acessibilidade.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Portal oficial de Acesso à Informação: https://www.gov.br/acessoainformacao/pt-br
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** A divulgação proativa de informações de interesse coletivo em portal público é chamada:

A) Transparência ativa
B) Transparência passiva
C) Segredo industrial automático
D) Anonimização reversível

**Gabarito:** A — Transparência ativa consiste em publicar informações sem necessidade de pedido específico.

**Questão 2.** Como conciliar LAI e LGPD em documento público que contém dados pessoais desnecessários à finalidade de acesso?

A) Avaliar acesso à parte pública com proteção de dados pessoais conforme regras legais
B) Divulgar qualquer dado de saúde sem restrições
C) Negar automaticamente todos os documentos do órgão
D) Ignorar a LAI porque existe LGPD

**Gabarito:** A — A análise pode permitir acesso parcial, com proteção ou restrição dos dados pessoais conforme a lei.
