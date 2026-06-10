# forge/frontend-app

Web dashboard for the Forge developer platform. Manage projects, API keys, and view usage metrics.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Auth:** JWT tokens stored in localStorage with automatic refresh

## Setup

```bash
npm install
cp .env.example .env.local   # edit values if your services run on different ports
npm run dev                  # http://localhost:3000
```

Requires `backend-api` running on port 3001 and `data-service` on port 3002.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/dashboard` or `/login` |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | Project list with usage sparklines |
| `/dashboard/[id]` | Project detail — API key management |
| `/settings` | Environment info and sign out |

## Skills

- **rapid-deploy** — Covers pre-merge checklist, Vercel deploy monitoring, and rollback procedure.
