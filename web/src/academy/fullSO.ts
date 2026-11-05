import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullSO=buildChapters([
  {
    "id": 7,
    "title": "Máquinas virtuais, contêineres e RAID: o que cada tecnologia isola?",
    "goal": "Entender isolamento de sistemas, dependência de kernel, discos e cópias sem confundir infraestrutura com recuperação.",
    "context": "Imagine uma empresa com um servidor físico que precisa executar dois aplicativos. Colocar tudo no mesmo sistema operacional pode criar conflitos de bibliotecas e dificultar a manutenção. Uma **máquina virtual (VM)** permite executar um sistema operacional convidado sobre recursos virtuais fornecidos por um **hipervisor**, software que administra máquinas virtuais. Um **contêiner** isola processos e arquivos com recursos do sistema operacional hospedeiro, geralmente compartilhando seu kernel. O **RAID**, por sua vez, organiza múltiplos discos para propriedades de capacidade, desempenho ou redundância. São problemas distintos.",
    "explanation": "Na virtualização por hipervisor, cada VM possui recursos virtuais como CPU, memória, disco e interface de rede, além de sistema operacional convidado. Contêineres não precisam iniciar um sistema operacional completo para cada aplicativo: utilizam mecanismos de isolamento e limitação de recursos do host, como namespaces e cgroups em Linux. RAID 1 duplica dados em espelho; RAID 5 distribui dados e paridade por pelo menos três discos, tolerando uma falha de disco convencional. **Backup** é uma cópia recuperável independente em grau apropriado aos riscos — não é o mesmo que qualquer uma dessas três tecnologias.",
    "connection": "Uma VM pode ser armazenada num conjunto RAID e executar um contêiner dentro de seu sistema operacional. Isso demonstra que as tecnologias podem ser combinadas. Se o disco físico falha, a redundância pode manter o armazenamento; se um arquivo é apagado dentro da VM, RAID normalmente reproduz a exclusão e um backup pode ser necessário. E se um contêiner é reiniciado, os dados precisam estar em armazenamento persistente adequado para sobreviver à substituição de sua instância.",
    "exam": "A prova pode dizer que contêiner sempre carrega kernel próprio como VM; isso não representa o modelo usual de contêiner Linux. Também pode afirmar que RAID é substituto completo de backup — falso. Se um enunciado exige executar Windows e Linux com kernels distintos no mesmo host, VMs são uma alternativa mais apropriada que contêineres Linux tradicionais compartilhando kernel. Identifique qual recurso deve ser isolado e qual falha precisa ser tolerada.",
    "caseTitle": "Dois aplicativos precisam de ambientes diferentes",
    "caseSteps": [
      "Um servidor deve executar aplicação legada com sistema convidado distinto e serviço web leve que cabe em contêiner.",
      "Planeje VM para o sistema convidado e contêiner para aplicação que utiliza kernel compatível do host.",
      "Se ambos usam armazenamento RAID, isso ajuda a tolerar algumas falhas físicas, mas não recupera arquivo apagado por acidente.",
      "Inclua backup/restauração independente e teste; conclua que isolamento e recuperação não são sinônimos."
    ],
    "pitfalls": [
      "Contêiner Linux costuma compartilhar kernel do host; VM pode executar sistema convidado próprio.",
      "RAID não é backup de versões anteriores.",
      "VM e contêiner podem coexistir na mesma infraestrutura.",
      "Imagem de contêiner não é automaticamente armazenamento persistente de dados."
    ],
    "cards": [
      [
        "O que um hipervisor gerencia?",
        "Máquinas virtuais e seus recursos computacionais, permitindo execução de sistemas convidados."
      ],
      [
        "Qual diferença central entre VM e contêiner Linux?",
        "VM executa sistema operacional convidado; contêiner geralmente isola processos compartilhando kernel do host."
      ],
      [
        "O que RAID ajuda a resolver?",
        "Disponibilidade ou características de armazenamento frente a falhas específicas, conforme nível utilizado."
      ],
      [
        "Por que manter backup mesmo com VMs e RAID?",
        "Porque exclusões, corrupção e ataques podem afetar o armazenamento virtualizado e redundante."
      ]
    ]
  },
  {
    "id": 35,
    "title": "Processos, threads e escalonamento: quem recebe tempo de CPU?",
    "goal": "Diferenciar programa, processo, thread e o papel do escalonador do sistema operacional com exemplos de execução.",
    "context": "Você abre um navegador, um editor de texto e um sistema de atendimento. Os três parecem executar ao mesmo tempo, mas o processador possui quantidade limitada de núcleos e precisa distribuir tempo entre atividades. Um **programa** é o código armazenado; um **processo** é uma instância de execução com recursos e espaço de memória associado. Uma **thread** é um fluxo de execução dentro de um processo. Um programa pode usar várias threads para realizar atividades que precisam avançar sem bloquear tudo.",
    "explanation": "O **escalonador** do sistema operacional escolhe quais threads ou processos elegíveis recebem tempo de CPU. **Preempção** significa que o sistema pode interromper uma execução para permitir outra conforme regras de agendamento. A troca de contexto preserva informações necessárias para continuar execução posteriormente e tem custo: não ocorre de graça. Threads do mesmo processo normalmente compartilham parte da memória do processo, exigindo sincronização quando acessam recursos comuns; processos separados costumam possuir espaços de endereçamento distintos, dependendo do sistema.",
    "connection": "Isso se relaciona à **concorrência**, quando várias atividades progridem no mesmo intervalo, e ao **paralelismo**, quando trabalhos efetivamente executam ao mesmo tempo em recursos diferentes. Um computador de um núcleo pode executar concorrência por alternância, mas não executar duas instruções de CPU simultâneas nesse núcleo. Uma thread bloqueada aguardando arquivo ou rede pode permitir que outra avance. Já um processo que ocupa CPU continuamente pode competir por escalonamento com outros.",
    "exam": "A banca pode afirmar que cada thread possui todo o espaço de memória independente como se fosse processo distinto; no modelo usual threads compartilham memória do processo, embora tenham pilhas e estado de execução próprios. Outra confusão é dizer que concorrência exige múltiplos processadores. Não exige. Se uma tarefa fica em 'espera de I/O', ela aguarda entrada/saída e não está necessariamente consumindo CPU naquele instante.",
    "caseTitle": "O navegador continua respondendo enquanto um arquivo baixa",
    "caseSteps": [
      "O navegador realiza interface com usuário e transferência de rede em atividades que podem ser organizadas em threads/processos.",
      "Uma atividade aguarda recebimento de bytes pela rede; o sistema pode escalonar outras tarefas prontas.",
      "Quando o dado chega, a atividade acorda e disputa execução conforme escalonamento.",
      "Conclua que concorrência de tarefas e espera de I/O explicam responsividade sem exigir uma CPU exclusiva por download."
    ],
    "pitfalls": [
      "Programa em disco não é necessariamente processo em execução.",
      "Threads de um processo normalmente compartilham memória relevante.",
      "Concorrência não exige paralelismo físico simultâneo.",
      "Troca de contexto custa tempo e não aumenta infinitamente capacidade da CPU."
    ],
    "cards": [
      [
        "Qual é a diferença entre programa e processo?",
        "Programa é instrução armazenada; processo é instância executando com estado e recursos administrados."
      ],
      [
        "O que é thread?",
        "Fluxo de execução dentro de processo, normalmente compartilhando dados e recursos do processo."
      ],
      [
        "O que faz o escalonador?",
        "Decide qual atividade pronta recebe CPU segundo políticas e condições do sistema."
      ],
      [
        "Concorrência e paralelismo são sinônimos?",
        "Não. Concorrência é progresso intercalado de tarefas; paralelismo é execução simultânea em recursos adequados."
      ]
    ]
  },
  {
    "id": 36,
    "title": "Permissões Linux: por que ler, escrever e executar são diferentes?",
    "goal": "Interpretar dono, grupo, outros, bits rwx e mudanças de permissão sem decorar números isolados.",
    "context": "Um servidor Linux possui arquivos de configuração que todos podem consultar, mas só administradores devem alterar. O sistema precisa diferenciar **identidade do usuário** e **permissão sobre o arquivo**. Cada arquivo tem um dono e um grupo associados. As permissões Unix clássicas dividem acesso em três categorias: **dono (user)**, **grupo (group)** e **outros (others)**. Para cada categoria, os bits **r, w, x** indicam respectivamente leitura, gravação e execução, com significados específicos para arquivos e diretórios.",
    "explanation": "A permissão `rw-r-----` significa dono com leitura/escrita, grupo com leitura e outros sem essas permissões. Cada conjunto de três pode ser representado em octal: `r=4`, `w=2`, `x=1`. Assim `chmod 640 arquivo` aplica dono 6 (4+2), grupo 4 e outros 0. No diretório, o bit **x** permite percorrer/atravessar o caminho, enquanto **r** permite listar nomes conforme condições, e **w** participa da modificação de entradas com as permissões apropriadas. Por isso 'executar diretório' não significa rodar um programa guardado nele.",
    "connection": "O comando `chown` altera propriedade conforme privilégios; `chmod` altera bits de acesso. O comando `ls -l` mostra permissões clássicas e informações como dono e grupo. Alguns sistemas usam **ACLs** para regras mais detalhadas, além de bits rwx. E o **root** possui capacidades administrativas ampliadas, exigindo cautela: não resolva erro de acesso atribuindo `777` a tudo, porque isso pode permitir gravação por usuários que não deveriam alterar arquivos.",
    "exam": "Em questão que mostra `-rwxr-x---`, o dono tem 7, o grupo 5, e os demais 0; portanto o modo octal é 750. Se o enunciado fala em entrar num diretório, considere bit x no diretório e nos componentes do caminho. Se uma conta consegue fazer login mas não abrir o arquivo, não conclua falha de senha: autenticação e autorização de arquivo são etapas diferentes.",
    "caseTitle": "Interprete `-rwxr-x---` sem calcular no escuro",
    "caseSteps": [
      "Ignore o primeiro caractere por enquanto: ele informa o tipo de arquivo, não os nove bits de acesso.",
      "Separe `rwx | r-x | ---` em dono, grupo e outros.",
      "Converta cada trio: 4+2+1=7, 4+0+1=5, 0=0. O modo é 750.",
      "Conclua que dono lê/grava/executa, grupo lê/executa e outros não têm permissões clássicas."
    ],
    "pitfalls": [
      "rwx tem significado particular para diretórios, incluindo travessia pelo bit x.",
      "chmod 777 pode abrir acesso desnecessário para outros usuários.",
      "Login válido não garante permissão para qualquer arquivo.",
      "ACLs podem detalhar acesso além dos bits rwx tradicionais."
    ],
    "cards": [
      [
        "O que significa r,w,x em arquivo Linux?",
        "r permite leitura, w permite escrita e x permite execução, segundo categoria e outras regras de acesso."
      ],
      [
        "Qual é o modo octal de rwxr-x---?",
        "750: dono 7, grupo 5 e outros 0."
      ],
      [
        "O que significa x em um diretório?",
        "Permissão de percorrer o diretório no caminho, conforme as demais restrições."
      ],
      [
        "Por que chmod 777 é perigoso em arquivo sensível?",
        "Pode conceder leitura, escrita e execução a usuários fora do conjunto necessário."
      ]
    ]
  },
  {
    "id": 39,
    "title": "Hipervisores: como uma máquina física executa várias VMs",
    "goal": "Entender host, guest, hipervisor tipo 1 e tipo 2, recursos virtuais e limitações de isolamento.",
    "context": "Um servidor físico possui CPU, memória e discos. Uma empresa quer executar vários sistemas com versões e dependências diferentes, mas comprar um computador dedicado para cada um seria caro e difícil de administrar. A **virtualização por hipervisor** permite oferecer recursos virtuais a **máquinas virtuais**, cada qual executando seu **sistema operacional convidado (guest)**. O equipamento e ambiente que disponibilizam esses recursos constituem o **host**, ou hospedeiro.",
    "explanation": "Um hipervisor **tipo 1** atua diretamente sobre a infraestrutura física no modelo usual, com arquitetura especializada para hospedar VMs. Um **tipo 2** funciona sobre um sistema operacional hospedeiro existente, como um aplicativo de virtualização para uso de laboratório. Em ambos, cada VM enxerga dispositivos virtuais que são mapeados a CPU, memória, rede e armazenamento reais. O hipervisor precisa controlar distribuição desses recursos; alocar 32 GB em várias VMs não cria automaticamente 32 GB físicos extras.",
    "connection": "Virtualizar facilita isolamento e consolidação, mas cria dependências da infraestrutura compartilhada. Se o host falhar, várias VMs podem ser afetadas. **Snapshot** pode registrar determinado estado da VM, mas não é necessariamente backup independente. **Contêiner** costuma compartilhar kernel do host, enquanto VM possui sistema convidado próprio. E **P2V** (*Physical to Virtual*) é migração de sistema físico para máquina virtual, exigindo atenção a boot, drivers e compatibilidade.",
    "exam": "Se o enunciado disser que hipervisor tipo 2 não usa um sistema operacional hospedeiro, rejeite na definição usual. Se disser que VM é automaticamente imune a malware ou a falha de disco, também não: isolamento não equivale a proteção total. Pergunte sempre quais recursos são virtualizados e quais dependências físicas permanecem compartilhadas.",
    "caseTitle": "Três servidores físicos serão consolidados num host",
    "caseSteps": [
      "Liste CPU, RAM, disco, rede e sistemas operacionais dos três serviços a serem migrados.",
      "Verifique compatibilidade com hipervisor, dispositivos, drivers e requisitos de inicialização de cada sistema convidado.",
      "Planeje capacidade e recuperação do host; a consolidação concentra dependências e pode ampliar impacto de falha física.",
      "Teste cada VM, seus serviços e seus backups antes de concluir a migração."
    ],
    "pitfalls": [
      "Hipervisor virtualiza recursos, mas não aumenta capacidade física disponível.",
      "Tipo 1 e tipo 2 diferem pela arquitetura de execução no modelo didático usual.",
      "Snapshot não é automaticamente backup independente.",
      "Host compartilhado pode criar ponto comum de falha para várias VMs."
    ],
    "cards": [
      [
        "O que é sistema convidado numa VM?",
        "É o sistema operacional executado dentro da máquina virtual, usando hardware virtual fornecido pelo hipervisor."
      ],
      [
        "O que diferencia hipervisor tipo 1 de tipo 2?",
        "Tipo 1 opera diretamente sobre infraestrutura host no modelo comum; tipo 2 usa sistema operacional hospedeiro."
      ],
      [
        "O que é P2V?",
        "Migração de um sistema físico para execução em máquina virtual."
      ],
      [
        "Por que consolidar VMs aumenta exigência de planejamento do host?",
        "Porque múltiplos serviços passam a depender dos mesmos recursos físicos e mecanismos de recuperação."
      ]
    ]
  },
  {
    "id": 40,
    "title": "Docker e contêineres: imagens, instâncias e volumes",
    "goal": "Distinguir imagem, contêiner, Dockerfile, volume e rede, sem confundir contêiner com VM.",
    "context": "Um programa funciona no computador do desenvolvedor, mas falha no servidor porque faltam bibliotecas ou versões específicas. Contêineres ajudam a empacotar aplicativo e dependências de modo repetível, dentro de limites de isolamento do sistema operacional. Uma **imagem de contêiner** é o conjunto versionado de camadas que descreve sistema de arquivos e metadados de execução. Um **contêiner** é uma instância em execução dessa imagem. Não é a mesma coisa que uma VM completa: no Docker Linux usual, contêineres compartilham o kernel do host.",
    "explanation": "Um **Dockerfile** descreve etapas para construir uma imagem. O comando `docker build` cria a imagem; `docker run` pode iniciar um contêiner dela. Alterar arquivos dentro de uma instância efêmera não é estratégia adequada de persistência. Um **volume** permite armazenar dados fora da camada gravável temporária do contêiner e reanexá-los a instâncias futuras. A **rede de contêineres** conecta serviços conforme configuração; publicar uma porta relaciona uma porta do host à do serviço dentro do contêiner, com políticas de exposição que precisam ser avaliadas.",
    "connection": "Isso se liga a **CI/CD**, porque a mesma imagem pode ser validada e implantada em diferentes ambientes, reduzindo variação de dependências. Mas imagem reproduzível não garante banco de dados persistente ou backup. Também se conecta à segurança: não executar como root sem necessidade, limitar permissões, revisar imagens-base e segredos e não expor portas desnecessárias. Uma variável de ambiente com segredo também merece tratamento adequado, e não deve ser gravada no repositório público.",
    "exam": "Uma banca pode afirmar que remover contêiner sempre apaga seus volumes: volumes gerenciados podem sobreviver à instância, dependendo do comando e gerenciamento. Também pode confundir imagem e contêiner: imagem é modelo artefatual; contêiner é execução. Publicar uma porta não implica que serviço está saudável. O comando adequado depende se você quer **construir**, **executar**, **armazenar dados** ou **verificar logs**.",
    "caseTitle": "Atualizar uma aplicação Docker sem perder dados",
    "caseSteps": [
      "Uma API usa imagem versionada e banco com volume persistente configurado corretamente.",
      "Construa e teste a nova imagem; não armazene dados importantes só na camada temporária do contêiner.",
      "Substitua a instância da aplicação mantendo conexão e volume do banco, conforme projeto e migrações necessárias.",
      "Valide que a API iniciou e que o banco preservou registros; mantenha backup independente do volume."
    ],
    "pitfalls": [
      "Imagem é artefato; contêiner é instância de execução.",
      "Contêiner Linux tradicional não inicia kernel independente como VM completa.",
      "Volume persistente não é backup de dados por si só.",
      "Expor porta do host não garante que o serviço esteja saudável ou autorizado."
    ],
    "cards": [
      [
        "Qual diferença entre imagem e contêiner?",
        "Imagem é modelo versionado com conteúdo e configurações; contêiner é instância executada dela."
      ],
      [
        "Para que serve um volume Docker?",
        "Persistir dados separados da camada gravável efêmera do contêiner, conforme montagem e armazenamento."
      ],
      [
        "O que um Dockerfile define?",
        "Etapas e configurações usadas para construir uma imagem de contêiner."
      ],
      [
        "Por que contêiner não substitui backup?",
        "Porque persistência do volume não protege sozinha contra exclusão, corrupção ou ataque."
      ]
    ]
  },
  {
    "id": 42,
    "title": "IaaS, PaaS e SaaS: quem administra cada parte da nuvem?",
    "goal": "Explicar recursos de nuvem, responsabilidade compartilhada e diferenças entre infraestrutura, plataforma e software como serviço.",
    "context": "Uma organização quer usar um sistema sem comprar servidores locais. **Computação em nuvem** oferece recursos computacionais sob demanda conforme modelos de serviço, com cobrança e condições que dependem do fornecedor. Mas a palavra 'nuvem' não indica quem é responsável por configurar sistema operacional, atualizar bibliotecas ou conceder acesso a usuários. Os modelos **IaaS**, **PaaS** e **SaaS** ajudam a delimitar qual parte do ambiente o provedor oferece pronta e qual continua sob responsabilidade do cliente.",
    "explanation": "**IaaS** (*Infrastructure as a Service*) fornece recursos como máquinas virtuais, redes e armazenamento: o cliente normalmente administra sistema operacional e aplicações. **PaaS** (*Platform as a Service*) oferece plataforma gerenciada para executar aplicativos, abstraindo mais do sistema operacional e parte da operação. **SaaS** (*Software as a Service*) oferece a aplicação pronta para utilização por usuários, como serviço de e-mail corporativo. A fronteira exata varia por produto e contrato, mas a regra geral é que quanto mais alto o serviço, menos camadas técnicas de infraestrutura o cliente precisa administrar diretamente.",
    "connection": "Isso se relaciona à **responsabilidade compartilhada**: fornecedor e cliente possuem obrigações em partes diferentes. Mesmo em SaaS, cliente costuma continuar responsável por usuários, permissões, qualidade dos dados e configurações de acesso. PaaS não elimina responsabilidade pelo código da aplicação. E uma VM IaaS não dispensa backup, segurança nem atualização de sistema. Ao escolher serviço, considere continuidade, privacidade, custos e possibilidade de recuperar dados.",
    "exam": "Se a questão descreve 'você instala o próprio sistema operacional numa VM remota', o modelo mais próximo é **IaaS**. Se diz 'envia seu código e a plataforma gerencia execução', tende a **PaaS**. Se o usuário apenas usa o sistema pronto no navegador, tende a **SaaS**. Evite confundir nuvem pública, privada e híbrida — modelos de implantação — com IaaS/PaaS/SaaS, que são modelos de serviço.",
    "caseTitle": "Uma clínica precisa de sistema de chamados na nuvem",
    "caseSteps": [
      "Opção A: contratar VM e instalar o software — IaaS, com maior trabalho de sistema operacional e aplicação.",
      "Opção B: desenvolver sua aplicação e publicá-la numa plataforma gerenciada — PaaS, com responsabilidade pelo código.",
      "Opção C: contratar sistema de chamados pronto pela web — SaaS, com foco em usuários, dados e contrato.",
      "Compare requisitos de segurança, migração, backups e privacidade antes de escolher, além da facilidade inicial."
    ],
    "pitfalls": [
      "IaaS, PaaS e SaaS são modelos de serviço, não modelos de implantação.",
      "SaaS não elimina responsabilidade do cliente sobre usuários e dados.",
      "PaaS gerencia plataforma, mas cliente segue responsável por seu código conforme serviço.",
      "Nuvem não é sinônimo de segurança automática ou backup garantido sem contrato."
    ],
    "cards": [
      [
        "O que o cliente normalmente administra em IaaS?",
        "Sistema operacional, aplicações e configurações sobre recursos virtuais de infraestrutura fornecidos pelo provedor."
      ],
      [
        "O que caracteriza PaaS?",
        "Plataforma gerenciada para executar aplicações, abstraindo parte da operação da infraestrutura."
      ],
      [
        "O que caracteriza SaaS?",
        "Software fornecido pronto como serviço para utilização, com responsabilidades específicas de cliente e provedor."
      ],
      [
        "Mesmo em SaaS, quem deve revisar acesso de usuários?",
        "O cliente/organização conforme contrato e política, pois usuário e permissão permanecem sob sua governança."
      ]
    ]
  },
  {
    "id": 97,
    "title": "Active Directory, DNS e políticas de acesso: como o domínio funciona",
    "goal": "Relacionar autenticação, resolução de nomes, objetos de domínio, unidades organizacionais e permissões.",
    "context": "Uma empresa possui cinquenta computadores e quer administrar contas e políticas sem configurar tudo individualmente. O **Active Directory Domain Services (AD DS)** é serviço de diretório da Microsoft para organizar objetos e informações de identidade num **domínio**, estrutura de administração e autenticação. Um **controlador de domínio (DC)** fornece serviços essenciais de diretório. Mas o computador precisa localizar esses serviços na rede, o que frequentemente depende do **DNS**, sistema usado para localizar nomes e registros necessários.",
    "explanation": "Uma conta de usuário representa identidade. **Grupos** reúnem contas para facilitar atribuição de permissões. **OU** (*Organizational Unit*, unidade organizacional) organiza objetos, delegação e aplicação de políticas. Uma **GPO** (*Group Policy Object*) define configurações a serem aplicadas a usuários ou computadores dentro do escopo apropriado, observadas herança e filtros. **Kerberos** é mecanismo de autenticação por tickets usado no ambiente; **LDAP** é protocolo de acesso e consulta ao diretório. Cada termo responde a uma pergunta diferente: onde localizar? como autenticar? o que organizar? quais políticas aplicar?",
    "connection": "Uma GPO de configurações de computador vinculada à OU dos usuários pode não atingir as contas de computador que estão em outra OU. Da mesma forma, falha de DNS interno pode prejudicar descoberta de controlador de domínio mesmo que exista conectividade IP básica. **Permissões NTFS** do arquivo e permissões de compartilhamento também podem combinar regras de acesso distintas. Por isso um login bem-sucedido não demonstra que a política foi aplicada ou que um arquivo está autorizado.",
    "exam": "Se a prova disser que LDAP autentica por tickets no lugar de Kerberos, identifique a confusão entre consulta de diretório e autenticação. Se disser que GPO depende exclusivamente do nome da estação, rejeite: escopo, vínculo, herança e filtros importam. Se computadores não encontram DC, investigue primeiro DNS usado pelo cliente, conectividade e registros de serviços, evitando trocar senhas aleatoriamente.",
    "caseTitle": "Computadores não recebem política de bloqueio de tela",
    "caseSteps": [
      "O administrador vinculou GPO com configurações de computador na OU que contém somente contas de usuários.",
      "Confirme onde estão as contas de computador e o escopo da GPO: configuração de computador precisa atingir objetos apropriados.",
      "Verifique herança/filtros e atualização efetiva da política nas estações, além de conectividade ao domínio.",
      "Corrija vínculo/escopo e confirme política aplicada em estação de teste antes de expandir."
    ],
    "pitfalls": [
      "DNS interno é importante para localizar serviços do AD, não é apenas Internet.",
      "LDAP e Kerberos têm papéis diferentes no ambiente de diretório.",
      "GPO vinculada à OU errada pode não atingir computador desejado.",
      "Login válido não significa política aplicada nem acesso irrestrito aos arquivos."
    ],
    "cards": [
      [
        "Para que serve AD DS?",
        "Organizar identidades e objetos de domínio e fornecer serviços de diretório e autenticação centralizada."
      ],
      [
        "Por que DNS é importante no AD?",
        "Porque ajuda clientes a localizar controladores de domínio e serviços necessários."
      ],
      [
        "Qual a função da GPO?",
        "Definir configurações de usuários e computadores aplicáveis a escopo de objetos apropriado."
      ],
      [
        "Qual diferença entre LDAP e Kerberos?",
        "LDAP consulta/acessa diretórios; Kerberos fornece autenticação por tickets em ambientes compatíveis."
      ]
    ]
  },
  {
    "id": 98,
    "title": "Investigação Linux: processos, permissões, serviços e rede em sequência",
    "goal": "Montar um roteiro defensivo de diagnóstico de serviço Linux, distinguindo causa de sintoma.",
    "context": "Um serviço Linux falha e alguém sugere reiniciá-lo a cada minuto. Isso pode esconder mensagens importantes e impedir descobrir a causa. Precisamos distinguir **processo**, programa executando com recursos; **serviço**, função gerenciada em segundo plano; **permissão**, regra de acesso a arquivo ou recurso; e **log**, registro de eventos. Ferramentas como `systemctl`, `journalctl`, `ps` e `ss` respondem perguntas diferentes. O objetivo não é memorizar comandos indiscriminadamente, e sim escolher o que informa sobre o sintoma concreto.",
    "explanation": "Primeiro consulte **`systemctl status app.service`** para verificar estado da unidade em sistemas com systemd. Se a unidade falhou, use **`journalctl -u app.service`** para ler eventos associados. Se está ativa, mas a aplicação não responde, verifique portas em escuta com **`ss -ltn`** e teste a aplicação localmente. Se logs dizem 'permission denied', investigue dono/grupo/permissões dos caminhos; não conceda `chmod 777` como solução generalizada. Se processo está ativo, mas consome CPU/memória excessivas, ferramentas como `ps` e `top` ajudam a observar recursos.",
    "connection": "Uma resposta a ping não comprova serviço HTTP. Uma porta em escuta não comprova que a aplicação responde corretamente; talvez dependa de banco indisponível. E o fato de uma unidade estar 'enabled' para iniciar com o sistema não significa que esteja ativa agora. A investigação passa por estado, logs, porta, dependências e caminhos de rede, conectando sistemas operacionais, serviços e redes sem atribuir tudo ao mesmo componente.",
    "exam": "A banca pode perguntar qual comando consulta o **journal** da unidade, e a resposta é `journalctl -u`. Pode perguntar qual mostra sockets TCP em escuta, e a resposta é `ss -ltn`. Mas situações mais completas exigem interpretação: se o serviço falha por arquivo de configuração inválido, consultar logs e validar configuração é melhor que apagar arquivo indiscriminadamente. Explique sempre o **porquê** de cada ferramenta antes de usá-la.",
    "caseTitle": "app.service falha após alterar configuração",
    "caseSteps": [
      "Registre o horário da falha e execute `systemctl status app.service` para conhecer estado e erro inicial.",
      "Consulte `journalctl -u app.service` e procure mensagem específica, como configuração inválida ou permissão negada.",
      "Valide a configuração com ferramenta apropriada e, se necessário, verifique porta de escuta após correção.",
      "Reinicie controladamente e confirme resposta da aplicação; documente a causa identificada, não apenas a ação feita."
    ],
    "pitfalls": [
      "systemctl enable não equivale a iniciar serviço agora.",
      "journalctl lê eventos; não repara automaticamente o serviço.",
      "Porta aberta não prova que a aplicação está funcional.",
      "chmod 777 é uma correção insegura e geralmente inadequada para problema de permissão."
    ],
    "cards": [
      [
        "O que investiga systemctl status?",
        "O estado de uma unidade systemd, incluindo informação sobre início e falhas."
      ],
      [
        "O que faz journalctl -u nome.service?",
        "Consulta registros do journal associados à unidade, ajudando a explicar falhas."
      ],
      [
        "O que faz ss -ltn?",
        "Lista sockets TCP em estado de escuta, útil para verificar portas no host."
      ],
      [
        "Por que porta aberta não prova serviço saudável?",
        "Porque o processo pode aceitar conexão mas falhar no processamento ou depender de outro componente."
      ]
    ]
  },
  {
    "id": 99,
    "title": "VMs, contêineres, RAID e backup: planeje uma aplicação resiliente",
    "goal": "Combinar recursos de virtualização e armazenamento identificando quais falhas cada camada tolera.",
    "context": "Uma empresa quer colocar seu sistema num host com máquinas virtuais, contêineres para serviços auxiliares e armazenamento RAID. Parece uma arquitetura completa, mas há perguntas importantes: **onde os dados persistem? quem recupera após erro humano? e se o host inteiro parar?** VM fornece ambiente virtual com sistema convidado; contêiner isola processo e dependências; RAID trata características de armazenamento. **Resiliência** é capacidade de resistir, adaptar-se e recuperar-se de interrupções relevantes, que depende da arquitetura inteira, não de uma sigla.",
    "explanation": "Defina quais serviços precisam de VM completa e quais podem rodar em contêineres compatíveis. Garanta persistência dos dados em volumes apropriados e backups independentes. Um RAID 1 pode tolerar falha de disco do espelho; RAID 5 pode tolerar uma falha convencional no conjunto. Mas se o host que oferece CPU e rede sofre interrupção, várias VMs podem parar juntas. **Alta disponibilidade** pode exigir redundância de hosts, armazenamento ou serviços, conforme metas, e não simplesmente dois discos.",
    "connection": "Um **snapshot** pode registrar estado da VM em determinado instante, mas não é automaticamente cópia de segurança isolada. O backup precisa considerar consistência de bancos e restauração dos dados e da configuração do aplicativo. A **nuvem** também compartilha responsabilidades: um serviço gerenciado não garante recuperação dos arquivos se o cliente configurar retenção inadequada. Conecte cada decisão a **RTO/RPO**: quanto tempo até voltar e quanto dado pode ser perdido.",
    "exam": "Se a prova descrever RAID 5 e disser 'não precisa backup', está incorreto. Se descrever dois contêineres no mesmo host e afirmar que resistem automaticamente à falha de todo o host, também não. Se perguntar que solução isola sistemas operacionais distintos, considere VMs; se quer instâncias leves do mesmo ambiente kernel compatível, contêineres podem ser úteis. A escolha precisa partir da falha que se pretende tolerar.",
    "caseTitle": "O host virtualizado falhou e o backup estava no mesmo disco",
    "caseSteps": [
      "O host físico guarda VMs num RAID 1, mas os backups ficam no mesmo volume em pasta distinta.",
      "Se há falha apenas de um disco, o espelho pode ajudar; se o volume inteiro for corrompido ou apagado, o backup junto pode desaparecer.",
      "Planeje cópias independentes e restauração de VM, banco e dependências, testando em ambiente alternativo.",
      "Conclua que redundância de discos não é arquitetura completa de recuperação do serviço."
    ],
    "pitfalls": [
      "Redundância de disco não cobre falha de todo host.",
      "Dois contêineres no mesmo host não constituem alta disponibilidade frente à perda do host.",
      "Snapshots dependentes de armazenamento não substituem backups independentes.",
      "RTO e RPO precisam ser medidos por teste completo do serviço."
    ],
    "cards": [
      [
        "O que uma VM acrescenta à arquitetura?",
        "Ambiente virtual com sistema convidado e recursos definidos pelo hipervisor."
      ],
      [
        "Por que volumes em contêineres não bastam como backup?",
        "Porque persistência da instância não garante recuperação de exclusão, corrupção ou falha do armazenamento."
      ],
      [
        "Que falha RAID 1 pode tolerar num espelho de dois discos?",
        "A perda de um disco do espelho, se o outro estiver íntegro e o conjunto funcionar conforme esperado."
      ],
      [
        "Qual a principal dependência compartilhada de várias VMs num único host?",
        "O hardware e a operação do host físico que executa todas as VMs."
      ]
    ]
  },
  {
    "id": 125,
    "title": "Active Directory: OUs, grupos e GPO sem confundir organização e acesso",
    "goal": "Entender diferença entre OU, grupo de segurança e escopo de GPO usando uma equipe dividida em setores.",
    "context": "Uma instituição possui setores Recepção, Laboratório e Financeiro. O administrador precisa organizar computadores e usuários, aplicar configurações e conceder acesso a pastas. O **Active Directory** mantém objetos do domínio, mas três estruturas têm propósitos diferentes: **OU** agrupa objetos para organização, delegação e políticas; **grupo de segurança** reúne identidades para facilitar autorizações; **GPO** define configurações aplicadas a objetos conforme vínculo, herança e filtros. Colocar usuário numa OU não significa automaticamente conceder permissão NTFS a arquivos.",
    "explanation": "Imagine que contas de usuários da recepção estão na OU Recepção. O grupo `GG-Recepcao` pode receber autorização de leitura numa pasta específica; ser membro desse grupo ajuda a avaliar permissões. Uma **GPO** pode configurar bloqueio automático de tela para computadores em determinadas OUs. A política possui partes de **usuário** e de **computador**; seu efeito depende de qual objeto está no escopo e de outros critérios como filtros de segurança e herança. Não se aplica simplesmente pelo nome amigável do computador.",
    "connection": "Uma estação que não encontra controlador de domínio por DNS pode ter dificuldade de aplicar política. E um usuário pode estar no domínio e ainda não ter acesso a determinada pasta porque as permissões de **compartilhamento** e **NTFS** entram na avaliação. **Kerberos** participa da autenticação por tickets, mas não substitui a autorização do recurso. A distinção entre localização, identidade, grupo, política e permissão evita muitos diagnósticos equivocados.",
    "exam": "Se a prova disser que OU é o mesmo que grupo de segurança, está incorreto. Se pedir aplicar configuração de computador por GPO e os objetos de computadores estão em outra OU, o vínculo pode não atingir o alvo. Se a questão perguntar como dar acesso a pasta a vinte usuários sem configurar um por um, grupos apropriados são estratégia usual. Não conceda permissão apenas porque alguém pertence à 'OU Financeiro'.",
    "caseTitle": "GPO de computador vinculada à OU dos usuários",
    "caseSteps": [
      "O administrador quer aplicar protetor de tela a computadores, mas vincula GPO apenas à OU com contas de usuários.",
      "A configuração é de computador; confirme onde estão os objetos de computador e quais vínculos/filtros são aplicáveis.",
      "Associe política ao escopo correto e confira herança, filtros, processamento e atualização nas estações.",
      "Não confunda mudança de GPO com permissão NTFS: são mecanismos diferentes."
    ],
    "pitfalls": [
      "OU organiza objetos; grupo de segurança ajuda a atribuir permissões.",
      "GPO possui configuração de usuário e de computador e depende do escopo.",
      "Login no domínio não garante acesso a todos os compartilhamentos.",
      "DNS inadequado pode prejudicar localização de serviços de domínio."
    ],
    "cards": [
      [
        "Qual é a finalidade de uma OU no AD?",
        "Organizar objetos, permitir delegação e estruturar aplicação de políticas conforme escopo."
      ],
      [
        "Para que serve um grupo de segurança?",
        "Reunir identidades a fim de administrar autorizações sem atribuição individual repetitiva."
      ],
      [
        "Por que uma GPO pode não atingir um computador?",
        "Porque vínculo, localização do objeto, herança ou filtros não correspondem ao alvo."
      ],
      [
        "GPO e permissão NTFS são iguais?",
        "Não. GPO aplica configurações; NTFS controla acesso a arquivos e diretórios."
      ]
    ]
  },
  {
    "id": 126,
    "title": "Linux: permissões padrão, umask e ACL na prática",
    "goal": "Calcular como umask afeta arquivos novos e diferenciar bits rwx de regras ACL mais detalhadas.",
    "context": "Um administrador cria arquivos novos e percebe que alguns ficam acessíveis ao grupo enquanto outros não. Mesmo que ninguém tenha usado `chmod`, o sistema aplica **permissões iniciais**, influenciadas pela **umask**, uma máscara de bits que restringe permissões na criação. Antes de calcular, lembre o significado clássico de **r=ler**, **w=gravar** e **x=executar/atravessar**, para dono, grupo e outros. Os valores octais 4, 2 e 1 são maneiras de representar esses bits.",
    "explanation": "Na criação de arquivo regular, permissões máximas convencionais são frequentemente **666** (rw-rw-rw-, sem execução por padrão). Para diretórios, a base usual é **777** (rwx para as três classes). A **umask** remove bits permitidos: com umask `022`, arquivos normalmente nascem com **644** (rw-r--r--) e diretórios com **755** (rwxr-xr-x). É mais preciso pensar em operação sobre bits do que simplesmente subtração decimal, pois valores e permissões não funcionam como dinheiro. A `umask` não costuma adicionar um bit de execução que não estava presente na base de criação.",
    "connection": "Uma **ACL (Access Control List)** permite detalhar permissões para usuários e grupos específicos além da representação clássica dono/grupo/outros, conforme sistema de arquivos e ferramentas. Isso não elimina a análise dos bits de acesso nem a necessidade de autorização na aplicação. Para um serviço que precisa gravar arquivo, investigue permissões no próprio arquivo e nos diretórios do caminho; conceder `777` generalizado pode expor informações e não corrigir a raiz do problema.",
    "exam": "Se a prova informar `umask 027`, calcule permissões iniciais de arquivo: base 666 restringida por 027 resulta **640**; diretório base 777 restringida por 027 resulta **750**. O bit x do diretório permite atravessar caminho, mas não significa automaticamente que todos os arquivos nele são executáveis. Se a banca confundir `chown` com `chmod`, lembre: o primeiro altera propriedade; o segundo altera permissões tradicionais.",
    "caseTitle": "Calcule permissões com umask 027",
    "caseSteps": [
      "Arquivo regular parte, no caso convencional, de 666; o diretório parte de 777.",
      "A umask 027 restringe bits correspondentes a 0 para dono, 2 para grupo e 7 para outros.",
      "Arquivo fica 640 (rw-r-----); diretório fica 750 (rwxr-x---).",
      "Verifique se o dono e o grupo certos estão associados, pois o número de permissão não define sozinho quem pertence a cada classe."
    ],
    "pitfalls": [
      "Umask restringe permissões na criação; não costuma adicionar execução a arquivo comum.",
      "Arquivo e diretório têm bases convencionais diferentes: 666 e 777.",
      "chmod altera bits; chown altera dono/grupo, conforme permissões.",
      "ACLs podem acrescentar detalhes além das três classes rwx usuais."
    ],
    "cards": [
      [
        "O que é umask no Linux?",
        "Uma máscara de restrição de bits das permissões iniciais de arquivos e diretórios recém-criados."
      ],
      [
        "Com umask 022, qual modo usual de arquivo novo?",
        "644: dono lê/grava; grupo e outros leem, sem execução inicial por padrão."
      ],
      [
        "Com umask 027, qual modo usual de diretório novo?",
        "750: dono rwx, grupo r-x, outros sem acesso clássico."
      ],
      [
        "Qual diferença entre chmod e chown?",
        "chmod modifica permissões; chown altera propriedade de usuário/grupo conforme privilégios."
      ]
    ]
  },
  {
    "id": 127,
    "title": "Imagens de VM e contêiner: quando vale migrar ou reconstruir",
    "goal": "Comparar VM, snapshot, imagem de contêiner e artefato de implantação sem confundir persistência com réplica.",
    "context": "Uma equipe precisa migrar um aplicativo antigo e criar dez instâncias de um serviço web novo. No legado, dependências de sistema operacional são específicas; no serviço novo, o aplicativo pode usar a mesma base de execução em vários ambientes. Uma **VM** possui sistema operacional convidado e recursos virtuais; uma **imagem de contêiner** é um artefato que descreve camadas de sistema de arquivos e metadados, do qual instâncias podem ser iniciadas. Essas estratégias atendem necessidades de isolamento e distribuição diferentes.",
    "explanation": "Uma VM pode ser copiada, clonada ou gerenciada por modelos do hipervisor, com atenção a identidade, endereços e discos. Um contêiner é normalmente criado a partir de uma imagem imutável e configurações de execução; alterações feitas somente em sua camada efêmera podem desaparecer após substituição. **Volumes** separam dados persistentes da instância. O arquivo **Dockerfile** descreve como construir imagem. Em um pipeline, uma imagem com versão e testes pode ser distribuída de maneira repetível para diferentes hosts compatíveis.",
    "connection": "Um **snapshot** de VM registra estado conforme tecnologia, mas pode depender do armazenamento original e não ser backup independente. Uma **imagem de contêiner** guarda aplicação e dependências, mas normalmente não contém o banco produtivo atualizado. Isso conecta a implantação à **gestão de dados**: para recuperar de uma falha precisamos imagem, variáveis/configuração, segredos apropriados, banco e backups, não apenas o executável. A escolha também considera segurança e compatibilidade de kernel.",
    "exam": "A questão pode perguntar qual tecnologia inicia sistema convidado independente: VM. Pode perguntar qual permite múltiplas instâncias leves compartilhando kernel: contêiner usual. Não conclua que copiar imagem de contêiner equivale a copiar dados persistentes. E não confunda 'imagem' do Docker com 'imagem de disco da VM': ambas são artefatos, mas possuem finalidade e estrutura diferentes.",
    "caseTitle": "Atualizar o web app sem apagar o banco",
    "caseSteps": [
      "O aplicativo web roda em contêiner e o PostgreSQL usa volume persistente com política de backups.",
      "Construa e valide nova imagem do aplicativo, sem gravar dados de produção em camadas temporárias.",
      "Substitua instância do aplicativo preservando configuração/rota e sem destruir o volume de dados.",
      "Teste acesso e integridade das informações após atualização; tenha plano de rollback e restauração independente."
    ],
    "pitfalls": [
      "Imagem de contêiner não é cópia de dados produtivos por si.",
      "Snapshot dependente de armazenamento não substitui backup externo.",
      "VM e contêiner diferem pelo isolamento e sistema operacional.",
      "Instância efêmera não é local seguro para dados sem persistência planejada."
    ],
    "cards": [
      [
        "O que contém uma imagem de contêiner?",
        "Camadas de arquivos e metadados de execução usados para criar instâncias compatíveis."
      ],
      [
        "Qual componente deve guardar dados persistentes de contêiner?",
        "Volume ou armazenamento externo apropriado, com backup e política de recuperação."
      ],
      [
        "O que distingue imagem de contêiner de snapshot de VM?",
        "Imagem distribui aplicativo/ambiente; snapshot registra determinado estado de VM conforme tecnologia."
      ],
      [
        "Por que recuperar aplicação exige mais que reconstruir a imagem?",
        "Porque também são necessários dados, configuração, dependências, credenciais e verificações de integridade."
      ]
    ]
  },
  {
    "id": 128,
    "title": "RAID, snapshots e backup: teste qual falha cada um suporta",
    "goal": "Distinguir espelhamento, paridade, snapshot e cópia de recuperação com um plano baseado em cenários.",
    "context": "Um administrador diz 'temos RAID e snapshot, então nunca perderemos dados'. Essa afirmação mistura controles que cobrem falhas diferentes. **RAID** distribui dados por discos para propriedades como redundância ou desempenho. **Snapshot** registra o estado de determinado volume ou máquina num ponto no tempo, com dependências que variam por tecnologia. **Backup** é uma cópia para recuperar informações ou sistemas após perdas. A pergunta correta é: qual evento pretendemos enfrentar — disco queimado, exclusão, corrupção, ataque ou destruição do servidor?",
    "explanation": "RAID 1 mantém espelho; RAID 5 usa paridade distribuída e normalmente tolera uma falha de disco. **Rebuild** reconstrói informações após substituição do componente. Snapshot pode permitir retorno rápido a um estado anterior, mas se depende do mesmo volume, sua perda pode acompanhar o armazenamento original. Backup independente precisa ser protegido e testado. Uma cópia não é adequada apenas porque existe: avalie integridade, versões, retenção, possibilidade de restauração e tempo necessário.",
    "connection": "Isso se relaciona a **continuidade**: redundância pode melhorar disponibilidade; backup ajuda recuperar após perda de dados; snapshots podem facilitar certos rollbacks. Em ataque ransomware, o invasor pode alcançar snapshots locais ou backups online com credenciais comprometidas; isolamento e imutabilidade são medidas importantes conforme risco. Em aplicações com banco de dados, a cópia deve considerar consistência das transações; restaurar arquivos de banco inconsistentes pode falhar mesmo que a cópia do arquivo tenha sido feita.",
    "exam": "Se a prova pergunta qual recurso permite sobreviver à falha de um disco em RAID 1, a resposta é o espelhamento. Se pergunta como recuperar pasta excluída ontem, RAID não ajuda sozinho; precisamos de versão anterior, backup ou snapshot válido conforme projeto. Se pergunta tolerância a duas falhas, RAID 5 convencional não a oferece. Não atribua 'backup completo' a qualquer snapshot sem conhecer suas dependências.",
    "caseTitle": "Três eventos, três respostas de proteção",
    "caseSteps": [
      "Falha de um disco em RAID 1: o espelho íntegro pode permitir continuar operando até substituição e rebuild.",
      "Exclusão acidental de pasta: busque versão anterior restaurável via backup/snapshot apropriado; RAID replica a exclusão.",
      "Ataque que compromete credenciais administrativas: proteja cópias independentes/imóveis e investigue antes de restaurar.",
      "Conclusão: não existe um controle universal, e cada estratégia deve ser testada para seu cenário."
    ],
    "pitfalls": [
      "RAID melhora tolerância a falhas específicas de disco, não fornece versão histórica de arquivo.",
      "Snapshot pode depender do armazenamento original e não ser backup independente.",
      "Backup não testado não comprova recuperação possível.",
      "RAID 5 convencional tolera uma falha de disco, não duas simultâneas."
    ],
    "cards": [
      [
        "Para que RAID 1 serve no caso de disco falho?",
        "Para manter cópia espelhada que pode permitir funcionamento após a perda de um disco do conjunto."
      ],
      [
        "Por que snapshot não é sempre backup?",
        "Porque pode depender do volume original e não proteger contra a perda do próprio armazenamento."
      ],
      [
        "Qual mecanismo é mais adequado a recuperar arquivo apagado ontem?",
        "Backup ou versão anterior/snapshot restaurável, conforme a estratégia de proteção adotada."
      ],
      [
        "Por que backup deve ser isolado de credenciais do ambiente?",
        "Para reduzir risco de alteração ou exclusão das cópias durante comprometimento do sistema principal."
      ]
    ]
  },
  {
    "id": 156,
    "title": "Oficina de AD: diferencie erro de DNS, GPO e autorização",
    "goal": "Diagnosticar estações de domínio a partir de sintomas com testes específicos, sem atribuir tudo a GPO.",
    "context": "Um grupo de computadores ingressados no domínio não recebe política de bloqueio de tela. Alguns usuários também relatam falha ao abrir pasta compartilhada. Embora ambos os sintomas envolvam Active Directory, podem ter causas diferentes. **GPO** aplica configurações conforme vínculo e escopo. **DNS** ajuda estações a localizar serviços de domínio. **Permissões NTFS e de compartilhamento** controlam acesso a arquivos. Um diagnóstico eficaz evita misturar essas funções e começa identificando **qual ação concreta falhou**.",
    "explanation": "Para GPO, verifique onde estão os objetos de computador, vínculo da política, herança, filtros e processamento efetivo, usando ferramentas de resultado de política no ambiente Windows, como `gpresult`. Para localização do domínio, confirme DNS interno configurado e conectividade ao controlador de domínio. Para pasta, compare conta/grupos, permissões de compartilhamento e NTFS, pois autenticar não concede acesso automaticamente. Documente escopo: todas as estações, uma OU ou apenas uma conta? Essa diferença estreita hipóteses.",
    "connection": "Uma estação pode acessar Internet pelo gateway e ainda não localizar o DC se estiver usando DNS público. Uma conta pode autenticar por Kerberos, mas ter permissão negada numa pasta. E uma GPO de computador vinculada à OU de usuário pode não atingir máquinas desejadas. Portanto cada camada tem seu critério: rede/nome, identidade, política e autorização. Essa sequência previne alterar o firewall do servidor sem evidência.",
    "exam": "Bancas gostam de sugerir 'reinstalar o Windows' para qualquer GPO que não aplica. Isso ignora investigação de escopo. Se o erro é 'Acesso negado' em pasta com login válido, avalie permissões antes de mexer no DNS. Se o computador não encontra controlador de domínio, confira registros DNS e conectividade. O comando ou ferramenta correta deve se relacionar à **hipótese** testada, não à palavra que parece técnica.",
    "caseTitle": "GPO não aplica, mas o usuário consegue autenticar",
    "caseSteps": [
      "Confirme qual configuração esperada não aparece e a quais contas de computador ela se destina.",
      "Verifique OU dos computadores, vínculo da GPO, herança e filtros; use resultado de políticas para observar aplicação real.",
      "Se houver falhas de localização, confira DNS interno e acesso aos serviços do controlador de domínio.",
      "Ajuste apenas escopo/causa identificada e teste em estação representativa antes de aplicar de maneira ampla."
    ],
    "pitfalls": [
      "GPO não aplicada não exige automaticamente reinstalação do Windows.",
      "Login válido não comprova permissão em compartilhamento.",
      "DNS público pode não conhecer registros internos usados pelo domínio.",
      "gpresult ajuda a observar políticas resultantes, não concede permissão por si."
    ],
    "cards": [
      [
        "O que uma falha de GPO pode indicar?",
        "Escopo, vínculo, herança, filtros ou processamento inadequado para o objeto desejado."
      ],
      [
        "Por que DNS interno importa para ingresso e operação no domínio?",
        "Porque serviços de domínio podem ser localizados por registros específicos não conhecidos por DNS público."
      ],
      [
        "O que investigar num 'Acesso negado' a arquivo com login válido?",
        "Grupos e permissões de compartilhamento/NTFS efetivas sobre o recurso."
      ],
      [
        "Qual o benefício de usar gpresult?",
        "Observar políticas resultantes para investigar por que determinada configuração foi ou não aplicada."
      ]
    ]
  },
  {
    "id": 157,
    "title": "Oficina Linux: encontre a causa antes de reiniciar serviços",
    "goal": "Executar um roteiro de leitura de logs, permissões e sockets para explicar falhas repetitivas.",
    "context": "Uma aplicação Linux parou de iniciar após atualização. O técnico tenta reiniciar várias vezes, mas cada tentativa produz o mesmo erro. O primeiro passo é parar de adivinhar e coletar **evidências**: qual unidade do systemd falha, quando e com qual mensagem? **Serviço** é uma função gerenciada por processos; **log** é um registro do comportamento do software. Saber a diferença permite investigar sem alterar permissões ou apagar configuração às cegas.",
    "explanation": "Use `systemctl status app.service` para consultar estado e mensagens recentes. Depois `journalctl -u app.service` para consultar registros detalhados. Se aparecem erros de leitura de arquivo, investigue dono, grupo e permissões com `ls -l` e caminho de diretórios. Se o serviço está ativo, mas não recebe conexões, confira portas de escuta com `ss -ltn` e teste localmente o endpoint. Se depende de banco remoto, verifique nome, rota, porta e credenciais da dependência, conforme sintomas.",
    "connection": "Muitas ferramentas respondem a perguntas diferentes: `systemctl enable` define inicialização automática, não significa 'start agora'; `journalctl` exibe registros, não reinicia; `ss` mostra sockets, não prova que o programa atende corretamente. O erro de aplicação pode ocorrer mesmo com ping funcionando. E dar `chmod 777` a todos os arquivos pode mascarar a causa e criar vulnerabilidade, por isso examine as permissões específicas necessárias ao serviço.",
    "exam": "A prova pode oferecer ações como 'reiniciar roteador', 'limpar todos os logs', 'conceder permissões globais' e 'ler a mensagem de erro da unidade'. Em ambiente controlado, a última é geralmente a decisão mais informativa quando houve falha após alteração local. Caso o enunciado pergunte por porta TCP em escuta, `ss -ltn` ajuda; mas se pedir **erro de inicialização**, priorize estado e journal. Não confunda ausência de processo com bloqueio de rede.",
    "caseTitle": "O serviço falha porque não consegue ler um arquivo",
    "caseSteps": [
      "`systemctl status` mostra `failed`, enquanto o journal indica `Permission denied` em arquivo de configuração.",
      "Verifique propriedade e permissões do arquivo e dos diretórios, identificando a conta de execução do serviço.",
      "Corrija o acesso específico necessário, preservando o menor privilégio, e valide sintaxe de configuração.",
      "Inicie a unidade controladamente e confirme serviço e logs, registrando a causa em vez de somente 'reiniciado'."
    ],
    "pitfalls": [
      "Reiniciar serviço repetidamente não substitui analisar o erro.",
      "journalctl consulta registros; não conserta configuração sozinho.",
      "chmod 777 em produção pode criar acesso indevido desnecessário.",
      "Ping ou porta em escuta não provam que a aplicação executa suas funções."
    ],
    "cards": [
      [
        "Qual é o primeiro comando útil para serviço systemd que falha?",
        "systemctl status nome.service, para observar estado e pistas do erro."
      ],
      [
        "Qual ferramenta consulta logs da unidade?",
        "journalctl -u nome.service, que lê registros associados ao serviço."
      ],
      [
        "O que verificar após erro Permission denied?",
        "Conta de execução, dono/grupo e permissões efetivas dos arquivos e diretórios do caminho."
      ],
      [
        "Quando usar ss -ltn?",
        "Para verificar quais portas TCP estão em escuta no host, sem concluir automaticamente saúde da aplicação."
      ]
    ]
  }
] satisfies EditorialSeed[])
