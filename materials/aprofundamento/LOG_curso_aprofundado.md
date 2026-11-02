# EstudaTI — LOG: Aprofundamento

Conteúdo autoral; não substitui conferir o edital e textos oficiais.


---

# Proposições, implicação e equivalências

# Objetivo e contexto
Resolver tabelas-verdade e distinguir contrapositiva, recíproca e negação.

## Aula detalhada — entenda o mecanismo
Uma **proposição** é enunciado declarativo ao qual se atribui verdadeiro ou falso sob interpretação definida; perguntas e ordens não são proposições simples. Operadores: conjunção `P ∧ Q` só é verdadeira se ambos verdadeiros; disjunção inclusiva `P ∨ Q` só é falsa se ambos falsos; implicação material `P → Q` só é falsa quando P verdadeira e Q falsa; bicondicional `P ↔ Q` é verdadeiro quando valores coincidem; negação inverte valor.

A implicação `P → Q` é equivalente a `¬P ∨ Q` e à **contrapositiva** `¬Q → ¬P`. Já a recíproca `Q → P` não é equivalente em geral. Leis de De Morgan: `¬(P ∧ Q) ≡ ¬P ∨ ¬Q` e `¬(P ∨ Q) ≡ ¬P ∧ ¬Q`. Negar uma implicação produz `P ∧ ¬Q`, não uma nova implicação invertida.

Em provas com linguagem natural, a palavra “se” introduz condição suficiente no sentido de `P → Q`; “somente se” costuma expressar necessidade: “P somente se Q” também se formaliza como `P → Q`. Cuidado com quantificadores implícitos e contexto para não aplicar uma fórmula a frase ambígua.

## Exemplo resolvido passo a passo
Enunciado: “Se o servidor está atualizado (P), então a correção está instalada (Q)”. Teste P=V e Q=F: a implicação é F. Para P=F e Q=F: a implicação material é V, mesmo que pareça contraintuitivo fora da lógica formal.

Contrapositiva: “Se a correção não está instalada (¬Q), então o servidor não está atualizado (¬P)”, com mesma tabela-verdade. Recíproca “Se a correção está instalada então o servidor está atualizado” não é dedução válida a partir da original. Negação da implicação: “Servidor atualizado E correção não instalada”, único cenário que falsifica a regra.

## Erros clássicos nas bancas
**Pegadinha:** implicação não significa causalidade. **Pegadinha:** “ou” em lógica proposicional normalmente é inclusivo salvo especificação. **Pegadinha:** contrária/inversa/recíproca não são automaticamente equivalentes. **Pegadinha:** a negação de “P e Q” troca o conectivo por “ou” e nega ambos.

## Pratique sem consultar
Construa tabela-verdade de `(P → Q) ↔ (¬Q → ¬P)` para quatro combinações. Negue `P ∨ Q` usando De Morgan. Formalize e negue: “Se estudo, então passo na prova” sem confundir com a recíproca.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
OpenStax — Matemática: https://openstax.org/subjects/math
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Qual é a negação lógica de P → Q?

A) P ∧ ¬Q
B) ¬P → ¬Q
C) Q → P
D) ¬P ∨ Q

**Gabarito:** A — Implicação é falsa exatamente quando antecedente é verdadeiro e consequente falso; sua negação expressa essa situação.

**Questão 2.** Qual expressão é equivalente a P → Q?

A) ¬Q → ¬P
B) Q → P
C) P ∧ Q
D) ¬P ∧ ¬Q

**Gabarito:** A — Contrapositiva é equivalente à implicação original; recíproca não é em geral.


---

# Conjuntos, probabilidade e combinatória

# Objetivo e contexto
Evitar dupla contagem e distinguir eventos independentes de excludentes.

## Aula detalhada — entenda o mecanismo
Para conjuntos finitos, **inclusão-exclusão** de dois conjuntos: `|A∪B|=|A|+|B|−|A∩B|`. A interseção reúne elementos comuns; união reúne elementos de pelo menos um. Se “nenhum dos dois” for pedido, subtraia a união do total do universo.

Em experimento equiprovável, `P(A)=casos favoráveis/total de casos`. Complementar: `P(não A)=1−P(A)`. Eventos **independentes** satisfazem `P(A∩B)=P(A)P(B)`. Eventos **mutuamente exclusivos** não ocorrem juntos; se ambos têm probabilidade positiva, não são independentes. Probabilidade condicional `P(A|B)=P(A∩B)/P(B)` se P(B)>0.

Combinatória: permutação de n distintos é `n!`. **Arranjo** considera ordem de escolha, `A(n,k)=n!/(n−k)!`; **combinação** ignora ordem, `C(n,k)=n!/(k!(n−k)!)`. Para grupos de pessoas sem cargos, combinação; para presidente e secretário com posições distintas, arranjo. Sempre defina primeiro se seleção permite repetição e se ordem importa.

## Exemplo resolvido passo a passo
Em 50 candidatos, 28 estudam Linux, 21 estudam redes e 9 estudam ambos. União = 28+21−9 = **40**; nenhum = 50−40 = **10**. Se você somar 28+21, contará os nove duas vezes.

Escolher comissão de 3 entre 6 sem cargos: `C(6,3)=6!/(3!3!)=20`. Se quiser presidente e secretário entre 6 pessoas distintas, `6×5=30` arranjos.

Dois lançamentos independentes de moeda justa: `P(duas caras)=1/2×1/2=1/4`. Já “cara no mesmo lançamento” e “coroa no mesmo lançamento” são mutuamente exclusivos, mas não independentes.

## Erros clássicos nas bancas
**Pegadinha:** a expressão “ao menos um” frequentemente sugere complemento. **Pegadinha:** “ambos” é interseção, e não soma. **Pegadinha:** a fórmula da combinação pressupõe escolha sem repetição. **Pegadinha:** independência não é sinônimo de incompatibilidade.

## Pratique sem consultar
Resolva: turma de 80 pessoas; 45 estudam redes, 35 segurança, 20 ambos. Quantos estudam pelo menos um? Quantos nenhum? Depois calcule número de comissões de dois entre sete pessoas, e número de pares com funções de líder e suplente.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
OpenStax — Matemática: https://openstax.org/subjects/math
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Se |A|=28, |B|=21 e |A∩B|=9, quanto vale |A∪B|?

A) 40
B) 58
C) 49
D) 19

**Gabarito:** A — Pela inclusão-exclusão: 28+21−9=40; nove pessoas estavam contadas duas vezes.

**Questão 2.** Quantos grupos distintos de 3 pessoas podemos formar entre 6, sem considerar ordem?

A) 20
B) 120
C) 30
D) 18

**Gabarito:** A — C(6,3) = 6!/(3!3!) = 20; a ordem não cria grupo novo.


---

# Equações, progressões e análise de problemas

# Objetivo e contexto
Traduzir enunciados em expressões sem aplicar fórmulas fora de contexto.

## Aula detalhada — entenda o mecanismo
**Equação** é igualdade envolvendo incógnitas; a solução precisa satisfazer condições originais. Em equações de 1º grau, isole incógnita com operações equivalentes. Em 2º grau, `ax²+bx+c=0` com a≠0; discriminante `Δ=b²−4ac`, soluções reais quando Δ≥0. Não divida por expressão que pode ser zero sem analisar casos.

**PA** tem diferença constante: `a_n=a_1+(n−1)r`; soma `S_n=n(a_1+a_n)/2`. **PG** tem razão constante `q` (quando definida): `a_n=a_1 q^(n−1)`; soma de PG finita com q≠1: `S_n=a_1(q^n−1)/(q−1)`. Bancas podem misturar crescimento linear e exponencial; identifique padrão pela diferença e razão entre termos.

**Regra de três** exige proporcionalidade demonstrável. Mais técnicos nem sempre implicam tempo inversamente proporcional se há dependências, gargalos ou divisão não linear do trabalho. Em questão idealizada, supondo trabalho fixo e produtividade igual, pessoas × tempo pode ser constante. Leia hipóteses, unidades e arredondamentos antes do cálculo.

## Exemplo resolvido passo a passo
PA: um curso tem 5 questões no dia 1 e acrescenta 3 por dia. No 8º dia, `a_8 = 5 + 7×3 = 26`. Total nos oito dias: `S_8 = 8×(5+26)/2 = 124`.

PG: número de backups processados dobra a cada etapa a partir de 2: 2,4,8,16... O 6º termo é `2×2^5 = 64`. Se a prova cobrar total até a 6ª etapa, soma = `2(2^6−1)=126`.

Equação: orçamento de R$ 1.200 inclui 3 licenças iguais mais taxa de R$ 150. `3x+150=1200`; logo `x=350`. Verifique: 3×350+150=1.200. Traduzir o problema é tão importante quanto calcular.

## Erros clássicos nas bancas
**Pegadinha:** PA não se identifica apenas por termos crescentes; precisa diferença constante. **Pegadinha:** `n−1` no termo geral evita erro de uma posição. **Pegadinha:** taxa fixa em orçamento não deve ser multiplicada pela quantidade de itens. **Pegadinha:** não arredonde resultados intermediários sem justificativa.

## Pratique sem consultar
Construa uma PA com primeiro termo 7 e razão 4; encontre 12º termo e soma de 12 termos. Construa uma PG com primeiro termo 3 e razão 2; calcule 5º termo. Escreva uma equação simples para “três parcelas iguais e uma taxa de R$ 20 somam R$ 170”.

## Revisão e transferência
Feche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.

## Fonte de aprofundamento
OpenStax — Matemática: https://openstax.org/subjects/math
Material autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.

## Questões comentadas da aula

**Questão 1.** Em uma PA com a1=5 e razão r=3, qual é o 8º termo?

A) 26
B) 24
C) 29
D) 21

**Gabarito:** A — O termo geral usa n−1 intervalos: 5+(8−1)×3=26.

**Questão 2.** Em uma PG com a1=2 e razão q=2, qual é o 6º termo?

A) 64
B) 32
C) 128
D) 12

**Gabarito:** A — a6 = 2×2^5 = 64; o expoente é n−1.
