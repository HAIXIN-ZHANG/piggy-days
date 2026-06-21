# Data Model

## Modeling Approach

Piggy Days is relational and event-led.

Core facts:

- Two household users are enough for v1.
- Tasks can be simple tasks or checklist parent tasks.
- Checklist tasks have many ordered checklist items.
- Tasks can have optional check-ins.
- Piggy Coin rewards are immutable ledger events.
- Piggy Fund balance is derived from earned and redeemed coin events.
- Leaderboards are derived from positive coin events.
- Reviews become memory cards.
- Farm display is a projection from coins, reviews, and later farm-specific events.

The important design choice is explainability. Instead of only storing `fundBalance = 120`, store events such as `Complete cafe checklist item: Coins +5`. The app can then derive fund balance, leaderboard, review summaries, and farm visuals from the same history.

## Current Schema Status

The current Prisma schema already includes:

- `HouseholdUser`
- `Task`
- `CheckIn`
- `CoinEvent`
- `FarmEvent`
- `ShoppingList`
- `ShoppingItem`
- `Retailer`
- `Product`
- `PriceSnapshot`
- `Deal`
- `ReviewCard`

Task rewards now use `CoinEvent` as the reward source of truth. `FarmEvent` remains available for later farm-specific projection events, not for the first task reward ledger.

The next schema gap is `ChecklistItem`.

## Current Core Models

### `HouseholdUser`

V1 has two built-in users.

Important fields:

- `id`
- `name`
- `displayName`
- `avatarLabel`
- `sortOrder`
- `createdAt`
- `updatedAt`

Avoid formal accounts, email login, and multiple households until much later.

### `Task`

Represents a simple todo or a parent checklist task.

Important fields:

- `id`
- `type`: simple or checklist.
- `title`
- `category`: daily, cooking, explore, chore, date, shopping, other.
- `description`
- `place`
- `plannedDate`
- `status`: todo, in progress, completed.
- `createdByUserId`
- `assignedTo`: me, wife, or both.
- `completedByUserId`
- `coinValue`
- `completedAt`
- `createdAt`
- `updatedAt`

Relationships:

- Optional `CheckIn`.
- Many `ChecklistItem` later.
- Many `CoinEvent`.

### `CheckIn`

Represents proof or memory after completing a task.

Important fields:

- `id`
- `taskId`
- `photoUrl`
- `note`
- `costCents`
- `place`
- `createdAt`

V1 can store `photoUrl` as a placeholder. S3 upload can come later.

### `CoinEvent`

Immutable record of earned or redeemed Piggy Coins.

Important fields:

- `id`
- `amount`: positive for earning, negative for redemption or correction.
- `reason`
- `sourceType`: task, checklist item, kitchen, explore, review, shopping, manual adjustment.
- `taskId`
- `earnedByUserId`
- `createdByUserId`
- `createdAt`

This is the main reward ledger. Piggy Fund and leaderboards are derived from this table.

## Next Priority Model

### `ChecklistItem`

Represents one step inside an explore, cooking, date, chore, or shopping checklist.

Important fields:

- `id`
- `taskId`
- `title`
- `description`
- `place`
- `sortOrder`
- `status`
- `completedAt`
- `completedByUserId`
- `coinValue`
- `createdAt`
- `updatedAt`

Checklist items should be editable before and during the task. Completing an item can award coins immediately.

## Later Model Updates

### `ReviewCard`

Represents a manually generated memory summary.

The current schema has the first review-card foundation. Later review work can add the richer summary fields below.

Important fields:

- `id`
- `rangeStart`
- `rangeEnd`
- `summary`
- `completedTaskCount`
- `completedChecklistItemCount`
- `placesVisited`
- `foodCooked`
- `moneySpentCents`
- `piggyCoinsEarned`
- `fundDelta`
- `leaderboardSnapshot`
- `thingsWorthRepeating`
- `suggestedNextTask`
- `createdAt`

Review cards show in `/memories` later and preview on `/farm`.

## Derived Values

### Piggy Fund

Derived from:

- Sum of all `CoinEvent.amount`.

Useful summaries:

- Current balance.
- Earned all time.
- Redeemed all time.
- Earned this week.
- Recent events.

### Leaderboard

Derived from:

- Sum of positive `CoinEvent.amount` grouped by `earnedByUserId`.

Rules:

- Weekly leaderboard uses date range for current week.
- All-time leaderboard uses all positive coin events.
- Negative redemption events should not reduce earned leaderboard score.

### Task Progress

For checklist tasks:

- Total item count.
- Completed item count.
- Percent complete.
- Parent task can complete when all checklist items are complete.

### Farm Summary

Near-term farm summary can be derived from:

- Piggy Fund balance.
- Recent positive coin events.
- Review cards.
- Optional farm-specific events.

Detailed farm resources such as Feed, Seeds, Hearts, plants, and decorations are later projections, not the first reward source of truth.

## Kitchen Models

Piggy Kitchen should start as a simple household inventory and dish library, not a strict warehouse system.

Suggested models when persistence is needed:

- `KitchenItem`: leftovers, fresh ingredients, pantry staples, and condiments.
- `HomeDish`: dishes we already know how to cook.
- `HomeDishIngredient`: required and optional ingredients for a dish.
- `MealPlan`: saved dinner recommendation or selected dinner idea.

Important `KitchenItem` fields:

- `name`
- `category`: leftover, fresh, staple, condiment.
- `quantityLabel`
- `servings`
- `addedAt`
- `expiresAt`
- `status`: eat soon, normal, freezer, tired.
- `notes`

V1 can keep the dish library in `@piggy-days/core` until the kitchen loop feels useful enough to persist.

## Shopping Models

Shopping is later.

Current schema already includes:

- `ShoppingList`
- `ShoppingItem`
- `Retailer`
- `Product`
- `PriceSnapshot`
- `Deal`

Use these after the task/checklist/fund loop is stable.

## Language Preference

V1 can store selected app language in browser local storage.

Default:

- `zh-CN`

Supported:

- `zh-CN`
- `en`

Do not add account-level or cloud-synced locale settings until there is a real need. If language preference later needs to sync across devices, add it to `HouseholdSettings` rather than adding formal user accounts.

## Future Tables

Add only when needed:

- `Piggy`: names, mood, outfit, preferences.
- `FarmDecoration`: unlocked and placed decorations.
- `FarmPlant`: planted seeds and growth stage.
- `Quest`: suggested tasks generated from reviews or weekly themes.
- `HouseholdSettings`: family password hash, selected farm theme, later shared locale.

## Money

Store money as integer cents:

- `costCents`
- `estimatedPriceCents`
- `currentPriceCents`
- `unitPriceCents`
- `grocerySavingsCents`

This avoids floating-point rounding issues.

Piggy Coins are separate integer units, not cents.

## Privacy

The first version is private:

- No formal accounts.
- No social graph.
- No invitations.
- One shared family gate.

If real photos are added later, S3 object keys should avoid leaking personal titles or places.
