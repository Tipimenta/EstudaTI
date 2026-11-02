import type {LessonGuide} from './guidesTypes'
export const guidesBD:LessonGuide[]=[
  {
    "id": 12,
    "code": "BD",
    "title": "SQL e transações",
    "objective": "Ler consultas e explicar transações.",
    "theory": "Em SQL, SELECT recupera dados, WHERE filtra linhas e GROUP BY agrupa registros. Transações seguem propriedades ACID: atomicidade, consistência, isolamento e durabilidade. Índices podem acelerar consultas, mas adicionam custo de escrita.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que é ACID?",
        "back": "Atomicidade, Consistência, Isolamento e Durabilidade."
      },
      {
        "front": "Para que serve WHERE em SQL?",
        "back": "Filtrar registros conforme uma condição."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 13,
    "code": "BD",
    "title": "Modelagem relacional e índices",
    "objective": "Reconhecer chaves e relações.",
    "theory": "Chaves primárias identificam linhas de uma tabela; chaves estrangeiras criam referência entre tabelas. A normalização reduz certas redundâncias e anomalias, dependendo da forma normal adotada. Índices devem considerar padrões de consulta e atualização.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é a finalidade da chave primária?",
        "back": "Identificar unicamente cada registro da tabela."
      },
      {
        "front": "Para que serve uma chave estrangeira?",
        "back": "Referenciar chave de outra tabela e permitir integridade referencial."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 59,
    "code": "BD",
    "title": "SELECT, filtros e ordenação",
    "objective": "Explicar e aplicar: SELECT, filtros e ordenação.",
    "theory": "Em consultas SQL, SELECT determina colunas, FROM origem, WHERE filtra registros antes de agrupamento e ORDER BY ordena resultado. A ordem física da tabela não garante ordem da consulta sem ORDER BY.",
    "practical": "SELECT nome FROM usuarios WHERE ativo=1 ORDER BY nome; retorna nomes dos ativos em ordem definida.",
    "warning": "LIKE, NULL e collation podem ter comportamentos específicos de SGBD.",
    "recall": [
      {
        "front": "Qual cláusula SQL define ordenação do resultado?",
        "back": "ORDER BY. ORDER BY ordena linhas retornadas."
      },
      {
        "front": "Qual cláusula filtra linhas antes da agregação?",
        "back": "WHERE. WHERE atua antes do agrupamento."
      },
      {
        "front": "Qual armadilha evitar em SELECT, filtros e ordenação?",
        "back": "LIKE, NULL e collation podem ter comportamentos específicos de SGBD."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 60,
    "code": "BD",
    "title": "JOIN e cardinalidade",
    "objective": "Explicar e aplicar: JOIN e cardinalidade.",
    "theory": "INNER JOIN retorna pares relacionados; LEFT JOIN preserva linhas à esquerda e preenche ausência do outro lado com NULL. Cardinalidade descreve relacionamentos 1:1, 1:N e N:N; relações N:N costumam ser modeladas com tabela associativa.",
    "practical": "Lista de clientes mesmo sem pedidos: use LEFT JOIN de clientes para pedidos, com atenção às condições no ON e WHERE.",
    "warning": "Filtrar tabela direita no WHERE pode transformar efetivamente um LEFT JOIN em INNER JOIN.",
    "recall": [
      {
        "front": "Qual JOIN preserva linhas da tabela à esquerda mesmo sem correspondência?",
        "back": "LEFT JOIN. LEFT JOIN retorna linhas sem par com NULL na tabela direita."
      },
      {
        "front": "Como relacionamentos N:N são comumente implementados em banco relacional?",
        "back": "Tabela associativa. Tabela intermediária possui referências às duas entidades."
      },
      {
        "front": "Qual armadilha evitar em JOIN e cardinalidade?",
        "back": "Filtrar tabela direita no WHERE pode transformar efetivamente um LEFT JOIN em INNER JOIN."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 61,
    "code": "BD",
    "title": "GROUP BY e HAVING",
    "objective": "Explicar e aplicar: GROUP BY e HAVING.",
    "theory": "GROUP BY reúne linhas por valores comuns para agregação. COUNT, SUM, AVG, MIN e MAX resumem dados; HAVING filtra grupos após agregação. COUNT(*) conta linhas; COUNT(coluna) ignora valores NULL.",
    "practical": "SELECT depto, COUNT(*) FROM funcionarios GROUP BY depto HAVING COUNT(*) > 5;",
    "warning": "WHERE não substitui HAVING em condições que dependem do resultado agregado.",
    "recall": [
      {
        "front": "Qual cláusula filtra grupos depois da agregação?",
        "back": "HAVING. HAVING filtra resultados agrupados."
      },
      {
        "front": "Qual expressão SQL conta todas as linhas, inclusive quando alguma coluna é NULL?",
        "back": "COUNT(*). COUNT(*) conta linhas independentemente de NULL nas colunas."
      },
      {
        "front": "Qual armadilha evitar em GROUP BY e HAVING?",
        "back": "WHERE não substitui HAVING em condições que dependem do resultado agregado."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 62,
    "code": "BD",
    "title": "Transações ACID e isolamento",
    "objective": "Explicar e aplicar: Transações ACID e isolamento.",
    "theory": "Atomicidade garante tudo ou nada; consistência preserva regras do banco; isolamento regula interferência entre transações; durabilidade garante persistência após commit conforme garantias do SGBD. Isolamento pode afetar leituras sujas, não repetíveis e fantasmas.",
    "practical": "Transferir R$ 100 entre duas contas requer debitar e creditar juntos em transação atômica.",
    "warning": "ACID não dispensa backup ou autorização correta dos usuários.",
    "recall": [
      {
        "front": "Qual propriedade ACID trata de efeitos completos ou nenhum efeito?",
        "back": "Atomicidade. Atomicidade implementa tudo ou nada."
      },
      {
        "front": "Qual fenômeno se relaciona a leitura de dados não confirmados por outra transação?",
        "back": "Dirty read. Leitura suja é exposição de alteração ainda não confirmada."
      },
      {
        "front": "Qual armadilha evitar em Transações ACID e isolamento?",
        "back": "ACID não dispensa backup ou autorização correta dos usuários."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 63,
    "code": "BD",
    "title": "Normalização e integridade",
    "objective": "Explicar e aplicar: Normalização e integridade.",
    "theory": "1FN trata de atributos atômicos e linhas relacionais; 2FN remove dependências parciais em chaves compostas; 3FN reduz dependências transitivas de atributos não chave. PK e FK contribuem à identificação e integridade referencial.",
    "practical": "Separar endereço de fornecedor repetido em pedidos pode evitar anomalia de atualização conforme modelo.",
    "warning": "Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência.",
    "recall": [
      {
        "front": "Qual chave identifica unicamente uma linha de tabela?",
        "back": "Chave primária. Primary key assegura identificação única."
      },
      {
        "front": "Qual anomalia normalização pretende ajudar a reduzir?",
        "back": "Atualização inconsistente de dados repetidos. Redundância pode provocar anomalias de atualização."
      },
      {
        "front": "Qual armadilha evitar em Normalização e integridade?",
        "back": "Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 64,
    "code": "BD",
    "title": "Índices e planos de execução",
    "objective": "Explicar e aplicar: Índices e planos de execução.",
    "theory": "Índices aceleram determinados acessos, mas consomem espaço e introduzem trabalho extra em INSERT, UPDATE e DELETE. O otimizador escolhe planos com base em estatísticas e custos; EXPLAIN ajuda a analisar execução.",
    "practical": "Consulta frequente por CPF pode usar índice adequado, considerando seletividade e padrões de consulta.",
    "warning": "Criar índice em todas as colunas não é boa estratégia automática.",
    "recall": [
      {
        "front": "Qual é um custo potencial de índices em tabelas?",
        "back": "Manutenção adicional em escritas. Escritas precisam manter estruturas de índices."
      },
      {
        "front": "Qual ferramenta auxilia a inspecionar plano de execução SQL?",
        "back": "EXPLAIN. EXPLAIN apresenta estratégia de execução ou estimativa de plano."
      },
      {
        "front": "Qual armadilha evitar em Índices e planos de execução?",
        "back": "Criar índice em todas as colunas não é boa estratégia automática."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 65,
    "code": "BD",
    "title": "Segurança SQL e permissões",
    "objective": "Explicar e aplicar: Segurança SQL e permissões.",
    "theory": "GRANT e REVOKE administram privilégios em muitos SGBDs. Use contas com permissões mínimas, parâmetros vinculados em consultas e credenciais protegidas. Logs de auditoria e backups apoiam resposta e recuperação.",
    "practical": "Usuário de aplicação que só consulta relatório pode possuir SELECT restrito em vez de privilégio administrativo amplo.",
    "warning": "Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários.",
    "recall": [
      {
        "front": "Qual comando SQL geralmente concede privilégios?",
        "back": "GRANT. GRANT concede direitos conforme SGBD e escopo."
      },
      {
        "front": "Qual medida reduz impacto de comprometimento de conta de aplicação?",
        "back": "Privilégio mínimo. Permissões limitadas contêm ações possíveis."
      },
      {
        "front": "Qual armadilha evitar em Segurança SQL e permissões?",
        "back": "Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 66,
    "code": "BD",
    "title": "Backup e recuperação em bancos",
    "objective": "Explicar e aplicar: Backup e recuperação em bancos.",
    "theory": "Backup lógico exporta objetos/dados em formato interpretável; backup físico copia estruturas de armazenamento conforme mecanismos do SGBD. PITR usa logs apropriados para recuperação até momento específico. Planeje teste de restore e objetivos RPO/RTO.",
    "practical": "Para recuperar erro às 14h, uma solução PITR pode restaurar backup e reaplicar WAL até antes do erro, se configurada corretamente.",
    "warning": "Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável.",
    "recall": [
      {
        "front": "Qual sigla representa recuperação até um instante específico?",
        "back": "PITR. Point-in-Time Recovery restaura até ponto no tempo."
      },
      {
        "front": "Qual é o melhor sinal de que backup de banco é recuperável?",
        "back": "Teste de restauração bem-sucedido. Restaurar de fato valida a estratégia."
      },
      {
        "front": "Qual armadilha evitar em Backup e recuperação em bancos?",
        "back": "Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 106,
    "code": "BD",
    "title": "Modelagem relacional, chaves e normalização",
    "objective": "Modelar tabelas minimizando redundância e preservando integridade.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Modelagem conceitual** descreve entidades, atributos e relacionamentos; o modelo lógico relacional representa tabelas, colunas e chaves. **Chave primária (PK)** identifica linhas e não admite nulos em bancos relacionais usuais. **Chave estrangeira (FK)** impõe referência a chave candidata/única da tabela alvo, permitindo valor nulo se coluna for anulável. Cardinalidades ajudam a decidir onde colocar FK ou tabela associativa: N:N exige geralmente relação de associação.\n\nNormalização: **1FN** elimina grupos repetitivos e busca valores atômicos conforme domínio; **2FN** elimina dependências parciais de chave candidata composta; **3FN** evita dependências transitivas de atributos não-chave em relação à chave. Não trate normalização como proibição universal de duplicação: decisões de desnormalização podem ser justificadas por desempenho, exigindo controle de consistência.\n\nUma tabela `Pedidos(id_pedido, id_cliente, nome_cliente, valor)` repete o nome do cliente. Separar `Clientes(id_cliente, nome)` e `Pedidos(id_pedido, id_cliente FK, valor)` reduz anomalias de atualização. Constraints `NOT NULL`, `UNIQUE`, `CHECK` e FK fazem parte da camada de integridade, complementando validações da aplicação.\n\n## Exemplo resolvido passo a passo\nSistema de consultas médicas precisa modelar pacientes, agendamentos e profissionais. Proposta: `paciente(id PK,nome)`, `profissional(id PK,nome)`, `agendamento(id PK,paciente_id FK,profissional_id FK,data_hora,status)`. Cada agendamento aponta para um paciente e um profissional, mas cada um pode estar relacionado a vários agendamentos.\n\nDefina regras: `status` com valores permitidos via CHECK; `data_hora` NOT NULL; índice/constraint para impedir conflitos conforme agenda e requisito real. Atenção: `UNIQUE(profissional_id,data_hora)` evita dois agendamentos iguais para mesmo profissional naquele instante, mas não soluciona sobreposição de intervalos de duração diferente. A regra depende do domínio.\n\n## Erros clássicos nas bancas\n**Pegadinha:** PK e FK podem ser a mesma coluna em relacionamento 1:1, mas não é obrigatório. **Pegadinha:** normalização não significa criar uma tabela para cada palavra. **Pegadinha:** 2FN só adiciona exigências após 1FN e é especialmente relevante com chaves compostas. **Pegadinha:** `NULL` não é o mesmo que zero ou string vazia.\n\n## Pratique sem consultar\nModele matrícula de estudantes em disciplinas (relacionamento N:N). Descreva a tabela associativa e sua chave. Em seguida, identifique anomalia de atualização em uma tabela que repete endereço de fornecedor em todas as compras.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nDocumentação PostgreSQL: https://www.postgresql.org/docs/current/tutorial-sql.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Para que serve chave estrangeira?",
        "back": "Restringe referências a linhas válidas de outra relação (ou da mesma tabela), conforme a constraint."
      },
      {
        "front": "Qual problema normalização busca reduzir?",
        "back": "Redundância desnecessária e anomalias de inserção, atualização e exclusão."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 107,
    "code": "BD",
    "title": "SELECT, JOIN, GROUP BY e HAVING",
    "objective": "Ler consultas SQL com agregação e distinguir filtragem de linhas de grupos.",
    "theory": "## Aula detalhada — entenda o mecanismo\nA ordem lógica simplificada de uma consulta SQL é `FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/OFFSET` (o mecanismo físico pode otimizar). **INNER JOIN** seleciona combinações que satisfazem condição; **LEFT JOIN** preserva linhas à esquerda, preenchendo campos da direita com NULL quando não há correspondência. **WHERE** filtra linhas antes da agregação; **HAVING** filtra grupos após agregação.\n\n`COUNT(*)` conta linhas; `COUNT(coluna)` conta valores não nulos da expressão. **GROUP BY** reúne linhas por chaves; colunas selecionadas sem agregação normalmente precisam participar do agrupamento, ressalvadas regras do SGBD sobre dependência funcional. `ORDER BY` define ordenação explícita; sem ele, ordem de retorno não é garantida. `LIMIT` e detalhes de paginação variam por dialeto; em SQL de concurso, observe padrão solicitado.\n\n`NULL` significa ausência/desconhecimento de valor e usa lógica de três valores. `coluna = NULL` não é forma correta de testar nulidade em SQL comum; use `IS NULL` / `IS NOT NULL`. Para filtrar data ou texto, esteja atento à collation, fuso horário, comparação e índices.\n\n## Exemplo resolvido passo a passo\nTabelas: `clientes(id,nome)` e `pedidos(id,cliente_id,total)`. Requisito: mostrar inclusive clientes sem pedidos, mas apenas clientes com soma de pedidos superior a 500 (essa condição elimina os sem pedidos, naturalmente).\n```sql\nSELECT c.id, c.nome, COALESCE(SUM(p.total),0) AS total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome\nHAVING COALESCE(SUM(p.total),0) > 500\nORDER BY total DESC;\n```\nSe a necessidade real for mostrar **todos os clientes**, remova o HAVING. Se quiser filtrar pedidos de 2026 sem eliminar clientes, coloque o critério de data cuidadosamente no `ON` do LEFT JOIN; pô-lo no WHERE pode descartar linhas com NULL do lado direito.\n\n## Erros clássicos nas bancas\n**Pegadinha:** filtro de `WHERE p.total > 500` não equivale a `HAVING SUM(p.total) > 500`. **Pegadinha:** LEFT JOIN seguido de `WHERE tabela_direita.coluna = valor` pode eliminar linhas sem par e se comportar como inner join para aquele filtro. **Pegadinha:** `COUNT(*)` sobre LEFT JOIN conta a linha preservada mesmo sem pedido; `COUNT(p.id)` dá zero nesse caso.\n\n## Pratique sem consultar\nCrie consulta que liste a quantidade de pedidos por cliente, incluindo clientes sem pedidos. Justifique por que usa LEFT JOIN e `COUNT(p.id)`. Depois altere para mostrar somente clientes com pelo menos três pedidos, usando HAVING.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nDocumentação PostgreSQL: https://www.postgresql.org/docs/current/tutorial-sql.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Diferença entre WHERE e HAVING?",
        "back": "WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois da agregação."
      },
      {
        "front": "COUNT(*) e COUNT(campo) retornam sempre o mesmo valor?",
        "back": "Não. COUNT(*) conta linhas; COUNT(campo) ignora valores NULL dessa expressão."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 108,
    "code": "BD",
    "title": "ACID, isolamento, concorrência e índices",
    "objective": "Relacionar garantias transacionais a anomalias e custo de consulta.",
    "theory": "## Aula detalhada — entenda o mecanismo\nPropriedades **ACID**: Atomicidade (transação inteira confirma ou desfaz), Consistência (mantém invariantes definidas, quando transações são corretas), Isolamento (controla efeitos de concorrência conforme nível escolhido) e Durabilidade (commit confirmado sobrevive a falhas conforme garantias do sistema). Não confunda “consistência” com “todos os dados de todos os sistemas são iguais imediatamente”.\n\nNíveis de isolamento usuais no SQL: Read Uncommitted, Read Committed, Repeatable Read e Serializable; o comportamento concreto varia por SGBD. Anomalias: leitura suja (ler alteração não confirmada), leitura não repetível (mesma linha muda entre leituras na transação) e fantasma (conjunto de linhas que atende ao predicado muda). MVCC disponibiliza versões para lidar com concorrência de leitores/escritores, mas não elimina toda necessidade de raciocinar sobre conflitos.\n\nÍndices (frequentemente B-tree) aceleram padrões de acesso seletivos e ordenação, mas consomem armazenamento e custo de escrita. Um índice em coluna pouco seletiva ou consulta que retorna a maior parte das linhas pode não ajudar. `EXPLAIN` mostra plano de execução estimado; em PostgreSQL, `EXPLAIN ANALYZE` executa consulta para obter métricas reais, portanto use cuidado com comandos que alteram dados.\n\n## Exemplo resolvido passo a passo\nTransferência bancária: debitar R$100 de A e creditar R$100 em B precisa ser atômico. Em SQL: `BEGIN; UPDATE contas SET saldo=saldo-100 WHERE id=1; UPDATE contas SET saldo=saldo+100 WHERE id=2; COMMIT;` — na prática, a aplicação deve ainda validar saldos, resultados de UPDATE e tratamento de erro, usando rollback quando necessário.\n\nDois operadores tentam reservar a mesma sala ao mesmo tempo. Apenas fazer `SELECT` de disponibilidade e depois `INSERT` sem restrições/controle pode gerar corrida. Uma UNIQUE adequada para instantes exatos, controle transacional e/ou lock podem fazer parte da solução; intervalos sobrepostos exigem regra mais rica.\n\nPara consulta que filtra `WHERE paciente_id=? ORDER BY criado_em DESC`, índice composto `(paciente_id, criado_em)` pode ser candidato. Avalie distribuição, cardinalidade, plano e escrita.\n\n## Erros clássicos nas bancas\n**Pegadinha:** índice não garante que consulta será rápida sempre. **Pegadinha:** commit não corrige regra de negócio mal implementada. **Pegadinha:** serializable não equivale a executar todas as transações literalmente em uma única fila; garante resultado compatível com execução serial em sentido técnico. **Pegadinha:** índices exigem manutenção nas modificações.\n\n## Pratique sem consultar\nExplique qual anomalia ocorre quando T1 lê dado alterado por T2 antes de T2 confirmar. Compare dois índices para consulta por paciente e data e diga qual seria um bom candidato. Monte caso em que dado existente não pode ser sobrescrito sem verificar versão ou lock.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nPostgreSQL — isolamento transacional: https://www.postgresql.org/docs/current/transaction-iso.html\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que significa Durabilidade no ACID?",
        "back": "Após commit, alterações confirmadas devem resistir a falhas segundo garantias do SGBD."
      },
      {
        "front": "Qual é a diferença entre dirty read e non-repeatable read?",
        "back": "Dirty read vê alteração não confirmada; non-repeatable read vê valor diferente em leituras da mesma linha numa transação."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 137,
    "code": "BD",
    "title": "ACID e isolamento transacional",
    "objective": "Compreender e aplicar acid e isolamento transacional em provas.",
    "theory": "Transações visam atomicidade, consistência, isolamento e durabilidade. Diferentes níveis de isolamento alteram quais anomalias concorrentes podem ocorrer.\n\nAtomicidade exige tudo-ou-nada no contexto da transação; consistência refere-se à preservação de restrições; isolamento diz respeito à interferência entre transações; durabilidade protege efeitos confirmados conforme garantias do sistema. Anomalias incluem leitura suja, não repetível e fantasma.",
    "practical": "Transferir saldo envolve debitar uma conta e creditar outra dentro da mesma transação com validações apropriadas.",
    "warning": "Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos.",
    "recall": [
      {
        "front": "Qual é o conceito central de ACID e isolamento transacional?",
        "back": "Transações visam atomicidade, consistência, isolamento e durabilidade. Diferentes níveis de isolamento alteram quais anomalias concorrentes podem ocorrer."
      },
      {
        "front": "Qual erro de prova evitar em ACID e isolamento transacional?",
        "back": "Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 138,
    "code": "BD",
    "title": "Índices, B-tree e custo de consulta",
    "objective": "Compreender e aplicar índices, b-tree e custo de consulta em provas.",
    "theory": "Índices aceleram determinados padrões de busca, ordenação e junção, mas consomem armazenamento e criam custo de manutenção em escrita.\n\nÍndice B-tree em coluna frequentemente filtrada pode reduzir leituras; o otimizador pode preferir varredura sequencial quando grande parcela da tabela será retornada. Colunas compostas e ordem das chaves influenciam a seletividade. EXPLAIN ajuda a compreender plano, sem ser garantia de tempo futuro.",
    "practical": "Uma consulta por CPF em tabela grande pode se beneficiar de índice apropriado, desde que o plano e a distribuição de dados justifiquem.",
    "warning": "Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam.",
    "recall": [
      {
        "front": "Qual é o conceito central de Índices, B-tree e custo de consulta?",
        "back": "Índices aceleram determinados padrões de busca, ordenação e junção, mas consomem armazenamento e criam custo de manutenção em escrita."
      },
      {
        "front": "Qual erro de prova evitar em Índices, B-tree e custo de consulta?",
        "back": "Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 139,
    "code": "BD",
    "title": "Normalização e dependências funcionais",
    "objective": "Compreender e aplicar normalização e dependências funcionais em provas.",
    "theory": "A normalização busca reduzir redundância e anomalias com base em chaves e dependências.\n\nNa 1FN, valores de atributos devem ser atômicos no modelo adotado. A 2FN evita dependências parciais da chave candidata composta em atributos não-primos; a 3FN reduz dependências transitivas inadequadas. Desnormalização pode ser escolha consciente por desempenho, mas exige tratar consistência.",
    "practical": "Guardar nome e telefone do paciente repetidos em cada exame pode criar inconsistência; separar paciente e exame com chave estrangeira reduz repetição.",
    "warning": "Evite memorizar formas normais sem estudar dependência funcional e chave.",
    "recall": [
      {
        "front": "Qual é o conceito central de Normalização e dependências funcionais?",
        "back": "A normalização busca reduzir redundância e anomalias com base em chaves e dependências."
      },
      {
        "front": "Qual erro de prova evitar em Normalização e dependências funcionais?",
        "back": "Evite memorizar formas normais sem estudar dependência funcional e chave."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 140,
    "code": "BD",
    "title": "Junções e agregações SQL",
    "objective": "Compreender e aplicar junções e agregações sql em provas.",
    "theory": "INNER JOIN retorna correspondências; LEFT JOIN preserva linhas da relação à esquerda, preenchendo ausências à direita com NULL.\n\nWHERE filtra linhas antes de grupos; HAVING filtra grupos após agregação. COUNT(*) conta linhas; COUNT(coluna) desconsidera valores NULL naquela coluna. Junção 1:N pode duplicar registros do lado 1, devendo-se observar a cardinalidade para não somar valores repetidos.",
    "practical": "Para listar todos os pacientes, inclusive sem exames, a consulta pode partir de pacientes com LEFT JOIN exames.",
    "warning": "Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro.",
    "recall": [
      {
        "front": "Qual é o conceito central de Junções e agregações SQL?",
        "back": "INNER JOIN retorna correspondências; LEFT JOIN preserva linhas da relação à esquerda, preenchendo ausências à direita com NULL."
      },
      {
        "front": "Qual erro de prova evitar em Junções e agregações SQL?",
        "back": "Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 162,
    "code": "BD",
    "title": "JOIN, agrupamento e contagem sem duplicar dados",
    "objective": "Interpretar cardinalidade de JOIN e aplicar WHERE, GROUP BY e HAVING no estágio correto da consulta.",
    "theory": "# Caso de prova — relatórios de pedidos por cliente\nConsidere `clientes(id, nome)` e `pedidos(id, cliente_id, valor)`. Há três clientes: Ana (1), Beto (2), Caio (3). Os pedidos são: (10,1,100), (11,1,60) e (12,2,40). Precisamos listar todos os clientes, inclusive Caio que não possui pedidos, com quantidade de pedidos de cada um. A escolha natural é `LEFT JOIN` da tabela clientes para pedidos, acompanhada de `COUNT(p.id)`.\n\n```sql\nSELECT c.id, c.nome, COUNT(p.id) AS total_pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome\nORDER BY c.id;\n```\n\nO resultado é Ana=2, Beto=1, Caio=0. **Por que `COUNT(p.id)` e não `COUNT(*)`?** No LEFT JOIN, Caio ainda possui uma linha resultante com colunas de pedidos nulas. `COUNT(*)` contaria essa linha e devolveria 1, mas `COUNT(p.id)` desconsidera nulo e devolve 0.\n\n## Onde o filtro muda o resultado\nSe você escrever `WHERE p.valor >= 50`, Caio será eliminado, e Beto também, porque o predicado aplicado após o JOIN rejeita linhas cujo valor é `NULL` ou inferior a 50. Se a intenção é **manter todos os clientes** e contar somente pedidos elegíveis, coloque o critério adequado no `ON`, ou utilize agregação condicional. A semântica de filtro é decisiva — decorar “LEFT JOIN mantém tudo” sem ler a cláusula WHERE pode produzir resposta errada.\n\n```sql\nSELECT c.nome, COUNT(p.id) AS pedidos_50_mais\nFROM clientes c\nLEFT JOIN pedidos p\n  ON p.cliente_id = c.id AND p.valor >= 50\nGROUP BY c.id, c.nome;\n```\n\nAgora Ana=2, Beto=0, Caio=0.\n\n## WHERE não é HAVING\n`WHERE` filtra linhas antes do agrupamento; `HAVING` filtra grupos depois da agregação. Para listar somente clientes com ao menos dois pedidos, use `HAVING COUNT(p.id) >= 2`. O resultado, no exemplo original, é somente Ana. `ORDER BY` organiza o resultado; não transforma contagem em valor maior ou menor por si só.\n\n## Armadilhas de prova\n- Um JOIN 1:N pode multiplicar linhas da tabela do lado 1.\n- COUNT(coluna) ignora NULL; COUNT(*) conta linhas.\n- A condição no ON e no WHERE pode modificar o conjunto de linhas preservadas por um LEFT JOIN.\n- Agregação sem GROUP BY adequado pode ser inválida ou ter semântica diferente.\n\n## Treino sem consulta\nReescreva o exemplo para somar valores por cliente e devolver zero aos sem pedido (`COALESCE(SUM(p.valor),0)`). Justifique por que `COUNT(DISTINCT p.id)` seria útil em caso de outros JOINs que multiplicassem pedidos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Por que COUNT(*) difere de COUNT(p.id) após LEFT JOIN?",
        "back": "COUNT(*) conta linha preservada mesmo com p.id NULL; COUNT(p.id) ignora NULL."
      },
      {
        "front": "Qual o papel de HAVING em SQL?",
        "back": "Filtrar grupos após agregação; WHERE filtra linhas antes da agregação."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 163,
    "code": "BD",
    "title": "Transações concorrentes, isolamento e consistência",
    "objective": "Analisar anomalias de concorrência e recomendar um isolamento compatível com a regra de negócio.",
    "theory": "# Caso de prova — duas vendas disputam o último item\nUma loja possui uma unidade em estoque. Duas transações simultâneas consultam saldo=1 e ambas decidem vender uma unidade. Se cada operação se comportar como “ler, decidir e atualizar” sem controle apropriado, a lógica do negócio pode ser violada. Para avaliar a situação, separe **atomicidade de isolamento**: atomicidade trata de completar ou desfazer um conjunto de operações; isolamento trata dos efeitos observáveis entre transações concorrentes.\n\n## Caminhos de solução\nUma operação atômica condicionada pode atualizar estoque somente se houver saldo suficiente, verificando número de linhas afetadas. Outra opção é bloquear linha para atualização dentro de transação adequada. Há também níveis mais fortes de isolamento; **Serializable** busca efeito equivalente a alguma execução serial, mas pode exigir repetição de transações abortadas por conflitos. A escolha depende do SGBD, do padrão de acesso e das garantias exigidas.\n\n```sql\nUPDATE estoque\nSET quantidade = quantidade - 1\nWHERE produto_id = 7 AND quantidade >= 1;\n```\n\nVerifique se a atualização afetou uma linha. Se apenas uma transação obtiver sucesso, a outra deve receber resposta de indisponibilidade de estoque, não um pedido aceito. Não deduza que `COMMIT` sempre detectará um erro de regra de negócio: o banco garante propriedades específicas, mas aplicações precisam representar corretamente as invariantes.\n\n## Anomalias cobradas\n**Dirty read**: ler alterações ainda não confirmadas de outra transação. **Nonrepeatable read**: duas leituras da mesma linha apresentam valores diferentes após transação concorrente. **Phantom read**: a mesma consulta por predicado pode retornar conjunto distinto de linhas entre leituras. **Lost update**: uma alteração sobrescreve outra sem tratamento apropriado; a manifestação depende da estratégia de leitura e escrita. A implementação de níveis varia entre bancos; em PostgreSQL, Read Uncommitted se comporta como Read Committed em razão do modelo MVCC.\n\n## Consistência e índices\nChaves estrangeiras e restrições ajudam a preservar regras definidas no banco; nem toda regra de negócio cabe automaticamente numa única constraint. Índices reduzem custo de leituras específicas, mas criam manutenção e não transformam operação logicamente incorreta em correta. `EXPLAIN` fornece plano estimado; `EXPLAIN ANALYZE` executa consulta e mede estatísticas reais, portanto precisa de cautela em comandos que alteram dados.\n\n## Armadilhas típicas\n- ACID não significa que todo bug de concorrência está resolvido.\n- `ROLLBACK` desfaz alterações da transação conforme o suporte do banco; não restaura backup de dias anteriores.\n- Níveis de isolamento têm custo, anomalias permitidas e particularidades de implementação.\n- A integridade exige validação na camada adequada, e a aplicação deve tratar conflitos.\n\n## Exercício\nDescreva o problema das duas vendas usando uma linha do tempo T1/T2. Depois explique por que atualizar o estoque com cláusula de condição e conferir `rowcount` é mais robusto do que confiar em uma leitura anterior.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Isolamento ACID resolve que classe de problemas?",
        "back": "Define visibilidade/efeitos entre transações concorrentes, conforme nível e implementação."
      },
      {
        "front": "Por que confirmar rowcount em UPDATE condicional?",
        "back": "Para saber se a atualização respeitando a condição realmente ocorreu."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
