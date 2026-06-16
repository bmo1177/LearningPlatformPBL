# IR Learning Platform

An interactive, project-based learning platform for **Information Retrieval (IR)** concepts. Built with Next.js 16, it guides learners through building a real search engine with hands-on steps, AI-powered tutoring, and progress tracking.

## Features

- **Step-by-step Curriculum** — 11+ progressive steps covering TF-IDF, BM25, Boolean Search, Inverted Index, Cosine Similarity, and more
- **Gemini-powered AI Tutor** — Socratic AI assistant that guides without giving direct answers
- **Guidance Modes** — Three levels: On Your Own, Some Guidance, Step-by-Step
- **Pre/Post Knowledge Quizzes** — Assess understanding before and after the project
- **Reflective Writing Prompts** — Per-step reflection exercises with save/export
- **Progress Tracking** — Zustand-based persistence (localStorage) for steps and artifacts
- **PDF Export** — Export completed work as PDF via html2pdf.js
- **Dark / Light / Pinkish Themes** — next-themes powered theme switching
- **Code Highlighting** — Syntax-highlighted code snippets via react-syntax-highlighter
- **Reference Implementation** — Complete Python/Flask IR engine for learners to build toward

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| State | Zustand 5 |
| AI | Google Generative AI (Gemini) |
| E2E Tests | Playwright |
| Linting | ESLint (flat config) |
| Icons | Lucide React |
| PDF | html2pdf.js |
| Themes | next-themes |
| Fonts | Poppins, Open Sans (via next/font) |

## Getting Started

```bash
npm install
```

Set up your environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local and add your Gemini API key:
# NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript type checking |
| `npx playwright test` | Run E2E tests |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + Tailwind directives
│   ├── layout.tsx           # Root layout (fonts, metadata, theme provider)
│   └── page.tsx             # Main page (orchestrates all sections)
├── components/
│   ├── AIAssistant.tsx      # Gemini-powered Socratic AI tutor
│   ├── ArtifactCapture.tsx  # Per-step screenshot/text capture
│   ├── CodeBlock.tsx        # Syntax-highlighted code display
│   ├── DocPanel.tsx         # Right-side documentation panel
│   ├── GuidanceToggle.tsx   # Guidance mode selector
│   ├── LearnedSection.tsx   # "What I learned" reflection area
│   ├── MainStage.tsx        # Renders individual step content
│   ├── ProjectHeader.tsx    # Project title + metadata header
│   ├── ProjectSummary.tsx   # Project overview summary
│   ├── QuizPanel.tsx        # Pre/post knowledge quiz
│   ├── ReflectionBox.tsx    # Per-step reflective writing prompt
│   ├── Sidebar.tsx          # Left navigation + step progress
│   ├── SuccessScreen.tsx    # Completion screen + PDF export
│   ├── ThemeProvider.tsx    # next-themes wrapper
│   └── ThemeToggle.tsx      # Theme switcher button
├── data/
│   └── course-ir.json       # All course content (steps, quizzes, reflections)
└── hooks/
    └── useProgress.ts       # Zustand store for progress state
```

## Course Content

The curriculum is defined in `src/data/course-ir.json` and covers building an Information Retrieval Engine with Python/Flask:

1. Understanding Information Retrieval
2. Setting up the Flask environment
3. Building an Inverted Index
4. Implementing Boolean Search
5. TF-IDF Ranking
6. BM25 Ranking
7. Cosine Similarity
8. Handling queries and results
9. Building the web UI
10. Testing and evaluation
11. Extension and optimization

A complete reference implementation is available at `experiment_Information_Retrieval_Engine/`.

## Testing

```bash
npx playwright test          # Run all E2E tests
npx playwright test --ui     # Run with Playwright UI
npx playwright show-report   # View test report
```

E2E tests cover guidance modes, learning interactions, platform navigation, and the full success flow. Tests run automatically on push/PR (see `.github/workflows/playwright.yml`).

## Design System

See [DESIGN.md](./DESIGN.md) for the full design specification — colors, typography, spacing, component patterns. The platform uses a warm "field companion" aesthetic with amber/gold accents.

## Product Goals

See [PRODUCT.md](./PRODUCT.md) for user profiles, brand principles, and accessibility targets.
