# Al Saeed Education, Training & Consultancy Platform

> Enterprise-grade AI-powered SaaS platform for professional education, training, certifications, and consulting.

## 📐 Architecture Overview

This is a **monorepo** (npm workspaces) with the following structure:

```
alsaeed-platform/
├── apps/
│   ├── web/              # Next.js 15 frontend (React 19, Tailwind, i18n, RTL/LTR)
│   └── api/              # Express.js + TypeScript backend
├── packages/
│   ├── database/         # Prisma schema + client (PostgreSQL)
│   └── shared/           # Shared types, validators (zod), utils, constants
├── docs/                 # Architecture decisions & API docs
├── .env.example          # All environment variables (copy to .env)
├── package.json          # Root workspaces config
└── tsconfig.base.json    # Shared TS config
```

### Tech Stack

| Layer        | Tech                                                            |
| ------------ | --------------------------------------------------------------- |
| Frontend     | Next.js 15, React 19, TypeScript, Tailwind, Zustand, React Query, Framer Motion, i18next |
| Backend      | Node.js 20, Express 4, TypeScript, JWT, bcrypt, zod             |
| Database     | PostgreSQL via Prisma (compatible with Supabase)                |
| Auth         | JWT (access + refresh tokens) + Google OAuth (planned)          |
| AI           | OpenAI API (gpt-4o-mini default), can swap to Anthropic         |
| Storage      | Supabase Storage / Cloudinary (configurable)                    |
| Payments     | Stripe + Paymob (MENA-friendly)                                 |

---

## 🚀 Getting Started (First Time Setup)

### 1. Prerequisites

Install on your machine:

- **Node.js 20+** ([download](https://nodejs.org/))
- **PostgreSQL 15+** locally **OR** a free [Supabase](https://supabase.com/) project
- **Git**

### 2. Install dependencies

```bash
cd alsaeed-platform
npm install
```

This installs deps for all workspaces (web, api, database, shared).

### 3. Configure environment

```bash
cp .env.example .env
```

Then **edit `.env`** and fill in at minimum:

- `DATABASE_URL` — your Postgres connection string
- `JWT_ACCESS_SECRET` — run `openssl rand -base64 48` to generate
- `JWT_REFRESH_SECRET` — same, but a different value

You can leave the rest empty for now (OpenAI, Stripe, etc.) — the app boots without them.

### 4. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates all tables)
npm run db:push

# Seed initial data (admin user, categories, plans)
npm run db:seed
```

This creates a Super Admin: `admin@alsaeed-etc.com` / `ChangeMe123!`

### 5. Run dev servers

Open **two terminals**:

```bash
# Terminal 1 — Backend
npm run dev:api
# → http://localhost:4000
# → http://localhost:4000/health

# Terminal 2 — Frontend
npm run dev:web
# → http://localhost:3000
```

### 6. Test the API

```bash
# Register a user
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "firstName": "Ahmed",
    "lastName": "Ali"
  }'

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test1234"}'
```

---

## 📦 What's Built vs. What's Pending

### ✅ Built (Foundation + Auth Module)

**Architecture:**
- Monorepo with npm workspaces
- Complete Prisma schema (30+ models covering all 20 modules)
- Shared package with zod validators reusable on both ends
- Database seed script (creates super admin + categories + plans)

**Backend:**
- Express + helmet + CORS + compression + rate limiting + winston logger
- Centralized error handling with typed error classes
- Environment validation via zod (fails fast if misconfigured)
- RBAC middleware: `requireAuth`, `requireRole(...)`

**Auth Module — Production-Ready:**
- Email/password register + login
- JWT access tokens (15min) + refresh tokens (7d) with rotation
- Session storage in DB (revocable, with userAgent + IP tracking)
- OTP email verification (6 digits, 10min expiry, auto-invalidates old codes)
- Password reset (signed JWT links, 1h expiry, revokes all sessions on success)
- Google OAuth (full code-exchange flow, find-or-create user)
- Email service with branded HTML templates (OTP, welcome, password reset)
- All endpoints rate-limited

**Frontend:**
- Next.js 15 + React 19 + Tailwind + RTL config
- Brand colors extracted from existing prototype
- Axios client with auto-refresh on 401
- Zustand auth store with persistence
- **Working pages**: `/login`, `/register`, `/verify-email`, `/dashboard`, `/auth/google/success`
- Form validation via react-hook-form + zod (shared schemas)

### ⏳ Pending — implement one module at a time

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the suggested 6-month build order.

Quick summary of next modules:

1. **Course CRUD + player** — endpoints + video player on web
2. **Quiz engine** — start with PMP question bank, then attempt flow
3. **Certificate generator** — pdf-lib + QR codes
4. **AI assistant** — OpenAI streaming chat
5. **Library** — file upload to Supabase Storage / Cloudinary
6. **Payments** — Stripe + Paymob webhooks
7. **Admin dashboard** — analytics endpoints + recharts
8. **Corporate B2B** — invite flow, team analytics
9. **i18n** — load 7 languages, language switcher

---

## 🛠️ Common Commands

```bash
npm run dev              # Run all dev servers
npm run dev:web          # Frontend only
npm run dev:api          # Backend only

npm run db:studio        # Open Prisma Studio (visual DB browser)
npm run db:migrate       # Create a migration after schema change
npm run db:push          # Push schema without migration (dev only)
npm run db:reset         # ⚠️ Drop everything and re-seed

npm run build            # Build everything for production
npm run typecheck        # Check types in all workspaces
npm run lint             # Lint all workspaces
npm run format           # Prettier all files
```

---

## 🚢 Deployment (when ready)

| Component | Recommended host                              |
| --------- | --------------------------------------------- |
| Frontend  | **Vercel** (free, zero-config for Next.js)    |
| Backend   | **Railway** or **Render** (free tier OK)      |
| Database  | **Supabase** or **Neon** (both free tiers)    |
| Storage   | **Supabase Storage** or **Cloudinary** (free) |

Set environment variables in each platform's dashboard. Run `npm run db:migrate:deploy` against the production DB.

---

## 📋 Project Status: SCAFFOLDING COMPLETE

This is **the foundation**, not a finished product. Building Coursera-level features will take **months of incremental work**. Use the "Pending" list above as your roadmap and tackle ONE module at a time.

**Recommended order for your first 3 months:**

1. **Month 1** → Auth (Google + OTP + email) + Courses CRUD + Course player
2. **Month 2** → Quiz engine + Certificates + Library
3. **Month 3** → AI assistant + Payments + Basic admin dashboard

Then launch a closed beta. Add corporate / consulting / advanced analytics based on real user demand.

---

## 🔒 Security Reminders

- Never commit `.env` to git
- Rotate JWT secrets if compromised
- Always set `RLS Policies` in Supabase if using it
- Run `npm audit` regularly
- Enable 2FA on GitHub, Vercel, Supabase

---

Built with care. Iterate, ship, repeat.
