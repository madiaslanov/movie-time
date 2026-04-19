# Отчет по проекту развертывания Movie Time

## 1. Цель и постановка задачи

Цель проекта — реализовать полный цикл DevOps-практики:
- разработать рабочее веб-приложение;
- упаковать его в Docker-контейнеры;
- развернуть в облаке;
- обеспечить публичный URL;
- документировать архитектуру и пайплайн развертывания.

В качестве приложения выбран Movie Time: frontend на React/Vite и backend API на Node.js/Express с PostgreSQL.

## 2. Архитектура решения

Система состоит из трех основных сервисов:
1. Frontend (React + Vite + Nginx) — UI, маршрутизация, интеграция с TMDB API.
2. Backend (Express) — API для пользовательских данных: синхронизация пользователя, избранные фильмы, фото профиля.
3. PostgreSQL — хранение профиля пользователя и списка избранных фильмов.

Дополнительно включены:
- Prometheus + Grafana для мониторинга;
- CI/CD в GitHub Actions;
- Kubernetes-манифесты с Ingress и HPA.

Потоки данных:
- Пользователь открывает frontend и проходит Firebase аутентификацию.
- Frontend отправляет Firebase ID token в backend (Bearer token).
- Backend валидирует токен через Firebase Identity Toolkit API.
- Backend сохраняет/читает пользовательские данные в PostgreSQL.

## 3. Контейнеризация

Реализованы Docker-образы:
- `Dockerfile` (frontend, multi-stage: build + nginx runtime),
- `backend/Dockerfile` (backend runtime).

Для локальной оркестрации используется `docker-compose.yml`:
- `frontend`,
- `backend`,
- `db` (PostgreSQL),
- `prometheus`,
- `grafana`.

Проверка работоспособности:
- Приложение: `http://localhost`
- Health backend: `http://localhost/health`
- Метрики: `http://localhost:9090`
- Grafana: `http://localhost:3001`

## 4. Облачное развертывание

Для облака подготовлен `render.yaml` (Blueprint):
- web service `movie-time-frontend`,
- web service `movie-time-backend`,
- managed PostgreSQL `movie-time-postgres`.

Render автоматически предоставляет публичные HTTPS URL, что покрывает:
- требование доступности онлайн,
- требование публичного URL.

## 5. CI/CD

Workflow `.github/workflows/ci-cd.yml` выполняет:
1. Сборку frontend.
2. Сборку Docker-образов frontend и backend.
3. Авто-триггер деплоя в Render через deploy hook.

Это позволяет реализовать непрерывную интеграцию и непрерывную доставку.

## 6. Бонусные требования

Реализованы следующие дополнительные пункты:
- Kubernetes deployment (`deploy/k8s/all-in-one.yaml`);
- CI/CD (GitHub Actions);
- отдельный контейнер базы данных (PostgreSQL в Docker Compose/K8s);
- мониторинг (Prometheus + Grafana);
- HTTPS (через Render и TLS Ingress в Kubernetes);
- load balancing (реплики backend/frontend и Kubernetes Service + HPA).

Частично подготовлена база для микросервисного подхода:
- frontend, backend и БД разделены на независимые сервисы.

Service mesh не включен в базовый контур, но может быть добавлен через Istio/Linkerd.

## 7. Итог

Проект покрывает минимальные требования:
- приложение запускается в Docker;
- приложение может быть развернуто в облаке;
- предусмотрен публичный URL;
- исходный код хранится в Git-репозитории;
- Dockerfile и документация подготовлены.

В результате получен практический DevOps-пайплайн, пригодный для демонстрации на защите и дальнейшего расширения.
