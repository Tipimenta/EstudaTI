# EstudaTI v0.3.2 — correcao de instalacao Docker no Windows

**Erro corrigido:** `NativeCommandError` na linha `docker info *> $null` ao receber o aviso `daemon is not using the default seccomp profile`.

O aviso nao comprova que o Docker falhou. O script anterior interpretava mensagens em stderr como erro terminante do PowerShell 5.1. Esta atualizacao faz a checagem pelo codigo de saida. O aviso sobre o perfil seccomp merece revisao na configuracao do Docker caso tenha sido alterada deliberadamente, mas nao deve, isoladamente, bloquear a instalacao.

## Instalacao (primeira vez)

1. Abra o Docker Desktop e confira se o mecanismo esta ativo.
2. Extraia este ZIP em uma pasta nova, ou substitua somente `INSTALAR_WINDOWS.ps1` na pasta ja existente. **Nao substitua nem apague seu arquivo `.env` ou o volume de dados Docker.**
3. Execute `INSTALAR_E_ABRIR_WINDOWS.bat`.
4. Abra http://localhost:8088.

### Se a instalacao retornar outro erro

Abra PowerShell na pasta que contem `compose.yaml` e execute:

```powershell
docker info
docker compose ps
docker compose up -d --build
docker compose logs --tail=100
```

Nao utilize `docker compose down -v`, pois isso remove volumes de dados.

Este pacote nao altera o CiberInsight nem o CMO.
