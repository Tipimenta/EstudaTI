"""Administração, matemática e estatística — currículo próprio por módulo."""
CURRICULUM = {
  "Administração Pública e Gestão": [
    [
      "Estratégia",
      "SWOT, missão, visão e valores",
      "Missão descreve razão de existência da organização; visão descreve futuro desejado; valores orientam decisões e cultura. SWOT distribui forças e fraquezas internas e oportunidades e ameaças externas, lembrando que classificação depende do objeto analisado.",
      "Faça diagnóstico com evidências: equipe capacitada pode ser força, ausência de recuperação pode ser fraqueza, demanda externa por serviço é oportunidade e mudanças regulatórias podem ser ameaça. Use matriz para decisões, não somente listar adjetivos.",
      "Se setor possui profissional de infraestrutura qualificado mas depende de um único link, há força de competências e fraqueza de continuidade. O investimento precisa considerar impacto e custo, não só a lista SWOT.",
      "Pegadinha: ameaça externa e fraqueza interna podem se relacionar, mas não são mesma categoria. Missão não é meta numérica de um semestre."
    ],
    [
      "Estratégia",
      "BSC, mapa estratégico e indicadores",
      "Balanced Scorecard organiza objetivos e indicadores em perspectivas que relacionam capacidades, processos, usuários/clientes e resultados, com adaptações no serviço público. Um mapa estratégico explicita hipóteses sobre relações entre objetivos.",
      "Não confunda indicador de esforço com impacto. Capacitar técnicos é iniciativa; concluir treinamentos é entrega; reduzir incidentes recorrentes é resultado a medir, considerando influência de outros fatores.",
      "Plano: capacitar recepção para uso de sistema; medir quantidade treinada, taxa de erros e espera média antes e depois. A realização de curso não prova automaticamente redução de filas.",
      "Pegadinha: perspectiva financeira não determina sozinha sucesso de serviço público; efetividade exige avaliar valor produzido para a população."
    ],
    [
      "Estratégia",
      "OKRs e metas mensuráveis",
      "Objective define resultado qualitativo desejado; Key Results apresentam evidências quantitativas verificáveis de avanço. KR não deve ser apenas lista de tarefas ou promessa vaga sem medida, prazo e linha de base.",
      "Exemplo: objetivo 'melhorar acesso aos resultados'; KR 'elevar entrega no prazo de 82% para 95% até dezembro'. Ação 'atualizar portal' pode contribuir, mas não é o próprio resultado.",
      "Se o portal foi atualizado e entrega no prazo permanece em 82%, a tarefa concluiu, mas o KR não foi atingido. Investigue gargalo real, e não marque objetivo como concluído.",
      "Pegadinha: indicador pode ficar verde por redução de volume atendido; compare denominadores e condições para evitar vitória estatística artificial."
    ],
    [
      "Processos",
      "BPMN: eventos, atividades e gateways",
      "BPMN representa processos por eventos, tarefas, gateways, fluxos e participantes; símbolos diferentes apontam comportamentos diferentes. Gateways exclusivos escolhem caminho segundo condição; paralelos podem abrir fluxos simultâneos.",
      "Mapeie início do pedido, conferência de dados, decisão sobre documentação, execução e encerramento. Distinga evento de mensagem, tarefa executada e gateway decisório. Quando desenhar fluxo paralelo, mostre necessidade de sincronização quando couber.",
      "Recepção recebe pedido, valida CPF e encaminha conforme tipo de exame. Se falta documento, gateway redireciona à complementação; se está completo, segue para agendamento. Um gateway não executa a validação por si.",
      "Pegadinha: fluxograma bonito sem métricas ou regras de exceção não garante conformidade. Automatizar uma etapa pode transferir o gargalo."
    ],
    [
      "Processos",
      "PDCA, melhoria contínua e não conformidade",
      "PDCA é ciclo Plan (planejar), Do (executar), Check (verificar) e Act (agir sobre os resultados), útil para aprendizagem sistemática. Não conformidade descreve desvio de requisito definido; ação corretiva busca tratar causa do desvio.",
      "Planeje meta e procedimento, execute em escala controlada, compare indicadores com base e, em seguida, padronize melhoria ou corrija causa. Registro da decisão e próxima verificação evita repetição do mesmo problema.",
      "Falhas de emissão de protocolo ocorrem em 15% dos pedidos. Após treinamento, caem a 5%; o Check verifica se redução ocorreu em amostra adequada e Act define revisão permanente do processo.",
      "Pegadinha: corrigir apenas a ocorrência (reimprimir um protocolo) não é necessariamente tratar causa raiz (falha de integração)."
    ],
    [
      "Gestão de pessoas",
      "Liderança, comunicação e gestão de conflitos",
      "Liderar envolve influenciar e orientar atuação da equipe conforme objetivos; gerir pessoas requer papéis, comunicação, feedback e tratamento de conflitos. Estilos de liderança não são fórmulas universais e precisam considerar contexto.",
      "Em conflito entre TI e recepção, descreva fatos observados, impacto, responsabilidade e critérios de priorização. Escuta e documentação evitam transformar erro de processo em acusação pessoal. Escolha canal e frequência de comunicação compatíveis.",
      "Se as duas equipes recebem mensagens contraditórias sobre contingência, o problema pode ser falta de procedimento e autoridade definida. Reunião com decisão registrada pode reduzir inconsistência.",
      "Pegadinha: comunicação descendente não substitui feedback ascendente. Motivação e satisfação não são automaticamente o mesmo que desempenho mensurável."
    ],
    [
      "Gestão de projetos",
      "EAP, caminho crítico, custos e riscos",
      "Estrutura Analítica do Projeto (EAP) decompõe escopo em entregáveis para planejamento e controle. Caminho crítico identifica sequência que determina duração mínima sob dependências e estimativas; atraso em atividade crítica pode afetar término.",
      "Antes de calcular prazo, defina atividades, duração e dependências. Uma instalação pode exigir cabos, energia e configuração concluídos; não some durações de atividades verdadeiramente paralelas como se fossem seriadas.",
      "Projeto: A=2 dias; B=3 após A; C=5 após A; D=2 após B e C. Caminho A→C→D=9 dias; A→B→D=7. C é ramo crítico, assumindo durações e sem restrições adicionais.",
      "Pegadinha: cronograma não elimina incerteza; caminho crítico pode mudar e folga depende de rede completa."
    ],
    [
      "Indicadores",
      "Gestão de riscos e matriz probabilidade-impacto",
      "Risco descreve evento incerto com efeito nos objetivos. Matriz qualitativa classifica probabilidade e impacto segundo critérios definidos; tratamento pode reduzir, evitar, compartilhar ou aceitar risco com responsabilidade clara.",
      "Descreva causa, evento, consequência, controles existentes e responsável. Uma classificação 'alto' sem escala ou evidências pode enganar. Acompanhe risco residual após tratamento e gatilhos de revisão.",
      "Servidor crítico sem backup isolado expõe a perda por ransomware. Adotar backup reduz risco, mas não elimina acesso indevido, falha de restauração ou indisponibilidade do provedor.",
      "Pegadinha: ameaça e vulnerabilidade são elementos da descrição do risco, não necessariamente a mesma coisa. Aceitar risco não é ignorá-lo."
    ]
  ],
  "Matemática Financeira": [
    [
      "Porcentagem",
      "Aumento, desconto e base percentual",
      "Percentual é razão referida a uma base de 100. Aumento de p% multiplica por 1+p/100, desconto multiplica por 1−p/100; a base muda a cada operação sucessiva.",
      "Para comparar taxas em datas diferentes, explicite numerador, denominador e período. Um crescimento de 10 pontos percentuais pode representar mudança relativa muito diferente de 10%.",
      "Valor de R$ 200 sobe 30% para R$ 260 e cai 30% para R$ 182: resultado 91% do original, não 100%. A composição usa 1,3×0,7=0,91.",
      "Pegadinha: em taxa de faltas, denominator é agendados; 'percentual das faltas em relação aos comparecimentos' usa outra base e não soma necessariamente 100%."
    ],
    [
      "Porcentagem",
      "Taxas nominais e efetivas",
      "Taxa nominal pode indicar taxa anual associada a capitalização em períodos menores; taxa efetiva descreve crescimento no intervalo conforme regra. Em juros compostos, taxa efetiva acumulada exige potenciação.",
      "Com 2% efetivos mensais, crescimento anual composto é (1,02)^12−1≈26,82%, não 24%. Se edital fornece taxa nominal anual com capitalização mensal, determine taxa por período segundo convenção.",
      "Investimento hipotético de R$ 1.000 a 2% ao mês por 12 meses gera aproximadamente R$ 1.268,24 antes de impostos e custos, dentro do modelo de juros compostos constante.",
      "Pegadinha: não converta taxa composta multiplicando por 12 sem verificar se enunciado quer taxa nominal ou efetiva."
    ],
    [
      "Juros",
      "Regime simples: montante e capital",
      "No regime simples, juros de cada período incidem sobre o capital original, produzindo J=C×i×n e M=C(1+i×n), desde que taxa e período usem unidade compatível.",
      "Se taxa é 2% ao mês, um prazo de 90 dias só pode virar três meses sob convenção explícita do problema; meses reais e ano comercial podem divergir.",
      "Capital R$ 800, taxa 1,5% mensal, prazo 4 meses: J=800×0,015×4=R$ 48; montante R$ 848. Cada mês acrescenta R$ 12, sem capitalização.",
      "Pegadinha: somar juros ao capital após cada período troca regime simples por composto. Identifique exatamente o que a questão solicita."
    ],
    [
      "Juros",
      "Regime composto: montante e prazo",
      "No regime composto, juros de período integram base do seguinte; fórmula M=C(1+i)^n. É progressão geométrica de razão 1+i, sob taxa fixa e períodos iguais.",
      "Calcule progressivamente ou use potência: para encontrar n em M/C=(1+i)^n, aplique logaritmos quando necessário, n=ln(M/C)/ln(1+i), com condições matemáticas aplicáveis.",
      "Capital R$ 1.000 a 10% por três períodos: primeiro R$ 1.100; segundo R$ 1.210; terceiro R$ 1.331. O juro do terceiro é R$ 121, não R$ 100.",
      "Pegadinha: juros compostos não descrevem rendimentos garantidos de ativos com preços variáveis, e taxa negativa ou n fracionário exige cuidado de hipótese."
    ],
    [
      "Desconto",
      "Valor presente, valor futuro e equivalência",
      "Valor futuro acumula capital; valor presente desconta fluxo futuro sob taxa e período. Em juros compostos, VP=VF/(1+i)^n; fluxos só podem ser comparados depois de alinhados ao mesmo instante.",
      "Se um valor deve ser pago em dois anos, converta taxa anual efetiva e traga para hoje. Não some valores de datas distintas sem considerar valor do dinheiro no tempo.",
      "Pagamento de R$ 1.210 em dois anos, a 10% por ano, vale R$ 1.000 em valor presente: 1210/1,1²=1000. Isso não é previsão de inflação ou garantia de investimento.",
      "Pegadinha: desconto simples racional e comercial usam expressões diferentes; identifique regime e tipo de desconto pedido."
    ],
    [
      "Anuidades",
      "Séries uniformes e prestações",
      "Séries uniformes possuem pagamentos iguais em intervalos regulares, com taxa por intervalo consistente. Valor presente de renda postecipada finita pode ser VP=P×[1−(1+i)^−n]/i quando i≠0.",
      "Uma série postecipada paga no fim de cada período; uma antecipada no início, alterando valor presente. Separe entrada, parcelas, prazo e taxas antes de calcular.",
      "Três pagamentos de R$ 110 no fim de cada ano a 10%: VP=110/1,1+110/1,1²+110/1,1³≈100+90,91+82,64=R$ 273,55.",
      "Pegadinha: prestações iguais não significam juros simples; em financiamento, verifique sistema de amortização e custos adicionais."
    ],
    [
      "Análise",
      "VPL e interpretação de investimentos",
      "Valor Presente Líquido soma fluxos futuros descontados e subtrai investimento inicial, sob taxa e hipóteses. VPL positivo indica atratividade segundo modelo e taxa adotada, não garantia de execução ou ausência de risco.",
      "Faça tabela com fluxo no tempo 0 como saída negativa, entradas/saídas nos anos seguintes e taxa coerente. Compare alternativas de mesmo escopo e riscos pertinentes.",
      "Investimento de R$ 1.000 rende R$ 600 ao fim de cada um dos dois anos; com taxa 10%, VPL=−1000+600/1,1+600/1,1²≈R$ 41,32.",
      "Pegadinha: payback simples ignora valor do dinheiro no tempo; duas alternativas com igual payback podem ter VPL diferente."
    ],
    [
      "Análise",
      "Inflação, taxa real e poder de compra",
      "Inflação reduz poder de compra do dinheiro quando preços sobem. Relação aproximada entre taxa nominal, inflação e taxa real usa (1+i_nominal)/(1+inflação)−1, que é mais precisa que subtração simples.",
      "Compare períodos e índices compatíveis. Um rendimento nominal positivo pode ter retorno real negativo quando preços crescem mais rapidamente. Considere tributação e custos para valor líquido efetivo.",
      "Aplicação hipotética rende 8% no ano, inflação é 5%. Taxa real=(1,08/1,05)−1≈2,86%, não exatamente 3%, desconsiderando impostos.",
      "Pegadinha: inflação medida por índice médio não representa necessariamente custo individual; taxa real não deve ser confundida com rentabilidade líquida após tributos."
    ]
  ],
  "Estatística e Análise de Dados": [
    [
      "Estatística descritiva",
      "Média, mediana e moda",
      "Média é soma sobre contagem, mediana é valor central após ordenação, moda é valor com maior frequência. Distribuição assimétrica com outliers pode elevar média sem deslocar muito mediana.",
      "Em conjunto com número par de observações, mediana é média dos dois valores centrais. Para dados em classes, procedimentos de estimativa variam; não aplique regra de lista simples indiscriminadamente.",
      "Tempos 8,10,10,12,60 minutos: média=20, mediana=10, moda=10. Dizer que 'o atendimento médio foi 20' não significa que um usuário típico esperou 20.",
      "Pegadinha: usar média das médias sem ponderar tamanho dos grupos produz erro quando quantidades diferem."
    ],
    [
      "Estatística descritiva",
      "Quartis, percentis e distribuição",
      "Percentis dividem dados ordenados em posições relativas; mediana é percentil 50 em certas definições. Quartis identificam partes da distribuição e a amplitude interquartil Q3−Q1 é útil para dispersão.",
      "Existem convenções diferentes de cálculo/interpolação para percentis; veja método exigido. Um percentil não é porcentagem direta de valor, mas posição em distribuição.",
      "Se tempo p90 de resposta é 450 ms, cerca de 90% das observações consideradas ficam no limite ou abaixo, conforme definição e cálculo. Não significa que tempo médio é 450 ms.",
      "Pegadinha: p95 não garante que todas as requisições atendam limite; restante da distribuição pode conter cauda longa."
    ],
    [
      "Estatística descritiva",
      "Variância e desvio padrão",
      "Variância mede dispersão quadrática em relação à média; desvio padrão é raiz e usa unidade original. Fórmula populacional divide por n; estimativa amostral usual divide por n−1.",
      "Calcule média, desvios, quadrados e soma. Se a série representa amostra e a questão pede variância amostral, não confunda denominador. Dados categóricos não devem receber média numérica sem codificação válida.",
      "Dados 2,4,6 têm média 4, quadrados dos desvios 4,0,4: variância populacional=8/3≈2,67, desvio≈1,63; variância amostral=4, desvio=2.",
      "Pegadinha: desvio padrão zero significa observações iguais sob método, não ausência geral de risco no processo."
    ],
    [
      "Probabilidade",
      "Probabilidade condicional e Bayes",
      "Probabilidade condicional restringe universo ao evento conhecido; teorema de Bayes relaciona chances posteriores a taxas prévias e probabilidade do teste sob cada condição.",
      "Use P(A|B)=P(B|A)P(A)/P(B). Para teste com falso positivo, não confunda sensibilidade com probabilidade de ter condição ao receber resultado positivo.",
      "Se 1% têm condição, teste identifica 90% deles e gera 10% de falsos positivos entre os demais, então em 10.000 pessoas haverá cerca de 90 verdadeiros positivos e 990 falsos: P(condição|positivo)=90/1080≈8,33%.",
      "Pegadinha: taxa de verdadeiro positivo 90% não significa 90% dos positivos serem verdadeiros; prevalência altera valor preditivo."
    ],
    [
      "Amostragem",
      "População, amostra e viés",
      "População é conjunto alvo; amostra é observada. Amostragem probabilística facilita inferências sob desenho e suposições; selecionar só quem responde voluntariamente pode introduzir viés.",
      "Controle taxa de resposta, estratos e universo de cobertura. Aumentar amostra enviesada não remove necessariamente viés de seleção. Intervalos de confiança dependem do desenho e do estimador.",
      "Pesquisa sobre usuários de serviço digital consulta apenas quem tem celular moderno: não representa necessariamente cidadãos sem internet. A diferença é viés de cobertura, não apenas margem de erro.",
      "Pegadinha: população de 10 milhões não exige automaticamente amostra de milhões, mas representatividade e método são essenciais."
    ],
    [
      "Inferência",
      "Intervalos de confiança e nível de significância",
      "Intervalo de confiança é procedimento que, em repetições ideais do experimento, cobre parâmetro em determinada fração segundo modelo; não representa probabilidade subjetiva direta do parâmetro fixo em um intervalo particular.",
      "P-valor é medida da incompatibilidade dos dados com hipótese nula sob o modelo, não probabilidade de hipótese ser verdadeira. Significância estatística não assegura importância prática ou causalidade.",
      "Diferença média de 0,1 segundo pode ser estatisticamente significativa com amostra enorme e pouco relevante operacionalmente. Avalie magnitude e incerteza, não só p<0,05.",
      "Pegadinha: intervalo de 95% não significa que 95% das observações individuais estão no intervalo; é incerteza sobre parâmetro."
    ],
    [
      "Análise",
      "Correlação, regressão e causalidade",
      "Correlação mede associação sob fórmula escolhida; regressão relaciona resposta com preditores segundo modelo e hipóteses. Associação observacional não implica que mudar preditor causará mudança esperada na resposta.",
      "Analise variáveis de confusão, relação temporal, seleção e desenho de estudo. Um coeficiente significativo pode esconder causalidade reversa e não linearidades.",
      "Unidades com mais servidores de TI podem apresentar mais incidentes porque são maiores, não porque servidores provocam incidentes. Volume de serviços pode confundir comparação.",
      "Pegadinha: correlação de Pearson perto de zero não descarta relação curva ou associação por subgrupos."
    ],
    [
      "Dados",
      "ETL, qualidade e visualização de dados",
      "ETL extrai, transforma e carrega dados; ELT carrega antes de certas transformações. Qualidade envolve completude, consistência, validade, unicidade e atualidade conforme uso.",
      "Documente origem, tipos, chaves, deduplicação e horários. Ao juntar dados de dois sistemas, verifique identificadores: nomes iguais podem ser pessoas diferentes e IDs podem ser locais a cada sistema.",
      "Indicador 'compareceu%' deve ter numerador comparecidos e denominador agendados do mesmo período, unidade e critério. Misturar reagendados altera taxa.",
      "Pegadinha: dashboard bonito não comprova dado correto. Transformações precisam de testes e linhagem para auditoria."
    ]
  ]
}
