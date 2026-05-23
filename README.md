# Piggy Days

Piggy Days is a private PWA for two people: tasks, check-ins, shopping deals, weekly outings, reviews, and a small piggy farm reward loop.

## Monorepo

- `apps/web`: Next.js PWA frontend with PandaCSS.
- `apps/api`: Express API.
- `apps/scraper`: scheduled retailer data scraper worker.
- `packages/core`: shared domain types, constants, and reward rules.
- `packages/database`: Prisma schema and database client.
- `packages/ui`: shared UI tokens/components for the web app.

## Engineering Docs

- `docs/ARCHITECTURE.md`: system boundaries, request flow, and resume-level talking points.
- `docs/DATA_MODEL.md`: Prisma model intent and relational design.
- `docs/API_CONTRACT.md`: protected routes, validation, and current API shapes.
- `docs/PIGGY_FARM_GAME_DESIGN.md`: farm game loop, resources, progression, and UX direction.

## Local Setup

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm install
cp .env.example .env
docker compose up -d postgres
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Useful commands:

```bash
pnpm dev:web
pnpm dev:api
pnpm dev:scraper
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

The first milestone should stay local and simple: family password gate, task creation/completion, farm rewards, manual shopping items, mock deals, and mock review generation.
