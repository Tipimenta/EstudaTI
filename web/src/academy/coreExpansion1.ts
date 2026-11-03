import type {PedagogicalLesson} from './intro1'
export const coreExpansion1:PedagogicalLesson[]=[
  {
    "id": 22,
    "title": "DNS explicado do começo ao fim: como nomes encontram servidores",
    "goal": "Compreender resolução de nomes, registros DNS, cache e testes para reconhecer causas de falhas.",
    "steps": [
      {
        "title": "Por que não digitamos endereços IP para abrir sites?",
        "body": "Quando você digita um endereço como `sistema.exemplo`, o navegador precisa descobrir onde se encontra o serviço. Computadores trocam pacotes usando endereços IP, mas pessoas lembram nomes com muito mais facilidade. O **DNS — Domain Name System** funciona como um sistema distribuído de consulta que associa nomes a diferentes tipos de registros. Ele não transporta a página nem autentica o usuário: sua tarefa, nesse contexto, é ajudar a localizar o endereço ou outras informações do nome solicitado.\n\nPense na agenda do celular. Você toca em um contato, mas a ligação usa um número. O DNS possui uma função parecida para nomes de rede. A analogia é limitada porque uma entrada DNS pode apontar para vários endereços e diferentes registros, e o resultado pode depender da configuração e do resolvedor utilizado."
      },
      {
        "title": "A sequência de uma consulta",
        "body": "Em um cenário comum, o computador consulta o **resolvedor recursivo** configurado. Se a resposta estiver em cache e ainda for válida, pode retornar rapidamente. Caso contrário, o resolvedor consulta servidores apropriados, utilizando informações de hierarquia do DNS até obter uma resposta autoritativa ou outra conclusão. Essa distribuição é uma razão de o DNS suportar uma Internet tão grande.\n\nO campo **TTL (Time To Live)** influencia por quanto tempo determinadas respostas podem ser mantidas em cache. Se um endereço IP muda, um cliente pode temporariamente receber resposta antiga até expirar o cache, dependendo da configuração. Alterar o TTL não obriga todos os caches já preenchidos a mudarem imediatamente."
      },
      {
        "title": "Registros que você precisa distinguir",
        "body": "Um registro **A** associa nome a IPv4; **AAAA**, a IPv6. **CNAME** estabelece nome alternativo para outro nome em condições apropriadas. **MX** indica servidores relacionados ao recebimento de e-mails do domínio. **NS** indica servidores de nomes associados a uma zona/delegação. Há outros tipos, como TXT, usados para finalidades diversas.\n\nNão confunda DNS com **DHCP**. DHCP pode fornecer à estação seu IP, máscara, gateway e endereço de resolvedor; DNS é o serviço que responde consultas sobre nomes. Um dispositivo pode receber IP corretamente por DHCP e ainda falhar na resolução DNS por configuração, conectividade com o resolvedor ou registros inexistentes."
      },
      {
        "title": "Como interpretar testes",
        "body": "No Windows, `nslookup sistema.exemplo` consulta a resolução do nome por um resolvedor. No Linux, `dig sistema.exemplo` pode trazer mais detalhes, incluindo registros e autoridade. **NXDOMAIN** indica que o nome consultado não existe na visão da resposta DNS obtida. Uma resposta com endereço não prova que o servidor web esteja funcionando. Após resolver o nome, o cliente ainda precisa de rota, conectividade de transporte e processamento da aplicação.\n\nUma pegadinha de prova é afirmar que 'DNS usa somente UDP'. Consultas DNS podem utilizar UDP e TCP, conforme tamanho, protocolo e situação. Também não conclua que o DNS está correto apenas porque `ping` funciona: o teste usa ICMP e responde a outra pergunta."
      }
    ],
    "worked": {
      "title": "Caso guiado: sistema abre pelo IP, mas não pelo nome",
      "body": "**1. Sintoma:** um sistema interno pode ser acessado pelo IP informado, mas o endereço por nome não carrega.\n\n**2. Endereçamento:** confirme IP, máscara, gateway e servidor DNS configurados no computador.\n\n**3. Consulta:** execute `nslookup sistema.exemplo` e anote nome, tipo de resposta e resolvedor consultado.\n\n**4. Interpretação:** se houver NXDOMAIN, investigue grafia do nome, registros da zona e se o resolvedor conhece o domínio interno. Se retornar IP diferente do esperado, confira registros e cache.\n\n**5. Cuidado:** um portal HTTPS pode depender do nome para TLS e hospedagem virtual; acesso direto por IP não substitui completamente o teste pelo hostname.\n\n**Conclusão:** DNS resolve nomes, mas disponibilidade do serviço exige outros testes. O erro precisa ser localizado por evidências, não por troca aleatória de DNS."
    },
    "pitfalls": [
      "Registro A é IPv4; AAAA é IPv6; MX não aponta diretamente o site da mesma forma.",
      "DHCP entrega configurações, enquanto DNS responde a consultas de nomes.",
      "TTL influencia cache, mas não garante atualização instantânea em todos os clientes.",
      "Resposta DNS válida não comprova que HTTPS ou login estejam funcionando."
    ],
    "review": [
      {
        "ask": "Qual registro DNS associa um nome a endereço IPv6?",
        "answer": "AAAA. O registro A é usado para IPv4."
      },
      {
        "ask": "O DNS devolveu um IP válido. O servidor HTTP necessariamente funciona?",
        "answer": "Não. Resolução DNS não garante conectividade de transporte nem saúde da aplicação."
      }
    ],
    "extra": "Pesquise DNSSEC e diferenças entre resolvedor recursivo, servidor autoritativo e cache para aprofundar, sem confundir DNSSEC com criptografia do conteúdo web."
  },
  {
    "id": 29,
    "title": "Criptografia sem confusão: chaves, hash e assinatura digital",
    "goal": "Distinguir cifragem simétrica e assimétrica, resumir o papel de hash e explicar como assinaturas e TLS protegem comunicações.",
    "steps": [
      {
        "title": "Por que existem diferentes mecanismos criptográficos?",
        "body": "Uma clínica pode precisar proteger exames armazenados, transmitir dados por HTTPS e comprovar autoria de um documento. Embora todos esses objetivos se relacionem à segurança, não são o mesmo problema. **Confidencialidade** procura impedir leitura não autorizada. **Integridade** procura detectar alterações. **Autenticidade** procura assegurar propriedades da identidade ou origem informada. Os mecanismos criptográficos são escolhidos conforme a propriedade desejada, e não por uma única palavra 'criptografia'."
      },
      {
        "title": "Criptografia simétrica e assimétrica",
        "body": "Na **criptografia simétrica**, as partes autorizadas utilizam uma chave secreta comum para cifrar e decifrar. O **AES** é exemplo conhecido, mas a segurança também depende do modo de operação, nonce, gestão de chaves e implementação. Na **assimétrica**, existem chaves matematicamente relacionadas, pública e privada. Conforme o algoritmo, podem ser usadas para troca de segredos, assinatura ou outras finalidades.\n\nUm equívoco comum é dizer que todo arquivo enviado por HTTPS é cifrado com a chave pública do site. Em protocolos modernos, são estabelecidas chaves de sessão e o tráfego é normalmente protegido por criptografia simétrica autenticada, após mecanismos de autenticação e negociação."
      },
      {
        "title": "Hash e assinatura não são a mesma coisa",
        "body": "Uma **função hash criptográfica** produz um resumo de tamanho determinado para entrada arbitrária. Ela é projetada para propriedades como resistência a colisões e pré-imagem, conforme algoritmo; não é uma cifra reversível. Se um atacante puder substituir tanto o arquivo quanto o hash esperado, a comparação isolada não comprova autoria.\n\nUma **assinatura digital** utiliza mecanismo assimétrico para permitir que um verificador use a chave pública correspondente e valide a assinatura sobre determinada mensagem. Ela ajuda a verificar integridade e vínculo com a chave privada, observadas identidade e confiança. Um hash escrito no rodapé não equivale automaticamente a assinatura."
      },
      {
        "title": "TLS e a segurança de uma conexão web",
        "body": "O **TLS** é usado pelo HTTPS para proteger a comunicação, combinando autenticação de endpoints, estabelecimento de segredos e proteção de integridade/confidencialidade do canal, conforme versão e configuração. Um certificado ajuda a vincular nome a chave pública por cadeia de confiança. O navegador verifica validade e correspondência do nome. Entretanto, um site HTTPS ainda pode ser fraudulento em seu próprio conteúdo; TLS protege o canal, não toda a lógica do aplicativo."
      }
    ],
    "worked": {
      "title": "Exemplo: baixar instalador e verificar procedência",
      "body": "**1.** Uma equipe baixa um instalador para o servidor.\n\n**2.** Conferir hash SHA-256 com valor publicado em canal independente e confiável pode ajudar a detectar alteração do arquivo durante a transferência.\n\n**3.** Se arquivo e hash vierem do mesmo servidor comprometido, ambos podem ter sido adulterados; o hash não garante sozinho a autoria.\n\n**4.** Uma assinatura digital válida, verificada com chave pública confiável e política apropriada, oferece evidências adicionais sobre origem e integridade.\n\n**5.** A conexão HTTPS protege o caminho de transmissão em condições apropriadas, mas não substitui verificação do fornecedor e de atualização.\n\n**Conclusão:** hash, assinatura e TLS resolvem questões relacionadas, porém diferentes."
    },
    "pitfalls": [
      "Hash não é cifragem reversível e não oferece automaticamente prova de autoria.",
      "Criptografia simétrica e assimétrica têm usos distintos e frequentemente aparecem combinadas.",
      "HTTPS pode proteger o canal sem garantir que o conteúdo do site seja confiável.",
      "A gestão e validação de chaves/certificados fazem parte da segurança, não são detalhes dispensáveis."
    ],
    "review": [
      {
        "ask": "Por que hash não é o mesmo que assinatura digital?",
        "answer": "Hash gera um resumo. Assinatura usa uma chave privada e permite verificação com chave pública apropriada."
      },
      {
        "ask": "Qual cifragem costuma proteger o volume de dados de uma sessão TLS moderna?",
        "answer": "Criptografia simétrica de sessão, após negociações e autenticações adequadas."
      }
    ],
    "extra": "Aprofunde funções de derivação de senha com salt, modos autenticados como AES-GCM e diferenças entre certificados e autoridades certificadoras."
  },
  {
    "id": 40,
    "title": "Docker explicado: imagem, contêiner, volume e rede",
    "goal": "Aprender como aplicações são empacotadas e executadas em contêineres, sem confundi-los com máquinas virtuais.",
    "steps": [
      {
        "title": "Que problema o Docker ajuda a resolver?",
        "body": "Um programa funciona no computador do desenvolvedor, mas falha no servidor por versão de dependência ou configuração diferente. Um **contêiner** ajuda a empacotar aplicação e dependências em ambiente de execução mais previsível. O Docker fornece ferramentas para construir imagens, iniciar contêineres e gerenciar redes e volumes. Não devemos tratar isso como 'mágica': o contêiner ainda depende do kernel e dos recursos do hospedeiro, além de permissões, arquivos e configurações."
      },
      {
        "title": "Imagem não é contêiner",
        "body": "A **imagem** é um conjunto de camadas e metadados que descreve o que será usado ao iniciar um contêiner. Um **contêiner** é uma instância dessa imagem em execução ou parada, com estado e configurações próprias. Você pode iniciar vários contêineres a partir da mesma imagem. Em geral, versões de imagem devem ser identificadas de forma reprodutível e atualizadas com testes. Um `Dockerfile` descreve etapas para construir uma imagem; ele não é o serviço rodando por si só."
      },
      {
        "title": "O que acontece com os dados quando o contêiner é removido?",
        "body": "A camada gravável do contêiner normalmente não deve ser tratada como armazenamento definitivo. Para persistir arquivos como dados de banco, use **volumes** ou mecanismos de armazenamento apropriados ao ambiente. Um volume nomeado pode continuar existindo quando o contêiner é removido, salvo ação explícita para apagá-lo; isso não torna o volume automaticamente um backup. Um banco precisa de retenção, cópias consistentes e testes de restauração. Também é importante proteger acesso ao Docker e evitar contêineres excessivamente privilegiados."
      },
      {
        "title": "Por que há Docker Compose e redes?",
        "body": "Uma aplicação pode precisar de frontend, API e PostgreSQL. O **Docker Compose** descreve serviços, imagens/builds, variáveis, redes e volumes em um arquivo. Isso ajuda a subir um conjunto coordenado, mas não substitui monitoramento, segurança de segredos e gestão de persistência. Contêineres podem conversar por nomes de serviço na rede configurada, sem exigir que todo banco seja publicado na internet. Expor a porta do banco publicamente sem necessidade amplia o risco."
      }
    ],
    "worked": {
      "title": "Exemplo: uma API e um banco PostgreSQL",
      "body": "**1.** A imagem da API contém a aplicação e suas dependências.\n\n**2.** O contêiner da API precisa de uma string de conexão para o serviço de banco; essa informação deve ser configurada como segredo/variável protegida, não gravada no repositório.\n\n**3.** O PostgreSQL utiliza volume persistente apropriado para o diretório de dados.\n\n**4.** Uma rede interna permite comunicação entre API e banco. O frontend normalmente não precisa acessar diretamente a porta 5432.\n\n**5.** Antes de atualizar a imagem, execute testes, faça backup consistente e tenha plano de retorno.\n\n**Conclusão:** imagem define o pacote; contêiner executa; volume preserva dados; rede conecta serviços."
    },
    "pitfalls": [
      "Imagem é modelo para instâncias; contêiner é instância da imagem.",
      "Contêiner geralmente compartilha kernel do hospedeiro, diferente de uma VM com kernel convidado.",
      "Volume persistente não é sinônimo de backup.",
      "Publicar porta do banco sem necessidade não é requisito do Docker Compose."
    ],
    "review": [
      {
        "ask": "Qual diferença entre imagem e contêiner?",
        "answer": "Imagem descreve o pacote de execução; contêiner é uma instância desse pacote."
      },
      {
        "ask": "Ao remover o contêiner de banco, seus dados ficam garantidamente preservados?",
        "answer": "Somente se persistência adequada existir; volume pode sobreviver, mas ainda precisa de backup."
      }
    ],
    "extra": "Para aprofundar, estude cgroups, namespaces, imagens mínimas, Docker secrets e políticas de usuário não privilegiado."
  }
];
