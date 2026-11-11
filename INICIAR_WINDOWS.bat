@echo off
chcp 65001 >nul
cd /d "%~dp0backend"
where python >nul 2>nul || (echo Instale o Python 3.11+ em python.org e marque "Add to PATH". & pause & exit /b 1)
if not exist .venv (
  echo Preparando o ambiente pela primeira vez...
  python -m venv .venv || (pause & exit /b 1)
  call .venv\Scripts\activate.bat
  pip install -r requirements.txt || (pause & exit /b 1)
) else (
  call .venv\Scripts\activate.bat
)
if exist ..\.env for /f "usebackq eol=# tokens=1,* delims==" %%a in ("..\.env") do if not "%%b"=="" set "%%a=%%b"
echo.
echo Estuda rodando em http://localhost:8000  (feche esta janela para parar)
start "" http://localhost:8000
python app.py
pause
