import type {PedagogicalLesson} from './intro1'
/** Continuação de Redes: cada termo nasce de um problema já conhecido. */
export const beginnerNetworkNext:Record<number,Partial<PedagogicalLesson>>={
  "2": {
    "id": 2,
    "title": "Endereços IP, máscara e DNS: como achar outro computador",
    "goal": "Entender o que é um endereço IPv4, por que existe uma máscara de rede, quando usar o gateway e como DNS e DHCP trabalham juntos, antes de começar os cálculos de sub-redes.",
    "steps": [
      {
        "title": "Por que cada equipamento precisa de um endereço?",
        "body": "Imagine uma empresa com vinte computadores ligados à rede. Se um deles quer enviar dados a outro, precisa indicar **qual é o destino**. Um **endereço IP** serve a esse endereçamento lógico: é como uma referência para localizar a interface que participará da comunicação. Em IPv4, ele costuma aparecer em quatro grupos de números, como `192.168.10.70`.\n\nAntes de falar em máscara, entenda duas palavras: um **bit** é um valor binário, `0` ou `1`. Um conjunto de **oito bits** é chamado de **octeto**. Um endereço IPv4 possui **32 bits**, divididos em quatro octetos; por isso há quatro partes separadas por pontos. Cada octeto representa um número de 0 a 255.\n\nUm IP não diz, sozinho, se o destino está na mesma rede local. Para resolver essa dúvida, a máquina precisa da **máscara**, que é o próximo conceito."
      },
      {
        "title": "O que a máscara realmente separa?",
        "body": "Pense em um endereço de rua: a cidade ajuda a agrupar ruas de uma região, enquanto o número da casa identifica algo dentro dela. De modo aproximado, o endereço IP também contém uma **parte de rede** e uma **parte usada para identificar endereços dentro dessa rede**. A máscara indica quantos bits pertencem à parte de rede.\n\nEm `192.168.10.70/24`, o sufixo **/24** significa que os primeiros 24 bits — os três primeiros octetos completos — identificam a rede. Essa notação é chamada de **prefixo**. A máscara escrita de forma tradicional é `255.255.255.0`. Com esse prefixo, endereços como `192.168.10.70` e `192.168.10.90` ficam na mesma sub-rede IPv4 convencional; já `192.168.20.90` está em outra.\n\n**Por que isso importa?** Antes de enviar um pacote, o computador compara o destino com sua própria rede. Se o endereço estiver fora dela, normalmente precisa utilizar um roteador como próximo caminho."
      },
      {
        "title": "Gateway: quando você precisa sair da rede local",
        "body": "O **gateway padrão** é, normalmente, o endereço IP da interface de um **roteador** na rede local. Um roteador conhece caminhos para outras redes e encaminha pacotes conforme sua tabela de roteamento. Ele funciona como um ponto de saída quando o destino não está diretamente alcançável pela rede local.\n\nExemplo: a estação `192.168.10.70/24` deseja falar com `192.168.30.20`. Como os prefixos de rede são diferentes, a estação normalmente envia o pacote ao gateway, por exemplo `192.168.10.1`. O gateway não vira o **destino final** da solicitação; é apenas o próximo equipamento que ajuda na viagem. Por isso IP do servidor e IP do gateway são coisas distintas.\n\nSe o gateway estiver incorreto, a máquina pode até falar com dispositivos da mesma rede local, mas falhar ao acessar outras redes."
      },
      {
        "title": "DNS e DHCP: dois serviços, dois problemas diferentes",
        "body": "Você prefere memorizar `portal.exemplo.com` a guardar um número como `203.0.113.20`. O **DNS** (*Domain Name System*) é o sistema que ajuda a relacionar **nomes** a informações como endereços IP. Assim, quando um aplicativo precisa localizar um serviço pelo nome, pode consultar o DNS. Um registro do tipo **A** fornece um endereço IPv4 associado ao nome; um tipo **AAAA** está relacionado a IPv6.\n\nJá o **DHCP** (*Dynamic Host Configuration Protocol*) resolve outro problema: **configurar automaticamente a estação**. Ele pode fornecer endereço IP, máscara, gateway e endereços de servidores DNS. Isso evita preencher tudo à mão em dezenas de computadores.\n\n**A relação entre eles:** o DHCP pode informar **qual servidor DNS consultar**, mas não substitui a função do DNS. Um computador pode receber IP corretamente por DHCP e, ainda assim, não conseguir abrir sites por nome porque está consultando um DNS inadequado."
      },
      {
        "title": "O primeiro cálculo de sub-rede, com todas as etapas",
        "body": "Agora que você sabe o que é prefixo, vamos estudar `192.168.10.70/26`. **/26** reserva 26 bits para identificar a sub-rede. Como IPv4 tem 32 bits, restam `32 − 26 = 6` bits para a parte final. Com 6 bits, há `2⁶ = 64` combinações de endereços nesse bloco.\n\nA máscara /26 é `255.255.255.192`. No último octeto, blocos de tamanho 64 começam em `0`, `64`, `128` e `192`: são os intervalos `0–63`, `64–127`, `128–191` e `192–255`. O número **70** está no intervalo `64–127`. Então a **rede** é `192.168.10.64` e o **broadcast**, nas sub-redes IPv4 convencionais com esse prefixo, é `192.168.10.127`.\n\n**Rede** é o endereço que identifica o bloco. **Broadcast** é o endereço usado para alcançar o conjunto de interfaces no segmento que utiliza esse mecanismo IPv4. Por isso, neste exemplo convencional, os endereços utilizáveis para estações vão de `.65` até `.126`. Mais importante do que decorar a resposta é saber **por que o tamanho do bloco era 64**."
      }
    ],
    "worked": {
      "title": "Uma estação abre o servidor pelo IP, mas não pelo nome: qual serviço falhou?",
      "body": "**Cenário:** uma estação recebeu `192.168.10.70/24`, gateway `192.168.10.1` e DNS `8.8.8.8`. Ela consegue abrir `http://192.168.30.20`, mas não abre `http://sistema.interno`.\n\n**Passo 1 — O acesso por IP funciona.** Isso torna menos provável, para esse caso, falha total de cabo, configuração de endereço ou roteamento.\n\n**Passo 2 — O que mudou?** No primeiro teste usamos um endereço IP. No segundo, usamos um **nome**, que precisa ser associado a um endereço.\n\n**Passo 3 — O que investigar?** O DNS configurado pode não conhecer o nome privado `sistema.interno`. Um servidor DNS público normalmente não conhece nomes internos da organização.\n\n**Passo 4 — O que testar?** Uma consulta com `nslookup sistema.interno` pode ajudar a verificar a resposta recebida. Se ela falhar, investigue a configuração DNS que foi entregue ou definida.\n\n**Conclusão:** o DHCP pode ter distribuído parâmetros corretamente, mas com um DNS inadequado ao ambiente. O erro observado é de **resolução de nomes**, não de cálculo de sub-rede."
    },
    "pitfalls": [
      "**Bit não é octeto.** Um octeto contém oito bits; IPv4 contém 32 bits, normalmente escritos em quatro octetos.",
      "**Máscara não é gateway.** A máscara delimita a parte de rede do endereço; o gateway encaminha tráfego a outros destinos.",
      "**DNS não é DHCP.** DNS relaciona nomes e registros; DHCP distribui configurações como IP, máscara, gateway e servidor DNS.",
      "**Endereço de rede e broadcast** não costumam ser atribuídos a hosts numa sub-rede IPv4 convencional /26."
    ],
    "review": [
      {
        "ask": "O que significa o /24 em 192.168.10.70/24?",
        "answer": "É um prefixo: os primeiros 24 bits indicam a parte de rede; a máscara correspondente é 255.255.255.0."
      },
      {
        "ask": "Por que uma máquina usa o gateway?",
        "answer": "Para alcançar redes que não estão diretamente conectadas, encaminhando o pacote ao próximo roteador adequado."
      },
      {
        "ask": "O DHCP substitui o DNS?",
        "answer": "Não. DHCP entrega configurações; DNS ajuda a resolver nomes de serviços e outros registros."
      },
      {
        "ask": "Em 192.168.10.70/26, por que o bloco tem 64 endereços?",
        "answer": "IPv4 possui 32 bits; /26 usa 26 para a rede e deixa 6 bits, resultando em 2⁶ = 64 combinações."
      }
    ],
    "extra": ""
  },
  "3": {
    "id": 3,
    "title": "Switch, VLAN, roteador, VPN e firewall: para que serve cada um",
    "goal": "Entender primeiro o problema que cada equipamento ou tecnologia resolve e depois acompanhar uma comunicação entre duas redes separadas.",
    "steps": [
      {
        "title": "Comece pelo switch: como ligar computadores na mesma rede?",
        "body": "Suponha cinco computadores numa sala. Para conectá-los por cabos Ethernet, podemos usar um **switch**, aparelho com várias conexões físicas chamadas **portas**. Cada computador usa uma interface de rede e o switch encaminha **quadros** para o trecho apropriado da rede local.\n\nNa aula anterior vimos que o **MAC** identifica interfaces no contexto de enlace. Um switch Ethernet aprende quais endereços MAC são alcançáveis por suas portas. Assim, quando recebe um quadro destinado a determinada interface, pode encaminhá-lo pelo caminho local conhecido, em vez de depender de um roteador para toda troca entre dispositivos do mesmo segmento.\n\n**O limite do switch:** conectar máquinas no mesmo segmento não significa que ele saiba, por si só, como alcançar qualquer rede externa. Quando precisamos conversar entre redes IP diferentes, entra o trabalho de roteamento."
      },
      {
        "title": "O roteador e a ideia de duas redes diferentes",
        "body": "Imagine que a recepção usa endereços `192.168.1.x` e os servidores usam `192.168.30.x`, ambos com máscara /24. Essas são duas **sub-redes**, isto é, conjuntos de endereços que compartilham uma parte de rede conforme a máscara.\n\nPara a recepção alcançar o servidor, é necessário um caminho entre esses blocos. O **roteador** examina o **endereço IP de destino** e consulta informações de roteamento para escolher o próximo caminho. Isso não dá acesso automático a tudo: políticas de segurança ainda podem permitir ou negar a comunicação.\n\n**Exemplo simples:** o computador de recepção envia o pacote para seu gateway. O roteador vê que o destino pertence à sub-rede dos servidores e, se existe caminho e a política permite, encaminha-o. A resposta também precisa encontrar caminho de volta."
      },
      {
        "title": "VLAN: como dividir uma rede local sem comprar um switch para cada setor?",
        "body": "Uma empresa pode querer que a recepção, o laboratório e os visitantes usem **segmentos locais distintos**, mesmo que os equipamentos estejam conectados à mesma infraestrutura física de switches. Uma **VLAN** (*Virtual Local Area Network*) permite essa separação lógica: é como criar grupos de comunicação local independentes dentro de equipamentos compatíveis.\n\nPor exemplo, as máquinas da recepção podem participar da VLAN 10, e os servidores da VLAN 30. Isso ajuda a separar o **domínio de broadcast**: mensagens destinadas a todas as interfaces do segmento local não precisam chegar indiscriminadamente aos outros grupos. **Broadcast** significa envio local dirigido a todas as interfaces de determinado domínio de rede.\n\nA porta de switch ligada a uma estação normalmente pode estar associada a uma única VLAN como porta de **acesso**. Um enlace **trunk** pode transportar mais de uma VLAN entre equipamentos, utilizando identificação apropriada, como IEEE 802.1Q. A VLAN separa o enlace, mas **não criptografa dados nem substitui o firewall**."
      },
      {
        "title": "Firewall: quem pode passar, para onde e por qual serviço?",
        "body": "Separar redes não basta para garantir segurança. Uma empresa pode permitir que computadores da recepção acessem o servidor de agendamento, mas não permitir que qualquer visitante consulte o banco de dados. O **firewall** é um mecanismo que aplica regras para **permitir, restringir ou bloquear tráfego** segundo critérios definidos.\n\nEssas regras podem considerar IP de origem, IP de destino, protocolo e **porta lógica**, que identifica o serviço de rede. Por exemplo, liberar conexão TCP à porta `443` de um servidor permite tentar alcançar um serviço HTTPS, mas não significa que o usuário está autorizado a entrar no sistema. **Regra de rede e permissão do aplicativo são controles diferentes**.\n\nQuando a questão disser que o servidor existe e o caminho IP funciona, mas a porta está bloqueada, a análise deve investigar regras e estado do serviço. Abrir todas as portas para 'resolver' o problema é inadequado: expõe serviços que não precisam estar disponíveis."
      },
      {
        "title": "VPN: como se comunicar com uma rede distante de maneira protegida?",
        "body": "Agora imagine que um funcionário está trabalhando em casa. Seu computador não está fisicamente conectado à rede interna da empresa. Uma **VPN** (*Virtual Private Network*) pode estabelecer uma comunicação protegida sobre uma rede intermediária, como a Internet, usando mecanismos de **autenticação e proteção do tráfego** conforme o tipo de VPN.\n\nO termo **túnel** representa essa comunicação lógica estabelecida através da rede intermediária. Ele não é um cabo secreto: os dados percorrem uma infraestrutura real, mas são tratados por protocolos de proteção específicos. Mesmo com VPN ativa, o usuário ainda precisa de **rotas** para alcançar a sub-rede desejada e de **permissões** para acessar os serviços.\n\nHá VPNs de **acesso remoto**, para pessoas conectarem seus dispositivos a recursos internos, e VPNs **entre redes (site-to-site)**, para interligar locais. Uma VPN não torna todos os servidores acessíveis automaticamente; o firewall e a autorização continuam importantes."
      }
    ],
    "worked": {
      "title": "Exercício: a recepção não acessa o servidor de exames",
      "body": "**Situação:** o computador da recepção tem IP `192.168.1.50/24`. O servidor de exames tem IP `192.168.30.20/24`. A rede usa VLANs separadas e um roteador. O sistema funciona quando acessado de dentro da rede dos servidores, mas não pela recepção.\n\n**Passo 1 — Descubra as redes.** O prefixo /24 indica que `192.168.1.0/24` e `192.168.30.0/24` são sub-redes diferentes.\n\n**Passo 2 — Entenda o switch e as VLANs.** A simples ligação física ao mesmo conjunto de switches não permite comunicação de enlace direta entre VLANs distintas.\n\n**Passo 3 — Verifique o roteamento.** Precisa existir caminho entre as sub-redes, incluindo o caminho de retorno. Confira o gateway e a rota apropriados.\n\n**Passo 4 — Examine o firewall.** Mesmo havendo rota, a regra pode bloquear o destino e a porta exigidos pelo aplicativo.\n\n**Passo 5 — Diferencie os sintomas.** Se o servidor responde por IP e porta, mas nega login, o problema pode estar na autorização do sistema, não na VLAN.\n\n**Conclusão:** switch, VLAN, roteador e firewall participam do mesmo cenário, mas cada um resolve **um problema distinto**. Essa é a ligação que a banca quer que você compreenda."
    },
    "pitfalls": [
      "**VLAN não é VPN.** VLAN separa segmentos lógicos locais; VPN cria comunicação protegida sobre uma rede intermediária.",
      "**Switch não é automaticamente roteador.** A comutação local e o encaminhamento entre sub-redes têm funções distintas.",
      "**Rota disponível não significa acesso permitido.** Firewall e autorização podem bloquear a operação.",
      "**VPN conectada não equivale a acesso irrestrito.** O túnel precisa de rotas e permissões adequadas."
    ],
    "review": [
      {
        "ask": "Por que utilizar uma VLAN em uma empresa?",
        "answer": "Para segmentar logicamente a comunicação local, separando domínios de broadcast conforme configuração dos switches."
      },
      {
        "ask": "Por que duas VLANs não trocam tráfego IP automaticamente apenas com switch L2?",
        "answer": "A comunicação IP entre sub-redes normalmente exige roteamento inter-VLAN e permissões de rede."
      },
      {
        "ask": "Qual é a diferença entre firewall e autorização de login?",
        "answer": "Firewall aplica regras de tráfego na rede; autorização de aplicação verifica se o usuário pode executar a ação desejada."
      },
      {
        "ask": "O que a VPN resolve para alguém em casa?",
        "answer": "Permite criar comunicação protegida com redes ou serviços remotos, mas acesso ainda depende de rotas e permissões."
      }
    ],
    "extra": ""
  }
};
