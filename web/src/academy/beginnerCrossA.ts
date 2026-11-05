import type {PedagogicalLesson} from './intro1'
/** Primeiras aulas sem pré-requisitos: definir, explicar a necessidade, mostrar a conexão e resolver um caso. */
export const beginnerCrossA:Record<number,Partial<PedagogicalLesson>>={
  "4": {
    "id": 4,
    "title": "Segurança da informação: o que estamos protegendo e contra o quê?",
    "goal": "Entender o significado de informação, confidencialidade, integridade, disponibilidade, risco, ameaça, vulnerabilidade e controle antes de decorar a tríade CID.",
    "steps": [
      {
        "title": "1. Antes de falar em ataques: o que é uma informação importante?",
        "body": "Imagine um sistema que guarda resultados de exames. Nele existem dados como nome do paciente, data, imagem e laudo. Quando esses dados possuem significado e são utilizados para tomar decisões, fazem parte das **informações** que a organização precisa proteger.\n\nSegurança da informação não significa apenas instalar antivírus. Significa impedir que informações sejam acessadas indevidamente, alteradas sem autorização ou fiquem indisponíveis quando alguém depende delas. Uma pane elétrica pode comprometer a segurança mesmo sem existir um invasor: se o sistema parar num momento crítico, a informação deixou de estar disponível.\n\nPara estudar o assunto, não comece perguntando 'qual programa de segurança devo usar?', mas **'o que aconteceria se esta informação fosse vista, modificada ou perdida?'**. Essa pergunta nos leva a três propriedades fundamentais."
      },
      {
        "title": "2. Confidencialidade, integridade e disponibilidade: três problemas diferentes",
        "body": "**Confidencialidade** é a propriedade de manter a informação acessível apenas a quem tem permissão. Se um funcionário sem autorização abre o laudo de um paciente, há problema de confidencialidade. Pense em um envelope que só as pessoas certas podem abrir.\n\n**Integridade** significa que a informação deve permanecer correta e não sofrer mudanças indevidas. Se a dosagem de um medicamento num prontuário for alterada incorretamente, a informação perdeu integridade, mesmo que ninguém de fora tenha conseguido vê-la. Aqui o problema não é segredo: é **confiar que o conteúdo não foi adulterado**.\n\n**Disponibilidade** significa que a informação ou o serviço deve poder ser utilizado quando necessário. Se um servidor trava, ninguém consegue consultar exames e o atendimento para, há um problema de disponibilidade. A sigla **CID** reúne Confidencialidade, Integridade e Disponibilidade. Um incidente pode afetar uma, duas ou as três propriedades ao mesmo tempo."
      },
      {
        "title": "3. Ameaça, vulnerabilidade e risco: por que não são sinônimos?",
        "body": "Agora pense em uma porta de sala que precisa proteger documentos. **Ameaça** é algo capaz de causar dano, como uma pessoa não autorizada tentando entrar ou um incêndio. **Vulnerabilidade** é uma fragilidade que facilita ou amplia esse dano, como a fechadura quebrada ou ausência de proteção contra fogo. **Risco** está relacionado à possibilidade de um evento prejudicar objetivos e às suas consequências.\n\nNa tecnologia, a ameaça pode ser um ataque de ransomware; a vulnerabilidade pode ser um software desatualizado, uma senha compartilhada ou cópia de segurança que nunca foi testada. O risco envolve avaliar quanto isso poderia atingir a organização e como ela lida com essa incerteza.\n\nUm **ativo** é algo que tem valor e precisa ser protegido: banco de dados, servidor, imagem de exame, processo de atendimento ou conhecimento de uma equipe. Sem entender o ativo e o impacto da perda, fica difícil decidir qual medida vale a pena adotar."
      },
      {
        "title": "4. Controle: o que fazemos para reduzir o risco?",
        "body": "Um **controle de segurança** é uma medida que busca modificar o risco ou proteger objetivos. Pode ser técnico, como exigir autenticação em duas etapas; organizacional, como definir quem aprova acessos; ou físico, como restringir entrada na sala dos servidores.\n\n**Autenticação** é confirmar que uma pessoa ou sistema é quem diz ser — por exemplo, verificar senha e um segundo fator. **Autorização** é decidir o que a identidade já reconhecida pode fazer — por exemplo, consultar seu próprio setor, mas não todos os prontuários. A pessoa pode ter feito login corretamente e ainda assim não ter permissão para determinada tela.\n\n**Backup** é uma cópia de dados feita para permitir recuperação. Ele pode ajudar na disponibilidade e na recuperação após incidentes, mas não corrige sozinho todo vazamento de confidencialidade. Por isso cada controle deve ser relacionado ao problema que realmente ajuda a resolver."
      }
    ],
    "worked": {
      "title": "Caso resolvido: um laudo ficou visível para alguém sem permissão",
      "body": "**Situação:** um sistema permite que qualquer funcionário com senha válida abra todos os laudos, independentemente da função exercida.\n\n**Passo 1 — Identifique o ativo.** O laudo de um paciente e suas informações médicas têm valor e exigem proteção.\n\n**Passo 2 — Descubra o que está em risco.** Uma pessoa pode visualizar dados que não deveria. O objetivo comprometido é principalmente **confidencialidade**.\n\n**Passo 3 — Separe autenticação e autorização.** O sistema sabe quem é o funcionário porque a senha foi validada. O problema está em permitir acesso excessivo, isto é, **autorização inadequada**.\n\n**Passo 4 — Proponha medida coerente.** Rever perfis, conceder permissões apenas necessárias à função e registrar acessos são medidas possíveis. Não adianta apenas trocar o cabo ou instalar mais memória.\n\n**Conclusão:** o raciocínio parte do impacto, encontra a falha e escolhe o controle pertinente. Essa compreensão vale mais do que decorar 'CID'."
    },
    "pitfalls": [
      "Um serviço pode perder disponibilidade sem sofrer ataque de criminosos.",
      "Confidencialidade trata acesso indevido; integridade, alterações indevidas; disponibilidade, acesso quando necessário.",
      "Ameaça é fonte de dano; vulnerabilidade é uma fraqueza; risco envolve consequências para os objetivos.",
      "Login bem-sucedido não garante permissão para acessar todos os dados."
    ],
    "review": [
      {
        "ask": "Um laudo foi alterado sem autorização. Qual propriedade foi comprometida?",
        "answer": "Integridade, porque o conteúdo foi modificado indevidamente."
      },
      {
        "ask": "O servidor caiu e ninguém consegue consultar exames. Qual propriedade?",
        "answer": "Disponibilidade, porque o serviço deixou de estar acessível às pessoas quando elas precisavam consultar os exames."
      },
      {
        "ask": "Qual a diferença entre ameaça e vulnerabilidade?",
        "answer": "Ameaça é fonte potencial de dano; vulnerabilidade é uma fraqueza que pode favorecer o dano."
      },
      {
        "ask": "Por que autenticação e autorização são controles diferentes?",
        "answer": "Autenticação verifica a identidade; autorização define o que ela pode fazer."
      }
    ],
    "extra": ""
  },
  "6": {
    "id": 6,
    "title": "Windows e Linux: como um sistema operacional administra o computador",
    "goal": "Entender, do zero, o que é sistema operacional, processo, serviço, usuário, permissão e log antes de aprender comandos de administração.",
    "steps": [
      {
        "title": "1. O que acontece entre apertar o botão e abrir um programa?",
        "body": "Quando você liga um computador, o equipamento possui componentes físicos, como processador, memória e disco. Mas um programa não pode simplesmente disputar todos esses componentes sem organização. O **sistema operacional** é o software que gerencia esses recursos e oferece serviços para outros programas funcionarem.\n\nO **Windows** e o **Linux** são exemplos de sistemas operacionais. Eles cuidam de tarefas como iniciar programas, controlar arquivos, gerenciar memória, permitir conexão de dispositivos e definir quais usuários podem acessar determinados recursos.\n\nÉ importante distinguir **hardware**, que é a parte física (disco, memória, placa de rede), de **software**, que é o conjunto de instruções executadas. Essa diferença será útil quando um concurso perguntar se um problema tem origem em recurso físico ou em configuração do sistema."
      },
      {
        "title": "2. Programa, processo e serviço: qual diferença faz na prática?",
        "body": "Um **programa** é o conjunto de instruções armazenado, como um navegador instalado. Quando você abre esse programa e ele começa a executar, temos um **processo**, isto é, uma instância de execução que utiliza recursos e possui estado próprio. O mesmo programa pode ter vários processos.\n\nUm **serviço** é um software responsável por alguma atividade de apoio, frequentemente executado em segundo plano. Imagine um serviço que recebe pedidos de impressão ou outro que oferece uma página web. Mesmo sem ninguém olhando para uma janela, esse processo pode estar trabalhando.\n\nNo Linux, distribuições com **systemd** usam unidades para gerenciar serviços. O comando `systemctl status nome.service` ajuda a ver se uma unidade está ativa. No Windows, é possível consultar serviços pela ferramenta de gerenciamento de Serviços. **Ativo** não é a mesma coisa que **funcionando corretamente para o usuário**: um serviço pode estar rodando, mas incapaz de acessar seu banco de dados."
      },
      {
        "title": "3. Usuário, grupo e permissão: quem pode fazer o quê?",
        "body": "Quando várias pessoas usam um computador ou servidor, o sistema precisa distinguir **identidades**. Uma **conta de usuário** representa uma identidade para autenticação e controle de acesso. Um **grupo** reúne contas para facilitar a atribuição de permissões. Em vez de conceder acesso individual a cinquenta pessoas, o administrador pode utilizar um grupo apropriado.\n\nUma **permissão** descreve uma ação autorizada, como **ler**, **gravar** ou **executar** um arquivo. No Linux, as permissões clássicas aparecem como `r`, `w` e `x`, aplicadas ao dono, ao grupo e aos demais. Por exemplo, `rw-r-----` significa que o dono pode ler/gravar, o grupo pode ler e os demais não recebem essas permissões clássicas.\n\nNo Windows, o sistema de arquivos **NTFS** também possui controles de acesso. O ponto central é compreender que **ter uma senha válida** não significa automaticamente **poder alterar qualquer arquivo**. Uma coisa é provar a identidade; outra é receber autorização."
      },
      {
        "title": "4. Logs: onde procurar quando algo falha?",
        "body": "Se um serviço para de funcionar, descobrir a causa por tentativa e erro pode ser perigoso. Um **log** é um registro de acontecimentos: horário em que algo iniciou, falhou, recebeu uma tentativa de conexão ou apresentou determinada mensagem. Logs funcionam como um diário técnico do sistema.\n\nNo Windows, o **Visualizador de Eventos** permite consultar registros relevantes. Em vários sistemas Linux que usam systemd, `journalctl` permite visualizar eventos do journal; por exemplo, `journalctl -u nome.service` mostra registros associados a uma unidade.\n\nUm diagnóstico organizado começa com uma pergunta concreta: **o serviço iniciou?** Se não, procure a mensagem de erro. **Iniciou, mas não responde?** Verifique se está ouvindo na porta esperada, se a rede chega até ele e se suas dependências estão disponíveis. Essa sequência ajuda a entender os comandos antes de memorizá-los."
      }
    ],
    "worked": {
      "title": "Caso resolvido: o serviço está instalado, mas o site não abre",
      "body": "**Situação:** num servidor Linux, o serviço de uma aplicação está instalado, mas os usuários não conseguem acessar o site.\n\n**Passo 1 — Separe instalação de execução.** Um programa instalado significa apenas que seus arquivos estão disponíveis. Pode não haver processo ativo.\n\n**Passo 2 — Verifique o serviço.** `systemctl status` pode mostrar se a unidade está ativa, inativa ou falhou.\n\n**Passo 3 — Procure o motivo.** Se o estado indicar falha, use o log da unidade com `journalctl -u` para procurar mensagens, como arquivo ausente ou permissão negada.\n\n**Passo 4 — Se estiver ativo**, investigue conexão de rede, porta e dependências. A mensagem 'ativo' não prova que o navegador receberá a resposta correta.\n\n**Conclusão:** programa, processo, serviço e log são conceitos relacionados, mas diferentes. Entendê-los evita executar comandos aleatórios."
    },
    "pitfalls": [
      "Programa instalado não significa processo em execução.",
      "Um serviço 'ativo' pode depender de outro recurso que esteja indisponível.",
      "Permissão de leitura é diferente de permissão de escrita ou execução.",
      "Log é registro para investigação; não é um comando de reparação automática."
    ],
    "review": [
      {
        "ask": "Qual é a diferença entre programa e processo?",
        "answer": "Programa é o conjunto de instruções armazenado; processo é uma instância em execução."
      },
      {
        "ask": "Para que serve um serviço?",
        "answer": "Executar uma função de apoio ou de atendimento, geralmente em segundo plano."
      },
      {
        "ask": "O que um grupo de usuários ajuda a fazer?",
        "answer": "Administrar permissões compartilhadas sem configurar cada conta isoladamente."
      },
      {
        "ask": "O que um log contém e para que é útil?",
        "answer": "Registros de eventos, falhas e atividades, úteis para descobrir o que aconteceu."
      }
    ],
    "extra": ""
  },
  "8": {
    "id": 8,
    "title": "Interpretação de textos: aprender a encontrar a resposta no que foi escrito",
    "goal": "Diferenciar assunto, ideia central, afirmação explícita e inferência por meio de um pequeno texto resolvido passo a passo.",
    "steps": [
      {
        "title": "1. Ler uma questão é investigar, não adivinhar",
        "body": "Imagine uma questão sobre uma notícia. Você já conhece o tema, então escolhe a resposta que parece mais lógica. Mas o texto não afirma aquilo. Em concursos, esse é um erro comum: trocar a informação disponível pelaquilo que **poderia ser verdade no mundo real**.\n\nChamamos de **informação explícita** o que o texto realmente afirma. Uma **inferência** é uma conclusão obtida a partir dessas informações, sem inventar um fato novo. **Compreensão** costuma cobrar reconhecimento do que está escrito; **interpretação** pode exigir relacionar ideias e perceber consequências sustentadas pelo texto.\n\nO primeiro hábito útil é perguntar: **qual parte do texto demonstra a minha resposta?** Se você não consegue apontar uma frase, uma relação ou um sinal linguístico, talvez esteja apenas supondo."
      },
      {
        "title": "2. Tema, ideia central e argumento não são a mesma coisa",
        "body": "**Tema** é o assunto geral. Por exemplo, um texto pode falar sobre **trabalho remoto**. A **ideia central** é o principal recado desenvolvido a respeito do tema: 'o trabalho remoto exige regras claras para comunicação e avaliação'. Um **argumento** é uma razão utilizada para sustentar essa ideia, como 'a ausência de combinados pode gerar desencontros na equipe'.\n\nObserve que 'trabalho remoto' é muito amplo para expressar a ideia central. Se uma questão perguntar qual tese o autor defende, responder apenas 'o texto trata de tecnologia' não resolve. Precisamos dizer **o que ele afirma sobre a tecnologia**.\n\nUma boa técnica é terminar a leitura dizendo: 'O texto fala sobre X e sustenta que Y, porque Z'. Essa frase conecta assunto, posição e justificativa sem exigir linguagem acadêmica."
      },
      {
        "title": "3. Uma palavra pequena pode mudar uma afirmação inteira",
        "body": "Leia: **'Alguns servidores foram atualizados.'** Isso significa que existe pelo menos um servidor atualizado. Não permite concluir que **todos** foram atualizados. Da mesma forma, **'pode causar falha'** indica possibilidade; **'causa falha em todos os casos'** indica certeza universal. A segunda informação é muito mais forte.\n\nSão palavras importantes em provas: **todos, alguns, nenhum, sempre, nunca, apenas, principalmente, possivelmente**. Elas delimitam o alcance do que o autor diz. A banca pode inserir uma alternativa quase igual ao texto e trocar apenas **alguns** por **todos**.\n\nNão é necessário decorar uma lista sem entender seu efeito. Pergunte: a alternativa falou de **mais casos**, **menos casos** ou fez uma afirmação **mais absoluta** do que o texto permite?"
      },
      {
        "title": "4. Conectivos explicam a relação entre as ideias",
        "body": "Observe: **'A equipe conferiu o sistema, mas o erro continuou.'** A palavra **mas** cria uma relação de oposição ou contraste com a expectativa: apesar da conferência, o erro não desapareceu. Agora compare: **'A equipe conferiu o sistema porque houve uma falha.'** O **porque** apresenta uma causa ou justificativa.\n\nOutros conectivos comuns incluem **portanto** (conclusão), **embora** (concessão) e **se** (condição). Eles não são enfeites da frase: mostram **como uma informação se relaciona à outra**.\n\nQuando uma questão pergunta se determinada reescrita mantém o sentido, verifique não somente as palavras principais, mas também se a relação de causa, oposição, condição ou conclusão foi preservada."
      }
    ],
    "worked": {
      "title": "Questão resolvida com apoio textual",
      "body": "**Texto:** 'A implantação de um sistema reduziu o tempo de cadastro em duas unidades. Entretanto, os resultados ainda dependem do treinamento dos funcionários.'\n\n**Pergunta:** 'Pode-se afirmar que a implantação eliminou qualquer dificuldade operacional?'\n\n**Passo 1 — Encontre a informação explícita.** O texto afirma que o sistema **reduziu o tempo de cadastro** em duas unidades. Isso representa melhora, mas não eliminação de todos os problemas.\n\n**Passo 2 — Observe o conectivo.** 'Entretanto' introduz uma ressalva: os resultados **ainda dependem de treinamento**.\n\n**Passo 3 — Compare a alternativa.** 'Eliminou qualquer dificuldade' é mais absoluta do que 'reduziu o tempo'. O texto não sustenta essa conclusão.\n\n**Resposta:** **não**. A afirmação extrapola o texto. A técnica usada foi relacionar uma informação explícita à restrição indicada pelo conectivo."
    },
    "pitfalls": [
      "Uma conclusão plausível não é necessariamente autorizada pelo texto.",
      "Tema é assunto; ideia central é a afirmação principal sobre esse assunto.",
      "'Alguns' não equivale a 'todos'.",
      "Conectivos podem modificar a relação lógica mesmo sem mudar os substantivos."
    ],
    "review": [
      {
        "ask": "O que é informação explícita?",
        "answer": "É a informação que o autor afirma diretamente, sem o leitor precisar concluir algo que não foi escrito."
      },
      {
        "ask": "Qual a diferença entre tema e ideia central?",
        "answer": "Tema é o assunto; ideia central é a mensagem principal desenvolvida sobre ele."
      },
      {
        "ask": "O texto diz 'alguns'. Posso concluir 'todos'?",
        "answer": "Não, isso tornaria a afirmação mais ampla do que a evidência permite."
      },
      {
        "ask": "O que 'entretanto' costuma indicar?",
        "answer": "Contraste, oposição ou ressalva em relação ao que foi dito."
      }
    ],
    "extra": ""
  },
  "10": {
    "id": 10,
    "title": "ITIL sem decoreba: por que incidente, problema e mudança são diferentes?",
    "goal": "Entender o que é um serviço de TI e distinguir restaurar a operação, descobrir uma causa e modificar o ambiente de forma controlada.",
    "steps": [
      {
        "title": "1. O que significa prestar um serviço de TI?",
        "body": "Imagine que uma empresa utiliza um sistema de agendamento. Para os funcionários, o serviço não é apenas o programa instalado: é a capacidade de agendar pacientes com segurança e disponibilidade. Um **serviço de TI** reúne recursos, atividades e pessoas para ajudar usuários a alcançar um resultado.\n\n**Gestão de serviços** significa organizar o trabalho necessário para que essa entrega funcione de modo confiável. O **ITIL** é um conjunto de orientações e boas práticas usado nessa gestão. Ele não significa um software específico ou uma ordem única de passos que toda empresa deve seguir.\n\nPor que isso importa? Porque dizer 'o sistema está instalado' não garante que os usuários estejam conseguindo realizar agendamentos. O objetivo é o **resultado oferecido pelo serviço**."
      },
      {
        "title": "2. Incidente: o que fazer quando o serviço deixa de funcionar?",
        "body": "São 9 horas e ninguém consegue emitir uma senha no totem da recepção. Essa interrupção não estava planejada. Chamamos de **incidente** uma interrupção não planejada ou redução de qualidade de um serviço.\n\nO gerenciamento de incidentes procura **restabelecer o serviço o quanto antes**, considerando impacto e urgência. Se o totem principal falha, pode ser possível atender temporariamente por uma segunda estação. Essa solução temporária é conhecida como **contorno** ou *workaround*: permite retomar a atividade enquanto a causa não foi eliminada.\n\n**Ponto fundamental:** atender um incidente não exige, obrigatoriamente, descobrir e eliminar toda a causa naquela hora. O objetivo imediato é reduzir o prejuízo à operação."
      },
      {
        "title": "3. Problema: por que o incidente continua voltando?",
        "body": "Agora imagine que o totem volta a funcionar sempre que é reiniciado, mas falha novamente todas as manhãs. Cada interrupção é um **incidente**. A pergunta 'qual é a causa ou a possível causa dessas falhas?' entra no gerenciamento de **problemas**.\n\nO trabalho aqui é investigar padrões, dependências e causas. Talvez o serviço fique sem memória, a conexão caia depois de determinado evento ou uma rotina agendada cause conflito. A causa encontrada pode exigir uma correção permanente.\n\nUm incidente pode ser restaurado com um contorno, enquanto o problema permanece em investigação. Isso explica por que ITIL não usa as duas palavras como sinônimos. Sem investigar a causa, reiniciar o sistema repetidamente restaura o atendimento, mas não resolve o defeito que provoca as novas paradas."
      },
      {
        "title": "4. Mudança: como corrigir sem criar outro problema?",
        "body": "A equipe descobriu que precisa atualizar a versão do sistema para corrigir a falha. Fazer essa alteração em produção pode interromper atendimento ou gerar incompatibilidade. Uma **mudança** é a adição, modificação ou remoção de algo que possa afetar um serviço.\n\nGerenciar mudanças significa avaliar o risco, planejar como executar, obter autorização adequada, prever comunicação e verificar se o resultado ficou correto. Não significa que toda troca de cabo precise da mesma burocracia que uma atualização crítica; o processo deve ser proporcional ao risco e ao contexto.\n\n**Conexão entre os três conceitos:** o incidente é a falha percebida; o problema procura a causa; a mudança executa uma alteração controlada. Eles podem aparecer no mesmo caso, mas respondem a perguntas diferentes."
      }
    ],
    "worked": {
      "title": "Caso resolvido: totem falha toda manhã",
      "body": "**Situação:** o totem de senhas deixa de funcionar diariamente. A equipe reinicia o serviço e o atendimento volta. Uma investigação identifica versão incompatível de um componente. A correção exige atualizar o sistema.\n\n**Passo 1 — Incidente.** Cada parada inesperada do totem é uma interrupção de serviço; a equipe precisa restabelecer o atendimento.\n\n**Passo 2 — Contorno.** Reiniciar pode restaurar temporariamente a operação. Isso não significa que a causa desapareceu.\n\n**Passo 3 — Problema.** Investigar a falha recorrente e sua causa técnica é gerenciamento de problemas.\n\n**Passo 4 — Mudança.** Planejar e aplicar a atualização do componente com avaliação de impacto é uma mudança.\n\n**Resposta de prova:** se a pergunta enfatiza **restaurar rapidamente**, pense em incidente; se enfatiza **causa recorrente**, pense em problema; se enfatiza **alterar o ambiente de forma planejada**, pense em mudança."
    },
    "pitfalls": [
      "Incidente é uma interrupção ou degradação não planejada; não é sinônimo de causa raiz.",
      "Contorno restaura a atividade temporariamente e pode deixar a causa sem solução.",
      "Problema investiga a causa ou potencial causa de incidentes.",
      "Mudança precisa ser controlada conforme risco, mesmo quando corrige um incidente."
    ],
    "review": [
      {
        "ask": "O que um serviço de TI entrega?",
        "answer": "Uma capacidade útil ao usuário para alcançar determinado resultado, não apenas software instalado."
      },
      {
        "ask": "Qual é o objetivo imediato do gerenciamento de incidentes?",
        "answer": "Restaurar o serviço normal o mais rápido possível, minimizando impacto."
      },
      {
        "ask": "Por que 'reiniciar resolve até amanhã' sugere um problema a investigar?",
        "answer": "Porque a causa do incidente recorrente ainda não foi eliminada."
      },
      {
        "ask": "Atualizar um sistema em produção para corrigir a causa é exemplo de quê?",
        "answer": "Mudança, que deve ser avaliada, planejada e verificada conforme o risco."
      }
    ],
    "extra": ""
  }
};
