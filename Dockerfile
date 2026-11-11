# Tudo num contêiner só (uso local ou outra hospedagem): interface + API
FROM node:22-alpine AS web
WORKDIR /web
COPY web/package.json web/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY web/ ./
RUN npm run build

FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8000
WORKDIR /app/api
COPY api/requirements-estuda.txt ./
RUN pip install --no-cache-dir -r requirements-estuda.txt
COPY api/ ./
COPY --from=web /web/dist /app/web/dist
RUN mkdir -p /app/api/data
EXPOSE 8000
CMD gunicorn app:app --preload -w 2 -k gthread --threads 8 --timeout 180 -b 0.0.0.0:${PORT}
