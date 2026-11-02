# Banco de dados e SQL

10 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## SQL e transações

**Objetivo:** Ler consultas e explicar transações.

Em SQL, SELECT recupera dados, WHERE filtra linhas e GROUP BY agrupa registros. Transações seguem propriedades ACID: atomicidade, consistência, isolamento e durabilidade. Índices podem acelerar consultas, mas adicionam custo de escrita.

**Treino:** Qual cláusula SQL filtra linhas antes do agrupamento?

- A. ORDER BY
- B. HAVING
- C. WHERE
- D. LIMIT

**Gabarito comentado:** C — WHERE filtra linhas antes de GROUP BY.

**Treino:** Que propriedade ACID diz que a transação ocorre integralmente ou não ocorre?

- A. Isolamento
- B. Durabilidade
- C. Atomicidade
- D. Indexação

**Gabarito comentado:** C — Atomicidade garante tudo ou nada para a transação.

---

## Modelagem relacional e índices

**Objetivo:** Reconhecer chaves e relações.

Chaves primárias identificam linhas de uma tabela; chaves estrangeiras criam referência entre tabelas. A normalização reduz certas redundâncias e anomalias, dependendo da forma normal adotada. Índices devem considerar padrões de consulta e atualização.

**Treino:** Uma foreign key geralmente serve para:

- A. Criptografar a coluna
- B. Relacionar tabelas
- C. Substituir backup
- D. Classificar resultados

**Gabarito comentado:** B — Chave estrangeira estabelece referência entre tabelas.

**Treino:** Qual estrutura costuma otimizar a busca em colunas consultadas com frequência?

- A. Trigger obrigatória
- B. Índice
- C. View materializada sempre
- D. Comentário SQL

**Gabarito comentado:** B — Índices podem acelerar pesquisas ao custo de espaço e manutenção.

---

## SELECT, filtros e ordenação

**Objetivo:** Explicar e aplicar: SELECT, filtros e ordenação.

### Conceito e teoria
Em consultas SQL, SELECT determina colunas, FROM origem, WHERE filtra registros antes de agrupamento e ORDER BY ordena resultado. A ordem física da tabela não garante ordem da consulta sem ORDER BY.

### Exemplo
SELECT nome FROM usuarios WHERE ativo=1 ORDER BY nome; retorna nomes dos ativos em ordem definida.

### Armadilha de prova
LIKE, NULL e collation podem ter comportamentos específicos de SGBD.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual cláusula SQL define ordenação do resultado?

- A. GROUP BY
- B. HAVING
- C. JOIN
- D. ORDER BY

**Gabarito comentado:** D — ORDER BY ordena linhas retornadas.

**Treino:** Qual cláusula filtra linhas antes da agregação?

- A. HAVING
- B. ORDER BY
- C. LIMIT
- D. WHERE

**Gabarito comentado:** D — WHERE atua antes do agrupamento.

---

## JOIN e cardinalidade

**Objetivo:** Explicar e aplicar: JOIN e cardinalidade.

### Conceito e teoria
INNER JOIN retorna pares relacionados; LEFT JOIN preserva linhas à esquerda e preenche ausência do outro lado com NULL. Cardinalidade descreve relacionamentos 1:1, 1:N e N:N; relações N:N costumam ser modeladas com tabela associativa.

### Exemplo
Lista de clientes mesmo sem pedidos: use LEFT JOIN de clientes para pedidos, com atenção às condições no ON e WHERE.

### Armadilha de prova
Filtrar tabela direita no WHERE pode transformar efetivamente um LEFT JOIN em INNER JOIN.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual JOIN preserva linhas da tabela à esquerda mesmo sem correspondência?

- A. INNER JOIN
- B. CROSS JOIN com WHERE
- C. NATURAL INNER JOIN
- D. LEFT JOIN

**Gabarito comentado:** D — LEFT JOIN retorna linhas sem par com NULL na tabela direita.

**Treino:** Como relacionamentos N:N são comumente implementados em banco relacional?

- A. Uma única chave primária duplicada
- B. Remoção de todas as chaves estrangeiras
- C. Apenas índice de texto
- D. Tabela associativa

**Gabarito comentado:** D — Tabela intermediária possui referências às duas entidades.

---

## GROUP BY e HAVING

**Objetivo:** Explicar e aplicar: GROUP BY e HAVING.

### Conceito e teoria
GROUP BY reúne linhas por valores comuns para agregação. COUNT, SUM, AVG, MIN e MAX resumem dados; HAVING filtra grupos após agregação. COUNT(*) conta linhas; COUNT(coluna) ignora valores NULL.

### Exemplo
SELECT depto, COUNT(*) FROM funcionarios GROUP BY depto HAVING COUNT(*) > 5;

### Armadilha de prova
WHERE não substitui HAVING em condições que dependem do resultado agregado.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual cláusula filtra grupos depois da agregação?

- A. WHERE
- B. DISTINCT
- C. OFFSET
- D. HAVING

**Gabarito comentado:** D — HAVING filtra resultados agrupados.

**Treino:** Qual expressão SQL conta todas as linhas, inclusive quando alguma coluna é NULL?

- A. AVG(NULL)
- B. COUNT(*)
- C. COUNT(coluna_nula)
- D. SUM(NULL)

**Gabarito comentado:** B — COUNT(*) conta linhas independentemente de NULL nas colunas.

---

## Transações ACID e isolamento

**Objetivo:** Explicar e aplicar: Transações ACID e isolamento.

### Conceito e teoria
Atomicidade garante tudo ou nada; consistência preserva regras do banco; isolamento regula interferência entre transações; durabilidade garante persistência após commit conforme garantias do SGBD. Isolamento pode afetar leituras sujas, não repetíveis e fantasmas.

### Exemplo
Transferir R$ 100 entre duas contas requer debitar e creditar juntos em transação atômica.

### Armadilha de prova
ACID não dispensa backup ou autorização correta dos usuários.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual propriedade ACID trata de efeitos completos ou nenhum efeito?

- A. Durabilidade
- B. Consistência apenas
- C. Atomicidade
- D. Isolamento

**Gabarito comentado:** C — Atomicidade implementa tudo ou nada.

**Treino:** Qual fenômeno se relaciona a leitura de dados não confirmados por outra transação?

- A. DDL rollback sempre
- B. Dirty read
- C. Backup lógico
- D. Dead letter queue

**Gabarito comentado:** B — Leitura suja é exposição de alteração ainda não confirmada.

---

## Normalização e integridade

**Objetivo:** Explicar e aplicar: Normalização e integridade.

### Conceito e teoria
1FN trata de atributos atômicos e linhas relacionais; 2FN remove dependências parciais em chaves compostas; 3FN reduz dependências transitivas de atributos não chave. PK e FK contribuem à identificação e integridade referencial.

### Exemplo
Separar endereço de fornecedor repetido em pedidos pode evitar anomalia de atualização conforme modelo.

### Armadilha de prova
Desnormalização pode ser opção deliberada de desempenho, mas requer controle de inconsistência.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual chave identifica unicamente uma linha de tabela?

- A. Comentário SQL
- B. Índice opcional não único
- C. Chave primária
- D. Chave estrangeira em qualquer caso

**Gabarito comentado:** C — Primary key assegura identificação única.

**Treino:** Qual anomalia normalização pretende ajudar a reduzir?

- A. Latência física de todos os discos
- B. Falha de rede no switch
- C. Ausência de TLS
- D. Atualização inconsistente de dados repetidos

**Gabarito comentado:** D — Redundância pode provocar anomalias de atualização.

---

## Índices e planos de execução

**Objetivo:** Explicar e aplicar: Índices e planos de execução.

### Conceito e teoria
Índices aceleram determinados acessos, mas consomem espaço e introduzem trabalho extra em INSERT, UPDATE e DELETE. O otimizador escolhe planos com base em estatísticas e custos; EXPLAIN ajuda a analisar execução.

### Exemplo
Consulta frequente por CPF pode usar índice adequado, considerando seletividade e padrões de consulta.

### Armadilha de prova
Criar índice em todas as colunas não é boa estratégia automática.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é um custo potencial de índices em tabelas?

- A. Manutenção adicional em escritas
- B. Eliminação de todo consumo de disco
- C. Impossibilidade de SELECT
- D. Desativação de transações

**Gabarito comentado:** A — Escritas precisam manter estruturas de índices.

**Treino:** Qual ferramenta auxilia a inspecionar plano de execução SQL?

- A. INSERT
- B. EXPLAIN
- C. COMMIT
- D. GRANT

**Gabarito comentado:** B — EXPLAIN apresenta estratégia de execução ou estimativa de plano.

---

## Segurança SQL e permissões

**Objetivo:** Explicar e aplicar: Segurança SQL e permissões.

### Conceito e teoria
GRANT e REVOKE administram privilégios em muitos SGBDs. Use contas com permissões mínimas, parâmetros vinculados em consultas e credenciais protegidas. Logs de auditoria e backups apoiam resposta e recuperação.

### Exemplo
Usuário de aplicação que só consulta relatório pode possuir SELECT restrito em vez de privilégio administrativo amplo.

### Armadilha de prova
Escapar manualmente texto não substitui prepared statements parametrizados em todos os cenários.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual comando SQL geralmente concede privilégios?

- A. ROLLBACK
- B. EXPLAIN
- C. GRANT
- D. SELECT

**Gabarito comentado:** C — GRANT concede direitos conforme SGBD e escopo.

**Treino:** Qual medida reduz impacto de comprometimento de conta de aplicação?

- A. Acesso sem autenticação
- B. Privilégio mínimo
- C. Conta administrativa compartilhada
- D. Senha hardcoded no Git

**Gabarito comentado:** B — Permissões limitadas contêm ações possíveis.

---

## Backup e recuperação em bancos

**Objetivo:** Explicar e aplicar: Backup e recuperação em bancos.

### Conceito e teoria
Backup lógico exporta objetos/dados em formato interpretável; backup físico copia estruturas de armazenamento conforme mecanismos do SGBD. PITR usa logs apropriados para recuperação até momento específico. Planeje teste de restore e objetivos RPO/RTO.

### Exemplo
Para recuperar erro às 14h, uma solução PITR pode restaurar backup e reaplicar WAL até antes do erro, se configurada corretamente.

### Armadilha de prova
Copiar arquivos de banco ativo sem procedimento consistente pode gerar backup inutilizável.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual sigla representa recuperação até um instante específico?

- A. TTL
- B. MTU
- C. PITR
- D. NAT

**Gabarito comentado:** C — Point-in-Time Recovery restaura até ponto no tempo.

**Treino:** Qual é o melhor sinal de que backup de banco é recuperável?

- A. Registro de agendamento sem conferência
- B. Teste de restauração bem-sucedido
- C. Existência de arquivo com extensão .bak
- D. Nome de pasta backup

**Gabarito comentado:** B — Restaurar de fato valida a estratégia.
