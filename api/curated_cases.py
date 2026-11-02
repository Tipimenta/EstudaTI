"""18 questões autorais orientadas por cenários — não reproduzem questões de banca.

Alternativas explicadas individualmente. Sem geração aleatória de gabarito.
Não modifica questões, comentários, estatísticas ou cartões existentes.
"""
import json
from question_diversity import canonical_fingerprint

# disciplina, trecho de título da aula para vínculo, enunciado, alternativas,
# índice correto, comentário geral, análise de cada alternativa.
CASES=[
('RED','Diagnóstico de rede',
 'Uma estação resolve corretamente o nome do servidor para seu IPv4, mas não completa a conexão TCP na porta 443. Qual procedimento isola melhor o problema?',
 ['Trocar imediatamente o servidor DNS','Testar rota, conectividade e acesso TCP à porta 443','Limpar o cache de impressão','Mudar o domínio do computador'],1,
 'A resolução DNS já funcionou; o próximo teste deve avaliar comunicação IP e estabelecimento de TCP com a porta específica.',
 ['A resposta DNS foi obtida; trocar DNS não isola a falha na conexão.','É o procedimento adequado para distinguir indisponibilidade de rede, filtragem e serviço.','O subsistema de impressão não explica falha de conexão HTTPS.','Alterar vínculo ao domínio não é um teste inicial proporcional ao sintoma.']),
('RED','Sub-redes',
 'Um administrador reserva a rede IPv4 192.168.50.64/26. Desconsiderando rede e broadcast, quantos endereços são utilizáveis por hosts?',
 ['30','62','64','126'],1,
 'Máscara /26 deixa 6 bits de host: 2^6 = 64 endereços, dos quais 62 são tradicionalmente atribuíveis a hosts.',
 ['30 corresponde ao espaço de /27, não /26.','62 é o total de 64 menos rede e broadcast.','64 é o total incluindo rede e broadcast.','126 é a quantidade típica de hosts em /25.']),
('SEG','continuidade',
 'Uma clínica precisa perder no máximo 15 minutos de alterações do RIS após um desastre. Qual indicador descreve diretamente esse limite?',
 ['RTO de 15 minutos','RPO de 15 minutos','SLA de disponibilidade anual','MTTR de 15 minutos'],1,
 'RPO representa a perda máxima tolerável de dados medida em tempo; RTO é o prazo para restaurar o serviço.',
 ['RTO limita a duração da interrupção, não a perda temporal de dados.','RPO de 15 minutos impõe recuperação até um ponto com no máximo 15 minutos de dados perdidos.','SLA estabelece compromissos de serviço, não necessariamente o ponto de recuperação.','MTTR mede tempo médio de reparo e não especifica perda aceitável de dados.']),
('SEG','Matriz de acesso',
 'Um colaborador precisa consultar laudos, mas não alterar usuários nem configurar servidores. Qual controle melhor expressa o princípio do menor privilégio?',
 ['Adicionar ao grupo de administradores','Fornecer acesso somente de consulta aos laudos necessários','Compartilhar uma conta administrativa com auditoria','Desabilitar autenticação multifator para reduzir atrasos'],1,
 'Menor privilégio limita permissões às funções justificadas, preferencialmente usando papéis e autenticação individual.',
 ['Administrador oferece privilégios incompatíveis com a necessidade.','Acesso de leitura restrito à função é a opção proporcional.','Conta compartilhada reduz responsabilização individual e aumenta risco.','Remover MFA não implementa menor privilégio e fragiliza segurança.']),
('SO','permissões',
 'Um processo Linux cria arquivo regular com modo base 666 e umask 027. Qual será a permissão usual resultante?',
 ['777','640','750','600'],1,
 'O modo final é o modo base com os bits da máscara retirados: 0666 & ~0027 = 0640.',
 ['777 concederia execução que não faz parte da criação padrão de arquivo regular.','640 permite leitura e escrita ao proprietário, leitura ao grupo e nada aos demais.','750 é mais compatível com diretórios e inclui execução, não derivada de 666.','600 corresponderia a outra máscara de criação.']),
('SO','domínio Windows',
 'Computadores ingressados no domínio têm acesso à internet, mas não localizam controladores de domínio para aplicar políticas. Que serviço deve ser validado primeiro?',
 ['DNS interno e registros SRV do Active Directory','Driver da placa de vídeo','Sincronização com impressora USB','Resolução de tela do usuário'],0,
 'O Active Directory depende do DNS para localizar serviços como LDAP/Kerberos por registros SRV; acesso à internet não garante DNS AD correto.',
 ['Os registros SRV e os resolvedores configurados são centrais à descoberta do DC.','O driver gráfico não determina a descoberta de controladores de domínio.','Dispositivos USB locais não influenciam a resolução DNS do AD.','Resolução do monitor não interfere na localização de servidores AD.']),
('POR','Crase',
 'Qual redação emprega crase de acordo com a norma-padrão no contexto de encaminhamento institucional?',
 ['Encaminhou o relatório à diretoria responsável.','Encaminhou o relatório à todos os setores.','Encaminhou o relatório à partir de hoje.','Encaminhou o relatório à uma equipe.'],0,
 'A preposição exigida por encaminhar a, somada ao artigo feminino de diretoria, justifica à diretoria.',
 ['A fusão de a + a antes de diretoria feminina determina a crase.','Todos é masculino plural; não há artigo feminino a para fundir.','Antes de verbo no infinitivo, como partir, não se usa crase.','Em regra, não há artigo definido feminino antes de uma, artigo indefinido.']),
('POR','Coesão',
 'Em uma comunicação formal, qual construção expressa concessão e mantém correção gramatical?',
 ['Embora houve falhas, o serviço foi restaurado.','Embora tenha havido falhas, o serviço foi restaurado.','Apesar houveram falhas, o serviço foi restaurado.','Conquanto houve falhas, o serviço foi restaurado.'],1,
 'Embora normalmente introduz oração concessiva com verbo no subjuntivo. Haver, no sentido de existir, é impessoal.',
 ['O indicativo houve após embora não é a estrutura adequada nesta frase.','Tenha havido usa subjuntivo e conserva haver impessoal.','Apesar exige estrutura apropriada e houveram é inadequado para haver existencial.','Conquanto também introduz concessão e pede subjuntivo nesse uso.']),
('BD','JOIN',
 'Uma tabela clientes tem três linhas, mas apenas um cliente possui dois pedidos. Em LEFT JOIN de clientes com pedidos, qual expressão conta corretamente pedidos por cliente, retornando zero para quem não comprou?',
 ['COUNT(*)','COUNT(pedidos.id)','COUNT(clientes.id)','SUM(clientes.id)'],1,
 'Em LEFT JOIN existe uma linha nula do lado de pedidos para cada cliente sem pedido; COUNT(pedidos.id) ignora NULL.',
 ['COUNT(*) conta a linha preservada do LEFT JOIN, gerando 1 para cliente sem pedido.','COUNT(pedidos.id) ignora NULL e retorna zero quando não existem pedidos.','COUNT(clientes.id) conta a linha do cliente mesmo quando o pedido é nulo.','Somar IDs de clientes não mede número de pedidos.']),
('BD','isolamento',
 'A transação T1 altera o saldo, mas ainda não executou COMMIT. T2 lê esse valor e T1 depois faz ROLLBACK. Qual anomalia ocorreu?',
 ['Leitura suja (dirty read)','Leitura fantasma apenas','Serialização obrigatória','Deadlock necessariamente'],0,
 'A leitura de dados não confirmados, posteriormente desfeitos, caracteriza dirty read.',
 ['T2 leu um valor ainda não confirmado e desfeito por rollback.','Leitura fantasma envolve mudanças no conjunto de linhas que atende a um predicado.','Uma execução serializável não permite essa observação inconsistente.','Deadlock exige espera circular entre transações, não descrita no cenário.']),
('ENG','idempotência',
 'Uma API expõe PUT /usuarios/42 para substituir o recurso por um mesmo documento. Qual característica de PUT deve orientar o tratamento de repetidas requisições idênticas?',
 ['Cada repetição precisa criar novo usuário','Repetir a mesma operação deve preservar o efeito pretendido após a primeira aplicação','PUT nunca pode produzir erro HTTP','PUT substitui somente um campo por definição'],1,
 'Idempotência significa que repetir uma operação tem o mesmo efeito pretendido que aplicá-la uma vez; não significa necessariamente resposta idêntica.',
 ['Gerar um novo recurso a cada repetição contraria a idempotência de PUT.','O estado final pretendido não deve mudar com repetições equivalentes.','Métodos idempotentes também podem retornar erros HTTP.','PUT normalmente representa substituição/definição do estado do recurso, não patch por definição.']),
('ENG','Testes',
 'Um serviço de agendamento recebe horário inválido e deve responder HTTP 422 sem criar registro. Qual teste verifica melhor esse requisito?',
 ['Medir apenas a cor do botão de agendar','Enviar payload inválido, conferir HTTP 422 e ausência de registro persistido','Testar somente a inicialização do servidor','Conferir se o CSS foi minificado'],1,
 'Um teste de integração/contrato deve verificar resposta e efeito de negócio, incluindo ausência de gravação indevida.',
 ['A aparência não avalia o contrato de validação da API.','Confere simultaneamente retorno HTTP esperado e ausência de efeito colateral.','Inicialização não testa a validação da requisição.','Minificação do CSS é irrelevante para o contrato do endpoint.']),
('GOV','SLA',
 'Uma equipe estabelece internamente meta de latência de 300 ms e assume com cliente penalidades por disponibilidade inferior a 99,5%. Como se classificam meta interna e compromisso contratual, respectivamente?',
 ['SLA e SLO','SLO e SLA','SLA e incidente','Evento e problema'],1,
 'SLO é objetivo de nível de serviço; SLA é acordo com compromissos e, eventualmente, consequências contratuais.',
 ['Inverte os conceitos e confunde objetivo interno com contrato.','SLO para a meta; SLA para o compromisso com cliente.','Incidente é interrupção ou redução de qualidade, não meta interna.','Evento é ocorrência monitorada e problema é causa ou causa potencial de incidentes.']),
('GOV','incidente, problema',
 'Depois de uma falha recorrente de autenticação, a equipe restaura o serviço e abre investigação da causa raiz. Qual distinção é mais adequada?',
 ['Restauração é gerenciamento de incidentes; investigação da causa é gerenciamento de problemas','Restauração é necessariamente mudança normal; investigação é incidente','Ambas as atividades são apenas gerenciamento de ativos','Qualquer falha recorrente deve ser ignorada se o serviço voltou'],0,
 'Na gestão de serviços, incidente busca restaurar operação rapidamente; problema investiga causas e previne recorrência.',
 ['Diferencia resolução rápida do incidente e trabalho de causa raiz do problema.','Mudança pode integrar a solução, mas restauração e investigação não se confundem com esse fluxo.','Gerenciamento de ativos não substitui os processos descritos.','Recorrência justifica investigação e tratamento de risco.']),
('LEG','LGPD',
 'Uma instituição pública solicita dados pessoais adicionais sem necessidade demonstrada para determinado serviço. Qual princípio da LGPD é diretamente questionado?',
 ['Necessidade','Publicidade irrestrita','Autorização tácita de compartilhamento','Livre comercialização de dados'],0,
 'O princípio da necessidade limita o tratamento ao mínimo necessário para as finalidades legítimas e específicas, conforme a LGPD.',
 ['Coletar mais dados do que o necessário contraria diretamente esse princípio.','A LGPD não cria princípio de publicidade irrestrita de dados pessoais.','Não existe autorização tácita geral para compartilhamento por serviço público.','A comercialização de dados não é um princípio que legitima excesso de coleta.']),
('LEG','ETP',
 'Em contratação pública de solução de TI regida pela Lei 14.133/2021, qual documento analisa o problema e avalia alternativas para fundamentar a solução?',
 ['Estudo Técnico Preliminar (ETP)','Atestado de capacidade técnica do fornecedor','Nota fiscal de pagamento','Registro final de recebimento definitivo'],0,
 'O ETP é parte do planejamento e descreve a necessidade, alternativas e viabilidade; sua exigência e conteúdo dependem das normas e hipóteses aplicáveis.',
 ['ETP é o instrumento de planejamento voltado à necessidade e à melhor solução.','Atestado comprova capacidades do proponente, não substitui estudo da necessidade.','Nota fiscal pertence à execução/pagamento, após contratação.','Recebimento definitivo ocorre na execução e não cumpre função de planejamento.']),
('LOG','Probabilidade',
 'Dois eventos independentes possuem probabilidades P(A)=0,6 e P(B)=0,3. Qual a probabilidade de ambos ocorrerem?',
 ['0,18','0,90','0,30','0,50'],0,
 'Pela independência, P(A interseção B) = P(A) × P(B) = 0,6 × 0,3 = 0,18.',
 ['Multiplicar as probabilidades dos eventos independentes resulta em 0,18.','0,90 é soma, inadequada à interseção de eventos independentes.','0,30 representa somente a probabilidade do evento B.','0,50 não decorre da operação de interseção neste caso.']),
('LOG','Condicional',
 'Qual expressão é logicamente equivalente à negação da proposição “Se P, então Q”?',
 ['P e não Q','Não P ou Q','Se Q, então P','Não P e não Q'],0,
 'P implica Q equivale a não P ou Q; sua negação é P e não Q.',
 ['É a única combinação que torna a implicação falsa.','Não P ou Q é a própria implicação, não sua negação.','A conversa Q implica P não é equivalente à negação.','Não P e não Q torna a implicação verdadeira por antecedente falso.']),
]


def seed(db,nowstr):
    # Usa o título específico de uma aula real da mesma matéria, evitando associar
    # todas as questões importadas à primeira aula da disciplina.
    subjects={r['code']:r['id'] for r in db.execute('SELECT id,code FROM subjects')}
    existing={canonical_fingerprint(r['question'],json.loads(r['choices_json'])) for r in db.execute('SELECT question,choices_json FROM questions')}
    for code,hint,stem,choices,correct,explanation,reasoning in CASES:
        if code not in subjects:raise RuntimeError('Disciplina inexistente: '+code)
        candidates=db.execute('SELECT id,title FROM topics WHERE subject_id=? ORDER BY id DESC',(subjects[code],)).fetchall()
        lesson=next((t for t in candidates if hint.casefold() in t['title'].casefold()),None)
        if not lesson:raise RuntimeError(f'Aula não localizada para {code}: {hint}')
        key=canonical_fingerprint(stem,choices)
        if key in existing:continue
        if len(reasoning)!=len(choices):raise RuntimeError('Número incorreto de justificativas para alternativas')
        db.execute('''INSERT INTO questions(topic_id,question,choices_json,correct_index,explanation,
                  choice_rationales_json,fingerprint,origin,review_status,question_type)
                  VALUES(?,?,?,?,?,?,?,?,?,?)''',
                  (lesson['id'],stem,json.dumps(choices,ensure_ascii=False),correct,explanation,
                   json.dumps({chr(65+i):r for i,r in enumerate(reasoning)},ensure_ascii=False),
                   key,'autoral','revisada','multipla'))
        existing.add(key)
