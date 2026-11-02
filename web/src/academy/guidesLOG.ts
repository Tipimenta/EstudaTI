import type {LessonGuide} from './guidesTypes'
export const guidesLOG:LessonGuide[]=[
  {
    "id": 16,
    "code": "LOG",
    "title": "Proposições e implicação",
    "objective": "Aplicar implicação e negação.",
    "theory": "A proposição “P implica Q” só é falsa quando P é verdadeira e Q é falsa. A negação de “todos” é “existe pelo menos um que não”. Treine tabelas-verdade e quantificadores com exemplos curtos.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Quando P→Q é falsa?",
        "back": "Quando P é verdadeira e Q é falsa."
      },
      {
        "front": "Negação de “Todos são aprovados”?",
        "back": "Existe pelo menos um que não é aprovado."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 75,
    "code": "LOG",
    "title": "Tabelas-verdade e conectivos",
    "objective": "Explicar e aplicar: Tabelas-verdade e conectivos.",
    "theory": "A conjunção P∧Q é verdadeira somente quando ambas são verdadeiras. A disjunção inclusiva P∨Q é falsa apenas se ambas forem falsas. Negação inverte valor de verdade; bicondicional P↔Q é verdadeiro quando valores coincidem.",
    "practical": "Se P é verdadeiro e Q é falso, então P∧Q é falso, P∨Q é verdadeiro e P↔Q é falso.",
    "warning": "Ou lógico comum em concursos é inclusivo, salvo indicação contrária.",
    "recall": [
      {
        "front": "Se P é verdadeiro e Q é falso, qual valor de P∨Q?",
        "back": "Verdadeiro. Disjunção inclusiva é verdadeira se pelo menos um operando é verdadeiro."
      },
      {
        "front": "Quando P↔Q é verdadeiro?",
        "back": "Quando P e Q têm o mesmo valor lógico. Bicondicional é verdadeiro para valores iguais."
      },
      {
        "front": "Qual armadilha evitar em Tabelas-verdade e conectivos?",
        "back": "Ou lógico comum em concursos é inclusivo, salvo indicação contrária."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 76,
    "code": "LOG",
    "title": "Implicação e contrapositiva",
    "objective": "Explicar e aplicar: Implicação e contrapositiva.",
    "theory": "Implicação P→Q é falsa apenas quando P é verdadeira e Q falsa. Sua contrapositiva ¬Q→¬P é logicamente equivalente; a recíproca Q→P não é equivalente em geral.",
    "practical": "Se \"se é administrador, possui permissão\" então a contrapositiva diz \"se não possui permissão, não é administrador\" (na hipótese lógica).",
    "warning": "Não troque contrapositiva por inversa/recíproca.",
    "recall": [
      {
        "front": "Qual é a contrapositiva de P→Q?",
        "back": "¬Q→¬P. Contrapositiva nega e inverte termos."
      },
      {
        "front": "Qual atribuição torna P→Q falsa?",
        "back": "P verdadeira e Q falsa. Implicação falha quando antecedente ocorre e consequente não."
      },
      {
        "front": "Qual armadilha evitar em Implicação e contrapositiva?",
        "back": "Não troque contrapositiva por inversa/recíproca."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 77,
    "code": "LOG",
    "title": "Quantificadores e negação",
    "objective": "Explicar e aplicar: Quantificadores e negação.",
    "theory": "Negar \"todos possuem certificado\" produz \"existe ao menos um que não possui certificado\". Negar \"existe um que passou\" produz \"ninguém passou\". Troca-se ∀ por ∃, invertendo o predicado.",
    "practical": "¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x).",
    "warning": "Não confunda \"nem todos\" com \"nenhum\".",
    "recall": [
      {
        "front": "Negação de \"Todos os técnicos conhecem Linux\":",
        "back": "Algum técnico não conhece Linux. Negação de universal afirma um contraexemplo."
      },
      {
        "front": "Negação de \"Existe servidor indisponível\":",
        "back": "Todos os servidores estão disponíveis. Negar ∃ indisponível resulta ∀ disponível."
      },
      {
        "front": "Qual armadilha evitar em Quantificadores e negação?",
        "back": "Não confunda \"nem todos\" com \"nenhum\"."
      }
    ],
    "source_kind": "brief",
    "ready": false
  },
  {
    "id": 78,
    "code": "LOG",
    "title": "Probabilidade simples e complementar",
    "objective": "Explicar e aplicar: Probabilidade simples e complementar.",
    "theory": "Em espaço equiprovável, P(evento) = casos favoráveis/total. Complementar tem P(Aᶜ)=1−P(A). Independência implica P(A∩B)=P(A)P(B); não confundir com exclusividade.",
    "practical": "Ao lançar dado justo, probabilidade de não sair 6 é 5/6; probabilidade de sair 6 é 1/6.",
    "warning": "Eventos mutuamente exclusivos com probabilidade positiva não são independentes.",
    "recall": [
      {
        "front": "Qual a probabilidade de NÃO sair 6 ao lançar dado honesto?",
        "back": "5/6. Há cinco faces diferentes de 6 em seis igualmente prováveis."
      },
      {
        "front": "Se eventos A e B são independentes, P(A∩B) é:",
        "back": "P(A)×P(B). Para eventos independentes, multiplica-se as probabilidades."
      },
      {
        "front": "Qual armadilha evitar em Probabilidade simples e complementar?",
        "back": "Eventos mutuamente exclusivos com probabilidade positiva não são independentes."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 79,
    "code": "LOG",
    "title": "Combinação e permutação",
    "objective": "Explicar e aplicar: Combinação e permutação.",
    "theory": "Permutação de n itens distintos tem n! arranjos. Combinação C(n,k)=n!/(k!(n−k)!) escolhe grupos sem considerar ordem; arranjo considera ordem de seleção.",
    "practical": "Escolher dois analistas dentre cinco para uma comissão sem cargos distintos permite C(5,2)=10 grupos.",
    "warning": "Quando a ordem importa, uma combinação simples costuma subcontar casos.",
    "recall": [
      {
        "front": "Quantos pares sem ordem podem ser escolhidos entre 5 pessoas?",
        "back": "10. C(5,2)=5!/(2!3!)=10."
      },
      {
        "front": "Quantas ordenações distintas existem para 4 objetos distintos?",
        "back": "24. Permutação de quatro é 4!=24."
      },
      {
        "front": "Qual armadilha evitar em Combinação e permutação?",
        "back": "Quando a ordem importa, uma combinação simples costuma subcontar casos."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 80,
    "code": "LOG",
    "title": "Conjuntos e inclusão-exclusão",
    "objective": "Explicar e aplicar: Conjuntos e inclusão-exclusão.",
    "theory": "Para conjuntos A e B finitos, |A∪B|=|A|+|B|−|A∩B|. Interseção reúne elementos comuns; diferença A−B contém elementos de A ausentes em B.",
    "practical": "Em grupo de 40 pessoas, 22 usam Linux, 18 Windows e 8 ambos; 32 usam pelo menos um (22+18−8).",
    "warning": "Somar tamanhos sem descontar interseção duplica contagens.",
    "recall": [
      {
        "front": "Se |A|=22, |B|=18 e |A∩B|=8, quanto é |A∪B|?",
        "back": "32. 22+18−8=32."
      },
      {
        "front": "O conjunto A−B contém:",
        "back": "Elementos de A que não pertencem a B. Diferença exclui elementos presentes em B."
      },
      {
        "front": "Qual armadilha evitar em Conjuntos e inclusão-exclusão?",
        "back": "Somar tamanhos sem descontar interseção duplica contagens."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 81,
    "code": "LOG",
    "title": "Progressões e sequências",
    "objective": "Explicar e aplicar: Progressões e sequências.",
    "theory": "PA apresenta diferença constante entre termos, com a_n=a_1+(n−1)r. PG apresenta razão constante, com a_n=a_1·q^(n−1). Sequências figurais exigem justificar regra, pois padrões finitos podem ser ambíguos.",
    "practical": "PA 3,7,11,15 tem r=4; quinto termo é 19. PG 2,6,18 tem q=3; quarto é 54.",
    "warning": "Não assuma regra única sem considerar alternativas ou enunciado.",
    "recall": [
      {
        "front": "Qual é o 5º termo da PA 3,7,11,15,...?",
        "back": "19. A razão é 4 e o quinto termo é 15+4=19."
      },
      {
        "front": "Qual é o 4º termo da PG 2,6,18,...?",
        "back": "54. A razão é 3 e próximo termo é 18×3=54."
      },
      {
        "front": "Qual armadilha evitar em Progressões e sequências?",
        "back": "Não assuma regra única sem considerar alternativas ou enunciado."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 82,
    "code": "LOG",
    "title": "Regra de três e taxas",
    "objective": "Explicar e aplicar: Regra de três e taxas.",
    "theory": "Grandezas diretamente proporcionais variam na mesma razão; inversamente proporcionais variam em razão recíproca. Em problemas de trabalho, mantenha mesma produtividade e unidades coerentes; mudanças de produtividade requerem novo modelo.",
    "practical": "Quatro equipamentos iguais finalizam tarefa em seis horas; oito equipamentos iguais sob as mesmas condições podem terminar em três horas.",
    "warning": "Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo.",
    "recall": [
      {
        "front": "Se 4 máquinas idênticas fazem uma tarefa em 6 h, 8 máquinas fazem em:",
        "back": "3 h. O dobro de máquinas reduz tempo pela metade sob condições iguais."
      },
      {
        "front": "Se velocidade aumenta e distância é fixa, tempo de trajeto é geralmente:",
        "back": "Inversamente proporcional à velocidade. Tempo=distância/velocidade."
      },
      {
        "front": "Qual armadilha evitar em Regra de três e taxas?",
        "back": "Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 112,
    "code": "LOG",
    "title": "Proposições, implicação e equivalências",
    "objective": "Resolver tabelas-verdade e distinguir contrapositiva, recíproca e negação.",
    "theory": "## Aula detalhada — entenda o mecanismo\nUma **proposição** é enunciado declarativo ao qual se atribui verdadeiro ou falso sob interpretação definida; perguntas e ordens não são proposições simples. Operadores: conjunção `P ∧ Q` só é verdadeira se ambos verdadeiros; disjunção inclusiva `P ∨ Q` só é falsa se ambos falsos; implicação material `P → Q` só é falsa quando P verdadeira e Q falsa; bicondicional `P ↔ Q` é verdadeiro quando valores coincidem; negação inverte valor.\n\nA implicação `P → Q` é equivalente a `¬P ∨ Q` e à **contrapositiva** `¬Q → ¬P`. Já a recíproca `Q → P` não é equivalente em geral. Leis de De Morgan: `¬(P ∧ Q) ≡ ¬P ∨ ¬Q` e `¬(P ∨ Q) ≡ ¬P ∧ ¬Q`. Negar uma implicação produz `P ∧ ¬Q`, não uma nova implicação invertida.\n\nEm provas com linguagem natural, a palavra “se” introduz condição suficiente no sentido de `P → Q`; “somente se” costuma expressar necessidade: “P somente se Q” também se formaliza como `P → Q`. Cuidado com quantificadores implícitos e contexto para não aplicar uma fórmula a frase ambígua.\n\n## Exemplo resolvido passo a passo\nEnunciado: “Se o servidor está atualizado (P), então a correção está instalada (Q)”. Teste P=V e Q=F: a implicação é F. Para P=F e Q=F: a implicação material é V, mesmo que pareça contraintuitivo fora da lógica formal.\n\nContrapositiva: “Se a correção não está instalada (¬Q), então o servidor não está atualizado (¬P)”, com mesma tabela-verdade. Recíproca “Se a correção está instalada então o servidor está atualizado” não é dedução válida a partir da original. Negação da implicação: “Servidor atualizado E correção não instalada”, único cenário que falsifica a regra.\n\n## Erros clássicos nas bancas\n**Pegadinha:** implicação não significa causalidade. **Pegadinha:** “ou” em lógica proposicional normalmente é inclusivo salvo especificação. **Pegadinha:** contrária/inversa/recíproca não são automaticamente equivalentes. **Pegadinha:** a negação de “P e Q” troca o conectivo por “ou” e nega ambos.\n\n## Pratique sem consultar\nConstrua tabela-verdade de `(P → Q) ↔ (¬Q → ¬P)` para quatro combinações. Negue `P ∨ Q` usando De Morgan. Formalize e negue: “Se estudo, então passo na prova” sem confundir com a recíproca.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nOpenStax — Matemática: https://openstax.org/subjects/math\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Quando a implicação P→Q é falsa?",
        "back": "Apenas quando P é verdadeira e Q é falsa."
      },
      {
        "front": "Qual a contrapositiva de P→Q?",
        "back": "¬Q→¬P; é logicamente equivalente à proposição original."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 113,
    "code": "LOG",
    "title": "Conjuntos, probabilidade e combinatória",
    "objective": "Evitar dupla contagem e distinguir eventos independentes de excludentes.",
    "theory": "## Aula detalhada — entenda o mecanismo\nPara conjuntos finitos, **inclusão-exclusão** de dois conjuntos: `|A∪B|=|A|+|B|−|A∩B|`. A interseção reúne elementos comuns; união reúne elementos de pelo menos um. Se “nenhum dos dois” for pedido, subtraia a união do total do universo.\n\nEm experimento equiprovável, `P(A)=casos favoráveis/total de casos`. Complementar: `P(não A)=1−P(A)`. Eventos **independentes** satisfazem `P(A∩B)=P(A)P(B)`. Eventos **mutuamente exclusivos** não ocorrem juntos; se ambos têm probabilidade positiva, não são independentes. Probabilidade condicional `P(A|B)=P(A∩B)/P(B)` se P(B)>0.\n\nCombinatória: permutação de n distintos é `n!`. **Arranjo** considera ordem de escolha, `A(n,k)=n!/(n−k)!`; **combinação** ignora ordem, `C(n,k)=n!/(k!(n−k)!)`. Para grupos de pessoas sem cargos, combinação; para presidente e secretário com posições distintas, arranjo. Sempre defina primeiro se seleção permite repetição e se ordem importa.\n\n## Exemplo resolvido passo a passo\nEm 50 candidatos, 28 estudam Linux, 21 estudam redes e 9 estudam ambos. União = 28+21−9 = **40**; nenhum = 50−40 = **10**. Se você somar 28+21, contará os nove duas vezes.\n\nEscolher comissão de 3 entre 6 sem cargos: `C(6,3)=6!/(3!3!)=20`. Se quiser presidente e secretário entre 6 pessoas distintas, `6×5=30` arranjos.\n\nDois lançamentos independentes de moeda justa: `P(duas caras)=1/2×1/2=1/4`. Já “cara no mesmo lançamento” e “coroa no mesmo lançamento” são mutuamente exclusivos, mas não independentes.\n\n## Erros clássicos nas bancas\n**Pegadinha:** a expressão “ao menos um” frequentemente sugere complemento. **Pegadinha:** “ambos” é interseção, e não soma. **Pegadinha:** a fórmula da combinação pressupõe escolha sem repetição. **Pegadinha:** independência não é sinônimo de incompatibilidade.\n\n## Pratique sem consultar\nResolva: turma de 80 pessoas; 45 estudam redes, 35 segurança, 20 ambos. Quantos estudam pelo menos um? Quantos nenhum? Depois calcule número de comissões de dois entre sete pessoas, e número de pares com funções de líder e suplente.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nOpenStax — Matemática: https://openstax.org/subjects/math\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "O que diferencia eventos independentes de eventos mutuamente exclusivos?",
        "back": "Independentes não alteram probabilidades condicionais entre si; exclusivos não ocorrem juntos."
      },
      {
        "front": "Quando usar combinação em vez de arranjo?",
        "back": "Quando selecionar itens sem considerar a ordem e sem repetição, nas fórmulas usuais."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 114,
    "code": "LOG",
    "title": "Equações, progressões e análise de problemas",
    "objective": "Traduzir enunciados em expressões sem aplicar fórmulas fora de contexto.",
    "theory": "## Aula detalhada — entenda o mecanismo\n**Equação** é igualdade envolvendo incógnitas; a solução precisa satisfazer condições originais. Em equações de 1º grau, isole incógnita com operações equivalentes. Em 2º grau, `ax²+bx+c=0` com a≠0; discriminante `Δ=b²−4ac`, soluções reais quando Δ≥0. Não divida por expressão que pode ser zero sem analisar casos.\n\n**PA** tem diferença constante: `a_n=a_1+(n−1)r`; soma `S_n=n(a_1+a_n)/2`. **PG** tem razão constante `q` (quando definida): `a_n=a_1 q^(n−1)`; soma de PG finita com q≠1: `S_n=a_1(q^n−1)/(q−1)`. Bancas podem misturar crescimento linear e exponencial; identifique padrão pela diferença e razão entre termos.\n\n**Regra de três** exige proporcionalidade demonstrável. Mais técnicos nem sempre implicam tempo inversamente proporcional se há dependências, gargalos ou divisão não linear do trabalho. Em questão idealizada, supondo trabalho fixo e produtividade igual, pessoas × tempo pode ser constante. Leia hipóteses, unidades e arredondamentos antes do cálculo.\n\n## Exemplo resolvido passo a passo\nPA: um curso tem 5 questões no dia 1 e acrescenta 3 por dia. No 8º dia, `a_8 = 5 + 7×3 = 26`. Total nos oito dias: `S_8 = 8×(5+26)/2 = 124`.\n\nPG: número de backups processados dobra a cada etapa a partir de 2: 2,4,8,16... O 6º termo é `2×2^5 = 64`. Se a prova cobrar total até a 6ª etapa, soma = `2(2^6−1)=126`.\n\nEquação: orçamento de R$ 1.200 inclui 3 licenças iguais mais taxa de R$ 150. `3x+150=1200`; logo `x=350`. Verifique: 3×350+150=1.200. Traduzir o problema é tão importante quanto calcular.\n\n## Erros clássicos nas bancas\n**Pegadinha:** PA não se identifica apenas por termos crescentes; precisa diferença constante. **Pegadinha:** `n−1` no termo geral evita erro de uma posição. **Pegadinha:** taxa fixa em orçamento não deve ser multiplicada pela quantidade de itens. **Pegadinha:** não arredonde resultados intermediários sem justificativa.\n\n## Pratique sem consultar\nConstrua uma PA com primeiro termo 7 e razão 4; encontre 12º termo e soma de 12 termos. Construa uma PG com primeiro termo 3 e razão 2; calcule 5º termo. Escreva uma equação simples para “três parcelas iguais e uma taxa de R$ 20 somam R$ 170”.\n\n## Revisão e transferência\nFeche esta explicação. Tente responder à pergunta da seção anterior com suas próprias palavras, crie um exemplo diferente e só então passe às questões. Se errar, registre **a causa do erro**, não apenas a alternativa correta. Repita o conceito em outra sessão e confirme com questões inéditas.\n\n## Fonte de aprofundamento\nOpenStax — Matemática: https://openstax.org/subjects/math\nMaterial autoral de preparação; para legislação, confirme sempre a redação vigente e as exigências específicas do edital.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual é a fórmula do termo geral da PA?",
        "back": "a_n = a_1 + (n−1)r."
      },
      {
        "front": "Como distinguir crescimento típico de PA e PG?",
        "back": "PA tem diferença constante; PG tem razão constante entre termos consecutivos."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 144,
    "code": "LOG",
    "title": "Condicional, contrapartida e contrapositiva",
    "objective": "Compreender e aplicar condicional, contrapartida e contrapositiva em provas.",
    "theory": "A proposição P→Q é logicamente equivalente a ¬Q→¬P, sua contrapositiva. A recíproca Q→P não é equivalente em geral.\n\nUma condicional é falsa somente quando antecedente é verdadeiro e consequente falso. “Se há licença válida, o acesso é permitido” não afirma que todo acesso permitido requer licença válida. Em concursos, a troca entre condição necessária e suficiente costuma gerar alternativas incorretas.",
    "practical": "Se “Todo servidor do grupo A possui acesso B” e alguém não possui acesso B, pode-se concluir que não está no grupo A, respeitando a premissa.",
    "warning": "Não inferir P a partir de Q é evitar a falácia de afirmar o consequente.",
    "recall": [
      {
        "front": "Qual é o conceito central de Condicional, contrapartida e contrapositiva?",
        "back": "A proposição P→Q é logicamente equivalente a ¬Q→¬P, sua contrapositiva. A recíproca Q→P não é equivalente em geral."
      },
      {
        "front": "Qual erro de prova evitar em Condicional, contrapartida e contrapositiva?",
        "back": "Não inferir P a partir de Q é evitar a falácia de afirmar o consequente."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 145,
    "code": "LOG",
    "title": "Leis de De Morgan e negação",
    "objective": "Compreender e aplicar leis de de morgan e negação em provas.",
    "theory": "Negar uma conjunção produz disjunção das negações; negar uma disjunção produz conjunção das negações.\n\n¬(P∧Q) equivale a ¬P∨¬Q; ¬(P∨Q) equivale a ¬P∧¬Q. Em português, a negação de “João estuda redes e segurança” é “João não estuda redes ou não estuda segurança”, não necessariamente negar ambas.",
    "practical": "Negar “o sistema está atualizado ou está monitorado” exige afirmar simultaneamente que não está atualizado e que não está monitorado.",
    "warning": "A troca entre e/ou é indispensável ao negar expressões compostas.",
    "recall": [
      {
        "front": "Qual é o conceito central de Leis de De Morgan e negação?",
        "back": "Negar uma conjunção produz disjunção das negações; negar uma disjunção produz conjunção das negações."
      },
      {
        "front": "Qual erro de prova evitar em Leis de De Morgan e negação?",
        "back": "A troca entre e/ou é indispensável ao negar expressões compostas."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 146,
    "code": "LOG",
    "title": "Probabilidade condicional e independência",
    "objective": "Compreender e aplicar probabilidade condicional e independência em provas.",
    "theory": "P(A|B)=P(A∩B)/P(B) quando P(B)>0. Independência implica P(A∩B)=P(A)P(B), mas não vale em geral.\n\nSe 40% dos candidatos estudam redes, 20% estudam SQL e 10% estudam ambos, a probabilidade de estudar SQL dado que estuda redes é 0,10/0,40=25%. Em problemas com reposição, independência é mais plausível que em amostras sem reposição.",
    "practical": "Analise sempre o espaço amostral condicionado, pois o denominador muda.",
    "warning": "P(A|B) não é automaticamente igual a P(B|A).",
    "recall": [
      {
        "front": "Qual é o conceito central de Probabilidade condicional e independência?",
        "back": "P(A|B)=P(A∩B)/P(B) quando P(B)>0. Independência implica P(A∩B)=P(A)P(B), mas não vale em geral."
      },
      {
        "front": "Qual erro de prova evitar em Probabilidade condicional e independência?",
        "back": "P(A|B) não é automaticamente igual a P(B|A)."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 147,
    "code": "LOG",
    "title": "Análise combinatória: arranjos e combinações",
    "objective": "Compreender e aplicar análise combinatória: arranjos e combinações em provas.",
    "theory": "Quando a ordem importa, use contagens de arranjos/permutação; quando não importa, combinações.\n\nEscolher três pessoas entre dez para uma comissão sem cargos fornece C(10,3)=120. Se há três posições distintas, há 10×9×8=720 maneiras de preenchê-las sem repetição. Distinguir reposição e ordem é etapa mais importante que decorar fórmulas.",
    "practical": "Uma senha de três caracteres escolhidos entre dez símbolos com repetição permitida tem 10³ combinações ordenadas possíveis.",
    "warning": "Comissão sem cargo e sequência de cargos não são o mesmo problema.",
    "recall": [
      {
        "front": "Qual é o conceito central de Análise combinatória: arranjos e combinações?",
        "back": "Quando a ordem importa, use contagens de arranjos/permutação; quando não importa, combinações."
      },
      {
        "front": "Qual erro de prova evitar em Análise combinatória: arranjos e combinações?",
        "back": "Comissão sem cargo e sequência de cargos não são o mesmo problema."
      }
    ],
    "source_kind": "brief",
    "ready": true
  },
  {
    "id": 166,
    "code": "LOG",
    "title": "Condicionais, conjuntos e seleção de candidatos",
    "objective": "Resolver problemas de lógica com implicação e interseção sem pressupor recíproca de condições.",
    "theory": "# Caso de prova — requisitos de um concurso\nUm edital hipotético afirma: “Se o candidato é nomeado, então apresentou o diploma exigido”. Representando nomeação por N e diploma por D, temos `N → D`. A frase **não autoriza** concluir `D → N`: possuir diploma é condição necessária nesse enunciado, mas não suficiente para nomeação, que depende de aprovação, classificação e outras exigências. A contrapositiva `¬D → ¬N` é logicamente equivalente à implicação original.\n\n## Tabela de verdade em palavras\n`P → Q` só é falsa quando P é verdadeira e Q é falsa. Nos outros três casos, é verdadeira na lógica proposicional clássica. Isso não significa que um antecedente falso prova qualquer fenômeno na realidade: a tabela define a semântica do conectivo. Para negar `P → Q`, escreva `P ∧ ¬Q`. A recíproca `Q → P` e a inversa `¬P → ¬Q` não são equivalências gerais da original.\n\n## Problema de conjuntos resolvido\nEm 100 estudantes, 60 estudam Redes, 45 estudam Português e 20 estudam ambas. Pela inclusão-exclusão, `|R ∪ P| = 60 + 45 − 20 = 85`. Portanto, 15 não estudam nenhuma das duas. Somente Redes = 40; somente Português = 25; ambas = 20. Soma das quatro regiões: `40 + 25 + 20 + 15 = 100`. Esse balanço evita erro comum de somar diretamente 60+45 e concluir que 105 estudantes são pessoas diferentes.\n\n## Um quadro para responder à banca\nAo encontrar “todos”, “algum”, “nenhum”, converta para quantificadores. Negação de “todos estão aprovados” é “existe ao menos um que não está aprovado”. Negação de “existe aluno que conhece Linux” é “nenhum aluno conhece Linux”. Lembre que “alguns” não significa necessariamente “a maioria”.\n\n## Treino sem consulta\nTroque R e P por “aprovados em Redes” e “aprovados em Segurança”. Defina um conjunto com 120 pessoas, 70 em R, 50 em S e 30 em ambos. Calcule somente R, somente S, nenhum e a união. Em seguida, encontre a negação de “Se passei em Redes, passei em Segurança”.\n\n## Pegadinhas\n- “Se A então B” não permite concluir “se B então A”.\n- Negação de todos não é necessariamente nenhum.\n- Interseção somada duas vezes deve ser subtraída na união.\n- Condição necessária não é condição suficiente.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual a negação de P implica Q?",
        "back": "P e não Q (P ∧ ¬Q)."
      },
      {
        "front": "Como calcular união de dois conjuntos A e B?",
        "back": "|A∪B| = |A|+|B|−|A∩B|, evitando dupla contagem da interseção."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  },
  {
    "id": 167,
    "code": "LOG",
    "title": "Probabilidade, contagem e interpretação de risco",
    "objective": "Aplicar contagem e probabilidade condicional com denominadores corretos em questões de seleção.",
    "theory": "# Caso de prova — tirar conclusões a partir de uma amostra\nUma prova apresenta um grupo de 40 candidatos, dos quais 24 estudam Linux e 16 não estudam. Entre os 24 que estudam Linux, 18 acertaram uma questão de redes; entre os 16 restantes, 8 acertaram. Se escolhermos aleatoriamente **um candidato do grupo**, a chance de ele ter acertado é `(18+8)/40 = 26/40 = 65%`. Se escolhermos aleatoriamente **um candidato que estuda Linux**, a chance condicional de acerto é `18/24 = 75%`. Os denominadores diferem porque a população de referência mudou.\n\n## Probabilidade condicional sem mistério\nA fórmula é `P(A|B) = P(A ∩ B) / P(B)` para `P(B)>0`. É preciso definir A (acertar) e B (estudar Linux) antes de substituir números. Inverter o condicionamento, usando `P(B|A)`, responde outra pergunta; nesse caso seria `18/26`, não `18/24`. Este é um dos erros mais frequentes em questões que parecem simples.\n\n## Contagem: ordem importa?\nUm sistema cria senhas de três caracteres distintos usando as cinco letras A, B, C, D, E. Como a ordem importa, são `5 × 4 × 3 = 60` possibilidades. Se a pergunta fosse apenas escolher três letras para formar um grupo sem ordem, o total seria `C(5,3) = 5!/(3!2!) = 10`. Compare os verbos “escolher”, “ordenar”, “distribuir” e “formar sequência”, mas confira as condições de repetição.\n\n## Eventos independentes\nSe cada tentativa é independente e a chance de acerto é 1/4, a probabilidade de acertar duas tentativas consecutivas é `(1/4) × (1/4) = 1/16`. Mas, em sorteio sem reposição, as probabilidades mudam entre etapas: não multiplique como se fossem independentes sem verificar reposição.\n\n## Interpretação correta de resultados\nUma diferença de acertos entre grupos numa amostra não prova que estudar Linux causou o desempenho. Podem existir variáveis de confusão, seleção e tamanho amostral. Concursos de lógica avaliam cálculo sob premissas dadas; conclusões causais exigem fundamentos adicionais.\n\n## Exercício sem consulta\nEm 60 candidatos, 30 estudam Redes. Destes, 21 acertaram. Entre os 30 que não estudam Redes, 12 acertaram. Calcule P(acertar), P(acertar|estuda Redes) e P(estuda Redes|acertar). Escreva os três denominadores antes dos numeradores.",
    "practical": "",
    "warning": "",
    "recall": [
      {
        "front": "Qual denominador usar em P(A|B)?",
        "back": "A quantidade ou probabilidade do universo B, desde que P(B)>0."
      },
      {
        "front": "Quando o arranjo de 3 letras entre 5 dá 60?",
        "back": "Quando há ordem e não há repetição: 5×4×3."
      }
    ],
    "source_kind": "detailed",
    "ready": true
  }
];
