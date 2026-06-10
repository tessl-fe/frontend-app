---
name: rapid-deploy
description: Use for deployments, shipping to production, hotfixes, rollbacks, preview deployments, and any task related to getting frontend-app code live on Vercel.
---

# Rapid Deploy (Forge Dashboard)

Forge's `frontend-app` deploys to **Vercel**. Every push to `main` triggers a production deploy automatically. Every PR gets an isolated preview deployment.

## When to Use This Skill

- Reviewing a PR before merging to `main`
- Monitoring or troubleshooting a production deploy
- Rolling back a broken production deploy
- Diagnosing a failed Vercel build
- Preparing a hotfix

## Pre-Merge Checklist

Before merging any PR into `main`, confirm all of the following:

### 1. Build passes locally
```bash
npm run build
```
Expected: exits 0 with no TypeScript errors. If it fails, do not merge.

### 2. Environment variables are set in Vercel
Every key in `.env.example` must exist in Vercel project settings → Environment Variables → Production.

New env vars introduced in this PR must be added to Vercel **before merging** — not after.

Keys to verify:
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_DATA_URL`

If a key is missing, add it in Vercel and re-deploy the preview before merging.

### 3. Preview URL tested
The Vercel bot posts a preview URL as a PR comment. Open it and verify:

- [ ] Login works end-to-end
- [ ] Dashboard loads and shows projects
- [ ] Project detail page opens and API keys display
- [ ] No errors in browser devtools Console

### 4. No debug artifacts in changed files
```bash
git diff main...HEAD -- '*.tsx' '*.ts' | grep '^\+.*console\.'
```
Remove any `console.log` / `console.error` that appear in production code paths.

### 5. .env.example reflects all env vars
If this PR adds a new `process.env.*` reference, `.env.example` must be updated in the same PR.

## Deploy

Merging to `main` triggers production deploy automatically. Watch it:

```bash
# Install Vercel CLI if needed: npm i -g vercel
vercel ls tessl-fe/frontend-app --prod
```

Or check the Vercel dashboard → Deployments tab. Expected build time: 60–90 seconds.

## Rollback

If production is broken after a merge:

```bash
# List recent deployments
vercel ls

# Instant rollback — re-routes traffic to a previous build, no rebuild
vercel rollback <previous-deployment-url>
```

Rollback is instant because Vercel just re-routes the edge network — no rebuild required.

## Common Build Failures

| Symptom | Fix |
|---------|-----|
| `Type error: X is not assignable to Y` | Fix TypeScript in the flagged file |
| `Environment variable X is not defined` | Add it to Vercel project settings |
| `Module not found: Can't resolve '...'` | Run `npm install`, commit updated `package-lock.json` |
| `ENOENT: no such file` | Check that all imported files exist with correct casing (case-sensitive on Linux) |

Build logs: open the deployment in Vercel dashboard → click "Build Logs".
