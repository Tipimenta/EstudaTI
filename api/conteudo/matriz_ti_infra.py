"""Infraestrutura de TI: temas cobrados em editais recentes, conteúdo autoral."""
CURRICULUM = {
  "Redes de Computadores": [
    [
      "Fundamentos Ethernet",
      "Quadro Ethernet: MAC, EtherType, dados e FCS",
      "Um quadro Ethernet contém endereços MAC destino e origem de 48 bits, campo de tipo/comprimento, dados e FCS usado para detecção de corrupção no enlace. MAC e IP não exercem a mesma função: MAC identifica comunicação no domínio de enlace, enquanto IP participa de roteamento.",
      "No formato Ethernet II, cada endereço MAC ocupa 6 bytes, EtherType 2 bytes e FCS 4 bytes. Um MAC clássico globalmente administrado possui prefixo de fabricante sob alocações IEEE, mas existem tamanhos MA-M/MA-S e endereços locais/aleatórios. Switch aprende origem por porta e VLAN, não pelo IP automaticamente.",
      "Estação de IP 192.168.1.10 envia dados ao servidor 10.10.1.20: primeiro quadro local normalmente tem destino MAC do gateway. O roteador troca cabeçalho do enlace no próximo salto, embora endereços IP finais sigam até destino salvo NAT.",
      "Pegadinha: três primeiros bytes serem 'sempre fabricante' é simplificação do MA-L tradicional, não regra universal para toda forma de MAC. FCS detecta erros, mas não criptografa quadro."
    ],
    [
      "Fundamentos Ethernet",
      "MAC: OUI, U/L e I/G no primeiro octeto",
      "MAC de 48 bits é representado por seis octetos hexadecimais. O primeiro octeto inclui bits funcionais: bit menos significativo I/G indica individual (0) ou grupo (1); bit seguinte U/L indica administração universal (0) ou local (1).",
      "Um endereço 02:00:00:12:34:56 tem primeiro octeto hexadecimal 02, binário 00000010: I/G=0 (individual), U/L=1 (localmente administrado). Em endereço 01:00:5E:..., primeiro octeto 01 tem I/G=1, indicando grupo/multicast. OUI tradicional no MA-L cobre 24 bits de prefixo, mas outras estruturas IEEE existem.",
      "Em placa que usa MAC temporário aleatório, U/L frequentemente indica local; localizar fabricante apenas pelo prefixo pode induzir erro. Um switch pode aprender origem local e encaminhar normalmente, desde que endereço seja utilizado de maneira válida no enlace.",
      "Pegadinha: a ordem dos bits deve ser examinada no PRIMEIRO octeto; 'bit mais significativo' não é I/G. MAC não identifica pessoa e pode ser alterado/aleatorizado."
    ],
    [
      "IP",
      "ARP, gateway padrão e comunicação entre sub-redes",
      "ARP resolve endereço IPv4 do próximo salto em MAC na rede local. Gateway padrão é destino de encaminhamento para prefixos não conhecidos localmente; endereço MAC do roteador, não do servidor remoto, é usado no primeiro quadro.",
      "O host compara IP de destino com máscara/prefixo. Se destino está na mesma sub-rede, resolve MAC do destino; caso contrário, consulta tabela de rotas e resolve MAC do próximo salto. ARP Request costuma ser broadcast e ARP Reply informa associação IP–MAC.",
      "Host 192.168.10.20/24 quer 192.168.20.40: não estão no mesmo /24, portanto envia ao gateway configurado, por exemplo 192.168.10.1, após ARP para gateway. Roteamento e firewall determinam continuidade.",
      "Pegadinha: switch usa tabela MAC para portas; ARP cache armazena IP↔MAC. Não são a mesma tabela. IPv6 usa Neighbor Discovery, não ARP."
    ],
    [
      "IP",
      "IPv4: máscaras binárias, CIDR e VLSM",
      "IPv4 tem 32 bits; /n fixa n bits de prefixo. Um /27 deixa 5 bits de host e possui bloco de 32 endereços. VLSM permite dividir espaço IPv4 em sub-redes de tamanhos diferentes conforme necessidades.",
      "Converta /27 em 255.255.255.224: último octeto 11100000. Blocos começam 0, 32, 64, 96. Para IP 192.168.10.75/27, rede .64, broadcast .95 e hosts usuais .65–.94; 2^5−2=30 em sub-rede convencional.",
      "Uma equipe precisa de 50 hosts, outra 20 e outra 10 em /24. Aloque /26 (62 utilizáveis), /27 (30) e /28 (14), começando nos limites alinhados. Isso reduz desperdício comparado a sub-redes uniformes.",
      "Pegadinha: /31 pode servir a enlaces ponto a ponto e /32 designa endereço individual; fórmula 2^h−2 não é universal. IP de rede não é sempre .0."
    ],
    [
      "Roteamento",
      "Rota mais específica, rotas estáticas e OSPF",
      "Tabela de rotas contém prefixos de destino, próxima etapa/interface e métricas. Encaminhamento IP normalmente usa a correspondência de prefixo mais longo; protocolos dinâmicos trocam informações para atualizar topologia.",
      "Com rotas 10.1.0.0/16 via A e 10.1.5.0/24 via B, pacote para 10.1.5.80 usa B por /24 ser mais específico. OSPF é protocolo interno link-state que constrói informações de topologia e calcula caminhos segundo custos.",
      "Ao adicionar rota específica de serviço crítico, outro caminho pode ser escolhido sem mudar DNS. Se houver rota, ainda é necessário que gateway esteja alcançável e regras de firewall permitam fluxo.",
      "Pegadinha: BGP troca rotas entre sistemas autônomos conforme políticas e atributos, não só menor quantidade de saltos. Rota padrão /0 só atua quando nenhuma mais específica corresponde."
    ],
    [
      "Protocolos",
      "TCP: handshake, sequência, ACK e retransmissão",
      "TCP oferece fluxo de bytes confiável e ordenado entre endpoints sob condições de conexão. Handshake típico envolve SYN, SYN+ACK e ACK; sequência e confirmação acompanham bytes do fluxo, não simples contagem de mensagens.",
      "Cliente envia SYN com número de sequência inicial; servidor responde SYN+ACK; cliente confirma. Perda de segmento pode provocar retransmissão; buffers e janela de recepção limitam envio. Flags e números devem ser interpretados conforme estado da conexão.",
      "Ao acessar site HTTP/1.1 sobre TCP/443, handshake TCP ocorre antes do protocolo TLS ser estabelecido. Conexão TCP bem-sucedida não prova que login HTTP ou SQL no backend funciona.",
      "Pegadinha: UDP não implementa handshake TCP, mas aplicação sobre UDP pode implementar confirmação e retransmissão próprias. TCP controla entrega de bytes, não formato semântico da resposta HTTP."
    ],
    [
      "Protocolos",
      "UDP, ICMP e escolha de transporte",
      "UDP transmite datagramas sem handshake e sem garantia nativa de entrega ou ordenação. ICMP sinaliza diagnósticos e condições da camada IP, não é protocolo de aplicação de teste de performance universal.",
      "DNS frequentemente usa UDP/53 e também TCP/53; QUIC usa UDP como transporte e implementa mecanismos próprios de confiabilidade; ping usa ICMP Echo e depende de política de resposta.",
      "Se ping a servidor falha mas HTTPS abre, ICMP pode estar filtrado. Se DNS UDP falha em respostas grandes, resolvers podem recorrer a TCP conforme protocolo e configuração.",
      "Pegadinha: UDP não significa 'sempre mais rápido' em qualquer aplicação. HTTP/3 utiliza QUIC sobre UDP, contrariando frase de que HTTP sempre usa TCP."
    ],
    [
      "Serviços",
      "DNS, DHCP e sequência de diagnóstico",
      "DHCP pode distribuir IP, máscara, gateway e DNS; DNS resolve nomes para registros como A/AAAA. Uma configuração IP atribuída com sucesso não comprova resolução de nomes nem acesso a portas específicas.",
      "Teste link, IP/máscara, gateway, rota, DNS e TCP/UDP da aplicação em ordem. Em DHCPv4, DORA exemplifica Discover, Offer, Request, Acknowledge. Em DNS, autoritativo publica dados da zona e recursivo consulta/cacha informações.",
      "Notebook obtém 192.168.1.100, consegue acessar aplicativo por 10.0.0.5, mas não por sistema.interno: o problema pode envolver DNS ou sufixo, mesmo com rota correta.",
      "Pegadinha: registro CNAME é alias, não porta; TTL influencia cache, não tempo garantido de resposta. DNSSEC autentica dados assinados, mas não cifra por si consultas."
    ],
    [
      "Segurança de redes",
      "VLAN, trunk e roteamento inter-VLAN",
      "VLAN separa domínios de enlace lógicos; quadros 802.1Q possuem tag com TPID e TCI (PCP, DEI e VID). Porta access serve VLAN normalmente sem tags; trunk leva múltiplas VLANs entre dispositivos.",
      "O VID possui 12 bits, mas valores 0 e 4095 têm uso reservado. Comunicação entre redes IP em VLANs distintas exige roteamento e políticas, não apenas colocar ambas num trunk. VLAN nativa e quadros sem tag dependem de configuração.",
      "Recepção VLAN 10, servidores VLAN 20: ambos podem trafegar em mesmo switch físico sem broadcast compartilhado. Firewall entre interfaces controla quais protocolos podem alcançar servidores.",
      "Pegadinha: VLAN não cifra dados nem substitui autenticação e firewall; erro na VLAN nativa pode expor tráfego a domínio incorreto."
    ]
  ],
  "Sistemas Operacionais e Virtualização": [
    [
      "Fundamentos SO",
      "Kernel, espaço de usuário e chamadas de sistema",
      "Kernel administra recursos críticos como memória, processos, dispositivos e sistema de arquivos; aplicações em modo usuário solicitam serviços por chamadas de sistema e normalmente não acessam hardware privilegiado diretamente.",
      "Uma operação de leitura no arquivo passa da função de biblioteca a chamada de sistema pertinente; kernel valida descritor, permissões e condições do sistema de arquivos. Erro de permissão pode vir do SO, ACL ou políticas de segurança adicionais.",
      "Quando aplicativo tenta abrir /etc/shadow sem permissão, chamada pode retornar EACCES; o programa recebe falha mesmo que exista arquivo. Executar interface como administrador apenas para contornar não é medida adequada.",
      "Pegadinha: biblioteca de aplicação não é kernel; shell é intérprete de comandos, não única interface para chamadas de sistema."
    ],
    [
      "Processos",
      "Processos, threads e escalonamento",
      "Processo tem espaço de endereçamento, recursos e contexto; thread é fluxo de execução que compartilha parte dos recursos do processo. Escalonador alterna uso da CPU e introduz custo de mudança de contexto.",
      "Threads podem progredir concorrentemente e, em múltiplos núcleos, paralelamente. Se compartilham variável, operações não atômicas podem causar corrida. Mutex, semáforo e primitivas de sincronização tratam condições específicas.",
      "Duas threads leem contador 10, ambas somam 1 e gravam 11, perdendo uma atualização esperada 12. Proteger seção crítica ou usar incremento atômico impede essa perda no modelo correto.",
      "Pegadinha: muitas threads não garantem mais desempenho quando há contenção, I/O ou agendamento excessivo. Processos não são programas armazenados, mas execuções."
    ],
    [
      "Memória",
      "Memória virtual, páginas e page fault",
      "Memória virtual oferece abstração de espaço de endereçamento e permite proteção entre processos. Páginas virtuais são mapeadas para quadros físicos conforme tabelas e mecanismos da MMU.",
      "Um page fault ocorre quando acesso precisa de tratamento do SO; pode ser normal se página ainda não está presente e pode também representar violação de proteção. Swap troca dados entre RAM e armazenamento em configurações pertinentes, com alto custo relativo.",
      "Aplicação acessa página que estava em swap; sistema pode buscar dados no disco e atualizar mapeamento. Uso intenso de swap pode produzir thrashing e queda grande de desempenho.",
      "Pegadinha: falha de página não é sempre erro fatal. Ter 32 GB de memória virtual não significa ter essa quantidade de RAM instalada."
    ],
    [
      "Arquivos",
      "Sistemas de arquivos, permissões e ACL",
      "Sistemas de arquivos organizam metadados, diretórios e dados persistidos. Em Linux, r/w/x variam de significado entre arquivos e diretórios; ACLs permitem regras mais específicas que tríades de dono/grupo/outros.",
      "Em diretório, x permite atravessá-lo; r pode listar entradas; w+x permitem criar/remover nomes sob condições. Umask filtra bits no momento da criação, enquanto chmod modifica permissões de objeto existente.",
      "Com umask 027, criação típica de arquivo a partir de 666 gera 640; diretório a partir de 777 gera 750. Um usuário pode ler arquivo mas não alcançá-lo se faltar x no diretório pai.",
      "Pegadinha: chmod 777 não é solução segura universal. NTFS usa ACL própria; não aplique o modelo Unix exatamente ao Windows."
    ],
    [
      "Windows",
      "AD DS, DNS SRV e Kerberos",
      "Active Directory Domain Services mantém objetos de domínio; DNS com registros SRV ajuda localizar controladores; Kerberos realiza autenticação por tíquetes. Grupos de segurança e ACLs orientam autorização.",
      "Um cliente encontra controlador por DNS, negocia autenticação, recebe credenciais/tíquetes e depois tenta acesso a recursos conforme permissões. Hora incorreta pode comprometer autenticação Kerberos.",
      "Computador recebe DNS público e abre Internet, mas não entra no domínio: verifique resolução de serviços internos. Usuário loga, mas pasta nega acesso: examine grupos e ACL, não apenas Kerberos.",
      "Pegadinha: OU agrupa objetos e ajuda vincular GPO; não concede automaticamente permissões de arquivos. LDAP consulta diretório e não substitui Kerberos."
    ],
    [
      "Windows",
      "GPO, unidades organizacionais e aplicação de políticas",
      "Group Policy Object define configurações de computador e usuário. Links a sites, domínios e OUs, herança, filtros, segurança e ordem de processamento influenciam quais políticas se aplicam.",
      "Para diagnosticar política ausente, identifique objeto e OU, vínculo e filtro, replicação, escopo de computador/usuário e resultado efetivo, com ferramenta como gpresult. Uma atualização pode depender do momento de processamento.",
      "GPO define bloqueio de tela após tempo definido em computadores da recepção; uma estação fora da OU correspondente talvez não receba configuração. Alterar GPO não prova aplicação instantânea.",
      "Pegadinha: política que mapeia unidade não concede por si permissão NTFS; os controles de compartilhamento e identidade precisam coincidir."
    ],
    [
      "Serviços",
      "systemd, journalctl e diagnósticos Linux",
      "systemd gerencia serviços e unidades em muitas distribuições. systemctl status mostra estado gerenciado; journalctl consulta registros; ferramentas ss e ip ajudam investigar rede e sockets.",
      "Confirme processo, logs no período do erro, porta escutada, dependências e funcionalidade real. Serviço 'active' pode responder HTTP 500 por banco indisponível. Reiniciar sem registrar sintomas pode ocultar causa.",
      "Se systemctl status diz active, mas endpoint /health retorna 503, procure logs da aplicação, banco e rota; não conclua que servidor está saudável por existir PID.",
      "Pegadinha: systemctl enable trata habilitação de inicialização e não necessariamente inicia processo imediatamente; status ativo não comprova operação de ponta a ponta."
    ],
    [
      "Virtualização",
      "Hipervisor, vCPU, memória e migração P2V",
      "Hipervisor fornece recursos virtuais a sistemas convidados, isolando hardware lógico. vCPU representa capacidade de execução agendada e não equivale necessariamente a um núcleo físico dedicado.",
      "Migração P2V captura sistema físico para VM compatível, incluindo drivers, partições, boot BIOS/UEFI e rede. A validação exige iniciar em ambiente isolado, conferir aplicações e evitar duas máquinas com mesma identidade na rede simultaneamente.",
      "Servidor Windows com volumes RAID físicos vira VM: volumes virtuais podem replicar estrutura lógica, mas não a controladora física. Verifique serviços, licenças e banco antes de cortar para produção.",
      "Pegadinha: snapshot da VM não equivale a backup isolado; excesso de vCPUs ou RAM comprometida pode afetar outras VMs do host."
    ],
    [
      "Armazenamento",
      "RAID, hot spare, rebuild e backup",
      "RAID agrega discos para desempenho e/ou tolerância a falhas físicas. RAID 1 espelha; RAID 5 distribui paridade tolerando normalmente uma falha; RAID 6 suporta duas falhas nas condições do arranjo.",
      "Após falha, conjunto pode operar degradado e realizar rebuild usando disco substituto ou hot spare. Isso consome recursos e aumenta vulnerabilidade até recomposição; exclusão lógica e ransomware são propagados às cópias ativas.",
      "Três discos 2 TB em RAID 5 oferecem aproximadamente 4 TB úteis antes de overhead, sem contar diferenças entre unidades. Apagar tabela do banco não é recuperável por RAID sozinho.",
      "Pegadinha: réplica e RAID não substituem backup versionado e teste de restauração. 'Tolerância a um disco' não garante sobrevivência a outra falha."
    ]
  ],
  "Segurança da Informação": [
    [
      "Fundamentos",
      "Confidencialidade, integridade, disponibilidade e autenticidade",
      "Confidencialidade restringe leitura não autorizada; integridade detecta/prevene alterações indevidas; disponibilidade mantém acesso no tempo necessário. Autenticidade e não repúdio abordam outros objetivos com mecanismos específicos.",
      "Mapeie controle ao risco: criptografia protege sigilo conforme chave, hash serve integridade em contexto adequado, redundância melhora disponibilidade, assinatura digital associa chave e verifica integridade.",
      "Um ransomware pode indisponibilizar dados ainda que o disco esteja criptografado corretamente em repouso. Backup isolado ajuda recuperação, mas não desfaz eventual vazamento de informação.",
      "Pegadinha: assinatura digital não cifra necessariamente conteúdo; TLS não corrige permissão errada no servidor. CIA não é sigla de três tecnologias."
    ],
    [
      "Criptografia",
      "Cifra simétrica, AES e modos autenticados",
      "Criptografia simétrica utiliza segredo compartilhado para cifrar e decifrar. AES opera sobre blocos e requer modo de operação e parâmetros adequados; modos autenticados como GCM protegem também integridade/autenticidade de dados conforme uso correto.",
      "Não reutilize nonce de forma insegura em modos que exigem unicidade; gerencie chaves com rotação, controle de acesso e separação de ambientes. Algoritmo forte pode falhar por senha exposta ou má implementação.",
      "Backup é cifrado com AES-GCM e chave mantida fora do conjunto comprometido; o atacante que rouba apenas o arquivo não deve conseguir lê-lo sem chave sob hipóteses corretas. Se chave estava no mesmo servidor, proteção cai.",
      "Pegadinha: criptografia não é backup nem impede apagar arquivo por conta autorizada. AES-256 não garante segurança se chaves são divulgadas."
    ],
    [
      "Criptografia",
      "Assinatura digital, PKI e certificados",
      "Assinatura usa chave privada para produzir prova verificável com chave pública, conforme algoritmo e contexto. Certificado associa identidade a chave pública e integra cadeia de confiança de autoridade certificadora.",
      "Validação envolve assinatura, certificado, nome, período, cadeia e revogação conforme sistema. PKI não é sinônimo de TLS; TLS pode usar certificados para autenticar servidor e proteger sessão.",
      "Assinatura de laudo eletrônico pode permitir verificar alteração após assinatura, mas não impedir que terceiros leiam o documento desprotegido. Para sigilo, são necessários mecanismos adicionais.",
      "Pegadinha: hash SHA-256 não identifica autor sozinho; assinatura válida não prova que a informação declarada era verdadeira."
    ],
    [
      "Identidades",
      "MFA, TOTP e FIDO2/WebAuthn",
      "Autenticação multifator usa fatores de categorias distintas (conhecimento, posse, inerência). TOTP gera código temporal; FIDO2/WebAuthn emprega credenciais criptográficas associadas a domínio/serviço, reduzindo ataques comuns de phishing.",
      "Senha+PIN são dois segredos de conhecimento, não necessariamente dois fatores. Usuário pode ser enganado a digitar TOTP em página falsa; autenticação vinculada à origem protege melhor essa classe de ataque.",
      "Um usuário abre link semelhante ao portal real; atacante coleta senha e TOTP no período de validade. WebAuthn com verificação adequada de origem tende a impedir uso de credencial no domínio falso.",
      "Pegadinha: ter MFA não resolve autorização incorreta que permite consultar dados de outro paciente. Sessões e recuperação de conta também requerem proteção."
    ],
    [
      "Aplicações",
      "BOLA/IDOR, controle de acesso e API",
      "Controle de acesso verifica quem pode agir sobre cada recurso. BOLA/IDOR ocorre quando API aceita identificador manipulado sem confirmar autorização do usuário àquele objeto.",
      "Servidor recebe GET /prontuarios/42 com sessão A: deve filtrar pelo escopo e permissão do usuário A. Ocultar link no React não basta, pois cliente pode enviar requisição diretamente.",
      "Usuário A possui registro 42 e B possui 43; A altera ID para 43 e API responde com prontuário de B. O problema é autorização, mesmo com HTTPS e senha forte.",
      "Pegadinha: verificar token assinado não significa conceder todas as permissões. Teste GET, PATCH e DELETE com usuário de outro perfil."
    ],
    [
      "Aplicações",
      "SQL Injection, XSS e validação contextual",
      "Injection ocorre quando entrada não confiável altera interpretação de comando. XSS pode executar código no contexto de navegador da vítima ao renderizar conteúdo sem tratamento adequado. Defesas dependem do local de uso.",
      "Consulta parametrizada separa estrutura SQL de valores e reduz injeção. Para HTML, codifique saída conforme contexto (texto, atributo, JavaScript, URL) e use políticas/controles de navegador como camadas adicionais.",
      "Entrada de busca contendo aspas e operadores SQL deve ser tratada como valor literal, não concatenada a query. Texto de usuário exibido no navegador não deve ser interpretado como código executável.",
      "Pegadinha: 'escapar caracteres especiais' genericamente não substitui parâmetro SQL nem codificação apropriada de HTML; CORS não é firewall de API."
    ],
    [
      "Governança",
      "Inventário de ativos, classificação e riscos",
      "Sem inventário é difícil proteger sistemas, dados e dependências. Classificação de informação define tratamento conforme sensibilidade, criticidade e exigências; avaliação de risco liga ameaça, vulnerabilidade, impacto e controles.",
      "Catalogue sistema, proprietário, versão, dados, fornecedor, dependências e recuperação esperada. Para risco, documente cenário, probabilidade e consequência, não apenas nota colorida. Reavalie após mudança relevante.",
      "PACS depende de SQL, rede, storage e fornecedor; um inventário só com nome do software perde dependências necessárias ao plano de continuidade.",
      "Pegadinha: alta criticidade operacional não torna automaticamente toda informação 'sigilosa' juridicamente; classificação depende de critérios."
    ],
    [
      "Governança",
      "NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover",
      "NIST CSF 2.0 organiza resultados de cibersegurança em seis funções. Govern estabelece contexto, decisões e responsabilidades; Identify conhece riscos; Protect aplica salvaguardas; Detect identifica eventos; Respond age sobre incidentes; Recover restabelece capacidade.",
      "Para uma vulnerabilidade crítica, Govern define aceitação e donos; Identify localiza ativos afetados; Protect corrige; Detect monitora exploração; Respond contém; Recover reconstrói serviços quando necessário.",
      "Aprovar política de backup cobre diretriz, mas não prova restauração; evidências de teste e recuperação precisam ser avaliadas nos resultados correspondentes.",
      "Pegadinha: NIST CSF não impõe pontuação única obrigatória nem dispensa análise de regulamentação local. As funções interagem, não são seis departamentos isolados."
    ],
    [
      "Continuidade",
      "BIA, RTO, RPO e teste de recuperação",
      "BIA identifica consequências de interrupção e ajuda definir prioridades. RTO é meta de retorno operacional; RPO é perda temporal tolerada de dados. Tecnologias são selecionadas para atender objetivos sob restrições.",
      "Em cenário de falha, registre momento da parada, último ponto consistente, tempo de restauração e retorno funcional. Cronometre também autenticação, DNS e integrações.",
      "Falha às 14h, último backup 13h30, serviço volta 15h45. Perda potencial 30min e recuperação 1h45: com RPO15min e RTO2h, apenas RTO é cumprido.",
      "Pegadinha: replicação pode copiar corrupção ou exclusão; backup diário não garante RPO de 15min. Servidor ligado não significa aplicação usável."
    ]
  ],
  "Nuvem e DevOps": [
    [
      "Cloud",
      "IaaS, PaaS, SaaS e responsabilidade compartilhada",
      "IaaS fornece infraestrutura virtual, PaaS abstrai parte da plataforma e SaaS oferece aplicação pronta. Em qualquer modelo, responsabilidades sobre identidades, dados e permissões precisam ser analisadas contrato a contrato.",
      "Faça uma matriz para hardware, SO, runtime, aplicação, dados, backup, logs e chaves. Quanto mais gerenciado o serviço, algumas responsabilidades passam ao provedor, mas a organização não deixa de responder por uso e configuração.",
      "Flask numa VM administrada pela equipe aproxima-se de IaaS; em serviço gerenciado de execução de código aproxima-se de PaaS; usar e-mail corporativo pronto é SaaS.",
      "Pegadinha: nuvem pública, privada e híbrida são modelos de implantação, não equivalem automaticamente a IaaS/PaaS/SaaS."
    ],
    [
      "Cloud",
      "Regiões, zonas de disponibilidade e resiliência",
      "Região reúne infraestrutura em área geográfica; zonas de disponibilidade separam parte dos domínios de falha segundo fornecedor. Usar múltiplas zonas pode melhorar tolerância, mas aumenta custos e complexidade.",
      "Desenhe dependências de DNS, banco, storage e autenticação. Replicar app em zonas distintas não resolve se todo tráfego depende de um único banco e de uma credencial comprometida.",
      "Duas instâncias web em zonas diferentes compartilham banco de zona única; falha do banco ainda derruba o serviço. Resiliência precisa cobrir a cadeia, não apenas o frontend.",
      "Pegadinha: 'multi-AZ' não significa automaticamente multi-região nem garantia de zero indisponibilidade. Backup independente continua necessário."
    ],
    [
      "Contêineres",
      "Dockerfile, imagem, contêiner e volumes",
      "Dockerfile descreve build; imagem é artefato reutilizável; contêiner é instância isolada de processos; volume guarda dados conforme mecanismo de persistência. Em Linux, contêiner compartilha kernel do host.",
      "FROM define base, RUN executa na construção, COPY insere arquivos e CMD informa comando padrão. Alterações na camada gravável do contêiner podem desaparecer na recriação; banco durável deve ter armazenamento apropriado.",
      "Uma API é publicada com imagem versão 2.2 e banco externo Neon; recriar contêiner não remove dados do Neon, mas pode apagar arquivos locais escritos apenas na camada efêmera.",
      "Pegadinha: EXPOSE não publica sozinho porta no host; contêiner não é VM completa; guardar senha no Dockerfile expõe segredo em artefato."
    ],
    [
      "Contêineres",
      "Kubernetes: Pod, Deployment, Service e Ingress",
      "Pod é unidade de execução que agrupa contêineres; Deployment gerencia réplicas e rollout de Pods; Service oferece ponto estável de acesso lógico; Ingress pode rotear HTTP conforme controlador e configuração.",
      "Controle de réplicas compara estado desejado e atual. Readiness probe decide quando instância pode receber tráfego; liveness pode reiniciar instância incapaz de operar; probes mal configuradas causam interrupções.",
      "Uma API inicia processo em 2 segundos, mas precisa de 20 para conectar banco. Readiness deve evitar envio de requisições antes de serviço estar pronto, em vez de assumir que processo criado significa saudável.",
      "Pegadinha: Service não garante TLS nem autorização de aplicação; Pod pode ser recriado com outro IP, por isso descoberta estável é necessária."
    ],
    [
      "CI/CD",
      "Pipeline, testes, artefatos e rollback",
      "CI integra mudanças e executa testes e build; CD pode significar entrega ou implantação contínua. Artefato versionado e hash de commit ajudam associar código testado à versão realmente executada.",
      "Faça validação de tipos, testes API com banco isolado, integração PostgreSQL em ambiente não produtivo, build frontend, publicação e verificação pós-deploy. Separe rollback de código e compatibilidade de migração de dados.",
      "Site Vercel está no SHA A e Render no SHA B: endpoints novos podem falhar apesar de ambos estarem 'READY'. Compare SHA, contrato e health para comprovar compatibilidade.",
      "Pegadinha: sucesso da compilação não prova login, segurança, performance ou qualidade de conteúdo. Chave de API não deve ser impressa em logs."
    ],
    [
      "Operação",
      "Logs, métricas e traces distribuídos",
      "Logs descrevem eventos individuais, métricas agregam medidas por tempo e traces seguem percurso de uma requisição entre componentes. Observabilidade combina sinais para formular hipóteses, sem garantir diagnóstico instantâneo.",
      "Para lentidão de API, veja p95 de latência, taxa de erros, trace de requisição e tempo de consulta SQL. Uma CPU baixa não exclui gargalo de rede ou lock no banco.",
      "Pico de erro 503 coincide com saturação do pool de conexões PostgreSQL; métricas revelam volume, traces mostram espera e logs identificam timeout. Correção deve ser testada, não apenas aumentar workers.",
      "Pegadinha: health check HTTP 200 em processo que não toca banco pode esconder indisponibilidade funcional. Evite dados pessoais sensíveis em registros."
    ],
    [
      "Automação",
      "IaC, drift e gerenciamento de configuração",
      "Infraestrutura como código descreve recursos e configurações versionados; drift ocorre quando estado real diverge do declarado. Ferramenta pode estimar plano de mudanças antes de aplicação.",
      "Revise mudanças de rede, armazenamento e privilégios antes de aplicar. Armazene credenciais em cofre/segredos e evite commit de arquivos sensíveis. Teste ambientes antes de produção.",
      "Alguém altera firewall manualmente e arquivo IaC não é atualizado; próximo apply pode desfazer regra e interromper acesso. Registro da exceção evita surpresa.",
      "Pegadinha: IaC não substitui aprovação de mudanças nem garante que dados produzidos no banco serão restaurados após destruição do recurso."
    ],
    [
      "Custos",
      "FinOps, medição de consumo e escalabilidade",
      "FinOps busca visibilidade e governança dos custos de nuvem ligados a valor de serviço. Elasticidade permite ajustar recursos a demanda, mas valores dependem de planos, regiões, armazenamento, saída e consumo.",
      "Compare carga real, picos, horas de utilização, custos de tráfego e armazenamento. Não escolha serviço 'gratuito' sem considerar limite de execução, suspensão e preço acima da franquia.",
      "API com poucos acessos pode funcionar em plano gratuito, mas inatividade do serviço pode causar inicialização lenta; adicionar cache pode reduzir custo e introduzir requisito de invalidação.",
      "Pegadinha: autoscaling não resolve consultas SQL ineficientes e pode aumentar gastos sem remover gargalo. Mensure custo por operação útil."
    ]
  ]
}
