# EstudaTI V1.2 — Instalar sobre a versão que já funciona

Esta versão **não exige começar do zero**. Ela adiciona oficinas aplicadas para as 9 disciplinas, melhora a ordem da trilha e preserva a parte de discursivas, simulados, questões, flashcards e IA opcional da V1.1.1.

## Atualização no Windows

1. Abra o Docker Desktop. Entre na sua instalação atual: `C:\Projetos\EstudaTI`.
2. Execute `BACKUP_DADOS_WINDOWS.bat` e **confirme a criação do arquivo de backup** na pasta `backups`.
3. Extraia o ZIP V1.2. Entre na pasta `EstudaTI` extraída e copie **todo o conteúdo dela** para `C:\Projetos\EstudaTI`, sobrescrevendo código e material.
4. **Não sobrescreva o `.env` existente; não apague a pasta `backups`; não exclua o volume Docker `estudati_data`.** O pacote vem só com `.env.example`.
5. Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat`. O atualizador tenta produzir outro backup antes de reconstruir os contêineres.
6. Acesse `http://localhost:8088` e pressione `Ctrl + F5` para limpar arquivos antigos em cache.
7. Vá a **Matérias e aulas → Redes → Oficinas de prova**. Abra “Diagnóstico de rede sem confundir DNS, rota e firewall”. Confirme que aparecem caso, questões e flashcards.

## Se ocorrer erro

Abra o PowerShell em `C:\Projetos\EstudaTI` e execute:

```powershell
docker compose ps
docker compose logs --tail=100
```

Não execute `docker compose down -v`: a opção `-v` remove volumes, inclusive o que guarda seus estudos.

## O que mudou no conteúdo

- Antes: 151 aulas, 268 registros de questões autorais (uma arquivada), 374 flashcards.
- Agora: **169 aulas**, 304 registros de questões autorais (**303 ativas** se nenhuma for arquivada depois), **410 flashcards** e 27 questões dissertativas autorais.
- **Novidade:** 18 oficinas de aplicação com casos resolvidos, duas por matéria, cada qual com duas questões inéditas e dois flashcards.
- **Não incluí questões oficiais em massa:** o importador mantém validação manual de prova e gabarito.

Leia `docs/REVISAO_PEDAGOGICA_V12.md` para a matriz de aprendizagem e as lacunas que continuam abertas.
