# EstudaTI — padrão pedagógico obrigatório para revisão de aulas
Atualizado em 05/11/2026

## O problema identificado

Exemplo que **não ensina**:

> Camada de sessão: controle de sessões em modelos conceituais.

Isso apenas nomeia uma função. Um aluno iniciante não sabe o que é sessão, por que existem mecanismos de controle, o que significa organizar o diálogo, o que é um modelo conceitual e como essas ideias se ligam à comunicação real.

Exemplo que **ensina**:

> Imagine dois programas trocando informações durante uma tarefa demorada. Além de enviar cada dado, pode ser importante acompanhar o início, a continuidade e o encerramento dessa interação, ou registrar pontos em que ela possa ser retomada. Essa organização do diálogo é uma das funções associadas à camada de sessão do modelo OSI. É uma classificação conceitual: na Internet atual essas funções frequentemente estão nos protocolos ou na aplicação e não exigem uma camada 5 executada separadamente.

## Critério mínimo para novas aulas e revisões

1. **Começar por uma situação reconhecível.** Não introduzir uma sigla no título da explicação antes de o leitor conhecer a necessidade.
2. **Definir cada termo na primeira ocorrência significativa.** Explicar, em linguagem comum, o que a coisa é. Ex.: interface, endereço, rede, pacote, protocolo.
3. **Dizer por que existe.** Qual dificuldade concreta a solução resolve?
4. **Descrever funcionamento passo a passo.** Não trocar o mecanismo por uma associação para decorar.
5. **Explicar o vínculo com o que já foi ensinado.** Ex.: MAC ajuda a encaminhar quadro no enlace local; IP oferece endereçamento usado entre redes; porta lógica distingue comunicação entre programas.
6. **Diferenciar termos próximos.** Sessão conceitual OSI ≠ necessariamente sessão de login; DNS ≠ DHCP; autenticação ≠ autorização; software instalado ≠ processo ativo.
7. **Oferecer exemplo resolvido.** Com situação, hipóteses, raciocínio, resposta e por que alternativas semelhantes não servem.
8. **Testar a compreensão.** Questões autorais de aplicação com comentários de todas as alternativas e flashcards que exijam explicar conceitos.
9. **Evitar frases soltas e texto inflado.** Não anexar apostilas genéricas, cadernos copiados de outras aulas ou repetição em 'aprofundamento complementar'.
10. **Aprofundamento como continuidade.** Se for necessário um termo novo, desenvolver a base em sequência; conteúdos opcionais não devem interromper o essencial.

## O que já foi reconstruído nesta rodada

**11 capítulos iniciais**, abrangendo as nove áreas:

- RED 1 — Como uma mensagem atravessa a rede: OSI e TCP/IP (9 etapas, incluindo MAC, IP, sessão, codificação, porta e encapsulamento)
- RED 2 — IP, máscara, gateway, DNS e DHCP, com prefixo /26 calculado
- RED 3 — Switch, roteador, VLAN, VPN e firewall, com cenário entre sub-redes
- SEG 4 — CID, ameaça, vulnerabilidade, risco, controle, autenticação/autorização
- SO 6 — Sistemas operacionais, software, processo, serviço, usuário, permissão e logs
- POR 8 — Leitura, tese, assunto, inferência, quantificadores e conectivos
- GOV 10 — Serviço, incidente, contorno, problema e mudança
- BD 12 — Banco, SGBD, SQL, tabelas, chaves, JOIN e transações
- ENG 14 — Requisitos, critérios de aceite, tipos de testes, Git e commit
- LOG 16 — Proposição, negação, conectivos e condicional
- LEG 17 — Dado pessoal, dado sensível, tratamento, titular, controlador, finalidade e necessidade

Esses 11 capítulos têm exemplos resolvidos, armadilhas e revisões. Foram incluídas **15 questões de aplicação originais**, cada uma com explicações dos quatro itens. Em seguida, mais **9 aulas intermediárias** de matérias diferentes foram reescritas com o mesmo critério e receberam **9 questões contextualizadas** adicionais. Os IDs existentes foram preservados, assim como anotações, histórico e progresso.

### Nove capítulos intermediários reconstruídos

| Disciplina | ID | Assunto |
|---|---:|---|
| Redes | 24 | IPv6, SLAAC e anúncios de roteador |
| Segurança | 31 | Incidentes, evidências, contenção e recuperação; NIST SP 800-61 rev. 3 |
| Sistemas Operacionais | 41 | RAID 1, RAID 5, paridade e por que backup é diferente |
| Português | 49 | Denotação, conotação, contexto e ambiguidade |
| Governança | 56 | Scrum, Sprints, Kanban e limites de WIP |
| Banco de Dados | 64 | Índices, B-tree e custo do plano de execução |
| Engenharia de Software | 68 | Diagramas UML e o problema respondido por cada um |
| Raciocínio Lógico | 78 | Probabilidade, complemento e independência |
| Legislação | 87 | Modalidades de licitação e critérios de julgamento |

**Importante:** as **169 aulas** foram contempladas, e não apenas a primeira ou o bloco introdutório. O teste automático `test_curadoria_curso_inteiro_20261105.py` confere a cobertura individual e a estrutura; não pretende certificar didática apenas por tamanho de texto.

**18 capítulos adicionais** haviam sido reescritos editorialmente na revisão anterior (duas aulas por disciplina), sem duplicar os IDs acima.

### Limite real

**169 de 169 capítulos** agora possuem conteúdo editorial individual na experiência de aulas: 18 revisões anteriores, 11 fundamentos, 9 intermediários e **131 capítulos adicionais criados nesta rodada**, com explicação de conceitos, conexão com conteúdo anterior, caso resolvido em quatro etapas, armadilhas e quatro cartões de revisão por aula. Foram mantidos os IDs do curso, suas questões já existentes e os registros de progresso.\n\nO teste automatizado verifica que todos os IDs estão cobertos por um único capítulo revisado e que há as seções, casos e cartões esperados. **Ele não comprova que nenhuma explicação tenha erro factual ou que todo aluno aprenderá sem dúvidas**; revisões e correções futuras continuam necessárias, especialmente quando normas e editais mudarem. O objetivo foi substituir conteúdo fragmentado, não acrescentar textos genéricos ao fim de cada aula.

## Regras de publicação

- Não anunciar ausência absoluta de erros ou que o curso dispensa todas as outras fontes de estudo; a revisão editorial cobre todos os 169 IDs e deve continuar aberta a correções pontuais.
- Executar testes de conteúdo, frontend, API e compatibilidade de banco antes da publicação.
- Conferir SHA do deployment Vercel como READY para afirmar que a experiência nova está ativa.
- Nunca apagar o progresso do usuário, questões antigas, tentativas e flashcards durante uma reescrita.
- Não usar IA para presumir gabarito oficial de concurso. Material autoral e material oficial permanecem identificados separadamente.

## Revisão do currículo completo — 05/11/2026

Foram reescritas individualmente as **131 aulas que ainda estavam pendentes**, somadas às **38 aulas anteriormente reconstruídas**. Cobertura editorial: **169/169 aulas, em nove matérias**, preservando os mesmos IDs e, portanto, os vínculos de progresso, anotações e questões.

Os 131 capítulos desta etapa encontram-se em `web/src/academy/fullRED.ts`, `fullSEG.ts`, `fullSO.ts`, `fullPOR.ts`, `fullGOV.ts`, `fullBD.ts`, `fullENG.ts`, `fullLOG.ts` e `fullLEG.ts`. Cada capítulo tem objetivos específicos, contextualização que introduz o problema, explicação do funcionamento, conexão com conhecimento anterior, aplicação à prova, estudo de caso resolvido em quatro passos, quatro pegadinhas e quatro cartões de recuperação. Não são anexos genéricos: substituem a aula exibida. O componente `editorialBuilder.ts` é apenas um modelo comum de apresentação; o conteúdo de cada tema é escrito especificamente.

A renderização em `academy/index.ts` foi simplificada para usar apenas a redação própria de cada aula, **sem os antigos `pedagogicalBoosts` e `recallSupplement` genéricos**. Os registros e tentativas do banco permanecem intactos.

A validação `api/tests/test_complete_course_20261105.py` confere unicidade dos IDs, cobertura integral de 169, presença de todas as partes didáticas e quatro flashcards distintos por capítulo. Isso **não equivale a uma certificação de precisão científica ou eficácia de aprendizagem**: conceitos legais e tecnologias sujeitos a revisão exigem manutenção editorial e monitoramento de editais. A quantidade de caracteres, sozinha, não demonstra qualidade pedagógica.

As questões históricas e o algoritmo de revisão espaçada não foram integralmente reescritos nesta etapa; as novas perguntas de revisão aparecem diretamente nas páginas das aulas. A expansão de itens autorais no banco e a incorporação dos novos cartões ao agendamento espaçado são tarefas separadas, para evitar duplicações ou perda do histórico.
