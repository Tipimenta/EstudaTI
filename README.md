# EstudaTI V1.3.0 — Revisão de provas e matriz de editais

> **Nova versão 02/11/2026:** confira [COMECE_AQUI_V13_GITHUB.md](COMECE_AQUI_V13_GITHUB.md) para publicar no repositório privado e [docs/EVOLUCAO_V13_E_PROVAS.md](docs/EVOLUCAO_V13_E_PROVAS.md) para o resumo técnico de funcionalidades, limitações e testes.
>
> Esta atualização mantém todo o material e o histórico da V1.2.1, adiciona 18 questões originais com justificativas por alternativa (321 questões ativas), conferência de provas oficiais com registro de auditoria e a matriz manual de cobertura do edital.
>
> **Não é uma versão pronta para nuvem:** exige backend e banco persistentes antes de publicar na Vercel. A versão Docker local permanece funcional.

---

# EstudaTI V1.2.1 — Ambiente pessoal de preparação para concursos de TI

**Versão integrada com React 19, Tailwind CSS 4, FastAPI, SQLite e Docker Compose.**

> Este é um produto de uso pessoal, com 9 disciplinas, 151 aulas, 268 questões **autorais** comentadas, 374 flashcards, importação assistida de provas, dashboard, simulados, cronômetro global, revisão de questões, priorização por tema, tutoria guiada/IA opcional e laboratório IPv4. É uma base útil e extensível, não um equivalente em escala ao Gran Cursos ou a outras plataformas comerciais. Os conteúdos não são exaustivos para todos os concursos.

## Novo na V1.2.1 — mais questões sem repetição desnecessária

- O Banco de questões aceita CSV/JSON (até 500 itens e 2 MB por arquivo) e a Biblioteca oferece importação assistida de PDF.
- Na importação, bloqueia duplicatas exatas mesmo que as alternativas estejam reordenadas ou a pontuação varie.
- **Possíveis duplicatas semânticas ficam como rascunho com aviso**, sem exclusão automática: enunciados parecidos podem ter gabaritos diferentes.
- Os simulados comuns passam a preferir perguntas inéditas e, depois, as menos recentemente respondidas, evitando enunciados muito semelhantes no mesmo teste quando há variedade suficiente.
- O modo inteligente continua priorizando revisões vencidas e questões inéditas; revisões são intencionais, não um defeito de repetição.
- Leia `docs/QUESTOES_SEM_REPETICAO_V121.md`. Esta atualização é aditiva: não altera nem exclui históricos existentes.

## Novo na V1.2 — oficinas de aplicação das nove disciplinas

Foram incluídas 18 oficinas autorais de prova (2 por disciplina), 36 questões objetivas novas e 36 flashcards. Na tela Matérias e aulas, a Trilha recomendada separa aprofundamento conceitual e aplicação. A atualização é aditiva e preserva registros antigos. Veja `docs/REVISAO_PEDAGOGICA_V12.md` e `COMECE_AQUI_V12.md`.

## Novo na V1.1 — Questões dissertativas e escrita formal

- **Módulo separado “Discursivas com correção”**, com 27 questões autorais (três por disciplina), espelho editorial e rubricas por critério.
- **Diagnóstico local**: indicadores mecânicos de conteúdo/registro formal, sem atribuir nota.
- **Correção assistida por IA opcional**: avalia conteúdo técnico e a linguagem separadamente, com nota orientativa, justificativas e sugestões de reescrita.
- **RAG lexical local**: recupera trechos das aulas da mesma disciplina antes de solicitar a correção. Não é uma busca vetorial nem substitui referências oficiais.
- **Evolução da escrita**: versões, histórico, sugestões trecho a trecho, resposta revisada apenas na linguagem e resposta técnica ampliada.
- Consulte `docs/DISCURSIVAS_E_CORRECAO_DE_LINGUAGEM.md` para o passo a passo e limites.

## O que é novo na V1

- **Orientador inteligente**: mede progresso por questões distintas (última resposta), utiliza priorização transparente e avisa sobre amostras pequenas. Permite pesos individuais por disciplina.
- **Revisão de questões**: questões respondidas entram em intervalos iniciais de revisão de 1, 3 e dias crescentes conforme acertos; erros retornam em 1 dia. Algoritmo próprio inspirado em repetição espaçada, **não é FSRS** e não estima aprovação.
- **Simulado prioritário**: opção que prefere revisões vencidas, depois questões inéditas e por fim repetidas, com limite de três por tópico quando há diversidade.
- **Professor com método Feynman**: sem API externa funciona com trechos da aula; com chave OpenAI API pessoal, permite explicações, exercícios sem gabarito, exemplos, resumos e perguntas. IA pode errar e pode gerar custos.
- **Recuperação ativa**: espaço para explicar o conceito sem olhar, registrar dúvidas e autoavaliar o entendimento.
- **Laboratório IPv4**: endereçamento CIDR, máscara, rede, broadcast, quantidade de endereços e desafio interativo.
- **34 novas aulas autorais complementares** em temas cobrados em TI, acrescentando 34 questões e 68 cartões. As 117 aulas da versão anterior continuam disponíveis.
- **Mais referências públicas** com links externos de Microsoft Learn, Linux Foundation, ENAP, MDN, NIST e RFC.

## Revisão de qualidade V1.1.1

Esta revisão corrige um erro de importação no React que poderia bloquear o build, impede sobreposição de rascunhos entre discursivas, ajusta a contagem de progresso nas matérias, permite abrir os capítulos listados na trilha aprofundada e arquiva cópias literais de questões autorais sem excluir respostas. Também normaliza nomes de apostilas e marca o roadmap antigo como histórico. Consulte `docs/AUDITORIA_V1.1.1.md` para achados, limites e testes.

## Estrutura

```text
EstudaTI/
├── api/                  FastAPI, conteúdos, inteligência e integração IA opcional
├── web/                  React/TS, Tailwind e Nginx
├── materials/            apostilas e catálogos autorais
├── docs/                 fontes, matriz do edital, limitações e método de estudo
├── tests/                testes de integração da API
├── tools/                ferramentas de exportação e PDF
├── examples/             formatos de importação de questões
├── compose.yaml          dois serviços e volume persistente
├── .env.example          exemplo de configuração
├── INSTALAR_E_ABRIR_WINDOWS.bat
├── BACKUP_DADOS_WINDOWS.bat
└── ATUALIZAR_ESTUDATI_WINDOWS.bat
```

## Instalar no Windows pela primeira vez

1. Abra o Docker Desktop e mantenha-o em execução.
2. Extraia **a pasta EstudaTI** do ZIP para `C:\Projetos\EstudaTI`.
3. Execute `INSTALAR_E_ABRIR_WINDOWS.bat` nessa pasta e configure uma senha pessoal de pelo menos 12 caracteres.
4. Acesse `http://localhost:8088`. O primeiro build exige acesso à internet para baixar dependências e imagens.
5. Não abra a porta 8088 diretamente para a internet. O padrão é acesso apenas no próprio PC.

## Atualizar a V0.5 que já está instalada

1. **Com o Docker funcionando**, execute `BACKUP_DADOS_WINDOWS.bat` da versão atual e confira o arquivo em `backups`.
2. Extraia o novo ZIP. **Copie os arquivos da pasta EstudaTI do ZIP para a instalação existente** `C:\Projetos\EstudaTI`, substituindo o código. Não substitua nem apague seu `.env`, a pasta `backups` e o volume Docker.
3. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` (faz outro backup e executa `docker compose up -d --build`).
4. Acesse `http://localhost:8088` e force recarga com Ctrl+F5.
5. Nunca execute `docker compose down -v`: o parâmetro `-v` remove o volume de dados.

Comandos de diagnóstico:

```powershell
docker compose ps
docker compose logs --tail=100
docker compose logs --tail=100 api
docker compose logs --tail=100 web
```

## Professor com IA — opcional

Se quiser usar a integração, abra `.env` no seu PC e acrescente:

```dotenv
OPENAI_API_KEY=sua_chave_de_api_pessoal
OPENAI_MODEL=gpt-5-mini
```

Depois execute `ATUALIZAR_ESTUDATI_WINDOWS.bat`. A chave é enviada como variável de ambiente somente ao backend e não é disponibilizada ao frontend. **A assinatura ChatGPT não paga o uso da API**: pode gerar cobranças independentes. O modelo escolhido precisa estar disponível na sua conta. Sem chave, a plataforma continua funcionando em modo guiado local sem resposta generativa. As perguntas e o trecho de aula selecionada são enviados ao provedor quando a IA estiver ativada.

## Questões oficiais e direitos de uso

O ZIP **não redistribui** cadernos comerciais de questões. O sistema oferece links para as bancas, importadores CSV/JSON e extração *assistida* de texto de PDF que você obtiver legalmente. Gabaritos, anulações, tipo de caderno, autorização e correção de OCR devem ser verificados **antes** de marcar como `revisada`. Não represente questões autorais ou adaptadas como questões oficiais.

## Testes e limites

Os testes Python podem ser executados após instalar dependências de `api/requirements.txt`:

```powershell
$env:PYTHONPATH="api"
python -m pytest -q
```

A validação automatizada da API foi realizada neste ambiente. A instalação dos pacotes do frontend por npm e a execução real do Docker **não puderam ser concluídas aqui**, devido à indisponibilidade de acesso ao registro npm e do Docker. Portanto, a interface nova exige validação final no seu PC.

## Preservação dos outros projetos

O EstudaTI não altera repositórios, dados ou deploys do CiberInsight e do CMO.
