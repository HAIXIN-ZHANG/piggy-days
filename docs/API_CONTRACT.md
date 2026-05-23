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

## Health

### `GET /health`

Returns:

```json
{
  "ok": true,
  "service": "piggy-days-api"
}
```

## Farm

### `GET /api/farm/summary`

Protected.

Returns the current farm resources, XP, level, and recent events.

Current prototype response:

```json
{
  "feed": 0,
  "seeds": 0,
  "coins": 0,
  "xp": 0,
  "level": 1,
  "recentRewards": []
}
```

### `POST /api/farm/actions/feed`

Protected.

Body:

```json
{
  "piggyName": "Momo"
}
```

Returns a prototype action result:

```json
{
  "ok": true,
  "action": "feed",
  "piggyName": "Momo",
  "dialogue": "Snack time. The farm feels a little softer."
}
```

## Tasks

### `GET /api/tasks`

Protected.

Returns tasks. The current route returns an empty list until persistence is connected.

```json
{
  "tasks": []
}
```

### `POST /api/tasks`

Protected.

Body:

```json
{
  "title": "Buy milk",
  "category": "shopping",
  "description": "Check Coles and Woolworths",
  "place": "Carousel",
  "plannedDate": "2026-05-24T10:00:00.000Z"
}
```

Required:

- `title`

Optional:

- `category`
- `description`
- `place`
- `plannedDate`

Returns a created task shape.

### `POST /api/tasks/:taskId/complete`

Protected.

Body:

```json
{
  "note": "Done after lunch",
  "costCents": 1250,
  "place": "Carousel",
  "photoUrl": "https://example.com/photo.jpg",
  "isCityOuting": false,
  "grocerySavingsCents": 500
}
```

Returns reward calculation:

```json
{
  "taskId": "task_123",
  "status": "completed",
  "farm": {
    "xp": 15,
    "rewards": [
      {
        "resource": "feed",
        "amount": 1,
        "reason": "Complete task"
      }
    ]
  }
}
```

## Implementation Notes

- Request validation is done with Zod in API route modules.
- Farm reward rules live in `@piggy-days/core`, not inside route handlers.
- Persistence is the next milestone after the route contract is stable.
