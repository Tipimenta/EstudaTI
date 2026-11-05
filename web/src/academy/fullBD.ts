import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullBD=buildChapters([
  {
    "id": 13,
    "title": "Modelagem relacional: por que clientes e pedidos ficam em tabelas diferentes",
    "goal": "Definir entidade, atributo, chave e relacionamento e entender por que duplicação dificulta manter dados consistentes.",
    "context": "Imagine uma loja que salva nome e telefone do cliente dentro de cada pedido. Maria faz quinze compras; se muda de telefone, quinze registros precisam ser atualizados e uma alteração esquecida gera contradição. **Modelar dados** significa decidir quais fatos devem ser registrados, como se relacionam e quais regras mantêm significado. Uma **entidade** pode representar um cliente ou pedido; **atributo** é característica armazenada, como nome ou data; **tabela relacional** organiza colunas e linhas para representar esses fatos.",
    "explanation": "Uma tabela `clientes(id, nome, telefone)` guarda dados do cliente. Uma tabela `pedidos(id, cliente_id, data)` guarda cada pedido. O **id** de Clientes é uma **chave primária**, que identifica unicamente um registro. O **cliente_id** de Pedidos é uma **chave estrangeira**, que referencia um cliente e impede relações inexistentes quando há restrição adequada. O **relacionamento um-para-muitos** significa que um cliente pode ter vários pedidos, enquanto cada pedido pertence a um cliente no modelo escolhido. Separar tabelas evita repetir todos os dados do cliente por compra.",
    "connection": "Um **índice** pode acelerar buscas por cliente_id, mas não corrige uma modelagem errada. Uma **constraint** (restrição) como `NOT NULL`, `UNIQUE` ou `FOREIGN KEY` ajuda o SGBD a rejeitar dados que não respeitam regras definidas. Um JOIN recupera informações relacionadas sem exigir duplicação no armazenamento. Pense em três decisões diferentes: quais fatos existem (modelo), quais regras os tornam válidos (integridade) e como consultá-los (SQL).",
    "exam": "Quando a prova disser que a chave primária pode ter vários valores iguais, rejeite: ela deve identificar cada linha. Se oferece copiar nome do cliente para cada pedido como única solução de consulta, lembre que normalização e relacionamento resolvem redundância. Não confunda **chave estrangeira** com índice: a primeira expressa vínculo/restrição; índices podem ser criados para desempenho conforme SGBD e padrão de consultas.",
    "caseTitle": "Faça a separação de clientes e pedidos",
    "caseSteps": [
      "Registro inicial mistura pedido 100 e cliente Ana em uma única linha que repete telefone a cada compra.",
      "Crie Clientes(id,nome,telefone) com um registro por cliente, identificável por id único.",
      "Crie Pedidos(id,cliente_id,data) e defina cliente_id referenciando Clientes.id.",
      "Para mostrar o cliente de um pedido use JOIN, mantendo atualização do telefone numa única tabela."
    ],
    "pitfalls": [
      "Chave primária identifica linhas sem duplicação de valor.",
      "Chave estrangeira não é a mesma coisa que índice.",
      "Duplicar dados pode criar problemas de atualização e inconsistência.",
      "Um-para-muitos descreve cardinalidade escolhida, não obrigação de todo modelo."
    ],
    "cards": [
      [
        "Para que serve chave primária?",
        "Identificar de forma única cada registro da tabela, conforme restrição definida."
      ],
      [
        "O que significa chave estrangeira?",
        "Campo ou conjunto de campos que referencia chave de outra tabela, expressando relação e integridade."
      ],
      [
        "Por que separar Clientes e Pedidos?",
        "Para registrar dados próprios de cada entidade, reduzir repetição e relacioná-los por identificadores."
      ],
      [
        "O que significa cardinalidade um-para-muitos?",
        "Uma linha de uma entidade pode relacionar-se com várias de outra, conforme regras do domínio."
      ]
    ]
  },
  {
    "id": 59,
    "title": "SQL SELECT: aprenda a montar uma consulta do que você quer descobrir",
    "goal": "Construir SELECT, FROM, WHERE e ORDER BY a partir de perguntas sobre dados, distinguindo filtro e ordenação.",
    "context": "Um setor guarda exames numa tabela `exames(id, paciente, status, data)`. O gestor pergunta quais exames estão pendentes. Um **banco relacional** guarda dados em linhas e colunas; uma **consulta SQL** formula pergunta ao SGBD. `SELECT` escolhe as expressões ou colunas exibidas; `FROM` identifica origem dos dados. Por exemplo, `SELECT paciente,status FROM exames` devolve essas duas informações de cada linha considerada, sem modificar os registros.",
    "explanation": "Para mostrar apenas pendentes, use `WHERE status = 'pendente'`. O **WHERE** filtra registros que satisfazem condição. A comparação `=` verifica igualdade do valor; `AND` exige condições simultâneas; `OR` permite alternativas. `ORDER BY data DESC` ordena do maior para o menor valor de data; `ASC` faz a ordem ascendente. `SELECT paciente FROM exames WHERE status='pendente' ORDER BY data DESC` reúne essas operações. Diferencie **ordem lógica de interpretação** dos comandos da maneira como estão escritos: primeiro pensamos origem e filtro, depois projeção e ordem final.",
    "connection": "Consultas não retornam linhas necessariamente numa ordem confiável sem `ORDER BY`. O banco pode usar índices e planos diferentes, alterando a sequência de resultados. `NULL` representa ausência de valor conhecido segundo semântica SQL: não se verifica com `= NULL`, e sim com `IS NULL`. Essa particularidade prepara o estudo de SQL com lógica de três valores, em que comparação com nulo pode resultar **UNKNOWN** em vez de verdadeiro ou falso.",
    "exam": "Questões trocam `WHERE` por `ORDER BY` e induzem erro: ordenar não exclui linhas. Também podem usar `WHERE coluna = NULL`, que não encontra os registros nulos pela comparação convencional. `SELECT *` traz todas as colunas do resultado, mas não significa todas as tabelas do banco. Ao montar consulta, traduza a pergunta: quais colunas mostrar? de qual tabela? quais registros? em que ordem?",
    "caseTitle": "Liste os exames pendentes do mais recente para o mais antigo",
    "caseSteps": [
      "Tabela exames contém id,paciente,status,data; objetivo é mostrar paciente e data de registros pendentes.",
      "Escolha projeção `SELECT paciente,data FROM exames` para buscar as colunas necessárias.",
      "Acrescente `WHERE status='pendente'` para filtrar apenas os registros desejados.",
      "Use `ORDER BY data DESC` para apresentar primeiro a data mais recente, sem alterar a tabela."
    ],
    "pitfalls": [
      "WHERE filtra linhas; ORDER BY apenas ordena o resultado.",
      "Sem ORDER BY não há garantia geral de ordenação estável.",
      "NULL requer IS NULL ou IS NOT NULL na comparação de ausência.",
      "SELECT * não quer dizer selecionar todas as tabelas do banco."
    ],
    "cards": [
      [
        "O que a cláusula SELECT define?",
        "Quais expressões e colunas compõem o resultado da consulta."
      ],
      [
        "O que a cláusula WHERE faz?",
        "Mantém as linhas que satisfazem a condição de filtro."
      ],
      [
        "O que ORDER BY data DESC significa?",
        "Ordenar as linhas por data em ordem decrescente, geralmente mais recente primeiro."
      ],
      [
        "Por que usar IS NULL em vez de = NULL?",
        "Porque a comparação com NULL segue lógica de desconhecido; IS NULL testa especificamente a ausência."
      ]
    ]
  },
  {
    "id": 60,
    "title": "JOIN: como combinar duas tabelas sem multiplicar linhas por engano",
    "goal": "Compreender INNER JOIN, LEFT JOIN e cardinalidade usando clientes que possuem ou não pedidos.",
    "context": "Uma tabela Clientes tem três pessoas, e Pedidos registra compras de duas delas. O gestor quer uma lista com o nome e cada pedido feito, mas também quer saber **quem nunca comprou**. Isso exige combinar tabelas: o **JOIN** expressa como linhas se relacionam por uma condição. A comparação típica usa `Pedidos.cliente_id = Clientes.id`. **Cardinalidade** descreve quantas linhas de uma tabela podem corresponder às linhas de outra, e é essencial para prever quantos resultados aparecerão.",
    "explanation": "`INNER JOIN` retorna pares que atendem à condição. Se Ana tem três pedidos, Ana aparece três vezes no resultado — uma vez por pedido. `LEFT JOIN` parte de todas as linhas da tabela à esquerda e inclui correspondências da direita; onde não há pedido, colunas de Pedidos ficam NULL. Exemplo: `SELECT c.nome,p.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id`. Um **alias** como `c` ou `p` é apelido de tabela na consulta, útil para indicar a origem de cada coluna.",
    "connection": "Um JOIN com condição inadequada pode criar explosão de linhas: se não relacionar corretamente IDs, dados de muitos clientes podem combinar com pedidos errados. Isso influencia `COUNT(*)`, que conta linhas do resultado, e `COUNT(p.id)`, que conta valores não nulos da coluna de pedidos. Para listar clientes sem pedido, um LEFT JOIN com `WHERE p.id IS NULL` é uma solução típica. Entenda primeiro a correspondência entre entidades antes de escolher tipo de JOIN.",
    "exam": "A banca pode afirmar que LEFT JOIN devolve apenas os registros que possuem correspondência; isso define INNER JOIN, não LEFT. Pode perguntar por que o resultado tem mais linhas que a tabela Cliente: há relação um-para-muitos com vários pedidos. Em alternativa SQL, examine condição `ON` e lado preservado antes de julgar nomes de JOIN.",
    "caseTitle": "Encontre clientes sem pedidos",
    "caseSteps": [
      "Clientes possui Ana, Bruno e Carla; Pedidos possui compras de Ana e Bruno, mas nenhuma de Carla.",
      "Use `clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id`, preservando todos os clientes.",
      "Onde não há pedido, p.id será NULL; filtre `WHERE p.id IS NULL`.",
      "O resultado contém Carla, sem confundir 'sem pedidos' com pedido de valor zero."
    ],
    "pitfalls": [
      "INNER JOIN não preserva automaticamente linhas sem correspondência.",
      "LEFT JOIN preserva linhas da tabela à esquerda e pode retornar NULLs à direita.",
      "JOIN um-para-muitos pode multiplicar linhas resultantes.",
      "COUNT(*) e COUNT(coluna) divergem quando existem valores NULL."
    ],
    "cards": [
      [
        "O que INNER JOIN preserva?",
        "Pares de linhas que atendem à condição de junção definida."
      ],
      [
        "O que LEFT JOIN faz quando falta correspondência?",
        "Mantém a linha da tabela à esquerda com colunas da direita preenchidas por NULL."
      ],
      [
        "Por que Ana com três pedidos aparece três vezes num JOIN?",
        "Porque há três linhas relacionadas em Pedidos, formando três pares distintos."
      ],
      [
        "Como localizar clientes sem pedidos com LEFT JOIN?",
        "Use junção por ID e filtre registros com identificador de pedido NULL."
      ]
    ]
  },
  {
    "id": 61,
    "title": "GROUP BY e HAVING: quando filtrar linhas e quando filtrar grupos",
    "goal": "Diferenciar registros individuais, grupos agregados e condições de HAVING com exemplos de contagens.",
    "context": "Uma loja quer descobrir **quantos pedidos cada cliente fez**. Se consultarmos linhas individuais, veremos cada pedido separado; precisamos reunir registros por cliente para calcular totais. `GROUP BY` cria grupos de linhas que compartilham valores de determinadas expressões. Uma **função de agregação** resume dados de cada grupo, como `COUNT` para contagem ou `SUM` para soma. Assim `SELECT cliente_id,COUNT(*) FROM pedidos GROUP BY cliente_id` apresenta um total por cliente.",
    "explanation": "`WHERE` é aplicado às linhas antes da formação dos grupos. Por exemplo, `WHERE status='pago'` limita a consulta a pedidos pagos; depois agrupamos por cliente. `HAVING` filtra **grupos após a agregação**, como `HAVING COUNT(*) >= 3` para manter apenas clientes com três ou mais pedidos pagos. O resultado pode ser ordenado por `ORDER BY COUNT(*) DESC`. É importante não escrever uma coluna individual qualquer no SELECT de consulta agrupada quando ela não está agrupada nem agregada, salvo regras específicas do SGBD.",
    "connection": "A junção pode alterar contagem antes do agrupamento. Se você unir Clientes a Pedidos, clientes com vários pedidos produzirão várias linhas; isso é esperado, mas juntar uma terceira tabela com múltiplas linhas por pedido pode multiplicar artificialmente totalizações. `COUNT(DISTINCT p.id)` conta IDs diferentes quando a lógica exigir, mas não substitui corrigir JOIN inadequado. Saber o que é uma linha do resultado intermediário é o primeiro passo para interpretar agregados corretamente.",
    "exam": "Quando a condição envolve `COUNT(*) > 5`, em SQL de consulta agrupada o lugar típico é **HAVING**, não WHERE. Quando envolve `status='pago'`, pode ser WHERE antes de agregar. Não conclua que GROUP BY ordena resultados; uma ordem determinística exige ORDER BY. Bancas também cobram que COUNT(coluna) desconsidera NULL, ao passo que COUNT(*) conta linhas.",
    "caseTitle": "Clientes com três ou mais pedidos pagos",
    "caseSteps": [
      "Selecione linhas de Pedidos com `WHERE status='pago'`, pois apenas pagos devem entrar no total.",
      "Agrupe por `cliente_id` com `GROUP BY cliente_id` para criar conjunto por cliente.",
      "Calcule `COUNT(*)` e filtre usando `HAVING COUNT(*)>=3`.",
      "Ordene se necessário com `ORDER BY COUNT(*) DESC`; HAVING não equivale a ORDER BY."
    ],
    "pitfalls": [
      "WHERE filtra linhas antes do agrupamento; HAVING filtra grupos.",
      "GROUP BY não garante ordenação da saída.",
      "JOIN inadequado pode multiplicar contagens.",
      "COUNT(coluna) ignora NULLs, diferentemente de COUNT(*)."
    ],
    "cards": [
      [
        "O que GROUP BY produz?",
        "Grupos de linhas com valores comuns para permitir agregações por grupo."
      ],
      [
        "Quando usar HAVING?",
        "Para filtrar grupos segundo resultado agregado, como COUNT(*) maior que um limite."
      ],
      [
        "Qual a diferença entre WHERE e HAVING?",
        "WHERE filtra linhas de entrada; HAVING filtra resultados de grupos agregados."
      ],
      [
        "GROUP BY substitui ORDER BY?",
        "Não. Agrupar e ordenar são operações distintas, e a ordenação deve ser expressa quando necessária."
      ]
    ]
  },
  {
    "id": 65,
    "title": "SQL seguro: permissões, papéis e consultas parametrizadas",
    "goal": "Diferenciar GRANT, REVOKE, papéis e injeção SQL com autorização de banco e segurança da aplicação.",
    "context": "Um sistema de recepção só precisa consultar agendamentos, mas sua conta de banco possui permissão para excluir qualquer tabela. Se alguém explorar a aplicação, o impacto pode ser muito maior. **Privilégio** é uma permissão específica no banco, como SELECT, INSERT ou UPDATE. **Papel (role)** agrupa atribuições de privilégios conforme o SGBD; **GRANT** concede e **REVOKE** retira determinados privilégios. O objetivo é usar **menor privilégio**: cada identidade deve ter apenas as operações necessárias.",
    "explanation": "Uma conta de aplicação que só consulta relatórios pode receber SELECT sobre tabelas ou visões necessárias, sem permissão geral de DROP. Uma **view (visão)** é consulta nomeada que apresenta uma representação dos dados, podendo ajudar a restringir quais colunas/linhas são expostas quando acompanhada de controles apropriados. Outro risco é a **injeção SQL**, quando entrada do usuário é incorporada como comando, por exemplo concatenando `' WHERE nome=' + input`. **Consultas parametrizadas** separam estrutura SQL e valores fornecidos, reduzindo risco de a entrada alterar a lógica do comando.",
    "connection": "Proteger banco envolve duas camadas: **autorização do aplicativo** decide se usuário pode pedir determinada informação, e **permissões do banco** limitam o que a credencial da aplicação faz ao SGBD. Uma conta de banco com privilégios restritos reduz impacto de bugs, mas não substitui validação de autorização por paciente no servidor. Criptografia em trânsito e backups também protegem riscos diferentes. Nenhum controle único cobre tudo.",
    "exam": "Se a banca sugerir escapar aspas manualmente como única defesa contra injeção SQL, prefira parametrização conforme API/driver seguro. Se disser que REVOKE concede acesso, rejeite: é o comando de revogação. Se uma aplicação usa usuário administrativo para todas as consultas, isso viola menor privilégio. Em provas práticas, verifique diferença entre permissão de consultar tabela e autorização para consultar determinado registro pessoal.",
    "caseTitle": "A conta do portal público pode apagar prontuários",
    "caseSteps": [
      "Analise funções do portal: ele precisa buscar horários e criar agendamento, não apagar históricos clínicos.",
      "Defina papel de banco com operações estritamente necessárias e retire privilégios administrativos usando mecanismo apropriado.",
      "Parametrize entradas de busca e valide autorização no backend para dados de cada usuário.",
      "Teste acesso permitido e tentativa negada, confirmando que conta da aplicação não pode executar comando fora do escopo."
    ],
    "pitfalls": [
      "GRANT concede; REVOKE revoga privilégios segundo regras do SGBD.",
      "Conta da aplicação não deve ser administrador geral sem necessidade.",
      "Parametrização reduz injeção; não substitui autorização por recurso.",
      "View e privilégios ajudam restringir dados, mas configuração inadequada pode continuar expondo registros."
    ],
    "cards": [
      [
        "O que faz GRANT em SQL?",
        "Concede privilégios conforme objeto, usuário/papel e regras do SGBD."
      ],
      [
        "O que faz REVOKE?",
        "Revoga privilégios previamente concedidos, conforme o modelo de autorização do banco."
      ],
      [
        "Por que usar consultas parametrizadas?",
        "Para separar valores de entrada da estrutura do comando SQL, reduzindo risco de injeção."
      ],
      [
        "O que significa menor privilégio no banco?",
        "Conceder à identidade somente as operações necessárias para sua atividade real."
      ]
    ]
  },
  {
    "id": 66,
    "title": "Backup de banco: cópia lógica, física e recuperação consistente",
    "goal": "Entender diferença entre exportação lógica, backup físico, logs de transação e prova de restauração.",
    "context": "Uma empresa copia o arquivo do banco enquanto ele está ativo e imagina que poderá restaurá-lo a qualquer momento. Isso pode falhar se a cópia não capturar dados e logs de forma consistente. **Backup lógico** costuma exportar objetos e dados em formatos apropriados, como comandos ou arquivos de restauração. **Backup físico** copia estruturas físicas do banco segundo procedimento compatível com o SGBD. A escolha depende de volume, tempo disponível, recuperação desejada e garantias de consistência.",
    "explanation": "Um **dump** lógico pode permitir restaurar tabelas e dados em outro banco compatível, mas pode consumir tempo em bases grandes. Uma cópia física apropriada pode acelerar certas recuperações e, junto a **logs de transação**, possibilitar retorno a ponto específico no tempo (**PITR — Point-in-Time Recovery**) em tecnologias como PostgreSQL configuradas para isso. Não basta copiar uma pasta do banco em produção sem método suportado; o SGBD precisa manter garantias de consistência e recuperação durante o procedimento. Backup precisa considerar credenciais, configuração, extensões e dependências externas.",
    "connection": "O objetivo RPO determina quão recente deve ser o ponto de restauração; RTO determina tempo-alvo de retorno. Uma cópia feita diariamente sem mecanismo intermediário pode perder alterações de quase um dia. Logs arquivados e backups adequados podem reduzir perda tolerada, enquanto infraestrutura de restauração influencia tempo de recuperação. **Replica** não é substituto automático de backup: alterações indevidas podem ser propagadas à réplica.",
    "exam": "Se o enunciado diz que backup lógico exporta objetos/SQL e físico captura estrutura de armazenamento, identifique diferença. Se promete PITR sem logs ou mecanismos equivalentes, desconfie. Um teste de restauração deve confirmar integridade e funcionalidade das aplicações, não apenas existir arquivo de cópia. Pergunte qual falha está coberta e qual ponto histórico pode ser recuperado.",
    "caseTitle": "Um registro foi excluído às 10h05",
    "caseSteps": [
      "O banco tem backup físico válido da madrugada e logs de transação arquivados para recuperação.",
      "A equipe identifica horário adequado anterior à exclusão indevida e prepara ambiente separado de recuperação.",
      "Restaura cópia física e reproduz logs até o ponto desejado conforme procedimento do SGBD.",
      "Valida registros recuperados e decide reintegração segura; não sobrescreva produção sem plano e verificação."
    ],
    "pitfalls": [
      "Cópia de pasta de banco ativo sem método apropriado pode ser inconsistente.",
      "Replica pode reproduzir erros e exclusões do principal.",
      "PITR depende de histórico/logs e procedimento específico do SGBD.",
      "Backup só é confiável quando restauração foi testada."
    ],
    "cards": [
      [
        "O que é backup lógico?",
        "Exportação estruturada de objetos/dados para restauração compatível com o SGBD."
      ],
      [
        "O que caracteriza backup físico?",
        "Cópia apropriada das estruturas físicas do banco e dependências necessárias à recuperação."
      ],
      [
        "O que é PITR?",
        "Recuperação do banco a ponto específico no tempo usando backup e histórico adequado de transações."
      ],
      [
        "Por que réplica não substitui backup?",
        "Porque exclusões e corrupções podem ser replicadas, sem preservar versões anteriores restauráveis."
      ]
    ]
  },
  {
    "id": 106,
    "title": "Projeto de esquema: da necessidade à terceira forma normal",
    "goal": "Aplicar chaves, dependências funcionais e normalização para evitar anomalias de atualização.",
    "context": "Uma planilha de pedidos reúne `pedido_id`, `cliente_nome`, `cliente_telefone`, `produto_nome`, `produto_preco` e quantidade em cada linha. Isso parece prático, mas o telefone é repetido a cada pedido, e o preço de produto pode ser copiado várias vezes. **Dependência funcional** significa que determinado conjunto de atributos determina outro no contexto de dados: por exemplo `cliente_id → cliente_nome` se cada ID representa um cliente único. A modelagem deve respeitar quais fatos pertencem a cada entidade.",
    "explanation": "A **1ª Forma Normal (1FN)** exige atributos com valores adequadamente atômicos no modelo relacional; não armazene lista de vários telefones como um único valor separado por vírgula se precisa tratá-los individualmente. A **2FN** trata dependências parciais de atributos não chave em relação a parte de chave candidata composta. A **3FN**, na formulação prática comum, procura eliminar dependências transitivas indevidas de atributos não chave sobre chaves, respeitando definições formais. Para pedidos, separe Clientes, Produtos, Pedidos e ItensPedido, associando por chaves e preservando regras de cada fato.",
    "connection": "Normalizar reduz anomalias de **inserção, atualização e exclusão**; por exemplo, apagar último pedido não deveria apagar o cadastro do cliente por acidente. Mas normalização não dispensa **índices** para acelerar consultas nem **transações** para manter operações atômicas. Alguns sistemas fazem desnormalização deliberada por desempenho ou histórico, mas isso exige entender e controlar a duplicação. Em itens de pedido, o preço efetivamente cobrado pode ser fato histórico próprio do pedido, mesmo quando catálogo de produto tem preço atual diferente.",
    "exam": "Se a banca propõe que uma dependência de atributo não chave em parte de chave composta é problema da 2FN, avalie a situação; se há atributo não chave dependente de outro atributo não chave, considere 3FN. Não diga que 1FN significa 'sem chave estrangeira'. E não separe toda coluna num banco diferente: a normalização busca representar dependências corretamente, não maximizar número de tabelas.",
    "caseTitle": "Evite repetir telefone em cada pedido",
    "caseSteps": [
      "Identifique que cliente_id determina dados cadastrais do cliente, enquanto pedido_id identifica compra.",
      "Crie Clientes com nome e telefone, Pedidos com referência ao cliente, e ItensPedido com referência ao produto.",
      "Se preço cobrado é histórico da venda, registre-o em item do pedido como fato da transação, distinto do preço atual do catálogo.",
      "Teste atualização de telefone: deve ocorrer em um lugar sem alterar pedidos anteriores indevidamente."
    ],
    "pitfalls": [
      "1FN não é ausência de relacionamentos ou chaves estrangeiras.",
      "2FN trata dependência parcial em chave composta, quando aplicável.",
      "3FN busca impedir dependência transitiva indevida.",
      "Desnormalização pode ser decisão consciente, mas exige controle de consistência."
    ],
    "cards": [
      [
        "O que é dependência funcional X→Y?",
        "Dado um valor de X, determina-se um valor de Y no contexto das regras representadas pelo esquema."
      ],
      [
        "Que problema a 2FN busca evitar?",
        "Dependências parciais de atributos não chave sobre parte de uma chave composta."
      ],
      [
        "Que problema típico a 3FN reduz?",
        "Dependências transitivas indevidas que causam repetição e anomalias de atualização."
      ],
      [
        "Por que preço cobrado pode ficar em ItensPedido?",
        "Porque registra o valor histórico daquela transação, que pode diferir do preço atual do produto."
      ]
    ]
  },
  {
    "id": 107,
    "title": "Consultas analíticas: combine JOIN e HAVING sem contar o cliente duas vezes",
    "goal": "Construir relatório por entidade com agregações corretas e diferenciar linhas do JOIN de entidades contadas.",
    "context": "Uma instituição quer contar quantos agendamentos cada médico recebeu. A tabela Medicos possui um registro por médico, mas Agendamentos possui várias linhas por profissional. Um **JOIN** combina registros relacionados, de modo que cada médico pode aparecer repetido no resultado intermediário, uma vez por agendamento. Para resumir, usamos **GROUP BY**, e para filtrar grupos por contagem usamos **HAVING**. O risco é interpretar linhas da junção como profissionais únicos.",
    "explanation": "A consulta `SELECT m.id,COUNT(a.id) FROM medicos m LEFT JOIN agendamentos a ON a.medico_id=m.id GROUP BY m.id` conta agendamentos por médico e mantém médicos sem agendamentos, que terão COUNT(a.id)=0. `COUNT(*)` em LEFT JOIN pode retornar pelo menos uma linha para médico sem agendamento por causa da linha preservada com NULL no lado direito; portanto cuidado na escolha da expressão contada. Para mostrar só médicos com três ou mais agendamentos use `HAVING COUNT(a.id)>=3` após agrupamento.",
    "connection": "Se unirmos também tabela de Exames, com vários exames por agendamento, o JOIN pode multiplicar registros e inflar a contagem. A solução não é adicionar DISTINCT cegamente: identifique **qual entidade deve ser contada**, defina granularidade e combine relações com chaves corretas. **Subconsulta agregada** pode contar por médico antes de juntar dados adicionais. Essa é a diferença entre conhecer a sintaxe e entender o resultado.",
    "exam": "Se a banca oferece COUNT(*) para médicos sem agendamento em LEFT JOIN, examine a linha preservada. Se oferece filtro COUNT no WHERE, normalmente é incorreto para agregação direta. Se uma consulta devolve 60 linhas para 10 médicos, isso pode ser natural por múltiplos agendamentos, e não falha de SQL. Pergunte sempre **o que cada linha representa após cada JOIN**.",
    "caseTitle": "Conte médicos com zero agendamentos",
    "caseSteps": [
      "Comece por Medicos à esquerda para preservar profissionais sem correspondência.",
      "Faça LEFT JOIN com Agendamentos pela chave medico_id.",
      "Use `COUNT(a.id)` para contar apenas agendamentos existentes; não `COUNT(*)` se quer zero para ausência.",
      "Agrupe por m.id e confirme que médico sem agendamento retorna 0, não desaparece da listagem."
    ],
    "pitfalls": [
      "JOIN um-para-muitos pode repetir a entidade à esquerda.",
      "COUNT(*) em LEFT JOIN conta a linha preservada mesmo sem correspondência à direita.",
      "HAVING filtra grupos, não substitui WHERE para filtrar cada linha.",
      "DISTINCT pode esconder erro de granularidade sem corrigi-lo."
    ],
    "cards": [
      [
        "Por que um médico aparece várias vezes num JOIN?",
        "Porque cada agendamento relacionado forma outra linha resultante para o mesmo profissional."
      ],
      [
        "Qual expressão conta zero agendamentos num LEFT JOIN?",
        "COUNT(coluna não nula da tabela direita), como COUNT(a.id), pois valores nulos são ignorados."
      ],
      [
        "Quando usar HAVING COUNT(a.id)>=3?",
        "Quando precisamos filtrar grupos depois de contar os registros relacionados."
      ],
      [
        "O que é granularidade de consulta?",
        "O nível do fato que cada linha do resultado representa, como agendamento, médico ou dia."
      ]
    ]
  },
  {
    "id": 108,
    "title": "Concorrência no banco: como duas transações podem interferir",
    "goal": "Diferenciar atomicidade, isolamento, leitura suja, leitura não repetível e atualização perdida.",
    "context": "Dois atendentes tentam reservar a última vaga de horário ao mesmo tempo. Cada um consulta 'vaga livre', e ambos tentam confirmar. Um banco pode executar várias **transações concorrentes**, isto é, unidades de trabalho cujas operações se intercalam. Sem regras adequadas, as transações podem interferir e registrar estado impossível. **Isolamento** é propriedade ACID que define como uma transação observa efeitos das outras enquanto ainda estão em execução; níveis diferentes permitem comportamentos diferentes.",
    "explanation": "Uma **leitura suja (dirty read)** ocorre quando uma transação observa alteração de outra que ainda não foi confirmada e que pode ser desfeita, em níveis que permitam isso. **Leitura não repetível** significa que a mesma consulta sobre registro pode obter outro valor dentro de uma transação devido a confirmação concorrente. **Phantom** envolve mudança no conjunto de linhas que atende a um predicado. **Atualização perdida** pode ocorrer quando duas transações sobrescrevem alterações sem coordenação adequada. Locks, controle de versões (MVCC), constraints e estratégias de transação ajudam a lidar com esses problemas conforme SGBD.",
    "connection": "A **atomicidade** trata de confirmar tudo ou nada em cada transação, mas não resolve sozinha disputa entre duas transações corretas individualmente. **Consistência** exige preservar invariantes definidos, como não vender estoque abaixo de zero. **Durabilidade** garante persistência adequada das alterações confirmadas. Em reservas, restrição UNIQUE no par recurso-horário e tratamento de erro de conflito pode ser fundamental mesmo quando a aplicação verifica disponibilidade antes de inserir.",
    "exam": "A banca pode perguntar se SERIALIZABLE tenta produzir efeito equivalente a execução serial de transações, com os mecanismos e possíveis falhas de serialização do SGBD. Não confunda com 'uma transação por vez' em implementação física: pode haver concorrência com controle apropriado. PostgreSQL, por exemplo, utiliza MVCC e não oferece dirty read mesmo que READ UNCOMMITTED seja solicitado, tratando-o como READ COMMITTED. Sempre observe o SGBD citado.",
    "caseTitle": "Duas pessoas reservam o mesmo horário",
    "caseSteps": [
      "Atendente A e B consultam às 10h e ambos leem horário livre, antes de qualquer confirmação.",
      "Ambos tentam inserir reserva para o mesmo recurso/horário; a verificação inicial isolada não basta.",
      "Defina restrição UNIQUE adequada e transação que trate conflito, ou mecanismo de bloqueio/isolamento coerente.",
      "Ao final apenas uma reserva deve ser confirmada; outra tentativa recebe retorno de indisponibilidade."
    ],
    "pitfalls": [
      "Atomicidade não resolve sozinha todas as anomalias de concorrência.",
      "Leitura suja depende do isolamento efetivamente permitido pelo SGBD.",
      "Verificar disponibilidade antes de gravar não substitui restrição concorrente.",
      "SERIALIZABLE não significa necessariamente execução física sem sobreposição."
    ],
    "cards": [
      [
        "O que é leitura suja?",
        "Ler alteração não confirmada por outra transação, que ainda pode ser desfeita."
      ],
      [
        "O que é leitura não repetível?",
        "Obter valor diferente para mesmo registro devido a alteração concorrente confirmada durante a transação."
      ],
      [
        "Como evitar reservas duplicadas sob concorrência?",
        "Usar transações e restrições de unicidade/controle de concorrência coerentes, tratando conflito na aplicação."
      ],
      [
        "Atomicidade e isolamento são iguais?",
        "Não. Atomicidade é tudo-ou-nada da transação; isolamento trata interferência entre transações simultâneas."
      ]
    ]
  },
  {
    "id": 137,
    "title": "ACID e isolamento: por que COMMIT não basta para evitar conflito",
    "goal": "Explicar quatro propriedades ACID e demonstrar que duas operações atômicas ainda podem produzir inconsistência.",
    "context": "Uma transferência de saldo precisa tirar R$ 100 de uma conta e adicionar R$ 100 à outra. Se apenas o débito for gravado, o sistema perde coerência. **Transação** é unidade de trabalho que agrupa operações relacionadas. A propriedade **atomicidade** procura garantir tudo-ou-nada; **consistência** refere-se à preservação de regras/invariantes; **isolamento** trata interferência entre transações; **durabilidade** trata persistência de alterações confirmadas. A sigla ACID é útil depois de compreender cada problema concreto.",
    "explanation": "`BEGIN` inicia transação em sistemas compatíveis; `COMMIT` confirma mudanças e `ROLLBACK` desfaz alterações não confirmadas segundo regras do banco. Para a transferência, atomicidade impede confirmar apenas metade do conjunto de operações. Mas se dois clientes atualizam saldo ao mesmo tempo, precisamos também de isolamento e regras para evitar sobrescrever alterações. **Durabilidade** não significa ausência de qualquer desastre físico: depende de garantias, configuração e infraestrutura. **Consistência** se apoia em regras modeladas, como chave estrangeira ou restrições de saldo, e no código correto.",
    "connection": "Os diferentes **níveis de isolamento** equilibram concorrência e quais anomalias podem ocorrer. Locks e MVCC são formas de implementação usadas pelos SGBDs. Em alguns bancos o isolamento padrão permite que dados confirmados por outra transação apareçam em consulta posterior, gerando leitura não repetível. Escolher isolamento depende das regras da operação; sempre acompanhe com restrições consistentes e tratamento de conflitos.",
    "exam": "A banca pode dizer que atomicidade garante ausência de leituras fantasmas: isso confunde propriedades. Ou afirmar que COMMIT significa que a operação não pode mais ser corrigida por compensação: uma transação futura pode criar ajustes, embora o COMMIT atual tenha sido confirmado. Se aparecer 'tudo ou nada', pense atomicidade; 'não interferir indevidamente', isolamento; 'mudança confirmada preservada', durabilidade.",
    "caseTitle": "Transferência atômica com falha no meio",
    "caseSteps": [
      "A transação inicia e registra débito de R$ 100 na conta origem.",
      "Antes do crédito na conta destino, ocorre erro e a transação não é confirmada.",
      "A operação deve ser revertida por ROLLBACK conforme garantias, evitando registrar apenas metade da transferência.",
      "Quando ambas operações são válidas, COMMIT confirma a unidade, mas concorrência entre transferências ainda exige isolamento."
    ],
    "pitfalls": [
      "Atomicidade não é sinônimo de isolamento.",
      "Consistência depende das restrições e das regras da transação.",
      "COMMIT confirma trabalho, mas não elimina necessidade de backup.",
      "Durabilidade não dispensa planejamento de falhas e recuperação."
    ],
    "cards": [
      [
        "O que é atomicidade ACID?",
        "Garantia de que operações da transação são tratadas como uma unidade de tudo-ou-nada."
      ],
      [
        "O que isolamento procura controlar?",
        "Como transações simultâneas observam e interferem nas alterações umas das outras."
      ],
      [
        "O que durabilidade significa?",
        "Preservação das alterações confirmadas segundo garantias do SGBD e sua configuração."
      ],
      [
        "Para que serve ROLLBACK?",
        "Desfazer alterações não confirmadas de uma transação, conforme regras do SGBD."
      ]
    ]
  },
  {
    "id": 138,
    "title": "B-tree, seletividade e custo: por que o otimizador ignora seu índice",
    "goal": "Interpretar custo de varredura sequencial versus índice e identificar casos em que índice ajuda ou atrapalha.",
    "context": "Uma tabela contém um milhão de pedidos e possui índice em `status`. Você espera que toda busca use o índice, mas o plano indica **Seq Scan**, leitura sequencial. Isso não significa necessariamente defeito. O SGBD estima custo de acessar páginas de dados, navegar pelo índice e recuperar linhas. **Seletividade** é a proporção de registros que passam pelo filtro: buscar um pedido único pode selecionar uma linha, mas buscar todos os pedidos `status='concluido'` pode retornar quase toda a tabela.",
    "explanation": "Um **índice B-tree** organiza chaves para permitir buscas eficientes por igualdade e certos intervalos, conforme colunas e comparações. Se uma consulta retorna poucas linhas, navegar pelo índice pode evitar ler grande parte da tabela. Mas se retorna 900 mil linhas, pode ser mais barato varrer a tabela de uma vez do que seguir centenas de milhares de referências dispersas. **Estatísticas** sobre distribuição de valores ajudam o **otimizador** a estimar esses custos. `EXPLAIN` mostra plano estimado; `EXPLAIN ANALYZE` no PostgreSQL executa consulta e reporta tempos/linhas reais, exigindo cuidado se a operação modifica dados.",
    "connection": "A ordem das colunas em um índice composto pode influenciar quais filtros e ordenações se beneficiam dele. Por exemplo, índice `(cliente_id,data)` não é equivalente em todos os padrões a índice `(data,cliente_id)`. Índices também precisam ser mantidos em INSERT/UPDATE/DELETE e consomem espaço. Logo criar índice é uma decisão baseada em carga de trabalho, não melhoria universal. A modelagem correta e os JOINs continuam relevantes.",
    "exam": "Se um enunciado afirma 'há índice, logo o SGBD obrigatoriamente deve usá-lo', a afirmação é falsa. Se diz que índice nunca tem custo de escrita, também falsa. Uma questão pode apresentar poucos valores distintos numa coluna como `status` e consultas que recuperam maioria das linhas; leitura sequencial pode ser razoável. Compare seleção, cardinalidade e plano de execução antes de concluir.",
    "caseTitle": "Por que Seq Scan pode vencer em tabela com índice?",
    "caseSteps": [
      "A consulta filtra status='concluido', presente em 95% das linhas de um milhão de pedidos.",
      "A leitura por índice talvez precisasse recuperar quase todas as linhas, com muitos acessos adicionais.",
      "O otimizador pode estimar custo menor para ler a tabela sequencialmente e escolhe Seq Scan.",
      "Conclua que o índice não está necessariamente errado; meça consulta, estatísticas e padrão de acesso antes de alterar."
    ],
    "pitfalls": [
      "Índice existente não obriga uso em toda consulta.",
      "B-tree ajuda padrões específicos, não todos os filtros ou ordenações.",
      "Índices ocupam espaço e podem aumentar custo de escrita.",
      "EXPLAIN ANALYZE executa a consulta e pode ter efeitos em instruções de modificação."
    ],
    "cards": [
      [
        "Por que índice pode ser ignorado numa consulta?",
        "Porque o otimizador estima que outro acesso, como leitura sequencial, custa menos."
      ],
      [
        "O que é seletividade?",
        "Grau em que filtro reduz o conjunto de linhas, relacionado à proporção de registros atendidos."
      ],
      [
        "Qual custo de manter índices?",
        "Espaço e trabalho de atualização durante operações de escrita, além de manutenção administrativa."
      ],
      [
        "Para que serve EXPLAIN no PostgreSQL?",
        "Exibir plano estimado de execução para compreender como o SGBD pretende consultar os dados."
      ]
    ]
  },
  {
    "id": 139,
    "title": "Dependências funcionais e normalização: evite anomalias reais",
    "goal": "Identificar dependência parcial e transitiva e revisar 2FN/3FN usando chaves compostas.",
    "context": "Uma tabela `matriculas(aluno_id,curso_id,aluno_nome,curso_nome,nota)` utiliza chave composta `(aluno_id,curso_id)`. Mas `aluno_nome` depende somente de `aluno_id`, e `curso_nome` somente de `curso_id`. Repetir essas informações em toda matrícula pode gerar alterações inconsistentes. **Dependência funcional** X→Y significa que, dadas as regras do domínio, um valor de X determina um valor de Y. Isso permite examinar onde cada atributo realmente pertence.",
    "explanation": "A **1FN** pressupõe valores adequadamente atômicos e estrutura relacional. A **2FN** impede que atributos não primos dependam parcialmente de uma chave candidata composta, conforme formulação formal; no exemplo, nomes de aluno e curso têm dependências parciais. Separe tabelas Alunos, Cursos e Matriculas. A **3FN** aborda dependências transitivas indevidas: por exemplo, em uma tabela Funcionarios(id,setor_id,setor_nome), se `id→setor_id` e `setor_id→setor_nome`, nome do setor pertence à entidade Setores, sob regras adequadas.",
    "connection": "A normalização facilita inserir um curso antes de existir matrícula, atualizar nome de aluno uma vez e excluir matrícula sem apagar cadastro do curso. Mas um esquema normalizado pode precisar de JOIN para gerar relatórios. Desnormalização às vezes é usada com propósito explícito, como armazenar valor histórico de preço por venda; isso não prova que 'normalizar sempre é errado'. O importante é representar fatos e dependências, com restrições e índices coerentes.",
    "exam": "A banca pode perguntar qual problema ocorre quando atributo depende de parte da chave composta: analise 2FN. Quando atributo não chave depende de outro não chave que por sua vez depende da chave, considere dependência transitiva e 3FN. Não confunda dependência funcional com relação física entre computadores nem com foreign key automática: são propriedades lógicas dos dados.",
    "caseTitle": "Normalize Matriculas sem perder notas",
    "caseSteps": [
      "Identifique chave composta `(aluno_id,curso_id)` e dependências: aluno_id→aluno_nome, curso_id→curso_nome.",
      "Crie Alunos(id,nome) e Cursos(id,nome), removendo nomes repetidos da matrícula.",
      "Mantenha Matriculas(aluno_id,curso_id,nota), pois nota depende da relação do aluno com curso.",
      "Garanta chaves e referências, e use JOIN quando precisar relatório com nomes e nota."
    ],
    "pitfalls": [
      "2FN não significa 'toda tabela precisa de chave simples'.",
      "Dependência parcial envolve parte de chave composta em condições específicas.",
      "3FN trata certas dependências transitivas indevidas.",
      "Normalização não elimina necessidade de JOIN, índices e integridade referencial."
    ],
    "cards": [
      [
        "O que é dependência funcional?",
        "Relação lógica em que valores de um conjunto de atributos determinam valores de outro."
      ],
      [
        "Qual indício de violação de 2FN?",
        "Atributo não primo dependente apenas de parte de chave candidata composta."
      ],
      [
        "O que caracteriza dependência transitiva no exemplo funcionário-setor?",
        "id do funcionário determina setor_id, que determina setor_nome, sem setor_nome pertencer diretamente ao funcionário."
      ],
      [
        "Por que normalizar Matriculas?",
        "Evitar repetir nomes de aluno e curso e manter nota como fato da relação de matrícula."
      ]
    ]
  },
  {
    "id": 140,
    "title": "SQL analítico: junções e agregações com granularidade correta",
    "goal": "Explicar por que JOIN multiplica registros antes de COUNT e como calcular totalizações sem duplicidade.",
    "context": "Um gestor pede valor total de vendas por cliente. A tabela Pedidos tem uma linha por pedido; ItensPedido contém várias linhas por pedido. Se você juntar as duas e somar `pedidos.valor_total`, cada pedido será repetido para cada item, inflando a soma. O problema é a **granularidade**: qual fato cada linha representa? Ao juntar Pedido com ItensPedido, uma linha passa a representar um item associado ao pedido, e não um pedido único. O SQL pode executar corretamente a instrução, mas a instrução pode estar modelando a pergunta errada.",
    "explanation": "Se o valor total de pedido já está em Pedidos, agregue diretamente em Pedidos por cliente, sem juntar itens sem necessidade: `SELECT cliente_id,SUM(valor_total) FROM pedidos GROUP BY cliente_id`. Se precisar total derivado de itens, some **valores de itens** (`quantidade*preco_unitario`) numa consulta agrupada por pedido antes de reunir por cliente. Uma **subconsulta** ou **CTE** (`WITH`) pode preparar total por pedido e depois combinar. Distinga `COUNT(*)` número de linhas, `COUNT(DISTINCT pedido_id)` número de pedidos distintos e `SUM` valor numérico de expressão.",
    "connection": "`LEFT JOIN` preserva clientes sem pedido, enquanto `INNER JOIN` os exclui; essa decisão afeta quais grupos aparecem. `HAVING` filtra totais por grupo; `WHERE` filtra linhas antes da agregação. O otimizador pode rearranjar execução física de algumas operações mantendo semântica, mas você deve raciocinar sobre a **semântica do resultado**, não sobre uma ordem intuitiva de cliques. A escolha correta nasce da pergunta: cliente, pedido ou item?",
    "exam": "Quando a banca apresenta soma inflada após JOIN, suspeite de relação um-para-muitos e agregação no nível errado. `SUM(DISTINCT valor_total)` não é solução geral: dois pedidos legítimos com o mesmo valor seriam contados apenas uma vez. Em vez de decorar DISTINCT, defina chave do fato e agregue no nível apropriado.",
    "caseTitle": "Dois pedidos de R$100 com itens múltiplos: evite soma errada",
    "caseSteps": [
      "O cliente tem dois pedidos de R$100; primeiro com três itens e segundo com dois itens.",
      "JOIN direto de Pedidos com ItensPedido cria cinco linhas, e SUM(pedidos.valor_total) retornaria R$500 erroneamente.",
      "Agregue em Pedidos antes de juntar itens: SUM(valor_total)=R$200, ou derive valores dos itens corretamente.",
      "Conclua que a causa foi mudança de granularidade, não falha de SUM nem necessidade de arredondamento."
    ],
    "pitfalls": [
      "JOIN um-para-muitos pode multiplicar fatos e inflar agregações.",
      "SUM(DISTINCT valor_total) não corrige universalmente multiplicação por JOIN.",
      "COUNT(*) conta linhas do resultado, não necessariamente entidades únicas.",
      "Defina granularidade antes de combinar tabelas e agregar."
    ],
    "cards": [
      [
        "O que é granularidade num relatório?",
        "O nível de detalhe que cada linha representa, como cliente, pedido ou item."
      ],
      [
        "Por que somar total de pedido após JOIN com itens pode inflar valor?",
        "Porque cada pedido aparece repetido por item e seu total é somado várias vezes."
      ],
      [
        "Por que SUM(DISTINCT valor_total) não resolve sempre?",
        "Porque pedidos distintos podem ter mesmo valor, que seria contado apenas uma vez."
      ],
      [
        "Qual caminho seguro para total por cliente?",
        "Agregue primeiro no nível de fato correto e só depois faça junções necessárias."
      ]
    ]
  },
  {
    "id": 162,
    "title": "Oficina de JOIN e contagem: encontre o erro de relatório",
    "goal": "Diagnosticar duplicações criadas por junções e corrigir cálculo de quantidade com dados mínimos.",
    "context": "Um relatório informa que uma clínica realizou 25 exames, mas o sistema registra 10 exames distintos. A consulta une Exames, Procedimentos e Profissionais; um exame pode ter vários procedimentos e várias pessoas envolvidas. Quando duas relações de um-para-muitos são unidas sem cuidado, o mesmo exame aparece diversas vezes. Isso não significa que o banco armazenou exames duplicados: pode ser apenas **multiplicação de linhas no JOIN**. Antes de corrigir, determine o identificador do exame e o que exatamente queremos contar.",
    "explanation": "Monte exemplo pequeno com um exame A, dois procedimentos e três profissionais relacionados. Se as duas relações forem juntadas independentemente por exame, o resultado pode ter `2×3=6` linhas para o exame A. `COUNT(*)` retorna 6, embora exista somente um exame. `COUNT(DISTINCT exames.id)` pode contar exames distintos, enquanto subconsultas agregadas separadas podem calcular dois procedimentos e três profissionais sem multiplicação cruzada. O método adequado depende da métrica do relatório, não só da sintaxe.",
    "connection": "O problema se conecta à **cardinalidade**, relacionamento entre entidades. JOIN é correto quando condição representa vínculo real; mas a combinação de várias tabelas altera granularidade. **GROUP BY** e **HAVING** agregam depois da formação de linhas e não eliminam automaticamente duplicações semânticas. Se a métrica for exames por mês, escolha chave do exame e período; se for procedimentos realizados, escolha chave de procedimento. Duas métricas diferentes exigem definições diferentes.",
    "exam": "Uma alternativa que usa `SELECT DISTINCT` em todas as colunas pode deixar de eliminar linhas porque valores dos procedimentos variam. Outra que usa `COUNT(DISTINCT exames.id)` pode estar correta para contar exames, mas não para contar procedimentos. A banca procura entender **qual entidade está sendo contada**. Valide com conjunto pequeno e resultado esperado antes de confiar num SQL longo.",
    "caseTitle": "Um exame aparece seis vezes no JOIN",
    "caseSteps": [
      "Exame E1 possui dois procedimentos P1/P2 e três participantes T1/T2/T3.",
      "O JOIN de ambas relações por exame pode gerar seis combinações, inflando COUNT(*).",
      "Para contar exames, use ID único do exame, por exemplo COUNT(DISTINCT exames.id), ou agregue antes das junções.",
      "Confirme se relatório pretende quantidade de exames, procedimentos ou participações; cada conceito exige contagem distinta."
    ],
    "pitfalls": [
      "COUNT(*) após JOIN pode contar combinações em vez de entidades.",
      "DISTINCT sobre todas as colunas não garante a métrica correta.",
      "Junções um-para-muitos combinadas podem produzir produto multiplicativo.",
      "A correção depende de definir o fato/entidade a contabilizar."
    ],
    "cards": [
      [
        "Por que um exame pode aparecer seis vezes num JOIN?",
        "Porque duas relações múltiplas, com dois e três registros, combinam-se em seis pares."
      ],
      [
        "Como contar exames distintos nesse cenário?",
        "Usando chave única do exame, como COUNT(DISTINCT exames.id), ou agregando no nível correto."
      ],
      [
        "O que COUNT(*) representa após o JOIN?",
        "Número de linhas combinadas do resultado intermediário, não necessariamente quantidade de exames."
      ],
      [
        "O que deve ser definido antes de escrever o relatório?",
        "Qual entidade ou fato cada linha e cada indicador devem representar."
      ]
    ]
  },
  {
    "id": 163,
    "title": "Oficina de transações concorrentes: como impedir a última vaga duplicada",
    "goal": "Diagnosticar disputa de duas transações e aplicar restrição e tratamento de conflito sem confundir atomicidade com isolamento.",
    "context": "Uma clínica disponibiliza um único horário de ressonância às 14h. Dois atendentes consultam o sistema praticamente ao mesmo tempo; ambos enxergam 'livre' e clicam em confirmar. Se a aplicação simplesmente verifica antes e grava depois, pode registrar duas reservas. A situação é uma **condição de corrida (race condition)**: resultado depende da ordem das operações concorrentes. **Transação** organiza grupo de operações; **restrição de unicidade** impõe regra que não pode ser quebrada, como um exame por máquina e horário, conforme modelagem.",
    "explanation": "A sequência ingênua é A lê livre, B lê livre, A insere reserva, B insere reserva. Como a leitura anterior não reservava o recurso, ambas tentativas podem prosseguir se não houver proteção adicional. Crie **UNIQUE(equipamento_id,horario)** conforme regra real, considerando duração, sobreposição e exceções se pertinentes. Com restrição adequada, uma inserção concorrente pode falhar com conflito, e a aplicação deve traduzir isso em mensagem amigável. Outra estratégia usa bloqueio ou isolamento serializável com tratamento de retries quando necessário, mas isso depende do SGBD.",
    "connection": "**Atomicidade** garante tudo-ou-nada para cada operação, mas duas transações atômicas ainda podem conflitar. **Isolamento** e restrições permitem proteger invariantes entre transações. **Durabilidade** conserva confirmações; **consistência** depende das regras modeladas. Também se conecta ao UX: não basta lançar erro SQL bruto no navegador; o sistema deve informar que horário foi ocupado e permitir selecionar outro, sem deixar reserva parcial.",
    "exam": "Se a banca disser que 'basta fazer SELECT antes de INSERT' para impedir duplicidade, a afirmação ignora concorrência. Se oferecer transação sem constraint e sem controle de isolamento, não está demonstrada garantia do recurso único. Se perguntar qual propriedade ACID trata interferência, escolha isolamento, mas reconheça importância de **invariante de unicidade**. Em PostgreSQL, erros de unique violation precisam ser tratados na aplicação, e transações abortadas precisam de rollback apropriado.",
    "caseTitle": "Dois atendentes confirmam a última vaga",
    "caseSteps": [
      "A e B consultam simultaneamente: ambos veem horário disponível.",
      "A tenta inserir primeiro; constraint UNIQUE protege combinação equipamento/horário e permite apenas confirmação válida.",
      "B tenta inserir mesma combinação e recebe erro de conflito, tratado como 'horário indisponível'.",
      "A aplicação desfaz a tentativa de B e oferece horários alternativos, sem gerar reserva parcial."
    ],
    "pitfalls": [
      "SELECT antes de INSERT não garante exclusividade em concorrência.",
      "Transação atômica sem regra de unicidade pode permitir registros duplicados.",
      "Isolamento e restrições são controles complementares.",
      "Erro de banco deve virar mensagem adequada ao usuário, sem exposição de detalhes internos."
    ],
    "cards": [
      [
        "O que é condição de corrida?",
        "Situação em que o resultado depende da ordem de operações concorrentes que acessam recurso compartilhado."
      ],
      [
        "Por que SELECT prévio não garante uma vaga única?",
        "Porque outra transação pode reservar a vaga entre a verificação e o INSERT."
      ],
      [
        "Que constraint ajuda a impedir horário duplicado?",
        "Restrição UNIQUE adequada à identidade do recurso e horário, observadas as regras do domínio."
      ],
      [
        "Qual propriedade ACID trata interferência entre transações?",
        "Isolamento, em conjunto com restrições e estratégia de concorrência apropriada."
      ]
    ]
  }
] satisfies EditorialSeed[])
