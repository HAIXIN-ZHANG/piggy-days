# Core Loop Review And Closure (2026-06-20)

## Status Update (2026-06-21)

The recommended next slice from this review has been implemented for simple tasks.

Implemented now:

- `/settings` current-user selection is used by task creation and completion.
- `/tasks` can create and list persistent simple tasks.
- `/tasks/[id]` can complete a simple task with optional note, place, cost, and photo URL.
- Completing a simple task writes one immutable positive `CoinEvent`.
- `GET /api/fund/summary` derives balance, all-time earned, redeemed, this-week earned, and recent events from `CoinEvent`.
- `GET /api/leaderboard?range=week|all` derives leaderboard rows from positive `CoinEvent` rows only.
- `/today` and `/fund` show real task/fund/leaderboard/reward data instead of placeholder values.
- `GET /api/farm/summary` is now a lightweight CoinEvent projection. The rich Farm UI remains prototype/local and is not the reward source of truth.
- Local browser verification passed for:

```txt
pick wife -> create simple task -> complete task -> write CoinEvent -> derive Fund -> derive leaderboard -> show Today
```

Still not implemented:

- Persistent `ChecklistItem`.
- Checklist item completion rewards.
- Manual coin adjustments or redemptions.
- Family password screen.
- Advanced split-credit rules for shared tasks.
- API integration tests for the new endpoints.

Verification after implementation:

- `pnpm check` passed.
- Browser verification used `http://127.0.0.1:3001` for web and `http://localhost:4000` for API.

## Scope

This review checks whether the current app already supports the intended MVP business loop:

```txt
Create task -> complete real action -> write immutable CoinEvent -> derive Fund -> derive leaderboard -> project into Farm
```

It also checks whether the current implementation still follows the documented product priority:

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

## Verification Performed

- Read the current product and engineering docs:
  - `docs/PRODUCT_BRIEF.md`
  - `docs/MVP_PLAN.md`
  - `docs/TODO.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DATA_MODEL.md`
  - `docs/API_CONTRACT.md`
- Read the current web, API, core, and Prisma files related to the MVP loop.
- Ran `pnpm check`.
- Started the local web app and API, opened `/today`, and called the current API routes with `curl`.

## Original Summary

The original 2026-06-20 finding was that the product direction was coherent, but the implementation was still a routed prototype rather than a closed MVP loop.

That issue is now addressed for simple tasks. The app still needs checklist persistence and richer product rules before the broader todo/checklist MVP is complete.

The remaining sections below preserve the original review findings for traceability.

## Original Findings

### P0. No usable MVP loop existed yet

Status: addressed for simple tasks on 2026-06-21.

Original finding:

The docs defined `/today`, `/tasks`, `/tasks/[id]`, and `/fund` as the core MVP path. At the time of the original review:

- `/tasks` was still a route placeholder.
- `/tasks/[id]` was still a route placeholder.
- `/fund` was still a route placeholder.
- `/today` showed hardcoded preview cards and explicitly said that real task data would be added in a later slice.

Evidence:

- `apps/web/app/tasks/page.tsx`
- `apps/web/app/tasks/[id]/page.tsx`
- `apps/web/app/fund/page.tsx`
- `apps/web/features/app/TodayPage.tsx`
- `apps/web/lib/i18n/locales/zh-CN.ts`

Impact:

- A real user cannot create a task in the UI.
- A real user cannot complete a task in the UI.
- A real user cannot see a real fund or leaderboard update.
- The app currently demonstrates structure, not the intended product loop.

### P0. Rewards still used the old farm-resource source of truth

Status: addressed for simple task completion. Rich Farm UI remains prototype/local.

The docs clearly say that `CoinEvent` should be the main reward ledger and that Fund and leaderboard should be derived from it. The current implementation still awards farm resources directly.

Original behavior:

- `POST /api/tasks/:taskId/complete` returned `farm.xp` and farm resource rewards.
- `GET /api/farm/summary` returned a default farm state.
- `/farm` managed `feed`, `seeds`, `coins`, and `xp` entirely in local component state.

Evidence:

- `apps/api/src/modules/tasks/tasks.routes.ts`
- `apps/api/src/modules/farm/farm.routes.ts`
- `apps/web/features/farm/useFarmPrototype.ts`
- `packages/core/src/farm/rewards.ts`

Impact:

- Tasks, Fund, leaderboard, and Farm cannot stay consistent with each other.
- The current reward system is not explainable in the way the docs require.
- The same app now has two competing reward models: documented `CoinEvent` vs implemented farm resources.

### P0. The data model could not support the documented two-person coin loop

Status: partially addressed. `HouseholdUser`, task assignment/completion fields, and `CoinEvent` exist. `ChecklistItem` is still pending.

The documented MVP requires:

- `HouseholdUser`
- task ownership and assignment
- `completedByUserId`
- `coinValue`
- `ChecklistItem`
- immutable `CoinEvent`
- weekly and all-time leaderboard derivation

The current schema does not have those core pieces yet.

Original gaps:

- `HouseholdUser` did not exist yet.
- No `ChecklistItem` model.
- `CoinEvent` did not exist yet.
- `Task` did not track `createdByUserId`, `assignedTo`, `completedByUserId`, or `coinValue`.
- Task statuses were only `TODO` and `COMPLETED`, while docs already assumed richer flow.
- The shared task category set did not match the documented one.

Evidence:

- `packages/database/prisma/schema.prisma`
- `packages/core/src/tasks/index.ts`
- `docs/PRODUCT_BRIEF.md`
- `docs/DATA_MODEL.md`

Impact:

- The API cannot correctly assign coins to a person.
- The leaderboard cannot be computed correctly.
- The fund cannot be derived from the intended ledger.
- The two-person design exists in docs and settings UI, but not in the real domain model.

### P1. The secondary prototypes felt more real than the main product engine

Status: partially addressed. `/tasks`, `/tasks/[id]`, `/fund`, and `/today` now support the simple-task loop. Farm and Kitchen remain visually richer prototypes.

The docs say Farm is the reward surface and Kitchen is a prototype/secondary route. But the current app gives users much richer interaction in Farm and Kitchen than in Tasks or Fund.

Evidence:

- `apps/web/app/farm/page.tsx`
- `apps/web/app/kitchen/page.tsx`
- `apps/web/features/farm/FarmPrototype.tsx`
- `apps/web/features/kitchen/PiggyKitchen.tsx`
- `apps/web/features/app/TodayPage.tsx`

Impact:

- The product can be misread as a farm or dinner-planning prototype rather than a task-and-reward app.
- Engineering effort appears to be ahead on secondary surfaces and behind on the primary loop.

### P1. Shared-task reward rules are still undefined

Status: still open. The current implementation uses one clear rule: the completer earns the simple-task reward.

The docs allow `assignedTo = me | wife | both` and also require a personal leaderboard. That creates unresolved business rules:

- If a task is assigned to `both`, who earns the task-level reward?
- If both people contribute but only one completes, who gets credit?
- For checklist tasks, who earns each item reward?
- If there is a parent checklist completion bonus, who gets it?

Evidence:

- `docs/PRODUCT_BRIEF.md`
- `docs/DATA_MODEL.md`

Impact:

- Even if implementation starts now, reward attribution will stay ambiguous.
- This is a real product-rule gap, not just a missing field.

Recommendation:

- For the next slice, avoid solving all shared-task edge cases at once.
- Make the first real loop support single completer attribution explicitly.
- Defer more complex split-credit rules until after the simple loop is stable.

### P1. The task completion contract baked in old outing/shopping assumptions

Status: addressed for simple task completion. `isCityOuting` and `grocerySavingsCents` are not part of the simple-task completion contract.

The current completion schema includes `isCityOuting` and `grocerySavingsCents`, and the reward helpers still convert those into farm rewards and XP.

Evidence:

- `apps/api/src/modules/tasks/tasks.schemas.ts`
- `packages/core/src/farm/rewards.ts`

Impact:

- The implementation still reflects an older prototype direction.
- The MVP task loop is getting mixed with explore/shopping/farm logic too early.

Recommendation:

- The first real loop should center on task completion and `CoinEvent`.
- Outing bonuses, shopping savings, and richer farm progression should be moved out of the critical path.

### P2. The current user setting existed only in local UI state

Status: addressed for simple tasks. The selected current user is used as task creator/completer and reward earner.

`/settings` already stores `me` or `wife` in local storage, but that identity is not used by the API, not attached to task creation, and not used for reward attribution.

Evidence:

- `apps/web/features/app/SettingsPage.tsx`

Impact:

- The app appears to support two people, but the choice is not connected to any real business action.

### P2. Local dev CORS defaults may drift from the real web port

Status: addressed for local development. The API allows both `localhost:<port>` and `127.0.0.1:<port>` in non-production.

The API defaults `WEB_ORIGIN` to `http://localhost:3000`, while the web app can move to `3001` when `3000` is occupied.

Evidence:

- `apps/api/src/config/env.ts`

Impact:

- As soon as the web app starts calling the API from a non-3000 dev port, local integration may fail unless env values are adjusted.

This is not the main product issue, but it will become a practical friction point once API wiring starts.

### P2. Some docs are now stale relative to the codebase

Status: addressed in the 2026-06-21 docs refresh.

The most obvious example is `README.md`, which still describes the app shell as the next milestone even though that route-shell work has already been completed.

Evidence:

- `README.md`

Impact:

- A new implementation agent could pick the wrong starting point if they rely on the README first.

## Recommended Next Slice

Status: implemented for simple tasks.

Original recommendation:

Do not try to fix everything in one pass.

The next implementation slice should be:

```txt
The smallest real simple-task loop:
create simple task -> list task -> complete task -> write CoinEvent -> derive Fund -> derive weekly/all-time leaderboard
```

### In Scope

- Add the minimal schema/domain support for the real loop:
  - `HouseholdUser`
  - extend `Task`
  - `CoinEvent`
- Keep it to simple tasks first.
- Wire the selected current user into task creation and completion.
- Implement real API endpoints for:
  - `GET /api/people`
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `GET /api/tasks/:taskId`
  - `POST /api/tasks/:taskId/complete`
  - `GET /api/fund/summary`
  - `GET /api/coins/events`
  - `GET /api/leaderboard`
- Replace placeholder content on:
  - `/tasks`
  - `/tasks/[id]`
  - `/fund`
  - the core cards on `/today`
- Make `/farm` a read-only projection from the real ledger for now, or clearly keep it as prototype-only and not a source of truth.

### Explicitly Out of Scope

- Checklist item persistence.
- Explore.
- Review generation.
- Shopping savings conversion.
- Richer farm gameplay.
- Kitchen persistence.
- AI or external APIs.

## Original Acceptance Criteria For The Next Slice

Status: met for simple tasks, except checklist-specific work was intentionally out of scope.

- A user can pick `me` or `wife` in Settings.
- A user can create a simple task from the web UI.
- The created task persists and appears in the task list.
- A user can complete the task with optional note/place/cost/photo URL fields.
- Task completion writes an immutable `CoinEvent`.
- Fund summary is derived from real `CoinEvent` rows.
- Weekly and all-time leaderboard are derived from real `CoinEvent` rows.
- `/today` and `/fund` show real data instead of placeholder values.
- `pnpm check` passes.
- Local browser verification confirms the end-to-end flow.

## Original Prompt For The Implementation Agent

```txt
You are the implementation agent for Piggy Days.

Before changing code, read these docs in full:
- docs/PRODUCT_BRIEF.md
- docs/MVP_PLAN.md
- docs/TODO.md
- docs/ARCHITECTURE.md
- docs/DATA_MODEL.md
- docs/API_CONTRACT.md
- docs/REVIEW_2026-06-20_CORE_LOOP.md

Objective:
Implement the smallest real MVP loop for Piggy Days:
create simple task -> complete task -> write immutable CoinEvent -> derive Fund -> derive weekly/all-time leaderboard.

Important constraints:
- Do not do a broad refactor.
- Do not expand Explore, Shopping, AI, or rich Farm gameplay.
- Do not turn Kitchen into a persistence project in this slice.
- Keep the current route shell and i18n structure.
- Use CoinEvent as the reward source of truth.
- Farm must not remain the main source of reward truth.
- Prefer the smallest visible, testable slice that produces a real closed loop.

Implementation scope:
1. Add the minimal schema/domain changes needed for the simple-task loop:
   - HouseholdUser
   - Task fields for type, createdByUserId, assignedTo, completedByUserId, coinValue
   - CoinEvent
2. Seed two built-in users: me and wife.
3. Implement real API endpoints for:
   - GET /api/people
   - GET /api/tasks
   - POST /api/tasks
   - GET /api/tasks/:taskId
   - POST /api/tasks/:taskId/complete
   - GET /api/fund/summary
   - GET /api/coins/events
   - GET /api/leaderboard
4. Implement the minimal web UI to support:
   - create simple task
   - list tasks
   - open task detail
   - complete task
   - show real fund summary
   - show weekly/all-time leaderboard
5. Update /today so its task/fund/leaderboard/recent reward cards use real data.
6. Either make /farm read-only from real data or leave it clearly prototype-only without conflicting with the new source of truth.
7. Add tests for:
   - task creation
   - task completion
   - CoinEvent creation
   - Fund summary derivation
   - leaderboard derivation

Business rules for this slice:
- Start with simple tasks only.
- One completed simple task creates one positive CoinEvent using the task's coinValue.
- Leaderboard is based on positive earned coins only.
- Negative/redemption events must not reduce historical earned leaderboard totals.
- For now, keep attribution simple: the completer earns the task reward.
- Do not solve advanced split-credit rules for shared tasks in this slice unless required by existing code paths.

Verification requirements:
- Run pnpm check.
- Start the local web and API apps.
- Verify the full flow in a browser:
  create task -> complete task -> confirm task list update -> confirm fund update -> confirm leaderboard update.
- Report the actual local URLs used during verification.
- Stop temporary dev servers before handoff unless explicitly asked not to.

Final output expectations:
- Summarize the closed loop that now works.
- Mention any remaining product-rule gaps separately from implemented behavior.
- Keep follow-up recommendations focused on the next smallest slice.
```
