# Movie Time DevOps Project

Movie Time is a full-stack educational project for practicing DevOps:
- frontend: React + Vite;
- backend: Express + PostgreSQL;
- containerization: Docker + Docker Compose;
- cloud: Vercel (frontend) + Render/Railway (backend);
- bonuses: Kubernetes, CI/CD, monitoring, HTTPS.

## What Is Implemented

- Dockerfile for frontend (`Dockerfile`) and backend (`backend/Dockerfile`).
- Separate PostgreSQL database container (`docker-compose.yml`).
- Public deployment via Vercel (frontend) and Render/Railway (backend).
- CI/CD in GitHub Actions (`.github/workflows/ci-cd.yml`).
- Kubernetes manifests (`deploy/k8s/all-in-one.yaml`).
- Prometheus + Grafana monitoring (`deploy/monitoring/prometheus.yml`).

## Local Run (Docker)

1. Copy environment variables:
   - `cp .env.example .env`
2. Fill in:
   - `VITE_TOKEN` (TMDB bearer token),
   - `FIREBASE_WEB_API_KEY` (from your Firebase project).
3. Run:
   - `docker compose up --build`
4. Verify:
   - App: `http://localhost`
   - Backend health: `http://localhost/health`
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3001`

## Cloud Deploy (Vercel, free-friendly)

1. Create a GitHub repository and push the code.
2. Create a Vercel project for the frontend (root of this repo).
3. Add frontend environment variables in Vercel:
   - `VITE_TOKEN`,
   - `VITE_API_BASE_URL` (set to your backend public URL + `/api`, for example `https://your-backend.example.com/api`).
4. Deploy backend separately on Render/Railway with:
   - `DATABASE_URL`,
   - `FIREBASE_WEB_API_KEY`,
   - `PORT=8080`.
5. Add GitHub Actions secrets for CI deploy to Vercel:
   - `VERCEL_TOKEN`,
   - `VERCEL_ORG_ID`,
   - `VERCEL_PROJECT_ID`,
   - `VITE_TOKEN`,
   - `VITE_API_BASE_URL`.

## CI/CD

Workflow `.github/workflows/ci-cd.yml`:
- runs frontend build on PR/Push;
- builds frontend/backend Docker images;
- deploys frontend to Vercel on main/master (when Vercel secrets are configured).

## Kubernetes

Manifest `deploy/k8s/all-in-one.yaml` includes:
- Namespace,
- Deployments/Services for frontend/backend/postgres,
- HPA for backend,
- Ingress with TLS (HTTPS).

Apply:
- `kubectl apply -f deploy/k8s/all-in-one.yaml`

## Report

Final report for submission: `REPORT.md` (2-4 pages in markdown format).
