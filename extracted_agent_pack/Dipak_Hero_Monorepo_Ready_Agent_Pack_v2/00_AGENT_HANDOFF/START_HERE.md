# Dipak Vishwakarma Hero — Agent Execution Pack

## Mission
Build and deploy **only the homepage hero surface** for Dipak Vishwakarma. Do not expand into a full website, LMS, sales simulator, dashboard, CRM, or Authority Closers application in this repository.

This repository is intentionally a **front-facing web surface** that can live independently today and later move into the Authority Closers monorepo without rewriting the hero feature.

## Execute this way
1. Open `01_REPO/` as the working repository.
2. Read `AGENTS.md` before modifying anything.
3. Run the repository locally.
4. Preserve the supplied hero copy and primary portrait unless a source file explicitly allows an alternative.
5. Implement/polish only what is needed for the hero to be production-ready.
6. Do not introduce a backend, database, AI SDK, auth provider, state library, animation library, CMS, analytics vendor, UI kit, or component framework for this hero.
7. Run lint, typecheck, production build, and the health endpoint check.
8. Validate desktop + tablet + mobile with screenshots and confirm no overflow/CLS.
9. Deploy the built app using the provided standalone/Docker path or the target host's native Next.js support.

## The architectural intent
This is **not** a toy static HTML file. It is a clean Next.js public-surface app whose feature boundary can later become:

```text
authority-closers/
  apps/
    dipak-web/        <- this repo can move here
    platform-web/
    admin-web/
  packages/
    ui/
    telemetry-contracts/
    config/
  services/
    platform-api/     <- FastAPI/Python core, separate from this hero
```

The hero feature itself stays at:

```text
src/features/dipak-hero/
```

That folder should not import app-specific business logic, databases, authentication, or API clients.

## Non-negotiable scope
**One route. One hero. One production surface.**

The hero should contain the brand identity/header, main editorial message, supporting copy, portrait, and only the minimum CTA/navigation affordances necessary for a credible live hero.

Do not invent additional sections.
