"""Guias minuciosos específicos, revisados para integrar ao Estuda 2.2.

Cada seção demonstra mecanismo, estrutura, exemplo resolvido, exceção e revisão.
A aplicação é só leitura: nenhuma alteração no banco ou progresso dos alunos.
"""

TECH_GUIDES = {
("Redes de Computadores", "IPv4, sub-redes e DNS"): """
## Aprofundamento técnico — IPv4 é um número binário, não quatro números independentes

### 1. Como o endereço é construído?
IPv4 tem **32 bits**. Um bit armazena 0 ou 1; oito bits formam um **octeto**, com 256 combinações (0 a 255). O endereço \`192.168.10.37\` são quatro octetos escritos em decimal, separados por pontos. O primeiro, \`192\`, é \`11000000\` em binário: 128 + 64. Já o 37 é \`00100101\`: 32 + 4 + 1. O computador realiza operações sobre bits, não sobre a aparência com pontos.

### 2. O que significa /27?
O prefixo \`/27\` reserva 27 bits iniciais para identificar a rede e deixa **5 bits** para números dentro dela. Cinco bits produzem \`2^5 = 32\` endereços, e o tamanho do bloco é 32. O último octeto é dividido em 0–31, 32–63, 64–95 e assim por diante. Como 37 está no intervalo 32–63, a rede é \`192.168.10.32/27\`; o broadcast IPv4 convencional é \`192.168.10.63\`. Os endereços de host usuais vão de \`.33\` a \`.62\`, totalizando **30**.

### 3. Confirme em bits
37 em binário = \`00100101\`. A máscara /27 termina em \`11100000\`, ou \`224\` decimal. A operação **AND** por posição mantém 1 somente onde os dois bits são 1: \`00100101 AND 11100000 = 00100000\`, que vale 32. É assim que o endereço da rede é calculado.

### 4. E onde entra o DNS?
A máscara decide se outro endereço IP está na rede local. O **DNS** resolve um *nome*, como \`portal.exemplo.com\`, para registros de endereçamento (A/AAAA); ele não calcula a máscara, não entrega IP por DHCP e não escolhe a rota. Se DNS falhar, o nome pode não abrir mesmo com uma conexão IP funcional.

**Exceções:** /31 pode atender enlaces ponto a ponto; /32 designa um endereço individual. Não aplique a fórmula \`2^bits_de_host-2\` sem verificar o contexto. O exemplo acima é de sub-rede convencional.

**Teste:** Para \`192.168.10.70/27\`, a rede é .64, o broadcast .95, e hosts usuais .65 a .94. Explique por que, antes de conferir a resposta.
""",
("Redes de Computadores", "VLAN, trunk e 802.1Q"): """
## Aprofundamento técnico — cada campo do 802.1Q tem função

### 1. Rede física versus rede lógica
Uma **VLAN** separa um switch em domínios de enlace/broadcast lógicos. As VLANs 10 (recepção) e 20 (laboratório) podem usar o mesmo switch sem compartilhar automaticamente o tráfego de broadcast. **VLAN não significa criptografia**; para comunicar redes IP distintas é necessário roteamento e autorização adequada.

### 2. O quadro Ethernet
O cabeçalho Ethernet tradicional contém **MAC destino (6 bytes)**, **MAC origem (6 bytes)** e um campo **tipo/comprimento (2 bytes)**. Depois vêm dados e um campo de checagem **FCS (4 bytes)**. Em quadros marcados com IEEE 802.1Q há **quatro bytes adicionais** entre o MAC origem e o tipo original. São:
- **TPID**, 16 bits, tipicamente \`0x8100\`, que indica marcação de VLAN;
- **TCI**, 16 bits, composto por **PCP** (3 bits de prioridade), **DEI** (1 bit relacionado a elegibilidade de descarte) e **VID** (12 bits para identificação da VLAN).

O campo VID possui 4096 combinações binárias, mas os valores 0 e 4095 são reservados; IDs de VLAN normalmente utilizáveis são **1 a 4094**.

### 3. Access e trunk não significam a mesma coisa
A porta **access** normalmente pertence a uma VLAN e costuma transmitir ao computador quadros sem tag. A porta **trunk** transporta quadros de várias VLANs entre equipamentos que interpretam as tags. Em configurações usuais, pode haver tráfego sem tag associado à VLAN nativa: configurações inconsistentes podem gerar falha ou riscos.

### 4. Caso resolvido
Estação \`192.168.10.50/24\` está na VLAN 10; servidor \`192.168.20.30/24\` na VLAN 20. Um trunk corretamente configurado preserva as VLANs, mas **não** faz o pacote passar da rede 10 para a 20. É preciso um roteador, firewall ou switch de camada 3 com interfaces/rotas apropriadas.

**Pegadinha:** habilitar \`802.1Q\` não cria automaticamente comunicação inter-VLAN. **Pergunta:** quantos bits do TCI representam o VID? Doze, mas nem todos os 4096 valores são IDs de VLAN atribuíveis.
""",
("Redes de Computadores", "DNS: registros e resolução"): """
## Aprofundamento técnico — o caminho completo de uma consulta DNS

### 1. Que pergunta está sendo feita?
Ao abrir \`www.exemplo.com\`, o navegador precisa localizar endereços úteis para o serviço. Uma consulta DNS pede determinado **tipo de registro**. **A** contém IPv4; **AAAA** contém IPv6; **CNAME** indica um nome alternativo; **MX** identifica servidores de correio, com prioridade; **TXT** armazena texto usado para diferentes verificações. O DNS não confirma que um site está saudável: ele fornece informações registradas.

### 2. Resolvedor, raiz e autoridade
O computador costuma perguntar ao **resolvedor recursivo** configurado. Se não tiver resultado válido em cache, o resolvedor pode consultar infraestrutura hierárquica: raiz (\`.\`), servidores do domínio de topo (\`.com\`) e servidores **autoritativos** de \`exemplo.com\`. A raiz não mantém o IPv4 de cada site; encaminha referências à zona adequada. Um autoritativo publica dados da zona sob sua responsabilidade; não é obrigado a resolver qualquer nome da Internet para o cliente.

### 3. Cache e TTL
Cada resposta pode ter **TTL**, o tempo máximo anunciado em segundos para reutilização da resposta em cache, sujeito ao comportamento do resolvedor. Se um A muda de \`192.0.2.10\` para \`192.0.2.20\`, quem ainda tem cache válido pode continuar recebendo o valor antigo. Isso não significa necessariamente que o servidor novo está fora do ar.

### 4. Diagnóstico comentado
Se \`portal.exemplo.com\` falha, mas conexão por IP ao serviço correto funciona, teste a resolução com \`nslookup\` ou \`dig\`, registrando qual servidor DNS respondeu e o tipo consultado. **NXDOMAIN** indica que o nome consultado não existe naquela resposta; **SERVFAIL** aponta falha de processamento. Uma resposta DNS correta não garante acesso HTTP, rota, TLS ou login.

**Transporte:** UDP porta 53 é frequente, mas DNS também utiliza TCP 53; existem modalidades criptografadas como DoT/DoH. **DNSSEC** permite validar autenticidade de dados assinados, mas não cifra o tráfego.

**Teste:** O usuário consulta DNS com sucesso e recebe HTTP 403. É falha de DNS? Não: o servidor foi alcançado e negou autorização conforme a resposta HTTP.
""",
("Sistemas Operacionais e Virtualização", "Active Directory, LDAP e Kerberos"): """
## Aprofundamento técnico — três componentes distintos do domínio Windows

### 1. Quem guarda o quê?
O **Active Directory Domain Services (AD DS)** é um diretório de objetos, como usuários, computadores, grupos e unidades organizacionais. Uma **OU** organiza objetos e ajuda a delimitar políticas/delegações; não é equivalente a um grupo que concede acesso. Um **grupo de segurança** pode ser associado a permissões de recursos. O AD DS usa **LDAP**, protocolo de acesso a informações de diretório, para diversas consultas e operações.

### 2. Por que o DNS é essencial?
Para encontrar um controlador de domínio, clientes Windows consultam registros DNS de serviço como **SRV**. Apontar o DNS de uma estação integrante do domínio somente para um resolvedor público pode impedir a descoberta dos serviços internos, mesmo quando a Internet abre normalmente. **DNS resolve localização; Kerberos participa da autenticação** — não confunda as funções.

### 3. O que faz o Kerberos?
A autenticação Kerberos usa um **KDC** (centro de distribuição de chaves), normalmente associado ao controlador de domínio. Um fluxo simplificado envolve obter um **TGT** (*Ticket Granting Ticket*) e depois um tíquete para o serviço desejado. O cliente não precisa reenviar senha em texto claro a cada acesso. Relógios muito diferentes entre participantes podem causar falhas de autenticação; sincronização de horário é fundamental.

### 4. Autorização e GPO
Depois da autenticação, permissões como ACL de compartilhamento/NTFS determinam o que a conta pode fazer. **GPO** define configurações aplicadas conforme links a sites/domínios/OUs, precedência e filtros. Uma GPO que configura tela de bloqueio não significa permissão de leitura num compartilhamento.

### 5. Oficina de diagnóstico
Quando login em domínio falha: (1) anote DNS configurado; (2) verifique descoberta do controlador; (3) confira horário; (4) investigue comunicação e eventos de autenticação; (5) se apenas recurso específico negar acesso, confira grupos e ACL. Não habilite 'acesso total' para testar de maneira permanente.

**Pegadinha:** um computador pode pingar o controlador e ainda não localizar os registros SRV. **Pergunta:** LDAP substitui Kerberos? Não; consulta de diretório e autenticação são mecanismos diferentes, embora interajam.
""",
("Sistemas Operacionais e Virtualização", "Linux: permissões e usuários"): """
## Aprofundamento técnico — interpretando permissões caractere por caractere

### 1. Leia o formato antes de decorar números
A saída \`-rwxr-x---\` de \`ls -l\` é formada por um tipo de entrada e três tríades de permissões. Primeiro \`-\`: arquivo comum; \`d\` indicaria diretório. Em seguida \`rwx\` para dono, \`r-x\` para grupo e \`---\` para outros. Valores octais: **r=4, w=2, x=1**. Logo, dono 4+2+1=7, grupo 4+0+1=5, outros 0: **750**.

### 2. Arquivo não funciona como diretório
Em **arquivo**, \`r\` permite leitura, \`w\` alteração do conteúdo e \`x\` execução (quando apropriado). Em **diretório**, \`r\` permite listar nomes sob condições pertinentes; \`w\` em conjunto com \`x\` permite criar/remover entradas; \`x\` autoriza atravessar o diretório e alcançar entradas conhecidas. Um usuário pode ler um arquivo, mas não conseguir alcançá-lo se um diretório pai não permitir travessia.

### 3. Quem é o usuário efetivo?
O kernel aplica permissões considerando identidade efetiva, grupos e regras adicionais. \`chmod\` altera permissões; \`chown\` altera proprietário; \`id\` mostra identidades e grupos; \`getfacl\` pode mostrar ACLs adicionais onde suportadas. O comando \`sudo\` executa segundo políticas de delegação, não é um modo de arquivo.

### 4. Umask sem subtração enganosa
Para arquivos comuns, a base usual de criação é **666**; para diretórios, **777**. A máscara **022** remove bits correspondentes: arquivo \`666 AND NOT 022 = 644\`; diretório \`777 AND NOT 022 = 755\`. Isso é operação sobre bits, não subtração decimal universal.

**Caso:** um serviço precisa gravar em \`/var/app/relatorios\` e não consegue. Verifique usuário de execução, dono/grupo do diretório, permissões de travessia nos pais, ACL e eventual política SELinux/AppArmor. Alterar tudo para 777 não é diagnóstico adequado.

**Teste:** por que \`chmod 644\` não torna um script executável diretamente? Porque nenhum dos três grupos recebe o bit \`x\`.
""",
("Sistemas Operacionais e Virtualização", "RAID e disponibilidade"): """
## Aprofundamento técnico — disponibilidade de disco não é backup

### 1. Bloco, espelho e paridade
**RAID 0** distribui dados entre discos (*striping*) e não oferece tolerância à falha: perder um dos discos geralmente compromete o conjunto. **RAID 1** espelha dados, formando cópias simultâneas; um espelho de dois discos pode suportar a falha de um membro. **RAID 5** distribui blocos de dados e paridade entre pelo menos três discos; tolera, em regra, uma falha. **RAID 6** utiliza paridade dupla e pode tolerar duas falhas de disco em condições usuais.

### 2. Como funciona a paridade?
Imagine uma paridade XOR simplificada. Com dados binários \`1010\` e \`1100\`, a paridade é \`0110\`, porque XOR devolve 1 onde os bits diferem. Se um dos blocos se perde, podemos reconstruí-lo usando o outro bloco e a paridade: \`1100 XOR 0110 = 1010\`. RAIDs reais distribuem esses blocos entre discos e usam implementações específicas; o exemplo demonstra a ideia, não a organização completa do controlador.

### 3. Capacidade e risco
Com três discos iguais de 2 TB, RAID 5 oferece capacidade útil aproximada de **(3–1)×2=4 TB**, antes de overhead e diferenças de unidades. Já RAID 1 de dois discos de 2 TB costuma oferecer 2 TB úteis. Durante *rebuild* após falha, o conjunto pode sofrer carga elevada e ficar mais vulnerável a outra perda; monitoramento e peças de reposição importam.

### 4. Por que RAID não é backup?
Exclusão acidental, corrupção lógica, ransomware e erro de administração podem afetar simultaneamente todo o conjunto RAID. Um **backup** mantém cópias recuperáveis, preferencialmente isoladas e versionadas, e precisa ser testado mediante restauração.

**Exemplo de prova:** dois discos de 1 TB em RAID 1 são duas cópias, mas não equivalem a dois backups independentes. Não há histórico de versões nem proteção contra apagamento sincronizado.

**Teste:** qual RAID clássico tolera duas falhas de discos? RAID 6 (em condições normais). Por que ainda requer backup? Porque tolerância a falha física não protege outras causas de perda.
""",
("Segurança da Informação", "Criptografia simétrica, assimétrica e hash"): """
## Aprofundamento técnico — não confunda cifrar, resumir e assinar

### 1. Criptografia simétrica
Uma cifra simétrica usa uma **chave secreta** para proteger e recuperar informação. AES é um algoritmo muito utilizado. A segurança depende do modo de operação, tamanho e administração da chave, e de outros parâmetros; "usar AES" isoladamente não garante implementação segura. Em modo autenticado, como AES-GCM, uma verificação de integridade/autenticidade também pode ser fornecida.

### 2. Criptografia assimétrica
Emprega par de chaves relacionadas: **pública** e **privada**. Algumas operações usam a pública para cifrar algo que só a privada correspondente pode decifrar, dependendo do algoritmo/esquema; assinaturas digitais funcionam em direção distinta: o titular usa chave privada para assinar e terceiros verificam com a pública. TLS 1.3 normalmente estabelece segredos com mecanismos de acordo de chaves e usa cifra simétrica para proteger dados da sessão. Não imagine que todo pacote HTTPS seja cifrado individualmente com RSA.

### 3. Hash não se decifra
Uma função hash criptográfica, como SHA-256, transforma uma mensagem de tamanho variável em um resumo de tamanho fixo. Mudanças pequenas costumam produzir resultado muito diferente. Hash é útil em integridade e assinatura, mas não serve como criptografia reversível. **Senha não deve ser guardada apenas como SHA-256 simples**: prefira função de derivação resistente a ataques de força bruta, como Argon2id, com sal individual e parâmetros apropriados.

### 4. Assinatura não garante sigilo
Assinar um documento não impede que ele seja lido por terceiros; fornece meios para verificar integridade e autoria vinculada à chave. Um certificado associa identidade a uma chave pública sob regras de confiança específicas. Certificados não garantem que o conteúdo do site ou software seja seguro.

**Caso resolvido:** a clínica precisa garantir que o backup transportado não seja lido por terceiros e detectar alterações. Pode usar cifra autenticada com chave protegida, manter verificações de restauração e controle de acesso. Assinatura pode reforçar autenticidade, mas não substitui confidencialidade.

**Pegadinha:** AES, SHA-256 e assinatura RSA resolvem exatamente o mesmo problema? Não: cifra, hash e assinatura possuem finalidades diferentes.
""",
("Segurança da Informação", "RTO, RPO e continuidade"): """
## Aprofundamento técnico — calcule recuperação em vez de aceitar promessas

### 1. RTO não é RPO
**RTO** (*Recovery Time Objective*) é o tempo-alvo para restaurar a operação após interrupção; **RPO** (*Recovery Point Objective*) é a perda de dados tolerável expressa em tempo. Se RTO é **2 horas** e RPO é **15 minutos**, um sistema deve voltar dentro do alvo de duas horas e o último ponto recuperável deve estar dentro dos quinze minutos tolerados (nas condições definidas no plano). São métricas diferentes.

### 2. Exemplo com relógio
Imagine falha às **14h00**; último backup consistente às **13h30**. Perder os registros feitos entre 13h30 e 14h00 representa **30 minutos** de dados. Isso viola um RPO de 15 minutos. Se o sistema é restaurado às **15h45**, o tempo até retorno é **1h45**, respeitando RTO de 2 horas. **Conclusão:** cumpriu RTO e descumpriu RPO.

### 3. Escolha tecnologia após impacto do negócio
A **BIA** (*Business Impact Analysis*) determina quais serviços são críticos, consequências de parada, dependências e limites aceitáveis. Só então escolha frequência de backup, retenção, replicação, redundância e alternativas manuais. Uma réplica síncrona pode reduzir perda por falha física, mas também pode propagar exclusões e corrupção lógica; não é backup histórico.

### 4. O que medir no teste?
Cronometre detecção, acionamento, obtenção de credenciais, recuperação do banco, restabelecimento de DNS/rede e testes funcionais. Uma instância "ligada" não significa que usuários conseguem trabalhar. Verifique integridade de dados, permissões e sistemas externos.

**Pegadinha:** backups a cada 24 horas não garantem RPO de 15 minutos. Alta disponibilidade não garante restauração depois de ransomware.

**Teste:** última cópia 09h00; pane 09h12; retorno 12h30. Perda potencial: 12 min; tempo de retorno: 3h18. Compare cada valor separadamente com RTO e RPO estabelecidos.
""",
("Segurança da Informação", "Autenticação multifator e acesso"): """
## Aprofundamento técnico — MFA não é duas senhas

### 1. As categorias de fatores
**Conhecimento**: algo que a pessoa sabe, como senha ou PIN. **Posse**: algo que tem, como chave de segurança física ou token. **Inerência**: característica biométrica, como impressão digital, quando usada conforme mecanismo apropriado. Duas senhas pertencem à mesma categoria; portanto não formam, por si, autenticação multifator.

### 2. Por que TOTP funciona?
**TOTP** gera códigos temporários a partir de um segredo compartilhado e do tempo, seguindo regras algorítmicas. Servidor e autenticador podem calcular códigos compatíveis sem transmitir o segredo a cada login. Sincronização temporal e proteção do segredo importam. Contudo, se usuário digitar senha e código num site falso, um atacante pode usar o código dentro da janela válida: TOTP reduz riscos, mas não é imune a phishing.

### 3. Por que FIDO2/WebAuthn é diferente?
Uma chave autenticadora pode gerar credencial de chave pública vinculada ao serviço legítimo. A autenticação envolve desafio criptográfico, e o navegador participa da verificação de origem/domínio. Isso ajuda a bloquear ataques comuns de phishing que tentam usar credenciais em domínio falso. Ainda é necessário proteger sessões e recuperação de conta.

### 4. Autenticação versus autorização
O MFA ajuda a demonstrar quem acessa. **Autorização** limita os recursos e ações: um recepcionista autenticado não deve poder alterar laudo médico se essa permissão não é necessária. Testes devem alterar identificadores de recurso e confirmar que o servidor rejeita acesso indevido, além de ocultar botões na interface.

**Caso:** conta com MFA acessa prontuários de outra unidade por falha de permissões. A falha principal é de autorização, não ausência de segundo fator.

**Teste:** senha + pergunta secreta são fatores diferentes? Não; ambos são conhecimento. Senha + chave física podem ser dois fatores diferentes.
""",
("Banco de Dados e SQL", "JOIN e cardinalidade"): """
## Aprofundamento técnico — por que o JOIN multiplica linhas?

### 1. Relações e chaves
Considere \`clientes(id, nome)\`, \`pedidos(id, cliente_id)\` e \`itens(id, pedido_id, preco)\`. O campo \`clientes.id\` identifica cada cliente; \`pedidos.cliente_id\` aponta ao cliente; \`itens.pedido_id\` aponta ao pedido. Se Ana tem dois pedidos e cada pedido tem três itens, a junção completa mostra **seis linhas de itens de Ana**, mesmo que existam apenas dois pedidos.

### 2. INNER versus LEFT
\`INNER JOIN\` mantém combinações que satisfazem \`ON\`; \`LEFT JOIN\` preserva linhas do lado esquerdo mesmo sem correspondência, preenchendo colunas da direita com \`NULL\`. Cliente sem pedido desaparece no INNER JOIN e pode permanecer no LEFT JOIN.

### 3. Por que COUNT(*) engana?
\`SELECT c.nome,COUNT(*) FROM clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id GROUP BY c.id,c.nome\` conta **uma linha** até para cliente sem pedido, porque há linha preservada com \`p.id = NULL\`. Prefira \`COUNT(p.id)\` quando a pergunta é número de pedidos: a função ignora valores NULL. Para combinar pedido e itens, talvez seja preciso \`COUNT(DISTINCT p.id)\` ou agregar antes de juntar.

### 4. Faça o teste manual
Crie três clientes: Ana (2 pedidos), Bruno (1) e Carla (0). A resposta correta para contagem de pedidos por cliente é 2, 1, 0. Monte a consulta e compare linha a linha. Se Carla some, provavelmente houve INNER JOIN ou filtro indevido em WHERE. Se Ana aparece com 6 pedidos, você contou itens após a junção.

### 5. Distinção essencial
\`WHERE\` filtra linhas depois da junção lógica; colocar \`WHERE p.status='ativo'\` pode eliminar linhas preservadas do LEFT JOIN que têm \`p.status=NULL\`. Dependendo da intenção, a condição deve ir para \`ON\`.

**Pegadinha:** DISTINCT pode mascarar um JOIN mal especificado; não substitui identificar a granularidade do relatório.

**Teste:** três clientes e cinco pedidos devem retornar quantas linhas num INNER JOIN de clientes com pedidos? Cinco, se todos os pedidos referenciam algum cliente, e não necessariamente três.
""",
("Banco de Dados e SQL", "Transações ACID e isolamento"): """
## Aprofundamento técnico — o erro da última vaga reservada duas vezes

### 1. O que é uma transação?
Uma **transação** delimita operações que precisam funcionar como unidade lógica. **BEGIN** inicia; **COMMIT** confirma; **ROLLBACK** desfaz mudanças ainda não confirmadas sob as regras do SGBD. Em ACID: **atomicidade** evita aplicação parcial; **consistência** preserva invariantes estabelecidos; **isolamento** controla interferência entre transações; **durabilidade** trata preservação das mudanças confirmadas.

### 2. Demonstração de corrida
Existe uma vaga disponível. Transação A lê \`vagas=1\`; transação B também lê \`vagas=1\`. As duas assumem que podem reservar e gravam uma confirmação de pedido. Mesmo que cada transação execute COMMIT corretamente, o sistema pode ter vendido duas vezes a mesma vaga se a regra não estiver protegida. **COMMIT não é trava mágica**.

### 3. Uma correção verificável
A atualização condicional pode ser feita numa única operação: \`UPDATE vagas SET qtd=qtd-1 WHERE id=42 AND qtd>0\`. Em SGBDs transacionais compatíveis, verifique o número de linhas efetivamente modificadas; se zero, não havia vaga disponível no momento da atualização. Outra alternativa usa bloqueio de linha \`SELECT ... FOR UPDATE\` com transação adequada. Dependendo do caso, restrição \`UNIQUE\` protege identificadores de reserva.

### 4. Isolamento depende da implementação
**Read Committed**, **Repeatable Read** e **Serializable** trazem garantias diferentes, com detalhes dependentes do banco. **MVCC** mantém versões de registros para gerenciar leituras concorrentes. O projeto de índice e as operações condicionais podem influenciar a segurança e o desempenho.

### 5. Como testar?
Abra duas transações simultâneas tentando a última vaga; depois confirme que só uma concluiu e \`qtd\` nunca fica negativa. Teste também falha no meio da transação e a capacidade de rollback.

**Pegadinha:** integridade de dados não é simplesmente "o banco usa PostgreSQL". Requer regras, restrições e transações corretas.

**Teste:** duas leituras iguais em momentos diferentes podem violar qual aspecto de isolamento? Uma leitura não repetível, conforme nível e cenário.
""",
("Banco de Dados e SQL", "Índices e planos de execução"): """
## Aprofundamento técnico — por que um índice nem sempre é utilizado?

### 1. Analogia estruturada
Uma **B-tree** mantém chaves em ordem numa estrutura balanceada de páginas/nós. Ao buscar por igualdade ou intervalo, o mecanismo pode percorrer a árvore em vez de inspecionar cada linha. Mas o índice é uma estrutura adicional: ocupa espaço e precisa ser atualizada quando registros mudam.

### 2. Seletividade e custo
Considere tabela com **1 milhão de pedidos**. Consulta \`WHERE id=9876\` costuma atingir pouquíssimas linhas, então índice sobre chave primária pode ser eficiente. Já \`WHERE status='ativo'\` pode corresponder a 950 mil linhas; seguir milhares de referências por índice pode ser mais caro do que varrer a tabela sequencialmente. O otimizador considera custos, estatísticas e características do armazenamento.

### 3. Índice composto tem ordem
Em índice \`(cliente_id, data)\`, o primeiro componente facilita pesquisas por \`cliente_id\`, e pode ajudar a filtrar/ordenar também por data. Pesquisar apenas por \`data\` pode não aproveitar o mesmo índice da maneira esperada. Não presuma que índice composto é igual a dois índices separados.

### 4. EXPLAIN versus execução
\`EXPLAIN\` apresenta plano estimado; dependendo do banco, \`EXPLAIN ANALYZE\` executa a consulta e registra medições reais. Execute análise de comandos que alteram dados com cuidado (num ambiente de teste e transação apropriada). Estatísticas desatualizadas podem levar a plano inadequado.

### 5. Exemplo de investigação
Relatório de agendamentos ficou lento após crescimento da tabela. Verifique filtro, tipo de JOIN, volume retornado, índices disponíveis, plano escolhido e tempo medido. Não crie índice indiscriminadamente antes de localizar a operação custosa.

**Pegadinha:** índice não ordena por si só o resultado final garantido; para ordem determinística no SQL, use \`ORDER BY\`.

**Teste:** por que criar índice em cada coluna pode piorar gravações? Porque cada INSERT/UPDATE relevante também atualiza mais estruturas.
""",
};
