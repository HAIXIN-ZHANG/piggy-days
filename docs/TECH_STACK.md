# Tech Stack

## Product Constraint

Piggy Days is a small private PWA for two people. Prefer simple tools that help us ship a usable local product. Avoid platform complexity until the daily todo/checklist loop is working.

## Frontend

- Next.js App Router.
- React.
- TypeScript.
- PandaCSS.
- PWA later.
- Framer Motion for small reward animations.
- `lucide-react` for icons.
- TanStack React Query for API state.
- React Hook Form for forms.
- `date-fns` for date handling.
- `clsx` for class composition.

Use PandaCSS instead of Tailwind CSS or shadcn/ui.

## Routes

Use one `apps/web` PWA.

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

Later:

```txt
/explore
/review
/memories
/shop
```

## Internationalization

Default locale:

- `zh-CN`

Supported v1 locales:

- `zh-CN`
- `en`

V1 should use a lightweight local dictionary instead of adding a heavy i18n framework immediately.

Suggested structure:

```txt
apps/web/lib/i18n/
  locales/zh-CN.ts
  locales/en.ts
  useI18n.ts
```

Guidelines:

- Write Chinese copy first because both users are native Chinese speakers.
- Write English copy as a separate natural version, not a machine-style literal translation.
- Store selected locale in local storage for v1.
- Keep user-entered content unchanged.
- Localize built-in task categories, checklist templates, buttons, empty states, validation messages, navigation, review summaries, and reward labels.
- Use `date-fns` locale helpers for date formatting when needed.

Consider `next-intl` later only if route-level localization, message extraction, or a much larger translation surface becomes useful.

## Backend

- Express.
- TypeScript.
- Prisma.
- PostgreSQL.
- Zod.
- Helmet.
- `express-rate-limit`.
- `pino` / `pino-http`.

Use Express for v1 because it is lighter and already familiar.

## Database

- PostgreSQL.
- Prisma ORM.
- AWS RDS PostgreSQL for deployment later.

V1 data focus:

- `HouseholdUser`.
- `Task`.
- `ChecklistItem`.
- `CheckIn`.
- `CoinEvent`.
- `ReviewCard`.

Shopping and farm-specific persistence can exist in the schema, but should not drive the next milestone.

## API State and Pagination

Use cursor-style pagination for growing event feeds and histories.

V1 UI should avoid traditional page numbers:

- Task list: filter by status, owner, category, and date range.
- Coin ledger: show recent events with "load more".
- Memory wall: group by month or review range.

API endpoints should accept `limit` and optional `cursor` where lists can grow.

## Storage

AWS S3 later.

Used eventually for:

- Check-in photos.
- Review card images.
- Farm assets if needed.

In the earliest local version, photo upload can be mocked or stored as a URL field.

## Retailer Data

Shopping comparison is not part of the next milestone.

Later supported retailers:

- Coles.
- Woolworths.
- ALDI.

Strategy later:

- Run scheduled scraper.
- Cache prices and deals in PostgreSQL.
- Search the local database instead of scraping on every user search.

## Places

Google Places is later.

Possible later uses:

- Place name.
- Rating.
- Review count.
- Price level.
- Opening hours.
- Address.
- Photos.
- Google Maps link.

V1 Explore should use local checklist templates and manual editing.

## AI

OpenAI API is later.

Possible uses:

- Review summaries.
- Outing explanations.
- Shopping inspiration.
- Piggy dialogue.

V1 should use deterministic templates and fallback copy.

## Tooling

- pnpm 10.
- ESLint flat config.
- Prettier.
- lint-staged.
- TypeScript strict mode.

Scripts:

- `pnpm lint`
- `pnpm lint:fix`
- `pnpm format`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm check`

## Testing

Prioritize tests around shared rules and data contracts:

- Task completion rewards.
- Coin event creation.
- Piggy Fund summary.
- Leaderboard totals.
- Checklist progress.
- Kitchen recommendation scoring.
- Review summary helpers.

Frontend visual QA should cover mobile first.

## Deployment

Deployment is later.

Target AWS shape:

- AWS Amplify Hosting for Next.js PWA.
- Amazon ECR plus AWS App Runner for Express API.
- AWS RDS PostgreSQL for database.
- AWS S3 for file storage.
- AWS Lambda for scraper.
- Amazon EventBridge Scheduler for cron.
- AWS Secrets Manager for secrets.
- CloudWatch for logs.

See `docs/DEPLOYMENT_PLAN.md` for the deployment runbook, security boundary, migration strategy, and phased checklist.

Do not use:

- Kubernetes.
- EKS.
- AKS.
- MongoDB.
- Heavy EC2 setup.

## CI/CD

Use GitHub Actions later.

Suggested flow:

- PR or push runs lint, typecheck, tests, and build.
- Amplify deploys web from GitHub.
- GitHub Actions builds the API Docker image, pushes it to ECR, and updates App Runner.
- GitHub Actions deploys scraper Lambda.

Database migrations should be manual at first, then automated later when stable.
