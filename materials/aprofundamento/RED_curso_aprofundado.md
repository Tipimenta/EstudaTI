# EstudaTI — RED: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# OSI, TCP/IP e encapsulamento

# Objetivo e contexto
Explicar fluxo de ponta a ponta, camadas, unidades de dados e identificar a camada de uma falha.

## Aula detalhada — entenda o mecanismo
O **OSI** é um modelo de referência em sete camadas: física, enlace, rede, transporte, sessão, apresentação e aplicação. O modelo **TCP/IP** costuma ser ensinado em quatro camadas: acesso à rede, internet, transporte e aplicação; alguns livros o apresentam em cinco, separando física e enlace. Isso é uma simplificação de arquitetura, não uma tabela de equivalências perfeitas.

Ao transmitir uma requisição HTTP, a aplicação produz dados; o transporte (TCP, por exemplo) entrega um fluxo de bytes com controle de sequência e retransmissão; o IP identifica endereços e encaminha datagramas entre redes; o enlace entrega quadros no segmento local. No destino, ocorre o desencapsulamento. **Segmento TCP, datagrama IP e quadro Ethernet** não são sinônimos: cada unidade carrega cabeçalhos específicos.

**Switch Ethernet** decide encaminhamento com base em endereços MAC (camada de enlace); **roteador IP** escolhe próximo salto com base em destinos IP e tabela de rotas. Um equipamento moderno pode executar funções de mais de uma camada, portanto evite afirmar que todo switch é exclusivamente camada 2. Endereço IP é lógico e mantém significado entre enlaces; MAC é usado para alcançar o próximo nó no enlace Ethernet.

## Exemplo resolvido passo a passo
1. O usuário abre `https://intranet.exemplo/`. O navegador resolve o nome via DNS e estabelece conectividade para o IP resultante.
2. Numa conexão TCP, o handshake estabelece estado de comunicação; se houver TLS, ocorre negociação criptográfica em seguida.
3. O pedido HTTP segue no fluxo TCP. IP cuida do roteamento e Ethernet do próximo salto. Em cada roteador, o quadro de enlace é trocado; endereços IP de origem/destino do pacote normalmente permanecem os mesmos, desconsiderando NAT.
4. Se `ping` ao gateway funciona, mas o site pelo nome falha, investigue resolução DNS e HTTP/TLS antes de concluir que a placa de rede está quebrada. Um `ping` não garante que o servidor web responderá.

## Erros clássicos nas bancas
**Pegadinha 1:** “TCP corresponde ao nível de rede” está errado; TCP é transporte. **Pegadinha 2:** a camada de sessão do OSI não é necessariamente implementada por um protocolo isolado da pilha TCP/IP. **Pegadinha 3:** DNS é protocolo de aplicação e pode utilizar UDP ou TCP, conforme a operação e a implementação. **Pegadinha 4:** nem todo pacote IP contém TCP; UDP e ICMP são outros casos.

## Pratique sem consultar
Desenhe em quatro linhas o caminho “HTTP → TCP → IP → Ethernet”. Em qual camada uma tabela de roteamento atua? Em qual um endereço MAC é utilizado? Explique por que um quadro muda ao atravessar um roteador. Compare as camadas do OSI sem memorizar correspondências rígidas.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
RFC Editor — especificação TCP (RFC 9293): https://www.rfc-editor.org/rfc/rfc9293.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Em uma rede Ethernet/IP, qual informação um roteador usa principalmente para escolher o próximo salto?

A) Endereço IP de destino e tabela de rotas
B) Endereço MAC de origem do computador final
C) Número da porta HTTP exclusivamente
D) Nome do usuário autenticado

**Gabarito:** A — Roteadores encaminham segundo prefixos de destino e rotas; MAC serve para entrega no enlace, porta TCP não substitui roteamento.

**Questão 2.** Qual associação entre unidade de dados e camada está correta?

A) Quadro — enlace; datagrama IP — rede
B) Quadro — transporte; datagrama IP — aplicação
C) Segmento TCP — física; quadro — sessão
D) Datagrama IP — apresentação; quadro — rede

**Gabarito:** A — Na terminologia habitual, enlaces transmitem quadros, IP fornece datagramas e TCP utiliza segmentos.


---

# Subnetting IPv4, CIDR e VLSM

# Objetivo e contexto
Calcular rede, broadcast e hosts utilizáveis sem depender de calculadora.

## Aula detalhada — entenda o mecanismo
IPv4 possui 32 bits; um prefixo **/n** significa que os primeiros n bits identificam a rede. O restante, 32−n bits, identifica endereços dentro do bloco. Uma máscara /26 equivale a `255.255.255.192`: são 26 bits 1 seguidos por seis bits 0. O tamanho do bloco é **2^(32−n)**. Em redes IPv4 convencionais com endereço de rede e broadcast, os endereços de hosts utilizáveis são **2^(32−n) − 2**; exceções importantes: enlaces /31 ponto a ponto e /32 host.

Para descobrir a rede, aplique AND binário entre o IP e a máscara. O broadcast preenche com 1 os bits de host. Para calcular rapidamente em um octeto de máscara, use o incremento `256 − valor_da_máscara` (no octeto onde o prefixo se divide). Uma /27 tem incremento 32; redes terminam em .0, .32, .64, .96 etc. Em **VLSM** você distribui prefixos de tamanhos diferentes, geralmente começando pela maior necessidade de endereços. CIDR abandona classes rígidas e representa prefixos contíguos.

## Exemplo resolvido passo a passo
Dado `192.168.30.150/27`: máscara `255.255.255.224`, incremento 256−224=32. O octeto 150 cai no intervalo 128–159.
- Endereço de rede: **192.168.30.128**.
- Broadcast: **192.168.30.159**.
- Primeiro host convencional: **192.168.30.129**. Último host convencional: **192.168.30.158**.
- Total do bloco: 32 endereços; hosts convencionais: 30.

VLSM: uma organização precisa de LANs com 50 e 12 hosts. Para 50 hosts, /26 comporta 62; para 12, /28 comporta 14. Reserve blocos não sobrepostos e confira alinhamento. Para prova, primeiro identifique a quantidade de bits de host necessária, depois calcule incremento e limites.

## Erros clássicos nas bancas
**Pegadinha 1:** /27 não tem 27 hosts, mas prefixo de 27 bits. **Pegadinha 2:** broadcast não é o gateway obrigatoriamente; gateway é endereço configurado na rede. **Pegadinha 3:** máscara e host não dependem da classe histórica do IP se o prefixo é explicitamente informado. **Pegadinha 4:** não subtraia dois hosts de /31 nas hipóteses de enlaces ponto a ponto previstas no RFC 3021.

## Pratique sem consultar
Resolva `10.10.4.77/28`: escreva máscara, rede, broadcast, primeiro e último host, total de endereços e utilizáveis. Depois prove o resultado convertendo o último octeto do IP e da máscara para binário. Tente ainda dividir uma /24 em quatro /26 sem sobreposição.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
RFC 4632 — CIDR e agregação de rotas: https://www.rfc-editor.org/rfc/rfc4632.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual é a rede de 192.168.30.150/27?

A) 192.168.30.128
B) 192.168.30.144
C) 192.168.30.150
D) 192.168.30.160

**Gabarito:** A — /27 tem blocos de 32; 150 está entre 128 e 159, logo a rede começa em 128.

**Questão 2.** Quantos hosts convencionais utilizáveis existem em uma sub-rede IPv4 /28?

A) 14
B) 16
C) 30
D) 12

**Gabarito:** A — /28 contém 2^4 = 16 endereços; descontados rede e broadcast, restam 14 em LAN convencional.


---

# DNS, DHCP, TCP/UDP e diagnóstico

# Objetivo e contexto
Identificar falhas de serviço por sintomas e selecionar comandos de diagnóstico.

## Aula detalhada — entenda o mecanismo
**DNS** traduz nomes para registros e não é um mecanismo de autenticação por si só. Registro A aponta para IPv4, AAAA para IPv6, CNAME cria alias e MX auxilia entrega de e-mail. A resolução pode envolver caches locais, recursão e servidores autoritativos. **DHCP** atribui parâmetros de rede: IP, máscara, gateway, DNS e tempo de concessão; no IPv4, a sequência DORA é Discover, Offer, Request, Acknowledge.

**TCP** é orientado à conexão e oferece fluxo ordenado e confiável à aplicação; usa sequenciamento, ACKs, controle de fluxo e congestionamento. **UDP** é orientado a datagramas, sem garantia de entrega ou ordenação. Isso não significa que qualquer aplicação UDP seja “não confiável”: ela pode implementar seus próprios mecanismos de confiabilidade. A porta identifica processo/serviço dentro do contexto do protocolo, não substitui endereço IP.

Ferramentas: `ipconfig /all` e `Get-NetIPConfiguration` (Windows), `ip addr`, `ip route` (Linux), `nslookup` ou `dig` (DNS), `ping` (ICMP, quando permitido), `tracert`/`traceroute`, `Test-NetConnection host -Port 443` e `ss -lntup` para sockets. Use diagnóstico não invasivo e respeite autorização de rede.

## Exemplo resolvido passo a passo
Um computador recebe `169.254.x.x`, não acessa aplicações de rede e o `ipconfig /all` não mostra concessão válida. Hipótese inicial: falha de DHCP; confirme conectividade física, VLAN, relay DHCP e escopo.

Outro computador resolve `portal.exemplo` para o IP esperado, consegue conectar à porta 443, mas o navegador acusa erro de certificado. A cadeia evoluiu de DNS → TCP → TLS: agora investigue hostname do certificado, validade, confiança da CA, data/hora e configuração TLS. Não culpe automaticamente o DNS por qualquer falha no navegador.

Se o nome falha mas um IP funciona, compare DNS configurado, caches, resolução e registros. Em redes corporativas, consultas de nomes internos e públicos podem seguir resolvedores distintos.

## Erros clássicos nas bancas
**Pegadinha:** `ping` indisponível não demonstra automaticamente que um servidor está fora do ar; ICMP pode ser bloqueado. `nslookup` identifica DNS, mas não valida disponibilidade HTTP. TCP e UDP reutilizam números de porta em espaços distintos. DNS frequentemente usa UDP/53, porém pode usar TCP/53; DNS sobre TLS e HTTPS são alternativas com outras portas. DHCPv4 não funciona por “IP fixo obrigatório” do cliente antes de receber concessão.

## Pratique sem consultar
Monte um roteiro com cinco testes para o cenário “a rede funciona por IP, mas não pelo nome”. Para cada teste, diga o que um resultado positivo ou negativo significa. Em seguida, explique o que muda no diagnóstico se a conexão TCP à porta 443 funciona, mas a página não abre.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
RFC Editor — especificação TCP (RFC 9293): https://www.rfc-editor.org/rfc/rfc9293.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual registro DNS está associado diretamente a um endereço IPv6?

A) AAAA
B) A
C) MX
D) PTR como nome canônico necessariamente

**Gabarito:** A — AAAA mapeia nome para IPv6; A é IPv4, MX aponta servidores de e-mail, PTR é usado em resolução reversa.

**Questão 2.** Qual teste avalia especificamente a abertura da porta TCP 443 em Windows PowerShell?

A) Test-NetConnection servidor -Port 443
B) ipconfig /flushdns
C) ping servidor -t como garantia
D) Get-Date exclusivamente

**Gabarito:** A — Test-NetConnection com -Port testa conectividade TCP ao destino; ping ICMP não testa a porta.
