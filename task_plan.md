# Task Plan: IR Learning Platform — NextWork-Standard Improvements

## Goal
Elevate the IR Learning Platform to match (and exceed) the NextWork platform standard by implementing all 9 identified gaps from the platform audit, with a Gemini-powered AI assistant as the centerpiece feature.

## Gemini API Key
`AIzaSyCpQkHnaepEjQntUNh0TTQhuTVi_Rkobl0`

## Source Audit (from platform_audit.md)
| Priority | Feature | Status |
|---|---|---|
| 🔴 Critical | AI Learning Assistant | ❌ Missing |
| 🔴 Critical | Reflective Writing Prompts | ❌ Missing |
| 🔴 Critical | Pre/Post Knowledge Quiz | ❌ Missing |
| 🔴 Critical | Guidance Mode Selector | ❌ Missing |
| 🟡 Medium | "Get Help" CTA in Sidebar | ❌ Missing |
| 🟡 Medium | Community link per step | ❌ Missing |
| 🟡 Medium | Sidebar "N completed" badge | ❌ Missing |
| 🟡 Medium | Learner advisory note | ❌ Missing |
| 🟢 Low | Resource cleanup section | ❌ Missing |

---

## Phase 1 — Reflective Writing Prompts (no dependencies)
**Status:** `completed`

### What to build
Add `✍️ Reflection` blocks after every step's theory section. Each block has:
- A labelled textarea with a dynamic placeholder from `course-ir.json`
- A character counter (e.g. "0 / 1000")
- A "Save Reflection" button that turns gray-check → green-check on save
- Persistence via `useProgress` Zustand store (same as artifacts)

### Files to change
- `src/data/course-ir.json` — add `reflection_prompt` field to each step
- `src/hooks/useProgress.ts` — add `reflections` map to state
- `src/components/ReflectionBox.tsx` — NEW component
- `src/components/MainStage.tsx` — render `<ReflectionBox>` after theory block

---

## Phase 2 — Sidebar Progress Badge + Community CTA (no dependencies)
**Status:** `completed`

### What to build
1. **"N completed" badge** — aggregate count of steps with saved artifacts OR reflections, displayed below the project title in sidebar
2. **Community CTA** — bottom of sidebar: "Still stuck? Ask the community →" (static link placeholder)
3. **Learner note box** — top of `ProjectSummary`, an amber callout explaining the project context

### Files to change
- `src/components/Sidebar.tsx` — add badge + community CTA
- `src/components/ProjectSummary.tsx` — add learner advisory note

---

## Phase 3 — Pre/Post Knowledge Quiz
**Status:** `completed`

### What to build
A `QuizPanel` component that:
- Renders 5 multiple-choice questions from `course-ir.json` (`quiz` field)
- Shows before Step 1 with a "Test yourself before you start" header
- Shows at the bottom of `SuccessScreen` with a "Now test how far you've come" header
- Tracks score and shows results inline (no external routing)

### Files to change
- `src/data/course-ir.json` — add `quiz: []` array with Q&A
- `src/components/QuizPanel.tsx` — NEW component
- `src/app/page.tsx` — render `<QuizPanel>` before Step 1 and inside `SuccessScreen`

---

## Phase 4 — Guidance Mode Selector
**Status:** `completed`

### What to build
A `GuidanceModeBanner` at the top of the page (above Step 1) with three selectable cards:
- **On Your Own** — hides hints and code snippets
- **Some Guidance** — shows hints, hides full code
- **Step-by-Step** — shows everything (default)

Mode stored in `useProgress` Zustand store, persisted to localStorage.

### Files to change
- `src/hooks/useProgress.ts` — add `guidanceMode` state
- `src/components/GuidanceModeSelector.tsx` — NEW component
- `src/components/MainStage.tsx` — conditionally render code/hints based on mode
- `src/app/page.tsx` — render `<GuidanceModeSelector>` between header and steps

---

## Phase 5 — AI Learning Assistant
**Status:** `completed`

### What to build
A persistent right-side chat panel (or slide-in drawer) with three quick-action modes:
- **"Tell me about this project"** — system prompt + course summary injected
- **"Quiz me"** — generates 3 questions based on current step context
- **"My goal is..."** — free-form personalized guidance

Uses `@google/generative-ai` client SDK, called directly from the browser.

### Files to change
- `package.json` — add `@google/generative-ai`
- `src/lib/gemini.ts` — NEW: Gemini client wrapper
- `src/components/AIAssistant.tsx` — NEW: chat UI panel
- `src/app/page.tsx` — render `<AIAssistant>` as a floating panel

---

## Phase 6 — Resource Cleanup & Polish
**Status:** `completed`

### What to build
- Add cleanup section to `SuccessScreen` with three radio-style options
- Final pass: consistent colors, ensure `ArtifactCapture` uses slate/blue palette (not teal)

### Files to change
- `src/components/SuccessScreen.tsx` — add cleanup section
- `src/components/ArtifactCapture.tsx` — update teal → slate/blue colors

---

## Decisions & Architecture Notes

| Decision | Rationale |
|---|---|
| Client-side Gemini (no backend) | Project is static export, no server |
| Zustand for all UI state | Already in use for artifacts; extend naturally |
| JSON-driven quiz & reflections | No DB needed; data lives in course-ir.json |
| API key in env var | `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local` |

## Errors Encountered
| Error | Attempt | Resolution |
|---|---|---|
| — | — | — |
