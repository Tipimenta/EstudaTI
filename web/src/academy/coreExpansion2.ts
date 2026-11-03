import type {PedagogicalLesson} from './intro1'
export const coreExpansion2:PedagogicalLesson[]=[
  {
    "id": 47,
    "title": "Coesão e conectivos: como o texto constrói sentido",
    "goal": "Reconhecer a função de conectivos e pronomes, interpretar relações lógicas e corrigir reescritas que mudam o sentido.",
    "steps": [
      {
        "title": "Um texto não é uma sequência de frases independentes",
        "body": "Leia: 'O servidor apresentou falhas. A equipe identificou o problema. Ela atualizou o serviço. Depois disso, a operação voltou ao normal.' As frases se relacionam por **coesão**, isto é, mecanismos linguísticos que estabelecem ligações entre trechos. O pronome **ela** retoma 'a equipe'; 'depois disso' situa um acontecimento em relação ao anterior. Sem essas conexões, a leitura pode se tornar repetitiva ou ambígua. Em provas de Português, a banca pergunta se uma substituição preserva o sentido, o referente e a correção gramatical."
      },
      {
        "title": "Conectivos são sinais de relações lógicas",
        "body": "Conectivos como **porque**, **portanto**, **embora**, **mas**, **se** e **além disso** indicam relações diferentes. 'Porque' pode introduzir explicação ou causa conforme a estrutura. 'Portanto' costuma apresentar conclusão. 'Embora' introduz concessão: reconhece-se um fato que não impede a afirmação principal. 'Mas' normalmente marca oposição ou contraste. Não é suficiente memorizar sinônimos: é preciso compreender a relação real entre as orações.\n\nCompare: 'A equipe testou o sistema, **portanto** liberou a atualização' comunica uma conclusão. Trocar por '**embora**' exigiria outra organização e mudaria o sentido. Mesmo conectivos que parecem próximos podem ser incompatíveis em certos contextos."
      },
      {
        "title": "Referência pronominal e ambiguidades",
        "body": "Pronomes podem evitar repetição, mas precisam deixar claro a que se referem. Na frase 'A coordenadora falou com a médica sobre sua avaliação', o possessivo **sua** pode indicar a avaliação da coordenadora ou da médica. Para eliminar a ambiguidade, reescreva 'avaliação da médica' ou 'avaliação da coordenadora', conforme intenção. Em concurso, procure o **referente** antes de afirmar que pronome ou expressão preserva o significado.\n\nAlém da coesão, existe a **coerência**, relacionada à unidade e plausibilidade global do sentido. Um texto pode usar conectivos corretamente e ainda apresentar ideias contraditórias."
      }
    ],
    "worked": {
      "title": "Exemplo comentado: uma troca que muda a conclusão",
      "body": "**Texto:** 'O serviço permaneceu indisponível por alguns minutos; **porém**, a equipe manteve os atendimentos por um procedimento alternativo.'\n\n**1.** A primeira oração apresenta um problema: indisponibilidade.\n\n**2.** A segunda apresenta fato contrastante: continuidade do atendimento por procedimento alternativo.\n\n**3.** O conectivo '**porém**' é compatível com contraste.\n\n**4.** Substituir por '**portanto**' indicaria que a indisponibilidade causou logicamente a continuidade, relação que o enunciado não apresenta.\n\n**Conclusão:** a substituição não preserva o sentido original. O teste é verificar a relação entre ideias, não procurar uma palavra que 'pareça formal'."
    },
    "pitfalls": [
      "Coesão liga trechos; coerência diz respeito ao sentido global.",
      "'Portanto' e 'porém' não são intercambiáveis, porque exprimem relações diferentes.",
      "Referentes pronominais ambíguos podem mudar interpretação.",
      "Uma reescrita gramaticalmente correta ainda pode alterar o sentido do texto."
    ],
    "review": [
      {
        "ask": "Na frase 'Choveu; portanto, a viagem atrasou', qual relação 'portanto' sinaliza?",
        "answer": "Conclusão ou consequência no encadeamento do texto."
      },
      {
        "ask": "Qual problema há em 'Ana falou com Beatriz sobre sua prova'?",
        "answer": "O possessivo 'sua' pode retomar Ana ou Beatriz, gerando ambiguidade."
      }
    ],
    "extra": "Explore elipse, substituição lexical, coesão sequencial e referenciação em textos mais longos."
  },
  {
    "id": 54,
    "title": "SLA, SLO e SLI: como medir se um serviço foi bem entregue",
    "goal": "Entender indicador, objetivo e compromisso de serviço, fazendo cálculos simples de disponibilidade e comparando metas com resultados.",
    "steps": [
      {
        "title": "Por que medir um serviço?",
        "body": "Considere um portal que 'quase nunca cai'. Essa frase não permite saber se o serviço atende às necessidades do usuário. Em gestão de serviços, precisamos de medições verificáveis. Um **SLI (Service Level Indicator)** é um **indicador**: por exemplo, a porcentagem de requisições concluídas com sucesso ou a disponibilidade observada em certo período. A definição da métrica importa tanto quanto seu valor: quais acessos contam, qual o período de medição e o que é considerado falha?"
      },
      {
        "title": "SLO é a meta para o indicador",
        "body": "Um **SLO (Service Level Objective)** define um objetivo para a métrica. Se o SLI medido é '99,7% de requisições atendidas' e a meta SLO é '99,9% no mês', o objetivo não foi alcançado naquele período. A porcentagem parece próxima, mas diferenças pequenas podem representar muitos atendimentos. Em prova, uma pegadinha é chamar o valor medido de objetivo e o objetivo de indicador. Guarde a pergunta: '**o que observei?**' é SLI; '**qual valor desejo atingir?**' é SLO."
      },
      {
        "title": "SLA é compromisso formal de nível de serviço",
        "body": "Um **SLA (Service Level Agreement)** descreve um compromisso de nível de serviço entre partes, normalmente incluindo condições, responsabilidades, métricas, prazos e eventuais consequências. Pode incorporar objetivos de disponibilidade e suporte, mas não é apenas a porcentagem prometida. Um contrato pode definir horário de operação, janelas de manutenção, forma de medir, exclusões e prazos de resposta. Para avaliar cumprimento, compare os dados coletados às regras efetivamente pactuadas, sem inventar premissas."
      },
      {
        "title": "Disponibilidade em números",
        "body": "Se o período tem **30 dias**, isso equivale a **43.200 minutos**. Com disponibilidade-alvo de **99,9%**, a indisponibilidade máxima teórica correspondente, se calculada sobre todo esse período sem exclusões, é **0,1% de 43.200 = 43,2 minutos**. Observe como 99,9% pode parecer 'quase perfeito' e ainda representar minutos de interrupção. Em um SLA real, as regras de medição podem excluir janelas autorizadas ou considerar apenas horário de atendimento; sempre confira o enunciado."
      }
    ],
    "worked": {
      "title": "Exemplo resolvido: contrato de disponibilidade",
      "body": "**Cenário:** um contrato mede disponibilidade mensal, sem exclusões, em mês de 30 dias. A meta é 99,9%. O serviço ficou indisponível por 60 minutos.\n\n**1.** Total de minutos = 30 × 24 × 60 = **43.200**.\n\n**2.** Disponibilidade observada = (43.200 − 60) ÷ 43.200 × 100 = **99,8611%**, aproximadamente.\n\n**3.** O valor está **abaixo de 99,9%**, portanto a meta não foi alcançada nesse cenário.\n\n**4.** SLI é a disponibilidade **medida** (~99,8611%); SLO é o **objetivo** (99,9%); SLA é o compromisso que define condições e eventuais consequências.\n\n**Conclusão:** sem período e regras de cálculo, uma porcentagem isolada não permite verificar cumprimento."
    },
    "pitfalls": [
      "SLI é o indicador observado; SLO é o objetivo; SLA é o compromisso formal.",
      "99,9% não significa 'zero minutos de indisponibilidade'.",
      "O resultado depende do período de medição e exclusões previstas.",
      "Tempo de resposta de chamado, tempo de restauração e disponibilidade são métricas diferentes."
    ],
    "review": [
      {
        "ask": "Um serviço mediu disponibilidade de 99,7% contra meta 99,9%. Qual termo identifica a medição?",
        "answer": "SLI. O valor-alvo 99,9% é SLO."
      },
      {
        "ask": "Em 30 dias completos, quanto corresponde a 0,1% do tempo?",
        "answer": "43,2 minutos, sem considerar exclusões."
      }
    ],
    "extra": "Explore error budget, percentis de latência e métricas de sucesso de solicitações sem confundir estatísticas de redes e de atendimento."
  },
  {
    "id": 61,
    "title": "GROUP BY e HAVING: aprendendo a resumir dados no SQL",
    "goal": "Usar agrupamento, COUNT, SUM e HAVING para responder perguntas de negócio sem confundir filtros e valores nulos.",
    "steps": [
      {
        "title": "Quando SELECT simples não basta?",
        "body": "Imagine uma tabela de exames com as colunas `(id, setor, data, valor)`. Você consegue listar exames usando `SELECT`, mas a coordenação deseja saber **quantos exames cada setor realizou**. Em vez de mostrar linha por linha, é preciso formar grupos e aplicar uma função de agregação. A cláusula **GROUP BY** reúne linhas por uma ou mais expressões. Em cada grupo, funções como **COUNT**, **SUM**, **AVG**, **MIN** e **MAX** calculam resultados relevantes. O agrupamento responde uma pergunta diferente de uma lista de registros."
      },
      {
        "title": "WHERE e HAVING não são a mesma coisa",
        "body": "O **WHERE** filtra linhas **antes** do agrupamento; o **HAVING** filtra grupos após a agregação lógica. Para contar apenas exames de novembro por setor, a condição de data deve restringir as linhas. Se quiser mostrar só setores com mais de dez exames, use `HAVING COUNT(*) > 10`. Uma consulta pode usar os dois: primeiro seleciona exames de um período, depois agrupa por setor e filtra os grupos de maior volume.\n\nUma pegadinha frequente é tentar usar `WHERE COUNT(*) > 10`. A função agregada normalmente não cabe como filtro de linhas nesse contexto. O lugar de testar o resultado do grupo é HAVING."
      },
      {
        "title": "COUNT(*) e COUNT(coluna) podem dar respostas diferentes",
        "body": "**COUNT(*)** conta linhas; **COUNT(nome_coluna)** conta valores não nulos naquela coluna. Isso faz diferença com LEFT JOIN. Um paciente que não possui exame pode aparecer na consulta devido ao LEFT JOIN, com colunas de exame iguais a NULL. Se contar `COUNT(*)`, poderá obter 1; se contar `COUNT(e.id)`, obterá **0** para aquele paciente. Em provas, observe qual tabela está no lado preservado e qual coluna é utilizada na contagem."
      },
      {
        "title": "A ordem dos resultados precisa de ORDER BY",
        "body": "Sem `ORDER BY`, o banco não garante a ordem das linhas retornadas, mesmo que um teste casual mostre nomes em ordem. Para mostrar setores com mais exames primeiro, use `ORDER BY quantidade DESC`, desde que o apelido esteja definido corretamente. Um índice pode ajudar determinadas consultas, mas o otimizador decide plano a partir dos dados, filtros e estatísticas. Primeiro garanta que sua consulta está logicamente correta."
      }
    ],
    "worked": {
      "title": "Exemplo resolvido: setores com mais de dez exames",
      "body": "**Tabela:** `exames(id, setor, data_exame)`.\n\n**Objetivo:** contar exames por setor no mês indicado e listar apenas setores com mais de dez registros.\n\n```sql\nSELECT setor, COUNT(*) AS quantidade\nFROM exames\nWHERE data_exame >= '2026-11-01'\n  AND data_exame < '2026-12-01'\nGROUP BY setor\nHAVING COUNT(*) > 10\nORDER BY quantidade DESC;\n```\n\n**Passo 1:** WHERE restringe o período usando intervalo semiaberto, adequado a colunas de data/hora em muitos bancos.\n\n**Passo 2:** GROUP BY forma um grupo para cada setor.\n\n**Passo 3:** COUNT(*) calcula quantidade de linhas por grupo.\n\n**Passo 4:** HAVING remove setores com dez exames ou menos.\n\n**Passo 5:** ORDER BY apresenta maiores volumes primeiro.\n\n**Conclusão:** cada cláusula responde uma pergunta específica."
    },
    "pitfalls": [
      "WHERE filtra linhas; HAVING filtra grupos agregados.",
      "COUNT(*) conta linhas; COUNT(coluna) ignora valores NULL da expressão.",
      "GROUP BY não garante ordenação da saída.",
      "Um LEFT JOIN pode multiplicar linhas e exige cuidado com totais e contagens."
    ],
    "review": [
      {
        "ask": "Qual cláusula filtra grupos cujo COUNT(*) supera 10?",
        "answer": "HAVING COUNT(*) > 10."
      },
      {
        "ask": "Um LEFT JOIN produz linha sem pedido. COUNT(pedidos.id) retorna quanto nesse grupo?",
        "answer": "Zero, pois pedidos.id é NULL nessa linha."
      }
    ],
    "extra": "Explore subconsultas, funções de janela e planos de execução depois de dominar agregações e filtros."
  }
];
