# Why This Hero Fits the Larger Authority Closers System

## The important architectural insight
The previous system design is data-heavy and backend-heavy. That does **not** imply every repository should contain the data/backend stack.

A good architecture preserves different rates of change:

```text
Dipak public hero
  changes with brand/copy/public content

Platform API
  changes with identity, learning, simulator, payments, AI and data

Admin app
  changes with operations and staff workflows
```

Keeping these boundaries separate now means they can share a monorepo later without becoming one tangled application.

## What is frozen now
- public app is React/Next/TypeScript;
- feature-first folder boundary;
- semantic event naming;
- image/performance contract;
- anonymous/public nature of the hero;
- backend is accessed through explicit APIs later, never direct DB imports;
- no provider-specific analytics contract inside feature code.

## What remains replaceable
- reverse proxy;
- VPS/cloud vendor;
- analytics implementation;
- CTA destinations;
- shared design-system package;
- future CMS;
- future deployment topology.

This is consistent with the earlier systems principle: **freeze stable semantics; keep vendors and implementation details replaceable.**
