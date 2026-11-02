@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo     EstudaTI - Instalacao com Docker
echo ============================================
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALAR_WINDOWS.ps1"
if errorlevel 1 (
  echo.
  echo A instalacao retornou erro. Veja a mensagem acima.
  pause
)
