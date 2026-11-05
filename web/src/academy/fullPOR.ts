import {buildChapters,type EditorialSeed} from './editorialBuilder'
export const fullPOR=buildChapters([
  {
    "id": 9,
    "title": "Concordância e pontuação: descubra a estrutura da frase primeiro",
    "goal": "Identificar sujeito, verbo, complemento e pausas justificadas antes de aplicar regras de concordância e vírgula.",
    "context": "A frase 'Os técnicos, resolveram o problema' parece natural quando alguém faz pausa ao falar, mas a vírgula está separando **sujeito** e **verbo** sem justificativa. Antes de decorar regras, entenda a estrutura: **sujeito** é o termo sobre o qual se declara algo; **predicado** é aquilo que se diz dele, incluindo o verbo. Em 'Os técnicos resolveram o problema', 'os técnicos' é sujeito, 'resolveram' é verbo e 'o problema' é complemento. Reconhecer esses papéis ajuda a tomar duas decisões: como flexionar o verbo e onde há motivo gramatical para pontuar.",
    "explanation": "Na **concordância verbal**, em estrutura usual, o verbo acompanha o núcleo do sujeito em número e pessoa: 'O técnico chegou' versus 'Os técnicos chegaram'. O **núcleo** é a palavra central que determina a referência: em 'Os documentos da equipe chegaram', o núcleo do sujeito é 'documentos', não 'equipe'. A vírgula pode isolar **vocativo** ('Equipe, confiram!'), que é chamamento, ou **aposto explicativo** ('Maria, coordenadora do setor, respondeu'). Ela não é marca obrigatória de toda pausa. Uma **oração** é uma estrutura organizada em torno de verbo ou locução verbal, e sua posição pode justificar pontuação.\n\n**Localize a estrutura antes de decorar a vírgula.** Em 'Os técnicos da clínica realizaram os exames', o núcleo do sujeito é 'técnicos', plural; por isso o verbo 'realizaram' concorda com ele, e não com o termo próximo 'clínica'. Em 'Faz dois anos', o verbo fazer indicando tempo decorrido é impessoal, portanto fica no singular. A vírgula pode isolar adjunto adverbial deslocado, aposto e oração explicativa, mas em geral não separa sujeito do seu verbo nem verbo do complemento. Compare 'Os médicos que chegaram cedo atenderam' (oração restritiva, seleciona um grupo) e 'Os médicos, que chegaram cedo, atenderam' (explicativa, informação adicional sobre os médicos referidos). Pontuação altera o sentido, não é marca de pausa respiratória.",
    "connection": "Concordância e pontuação se encontram na **interpretação**. Compare 'Os servidores que falharam foram substituídos' e 'Os servidores, que falharam, foram substituídos': sem vírgulas, a oração relativa costuma restringir o grupo; com vírgulas, tende a apresentar explicação sobre o referente. A palavra 'que' introduz uma oração que caracteriza 'servidores'. Assim, alterar pontuação pode mudar o que a frase afirma, mesmo com as mesmas palavras.",
    "exam": "Em reescrita, comece localizando verbo e sujeito, não ouvindo a frase mentalmente. Se o núcleo está no plural, verifique flexão do verbo. Se há vírgula entre sujeito e predicado, procure expressão intercalada que a justifique. As bancas também exploram os verbos **haver** no sentido de existir e **fazer** indicando tempo decorrido: são impessoais nesses usos e permanecem no singular ('havia arquivos'; 'faz dois anos'). Não generalize a regra para haver auxiliar em 'eles haviam saído'.",
    "caseTitle": "Corrija: 'Os chamados do setor, foi encerrado ontem'",
    "caseSteps": [
      "Encontre o sujeito: 'Os chamados do setor'. Seu núcleo é 'chamados', no plural.",
      "O verbo está no singular 'foi', mas deve concordar com o núcleo plural: 'foram'.",
      "O predicativo participial também acompanha o sujeito: 'encerrados'. A vírgula separa sujeito do verbo e deve sair.",
      "Resultado: 'Os chamados do setor foram encerrados ontem.' A correção decorre da estrutura, não de uma pausa."
    ],
    "pitfalls": [
      "O núcleo do sujeito pode estar longe do verbo; não concorde automaticamente com o substantivo mais próximo.",
      "Vírgula não separa sujeito de verbo na estrutura direta sem intercalação justificadora.",
      "Vocativo é chamamento e pode ser isolado; não é automaticamente sujeito da oração.",
      "Haver existencial e fazer temporal são impessoais nos respectivos usos."
    ],
    "cards": [
      [
        "Como encontrar o núcleo do sujeito?",
        "Identifique a palavra central que determina a pessoa e o número sobre os quais se faz a declaração."
      ],
      [
        "Por que a vírgula em 'Os técnicos, chegaram' é inadequada?",
        "Porque separa sujeito e verbo sem uma intercalação que justifique essa pontuação."
      ],
      [
        "Qual a concordância correta em 'havia problemas'?",
        "Haver com sentido de existir é impessoal e permanece no singular mesmo com complemento plural."
      ],
      [
        "Qual papel da vírgula em 'Equipe, respondam'?",
        "Isolar o vocativo 'Equipe', chamamento dirigido aos interlocutores."
      ]
    ]
  },
  {
    "id": 43,
    "title": "Inferência e pressupostos: saiba o que o texto permite concluir",
    "goal": "Diferenciar afirmação explícita, inferência legítima, pressuposição e extrapolação usando evidências do próprio texto.",
    "context": "O texto diz 'A equipe voltou a atender presencialmente'. Você pode concluir que **havia deixado de atender presencialmente**? Em contexto normal, o verbo 'voltar' sugere uma situação anterior diferente; essa informação é uma **pressuposição**. Já afirmar que 'todos os atendimentos haviam sido virtuais' seria ir além do que está escrito. O desafio da interpretação não é repetir palavras do texto, mas identificar quais conclusões estão **sustentadas** e quais foram inventadas pelo leitor.",
    "explanation": "**Informação explícita** é o que o autor diz diretamente. **Inferência** é conclusão obtida a partir de relações presentes no texto, sem acrescentar fatos arbitrários. **Pressuposto** é informação que certas palavras ou construções fazem o enunciado tomar como já estabelecida. Verbos como 'continuar', 'deixar de' e 'voltar a' são pistas frequentes: 'deixou de atrasar' pressupõe atrasos anteriores. **Subentendido** pode depender mais da situação comunicativa e da intenção, sendo menos rigidamente marcado pela forma do texto.\n\n**Inferir não é inventar.** Informação explícita está declarada; inferência é conclusão sustentada por pistas do texto; pressuposto é informação tomada como prévia por determinadas expressões. 'Marina voltou a estudar' tende a pressupor que estudava antes; não autoriza concluir quantos anos ficou sem estudar. 'Alguns servidores participaram' não significa 'todos', nem necessariamente 'somente alguns'. Diferencie tese (posição central defendida), argumento (razão apresentada) e exemplo (ilustração). Se a banca usa 'necessariamente', procure contraexemplo: basta uma situação coerente com o texto em que a conclusão seja falsa para invalidar aquela necessidade. Conhecimento externo não pode substituir evidência textual quando a questão exige interpretação estrita.",
    "connection": "Conectivos também criam relações: **porque** pode indicar causa; **mas** sinaliza contraste; **portanto** apresenta conclusão; **embora** introduz concessão. A expressão **'alguns servidores'** não autoriza transformar em **'todos os servidores'**. Quando uma alternativa muda palavras como 'pode' para 'sempre', normalmente amplia a força da afirmação. Essa atenção ao alcance é semelhante ao cuidado com quantificadores estudados em lógica, mas aqui analisamos usos da língua no contexto.",
    "exam": "A banca pode propor como inferência uma opinião plausível, mas sem apoio textual. Para cada alternativa, pergunte: **qual trecho a sustenta?** Se a resposta exigir informação externa que o enunciado não oferece, pode haver extrapolação. Se a questão pergunta por pressuposto, procure termos cuja escolha pressupõe situação prévia. Não confunda interpretação livre com autorização para responder de acordo com suas crenças.",
    "caseTitle": "O que se pressupõe em 'Joana deixou de faltar às reuniões'?",
    "caseSteps": [
      "Identifique o verbo 'deixou de', que indica interrupção de uma prática.",
      "A frase afirma que Joana não mantém a prática de faltar às reuniões naquele contexto.",
      "Pressupõe que antes havia faltas; não informa necessariamente quantas nem por quais motivos.",
      "Rejeite a alternativa 'Joana faltava toda semana', porque o texto não indica frequência exata."
    ],
    "pitfalls": [
      "Inferência precisa de apoio no texto, não apenas ser possível no mundo real.",
      "Pressuposto pode ser ativado por verbo ou construção, como 'voltou a'.",
      "'Alguns' não permite concluir 'todos'.",
      "O enunciado pode não informar frequência, causa ou motivo mesmo quando sugere evento anterior."
    ],
    "cards": [
      [
        "O que diferencia inferência legítima de extrapolação?",
        "Inferência segue relações sustentadas pelo texto; extrapolação adiciona fato sem evidência suficiente."
      ],
      [
        "O que pressupõe 'voltou a trabalhar'?",
        "Que havia uma situação anterior em que o trabalho foi interrompido ou não estava ocorrendo naquele modo."
      ],
      [
        "Qual pista de pressuposição existe em 'deixou de'?",
        "A ideia de interrupção de ação ou estado que ocorria anteriormente."
      ],
      [
        "Por que não se troca 'alguns' por 'todos'?",
        "Porque 'todos' amplia o alcance da afirmação além do grupo necessariamente indicado por 'alguns'."
      ]
    ]
  },
  {
    "id": 45,
    "title": "Crase e regência: por que dois 'a' podem aparecer juntos?",
    "goal": "Compreender preposição, artigo e exigência do termo regente antes de memorizar quando usar à.",
    "context": "Na frase 'Fui à clínica', muitas pessoas aprendem apenas que 'lugar feminino leva crase'. A regra real envolve **duas peças**: a preposição `a` exigida pela construção e o artigo feminino `a` que acompanha o termo seguinte. **Crase** é a fusão dessas duas ocorrências, sinalizada pelo acento grave em `à`. Para entender, precisamos aprender o que é **regência**: relação em que uma palavra pede certo complemento, muitas vezes com preposição. O verbo 'ir', no exemplo, admite construção com preposição de destino; o nome 'clínica' admite artigo feminino.",
    "explanation": "Compare 'Vou **a** Brasília' e 'Vou **à** clínica'. Na primeira, o nome próprio, no uso escolhido, não recebe artigo feminino; na segunda, a combinação de preposição com artigo produz `à`. Um teste útil em muitos casos é trocar o nome feminino por masculino: 'Vou **ao** laboratório'. Se surge 'ao' (a+o), provavelmente havia preposição a e artigo no correspondente feminino, que resulta em à. Mas o teste não substitui estudar regência e o uso de artigo em nomes específicos.\n\n**Por que há crase?** O acento grave indica, em muitos casos, a fusão de preposição a com artigo feminino a/as. Em 'Vou à clínica', o verbo ir pede preposição a e 'clínica' admite artigo a: a+a=à. Teste trocando por masculino: 'vou ao hospital' sugere a fusão correspondente. Em 'Entreguei o exame a Maria', pode haver variação conforme o uso de artigo com nome próprio e contexto; não aplique regra cega. Antes de verbos, como 'começou a estudar', em geral não existe artigo feminino e não há crase. Locuções femininas como 'à noite' e 'às vezes' costumam receber acento, conforme regras de uso. Não confunda crase (fenômeno) com acento grave (sinal).",
    "connection": "A crase também ocorre em certas locuções femininas, como 'à tarde' e 'às vezes', conforme a construção, e diante de alguns demonstrativos iniciados por a quando há a preposição exigida. Não se usa crase **antes de verbo** ('começou a trabalhar'), pois verbo não recebe artigo feminino `a` como nome. Além disso, há situações facultativas e restrições de contexto. O segredo é separar **o termo que exige a preposição** daquele que **admite o artigo**.",
    "exam": "Quando a questão pergunta se o acento pode ser retirado sem mudar correção, identifique se existe preposição exigida e artigo. Em 'Entreguei o relatório à diretora', a preposição indica destinatário e 'diretora' pode vir com artigo. Em 'Entreguei o relatório a ela', o pronome pessoal 'ela' não admite o artigo feminino nessa construção; não se usa crase. Evite o macete único 'palavra feminina = crase', porque muitas frases femininas não têm a preposição necessária.",
    "caseTitle": "Complete: 'Enviei o documento ___ coordenadora'",
    "caseSteps": [
      "O verbo 'enviar' admite destinatário introduzido pela preposição 'a': enviar documento a alguém.",
      "O substantivo feminino 'coordenadora' está usado com artigo 'a' na construção proposta.",
      "As duas ocorrências se fundem: 'à coordenadora'.",
      "Compare 'enviei o documento ao coordenador' para visualizar a combinação de preposição e artigo masculino."
    ],
    "pitfalls": [
      "Crase não é qualquer acento em palavra feminina; exige combinação apropriada.",
      "Antes de verbo infinitivo como 'trabalhar' não se usa crase nessa construção.",
      "Pronome 'ela' não recebe artigo feminino em 'entregar a ela'.",
      "O teste do masculino auxilia, mas não substitui a análise de regência e artigo."
    ],
    "cards": [
      [
        "O que é crase em 'à clínica'?",
        "Fusão da preposição a com o artigo feminino a, indicada por acento grave."
      ],
      [
        "O que significa regência?",
        "Relação entre termo regente e complemento, incluindo a preposição que pode ser exigida."
      ],
      [
        "Por que 'começou a trabalhar' não tem crase?",
        "Porque 'trabalhar' é verbo e não recebe artigo feminino a nessa estrutura."
      ],
      [
        "Como o teste de 'ao' ajuda na crase?",
        "A substituição por masculino pode evidenciar preposição a mais artigo, que no feminino formariam à."
      ]
    ]
  },
  {
    "id": 47,
    "title": "Coesão: como pronomes e conectivos ligam partes do texto",
    "goal": "Identificar referência, retomada, conectivos e elipses como mecanismos que mantêm continuidade textual.",
    "context": "Leia: 'O equipamento foi instalado. **Ele** apresentou falha.' A palavra 'ele' substitui a repetição de 'equipamento'. Essa ligação é um exemplo de **coesão textual**: recursos linguísticos que conectam frases e partes do texto. Sem eles, um relatório poderia repetir a mesma expressão muitas vezes ou deixar obscuro quem realizou cada ação. **Coerência**, por sua vez, é a organização do sentido: uma frase pode ter pronomes corretamente ligados, mas apresentar ideias contraditórias.",
    "explanation": "Um pronome pode fazer **referência anafórica**, quando retoma termo anterior: 'Ana saiu. Ela retornou'. Pode ocorrer também antecipação, chamada **catáfora**, como em 'Só isto me preocupa: a perda dos dados', em que 'isto' aponta para informação adiante. **Conectivos** explicam relações: 'porque' pode trazer justificativa, 'portanto' conclusão, 'mas' contraste. A **elipse** omite termo recuperável pelo contexto, como 'Maria abriu o chamado; João, o relatório', em que o verbo pode ser recuperado pela estrutura.\n\n**Coesão liga elementos; coerência mantém sentido.** Coesão referencial ocorre quando pronome ou expressão retoma referente: 'A médica avaliou o exame. Ela assinou o laudo.' Coesão sequencial conecta relações: 'portanto' indica conclusão, 'porém' oposição, 'porque' causa/explicação conforme construção, 'embora' concessão. Trocar 'porque' por 'apesar de' pode inverter relação lógica mesmo que a frase continue gramatical. Um texto pode repetir palavras e ainda ser coerente, ou usar conectivos e ser contraditório. Leia a frase antes e depois da substituição, identifique o referente de cada pronome e teste se quantificadores, negações e tempo verbal foram preservados. 'Esse' e 'aquele' variam segundo referências espaciais, temporais e discursivas.",
    "connection": "Coesão não exige repetir literalmente cada substantivo. Pode usar sinônimos, pronomes e outras substituições, mas precisa preservar o referente. Compare 'A equipe informou ao médico que **ele** deveria aguardar': dependendo do contexto, 'ele' tende a apontar ao médico, mas estruturas diferentes podem gerar ambiguidade. A questão de prova pode explorar se uma substituição pronominal deixa o texto claro ou torna incerto quem age.",
    "exam": "Se a banca substituir 'portanto' por 'entretanto', a relação muda de conclusão para contraste. Se substituir nome por pronome, verifique gênero, número e referente. Se perguntar sobre **coesão** e oferecer opção sobre ausência de contradição lógica, talvez esteja descrevendo **coerência**. Uma reescrita pode manter o sentido global e alterar os mecanismos coesivos, desde que não introduza referência equivocada.",
    "caseTitle": "Reescreva sem repetir 'o servidor' três vezes",
    "caseSteps": [
      "Frase inicial: 'O servidor falhou. O servidor foi reiniciado. O servidor voltou a responder'.",
      "Substitua o segundo termo por pronome adequado: 'O servidor falhou. Ele foi reiniciado'.",
      "Para a terceira oração, use referência clara: 'Depois disso, voltou a responder'.",
      "Confirme que 'ele' e a forma verbal retomam o servidor, evitando introduzir outro sujeito possível."
    ],
    "pitfalls": [
      "Coesão é ligação linguística; coerência envolve consistência de sentido.",
      "Pronome precisa de referente identificável no contexto.",
      "Trocar portanto por entretanto altera conclusão para contraste.",
      "Elipse omite termo recuperável, não significa ausência arbitrária de informação."
    ],
    "cards": [
      [
        "O que é coesão textual?",
        "Conjunto de recursos linguísticos que estabelece ligações entre termos, frases e partes do texto."
      ],
      [
        "O que faz uma referência anafórica?",
        "Retoma termo ou informação anteriormente apresentados, como 'ele' retomando 'servidor'."
      ],
      [
        "Qual diferença entre coesão e coerência?",
        "Coesão liga linguisticamente partes do texto; coerência envolve sentido consistente e relação lógica das ideias."
      ],
      [
        "Por que trocar 'portanto' por 'mas' pode prejudicar a reescrita?",
        "Porque altera a relação de conclusão para oposição ou contraste entre as ideias."
      ]
    ]
  },
  {
    "id": 48,
    "title": "Acentuação e ortografia: por que algumas sílabas recebem acento?",
    "goal": "Encontrar sílaba tônica e classificar palavras antes de aplicar as regras de acentuação do português.",
    "context": "Ao escrever um relatório, surgem dúvidas como 'análise' e 'analise', 'público' e 'publico'. As letras são quase iguais, mas a pronúncia e a função podem mudar. Toda palavra com mais de uma sílaba possui uma **sílaba tônica**, aquela pronunciada com maior destaque. **Acentuação gráfica** é a representação escrita de determinadas características de pronúncia segundo regras ortográficas; nem toda palavra tônica recebe acento escrito. O primeiro passo é identificar a sílaba forte, não memorizar listas sem compreensão.",
    "explanation": "Se a sílaba tônica é a última, a palavra é **oxítona**; se é a penúltima, **paroxítona**; se é a antepenúltima, **proparoxítona**. Exemplos: ca-**fé** é oxítona; **lá**-pis é paroxítona; **mé**-di-co é proparoxítona. Na ortografia padrão, **todas as proparoxítonas são acentuadas**. Oxítonas e paroxítonas seguem regras de terminações e encontros vocálicos; não basta dizer 'a sílaba forte deve ter acento'. Por exemplo, 'café' recebe acento, mas 'papel' não, apesar de ambas serem oxítonas.\n\n**Acentuação depende de tonicidade e terminação.** A sílaba tônica é pronunciada com maior destaque; oxítonas têm última sílaba tônica, paroxítonas penúltima e proparoxítonas antepenúltima. Todas as proparoxítonas são acentuadas: 'médico'. Oxítonas terminadas em a(s), e(s), o(s), em e ens seguem padrões clássicos, como 'café' e 'também'. Paroxítonas seguem outro conjunto, como 'fácil' e 'tórax'. 'Saúde' apresenta hiato com u tônico que recebe acento nas condições da regra; não confunda hiato com ditongo. O Acordo Ortográfico eliminou, por exemplo, o acento de 'ideia'. Identifique separação silábica e sílaba tônica antes de aplicar lista de terminações.",
    "connection": "A distinção entre **hiato** e **ditongo** também importa. Em hiato, vogais pertencem a sílabas separadas, como em sa-**ú**-de; ditongo reúne sons vocálicos numa mesma sílaba, conforme pronúncia. Algumas regras do Acordo Ortográfico mudaram acentos, como em **ideia** e **assembleia**, que não recebem mais o acento antes comum no português brasileiro padrão. O uso correto depende de classificar a palavra e verificar a regra aplicável, não da impressão visual.",
    "exam": "Bancas cobram pares como 'público' (proparoxítona) e 'publico' (verbo na 1ª pessoa do presente), nos quais o acento muda a leitura e o sentido. Também cobram se uma palavra é acentuada pela mesma regra de outra. Faça duas verificações: **qual é a sílaba tônica?** e **qual regra se aplica a essa classe ou encontro vocálico?** Se uma alternativa disser que todas as paroxítonas são acentuadas, rejeite.",
    "caseTitle": "Por que 'médico' tem acento e 'medico' pode existir?",
    "caseSteps": [
      "Separe 'médico' em mé-di-co e identifique a antepenúltima sílaba tônica.",
      "É proparoxítona, e a regra geral determina acento gráfico nessa classe.",
      "'Medico' pode ser forma verbal de 'medicar' com outra tonicidade: me-di-co.",
      "Conclua que acento pode diferenciar pronúncia e função, além de seguir uma regra ortográfica."
    ],
    "pitfalls": [
      "Nem toda sílaba tônica recebe acento gráfico.",
      "Todas as proparoxítonas são acentuadas no padrão ortográfico.",
      "Hiato e ditongo não são a mesma organização de sons vocálicos.",
      "Regras atuais não permitem acento antigo em 'ideia' no padrão brasileiro."
    ],
    "cards": [
      [
        "O que é sílaba tônica?",
        "A sílaba pronunciada com maior destaque numa palavra, base para classificar sua tonicidade."
      ],
      [
        "O que define proparoxítona?",
        "Palavra com sílaba tônica na antepenúltima posição; todas são acentuadas graficamente."
      ],
      [
        "Qual diferença entre hiato e ditongo?",
        "Hiato separa vogais em sílabas diferentes; ditongo reúne sons vocálicos na mesma sílaba."
      ],
      [
        "Por que 'médico' recebe acento?",
        "Porque é proparoxítona: a sílaba tônica 'mé' está na antepenúltima posição."
      ]
    ]
  },
  {
    "id": 50,
    "title": "Sintaxe: como encontrar sujeito, predicado e objetos",
    "goal": "Reconhecer funções sintáticas a partir da relação com o verbo, sem confundir ordem das palavras com função.",
    "context": "Leia 'O analista resolveu a falha'. Para entender a estrutura, precisamos reconhecer a **oração**, construção organizada em torno de verbo ou locução verbal. O **sujeito** é o termo sobre o qual se faz declaração, e o **predicado** contém aquilo que se declara, incluindo o verbo. Em nossa frase, 'o analista' é sujeito, 'resolveu a falha' é predicado. O verbo **resolver** expressa ação que recai sobre um complemento: 'a falha'. A função sintática não depende de a palavra ser comprida ou estar numa linha específica.",
    "explanation": "O **objeto direto** complementa determinados verbos sem preposição exigida pela regência: 'O técnico instalou **o programa**'. O **objeto indireto** costuma vir introduzido por preposição exigida pelo verbo: 'A equipe precisa **de acesso**'. Uma oração pode apresentar **predicativo**, termo que atribui característica a sujeito ou objeto, como 'O servidor ficou **indisponível**'. **Adjunto adverbial** expressa circunstâncias, como 'ontem', 'com cuidado' ou 'na recepção', e não é o núcleo obrigatório de todos os predicados.\n\n**Encontre os termos pelo verbo.** Em 'A equipe enviou o laudo ao médico', 'a equipe' é sujeito, 'enviou' verbo, 'o laudo' objeto direto (sem preposição exigida) e 'ao médico' objeto indireto (com preposição a exigida pelo verbo enviar nessa construção). Predicado é o que se declara sobre o sujeito e inclui o verbo e complementos. Adjunto adnominal caracteriza substantivo; adjunto adverbial indica circunstâncias como tempo, lugar e modo. Predicativo atribui característica ao sujeito ou objeto: 'O exame ficou pronto'. Não determine função sintática apenas pela ordem: 'Chegaram os pacientes' tem sujeito posposto. Verbos impessoais, como 'há' indicando existência, não possuem sujeito.",
    "connection": "Essas funções ajudam a entender **concordância** e **pontuação**. O núcleo do sujeito determina, em regra, a flexão do verbo; um objeto direto não se torna sujeito apenas por estar depois do verbo. Na voz passiva, a organização muda: 'A equipe revisou os documentos' vira 'Os documentos foram revisados pela equipe'. O antigo objeto direto passou a sujeito paciente da construção passiva. Reconhecer funções evita escolher a concordância pelo substantivo mais próximo.",
    "exam": "A banca pode perguntar se 'da equipe' em 'Os documentos da equipe chegaram' é núcleo do sujeito. Não: o núcleo é 'documentos', no plural. Outra pode trocar objeto direto por indireto sem preservar regência do verbo. Para classificar, localize o verbo, pergunte **quem/o quê** participa da declaração e depois descubra **qual termo completa o sentido verbal**. Não memorize 'primeiro nome é sujeito': a ordem pode ser invertida.",
    "caseTitle": "Classifique 'Os profissionais precisam de treinamento'",
    "caseSteps": [
      "Identifique o verbo 'precisam' e pergunte sobre quem se faz a declaração: 'os profissionais' é sujeito.",
      "O núcleo do sujeito 'profissionais' está no plural; por isso o verbo 'precisam' concorda com ele.",
      "A expressão 'de treinamento' completa o sentido de 'precisar' com preposição exigida.",
      "Conclua que 'de treinamento' exerce função de objeto indireto nessa construção, não de sujeito."
    ],
    "pitfalls": [
      "O sujeito não é necessariamente a primeira palavra nem o substantivo mais próximo do verbo.",
      "Objeto direto e indireto diferem pela relação de regência, não pelo tamanho do complemento.",
      "Adjunto adverbial informa circunstância, não necessariamente completa o sentido exigido pelo verbo.",
      "Na voz passiva, funções sintáticas podem mudar sem mudar o fato descrito."
    ],
    "cards": [
      [
        "O que caracteriza o sujeito na oração?",
        "O termo sobre o qual se faz a declaração, cuja estrutura costuma orientar concordância verbal."
      ],
      [
        "O que é objeto direto?",
        "Complemento de verbo transitivo direto, normalmente sem preposição exigida pela regência."
      ],
      [
        "O que é objeto indireto?",
        "Complemento de verbo que exige preposição na construção, como 'precisar de algo'."
      ],
      [
        "Por que 'documentos' manda em 'Os documentos da equipe chegaram'?",
        "Porque é o núcleo plural do sujeito; 'da equipe' caracteriza o substantivo, mas não substitui o núcleo."
      ]
    ]
  },
  {
    "id": 100,
    "title": "Leitura avançada: inferência, pressuposição e força da afirmação",
    "goal": "Analisar o que é afirmado, pressuposto ou apenas possível, especialmente em alternativas aparentemente semelhantes.",
    "context": "Uma banca apresenta um texto que diz 'O sistema reduziu **parte** dos atrasos' e uma alternativa que afirma 'O sistema **eliminou** os atrasos'. As frases tratam do mesmo assunto, mas possuem **alcance** diferente. Interpretação exige verificar como as palavras limitam a afirmação. Uma **inferência** é conclusão sustentada pelo texto; **pressuposição** é informação tomada como anterior ou já estabelecida por uma construção; **extrapolação** é ir além do suporte oferecido. Esses conceitos se parecem, mas respondem a perguntas distintas.",
    "explanation": "Em 'A equipe voltou a atender', o verbo 'voltou' pressupõe interrupção anterior da atividade naquele modo. Em 'A equipe pode atender amanhã', 'pode' expressa possibilidade ou permissão conforme contexto, e não garantia. Marcadores como **alguns, todos, apenas, talvez, necessariamente** definem a força da frase. Conectivos organizam relações: 'porque' pode indicar causa; 'embora' introduz concessão; 'portanto' marca conclusão. A inferência correta precisa respeitar essas relações e limitações.\n\n**Meça o grau de certeza da frase.** 'Todos os pacientes foram atendidos' é universal; 'alguns pacientes foram atendidos' é existencial em leitura lógica comum. A primeira implica a segunda se o conjunto não for vazio; a segunda não implica a primeira. 'O texto sugere' não é o mesmo que 'o texto comprova'. Pressuposição pode surgir de 'parou de', 'voltou a' e 'continua': 'Parou de chover' pressupõe chuva anterior em uso normal. Ironia e metáfora exigem contexto, mas não autorizam conclusão incompatível. Em questões de inferência, separe o que foi dito, o que a formulação pressupõe e o que você supõe por experiência. Busque uma frase alternativa coerente com o texto que negue a conclusão proposta.",
    "connection": "Esse raciocínio conversa com a **lógica proposicional**, mas a língua natural inclui contexto e sentidos implícitos que uma tabela-verdade isolada não descreve. Ao revisar alternativa, destaque a palavra que mudou e pergunte se ela tornou a afirmação mais forte, mais fraca ou diferente. Se a reescrita troca 'apesar de' por 'por isso', muda concessão para consequência, mesmo que os substantivos permaneçam.",
    "exam": "Questões de interpretação frequentemente apresentam quatro opções plausíveis; a correta deve ser **a mais sustentada pelo enunciado**, não a que representa sua opinião. Para negar 'todos os equipamentos estavam em funcionamento', basta um que não estivesse. Mas num texto que afirma 'a maioria funcionava', não podemos concluir 'todos' nem 'ninguém'. Evite respostas absolutas quando a fonte oferece apenas tendência ou possibilidade.",
    "caseTitle": "O relatório afirma 'alguns serviços melhoraram': o que pode ser concluído?",
    "caseSteps": [
      "A expressão 'alguns serviços' afirma melhora em parte do conjunto, sem especificar total.",
      "A alternativa 'todos os serviços melhoraram' amplia a afirmação; não está autorizada.",
      "A alternativa 'nenhum serviço melhorou' contradiz o que foi afirmado.",
      "A conclusão sustentada é que pelo menos uma parte dos serviços melhorou; não se deduz o resultado dos demais."
    ],
    "pitfalls": [
      "Possibilidade não é certeza; 'pode' e 'deve necessariamente' não são equivalentes.",
      "Pressuposição pode estar embutida em verbos como 'voltar a' e 'deixar de'.",
      "Uma conclusão plausível na vida real pode ser extrapolação textual.",
      "Trocar conectivos pode alterar a relação lógica da afirmação."
    ],
    "cards": [
      [
        "O que é inferência sustentada?",
        "Conclusão obtida pelas informações e relações do texto, sem acrescentar fatos não demonstrados."
      ],
      [
        "Por que 'voltou a' pode ativar pressuposição?",
        "Porque sugere que a atividade ou estado já ocorrera e havia sido interrompido ou alterado."
      ],
      [
        "O que muda ao trocar 'parte' por 'todos'?",
        "A força e o alcance da afirmação, que passa a abranger o conjunto inteiro sem suporte necessário."
      ],
      [
        "Como avaliar alternativa plausível, mas não textual?",
        "Procurar trecho que a sustente; se exige informação externa, pode ser extrapolação."
      ]
    ]
  },
  {
    "id": 101,
    "title": "Oficina gramatical: concordância, regência, crase e pontuação juntas",
    "goal": "Resolver reescritas verificando funções sintáticas, preposições exigidas e alteração do sentido.",
    "context": "Um texto administrativo pode conter vários problemas na mesma frase: 'Fazem dois anos que os documentos, foi enviado a diretoria'. Corrigir apenas um acento não resolve tudo. É necessário analisar **concordância**, relação entre sujeito e verbo; **regência**, preposições exigidas por termos; **crase**, fusão de preposição a com artigo feminino a; e **pontuação**, organização das relações sintáticas. O objetivo é entender **por que** cada ajuste acontece, para não depender de macetes desconexos.",
    "explanation": "Comece localizando os verbos. 'Fazer' indicando tempo decorrido é impessoal: **faz dois anos**. Em 'os documentos foram enviados', o núcleo do sujeito está no plural e o verbo com particípio acompanha a construção. Em 'enviados à diretoria', a regência permite preposição a para destino, combinada ao artigo a de 'diretoria', formando crase. Não se coloque vírgula entre 'os documentos' e 'foram enviados' se nada intercala justificadamente. Cada correção atende a uma regra que podemos explicar pela estrutura.\n\n**Uma mesma frase pode cobrar quatro regras.** Analise 'As equipes assistiram à apresentação, que começou às oito horas.' 'As equipes' pede verbo plural; 'assistiram' no sentido de presenciar pede preposição a na norma tradicional; 'a apresentação' admite artigo, produzindo 'à'; a oração 'que começou às oito horas' está entre vírgula e fim com valor explicativo nesse contexto; 'às oito horas' contém fusão de preposição com artigo plural em expressão de horário. Trocar 'assistiram' por 'viram' muda a regência, portanto a crase antes de 'apresentação' deixaria de ser motivada pelo mesmo verbo. Sempre identifique sujeito, verbo, complementos, referente de relativo e tipo de oração antes de corrigir.",
    "connection": "Na prova, não basta corrigir ortografia: é possível produzir frase gramatical e mudar o sentido. Compare 'Os servidores que falharam foram substituídos' e 'Os servidores, que falharam, foram substituídos'. As vírgulas podem transformar oração relativa restritiva em explicativa, alterando o conjunto referido. O mesmo ocorre com conectivos e pronomes. Revisão precisa preservar tanto **correção formal** quanto **informação pretendida**.",
    "exam": "Algumas alternativas alteram simultaneamente 'fizeram' por 'faz', 'a' por 'à' e a posição de vírgula. Avalie cada parte separadamente e só depois julgue a reescrita inteira. Se a construção é 'deve haver vagas', mantenha auxiliar singular por impessoalidade de haver existencial; 'devem existir vagas' também pode ser correto porque existir tem sujeito. Não escolha pela semelhança visual da frase.",
    "caseTitle": "Corrija um relatório com quatro problemas",
    "caseSteps": [
      "Texto: 'Fazem dois anos que os documentos, foi enviado a diretoria'. 'Fazem' indica tempo e deve ficar 'faz'.",
      "O núcleo do sujeito 'documentos' é plural: reescreva 'os documentos foram enviados'.",
      "Retire a vírgula indevida entre sujeito e verbo; analise preposição de destino mais artigo feminino em 'à diretoria'.",
      "Resultado: 'Faz dois anos que os documentos foram enviados à diretoria.' Cada ajuste tem fundamento diferente."
    ],
    "pitfalls": [
      "Fazer temporal e haver existencial são impessoais nos respectivos usos.",
      "Objeto ou complemento não determina concordância do verbo impessoal.",
      "Crase depende de preposição e artigo apropriados, não apenas gênero feminino.",
      "Pontuação pode mudar a interpretação mesmo em frase gramatical."
    ],
    "cards": [
      [
        "Por que 'faz dois anos' fica no singular?",
        "Porque 'fazer' indica tempo decorrido em uso impessoal, sem sujeito que determine plural."
      ],
      [
        "Quando 'haver' existencial fica no plural?",
        "Não fica; em uso de existir, permanece singular, inclusive em 'deve haver'."
      ],
      [
        "Por que 'à diretoria' pode ter crase?",
        "Porque a preposição a exigida na construção se funde com o artigo feminino a."
      ],
      [
        "Como a vírgula muda oração relativa?",
        "Pode marcar leitura explicativa em vez de restritiva, alterando o alcance do referente."
      ]
    ]
  },
  {
    "id": 102,
    "title": "Oficina de coesão e coerência: reescreva sem trocar a informação",
    "goal": "Verificar retomadas, ordem lógica, conectivos e clareza na reescrita de textos técnicos.",
    "context": "Um relatório diz 'O equipamento apresentou falha. O equipamento estava ligado ao nobreak. O equipamento voltou após reinício'. A repetição excessiva atrapalha a leitura, mas substituir todas as ocorrências por 'ele' também pode ficar ambíguo se houver vários equipamentos. **Coesão** consiste em mecanismos linguísticos que conectam partes do texto; **coerência** diz respeito ao sentido global consistente. Uma revisão profissional precisa melhorar a forma sem inventar resultados.",
    "explanation": "Para melhorar coesão, utilize pronomes com referente claro, substituições adequadas e conectivos que correspondam às relações reais. 'Portanto' marca conclusão; 'entretanto' marca oposição; 'porque' pode trazer justificativa. A **elipse** permite omitir termo recuperável sem deixar dúvida: 'A equipe verificou a rede e depois, os backups', quando a estrutura permite recuperar a ação. Use períodos de tamanho administrável; separar um período não autoriza mudar causa, ordem temporal ou grau de certeza.\n\n**Reescrever exige preservar relações, não só palavras.** 'Embora o sistema estivesse disponível, a equipe não conseguiu acessar os exames' expressa concessão; reescrita com 'apesar de' precisa manter oposição entre disponibilidade e falha de acesso. 'Porque' introduz causa ou explicação, 'portanto' indica conclusão. Se 'nenhum médico recusou' virar 'todos os médicos recusaram', a negação foi invertida. Pronomes podem gerar ambiguidade: 'João falou a Pedro que seu relatório estava pronto' não define sem contexto de quem é o relatório. Busque referente explícito. Coerência verifica compatibilidade de ideias; coesão verifica recursos linguísticos que as conectam. Uma frase gramaticalmente correta pode mudar o argumento original.",
    "connection": "O sentido exige atenção a **pressupostos** e **alcance**: 'alguns computadores' não equivale a 'todos'; 'pode ter falhado' não equivale a 'falhou'. Um relatório técnico pode registrar evidências e hipóteses, mas não tratar hipótese como conclusão confirmada. Se a frase diz 'após o reinício, o sistema voltou', não se pode concluir sem teste que 'o reinício resolveu definitivamente a causa'. Essa é uma consequência lógica não demonstrada.",
    "exam": "Em alternativas de reescrita, identifique relações de tempo, causa, concessão e conclusão. Uma alternativa pode trocar 'apesar de' por 'porque', mudando o sentido. Outra pode retirar vírgulas que limitavam o referente. Faça o teste: **os fatos continuam os mesmos, com o mesmo grau de certeza e alcance?** A resposta correta preserva esses elementos, mesmo usando palavras diferentes.",
    "caseTitle": "Melhore a frase sem inventar causa de falha",
    "caseSteps": [
      "Original: 'O servidor estava lento. Foi reiniciado. Depois funcionou'.",
      "Reescreva: 'O servidor apresentava lentidão e voltou a responder normalmente após o reinício'.",
      "Não acrescente 'o reinício eliminou a causa', pois o texto original não comprova resolução definitiva.",
      "Mantenha sequência temporal e resultado observado, diferenciando fato de hipótese."
    ],
    "pitfalls": [
      "Coesão linguística não garante coerência factual.",
      "Pronome sem referente claro pode gerar ambiguidade.",
      "Trocar 'pode' por 'sempre' transforma hipótese em certeza indevida.",
      "Relação temporal não comprova automaticamente relação de causa."
    ],
    "cards": [
      [
        "O que é coesão?",
        "Recursos de ligação linguística entre frases e partes de um texto."
      ],
      [
        "O que é coerência?",
        "Consistência do sentido e das relações entre as informações apresentadas."
      ],
      [
        "Por que evitar pronomes sem referente claro?",
        "Porque o leitor pode não saber a que pessoa ou objeto o pronome se refere."
      ],
      [
        "Como reescrever relatório sem afirmar causa não comprovada?",
        "Preservar fatos e sequência observada, marcando hipóteses como hipóteses e não como conclusões."
      ]
    ]
  },
  {
    "id": 129,
    "title": "Concordância avançada: sujeito composto e usos impessoais",
    "goal": "Explicar concordância com sujeito composto, inversão e verbos impessoais por estrutura, não proximidade.",
    "context": "Na frase 'Chegaram o diretor e os técnicos', algumas pessoas querem escrever 'chegou' porque a primeira palavra após o verbo está no singular. Mas o **sujeito composto** reúne mais de um núcleo: 'o diretor' e 'os técnicos'. Na ordem usual, o verbo tende ao plural. Em construções com sujeito posposto podem existir particularidades normativas e estilísticas; a banca costuma cobrar a **regra e as condições da exceção**. Antes de memorizar alternativas, localize todos os núcleos do sujeito e identifique se o verbo é pessoal ou impessoal naquele uso.",
    "explanation": "Em 'O coordenador e a recepcionista chegaram', o sujeito composto antecede o verbo e pede plural. Em 'Havia vários documentos', **haver** com sentido de existir é impessoal: não possui sujeito e fica singular. Em 'Faz cinco anos', **fazer** indicando tempo decorrido também é impessoal. Nas locuções, a impessoalidade do principal costuma determinar singular do auxiliar: 'Deve haver vagas', 'Pode fazer três meses'. Compare com 'Devem existir vagas', correto porque 'existir' é pessoal e concorda com o sujeito 'vagas'.\n\n**Concordância em estruturas menos óbvias.** Sujeito composto anterior ao verbo normalmente pede plural: 'O técnico e a médica chegaram'. Sujeito composto posposto admite variações em algumas construções normativas, exigindo análise da regra cobrada. Em 'Havia muitos exames', haver com sentido de existir é impessoal e permanece singular; 'Existiam muitos exames' concorda com sujeito plural. 'Faz três meses' permanece singular quando indica tempo decorrido. 'Mais de um candidato compareceu' costuma levar singular na construção padrão, com exceções contextuais. Expressões partitivas, coletivos e porcentagens podem permitir concordâncias específicas. Faça três perguntas: qual é o núcleo do sujeito, se o verbo é pessoal e que relação sintática governa a flexão.",
    "connection": "A estrutura importa mais que a palavra isolada. 'Os servidores **haviam** instalado o sistema' está correto porque **haver é auxiliar** de um tempo composto e concorda com sujeito plural. Não conclua que 'haver sempre singular' nem que 'complemento no plural manda no verbo'. Também há construções como 'mais de um funcionário compareceu', cuja concordância depende de regras específicas do quantificador, além de situações de reciprocidade. Use o enunciado para escolher a regra adequada.",
    "exam": "Uma banca pode apresentar 'haviam problemas', 'deve haver problemas', 'devem existir problemas' e 'fazem dois anos'. Examine o sentido: se haver = existir, singular; se existir tem sujeito plural, verbo plural; fazer tempo, singular. Em sujeito composto, descubra os núcleos mesmo que estejam distantes ou apareçam após o verbo. Não corrija apenas pelo ouvido; explique a estrutura.",
    "caseTitle": "Identifique duas concordâncias corretas em frases parecidas",
    "caseSteps": [
      "Frase A: 'Devem existir novas soluções'. O verbo existir tem sujeito plural 'novas soluções', então auxiliar plural é adequado.",
      "Frase B: 'Deve haver novas soluções'. Haver existencial é impessoal e mantém auxiliar no singular.",
      "Frase C: 'Os técnicos haviam encontrado soluções'. Haver auxiliar concorda com 'os técnicos'.",
      "Conclua que o sentido/função de haver determina a regra, não a palavra 'soluções' isoladamente."
    ],
    "pitfalls": [
      "Haver não é sempre impessoal: como auxiliar pode flexionar.",
      "Haver existencial não concorda com complemento plural.",
      "Fazer indicando tempo decorrido permanece singular.",
      "Sujeito composto pode estar após o verbo; a posição não apaga seus núcleos."
    ],
    "cards": [
      [
        "Como identificar sujeito composto?",
        "Localize mais de um núcleo exercendo conjuntamente a função de sujeito da oração."
      ],
      [
        "Por que 'deve haver vagas' está correto?",
        "Porque haver com sentido de existir é impessoal, e o auxiliar permanece no singular."
      ],
      [
        "Por que 'devem existir vagas' também está correto?",
        "Porque existir é pessoal e concorda com o sujeito plural vagas."
      ],
      [
        "'Os servidores haviam saído' é correto?",
        "Sim. Haver funciona como auxiliar e flexiona com o sujeito plural."
      ]
    ]
  },
  {
    "id": 130,
    "title": "Crase com regência: testes e exceções que fazem sentido",
    "goal": "Distinguir a preposição exigida do artigo admitido e decidir quando ocorre crase em frases administrativas.",
    "context": "Você escreve 'Entreguei o pedido à diretora' e hesita diante de 'Entreguei o pedido a ela'. Ambas as expressões designam destinatário, mas apenas uma tem crase. A diferença é sintática: a preposição `a` aparece por causa da construção verbal e se funde com um **artigo feminino a** quando este acompanha o termo seguinte. O pronome pessoal 'ela' não recebe artigo nessa construção; por isso não ocorre fusão. Sem compreender **regência** e **uso de artigo**, qualquer lista de 'palavras com crase' vira decoração frágil.",
    "explanation": "Pergunte primeiro **qual termo exige a preposição**: 'referir-se a', 'obedecer a', 'ir a' em determinadas construções. Depois pergunte se o termo seguinte **admite artigo feminino**: 'a diretora', 'a reunião'. Juntos, podem formar `à diretora` e `à reunião`. No plural, 'às'. Diante de infinitivo não há artigo: 'começou a estudar'. Em nomes de cidades, o uso de artigo varia; pode-se testar construções como 'voltei da...' para examinar presença de artigo em determinados contextos, mas nenhum macete dispensa a regência.\n\n**Resolva crase em duas decisões.** Primeiro pergunte se o termo anterior exige preposição a: 'referir-se a', 'dirigir-se a' e 'assistir a' no sentido de ver. Depois pergunte se o termo seguinte admite artigo feminino: 'a reunião', 'a direção'. Se ambos ocorrem, 'referiu-se à reunião'. Nomes geográficos variam: 'vou à Bahia' porque se usa 'a Bahia'; 'vou a Brasília' costuma não ter artigo nesse uso. Pronomes e nomes próprios podem trazer variações e exceções; 'aquela' e 'aquilo' admitem fusão em 'àquela' e 'àquilo' quando há preposição exigida. Expressões de tempo como 'às 14 horas' seguem construção própria. A simples presença de palavra feminina não obriga acento.",
    "connection": "Crase é um fenômeno de **fusão** sinalizado pelo acento grave, não apenas uma regra de 'a antes de feminino'. Compare 'Vou a Roma' (uso comum sem artigo) com 'Vou à escola' (preposição e artigo). Locuções como **à tarde**, **às vezes** e **à medida que** possuem tradições e regras próprias. A escolha pode afetar clareza de um parecer, especialmente quando há duas preposições possíveis ou quando se muda a regência ao reescrever uma frase.",
    "exam": "Em 'A equipe se referiu à norma', o verbo 'referir-se' pede a, e 'a norma' admite artigo: ocorre crase. Em 'A equipe começou a revisar', o infinitivo não recebe artigo. Se a banca perguntar se é obrigatório, proibido ou facultativo, analise as duas condições e as regras específicas aplicáveis. Evite afirmar 'antes de pronome nunca há crase': alguns demonstrativos iniciados por a admitem fusão quando a preposição é exigida.",
    "caseTitle": "Analise três frases de um memorando",
    "caseSteps": [
      "'O setor fez referência à atualização': o nome 'referência' liga-se a complemento com a; 'a atualização' admite artigo.",
      "'O setor começou a atualizar': há preposição diante de infinitivo, sem artigo feminino, logo sem crase.",
      "'O setor informou a ela': o pronome pessoal não recebe artigo feminino nessa construção, logo sem crase.",
      "Conclua que a resposta depende de regência e artigo, não de decorar lista pelo gênero."
    ],
    "pitfalls": [
      "Uma palavra feminina não garante a existência de crase.",
      "Infinitivos não recebem artigo feminino a nessa construção.",
      "Pronome pessoal ela não forma à em 'informar a ela'.",
      "Há demonstrativos e locuções com regras específicas; 'nunca antes de pronome' é generalização incorreta."
    ],
    "cards": [
      [
        "Quais duas peças se fundem na crase comum?",
        "Preposição a exigida pela regência e artigo feminino a que acompanha o termo seguinte."
      ],
      [
        "Por que 'à norma' pode ter crase após 'referir-se'?",
        "Porque referir-se exige a e norma pode receber artigo feminino a."
      ],
      [
        "Por que 'a estudar' não leva crase?",
        "Porque estudar é infinitivo e não recebe artigo feminino na construção."
      ],
      [
        "Como o teste de 'ao' auxilia?",
        "Substituir por termo masculino pode revelar a presença conjunta de preposição a e artigo que no feminino formariam à."
      ]
    ]
  },
  {
    "id": 131,
    "title": "Coesão, coerência e conectivos: relações que mudam o argumento",
    "goal": "Compreender contraste, causa, conclusão e condição e preservar referências em reescritas.",
    "context": "Compare 'A equipe revisou a rede, **portanto** o problema foi resolvido' com 'A equipe revisou a rede, **entretanto** o problema continuou'. Apenas uma palavra mudou, mas a relação entre os fatos é oposta. **Conectivo** é palavra ou expressão que estabelece relação entre orações ou trechos. **Coesão** reúne mecanismos linguísticos de ligação; **coerência** diz respeito a uma interpretação global consistente. A banca costuma trocar conectivos para criar alternativas gramaticalmente possíveis, mas semanticamente diferentes.",
    "explanation": "**Porque** pode indicar causa ou justificativa: 'O atendimento parou porque o servidor falhou'. **Portanto** indica conclusão: 'O servidor falhou; portanto, o atendimento foi interrompido'. **Embora** expressa concessão: 'Embora o servidor tivesse sido reiniciado, a falha persistiu'. **Se** introduz condição: 'Se a rede cair, usaremos o procedimento alternativo'. Essas relações se distinguem pelas perguntas: qual motivo? qual consequência? qual contraste com uma expectativa? em qual condição? O conectivo deve ser interpretado na frase, não classificado sem contexto.\n\n**Conectivos são operadores de sentido.** 'O sistema caiu; portanto, o atendimento foi interrompido' apresenta consequência; 'O sistema caiu; contudo, o atendimento continuou' apresenta contraste. 'Se houver energia, o servidor inicia' expressa condição suficiente na estrutura, não garante que energia seja a única condição real. Referentes dos pronomes precisam ser identificáveis, e a ordem das orações pode modificar foco e pressuposições. Coesão textual inclui substituição, elipse, repetição controlada e conectivos; coerência exige ausência de contradição relevante e relação lógica entre afirmações. Teste uma reescrita perguntando: a relação de causa, oposição, concessão, condição e quantidade permaneceu idêntica?",
    "connection": "Pronomes e elipses também conectam períodos: 'A recepcionista abriu o chamado. **Ela** descreveu a falha'. O pronome retoma uma pessoa já citada. Se aparecem várias pessoas femininas no texto, 'ela' pode ficar ambíguo; às vezes repetir o nome é melhor que economizar palavras. Coerência exige também evitar contradições: dizer 'o servidor estava completamente desligado e atendia normalmente, no mesmo instante e sentido' demanda explicação, ainda que a frase tenha conectivos corretos.",
    "exam": "Nas provas, diferencie conectivo por relação e veja se a reescrita conserva sentido. Substituir **embora** por **porque** pode transformar concessão em causa. Substituir **portanto** por **mas** muda conclusão para contraste. Uma alternativa que usa mesmo tema e palavras pode ser incorreta pelo relacionamento lógico. Analise a frase inteira e não a palavra isolada.",
    "caseTitle": "Qual conectivo mantém o sentido?",
    "caseSteps": [
      "Original: 'O sistema apresentou falha; por isso o atendimento foi suspenso'. Há relação de consequência.",
      "'O sistema apresentou falha; portanto o atendimento foi suspenso' preserva a conclusão nesse contexto.",
      "'O sistema apresentou falha; entretanto o atendimento foi suspenso' introduz contraste, alterando a relação original.",
      "Conclua que conectivos não são sinônimos genéricos e devem ser escolhidos pela função semântica."
    ],
    "pitfalls": [
      "Coesão correta não garante coerência dos fatos.",
      "Conectivo pode alterar causa, contraste e conclusão sem mudar substantivos.",
      "Pronome sem referente claro pode comprometer interpretação.",
      "Embora não é equivalente a porque: concessão e causa são relações diferentes."
    ],
    "cards": [
      [
        "Que relação costuma indicar 'portanto'?",
        "Conclusão ou consequência derivada da informação anterior, conforme construção."
      ],
      [
        "Que relação costuma indicar 'embora'?",
        "Concessão, apresentando fato que contrasta com a expectativa sem impedir o principal."
      ],
      [
        "Como pronomes contribuem à coesão?",
        "Retomam ou antecipam referentes para estabelecer ligação entre partes do texto."
      ],
      [
        "Por que substituição de conectivos pode ser errada?",
        "Porque pode alterar relação lógica entre fatos, mesmo mantendo palavras principais."
      ]
    ]
  },
  {
    "id": 132,
    "title": "Pontuação em orações: diferencie informação essencial e explicativa",
    "goal": "Reconhecer orações subordinadas, valores de vírgula e alterações de alcance na leitura de textos.",
    "context": "Considere 'Os estudantes que entregaram o documento fizeram a prova'. A oração 'que entregaram o documento' seleciona um grupo específico: não sabemos se todos entregaram. Agora leia 'Os estudantes, que entregaram o documento, fizeram a prova'. As vírgulas apresentam a oração como explicação sobre o conjunto de estudantes referido. **Oração subordinada adjetiva** caracteriza um nome, podendo ser **restritiva** ou **explicativa**. Essa diferença altera o sentido, não apenas o ritmo de leitura.",
    "explanation": "A oração **restritiva** costuma aparecer sem vírgulas, integrando a identificação do referente: 'Os servidores que estavam desligados foram reiniciados' indica o subconjunto. A **explicativa** costuma ser isolada: 'Os servidores, que estavam desligados, foram reiniciados' apresenta a condição como informação sobre os servidores já referidos. Outras orações podem vir antes da principal, como 'Se houver falha, suspenda a operação'; a vírgula separa a oração adverbial condicional anteposta da principal. **Vocativo** é chamamento ('Equipe, revisem'); **aposto** explica termo ('Ana, diretora do setor, falou').\n\n**Vírgula distingue oração restritiva de explicativa.** 'Os servidores que estavam desligados foram reiniciados' seleciona apenas os servidores desligados; 'Os servidores, que estavam desligados, foram reiniciados' pode apresentar a condição como informação acessória sobre todos os servidores referidos. Uma oração subordinada adjetiva restritiva, em regra, não fica isolada por vírgulas; a explicativa fica. Aposto explicativo também costuma ser isolado: 'Ana, coordenadora do setor, assinou'. Não separe sujeito e verbo: 'Os profissionais da recepção, chegaram' é inadequado nessa estrutura. A pontuação é sintática e semântica, não simplesmente pausa de leitura; orações deslocadas e intercalações exigem análise própria.",
    "connection": "Pontuação deve ser estudada com **sintaxe e significado**. Não é adequado separar sujeito e verbo na ordem direta sem intercalação: 'A equipe, concluiu' é erro. Em contrapartida, uma expressão explicativa intercalada pode justificar duas vírgulas. O uso de vírgula antes de 'e' depende da estrutura, sujeitos e efeito da coordenação; não existe regra de que é sempre proibida ou sempre obrigatória.",
    "exam": "Quando a questão perguntar se retirar vírgulas preserva sentido, observe a oração adjetiva: pode mudar grupo restrito para informação explicativa. Se pede corrigir pontuação de comunicado, identifique sujeito, verbo, vocativo e intercalação. Não faça por pausa intuitiva. Uma alternativa pode estar ortograficamente correta e alterar o conjunto de pessoas descrito pelo texto.",
    "caseTitle": "Compare duas frases sobre equipamentos",
    "caseSteps": [
      "'Os computadores que falharam foram trocados' restringe a troca aos computadores que falharam.",
      "'Os computadores, que falharam, foram trocados' apresenta a falha como informação explicativa sobre o conjunto referido.",
      "Não conclua que as duas frases dizem exatamente o mesmo sem analisar o contexto e o alcance.",
      "Em prova, escolha a versão que preserva quais computadores efetivamente foram atingidos."
    ],
    "pitfalls": [
      "Vírgula em relativa restritiva pode alterar sentido para explicativo.",
      "Vírgula não serve apenas para 'respirar' durante a leitura.",
      "Sujeito e verbo não são separados sem justificativa estrutural.",
      "Vocativo e aposto explicativo possuem funções distintas, mas ambos podem ser isolados por pontuação."
    ],
    "cards": [
      [
        "Qual a função de oração adjetiva restritiva?",
        "Delimitar o grupo ou referente caracterizado, normalmente sem isolamento por vírgulas."
      ],
      [
        "Qual a função de adjetiva explicativa?",
        "Acrescentar informação explicativa sobre referente já identificado, normalmente entre vírgulas."
      ],
      [
        "Por que vírgula em 'Os técnicos, chegaram' está errada?",
        "Porque separa sujeito e verbo sem uma construção intercalada que a justifique."
      ],
      [
        "Como pontuar 'Se houver falha suspenda a operação'?",
        "'Se houver falha, suspenda a operação', isolando a oração condicional anteposta."
      ]
    ]
  },
  {
    "id": 158,
    "title": "Oficina de reescrita: não transforme 'parte' em 'todos'",
    "goal": "Testar se alternativas preservam informação, grau de certeza e referência num enunciado técnico.",
    "context": "Bancas frequentemente pedem uma reescrita 'sem alteração de sentido'. A tarefa não é encontrar frase bonita: é verificar se a nova versão mantém **o mesmo conjunto de fatos**, **a mesma intensidade da afirmação** e **as mesmas relações**. 'Parte dos servidores foi atualizada' não autoriza 'Todos os servidores foram atualizados'. 'A falha pode estar no DNS' não é equivalente a 'A falha está no DNS'. **Quantificadores** como parte, alguns e todos limitam alcance; **marcadores de modalidade** como pode, talvez e necessariamente indicam certeza ou possibilidade.",
    "explanation": "Leia o original e sublinhe três elementos: quem/qual conjunto é descrito, o que foi afirmado e com que certeza. Depois examine cada mudança. Se a alternativa altera conectivo, verifique causa, contraste ou conclusão. Se troca pronome, localize referente. Se muda voz ativa para passiva, confira concordância e preservação do agente, quando relevante. **Reescrever corretamente** é preservar informação e manter gramática, não apenas usar sinônimos.\n\n**Quantificadores mudam o fato afirmado.** 'Alguns pacientes receberam o resultado' não autoriza substituir por 'todos'; 'nenhum paciente faltou' não equivale a 'alguns pacientes faltaram'. 'Somente os médicos autorizados assinam' expressa restrição; sem 'somente', a frase pode permitir outros assinantes. 'É possível que ocorra' não significa 'ocorrerá'. Ao reescrever, marque quantificadores (todos, algum, nenhum), negações, modalizadores (deve, pode), tempo verbal e conectivos. Depois construa um cenário que satisfaz o original e pergunte se a versão modificada continua verdadeira. Esse teste lógico detecta mudanças sutis mesmo quando a redação parece mais bonita.",
    "connection": "A lógica ajuda a perceber que uma universal não equivale a uma existencial. A semântica ajuda a notar que 'deixar de' pode pressupor hábito anterior; a pontuação pode mudar relativa restritiva em explicativa. Essas ferramentas atuam juntas. Uma questão pode exigir rejeitar alternativa porque preserva gramática, mas muda fato observado de 'após manutenção' para 'por causa da manutenção', transformando relação temporal em causal sem evidência.",
    "exam": "Em item que usa 'invariavelmente', 'somente', 'todos', 'nunca' ou 'necessariamente', compare com o texto. Essas palavras tornam afirmações mais fortes e frequentemente introduzem extrapolação. Não rejeite uma opção apenas por usar vocabulário diferente: o importante é equivalência de conteúdo. Se há informação explícita de que a alteração ocorreu às 10h, não podemos trocar por 'no início do expediente' sem contexto que prove equivalência.",
    "caseTitle": "Avalie duas reescritas de um mesmo relatório",
    "caseSteps": [
      "Texto: 'Alguns servidores foram atualizados após o incidente'.",
      "Opção A: 'Parte dos servidores recebeu atualização depois do incidente'. Preserva alcance e relação temporal, em leitura adequada.",
      "Opção B: 'Todos os servidores foram atualizados devido ao incidente'. Amplia o grupo e afirma causalidade que não foi explicitada.",
      "Conclua que a alternativa correta precisa manter tanto quantificador quanto natureza da relação temporal."
    ],
    "pitfalls": [
      "Reescrita gramatical não garante equivalência de sentido.",
      "'Após' indica sequência temporal, não prova causa por si.",
      "Alguns não autoriza todos.",
      "'Pode' não equivale a 'necessariamente'."
    ],
    "cards": [
      [
        "O que deve permanecer numa reescrita sem mudança de sentido?",
        "Os fatos, os referentes, o alcance e o grau de certeza, além das relações lógicas originais."
      ],
      [
        "Por que 'após o incidente' não equivale necessariamente a 'por causa do incidente'?",
        "Porque sequência temporal não prova relação causal."
      ],
      [
        "Por que trocar 'alguns' por 'todos' é arriscado?",
        "Porque amplia a afirmação para um conjunto maior do que a fonte exige."
      ],
      [
        "O que uma alternativa com 'sempre' pode estar fazendo?",
        "Transformando uma ocorrência limitada ou possível em universalidade sem suporte textual."
      ]
    ]
  },
  {
    "id": 159,
    "title": "Oficina de parecer: clareza e precisão sem inventar certeza",
    "goal": "Revisar relatórios técnicos por concordância, evidência, hipótese, sequência e registro das ações.",
    "context": "Um técnico escreve: 'Foi detectado problemas nos servidores e tudo foi resolvido'. A frase apresenta erro gramatical e uma conclusão técnica que talvez não esteja comprovada. **Parecer técnico** é documento que registra análise e orientações, com clareza sobre fatos, evidências e conclusões. É diferente de conversa informal: palavras como 'tudo', 'sempre' ou 'com certeza' podem ter consequências quando o texto será utilizado para tomada de decisão. A revisão precisa melhorar a língua e a precisão do diagnóstico.",
    "explanation": "Primeiro corrija concordância: 'Foram detectados problemas', se 'problemas' é sujeito paciente na construção passiva. Depois especifique escopo: quais sistemas, quando, qual sintoma e o que foi medido. Se um serviço voltou após reinício, escreva isso como **fato observado**, mas não afirme que a causa foi eliminada se não houve investigação. Separe **hipótese** ('possível falha de DNS') de **evidência** ('consulta ao nome falhou, mas IP funcionou') e de **conclusão** ('resolver DNS foi necessário para restabelecer o acesso no teste').\n\n**Parecer exige separar constatação de hipótese.** Escreva 'O sistema retornou HTTP 503 às 10h14 em três tentativas' quando esse dado foi observado; não conclua automaticamente 'o servidor estava desligado', pois o código pode vir de proxy e existem outras causas. Uma redação técnica clara organiza contexto, evidência, interpretação, limitações e providências. Evite pronomes ambíguos, siglas sem expansão inicial e frases de certeza absoluta sem teste. Preferir 'os registros disponíveis indicam' quando há limite de observação é mais preciso que 'com certeza'. Em concursos, avalie se a reescrita preserva causalidade, cronologia, atribuição de responsabilidade e intensidade da afirmação.",
    "connection": "Essa prática reúne Português e pensamento técnico: concordância e pontuação garantem correção; semântica preserva alcance; conectivos deixam claras relações de causa ou tempo; evidência limita a força da conclusão. Um registro útil também mostra ações e responsáveis. Ao escrever 'o firewall estava bloqueando', verifique se logs ou regras confirmam essa causa; caso contrário, prefira 'há indício de bloqueio' até realizar teste.",
    "exam": "Se a questão pergunta a melhor reescrita de um relatório, evite opções que resolvem apenas concordância mas mantêm ambiguidade. Uma formulação como 'após alteração, o serviço voltou a responder' pode ser apropriada; 'a alteração resolveu definitivamente todas as falhas' extrapola dados. Em documentos administrativos, clareza não é sinônimo de eliminar termos técnicos: é **explicar os termos necessários e delimitar o que foi confirmado**.",
    "caseTitle": "Transforme um registro ruim em relatório verificável",
    "caseSteps": [
      "Original: 'Foi detectado problemas na rede e o técnico ajeitou tudo'. Corrija a concordância: 'Foram detectados problemas'.",
      "Substitua 'na rede' por sintoma verificável, se conhecido: 'consultas ao DNS interno falharam entre 9h e 9h20'.",
      "Registre a ação e resultado: 'Após correção do resolvedor configurado, a resolução de nomes voltou a funcionar nos testes'.",
      "Não declare eliminação definitiva da causa sem investigação; registre pendências e monitoramento, se houver."
    ],
    "pitfalls": [
      "Concordância correta é necessária, mas insuficiente para precisão técnica.",
      "Hipótese não deve ser escrita como fato confirmado.",
      "Expressões absolutas podem exceder evidências disponíveis.",
      "A clareza melhora quando se registram sintoma, teste, ação e resultado."
    ],
    "cards": [
      [
        "Por que 'Foi detectado problemas' está inadequado na leitura passiva?",
        "Porque 'problemas' está no plural e exige 'Foram detectados problemas' na construção indicada."
      ],
      [
        "Qual a diferença entre hipótese e evidência?",
        "Hipótese é explicação possível; evidência é informação observada que pode sustentá-la ou enfraquecê-la."
      ],
      [
        "Por que evitar 'resolveu definitivamente' sem teste?",
        "Porque restabelecimento temporário do serviço não comprova eliminação da causa."
      ],
      [
        "O que torna um registro técnico útil?",
        "Escopo, horário, sintoma, testes, ações, resultados e pendências escritos de forma verificável."
      ]
    ]
  }
] satisfies EditorialSeed[])
