import type {PedagogicalLesson} from './intro1'
export const coreExpansion3:PedagogicalLesson[]=[
  {
    "id": 70,
    "title": "Git desde o básico: commits, branches e merge",
    "goal": "Compreender como Git registra mudanças, desenvolve funcionalidades em paralelo e resolve conflitos com segurança.",
    "steps": [
      {
        "title": "Por que versionar código?",
        "body": "Imagine que uma equipe modifica um sistema e, dias depois, descobre que uma atualização causou um erro. Sem histórico confiável, pode ser difícil saber o que mudou e recuperar uma versão funcional. Um **sistema de controle de versão** registra revisões de arquivos e permite comparar alterações ao longo do tempo. O **Git** é distribuído: um repositório local possui histórico próprio que pode ser sincronizado com repositórios remotos. Isso facilita colaboração, auditoria de mudanças e experimentação com menor risco."
      },
      {
        "title": "Working tree, staging e commit são etapas diferentes",
        "body": "Ao editar um arquivo, você modifica a **área de trabalho** (working tree). Com `git add`, seleciona mudanças para a **área de preparação** (staging/index). Com `git commit`, registra um snapshot das alterações preparadas, junto a metadados e mensagem. Não confunda: `git add` não publica nada no GitHub; `git commit` grava localmente, e `git push` envia referências e objetos ao remoto conforme configurações e permissões.\n\n`git status` mostra diferenças relevantes entre área de trabalho, índice e histórico. `git log` ajuda a inspecionar commits anteriores. Uma boa mensagem explica a intenção: 'fix: corrigir validação de datas' comunica mais do que 'atualização'."
      },
      {
        "title": "Branches e integração",
        "body": "Uma **branch** é uma referência móvel que aponta para uma linha do histórico. Criar `feature/flashcards` permite trabalhar isoladamente até a integração. Com `git merge`, você incorpora histórico de outra branch à atual. Em alguns casos, o Git consegue resolver automaticamente; quando duas pessoas alteram trechos incompatíveis, surge **conflito de merge**, que precisa de revisão humana. Não apague mudanças arbitrariamente só para finalizar a mesclagem: compreenda as duas intenções, resolva e execute testes."
      },
      {
        "title": "O que Git não é",
        "body": "Git não substitui backup completo de banco de dados, de segredos ou de toda infraestrutura. Arquivos ignorados em `.gitignore` não são protegidos se já estiverem versionados; **senhas e tokens não devem ser enviados para commits**. Além disso, publicar automaticamente um commit em produção não dispensa revisão, teste e validação. Git também não é o mesmo que GitHub: Git é o sistema de versionamento; GitHub é uma plataforma de hospedagem e colaboração com repositórios Git."
      }
    ],
    "worked": {
      "title": "Exemplo: criar funcionalidade sem alterar diretamente a versão principal",
      "body": "**1.** Verifique o estado: `git status`.\n\n**2.** Crie e entre na branch: `git switch -c feature/revisao`.\n\n**3.** Edite o código e teste a funcionalidade localmente.\n\n**4.** Prepare somente arquivos relacionados: `git add caminho/do/arquivo`.\n\n**5.** Registre: `git commit -m \"feat: adicionar fluxo de revisao\"`.\n\n**6.** Envie para revisão: `git push -u origin feature/revisao`.\n\n**7.** Após revisão e testes, integre por merge seguindo o fluxo adotado.\n\n**Conclusão:** cada comando tem uma função: editar, preparar, registrar, compartilhar e integrar não são a mesma ação."
    },
    "pitfalls": [
      "git add prepara alterações; git commit registra localmente; git push envia ao remoto.",
      "Branch não significa obrigatoriamente cópia completa e independente de todos os arquivos.",
      "Conflito de merge exige decisão sobre conteúdo, não apenas executar comando.",
      "Git e GitHub não são sinônimos; commits não substituem backup do banco nem controle de segredos."
    ],
    "review": [
      {
        "ask": "Qual a diferença entre git commit e git push?",
        "answer": "Commit registra versão no repositório local; push envia alterações para o remoto."
      },
      {
        "ask": "Duas branches alteram a mesma linha de forma incompatível. Qual fenômeno pode ocorrer?",
        "answer": "Conflito de merge, exigindo resolução e novos testes."
      }
    ],
    "extra": "Explore rebase, cherry-pick, tags, proteção de branch e integração contínua depois de dominar staging, commits e branches."
  },
  {
    "id": 79,
    "title": "Combinação e arranjo: descubra quando a ordem importa",
    "goal": "Identificar o tipo de contagem e resolver exercícios com escolha de grupos e posições sem decorar fórmulas cegamente.",
    "steps": [
      {
        "title": "O segredo da análise combinatória é definir o que conta como resultado",
        "body": "Considere cinco candidatos disputando vagas. Se você quer formar uma **comissão com duas pessoas**, escolher Ana e Bruno produz o mesmo grupo que escolher Bruno e Ana. A **ordem não importa**: é um problema de combinação. Agora imagine os cargos de **presidente e vice-presidente**. Ana presidente e Bruno vice é diferente de Bruno presidente e Ana vice. A **ordem importa**: temos um arranjo de pessoas em posições distintas.\n\nAntes de escolher qualquer fórmula, faça a pergunta principal: **se eu trocar a ordem dos elementos selecionados, obtenho outro resultado?** Responder corretamente evita muitos erros de concurso."
      },
      {
        "title": "Princípio multiplicativo e arranjo",
        "body": "Se existem **5 opções** para a primeira posição e, após escolher alguém, **4 opções** para a segunda, o total é **5 × 4 = 20** resultados ordenados sem repetição. Em geral, o arranjo de n elementos tomados p a p pode ser calculado por **A(n,p)=n!/(n−p)!** quando se usam elementos distintos sem repetição. O símbolo **n!** (fatorial) significa produto 1 × 2 × ... × n, e por definição **0! = 1**.\n\nA fórmula é consequência do raciocínio de escolhas sucessivas. Você não precisa começar por ela: conte quantas opções restam em cada etapa."
      },
      {
        "title": "Combinação: quando grupos equivalentes não devem ser contados várias vezes",
        "body": "Para escolher duas pessoas de um total de cinco **sem atribuir cargos**, o cálculo anterior 5 × 4 contaria cada dupla duas vezes: Ana–Bruno e Bruno–Ana. Por isso dividimos por **2! = 2**, obtendo **10** grupos. A fórmula geral é **C(n,p)=n!/[p!(n−p)!]**.\n\nEscolher três pessoas dentre cinco resulta em C(5,3)=5!/(3!×2!)=10. Veja que escolher três para um grupo sem cargos é diferente de distribuir primeiro, segundo e terceiro lugares. As posições ordenadas multiplicam possibilidades."
      },
      {
        "title": "Permutação: todos os elementos entram",
        "body": "Se você quer organizar cinco livros distintos em uma prateleira, usando **todos**, o número de ordens é **5! = 120**. Esse é o caso clássico de permutação simples. Se houver elementos repetidos, as fórmulas podem mudar, pois trocar dois elementos indistinguíveis não cria novo resultado. Em exercícios, identifique se há repetição permitida, posições diferentes, restrições e se a ordem importa antes de selecionar método."
      }
    ],
    "worked": {
      "title": "Exemplo resolvido: comissão versus presidência",
      "body": "**Enunciado A:** cinco servidores serão considerados e dois formarão uma comissão, sem cargos específicos.\n\n**Passo 1:** ordem não importa.\n\n**Passo 2:** C(5,2)=5!/(2!×3!) = **10** comissões.\n\n**Enunciado B:** dos mesmos cinco, serão escolhidos presidente e vice.\n\n**Passo 1:** ordem importa.\n\n**Passo 2:** há cinco opções para presidente; após escolha, quatro para vice.\n\n**Passo 3:** 5×4 = **20** pares ordenados.\n\n**Conclusão:** mesmo conjunto inicial e mesma quantidade de pessoas escolhidas, mas respostas diferentes porque o papel da ordem mudou."
    },
    "pitfalls": [
      "Grupo sem cargos: ordem não importa; use combinação simples quando adequado.",
      "Cargos distintos/posições: ordem importa; use arranjo quando cabível.",
      "Permutação simples normalmente utiliza todos os n elementos distintos.",
      "Repetição permitida e restrições alteram a contagem, portanto não aplique fórmula sem ler o enunciado."
    ],
    "review": [
      {
        "ask": "Escolher dois membros de comissão entre cinco, sem cargos, gera quantas possibilidades?",
        "answer": "C(5,2)=10, pois a ordem não importa."
      },
      {
        "ask": "Escolher primeiro e segundo lugar entre cinco gera quantas possibilidades?",
        "answer": "5×4=20, pois ordem e posições importam."
      }
    ],
    "extra": "Estude combinações com repetição, princípio da inclusão-exclusão e problemas com elementos repetidos após dominar a diferença entre grupos e posições."
  },
  {
    "id": 88,
    "title": "Lei de Acesso à Informação: transparência e proteção de dados",
    "goal": "Entender a finalidade da LAI, o acesso a documentos públicos e como avaliar restrições relacionadas a dados pessoais.",
    "steps": [
      {
        "title": "Por que existe uma lei de acesso à informação?",
        "body": "A administração pública produz documentos, decisões e registros que podem ser relevantes para controle social. A **Lei de Acesso à Informação — LAI (Lei 12.527/2011)** estabelece regras para o acesso a informações no âmbito de aplicação da lei, buscando concretizar o princípio da transparência. A ideia central é que a publicidade seja regra e o sigilo, exceção prevista e justificada. Isso não significa que todo documento deve ser publicado integralmente na internet: existem hipóteses de proteção e restrições legítimas."
      },
      {
        "title": "Transparência ativa e passiva",
        "body": "A **transparência ativa** ocorre quando informações de interesse coletivo ou geral são disponibilizadas proativamente, conforme exigências aplicáveis, sem que alguém precise solicitar cada documento. A **transparência passiva** envolve responder a um pedido de informação encaminhado ao órgão pelos canais previstos. Em ambos os casos, o objetivo é permitir acesso efetivo e compreensível aos dados públicos, observados requisitos legais. Em provas, a diferença está principalmente na necessidade ou não de requerimento individual."
      },
      {
        "title": "O que acontece quando o documento contém dados pessoais?",
        "body": "Imagine um relatório público sobre gastos com saúde. Parte do documento pode demonstrar despesas e decisões administrativas; outra parte pode conter nomes de pacientes, detalhes de prontuários ou dados pessoais que exigem proteção. A análise precisa conciliar a **transparência dos atos públicos** com a privacidade e regras de tratamento de dados. Dependendo da situação, pode ser cabível disponibilizar trechos públicos com **ocultação ou proteção das informações pessoais** cujo acesso não seja autorizado. A solução não é nem publicar prontuários indiscriminadamente nem negar todo documento sem análise."
      },
      {
        "title": "Como a LAI e a LGPD se relacionam",
        "body": "A **LAI** trata do direito de acesso a informações e das condições de transparência e restrição. A **LGPD** disciplina operações de tratamento de dados pessoais nas hipóteses abrangidas por ela. As leis precisam ser aplicadas de maneira compatível: proteger dados pessoais não elimina automaticamente dever de transparência, assim como divulgar informação pública não autoriza exposição irrestrita de dados sensíveis. Em concursos, desconfie de respostas absolutas como 'todo dado público pode ser divulgado' ou 'qualquer dado pessoal torna o documento totalmente sigiloso'."
      }
    ],
    "worked": {
      "title": "Exemplo: pedido sobre aquisição de equipamentos de hospital",
      "body": "**Situação:** um cidadão solicita documentos sobre compra de equipamentos. O processo inclui contrato, valores, justificativa e anexos com dados pessoais de pacientes.\n\n**1.** Verifique quais informações tratam de gasto e atos administrativos sujeitos à transparência.\n\n**2.** Identifique trechos que envolvem dados pessoais protegidos e avalie restrições legais específicas.\n\n**3.** Quando adequado e juridicamente permitido, disponibilize a parte acessível do documento com proteção de informações pessoais restritas.\n\n**4.** Oriente o solicitante sobre a resposta e os canais de revisão previstos, quando cabíveis.\n\n**Conclusão:** o dever de transparência não é idêntico ao dever de publicar tudo. Boa aplicação exige avaliação concreta, fundamentada nas regras vigentes."
    },
    "pitfalls": [
      "Publicidade é regra na LAI, com restrições legais legítimas.",
      "Transparência ativa difere de resposta a pedido específico.",
      "Presença de dados pessoais não significa necessariamente sigilo integral do documento.",
      "LAI e LGPD devem ser compatibilizadas; nenhuma autoriza divulgar indiscriminadamente dados de saúde."
    ],
    "review": [
      {
        "ask": "Qual diferença entre transparência ativa e passiva?",
        "answer": "Ativa: divulgação proativa. Passiva: resposta a pedido de informação."
      },
      {
        "ask": "Documento público com anexo contendo dados de saúde deve ser divulgado integralmente sem exame?",
        "answer": "Não. É necessário avaliar proteção dos dados e possibilidade de acesso às informações públicas de modo adequado."
      }
    ],
    "extra": "Antes da prova, consulte a redação atualizada da LAI e orientações oficiais do órgão fiscalizador. Procedimentos, prazos e exceções precisam ser verificados na norma vigente."
  }
];
