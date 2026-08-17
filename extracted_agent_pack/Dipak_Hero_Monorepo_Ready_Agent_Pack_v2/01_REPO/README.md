# Dipak Vishwakarma Public Hero

A deliberately narrow Next.js public surface for Dipak Vishwakarma. The repository exists independently now and is structured to move into the future Authority Closers monorepo without redesigning the hero feature boundary.

## Why this stack
- **Next.js 16.2.11 + React 19.2.7 + TypeScript**: current security-patched Next.js line and standard future web-app fit.
- **CSS Modules, no UI framework**: one hero does not justify Tailwind/shadcn/animation dependencies; scoped CSS minimizes future monorepo coupling.
- **Server Component by default**: the hero should add essentially no client-side application JavaScript.
- **next/image**: responsive AVIF/WebP generation, correct sizing, blur placeholder, LCP optimization.
- **Standalone output**: straightforward deployment on a KVM2-class VPS through Docker/reverse proxy.
- **No backend in this repo**: Authority Closers business/data/AI logic belongs in the future platform API, expected to be FastAPI/Python.

## Run

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run check
npm start
curl http://localhost:3000/api/health
```

## CTA URLs
The supplied source pack explicitly says CTA copy/destinations are not finally locked. The default content therefore contains the CTA labels but **no hrefs**, so unresolved CTAs are not rendered.

When approved destinations exist, set the `href` fields in `src/features/dipak-hero/hero.content.ts` (or later adapt a shared configuration source into the same typed `HeroContent` contract). Do not ship a dead or fabricated destination.

## Deployment
See `DEPLOYMENT.md`.

## Future monorepo
See `../02_ARCHITECTURE/MONOREPO_FIT.md` in the handoff pack.
