# Publicar o Estuda 2.0 na infraestrutura que já existe

Este guia usa os serviços que o EstudaTI já tinha, todos no plano gratuito, sem cartão e sem upgrade:

- **GitHub** `Tipimenta/EstudaTI`, com a automação que importa ZIPs enviados para `pacotes/`;
- **Render** com o serviço `estudati-api` (https://estudati-api.onrender.com);
- **Neon** com o banco PostgreSQL;
- **Vercel** com a interface antiga.

No Estuda 2.0 o servidor do Render entrega a interface **e** a API juntas. A Vercel passa a ser opcional.

## 1. Enviar o código para o GitHub

1. Abra https://github.com/Tipimenta/EstudaTI/tree/master/pacotes (no celular, ative "Site para computador").
2. **Add file → Upload files**, envie `EstudaTI_V2.0_PRONTO_PARA_GITHUB.zip` sem extrair e confirme na branch `master`.
3. Acompanhe em https://github.com/Tipimenta/EstudaTI/actions a execução **Importar pacote EstudaTI** até ficar verde.

Os arquivos novos entram na raiz do repositório (`backend/`, `frontend/`, `Dockerfile`...). As pastas antigas (`api/`, `web/`, `materials/`, `tests/`) continuam lá e não atrapalham. Não apague `api/` e `web/` ainda: a automação de importação atual depende delas. Quando quiser fazer a limpeza, primeiro troque a automação pela versão nova em `docs/github/importar-estudati.yml` (instruções no topo do arquivo).

## 2. Criar um banco novo no Neon

Use um banco **separado**: o Estuda 2.0 tem tabelas diferentes das do EstudaTI, e assim nada antigo é tocado.

- Opção recomendada: crie um **novo projeto** no Neon na região **AWS US East 1 (N. Virginia)**, a mesma região do Render. Isso deixa cada página bem mais rápida, porque hoje o banco está em São Paulo e o servidor nos EUA.
- Se o plano gratuito não deixar criar outro projeto, crie um **novo banco** chamado `estuda` no projeto atual (Databases → New database).

Depois clique em **Connect** e copie a *connection string* (começa com `postgresql://`). Não cole essa string no chat nem no GitHub.

## 3. Ajustar o serviço no Render

No painel do serviço `estudati-api`:

**Settings → Build & Deploy**
- Root Directory: deixe **vazio** (raiz do repositório).
- Dockerfile Path: `./Dockerfile`
- Docker Build Context Directory: `.`
- Health Check Path: `/api/health`

**Environment** (variáveis)
- `DATABASE_URL`: a string do banco novo do Neon.
- `APP_SECRET`: mantenha a que já existe se tiver 32+ caracteres. Se não tiver, gere uma nova.
- `ADMIN_EMAIL`: o seu e-mail. Só ele vira administrador ao criar a conta, então ninguém consegue "pegar" o site antes de você.
- `ALLOW_SIGNUP`: `1` para outras pessoas poderem criar conta, `0` para só você.
- IA gratuita (opcional): `AI_PROVIDER=gemini` e `AI_API_KEY` com uma chave criada em https://aistudio.google.com (camada gratuita, sem cartão, com limites diários). No plano gratuito o Google pode usar os dados enviados para melhorar os produtos dele; não envie dados pessoais nas perguntas.
- Pode apagar `APP_PASSWORD`, `COOKIE_SECURE`, `ENABLE_MONITOR` e `DATABASE_PATH`: o Estuda 2.0 não usa.

Depois clique em **Manual Deploy → Deploy latest commit** (o deploy automático está desligado). O primeiro deploy leva alguns minutos porque compila a interface; o primeiro início carrega todo o conteúdo no banco.

## 4. Testar

1. Abra https://estudati-api.onrender.com/api/health: deve aparecer `{"ok": true}`.
2. Abra https://estudati-api.onrender.com e crie a conta com o e-mail de `ADMIN_EMAIL`.
3. Escolha um concurso, conclua uma aula, responda questões, faça um simulado curto.
4. No Render, faça outro **Manual Deploy** e confirme que o progresso continua lá. Só considere publicado depois disso.

No plano gratuito o serviço dorme após 15 minutos sem uso e leva cerca de um minuto para acordar no primeiro acesso.

## 5. Vercel (opcional)

Se quiser manter o endereço da Vercel, em **Settings → Build and Deployment** troque **Root Directory** de `web` para `frontend` (framework Vite) e faça um **Redeploy**. O arquivo `frontend/vercel.json` já encaminha `/api` para o Render.

Para tarefas longas de administração (gerar conteúdo em lote, importar provas e editais), prefira o endereço do Render: pedidos que passam pela Vercel podem ser cortados se demorarem demais.

## Se algo der errado

- **Deploy falhou no Render:** abra **Logs** e copie as últimas linhas (sem segredos) para analisarmos.
- **"Algo deu errado no servidor":** geralmente é a `DATABASE_URL`. Confira se foi copiada inteira, com `?sslmode=require` no fim.
- **Todo mundo sai da conta depois de um deploy:** falta `APP_SECRET`.
