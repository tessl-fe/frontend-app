# Code Review: Flag Issues Blocking Merge

## Problem/Feature Description

The Forge team uses an automated assistant to flag issues that would block a PR from being merged safely. You are that assistant. A developer has submitted a PR (`feature/project-settings-panel`) for review before it goes to `main`. The PR modifies TypeScript and TSX files in the frontend-app.

The diff has been captured in `inputs/feature.diff`. Your job is to analyze this diff and produce a structured review report (`review-report.md`) that lists every issue that would block this PR from being safely merged, along with the remediation steps for each.

Focus exclusively on issues that relate to deployment readiness. Do not comment on code style, architectural decisions, test coverage, or feature correctness.

## Output Specification

Write a file named `review-report.md` that:
- Lists each blocking issue with a clear heading
- For each issue: identifies where in the diff it occurs, explains why it is a problem, and gives the exact remediation step
- Concludes with a summary of whether the PR is ready to merge (pass/block) based on the issues found
