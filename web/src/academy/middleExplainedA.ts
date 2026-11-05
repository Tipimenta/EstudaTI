import type {PedagogicalLesson} from './intro1'
/** Curadoria de aprofundamento progressivo: Redes, Segurança e SO. */
export const middleExplainedA:Record<number,Partial<PedagogicalLesson>>={
  "24": {
    "id": 24,
    "goal": "Compreender por que IPv6 existe, como um dispositivo forma o endereço com SLAAC e qual a diferença entre anúncio do roteador, DHCPv6, gateway e DNS.",
    "steps": [
      {
        "title": "Por que criar IPv6 se já temos endereços IPv4?",
        "body": "Pense nos muitos aparelhos que precisam se conectar à Internet: computadores, celulares, câmeras e sensores. No IPv4, um endereço tem **32 bits**, isto é, 32 posições que podem valer zero ou um. O espaço total é limitado. O **IPv6** foi desenvolvido para oferecer endereços de **128 bits**, permitindo quantidade muito maior de combinações e outras melhorias de funcionamento.\n\nUm endereço IPv6 pode ser escrito como `2001:db8:1:2::20`. Os grupos são representados em **hexadecimal**, sistema de numeração que usa algarismos de 0 a 9 e letras A a F. O sinal `::` abrevia uma sequência contínua de grupos com valor zero, conforme as regras de escrita. O IPv6 não usa o mecanismo tradicional de broadcast do IPv4; recorre, entre outros recursos, a **multicast**, envio destinado a um grupo específico de interfaces.\n\nEssa diferença importa porque não devemos transportar automaticamente todas as regras de IPv4 para IPv6."
      },
      {
        "title": "O que é SLAAC e por que um equipamento pode receber IP sem servidor DHCP?",
        "body": "Imagine que você liga um computador a uma rede IPv6 e quer que ele tenha endereço sem o administrador digitar um número em cada máquina. **SLAAC** significa *Stateless Address Autoconfiguration*, ou autoconfiguração de endereços sem que um servidor mantenha concessões individuais para cada estação. O mecanismo utiliza informações anunciadas pelos **roteadores**.\n\nUm roteador envia mensagens chamadas **Router Advertisements (RA)**, anúncios que podem informar características da rede e um **prefixo**, ou seja, a parte inicial comum aos endereços daquela sub-rede. Se a rede permitir, o dispositivo combina o prefixo anunciado com um **identificador de interface** adequado para formar seu endereço IPv6. Esse identificador não precisa ser derivado diretamente do MAC; sistemas modernos podem gerar valores estáveis ou temporários por razões de privacidade.\n\n**Autoconfiguração não significa confiar cegamente no primeiro endereço:** antes de começar a utilizá-lo, um dispositivo normalmente verifica se o endereço já está em uso por outra interface, procedimento chamado **Duplicate Address Detection (DAD)**."
      },
      {
        "title": "RA, DHCPv6 e DNS: três peças que não devem ser confundidas",
        "body": "O **RA** é uma mensagem de descoberta e configuração associada ao roteador IPv6. Entre outras informações, permite que a estação conheça caminhos e características da rede. O **DHCPv6** pode oferecer configurações adicionais e, em determinados modos, endereços controlados por servidor. Eles são mecanismos relacionados, mas não sinônimos.\n\nO **DNS**, por sua vez, responde a perguntas sobre nomes. Um registro **AAAA** pode associar um nome a um endereço IPv6, enquanto o tipo **A** está relacionado ao IPv4. A máquina pode aprender o servidor DNS por anúncios de roteador compatíveis com RDNSS, por DHCPv6 ou por configuração manual, conforme sistema e ambiente.\n\n**Conexão do raciocínio:** SLAAC ajuda a compor o endereço local; roteamento ajuda a chegar a outras redes; DNS ajuda a descobrir endereços associados aos nomes. Resolver um desses problemas não prova que os outros estão corretos."
      },
      {
        "title": "Como diagnosticar um computador que recebeu IPv6, mas não abre o site?",
        "body": "Comece dividindo o sintoma. Se o computador possui endereço que começa por `fe80::`, pode ser um endereço **link-local**: ele é destinado à comunicação naquele enlace, e não equivale, por si só, a ter conectividade global. Se ele já recebeu endereço de alcance apropriado, mas não consegue acessar outra rede, verifique rota e anúncios do roteador.\n\nSe o acesso pelo endereço IPv6 funciona, mas o nome de domínio falha, investigue DNS e registro AAAA. Se apenas um serviço específico falha, verifique se o servidor está atendendo IPv6 na porta prevista e se há bloqueio por firewall.\n\nNão conclua que 'IPv6 não usa DHCP, portanto jamais pode haver DHCPv6'. Nem conclua que 'tem endereço' significa 'consegue navegar': endereçamento, rota, nome e serviço são perguntas diferentes."
      }
    ],
    "worked": {
      "title": "Exercício: endereço fe80:: aparece, mas o sistema remoto não abre",
      "body": "**Cenário:** uma estação Linux apresenta o endereço `fe80::1234`, mas não recebeu outro endereço IPv6 adequado ao acesso a sistemas externos. Ela consegue trocar mensagens com vizinhos locais, mas não alcança o servidor em outra rede.\n\n**Passo 1.** O prefixo `fe80::/10` corresponde a endereços link-local. Eles são úteis para comunicação no enlace, mas não são roteados pela Internet como endereços globais.\n\n**Passo 2.** A presença de endereço link-local não garante que a estação recebeu prefixo ou rota para os outros destinos.\n\n**Passo 3.** Investigue anúncios de roteador, configurações locais e a existência de caminho para a rede de destino.\n\n**Passo 4.** Só depois avalie DNS, se o problema envolver nomes. O fato de o servidor não abrir por um endereço já conhecido aponta antes para conectividade ou serviço.\n\n**Conclusão:** SLAAC, roteamento e DNS participam da experiência, mas cada um responde a uma necessidade diferente."
    },
    "pitfalls": [
      "IPv6 usa 128 bits; IPv4 usa 32 bits, mas o tamanho maior não resolve sozinho todo problema de segurança.",
      "SLAAC pode gerar endereços sem servidor DHCPv6 atribuindo endereços individualmente.",
      "Endereço link-local não demonstra acesso roteado a redes distantes.",
      "RA fornece informações de roteador; DNS resolve nomes; DHCPv6 pode fornecer configuração conforme o cenário."
    ],
    "review": [
      {
        "ask": "Por que a quantidade de bits do endereço é importante?",
        "answer": "Porque mais bits permitem muito mais combinações de endereços, ampliando o espaço disponível para interfaces."
      },
      {
        "ask": "O que o RA oferece no contexto do SLAAC?",
        "answer": "Um anúncio do roteador com informações de rede, como prefixos e opções, usadas pelo dispositivo na configuração."
      },
      {
        "ask": "Qual é a diferença entre um endereço link-local e um endereço global?",
        "answer": "O link-local permite comunicação limitada ao enlace; o global é apropriado para roteamento conforme políticas e rede."
      },
      {
        "ask": "O que consultar se o IPv6 do servidor funciona, mas o nome falha?",
        "answer": "Verificar a resolução DNS, incluindo se existe resposta AAAA correta e qual resolvedor está sendo consultado."
      }
    ],
    "extra": ""
  },
  "31": {
    "id": 31,
    "goal": "Diferenciar evento, alerta e incidente, entender por que conter antes de restaurar sem destruir evidências e relacionar resposta a incidente à gestão de riscos.",
    "steps": [
      {
        "title": "Uma mensagem de alerta já significa que houve invasão?",
        "body": "Imagine um sistema que registra dezenas de tentativas de login. Um **evento** é um acontecimento observado, como a entrada de um usuário, a execução de um programa ou uma mensagem no registro do sistema. Um **alerta** é uma sinalização de que algum comportamento merece atenção, criada por ferramenta ou regra de monitoramento.\n\nNem todo alerta confirma uma invasão. Um funcionário pode digitar a senha errada por engano. A equipe precisa fazer **análise**: reunir sinais, verificar o contexto e determinar se há um **incidente**, isto é, uma ocorrência que afeta ou pode afetar negativamente os objetivos de segurança e requer resposta.\n\nEssa diferença explica por que a primeira reação não deve ser apagar máquinas ou bloquear toda a empresa: sem investigar, é possível causar dano maior do que o evento original."
      },
      {
        "title": "Antes do incidente: pessoas, registros e decisões precisam estar preparados",
        "body": "Uma organização que descobre um incidente grave sem ter responsáveis designados pode perder tempo discutindo quem deve decidir. A **preparação** envolve definir contatos, responsabilidades, procedimentos, canais de comunicação, proteção de registros e estratégias de continuidade.\n\nOs **logs** são registros produzidos por computadores, sistemas e equipamentos de rede. Eles podem indicar horário de uma ação, conta utilizada e sistema envolvido. Eles não provam tudo isoladamente, mas ajudam a reconstruir fatos. **Evidência** é a informação preservada para sustentar uma análise; seu valor depende de integridade, contexto e rastreabilidade.\n\nO NIST SP 800-61 **revisão 3**, publicado em 2025, associa resposta a incidentes às funções de gestão de risco do CSF 2.0. Isso reforça que prevenção e preparação pertencem ao trabalho contínuo de segurança, e não apenas ao momento de uma emergência."
      },
      {
        "title": "Detectar, responder e recuperar não significam a mesma coisa",
        "body": "**Detecção** procura reconhecer atividade suspeita; **resposta** organiza a análise e as ações para limitar consequências; **recuperação** trata do restabelecimento dos serviços e capacidades afetados. Essas atividades podem ocorrer de maneira coordenada, e não precisam ser uma fila rigidamente separada.\n\nPense num servidor com sinais de ransomware. Uma ação de **contenção** pode ser restringir o acesso de rede do equipamento para evitar propagação, preservando informações essenciais à investigação. **Erradicação** é remover causas e componentes maliciosos identificados. **Recuperar** é voltar a operar em ambiente confiável, por exemplo a partir de cópias verificadas, após avaliar o risco de reinfecção.\n\nReinstalar o sistema sem registrar evidências pode dificultar entender o ataque. Continuar operando sem contenção pode aumentar o dano. É necessário equilibrar investigação, segurança e continuidade dos serviços."
      },
      {
        "title": "Como provar que a organização realmente aprendeu com o incidente?",
        "body": "Depois de restabelecer o serviço, a equipe pode perguntar: por onde ocorreu o acesso indevido? Havia contas com privilégios excessivos? Os alertas foram vistos a tempo? O backup foi testado? Chamamos de **lições aprendidas** o registro das descobertas que deve orientar mudanças em controles e processos.\n\nUma boa medida não é 'fazer segurança melhor', mas algo verificável: reduzir permissões de determinada conta, testar restauração em intervalo definido, configurar alertas para comportamento específico e atribuir responsável. Isso relaciona o incidente a **risco e controle** — conceitos ensinados na aula introdutória.\n\nReferência de estudo: [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/projects/incident-response). Em provas que mencionam explicitamente uma revisão antiga, observe qual versão o enunciado exige."
      }
    ],
    "worked": {
      "title": "Exercício: arquivos são renomeados de forma suspeita num servidor",
      "body": "**Situação:** às 9h, o monitoramento detecta que milhares de arquivos foram renomeados num servidor de arquivos. Há usuários sem acesso e suspeita de malware.\n\n**Passo 1.** Classifique o sinal inicial como evento/alerta a ser analisado. A gravidade potencial justifica resposta rápida, mas ainda devemos documentar o que foi observado.\n\n**Passo 2.** Avalie contenção proporcional, como isolar a conexão comprometida, coordenando a decisão com responsáveis pelo serviço.\n\n**Passo 3.** Preserve registros e dados relevantes para investigação. Não apague logs como 'limpeza'.\n\n**Passo 4.** Depois de avaliar causa e extensão, remova componentes maliciosos, corrija fragilidades e restaure cópias íntegras em ambiente confiável.\n\n**Passo 5.** Registre lições e controles que evitariam nova ocorrência.\n\n**Conclusão:** detectar, conter, investigar e recuperar são objetivos relacionados, mas diferentes. O procedimento precisa proteger evidências e pessoas, além de retomar o serviço."
    },
    "pitfalls": [
      "Um alerta isolado não comprova um ataque, mas pode justificar investigação e contenção preventiva.",
      "Contenção reduz efeitos e propagação; erradicação busca remover a causa ou presença maliciosa.",
      "Recuperar antes de confiar no ambiente pode reintroduzir a ameaça.",
      "Preparação e governança fazem parte da gestão contínua, não apenas da hora do incidente."
    ],
    "review": [
      {
        "ask": "Por que um alerta não prova sozinho que houve invasão?",
        "answer": "Porque o sinal pode ter causas legítimas ou falso positivo; é necessário contexto e análise para confirmar o incidente."
      },
      {
        "ask": "Qual é o objetivo da contenção?",
        "answer": "Limitar a propagação ou as consequências enquanto a equipe analisa e responde ao incidente."
      },
      {
        "ask": "Por que preservar logs durante uma investigação?",
        "answer": "Porque registram acontecimentos úteis para reconstruir os fatos e sustentar conclusões sobre o evento."
      },
      {
        "ask": "Recuperar um servidor é a mesma coisa que erradicar malware?",
        "answer": "Não. Erradicar remove ameaça e causas identificadas; recuperar restabelece serviços com segurança."
      }
    ],
    "extra": ""
  },
  "41": {
    "id": 41,
    "goal": "Entender como discos podem trabalhar juntos em RAID, quais falhas RAID 1 e RAID 5 toleram e por que redundância não substitui backup.",
    "steps": [
      {
        "title": "Um disco pode falhar: o que acontece com um servidor?",
        "body": "Imagine um servidor que guarda arquivos em um único disco. Se o equipamento físico falhar, os dados talvez fiquem inacessíveis até que o disco seja reparado ou substituído. Um dos objetivos do **RAID** (*Redundant Array of Independent Disks*) é organizar vários discos de forma a obter propriedades como redundância, capacidade ou desempenho, conforme a configuração escolhida.\n\n**Redundância** significa ter informação adicional que ajuda a continuar operando ou reconstruir dados em determinados tipos de falha. Isso não significa proteção contra qualquer desastre. Para entender RAID, comece distinguindo **falha física de um disco** de **remoção acidental de um arquivo**: o primeiro pode ser tolerado por certos arranjos; o segundo pode ser replicado em todos eles."
      },
      {
        "title": "RAID 1: por que dois discos guardam a mesma informação?",
        "body": "No **RAID 1**, conhecido como espelhamento, a gravação é mantida em cópias em discos do conjunto. Imagine dois discos de 1 TB: em uma configuração de espelho simples, os dois guardam os mesmos dados, de modo que a capacidade útil é aproximadamente **1 TB**, não 2 TB.\n\nSe um disco falhar e o outro estiver íntegro, o sistema pode continuar com os dados remanescentes. O arranjo fica em estado **degradado**, isto é, funcionando sem a redundância originalmente prevista. Após substituir o disco, ocorre uma **reconstrução (rebuild)**, processo de formar novamente a cópia no disco novo.\n\nRAID 1 não impede que alguém apague uma pasta por engano. O comando de exclusão pode afetar as cópias mantidas pelo espelho."
      },
      {
        "title": "RAID 5: como três discos podem tolerar falha de um?",
        "body": "No **RAID 5**, os dados são distribuídos entre pelo menos **três discos** e há informação de **paridade** distribuída. Paridade é um conjunto de informações calculadas a partir dos dados para ajudar a reconstruir a informação de um disco que falhou. Não é simplesmente uma cópia idêntica de cada disco.\n\nEm um RAID 5 com três discos iguais de 1 TB, a capacidade útil típica é aproximadamente **2 TB**, pois o equivalente à capacidade de um disco é usado para redundância. O conjunto convencional tolera falha de **um disco**, mas outra falha antes de concluir a reconstrução pode levar à perda do conjunto.\n\nQuando o arranjo está degradado, o rebuild exige leitura e escrita intensas. Por isso a redundância reduz certos riscos, mas não torna o equipamento invulnerável."
      },
      {
        "title": "Backup e RAID respondem a perguntas diferentes",
        "body": "**Backup** é uma cópia feita para recuperar dados em situações como exclusão acidental, corrupção, ataque ou perda de sistemas, conforme a política e a qualidade das cópias. **RAID** ajuda principalmente a disponibilidade frente a falhas específicas de hardware. Um ataque que criptografa arquivos pode afetar todos os discos de um arranjo de RAID ao mesmo tempo.\n\nUm **snapshot** é um registro do estado de um volume ou sistema num momento, com implementação que varia conforme a tecnologia. Ele pode facilitar reversões, mas não é necessariamente uma cópia independente: se o armazenamento original for perdido, o snapshot dependente dele pode desaparecer.\n\n**Conexão com a continuidade:** se a prioridade é continuar operando após a falha de um disco, certos RAIDs ajudam. Se é recuperar uma versão antiga de um documento que foi apagado, precisamos de uma estratégia de backup/restauração adequada."
      }
    ],
    "worked": {
      "title": "Exercício: três discos de 1 TB e a perda de um deles",
      "body": "**Situação:** um servidor utiliza RAID 5 com três discos de 1 TB. Um dos discos falha. A equipe pergunta quanto era a capacidade útil e o que fazer.\n\n**Passo 1.** RAID 5 usa no mínimo três discos e reserva o equivalente à capacidade de um para informações de paridade distribuídas.\n\n**Passo 2.** A capacidade útil típica, considerando discos iguais e sem outras reservas, é `(3 − 1) × 1 TB = 2 TB`.\n\n**Passo 3.** A falha de um disco pode ser tolerada, mas o arranjo está degradado e precisa de substituição e reconstrução controladas.\n\n**Passo 4.** A equipe verifica também backups testados, porque uma nova falha durante reconstrução ou exclusão lógica pode causar perda de dados.\n\n**Conclusão:** a resposta é **2 TB de capacidade útil e tolerância convencional a uma falha de disco**. RAID não elimina a necessidade de recuperação independente."
    },
    "pitfalls": [
      "RAID 1 com dois discos iguais não soma a capacidade útil dos dois no espelho simples.",
      "RAID 5 não é espelhamento: usa dados e paridade distribuídos.",
      "Arranjo degradado ainda pode funcionar, mas já perdeu parte da tolerância original.",
      "RAID, backup e snapshot são recursos com objetivos e limites diferentes."
    ],
    "review": [
      {
        "ask": "Por que dois discos de 1 TB em RAID 1 normalmente oferecem 1 TB útil?",
        "answer": "Porque cada disco mantém cópia espelhada dos dados, em vez de somar capacidades independentes."
      },
      {
        "ask": "Como RAID 5 tolera a falha de um disco?",
        "answer": "Distribuindo dados e informações de paridade que permitem reconstrução da parte perdida após uma falha."
      },
      {
        "ask": "Qual risco permanece mesmo com RAID funcionando?",
        "answer": "Exclusão acidental, corrupção lógica, ransomware ou outras perdas que podem atingir o conjunto."
      },
      {
        "ask": "O que significa RAID degradado?",
        "answer": "O arranjo ainda opera, mas perdeu redundância porque um dos componentes previstos não está disponível."
      }
    ],
    "extra": ""
  }
};
