# IR Learning Platform

Welcome to the Information Retrieval Learning Platform. This platform is designed to provide an interactive, pedagogical technical environment for learning Information Retrieval concepts, matching the high-engagement NextWork standard.

## Features

- **Reflective Writing Prompts:** Write and save reflections after each learning step.
- **Pre/Post Knowledge Quizzes:** Test your knowledge before and after completing the project.
- **Guidance Mode Selector:** Choose your preferred level of guidance (On Your Own, Some Guidance, Step-by-Step).
- **Gemini-powered AI Learning Assistant:** A Socratic tutor that helps you think through problems without giving you direct answers.
- **Progress Tracking:** Keep track of your completed steps and artifacts.

## Getting Started

First, install dependencies:

```bash
npm install
```

Set up your environment variables:

1. Copy `.env.local.example` to `.env.local` (or create a `.env.local` file)
2. Add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
