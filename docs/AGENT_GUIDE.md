# Agent Guide

## Rule

Read the product docs before changing code.

Important docs:

- `docs/PRODUCT_BRIEF.md`
- `docs/MVP_PLAN.md`
- `docs/TODO.md`
- `docs/TECH_STACK.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/API_CONTRACT.md`

## Current Product Priority

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

Do not let old farm-game or shopping-comparison ideas pull work ahead of the todo/checklist reward loop.

## Iteration Rules

- Keep user-facing changes small.
- Prefer one route, one workflow, or one main behavior per slice.
- Use `docs/UX_TESTING_GUIDE.md` before shaping visible UI.
- Include a short wife-test script in the final summary for user-facing work.
- Do not bundle app shell, schema changes, API persistence, and visual polish into one oversized change unless explicitly requested.
- If a feature needs real UX feedback, stop after the testable slice and summarize what to test next.

## Pre-Work Checkpoint

Before starting the next implementation slice, do not jump straight into code.

First write a checkpoint that is useful for discussion, not just a task list.

Use this structure:

1. What Has Already Been Done
   - Summarize the current product/code/doc state relevant to this next step.
   - Mention existing prototypes, routes, docs, or unfinished work.
2. What The Current Requirement Is
   - Restate the user's latest product requirement in plain language.
   - Point out any changed priority or assumption.
3. What The Next Recommended Slice Is
   - Name the smallest next slice.
   - Explain why it is the right next slice now.
4. What Will Be Implemented
   - Break down the behavior/UI/data that the slice needs.
   - Identify what will be mock, local-only, or persisted.
5. What Is Out Of Scope This Time
   - Explicitly keep tempting but premature work out of scope.
6. Details To Confirm Together
   - List UX/product questions the user may want to change before coding.
7. How To Test Afterward
   - Include a short wife-test scenario and pass/fail signals.
8. User Options
   - Offer clear next actions, usually:
     - continue discussing details
     - update docs/notes first
     - start implementation

Then wait for the user to confirm, adjust, or add requirements when the change affects product behavior, route structure, UI copy, rewards, task flow, or data model.

If the user is still thinking through details, stay in analysis/planning mode and update docs or notes as needed. Only implement after the next slice is clear enough.

## Language Rules

- Default app UI is Simplified Chinese.
- English is a secondary UI language.
- Write Chinese copy first.
- Write English copy as a separate natural version.
- Do not auto-translate user-entered task titles, notes, places, or memories.
- Put reusable system copy into the i18n dictionary.

## Route Rules

Use one `apps/web` PWA with routes. Do not split into multiple frontend apps.

Initial routes:

- `/today`
- `/tasks`
- `/tasks/[id]`
- `/fund`
- `/farm`
- `/kitchen`
- `/settings`

Later:

- `/explore`
- `/review`
- `/memories`
- `/shop`

## Directory Ownership

When using multiple agents, keep ownership clear.

### Main Agent

Owns:

- Root config.
- `docs/**`.
- Workspace setup.
- Integration decisions.
- Final merge/check.

### Frontend Agent

Owns:

- `apps/web/**`.
- `packages/ui/**`.

Focus:

- App shell.
- Routes.
- Chinese-first UI.
- i18n dictionary.
- Todo, Fund, Farm, Kitchen, Settings screens.

Does not touch:

- `apps/api/**`.
- `apps/scraper/**`.
- Prisma schema unless asked.

### Backend Agent

Owns:

- `apps/api/**`.
- `packages/core/**`.
- `packages/database/**`.

Focus:

- Family gate.
- Household users.
- Tasks.
- Checklist items.
- Check-ins.
- Coin events.
- Piggy Fund summary.
- Leaderboard.
- Reviews.

Does not touch:

- `apps/web/**`.
- `packages/ui/**`.

### Kitchen Agent

Owns when assigned:

- `apps/web/features/kitchen/**`.
- `packages/core/src/kitchen/**`.
- Later API/database kitchen modules.

Focus:

- Deterministic dinner recommendation.
- Cooking checklist conversion.
- Low-friction household inventory.

### Explore Agent

Owns when assigned:

- `apps/web/features/explore/**`.
- `packages/core/src/explore/**`.
- Later API explore modules.

Focus:

- Local checklist templates.
- Editable outing checklist drafts.
- No Google Places or AI until later.

### Scraper Agent

Owns later:

- `apps/scraper/**`.
- `packages/core/src/pricing/**`.

Do not start scraper work until manual shopping exists and the task/fund loop is useful.

## First Implementation Plan

Do not start with many agents.

Start with:

1. Frontend/app shell work:
   - routes
   - navigation
   - i18n
   - move Farm and Kitchen to their routes
2. Backend/data model work:
   - `HouseholdUser`
   - `Task`
   - `ChecklistItem`
   - `CoinEvent`
3. Integration work:
   - task completion
   - coin event creation
   - fund summary
   - leaderboard

Add Explore, Kitchen persistence, Review, Shopping, Scraper, AI, and richer Farm after this.

## Verification

Use the broad check before finishing meaningful repo changes:

```bash
pnpm check
```

For targeted work, at least run the relevant command:

- Web UI: `pnpm --filter @piggy-days/web build`
- API/core/database: `pnpm typecheck` and `pnpm test`
- Prisma changes: `pnpm db:generate`

## Agent Prompt Examples

### Frontend Agent

You are responsible for Piggy Days frontend. Read docs first. Only modify `apps/web/**` and `packages/ui/**`. Build a mobile-first Next.js App Router shell with default Chinese UI, English toggle, and routes for Today, Tasks, Fund, Farm, Kitchen, and Settings. Move existing Farm and Kitchen prototypes to their routes. Do not modify backend, Prisma, or scraper code.

### Backend Agent

You are responsible for Piggy Days backend. Read docs first. Only modify `apps/api/**`, `packages/core/**`, and `packages/database/**`. Implement household users, tasks, checklist items, check-ins, coin events, Piggy Fund summary, and leaderboard using Express, Zod, Prisma, and pure domain helpers. Do not modify frontend UI.

### Explore Agent

You are responsible for Piggy Days Explore checklist workflow. Read docs first. Build local deterministic outing checklist templates and editable checklist drafts. Do not use Google Places or AI yet.

### Kitchen Agent

You are responsible for Piggy Kitchen. Read docs first. Keep it low-friction and deterministic. Convert selected dinner plans into editable cooking checklist tasks. Do not add internet recipes, nutrition tracking, barcode scanning, or AI yet.
