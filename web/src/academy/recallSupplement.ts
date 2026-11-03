export const recallSupplement:Record<number,{ask:string;answer:string}>={
  "1": {
    "ask": "Um host envia um pacote IP a outra sub-rede usando gateway. No primeiro salto Ethernet, o endereço MAC de destino é normalmente:",
    "answer": "O MAC do gateway no enlace local.. o quadro alcança o próximo salto local, enquanto o IP continua destinado ao servidor remoto."
  },
  "2": {
    "ask": "Uma máquina recebeu IPv4 do DHCP e acessa um serviço por IP, mas falha ao acessar pelo nome. Qual teste é a melhor próxima etapa?",
    "answer": "Verificar resolução de nome via DNS e registros correspondentes.. diferença entre IP e nome torna DNS hipótese prioritária, sem excluir particularidades do aplicativo."
  },
  "3": {
    "ask": "Um switch L2 possui hosts nas VLANs 10 e 20. Sem dispositivo L3, qual afirmação está correta?",
    "answer": "Cada VLAN forma domínio de broadcast separado; comunicação IP entre elas requer roteamento.. as VLANs isolam os domínios de broadcast no nível de enlace."
  },
  "4": {
    "ask": "Um backup permanece disponível, mas arquivos foram alterados indevidamente. Qual propriedade está diretamente comprometida?",
    "answer": "Integridade.. integridade diz respeito a alterações não autorizadas ou incorretas do conteúdo."
  },
  "5": {
    "ask": "Um arquivo e seu hash estão publicados no mesmo servidor comprometido. Qual limitação existe na checagem de integridade?",
    "answer": "Um atacante pode trocar arquivo e hash; é preciso confiar no valor esperado.. referência do hash precisa ser confiável; ambos adulterados podem passar na comparação."
  },
  "6": {
    "ask": "Um serviço Linux não inicia após atualização. Qual sequência de diagnóstico é mais defensável?",
    "answer": "Verificar systemctl status, journalctl, dependências e permissões relacionadas.. estado, logs, dependências e ACLs ajudam a encontrar a causa."
  },
  "7": {
    "ask": "Uma VM possui snapshot local e o datastore inteiro falha fisicamente. Qual avaliação é correta?",
    "answer": "Snapshot pode ser perdido com o datastore; backup independente é necessário.. a independência do backup é essencial contra perda do datastore."
  },
  "8": {
    "ask": "Leia: 'A equipe melhorou o desempenho; entretanto, ainda há falhas'. Qual interpretação respeita o conectivo?",
    "answer": "Melhora e persistência de falhas coexistem.. 'entretanto' estabelece contraste entre avanço e problema remanescente."
  },
  "9": {
    "ask": "Assinale a construção em conformidade com a norma-padrão:",
    "answer": "Faz três anos que o sistema foi instalado.. Fazer indicando tempo decorrido e haver no sentido de existir são impessoais; 'existir' concorda com o sujeito."
  },
  "10": {
    "ask": "Uma correção em firewall é proposta para restaurar sistema crítico e afeta produção. Qual cuidado continua pertinente?",
    "answer": "Avaliar riscos e registrar autorização/teste apropriados ao processo de mudança.. mudanças precisam de avaliação e controles de acordo com a urgência e política."
  },
  "11": {
    "ask": "Um PDTI registra 'comprar 30 computadores' sem justificar necessidade nem benefício. O principal problema é:",
    "answer": "Falta de alinhamento entre necessidade institucional, iniciativa e resultado esperado.. o planejamento deve explicitar a necessidade e benefício pretendido."
  },
  "12": {
    "ask": "Uma consulta usa LEFT JOIN entre clientes e pedidos e quer contar quantos pedidos cada cliente possui, inclusive os sem pedido. Qual agregação é mais apropriada?",
    "answer": "COUNT(pedidos.id) agrupando cliente.. COUNT(coluna do lado direito) ignora NULL e retorna zero para cliente sem pedidos."
  },
  "13": {
    "ask": "Uma tabela de pedidos repete nome do cliente em centenas de linhas. Qual solução costuma reduzir anomalias?",
    "answer": "Armazenar cliente em tabela própria e referenciá-lo por FK.. separação de entidades reduz redundância e centraliza o dado do cliente."
  },
  "14": {
    "ask": "Qual requisito está suficientemente mensurável para ser testado?",
    "answer": "A busca deve responder em até 2 s em 95% das requisições no cenário de teste definido.. tempo, percentil e cenário formam critério verificável."
  },
  "15": {
    "ask": "Um cliente reenvia um POST depois de timeout, sem saber se o pedido já foi criado. Qual recurso de desenho ajuda a evitar duplicação?",
    "answer": "Usar chave de idempotência e deduplicação no servidor, quando apropriado.. identidade estável da intenção permite detectar repetição da operação."
  },
  "16": {
    "ask": "Em lógica proposicional clássica, a negação de P→Q equivale a:",
    "answer": "P∧¬Q.. o único contraexemplo é antecedente verdadeiro e consequente falso."
  },
  "17": {
    "ask": "Qual enunciado sobre LGPD e consentimento está correto?",
    "answer": "Consentimento é uma das bases legais e o enquadramento depende do contexto e da categoria de dados.. análise da hipótese legal requer finalidade, categoria e situação."
  },
  "18": {
    "ask": "Uma entidade pública precisa comprar serviço de TI e escolhe o fornecedor antes de definir critérios e necessidade. Qual a falha principal?",
    "answer": "Falta de fundamentação e planejamento da solução.. necessidades, alternativas e regras de contratação devem orientar a escolha."
  },
  "91": {
    "ask": "Uma captura mostra cabeçalhos Ethernet, IPv4 e TCP. Qual afirmação é adequada sobre o desencapsulamento no destino?",
    "answer": "Cada camada interpreta seu cabeçalho e entrega os dados úteis à camada superior. No receptor, as camadas processam os cabeçalhos pertinentes, entregando a unidade de dados à camada superior."
  },
  "92": {
    "ask": "Uma rede exige 28 endereços de hosts convencionais, além de rede e broadcast. Qual é o menor bloco IPv4 usual suficiente?",
    "answer": "/27. /27 possui 32 endereços totais e 30 de host convencional."
  },
  "93": {
    "ask": "Um serviço HTTPS usa nome correto e TCP/443 conecta, mas exibe erro de nome do certificado TLS. Qual hipótese é pertinente?",
    "answer": "Incompatibilidade entre domínio acessado e nomes cobertos pelo certificado. a validação do nome no certificado pode rejeitar certificado que não abrange o hostname solicitado."
  },
  "94": {
    "ask": "Um gestor exige evidência de que controles de terceiros são revisados. Em qual conjunto do CSF 2.0 a governança de fornecedores é discutida explicitamente?",
    "answer": "GV, cadeia de suprimentos de cibersegurança. O CSF 2.0 inclui gestão de riscos da cadeia de suprimentos dentro de Governar, embora medidas se conectem a várias funções."
  },
  "95": {
    "ask": "Uma assinatura digital válida de documento foi gerada usando a chave privada de um signatário. Qual chave é normalmente usada para verificar a assinatura?",
    "answer": "Chave pública correspondente. Assinaturas assimétricas são verificadas com a chave pública correspondente, em modelo e algoritmo adequados."
  },
  "96": {
    "ask": "Um processo possui RPO de 15 minutos e o último ponto restaurável está 2 horas antes da falha. O que isso indica?",
    "answer": "A meta de RPO provavelmente não foi atendida. O ponto de restauração disponível implica possível perda de aproximadamente 2 horas, superior ao objetivo de 15 minutos."
  },
  "97": {
    "ask": "Uma GPO vinculada a OU não foi aplicada a uma conta recém-movida. Qual primeira investigação é relevante?",
    "answer": "Escopo, herança, filtro de segurança e atualização de política. Aplicação de GPO depende de vinculação, herança, escopo, filtros e atualização, além de acesso ao domínio."
  },
  "98": {
    "ask": "Uma aplicação Linux consegue ler um arquivo, mas falha ao executá-lo. Qual distinção de permissões é essencial?",
    "answer": "Permissão de leitura não equivale a permissão de execução. Bits r e x têm propósitos diferentes; execução pode exigir x e outras condições, mesmo quando leitura é permitida."
  },
  "99": {
    "ask": "Uma VM tem snapshot do dia anterior e backups regulares em armazenamento externo. Qual elemento protege melhor contra perda do próprio datastore?",
    "answer": "Backup independente testado. Uma cópia independente e restaurável é mais resiliente à perda do datastore que snapshot armazenado no mesmo local."
  },
  "100": {
    "ask": "No enunciado 'Até o administrador conseguiu resolver o caso', a partícula 'até' pode pressupor que:",
    "answer": "A participação dele é apresentada como surpreendente ou enfática. 'Até' pode funcionar como operador argumentativo que destaca um caso surpreendente na escala sugerida pelo enunciador."
  },
  "101": {
    "ask": "Qual frase apresenta regência e crase corretas?",
    "answer": "O técnico assistiu à apresentação.. Assistir no sentido de presenciar rege 'a'; com artigo feminino, ocorre crase: assistiu à apresentação."
  },
  "102": {
    "ask": "Compare 'O servidor caiu porque faltou energia' com 'Faltou energia; portanto, o servidor caiu'. O segundo conectivo exprime:",
    "answer": "Conclusão. 'Portanto' é conclusivo e apresenta a queda do servidor como consequência da falta de energia."
  },
  "103": {
    "ask": "Um serviço é restaurado por reinício, mas a falha volta semanalmente. O trabalho de restaurar no momento e investigar a causa corresponde a:",
    "answer": "Incidente e problema, respectivamente. Incidente busca recuperar operação, enquanto problema procura causas e prevenção de recorrências."
  },
  "104": {
    "ask": "Em uma organização, a alta direção define prioridades de valor e risco, e a TI executa o plano. Qual alternativa está mais alinhada ao COBIT?",
    "answer": "Governança dirige e monitora; gestão realiza atividades. COBIT diferencia objetivos de governança e de gestão para tratar valor, risco e recursos de informação e tecnologia."
  },
  "105": {
    "ask": "Uma equipe Scrum muda a prioridade dos itens do Product Backlog. Quem é responsável pela ordenação do backlog para maximizar valor?",
    "answer": "Product Owner. No Scrum, o Product Owner é responsável pelo gerenciamento eficaz do Product Backlog, incluindo sua ordenação."
  },
  "106": {
    "ask": "Em um relacionamento N:N entre alunos e disciplinas, qual tabela é usualmente adequada?",
    "answer": "Matricula(aluno_id,disciplina_id) com FKs. Uma tabela associativa representa os pares e suas propriedades, podendo usar chave composta ou constraint UNIQUE."
  },
  "107": {
    "ask": "Uma consulta usa SELECT cliente, COUNT(*) FROM vendas GROUP BY cliente. O resultado representa:",
    "answer": "Uma linha por cliente agrupado com sua contagem de vendas. GROUP BY agrega linhas com mesmo valor de cliente; COUNT(*) conta as linhas de cada grupo."
  },
  "108": {
    "ask": "Uma transação T1 lê uma linha, outra transação a altera e confirma, e T1 relê valor diferente. Que fenômeno é descrito?",
    "answer": "Leitura não repetível. Leitura não repetível ocorre quando o mesmo registro é relido com valor diferente devido a confirmação concorrente."
  },
  "109": {
    "ask": "Uma história de usuário diz 'Como recepcionista, quero localizar agendamentos por data para organizar atendimento'. Qual complemento permite testá-la melhor?",
    "answer": "Critérios de aceitação objetivos para filtragem e ordenação. Critérios verificáveis descrevem condições e resultados esperados, reduzindo ambiguidade da história."
  },
  "110": {
    "ask": "Uma API recebe duas solicitações PUT idênticas para o mesmo recurso, sem efeitos colaterais adicionais. Qual propriedade é esperada semanticamente?",
    "answer": "Idempotência. PUT é definido como idempotente: múltiplas solicitações equivalentes devem produzir o mesmo efeito pretendido que uma."
  },
  "111": {
    "ask": "Uma falha ocorre somente quando dois serviços reais trocam mensagens, embora testes unitários passem. Qual classe de teste é mais indicada?",
    "answer": "Integração/contrato entre serviços. Verificação de integração e contratos revela problemas de interoperabilidade e formatos que testes isolados podem não detectar."
  },
  "112": {
    "ask": "Qual expressão é equivalente a P → Q?",
    "answer": "¬Q → ¬P. Contrapositiva é equivalente à implicação original; recíproca não é em geral."
  },
  "113": {
    "ask": "Uma urna tem 3 bolas vermelhas e 2 azuis. Sem reposição, qual a probabilidade de duas vermelhas em sequência?",
    "answer": "3/10. P(primeira vermelha)=3/5 e P(segunda vermelha | primeira)=2/4; produto=6/20=3/10."
  },
  "114": {
    "ask": "Uma progressão geométrica tem a1=3 e razão 2. Qual a4?",
    "answer": "24. a4=a1×r^(4−1)=3×2^3=24."
  },
  "115": {
    "ask": "Uma empresa diz que qualquer tratamento de dados exige consentimento. Qual avaliação é correta?",
    "answer": "Incorreta: a LGPD prevê outras bases legais além do consentimento. Consentimento é uma base legal, mas a LGPD prevê hipóteses adicionais, dependentes do contexto e da categoria de dados."
  },
  "116": {
    "ask": "Um termo de referência descreve como a execução será medida e paga. Qual elemento do TR está sendo trabalhado?",
    "answer": "Critérios de medição e pagamento. Na Lei 14.133, TR pode abranger modelo de execução e gestão e critérios de medição e pagamento, conforme objeto e condições."
  },
  "117": {
    "ask": "Ao responder pedido de informação pública, a administração busca preservar trechos com dados pessoais protegidos e disponibilizar os demais. Qual lógica está presente?",
    "answer": "Conciliação de transparência e privacidade. LAI e proteção de dados exigem análise concreta de restrições, proporcionalidade e possibilidades de acesso parcial."
  },
  "118": {
    "ask": "Um switch recebe quadro por porta 4 com MAC de origem ainda desconhecido. Qual atualização é típica em uma tabela MAC dinâmica?",
    "answer": "Associar MAC de origem à porta 4. Switches L2 aprendem endereço MAC de origem e porta de entrada; destino é usado para decisão de encaminhamento."
  },
  "119": {
    "ask": "Uma rede passa a registrar perdas e o emissor reduz a janela de congestionamento, apesar de o receptor ainda anunciar buffer amplo. O fenômeno envolve principalmente:",
    "answer": "Controle de congestionamento do caminho. cwnd reage às condições de rede; rwnd representa capacidade de recepção. O limite efetivo considera ambos."
  },
  "120": {
    "ask": "Uma tabela de rotas contém 10.1.0.0/16 e 10.1.5.0/24. Para o destino 10.1.5.22, qual rota será preferida pela correspondência de prefixo?",
    "answer": "10.1.5.0/24. A correspondência de prefixo mais longo privilegia /24 para o endereço 10.1.5.22."
  },
  "121": {
    "ask": "Um registro DNS foi alterado no autoritativo, mas clientes seguem recebendo o valor antigo durante algum tempo. Qual explicação é plausível?",
    "answer": "Cache em resolvedor recursivo ainda dentro do TTL. Resolvedores podem servir dados armazenados enquanto válidos conforme política de cache e TTL; a atualização não é instantânea para todos os clientes."
  },
  "122": {
    "ask": "Uma diretoria define apetite a risco, responsabilidades e supervisão de cibersegurança. Essa decisão representa sobretudo:",
    "answer": "Governança. Apetite, accountability e direção estratégica são elementos centrais da governança de riscos."
  },
  "123": {
    "ask": "Um serviço deve voltar em até duas horas e admite perda máxima de dados correspondente a dez minutos. Esses dois objetivos são, respectivamente:",
    "answer": "RTO e RPO. RTO corresponde à meta de tempo de recuperação; RPO à antiguidade máxima tolerável dos dados recuperados."
  },
  "124": {
    "ask": "Em uma abordagem Zero Trust, qual decisão é mais coerente?",
    "answer": "Verificar continuamente acesso conforme identidade, contexto e menor privilégio. Zero Trust evita confiança implícita por localização de rede e favorece verificação contextual, política e privilégio mínimo."
  },
  "125": {
    "ask": "Para aplicar uma política Windows a computadores de determinado setor, qual estratégia é mais coerente?",
    "answer": "Vincular GPO à OU correspondente e validar filtros. GPOs são vinculadas a sites, domínios e OUs com processamento por herança e filtros; o escopo correto é indispensável."
  },
  "126": {
    "ask": "Uma umask 027, aplicada a novos arquivos com permissões base 666, normalmente produz que permissão?",
    "answer": "640. Em modo convencional, arquivos 666 com umask 027 resultam 640 (rw-r-----); diretórios têm base 777 e resultam 750."
  },
  "127": {
    "ask": "Uma equipe cria imagem Docker que inclui credenciais em camadas do build. Qual problema permanece mesmo após remover o arquivo em etapa posterior?",
    "answer": "Segredos podem ficar no histórico/camadas da imagem. Segredos escritos durante build podem persistir em camadas/cache; use gerenciamento de segredos em vez de incluí-los na imagem."
  },
  "128": {
    "ask": "Uma organização tem RAID 1 em produção e nenhuma cópia externa. Qual risco segue sem mitigação?",
    "answer": "Exclusão acidental ou ransomware afetar ambas as cópias. RAID espelha alterações, inclusive exclusões ou criptografia maliciosa; backups independentes são necessários."
  },
  "129": {
    "ask": "Assinale a frase correta quanto à concordância:",
    "answer": "Mais de um técnico participou do plantão.. Em regra, 'mais de um' leva verbo no singular; demais frases usam haver e fazer temporais de forma impessoal."
  },
  "130": {
    "ask": "Em 'A equipe se dirigiu à unidade de saúde', por que ocorre crase?",
    "answer": "Há preposição exigida por dirigir-se a e artigo feminino antes de unidade. O verbo exige a preposição a e o substantivo feminino definido admite artigo a, havendo fusão a+a."
  },
  "131": {
    "ask": "Na frase 'Ele revisou o contrato. Depois, enviou-o à chefia', o pronome 'o' retoma:",
    "answer": "O contrato. O pronome oblíquo 'o' retoma o objeto direto já mencionado: o contrato."
  },
  "132": {
    "ask": "Em 'Os usuários que receberam o aviso compareceram', a ausência de vírgulas na oração relativa indica, em geral:",
    "answer": "Valor restritivo: um subconjunto de usuários. Oração relativa sem vírgulas tende a restringir o referente; com vírgulas, seria explicativa."
  },
  "133": {
    "ask": "A equipe restaura rapidamente um serviço e cria investigação da causa raiz. Qual indicador faria mais sentido para a fase de incidente?",
    "answer": "Tempo para restauração do serviço. O objetivo imediato de incidentes é restaurar o serviço; métricas de tempo e qualidade da restauração são pertinentes."
  },
  "134": {
    "ask": "Uma diretoria avalia se investimentos de TI entregam valor e respeitam riscos aceitos. Qual dimensão está mais diretamente evidenciada?",
    "answer": "Objetivos de governança. A supervisão de valor, riscos e alinhamento estratégico é responsabilidade de governança."
  },
  "135": {
    "ask": "Uma iniciativa de PDTI foi concluída, mas não produz o benefício previsto. Qual avaliação é mais útil?",
    "answer": "Confrontar indicador de resultado com meta de negócio. Conclusão de atividade não demonstra benefício; é preciso medir resultados em relação às necessidades e metas."
  },
  "136": {
    "ask": "Um serviço atingiu disponibilidade mensal de 99,8%, mas seu SLO era de 99,9%. Qual interpretação é correta?",
    "answer": "O resultado ficou abaixo do objetivo. Disponibilidade observada (SLI) de 99,8% ficou 0,1 ponto percentual abaixo da meta de 99,9%."
  },
  "137": {
    "ask": "Uma aplicação só confirma a movimentação financeira quando débito e crédito concluem. Essa garantia remete especialmente a:",
    "answer": "Atomicidade. Atomicidade torna as operações uma unidade transacional com commit ou rollback."
  },
  "138": {
    "ask": "Um índice pode acelerar leituras, mas há custo adicional. Qual alternativa descreve esse trade-off?",
    "answer": "Índices exigem armazenamento e manutenção nas escritas. Índices ocupam espaço e devem ser atualizados conforme inserções, modificações e exclusões, o que exige planejamento."
  },
  "139": {
    "ask": "Uma relação está na 1FN, mas um atributo não-primo depende apenas de parte de uma chave candidata composta. Qual forma normal é violada?",
    "answer": "2FN. A 2FN requer ausência de dependência parcial de atributo não-primo em relação a chave candidata composta."
  },
  "140": {
    "ask": "Uma consulta JOIN entre pedidos e itens retorna o valor total de um pedido repetido em cada linha de item. Qual cuidado é necessário antes de somar?",
    "answer": "Controlar granularidade para evitar dupla contagem. Junção 1:N multiplica linhas da entidade pai, o que pode duplicar agregações se não houver pré-agregação/estratégia apropriada."
  },
  "141": {
    "ask": "Um teste verifica o método 'calcularDesconto' isolando dependências externas com mocks. Em geral, trata-se de:",
    "answer": "Teste de unidade. Teste de unidade verifica comportamento de unidade pequena isolando dependências conforme escopo."
  },
  "142": {
    "ask": "Uma API expõe PATCH para alterar parte de recurso. Qual afirmação é correta?",
    "answer": "PATCH não é necessariamente idempotente; depende da semântica da operação. PATCH aplica alterações parciais e a idempotência depende do formato e operação; diferentemente de PUT, não é uma garantia geral."
  },
  "143": {
    "ask": "Duas pessoas alteram a mesma linha de um arquivo em branches diferentes. Que situação pode surgir ao mesclar?",
    "answer": "Conflito de merge a resolver. Alterações concorrentes incompatíveis podem exigir resolução manual de conflitos ao integrar branches."
  },
  "144": {
    "ask": "Qual é a contrapositiva de 'Se há energia, o servidor liga'?",
    "answer": "Se o servidor não liga, então não há energia. P→Q equivale a ¬Q→¬P. A contrapositiva nega e inverte antecedente e consequente."
  },
  "145": {
    "ask": "A negação da frase 'O sistema está online e o backup terminou' é:",
    "answer": "O sistema não está online ou o backup não terminou. Lei de De Morgan: ¬(P∧Q) é ¬P∨¬Q."
  },
  "146": {
    "ask": "Dois eventos independentes têm probabilidades de 0,4 e 0,5. Qual a probabilidade de ambos ocorrerem?",
    "answer": "0,2. Para eventos independentes, P(A∩B)=P(A)×P(B)=0,4×0,5=0,2."
  },
  "147": {
    "ask": "Quatro pessoas disputarão primeiro e segundo lugar. Quantos pares ordenados de vencedores são possíveis?",
    "answer": "12. Escolhas ordenadas sem repetição: 4 opções para 1º e 3 para 2º, resultando 4×3=12."
  },
  "148": {
    "ask": "Um órgão trata dados pessoais para executar política pública com competência legal. Qual afirmação sobre bases legais é correta?",
    "answer": "Consentimento não é a única hipótese, e a finalidade pública precisa ser justificada. A LGPD prevê bases e regras próprias de tratamento pelo poder público; finalidade, necessidade e transparência permanecem importantes."
  },
  "149": {
    "ask": "Uma empresa contrata prestador para processar dados seguindo instruções documentadas. Sem decidir finalidades, o prestador tende a ser:",
    "answer": "Operador. Operador realiza tratamento em nome do controlador, embora papéis dependam das decisões efetivas sobre operações."
  },
  "150": {
    "ask": "Uma contratação de serviço de TI foi realizada e o órgão precisa acompanhar cumprimento das obrigações. Que função é essencial?",
    "answer": "Fiscalização/gestão contratual com registro de ocorrências. Acompanhamento e fiscalização verificam execução conforme contrato, com registros e providências quando necessário."
  },
  "151": {
    "ask": "Um pedido de acesso versa sobre gasto público, mas documento anexo contém dados pessoais não necessários à resposta. Qual conduta inicial é razoável?",
    "answer": "Examinar acesso ao gasto e proteger dados pessoais dispensáveis. Deve-se equilibrar transparência de gastos com preservação de dados pessoais e avaliar formas de acesso parcial."
  },
  "152": {
    "ask": "O gateway responde ping e o DNS resolve o nome, mas o servidor retorna HTTP 503. Que conclusão inicial é mais defensável?",
    "answer": "A camada HTTP informou indisponibilidade; investigar aplicação e backend. Resposta HTTP 503 pressupõe comunicação com um servidor ou intermediário e direciona a investigação à disponibilidade do serviço."
  },
  "153": {
    "ask": "Ao calcular a sumarização de 192.168.20.0/24 e 192.168.21.0/24 contíguas e alinhadas, qual prefixo cobre exatamente ambas?",
    "answer": "192.168.20.0/23. Duas redes /24 contíguas alinhadas em fronteira par podem ser agregadas em um /23 (512 endereços)."
  },
  "154": {
    "ask": "Após isolar uma máquina comprometida, o time apaga seus registros antes de documentar o evento. Qual problema principal?",
    "answer": "Dificuldade de investigação e perda de evidência. Eliminar dados antes de coleta e documentação pode comprometer análise, auditoria e responsabilização."
  },
  "155": {
    "ask": "Uma conta terceirizada continua ativa após o encerramento do contrato. Qual medida combina governança e controle de acesso?",
    "answer": "Revisão periódica de contas e processo de desligamento com responsáveis. Políticas de ciclo de vida de identidades com responsabilidades e execução de revogação reduzem acessos indevidos."
  },
  "156": {
    "ask": "Um cliente não encontra controlador de domínio apesar de ter IP e gateway válidos. Que serviço deve ser checado especialmente para localização do AD?",
    "answer": "DNS com registros SRV do domínio. AD depende fortemente de DNS para localizar controladores e serviços; configuração DNS inadequada causa falhas de ingresso e login."
  },
  "157": {
    "ask": "Um daemon Linux falha ao abrir arquivo e o log mostra EACCES. Qual hipótese imediata é mais consistente?",
    "answer": "Permissões/ACL ou política de segurança negaram acesso. EACCES indica acesso negado; verifique dono, permissões, ACL, SELinux/AppArmor e contexto efetivo."
  },
  "158": {
    "ask": "Leia: 'A coordenadora conversou com a médica sobre sua avaliação.' Qual ambiguidade está presente na expressão 'sua avaliação'?",
    "answer": "Não está explícito se a avaliação pertence à coordenadora ou à médica. O possessivo 'sua' pode retomar mais de um referente feminino no contexto. Reescrever como 'avaliação da médica' ou 'avaliação da coordenadora' elimina a ambiguidade, conforme a intenção."
  },
  "159": {
    "ask": "Qual reescrita é mais apropriada para comunicação técnica objetiva?",
    "answer": "O aplicativo apresentou erro 503 às 9h; a equipe iniciou análise dos logs.. Relato objetivo registra fato observável, horário e ação, evitando julgamentos vagos ou linguagem coloquial."
  },
  "160": {
    "ask": "O SLA estabelece prazo de atendimento, o SLO uma meta de tempo e o SLI registra o desempenho. Qual item é a medida efetivamente observada?",
    "answer": "SLI. SLI é métrica observável do serviço; SLO estabelece valor-alvo; SLA documenta compromisso entre partes."
  },
  "161": {
    "ask": "Há dois projetos: A entrega benefício alto com risco baixo; B entrega benefício incerto com risco elevado. Qual decisão é mais técnica?",
    "answer": "Comparar valor, risco, recursos e prioridades explícitas antes de escolher. Priorizar demanda critérios explícitos e análise de custo, benefício, urgência, riscos e capacidade de execução."
  },
  "162": {
    "ask": "Uma consulta conta pacientes após JOIN com 3 exames por paciente. Qual expressão evita contar o mesmo paciente várias vezes?",
    "answer": "COUNT(DISTINCT paciente.id). COUNT(DISTINCT) elimina repetições de identificadores no resultado, evitando inflar o número de pacientes."
  },
  "163": {
    "ask": "Uma aplicação usa transações sem coordenação e duas sessões atualizam a mesma linha. Que recurso pode ajudar a proteger a consistência?",
    "answer": "Controle de concorrência e isolamento apropriado. Transações, locks/controle multiversão e nível de isolamento devem refletir regras de negócio e conflitos possíveis."
  },
  "164": {
    "ask": "Uma história de usuário foi implementada mas não há critério para confirmar o resultado. Qual artefato ajuda a estabelecer o comportamento esperado?",
    "answer": "Critérios de aceite/testes verificáveis. Critérios de aceite descrevem resultados que podem ser demonstrados em testes ou revisão com partes interessadas."
  },
  "165": {
    "ask": "Um cliente repete POST de criação após timeout e gera pedido duplicado. Qual mecanismo pode reduzir esse problema?",
    "answer": "Chave de idempotência com deduplicação no servidor. Uma chave de idempotência estável permite identificar repetição da mesma intenção e evitar duplicação de operações de criação."
  },
  "166": {
    "ask": "Qual é a contrapositiva de “Se N então D”?",
    "answer": "Se não D, então não N. A contrapositiva de N→D é ¬D→¬N; a recíproca e a inversa não são equivalentes gerais."
  },
  "167": {
    "ask": "Um evento de falha tem probabilidade 0,1 por execução, independentemente entre duas execuções. Qual a chance de não haver falha nas duas?",
    "answer": "0,81. Chance de não falha é 0,9 em cada execução; P(sem falha em ambas)=0,9²=0,81."
  },
  "168": {
    "ask": "Um atendimento municipal recebe dados pessoais para prestar serviço específico. Qual prática melhor demonstra conformidade?",
    "answer": "Informar finalidade e tratar somente dados necessários com controles proporcionais. Finalidade, adequação, necessidade e segurança orientam o tratamento público, observando a base legal pertinente."
  },
  "169": {
    "ask": "Em contratação de TI, a equipe escolheu solução tecnológica antes de identificar a necessidade pública. Qual correção é indicada?",
    "answer": "Caracterizar problema, comparar alternativas no planejamento e justificar solução. Planejamento começa por necessidade e alternativas; a seleção e especificação devem ser justificadas conforme legislação aplicável."
  }
};
