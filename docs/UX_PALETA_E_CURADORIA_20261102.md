# EstudaTI — revisão de conteúdo e experiência de leitura (02/11/2026)

## Objetivo de produto

O fluxo de estudo permanece **Aulas → Questões → Revisão → Provas anteriores / Simulados → Progresso**, com ferramentas opcionais sem protagonismo na navegação.

Não confundir aumento de quantidade de caracteres com ensino. Um capítulo excelente deve apresentar situação inicial compreensível, fundamentos encadeados, exemplo resolvido e perguntas novas com explicação das alternativas. Não acrescentar exercícios duplicados e não reproduzir apostilas comerciais.

## Interface entregue em código

- Tema **Papel suave** como padrão: fundo de areia/cinza quente `#f1efe8`, superfícies `#faf8f2`, texto principal `#25343d`, verde-petróleo `#206f65`. **Nenhuma superfície principal usa branco #fff puro.**
- Modo noturno preservado. Alternância no cabeçalho com preferência em `localStorage`; ajuste também em Configurações.
- Leitura com largura máxima de ~76 caracteres, entrelinha generosa, margens consistentes e tamanho opcional ampliado.
- Navegação agrupada: 5 abas centrais (Início, Aulas, Questões, Revisar e Progresso), depois Provas anteriores/Simulados/Plano/Concursos; ferramentas menos frequentes em locais contextuais.
- Início com quatro ações curtas; banner redundante de provas removido.
- Aulas apresentadas em leitura **contínua**, sem exigir cinco cliques para percorrer o texto. Após teoria e exemplo, ação direta de resolver questões.
- Componentes de aulas e ferramentas avançadas carregados por `React.lazy`/Suspense para reduzir peso inicial no Android.
- Mantidos IDs e vínculos do banco, progresso, questões e dados de concursos.

## Revisão pedagógica original desta rodada

**18 de 169 aulas tiveram reconstrução substantiva, exatamente duas em cada disciplina:**

| Área | Conteúdo aprofundado |
|---|---|
| Redes | TCP; DHCP |
| Segurança | NIST CSF 2.0; PKI/TLS |
| Sistemas Operacionais | AD/LDAP/Kerberos; Linux systemd/logs |
| Português | Haver/fazer e concordância; Pontuação |
| Governança | COBIT 2019; PDTI |
| Banco de Dados | Transações ACID; Normalização |
| Engenharia de Software | HTTP/REST; Autenticação/autorização |
| Raciocínio Lógico | Quantificadores; Conjuntos |
| Legislação | Direitos LGPD; Licitações/Lei 14.133 |

Os 18 capítulos agora têm **4 seções explicativas próprias, caso resolvido, 4 armadilhas e 4 perguntas de revisão**. São aplicados como substituição dos roteiros curtos antigos, não como textos genéricos anexados no final da página.

**36 questões autorais novas**, duas por capítulo, foram escritas com quatro alternativas e comentários individuais de todas as alternativas. No banco Neon: **661 questões de estudo, 507 flashcards e 169 aulas**, além de questões reais extraídas separadamente para as provas oficiais.

**Limitação editorial:** as outras **151 aulas** ainda variam de profundidade e **não** devem ser descritas como reconstruídas em profundidade. Elas agora ganham navegação/leitura melhor, sem alteração indevida de seu conteúdo. Continuar pelo conteúdo específico de maior incidência nos editais, sempre substituindo material desconexo, não acrescentando páginas por volume.

## Qualidade, acessibilidade e validação

- CI GitHub verifica frontend (TypeScript/Vite), testes API e banco PostgreSQL isolado, além dos 18 capítulos e das 36 questões.
- Contagens do Neon foram consultadas sem alterar o progresso: 169 aulas, 661 questões autorais revisadas, 507 flashcards e 195 itens extraídos de provas reais liberados após auditoria prévia.
- Conferidos em referências externas: seis funções NIST CSF 2.0, ordem geral e inversão habilitação na Lei 14.133, e isolamento Read Committed do PostgreSQL.
- Atenção a limites de acessibilidade: modo papel deve conservar contraste suficiente e respeitar `prefers-reduced-motion`; validar experiência em telas móveis após deploy.
- Vercel Hobby atingiu cota gratuita de implantação na data desta edição. O código e os testes podem ficar prontos antes de a produção receber a atualização. **Nunca afirmar que uma versão foi publicada sem confirmar SHA READY no domínio de produção.**

## Próximos critérios editoriais

Para uma aula curta que ainda esteja incompleta: identificar subtópico e pré-requisitos → produzir explicação progressiva (não frases soltas) → acrescentar exemplos crescente dificuldade → trabalhar caso totalmente resolvido → escrever questões distintas com distratores plausíveis → reforçar flashcards próprios → revisar redundância e precisão em fontes oficiais quando pertinente.
