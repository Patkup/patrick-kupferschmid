# CLAUDE.md

## Project overview

Personal portfolio / dashboard web app for Patrick Kupferschmid. Built with React 19, TypeScript 6, Vite 8, and Tailwind CSS v4. The app is a multi-page SPA with client-side routing, dark/light theme support, and three-language i18n (English, German, French).

## Tech stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 (`~6.0.2`) |
| Build tool | Vite 8 + `@vitejs/plugin-react` |
| CSS | Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config` file) |
| Routing | wouter 3 |
| UI primitives | Radix UI (`@radix-ui/react-tooltip`) + shadcn/ui-style wrappers |
| Toasts | sonner 2 |
| Icons | lucide-react |
| Class utilities | clsx + tailwind-merge (`cn()` helper) |
| Lint | ESLint 10 with typescript-eslint, react-hooks, react-refresh plugins |

## Development commands

```bash
npm run dev       # start Vite dev server (HMR)
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

No test framework is configured yet.

## Project structure

```
src/
  main.tsx              # React root mount
  App.tsx               # Provider tree + Router
  App.css               # Global styles
  index.css             # Base CSS reset / tokens
  assets/               # Static assets (images, svgs)
  components/
    ErrorBoundary.tsx   # Class-based error boundary wrapping the whole app
    ui/
      sonner.tsx        # Toaster wrapper (re-export of sonner)
      tooltip.tsx       # Radix Tooltip with shadcn/ui styling
  contexts/
    ThemeContext.tsx     # light/dark/system theme; persists to localStorage
    LanguageContext.tsx  # en/de/fr i18n; persists to localStorage
  lib/
    utils.ts            # cn() — clsx + tailwind-merge helper
  pages/
    Dashboard.tsx       # Route: /
    Projects.tsx        # Route: /projects
    ProjectDetail.tsx   # Route: /projects/:id
    Insights.tsx        # Route: /insights
    Partners.tsx        # Route: /partners
    NotFound.tsx        # Route: /404 and catch-all
```

## Path alias

`@/` maps to `./src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import from `@/` rather than relative paths that cross directory boundaries:

```ts
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
```

## Routing

Routing uses wouter's `Switch` + `Route`. Add new routes in `src/App.tsx` inside the `Router` function. Route order matters — the catch-all `<Route component={NotFound} />` must stay last.

```tsx
<Route path="/new-page" component={NewPage} />
```

## Styling conventions

- **Tailwind CSS v4** is loaded via the Vite plugin — there is no `tailwind.config.ts`. Customisation happens through CSS variables in `index.css`.
- **Dark mode** is class-based. `ThemeContext` applies `.light` or `.dark` to `document.documentElement`. Use `dark:` variants in class names.
- **Class merging** — always use `cn()` from `@/lib/utils` when combining conditional classes.
- Page layout convention: `<main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">`.

## Contexts

### ThemeContext (`src/contexts/ThemeContext.tsx`)

```ts
const { theme, setTheme } = useTheme();
// theme: "light" | "dark" | "system"
```

- Persists choice to `localStorage` key `"theme"`.
- Resolves `"system"` to actual OS preference via `window.matchMedia`.
- Applied as a class on `<html>`.

### LanguageContext (`src/contexts/LanguageContext.tsx`)

```ts
const { language, setLanguage, t } = useLanguage();
// language: "en" | "de" | "fr"
t("dashboard") // → "Dashboard" / "Dashboard" / "Tableau de bord"
```

- Persists choice to `localStorage` key `"language"`.
- Add new translation keys to the `translations` record in `LanguageContext.tsx` for all three languages simultaneously.
- `t(key)` falls back to the key itself when a translation is missing.

## Adding new pages

1. Create `src/pages/MyPage.tsx` — export a default React component.
2. Add a `<Route path="/my-page" component={MyPage} />` in `src/App.tsx` before the catch-all.
3. Add a translation key in `LanguageContext.tsx` if the page title needs i18n.

## Adding new UI components

- Shared primitive wrappers live in `src/components/ui/` following the shadcn/ui pattern (thin wrappers over Radix primitives with Tailwind classes).
- Feature-specific components live directly in `src/components/`.
- Use `cn()` for all conditional class logic inside components.

## TypeScript conventions

- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports.
- `noUnusedLocals` and `noUnusedParameters` are enforced — no dead variables.
- `erasableSyntaxOnly` is enabled — avoid TypeScript-only syntax that is not type-erasable (e.g., `const enum`, `namespace`).
- No `any` — use proper types or `unknown`.

## Error handling

`ErrorBoundary` (`src/components/ErrorBoundary.tsx`) wraps the entire app. It catches render errors, logs them, and shows a "Try again" button. Do not remove this wrapper. For async errors (data fetching, etc.), handle them locally within the component or page.

## ESLint

Config is in `eslint.config.js` (flat config). Plugins active:

- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` recommended (enforces rules of hooks)
- `eslint-plugin-react-refresh` (warns on non-component default exports in HMR files)

Run `npm run lint` before committing. The build pipeline (`tsc -b`) also enforces type correctness.

## Git workflow

- Development branch: `claude/claude-md-docs-366s9`
- Push with: `git push -u origin <branch-name>`
- No test suite is configured — verify changes manually with `npm run dev`.
- Commit messages should explain *why*, not *what*.
