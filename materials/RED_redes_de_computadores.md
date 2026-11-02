# Redes de computadores

11 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## Modelo OSI e TCP/IP

**Objetivo:** Identificar camadas e funções.

No modelo OSI, a camada de rede realiza endereçamento lógico e roteamento; a camada de transporte lida com comunicação fim a fim. No modelo TCP/IP, as camadas são agrupadas de outra forma. Entender o propósito dos protocolos é mais útil para concursos do que decorar siglas isoladas.

**Treino:** No modelo OSI, qual camada está associada ao roteamento entre redes?

- A. Enlace
- B. Rede
- C. Sessão
- D. Aplicação

**Gabarito comentado:** B — A camada de rede (3) cuida de endereçamento lógico e roteamento.

**Treino:** Qual protocolo é orientado à conexão e oferece entrega ordenada?

- A. UDP
- B. IP
- C. TCP
- D. ICMP

**Gabarito comentado:** C — O TCP controla a conexão e a entrega ordenada dos segmentos.

---

## IPv4, sub-redes e DNS

**Objetivo:** Calcular capacidade e diferenciar DNS/DHCP.

Uma rede IPv4 /24 possui 256 endereços; em uma sub-rede tradicional, normalmente 254 podem ser atribuídos a hosts. A máscara /24 corresponde a 255.255.255.0. DNS resolve nomes para registros como A e AAAA. DHCP distribui parâmetros de rede a clientes.

**Treino:** Qual a máscara de uma rede IPv4 /24?

- A. 255.255.0.0
- B. 255.255.255.0
- C. 255.255.255.128
- D. 255.255.255.252

**Gabarito comentado:** B — Uma máscara /24 usa 24 bits 1, representados por 255.255.255.0.

**Treino:** Qual serviço normalmente atribui automaticamente endereço IP ao dispositivo?

- A. DNS
- B. SNMP
- C. DHCP
- D. NTP

**Gabarito comentado:** C — DHCP distribui endereços IP e opções de configuração.

---

## Redes locais, VPN e firewall

**Objetivo:** Explicar segmentação e acesso remoto.

VLANs segmentam domínios de broadcast em redes Ethernet. VPN estabelece comunicação protegida entre dispositivos ou redes. Firewalls aplicam regras de tráfego; monitoração deve registrar eventos e não substitui análise.

**Treino:** Qual tecnologia segmenta logicamente domínios de broadcast em switches compatíveis?

- A. NAT
- B. VLAN
- C. DNS
- D. RAID

**Gabarito comentado:** B — VLAN permite segmentação lógica em rede local.

**Treino:** Qual é uma função principal de um firewall?

- A. Gerar endereços MAC
- B. Aplicar regras de tráfego
- C. Substituir backups
- D. Executar consultas SQL

**Gabarito comentado:** B — O firewall filtra ou controla tráfego conforme regras.

---

## CIDR e cálculo de hosts

**Objetivo:** Explicar e aplicar: CIDR e cálculo de hosts.

### Conceito e teoria
O prefixo CIDR informa quantos bits formam a parte de rede de um endereço IPv4. Em redes IPv4 usuais, um /26 tem 64 endereços, dos quais 62 são atribuíveis a hosts; um /27 tem 32, dos quais 30 são atribuíveis. O tamanho do bloco é 2^(32-prefixo).

### Exemplo
Em 192.168.10.70/26, os blocos do último octeto começam em 0, 64, 128 e 192. O endereço de rede é 192.168.10.64 e o broadcast é 192.168.10.127.

### Armadilha de prova
Não confunda quantidade total de endereços com hosts utilizáveis. /31 e /32 têm regras específicas de uso.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Quantos endereços IPv4 há em uma rede /26?

- A. 64
- B. 32
- C. 126
- D. 256

**Gabarito comentado:** A — São 32−26=6 bits para endereços, portanto 2⁶=64.

**Treino:** Qual é a rede do IP 192.168.10.70/26?

- A. 192.168.10.70
- B. 192.168.10.128
- C. 192.168.10.64
- D. 192.168.10.0

**Gabarito comentado:** C — Com /26 o bloco no último octeto é 64; 70 pertence ao intervalo 64–127.

---

## VLAN, trunk e 802.1Q

**Objetivo:** Explicar e aplicar: VLAN, trunk e 802.1Q.

### Conceito e teoria
VLAN separa domínios de broadcast no nível de enlace. Portas access normalmente pertencem a uma VLAN; portas trunk transportam tráfego de diversas VLANs, geralmente marcado com IEEE 802.1Q. Para comunicação entre VLANs é necessário roteamento.

### Exemplo
Uma rede administrativa na VLAN 10 e uma rede de convidados na VLAN 20 não se comunicam diretamente por simples comutação L2; um equipamento L3 deve intermediar o tráfego conforme regras de acesso.

### Armadilha de prova
VLAN não substitui firewall ou autenticação; sua segurança depende da configuração.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é o propósito principal de uma VLAN?

- A. Criptografar todos os quadros
- B. Separar logicamente domínios de broadcast
- C. Substituir roteadores da internet
- D. Eliminar a necessidade de endereçamento IP

**Gabarito comentado:** B — VLANs separam logicamente segmentos L2.

**Treino:** Qual padrão é usado para marcar VLANs em quadros Ethernet de uma porta trunk?

- A. IEEE 802.3af
- B. IEEE 802.1X
- C. IEEE 802.1Q
- D. IEEE 802.11ax

**Gabarito comentado:** C — IEEE 802.1Q define tagging de VLAN em Ethernet.

---

## TCP: conexão e controle de fluxo

**Objetivo:** Explicar e aplicar: TCP: conexão e controle de fluxo.

### Conceito e teoria
TCP é orientado à conexão, confiável e fornece fluxo de bytes ordenado. A abertura clássica utiliza SYN, SYN-ACK e ACK. Números de sequência e confirmações permitem detecção de perdas e retransmissão; janela controla fluxo.

### Exemplo
Transferência de arquivo costuma exigir que o receptor reconstrua a sequência correta mesmo quando segmentos se perdem ou chegam fora de ordem.

### Armadilha de prova
TCP não criptografa automaticamente; TLS é uma camada de proteção adicional em aplicações apropriadas.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual sequência representa o handshake TCP clássico?

- A. SYN, SYN-ACK, ACK
- B. ACK, FIN, RST
- C. SYN, FIN, FIN
- D. RST, ACK, FIN

**Gabarito comentado:** A — O estabelecimento clássico usa três mensagens.

**Treino:** Qual característica TCP não oferece sozinho?

- A. Criptografia de ponta a ponta
- B. Ordenação de bytes
- C. Retransmissão de perdas
- D. Controle de fluxo

**Gabarito comentado:** A — A confidencialidade normalmente exige TLS ou outra proteção.

---

## DNS: registros e resolução

**Objetivo:** Explicar e aplicar: DNS: registros e resolução.

### Conceito e teoria
DNS traduz nomes para recursos. A aponta para IPv4, AAAA para IPv6, MX indica servidor de recebimento de e-mail e CNAME aponta nome alternativo. TTL influencia o tempo de cache; DNS recursivo consulta servidores para responder ao cliente.

### Exemplo
Se um hostname troca de IP, clientes podem continuar usando resposta anterior até expirar o TTL em cache.

### Armadilha de prova
Um registro CNAME não significa redirecionamento HTTP; são operações diferentes.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual registro DNS associa um nome a endereço IPv6?

- A. AAAA
- B. A
- C. MX
- D. PTR

**Gabarito comentado:** A — AAAA representa endereço IPv6.

**Treino:** O TTL de um registro DNS controla principalmente:

- A. Largura de banda da interface
- B. Número de saltos IP
- C. Porta TCP do serviço
- D. Prazo de retenção em cache

**Gabarito comentado:** D — TTL DNS indica por quanto tempo a resposta pode ser armazenada em cache.

---

## DHCP e DORA

**Objetivo:** Explicar e aplicar: DHCP e DORA.

### Conceito e teoria
No cenário clássico DHCPv4, o cliente inicia a descoberta por DHCPDISCOVER, recebe DHCPOFFER, solicita por DHCPREQUEST e conclui com DHCPACK. O servidor pode fornecer IP, máscara, gateway e DNS, com tempo de concessão.

### Exemplo
Se DHCP não responde, o cliente pode ficar sem configuração válida; verifique escopo, serviço, alcance e relay.

### Armadilha de prova
O gateway padrão não é o servidor DNS; podem ser máquinas diferentes.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é a ordem típica de mensagens do DHCPv4?

- A. Discover, Offer, Request, ACK
- B. Discover, ACK, Offer, Request
- C. Request, Offer, Discover, ACK
- D. Offer, Discover, ACK, Request

**Gabarito comentado:** A — DORA resume a negociação clássica.

**Treino:** Qual informação é normalmente distribuída pelo DHCP?

- A. Conteúdo de páginas web
- B. Chave privada TLS do servidor
- C. Gateway padrão do cliente
- D. Senha de domínio do administrador

**Gabarito comentado:** C — DHCP fornece parâmetros de configuração de rede, como gateway.

---

## IPv6 e SLAAC

**Objetivo:** Explicar e aplicar: IPv6 e SLAAC.

### Conceito e teoria
IPv6 usa endereços de 128 bits e elimina o broadcast tradicional. SLAAC permite configuração por anúncios de roteador (RA); Neighbor Discovery utiliza ICMPv6. Há endereços link-local (fe80::/10) e globais unicast.

### Exemplo
Um host pode ter simultaneamente endereço link-local e global; conectividade local não prova que há roteamento para a internet.

### Armadilha de prova
IPv6 não garante segurança automaticamente e não dispensa regras de firewall.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é o tamanho de um endereço IPv6?

- A. 64 bits
- B. 128 bits
- C. 32 bits
- D. 48 bits

**Gabarito comentado:** B — IPv6 tem 128 bits.

**Treino:** Qual mecanismo fornece anúncios de roteador usados no SLAAC?

- A. ARP do IPv4
- B. SMTP
- C. SNMP trap
- D. ICMPv6 Neighbor Discovery

**Gabarito comentado:** D — RAs fazem parte do Neighbor Discovery em ICMPv6.

---

## NAT e redes privadas

**Objetivo:** Explicar e aplicar: NAT e redes privadas.

### Conceito e teoria
NAT traduz endereços entre redes. PAT/NAPT permite multiplexar conexões internas por portas em um endereço público. RFC 1918 define blocos IPv4 privados, incluindo 10/8, 172.16/12 e 192.168/16.

### Exemplo
Vários computadores de 192.168.1.0/24 podem acessar a internet por uma única interface pública usando tradução de porta.

### Armadilha de prova
NAT não equivale a uma política completa de segurança; não elimina necessidade de firewall.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual faixa é privada segundo RFC 1918?

- A. 172.32.0.0/12
- B. 11.0.0.0/8
- C. 169.0.0.0/8
- D. 172.16.0.0/12

**Gabarito comentado:** D — O bloco privado inclui 172.16.0.0 até 172.31.255.255.

**Treino:** Qual tecnologia diferencia conexões internas usando números de porta em um IP público?

- A. DNSSEC
- B. RADIUS
- C. VLAN access
- D. PAT/NAPT

**Gabarito comentado:** D — PAT ou NAPT traduz também portas, multiplexando fluxos.

---

## HTTP, HTTPS e códigos de resposta

**Objetivo:** Explicar e aplicar: HTTP, HTTPS e códigos de resposta.

### Conceito e teoria
HTTP é protocolo de aplicação; HTTPS utiliza HTTP protegido por TLS. 200 indica sucesso, 301 mudança permanente, 400 requisição inválida, 401 falta de autenticação, 403 acesso negado e 404 recurso não encontrado.

### Exemplo
Se uma API responde 401 a usuário sem credencial e 403 a usuário autenticado sem permissão, a diferença é autenticação versus autorização.

### Armadilha de prova
HTTPS protege transporte, mas não impede falhas de lógica ou vazamento por aplicação.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual código HTTP indica normalmente ausência de autenticação válida?

- A. 301
- B. 404
- C. 401
- D. 200

**Gabarito comentado:** C — 401 Unauthorized se refere a autenticação; 403 trata de recusa de acesso.

**Treino:** O HTTPS emprega qual mecanismo para proteger a comunicação?

- A. DHCP
- B. ARP
- C. ICMP
- D. TLS

**Gabarito comentado:** D — TLS fornece proteção criptográfica ao transporte utilizado pelo HTTP.
