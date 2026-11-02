import type {LessonGuide} from './guidesTypes'
export const guidesLEG:LessonGuide[]=[
  {
    "id": 17,
    "code": "LEG",
    "title": "LGPD e administração pública",
    "objective": "Identificar conceito e princípios da LGPD.",
    "theory": "Na LGPD, dados pessoais são informações relacionadas a pessoa natural identificada ou identificável. Dados pessoais sensíveis incluem dados referentes à saúde. Tratamento pelo poder público requer base legal e respeito a finalidade, adequação e necessidade.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Dado de saúde pode ser dado pessoal sensível?",
        "back": "Sim, quando se refere a pessoa natural."
      },
      {
        "front": "Qual princípio exige limitar dados ao mínimo necessário?",
        "back": "Necessidade."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 18,
    "code": "LEG",
    "title": "Lei 14.133 e contratações de TI",
    "objective": "Diferenciar ETP e TR.",
    "theory": "A Lei 14.133/2021 trata de licitações e contratos administrativos. O Estudo Técnico Preliminar (ETP) caracteriza uma necessidade e avalia alternativas; o Termo de Referência especifica a contratação com requisitos e condições. No setor público, contratações exigem documentação e fiscalização.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual finalidade do ETP?",
        "back": "Identificar necessidade e avaliar solução/viabilidade da contratação."
      },
      {
        "front": "Qual finalidade do TR?",
        "back": "Descrever objeto, requisitos e condições para contratar."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 83,
    "code": "LEG",
    "title": "LGPD: conceitos e agentes",
    "objective": "Explicar e aplicar: LGPD: conceitos e agentes.",
    "theory": "Dado pessoal relaciona-se a pessoa natural identificada ou identificável; dado sensível inclui informações de saúde, entre outras hipóteses legais. Controlador toma decisões sobre tratamento; operador trata em nome do controlador. A classificação deve considerar contexto e possibilidade real de identificação.",
    "practical": "Uma clínica decide finalidade de agendamento e contrata plataforma que processa dados sob instrução: papéis podem ser controlador e operador, conforme funções efetivas.",
    "warning": "Pessoa jurídica não é titular de dados pessoais na definição da LGPD; uma pessoa por trás da empresa pode ser.",
    "recall": [
      {
        "front": "Quem, pela LGPD, toma decisões referentes ao tratamento de dados pessoais?",
        "back": "Controlador. Controlador define decisões sobre tratamento."
      },
      {
        "front": "Dados de saúde associados a pessoa identificável são:",
        "back": "Dados pessoais sensíveis. A LGPD inclui dados referentes à saúde entre sensíveis."
      },
      {
        "front": "Qual armadilha evitar em LGPD: conceitos e agentes?",
        "back": "Pessoa jurídica não é titular de dados pessoais na definição da LGPD; uma pessoa por trás da empresa pode ser."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 84,
    "code": "LEG",
    "title": "LGPD: bases legais e princípios",
    "objective": "Explicar e aplicar: LGPD: bases legais e princípios.",
    "theory": "Tratamento de dados pessoais deve ter base legal adequada à finalidade. Consentimento é uma das hipóteses e não é exigido para todo tratamento; princípios incluem finalidade, adequação, necessidade, segurança e transparência. Dados sensíveis possuem hipóteses específicas.",
    "practical": "Prestação de serviço essencial público pode utilizar base jurídica aplicável sem depender de consentimento em todos os casos; avalie contexto e norma.",
    "warning": "Consentimento genérico não torna qualquer tratamento lícito e não substitui minimização de dados.",
    "recall": [
      {
        "front": "Qual princípio LGPD limita dados ao mínimo necessário?",
        "back": "Necessidade. Necessidade exige tratamento pertinente, proporcional e não excessivo."
      },
      {
        "front": "Qual afirmação sobre consentimento na LGPD está correta?",
        "back": "É uma entre várias bases legais possíveis. A lei prevê diferentes hipóteses para tratamento."
      },
      {
        "front": "Qual armadilha evitar em LGPD: bases legais e princípios?",
        "back": "Consentimento genérico não torna qualquer tratamento lícito e não substitui minimização de dados."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 85,
    "code": "LEG",
    "title": "LGPD: direitos dos titulares",
    "objective": "Explicar e aplicar: LGPD: direitos dos titulares.",
    "theory": "A LGPD prevê direitos como confirmação da existência de tratamento, acesso, correção, eliminação nas hipóteses aplicáveis e informação sobre compartilhamento, com exceções e limites legais. É importante organizar canais e procedimentos de atendimento.",
    "practical": "Receber pedido de correção exige identificar titular, avaliar aplicabilidade e responder dentro do procedimento cabível.",
    "warning": "O direito de exclusão não significa apagar imediatamente qualquer dado cuja conservação seja legalmente obrigatória.",
    "recall": [
      {
        "front": "Qual é um direito previsto para titulares de dados pela LGPD?",
        "back": "Solicitar correção de dados incompletos ou desatualizados. Correção é direito previsto na LGPD."
      },
      {
        "front": "Uma solicitação de exclusão de dados:",
        "back": "Deve ser avaliada considerando obrigações legais de conservação. Existem hipóteses legais de retenção e exceções."
      },
      {
        "front": "Qual armadilha evitar em LGPD: direitos dos titulares?",
        "back": "O direito de exclusão não significa apagar imediatamente qualquer dado cuja conservação seja legalmente obrigatória."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 86,
    "code": "LEG",
    "title": "Lei 14.133: fases e planejamento",
    "objective": "Explicar e aplicar: Lei 14.133: fases e planejamento.",
    "theory": "A Lei 14.133/2021 dispõe sobre licitações e contratos administrativos. Planejamento pode incluir Estudo Técnico Preliminar, Termo de Referência, estimativa de valor e gestão de riscos conforme hipóteses aplicáveis. Regras variam por objeto e circunstância.",
    "practical": "Para aquisição de software, ETP examina necessidade e opções; TR detalha objeto, requisitos e critérios de aceitação.",
    "warning": "ETP e TR não são a mesma coisa; não use modelos genéricos sem avaliar a contratação.",
    "recall": [
      {
        "front": "Qual é a função central do Estudo Técnico Preliminar?",
        "back": "Caracterizar problema e avaliar solução/viabilidade. ETP fundamenta planejamento e escolha da solução."
      },
      {
        "front": "Qual documento detalha objeto e requisitos de contratação?",
        "back": "Termo de Referência. TR especifica objeto e condições da aquisição."
      },
      {
        "front": "Qual armadilha evitar em Lei 14.133: fases e planejamento?",
        "back": "ETP e TR não são a mesma coisa; não use modelos genéricos sem avaliar a contratação."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 87,
    "code": "LEG",
    "title": "Licitações: modalidades e julgamento",
    "objective": "Explicar e aplicar: Licitações: modalidades e julgamento.",
    "theory": "A Lei 14.133 prevê modalidades como pregão, concorrência, concurso, leilão e diálogo competitivo, aplicadas conforme objeto e requisitos. Critérios de julgamento incluem menor preço, maior desconto, técnica e preço, entre outros previstos.",
    "practical": "Uma compra de bem/serviço comum pode admitir pregão conforme condições legais; uma solução altamente complexa exige avaliar modalidade aplicável.",
    "warning": "Não confunda modalidade de licitação com critério de julgamento.",
    "recall": [
      {
        "front": "Qual alternativa é uma modalidade da Lei 14.133/2021?",
        "back": "Pregão. Pregão integra rol de modalidades da nova lei."
      },
      {
        "front": "Qual item corresponde a critério de julgamento e não modalidade?",
        "back": "Menor preço. Menor preço é critério de julgamento."
      },
      {
        "front": "Qual armadilha evitar em Licitações: modalidades e julgamento?",
        "back": "Não confunda modalidade de licitação com critério de julgamento."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 88,
    "code": "LEG",
    "title": "Lei de Acesso à Informação (LAI)",
    "objective": "Explicar e aplicar: Lei de Acesso à Informação (LAI).",
    "theory": "Lei 12.527/2011 disciplina acesso à informação pública e princípios de transparência ativa e passiva. Informações pessoais e sigilos legalmente protegidos exigem tratamento cuidadoso; acesso não equivale a divulgação irrestrita.",
    "practical": "Portal público divulga gastos e contratos conforme obrigações; dados sensíveis de usuários de serviços devem respeitar restrições legais.",
    "warning": "Publicidade e proteção de dados devem ser conciliadas conforme hipóteses legais.",
    "recall": [
      {
        "front": "Qual lei disciplina acesso à informação pública no Brasil?",
        "back": "Lei 12.527/2011. A LAI corresponde à Lei 12.527/2011."
      },
      {
        "front": "Qual prática é exemplo de transparência ativa?",
        "back": "Publicar informações exigidas independentemente de pedido. Transparência ativa publica proativamente informações legais."
      },
      {
        "front": "Qual armadilha evitar em Lei de Acesso à Informação (LAI)?",
        "back": "Publicidade e proteção de dados devem ser conciliadas conforme hipóteses legais."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 89,
    "code": "LEG",
    "title": "Lei 14.129 e governo digital",
    "objective": "Explicar e aplicar: Lei 14.129 e governo digital.",
    "theory": "A Lei 14.129/2021 dispõe sobre princípios, regras e instrumentos para Governo Digital e aumento da eficiência pública. Serviços digitais devem considerar interoperabilidade, simplificação, transparência e acessibilidade conforme aplicação da norma.",
    "practical": "Digitalização de requerimentos pode integrar dados e evitar solicitação repetida de documentos permitidos por normas aplicáveis.",
    "warning": "Digitalizar formulário antigo sem redesenhar fluxo não significa transformação digital plena.",
    "recall": [
      {
        "front": "Qual diploma trata de princípios e instrumentos de Governo Digital?",
        "back": "Lei 14.129/2021. A Lei 14.129/2021 trata de Governo Digital."
      },
      {
        "front": "Qual objetivo é coerente com transformação digital no setor público?",
        "back": "Simplificar serviços com interoperabilidade e acessibilidade. Governo digital busca maior eficiência e melhor acesso."
      },
      {
        "front": "Qual armadilha evitar em Lei 14.129 e governo digital?",
        "back": "Digitalizar formulário antigo sem redesenhar fluxo não significa transformação digital plena."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 90,
    "code": "LEG",
    "title": "Ética, impessoalidade e princípios administrativos",
    "objective": "Explicar e aplicar: Ética, impessoalidade e princípios administrativos.",
    "theory": "O art. 37 da Constituição estabelece legalidade, impessoalidade, moralidade, publicidade e eficiência como princípios explícitos da administração pública. A aplicação prática considera interesse público, controle e fundamentação de decisões.",
    "practical": "Contratação não deve favorecer pessoa por vínculo pessoal; critérios e justificativas devem observar interesse público.",
    "warning": "Publicidade administrativa não autoriza expor indiscriminadamente dados pessoais protegidos.",
    "recall": [
      {
        "front": "Qual princípio expressamente previsto no art. 37 exige atuação sem favorecimento pessoal?",
        "back": "Impessoalidade. Impessoalidade veda preferências pessoais indevidas."
      },
      {
        "front": "Qual é o conjunto de princípios explícitos do caput do art. 37?",
        "back": "Legalidade, impessoalidade, moralidade, publicidade e eficiência. O caput lista os cinco princípios conhecidos pela sigla LIMPE."
      },
      {
        "front": "Qual armadilha evitar em Ética, impessoalidade e princípios administrativos?",
        "back": "Publicidade administrativa não autoriza expor indiscriminadamente dados pessoais protegidos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 115,
    "code": "LEG",
    "title": "LGPD: princípios, bases legais e agentes",
    "objective": "Distinguir tratamento, papéis e hipóteses legais sem simplificar consentimento.",
    "theory": "## Aula detalhada — entenda o mecanismo\nA **LGPD (Lei 13.709/2018)** disciplina tratamento de dados pessoais inclusive digitais por agentes públicos e privados, com exceções e regras próprias. **Dado pessoal** identifica ou torna identificável pessoa natural; **dado sensível** inclui dados sobre saúde, entre outras categorias legais; **tratamento** inclui coleta, acesso, armazenamento, compartilhamento e exclusão. Informação anonimizada, se realmente não identificável com meios razoáveis, segue enquadramento próprio; pseudonimização não é sinônimo de anonimização irreversível.\n\nPrincípios do art. 6º incluem finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização/prestação de contas. **Controlador** toma decisões sobre tratamento; **operador** realiza em nome do controlador; **encarregado** atua como canal de comunicação nos termos legais e regulamentares. A classificação depende das decisões e relações reais, não apenas do nome no contrato.\n\n**Consentimento** é uma entre várias bases legais, e dados sensíveis possuem hipóteses do art. 11. Não suponha que toda operação em clínica depende de consentimento: proteção da vida, tutela da saúde nas condições legais e obrigações legais podem ser relevantes, devendo avaliar cenário concreto. Direitos dos titulares e deveres de segurança precisam ser interpretados junto de limitações e regras para o poder público.\n\n## Exemplo resolvido passo a passo\nUma clínica registra identificação e imagens para realizar exame. Identifique quais dados são pessoais e quais são sensíveis; mapeie finalidade, necessidade, prazos legais, acessos e compartilhamentos. Determine papel de clínica e fornecedor PACS conforme quem decide finalidades/meios essenciais e quem processa por instruções, em vez de usar rótulos genéricos.\n\nUm funcionário envia laudo para destinatário errado: pode ocorrer incidente de segurança com dados pessoais; contenha exposição, avalie risco, registre fatos, preserve evidências e siga regras de comunicação à ANPD e titulares aplicáveis ao caso. Não informe automaticamente que “qualquer erro deve ser comunicado em 24 horas”: procedimentos e prazos dependem de normas vigentes e enquadramento.\n\n## Erros clássicos nas bancas\n**Pegadinha:** GDPR e LGPD não são leis idênticas. **Pegadinha:** consentimento não é a única base. **Pegadinha:** dado de saúde é categoria sensível. **Pegadinha:** operador não é necessariamente empresa de TI; papel é funcional no tratamento. **Pegadinha:** “ter firewall” não prova cumprimento de todos os princípios da LGPD.\n\n## Pratique sem consultar\nFaça um inventário hipotético de dados do agendamento, separando dados comuns e sensíveis. Para cada tratamento, defina propósito, base legal a estudar, minimização, quem acessa, prazo e risco. Liste dois direitos dos titulares e confira redação vigente na fonte oficial.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nPlanalto — texto atualizado da LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Controlador e operador: como diferenciar?",
        "back": "Controlador decide sobre tratamento; operador trata dados em nome do controlador, conforme a relação concreta."
      },
      {
        "front": "Por que dados de saúde exigem atenção especial na LGPD?",
        "back": "São dados pessoais sensíveis, sujeitos a hipóteses e salvaguardas próprias."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 116,
    "code": "LEG",
    "title": "Lei 14.133/2021: ETP, TR e contratos de TI",
    "objective": "Compreender sequência de planejamento e fiscalização em contratações públicas.",
    "theory": "## Aula detalhada — entenda o mecanismo\nA **Lei 14.133/2021** estabelece normas gerais de licitações e contratos administrativos; regras locais e regulamentares complementam procedimentos. O **Estudo Técnico Preliminar (ETP)** investiga necessidade e solução mais adequada, avaliando viabilidade técnica/econômica; o **Termo de Referência (TR)** especifica objeto e condições de contratação de bens/serviços, conforme aplicação. O art. 18 trata da fase preparatória; a definição de TR no art. 6º, XXIII, inclui objeto, fundamentação, requisitos, execução, gestão, critérios de medição/pagamento e outros parâmetros.\n\nPlanejamento de compra de TI começa **pelo problema público**, não pela marca desejada. Descreva necessidades, alternativas tecnológicas, quantidades, custos de ciclo de vida, requisitos de segurança e interoperabilidade, critérios de aceite e riscos. A contratação deve observar impessoalidade, isonomia, planejamento e legislação. Gestão e fiscalização de contratos são atividades distintas de elaboração do edital, embora interfaces existam.\n\nEm questões, não trate ETP e TR como sinônimos: ETP ajuda a justificar solução; TR detalha objeto e como contratar/medir. Há hipóteses e regulamentações específicas quanto à obrigatoriedade e conteúdo, portanto sempre consulte texto vigente, órgão e edital. Um profissional de TI pode contribuir tecnicamente, sem substituir atribuições jurídicas e administrativas das unidades competentes.\n\n## Exemplo resolvido passo a passo\nPrefeitura precisa contratar backup externo. ETP: qual problema? Risco de perda de dados e tempo de recuperação inadequado. Quais alternativas? Serviço gerenciado, solução própria, híbrida; compare custo total, localização e proteção de dados, retenção, recuperação, rede, dependência de fornecedor e requisitos.\n\nTR: descreva volume de dados, criptografia, retenção, controle de acesso, localização, testes de recuperação, métricas, critérios de aceite, suporte, penalidades conforme jurídico e pagamentos. A fiscalização acompanha SLA, evidências de backup e restaurações aprovadas.\n\nSe proposta de fornecedor promete “backup ilimitado”, sem delimitar volume, tráfego e recuperação, o objeto e os critérios de recebimento estão pouco claros. A prova pode perguntar em qual fase se estuda alternativas de solução: ETP.\n\n## Erros clássicos nas bancas\n**Pegadinha:** licitação não começa pela escolha da marca sem justificativa. **Pegadinha:** TR não é documento meramente publicitário; precisa critérios verificáveis. **Pegadinha:** ETP não “substitui automaticamente” o termo de referência. **Pegadinha:** fiscalização de contrato de TI não dispensa indicadores, aceite e documentação de execução.\n\n## Pratique sem consultar\nEscreva um mini-ETP de 12 linhas para contratar links redundantes para unidades de saúde e um mini-TR com objeto, requisito, testes de aceite, prazo, acompanhamento e critérios de medição. Identifique onde entram requisitos LGPD e segurança.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nPlanalto — Lei 14.133/2021: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "ETP e TR: qual diferença resumida?",
        "back": "ETP examina problema e solução viável; TR define detalhadamente objeto e condições da contratação."
      },
      {
        "front": "Por que métricas de aceite são importantes em contratos de TI?",
        "back": "Permitem verificar entrega e desempenho antes de aceitar e pagar por serviços/bens."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 117,
    "code": "LEG",
    "title": "LAI, Governo Digital e transparência com privacidade",
    "objective": "Conciliar acesso à informação, proteção de dados e transformação digital.",
    "theory": "## Aula detalhada — entenda o mecanismo\nA **Lei 12.527/2011 (LAI)** regula acesso a informações públicas e obriga transparência ativa e passiva conforme regras, competências e exceções legais. Transparência ativa publica dados de interesse geral; passiva responde a solicitações. Informações pessoais podem ter restrições e tratamento próprios. Sigilo legal é exceção delimitada, não justificativa automática para negar todo documento.\n\nA **Lei 14.129/2021 (Governo Digital)** busca eficiência, desburocratização, transformação digital e participação do cidadão nas esferas e hipóteses previstas. Serviços digitais devem considerar acessibilidade, interoperabilidade, simplificação, transparência e segurança, sem presumir que todos os dados do cidadão devem estar públicos. **Interoperabilidade** envolve troca e interpretação de dados entre sistemas, com padrões e governança, respeitando direitos e sigilos.\n\nA LAI e a LGPD não se anulam: acesso público e privacidade devem ser conciliados. Uma planilha de gastos contratuais pode ser pública, mas dados de saúde de pacientes não devem ser divulgados indistintamente. **Anonimização** precisa avaliar possibilidade razoável de reidentificação, particularmente em pequenas populações e combinações de atributos. Nenhum “dashboard de transparência” dispensa análise de finalidade e requisitos normativos.\n\n## Exemplo resolvido passo a passo\nUm cidadão solicita informações sobre despesas de TI da prefeitura. A equipe identifica contratos, valores e critérios disponíveis para acesso, observando a LAI. Um documento também contém CPF e dados clínicos de um paciente anexados indevidamente. A solução não é publicar integralmente nem negar necessariamente todos os dados: avalie separar e proteger dados pessoais enquanto disponibiliza o que for acessível, segundo regras do órgão.\n\nPara lançar serviço digital, equipe desenha formulário acessível, coleta mínimo necessário, valida identidade e autorização, registra auditoria e integra com cadastros permitidos. Teste o fluxo com usuários reais e assegure alternativa e suporte conforme legislação e desenho de serviço.\n\n## Erros clássicos nas bancas\n**Pegadinha:** “transparência = publicar qualquer dado pessoal” é falso. **Pegadinha:** LAI e LGPD podem ser aplicadas simultaneamente; não há revogação automática de uma pela outra. **Pegadinha:** acessibilidade não é apenas bom design visual; envolve acesso por pessoas com deficiências e tecnologias assistivas. **Pegadinha:** interoperabilidade não implica acesso irrestrito entre órgãos.\n\n## Pratique sem consultar\nListe cinco informações de um contrato público de tecnologia que podem ser objeto de transparência, e duas informações pessoais sensíveis que exigem proteção. Explique a diferença de transparência ativa e passiva. Desenhe um serviço digital de solicitação de documento com autenticação, rastreabilidade e acessibilidade.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nPortal oficial de Acesso à Informação: https://www.gov.br/acessoainformacao/pt-br\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Diferença entre transparência ativa e passiva?",
        "back": "Ativa: publicação espontânea; passiva: atendimento a pedido de acesso."
      },
      {
        "front": "Interoperabilidade de sistemas autoriza compartilhamento irrestrito?",
        "back": "Não; troca de dados exige finalidade, segurança, bases legais e governança."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 148,
    "code": "LEG",
    "title": "LGPD: bases legais e setor público",
    "objective": "Compreender e aplicar lgpd: bases legais e setor público em provas.",
    "theory": "Tratamento de dados pessoais requer hipótese legal aplicável e observância dos princípios da LGPD, como finalidade, adequação e necessidade.\n\nConsentimento não é a única base legal; obrigações legais, execução de políticas públicas e outras hipóteses podem ser relevantes conforme natureza do dado e agente. Dados sensíveis possuem hipóteses próprias. A administração pública deve conciliar transparência e proteção, evitando exposição excessiva de dados pessoais.",
    "practical": "Uma clínica precisa de fundamento legal para processar dados de saúde e controles de acesso proporcionais ao risco.",
    "warning": "Não confunda “dado público” com autorização irrestrita para qualquer tratamento.",
    "recall": [
      {
        "front": "Qual é o conceito central de LGPD: bases legais e setor público?",
        "back": "Tratamento de dados pessoais requer hipótese legal aplicável e observância dos princípios da LGPD, como finalidade, adequação e necessidade."
      },
      {
        "front": "Qual erro de prova evitar em LGPD: bases legais e setor público?",
        "back": "Não confunda “dado público” com autorização irrestrita para qualquer tratamento."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 149,
    "code": "LEG",
    "title": "LGPD: controlador, operador e encarregado",
    "objective": "Compreender e aplicar lgpd: controlador, operador e encarregado em provas.",
    "theory": "Controlador toma decisões referentes ao tratamento; operador realiza o tratamento em nome do controlador; encarregado atua como canal de comunicação em hipóteses legais.\n\nA classificação depende do papel efetivamente desempenhado nas operações, não apenas do nome em contrato. Contratos e registros podem definir obrigações entre controlador e operador; incidentes exigem comunicação e medidas conforme regras vigentes. Responsável técnico de TI não é automaticamente encarregado pela LGPD.",
    "practical": "Uma empresa terceirizada que hospeda o RIS sob instruções da clínica pode atuar como operadora no contexto, enquanto a clínica decide finalidade e meios essenciais.",
    "warning": "Uma mesma organização pode ter papéis diferentes em tratamentos diferentes.",
    "recall": [
      {
        "front": "Qual é o conceito central de LGPD: controlador, operador e encarregado?",
        "back": "Controlador toma decisões referentes ao tratamento; operador realiza o tratamento em nome do controlador; encarregado atua como canal de comunicação em hipóteses legais."
      },
      {
        "front": "Qual erro de prova evitar em LGPD: controlador, operador e encarregado?",
        "back": "Uma mesma organização pode ter papéis diferentes em tratamentos diferentes."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 150,
    "code": "LEG",
    "title": "Lei 14.133: ETP, TR e fiscalização",
    "objective": "Compreender e aplicar lei 14.133: etp, tr e fiscalização em provas.",
    "theory": "A Lei 14.133/2021 estrutura planejamento de contratações, seleção do fornecedor e execução contratual com documentação adequada.\n\nETP caracteriza necessidade e avalia soluções; TR traduz objeto, condições e requisitos para aquisição conforme aplicável. Gestor e fiscal acompanham execução do contrato com competências definidas. Uma contratação de TI precisa descrever níveis de serviço, segurança e critérios de aceite quando pertinentes.",
    "practical": "Para adquirir uma solução de backup, inclua requisitos de restauração testável, retenção, RPO/RTO e critérios de validação técnica.",
    "warning": "Elaborar TR não autoriza direcionamento indevido a marca sem justificativa legal adequada.",
    "recall": [
      {
        "front": "Qual é o conceito central de Lei 14.133: ETP, TR e fiscalização?",
        "back": "A Lei 14.133/2021 estrutura planejamento de contratações, seleção do fornecedor e execução contratual com documentação adequada."
      },
      {
        "front": "Qual erro de prova evitar em Lei 14.133: ETP, TR e fiscalização?",
        "back": "Elaborar TR não autoriza direcionamento indevido a marca sem justificativa legal adequada."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 151,
    "code": "LEG",
    "title": "Transparência, LAI e proteção de dados",
    "objective": "Compreender e aplicar transparência, lai e proteção de dados em provas.",
    "theory": "Lei de Acesso à Informação estabelece publicidade como regra com hipóteses legais de sigilo e restrições de acesso a dados pessoais.\n\nTransparência ativa disponibiliza informações independentemente de requerimento; passiva responde pedidos. Resposta precisa observar prazos, justificativas e exceções legais. LGPD e LAI devem ser aplicadas conjuntamente, sem presumir que todo documento com dado pessoal é sigiloso ou integralmente público.",
    "practical": "Portal de Transparência pode divulgar valores de contratos e remunerações em condições legais; prontuários médicos permanecem sujeitos à proteção especial.",
    "warning": "Sigilo, classificação e dado pessoal são categorias relacionadas, mas distintas.",
    "recall": [
      {
        "front": "Qual é o conceito central de Transparência, LAI e proteção de dados?",
        "back": "Lei de Acesso à Informação estabelece publicidade como regra com hipóteses legais de sigilo e restrições de acesso a dados pessoais."
      },
      {
        "front": "Qual erro de prova evitar em Transparência, LAI e proteção de dados?",
        "back": "Sigilo, classificação e dado pessoal são categorias relacionadas, mas distintas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 168,
    "code": "LEG",
    "title": "LGPD no atendimento público: base, finalidade e transparência",
    "objective": "Analisar tratamento de dados por órgão público sem presumir consentimento como base universal.",
    "theory": "# Caso de prova — órgão público integra registros de atendimento\nUma prefeitura pretende integrar informações pessoais de sistemas de atendimento para facilitar execução de política pública. Uma afirmação comum é “pode usar qualquer dado porque é órgão público”; outra é “precisa pedir consentimento para todo tratamento”. As duas são simplificações incorretas. A **LGPD** exige finalidade, adequação, necessidade, transparência e base legal pertinente, considerando regras de tratamento pelo poder público e hipóteses específicas.\n\n## Método de análise da situação\nPrimeiro, defina a finalidade pública concreta e a competência do órgão. Segundo, identifique quais dados são necessários para essa finalidade; dados de saúde podem ser dados pessoais sensíveis, com regras reforçadas. Terceiro, avalie qual base legal e quais dispositivos aplicáveis sustentam o tratamento; não escolha consentimento automaticamente. Quarto, estabeleça controles de segurança, registros de operações, retenção e acesso por papéis. Quinto, verifique transparência e informação aos titulares, respeitando hipóteses legais de sigilo.\n\n## Exemplo resolvido\nUm gestor solicita acesso irrestrito a todo o histórico de saúde para acompanhar estatísticas agregadas. A finalidade informada pode ser atendida por dados agregados ou efetivamente anonimizados em alguns cenários, reduzindo exposição. Se dados identificáveis forem indispensáveis, o órgão deve documentar justificativa, minimização, acesso e base jurídica específica. **Anonimização efetiva** não deve ser confundida com simples remoção de nome: combinações de atributos podem permitir reidentificação e devem ser avaliadas conforme meios razoáveis disponíveis.\n\n## Como escrever uma resposta técnica\nEvite “todos os dados da prefeitura são públicos”. Prefira: “O tratamento de dados pelo poder público depende da finalidade legalmente legitimada e da observância dos princípios da LGPD. O acesso deve ser limitado à necessidade demonstrada, com medidas de segurança e transparência adequadas.” Essa redação vincula conceito, condição e consequência, sem fazer afirmação absoluta.\n\n## Armadilhas de banca\n- Consentimento não é a única base legal, e em relações assimétricas pode não ser a mais adequada.\n- Dados disponíveis internamente não se tornam automaticamente de livre divulgação.\n- Pseudonimização não equivale necessariamente a anonimização irreversível.\n- Lei de Acesso à Informação e LGPD precisam ser interpretadas de forma compatível com publicidade e proteção de dados, não como princípios automaticamente excludentes.\n\n## Verificação normativa\nAntes de usar esta aula para responder sobre artigos específicos, confira a redação atual da lei no Planalto. Este material é didático e não reproduz o texto integral nem substitui interpretação jurídica aplicável ao caso.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Órgão público sempre depende de consentimento para tratar dados?",
        "back": "Não. Deve identificar base legal adequada e observar os requisitos da LGPD."
      },
      {
        "front": "Remover nome torna dados automaticamente anônimos?",
        "back": "Não. Pode haver reidentificação por outros atributos e contexto."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 169,
    "code": "LEG",
    "title": "ETP, termo de referência e fiscalização de contratação de TI",
    "objective": "Distinguir planejamento da necessidade, especificação de objeto e fiscalização de execução contratual.",
    "theory": "# Caso de prova — substituição de solução de backup\nUma prefeitura pretende contratar uma solução de backup. Um solicitante já aponta fornecedor específico e pede “compre este software porque todos usam”. O planejamento adequado começa com a **necessidade pública**: quais sistemas precisam ser recuperados, que RPO/RTO foram definidos, quais dados são sensíveis, onde a solução operará e quais restrições de integração, suporte, segurança e disponibilidade existem.\n\n## Estudo Técnico Preliminar — raciocínio de alternativas\nO ETP caracteriza o problema e analisa viabilidade e alternativas, conforme regime jurídico e regras aplicáveis. Soluções possíveis podem incluir ajuste de infraestrutura existente, serviços gerenciados, contratação de licenças e combinação de métodos. A análise considera custo de ciclo de vida, continuidade, compatibilidade, riscos de fornecedor e segurança. O objetivo é justificar **por que** uma solução atende à necessidade antes de apenas transcrever uma marca comercial.\n\n## Termo de Referência — condições verificáveis\nO TR descreve objeto e requisitos de contratação, condições de execução, medição, recebimento e outros elementos cabíveis. Um requisito como “software confiável” é vago; “restaurar amostra definida de bases dentro do prazo especificado em teste de aceite documentado” é verificável. Critérios inadequados ou excessivamente direcionados podem restringir competitividade; requisitos devem ser justificados.\n\n## Fiscalização — não basta assinar contrato\nNa execução, monitore entregas, SLA, incidentes, evidências de backup e testes de restauração. Atestar recebimento sem comprovar execução pode gerar problema de controle. Fiscalização técnica não significa que todo analista possui competência formal para aplicar penalidade ou autorizar pagamento; a distribuição de funções depende dos atos e regras institucionais.\n\n## Exemplo de sequência correta\n1. Documentar indisponibilidades e impacto da ausência de recuperação.\n2. Definir RTO/RPO e dados abrangidos com as áreas responsáveis.\n3. Avaliar soluções e custos no planejamento aplicável.\n4. Especificar objeto, teste de aceite, evidências e níveis de serviço.\n5. Receber, testar e acompanhar execução com responsabilidades definidas.\n\n## Armadilhas de banca\n- ETP e TR **não são o mesmo documento** nem possuem exatamente a mesma finalidade.\n- Licitação não dispensa fiscalização de execução.\n- Menor preço nominal não é sinônimo automático de menor custo total ou de solução adequada.\n- O artigo 18 da Lei 14.133/2021 contém elementos da fase preparatória; regras locais, federais e regulamentação aplicáveis devem ser verificadas.\n\n## Prática\nEscreva cinco requisitos mensuráveis de uma contratação de backup: periodicidade, prazo de restauração, integridade, segurança e relatórios. Para cada requisito, inclua método de aceitação. Em outra coluna, explique qual problema operacional o requisito busca prevenir.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual diferença entre ETP e TR em contratação de TI?",
        "back": "ETP caracteriza necessidade e analisa alternativas; TR especifica objeto, requisitos e execução."
      },
      {
        "front": "Por que uma contratação de backup requer teste de restauração?",
        "back": "Para comprovar recuperabilidade e cumprimento de objetivos, não apenas existência de arquivos copiados."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
