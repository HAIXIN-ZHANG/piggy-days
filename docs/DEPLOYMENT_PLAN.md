# Deployment Plan

Last reviewed: 2026-06-01.

Piggy Days should deploy to AWS in a way that is simple enough for a personal project, but not careless with private household data.

The deployment target is intentionally modest:

- One web PWA.
- One Express API.
- One PostgreSQL database.
- Private file storage later.
- Scheduled scraper later.
- No Kubernetes, no hand-managed EC2, and no formal user account system in v1.

## Deployment Principle

Do not deploy just the app shell.

The first useful AWS deployment should wait until this loop works locally:

```txt
Create task -> complete task -> write CoinEvent -> update Piggy Fund -> show leaderboard
```

Deploying before that is technically possible, but it would spend setup effort before the app has a daily-use core.

## Target Architecture

```txt
GitHub
  -> AWS Amplify Hosting: apps/web Next.js PWA
  -> GitHub Actions: checks, API image build, deployment commands
  -> Amazon ECR: apps/api container image
  -> AWS App Runner: apps/api Express API
  -> Amazon RDS for PostgreSQL: Prisma database
  -> AWS Secrets Manager: secrets and database credentials
  -> Amazon S3: private photo/review storage later
  -> AWS Lambda + EventBridge Scheduler: scraper later
  -> Amazon CloudWatch: logs and alarms
```

## AWS Services

### Web: AWS Amplify Hosting

Use Amplify Hosting for `apps/web`.

Why:

- It supports Next.js hosting without managing servers.
- It works with GitHub-driven deploys.
- It supports monorepos, but pnpm monorepos need explicit build configuration.

Notes:

- The repo uses Next.js App Router and pnpm workspaces.
- Add a root `.npmrc` for Amplify later:

```txt
node-linker=hoisted
```

- Add `amplify.yml` later instead of relying only on console settings.
- Web environment variables should only contain non-secret public config, such as:

```txt
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Do not put `FAMILY_API_TOKEN`, database URLs, AWS credentials, or private API keys in web build variables.

### API: AWS App Runner

Use App Runner for `apps/api`.

Preferred path:

1. Build the API Docker image from the monorepo root in GitHub Actions.
2. Push the image to Amazon ECR.
3. Point App Runner at that ECR image.

Why image-based deployment:

- The API depends on workspace packages such as `@piggy-days/core` and `@piggy-days/database`.
- Building from the monorepo root is clearer than trying to make App Runner source mode understand all workspace boundaries.
- The image can run the same build output locally and in AWS.

App Runner should receive:

```txt
NODE_ENV=production
PORT=<App Runner provided port>
DATABASE_URL=<from Secrets Manager>
FAMILY_API_TOKEN=<from Secrets Manager>
ALLOWED_ORIGINS=https://app.example.com
```

Security notes:

- Do not expose debug routes in production.
- API must enforce the family gate before any real task, coin, review, or photo endpoint is public.
- CORS should only allow the deployed web origin.
- Rate limiting should stay enabled.

### Database: Amazon RDS for PostgreSQL

Use RDS PostgreSQL for persistent app data.

Initial settings:

- Single-AZ is acceptable for early personal use.
- Enable automated backups before storing real household data.
- Enable deletion protection once real data matters.
- Prefer private subnets once App Runner VPC connectivity is configured.

API connectivity:

- App Runner should use a VPC connector to reach private RDS.
- RDS security group should only allow traffic from the API/App Runner path.

Migration strategy:

- Do not run Prisma migrations automatically on every API startup.
- Start with manual production migrations.
- Later, add a dedicated migration job, likely GitHub Actions triggering an AWS-side runner such as CodeBuild in the same VPC.

The migration command should remain explicit:

```bash
pnpm --filter @piggy-days/database db:migrate
```

### Secrets: AWS Secrets Manager

Use Secrets Manager for:

```txt
DATABASE_URL
FAMILY_API_TOKEN
OPENAI_API_KEY later
GOOGLE_PLACES_API_KEY later
SCRAPER_SHARED_SECRET later
```

Rules:

- App Runner references secrets by ARN.
- GitHub Actions should use OIDC or tightly scoped AWS credentials later.
- Web/Amplify must not receive private secrets.
- Rotate secrets manually first; automate rotation only after the deployment is stable.

### Files: Amazon S3

S3 comes later, after check-in photos or review images are real.

Use:

- Private bucket.
- Block public access.
- Server-side encryption.
- API-generated presigned upload URLs.
- Random object keys.

Object keys must not leak personal information:

```txt
checkins/<uuid>.jpg
reviews/<uuid>.png
```

Avoid keys like:

```txt
2026-06-01-date-night-northbridge.jpg
```

### Scraper: Lambda + EventBridge Scheduler

The scraper is later than manual shopping.

Use EventBridge Scheduler to trigger a Lambda function when scheduled scraping becomes useful.

If the scraper needs a browser runtime or becomes heavy:

- Use a Lambda container image first.
- Reconsider ECS scheduled tasks only if Lambda becomes painful.

The scraper should:

- Write cached prices/deals into PostgreSQL.
- Never scrape live during a user request.
- Have clear timeout, retry, and failure logging.

### Logs and Alarms: CloudWatch

Use CloudWatch for:

- App Runner logs.
- Lambda scraper logs.
- Basic error alarms.
- Deployment troubleshooting.

Add AWS Budgets before leaving resources running long term.

## Environments

Start with one environment:

```txt
prod
```

Add `staging` only when deployment starts to affect real daily use.

Local development remains the main iteration environment until the task/coin/fund loop is stable.

## Region

Prefer one AWS Region for all resources.

Likely default:

```txt
ap-southeast-2
```

Reason:

- It is a mature Australia region.
- It keeps the architecture simple.

Before provisioning, verify that every chosen service and instance class is available in the selected region.

## CI/CD Plan

### Pull Requests

Run:

```bash
pnpm install --frozen-lockfile
pnpm check
```

### Web Deploy

Amplify deploys `apps/web` from GitHub.

Required later:

- `.npmrc`
- `amplify.yml`
- `NEXT_PUBLIC_API_BASE_URL`

### API Deploy

GitHub Actions later:

1. Run `pnpm check`.
2. Build API Docker image from repo root.
3. Push image to Amazon ECR.
4. Trigger App Runner deployment.

### Database Migration

Early:

- Manual, deliberate production migration.
- Take or verify backup first.

Later:

- Dedicated migration job.
- Separate from API startup.
- Requires explicit approval or protected GitHub environment.

## Cost Boundary

Keep the first AWS version small:

- One Amplify app.
- One App Runner service.
- One small RDS PostgreSQL instance.
- One private S3 bucket only when files exist.
- No multi-AZ until real usage justifies it.
- No always-on scraper worker.

Set an AWS Budget before production data enters the system.

## Security Boundary

Before first public deployment, complete these:

- Family gate protects API endpoints that read/write private data.
- `FAMILY_API_TOKEN` is only stored server-side.
- CORS allows only the deployed web origin.
- RDS is not open to the internet unless temporarily and deliberately required.
- S3 bucket blocks public access.
- Production logs do not print secrets, tokens, full database URLs, or personal notes.
- API has request size limits.
- API has rate limiting.
- Backups are enabled before real household data is stored.

## What Not To Use Yet

Do not use these for v1:

- EKS or Kubernetes.
- Hand-managed EC2.
- Cognito.
- DynamoDB.
- Multi-account AWS setup.
- Complex Terraform/CDK before the manual deployment path is understood.

Reasons:

- The app is private and two-person first.
- The daily task loop matters more than infrastructure polish.
- The architecture should teach good deployment habits without turning into an ops project.

## Deployment Checklist

### Before AWS Work

- [ ] Persistent task creation works locally.
- [ ] Task completion writes immutable `CoinEvent`.
- [ ] `/fund` derives balance from coin events.
- [ ] Leaderboard derives from positive coin events.
- [ ] Family gate protects private API routes.
- [ ] `pnpm check` passes.

### Web

- [ ] Add root `.npmrc` for Amplify pnpm monorepo support.
- [ ] Add `amplify.yml`.
- [ ] Configure `NEXT_PUBLIC_API_BASE_URL`.
- [ ] Deploy `apps/web` with Amplify.
- [ ] Verify `/today`, `/tasks`, `/fund`, `/farm`, `/settings`.

### API

- [ ] Add API Dockerfile.
- [ ] Build image from monorepo root.
- [ ] Push image to ECR.
- [ ] Create App Runner service from ECR image.
- [ ] Configure secrets through Secrets Manager references.
- [ ] Configure CORS for deployed web origin.
- [ ] Verify `/health`.

### Database

- [ ] Create RDS PostgreSQL.
- [ ] Enable automated backups.
- [ ] Store `DATABASE_URL` in Secrets Manager.
- [ ] Connect API to RDS.
- [ ] Run first production migration manually.
- [ ] Verify task create/complete/fund flow in production.

### Later

- [ ] Add private S3 bucket for photos.
- [ ] Add presigned upload endpoint.
- [ ] Add scraper Lambda.
- [ ] Add EventBridge Scheduler.
- [ ] Add CloudWatch alarms.
- [ ] Add AWS Budget.

## References

- AWS Amplify Hosting Next.js support: <https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html>
- AWS Amplify monorepo and pnpm configuration: <https://docs.aws.amazon.com/amplify/latest/userguide/monorepo-configuration.html>
- AWS App Runner source image services: <https://docs.aws.amazon.com/apprunner/latest/dg/service-source-image.html>
- AWS App Runner source code services: <https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code.html>
- AWS App Runner VPC access: <https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html>
- AWS App Runner environment variables and secrets: <https://docs.aws.amazon.com/apprunner/latest/dg/env-variable.html>
- Amazon RDS automated backups: <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html>
- S3 presigned uploads: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html>
- EventBridge Scheduler invoking Lambda: <https://docs.aws.amazon.com/lambda/latest/dg/with-eventbridge-scheduler.html>
