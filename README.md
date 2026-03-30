# gr-take-home-test

Monorepo for a **people** CRUD demo: **Next.js** frontend, **Hono** + **Drizzle** backend, **PostgreSQL**.

## Prerequisites

- Node.js 20+ (22 LTS recommended)
- npm
- Docker + Docker Compose (for local Postgres and containerized dev)
- Postgres (optional if you use local host Postgres instead of Docker)

Install dependencies from repo root:

```bash
npm install
```

## Database setup

This repo initializes schema from `database/init.sql` on first Postgres volume boot.

Run setup:

```bash
npm run docker:init
npm run db:init
```

Equivalent Docker Compose snippet (from `docker-compose.yml`):

```yaml
postgres:
  image: postgres:16
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    POSTGRES_DB: app
  ports:
    - "5432:5432"
```

Table creation is handled by `database/init.sql` (creates `people`).  
If you want to apply schema updates from backend code, run:

```bash
npm run db:push --workspace=backend
```

## Start backend

Option A (recommended in this repo; runs via Docker Compose):

```bash
npm run dev:backend
```

Option B (local TypeScript runtime):

```bash
npm run dev --workspace=backend
```

Backend default URL: `http://localhost:3001`

## Start frontend

Option A (recommended in this repo; runs via Docker Compose):

```bash
npm run dev:frontend
```

Option B (local React/Next runtime):

```bash
npm run dev --workspace=frontend
```

Frontend URL: `http://localhost:3000`

## Verify

Open `http://localhost:3000`, create a person named `P1`, and confirm it appears in the list.

## Notes

- Domain naming: this implementation uses `people` (not `products`), so DB schema and API routes are `/people`.
- No JDK is required because backend/frontend are Node.js/TypeScript-based.
- Preferred local workflow here is Docker Compose so frontend, backend, and Postgres share a consistent environment.

