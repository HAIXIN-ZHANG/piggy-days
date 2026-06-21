# UX Testing and Small Iteration Guide

## Why This Exists

Piggy Days is a personal daily-use product, not a one-shot demo. Each change should be small enough that we can test it at home, learn from real use, and then decide the next slice.

The default workflow is:

```txt
small slice -> run locally -> wife tests -> note friction -> adjust -> next slice
```

Do not batch too many product decisions into one large change.

## Small Slice Rules

A good slice should usually change one main user behavior.

Prefer:

- One route or one workflow at a time.
- One primary user action.
- One clear before/after.
- One short testing script.
- Mock data first when the interaction is uncertain.

Avoid:

- New data model, new API, new route, heavy redesign, and multiple features all in one change.
- Building polish before the basic workflow is understandable.
- Adding external APIs before local templates prove useful.
- Making the farm richer before the task/checklist/fund loop works.

## Pre-Work Checkpoint

Before implementing any next slice, pause and summarize it with the user.

The checkpoint should make it easy to either continue discussing details or start implementation.

Use this format:

### 1. What Has Already Been Done

- Current relevant product state.
- Existing code/prototypes/routes/docs.
- What is already decided.

### 2. What The Current Requirement Is

- Latest user requirement.
- What changed compared with earlier assumptions.
- Who the feature is for: me, wife, or both.

### 3. What The Next Recommended Slice Is

- Smallest useful next slice.
- Why this slice comes before other tempting work.
- Feature maturity target: `route-only`, `prototype`, `beta`, or `active`.

### 4. What Will Be Implemented

- Route/screen/workflow touched.
- User actions supported.
- UI states needed.
- Data mode: mock, local state, or persisted.
- Copy/i18n requirements.

### 5. What Is Out Of Scope This Time

- Out-of-scope features.
- Integrations to avoid.
- Polish or data work to delay.

### 6. Details To Confirm Together

- Product questions.
- UX copy questions.
- Navigation/exposure questions.
- Reward or data model questions.

### 7. How To Test Afterward

- Wife-test script.
- Pass signals.
- Friction signals.

### 8. User Options

- Continue discussing details.
- Update docs/notes first.
- Start implementation.

This is required for product, UX, routing, reward, task-flow, data-model, and language-copy changes.

Do not treat the roadmap as automatic permission to implement every next item. The user may update requirements before each slice, so the next step should be checked and agreed first.

## Feature Maturity Levels

Every feature should have a maturity level. This lets us build routes and prototypes without forcing unfinished work into daily use.

### `planned`

Only exists in docs.

Use when:

- The idea is useful but not ready for design or implementation.
- We need to preserve direction without creating UI.

Entry rule:

- Add to roadmap or backlog.

Exit rule:

- We can describe one small testable slice.

### `route-only`

The route exists, but the feature is an empty or simple placeholder.

Use when:

- We are shaping information architecture.
- We need to test navigation labels and route placement.

Entry rule:

- Page has a title and short empty state.

Exit rule:

- Wife can find the page and understand what it will be for.

### `prototype`

The feature is clickable with mock or local state.

Use when:

- The interaction is uncertain.
- We want UX feedback before persistence.

Entry rule:

- The primary action can be tried end-to-end without real data.

Exit rule:

- Wife can complete the realistic scenario without explanation.

### `beta`

The feature uses real data, but may still need UX adjustment.

Use when:

- Persistence matters.
- We need to test repeated use over multiple days.

Entry rule:

- Data survives refresh.
- Basic error/loading states exist.

Exit rule:

- The feature is useful enough to use again tomorrow.

### `active`

The feature is part of the daily experience.

Use when:

- It is stable enough to show in primary navigation or `/today`.

Entry rule:

- It has passed at least one realistic home test.
- It does not need explanation.
- It does not break the core task/fund loop.

## Exposure Rules

Do not expose every route equally.

Primary navigation is only for `active` features. Early suggested primary nav:

```txt
Today / Tasks / Fund / Piggy Home / Settings
```

Secondary entries are for `prototype` or `beta` features:

- Cards on `/today`.
- Links in `/settings`.
- Small "Experiments" section.

Hidden routes are fine for `route-only` and early `prototype` work:

- The route may exist.
- It should not appear in primary navigation.
- It can be shared manually for testing.

Move a feature into primary navigation only when the answer is yes:

> Would wife reasonably open this again tomorrow without being asked?

## Slice Definition Template

Before implementing a slice, write down:

- Goal: what should be easier after this?
- User action: what should the user do?
- Route/screen: where does it happen?
- Data: mock, local state, or persisted?
- Not included: what are we explicitly not doing yet?
- Test script: what should wife try?
- Success signal: what would make us keep this direction?
- Friction signal: what would make us revise?

## Wife Testing Rule

Every user-facing slice should be testable without explaining the whole system.

Ask her to try a realistic scenario:

- "Can you add one thing you want us to do?"
- "Can you tell who this task belongs to?"
- "Can you see what reward you get?"
- "Can you complete it?"
- "Can you find where the coins went?"
- "Can you switch language if needed?"

Collect short notes:

- Confusing label.
- Missing button.
- Too many choices.
- Unclear reward.
- Text feels unnatural.
- Page feels too busy.
- She expected something else.

Do not turn every note into immediate scope. Pick the smallest fix that improves the next test.

## Testing Levels

### Level 1: Static Structure

Use when shaping routes and page layout.

Questions:

- Does the page name make sense?
- Is the main action obvious?
- Is the navigation understandable?
- Does Chinese copy feel natural?

### Level 2: Clickable Prototype

Use before persistence.

Questions:

- Can the user complete the flow with mock/local state?
- Are form fields too much?
- Does the reward feel clear?
- Is the success state satisfying?

### Level 3: Real Data Loop

Use after API/database work.

Questions:

- Does data survive refresh?
- Does completion create the right coin event?
- Does the fund balance update?
- Does leaderboard update predictably?

### Level 4: Daily Use

Use after a feature seems usable.

Questions:

- Would we open this again tomorrow?
- Is it faster than writing in Notes?
- Did it create a small emotional reward?
- What is the first annoying repeated action?

## Feature Notes

### App Shell and Routes

Purpose:

- Make the app feel structured before adding more features.

Details to watch:

- `/today` should feel like the daily home, not a marketing page.
- Bottom navigation should be short and Chinese-first.
- Route labels should be familiar:
  - Today
  - Tasks
  - Fund
  - Piggy Home
  - Kitchen
  - Settings
- Avoid too many bottom-nav items at once on mobile.
- Use secondary entry links for later routes such as Review, Memories, Shop.
- Keep page titles smaller than hero text; this is a tool, not a landing page.
- Do not let text overflow in Chinese or English.

Wife test:

- Ask her to open the app and find the task page, kitchen page, and language setting without help.

### Language and Copy

Purpose:

- Make the app feel native to Chinese daily life.

Details to watch:

- Chinese should be written first.
- English should not be a literal translation.
- Keep task/action labels short.
- Avoid formal enterprise words.
- User-entered content is never auto-translated.
- Empty states should suggest one next action, not explain the whole app.

Wife test:

- Ask which words feel weird or too formal.

### Today

Purpose:

- Give one place to start the day.

Details to watch:

- Show only the most useful cards:
  - quick add task
  - today's tasks
  - Piggy Fund
  - weekly leaderboard
  - recent reward
- Do not make it a dense dashboard.
- Primary action should be "add task" or "complete next task".
- Recent rewards should feel warm but not noisy.

Wife test:

- Ask her what she thinks she should tap first.

### Tasks

Purpose:

- Record and complete daily tasks quickly.

Details to watch:

- Creating a simple task should require only:
  - title
  - who
  - coins
- Category, date, place, and note can be optional.
- Provide default coin suggestions such as 1, 3, 5, 10.
- Make assignment obvious: me, wife, both.
- Keep completed tasks visible but not in the way.
- Status filters matter more than page-number pagination.

Wife test:

- Ask her to create a real task in under 30 seconds.
- Ask her to explain what the coin number means.

### Task Detail and Checklist

Purpose:

- Support multi-step plans without making todo entry heavy.

Details to watch:

- Checklist item completion should be inline and fast.
- Each item can have its own coin value, but the UI should not feel like accounting.
- Show progress clearly: 2/5 done.
- Allow editing checklist text before starting.
- Completion should show a small reward confirmation.
- Avoid forcing every task into checklist mode.

Wife test:

- Give her a small outing checklist and ask her to edit one item, complete one item, and find the reward.

### Piggy Coins and Fund

Purpose:

- Make rewards understandable and shared.

Details to watch:

- Separate "earned coins" from "current fund balance".
- Leaderboard should use earned coins.
- Redemptions should reduce fund but not erase leaderboard history.
- Every fund change should have a reason.
- Keep numbers small enough to feel meaningful.
- Avoid creating a stressful competition.

Wife test:

- Ask her where the completed task reward went.
- Ask her whether leaderboard feels fun or pressure-y.

### Explore

Purpose:

- Turn a vague outing idea into a practical checklist.

Details to watch:

- Start with templates, not AI.
- The generated checklist must be editable.
- Avoid pretending we know live ratings or opening status.
- Use practical steps:
  - pick place
  - check opening time
  - travel there
  - take photo
  - write note
  - mark done
- Let users delete irrelevant steps.

Wife test:

- Ask her to enter "Find a park for a weekend walk" and see if the checklist feels useful or silly.

### Kitchen

Purpose:

- Reduce "tonight what do we eat?" friction.

Details to watch:

- Inventory entry must stay lightweight.
- Quick-add is more important than perfect quantities.
- Recommendations should explain why, not just list dishes.
- Selected dinner should become a cooking checklist.
- Missing ingredients should become a shopping gap, not a full shopping system yet.
- Avoid internet recipes and nutrition tracking in early versions.

Wife test:

- Ask her to add two fridge items and pick a dinner plan.
- Ask whether the recommendation feels realistic for your home.

### Review and Memory

Purpose:

- Make the week feel remembered.

Details to watch:

- Review should be manually triggered.
- Start deterministic before AI.
- Summaries should be short and personal.
- Show:
  - completed tasks
  - places visited
  - food cooked
  - coins earned
  - fund changes
  - leaderboard
- Memory cards should feel like a keepsake, not a report.

Wife test:

- Ask if the summary feels like "our week" or like a generated report.

### Farm

Purpose:

- Emotional reward, not the main task engine.

Details to watch:

- Farm should react to coins, reviews, and recent completed actions.
- Do not add complex feeding/planting before todo/fund works.
- Keep piggy dialogue short.
- Farm should feel cute but not childish.
- Memory previews matter more than farm economy in early versions.

Wife test:

- Ask whether the farm makes the completed task feel more satisfying.

### Shopping

Purpose:

- Later support household shopping.

Details to watch:

- Manual list first.
- Bought/unbought state before comparison.
- Estimated savings can be manual at first.
- Real retailer data should wait.
- Do not let shopping delay task/checklist/fund.

Wife test:

- Later, ask if manual shopping is faster than your current habit.

## Stop Conditions

Pause and review before continuing if:

- A page needs explanation before use.
- The same label confuses both of you.
- The flow takes longer than the current workaround.
- The reward feels arbitrary.
- Too many fields appear before the user gets value.
- The feature works technically but does not feel useful.

## Definition of Done for User-Facing Slices

- The slice has one clear user action.
- Chinese UI copy is present.
- English fallback exists if the surface is user-visible.
- Mobile layout works.
- Text does not overflow.
- Empty/loading/error states exist where relevant.
- A short wife-test script is documented or included in the final summary.
- Relevant build/typecheck/test command passes.
