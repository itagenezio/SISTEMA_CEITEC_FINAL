# 🚀 DEPLOY PLAN: Official Production Release (Protocol 1-2-3)

## Context
The user has authorized the "Official Deploy". The system is unified (React + Flutter), and we must ensure stability before the final push to Vercel.

## The Protocol (1-2-3)

### 1. 🛡️ BLINDAGEM (Verification)
**Goal:** Ensure no critical vulnerabilities or broken code reach production.
- [ ] Run `npm run lint` (Must pass with 0 errors).
- [ ] Check for exposed secrets in `.env`.
- [ ] Validate `vercel.json` configuration.

### 2. 🏗️ CONSTRUÇÃO (Build)
**Goal:** Create a standardized, optimized artifact.
- [ ] Clean previous builds (`dist/`, `.vercel/`).
- [ ] Execute `npm run build` (Production Mode).
- [ ] Verify `dist/scanner_ocr` integrity (Flutter assets).

### 3. 🚀 LANÇAMENTO (Deploy)
**Goal:** Ship to the world.
- [ ] Execute `npx vercel --prod --yes`.
- [ ] Verify final URL accessibility.
- [ ] Run post-deploy smoke test (Check `/` and `/scanner_ocr`).

## Agents Required
1.  `security-auditor` (Phase 1)
2.  `devops-engineer` (Phase 2 & 3)
3.  `test-engineer` (Validation)

## Exit Criteria
- Deployment URL is active (200 OK).
- No critical errors in build logs.
