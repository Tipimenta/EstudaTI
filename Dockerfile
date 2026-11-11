# Etapa 1: compila a interface
FROM node:22-alpine AS web
WORKDIR /web
COPY frontend/package.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# Etapa 2: servidor Python servindo API + interface
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8000
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./
COPY --from=web /web/dist /app/frontend/dist
RUN mkdir -p /app/backend/data && useradd -m estuda && chown -R estuda /app
USER estuda
EXPOSE 8000
CMD gunicorn app:app --preload -w 2 -k gthread --threads 8 --timeout 180 -b 0.0.0.0:${PORT}
