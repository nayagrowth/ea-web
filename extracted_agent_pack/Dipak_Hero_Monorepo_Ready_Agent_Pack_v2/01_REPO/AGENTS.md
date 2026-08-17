# AGENTS.md — Dipak Public Hero

## Scope
This repository exists to ship one production-quality public hero surface. It is deliberately small but structurally compatible with the future Authority Closers monorepo.

## Architecture rules
1. `src/app` composes routes. It does not contain feature logic.
2. `src/features/dipak-hero` owns the hero component, content contract, assets, and scoped CSS.
3. Hero code is a Server Component by default. Do not add `"use client"` unless interaction truly requires it.
4. Do not add state management for this feature.
5. Do not add a backend/database. Future platform business logic lives in the Authority Closers FastAPI service, not here.
6. Do not add an analytics vendor. Preserve `data-ac-event` attributes; a future shared telemetry adapter will consume them.
7. Do not add Tailwind, shadcn, Framer Motion, GSAP, icon libraries, or a CMS for one hero. CSS Modules + semantic HTML are sufficient and reduce future integration coupling.
8. Keep assets local and use `next/image` for the LCP portrait.
9. Never couple the hero to Authority Closers database entities, auth, tenant state, AI models, or payment logic.
10. CTA URLs may come from environment/config. Never hard-code a fake or dead destination merely to make a button clickable.

## Performance rules
- No client JavaScript from the hero unless it creates measurable user value.
- Portrait must use Next Image optimization with correct `sizes` and high-priority LCP loading.
- No layout shift from image sizing.
- No unnecessary third-party requests.
- Keep the above-the-fold DOM shallow.
- Respect `prefers-reduced-motion`.

## Portability target
Later migration should be approximately:

```text
this repo root
  -> authority-closers/apps/dipak-web/
```

The `src/features/dipak-hero` folder should move unchanged.

Only extract a shared package when a second real consumer exists.

## Required verification
Run:

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm start
curl http://localhost:3000/api/health
```

Then visually check at minimum 390x844, 768x1024, 1440x900, and 1920x1080.
