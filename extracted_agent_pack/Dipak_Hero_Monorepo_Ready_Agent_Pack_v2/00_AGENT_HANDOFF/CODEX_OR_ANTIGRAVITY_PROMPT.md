# Execution Prompt

You are implementing a production hero section from a prepared architecture pack.

Work inside `01_REPO/`.

Before coding, read:
- `AGENTS.md`
- `../02_ARCHITECTURE/ARCHITECTURE_DECISIONS.md`
- `../02_ARCHITECTURE/MONOREPO_FIT.md`
- `../03_ACCEPTANCE/ACCEPTANCE_CRITERIA.md`
- `../05_SOURCE_REFERENCES/original_notes/README_AGENT_HANDOFF.txt`

Then execute end-to-end.

Constraints:
- Hero only. Do not create extra page sections.
- Keep the hero a Server Component unless a client boundary is truly required.
- Use supplied local portrait assets and Next.js image optimization.
- Use CSS Modules / CSS variables already provided. Do not install Tailwind, shadcn, Framer Motion, GSAP, Redux, Zustand, an icon pack, or a UI framework for this task.
- Do not add a Python backend. This public surface is deliberately separate from the future FastAPI platform service.
- Do not add a database, auth system, AI SDK, vector database, or analytics SDK.
- Preserve typed event/data attributes so later Authority Closers telemetry can adopt the surface without rewriting the hero.
- Keep the feature folder portable into `apps/dipak-web/src/features/dipak-hero` in a future monorepo.
- Do not place reusable Authority Closers business logic in this repo.
- Do not change final headline away from `Sales Is The Transfer Of Certainty.`
- CTA destinations are not locked in the source material. Do not ship dead links. If final destinations are unavailable, omit the unresolved CTA rather than inventing a false destination.
- Validate production build, lint, typecheck, `/api/health`, mobile layout and desktop layout.
- Do not stop after generating code. Run and verify it.

Definition of done is in `03_ACCEPTANCE/ACCEPTANCE_CRITERIA.md`.
