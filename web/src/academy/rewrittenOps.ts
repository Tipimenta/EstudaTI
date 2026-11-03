import type {PedagogicalLesson} from './intro1'
export const rewrittenOps:Record<number,Partial<PedagogicalLesson>>={
  "23": {
    "id": 23,
    "goal": "Entender cada mensagem do DHCPv4, a diferença entre adquirir e renovar endereço e como diagnosticar falhas de configuração automática.",
    "steps": [
      {
        "title": "Por que um computador precisa de configuração de rede",
        "body": "Ao conectar uma estação à rede, não basta existir cabo e sinal de Wi-Fi. Para falar com outros dispositivos IPv4, ela normalmente precisa de **endereço IP**, **máscara/prefixo**, **gateway** e, para consultar nomes, **DNS**. Podemos preencher esses parâmetros manualmente, mas em ambientes com muitas estações isso causa erros e trabalho desnecessário. O **DHCPv4** automatiza a distribuição das configurações por tempo limitado, chamado de *lease*.\n\nO servidor DHCP administra um conjunto de endereços disponíveis e decide qual configuração oferecer. Uma oferta não significa que o endereço seja propriedade definitiva do equipamento: existe prazo de concessão, renovação e possibilidade de receber endereço diferente em outro momento."
      },
      {
        "title": "DORA — quatro mensagens com funções distintas",
        "body": "Na obtenção clássica de endereço IPv4, o cliente ainda não conhece seu IP e pode iniciar a descoberta por **DHCPDISCOVER**. Servidores que recebem a descoberta podem enviar **DHCPOFFER**, propondo endereço e parâmetros. O cliente anuncia sua escolha com **DHCPREQUEST**. O servidor confirma o uso com **DHCPACK**.\n\nA ordem **Discover → Offer → Request → Acknowledge** forma a sigla DORA. Não confunda 'Offer' com atribuição final: a confirmação ocorre no ACK. Se o servidor não concordar com o endereço solicitado, pode ocorrer resposta negativa, como DHCPNAK, conforme o contexto."
      },
      {
        "title": "Renovação, relay e gateway: não são a mesma função",
        "body": "Depois de obter o lease, o cliente pode tentar **renová-lo** antes do vencimento, normalmente sem repetir toda a descoberta em broadcast. Em redes com vários segmentos, servidores DHCP podem ficar em outra sub-rede: um **DHCP relay** encaminha mensagens apropriadas entre cliente e servidor. Isso não é o mesmo que o gateway padrão de tráfego geral, embora equipamentos possam realizar ambos os papéis.\n\nO DHCP costuma informar **gateway padrão**, mas não o substitui. O gateway é quem encaminha pacotes destinados a outras redes; o DHCP apenas entrega o parâmetro que o cliente deve utilizar."
      },
      {
        "title": "Diagnóstico: recebi IP, mas não abre o sistema",
        "body": "Quando uma estação recebe endereço automático, verifique **qual IP, máscara, gateway e DNS foram realmente entregues**. Se ela recebe um endereço IPv4 autoconfigurado da faixa 169.254.0.0/16, isso frequentemente indica que não conseguiu configuração DHCP válida e está usando endereçamento local (*link-local*). Se recebe IP normal, mas não resolve nomes, o problema pode estar no DNS informado, não no DHCP em si.\n\nEm prova, evite responder que 'DHCP resolve nomes' ou 'DHCP encaminha pacotes': o primeiro é papel do DNS, e o segundo, do roteador."
      }
    ],
    "worked": {
      "title": "Um computador recebe IP, mas não acessa a aplicação",
      "body": "**Situação:** a estação recebeu automaticamente IP 192.168.1.80/24, gateway 192.168.1.1 e DNS 8.8.8.8. Ela acessa um servidor interno pelo IP, mas não consegue localizar **sistema.interno.local**.\n\n**Passo 1.** O endereço IP e gateway foram entregues; o DHCP aparentemente concluiu a configuração.\n\n**Passo 2.** O acesso por IP funciona. A diferença principal entre a tentativa que funciona e a que falha é a **resolução de nomes**.\n\n**Passo 3.** Verifique se o DNS configurado conhece a zona interna. Um DNS público pode desconhecer os nomes privados do domínio.\n\n**Conclusão:** o sintoma aponta primeiro para **DNS inadequado**, embora o endereço do DNS possa ter sido distribuído pelo DHCP."
    },
    "pitfalls": [
      "DHCPDISCOVER inicia a descoberta; DHCPACK confirma a concessão.",
      "Uma oferta DHCP não garante, sozinha, que a configuração foi concluída.",
      "O DHCP distribui o endereço do gateway, mas não roteia pacotes por conta própria.",
      "Endereçamento link-local IPv4 pode aparecer quando a obtenção via DHCP falha."
    ],
    "review": [
      {
        "ask": "Qual a sequência DORA no DHCPv4?",
        "answer": "Discover, Offer, Request, ACK."
      },
      {
        "ask": "Qual mensagem confirma o lease no DHCPv4?",
        "answer": "DHCPACK."
      },
      {
        "ask": "IP funciona e nome interno não resolve: qual serviço investigar?",
        "answer": "DNS, inclusive se o DHCP entregou um resolvedor que conhece a zona interna."
      },
      {
        "ask": "Qual o papel do DHCP relay?",
        "answer": "Permitir encaminhamento das mensagens DHCP entre segmentos de rede apropriados."
      }
    ]
  },
  "30": {
    "id": 30,
    "goal": "Compreender a cadeia de confiança de certificados digitais e o papel de TLS sem confundir autenticação, cifra e validade do certificado.",
    "steps": [
      {
        "title": "Por que o cadeado não depende só de criptografia",
        "body": "Imagine que alguém intercepte a conexão entre um navegador e um sistema de prontuários. Criptografar os dados ajuda a protegê-los, mas surge outra pergunta: **como o navegador sabe que está conversando com o servidor legítimo?** Um certificado digital, associado a uma infraestrutura de chaves públicas (**PKI**), ajuda a vincular uma identidade a uma chave pública de modo verificável.\n\nO certificado de servidor não contém a chave privada do servidor. Ele contém informações como identidade, chave pública, validade e assinatura de uma entidade emissora. A chave privada correspondente precisa permanecer protegida."
      },
      {
        "title": "Como o cliente avalia um certificado",
        "body": "Ao receber um certificado TLS, o cliente normalmente avalia se o **nome do serviço** está coberto pelo certificado, se a **validade temporal** está adequada e se há uma **cadeia de confiança** até uma autoridade reconhecida. Também podem existir verificações de revogação conforme política e capacidade da aplicação.\n\nTer certificado assinado não garante que qualquer nome da Internet seja válido para aquele servidor. Um certificado emitido para **api.exemplo.org** não deve ser aceito automaticamente para **pagamentos.outraempresa.com**. O nome apresentado importa tanto quanto o emissor."
      },
      {
        "title": "TLS na conexão: várias proteções trabalhando juntas",
        "body": "O **TLS** negocia parâmetros de segurança e estabelece chaves de sessão para proteger o tráfego. O certificado é um dos instrumentos de autenticação da identidade do servidor; as chaves de sessão protegem confidencialidade e integridade dos dados transmitidos. Não confunda o certificado com o algoritmo simétrico usado depois do estabelecimento do canal.\n\nMesmo com HTTPS, um sistema ainda pode conter falhas de autorização, sessões mal gerenciadas ou credenciais comprometidas. A conexão segura protege o transporte, mas não valida todas as decisões de negócio."
      },
      {
        "title": "Como identificar o erro descrito em uma questão",
        "body": "Se o navegador mostra erro de **nome incompatível**, compare host acessado e nomes do certificado. Se o problema é **expiração**, avalie validade e relógio. Se aparece **autoridade não confiável**, investigue cadeia/âncora de confiança. Se o enunciado falar em chave privada exposta, há risco grave de personificação e necessidade de resposta de segurança.\n\nBancas podem inserir alternativas como 'certificado garante que o usuário possui permissão' — isso mistura autenticação de identidade com **autorização da aplicação**."
      }
    ],
    "worked": {
      "title": "Certificado válido, mas para o servidor errado",
      "body": "**Cenário:** o navegador acessa **laudos.exemplo.org**, mas o servidor apresenta certificado válido, confiável e ainda dentro do prazo cujo único nome é **portal.exemplo.org**.\n\n**Passo 1.** A validade temporal não resolve o problema, porque o certificado pode estar dentro do prazo e ainda ser inadequado para o endereço visitado.\n\n**Passo 2.** A cadeia de confiança também não é suficiente sozinha: o nome do host precisa estar coberto pelo certificado.\n\n**Passo 3.** A conclusão é **incompatibilidade de identidade do servidor**. Deve-se verificar o certificado correspondente ao nome efetivamente utilizado.\n\n**Pegadinha:** não é uma falha 'obrigatória do TCP'; TCP pode estabelecer conexão normalmente enquanto a validação TLS falha."
    },
    "pitfalls": [
      "Certificado digital de servidor não publica sua chave privada.",
      "Certificado assinado por uma autoridade conhecida não vale automaticamente para qualquer domínio.",
      "TLS não substitui autenticação e autorização dos usuários da aplicação.",
      "Validade, nome do host e cadeia de confiança são verificações diferentes."
    ],
    "review": [
      {
        "ask": "O certificado de servidor vincula a identidade a qual chave?",
        "answer": "À chave pública; a chave privada correspondente deve ser protegida."
      },
      {
        "ask": "Um certificado válido para outro domínio deve ser aceito automaticamente?",
        "answer": "Não. O nome do serviço precisa corresponder aos identificadores do certificado."
      },
      {
        "ask": "TLS protege transporte ou regras de autorização de usuário?",
        "answer": "Protege o canal de comunicação; autorização é controle separado da aplicação."
      },
      {
        "ask": "O que verificar diante de erro 'autoridade não confiável'?",
        "answer": "A cadeia de certificação e as âncoras de confiança do cliente."
      }
    ]
  },
  "37": {
    "id": 37,
    "goal": "Gerenciar serviços Linux com systemd e diagnosticar falhas usando status, logs e portas, sem confundir comando com causa.",
    "steps": [
      {
        "title": "O que é um serviço gerenciado pelo systemd",
        "body": "Em um servidor Linux, alguns programas precisam iniciar com o sistema, permanecer ativos e reiniciar sob condições definidas. Em distribuições que usam **systemd**, eles podem ser descritos por unidades, como **.service**. O comando **systemctl** controla o estado e a configuração das unidades.\n\nHá uma diferença importante: **start** inicia o serviço agora; **enable** configura sua inicialização automática quando apropriado; **status** mostra seu estado atual. Habilitar uma unidade não garante que ela esteja funcionando neste instante. A banca costuma explorar exatamente essa distinção."
      },
      {
        "title": "Do sintoma ao primeiro comando",
        "body": "Se um serviço web não responde, comece obtendo evidências. **systemctl status nginx** apresenta o estado da unidade, mensagens recentes e pistas sobre falhas de inicialização. Se o serviço está 'failed', não é ideal executar dezenas de reinícios sem olhar os motivos; eles podem esconder a primeira mensagem útil.\n\nUse **journalctl -u nginx** para consultar os registros da unidade. Para restringir à inicialização atual, filtros como **-b** ajudam; para acompanhar novas entradas, pode-se usar **-f**. Os logs podem revelar problemas de permissão, arquivo de configuração, dependência ausente ou porta ocupada."
      },
      {
        "title": "A porta está realmente em escuta?",
        "body": "O comando **ss -ltn** mostra, em sistemas Linux que disponibilizam a ferramenta, sockets TCP em estado de escuta, sem resolver nomes. Para inspecionar processos associados, opções adicionais e permissões adequadas podem ser necessárias. Uma porta em escuta confirma que algum processo está aguardando conexões, mas não demonstra que o serviço de aplicação esteja saudável.\n\nSe a máquina responde ao ping, mas o site não abre, talvez o serviço não esteja ouvindo na porta correta ou haja bloqueio intermediário. **ICMP funcional não prova HTTP funcional**."
      },
      {
        "title": "Organize a investigação antes de alterar a configuração",
        "body": "Um roteiro seguro para diagnóstico é: (1) identificar o serviço e registrar o erro; (2) consultar status e logs; (3) verificar se a porta esperada está aberta; (4) testar localmente o serviço; (5) verificar DNS, firewall e roteamento conforme o sintoma. Só depois alterar configuração e testar de forma controlada.\n\nEm concursos, 'reiniciar tudo' raramente é a melhor resposta quando o enunciado pede **localizar a causa**. A prática correta associa cada ferramenta à pergunta que ela realmente responde."
      }
    ],
    "worked": {
      "title": "Serviço falha após uma mudança de configuração",
      "body": "**Cenário:** depois de alterar o arquivo de configuração do serviço web, o endereço deixa de responder. O servidor ainda está acessível por SSH.\n\n**Passo 1.** Consulte **systemctl status** da unidade para verificar se houve falha de inicialização.\n\n**Passo 2.** Leia **journalctl -u** para identificar mensagem de erro específica; uma configuração inválida costuma aparecer nos registros ou em ferramenta de teste da própria aplicação.\n\n**Passo 3.** Verifique com **ss -ltn** se a porta prevista está em escuta. Se não estiver, isso reforça investigação do serviço local.\n\n**Conclusão:** reúna evidências primeiro; corrija configuração e valide antes de reiniciar em produção."
    },
    "pitfalls": [
      "systemctl enable não é sinônimo de systemctl start.",
      "journalctl consulta logs do journal, não substitui toda ferramenta de monitoramento.",
      "ss -ltn mostra sockets TCP em escuta; isso não equivale a teste de aplicação.",
      "Ping bem-sucedido não comprova que o processo HTTP está ativo ou acessível."
    ],
    "review": [
      {
        "ask": "Qual comando costuma mostrar o estado de um serviço systemd?",
        "answer": "systemctl status NOME.service."
      },
      {
        "ask": "Qual comando consulta o journal de uma unidade?",
        "answer": "journalctl -u NOME.service."
      },
      {
        "ask": "Diferença entre start e enable no systemd?",
        "answer": "start inicia agora; enable configura inicialização automática quando aplicável."
      },
      {
        "ask": "Qual comando lista portas TCP em escuta?",
        "answer": "ss -ltn."
      }
    ]
  }
};
