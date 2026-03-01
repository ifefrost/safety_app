# Safety App

Safety App is a personal safety companion for creating safety plans, timed check-ins, trusted contact alerts, and SOS sessions.

## Stack
- Next.js 14 App Router + TypeScript + TailwindCSS
- PostgreSQL + Prisma ORM
- NextAuth (credentials + email magic link)
- Notification service abstraction (email/SMS with dev stubs)
- Vitest + Playwright smoke tests

## Setup
1. Copy env vars:
   ```bash
   cp .env.example .env
   ```
2. Install deps:
   ```bash
   npm install
   ```
3. Generate Prisma client and migrate DB:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Core routes
- `/dashboard` overview and quick actions
- `/contacts` trusted contact CRUD and invite tokens
- `/plans/new` plan wizard
- `/plans/[id]` quick check-in starter
- `/checkins/[id]` active timer + safe/extend/location actions
- `/contact-view/[token]` trusted contact active alert view

## Ops notes
- Cron endpoint: `GET /api/cron` should run every minute in production (Vercel cron) for check-in expiry processing.
- Location retention: latest 100 points per user are kept.
- Notification sending is stubbed by default unless `ENABLE_REAL_EMAIL`/`ENABLE_REAL_SMS` are enabled.
