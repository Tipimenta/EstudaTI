# EstudaTI — Padrão editorial de aulas (edição 2026-11)

## Objetivo
Ensinar conceitos de concursos de Tecnologia da Informação a quem está começando, com precisão técnica para candidatos avançados. A prioridade é **aprendizagem**, não número de caracteres.

## Cada aula reconstruída deve conter
1. **Um assunto bem delimitado:** o estudante deve entender o que será aprendido e o que fica para a aula seguinte.
2. **Teoria em sequência lógica:** problema concreto, conceito, funcionamento, fronteiras e exceções; definir siglas na primeira ocorrência.
3. **Exemplo resolvido passo a passo:** situação realista, premissas, raciocínio, conclusão e verificação.
4. **Pegadinhas de prova:** apresentar confusões plausíveis e explicar por que estão erradas, sem atribuir questões autorais a bancas reais.
5. **Perguntas de recuperação ativa:** o aluno tenta responder antes de abrir o gabarito, com correção objetiva.
6. **Questões interativas:** enunciado original, quatro alternativas coerentes, gabarito válido e comentários das alternativas.
7. **Aprofundamento facultativo:** referências, exceções e detalhes além do essencial devem ficar fechados inicialmente.
8. **Fontes e data:** normas e leis devem ser verificadas na fonte vigente antes de revisão editorial.

## Uma aula, uma finalidade
- **Fundamentos:** introduz o conceito e um exemplo acessível.
- **Aprofundamento:** explica mecanismo, exceções e resolução mais exigente.
- **Aplicação:** utiliza casos de prova e diagnóstico, sem duplicar integralmente a teoria.

O leitor principal mostra os blocos na sequência *entenda → veja aplicado → teste-se → resolva questões*. Cadernos automáticos antigos não fazem parte do texto principal. O arquivo permanece preservado para consulta opcional e continuidade dos estudos, sem apagamento de progresso.

## Critérios antes de aprovar novos capítulos
- Mínimo de 3 seções conceituais não repetitivas.
- Pelo menos 1 problema com resolução demonstrada e 2 perguntas de compreensão.
- Distinção explícita entre fato, regra geral e exceção relevante.
- No mínimo 3 pegadinhas fundamentadas, sem inventar padrões específicos de banca.
- Questões novas com alternativas plausíveis, gabarito e explicação de cada opção.
- Exercícios sem vazar o gabarito antes do clique do aluno.
- Testar compilação web, acesso à API, gravação de progresso e histórico de questões após cada atualização.
- Reescrita autoral, sem copiar material fechado de Gran ou Qconcursos; referências públicas só para verificação técnica.

## Migração progressiva e proteção de dados
O banco PostgreSQL Neon mantém a tabela de tópicos original e os registros de progresso. O novo conteúdo didático é versionado em arquivos TypeScript sob web/src/academy/ e associado ao mesmo ID existente, de modo que anotações, questões anteriores e conclusão continuem válidas. Não apagar nem renumerar tópicos durante a migração.

Em 02/11/2026: 48 aulas reescritas integralmente em arquivos `web/src/academy` e 121 aulas restantes apresentadas em leitura guiada, usando `guides*.ts`. **Leitura guiada não significa reescrita completa**: guias anteriores têm matéria específica, exemplo e pegadinha, mas parte ainda é curta e requer revisão editorial.

Os 169 tópicos estão organizados por disciplina e módulos curriculares. Cada aula apresenta as etapas **Aprender → Praticar → Revisar**. As questões são submetidas à API e registradas no Neon; os flashcards existentes são revisados por rodadas de 15 com agendamento no banco. Um erro de questão pode ser salvo como flashcard individual. Os cartões de consulta rápida na aula são diferentes da revisão espaçada efetiva, que precisa ser registrada na aba Revisar.

Inventário validado: 169 aulas, 594 questões ativas e 410 flashcards (contagens no banco em 02/11/2026). 1 aula concluída preservada. As questões criadas para os novos capítulos têm comentários para cada alternativa; não atribuir bancas reais às questões autorais.

Padrão de continuidade: aprofundar os 130 capítulos curtos individualmente e elevar o número de questões autorais por tópico com revisão técnica real. Não preencher páginas com parágrafos repetidos, exercícios genéricos ou trechos de outras aulas apenas para aumentar estatísticas.

## Ajuste de navegação e foco didático (02/11/2026, noite)
A pedido do usuário, a seção visual de **Aprofundamento complementar (opcional)** foi eliminada, pois desviava da aula principal. O conteúdo extra segue versionado no código para eventual pesquisa editorial, mas não é exposto como outro bloco para o aluno. As abas Aprender, Praticar e Revisar permanecem.

Foram removidos os diversos botões repetidos para iniciar questões e concluir a aula, assim como a apostila paralela e filtros desnecessários. O botão da **última etapa da leitura** passa a ser **Resolver questões** (não fica desabilitado como o antigo Continuar 9/9). A última questão respondida oferece **Ir para revisão**, e o aluno só conclui a aula na etapa de revisão. Caso concluída, há um caminho único para a próxima aula. Nenhuma tabela de progresso, cartão ou tentativas antigas foi apagada.

O acervo foi ampliado com 9 capítulos didáticos completos de DNS, criptografia, Docker, coesão, SLA/SLO/SLI, GROUP BY, Git, combinatória e Lei de Acesso à Informação. Restam 121 capítulos com conteúdo ainda curto, que exigem aprofundamento individual. Não descrevê-los como plenamente reescritos.
