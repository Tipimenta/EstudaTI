# EstudaTI — ENG: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# Requisitos, histórias de usuário e modelagem

# Objetivo e contexto
Distinguir requisitos e transformar necessidade de negócio em critérios verificáveis.

## Aula detalhada — entenda o mecanismo
**Requisitos funcionais** expressam comportamentos e capacidades do sistema: “o usuário deve reagendar consulta”. **Não funcionais** descrevem qualidades e restrições verificáveis: disponibilidade, desempenho, segurança, acessibilidade, conformidade, usabilidade. “Sistema rápido” é vago; “95% das consultas respondem em menos de 2 s sob carga definida” é mensurável. **Regra de negócio** impõe política de domínio: “não permitir duas reservas simultâneas do mesmo profissional”.

Técnicas de levantamento incluem entrevistas, oficinas, observação de trabalho, análise documental, protótipos e modelagem. **História de usuário** (“Como [papel], quero [capacidade], para [benefício]”) facilita conversas, mas não substitui critérios de aceitação. **Casos de uso** detalham interações e fluxos alternativos. Diagramas UML são ferramentas de comunicação e exigem escolher representação apropriada: atividade para fluxo, sequência para mensagens, classes para estrutura.

A **rastreabilidade** conecta necessidade → requisito → decisão → implementação → teste. Quando um requisito muda, esse vínculo permite analisar impacto e regressão. Critérios de aceitação devem prever casos de sucesso, erros, autorização e dados de borda. Separar validação (estamos construindo o produto certo?) e verificação (produto atende especificação?) evita confusões clássicas.

## Exemplo resolvido passo a passo
Requisito bruto: “preciso melhorar o agendamento”. Detalhe com usuários: médicos, recepcionistas e pacientes. História: “Como recepcionista, quero visualizar horários disponíveis para evitar marcação duplicada”.

Critérios: (1) não exibir slot reservado como livre; (2) conflito de duas tentativas simultâneas resulta em uma confirmação e uma rejeição; (3) acesso limitado ao perfil autorizado; (4) resposta dentro do tempo-alvo medido.

Modelo de entidades inclui `agenda`, `slot`, `reserva`; no teste de integração, valide concorrência e persistência. Regra “um slot ativo tem no máximo uma reserva confirmada” deve ser garantida também no banco/transação, não apenas na tela.

## Erros clássicos nas bancas
**Pegadinha:** não funcional pode ser testável e fundamental; não significa “opcional”. **Pegadinha:** mockup não garante requisitos capturados. **Pegadinha:** usuário dizer “quero um botão” não substitui entender o problema de negócio. **Pegadinha:** caso de uso não precisa ser necessariamente interface gráfica.

## Pratique sem consultar
Transforme “o sistema deve ser seguro” em três requisitos verificáveis (autorização, log, sessão). Crie história de usuário com três critérios testáveis e um cenário de corrida. Associe cada requisito a um teste correspondente.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
ISO/IEC/IEEE 29148 — engenharia de requisitos (visão de referência): https://www.iso.org/standard/72089.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual é um exemplo bem especificado de requisito não funcional?

A) 95% das requisições devem responder em até 2 segundos na carga definida
B) O usuário poderá alterar sua senha
C) O sistema permitirá criar agendamentos
D) A recepção poderá cadastrar pacientes

**Gabarito:** A — Tempo de resposta mensurável com condições de carga caracteriza requisito de qualidade/performance.

**Questão 2.** Qual artefato liga requisitos a testes e auxilia análise de impacto de mudanças?

A) Matriz de rastreabilidade
B) Tabela de usuários sem vínculo
C) Somente arquivo de cores CSS
D) Log de acesso sem relação com requisito

**Gabarito:** A — Rastreabilidade conecta origem, implementação e validação dos requisitos.


---

# REST, HTTP, APIs e autenticação web

# Objetivo e contexto
Interpretar métodos, códigos, idempotência e controles de uma API.

## Aula detalhada — entenda o mecanismo
**HTTP** organiza requisições e respostas por métodos, URI, cabeçalhos, corpo e status. **GET** é seguro no sentido semântico (não deveria solicitar alteração de estado); GET, PUT e DELETE são definidos como idempotentes pela semântica HTTP, embora o servidor possa registrar logs e outras consequências indiretas. **POST** não é idempotente por padrão; **PATCH** não é necessariamente idempotente. A idempotência significa que repetir requisições equivalentes produz o mesmo efeito pretendido no estado do servidor, não respostas de bytes idênticos.

**Status**: 200 sucesso com representação, 201 recurso criado, 204 sucesso sem conteúdo, 400 requisição inválida, 401 não autenticado/credenciais inadequadas, 403 acesso proibido, 404 recurso ausente, 409 conflito de estado, 429 limite de requisições, 500 erro interno. 401 e 403 são muito cobrados em provas.

Uma API precisa tratar autenticação, autorização por objeto, validação de entrada, limites de requisição e logs sem vazar dados. **Cookie HttpOnly** dificulta leitura do cookie via JS da página; **Secure** exige envio em conexões seguras; **SameSite** auxilia mitigação de certos cenários de CSRF, mas não substitui análise completa. Um JWT assinado não é necessariamente criptografado. O frontend nunca deve ser o único guardião de permissões.

## Exemplo resolvido passo a passo
Recurso `questoes/42`: `GET /questoes/42` lê sem alteração pretendida; `PATCH /questoes/42` ajusta parte do registro; `DELETE /questoes/42` solicita remoção. Uma chamada `POST /simulados` pode criar nova tentativa e responder `201 Created`.

Se um usuário autenticado tenta ver tentativas de outro usuário e não tem permissão, resposta adequada frequentemente é `403` (ou `404` para não revelar existência, por escolha de segurança). Se não está autenticado, `401` exige autenticação. Repita um `PUT` com mesmo estado: efeito pretendido não deve criar modificações adicionais diferentes. Observe ETag/If-Match para evitar sobrescrita concorrente quando requerido.

## Erros clássicos nas bancas
**Pegadinha:** “DELETE não é idempotente porque segunda resposta pode ser 404” é conceitualmente incorreto: as respostas podem diferir sem violar idempotência. **Pegadinha:** 401 não significa simplesmente “sem permissão” para usuário já identificado; 403 é mais representativo. **Pegadinha:** REST não significa usar JSON obrigatoriamente; é um estilo arquitetural.

## Pratique sem consultar
Desenhe quatro endpoints de uma plataforma de simulados, com método, código de sucesso e situação de erro. Explique como impedir usuário de acessar histórico de terceiros e por que o servidor precisa validar permissão mesmo quando o botão está escondido no frontend.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
RFC 9110 — semântica HTTP: https://www.rfc-editor.org/rfc/rfc9110.html
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual método HTTP é geralmente seguro e idempotente segundo a semântica HTTP?

A) GET
B) POST
C) PATCH necessariamente
D) CONNECT

**Gabarito:** A — GET não deve solicitar mudança no estado da aplicação e é definido como seguro/idempotente.

**Questão 2.** Um usuário autenticado tenta acessar recurso para o qual não tem autorização. Qual status é normalmente adequado?

A) 403 Forbidden
B) 201 Created
C) 304 Not Modified
D) 100 Continue

**Gabarito:** A — 403 expressa recusa de autorização; 401 se relaciona a autenticação, conforme contexto.


---

# Testes, Git, CI/CD e qualidade

# Objetivo e contexto
Criar estratégia de testes e pipeline sem confundir cobertura com correção.

## Aula detalhada — entenda o mecanismo
**Teste unitário** exercita unidade pequena com isolamento controlado; **integração** verifica componentes colaborando (API + banco), **sistema** valida conjunto completo e **aceitação** observa critérios do usuário/negócio. Pirâmide de testes sugere muitos testes rápidos e determinísticos, com menos testes caros de ponta a ponta; não é regra fixa de porcentagens. **Regressão** detecta se alterações quebraram comportamentos antes corretos.

**Git** registra commits e branches; o commit captura uma versão do repositório e não substitui backup do banco em produção. Merge integra históricos; rebase reaplica commits e pode reescrever histórico, exigindo cuidado com branches compartilhadas. Pull request viabiliza revisão. **CI** executa build, testes e validações em integração frequente. **CD** pode significar entrega contínua (artefato pronto para publicação) ou implantação contínua (publicação automatizada), conforme contexto.

A segurança do pipeline exige controle de segredos, dependências, permissões mínimas e revisão de atualizações. Métricas: tempo de build, testes instáveis, cobertura e defeitos em produção. Cobertura 100% significa execução das linhas/ramificações medidas, **não prova ausência de bugs**. Testes devem conter casos de erro, fronteiras, concorrência e autorização, não apenas “caminho feliz”.

## Exemplo resolvido passo a passo
Em EstudaTI, teste unitário valida cálculo de subnetting; integração valida `/api/quiz/submit` escrevendo e lendo SQLite; ponta a ponta simula usuário abrindo aula e respondendo questão no navegador. Pipeline executa: formatação/lint → verificação de tipos TS → testes Python → build React → análise de dependências → imagem Docker.

Uma mudança adiciona progresso em aulas: migração cria tabela com `CREATE TABLE IF NOT EXISTS`, não apaga históricos; teste cria banco antigo, inicia nova versão e verifica se tentativas permanecem. Essa é regressão de dados. Para publicação, use versão anterior disponível e backup testado.

## Erros clássicos nas bancas
**Pegadinha:** teste de integração não é necessariamente teste de ponta a ponta. **Pegadinha:** “pipeline verde” indica verificações escolhidas passaram, não auditoria completa de segurança. **Pegadinha:** Git não armazena dados de SQLite que nunca foram adicionados ao repositório. **Pegadinha:** `git rebase` de branch pública pode causar conflitos de histórico.

## Pratique sem consultar
Escreva uma estratégia de quatro testes para o cadastro de usuário: unidade, integração, autorização e navegador. Defina caso de limite de senha, erro de banco e tentativa de acesso sem cookie. Em seguida, liste etapas de CI que impediriam a entrega com build React quebrado.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
pytest — documentação de testes: https://docs.pytest.org/en/stable/
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual teste costuma validar a interação entre API e banco de dados real de teste?

A) Teste de integração
B) Somente teste unitário totalmente isolado
C) Teste visual de cor
D) Teste ortográfico de comentário

**Gabarito:** A — Integração observa interação entre componentes e contratos reais.

**Questão 2.** O que uma cobertura de testes de 100% garante?

A) Somente que a métrica de cobertura adotada foi atingida
B) Ausência de todos os bugs possíveis
C) Ausência de vulnerabilidades de negócio
D) Que o software satisfaz todas as necessidades

**Gabarito:** A — Cobertura mede execução de artefatos de código, não qualidade suficiente ou ausência de defeitos.
