# Estuda 2.2: API no Render (a interface fica na Vercel, que encaminha /api para cá)
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements-estuda.txt .
RUN pip install --no-cache-dir -r requirements-estuda.txt
COPY . .
# Detecta erros de sintaxe e falhas nos guias antes do serviço entrar em produção.
# Não conecta ao Neon nem altera dados durante o build.
RUN python -m compileall -q . && python -c "from conteudo.aprofundamentos import SUPPLEMENTS; assert len(SUPPLEMENTS) == 169"
# Testes usam banco temporário local; DATABASE_URL do Neon fica explicitamente ausente.
# Se um teste falhar, a construção do contêiner é interrompida antes do deploy.
RUN env -u DATABASE_URL python -m pytest -q testes_estuda
RUN mkdir -p /data
EXPOSE 8000
CMD ["sh", "-c", "exec gunicorn app:app --preload -w 2 -k gthread --threads 8 --timeout 180 -b 0.0.0.0:${PORT:-8000}"]
