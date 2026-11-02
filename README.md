# EstudaTI — plataforma de estudos para concursos de TI

Projeto privado e independente dos repositórios CyberInsight e CMO.

## Instalação do código V1.2.1

O projeto foi criado e o acesso pelo ChatGPT está habilitado.

**Pelo Android:** baixe o ZIP da V1.2.1 enviado nesta conversa, abra a pasta `pacotes/` deste repositório no site do GitHub, escolha **Add file > Upload files**, envie o ZIP **sem extrair** e confirme o commit em `master`.

Após isso, o GitHub Actions executa o processo **Importar pacote EstudaTI**, extrai a pasta `EstudaTI/`, exclui quaisquer credenciais ou backups e cria um commit com o código na raiz do repositório.

> IMPORTANTE: o pacote inclui materiais e um PDF de edital que não devem ser publicados sem revisão. A importação exclui esse PDF do código gerado; o ZIP original permanece no histórico do repositório privado. Não altere a visibilidade para pública sem revisar o histórico e arquivos.

## Próxima etapa: publicação
A plataforma atual usa FastAPI + SQLite com volume Docker e frontend React/Vite. A Vercel pode hospedar o frontend, mas o backend precisa de implantação compatível e banco persistente para salvar respostas, estudos e anotações. Não consideramos o sistema implantado até configurar e testar esses recursos.

## Segurança
Nunca envie `.env`, senhas, tokens, credenciais de API, backups de SQLite ou dados pessoais ao repositório.
