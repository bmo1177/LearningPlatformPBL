# Application Audit Report — IR Learning Platform

**Date:** 2026-05-04  
**Auditor:** opencode  
**Scope:** Markdown files, build output, lint results, test reports, graphify analysis

---

## Executive Summary

The IR Learning Platform is a Next.js application designed for interactive Information Retrieval learning. All 6 planned phases from task_plan.md have been implemented. The build passes successfully, but several code quality and security issues need attention.

**Overall Health:** ⚠️ Good functionality, needs security and quality fixes

---

## Current State Analysis

### ✅ Completed Features (per task_plan.md)

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Reflective Writing Prompts | ✅ Completed |
| 2 | Sidebar Badge + Community CTA + Learner Note | ✅ Completed |
| 3 | Pre/Post Knowledge Quiz | ✅ Completed |
| 4 | Guidance Mode Selector | ✅ Completed |
| 5 | AI Learning Assistant (Gemini) | ✅ Completed |
| 6 | Resource Cleanup & Polish | ✅ Completed |

### 🏗️ Technical Stack

- **Framework:** Next.js 16.2.4 (App Router, Turbopack)
- **Styling:** Tailwind CSS v3.4.19 (downgraded from v4)
- **State Management:** Zustand v5 (`useProgress` hook)
- **Icons:** Lucide React v1.14
- **Syntax Highlighting:** `react-syntax-highlighter` (vscDarkPlus theme)
- **PDF Export:** `html2pdf.js`
- **Persistence:** localStorage via Zustand
- **AI Integration:** `@google/generative-ai` (Gemini 1.5 Flash)

### 📊 Build & Code Metrics

- **Build Status:** ✅ Successful (5.4s compile time)
- **TypeScript:** ✅ Passes
- **Lint Errors:** 9 errors, 7 warnings
- **E2E Tests:** ❌ Timeout failure in reflection saving flow
- **Graphify Analysis:** 103 nodes, 100 edges, 16 communities detected

---

## 🔴 Critical Issues (Fix Immediately)

### 1. Exposed API Key in Documentation

**Severity:** Critical (Security)

The Gemini API key is exposed in plaintext in two documentation files:

- `task_plan.md:7` — `AIzaSyCpQkHnaepEjQntUNh0TTQhuTVi_Rkobl0`
- `findings.md:41` — Same key repeated

**Risk:** Anyone with repo access can use the API key, potentially exhausting quota or accessing usage data.

**Fix:**
```bash
# Remove keys from docs, ensure .env.local is in .gitignore
grep -r "AIzaSy" . --include="*.md"
# If committed, rotate the key at Google AI Studio
```

---

### 2. React Anti-Pattern: setState in useEffect

**Severity:** High (Performance)

**Location:** `src/components/ReflectionBox.tsx:17`

```tsx
useEffect(() => {
  if (reflections[stepId]) {
    setText(reflections[stepId]);  // ❌ Causes cascading renders
    setIsSaved(true);
  }
}, [reflections, stepId]);
```

**Issue:** Calling `setState` synchronously within useEffect triggers cascading re-renders (React dev warning).

**Fix:** Initialize state from props or use a callback pattern:
```tsx
// Option 1: Initialize from props
const [text, setText] = useState(reflections[stepId] || '');
const [isSaved, setIsSaved] = useState(!!reflections[stepId]);

// Option 2: Use useMemo for derived state
const isSaved = useMemo(() => !!reflections[stepId], [reflections, stepId]);
```

---

### 3. E2E Test Failure: Reflection Save Button Disabled

**Severity:** High (Functionality)

**Location:** `playwright-report/data/57874ae4726346c84699cd39753d05d1b01697d2.md`

**Error:** Test timeout (60000ms) — Save Reflection button remains disabled.

**Root Cause:** The button is disabled until text is entered in the textarea, but the test doesn't populate the textarea before clicking.

**Fix:** Update test to type text before saving:
```tsx
await page.fill('#step-1 textarea', 'Test reflection');
await page.click('#step-1 button:has-text("Save Reflection")');
```

---

## 🟡 Medium Priority Issues

### 4. Unescaped Quotes in JSX

**Locations:**
- `src/components/AIAssistant.tsx:124,127,130` — `"` should be `&quot;`
- `src/components/DocPanel.tsx:123` — `"` should be `&quot;`
- `src/components/ProjectSummary.tsx:15` — `'` should be `&apos;`

**Fix:** Replace curly quotes or use JSX-safe alternatives:
```tsx
// Instead of: "text"
// Use: &quot;text&quot; or {'"'}text{'"'}
```

---

### 5. Using `<img>` Instead of `<Image />`

**Locations:**
- `src/components/ArtifactCapture.tsx:42`
- `src/components/DocPanel.tsx:109`

**Issue:** Next.js recommends `<Image />` from `next/image` for automatic optimization (LCP, bandwidth).

**Fix:**
```tsx
import Image from 'next/image';
<Image src={src} alt={alt} width={width} height={height} />
```

---

### 6. Unused Imports

**Locations:**
- `src/components/AIAssistant.tsx:3` — `Bot` imported but unused
- `src/components/DocPanel.tsx:4` — `Target`, `GraduationCap` imported but unused
- `playwright.config.ts:2` — `path` imported but unused

**Fix:** Remove unused imports to reduce bundle size.

---

### 7. `@ts-ignore` Should Be `@ts-expect-error`

**Location:** `src/components/QuizPanel.tsx:13`

**Fix:**
```tsx
// Instead of: // @ts-ignore
// Use: // @ts-expect-error - reason why error is expected
```

---

## 🟢 Low Priority / Nice-to-Have

### 8. Outdated progress.md

**Issue:** `progress.md` shows all phases as `pending`, but they're actually completed.

**Fix:** Update status column to `completed` or remove the phase table entirely.

---

### 9. Graphify: 20 Isolated Nodes

**From:** `graphify-out/GRAPH_REPORT.md`

Nodes with ≤1 connection (possible missing edges or documentation):
- `NextConfig`
- `TailwindConfig`
- `PlaywrightConfig`
- `ProgressState` (+15 more)

**Recommendation:** Consider if these need documentation or if they're truly isolated by design.

---

## Component Inventory (Verified)

All expected components from task_plan.md are present:

| Component | File | Status |
|-----------|------|--------|
| ReflectionBox | `src/components/ReflectionBox.tsx` | ✅ Exists |
| QuizPanel | `src/components/QuizPanel.tsx` | ✅ Exists |
| GuidanceToggle | `src/components/GuidanceToggle.tsx` | ✅ Exists |
| AIAssistant | `src/components/AIAssistant.tsx` | ✅ Exists |
| Sidebar (badge + CTA) | `src/components/Sidebar.tsx` | ✅ Exists |
| ProjectSummary (learner note) | `src/components/ProjectSummary.tsx` | ✅ Exists |
| SuccessScreen (cleanup) | `src/components/SuccessScreen.tsx` | ✅ Exists |
| ArtifactCapture (colors) | `src/components/ArtifactCapture.tsx` | ✅ Exists |

---

## Recommended Action Plan

| Order | Action | Priority | Effort |
|-------|--------|----------|--------|
| 1 | Remove API key from task_plan.md and findings.md | 🔴 Critical | 5 min |
| 2 | Fix ReflectionBox setState in useEffect | 🔴 High | 15 min |
| 3 | Fix E2E test: populate textarea before save | 🔴 High | 10 min |
| 4 | Fix lint errors (quotes, unused imports, img→Image) | 🟡 Medium | 30 min |
| 5 | Update progress.md to reflect completed status | 🟢 Low | 5 min |
| 6 | Review 20 isolated graph nodes | 🟢 Low | 15 min |

---

## Knowledge Graph Insights (from graphify)

**God Nodes (most connected):**
1. `useProgress Hook` — 12 edges (core state management)
2. `Home Page` — 11 edges
3. `useProgress Zustand Hook` — 10 edges

**Community Hubs:**
- Course Content Delivery (15 nodes, cohesion 0.22)
- Interactive Guidance (14 nodes, cohesion 0.23)
- Course Data & Navigation (10 nodes, cohesion 0.38)
- Layout & Theming (9 nodes, cohesion 0.25)

**Surprising Connections:**
- `AIAssistant` → `Google Generative AI SDK` (direct integration)
- `ThemeProvider` → `next-themes Library` (themimg infrastructure)
- `CodeBlock` → `next-themes Library` (theme-aware syntax highlighting)

---

## Conclusion

The IR Learning Platform is feature-complete with all 6 phases implemented. The build passes and TypeScript compiles cleanly. However, **immediate action is required** on:

1. **Security:** Remove exposed API key from documentation
2. **Performance:** Fix React anti-pattern in ReflectionBox
3. **Reliability:** Fix E2E test timeout issue

After addressing the critical issues, the medium-priority lint fixes will improve code quality and prepare the project for production deployment.
