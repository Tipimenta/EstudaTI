# Implantação do EstudaTI — frontend Vercel e API persistente

**Estado:** configuração inicial no GitHub; não declarar o aplicativo funcional na nuvem antes da verificação de persistência.

## 1. Acesso Vercel / GitHub

A conta Vercel da equipe `tipimentas-projects` foi autorizada a partir do ChatGPT, mas a tentativa de vincular o repositório `Tipimenta/EstudaTI` retornou `repo_not_found`. Isso normalmente significa que o **aplicativo Vercel instalado no GitHub** ainda não tem acesso a este repositório privado.

Pelo celular, na conta GitHub `Tipimenta`: **Settings → Applications → Installed GitHub Apps → Vercel → Configure → Repository access → Only select repositories → EstudaTI → Save**.

> A permissão do aplicativo GitHub do ChatGPT é diferente da permissão do aplicativo GitHub da Vercel.

Depois autorizar, importar como `estudati`, equipe `tipimentas-projects`, branch `master`, **Root Directory: `web`**, framework Vite. O arquivo `web/vercel.json` mantém navegação de SPA.

**Atenção:** até haver API e regra de proxy, a interface exibirá erro de API/login. Não anunciar a implantação como concluída por um build visual.

## 2. API FastAPI: Railway com volume persistente (caminho inicial)

Para não converter todos os módulos SQLite de imediato, o caminho de menor alteração é uma instância Docker com um volume persistente. Railway pode oferecer isso conforme o plano e preços vigentes.

- Criar serviço a partir do repositório privado `Tipimenta/EstudaTI`, branch `master`.
- **Root Directory**: `/api`. O Dockerfile usa `PORT` do ambiente e `8000` como padrão.
- **Uma réplica e um worker**. SQLite é um banco para um processo/instância, não escalonar em múltiplos contêineres sem migração.
- Anexar **volume persistente em `/data`** antes da primeira inicialização.
- Configurar as variáveis **no painel da hospedagem**, nunca no GitHub:
  - `DATABASE_PATH=/data/estudati.sqlite3`
  - `APP_PASSWORD`: senha particular com pelo menos 12 caracteres.
  - `APP_SECRET`: segredo longo, aleatório, ao menos 32 caracteres.
  - `COOKIE_SECURE=true` (HTTPS obrigatório).
  - `APP_TIMEZONE=America/Sao_Paulo`
  - `ENABLE_MONITOR=false` até revisar o monitor para execução em nuvem.
  - `OPENAI_API_KEY` opcional; não colocar se não quiser usar IA paga.
- Criar um domínio HTTPS Railway para a API e testar `POST /api/login` com acesso privado e limite de tentativas.
- Proteger o banco com rotina de backup e **restauração testada**. Volume não substitui backup.
- O banco local do Docker **não é automaticamente transferido** para a nuvem; eventual migração precisará de backup SQLite e importação controlada.

## 3. Unificar no mesmo domínio público com proxy da Vercel

O cliente React chama `/api/...` com cookies de sessão. Para evitar bloqueios de cookies entre domínios e CORS, configurar uma regra externa de proxy **antes** do fallback SPA em `web/vercel.json` depois de obter URL confirmada do backend:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {"source": "/api/:path*", "destination": "https://DOMINIO-CONFIRMADO-DO-BACKEND/api/:path*"},
    {"source": "/(.*)", "destination": "/index.html"}
  ]
}
```

Substituir o destino **somente depois** da API existir e estar testada. Não deixar a placeholder no arquivo de produção.

## 4. Critérios obrigatórios antes de anunciar o site concluído

1. Build React na Vercel `READY` e acesso HTTPS pelo Android.
2. `GET /api/me` retorna 401 antes do login; `POST /api/login` funciona e estabelece cookie seguro.
3. Usuário inicia sessão, salva aula concluída, uma resposta dissertativa, um simulado, um cronômetro e uma anotação.
4. Reload, logout/login e redeploy **não apagam dados**.
5. Um backup automático do volume foi conferido e uma restauração validada.
6. Senhas e chaves não aparecem no código-fonte nem no frontend ou logs.
7. Conferir as regras de custos do plano Railway / Vercel antes de provisionar recursos pagos.
8. Não alterar outros repositórios ou projetos da conta.

## 5. Evolução posterior (não bloqueante)

Migrar SQLite para PostgreSQL quando houver necessidade real de múltiplos usuários/instâncias. Planejar migração transacional, rollback e testes de idempotência, sem apagar dados. `APP_SECRET` deve ser preservada ao atualizar para não invalidar sessões existentes.

## Referências
- https://vercel.com/kb/guide/unable-to-find-github-repository
- https://vercel.com/docs/monorepos
- https://docs.railway.com/deployments/monorepo
- https://docs.railway.com/builds/dockerfiles
