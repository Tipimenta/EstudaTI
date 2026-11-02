# EstudaTI V0.3.2: instalacao guiada para Windows 10/11 com Docker Desktop.
# Corrige avisos Docker que o PowerShell 5.1 tratava como erros fatais.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
Write-Host "`nEstudaTI V1.0 - Instalador Local" -ForegroundColor Green
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
 Write-Host 'Docker nao encontrado. Instale o Docker Desktop e execute novamente.' -ForegroundColor Red
 exit 1
}
# No PowerShell 5.1, alguns avisos em stderr de comandos nativos
# sao convertidos em NativeCommandError quando ErrorActionPreference='Stop'.
# O cmd.exe redireciona o aviso sem interferir no codigo de saida real.
& $env:ComSpec /d /c 'docker info 1>NUL 2>NUL'
$dockerExitCode = $LASTEXITCODE
if ($dockerExitCode -ne 0) {
 Write-Host 'Abra o Docker Desktop e aguarde ficar pronto; execute novamente.' -ForegroundColor Yellow
 exit 1
}
if (-not (Test-Path '.env')) {
 Write-Host 'Primeira inicializacao: escolha senha com minimo de 12 caracteres.'
 $pass = Read-Host 'Senha (letras, numeros e @!_+-=, sem espacos)'
 if ($pass.Length -lt 12 -or $pass -cnotmatch '^[a-zA-Z0-9@!_+\-=]+$') {
   Write-Host 'Senha invalida. Exija 12+ caracteres sem espacos e sem $. Nao foi criado .env' -ForegroundColor Red
   exit 1
 }
 $bytes = New-Object byte[] 32
 $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
 $rng.GetBytes($bytes)
 $rng.Dispose()
 $secret = -join ($bytes | ForEach-Object { $_.ToString('x2') })
 $content = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot '.env.example'))
 $content = [regex]::Replace($content,'(?m)^APP_PASSWORD=.*$', ('APP_PASSWORD=' + $pass))
 $content = [regex]::Replace($content,'(?m)^APP_SECRET=.*$', ('APP_SECRET=' + $secret))
 [System.IO.File]::WriteAllText((Join-Path $PSScriptRoot '.env'),$content,(New-Object System.Text.UTF8Encoding($false)))
 Write-Host '.env criado. Nao envie sua senha para ninguem.' -ForegroundColor Green
} else {
 Write-Host '.env existente: sera preservado.' -ForegroundColor Yellow
}
Write-Host 'Compilando/iniciando containers...' -ForegroundColor Cyan
# Mesma protecao contra avisos normais de Docker/BuildKit durante a compilacao.
# '2>&1' aqui e interpretado pelo cmd.exe, nao pelo PowerShell.
& $env:ComSpec /d /c 'docker compose up -d --build 2>&1'
$composeExitCode = $LASTEXITCODE
if ($composeExitCode -ne 0) {
 Write-Host 'Falha no Docker. Execute docker compose logs --tail=100' -ForegroundColor Red
 exit 1
}
Write-Host 'Acesse http://localhost:8088' -ForegroundColor Green
Start-Process 'http://localhost:8088'
