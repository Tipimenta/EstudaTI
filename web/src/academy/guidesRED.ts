import type {LessonGuide} from './guidesTypes'
export const guidesRED:LessonGuide[]=[
  {
    "id": 1,
    "code": "RED",
    "title": "Modelo OSI e TCP/IP",
    "objective": "Identificar camadas e funções.",
    "theory": "No modelo OSI, a camada de rede realiza endereçamento lógico e roteamento; a camada de transporte lida com comunicação fim a fim. No modelo TCP/IP, as camadas são agrupadas de outra forma. Entender o propósito dos protocolos é mais útil para concursos do que decorar siglas isoladas.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual camada OSI encaminha pacotes entre redes?",
        "back": "Camada de rede (3)."
      },
      {
        "front": "TCP garante entrega ordenada?",
        "back": "Sim. TCP oferece entrega confiável e ordenada; UDP não garante isso."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 2,
    "code": "RED",
    "title": "IPv4, sub-redes e DNS",
    "objective": "Calcular capacidade e diferenciar DNS/DHCP.",
    "theory": "Uma rede IPv4 /24 possui 256 endereços; em uma sub-rede tradicional, normalmente 254 podem ser atribuídos a hosts. A máscara /24 corresponde a 255.255.255.0. DNS resolve nomes para registros como A e AAAA. DHCP distribui parâmetros de rede a clientes.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Máscara correspondente a /24?",
        "back": "255.255.255.0."
      },
      {
        "front": "Diferença entre DNS e DHCP?",
        "back": "DNS resolve nomes; DHCP distribui configurações de IP."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 3,
    "code": "RED",
    "title": "Redes locais, VPN e firewall",
    "objective": "Explicar segmentação e acesso remoto.",
    "theory": "VLANs segmentam domínios de broadcast em redes Ethernet. VPN estabelece comunicação protegida entre dispositivos ou redes. Firewalls aplicam regras de tráfego; monitoração deve registrar eventos e não substitui análise.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Para que serve uma VLAN?",
        "back": "Segmentar logicamente uma rede local em domínios de broadcast."
      },
      {
        "front": "VPN dispensa autenticação?",
        "back": "Não. A conexão deve utilizar autenticação e controles adequados."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 19,
    "code": "RED",
    "title": "CIDR e cálculo de hosts",
    "objective": "Explicar e aplicar: CIDR e cálculo de hosts.",
    "theory": "O prefixo CIDR informa quantos bits formam a parte de rede de um endereço IPv4. Em redes IPv4 usuais, um /26 tem 64 endereços, dos quais 62 são atribuíveis a hosts; um /27 tem 32, dos quais 30 são atribuíveis. O tamanho do bloco é 2^(32-prefixo).",
    "practical": "Em 192.168.10.70/26, os blocos do último octeto começam em 0, 64, 128 e 192. O endereço de rede é 192.168.10.64 e o broadcast é 192.168.10.127.",
    "warning": "Não confunda quantidade total de endereços com hosts utilizáveis. /31 e /32 têm regras específicas de uso.",
    "recall": [
      {
        "front": "Quantos endereços IPv4 há em uma rede /26?",
        "back": "64. São 32−26=6 bits para endereços, portanto 2⁶=64."
      },
      {
        "front": "Qual é a rede do IP 192.168.10.70/26?",
        "back": "192.168.10.64. Com /26 o bloco no último octeto é 64; 70 pertence ao intervalo 64–127."
      },
      {
        "front": "Qual armadilha evitar em CIDR e cálculo de hosts?",
        "back": "Não confunda quantidade total de endereços com hosts utilizáveis. /31 e /32 têm regras específicas de uso."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 20,
    "code": "RED",
    "title": "VLAN, trunk e 802.1Q",
    "objective": "Explicar e aplicar: VLAN, trunk e 802.1Q.",
    "theory": "VLAN separa domínios de broadcast no nível de enlace. Portas access normalmente pertencem a uma VLAN; portas trunk transportam tráfego de diversas VLANs, geralmente marcado com IEEE 802.1Q. Para comunicação entre VLANs é necessário roteamento.",
    "practical": "Uma rede administrativa na VLAN 10 e uma rede de convidados na VLAN 20 não se comunicam diretamente por simples comutação L2; um equipamento L3 deve intermediar o tráfego conforme regras de acesso.",
    "warning": "VLAN não substitui firewall ou autenticação; sua segurança depende da configuração.",
    "recall": [
      {
        "front": "Qual é o propósito principal de uma VLAN?",
        "back": "Separar logicamente domínios de broadcast. VLANs separam logicamente segmentos L2."
      },
      {
        "front": "Qual padrão é usado para marcar VLANs em quadros Ethernet de uma porta trunk?",
        "back": "IEEE 802.1Q. IEEE 802.1Q define tagging de VLAN em Ethernet."
      },
      {
        "front": "Qual armadilha evitar em VLAN, trunk e 802.1Q?",
        "back": "VLAN não substitui firewall ou autenticação; sua segurança depende da configuração."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 21,
    "code": "RED",
    "title": "TCP: conexão e controle de fluxo",
    "objective": "Explicar e aplicar: TCP: conexão e controle de fluxo.",
    "theory": "TCP é orientado à conexão, confiável e fornece fluxo de bytes ordenado. A abertura clássica utiliza SYN, SYN-ACK e ACK. Números de sequência e confirmações permitem detecção de perdas e retransmissão; janela controla fluxo.",
    "practical": "Transferência de arquivo costuma exigir que o receptor reconstrua a sequência correta mesmo quando segmentos se perdem ou chegam fora de ordem.",
    "warning": "TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas.",
    "recall": [
      {
        "front": "Qual sequência representa o handshake TCP clássico?",
        "back": "SYN, SYN-ACK, ACK. O estabelecimento clássico usa três mensagens."
      },
      {
        "front": "Qual característica TCP não oferece sozinho?",
        "back": "Criptografia de ponta a ponta. A confidencialidade normalmente exige TLS ou outra proteção."
      },
      {
        "front": "Qual armadilha evitar em TCP: conexão e controle de fluxo?",
        "back": "TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 22,
    "code": "RED",
    "title": "DNS: registros e resolução",
    "objective": "Explicar e aplicar: DNS: registros e resolução.",
    "theory": "DNS traduz nomes para recursos. A aponta para IPv4, AAAA para IPv6, MX indica servidor de recebimento de e-mail e CNAME aponta nome alternativo. TTL influencia o tempo de cache; DNS recursivo consulta servidores para responder ao cliente.",
    "practical": "Se um hostname troca de IP, clientes podem continuar usando resposta anterior até expirar o TTL em cache.",
    "warning": "Um registro CNAME não significa redirecionamento HTTP; são operações diferentes.",
    "recall": [
      {
        "front": "Qual registro DNS associa um nome a endereço IPv6?",
        "back": "AAAA. AAAA representa endereço IPv6."
      },
      {
        "front": "O TTL de um registro DNS controla principalmente:",
        "back": "Prazo de retenção em cache. TTL DNS indica por quanto tempo a resposta pode ser armazenada em cache."
      },
      {
        "front": "Qual armadilha evitar em DNS: registros e resolução?",
        "back": "Um registro CNAME não significa redirecionamento HTTP; são operações diferentes."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 23,
    "code": "RED",
    "title": "DHCP e DORA",
    "objective": "Explicar e aplicar: DHCP e DORA.",
    "theory": "No cenário clássico DHCPv4, o cliente inicia a descoberta por DHCPDISCOVER, recebe DHCPOFFER, solicita por DHCPREQUEST e conclui com DHCPACK. O servidor pode fornecer IP, máscara, gateway e DNS, com tempo de concessão.",
    "practical": "Se DHCP não responde, o cliente pode ficar sem configuração válida; verifique escopo, serviço, alcance e relay.",
    "warning": "O gateway padrão não é o servidor DNS; podem ser máquinas diferentes.",
    "recall": [
      {
        "front": "Qual é a ordem típica de mensagens do DHCPv4?",
        "back": "Discover, Offer, Request, ACK. DORA resume a negociação clássica."
      },
      {
        "front": "Qual informação é normalmente distribuída pelo DHCP?",
        "back": "Gateway padrão do cliente. DHCP fornece parâmetros de configuração de rede, como gateway."
      },
      {
        "front": "Qual armadilha evitar em DHCP e DORA?",
        "back": "O gateway padrão não é o servidor DNS; podem ser máquinas diferentes."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 24,
    "code": "RED",
    "title": "IPv6 e SLAAC",
    "objective": "Explicar e aplicar: IPv6 e SLAAC.",
    "theory": "IPv6 usa endereços de 128 bits e elimina o broadcast tradicional. SLAAC permite configuração por anúncios de roteador (RA); Neighbor Discovery utiliza ICMPv6. Há endereços link-local (fe80::/10) e globais unicast.",
    "practical": "Um host pode ter simultaneamente endereço link-local e global; conectividade local não prova que há roteamento para a internet.",
    "warning": "IPv6 não garante segurança automaticamente e não dispensa regras de firewall.",
    "recall": [
      {
        "front": "Qual é o tamanho de um endereço IPv6?",
        "back": "128 bits. IPv6 tem 128 bits."
      },
      {
        "front": "Qual mecanismo fornece anúncios de roteador usados no SLAAC?",
        "back": "ICMPv6 Neighbor Discovery. RAs fazem parte do Neighbor Discovery em ICMPv6."
      },
      {
        "front": "Qual armadilha evitar em IPv6 e SLAAC?",
        "back": "IPv6 não garante segurança automaticamente e não dispensa regras de firewall."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 25,
    "code": "RED",
    "title": "NAT e redes privadas",
    "objective": "Explicar e aplicar: NAT e redes privadas.",
    "theory": "NAT traduz endereços entre redes. PAT/NAPT permite multiplexar conexões internas por portas em um endereço público. RFC 1918 define blocos IPv4 privados, incluindo 10/8, 172.16/12 e 192.168/16.",
    "practical": "Vários computadores de 192.168.1.0/24 podem acessar a internet por uma única interface pública usando tradução de porta.",
    "warning": "NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall.",
    "recall": [
      {
        "front": "Qual faixa é privada segundo RFC 1918?",
        "back": "172.16.0.0/12. O bloco privado inclui 172.16.0.0 até 172.31.255.255."
      },
      {
        "front": "Qual tecnologia diferencia conexões internas usando números de porta em um IP público?",
        "back": "PAT/NAPT. PAT ou NAPT traduz também portas, multiplexando fluxos."
      },
      {
        "front": "Qual armadilha evitar em NAT e redes privadas?",
        "back": "NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 26,
    "code": "RED",
    "title": "HTTP, HTTPS e códigos de resposta",
    "objective": "Explicar e aplicar: HTTP, HTTPS e códigos de resposta.",
    "theory": "HTTP é protocolo de aplicação; HTTPS utiliza HTTP protegido por TLS. 200 indica sucesso, 301 mudança permanente, 400 requisição inválida, 401 falta de autenticação, 403 acesso negado e 404 recurso não encontrado.",
    "practical": "Se uma API responde 401 a usuário sem credencial e 403 a usuário autenticado sem permissão, a diferença é autenticação versus autorização.",
    "warning": "HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação.",
    "recall": [
      {
        "front": "Qual código HTTP indica normalmente ausência de autenticação válida?",
        "back": "401. 401 Unauthorized se refere a autenticação; 403 trata de recusa de acesso."
      },
      {
        "front": "O HTTPS emprega qual mecanismo para proteger a comunicação?",
        "back": "TLS. TLS fornece proteção criptográfica ao transporte utilizado pelo HTTP."
      },
      {
        "front": "Qual armadilha evitar em HTTP, HTTPS e códigos de resposta?",
        "back": "HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 91,
    "code": "RED",
    "title": "OSI, TCP/IP e encapsulamento",
    "objective": "Explicar fluxo de ponta a ponta, camadas, unidades de dados e identificar a camada de uma falha.",
    "theory": "## Aula detalhada — entenda o mecanismo\nO **OSI** é um modelo de referência em sete camadas: física, enlace, rede, transporte, sessão, apresentação e aplicação. O modelo **TCP/IP** costuma ser ensinado em quatro camadas: acesso à rede, internet, transporte e aplicação; alguns livros o apresentam em cinco, separando física e enlace. Isso é uma simplificação de arquitetura, não uma tabela de equivalências perfeitas.\n\nAo transmitir uma requisição HTTP, a aplicação produz dados; o transporte (TCP, por exemplo) entrega um fluxo de bytes com controle de sequência e retransmissão; o IP identifica endereços e encaminha datagramas entre redes; o enlace entrega quadros no segmento local. No destino, ocorre o desencapsulamento. **Segmento TCP, datagrama IP e quadro Ethernet** não são sinônimos: cada unidade carrega cabeçalhos específicos.\n\n**Switch Ethernet** decide encaminhamento com base em endereços MAC (camada de enlace); **roteador IP** escolhe próximo salto com base em destinos IP e tabela de rotas. Um equipamento moderno pode executar funções de mais de uma camada, portanto evite afirmar que todo switch é exclusivamente camada 2. Endereço IP é lógico e mantém significado entre enlaces; MAC é usado para alcançar o próximo nó no enlace Ethernet.\n\n## Exemplo resolvido passo a passo\n1. O usuário abre `https://intranet.exemplo/`. O navegador resolve o nome via DNS e estabelece conectividade para o IP resultante.\n2. Numa conexão TCP, o handshake estabelece estado de comunicação; se houver TLS, ocorre negociação criptográfica em seguida.\n3. O pedido HTTP segue no fluxo TCP. IP cuida do roteamento e Ethernet do próximo salto. Em cada roteador, o quadro de enlace é trocado; endereços IP de origem/destino do pacote normalmente permanecem os mesmos, desconsiderando NAT.\n4. Se `ping` ao gateway funciona, mas o site pelo nome falha, investigue resolução DNS e HTTP/TLS antes de concluir que a placa de rede está quebrada. Um `ping` não garante que o servidor web responderá.\n\n## Erros clássicos nas bancas\n**Pegadinha 1:** “TCP corresponde ao nível de rede” está errado; TCP é transporte. **Pegadinha 2:** a camada de sessão do OSI não é necessariamente implementada por um protocolo isolado da pilha TCP/IP. **Pegadinha 3:** DNS é protocolo de aplicação e pode utilizar UDP ou TCP, conforme a operação e a implementação. **Pegadinha 4:** nem todo pacote IP contém TCP; UDP e ICMP são outros casos.\n\n## Pratique sem consultar\nDesenhe em quatro linhas o caminho “HTTP → TCP → IP → Ethernet”. Em qual camada uma tabela de roteamento atua? Em qual um endereço MAC é utilizado? Explique por que um quadro muda ao atravessar um roteador. Compare as camadas do OSI sem memorizar correspondências rígidas.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nRFC Editor — especificação TCP (RFC 9293): https://www.rfc-editor.org/rfc/rfc9293.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Quais informações são trocadas por um roteador Ethernet durante o encaminhamento IP?",
        "back": "O quadro do enlace é refeito para o próximo salto; o datagrama IP continua sendo encaminhado (com ajustes como TTL)."
      },
      {
        "front": "Como diferenciar switch L2 e roteador?",
        "back": "Switch L2 encaminha quadros por MAC; roteador encaminha datagramas por prefixos IP e tabela de rotas."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 92,
    "code": "RED",
    "title": "Subnetting IPv4, CIDR e VLSM",
    "objective": "Calcular rede, broadcast e hosts utilizáveis sem depender de calculadora.",
    "theory": "## Aula detalhada — entenda o mecanismo\nIPv4 possui 32 bits; um prefixo **/n** significa que os primeiros n bits identificam a rede. O restante, 32−n bits, identifica endereços dentro do bloco. Uma máscara /26 equivale a `255.255.255.192`: são 26 bits 1 seguidos por seis bits 0. O tamanho do bloco é **2^(32−n)**. Em redes IPv4 convencionais com endereço de rede e broadcast, os endereços de hosts utilizáveis são **2^(32−n) − 2**; exceções importantes: enlaces /31 ponto a ponto e /32 host.\n\nPara descobrir a rede, aplique AND binário entre o IP e a máscara. O broadcast preenche com 1 os bits de host. Para calcular rapidamente em um octeto de máscara, use o incremento `256 − valor_da_máscara` (no octeto onde o prefixo se divide). Uma /27 tem incremento 32; redes terminam em .0, .32, .64, .96 etc. Em **VLSM** você distribui prefixos de tamanhos diferentes, geralmente começando pela maior necessidade de endereços. CIDR abandona classes rígidas e representa prefixos contíguos.\n\n## Exemplo resolvido passo a passo\nDado `192.168.30.150/27`: máscara `255.255.255.224`, incremento 256−224=32. O octeto 150 cai no intervalo 128–159.\n- Endereço de rede: **192.168.30.128**.\n- Broadcast: **192.168.30.159**.\n- Primeiro host convencional: **192.168.30.129**. Último host convencional: **192.168.30.158**.\n- Total do bloco: 32 endereços; hosts convencionais: 30.\n\nVLSM: uma organização precisa de LANs com 50 e 12 hosts. Para 50 hosts, /26 comporta 62; para 12, /28 comporta 14. Reserve blocos não sobrepostos e confira alinhamento. Para prova, primeiro identifique a quantidade de bits de host necessária, depois calcule incremento e limites.\n\n## Erros clássicos nas bancas\n**Pegadinha 1:** /27 não tem 27 hosts, mas prefixo de 27 bits. **Pegadinha 2:** broadcast não é o gateway obrigatoriamente; gateway é endereço configurado na rede. **Pegadinha 3:** máscara e host não dependem da classe histórica do IP se o prefixo é explicitamente informado. **Pegadinha 4:** não subtraia dois hosts de /31 nas hipóteses de enlaces ponto a ponto previstas no RFC 3021.\n\n## Pratique sem consultar\nResolva `10.10.4.77/28`: escreva máscara, rede, broadcast, primeiro e último host, total de endereços e utilizáveis. Depois prove o resultado convertendo o último octeto do IP e da máscara para binário. Tente ainda dividir uma /24 em quatro /26 sem sobreposição.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nRFC 4632 — CIDR e agregação de rotas: https://www.rfc-editor.org/rfc/rfc4632.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Como calcular o incremento no octeto onde a máscara IPv4 muda?",
        "back": "Incremento = 256 menos o valor do octeto da máscara; localize o bloco que contém o IP."
      },
      {
        "front": "Rede e broadcast de 192.168.30.150/27?",
        "back": "Rede .128 e broadcast .159; a faixa convencional de hosts vai de .129 a .158."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 93,
    "code": "RED",
    "title": "DNS, DHCP, TCP/UDP e diagnóstico",
    "objective": "Identificar falhas de serviço por sintomas e selecionar comandos de diagnóstico.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**DNS** traduz nomes para registros e não é um mecanismo de autenticação por si só. Registro A aponta para IPv4, AAAA para IPv6, CNAME cria alias e MX auxilia entrega de e-mail. A resolução pode envolver caches locais, recursão e servidores autoritativos. **DHCP** atribui parâmetros de rede: IP, máscara, gateway, DNS e tempo de concessão; no IPv4, a sequência DORA é Discover, Offer, Request, Acknowledge.\n\n**TCP** é orientado à conexão e oferece fluxo ordenado e confiável à aplicação; usa sequenciamento, ACKs, controle de fluxo e congestionamento. **UDP** é orientado a datagramas, sem garantia de entrega ou ordenação. Isso não significa que qualquer aplicação UDP seja “não confiável”: ela pode implementar seus próprios mecanismos de confiabilidade. A porta identifica processo/serviço dentro do contexto do protocolo, não substitui endereço IP.\n\nFerramentas: `ipconfig /all` e `Get-NetIPConfiguration` (Windows), `ip addr`, `ip route` (Linux), `nslookup` ou `dig` (DNS), `ping` (ICMP, quando permitido), `tracert`/`traceroute`, `Test-NetConnection host -Port 443` e `ss -lntup` para sockets. Use diagnóstico não invasivo e respeite autorização de rede.\n\n## Exemplo resolvido passo a passo\nUm computador recebe `169.254.x.x`, não acessa aplicações de rede e o `ipconfig /all` não mostra concessão válida. Hipótese inicial: falha de DHCP; confirme conectividade física, VLAN, relay DHCP e escopo.\n\nOutro computador resolve `portal.exemplo` para o IP esperado, consegue conectar à porta 443, mas o navegador acusa erro de certificado. A cadeia evoluiu de DNS → TCP → TLS: agora investigue hostname do certificado, validade, confiança da CA, data/hora e configuração TLS. Não culpe automaticamente o DNS por qualquer falha no navegador.\n\nSe o nome falha mas um IP funciona, compare DNS configurado, caches, resolução e registros. Em redes corporativas, consultas de nomes internos e públicos podem seguir resolvedores distintos.\n\n## Erros clássicos nas bancas\n**Pegadinha:** `ping` indisponível não demonstra automaticamente que um servidor está fora do ar; ICMP pode ser bloqueado. `nslookup` identifica DNS, mas não valida disponibilidade HTTP. TCP e UDP reutilizam números de porta em espaços distintos. DNS frequentemente usa UDP/53, porém pode usar TCP/53; DNS sobre TLS e HTTPS são alternativas com outras portas. DHCPv4 não funciona por “IP fixo obrigatório” do cliente antes de receber concessão.\n\n## Pratique sem consultar\nMonte um roteiro com cinco testes para o cenário “a rede funciona por IP, mas não pelo nome”. Para cada teste, diga o que um resultado positivo ou negativo significa. Em seguida, explique o que muda no diagnóstico se a conexão TCP à porta 443 funciona, mas a página não abre.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nRFC Editor — especificação TCP (RFC 9293): https://www.rfc-editor.org/rfc/rfc9293.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é a sequência DHCPv4 DORA?",
        "back": "Discover → Offer → Request → Acknowledge."
      },
      {
        "front": "Por que ping bem-sucedido não garante que um site HTTPS funcionará?",
        "back": "ICMP testa uma forma de conectividade, mas não comprova TCP/443, TLS nem funcionamento HTTP."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 118,
    "code": "RED",
    "title": "ARP, tabela MAC e encaminhamento",
    "objective": "Compreender e aplicar arp, tabela mac e encaminhamento em provas.",
    "theory": "ARP resolve o endereço MAC de um vizinho IPv4 na rede local, enquanto switches aprendem associações MAC-porta pelo endereço de origem dos quadros.\n\nSe o destino IPv4 está na mesma sub-rede, a estação consulta o MAC do destino; se está fora, obtém o MAC do gateway padrão. O roteador troca o encapsulamento de enlace ao encaminhar para a próxima rede. Switch não roteia só porque conhece MAC.",
    "practical": "Um computador 192.168.1.10/24 deseja falar com 192.168.2.10. O ARP será direcionado ao gateway da rede 192.168.1.0/24, não diretamente ao IP remoto.",
    "warning": "Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS.",
    "recall": [
      {
        "front": "Qual é o conceito central de ARP, tabela MAC e encaminhamento?",
        "back": "ARP resolve o endereço MAC de um vizinho IPv4 na rede local, enquanto switches aprendem associações MAC-porta pelo endereço de origem dos quadros."
      },
      {
        "front": "Qual erro de prova evitar em ARP, tabela MAC e encaminhamento?",
        "back": "Não confunda endereço MAC destino do quadro com IP destino do pacote, nem ARP com DNS."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 119,
    "code": "RED",
    "title": "TCP: congestionamento vs fluxo",
    "objective": "Compreender e aplicar tcp: congestionamento vs fluxo em provas.",
    "theory": "Controle de fluxo adapta o envio à capacidade do receptor; controle de congestionamento reage à capacidade e ao estado do caminho de rede.\n\nA janela anunciada pelo receptor (rwnd) sinaliza espaço disponível no buffer. A janela de congestionamento (cwnd) limita a taxa conforme o comportamento da rede. A quantidade efetiva em trânsito fica limitada pelas duas.",
    "practical": "Se o receptor fica lento, pode reduzir a janela anunciada mesmo sem perdas. Se o caminho sofre perdas, o emissor pode reduzir cwnd mesmo com receptor rápido.",
    "warning": "Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo.",
    "recall": [
      {
        "front": "Qual é o conceito central de TCP: congestionamento vs fluxo?",
        "back": "Controle de fluxo adapta o envio à capacidade do receptor; controle de congestionamento reage à capacidade e ao estado do caminho de rede."
      },
      {
        "front": "Qual erro de prova evitar em TCP: congestionamento vs fluxo?",
        "back": "Não chame retransmissão de criptografia ou de autenticação. TCP resolve entrega, não sigilo."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 120,
    "code": "RED",
    "title": "Roteamento estático e dinâmico",
    "objective": "Compreender e aplicar roteamento estático e dinâmico em provas.",
    "theory": "Roteadores decidem o próximo salto usando tabela de roteamento; a rota de maior prefixo específico normalmente prevalece.\n\nUma rota 10.20.5.0/24 é mais específica que 10.20.0.0/16 e 0.0.0.0/0. Protocolos como OSPF trocam informações de roteamento, ao passo que rotas estáticas são configuradas manualmente. Métricas importam quando rotas concorrentes têm o mesmo prefixo e critérios administrativos aplicáveis.",
    "practical": "Se o destino é 10.20.5.12, um roteador com rotas /16 e /24 escolhe a /24, respeitando as regras de seleção.",
    "warning": "Não confunda rota padrão com máscara aplicada ao IP local.",
    "recall": [
      {
        "front": "Qual é o conceito central de Roteamento estático e dinâmico?",
        "back": "Roteadores decidem o próximo salto usando tabela de roteamento; a rota de maior prefixo específico normalmente prevalece."
      },
      {
        "front": "Qual erro de prova evitar em Roteamento estático e dinâmico?",
        "back": "Não confunda rota padrão com máscara aplicada ao IP local."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 121,
    "code": "RED",
    "title": "DNS recursivo, autoritativo e cache",
    "objective": "Compreender e aplicar dns recursivo, autoritativo e cache em provas.",
    "theory": "Resolver recursivo atende consultas do cliente e busca respostas; servidores autoritativos mantêm dados da zona correspondente.\n\nUm servidor recursivo pode consultar raiz, TLD e autoridade para obter a resposta. Caches reduzem consultas e latência, mas mudanças de registros não aparecem imediatamente para quem armazena respostas ainda válidas. DNSSEC usa assinaturas para autenticar dados DNS, sem fornecer criptografia geral de tráfego web.",
    "practical": "Se um registro muda de 192.0.2.1 para 192.0.2.2, clientes podem consultar valor anterior até o TTL expirar no cache.",
    "warning": "Não confunda registro A com MX; nem DNSSEC com HTTPS.",
    "recall": [
      {
        "front": "Qual é o conceito central de DNS recursivo, autoritativo e cache?",
        "back": "Resolver recursivo atende consultas do cliente e busca respostas; servidores autoritativos mantêm dados da zona correspondente."
      },
      {
        "front": "Qual erro de prova evitar em DNS recursivo, autoritativo e cache?",
        "back": "Não confunda registro A com MX; nem DNSSEC com HTTPS."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 152,
    "code": "RED",
    "title": "Diagnóstico de rede sem confundir DNS, rota e firewall",
    "objective": "Dado um incidente de conectividade, formular hipóteses por camada e escolher testes que distingam suas causas.",
    "theory": "# Caso de prova — um serviço abre por IP, mas não por nome\nUm usuário da rede 192.168.30.0/24 relata que consegue acessar um serviço por `https://192.0.2.20`, mas não por `https://intranet.exemplo`. Um colega atribui o problema ao roteador. Antes de trocar equipamento, separe **o que o sintoma demonstra** daquilo que ainda não se sabe. Acesso por IP indica algum caminho de rede funcional naquele instante, mas não demonstra resolução DNS correta. Mesmo esse teste tem limites: o certificado TLS pode não corresponder ao IP; o servidor pode hospedar múltiplos sites que dependem do nome no cabeçalho Host/SNI.\n\n## Método de investigação por hipóteses\n1. **Registrar escopo:** a falha ocorre com todos os computadores, um único usuário ou apenas uma VLAN? Qual nome exato, URL, horário e mensagem de erro?\n2. **Verificar configuração local:** IP, máscara, gateway e resolvers DNS. O mesmo IP com máscara diferente pode alterar a decisão de encaminhar diretamente ou via gateway.\n3. **Testar resolução:** consultar o DNS configurado e registrar endereço retornado e TTL; distinguir `NXDOMAIN`, timeout e resposta incorreta. Um cache local pode explicar divergências entre clientes.\n4. **Testar conexão de transporte:** examinar se há rota e conectividade TCP para a porta real do serviço. `ping` falhar não prova que TCP/443 está bloqueado: ICMP pode estar filtrado.\n5. **Conferir aplicação:** proxy, certificado, autenticação, SNI, virtual host e redirecionamentos. Se o nome resolve para IP correto, não encerre o diagnóstico somente porque o DNS respondeu.\n\n## Exemplo resolvido\nO DNS da estação responde `192.0.2.21`, enquanto o registro correto no servidor autoritativo é `192.0.2.20`. Outro computador usa um DNS distinto e abre a intranet. A ação fundamentada é identificar a origem do registro incorreto, corrigir a autoridade ou o resolver, verificar TTL e testar novamente. Reiniciar o roteador não corrige uma zona autoritativa errada. Se a consulta responde corretamente, mas a conexão falha, analise roteamento, ACL/firewall e serviço de destino, nesta ordem de evidências.\n\n## Como a banca tenta confundir\n- **DNS x DHCP:** DHCP pode informar o endereço do resolver, mas não substitui a resolução do nome.\n- **Ping x disponibilidade:** ICMP é teste de alcance/controle, não verificação completa de uma aplicação HTTPS.\n- **MAC x IP:** encaminhamento entre redes usa informação da camada de rede; o quadro de enlace muda ao atravessar roteadores.\n- **Sintoma x causa:** um único teste não identifica automaticamente qual dispositivo falhou.\n\n## Recuperação ativa\nSem consultar a solução, produza uma tabela de três colunas: hipótese, evidência esperada e teste. Inclua resolução de nomes, rota, TCP/443 e certificado TLS. A correção deve premiar a capacidade de **descartar hipóteses** — não simplesmente listar comandos.\n\n## Critério para avançar\nVocê deve justificar por que acessar por IP não prova que a aplicação por nome funcionará e selecionar um teste que diferencie DNS incorreto de bloqueio TCP. Depois resolva as questões abaixo sem voltar à teoria.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Um hostname falha, mas o IP responde: o que verificar antes de culpar roteamento?",
        "back": "Resposta DNS, endereço obtido, TTL e dependência de nome em TLS/SNI."
      },
      {
        "front": "Por que ping negativo não prova indisponibilidade de HTTPS?",
        "back": "Porque ICMP pode ser filtrado enquanto o fluxo TCP/443 continua permitido."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 153,
    "code": "RED",
    "title": "Sub-redes, sumarização e escolha da rota",
    "objective": "Calcular faixa válida de endereços e aplicar longest-prefix match a uma decisão de roteamento.",
    "theory": "# Caso de prova — dividir uma rede e encaminhar um pacote\nUma secretaria recebeu o bloco `10.40.8.0/24` e precisa criar **quatro sub-redes de mesmo tamanho** para separar departamentos. Você não deve escolher um endereço ao acaso: primeiro identifique quantos bits de host serão emprestados. Quatro sub-redes equivalem a `2²`, então o novo prefixo é `/26`. A máscara `/26` corresponde a `255.255.255.192`: há 64 endereços por bloco, dos quais 62 são normalmente utilizáveis como hosts em cada sub-rede IPv4 convencional.\n\n## Resolução trabalhada\nOs quatro blocos são: `10.40.8.0/26` (hosts .1 a .62; broadcast .63); `10.40.8.64/26` (hosts .65 a .126; broadcast .127); `10.40.8.128/26` (hosts .129 a .190; broadcast .191); `10.40.8.192/26` (hosts .193 a .254; broadcast .255). O salto de 64 resulta da combinação de 6 bits de host. A presença de `.64` em um endereço não basta, por si só, para classificá-lo como host: em `/26`, `.64` é endereço da rede do segundo bloco.\n\nO roteador recebe o pacote destinado a `10.40.8.70`. Sua tabela tem `10.40.0.0/16` via A, `10.40.8.64/26` via B e `0.0.0.0/0` via C. A seleção normal escolhe **via B**, porque o prefixo /26 é o mais específico dentre os que casam com o IP de destino. Distância administrativa e métricas não fazem a rota /16 vencer uma rota /26 válida de mesma natureza; critérios de seleção da plataforma entram nas etapas apropriadas após definir as rotas elegíveis.\n\n## VLSM e sumarização: não inverta a operação\nCIDR descreve prefixos; VLSM permite tamanhos distintos para redes com demandas diferentes. Se um setor precisa de 100 hosts e outro de 20, alocar ambos em /26 seria insuficiente para o primeiro e desperdiçaria espaço no segundo. Um /25 oferece 126 hosts usuais; um /27 oferece 30. Já sumarização agrega redes contíguas em um prefixo maior, mas pode anunciar endereços não atendidos se o agrupamento for feito incorretamente.\n\n## Pegadinhas que valem pontos\n- `2^(32-prefixo)` dá total de endereços, não automaticamente hosts utilizáveis; `/31` e `/32` têm usos específicos que exigem cautela com a regra de subtrair 2.\n- Máscara define **fronteira da sub-rede**; gateway e DNS não são calculados automaticamente por ela.\n- Prefixo maior numericamente (`/26`) identifica bloco menor que `/24`.\n- **Rota mais específica** não significa menor número de saltos; são critérios diferentes.\n\n## Treino sem consulta\nCalcule rede, primeiro e último host e broadcast de `172.16.9.130/27`. Depois avalie se `172.16.9.127` pertence ao mesmo bloco. Explique em voz alta o raciocínio binário; se conseguir apenas decorando saltos, repita usando 8 bits do último octeto.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual o incremento no último octeto de sub-redes /26?",
        "back": "64 endereços por sub-rede; 62 hosts usuais na convenção IPv4."
      },
      {
        "front": "Em encaminhamento IP, o que significa longest-prefix match?",
        "back": "Dentre as rotas que casam com o destino, escolher a de prefixo mais específico."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
