# Frontend architecture

## Decision

Use Next.js as a static-site compiler, React for reusable and interactive UI, and small focused libraries only where native HTML does not cover the interaction cleanly.

## Layers

| Layer | Responsibility | Technology |
|---|---|---|
| Content | Typed claims, metrics, stacks, and case-study narratives | TypeScript data modules |
| Composition | Static page sections and semantic document structure | Next.js Server Components |
| Interaction | Navigation state, progress, reveals, and case-study dialogs | React Client Components |
| Primitives | Focus management, escape handling, dialog semantics | Radix UI |
| Motion | Viewport reveals and scroll progress | Motion |
| Visual system | Tokens, layout, responsive rules, forced colors | CSS |
| Verification | Types, lint, behavior tests, production export | TypeScript, ESLint, Vitest |

## Dependency budget

- `next`, `react`, `react-dom`: framework and rendering foundation.
- `@radix-ui/react-dialog`: accessible behavior that is costly to reproduce safely.
- `motion`: animation orchestration and reduced-motion integration.
- `lucide-react`: consistent tree-shakeable icons.
- `clsx`: shared class composition utility for future variants.

No server runtime, global state library, data-fetching library, component theme package, or analytics SDK is included because the current portfolio does not need them.

## Rendering boundary

The page, metadata, and portfolio content are statically rendered. JavaScript is limited to interactive islands. If hydration fails, the core portfolio content and links are still present in the generated HTML.

## Deployment boundary

`next build` produces `out/`. The temporary `build:pages` compatibility script also synchronizes that export into the repository root so the existing branch-based GitHub Pages configuration can serve it without an Actions build.

The Next.js build ID is derived from the source and lockfile. Identical source therefore produces the same manifest path, while a real source change produces a new cache namespace.
