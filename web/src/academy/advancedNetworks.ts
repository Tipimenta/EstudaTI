import type {PedagogicalLesson} from './intro1'
export const advancedNetworks:PedagogicalLesson[]=[
  {
    "id": 91,
    "title": "Como uma requisição atravessa a rede: OSI, TCP/IP e encapsulamento",
    "goal": "Acompanhar uma comunicação do navegador até o servidor, entender o papel de cada camada e diagnosticar em qual parte a falha ocorreu.",
    "steps": [
      {
        "title": "1. O problema que deu origem aos modelos de rede",
        "body": "Imagine que você digita o endereço do sistema da clínica, faz login e abre um exame. Parece uma única ação, mas há várias tarefas invisíveis: descobrir o endereço do servidor, estabelecer comunicação, transportar dados e apresentar a resposta na tela. Se cada programa tivesse de lidar diretamente com cabos, placas de rede e rotas, seria muito mais difícil criar e manter aplicações.\n\nOs **modelos em camadas** organizam essas responsabilidades. Uma camada usa serviços da camada inferior e oferece serviços à superior. Essa separação ajuda no desenvolvimento e, especialmente, no diagnóstico: se a estação está sem sinal de rede, o problema não é o usuário digitar a senha errada; se a API responde com um código HTTP, alguma comunicação já aconteceu. Esse raciocínio é mais útil para concursos do que começar decorando uma tabela."
      },
      {
        "title": "2. Entendendo o OSI a partir da viagem dos dados",
        "body": "O modelo **OSI** divide a comunicação em sete camadas conceituais. A **camada 1, Física**, lida com a transmissão de sinais: cabo desconectado ou ausência de sinal são exemplos. A **camada 2, Enlace**, organiza a comunicação no segmento local, como os quadros Ethernet identificados por endereços MAC. A **camada 3, Rede**, cuida de endereçamento lógico e encaminhamento entre redes, como faz o IP.\n\nA **camada 4, Transporte**, permite comunicação entre processos, utilizando portas. Com TCP, há mecanismos para entrega ordenada e confiável; com UDP, a aplicação recebe serviço mais simples de datagramas. As camadas **5, Sessão**, **6, Apresentação**, e **7, Aplicação**, no modelo OSI, tratam de funções de controle de diálogo, representação de dados e serviços às aplicações. Elas são úteis como referência, mas a pilha Internet real não implementa necessariamente cada uma como protocolo separado."
      },
      {
        "title": "3. Por que TCP/IP não é simplesmente outro nome para OSI",
        "body": "O conjunto **TCP/IP** descreve protocolos efetivamente usados na Internet. Uma apresentação didática comum reúne quatro camadas: **acesso à rede**, **Internet**, **transporte** e **aplicação**. O Ethernet fica no acesso; IPv4 e IPv6 na Internet; TCP e UDP no transporte; HTTP e DNS na aplicação. Alguns livros separam a física do enlace, mostrando cinco camadas.\n\nA principal diferença é que OSI serve como **modelo conceitual de sete camadas**, enquanto TCP/IP descreve uma arquitetura de protocolos operacionais. Não crie equivalências perfeitas entre camadas 5, 6 e 7 do OSI e protocolos modernos: funções como apresentação, segurança e sessão podem aparecer integradas em protocolos da camada de aplicação. Em uma questão, identifique **qual modelo** o enunciado utiliza antes de numerar camadas."
      },
      {
        "title": "4. Encapsulamento: os cabeçalhos que permitem a entrega",
        "body": "Suponha que o navegador tenha uma mensagem HTTP para enviar. Essa mensagem é entregue ao protocolo de transporte. Em uma conexão TCP típica, o TCP acrescenta cabeçalho com **porta de origem**, **porta de destino**, **números de sequência** e outros campos. O resultado é chamado **segmento TCP**. O IP, por sua vez, adiciona endereços de origem e destino, formando um **datagrama/pacote IP**. Para transmitir pelo enlace Ethernet, surge um quadro que inclui os endereços MAC de origem e do próximo salto.\n\nA sequência é: **mensagem de aplicação → segmento TCP → datagrama IP → quadro Ethernet → sinais no meio físico**. No receptor, ocorre o **desencapsulamento**: cada camada examina os campos que lhe pertencem e entrega o conteúdo à próxima. Em uma comunicação UDP, a unidade de transporte é um datagrama UDP, não um segmento TCP. Esse detalhe importa porque a banca costuma trocar nomes de unidades de dados."
      },
      {
        "title": "5. Por que MAC e IP apontam para destinos diferentes",
        "body": "Imagine a estação **192.168.1.50/24** tentando alcançar **192.168.30.20**. A máscara /24 informa que a primeira rede abrange 192.168.1.0 a 192.168.1.255, enquanto o servidor está em outra sub-rede. Logo, a estação não deve tentar entregar diretamente um quadro Ethernet ao MAC do servidor remoto: ela precisa de um **próximo salto**, normalmente o gateway.\n\nO endereço **IP de destino** do pacote continua sendo 192.168.30.20. Já o **MAC de destino do primeiro quadro** é o do gateway local, obtido por ARP quando necessário. O roteador recebe, consulta a tabela de roteamento e prepara outro quadro para a interface de saída. Em uma rota com vários roteadores, os quadros mudam a cada enlace. **IP e MAC têm funções diferentes**. Se houver NAT, alguns endereços ou portas podem ser traduzidos, conforme as regras existentes, portanto evite a generalização 'o IP nunca muda'."
      },
      {
        "title": "6. Transporte: TCP, UDP e o caminho até a aplicação",
        "body": "O TCP estabelece normalmente uma conexão usando **SYN → SYN+ACK → ACK**. Depois, números de sequência, confirmações, janelas e retransmissões ajudam a fornecer um fluxo confiável e ordenado de bytes. O **UDP** não fornece essas garantias diretamente, embora uma aplicação construída sobre UDP possa acrescentar seus próprios mecanismos. O navegador e o servidor usam portas para identificar qual serviço receberá os dados.\n\nUm ponto importante: **HTTP/1.1 e HTTP/2 frequentemente usam TCP**, mas **HTTP/3 usa QUIC sobre UDP**. Por isso, não é correto afirmar que 'todo site sempre usa TCP'. O protocolo de aplicação continua HTTP, mas a arquitetura de transporte mudou. Ao estudar, aprenda a responsabilidade de cada componente e suas exceções relevantes; decorar uma única associação absoluta gera erros em concursos."
      },
      {
        "title": "7. Diagnóstico de rede é uma investigação, não uma lista de comandos",
        "body": "Volte ao usuário que não consegue abrir o sistema. Primeiro, descubra **até onde a comunicação conseguiu chegar**. Se não há link ou Wi-Fi, investigue meio físico/enlace. Se a máquina não tem endereço coerente, verifique IP, máscara e DHCP. Se o IP funciona, mas o nome não, investigue DNS. Se o nome resolve, mas a conexão na porta 443 falha, investigue rota, filtro e serviço escutando. Se TCP conecta e surge HTTP 503, investigue disponibilidade da aplicação e do backend.\n\nNo Windows, `ipconfig /all` mostra configurações; `Test-NetConnection servidor -Port 443` ajuda a testar TCP. Em Linux, `ip addr` e `ip route` apresentam endereço e rotas. Para DNS, `nslookup` e `dig` podem consultar resolução. O `ping` testa **respostas ICMP**, não prova que HTTPS esteja funcional. Cada comando responde uma pergunta concreta; nenhum substitui análise de todo o caminho."
      }
    ],
    "worked": {
      "title": "Um sistema retorna HTTP 503: resolvendo o caso sem palpites",
      "body": "**Cenário.** Uma recepcionista abre `https://sistema.exemplo` e vê erro 503. A equipe suspeita de problema de internet, mas precisa demonstrar onde está a falha.\n\n**Passo 1 — Enlace e endereçamento.** Confirme se há conexão, IP, máscara e gateway coerentes. Sem isso, não há motivo para investigar a senha do aplicativo.\n\n**Passo 2 — Resolução.** Consulte `nslookup sistema.exemplo`. Se resolver um IP, o DNS respondeu à consulta testada. Isso não prova toda a saúde do DNS nem da aplicação, mas elimina algumas hipóteses.\n\n**Passo 3 — Transporte.** Teste TCP na porta 443 quando o serviço é HTTPS por TCP. Se conecta, a porta não está completamente inacessível naquele caminho. Também não é prova de autenticação ou sucesso da API.\n\n**Passo 4 — Aplicação.** O navegador recebe **HTTP 503**, resposta de um servidor/intermediário HTTP informando indisponibilidade do serviço. É razoável verificar logs do proxy, da API e dependências, como o banco de dados. Na nossa própria arquitetura, um backend que ainda inicializa o banco pode devolver 503 enquanto o processo está ativo.\n\n**Conclusão.** O primeiro diagnóstico não deve ser 'trocar o cabo'. A resposta HTTP demonstra comunicação suficiente para obter uma mensagem do serviço. A investigação precisa seguir a evidência, não uma sequência aleatória de reinicializações."
    },
    "pitfalls": [
      "Uma falha na aplicação não é prova de falha física. Resposta HTTP é evidência de que parte da pilha funcionou.",
      "O MAC do primeiro quadro para outra rede costuma ser o MAC do gateway, não o do servidor remoto.",
      "OSI tem sete camadas conceituais; a pilha TCP/IP costuma ser apresentada em quatro ou cinco, conforme o livro.",
      "TCP fornece confiabilidade e ordenação no transporte, mas não implementa cifragem sozinho; HTTP/3 não usa TCP."
    ],
    "review": [
      {
        "ask": "Por que uma estação envia um quadro para o MAC do gateway quando acessa outra sub-rede?",
        "answer": "Porque o pacote IP precisa alcançar o próximo salto no enlace local. O IP de destino continua apontando para o servidor remoto, enquanto o quadro Ethernet usa o MAC do gateway."
      },
      {
        "ask": "O que pode ser concluído quando o navegador recebe HTTP 503?",
        "answer": "Algum servidor ou intermediário HTTP respondeu informando indisponibilidade. Devem-se investigar proxy, aplicação e dependências, e não presumir ruptura total do enlace."
      },
      {
        "ask": "Qual a sequência simplificada de encapsulamento para HTTP sobre TCP/IP/Ethernet?",
        "answer": "Mensagem HTTP → segmento TCP → datagrama IP → quadro Ethernet → bits/sinais. No receptor, há desencapsulamento."
      }
    ],
    "extra": "Para avançar: conheça a diferença entre controle de fluxo (janela anunciada pelo receptor) e congestionamento (condições do caminho), assim como o protocolo QUIC usado pelo HTTP/3. Leia RFC 9293 (TCP) e RFC 9000 (QUIC), disponíveis em rfc-editor.org. Esses conceitos aprofundam o funcionamento, mas não são necessários para entender a introdução."
  },
  {
    "id": 92,
    "title": "Subnetting na prática: de /24 a VLSM com exemplos completos",
    "goal": "Calcular sub-redes por prefixos, planejar blocos diferentes sem sobreposição e reconhecer erros de máscara e gateway.",
    "steps": [
      {
        "title": "1. Relembrando a ideia de rede e de host",
        "body": "Uma organização tem o bloco 192.168.40.0/24. O /24 reserva 24 bits para o prefixo e 8 bits para identificar os endereços dentro do bloco. Assim, há 2^8=256 endereços. Num cenário tradicional, 192.168.40.0 é o endereço de rede e 192.168.40.255 é broadcast; restam 254 endereços utilizáveis por hosts. Ao subdividir esse bloco, estamos trocando parte dos bits de host por bits adicionais de rede. O resultado são redes menores, com limites próprios."
      },
      {
        "title": "2. Como descobrir onde começa e termina uma sub-rede",
        "body": "Considere o IP **192.168.40.78/26**. O prefixo /26 deixa 6 bits de host, portanto cada sub-rede tem 64 endereços. A máscara é 255.255.255.192, e o incremento no último octeto é 256−192=64: redes iniciam em 0, 64, 128 e 192. O número 78 está no intervalo 64–127. Logo, a rede é 192.168.40.64, broadcast 192.168.40.127 e hosts convencionais de .65 a .126.\n\nEsse procedimento funciona porque os limites das sub-redes são alinhados ao tamanho do bloco. O truque não é decorar listas, mas descobrir quantos bits ficaram para hosts e calcular o incremento."
      },
      {
        "title": "3. VLSM: quando as redes precisam de tamanhos diferentes",
        "body": "VLSM significa usar **máscaras de tamanho variável** dentro de um conjunto maior. Por exemplo, um setor com 50 hosts precisa de pelo menos **/26**, pois /27 permite 30 hosts convencionais e /26 permite 62. Outro setor com 12 hosts precisa de **/28**, com 14 hosts convencionais. Em vez de atribuir /24 a todos, podemos economizar endereços e separar setores com tamanhos adequados.\n\nA regra prática é **reservar primeiro o maior bloco**, garantindo alinhamento e ausência de sobreposição. Depois, reserve os menores. Não escolha blocos só pelo número aparente do octeto, e não coloque o gateway fora da sub-rede do host."
      },
      {
        "title": "4. CIDR e a escolha de rotas",
        "body": "A notação CIDR, como 10.0.0.0/8 ou 10.1.5.0/24, descreve prefixos. Em roteadores, uma rota mais específica geralmente ganha da rota menos específica quando ambas alcançam o destino, segundo a regra de **maior correspondência de prefixo**. Por exemplo, 10.1.5.22 coincide com 10.1.0.0/16 e 10.1.5.0/24; o prefixo /24 é mais específico.\n\nNão misture esse assunto com 'quantidade de hosts': **roteamento** decide caminho para um destino; **subnetting** define a divisão dos endereços. Os dois usam prefixos, mas respondem perguntas diferentes."
      }
    ],
    "worked": {
      "title": "Planejando duas LANs com 50 e 12 hosts a partir de 192.168.50.0/24",
      "body": "**1. Identifique as necessidades.** LAN A: 50 hosts. LAN B: 12 hosts. Considere cenário convencional, com rede e broadcast reservados.\n\n**2. Descubra o menor bloco para A.** /27 dá 30 hosts: insuficiente. /26 dá 62: suficiente. Reserve **192.168.50.0/26**, intervalo total .0–.63, hosts .1–.62.\n\n**3. Descubra o menor bloco para B.** /29 dá 6 hosts: insuficiente. /28 dá 14: suficiente. Reserve **192.168.50.64/28**, intervalo total .64–.79, hosts .65–.78.\n\n**4. Confira as fronteiras.** A termina em .63 e B começa em .64: não há sobreposição.\n\n**5. Escolha gateways válidos.** Exemplos: 192.168.50.1 para A e 192.168.50.65 para B, desde que sejam designados a interfaces adequadas.\n\n**6. Validação.** Os dois blocos cabem no /24 original e ainda sobra espaço para outras redes."
    },
    "pitfalls": [
      "/27 representa 32 endereços totais, normalmente 30 hosts; não confunda os dois números.",
      "No VLSM, escolher blocos sem alinhamento pode provocar sub-redes sobrepostas.",
      "/31 e /32 têm usos próprios e não seguem universalmente a regra hosts=total−2.",
      "A rota mais específica é escolhida por prefixo mais longo, não simplesmente por menor endereço numérico."
    ],
    "review": [
      {
        "ask": "Qual a rede de 192.168.30.150/27?",
        "answer": "/27 tem blocos de 32. 150 pertence a 128–159, então rede 192.168.30.128 e broadcast 192.168.30.159."
      },
      {
        "ask": "Um setor precisa de 50 hosts convencionais. /27 é suficiente?",
        "answer": "Não: /27 oferece 30. /26 oferece 62 e é o menor prefixo convencional suficiente."
      }
    ],
    "extra": "Em cenários de enlace ponto a ponto, /31 pode fornecer dois endereços utilizáveis sob convenções específicas. Estude também agregação de rotas (sumarização) apenas após dominar alinhamento de sub-redes."
  },
  {
    "id": 93,
    "title": "Do DNS à API: diagnóstico de rede sem tentativas aleatórias",
    "goal": "Seguir uma sequência de diagnóstico para distinguir falha de endereçamento, DNS, rota, porta, TLS e aplicação.",
    "steps": [
      {
        "title": "1. Comece pelo sintoma, não pela ferramenta",
        "body": "Um usuário informa: 'o sistema não abre'. Essa frase descreve o resultado, não a causa. Pode significar que o computador está desconectado, o nome não resolve, a porta do servidor está bloqueada ou a própria aplicação apresenta erro. O diagnóstico precisa transformar a reclamação em perguntas: qual máquina? qual endereço? qual horário? funciona por IP? outros computadores conseguem? existe mensagem de erro ou código HTTP?\n\nUma técnica prática é avançar pelo caminho que a comunicação percorre, registrando evidências após cada teste. Evite trocar DNS, máscara e firewall simultaneamente: assim você perde a capacidade de identificar qual medida realmente resolveu o problema."
      },
      {
        "title": "2. Endereçamento e gateway vêm antes do domínio",
        "body": "No Windows, `ipconfig /all` permite observar IP, máscara, gateway, servidor DNS e interface utilizada. Em Linux, `ip addr` e `ip route` fornecem informações relacionadas. Se o computador obtiver um endereço IPv4 link-local 169.254.x.x, isso pode indicar autoconfiguração depois de indisponibilidade de DHCP, embora o contexto deva ser verificado. Uma máscara incompatível pode fazer o host considerar remoto um destino que deveria ser local, ou vice-versa.\n\nO gateway é o próximo salto escolhido por rotas para redes não diretamente conectadas. Se a própria rede local não funciona, investigar autorização em uma API remota não é a primeira etapa."
      },
      {
        "title": "3. O DNS responde à pergunta 'para qual endereço?' ",
        "body": "DNS associa nomes a informações como endereços IPv4 (**A**) e IPv6 (**AAAA**). `nslookup sistema.exemplo` ou `dig sistema.exemplo` permite investigar resposta de um resolvedor. Se o site funciona quando você usa IP diretamente, mas falha por nome, DNS ou configuração de nome pode ser hipótese prioritária. Entretanto, o protocolo HTTPS também utiliza nomes em certificados e pode haver hospedagem virtual: acessar por IP não equivale necessariamente a acessar a mesma aplicação por nome.\n\nDNS pode utilizar UDP ou TCP conforme a consulta e o mecanismo. Portanto, afirmar que DNS opera 'somente em UDP' não é tecnicamente correto."
      },
      {
        "title": "4. TCP/UDP e portas revelam outra camada de falha",
        "body": "O TCP estabelece tipicamente conexão com SYN, SYN+ACK e ACK. As portas identificam processos de origem/destino. Um teste de conexão TCP à porta 443 pode mostrar se o caminho até o serviço HTTPS está acessível em determinado instante. No PowerShell, `Test-NetConnection servidor -Port 443` ajuda nessa verificação. Um erro de conexão pode refletir firewall, ausência de serviço escutando, rota ou problema no host; não é, isoladamente, prova de DNS.\n\nSe TCP conecta, ainda faltam possíveis etapas como TLS, autenticação, autorização e processamento da aplicação. Em UDP, o teste e a interpretação precisam considerar ausência de handshake TCP e características do protocolo usado."
      },
      {
        "title": "5. Interpretar o retorno da aplicação",
        "body": "Quando a solicitação chega a um servidor HTTP, a resposta carrega um **status**. **200** indica sucesso; **401** sinaliza necessidade ou falha de autenticação; **403** representa acesso negado; **404**, recurso não encontrado; **503**, indisponibilidade do serviço naquele momento. Esses códigos não especificam automaticamente qual componente falhou por trás do servidor. Uma API em inicialização pode devolver 503; um proxy pode retornar 503 ao não alcançar o backend.\n\nO diagnóstico final compara o código com logs, dependências e horário. Uma comunicação com status HTTP não deve ser confundida com ausência absoluta de rede."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: o navegador resolve o nome, mas não abre o portal",
      "body": "**Etapa 1.** Usuário informa `https://portal.exemplo` indisponível. Registre mensagem exata e compare com outra estação.\n\n**Etapa 2.** Endereçamento local está coerente e interface ativa. Isso reduz suspeita de falha física/local, mas não comprova acesso ao destino.\n\n**Etapa 3.** `nslookup portal.exemplo` retorna IP. A resolução testada funcionou.\n\n**Etapa 4.** `Test-NetConnection portal.exemplo -Port 443` falha. Agora priorize investigação de rota, filtro e serviço, em vez de presumir problema de conteúdo do site.\n\n**Etapa 5.** Em outro momento, TCP passa a conectar, mas a página retorna HTTP 503. Houve avanço na cadeia: a falha remanescente pode estar em proxy, aplicação ou dependência.\n\n**Conclusão.** As evidências mudam a hipótese. Um diagnóstico profissional atualiza o raciocínio depois de cada resultado, em vez de repetir uma receita fixa."
    },
    "pitfalls": [
      "Ping responde ICMP; não prova que HTTP/TCP esteja operacional.",
      "DNS resolve nome; não assegura que serviço de aplicação esteja ativo.",
      "Status HTTP 503 indica resposta de servidor/intermediário, não comprova cabo rompido.",
      "Acesso por IP pode ter comportamento diferente do acesso por nome em serviços HTTPS."
    ],
    "review": [
      {
        "ask": "O IP do servidor funciona, mas o nome falha. Qual serviço investigar primeiro?",
        "answer": "A resolução DNS e a configuração do nome, sem esquecer que sites HTTPS podem depender do nome do host."
      },
      {
        "ask": "Uma conexão TCP/443 foi estabelecida. O login está garantido?",
        "answer": "Não. TCP é transporte; autenticação e autorização pertencem à lógica dos serviços superiores."
      }
    ],
    "extra": "Para aprofundar, compare resposta de DNS autoritativo com cache de resolvedor, TTL de registros, negociação TLS, SNI e proxy reverso. Verifique logs e testes com evidências para cada etapa."
  }
];
