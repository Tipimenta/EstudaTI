import type {PedagogicalLesson} from './intro1'
export const completedBD:PedagogicalLesson[]=[
  {
    "id": 62,
    "title": "Transações ACID e isolamento",
    "goal": "Explicar e aplicar: Transações ACID e isolamento.",
    "steps": [
      {
        "title": "Entenda Transações ACID e isolamento",
        "body": "Atomicidade garante tudo ou nada; consistência preserva regras do banco; isolamento regula interferência entre transações; durabilidade garante persistência após commit conforme garantias do SGBD. Isolamento pode afetar leituras sujas, não repetíveis e fantasmas.\n\n**Exemplo do assunto:** Transferir R$ 100 entre duas contas requer debitar e creditar juntos em transação atômica."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Duas transações concorrentes tentam reduzir o mesmo saldo. Qual preocupação de concorrência precisa ser controlada?\n\n**Resposta:** Atualização perdida.\n\n**Explicação:** Sem isolamento/concor­rência adequados, operações simultâneas podem sobrescrever resultados e produzir inconsistência."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual propriedade ACID trata de efeitos completos ou nenhum efeito?\n\n**Resposta:** Atomicidade.\n\n**Explicação:** Atomicidade implementa tudo ou nada.\n\n**Cuidado:** ACID não dispensa backup ou autorização correta dos usuários."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Transações ACID e isolamento",
      "body": "**1. O que a questão quer saber?** Qual fenômeno se relaciona a leitura de dados não confirmados por outra transação?\n\n**2. Que conceito resolve?** Leitura suja é exposição de alteração ainda não confirmada.\n\n**3. Qual é a conclusão?** Dirty read.\n\n"
    },
    "pitfalls": [
      "ACID não dispensa backup ou autorização correta dos usuários.",
      "ACID não dispensa backup ou autorização correta dos usuários."
    ],
    "review": [
      {
        "ask": "Qual propriedade ACID trata de efeitos completos ou nenhum efeito?",
        "answer": "Atomicidade. Atomicidade implementa tudo ou nada."
      },
      {
        "ask": "Qual fenômeno se relaciona a leitura de dados não confirmados por outra transação?",
        "answer": "Dirty read. Leitura suja é exposição de alteração ainda não confirmada."
      },
      {
        "ask": "Qual armadilha evitar em Transações ACID e isolamento?",
        "answer": "ACID não dispensa backup ou autorização correta dos usuários."
      }
    ],
    "extra": ""
  },
  {
    "id": 63,
    "title": "Normalização e integridade",
    "goal": "Explicar e aplicar: Normalização e integridade.",
    "steps": [
      {
        "title": "Entenda Normalização e integridade",
        "body": "1FN trata de atributos atômicos e linhas relacionais; 2FN remove dependências parciais em chaves compostas; 3FN reduz dependências transitivas de atributos não chave. PK e FK contribuem à identificação e integridade referencial.\n\n**Exemplo do assunto:** Separar endereço de fornecedor repetido em pedidos pode evitar anomalia de atualização conforme modelo."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Uma tabela contém cliente_id e nome_cliente em cada pedido, com várias cópias do nome. Qual anomalia pode ocorrer?\n\n**Resposta:** Anomalia de atualização.\n\n**Explicação:** Redundância de atributos dependentes de outra entidade pode levar a nomes inconsistentes se nem todas as cópias forem atualizadas."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual anomalia normalização pretende ajudar a reduzir?\n\n**Resposta:** Atualização inconsistente de dados repetidos.\n\n**Explicação:** Redundância pode provocar anomalias de atualização.\n\n**Cuidado:** Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Normalização e integridade",
      "body": "**1. O que a questão quer saber?** Qual chave identifica unicamente uma linha de tabela?\n\n**2. Que conceito resolve?** Primary key assegura identificação única.\n\n**3. Qual é a conclusão?** Chave primária.\n\n"
    },
    "pitfalls": [
      "Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência.",
      "Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência."
    ],
    "review": [
      {
        "ask": "Qual chave identifica unicamente uma linha de tabela?",
        "answer": "Chave primária. Primary key assegura identificação única."
      },
      {
        "ask": "Qual anomalia normalização pretende ajudar a reduzir?",
        "answer": "Atualização inconsistente de dados repetidos. Redundância pode provocar anomalias de atualização."
      },
      {
        "ask": "Qual armadilha evitar em Normalização e integridade?",
        "answer": "Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência."
      }
    ],
    "extra": ""
  },
  {
    "id": 64,
    "title": "Índices e planos de execução",
    "goal": "Explicar e aplicar: Índices e planos de execução.",
    "steps": [
      {
        "title": "Entenda Índices e planos de execução",
        "body": "Índices aceleram determinados acessos, mas consomem espaço e introduzem trabalho extra em INSERT, UPDATE e DELETE. O otimizador escolhe planos com base em estatísticas e custos; EXPLAIN ajuda a analisar execução.\n\n**Exemplo do assunto:** Consulta frequente por CPF pode usar índice adequado, considerando seletividade e padrões de consulta."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Uma consulta usa filtro seletivo por email em uma tabela muito grande. Qual estrutura costuma ser considerada para acelerar a busca por igualdade?\n\n**Resposta:** Índice B-tree sobre email, se adequado à carga.\n\n**Explicação:** Índices B-tree são úteis para diversos filtros por igualdade, dependendo de seletividade, custos e plano de execução."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual é um custo potencial de índices em tabelas?\n\n**Resposta:** Manutenção adicional em escritas.\n\n**Explicação:** Escritas precisam manter estruturas de índices.\n\n**Cuidado:** Criar índice em todas as colunas não é boa estratégia automática."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Índices e planos de execução",
      "body": "**1. O que a questão quer saber?** Qual ferramenta auxilia a inspecionar plano de execução SQL?\n\n**2. Que conceito resolve?** EXPLAIN apresenta estratégia de execução ou estimativa de plano.\n\n**3. Qual é a conclusão?** EXPLAIN.\n\n"
    },
    "pitfalls": [
      "Criar índice em todas as colunas não é boa estratégia automática.",
      "Criar índice em todas as colunas não é boa estratégia automática."
    ],
    "review": [
      {
        "ask": "Qual é um custo potencial de índices em tabelas?",
        "answer": "Manutenção adicional em escritas. Escritas precisam manter estruturas de índices."
      },
      {
        "ask": "Qual ferramenta auxilia a inspecionar plano de execução SQL?",
        "answer": "EXPLAIN. EXPLAIN apresenta estratégia de execução ou estimativa de plano."
      },
      {
        "ask": "Qual armadilha evitar em Índices e planos de execução?",
        "answer": "Criar índice em todas as colunas não é boa estratégia automática."
      }
    ],
    "extra": ""
  },
  {
    "id": 65,
    "title": "Segurança SQL e permissões",
    "goal": "Explicar e aplicar: Segurança SQL e permissões.",
    "steps": [
      {
        "title": "Entenda Segurança SQL e permissões",
        "body": "GRANT e REVOKE administram privilégios em muitos SGBDs. Use contas com permissões mínimas, parâmetros vinculados em consultas e credenciais protegidas. Logs de auditoria e backups apoiam resposta e recuperação.\n\n**Exemplo do assunto:** Usuário de aplicação que só consulta relatório pode possuir SELECT restrito em vez de privilégio administrativo amplo."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual medida reduz impacto de comprometimento de conta de aplicação?\n\n**Resposta:** Privilégio mínimo.\n\n**Explicação:** Permissões limitadas contêm ações possíveis."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Uma aplicação de leitura de relatórios possui credencial com permissão DELETE em todas as tabelas. Qual princípio deveria orientar a revisão?\n\n**Resposta:** Menor privilégio.\n\n**Explicação:** Uma conta de consulta deve ter apenas privilégios necessários; permissões de escrita e exclusão aumentam impacto de falhas ou abuso.\n\n**Cuidado:** Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Segurança SQL e permissões",
      "body": "**1. O que a questão quer saber?** Qual comando SQL geralmente concede privilégios?\n\n**2. Que conceito resolve?** GRANT concede direitos conforme SGBD e escopo.\n\n**3. Qual é a conclusão?** GRANT.\n\n"
    },
    "pitfalls": [
      "Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários.",
      "Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários."
    ],
    "review": [
      {
        "ask": "Qual comando SQL geralmente concede privilégios?",
        "answer": "GRANT. GRANT concede direitos conforme SGBD e escopo."
      },
      {
        "ask": "Qual medida reduz impacto de comprometimento de conta de aplicação?",
        "answer": "Privilégio mínimo. Permissões limitadas contêm ações possíveis."
      },
      {
        "ask": "Qual armadilha evitar em Segurança SQL e permissões?",
        "answer": "Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários."
      }
    ],
    "extra": ""
  },
  {
    "id": 66,
    "title": "Backup e recuperação em bancos",
    "goal": "Explicar e aplicar: Backup e recuperação em bancos.",
    "steps": [
      {
        "title": "Entenda Backup e recuperação em bancos",
        "body": "Backup lógico exporta objetos/dados em formato interpretável; backup físico copia estruturas de armazenamento conforme mecanismos do SGBD. PITR usa logs apropriados para recuperação até momento específico. Planeje teste de restore e objetivos RPO/RTO.\n\n**Exemplo do assunto:** Para recuperar erro às 14h, uma solução PITR pode restaurar backup e reaplicar WAL até antes do erro, se configurada corretamente."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Uma rotina faz backup de banco, mas restaurações nunca são exercitadas. Qual risco técnico permanece?\n\n**Resposta:** Backup pode estar incompleto ou não restaurável dentro das metas.\n\n**Explicação:** Cópia sem teste não comprova consistência, cadeia de dependências e recuperabilidade."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual é o melhor sinal de que backup de banco é recuperável?\n\n**Resposta:** Teste de restauração bem-sucedido.\n\n**Explicação:** Restaurar de fato valida a estratégia.\n\n**Cuidado:** Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Backup e recuperação em bancos",
      "body": "**1. O que a questão quer saber?** Qual sigla representa recuperação até um instante específico?\n\n**2. Que conceito resolve?** Point-in-Time Recovery restaura até ponto no tempo.\n\n**3. Qual é a conclusão?** PITR.\n\n"
    },
    "pitfalls": [
      "Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável.",
      "Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável."
    ],
    "review": [
      {
        "ask": "Qual sigla representa recuperação até um instante específico?",
        "answer": "PITR. Point-in-Time Recovery restaura até ponto no tempo."
      },
      {
        "ask": "Qual é o melhor sinal de que backup de banco é recuperável?",
        "answer": "Teste de restauração bem-sucedido. Restaurar de fato valida a estratégia."
      },
      {
        "ask": "Qual armadilha evitar em Backup e recuperação em bancos?",
        "answer": "Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável."
      }
    ],
    "extra": ""
  },
  {
    "id": 106,
    "title": "Modelagem relacional, chaves e normalização",
    "goal": "Modelar tabelas minimizando redundância e preservando integridade.",
    "steps": [
      {
        "title": "Compreenda Modelagem relacional, chaves e normalização",
        "body": "**Modelagem conceitual** descreve entidades, atributos e relacionamentos; o modelo lógico relacional representa tabelas, colunas e chaves. **Chave primária (PK)** identifica linhas e não admite nulos em bancos relacionais usuais. **Chave estrangeira (FK)** impõe referência a chave candidata/única da tabela alvo, permitindo valor nulo se coluna for anulável. Cardinalidades ajudam a decidir onde colocar FK ou tabela associativa: N:N exige geralmente relação de associação."
      },
      {
        "title": "Como funciona na prática",
        "body": "Normalização: **1FN** elimina grupos repetitivos e busca valores atômicos conforme domínio; **2FN** elimina dependências parciais de chave candidata composta; **3FN** evita dependências transitivas de atributos não-chave em relação à chave. Não trate normalização como proibição universal de duplicação: decisões de desnormalização podem ser justificadas por desempenho, exigindo controle de consistência."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "Uma tabela `Pedidos(id_pedido, id_cliente, nome_cliente, valor)` repete o nome do cliente. Separar `Clientes(id_cliente, nome)` e `Pedidos(id_pedido, id_cliente FK, valor)` reduz anomalias de atualização. Constraints `NOT NULL`, `UNIQUE`, `CHECK` e FK fazem parte da camada de integridade, complementando validações da aplicação."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Modelagem relacional, chaves e normalização",
      "body": "Sistema de consultas médicas precisa modelar pacientes, agendamentos e profissionais. Proposta: `paciente(id PK,nome)`, `profissional(id PK,nome)`, `agendamento(id PK,paciente_id FK,profissional_id FK,data_hora,status)`. Cada agendamento aponta para um paciente e um profissional, mas cada um pode estar relacionado a vários agendamentos.\n\nDefina regras: `status` com valores permitidos via CHECK; `data_hora` NOT NULL; índice/constraint para impedir conflitos conforme agenda e requisito real. Atenção: `UNIQUE(profissional_id,data_hora)` evita dois agendamentos iguais para mesmo profissional naquele instante, mas não soluciona sobreposição de intervalos de duração diferente. A regra depende do domínio."
    },
    "pitfalls": [
      "PK e FK podem ser a mesma coluna em relacionamento 1:1, mas não é obrigatório. **Pegadinha:** normalização não significa criar uma tabela para cada palavra. **Pegadinha:** 2FN só adiciona exigências após 1FN e é especialmente relevante com chaves compostas. **Pegadinha:** `NULL` não é o mesmo que zero ou string vazia.",
      "Considere as condições específicas de Modelagem relacional, chaves e normalização: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Para que serve chave estrangeira?",
        "answer": "Restringe referências a linhas válidas de outra relação (ou da mesma tabela), conforme a constraint."
      },
      {
        "ask": "Qual problema normalização busca reduzir?",
        "answer": "Redundância desnecessária e anomalias de inserção, atualização e exclusão."
      }
    ],
    "extra": ""
  },
  {
    "id": 107,
    "title": "SELECT, JOIN, GROUP BY e HAVING",
    "goal": "Ler consultas SQL com agregação e distinguir filtragem de linhas de grupos.",
    "steps": [
      {
        "title": "Compreenda SELECT, JOIN, GROUP BY e HAVING",
        "body": "A ordem lógica simplificada de uma consulta SQL é `FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/OFFSET` (o mecanismo físico pode otimizar). **INNER JOIN** seleciona combinações que satisfazem condição; **LEFT JOIN** preserva linhas à esquerda, preenchendo campos da direita com NULL quando não há correspondência. **WHERE** filtra linhas antes da agregação; **HAVING** filtra grupos após agregação."
      },
      {
        "title": "Como funciona na prática",
        "body": "`COUNT(*)` conta linhas; `COUNT(coluna)` conta valores não nulos da expressão. **GROUP BY** reúne linhas por chaves; colunas selecionadas sem agregação normalmente precisam participar do agrupamento, ressalvadas regras do SGBD sobre dependência funcional. `ORDER BY` define ordenação explícita; sem ele, ordem de retorno não é garantida. `LIMIT` e detalhes de paginação variam por dialeto; em SQL de concurso, observe padrão solicitado."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "`NULL` significa ausência/desconhecimento de valor e usa lógica de três valores. `coluna = NULL` não é forma correta de testar nulidade em SQL comum; use `IS NULL` / `IS NOT NULL`. Para filtrar data ou texto, esteja atento à collation, fuso horário, comparação e índices."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — SELECT, JOIN, GROUP BY e HAVING",
      "body": "Tabelas: `clientes(id,nome)` e `pedidos(id,cliente_id,total)`. Requisito: mostrar inclusive clientes sem pedidos, mas apenas clientes com soma de pedidos superior a 500 (essa condição elimina os sem pedidos, naturalmente).\n```sql\nSELECT c.id, c.nome, COALESCE(SUM(p.total),0) AS total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome\nHAVING COALESCE(SUM(p.total),0) > 500\nORDER BY total DESC;\n```\nSe a necessidade real for mostrar **todos os clientes**, remova o HAVING. Se quiser filtrar pedidos de 2026 sem eliminar clientes, coloque o critério de data cuidadosamente no `ON` do LEFT JOIN; pô-lo no WHERE pode descartar linhas com NULL do lado direito."
    },
    "pitfalls": [
      "filtro de `WHERE p.total > 500` não equivale a `HAVING SUM(p.total) > 500`. **Pegadinha:** LEFT JOIN seguido de `WHERE tabela_direita.coluna = valor` pode eliminar linhas sem par e se comportar como inner join para aquele filtro. **Pegadinha:** `COUNT(*)` sobre LEFT JOIN conta a linha preservada mesmo sem pedido; `COUNT(p.id)` dá zero nesse caso.",
      "Considere as condições específicas de SELECT, JOIN, GROUP BY e HAVING: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Diferença entre WHERE e HAVING?",
        "answer": "WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois da agregação."
      },
      {
        "ask": "COUNT(*) e COUNT(campo) retornam sempre o mesmo valor?",
        "answer": "Não. COUNT(*) conta linhas; COUNT(campo) ignora valores NULL dessa expressão."
      }
    ],
    "extra": ""
  },
  {
    "id": 108,
    "title": "ACID, isolamento, concorrência e índices",
    "goal": "Relacionar garantias transacionais a anomalias e custo de consulta.",
    "steps": [
      {
        "title": "Compreenda ACID, isolamento, concorrência e índices",
        "body": "Propriedades **ACID**: Atomicidade (transação inteira confirma ou desfaz), Consistência (mantém invariantes definidas, quando transações são corretas), Isolamento (controla efeitos de concorrência conforme nível escolhido) e Durabilidade (commit confirmado sobrevive a falhas conforme garantias do sistema). Não confunda “consistência” com “todos os dados de todos os sistemas são iguais imediatamente”."
      },
      {
        "title": "Como funciona na prática",
        "body": "Níveis de isolamento usuais no SQL: Read Uncommitted, Read Committed, Repeatable Read e Serializable; o comportamento concreto varia por SGBD. Anomalias: leitura suja (ler alteração não confirmada), leitura não repetível (mesma linha muda entre leituras na transação) e fantasma (conjunto de linhas que atende ao predicado muda). MVCC disponibiliza versões para lidar com concorrência de leitores/escritores, mas não elimina toda necessidade de raciocinar sobre conflitos."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "Índices (frequentemente B-tree) aceleram padrões de acesso seletivos e ordenação, mas consomem armazenamento e custo de escrita. Um índice em coluna pouco seletiva ou consulta que retorna a maior parte das linhas pode não ajudar. `EXPLAIN` mostra plano de execução estimado; em PostgreSQL, `EXPLAIN ANALYZE` executa consulta para obter métricas reais, portanto use cuidado com comandos que alteram dados."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — ACID, isolamento, concorrência e índices",
      "body": "Transferência bancária: debitar R$100 de A e creditar R$100 em B precisa ser atômico. Em SQL: `BEGIN; UPDATE contas SET saldo=saldo-100 WHERE id=1; UPDATE contas SET saldo=saldo+100 WHERE id=2; COMMIT;` — na prática, a aplicação deve ainda validar saldos, resultados de UPDATE e tratamento de erro, usando rollback quando necessário.\n\nDois operadores tentam reservar a mesma sala ao mesmo tempo. Apenas fazer `SELECT` de disponibilidade e depois `INSERT` sem restrições/controle pode gerar corrida. Uma UNIQUE adequada para instantes exatos, controle transacional e/ou lock podem fazer parte da solução; intervalos sobrepostos exigem regra mais rica.\n\nPara consulta que filtra `WHERE paciente_id=? ORDER BY criado_em DESC`, índice composto `(paciente_id, criado_em)` pode ser candidato. Avalie distribuição, cardinalidade, plano e escrita."
    },
    "pitfalls": [
      "índice não garante que consulta será rápida sempre. **Pegadinha:** commit não corrige regra de negócio mal implementada. **Pegadinha:** serializable não equivale a executar todas as transações literalmente em uma única fila; garante resultado compatível com execução serial em sentido técnico. **Pegadinha:** índices exigem manutenção nas modificações.",
      "Considere as condições específicas de ACID, isolamento, concorrência e índices: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "O que significa Durabilidade no ACID?",
        "answer": "Após commit, alterações confirmadas devem resistir a falhas segundo garantias do SGBD."
      },
      {
        "ask": "Qual é a diferença entre dirty read e non-repeatable read?",
        "answer": "Dirty read vê alteração não confirmada; non-repeatable read vê valor diferente em leituras da mesma linha numa transação."
      }
    ],
    "extra": ""
  },
  {
    "id": 137,
    "title": "ACID e isolamento transacional",
    "goal": "Compreender e aplicar acid e isolamento transacional em provas.",
    "steps": [
      {
        "title": "Entenda ACID e isolamento transacional",
        "body": "Transações visam atomicidade, consistência, isolamento e durabilidade. Diferentes níveis de isolamento alteram quais anomalias concorrentes podem ocorrer.\n\nAtomicidade exige tudo-ou-nada no contexto da transação; consistência refere-se à preservação de restrições; isolamento diz respeito à interferência entre transações; durabilidade protege efeitos confirmados conforme garantias do sistema. Anomalias incluem leitura suja, não repetível e fantasma.\n\n**Exemplo do assunto:** Transferir saldo envolve debitar uma conta e creditar outra dentro da mesma transação com validações apropriadas."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Uma aplicação só confirma a movimentação financeira quando débito e crédito concluem. Essa garantia remete especialmente a:\n\n**Resposta:** Atomicidade.\n\n**Explicação:** Atomicidade torna as operações uma unidade transacional com commit ou rollback."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Transferir saldo envolve debitar uma conta e creditar outra dentro da mesma transação com validações apropriadas.\n\n**Um segundo cenário para entender:** Uma transação T1 lê saldo de R$ 200. T2 altera para R$ 250 e confirma. T1 lê novamente R$ 250. Qual fenômeno pode estar presente?\n\n**A regra aplicada:** Duas leituras do mesmo dado pela mesma transação observaram valores diferentes após commit de outra.\n\n**Resultado explicado:** Leitura não repetível.\n\n**Cuidado:** Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — ACID e isolamento transacional",
      "body": "**1. O que a questão quer saber?** Qual propriedade ACID exige que alterações confirmadas sobrevivam a falhas cobertas pelas garantias de persistência?\n\n**2. Que conceito resolve?** Durabilidade protege as alterações após commit.\n\n**3. Qual é a conclusão?** Durabilidade.\n\n"
    },
    "pitfalls": [
      "Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos.",
      "Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de ACID e isolamento transacional?",
        "answer": "Transações visam atomicidade, consistência, isolamento e durabilidade. Diferentes níveis de isolamento alteram quais anomalias concorrentes podem ocorrer."
      },
      {
        "ask": "Qual erro de prova evitar em ACID e isolamento transacional?",
        "answer": "Não confunda consistência de ACID com consenso absoluto de dados distribuídos; são conceitos distintos."
      }
    ],
    "extra": ""
  },
  {
    "id": 138,
    "title": "Índices, B-tree e custo de consulta",
    "goal": "Compreender e aplicar índices, b-tree e custo de consulta em provas.",
    "steps": [
      {
        "title": "Entenda Índices, B-tree e custo de consulta",
        "body": "Índices aceleram determinados padrões de busca, ordenação e junção, mas consomem armazenamento e criam custo de manutenção em escrita.\n\nÍndice B-tree em coluna frequentemente filtrada pode reduzir leituras; o otimizador pode preferir varredura sequencial quando grande parcela da tabela será retornada. Colunas compostas e ordem das chaves influenciam a seletividade. EXPLAIN ajuda a compreender plano, sem ser garantia de tempo futuro.\n\n**Exemplo do assunto:** Uma consulta por CPF em tabela grande pode se beneficiar de índice apropriado, desde que o plano e a distribuição de dados justifiquem."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Um índice pode acelerar leituras, mas há custo adicional. Qual alternativa descreve esse trade-off?\n\n**Resposta:** Índices exigem armazenamento e manutenção nas escritas.\n\n**Explicação:** Índices ocupam espaço e devem ser atualizados conforme inserções, modificações e exclusões, o que exige planejamento."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Uma consulta por CPF em tabela grande pode se beneficiar de índice apropriado, desde que o plano e a distribuição de dados justifiquem.\n\n**Um segundo cenário para entender:** Em uma tabela com milhões de registros, uma coluna apresenta poucos valores distintos. Qual afirmação sobre criar índice nessa coluna é correta?\n\n**A regra aplicada:** Índices pouco seletivos podem não compensar seu custo; o otimizador considera distribuição e plano.\n\n**Resultado explicado:** A seletividade e o plano podem reduzir o benefício desse índice.\n\n**Cuidado:** Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Índices, B-tree e custo de consulta",
      "body": "**1. O que a questão quer saber?** Qual ferramenta PostgreSQL permite inspecionar plano de execução estimado?\n\n**2. Que conceito resolve?** EXPLAIN exibe estimativas e passos do plano escolhido.\n\n**3. Qual é a conclusão?** EXPLAIN.\n\n"
    },
    "pitfalls": [
      "Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam.",
      "Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Índices, B-tree e custo de consulta?",
        "answer": "Índices aceleram determinados padrões de busca, ordenação e junção, mas consomem armazenamento e criam custo de manutenção em escrita."
      },
      {
        "ask": "Qual erro de prova evitar em Índices, B-tree e custo de consulta?",
        "answer": "Mais índices nem sempre significa sistema mais rápido; INSERT/UPDATE/DELETE também os atualizam."
      }
    ],
    "extra": ""
  },
  {
    "id": 139,
    "title": "Normalização e dependências funcionais",
    "goal": "Compreender e aplicar normalização e dependências funcionais em provas.",
    "steps": [
      {
        "title": "Entenda Normalização e dependências funcionais",
        "body": "A normalização busca reduzir redundância e anomalias com base em chaves e dependências.\n\nNa 1FN, valores de atributos devem ser atômicos no modelo adotado. A 2FN evita dependências parciais da chave candidata composta em atributos não-primos; a 3FN reduz dependências transitivas inadequadas. Desnormalização pode ser escolha consciente por desempenho, mas exige tratar consistência.\n\n**Exemplo do assunto:** Guardar nome e telefone do paciente repetidos em cada exame pode criar inconsistência; separar paciente e exame com chave estrangeira reduz repetição."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual problema a normalização procura reduzir?\n\n**Resposta:** Anomalias de atualização e redundância.\n\n**Explicação:** Normalização organiza dependências, diminuindo duplicação e anomalias."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Guardar nome e telefone do paciente repetidos em cada exame pode criar inconsistência; separar paciente e exame com chave estrangeira reduz repetição.\n\n**Um segundo cenário para entender:** Uma tabela com chave composta (pedido_id, produto_id) contém nome_pedido dependente apenas de pedido_id. Qual problema de normalização aparece?\n\n**A regra aplicada:** O atributo não-primo depende apenas de parte da chave composta.\n\n**Resultado explicado:** Dependência parcial relevante para a 2FN.\n\n**Cuidado:** Evite memorizar formas normais sem estudar dependência funcional e chave."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Normalização e dependências funcionais",
      "body": "**1. O que a questão quer saber?** Uma relação está na 1FN, mas um atributo não-primo depende apenas de parte de uma chave candidata composta. Qual forma normal é violada?\n\n**2. Que conceito resolve?** A 2FN requer ausência de dependência parcial de atributo não-primo em relação a chave candidata composta.\n\n**3. Qual é a conclusão?** 2FN.\n\n"
    },
    "pitfalls": [
      "Evite memorizar formas normais sem estudar dependência funcional e chave.",
      "Evite memorizar formas normais sem estudar dependência funcional e chave."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Normalização e dependências funcionais?",
        "answer": "A normalização busca reduzir redundância e anomalias com base em chaves e dependências."
      },
      {
        "ask": "Qual erro de prova evitar em Normalização e dependências funcionais?",
        "answer": "Evite memorizar formas normais sem estudar dependência funcional e chave."
      }
    ],
    "extra": ""
  },
  {
    "id": 140,
    "title": "Junções e agregações SQL",
    "goal": "Compreender e aplicar junções e agregações sql em provas.",
    "steps": [
      {
        "title": "Entenda Junções e agregações SQL",
        "body": "INNER JOIN retorna correspondências; LEFT JOIN preserva linhas da relação à esquerda, preenchendo ausências à direita com NULL.\n\nWHERE filtra linhas antes de grupos; HAVING filtra grupos após agregação. COUNT(*) conta linhas; COUNT(coluna) desconsidera valores NULL naquela coluna. Junção 1:N pode duplicar registros do lado 1, devendo-se observar a cardinalidade para não somar valores repetidos.\n\n**Exemplo do assunto:** Para listar todos os pacientes, inclusive sem exames, a consulta pode partir de pacientes com LEFT JOIN exames."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual JOIN preserva todas as linhas da tabela à esquerda, mesmo sem correspondência?\n\n**Resposta:** LEFT JOIN.\n\n**Explicação:** LEFT JOIN preserva a tabela esquerda e preenche ausências com NULL."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Para listar todos os pacientes, inclusive sem exames, a consulta pode partir de pacientes com LEFT JOIN exames.\n\n**Um segundo cenário para entender:** Uma consulta associa uma venda de R$ 100 aos seus três itens e soma o campo valor_total da venda após JOIN. Qual risco existe?\n\n**A regra aplicada:** O valor da linha pai é repetido a cada item na junção 1:N, exigindo cuidado na agregação.\n\n**Resultado explicado:** Contar R$ 300 em vez de R$ 100.\n\n**Cuidado:** Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Junções e agregações SQL",
      "body": "**1. O que a questão quer saber?** Uma consulta JOIN entre pedidos e itens retorna o valor total de um pedido repetido em cada linha de item. Qual cuidado é necessário antes de somar?\n\n**2. Que conceito resolve?** Junção 1:N multiplica linhas da entidade pai, o que pode duplicar agregações se não houver pré-agregação/estratégia apropriada.\n\n**3. Qual é a conclusão?** Controlar granularidade para evitar dupla contagem.\n\n"
    },
    "pitfalls": [
      "Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro.",
      "Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Junções e agregações SQL?",
        "answer": "INNER JOIN retorna correspondências; LEFT JOIN preserva linhas da relação à esquerda, preenchendo ausências à direita com NULL."
      },
      {
        "ask": "Qual erro de prova evitar em Junções e agregações SQL?",
        "answer": "Adicionar condição da tabela da direita ao WHERE pode tornar um LEFT JOIN equivalente a INNER JOIN naquele filtro."
      }
    ],
    "extra": ""
  },
  {
    "id": 162,
    "title": "JOIN, agrupamento e contagem sem duplicar dados",
    "goal": "Interpretar cardinalidade de JOIN e aplicar WHERE, GROUP BY e HAVING no estágio correto da consulta.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — relatórios de pedidos por cliente\nConsidere `clientes(id, nome)` e `pedidos(id, cliente_id, valor)`. Há três clientes: Ana (1), Beto (2), Caio (3). Os pedidos são: (10,1,100), (11,1,60) e (12,2,40). Precisamos listar todos os clientes, inclusive Caio que não possui pedidos, com quantidade de pedidos de cada um. A escolha natural é `LEFT JOIN` da tabela clientes para pedidos, acompanhada de `COUNT(p.id)`.\n\n```sql\nSELECT c.id, c.nome, COUNT(p.id) AS total_pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome\nORDER BY c.id;\n```\n\nO resultado é Ana=2, Beto=1, Caio=0. **Por que `COUNT(p.id)` e não `COUNT(*)`?** No LEFT JOIN, Caio ainda possui uma linha resultante com colunas de pedidos nulas. `COUNT(*)` contaria essa linha e devolveria 1, mas `COUNT(p.id)` desconsidera nulo e devolve 0."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Onde o filtro muda o resultado\nSe você escrever `WHERE p.valor >= 50`, Caio será eliminado, e Beto também, porque o predicado aplicado após o JOIN rejeita linhas cujo valor é `NULL` ou inferior a 50. Se a intenção é **manter todos os clientes** e contar somente pedidos elegíveis, coloque o critério adequado no `ON`, ou utilize agregação condicional. A semântica de filtro é decisiva — decorar “LEFT JOIN mantém tudo” sem ler a cláusula WHERE pode produzir resposta errada.\n\n```sql\nSELECT c.nome, COUNT(p.id) AS pedidos_50_mais\nFROM clientes c\nLEFT JOIN pedidos p\n  ON p.cliente_id = c.id AND p.valor >= 50\nGROUP BY c.id, c.nome;\n```\n\nAgora Ana=2, Beto=0, Caio=0."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## WHERE não é HAVING\n`WHERE` filtra linhas antes do agrupamento; `HAVING` filtra grupos depois da agregação. Para listar somente clientes com ao menos dois pedidos, use `HAVING COUNT(p.id) >= 2`. O resultado, no exemplo original, é somente Ana. `ORDER BY` organiza o resultado; não transforma contagem em valor maior ou menor por si só."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — JOIN, agrupamento e contagem sem duplicar dados",
      "body": "**Questão:** Uma tabela clientes tem três linhas, mas apenas um cliente possui dois pedidos. Em LEFT JOIN de clientes com pedidos, qual expressão conta corretamente pedidos por cliente, retornando zero para quem não comprou?\n\n**Resposta:** COUNT(pedidos.id).\n\n**Explicação:** Em LEFT JOIN existe uma linha nula do lado de pedidos para cada cliente sem pedido; COUNT(pedidos.id) ignora NULL.\n\n**Alternativa incorreta:** COUNT(*). **Motivo:** COUNT(*) conta a linha preservada do LEFT JOIN, gerando 1 para cliente sem pedido."
    },
    "pitfalls": [
      "Considere as condições específicas de JOIN, agrupamento e contagem sem duplicar dados: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de JOIN, agrupamento e contagem sem duplicar dados: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Por que COUNT(*) difere de COUNT(p.id) após LEFT JOIN?",
        "answer": "COUNT(*) conta linha preservada mesmo com p.id NULL; COUNT(p.id) ignora NULL."
      },
      {
        "ask": "Qual o papel de HAVING em SQL?",
        "answer": "Filtrar grupos após agregação; WHERE filtra linhas antes da agregação."
      }
    ],
    "extra": ""
  },
  {
    "id": 163,
    "title": "Transações concorrentes, isolamento e consistência",
    "goal": "Analisar anomalias de concorrência e recomendar um isolamento compatível com a regra de negócio.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — duas vendas disputam o último item\nUma loja possui uma unidade em estoque. Duas transações simultâneas consultam saldo=1 e ambas decidem vender uma unidade. Se cada operação se comportar como “ler, decidir e atualizar” sem controle apropriado, a lógica do negócio pode ser violada. Para avaliar a situação, separe **atomicidade de isolamento**: atomicidade trata de completar ou desfazer um conjunto de operações; isolamento trata dos efeitos observáveis entre transações concorrentes."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Caminhos de solução\nUma operação atômica condicionada pode atualizar estoque somente se houver saldo suficiente, verificando número de linhas afetadas. Outra opção é bloquear linha para atualização dentro de transação adequada. Há também níveis mais fortes de isolamento; **Serializable** busca efeito equivalente a alguma execução serial, mas pode exigir repetição de transações abortadas por conflitos. A escolha depende do SGBD, do padrão de acesso e das garantias exigidas.\n\n```sql\nUPDATE estoque\nSET quantidade = quantidade - 1\nWHERE produto_id = 7 AND quantidade >= 1;\n```\n\nVerifique se a atualização afetou uma linha. Se apenas uma transação obtiver sucesso, a outra deve receber resposta de indisponibilidade de estoque, não um pedido aceito. Não deduza que `COMMIT` sempre detectará um erro de regra de negócio: o banco garante propriedades específicas, mas aplicações precisam representar corretamente as invariantes."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## Anomalias cobradas\n**Dirty read**: ler alterações ainda não confirmadas de outra transação. **Nonrepeatable read**: duas leituras da mesma linha apresentam valores diferentes após transação concorrente. **Phantom read**: a mesma consulta por predicado pode retornar conjunto distinto de linhas entre leituras. **Lost update**: uma alteração sobrescreve outra sem tratamento apropriado; a manifestação depende da estratégia de leitura e escrita. A implementação de níveis varia entre bancos; em PostgreSQL, Read Uncommitted se comporta como Read Committed em razão do modelo MVCC."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Transações concorrentes, isolamento e consistência",
      "body": "**Questão:** A transação T1 altera o saldo, mas ainda não executou COMMIT. T2 lê esse valor e T1 depois faz ROLLBACK. Qual anomalia ocorreu?\n\n**Resposta:** Leitura suja (dirty read).\n\n**Explicação:** A leitura de dados não confirmados, posteriormente desfeitos, caracteriza dirty read.\n\n**Alternativa incorreta:** Leitura fantasma apenas. **Motivo:** Leitura fantasma envolve mudanças no conjunto de linhas que atende a um predicado."
    },
    "pitfalls": [
      "Considere as condições específicas de Transações concorrentes, isolamento e consistência: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de Transações concorrentes, isolamento e consistência: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Isolamento ACID resolve que classe de problemas?",
        "answer": "Define visibilidade/efeitos entre transações concorrentes, conforme nível e implementação."
      },
      {
        "ask": "Por que confirmar rowcount em UPDATE condicional?",
        "answer": "Para saber se a atualização respeitando a condição realmente ocorreu."
      }
    ],
    "extra": ""
  }
];
