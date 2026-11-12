"""Aprofundamentos editoriais de alta precisão para temas-base do Estuda 2.2.

Camada de apresentação: NÃO altera lessons, respostas ou progresso no Neon.
Cada entrada pertence a um tópico identificado por disciplina + nome estável.
A revisão do currículo completo permanece incremental, nunca presumida concluída.
"""
from __future__ import annotations


REVISION = "2.2-editorial-03"

SUPPLEMENTS: dict[tuple[str, str], str] = {
    ("Redes de Computadores", "Modelo OSI e TCP/IP"): """
## Aprofundamento 2.2 — leitura binária do endereço MAC

### O que os dois primeiros bits do primeiro octeto significam?

Observe o MAC de exemplo `02:1A:2B:3C:4D:5E`. Cada par é um octeto hexadecimal: `02` corresponde ao binário `00000010`. Além da divisão clássica de 24 bits do identificador organizacional (MA-L) e 24 bits de extensão administrada pelo titular, **os dois bits menos significativos do primeiro octeto** têm um significado especial em endereços Ethernet de 48 bits.

- **Bit I/G**, o de menor valor (posição 0, máscara hexadecimal `01`): valor 0 representa endereço **individual/unicast**, destinado a uma interface; valor 1 representa endereço de **grupo**, como multicast ou broadcast.
- **Bit U/L**, o segundo de menor valor (posição 1, máscara `02`): valor 0 indica endereço de administração **universal**; valor 1 indica administração **local**. Isso não prova qual fabricante produziu o equipamento.

Faça a conta: `02` hexadecimal = `00000010` binário. O último bit (à direita) é 0: individual. O penúltimo é 1: local. Compare `00` = `00000000` (individual, universal) e `01` = `00000001` (grupo). O broadcast Ethernet é `FF:FF:FF:FF:FF:FF`: todos os bits em 1. Ele é um tipo especial de endereço de grupo, usado para difundir um quadro no segmento apropriado.

### Como saber qual é o MAC do destinatário?

Considere computador `192.168.10.20/24` e servidor `192.168.20.30/24`. Os IPs estão em redes diferentes. O pacote IP continua endereçado ao servidor, mas o **primeiro quadro Ethernet** vai ao MAC do **gateway local**, não ao MAC remoto. No IPv4, a estação pode usar ARP para descobrir o MAC do gateway; o switch aprende a localização dos MACs observando o endereço **de origem** dos quadros recebidos. A tabela do switch associa MAC, porta e, conforme o equipamento, VLAN. Já a cache ARP da estação associa IPv4 e MAC: são tabelas diferentes.

### Exceção que cai em concurso

A regra "três octetos do fabricante + três da placa" explica blocos MA-L, mas não todos os endereços. A IEEE também atribui MA-M (prefixo de 28 bits) e MA-S (36 bits). Além disso, celulares e notebooks podem usar endereços aleatórios/localmente administrados para privacidade. Não tente identificar fabricante ou pessoa pela metade inicial de qualquer MAC sem verificar o contexto.

**Teste de compreensão:** Em `02:11:22:33:44:55`, o `02` sinaliza endereço individual ou de grupo? Universal ou local? Resposta: individual e local, pois seus bits menos significativos são 0 e 1, respectivamente. Dizer que `11:22` identifica obrigatoriamente o fabricante seria injustificado.

**Referências técnicas:** IEEE Registration Authority — *MAC Addresses*; RFC 9542, sobre uso de parâmetros IEEE.
""",
    ("Língua Portuguesa", "Interpretação de textos"): """
## Aprofundamento 2.2 — provar uma inferência e rejeitar exageros

### Separe quatro camadas da leitura

**Assunto** é a área geral, como digitalização da saúde. **Tese** é a posição principal defendida: "a digitalização melhora a organização, desde que haja treinamento". **Argumento** é a razão usada para sustentá-la: "sem treinamento, a equipe pode registrar dados incorretamente". **Evidência** é um fato ou dado oferecido para sustentar o argumento, como um resultado comparativo observado. Uma evidência não vira uma tese só porque aparece em destaque.

Considere: "Duas unidades reduziram o tempo de cadastro após adotar o novo sistema. Mesmo assim, alguns atendimentos sofreram atrasos por falta de treinamento." Podemos concluir que **houve redução de tempo em duas unidades**, que **atrasos ainda ocorreram em certos atendimentos** e que o texto aponta **falta de treinamento** como uma causa desses atrasos. Não podemos concluir que **todas as unidades** do país melhoraram ou que **todos os atrasos** têm essa causa.

### Palavras que a banca altera

- **Alguns** significa pelo menos um no uso lógico habitual; não equivale a todos nem a "poucos".
- **Somente A faz B** restringe os agentes de B a A; não significa automaticamente que todo A faça B.
- **Pode acontecer** indica possibilidade; **deve acontecer** pode expressar obrigação ou forte expectativa, conforme o contexto.
- **Não foi demonstrado** não é o mesmo que **foi demonstrado que não existe**.

### Resolva comparando alternativa e texto

Enunciado: "Após a atualização, 80% dos relatórios foram entregues no prazo". Alternativa: "A atualização garantiu pontualidade de todos os relatórios". Identifique o quantificador **80%**, que deixa uma parcela fora da pontualidade; a alternativa troca um resultado parcial por um universal. Logo, é incompatível.

**Treino:** "Nenhum dos três servidores apresentou erro durante o teste". É possível concluir que "não ocorrerá falha amanhã"? Não: o texto limita-se à observação do teste, não ao futuro. Uma alternativa pode estar correta no mundo real, mas não ser autorizada pelo texto apresentado.
""",
    ("Raciocínio Lógico", "Proposições e implicação"): """
## Aprofundamento 2.2 — condicional, contrapositiva e tabela-verdade sem decorar

Defina `P`: "o usuário tem permissão" e `Q`: "a aplicação libera o acesso". A frase "**Se P, então Q**" (`P → Q`) só é **falsa** quando P é verdadeira e Q é falsa: a promessa condicional foi descumprida. Se P for falsa, a frase não prometeu o que acontece, então o condicional material é considerado verdadeiro, mesmo que Q também seja falso. É uma regra de lógica proposicional, não uma previsão causal do mundo.

| P | Q | P → Q |
|---|---|---|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

A **contrapositiva** de `P → Q` é `¬Q → ¬P`: "se a aplicação não libera o acesso, então o usuário não tem permissão". As duas têm o mesmo valor lógico em todas as linhas da tabela. A **recíproca** `Q → P` ("se liberou, então tem permissão") não é equivalente: aplicações podem ter erro e liberar acesso indevido. A **inversa** `¬P → ¬Q` também não é equivalente em geral.

**Negação correta:** negar `P → Q` é afirmar `P ∧ ¬Q`: "o usuário tem permissão **e** a aplicação não libera". Não é "se não P, então não Q".

**Exemplo de prova:** "Se o backup foi testado, então há relatório de restauração". Sabemos que **não há relatório**. Pela contrapositiva, podemos concluir **que o backup não foi testado**, desde que a condicional seja premissa verdadeira do problema. Não confunda essa conclusão lógica com verificação real de uma organização: na realidade um relatório pode existir em outro lugar ou ter sido perdido.

**Confira sozinho:** Se `P=F` e `Q=V`, quanto vale `P → Q`? Verdadeiro. Qual é o único caso falso? `P=V` e `Q=F`.
""",
    ("Legislação e Governo Digital", "LGPD e administração pública"): """
## Aprofundamento 2.2 — identifique o agente e a finalidade antes da base legal

A **Lei 13.709/2018 (LGPD)** se aplica ao tratamento de dados pessoais nas hipóteses de seu âmbito de aplicação. O art. 5º diferencia: **dado pessoal**, informação relacionada a pessoa natural identificada ou identificável; **dado pessoal sensível**, categoria que inclui dados sobre saúde, genética e biometria vinculada a pessoa; **titular**, a pessoa a quem os dados se referem; **controlador**, quem toma decisões sobre o tratamento; **operador**, quem trata dados em nome do controlador. Não confunda "operador" com qualquer funcionário que digita dados: a classificação é jurídica e depende das responsabilidades no tratamento.

### Um caso comentado

Uma instituição pública coleta nome e dados cadastrais para agendar um atendimento. Pergunte: (1) qual é a **finalidade** específica? (2) quais dados são **necessários** para ela? (3) quem decide coleta, conservação e compartilhamento? (4) quem executa tratamento sob instruções? (5) qual hipótese legal permite cada operação? Dados de saúde exigem examinar o regime das informações sensíveis, não presumir que qualquer autorização genérica sirva.

**Consentimento não é solução automática**: a LGPD traz hipóteses legais diferentes para tratamento em geral e para dados sensíveis. No poder público, deve-se observar também o regime legal específico, finalidade pública e transparência pertinentes; a base depende do caso concreto. Coletar CPF "porque sempre pedimos" não demonstra necessidade.

### Identificação versus anonimização

Se um nome foi substituído por um código, mas existe tabela que permite reconectar código e pessoa, trata-se em geral de **pseudonimização**, não anonimização irreversível. Dados anonimizados, para os fins legais pertinentes, levam em conta meios técnicos razoáveis e disponíveis de reidentificação; retirar nome e CPF não basta automaticamente.

**Teste de compreensão:** Um prestador de serviço armazena dados conforme instruções documentadas da instituição. O prestador é necessariamente controlador só porque mantém o servidor? Não. Verifique quem decide finalidades e meios essenciais do tratamento.

**Referência para leitura:** Lei 13.709/2018, especialmente arts. 5º, 6º, 7º, 11 e 23, na redação vigente.
""",
    ("Governança e Gestão de TI", "ITIL, incidentes e mudanças"): """
## Aprofundamento 2.2 — três registros, três objetivos diferentes

**Incidente** é interrupção não planejada ou redução de qualidade de serviço. Sua prioridade costuma considerar **impacto** (quantas pessoas/processos afeta) e **urgência** (quanto tempo se pode esperar). O objetivo da prática de gestão de incidentes é restaurar o serviço com rapidez adequada. **Problema** é causa, ou possível causa, de um ou mais incidentes; a gestão de problemas busca reduzir probabilidade e impacto de reincidência. **Mudança** é adição, modificação ou remoção de algo que pode afetar serviços; precisa ser avaliada e controlada conforme o risco.

### Exemplo completo

Às 9h o sistema de agendamento deixa de responder. Registra-se incidente com horário, serviço afetado e impacto; a TI muda provisoriamente para um ambiente secundário, recuperando o atendimento. Isso é **contorno**, não prova de causa solucionada. Investiga-se, depois, uma conexão de banco esgotada: o registro de **problema** reúne evidências, causa confirmada ou hipótese e ações permanentes. Para alterar limites, código ou arquitetura, avalia-se uma **mudança** com janela, risco, testes e plano de retorno.

### O que confunde em provas

- Incidente encerrado não significa problema eliminado.
- Uma requisição de serviço ("preciso de acesso autorizado") não é automaticamente incidente.
- Banco de informações sobre itens de configuração (CMDB) não é sinônimo de inventário de hardware: relações e dependências de serviços importam.
- Um acordo SLA descreve compromissos de serviço; não garante que qualquer indisponibilidade terá culpa da TI sem analisar exceções e contrato.

**Exercício:** O serviço voltou após reiniciar o processo, mas cai toda semana. Qual a sequência? Restaurar e registrar incidente; investigar padrão e causa como problema; aplicar correção sob controle de mudança, verificando os resultados.
""",
    ("Sistemas Operacionais e Virtualização", "Administração Windows e Linux"): """
## Aprofundamento 2.2 — processo, serviço, thread e permissão na prática

Um **programa** é código armazenado; **processo** é uma instância em execução com recursos, memória virtual e identificador; **thread** é uma linha de execução que compartilha grande parte do espaço de endereçamento do processo. Um **serviço** é software executado para oferecer função de maneira contínua ou sob demanda; em Linux com systemd pode ser gerenciado por unidades de serviço, e no Windows pelo Gerenciador de Controle de Serviços. Ter um processo ativo **não prova** que o serviço responde ao usuário.

### Teste de uma falha sem adivinhar

Se uma aplicação não abre, separe: (1) rede alcança o host? (2) processo existe? (3) porta está escutando? (4) serviço responde ao protocolo esperado? (5) o usuário tem permissão? Em Linux, `systemctl status nome` mostra estado gerenciado; `journalctl -u nome` mostra registros pertinentes; `ss -lntp` ajuda a ver sockets TCP em escuta. Não use um comando como prova de todos os estágios. Log contém eventos registrados, mas sua ausência não prova que evento nunca ocorreu.

### Leia permissões sem decorar

`-rwxr-x---` significa arquivo comum (primeiro caractere `-`); dono `rwx` = 4+2+1=7; grupo `r-x` = 4+0+1=5; outros `---`=0. Portanto modo `750`. Em diretório, `x` significa atravessar/acessar entradas, não "executar diretório" como programa. O acesso também pode depender de ACLs, políticas MAC de segurança (SELinux/AppArmor), montagem e identidade efetiva.

**Cuidado:** VM executa sistema operacional convidado e pode compartilhar hardware via hipervisor; contêiner Linux compartilha kernel do host e isola processos. Snapshot local não substitui backup testado.

**Teste:** Se o processo está ativo e a porta 443 não escuta, reiniciar a placa de rede é a única solução? Não: investigue configuração de bind, erro de inicialização parcial, proxy ou serviço intermediário.
""",
    ("Segurança da Informação", "CIA, controle de acesso e autenticação"): """
## Aprofundamento 2.2 — transforme a tríade CID em um cenário de risco

**Confidencialidade** impede leitura não autorizada; **integridade** diz respeito a alteração ou destruição não autorizada; **disponibilidade** garante acesso oportuno conforme necessidades legítimas. Uma informação pode manter integridade e confidencialidade mas estar indisponível. Criptografia protege certos aspectos da confidencialidade, mas não é cópia de segurança nem garantia de serviço contínuo.

### Diferencie quatro termos

**Ativo:** informação, sistema ou processo que tem valor. **Ameaça:** causa potencial de evento indesejado, como falha elétrica ou agente malicioso. **Vulnerabilidade:** fraqueza explorável por ameaça, como equipamento sem manutenção ou senha reutilizada. **Risco:** possibilidade de consequência adversa, analisada considerando cenários, probabilidade e impacto. Instalar ferramenta não significa eliminar risco; é preciso verificar funcionamento e risco residual.

### Autenticação versus autorização

Ao entrar em um PACS, a senha ou chave de autenticação ajuda a determinar **quem você é**. Depois, as permissões de acesso determinam **quais exames e funções** você pode utilizar. O sistema pode autenticar corretamente um usuário e, ainda assim, apresentar exame de terceiro por falha de autorização. **MFA** usa fatores de categorias diferentes: algo que sabe (senha), que possui (chave/token) ou que é (biometria). Duas senhas não são dois fatores diferentes.

### Caso resolvido

Funcionário autenticado abre laudo de outro setor. A falha principal é de **autorização**, não de autenticação. Controles podem incluir políticas de menor privilégio, vinculação do recurso ao setor, teste negativo alterando identificador e auditoria. O teste deve verificar a negativa no servidor, pois ocultar um botão na interface não protege a API.

**Pegadinha:** Backup pode restabelecer disponibilidade após exclusão, mas não desfaz automaticamente um vazamento que já ocorreu. E HTTPS não impede que uma API devolva o laudo errado.
""",
    ("Banco de Dados e SQL", "Modelagem relacional e índices"): """
## Aprofundamento 2.2 — chave, cardinalidade e JOIN com contagem correta

Considere duas tabelas: `clientes(id, nome)` e `pedidos(id, cliente_id, total)`. `id` de clientes é chave primária: identifica cada linha. `cliente_id` em pedidos é chave estrangeira: referencia o cliente. Um cliente pode ter zero, um ou vários pedidos; cada pedido neste modelo está associado a um cliente. Isso define relação **um para muitos (1:N)**.

### Construa dados mínimos

Clientes: `(1, Ana)`, `(2, Bruno)`, `(3, Carla)`. Pedidos: `(10, 1, 100)`, `(11, 1, 50)`, `(12, 2, 80)`. Ana aparece duas vezes num `INNER JOIN`, Bruno uma, Carla nenhuma. Isso não é duplicação acidental: o resultado está na granularidade de **pedido**, não cliente.

`SELECT c.nome, COUNT(p.id) FROM clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id GROUP BY c.id,c.nome` devolve 2, 1 e 0. **Por que `COUNT(p.id)` e não `COUNT(*)`?** Porque o LEFT JOIN preserva uma linha de Carla com campos de pedido `NULL`; `COUNT(*)` contaria essa linha como 1. `COUNT(p.id)` ignora o `NULL`.

### Onde o índice ajuda?

Um índice B-tree em `pedidos(cliente_id)` pode ajudar a localizar pedidos do cliente. Mas é estrutura adicional: ocupa espaço e impõe trabalho em inserções/atualizações. O otimizador pode escolher varredura completa se espera retornar muitas linhas. **Índice não corrige relacionamento errado** e não garante consulta mais rápida em todas as situações.

### Anomalia de atualização

Se você copiar o telefone da Ana em cada pedido, atualizar um pedido e esquecer outro cria dados contraditórios. Separar `clientes` e `pedidos` evita essa repetição. É parte da motivação da normalização.

**Teste:** quantas linhas retorna um INNER JOIN de três pedidos com clientes? Três. Quantos clientes diferentes aparecem? Dois. Sem distinguir essas perguntas, um relatório pode mostrar indicadores incorretos.
""",
    ("Engenharia de Software", "Requisitos, testes e versionamento"): """
## Aprofundamento 2.2 — dos requisitos à publicação verificável

**Requisito funcional** descreve o que o sistema deve fazer. **Requisito não funcional** define qualidade ou restrição mensurável, como disponibilidade, desempenho ou proteção de dados. **Critério de aceite** é condição verificável para dizer que determinado comportamento foi entregue. Exemplo: "quando a recepção solicitar uma senha válida, o sistema deve registrar identificador único e apresentá-lo em até dois segundos sob carga definida".

### Um teste não é apenas clicar no botão

Para o fluxo de senha, teste: (1) opção válida gera senha única; (2) requisição repetida não gera duas senhas se a operação exigir idempotência; (3) usuário sem autorização recebe negativa; (4) falha na impressora não elimina silenciosamente o registro; (5) dois atendimentos simultâneos não recebem o mesmo identificador. Escreva entrada, condição inicial, resultado esperado e evidência para cada caso.

### Git e deploy são três momentos

`git add` prepara conteúdo para o commit (staging); `git commit` grava snapshot no histórico local; `git push` envia commits ao repositório remoto. Nenhum desses comandos **garante** que o site foi publicado. O pipeline CI pode executar testes e build; o deploy precisa terminar; e a verificação pós-publicação deve confirmar versão, endpoints e comportamento no ambiente real. Um commit com testes aprovados pode falhar no banco de produção por configuração incorreta.

### Exemplo de rastreabilidade

Requisito "somente médico autorizado vê o laudo" → critério de aceite "API devolve 403 ao atendente" → teste negativo com perfil de atendimento → evidência de resposta e registro de auditoria. A simples ausência de link no menu não satisfaz o requisito.

**Teste:** se GitHub contém a revisão 2.2, mas a Vercel apresenta versão antiga, o software está publicado? Não necessariamente. Confira SHA do deployment e teste a página real antes de anunciar conclusão.
""",
}

# Guias editoriais específicos — complementam, sem substituir, os nove originais.
from .guias_tecnicos import TECH_GUIDES
from .guias_gerais import GENERAL_GUIDES
if set(SUPPLEMENTS).intersection(TECH_GUIDES) or set(SUPPLEMENTS).intersection(GENERAL_GUIDES) or set(TECH_GUIDES).intersection(GENERAL_GUIDES):
    raise ValueError("Aprofundamento editorial duplicado")
SUPPLEMENTS.update(TECH_GUIDES)
SUPPLEMENTS.update(GENERAL_GUIDES)

from .restantes_portugues import GUIDES as EXTRA_PORTUGUES, SUBJECT as SUBJECT_PORTUGUES
from .restantes_logica import GUIDES as EXTRA_LOGICA, SUBJECT as SUBJECT_LOGICA
from .restantes_legislacao import GUIDES as EXTRA_LEGISLACAO, SUBJECT as SUBJECT_LEGISLACAO
from .restantes_governanca import GUIDES as EXTRA_GOVERNANCA, SUBJECT as SUBJECT_GOVERNANCA
from .restantes_redes import GUIDES as EXTRA_REDES, SUBJECT as SUBJECT_REDES
from .restantes_sistemas import GUIDES as EXTRA_SISTEMAS, SUBJECT as SUBJECT_SISTEMAS
from .restantes_seguranca import GUIDES as EXTRA_SEGURANCA, SUBJECT as SUBJECT_SEGURANCA
from .restantes_banco import GUIDES as EXTRA_BANCO, SUBJECT as SUBJECT_BANCO
from .restantes_engenharia import GUIDES as EXTRA_ENGENHARIA, SUBJECT as SUBJECT_ENGENHARIA

for subject, guides in [
    (SUBJECT_PORTUGUES, EXTRA_PORTUGUES),
    (SUBJECT_LOGICA, EXTRA_LOGICA),
    (SUBJECT_LEGISLACAO, EXTRA_LEGISLACAO),
    (SUBJECT_GOVERNANCA, EXTRA_GOVERNANCA),
    (SUBJECT_REDES, EXTRA_REDES),
    (SUBJECT_SISTEMAS, EXTRA_SISTEMAS),
    (SUBJECT_SEGURANCA, EXTRA_SEGURANCA),
    (SUBJECT_BANCO, EXTRA_BANCO),
    (SUBJECT_ENGENHARIA, EXTRA_ENGENHARIA),
]:
    for topic, material in guides.items():
        key = (subject, topic)
        if key in SUPPLEMENTS:
            raise ValueError(f"Aprofundamento duplicado em {subject}: {topic}")
        if not material.strip() or len(material.split()) < 85:
            raise ValueError(f"Complemento insuficiente: {subject}: {topic}")
        SUPPLEMENTS[key] = f"## Aprofundamento focal — {topic}\n\n{material.strip()}"

if len(SUPPLEMENTS) != 169:
    raise ValueError(f"Cobertura editorial incompleta: {len(SUPPLEMENTS)} de 169 tópicos")




# Este arquivo é somente a fonte versionada da migração única para lessons.body.
# A leitura da API e a edição na Administração consultam apenas o banco.
