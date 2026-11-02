# EstudaTI V0.5 — atualização de cursos aprofundados

**Projeto pessoal.** Base: React 19, Tailwind CSS 4, TypeScript, Vite, FastAPI, SQLite persistente, Docker Compose e Nginx. O novo pacote contém a aplicação inteira. Não altera CiberInsight ou CMO.

## O que acrescenta à V0.4

- 27 módulos **aprofundados**: três para cada uma das nove disciplinas, com explicação, exemplo resolvido, armadilhas, prática sem consulta e leitura externa.
- 54 **questões autorais** novas, comentadas e com posição de gabarito não fixa, vinculadas às aulas.
- 54 **flashcards** novos, associados aos módulos aprofundados.
- Apostilas adicionais em `materials/aprofundamento/`, uma por disciplina, para leitura offline e edição.
- Área **Matérias e aulas** com filtros **Trilha aprofundada / Aulas introdutórias / Todas as aulas**.
- Fonte de aprofundamento exibida dentro das aulas, com link externo, e exercícios comentados na aba própria.
- Migração aditiva do banco: preserva aulas, notas, cartões, sessões, respostas, concursos e cronogramas anteriores.

## Conteúdo total depois da migração

- 9 disciplinas.
- 117 aulas (90 anteriores + 27 módulos aprofundados).
- 234 questões **autorais** (180 anteriores + 54 novas); **zero provas oficiais importadas por este pacote**.
- 306 cartões (252 anteriores + 54 novos).

As 27 aulas têm explicações mais extensas que os 90 textos introdutórios e cobrem **parte importante** dos programas de TI. **O material ainda não cobre exaustivamente todas as matérias e variações de edital**. Considere a matriz `docs/COBERTURA_EDITAL_E_LACUNAS.md` para conferir pendências. Cálculos, legislação e fontes devem ser checados antes de qualquer concurso específico.

## Atualizar a instalação que já funciona no Windows

1. Deixe o Docker Desktop aberto. **Feche o EstudaTI e interrompa a sessão de estudo antes da atualização.**
2. Na pasta antiga (`C:\Projetos\EstudaTI`), execute `BACKUP_DADOS_WINDOWS.bat`. Confirme que apareceu um arquivo `.sqlite3` em `C:\Projetos\EstudaTI\backups`.
3. Faça, se possível, outra cópia da pasta `backups` para outro disco. Guarde a senha e a configuração `.env`.
4. Extraia o ZIP V0.5 em uma pasta temporária. Abra a pasta `EstudaTI` contida nele.
5. Copie as pastas `api`, `web`, `materials`, `docs`, `tests`, `tools` e os `.bat`/`.ps1` para `C:\Projetos\EstudaTI`, substituindo arquivos existentes. **Não apague/reescreva o `.env`, `backups` ou o volume Docker**. A pasta `docs/edital_birigui_2026_usuario.pdf` pode permanecer.
6. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat` dentro da pasta final. O atualizador faz outro backup e executa `docker compose up -d --build`.
7. Abra `http://localhost:8088`, faça login e vá em **Matérias e aulas > Redes > Trilha aprofundada**. A primeira aula deve começar com `[Aprofundamento]`. Veja a aba **Questões da aula**.
8. Confira o histórico anterior em **Meu desempenho**, suas notas em uma aula antiga e o painel de tempo.

**NUNCA rode `docker compose down -v` para atualizar.** O `-v` remove volumes e pode apagar o banco.

### Primeira instalação

Extraia tudo e execute `INSTALAR_E_ABRIR_WINDOWS.bat`. O script cria `.env` na primeira instalação. Com o Docker em execução, abre `http://localhost:8088`.

### Se algo der errado

Abra PowerShell na pasta do sistema:

```powershell
docker compose ps
docker compose logs --tail=150 api
docker compose logs --tail=150 web
```

Não rode comandos destrutivos. Se a interface continuar antiga, pressione `Ctrl+F5` ou abra aba anônima. Se o `web` falhar no build, envie a parte final dos logs; mantenha o backup e o volume intactos. Para retorno de versão, utilize cópia da versão V0.4 **e siga processo de restauração do SQLite com o sistema parado**; não restaure às cegas por cima de dados novos.

## O que foi validado neste pacote

- 14 testes de API/migração concluídos neste ambiente.
- 10 arquivos `.ts`/`.tsx` analisados sintaticamente.
- CSV/JSON/códigos do material e carregamento dos 27 módulos verificados.
- Compilação real do frontend (`npm run build`) e execução de contêineres **não foram validadas aqui**. O ambiente não conseguiu baixar pacotes npm.

## Limitações importantes

- Fontes oficiais são **links de consulta**, não vídeos nem PDFs copiados de plataformas comerciais.
- Não há banco completo de provas antigas. O importador anterior foi mantido, mas provas e gabaritos exigem validação e respeito às licenças de reprodução.
- Tutor com IA, autoatualização sem supervisão e cobertura integral de editais ainda não estão implementados.
- O cronômetro global da V0.4 foi preservado; ele registra sessões quando você as salva.
- Concurso, salários, prazos e dados legais podem mudar: verifique sempre o órgão e o edital mais recente.
