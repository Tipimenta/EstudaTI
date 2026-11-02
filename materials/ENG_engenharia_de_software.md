# Engenharia de software

10 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## Requisitos, testes e versionamento

**Objetivo:** Identificar tipos de requisito e teste.

Requisitos funcionais descrevem comportamentos do sistema; não funcionais tratam qualidades, restrições e características como desempenho. Testes de unidade verificam componentes menores; testes de integração verificam colaboração entre componentes.

**Treino:** “O sistema deve responder em até 2 segundos” é requisito:

- A. Funcional
- B. Não funcional
- C. De domínio somente
- D. De interface gráfica somente

**Gabarito comentado:** B — Desempenho é qualidade não funcional.

**Treino:** Qual teste avalia a interação entre módulos distintos?

- A. Teste unitário
- B. Teste de integração
- C. Teste de sintaxe
- D. Teste de estilo

**Gabarito comentado:** B — Integração valida o funcionamento entre componentes.

---

## API REST e controle de versão

**Objetivo:** Relacionar HTTP e versionamento.

APIs permitem integração entre sistemas. No HTTP, GET deve recuperar representação, enquanto POST geralmente cria ou processa recursos. Git registra histórico de alterações por commits e permite branches de desenvolvimento.

**Treino:** Qual método HTTP é normalmente usado para consultar um recurso?

- A. POST
- B. PATCH
- C. GET
- D. DELETE

**Gabarito comentado:** C — GET é usado para obter representações de recursos.

**Treino:** Em Git, qual comando registra mudanças previamente adicionadas ao índice?

- A. git commit
- B. git status
- C. git branch
- D. git fetch

**Gabarito comentado:** A — git commit cria um registro com alterações staged.

---

## Requisitos funcionais e não funcionais

**Objetivo:** Explicar e aplicar: Requisitos funcionais e não funcionais.

### Conceito e teoria
Requisitos funcionais descrevem serviços/comportamentos; não funcionais especificam qualidades como disponibilidade, latência, segurança e manutenibilidade. Bons requisitos são claros, verificáveis e rastreáveis.

### Exemplo
"O sistema deve registrar a senha retirada" é funcional; "95% das consultas devem responder em até 1s" é de desempenho.

### Armadilha de prova
"Sistema rápido" é vago e difícil de testar.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** "A API deve responder em até 500 ms" é requisito:

- A. Não requisito
- B. De banco de dados exclusivamente
- C. Não funcional de desempenho
- D. Funcional de emissão de boleto

**Gabarito comentado:** C — Limite de latência expressa qualidade de serviço.

**Treino:** Qual característica favorece teste de requisitos?

- A. Critério mensurável de aceitação
- B. Texto sem critério objetivo
- C. Ambiguidade intencional
- D. Ausência de rastreabilidade

**Gabarito comentado:** A — Requisito testável contém critérios verificáveis.

---

## UML e modelagem

**Objetivo:** Explicar e aplicar: UML e modelagem.

### Conceito e teoria
Diagramas de casos de uso mostram interações entre atores e funcionalidades; diagramas de sequência enfatizam mensagens no tempo; diagramas de classes descrevem estruturas, atributos e relacionamentos. Modelos são instrumentos de comunicação, não substituem código automaticamente.

### Exemplo
No sistema de agendamento, um caso de uso pode ser "Agendar exame"; sequência mostra paciente, API e banco interagindo.

### Armadilha de prova
Ator de caso de uso pode ser sistema externo, não necessariamente pessoa.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual diagrama UML enfatiza troca de mensagens ao longo do tempo?

- A. Diagrama de sequência
- B. Diagrama de classes
- C. Diagrama de implantação
- D. Diagrama de componentes

**Gabarito comentado:** A — Sequência representa ordem temporal de interações.

**Treino:** Qual diagrama representa atores e objetivos de interação com sistema?

- A. Atividade exclusivamente
- B. Pacotes exclusivamente
- C. Casos de uso
- D. Classes

**Gabarito comentado:** C — Use case modela serviços percebidos por atores.

---

## Testes: unidade, integração e aceitação

**Objetivo:** Explicar e aplicar: Testes: unidade, integração e aceitação.

### Conceito e teoria
Teste unitário verifica pequena unidade isoladamente; integração examina colaboração entre componentes; aceitação verifica critérios de negócio. Pirâmide de testes costuma favorecer maior quantidade de testes rápidos e determinísticos.

### Exemplo
Teste de API que grava e lê no banco é integração; teste de função de subnetting pode ser unitário.

### Armadilha de prova
Cobertura de código alta não prova ausência de defeitos ou correção de requisitos.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual teste verifica cooperação entre API e banco de dados?

- A. Estético
- B. De ortografia
- C. Integração
- D. Unitário isolado

**Gabarito comentado:** C — Integração valida interação entre componentes.

**Treino:** Qual afirmação sobre cobertura de testes é correta?

- A. Cobertura mede satisfação do usuário
- B. Cobertura elevada não garante inexistência de bugs
- C. 100% de cobertura prova software correto
- D. Cobertura dispensa teste exploratório

**Gabarito comentado:** B — Cobertura é métrica de execução e precisa de avaliação de qualidade.

---

## Git: commits, branches e merges

**Objetivo:** Explicar e aplicar: Git: commits, branches e merges.

### Conceito e teoria
Git armazena histórico de snapshots por commits; branches são referências móveis para linhas de desenvolvimento. Merge integra históricos; rebase reaplica commits sobre outra base, reescrevendo commits e exigindo cuidado em branches compartilhadas.

### Exemplo
Criar branch feature/flashcards permite desenvolver sem alterar branch principal até revisão.

### Armadilha de prova
Commits não substituem backup externo do repositório remoto, e rebase público pode atrapalhar colaboradores.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual comando cria um registro de mudanças staged no Git?

- A. git log
- B. git diff
- C. git commit
- D. git status

**Gabarito comentado:** C — Commit registra alterações preparadas para o índice.

**Treino:** Qual comando usualmente integra branch no ramo atual por merge?

- A. git merge
- B. git init
- C. git clone
- D. git show

**Gabarito comentado:** A — git merge incorpora histórico de outro ramo.

---

## REST: recursos e métodos HTTP

**Objetivo:** Explicar e aplicar: REST: recursos e métodos HTTP.

### Conceito e teoria
REST representa arquitetura centrada em recursos. GET é seguro/idempotente em sua semântica, POST geralmente cria/aciona processamento, PUT substitui representação de recurso, PATCH altera parcialmente e DELETE remove. Respostas devem usar status coerente.

### Exemplo
GET /questoes/10 consulta; PATCH /questoes/10/status atualiza estado parcial.

### Armadilha de prova
Idempotência não significa resposta byte a byte idêntica em toda execução.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual método HTTP é mais indicado para atualização parcial de recurso?

- A. PATCH
- B. GET
- C. HEAD
- D. OPTIONS

**Gabarito comentado:** A — PATCH aplica alterações parciais a representação.

**Treino:** Qual método é considerado seguro pela semântica HTTP?

- A. POST
- B. GET
- C. DELETE
- D. PATCH

**Gabarito comentado:** B — GET não deveria provocar mudança de estado solicitada pelo cliente.

---

## API: autenticação e autorização

**Objetivo:** Explicar e aplicar: API: autenticação e autorização.

### Conceito e teoria
Autenticação verifica identidade; autorização verifica permissão para ação/recurso. JWT é formato de token, não estratégia completa de segurança. Sessões com cookies HttpOnly e Secure sob HTTPS protegem contra certas exposições, mas exigem análise de CSRF e configuração correta.

### Exemplo
Usuário válido obtém 403 ao tentar acessar questão administrativa fora de sua permissão, ainda que esteja autenticado.

### Armadilha de prova
Não confunda token assinado com token criptografado ou com garantia de segurança automática.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual processo determina se usuário pode executar ação?

- A. Compressão TLS
- B. Autorização
- C. Autenticação
- D. Resolução DNS

**Gabarito comentado:** B — Autorização checa permissões.

**Treino:** Qual atributo impede leitura de cookie por JavaScript de página?

- A. Domain
- B. Path
- C. HttpOnly
- D. SameSite exclusivamente

**Gabarito comentado:** C — HttpOnly restringe acesso via document.cookie.

---

## CI/CD e análise de código

**Objetivo:** Explicar e aplicar: CI/CD e análise de código.

### Conceito e teoria
Integração contínua automatiza validação frequente de mudanças, com build e testes. Entrega/implantação contínua automatiza preparação ou publicação conforme controles. Linters, testes e análise de dependências ajudam a detectar problemas cedo.

### Exemplo
Pipeline faz lint, testes da API, build da interface e análise de vulnerabilidades antes de produzir imagem Docker.

### Armadilha de prova
Pipeline verde não substitui revisão de segurança de arquitetura e observabilidade em produção.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é objetivo comum de CI?

- A. Eliminar necessidade de versionamento
- B. Proibir testes
- C. Substituir configuração de ambiente
- D. Executar validações frequentes automaticamente

**Gabarito comentado:** D — CI integra e valida alterações regularmente.

**Treino:** Qual etapa detecta quebra de build TypeScript?

- A. Consulta de DNS somente
- B. Compilação/verificação de tipos
- C. Pagamento de fatura
- D. Exportação de banco

**Gabarito comentado:** B — Build e checagem de tipos identificam inconsistências estáticas.

---

## Complexidade e estruturas de dados

**Objetivo:** Explicar e aplicar: Complexidade e estruturas de dados.

### Conceito e teoria
A complexidade assintótica descreve crescimento de custo com entrada. Busca binária em vetor ordenado tem O(log n) no pior caso; varredura linear tem O(n). Pilha opera LIFO, fila FIFO; mapas hash têm operações médias rápidas sob condições típicas.

### Exemplo
Procurar número em lista ordenada por busca binária reduz espaço de busca pela metade a cada comparação.

### Armadilha de prova
Big O não informa tempo absoluto e não elimina influência de constantes ou distribuição de dados.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual a ordem típica da busca binária em arranjo ordenado?

- A. O(n!)
- B. O(2^n)
- C. O(log n)
- D. O(n²)

**Gabarito comentado:** C — A cada etapa é reduzida aproximadamente metade das possibilidades.

**Treino:** Qual estrutura segue FIFO?

- A. Conjunto sem ordem
- B. Fila
- C. Pilha
- D. Árvore binária obrigatoriamente

**Gabarito comentado:** B — First In, First Out descreve fila.
