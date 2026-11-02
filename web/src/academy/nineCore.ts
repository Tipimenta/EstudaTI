import type {PedagogicalLesson} from './intro1'
export const nineCore:PedagogicalLesson[]=[
  {
    "id": 20,
    "title": "VLAN e trunk: por que separar uma rede em partes?",
    "goal": "Entender a finalidade das VLANs, como quadros são identificados e por que comunicação entre VLANs depende de roteamento.",
    "steps": [
      {
        "title": "Imagine uma empresa com três setores",
        "body": "Uma clínica possui computadores da recepção, equipamentos de imagem e uma rede Wi-Fi para visitantes. Se todos pertencerem ao mesmo domínio de broadcast, parte do tráfego de descoberta será compartilhada por equipamentos que não precisam conversar diretamente. Além disso, fica mais difícil definir políticas distintas para cada setor. Uma **VLAN (Virtual LAN)** permite criar segmentos lógicos de camada 2, mesmo quando os aparelhos utilizam switches e cabos de uma infraestrutura física comum. Separar VLANs não é o mesmo que criar três redes fisicamente independentes, mas ajuda a organizar domínios de broadcast e aplicar políticas apropriadas."
      },
      {
        "title": "Qual a diferença entre porta access e trunk?",
        "body": "Uma porta **access** normalmente conecta um computador, impressora ou outro equipamento final a uma única VLAN. Quando dois switches precisam transportar o tráfego de várias VLANs entre si, costuma-se usar uma porta **trunk**. O padrão **IEEE 802.1Q** permite identificar quadros que pertencem a VLANs diferentes por meio de tags. Você pode imaginar a tag como uma etiqueta que informa a qual conjunto lógico cada quadro pertence. Isso não torna o quadro criptografado: a etiqueta apenas ajuda os equipamentos a distinguir tráfego de segmentos."
      },
      {
        "title": "Por que um dispositivo não conversa diretamente com outra VLAN?",
        "body": "VLANs criam domínios distintos no **enlace**, mas comunicação entre redes IP exige uma decisão na **camada de rede**. Portanto, se uma estação da VLAN 10 precisa acessar um servidor da VLAN 20, é necessário um roteador ou switch com função de camada 3, rotas e uma política que permita o acesso. Esse processo é o **roteamento inter-VLAN**. Um switch puramente L2 encaminha quadros dentro dos domínios configurados; não passa a fazer roteamento apenas porque possui duas VLANs. Em questões, a palavra 'inter-VLAN' costuma indicar a necessidade de examinar o encaminhamento IP."
      }
    ],
    "worked": {
      "title": "Exemplo: rede interna e Wi-Fi de visitantes",
      "body": "**1.** A VLAN 10 contém estações da recepção, com rede 192.168.10.0/24. A VLAN 20 contém visitantes, com 192.168.20.0/24.\n\n**2.** Um visitante tenta alcançar o servidor de exames na VLAN 10. Por estarem em sub-redes diferentes, o tráfego precisa passar por dispositivo de camada 3.\n\n**3.** A política de firewall pode negar esse acesso, mantendo somente a saída para internet na VLAN de visitantes.\n\n**4.** Um link entre switches pode carregar VLANs 10 e 20 por trunk 802.1Q, sem misturar seus domínios de broadcast.\n\n**Conclusão:** separação de VLAN e controle por firewall são funções complementares, não sinônimos."
    },
    "pitfalls": [
      "VLAN segmenta tráfego de camada 2, mas não é uma VPN ou ferramenta de criptografia.",
      "Porta access normalmente associa equipamento a uma VLAN; trunk transporta várias com tags.",
      "Para comunicação IP entre VLANs, é necessário roteamento e autorização por política.",
      "Uma rede de visitantes isolada não dispensa firewall, senhas seguras e controle de serviços."
    ],
    "review": [
      {
        "ask": "Uma porta trunk é usada para quê?",
        "answer": "Transportar tráfego de múltiplas VLANs entre equipamentos, geralmente usando tags IEEE 802.1Q."
      },
      {
        "ask": "Um switch somente L2 pode rotear pacotes entre VLAN 10 e 20?",
        "answer": "Não. Comunicação IP inter-VLAN exige função de camada 3 e rotas adequadas."
      }
    ],
    "extra": "Para ir além, estude VLAN nativa, VLANs permitidas em trunks, isolamento por ACLs e o risco de configurações erradas de portas."
  },
  {
    "id": 28,
    "title": "Autenticação multifator: quem é você e o que pode acessar?",
    "goal": "Identificar fatores de autenticação, separar autenticação e autorização e aplicar privilégio mínimo.",
    "steps": [
      {
        "title": "Uma senha basta para proteger um sistema?",
        "body": "Imagine que um funcionário descobre a senha de uma conta administrativa. Se a aplicação usa somente senha, esse segredo roubado pode permitir acesso. **Autenticação multifator (MFA)** busca exigir evidências de categorias diferentes de fatores para confirmar a identidade. Um fator de **conhecimento** é algo que você sabe, como senha; um fator de **posse** é algo que você tem, como chave física; um fator de **inerência** refere-se a características biométricas, conforme sistema e requisitos. MFA aumenta a dificuldade para o invasor, mas não elimina todos os ataques, como phishing em determinados métodos."
      },
      {
        "title": "Duas senhas não significam dois fatores",
        "body": "Um aplicativo pede uma senha e, depois, outro PIN memorizado. Isso são duas verificações, mas ambas pertencem à categoria **conhecimento**. Por isso, não se tornam automaticamente dois fatores independentes. Já senha e chave de segurança física combinam conhecimento e posse. Em concursos, vale identificar **a categoria**, não apenas a quantidade de telas ou códigos. Uma autenticação por dispositivo também precisa considerar perda, recuperação de conta, resistência a phishing e gerenciamento de credenciais."
      },
      {
        "title": "Depois do login vem a autorização",
        "body": "Passar no login não significa poder consultar qualquer informação. **Autenticação** confirma identidade; **autorização** define quais operações e recursos são permitidos. O princípio do **menor privilégio** determina que a conta possua somente acessos necessários. Uma recepcionista talvez precise agendar exames, mas não configurar bancos de dados; um administrador pode manter uma conta comum para atividades cotidianas e usar credencial separada para tarefas elevadas. Revisões periódicas ajudam a identificar permissões que perderam justificativa."
      }
    ],
    "worked": {
      "title": "Exemplo: acesso de um fornecedor de suporte",
      "body": "**1.** Um fornecedor precisa acessar temporariamente o sistema de suporte. A organização cria conta individual, em vez de compartilhar senha da equipe.\n\n**2.** A política exige senha mais uma chave de segurança ou outro segundo fator adequado.\n\n**3.** A autorização limita acesso ao servidor e ao horário necessário, com registros de atividade.\n\n**4.** Ao encerrar o contrato, a conta é revogada e a desativação é verificada.\n\n**Conclusão:** MFA reduz risco de uso indevido de credenciais, enquanto autorização e ciclo de vida do acesso limitam o que mesmo uma conta autenticada pode fazer."
    },
    "pitfalls": [
      "Senha mais PIN memorizado não garante dois fatores independentes.",
      "Autenticar não significa autorizar todas as operações.",
      "MFA não substitui revisão de permissões e logs.",
      "Contas administrativas permanentes de fornecedores elevam risco se não houver justificativa e controles."
    ],
    "review": [
      {
        "ask": "Senha e PIN são necessariamente dois fatores?",
        "answer": "Não. Ambos podem ser fatores de conhecimento."
      },
      {
        "ask": "O que faz o princípio do menor privilégio?",
        "answer": "Concede apenas as permissões necessárias para as funções autorizadas."
      }
    ],
    "extra": "Aprofunde métodos de autenticação resistentes a phishing, FIDO2/WebAuthn e ciclo de vida de identidades."
  },
  {
    "id": 36,
    "title": "Permissões Linux sem decorar: r, w, x e chmod",
    "goal": "Interpretar permissões numéricas e simbólicas, distinguir arquivos e diretórios e corrigir erros de acesso com segurança.",
    "steps": [
      {
        "title": "Por que Linux verifica permissões?",
        "body": "Sistemas operacionais permitem que vários usuários e processos compartilhem arquivos, mas isso exige regras. No Linux, permissões tradicionais são organizadas em três conjuntos: **dono**, **grupo** e **outros**. Cada conjunto pode possuir **r** (leitura), **w** (escrita) e **x** (execução, ou travessia em diretórios). Ao ler a saída de `ls -l`, você verá algo semelhante a `-rwxr-x---`. O primeiro caractere informa tipo de arquivo; os nove seguintes apresentam os três conjuntos de permissões."
      },
      {
        "title": "Como converter 750 em letras?",
        "body": "Na representação octal, as permissões têm pesos: **r=4**, **w=2** e **x=1**. O valor **7** representa 4+2+1 = rwx; **5** representa 4+1 = r-x; **0** não concede permissões. Assim, `chmod 750 arquivo` corresponde a **rwxr-x---**. O dono pode ler, gravar e executar; o grupo pode ler e executar; outros não recebem esses bits. Não memorize apenas o número: decomponha seus pesos e interprete cada conjunto."
      },
      {
        "title": "Por que diretórios são diferentes?",
        "body": "Em arquivos comuns, **x** pode permitir execução se o formato e demais condições forem adequados. Em diretórios, **x** permite atravessá-los/acessar entradas conhecidas; **r** permite listar nomes sob condições, e **w** participa da modificação das entradas em conjunto com x. Por isso, `chmod` aplicado sem entender se o caminho é arquivo ou diretório pode não resolver o problema. A avaliação também pode envolver ACLs, propriedade (`chown`), SELinux/AppArmor e permissões dos diretórios pais."
      }
    ],
    "worked": {
      "title": "Exemplo: script não executa",
      "body": "**Cenário:** o usuário consegue ler `backup.sh`, mas `./backup.sh` falha por permissão.\n\n**1.** Consulte `ls -l backup.sh`. Suponha o modo `-rw-r-----`.\n\n**2.** O dono possui leitura/escrita, mas **não tem x**. Portanto, não poderá executar diretamente o arquivo por esse modo.\n\n**3.** Se a execução for apropriada e autorizada, ajuste apenas o necessário, por exemplo concedendo execução ao dono com `chmod u+x backup.sh`.\n\n**4.** Confira interpretador, shebang e permissões do caminho.\n\n**5.** Não use `chmod 777` indiscriminadamente: isso concede ampla escrita e execução também a terceiros."
    },
    "pitfalls": [
      "r=4, w=2, x=1 no modo octal convencional.",
      "Permissão de execução para arquivo difere da travessia de diretório.",
      "Ser membro do grupo não torna o usuário dono do arquivo.",
      "`chmod 777` generalizado não é diagnóstico e pode criar vulnerabilidades."
    ],
    "review": [
      {
        "ask": "Quais permissões correspondem ao modo 640?",
        "answer": "Dono rw-, grupo r--, outros ---."
      },
      {
        "ask": "O que o bit x significa em um diretório?",
        "answer": "Permite atravessá-lo para acessar entradas, conforme demais permissões."
      }
    ],
    "extra": "Explore umask, ACLs, setuid/setgid e sticky bit depois de dominar o modelo de dono, grupo e outros."
  },
  {
    "id": 45,
    "title": "Crase: entenda a regra antes de decorar exceções",
    "goal": "Identificar quando ocorre a união da preposição a com artigo a e usar a regência para acertar questões.",
    "steps": [
      {
        "title": "O que o acento grave está marcando?",
        "body": "A palavra 'crase' designa a fusão de dois sons ou formas, e na escrita normativa o acento grave frequentemente indica a união da **preposição a** com o **artigo feminino a**. Por isso não basta olhar se a palavra seguinte é feminina. Em 'Vou **à clínica**', o verbo ir rege a preposição **a**, e o substantivo 'clínica' admite artigo feminino **a**; as duas formas se fundem. Em 'Vou **a pé**', não há artigo feminino antes de 'pé'; não ocorre crase."
      },
      {
        "title": "Como testar a presença do artigo?",
        "body": "Uma técnica auxiliar consiste em substituir um substantivo feminino por um masculino equivalente. Se a construção passar a admitir **ao**, há forte indicação de preposição a mais artigo. Compare: 'Referiu-se **à norma**' e 'Referiu-se **ao regulamento**'. O verbo 'referir-se' pede preposição a, e os substantivos admitem artigos. Esse teste não resolve toda situação de crase, como expressões fixas e pronomes, mas torna mais fácil entender as ocorrências básicas."
      },
      {
        "title": "Quando a crase normalmente não aparece?",
        "body": "Antes de **verbos no infinitivo**, não se usa artigo feminino: 'Começou **a estudar**'. Na expressão '**a partir de**', também não há crase antes do verbo. Antes de palavras masculinas em usos comuns como 'a pé', também não há fusão de artigo feminino. Não transforme isso em regras cegas: certas locuções, nomes próprios e demonstrativos exigem análise da regência e da estrutura. O objetivo é explicar a frase, e não decorar uma lista desconectada de proibições."
      }
    ],
    "worked": {
      "title": "Exemplo: revisando três frases",
      "body": "**Frase 1:** 'A recepcionista entregou o exame à paciente.' O verbo entregar admite construção entregar algo **a alguém**. Se há 'a paciente' com artigo definido, a união resulta em **à paciente**.\n\n**Frase 2:** 'A equipe começou à trabalhar.' Está incorreta: 'trabalhar' é verbo, não artigo feminino. O correto é **começou a trabalhar**.\n\n**Frase 3:** 'O técnico fez referência à política interna.' Compare 'fez referência ao regulamento'. A substituição mostra preposição a + artigo a.\n\n**Conclusão:** em cada exemplo, identifique antes a regência e depois o artigo."
    },
    "pitfalls": [
      "Ser palavra feminina não basta para exigir crase.",
      "Antes de infinitivo, como 'a estudar', não há artigo feminino a.",
      "A substituição por 'ao' é teste auxiliar, não solução universal.",
      "A regência da expressão anterior é decisiva para estabelecer a preposição."
    ],
    "review": [
      {
        "ask": "Qual está correto: 'à partir de hoje' ou 'a partir de hoje'?",
        "answer": "A partir de hoje, sem crase."
      },
      {
        "ask": "Por que 'dirigiu-se à recepção' pode levar crase?",
        "answer": "Dirigir-se rege preposição a; recepção admite artigo feminino a."
      }
    ],
    "extra": "Estude usos facultativos e locuções femininas após dominar os casos centrais."
  },
  {
    "id": 52,
    "title": "ITIL: problema e mudança em casos reais de suporte",
    "goal": "Diferenciar incidente, problema e mudança e entender como uma CMDB ajuda a diagnosticar impactos.",
    "steps": [
      {
        "title": "Restaurar o serviço não é descobrir a causa",
        "body": "Imagine que um servidor para de imprimir etiquetas. A equipe reinicia o serviço e as impressões voltam. O **incidente** pode ter sido resolvido naquele momento, pois o objetivo imediato era restaurar a operação. Entretanto, se a falha reaparece diariamente, ainda existe uma causa a investigar. O gerenciamento de **problemas** reúne e analisa indícios para identificar causas ou causas potenciais de um ou mais incidentes. A distinção é importante: uma solução de contorno é útil, mas não necessariamente permanente."
      },
      {
        "title": "O que a habilitação de mudança faz?",
        "body": "Após investigar, a equipe descobre que uma atualização de driver corrigirá o defeito. Aplicar essa atualização em produção é uma **mudança**, que pode afetar usuários, compatibilidade e disponibilidade. A habilitação de mudanças busca avaliação apropriada de riscos, autorização, agendamento e verificação, conforme política e urgência. Mesmo uma mudança emergencial exige controle proporcional. O objetivo não é burocracia por si só; é evitar que uma correção provoque indisponibilidade ainda maior."
      },
      {
        "title": "Para que serve uma CMDB?",
        "body": "Uma **CMDB (Configuration Management Database)** registra itens de configuração e relacionamentos pertinentes aos serviços, conforme o modelo adotado. Em vez de simplesmente listar 'servidor A e impressora B', ela pode informar que um aplicativo depende de determinado banco, servidor e rede. Se uma mudança atinge esse servidor, a equipe consegue avaliar quem será afetado. Uma CMDB desatualizada fornece falsa confiança; por isso registros precisam de manutenção e validação."
      }
    ],
    "worked": {
      "title": "Exemplo: incidentes repetidos de impressão",
      "body": "**1.** A impressora deixa de operar; a TI ativa dispositivo reserva para restabelecer atendimento. Isso trata o **incidente**.\n\n**2.** Como a falha ocorre toda semana, abre-se investigação de **problema**, correlacionando logs, alterações e versões de drivers.\n\n**3.** O diagnóstico aponta incompatibilidade entre driver e servidor. A atualização é planejada como **mudança**, com testes e plano de reversão.\n\n**4.** A CMDB ajuda a identificar quais estações e serviços usam aquele servidor.\n\n**5.** A equipe verifica se o problema deixou de ocorrer, em vez de simplesmente encerrar o registro após reiniciar."
    },
    "pitfalls": [
      "Incidente trata restauração, problema investiga causa, mudança controla alteração.",
      "Uma causa não precisa estar totalmente identificada para registrar um problema.",
      "CMDB não é apenas inventário de equipamentos; relacionamentos podem ser relevantes.",
      "Mudança emergencial não equivale a mudança sem controle."
    ],
    "review": [
      {
        "ask": "Reiniciar serviço e restabelecer atendimento resolve qual objetivo primeiro?",
        "answer": "O do gerenciamento de incidentes."
      },
      {
        "ask": "Para que uma CMDB pode ajudar antes de alterar um servidor?",
        "answer": "Para identificar itens e serviços dependentes e avaliar impacto da mudança."
      }
    ],
    "extra": "Aprofunde gestão de erros conhecidos, registros de configuração e modelos de mudança padrão, normal e emergencial conforme prática adotada."
  },
  {
    "id": 60,
    "title": "JOIN sem mistério: juntando tabelas com significado",
    "goal": "Entender como INNER JOIN e LEFT JOIN trabalham, analisar cardinalidade e evitar filtros que eliminam resultados inesperadamente.",
    "steps": [
      {
        "title": "Por que um banco precisa de JOIN?",
        "body": "Imagine duas tabelas: **Pacientes(id,nome)** e **Exames(id,paciente_id,tipo)**. Se cada linha de exame repetisse o nome, telefone e outros dados do paciente, bastaria uma alteração cadastral para surgir inconsistência. O relacionamento por `paciente_id` evita parte dessa redundância. Para mostrar ao usuário o nome do paciente ao lado do exame, a consulta precisa **combinar linhas** das duas tabelas. É exatamente a função de um JOIN."
      },
      {
        "title": "INNER JOIN e LEFT JOIN respondem perguntas diferentes",
        "body": "Um **INNER JOIN** retorna combinações que atendem à condição de junção; pacientes sem exames não aparecem se a consulta parte do par paciente–exame. Um **LEFT JOIN** preserva as linhas da tabela à esquerda mesmo sem par na tabela à direita. Nesses casos, campos da tabela direita aparecem como **NULL**. Não é que ele 'cria exames vazios'; o resultado contém uma linha representando o paciente sem registro correspondente."
      },
      {
        "title": "Por que cardinalidade importa?",
        "body": "Se um paciente possui três exames, o JOIN entre paciente e exames pode produzir **três linhas** desse paciente. Isso é normal em relacionamento **1:N**. Entretanto, se você somar indevidamente o saldo do paciente após um JOIN desse tipo, poderá contar o saldo três vezes. Sempre pergunte qual é a **granularidade** do resultado. Em N:N, geralmente há uma tabela de associação. Não confunda cardinalidade do relacionamento com comando JOIN específico."
      }
    ],
    "worked": {
      "title": "Exemplo: listar todos os pacientes e quantos exames fizeram",
      "body": "**Objetivo:** mostrar pacientes mesmo sem exames e contar exames sem inflar números.\n\n**Consulta:**\n\n```sql\nSELECT p.id, p.nome, COUNT(e.id) AS exames\nFROM pacientes p\nLEFT JOIN exames e ON e.paciente_id = p.id\nGROUP BY p.id, p.nome\nORDER BY p.nome;\n```\n\n**Explicação:** `LEFT JOIN` mantém paciente sem exames. `COUNT(e.id)` conta apenas IDs não nulos de exames; para quem não tem, resulta zero. `GROUP BY` agrupa cada paciente e evita mostrar várias linhas do mesmo paciente. Se usássemos `COUNT(*)`, o paciente sem exames ainda poderia contar uma linha resultante do JOIN. Esse detalhe é uma pegadinha frequente."
    },
    "pitfalls": [
      "LEFT JOIN preserva a esquerda; INNER JOIN exige correspondência.",
      "Adicionar filtro da tabela direita no WHERE pode eliminar linhas sem correspondência e alterar o resultado esperado.",
      "COUNT(*) conta linhas; COUNT(coluna) ignora NULL nessa coluna.",
      "JOIN 1:N multiplica linhas do lado 1; confira agregações para evitar dupla contagem."
    ],
    "review": [
      {
        "ask": "Qual JOIN mantém pacientes que ainda não realizaram exames?",
        "answer": "LEFT JOIN partindo de pacientes para exames."
      },
      {
        "ask": "Após LEFT JOIN, como contar exames de cada paciente, incluindo zero?",
        "answer": "COUNT(e.id), agrupando por paciente, pois IDs nulos dos exames ausentes não entram na contagem."
      }
    ],
    "extra": "Aprenda a diferença entre filtros em ON e WHERE, subconsultas e funções de janela após dominar JOIN e GROUP BY."
  },
  {
    "id": 69,
    "title": "Testes de software: como provar que funciona?",
    "goal": "Distinguir testes unitários, integração, sistema e aceitação e organizar um fluxo de verificação.",
    "steps": [
      {
        "title": "Um botão funcionar não significa que o sistema funciona",
        "body": "Imagine uma interface que mostra 'Exame fechado com sucesso' depois de clicar no botão. Isso prova que a mensagem apareceu, mas **não prova** que a alteração foi gravada no banco, nem que o usuário tinha autorização. Testar software é confrontar comportamento observado com critérios esperados. A pergunta 'o que está sendo verificado?' ajuda a escolher o tipo de teste. Um bom conjunto cobre regras individuais, integração entre componentes e o fluxo de negócio."
      },
      {
        "title": "Teste unitário e teste de integração",
        "body": "Um **teste unitário** verifica uma pequena função ou unidade, como cálculo de desconto, frequentemente isolando dependências. Já um **teste de integração** examina se componentes cooperam corretamente: API, autenticação e banco podem funcionar isoladamente e falhar quando usados juntos. Por exemplo, testar o endpoint que recebe paciente_id, grava registro e retorna identificador exige validar a comunicação e os dados persistidos. Um mock pode ser útil em unidade, mas não substitui o banco real numa verificação de integração."
      },
      {
        "title": "E os testes de sistema e aceitação?",
        "body": "O **teste de sistema** avalia o produto integrado em cenários maiores. A **aceitação** verifica se os critérios acordados pelo usuário/negócio foram atendidos, como 'impedir fechar duas vezes o mesmo exame'. Uma suíte pode conter muitos testes automáticos e ainda deixar regras críticas sem cobertura. **Cobertura de código** mede execução das partes instrumentadas; não garante correção, segurança nem correspondência ao requisito. Testes exploratórios e de casos extremos continuam úteis."
      }
    ],
    "worked": {
      "title": "Exemplo: testar fechamento de exame",
      "body": "**Critério:** quando usuário autorizado fecha exame aberto, o sistema deve persistir status e horário.\n\n**Teste unitário:** a função de validação rejeita exame que já está fechado.\n\n**Teste de integração:** a API recebe pedido, consulta autorização, grava mudança e retorna estado coerente; a consulta posterior confirma persistência.\n\n**Teste de sistema:** no navegador, o usuário seleciona exame e confirma; a interface reflete o estado e o histórico registra alteração.\n\n**Teste de aceitação:** responsável verifica o cenário real e os critérios de negócio, incluindo recusa de fechamento duplicado."
    },
    "pitfalls": [
      "Teste unitário não demonstra integração com banco e rede.",
      "Cobertura alta não prova ausência de defeitos.",
      "Testes de aceitação verificam critérios, não apenas cor do botão.",
      "Um retorno HTTP 200 não garante que o estado de negócio final está correto sem validação."
    ],
    "review": [
      {
        "ask": "API e banco falham juntos, mas a função isolada passa. Que teste está faltando?",
        "answer": "Teste de integração com componentes reais e verificação de persistência."
      },
      {
        "ask": "Cobertura de código de 100% garante ausência de bugs?",
        "answer": "Não; cobertura mede execução, não a qualidade dos cenários nem correção dos requisitos."
      }
    ],
    "extra": "Aprofunde testes de contrato, regressão, carga e segurança, além de práticas de integração contínua."
  },
  {
    "id": 76,
    "title": "Implicação e contrapositiva: compreenda sem decorar fórmulas",
    "goal": "Interpretar 'se P, então Q', construir contraexemplo e identificar contrapositiva e negação.",
    "steps": [
      {
        "title": "O que queremos dizer com 'se... então'?",
        "body": "Em lógica proposicional clássica, a frase '**Se P, então Q**' indica uma **implicação**: quando P é verdadeiro, Q também deve ser verdadeiro para que a condição seja satisfeita. Imagine 'Se o usuário possui perfil administrativo, então pode acessar o painel'. Um usuário com perfil administrativo que **não consegue** acessar o painel representa o caso que contradiz a implicação. Quando P é falso, a fórmula P→Q continua verdadeira pela definição lógica, independentemente de Q; isso não significa provar uma causa no mundo real."
      },
      {
        "title": "Por que a recíproca é diferente?",
        "body": "A **recíproca** troca os lados: de P→Q para Q→P. No exemplo, 'Se pode acessar o painel, então é administrador' não decorre necessariamente da frase original: outros perfis talvez também tenham acesso. A **contrapositiva**, porém, nega e inverte os lados: ¬Q→¬P, isto é, 'Se não pode acessar o painel, então não é administrador' dentro do modelo lógico adotado. A contrapositiva tem a **mesma tabela-verdade** da implicação original."
      },
      {
        "title": "Como negar uma implicação?",
        "body": "Para negar 'Se P, então Q', é preciso afirmar que ocorreu exatamente o caso em que a implicação falha: **P verdadeiro e Q falso**. Portanto, sua negação é **P∧¬Q**. Em provas, confundir negação com contrapositiva é um erro central: a contrapositiva preserva a verdade da fórmula, enquanto a negação inverte sua validade. Se necessário, construa quatro linhas da tabela-verdade para confirmar."
      }
    ],
    "worked": {
      "title": "Exemplo com tabela de casos",
      "body": "Considere P='está autenticado' e Q='tem acesso autorizado'. Para exercício puramente lógico, admita a proposição 'Se P então Q'.\n\n**P=V, Q=V:** a implicação é verdadeira.\n\n**P=V, Q=F:** é falsa, pois P ocorreu e Q não.\n\n**P=F, Q=V:** é verdadeira na lógica material.\n\n**P=F, Q=F:** também é verdadeira.\n\n**Contrapositiva:** 'Se não tem acesso autorizado, então não está autenticado' (¬Q→¬P), equivalente à frase original no exercício.\n\n**Negação:** 'Está autenticado e não tem acesso autorizado' (P∧¬Q). **Na segurança real**, autenticação não implica autorização geral; usamos o exemplo somente para exercitar a forma lógica da frase."
    },
    "pitfalls": [
      "P→Q é falsa apenas em P verdadeiro e Q falso.",
      "Q→P (recíproca) não é equivalente em geral.",
      "¬Q→¬P (contrapositiva) é equivalente à original.",
      "P∧¬Q é negação da implicação, não a contrapositiva."
    ],
    "review": [
      {
        "ask": "A frase P→Q é falsa em qual situação?",
        "answer": "Somente com P verdadeiro e Q falso."
      },
      {
        "ask": "Qual é a negação de P→Q?",
        "answer": "P∧¬Q."
      }
    ],
    "extra": "Compare implicação material, bicondicional e Leis de De Morgan construindo tabelas-verdade."
  },
  {
    "id": 84,
    "title": "LGPD sem confusão: bases legais e princípios aplicados",
    "goal": "Distinguir finalidade, necessidade e adequação e explicar por que consentimento não é obrigatório em todo tratamento.",
    "steps": [
      {
        "title": "Por que uma empresa pode tratar dados pessoais?",
        "body": "A **Lei Geral de Proteção de Dados Pessoais (LGPD)** estabelece regras para tratamentos abrangidos pela lei. 'Tratamento' inclui coleta, armazenamento, consulta, compartilhamento e eliminação, entre outras operações. Antes de coletar dados, a organização precisa identificar **finalidade**, categoria de dado, hipótese legal apropriada e controles necessários. Um cadastro para agendamento não autoriza automaticamente reutilização irrestrita em campanhas, porque o fato de possuir o dado não implica que qualquer finalidade seja legítima."
      },
      {
        "title": "Consentimento não é uma resposta universal",
        "body": "A LGPD prevê diversas **bases legais** conforme finalidade e situação, incluindo hipóteses como cumprimento de obrigação legal, execução de contrato e consentimento, nos termos aplicáveis. Para **dados sensíveis**, como dados relativos à saúde, a lei traz regras e hipóteses específicas. Uma empresa não pode resolver toda situação simplesmente colocando uma caixa 'aceito tudo' e dispensando a análise jurídica. Também não é correto dizer que qualquer tratamento sem consentimento é automaticamente ilegal: depende da hipótese efetivamente aplicável."
      },
      {
        "title": "Os princípios mudam a decisão prática",
        "body": "O princípio da **finalidade** exige propósito legítimo e específico; **adequação** exige compatibilidade da operação com esse propósito; **necessidade** limita o tratamento ao mínimo pertinente e proporcional. **Transparência** orienta informar o titular, e **segurança** exige medidas contra acesso não autorizado e outras situações relevantes. Imagine solicitar histórico médico completo para lembrar o horário de um exame: a coleta pode exceder o necessário à finalidade, mesmo que exista alguma hipótese legal para dados de agendamento."
      }
    ],
    "worked": {
      "title": "Exemplo: lembrete de consulta por mensagem",
      "body": "**1. Finalidade:** confirmar consulta agendada.\n\n**2. Dados:** nome, meio de contato e data/horário podem ser necessários; diagnóstico e histórico integral provavelmente não são para o simples lembrete.\n\n**3. Base legal:** identifique a hipótese adequada ao contexto real e à categoria de dados, verificando a norma vigente. Não suponha consentimento como única possibilidade.\n\n**4. Segurança:** controle quem acessa listas de pacientes, como mensagens são enviadas e registros retidos.\n\n**5. Transparência:** informe os tratamentos necessários de maneira acessível, conforme exigências aplicáveis.\n\n**Conclusão:** proteção de dados não é apenas assinar autorização; envolve decisões proporcionais durante todo o ciclo."
    },
    "pitfalls": [
      "Consentimento é uma base legal entre outras; não serve de justificativa genérica.",
      "Dados de saúde são sensíveis e seguem hipóteses específicas.",
      "Finalidade e necessidade continuam relevantes mesmo com base legal identificada.",
      "Controlador e operador dependem do papel efetivo no tratamento, não apenas de rótulo contratual."
    ],
    "review": [
      {
        "ask": "Consentimento é sempre obrigatório na LGPD?",
        "answer": "Não. A lei prevê diversas hipóteses legais, e o contexto determina a apropriada."
      },
      {
        "ask": "Qual princípio impede coletar dados excessivos para o objetivo?",
        "answer": "Necessidade: limitar o tratamento ao mínimo pertinente e proporcional."
      }
    ],
    "extra": "Consulte a redação vigente da LGPD e as orientações da ANPD, especialmente quanto a dados sensíveis e setor público."
  }
];
