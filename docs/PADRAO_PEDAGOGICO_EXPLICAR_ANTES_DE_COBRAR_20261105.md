# EstudaTI — padrão pedagógico obrigatório para revisão de aulas
Atualizado em 05/11/2026

## O problema identificado

Exemplo que **não ensina**:

> Camada de sessão: controle de sessões em modelos conceituais.

Isso apenas nomeia uma função. Um aluno iniciante não sabe o que é sessão, por que existem mecanismos de controle, o que significa organizar o diálogo, o que é um modelo conceitual e como essas ideias se ligam à comunicação real.

Exemplo que **ensina**:

> Imagine dois programas trocando informações durante uma tarefa demorada. Além de enviar cada dado, pode ser importante acompanhar o início, a continuidade e o encerramento dessa interação, ou registrar pontos em que ela possa ser retomada. Essa organização do diálogo é uma das funções associadas à camada de sessão do modelo OSI. É uma classificação conceitual: na Internet atual essas funções frequentemente estão nos protocolos ou na aplicação e não exigem uma camada 5 executada separadamente.

## Critério mínimo para novas aulas e revisões

1. **Começar por uma situação reconhecível.** Não introduzir uma sigla no título da explicação antes de o leitor conhecer a necessidade.
2. **Definir cada termo na primeira ocorrência significativa.** Explicar, em linguagem comum, o que a coisa é. Ex.: interface, endereço, rede, pacote, protocolo.
3. **Dizer por que existe.** Qual dificuldade concreta a solução resolve?
4. **Descrever funcionamento passo a passo.** Não trocar o mecanismo por uma associação para decorar.
5. **Explicar o vínculo com o que já foi ensinado.** Ex.: MAC ajuda a encaminhar quadro no enlace local; IP oferece endereçamento usado entre redes; porta lógica distingue comunicação entre programas.
6. **Diferenciar termos próximos.** Sessão conceitual OSI ≠ necessariamente sessão de login; DNS ≠ DHCP; autenticação ≠ autorização; software instalado ≠ processo ativo.
7. **Oferecer exemplo resolvido.** Com situação, hipóteses, raciocínio, resposta e por que alternativas semelhantes não servem.
8. **Testar a compreensão.** Questões autorais de aplicação com comentários de todas as alternativas e flashcards que exijam explicar conceitos.
9. **Evitar frases soltas e texto inflado.** Não anexar apostilas genéricas, cadernos copiados de outras aulas ou repetição em 'aprofundamento complementar'.
10. **Aprofundamento como continuidade.** Se for necessário um termo novo, desenvolver a base em sequência; conteúdos opcionais não devem interromper o essencial.

## O que já foi reconstruído nesta rodada

**11 capítulos iniciais**, abrangendo as nove áreas:

- RED 1 — Como uma mensagem atravessa a rede: OSI e TCP/IP (9 etapas, incluindo MAC, IP, sessão, codificação, porta e encapsulamento)
- RED 2 — IP, máscara, gateway, DNS e DHCP, com prefixo /26 calculado
- RED 3 — Switch, roteador, VLAN, VPN e firewall, com cenário entre sub-redes
- SEG 4 — CID, ameaça, vulnerabilidade, risco, controle, autenticação/autorização
- SO 6 — Sistemas operacionais, software, processo, serviço, usuário, permissão e logs
- POR 8 — Leitura, tese, assunto, inferência, quantificadores e conectivos
- GOV 10 — Serviço, incidente, contorno, problema e mudança
- BD 12 — Banco, SGBD, SQL, tabelas, chaves, JOIN e transações
- ENG 14 — Requisitos, critérios de aceite, tipos de testes, Git e commit
- LOG 16 — Proposição, negação, conectivos e condicional
- LEG 17 — Dado pessoal, dado sensível, tratamento, titular, controlador, finalidade e necessidade

Esses 11 capítulos têm exemplos resolvidos, armadilhas e revisões. Foram incluídas **15 questões de aplicação originais**, cada uma com explicações dos quatro itens. Os IDs existentes foram preservados, assim como anotações, histórico e progresso.

**18 capítulos adicionais** haviam sido reescritos editorialmente na revisão anterior (duas aulas por disciplina), sem duplicar os IDs acima.

### Limite real

**29 de 169 capítulos** tiveram reconstrução editorial individual (18 anteriores + 11 da presente revisão). Os demais **140 capítulos** não podem ser chamados de plenamente reescritos e devem passar por curadoria com esse critério antes de tal afirmação.

## Regras de publicação

- Não anunciar 'as 169 aulas agora explicam tudo' até que as 169 sejam inspecionadas individualmente.
- Executar testes de conteúdo, frontend, API e compatibilidade de banco antes da publicação.
- Conferir SHA do deployment Vercel como READY para afirmar que a experiência nova está ativa.
- Nunca apagar o progresso do usuário, questões antigas, tentativas e flashcards durante uma reescrita.
- Não usar IA para presumir gabarito oficial de concurso. Material autoral e material oficial permanecem identificados separadamente.
