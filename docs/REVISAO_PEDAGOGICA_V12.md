# EstudaTI V1.2 — Revisão pedagógica das nove disciplinas

**Base:** V1.1.1. **Perfil da atualização:** aditiva, com foco em aplicação, resolução de problemas e transferência para questões de concurso. Não há exclusão automática de aulas anteriores nem substituição de anotações.

## Diagnóstico editorial

A V1.1.1 possuía 151 aulas, 268 questões autorais (267 ativas e uma arquivada por duplicação), 374 flashcards e 27 dissertativas. As 90 aulas introdutórias eram majoritariamente sintéticas. Os 61 conteúdos chamados de “aprofundamento” variavam bastante em extensão; algumas partes retomavam o mesmo conceito com vocabulário ligeiramente diferente. Não é possível classificar **todas** como cobertura completa de edital.

A V1.2 conserva esses materiais como *fundamentos e aprofundamento* e acrescenta **18 oficinas aplicadas** (duas por disciplina), com caso, raciocínio resolvido, erros típicos, treino sem consulta, **36 questões objetivas autorais** e **36 flashcards**. As oficinas não são transcrições de provas de bancas; os nomes de bancas nos materiais descrevem estilos de cobrança hipotéticos.

## Organização didática agora adotada

1. **Conceito:** ler aula introdutória somente quando não domina o pré-requisito.
2. **Aprofundamento:** estudar mecanismos, terminologia e casos de referência (material já existente).
3. **Oficina de prova:** resolver caso novo, tomar decisões justificadas, comparar alternativas plausíveis.
4. **Verificação:** responder questões sem consulta, justificar os distratores e registrar dúvidas/erros.
5. **Retenção:** voltar ao tema por flashcards e questões inéditas. Marcar “concluído” não comprova domínio.

Na interface, `Matérias e aulas > Disciplina > Trilha recomendada` apresenta os aprofundamentos e depois as oficinas. `Oficinas de prova` filtra somente os casos. `Aulas introdutórias` permanece acessível para reforço. O histórico antigo não é recalculado nem apagado.

## Matriz de competências — o que as oficinas acrescentam

| Matéria | Oficina 1 — competência nova | Oficina 2 — competência nova | Evidência mínima para domínio |
|---|---|---|---|
| Redes | Diagnóstico por hipóteses de DNS, rede, transporte e TLS | Cálculo de sub-redes e longest-prefix match | Justificar teste e resolver CIDR sem auxílio |
| Segurança | Resposta a incidente com evidências e RTO/RPO | Autenticação, autorização e risco residual | Diferenciar fato, controle e consequência |
| SO | Falha de domínio/GPO por escopo e precedência | Logs, permissões e serviços Linux | Descrever investigação mínima sem ações destrutivas |
| Português | Reescrita conservando quantificadores/conectivos | Correção de parecer técnico sem inventar fatos | Produzir frase formal e demonstrar equivalência |
| Governança | SLI/SLO/SLA com cálculo e janela | Priorização auditável de investimentos | Explicar indicador e justificar decisão por evidências |
| Banco de dados | JOIN/COUNT/WHERE/HAVING no mesmo cenário | Concorrência, isolamento e update condicional | Produzir SQL correto e analisar efeito dos dados |
| Engenharia | Critérios de aceite e testes observáveis | Semântica HTTP e repetição de operações | Justificar testes e idempotência de API |
| Lógica | Implicação/contrapositiva e interseção de conjuntos | Probabilidade condicional e contagem | Mostrar denominador, passos e resultado |
| Legislação | LGPD na atuação pública com finalidade e necessidade | ETP/TR e fiscalização de contratação de TI | Justificar premissas legais e separar documentos |

## Lacunas que permanecem (não são disfarçadas)

A complementação não é equivalente a nove apostilas comerciais exaustivas. Ainda faltam centenas de subassuntos de provas diferentes, aulas de vídeo e questões oficiais verificadas. **Nenhuma correção pode garantir equivalência ao Gran/TEC/Estatégia sem medir cobertura e qualidade por edital**.

- **Redes:** expandir IPv6, camada de enlace, switching, WLAN, roteamento dinâmico, segurança de protocolos.
- **Segurança:** aprofundar PKI, gestão de identidade, ameaças, resposta, proteção de endpoint, normas e análise quantitativa de risco.
- **SO:** administração Windows/Linux completa, script, virtualização, armazenamento, containers e nuvem.
- **Português:** oferecer corpus de textos de nível banca e ampla bateria de regência, concordância, sintaxe e reescrita.
- **Governança:** expandir COBIT, ITIL, planejamento público, controle interno, indicadores, contratos e gestão de projetos.
- **Banco de dados:** práticas de álgebra relacional, modelagem, transações, SQL avançado, tunning e NoSQL.
- **Engenharia:** ampliar padrões de projeto, arquiteturas, versionamento, métodos ágeis, testes automatizados, APIs e segurança de software.
- **Lógica:** ampliar sequências, matrizes, funções, geometria, probabilidade, contagem e raciocínio verbal.
- **Legislação:** estudar o texto vigente dos diplomas no **edital específico**; evitar inferir regras de um órgão para outro.

**Nota:** a listagem de lacunas é uma pauta de ampliação, não uma auditoria de conformidade de todo o edital. O edital de Birigui enviado pelo usuário foi utilizado para orientar o núcleo comum de TI, mas não comprova a cobertura de outros concursos.

## Controles editoriais e de integridade da atualização

- Títulos das 18 oficinas são novos e têm identidade própria; as duas oficinas de cada matéria avaliam capacidades diferentes.
- Exercícios objetivam aplicar raciocínio, e não repetir a pergunta de definição correspondente.
- Distratores foram redigidos no domínio técnico e gabaritos são embaralhados de maneira determinística na criação; os enunciados, gabaritos e explicações permanecem acessíveis para conferência.
- Um item exato duplicado da versão anterior permanece arquivado, sem apagamento de tentativas; o indicador do dashboard agora conta apenas questões com status `revisada`.
- A adição ao banco é idempotente: executar novamente a inicialização não recria as 18 oficinas, nem reinicia progresso, respostas ou notas pessoais.

## Referências para validação de conceitos (não são fonte de questões oficiais)

- RFC 9293 TCP: https://www.rfc-editor.org/info/rfc9293/
- RFC 4632 CIDR: https://www.rfc-editor.org/info/rfc4632/
- NIST CSF 2.0: https://www.nist.gov/cyberframework
- Microsoft Learn — processamento de GPO: https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing
- PostgreSQL — SELECT: https://www.postgresql.org/docs/current/sql-select.html
- PostgreSQL — isolamento: https://www.postgresql.org/docs/current/transaction-iso.html
- RFC 9110 HTTP: https://www.rfc-editor.org/info/rfc9110/
- Lei 13.709/2018: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Lei 14.133/2021: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm
- ABL/VOLP (ortografia): https://www.academia.org.br/nossa-lingua/busca-no-vocabulario

**Atenção normativa:** legislação, regulamentos e orientações externas podem mudar. A fonte recomendada deve ser conferida na data de estudo; a aula autoral não é parecer jurídico nem gabarito oficial.

## Transparência dos testes

- Testes automatizados da API: regressão, módulo dissertativo, migração, idempotência e conteúdo das 18 oficinas.
- Não houve teste end-to-end visual com navegador real, build completo do frontend nem execução real do Docker neste ambiente. Esses passos precisam ser validados no Windows do usuário.
