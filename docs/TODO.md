# Piggy Days TODO Roadmap

Status date: 2026-05-31

This is the active roadmap. It intentionally keeps the next work small and ordered.

## Iteration Rule

Every user-facing change should be small enough to test at home before continuing.

Use `docs/UX_TESTING_GUIDE.md` before starting a new visible slice.

Before implementing the next slice, first do a pre-work checkpoint with the user.

The checkpoint must include:

1. 已经做了什么.
2. 现在的需求是什么.
3. 下一步建议做什么.
4. 要实现什么.
5. 这次不做什么.
6. 需要一起确认的细节.
7. 做完怎么测试.
8. 用户可以选择继续讨论、更新文档、或开始实现.

Do not automatically start coding the next roadmap item if product behavior, UX, route structure, rewards, task flow, data model, or language copy may need discussion.

Each slice should include:

- one main user behavior
- one route or workflow focus
- explicit out-of-scope items
- a short wife-test script
- a clear pass/fail signal from real use

Track feature maturity:

```txt
planned -> route-only -> prototype -> beta -> active
```

Only `active` features should appear in primary navigation. `prototype` and `beta` features should be reachable through cards, settings, experiment links, or direct routes.

## Product Priority

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

## Current Feature Inventory

### Visible or Implemented Now

- pnpm monorepo with `apps/web`, `apps/api`, `apps/scraper`, `packages/core`, `packages/database`, and `packages/ui`.
- Next.js web app and Express API skeleton.
- Prisma schema with tasks, check-ins, farm events, shopping, retailer data, deals, and review cards.
- Farm prototype with two piggies, local resources, plants, recent rewards, memory cards, dialogue, and unlock decorations.
- Farm reward/domain helpers in `@piggy-days/core`.
- Piggy Kitchen prototype with local inventory, quick-add items, dinner settings, deterministic recommendations, shopping gap output, and dish library.
- Kitchen recommendation helpers in `@piggy-days/core`.
- Tooling baseline: TypeScript, ESLint, Prettier, tests, build scripts, Prisma scripts, and `pnpm check`.

### Scaffolded but Not Real Yet

- Tasks API returns mock/in-memory shapes.
- Farm API returns default state and does not derive from real events.
- Farm and Kitchen frontend state is local only.
- No app shell routes yet; current home page still contains both Farm and Kitchen.
- No real Todo/Fund UI yet.
- No `HouseholdUser`, `ChecklistItem`, or `CoinEvent` models yet.
- No family password screen yet.
- No persistent language setting beyond planned local storage.

### Complexity Parking Lot

Do not let these block the first useful version:

- Detailed farm pet simulation and farming economy.
- Walkable co-op farm map.
- Real supermarket scraping.
- Google Places integration.
- OpenAI-generated plans or reviews.
- S3 upload.
- Formal accounts.
- Multiple households.
- Social features.
- Push notifications.
- Full offline sync.

## Release 0: Stabilize Current Work

Goal: preserve the current prototype and docs baseline.

- [ ] Review current changed files.
- [ ] Confirm which changes belong in the current baseline.
- [ ] Run:

```bash
pnpm check
```

- [ ] Commit the current scaffold/prototype when ready.

## Release 1A: App Shell, Routes, and i18n

Goal: turn the long prototype page into a real app structure.

Recommended slices:

1. Route skeleton only.
2. App shell and navigation.
3. Chinese-first i18n dictionary and language toggle.
4. Move Farm to `/farm`.
5. Move Kitchen to `/kitchen`.
6. Build `/today` placeholder dashboard.

Do not merge these into one large UX change if we need real feedback in between.

### Routes

- [ ] Add `/today`.
- [ ] Add `/tasks`.
- [ ] Add `/tasks/[id]`.
- [ ] Add `/fund`.
- [ ] Add `/farm`.
- [ ] Add `/kitchen`.
- [ ] Add `/settings`.
- [ ] Redirect `/` to `/today`.

### App Shell

- [ ] Add mobile-first bottom navigation.
- [ ] Add desktop-friendly navigation layout.
- [ ] Add page title area.
- [ ] Add warm empty states for new pages.
- [ ] Keep navigation labels Chinese-first.
- [ ] Keep primary navigation limited to:
  - 今天
  - 任务
  - 基金
  - 小猪
  - 设置
- [ ] Keep Kitchen as a secondary/prototype entry until it passes home testing.
- [ ] Keep Explore, Review, Memories, and Shop out of primary nav until they become `active`.

### Existing Prototypes

- [ ] Move current `FarmPrototype` to `/farm`.
- [ ] Move current `PiggyKitchen` to `/kitchen`.
- [ ] Make `/today` a lightweight dashboard with placeholder cards:
  - today tasks
  - Piggy Fund
  - leaderboard
  - recent rewards

### i18n

- [ ] Add `apps/web/lib/i18n/locales/zh-CN.ts`.
- [ ] Add `apps/web/lib/i18n/locales/en.ts`.
- [ ] Add `apps/web/lib/i18n/useI18n.ts`.
- [ ] Default to `zh-CN`.
- [ ] Store selected locale in local storage.
- [ ] Add language toggle in `/settings`.
- [ ] Localize:
  - navigation
  - page titles
  - buttons
  - empty states
  - common labels

### Verification

- [ ] `pnpm typecheck`.
- [ ] `pnpm --filter @piggy-days/web build`.
- [ ] Desktop visual check.
- [ ] Mobile visual check.
- [ ] Wife can find Tasks, Kitchen, Farm, and Settings without explanation.

## Release 1B: Todo and Coin Data Model

Goal: add the schema needed for tasks, checklists, coins, fund, and leaderboard.

- [ ] Add `HouseholdUser`.
- [ ] Seed two users:
  - me
  - wife
- [ ] Extend `Task`:
  - type
  - assignedTo
  - createdByUserId
  - completedByUserId
  - coinValue
- [ ] Add `ChecklistItem`.
- [ ] Add `CoinEvent`.
- [ ] Decide whether to keep `FarmEvent` as-is or turn it into a later farm projection.
- [ ] Run Prisma migration.
- [ ] Add domain helpers in `@piggy-days/core`:
  - task reward calculation
  - checklist progress
  - Piggy Fund summary
  - leaderboard aggregation
- [ ] Add unit tests for those helpers.

## Release 1C: Persistent Todo and Piggy Coins

Goal: make the first real daily-use loop work.

Recommended slices:

1. Static task list and create form with local/mock state.
2. Persistent simple task creation.
3. Task completion creates `CoinEvent`.
4. Fund summary updates from real events.
5. Leaderboard updates from real events.
6. Checklist item completion.

### API

- [ ] `GET /api/people`.
- [ ] `GET /api/tasks`.
- [ ] `POST /api/tasks`.
- [ ] `GET /api/tasks/:taskId`.
- [ ] `POST /api/tasks/:taskId/complete`.
- [ ] `POST /api/tasks/:taskId/checklist-items`.
- [ ] `PATCH /api/checklist-items/:itemId`.
- [ ] `POST /api/checklist-items/:itemId/complete`.
- [ ] `GET /api/fund/summary`.
- [ ] `GET /api/coins/events`.
- [ ] `GET /api/leaderboard`.

### Web

- [ ] Create task form.
- [ ] Task list filters:
  - status
  - assignee
  - category
  - date range
- [ ] Task detail page.
- [ ] Checklist item editor.
- [ ] Complete task flow with note, place, cost, and photo URL placeholder.
- [ ] Complete checklist item flow.
- [ ] Fund summary page.
- [ ] Coin event list with "load more".
- [ ] Weekly and all-time leaderboard.

### Verification

- [ ] API tests for create task.
- [ ] API tests for complete task.
- [ ] API tests for checklist item completion.
- [ ] API tests for coin event creation.
- [ ] API tests for fund summary.
- [ ] API tests for leaderboard.
- [ ] `pnpm check`.

## Release 1D: Family Gate and Two-Person UX

Goal: make the app private and comfortable for only two people.

- [ ] Add `POST /api/auth/family-login`.
- [ ] Validate family password against env.
- [ ] Return lightweight token.
- [ ] Add family password screen.
- [ ] Store token locally.
- [ ] Attach `x-family-token` to API requests.
- [ ] Add current-user selector in `/settings`.
- [ ] Store current user locally.
- [ ] Add logout action.

## Release 2: Explore Checklists

Goal: support couple exploration tasks without external APIs.

- [ ] Add local checklist templates:
  - try a shop or cafe
  - park or scenic spot
  - casual city walk
  - date outing
  - grocery-plus-outing
- [ ] Add `/explore`.
- [ ] Create checklist draft from user intent.
- [ ] Let user edit/reorder/delete checklist items.
- [ ] Save draft as checklist task.
- [ ] Award coins per item or on full completion.
- [ ] Keep Google Places and AI out of scope.

## Release 3: Kitchen Checklists

Goal: turn cooking into a rewardable task flow.

- [ ] Keep deterministic dinner recommendations.
- [ ] Add "create cooking checklist" from selected dinner plan.
- [ ] Let user edit cooking checklist.
- [ ] Save cooking checklist as task.
- [ ] Award coins for cooking completion.
- [ ] Persist kitchen items only when the local workflow feels useful.
- [ ] Keep internet recipes, nutrition tracking, barcode scanning, and AI out of scope.

## Release 4: Weekly Review and Memory Wall

Goal: summarize what we did and preserve memories.

- [ ] Add `/review`.
- [ ] Add `/memories`.
- [ ] Add `POST /api/reviews/generate`.
- [ ] Generate deterministic summary from:
  - tasks
  - checklist items
  - check-ins
  - coin events
  - kitchen tasks
  - explore tasks
- [ ] Save `ReviewCard`.
- [ ] Show completed task count.
- [ ] Show completed checklist item count.
- [ ] Show places visited.
- [ ] Show food cooked.
- [ ] Show Piggy Coins earned.
- [ ] Show Piggy Fund change.
- [ ] Show period leaderboard.
- [ ] Add optional coin bonus for completing review ritual.

## Release 5: Manual Shopping

Goal: support household shopping without waiting for real retailer data.

- [ ] Add `/shop`.
- [ ] Create shopping list.
- [ ] Add manual item.
- [ ] Edit/delete item.
- [ ] Mark item bought.
- [ ] Add estimated price.
- [ ] Add optional savings.
- [ ] Convert chosen savings into Piggy Coins or fund adjustment.

Out of scope:

- Real scraping.
- Live product search.
- Store opening hours.
- Route optimization.

## Release 6: Farm Details

Goal: make the farm richer after the task/checklist/fund loop is useful.

- [ ] Derive farm display from Piggy Fund, coin events, and review cards.
- [ ] Add feeding interaction if it still feels useful.
- [ ] Add planting interaction if it maps clearly to memory/check-in events.
- [ ] Add decoration unlocks.
- [ ] Add richer piggy dialogue.
- [ ] Add outfits later.
- [ ] Keep walkable co-op map as a separate later experiment.

## Release 7: External Data, AI, PWA, and Deployment

Goal: add power features only after private daily use works.

- [ ] Real supermarket cache and scraper.
- [ ] Google Places facts for Explore.
- [ ] OpenAI-assisted reviews and outing explanations.
- [ ] Occasional AI piggy dialogue with deterministic fallback.
- [ ] PWA manifest and icons.
- [ ] AWS deployment.
- [ ] CI/CD and production observability.

## Quality Baseline

Keep these commands healthy:

```bash
pnpm db:generate
pnpm typecheck
pnpm test
pnpm --filter @piggy-days/web build
pnpm --filter @piggy-days/api build
pnpm --filter @piggy-days/scraper build
pnpm check
```

## Current Recommended Next Step

Do these next:

1. Implement Release 1A app shell and route skeleton.
2. Move Farm to `/farm`.
3. Move Kitchen to `/kitchen`.
4. Add Chinese-first i18n and language toggle.
5. Then start Release 1B schema work for Todo and Piggy Coins.
