# Verified Technical Baseline — 17 August 2026

This pack deliberately uses current primary-source guidance rather than adding fashionable dependencies.

## Next.js
- Next.js App Router is the current application model and supports Server Components.
- Next.js 16 is current; the July 2026 security release identifies **16.2.11 as Active LTS** and recommends upgrading to that patch.
- Next.js 16 requires Node.js 20.9+.
- Next.js 16 supports monorepo/local package transpilation via `transpilePackages`.
- Next.js supports `output: "standalone"` for minimal production deployment/Docker.
- Next.js 16 deprecates Image `priority` in favor of `preload` and supports responsive image optimization.
- Next.js 16 introduced/expanded DevTools MCP support for coding agents. `.mcp.json` in the repo exposes the official-style `next-devtools-mcp@latest` invocation.

Sources:
- https://nextjs.org/blog/next-16
- https://nextjs.org/blog
- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/api-reference/components/image
- https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages
- https://nextjs.org/docs/15/app/api-reference/config/next-config-js/output
- https://nextjs.org/docs/app/guides/upgrading/version-16

## React
React's official version index lists React 19.2.7 in June 2026. This pack pins React/ReactDOM 19.2.7 to avoid an unnecessary moving target during the handoff.

Source:
- https://react.dev/versions

## Why no Tailwind despite current Tailwind 4.x
Tailwind 4.3 is current and capable. It is intentionally not required here because:
- the requested scope is one hero;
- CSS Modules already provide local scoping;
- no utility framework needs to become part of the future integration contract;
- fewer dependencies make the separate-repo -> monorepo move simpler.

This decision may change when the future monorepo establishes an actual shared UI system.

Source:
- https://tailwindcss.com/blog/tailwindcss-v4-3

## Connection to Authority Closers architecture work
The larger architecture work selected:
- modular boundaries before microservices;
- provider abstraction;
- data/events ahead of UI hacks;
- PostgreSQL as system of record;
- FastAPI/Python as a strong backend/intelligence candidate;
- differentiated logic inside, commodity services outside;
- evidence-gated expansion.

The hero applies the same principle at frontend scale: **small surface, strong boundary, no premature platform dependencies.**
