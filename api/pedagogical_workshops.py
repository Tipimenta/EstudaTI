"""Oficinas autorais V1.2: aplicação e transferência, não reaproveitam texto das aulas de conceito.
Todas as questões são AUTORAIS, não questões de provas oficiais.
Cada oficina tem cenário, procedimento, solução, equívocos e treino verificável.
"""
import hashlib
import json
import random
from questions_tools import fingerprint

# Formato de questão: enunciado, alternativas, índice zero-based, justificativa.
WORKSHOPS = [
{
'code':'RED','title':'[Oficina] Diagnóstico de rede sem confundir DNS, rota e firewall','objective':'Dado um incidente de conectividade, formular hipóteses por camada e escolher testes que distingam suas causas.',
'source_label':'RFC 9293 e RFC Editor','source_url':'https://www.rfc-editor.org/info/rfc9293/',
'content':'''# Caso de prova — um serviço abre por IP, mas não por nome
Um usuário da rede 192.168.30.0/24 relata que consegue acessar um serviço por `https://192.0.2.20`, mas não por `https://intranet.exemplo`. Um colega atribui o problema ao roteador. Antes de trocar equipamento, separe **o que o sintoma demonstra** daquilo que ainda não se sabe. Acesso por IP indica algum caminho de rede funcional naquele instante, mas não demonstra resolução DNS correta. Mesmo esse teste tem limites: o certificado TLS pode não corresponder ao IP; o servidor pode hospedar múltiplos sites que dependem do nome no cabeçalho Host/SNI.

## Método de investigação por hipóteses
1. **Registrar escopo:** a falha ocorre com todos os computadores, um único usuário ou apenas uma VLAN? Qual nome exato, URL, horário e mensagem de erro?
2. **Verificar configuração local:** IP, máscara, gateway e resolvers DNS. O mesmo IP com máscara diferente pode alterar a decisão de encaminhar diretamente ou via gateway.
3. **Testar resolução:** consultar o DNS configurado e registrar endereço retornado e TTL; distinguir `NXDOMAIN`, timeout e resposta incorreta. Um cache local pode explicar divergências entre clientes.
4. **Testar conexão de transporte:** examinar se há rota e conectividade TCP para a porta real do serviço. `ping` falhar não prova que TCP/443 está bloqueado: ICMP pode estar filtrado.
5. **Conferir aplicação:** proxy, certificado, autenticação, SNI, virtual host e redirecionamentos. Se o nome resolve para IP correto, não encerre o diagnóstico somente porque o DNS respondeu.

## Exemplo resolvido
O DNS da estação responde `192.0.2.21`, enquanto o registro correto no servidor autoritativo é `192.0.2.20`. Outro computador usa um DNS distinto e abre a intranet. A ação fundamentada é identificar a origem do registro incorreto, corrigir a autoridade ou o resolver, verificar TTL e testar novamente. Reiniciar o roteador não corrige uma zona autoritativa errada. Se a consulta responde corretamente, mas a conexão falha, analise roteamento, ACL/firewall e serviço de destino, nesta ordem de evidências.

## Como a banca tenta confundir
- **DNS x DHCP:** DHCP pode informar o endereço do resolver, mas não substitui a resolução do nome.
- **Ping x disponibilidade:** ICMP é teste de alcance/controle, não verificação completa de uma aplicação HTTPS.
- **MAC x IP:** encaminhamento entre redes usa informação da camada de rede; o quadro de enlace muda ao atravessar roteadores.
- **Sintoma x causa:** um único teste não identifica automaticamente qual dispositivo falhou.

## Recuperação ativa
Sem consultar a solução, produza uma tabela de três colunas: hipótese, evidência esperada e teste. Inclua resolução de nomes, rota, TCP/443 e certificado TLS. A correção deve premiar a capacidade de **descartar hipóteses** — não simplesmente listar comandos.

## Critério para avançar
Você deve justificar por que acessar por IP não prova que a aplicação por nome funcionará e selecionar um teste que diferencie DNS incorreto de bloqueio TCP. Depois resolva as questões abaixo sem voltar à teoria.''',
'questions':[
('Uma estação acessa HTTPS pelo endereço IPv4, mas não pelo nome. Qual teste discrimina inicialmente uma falha de resolução?', ['Consultar a resposta DNS do nome na estação e comparar com a esperada','Trocar a máscara de todos os clientes sem inspeção','Desativar o firewall do servidor por tempo indeterminado','Concluir que a porta 443 está fechada apenas pelo erro de nome'],0,'A comparação das respostas DNS com o destino esperado testa diretamente a hipótese de resolução; as demais medidas não são diagnósticos proporcionais.'),
('Um servidor não responde a ICMP Echo, mas a conexão TCP/443 funciona. A conclusão tecnicamente adequada é:', ['O serviço HTTPS pode estar disponível apesar do ICMP indisponível','O DNS obrigatoriamente está com falha','Todos os protocolos de transporte estão bloqueados','O roteador da rede está necessariamente defeituoso'],0,'Políticas podem bloquear ICMP enquanto permitem TCP/443; protocolos não são intercambiáveis.')],
'cards':[('Um hostname falha, mas o IP responde: o que verificar antes de culpar roteamento?','Resposta DNS, endereço obtido, TTL e dependência de nome em TLS/SNI.'),('Por que ping negativo não prova indisponibilidade de HTTPS?','Porque ICMP pode ser filtrado enquanto o fluxo TCP/443 continua permitido.')]
},
{
'code':'RED','title':'[Oficina] Sub-redes, sumarização e escolha da rota','objective':'Calcular faixa válida de endereços e aplicar longest-prefix match a uma decisão de roteamento.',
'source_label':'RFC 4632 — CIDR','source_url':'https://www.rfc-editor.org/info/rfc4632/',
'content':'''# Caso de prova — dividir uma rede e encaminhar um pacote
Uma secretaria recebeu o bloco `10.40.8.0/24` e precisa criar **quatro sub-redes de mesmo tamanho** para separar departamentos. Você não deve escolher um endereço ao acaso: primeiro identifique quantos bits de host serão emprestados. Quatro sub-redes equivalem a `2²`, então o novo prefixo é `/26`. A máscara `/26` corresponde a `255.255.255.192`: há 64 endereços por bloco, dos quais 62 são normalmente utilizáveis como hosts em cada sub-rede IPv4 convencional.

## Resolução trabalhada
Os quatro blocos são: `10.40.8.0/26` (hosts .1 a .62; broadcast .63); `10.40.8.64/26` (hosts .65 a .126; broadcast .127); `10.40.8.128/26` (hosts .129 a .190; broadcast .191); `10.40.8.192/26` (hosts .193 a .254; broadcast .255). O salto de 64 resulta da combinação de 6 bits de host. A presença de `.64` em um endereço não basta, por si só, para classificá-lo como host: em `/26`, `.64` é endereço da rede do segundo bloco.

O roteador recebe o pacote destinado a `10.40.8.70`. Sua tabela tem `10.40.0.0/16` via A, `10.40.8.64/26` via B e `0.0.0.0/0` via C. A seleção normal escolhe **via B**, porque o prefixo /26 é o mais específico dentre os que casam com o IP de destino. Distância administrativa e métricas não fazem a rota /16 vencer uma rota /26 válida de mesma natureza; critérios de seleção da plataforma entram nas etapas apropriadas após definir as rotas elegíveis.

## VLSM e sumarização: não inverta a operação
CIDR descreve prefixos; VLSM permite tamanhos distintos para redes com demandas diferentes. Se um setor precisa de 100 hosts e outro de 20, alocar ambos em /26 seria insuficiente para o primeiro e desperdiçaria espaço no segundo. Um /25 oferece 126 hosts usuais; um /27 oferece 30. Já sumarização agrega redes contíguas em um prefixo maior, mas pode anunciar endereços não atendidos se o agrupamento for feito incorretamente.

## Pegadinhas que valem pontos
- `2^(32-prefixo)` dá total de endereços, não automaticamente hosts utilizáveis; `/31` e `/32` têm usos específicos que exigem cautela com a regra de subtrair 2.
- Máscara define **fronteira da sub-rede**; gateway e DNS não são calculados automaticamente por ela.
- Prefixo maior numericamente (`/26`) identifica bloco menor que `/24`.
- **Rota mais específica** não significa menor número de saltos; são critérios diferentes.

## Treino sem consulta
Calcule rede, primeiro e último host e broadcast de `172.16.9.130/27`. Depois avalie se `172.16.9.127` pertence ao mesmo bloco. Explique em voz alta o raciocínio binário; se conseguir apenas decorando saltos, repita usando 8 bits do último octeto.''',
'questions':[
('Qual é o endereço de rede de 172.16.9.130/27?', ['172.16.9.128','172.16.9.96','172.16.9.130','172.16.9.160'],0,'/27 usa blocos de 32 no último octeto: 128–159 contém o endereço 130.'),
('Para 10.40.8.70, o roteador tem rotas 10.40.0.0/16, 10.40.8.64/26 e 0.0.0.0/0. Qual será preferida pela regra do prefixo mais longo?', ['10.40.8.64/26','10.40.0.0/16','0.0.0.0/0','Todas simultaneamente por terem o mesmo destino'],0,'A rota /26 tem mais bits coincidentes com o destino, portanto é a mais específica entre as três.')],
'cards':[('Qual o incremento no último octeto de sub-redes /26?','64 endereços por sub-rede; 62 hosts usuais na convenção IPv4.'),('Em encaminhamento IP, o que significa longest-prefix match?','Dentre as rotas que casam com o destino, escolher a de prefixo mais específico.')]
},
{
'code':'SEG','title':'[Oficina] Resposta a incidente com evidências e continuidade','objective':'Priorizar contenção, preservar evidência e definir recuperação com RTO e RPO distintos.',
'source_label':'NIST CSF 2.0','source_url':'https://www.nist.gov/cyberframework',
'content':'''# Caso de prova — comportamento suspeito em servidor crítico
Uma organização identifica aumento abrupto de renomeações de arquivos num compartilhamento clínico, enquanto o monitoramento aponta tentativa de execução incomum em estação de trabalho. O gestor recebe a orientação: “reinicie todos os servidores e restaure o backup”. Essa resposta pode destruir evidências, ampliar indisponibilidade e deixar o vetor de entrada aberto. Uma abordagem profissional distingue **triagem, contenção, erradicação e recuperação**, com decisões proporcionais ao risco e coordenadas com os responsáveis.

## Plano fundamentado
**Triagem:** registre tempo, ativos, contas, alertas e alterações confirmadas; classifique criticidade e envolva os responsáveis pela resposta. **Contenção:** com autorização apropriada, isole ativos suspeitos e bloqueie credenciais comprometidas, preservando dados necessários à investigação. A ordem exata depende do risco operacional: desligar um sistema crítico de saúde pode ter impacto assistencial. **Análise:** colete registros disponíveis com cadeia de custódia adequada à finalidade, verifique persistência e escopo. **Erradicação:** remova causa e mecanismos de reinfecção, atualize controles, altere segredos expostos. **Recuperação:** restaure a partir de cópias confiáveis, valide integridade, monitore reinfecção e faça lições aprendidas.

## RTO e RPO no mesmo cenário
O serviço de agendamento possui RTO de quatro horas e RPO de quinze minutos. Isso significa **metas diferentes**: restabelecimento do serviço em até quatro horas, sob as condições do plano, e perda de alterações equivalente a no máximo quinze minutos. Não significa que um backup “feito a cada 15 minutos” garante RPO de 15 minutos: é preciso verificar execução, consistência, replicação e restauração. Um sistema que volta em 30 minutos com dados da semana passada pode cumprir o RTO e violar gravemente o RPO.

## Evidência é parte do controle
Registros de eventos precisam de sincronização de horário, retenção e controle de acesso. Com logs incompletos, a conclusão deve declarar limitação de evidência. Um relatório responsável diferencia fato observado, hipótese e ação recomendada. Não atribua ataque a uma pessoa ou ferramenta específica com base em um único alerta.

## Questão discursiva de treinamento
Escreva 10 a 15 linhas explicando qual seria sua primeira sequência de decisões, como manteria evidências e de que maneira validaria a restauração. Separe três parágrafos: identificação e contenção; investigação e erradicação; recuperação e prevenção. Você não precisa listar comandos ofensivos nem reproduzir um ataque.

## Armadilhas da banca
- Backup não substitui política de retenção, teste de restauração e plano de continuidade.
- Contenção não é sinônimo de desligar indiscriminadamente todos os equipamentos.
- RTO mede prazo de retorno; RPO mede tolerância à perda de dados no tempo.
- Controles do NIST CSF são resultados organizacionais, não sequência única e obrigatória de comandos.''',
'questions':[
('Um serviço volta em duas horas, mas perde quatro dias de dados. Qual interpretação é correta se o RTO é 4 h e o RPO é 1 h?', ['Cumpriu RTO, mas violou RPO','Cumpriu RTO e RPO por voltar antes de quatro horas','Violou RTO e cumpriu RPO','RTO e RPO não se aplicam à recuperação de dados'],0,'Duas horas estão dentro do RTO de 4 h; quatro dias de dados perdidos excedem o RPO de 1 h.'),
('Durante suspeita de comprometimento, qual abordagem preserva melhor a capacidade investigativa?', ['Registrar escopo e evidências antes de ações destrutivas, conforme plano','Apagar todos os logs imediatamente','Reformatar qualquer ativo sem análise ou autorização','Atribuir a causa a malware conhecido com base em um único alerta'],0,'Evidências e delimitação de escopo sustentam resposta proporcional; destruição prematura dificulta análise.')],
'cards':[('Como distinguir RTO de RPO em uma interrupção?','RTO: meta de tempo para restabelecer serviço; RPO: meta de perda máxima de alterações expressa em tempo.'),('Por que reiniciar todos os servidores não é resposta padrão a incidente?','Pode ampliar impacto, destruir evidências e deixar causas de comprometimento ativas.')]
},
{
'code':'SEG','title':'[Oficina] Matriz de acesso, MFA e risco residual','objective':'Projetar controles de identidade sem confundir autenticação, autorização e rastreabilidade.',
'source_label':'NIST CSF 2.0','source_url':'https://www.nist.gov/cyberframework',
'content':'''# Caso de prova — funcionário precisa acessar três sistemas
Uma equipe de TI administra sistema financeiro, prontuário eletrônico e servidor de arquivos. Um funcionário do suporte solicita permissão de administrador geral “para não precisar abrir chamados”. A medida reduz conveniência operacional imediata, mas expande o impacto de credencial comprometida ou erro humano. O primeiro passo é mapear **papel, recurso, ação permitida e justificativa**. Autenticação prova uma identidade em determinado grau de confiança; autorização decide se a identidade pode praticar uma ação sobre um recurso; auditoria registra a decisão e o uso.

## Matriz mínima de autorização
Defina papéis: atendimento, suporte, gestor de infraestrutura e auditor. Para cada recurso, especifique ações como consultar, alterar, instalar, aprovar e exportar. Em vez de liberar privilégios administrativos permanentes, avalie elevação temporária controlada, contas separadas, revisão periódica e trilhas de auditoria. **MFA** fortalece a etapa de autenticação, mas não impede que uma identidade legitimamente autenticada receba autorizações excessivas. Da mesma forma, VPN protege um canal de acesso, mas não é substituto de regra de menor privilégio.

## Exemplo de decisão
O suporte precisa reiniciar serviço de impressão, mas não consultar prontuário nem exportar a base de pacientes. A solução de menor privilégio concede ação específica no recurso necessário e preserva aprovação para elevação emergencial. O papel de auditor pode ler logs, mas não alterá-los. Um usuário com acessos antigos de departamento anterior requer processo de desligamento ou revisão — a recertificação é um controle de ciclo de vida de identidade.

## Avalie o risco que sobra
Mesmo após MFA, segmentação e logs, permanece risco de engenharia social, vulnerabilidades, abuso interno e falhas operacionais. Esse **risco residual** deve ser aceito, tratado, transferido ou evitado por autoridade competente conforme critérios e apetite de risco. Não escreva que um controle “elimina todos os riscos”: esse absolutismo é frequentemente incorreto.

## Exercício aplicado
Desenhe uma matriz com quatro papéis e três sistemas. Para cada uma das doze combinações, anote a permissão e a justificativa. Identifique pelo menos um conflito de segregação de funções (por exemplo, cadastrar fornecedor e aprovar seu pagamento). Refaça a matriz supondo uma mudança de função e explique o que deve ser revogado.

## Pegadinhas que aparecem em provas
- Identificação não é automaticamente autenticação; autenticação não é autorização.
- MFA depende de fatores distintos e implementação apropriada; duas senhas não formam dois fatores diferentes.
- Zero Trust não obriga uma arquitetura única ou ferramenta específica.
- O princípio da necessidade de acesso se refere a privilégios, enquanto a LGPD também exige necessidade no volume e finalidade dos dados tratados.''',
'questions':[
('Uma conta possui MFA, mas pode editar qualquer base sem justificativa. Qual controle falta principalmente?', ['Autorização compatível com o menor privilégio','Uma segunda senha estática como único fator adicional','Trocar o endereço IP público do firewall','Aumentar a capacidade de armazenamento de logs'],0,'MFA trata autenticação; restringir ações e recursos é decisão de autorização.'),
('O funcionário migrou do financeiro para suporte. Qual medida responde ao risco de privilégios acumulados?', ['Revisar e revogar acessos incompatíveis com a nova função','Preservar todas as permissões antigas por conveniência','Remover todas as trilhas de auditoria anteriores','Conceder administrador global por tempo indeterminado'],0,'A revisão do ciclo de vida da identidade reduz acúmulo indevido de permissões.')],
'cards':[('MFA resolve sozinho excesso de permissões?','Não. MFA fortalece autenticação; autorização e revisão de privilégios são controles distintos.'),('O que é risco residual?','Risco que permanece após tratamento e controles aplicados, sujeito a avaliação e decisão formal.')]
},
{
'code':'SO','title':'[Oficina] Troubleshooting de domínio Windows, DNS e GPO','objective':'Separar problemas de domínio, registro DNS e escopo de política usando uma sequência de diagnóstico reproduzível.',
'source_label':'Microsoft Learn — Group Policy processing','source_url':'https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing',
'content':'''# Caso de prova — computadores não recebem política de tela bloqueada
Um grupo de estações ingressadas no domínio recebe autenticação normalmente, mas não aplica uma nova GPO de bloqueio de tela. “Se entrou no domínio, a GPO deveria funcionar” é uma conclusão incompleta: políticas podem ter **escopo, filtro, precedência, condições de processamento e erros de comunicação**. A pergunta de prova costuma apresentar vários fatos misturados para verificar se você sabe apontar qual deles realmente explica a ausência da política.

## Método por camadas
**Infraestrutura:** confirme resolução DNS do domínio e localize serviços do AD por registros SRV. Use resolver interno apropriado ao domínio; configurar DNS público como único servidor em estações de AD costuma impedir localização de serviços internos. **Identidade:** confirme que computador ou usuário correspondente está na OU esperada. **Escopo:** verifique se a GPO está vinculada a site, domínio ou OU que alcance o objeto, se o vínculo está ativo, se existe filtro de segurança/WMI e se a configuração está na seção de computador ou usuário correta. **Precedência:** a ordem usual de aplicação segue Local → Site → Domínio → OU (das ancestrais às descendentes), com exceções por imposição e bloqueio de herança. **Evidência:** examine resultado efetivo de políticas e registros, em vez de presumir que o último arquivo editado venceu.

## Exemplo resolvido
A GPO está vinculada à OU `Administrativo`, mas o computador afetado foi movido para `Recepcao`. A autenticação continua porque a conta de domínio é válida, mas o computador não está mais no escopo da política de máquina. O reparo adequado é reavaliar a estrutura de OUs ou o vínculo e validar o resultado efetivo. Não é necessário excluir e recriar o domínio.

Outro cenário: uma política define configuração em `User Configuration`, porém a equipe procura efeito em objeto de computador sem entender loopback processing. A ausência do efeito pode ser consequência da estratégia de escopo e processamento. Analise qual entidade recebe a configuração antes de mudar permissões.

## Atenção ao vocabulário
OU é unidade de organização e vínculo de políticas; grupo de segurança pode atuar em filtragem/autorização; DNS localiza serviços; Kerberos está relacionado a autenticação. Nenhuma dessas peças substitui a outra. **Conflito de GPO** não é sinônimo de falha de DNS.

## Prática de recuperação ativa
Monte um checklist com oito itens e aplique a dois casos: (A) computador não encontra o controlador de domínio; (B) encontra domínio, mas não recebe uma política específica. O checklist deve variar a ordem dos testes conforme o sintoma, e registrar qual evidência descarta cada hipótese.''',
'questions':[
('Uma GPO de computador está vinculada somente à OU Financeiro, mas o computador foi movido para Recepção. Qual é uma causa plausível da política não aplicar?', ['O computador não está no escopo do vínculo da GPO','Usuários do domínio jamais podem usar GPOs','Toda mudança de OU elimina o endereço DNS','GPOs funcionam apenas com contas locais'],0,'A vinculação à OU delimita escopo; mover o objeto pode tirá-lo da área de aplicação.'),
('Qual ordem básica de processamento de GPO é ensinada pela Microsoft, ressalvadas exceções?', ['Local, site, domínio e unidades organizacionais','Unidade organizacional, domínio, site e local','DNS, DHCP, TCP e SMB','Usuário, rede pública, impressora e BIOS'],0,'Na ordem básica LSDOU, configurações posteriores podem prevalecer, com regras de herança e imposição.')],
'cards':[('Uma GPO não aplica: quais dimensões verificar?','Escopo de OU, vínculo, filtros, seção usuário/computador, precedência, DNS e resultado efetivo.'),('Qual a sequência geral LSDOU de GPO?','Local, site, domínio, unidade organizacional; com exceções de herança, imposição e filtros.')]
},
{
'code':'SO','title':'[Oficina] Análise de logs Linux, permissões e serviços','objective':'Distinguir falha de serviço, de permissão e de rede usando evidências locais e testes não destrutivos.',
'source_label':'Documentação systemd','source_url':'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html',
'content':'''# Caso de prova — uma aplicação não reinicia no Linux
Após uma atualização, o serviço `app.service` não sobe. A primeira tentação é alterar permissões de toda a pasta para `777`, mas essa ação pode ampliar riscos sem resolver o problema. Diagnóstico exige verificar **estado do serviço, configuração, logs e recursos externos**.

## Sequência de verificação
1. Consulte status e motivo de falha do serviço via gerenciador systemd (`systemctl status app.service`), distinguindo unidade inexistente, dependência não satisfeita, falha de execução e término inesperado.
2. Examine logs relevantes via journal (`journalctl -u app.service`), observando mensagens, horário e usuário de execução. O journal pode não conter tudo se a aplicação gravar logs próprios.
3. Verifique definição da unidade, diretórios de trabalho, conta de serviço, variáveis de ambiente e permissões do caminho de execução. Um processo não precisa de permissão irrestrita em todo o filesystem.
4. Investigue porta ocupada, dependência de banco, DNS, espaço em disco, capacidade de memória e limites de recursos. Uma falha local de permissão pode ocorrer com rede perfeitamente funcional; timeout externo pode existir com permissões corretas.
5. Faça mudança mínima e controlada, registre versão/configuração anterior e valide o serviço e a aplicação após a intervenção.

## Permissões: leitura não é execução
Para arquivo regular, os bits `r`, `w`, `x` dão leitura, escrita e execução. Em diretórios, o bit `x` permite atravessar o caminho, sujeito às demais permissões; `r` permite listar entradas. Um arquivo `640` dá dono leitura/escrita, grupo leitura e outros nenhuma permissão. Isso pode ser adequado a um arquivo de configuração sensível. A propriedade e grupos envolvidos importam tanto quanto o número octal.

## Exemplo resolvido
O log apresenta `Permission denied` ao ler arquivo de configuração. O serviço roda com a conta `appsvc`, mas o arquivo é `root:root` com modo `600`. É preciso decidir se uma permissão de leitura controlada por grupo ou mecanismo adequado é aceitável, em vez de conceder leitura global. Outro cenário: `Address already in use` indica conflito na associação da porta; `chmod 777` não remove esse conflito.

## Pontos de cobrança
- `systemctl enable` configura inicialização automática; não significa necessariamente iniciar agora. `start` solicita execução imediata.
- `journalctl` consulta logs do journal; não é ferramenta de edição de unidades.
- Usuário `root` não deve ser adotado por conveniência quando um serviço requer menos privilégios.
- RAID e snapshots não substituem cópia de segurança recuperável e testada.

## Treino sem consultar
Recebeu `exit-code` e `Address already in use`. Explique a próxima evidência que buscaria e a correção de menor risco. Depois reescreva o diagnóstico usando linguagem técnica sem afirmar algo que o log ainda não comprova.''',
'questions':[
('O log de um serviço Linux informa Address already in use ao iniciar. Qual investigação é mais diretamente relacionada ao erro?', ['Identificar processo que ocupa a porta solicitada','Alterar permissões de toda a pasta para 777','Substituir DNS por endereço IP público','Desabilitar todos os registros do journal'],0,'A mensagem sugere conflito na associação de endereço/porta; é preciso confirmar o ocupante do recurso.'),
('Em Linux, qual afirmação diferencia corretamente systemctl enable de systemctl start?', ['Enable configura ativação no boot; start solicita início imediato','Enable altera o dono dos arquivos; start altera a senha','Enable consulta todos os logs; start apaga os antigos','Ambos comandos obrigatoriamente reiniciam o kernel'],0,'Habilitação de unidade no boot e início de unidade são operações distintas.')],
'cards':[('Erro Address already in use: qual hipótese testar?','Conflito de porta/interface ou socket já associado por outro processo.'),('Por que chmod 777 não é correção genérica aceitável?','Amplia privilégios indevidamente e pode ocultar o diagnóstico real.')]
},
{
'code':'POR','title':'[Oficina] Reescrita de enunciados preservando sentido','objective':'Reconhecer inferências indevidas, equivalência semântica e mudanças de escopo por quantificadores e conectivos.',
'source_label':'ABL — Vocabulário Ortográfico','source_url':'https://www.academia.org.br/nossa-lingua/busca-no-vocabulario',
'content':'''# Caso de prova — o texto técnico e suas inferências
Leia: “Parte dos servidores foi atualizada após o incidente. Como a correção não foi aplicada a todos os equipamentos, a equipe manteve o monitoramento reforçado”. A banca oferece uma reescrita: “Todos os servidores foram atualizados e, portanto, o monitoramento terminou”. Essa alternativa não preserva o sentido: **parte** não equivale a **todos**, e a continuação indica monitoramento mantido, não encerrado.

## Método de análise
Divida o período em proposições: (A) alguns servidores foram atualizados; (B) a correção não alcançou todos; (C) a equipe manteve monitoramento reforçado. Depois identifique relações: “como” indica justificativa/causa naquele contexto; “portanto” tende a apresentar conclusão. Uma troca pode alterar a relação lógica, mesmo que cada oração isolada pareça correta. Em texto de concurso, marcadores de certeza também importam: “pode” indica possibilidade, não obrigação; “deve” indica necessidade, não simples chance.

## Exemplo resolvido 1 — modificação restritiva
Original: “Os relatórios que apresentaram inconsistências foram revisados”. A oração restritiva delimita **quais relatórios** foram revisados. Uma versão entre vírgulas — “Os relatórios, que apresentaram inconsistências, foram revisados” — tende a tratar a informação como explicativa sobre o conjunto de relatórios. A mudança de pontuação pode alterar o escopo do referente, conforme contexto.

## Exemplo resolvido 2 — concessão
Original: “Embora houvesse redundância, o serviço ficou indisponível”. Reescrita adequada: “Apesar da redundância, o serviço ficou indisponível”. O valor concessivo permanece; já “porque havia redundância” transforma a relação em causal, modificando a intenção original.

## Evite três erros recorrentes
**Generalização:** transformar “alguns” em “todos”. **Causalidade inventada:** a sequência temporal não demonstra necessariamente causa exclusiva. **Negação inadequada:** negar “todos possuem backup” exige “pelo menos um não possui backup”, e não “ninguém possui backup”.

## Exercício de escrita formal
Reescreva em uma frase técnica: “A gente viu que algumas máquinas deram erro e resolveu olhar mais de perto”. Uma possível versão: “A equipe identificou falhas em parte das estações e intensificou a análise para delimitar as causas.” A segunda frase mantém a informação, mas evita coloquialismo e certeza não suportada.

## Critério de domínio
Diante de quatro alternativas, justifique por que três mudam quantidade, causa, certeza ou referência. A resposta precisa citar o termo concreto que altera o sentido; dizer apenas “está diferente” não basta.''',
'questions':[
('No texto “Alguns servidores foram atualizados”, qual reescrita conserva a informação expressa?', ['Parte dos servidores recebeu atualização','Todos os servidores receberam atualização','Nenhum servidor recebeu atualização','A maioria absoluta dos servidores foi atualizada'],0,'Alguns permite afirmar uma parte não especificada; não autoriza totalidade nem maioria.'),
('Em “Embora houvesse redundância, o serviço caiu”, a substituição que conserva a relação concessiva é:', ['Apesar de existir redundância, houve indisponibilidade','Como havia redundância, o serviço caiu','Por causa da redundância, o serviço caiu','Assim que a redundância terminou, o serviço caiu'],0,'Apesar de expressa concessão, enquanto as demais alternativas introduzem causa ou tempo não afirmados.')],
'cards':[('Por que substituir alguns por todos altera uma proposição?','Porque aumenta o escopo do quantificador sem suporte textual.'),('Qual sentido geralmente marca embora nesse tipo de frase?','Concessão: fato que não impede o resultado afirmado na outra oração.')]
},
{
'code':'POR','title':'[Oficina] Clareza, correção e precisão em parecer técnico','objective':'Revisar frases de TI identificando ambiguidade, pontuação indevida, concordância e exageros de certeza.',
'source_label':'ABL — Vocabulário Ortográfico','source_url':'https://www.academia.org.br/nossa-lingua/busca-no-vocabulario',
'content':'''# Caso de prova — melhorar um relatório sem alterar fatos
Um técnico escreveu: “Foi detectado problemas nos servidores que estava sem acesso. A equipe resolveu eles e agora nunca mais vai dar falha”. A frase acumula problemas de concordância, referência e rigor técnico. “Foi detectado problemas” deveria concordar com o sujeito paciente plural em construção passiva — “foram detectados problemas”. “Servidores que estava” requer concordância, mas ainda há ambiguidade: os servidores estavam sem acesso ou os usuários? “Nunca mais vai dar falha” é promessa absoluta sem evidências.

## Reescrita orientada
Uma versão mais técnica é: “Foram identificadas falhas de acesso em servidores da unidade. A equipe aplicou medidas corretivas e mantém monitoramento para verificar a estabilidade do serviço.” Note o ganho: sujeito e ação identificáveis, separação de constatação e acompanhamento, ausência de garantias impossíveis. A redação não acrescenta uma causa que não foi comprovada.

## Critérios de avaliação
**Precisão:** nomear o objeto com o nível de detalhe confirmado. **Clareza:** evitar pronome sem referente evidente. **Coesão:** usar conectivos que reflitam relações reais (causa, consequência, oposição). **Concisão:** eliminar redundâncias sem retirar condições. **Norma-padrão:** concordância, regência, crase e pontuação. Uma resposta discursiva pode estar tecnicamente correta e ainda perder qualidade por frases vagas ou contraditórias.

## A vírgula é evidência de estrutura
Não separe com vírgula o sujeito do verbo por simples pausa de leitura: “Os servidores, apresentaram falhas” está inadequado na leitura normal dessa estrutura. Isolamentos têm regras próprias: “Os servidores, após a atualização, apresentaram falhas” admite a expressão intercalada. Da mesma forma, o adjunto adverbial anteposto pode admitir vírgula conforme extensão e efeito de clareza; a avaliação depende da sintaxe, não de respirar.

## Dois passos de revisão profissional
Primeiro, marque cada afirmação como fato, hipótese, recomendação ou resultado. Segundo, revise termos absolutos: “sempre”, “nunca”, “garante” e “elimina” precisam de sustentação adequada. Uma boa resposta não promete certeza onde existe risco residual.

## Exercício sem consulta
Reescreva: “O pessoal chegou lá e fizeram uns teste e parece que foi o DNS”. Preserve a incerteza: “A equipe realizou testes preliminares que indicaram possível falha de resolução DNS; é necessária validação adicional.” Compare suas versões e anote o que foi confirmado versus inferido.

## Pegadinha de banca
Alternativas formalmente corretas podem ser semanticamente infiéis. O objetivo não é produzir um texto com palavras difíceis, mas conservar os fatos ao elevar a precisão da linguagem.''',
'questions':[
('Qual frase está adequada à norma-padrão e não faz promessa técnica sem evidência?', ['Foram identificados erros, e a equipe está verificando a estabilidade.','Foi identificado erros, e o sistema nunca mais falhará.','Os computadores, apresentaram erro e já garante solução.','Houveram falhas, mas a equipe corrigiu tudo definitivamente.'],0,'Concordância e formulação cautelosa tornam a primeira redação mais precisa; as outras têm erros ou afirmações absolutas.'),
('Qual reescrita mantém a hipótese, sem apresentá-la como fato confirmado?', ['Os indícios sugerem falha de DNS, sujeita a validação.','A causa comprovada é o DNS, independentemente de testes.','O DNS sempre provoca qualquer falha de acesso.','O problema foi resolvido sem necessidade de evidência.'],0,'Indícios sugerem hipótese e preservam necessidade de verificação; as demais extrapolam a evidência.')],
'cards':[('Quais quatro categorias ajudam a revisar um relatório técnico?','Fato, hipótese, recomendação e resultado.'),('Por que evitar “nunca mais falhará” em laudo técnico?','É afirmação absoluta de resultado futuro sem evidência suficiente.')]
},
{
'code':'GOV','title':'[Oficina] SLA, SLI e SLO em gestão de serviços','objective':'Interpretar indicadores de confiabilidade e distinguir metas internas de compromissos de nível de serviço.',
'source_label':'Google SRE — Service Level Objectives','source_url':'https://sre.google/sre-book/service-level-objectives/',
'content':'''# Caso de prova — medir disponibilidade de um serviço público
Uma organização afirma que o portal “está bom porque ninguém reclamou”. Ausência de reclamação não substitui métrica. Para gerenciar qualidade de serviço, defina **o que medir, como medir e qual patamar aceitar**. Um indicador de nível de serviço (SLI) é uma medida observável, por exemplo proporção de solicitações bem-sucedidas. Um objetivo (SLO) é a meta para esse indicador, como 99,5% de disponibilidade em certo período. Um acordo (SLA) é compromisso documentado entre partes, com condições e consequências definidas.

## Exemplo com cálculo
Considere mês de 30 dias, isto é, `30 × 24 × 60 = 43.200` minutos. Um objetivo de disponibilidade de `99,5%` admite, nesse modelo simplificado, até `0,5% × 43.200 = 216` minutos de indisponibilidade no período. É essencial declarar o denominador: manutenção programada excluída do SLA? Janelas de medição? Indisponibilidade parcial? Sem critério definido, a porcentagem parece precisa, mas não é auditável.

## Escolha métricas úteis
Um serviço de autenticação pode medir percentual de logins válidos concluídos, latência p95 e erros 5xx. A média simples de latência pode esconder cauda longa, então percentis são úteis. Não confunda número de chamados fechados com experiência real do usuário: encerrar tickets rapidamente enquanto o serviço segue indisponível incentiva comportamento inadequado.

## Reação à degradação
Se o SLI cai abaixo do SLO, registre impacto, investigue causa, reavalie capacidade e priorize correção. Um SLA contratual pode ter consequências específicas, mas não é toda meta interna que vira automaticamente obrigação contratual. Para comparar meses, use critérios idênticos de janela e exclusão; caso contrário, conclusões de melhora podem ser artificiais.

## Transferência para concursos
Quando a banca perguntar diferença entre “gerenciamento de incidentes” e “nível de serviço”, responda por objetivo: incidente restaura operação após interrupção; práticas de nível de serviço pactuam, medem e melhoram qualidade esperada. Uma coisa pode produzir dados para a outra, mas não são sinônimas.

## Exercício aplicado
Calcule o tempo máximo de indisponibilidade para 99,9% em 7 dias, sem exclusões. Em seguida, escreva uma frase de SLA que especifica métrica, janela e exclusões, em vez de afirmar apenas “alta disponibilidade”.''',
'questions':[
('Em um mês de 30 dias, objetivo simplificado de 99,5% de disponibilidade permite até quantos minutos indisponíveis?', ['216 minutos','43 minutos','720 minutos','1.440 minutos'],0,'0,5% de 43.200 minutos equivale a 216 minutos de indisponibilidade.'),
('Qual alternativa diferencia corretamente SLI e SLO?', ['SLI mede um comportamento observado; SLO fixa uma meta para essa medida','SLI é sempre multa contratual; SLO é inventário físico','SLI é serviço Windows; SLO é protocolo DNS','SLI substitui análise de incidentes; SLO elimina contratos'],0,'SLI é indicador, SLO é objetivo; o SLA formaliza acordos conforme suas condições.')],
'cards':[('Qual é a diferença fundamental entre SLI e SLO?','SLI = medida observada do serviço; SLO = meta definida para a medida.'),('Quanto é 0,5% de 43.200 minutos?','216 minutos; corresponde à indisponibilidade máxima simplificada para SLO de 99,5% em 30 dias.')]
},
{
'code':'GOV','title':'[Oficina] Priorização de TI com risco, custo e responsabilidade','objective':'Construir justificativa auditável de priorização de iniciativas tecnológicas e contratações.',
'source_label':'ENAP — Escola Virtual Gov','source_url':'https://www.escolavirtual.gov.br/',
'content':'''# Caso de prova — três demandas e recursos limitados
Um órgão público recebe três pedidos: renovar switches com falhas recorrentes, contratar um sistema novo de relatórios e comprar telas para uma sala de reunião. O orçamento não cobre tudo. Uma decisão tecnicamente fundamentada não se reduz a quem pediu primeiro; é preciso avaliar **impacto nos serviços públicos, probabilidade e consequência de falha, obrigações legais, custo total e dependências**.

## Uma matriz simples, sem falsa exatidão
Para cada iniciativa, registre urgência, impacto no cidadão, risco de não executar, custo estimado, alternativas e capacidade de implantação. Por exemplo, switches com incidentes documentados que interrompem atendimento podem ser prioritários; telas para reunião podem ter benefício menor no cenário. Mas não atribua pontuações numéricas arbitrárias e depois trate o resultado como verdade objetiva: a escala precisa de critérios explícitos e validação de gestores.

## Governança x gestão
Governança estabelece direção, accountability, tolerância a risco e acompanhamento de resultados; gestão planeja, contrata, implementa, opera e mede serviços. Uma diretoria pode aprovar prioridades, enquanto a TI elabora estudo de alternativas e cronograma. O fato de o analista executar etapas técnicas não lhe dá competência automática para autorizar despesa.

## Documentos de decisão
Uma boa nota técnica descreve problema e evidência, soluções alternativas, consequências de não atuar, premissas, riscos, critérios de aceitação, responsabilidades e ações de acompanhamento. Quando a demanda virar contratação, observe o regime jurídico aplicável e os documentos exigidos; na Lei 14.133/2021, ETP e TR têm papéis diferentes e não devem ser tratados como sinônimos.

## Exemplo resolvido
Ocorreram cinco incidentes de switch em um mês, com indisponibilidade total de atendimento de 12 horas. A equipe possui evidência de falhas de hardware, e a substituição reduz ponto único de falha. A priorização pode se apoiar na continuidade do serviço, no risco e no custo de paralisação, desde que a solução seja comparada com reparo, suporte e contingência. O responsável documenta a premissa de que o novo equipamento será instalado antes do fim da garantia da infraestrutura existente.

## Pergunta aberta
Escreva um parecer curto indicando por que a substituição dos switches pode superar a compra das telas. Use linguagem técnica, reconheça incertezas e proponha uma evidência adicional que poderia alterar a prioridade. Não confunda preferência pessoal com critério de governança.''',
'questions':[
('Qual evidência sustenta melhor uma prioridade de investimento de TI?', ['Frequência e impacto documentados de indisponibilidades críticas','Preferência individual pelo fornecedor mais conhecido','Número de telas que a equipe gostaria de comprar','Decisão tomada sem comparar alternativas ou custos'],0,'Impacto e recorrência demonstrados fundamentam comparação de riscos e benefícios; preferências sem critérios não bastam.'),
('Qual afirmação diferencia governança e gestão de TI?', ['Governança direciona e supervisiona; gestão planeja e executa','Governança apenas instala sistemas; gestão só audita leis','Governança elimina a necessidade de responsabilidade','Gestão pode autorizar despesas sem competência formal'],0,'Governança estabelece direção e prestação de contas; gestão operacionaliza decisões com competência definida.')],
'cards':[('Quais elementos devem constar em uma priorização auditável de TI?','Problema, evidência, riscos, alternativas, custos, responsáveis e critério de sucesso.'),('Ter uma demanda urgente dispensa análise de alternativas?','Não necessariamente; a decisão deve ser compatível com urgência, evidência, regras e custo total.')]
},
{
'code':'BD','title':'[Oficina] JOIN, agrupamento e contagem sem duplicar dados','objective':'Interpretar cardinalidade de JOIN e aplicar WHERE, GROUP BY e HAVING no estágio correto da consulta.',
'source_label':'PostgreSQL — SQL SELECT','source_url':'https://www.postgresql.org/docs/current/sql-select.html',
'content':'''# Caso de prova — relatórios de pedidos por cliente
Considere `clientes(id, nome)` e `pedidos(id, cliente_id, valor)`. Há três clientes: Ana (1), Beto (2), Caio (3). Os pedidos são: (10,1,100), (11,1,60) e (12,2,40). Precisamos listar todos os clientes, inclusive Caio que não possui pedidos, com quantidade de pedidos de cada um. A escolha natural é `LEFT JOIN` da tabela clientes para pedidos, acompanhada de `COUNT(p.id)`.

```sql
SELECT c.id, c.nome, COUNT(p.id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome
ORDER BY c.id;
```

O resultado é Ana=2, Beto=1, Caio=0. **Por que `COUNT(p.id)` e não `COUNT(*)`?** No LEFT JOIN, Caio ainda possui uma linha resultante com colunas de pedidos nulas. `COUNT(*)` contaria essa linha e devolveria 1, mas `COUNT(p.id)` desconsidera nulo e devolve 0.

## Onde o filtro muda o resultado
Se você escrever `WHERE p.valor >= 50`, Caio será eliminado, e Beto também, porque o predicado aplicado após o JOIN rejeita linhas cujo valor é `NULL` ou inferior a 50. Se a intenção é **manter todos os clientes** e contar somente pedidos elegíveis, coloque o critério adequado no `ON`, ou utilize agregação condicional. A semântica de filtro é decisiva — decorar “LEFT JOIN mantém tudo” sem ler a cláusula WHERE pode produzir resposta errada.

```sql
SELECT c.nome, COUNT(p.id) AS pedidos_50_mais
FROM clientes c
LEFT JOIN pedidos p
  ON p.cliente_id = c.id AND p.valor >= 50
GROUP BY c.id, c.nome;
```

Agora Ana=2, Beto=0, Caio=0.

## WHERE não é HAVING
`WHERE` filtra linhas antes do agrupamento; `HAVING` filtra grupos depois da agregação. Para listar somente clientes com ao menos dois pedidos, use `HAVING COUNT(p.id) >= 2`. O resultado, no exemplo original, é somente Ana. `ORDER BY` organiza o resultado; não transforma contagem em valor maior ou menor por si só.

## Armadilhas de prova
- Um JOIN 1:N pode multiplicar linhas da tabela do lado 1.
- COUNT(coluna) ignora NULL; COUNT(*) conta linhas.
- A condição no ON e no WHERE pode modificar o conjunto de linhas preservadas por um LEFT JOIN.
- Agregação sem GROUP BY adequado pode ser inválida ou ter semântica diferente.

## Treino sem consulta
Reescreva o exemplo para somar valores por cliente e devolver zero aos sem pedido (`COALESCE(SUM(p.valor),0)`). Justifique por que `COUNT(DISTINCT p.id)` seria útil em caso de outros JOINs que multiplicassem pedidos.''',
'questions':[
('Em LEFT JOIN de clientes com pedidos, um cliente sem pedidos gera uma linha com p.id NULL. Qual expressão conta zero pedidos para ele?', ['COUNT(p.id)','COUNT(*)','COUNT(c.id)','SUM(1)'],0,'COUNT(p.id) ignora NULL; as outras expressões contam a linha preservada pelo LEFT JOIN.'),
('Para preservar todos os clientes e contar somente pedidos com valor >= 50, qual alternativa mantém a semântica do LEFT JOIN?', ['Filtrar p.valor >= 50 na condição ON do LEFT JOIN','Aplicar p.valor >= 50 exclusivamente em WHERE sem ressalvas','Trocar LEFT JOIN por INNER JOIN necessariamente','Eliminar a cláusula GROUP BY'],0,'Filtrar no ON restringe pares do JOIN preservando clientes; WHERE sobre p.valor pode eliminar linhas sem correspondência.')],
'cards':[('Por que COUNT(*) difere de COUNT(p.id) após LEFT JOIN?','COUNT(*) conta linha preservada mesmo com p.id NULL; COUNT(p.id) ignora NULL.'),('Qual o papel de HAVING em SQL?','Filtrar grupos após agregação; WHERE filtra linhas antes da agregação.')]
},
{
'code':'BD','title':'[Oficina] Transações concorrentes, isolamento e consistência','objective':'Analisar anomalias de concorrência e recomendar um isolamento compatível com a regra de negócio.',
'source_label':'PostgreSQL — Transaction Isolation','source_url':'https://www.postgresql.org/docs/current/transaction-iso.html',
'content':'''# Caso de prova — duas vendas disputam o último item
Uma loja possui uma unidade em estoque. Duas transações simultâneas consultam saldo=1 e ambas decidem vender uma unidade. Se cada operação se comportar como “ler, decidir e atualizar” sem controle apropriado, a lógica do negócio pode ser violada. Para avaliar a situação, separe **atomicidade de isolamento**: atomicidade trata de completar ou desfazer um conjunto de operações; isolamento trata dos efeitos observáveis entre transações concorrentes.

## Caminhos de solução
Uma operação atômica condicionada pode atualizar estoque somente se houver saldo suficiente, verificando número de linhas afetadas. Outra opção é bloquear linha para atualização dentro de transação adequada. Há também níveis mais fortes de isolamento; **Serializable** busca efeito equivalente a alguma execução serial, mas pode exigir repetição de transações abortadas por conflitos. A escolha depende do SGBD, do padrão de acesso e das garantias exigidas.

```sql
UPDATE estoque
SET quantidade = quantidade - 1
WHERE produto_id = 7 AND quantidade >= 1;
```

Verifique se a atualização afetou uma linha. Se apenas uma transação obtiver sucesso, a outra deve receber resposta de indisponibilidade de estoque, não um pedido aceito. Não deduza que `COMMIT` sempre detectará um erro de regra de negócio: o banco garante propriedades específicas, mas aplicações precisam representar corretamente as invariantes.

## Anomalias cobradas
**Dirty read**: ler alterações ainda não confirmadas de outra transação. **Nonrepeatable read**: duas leituras da mesma linha apresentam valores diferentes após transação concorrente. **Phantom read**: a mesma consulta por predicado pode retornar conjunto distinto de linhas entre leituras. **Lost update**: uma alteração sobrescreve outra sem tratamento apropriado; a manifestação depende da estratégia de leitura e escrita. A implementação de níveis varia entre bancos; em PostgreSQL, Read Uncommitted se comporta como Read Committed em razão do modelo MVCC.

## Consistência e índices
Chaves estrangeiras e restrições ajudam a preservar regras definidas no banco; nem toda regra de negócio cabe automaticamente numa única constraint. Índices reduzem custo de leituras específicas, mas criam manutenção e não transformam operação logicamente incorreta em correta. `EXPLAIN` fornece plano estimado; `EXPLAIN ANALYZE` executa consulta e mede estatísticas reais, portanto precisa de cautela em comandos que alteram dados.

## Armadilhas típicas
- ACID não significa que todo bug de concorrência está resolvido.
- `ROLLBACK` desfaz alterações da transação conforme o suporte do banco; não restaura backup de dias anteriores.
- Níveis de isolamento têm custo, anomalias permitidas e particularidades de implementação.
- A integridade exige validação na camada adequada, e a aplicação deve tratar conflitos.

## Exercício
Descreva o problema das duas vendas usando uma linha do tempo T1/T2. Depois explique por que atualizar o estoque com cláusula de condição e conferir `rowcount` é mais robusto do que confiar em uma leitura anterior.''',
'questions':[
('Duas transações leem saldo=1 e tentam vender o mesmo item. Qual medida reduz risco de aceitar vendas incompatíveis com o estoque?', ['Atualização atômica condicionada e verificação das linhas alteradas','Retirar toda restrição de integridade da tabela','Executar apenas SELECT antes das vendas sem validação posterior','Criar índice em coluna de nome do cliente e ignorar concorrência'],0,'Update condicionado ao saldo e verificação de sucesso reduz inconsistência entre leitura e escrita.'),
('Qual afirmação sobre EXPLAIN ANALYZE em PostgreSQL está correta?', ['Executa o comando e coleta informações de execução; requer cuidado com comandos que alteram dados','Nunca executa o comando descrito','É equivalente ao comando ROLLBACK obrigatório','Garante plano idêntico em todas as execuções futuras'],0,'EXPLAIN ANALYZE executa a operação e coleta estatísticas, inclusive quando o comando é modificador de dados.')],
'cards':[('Isolamento ACID resolve que classe de problemas?','Define visibilidade/efeitos entre transações concorrentes, conforme nível e implementação.'),('Por que confirmar rowcount em UPDATE condicional?','Para saber se a atualização respeitando a condição realmente ocorreu.')]
},
{
'code':'ENG','title':'[Oficina] Histórias de usuário, critérios de aceite e testes','objective':'Converter pedidos vagos em critérios verificáveis e identificar casos de teste com resultado esperado.',
'source_label':'SWEBOK — Engenharia de Software','source_url':'https://www.computer.org/education/bodies-of-knowledge/software-engineering',
'content':'''# Caso de prova — o requisito “o sistema deve ser rápido”
Uma clínica solicita um portal que “abra rápido” e “seja seguro”. Esses enunciados são intenções, não critérios suficientemente testáveis. Para especificar, traduza cada pedido em **comportamento observável, métrica, condição e resultado esperado**. Por exemplo: “Sob carga de 100 usuários concorrentes no ambiente de homologação, 95% das consultas do histórico devem retornar em até dois segundos”. O requisito de desempenho tem unidade, limite e cenário mensurável, mas ainda pode precisar de ressalvas sobre volume dos dados e infraestrutura.

## Da necessidade à história testável
Uma história de usuário pode ser: “Como recepcionista, quero visualizar horários disponíveis para agendar exames”. Critérios de aceite devem cobrir caminho feliz, validação e exceções. Exemplo: dado usuário autenticado com permissão e agenda aberta, quando consultar dia sem horários, o sistema deve retornar lista vazia com mensagem apropriada, não erro 500. Quando não estiver autenticado, deve exigir autorização. Quando duas pessoas reservarem o mesmo horário simultaneamente, a persistência deve impedir dupla ocupação.

## Casos de teste — escreva entradas e saídas
Teste 1: usuário autorizado consulta data válida com horários; espera HTTP 200 e lista consistente. Teste 2: consulta sem token; espera resposta de não autenticado conforme contrato. Teste 3: tenta agendar horário já reservado; espera falha controlada e nenhuma duplicação. Teste 4: consulta com data inválida; espera erro de validação apropriado. Note que o teste precisa de **pré-condição, ação e oráculo**, isto é, o que permite decidir se passou.

## Qual nível de teste usar?
Unidade testa função ou componente delimitado com dependências controladas. Integração verifica cooperação de componentes, como API e banco. End-to-end percorre fluxo de negócio, mas pode ser mais lento e frágil. Não se espera que um único teste prove todos os requisitos não funcionais; performance demanda ambiente e medição apropriados.

## O que provas cobram
A banca pode trocar requisito funcional (“usuário pode agendar”) por não funcional (“99,9% disponibilidade”) ou confundir caso de uso com caso de teste. Um caso de uso descreve interação e objetivo; um caso de teste especifica condições e verificação. Um critério de aceite ruim é “funcionar corretamente”; um bom tem situação e saída esperada observáveis.

## Exercício sem consulta
Escreva três critérios de aceite usando Dado/Quando/Então para reagendamento: sucesso; conflito de horário; usuário sem permissão. Garanta que o avaliador consiga conferir o resultado sem interpretar adjetivos vagos.''',
'questions':[
('Qual requisito é mais verificável em teste de desempenho?', ['95% das respostas em até 2 s sob carga e ambiente definidos','O sistema deve ser moderno e rápido','A aplicação terá ótima performance sempre','O banco deve funcionar sem qualquer requisito mensurável'],0,'Um alvo mensurável com condições declaradas permite verificar resultado de teste.'),
('Em um teste de integração, qual situação representa o alvo mais típico?', ['Verificar fluxo entre API e banco de dados','Verificar apenas sintaxe de uma variável isolada','Verificar ortografia do manual sem executar sistema','Verificar exclusivamente um ícone sem dependências'],0,'Integração avalia interações entre componentes, como API e persistência.')],
'cards':[('Qual é a estrutura mínima de um caso de teste verificável?','Pré-condição, ação/entrada e resultado esperado (oráculo).'),('Qual diferença principal entre requisito funcional e não funcional?','Funcional descreve capacidade/comportamento; não funcional define qualidade ou restrição mensurável.')]
},
{
'code':'ENG','title':'[Oficina] API HTTP: contratos, idempotência e falhas','objective':'Escolher métodos e códigos HTTP pela semântica e prever comportamento seguro diante de repetição de pedidos.',
'source_label':'RFC 9110 — HTTP Semantics','source_url':'https://www.rfc-editor.org/info/rfc9110/',
'content':'''# Caso de prova — pedido duplicado por falha de rede
Um aplicativo envia uma solicitação para criar agendamento; ocorre timeout e ele repete o pedido. Se o backend aceitar as duas requisições sem controle, pode criar agendamentos duplicados. Esse problema exige entender **semântica de métodos HTTP, idempotência e controle de duplicação no estado do servidor**.

## Métodos não são intercambiáveis
`GET` recupera representação e é definido como seguro: clientes não deveriam provocar alteração intencional de estado por simples consulta. `PUT` substitui/define estado de um recurso de maneira idempotente conforme contrato; repetir a mesma requisição tem o mesmo efeito pretendido que executar uma vez. `DELETE` também tem propriedade idempotente no efeito pretendido, embora respostas a pedidos repetidos possam diferir. `POST` geralmente solicita processamento cuja repetição **não é garantidamente idempotente**: uma criação repetida pode produzir efeitos duplicados.

## Estratégia para criação robusta
Uma API de agendamento pode receber uma chave de idempotência por solicitação lógica, armazenando resultado associado e aplicando restrições de unicidade apropriadas. Se a mesma operação for repetida, a API devolve a representação ou resposta previamente determinada, em vez de criar novo recurso. A chave deve ser associada ao contexto e ao conteúdo esperado; não é mecanismo de autenticação. Chaves estrangeiras, índices únicos e transações protegem invariantes no banco. Lembre que “mesmo método HTTP” não prova existência de controle de duplicação na aplicação.

## Status e erros: não decore somente números
`200 OK` indica sucesso genérico; `201 Created` é apropriado quando um recurso foi criado; `204 No Content` pode indicar sucesso sem corpo; `400 Bad Request` sinaliza pedido inválido em termos gerais; `401 Unauthorized` refere-se a ausência ou falha de autenticação; `403 Forbidden` a recusa de acesso no contexto; `409 Conflict` a conflito com estado atual. O comportamento concreto deve ser documentado no contrato e verificado em testes.

## Exemplo de caso de teste
Dado um pedido identificado pela chave K e válido, quando o cliente envia duas vezes por timeout, então a aplicação deve registrar um único agendamento e dar resposta consistente com o contrato. Um teste de carga que apenas verifica taxa de resposta não detecta necessariamente duplicação funcional; são medidas diferentes.

## Armadilhas de prova
- Idempotência descreve efeito pretendido da repetição, não igualdade garantida de todos os códigos ou cabeçalhos.
- GET deve ter semântica segura; implementar alteração de dados em GET viola expectativa de clientes e caches.
- Código 401 não significa “acesso proibido após autenticação” em toda situação; esse caso normalmente se relaciona a 403.
- JSON é formato de representação, não protocolo que determina autenticação, consistência ou idempotência.

## Exercício
Explique em até seis linhas a diferença entre PUT e POST em contexto de repetição. Em seguida, proponha um requisito de idempotência para reservas com timeout e um teste que comprove o efeito.''',
'questions':[
('Ao repetir duas vezes o mesmo POST para criar agendamento, o que é correto afirmar?', ['A semântica de POST não garante por si só ausência de criação duplicada','POST é sempre idempotente por definição da RFC','A segunda solicitação será convertida automaticamente em GET','O status 201 impede qualquer repetição de rede'],0,'POST não tem idempotência garantida; a aplicação deve tratar repetição conforme seu contrato.'),
('Um usuário autenticado tenta ação para a qual não possui autorização. Qual código HTTP geralmente descreve melhor a recusa?', ['403 Forbidden','201 Created','204 No Content','301 Moved Permanently'],0,'403 expressa recusa de satisfazer requisição no contexto; 401 está ligado a autenticação.')],
'cards':[('Qual método HTTP possui semântica segura de recuperação?','GET; não deve gerar alteração intencional de estado pela simples consulta.'),('Por que chave de idempotência não substitui autenticação?','Evita repetição lógica de operações, mas não prova identidade nem concede autorização.')]
},
{
'code':'LOG','title':'[Oficina] Condicionais, conjuntos e seleção de candidatos','objective':'Resolver problemas de lógica com implicação e interseção sem pressupor recíproca de condições.',
'source_label':'Khan Academy — Lógica e Matemática','source_url':'https://pt.khanacademy.org/math',
'content':'''# Caso de prova — requisitos de um concurso
Um edital hipotético afirma: “Se o candidato é nomeado, então apresentou o diploma exigido”. Representando nomeação por N e diploma por D, temos `N → D`. A frase **não autoriza** concluir `D → N`: possuir diploma é condição necessária nesse enunciado, mas não suficiente para nomeação, que depende de aprovação, classificação e outras exigências. A contrapositiva `¬D → ¬N` é logicamente equivalente à implicação original.

## Tabela de verdade em palavras
`P → Q` só é falsa quando P é verdadeira e Q é falsa. Nos outros três casos, é verdadeira na lógica proposicional clássica. Isso não significa que um antecedente falso prova qualquer fenômeno na realidade: a tabela define a semântica do conectivo. Para negar `P → Q`, escreva `P ∧ ¬Q`. A recíproca `Q → P` e a inversa `¬P → ¬Q` não são equivalências gerais da original.

## Problema de conjuntos resolvido
Em 100 estudantes, 60 estudam Redes, 45 estudam Português e 20 estudam ambas. Pela inclusão-exclusão, `|R ∪ P| = 60 + 45 − 20 = 85`. Portanto, 15 não estudam nenhuma das duas. Somente Redes = 40; somente Português = 25; ambas = 20. Soma das quatro regiões: `40 + 25 + 20 + 15 = 100`. Esse balanço evita erro comum de somar diretamente 60+45 e concluir que 105 estudantes são pessoas diferentes.

## Um quadro para responder à banca
Ao encontrar “todos”, “algum”, “nenhum”, converta para quantificadores. Negação de “todos estão aprovados” é “existe ao menos um que não está aprovado”. Negação de “existe aluno que conhece Linux” é “nenhum aluno conhece Linux”. Lembre que “alguns” não significa necessariamente “a maioria”.

## Treino sem consulta
Troque R e P por “aprovados em Redes” e “aprovados em Segurança”. Defina um conjunto com 120 pessoas, 70 em R, 50 em S e 30 em ambos. Calcule somente R, somente S, nenhum e a união. Em seguida, encontre a negação de “Se passei em Redes, passei em Segurança”.

## Pegadinhas
- “Se A então B” não permite concluir “se B então A”.
- Negação de todos não é necessariamente nenhum.
- Interseção somada duas vezes deve ser subtraída na união.
- Condição necessária não é condição suficiente.''',
'questions':[
('Em 100 estudantes, 60 estudam Redes, 45 Português e 20 ambos. Quantos não estudam nenhuma das duas?', ['15','20','35','55'],0,'União = 60+45−20=85; fora da união = 100−85=15.'),
('Qual é a contrapositiva de “Se N então D”?', ['Se não D, então não N','Se D, então N','Se não N, então não D','N e não D'],0,'A contrapositiva de N→D é ¬D→¬N; a recíproca e a inversa não são equivalentes gerais.')],
'cards':[('Qual a negação de P implica Q?','P e não Q (P ∧ ¬Q).'),('Como calcular união de dois conjuntos A e B?','|A∪B| = |A|+|B|−|A∩B|, evitando dupla contagem da interseção.')]
},
{
'code':'LOG','title':'[Oficina] Probabilidade, contagem e interpretação de risco','objective':'Aplicar contagem e probabilidade condicional com denominadores corretos em questões de seleção.',
'source_label':'Khan Academy — Probabilidade','source_url':'https://pt.khanacademy.org/math/statistics-probability',
'content':'''# Caso de prova — tirar conclusões a partir de uma amostra
Uma prova apresenta um grupo de 40 candidatos, dos quais 24 estudam Linux e 16 não estudam. Entre os 24 que estudam Linux, 18 acertaram uma questão de redes; entre os 16 restantes, 8 acertaram. Se escolhermos aleatoriamente **um candidato do grupo**, a chance de ele ter acertado é `(18+8)/40 = 26/40 = 65%`. Se escolhermos aleatoriamente **um candidato que estuda Linux**, a chance condicional de acerto é `18/24 = 75%`. Os denominadores diferem porque a população de referência mudou.

## Probabilidade condicional sem mistério
A fórmula é `P(A|B) = P(A ∩ B) / P(B)` para `P(B)>0`. É preciso definir A (acertar) e B (estudar Linux) antes de substituir números. Inverter o condicionamento, usando `P(B|A)`, responde outra pergunta; nesse caso seria `18/26`, não `18/24`. Este é um dos erros mais frequentes em questões que parecem simples.

## Contagem: ordem importa?
Um sistema cria senhas de três caracteres distintos usando as cinco letras A, B, C, D, E. Como a ordem importa, são `5 × 4 × 3 = 60` possibilidades. Se a pergunta fosse apenas escolher três letras para formar um grupo sem ordem, o total seria `C(5,3) = 5!/(3!2!) = 10`. Compare os verbos “escolher”, “ordenar”, “distribuir” e “formar sequência”, mas confira as condições de repetição.

## Eventos independentes
Se cada tentativa é independente e a chance de acerto é 1/4, a probabilidade de acertar duas tentativas consecutivas é `(1/4) × (1/4) = 1/16`. Mas, em sorteio sem reposição, as probabilidades mudam entre etapas: não multiplique como se fossem independentes sem verificar reposição.

## Interpretação correta de resultados
Uma diferença de acertos entre grupos numa amostra não prova que estudar Linux causou o desempenho. Podem existir variáveis de confusão, seleção e tamanho amostral. Concursos de lógica avaliam cálculo sob premissas dadas; conclusões causais exigem fundamentos adicionais.

## Exercício sem consulta
Em 60 candidatos, 30 estudam Redes. Destes, 21 acertaram. Entre os 30 que não estudam Redes, 12 acertaram. Calcule P(acertar), P(acertar|estuda Redes) e P(estuda Redes|acertar). Escreva os três denominadores antes dos numeradores.''',
'questions':[
('Em 40 candidatos, 24 estudam Linux e 18 desses acertaram. Qual a probabilidade de acerto condicionada a estudar Linux?', ['75%','45%','65%','18%'],0,'P(acerto|Linux)=18/24=0,75; 18/40 seria probabilidade conjunta no grupo inteiro.'),
('Quantas sequências de três letras distintas podem ser formadas com cinco letras disponíveis, considerando a ordem?', ['60','10','15','125'],0,'São arranjos sem repetição: 5×4×3=60. Escolher sem ordem daria 10.')],
'cards':[('Qual denominador usar em P(A|B)?','A quantidade ou probabilidade do universo B, desde que P(B)>0.'),('Quando o arranjo de 3 letras entre 5 dá 60?','Quando há ordem e não há repetição: 5×4×3.')]
},
{
'code':'LEG','title':'[Oficina] LGPD no atendimento público: base, finalidade e transparência','objective':'Analisar tratamento de dados por órgão público sem presumir consentimento como base universal.',
'source_label':'Lei 13.709/2018 — Planalto','source_url':'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
'content':'''# Caso de prova — órgão público integra registros de atendimento
Uma prefeitura pretende integrar informações pessoais de sistemas de atendimento para facilitar execução de política pública. Uma afirmação comum é “pode usar qualquer dado porque é órgão público”; outra é “precisa pedir consentimento para todo tratamento”. As duas são simplificações incorretas. A **LGPD** exige finalidade, adequação, necessidade, transparência e base legal pertinente, considerando regras de tratamento pelo poder público e hipóteses específicas.

## Método de análise da situação
Primeiro, defina a finalidade pública concreta e a competência do órgão. Segundo, identifique quais dados são necessários para essa finalidade; dados de saúde podem ser dados pessoais sensíveis, com regras reforçadas. Terceiro, avalie qual base legal e quais dispositivos aplicáveis sustentam o tratamento; não escolha consentimento automaticamente. Quarto, estabeleça controles de segurança, registros de operações, retenção e acesso por papéis. Quinto, verifique transparência e informação aos titulares, respeitando hipóteses legais de sigilo.

## Exemplo resolvido
Um gestor solicita acesso irrestrito a todo o histórico de saúde para acompanhar estatísticas agregadas. A finalidade informada pode ser atendida por dados agregados ou efetivamente anonimizados em alguns cenários, reduzindo exposição. Se dados identificáveis forem indispensáveis, o órgão deve documentar justificativa, minimização, acesso e base jurídica específica. **Anonimização efetiva** não deve ser confundida com simples remoção de nome: combinações de atributos podem permitir reidentificação e devem ser avaliadas conforme meios razoáveis disponíveis.

## Como escrever uma resposta técnica
Evite “todos os dados da prefeitura são públicos”. Prefira: “O tratamento de dados pelo poder público depende da finalidade legalmente legitimada e da observância dos princípios da LGPD. O acesso deve ser limitado à necessidade demonstrada, com medidas de segurança e transparência adequadas.” Essa redação vincula conceito, condição e consequência, sem fazer afirmação absoluta.

## Armadilhas de banca
- Consentimento não é a única base legal, e em relações assimétricas pode não ser a mais adequada.
- Dados disponíveis internamente não se tornam automaticamente de livre divulgação.
- Pseudonimização não equivale necessariamente a anonimização irreversível.
- Lei de Acesso à Informação e LGPD precisam ser interpretadas de forma compatível com publicidade e proteção de dados, não como princípios automaticamente excludentes.

## Verificação normativa
Antes de usar esta aula para responder sobre artigos específicos, confira a redação atual da lei no Planalto. Este material é didático e não reproduz o texto integral nem substitui interpretação jurídica aplicável ao caso.''',
'questions':[
('Ao integrar dados pessoais para política pública, qual conduta é mais adequada?', ['Demonstrar finalidade, base legal e necessidade dos dados','Presumir que todo dado do órgão é público e irrestrito','Exigir consentimento como única base legal possível','Dispensar medidas de segurança por se tratar de órgão público'],0,'Tratamento exige fundamento jurídico e observância de princípios e medidas de proteção; ser órgão público não dispensa análise.'),
('Qual medida se alinha ao princípio da necessidade na LGPD?', ['Tratar apenas dados adequados e necessários à finalidade legítima','Coletar todos os dados disponíveis para eventual uso futuro indefinido','Dar acesso integral a qualquer servidor sem função definida','Publicar históricos identificáveis para facilitar relatórios internos'],0,'Necessidade limita dados ao mínimo pertinente à finalidade do tratamento.')],
'cards':[('Órgão público sempre depende de consentimento para tratar dados?','Não. Deve identificar base legal adequada e observar os requisitos da LGPD.'),('Remover nome torna dados automaticamente anônimos?','Não. Pode haver reidentificação por outros atributos e contexto.')]
},
{
'code':'LEG','title':'[Oficina] ETP, termo de referência e fiscalização de contratação de TI','objective':'Distinguir planejamento da necessidade, especificação de objeto e fiscalização de execução contratual.',
'source_label':'Lei 14.133/2021 — Planalto','source_url':'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm',
'content':'''# Caso de prova — substituição de solução de backup
Uma prefeitura pretende contratar uma solução de backup. Um solicitante já aponta fornecedor específico e pede “compre este software porque todos usam”. O planejamento adequado começa com a **necessidade pública**: quais sistemas precisam ser recuperados, que RPO/RTO foram definidos, quais dados são sensíveis, onde a solução operará e quais restrições de integração, suporte, segurança e disponibilidade existem.

## Estudo Técnico Preliminar — raciocínio de alternativas
O ETP caracteriza o problema e analisa viabilidade e alternativas, conforme regime jurídico e regras aplicáveis. Soluções possíveis podem incluir ajuste de infraestrutura existente, serviços gerenciados, contratação de licenças e combinação de métodos. A análise considera custo de ciclo de vida, continuidade, compatibilidade, riscos de fornecedor e segurança. O objetivo é justificar **por que** uma solução atende à necessidade antes de apenas transcrever uma marca comercial.

## Termo de Referência — condições verificáveis
O TR descreve objeto e requisitos de contratação, condições de execução, medição, recebimento e outros elementos cabíveis. Um requisito como “software confiável” é vago; “restaurar amostra definida de bases dentro do prazo especificado em teste de aceite documentado” é verificável. Critérios inadequados ou excessivamente direcionados podem restringir competitividade; requisitos devem ser justificados.

## Fiscalização — não basta assinar contrato
Na execução, monitore entregas, SLA, incidentes, evidências de backup e testes de restauração. Atestar recebimento sem comprovar execução pode gerar problema de controle. Fiscalização técnica não significa que todo analista possui competência formal para aplicar penalidade ou autorizar pagamento; a distribuição de funções depende dos atos e regras institucionais.

## Exemplo de sequência correta
1. Documentar indisponibilidades e impacto da ausência de recuperação.
2. Definir RTO/RPO e dados abrangidos com as áreas responsáveis.
3. Avaliar soluções e custos no planejamento aplicável.
4. Especificar objeto, teste de aceite, evidências e níveis de serviço.
5. Receber, testar e acompanhar execução com responsabilidades definidas.

## Armadilhas de banca
- ETP e TR **não são o mesmo documento** nem possuem exatamente a mesma finalidade.
- Licitação não dispensa fiscalização de execução.
- Menor preço nominal não é sinônimo automático de menor custo total ou de solução adequada.
- O artigo 18 da Lei 14.133/2021 contém elementos da fase preparatória; regras locais, federais e regulamentação aplicáveis devem ser verificadas.

## Prática
Escreva cinco requisitos mensuráveis de uma contratação de backup: periodicidade, prazo de restauração, integridade, segurança e relatórios. Para cada requisito, inclua método de aceitação. Em outra coluna, explique qual problema operacional o requisito busca prevenir.''',
'questions':[
('Uma prefeitura quer comprar backup de marca previamente escolhida sem análise. Qual etapa ajuda a fundamentar necessidade e alternativas?', ['Estudo Técnico Preliminar','Atestado de férias de servidor','Execução de pagamento sem objeto definido','Termo de recebimento sem contratação'],0,'ETP auxilia planejamento da necessidade e avaliação de soluções viáveis, conforme regime aplicável.'),
('Qual especificação é mais verificável num termo de referência de backup?', ['Comprovar restauração de amostra em prazo e ambiente definidos','Fornecer solução de qualidade excelente','Garantir risco zero em qualquer cenário futuro','Utilizar somente a marca preferida sem justificativa'],0,'Critério de aceitação mensurável permite verificar a entrega; frases vagas não permitem aferição objetiva.')],
'cards':[('Qual diferença entre ETP e TR em contratação de TI?','ETP caracteriza necessidade e analisa alternativas; TR especifica objeto, requisitos e execução.'),('Por que uma contratação de backup requer teste de restauração?','Para comprovar recuperabilidade e cumprimento de objetivos, não apenas existência de arquivos copiados.')]
}
]

def seed_workshops(db, sub, nowstr):
    """Adição idempotente. Não modifica progresso, anotações, históricos ou aulas antigas."""
    for rank, unit in enumerate(WORKSHOPS, 1):
        row = db.execute('SELECT id FROM topics WHERE subject_id=? AND title=?', (sub[unit['code']], unit['title'])).fetchone()
        if row:
            topic_id = row['id']
        else:
            topic_id = db.execute('INSERT INTO topics(subject_id,title,content,objective,minutes) VALUES(?,?,?,?,?)',
                                  (sub[unit['code']],unit['title'],unit['content'],unit['objective'],70)).lastrowid
            for front, back in unit['cards']:
                db.execute('INSERT INTO flashcards(topic_id,front,back,due_at) VALUES(?,?,?,?)',
                           (topic_id,front,back,nowstr()))
            for k, (stem, choices, index, explanation) in enumerate(unit['questions']):
                correct = choices[index]
                ordered = list(choices)
                random.Random(int(hashlib.sha256(f'workshop:{unit["title"]}:{k}'.encode()).hexdigest()[:12],16)).shuffle(ordered)
                db.execute('''INSERT INTO questions(topic_id,question,choices_json,correct_index,explanation,
                              fingerprint,origin,review_status) VALUES(?,?,?,?,?,?,?,?)''',
                           (topic_id,stem,json.dumps(ordered,ensure_ascii=False),ordered.index(correct),explanation,
                            fingerprint(stem,ordered),'autoral','revisada'))
        # As oficinas pertencem a outra etapa do curso, sem reescrever títulos antigos.
        db.execute('''INSERT INTO lesson_meta(topic_id,track,source_url,source_label,module_order,material_version)
                      VALUES(?,?,?,?,?,?) ON CONFLICT(topic_id) DO UPDATE SET
                      track=excluded.track,source_url=excluded.source_url,
                      source_label=excluded.source_label,module_order=excluded.module_order,
                      material_version=excluded.material_version''',
                   (topic_id,'Oficina de prova',unit['source_url'],unit['source_label'],rank,'1.2'))
