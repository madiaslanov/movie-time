# Movie Time DevOps Project

Movie Time — full-stack учебный проект для практики DevOps:
- frontend: React + Vite;
- backend: Express + PostgreSQL;
- контейнеризация: Docker + Docker Compose;
- облако: Render blueprint (`render.yaml`);
- бонусы: Kubernetes, CI/CD, monitoring, HTTPS.

## Что реализовано

- Dockerfile для frontend (`Dockerfile`) и backend (`backend/Dockerfile`).
- Отдельный контейнер базы данных PostgreSQL (`docker-compose.yml`).
- Публичное развертывание через Render (`render.yaml`).
- CI/CD в GitHub Actions (`.github/workflows/ci-cd.yml`).
- Kubernetes-манифесты (`deploy/k8s/all-in-one.yaml`).
- Мониторинг Prometheus + Grafana (`deploy/monitoring/prometheus.yml`).

## Локальный запуск (Docker)

1. Скопируй переменные окружения:
   - `cp .env.example .env`
2. Заполни:
   - `VITE_TOKEN` (TMDB bearer token),
   - `FIREBASE_WEB_API_KEY` (из Firebase проекта).
3. Запусти:
   - `docker compose up --build`
4. Проверь:
   - App: `http://localhost`
   - Backend health: `http://localhost/health`
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3001`

## Облачный деплой (Render)

1. Создай GitHub-репозиторий и запушь код.
2. В Render выбери **Blueprint** и укажи `render.yaml`.
3. Добавь environment variables:
   - `VITE_TOKEN`,
   - `FIREBASE_WEB_API_KEY`.
4. Получи публичные URL для frontend и backend.
5. Для автоматического деплоя создай Deploy Hook и добавь его как секрет `RENDER_DEPLOY_HOOK_URL` в GitHub.

## CI/CD

Workflow `.github/workflows/ci-cd.yml`:
- на PR/Push запускает build frontend;
- собирает Docker-образы frontend/backend;
- на main/master триггерит deploy hook Render.

## Kubernetes

Манифест `deploy/k8s/all-in-one.yaml` содержит:
- Namespace,
- Deployments/Services для frontend/backend/postgres,
- HPA для backend,
- Ingress с TLS (HTTPS).

Применение:
- `kubectl apply -f deploy/k8s/all-in-one.yaml`

## Отчет

Готовый отчет для сдачи: `REPORT.md` (2-4 страницы в markdown формате).
