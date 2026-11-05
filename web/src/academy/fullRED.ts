import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullRED=buildChapters([
  {
    "id": 19,
    "title": "CIDR e cálculo de hosts sem decorar fórmulas",
    "goal": "Determinar rede, broadcast, quantidade de endereços e hosts a partir de um prefixo IPv4, explicando cada etapa.",
    "context": "Uma secretaria recebeu o endereço `10.20.4.37/27` e precisa saber quais outros equipamentos podem compartilhar essa sub-rede. **Endereço IPv4** é um número de 32 bits usado na comunicação; **prefixo** é a quantidade de bits iniciais reservados à identificação da rede. A expressão `/27` não significa 27 máquinas: indica 27 bits para rede e deixa cinco bits para os endereços dentro daquele bloco. Antes de fazer contas, lembre que um bit pode valer 0 ou 1; cinco bits produzem `2⁵ = 32` combinações.",
    "explanation": "Para descobrir o bloco, subtraia o prefixo de 32: `32 − 27 = 5`. Assim, cada sub-rede desse tamanho contém 32 endereços. No último octeto, os blocos começam em 0, 32, 64, 96 e assim por diante. O número 37 está no intervalo de 32 a 63: a **rede** é `10.20.4.32` e o **broadcast** tradicional é `10.20.4.63`. Numa sub-rede IPv4 convencional, os endereços utilizáveis vão de `.33` a `.62`, somando 30. A fórmula de hosts `2⁵−2` desconta rede e broadcast; existem exceções específicas, como `/31`, então não a trate como regra universal.\n\n**Entenda os bits antes da conta.** IPv4 possui quatro octetos de 8 bits, ou 32 bits ao todo. Uma máscara /27 contém 27 bits 1 consecutivos e cinco bits 0: em binário, seu último octeto é 11100000, que equivale a 128+64+32=224. O AND bit a bit entre IP e máscara produz o endereço da rede. Para 10.20.4.37, o último octeto 37 é 00100101; 00100101 AND 11100000 = 00100000, que é 32. O broadcast de uma sub-rede IPv4 convencional tem todos os cinco bits de host em 1: 00111111 = 63. O primeiro host costuma ser 33 e o último 62. Não confunda divisão decimal em grupos com o cálculo binário que a justifica. /31 é empregado em enlaces ponto a ponto conforme RFC 3021 e /32 identifica um único endereço; portanto não aplique 2^h−2 automaticamente.",
    "connection": "Essa conta se conecta ao **roteamento**. Um roteador usa o prefixo para identificar que destinos pertencem a qual rede. Também se conecta à **máscara**: `/27` equivale a `255.255.255.224`, pois os três primeiros octetos estão inteiramente reservados à rede, e os três bits iniciais do último octeto valem 128+64+32=224. Endereços com o mesmo começo visual podem estar em sub-redes diferentes se a máscara mudar. Por isso IP isolado não é suficiente para verificar alcance local.",
    "exam": "Quando a banca perguntar a quantidade de hosts, não escolha imediatamente o número total de endereços. Primeiro verifique se o enunciado pede **endereços do bloco**, **endereços utilizáveis** ou quantidade de dispositivos reais já conectados. São três coisas distintas. Em questões de subdivisão, o passo seguro é calcular o tamanho do bloco e só depois localizar o intervalo. Se um computador possui `.37/27`, `.63` não é um endereço comum para a estação: é o broadcast dessa sub-rede convencional.",
    "caseTitle": "Localize a rede de 192.168.40.77/28",
    "caseSteps": [
      "IPv4 tem 32 bits. O prefixo /28 deixa 4 bits para endereços internos: `2⁴=16` endereços por bloco.",
      "Blocos de 16 no último octeto começam em 0,16,32,48,64,80. O valor 77 pertence ao intervalo 64–79.",
      "Logo, rede `192.168.40.64`, broadcast `192.168.40.79`, hosts usuais `.65` a `.78`, total de 14.",
      "Confirme calculando a máscara `/28 = 255.255.255.240`; não confunda 16 endereços do bloco com 16 hosts utilizáveis."
    ],
    "pitfalls": [
      "Prefixo /27 é quantidade de bits de rede, não quantidade de máquinas.",
      "Rede e broadcast não são hosts usuais de uma sub-rede IPv4 convencional.",
      "A regra `2^h−2` possui exceções e não substitui interpretar o enunciado.",
      "Dois IPs próximos podem estar em sub-redes distintas se seus prefixos diferirem."
    ],
    "cards": [
      [
        "O que significa /27 em um IPv4?",
        "27 bits reservados à parte de rede; restam 5 dos 32 bits para identificar endereços no bloco."
      ],
      [
        "Quantos endereços totais há numa sub-rede IPv4 /27?",
        "São `2⁵=32` combinações; em uso convencional, 30 endereços são atribuíveis a hosts."
      ],
      [
        "Qual é o endereço de rede de 10.20.4.37/27?",
        "10.20.4.32, porque o último octeto 37 fica no bloco de tamanho 32 que começa em 32."
      ],
      [
        "Qual a diferença entre prefixo e gateway?",
        "Prefixo define o bloco de rede; gateway é o próximo roteador usado para alcançar destinos externos."
      ]
    ]
  },
  {
    "id": 20,
    "title": "VLAN, trunk e etiqueta 802.1Q explicados com uma rede real",
    "goal": "Entender isolamento local, portas access e trunk, tags VLAN e a necessidade de roteamento entre segmentos.",
    "context": "Imagine dois setores conectados ao mesmo conjunto de switches: recepção e laboratório. Embora dividam cabos e equipamentos, a organização não quer que mensagens locais de um setor sejam distribuídas a todos os computadores do outro. Uma **VLAN** é uma segmentação lógica de uma rede Ethernet; cada VLAN forma normalmente seu próprio domínio de broadcast. **Broadcast** significa mensagem destinada ao conjunto inteiro de participantes daquele segmento local. Assim, separar VLANs altera quem participa daquela comunicação, sem exigir um switch físico exclusivo para cada departamento.",
    "explanation": "Uma **porta access** costuma pertencer a uma VLAN de acesso, de modo que um computador comum não precisa saber que existe identificação de VLAN. Já um **trunk** transporta tráfego de múltiplas VLANs entre equipamentos, como dois switches ou um switch e um roteador compatível. O padrão **IEEE 802.1Q** permite adicionar informação de identificação da VLAN ao quadro Ethernet. Pense na etiqueta como uma marca que informa a qual grupo lógico o quadro pertence. O trunk não cria permissão entre VLANs: apenas preserva a identificação enquanto quadros atravessam o enlace compartilhado.\n\n**O que muda no quadro 802.1Q?** Um quadro Ethernet comum contém MAC de destino (6 bytes), MAC de origem (6 bytes), campo de tipo/comprimento (2 bytes), dados e FCS de 4 bytes. Ao inserir a identificação 802.1Q, entram quatro bytes entre o MAC de origem e o campo de tipo original: TPID de 16 bits, frequentemente 0x8100, e TCI de 16 bits. O TCI inclui PCP (3 bits, prioridade), DEI (1 bit, indicador de elegibilidade de descarte) e VID (12 bits, identificador da VLAN). Com 12 bits existem 4096 valores, mas 0 e 4095 são reservados, deixando IDs de VLAN utilizáveis de 1 a 4094. Uma porta access costuma enviar quadros sem tag ao dispositivo final; um trunk pode levar várias VLANs e deve tratar corretamente a VLAN nativa. Uma tag não é criptografia, não impede por si só ataques e não substitui roteamento inter-VLAN.",
    "connection": "VLAN está relacionada à **camada de enlace**, que organiza quadros e identificadores MAC. Um **roteador** trabalha no endereçamento IP e pode interligar sub-redes associadas a VLANs diferentes, quando configurado para **roteamento inter-VLAN**. Portanto, 'trunk' e 'roteamento' não são sinônimos. Também não confunda VLAN com VPN: **VPN** protege ou organiza comunicação sobre rede intermediária; VLAN define segmentos lógicos de comunicação local. Uma VLAN, por si só, não é mecanismo de criptografia nem autorização de usuários.",
    "exam": "Se um enunciado disser que as VLANs 10 e 20 estão conectadas por trunk, mas não conseguem conversar por IP, pergunte primeiro se existe **roteamento inter-VLAN** e se regras permitem o tráfego. Se dois equipamentos da mesma VLAN não se comunicam, investigue associação de porta, trunk e enlace antes de supor problema de roteamento. Não responda 'basta configurar 802.1Q' quando a questão exige comunicação entre sub-redes; a etiqueta não encaminha automaticamente pacotes IP.",
    "caseTitle": "Recepção na VLAN 10 não alcança servidor na VLAN 30",
    "caseSteps": [
      "A recepção possui IP `192.168.10.20/24` e o servidor `192.168.30.10/24`: são redes IP diferentes.",
      "O trunk entre os switches carrega quadros identificados de ambas as VLANs, mas não realiza por si só roteamento.",
      "Verifique interfaces ou roteamento inter-VLAN, gateways e políticas de firewall entre as sub-redes.",
      "Conclua que a segmentação pode estar correta; para comunicação entre redes é preciso caminho IP permitido."
    ],
    "pitfalls": [
      "Trunk transporta múltiplas VLANs; não é o mesmo que comunicação liberada entre elas.",
      "Porta access costuma encaminhar tráfego de estação sem exigir tags no computador.",
      "IEEE 802.1Q identifica VLAN no quadro; não criptografa os dados.",
      "VLAN isola domínios locais; VPN trata comunicação lógica protegida sobre outras redes."
    ],
    "cards": [
      [
        "Por que configurar VLANs?",
        "Para separar logicamente domínios de comunicação local mesmo quando compartilham parte da infraestrutura física."
      ],
      [
        "Qual a função do trunk?",
        "Transportar tráfego de várias VLANs por um enlace entre equipamentos compatíveis."
      ],
      [
        "O que faz a etiqueta 802.1Q?",
        "Informa a identificação da VLAN no quadro Ethernet para que os equipamentos mantenham a segmentação."
      ],
      [
        "Trunk sozinho faz roteamento inter-VLAN?",
        "Não. Ele transporta VLANs no enlace; a comunicação IP entre sub-redes requer função de roteamento e regras adequadas."
      ]
    ]
  },
  {
    "id": 22,
    "title": "DNS: o que realmente acontece ao consultar um nome",
    "goal": "Explicar a resolução DNS e diferenciar registros A, AAAA, CNAME, MX, NS e TTL com situações reais.",
    "context": "Ninguém quer memorizar o IP de cada sistema utilizado. O **DNS** é um serviço de nomes que permite consultar informações associadas a nomes como `portal.exemplo.org`. Um **registro DNS** é uma informação armazenada numa zona, organizada por nome e tipo. Ao informar um endereço de site ao navegador, o sistema pode precisar perguntar qual endereço IP corresponde ao nome. Mas o DNS não é apenas uma 'lista de sites': ele também guarda registros de e-mail, delegação de zonas e outras informações utilizadas por serviços de rede.",
    "explanation": "O registro **A** associa um nome a um endereço IPv4; **AAAA** associa a IPv6. Um **CNAME** registra um nome canônico como alvo de outro nome, sujeito às regras de coexistência de registros. O **MX** identifica servidores responsáveis pelo recebimento de e-mails de um domínio; **NS** identifica servidores de nomes relacionados à autoridade de uma zona. A consulta pode ser feita a um **resolvedor recursivo**, que busca ou devolve uma resposta em cache. **TTL** (*Time To Live*) representa o tempo por que uma resposta pode permanecer em cache, ajudando a reduzir consultas repetidas.\n\n**A consulta DNS tem formato e etapas.** Um cliente que precisa de www.exemplo.com costuma consultar um resolvedor recursivo. Este verifica seu cache; se não houver resposta válida, pode perguntar a um servidor raiz quais servidores conhecem .com, depois aos de .com quais são os autoritativos por exemplo.com, e por fim ao autoritativo pelo registro desejado. A consulta possui cabeçalho com identificador, flags e contagens de perguntas/respostas; o nome é codificado em rótulos. Registros A apontam para IPv4, AAAA para IPv6, MX para correio e CNAME cria um nome alternativo. TTL significa *Time to Live*, tempo de cache anunciado em segundos. NXDOMAIN significa que o nome consultado não existe naquele contexto; SERVFAIL indica falha no processamento da resolução. DNS usa frequentemente UDP/53, mas também TCP/53, além de transportes criptografados específicos.",
    "connection": "Conecte isso ao que estudamos em IP: o DNS fornece uma informação usada para localizar o destino, mas **não substitui o roteamento** até ele. Também não confunda DNS com DHCP: DHCP distribui parâmetros de rede à estação; DNS responde perguntas sobre nomes. Um cliente pode ter IP e gateway corretos, acessar servidores por endereço numérico e falhar apenas quando usa o nome. Esse padrão favorece investigar resolução DNS antes de trocar cabo ou liberar todas as portas.",
    "exam": "As bancas costumam trocar **MX** por **A** como resposta para 'qual registro indica servidor de e-mail?' ou confundir CNAME com redirecionamento HTTP. CNAME é um mecanismo de nome, não uma mensagem HTTP 301. Se o problema envolve respostas antigas após alteração de IP, pense em **cache e TTL**. Se o nome não resolve, confira qual DNS está sendo consultado e se ele conhece a zona correta. Saber o nome do registro é o começo: a prova também pode perguntar por que ele funciona naquele cenário.",
    "caseTitle": "Sistema acessível por IP, mas com nome antigo",
    "caseSteps": [
      "O administrador alterou o IPv4 do servidor de `192.168.1.20` para `192.168.1.90` e atualizou o registro A.",
      "Um computador ainda resolve o nome para `.20`: ele pode estar consultando informação em cache com TTL ainda vigente.",
      "Verifique a resposta DNS e a origem do resolvedor; não presuma falha de rota se o acesso ao IP novo funciona.",
      "Conclua que uma mudança no registro pode demorar a aparecer em caches; investigue TTL e propagação de consultas."
    ],
    "pitfalls": [
      "A retorna IPv4 e AAAA retorna IPv6; as letras não são prioridades de segurança.",
      "MX se refere a destino de e-mail, não ao endereço HTTP do site.",
      "CNAME cria relação de nomes, não um redirecionamento HTTP 301.",
      "DNS não encaminha pacotes IP; fornece registros que podem ajudar a localizar destinos."
    ],
    "cards": [
      [
        "Para que serve o registro A?",
        "Para relacionar um nome DNS a um endereço IPv4, que pode ser utilizado para alcançar o serviço."
      ],
      [
        "Qual registro está associado a servidores de recebimento de e-mail?",
        "MX, que aponta para destinos de entrega de mensagens do domínio."
      ],
      [
        "O que significa TTL na resposta DNS?",
        "Tempo durante o qual a resposta pode ser armazenada em cache, conforme o valor informado."
      ],
      [
        "O que investigar se IP funciona e nome falha?",
        "Resolução DNS, servidor consultado, existência do registro e eventual cache desatualizado."
      ]
    ]
  },
  {
    "id": 25,
    "title": "NAT e PAT: por que o roteador muda endereços?",
    "goal": "Entender endereços privados, tradução NAT, PAT e limitações do retorno de conexões.",
    "context": "Numa casa, vários dispositivos podem usar endereços privados como `192.168.1.10` e `192.168.1.11`, mas a conexão à Internet frequentemente compartilha um endereço público. **Endereço privado IPv4** pertence a faixas destinadas à utilização em redes locais, como `192.168.0.0/16`. Esses endereços não são roteados diretamente pela Internet pública. Para que cada aparelho consiga iniciar comunicações externas, o equipamento de borda pode usar **tradução de endereços**, conhecida como **NAT (Network Address Translation)**.",
    "explanation": "Quando o computador `192.168.1.10` abre uma conexão para um serviço, o roteador NAT pode substituir o IP de origem do pacote por um IP público da conexão externa, mantendo informação para encaminhar a resposta ao computador correto. O **PAT** (também chamado NAPT) diferencia múltiplas comunicações usando, além de endereços, **portas lógicas** de transporte. Assim, dois computadores internos podem falar com o mesmo servidor externo e serem identificados por combinações distintas de endereço e porta na tabela de tradução. Portas TCP não são portas físicas: são números usados pelos protocolos de transporte.\n\n**Veja exatamente o que muda no NAT/PAT.** Considere uma estação 192.168.1.10:51514 acessando 203.0.113.20:443. Um roteador com IP público 198.51.100.9 pode criar o mapeamento 192.168.1.10:51514 → 198.51.100.9:40001. Na saída, ele altera o IP de origem e, no PAT, também a porta de origem; recalcula checksums pertinentes e guarda estado do mapeamento. A resposta enviada a 198.51.100.9:40001 é traduzida de volta ao endereço e porta internos. Os números deste exemplo são ilustrativos. NAT não é sinônimo de firewall: a tabela de traduções e a política que autoriza pacotes são mecanismos diferentes. Port forwarding cria regras para alcançar serviços internos, mas exige avaliação de segurança. No IPv6 o encaminhamento fim a fim geralmente não depende do NAT IPv4 convencional.",
    "connection": "NAT não é igual a firewall. A tradução muda informações de endereçamento; o **firewall** avalia regras de permitir ou bloquear tráfego. Em muitos roteadores domésticos as duas funções convivem, o que leva a confundi-las. NAT também não criptografa automaticamente a conexão, nem comprova que o usuário está autorizado ao aplicativo. Para permitir comunicação **iniciada de fora para dentro**, muitas vezes é necessária regra explícita, redirecionamento de porta ou arquitetura adequada; não basta o serviço existir na rede privada.",
    "exam": "Considere as perguntas separadamente: quem fornece o endereço privado? Pode ser DHCP. Quem escolhe a rota? Roteador. Quem altera o endereço de origem na passagem? NAT. Quem permite ou bloqueia? Firewall. Quem escolhe qual programa responde? Porta de transporte e serviço. Se a banca afirmar que NAT é tecnologia necessária para todo tráfego IPv6 ou que fornece criptografia, desconfie: IPv6 normalmente possui espaço de endereços suficiente para outros modelos de conectividade, e NAT não fornece criptografia.",
    "caseTitle": "Dois computadores compartilham o mesmo IP público",
    "caseSteps": [
      "PC-A (`192.168.1.10`) e PC-B (`192.168.1.11`) enviam conexões TCP a um site externo usando NAT com PAT.",
      "O roteador registra traduções distintas, por exemplo `IP-publico:50001` para PC-A e `IP-publico:50002` para PC-B.",
      "Ao receber respostas para essas combinações, a tabela permite identificar qual dispositivo interno deve recebê-las.",
      "Conclua que o compartilhamento depende de entradas de tradução e portas, não de o site externo conhecer os IPs privados."
    ],
    "pitfalls": [
      "NAT traduz endereços; firewall aplica regras de tráfego.",
      "PAT usa portas lógicas para distinguir comunicações, não portas físicas do switch.",
      "Endereços privados IPv4 não são roteados diretamente pela Internet pública.",
      "NAT não criptografa tráfego nem substitui autorização na aplicação."
    ],
    "cards": [
      [
        "Por que vários aparelhos domésticos usam NAT?",
        "Porque podem utilizar endereços privados e compartilhar um endereço público ao iniciar comunicação externa."
      ],
      [
        "O que PAT acrescenta ao NAT?",
        "A diferenciação de conexões por portas de transporte, além dos endereços."
      ],
      [
        "NAT é igual a firewall?",
        "Não. Tradução de endereços e decisão de permitir/bloquear tráfego são funções diferentes."
      ],
      [
        "Por que um servidor interno pode não ser alcançável pela Internet?",
        "Porque endereços privados não são roteados publicamente e a borda pode precisar de regra e encaminhamento explícitos."
      ]
    ]
  },
  {
    "id": 26,
    "title": "HTTP, HTTPS e respostas: do pedido ao erro 404",
    "goal": "Descrever requisição e resposta HTTP, o papel do TLS e interpretar códigos 200, 301, 401, 403 e 404 em casos reais.",
    "context": "Quando você abre um site, o navegador envia um **pedido** ao servidor e recebe uma **resposta**. O **HTTP** (*Hypertext Transfer Protocol*) é o protocolo que organiza essas mensagens: método, endereço do recurso, cabeçalhos e, quando aplicável, corpo. A expressão **recurso** pode representar página, imagem ou dado oferecido pela aplicação. Por exemplo, `GET /agenda` expressa um pedido de consulta ao caminho `/agenda` daquele servidor. Não é necessário saber programar para entender esse fluxo: é uma conversa com regras definidas entre cliente e servidor.",
    "explanation": "Os **métodos** expressam a intenção: GET consulta, POST submete dados para processamento, PUT expressa substituição/definição do estado do recurso e DELETE solicita remoção da associação atual. A resposta HTTP inclui um **código de status**. `200 OK` significa sucesso, `301 Moved Permanently` indica redirecionamento permanente, `401` está associado à necessidade de credenciais de autenticação válidas, `403` indica que o servidor entende mas recusa executar e `404` indica recurso não encontrado/disponível segundo o servidor. Não trate cada código como uma explicação completa da causa: ele é informação do nível da aplicação.\n\n**Abra a mensagem HTTP por dentro.** Uma requisição HTTP/1.1 contém uma linha inicial como GET /exames HTTP/1.1, cabeçalhos como Host: exemplo.com, uma linha vazia e eventualmente um corpo. O método GET busca uma representação, POST geralmente envia dados para processamento, PUT substitui o estado de um recurso definido e DELETE solicita remoção; efeitos concretos dependem da API. Respostas contêm código de status, cabeçalhos e corpo opcional. 200 indica sucesso, 301 redirecionamento permanente, 400 erro de requisição, 401 ausência de autenticação válida, 403 proibição, 404 recurso não encontrado, 500 falha do servidor. HTTPS usa TLS para proteger dados em trânsito e autenticar o servidor por certificado; ele não corrige permissões indevidas nem valida automaticamente a segurança do código. HTTP/3 utiliza QUIC sobre UDP, não TCP.",
    "connection": "O **HTTPS** é HTTP protegido por **TLS**: o protocolo TLS ajuda a autenticar o servidor e proteger confidencialidade/integridade do tráfego. Ele não garante que o código do aplicativo esteja livre de vulnerabilidades. Relacione também ao transporte: o HTTP/1.1 e HTTP/2 usam usualmente TCP com TLS no caso de HTTPS, enquanto HTTP/3 utiliza QUIC sobre UDP. Por isso memorizar 'HTTP é TCP' sem compreender o contexto e a versão pode levar a erro de prova. E 'porta 443' é um número lógico comumente usado por HTTPS, não a prova de que a conexão foi protegida corretamente.",
    "exam": "Se uma página retorna **404**, a rede pode ter funcionado perfeitamente: o servidor recebeu o pedido e respondeu que não encontrou o recurso. Se o usuário está autenticado, mas a função é proibida, **403** é um candidato melhor que **401** em muitos cenários. Se o enunciado afirma que GET deveria 'salvar alterações no banco', identifique uso indevido da semântica segura do método. Em redação de prova, prefira associar o código à intenção que representa, sem inventar causa física ou DNS.",
    "caseTitle": "O sistema abre, mas um relatório retorna 403",
    "caseSteps": [
      "A recepcionista faz login com credenciais válidas e abre a página principal do sistema.",
      "Ao pedir `GET /relatorios/financeiro`, recebe HTTP `403 Forbidden`; o servidor recebeu e compreendeu o pedido.",
      "O erro aponta à recusa de acesso, frequentemente por regra de autorização, e não automaticamente a falha de cabo ou DNS.",
      "Conclua que a autenticação funcionou, mas a aplicação não permitiu o recurso solicitado; investigue perfis e permissões."
    ],
    "pitfalls": [
      "404 não significa obrigatoriamente falha de conexão física.",
      "401 e 403 tratam situações diferentes de credenciais e recusa de acesso.",
      "HTTPS protege o transporte, mas não corrige regras erradas de autorização.",
      "GET descreve consulta e é método seguro pela semântica HTTP; não deveria efetuar alteração solicitada."
    ],
    "cards": [
      [
        "O que o método GET expressa?",
        "Uma solicitação de representação de um recurso, sem intenção de alterar o estado no servidor."
      ],
      [
        "Qual a diferença típica entre 401 e 403?",
        "401 indica necessidade de autenticação válida; 403 indica que o servidor recusa a operação entendida."
      ],
      [
        "O que HTTPS acrescenta ao HTTP?",
        "Proteção por TLS, permitindo autenticação e proteção criptográfica do canal conforme configuração."
      ],
      [
        "Um 404 comprova que o cabo falhou?",
        "Não. É uma resposta HTTP do servidor sobre o recurso solicitado, e pode ocorrer com rede funcionando."
      ]
    ]
  },
  {
    "id": 91,
    "title": "Encapsulamento: acompanhe a mesma mensagem entre as camadas",
    "goal": "Entender a unidade de dados em cada etapa e por que o endereço MAC pode mudar sem mudar o destino IP.",
    "context": "Na aula básica você aprendeu que um navegador prepara pedidos, enquanto componentes de rede ajudam a levá-los ao destino. Agora precisamos entender **como os dados são organizados ao atravessar essas responsabilidades**. Chamamos de **encapsulamento** o processo de colocar informações de uma camada dentro da unidade transportada pela camada inferior. Pense em uma carta colocada num envelope com remetente e destinatário; depois o envelope entra numa embalagem de transporte local. Cada embalagem acrescenta informações para uma tarefa específica, mas o conteúdo original continua existindo.",
    "explanation": "Uma mensagem HTTP pode ser transportada por TCP, que acrescenta informação como **portas** e controle de sequência. O IP acrescenta endereços e dados para encaminhamento entre redes, formando o **pacote IP**. No enlace Ethernet, esse pacote é transportado em um **quadro**, com informações locais como MAC de origem e de destino. Na camada física, os bits são representados por sinais. Na recepção, ocorre **desencapsulamento**: as informações relevantes são interpretadas nas camadas correspondentes até a aplicação receber os dados. Termos como segmento TCP, pacote IP e quadro Ethernet nomeiam unidades diferentes e não são sinônimos.\n\n**Encapsulamento real, campo por campo.** Uma requisição de aplicação passa ao transporte: TCP acrescenta portas de origem e destino, números de sequência e confirmação, flags, janela e checksum; UDP usa cabeçalho menor com portas, comprimento e checksum. O IP acrescenta endereços de origem e destino e informações necessárias ao encaminhamento. No IPv4, TTL é reduzido em roteadores para evitar circulação indefinida. No enlace Ethernet, os MACs apontam para remetente e próximo destinatário do trecho; o FCS detecta erros do quadro naquele enlace. O receptor decodifica na ordem inversa. A cada salto roteado o quadro muda; não conclua que o MAC do servidor remoto apareça no primeiro quadro do cliente. Tamanho total importa: MTU é o limite de tamanho do pacote de camada 3 transportado em determinado enlace; excedê-lo pode exigir fragmentação IPv4 ou ajuste de caminho.",
    "connection": "Se o pacote cruza um roteador, o quadro Ethernet do primeiro enlace normalmente é removido e outro quadro é criado para o trecho seguinte. Por isso **MAC de destino do quadro pode mudar a cada salto**, enquanto o **IP de destino do pacote** em geral continua apontando para o servidor final, salvo mecanismos específicos como NAT. Essa é a ligação entre camada 2 e camada 3. O roteador não precisa compreender o HTML da página para encaminhar pacotes: ele decide pelo endereçamento e regras de rede.",
    "exam": "A prova pode dizer que o MAC do gateway precisa ser o MAC do servidor remoto. Isso é falso: na primeira rede local, o próximo destinatário físico costuma ser a interface do roteador. Outra armadilha é dizer que 'camada de aplicação' significa o software inteiro, ou que o OSI obriga sete protocolos individuais. O OSI classifica funções; a pilha Internet costuma agrupar sessão e apresentação dentro das atividades de aplicação.",
    "caseTitle": "Qual endereço muda ao passar por um roteador?",
    "caseSteps": [
      "O PC `192.168.10.20` solicita serviço do IP `192.168.30.20`, fora de sua rede local.",
      "Ele entrega o primeiro quadro ao MAC do gateway; dentro do quadro, o pacote IP ainda indica o IP do servidor remoto.",
      "O roteador encaminha o pacote e prepara novo quadro para o próximo enlace, com novos endereços MAC pertinentes.",
      "Conclua que o quadro muda ao longo do caminho, mas o destino IP do pacote permanece o servidor, salvo tradução configurada."
    ],
    "pitfalls": [
      "Quadro Ethernet e pacote IP são unidades diferentes e têm informações diferentes.",
      "Endereço MAC do primeiro quadro não precisa ser o MAC do servidor remoto.",
      "O roteador não precisa decodificar a página HTTP para escolher rota IP.",
      "Desencapsular não é 'remover segurança'; é interpretar os dados segundo cada camada."
    ],
    "cards": [
      [
        "O que significa encapsular?",
        "Adicionar informações necessárias a cada camada para transportar o conteúdo da camada superior."
      ],
      [
        "O que é um quadro Ethernet?",
        "Uma unidade de enlace que transporta dados naquele trecho local com informações como endereços MAC."
      ],
      [
        "Por que o MAC do quadro muda em diferentes enlaces?",
        "Porque cada enlace possui seus próprios participantes locais e o roteador cria quadros adequados ao próximo trecho."
      ],
      [
        "Qual é a diferença entre quadro e pacote IP?",
        "O quadro atende ao enlace local; o pacote IP inclui informações para endereçamento e encaminhamento entre redes."
      ]
    ]
  },
  {
    "id": 92,
    "title": "Subnetting e VLSM: criando redes do tamanho certo",
    "goal": "Calcular prefixos e dividir um bloco IPv4 em sub-redes de tamanhos distintos, entendendo os limites de cada bloco.",
    "context": "Imagine um órgão com três setores: 60 computadores, 25 computadores e 10 computadores. O administrador recebeu o bloco IPv4 `192.168.50.0/24` e precisa dividi-lo sem sobrepor endereços. **Subnetting** é a subdivisão de um bloco em sub-redes menores; **VLSM** (*Variable Length Subnet Mask*) é o uso de máscaras de comprimentos diferentes para atender necessidades distintas. Em vez de oferecer 256 endereços a cada setor, escolhemos prefixos que acomodem cada grupo, reservando o espaço necessário ao roteamento e a possíveis expansões.",
    "explanation": "Comece pelo maior setor. Uma sub-rede `/26` possui `2^(32−26)=64` endereços, normalmente 62 para hosts em cenário convencional; ela atende aos 60 computadores. Reserve `192.168.50.0/26`, intervalo `.0` a `.63`. O próximo setor precisa de 25: uma `/27` possui 32 endereços, normalmente 30 utilizáveis; reserve `.64/27`, intervalo `.64` a `.95`. Para 10 computadores, uma `/28` possui 16 endereços, normalmente 14 utilizáveis; reserve `.96/28`, intervalo `.96` a `.111`. Repare que os blocos começam em fronteiras compatíveis com seu tamanho: não podemos iniciar um `/26` aleatoriamente em `.15`.\n\n**Como construir VLSM sem adivinhação.** VLSM significa usar máscaras de tamanhos diferentes na mesma faixa planejada. Suponha 192.168.10.0/24 e necessidades de 60, 25 e 12 hosts usuais. Ordene da maior para a menor: 60 exige 64 endereços (/26, com 62 hosts usuais), 25 exige 32 (/27, com 30) e 12 exige 16 (/28, com 14). Aloque 192.168.10.0/26 (0–63), depois 192.168.10.64/27 (64–95) e 192.168.10.96/28 (96–111). Cada rede começa em um múltiplo do tamanho de seu bloco. Nas faixas convencionais, rede e broadcast não entram na contagem dos hosts; lembre das exceções /31 e /32. Para provar que as sub-redes não se sobrepõem, compare limites completos, não apenas os primeiros octetos.",
    "connection": "A escolha do prefixo afeta **máscara**, **endereços utilizáveis**, **broadcast** e **roteamento**. Ela não instala um firewall nem permite automaticamente comunicação entre redes. Também se relaciona à **sumarização**, quando várias rotas contíguas e alinhadas podem ser representadas por um prefixo agregado, reduzindo entradas na tabela de roteamento. Porém sumarizar sem respeitar alinhamento pode anunciar destinos que não pertencem ao conjunto desejado.",
    "exam": "O erro mais comum é dividir primeiro em blocos iguais e perceber depois que não cabem todas as demandas. Ordene setores por quantidade de hosts, calcule a menor potência de dois que comporta cada demanda considerando endereços reservados e aloque cada bloco em uma fronteira correta. Se o enunciado pedir '60 dispositivos', `/27` não basta: oferece normalmente 30 endereços utilizáveis. Não confunda `60` com o prefixo `/60`; este último é um tamanho de prefixo, não contagem de computadores.",
    "caseTitle": "Divida 192.168.50.0/24 em três sub-redes",
    "caseSteps": [
      "Para 60 hosts, escolha /26 (64 endereços, 62 utilizáveis); reserve `192.168.50.0–63`.",
      "Para 25 hosts, escolha /27 (32 endereços, 30 utilizáveis); reserve `192.168.50.64–95`.",
      "Para 10 hosts, escolha /28 (16 endereços, 14 utilizáveis); reserve `192.168.50.96–111`.",
      "Verifique que não há sobreposição e que as fronteiras dos blocos são válidas; o restante do /24 continua disponível."
    ],
    "pitfalls": [
      "VLSM permite prefixos diferentes; não significa endereços sobrepostos.",
      "Um bloco IPv4 deve começar em fronteira compatível com seu tamanho.",
      "`2^h` conta endereços totais; hosts utilizáveis dependem das regras do prefixo.",
      "Roteamento e firewall são configurações distintas da divisão de sub-redes."
    ],
    "cards": [
      [
        "Por que VLSM economiza endereços?",
        "Porque permite escolher blocos de tamanhos diferentes conforme as necessidades de cada sub-rede."
      ],
      [
        "Quantos hosts convencionais cabem num /27?",
        "Até 30, pois 5 bits livres geram 32 endereços, dos quais rede e broadcast são normalmente reservados."
      ],
      [
        "Por qual setor começar um planejamento VLSM?",
        "Normalmente pelo grupo que precisa de mais endereços, alocando primeiro o maior bloco."
      ],
      [
        "O que garante que duas sub-redes VLSM não se sobreponham?",
        "Alocar intervalos disjuntos e respeitar as fronteiras de cada prefixo."
      ]
    ]
  },
  {
    "id": 93,
    "title": "Diagnóstico integrado: DNS, DHCP, TCP e UDP trabalham juntos",
    "goal": "Identificar o serviço responsável por cada sintoma e escolher testes que realmente comprovem uma hipótese.",
    "context": "Um funcionário relata 'a Internet não funciona'. Essa frase é um sintoma, não um diagnóstico. A estação pode estar sem endereço IP, sem rota, com DNS errado, com serviço remoto indisponível ou com acesso bloqueado por firewall. Para investigar, precisamos distinguir o que cada componente faz. **DHCP** entrega parâmetros automáticos como IP, gateway e DNS; **DNS** resolve nomes; **IP** endereça e permite encaminhamento; **TCP** ou **UDP** transportam comunicação entre processos com propriedades diferentes. A aplicação responde, ou não, ao pedido final.",
    "explanation": "Organize testes do mais básico ao mais específico. Verifique os parâmetros IP recebidos com `ipconfig /all` no Windows ou ferramentas como `ip addr` no Linux. Depois avalie alcance local e rota, lembrando que **ping** utiliza ICMP e pode ser bloqueado mesmo quando um serviço está acessível. Teste resolução DNS com `nslookup` ou `dig`. Por fim, teste a porta e o serviço de aplicação, por exemplo com uma requisição HTTP adequada. Evite interpretar um único teste como garantia universal de funcionamento.\n\n**Separe as etapas no diagnóstico.** Primeiro o DHCP pode fornecer IP, máscara, gateway e servidores DNS: no IPv4 clássico, o fluxo DORA significa Discover, Offer, Request e Acknowledge. Um computador também pode receber endereço por configuração estática. Em seguida a rota decide se o destino está diretamente conectado ou se precisa do gateway; ARP resolve o MAC do próximo salto em IPv4 local. DNS converte o nome para endereço quando necessário. Por fim, o transporte abre comunicação apropriada: TCP costuma negociar SYN, SYN-ACK e ACK; UDP não estabelece essa conexão. Para localizar falhas, compare resultados: ping ao gateway testa parte da conectividade IP/ICMP, nslookup consulta DNS, e uma conexão à porta do serviço testa o caminho para aquele serviço. Nem ping bem-sucedido prova que o aplicativo funciona, nem ausência de resposta ICMP prova que ele caiu.",
    "connection": "TCP estabelece um fluxo ordenado de bytes com mecanismos de confirmação e retransmissão; UDP transporta datagramas sem essas garantias embutidas. Uma aplicação DNS pode usar UDP ou TCP conforme tamanho, resposta e contexto. Um erro DNS não significa que 'UDP caiu'; uma falha na abertura de uma conexão TCP pode ocorrer porque o servidor não atende naquela porta ou porque alguma política bloqueia o tráfego. O objetivo é usar protocolos como peças do diagnóstico, não como siglas decoradas.",
    "exam": "Se o IP funciona e o nome falha, comece pelo DNS. Se há IP `169.254.x.x` autoconfigurado em IPv4, investigue ausência de concessão DHCP válida naquele cenário. Se o gateway responde, mas a porta HTTP não abre, isso não prova disponibilidade do serviço. A banca pode inserir alternativas com comandos corretos para sintomas errados; a técnica é perguntar **qual hipótese o comando testa e qual resultado confirmaria ou enfraqueceria essa hipótese?**",
    "caseTitle": "O sistema funciona por IP, mas o endereço de nome falha",
    "caseSteps": [
      "Registre que `http://192.168.30.20` abre: o computador alcançou o serviço web usando o IP informado.",
      "O acesso `http://sistema.interno` falha: a principal diferença está na necessidade de resolver um nome.",
      "Consulte `nslookup sistema.interno` e compare o endereço retornado com o IP conhecido; confira qual servidor DNS está sendo usado.",
      "Se a resposta DNS estiver ausente ou apontar outro IP, priorize configuração/resolução de nomes, não a troca do cabo."
    ],
    "pitfalls": [
      "Ping bem-sucedido não prova que HTTP ou outro serviço está disponível.",
      "DNS e DHCP são serviços diferentes, embora o DHCP possa informar endereços de servidores DNS.",
      "TCP e UDP possuem garantias diferentes; nenhum substitui o roteamento IP.",
      "Um comando só é útil quando sabemos qual hipótese ele está verificando."
    ],
    "cards": [
      [
        "O que `ipconfig /all` ajuda a verificar?",
        "Parâmetros de configuração da rede no Windows, como IP, máscara, gateway e DNS."
      ],
      [
        "O que ping bem-sucedido demonstra?",
        "Que houve resposta ao ICMP daquele destino no teste, não que qualquer aplicação esteja funcionando."
      ],
      [
        "DNS usa exclusivamente UDP?",
        "Não. Pode usar UDP ou TCP conforme a consulta, resposta e condições."
      ],
      [
        "Se o nome falha e o IP funciona, por onde começar?",
        "Pela resolução DNS e pelo servidor de nomes configurado para a estação."
      ]
    ]
  },
  {
    "id": 118,
    "title": "ARP e tabela MAC: como um quadro encontra a interface local",
    "goal": "Explicar passo a passo a descoberta do MAC de um vizinho e como um switch aprende por qual porta encaminhar quadros.",
    "context": "O computador sabe que o gateway possui IP `192.168.1.1`, mas precisa transmitir um quadro Ethernet para a interface local do gateway. O **IP** identifica o destino de rede; o **MAC** é a identificação usada na entrega do enlace Ethernet. Como descobrir o MAC correspondente ao endereço IPv4 do próximo destinatário? O **ARP** (*Address Resolution Protocol*) atende a esse problema em redes IPv4 Ethernet, permitindo perguntar qual interface local responde por determinado endereço IP.",
    "explanation": "Quando não há entrada válida no cache ARP, o computador pode enviar um **ARP Request** em broadcast no enlace local, perguntando quem possui o IPv4 desejado. A interface apropriada responde com um **ARP Reply**, informando seu MAC. O computador então pode preparar o quadro destinado a esse endereço. O **switch**, por sua vez, aprende associações de **MAC de origem → porta física** ao receber quadros e usa sua tabela MAC para encaminhar para a porta conhecida do destinatário. São dois processos distintos: ARP relaciona IPv4 e MAC; o switch aprende por onde os MACs aparecem.\n\n**ARP e switch não executam a mesma função.** Para enviar IPv4 a um IP local ainda desconhecido, uma estação pode difundir ARP Request em um quadro Ethernet com destino FF:FF:FF:FF:FF:FF, perguntando qual interface possui aquele IPv4. Quem detém o IP pode responder com seu MAC, e o solicitante guarda a associação IP↔MAC por um período na cache ARP. Já a tabela MAC do switch relaciona MAC de origem visto em quadros a uma porta e VLAN; não é uma tabela IP↔MAC do cliente. Quando o destino do quadro é desconhecido, um switch costuma fazer flooding nas portas adequadas da VLAN, exceto a de entrada. A aprendizagem e o envelhecimento variam por equipamento. ARP opera com IPv4; no IPv6, Neighbor Discovery emprega ICMPv6 para funções correspondentes. ARP sem proteção é suscetível a falsificação.",
    "connection": "Se o destino IPv4 está em outra sub-rede, o computador não precisa descobrir o MAC do servidor remoto: ele normalmente prepara a entrega Ethernet ao **MAC do gateway** no enlace local, mantendo o IP remoto no pacote. Isso é consequência da separação entre camada de enlace e camada de rede. O ARP tradicional refere-se ao IPv4; no IPv6 a descoberta de vizinhos utiliza mecanismos como **Neighbor Discovery** com ICMPv6, não o mesmo protocolo ARP.",
    "exam": "Um item pode afirmar que a **tabela ARP do host** e a **tabela MAC do switch** são a mesma coisa. Não são. Uma relaciona IPv4 a MAC; a outra relaciona MAC a porta de switch. Outro erro é dizer que o switch aprende MAC pelo endereço de destino dos quadros: o aprendizado básico usa **origem**. Se o switch não conhece o destino, pode inundar o quadro em portas elegíveis da VLAN conforme as regras de encaminhamento.",
    "caseTitle": "Quem responde por 192.168.1.1 na rede local?",
    "caseSteps": [
      "A estação `192.168.1.50/24` precisa alcançar um servidor fora da sub-rede e identifica o gateway `192.168.1.1`.",
      "Sem MAC em cache para o gateway, emite pergunta ARP local; a interface do gateway responde com seu MAC.",
      "A estação constrói quadro Ethernet destinado ao MAC do gateway, contendo pacote IP do servidor remoto.",
      "O switch aprende a porta pela origem do quadro e encaminha conforme sua tabela; o roteador depois encaminha IP à outra rede."
    ],
    "pitfalls": [
      "ARP liga IPv4 e MAC; tabela MAC do switch liga MAC e porta física.",
      "O switch aprende a localização do MAC de origem, não apenas do destino.",
      "O MAC usado no primeiro salto externo é normalmente o do gateway.",
      "ARP tradicional não é o mecanismo de descoberta de vizinhos do IPv6."
    ],
    "cards": [
      [
        "O que ARP descobre numa rede IPv4 Ethernet?",
        "O endereço MAC associado a um IPv4 do próximo destinatário no enlace local."
      ],
      [
        "Como um switch aprende sua tabela MAC?",
        "Observando os endereços MAC de origem de quadros recebidos e associando-os às portas."
      ],
      [
        "Por que ARP não procura diretamente o MAC do servidor remoto?",
        "Porque o próximo destinatário no enlace local é normalmente o gateway que encaminhará o pacote IP."
      ],
      [
        "Qual mecanismo é usado no IPv6 para descobrir vizinhos?",
        "Neighbor Discovery, baseado em mensagens ICMPv6, em vez do ARP tradicional do IPv4."
      ]
    ]
  },
  {
    "id": 119,
    "title": "TCP: fluxo do receptor versus congestionamento da rede",
    "goal": "Entender por que TCP limita o envio com duas janelas diferentes e como perdas ou capacidade do receptor influenciam a velocidade.",
    "context": "Imagine alguém enviando centenas de caixas para um depósito. Mesmo que a estrada esteja vazia, o depósito não consegue receber infinitas caixas de uma vez. E mesmo que o depósito tenha espaço, a estrada pode estar congestionada. O TCP enfrenta dois problemas parecidos: **controle de fluxo**, relacionado ao quanto o receptor consegue aceitar, e **controle de congestionamento**, relacionado ao comportamento e à capacidade do caminho da rede. Ambos podem limitar os dados que ficam em trânsito sem confirmação.",
    "explanation": "O **controle de fluxo** utiliza uma janela anunciada pelo receptor, frequentemente chamada **rwnd** (*receive window*), informando espaço de recepção disponível. O **controle de congestionamento** utiliza mecanismos e uma janela de congestionamento do emissor (**cwnd**), ajustada conforme eventos e sinais sobre a rede. Simplificando, o emissor respeita o limite mais restritivo entre essas janelas, sem ignorar outros limites de implementação. Um **ACK** é uma confirmação TCP que informa recepção de bytes segundo as regras do protocolo; isso não equivale a confirmação de uma transação de banco ou de uma compra no aplicativo.\n\n**Diferencie os dois controles do TCP.** Controle de fluxo protege o receptor: o campo de janela anunciada (receive window, rwnd) informa quanto dado ele está pronto para receber. Controle de congestionamento protege a rede: o transmissor mantém uma janela de congestionamento (cwnd) ajustada conforme sinais de congestionamento, perdas e o algoritmo em uso. De forma simplificada, a quantidade em voo é limitada pelo menor de rwnd e cwnd. ACK confirma dados recebidos; número de sequência identifica posições no fluxo de bytes, não uma sequência obrigatoriamente de pacotes inteiros. Retransmissões podem ocorrer após temporizador ou indícios de perda; transferência TCP confiável não significa atraso constante. A negociação inicial típica SYN → SYN/ACK → ACK estabelece parâmetros da conexão. TLS, quando empregado, protege a aplicação acima do TCP; o TCP sozinho não cifra o conteúdo.",
    "connection": "Quando um aplicativo lê dados lentamente, o receptor pode anunciar janela pequena para evitar excesso de informação no buffer de recepção. Isso não prova que a Internet está congestionada. Quando há perda de pacotes ou sinais associados a congestionamento, o remetente pode reduzir seu ritmo por razões de caminho, mesmo que o receptor tenha espaço. A diferença é essencial para investigar gargalos: aumentar memória do receptor não corrige automaticamente perda de rede, assim como trocar roteador não resolve sozinho aplicativo que não consome dados.",
    "exam": "A banca pode dar **rwnd = 4 KB** e **cwnd = 32 KB** e perguntar qual restrição prevalece. O fluxo para o receptor é o limite dominante nesse cenário simplificado; não é adequado dizer que os 32 KB podem ser transmitidos independentemente do receptor. Também pode afirmar que ACK garante que o aplicativo processou dados; na verdade, ACK TCP confirma progresso do transporte, não necessariamente o efeito de negócio.",
    "caseTitle": "O emissor pode enviar 40 KB sem aguardar ACK?",
    "caseSteps": [
      "O receptor anuncia janela de 8 KB e o emissor possui cwnd de 40 KB.",
      "A janela do receptor é menor; o emissor precisa respeitar capacidade de recepção, não apenas condição do caminho.",
      "Nesse cenário simplificado, o limite dominante é 8 KB de dados pendentes no fluxo, antes de novas confirmações/avanços.",
      "Conclua que rwnd protege o receptor, enquanto cwnd reage à rede; não se pode somar 8+40 KB."
    ],
    "pitfalls": [
      "rwnd representa capacidade anunciada do receptor; cwnd está ligada ao controle de congestionamento.",
      "O menor limite relevante pode restringir o envio independentemente da outra janela.",
      "ACK TCP confirma transporte de bytes, não conclusão da operação da aplicação.",
      "Janela pequena não prova por si só que o roteador está congestionado."
    ],
    "cards": [
      [
        "O que é rwnd no TCP?",
        "Janela anunciada pelo receptor que ajuda a limitar o envio segundo a capacidade de recepção."
      ],
      [
        "O que representa cwnd?",
        "Limite do emissor associado aos mecanismos de controle de congestionamento da rede."
      ],
      [
        "Se rwnd é menor que cwnd, qual restrição tende a prevalecer?",
        "A janela do receptor, no cenário simplificado de dados pendentes de confirmação."
      ],
      [
        "ACK TCP confirma o pagamento ou a gravação no banco?",
        "Não. Confirma progresso da transferência de bytes no transporte, não o efeito de negócio da aplicação."
      ]
    ]
  },
  {
    "id": 120,
    "title": "Roteamento estático e dinâmico: como escolher o próximo salto",
    "goal": "Diferenciar rota, tabela de roteamento, rota padrão, prefixo mais específico e informações aprendidas dinamicamente.",
    "context": "Um roteador liga diferentes redes IP. Quando recebe um pacote, precisa decidir **para qual próximo equipamento ou interface enviá-lo**. Esse processo é o **roteamento**. O roteador consulta sua **tabela de roteamento**, conjunto de informações sobre destinos alcançáveis, prefixos e próximos saltos. O próximo salto é a interface ou roteador para o qual o pacote será encaminhado naquele trecho; ele não é necessariamente o destino final.",
    "explanation": "Uma **rota estática** é configurada deliberadamente por um administrador e permanece conforme essa configuração. Um **protocolo de roteamento dinâmico** ajuda roteadores a trocar informações e aprender rotas conforme a topologia, como OSPF em redes IP adequadas. Para escolher entre rotas cujos prefixos cobrem o IP de destino, a regra fundamental é **maior prefixo específico** (*longest prefix match*). Uma rota `10.20.30.0/24` é mais específica do que `10.20.0.0/16` para o destino `10.20.30.50`. A **rota padrão** `0.0.0.0/0` é o caminho residual para destinos não contemplados por algo mais específico.\n\n**O roteador escolhe por prefixo, não pela proximidade visual do IP.** Uma tabela de rotas contém prefixo de destino, próximo salto, interface de saída e frequentemente métricas/preferências. A regra central é a correspondência de prefixo mais longo: 10.1.2.0/24 é mais específica que 10.1.0.0/16 para um destino 10.1.2.40. Rota estática é configurada administrativamente; protocolos dinâmicos, como OSPF, trocam informações para descobrir caminhos. OSPF é do tipo link-state e calcula caminhos sobre uma visão de topologia; BGP seleciona rotas entre sistemas autônomos com políticas, não apenas o menor número de roteadores. A rota padrão 0.0.0.0/0 cobre destinos IPv4 sem rota mais específica. Se não houver rota válida, o roteador não tem como encaminhar corretamente aquele pacote.",
    "connection": "Esse mecanismo se conecta ao cálculo de sub-redes: o prefixo delimita exatamente quais IPs uma rota representa. O roteador não consulta 'qual nome DNS o usuário digitou' para escolher o próximo salto IP; ele compara o endereço de destino e sua tabela. A presença da rota também não garante permissão pelo firewall, nem garante que a aplicação esteja ativa. A rota de retorno pode ser tão importante quanto a ida, porque comunicação usual precisa que respostas encontrem caminho ao cliente.",
    "exam": "Considere três entradas: `0.0.0.0/0`, `10.20.0.0/16` e `10.20.30.0/24`. Para `10.20.30.50`, a /24 é selecionada por maior especificidade quando as rotas são válidas e aplicáveis. Não escolha a padrão só porque está primeiro na lista ou possui número menor. A questão pode pedir diferença entre **métrica** e **prefixo**; a escolha por prefixo mais específico ocorre antes das comparações entre rotas equivalentes segundo regras da implementação.",
    "caseTitle": "Qual rota atende 10.20.30.50?",
    "caseSteps": [
      "A tabela contém `0.0.0.0/0` via A, `10.20.0.0/16` via B e `10.20.30.0/24` via C.",
      "O destino pertence às três faixas: rota padrão cobre qualquer IPv4, /16 cobre 10.20.*, /24 cobre 10.20.30.*.",
      "O prefixo /24 é o mais específico e representa o menor conjunto dos três que contém o destino.",
      "O roteador encaminha pelo próximo salto da rota /24, se válida, não necessariamente pela entrada mais antiga."
    ],
    "pitfalls": [
      "Rota padrão é usada quando não há rota mais específica aplicável.",
      "Uma rota estática não detecta automaticamente todas as mudanças de topologia.",
      "Prefixo mais longo é mais específico, não necessariamente representa mais hosts.",
      "Ter rota não é a mesma coisa que ter autorização ou serviço disponível."
    ],
    "cards": [
      [
        "Para que serve a tabela de roteamento?",
        "Para escolher interfaces e próximos saltos usados ao encaminhar pacotes IP a determinados prefixos."
      ],
      [
        "Qual a diferença entre rota estática e dinâmica?",
        "Estática é configurada; dinâmica pode ser aprendida e atualizada por protocolo de roteamento."
      ],
      [
        "Qual rota é preferida para 10.20.30.50: /16 ou /24?",
        "A rota /24, pois contém o destino e apresenta maior prefixo específico."
      ],
      [
        "Qual o papel de 0.0.0.0/0?",
        "É a rota padrão de IPv4, que cobre destinos sem rota mais específica disponível."
      ]
    ]
  },
  {
    "id": 121,
    "title": "DNS recursivo, autoritativo e cache: siga uma pergunta completa",
    "goal": "Reconhecer o papel de um resolvedor, servidor autoritativo, zona e cache, sem confundir consulta DNS com acesso ao site.",
    "context": "Quando você pergunta pelo IP de `www.exemplo.org`, a resposta pode vir de uma memória temporária ou de uma sequência de consultas a diferentes servidores. Essa é a razão de o DNS ser organizado de forma distribuída. Um **resolvedor recursivo** recebe a consulta do cliente e busca a resposta em seu nome quando necessário. Um **servidor autoritativo** disponibiliza dados da **zona** sob sua responsabilidade, que é a parte do espaço de nomes administrada por aquela autoridade.",
    "explanation": "Se a resposta ainda não está no cache, o resolvedor pode consultar servidores de referência e seguir **delegações**: indicações de quais servidores conhecem determinada parte do domínio. Ele avança até receber informação autoritativa ou outra resposta aplicável. Ao devolver o resultado ao cliente, pode guardá-lo em **cache** pelo período permitido pelo **TTL** (*Time To Live*). Esse cache economiza consultas, mas significa que uma alteração feita agora pode demorar a aparecer para todos os clientes que ainda possuem a informação anterior dentro do prazo.\n\n**Resolva a distinção entre recursão e autoridade.** O resolvedor recursivo recebe do cliente a tarefa de obter uma resposta e pode consultar vários servidores. O servidor autoritativo responde pelos dados da zona que administra; não precisa fazer, para o cliente, a cadeia inteira de consultas. Servidores raiz apontam para infraestrutura do domínio de topo (.com, .br etc.), não mantêm todos os endereços de todos os sites. Caches guardam respostas durante o TTL, reduzindo consultas, mas podem manter informação antiga até a expiração. CNAME indica um nome alternativo e pode exigir seguir outro nome; registro A é um endereço IPv4 e AAAA um IPv6. DNSSEC autentica dados DNS com assinaturas verificáveis quando corretamente implantado, mas não cifra as consultas. DoH e DoT protegem o transporte da consulta para o resolvedor, mas não substituem DNSSEC.",
    "connection": "O **servidor autoritativo** e o **resolvedor recursivo** exercem papéis diferentes: um mantém respostas de sua zona; o outro busca resultados em nome do cliente. Esses papéis podem conviver em produtos, mas não devem ser confundidos na prova. Registros **A** relacionam nome e IPv4; **AAAA**, nome e IPv6; **NS**, delegação/autoridade; **MX**, destino para recebimento de e-mail. O DNS pode usar UDP ou TCP conforme o contexto, e a resolução não substitui conectividade IP até o servidor da aplicação.",
    "exam": "A banca pode dizer que atualizar o registro autoritativo faz todos os usuários enxergarem imediatamente o novo IP. Isso ignora **TTL e cache**. Também pode afirmar que servidor recursivo é sempre o proprietário da zona consultada; não é obrigatório. Em questão de diagnóstico, compare a resposta obtida do resolvedor utilizado pelo cliente com a informação autoritativa antes de concluir se o problema é DNS, rota ou aplicativo.",
    "caseTitle": "O DNS está atualizado, mas alguns computadores usam o IP antigo",
    "caseSteps": [
      "O administrador modifica o registro A de `sistema.exemplo.org` para novo IPv4 no servidor autoritativo.",
      "Alguns resolvedores ainda possuem em cache a resposta antiga cujo TTL não expirou.",
      "Consulte o resolvedor efetivamente usado pelo cliente e compare com o dado autoritativo; observe a validade da informação armazenada.",
      "Conclua que diferentes clientes podem ver respostas temporariamente distintas sem que o novo registro tenha sido gravado incorretamente."
    ],
    "pitfalls": [
      "Autoritativo mantém dados de zona; recursivo busca respostas para clientes.",
      "TTL controla duração da informação em cache; não é prazo de certificado TLS.",
      "Alteração autoritativa não invalida instantaneamente todos os caches existentes.",
      "DNS informa dados de nomes e não garante que o serviço de aplicação esteja acessível."
    ],
    "cards": [
      [
        "O que faz um resolvedor DNS recursivo?",
        "Busca a resposta em nome do cliente, usando cache ou consultando outros servidores quando necessário."
      ],
      [
        "O que é servidor DNS autoritativo?",
        "Aquele responsável por disponibilizar os dados de uma zona de nomes sob sua autoridade."
      ],
      [
        "Por que alguns computadores enxergam um IP antigo depois de uma mudança?",
        "Porque resolvedores podem ter armazenado respostas anteriores em cache durante o TTL permitido."
      ],
      [
        "Qual registro aponta servidores de e-mail?",
        "MX, que identifica destinos de recebimento de correio do domínio."
      ]
    ]
  },
  {
    "id": 152,
    "title": "Oficina de diagnóstico: isole DNS, firewall e aplicativo",
    "goal": "Construir uma investigação reproduzível a partir do sintoma e evitar alterar configurações sem evidência.",
    "context": "Um usuário diz 'não abre' e o suporte imediatamente reinicia roteadores. Esse comportamento pode piorar a situação. Uma investigação de redes deve primeiro registrar **o que funciona**, **o que falha** e **o que mudou**. Para isso, distinga rede local, endereçamento, roteamento, resolução de nomes e serviço da aplicação. O objetivo de uma oficina não é repetir toda a teoria, mas colocá-la em ordem de decisão para encontrar a causa com menos tentativas arriscadas.",
    "explanation": "Se não há conectividade física, teste interface, cabo e enlace. Se há enlace, confirme IP e máscara. Se o destino está em outra sub-rede, verifique gateway e rotas. Para nomes, teste **DNS** separadamente de IP. Para um serviço, teste a **porta lógica** e a resposta da aplicação: um ping responde por ICMP e não certifica que HTTPS esteja funcionando. Cada comando deve ter uma hipótese declarada e um resultado esperado; anote o que foi verificado antes de modificar firewall ou DNS.\n\n**Matriz de teste, da causa mais básica à aplicação.** Anote IP, prefixo, gateway, DNS e horário. Verifique se a interface tem link e se o endereço corresponde à rede esperada. Teste alcance do gateway sem confundir ICMP filtrado com indisponibilidade geral. Consulte explicitamente o DNS configurado e compare nome versus IP: se conexão por IP funciona e por nome falha, investigue DNS; se a resolução está correta e TCP/443 falha, observe rota, firewall, serviço e escuta da porta. Quando TCP abre mas HTTP retorna 401/403, concentre-se em autenticação/autorização, não em cabeamento. HTTP 502/503 pode indicar problemas em proxy ou aplicação. Não mude várias configurações ao mesmo tempo: registre hipótese, teste, resultado e próximo passo, para preservar a causa observável.",
    "connection": "Uma falha de login ocorre **após** a aplicação receber o pedido e pode ser de autenticação ou autorização. Uma resposta HTTP `403` não é a mesma coisa que perda de pacote no roteador. Da mesma forma, uma resposta DNS correta não comprova conexão à porta 443. Organizar o teste por camadas não significa que cada problema tem causa em exatamente uma camada, mas ajuda a evitar conclusões absurdas como culpar o cabo quando a aplicação está respondendo com erro de permissão.",
    "exam": "Em questões de troubleshooting, compare evidências antes de escolher a ação. Se o IP da aplicação abre e o nome falha, investiga-se DNS. Se o nome resolve corretamente, mas a conexão à porta é recusada, investigam-se serviço, firewall e disponibilidade da porta. Se a página abre, mas retorna 'acesso negado', investigam-se credenciais e permissões. A alternativa 'desabilitar todo o firewall' raramente é aceitável como primeira medida quando a banca pede procedimento seguro e proporcional.",
    "caseTitle": "Classifique três sintomas sem confundir serviços",
    "caseSteps": [
      "Teste A: URL por IP abre, mas por nome não. A diferença central é resolução DNS; consulte o nome e o resolvedor usado.",
      "Teste B: nome resolve para IP correto, mas porta TCP 443 não responde. Analise serviço, porta e regras de rede.",
      "Teste C: HTTPS retorna 403 para usuário autenticado. Há resposta de aplicação; investigue autorização/perfis.",
      "Documente cada hipótese e resultado, altere apenas a configuração pertinente e confirme que a correção resolveu o sintoma."
    ],
    "pitfalls": [
      "Ping com sucesso não prova HTTP nem banco disponível.",
      "Resposta DNS válida não garante rota nem porta liberada.",
      "HTTP 403 é recusa de aplicação; não deve ser tratado como ausência de cabo.",
      "Mudar muitas variáveis de uma vez dificulta identificar qual alteração corrigiu a falha."
    ],
    "cards": [
      [
        "Qual é a primeira pergunta numa investigação de rede?",
        "O que funciona e o que falha exatamente, incluindo escopo, horário e mudanças anteriores."
      ],
      [
        "O que investigar quando IP funciona e nome falha?",
        "DNS e resposta do resolvedor, pois a diferença observada é a resolução de nomes."
      ],
      [
        "O que um HTTP 403 indica no diagnóstico?",
        "Que o pedido chegou à aplicação e foi recusado, frequentemente por autorização."
      ],
      [
        "Por que testar uma hipótese por vez?",
        "Porque permite relacionar cada evidência à causa provável e evitar correções sem controle."
      ]
    ]
  },
  {
    "id": 153,
    "title": "Oficina de rotas e sumarização: por que o próximo salto importa",
    "goal": "Dividir prefixos e decidir rotas mais específicas sem confundir sumarização com permissão de firewall.",
    "context": "Uma instituição possui várias sub-redes. O administrador precisa evitar tabelas de roteamento gigantes, mas não pode anunciar destinos que levam ao lugar errado. **Sumarização de rotas** significa representar conjuntos de redes contíguas e alinhadas por um prefixo menos específico. Uma **rota** informa ao equipamento qual próximo caminho usar para determinado conjunto de endereços IP. Ao planejar a infraestrutura, a escolha dos prefixos depende de onde os endereços começam e de quantos bits compartilham, não apenas de nomes de departamentos.",
    "explanation": "Por exemplo, as redes `192.168.10.0/25` e `192.168.10.128/25` são duas metades contíguas de um mesmo `/24`; podem ser representadas pelo agregado `192.168.10.0/24` quando a topologia e o controle do anúncio permitem. Já duas redes separadas por outros prefixos não podem ser resumidas arbitrariamente sem incluir endereços não pretendidos. O roteador, ao receber pacote, procura entre rotas aplicáveis a entrada com **prefixo mais específico**. Uma rota /25 pode prevalecer sobre uma rota agregada /24 para um destino que esteja dentro de ambas.\n\n**Percorra rotas e sumarização com bits.** Uma rede 192.168.4.0/24 junto de 192.168.5.0/24 pode ser representada por 192.168.4.0/23, porque os 23 bits iniciais são comuns e o terceiro octeto cobre os valores 4 e 5. Mas só anuncie a sumarização se os dois blocos e seus caminhos realmente forem coerentes; caso contrário, pode ocorrer blackhole, descarte de tráfego destinado a endereço sem rota interna. Na decisão do roteador, uma rota /24 continua mais específica que a /23 e vence a correspondência por prefixo mais longo para os destinos daquela /24, independentemente de métricas entre prefixos diferentes. Traceroute usa TTL/Hop Limit e respostas de intermediários para revelar parte do caminho, mas firewalls, caminhos assimétricos e regras de resposta tornam o resultado parcial.",
    "connection": "Esse raciocínio une **subnetting**, que divide o espaço de IPs em blocos menores, a **sumarização**, que pode agrupar anúncios para roteamento. Não confunda 'agrupar rotas' com 'unir VLANs': VLAN define domínios de enlace, enquanto a sumarização descreve destinos IP. Também não conclua que uma rota alcançável permite todo acesso: firewall e política da aplicação permanecem distintos.",
    "exam": "A banca pode pedir o resumo de duas redes /25 contíguas e oferecer /23, /24 e /26. O /23 abrange endereços extras, o /26 não cobre ambas, e o /24 é o resumo exato das duas metades. Em alternativa de roteamento, o fato de existir um resumo /24 não faz o roteador ignorar uma rota /25 mais específica que também cobre o destino. Faça duas perguntas separadas: **quais endereços o prefixo representa?** e **qual rota aplicável é a mais específica?**",
    "caseTitle": "Resuma duas redes /25 sem incluir endereços externos",
    "caseSteps": [
      "A rede `192.168.10.0/25` cobre `.0–.127`; a rede `192.168.10.128/25` cobre `.128–.255`.",
      "A união cobre exatamente todos os 256 endereços de `192.168.10.0/24`, alinhados a um único bloco /24.",
      "O resumo é `192.168.10.0/24`, desde que a topologia e a política de anúncio justifiquem sua utilização.",
      "Se também existir uma rota `192.168.10.128/25` válida, ela será mais específica para destinos `.128–.255` que o agregado /24."
    ],
    "pitfalls": [
      "Sumarização só é exata para blocos contíguos e alinhados ao prefixo resultante.",
      "Rota mais específica prevalece sobre agregada quando ambas são aplicáveis.",
      "Sumarizar rotas não cria VLAN nem substitui firewall.",
      "Um prefixo excessivamente amplo pode anunciar endereços que não deveriam ser encaminhados por aquele caminho."
    ],
    "cards": [
      [
        "O que é sumarização de rotas?",
        "Representar redes contíguas e alinhadas por um prefixo agregado, quando a topologia permite."
      ],
      [
        "Qual é o resumo exato de dois blocos /25 adjacentes que formam um /24?",
        "O bloco /24 correspondente, pois abrange as duas metades sem acrescentar outro /24."
      ],
      [
        "Rota /25 e /24 cobrem o mesmo destino: qual é a mais específica?",
        "A /25, por ter mais bits de rede fixados e representar um subconjunto menor."
      ],
      [
        "Sumarização dispensa firewall?",
        "Não. Rotas definem caminhos; políticas de segurança continuam podendo restringir acessos."
      ]
    ]
  }
] satisfies EditorialSeed[])
