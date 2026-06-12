# Build Failure Triage Guide

## Problem/Feature Description

A developer on the Forge team has just opened a PR for a new feature. The Vercel preview deployment failed immediately. The developer has never dealt with a Vercel build failure on this project before and isn't sure where to start. They've shared a description of the symptoms and need you to help them understand what each symptom means and exactly what to do to fix it.

The developer has shared the following notes about what they are seeing:

- In one failed attempt, the build log showed: `Type error: Property 'orgId' does not exist on type 'Session'`
- In a second attempt after some changes, the log showed: `Environment variable NEXT_PUBLIC_DATA_URL is not defined`
- In a third attempt, it showed: `Module not found: Can't resolve '../hooks/useProjects'`
- They also noticed a case where importing a file called `Components/Button` worked locally but failed on the build server

Write a troubleshooting guide (`troubleshooting-guide.md`) that explains each of these failure modes and the correct resolution for each.

## Output Specification

Write a file named `troubleshooting-guide.md` that:
- Covers each of the four failure symptoms above as a separate section
- For each symptom: explains the cause, provides the exact fix or steps to resolve it, and says where to find the build logs on Vercel
- Is written clearly enough that a developer unfamiliar with this project can follow it
