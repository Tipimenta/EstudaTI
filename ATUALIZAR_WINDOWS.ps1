# Atualização aditiva preservando .env e volume Docker.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
Write-Host 'EstudaTI 1.2.1 - atualizacao com backup' -ForegroundColor Green
if (-not (Test-Path '.env')) { throw 'Arquivo .env nao localizado. Se for primeira instalacao, use INSTALAR_E_ABRIR_WINDOWS.bat.' }
if (-not (Test-Path 'compose.yaml')) { throw 'Execute este arquivo na pasta que contem compose.yaml.' }
& $env:ComSpec /d /c 'docker info 1>NUL 2>NUL'
if ($LASTEXITCODE -ne 0) { throw 'Abra o Docker Desktop e tente novamente.' }
Write-Host 'Criando backup antes de atualizar...' -ForegroundColor Cyan
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'BACKUP_DADOS_WINDOWS.ps1')
if ($LASTEXITCODE -ne 0) { throw 'O backup falhou. Atualizacao cancelada para proteger seus dados.' }
Write-Host 'Reconstruindo containers sem apagar volumes...' -ForegroundColor Cyan
& $env:ComSpec /d /c 'docker compose up -d --build 2>&1'
if ($LASTEXITCODE -ne 0) { throw 'Falha ao atualizar. Execute docker compose logs --tail=100' }
Write-Host 'Atualizacao concluida! Consulte seu EstudaTI.' -ForegroundColor Green
Start-Process 'http://localhost:8088'
