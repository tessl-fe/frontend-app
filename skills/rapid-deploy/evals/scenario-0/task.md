# PR Readiness Report for Forge Dashboard

## Problem/Feature Description

The Forge team has been struggling with broken production deploys after merges. Senior engineers have been informally checking various things before merging, but the process isn't documented or consistently followed. After a particularly bad incident last week where a broken build went to production and required an emergency rollback, the engineering lead has asked for a structured approach.

You are helping a developer prepare a specific PR for merging to `main`. The PR (branch `feature/add-api-key-rotation`) modifies several TypeScript files in the `frontend-app` repository and introduces a new environment variable reference (`process.env.NEXT_PUBLIC_API_ROTATION_KEY`) in the code. The `.env.example` file has not yet been updated.

Your job is to produce a **pre-merge readiness report** (`readiness-report.md`) that documents every check the developer must complete before this PR is safe to merge, along with the exact commands or steps for each check. The report should be thorough enough that any developer on the team could follow it independently.

## Output Specification

Write a file named `readiness-report.md` containing the full pre-merge checklist with:
- Each check listed as a numbered step with a clear pass/fail criterion
- The exact shell command (if applicable) for each step
- An explanation of what to do if a check fails
- A section specifically covering environment variable requirements for this PR

The report should cover all checks that are relevant to a typical frontend-app PR, including build verification, environment variable management, preview testing, and code cleanliness.
