# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- PandaCSS
- PWA
- Framer Motion
- lucide-react
- TanStack React Query
- React Hook Form
- date-fns
- clsx

Use PandaCSS instead of Tailwind CSS or shadcn/ui.

## Backend

- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod
- Helmet
- express-rate-limit
- pino / pino-http

Use Express for v1 because it is lighter and already familiar.

## Tooling

- pnpm 10
- ESLint flat config
- Prettier
- lint-staged
- TypeScript strict mode

Scripts:

- `pnpm lint`
- `pnpm lint:fix`
- `pnpm format`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm check`

## Database

- PostgreSQL
- Prisma ORM
- AWS RDS PostgreSQL for deployment

Reason:

- Tasks, check-ins, shopping lists, products, retailers, prices, deals, reviews, and farm events are relational.
- Price comparison and history queries are easier with SQL.
- Prisma gives good TypeScript types and migrations.

## Storage

- AWS S3

Used for:

- Check-in photos
- Farm assets
- Review card images

In the earliest local version, photo upload can be mocked or stored as a URL field.

## Retailer Data

Supported retailers:

- Coles
- Woolworths
- ALDI

Strategy:

- Run scheduled scraper.
- Cache prices and deals in PostgreSQL.
- Search the local database instead of scraping on every user search.

## Places

- Google Places API

Used for:

- Place name
- Rating
- Review count
- Price level
- Opening hours
- Address
- Photos
- Google Maps link

## AI

- OpenAI API

Used for:

- City outing plans
- Manual review summaries
- Shopping inspiration from deals
- Piggy dialogue

## Deployment

- AWS Amplify Hosting for Next.js PWA
- AWS App Runner for Express API
- AWS RDS PostgreSQL for database
- AWS S3 for file storage
- AWS Lambda for scraper
- Amazon EventBridge Scheduler for cron
- AWS Secrets Manager for secrets
- CloudWatch for logs

Do not use:

- Kubernetes
- EKS
- AKS
- MongoDB
- Heavy EC2 setup

## CI/CD

- GitHub Actions

Suggested flow:

- PR or push runs lint, typecheck, tests, and build.
- Amplify deploys web from GitHub.
- GitHub Actions builds API Docker image and updates App Runner.
- GitHub Actions deploys scraper Lambda.

Database migrations should be manual at first, then automated later when stable.
