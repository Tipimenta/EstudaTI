import type {PedagogicalLesson} from './intro1'
export const completedSO:PedagogicalLesson[]=[
  {
    "id": 37,
    "title": "Linux: systemd e logs",
    "goal": "Explicar e aplicar: Linux: systemd e logs.",
    "steps": [
      {
        "title": "O que é Linux: systemd e logs e para que serve?",
        "body": "systemctl gerencia unidades (services etc.) em hosts com systemd. journalctl consulta registros do journal. O comando ss apresenta sockets de rede e pode ajudar a localizar portas em escuta.\n\n**Veja o conceito aplicado:** Se serviço não inicia: systemctl status serviço e journalctl -u serviço auxiliam na investigação."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual comando costuma apresentar sockets TCP em escuta no Linux?\n\n**Resposta fundamentada:** ss -ltn.\n\n**Por que essa é a resposta:** ss -ltn mostra sockets TCP listening de forma numérica."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Uma unidade systemd falha durante a inicialização. Qual comando é adequado para ler seus registros recentes?\n\n**Resposta fundamentada:** journalctl -u nome.service.\n\n**Por que essa é a resposta:** journalctl -u filtra mensagens de uma unidade systemd, ajudando a investigar falhas com evidência.\n\n**Atenção ao limite do conceito:** systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Linux: systemd e logs",
      "body": "**1. Identifique a pergunta e o assunto.** Qual ferramenta consulta logs do systemd journal?\n\n**2. Recupere a regra que explica a resposta.** journalctl lê entradas do journal.\n\n**3. Aplique ao cenário e conclua.** journalctl."
    },
    "pitfalls": [
      "systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container.",
      "systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container."
    ],
    "review": [
      {
        "ask": "Qual ferramenta consulta logs do systemd journal?",
        "answer": "journalctl. journalctl lê entradas do journal."
      },
      {
        "ask": "Qual comando costuma apresentar sockets TCP em escuta no Linux?",
        "answer": "ss -ltn. ss -ltn mostra sockets TCP listening de forma numérica."
      },
      {
        "ask": "Qual armadilha evitar em Linux: systemd e logs?",
        "answer": "systemctl não é universal em toda distribuição/ambiente, por exemplo imagens pequenas de container."
      }
    ],
    "extra": ""
  },
  {
    "id": 38,
    "title": "Active Directory, LDAP e Kerberos",
    "goal": "Explicar e aplicar: Active Directory, LDAP e Kerberos.",
    "steps": [
      {
        "title": "O que é Active Directory, LDAP e Kerberos e para que serve?",
        "body": "Active Directory Domain Services organiza objetos de domínio e políticas. LDAP é protocolo de acesso a diretórios; Kerberos é amplamente usado na autenticação em domínio. GPO distribui configurações e políticas em contextos apropriados.\n\n**Veja o conceito aplicado:** Se autenticação do domínio falha, verifique sincronismo de relógio, DNS do domínio e conectividade ao controlador."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual recurso do AD centraliza políticas de configuração em computadores e usuários?\n\n**Resposta fundamentada:** GPO.\n\n**Por que essa é a resposta:** Group Policy Objects aplicam políticas por escopo e precedência."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Um usuário do domínio consegue autenticar-se em uma máquina, mas não acessar pasta compartilhada. Qual suspeita é pertinente?\n\n**Resposta fundamentada:** Permissão de compartilhamento/NTFS inadequada.\n\n**Por que essa é a resposta:** Estar autenticado não assegura permissão de acesso; é necessário examinar políticas e ACLs efetivas.\n\n**Atenção ao limite do conceito:** AD não é sinônimo de DNS, embora dependa fortemente dele."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Active Directory, LDAP e Kerberos",
      "body": "**1. Identifique a pergunta e o assunto.** Qual protocolo é associado à autenticação por tickets em domínio AD?\n\n**2. Recupere a regra que explica a resposta.** Kerberos usa tickets para autenticação.\n\n**3. Aplique ao cenário e conclua.** Kerberos."
    },
    "pitfalls": [
      "AD não é sinônimo de DNS, embora dependa fortemente dele.",
      "AD não é sinônimo de DNS, embora dependa fortemente dele."
    ],
    "review": [
      {
        "ask": "Qual protocolo é associado à autenticação por tickets em domínio AD?",
        "answer": "Kerberos. Kerberos usa tickets para autenticação."
      },
      {
        "ask": "Qual recurso do AD centraliza políticas de configuração em computadores e usuários?",
        "answer": "GPO. Group Policy Objects aplicam políticas por escopo e precedência."
      },
      {
        "ask": "Qual armadilha evitar em Active Directory, LDAP e Kerberos?",
        "answer": "AD não é sinônimo de DNS, embora dependa fortemente dele."
      }
    ],
    "extra": ""
  },
  {
    "id": 39,
    "title": "Virtualização e hipervisores",
    "goal": "Explicar e aplicar: Virtualização e hipervisores.",
    "steps": [
      {
        "title": "O que é Virtualização e hipervisores e para que serve?",
        "body": "Hipervisor tipo 1 opera diretamente sobre infraestrutura física; tipo 2 tipicamente sobre sistema operacional hospedeiro. Máquinas virtuais possuem guest OS próprio. Snapshots auxiliam testes e reversão, mas não substituem plano completo de backup.\n\n**Veja o conceito aplicado:** Na migração P2V de servidor legado, valide compatibilidade de boot/firmware, controladores de armazenamento e integridade do sistema."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Por que snapshots não devem ser o único backup?\n\n**Resposta fundamentada:** Não são necessariamente cópias independentes e duráveis.\n\n**Por que essa é a resposta:** Snapshots podem depender do mesmo armazenamento e cadeia de discos."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Uma VM Windows instalada com firmware BIOS e disco MBR é migrada para Hyper-V. Qual tipo de geração costuma preservar compatibilidade de inicialização?\n\n**Resposta fundamentada:** Geração 1.\n\n**Por que essa é a resposta:** Geração 1 usa BIOS virtual e é mais compatível com sistemas MBR/BIOS; Geração 2 é UEFI e pode demandar adaptações.\n\n**Atenção ao limite do conceito:** Snapshot prolongado pode elevar uso de armazenamento e custos operacionais."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Virtualização e hipervisores",
      "body": "**1. Identifique a pergunta e o assunto.** Qual característica descreve hipervisor de tipo 1?\n\n**2. Recupere a regra que explica a resposta.** Hipervisor bare-metal opera diretamente na infraestrutura.\n\n**3. Aplique ao cenário e conclua.** Executa diretamente sobre o hardware de hospedagem."
    },
    "pitfalls": [
      "Snapshot prolongado pode elevar uso de armazenamento e custos operacionais.",
      "Snapshot prolongado pode elevar uso de armazenamento e custos operacionais."
    ],
    "review": [
      {
        "ask": "Qual característica descreve hipervisor de tipo 1?",
        "answer": "Executa diretamente sobre o hardware de hospedagem. Hipervisor bare-metal opera diretamente na infraestrutura."
      },
      {
        "ask": "Por que snapshots não devem ser o único backup?",
        "answer": "Não são necessariamente cópias independentes e duráveis. Snapshots podem depender do mesmo armazenamento e cadeia de discos."
      },
      {
        "ask": "Qual armadilha evitar em Virtualização e hipervisores?",
        "answer": "Snapshot prolongado pode elevar uso de armazenamento e custos operacionais."
      }
    ],
    "extra": ""
  },
  {
    "id": 41,
    "title": "RAID e disponibilidade",
    "goal": "Explicar e aplicar: RAID e disponibilidade.",
    "steps": [
      {
        "title": "O que é RAID e disponibilidade e para que serve?",
        "body": "RAID 1 espelha dados e pode tolerar falha de um disco do espelho; RAID 5 usa paridade distribuída e requer pelo menos três discos. RAID contribui à disponibilidade, mas não protege de exclusão acidental, ransomware ou desastre no local.\n\n**Veja o conceito aplicado:** Em um RAID5 com três discos iguais, capacidade útil aproximada é equivalente a dois discos, antes de overheads."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Um arranjo RAID 5 perde um disco e segue operando degradado. Qual medida é coerente?\n\n**Resposta fundamentada:** Substituir disco conforme procedimento e reconstruir com monitoramento.\n\n**Por que essa é a resposta:** RAID 5 tolera normalmente a falha de um disco, mas a perda de outro antes da recuperação pode comprometer dados."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Qual a quantidade mínima de discos em RAID 5 convencional?\n\n**Resposta fundamentada:** 3.\n\n**Por que essa é a resposta:** RAID5 requer no mínimo três discos.\n\n**Atenção ao limite do conceito:** Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: RAID e disponibilidade",
      "body": "**1. Identifique a pergunta e o assunto.** Qual evento RAID não protege adequadamente, por si só?\n\n**2. Recupere a regra que explica a resposta.** RAID replica/grava alterações lógicas, inclusive exclusões.\n\n**3. Aplique ao cenário e conclua.** Exclusão lógica acidental de dados."
    },
    "pitfalls": [
      "Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade.",
      "Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade."
    ],
    "review": [
      {
        "ask": "Qual a quantidade mínima de discos em RAID 5 convencional?",
        "answer": "3. RAID5 requer no mínimo três discos."
      },
      {
        "ask": "Qual evento RAID não protege adequadamente, por si só?",
        "answer": "Exclusão lógica acidental de dados. RAID replica/grava alterações lógicas, inclusive exclusões."
      },
      {
        "ask": "Qual armadilha evitar em RAID e disponibilidade?",
        "answer": "Rebuild pode degradar desempenho e aumentar exposição a novas falhas; acompanhe integridade."
      }
    ],
    "extra": ""
  },
  {
    "id": 42,
    "title": "Nuvem: IaaS, PaaS, SaaS",
    "goal": "Explicar e aplicar: Nuvem: IaaS, PaaS, SaaS.",
    "steps": [
      {
        "title": "O que é Nuvem: IaaS, PaaS, SaaS e para que serve?",
        "body": "IaaS fornece recursos de infraestrutura virtualizados; PaaS oferece ambiente/plataforma gerenciada para aplicação; SaaS fornece software pronto via serviço. Responsabilidades de segurança são compartilhadas entre provedor e cliente conforme modelo e contrato.\n\n**Veja o conceito aplicado:** Serviço de máquina virtual costuma ser IaaS; serviço gerenciado para hospedar aplicações pode ser PaaS."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Em um serviço PaaS gerenciado, qual responsabilidade tende a continuar com o cliente?\n\n**Resposta fundamentada:** Desenvolvimento seguro e gestão das identidades da aplicação.\n\n**Por que essa é a resposta:** Mesmo em PaaS, aplicação, dados e acessos seguem com responsabilidades do cliente, conforme contrato e modelo compartilhado."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "**A questão pergunta:** Em serviço IaaS, normalmente o cliente é responsável por:\n\n**Resposta fundamentada:** Administrar sistema operacional convidado.\n\n**Por que essa é a resposta:** IaaS costuma deixar OS convidado e aplicações sob o controle do cliente.\n\n**Atenção ao limite do conceito:** Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Nuvem: IaaS, PaaS, SaaS",
      "body": "**1. Identifique a pergunta e o assunto.** Qual modelo de nuvem entrega aplicações prontas ao consumidor?\n\n**2. Recupere a regra que explica a resposta.** Software as a Service entrega software como serviço.\n\n**3. Aplique ao cenário e conclua.** SaaS."
    },
    "pitfalls": [
      "Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato.",
      "Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato."
    ],
    "review": [
      {
        "ask": "Qual modelo de nuvem entrega aplicações prontas ao consumidor?",
        "answer": "SaaS. Software as a Service entrega software como serviço."
      },
      {
        "ask": "Em serviço IaaS, normalmente o cliente é responsável por:",
        "answer": "Administrar sistema operacional convidado. IaaS costuma deixar OS convidado e aplicações sob o controle do cliente."
      },
      {
        "ask": "Qual armadilha evitar em Nuvem: IaaS, PaaS, SaaS?",
        "answer": "Em SaaS o cliente ainda cuida de identidades, permissões, uso correto e dados conforme o contrato."
      }
    ],
    "extra": ""
  },
  {
    "id": 97,
    "title": "Active Directory, DNS e políticas de acesso",
    "goal": "Diagnosticar domínio Windows distinguindo identidade, resolução de nomes e políticas.",
    "steps": [
      {
        "title": "Compreenda Active Directory, DNS e políticas de acesso",
        "body": "**Active Directory Domain Services (AD DS)** mantém identidade e objetos do domínio, com autenticação e autorização distribuídas. **Controladores de domínio** hospedam serviços de diretório; replicação mantém alterações entre DCs. **DNS** é fundamental para a localização de serviços AD: registros SRV ajudam clientes a encontrar controladores de domínio. Kerberos usa tickets para autenticação e depende de sincronização de tempo apropriada. LDAP é protocolo de acesso ao diretório e não é sinônimo de “criptografia do domínio”."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "**GPO** aplica configurações a usuários/computadores, respeitando escopo e precedência, filtragem de segurança, herança e processamento. Uma política linkada à OU errada pode não atingir computadores desejados. **Grupos de segurança** apoiam autorização; aplicar mínimo privilégio evita conceder acesso administrativo permanente para solucionar tarefas simples. Para troubleshooting, confira DNS correto, registros SRV, horário, conectividade e eventos de autenticação, antes de recriar objetos do domínio."
      },
      {
        "title": "Observe as relações e condições",
        "body": "Comandos úteis: `whoami /groups`, `gpresult /r`, `gpupdate /force`, `nltest /dsgetdc:dominio.exemplo`, `nslookup -type=SRV _ldap._tcp.dc._msdcs.dominio.exemplo`. O comportamento exato depende da versão e da configuração do ambiente."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Active Directory, DNS e políticas de acesso",
      "body": "Usuário abre sessão em máquina de domínio mas não recebe mapeamento de impressora configurado por GPO. 1) Veja se a máquina e o usuário pertencem à OU/escopo esperado. 2) Execute `gpresult /r` para identificar políticas aplicadas e negadas. 3) Confira segurança, WMI e herança. 4) Analise log de GroupPolicy e conectividade para compartilhamento. 5) Corrija escopo ou recurso e valide em usuário piloto.\n\nSe uma estação está apontando DNS apenas para um resolvedor público, pode navegar na internet e ainda assim falhar para encontrar serviços do domínio. O diagnóstico correto começa por resolver a zona interna e registros de localização de serviço."
    },
    "pitfalls": [
      "autenticação não equivale a autorização; conseguir login não dá acesso a qualquer pasta. **Pegadinha:** GPO não funciona apenas com “reiniciar sempre”; alguns ajustes são processados por atualização de política e outros exigem reinicialização ou novo logon. **Pegadinha:** permissões NTFS e permissões do compartilhamento podem restringir acesso em conjunto.",
      "Não extrapole o enunciado: use os dados e condições específicos de Active Directory, DNS e políticas de acesso."
    ],
    "review": [
      {
        "ask": "Por que DNS interno é essencial ao AD DS?",
        "answer": "Clientes localizam serviços e controladores de domínio por registros DNS, incluindo SRV."
      },
      {
        "ask": "Qual diferença entre autenticar e autorizar um usuário no domínio?",
        "answer": "Autenticação verifica identidade; autorização controla recursos e permissões disponíveis."
      }
    ],
    "extra": ""
  },
  {
    "id": 98,
    "title": "Linux: processos, permissões, systemd e rede",
    "goal": "Investigar serviços Linux sem depender de tentativas cegas de reinicialização.",
    "steps": [
      {
        "title": "Compreenda Linux: processos, permissões, systemd e rede",
        "body": "No Linux, processos possuem PID, dono e estado. `ps`, `top` e `journalctl` ajudam a investigar execução e logs. `systemd` gerencia unidades como serviços, alvos e temporizadores em distribuições que o utilizam; `systemctl status nginx`, `systemctl restart nginx` e `journalctl -u nginx` cumprem papéis distintos: estado, ação e registros. Reiniciar antes de ler logs pode apagar pistas importantes dependendo da aplicação."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "Permissões clássicas **rwx** correspondem a leitura, escrita e execução; usuários, grupo e outros recebem permissões separadas. `chmod 640 arquivo` configura `rw- r-- ---`; diretorias exigem permissão de execução para travessia. O root pode executar operações privilegiadas e deve ser protegido por mínimo privilégio. `sudo` delega execução privilegiada conforme política. `chown` altera proprietário; ACLs e atributos adicionais podem afetar acesso."
      },
      {
        "title": "Observe as relações e condições",
        "body": "Rede: `ip addr`, `ip route`, `ss -lntp`, `resolvectl status` (quando disponível) e `dig` ajudam a separar problemas de interface, rota, escuta e resolução. Arquivos de configuração variam entre distribuições; não memorize `/etc/network/interfaces` como único mecanismo universal."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Linux: processos, permissões, systemd e rede",
      "body": "Um serviço web responde “connection refused” no próprio servidor. 1) `systemctl status` revela se está ativo; 2) `ss -lntp` mostra se alguém escuta na porta esperada; 3) `journalctl -u` permite identificar falha de inicialização; 4) examine configuração de bind, firewall local e dependências; 5) aplique alteração controlada e valide.\n\nSe a aplicação escuta em `127.0.0.1:8080`, ela não está automaticamente acessível pelo IP de rede do servidor. Uma solução é disponibilizar proxy reverso e controles de acesso apropriados. Segurança implica evitar expor serviços administrativos desnecessariamente."
    },
    "pitfalls": [
      "`chmod 777` não é solução aceitável por padrão e amplia risco. **Pegadinha:** `systemctl enable` configura inicialização automática e não garante que o serviço esteja rodando agora; `start` inicia. **Pegadinha:** processo ativo não demonstra que aplicação responde corretamente; cheque saúde funcional. **Pegadinha:** `kill -9` é último recurso, pois impede encerramento ordenado.",
      "Não extrapole o enunciado: use os dados e condições específicos de Linux: processos, permissões, systemd e rede."
    ],
    "review": [
      {
        "ask": "Diferença entre systemctl enable e start?",
        "answer": "enable configura o serviço para iniciar automaticamente conforme unidades; start o inicia agora."
      },
      {
        "ask": "O que representa chmod 750?",
        "answer": "Dono: rwx (7); grupo: r-x (5); outros: --- (0)."
      }
    ],
    "extra": ""
  },
  {
    "id": 99,
    "title": "Virtualização, contêineres, RAID e backups",
    "goal": "Comparar hipervisores, imagens de contêiner, persistência e redundância.",
    "steps": [
      {
        "title": "Compreenda Virtualização, contêineres, RAID e backups",
        "body": "**Virtualização por hipervisor** fornece máquinas virtuais com SO convidado e hardware virtualizado. **Contêineres** compartilham o kernel do host, isolando processos e recursos por mecanismos como namespaces e cgroups; não são VMs completas. Imagens são modelos imutáveis por camadas, enquanto contêineres são instâncias executáveis. **Volumes** persistem dados além do ciclo de vida do contêiner; escrever arquivos apenas na camada gravável pode causar perda ao recriar instâncias."
      },
      {
        "title": "Como esse conceito funciona",
        "body": "RAID trata disponibilidade/performance de armazenamento, **não substitui backup**. RAID 1 espelha dados, RAID 5 usa paridade distribuída e suporta falha de um disco (com condições e riscos no rebuild). RAID 0 não é tolerante a falhas. Uma exclusão acidental ou ransomware pode se propagar para todos os discos de um RAID. **Snapshots** são pontos no tempo, mas políticas de proteção e consistência determinam seu valor; snapshots da mesma máquina não devem ser chamados de cópia externa segura."
      },
      {
        "title": "Observe as relações e condições",
        "body": "Em Docker Compose, serviços, redes, volumes e variáveis de ambiente formam a orquestração local. **Build** cria imagens; `up -d --build` constrói/inicia; `down` remove contêineres e redes do projeto; `down -v` também remove volumes declarados e pode destruir dados. Nunca execute comandos destrutivos sem backup comprovado."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Virtualização, contêineres, RAID e backups",
      "body": "Um projeto tem `web` (React/Nginx) e `api` (FastAPI) com banco SQLite em volume nomeado. A versão do código muda, mas o SQLite precisa permanecer. Procedimento: 1) backup verificável do banco; 2) versionar arquivos de aplicação; 3) atualizar imagens; 4) subir serviços com `docker compose up -d --build`; 5) validar login, registros e histórico. Não use `docker compose down -v` como “limpeza” durante atualização.\n\nSe dois discos de um RAID 5 comum falham, o arranjo pode perder capacidade de reconstrução. Já um RAID 1 de dois discos tolera a falha de um deles. Em ambos, backups externos são necessários contra perda lógica e desastres."
    },
    "pitfalls": [
      "“RAID 5 tem duas paridades” confunde RAID 5 com RAID 6. **Pegadinha:** “imagem Docker = contêiner” é falso. **Pegadinha:** contêiner no Linux compartilha kernel do host, embora possa executar aplicações com userland distinto. **Pegadinha:** `down -v` remove volumes associados e é perigoso para produção.",
      "Não extrapole o enunciado: use os dados e condições específicos de Virtualização, contêineres, RAID e backups."
    ],
    "review": [
      {
        "ask": "Qual diferença estrutural principal entre VM e contêiner no mesmo host Linux?",
        "answer": "VM executa SO convidado com kernel próprio; contêiner compartilha kernel do host e isola processos."
      },
      {
        "ask": "Por que RAID não substitui backup?",
        "answer": "RAID melhora disponibilidade diante de falhas de disco, mas não protege suficientemente contra exclusão, corrupção, ransomware e desastre."
      }
    ],
    "extra": ""
  },
  {
    "id": 125,
    "title": "Active Directory: OU, grupos e GPO",
    "goal": "Compreender e aplicar active directory: ou, grupos e gpo em provas.",
    "steps": [
      {
        "title": "O que é Active Directory: OU, grupos e GPO e para que serve?",
        "body": "O Active Directory Domain Services armazena objetos de domínio e autenticação; OUs organizam delegação e aplicação de políticas.\n\nUma unidade organizacional não é, por si, um grupo de segurança. GPOs podem ser vinculadas a sites, domínios e OUs. A ordem de processamento e a precedência determinam o resultado efetivo; herança e filtragem precisam ser consideradas ao diagnosticar uma configuração.\n\n**Veja o conceito aplicado:** Para impor bloqueio de tela em estações administrativas, é possível vincular GPO à OU dessas máquinas e testar escopo, herança e grupos de filtragem."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Para aplicar uma política Windows a computadores de determinado setor, qual estratégia é mais coerente?\n\n**Resposta fundamentada:** Vincular GPO à OU correspondente e validar filtros.\n\n**Por que essa é a resposta:** GPOs são vinculadas a sites, domínios e OUs com processamento por herança e filtros; o escopo correto é indispensável."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Para impor bloqueio de tela em estações administrativas, é possível vincular GPO à OU dessas máquinas e testar escopo, herança e grupos de filtragem.\n\n**A questão pergunta:** Qual objeto normalmente agrupa computadores para aplicar políticas de configuração?\n\n**Resposta fundamentada:** Unidade organizacional (OU).\n\n**Por que essa é a resposta:** OUs permitem estruturação lógica e vínculos de GPO.\n\n**Não confunda:** Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Active Directory: OU, grupos e GPO",
      "body": "**1. Identifique a pergunta e o assunto.** Qual objeto normalmente agrupa computadores para aplicar políticas de configuração?\n\n**2. Recupere a regra que explica a resposta.** OUs permitem estruturação lógica e vínculos de GPO.\n\n**3. Aplique ao cenário e conclua.** Unidade organizacional (OU)."
    },
    "pitfalls": [
      "Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas.",
      "Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Active Directory: OU, grupos e GPO?",
        "answer": "O Active Directory Domain Services armazena objetos de domínio e autenticação; OUs organizam delegação e aplicação de políticas."
      },
      {
        "ask": "Qual erro de prova evitar em Active Directory: OU, grupos e GPO?",
        "answer": "Criar OU não muda automaticamente ACLs de compartilhamento; isso requer permissões apropriadas."
      }
    ],
    "extra": ""
  },
  {
    "id": 126,
    "title": "Linux: permissões e umask",
    "goal": "Compreender e aplicar linux: permissões e umask em provas.",
    "steps": [
      {
        "title": "O que é Linux: permissões e umask e para que serve?",
        "body": "Permissões Unix básicas representam leitura, escrita e execução para dono, grupo e outros; bits são codificados em octal.\n\nNo modo 750, proprietário possui rwx, grupo r-x, outros nenhuma permissão. Diretório precisa de execução para atravessamento; leitura permite listar nomes sob condições adequadas. Umask retira bits das permissões padrão solicitadas na criação de arquivos e diretórios.\n\n**Veja o conceito aplicado:** Um arquivo marcado 640 não é executável nem para o proprietário; chmod 750 altera isso para arquivo específico, se apropriado."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Em chmod 750, qual permissão é concedida ao grupo?\n\n**Resposta fundamentada:** Leitura e execução.\n\n**Por que essa é a resposta:** Octal 5 representa 4+1, isto é, r-x."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Um arquivo marcado 640 não é executável nem para o proprietário; chmod 750 altera isso para arquivo específico, se apropriado.\n\n**A questão pergunta:** Uma umask 027, aplicada a novos arquivos com permissões base 666, normalmente produz que permissão?\n\n**Resposta fundamentada:** 640.\n\n**Por que essa é a resposta:** Em modo convencional, arquivos 666 com umask 027 resultam 640 (rw-r-----); diretórios têm base 777 e resultam 750.\n\n**Não confunda:** Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Linux: permissões e umask",
      "body": "**1. Identifique a pergunta e o assunto.** Uma umask 027, aplicada a novos arquivos com permissões base 666, normalmente produz que permissão?\n\n**2. Recupere a regra que explica a resposta.** Em modo convencional, arquivos 666 com umask 027 resultam 640 (rw-r-----); diretórios têm base 777 e resultam 750.\n\n**3. Aplique ao cenário e conclua.** 640."
    },
    "pitfalls": [
      "Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos.",
      "Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Linux: permissões e umask?",
        "answer": "Permissões Unix básicas representam leitura, escrita e execução para dono, grupo e outros; bits são codificados em octal."
      },
      {
        "ask": "Qual erro de prova evitar em Linux: permissões e umask?",
        "answer": "Em diretórios, bit x controla travessia: não aplique intuitivamente a semântica de arquivos."
      }
    ],
    "extra": ""
  },
  {
    "id": 127,
    "title": "Virtualização, containers e imagens",
    "goal": "Compreender e aplicar virtualização, containers e imagens em provas.",
    "steps": [
      {
        "title": "O que é Virtualização, containers e imagens e para que serve?",
        "body": "Máquinas virtuais virtualizam hardware e executam sistema convidado; contêineres compartilham kernel do host no modelo comum Linux.\n\nImages são templates imutáveis de camadas; containers são instâncias executáveis. Volumes persistem dados fora do ciclo de vida de um container. Uma máquina Windows legada convertida P2V pode exigir atenção a BIOS/UEFI, controladora e driver, sem trocar automaticamente sua geração ou esquema de partição.\n\n**Veja o conceito aplicado:** Ao recriar o container de uma aplicação, um volume Docker deve manter o SQLite se montado corretamente, mas exclusão deliberada do volume destrói dados."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** O que preserva dados de aplicação entre recriações de contêineres Docker?\n\n**Resposta fundamentada:** Volume persistente.\n\n**Por que essa é a resposta:** Volumes mantêm dados independentemente do ciclo de vida do container."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Ao recriar o container de uma aplicação, um volume Docker deve manter o SQLite se montado corretamente, mas exclusão deliberada do volume destrói dados.\n\n**A questão pergunta:** Uma equipe cria imagem Docker que inclui credenciais em camadas do build. Qual problema permanece mesmo após remover o arquivo em etapa posterior?\n\n**Resposta fundamentada:** Segredos podem ficar no histórico/camadas da imagem.\n\n**Por que essa é a resposta:** Segredos escritos durante build podem persistir em camadas/cache; use gerenciamento de segredos em vez de incluí-los na imagem.\n\n**Não confunda:** Docker Compose não substitui backup nem garante alta disponibilidade em um único host."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Virtualização, containers e imagens",
      "body": "**1. Identifique a pergunta e o assunto.** Uma equipe cria imagem Docker que inclui credenciais em camadas do build. Qual problema permanece mesmo após remover o arquivo em etapa posterior?\n\n**2. Recupere a regra que explica a resposta.** Segredos escritos durante build podem persistir em camadas/cache; use gerenciamento de segredos em vez de incluí-los na imagem.\n\n**3. Aplique ao cenário e conclua.** Segredos podem ficar no histórico/camadas da imagem."
    },
    "pitfalls": [
      "Docker Compose não substitui backup nem garante alta disponibilidade em um único host.",
      "Docker Compose não substitui backup nem garante alta disponibilidade em um único host."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Virtualização, containers e imagens?",
        "answer": "Máquinas virtuais virtualizam hardware e executam sistema convidado; contêineres compartilham kernel do host no modelo comum Linux."
      },
      {
        "ask": "Qual erro de prova evitar em Virtualização, containers e imagens?",
        "answer": "Docker Compose não substitui backup nem garante alta disponibilidade em um único host."
      }
    ],
    "extra": ""
  },
  {
    "id": 128,
    "title": "RAID, snapshots e backups",
    "goal": "Compreender e aplicar raid, snapshots e backups em provas.",
    "steps": [
      {
        "title": "O que é RAID, snapshots e backups e para que serve?",
        "body": "RAID melhora disponibilidade frente a falhas específicas de disco, mas não substitui backup contra erro humano, ransomware ou corrupção lógica.\n\nRAID 1 espelha; RAID 5 utiliza paridade distribuída e tolera uma falha de disco; RAID 6 tolera duas falhas. Snapshots podem ajudar retorno rápido, mas se residirem no mesmo sistema comprometido não garantem recuperação. Estratégia 3-2-1 com cópia isolada e testes reduz riscos de perda.\n\n**Veja o conceito aplicado:** Em um servidor com volume C: RAID1 e imagens DICOM no RAID5, remover arquivos acidentalmente afeta todas as cópias lógicas disponíveis no arranjo, por isso restauração precisa de backup."
      },
      {
        "title": "Vamos entender uma situação concreta",
        "body": "**A questão pergunta:** Qual afirmação descreve melhor RAID 5?\n\n**Resposta fundamentada:** Usa paridade distribuída e tolera falha de um disco.\n\n**Por que essa é a resposta:** RAID5 combina striping com paridade e tolerância a uma falha."
      },
      {
        "title": "Como reconhecer a regra em outro caso",
        "body": "Em um servidor com volume C: RAID1 e imagens DICOM no RAID5, remover arquivos acidentalmente afeta todas as cópias lógicas disponíveis no arranjo, por isso restauração precisa de backup.\n\n**A questão pergunta:** Uma organização tem RAID 1 em produção e nenhuma cópia externa. Qual risco segue sem mitigação?\n\n**Resposta fundamentada:** Exclusão acidental ou ransomware afetar ambas as cópias.\n\n**Por que essa é a resposta:** RAID espelha alterações, inclusive exclusões ou criptografia maliciosa; backups independentes são necessários.\n\n**Não confunda:** Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: RAID, snapshots e backups",
      "body": "**1. Identifique a pergunta e o assunto.** Uma organização tem RAID 1 em produção e nenhuma cópia externa. Qual risco segue sem mitigação?\n\n**2. Recupere a regra que explica a resposta.** RAID espelha alterações, inclusive exclusões ou criptografia maliciosa; backups independentes são necessários.\n\n**3. Aplique ao cenário e conclua.** Exclusão acidental ou ransomware afetar ambas as cópias."
    },
    "pitfalls": [
      "Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade.",
      "Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de RAID, snapshots e backups?",
        "answer": "RAID melhora disponibilidade frente a falhas específicas de disco, mas não substitui backup contra erro humano, ransomware ou corrupção lógica."
      },
      {
        "ask": "Qual erro de prova evitar em RAID, snapshots e backups?",
        "answer": "Rebuild após falha é período de risco e exige acompanhamento de integridade e capacidade."
      }
    ],
    "extra": ""
  },
  {
    "id": 156,
    "title": "Troubleshooting de domínio Windows, DNS e GPO",
    "goal": "Separar problemas de domínio, registro DNS e escopo de política usando uma sequência de diagnóstico reproduzível.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — computadores não recebem política de tela bloqueada\nUm grupo de estações ingressadas no domínio recebe autenticação normalmente, mas não aplica uma nova GPO de bloqueio de tela. “Se entrou no domínio, a GPO deveria funcionar” é uma conclusão incompleta: políticas podem ter **escopo, filtro, precedência, condições de processamento e erros de comunicação**. A pergunta de prova costuma apresentar vários fatos misturados para verificar se você sabe apontar qual deles realmente explica a ausência da política."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Método por camadas\n**Infraestrutura:** confirme resolução DNS do domínio e localize serviços do AD por registros SRV. Use resolver interno apropriado ao domínio; configurar DNS público como único servidor em estações de AD costuma impedir localização de serviços internos. **Identidade:** confirme que computador ou usuário correspondente está na OU esperada. **Escopo:** verifique se a GPO está vinculada a site, domínio ou OU que alcance o objeto, se o vínculo está ativo, se existe filtro de segurança/WMI e se a configuração está na seção de computador ou usuário correta. **Precedência:** a ordem usual de aplicação segue Local → Site → Domínio → OU (das ancestrais às descendentes), com exceções por imposição e bloqueio de herança. **Evidência:** examine resultado efetivo de políticas e registros, em vez de presumir que o último arquivo editado venceu."
      },
      {
        "title": "Construindo a solução",
        "body": "## Exemplo resolvido\nA GPO está vinculada à OU `Administrativo`, mas o computador afetado foi movido para `Recepcao`. A autenticação continua porque a conta de domínio é válida, mas o computador não está mais no escopo da política de máquina. O reparo adequado é reavaliar a estrutura de OUs ou o vínculo e validar o resultado efetivo. Não é necessário excluir e recriar o domínio.\n\nOutro cenário: uma política define configuração em `User Configuration`, porém a equipe procura efeito em objeto de computador sem entender loopback processing. A ausência do efeito pode ser consequência da estratégia de escopo e processamento. Analise qual entidade recebe a configuração antes de mudar permissões."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Troubleshooting de domínio Windows, DNS e GPO",
      "body": "**A questão pergunta:** Uma GPO de computador está vinculada somente à OU Financeiro, mas o computador foi movido para Recepção. Qual é uma causa plausível da política não aplicar?\n\n**Resposta fundamentada:** O computador não está no escopo do vínculo da GPO.\n\n**Por que essa é a resposta:** A vinculação à OU delimita escopo; mover o objeto pode tirá-lo da área de aplicação."
    },
    "pitfalls": [
      "Uma alternativa incorreta seria **Driver da placa de vídeo**. O erro é: O driver gráfico não determina a descoberta de controladores de domínio.",
      "Não extrapole o enunciado: use os dados e condições específicos de Troubleshooting de domínio Windows, DNS e GPO."
    ],
    "review": [
      {
        "ask": "Uma GPO não aplica: quais dimensões verificar?",
        "answer": "Escopo de OU, vínculo, filtros, seção usuário/computador, precedência, DNS e resultado efetivo."
      },
      {
        "ask": "Qual a sequência geral LSDOU de GPO?",
        "answer": "Local, site, domínio, unidade organizacional; com exceções de herança, imposição e filtros."
      }
    ],
    "extra": ""
  },
  {
    "id": 157,
    "title": "Análise de logs Linux, permissões e serviços",
    "goal": "Distinguir falha de serviço, de permissão e de rede usando evidências locais e testes não destrutivos.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — uma aplicação não reinicia no Linux\nApós uma atualização, o serviço `app.service` não sobe. A primeira tentação é alterar permissões de toda a pasta para `777`, mas essa ação pode ampliar riscos sem resolver o problema. Diagnóstico exige verificar **estado do serviço, configuração, logs e recursos externos**."
      },
      {
        "title": "Como analisar a situação",
        "body": "## Sequência de verificação\n1. Consulte status e motivo de falha do serviço via gerenciador systemd (`systemctl status app.service`), distinguindo unidade inexistente, dependência não satisfeita, falha de execução e término inesperado.\n2. Examine logs relevantes via journal (`journalctl -u app.service`), observando mensagens, horário e usuário de execução. O journal pode não conter tudo se a aplicação gravar logs próprios.\n3. Verifique definição da unidade, diretórios de trabalho, conta de serviço, variáveis de ambiente e permissões do caminho de execução. Um processo não precisa de permissão irrestrita em todo o filesystem.\n4. Investigue porta ocupada, dependência de banco, DNS, espaço em disco, capacidade de memória e limites de recursos. Uma falha local de permissão pode ocorrer com rede perfeitamente funcional; timeout externo pode existir com permissões corretas.\n5. Faça mudança mínima e controlada, registre versão/configuração anterior e valide o serviço e a aplicação após a intervenção."
      },
      {
        "title": "Construindo a solução",
        "body": "## Permissões: leitura não é execução\nPara arquivo regular, os bits `r`, `w`, `x` dão leitura, escrita e execução. Em diretórios, o bit `x` permite atravessar o caminho, sujeito às demais permissões; `r` permite listar entradas. Um arquivo `640` dá dono leitura/escrita, grupo leitura e outros nenhuma permissão. Isso pode ser adequado a um arquivo de configuração sensível. A propriedade e grupos envolvidos importam tanto quanto o número octal."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: Análise de logs Linux, permissões e serviços",
      "body": "**A questão pergunta:** Um processo Linux cria arquivo regular com modo base 666 e umask 027. Qual será a permissão usual resultante?\n\n**Resposta fundamentada:** 640.\n\n**Por que essa é a resposta:** O modo final é o modo base com os bits da máscara retirados: 0666 & ~0027 = 0640.\n\nUma alternativa incorreta seria **777**. O erro é: 777 concederia execução que não faz parte da criação padrão de arquivo regular."
    },
    "pitfalls": [
      "Não extrapole o enunciado: use os dados e condições específicos de Análise de logs Linux, permissões e serviços.",
      "Não extrapole o enunciado: use os dados e condições específicos de Análise de logs Linux, permissões e serviços."
    ],
    "review": [
      {
        "ask": "Erro Address already in use: qual hipótese testar?",
        "answer": "Conflito de porta/interface ou socket já associado por outro processo."
      },
      {
        "ask": "Por que chmod 777 não é correção genérica aceitável?",
        "answer": "Amplia privilégios indevidamente e pode ocultar o diagnóstico real."
      }
    ],
    "extra": ""
  }
];
