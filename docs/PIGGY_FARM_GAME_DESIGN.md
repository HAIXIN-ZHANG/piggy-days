# Piggy Farm Game Design

## Current Role

Piggy Farm is the emotional reward layer for Piggy Days. It should make completed real-life actions feel visible, cute, and memorable.

It is not the first product engine. The first product engine is:

```txt
Todo/checklist completion -> Piggy Coins -> Piggy Fund -> Leaderboard -> Review -> Memory
```

Detailed farm care, planting, decorating, outfits, and walkable co-op gameplay should come after the task/checklist/fund loop is useful.

## Goal

Make Piggy Farm feel like a small private reward world that grows from our real life.

The farm should:

- Make completed tasks feel emotionally rewarding.
- Show Piggy Coins/Fund progress in a warm way.
- Preserve weekly memories.
- Give piggies simple mood/dialogue reactions.
- Stay forgiving and low-pressure.

The farm should not:

- Become a stressful daily chore.
- Force timers or punishment.
- Distract from the todo/checklist system.
- Require a complex economy in v1.

## Product Fit

Piggy Farm should answer:

- What did we complete in real life?
- What Piggy Coins did it earn?
- How did Piggy Fund grow?
- What memory did it leave?
- What might we do next?

## Near-Term Scope

For the next app structure, `/farm` should be a lightweight reward surface.

V1 farm display:

- Two piggies.
- Current Piggy Fund / coin summary.
- Recent reward events.
- Simple piggy mood and dialogue.
- Memory card preview.
- A cozy visual scene.

V1 farm should not require:

- Feeding economy.
- Planting economy.
- Decoration placement.
- Farm timers.
- Walkable map.
- Multiplayer sync.

The current farm prototype can remain as a visual prototype, but the next real reward source of truth should be `CoinEvent`.

## Core Fantasy

Two piggies live in a small private farm. They get happier as we do small useful things in real life.

The farm slowly reflects:

- Tasks we completed.
- Places we visited.
- Food we cooked.
- Piggy Coins we earned.
- Piggy Fund milestones.
- Weekly memory cards.

## Game Pillars

### 1. Real Life First

The farm should grow from real actions, not from grinding in the farm UI.

Examples:

- Complete a task: piggies react.
- Finish a checklist: a reward event appears.
- Cook dinner: kitchen memory appears.
- Finish weekly review: memory card appears.

### 2. Soft Care

Piggies can be fed, dressed, and cheered up later.

Rules:

- No death.
- No punishment for missing days.
- If inactive, piggies nap or wait.
- The game should feel forgiving.

### 3. Visible Memory

The farm should remember what happened.

Examples:

- A memory card links to a weekly review.
- A decoration can show what unlocked it.
- A food/cooking badge can point back to a cooking checklist.
- An outing badge can point back to an explore checklist.

### 4. Two-Person Coziness

The farm is for two people, not a public social network.

Good future examples:

- "Cook together" badge.
- "Saturday outing" memory.
- "Home reset" chore milestone.
- "Try again" suggestion from review.

## Resources

### Piggy Coins

Primary v1 reward unit.

Earned from:

- Completing tasks.
- Completing checklist items.
- Completing cooking checklists.
- Completing explore checklists.
- Optional review ritual bonus.
- Later: shopping savings.

Used for:

- Piggy Fund balance.
- Leaderboard.
- Later reward shop or farm unlocks.

### Piggy Fund

Shared reward balance derived from coin events.

V1 can treat one coin as one fund unit.

Later:

- Add redemptions.
- Add fund goals.
- Add reward shop.

### Feed, Seeds, Hearts

Later optional farm resources.

They can be derived from `CoinEvent`, `ReviewCard`, or future `FarmEvent` projections. They should not block v1.

## Piggies

V1 has two piggies.

Each piggy can eventually have:

- Name.
- Mood.
- Outfit.
- Short dialogue line.

Simple moods:

- Happy.
- Sleepy.
- Proud.
- Curious.
- Celebrating.

Mood should be based on recent activity, not strict timers.

Example dialogue:

- "今天也有小小进展。"
- "小猪基金又长大了一点。"
- "这周值得留一张回忆卡。"
- "做完一个 checklist，农场也亮了一点。"
- "Dinner mission complete."

## Farm Areas

### Piggy Pen

Near term:

- Piggies and mood bubble.

Later:

- Feeding.
- Toys.
- Outfits.

### Piggy Fund Jar

Near term:

- Shows current fund.
- Shows recent coin event.

Later:

- Milestone fill animation.
- Reward goals.

### Memory Wall

Near term:

- Shows latest review cards.

Later:

- Filter by date, place, category, food, or outing.
- Unlock frames.

### Kitchen Corner

Later:

- Shows cooking wins.
- Links to cooking checklist tasks.
- Unlocks food badges.

### Picnic Corner

Later:

- Shows outing memories.
- Links to explore checklist tasks.

### Garden and Decorations

Later:

- Flowers or decorations unlocked from reviews, milestones, or fund goals.
- Avoid complex crop timers.

## Progression

Progression should follow the real product:

1. Tasks completed.
2. Checklist items completed.
3. Piggy Coins earned.
4. Piggy Fund milestones.
5. Reviews saved.
6. Memories collected.

Farm level can come later and should be derived from real activity.

Possible future unlocks:

- First 10 coins: fund jar sparkle.
- First completed checklist: checklist badge.
- First cooking task: kitchen corner badge.
- First explore task: picnic badge.
- First review: memory wall frame.
- 100 coins earned: decoration unlock.

## Daily and Weekly Rhythm

### Daily Loop

1. Open `/today`.
2. See tasks and quick actions.
3. Complete a task/checklist item.
4. Earn coins.
5. See Piggy Fund and recent reward update.
6. Visit `/farm` if we want a cozy visual reward.

### Weekly Loop

1. Open `/review`.
2. Generate review.
3. See completed tasks, outings, cooking, coins, fund changes, and leaderboard.
4. Save memory card.
5. Memory appears on `/farm` and `/memories`.

## Later Game Roadmap

Only after Todo/Fund/Review are useful:

### Farm Details

- Feeding animation.
- Planting animation.
- Decoration unlocks.
- Piggy outfits.
- Seasonal skins.
- Reward shop.

### Walkable Farm

Treat this as a separate experiment.

Possible tech:

- Phaser for map rendering and interactions.
- React remains the app shell and forms.

Possible features:

- Top-down map.
- Me and wife avatars.
- Mobile tap or joystick movement.
- Interaction prompts.
- Task board, memory wall, kitchen corner, fund jar.

Do not start this until the real daily-use loop exists.

## Design Inspirations

Useful patterns from similar products:

- Ant Forest: real-life behavior creates virtual progress.
- Ant Manor: simple care loop and emotional response.
- Baba Farm: staged growth and co-planting.
- Hay Day: zones and decorations make a farm feel owned.
- Stardew Valley: collections and varied activities create long-term motivation.

Piggy Days should borrow the emotional patterns, not the grind.

## Open Questions

- Should Piggy Coins directly equal Piggy Fund units forever?
- Should redemptions be manual text entries first?
- Should farm unlocks come from total earned coins or review milestones?
- Should the two piggies represent us directly or be shared mascots?

Recommended v1 answers:

- Treat one coin as one fund unit.
- Add manual redemption later.
- Use review milestones before complex farm levels.
- Treat piggies as shared mascots.
