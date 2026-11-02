# EstudaTI — SO: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# Active Directory, DNS e políticas de acesso

# Objetivo e contexto
Diagnosticar domínio Windows distinguindo identidade, resolução de nomes e políticas.

## Aula detalhada — entenda o mecanismo
**Active Directory Domain Services (AD DS)** mantém identidade e objetos do domínio, com autenticação e autorização distribuídas. **Controladores de domínio** hospedam serviços de diretório; replicação mantém alterações entre DCs. **DNS** é fundamental para a localização de serviços AD: registros SRV ajudam clientes a encontrar controladores de domínio. Kerberos usa tickets para autenticação e depende de sincronização de tempo apropriada. LDAP é protocolo de acesso ao diretório e não é sinônimo de “criptografia do domínio”.

**GPO** aplica configurações a usuários/computadores, respeitando escopo e precedência, filtragem de segurança, herança e processamento. Uma política linkada à OU errada pode não atingir computadores desejados. **Grupos de segurança** apoiam autorização; aplicar mínimo privilégio evita conceder acesso administrativo permanente para solucionar tarefas simples. Para troubleshooting, confira DNS correto, registros SRV, horário, conectividade e eventos de autenticação, antes de recriar objetos do domínio.

Comandos úteis: `whoami /groups`, `gpresult /r`, `gpupdate /force`, `nltest /dsgetdc:dominio.exemplo`, `nslookup -type=SRV _ldap._tcp.dc._msdcs.dominio.exemplo`. O comportamento exato depende da versão e da configuração do ambiente.

## Exemplo resolvido passo a passo
Usuário abre sessão em máquina de domínio mas não recebe mapeamento de impressora configurado por GPO. 1) Veja se a máquina e o usuário pertencem à OU/escopo esperado. 2) Execute `gpresult /r` para identificar políticas aplicadas e negadas. 3) Confira segurança, WMI e herança. 4) Analise log de GroupPolicy e conectividade para compartilhamento. 5) Corrija escopo ou recurso e valide em usuário piloto.

Se uma estação está apontando DNS apenas para um resolvedor público, pode navegar na internet e ainda assim falhar para encontrar serviços do domínio. O diagnóstico correto começa por resolver a zona interna e registros de localização de serviço.

## Erros clássicos nas bancas
**Pegadinha:** autenticação não equivale a autorização; conseguir login não dá acesso a qualquer pasta. **Pegadinha:** GPO não funciona apenas com “reiniciar sempre”; alguns ajustes são processados por atualização de política e outros exigem reinicialização ou novo logon. **Pegadinha:** permissões NTFS e permissões do compartilhamento podem restringir acesso em conjunto.

## Pratique sem consultar
Descreva por que um cliente de domínio necessita de DNS interno adequado, e não somente de DNS público. Trace como localizaria falhas em GPO e explique, com um exemplo, o que muda entre um grupo com permissão de leitura e um grupo administrador do domínio.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Microsoft Learn — Windows Server: https://learn.microsoft.com/en-us/windows-server/
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual tipo de registro DNS auxilia clientes a localizar serviços do Active Directory?

A) SRV
B) MX
C) CAA exclusivamente
D) TXT de SPF necessariamente

**Gabarito:** A — AD utiliza registros SRV para anunciar serviços como LDAP/Kerberos e localizar controladores de domínio.

**Questão 2.** Qual comando do Windows mostra informações de GPO aplicadas ao usuário/computador?

A) gpresult /r
B) format c:
C) netsh winsock reset exclusivamente
D) shutdown /r

**Gabarito:** A — gpresult apresenta o resultado do processamento de políticas de grupo.


---

# Linux: processos, permissões, systemd e rede

# Objetivo e contexto
Investigar serviços Linux sem depender de tentativas cegas de reinicialização.

## Aula detalhada — entenda o mecanismo
No Linux, processos possuem PID, dono e estado. `ps`, `top` e `journalctl` ajudam a investigar execução e logs. `systemd` gerencia unidades como serviços, alvos e temporizadores em distribuições que o utilizam; `systemctl status nginx`, `systemctl restart nginx` e `journalctl -u nginx` cumprem papéis distintos: estado, ação e registros. Reiniciar antes de ler logs pode apagar pistas importantes dependendo da aplicação.

Permissões clássicas **rwx** correspondem a leitura, escrita e execução; usuários, grupo e outros recebem permissões separadas. `chmod 640 arquivo` configura `rw- r-- ---`; diretorias exigem permissão de execução para travessia. O root pode executar operações privilegiadas e deve ser protegido por mínimo privilégio. `sudo` delega execução privilegiada conforme política. `chown` altera proprietário; ACLs e atributos adicionais podem afetar acesso.

Rede: `ip addr`, `ip route`, `ss -lntp`, `resolvectl status` (quando disponível) e `dig` ajudam a separar problemas de interface, rota, escuta e resolução. Arquivos de configuração variam entre distribuições; não memorize `/etc/network/interfaces` como único mecanismo universal.

## Exemplo resolvido passo a passo
Um serviço web responde “connection refused” no próprio servidor. 1) `systemctl status` revela se está ativo; 2) `ss -lntp` mostra se alguém escuta na porta esperada; 3) `journalctl -u` permite identificar falha de inicialização; 4) examine configuração de bind, firewall local e dependências; 5) aplique alteração controlada e valide.

Se a aplicação escuta em `127.0.0.1:8080`, ela não está automaticamente acessível pelo IP de rede do servidor. Uma solução é disponibilizar proxy reverso e controles de acesso apropriados. Segurança implica evitar expor serviços administrativos desnecessariamente.

## Erros clássicos nas bancas
**Pegadinha:** `chmod 777` não é solução aceitável por padrão e amplia risco. **Pegadinha:** `systemctl enable` configura inicialização automática e não garante que o serviço esteja rodando agora; `start` inicia. **Pegadinha:** processo ativo não demonstra que aplicação responde corretamente; cheque saúde funcional. **Pegadinha:** `kill -9` é último recurso, pois impede encerramento ordenado.

## Pratique sem consultar
Imagine que um daemon está ativo, mas a API responde 502 via Nginx. Liste quais verificações faria em upstream, porta, logs e rede. Calcule as permissões de `chmod 750` e diga quem pode executar arquivos ou atravessar diretórios. Explique o que `systemctl is-enabled` mede.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
systemd — manual de systemctl: https://www.freedesktop.org/software/systemd/man/latest/systemctl.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** O que significa chmod 640 em um arquivo comum?

A) Proprietário lê/escreve; grupo lê; outros não têm permissão
B) Todos podem executar
C) Proprietário só executa; grupo escreve
D) Grupo e outros têm leitura e escrita

**Gabarito:** A — 6 = rw-, 4 = r--, 0 = --- na representação octal.

**Questão 2.** Qual comando mostra registros de um serviço gerenciado por systemd?

A) journalctl -u nome.service
B) chmod 777 nome.service
C) ip link set up
D) mkdir nome.service

**Gabarito:** A — journalctl filtra os logs coletados pelo journal para a unidade selecionada.


---

# Virtualização, contêineres, RAID e backups

# Objetivo e contexto
Comparar hipervisores, imagens de contêiner, persistência e redundância.

## Aula detalhada — entenda o mecanismo
**Virtualização por hipervisor** fornece máquinas virtuais com SO convidado e hardware virtualizado. **Contêineres** compartilham o kernel do host, isolando processos e recursos por mecanismos como namespaces e cgroups; não são VMs completas. Imagens são modelos imutáveis por camadas, enquanto contêineres são instâncias executáveis. **Volumes** persistem dados além do ciclo de vida do contêiner; escrever arquivos apenas na camada gravável pode causar perda ao recriar instâncias.

RAID trata disponibilidade/performance de armazenamento, **não substitui backup**. RAID 1 espelha dados, RAID 5 usa paridade distribuída e suporta falha de um disco (com condições e riscos no rebuild). RAID 0 não é tolerante a falhas. Uma exclusão acidental ou ransomware pode se propagar para todos os discos de um RAID. **Snapshots** são pontos no tempo, mas políticas de proteção e consistência determinam seu valor; snapshots da mesma máquina não devem ser chamados de cópia externa segura.

Em Docker Compose, serviços, redes, volumes e variáveis de ambiente formam a orquestração local. **Build** cria imagens; `up -d --build` constrói/inicia; `down` remove contêineres e redes do projeto; `down -v` também remove volumes declarados e pode destruir dados. Nunca execute comandos destrutivos sem backup comprovado.

## Exemplo resolvido passo a passo
Um projeto tem `web` (React/Nginx) e `api` (FastAPI) com banco SQLite em volume nomeado. A versão do código muda, mas o SQLite precisa permanecer. Procedimento: 1) backup verificável do banco; 2) versionar arquivos de aplicação; 3) atualizar imagens; 4) subir serviços com `docker compose up -d --build`; 5) validar login, registros e histórico. Não use `docker compose down -v` como “limpeza” durante atualização.

Se dois discos de um RAID 5 comum falham, o arranjo pode perder capacidade de reconstrução. Já um RAID 1 de dois discos tolera a falha de um deles. Em ambos, backups externos são necessários contra perda lógica e desastres.

## Erros clássicos nas bancas
**Pegadinha:** “RAID 5 tem duas paridades” confunde RAID 5 com RAID 6. **Pegadinha:** “imagem Docker = contêiner” é falso. **Pegadinha:** contêiner no Linux compartilha kernel do host, embora possa executar aplicações com userland distinto. **Pegadinha:** `down -v` remove volumes associados e é perigoso para produção.

## Pratique sem consultar
Faça um quadro comparando VM e contêiner (kernel, isolamento, atualização, custo operacional) e outro comparando RAID 0/1/5/6. Justifique por que uma clínica com RAID precisa de backups testados. Simule, por escrito, uma atualização que preserve um volume PostgreSQL.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Docker Docs — volumes persistentes: https://docs.docker.com/storage/volumes/
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual comando deve ser evitado ao atualizar um projeto Docker quando se deseja preservar volumes nomeados?

A) docker compose down -v
B) docker compose ps
C) docker compose logs
D) docker compose up -d --build

**Gabarito:** A — down -v remove volumes, incluindo armazenamento persistente usado por bancos.

**Questão 2.** Qual afirmativa sobre RAID 5 tradicional está correta?

A) Em condições normais, suporta falha de um disco
B) Substitui backup contra exclusão acidental
C) Tolera falha de qualquer quantidade de discos
D) Não utiliza paridade

**Gabarito:** A — RAID 5 distribui paridade e normalmente tolera falha de um disco; não evita perda lógica nem desastres.
