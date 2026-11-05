import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullENG=buildChapters([
  {
    "id": 15,
    "title": "APIs e Git: como uma aplicação conversa e evolui sem perder controle",
    "goal": "Entender contrato de API, pedidos HTTP, controle de versão e por que integração e histórico resolvem problemas distintos.",
    "context": "Imagine aplicativo de celular que mostra agendamentos. Ele não precisa conhecer diretamente tabelas do banco; pode conversar com um servidor por uma **API**, interface que define operações disponíveis e formatos das mensagens. Uma **API web** pode usar HTTP para transportar pedidos como `GET /agendamentos/123` e respostas com dados ou códigos de erro. Enquanto isso, programadores modificam o código da API. Para registrar e coordenar essas mudanças utilizam **Git**, um sistema de controle de versões. A API define comunicação entre programas; Git organiza evolução do código.",
    "explanation": "Um **endpoint** é ponto de acesso a uma operação, normalmente identificado por caminho e método HTTP. Uma requisição pode enviar cabeçalhos, parâmetros e corpo. A resposta pode trazer **JSON**, formato textual estruturado em pares de chave e valor, arrays e outros tipos. Em Git, `commit` registra um conjunto de alterações no histórico; `branch` organiza linhas de trabalho, e `merge` integra mudanças. Ter commits não significa que a API esteja correta: testes precisam verificar se o contrato de pedidos e respostas continua funcionando após alterações.\n\n**API é contrato entre programas.** Uma interface de programação define operações, formatos, requisitos e erros esperados; numa API HTTP, isso inclui método, URL, cabeçalhos, corpo e resposta. Uma aplicação web pode chamar GET /pacientes/42 e receber JSON, mas precisa lidar com 404 (recurso ausente), 401 (autenticação necessária) e 403 (proibido). JSON é formato de dados, não protocolo de segurança. Git registra versões como commits, cada qual aponta a uma árvore de conteúdo e metadados; branch é referência móvel a um commit e merge combina históricos. Git não substitui backup de dados de produção, nem publicar commit no GitHub significa deploy concluído.",
    "connection": "Se o aplicativo espera o campo `data`, mas a API passou a devolver `horario`, surge possível **quebra de contrato** mesmo que banco e rede estejam operando. Um teste de integração pode detectar essa incompatibilidade, e o Git permite encontrar a mudança relacionada. **Versionamento de API** é gestão de evolução do contrato; não se confunde com versão do repositório Git, embora possam ser relacionados. **HTTP GET** consulta recurso; `POST` submete pedido segundo semântica do serviço.",
    "exam": "A banca pode afirmar que Git transporta dados entre aplicação e servidor: não, quem faz isso é a comunicação da API. Ou que toda mudança em endpoint é compatível: alterar campos obrigatórios pode quebrar consumidores. Diferencie código versionado de contrato publicado, método HTTP e formato de resposta. Quando a pergunta menciona histórico, branches e merges, pense em Git; quando menciona JSON e endpoints, pense em APIs.",
    "caseTitle": "Mudança de campo quebra aplicativo, mesmo com servidor funcionando",
    "caseSteps": [
      "O celular chama GET /agenda e espera JSON com campo `data` para mostrar a consulta.",
      "Nova API passa a enviar apenas `horario`, sem manter o contrato esperado pelo cliente.",
      "Um teste de integração identifica ausência de `data`; equipe revisa mudança registrada em commit.",
      "Corrija compatibilidade ou coordene versionamento de contrato e cliente, mantendo testes de regressão."
    ],
    "pitfalls": [
      "Git versiona código, não substitui rede ou API de produção.",
      "Endpoint com resposta 200 não comprova que o formato atende ao contrato.",
      "Versionamento de API e commit de Git têm propósitos diferentes.",
      "Mudar campo de JSON pode quebrar consumidores existentes."
    ],
    "cards": [
      [
        "O que é uma API na integração entre programas?",
        "Interface com operações e formatos definidos para que programas acessem capacidades de outro sistema."
      ],
      [
        "O que é endpoint HTTP?",
        "Ponto de acesso a recurso/operação definido por método, caminho e regras da API."
      ],
      [
        "O que é commit no Git?",
        "Registro de um conjunto de alterações com metadados que permite acompanhar histórico."
      ],
      [
        "Por que testar contrato da API após mudar código?",
        "Para verificar compatibilidade entre campos, códigos e comportamentos esperados pelos consumidores."
      ]
    ]
  },
  {
    "id": 67,
    "title": "Requisitos: transforme uma necessidade vaga em comportamento verificável",
    "goal": "Distinguir requisito funcional e não funcional, atores e critérios de aceite em um sistema real.",
    "context": "Um gerente pede 'um sistema de agendamento rápido e fácil'. Parece uma necessidade clara, mas **rápido** e **fácil** podem significar coisas diferentes para duas pessoas. Um **requisito** descreve uma necessidade/condição que o produto deve atender. **Funcional** descreve comportamento, por exemplo permitir reservar horário; **não funcional** descreve qualidade ou restrição, como responder em até dois segundos sob carga definida. O **usuário** precisa ser considerado no contexto de sua tarefa, não só como alguém que 'usa tecnologia'.",
    "explanation": "Comece por um **cenário**: recepcionista consulta disponibilidade e reserva horário livre. Escreva requisito funcional 'O sistema deve impedir duas reservas simultâneas do mesmo equipamento e horário'. Depois defina critério observável: quando duas pessoas tentam reservar a mesma vaga, no máximo uma confirmação deve ser gravada, e a outra deve receber mensagem compreensível. Isso é **critério de aceite**, condição para verificar resultado. Para desempenho, defina distribuição de tempos, carga e ambiente; 'ser rápido' sozinho não é testável.\n\n**Transforme frase vaga em comportamento testável.** 'Sistema deve ser rápido' é ambíguo; defina cenário e métrica: 'para 95% das consultas de paciente com até 20 registros, a API responderá em até 500 ms sob 100 usuários concorrentes no ambiente de homologação'. Requisito funcional descreve comportamento; requisito não funcional caracteriza restrição/qualidade, como segurança, disponibilidade e desempenho. Critério de aceite deve ser verificável, com condições e resultado esperado. Exemplo: dado usuário de recepção autenticado, quando consulta exame de sua unidade, então vê apenas registros autorizados; outro setor recebe negação. Requisitos não são só textos: devem ter responsável, origem, prioridade, exceções e vínculo com testes.",
    "connection": "Requisitos guiam **design**, implementação e testes. Uma regra de unicidade no banco pode ser necessária para garantir a não duplicidade em concorrência, enquanto a interface fornece retorno compreensível. **Histórias de usuário** são uma forma de representar necessidades, não substituem critérios técnicos ou restrições legais. Um requisito é mais útil quando há **rastreabilidade**: conseguimos relacioná-lo à implementação e ao teste que prova cumprimento.",
    "exam": "A banca costuma classificar 'permitir exportar PDF' como funcional e 'exportação concluída em menos de cinco segundos para arquivo especificado' como não funcional de desempenho. Mas não escolha apenas pela presença de um número; confirme se a frase descreve **o que** ou **como/quão bem** a função deve operar. Requisito não funcional também pode ser segurança, acessibilidade e disponibilidade.",
    "caseTitle": "Especifique a regra de não reservar horário duplicado",
    "caseSteps": [
      "Identifique o objetivo: recepção não deve criar duas reservas para mesma sala e horário.",
      "Escreva requisito funcional: ao confirmar reserva, o sistema verifica e impede conflito.",
      "Defina aceite: duas solicitações simultâneas resultam em apenas uma confirmação e mensagem amigável à outra.",
      "Inclua teste de concorrência e restrição transacional no banco, para não confiar só na tela."
    ],
    "pitfalls": [
      "'Ser fácil' sem contexto e critério é requisito pouco verificável.",
      "Requisito funcional e não funcional não são sinônimos de importante e secundário.",
      "História de usuário não substitui critério de aceite.",
      "Conferir disponibilidade só na interface pode falhar sob concorrência."
    ],
    "cards": [
      [
        "O que é requisito funcional?",
        "Descrição do comportamento ou serviço que o software precisa oferecer."
      ],
      [
        "O que é requisito não funcional?",
        "Restrição ou propriedade de qualidade, como segurança ou desempenho mensurável."
      ],
      [
        "O que é critério de aceite?",
        "Condição observável que permite verificar se determinada necessidade foi atendida."
      ],
      [
        "Por que testar duas reservas simultâneas?",
        "Porque a regra precisa continuar válida sob concorrência, não apenas quando um usuário clica sozinho."
      ]
    ]
  },
  {
    "id": 69,
    "title": "Testes de software: o que cada nível realmente verifica?",
    "goal": "Entender unidade, integração, sistema, regressão e aceitação com exemplos progressivos.",
    "context": "Você cria uma função que calcula o total da compra e vê que ela funciona. Isso prova que o site inteiro funciona? Não. Um **teste** executa ou avalia o software para verificar comportamento previsto e identificar problemas. **Teste unitário** concentra-se numa pequena unidade, como função que calcula valor. **Teste de integração** verifica colaboração entre componentes, como API e banco. **Teste de sistema** avalia o conjunto integrado numa situação de uso. **Teste de aceitação** verifica se produto atende critérios do usuário/negócio.",
    "explanation": "Considere um agendamento: teste unitário valida que duração de exame de 40 min ocupa os intervalos corretos; teste de integração verifica que API grava e consulta horário no banco; teste de sistema verifica jornada de cadastro até confirmação; teste de aceitação confirma que a recepção consegue concluir tarefa e que critérios foram atendidos. **Regressão** é repetir verificações para detectar se uma mudança quebrou comportamento que já funcionava. A **asserção** é condição que o teste confere, como `total == 150`.\n\n**Cada nível cobre uma fronteira diferente.** Teste de unidade isola uma função ou componente para verificar regra local; integração verifica colaboração entre módulos, API, banco e serviços; ponta a ponta percorre fluxo completo próximo ao uso real. Teste de aceitação pergunta se necessidades do usuário e critérios foram cumpridos. Um teste unitário de cálculo de desconto não detecta necessariamente falha na autenticação da API; um E2E pode encontrar quebra de navegação, mas é mais lento e difícil de diagnosticar. Use casos positivos, negativos e limites. Em testes automatizados, asserção compara resultado observado com esperado, e fixture prepara estado de teste. Cobertura de linhas alta não garante regras corretas nem ausência de defeitos.",
    "connection": "Passar testes não garante ausência de erros desconhecidos; depende de **cobertura**, cenários e qualidade das asserções. Um teste que apenas verifica se endpoint retorna 200 não prova que persistiu registro correto. **Mock** substitui dependência por comportamento controlado em determinados testes, ajudando isolamento, mas pode ocultar problema real de integração. Daí a necessidade de combinar níveis e usar dados representativos sem expor informações reais sensíveis.",
    "exam": "Se a questão diz 'testa uma função sem dependências externas', normalmente é unidade. Se diz 'verifica API conversando com banco real ou ambiente representativo', integração. Se diz 'fluxo completo do usuário', sistema ou aceitação conforme objetivo. Não classifique apenas pelo uso de ferramenta automatizada; testes podem ser manuais ou automatizados em diferentes níveis.",
    "caseTitle": "Qual teste encontraria um agendamento que não foi gravado?",
    "caseSteps": [
      "A função de formatar data passou no teste unitário, mas usuário não encontra agendamento após salvar.",
      "Teste de integração deve verificar se a API persistiu e leu registro no banco.",
      "Teste de sistema reproduz fluxo completo e também pode detectar falha na jornada.",
      "Acrescente asserção sobre ID e conteúdo salvo, não apenas retorno HTTP 200."
    ],
    "pitfalls": [
      "Teste unitário não garante integração entre componentes.",
      "HTTP 200 não prova que operação gravou dados corretos.",
      "Mock útil pode ocultar diferença da dependência real.",
      "Regressão verifica se mudança afetou comportamento anteriormente correto."
    ],
    "cards": [
      [
        "Qual foco do teste unitário?",
        "Uma pequena unidade de código, isolando o comportamento relevante."
      ],
      [
        "Qual foco do teste de integração?",
        "A interação entre componentes, como API, banco ou serviços."
      ],
      [
        "O que é teste de regressão?",
        "Reexecutar verificações para detectar quebra de funcionalidades existentes após mudança."
      ],
      [
        "Por que status 200 sozinho é asserção fraca?",
        "Porque o serviço pode responder sucesso sem persistir ou processar os dados corretos."
      ]
    ]
  },
  {
    "id": 70,
    "title": "Git do zero: working tree, staging, commit e merge",
    "goal": "Entender a sequência de uma alteração até integrar código e como resolver divergências.",
    "context": "Dois desenvolvedores alteram arquivos do mesmo projeto. Sem histórico, uma versão pode sobrescrever a outra. **Git** é sistema distribuído de controle de versões que registra conjuntos de alterações e permite coordenar trabalho. A **working tree** representa arquivos editados no diretório de trabalho; a **staging area** (índice) representa o que está preparado para o próximo commit; o **repositório** guarda histórico. Essas três ideias explicam por que editar arquivo não cria automaticamente versão registrada.",
    "explanation": "O comando `git status` mostra situação de arquivos e branch. `git add arquivo` prepara conteúdo para o índice; `git commit -m 'mensagem'` registra um novo commit a partir do estado preparado. **Branch** identifica uma linha de desenvolvimento que pode divergir de outra. **Merge** combina históricos e mudanças; quando alterações incompatíveis atingem mesma região, surge **conflito**, que exige análise e resolução humana ou automatizada verificável. `git push` envia commits a remoto; `git pull` normalmente integra mudanças recebidas, conforme configuração.\n\n**Entenda os três locais do Git.** Working tree são arquivos editados; staging area (índice) seleciona o conteúdo da próxima gravação; commit registra snapshot e referência ao(s) pai(s). git status mostra alterações; git add coloca versão selecionada no stage; git commit cria registro; git push envia commits ao remoto. Branch é nome que aponta para um commit, não cópia física completa do repositório. Merge integra histórias e pode exigir resolver conflitos quando mudanças concorrentes atingem o mesmo trecho. git revert cria novo commit que desfaz efeitos anteriores sem reescrever histórico publicado; reset altera a posição da referência local e pode descartar mudanças conforme opção. Não confunda apagar arquivo no working tree com remover de histórico já existente.",
    "connection": "Versionar código apoia **testes** e **revisão de mudanças**, mas não equivale a publicar. Um commit no GitHub pode disparar CI/CD, que executa verificações e implantação em ambiente configurado. Alterações de banco e segredos devem ter tratamento cuidadoso: **não grave senhas ou strings de conexão no repositório**. O histórico pode preservá-las mesmo após remover o arquivo em commit posterior. Use variáveis e mecanismos de segredo adequados.",
    "exam": "A banca pode dizer que `git add` publica para todos; não, prepara alterações locais. `git commit` registra versão local; `git push` envia commits ao remoto. `git merge` pode produzir conflito; isso não torna o repositório irrecuperável, mas precisa de resolução correta. `git clone` cria cópia local de um repositório e seus dados; não é sinônimo de deploy.",
    "caseTitle": "Um recurso foi alterado, mas não aparece no GitHub",
    "caseSteps": [
      "O desenvolvedor modificou `App.tsx`, mas apenas salvou o arquivo; `git status` mostra alteração não preparada.",
      "Execute `git add App.tsx` para preparar conteúdo a ser registrado.",
      "Execute `git commit -m 'Melhora a navegação'` e confira o commit local.",
      "Envie com `git push` ao remoto correto; só então, se houver integração configurada, poderá ocorrer build/deploy."
    ],
    "pitfalls": [
      "git add não cria commit nem envia arquivos ao remoto.",
      "git commit pode existir apenas no repositório local.",
      "Merge pode exigir resolução de conflitos reais.",
      "Git não é cofres de senhas nem substitui publicação/deploy."
    ],
    "cards": [
      [
        "O que é staging area?",
        "Índice das alterações preparadas para inclusão no próximo commit."
      ],
      [
        "O que faz git commit?",
        "Registra um conjunto preparado de alterações no histórico do repositório local."
      ],
      [
        "O que faz git push?",
        "Envia commits e referências ao repositório remoto conforme regras de acesso."
      ],
      [
        "O que é conflito de merge?",
        "Situação em que mudanças não podem ser integradas automaticamente sem escolher resultado correto."
      ]
    ]
  },
  {
    "id": 73,
    "title": "CI/CD: por que código testado não é necessariamente código publicado",
    "goal": "Diferenciar integração contínua, entrega contínua, implantação e qualidade de pipeline.",
    "context": "Uma equipe atualiza um componente e envia para GitHub. O site na Internet continua na versão antiga. Isso é possível porque salvar código e publicar uma aplicação são operações diferentes. **CI (Continuous Integration)** é prática de integrar mudanças com frequência e automatizar verificações, como compilação e testes. **CD** pode referir-se a **entrega contínua**, mantendo artefato pronto para implantação, ou **implantação contínua**, enviando automaticamente alterações aprovadas ao ambiente, conforme uso do termo.",
    "explanation": "Um **pipeline** é sequência automatizada de tarefas configuradas: obter código, instalar dependências, compilar, executar análise estática, rodar testes, empacotar e talvez publicar. Cada fase gera resultado e pode bloquear as seguintes. **Build** é processo de construir artefato executável ou arquivos finais; **deploy** disponibiliza versão num ambiente. Uma ferramenta pode informar 'build passou' sem ter verificado regra de negócio importante. Por isso configure testes relevantes e monitoramento após publicação.\n\n**CI e CD têm portas distintas.** Integração contínua executa verificações como lint, análise estática, testes e build a cada mudança; entrega contínua prepara pacote para publicação, e implantação contínua pode publicar automaticamente após verificações. Um pipeline verde indica que seus testes passaram, não que a experiência real esteja livre de bugs. Build compila/empacota; deploy distribui versão para ambiente; release torna funcionalidade disponível ao usuário, podendo envolver flags. Proteja variáveis secretas e ambientes de produção por permissões. Versione configuração não sensível, registre SHA do commit publicado e teste endpoints e interface após deploy. Estratégias de rollback devem considerar migrações de banco, incompatibilidades de dados e efeitos externos.",
    "connection": "Controle de versão ajuda rastrear qual commit foi publicado. Testes de unidade e integração reduzem risco, mas não garantem execução em ambiente produtivo idêntico. **Rollback** é voltar versão ou comportamento anterior, quando possível, e requer compatibilidade de dados. Uma migração de banco pode ser difícil de desfazer, mesmo que o frontend volte para commit antigo. Segredos de produção devem ficar em serviço seguro de configuração, nunca impressos em logs.",
    "exam": "Se a questão fala em 'compilar e testar a cada commit', está próxima de CI. Se fala em 'manter versão pronta para produção com decisão manual de publicar', é entrega contínua; 'publicar automaticamente após passar testes' é implantação contínua. Não confunda scanner de código com teste de comportamento. E não conclua que pipeline verde equivale a serviço saudável: monitoramento e verificações pós-deploy continuam necessários.",
    "caseTitle": "O código passou nos testes, mas o site exibe a versão anterior",
    "caseSteps": [
      "Confira se commit foi enviado à branch que dispara o pipeline correto.",
      "Verifique se houve build bem-sucedido e, separadamente, deploy concluído ao ambiente de produção.",
      "Confirme commit/versão associados ao deployment e cache, sem declarar sucesso só por teste local.",
      "Valide funcionalidade em produção e esteja preparado para rollback se houver falha."
    ],
    "pitfalls": [
      "CI automatiza integração/verificação; deploy é passo distinto.",
      "Build com sucesso não prova que produção está na versão nova.",
      "Rollback pode exigir cuidados com migrações de banco.",
      "Segredos nunca devem ser publicados no repositório nem expostos nos logs."
    ],
    "cards": [
      [
        "O que CI automatiza no processo de desenvolvimento?",
        "Prática de integrar mudanças frequentes acompanhadas de validação automatizada, como builds e testes."
      ],
      [
        "O que diferencia entrega de implantação contínua?",
        "Entrega mantém versão pronta; implantação automatiza publicação após critérios definidos."
      ],
      [
        "O que é pipeline?",
        "Sequência automatizada de etapas como testes, build, análise e deploy."
      ],
      [
        "Por que checar commit do deployment?",
        "Para confirmar que o ambiente está servindo a versão do código realmente pretendida."
      ]
    ]
  },
  {
    "id": 74,
    "title": "Complexidade Big-O: o que cresce quando aumentam os dados?",
    "goal": "Interpretar tempo linear, logarítmico e quadrático a partir de algoritmos simples e distinguir custo de execução real.",
    "context": "Um programa procura um CPF numa lista com 10 nomes. Funciona rápido. Com um milhão, pode ficar lento. Para prever como esforço cresce conforme tamanho da entrada, usamos **complexidade assintótica**, normalmente expressa em **Big-O**. O símbolo `n` representa tamanho do problema, como quantidade de registros. O Big-O descreve limite de crescimento da função de custo em termos assintóticos; não informa exatamente milissegundos numa máquina específica.",
    "explanation": "Uma busca **linear** percorre elementos até encontrar alvo: no pior caso, examina cerca de n registros, `O(n)`. Uma **busca binária** em sequência ordenada compara com o meio e elimina metade do intervalo a cada passo, chegando a crescimento `O(log n)` para número de comparações no modelo usual. Dois laços aninhados que percorrem n elementos cada podem produzir `O(n²)`, porque cada um dos n elementos exige n verificações. A constante não aparece na notação de crescimento: `100n` e `n` pertencem a O(n), apesar de desempenho concreto diferente.\n\n**Big-O descreve crescimento, não segundos exatos.** Para n elementos, acesso direto por índice em array é tipicamente O(1); percorrer todos é O(n); dois laços aninhados sobre n podem ser O(n²), mas laços separados são O(n)+O(n)=O(n). Busca binária em sequência ordenada reduz espaço pela metade a cada passo: O(log n). Uma ordenação por comparação eficiente costuma ser O(n log n). Notação assintótica ignora constantes e termos menores para descrever limites conforme n cresce; algoritmos com O(1) podem ser lentos por constante elevada. Diferencie tempo e espaço. Antes de escolher complexidade, identifique operação básica e quantas vezes é executada em função da entrada.",
    "connection": "Complexidade se relaciona a **estruturas de dados**. Um índice B-tree ajuda busca sem percorrer todas as linhas sob padrões adequados, mas consultas reais incluem acesso a disco e distribuição de dados. Uma tabela hash pode oferecer busca média próxima de O(1) em hipóteses adequadas, mas colisões e implementação importam. A notação é ferramenta de comparação conforme n cresce, não promessa de desempenho absoluto.",
    "exam": "Se a prova diz que dobrar n dobra aproximadamente o trabalho de O(n) em cenário simplificado, é coerente; para O(n²), pode quadruplicar. Se compara 1.000.000 de elementos e pergunta por busca binária, lembre que `2^20 ≈ 1.048.576`, portanto cerca de 20 decisões de divisão, sob hipóteses. Mas não use busca binária numa lista desordenada sem preparação: a exigência de ordenação faz parte do algoritmo.",
    "caseTitle": "Por que busca binária precisa de ordem?",
    "caseSteps": [
      "Lista tem valores ordenados [2,5,9,13,18,21,30,42] e alvo 21.",
      "Compare meio (13); como 21 é maior, descarte metade esquerda conforme ordem.",
      "Continue na metade direita até localizar 21, fazendo poucas comparações.",
      "Se lista estivesse desordenada, descartar metade pelo valor não seria válido; a pré-condição importa."
    ],
    "pitfalls": [
      "Big-O não fornece tempo exato em segundos.",
      "Busca binária exige estrutura ordenada adequada.",
      "Dois laços aninhados podem levar a O(n²), conforme trabalho interno.",
      "O(1) médio de hash depende de hipóteses e não representa custo absolutamente constante em todos os casos."
    ],
    "cards": [
      [
        "O que representa n em complexidade?",
        "Tamanho da entrada ou parâmetro relevante, como quantidade de elementos."
      ],
      [
        "Qual é o crescimento típico da busca linear no pior caso?",
        "O(n), pois pode examinar até n elementos para localizar um alvo."
      ],
      [
        "Qual crescimento de busca binária sobre dados ordenados?",
        "O(log n) em comparações, reduzindo intervalo de busca pela metade a cada passo."
      ],
      [
        "Por que Big-O não garante tempo real?",
        "Porque omite constantes, hardware e detalhes de implementação e analisa crescimento assintótico."
      ]
    ]
  },
  {
    "id": 109,
    "title": "Histórias de usuário, critérios de aceite e rastreabilidade",
    "goal": "Converter necessidade operacional em história de usuário testável e relacioná-la a requisitos e verificações.",
    "context": "Uma história de usuário pode ser escrita: 'Como recepcionista, quero localizar horários disponíveis para agendar exames sem conflitos'. Essa frase expressa **quem**, **o que deseja** e **por quê**, mas sozinha não especifica todos os comportamentos. **História de usuário** é instrumento de conversa e planejamento incremental; **critério de aceite** define condições verificáveis para reconhecer o resultado. Sem critérios, diferentes profissionais podem entender a entrega de maneiras incompatíveis.",
    "explanation": "Para essa história, crie exemplos de aceitação: dada uma data com horário livre, quando recepcionista seleciona e confirma, então reserva é registrada; dado horário ocupado, quando tenta confirmar, então sistema informa conflito e não duplica. Essa estrutura **dado/quando/então** ajuda organizar cenários, sem ser obrigatória em todo projeto. Acrescente condições de segurança (somente usuário autorizado reserva) e acessibilidade quando necessárias. **Rastreabilidade** conecta história a critérios, testes e versão implementada.\n\n**História de usuário não substitui especificação.** 'Como recepcionista, quero localizar agendamentos por CPF para atender mais rápido' define papel, desejo e valor, mas não esclarece permissão, máscaras, duplicidades ou caso sem resultado. Escreva critérios em Dado/Quando/Então: dado perfil autorizado e CPF válido, quando pesquisar, então apresentar apenas registros permitidos; dado CPF inexistente, mostrar aviso sem expor outros dados. Rastreabilidade vincula necessidade → requisito → implementação → caso de teste → evidência. Se a regra muda, esses vínculos permitem identificar testes afetados. Critério de aceite mede comportamento observável; uma tarefa técnica como 'criar endpoint' é implementação, não benefício do usuário.",
    "connection": "O time pode utilizar diagramas UML para esclarecer atores e interações, mas desenho não substitui teste. A API precisa validar regras do domínio, e banco pode impor unicidade para evitar dupla reserva. Alterações de requisito devem repercutir nos testes. Um critério excessivamente técnico, como 'usar linguagem X', pode ser uma restrição válida apenas se houver razão real; não confunda meio de implementação com resultado desejado.",
    "exam": "Bancas podem oferecer história sem benefício ou critérios e perguntar por que é insuficiente. A resposta não é 'histórias não servem'; é que precisam de conversa, refinamento e validação. Critério de aceite não é lista de comandos do desenvolvedor; deve descrever **comportamento observável**. Evite declarar pronto um requisito que não passou em caso de erro ou concorrência relevante.",
    "caseTitle": "Escreva história e dois cenários de aceite",
    "caseSteps": [
      "História: como atendente, quero reservar horário livre para não gerar sobreposição de exames.",
      "Cenário de sucesso: horário livre, confirmação válida, registro persistido e mensagem de sucesso.",
      "Cenário de conflito: horário ocupado por outra reserva, segunda tentativa rejeitada sem gravação.",
      "Associe cada cenário a teste e evidência; a história está pronta somente quando critérios definidos foram cumpridos."
    ],
    "pitfalls": [
      "História de usuário não substitui testes e regras de negócio.",
      "Critério de aceite deve ser verificável, não apenas elogio subjetivo.",
      "Definição de Pronto e critérios de aceite não são conceitos idênticos.",
      "Rastreabilidade permite ligar necessidade ao teste e à versão entregue."
    ],
    "cards": [
      [
        "O que uma história de usuário comunica?",
        "Papel, necessidade e benefício esperado, servindo de base para detalhamento e conversa."
      ],
      [
        "O que é critério de aceite?",
        "Condição de comportamento observável que permite verificar se história/requisito foi atendido."
      ],
      [
        "Por que adicionar cenário de conflito?",
        "Porque sistemas precisam comportar-se corretamente também quando operação não pode ser concluída."
      ],
      [
        "O que é rastreabilidade de requisito?",
        "Possibilidade de relacionar necessidade a implementação, testes e evidências de atendimento."
      ]
    ]
  },
  {
    "id": 110,
    "title": "REST, métodos HTTP e autenticação: o que realmente vai na requisição",
    "goal": "Distinguir recurso, método, código HTTP, autenticação, autorização e dados de sessão em API.",
    "context": "Um celular precisa consultar o exame número 100 e depois alterar o cadastro autorizado. Uma API de estilo **REST** organiza recursos identificados por URI e utiliza semântica de métodos HTTP, entre outras restrições arquiteturais. **Recurso** representa algo que a aplicação oferece, como `/exames/100`; **método** indica intenção de operação. Mas nem todo endpoint HTTP é automaticamente RESTful, e a segurança da operação não depende só de usar URL bonita.",
    "explanation": "`GET /exames/100` solicita representação do recurso e deve ter semântica segura, não usada para alterar estado. `POST` submete dados para processamento; `PUT` define/substitui estado do recurso de modo idempotente segundo semântica HTTP; `DELETE` solicita remoção da associação do recurso, sendo idempotente pela intenção, mesmo que respostas possam variar. **Autenticação** verifica identidade do consumidor; **autorização** verifica direito ao recurso e à ação. Códigos como 401 e 403 representam respectivamente necessidade de credenciais válidas e recusa da operação entendida.\n\n**HTTP tem partes separadas.** Requisição contém método e caminho, cabeçalhos e possivelmente corpo. GET recupera, POST solicita processamento, PUT normalmente substitui estado de recurso, PATCH aplica alteração parcial e DELETE solicita remoção. Idempotência significa que repetir a mesma operação tem efeito pretendido equivalente a executá-la uma vez; GET, PUT e DELETE são definidos como idempotentes em sua semântica, embora log, auditoria e resposta possam variar. Bearer token no cabeçalho Authorization é credencial de acesso: não deve ir para logs públicos nem URL. Autenticação prova identidade/credencial, autorização determina permissões. Status 401 significa que autenticação válida falta; 403, que acesso não é permitido.",
    "connection": "Uma API pode utilizar **tokens** ou cookies para representar sessões, mas precisa validar credenciais e autorização **no servidor**. Ter autorização para visualizar exame 100 não implica acesso a exame 101. O **HTTPS/TLS** ajuda proteger o canal, mas não impede erro de permissão. E a **idempotência** é propriedade da intenção semântica: repetir operação deveria ter o mesmo efeito pretendido no estado que executá-la uma vez, não necessariamente produzir resposta byte a byte idêntica.",
    "exam": "A banca pode dizer que GET é método para remover recursos: incorreto; DELETE representa remoção da associação. Pode dizer que POST é idempotente por definição: não é garantido pela semântica geral. Se a questão fala que usuário muda ID na URL e obtém dados alheios, o problema é autorização no objeto, não protocolo TLS. Não confunda 401 com 404 nem 403: cada código transmite classe de resposta diferente.",
    "caseTitle": "Uma API deixa acessar exame de outra pessoa",
    "caseSteps": [
      "Usuário autentica e consulta GET /exames/100, recurso que tem autorização para visualizar.",
      "Troca o ID para /exames/101 e recebe informação de outro paciente.",
      "A validação de token não é suficiente: API precisa conferir permissão sobre o recurso 101.",
      "Corrija autorização por objeto no backend e teste tentativa de acesso cruzado com contas distintas."
    ],
    "pitfalls": [
      "Autenticação não substitui autorização por recurso.",
      "GET tem semântica segura; não deve modificar estado por intenção de consulta.",
      "POST não é idempotente por definição geral.",
      "HTTPS não impede API de entregar conteúdo indevido a identidade autenticada."
    ],
    "cards": [
      [
        "O que significa recurso numa API REST?",
        "Entidade ou capacidade identificável por URI, acessada segundo representações e operações."
      ],
      [
        "Qual a semântica do GET?",
        "Solicitar representação de recurso, com intenção segura de consulta, sem modificar estado."
      ],
      [
        "Qual diferença entre autenticação e autorização?",
        "Autenticação confirma identidade; autorização confere direito à ação sobre recurso concreto."
      ],
      [
        "Por que HTTPS não resolve falha de permissão?",
        "Porque protege o canal, mas a aplicação ainda pode decidir incorretamente quem recebe dados."
      ]
    ]
  },
  {
    "id": 111,
    "title": "Qualidade contínua: testes, Git e CI/CD no mesmo fluxo",
    "goal": "Criar uma sequência de atualização com verificação, publicação rastreável e possibilidade de regressão.",
    "context": "Uma equipe corrige um bug na API, envia código e o sistema para de funcionar em produção. O problema pode ter origem em teste insuficiente, ambiente diferente ou implantação incorreta. **Controle de versão** registra mudanças e permite relacioná-las a autores e commits. **Integração contínua** automatiza verificações frequentes. **Entrega/implantação contínua** organiza disponibilização de versões conforme políticas. **Qualidade** envolve adequação aos requisitos e comportamento real, não só quantidade de testes verdes.",
    "explanation": "Um fluxo consistente começa por reproduzir defeito com teste; depois altera código e revisa commit. O pipeline instala dependências, executa testes de unidade e integração, faz análise estática e compila artefato. Uma **análise estática** inspeciona código sem executar todos os cenários, identificando classes de erro e padrões; não substitui testes de comportamento. Após deploy, verificações de saúde e jornada validam serviço. Uma estratégia de **rollback** permite reverter versão quando compatibilidade de dados permitir.\n\n**Pipeline verificável de ponta a ponta.** Desenvolvedor cria branch, adiciona testes, registra commits e abre revisão. CI instala dependências fixadas, executa testes unitários/integrados, verifica tipos e produz build; CD publica o artefato no ambiente adequado. Testes devem ser determinísticos e não depender de segredos de produção. Migrações de banco exigem compatibilidade com versões ainda em execução e plano de retorno. Após publicação, faça smoke test de login, rota, API e operação essencial, acompanhando logs e métricas. O SHA no site deve corresponder ao aprovado; código no GitHub não implica que a Vercel, ou outro provedor, tenha concluído a implantação.",
    "connection": "Uma alteração de **schema de banco** pode exigir migração coordenada com versão da aplicação. Reverter frontend não reverte automaticamente dados modificados. **Observabilidade** — logs, métricas e rastreamento apropriados — ajuda identificar falhas após publicação. Testes de carga avaliam desempenho sob demanda prevista, mas não provam ausência de bug funcional. Segurança depende também de gestão de segredos e de dependências, além do código.",
    "exam": "A banca pode afirmar que CI e CD são a mesma etapa; não são. Se apenas compila e testa localmente, não comprovou deploy. Se pipeline passou, mas serviço retorna erros em produção, ainda é falha da entrega. Questões podem pedir **regressão**, teste refeito após alteração para detectar quebra anterior; ou **análise estática**, inspeção sem execução de cenários como em teste dinâmico.",
    "caseTitle": "Build verde, mas a nova versão retorna erro 500",
    "caseSteps": [
      "Verifique qual commit foi implantado e se deploy finalizou, não apenas se build foi concluído.",
      "Consulte logs e dependências: versão pode exigir nova coluna de banco não migrada.",
      "Aplique correção ou rollback seguro, considerando compatibilidade dos dados e proteção do progresso.",
      "Crie teste de integração que reproduza cenário para evitar regressão nas próximas entregas."
    ],
    "pitfalls": [
      "Pipeline verde não garante operação saudável em produção.",
      "Análise estática não substitui testes funcionais.",
      "Rollback de código pode ser incompatível com migração de dados.",
      "Verificar commit de deployment ajuda identificar versão realmente publicada."
    ],
    "cards": [
      [
        "O que é regressão de software?",
        "Quebra de comportamento anteriormente correto introduzida por uma alteração recente."
      ],
      [
        "O que análise estática verifica?",
        "Propriedades e padrões do código sem reproduzir necessariamente toda a execução do sistema."
      ],
      [
        "Por que pipeline verde não é prova de produção saudável?",
        "Porque deployment, ambiente, dependências e dados reais ainda podem apresentar falhas."
      ],
      [
        "O que considerar antes de rollback?",
        "Compatibilidade entre versões de código, dados, migrações e configurações do ambiente."
      ]
    ]
  },
  {
    "id": 141,
    "title": "Pirâmide de testes: quando escolher unidade, integração ou ponta a ponta",
    "goal": "Montar estratégia proporcional de testes e diferenciar cobertura útil de grande quantidade de testes frágeis.",
    "context": "Uma aplicação executa quinhentos testes unitários, mas não consegue gravar cadastro no banco de produção. A equipe percebe que um conjunto grande de verificações de funções pequenas não detectou falha de integração. A **pirâmide de testes** é uma heurística de equilíbrio: muitos testes rápidos e isolados, alguns testes de integração e testes de ponta a ponta suficientes para fluxos críticos. Não é lei matemática sobre percentuais obrigatórios. O objetivo é encontrar defeitos com velocidade, confiabilidade e cobertura do comportamento relevante.",
    "explanation": "Teste **unitário** confirma regra pequena, como calcular desconto; teste **integração** confere interação, como API inserindo em PostgreSQL; **E2E** (*end-to-end*) percorre jornada a partir da interface até resultados persistidos. Testes E2E podem ser mais lentos e sensíveis ao ambiente, por isso priorize cenários importantes em vez de duplicar cada caso unitário na interface. **Cobertura de linhas** mede que partes do código foram executadas por testes, mas não garante asserções corretas nem detecção de erros lógicos.\n\n**Pirâmide de testes é estratégia de custo e feedback.** Testes de unidade são numerosos e rápidos para lógica local; integração verifica fronteiras importantes, como SQL real, API e autenticação; poucos E2E validam jornadas críticas sem simular tudo. Teste de contrato verifica expectativas entre consumidor e provedor, útil em serviços independentes. Dublês de teste, como mocks, ajudam a isolar dependência, mas mock excessivo pode fazer todos os testes passarem mesmo com integração real quebrada. Em segurança, teste negativo precisa garantir que usuário sem permissão não acessa recurso alterando ID. Caso de teste deve descrever preparação, ação, resultado e limpeza, inclusive para falhas e limites.",
    "connection": "Se a aplicação depende de **autorização**, teste tanto regra isolada quanto tentativa real de uma conta acessar registro de outra. Se usa transações, teste concorrência no banco representativo. Uma estratégia de testes também precisa de dados sintéticos, proteção de dados reais e limpeza de ambiente. Automatizar testes sem critérios de aceite pode apenas automatizar verificação da coisa errada.",
    "exam": "A banca pode afirmar que 100% de cobertura garante ausência de defeitos: falso. Pode tratar E2E como substituto de integração e unidade: também não é recomendação geral. Se um método usa mock para banco, ainda precisa de teste real de integração para verificar queries e migrações. Escolha nível baseado no comportamento e risco verificado.",
    "caseTitle": "Um agendamento some após clicar Salvar",
    "caseSteps": [
      "Teste unitário valida formatação de horário e regra de duração.",
      "Teste de integração verifica persistência real no banco e leitura posterior do registro.",
      "Teste E2E percorre tela de agendamento, confirma e localiza o dado salvo na interface.",
      "Se o bug aparece somente com duas pessoas, acrescente cenário de concorrência; cobertura de linhas sozinha não prova proteção."
    ],
    "pitfalls": [
      "100% de cobertura não prova que todas as regras estão corretas.",
      "Testes E2E não precisam duplicar todo teste de função.",
      "Mocks podem esconder incompatibilidade real entre API e banco.",
      "A estratégia de testes deve ser guiada por riscos e critérios de aceite."
    ],
    "cards": [
      [
        "O que a pirâmide de testes orienta?",
        "Combinar níveis, priorizando testes rápidos e mantendo integração/E2E para riscos e fluxos relevantes."
      ],
      [
        "O que E2E testa?",
        "Uma jornada completa de utilização, envolvendo componentes integrados e resultados observáveis."
      ],
      [
        "Por que cobertura de linha não garante qualidade?",
        "Porque código executado pode não ter suas condições e resultados verificados adequadamente."
      ],
      [
        "Quando usar banco real de teste?",
        "Quando é necessário validar integração, consultas, restrições e transações efetivas."
      ]
    ]
  },
  {
    "id": 142,
    "title": "Idempotência em HTTP: por que retry pode duplicar operações?",
    "goal": "Entender métodos idempotentes, retriable requests e chave de idempotência num caso de pagamento ou agendamento.",
    "context": "Um celular envia pedido de agendamento e a rede cai antes de receber resposta. O aplicativo não sabe se o servidor confirmou a reserva. Se simplesmente enviar outro `POST`, pode criar duas reservas ou duas cobranças. **Retry** é tentativa repetida após falha; **idempotência** significa que repetir a mesma operação tem o mesmo efeito pretendido sobre o estado do recurso que executá-la uma vez, conforme semântica. Nem todo método HTTP possui essa garantia por padrão.",
    "explanation": "Na semântica HTTP, **GET** é seguro e idempotente; **PUT** e **DELETE** são idempotentes por intenção, embora respostas possam diferir entre chamadas; **POST** não é genericamente idempotente. Uma aplicação pode construir idempotência adicional para POST usando **chave de idempotência**, identificador único de tentativa, salvo com o resultado transacional correspondente. Se a mesma operação for repetida com a mesma chave, o servidor evita criar novo efeito de negócio. Isso exige implementação cuidadosa e prazo de retenção adequado.\n\n**Idempotência precisa ser planejada para reenvio.** Se o usuário envia POST /pagamentos e perde a resposta, reenviar pode criar segunda cobrança. Uma chave de idempotência associada ao pedido e ao usuário permite que o servidor reconheça repetição e retorne resultado da operação anterior conforme contrato, sem executar duas vezes. É preciso guardar resultado/estado de forma consistente, com expiração e prevenção de corrida. PUT que estabelece recurso em estado específico é semanticamente idempotente; POST não é necessariamente. DELETE pode retornar 204 na primeira vez e 404 na repetição sem violar idempotência do efeito pretendido. Segurança contra repetição requer considerar efeitos externos, transações e garantias de entrega.",
    "connection": "A idempotência não dispensa **restrições de unicidade** nem proteção de **concorrência** no banco. Se duas requisições chegam simultaneamente com a mesma chave, a API deve tratá-las atomicamente para evitar corrida. O código HTTP pode variar: primeiro DELETE pode retornar sucesso e repetição um 404, sem negar a intenção idempotente. A chave não é uma senha; não deve ser usada como substituto de autenticação ou autorização.",
    "exam": "A banca pode dizer que 'POST sempre é idempotente por ser HTTP': falso. Também pode afirmar que DELETE deixa de ser idempotente porque segunda resposta mudou; idempotência refere-se a **efeito pretendido sobre estado**, não resposta idêntica. Se o enunciado traz operação financeira e falha de rede, considere chave de idempotência e transação para evitar duplicação.",
    "caseTitle": "A mesma reserva é enviada duas vezes após timeout",
    "caseSteps": [
      "Cliente envia POST /reservas com chave `op-123`, mas perde conexão antes de receber resposta.",
      "Servidor grava reserva e registra `op-123` junto do resultado numa operação controlada.",
      "Cliente repete POST com a mesma chave e payload; servidor recupera o resultado sem criar segunda reserva.",
      "Confirme que chaves simultâneas são tratadas transacionalmente e que autorização segue sendo validada."
    ],
    "pitfalls": [
      "Idempotência trata efeito, não necessariamente resposta HTTP idêntica.",
      "POST não é idempotente por definição geral.",
      "Chave de idempotência exige implementação e proteção contra corrida.",
      "Retry não deve criar compra ou reserva duplicada."
    ],
    "cards": [
      [
        "O que é idempotência numa operação?",
        "Repetir a operação produz o mesmo efeito pretendido no estado que executá-la uma vez."
      ],
      [
        "POST é idempotente automaticamente?",
        "Não. É necessário que a aplicação implemente comportamento idempotente quando necessário."
      ],
      [
        "Por que DELETE pode ser idempotente e responder diferente?",
        "Porque estado final pretendido permanece removido mesmo que repetição tenha código de resposta distinto."
      ],
      [
        "Para que serve chave de idempotência?",
        "Identificar repetição da mesma operação e evitar efeitos de negócio duplicados."
      ]
    ]
  },
  {
    "id": 143,
    "title": "Git em equipe: conflitos, branches, tags e reversão",
    "goal": "Gerenciar mudanças concorrentes, entender merge e rastrear versões sem apagar histórico.",
    "context": "Dois desenvolvedores editam a mesma função para resolver problemas diferentes. Ao juntar as branches, Git não consegue decidir qual código deve ficar: surge **conflito de merge**. Isso é esperado em trabalho colaborativo e precisa de análise. Uma **branch** é referência para linha de desenvolvimento; um **commit** registra estado/histórico; uma **tag** identifica ponto específico, frequentemente usado para versões. Essas referências não executam código sozinhas nem determinam deploy automaticamente.",
    "explanation": "Antes de integrar, sincronize trabalho, revise diff e execute testes. `git merge` combina históricos; quando há conflito, o arquivo pode exibir marcadores de alternativas e o desenvolvedor precisa produzir versão final correta, preparar e registrar a resolução. **git revert** cria um novo commit que inverte efeitos de alteração anterior, quando aplicável, preservando histórico; **git reset** move referências e pode descartar alterações conforme modo e contexto, exigindo cautela em branches compartilhadas. **tag** facilita identificar versão publicada, mas a publicação depende do pipeline.\n\n**Branch, merge e rebase não têm o mesmo efeito.** Uma branch é referência a commit; commits guardam histórico e conteúdo. Merge cria junção de históricos, frequentemente com commit de merge; rebase reaplica commits sobre outra base, alterando seus identificadores. Em branch compartilhada, reescrever histórico pode atrapalhar colegas. Conflito ocorre quando o Git não consegue combinar alterações automaticamente; resolver exige entender a intenção de ambos os lados, não apenas escolher 'ours'. Tag marca referência frequentemente usada para versões. git revert preserva histórico criando reversão; git reset move referência e pode descartar mudanças locais; force push deve ser excepcional e coordenado.",
    "connection": "Reverter um commit de frontend pode restaurar interface antiga, mas não desfaz alterações de dados executadas no banco. O time precisa coordenar migrações e compatibilidade. **Pull request** permite revisão antes de integrar, quando plataforma usa esse fluxo; CI pode impedir merge quando testes falham. Nenhum desses mecanismos elimina a necessidade de entender o código final e testar a combinação das alterações.",
    "exam": "Se a questão pede desfazer alteração preservando histórico compartilhado, `revert` tende a ser mais adequado que `reset --hard` com reescrita de histórico público. Se o usuário pergunta por versão marcada, uma tag serve como referência. O comando `merge` não pode ser tratado como solução mágica de conflitos sem revisão de comportamento.",
    "caseTitle": "Duas branches alteraram a mesma validação",
    "caseSteps": [
      "Branch A adiciona regra de data; branch B modifica condição de autorização na mesma função.",
      "Ao fazer merge, Git detecta conflito e não consegue escolher automaticamente a lógica correta.",
      "Revise as duas intenções e produza código combinado que preserve data e autorização.",
      "Execute testes de ambos os comportamentos antes de concluir o merge e registrar commit final."
    ],
    "pitfalls": [
      "Conflito exige resolver significado, não apenas apagar marcadores do arquivo.",
      "git revert preserva histórico por novo commit, enquanto reset pode mover referência.",
      "Tag marca referência; não publica automaticamente em produção.",
      "Código revertido não desfaz automaticamente migração ou dados alterados."
    ],
    "cards": [
      [
        "O que é conflito de merge?",
        "Mudanças concorrentes que Git não consegue integrar automaticamente sem decisão sobre conteúdo final."
      ],
      [
        "Quando git revert é útil?",
        "Para registrar novo commit que desfaz efeitos de alteração anterior, preservando histórico."
      ],
      [
        "Qual o papel de tag?",
        "Marcar commit ou referência específica, frequentemente para identificar versão de lançamento."
      ],
      [
        "Por que executar testes após resolver conflito?",
        "Porque a combinação final pode compilar e ainda quebrar uma regra de cada branch."
      ]
    ]
  },
  {
    "id": 164,
    "title": "Oficina de requisitos: dos critérios de aceite ao teste que prova o resultado",
    "goal": "Transformar história vaga em condições verificáveis e planejar unidade, integração e sistema.",
    "context": "Um gerente diz 'precisamos de um sistema de cadastro seguro'. A expressão é importante, mas não informa se o sistema deve exigir MFA, restringir acesso por setor ou registrar eventos. **Requisito** precisa descrever necessidade verificável. **Critério de aceite** é condição observável pela qual uma entrega pode ser avaliada. **Teste** verifica se o comportamento satisfaz a condição. A oficina ensina ligar cada frase a evidência concreta, sem confundir narrativa de desejo com garantia de implementação.",
    "explanation": "Comece por história 'Como recepcionista, quero cadastrar paciente para agendar exame'. Estabeleça cenário normal: campos mínimos, validação adequada, gravação e confirmação. Estabeleça cenário de erro: identificador inválido não deve ser salvo; concorrência não deve criar duplicata indevida. Estabeleça segurança: recepcionista vê apenas ações autorizadas, inclusive se tentar chamar API diretamente. Defina testes para regras isoladas, integração com banco e jornada de tela. Cada caso tem resultado esperado mensurável.\n\n**Comece pelo requisito mensurável.** 'Usuário pode retirar senha' precisa dizer quando, por qual perfil, qual fila e o que ocorre se impressora falhar. Crie critérios independentes: dado serviço ativo, quando selecionar opção, então gerar senha única; dado indisponibilidade de impressão, registrar falha e orientar usuário sem duplicar atendimento. Para cada critério, crie teste positivo, negativo e limite. Rastreie requisito → API → interface → testes e evidências. Não confunda teste que verifica a presença de botão com teste que prova geração correta de senha e persistência. Homologação deve usar dados de teste e regras de privacidade apropriadas.",
    "connection": "Critérios de aceite alimentam **Definition of Done**, mas não são idênticos: a DoD pode cobrir padrões gerais de qualidade, enquanto aceitação explica comportamentos daquela história. **Rastreabilidade** permite saber qual teste valida requisito. **Versionamento** registra entrega, e **CI** executa verificações. Uma ferramenta automatizada pode dizer 'tudo verde', mas se não existe teste do acesso indevido, o requisito de segurança não foi comprovado.",
    "exam": "A banca pode oferecer como critério 'código deve ficar bonito', difícil de verificar. Prefira exemplos com resultado observável e condição clara. Se o requisito diz 'sem duplicidade', teste normal de um usuário não basta; inclua cenário de concorrência. Se a história é bem escrita mas não explica autorização, a especificação ainda pode estar incompleta para determinado contexto.",
    "caseTitle": "Torne verificável 'cadastro seguro e sem duplicatas'",
    "caseSteps": [
      "Defina regra: cadastro exige campos mínimos e não permite duplicata de identificador único.",
      "Teste caso normal: registro válido persistido e devolvido com ID correto.",
      "Teste caso concorrente: duas tentativas do mesmo identificador geram apenas um registro, outra recebe conflito.",
      "Teste autorização: identidade sem permissão não consegue cadastrar via API, mesmo chamando endpoint diretamente."
    ],
    "pitfalls": [
      "Adjetivo 'seguro' sem critérios não prova requisito atendido.",
      "Teste de interface não substitui validação de autorização no servidor.",
      "Critério de aceite precisa contemplar erro relevante, não só caminho feliz.",
      "Definition of Done e critérios da história se complementam, mas não são sinônimos."
    ],
    "cards": [
      [
        "Como tornar requisito testável?",
        "Especificar contexto, ação, resultado esperado e critério observável de sucesso/erro."
      ],
      [
        "Por que incluir teste de concorrência em duplicidade?",
        "Porque duas requisições simultâneas podem superar validação simples feita antes de gravar."
      ],
      [
        "O que rastreabilidade permite?",
        "Ligar necessidade e critério a testes, código e entrega verificável."
      ],
      [
        "Por que testar API diretamente?",
        "Porque controles de autorização não podem depender apenas de botões da interface."
      ]
    ]
  },
  {
    "id": 165,
    "title": "Oficina REST: reenvio, idempotência e mensagens de falha",
    "goal": "Projetar operações HTTP que resistam a timeout sem duplicar efeitos e que diferenciem erro de rede, autenticação e conflito.",
    "context": "Você toca em 'Confirmar agendamento' no celular. O botão gira, a rede oscila e a tela mostra 'tente novamente'. O servidor, entretanto, pode já ter gravado a reserva. Esse é um problema de **resultado desconhecido pelo cliente**: falha na resposta não prova que a operação deixou de acontecer. APIs precisam combinar **semântica HTTP**, idempotência e transações para evitar duplicidade quando clientes repetem tentativas legítimas.",
    "explanation": "Uma requisição POST cria reserva com identificador de tentativa fornecido pelo cliente, uma **chave de idempotência**. O servidor verifica se aquela chave já foi processada de maneira transacional. Se é nova, valida autorização e disponibilidade, executa a operação e registra o resultado ligado à chave; se repetida com mesmo conteúdo, devolve resultado da operação sem novo efeito. **Conflito** pode gerar resposta HTTP 409 conforme design; credenciais ausentes podem gerar 401 e permissão negada 403. Cada código deve ter justificativa e contrato de resposta.\n\n**Analise resultado e efeitos de uma API.** GET /pedidos/42 deve consultar sem modificar recurso por intenção; POST /pedidos cria um novo registro sob regras de validação; PUT /pedidos/42 define estado representado conforme contrato. Diante de timeout após POST, cliente não sabe apenas pelo timeout se servidor gravou: repetir cegamente pode duplicar pedido. Use chave de idempotência ou consulta por identificador de operação, se API suportar. Erros 400, 401, 403, 404, 409 e 500 carregam significados distintos; código deve corresponder ao contrato, não ocultar toda exceção sob 200. Teste concorrência, validação, autorização e corpo de resposta sem expor informações sensíveis.",
    "connection": "No banco, **UNIQUE** e controle de transações impedem duas reservas iguais e protegem contra corrida. No frontend, desabilitar temporariamente botão ajuda UX, mas não elimina duplicatas por retry de rede. E usar GET para criar reserva viola semântica segura do método. A chave de idempotência não substitui autenticação, nem deve permitir que outro usuário recupere dados sensíveis de operação alheia.",
    "exam": "Se a banca descreve POST enviado duas vezes após timeout, o problema pede idempotência de operação ou controle equivalente, não simplesmente aumentar banda. Se a resposta é 409 Conflict, examine regra de estado; 401 e 403 tratam credenciais/permissão. Uma resposta HTTP 200 pode existir sem significar que dados corretos foram persistidos: testes precisam conferir o estado resultante.",
    "caseTitle": "Como impedir que um timeout crie dois agendamentos",
    "caseSteps": [
      "Cliente envia POST /agendamentos com chave `tentativa-456` e recebe timeout apesar de o servidor ter processado.",
      "Servidor registra operação concluída e sua chave de idempotência com dados de resultado em transação coerente.",
      "Cliente tenta novamente com mesma chave; servidor devolve resposta correspondente sem criar outro agendamento.",
      "Teste retries simultâneos, chave reutilizada com conteúdo diferente e autorização para consultar o resultado."
    ],
    "pitfalls": [
      "Timeout de rede não prova que operação não foi executada.",
      "Desabilitar botão não é controle suficiente de concorrência.",
      "POST não tem idempotência garantida por padrão.",
      "A chave de idempotência não substitui autenticação nem autorização."
    ],
    "cards": [
      [
        "Por que timeout após POST é ambíguo?",
        "Porque o servidor pode ter confirmado operação mesmo que resposta não tenha chegado ao cliente."
      ],
      [
        "O que chave de idempotência permite?",
        "Reconhecer tentativas repetidas da mesma operação e evitar duplicação de efeitos."
      ],
      [
        "Que papel UNIQUE pode ter no agendamento?",
        "Impor restrição de unicidade coerente com regras de recurso e horário no banco."
      ],
      [
        "Por que não criar reservas por GET?",
        "Porque GET possui semântica segura de consulta e não deve ser usado para modificar estado solicitado."
      ]
    ]
  }
] satisfies EditorialSeed[])
