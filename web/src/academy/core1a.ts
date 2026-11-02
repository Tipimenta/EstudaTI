import type {PedagogicalLesson} from './intro1';
export const core1a:PedagogicalLesson[]=[
  {
    "id": 19,
    "title": "Subnetting e CIDR: resolver qualquer bloco IPv4",
    "goal": "Calcular rede, broadcast, intervalo de hosts e explicar a lógica de um prefixo CIDR.",
    "steps": [
      {
        "title": "O prefixo determina a divisão da rede",
        "body": "IPv4 tem 32 bits. O prefixo **/n** indica quantos pertencem à rede; restam **32−n** para os endereços do bloco. O tamanho total do bloco é **2^(32−n)**. Um /26 deixa 6 bits: 64 endereços. Um /27 deixa 5: 32. Em redes convencionais /30 ou maiores, reserve rede e broadcast; /31 e /32 têm usos especiais e precisam ser analisados separadamente."
      },
      {
        "title": "Ache o incremento sem transformar tudo em binário",
        "body": "A máscara de **/27** é 255.255.255.224. No octeto de corte, o incremento é **256−224=32**, formando 0, 32, 64, 96, 128, 160, 192, 224. Descubra qual intervalo contém o octeto do IP. A primeira posição do intervalo identifica a rede; a última, broadcast. Não tente adivinhar o bloco só olhando o último número."
      },
      {
        "title": "CIDR, VLSM e rotas: conceitos próximos, funções diferentes",
        "body": "**CIDR** representa prefixos de maneira flexível. **VLSM** permite dividir um espaço maior em sub-redes de tamanhos diferentes segundo necessidade. **Roteamento por maior prefixo** prefere a rota mais específica que corresponde ao destino, antes de outros critérios do processo de seleção. Ao planejar VLSM, reserve os maiores blocos antes e respeite alinhamento para não sobrepor sub-redes."
      }
    ],
    "worked": {
      "title": "Exemplo completo: 172.16.8.173/28",
      "body": "**1.** /28 deixa 4 bits: 2^4=16 endereços, máscara 255.255.255.240.\n\n**2.** Incrementos de 16 no último octeto: 0,16,32,...,160,176,...\n\n**3.** O valor 173 está entre 160 e 175.\n\n**4.** Rede **172.16.8.160**, broadcast **172.16.8.175**.\n\n**5.** Hosts convencionais **.161 a .174**, total de **14**.\n\n**6.** Verificação: 173 AND máscara /28 resulta 160 no último octeto. O número total do bloco não é número de hosts utilizáveis."
    },
    "pitfalls": [
      "/26 tem 64 endereços totais, tipicamente 62 hosts; /27 tem 32, tipicamente 30.",
      "Endereço de rede deve respeitar a fronteira do tamanho de bloco.",
      "Prefixos /31 e /32 não se enquadram indiscriminadamente em total−2.",
      "Sub-redes VLSM não devem se sobrepor."
    ],
    "review": [
      {
        "ask": "Qual rede contém 192.168.4.77/26?",
        "answer": "Com blocos de 64, 77 pertence a 64–127; rede 192.168.4.64, broadcast .127."
      },
      {
        "ask": "Quantos endereços cabem em /29 e quantos hosts convencionais?",
        "answer": "8 endereços no bloco; 6 hosts convencionais."
      }
    ],
    "extra": "**Avançado:** sumarização exige blocos contíguos e alinhados. Dois /24 com terceiro octeto par e o seguinte ímpar podem ser resumidos em /23 se forem adjacentes e sem lacunas."
  },
  {
    "id": 27,
    "title": "Risco cibernético: avaliar antes de escolher controles",
    "goal": "Formular um risco com ativo, ameaça, vulnerabilidade, probabilidade e impacto, e comparar opções de tratamento.",
    "steps": [
      {
        "title": "Risco não é sinônimo de vulnerabilidade",
        "body": "**Ativo** é o que a organização valoriza: dados, serviço, infraestrutura. **Ameaça** é a fonte de dano. **Vulnerabilidade** é fragilidade que pode ser explorada. **Evento** é ocorrência incerta. **Risco** relaciona possível efeito nos objetivos, com probabilidade/impacto conforme método. Falta de MFA é vulnerabilidade/deficiência de controle; 'acesso indevido a dados críticos com impacto regulatório e assistencial' é uma descrição de risco mais completa."
      },
      {
        "title": "A avaliação precisa de critérios",
        "body": "Não basta escrever 'alto risco'. Defina escala de probabilidade e consequência, contexto e responsáveis. Uma clínica pode considerar impacto de indisponibilidade em horas de atendimento, atrasos e risco assistencial, enquanto vazamento atinge confidencialidade, direitos dos titulares e obrigações legais. A priorização depende também de controles já implantados e eficácia observada."
      },
      {
        "title": "Quatro respostas clássicas e risco residual",
        "body": "**Reduzir/mitigar:** MFA, segmentação, testes de recuperação. **Evitar:** encerrar atividade que gera risco, quando viável. **Compartilhar/transferir consequências:** seguros, contratos e fornecedores, sem transferir toda responsabilidade. **Aceitar:** decisão fundamentada dentro do apetite de risco. Após aplicar controles, continua o **risco residual**, que deve ser avaliado e acompanhado. A execução não se encerra com compra de software."
      }
    ],
    "worked": {
      "title": "Exemplo: backup da clínica na mesma sala do servidor",
      "body": "**Ativo:** imagens médicas e disponibilidade de diagnóstico.\n\n**Ameaça:** incêndio ou ransomware com propagação.\n\n**Vulnerabilidade:** cópias somente no mesmo ambiente e sem testes de restauração.\n\n**Risco:** interrupção prolongada com possível perda de dados.\n\n**Tratamento:** backup isolado, verificação de integridade, restauração ensaiada e acesso restrito.\n\n**Evidência:** relatório do teste de restauração e comparação com RTO/RPO.\n\n**Residual:** ainda existe risco de falhas simultâneas ou ameaças não cobertas; a decisão deve ser registrada."
    },
    "pitfalls": [
      "Probabilidade e impacto não são a mesma medida.",
      "A existência de controle não comprova sua eficácia sem evidência.",
      "Seguros podem compartilhar consequência financeira; não eliminam responsabilidade legal.",
      "Risco residual não precisa ser zero, mas requer decisão informada."
    ],
    "review": [
      {
        "ask": "'Servidor sem atualização' é risco ou vulnerabilidade?",
        "answer": "É principalmente vulnerabilidade/fragilidade; a descrição de risco inclui evento e impactos possíveis sobre objetivos."
      },
      {
        "ask": "Uma organização comprou backup e nunca restaurou. O risco já foi reduzido com comprovação?",
        "answer": "Não há evidência suficiente de recuperabilidade; o teste de restauração deve ser realizado."
      }
    ],
    "extra": "**Avançado:** NIST CSF 2.0 adicionou Governar como função explícita. Diferencie políticas e gestão de terceiros (governança) de medidas técnicas (proteger, detectar, responder, recuperar)."
  },
  {
    "id": 35,
    "title": "Processos, threads e escalonamento de CPU",
    "goal": "Reconhecer processo, thread, contexto de execução, concorrência e políticas de escalonamento.",
    "steps": [
      {
        "title": "O que é processo e o que é thread",
        "body": "Um **processo** é uma instância de programa em execução, com recursos e espaço de endereçamento gerenciados pelo sistema operacional. Uma **thread** é uma linha de execução dentro de um processo e normalmente compartilha o espaço de memória do processo com outras threads. Threads do mesmo processo facilitam comunicação e paralelismo, mas exigem cuidado com dados compartilhados."
      },
      {
        "title": "Concorrência e paralelismo",
        "body": "**Concorrência** significa administrar tarefas cujos períodos de execução se sobrepõem; um único núcleo pode alternar tarefas por fatias de tempo. **Paralelismo** envolve execução efetivamente simultânea em recursos de processamento distintos, quando disponíveis. Um **context switch** troca o contexto de execução (registradores e estado relevante) e tem custo; trocar constantemente pode prejudicar rendimento."
      },
      {
        "title": "Escalonamento e sincronização",
        "body": "Algoritmos de escalonamento decidem quem executa: **FCFS** atende em ordem de chegada; **Round Robin** oferece fatias de tempo; prioridades podem influenciar seleção. Um acesso concorrente não coordenado a contador compartilhado pode produzir **condição de corrida**. Mutex, semáforos e outras estratégias controlam interleavings segundo o problema; também podem causar deadlocks se mal usados."
      }
    ],
    "worked": {
      "title": "Exemplo: contador compartilhado por duas threads",
      "body": "**Estado inicial:** contador=10.\n\n**Thread A** lê 10 para incrementar.\n\n**Thread B** lê 10 para incrementar antes que A grave.\n\n**A** grava 11.\n\n**B** grava 11.\n\n**Resultado:** o esperado após dois incrementos era 12, mas temos **11**. Trata-se de atualização perdida por corrida. Uma seção crítica protegida por mutex ou operação atômica apropriada pode prevenir o erro. Ter duas CPUs não resolve automaticamente a sincronização."
    },
    "pitfalls": [
      "Thread não é sempre processo separado com memória completamente independente.",
      "Concorrência não exige paralelismo físico.",
      "Um lock mal planejado pode introduzir espera e deadlock.",
      "Mais threads não garantem aceleração infinita; há custo e contenção."
    ],
    "review": [
      {
        "ask": "Duas threads do mesmo processo geralmente compartilham que recurso?",
        "answer": "O espaço de endereçamento e recursos do processo, embora tenham pilhas/contexto de execução próprios."
      },
      {
        "ask": "Dois incrementos concorrentes geram somente um aumento. Qual fenômeno?",
        "answer": "Condição de corrida/atualização perdida por operação não sincronizada."
      }
    ],
    "extra": "**Avançado:** compare escalonamento preemptivo e não preemptivo, starvation, deadlock e justiça do Round Robin sob diferentes quanta."
  },
  {
    "id": 43,
    "title": "Inferências e pressupostos: onde a banca induz erro",
    "goal": "Concluir apenas o que o texto autoriza e identificar pressuposições de verbos e conectivos.",
    "steps": [
      {
        "title": "Distinguir afirmação, inferência e conjectura",
        "body": "Um texto pode afirmar algo literalmente e permitir outras conclusões. **Inferência válida** é resultado apoiado nas premissas do texto. **Conjectura** é hipótese possível, mas não sustentada de modo suficiente. Quando a banca troca 'alguns' por 'todos', 'pode' por 'certamente' ou 'ocorreu depois' por 'foi causado por', geralmente cria extrapolação."
      },
      {
        "title": "Pressuposições são pistas linguísticas",
        "body": "Expressões como '**voltou a estudar**' pressupõem estudo anterior; '**parou de atrasar**' pressupõe atraso anterior; '**também participou**' sugere participação adicional a alguém já considerado. A pressuposição costuma continuar inferível quando a proposição central é negada: 'Maria não voltou a estudar' ainda convoca a ideia de estudo anterior no uso comum. Mas contexto e uso irônico podem afetar leitura."
      },
      {
        "title": "Método de eliminação de alternativas",
        "body": "1. Sublinhe quantificadores, negações e conectivos. 2. Para cada alternativa, procure frase que a justifique. 3. Diferencie o que é consequência necessária e o que é apenas plausível. 4. Desconfie de interpretações que acrescentem personagens, causas exclusivas ou julgamentos de valor não presentes. 5. Escolha a inferência mais bem fundamentada, não a mais convincente fora do texto."
      }
    ],
    "worked": {
      "title": "Exemplo: resultados de um treinamento",
      "body": "**Texto:** 'Parte dos colaboradores concluiu a formação. Entre os que participaram do teste, alguns melhoraram o desempenho, embora ainda ocorram erros.'\n\n**Afirmação A:** 'Todos os colaboradores concluíram a formação'. **Falsa extrapolação**: o texto fala em parte.\n\n**B:** 'Houve melhora no desempenho de alguns avaliados'. **Sustentada** pelo texto.\n\n**C:** 'A formação eliminou todos os erros'. **Contradita** pelo trecho 'ainda ocorram erros'.\n\n**D:** 'O curso foi a única causa da melhora'. **Não demonstrada**; observar melhora não isola causalidade."
    },
    "pitfalls": [
      "Uma afirmação possível não é necessariamente uma inferência autorizada.",
      "Alguns e todos têm alcances diferentes.",
      "Relação temporal não é prova de causalidade exclusiva.",
      "Pressuposição costuma ser ativada por expressão lexical ou construção específica."
    ],
    "review": [
      {
        "ask": "'Carla voltou a estudar' sugere o quê?",
        "answer": "Que Carla já estudava anteriormente; a ideia decorre de 'voltou a'."
      },
      {
        "ask": "Texto: 'Algumas unidades melhoraram'. Pode-se dizer que todas melhoraram?",
        "answer": "Não; 'algumas' não permite a generalização para todas."
      }
    ],
    "extra": "**Avançado:** diferencie pressuposição, implícito, subentendido, inferência pragmática e ironia. Em interpretação, a resposta depende do texto e do enunciado, não de leitura universal."
  },
  {
    "id": 51,
    "title": "ITIL: incidente, requisição e prioridade de atendimento",
    "goal": "Reconhecer interrupções, solicitações normais e como classificar o atendimento por impacto e urgência.",
    "steps": [
      {
        "title": "Incidente e requisição não são a mesma coisa",
        "body": "**Incidente:** interrupção não planejada ou degradação de serviço. **Requisição de serviço:** pedido recorrente e conhecido de usuário, como concessão autorizada de acesso, informação ou recurso previsto em catálogo. Uma solicitação de senha esquecida pode ter tratamento padronizado; queda de acesso ao RIS durante o atendimento é incidente. A classificação influencia procedimento, prioridade, comunicação e métricas."
      },
      {
        "title": "Prioridade depende de impacto e urgência",
        "body": "**Impacto** considera alcance e consequências da falha; **urgência** considera rapidez necessária para evitar dano ou respeitar prazo. Interrupção de PACS em atendimento clínico pode ter impacto alto; uma requisição de novo crachá pode ser menos urgente. Uma matriz de prioridades deve ser coerente com SLAs e riscos, não simples ordem de chegada quando serviços críticos estão indisponíveis."
      },
      {
        "title": "Escalonar e comunicar",
        "body": "O atendimento inicial registra sintomas, usuário afetado, serviço, horário e evidências; tenta solução conhecida e escala conforme competência. Se um contorno restabelece serviço, documente o que ficou pendente para causa raiz. Chamado encerrado não significa problema eliminado. Meça tempo até restauração e avalie se comunicação e prioridade atenderam às necessidades."
      }
    ],
    "worked": {
      "title": "Exemplo: dois chamados ao mesmo tempo",
      "body": "**Chamado A:** médico não acessa imagens de exame urgente, com indisponibilidade para vários consultórios.\n\n**Chamado B:** colaborador pede criação de pasta compartilhada para novo projeto de rotina.\n\n**Classificação:** A é incidente com impacto/urgência potencialmente altos. B é requisição de serviço com fluxo padronizado.\n\n**Ação:** priorize avaliação e restauração de A conforme política e registre comunicações; trate B no prazo contratado para requisições.\n\n**Armadilha:** a pessoa que abriu primeiro não determina isoladamente a prioridade."
    },
    "pitfalls": [
      "Incidente exige foco em recuperação; requisição é demanda prevista com fluxo conhecido.",
      "Impacto e urgência são dimensões diferentes da priorização.",
      "Um workaround pode restaurar serviço sem resolver a causa raiz.",
      "SLA não deve ser confundido com simples tempo até ler o chamado."
    ],
    "review": [
      {
        "ask": "Qual é requisição: 'sistema caiu' ou 'preciso de acesso autorizado ao novo setor'?",
        "answer": "Pedido previsto de acesso é requisição de serviço; queda não planejada é incidente."
      },
      {
        "ask": "O chamado mais antigo sempre é o mais prioritário?",
        "answer": "Não; prioridade deve considerar impacto, urgência e regras de atendimento."
      }
    ],
    "extra": "**Avançado:** ITIL 4 trabalha com práticas e cadeia de valor do serviço. Entenda incidente, problema, mudança e gestão de requisições em conjunto sem confundi-los."
  }
];
