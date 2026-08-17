# Future Monorepo Fit

## Separate repo today
Current root:

```text
01_REPO/
  src/app/
  src/features/dipak-hero/
  src/styles/
```

This is intentionally a valid standalone Next.js app.

## Target later

```text
authority-closers/
  apps/
    dipak-web/
      src/app/
      src/features/dipak-hero/    <- move unchanged
    platform-web/
    admin-web/
  packages/
    ui/                           <- only after real reuse exists
    telemetry-contracts/
    config/
  services/
    platform-api/                 <- FastAPI/Python modular core
```

### Migration rule
Move the repository root into `apps/dipak-web/`. Do not rewrite the hero merely because the filesystem acquired a parent monorepo.

### When shared packages appear
Only extract something after a second consumer exists:

| Current thing | Extract later when... | Likely future package |
|---|---|---|
| event names | platform/admin also emit/consume them | `@authorityclosers/telemetry-contracts` |
| buttons/tokens | at least two apps use the same UI primitives | `@authorityclosers/ui` |
| environment/config schema | multiple apps share deployment configuration | `@authorityclosers/config` |

Next.js supports transpiling local workspace packages through `transpilePackages`; use it when these packages actually exist.

### Backend relationship later
Do not import platform internals into the public app. Use an explicit HTTP/API contract when the public surface eventually needs dynamic data.

```text
dipak-web -> public API contract -> platform-api
```

The public web app must never gain direct database access merely because both processes run on the same VPS.

### Authentication later
The hero remains anonymous/public. If a login entry point is added later, it should redirect/hand off to the platform identity surface rather than cloning authentication logic into the hero feature.

### Deployment later
Possible end state on one KVM2/KVM4 host:

```text
reverse proxy
  -> dipak-web      :3100
  -> platform-web   :3200
  -> admin-web      :3300
  -> platform-api   :8000
```

The fact that multiple apps share one host does not require one runtime or one repo today.
