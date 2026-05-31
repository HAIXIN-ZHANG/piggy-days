# Piggy Days Product Brief

## Product

Piggy Days is a private bilingual PWA for two people. It helps us record daily tasks, turn outings and cooking into editable checklists, complete real-life actions, earn Piggy Coins, grow a shared Piggy Fund, and preserve weekly memories.

The first version is only for me and my wife.

## Positioning

> A private todo and checklist game for our real life: daily tasks, couple outings, cooking plans, Piggy Coins, Piggy Fund, and memories.

## Current Priority

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

The piggy farm is still important, but it is the reward surface rather than the first product engine. Detailed piggy care, decoration, and farm economy should come after the task/checklist reward loop works.

## Core Principles

- Keep the first version simple and useful at home.
- Build for two people first.
- Default to Simplified Chinese.
- Support switching the UI between Chinese and English.
- No formal account system in v1.
- No social feed, invitations, or multiple households.
- Store reward history as explainable events, not only mutable counters.
- Use local templates and deterministic logic before adding AI or external APIs.
- Build in small user-testable slices, then let real home use guide the next change.
- Prioritize a working MVP over a complete platform.

## Core Modules

### 1. App Shell and Navigation

Piggy Days should feel like one coherent app, not many separate apps.

Start with these routes:

- `/today`: daily home, quick entry, fund snapshot, leaderboard snapshot.
- `/tasks`: simple tasks and checklist tasks.
- `/tasks/[id]`: task detail, checklist, completion flow, check-ins.
- `/fund`: Piggy Fund, coin ledger, leaderboard.
- `/farm`: lightweight piggy reward and memory surface.
- `/kitchen`: dinner planning and cooking checklist.
- `/settings`: language, current user, session.

Primary navigation should start small:

- 今天.
- 任务.
- 基金.
- 小猪.
- 设置.

Routes can exist before they are primary navigation items. Kitchen can start as a secondary/prototype entry; Explore, Review, Memories, and Shop should stay hidden or secondary until they are useful enough for repeated use.

Later routes:

- `/explore`: outing checklist generator.
- `/review`: weekly review generation.
- `/memories`: memory wall.
- `/shop`: manual shopping and later comparison.

### 2. Language and Localization

The app should feel natural in Chinese first, not like translated enterprise software.

V1 requirements:

- Default UI language: Simplified Chinese.
- Secondary UI language: English.
- Add a simple language toggle.
- Store selected language locally.
- Keep user-created task titles, notes, places, and memories exactly as entered.
- Localize built-in navigation, buttons, empty states, task categories, checklist templates, validation messages, reward labels, and review summaries.
- Write Chinese copy first and English copy as a separate natural version.

Out of scope for v1:

- More than two languages.
- Per-user cloud-synced language preferences.
- Automatic translation of user-entered content.

### 3. Family Password Gate

V1 does not need registration or login.

- User enters one shared family password.
- App stores a lightweight local session token.
- Backend checks `x-family-token` on protected API calls.
- Proper auth can come later only if the app grows beyond two people.

### 4. Two People and Leaderboard

V1 has two built-in household users:

- Me.
- Wife.

The app should track:

- Who created a task.
- Who owns or is assigned to it.
- Who completed it.
- Who earned coins.

Leaderboard rules:

- Show weekly earned coins.
- Show all-time earned coins.
- Ranking is based on earned coins, not remaining fund balance.
- Spending or redeeming Piggy Fund should not lower someone's historical leaderboard score.

### 5. Todo and Checklist Tasks

Tasks are the main product engine.

Task categories:

- Daily.
- Cooking.
- Explore.
- Chore.
- Date.
- Shopping.
- Other.

Simple task fields:

- Title.
- Category.
- Description.
- Place.
- Planned date.
- Status: todo, in progress, completed.
- Created by.
- Assigned to: me, wife, or both.
- Completed by.
- Piggy Coin reward amount.

Checklist task fields:

- Parent task.
- Ordered checklist items.
- Optional place or note per item.
- Status per item.
- Optional Piggy Coin reward per item.

Reward behavior:

- A simple task can earn coins when completed.
- A checklist item can earn coins when completed.
- A parent checklist task can optionally earn extra coins when all items are done.
- Completion can include a note, cost, place, or photo URL placeholder.

### 6. Piggy Coins and Piggy Fund

Piggy Coins are earned from real-life actions.

Piggy Fund is the shared reward balance derived from coin events and optional redemption events. V1 can treat one coin as one fund unit. More conversion rules can come later.

Reward sources:

- Completing a daily task.
- Completing a checklist item.
- Completing a cooking checklist.
- Completing an explore checklist.
- Generating a weekly review if we want a small ritual bonus.
- Later: shopping savings.

The fund should be explainable. Every balance change should point back to an event.

### 7. Explore Checklists

Explore is not a travel app. It turns "what should we do?" into an editable checklist.

Inputs:

- What we want to do.
- Area or destination.
- Mood.
- Time available.
- Budget.
- Preferences such as coffee, food, walk, market, exhibition, or groceries.

V1 output:

- A checklist from local templates.
- Editable steps.
- Optional place and note fields.
- Coin rewards for items or the whole outing.

Examples:

- Try a shop or cafe.
- Visit a park or scenic spot.
- Casual city walk.
- Date outing.
- Grocery-plus-outing.

Google Places and AI come later.

### 8. Piggy Kitchen

Piggy Kitchen is a private meal decision helper for two people. It is not a generic recipe app.

It helps us:

- Record leftovers, fresh ingredients, pantry staples, and soon-to-expire food.
- Decide what to eat tonight from what is already at home.
- Match dinner ideas to people count, appetite, leftover intention, and cooking energy.
- Turn a selected dinner plan into an editable cooking checklist.
- Complete cooking and earn Piggy Coins.
- Work backwards from dinner into a practical shopping gap list.

V1 should use:

- Manual item entry.
- Quick-add common items.
- Simple status labels: eat soon, normal, freezer, tired of it.
- A small home dish library.
- Deterministic recommendation logic.

AI recipes, nutrition tracking, barcode scanning, and strict stock control are later ideas.

### 9. Weekly Review and Memory Wall

Reviews are manually triggered.

Ranges:

- Past 1 week.
- Past 2 weeks.
- Past 1 month.
- Custom range.

The review summarizes:

- Completed tasks.
- Completed checklist items.
- Places visited.
- Food cooked.
- Money spent when recorded.
- Piggy Coins earned.
- Piggy Fund changes.
- Leaderboard for the selected period.
- Things worth doing again.
- One suggested task for next week.

Saved reviews become memory cards. The memory wall can live on `/memories` later and be previewed on `/farm`.

### 10. Shopping

Shopping is useful but not urgent.

Manual shopping can come after Todo, Explore, Kitchen, Fund, Review, and Memory:

- Create shopping list.
- Add items manually.
- Mark bought/unbought.
- Track estimated price.
- Manually record estimated savings.
- Optionally convert savings into Piggy Coins or Piggy Fund adjustment.

Later shopping comparison:

- Coles.
- Woolworths.
- ALDI.
- Cached products and deals.
- Whole-list comparison.
- Destination-based shopping advice.

### 11. Piggy Farm

The piggy farm is the emotional reward layer.

Near-term role:

- Show two piggies.
- Show Piggy Coins/Fund and recent rewards.
- Show simple mood/dialogue.
- Preview memory cards.
- Make completed tasks feel visible and cute.

Later role:

- Feed, plant, decorate.
- Unlock outfits and farm zones.
- Show richer animations.
- Add walkable co-op map only after the real-life task loop is stable.

## Not In V1

- Formal accounts.
- Cognito.
- Friend invitations.
- Multiple households.
- Social feed.
- Complex pet simulation.
- Detailed farm economy.
- Walkable co-op world.
- Real supermarket scraping.
- Google Places integration.
- OpenAI-generated plans.
- More than Chinese and English.
- Automatic translation of user-entered content.
- Push notifications.
- Full offline sync.
- Kubernetes, EKS, AKS, MongoDB, or heavy EC2 setup.
