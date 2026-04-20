# Movie Time Deployment Project Report

## 1. Goal and Problem Statement

The goal of the project is to implement a full DevOps practice cycle:
- develop a working web application;
- package it into Docker containers;
- deploy it to the cloud;
- provide a public URL;
- document the architecture and deployment pipeline.

The application chosen is Movie Time: frontend on React/Vite and backend API on Node.js/Express with PostgreSQL.

## 2. Solution Architecture

The system consists of three main services:
1. Frontend (React + Vite + Nginx) - UI, routing, integration with TMDB API.
2. Backend (Express) - API for user data: user synchronization, favorite movies, profile photo.
3. PostgreSQL - storage for user profile and favorite movies list.

Additionally included:
- Prometheus + Grafana for monitoring;
- CI/CD in GitHub Actions;
- Kubernetes manifests with Ingress and HPA.

Data flows:
- The user opens the frontend and completes Firebase authentication.
- Frontend sends Firebase ID token to backend (Bearer token).
- Backend validates the token through Firebase Identity Toolkit API.
- Backend stores/reads user data in PostgreSQL.

## 3. Containerization

Implemented Docker images:
- `Dockerfile` (frontend, multi-stage: build + nginx runtime),
- `backend/Dockerfile` (backend runtime).

For local orchestration, `docker-compose.yml` is used:
- `frontend`,
- `backend`,
- `db` (PostgreSQL),
- `prometheus`,
- `grafana`.

Health checks:
- Application: `http://localhost`
- Backend health: `http://localhost/health`
- Metrics: `http://localhost:9090`
- Grafana: `http://localhost:3001`

## 4. Cloud Deployment

For cloud deployment, `render.yaml` (Blueprint) is prepared:
- web service `movie-time-frontend`,
- web service `movie-time-backend`,
- managed PostgreSQL `movie-time-postgres`.

Render automatically provides public HTTPS URLs, which covers:
- online availability requirement,
- public URL requirement.

## 5. CI/CD

Workflow `.github/workflows/ci-cd.yml` performs:
1. Frontend build.
2. Frontend and backend Docker image builds.
3. Auto-triggered deployment to Render via deploy hook.

This makes it possible to implement continuous integration and continuous delivery.

## 6. Bonus Requirements

The following additional items are implemented:
- Kubernetes deployment (`deploy/k8s/all-in-one.yaml`);
- CI/CD (GitHub Actions);
- separate database container (PostgreSQL in Docker Compose/K8s);
- monitoring (Prometheus + Grafana);
- HTTPS (via Render and TLS Ingress in Kubernetes);
- load balancing (backend/frontend replicas and Kubernetes Service + HPA).

A foundation for a microservices approach is partially prepared:
- frontend, backend, and database are separated into independent services.

Service mesh is not included in the base setup, but can be added via Istio/Linkerd.

## 7. Final Result

The project covers the minimum requirements:
- the application runs in Docker;
- the application can be deployed to the cloud;
- a public URL is provided;
- source code is stored in a Git repository;
- Dockerfile and documentation are prepared.

As a result, a practical DevOps pipeline was built, suitable for defense presentation and further extension.
