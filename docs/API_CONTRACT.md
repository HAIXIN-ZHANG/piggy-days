# API Contract

## Base URL

Local:

```txt
http://localhost:4000
```

## Auth

Protected routes use a lightweight family token:

```txt
x-family-token: <FAMILY_API_TOKEN>
```

If `FAMILY_API_TOKEN` is not configured locally, protected routes can run without the header during early development.

Future login route:

```txt
POST /api/auth/family-login
```

V1 should not add formal accounts.

## Locale

UI language is frontend-owned in v1.

- Default: `zh-CN`.
- Supported: `zh-CN`, `en`.
- Store selected locale in local storage.
- Do not auto-translate user-entered content.

The API can accept an optional `Accept-Language` or `x-locale` later for generated system text, but it is not required for the first persistence milestone.

## Response Shape

Successful responses return JSON objects directly.

Errors use:

```json
{
  "error": "Human readable message."
}
```

Validation errors use:

```json
{
  "error": "Invalid request body.",
  "details": []
}
```

List endpoints that can grow should use cursor pagination:

```json
{
  "items": [],
  "nextCursor": null
}
```

For early endpoints that already return named arrays, keep stable shapes such as `{ "tasks": [] }` until the API is migrated deliberately.

## Health

### `GET /health`

Returns:

```json
{
  "ok": true,
  "service": "piggy-days-api"
}
```

## Auth Planned

### `POST /api/auth/family-login`

Body:

```json
{
  "password": "family password"
}
```

Returns:

```json
{
  "token": "family-session-token"
}
```

## People Planned

V1 has two built-in household users.

### `GET /api/people`

Protected.

Returns:

```json
{
  "people": [
    {
      "id": "me",
      "displayName": "Me",
      "avatarLabel": "Me"
    },
    {
      "id": "wife",
      "displayName": "Piggy",
      "avatarLabel": "Piggy"
    }
  ]
}
```

## Tasks

The current route is prototype-only. The next implementation pass should persist tasks and coin events.

### `GET /api/tasks`

Protected.

Query options:

```txt
status=todo|in_progress|completed|all
assignedTo=me|wife|both
category=daily|cooking|explore|chore|date|shopping|other
limit=30
cursor=<cursor>
```

Returns:

```json
{
  "tasks": [
    {
      "id": "task_123",
      "type": "simple",
      "title": "Take out trash",
      "category": "chore",
      "status": "todo",
      "assignedTo": "me",
      "coinValue": 5,
      "plannedDate": "2026-06-01T10:00:00.000Z",
      "createdAt": "2026-05-31T10:00:00.000Z",
      "updatedAt": "2026-05-31T10:00:00.000Z"
    }
  ],
  "nextCursor": null
}
```

### `POST /api/tasks`

Protected.

Body:

```json
{
  "type": "simple",
  "title": "Take out trash",
  "category": "chore",
  "description": "Do it before we go out tonight",
  "place": "Home",
  "plannedDate": "2026-06-01T10:00:00.000Z",
  "createdByUserId": "me",
  "assignedTo": "me",
  "coinValue": 5
}
```

Required:

- `title`
- `createdByUserId`
- `assignedTo`
- `coinValue`

Optional:

- `type`
- `category`
- `description`
- `place`
- `plannedDate`

Returns:

```json
{
  "task": {
    "id": "task_123",
    "type": "simple",
    "title": "Take out trash",
    "status": "todo",
    "coinValue": 5
  }
}
```

### `GET /api/tasks/:taskId`

Protected.

Returns task detail and checklist items:

```json
{
  "task": {
    "id": "task_123",
    "type": "checklist",
    "title": "Weekend cafe visit",
    "status": "in_progress",
    "coinValue": 10
  },
  "checklistItems": [
    {
      "id": "item_1",
      "title": "Pick a place",
      "status": "completed",
      "coinValue": 2,
      "sortOrder": 1
    }
  ]
}
```

### `POST /api/tasks/:taskId/complete`

Protected.

Body:

```json
{
  "completedByUserId": "me",
  "note": "Done after dinner",
  "costCents": 0,
  "place": "Home",
  "photoUrl": "https://example.com/photo.jpg"
}
```

Returns:

```json
{
  "task": {
    "id": "task_123",
    "status": "completed",
    "completedAt": "2026-05-31T10:00:00.000Z"
  },
  "checkIn": {
    "note": "Done after dinner",
    "costCents": 0,
    "place": "Home",
    "photoUrl": "https://example.com/photo.jpg"
  },
  "coinEvent": {
    "id": "coin_123",
    "amount": 5,
    "reason": "Complete task",
    "sourceType": "task",
    "earnedByUserId": "me"
  }
}
```

## Checklist Items Planned

### `POST /api/tasks/:taskId/checklist-items`

Protected.

Body:

```json
{
  "title": "Take a photo",
  "description": "Keep it as a weekend memory",
  "place": "Kings Park",
  "coinValue": 3,
  "sortOrder": 2
}
```

### `PATCH /api/checklist-items/:itemId`

Protected.

Updates title, description, place, sort order, status, or coin value.

### `POST /api/checklist-items/:itemId/complete`

Protected.

Body:

```json
{
  "completedByUserId": "wife",
  "note": "The photo looks great"
}
```

Returns completed item and created `CoinEvent`.

## Fund and Coins Planned

### `GET /api/fund/summary`

Protected.

Returns:

```json
{
  "balance": 42,
  "earnedAllTime": 80,
  "redeemedAllTime": 38,
  "recentEvents": [
    {
      "id": "coin_123",
      "amount": 5,
      "reason": "Complete task",
      "sourceType": "task",
      "earnedByUserId": "me",
      "createdAt": "2026-05-31T10:00:00.000Z"
    }
  ]
}
```

### `GET /api/coins/events`

Protected.

Query options:

```txt
limit=30
cursor=<cursor>
sourceType=task|checklist_item|kitchen|explore|review|shopping|manual
userId=me|wife
```

### `POST /api/coins/adjustments`

Protected.

For manual fund adjustments or redemptions.

Body:

```json
{
  "amount": -20,
  "reason": "Redeem a small weekend treat",
  "createdByUserId": "me"
}
```

## Leaderboard Planned

### `GET /api/leaderboard`

Protected.

Query options:

```txt
range=week|month|all
```

Returns:

```json
{
  "range": "week",
  "leaders": [
    {
      "userId": "me",
      "displayName": "Me",
      "earnedCoins": 18
    },
    {
      "userId": "wife",
      "displayName": "Piggy",
      "earnedCoins": 15
    }
  ]
}
```

## Explore Planned

V1 Explore should use local templates, not Google Places or AI.

### `POST /api/explore/checklist-template`

Protected.

Body:

```json
{
  "intent": "try_cafe",
  "area": "Fremantle",
  "mood": "relaxed",
  "budgetCents": 5000,
  "createdByUserId": "me",
  "assignedTo": "both"
}
```

Returns an editable checklist draft. The user can save it as a task.

## Kitchen

Kitchen routes can remain mock/local until the workflow proves useful.

### `GET /api/kitchen/items`

Protected.

Returns fridge, leftovers, pantry staples, and condiments.

### `POST /api/kitchen/items`

Protected.

Creates a manual kitchen item.

### `POST /api/kitchen/recommendations`

Protected.

Returns 2-3 deterministic dinner plans from current items and the home dish library.

### `POST /api/kitchen/plans/:planId/create-task`

Protected. Planned.

Turns a selected dinner plan into a cooking checklist task.

## Reviews Planned

### `POST /api/reviews/generate`

Protected.

Body:

```json
{
  "rangeStart": "2026-05-25T00:00:00.000Z",
  "rangeEnd": "2026-05-31T23:59:59.999Z"
}
```

Returns and saves a `ReviewCard` generated from tasks, checklist items, check-ins, coin events, kitchen tasks, and explore tasks.

## Farm

Farm is a projection in the next product direction, not the source of truth for rewards.

### `GET /api/farm/summary`

Protected.

Current prototype returns `defaultFarmState`.

Future response should derive from coin events, review cards, and optional farm-specific events:

```json
{
  "fundBalance": 42,
  "recentRewards": [],
  "memoryCards": [],
  "piggies": [],
  "dialogue": "Tiny progress today."
}
```

### `POST /api/farm/actions/feed`

Prototype-only. Detailed farm actions come after the task/checklist/fund loop is useful.

## Implementation Notes

- Request validation is done with Zod in route modules.
- Coin/reward rules live in `@piggy-days/core`, not inside route handlers.
- Piggy Fund and leaderboard are derived from immutable coin events.
- Shopping, Google Places, OpenAI, and detailed farm gameplay are later modules.
