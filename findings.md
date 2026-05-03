# Findings — IR Learning Platform Improvements

## Platform Audit Summary (2026-05-02)

### Current Stack
- **Framework:** Next.js 16.2.4 (App Router, Turbopack)
- **Styling:** Tailwind CSS v3.4.19 (downgraded from v4 to fix `lab()` color parsing error)
- **State:** Zustand v5 via `useProgress` hook
- **Icons:** Lucide React v1.14
- **Syntax highlighting:** `react-syntax-highlighter` with `vscDarkPlus` theme
- **PDF export:** `html2pdf.js`
- **Persistence:** localStorage via Zustand

### Key File Map
| File | Purpose |
|---|---|
| `src/app/page.tsx` | Root layout, renders all sections |
| `src/data/course-ir.json` | All course content (steps, quiz, reflections) |
| `src/hooks/useProgress.ts` | Zustand store: artifacts map |
| `src/components/Sidebar.tsx` | Left nav, step tracking |
| `src/components/MainStage.tsx` | Renders individual step (theory, task, code, hint) |
| `src/components/ArtifactCapture.tsx` | Per-step screenshot/text capture |
| `src/components/DocPanel.tsx` | Right-side doc panel with theme switcher |
| `src/components/SuccessScreen.tsx` | Completion + PDF export |

### What `useProgress` Currently Stores
```ts
{
  artifacts: Record<number, string>; // stepId → base64 image or text
  saveArtifact: (stepId, value) => void;
  resetProgress: () => void;
}
```
Need to extend with: `reflections`, `guidanceMode`, `quizScores`

### course-ir.json Structure
Each step has: `id`, `title`, `theory`, `task`, `code_snippets[]`, `hint`, `artifact_type`, `artifact_prompt`
Need to add: `reflection_prompt`, top-level `quiz[]`

### Gemini API Key
`AIzaSyCpQkHnaepEjQntUNh0TTQhuTVi_Rkobl0`
- Store as `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local`
- Use `@google/generative-ai` npm package
- Model to use: `gemini-1.5-flash` (fast, free tier)

### NextWork Feature Analysis
From the platform walkthrough:

**Reflective Writing**
- Each step has ONE textarea per action ("✍️ In this step, I'm learning about...")
- Character counter counts DOWN from 1000
- Gray checkbox on placeholder → green check on save
- Some steps have multiple reflection boxes per sub-section

**AI Assistant modes:**
1. "Tell me about this project" → project summary + steps injected
2. "Quiz me on this project" → generates questions from content
3. "My goal is..." → free-form personalization

**Quiz structure (NextWork):**
- 5 questions, 2.5 minutes
- Multiple choice
- Same quiz shown BEFORE and AFTER the project
- Results shown inline with score

**Guidance modes:**
- "On Your Own" → hide hints + code snippets entirely
- "Some Guidance" → show hints, hide code
- "Step-by-Step" → show everything (current default)

### ArtifactCapture Colors (to fix)
Currently uses `teal-*` color tokens. Needs to be `slate-*` / `blue-*` to match the rest of the design system.

## Known Issues / Gotchas
1. `tailwindcss` v4 generates `lab()` colors — Turbopack can't parse them. Fixed by downgrading to v3.4.
2. `GraduationCap` was missing from `MainStage.tsx` imports — fixed.
3. `ArtifactCapture` uses `teal-*` color scheme — inconsistent with rest of platform.
4. `globals.css` only has 3 `@tailwind` directives — CSS vars for shadcn theme colors not set up.
