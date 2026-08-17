# Acceptance Criteria

## Scope
- [ ] `/` contains the hero and no invented downstream sections.
- [ ] Final headline is exactly **Sales Is The Transfer Of Certainty.**
- [ ] Supplied primary seated portrait is first-choice visual.
- [ ] No fake CTA destination ships. Missing destination => CTA omitted.

## Architecture
- [ ] `src/features/dipak-hero` has no imports from future platform business/data modules.
- [ ] No backend/database/auth/AI SDK exists in this repo.
- [ ] No state-management library.
- [ ] No UI/animation framework added without a measured requirement.
- [ ] Hero remains a Server Component unless a client boundary is justified in the delivery notes.
- [ ] Event semantics remain vendor-neutral.

## Build quality
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `GET /api/health` returns HTTP 200.
- [ ] Docker image builds and starts when Docker deployment is used.

## Responsive QA
Verify screenshots at minimum:
- [ ] 390 × 844
- [ ] 768 × 1024
- [ ] 1440 × 900
- [ ] 1920 × 1080

At all viewports:
- [ ] no horizontal overflow;
- [ ] no text clipped outside the viewport;
- [ ] portrait does not cover headline/body/CTA;
- [ ] visible focus states;
- [ ] readable line lengths;
- [ ] no layout shift caused by portrait sizing.

## Performance
- [ ] LCP portrait uses `next/image` responsive sizing.
- [ ] No third-party JS is required to render the hero.
- [ ] No external font download is required by the source code.
- [ ] Hero does not add a client bundle merely for animation.
- [ ] DevTools Network shows optimized image delivery in production mode.

## Accessibility
- [ ] One `<h1>`.
- [ ] Portrait has useful alt text.
- [ ] Wordmark link has accessible name.
- [ ] CTA focus indicators are keyboard-visible.
- [ ] Color is not the sole carrier of meaning.
- [ ] Motion respects `prefers-reduced-motion`.

## Deployment safety
- [ ] `NEXT_PUBLIC_SITE_ORIGIN` is correct in production.
- [ ] CTA URL env vars are approved or omitted.
- [ ] No secrets exist in any `NEXT_PUBLIC_*` variable.
- [ ] Reverse proxy/TLS is configured outside the app process.
