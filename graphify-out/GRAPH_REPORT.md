# Graph Report - .  (2026-05-03)

## Corpus Check
- Corpus is ~34,330 words - fits in a single context window. You may not need a graph.

## Summary
- 103 nodes · 100 edges · 16 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Course Content Delivery|Course Content Delivery]]
- [[_COMMUNITY_Interactive Guidance|Interactive Guidance]]
- [[_COMMUNITY_Course Data & Navigation|Course Data & Navigation]]
- [[_COMMUNITY_Layout & Theming|Layout & Theming]]
- [[_COMMUNITY_Project Header|Project Header]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Guidance Toggle|Guidance Toggle]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]

## God Nodes (most connected - your core abstractions)
1. `useProgress Hook` - 12 edges
2. `Home Page` - 11 edges
3. `useProgress Zustand Hook` - 10 edges
4. `Home Page` - 9 edges
5. `Course Data` - 8 edges
6. `MainStage Component` - 6 edges
7. `SuccessScreen Component` - 5 edges
8. `QuizPanel Component` - 5 edges
9. `MainStage Step Renderer` - 5 edges
10. `ArtifactCapture Component` - 4 edges

## Surprising Connections (you probably didn't know these)
- `useProgress Zustand Hook` --uses--> `Zustand State Management`  [EXTRACTED]
  src/hooks/useProgress.ts → package.json
- `AIAssistant Socratic Tutor` --calls--> `Google Generative AI SDK`  [EXTRACTED]
  src/components/AIAssistant.tsx → package.json
- `ThemeProvider Component` --wraps--> `next-themes Library`  [EXTRACTED]
  src/components/ThemeProvider.tsx → package.json
- `ThemeToggle Component` --uses--> `next-themes Library`  [EXTRACTED]
  src/components/ThemeToggle.tsx → package.json
- `CodeBlock Syntax Highlighter` --uses--> `next-themes Library`  [EXTRACTED]
  src/components/CodeBlock.tsx → package.json

## Hyperedges (group relationships)
- **Course Data Consumers** — doc_panel, learned_section, quiz_panel, project_header, project_summary, sidebar, success_screen, page [EXTRACTED 1.00]
- **Persistence-Dependent Components** — artifact_capture, reflection_box, doc_panel, sidebar, success_screen, main_stage, ai_assistant, guidance_toggle, page [EXTRACTED 1.00]
- **Theming Infrastructure** — theme_provider, theme_toggle, root_layout, code_block [EXTRACTED 1.00]
- **Progress State Consumers** — hook_useprogress, component_sidebar, component_mainstage, component_artifactcapture, component_reflectionbox, component_guidancetoggle, component_successscreen, component_docpanel [EXTRACTED 1.00]
- **Theme System** — component_themeprovider, component_themetoggle, component_codeblock, lib_nextthemes, css_globals [EXTRACTED 1.00]
- **Quiz Delivery System** — component_quizpanel, page_home, component_successscreen, hook_useprogress [EXTRACTED 0.90]

## Communities (38 total, 12 thin omitted)

### Community 0 - "Course Content Delivery"
Cohesion: 0.22
Nodes (15): ArtifactCapture Component, DocPanel Component, GuidanceToggle Component, LearnedSection Component, MainStage Step Renderer, ProjectSummary Component, QuizPanel Component, ReflectionBox Component (+7 more)

### Community 1 - "Interactive Guidance"
Cohesion: 0.23
Nodes (14): AIAssistant Component, ArtifactCapture Component, CodeBlock Component, GuidanceMode, GuidanceToggle Component, MainStage Component, Zustand Persistence, ProgressState (+6 more)

### Community 2 - "Course Data & Navigation"
Cohesion: 0.38
Nodes (10): Course Data, DocPanel Component, LearnedSection Component, Home Page, ProjectHeader Component, ProjectSummary Component, QuizPanel Component, Sidebar Component (+2 more)

### Community 3 - "Layout & Theming"
Cohesion: 0.25
Nodes (9): AIAssistant Socratic Tutor, CodeBlock Syntax Highlighter, ProjectHeader Component, ThemeProvider Component, ThemeToggle Component, RootLayout Component, Google Generative AI SDK, next-themes Library (+1 more)

## Knowledge Gaps
- **20 isolated node(s):** `NextConfig`, `TailwindConfig`, `PlaywrightConfig`, `ProgressState`, `ThemeProvider Component` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useProgress Hook` connect `Interactive Guidance` to `Course Data & Navigation`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `useProgress Zustand Hook` connect `Course Content Delivery` to `Layout & Theming`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Home Page` connect `Course Content Delivery` to `Layout & Theming`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `NextConfig`, `TailwindConfig`, `PlaywrightConfig` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._