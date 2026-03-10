# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server at localhost:5173
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm tsc --noEmit # type-check only
```

No test framework is configured.

## Architecture

**Stack:** React 19 + Vite + TypeScript, plain CSS (no modules, no Tailwind), `@dnd-kit` for drag-and-drop, `react-router-dom` for routing, `pnpm`.

**Routing (App.tsx):** React Router with routes for `/` (LandingPage), `/exams` (ExamsScreen), `/exams/:examKey` (QuizIntroScreen), `/exam` (ExamScreen), `/results` (ResultsScreen), `/blog` / `/blog/:slug` (Blog).

**State:** A single `ExamContext` (useReducer) in [src/context/ExamContext.tsx](src/context/ExamContext.tsx) manages the active exam session. Actions: `LOAD_EXAM`, `RESUME_EXAM`, `SET_ANSWER`, `SET_ORDER`, `TOGGLE_FLAG`, `GO_TO`, `TICK`, `FINISH`, `RESTART`. Progress is persisted to `localStorage` with key prefix `exam_progress_<examKey>`.

**Exam data:** JSON files in `public/exams/`. Each exam has `title`, `direction` (`rtl`|`ltr`), `lang`, `duration` (seconds), `passingScore`, and a `questions` array. The `ExamsScreen` fetches this list; individual exams are fetched on load.

**Question types** (defined in [src/types/exam.ts](src/types/exam.ts)):
- `single` — multiple choice, `correct` is the index into `options`
- `code` — like single but with a `code` block and `language` field
- `truefalse` — binary choice
- `order` — drag-to-sort; `items` array is stored in correct order and shuffled on load (stored in `shuffledOrders` state)
- `personality` — no correct answer, used for personality/aptitude exams

**Styling conventions:**
- Global CSS custom properties in [src/index.css](src/index.css): `--bg`, `--surface`, `--cyan`, `--green`, `--red`, `--yellow`, `--text`, `--text-dim`, `--border`, plus corresponding `--*-glow` variants, `--font-mono`, `--font-ui`
- Each major component has a co-located `.css` file
- Sidebar is always on the left (260px) regardless of text direction; `dir` attribute is applied only to question content elements for RTL support

**i18n:** [src/i18n.ts](src/i18n.ts) provides UI string translations keyed by exam `lang` (`he`/`en`).

**BackgroundCanvas:** Animated dot-grid canvas drawn with `requestAnimationFrame`, rendered behind all screens.

## Adding an Exam

Place a new JSON file in `public/exams/` following the schema above. Register it in the exam list fetched by `ExamsScreen`. For `order` questions, list items in correct order — they are shuffled automatically on load.

## Deployment

GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) deploys to GitHub Pages on push to `main`. Build uses `VITE_BASE` env var for the correct subdirectory base path.
