"""Bancos de dados, engenharia e programação: currículo de concursos TI."""
CURRICULUM = {
  "Banco de Dados e SQL": [
    [
      "Modelagem",
      "Modelo entidade-relacionamento e cardinalidade",
      "Modelo ER representa entidades, atributos, relacionamentos e cardinalidades antes da implementação física. Chave candidata identifica unicamente linha conforme regras; chave estrangeira conecta tabelas sob integridade referencial.",
      "Um paciente pode realizar vários exames; cada exame pertence a paciente conforme modelo. No relacional, tabela Exame referencia Paciente por paciente_id e restrição FOREIGN KEY pode impedir vínculo a paciente inexistente.",
      "Se paciente 10 possui exames 1,2,3, consulta JOIN retorna três linhas, não um paciente duplicado fisicamente. Relatório de pacientes distintos deve contar chaves de paciente conforme granularidade.",
      "Pegadinha: cardinalidade declarada no diagrama não assegura implementação se constraints e regras de aplicação não sustentam vínculo."
    ],
    [
      "Modelagem",
      "Dependências funcionais e normalização 1FN/2FN/3FN",
      "Uma dependência X→Y indica que cada valor de X determina um Y na relação considerada. Normalização reduz anomalias de inserção, atualização e exclusão ao separar atributos que pertencem a dependências diferentes.",
      "Se inscrição possui chave (aluno_id,curso_id) mas curso_nome depende somente de curso_id, há dependência parcial que motiva tabela Curso. Em 3FN, procure dependências transitivas indevidas de atributos não chave.",
      "Ao mudar nome do curso, sem normalização seria necessário atualizar milhares de inscrições. Com tabela Curso, nome fica numa linha referenciada, reduzindo inconsistência.",
      "Pegadinha: 1FN não é simplesmente 'ter chave primária' nem significa que dividir tudo sempre melhora desempenho; decisões de desnormalização exigem controle."
    ],
    [
      "SQL",
      "DDL, DML, DCL e transações",
      "DDL define estruturas como CREATE TABLE e ALTER TABLE; DML manipula dados com INSERT, UPDATE, DELETE; DCL trata concessão/revogação de privilégios, conforme SGBD; comandos transacionais controlam confirmação ou reversão.",
      "Separe alteração da estrutura da alteração de conteúdo. Um usuário com SELECT não recebe automaticamente UPDATE; a camada de permissões deve refletir operação necessária.",
      "CREATE TABLE pacientes define estrutura, INSERT insere registros e GRANT SELECT concede leitura sob regras da base. Um DROP TABLE pode remover estrutura e dados em contexto pertinente.",
      "Pegadinha: classificações variam na literatura para SELECT/DQL; avalie terminologia do edital. SQL não é apenas linguagem de consulta."
    ],
    [
      "SQL",
      "JOIN: INNER, LEFT e cardinalidade de relatórios",
      "INNER JOIN seleciona combinações que correspondem à condição; LEFT JOIN preserva linhas da esquerda sem correspondente com campos NULL do lado direito. Multiplicação de linhas decorre da granularidade dos relacionamentos.",
      "Clientes com pedidos: Ana tem dois, Bruno zero. LEFT JOIN Cliente-Pedido mantém Bruno com campos do pedido NULL; COUNT(p.id) devolve zero, enquanto COUNT(*) contaria a linha preservada como um.",
      "Após juntar Pedido e Item, somar total de pedido em cada linha pode multiplicar receita por quantidade de itens. Agregue no nível correto ou use DISTINCT quando responder precisamente à pergunta.",
      "Pegadinha: filtro WHERE sobre lado direito de LEFT JOIN pode eliminar linhas preservadas e mudar efeito para semelhante a INNER JOIN."
    ],
    [
      "SQL",
      "GROUP BY, HAVING e agregações",
      "WHERE filtra linhas antes do agrupamento lógico; GROUP BY reúne por chave de grupo; HAVING filtra grupos segundo agregações. COUNT(*) conta linhas, COUNT(coluna) ignora NULL.",
      "Consulta SELECT setor,COUNT(*) FROM chamados WHERE status='aberto' GROUP BY setor HAVING COUNT(*)>=3 mostra setores com pelo menos três registros abertos, não todos os chamados do setor.",
      "Se uma chamada está ligada a três atualizações históricas, JOIN com histórico triplica linhas. Para contar chamados, conte DISTINCT chamado.id ou agregue antes.",
      "Pegadinha: somar valores duplicados por JOIN sem conferir cardinalidade pode produzir números plausíveis, mas incorretos. ORDER BY é necessário para ordem garantida."
    ],
    [
      "Transações",
      "ACID, isolamento e concorrência MVCC",
      "Atomicidade assegura tratamento da transação como unidade, consistência preserva restrições definidas, isolamento controla interferência entre transações, durabilidade trata persistência após commit segundo garantia do SGBD.",
      "MVCC em bancos como PostgreSQL permite leituras de versões sob regras de isolamento. Read Committed e Serializable oferecem comportamentos diferentes; concorrência pode gerar conflitos que exigem retry transacional apropriado.",
      "Duas reservas leem último assento disponível. UPDATE condicional WHERE vagas>0 dentro de transação e conferência de linhas afetadas ajudam impedir venda duplicada; BEGIN/COMMIT sozinhos não resolvem lógica incorreta.",
      "Pegadinha: commit bem-sucedido não comprova autorização ou cumprimento de regra de negócio; restrições UNIQUE e FOREIGN KEY protegem outras invariantes."
    ],
    [
      "Desempenho",
      "Índices B-tree, composto e EXPLAIN",
      "Índice B-tree organiza chaves ordenadas para buscas específicas; melhora certos filtros e ordenações, mas custa memória/disco e manutenção na escrita. Otimizador escolhe plano considerando estimativas de custos.",
      "Índice (cliente_id,data) ajuda consultas filtradas por cliente e data, mas não oferece mesma utilidade garantida para filtro isolado por data. EXPLAIN mostra plano; EXPLAIN ANALYZE executa, exigindo cautela em comandos de escrita.",
      "Se 95% dos registros têm status='ativo', índice pode ser menos eficiente que leitura sequencial. Para busca de ID único, índice da chave primária costuma ser útil.",
      "Pegadinha: existência do índice não obriga seu uso; ORDER BY define ordenação de apresentação e não deve ser dispensado por aparente ordem de índice."
    ],
    [
      "Operação",
      "Backup lógico, WAL, PITR e replicação",
      "Dump lógico exporta estrutura/dados sob mecanismo; backup físico consistente mantém estado recuperável do banco; WAL registra alterações para recuperação. PITR busca restaurar até ponto temporal quando base e logs necessários estão disponíveis.",
      "Planeje frequência, retenção, testes, controle de acesso e integridade de cópias. Replicação de alterações não substitui backup histórico porque pode propagar DROP, DELETE ou corrupção.",
      "Banco faz backup base 00h e archiva WAL. Se houver cobertura contínua e integridade dos segmentos, pode ser possível restaurar estado próximo a 14h, conforme retenção e procedimento. Sem WAL não presuma PITR.",
      "Pegadinha: copiar arquivos ativos do diretório de dados sem procedimento suportado pode produzir cópia inconsistente. RTO de recuperação precisa incluir aplicação e conexões."
    ],
    [
      "NoSQL",
      "Relacional, documentos, chave-valor, grafos e colunar",
      "Banco relacional usa tabelas e relações com SQL; bancos documentais guardam documentos estruturados; chave-valor otimiza acesso por chave; grafos modelam relações; colunar orienta certas cargas analíticas. Cada modelo tem compromissos.",
      "Escolha conforme padrão de acesso, consistência, transações, escala, esquema e consultas. Não trate NoSQL como ausência de qualquer linguagem de consulta ou como incapaz de transações em todos os produtos.",
      "Registro de eventos com estrutura variável pode caber em documentos; consultas complexas com várias relações e integridade forte podem favorecer relacional. Uma arquitetura híbrida pode ser necessária.",
      "Pegadinha: 'NoSQL é sempre mais rápido' é falso sem definir operação, índices, hardware e volume. Produto específico pode implementar mais de um modelo."
    ]
  ],
  "Engenharia de Software": [
    [
      "Requisitos",
      "Elicitação, requisitos funcionais e não funcionais",
      "Elicitar requisitos é compreender necessidades e regras junto a partes interessadas; requisitos funcionais descrevem comportamento e não funcionais qualidades verificáveis como desempenho, segurança e disponibilidade.",
      "Transforme fala vaga em critérios mensuráveis. 'Sistema rápido' precisa de operação, carga, latência e percentil; 'usuários não podem ver dados de outros' exige autorização por recurso no backend.",
      "História 'como recepcionista quero registrar comparecimento' requer casos para agendado válido, duplicidade, falha de conexão, usuário sem permissão e auditabilidade. Testes devem refletir esses critérios.",
      "Pegadinha: história de usuário não substitui validações e contratos de interface. Um requisito não funcional não é necessariamente opcional."
    ],
    [
      "Modelagem",
      "UML: classes, sequência, casos de uso e atividades",
      "Diagramas UML representam perguntas diferentes: classe detalha estrutura; sequência mostra mensagens no tempo; caso de uso apresenta objetivos do ator; atividade descreve fluxo e decisão.",
      "No sistema de agendamento, caso de uso 'confirmar chegada' envolve recepção; classe Agendamento guarda estado; sequência mostra UI→API→banco; atividade modela caminhos para identificação válida e inválida.",
      "Uma classe com relacionamento 1:N indica cardinalidade prevista, mas o backend deve implementar regras correspondentes no banco. Diagrama de sequência pode mostrar caminho de erro 403.",
      "Pegadinha: desenho não é prova de comportamento correto; use modelo como instrumento de comunicação e associe requisitos aos testes."
    ],
    [
      "Arquitetura",
      "Coesão, acoplamento e SOLID",
      "Coesão mede concentração de responsabilidades relacionadas; acoplamento mede dependências entre módulos. Princípios SOLID orientam desenho extensível e manutenível, sem obrigar herança em todos os casos.",
      "Uma classe que mistura acesso ao banco, geração de PDF, autenticação e envio de e-mail tem várias razões para mudar; separar funções por fronteiras reduz impacto de alterações e facilita testes.",
      "Serviço de notificação depende de interface Enviar e admite implementações SMS e e-mail sem alterar lógica central de atendimento. Contratos precisam respeitar substituição e tratamento de falhas.",
      "Pegadinha: criar dezenas de interfaces para problema pequeno também tem custo. Design deve responder às mudanças prováveis e critérios reais."
    ],
    [
      "Arquitetura",
      "Monólitos, microsserviços e comunicação assíncrona",
      "Monólito organiza aplicação em unidade de implantação; microsserviços separam serviços implantáveis com interfaces e dados sob governança apropriada. Comunicação síncrona depende de resposta imediata; assíncrona usa fila/eventos.",
      "Considere acoplamento, latência, consistência, falhas distribuídas e operação. Fila pode amortecer picos, mas exige idempotência, retry, tratamento de mensagens duplicadas e observabilidade.",
      "Sistema de laudos envia mensagem de 'exame disponível' para serviço de notificação. Se houver duplicidade na fila, consumidor deve evitar mandar notificação repetida conforme regra.",
      "Pegadinha: microsserviços não são automaticamente melhores nem mais rápidos que monólito. A fragmentação pode dificultar transações e diagnóstico."
    ],
    [
      "APIs",
      "HTTP, REST, idempotência e erros",
      "API define contrato de recursos, métodos, formatos, autenticação e estados. GET lê sem efeitos pretendidos de escrita; PUT possui semântica idempotente; POST pode criar múltiplas operações se repetido.",
      "Após timeout de POST para pagamento, cliente não sabe se cobrança ocorreu. Chave de idempotência implementada com armazenamento transacional pode associar reenvios ao mesmo resultado.",
      "POST /reservas com chave abc é reenviado após perda de resposta. Backend detecta abc e devolve resultado anterior em vez de criar duplicidade, considerando janela e concorrência.",
      "Pegadinha: HTTP 200 não garante que regra institucional foi cumprida; autorização deve ser testada para cada recurso, não apenas login."
    ],
    [
      "Testes",
      "Testes de unidade, integração, E2E e aceitação",
      "Teste unitário verifica componente isolado; integração confere interação com API/banco; E2E percorre jornada; aceitação compara resultado a critérios do usuário. Cada nível descobre classes distintas de falhas.",
      "Crie casos normais, extremos e negativos. Teste autenticado A tentando ler dados B, além de verificar que interface esconde botão. Cobertura de linha mostra execução, não qualidade das asserções.",
      "Salvar anotação não deve marcar aula como concluída. Teste envia nota, consulta progresso, confirma done=false; depois conclui uma vez, repete requisição e confirma minutos não duplicados.",
      "Pegadinha: simular banco SQLite não garante mesmo comportamento de pool, tipos e locks PostgreSQL; teste integrado separado continua necessário."
    ],
    [
      "Processos",
      "Scrum: papéis, eventos, incremento e DoD",
      "Scrum organiza trabalho complexo em Sprints com Product Owner, Scrum Master e Developers segundo responsabilidades. Eventos de planejamento, inspeção e adaptação possuem finalidades específicas.",
      "Incremento deve cumprir Definition of Done, e Sprint Review inspeciona produto com partes interessadas; Retrospective inspeciona forma de trabalho. Daily Scrum ajuda Developers inspecionarem progresso em direção ao objetivo do Sprint.",
      "A equipe demonstra formulário visual, mas não testou autenticação nem persistência: pode não atender DoD acordada e portanto não constitui incremento concluído.",
      "Pegadinha: Scrum não é processo obrigatório para todo órgão e não elimina documentação exigida. Product Owner não é automaticamente gerente hierárquico de todos."
    ],
    [
      "Qualidade",
      "ISO/IEC 25010, qualidade de produto e métricas",
      "ISO/IEC 25010 organiza características de qualidade de produto em modelo padronizado, com versões e atualizações que precisam ser conferidas conforme edital. Qualidade inclui aspectos de desempenho, confiabilidade, segurança, manutenção e adequação funcional, entre outros.",
      "Defina medições: tempo de resposta p95, taxa de falhas, facilidade de manutenção e capacidade de recuperação. Número de linhas ou de telas criadas não mede diretamente qualidade percebida.",
      "Sistema responde rápido, mas retorna prontuário de outro usuário. Bom desempenho não compensa falha de segurança/adequação; cada característica precisa de critérios e testes.",
      "Pegadinha: a norma descreve modelo de qualidade, não assegura certificação automática de um software só por usar nome das características."
    ]
  ],
  "Programação e Algoritmos": [
    [
      "Algoritmos",
      "Variáveis, atribuição e fluxos de controle",
      "Algoritmo transforma entradas em saídas por operações bem definidas; variável guarda estado ou referência conforme linguagem e tipo. Condicionais escolhem caminhos e laços repetem passos sob critérios.",
      "Para somar 1 a n, inicie soma=0 e repita i=1 até n: soma=soma+i. Para n=4, estados de soma são 1,3,6,10. Uma fórmula fechada n(n+1)/2 evita laço sob modelo aritmético.",
      "Se usuário fornece n negativo, o algoritmo precisa definir comportamento: rejeitar, retornar zero ou estender cálculo? Sem contrato, teste não pode julgar saída com segurança.",
      "Pegadinha: atribuição soma←soma+1 não é igualdade matemática tradicional; uma variável pode mudar de valor durante execução."
    ],
    [
      "Algoritmos",
      "Complexidade Big-O: constante, linear e quadrática",
      "Big-O descreve limite assintótico de crescimento de custo conforme tamanho n e modelo. Busca por índice em array típico é O(1); busca sequencial sem índice é O(n); dois laços aninhados com n iterações são O(n²).",
      "Conte operações dominantes. Dois laços sequenciais cada um percorrendo n elementos resultam O(n)+O(n)=O(n), não O(n²). Busca binária exige dados ordenados e reduz espaço por fator aproximadamente 2 a cada passo.",
      "Em vetor ordenado de 1024 elementos, busca binária divide intervalo em metade cerca de dez vezes, enquanto busca linear pode inspecionar até 1024 valores.",
      "Pegadinha: O(1) não significa zero custo; constantes, cache, I/O e pior caso ainda importam na prática."
    ],
    [
      "Estruturas",
      "Arrays e listas encadeadas",
      "Array guarda elementos em posições indexadas com acesso direto típico; lista encadeada usa nós com referências a próximos e eventualmente anteriores. A escolha depende das operações mais frequentes.",
      "Em array, inserção no começo pode deslocar n elementos; em lista com referência ao nó correto, ajuste de ponteiros pode ser O(1), mas localizar posição ainda pode custar O(n).",
      "Uma fila implementada por array com deslocamento a cada remoção pode custar O(n); buffer circular evita deslocar todos os itens e permite operações eficientes.",
      "Pegadinha: lista encadeada não é sempre mais rápida: uso de memória, localidade de cache e busca por índice são fatores relevantes."
    ],
    [
      "Estruturas",
      "Pilhas, filas e deques",
      "Pilha usa LIFO: último elemento inserido é primeiro removido. Fila usa FIFO: primeiro inserido é primeiro removido. Deque permite inserção e remoção em ambas extremidades segundo estrutura.",
      "Use push/pop para pilha, enqueue/dequeue para fila. Escolha estrutura pelo contrato: histórico de desfazer pode usar pilha; solicitações sem prioridade podem usar fila.",
      "Operações A, B, C numa pilha são retiradas C, B, A. Em fila entram A, B, C e saem A, B, C se nenhuma regra adicional alterar ordem.",
      "Pegadinha: fila de prioridade não é FIFO pura; elemento pode sair por prioridade, não apenas tempo de chegada."
    ],
    [
      "Estruturas",
      "Árvores binárias, BST e heaps",
      "Árvore organiza nós por relação pai/filhos; BST mantém chaves à esquerda/direita sob regra de ordem; heap mantém prioridade do pai sobre filhos, sem ordenar todos os elementos como BST.",
      "Em BST equilibrada, busca pode custar O(log n); em árvore degenerada, O(n). Em heap máximo, raiz contém valor máximo, e inserção/remoção ajustam estrutura sob regras.",
      "Para agendador que precisa retirar tarefa de maior prioridade, heap é opção comum; para percorrer chaves em ordem, BST ou estrutura ordenada pode ser mais adequada.",
      "Pegadinha: percorrer heap em qualquer ordem não entrega valores totalmente ordenados. Árvore binária não significa automaticamente BST."
    ],
    [
      "Estruturas",
      "Tabelas hash e colisões",
      "Tabela hash converte chave em posição ou grupo de posições; colisões ocorrem quando chaves diferentes levam a mesma área, exigindo tratamento. Busca média pode ser O(1) sob hipóteses de distribuição e carga.",
      "Calcule hash, encontre bucket, trate colisão por encadeamento ou sondagem conforme implementação. Fator de carga alto pode reduzir desempenho e provocar redimensionamento.",
      "Duas strings diferentes produzem mesmo bucket por módulo pequeno: sistema deve comparar chave inteira, não apenas número do bucket, para evitar retornar usuário errado.",
      "Pegadinha: hash de estrutura de dados não equivale automaticamente a hash criptográfico resistente a colisões e ataques."
    ],
    [
      "Programação",
      "Recursão e caso base",
      "Recursão define função em termos de chamadas a si própria para subproblema menor, com condição de término. Sem caso base alcançável, execução pode crescer até estourar pilha.",
      "Fatorial n!: f(0)=1 e f(n)=n×f(n−1) para n positivo. f(4)=4×3×2×1=24. A cada chamada, variáveis locais ocupam contexto conforme implementação.",
      "Para percorrer árvore, função processa nó e chama filhos; deve testar nó nulo antes de acessar atributos. Profundidade muito grande pode exigir alternativa iterativa.",
      "Pegadinha: recursão não é automaticamente mais eficiente que laço; pode introduzir custo de chamadas e memória."
    ],
    [
      "Paradigmas",
      "Orientação a objetos, herança e polimorfismo",
      "Classe define estrutura e comportamento, objeto é instância; encapsulamento protege invariantes e oferece interface. Herança permite especialização; polimorfismo suporta várias implementações de contrato comum.",
      "Uma interface Enviar recebe implementações Email e SMS. Serviço chama interface, não precisa saber detalhes; testes podem usar implementação fake sem enviar mensagens reais.",
      "Uma subclasse que altera contrato, lança exceção inesperada ou viola pós-condição pode quebrar substituição de Liskov, embora sintaxe permita herdar.",
      "Pegadinha: preferir composição em certos casos reduz acoplamento, mas não existe regra de proibir toda herança."
    ],
    [
      "Programação",
      "Concorrência, sincronização e condições de corrida",
      "Concorrência permite progresso intercalado de atividades; paralelismo executa simultaneamente quando recursos permitem. Acesso compartilhado sem coordenação pode perder atualização e produzir estado inválido.",
      "Dois workers leem vagas=1 e ambos tentam reservar. Lock ou operação atômica com condição no banco protege invariantes, mas deve considerar tempo de bloqueio e deadlock.",
      "Com incremento contador=10 em duas threads, ambas leem 10 e gravam 11; resultado desejado era 12. Use atomic increment/mutex e teste em concorrência real.",
      "Pegadinha: ter async/await não transforma operação em atômica nem garante ganho de CPU; o modelo de execução depende da linguagem/runtime."
    ]
  ]
}
