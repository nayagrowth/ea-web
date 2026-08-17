# Dipak Hero — Monorepo-Ready Agent Pack v2

This pack takes the supplied Dipak Vishwakarma hero assets/direction and turns them into a **production-oriented, separate-repo frontend module** that is designed to move into the future Authority Closers monorepo without architecture churn.

Start here:

1. `00_AGENT_HANDOFF/START_HERE.md`
2. `00_AGENT_HANDOFF/CODEX_OR_ANTIGRAVITY_PROMPT.md`
3. `01_REPO/AGENTS.md`
4. `02_ARCHITECTURE/ARCHITECTURE_DECISIONS.md`
5. `03_ACCEPTANCE/ACCEPTANCE_CRITERIA.md`

`01_REPO/` is the actual working repository to hand to Codex / Antigravity.

The pack intentionally does **not** add the Authority Closers backend, LMS, simulator, database, auth, AI, or telemetry vendor. Those belong to other bounded modules. This hero only establishes the correct public-surface boundary and future integration contract.
