import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullLOG=buildChapters([
  {
    "id": 75,
    "title": "Tabelas-verdade: por que cada conectivo produz um resultado diferente",
    "goal": "Construir linhas de verdadeiro/falso para não, e, ou, se... então e se e somente se.",
    "context": "Imagine duas afirmações: `P` = 'A rede funciona' e `Q` = 'O sistema responde'. Uma **proposição** é frase declarativa que pode ser verdadeira ou falsa. A lógica estuda como combinar proposições e determinar o valor resultante. **Conectivo lógico** é operador que forma nova proposição a partir de outras: `¬` significa não; `∧`, e; `∨`, ou; `→`, se... então; `↔`, se e somente se. A **tabela-verdade** enumera todas as combinações possíveis dos valores das proposições simples.",
    "explanation": "Com P e Q existem quatro combinações: VV, VF, FV e FF. `P∧Q` só é verdadeiro em VV; `P∨Q` inclusivo é verdadeiro quando pelo menos um deles é verdadeiro e só é falso em FF. `¬P` inverte o valor de P. A condicional `P→Q` é **falsa somente em VF**, quando a condição prometida ocorreu mas a consequência não. A bicondicional `P↔Q` é verdadeira quando P e Q possuem mesmo valor, nos casos VV e FF. Escreva linha por linha antes de tentar decorar uma coluna inteira.",
    "connection": "Uma tabela de três proposições exige `2³ = 8` combinações, porque cada proposição pode assumir dois valores. Isso prepara o estudo de **equivalência lógica**, quando duas fórmulas apresentam as mesmas saídas em todas as linhas. A noção de 'ou' em lógica proposicional é geralmente **inclusiva**, podendo aceitar P e Q simultaneamente, ao contrário de algumas escolhas coloquiais. A tabela representa valores lógicos formais, não a probabilidade de um evento acontecer.",
    "exam": "A banca pode pedir quantidade de linhas: para n proposições independentes, `2^n`. Se pergunta quando P→Q é falsa, procure P verdadeira, Q falsa; não se deixe levar por 'se' da conversa cotidiana. Em um item que diz 'P ou Q, mas não ambos', há condição de exclusividade adicional, que não é o `∨` inclusivo simples.",
    "caseTitle": "Monte o valor de (P∧Q)→P",
    "caseSteps": [
      "Liste VV, VF, FV, FF para P e Q; calcule P∧Q, que só é verdadeiro na primeira linha.",
      "Em VV, antecedente P∧Q é verdadeiro e P também, então a condicional é verdadeira.",
      "Nas demais linhas, P∧Q é falso; a condicional material fica verdadeira pela regra.",
      "A fórmula é tautologia porque resulta verdadeira em todas as quatro combinações."
    ],
    "pitfalls": [
      "Ou inclusivo permite P e Q verdadeiros juntos.",
      "Condicional só é falsa quando antecedente verdadeiro e consequente falso.",
      "Tabela de n proposições possui 2^n linhas.",
      "Tabela-verdade não informa chance estatística de os fatos ocorrerem."
    ],
    "cards": [
      [
        "Quando P e Q é verdadeira?",
        "Somente quando ambas as proposições P e Q são verdadeiras."
      ],
      [
        "Quando P ou Q inclusivo é falso?",
        "Quando P e Q são ambas falsas; em todas as outras combinações é verdadeiro."
      ],
      [
        "Quando P implica Q é falso?",
        "Quando P é verdadeiro e Q é falso, violando a condição estabelecida."
      ],
      [
        "Quantas linhas há para três proposições?",
        "Oito linhas, pois cada proposição tem dois valores e 2³=8 combinações."
      ]
    ]
  },
  {
    "id": 76,
    "title": "Implicação e contrapositiva: qual frase diz a mesma coisa?",
    "goal": "Entender condicional, inversa, recíproca e contrapositiva sem decorar troca de letras sem sentido.",
    "context": "A regra diz: '**Se** o cadastro está aprovado, **então** ele pode ser emitido'. A frase é uma **condicional**, que relaciona antecedente P e consequente Q. Ela promete que, sempre que P ocorrer, Q também ocorrerá. Não afirma que P é a única maneira de Q ocorrer. A **recíproca** troca a ordem: Q→P; a **inversa** nega ambos: ¬P→¬Q; a **contrapositiva** inverte e nega: ¬Q→¬P. As quatro expressões parecem semelhantes, mas não possuem necessariamente o mesmo valor lógico.",
    "explanation": "P→Q é falsa somente se P é verdadeiro e Q falso. A contrapositiva ¬Q→¬P fica falsa exatamente na mesma situação: ¬Q verdadeiro quando Q falso e ¬P falso quando P verdadeiro. Por isso **P→Q e ¬Q→¬P são equivalentes**. A recíproca Q→P pode ser falsa num caso em que Q é verdadeiro e P falso, sem contradizer a original. Exemplo: 'Se é quadrado, então é retângulo'; não podemos inverter para 'Se é retângulo, então é quadrado'. A contrapositiva correta: 'Se não é retângulo, então não é quadrado'.",
    "connection": "Essa equivalência é útil em **provas argumentativas** e questões de negação. Negar P→Q significa afirmar o caso que a tornaria falsa: `P∧¬Q`. Por exemplo, negar 'Se pagou, recebeu comprovante' significa 'Pagou e não recebeu comprovante'. Não significa 'Se não pagou, então não recebeu'. A regra vale para o conectivo formal; em linguagem natural, contexto e sentido de 'se' precisam ser interpretados cuidadosamente.",
    "exam": "A banca costuma oferecer quatro versões da mesma frase. Procure a contrapositiva negando e invertendo, não apenas invertendo. Se pede **negação** da condicional, responda antecedente verdadeiro e consequente falso, ou seja, P e não Q. Atenção: recíproca e inversa são equivalentes entre si, mas não necessariamente à original. Faça tabela de quatro linhas se houver dúvida.",
    "caseTitle": "Negue e faça a contrapositiva de uma regra de acesso",
    "caseSteps": [
      "Original: 'Se o usuário é administrador (P), então possui permissão de alteração (Q)'.",
      "Contrapositiva: 'Se não possui permissão de alteração (¬Q), então não é administrador (¬P)'.",
      "Negação: 'O usuário é administrador (P) e não possui permissão de alteração (¬Q)'.",
      "Não troque por 'Se possui permissão, é administrador': isso é recíproca e pode ser falso."
    ],
    "pitfalls": [
      "Recíproca Q→P não equivale geralmente à original P→Q.",
      "Contrapositiva ¬Q→¬P é equivalente a P→Q.",
      "Negação de P→Q é P∧¬Q, não ¬P→¬Q.",
      "A condicional formal não afirma que P é o único motivo possível de Q."
    ],
    "cards": [
      [
        "Qual é contrapositiva de P→Q?",
        "¬Q→¬P, que possui os mesmos valores lógicos da condicional original."
      ],
      [
        "Qual é a recíproca de P→Q?",
        "Q→P, que não é necessariamente equivalente à condicional original."
      ],
      [
        "Qual a negação de P→Q?",
        "P∧¬Q, isto é, antecedente ocorre e consequente não ocorre."
      ],
      [
        "Por que 'todo quadrado é retângulo' não implica 'todo retângulo é quadrado'?",
        "Porque a propriedade de pertencer ao conjunto maior não garante pertencer ao subconjunto de quadrados."
      ]
    ]
  },
  {
    "id": 79,
    "title": "Combinação e permutação: a ordem altera a escolha?",
    "goal": "Distinguir ordem, repetição, fatorial e casos de arranjo, permutação e combinação com situações concretas.",
    "context": "Uma comissão vai escolher três integrantes dentre cinco candidatos. É diferente de escolher presidente, secretário e tesoureiro entre os mesmos cinco. Na primeira situação, **quem foi escolhido** importa; a ordem não altera a equipe. Na segunda, **quem ocupa cada cargo** importa; trocar duas pessoas de função produz resultado diferente. Essa é a decisão principal em **análise combinatória**, estudo de contagem de possibilidades: identificar se ordem altera resultado antes de escolher fórmula.",
    "explanation": "O **fatorial** de n, escrito n!, é produto de n até 1; `5! = 5×4×3×2×1 = 120`. Uma **permutação simples** de n objetos distintos ordena todos: `P(n)=n!`. Uma **combinação simples** de n objetos tomados p a p escolhe subconjunto sem ordem: `C(n,p)=n!/[p!(n−p)!]`. Um **arranjo simples** considera selecionar p objetos e atribuir posições distintas: `A(n,p)=n!/(n−p)!`. Para cinco candidatos e três cargos, arranjo `5×4×3=60`; para apenas escolher três, combinação `60/3! = 10`.",
    "connection": "Por que dividir por 3! na combinação? Cada grupo de três pessoas poderia aparecer em **seis ordens** numa contagem de arranjo, embora represente a mesma comissão. Dividir remove as repetições de ordem. Se a questão permite **repetição** de elementos, fórmulas mudam; por exemplo, senha de quatro dígitos de 0 a 9, com repetição, possui `10⁴` sequências, se zeros iniciais forem permitidos. Sempre identifique restrições do enunciado.",
    "exam": "Bancas oferecem combinação quando há cargos distintos para testar se o aluno notou que a ordem importa. Também podem usar 'duas equipes' sem identificar pessoas distinguíveis; cuidado com contagem duplicada se grupos não têm nomes. Antes de substituir números na fórmula, diga em voz alta: **trocar a ordem muda o resultado? Pode repetir? Quantos escolho?**",
    "caseTitle": "Cinco pessoas para três cargos ou três vagas iguais",
    "caseSteps": [
      "Cargos distintos: primeiro cargo tem cinco opções, segundo quatro, terceiro três, total 5×4×3=60.",
      "Três vagas equivalentes: cada grupo foi contado 3! = 6 vezes na conta de cargos.",
      "Divida 60/6=10 equipes diferentes de três pessoas.",
      "Conclusão: a presença ou ausência de cargos nomeados determina arranjo ou combinação."
    ],
    "pitfalls": [
      "Combinação simples ignora ordem; arranjo e permutação consideram ordem.",
      "Fatorial não é número de escolhas universal: depende da estrutura do problema.",
      "Repetição permitida muda contagem.",
      "Cargos distintos e vagas equivalentes não são a mesma situação."
    ],
    "cards": [
      [
        "Quando usar combinação simples?",
        "Quando escolhemos subconjunto sem importar a ordem e sem repetição, conforme enunciado."
      ],
      [
        "Quando usar arranjo simples?",
        "Quando selecionamos p entre n objetos distintos e a ordem/posição importa."
      ],
      [
        "Quanto vale 5!?",
        "120, pois o fatorial de cinco multiplica as cinco possibilidades decrescentes: 5×4×3×2×1."
      ],
      [
        "Quantas combinações de 5 pessoas tomadas 3 a 3?",
        "10 grupos possíveis, pois 5×4×3=60 escolhas ordenadas e cada grupo aparece em 3!=6 ordens; 60/6=10."
      ]
    ]
  },
  {
    "id": 81,
    "title": "Progressões: encontre a regra antes de usar fórmula",
    "goal": "Diferenciar progressão aritmética, geométrica e sequência sem padrão obrigatório.",
    "context": "Você observa números de chamados fechados por semana: 5, 8, 11, 14. O aumento é sempre de 3. Uma **sequência** é lista ordenada de termos; uma **progressão aritmética (PA)** é sequência na qual a diferença entre termos consecutivos é constante, chamada **razão r**. Em 5,8,11,14, `r=3`. A **progressão geométrica (PG)** mantém quociente constante entre termos consecutivos quando bem definido; por exemplo 2,6,18,54 tem razão 3. Não basta reconhecer números crescendo: é preciso verificar qual regra funciona.",
    "explanation": "Na PA, o termo na posição n é `a_n = a_1 + (n−1)r`. Se a1=5 e r=3, o quinto termo é `5 + 4×3=17`. Na PG, `a_n = a_1×q^(n−1)`; se a1=2, q=3, o quarto termo é 2×27=54. A soma da PA pode ser calculada por `S_n = n(a_1+a_n)/2` quando aplicável. A soma finita da PG para q diferente de 1 pode usar `S_n = a_1(q^n−1)/(q−1)`. Essas fórmulas representam acumulação de diferenças ou multiplicações sucessivas, não símbolos arbitrários.",
    "connection": "Uma sequência pode não ser PA nem PG, como 1,2,4,7,11, cujas diferenças são 1,2,3,4. A banca pode pedir o próximo termo por padrão específico, mas é necessário considerar regra informada ou a mais plausível no contexto; poucas observações não definem de modo único toda sequência matemática. No estudo de algoritmos, progressões ajudam calcular quantas etapas de um processo linear ou multiplicativo ocorrem.",
    "exam": "Quando a questão diz aumento de 20% a cada mês, isso sugere multiplicar por 1,2 e formar PG, não somar 20 pontos fixos como PA. Quando diz acréscimo de 20 unidades a cada mês, sugere PA. Para o termo 10 de PA, cuidado: são **n−1=9 intervalos** desde o primeiro termo. Se usa q=1 em PG, trate fórmula da soma de maneira adequada; não divida por zero.",
    "caseTitle": "Qual é o sexto termo de 5,8,11,...?",
    "caseSteps": [
      "Diferenças 8−5=3 e 11−8=3 indicam PA de razão 3.",
      "Use a1=5 e n=6, portanto existem cinco passos de +3 até o sexto termo.",
      "Calcule o sexto termo: a₆ = 5 + (6−1)×3 = 20; note que há cinco intervalos após o primeiro termo.",
      "Verifique sequência: 5,8,11,14,17,20; não use n×3, que acrescentaria passo extra."
    ],
    "pitfalls": [
      "PA soma razão fixa; PG multiplica por razão fixa.",
      "O termo n está a n−1 passos do primeiro.",
      "Aumento de porcentagem constante produz fator multiplicativo, não soma de pontos fixa.",
      "Uma lista de números não precisa ser PA nem PG sem regra consistente."
    ],
    "cards": [
      [
        "O que caracteriza uma PA?",
        "Diferença constante entre termos consecutivos."
      ],
      [
        "O que caracteriza uma PG?",
        "Razão multiplicativa constante entre termos consecutivos, quando o quociente é definido."
      ],
      [
        "Qual é a fórmula do termo n da PA?",
        "a_n = a_1 + (n−1)r, com n−1 intervalos desde o primeiro."
      ],
      [
        "Qual é o sexto termo de 5,8,11,...?",
        "20, pois é PA com a1=5 e razão 3, aplicando cinco incrementos."
      ]
    ]
  },
  {
    "id": 82,
    "title": "Regra de três: explique as grandezas antes de multiplicar cruzado",
    "goal": "Diferenciar proporcionalidade direta, inversa e taxas a partir das relações entre quantidades.",
    "context": "Uma máquina imprime 120 etiquetas em 3 minutos. Quantas em 5 minutos, mantendo a mesma velocidade? O problema não começa com multiplicação cruzada: começa com a pergunta **o que permanece constante?** Se a taxa é estável, mais tempo significa mais etiquetas — são grandezas **diretamente proporcionais**. Se um número maior de máquinas idênticas divide a mesma tarefa, mais máquinas podem significar menos tempo — grandezas **inversamente proporcionais** sob condições adequadas.",
    "explanation": "Na impressão, a taxa é `120/3 = 40 etiquetas por minuto`. Em 5 minutos teremos `40×5 = 200`. A **regra de três** organiza essa proporcionalidade quando existe fator comum. Para inversa, se quatro pessoas concluem uma tarefa em seis horas e oito pessoas igualmente produtivas trabalham na mesma tarefa, o tempo ideal seria três horas; o produto `pessoas×tempo` permanece constante. Isso exige hipótese de produtividade idêntica e tarefa divisível, e não vale automaticamente em qualquer atividade humana.",
    "connection": "**Taxa** relaciona duas unidades, como km/h ou questões/minuto; compare unidades antes de calcular. Se temos velocidade 60 km/h por 2 horas, distância 120 km, assumindo velocidade constante. Aumentos percentuais também precisam identificar base: 20% de 200 é 40, enquanto aumentar 200 em 20% resulta 240. Em questões de finanças, dois aumentos sucessivos não equivalem a somar porcentagens sem analisar bases.",
    "exam": "A banca pode oferecer regra de três inversa quando as grandezas são diretas. Faça sempre teste mental: se aumenta o tempo de impressão, mantendo taxa, o resultado deve aumentar; qualquer alternativa menor que 120 no caso de 5 minutos está incoerente. Se há custos fixos e variáveis ou produtividade diferente, a proporcionalidade simples pode não existir.",
    "caseTitle": "Quanto tempo 8 pessoas levam numa tarefa de 4 pessoas por 6 horas?",
    "caseSteps": [
      "Fixe a quantidade de trabalho e assuma pessoas igualmente produtivas, sem interferência.",
      "Com 4 pessoas × 6 horas, esforço total ideal é 24 pessoa-horas.",
      "Com 8 pessoas, tempo =24/8=3 horas.",
      "Confirme: dobrar a equipe, nas hipóteses, reduz tempo pela metade; relação inversa."
    ],
    "pitfalls": [
      "Não aplique regra de três sem verificar proporcionalidade.",
      "Direta: grandezas variam no mesmo fator; inversa: uma sobe e outra desce no fator correspondente.",
      "Taxas precisam de unidades coerentes.",
      "Produtividade não é sempre constante na vida real; hipóteses importam."
    ],
    "cards": [
      [
        "Como reconhecer proporcionalidade direta?",
        "Aumentar uma grandeza pelo fator k aumenta a outra pelo mesmo fator, nas condições definidas."
      ],
      [
        "Como reconhecer proporcionalidade inversa?",
        "Aumentar uma pelo fator k reduz a outra pelo fator k, mantendo produto constante."
      ],
      [
        "Qual é a taxa de 120 etiquetas em 3 minutos?",
        "40 etiquetas por minuto, dividindo produção pelo tempo."
      ],
      [
        "Por que checar unidades antes de calcular?",
        "Porque misturar horas e minutos, quilômetros e metros, produz resultados incoerentes."
      ]
    ]
  },
  {
    "id": 112,
    "title": "Equivalências lógicas: transforme sem mudar valor de verdade",
    "goal": "Aplicar contrapositiva, De Morgan e tabelas para reconhecer fórmulas equivalentes.",
    "context": "Duas frases podem usar palavras diferentes e ser verdadeiras exatamente nas mesmas situações. Chamamos isso de **equivalência lógica**: duas fórmulas têm o mesmo valor para toda atribuição de verdadeiro/falso. Exemplo: 'Se tem autorização, então acessa' e 'Se não acessa, então não tem autorização' representam P→Q e ¬Q→¬P, a **contrapositiva**. Elas têm os mesmos valores numa tabela, mas a **recíproca** Q→P não possui essa garantia.",
    "explanation": "A negação de conjunção segue **lei de De Morgan**: `¬(P∧Q) ≡ ¬P∨¬Q`. A negação de disjunção é `¬(P∨Q) ≡ ¬P∧¬Q`. Por exemplo, negar 'O usuário tem senha válida e MFA' significa 'Não tem senha válida ou não tem MFA', considerando o ou inclusivo. Para a condicional, `P→Q ≡ ¬P∨Q`; isso explica por que só é falsa quando P é verdadeira e Q falsa. Substituir por equivalências ajuda simplificar expressões sem alterar tabela.",
    "connection": "Uma **tautologia** é fórmula verdadeira em todas as linhas; uma **contradição** é falsa em todas; uma **contingência** tem verdade em algumas linhas e falsidade em outras. Tabela-verdade é método universal para verificar equivalência de proposições simples quando o número de variáveis é administrável. Não confunda equivalência lógica com 'frases parecidas' em português, pois conectivos e quantificadores podem mudar alcance.",
    "exam": "Se a banca oferece ¬P→¬Q como equivalência a P→Q, isso é **inversa**, não contrapositiva. Se pede negar P∧Q, não negue só um termo fixo: o resultado é ¬P∨¬Q. Uma alternativa 'P ou Q' sem informação de exclusividade inclui caso em que ambas são verdadeiras. Faça tabela se a transformação parecer suspeita.",
    "caseTitle": "Negue 'O sistema está ligado e a rede funciona'",
    "caseSteps": [
      "Defina P='sistema ligado' e Q='rede funciona'. A frase original é P∧Q.",
      "Para negar conjunção, aplique De Morgan: ¬(P∧Q)=¬P∨¬Q.",
      "Leia: 'O sistema não está ligado ou a rede não funciona'. Basta uma falha para negar a conjunção.",
      "Não escreva 'o sistema não está ligado e a rede não funciona', pois isso exige duas falhas, condição mais forte."
    ],
    "pitfalls": [
      "Inversa de condicional não é equivalente à original em geral.",
      "Negar conjunção produz disjunção de negações.",
      "Negar disjunção produz conjunção de negações.",
      "Equivalência deve valer para todas as combinações, não apenas exemplo isolado."
    ],
    "cards": [
      [
        "Qual a contrapositiva de P→Q?",
        "¬Q→¬P, equivalente à original para todas as atribuições de verdade."
      ],
      [
        "Qual a negação de P∧Q?",
        "¬P∨¬Q: pelo menos uma das duas proposições não ocorre."
      ],
      [
        "Qual a negação de P∨Q?",
        "¬P∧¬Q: nenhuma das duas proposições ocorre."
      ],
      [
        "O que é tautologia?",
        "Fórmula verdadeira em todas as linhas de sua tabela-verdade."
      ]
    ]
  },
  {
    "id": 113,
    "title": "Conjuntos, contagem e probabilidade: por que subtrair a interseção",
    "goal": "Usar inclusão-exclusão e eventos de probabilidade sem contar o mesmo elemento duas vezes.",
    "context": "Uma turma tem 30 pessoas: 18 estudam Redes, 15 estudam Segurança, 8 estudam ambas. Quantas estudam pelo menos uma? Se somarmos 18+15, as oito pessoas que estudam ambas serão contadas duas vezes. Um **conjunto** é coleção de elementos; a **união A∪B** reúne quem está em A ou B; a **interseção A∩B** contém quem está em ambos. **Inclusão-exclusão** é a ideia de corrigir a dupla contagem.",
    "explanation": "A fórmula `|A∪B|=|A|+|B|−|A∩B|` deriva dessa correção. No exemplo, `18+15−8=25` pessoas estudam ao menos uma das matérias; cinco não estudam nenhuma, se total é 30. Isso se conecta à probabilidade: escolhendo aluno uniformemente, `P(A∪B)=25/30`. Para eventos não necessariamente disjuntos, `P(A∪B)=P(A)+P(B)−P(A∩B)`. Não some probabilidades diretamente se eventos podem ocorrer juntos.",
    "connection": "A **probabilidade condicional** `P(A|B)` mede chance de A quando sabemos que B ocorreu, usando `P(A∩B)/P(B)` quando P(B)>0. Na turma, entre os 15 de Segurança, oito também estudam Redes, então `P(Redes|Segurança)=8/15`. Isso não é igual à proporção de Redes na turma inteira, 18/30. A mudança de universo observado é ponto central de muitos erros de prova.",
    "exam": "Quando enunciado diz 'ou' de conjuntos, observe que normalmente inclui interseção; 'exatamente um' exige excluir quem participa de ambos. Se pede alunos que estudam nenhuma matéria, subtraia a união do total. Não confunda `P(A∩B)` com produto de probabilidades sem independência declarada.",
    "caseTitle": "Calcule quem estuda Redes ou Segurança",
    "caseSteps": [
      "A=18 alunos de Redes, B=15 de Segurança e interseção=8; total da turma 30.",
      "União=18+15−8=25, corrigindo contagem duplicada da interseção.",
      "Quem não estuda nenhuma das duas=30−25=5.",
      "Ao escolher aluno ao acaso, P(pelo menos uma)=25/30=5/6."
    ],
    "pitfalls": [
      "Somar tamanhos de conjuntos sobrepostos conta interseção duas vezes.",
      "Ou inclusivo corresponde à união, incluindo quem está nos dois.",
      "Probabilidade condicional muda o universo para a condição.",
      "Multiplicar probabilidades sem independência pode ser incorreto."
    ],
    "cards": [
      [
        "Qual a fórmula da união de dois conjuntos?",
        "|A∪B|=|A|+|B|−|A∩B|, para corrigir dupla contagem."
      ],
      [
        "Por que subtrair interseção?",
        "Porque elementos em ambos os conjuntos aparecem duas vezes na soma isolada."
      ],
      [
        "Como achar quem não pertence a nenhum?",
        "Subtraia tamanho da união do total do universo considerado."
      ],
      [
        "O que representa P(A|B)?",
        "Chance de A no conjunto de resultados em que B ocorreu."
      ]
    ]
  },
  {
    "id": 114,
    "title": "Problemas com equações: traduza a frase antes de manipular símbolos",
    "goal": "Montar equações do 1º grau, sistemas e progressões a partir de quantidades definidas.",
    "context": "Um enunciado diz 'O dobro de um número, somado a cinco, vale 29'. Muitas pessoas tentam adivinhar o número. Uma **equação** representa igualdade entre expressões envolvendo quantidade desconhecida, chamada **incógnita**. Se x é o número procurado, 'dobro' significa 2x, 'somado a cinco' produz `2x+5` e 'vale 29' significa igualdade: `2x+5=29`. Traduzir cada trecho evita manipular fórmulas sem saber o que representam.",
    "explanation": "Para resolver, mantenha igualdade aplicando operações equivalentes dos dois lados: subtraia 5 → `2x=24`; divida ambos por 2 → `x=12`. Verifique substituindo: `2×12+5=29`. Para dois valores desconhecidos, pode ser necessário um **sistema de equações**, como `x+y=10` e `x−y=2`. Somando as duas, `2x=12`, então x=6 e y=4. A verificação é importante porque erros algébricos podem gerar resultados absurdos.",
    "connection": "Percentuais também podem virar equação: 'desconto de 20% sobre preço P produz 80' significa `0,8P=80`, logo P=100. Em **PA** e **PG**, use fórmulas somente depois de determinar se há soma constante ou multiplicação constante. Um cálculo pode estar algebricamente correto e semanticamente errado se a variável representar algo diferente do que o problema pediu.",
    "exam": "A banca pode inverter 'dobro de x mais cinco' e 'dobro de (x+5)'; são `2x+5` e `2(x+5)`, resultados diferentes. Marque parênteses conforme a linguagem. Sempre confirme unidades e se a resposta satisfaz o enunciado. Em problemas de idade e quantidade de pessoas, respostas negativas podem indicar montagem errada ou necessidade de restrição.",
    "caseTitle": "Encontre dois números cuja soma é 10 e diferença é 2",
    "caseSteps": [
      "Defina x maior número e y menor. Escreva x+y=10 e x−y=2.",
      "Some as equações: 2x=12, portanto x=6.",
      "Substitua em x+y=10: y=4.",
      "Cheque: 6+4=10 e 6−4=2, atendendo as duas condições."
    ],
    "pitfalls": [
      "Dobro de x mais 5 difere de dobro de (x+5).",
      "Operação nos dois lados preserva igualdade; não 'passa para o outro lado' sem justificar sinal.",
      "Verificar resultado no enunciado identifica erro de montagem.",
      "Uma variável precisa representar grandeza definida e com unidade coerente."
    ],
    "cards": [
      [
        "Como traduzir 'dobro de x somado a cinco'?",
        "2x+5, se o cinco está fora da multiplicação indicada pela frase."
      ],
      [
        "Como resolver 2x+5=29?",
        "Subtraia 5 de ambos lados, obtendo 2x=24; divida por 2: x=12."
      ],
      [
        "Por que conferir a solução?",
        "Para verificar que atende a igualdade original e faz sentido no problema descrito."
      ],
      [
        "Como resolver x+y=10, x−y=2?",
        "Somando as duas equações, y se elimina e resulta 2x=12; assim x=6 e, por substituição, y=4."
      ]
    ]
  },
  {
    "id": 144,
    "title": "Condicional, recíproca e contrapositiva sem inverter por impulso",
    "goal": "Analisar fórmulas condicionais e negar a condicional corretamente com valores lógicos.",
    "context": "Uma regra afirma: 'Se a senha é válida, então o acesso é concedido'. É tentador concluir 'Se o acesso foi concedido, a senha é válida', mas isso inverte a frase e pode ser falso quando há outras formas de acesso. Em lógica, `P→Q` é a **condicional**; `Q→P` é a **recíproca** e não é equivalente em geral. A **contrapositiva** `¬Q→¬P` é equivalente à original. Identificar essas formas impede responder questões apenas por semelhança verbal.",
    "explanation": "A tabela da condicional tem apenas um caso falso: P verdadeiro, Q falso. A contrapositiva fica falsa nesse mesmo caso, por isso preserva todos os valores. Uma forma equivalente é `¬P∨Q`. A **negação** da condicional expressa sua falha: `P∧¬Q`, isto é, a condição ocorreu e o resultado prometido não. Isso é diferente da **inversa** `¬P→¬Q`. Compare 'Se é quadrado, então é retângulo'; sua contrapositiva 'Se não é retângulo, então não é quadrado' é correta; a recíproca não.",
    "connection": "A lógica formal ajuda avaliar enunciados de concursos, mas linguagem natural pode ter pressupostos e informações extras. Em problemas puramente proposicionais, siga os valores de verdade; em texto interpretativo, veja contexto. A contrapositiva não é 'simplesmente negar toda a frase', e a negação não é outra condicional. Entender o único caso falso vale mais que decorar símbolos fora do cenário.",
    "exam": "Se a banca pede versão equivalente a P→Q, procure ¬Q→¬P, não Q→P nem ¬P→¬Q. Se pede negação, selecione P verdadeiro e Q falso. Se o item fala em 'se e somente se', a bicondicional contém duas direções e não equivale a condicional simples.",
    "caseTitle": "Qual frase nega 'Se há autorização, então acessa'?",
    "caseSteps": [
      "Defina P='há autorização' e Q='acessa'. A regra é P→Q.",
      "A situação que falsifica a regra é ter autorização e não acessar.",
      "Logo a negação é 'Há autorização e não há acesso', P∧¬Q.",
      "'Se acessa, há autorização' é recíproca e não representa negação da regra original."
    ],
    "pitfalls": [
      "Contrapositiva é equivalente; recíproca não necessariamente.",
      "Negação de condicional é conjunção P e não Q.",
      "Inversa não é a mesma coisa que contrapositiva.",
      "Se e somente se estabelece duas implicações, não uma."
    ],
    "cards": [
      [
        "Qual a contrapositiva de P→Q?",
        "¬Q→¬P, com tabela-verdade idêntica à original."
      ],
      [
        "Qual a negação de P→Q?",
        "P∧¬Q, correspondente ao único caso que torna a condicional falsa."
      ],
      [
        "O que é recíproca?",
        "Q→P, inversão dos termos da condicional, sem garantia geral de equivalência."
      ],
      [
        "O que significa P↔Q?",
        "Bicondicional: P e Q têm o mesmo valor lógico, representando condições nos dois sentidos."
      ]
    ]
  },
  {
    "id": 145,
    "title": "Leis de De Morgan: entenda a negação de condições combinadas",
    "goal": "Negar 'e', 'ou', quantificadores e condicionais sem trocar operadores de maneira arbitrária.",
    "context": "Uma política exige 'O funcionário possui senha **e** MFA'. Para negar a condição, basta que **uma das duas exigências falhe**. A negação não exige as duas falhas juntas. Chamamos **Leis de De Morgan** às equivalências `¬(P∧Q) ≡ ¬P∨¬Q` e `¬(P∨Q) ≡ ¬P∧¬Q`. O primeiro caso diz 'não são ambas verdadeiras'; o segundo, 'nenhuma das duas é verdadeira'. Elas são regras sobre valores de verdade, não apenas troca mecânica de palavras.",
    "explanation": "Se `P='tem senha'` e `Q='tem token'`, negar P e Q resulta em `¬P∨¬Q`: 'não tem senha ou não tem token'. Negar P ou Q resulta em `¬P∧¬Q`: 'não tem senha e não tem token'. Veja com P verdadeira e Q falsa: 'P e Q' é falso, sua negação é verdadeira; '¬P ou ¬Q' também é verdadeira porque ¬Q é verdadeiro. Para quantificadores: negar 'Todos os servidores funcionam' significa 'Existe pelo menos um servidor que não funciona', e negar 'Existe servidor com falha' significa 'Nenhum servidor tem falha'.",
    "connection": "A regra dos quantificadores conecta lógica e interpretação de textos. `∀x P(x)` é afirmação universal; sua negação é `∃x ¬P(x)`. `∃x P(x)` é existência; sua negação é `∀x ¬P(x)`. Não confunda negar proposição com trocar seu tema: 'todos trabalham' não se nega por 'todos não trabalham', pois basta uma exceção. Se for condicional, a negação é P∧¬Q, não uma aplicação direta de De Morgan ao texto sem estrutura.",
    "exam": "Uma alternativa pode trocar 'alguns falharam' por 'nenhum falhou' como negação correta da existencial. Outra oferece 'todos falharam' como negação de 'todos funcionam', excessivamente forte. Faça o teste do contraexemplo: qual menor situação torna a original falsa? Isso costuma revelar a negação correta.",
    "caseTitle": "Negue 'Todos têm senha e todos têm MFA'",
    "caseSteps": [
      "A frase possui conjunção de duas universais: A='todos têm senha', B='todos têm MFA'.",
      "Negação do conjunto é ¬A∨¬B.",
      "¬A significa 'existe alguém sem senha'; ¬B significa 'existe alguém sem MFA'.",
      "Resposta: 'Existe alguém sem senha ou existe alguém sem MFA', usando ou inclusivo."
    ],
    "pitfalls": [
      "Negar 'e' produz 'ou' de negações.",
      "Negar 'ou' produz 'e' de negações.",
      "Negar universal exige pelo menos um contraexemplo.",
      "'Todos não' geralmente é afirmação mais forte que 'nem todos'."
    ],
    "cards": [
      [
        "Qual a negação de P∧Q?",
        "¬P∨¬Q, pois basta uma condição ser falsa para negar a conjunção."
      ],
      [
        "Qual a negação de P∨Q?",
        "¬P∧¬Q, pois nenhuma das duas condições pode ocorrer."
      ],
      [
        "Qual a negação de 'todos trabalham'?",
        "Existe pelo menos uma pessoa do grupo que não trabalha."
      ],
      [
        "Qual a negação de 'existe um servidor com falha'?",
        "Nenhum servidor do universo considerado apresenta falha."
      ]
    ]
  },
  {
    "id": 146,
    "title": "Probabilidade condicional: por que saber B muda a chance de A",
    "goal": "Resolver P(A|B), distinguir interseção de independência e calcular sorteio sem reposição.",
    "context": "Uma caixa contém duas bolas azuis e três vermelhas. Ao sortear uma bola azul e não devolvê-la, a chance de sair azul no segundo sorteio muda. **Probabilidade condicional** mede chance de evento A quando sabemos que evento B ocorreu. Escrevemos `P(A|B)` e, quando P(B)>0, calculamos `P(A∩B)/P(B)`. O símbolo `∩` representa os resultados em que A e B ocorrem, e o divisor passa a considerar apenas o universo compatível com B.",
    "explanation": "Para duas retiradas azuis sem reposição, a primeira tem probabilidade `2/5`. Depois da primeira azul, resta uma azul dentre quatro bolas: `1/4`. A probabilidade conjunta é `2/5×1/4=1/10`. Os eventos não são independentes porque a primeira retirada alterou a composição. Se houvesse **reposição**, cada retirada começaria com duas azuis em cinco, e probabilidade de duas azuis seria `2/5×2/5=4/25` quando sorteios são independentes.",
    "connection": "**Independência** significa que saber B não altera a probabilidade de A: `P(A|B)=P(A)` quando definido, e então `P(A∩B)=P(A)P(B)`. Isso não é sinônimo de **eventos mutuamente exclusivos**, que não podem ocorrer juntos. Se A e B são mutuamente exclusivos e ambos têm probabilidade positiva, não são independentes: saber que A ocorreu torna B impossível. Essa distinção é recorrente em questões de concurso.",
    "exam": "Procure expressões 'sem reposição', 'sabendo que', 'dado que', 'independentes' e 'mutuamente exclusivos'. Elas mudam denominador ou produto. Não multiplique probabilidades sem observar condicionamento. Se a banca pede P(A|B), o universo é B, não o conjunto completo. Desenhar árvore de probabilidades ajuda visualizar etapas e caminhos.",
    "caseTitle": "Duas bolas azuis sem reposição numa urna 2A+3V",
    "caseSteps": [
      "Na primeira retirada, 2 das 5 são azuis: P=2/5.",
      "Após retirar azul sem repor, resta 1 azul em 4 bolas: probabilidade condicional=1/4.",
      "Multiplique ao longo do caminho: 2/5×1/4=2/20=1/10.",
      "Com reposição seria 2/5×2/5=4/25, resultado diferente por causa da dependência."
    ],
    "pitfalls": [
      "Sem reposição a segunda probabilidade geralmente muda.",
      "Independência não significa que eventos são mutuamente exclusivos.",
      "P(A|B) usa universo condicionado a B.",
      "Probabilidade conjunta pode exigir condicional: P(A∩B)=P(B)P(A|B)."
    ],
    "cards": [
      [
        "O que representa P(A|B)?",
        "Probabilidade de A quando sabemos que B ocorreu, restrita ao universo de B."
      ],
      [
        "Quando A e B são independentes?",
        "Quando conhecer um evento não altera a probabilidade do outro, sob condições definidas."
      ],
      [
        "Quanto é a chance de duas azuis de 2A+3V sem reposição?",
        "1/10, pois 2/5 na primeira e 1/4 na segunda condicionada à primeira azul."
      ],
      [
        "Independência e exclusão mútua são sinônimos?",
        "Não. Exclusivos não ocorrem juntos; independentes não alteram probabilidades reciprocamente."
      ]
    ]
  },
  {
    "id": 147,
    "title": "Arranjos, combinações e permutações: conte cada resultado uma vez",
    "goal": "Escolher fórmula correta com ordem e repetição, incluindo cargos e equipes sem nomes.",
    "context": "Uma organização precisa montar uma equipe de três pessoas entre seis candidatos. Se as funções são equivalentes, trocar a ordem dos nomes não cria nova equipe; temos **combinação**. Se precisa escolher presidente, secretário e tesoureiro, trocar papéis produz resultado diferente; temos **arranjo**. Se devemos ordenar todos os seis numa fila, temos **permutação**. A primeira pergunta nunca deve ser 'qual fórmula decoro?', mas '**o que torna dois resultados diferentes?**'",
    "explanation": "Para seis pessoas em três cargos distintos, há 6 escolhas para primeiro, 5 para segundo e 4 para terceiro, total `6×5×4=120` arranjos. Para apenas escolher três integrantes, cada grupo foi contado `3!=6` vezes por ordens possíveis, então `120/6=20` combinações. Se ordenar todas as seis, `6!=720` permutações. As fórmulas simples assumem pessoas distintas e sem repetição. Se permitir repetir número numa senha, o cálculo muda para produto das possibilidades em cada posição.",
    "connection": "O **princípio multiplicativo** diz que se uma escolha possui a possibilidades e a seguinte b possibilidades para cada caso, o total é a×b, com condições adequadas. **Fatorial** resume produtos decrescentes. Se enunciado divide uma turma em duas equipes **sem rótulos**, escolher A e deixar o resto para B pode contar mesma partição duas vezes, exigindo avaliar simetria. Esse cuidado de dupla contagem se conecta à inclusão-exclusão de conjuntos.",
    "exam": "A banca pode apresentar `C(6,3)=20` e `A(6,3)=120`; escolha segundo se as três posições são distinguíveis. Não use combinação para senha cujo arranjo de dígitos importa. Se a ordem dos escolhidos não muda a comissão, arranjo superconta cada grupo. Em questões com repetição de letras, considere permutações com elementos repetidos, diferentes da simples n!.",
    "caseTitle": "Seis candidatos: três cargos ou comissão de três pessoas",
    "caseSteps": [
      "Três cargos distintos: 6 opções ×5×4 =120 resultados com papéis atribuídos.",
      "Comissão sem cargos: cada grupo aparece 3!=6 vezes nessa contagem.",
      "Divida 120/6=20 grupos diferentes de três pessoas.",
      "Para ordenar todos os seis, use 6!=720; são três perguntas distintas."
    ],
    "pitfalls": [
      "Ordem dos escolhidos determina escolha de arranjo/permutação ou combinação.",
      "Fatorial simples exige elementos distintos no modelo mais básico.",
      "Repetição permitida modifica cálculo.",
      "Equipes sem rótulos podem gerar dupla contagem de partições."
    ],
    "cards": [
      [
        "Quando usar arranjo?",
        "Quando escolhemos parte dos objetos e posições/ordem fazem diferença."
      ],
      [
        "Quando usar combinação?",
        "Quando selecionamos grupo sem importar ordem, nas condições de escolha simples."
      ],
      [
        "Quanto é C(6,3)?",
        "20 combinações, pois 6×5×4 dividido por 3! =120/6."
      ],
      [
        "Quanto é P(6) de elementos distintos?",
        "720 permutações, pois ordenamos os seis objetos distintos: 6!=6×5×4×3×2×1."
      ]
    ]
  },
  {
    "id": 166,
    "title": "Oficina de condicionais e conjuntos: resolva requisitos de um edital",
    "goal": "Traduzir condições de habilitação em lógica e combinar filtros sem concluir a recíproca por engano.",
    "context": "Um edital hipotético diz: 'Se um candidato apresenta certificado válido, então recebe pontuação adicional'. Uma pessoa que recebeu pontuação poderia tê-la obtido por outra regra; portanto a **recíproca** 'se recebeu pontuação, possui certificado' não está garantida. Essa é a diferença entre condicional P→Q e recíproca Q→P. Ao mesmo tempo, o edital pode exigir **documentos A e B** para inscrição, uma conjunção cuja falha ocorre quando pelo menos um documento falta.",
    "explanation": "Defina P='certificado válido', Q='pontuação adicional'. A condicional P→Q só falha se P é verdadeiro e Q falso. Sua **contrapositiva** equivalente é ¬Q→¬P. Para habilitação que exige identidade e diploma, represente I∧D. A negação, ou seja, condição para não satisfazer ambos, é `¬I∨¬D`. Se o edital aceita experiência **ou** especialização, o 'ou' inclusivo permite candidato com as duas condições, salvo exigência de exclusividade expressa.",
    "connection": "A lógica deve ser interpretada conforme texto real do edital, que pode trazer critérios adicionais, exceções e condições legais. Não use símbolos para ignorar cláusula que restringe alcance. Com conjuntos, candidatos que satisfazem A e B pertencem à **interseção** A∩B; aqueles que satisfazem pelo menos uma, à união A∪B. Contar inscritos em ambas as condições exige corrigir dupla contagem: |A∪B|=|A|+|B|−|A∩B|.",
    "exam": "Bancas exploram 'necessário' e 'suficiente'. Se P→Q, P é condição suficiente para Q na lógica; Q é necessária para P. Isso não diz que Q é suficiente para P. Uma alternativa pode negar 'todos têm diploma' por 'ninguém tem diploma', o que é excessivo; a negação correta é 'existe alguém sem diploma'.",
    "caseTitle": "O edital exige documentos A e B",
    "caseSteps": [
      "Habilitado se apresenta A e B: H=A∧B no modelo simplificado.",
      "Quem apresenta só A não satisfaz H; a conjunção exige ambas.",
      "Negação de H é ¬A∨¬B: falta A ou falta B, inclusive podem faltar os dois.",
      "Não troque por ¬A∧¬B, pois isso excluiria indevidamente quem perdeu apenas um documento."
    ],
    "pitfalls": [
      "Condição suficiente não é automaticamente necessária e suficiente.",
      "Negar 'A e B' significa 'não A ou não B'.",
      "A recíproca da condicional pode ser falsa mesmo quando original é verdadeira.",
      "Texto real do edital pode conter exceções além de modelo lógico simplificado."
    ],
    "cards": [
      [
        "Qual a diferença entre condição suficiente e necessária em P→Q?",
        "P é suficiente para Q e Q é necessária para P na implicação formal."
      ],
      [
        "Qual a negação de 'A e B'?",
        "Não A ou não B, admitindo falta de um ou ambos."
      ],
      [
        "Por que Q→P não é equivalente a P→Q?",
        "Porque Q pode ocorrer sem P em situações permitidas pela condicional original."
      ],
      [
        "Como representar 'pelo menos uma das condições'?",
        "P∨Q ou união de conjuntos, incluindo quem satisfaz ambas."
      ]
    ]
  },
  {
    "id": 167,
    "title": "Oficina de probabilidade: conte resultados e interprete risco",
    "goal": "Resolver contagens condicionais e distinguir valor numérico de probabilidade de decisão prática.",
    "context": "Um monitor mostra que 2% dos alertas se confirmaram como incidentes no período analisado. Isso não significa que um alerta individual seja 'sem importância' ou que a chance de um incidente futuro seja sempre exatamente 2%. **Probabilidade** depende de modelo, dados, condições e universo analisado. **Frequência observada** é proporção em amostra; pode ajudar estimar probabilidade, mas a generalização exige atenção a representatividade e mudanças no ambiente.",
    "explanation": "Em sorteio equiprovável, probabilidade é casos favoráveis/total. Em dados reais, as chances podem variar; devemos identificar **taxa base**, período e critérios de contagem. **Probabilidade condicional** P(A|B) é chance de A quando B ocorreu. Se um sistema produz 1000 alertas e 20 confirmam incidente, a proporção observada `20/1000=2%` diz algo sobre esses alertas, não sobre todo tráfego da organização. Se uma nova regra aumentar alertas falsos, a proporção pode mudar sem necessariamente mudar ameaças.",
    "connection": "Uma decisão de segurança também considera **impacto**. Evento raro pode exigir controle forte quando consequências são graves. E resultado 'probabilidade 2%' não implica 'risco 2%' em qualquer escala: risco envolve incerteza e efeito sobre objetivos. Em questões de concursos, separar **chance** de **consequência** ajuda evitar conclusão simplista de que evento improvável é sempre irrelevante.",
    "exam": "Se o enunciado diz '20 incidentes em 1000 alertas', calcule a proporção com cuidado, mas não afirme que 98% de todas as atividades de rede são seguras. Se pergunta por P(incidente|alerta), o denominador é quantidade de alertas e não número total de pacotes de rede. Uma alternativa que confunde amostra com população pode estar extrapolando.",
    "caseTitle": "Qual proporção dos alertas virou incidente?",
    "caseSteps": [
      "Em um mês foram registrados 1000 alertas e 20 foram confirmados como incidentes.",
      "Proporção condicional observada =20/1000=0,02, ou 2% entre os alertas.",
      "Isso não permite afirmar que apenas 2% dos ataques reais foram detectados; faltam dados de ataques não alertados.",
      "Avalie também impacto dos incidentes confirmados e qualidade do sistema de detecção."
    ],
    "pitfalls": [
      "Proporção observada não é lei imutável de probabilidade futura.",
      "P(incidente|alerta) usa alertas como universo condicionado.",
      "Risco envolve impacto, não apenas probabilidade.",
      "Amostra não representa automaticamente toda população e todos os períodos."
    ],
    "cards": [
      [
        "Qual proporção é 20 em 1000?",
        "0,02 ou 2% do universo de mil observações."
      ],
      [
        "O que P(incidente|alerta) mede?",
        "Chance de incidente dado que houve alerta, dentro do modelo e dados considerados."
      ],
      [
        "Por que 2% de alertas não indica taxa de detecção de ataques?",
        "Porque faltam dados sobre incidentes reais sem alerta e outros denominadores necessários."
      ],
      [
        "Probabilidade baixa significa risco irrelevante?",
        "Não. Consequências graves podem justificar tratamento mesmo quando chance estimada é baixa."
      ]
    ]
  }
] satisfies EditorialSeed[])
