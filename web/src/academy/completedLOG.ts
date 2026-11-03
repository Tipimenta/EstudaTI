import type {PedagogicalLesson} from './intro1'
export const completedLOG:PedagogicalLesson[]=[
  {
    "id": 77,
    "title": "Quantificadores e negação",
    "goal": "Explicar e aplicar: Quantificadores e negação.",
    "steps": [
      {
        "title": "Entenda Quantificadores e negação",
        "body": "Negar \"todos possuem certificado\" produz \"existe ao menos um que não possui certificado\". Negar \"existe um que passou\" produz \"ninguém passou\". Troca-se ∀ por ∃, invertendo o predicado.\n\n**Exemplo do assunto:** ¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x)."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Negação de \"Existe servidor indisponível\":\n\n**Resposta:** Todos os servidores estão disponíveis.\n\n**Explicação:** Negar ∃ indisponível resulta ∀ disponível."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual é a negação de 'Todos os técnicos concluíram o treinamento'?\n\n**Resposta:** Pelo menos um técnico não concluiu.\n\n**Explicação:** Negar um quantificador universal exige um contraexemplo: existe ao menos um elemento que não satisfaz a propriedade.\n\n**Cuidado:** Não confunda \"nem todos\" com \"nenhum\"."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Quantificadores e negação",
      "body": "**1. O que a questão quer saber?** Negação de \"Todos os técnicos conhecem Linux\":\n\n**2. Que conceito resolve?** Negação de universal afirma um contraexemplo.\n\n**3. Qual é a conclusão?** Algum técnico não conhece Linux.\n\n"
    },
    "pitfalls": [
      "Não confunda \"nem todos\" com \"nenhum\".",
      "Não confunda \"nem todos\" com \"nenhum\"."
    ],
    "review": [
      {
        "ask": "Negação de \"Todos os técnicos conhecem Linux\":",
        "answer": "Algum técnico não conhece Linux. Negação de universal afirma um contraexemplo."
      },
      {
        "ask": "Negação de \"Existe servidor indisponível\":",
        "answer": "Todos os servidores estão disponíveis. Negar ∃ indisponível resulta ∀ disponível."
      },
      {
        "ask": "Qual armadilha evitar em Quantificadores e negação?",
        "answer": "Não confunda \"nem todos\" com \"nenhum\"."
      }
    ],
    "extra": ""
  },
  {
    "id": 78,
    "title": "Probabilidade simples e complementar",
    "goal": "Explicar e aplicar: Probabilidade simples e complementar.",
    "steps": [
      {
        "title": "Entenda Probabilidade simples e complementar",
        "body": "Em espaço equiprovável, P(evento) = casos favoráveis/total. Complementar tem P(Aᶜ)=1−P(A). Independência implica P(A∩B)=P(A)P(B); não confundir com exclusividade.\n\n**Exemplo do assunto:** Ao lançar dado justo, probabilidade de não sair 6 é 5/6; probabilidade de sair 6 é 1/6."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual a probabilidade de NÃO sair 6 ao lançar dado honesto?\n\n**Resposta:** 5/6.\n\n**Explicação:** Há cinco faces diferentes de 6 em seis igualmente prováveis."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Se eventos A e B são independentes, P(A∩B) é:\n\n**Resposta:** P(A)×P(B).\n\n**Explicação:** Para eventos independentes, multiplica-se as probabilidades.\n\n**Cuidado:** Eventos mutuamente exclusivos com probabilidade positiva não são independentes."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Probabilidade simples e complementar",
      "body": "**1. O que a questão quer saber?** Um evento tem probabilidade 0,35 de ocorrer. Qual a probabilidade do complementar?\n\n**2. Que conceito resolve?** Para evento A, P(não A)=1−P(A)=0,65.\n\n**3. Qual é a conclusão?** 0,65.\n\n"
    },
    "pitfalls": [
      "Eventos mutuamente exclusivos com probabilidade positiva não são independentes.",
      "Eventos mutuamente exclusivos com probabilidade positiva não são independentes."
    ],
    "review": [
      {
        "ask": "Qual a probabilidade de NÃO sair 6 ao lançar dado honesto?",
        "answer": "5/6. Há cinco faces diferentes de 6 em seis igualmente prováveis."
      },
      {
        "ask": "Se eventos A e B são independentes, P(A∩B) é:",
        "answer": "P(A)×P(B). Para eventos independentes, multiplica-se as probabilidades."
      },
      {
        "ask": "Qual armadilha evitar em Probabilidade simples e complementar?",
        "answer": "Eventos mutuamente exclusivos com probabilidade positiva não são independentes."
      }
    ],
    "extra": ""
  },
  {
    "id": 80,
    "title": "Conjuntos e inclusão-exclusão",
    "goal": "Explicar e aplicar: Conjuntos e inclusão-exclusão.",
    "steps": [
      {
        "title": "Entenda Conjuntos e inclusão-exclusão",
        "body": "Para conjuntos A e B finitos, |A∪B|=|A|+|B|−|A∩B|. Interseção reúne elementos comuns; diferença A−B contém elementos de A ausentes em B.\n\n**Exemplo do assunto:** Em grupo de 40 pessoas, 22 usam Linux, 18 Windows e 8 ambos; 32 usam pelo menos um (22+18−8)."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** O conjunto A−B contém:\n\n**Resposta:** Elementos de A que não pertencem a B.\n\n**Explicação:** Diferença exclui elementos presentes em B."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Se |A|=22, |B|=18 e |A∩B|=8, quanto é |A∪B|?\n\n**Resposta:** 32.\n\n**Explicação:** Pelo princípio da inclusão-exclusão, somamos 22 e 18, mas subtraímos os 8 elementos presentes em ambos os conjuntos para não contá-los duas vezes: 22+18−8=32.\n\n**Cuidado:** Somar tamanhos sem descontar interseção duplica contagens."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Conjuntos e inclusão-exclusão",
      "body": "**1. O que a questão quer saber?** Em um grupo de 40 pessoas, 22 estudam redes, 18 estudam SQL e 7 estudam ambas. Quantas estudam ao menos uma dessas disciplinas?\n\n**2. Que conceito resolve?** Pela inclusão-exclusão, |R∪S|=22+18−7=33.\n\n**3. Qual é a conclusão?** 33.\n\n"
    },
    "pitfalls": [
      "Somar tamanhos sem descontar interseção duplica contagens.",
      "Somar tamanhos sem descontar interseção duplica contagens."
    ],
    "review": [
      {
        "ask": "Se |A|=22, |B|=18 e |A∩B|=8, quanto é |A∪B|?",
        "answer": "32. 22+18−8=32."
      },
      {
        "ask": "O conjunto A−B contém:",
        "answer": "Elementos de A que não pertencem a B. Diferença exclui elementos presentes em B."
      },
      {
        "ask": "Qual armadilha evitar em Conjuntos e inclusão-exclusão?",
        "answer": "Somar tamanhos sem descontar interseção duplica contagens."
      }
    ],
    "extra": ""
  },
  {
    "id": 81,
    "title": "Progressões e sequências",
    "goal": "Explicar e aplicar: Progressões e sequências.",
    "steps": [
      {
        "title": "Entenda Progressões e sequências",
        "body": "PA apresenta diferença constante entre termos, com a_n=a_1+(n−1)r. PG apresenta razão constante, com a_n=a_1·q^(n−1). Sequências figurais exigem justificar regra, pois padrões finitos podem ser ambíguos.\n\n**Exemplo do assunto:** PA 3,7,11,15 tem r=4; quinto termo é 19. PG 2,6,18 tem q=3; quarto é 54."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual é o 4º termo da PG 2,6,18,...?\n\n**Resposta:** 54.\n\n**Explicação:** A razão é 3 e próximo termo é 18×3=54."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Qual é o 5º termo da PA 3,7,11,15,...?\n\n**Resposta:** 19.\n\n**Explicação:** A razão é 4 e o quinto termo é 15+4=19.\n\n**Cuidado:** Não assuma regra única sem considerar alternativas ou enunciado."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Progressões e sequências",
      "body": "**1. O que a questão quer saber?** Uma progressão aritmética inicia em 4 e aumenta 3 a cada termo. Qual o quinto termo?\n\n**2. Que conceito resolve?** Termo n: a_n=4+(n−1)×3. No quinto, 4+12=16.\n\n**3. Qual é a conclusão?** 16.\n\n"
    },
    "pitfalls": [
      "Não assuma regra única sem considerar alternativas ou enunciado.",
      "Não assuma regra única sem considerar alternativas ou enunciado."
    ],
    "review": [
      {
        "ask": "Qual é o 5º termo da PA 3,7,11,15,...?",
        "answer": "19. A razão é 4 e o quinto termo é 15+4=19."
      },
      {
        "ask": "Qual é o 4º termo da PG 2,6,18,...?",
        "answer": "54. A razão é 3 e próximo termo é 18×3=54."
      },
      {
        "ask": "Qual armadilha evitar em Progressões e sequências?",
        "answer": "Não assuma regra única sem considerar alternativas ou enunciado."
      }
    ],
    "extra": ""
  },
  {
    "id": 82,
    "title": "Regra de três e taxas",
    "goal": "Explicar e aplicar: Regra de três e taxas.",
    "steps": [
      {
        "title": "Entenda Regra de três e taxas",
        "body": "Grandezas diretamente proporcionais variam na mesma razão; inversamente proporcionais variam em razão recíproca. Em problemas de trabalho, mantenha mesma produtividade e unidades coerentes; mudanças de produtividade requerem novo modelo.\n\n**Exemplo do assunto:** Quatro equipamentos iguais finalizam tarefa em seis horas; oito equipamentos iguais sob as mesmas condições podem terminar em três horas."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Se 4 máquinas idênticas fazem uma tarefa em 6 h, 8 máquinas fazem em:\n\n**Resposta:** 3 h.\n\n**Explicação:** O dobro de máquinas reduz tempo pela metade sob condições iguais."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Se velocidade aumenta e distância é fixa, tempo de trajeto é geralmente:\n\n**Resposta:** Inversamente proporcional à velocidade.\n\n**Explicação:** Tempo=distância/velocidade.\n\n**Cuidado:** Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Regra de três e taxas",
      "body": "**1. O que a questão quer saber?** Uma empresa compra 12 unidades a R$ 25 cada. Se o preço unitário aumentar 20% e a quantidade permanecer, qual será o gasto?\n\n**2. Que conceito resolve?** Preço novo=25×1,2=30; 12×30=R$ 360.\n\n**3. Qual é a conclusão?** R$ 360.\n\n"
    },
    "pitfalls": [
      "Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo.",
      "Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo."
    ],
    "review": [
      {
        "ask": "Se 4 máquinas idênticas fazem uma tarefa em 6 h, 8 máquinas fazem em:",
        "answer": "3 h. O dobro de máquinas reduz tempo pela metade sob condições iguais."
      },
      {
        "ask": "Se velocidade aumenta e distância é fixa, tempo de trajeto é geralmente:",
        "answer": "Inversamente proporcional à velocidade. Tempo=distância/velocidade."
      },
      {
        "ask": "Qual armadilha evitar em Regra de três e taxas?",
        "answer": "Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo."
      }
    ],
    "extra": ""
  },
  {
    "id": 112,
    "title": "Proposições, implicação e equivalências",
    "goal": "Resolver tabelas-verdade e distinguir contrapositiva, recíproca e negação.",
    "steps": [
      {
        "title": "Compreenda Proposições, implicação e equivalências",
        "body": "Uma **proposição** é enunciado declarativo ao qual se atribui verdadeiro ou falso sob interpretação definida; perguntas e ordens não são proposições simples. Operadores: conjunção `P ∧ Q` só é verdadeira se ambos verdadeiros; disjunção inclusiva `P ∨ Q` só é falsa se ambos falsos; implicação material `P → Q` só é falsa quando P verdadeira e Q falsa; bicondicional `P ↔ Q` é verdadeiro quando valores coincidem; negação inverte valor."
      },
      {
        "title": "Como funciona na prática",
        "body": "A implicação `P → Q` é equivalente a `¬P ∨ Q` e à **contrapositiva** `¬Q → ¬P`. Já a recíproca `Q → P` não é equivalente em geral. Leis de De Morgan: `¬(P ∧ Q) ≡ ¬P ∨ ¬Q` e `¬(P ∨ Q) ≡ ¬P ∧ ¬Q`. Negar uma implicação produz `P ∧ ¬Q`, não uma nova implicação invertida."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "Em provas com linguagem natural, a palavra “se” introduz condição suficiente no sentido de `P → Q`; “somente se” costuma expressar necessidade: “P somente se Q” também se formaliza como `P → Q`. Cuidado com quantificadores implícitos e contexto para não aplicar uma fórmula a frase ambígua."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Proposições, implicação e equivalências",
      "body": "Enunciado: “Se o servidor está atualizado (P), então a correção está instalada (Q)”. Teste P=V e Q=F: a implicação é F. Para P=F e Q=F: a implicação material é V, mesmo que pareça contraintuitivo fora da lógica formal.\n\nContrapositiva: “Se a correção não está instalada (¬Q), então o servidor não está atualizado (¬P)”, com mesma tabela-verdade. Recíproca “Se a correção está instalada então o servidor está atualizado” não é dedução válida a partir da original. Negação da implicação: “Servidor atualizado E correção não instalada”, único cenário que falsifica a regra."
    },
    "pitfalls": [
      "implicação não significa causalidade. **Pegadinha:** “ou” em lógica proposicional normalmente é inclusivo salvo especificação. **Pegadinha:** contrária/inversa/recíproca não são automaticamente equivalentes. **Pegadinha:** a negação de “P e Q” troca o conectivo por “ou” e nega ambos.",
      "Considere as condições específicas de Proposições, implicação e equivalências: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Quando a implicação P→Q é falsa?",
        "answer": "Apenas quando P é verdadeira e Q é falsa."
      },
      {
        "ask": "Qual a contrapositiva de P→Q?",
        "answer": "¬Q→¬P; é logicamente equivalente à proposição original."
      }
    ],
    "extra": ""
  },
  {
    "id": 113,
    "title": "Conjuntos, probabilidade e combinatória",
    "goal": "Evitar dupla contagem e distinguir eventos independentes de excludentes.",
    "steps": [
      {
        "title": "Compreenda Conjuntos, probabilidade e combinatória",
        "body": "Para conjuntos finitos, **inclusão-exclusão** de dois conjuntos: `|A∪B|=|A|+|B|−|A∩B|`. A interseção reúne elementos comuns; união reúne elementos de pelo menos um. Se “nenhum dos dois” for pedido, subtraia a união do total do universo."
      },
      {
        "title": "Como funciona na prática",
        "body": "Em experimento equiprovável, `P(A)=casos favoráveis/total de casos`. Complementar: `P(não A)=1−P(A)`. Eventos **independentes** satisfazem `P(A∩B)=P(A)P(B)`. Eventos **mutuamente exclusivos** não ocorrem juntos; se ambos têm probabilidade positiva, não são independentes. Probabilidade condicional `P(A|B)=P(A∩B)/P(B)` se P(B)>0."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "Combinatória: permutação de n distintos é `n!`. **Arranjo** considera ordem de escolha, `A(n,k)=n!/(n−k)!`; **combinação** ignora ordem, `C(n,k)=n!/(k!(n−k)!)`. Para grupos de pessoas sem cargos, combinação; para presidente e secretário com posições distintas, arranjo. Sempre defina primeiro se seleção permite repetição e se ordem importa."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Conjuntos, probabilidade e combinatória",
      "body": "Em 50 candidatos, 28 estudam Linux, 21 estudam redes e 9 estudam ambos. União = 28+21−9 = **40**; nenhum = 50−40 = **10**. Se você somar 28+21, contará os nove duas vezes.\n\nEscolher comissão de 3 entre 6 sem cargos: `C(6,3)=6!/(3!3!)=20`. Se quiser presidente e secretário entre 6 pessoas distintas, `6×5=30` arranjos.\n\nDois lançamentos independentes de moeda justa: `P(duas caras)=1/2×1/2=1/4`. Já “cara no mesmo lançamento” e “coroa no mesmo lançamento” são mutuamente exclusivos, mas não independentes."
    },
    "pitfalls": [
      "a expressão “ao menos um” frequentemente sugere complemento. **Pegadinha:** “ambos” é interseção, e não soma. **Pegadinha:** a fórmula da combinação pressupõe escolha sem repetição. **Pegadinha:** independência não é sinônimo de incompatibilidade.",
      "Considere as condições específicas de Conjuntos, probabilidade e combinatória: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "O que diferencia eventos independentes de eventos mutuamente exclusivos?",
        "answer": "Independentes não alteram probabilidades condicionais entre si; exclusivos não ocorrem juntos."
      },
      {
        "ask": "Quando usar combinação em vez de arranjo?",
        "answer": "Quando selecionar itens sem considerar a ordem e sem repetição, nas fórmulas usuais."
      }
    ],
    "extra": ""
  },
  {
    "id": 114,
    "title": "Equações, progressões e análise de problemas",
    "goal": "Traduzir enunciados em expressões sem aplicar fórmulas fora de contexto.",
    "steps": [
      {
        "title": "Compreenda Equações, progressões e análise de problemas",
        "body": "**Equação** é igualdade envolvendo incógnitas; a solução precisa satisfazer condições originais. Em equações de 1º grau, isole incógnita com operações equivalentes. Em 2º grau, `ax²+bx+c=0` com a≠0; discriminante `Δ=b²−4ac`, soluções reais quando Δ≥0. Não divida por expressão que pode ser zero sem analisar casos."
      },
      {
        "title": "Como funciona na prática",
        "body": "**PA** tem diferença constante: `a_n=a_1+(n−1)r`; soma `S_n=n(a_1+a_n)/2`. **PG** tem razão constante `q` (quando definida): `a_n=a_1 q^(n−1)`; soma de PG finita com q≠1: `S_n=a_1(q^n−1)/(q−1)`. Bancas podem misturar crescimento linear e exponencial; identifique padrão pela diferença e razão entre termos."
      },
      {
        "title": "Relações, consequências e limites",
        "body": "**Regra de três** exige proporcionalidade demonstrável. Mais técnicos nem sempre implicam tempo inversamente proporcional se há dependências, gargalos ou divisão não linear do trabalho. Em questão idealizada, supondo trabalho fixo e produtividade igual, pessoas × tempo pode ser constante. Leia hipóteses, unidades e arredondamentos antes do cálculo."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Equações, progressões e análise de problemas",
      "body": "PA: um curso tem 5 questões no dia 1 e acrescenta 3 por dia. No 8º dia, `a_8 = 5 + 7×3 = 26`. Total nos oito dias: `S_8 = 8×(5+26)/2 = 124`.\n\nPG: número de backups processados dobra a cada etapa a partir de 2: 2,4,8,16... O 6º termo é `2×2^5 = 64`. Se a prova cobrar total até a 6ª etapa, soma = `2(2^6−1)=126`.\n\nEquação: orçamento de R$ 1.200 inclui 3 licenças iguais mais taxa de R$ 150. `3x+150=1200`; logo `x=350`. Verifique: 3×350+150=1.200. Traduzir o problema é tão importante quanto calcular."
    },
    "pitfalls": [
      "PA não se identifica apenas por termos crescentes; precisa diferença constante. **Pegadinha:** `n−1` no termo geral evita erro de uma posição. **Pegadinha:** taxa fixa em orçamento não deve ser multiplicada pela quantidade de itens. **Pegadinha:** não arredonde resultados intermediários sem justificativa.",
      "Considere as condições específicas de Equações, progressões e análise de problemas: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Qual é a fórmula do termo geral da PA?",
        "answer": "a_n = a_1 + (n−1)r."
      },
      {
        "ask": "Como distinguir crescimento típico de PA e PG?",
        "answer": "PA tem diferença constante; PG tem razão constante entre termos consecutivos."
      }
    ],
    "extra": ""
  },
  {
    "id": 144,
    "title": "Condicional, contrapartida e contrapositiva",
    "goal": "Compreender e aplicar condicional, contrapartida e contrapositiva em provas.",
    "steps": [
      {
        "title": "Entenda Condicional, contrapartida e contrapositiva",
        "body": "A proposição P→Q é logicamente equivalente a ¬Q→¬P, sua contrapositiva. A recíproca Q→P não é equivalente em geral.\n\nUma condicional é falsa somente quando antecedente é verdadeiro e consequente falso. “Se há licença válida, o acesso é permitido” não afirma que todo acesso permitido requer licença válida. Em concursos, a troca entre condição necessária e suficiente costuma gerar alternativas incorretas.\n\n**Exemplo do assunto:** Se “Todo servidor do grupo A possui acesso B” e alguém não possui acesso B, pode-se concluir que não está no grupo A, respeitando a premissa."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Qual é a contrapositiva de 'Se há energia, o servidor liga'?\n\n**Resposta:** Se o servidor não liga, então não há energia.\n\n**Explicação:** P→Q equivale a ¬Q→¬P. A contrapositiva nega e inverte antecedente e consequente."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Se “Todo servidor do grupo A possui acesso B” e alguém não possui acesso B, pode-se concluir que não está no grupo A, respeitando a premissa.\n\n**Um segundo cenário para entender:** A proposição P→Q é verdadeira. Qual outra proposição é logicamente equivalente?\n\n**A regra aplicada:** A contrapositiva preserva a mesma tabela-verdade.\n\n**Resultado explicado:** ¬Q→¬P.\n\n**Cuidado:** Não inferir P a partir de Q é evitar a falácia de afirmar o consequente."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Condicional, contrapartida e contrapositiva",
      "body": "**1. O que a questão quer saber?** Qual fórmula é equivalente a P→Q?\n\n**2. Que conceito resolve?** Contrapositiva preserva a tabela-verdade da condicional.\n\n**3. Qual é a conclusão?** ¬Q→¬P.\n\n"
    },
    "pitfalls": [
      "Não inferir P a partir de Q é evitar a falácia de afirmar o consequente.",
      "Não inferir P a partir de Q é evitar a falácia de afirmar o consequente."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Condicional, contrapartida e contrapositiva?",
        "answer": "A proposição P→Q é logicamente equivalente a ¬Q→¬P, sua contrapositiva. A recíproca Q→P não é equivalente em geral."
      },
      {
        "ask": "Qual erro de prova evitar em Condicional, contrapartida e contrapositiva?",
        "answer": "Não inferir P a partir de Q é evitar a falácia de afirmar o consequente."
      }
    ],
    "extra": ""
  },
  {
    "id": 145,
    "title": "Leis de De Morgan e negação",
    "goal": "Compreender e aplicar leis de de morgan e negação em provas.",
    "steps": [
      {
        "title": "Entenda Leis de De Morgan e negação",
        "body": "Negar uma conjunção produz disjunção das negações; negar uma disjunção produz conjunção das negações.\n\n¬(P∧Q) equivale a ¬P∨¬Q; ¬(P∨Q) equivale a ¬P∧¬Q. Em português, a negação de “João estuda redes e segurança” é “João não estuda redes ou não estuda segurança”, não necessariamente negar ambas.\n\n**Exemplo do assunto:** Negar “o sistema está atualizado ou está monitorado” exige afirmar simultaneamente que não está atualizado e que não está monitorado."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** A negação da frase 'O sistema está online e o backup terminou' é:\n\n**Resposta:** O sistema não está online ou o backup não terminou.\n\n**Explicação:** Lei de De Morgan: ¬(P∧Q) é ¬P∨¬Q."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Negar “o sistema está atualizado ou está monitorado” exige afirmar simultaneamente que não está atualizado e que não está monitorado.\n\n**Um segundo cenário para entender:** Qual é a negação correta de 'Ana estuda ou Bruno trabalha', considerando OU inclusivo?\n\n**A regra aplicada:** De Morgan: ¬(P∨Q)=¬P∧¬Q.\n\n**Resultado explicado:** Ana não estuda e Bruno não trabalha.\n\n**Cuidado:** A troca entre e/ou é indispensável ao negar expressões compostas."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Leis de De Morgan e negação",
      "body": "**1. O que a questão quer saber?** Qual negação de P∨Q?\n\n**2. Que conceito resolve?** Lei de De Morgan: negue os termos e inverta o conectivo.\n\n**3. Qual é a conclusão?** ¬P∧¬Q.\n\n"
    },
    "pitfalls": [
      "A troca entre e/ou é indispensável ao negar expressões compostas.",
      "A troca entre e/ou é indispensável ao negar expressões compostas."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Leis de De Morgan e negação?",
        "answer": "Negar uma conjunção produz disjunção das negações; negar uma disjunção produz conjunção das negações."
      },
      {
        "ask": "Qual erro de prova evitar em Leis de De Morgan e negação?",
        "answer": "A troca entre e/ou é indispensável ao negar expressões compostas."
      }
    ],
    "extra": ""
  },
  {
    "id": 146,
    "title": "Probabilidade condicional e independência",
    "goal": "Compreender e aplicar probabilidade condicional e independência em provas.",
    "steps": [
      {
        "title": "Entenda Probabilidade condicional e independência",
        "body": "P(A|B)=P(A∩B)/P(B) quando P(B)>0. Independência implica P(A∩B)=P(A)P(B), mas não vale em geral.\n\nSe 40% dos candidatos estudam redes, 20% estudam SQL e 10% estudam ambos, a probabilidade de estudar SQL dado que estuda redes é 0,10/0,40=25%. Em problemas com reposição, independência é mais plausível que em amostras sem reposição.\n\n**Exemplo do assunto:** Analise sempre o espaço amostral condicionado, pois o denominador muda."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Se P(A∩B)=0,12 e P(B)=0,30, quanto vale P(A|B)?\n\n**Resposta:** 0,40.\n\n**Explicação:** 0,12/0,30=0,40."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "**Questão:** Dois eventos independentes têm probabilidades de 0,4 e 0,5. Qual a probabilidade de ambos ocorrerem?\n\n**Resposta:** 0,2.\n\n**Explicação:** Para eventos independentes, P(A∩B)=P(A)×P(B)=0,4×0,5=0,2.\n\n**Cuidado:** P(A|B) não é automaticamente igual a P(B|A)."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Probabilidade condicional e independência",
      "body": "**1. O que a questão quer saber?** Qual expressão é logicamente equivalente à negação da proposição “Se P, então Q”?\n\n**2. Que conceito resolve?** P implica Q equivale a não P ou Q; sua negação é P e não Q.\n\n**3. Qual é a conclusão?** P e não Q.\n\n**Alternativa incorreta:** Não P ou Q. **Motivo:** Não P ou Q é a própria implicação, não sua negação."
    },
    "pitfalls": [
      "P(A|B) não é automaticamente igual a P(B|A).",
      "**Alternativa incorreta:** Não P ou Q. **Motivo:** Não P ou Q é a própria implicação, não sua negação."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Probabilidade condicional e independência?",
        "answer": "P(A|B)=P(A∩B)/P(B) quando P(B)>0. Independência implica P(A∩B)=P(A)P(B), mas não vale em geral."
      },
      {
        "ask": "Qual erro de prova evitar em Probabilidade condicional e independência?",
        "answer": "P(A|B) não é automaticamente igual a P(B|A)."
      }
    ],
    "extra": ""
  },
  {
    "id": 147,
    "title": "Análise combinatória: arranjos e combinações",
    "goal": "Compreender e aplicar análise combinatória: arranjos e combinações em provas.",
    "steps": [
      {
        "title": "Entenda Análise combinatória: arranjos e combinações",
        "body": "Quando a ordem importa, use contagens de arranjos/permutação; quando não importa, combinações.\n\nEscolher três pessoas entre dez para uma comissão sem cargos fornece C(10,3)=120. Se há três posições distintas, há 10×9×8=720 maneiras de preenchê-las sem repetição. Distinguir reposição e ordem é etapa mais importante que decorar fórmulas.\n\n**Exemplo do assunto:** Uma senha de três caracteres escolhidos entre dez símbolos com repetição permitida tem 10³ combinações ordenadas possíveis."
      },
      {
        "title": "Entenda a lógica da resposta",
        "body": "**Questão:** Quantas comissões de duas pessoas podem ser formadas entre cinco, sem distinguir posições?\n\n**Resposta:** 10.\n\n**Explicação:** C(5,2)=5×4/2=10."
      },
      {
        "title": "Aplique a ideia em outra situação",
        "body": "Uma senha de três caracteres escolhidos entre dez símbolos com repetição permitida tem 10³ combinações ordenadas possíveis.\n\n**Um segundo cenário para entender:** Se seis candidatos disputarão presidente e vice sem acumular posições, quantos resultados ordenados podem ocorrer?\n\n**A regra aplicada:** Há seis escolhas para presidente e cinco restantes para vice: 6×5=30.\n\n**Resultado explicado:** 30.\n\n**Cuidado:** Comissão sem cargo e sequência de cargos não são o mesmo problema."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Análise combinatória: arranjos e combinações",
      "body": "**1. O que a questão quer saber?** Quatro pessoas disputarão primeiro e segundo lugar. Quantos pares ordenados de vencedores são possíveis?\n\n**2. Que conceito resolve?** Escolhas ordenadas sem repetição: 4 opções para 1º e 3 para 2º, resultando 4×3=12.\n\n**3. Qual é a conclusão?** 12.\n\n"
    },
    "pitfalls": [
      "Comissão sem cargo e sequência de cargos não são o mesmo problema.",
      "Comissão sem cargo e sequência de cargos não são o mesmo problema."
    ],
    "review": [
      {
        "ask": "Qual é o conceito central de Análise combinatória: arranjos e combinações?",
        "answer": "Quando a ordem importa, use contagens de arranjos/permutação; quando não importa, combinações."
      },
      {
        "ask": "Qual erro de prova evitar em Análise combinatória: arranjos e combinações?",
        "answer": "Comissão sem cargo e sequência de cargos não são o mesmo problema."
      }
    ],
    "extra": ""
  },
  {
    "id": 166,
    "title": "Condicionais, conjuntos e seleção de candidatos",
    "goal": "Resolver problemas de lógica com implicação e interseção sem pressupor recíproca de condições.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — requisitos de um concurso\nUm edital hipotético afirma: “Se o candidato é nomeado, então apresentou o diploma exigido”. Representando nomeação por N e diploma por D, temos `N → D`. A frase **não autoriza** concluir `D → N`: possuir diploma é condição necessária nesse enunciado, mas não suficiente para nomeação, que depende de aprovação, classificação e outras exigências. A contrapositiva `¬D → ¬N` é logicamente equivalente à implicação original."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Tabela de verdade em palavras\n`P → Q` só é falsa quando P é verdadeira e Q é falsa. Nos outros três casos, é verdadeira na lógica proposicional clássica. Isso não significa que um antecedente falso prova qualquer fenômeno na realidade: a tabela define a semântica do conectivo. Para negar `P → Q`, escreva `P ∧ ¬Q`. A recíproca `Q → P` e a inversa `¬P → ¬Q` não são equivalências gerais da original."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## Problema de conjuntos resolvido\nEm 100 estudantes, 60 estudam Redes, 45 estudam Português e 20 estudam ambas. Pela inclusão-exclusão, `|R ∪ P| = 60 + 45 − 20 = 85`. Portanto, 15 não estudam nenhuma das duas. Somente Redes = 40; somente Português = 25; ambas = 20. Soma das quatro regiões: `40 + 25 + 20 + 15 = 100`. Esse balanço evita erro comum de somar diretamente 60+45 e concluir que 105 estudantes são pessoas diferentes."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Condicionais, conjuntos e seleção de candidatos",
      "body": "**Questão:** Em 100 estudantes, 60 estudam Redes, 45 Português e 20 ambos. Quantos não estudam nenhuma das duas?\n\n**Resposta:** 15.\n\n**Explicação:** União = 60+45−20=85; fora da união = 100−85=15."
    },
    "pitfalls": [
      "Considere as condições específicas de Condicionais, conjuntos e seleção de candidatos: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de Condicionais, conjuntos e seleção de candidatos: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Qual a negação de P implica Q?",
        "answer": "P e não Q (P ∧ ¬Q)."
      },
      {
        "ask": "Como calcular união de dois conjuntos A e B?",
        "answer": "|A∪B| = |A|+|B|−|A∩B|, evitando dupla contagem da interseção."
      }
    ],
    "extra": ""
  },
  {
    "id": 167,
    "title": "Probabilidade, contagem e interpretação de risco",
    "goal": "Aplicar contagem e probabilidade condicional com denominadores corretos em questões de seleção.",
    "steps": [
      {
        "title": "O problema e o conceito",
        "body": "# Caso de prova — tirar conclusões a partir de uma amostra\nUma prova apresenta um grupo de 40 candidatos, dos quais 24 estudam Linux e 16 não estudam. Entre os 24 que estudam Linux, 18 acertaram uma questão de redes; entre os 16 restantes, 8 acertaram. Se escolhermos aleatoriamente **um candidato do grupo**, a chance de ele ter acertado é `(18+8)/40 = 26/40 = 65%`. Se escolhermos aleatoriamente **um candidato que estuda Linux**, a chance condicional de acerto é `18/24 = 75%`. Os denominadores diferem porque a população de referência mudou."
      },
      {
        "title": "Como funciona o mecanismo",
        "body": "## Probabilidade condicional sem mistério\nA fórmula é `P(A|B) = P(A ∩ B) / P(B)` para `P(B)>0`. É preciso definir A (acertar) e B (estudar Linux) antes de substituir números. Inverter o condicionamento, usando `P(B|A)`, responde outra pergunta; nesse caso seria `18/26`, não `18/24`. Este é um dos erros mais frequentes em questões que parecem simples."
      },
      {
        "title": "Como analisar e decidir",
        "body": "## Contagem: ordem importa?\nUm sistema cria senhas de três caracteres distintos usando as cinco letras A, B, C, D, E. Como a ordem importa, são `5 × 4 × 3 = 60` possibilidades. Se a pergunta fosse apenas escolher três letras para formar um grupo sem ordem, o total seria `C(5,3) = 5!/(3!2!) = 10`. Compare os verbos “escolher”, “ordenar”, “distribuir” e “formar sequência”, mas confira as condições de repetição."
      }
    ],
    "worked": {
      "title": "Exemplo guiado — Probabilidade, contagem e interpretação de risco",
      "body": "**Questão:** Quantas sequências de três letras distintas podem ser formadas com cinco letras disponíveis, considerando a ordem?\n\n**Resposta:** 60.\n\n**Explicação:** São arranjos sem repetição: 5×4×3=60. Escolher sem ordem daria 10."
    },
    "pitfalls": [
      "Considere as condições específicas de Probabilidade, contagem e interpretação de risco: não extrapole informações ausentes do enunciado.",
      "Considere as condições específicas de Probabilidade, contagem e interpretação de risco: não extrapole informações ausentes do enunciado."
    ],
    "review": [
      {
        "ask": "Qual denominador usar em P(A|B)?",
        "answer": "A quantidade ou probabilidade do universo B, desde que P(B)>0."
      },
      {
        "ask": "Quando o arranjo de 3 letras entre 5 dá 60?",
        "answer": "Quando há ordem e não há repetição: 5×4×3."
      }
    ],
    "extra": ""
  }
];
