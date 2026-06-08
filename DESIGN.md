---
name: "IR Learning Platform"
description: "Warm, encouraging educational platform for learning Information Retrieval through hands-on practice"
colors:
  primary: "#C88A2D"
  primary-light: "#EAD7A4"
  neutral-bg: "#FAF8F5"
  neutral-surface: "#FFFFFF"
  neutral-muted: "#D5D5DB"
  neutral-border: "#DCDCDC"
  secondary: "#E6DAC7"
  destructive: "#D63131"
  dark-bg: "#15181C"
  dark-surface: "#20252B"
  dark-muted: "#4A4E54"
  dark-border: "#2D3136"
  pink-bg: "#FBF5F7"
  pink-primary: "#D4668A"
  pink-secondary: "#F0DCE4"
typography:
  display:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Open Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  body-lg:
    fontFamily: "Open Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.7
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.15em"
  mono:
    fontFamily: "Consolas, Monaco, 'Andale Mono', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  "2xl": "1.5rem"
  "3xl": "2rem"
  pill: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "2.5rem"
  "3xl": "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "0.75rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "inherit"
    rounded: "{rounded.3xl}"
    padding: "2.5rem"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "#E8E8E8"
    rounded: "{rounded.3xl}"
    padding: "2.5rem"
  badge:
    backgroundColor: "rgba(200, 138, 45, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  input:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "inherit"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
---

# Design System: IR Learning Platform

## 1. Overview

**Creative North Star: "The Field Companion"**

This is a learning environment that feels like a trusted guide through unfamiliar terrain. Not a lecture hall, not a toy, but a practical companion that believes the learner can navigate complex ideas. The aesthetic draws from field notebooks and workshop tools: warm surfaces, clear hierarchy, and honest materials. Every design choice earns its place by making the learning journey clearer or more encouraging.

The system explicitly rejects the soul-crushing sameness of enterprise LMS platforms, the hollow flashiness of SaaS marketing, and the cold minimalism that strips away context. It's warm without being cutesy, technical without being intimidating, polished without being precious.

**Key Characteristics:**
- Warm amber/gold accent against cream and slate neutrals
- Generous whitespace with clear information hierarchy
- Rounded, approachable shapes that feel hand-crafted, not factory-stamped
- Typography that guides the eye through dense technical content
- Structured spacing over decorative shadows for depth

## 2. Colors

The palette anchors on warm amber gold against cool slate neutrals, creating a system that feels both approachable and authoritative. The gold carries identity; the neutrals carry content.

### Primary
- **Amber Gold** (#C88A2D): The signature accent. Used on step numbers, progress indicators, active states, interactive highlights, and the top accent bar on task cards. Appears sparingly to draw attention to what matters.
- **Light Amber** (#EAD7A4): Tinted background fills for hints, callouts, and hover states. Subtle enough to not compete with content.

### Neutral
- **Warm Cream** (#FAF8F5): Default background. A whisper of warmth that avoids the sterility of pure white.
- **Pure White** (#FFFFFF): Card surfaces and elevated content areas.
- **Soft Grey** (#D5D5DB): Muted text, secondary labels, progress bar backgrounds.
- **Border Grey** (#DCDCDC): Dividers, card borders, input borders.
- **Light Beige** (#E6DAC7): Secondary backgrounds, sidebar accents, chip fills.

### Destructive
- **Signal Red** (#D63131): Error states and destructive actions only. Never decorative.

### Dark Theme Overrides
- **Deep Slate** (#15181C): Dark mode background. Not pure black; retains depth.
- **Elevated Slate** (#20252B): Dark mode card surfaces.
- **Muted Slate** (#4A4E54): Dark mode secondary text and borders.
- **Dark Border** (#2D3136): Dark mode dividers.

### Named Rules
**The Gold Accent Rule.** The amber primary is used on no more than 15% of any given screen. Its rarity creates focus. When in doubt, make it smaller, not bigger.

**The Warmth Floor Rule.** Backgrounds never drop below 95% lightness in light mode. The learning environment stays bright and inviting; darkness is reserved for code blocks, not the canvas.

## 3. Typography

**Display Font:** Poppins (with system-ui fallback)
**Body Font:** Open Sans (with system-ui fallback)
**Mono Font:** Consolas, Monaco, monospace (for code)

**Character:** Poppins brings confident structure to headings; Open Sans provides warm readability for extended text. The pairing feels knowledgeable without being academic, friendly without being casual.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5vw, 3rem), 1.1): Step titles. The largest text on screen, used once per section.
- **Headline** (700, clamp(2rem, 4vw, 2.5rem), 1.2): Section titles within steps.
- **Title** (600, 1.25rem, 1.3): Card headings, sidebar items, subsection labels.
- **Body** (400, 1rem, 1.7): Primary reading text. Max line length: 65-75ch.
- **Body Light** (300, 1.125rem, 1.7): Extended theory text. Lighter weight for long-form reading.
- **Label** (700, 0.625rem, 1.4, 0.15em tracking, uppercase): Section markers, category tags, metadata.

### Named Rules
**The Label Discipline Rule.** All-caps labels use 700 weight at 0.625rem with 0.15em tracking. No exceptions. This creates a consistent rhythm of section markers that guides the eye without competing with content.

**The Headline Restraint Rule.** Headlines are never colored. They use foreground color only. Color is reserved for interactive elements and status indicators.

## 4. Elevation

Structured spacing over decorative shadows. Depth is conveyed through spacing rhythm, border treatment, and tonal shifts between surfaces. Shadows appear sparingly, only for elements that genuinely float above the surface (dropdowns, mobile sidebar overlay, floating buttons).

### Shadow Vocabulary
- **Ambient** (`0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): Subtle lift on cards at rest.
- **Elevated** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): Hover states on interactive cards.
- **Overlay** (`0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): Mobile sidebar, floating elements.

### Named Rules
**The Border-First Rule.** Cards and containers are separated by borders first, shadows second. A 1px border with tonal background shift is the primary depth tool. Shadows amplify but never replace borders.

## 5. Components

### Buttons
- **Shape:** Rounded xl (1rem radius)
- **Primary:** Amber gold background, white text, 0.75rem 1.5rem padding. Transitions on color and shadow.
- **Secondary:** Light beige background, gold text. Same shape and padding as primary.
- **Hover/Focus:** Subtle shadow elevation + slight brightness shift. Focus ring uses primary color at 30% opacity.

### Cards / Containers
- **Corner Style:** 3xl (2rem radius) for major cards, xl (1rem) for compact items
- **Background:** White in light mode, elevated slate in dark mode
- **Border:** 1px border using neutral border color. Primary border shifts to gold on hover for interactive cards.
- **Internal Padding:** 2.5rem for major content cards, 1.5rem for compact items
- **Theory Cards:** White background with subtle gold accent dot, graduation cap watermark at 5% opacity
- **Task Cards:** Secondary background with gold gradient top border (1px)

### Navigation (Sidebar)
- **Width:** 18rem (288px)
- **Background:** Warm cream with 95% opacity + backdrop blur
- **Items:** Rounded md, hover state shifts to secondary background
- **Active:** Gold text + primary-colored icon
- **Progress Bar:** Secondary background with gold fill, 2.5px height, rounded full

### Code Blocks
- **Background:** Dark slate (#1a1b26) regardless of theme
- **Text:** Light grey (#d4d4d4) with syntax highlighting
- **Border:** 1px neutral border, rounded 2xl overflow hidden
- **Filename Header:** Muted background with monospace label

### Chips / Badges
- **Style:** Gold background at 10% opacity, gold text, pill radius
- **Usage:** Step numbers, progress counts, difficulty labels
- **Size:** 0.25rem 0.625rem padding, 0.625rem font size

### Inputs
- **Style:** Warm cream background, 1px neutral border, rounded lg
- **Focus:** Gold ring at 30% opacity, border shifts to primary
- **Placeholder:** Muted grey text

## 6. Do's and Don'ts

### Do:
- **Do** use the gold accent to guide attention to interactive elements and progress indicators.
- **Do** maintain generous whitespace between sections (minimum 3xl between major blocks).
- **Do** use the Label Discipline: uppercase 0.625rem Poppins 700 with 0.15em tracking for all section markers.
- **Do** keep backgrounds bright in light mode (minimum 95% lightness). The learning environment stays warm and inviting.
- **Do** use rounded corners consistently (2rem for major cards, 1rem for compact items) to maintain the hand-crafted feel.

### Don't:
- **Don't** use enterprise LMS patterns (Canvas, Blackboard, Moodle). No grey-on-grey density, no tiny text walls, no soul-crushing navigation trees.
- **Don't** use flashy but hollow SaaS aesthetics. No gradient text, no glassmorphism, no decorative gradients that add no meaning.
- **Don't** go overly minimal. The design should feel warm and contextual, not stripped of personality.
- **Don't** use cluttered old-school layouts. No dense multi-column text, no skeuomorphic elements, no visual noise.
- **Don't** color headlines. Headlines use foreground color only. Color is for interactive elements.
- **Don't** exceed 15% gold accent coverage on any screen. The accent's rarity creates focus.
- **Don't** use shadows as the primary depth tool. Borders and tonal shifts come first; shadows amplify.
- **Don't** use `#000000` or `#FFFFFF` directly. Tint every neutral toward the warm palette.
