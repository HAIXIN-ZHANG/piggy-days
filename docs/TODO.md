# Piggy Days TODO Roadmap

This roadmap is intentionally bigger than the immediate MVP. It captures the full direction so we can keep building without losing the bigger game/product vision.

Priority rule:

```txt
Real data loop first -> richer game second -> AI/external data third -> deployment last
```

## Phase 0: Save and Stabilize Current Work

Goal: preserve the current monorepo, docs, API structure, core rules, and farm prototype before adding deeper persistence.

- [ ] Run `git status`.
- [ ] Review changed files.
- [ ] Commit the current scaffold and prototype.
- [ ] Suggested commit:

```bash
git add .
git commit -m "feat: scaffold monorepo and interactive piggy farm"
```

- [ ] Confirm baseline commands still pass:

```bash
pnpm db:generate
pnpm typecheck
pnpm test
pnpm --filter @piggy-days/web build
```

- [ ] Keep `docs/TODO.md` as the active roadmap.

## Phase 1: Real MVP Data Loop

Goal: turn Piggy Days from a mock UI into a real local app backed by PostgreSQL.

### 1.1 Local Database

- [ ] Start PostgreSQL.

```bash
docker compose up -d postgres
```

- [ ] Confirm `.env` exists from `.env.example`.
- [ ] Run Prisma generate.

```bash
pnpm db:generate
```

- [ ] Run initial migration.

```bash
pnpm db:migrate
```

- [ ] Open Prisma Studio and inspect tables.

```bash
pnpm db:studio
```

### 1.2 Task Persistence

- [ ] Update `POST /api/tasks` to create a real `Task`.
- [ ] Update `GET /api/tasks` to list real tasks.
- [ ] Add task filters:
  - todo
  - completed
  - all
- [ ] Add default sort:
  - todo first
  - newest updated first
- [ ] Keep all request validation in Zod schemas.
- [ ] Return stable API response shapes.

### 1.3 Check-In Persistence

- [ ] Update `POST /api/tasks/:taskId/complete` to load task by ID.
- [ ] Validate task exists.
- [ ] Validate task is not already completed.
- [ ] Mark task as `COMPLETED`.
- [ ] Create `CheckIn`.
- [ ] Store note, cost, place, and optional photo URL.
- [ ] Store `completedAt`.

### 1.4 Farm Events

- [ ] Use `@piggy-days/core` to calculate rewards.
- [ ] Write one `FarmEvent` per reward.
- [ ] Link `FarmEvent` to the completed task.
- [ ] Keep `FarmEvent` immutable.
- [ ] Return rewards in completion response.

### 1.5 Farm Summary

- [ ] Update `GET /api/farm/summary` to aggregate `FarmEvent`.
- [ ] Return:
  - feed
  - seeds
  - coins
  - xp
  - level
  - levelProgress
  - recentRewards
- [ ] Map Prisma enums to frontend resource names.
- [ ] Add helper functions in `apps/api/src/modules/farm`.
- [ ] Keep summary derived from events before adding a cached `FarmState`.

### 1.6 Web API Client

- [ ] Add `apps/web/lib/apiClient.ts`.
- [ ] Read `NEXT_PUBLIC_API_BASE_URL`.
- [ ] Add typed helpers:
  - `getFarmSummary`
  - `createTask`
  - `completeTask`
  - `listTasks`
- [ ] Add clear error messages for API failures.
- [ ] Keep mock fallback for UI-only development.

### 1.7 Farm UI Uses Real Data

- [ ] Load farm summary on page load.
- [ ] Show loading state.
- [ ] Show API error state.
- [ ] Replace local-only resource counters with API summary.
- [ ] Change `Complete task` demo button to call API.
- [ ] Refresh farm summary after task completion.
- [ ] Keep piggy dialogue and animation responsive after API events.

### 1.8 Tests

- [ ] Add API integration test setup.
- [ ] Test creating a task.
- [ ] Test completing a task.
- [ ] Test check-in creation.
- [ ] Test farm event creation.
- [ ] Test farm summary aggregation.

## Phase 2: Family Password Gate

Goal: protect the private app with a simple shared family gate before formal auth.

### 2.1 API Gate

- [ ] Add `POST /api/auth/family-login`.
- [ ] Validate family password against env.
- [ ] Return a lightweight session token.
- [ ] Keep token simple for v1.
- [ ] Add middleware to protect API routes.
- [ ] Add tests for missing/invalid token.

### 2.2 Web Gate

- [ ] Add password entry screen.
- [ ] Store token in local storage.
- [ ] Add logout button.
- [ ] Attach `x-family-token` to API requests.
- [ ] Redirect unauthenticated users to password screen.
- [ ] Keep UI warm and personal, not enterprise-login style.

### 2.3 Future Auth Notes

- [ ] Document when to move to real auth.
- [ ] Consider passkeys or email magic links later.
- [ ] Keep "two people first" principle.

## Phase 3: Task and Check-In UX

Goal: make task creation and completion usable at home.

### 3.1 Task List

- [ ] Add Tasks screen.
- [ ] Show todo tasks.
- [ ] Show completed tasks.
- [ ] Add category chips:
  - Shopping
  - Cooking
  - City outing
  - Chore
  - Date
  - Other
- [ ] Add planned date display.
- [ ] Add empty states.

### 3.2 Create Task

- [ ] Add task creation form.
- [ ] Support title.
- [ ] Support category.
- [ ] Support description.
- [ ] Support place.
- [ ] Support planned date.
- [ ] Validate required fields client-side.
- [ ] Submit to API.

### 3.3 Complete Task

- [ ] Add complete task flow.
- [ ] Add check-in note.
- [ ] Add optional cost.
- [ ] Add optional place.
- [ ] Add optional photo URL placeholder.
- [ ] Show expected rewards before submitting.
- [ ] Show completion success animation.
- [ ] Refresh farm summary.

### 3.4 UX Polish

- [ ] Add category colors.
- [ ] Add small icons from `lucide-react`.
- [ ] Add optimistic feedback where safe.
- [ ] Add undo only if easy and safe.

## Phase 4: Farm Game V1

Goal: make the current farm screen feel like a small playable game without adding a full engine yet.

### 4.1 Farm Scene Polish

- [ ] Improve piggy idle animation.
- [ ] Add feeding animation.
- [ ] Add planting animation.
- [ ] Add coin jar fill animation.
- [ ] Add unlock celebration.
- [ ] Add memory card arrival animation.
- [ ] Add seasonal background variation.

### 4.2 Piggy System

- [ ] Store piggy names.
- [ ] Store piggy mood.
- [ ] Store piggy outfit/accessory.
- [ ] Add piggy dialogue rules in `@piggy-days/core`.
- [ ] Add mood rules:
  - happy
  - hungry
  - sleepy
  - proud
  - curious
  - celebrating
- [ ] Add unlockable accessories:
  - bow
  - scarf
  - tiny hat
  - raincoat
  - picnic badge

### 4.3 Farm Decorations

- [ ] Add decoration domain type.
- [ ] Add unlock rules by farm level.
- [ ] Add first decoration set:
  - cottage lights
  - garden sign
  - memory frame
  - picnic blanket
  - market basket
- [ ] Persist unlocked decorations.
- [ ] Render unlocked decorations in farm UI.

### 4.4 Plants and Memory Flowers

- [ ] Add `FarmPlant` model later if needed.
- [ ] Link planted flowers to check-ins.
- [ ] Add growth stages:
  - seed
  - sprout
  - bloom
- [ ] Add memory flower tooltip.

## Phase 5: Shopping MVP

Goal: support real household shopping lists first, then deals and comparison.

### 5.1 Shopping List

- [ ] Add Shop screen.
- [ ] Create shopping list.
- [ ] Add manual item.
- [ ] Edit item.
- [ ] Delete item.
- [ ] Mark item as bought.
- [ ] Show estimated total.
- [ ] Persist list and items.

### 5.2 Mock Products and Deals

- [ ] Seed mock retailers:
  - Coles
  - Woolworths
  - ALDI
- [ ] Seed mock products.
- [ ] Seed mock deals.
- [ ] Add product search endpoint.
- [ ] Add browse deals endpoint.
- [ ] Add deal to shopping list.

### 5.3 Retailer Comparison

- [ ] Compare whole list by retailer.
- [ ] Show cheapest retailer.
- [ ] Show convenience note.
- [ ] Show price difference.
- [ ] Convert estimated savings into Coins.
- [ ] Add "not worth switching stores" threshold.

### 5.4 Destination Shopping Advice

- [ ] Add destination input:
  - Carousel
  - City
  - Fremantle
  - Near home
- [ ] Add simple mock store convenience score.
- [ ] Return practical shopping advice.
- [ ] Later integrate maps/Places.

## Phase 6: Manual Review and Memory Wall

Goal: turn completed tasks, outings, shopping savings, and check-ins into memories.

### 6.1 Review API

- [ ] Add `POST /api/reviews/generate`.
- [ ] Accept date range:
  - past 1 week
  - past 2 weeks
  - past 1 month
  - custom range
- [ ] Query completed tasks.
- [ ] Query check-ins.
- [ ] Query shopping savings.
- [ ] Generate deterministic mock summary first.
- [ ] Save `ReviewCard`.

### 6.2 Review UI

- [ ] Add Review screen.
- [ ] Add range selector.
- [ ] Show completed tasks.
- [ ] Show places visited.
- [ ] Show money spent.
- [ ] Show grocery savings.
- [ ] Show things worth doing again.
- [ ] Show suggested next task.
- [ ] Save review to memory wall.

### 6.3 Memory Wall

- [ ] Load real review cards.
- [ ] Show cards on farm.
- [ ] Link memory cards to date ranges.
- [ ] Add category filters later.

## Phase 7: Explore MVP

Goal: help plan simple weekly outings.

### 7.1 Explore Form

- [ ] Add Explore screen.
- [ ] Inputs:
  - budget
  - area/destination
  - mood
  - time available
  - preferences
- [ ] Add preferences:
  - coffee
  - food
  - walk
  - market
  - exhibition
  - groceries

### 7.2 Mock Outing Plan

- [ ] Generate mock outing route.
- [ ] Show candidate places.
- [ ] Show rating placeholder.
- [ ] Show review count placeholder.
- [ ] Show price level placeholder.
- [ ] Show estimated cost.
- [ ] Add grocery stop suggestion.
- [ ] Create task from outing.

### 7.3 Google Places Later

- [ ] Add Google Places API key flow.
- [ ] Search places by area and preferences.
- [ ] Fetch rating.
- [ ] Fetch review count.
- [ ] Fetch price level.
- [ ] Fetch opening status.
- [ ] Store chosen outing plan.

## Phase 8: Scraper MVP

Goal: cache supermarket product/deal data instead of scraping live on user search.

### 8.1 Scraper Foundation

- [ ] Define retailer adapter interface.
- [ ] Add Coles adapter skeleton.
- [ ] Add Woolworths adapter skeleton.
- [ ] Add ALDI adapter skeleton.
- [ ] Add shared product normalization.
- [ ] Add unit price parser.
- [ ] Add test cases for unit price normalization.

### 8.2 Mock Scraper

- [ ] Build mock scraper data source.
- [ ] Write mock products into database.
- [ ] Write mock price snapshots.
- [ ] Write mock deals.
- [ ] Add idempotent upsert logic.

### 8.3 Real Retailer Data Later

- [ ] Investigate legal/robots constraints.
- [ ] Prefer public catalog endpoints if available.
- [ ] Add rate limiting.
- [ ] Add retries.
- [ ] Add structured logs.
- [ ] Add daily cache job.

## Phase 9: AI Features

Goal: use AI only where it makes the product more useful and personal.

### 9.1 OpenAI Setup

- [ ] Add OpenAI API key to env example.
- [ ] Add server-side OpenAI client.
- [ ] Never expose OpenAI key to frontend.
- [ ] Add safe timeout and fallback responses.

### 9.2 AI Review

- [ ] Convert deterministic review summary to AI-assisted summary.
- [ ] Include completed tasks.
- [ ] Include places.
- [ ] Include costs.
- [ ] Include savings.
- [ ] Include things worth repeating.
- [ ] Generate one suggested next task.
- [ ] Store generated text with review card.

### 9.3 AI Explore Plan

- [ ] Generate outing route from area, budget, mood, and preferences.
- [ ] Combine Google Places facts with AI explanation.
- [ ] Keep AI from inventing ratings or opening hours.
- [ ] Add "create task from this plan".

### 9.4 Piggy Dialogue

- [ ] Generate occasional piggy dialogue from recent farm events.
- [ ] Keep a deterministic fallback.
- [ ] Avoid too much text in the farm UI.

## Phase 10: Bigger Game Roadmap

Goal: grow Piggy Farm into a larger two-person cozy game after the MVP loop is real.

### 10.1 Game Design Doc

- [ ] Write `docs/GAME_ROADMAP.md`.
- [ ] Define the full farm map.
- [ ] Define map zones:
  - piggy pen
  - cottage
  - garden
  - memory wall
  - task board
  - market stall
  - picnic corner
  - kitchen table
  - pond
- [ ] Define player avatars.
- [ ] Define piggy behaviors.
- [ ] Define game actions that map to real tasks.

### 10.2 Engine Decision

- [ ] Evaluate Phaser 3.
- [ ] Keep React for app shell and forms.
- [ ] Use Phaser for:
  - map rendering
  - avatar movement
  - collision
  - interaction prompts
  - object animations
- [ ] Avoid hand-rolling a full physics/game loop.

### 10.3 Walkable Farm Prototype

- [ ] Add Phaser dependency.
- [ ] Add `FarmGameCanvas`.
- [ ] Create a small top-down map.
- [ ] Add `Me` avatar.
- [ ] Add `Wife` avatar.
- [ ] Add keyboard movement.
- [ ] Add mobile tap/joystick movement.
- [ ] Add collision boundaries.
- [ ] Add interaction radius.
- [ ] Add "Press / Tap to interact" prompt.

### 10.4 Interactive Objects

- [ ] Piggy pen: feed piggies.
- [ ] Garden: plant seed.
- [ ] Cottage: open home upgrades.
- [ ] Memory wall: view cards.
- [ ] Task board: open tasks.
- [ ] Coin jar: collect savings.
- [ ] Picnic corner: open outing quests.

### 10.5 In-Game Quest System

- [ ] Add `Quest` type in `packages/core`.
- [ ] Add quest templates.
- [ ] Add quest rewards.
- [ ] Persist quest state.
- [ ] Show quest markers on map.
- [ ] Link quests to task categories.

### 10.6 Two-Person Co-op

- [ ] Add local identity selector:
  - Me
  - Wife
- [ ] Store selected identity locally.
- [ ] Store player position in database.
- [ ] Show both avatars from saved positions.
- [ ] Add polling first if realtime is not needed.
- [ ] Later add Socket.IO.
- [ ] Add live movement sync.
- [ ] Add couple quests that require both users.

### 10.7 Game QA

- [ ] Verify canvas is not blank.
- [ ] Verify desktop movement.
- [ ] Verify mobile movement.
- [ ] Verify collision.
- [ ] Verify interaction prompts.
- [ ] Verify map fits viewport.
- [ ] Verify no text overlaps game canvas.

## Phase 11: PWA and Mobile Experience

Goal: make Piggy Days feel good on phones.

- [ ] Add PWA manifest.
- [ ] Add app icons.
- [ ] Add theme color.
- [ ] Add install prompt support if useful.
- [ ] Add mobile viewport polish.
- [ ] Add touch-friendly buttons.
- [ ] Add safe area padding.
- [ ] Test on phone over LAN.
- [ ] Add offline fallback page later.
- [ ] Do not add full offline sync in v1.

## Phase 12: Testing and Quality

Goal: make the project defensible as a serious engineering project.

### 12.0 Tooling Baseline

- [x] Pin pnpm to version 10+.
- [x] Add ESLint flat config.
- [x] Add Prettier config and ignore rules.
- [x] Add format check script.
- [x] Add lint-staged script and config.
- [x] Add common frontend packages:
  - React Query
  - React Hook Form
  - hookform resolvers
  - date-fns
  - clsx
- [x] Add common API packages:
  - helmet
  - express-rate-limit
  - pino
  - pino-http
- [x] Add scraper foundation packages:
  - cheerio
  - p-limit

### 12.1 Unit Tests

- [ ] Farm reward rules.
- [ ] Farm level rules.
- [ ] Task category helpers.
- [ ] Price/unit normalization.
- [ ] Review summary helpers.

### 12.2 API Tests

- [ ] Health endpoint.
- [ ] Family password gate.
- [ ] Create task.
- [ ] Complete task.
- [ ] Farm event creation.
- [ ] Farm summary aggregation.
- [ ] Shopping list CRUD.

### 12.3 Frontend Tests Later

- [ ] Farm screen renders.
- [ ] Resource counters display.
- [ ] Complete task interaction.
- [ ] Error state renders.
- [ ] Loading state renders.

### 12.4 Visual QA

- [ ] Desktop screenshot.
- [ ] Mobile screenshot.
- [ ] Farm scene check.
- [ ] Text overflow check.
- [ ] Button tap target check.
- [ ] Game canvas check after Phaser.

## Phase 13: CI/CD

Goal: every push should prove the project still builds.

### 13.1 GitHub Actions Base CI

- [ ] Add `.github/workflows/ci.yml`.
- [ ] Install pnpm through Corepack.
- [ ] Cache pnpm store.
- [ ] Run:

```bash
pnpm install --frozen-lockfile
pnpm db:generate
pnpm typecheck
pnpm test
pnpm --filter @piggy-days/web build
pnpm --filter @piggy-days/api build
pnpm --filter @piggy-days/scraper build
```

### 13.2 Pull Request Checks

- [ ] Trigger CI on pull request.
- [ ] Trigger CI on push to main.
- [ ] Add branch protection later.
- [ ] Require typecheck/test/build before merge.

### 13.3 Deployment Pipeline Later

- [ ] Web deploy through Amplify connected to GitHub.
- [ ] API deploy through GitHub Actions to App Runner.
- [ ] Scraper deploy through GitHub Actions to Lambda.
- [ ] Keep DB migrations manual at first.
- [ ] Add migration deployment only when schema stabilizes.

## Phase 14: AWS Deployment

Goal: deploy without heavy infrastructure.

### 14.1 Web: AWS Amplify

- [ ] Create Amplify app.
- [ ] Connect GitHub repo.
- [ ] Configure build command.
- [ ] Configure env vars.
- [ ] Confirm Next.js route works.
- [ ] Add custom domain later.

### 14.2 API: AWS App Runner

- [ ] Add API Dockerfile.
- [ ] Add health check endpoint.
- [ ] Configure App Runner service.
- [ ] Configure env vars.
- [ ] Connect to RDS.
- [ ] Confirm CORS with Amplify domain.

### 14.3 Database: RDS PostgreSQL

- [ ] Create RDS PostgreSQL.
- [ ] Configure security group.
- [ ] Store connection string in Secrets Manager.
- [ ] Run migrations manually.
- [ ] Add backup settings.

### 14.4 Storage: S3

- [ ] Create S3 bucket for check-in photos.
- [ ] Add private bucket policy.
- [ ] Add presigned upload endpoint.
- [ ] Store `photoUrl` or object key.
- [ ] Add lifecycle policy later.

### 14.5 Scraper: Lambda and EventBridge

- [ ] Package scraper as Lambda.
- [ ] Add EventBridge daily schedule.
- [ ] Add scraper env vars.
- [ ] Write logs to CloudWatch.
- [ ] Add failure alert later.

### 14.6 Secrets and Config

- [ ] Use Secrets Manager for:
  - database URL
  - family password/token secret
  - OpenAI key
  - Google Places key
- [ ] Do not commit real secrets.
- [ ] Keep `.env.example` updated.

## Phase 15: Observability and Operations

Goal: make debugging production easier.

- [ ] Add structured API logs.
- [ ] Add request IDs.
- [ ] Log scraper runs.
- [ ] Log external API failures.
- [ ] Add CloudWatch dashboards later.
- [ ] Add basic uptime check.
- [ ] Add error boundary in web app.
- [ ] Add API error response consistency.

## Phase 16: Security and Privacy

Goal: keep a private two-person app safe enough without overbuilding.

- [ ] Hash family password if stored.
- [ ] Do not expose secrets in client bundle.
- [ ] Validate all API inputs.
- [ ] Rate limit auth endpoint later.
- [ ] Keep S3 uploads private.
- [ ] Avoid personal data in object keys.
- [ ] Add simple data export later.
- [ ] Add delete check-in/photo later.

## Phase 17: Resume and Portfolio Polish

Goal: make the project easy to explain and show.

- [ ] Add clean README screenshots.
- [ ] Add architecture diagram.
- [ ] Add product summary.
- [ ] Add "Why this stack" section.
- [ ] Add "What I built" section.
- [ ] Add "Engineering highlights" section.
- [ ] Add short demo GIF later.
- [ ] Add deployment URL when ready.
- [ ] Add resume bullets:
  - TypeScript monorepo.
  - Next.js PWA.
  - Express API.
  - Prisma/PostgreSQL.
  - Shared domain package.
  - Event-driven farm rewards.
  - Supermarket deal ingestion plan.
  - AI-assisted review and outing planning.
  - Cozy game layer with future two-person map.

## Current Recommended Order

Do these next:

1. Commit current work.
2. Start PostgreSQL.
3. Run Prisma migration.
4. Implement real task persistence.
5. Implement check-in completion.
6. Write farm events.
7. Aggregate farm summary.
8. Connect Farm UI to API.
9. Add API tests.
10. Then start the bigger walkable game prototype.
