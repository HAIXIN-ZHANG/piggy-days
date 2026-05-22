# MVP Plan

## Goal

Build the smallest useful version of Piggy Days that we can actually use at home.

## MVP Screens

### Farm

- Shows two piggies.
- Shows Feed, Seeds, and Coins.
- Shows recent rewards.
- Shows a small memory wall.
- Shows simple piggy mood and dialogue.
- Allows feeding when Feed is available.
- Allows planting a simple flower or sprout when Seeds are available.
- Shows a first set of unlockable decorations.

### Tasks

- Create task.
- List todo and completed tasks.
- Mark task as completed.
- Add check-in note, optional cost, optional photo placeholder.
- Reward the farm after completion.

### Shop

- Create shopping list.
- Add item manually.
- Search cached products.
- Browse deals.
- Add deal to list.
- Show estimated total.
- Show Coles / Woolworths / ALDI comparison.

### Explore

- Enter area, budget, and mood.
- Generate a lightweight outing plan.
- Show place candidates with rating, review count, price level, and open status.
- Create a task from the outing.

### Review

- Select date range.
- Generate review from tasks, check-ins, shopping savings, and outings.
- Save review as a memory card.

## Build Order

### Phase 0: Project Foundation

- Create docs.
- Create monorepo.
- Add web, api, scraper, and shared packages.
- Add local environment setup.

### Phase 1: Local App Skeleton

- Next.js app with PandaCSS.
- Express API.
- Prisma schema.
- Local PostgreSQL setup.
- Family password gate.

### Phase 2: Tasks and Farm Loop

- Task CRUD.
- Check-in flow.
- Reward rules.
- Farm state updates.
- Farm event log.
- Simple piggy mood and dialogue.
- Feed and plant actions.

### Phase 3: Shopping MVP

- Shopping list.
- Product and deal tables.
- Mock retailer data.
- Search and compare prices.
- Estimated savings to Coins.

### Phase 4: Scraper MVP

- Retailer adapter interface.
- Coles adapter.
- Woolworths adapter.
- ALDI adapter.
- Unit price normalizer.
- Daily cache job.

### Phase 5: Explore and AI

- Google Places API integration.
- OpenAI-generated outing plan.
- Review generation.
- Shopping inspiration from deals.

### Phase 6: PWA and AWS Deployment

- PWA manifest and icons.
- Amplify Hosting for web.
- App Runner for API.
- RDS PostgreSQL.
- S3 for images.
- Lambda and EventBridge for scraper.

## First Development Milestone

The first usable local version should support:

- Enter family password.
- Create a task.
- Complete task with note and cost.
- Farm resources increase.
- Feed piggies with earned Feed.
- Plant one simple garden item with earned Seeds.
- Add shopping items manually.
- Display mock deal list.
- Generate a mock review.
- Save review as a memory card on the farm.

No real scraper or Google Places integration is required for the first milestone.
