@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist .env (
  echo Configuracao nao encontrada.
  echo Execute primeiro INSTALAR_E_ABRIR_WINDOWS.bat
  pause
  exit /b 1
)
docker compose up -d
if errorlevel 1 (
  echo Falha ao iniciar. Abra o Docker Desktop e tente novamente.
  pause
  exit /b 1
)
start "" "http://localhost:8088"
echo EstudaTI iniciado. Se alterou HOST_PORT, abra a porta configurada no .env.
