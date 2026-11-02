export type LessonStep={title:string;body:string};
export type PedagogicalLesson={id:number;title:string;goal:string;steps:LessonStep[];worked:{title:string;body:string};pitfalls:string[];review:{ask:string;answer:string}[];extra:string};
export const intro1:PedagogicalLesson[]=[
  {
    "id": 1,
    "title": "Como as redes se comunicam: OSI e TCP/IP",
    "goal": "Explicar o caminho de uma mensagem, identificar a função de cada camada e localizar uma falha sem decorar siglas isoladas.",
    "steps": [
      {
        "title": "Comece com uma situação real",
        "body": "Você abre o sistema de agendamento no navegador. A página só aparece porque várias tarefas distintas acontecem em sequência: um nome é resolvido, uma conexão é estabelecida, dados viajam por roteadores e chegam ao servidor. Nenhum protocolo resolve tudo sozinho. Os **modelos em camadas** servem para separar responsabilidades: se não há link físico, verificar senha do site não ajuda; se o servidor devolve HTTP 403, substituir o cabo não é a primeira hipótese."
      },
      {
        "title": "OSI: sete funções, não sete caixas obrigatórias",
        "body": "O modelo **OSI** divide a comunicação em sete camadas. **1 Física:** transmissão de bits em cabo, fibra ou rádio. **2 Enlace:** comunicação no segmento local, quadros e endereços MAC (Ethernet). **3 Rede:** endereços IP, escolha de rota e encaminhamento entre redes. **4 Transporte:** comunicação entre processos, portas, controle de entrega (TCP) ou datagramas (UDP). **5 Sessão:** controle de sessões em modelos conceituais. **6 Apresentação:** representação e transformação de dados. **7 Aplicação:** protocolos usados pelos aplicativos, como HTTP e DNS. Na prática, protocolos da pilha Internet não seguem obrigatoriamente uma correspondência perfeita de 1 para 1 com cada camada OSI."
      },
      {
        "title": "TCP/IP: como isso se aplica à Internet",
        "body": "Uma representação comum da pilha **TCP/IP** tem quatro camadas: **acesso à rede**, **Internet**, **transporte** e **aplicação**. Ethernet atua no acesso; IPv4/IPv6 na Internet; TCP/UDP no transporte; HTTP e DNS na aplicação. Alguns materiais usam cinco camadas separando físico e enlace. Em prova, confira qual modelo o enunciado adota. **TCP não é protocolo de rede**, e **IP não garante entrega ordenada**: não confunda responsabilidades."
      },
      {
        "title": "O que é encapsulamento",
        "body": "Ao enviar uma mensagem HTTP sobre TCP, a aplicação fornece dados. O transporte acrescenta seu cabeçalho, com portas e mecanismos de controle: **segmento TCP**. A camada de Internet acrescenta endereços IP: **pacote IP**. O enlace acrescenta endereços MAC e campos de integridade: **quadro Ethernet**. Bits transportam o quadro no meio físico. No destino ocorre o desencapsulamento. Ao passar por um roteador, o quadro de enlace geralmente muda para o próximo salto, mas o destino IP normalmente continua sendo o destino final (salvo mecanismos como NAT)."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: a clínica abre um sistema remoto",
      "body": "**Etapa 1.** A estação 192.168.1.50/24 precisa falar com o servidor 192.168.30.20. Os prefixos /24 diferem, logo o servidor está fora da rede local da estação.\n\n**Etapa 2.** A estação consulta sua tabela de roteamento e escolhe o gateway configurado. Se necessário, ARP identifica o MAC do gateway.\n\n**Etapa 3.** O primeiro quadro Ethernet vai para o **MAC do gateway**, enquanto o pacote IP continua endereçado a **192.168.30.20**.\n\n**Etapa 4.** O roteador examina o destino IP, escolhe a interface/rota e reencapsula para o próximo enlace. Chegando ao servidor, a aplicação recebe os dados após as camadas processarem seus cabeçalhos.\n\n**Diagnóstico:** se IP e TCP/443 funcionam, mas o site retorna 503, a resposta é de aplicação/intermediário: não conclua que a camada física caiu."
    },
    "pitfalls": [
      "Switch de camada 2 normalmente aprende e encaminha quadros por MAC; roteador decide caminhos por IP.",
      "Ping verifica resposta ICMP, não a saúde de um serviço HTTP nem o login.",
      "TCP oferece fluxo confiável e ordenado, mas não cifra dados automaticamente.",
      "DNS é aplicação e pode operar com UDP ou TCP; HTTP/3 usa QUIC sobre UDP."
    ],
    "review": [
      {
        "ask": "Quando uma estação acessa outra rede, o quadro do primeiro salto usa o MAC de quem?",
        "answer": "Do próximo salto no enlace local, geralmente o gateway. O IP de destino do pacote é o do servidor remoto."
      },
      {
        "ask": "Qual unidade corresponde a TCP, IP e Ethernet?",
        "answer": "No exemplo: segmento TCP, datagrama/pacote IP e quadro Ethernet."
      }
    ],
    "extra": "**Aprofundamento opcional:** compare os três pacotes de aplicação HTTP/1.1 sobre TCP+TLS, HTTP/2 sobre TCP+TLS e HTTP/3 sobre QUIC+UDP. O nome HTTP não implica que todo acesso use TCP. Consulte RFC 9293 (TCP) e RFC 9000 (QUIC): https://www.rfc-editor.org/rfc/rfc9293 e https://www.rfc-editor.org/rfc/rfc9000."
  },
  {
    "id": 2,
    "title": "Endereçamento IPv4, máscaras e serviços de nomes",
    "goal": "Ler IP/prefixo, identificar endereço de rede e hosts válidos, diferenciar DNS, DHCP e gateway.",
    "steps": [
      {
        "title": "O problema que o IP resolve",
        "body": "Em uma rede, os computadores precisam de endereços para identificar destinos lógicos. Um endereço IPv4 contém **32 bits**, normalmente apresentados em quatro octetos decimais: 192.168.10.70. O endereço sozinho não basta para decidir se o destino está na rede local: é necessário conhecer também o **prefixo/máscara**. Um gateway é o próximo salto usado quando a rede de destino não é alcançável diretamente."
      },
      {
        "title": "Entendendo a máscara sem decorar",
        "body": "Em **192.168.10.70/26**, os primeiros 26 bits identificam a rede e os 6 restantes identificam endereços dentro dela. A máscara /26 é **255.255.255.192**. No último octeto, os blocos têm tamanho 256−192=64: 0–63, 64–127, 128–191, 192–255. Como 70 pertence a 64–127, a **rede** é 192.168.10.64 e o **broadcast** convencional é 192.168.10.127. Hosts convencionais: .65 até .126. Em redes IPv4 usuais com prefixos até /30, o número de hosts convencionais é 2^(32−prefixo)−2. **/31 e /32 têm usos específicos**, por isso não aplique a fórmula sem contexto."
      },
      {
        "title": "DNS não é DHCP",
        "body": "**DNS** resolve nomes e fornece registros como **A** (IPv4), **AAAA** (IPv6), **MX** (servidores de e-mail) e **CNAME** (nome alternativo). **DHCP** costuma distribuir configuração de rede, como IP, máscara, gateway e servidor DNS. O **gateway padrão** encaminha tráfego para redes de destino não diretamente conectadas. Um dispositivo pode obter IP pelo DHCP e ainda falhar no DNS; pode resolver nomes e ainda não conseguir estabelecer conexão TCP com o serviço."
      },
      {
        "title": "Um método seguro para resolver subnetting",
        "body": "1. Localize o prefixo. 2. Conte os bits de host (32−prefixo). 3. Calcule o bloco 2^bits. 4. Descubra o octeto no qual ocorre a divisão e seus incrementos. 5. Encontre o intervalo que contém o IP. 6. Separe rede, broadcast e endereços utilizáveis de acordo com o cenário. Ao comparar endereços, verifique se compartilham os bits do prefixo em vez de apenas olhar os primeiros números."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: 192.168.30.150/27",
      "body": "**1. Máscara:** /27 = 255.255.255.224; há 5 bits de host.\n\n**2. Bloco:** 2^5=32 endereços. No último octeto, os intervalos são 0–31, 32–63, 64–95, 96–127, 128–159, 160–191, 192–223 e 224–255.\n\n**3. Localização:** 150 está no bloco **128–159**.\n\n**4. Resposta:** rede **192.168.30.128**, broadcast **192.168.30.159**, hosts convencionais **192.168.30.129 até 192.168.30.158** (30 hosts).\n\n**5. Diagnóstico aplicado:** se o cliente tem 192.168.30.150/27 e o gateway está em 192.168.30.1, o gateway está fora da sub-rede do cliente; a configuração merece verificação."
    },
    "pitfalls": [
      "/24 representa 256 endereços no bloco e, numa LAN convencional, 254 hosts utilizáveis.",
      "DNS e DHCP têm papéis distintos; trocar DNS não corrige máscara errada.",
      "Não confunda quantidade de endereços total com quantidade de hosts utilizáveis.",
      "/31 pode ser usado em enlaces ponto a ponto; evite declarar que sempre possui zero endereços utilizáveis."
    ],
    "review": [
      {
        "ask": "Um endereço 10.0.5.130/25 pertence a qual rede e qual broadcast?",
        "answer": "/25 divide em 0–127 e 128–255. Rede 10.0.5.128; broadcast 10.0.5.255."
      },
      {
        "ask": "Qual componente configura automaticamente o IP e qual resolve nomes?",
        "answer": "DHCP distribui configurações; DNS resolve nomes."
      }
    ],
    "extra": "**Aprofundamento opcional:** aprenda VLSM começando por redes maiores para evitar sobreposição. Exemplo: requisitos de 50 e 12 hosts pedem, em cenário tradicional, pelo menos /26 (62 hosts) e /28 (14 hosts). Reserve blocos alinhados antes de calcular o gateway."
  },
  {
    "id": 3,
    "title": "Redes locais, VLAN, VPN e firewall sem confusão",
    "goal": "Diferenciar segmentação local, roteamento entre redes, túnel VPN e regras de acesso.",
    "steps": [
      {
        "title": "Quatro problemas diferentes",
        "body": "Uma rede local conecta equipamentos e permite troca de quadros. Uma **VLAN** divide logicamente domínios de broadcast em um ambiente com switches compatíveis. Um **roteador** permite comunicação IP entre sub-redes, quando há rota e política de acesso. Uma **VPN** oferece comunicação através de um meio não confiável com autenticação e proteção adequadas, segundo o protocolo adotado. Um **firewall** decide permitir ou bloquear tráfego conforme regras. Essas tecnologias se complementam; nenhuma substitui automaticamente as demais."
      },
      {
        "title": "VLAN e trunk na prática",
        "body": "Portas **access** geralmente associam um dispositivo a uma VLAN; uma porta **trunk** pode transportar várias VLANs com marcação **IEEE 802.1Q**. Duas VLANs distintas não se comunicam pela simples comutação L2 entre domínios. Para comunicação IP entre elas é necessário roteamento inter-VLAN e regras coerentes. VLAN melhora segmentação, mas **não é criptografia** e não garante, isoladamente, que toda política de segurança esteja correta."
      },
      {
        "title": "VPN, autenticação e privilégio mínimo",
        "body": "Numa VPN de acesso remoto, o usuário autentica-se e obtém acesso a recursos conforme rotas e políticas definidas. O túnel não significa acesso irrestrito a qualquer servidor: controle de acesso, MFA quando aplicável, logs e privilégios mínimos permanecem importantes. Uma VPN site-to-site conecta redes; uma VPN de usuário conecta cliente remoto a recursos definidos. Consulte se existem regras para tráfego de ida e volta e se a rede do usuário se sobrepõe à rede remota."
      },
      {
        "title": "Firewall e troubleshooting disciplinado",
        "body": "Firewalls podem operar sobre endereços, portas, protocolos, conexão e políticas mais avançadas. Ao investigar acesso à porta 1433, por exemplo, distinga: resolução de nome, rota, filtro de rede, serviço escutando e regra no firewall do próprio servidor. Se TCP conecta, não significa que o banco aceitará autenticação. Se a porta é bloqueada, liberar 'tudo' não é solução adequada: autorize apenas origens e destinos necessários."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: estação externa precisa acessar servidor interno",
      "body": "**Situação:** um colaborador em 192.168.30.0/24 precisa alcançar uma aplicação em 192.168.1.0/24.\n\n**1. Endereçamento:** confirme IP, máscara e gateway da estação.\n\n**2. Rota:** confirme que há caminho de ida e retorno entre os prefixos (ou encaminhamento por VPN).\n\n**3. Política:** confira firewall de borda e firewall do servidor para o IP de origem e porta do serviço.\n\n**4. Serviço:** teste conectividade TCP específica, por exemplo PowerShell **Test-NetConnection servidor -Port 443**.\n\n**5. Aplicação:** se TCP abre mas o site não responde corretamente, avance para TLS, HTTP, logs e autorização. Isso evita culpar uma VLAN por um problema do sistema."
    },
    "pitfalls": [
      "VLAN não é VPN: a primeira segmenta L2; a segunda protege comunicação por um caminho conforme desenho.",
      "Uma porta trunk pode carregar várias VLANs; uma porta access normalmente pertence a uma VLAN.",
      "Firewall não substitui autenticação, e VPN não dá autorização universal.",
      "Conectividade ICMP não prova conectividade TCP na porta pretendida."
    ],
    "review": [
      {
        "ask": "Duas VLANs conseguem se comunicar somente por um switch L2 sem roteamento?",
        "answer": "Em geral, não; precisam de recurso L3 que encaminhe tráfego entre elas e respeite a política de acesso."
      },
      {
        "ask": "Se o túnel VPN está conectado, o usuário já tem acesso a todos os servidores?",
        "answer": "Não. Rotas, ACLs, autenticação e firewall ainda determinam quais recursos poderão ser acessados."
      }
    ],
    "extra": "**Aprofundamento opcional:** pesquise isolamento de VLAN nativa, ACLs por sub-rede, controle de portas e política de menor privilégio para acessos remotos. Uma boa questão de prova distingue segmentação de tráfego de criptografia e autorização."
  },
  {
    "id": 4,
    "title": "Fundamentos da segurança: CID, identidade e acesso",
    "goal": "Entender confidencialidade, integridade, disponibilidade, autenticação e autorização aplicando a incidentes reais.",
    "steps": [
      {
        "title": "Por que segurança não é apenas antivírus",
        "body": "A segurança busca preservar objetivos de negócio e proteger informações. A tríade **CID** reúne três propriedades: **confidencialidade** (somente quem deve pode conhecer os dados), **integridade** (informação não é alterada indevidamente) e **disponibilidade** (informação e serviço acessíveis quando necessários). Uma clínica pode perder disponibilidade por falha elétrica, integridade por dados modificados sem autorização e confidencialidade por vazamento de prontuários. Um mesmo incidente pode afetar várias propriedades ao mesmo tempo."
      },
      {
        "title": "Ameaça, vulnerabilidade, risco e controle",
        "body": "**Ativo** é algo valioso: prontuários, PACS, tempo de atendimento. **Ameaça** é fonte de potencial dano. **Vulnerabilidade** é fragilidade explorável, como senha compartilhada ou backup não testado. **Risco** considera possibilidade de um evento afetar objetivos, incluindo sua probabilidade e impacto, conforme método adotado. **Controle** reduz, detecta ou corrige uma parte do risco: MFA, logs, backup segregado, análise de acesso. Controle não zera automaticamente o risco."
      },
      {
        "title": "Autenticação é diferente de autorização",
        "body": "**Identificação** informa quem se apresenta; **autenticação** verifica uma alegação de identidade (senha, token, biometria); **autorização** define o que essa identidade pode fazer. Uma pessoa pode autenticar-se validamente e receber **403 Forbidden** ao tentar abrir relatório sem permissão. Acesso por **menor privilégio** concede o mínimo necessário para a função. **MFA** combina fatores independentes, como algo que você sabe e algo que possui; duas senhas do mesmo tipo não se tornam MFA por serem duas telas."
      },
      {
        "title": "Controles precisam de evidência",
        "body": "Dizer 'temos backup' não demonstra que dados podem ser restaurados. Dizer 'temos política de senhas' não prova que contas privilegiadas são revisadas. Exemplo de evidência: teste de restauração assinado, revisão de privilégios com data/responsável, registro de autenticação, atualização de inventário e treinamento. Isso aproxima o conceito do modo como concursos cobram controles preventivos, detectivos e corretivos."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: um colaborador acessa laudo sem necessidade",
      "body": "**1. Ativo:** laudo e informações médicas do paciente.\n\n**2. Risco:** acesso não autorizado a dados sensíveis.\n\n**3. Vulnerabilidade:** permissões concedidas a todo o setor sem necessidade funcional.\n\n**4. Impacto:** exposição de dados, consequências legais, reputacionais e assistenciais.\n\n**5. Controles:** separar perfis por função; MFA para acessos críticos; revisão periódica; logs de acesso com investigação de exceções.\n\n**6. Evidência:** matriz de permissões e teste de usuários; extração e revisão de registros. **Atenção:** criptografar o disco não resolve sozinho uma autorização excessiva no sistema."
    },
    "pitfalls": [
      "Confidencialidade é sigilo; integridade é proteção de conteúdo contra alteração; disponibilidade é acesso oportuno.",
      "Ter login não é o mesmo que ter autorização adequada.",
      "Duas senhas são geralmente o mesmo fator, conhecimento, não duas categorias independentes.",
      "Backup deve ser testado por restauração; RAID não substitui backup."
    ],
    "review": [
      {
        "ask": "Um dado foi alterado indevidamente, mas ainda pode ser aberto. Qual propriedade foi comprometida diretamente?",
        "answer": "Integridade. A disponibilidade do arquivo não garante que seu conteúdo esteja correto."
      },
      {
        "ask": "Um usuário autenticado pode acessar automaticamente qualquer pasta?",
        "answer": "Não. Autenticação verifica identidade; autorização decide privilégios e recursos permitidos."
      }
    ],
    "extra": "**Aprofundamento opcional:** o NIST CSF 2.0 organiza resultados de segurança em Governar, Identificar, Proteger, Detectar, Responder e Recuperar. São funções integradas, não uma sequência obrigatória. Fonte: https://www.nist.gov/cyberframework"
  },
  {
    "id": 5,
    "title": "Criptografia, backups e resposta a incidentes",
    "goal": "Distinguir criptografia simétrica e assimétrica, hash e assinatura; planejar recuperação sem confundir backup com disponibilidade.",
    "steps": [
      {
        "title": "Criptografia: qual problema queremos resolver?",
        "body": "Criptografia torna a informação ilegível para quem não possui material criptográfico adequado, de acordo com algoritmo e modo usados. **Simétrica:** a mesma chave secreta é compartilhada entre quem cifra e decifra (ex.: AES). Em geral é eficiente para volumes grandes. **Assimétrica:** há par de chaves relacionadas, pública e privada, com usos como troca de segredos e assinatura digital (ex.: RSA e curvas elípticas, conforme protocolo). Um serviço TLS moderno combina mecanismos de troca de chaves, autenticação e criptografia simétrica da sessão; não transmite todo o conteúdo 'cifrado só com RSA'."
      },
      {
        "title": "Hash não é criptografia reversível",
        "body": "Uma função de **hash criptográfico** calcula um resumo de tamanho fixo para dados arbitrários. Ela não foi feita para recuperar o arquivo original. Alterar um bit tende a produzir outro resumo. É útil para verificar integridade desde que o hash esperado tenha origem confiável. Uma **assinatura digital** usa algoritmo e chave privada do signatário e pode ser verificada com a chave pública correspondente. Hash por si só não autentica o autor: um atacante pode trocar arquivo e hash se ambos estiverem sob seu controle."
      },
      {
        "title": "Disponibilidade exige backup recuperável",
        "body": "Cópias de segurança precisam atender duas metas distintas: **RPO**, perda máxima tolerável de dados medida em tempo (ponto de recuperação), e **RTO**, tempo objetivo para recuperar o serviço. Um backup feito diariamente talvez não atenda RPO de 15 minutos. Ter arquivo íntegro, mas levar dois dias para restaurar, pode falhar em RTO de quatro horas. Cópias segregadas e testes reais são mais relevantes que quantidade de discos espelhados."
      },
      {
        "title": "Resposta a incidente não começa apagando tudo",
        "body": "Uma resposta típica inclui preparar responsáveis e canais, identificar/analisar evento, conter impacto, erradicar causas, recuperar operação e registrar lições aprendidas. A ordem e as atividades dependem do incidente. Preservar evidências, horários, sistemas, hashes e responsáveis reduz perdas durante investigação. Isolar uma estação comprometida pode evitar disseminação, mas decisões precisam considerar continuidade, segurança assistencial e autorização."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: ransomware em servidor de imagens",
      "body": "**Detecção:** alertas mostram arquivos renomeados e falhas em exames.\n\n**Contenção:** restringir acessos e redes afetadas conforme plano, sem destruir registros.\n\n**Análise:** identificar extensão, sistemas impactados, sinais de exfiltração e contas comprometidas.\n\n**Recuperação:** recuperar cópias comprovadamente íntegras em ambiente confiável; verificar acesso e consistência.\n\n**Metas:** se RTO=8h e restauração levou 6h, a meta temporal foi atendida. Se RPO=1h, mas o último backup é de 5h antes, a meta de perda de dados não foi atendida.\n\n**Melhoria:** validar isolamento de backups, privilégios, monitoração e ensaios de recuperação."
    },
    "pitfalls": [
      "Hash não 'descriptografa' o conteúdo; resumo criptográfico não é uma cifra reversível.",
      "RAID espelha até exclusões acidentais e criptografia maliciosa: não é backup independente.",
      "RTO mede tempo de restauração; RPO mede perda de dados tolerada em tempo.",
      "Criptografia protege confidencialidade sob pressupostos, mas não substitui autorização ou gestão de chaves."
    ],
    "review": [
      {
        "ask": "Qual a diferença entre um hash e uma assinatura digital?",
        "answer": "Hash produz resumo de dados; assinatura usa chave privada e permite verificação com chave pública, conforme algoritmo, para ajudar a verificar autenticidade e integridade."
      },
      {
        "ask": "Há backup diário e RPO de 30 minutos. O plano atende automaticamente?",
        "answer": "Não. Em regra, backups diários podem deixar perda de dados de muitas horas; é necessário mecanismo e ensaio compatíveis com o RPO."
      }
    ],
    "extra": "**Aprofundamento opcional:** pesquise proteção do gerenciamento de chaves, autenticação de backups, verificações de integridade, hardening, retenção, logs imutáveis e resposta coordenada com fornecedores."
  },
  {
    "id": 6,
    "title": "Administração de Windows e Linux: contas, serviços e logs",
    "goal": "Explicar usuários, grupos, permissões, serviços e diagnóstico nos dois sistemas operacionais sem misturar as ferramentas.",
    "steps": [
      {
        "title": "O que o administrador realmente administra",
        "body": "Um sistema operacional gerencia processos, arquivos, memória, dispositivos, contas e permissões. No Windows Server há serviços, Event Viewer, permissões NTFS, políticas de grupo e mecanismos de domínio. No Linux há processos, serviços gerenciados por systemd, permissões Unix, usuários/grupos e logs. Conceitos semelhantes não significam comandos iguais; concursos frequentemente cobram qual ferramenta responde a um problema concreto."
      },
      {
        "title": "Usuário, grupo e autorização",
        "body": "No Linux, arquivos possuem usuário dono, grupo dono e permissões como **r** (ler), **w** (gravar) e **x** (executar/traversar diretório). **chmod** altera modo; **chown** ajusta dono/grupo. Exemplo: **rw-r-----** permite ao dono ler/escrever, ao grupo ler e aos demais nenhum acesso. No Windows, permissões NTFS e regras de compartilhamento definem acesso efetivo; autenticar no AD não garante permissão sobre uma pasta. Grupos simplificam atribuições, mas precisam de revisão."
      },
      {
        "title": "Serviços, processos e persistência",
        "body": "Um **processo** é instância de programa em execução; um **serviço** executa funções normalmente em segundo plano. No Linux moderno, **systemctl status nome.service** informa estado da unidade; **journalctl -u nome.service** consulta logs relacionados. Em Windows, é possível verificar serviços no gerenciador de serviços, PowerShell e eventos no Event Viewer. Um serviço pode estar ativo e o aplicativo ainda falhar em conexão, autenticação, porta ou dependência."
      },
      {
        "title": "Diagnóstico em camadas",
        "body": "Investigue o sintoma antes de alterar configurações: 1. Existe o processo/serviço? 2. O usuário tem autorização? 3. O arquivo e dependências existem? 4. A porta está escutando? 5. O DNS e a rota funcionam? 6. O log mostra erro específico? O bom troubleshooting transforma hipóteses em testes observáveis; reiniciar sem registro pode ocultar evidências temporárias."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: aplicação Linux não consegue abrir log",
      "body": "**Sintoma:** o serviço 'app' falha ao gravar em /var/log/app.log.\n\n**1.** Consulte **systemctl status app.service** e **journalctl -u app.service** para localizar erro e horário.\n\n**2.** O erro 'Permission denied' indica suspeita de permissão/ACL/política de segurança.\n\n**3.** Verifique dono e permissões com **ls -l /var/log/app.log** e diretórios intermediários.\n\n**4.** Identifique sob qual usuário o serviço executa e conceda apenas a permissão necessária ao arquivo/diretório apropriado. Considere SELinux/AppArmor, se presentes.\n\n**5.** Valide a escrita e documente. **chmod 777** indiscriminado aumentaria o risco sem resolver necessariamente a causa."
    },
    "pitfalls": [
      "Permissão r de um arquivo não implica x; execução e travessia de diretório têm semânticas próprias.",
      "Autenticação no domínio não é autorização sobre todos os recursos.",
      "Serviço 'rodando' não é prova de que seus clientes conseguem completar uma operação.",
      "Logs e status são fontes de evidência; ações invasivas sem diagnóstico podem agravar a falha."
    ],
    "review": [
      {
        "ask": "Em rw-r-----, o que um integrante apenas do grupo pode fazer?",
        "answer": "Ler o arquivo; não possui permissão de escrita nem de execução pelo modo apresentado."
      },
      {
        "ask": "Qual par de comandos permite ver estado e registros de unidade systemd?",
        "answer": "systemctl status nome.service e journalctl -u nome.service."
      }
    ],
    "extra": "**Aprofundamento opcional:** pesquise integração AD com DNS e Kerberos, herança e filtragem de GPO, permissões efetivas em NTFS, umask e ACLs no Linux, além de troubleshooting de dependências de serviços."
  }
];
