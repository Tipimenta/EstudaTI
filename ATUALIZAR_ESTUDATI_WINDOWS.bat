@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ATUALIZAR_WINDOWS.ps1"
if errorlevel 1 echo ATUALIZACAO RETORNOU ERRO. Veja a mensagem acima.
pause
