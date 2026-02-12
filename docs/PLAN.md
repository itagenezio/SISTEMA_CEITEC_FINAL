# Mission PLAN: Sistema CEITEC Operational Unification

## Context
This project aims to unify a React + Vite frontend with a Flutter OCR Scanner, ensuring a professional theme and seamless deployment on Vercel.

## Objectives
- [ ] **1. Build Unification & Cross-Platform Support**
    - Fix `package.json` scripts to use cross-platform commands for asset copying (Vite build + Flutter assets).
    - Ensure `vercel.json` correctly handles routing for both the SPA and the Flutter subdirectories.
- [ ] **2. Database & Data Integrity**
    - Audit `.env` and `.env.local` against Supabase connection requirements.
    - Verify that the Student/Exam/Correction flows are working with the real database schema.
- [ ] **3. UI/UX Refinement (Professional Blue & White)**
    - Audit `src/index.css` and Tailwind config for theme consistency.
    - Ensure all buttons, modals, and navigation components follow the premium aesthetic guidelines.
- [ ] **4. Deployment Readiness & Verification**
    - Run security scans.
    - Run linting.
    - Execute `checklist.py`.
    - Final production build locally before deploy.

## Task Breakdown

### Phase 1: Infrastructure & Build Fixes
- Modify `package.json` to use `shx` or a custom node script for cross-platform `cp`.
- Update `vercel-build` script to include scanner assets.

### Phase 2: Logic & Data Audit
- Review `src/services/supabase.ts` (or equivalent) for correct initialization.
- Test connection to Supabase.

### Phase 3: Aesthetic Polishing
- Review main layout components for the "Professional Blue/White" theme.
- Fix any broken icons or layout shifts.

### Phase 4: Verification
- Run `security_scan.py`.
- Run `lint_runner.py`.
- Run `checklist.py`.

## Verification Criteria
- `npm run build` succeeds locally and on Vercel.
- `/scanner_ocr` is accessible independently.
- SPA routing (`/dashboard`, `/alunos`, etc.) works without 404s.
- Professional theme is visibly applied.
