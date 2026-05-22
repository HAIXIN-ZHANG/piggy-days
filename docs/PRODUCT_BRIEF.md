# Piggy Days Product Brief

## Product

Piggy Days is a private PWA for two people. It helps us record daily life, lodge small tasks, check in when they are done, compare supermarket deals, plan simple weekly outings, and grow a small piggy farm as a reward system.

The first version is only for me and my wife.

## Positioning

One sentence:

> A private piggy farm for our real life: tasks, check-ins, shopping deals, weekly outings, and memories.

## Core Principles

- Keep the first version simple.
- Build for two people first.
- No social features.
- No invitations.
- No formal user account system.
- No heavy infrastructure.
- Prioritize a working MVP over a complete platform.

## Core Modules

### 1. Family Password Gate

The first version does not need registration or login.

- User enters one shared family password.
- App stores a lightweight local session.
- Backend checks a simple token on protected API calls.
- Proper auth can be added later.

### 2. Tasks: Lodge and Check In

Tasks represent things we want to do or need to do.

Task categories:

- Shopping
- Cooking
- City outing
- Chore
- Date
- Other

Task fields:

- Title
- Category
- Description
- Place
- Planned date
- Status: todo or completed

Check-in fields:

- Photo
- Short note
- Cost
- Place
- Completed time

### 3. Manual Review

Reviews are manually triggered. No automatic reminder in v1.

User chooses:

- Past 1 week
- Past 2 weeks
- Past 1 month
- Custom range

The app generates:

- Completed tasks
- Places visited
- Money spent
- Estimated grocery savings
- Things worth doing again
- One suggested task for next week

### 4. Shopping List and Deals

Shopping has two entry points:

- Search when we know what to buy.
- Browse deals when we do not know what to buy.

Supported supermarkets in v1:

- Coles
- Woolworths
- ALDI

Shopping list features:

- Add item
- Mark item as bought
- Show estimated price
- Show recommended retailer
- Show whether item is on deal
- Calculate estimated total

### 5. Destination-Based Shopping Advice

User can enter a destination such as:

- Carousel
- City
- Fremantle
- Near home

The app compares nearby Coles, Woolworths, and ALDI options and gives practical advice:

- Which store is cheaper for the whole list.
- Which store is more convenient.
- Whether the price difference is worth switching stores.
- Later: split list if two stores are very close.

V1 can start with whole-list comparison only.

### 6. City Explore

This is not a travel app. It helps us go out once a week without planning too much.

Inputs:

- Budget
- Area or destination
- Mood
- Time available
- Preferences such as coffee, food, walk, market, exhibition, groceries

Outputs:

- Lightweight route
- Recommended places
- Rating
- Review count
- Price level
- Opening status
- Estimated cost
- Grocery stop suggestion
- Check-in task

### 7. Piggy Farm

The piggy farm is the emotional reward layer.

V1 has:

- Two piggies
- One shared farm
- Small house
- Garden patch
- Flower area
- Piggy bank
- Decorations
- Memory wall
- Simple mood and dialogue
- Visible reward animations
- A small set of unlockable decorations

Resources:

- Feed: earned by completing tasks.
- Seeds: earned by check-ins and outings.
- Coins: earned by estimated grocery savings.
- Later: Hearts earned by couple quests and date memories.

Example reward rules:

- Complete task: Feed +1
- Upload check-in photo: Seeds +1
- Complete city outing: Seeds +2
- Save $5 on shopping: Coins +5
- Generate review: Feed +1 and memory card

Farm design principle:

- Real-life action should create visible farm growth.
- Piggies should feel alive, but the game should stay forgiving.
- No punishment for missing days.
- No complex farming economy in v1.

See `docs/PIGGY_FARM_GAME_DESIGN.md` for the detailed farm game loop.

## Not In V1

- Formal accounts
- Cognito
- Friend invitations
- Multiple households
- Social feed
- Complex pet simulation
- Push notifications
- Offline sync
- Kubernetes
- EKS / AKS
- MongoDB
- Heavy EC2 setup
