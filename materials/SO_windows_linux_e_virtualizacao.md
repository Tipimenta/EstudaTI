# Windows, Linux e virtualização

10 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## Administração Windows e Linux

**Objetivo:** Relacionar componentes e comandos de administração.

Em ambientes Windows, Active Directory pode centralizar contas e políticas. Em Linux, permissões de arquivos envolvem proprietário, grupo e outros, com bits de leitura, escrita e execução. Diagnóstico de serviços deve partir de logs e estados observáveis.

**Treino:** Qual serviço é associado ao gerenciamento centralizado de identidades em domínios Windows?

- A. Active Directory
- B. NTP
- C. SMTP
- D. SNMP

**Gabarito comentado:** A — Active Directory centraliza informações de usuários e computadores.

**Treino:** No Linux, qual permissão permite executar um arquivo?

- A. r
- B. w
- C. x
- D. s

**Gabarito comentado:** C — O bit x representa execução.

---

## Virtualização, contêineres e RAID

**Objetivo:** Diferenciar VM, contêiner e redundância.

Máquinas virtuais emulam hardware virtual e carregam um sistema operacional convidado. Contêineres compartilham o kernel do host, com isolamento de processos. RAID pode aumentar disponibilidade, mas RAID não substitui backup.

**Treino:** Qual afirmação sobre RAID está correta?

- A. Substitui backup fora do ambiente
- B. Evita todos os tipos de perda
- C. Pode tolerar falhas conforme o nível
- D. Elimina necessidade de testes

**Gabarito comentado:** C — Dependendo do nível, RAID tolera falhas de disco, mas não substitui backup.

**Treino:** Qual característica é típica de contêineres?

- A. Cada um exige BIOS própria
- B. Compartilham kernel do host
- C. Sempre usam hipervisor tipo 1
- D. Não oferecem isolamento

**Gabarito comentado:** B — Contêineres isolam processos compartilhando o kernel do host.

---

## Processos, threads e escalonamento

**Objetivo:** Explicar e aplicar: Processos, threads e escalonamento.

### Conceito e teoria
Processo tem espaço de endereçamento e recursos; threads dentro do processo compartilham recursos como memória, mas possuem contexto de execução próprio. Escalonamento decide acesso à CPU, com políticas que consideram prioridades e estados.

### Exemplo
Servidor web pode usar várias threads para atender requisições; falha em memória compartilhada pode afetar todo o processo.

### Armadilha de prova
Multithreading não significa necessariamente execução paralela em único núcleo.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** O que threads de um mesmo processo tipicamente compartilham?

- A. Espaço de endereçamento
- B. Registradores individuais
- C. Pilha individual de execução
- D. Contador de programa individual

**Gabarito comentado:** A — Threads compartilham memória do processo, mas têm pilhas e contextos próprios.

**Treino:** Em sistema de um único núcleo, múltiplas threads podem:

- A. Executar simultaneamente em múltiplos núcleos inexistentes
- B. Evitar troca de contexto em todos os casos
- C. Impedir uso de interrupções
- D. Intercalar execução por escalonamento

**Gabarito comentado:** D — Concorrência por alternância ocorre mesmo sem paralelismo físico.

---

## Linux: permissões e usuários

**Objetivo:** Explicar e aplicar: Linux: permissões e usuários.

### Conceito e teoria
Em sistemas Unix, permissões r,w,x aplicam-se a proprietário, grupo e outros. chmod 750 representa rwx para dono, r-x para grupo e nenhuma para outros. sudo pode delegar tarefas administrativas.

### Exemplo
Para scripts executáveis, confira bit de execução e interpretador; permissões de diretório têm semântica própria.

### Armadilha de prova
Nunca resolva problemas genéricos de acesso com chmod 777 indiscriminadamente.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** O que chmod 750 concede ao grupo?

- A. Leitura e escrita
- B. Todas as permissões
- C. Nenhuma permissão
- D. Leitura e execução

**Gabarito comentado:** D — O dígito 5 representa 4+1: leitura e execução.

**Treino:** Qual comando Linux costuma alterar proprietário de arquivos?

- A. grep
- B. ps
- C. chown
- D. chmod

**Gabarito comentado:** C — chown altera owner e opcionalmente grupo do arquivo.

---

## Linux: systemd e logs

**Objetivo:** Explicar e aplicar: Linux: systemd e logs.

### Conceito e teoria
systemctl gerencia unidades (services etc.) em hosts com systemd. journalctl consulta registros do journal. O comando ss apresenta sockets de rede e pode ajudar a localizar portas em escuta.

### Exemplo
Se serviço não inicia: systemctl status serviço e journalctl -u serviço auxiliam na investigação.

### Armadilha de prova
systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual ferramenta consulta logs do systemd journal?

- A. useradd
- B. iptables-save
- C. journalctl
- D. fdisk

**Gabarito comentado:** C — journalctl lê entradas do journal.

**Treino:** Qual comando costuma apresentar sockets TCP em escuta no Linux?

- A. ss -ltn
- B. ls -lah
- C. df -h
- D. whoami

**Gabarito comentado:** A — ss -ltn mostra sockets TCP listening de forma numérica.

---

## Active Directory, LDAP e Kerberos

**Objetivo:** Explicar e aplicar: Active Directory, LDAP e Kerberos.

### Conceito e teoria
Active Directory Domain Services organiza objetos de domínio e políticas. LDAP é protocolo de acesso a diretórios; Kerberos é amplamente usado na autenticação em domínio. GPO distribui configurações e políticas em contextos apropriados.

### Exemplo
Se autenticação do domínio falha, verifique sincronismo de relógio, DNS do domínio e conectividade ao controlador.

### Armadilha de prova
AD não é sinônimo de DNS, embora dependa fortemente dele.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual protocolo é associado à autenticação por tickets em domínio AD?

- A. SMTP
- B. SNMP
- C. NTP como autenticação
- D. Kerberos

**Gabarito comentado:** D — Kerberos usa tickets para autenticação.

**Treino:** Qual recurso do AD centraliza políticas de configuração em computadores e usuários?

- A. NAT estático
- B. GPO
- C. MX DNS
- D. VLAN nativa

**Gabarito comentado:** B — Group Policy Objects aplicam políticas por escopo e precedência.

---

## Virtualização e hipervisores

**Objetivo:** Explicar e aplicar: Virtualização e hipervisores.

### Conceito e teoria
Hipervisor tipo 1 opera diretamente sobre infraestrutura física; tipo 2 tipicamente sobre sistema operacional hospedeiro. Máquinas virtuais possuem guest OS próprio. Snapshots auxiliam testes e reversão, mas não substituem plano completo de backup.

### Exemplo
Na migração P2V de servidor legado, valide compatibilidade de boot/firmware, controladores de armazenamento e integridade do sistema.

### Armadilha de prova
Snapshot prolongado pode elevar uso de armazenamento e custos operacionais.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual característica descreve hipervisor de tipo 1?

- A. É sempre um serviço de e-mail
- B. Não executa múltiplas VMs
- C. Executa diretamente sobre o hardware de hospedagem
- D. Exige navegador para iniciar

**Gabarito comentado:** C — Hipervisor bare-metal opera diretamente na infraestrutura.

**Treino:** Por que snapshots não devem ser o único backup?

- A. Não têm qualquer utilidade operacional
- B. Sempre consomem zero disco
- C. São obrigatoriamente externos ao host
- D. Não são necessariamente cópias independentes e duráveis

**Gabarito comentado:** D — Snapshots podem depender do mesmo armazenamento e cadeia de discos.

---

## Contêineres e Docker

**Objetivo:** Explicar e aplicar: Contêineres e Docker.

### Conceito e teoria
Contêineres compartilham kernel do host (com isolamento por namespaces/cgroups e outros mecanismos) e empacotam aplicações/dependências. Imagem é modelo imutável; container é instância. Volumes são apropriados para persistência de dados.

### Exemplo
Um banco PostgreSQL em container deve persistir dados em volume para não depender da camada gravável descartável.

### Armadilha de prova
Contêiner não é máquina virtual completa e não elimina necessidade de hardening.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual mecanismo Docker é apropriado para persistir dados entre recriações de contêiner?

- A. Tag de imagem
- B. Porta EXPOSE sozinha
- C. Camada de build sem cópia
- D. Volume

**Gabarito comentado:** D — Volumes persistem fora do filesystem efêmero do container.

**Treino:** Em geral, um contêiner Linux compartilha com o host:

- A. Todos os processos sem isolamento
- B. Todos os volumes automaticamente
- C. Kernel
- D. Credenciais do administrador por definição

**Gabarito comentado:** C — Contêineres isolam processos mas compartilham o kernel Linux do host.

---

## RAID e disponibilidade

**Objetivo:** Explicar e aplicar: RAID e disponibilidade.

### Conceito e teoria
RAID 1 espelha dados e pode tolerar falha de um disco do espelho; RAID 5 usa paridade distribuída e requer pelo menos três discos. RAID contribui à disponibilidade, mas não protege de exclusão acidental, ransomware ou desastre no local.

### Exemplo
Em um RAID5 com três discos iguais, capacidade útil aproximada é equivalente a dois discos, antes de overheads.

### Armadilha de prova
Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual a quantidade mínima de discos em RAID 5 convencional?

- A. 1
- B. 8
- C. 3
- D. 2

**Gabarito comentado:** C — RAID5 requer no mínimo três discos.

**Treino:** Qual evento RAID não protege adequadamente, por si só?

- A. Falha de uma unidade em RAID 1 com duas unidades
- B. Falha de uma unidade em RAID 5 íntegro
- C. Continuidade durante troca de disco compatível
- D. Exclusão lógica acidental de dados

**Gabarito comentado:** D — RAID replica/grava alterações lógicas, inclusive exclusões.

---

## Nuvem: IaaS, PaaS, SaaS

**Objetivo:** Explicar e aplicar: Nuvem: IaaS, PaaS, SaaS.

### Conceito e teoria
IaaS fornece recursos de infraestrutura virtualizados; PaaS oferece ambiente/plataforma gerenciada para aplicação; SaaS fornece software pronto via serviço. Responsabilidades de segurança são compartilhadas entre provedor e cliente conforme modelo e contrato.

### Exemplo
Serviço de máquina virtual costuma ser IaaS; serviço gerenciado para hospedar aplicações pode ser PaaS.

### Armadilha de prova
Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual modelo de nuvem entrega aplicações prontas ao consumidor?

- A. SaaS
- B. IaaS
- C. PaaS
- D. Bare metal obrigatório

**Gabarito comentado:** A — Software as a Service entrega software como serviço.

**Treino:** Em serviço IaaS, normalmente o cliente é responsável por:

- A. Controlar fisicamente a rede elétrica do provedor
- B. Administrar sistema operacional convidado
- C. Construir fisicamente o data center do provedor
- D. Definir toda a topologia interna do provedor

**Gabarito comentado:** B — IaaS costuma deixar OS convidado e aplicações sob o controle do cliente.
