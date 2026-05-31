# 2026-05-31 Product Direction and Rollout Notes

## Context

Today we re-centered Piggy Days around real household use.

The project should not start as a complex farm game or shopping comparison tool. It should first become a daily two-person todo/checklist system that is easy enough for both of us to use at home.

## Product Direction

Current priority:

```txt
App shell and routes -> Todo/checklist -> Piggy Coins/Fund -> Explore checklists -> Kitchen checklists -> Weekly review/memory wall -> Shopping -> Farm details
```

Core loop:

```txt
think of something -> record it -> assign it -> complete it -> earn coins -> fund updates -> memory/review later
```

The farm remains important, but as a reward surface:

- Shows piggies.
- Shows Piggy Fund / coins.
- Shows recent rewards.
- Shows memories.
- Reacts emotionally to real completed actions.

Farm details such as feeding, planting, decorating, outfits, and walkable co-op map are later.

## Language Decision

Default app language:

- Simplified Chinese.

Secondary language:

- English.

Rules:

- Chinese copy is first-class, not a translation afterthought.
- English copy should be written separately and naturally.
- User-entered content should not be auto-translated.
- Language selection can live in local storage for v1.

## Routes and Navigation

Use one `apps/web` PWA. Do not split into multiple apps.

Initial route set:

```txt
/today
/tasks
/tasks/[id]
/fund
/farm
/kitchen
/settings
```

Later route set:

```txt
/explore
/review
/memories
/shop
```

Primary navigation should start small:

```txt
今天 / 任务 / 基金 / 小猪 / 设置
```

Kitchen can exist at `/kitchen`, but should start as a secondary/prototype entry unless testing proves it belongs in primary navigation.

Explore, Review, Memories, and Shop should not appear in primary nav until they become useful enough for repeated use.

## Feature Maturity Model

Use these levels:

```txt
planned -> route-only -> prototype -> beta -> active
```

Meaning:

- `planned`: docs only.
- `route-only`: route exists with placeholder.
- `prototype`: clickable with mock/local state.
- `beta`: real data but still being tested.
- `active`: stable enough for primary navigation or `/today`.

Only `active` features should be in primary navigation.

Prototype/beta features can be exposed through:

- `/today` cards.
- `/settings` experiment links.
- direct route links.

This lets us build without forcing unfinished work into the daily experience.

## Small Slice Rule

Every user-facing change should be small enough for wife testing.

Default workflow:

```txt
small slice -> run locally -> wife tests -> note friction -> adjust -> next slice
```

Avoid bundling:

- new route
- new API
- new data model
- heavy visual redesign
- multiple product decisions

in one change.

## Pre-Work Checkpoint Decision

Before starting each next implementation slice, we should pause and check details together.

The assistant should not automatically start coding the next roadmap item when the change affects:

- product behavior
- UX
- route structure
- task flow
- rewards
- data model
- language copy

Each pre-work checkpoint should be structured enough to continue discussion:

1. 已经做了什么.
2. 现在的需求是什么.
3. 下一步建议做什么.
4. 要实现什么.
5. 这次不做什么.
6. 需要一起确认的细节.
7. 做完怎么测试.
8. 用户可以选择继续讨论、更新文档、或开始实现.

This keeps the project collaborative and avoids locking in unclear UX decisions too early.

## Wife Testing Principle

Each visible slice should answer a realistic question.

Examples:

- Can she find Tasks, Kitchen, Farm, and Settings without explanation?
- Does the Chinese label feel natural?
- Can she create a real task in under 30 seconds?
- Can she tell who owns the task?
- Can she tell how many coins it earns?
- Can she find where the reward went?
- Does leaderboard feel fun or stressful?
- Does the kitchen recommendation feel realistic for our home?

Feedback should be converted into the smallest useful fix, not a large new scope.

## PM-Level Product Notes

### Today

Purpose:

- The daily starting point.

Should show:

- Quick add task.
- Today's tasks.
- Piggy Fund snapshot.
- Weekly contribution snapshot.
- Recent reward.

Should not feel like:

- A dense dashboard.
- A marketing landing page.

### Tasks

Purpose:

- The main product engine.

Simple task creation should require only:

- title
- assignee: me, wife, both
- coin value

Optional fields:

- category
- date
- place
- note

Useful details:

- Coin suggestions: 1, 3, 5, 10.
- Completed tasks should be visible but not noisy.
- Filters are more useful than page-number pagination.

### Checklist Tasks

Purpose:

- Support outings, cooking, dates, chores, and multi-step plans.

Useful details:

- Inline item completion.
- Clear progress like `2/5`.
- Editable generated checklist.
- Optional coin value per item.
- Completion reward should be visible but lightweight.

### Piggy Coins and Fund

Purpose:

- Make real actions feel rewarding and explainable.

Rules:

- `CoinEvent` is the reward source of truth.
- Piggy Fund is derived from events.
- Leaderboard uses positive earned coins.
- Redemptions should reduce fund but not historical leaderboard earned score.
- Every fund change needs a reason.

### Leaderboard

Should feel:

- playful
- light
- non-stressful

Potential Chinese label:

- 本周小贡献

Avoid:

- competitive ranking language that creates pressure.

### Kitchen

Purpose:

- Reduce "tonight what do we eat?" friction.

First useful flow:

- quick-add home items
- get 2-3 realistic dinner plans
- select one plan
- turn it into cooking checklist
- complete cooking for coins

Avoid early:

- internet recipes
- nutrition tracking
- barcode scanning
- strict inventory accounting

### Explore

Purpose:

- Turn vague outing intent into a practical editable checklist.

Start with templates, not AI or maps.

Example input:

- 周末找个公园走走

Example checklist:

- 选一个区域
- 查开放时间
- 准备水/外套
- 到达后拍照
- 走 30 分钟
- 写一句感受
- 完成 outing

### Review and Memory

Purpose:

- Make the week feel remembered.

Should feel like:

- our week
- a memory card
- something worth keeping

Not like:

- an enterprise report
- a stats dashboard

### Farm

Purpose:

- emotional reward

Near-term:

- show piggies
- show fund/coins
- show recent rewards
- show memory preview
- short piggy dialogue

Later:

- feeding
- planting
- decorating
- outfits
- walkable map

## Next Implementation Slice

Next slice:

```txt
Release 1A-1: route skeleton + Chinese primary navigation
```

Scope:

- Add `/today`.
- Add `/tasks`.
- Add `/fund`.
- Add `/farm`.
- Add `/kitchen`.
- Add `/settings`.
- Redirect `/` to `/today`.
- Default Chinese labels.
- Move Farm prototype to `/farm`.
- Move Kitchen prototype to `/kitchen`.

Out of scope:

- Database.
- Real task creation.
- Real coin events.
- Full Today dashboard.
- Explore.
- Review.
- Shopping.
- Detailed farm changes.

Wife test:

- Can she find Tasks?
- Can she find Kitchen?
- Can she find Farm?
- Can she find Settings/language?
- Do the Chinese navigation labels feel natural?

Pass signal:

- She can find the main areas without explanation.
- Labels feel understandable.
- The app feels more structured than the old long homepage.

Friction signal:

- Too many nav items.
- Chinese names feel weird.
- She expects Kitchen to be in primary navigation.
- She does not understand what Today is for.
