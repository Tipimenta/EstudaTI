# Estuda 2.0: API no Render (a interface fica na Vercel, que encaminha /api para cá)
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements-estuda.txt .
RUN pip install --no-cache-dir -r requirements-estuda.txt
COPY . .
RUN mkdir -p /data
EXPOSE 8000
CMD ["sh", "-c", "exec gunicorn app:app --preload -w 2 -k gthread --threads 8 --timeout 180 -b 0.0.0.0:${PORT:-8000}"]
