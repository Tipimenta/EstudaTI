import type {PedagogicalLesson} from './intro1'
export const rewrittenPlanning:Record<number,Partial<PedagogicalLesson>>={
  "46": {
    "id": 46,
    "goal": "Colocar vírgulas corretamente quando aparecem sujeito, verbo, vocativo, aposto e termos deslocados.",
    "steps": [
      {
        "title": "Por que a vírgula depende da estrutura da frase",
        "body": "A vírgula não é simplesmente uma marca para 'respirar'. Ela organiza informações sintáticas. Na ordem direta, uma frase comum apresenta **sujeito + verbo + complementos**. Em **'Os analistas de suporte resolveram o chamado'**, 'os analistas de suporte' é sujeito e 'resolveram' é o verbo. **Não** se coloca vírgula entre eles: *'Os analistas de suporte, resolveram o chamado'* é inadequado na estrutura descrita.\n\nO mesmo cuidado vale entre verbo e seu complemento direto: *'A equipe instalou, o sistema'* não possui justificativa. Identificar os termos é mais seguro do que tentar decidir pela duração da pausa."
      },
      {
        "title": "Vocativo e aposto: como reconhecer",
        "body": "**Vocativo** é o chamamento direto do interlocutor: **'Equipe, verifiquem os logs'**. A palavra 'Equipe' não exerce função de sujeito do verbo; por isso a vírgula é esperada. **Aposto explicativo** acrescenta esclarecimento sobre termo anterior: **'O PostgreSQL, banco de dados relacional, aceita transações'**. A expressão intercalada explica 'PostgreSQL' e aparece isolada.\n\nA banca pode explorar termos que têm aparência de sujeito, mas atuam como vocativo. Faça o teste: a frase continua com sentido sem a expressão de chamamento? Em 'Equipe, atualize o inventário', quem recebe a ordem é a equipe; a vírgula sinaliza o chamamento."
      },
      {
        "title": "Adjuntos adverbiais e orações deslocadas",
        "body": "Expressões circunstanciais deslocadas podem ser isoladas por vírgulas conforme extensão, posição e efeito: **'Depois da manutenção programada, o servidor voltou ao ar'**. Nesse caso, a expressão inicial estabelece o tempo e a pontuação ajuda a leitura.\n\nTambém há orações adverbiais antepostas: **'Se a conexão cair, o atendimento será suspenso'**. A oração condicional vem antes da principal; a vírgula marca a separação esperada. Nem toda pausa percebida na fala se traduz em vírgula obrigatória, e a análise depende da estrutura particular da frase."
      },
      {
        "title": "Pontuação altera interpretação",
        "body": "Compare **'Os servidores que estavam desligados foram atualizados'** e **'Os servidores, que estavam desligados, foram atualizados'**. Sem vírgulas, a oração relativa tende a restringir o grupo: apenas os servidores desligados. Com vírgulas, a informação é explicativa, apresentada como característica do conjunto referido.\n\nEssas diferenças importam especialmente em provas de reescrita: inserir vírgulas pode mudar o alcance do enunciado mesmo sem alterar suas palavras."
      }
    ],
    "worked": {
      "title": "Corrija uma frase e explique cada vírgula",
      "body": "**Frase original:** 'Os técnicos, verificaram o sistema e o coordenador pediu uma conferência adicional.'\n\n**Passo 1.** 'Os técnicos' é sujeito de 'verificaram'. A vírgula **entre sujeito e verbo** é indevida: remova-a.\n\n**Passo 2.** Observe as duas orações: 'Os técnicos verificaram o sistema' e 'o coordenador pediu uma conferência adicional'. A conjunção 'e' liga orações com sujeitos diferentes, contexto em que a vírgula antes de 'e' pode ser empregada para marcar a separação.\n\n**Passo 3.** Uma reescrita adequada é **'Os técnicos verificaram o sistema, e o coordenador pediu uma conferência adicional.'** A vírgula após 'técnicos' jamais seria necessária nesse caso.\n\n**Conclusão:** o motivo de cada vírgula é estrutural, não apenas uma pausa."
    },
    "pitfalls": [
      "A vírgula não deve separar sujeito e predicado na estrutura direta sem intercalação justificadora.",
      "Vocativo é chamamento, não sujeito da oração.",
      "Vírgulas em oração relativa explicativa podem alterar o sentido da frase.",
      "Nem toda pausa oral corresponde a uma vírgula obrigatória."
    ],
    "review": [
      {
        "ask": "Há vírgula em 'Os servidores, reiniciaram'?",
        "answer": "Não. A vírgula separa indevidamente o sujeito do verbo."
      },
      {
        "ask": "Qual a função de 'Equipe' em 'Equipe, revisem o acesso'?",
        "answer": "Vocativo; usa-se vírgula para separá-lo."
      },
      {
        "ask": "Qual diferença comum entre oração relativa com e sem vírgulas?",
        "answer": "Sem vírgulas tende a restringir; entre vírgulas tende a explicar o referente."
      },
      {
        "ask": "Qual é a função da vírgula em 'Se chover, adiaremos o evento'?",
        "answer": "Separar a oração adverbial condicional anteposta da principal."
      }
    ]
  },
  "55": {
    "id": 55,
    "goal": "Ligar estratégia institucional, diagnóstico e priorização ao Plano Diretor de Tecnologia da Informação, com metas e indicadores verificáveis.",
    "steps": [
      {
        "title": "Para que serve planejar a TI",
        "body": "Uma instituição possui orçamento limitado e várias necessidades: renovar computadores, melhorar segurança, automatizar atendimento e modernizar a rede. Se cada solicitação virar projeto sem critérios, o setor de TI pode gastar recursos em ações que pouco contribuem para o objetivo institucional. O **PDTI** é um instrumento de planejamento para relacionar necessidades de informação e tecnologia com prioridades, recursos, metas e cronograma.\n\nO ponto central não é produzir um documento volumoso: é justificar **por que** determinada iniciativa importa e **como** a organização saberá se obteve o resultado esperado."
      },
      {
        "title": "Do problema ao requisito e à iniciativa",
        "body": "Considere a necessidade 'reduzir o tempo de espera do atendimento'. Ela não determina automaticamente que a solução seja comprar computadores. O planejamento deve investigar causas: lentidão de sistema, fluxo de cadastro, falta de integração, organização da fila. A partir do diagnóstico, a equipe compara alternativas técnicas e organizacionais, estima custos, riscos, dependências e benefícios.\n\nA iniciativa escolhida precisa ter relação explícita com a necessidade. Uma descrição como 'instalar dez equipamentos novos' mede um **produto entregue**. Já 'reduzir o tempo médio de espera de 40 para 25 minutos' mede **resultado para o usuário**."
      },
      {
        "title": "Priorização sob restrições reais",
        "body": "Não é possível executar tudo ao mesmo tempo. É útil considerar criticidade de serviço, risco de indisponibilidade, exigência legal, benefício esperado, esforço, custo e dependência entre ações. Uma atualização obrigatória de segurança pode merecer prioridade maior do que uma melhoria estética do portal.\n\nCuidado com a ideia de que priorizar é simplesmente atender quem fez o pedido primeiro. Um PDTI deve tornar explícitos critérios e responsáveis para que decisões possam ser compreendidas e revisadas."
      },
      {
        "title": "Metas, indicadores e revisão do plano",
        "body": "Uma meta boa tem objeto e critério de avaliação: 'reduzir indisponibilidade mensal do sistema de atendimento abaixo de 1 hora', por exemplo, desde que o intervalo e a medida estejam definidos. Um indicador mede desempenho; ele não substitui a análise do problema.\n\nO PDTI não precisa congelar a organização. Mudanças relevantes de contexto, orçamento ou exigência normativa podem justificar revisão formal, desde que se preserve rastreabilidade das decisões. Em prova, associe planejamento de TI a **alinhamento institucional, priorização e monitoramento de benefícios**."
      }
    ],
    "worked": {
      "title": "Qual projeto deve vir primeiro?",
      "body": "**Situação:** a TI possui três propostas: A) trocar cores do portal; B) atualizar software de segurança cujo suporte termina em breve; C) instalar uma nova impressora em sala pouco utilizada.\n\n**Passo 1.** Defina critérios: risco, impacto sobre serviço crítico, obrigação técnica/legal, custo e dependências.\n\n**Passo 2.** A proposta B envolve risco de segurança e continuidade que pode afetar muitos usuários; tende a ter prioridade maior. A decisão não depende apenas do número de equipamentos envolvidos.\n\n**Passo 3.** Registre objetivo, responsável, orçamento, marco de implantação e indicador de resultado.\n\n**Conclusão:** um PDTI eficaz vincula escolha e execução a necessidades verificáveis, não a uma simples lista de compras."
    },
    "pitfalls": [
      "PDTI não é inventário de compras nem cronograma sem prioridades.",
      "Número de equipamentos adquiridos é indicador de entrega, não necessariamente de benefício ao cidadão.",
      "Prioridades devem considerar risco e objetivos institucionais, não apenas ordem de solicitação.",
      "Metas sem critério de medição não permitem acompanhar resultados."
    ],
    "review": [
      {
        "ask": "Qual a finalidade principal de um PDTI?",
        "answer": "Alinhar necessidades e iniciativas de TI à estratégia, com prioridades e recursos."
      },
      {
        "ask": "Qual indicador mede benefício para o usuário: computadores comprados ou espera média?",
        "answer": "Tempo médio de espera, porque mede resultado de atendimento."
      },
      {
        "ask": "O que deve orientar a priorização de iniciativas?",
        "answer": "Critérios de benefício, risco, criticidade, custo e dependências."
      },
      {
        "ask": "Por que um PDTI pode exigir revisão?",
        "answer": "Mudanças de contexto, risco, orçamento ou prioridades podem exigir ajuste documentado."
      }
    ]
  },
  "63": {
    "id": 63,
    "goal": "Identificar redundâncias de dados e aplicar 1FN, 2FN e 3FN por meio de dependências funcionais e exemplos.",
    "steps": [
      {
        "title": "Quando guardar tudo em uma tabela vira problema",
        "body": "Imagine uma planilha de pedidos com colunas **pedido_id**, **cliente_id**, **nome_cliente**, **produto_id**, **nome_produto** e **quantidade**. O nome do cliente aparece repetido em todos os itens comprados. Se a pessoa mudar de nome e apenas algumas linhas forem atualizadas, o banco ficará inconsistente. Isso é uma **anomalia de atualização**. Também podem existir anomalias de inserção e exclusão, quando a representação dos fatos depende indevidamente de linhas relacionadas.\n\nA **normalização** organiza atributos e relações para reduzir redundância inadequada e ajudar a preservar integridade. Não é simplesmente dividir cada tabela em várias tabelas menores."
      },
      {
        "title": "Primeira forma normal: valores adequados por atributo",
        "body": "Uma tabela não deve armazenar uma lista de vários telefones em uma única célula se o modelo relacional pressupõe valores atômicos no domínio. Em um cadastro simples, seria preferível representar telefones em relação própria quando há múltiplas ocorrências por pessoa.\n\nA **1FN** exige atenção à estrutura e aos atributos conforme o modelo adotado. Não significa que todos os dados precisam ser textos curtos ou que uma coluna não possa conter estruturas tratadas como valores de determinado tipo. Em concursos introdutórios, a principal pista costuma ser **campo multivalorado ou grupo repetido**."
      },
      {
        "title": "Segunda forma normal: dependência parcial da chave",
        "body": "Considere a chave composta **(pedido_id, produto_id)**. O atributo **quantidade** depende do par completo, pois cada produto pode ter quantidade distinta em cada pedido. Já **data_pedido** depende somente de pedido_id, e **nome_produto** depende somente de produto_id. Essas dependências parciais de atributos não principais mostram problema para **2FN** quando a relação não está adequadamente separada.\n\nUma decomposição possível organiza **Pedidos** (pedido_id, data_pedido), **Produtos** (produto_id, nome_produto) e **ItensPedido** (pedido_id, produto_id, quantidade). Agora cada fato aparece no local apropriado."
      },
      {
        "title": "Terceira forma normal: dependência transitiva",
        "body": "Suponha a tabela **Funcionarios** com id_funcionario, id_departamento e nome_departamento. Se **id_funcionario determina id_departamento** e **id_departamento determina nome_departamento**, então o nome do departamento depende indiretamente da chave do funcionário. A separação em Funcionarios e Departamentos reduz redundância e representa melhor o relacionamento.\n\nA **3FN** trata certas dependências transitivas entre atributos que não são chaves, formalmente sob critérios de dependências funcionais. A banca pode resumir como 'eliminar dependência transitiva de atributos não chave', mas o importante é entender **qual fato depende de qual identificador**."
      }
    ],
    "worked": {
      "title": "Normalize um cadastro de pedidos",
      "body": "**Tabela inicial:** (pedido_id, produto_id, data_pedido, nome_produto, quantidade), cuja chave é (pedido_id, produto_id).\n\n**Passo 1.** Reconheça fatos: data_pedido depende apenas de pedido_id; nome_produto depende de produto_id; quantidade depende do par.\n\n**Passo 2.** As dependências parciais impedem o atendimento desejado da 2FN. Separe os dados em três relações.\n\n**Passo 3.** Crie **Pedidos(pedido_id, data_pedido)**, **Produtos(produto_id, nome_produto)** e **Itens(pedido_id, produto_id, quantidade)**, com relacionamentos por chaves.\n\n**Passo 4.** Verifique se cada atributo não chave depende do identificador correto e se as referências de integridade foram definidas.\n\n**Conclusão:** o ganho não é 'mais tabelas', mas a redução de atualização incoerente entre fatos repetidos."
    },
    "pitfalls": [
      "1FN não é sinônimo de criar chave primária automaticamente.",
      "2FN aborda dependência parcial relevante em relações com chaves compostas.",
      "3FN busca evitar dependências transitivas inadequadas de atributos não chave.",
      "Normalização reduz certas redundâncias, mas não elimina a necessidade de índices nem de integridade referencial."
    ],
    "review": [
      {
        "ask": "Qual anomalia ocorre quando o nome de um cliente precisa ser alterado em dezenas de linhas?",
        "answer": "Anomalia de atualização por redundância de dados."
      },
      {
        "ask": "Qual forma normal aborda dependência parcial em chave composta?",
        "answer": "Segunda forma normal (2FN)."
      },
      {
        "ask": "Uma coluna depende de outra que, por sua vez, depende da chave. Qual forma normal investigar?",
        "answer": "Terceira forma normal (3FN), com avaliação da dependência transitiva."
      },
      {
        "ask": "O que costuma indicar violação introdutória de 1FN?",
        "answer": "Lista de valores ou grupo repetido armazenado em um atributo que deveria representar um único valor."
      }
    ]
  }
};
