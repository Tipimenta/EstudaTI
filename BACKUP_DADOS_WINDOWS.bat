@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0BACKUP_DADOS_WINDOWS.ps1"
if errorlevel 1 echo ERRO no backup. Verifique a mensagem acima.
pause
