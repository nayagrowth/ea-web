# Architecture Decisions — Dipak Public Hero

## Executive decision
Use a **thin Next.js public-surface app** now. Do not mirror the platform backend inside this repository.

The wider Authority Closers system may use FastAPI/Python, PostgreSQL, pgvector, workers, AI-provider adapters, tenant models and deep telemetry. None of those belong in the hero repository merely because they exist elsewhere.

The correct interface is:

```text
Public Hero App
  [presentation + SEO + asset delivery + typed public event semantics]

Future Authority Closers Platform
  [identity + data + learning + simulator + AI + payments + analytics]
```

## ADR-001 — Framework
**Decision:** Next.js 16.2.11 App Router + React 19.2.7 + TypeScript.

Why:
- public SEO surface;
- server rendering/static prerendering;
- first-party image optimization;
- deployable to Docker/KVM2;
- native future monorepo support through `transpilePackages`;
- current Next.js agent tooling/MCP support;
- avoids creating a second frontend framework inside Authority Closers.

## ADR-002 — No Python backend here
**Decision:** do not add FastAPI to the hero repo.

Python remains appropriate for the future platform API/intelligence layer, but a hero needs no database or business API. Adding Python here creates two processes, two deployment lifecycles and a future migration problem without user value.

## ADR-003 — Server Component hero
**Decision:** keep hero rendering server-side/static with no client state.

Benefits:
- near-framework-floor JavaScript;
- fewer hydration bugs;
- simpler migration;
- lower CPU/browser work;
- no state-store dependency.

## ADR-004 — CSS Modules instead of design-system dependency
**Decision:** co-located CSS Module + feature-scoped CSS variables.

Do not introduce Tailwind, shadcn, Framer Motion, GSAP or an icon library solely for this hero.

This is not an ideological rejection of those tools. It is dependency minimization for a single portable feature. If the future monorepo establishes a shared design system, the hero can adopt it intentionally.

## ADR-005 — Asset strategy
**Decision:** local static portrait import + `next/image`.

The supplied transparent PNG remains the source asset. Next.js generates responsive optimized formats. Keep alternate cutouts as source/reference assets, not runtime imports.

## ADR-006 — Public event contract, not analytics vendor
**Decision:** CTA elements expose stable attributes:

```text
data-ac-event
 data-ac-event-schema
 data-ac-surface
```

This establishes semantic compatibility with future Authority Closers telemetry while keeping the hero vendor-neutral and JS-light. A future shared telemetry package may read these attributes or replace them with a typed adapter.

## ADR-007 — Configurable CTA destinations
CTA copy/destinations are not final in the source pack. URLs therefore come from deployment config. Missing URLs cause the CTA to be omitted rather than creating a dead route.

## ADR-008 — Standalone deployment
Use `output: "standalone"` for compact KVM2/Docker deployment. The public app can be served behind the same reverse proxy as other Authority Closers apps without sharing process memory or code ownership.

## ADR-009 — No premature shared package
Keep `src/features/dipak-hero` inside the app now. Extract to `packages/...` only when a second application actually needs to consume it.

This avoids turning an ordinary feature folder into a versioned library before reuse exists.

## ADR-010 — No platform concerns in hero module
The hero must not know about:
- PostgreSQL schemas;
- user accounts;
- organizations/tenants;
- course enrolments;
- payment events;
- simulator buyer state;
- vector retrieval;
- LLM providers;
- internal admin APIs.

That separation is exactly what lets it fit cleanly into the larger system later.
