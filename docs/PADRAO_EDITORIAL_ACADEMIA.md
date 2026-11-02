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

Em 02/11/2026: 27 aulas com roteiro didático novo e 54 questões autorais novas com comentário por alternativa; o restante do catálogo continua disponível, mas ainda exige revisão editorial individual. A ampliação quantitativa prévia do acervo não deve ser descrita como reconstrução pedagógica concluída.
