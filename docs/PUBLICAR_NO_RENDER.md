# Publicar o Estuda 2.0 sem mudar a configuração da Vercel nem do Render

Esta versão usa as mesmas pastas do EstudaTI:

- `web/` tem a interface. A **Vercel** já compila essa pasta e encaminha `/api` para o Render.
- `api/` tem o servidor. O **Render** (`estudati-api`) já usa o `api/Dockerfile`.

Assim, o fluxo continua o mesmo de antes: enviar o ZIP para `pacotes/` e esperar a Action ficar verde.

## 1. Enviar o ZIP

1. Abra https://github.com/Tipimenta/EstudaTI/tree/master/pacotes
2. **Add file → Upload files**, envie `EstudaTI_V2.0_PRONTO_PARA_GITHUB.zip` sem extrair e confirme na `master`. Como o nome é igual ao do envio anterior, ele substitui o arquivo antigo.
3. Espere **Importar pacote EstudaTI** ficar verde em https://github.com/Tipimenta/EstudaTI/actions

A Vercel publica a interface nova sozinha depois desse commit, como já fazia.

## 2. Variáveis no Render (uma vez só)

No serviço `estudati-api`, em **Environment**, confira:

- `DATABASE_URL`: a string do Neon (começa com `postgresql://`). Pode ser o mesmo banco de antes: o Estuda 2.0 cria as tabelas dele num esquema separado chamado `estuda` e não mexe nas tabelas antigas.
- `APP_SECRET`: 32 ou mais caracteres aleatórios. Se já existir, mantenha.
- `ADMIN_EMAIL`: o seu e-mail. Só ele vira administrador ao criar a conta.
- `ALLOW_SIGNUP`: `1` para outras pessoas poderem criar conta, `0` para só você.
- IA gratuita (opcional): `AI_PROVIDER=gemini` e `AI_API_KEY` com a chave do Google AI Studio (https://aistudio.google.com). No plano gratuito o Google pode usar os dados enviados para melhorar os produtos dele.

As variáveis antigas (`APP_PASSWORD`, `COOKIE_SECURE`, `ENABLE_MONITOR`, `APP_TIMEZONE`, `DATABASE_PATH`) não atrapalham; pode apagar se quiser.

Depois clique em **Manual Deploy → Deploy latest commit** (o deploy automático estava desligado). Se preferir, ligue o **Auto-Deploy** em Settings para não precisar fazer isso nas próximas atualizações.

## 3. Testar

1. Abra https://estudati-api.onrender.com/api/health: deve mostrar `{"ok": true}`. Se o serviço estava dormindo, leva cerca de um minuto.
2. Abra o endereço da Vercel. A tela nova se chama **Estuda**, é azul e tem o menu Hoje, Trilha, Questões, Simulados e Desempenho.
3. Crie a conta com o e-mail de `ADMIN_EMAIL`, escolha um concurso e use um pouco.
4. Faça outro Manual Deploy no Render e confirme que o progresso continua salvo.

Se a Vercel ainda mostrar a tela antiga, recarregue com Ctrl+F5 ou abra numa aba anônima.

## Tarefas longas

Gerar conteúdo em lote e importar provas ou editais com IA pode levar mais de um minuto por pedido. Se der erro de tempo pela Vercel, faça essas tarefas pelo endereço direto do Render, que também responde à API.

## Limpeza opcional do repositório

Do envio anterior ficaram na raiz as pastas `backend/` e `frontend/` e uma cópia do ZIP fora da pasta `pacotes`. Eles não são mais usados e podem ser apagados pelo GitHub (abra a pasta, menu "…", **Delete directory**). Apagar arquivos fora de `pacotes/` não dispara a importação.

Os arquivos antigos do EstudaTI (`api/main.py`, `web/src/StudyCourse.tsx` etc.) ficam no repositório sem uso. Não apague as pastas `api/` e `web/`: elas agora contêm a versão nova.

## Se algo der errado

- **Action vermelha:** abra a execução, toque na etapa com X e mande o texto do erro.
- **Deploy falhou no Render:** abra **Logs** e copie as últimas linhas, sem senhas.
- **Erro ao entrar ou "Algo deu errado no servidor":** confira a `DATABASE_URL` inteira, com `?sslmode=require` no fim.
- **Todo mundo sai da conta depois de um deploy:** falta `APP_SECRET`.
