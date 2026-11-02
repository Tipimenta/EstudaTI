@echo off
chcp 65001 >nul
cd /d "%~dp0"
docker compose ps
echo.
docker compose logs --tail=100
pause
