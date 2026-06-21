# Core Loop Review (2026-06-20)

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

## Summary

The product direction is coherent, but the implementation is still a routed prototype rather than a closed MVP loop.

The main issue is not visual quality or build stability. The main issue is that the current code still uses the old farm-reward mental model, while the docs already moved to an event-led `CoinEvent` model.

That means the current app can present the idea of the product, but it cannot yet complete one real household flow from task completion to fund and leaderboard updates.

## Findings

### P0. There is no usable MVP loop yet

The docs define `/today`, `/tasks`, `/tasks/[id]`, and `/fund` as the core MVP path. In practice:

- `/tasks` is still a route placeholder.
- `/tasks/[id]` is still a route placeholder.
- `/fund` is still a route placeholder.
- `/today` shows hardcoded preview cards and explicitly says that real task data will be added in a later slice.

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

### P0. Rewards still use the old farm-resource source of truth

The docs clearly say that `CoinEvent` should be the main reward ledger and that Fund and leaderboard should be derived from it. The current implementation still awards farm resources directly.

Current behavior:

- `POST /api/tasks/:taskId/complete` returns `farm.xp` and farm resource rewards.
- `GET /api/farm/summary` returns a default farm state.
- `/farm` manages `feed`, `seeds`, `coins`, and `xp` entirely in local component state.

Evidence:

- `apps/api/src/modules/tasks/tasks.routes.ts`
- `apps/api/src/modules/farm/farm.routes.ts`
- `apps/web/features/farm/useFarmPrototype.ts`
- `packages/core/src/farm/rewards.ts`

Impact:

- Tasks, Fund, leaderboard, and Farm cannot stay consistent with each other.
- The current reward system is not explainable in the way the docs require.
- The same app now has two competing reward models: documented `CoinEvent` vs implemented farm resources.

### P0. The data model still cannot support the documented two-person coin loop

The documented MVP requires:

- `HouseholdUser`
- task ownership and assignment
- `completedByUserId`
- `coinValue`
- `ChecklistItem`
- immutable `CoinEvent`
- weekly and all-time leaderboard derivation

The current schema does not have those core pieces yet.

Current gaps:

- No `HouseholdUser` model.
- No `ChecklistItem` model.
- No `CoinEvent` model.
- `Task` does not track `createdByUserId`, `assignedTo`, `completedByUserId`, or `coinValue`.
- Task statuses are still only `TODO` and `COMPLETED`, while docs already assume richer flow.
- The shared task category set does not match the documented one.

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

### P1. The secondary prototypes feel more real than the main product engine

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

### P1. The task completion contract still bakes in old outing/shopping assumptions

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

### P2. The current user setting exists only in local UI state

`/settings` already stores `me` or `wife` in local storage, but that identity is not used by the API, not attached to task creation, and not used for reward attribution.

Evidence:

- `apps/web/features/app/SettingsPage.tsx`

Impact:

- The app appears to support two people, but the choice is not connected to any real business action.

### P2. Local dev CORS defaults may drift from the real web port

The API defaults `WEB_ORIGIN` to `http://localhost:3000`, while the web app can move to `3001` when `3000` is occupied.

Evidence:

- `apps/api/src/config/env.ts`

Impact:

- As soon as the web app starts calling the API from a non-3000 dev port, local integration may fail unless env values are adjusted.

This is not the main product issue, but it will become a practical friction point once API wiring starts.

### P2. Some docs are now stale relative to the codebase

The most obvious example is `README.md`, which still describes the app shell as the next milestone even though that route-shell work has already been completed.

Evidence:

- `README.md`

Impact:

- A new implementation agent could pick the wrong starting point if they rely on the README first.

## Recommended Next Slice

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

## Acceptance Criteria For The Next Slice

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

## Prompt For The Implementation Agent

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
