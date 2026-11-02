import type {PedagogicalLesson} from './intro1';
export const intro2:PedagogicalLesson[]=[
  {
    "id": 7,
    "title": "Virtualização, contêineres e RAID: o que cada um resolve",
    "goal": "Diferenciar máquina virtual, contêiner, armazenamento redundante e backup; reconhecer falhas e decisões de migração.",
    "steps": [
      {
        "title": "O motivo de usar virtualização",
        "body": "Uma **máquina virtual (VM)** executa um sistema operacional convidado sobre recursos virtualizados, controlados por um hipervisor. Ela pode isolar serviços, facilitar provisionamento e aproveitar hardware. O **hipervisor tipo 1** executa próximo ao hardware (ex.: Hyper-V Server/Hyper-V no Windows Server, VMware ESXi); o tipo 2 costuma rodar sobre um sistema operacional hospedeiro (ex.: VirtualBox em desktop). A classificação é didática: o importante é distinguir infraestrutura da VM e responsabilidade do SO convidado."
      },
      {
        "title": "VM é diferente de contêiner",
        "body": "Uma VM normalmente possui **seu próprio kernel convidado**, com virtualização de hardware. Contêineres como Docker compartilham o **kernel do hospedeiro** e isolam processos, rede e sistemas de arquivos por mecanismos do SO. Contêiner facilita implantação, mas não se torna 'uma VM mais leve' em todos os aspectos: níveis de isolamento, sistemas compatíveis e persistência são diferentes. Remover um contêiner sem volume persistente pode apagar seu sistema de arquivos gravável."
      },
      {
        "title": "RAID ajuda na falha física; não recupera erro lógico",
        "body": "**RAID 1** espelha dados em discos e tolera, em cenário usual de dois discos, a perda de um. **RAID 5** distribui paridade e tolera a falha de um disco; reconstrução pode ser demorada e arriscada em discos grandes. **RAID 0** melhora distribuição de dados, mas não oferece redundância. Nenhum RAID substitui cópias de segurança externas porque exclusão, ransomware e corrupção lógica podem atingir o volume inteiro."
      },
      {
        "title": "Snapshot não é backup completo",
        "body": "Um **snapshot** é registro de estado ou bloco alterado que permite retorno em condições específicas. Frequentemente depende do datastore original e pode consumir espaço crescente. Um **backup** deve poder ser recuperado independentemente da VM original, respeitando retenção, RTO/RPO e testes de restauração. Para migrar servidor legado, verifique firmware de boot (BIOS/UEFI), esquema de partição (MBR/GPT), drivers, licenciamento e consistência de aplicações antes da conversão."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: migração de servidor BIOS/MBR para Hyper-V",
      "body": "**1. Inventariar:** sistema, volumes, serviços, dependências, espaço, backup e janela autorizada.\n\n**2. Verificar boot:** servidor instalado em BIOS/MBR costuma ser mais compatível com **VM Hyper-V Geração 1**, baseada em BIOS virtual; Geração 2 usa UEFI e pode exigir conversão planejada.\n\n**3. Realizar P2V** conforme compatibilidade da ferramenta, preferindo cópia consistente e plano de retorno.\n\n**4. Validar VM isoladamente:** boot, discos, IPs, permissões, banco e serviços sem criar conflito de nome/endereço com produção.\n\n**5. Executar corte controlado:** testar funções críticas, medir desempenho e documentar restauração.\n\n**Armadilha:** converter disco em VHDX não garante que Windows vá iniciar com qualquer geração de VM."
    },
    "pitfalls": [
      "RAID 1 e RAID 5 fornecem redundância limitada, não backup.",
      "VM normalmente executa kernel próprio; contêiner normalmente compartilha kernel do hospedeiro.",
      "Snapshot local pode se perder com o datastore; backup independente pode ser restaurado em outro local.",
      "Migração exige verificar geração de firmware e particionamento, não somente copiar arquivos."
    ],
    "review": [
      {
        "ask": "O que acontece com o volume de dados se ransomware altera arquivos dentro de RAID 1?",
        "answer": "As alterações podem ser espelhadas; RAID não oferece versão limpa por si só. É necessário backup/restauração."
      },
      {
        "ask": "Uma VM BIOS/MBR tende a ser compatível com qual geração de Hyper-V?",
        "answer": "Geração 1 normalmente é a opção inicial para preservar BIOS/MBR, após confirmar particularidades do sistema."
      }
    ],
    "extra": "**Aprofundamento:** compare hypervisor, bare metal, snapshots consistentes com aplicação e backups com RPO/RTO; aprenda conceitos de volume Docker, rede bridge e limites de isolamento."
  },
  {
    "id": 8,
    "title": "Interpretação de textos: ler o que está escrito e o que se pode concluir",
    "goal": "Distinguir informação explícita, inferência autorizada, pressuposição e extrapolação em questões de concurso.",
    "steps": [
      {
        "title": "O texto é a fonte da resposta",
        "body": "Questões de **compreensão** pedem o que o texto afirma literalmente. Questões de **interpretação** exigem concluir, relacionar e reconhecer intenções apoiadas no texto. Uma conclusão plausível no mundo real não é necessariamente verdadeira para o enunciado. Em prova, a resposta correta precisa encontrar apoio textual específico: um conectivo, uma restrição, um quantificador ou a ideia central."
      },
      {
        "title": "Tema, tese e argumento",
        "body": "**Tema** é o assunto geral. **Tese** é a posição ou afirmação central defendida pelo autor, quando o gênero apresenta argumentação. **Argumentos** são razões e evidências usadas para sustentar a tese; **exemplos** ilustram. Leia o parágrafo perguntando 'sobre o que ele fala?' (tema) e 'o que afirma sobre isso?' (tese). Não confunda uma informação de apoio com a conclusão principal."
      },
      {
        "title": "Quantificadores mudam a verdade",
        "body": "Compare: '**Alguns** servidores apresentaram falhas' e '**Todos** os servidores apresentaram falhas'. 'Alguns' autoriza a existência de casos, não a universalidade. 'Pode' expressa possibilidade, não certeza. 'Necessariamente', 'sempre', 'jamais' são palavras fortes e frequentemente tornam uma alternativa indevida. Em enunciados com **embora**, há concessão; com **portanto**, conclusão; com **porque**, causalidade ou explicação conforme contexto."
      },
      {
        "title": "Pressuposição e inferência não são idênticas",
        "body": "Na frase '**Maria voltou a estudar**', o verbo 'voltar a' sugere que Maria já estudara antes: uma pressuposição ativada pela expressão. Na frase 'A turma revisou o conteúdo, mas parte dos alunos errou a questão', é possível inferir que a revisão não levou todos ao acerto. Não é correto concluir que a revisão foi inútil para todos. A boa interpretação respeita os limites do enunciado."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: enunciado com oposição",
      "body": "**Texto:** 'A equipe revisou os procedimentos e reduziu as falhas de registro. Entretanto, não eliminou todos os atrasos de atendimento.'\n\n**Questão:** 'A revisão acabou com todos os problemas operacionais.'\n\n**Passo 1:** identifique a palavra decisiva da afirmação: **todos**.\n\n**Passo 2:** o texto informa redução de falhas, mas diz **não eliminou todos os atrasos**.\n\n**Passo 3:** a alternativa generaliza resultados diferentes e contradiz o texto.\n\n**Conclusão:** incorreta. É possível afirmar redução de falhas e permanência de alguns atrasos, não solução completa de todos os problemas."
    },
    "pitfalls": [
      "Não confunda 'alguns' com 'todos', possibilidade com certeza ou correlação com causa exclusiva.",
      "Tema é assunto; tese é ponto central defendido, quando presente.",
      "Inferência precisa de suporte textual; opinião pessoal não substitui o enunciado.",
      "A função de conectivos depende do contexto, não apenas de decorar listas."
    ],
    "review": [
      {
        "ask": "Texto: 'Algumas unidades ampliaram atendimento'. É correto concluir que todas ampliaram?",
        "answer": "Não. 'Algumas' não autoriza concluir 'todas'."
      },
      {
        "ask": "Em 'João deixou de cometer esse erro', qual pressuposição costuma aparecer?",
        "answer": "A expressão 'deixou de' pressupõe que o erro acontecia anteriormente."
      }
    ],
    "extra": "**Aprofundamento:** treine diferenciação entre pressuposição, subentendido, ironia e implicaturas. Em provas, confira também a atitude do autor e a função das aspas antes de escolher a alternativa."
  },
  {
    "id": 9,
    "title": "Gramática sem decoreba: concordância, crase e pontuação",
    "goal": "Localizar sujeito e verbo, aplicar concordância impessoal, identificar crase e evitar vírgulas que alteram o sentido.",
    "steps": [
      {
        "title": "Uma frase tem estrutura, não apenas palavras",
        "body": "Antes de decidir concordância, localize o verbo, seu sujeito e a função dos termos. Em '**Os relatórios chegaram ontem**', o sujeito 'os relatórios' está no plural; por isso 'chegaram'. Em '**Havia relatórios pendentes**', haver tem sentido de existir e é **impessoal**, ficando no singular. Já **Existiam relatórios pendentes** usa o sujeito plural. 'Faz três anos' também emprega fazer impessoal quando indica tempo decorrido."
      },
      {
        "title": "Concordância pelo núcleo do sujeito",
        "body": "O sujeito pode ter adjuntos ou expressões longas: '**A relação dos equipamentos foi revisada**'. O núcleo é 'relação' (singular); 'dos equipamentos' não muda concordância. Com sujeito composto anterior ao verbo, a tendência é plural: 'O médico e a técnica chegaram'. Com 'mais de um', a concordância geralmente fica no singular ('Mais de um técnico participou'), ressalvados contextos especiais, como reciprocidade."
      },
      {
        "title": "Crase é encontro de preposição e artigo",
        "body": "O acento grave em **à** indica fusão da preposição 'a' com artigo feminino 'a' ou determinadas formas demonstrativas. Pergunte: a palavra anterior exige preposição **a**? O termo seguinte admite artigo **a**? Em '**dirigiu-se à unidade**', temos dirigir-se **a** + **a unidade**. Em '**começou a estudar**', 'estudar' é verbo, não há artigo feminino: não ocorre crase. Em '**chegou a pé**', não há artigo feminino diante de 'pé'."
      },
      {
        "title": "Pontuação preserva relações sintáticas",
        "body": "A vírgula pode isolar adjuntos deslocados e expressões explicativas, mas não deve separar **sujeito de predicado** na ordem direta. '**Os servidores, foram reiniciados**' está inadequada; a vírgula interrompe sujeito e verbo. Orações relativas sem vírgulas tendem a ser **restritivas** ('Os usuários que receberam aviso compareceram'); com vírgulas, a oração pode ser explicativa ('Os usuários, que receberam aviso, compareceram'), alterando a extensão do referente."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: revisar três frases de um relatório",
      "body": "**Frase 1:** 'Houveram cinco falhas hoje.' → **Houve cinco falhas hoje.** Haver no sentido de existir é impessoal.\n\n**Frase 2:** 'O gestor encaminhou o documento à partir de ontem.' → **... a partir de ontem.** 'A partir de' não exige fusão de preposição e artigo diante de verbo.\n\n**Frase 3:** 'A equipe de suporte, atualizou o sistema.' → **A equipe de suporte atualizou o sistema.** A vírgula separava sujeito de verbo.\n\n**Método:** identifique a estrutura e explique o motivo da correção; decorar apenas 'a letra C' não ensina a resolver outra questão."
    },
    "pitfalls": [
      "Haver com sentido de existir é impessoal; existir concorda com seu sujeito.",
      "O núcleo do sujeito determina concordância, não o substantivo plural mais próximo.",
      "Crase não é simplesmente 'antes de palavra feminina': exige condições sintáticas.",
      "A vírgula que separa sujeito e predicado é inadequada na ordem direta."
    ],
    "review": [
      {
        "ask": "Qual está correta: 'Haviam problemas' ou 'Havia problemas'?",
        "answer": "Havia problemas. Haver com sentido de existir é impessoal."
      },
      {
        "ask": "Qual frase tem crase correta: 'à partir' ou 'à unidade' após 'dirigir-se'?",
        "answer": "'Dirigiu-se à unidade' é correta. 'A partir' não leva crase."
      }
    ],
    "extra": "**Aprofundamento:** distinga crase facultativa de obrigatória em nomes próprios, pronomes possessivos femininos e locuções; confira regência contextual em verbos como assistir, visar e obedecer."
  },
  {
    "id": 10,
    "title": "ITIL na prática: incidente, problema e mudança",
    "goal": "Saber quando restaurar um serviço, investigar causa, registrar mudanças e medir resultados em TI.",
    "steps": [
      {
        "title": "Por que processos de TI existem",
        "body": "Num ambiente com vários sistemas, as equipes precisam organizar solicitações, interrupções e alterações. O ITIL apresenta boas práticas para gestão de serviços, com foco em valor e resultados. Termos parecidos indicam tarefas diferentes: incidente não é necessariamente problema, e mudança planejada não é simples registro de falha."
      },
      {
        "title": "Incidente: recuperar o funcionamento",
        "body": "**Incidente** é interrupção não planejada ou redução na qualidade de um serviço. O foco imediato do gerenciamento de incidentes é **restaurar o serviço normal o mais rápido possível**, respeitando prioridades e impactos. É possível usar contorno temporário ('workaround') com registro. Exemplo: redirecionar impressão para dispositivo reserva enquanto falha em impressora principal é investigada."
      },
      {
        "title": "Problema: procurar causa recorrente",
        "body": "**Problema** está associado à causa, ou potencial causa, de um ou mais incidentes. Incidentes podem ser solucionados temporariamente sem que a causa seja eliminada. Exemplo: um sistema é reiniciado todas as manhãs para voltar a responder; o gerenciamento de problemas investiga por que o serviço falha e propõe solução estável. O registro de erro conhecido e contorno podem acelerar próximas ocorrências."
      },
      {
        "title": "Mudança: controlar alteração e risco",
        "body": "Uma **mudança** introduz, altera ou remove algo que pode afetar um serviço. Mudança requer avaliação proporcional de risco, autorização conforme processo, planejamento, comunicação e verificação. Alterar uma regra de firewall para corrigir incidente pode restaurar acesso, mas a mudança continua exigindo controle. Indicadores podem diferenciar **tempo para restaurar** (incidente), **taxa de recorrência** (problema) e **sucesso/falha de mudanças**."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: impressora não imprime etiquetas",
      "body": "**09h10 — incidente:** a impressora deixa de atender e os exames acumulam. Registre impacto, prioridade, testes e horário.\n\n**09h20 — contorno:** habilite impressora substituta com configuração validada para restabelecer fluxo.\n\n**Investigação do problema:** recorrência é associada a configuração da fila/driver; compare logs, versão e alterações anteriores.\n\n**Mudança planejada:** após validar causa, agende correção, defina plano de retorno, comunique setores e teste com etiqueta real.\n\n**Medição:** tempo de restauração, recorrência após correção e sucesso da mudança representam perguntas diferentes."
    },
    "pitfalls": [
      "Incidente exige restauração do serviço; problema busca causa ou potencial causa subjacente.",
      "Uma correção temporária pode encerrar o incidente sem eliminar o problema.",
      "Mudanças emergenciais também precisam de controle proporcional, não de desorganização total.",
      "Tempo de resposta de um chamado não equivale necessariamente ao tempo total de restauração."
    ],
    "review": [
      {
        "ask": "Um servidor foi reiniciado e voltou a funcionar, mas cai semanalmente. O que foi resolvido e o que ainda falta?",
        "answer": "O incidente pode estar restaurado, mas a causa recorrente deve ser tratada por gerenciamento de problemas."
      },
      {
        "ask": "Quem está preocupado com o risco de alterar configuração em produção?",
        "answer": "O processo de habilitação/controle de mudanças, com avaliação, autorização e verificação proporcionais."
      }
    ],
    "extra": "**Aprofundamento:** diferencie serviço, requisição, incidente, problema, evento, mudança e configuração/CMDB. ITIL 4 articula práticas, princípios orientadores e cadeia de valor; não é lista rígida de etapas."
  },
  {
    "id": 11,
    "title": "Governança de TI e PDTI: planejar para entregar valor",
    "goal": "Diferenciar governança e gestão e estruturar um PDTI coerente com necessidades, riscos e prioridades.",
    "steps": [
      {
        "title": "Governança pergunta 'por quê' e 'para quem'",
        "body": "**Governança** avalia necessidades e expectativas, direciona prioridades e monitora resultados. **Gestão** planeja e executa ações para alcançar direção definida. Exemplo: a direção define redução de interrupções e proteção de dados como prioridades; a TI elabora políticas, cronograma, projetos e indicadores para executá-las. Um técnico pode apoiar governança com evidências sem que isso substitua decisão da alta direção."
      },
      {
        "title": "PDTI é um instrumento, não uma lista de compras",
        "body": "Um **Plano Diretor de Tecnologia da Informação (PDTI)** relaciona necessidades institucionais, capacidades de TI, ações, prioridades, recursos, responsáveis e metas em determinado período. É inadequado simplesmente listar 50 equipamentos sem explicar o problema que resolvem. Em organizações públicas, observe diretrizes e modelos aplicáveis ao órgão e seu ambiente normativo. Um bom plano registra situação atual, lacunas e critérios objetivos de escolha."
      },
      {
        "title": "Da necessidade ao indicador de resultado",
        "body": "Considere a necessidade 'reduzir atraso na entrega de resultados'. Uma iniciativa pode melhorar disponibilidade do RIS/PACS ou automatizar avisos. **Indicador de atividade**: número de servidores migrados. **Indicador de resultado**: percentual de exames entregues dentro do prazo. Mesmo com migração concluída, não se pode afirmar que o serviço melhorou sem medir resultado. Risco, custo, urgência, dependências e capacidade operacional são critérios úteis de priorização."
      },
      {
        "title": "Como COBIT se conecta ao assunto",
        "body": "COBIT é um framework de governança e gestão da informação e tecnologia empresarial. Distingue objetivos de **governança** e de **gestão**, tratando valor, riscos, recursos e alinhamento. Não é sinônimo de ITIL: COBIT favorece a estrutura de governança/gestão; ITIL oferece práticas focadas em serviços. Esses conjuntos podem ser complementares."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: três demandas e orçamento limitado",
      "body": "**Necessidade:** diminuir interrupções em diagnóstico por imagem.\n\n**Demandas:** A) renovar rede crítica; B) trocar cores do portal; C) implantar recuperação de backup testada.\n\n**Critérios:** impacto assistencial, risco, urgência, custo, dependências e capacidade de execução.\n\n**Decisão fundamentada:** C pode ter alta prioridade se a recuperação é incerta e o risco é grave; A pode ser essencial se há falhas comprovadas de infraestrutura; B tende a ter menor prioridade sem benefício demonstrável.\n\n**Indicadores:** tempo de recuperação testado, taxa de disponibilidade, incidentes por mês e porcentagem de testes concluídos. Uma priorização real exige dados, não uma regra automática de que projeto C deve vencer sempre."
    },
    "pitfalls": [
      "Governança e gestão são complementares, mas têm responsabilidades diferentes.",
      "PDTI sem necessidade, responsável e indicador não comprova alinhamento.",
      "Concluir atividade não significa necessariamente alcançar benefício institucional.",
      "COBIT e ITIL não são sinônimos nem mutuamente exclusivos."
    ],
    "review": [
      {
        "ask": "Qual diferença entre quantidade de máquinas trocadas e disponibilidade do serviço?",
        "answer": "A primeira é indicador de entrega/atividade; a segunda mede resultado percebido, dependendo do desenho da métrica."
      },
      {
        "ask": "Uma política aprovada e nunca aplicada representa governança madura?",
        "answer": "Não isoladamente. É necessário evidência de execução, monitoramento e efetividade."
      }
    ],
    "extra": "**Aprofundamento:** relacione PDTI a planejamento estratégico, processo de contratação, gestão de riscos e acompanhamento de benefícios. Consulte os normativos vigentes da entidade e documentação do COBIT."
  },
  {
    "id": 12,
    "title": "SQL e transações: consultar sem corromper dados",
    "goal": "Construir consultas SELECT corretas e explicar transações ACID, commit e rollback.",
    "steps": [
      {
        "title": "Pense no dado antes do comando",
        "body": "Num banco relacional, uma **tabela** reúne linhas de registros e colunas com atributos. Uma **chave primária** identifica registros; uma **chave estrangeira** relaciona tabelas. **SELECT** consulta informações; **WHERE** filtra linhas; **ORDER BY** determina ordenação; **JOIN** relaciona tabelas; **GROUP BY** agrega grupos e **HAVING** filtra grupos. A consulta deve refletir o significado do dado, não apenas produzir linhas."
      },
      {
        "title": "Filtrar, ordenar e agregar são operações distintas",
        "body": "Uma consulta que procura atendimentos de hoje usa uma condição em **WHERE**; uma consulta que conta atendimentos por setor combina agrupamento com agregação; se quiser somente setores com mais de dez atendimentos, usa **HAVING COUNT(*) > 10**. **ORDER BY data DESC** coloca datas mais recentes primeiro. Uma junção entre tabela pai e seus itens pode multiplicar linhas e inflar somas: confira a **granularidade** antes de agregar."
      },
      {
        "title": "O que é transação",
        "body": "Uma **transação** é unidade de trabalho que deve preservar regras mesmo sob falhas. **Atomicidade:** tudo ou nada. **Consistência:** transação preserva restrições definidas. **Isolamento:** operações concorrentes observam comportamento conforme nível escolhido. **Durabilidade:** após commit confirmado, alterações persistem conforme garantias do SGBD. **COMMIT** confirma; **ROLLBACK** desfaz mudanças não confirmadas. Esses conceitos formam ACID."
      },
      {
        "title": "Concorrência e segurança",
        "body": "Se duas sessões atualizam o mesmo saldo sem controle, pode ocorrer **atualização perdida**. Se a mesma linha é relida com valores diferentes entre commits, temos **leitura não repetível** em determinadas condições de isolamento. **Prepared statements/parametrização** separam dados da estrutura SQL e reduzem riscos de injection. Índices melhoram certos acessos, mas custam espaço e manutenção nas escritas."
      }
    ],
    "worked": {
      "title": "Exemplo guiado: gerar total de pedidos por cliente",
      "body": "**Tabelas:** clientes(id,nome) e pedidos(id,cliente_id,valor).\n\n**Objetivo:** contar pedidos por cliente incluindo quem não comprou.\n\n**Consulta:**\n\nSELECT c.nome, COUNT(p.id) AS total FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id GROUP BY c.id, c.nome ORDER BY total DESC;\n\n**Por que LEFT JOIN?** Preserva clientes sem pedido.\n\n**Por que COUNT(p.id), não COUNT(*)?** O LEFT JOIN produz linha com pedido nulo para cliente sem compra; COUNT(p.id) retorna 0 nesse caso.\n\n**Transação:** se uma operação grava pedido e desconta estoque, use transação para impedir confirmação de apenas uma das duas alterações."
    },
    "pitfalls": [
      "WHERE filtra linhas; HAVING filtra grupos agregados.",
      "INNER JOIN remove registros sem correspondência; LEFT JOIN preserva o lado esquerdo.",
      "COUNT(*) após LEFT JOIN pode contar uma linha nula representativa; COUNT(coluna_do_lado_direito) evita esse equívoco.",
      "Atomicidade não significa 'todo acesso é rápido'; durabilidade não significa 'nunca preciso de backup'."
    ],
    "review": [
      {
        "ask": "Qual cláusula verifica COUNT(*) > 5 após GROUP BY?",
        "answer": "HAVING, pois atua sobre o resultado agrupado."
      },
      {
        "ask": "Se gravar pedido funciona e descontar estoque falha, o que uma transação atômica deve permitir?",
        "answer": "Rollback das alterações não confirmadas, preservando a unidade da operação."
      }
    ],
    "extra": "**Aprofundamento:** explore níveis de isolamento, MVCC e locks no PostgreSQL. Leia a documentação de transações e de JOIN em https://www.postgresql.org/docs/current/tutorial-sql.html."
  }
];
