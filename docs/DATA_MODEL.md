# Data Model

## Modeling Approach

Piggy Days is relational:

- Tasks and check-ins are one-to-one.
- Shopping lists have many items.
- Retailers have many products, price snapshots, and deals.
- Farm rewards are events linked back to tasks or reviews.
- Reviews become memory cards.

The important design choice is that farm progress should be explainable. Instead of only storing `feed = 12`, Piggy Days stores events such as "Complete task: Feed +1". The summary can be derived from event history.

## Current Prisma Models

### `Task`

Represents something we plan or complete.

Important fields:

- `title`
- `category`
- `description`
- `place`
- `plannedDate`
- `status`
- `completedAt`

Relationships:

- Optional `CheckIn`
- Many `FarmEvent`

### `CheckIn`

Represents proof or memory after completing a task.

Important fields:

- `photoUrl`
- `note`
- `costCents`
- `place`

V1 can store `photoUrl` as a placeholder. S3 upload can come later.

### `FarmEvent`

Immutable record of farm progress.

Important fields:

- `resource`: `FEED`, `SEEDS`, or `COINS`
- `amount`
- `reason`
- optional `taskId`
- optional `reviewId`

This is the core game economy ledger.

### `ShoppingList` and `ShoppingItem`

Represents the household shopping workflow.

Important fields:

- Item name.
- Quantity.
- Bought state.
- Estimated price.
- Recommended retailer.

### `Retailer`, `Product`, `PriceSnapshot`, `Deal`

Represents cached supermarket data.

Important fields:

- Retailer code: `COLES`, `WOOLWORTHS`, `ALDI`
- Product name, brand, size.
- Current price and unit price.
- Historical price snapshots.
- Deal price and validity window.

The app searches local cached data instead of scraping live during user search.

### `ReviewCard`

Represents a manually generated memory summary.

Important fields:

- Date range.
- Summary.
- Completed task count.
- Places visited.
- Money spent.
- Estimated grocery savings.
- Suggested next task.

Review cards show on the farm memory wall.

## Derived Farm Summary

Farm summary can be derived from:

- Sum `FarmEvent.amount` by resource.
- Recent `FarmEvent` records.
- XP from event/task/review rules.
- Unlocks from level.
- Memory cards from `ReviewCard`.

V1 can start with a simple computed response. If performance matters later, add a `FarmState` table as a cache.

## Future Tables

Add only when needed:

- `Piggy`: names, mood, outfit, preferences.
- `FarmDecoration`: unlocked and placed decorations.
- `FarmPlant`: planted seeds and growth stage.
- `Quest`: suggested tasks generated from reviews or weekly themes.
- `HouseholdSettings`: family password hash and selected farm theme.

## Money

Store all money as integer cents:

- `costCents`
- `estimatedPriceCents`
- `currentPriceCents`
- `unitPriceCents`
- `grocerySavingsCents`

This avoids floating-point rounding issues.

## Privacy

The first version is private:

- No formal accounts.
- No social graph.
- No invitations.
- One shared family gate.

If real photos are added later, S3 object keys should avoid leaking personal titles or places.
