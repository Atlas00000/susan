# Sanaya's Scents (Prototype)

Client-side marketing/catalog prototype. Docker-first to avoid port issues; no backend yet.

## Prerequisites
- Docker Desktop

## Quick Start (Dev)
```bash
# build images without starting containers
docker compose build

# start only when you need to preview (do not run by default)
# docker compose up frontend
```

## Structure
```
frontend/  # Next.js App Router (TypeScript)
```

## Frontend (Next.js)
- Dev server port: 3000 (inside container)
- Commands are defined in `frontend/package.json` but run inside Docker

## Notes
- Use pnpm inside the container (Dockerfile enables corepack)
- Images and content will be added later per roadmap

