# Backup seguro do SQLite do EstudaTI pelo contêiner atual.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Test-Path '.env')) { throw 'Arquivo .env nao encontrado: execute na pasta do sistema instalado.' }
$container = (& docker compose ps -q api)
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($container)) { throw 'O contêiner api precisa estar rodando para o backup.' }
$container = $container.Trim()
$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$filename = 'estudati_' + $stamp + '.sqlite3'
$backupDir = Join-Path $PSScriptRoot 'backups'
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
$pythonScript = "import sqlite3; src=sqlite3.connect('/data/estudati.sqlite3'); dst=sqlite3.connect('/data/$filename'); src.backup(dst); dst.close(); src.close()"
& docker compose exec -T api python -c $pythonScript
if ($LASTEXITCODE -ne 0) { throw 'Falhou a criação do backup via sqlite3.' }
& docker cp "${container}:/data/$filename" (Join-Path $backupDir $filename)
if ($LASTEXITCODE -ne 0) { throw 'Falhou ao copiar backup para o Windows.' }
$destination = Join-Path $backupDir $filename
if (-not (Test-Path $destination) -or (Get-Item $destination).Length -lt 1024) { throw 'Backup nao encontrado ou pequeno demais.' }
Write-Host "Backup salvo: $destination" -ForegroundColor Green
