import type {PedagogicalLesson} from './intro1'
export const completedRED:PedagogicalLesson[]=[
  {
    "id": 21,
    "title": "TCP: conexão e controle de fluxo",
    "goal": "Explicar e aplicar: TCP: conexão e controle de fluxo.",
    "steps": [
      {
        "title": "O que é TCP: conexão e controle de fluxo e para que serve?",
        "body": "TCP é orientado à conexão, confiável e fornece fluxo de bytes ordenado. A abertura clássica utiliza SYN, SYN-ACK e ACK. Números de sequência e confirmações permitem detecção de perdas e retransmissão; janela controla fluxo.\n\n**Veja o conceito aplicado:** Transferência de arquivo costuma exigir que o receptor reconstrua a sequência correta mesmo quando segmentos se perdem ou chegam fora de ordem."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual característica TCP não oferece sozinho?\n\n**Resposta fundamentada:** Criptografia de ponta a ponta.\n\n**Por que essa é a resposta:** A confidencialidade normalmente exige TLS ou outra proteção."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual sequência representa o handshake TCP clássico?\n\n**Resposta fundamentada:** SYN, SYN-ACK, ACK.\n\n**Por que essa é a resposta:** O estabelecimento clássico usa três mensagens.\n\n**Atenção ao limite do conceito:** TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: TCP: conexão e controle de fluxo",
      "body": "**1. Identifique a pergunta e o assunto.** Um servidor TCP mantém a janela de recepção quase zerada porque o aplicativo lê lentamente os dados. O que está limitando o emissor?\n\n**2. Recupere a regra que explica a resposta.** A janela anunciada pelo receptor (rwnd) sinaliza capacidade de buffer e controla o fluxo independentemente do congestionamento da rede.\n\n**3. Aplique ao cenário e conclua.** Controle de fluxo do receptor."
    },
    "pitfalls": [
      "TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas.",
      "TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas."
    ],
    "review": [
      {
        "ask": "Qual sequência representa o handshake TCP clássico?",
        "answer": "SYN, SYN-ACK, ACK. O estabelecimento clássico usa três mensagens."
      },
      {
        "ask": "Qual característica TCP não oferece sozinho?",
        "answer": "Criptografia de ponta a ponta. A confidencialidade normalmente exige TLS ou outra proteção."
      },
      {
        "ask": "Qual armadilha evitar em TCP: conexão e controle de fluxo?",
        "answer": "TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas."
      }
    ],
    "extra": ""
  },
  {
    "id": 23,
    "title": "DHCP e DORA",
    "goal": "Explicar e aplicar: DHCP e DORA.",
    "steps": [
      {
        "title": "O que é DHCP e DORA e para que serve?",
        "body": "No cenário clássico DHCPv4, o cliente inicia a descoberta por DHCPDISCOVER, recebe DHCPOFFER, solicita por DHCPREQUEST e conclui com DHCPACK. O servidor pode fornecer IP, máscara, gateway e DNS, com tempo de concessão.\n\n**Veja o conceito aplicado:** Se DHCP não responde, o cliente pode ficar sem configuração válida; verifique escopo, serviço, alcance e relay."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual informação é normalmente distribuída pelo DHCP?\n\n**Resposta fundamentada:** Gateway padrão do cliente.\n\n**Por que essa é a resposta:** DHCP fornece parâmetros de configuração de rede, como gateway."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual é a ordem típica de mensagens do DHCPv4?\n\n**Resposta fundamentada:** Discover, Offer, Request, ACK.\n\n**Por que essa é a resposta:** DORA resume a negociação clássica.\n\n**Atenção ao limite do conceito:** O gateway padrão não é o servidor DNS; podem ser máquinas diferentes."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: DHCP e DORA",
      "body": "**1. Identifique a pergunta e o assunto.** Um cliente DHCP IPv4 não possui endereço e inicia a descoberta de servidor. Qual mensagem é típica do primeiro passo do DORA?\n\n**2. Recupere a regra que explica a resposta.** O processo inicial tradicional é Discover, Offer, Request e Acknowledge; o Discover procura servidores disponíveis.\n\n**3. Aplique ao cenário e conclua.** DHCPDISCOVER."
    },
    "pitfalls": [
      "O gateway padrão não é o servidor DNS; podem ser máquinas diferentes.",
      "O gateway padrão não é o servidor DNS; podem ser máquinas diferentes."
    ],
    "review": [
      {
        "ask": "Qual é a ordem típica de mensagens do DHCPv4?",
        "answer": "Discover, Offer, Request, ACK. DORA resume a negociação clássica."
      },
      {
        "ask": "Qual informação é normalmente distribuída pelo DHCP?",
        "answer": "Gateway padrão do cliente. DHCP fornece parâmetros de configuração de rede, como gateway."
      },
      {
        "ask": "Qual armadilha evitar em DHCP e DORA?",
        "answer": "O gateway padrão não é o servidor DNS; podem ser máquinas diferentes."
      }
    ],
    "extra": ""
  },
  {
    "id": 24,
    "title": "IPv6 e SLAAC",
    "goal": "Explicar e aplicar: IPv6 e SLAAC.",
    "steps": [
      {
        "title": "O que é IPv6 e SLAAC e para que serve?",
        "body": "IPv6 usa endereços de 128 bits e elimina o broadcast tradicional. SLAAC permite configuração por anúncios de roteador (RA); Neighbor Discovery utiliza ICMPv6. Há endereços link-local (fe80::/10) e globais unicast.\n\n**Veja o conceito aplicado:** Um host pode ter simultaneamente endereço link-local e global; conectividade local não prova que há roteamento para a internet."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual mecanismo fornece anúncios de roteador usados no SLAAC?\n\n**Resposta fundamentada:** ICMPv6 Neighbor Discovery.\n\n**Por que essa é a resposta:** RAs fazem parte do Neighbor Discovery em ICMPv6."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual é o tamanho de um endereço IPv6?\n\n**Resposta fundamentada:** 128 bits.\n\n**Por que essa é a resposta:** IPv6 tem 128 bits.\n\n**Atenção ao limite do conceito:** IPv6 não garante segurança automaticamente e não dispensa regras de firewall."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: IPv6 e SLAAC",
      "body": "**1. Identifique a pergunta e o assunto.** Em IPv6, um dispositivo recebe anúncios de roteador e configura endereço por SLAAC. Qual componente fornece o prefixo da rede?\n\n**2. Recupere a regra que explica a resposta.** Em SLAAC, anúncios ICMPv6 do roteador podem fornecer prefixo e parâmetros; DNS pode usar mecanismos distintos.\n\n**3. Aplique ao cenário e conclua.** Router Advertisement."
    },
    "pitfalls": [
      "IPv6 não garante segurança automaticamente e não dispensa regras de firewall.",
      "IPv6 não garante segurança automaticamente e não dispensa regras de firewall."
    ],
    "review": [
      {
        "ask": "Qual é o tamanho de um endereço IPv6?",
        "answer": "128 bits. IPv6 tem 128 bits."
      },
      {
        "ask": "Qual mecanismo fornece anúncios de roteador usados no SLAAC?",
        "answer": "ICMPv6 Neighbor Discovery. RAs fazem parte do Neighbor Discovery em ICMPv6."
      },
      {
        "ask": "Qual armadilha evitar em IPv6 e SLAAC?",
        "answer": "IPv6 não garante segurança automaticamente e não dispensa regras de firewall."
      }
    ],
    "extra": ""
  },
  {
    "id": 25,
    "title": "NAT e redes privadas",
    "goal": "Explicar e aplicar: NAT e redes privadas.",
    "steps": [
      {
        "title": "O que é NAT e redes privadas e para que serve?",
        "body": "NAT traduz endereços entre redes. PAT/NAPT permite multiplexar conexões internas por portas em um endereço público. RFC 1918 define blocos IPv4 privados, incluindo 10/8, 172.16/12 e 192.168/16.\n\n**Veja o conceito aplicado:** Vários computadores de 192.168.1.0/24 podem acessar a internet por uma única interface pública usando tradução de porta."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual tecnologia diferencia conexões internas usando números de porta em um IP público?\n\n**Resposta fundamentada:** PAT/NAPT.\n\n**Por que essa é a resposta:** PAT ou NAPT traduz também portas, multiplexando fluxos."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Um roteador residencial traduz vários endereços privados para um único IPv4 público, distinguindo conexões pelas portas. Que técnica está descrita?\n\n**Resposta fundamentada:** PAT/NAPT.\n\n**Por que essa é a resposta:** A tradução de endereços e portas (PAT/NAPT) permite multiplexar diversas conexões internas no mesmo IPv4 público.\n\n**Atenção ao limite do conceito:** NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: NAT e redes privadas",
      "body": "**1. Identifique a pergunta e o assunto.** Qual faixa é privada segundo RFC 1918?\n\n**2. Recupere a regra que explica a resposta.** O bloco privado inclui 172.16.0.0 até 172.31.255.255.\n\n**3. Aplique ao cenário e conclua.** 172.16.0.0/12."
    },
    "pitfalls": [
      "NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall.",
      "NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall."
    ],
    "review": [
      {
        "ask": "Qual faixa é privada segundo RFC 1918?",
        "answer": "172.16.0.0/12. O bloco privado inclui 172.16.0.0 até 172.31.255.255."
      },
      {
        "ask": "Qual tecnologia diferencia conexões internas usando números de porta em um IP público?",
        "answer": "PAT/NAPT. PAT ou NAPT traduz também portas, multiplexando fluxos."
      },
      {
        "ask": "Qual armadilha evitar em NAT e redes privadas?",
        "answer": "NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall."
      }
    ],
    "extra": ""
  },
  {
    "id": 26,
    "title": "HTTP, HTTPS e códigos de resposta",
    "goal": "Explicar e aplicar: HTTP, HTTPS e códigos de resposta.",
    "steps": [
      {
        "title": "O que é HTTP, HTTPS e códigos de resposta e para que serve?",
        "body": "HTTP é protocolo de aplicação; HTTPS utiliza HTTP protegido por TLS. 200 indica sucesso, 301 mudança permanente, 400 requisição inválida, 401 falta de autenticação, 403 acesso negado e 404 recurso não encontrado.\n\n**Veja o conceito aplicado:** Se uma API responde 401 a usuário sem credencial e 403 a usuário autenticado sem permissão, a diferença é autenticação versus autorização."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** O HTTPS emprega qual mecanismo para proteger a comunicação?\n\n**Resposta fundamentada:** TLS.\n\n**Por que essa é a resposta:** TLS fornece proteção criptográfica ao transporte utilizado pelo HTTP."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Uma API recebeu dados válidos e criou um recurso. Qual status HTTP é apropriado quando a criação foi bem-sucedida?\n\n**Resposta fundamentada:** 201 Created.\n\n**Por que essa é a resposta:** 201 Created indica criação do recurso; os demais códigos informam problemas de autenticação, inexistência ou indisponibilidade.\n\n**Atenção ao limite do conceito:** HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: HTTP, HTTPS e códigos de resposta",
      "body": "**1. Identifique a pergunta e o assunto.** Qual código HTTP indica normalmente ausência de autenticação válida?\n\n**2. Recupere a regra que explica a resposta.** 401 Unauthorized se refere a autenticação; 403 trata de recusa de acesso.\n\n**3. Aplique ao cenário e conclua.** 401."
    },
    "pitfalls": [
      "HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação.",
      "HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação."
    ],
    "review": [
      {
        "ask": "Qual código HTTP indica normalmente ausência de autenticação válida?",
        "answer": "401. 401 Unauthorized se refere a autenticação; 403 trata de recusa de acesso."
      },
      {
        "ask": "O HTTPS emprega qual mecanismo para proteger a comunicação?",
        "answer": "TLS. TLS fornece proteção criptográfica ao transporte utilizado pelo HTTP."
      },
      {
        "ask": "Qual armadilha evitar em HTTP, HTTPS e códigos de resposta?",
        "answer": "HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação."
      }
    ],
    "extra": ""
  },
  {
    "id": 118,
    "title": "ARP, tabela MAC e encaminhamento",
    "goal": "Compreender e aplicar arp, tabela mac e encaminhamento em provas.",
    "steps": [
      {
        "title": "O que é ARP, tabela MAC e encaminhamento e para que serve?",
        "body": "ARP resolve o endereço MAC de um vizinho IPv4 na rede local, enquanto switches aprendem associações MAC-porta pelo endereço de origem dos quadros.\n\nSe o destino IPv4 está na mesma sub-rede, a estação consulta o MAC do destino; se está fora, obtém o MAC do gateway padrão. O roteador troca o encapsulamento de enlace ao encaminhar para a próxima rede. Switch não roteia só porque conhece MAC.\n\n**Veja o conceito aplicado:** Um computador 192.168.1.10/24 deseja falar com 192.168.2.10. O ARP será direcionado ao gateway da rede 192.168.1.0/24, não diretamente ao IP remoto."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Um switch recebe quadro por porta 4 com MAC de origem ainda desconhecido. Qual atualização é típica em uma tabela MAC dinâmica?\n\n**Resposta fundamentada:** Associar MAC de origem à porta 4.\n\n**Por que essa é a resposta:** Switches L2 aprendem endereço MAC de origem e porta de entrada; destino é usado para decisão de encaminhamento."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Um computador 192.168.1.10/24 deseja falar com 192.168.2.10. O ARP será direcionado ao gateway da rede 192.168.1.0/24, não diretamente ao IP remoto.\n\n**A questão pergunta:** Ao acessar IP em outra sub-rede, para quem o host resolve o MAC?\n\n**Resposta fundamentada:** Gateway padrão.\n\n**Por que essa é a resposta:** O frame Ethernet da primeira etapa precisa atingir o roteador de saída.\n\n**Não confunda:** Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: ARP, tabela MAC e encaminhamento",
      "body": "**1. Identifique a pergunta e o assunto.** Ao acessar IP em outra sub-rede, para quem o host resolve o MAC?\n\n**2. Recupere a regra que explica a resposta.** O frame Ethernet da primeira etapa precisa atingir o roteador de saída.\n\n**3. Aplique ao cenário e conclua.** Gateway padrão."
    },
    "pitfalls": [
      "Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS.",
      "Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de ARP, tabela MAC e encaminhamento?",
        "answer": "ARP resolve o endereço MAC de um vizinho IPv4 na rede local, enquanto switches aprendem associações MAC-porta pelo endereço de origem dos quadros."
      },
      {
        "ask": "Qual erro de prova evitar em ARP, tabela MAC e encaminhamento?",
        "answer": "Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS."
      }
    ],
    "extra": ""
  },
  {
    "id": 119,
    "title": "TCP: congestionamento vs fluxo",
    "goal": "Compreender e aplicar tcp: congestionamento vs fluxo em provas.",
    "steps": [
      {
        "title": "O que é TCP: congestionamento vs fluxo e para que serve?",
        "body": "Controle de fluxo adapta o envio à capacidade do receptor; controle de congestionamento reage à capacidade e ao estado do caminho de rede.\n\nA janela anunciada pelo receptor (rwnd) sinaliza espaço disponível no buffer. A janela de congestionamento (cwnd) limita a taxa conforme o comportamento da rede. A quantidade efetiva em trânsito fica limitada pelas duas.\n\n**Veja o conceito aplicado:** Se o receptor fica lento, pode reduzir a janela anunciada mesmo sem perdas. Se o caminho sofre perdas, o emissor pode reduzir cwnd mesmo com receptor rápido."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Uma rede passa a registrar perdas e o emissor reduz a janela de congestionamento, apesar de o receptor ainda anunciar buffer amplo. O fenômeno envolve principalmente:\n\n**Resposta fundamentada:** Controle de congestionamento do caminho.\n\n**Por que essa é a resposta:** cwnd reage às condições de rede; rwnd representa capacidade de recepção. O limite efetivo considera ambos."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Se o receptor fica lento, pode reduzir a janela anunciada mesmo sem perdas. Se o caminho sofre perdas, o emissor pode reduzir cwnd mesmo com receptor rápido.\n\n**A questão pergunta:** Qual mecanismo expressa a capacidade de recepção do host remoto no TCP?\n\n**Resposta fundamentada:** Janela de recepção anunciada.\n\n**Por que essa é a resposta:** A janela anunciada é usada no controle de fluxo.\n\n**Não confunda:** Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: TCP: congestionamento vs fluxo",
      "body": "**1. Identifique a pergunta e o assunto.** Qual mecanismo expressa a capacidade de recepção do host remoto no TCP?\n\n**2. Recupere a regra que explica a resposta.** A janela anunciada é usada no controle de fluxo.\n\n**3. Aplique ao cenário e conclua.** Janela de recepção anunciada."
    },
    "pitfalls": [
      "Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo.",
      "Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de TCP: congestionamento vs fluxo?",
        "answer": "Controle de fluxo adapta o envio à capacidade do receptor; controle de congestionamento reage à capacidade e ao estado do caminho de rede."
      },
      {
        "ask": "Qual erro de prova evitar em TCP: congestionamento vs fluxo?",
        "answer": "Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo."
      }
    ],
    "extra": ""
  },
  {
    "id": 120,
    "title": "Roteamento estático e dinâmico",
    "goal": "Compreender e aplicar roteamento estático e dinâmico em provas.",
    "steps": [
      {
        "title": "O que é Roteamento estático e dinâmico e para que serve?",
        "body": "Roteadores decidem o próximo salto usando tabela de roteamento; a rota de maior prefixo específico normalmente prevalece.\n\nUma rota 10.20.5.0/24 é mais específica que 10.20.0.0/16 e 0.0.0.0/0. Protocolos como OSPF trocam informações de roteamento, ao passo que rotas estáticas são configuradas manualmente. Métricas importam quando rotas concorrentes têm o mesmo prefixo e critérios administrativos aplicáveis.\n\n**Veja o conceito aplicado:** Se o destino é 10.20.5.12, um roteador com rotas /16 e /24 escolhe a /24, respeitando as regras de seleção."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Uma tabela de rotas contém 10.1.0.0/16 e 10.1.5.0/24. Para o destino 10.1.5.22, qual rota será preferida pela correspondência de prefixo?\n\n**Resposta fundamentada:** 10.1.5.0/24.\n\n**Por que essa é a resposta:** A correspondência de prefixo mais longo privilegia /24 para o endereço 10.1.5.22."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Se o destino é 10.20.5.12, um roteador com rotas /16 e /24 escolhe a /24, respeitando as regras de seleção.\n\n**A questão pergunta:** Diante de rotas 10.0.0.0/8 e 10.2.3.0/24, qual corresponde ao destino 10.2.3.9 com maior especificidade?\n\n**Resposta fundamentada:** 10.2.3.0/24.\n\n**Por que essa é a resposta:** O encaminhamento usa a correspondência de prefixo mais longo.\n\n**Não confunda:** Não confunda rota padrão com máscara aplicada ao IP local."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Roteamento estático e dinâmico",
      "body": "**1. Identifique a pergunta e o assunto.** Diante de rotas 10.0.0.0/8 e 10.2.3.0/24, qual corresponde ao destino 10.2.3.9 com maior especificidade?\n\n**2. Recupere a regra que explica a resposta.** O encaminhamento usa a correspondência de prefixo mais longo.\n\n**3. Aplique ao cenário e conclua.** 10.2.3.0/24."
    },
    "pitfalls": [
      "Não confunda rota padrão com máscara aplicada ao IP local.",
      "Não confunda rota padrão com máscara aplicada ao IP local."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Roteamento estático e dinâmico?",
        "answer": "Roteadores decidem o próximo salto usando tabela de roteamento; a rota de maior prefixo específico normalmente prevalece."
      },
      {
        "ask": "Qual erro de prova evitar em Roteamento estático e dinâmico?",
        "answer": "Não confunda rota padrão com máscara aplicada ao IP local."
      }
    ],
    "extra": ""
  },
  {
    "id": 121,
    "title": "DNS recursivo, autoritativo e cache",
    "goal": "Compreender e aplicar dns recursivo, autoritativo e cache em provas.",
    "steps": [
      {
        "title": "O que é DNS recursivo, autoritativo e cache e para que serve?",
        "body": "Resolver recursivo atende consultas do cliente e busca respostas; servidores autoritativos mantêm dados da zona correspondente.\n\nUm servidor recursivo pode consultar raiz, TLD e autoridade para obter a resposta. Caches reduzem consultas e latência, mas mudanças de registros não aparecem imediatamente para quem armazena respostas ainda válidas. DNSSEC usa assinaturas para autenticar dados DNS, sem fornecer criptografia geral de tráfego web.\n\n**Veja o conceito aplicado:** Se um registro muda de 192.0.2.1 para 192.0.2.2, clientes podem consultar valor anterior até o TTL expirar no cache."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Um registro DNS foi alterado no autoritativo, mas clientes seguem recebendo o valor antigo durante algum tempo. Qual explicação é plausível?\n\n**Resposta fundamentada:** Cache em resolvedor recursivo ainda dentro do TTL.\n\n**Por que essa é a resposta:** Resolvedores podem servir dados armazenados enquanto válidos conforme política de cache e TTL; a atualização não é instantânea para todos os clientes."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Se um registro muda de 192.0.2.1 para 192.0.2.2, clientes podem consultar valor anterior até o TTL expirar no cache.\n\n**A questão pergunta:** Qual componente mantém os dados oficiais da zona DNS?\n\n**Resposta fundamentada:** Servidor autoritativo.\n\n**Por que essa é a resposta:** O servidor autoritativo responde pelas informações publicadas em sua zona.\n\n**Não confunda:** Não confunda registro A com MX; nem DNSSEC com HTTPS."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: DNS recursivo, autoritativo e cache",
      "body": "**1. Identifique a pergunta e o assunto.** Qual componente mantém os dados oficiais da zona DNS?\n\n**2. Recupere a regra que explica a resposta.** O servidor autoritativo responde pelas informações publicadas em sua zona.\n\n**3. Aplique ao cenário e conclua.** Servidor autoritativo."
    },
    "pitfalls": [
      "Não confunda registro A com MX; nem DNSSEC com HTTPS.",
      "Não confunda registro A com MX; nem DNSSEC com HTTPS."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de DNS recursivo, autoritativo e cache?",
        "answer": "Resolver recursivo atende consultas do cliente e busca respostas; servidores autoritativos mantêm dados da zona correspondente."
      },
      {
        "ask": "Qual erro de prova evitar em DNS recursivo, autoritativo e cache?",
        "answer": "Não confunda registro A com MX; nem DNSSEC com HTTPS."
      }
    ],
    "extra": ""
  },
  {
    "id": 152,
    "title": "Diagnóstico de rede sem confundir DNS, rota e firewall",
    "goal": "Dado um incidente de conectividade, formular hipóteses por camada e escolher testes que distingam suas causas.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — um serviço abre por IP, mas não por nome\nUm usuário da rede 192.168.30.0/24 relata que consegue acessar um serviço por `https://192.0.2.20`, mas não por `https://intranet.exemplo`. Um colega atribui o problema ao roteador. Antes de trocar equipamento, separe **o que o sintoma demonstra** daquilo que ainda não se sabe. Acesso por IP indica algum caminho de rede funcional naquele instante, mas não demonstra resolução DNS correta. Mesmo esse teste tem limites: o certificado TLS pode não corresponder ao IP; o servidor pode hospedar múltiplos sites que dependem do nome no cabeçalho Host/SNI."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Método de investigação por hipóteses\n1. **Registrar escopo:** a falha ocorre com todos os computadores, um único usuário ou apenas uma VLAN? Qual nome exato, URL, horário e mensagem de erro?\n2. **Verificar configuração local:** IP, máscara, gateway e resolvers DNS. O mesmo IP com máscara diferente pode alterar a decisão de encaminhar diretamente ou via gateway.\n3. **Testar resolução:** consultar o DNS configurado e registrar endereço retornado e TTL; distinguir `NXDOMAIN`, timeout e resposta incorreta. Um cache local pode explicar divergências entre clientes.\n4. **Testar conexão de transporte:** examinar se há rota e conectividade TCP para a porta real do serviço. `ping` falhar não prova que TCP/443 está bloqueado: ICMP pode estar filtrado.\n5. **Conferir aplicação:** proxy, certificado, autenticação, SNI, virtual host e redirecionamentos. Se o nome resolve para IP correto, não encerre o diagnóstico somente porque o DNS respondeu."
      },
      {
        "title": "Construindo a solução",
        "body": "## Exemplo resolvido\nO DNS da estação responde `192.0.2.21`, enquanto o registro correto no servidor autoritativo é `192.0.2.20`. Outro computador usa um DNS distinto e abre a intranet. A ação fundamentada é identificar a origem do registro incorreto, corrigir a autoridade ou o resolver, verificar TTL e testar novamente. Reiniciar o roteador não corrige uma zona autoritativa errada. Se a consulta responde corretamente, mas a conexão falha, analise roteamento, ACL/firewall e serviço de destino, nesta ordem de evidências."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Diagnóstico de rede sem confundir DNS, rota e firewall",
      "body": "**A questão pergunta:** Uma estação acessa HTTPS pelo endereço IPv4, mas não pelo nome. Qual teste discrimina inicialmente uma falha de resolução?\n\n**Resposta fundamentada:** Consultar a resposta DNS do nome na estação e comparar com a esperada.\n\n**Por que essa é a resposta:** A comparação das respostas DNS com o destino esperado testa diretamente a hipótese de resolução; as demais medidas não são diagnósticos proporcionais."
    },
    "pitfalls": [
      "Não extrapole o enunciado: use os dados e condições específicos de Diagnóstico de rede sem confundir DNS, rota e firewall.",
      "Não extrapole o enunciado: use os dados e condições específicos de Diagnóstico de rede sem confundir DNS, rota e firewall."
    ],
    "review": [
      {
        "ask": "Um hostname falha, mas o IP responde: o que verificar antes de culpar roteamento?",
        "answer": "Resposta DNS, endereço obtido, TTL e dependência de nome em TLS/SNI."
      },
      {
        "ask": "Por que ping negativo não prova indisponibilidade de HTTPS?",
        "answer": "Porque ICMP pode ser filtrado enquanto o fluxo TCP/443 continua permitido."
      }
    ],
    "extra": ""
  },
  {
    "id": 153,
    "title": "Sub-redes, sumarização e escolha da rota",
    "goal": "Calcular faixa válida de endereços e aplicar longest-prefix match a uma decisão de roteamento.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — dividir uma rede e encaminhar um pacote\nUma secretaria recebeu o bloco `10.40.8.0/24` e precisa criar **quatro sub-redes de mesmo tamanho** para separar departamentos. Você não deve escolher um endereço ao acaso: primeiro identifique quantos bits de host serão emprestados. Quatro sub-redes equivalem a `2²`, então o novo prefixo é `/26`. A máscara `/26` corresponde a `255.255.255.192`: há 64 endereços por bloco, dos quais 62 são normalmente utilizáveis como hosts em cada sub-rede IPv4 convencional."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Resolução trabalhada\nOs quatro blocos são: `10.40.8.0/26` (hosts .1 a .62; broadcast .63); `10.40.8.64/26` (hosts .65 a .126; broadcast .127); `10.40.8.128/26` (hosts .129 a .190; broadcast .191); `10.40.8.192/26` (hosts .193 a .254; broadcast .255). O salto de 64 resulta da combinação de 6 bits de host. A presença de `.64` em um endereço não basta, por si só, para classificá-lo como host: em `/26`, `.64` é endereço da rede do segundo bloco.\n\nO roteador recebe o pacote destinado a `10.40.8.70`. Sua tabela tem `10.40.0.0/16` via A, `10.40.8.64/26` via B e `0.0.0.0/0` via C. A seleção normal escolhe **via B**, porque o prefixo /26 é o mais específico dentre os que casam com o IP de destino. Distância administrativa e métricas não fazem a rota /16 vencer uma rota /26 válida de mesma natureza; critérios de seleção da plataforma entram nas etapas apropriadas após definir as rotas elegíveis."
      },
      {
        "title": "Construindo a solução",
        "body": "## VLSM e sumarização: não inverta a operação\nCIDR descreve prefixos; VLSM permite tamanhos distintos para redes com demandas diferentes. Se um setor precisa de 100 hosts e outro de 20, alocar ambos em /26 seria insuficiente para o primeiro e desperdiçaria espaço no segundo. Um /25 oferece 126 hosts usuais; um /27 oferece 30. Já sumarização agrega redes contíguas em um prefixo maior, mas pode anunciar endereços não atendidos se o agrupamento for feito incorretamente."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Sub-redes, sumarização e escolha da rota",
      "body": "**A questão pergunta:** Qual é o endereço de rede de 172.16.9.130/27?\n\n**Resposta fundamentada:** 172.16.9.128.\n\n**Por que essa é a resposta:** /27 usa blocos de 32 no último octeto: 128–159 contém o endereço 130."
    },
    "pitfalls": [
      "Uma alternativa incorreta seria **30**. O erro é: 30 corresponde ao espaço de /27, não /26.",
      "Não extrapole o enunciado: use os dados e condições específicos de Sub-redes, sumarização e escolha da rota."
    ],
    "review": [
      {
        "ask": "Qual o incremento no último octeto de sub-redes /26?",
        "answer": "64 endereços por sub-rede; 62 hosts usuais na convenção IPv4."
      },
      {
        "ask": "Em encaminhamento IP, o que significa longest-prefix match?",
        "answer": "Dentre as rotas que casam com o destino, escolher a de prefixo mais específico."
      }
    ],
    "extra": ""
  }
];
