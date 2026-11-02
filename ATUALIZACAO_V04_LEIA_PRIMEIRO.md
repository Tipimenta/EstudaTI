# EstudaTI V0.4 — atualização do sistema em funcionamento

**Este pacote é para a mesma instalação que você já usa; não inicia um projeto novo.**

## O que mudou

1. Relógio compacto sempre disponível no cabeçalho, inclusive nas páginas de matérias, questões e simulados. Abrir a seta permite mudar 25/50/90 minutos, selecionar aula, pausar, reiniciar e **registrar o tempo**. O relógio conserva o estado ao recarregar a página usando o armazenamento local deste navegador. O registro do tempo no SQLite é **manual** (botão Salvar).
2. Nova área **Matérias e aulas**: nove disciplinas com cartões e progresso, 90 aulas organizadas como trilhas, uma apostila autoral por disciplina totalizando 90 capítulos, exemplos, armadilhas, perguntas de recuperação ativa e exercícios comentados da aula.
3. Registro persistente de conclusão e anotações **por aula**, preservado no mesmo banco SQLite da instalação anterior.
4. Backup antes da atualização, feito com a API SQLite de backup, sem copiar diretamente um banco em uso.
5. O caderno de erros, simulados, flashcards, cronograma, concursos, leitor de PDFs e importação de questões da versão anterior continuam.

## ATENÇÃO: atualização segura de uma instalação existente

1. Abra a pasta onde sua instalação funcional do EstudaTI já está (a que contém `compose.yaml` e o `.env`).
2. **Sem apagar arquivos**, copie para essa pasta o novo arquivo `BACKUP_DADOS_WINDOWS.ps1` e execute-o pelo `BACKUP_DADOS_WINDOWS.bat`, que também acompanha o ZIP, com o Docker Desktop aberto. Um backup `backups/estudati_...sqlite3` deve aparecer; confira.
3. Extraia o conteúdo da pasta `EstudaTI` deste ZIP **por cima da pasta existente**, substituindo os arquivos do projeto quando o Windows perguntar. Não exclua seu arquivo `.env` (ele nem faz parte deste ZIP), a pasta `backups` ou o volume do Docker.
4. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat`. Ele faz outro backup e executa `docker compose up -d --build` sem remover volumes.
5. Abra http://localhost:8088 (ou a porta HOST_PORT definida no seu `.env`) e faça login com a senha que você já utiliza.
6. Se a interface antiga ainda aparecer, faça uma recarga forçada com `Ctrl+F5`.

**NÃO EXECUTE** `docker compose down -v`, `docker volume prune` ou exclusões manuais do volume. Isso pode apagar o histórico de estudo.

## Primeira instalação

Use `INSTALAR_E_ABRIR_WINDOWS.bat` em uma pasta nova. O instalador da v0.3.2 que resolveu o problema do warning/seccomp foi preservado.

## Utilização sugerida

- Abra **Matérias e aulas** e selecione uma das nove disciplinas.
- Escolha a aula pela sequência lateral. Utilize **Teoria e exemplos** e **Apostila completa**.
- Na aba **Questões da aula**, responda sem consultar o gabarito e leia a explicação.
- Em **Minhas anotações**, escreva o erro e pressione **Salvar anotações**.
- Ao terminar, clique em **Concluir esta aula**. O progresso aparecerá no cartão da disciplina.
- Inicie o relógio no cabeçalho. Ao pausar ou completar a sessão, pressione **Salvar** para registrar o tempo.
- Use **Flashcards**, **Simulados** e **Mapa de domínio** para revisão e avaliação.

## Limites e transparência

- As 180 questões incluídas são **autorais**, não são questões oficiais de provas anteriores. O importador de provas reais segue disponível e exige conferência dos gabaritos e atenção a direitos de reprodução.
- As apostilas são materiais introdutórios/intermediários autorais, organizados por capítulo. Não substituem todas as referências, normas atualizadas ou todos os conteúdos de cada edital.
- O monitor automático de editais ainda detecta alterações em URLs; não interpreta todo novo edital sozinho. Tutor com IA e videoaulas não foram integrados nesta versão.
- O relógio usa a hora do dispositivo; se a aba ficar em segundo plano com ele ativado, o tempo continua correndo. Pause ao interromper o estudo.
- A execução real do Docker e o build completo do frontend devem ser conferidos no seu computador: no ambiente de criação não houve acesso para instalar pacotes npm nem daemon Docker. Os 11 testes de backend e a verificação de sintaxe TS/TSX passaram.

## Erros

Na pasta do projeto abra PowerShell e rode:

```powershell
docker compose ps
docker compose logs --tail=120
```

Se a atualização falhar, mantenha intactos o `.env`, o volume e os backups; esses dados são independentes dos contêineres.
