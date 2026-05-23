# Agent Guide

## Rule

Read the docs before changing code.

Important docs:

- docs/PRODUCT_BRIEF.md
- docs/MVP_PLAN.md
- docs/TECH_STACK.md

## Directory Ownership

When using multiple agents, keep ownership clear.

### Main Agent

Owns:

- Root config
- docs/\*\*
- package workspace setup
- integration decisions
- final merge

### Frontend Agent

Owns:

- apps/web/\*\*
- packages/ui/\*\*

Does not touch:

- apps/api/\*\*
- apps/scraper/\*\*
- Prisma schema unless asked

### Backend Agent

Owns:

- apps/api/\*\*
- packages/core/\*\*
- packages/database/\*\*

Does not touch:

- apps/web/\*\*
- packages/ui/\*\*

### Scraper Agent

Owns:

- apps/scraper/\*\*
- packages/core/src/pricing/\*\*

Does not touch:

- apps/web/\*\*
- apps/api UI-related routes

### Explore / AI Agent

Owns:

- packages/core/src/explore/\*\*
- packages/core/src/ai/\*\*
- apps/api explore and review modules

## First Parallelization Plan

Do not start with five agents.

Start with:

- Agent A: project foundation, schema, API contract
- Agent B: frontend screens with mock data
- Agent C: Express API with Prisma

Add later:

- Agent D: supermarket scraper
- Agent E: Google Places and OpenAI generation

## Agent Prompt Examples

### Frontend Agent

You are responsible for Piggy Days frontend. Read docs first. Only modify apps/web/** and packages/ui/**. Use Next.js, TypeScript, PandaCSS, and mock data. Build mobile-first Farm, Tasks, Shop, Explore, and Review screens. Do not modify backend, Prisma, or scraper code.

### Backend Agent

You are responsible for Piggy Days backend. Read docs first. Only modify apps/api/**, packages/core/**, and packages/database/\*\*. Use Express, TypeScript, Prisma, and PostgreSQL. Implement family password gate, tasks, check-ins, shopping lists, farm rewards, and review endpoints. Do not modify frontend UI.

### Scraper Agent

You are responsible for supermarket data. Read docs first. Only modify apps/scraper/** and packages/core/src/pricing/**. Implement retailer adapter interfaces, price parsing, unit price normalization, and mock scraper data for Coles, Woolworths, and ALDI. Do not modify frontend or unrelated API modules.
