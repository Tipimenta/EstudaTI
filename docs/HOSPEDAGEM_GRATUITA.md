# EstudaTI — implantação com custo R$ 0 (02/11/2026)

**Regra:** não contratar serviços pagos, não ativar cobrança automática, não adicionar cartão e não atualizar planos por conta própria.

## Arquitetura escolhida para uso pessoal

| Componente | Hospedagem | Plano |
|---|---|---|
| React/Vite/Tailwind | Vercel | Hobby — gratuito (já publicado) |
| API FastAPI em Python | Render | Free Web Service — gratuito; adormece após 15 min de inatividade |
| Banco de dados | Neon | Free PostgreSQL — gratuito, sujeito a cotas |
| Repositório/CI | GitHub | Repositório privado + Actions disponíveis no plano |
| Tutor e discursivas | Regras locais e futuro provedor com camada gratuita | Sem uso obrigatório de API paga |

Fontes oficiais de limites: https://vercel.com/docs/plans/hobby, https://render.com/docs/free, https://neon.com/pricing.

## Por que não usar SQLite dentro do Render Free?

O sistema atual salva dados em SQLite, em `DATABASE_PATH=/data/estudati.sqlite3`. No Render Free o disco local é **efêmero**, e arquivos SQLite podem desaparecer ao reiniciar ou após um deploy. O Render Free **não** permite volume persistente. A solução requer **migrar a camada de dados** para um PostgreSQL remoto e persistente (Neon Free). Não se deve publicar o backend atual com SQLite como se fosse persistente.

O banco existente no computador **não se transfere automaticamente**. Manter intacta a instalação Docker e o volume `estudati_data` até fazer backup SQLite e migração testada.

## Etapas

1. Conectar Render e Neon ao ChatGPT (sem inserir senhas nem tokens no chat).
2. Refatorar backend em branch de desenvolvimento: adaptador de dados PostgreSQL, migrações e parâmetros `DATABASE_URL` sem mudar o modo SQLite/Docker existente.
3. Criar testes de regressão (login, questões, discursivas, aulas, flashcards, progresso, idempotência de seed) em ambos os bancos.
4. Criar Neon Free com banco separado `estudati`; limitar acessos e habilitar backup/export regular.
5. Criar Render Free Web Service no repo `Tipimenta/EstudaTI`, diretório raiz `api`, Dockerfile, configurar `DATABASE_URL` via variáveis privadas.
6. Validar API via HTTPS, respeitar latência de despertar do Render e adicionar proteção anti-brute-force ao login.
7. Configurar proxy de `/api/*` na Vercel para origem HTTPS confirmada do Render, preservando cookie de sessão.
8. Fazer testes reais a partir do Android e confirmar persistência após redeploy/restart.
9. Configurar rotina de exportação/backup do banco (Neon Free tem retenção limitada; backup adicional é importante).

## Limitações reais do custo zero

- **Render Free:** pode hibernar após 15 min; leva cerca de 1 minuto para reiniciar. Sem disco persistente; 750 horas gratuitas/mês por workspace, cotas de banda/build.
- **Neon Free:** espaço e horas de CPU limitados; ultrapassar limites pode provocar indisponibilidade/necessidade de upgrade. Nunca escolher upgrade automaticamente.
- **Vercel Hobby:** apenas para uso pessoal não comercial. Limites de uso e recursos.
- **IA:** OpenAI API não está incluída no plano ChatGPT; não configurar `OPENAI_API_KEY` para evitar cobrança. Caso futuramente se utilize uma API com camada grátis (ex.: modelos gratuitos do Gemini), indicar limites, tratamento dos dados e travar desabilitação ao alcançar cota.

## Condição de segurança e qualidade

Não abrir o login na internet sem HTTPS, segredo robusto, limitação de tentativas, cookies Secure/HttpOnly/SameSite e testes. Não anunciar a plataforma como pronta até validar salvamento real de respostas/discursivas após redeploy.

**Estado em 02/11/2026:** Vercel publicada, Neon Free criado e conexão PostgreSQL testada, Render **Free** criado com nome `estudati-api`. O contêiner está `live`, mas a API **ainda não está integrada ao Neon** até que as variáveis privadas sejam configuradas. Railway/volumes pagos **não serão usados**.

### Render Free — serviço confirmado

- Painel privado: https://dashboard.render.com/web/srv-dbk807dg1s2s739ivq70
- Endereço da API: https://estudati-api.onrender.com
- Plano: `free`; região: Virginia; Git: `Tipimenta/EstudaTI`, branch `master`; Dockerfile `api/Dockerfile`; contexto `api`.
- AutoDeploy: `no` temporariamente para evitar implantações com banco sem configuração.
- Variáveis não sensíveis já definidas: `COOKIE_SECURE=true`, `ENABLE_MONITOR=false`, `APP_TIMEZONE=America/Sao_Paulo`, `DATABASE_PATH=/data/estudati.sqlite3`.
- Variáveis privadas necessárias em Render → Environment: `DATABASE_URL` (copiar no painel Neon → Connect, com SSL e usuário correto), `APP_PASSWORD` (senha pessoal de 12+ caracteres) e `APP_SECRET` (segredo aleatório de 32+ caracteres). **Não colar nenhum segredo no GitHub, no chat ou no frontend.**
- Depois de configurar, deixar a implantação terminar e comprovar `/api/me` retorna 401 sem autenticação; testar login, aulas e progresso no PostgreSQL real antes de ligar o proxy Vercel.
- **O backend rodando não significa login funcional.** Sem `APP_PASSWORD` e `APP_SECRET` a própria aplicação bloqueia o login com erro 503, intencionalmente.

### Neon confirmado

- Project ID: `dark-fog-38647170`.
- Branch: `production` (`br-orange-star-b67atro8`).
- Banco padrão: `neondb`; região `sa-east-1`; plano `free_v3`.
- Em 02/11, PostgreSQL 18 e conexão autenticada foram confirmados; **as tabelas do EstudaTI não foram deliberadamente criadas no banco real**, apenas no PostgreSQL isolado dos testes CI.

### Conexão da Vercel

Depois que Render+Neon estiverem funcionais, configurar `web/vercel.json` com regra de proxy `/api/:path*` **antes** da regra SPA: destino `https://estudati-api.onrender.com/api/:path*`. Esta configuração não foi aplicada para evitar expor um site com autenticação inoperante.

## Futuros upgrades

O usuário deseja manter o projeto **inteiramente gratuito**. Qualquer sugestão de serviço pago depende de pedido e autorização explícitos. Sem upgrade automático.
