# Deployment Contract

## Recommended early deployment
Run this Next.js public surface as its own container/process behind the same reverse proxy used by the broader Authority Closers infrastructure.

Suggested topology:

```text
Internet
  -> Cloudflare DNS/CDN (optional)
  -> Caddy/Nginx on KVM2
  -> dipak-web container :3100 loopback
```

The container only exposes `127.0.0.1:3100` on the host by default. Terminate TLS at the reverse proxy.

## Commands

```bash
docker compose build
docker compose up -d
curl http://127.0.0.1:3100/api/health
```

## Why standalone output
Next.js `output: "standalone"` creates a traced minimal runtime suitable for Docker/VPS deployment. This keeps the public web process isolated from the future FastAPI platform service while allowing both to coexist on the same VPS.

## Monorepo note
When this moves under `apps/dipak-web`, revisit `outputFileTracingRoot` only if standalone output needs files from workspace packages outside the app directory. Do not add it prematurely.
