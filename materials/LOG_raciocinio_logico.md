# Raciocínio lógico

9 aulas • conteúdo autoral • EstudaTI v0.3

> Material de treinamento. Consulte legislação e normas vigentes nas fontes oficiais.

---

## Proposições e implicação

**Objetivo:** Aplicar implicação e negação.

A proposição “P implica Q” só é falsa quando P é verdadeira e Q é falsa. A negação de “todos” é “existe pelo menos um que não”. Treine tabelas-verdade e quantificadores com exemplos curtos.

**Treino:** Quando a implicação P→Q é falsa?

- A. P falsa, Q falsa
- B. P verdadeira, Q falsa
- C. P falsa, Q verdadeira
- D. P verdadeira, Q verdadeira

**Gabarito comentado:** B — Implicação falha apenas se a premissa é verdadeira e a conclusão é falsa.

**Treino:** Qual é a negação de “Todos os servidores usam VPN”?

- A. Nenhum usa VPN
- B. Algum servidor não usa VPN
- C. Todos usam MFA
- D. Alguns usam VPN

**Gabarito comentado:** B — A negação de universal afirmativa é a existência de contraexemplo.

---

## Tabelas-verdade e conectivos

**Objetivo:** Explicar e aplicar: Tabelas-verdade e conectivos.

### Conceito e teoria
A conjunção P∧Q é verdadeira somente quando ambas são verdadeiras. A disjunção inclusiva P∨Q é falsa apenas se ambas forem falsas. Negação inverte valor de verdade; bicondicional P↔Q é verdadeiro quando valores coincidem.

### Exemplo
Se P é verdadeiro e Q é falso, então P∧Q é falso, P∨Q é verdadeiro e P↔Q é falso.

### Armadilha de prova
Ou lógico comum em concursos é inclusivo, salvo indicação contrária.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Se P é verdadeiro e Q é falso, qual valor de P∨Q?

- A. Verdadeiro
- B. Falso
- C. Indeterminado necessariamente
- D. Não é proposição

**Gabarito comentado:** A — Disjunção inclusiva é verdadeira se pelo menos um operando é verdadeiro.

**Treino:** Quando P↔Q é verdadeiro?

- A. Somente quando P é falso e Q verdadeiro
- B. Sempre que P é verdadeiro
- C. Somente quando P verdadeiro e Q falso
- D. Quando P e Q têm o mesmo valor lógico

**Gabarito comentado:** D — Bicondicional é verdadeiro para valores iguais.

---

## Implicação e contrapositiva

**Objetivo:** Explicar e aplicar: Implicação e contrapositiva.

### Conceito e teoria
Implicação P→Q é falsa apenas quando P é verdadeira e Q falsa. Sua contrapositiva ¬Q→¬P é logicamente equivalente; a recíproca Q→P não é equivalente em geral.

### Exemplo
Se "se é administrador, possui permissão" então a contrapositiva diz "se não possui permissão, não é administrador" (na hipótese lógica).

### Armadilha de prova
Não troque contrapositiva por inversa/recíproca.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é a contrapositiva de P→Q?

- A. ¬Q→¬P
- B. Q→P
- C. ¬P→¬Q
- D. P↔Q

**Gabarito comentado:** A — Contrapositiva nega e inverte termos.

**Treino:** Qual atribuição torna P→Q falsa?

- A. P falsa e Q falsa
- B. P falsa e Q verdadeira
- C. P verdadeira e Q verdadeira
- D. P verdadeira e Q falsa

**Gabarito comentado:** D — Implicação falha quando antecedente ocorre e consequente não.

---

## Quantificadores e negação

**Objetivo:** Explicar e aplicar: Quantificadores e negação.

### Conceito e teoria
Negar "todos possuem certificado" produz "existe ao menos um que não possui certificado". Negar "existe um que passou" produz "ninguém passou". Troca-se ∀ por ∃, invertendo o predicado.

### Exemplo
¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x).

### Armadilha de prova
Não confunda "nem todos" com "nenhum".

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Negação de "Todos os técnicos conhecem Linux":

- A. Algum técnico conhece Linux
- B. Algum técnico não conhece Linux
- C. Nenhum técnico conhece Linux
- D. Todos conhecem Windows

**Gabarito comentado:** B — Negação de universal afirma um contraexemplo.

**Treino:** Negação de "Existe servidor indisponível":

- A. Existe um servidor disponível
- B. Nenhum servidor existe
- C. Alguns servidores estão disponíveis
- D. Todos os servidores estão disponíveis

**Gabarito comentado:** D — Negar ∃ indisponível resulta ∀ disponível.

---

## Probabilidade simples e complementar

**Objetivo:** Explicar e aplicar: Probabilidade simples e complementar.

### Conceito e teoria
Em espaço equiprovável, P(evento) = casos favoráveis/total. Complementar tem P(Aᶜ)=1−P(A). Independência implica P(A∩B)=P(A)P(B); não confundir com exclusividade.

### Exemplo
Ao lançar dado justo, probabilidade de não sair 6 é 5/6; probabilidade de sair 6 é 1/6.

### Armadilha de prova
Eventos mutuamente exclusivos com probabilidade positiva não são independentes.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual a probabilidade de NÃO sair 6 ao lançar dado honesto?

- A. 1/3
- B. 5/6
- C. 1/6
- D. 1/2

**Gabarito comentado:** B — Há cinco faces diferentes de 6 em seis igualmente prováveis.

**Treino:** Se eventos A e B são independentes, P(A∩B) é:

- A. P(A)+P(B)
- B. 1−P(A)
- C. Sempre zero
- D. P(A)×P(B)

**Gabarito comentado:** D — Para eventos independentes, multiplica-se as probabilidades.

---

## Combinação e permutação

**Objetivo:** Explicar e aplicar: Combinação e permutação.

### Conceito e teoria
Permutação de n itens distintos tem n! arranjos. Combinação C(n,k)=n!/(k!(n−k)!) escolhe grupos sem considerar ordem; arranjo considera ordem de seleção.

### Exemplo
Escolher dois analistas dentre cinco para uma comissão sem cargos distintos permite C(5,2)=10 grupos.

### Armadilha de prova
Quando a ordem importa, uma combinação simples costuma subcontar casos.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Quantos pares sem ordem podem ser escolhidos entre 5 pessoas?

- A. 20
- B. 5
- C. 25
- D. 10

**Gabarito comentado:** D — C(5,2)=5!/(2!3!)=10.

**Treino:** Quantas ordenações distintas existem para 4 objetos distintos?

- A. 16
- B. 8
- C. 24
- D. 12

**Gabarito comentado:** C — Permutação de quatro é 4!=24.

---

## Conjuntos e inclusão-exclusão

**Objetivo:** Explicar e aplicar: Conjuntos e inclusão-exclusão.

### Conceito e teoria
Para conjuntos A e B finitos, |A∪B|=|A|+|B|−|A∩B|. Interseção reúne elementos comuns; diferença A−B contém elementos de A ausentes em B.

### Exemplo
Em grupo de 40 pessoas, 22 usam Linux, 18 Windows e 8 ambos; 32 usam pelo menos um (22+18−8).

### Armadilha de prova
Somar tamanhos sem descontar interseção duplica contagens.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Se |A|=22, |B|=18 e |A∩B|=8, quanto é |A∪B|?

- A. 30
- B. 32
- C. 48
- D. 40

**Gabarito comentado:** B — 22+18−8=32.

**Treino:** O conjunto A−B contém:

- A. Apenas elementos de B
- B. Elementos de A que não pertencem a B
- C. Todos os elementos de A e B
- D. Somente elementos comuns

**Gabarito comentado:** B — Diferença exclui elementos presentes em B.

---

## Progressões e sequências

**Objetivo:** Explicar e aplicar: Progressões e sequências.

### Conceito e teoria
PA apresenta diferença constante entre termos, com a_n=a_1+(n−1)r. PG apresenta razão constante, com a_n=a_1·q^(n−1). Sequências figurais exigem justificar regra, pois padrões finitos podem ser ambíguos.

### Exemplo
PA 3,7,11,15 tem r=4; quinto termo é 19. PG 2,6,18 tem q=3; quarto é 54.

### Armadilha de prova
Não assuma regra única sem considerar alternativas ou enunciado.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Qual é o 5º termo da PA 3,7,11,15,...?

- A. 23
- B. 19
- C. 17
- D. 21

**Gabarito comentado:** B — A razão é 4 e o quinto termo é 15+4=19.

**Treino:** Qual é o 4º termo da PG 2,6,18,...?

- A. 54
- B. 36
- C. 24
- D. 20

**Gabarito comentado:** A — A razão é 3 e próximo termo é 18×3=54.

---

## Regra de três e taxas

**Objetivo:** Explicar e aplicar: Regra de três e taxas.

### Conceito e teoria
Grandezas diretamente proporcionais variam na mesma razão; inversamente proporcionais variam em razão recíproca. Em problemas de trabalho, mantenha mesma produtividade e unidades coerentes; mudanças de produtividade requerem novo modelo.

### Exemplo
Quatro equipamentos iguais finalizam tarefa em seis horas; oito equipamentos iguais sob as mesmas condições podem terminar em três horas.

### Armadilha de prova
Não aplique proporcionalidade direta quando aumentar pessoas reduz tempo.

### Método de estudo
Leia o conceito. Feche o texto e tente explicá-lo em voz alta com exemplo próprio. Resolva duas questões inéditas e retorne a este tópico após 1, 3 e 7 dias se houver erros. Compare definições e situações práticas; não decore somente a letra do gabarito.

**Treino:** Se 4 máquinas idênticas fazem uma tarefa em 6 h, 8 máquinas fazem em:

- A. 12 h
- B. 6 h
- C. 2 h
- D. 3 h

**Gabarito comentado:** D — O dobro de máquinas reduz tempo pela metade sob condições iguais.

**Treino:** Se velocidade aumenta e distância é fixa, tempo de trajeto é geralmente:

- A. Diretamente proporcional à velocidade
- B. Independente da velocidade
- C. Sempre constante
- D. Inversamente proporcional à velocidade

**Gabarito comentado:** D — Tempo=distância/velocidade.
