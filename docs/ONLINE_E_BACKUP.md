# Acesso no celular, publicação online e backup

## Opção A (primeiro uso): no seu computador

1. Instale Docker Desktop no Windows 10/11 (ou Docker Engine + Compose no Linux).
2. Extraia o ZIP; copie `.env.example` para `.env`.
3. Escolha `APP_PASSWORD` forte e gere `APP_SECRET` com `python -c "import secrets; print(secrets.token_hex(32))"`.
4. `docker compose up -d --build`
5. No mesmo PC: http://localhost:8088
6. Confirme o navegador e a tela de login, passe pelas trilhas e faça o simulado de teste.
7. Para logs: `docker compose logs -f --tail=100`. Para parar: `docker compose down` (sem `-v`).

O projeto, por padrão, escuta apenas em 127.0.0.1 para não expor a porta na rede. `HOST_PORT` pode ser alterado em `.env`.

## Opção B: acesso remoto privado (recomendado para uso pessoal)

Instale uma VPN privada como **Tailscale** no computador servidor e no celular. Habilite acesso seguro à aplicação através de *Tailscale Serve* ou de um proxy reverso acessível apenas pela VPN. Consulte a documentação oficial para a sintaxe atual: https://tailscale.com/kb/1312/serve . Não exponha a porta 8088 diretamente na internet; configure autorização e acesso restrito.

## Opção C: sua VPS + domínio público

Use uma VPS Linux, Docker, DNS apontando domínio para a VPS, e proxy HTTPS (Caddy/Nginx/Traefik). Exemplo de arquitetura:

`navegador HTTPS → proxy reverso (443) → serviço web:80 → API:8000 → SQLite em volume privado`

- Defina `COOKIE_SECURE=true` no `.env` antes de autenticar usando HTTPS.
- **Não** encaminhe diretamente as portas 8088/8000 na borda pública. Use rede interna Docker e proxy.
- Proteja acesso externo adicionalmente com VPN, autenticação de proxy/MFA ou identidade corporativa, pois o sistema hoje usa **senha pessoal única** (não é plataforma multiusuário endurecida).
- Ative backups criptografados off-site, atualizações, firewall, monitoramento e limite de acesso de rede.
- Não publique `.env`, backups ou o banco SQLite no GitHub.

## Backup confiável do banco SQLite

Faça com serviço em execução:

```bash
mkdir backups
# Faz um snapshot consistente pelo próprio SQLite, de dentro do contêiner:
docker compose exec -T api python -c "import sqlite3; s=sqlite3.connect('/data/estudati.sqlite3'); d=sqlite3.connect('/data/backup.sqlite3'); s.backup(d); d.close(); s.close()"
docker compose cp api:/data/backup.sqlite3 ./backups/estudati-backup.sqlite3
```

Além disso, entre em **Configurações → Exportar dados JSON** para ter uma cópia legível. Atenção: a versão atual **não restaura JSON pela interface**; a recuperação operacional é via snapshot SQLite.

Para restaurar, faça backup da cópia atual, interrompa o serviço e substitua o arquivo do banco no volume `estudati_data` por sua cópia, então reinicie. Faça esse procedimento em um ambiente de teste primeiro.

## Atualizar da 0.1/0.2 para a 0.3 sem perder histórico

1. Faça backup do volume original e exporte JSON no 0.1.
2. Guarde uma cópia da pasta do projeto antigo.
3. Substitua os arquivos de aplicação pelos da 0.3 **preservando o mesmo nome de projeto Compose e o mesmo volume**.
4. `docker compose up -d --build`.
5. O serviço aplica migração **aditiva** à tabela `questions` ao iniciar.
6. Confirme o número de cartões, sessões e simulados antes de usar.

**Atenção ao nome da pasta**: por padrão, Docker Compose usa o nome da pasta para nomear o projeto e o volume. Se você extrair a versão nova em outra pasta, o volume parecerá vazio. Para preservar o anterior, use o mesmo diretório ou informe `-p <nome-do-projeto-original>` em todos os comandos Compose. Não execute `docker compose down -v`.


## Ferramenta adicional de verificação/restauração

`tools/backup_restore.py` trabalha com arquivos SQLite já copiados para o host. `inspect` verifica a integridade e a presença das tabelas essenciais; `restore` exige `--confirm` e **não sobrescreve** um banco existente. Execute restauração somente com aplicação parada.
