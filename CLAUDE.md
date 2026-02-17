# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E&P Systems Affiliate Portal — a React SPA for managing an affiliate marketing program. Supports two roles: **affiliate** (manages referral links, tracks commissions/payouts) and **admin** (manages affiliates, applications, commissions, payouts, marketing materials, system settings). Includes a **demo mode** that works without a Supabase backend.

## Commands

- `npm run dev` — Start Vite dev server (port 5173)
- `npm run build` — TypeScript check + Vite production build
- `npm run build:dev` — Development build (unoptimized)
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

No test framework is configured.

## Tech Stack

- **React 18** + TypeScript, bundled with **Vite** (SWC plugin)
- **Supabase** for backend (PostgreSQL, Auth, RLS)
- **TanStack React Query** for server state (staleTime: 5min, retry: 1)
- **React Router v6** for routing
- **React Hook Form** + **Zod** for form validation
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives) for UI
- **Framer Motion** for animations
- **Recharts** for charts

## Architecture

### Path Alias

`@/*` maps to `./src/*` (configured in both tsconfig and vite).

### Routing (`src/Router.tsx`)

- Public: `/login`, `/forgot-password`, `/reset-password`
- Affiliate (protected): `/dashboard`, `/referrals`, `/commissions`, `/payouts`, `/materials`, `/settings`
- Admin (protected + requireAdmin): `/admin`, `/admin/affiliates`, `/admin/applications`, `/admin/commissions`, `/admin/payouts`, `/admin/materials`, `/admin/settings`
- `/` redirects based on role; `*` catches all unmatched routes

### Auth (`src/contexts/AuthContext.tsx`)

Supabase Auth with email/password and magic link login. `useAuth()` hook provides user, profile, session, and role checks (`isAdmin`, `isAffiliate`). `ProtectedRoute` component enforces auth and optional `requireAdmin` flag.

**Demo mode**: When `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are not set, the app runs with mock data. Demo role stored in localStorage under `ep-demo-role`, switchable via `switchDemoRole()`.

### i18n (`src/i18n/`)

Bulgarian (`bg`) and English (`en`). `LanguageContext` provides a `t()` function that looks up keys from `translations.ts`. All user-facing strings should use this system.

### Database Schema (`supabase/migrations/001_initial_schema.sql`)

Key tables: `profiles`, `affiliate_applications`, `referral_links`, `clicks`, `conversions`, `commissions`, `payouts`, `marketing_materials`, `admin_settings`. All tables have Row Level Security policies. A trigger auto-creates a profile on Supabase auth signup.

Commission tiers (configurable in `admin_settings`): Starter 10% (0–4 referrals), Professional 15% (5+), Elite 20% (15+). Commissions are **one-time** (paid on the referred client's first payment only). Currency is EUR.

### Component Organization

- `src/components/ui/` — shadcn/ui primitives (do not edit manually; regenerate with shadcn CLI)
- `src/components/layout/` — DashboardLayout, Header, Sidebar, MobileSidebar
- `src/components/dashboard/` — StatsCard, RevenueChart, RecentReferrals, CommissionTierCard
- `src/components/auth/` — ProtectedRoute
- `src/pages/affiliate/` and `src/pages/admin/` — page-level components
- `src/lib/supabase.ts` — Supabase client + `isSupabaseConfigured()` helper
- `src/lib/database.types.ts` — Supabase-generated TypeScript types

### Styling

Tailwind with CSS custom properties (HSL) for theming. Light/dark mode via `.dark` class. Component variants use Class Variance Authority (CVA). Use `cn()` from `src/lib/utils.ts` for conditional class merging.

## Environment

Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Without these, the app runs in demo mode.

## TypeScript Config

Strict mode enabled but `strictNullChecks` is **off**. `noUnusedLocals` and `noUnusedParameters` are also off.
