# EstudaTI — BD: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# Modelagem relacional, chaves e normalização

# Objetivo e contexto
Modelar tabelas minimizando redundância e preservando integridade.

## Aula detalhada — entenda o mecanismo
**Modelagem conceitual** descreve entidades, atributos e relacionamentos; o modelo lógico relacional representa tabelas, colunas e chaves. **Chave primária (PK)** identifica linhas e não admite nulos em bancos relacionais usuais. **Chave estrangeira (FK)** impõe referência a chave candidata/única da tabela alvo, permitindo valor nulo se coluna for anulável. Cardinalidades ajudam a decidir onde colocar FK ou tabela associativa: N:N exige geralmente relação de associação.

Normalização: **1FN** elimina grupos repetitivos e busca valores atômicos conforme domínio; **2FN** elimina dependências parciais de chave candidata composta; **3FN** evita dependências transitivas de atributos não-chave em relação à chave. Não trate normalização como proibição universal de duplicação: decisões de desnormalização podem ser justificadas por desempenho, exigindo controle de consistência.

Uma tabela `Pedidos(id_pedido, id_cliente, nome_cliente, valor)` repete o nome do cliente. Separar `Clientes(id_cliente, nome)` e `Pedidos(id_pedido, id_cliente FK, valor)` reduz anomalias de atualização. Constraints `NOT NULL`, `UNIQUE`, `CHECK` e FK fazem parte da camada de integridade, complementando validações da aplicação.

## Exemplo resolvido passo a passo
Sistema de consultas médicas precisa modelar pacientes, agendamentos e profissionais. Proposta: `paciente(id PK,nome)`, `profissional(id PK,nome)`, `agendamento(id PK,paciente_id FK,profissional_id FK,data_hora,status)`. Cada agendamento aponta para um paciente e um profissional, mas cada um pode estar relacionado a vários agendamentos.

Defina regras: `status` com valores permitidos via CHECK; `data_hora` NOT NULL; índice/constraint para impedir conflitos conforme agenda e requisito real. Atenção: `UNIQUE(profissional_id,data_hora)` evita dois agendamentos iguais para mesmo profissional naquele instante, mas não soluciona sobreposição de intervalos de duração diferente. A regra depende do domínio.

## Erros clássicos nas bancas
**Pegadinha:** PK e FK podem ser a mesma coluna em relacionamento 1:1, mas não é obrigatório. **Pegadinha:** normalização não significa criar uma tabela para cada palavra. **Pegadinha:** 2FN só adiciona exigências após 1FN e é especialmente relevante com chaves compostas. **Pegadinha:** `NULL` não é o mesmo que zero ou string vazia.

## Pratique sem consultar
Modele matrícula de estudantes em disciplinas (relacionamento N:N). Descreva a tabela associativa e sua chave. Em seguida, identifique anomalia de atualização em uma tabela que repete endereço de fornecedor em todas as compras.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Documentação PostgreSQL: https://www.postgresql.org/docs/current/tutorial-sql.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Em relacionamento muitos-para-muitos entre alunos e disciplinas, qual implementação relacional usual é adequada?

A) Tabela de associação com FKs para ambas as entidades
B) Uma única coluna contendo lista CSV de IDs
C) Descartar a chave de aluno
D) Duplicar todos os registros de alunos na tabela disciplina

**Gabarito:** A — A tabela associativa representa cada par e preserva referências por chaves estrangeiras.

**Questão 2.** Qual restrição impede valores duplicados em determinada coluna ou combinação no SQL?

A) UNIQUE
B) CHECK sem expressão
C) DEFAULT
D) ORDER BY

**Gabarito:** A — UNIQUE aplica restrição de unicidade; comportamentos com NULL dependem do SGBD e definição.


---

# SELECT, JOIN, GROUP BY e HAVING

# Objetivo e contexto
Ler consultas SQL com agregação e distinguir filtragem de linhas de grupos.

## Aula detalhada — entenda o mecanismo
A ordem lógica simplificada de uma consulta SQL é `FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/OFFSET` (o mecanismo físico pode otimizar). **INNER JOIN** seleciona combinações que satisfazem condição; **LEFT JOIN** preserva linhas à esquerda, preenchendo campos da direita com NULL quando não há correspondência. **WHERE** filtra linhas antes da agregação; **HAVING** filtra grupos após agregação.

`COUNT(*)` conta linhas; `COUNT(coluna)` conta valores não nulos da expressão. **GROUP BY** reúne linhas por chaves; colunas selecionadas sem agregação normalmente precisam participar do agrupamento, ressalvadas regras do SGBD sobre dependência funcional. `ORDER BY` define ordenação explícita; sem ele, ordem de retorno não é garantida. `LIMIT` e detalhes de paginação variam por dialeto; em SQL de concurso, observe padrão solicitado.

`NULL` significa ausência/desconhecimento de valor e usa lógica de três valores. `coluna = NULL` não é forma correta de testar nulidade em SQL comum; use `IS NULL` / `IS NOT NULL`. Para filtrar data ou texto, esteja atento à collation, fuso horário, comparação e índices.

## Exemplo resolvido passo a passo
Tabelas: `clientes(id,nome)` e `pedidos(id,cliente_id,total)`. Requisito: mostrar inclusive clientes sem pedidos, mas apenas clientes com soma de pedidos superior a 500 (essa condição elimina os sem pedidos, naturalmente).
```sql
SELECT c.id, c.nome, COALESCE(SUM(p.total),0) AS total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome
HAVING COALESCE(SUM(p.total),0) > 500
ORDER BY total DESC;
```
Se a necessidade real for mostrar **todos os clientes**, remova o HAVING. Se quiser filtrar pedidos de 2026 sem eliminar clientes, coloque o critério de data cuidadosamente no `ON` do LEFT JOIN; pô-lo no WHERE pode descartar linhas com NULL do lado direito.

## Erros clássicos nas bancas
**Pegadinha:** filtro de `WHERE p.total > 500` não equivale a `HAVING SUM(p.total) > 500`. **Pegadinha:** LEFT JOIN seguido de `WHERE tabela_direita.coluna = valor` pode eliminar linhas sem par e se comportar como inner join para aquele filtro. **Pegadinha:** `COUNT(*)` sobre LEFT JOIN conta a linha preservada mesmo sem pedido; `COUNT(p.id)` dá zero nesse caso.

## Pratique sem consultar
Crie consulta que liste a quantidade de pedidos por cliente, incluindo clientes sem pedidos. Justifique por que usa LEFT JOIN e `COUNT(p.id)`. Depois altere para mostrar somente clientes com pelo menos três pedidos, usando HAVING.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
Documentação PostgreSQL: https://www.postgresql.org/docs/current/tutorial-sql.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual cláusula SQL filtra grupos após uma agregação GROUP BY?

A) HAVING
B) WHERE
C) ORDER BY
D) FROM

**Gabarito:** A — HAVING atua sobre grupos/valores agregados; WHERE filtra linhas antes do agrupamento.

**Questão 2.** Para incluir clientes sem pedidos em uma consulta com clientes à esquerda, qual operação JOIN costuma ser adequada?

A) LEFT JOIN
B) INNER JOIN obrigatório
C) CROSS JOIN sem condição
D) FULL JOIN sem necessidade de condição

**Gabarito:** A — LEFT JOIN preserva linhas da tabela à esquerda e produz NULLs na direita quando não há correspondência.


---

# ACID, isolamento, concorrência e índices

# Objetivo e contexto
Relacionar garantias transacionais a anomalias e custo de consulta.

## Aula detalhada — entenda o mecanismo
Propriedades **ACID**: Atomicidade (transação inteira confirma ou desfaz), Consistência (mantém invariantes definidas, quando transações são corretas), Isolamento (controla efeitos de concorrência conforme nível escolhido) e Durabilidade (commit confirmado sobrevive a falhas conforme garantias do sistema). Não confunda “consistência” com “todos os dados de todos os sistemas são iguais imediatamente”.

Níveis de isolamento usuais no SQL: Read Uncommitted, Read Committed, Repeatable Read e Serializable; o comportamento concreto varia por SGBD. Anomalias: leitura suja (ler alteração não confirmada), leitura não repetível (mesma linha muda entre leituras na transação) e fantasma (conjunto de linhas que atende ao predicado muda). MVCC disponibiliza versões para lidar com concorrência de leitores/escritores, mas não elimina toda necessidade de raciocinar sobre conflitos.

Índices (frequentemente B-tree) aceleram padrões de acesso seletivos e ordenação, mas consomem armazenamento e custo de escrita. Um índice em coluna pouco seletiva ou consulta que retorna a maior parte das linhas pode não ajudar. `EXPLAIN` mostra plano de execução estimado; em PostgreSQL, `EXPLAIN ANALYZE` executa consulta para obter métricas reais, portanto use cuidado com comandos que alteram dados.

## Exemplo resolvido passo a passo
Transferência bancária: debitar R$100 de A e creditar R$100 em B precisa ser atômico. Em SQL: `BEGIN; UPDATE contas SET saldo=saldo-100 WHERE id=1; UPDATE contas SET saldo=saldo+100 WHERE id=2; COMMIT;` — na prática, a aplicação deve ainda validar saldos, resultados de UPDATE e tratamento de erro, usando rollback quando necessário.

Dois operadores tentam reservar a mesma sala ao mesmo tempo. Apenas fazer `SELECT` de disponibilidade e depois `INSERT` sem restrições/controle pode gerar corrida. Uma UNIQUE adequada para instantes exatos, controle transacional e/ou lock podem fazer parte da solução; intervalos sobrepostos exigem regra mais rica.

Para consulta que filtra `WHERE paciente_id=? ORDER BY criado_em DESC`, índice composto `(paciente_id, criado_em)` pode ser candidato. Avalie distribuição, cardinalidade, plano e escrita.

## Erros clássicos nas bancas
**Pegadinha:** índice não garante que consulta será rápida sempre. **Pegadinha:** commit não corrige regra de negócio mal implementada. **Pegadinha:** serializable não equivale a executar todas as transações literalmente em uma única fila; garante resultado compatível com execução serial em sentido técnico. **Pegadinha:** índices exigem manutenção nas modificações.

## Pratique sem consultar
Explique qual anomalia ocorre quando T1 lê dado alterado por T2 antes de T2 confirmar. Compare dois índices para consulta por paciente e data e diga qual seria um bom candidato. Monte caso em que dado existente não pode ser sobrescrito sem verificar versão ou lock.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
PostgreSQL — isolamento transacional: https://www.postgresql.org/docs/current/transaction-iso.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual propriedade ACID assegura comportamento tudo-ou-nada de uma transação?

A) Atomicidade
B) Durabilidade
C) Isolamento
D) Consistência de aplicação exclusivamente

**Gabarito:** A — Atomicidade exige que efeitos da transação sejam confirmados juntos ou desfeitos.

**Questão 2.** Qual afirmação sobre índices B-tree é geralmente correta?

A) Podem acelerar buscas seletivas, com custo adicional de escrita
B) Sempre tornam qualquer consulta mais rápida
C) Substituem chave estrangeira por padrão
D) Eliminam necessidade de otimização de consultas

**Gabarito:** A — Índices acrescentam estruturas mantidas nas escritas e auxiliam certos acessos; não são aceleradores universais.
