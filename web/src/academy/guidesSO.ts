import type {LessonGuide} from './guidesTypes'
export const guidesSO:LessonGuide[]=[
  {
    "id": 6,
    "code": "SO",
    "title": "Administração Windows e Linux",
    "objective": "Relacionar componentes e comandos de administração.",
    "theory": "Em ambientes Windows, Active Directory pode centralizar contas e políticas. Em Linux, permissões de arquivos envolvem proprietário, grupo e outros, com bits de leitura, escrita e execução. Diagnóstico de serviços deve partir de logs e estados observáveis.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Para que serve o Active Directory?",
        "back": "Centralizar diretório e gestão de identidade em ambientes compatíveis."
      },
      {
        "front": "O que significa permissão x em arquivos Linux?",
        "back": "Permissão de execução (e travessia em diretórios)."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 7,
    "code": "SO",
    "title": "Virtualização, contêineres e RAID",
    "objective": "Diferenciar VM, contêiner e redundância.",
    "theory": "Máquinas virtuais emulam hardware virtual e carregam um sistema operacional convidado. Contêineres compartilham o kernel do host, com isolamento de processos. RAID pode aumentar disponibilidade, mas RAID não substitui backup.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "RAID equivale a backup?",
        "back": "Não. Redundância de discos não substitui backup."
      },
      {
        "front": "Contêiner precisa sempre de kernel próprio?",
        "back": "Não. Contêiner geralmente compartilha o kernel do host."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 35,
    "code": "SO",
    "title": "Processos, threads e escalonamento",
    "objective": "Explicar e aplicar: Processos, threads e escalonamento.",
    "theory": "Processo tem espaço de endereçamento e recursos; threads dentro do processo compartilham recursos como memória, mas possuem contexto de execução próprio. Escalonamento decide acesso à CPU, com políticas que consideram prioridades e estados.",
    "practical": "Servidor web pode usar várias threads para atender requisições; falha em memória compartilhada pode afetar todo o processo.",
    "warning": "Multithreading não significa necessariamente execução paralela em único núcleo.",
    "recall": [
      {
        "front": "O que threads de um mesmo processo tipicamente compartilham?",
        "back": "Espaço de endereçamento. Threads compartilham memória do processo, mas têm pilhas e contextos próprios."
      },
      {
        "front": "Em sistema de um único núcleo, múltiplas threads podem:",
        "back": "Intercalar execução por escalonamento. Concorrência por alternância ocorre mesmo sem paralelismo físico."
      },
      {
        "front": "Qual armadilha evitar em Processos, threads e escalonamento?",
        "back": "Multithreading não significa necessariamente execução paralela em único núcleo."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 36,
    "code": "SO",
    "title": "Linux: permissões e usuários",
    "objective": "Explicar e aplicar: Linux: permissões e usuários.",
    "theory": "Em sistemas Unix, permissões r,w,x aplicam-se a proprietário, grupo e outros. chmod 750 representa rwx para dono, r-x para grupo e nenhuma para outros. sudo pode delegar tarefas administrativas.",
    "practical": "Para scripts executáveis, confira bit de execução e interpretador; permissões de diretório têm semântica própria.",
    "warning": "Nunca resolva problemas genéricos de acesso com chmod 777 indiscriminadamente.",
    "recall": [
      {
        "front": "O que chmod 750 concede ao grupo?",
        "back": "Leitura e execução. O dígito 5 representa 4+1: leitura e execução."
      },
      {
        "front": "Qual comando Linux costuma alterar proprietário de arquivos?",
        "back": "chown. chown altera owner e opcionalmente grupo do arquivo."
      },
      {
        "front": "Qual armadilha evitar em Linux: permissões e usuários?",
        "back": "Nunca resolva problemas genéricos de acesso com chmod 777 indiscriminadamente."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 37,
    "code": "SO",
    "title": "Linux: systemd e logs",
    "objective": "Explicar e aplicar: Linux: systemd e logs.",
    "theory": "systemctl gerencia unidades (services etc.) em hosts com systemd. journalctl consulta registros do journal. O comando ss apresenta sockets de rede e pode ajudar a localizar portas em escuta.",
    "practical": "Se serviço não inicia: systemctl status serviço e journalctl -u serviço auxiliam na investigação.",
    "warning": "systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container.",
    "recall": [
      {
        "front": "Qual ferramenta consulta logs do systemd journal?",
        "back": "journalctl. journalctl lê entradas do journal."
      },
      {
        "front": "Qual comando costuma apresentar sockets TCP em escuta no Linux?",
        "back": "ss -ltn. ss -ltn mostra sockets TCP listening de forma numérica."
      },
      {
        "front": "Qual armadilha evitar em Linux: systemd e logs?",
        "back": "systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 38,
    "code": "SO",
    "title": "Active Directory, LDAP e Kerberos",
    "objective": "Explicar e aplicar: Active Directory, LDAP e Kerberos.",
    "theory": "Active Directory Domain Services organiza objetos de domínio e políticas. LDAP é protocolo de acesso a diretórios; Kerberos é amplamente usado na autenticação em domínio. GPO distribui configurações e políticas em contextos apropriados.",
    "practical": "Se autenticação do domínio falha, verifique sincronismo de relógio, DNS do domínio e conectividade ao controlador.",
    "warning": "AD não é sinônimo de DNS, embora dependa fortemente dele.",
    "recall": [
      {
        "front": "Qual protocolo é associado à autenticação por tickets em domínio AD?",
        "back": "Kerberos. Kerberos usa tickets para autenticação."
      },
      {
        "front": "Qual recurso do AD centraliza políticas de configuração em computadores e usuários?",
        "back": "GPO. Group Policy Objects aplicam políticas por escopo e precedência."
      },
      {
        "front": "Qual armadilha evitar em Active Directory, LDAP e Kerberos?",
        "back": "AD não é sinônimo de DNS, embora dependa fortemente dele."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 39,
    "code": "SO",
    "title": "Virtualização e hipervisores",
    "objective": "Explicar e aplicar: Virtualização e hipervisores.",
    "theory": "Hipervisor tipo 1 opera diretamente sobre infraestrutura física; tipo 2 tipicamente sobre sistema operacional hospedeiro. Máquinas virtuais possuem guest OS próprio. Snapshots auxiliam testes e reversão, mas não substituem plano completo de backup.",
    "practical": "Na migração P2V de servidor legado, valide compatibilidade de boot/firmware, controladores de armazenamento e integridade do sistema.",
    "warning": "Snapshot prolongado pode elevar uso de armazenamento e custos operacionais.",
    "recall": [
      {
        "front": "Qual característica descreve hipervisor de tipo 1?",
        "back": "Executa diretamente sobre o hardware de hospedagem. Hipervisor bare-metal opera diretamente na infraestrutura."
      },
      {
        "front": "Por que snapshots não devem ser o único backup?",
        "back": "Não são necessariamente cópias independentes e duráveis. Snapshots podem depender do mesmo armazenamento e cadeia de discos."
      },
      {
        "front": "Qual armadilha evitar em Virtualização e hipervisores?",
        "back": "Snapshot prolongado pode elevar uso de armazenamento e custos operacionais."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 40,
    "code": "SO",
    "title": "Contêineres e Docker",
    "objective": "Explicar e aplicar: Contêineres e Docker.",
    "theory": "Contêineres compartilham kernel do host (com isolamento por namespaces/cgroups e outros mecanismos) e empacotam aplicações/dependências. Imagem é modelo imutável; container é instância. Volumes são apropriados para persistência de dados.",
    "practical": "Um banco PostgreSQL em container deve persistir dados em volume para não depender da camada gravável descartável.",
    "warning": "Contêiner não é máquina virtual completa e não elimina necessidade de hardening.",
    "recall": [
      {
        "front": "Qual mecanismo Docker é apropriado para persistir dados entre recriações de contêiner?",
        "back": "Volume. Volumes persistem fora do filesystem efêmero do container."
      },
      {
        "front": "Em geral, um contêiner Linux compartilha com o host:",
        "back": "Kernel. Contêineres isolam processos mas compartilham o kernel Linux do host."
      },
      {
        "front": "Qual armadilha evitar em Contêineres e Docker?",
        "back": "Contêiner não é máquina virtual completa e não elimina necessidade de hardening."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 41,
    "code": "SO",
    "title": "RAID e disponibilidade",
    "objective": "Explicar e aplicar: RAID e disponibilidade.",
    "theory": "RAID 1 espelha dados e pode tolerar falha de um disco do espelho; RAID 5 usa paridade distribuída e requer pelo menos três discos. RAID contribui à disponibilidade, mas não protege de exclusão acidental, ransomware ou desastre no local.",
    "practical": "Em um RAID5 com três discos iguais, capacidade útil aproximada é equivalente a dois discos, antes de overheads.",
    "warning": "Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade.",
    "recall": [
      {
        "front": "Qual a quantidade mínima de discos em RAID 5 convencional?",
        "back": "3. RAID5 requer no mínimo três discos."
      },
      {
        "front": "Qual evento RAID não protege adequadamente, por si só?",
        "back": "Exclusão lógica acidental de dados. RAID replica/grava alterações lógicas, inclusive exclusões."
      },
      {
        "front": "Qual armadilha evitar em RAID e disponibilidade?",
        "back": "Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 42,
    "code": "SO",
    "title": "Nuvem: IaaS, PaaS, SaaS",
    "objective": "Explicar e aplicar: Nuvem: IaaS, PaaS, SaaS.",
    "theory": "IaaS fornece recursos de infraestrutura virtualizados; PaaS oferece ambiente/plataforma gerenciada para aplicação; SaaS fornece software pronto via serviço. Responsabilidades de segurança são compartilhadas entre provedor e cliente conforme modelo e contrato.",
    "practical": "Serviço de máquina virtual costuma ser IaaS; serviço gerenciado para hospedar aplicações pode ser PaaS.",
    "warning": "Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato.",
    "recall": [
      {
        "front": "Qual modelo de nuvem entrega aplicações prontas ao consumidor?",
        "back": "SaaS. Software as a Service entrega software como serviço."
      },
      {
        "front": "Em serviço IaaS, normalmente o cliente é responsável por:",
        "back": "Administrar sistema operacional convidado. IaaS costuma deixar OS convidado e aplicações sob o controle do cliente."
      },
      {
        "front": "Qual armadilha evitar em Nuvem: IaaS, PaaS, SaaS?",
        "back": "Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 97,
    "code": "SO",
    "title": "Active Directory, DNS e políticas de acesso",
    "objective": "Diagnosticar domínio Windows distinguindo identidade, resolução de nomes e políticas.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Active Directory Domain Services (AD DS)** mantém identidade e objetos do domínio, com autenticação e autorização distribuídas. **Controladores de domínio** hospedam serviços de diretório; replicação mantém alterações entre DCs. **DNS** é fundamental para a localização de serviços AD: registros SRV ajudam clientes a encontrar controladores de domínio. Kerberos usa tickets para autenticação e depende de sincronização de tempo apropriada. LDAP é protocolo de acesso ao diretório e não é sinônimo de “criptografia do domínio”.\n\n**GPO** aplica configurações a usuários/computadores, respeitando escopo e precedência, filtragem de segurança, herança e processamento. Uma política linkada à OU errada pode não atingir computadores desejados. **Grupos de segurança** apoiam autorização; aplicar mínimo privilégio evita conceder acesso administrativo permanente para solucionar tarefas simples. Para troubleshooting, confira DNS correto, registros SRV, horário, conectividade e eventos de autenticação, antes de recriar objetos do domínio.\n\nComandos úteis: `whoami /groups`, `gpresult /r`, `gpupdate /force`, `nltest /dsgetdc:dominio.exemplo`, `nslookup -type=SRV _ldap._tcp.dc._msdcs.dominio.exemplo`. O comportamento exato depende da versão e da configuração do ambiente.\n\n## Exemplo resolvido passo a passo\nUsuário abre sessão em máquina de domínio mas não recebe mapeamento de impressora configurado por GPO. 1) Veja se a máquina e o usuário pertencem à OU/escopo esperado. 2) Execute `gpresult /r` para identificar políticas aplicadas e negadas. 3) Confira segurança, WMI e herança. 4) Analise log de GroupPolicy e conectividade para compartilhamento. 5) Corrija escopo ou recurso e valide em usuário piloto.\n\nSe uma estação está apontando DNS apenas para um resolvedor público, pode navegar na internet e ainda assim falhar para encontrar serviços do domínio. O diagnóstico correto começa por resolver a zona interna e registros de localização de serviço.\n\n## Erros clássicos nas bancas\n**Pegadinha:** autenticação não equivale a autorização; conseguir login não dá acesso a qualquer pasta. **Pegadinha:** GPO não funciona apenas com “reiniciar sempre”; alguns ajustes são processados por atualização de política e outros exigem reinicialização ou novo logon. **Pegadinha:** permissões NTFS e permissões do compartilhamento podem restringir acesso em conjunto.\n\n## Pratique sem consultar\nDescreva por que um cliente de domínio necessita de DNS interno adequado, e não somente de DNS público. Trace como localizaria falhas em GPO e explique, com um exemplo, o que muda entre um grupo com permissão de leitura e um grupo administrador do domínio.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nMicrosoft Learn — Windows Server: https://learn.microsoft.com/en-us/windows-server/\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Por que DNS interno é essencial ao AD DS?",
        "back": "Clientes localizam serviços e controladores de domínio por registros DNS, incluindo SRV."
      },
      {
        "front": "Qual diferença entre autenticar e autorizar um usuário no domínio?",
        "back": "Autenticação verifica identidade; autorização controla recursos e permissões disponíveis."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 98,
    "code": "SO",
    "title": "Linux: processos, permissões, systemd e rede",
    "objective": "Investigar serviços Linux sem depender de tentativas cegas de reinicialização.",
    "theory": "## Aula detalhada — entenda o mecanismo\nNo Linux, processos possuem PID, dono e estado. `ps`, `top` e `journalctl` ajudam a investigar execução e logs. `systemd` gerencia unidades como serviços, alvos e temporizadores em distribuições que o utilizam; `systemctl status nginx`, `systemctl restart nginx` e `journalctl -u nginx` cumprem papéis distintos: estado, ação e registros. Reiniciar antes de ler logs pode apagar pistas importantes dependendo da aplicação.\n\nPermissões clássicas **rwx** correspondem a leitura, escrita e execução; usuários, grupo e outros recebem permissões separadas. `chmod 640 arquivo` configura `rw- r-- ---`; diretorias exigem permissão de execução para travessia. O root pode executar operações privilegiadas e deve ser protegido por mínimo privilégio. `sudo` delega execução privilegiada conforme política. `chown` altera proprietário; ACLs e atributos adicionais podem afetar acesso.\n\nRede: `ip addr`, `ip route`, `ss -lntp`, `resolvectl status` (quando disponível) e `dig` ajudam a separar problemas de interface, rota, escuta e resolução. Arquivos de configuração variam entre distribuições; não memorize `/etc/network/interfaces` como único mecanismo universal.\n\n## Exemplo resolvido passo a passo\nUm serviço web responde “connection refused” no próprio servidor. 1) `systemctl status` revela se está ativo; 2) `ss -lntp` mostra se alguém escuta na porta esperada; 3) `journalctl -u` permite identificar falha de inicialização; 4) examine configuração de bind, firewall local e dependências; 5) aplique alteração controlada e valide.\n\nSe a aplicação escuta em `127.0.0.1:8080`, ela não está automaticamente acessível pelo IP de rede do servidor. Uma solução é disponibilizar proxy reverso e controles de acesso apropriados. Segurança implica evitar expor serviços administrativos desnecessariamente.\n\n## Erros clássicos nas bancas\n**Pegadinha:** `chmod 777` não é solução aceitável por padrão e amplia risco. **Pegadinha:** `systemctl enable` configura inicialização automática e não garante que o serviço esteja rodando agora; `start` inicia. **Pegadinha:** processo ativo não demonstra que aplicação responde corretamente; cheque saúde funcional. **Pegadinha:** `kill -9` é último recurso, pois impede encerramento ordenado.\n\n## Pratique sem consultar\nImagine que um daemon está ativo, mas a API responde 502 via Nginx. Liste quais verificações faria em upstream, porta, logs e rede. Calcule as permissões de `chmod 750` e diga quem pode executar arquivos ou atravessar diretórios. Explique o que `systemctl is-enabled` mede.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nsystemd — manual de systemctl: https://www.freedesktop.org/software/systemd/man/latest/systemctl.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Diferença entre systemctl enable e start?",
        "back": "enable configura o serviço para iniciar automaticamente conforme unidades; start o inicia agora."
      },
      {
        "front": "O que representa chmod 750?",
        "back": "Dono: rwx (7); grupo: r-x (5); outros: --- (0)."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 99,
    "code": "SO",
    "title": "Virtualização, contêineres, RAID e backups",
    "objective": "Comparar hipervisores, imagens de contêiner, persistência e redundância.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Virtualização por hipervisor** fornece máquinas virtuais com SO convidado e hardware virtualizado. **Contêineres** compartilham o kernel do host, isolando processos e recursos por mecanismos como namespaces e cgroups; não são VMs completas. Imagens são modelos imutáveis por camadas, enquanto contêineres são instâncias executáveis. **Volumes** persistem dados além do ciclo de vida do contêiner; escrever arquivos apenas na camada gravável pode causar perda ao recriar instâncias.\n\nRAID trata disponibilidade/performance de armazenamento, **não substitui backup**. RAID 1 espelha dados, RAID 5 usa paridade distribuída e suporta falha de um disco (com condições e riscos no rebuild). RAID 0 não é tolerante a falhas. Uma exclusão acidental ou ransomware pode se propagar para todos os discos de um RAID. **Snapshots** são pontos no tempo, mas políticas de proteção e consistência determinam seu valor; snapshots da mesma máquina não devem ser chamados de cópia externa segura.\n\nEm Docker Compose, serviços, redes, volumes e variáveis de ambiente formam a orquestração local. **Build** cria imagens; `up -d --build` constrói/inicia; `down` remove contêineres e redes do projeto; `down -v` também remove volumes declarados e pode destruir dados. Nunca execute comandos destrutivos sem backup comprovado.\n\n## Exemplo resolvido passo a passo\nUm projeto tem `web` (React/Nginx) e `api` (FastAPI) com banco SQLite em volume nomeado. A versão do código muda, mas o SQLite precisa permanecer. Procedimento: 1) backup verificável do banco; 2) versionar arquivos de aplicação; 3) atualizar imagens; 4) subir serviços com `docker compose up -d --build`; 5) validar login, registros e histórico. Não use `docker compose down -v` como “limpeza” durante atualização.\n\nSe dois discos de um RAID 5 comum falham, o arranjo pode perder capacidade de reconstrução. Já um RAID 1 de dois discos tolera a falha de um deles. Em ambos, backups externos são necessários contra perda lógica e desastres.\n\n## Erros clássicos nas bancas\n**Pegadinha:** “RAID 5 tem duas paridades” confunde RAID 5 com RAID 6. **Pegadinha:** “imagem Docker = contêiner” é falso. **Pegadinha:** contêiner no Linux compartilha kernel do host, embora possa executar aplicações com userland distinto. **Pegadinha:** `down -v` remove volumes associados e é perigoso para produção.\n\n## Pratique sem consultar\nFaça um quadro comparando VM e contêiner (kernel, isolamento, atualização, custo operacional) e outro comparando RAID 0/1/5/6. Justifique por que uma clínica com RAID precisa de backups testados. Simule, por escrito, uma atualização que preserve um volume PostgreSQL.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nDocker Docs — volumes persistentes: https://docs.docker.com/storage/volumes/\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual diferença estrutural principal entre VM e contêiner no mesmo host Linux?",
        "back": "VM executa SO convidado com kernel próprio; contêiner compartilha kernel do host e isola processos."
      },
      {
        "front": "Por que RAID não substitui backup?",
        "back": "RAID melhora disponibilidade diante de falhas de disco, mas não protege suficientemente contra exclusão, corrupção, ransomware e desastre."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 125,
    "code": "SO",
    "title": "Active Directory: OU, grupos e GPO",
    "objective": "Compreender e aplicar active directory: ou, grupos e gpo em provas.",
    "theory": "O Active Directory Domain Services armazena objetos de domínio e autenticação; OUs organizam delegação e aplicação de políticas.\n\nUma unidade organizacional não é, por si, um grupo de segurança. GPOs podem ser vinculadas a sites, domínios e OUs. A ordem de processamento e a precedência determinam o resultado efetivo; herança e filtragem precisam ser consideradas ao diagnosticar uma configuração.",
    "practical": "Para impor bloqueio de tela em estações administrativas, é possível vincular GPO à OU dessas máquinas e testar escopo, herança e grupos de filtragem.",
    "warning": "Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas.",
    "recall": [
      {
        "front": "Qual é o conceito central de Active Directory: OU, grupos e GPO?",
        "back": "O Active Directory Domain Services armazena objetos de domínio e autenticação; OUs organizam delegação e aplicação de políticas."
      },
      {
        "front": "Qual erro de prova evitar em Active Directory: OU, grupos e GPO?",
        "back": "Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 126,
    "code": "SO",
    "title": "Linux: permissões e umask",
    "objective": "Compreender e aplicar linux: permissões e umask em provas.",
    "theory": "Permissões Unix básicas representam leitura, escrita e execução para dono, grupo e outros; bits são codificados em octal.\n\nNo modo 750, proprietário possui rwx, grupo r-x, outros nenhuma permissão. Diretório precisa de execução para atravessamento; leitura permite listar nomes sob condições adequadas. Umask retira bits das permissões padrão solicitadas na criação de arquivos e diretórios.",
    "practical": "Um arquivo marcado 640 não é executável nem para o proprietário; chmod 750 altera isso para arquivo específico, se apropriado.",
    "warning": "Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos.",
    "recall": [
      {
        "front": "Qual é o conceito central de Linux: permissões e umask?",
        "back": "Permissões Unix básicas representam leitura, escrita e execução para dono, grupo e outros; bits são codificados em octal."
      },
      {
        "front": "Qual erro de prova evitar em Linux: permissões e umask?",
        "back": "Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 127,
    "code": "SO",
    "title": "Virtualização, containers e imagens",
    "objective": "Compreender e aplicar virtualização, containers e imagens em provas.",
    "theory": "Máquinas virtuais virtualizam hardware e executam sistema convidado; contêineres compartilham kernel do host no modelo comum Linux.\n\nImages são templates imutáveis de camadas; containers são instâncias executáveis. Volumes persistem dados fora do ciclo de vida de um container. Uma máquina Windows legada convertida P2V pode exigir atenção a BIOS/UEFI, controladora e driver, sem trocar automaticamente sua geração ou esquema de partição.",
    "practical": "Ao recriar o container de uma aplicação, um volume Docker deve manter o SQLite se montado corretamente, mas exclusão deliberada do volume destrói dados.",
    "warning": "Docker Compose não substitui backup nem garante alta disponibilidade em um único host.",
    "recall": [
      {
        "front": "Qual é o conceito central de Virtualização, containers e imagens?",
        "back": "Máquinas virtuais virtualizam hardware e executam sistema convidado; contêineres compartilham kernel do host no modelo comum Linux."
      },
      {
        "front": "Qual erro de prova evitar em Virtualização, containers e imagens?",
        "back": "Docker Compose não substitui backup nem garante alta disponibilidade em um único host."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 128,
    "code": "SO",
    "title": "RAID, snapshots e backups",
    "objective": "Compreender e aplicar raid, snapshots e backups em provas.",
    "theory": "RAID melhora disponibilidade frente a falhas específicas de disco, mas não substitui backup contra erro humano, ransomware ou corrupção lógica.\n\nRAID 1 espelha; RAID 5 utiliza paridade distribuída e tolera uma falha de disco; RAID 6 tolera duas falhas. Snapshots podem ajudar retorno rápido, mas se residirem no mesmo sistema comprometido não garantem recuperação. Estratégia 3-2-1 com cópia isolada e testes reduz riscos de perda.",
    "practical": "Em um servidor com volume C: RAID1 e imagens DICOM no RAID5, remover arquivos acidentalmente afeta todas as cópias lógicas disponíveis no arranjo, por isso restauração precisa de backup.",
    "warning": "Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade.",
    "recall": [
      {
        "front": "Qual é o conceito central de RAID, snapshots e backups?",
        "back": "RAID melhora disponibilidade frente a falhas específicas de disco, mas não substitui backup contra erro humano, ransomware ou corrupção lógica."
      },
      {
        "front": "Qual erro de prova evitar em RAID, snapshots e backups?",
        "back": "Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 156,
    "code": "SO",
    "title": "Troubleshooting de domínio Windows, DNS e GPO",
    "objective": "Separar problemas de domínio, registro DNS e escopo de política usando uma sequência de diagnóstico reproduzível.",
    "theory": "# Caso de prova — computadores não recebem política de tela bloqueada\nUm grupo de estações ingressadas no domínio recebe autenticação normalmente, mas não aplica uma nova GPO de bloqueio de tela. “Se entrou no domínio, a GPO deveria funcionar” é uma conclusão incompleta: políticas podem ter **escopo, filtro, precedência, condições de processamento e erros de comunicação**. A pergunta de prova costuma apresentar vários fatos misturados para verificar se você sabe apontar qual deles realmente explica a ausência da política.\n\n## Método por camadas\n**Infraestrutura:** confirme resolução DNS do domínio e localize serviços do AD por registros SRV. Use resolver interno apropriado ao domínio; configurar DNS público como único servidor em estações de AD costuma impedir localização de serviços internos. **Identidade:** confirme que computador ou usuário correspondente está na OU esperada. **Escopo:** verifique se a GPO está vinculada a site, domínio ou OU que alcance o objeto, se o vínculo está ativo, se existe filtro de segurança/WMI e se a configuração está na seção de computador ou usuário correta. **Precedência:** a ordem usual de aplicação segue Local → Site → Domínio → OU (das ancestrais às descendentes), com exceções por imposição e bloqueio de herança. **Evidência:** examine resultado efetivo de políticas e registros, em vez de presumir que o último arquivo editado venceu.\n\n## Exemplo resolvido\nA GPO está vinculada à OU `Administrativo`, mas o computador afetado foi movido para `Recepcao`. A autenticação continua porque a conta de domínio é válida, mas o computador não está mais no escopo da política de máquina. O reparo adequado é reavaliar a estrutura de OUs ou o vínculo e validar o resultado efetivo. Não é necessário excluir e recriar o domínio.\n\nOutro cenário: uma política define configuração em `User Configuration`, porém a equipe procura efeito em objeto de computador sem entender loopback processing. A ausência do efeito pode ser consequência da estratégia de escopo e processamento. Analise qual entidade recebe a configuração antes de mudar permissões.\n\n## Atenção ao vocabulário\nOU é unidade de organização e vínculo de políticas; grupo de segurança pode atuar em filtragem/autorização; DNS localiza serviços; Kerberos está relacionado a autenticação. Nenhuma dessas peças substitui a outra. **Conflito de GPO** não é sinônimo de falha de DNS.\n\n## Prática de recuperação ativa\nMonte um checklist com oito itens e aplique a dois casos: (A) computador não encontra o controlador de domínio; (B) encontra domínio, mas não recebe uma política específica. O checklist deve variar a ordem dos testes conforme o sintoma, e registrar qual evidência descarta cada hipótese.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Uma GPO não aplica: quais dimensões verificar?",
        "back": "Escopo de OU, vínculo, filtros, seção usuário/computador, precedência, DNS e resultado efetivo."
      },
      {
        "front": "Qual a sequência geral LSDOU de GPO?",
        "back": "Local, site, domínio, unidade organizacional; com exceções de herança, imposição e filtros."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 157,
    "code": "SO",
    "title": "Análise de logs Linux, permissões e serviços",
    "objective": "Distinguir falha de serviço, de permissão e de rede usando evidências locais e testes não destrutivos.",
    "theory": "# Caso de prova — uma aplicação não reinicia no Linux\nApós uma atualização, o serviço `app.service` não sobe. A primeira tentação é alterar permissões de toda a pasta para `777`, mas essa ação pode ampliar riscos sem resolver o problema. Diagnóstico exige verificar **estado do serviço, configuração, logs e recursos externos**.\n\n## Sequência de verificação\n1. Consulte status e motivo de falha do serviço via gerenciador systemd (`systemctl status app.service`), distinguindo unidade inexistente, dependência não satisfeita, falha de execução e término inesperado.\n2. Examine logs relevantes via journal (`journalctl -u app.service`), observando mensagens, horário e usuário de execução. O journal pode não conter tudo se a aplicação gravar logs próprios.\n3. Verifique definição da unidade, diretórios de trabalho, conta de serviço, variáveis de ambiente e permissões do caminho de execução. Um processo não precisa de permissão irrestrita em todo o filesystem.\n4. Investigue porta ocupada, dependência de banco, DNS, espaço em disco, capacidade de memória e limites de recursos. Uma falha local de permissão pode ocorrer com rede perfeitamente funcional; timeout externo pode existir com permissões corretas.\n5. Faça mudança mínima e controlada, registre versão/configuração anterior e valide o serviço e a aplicação após a intervenção.\n\n## Permissões: leitura não é execução\nPara arquivo regular, os bits `r`, `w`, `x` dão leitura, escrita e execução. Em diretórios, o bit `x` permite atravessar o caminho, sujeito às demais permissões; `r` permite listar entradas. Um arquivo `640` dá dono leitura/escrita, grupo leitura e outros nenhuma permissão. Isso pode ser adequado a um arquivo de configuração sensível. A propriedade e grupos envolvidos importam tanto quanto o número octal.\n\n## Exemplo resolvido\nO log apresenta `Permission denied` ao ler arquivo de configuração. O serviço roda com a conta `appsvc`, mas o arquivo é `root:root` com modo `600`. É preciso decidir se uma permissão de leitura controlada por grupo ou mecanismo adequado é aceitável, em vez de conceder leitura global. Outro cenário: `Address already in use` indica conflito na associação da porta; `chmod 777` não remove esse conflito.\n\n## Pontos de cobrança\n- `systemctl enable` configura inicialização automática; não significa necessariamente iniciar agora. `start` solicita execução imediata.\n- `journalctl` consulta logs do journal; não é ferramenta de edição de unidades.\n- Usuário `root` não deve ser adotado por conveniência quando um serviço requer menos privilégios.\n- RAID e snapshots não substituem cópia de segurança recuperável e testada.\n\n## Treino sem consultar\nRecebeu `exit-code` e `Address already in use`. Explique a próxima evidência que buscaria e a correção de menor risco. Depois reescreva o diagnóstico usando linguagem técnica sem afirmar algo que o log ainda não comprova.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Erro Address already in use: qual hipótese testar?",
        "back": "Conflito de porta/interface ou socket já associado por outro processo."
      },
      {
        "front": "Por que chmod 777 não é correção genérica aceitável?",
        "back": "Amplia privilégios indevidamente e pode ocultar o diagnóstico real."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
