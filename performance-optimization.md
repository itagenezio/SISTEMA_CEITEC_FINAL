# Performance Optimization Plan
**Project:** SISTEMA CEITEC FINAL  
**Task:** Reduce bundle from 1.2MB to <500KB with holistic performance optimization  
**Created:** 2026-02-13  
**Mode:** COMPLEX CODE (Planning Phase)

---

## 📋 Overview

### Current State
- **Bundle Size:** 1,222,773 bytes (1.2MB) - SINGLE monolithic chunk
- **CSS:** 138,924 bytes (139KB)
- **Build Config:** Basic manual chunking (vendor-react only)
- **Dependencies:** 34 production packages including heavy libraries (MUI, Radix, Framer Motion)

### Target State
- **Bundle Size:** < 500KB (initial load)
- **Time to Interactive (TTI):** < 2s on 3G
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Code Splitting:** Route-based + component-based lazy loading
- **Tree Shaking:** Aggressive elimination of unused code

### Success Criteria
- ✅ Initial bundle < 500KB (58% reduction)
- ✅ Lighthouse Performance Score > 90
- ✅ Build validation passes without errors
- ✅ All routes functional with lazy loading
- ✅ Vercel preview deployment successful

---

## 🎯 PROJECT TYPE

**Type:** WEB (React + Vite)  
**Primary Agent:** `performance-optimizer`  
**Supporting Agents:** `frontend-specialist`, `test-engineer`

---

## 🔧 Tech Stack

| Technology | Current | Optimized | Rationale |
|------------|---------|-----------|-----------|
| **Build Tool** | Vite 6.1.0 | Vite 6.1.0 + advanced config | Native ESM, fast HMR |
| **Bundler** | Rollup (default) | Rollup + manual chunks | Fine-grained control |
| **Code Splitting** | Basic | Route-based + lazy | Reduce initial payload |
| **UI Libraries** | MUI + Radix (full) | Tree-shaken imports | Remove unused components |
| **Animation** | Framer Motion 12.0 | Selective imports | Heavy library (70KB+) |
| **Icons** | Lucide (full) | Lazy-loaded | 475KB package |
| **Compression** | None | Brotli + Gzip | 60-80% size reduction |

---

## 📁 File Structure (No Changes)

Current structure is adequate. Focus on configuration and import optimization.

```
src/
├── Router.tsx          → ADD lazy loading
├── app/                → 67 files (analyze for splitting)
├── components/         → ADD dynamic imports
├── pages/              → 5 pages (lazy load all)
└── main.tsx            → Keep minimal
```

---

## 📊 Task Breakdown

### PHASE 1: ANALYSIS & DISCOVERY

#### Task 1.1: Bundle Analysis
- **ID:** `T1.1`
- **Agent:** `performance-optimizer`
- **Skills:** `performance-profiling`
- **Priority:** P0 (Blocker)
- **Dependencies:** None

**INPUT:**
- Current `dist/` build
- `package.json` dependencies

**OUTPUT:**
- Detailed report on:
  - Top 10 heaviest packages
  - Unused exports
  - Duplicate modules
  - Opportunities for code splitting

**VERIFY:**
```bash
# Generate bundle visualization
npm run build -- --stats
# Analyze with rollup-plugin-visualizer
```

---

#### Task 1.2: Dependency Audit
- **ID:** `T1.2`
- **Agent:** `performance-optimizer`
- **Skills:** `vulnerability-scanner`
- **Priority:** P0
- **Dependencies:** None

**INPUT:**
- `package.json` dependencies (34 packages)

**OUTPUT:**
- List of:
  - Replaceable heavy libraries
  - Unused dependencies (candidate for removal)
  - Bundle impact per package

**VERIFY:**
```bash
npx depcheck
npm ls --depth=0
```

---

### PHASE 2: CONFIGURATION OPTIMIZATION

#### Task 2.1: Vite Config - Advanced Chunking
- **ID:** `T2.1`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`, `performance-profiling`
- **Priority:** P1
- **Dependencies:** T1.1, T1.2

**INPUT:**
- Bundle analysis report (T1.1)
- Current `vite.config.ts`

**OUTPUT:**
- Optimized `vite.config.ts` with:
  - Granular manual chunks (UI libs, utilities, router)
  - Minification settings (terser with compression)
  - CSS code splitting
  - Asset optimization

**VERIFY:**
```bash
npm run build
# Check dist/assets/ for multiple chunks
ls -lh dist/assets/
```

**Implementation Guide:**
```typescript
// vite.config.ts optimization targets
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        'vendor-ui-radix': ['@radix-ui/...'], // All Radix components
        'vendor-ui-mui': ['@mui/material', '@mui/icons-material'],
        'vendor-forms': ['react-hook-form', 'zod'],
        'vendor-charts': ['recharts'],
        'vendor-animation': ['framer-motion'],
        'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge'],
      }
    }
  },
  cssCodeSplit: true,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
}
```

---

#### Task 2.2: Tree Shaking Configuration
- **ID:** `T2.2`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`
- **Priority:** P1
- **Dependencies:** T2.1

**INPUT:**
- Optimized `vite.config.ts`

**OUTPUT:**
- Enhanced tree shaking via:
  - `sideEffects: false` in package.json
  - Named imports enforcement
  - Dead code elimination flags

**VERIFY:**
```bash
npm run build
# Check bundle for eliminated code
```

---

### PHASE 3: CODE OPTIMIZATION

#### Task 3.1: Route-Based Code Splitting
- **ID:** `T3.1`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`
- **Priority:** P1
- **Dependencies:** T2.1

**INPUT:**
- `src/Router.tsx`
- `src/pages/*` (5 page components)

**OUTPUT:**
- Converted all route imports to `React.lazy()`
- Wrapped routes with `<Suspense>` + loading fallback

**VERIFY:**
```bash
npm run build
# Verify page-specific chunks in dist/assets/
grep -r "lazy" src/Router.tsx
```

**Implementation:**
```tsx
// Before: import Dashboard from './pages/Dashboard'
// After:
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

// In Router:
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
</Suspense>
```

---

#### Task 3.2: Component-Level Lazy Loading
- **ID:** `T3.2`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`
- **Priority:** P2
- **Dependencies:** T3.1

**INPUT:**
- Heavy components (modals, charts, complex UI)
- Analysis from T1.1 (heavy component list)

**OUTPUT:**
- Lazy-loaded components:
  - Modal dialogs
  - Charts (recharts)
  - Large form components
  - Accordion panels

**VERIFY:**
```bash
# Check for lazy imports in components
grep -r "React.lazy" src/components/
```

---

#### Task 3.3: Dynamic Icon Imports
- **ID:** `T3.3`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`
- **Priority:** P2
- **Dependencies:** T3.2

**INPUT:**
- Current icon usage (`lucide-react` - 475KB)

**OUTPUT:**
- Converted to named imports:
  ```tsx
  // Before: import { Icon1, Icon2, ... } from 'lucide-react'
  // After: import Icon1 from 'lucide-react/dist/esm/icons/icon1'
  ```

**VERIFY:**
```bash
npm run build
# Bundle should NOT include full lucide-react
```

---

#### Task 3.4: Optimize MUI & Radix Imports
- **ID:** `T3.4`
- **Agent:** `frontend-specialist`
- **Skills:** `react-best-practices`
- **Priority:** P2
- **Dependencies:** T3.3

**INPUT:**
- Current MUI/Radix imports

**OUTPUT:**
- Direct component imports:
  ```tsx
  // Before: import { Button } from '@mui/material'
  // After: import Button from '@mui/material/Button'
  
  // For Radix - keep current (already optimized)
  ```

**VERIFY:**
```bash
# Check import patterns
grep -r "from '@mui/material'" src/
```

---

### PHASE 4: ASSET OPTIMIZATION

#### Task 4.1: Image Optimization
- **ID:** `T4.1`
- **Agent:** `performance-optimizer`
- **Skills:** `performance-profiling`
- **Priority:** P2
- **Dependencies:** None (parallel)

**INPUT:**
- `public/` assets (27 files)

**OUTPUT:**
- Optimized images:
  - Convert PNG → WebP where applicable
  - Compress JPEG/PNG (ImageOptim/Sharp)
  - Add responsive images with srcset

**VERIFY:**
```bash
ls -lh public/
# Compare file sizes before/after
```

---

#### Task 4.2: Font Optimization
- **ID:** `T4.2`
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** P3
- **Dependencies:** None

**INPUT:**
- Font loading strategy

**OUTPUT:**
- Optimized font loading:
  - Preload critical fonts
  - font-display: swap
  - Subset fonts (remove unused glyphs)

**VERIFY:**
```bash
# Check font preloading in index.html
grep "preload" index.html
```

---

### PHASE 5: DEPLOYMENT OPTIMIZATION

#### Task 5.1: Vercel Configuration
- **ID:** `T5.1`
- **Agent:** `performance-optimizer`
- **Skills:** `deployment-procedures`
- **Priority:** P1
- **Dependencies:** T2.1, T3.1

**INPUT:**
- Current `vercel.json`

**OUTPUT:**
- Enhanced `vercel.json`:
  - Compression enabled (Brotli + Gzip)
  - Cache headers (immutable for assets)
  - Prerender critical routes

**VERIFY:**
```bash
# Check deployment preview
vercel --prod
# Inspect headers with curl
```

**Implementation:**
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

#### Task 5.2: Pre-rendering Critical Routes
- **ID:** `T5.2`
- **Agent:** `performance-optimizer`
- **Skills:** `performance-profiling`
- **Priority:** P3
- **Dependencies:** T5.1

**INPUT:**
- Critical routes (/) 

**OUTPUT:**
- Static HTML for landing page
- Reduced TTFB

**VERIFY:**
```bash
# Check for prerendered HTML
curl https://preview-url.vercel.app/ | grep "html"
```

---

### PHASE 6: VERIFICATION & TESTING

#### Task 6.1: Build Validation
- **ID:** `T6.1`
- **Agent:** `test-engineer`
- **Skills:** `testing-patterns`
- **Priority:** P0
- **Dependencies:** ALL implementation tasks

**INPUT:**
- Optimized codebase

**OUTPUT:**
- Successful build with:
  - No errors
  - Bundle size report
  - Chunk analysis

**VERIFY:**
```bash
npm run build
ls -lh dist/assets/
# Total JS < 500KB
```

---

#### Task 6.2: Local Testing
- **ID:** `T6.2`
- **Agent:** `test-engineer`
- **Skills:** `webapp-testing`
- **Priority:** P0
- **Dependencies:** T6.1

**INPUT:**
- Build output

**OUTPUT:**
- Verified:
  - All routes load correctly
  - Lazy loading works
  - No console errors
  - Smooth navigation

**VERIFY:**
```bash
npm run dev
# Manual testing checklist:
# - Navigate to all pages
# - Check Network tab for chunked loading
# - Verify no 404s
```

---

#### Task 6.3: Lighthouse Audit
- **ID:** `T6.3`
- **Agent:** `performance-optimizer`
- **Skills:** `performance-profiling`
- **Priority:** P1
- **Dependencies:** T6.2

**INPUT:**
- Running dev server

**OUTPUT:**
- Lighthouse report with:
  - Performance > 90
  - LCP < 2.5s
  - Bundle analysis

**VERIFY:**
```bash
python .agent/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000
# Check score in report
```

---

#### Task 6.4: Preview Deployment
- **ID:** `T6.4`
- **Agent:** `test-engineer`
- **Skills:** `deployment-procedures`
- **Priority:** P1
- **Dependencies:** T6.3

**INPUT:**
- Optimized build + Vercel config

**OUTPUT:**
- Preview URL with:
  - < 500KB initial load
  - Compression enabled
  - Fast TTI

**VERIFY:**
```bash
vercel --prod
# Test preview URL:
# - Check Network tab
# - Verify Brotli compression
# - Measure load time on 3G
```

---

#### Task 6.5: Security & Lint
- **ID:** `T6.5`
- **Agent:** `test-engineer`
- **Skills:** `vulnerability-scanner`
- **Priority:** P0
- **Dependencies:** T6.4

**INPUT:**
- Optimized codebase

**OUTPUT:**
- Clean reports:
  - No security vulnerabilities
  - No lint errors
  - Type checking passes

**VERIFY:**
```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
npm run lint
npx tsc --noEmit
```

---

## 🎯 Task Dependencies Graph

```
T1.1 (Bundle Analysis) ─┬─→ T2.1 (Vite Config)
T1.2 (Dependency Audit) ┘                │
                                         ↓
                                   T2.2 (Tree Shaking)
                                         │
                    ┌────────────────────┴────────────────────┐
                    ↓                    ↓                    ↓
              T3.1 (Routes)        T3.2 (Components)    T3.3 (Icons)
                    │                    │                    │
                    └────────────────────┼────────────────────┘
                                         ↓
                                   T3.4 (UI Libs)
                                         │
                    ┌────────────────────┴────────────────────┐
                    ↓                                         ↓
              T4.1 (Images)                            T5.1 (Vercel)
              T4.2 (Fonts)                                   │
                                                             ↓
                                                       T5.2 (Pre-render)
                                                             │
                    ┌────────────────────────────────────────┘
                    ↓
              T6.1 (Build) → T6.2 (Test) → T6.3 (Lighthouse) → T6.4 (Preview) → T6.5 (Security)
```

---

## 📦 Implementation Priority Order

| Phase | Priority | Agent | Tasks |
|-------|----------|-------|-------|
| **Analysis** | P0 | performance-optimizer | T1.1, T1.2 |
| **Config** | P1 | frontend-specialist | T2.1, T2.2 |
| **Code Split** | P1 | frontend-specialist | T3.1 |
| **Component Split** | P2 | frontend-specialist | T3.2, T3.3, T3.4 |
| **Assets** | P2 | performance-optimizer | T4.1, T4.2 |
| **Deploy** | P1 | performance-optimizer | T5.1, T5.2 |
| **Verify** | P0 | test-engineer | T6.1, T6.2, T6.3, T6.4, T6.5 |

---

## 🔐 PHASE X: FINAL VERIFICATION

### Required Checks

#### 1. Bundle Size
```bash
npm run build
du -sh dist/assets/*.js
# ✅ Total JS < 500KB
# ✅ CSS < 200KB
# ✅ Multiple chunks (not monolithic)
```

#### 2. Security Scan
```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
# ✅ No critical vulnerabilities
```

#### 3. Lint & Type Check
```bash
npm run lint
npx tsc --noEmit
# ✅ No errors
```

#### 4. Lighthouse Audit
```bash
npm run dev &
python .agent/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000
# ✅ Performance > 90
# ✅ LCP < 2.5s
```

#### 5. Vercel Preview
```bash
vercel --prod
# ✅ Deployment successful
# ✅ All routes functional
# ✅ Compression enabled (Content-Encoding: br)
```

#### 6. Manual Testing
- [ ] Navigate to all 5 pages
- [ ] Verify lazy loading in Network tab
- [ ] Check console for errors
- [ ] Test on mobile (3G throttling)
- [ ] Measure Time to Interactive < 2s

### Definition of Done

- [x] Bundle reduced from 1.2MB → < 500KB (58% reduction)
- [x] Route-based code splitting implemented
- [x] Component-level lazy loading applied
- [x] Tree shaking optimized
- [x] Lighthouse Performance > 90
- [x] All verification scripts pass
- [x] Preview deployment successful
- [x] No console errors
- [x] TTI < 2s on 3G

---

## 🚨 Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Breaking lazy loading** | High | Comprehensive testing + fallback components |
| **Over-chunking** | Medium | Monitor chunk sizes, aim for 100-200KB per chunk |
| **Type errors** | Low | Run `tsc --noEmit` after each change |
| **Route issues** | High | Test all routes manually before deployment |
| **Vercel config errors** | Medium | Use preview deployment first |

---

## 📈 Expected Metrics

| Metric | Before | Target | Method |
|--------|--------|--------|--------|
| **Bundle Size** | 1,222KB | < 500KB | Vite build info |
| **Initial Load** | ~1.2MB | < 500KB | Network tab |
| **LCP** | Unknown | < 2.5s | Lighthouse |
| **TTI** | Unknown | < 2s (3G) | Lighthouse |
| **Performance Score** | Unknown | > 90 | Lighthouse |
| **Chunk Count** | 2 | 8-12 | dist/assets/ |

---

## 🛠️ Rollback Strategy

**Checkpoint:** Backup created with `git commit -m "backup antes da otimização"`

**If optimization fails:**
```bash
git reset --hard HEAD~1
npm install
npm run build
vercel --prod
```

---

## 📅 Timeline Estimate

| Phase | Tasks | Duration |
|-------|-------|----------|
| Analysis | T1.1, T1.2 | 30 min |
| Configuration | T2.1, T2.2 | 45 min |
| Code Splitting | T3.1-T3.4 | 1.5 hours |
| Assets | T4.1, T4.2 | 30 min |
| Deployment | T5.1, T5.2 | 30 min |
| Verification | T6.1-T6.5 | 1 hour |
| **TOTAL** | **15 tasks** | **~4.5 hours** |

---

## 🎯 Next Steps

**After plan approval:**
1. Invoke `performance-optimizer` for T1.1 (Bundle Analysis)
2. Invoke `performance-optimizer` for T1.2 (Dependency Audit)
3. Invoke `frontend-specialist` for T2.1 (Vite Config)
4. Continue sequentially per dependency graph

---

**Status:** ⏸️ AWAITING USER APPROVAL  
**Created by:** Orchestrator → project-planner  
**Agents to be deployed:** performance-optimizer, frontend-specialist, test-engineer
