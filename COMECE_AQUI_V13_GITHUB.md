# EstudaTI V1.3 — instalação e importação no GitHub

## Pelo Android (uma vez)

1. Abra a conversa com ChatGPT e baixe **EstudaTI_V1.3_PRONTO_PARA_GITHUB.zip**.
2. Abra https://github.com/Tipimenta/EstudaTI/tree/master/pacotes no navegador do celular. Ative **Site para computador** se necessário.
3. Escolha **Add file → Upload files** e envie o ZIP **sem extrair**.
4. Confirme o commit na branch **master**.
5. Acesse https://github.com/Tipimenta/EstudaTI/actions e acompanhe **Importar pacote EstudaTI**. Aguarde status verde. Se ficar vermelho, compartilhe o erro para corrigirmos; não considere a importação concluída.

O repositório já contém a automação para extrair a pasta `EstudaTI/`, rodar testes de API e compilar o frontend. O ZIP foi preparado **sem arquivos de backup, banco, `.env` com senhas ou PDF pessoal**.

### Importante sobre a Vercel

Depois da importação bem-sucedida ainda será preciso configurar hospedagem da API e banco persistente. O app **não está publicado nem utilizável em nuvem só porque o código está no GitHub**. Evite expor a aplicação com a autenticação local simples da versão Docker.

## Atualizar o Docker no Windows

Na versão instalada, execute `BACKUP_DADOS_WINDOWS.bat` e confirme o arquivo em `backups/`.
Extraia este ZIP e copie o conteúdo interno da pasta `EstudaTI` para `C:\Projetos\EstudaTI`. **Não substitua o seu `.env` e não apague volumes Docker**.
Execute `ATUALIZAR_ESTUDATI_WINDOWS.bat`, depois abra http://localhost:8088.

## Novidades visíveis

- Menu **Matriz de editais**: cadastrar tópicos oficiais manualmente e mapear aulas.
- Menu **Banco de questões**: conferência independente de enunciado e gabarito oficial.
- Menu **Simulados**: 18 casos práticos com justificativas de cada alternativa.
- **Leia** `docs/EVOLUCAO_V13_E_PROVAS.md` para limitações e provas de funcionamento.
