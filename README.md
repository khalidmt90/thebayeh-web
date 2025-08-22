# thebayeh /web (Phase 0)

This directory hosts the phased Next.js 14 migration. Phase 0 implements only the agreed constraints:

## Phase 0 Scope
- Next.js 14 App Router + TypeScript + Tailwind (isolated under `/web`).
- New Brand Guide ONLY (Gold `#FFD233`, Black `#1A1A1A`, backgrounds `#FFFFFF` / `#F8F8F8`, text `#1A1A1A` / `#555555`, border `#E5E5E5`).
- RTL-first: Arabic default language & `dir="rtl"` at root.
- Supabase browser client initialized (no service key leakage). Service client helper reserved for server route handlers.
- Real (non-placeholder) SVG brand images placed under `public/images` and consumed by the home page.

## Not Yet In Scope
- Data migration, auth session sharing with legacy app.
- Advanced routing / admin areas / orders logic.
- Server actions using privileged Supabase operations.

## Development
Install dependencies (choose your package manager):

```bash
cd web
npm install   # or pnpm install / bun install
npm run dev
```

Visit http://localhost:3000

## Supabase Env
Copy `.env.example` to `.env.local` and set real values. Service role key is optional in Phase 0; it will power future server-only routes.

## Next Phases (High-Level Placeholders)
1. Phase 1: Shared UI primitives + auth session bridging.
2. Phase 2: Incremental route parity (landing, auth, catalog).
3. Phase 3: Secure orders persistence + RLS integration.
4. Phase 4: Admin console hardening & moderator role (if retained).

Each phase must layer without rewriting earlier artifacts.

---
This file documents only Phase 0 deliverables to preserve immutability across phases.
