# Piggy Days

Piggy Days is a private bilingual PWA for two people. The core product is a daily todo and checklist system where real-life actions earn Piggy Coins, grow a shared Piggy Fund, and become weekly memories.

The farm is the emotional reward layer. Shopping comparison, external data, AI, and detailed farm gameplay come after the daily task loop is useful.

## Product Priority

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

Default language is Simplified Chinese. English is the secondary UI language.

## Current App Routes

Piggy Days uses one `apps/web` PWA, not multiple apps.

```txt
/             -> redirect to /today
/today        -> daily home with real task, fund, leaderboard, and reward snapshots
/tasks        -> create/list simple tasks
/tasks/[id]   -> task detail and simple task completion
/fund         -> Piggy Fund, coin ledger, weekly leaderboard, all-time leaderboard
/farm         -> lightweight piggy reward and memory surface
/kitchen      -> local dinner planning prototype
/settings     -> language, current user, session

Later:
/explore      -> outing checklist generator
/review       -> weekly review
/memories     -> memory wall
/shop         -> manual shopping and later comparison
```

## Monorepo

- `apps/web`: Next.js PWA frontend with PandaCSS.
- `apps/api`: Express API.
- `apps/scraper`: future scheduled retailer data worker.
- `packages/core`: shared domain types, constants, CoinEvent/Fund/leaderboard rules, farm helpers, and kitchen recommendation logic.
- `packages/database`: Prisma schema and database client.
- `packages/ui`: shared UI tokens/components for the web app.

## Engineering Docs

- `docs/PRODUCT_BRIEF.md`: current product direction and module boundaries.
- `docs/MVP_PLAN.md`: smallest useful version and build order.
- `docs/TODO.md`: active release checklist.
- `docs/ARCHITECTURE.md`: routes, boundaries, request flow, and pagination strategy.
- `docs/DATA_MODEL.md`: current Prisma model intent and next schema changes.
- `docs/API_CONTRACT.md`: protected routes, active endpoints, planned endpoints, and response shapes.
- `docs/TECH_STACK.md`: frontend, backend, i18n, database, testing, and deployment choices.
- `docs/DEPLOYMENT_PLAN.md`: AWS deployment runbook, phases, security boundary, and checklist.
- `docs/UX_TESTING_GUIDE.md`: small-slice iteration rules and wife-testing prompts.
- `docs/PIGGY_FARM_GAME_DESIGN.md`: farm reward layer and later game roadmap.
- `docs/AGENT_GUIDE.md`: collaboration rules for future agents.

## Local Setup

```bash
corepack enable
corepack prepare pnpm@10.24.0 --activate
pnpm install
docker compose up -d postgres
pnpm db:generate
DATABASE_URL="postgresql://piggy_days:piggy_days@localhost:5432/piggy_days?schema=public" pnpm --filter @piggy-days/database exec prisma db push --schema prisma/schema.prisma
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

## Current MVP Loop

The current local MVP loop is:

- Pick current user in `/settings`.
- Create a simple task in `/tasks`.
- Complete it in `/tasks/[id]` with optional note, place, cost, and photo URL.
- Write one immutable `CoinEvent`.
- Derive Piggy Fund, recent rewards, weekly leaderboard, and all-time leaderboard from `CoinEvent`.
- Show the real task/fund/leaderboard state on `/today` and `/fund`.

## Next Milestone

The next product slice should stay small:

- Add persistent `ChecklistItem`.
- Let a checklist item completion create its own `CoinEvent`.
- Keep the completer-as-earner attribution rule until shared split-credit rules are clearer.
- Keep Explore, Shopping, AI, rich Farm gameplay, and Kitchen persistence out of this slice.

## Iteration Style

Keep user-facing changes small. After each visible slice, run it locally and test one realistic home scenario before expanding scope. Use `docs/UX_TESTING_GUIDE.md` for the test script and UX details to watch.

Before starting the next implementation slice, pause for a pre-work checkpoint. It should cover what is already done, what the current requirement is, what the next slice should be, what will be implemented, what is out of scope, which details need user confirmation, and how wife will test it. Do not automatically code the next roadmap item when product or UX details may still change.
