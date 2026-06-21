# MVP Plan

## Goal

Build the smallest useful version of Piggy Days that we can actually use at home:

> a bilingual two-person todo/checklist app where completed real-life actions earn Piggy Coins, grow a shared Piggy Fund, and become weekly memories.

## MVP Shape

The MVP should feel like a real app before it becomes a rich game.

## Iteration Style

Build small user-testable slices. A slice should usually change one main behavior, one route, or one workflow. After each user-facing slice, run it locally and let wife test the realistic scenario before expanding scope.

Use `docs/UX_TESTING_GUIDE.md` for slice definition, wife-test prompts, and feature-specific UX notes.

Feature exposure should follow maturity:

```txt
planned -> route-only -> prototype -> beta -> active
```

Only `active` features belong in primary navigation. `prototype` and `beta` features can be reached from `/today`, `/settings`, or direct links while they are being tested.

### Required First Screens

#### App Shell

- Default Simplified Chinese UI.
- English toggle.
- Mobile-first bottom navigation.
- Desktop-friendly layout.
- `/` redirects to `/today`.
- Primary nav starts small: Today, Tasks, Fund, Piggy Home, Settings.
- Kitchen can stay as a secondary/prototype entry until daily use proves it belongs in primary nav.

#### Today

- Quick task entry.
- Today's todo/checklist snapshot.
- Piggy Fund snapshot.
- Weekly leaderboard snapshot.
- Recent reward events.

#### Tasks

- Create simple tasks.
- Create checklist tasks.
- Assign to me, wife, or both.
- Set custom Piggy Coin reward per task.
- Set optional coin reward per checklist item.
- List todo, in-progress, and completed tasks.
- Complete task or checklist item with optional note, place, cost, and photo URL placeholder.

#### Fund

- Show current Piggy Fund balance.
- Show recent coin events.
- Show weekly leaderboard.
- Show all-time leaderboard.
- Support manual redemption or adjustment later.

#### Settings

- Pick current user: me or wife.
- Switch language: Chinese or English.
- Store choices locally.
- Logout from family session later.

#### Farm

- Show the current farm prototype as a lightweight reward surface.
- Show Piggy Coins/Fund and recent rewards.
- Show memory preview.
- Detailed feeding/planting/decorating comes later.

#### Kitchen

- Keep the current Piggy Kitchen prototype.
- Later convert selected dinner plans into cooking checklist tasks.

### Later Screens

#### Explore

- Enter what we want to do.
- Generate a basic editable checklist from local templates.
- Complete checklist items for Piggy Coins.

#### Review

- Pick a date range.
- Summarize completed tasks, checklists, food cooked, places visited, coins earned, and leaderboard.
- Save a review card.

#### Memories

- Show saved review cards.
- Group by date range or month.

#### Shop

- Manual shopping list first.
- Product/deal comparison later.

## Build Order

### Phase 0: Stabilize Current Work

- [x] Keep the current Farm prototype.
- [x] Keep the current Kitchen prototype.
- [x] Keep docs as the source of product truth.
- [x] Run `pnpm check` before treating the baseline as stable.

### Phase 1A: App Shell, Routes, and i18n

Status: completed.

- [x] Add route skeleton:
  - `/today`
  - `/tasks`
  - `/tasks/[id]`
  - `/fund`
  - `/farm`
  - `/kitchen`
  - `/settings`
- [x] Add mobile-first navigation.
- [x] Add page titles and basic empty states.
- [x] Move Farm prototype to `/farm`.
- [x] Move Kitchen prototype to `/kitchen`.
- [x] Add a lightweight local i18n dictionary:
  - `zh-CN`
  - `en`
- [x] Default to `zh-CN`.
- [x] Store selected language in local storage.
- [x] Keep user-entered content unchanged.

### Phase 1B: Data Model for Todo and Coins

- [x] Add `HouseholdUser`.
- [x] Extend `Task` for simple-task ownership, assignment, completion, and `coinValue`.
- [x] Keep `CheckIn` for task completion details.
- [x] Add `CoinEvent`.
- [x] Seed/upsert two users: me and wife.
- [x] Add custom `coinValue` on simple tasks.
- [x] Keep coin events immutable.
- [x] Derive Piggy Fund and leaderboard from coin events.
- [ ] Add `ChecklistItem`.
- [ ] Add custom `coinValue` on checklist items.

### Phase 1C: Persistent Todo and Piggy Coins

- [x] Implement simple task create/list/detail.
- [x] Implement simple task completion with check-in fields.
- [x] Award coins from simple task completion.
- [x] Show Piggy Fund summary.
- [x] Show weekly and all-time leaderboard.
- [x] Add core tests for task completion, coin events, fund summary, and leaderboard totals.
- [x] Browser-verify create task -> complete task -> CoinEvent -> fund -> leaderboard -> today.
- [ ] Add focused API tests for create task, complete task, fund summary, and leaderboard.
- [ ] Implement checklist item create/update/complete.
- [ ] Award coins from checklist item completion.

### Phase 2: Explore Checklists

- Add local checklist templates.
- Generate editable exploration checklists.
- Allow user edits before starting.
- Award coins per item or on full completion.
- Keep Google Places and AI out of this phase.

### Phase 3: Kitchen as Checklist

- Convert selected dinner plan into an editable cooking checklist.
- Award coins for cooking completion.
- Persist kitchen items only when the prototype workflow feels useful.
- Keep deterministic recommendations as the default.

### Phase 4: Weekly Review and Memory Wall

- Generate deterministic summary from stored tasks, checklist items, kitchen activity, explore activity, check-ins, and coin events.
- Save `ReviewCard`.
- Show memory cards.
- Show review-period leaderboard.
- Add optional small coin bonus for completing review ritual.

### Phase 5: Manual Shopping

- Add manual shopping list.
- Track bought/unbought.
- Track estimated prices and optional savings.
- Convert selected savings into Piggy Coins or Piggy Fund adjustment.
- Keep real retailer data later.

### Phase 6: Farm Details, External Data, AI, and Deployment

- Feed, plant, decorate, outfits, and richer piggy behavior.
- Real supermarket cache and scraper.
- Google Places facts.
- OpenAI-assisted review and outing explanations.
- PWA polish and deployment.

## First Useful Local Version

The first useful local version should support:

- Default Chinese UI and English switch.
- Route shell with mobile navigation.
- Current user selection.
- Create a simple task.
- Set the task's Piggy Coin reward.
- Complete the task with optional check-in fields.
- See Piggy Fund increase.
- See weekly and all-time leaderboard update.
- View the Farm as a lightweight reward surface.
- View the Kitchen prototype on its own route.

No real scraper, Google Places integration, OpenAI integration, detailed farm economy, or formal accounts are required.
