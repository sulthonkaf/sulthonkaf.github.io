# Sulthon KAF — Engineering Portfolio

Evidence-led portfolio for **Sulthon Kaffaah Al Farizzi**, published at [sulthonkaf.github.io](https://sulthonkaf.github.io/).

## What changed in v2

The portfolio now uses a component-based, typed frontend while preserving a fully static GitHub Pages output.

- Next.js 16 App Router with static export
- React 19 and strict TypeScript
- Radix UI Dialog for keyboard-accessible case studies
- Motion for restrained, reduced-motion-aware interactions
- Lucide icons and reusable portfolio data models
- Responsive dark-cinematic design tokens
- SEO metadata, JSON-LD, Open Graph, sitemap, robots, manifest, and custom 404
- ESLint, TypeScript, Vitest, and Testing Library quality gates

Project evidence is stored separately from presentation in [`data/portfolio.ts`](data/portfolio.ts). This makes claims easier to review and the visual layer easier to evolve.

## Local development

Requirements: Node.js 24 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check
```

This runs type checking, linting, unit tests, and the production static export. The project-specific [engineering knowledge checklist](docs/engineering-checklist.md) connects these automated checks to focused human review prompts and further reading.

## GitHub Pages publishing

The repository supports two publishing paths:

1. Preferred: deploy the generated `out/` directory with GitHub Actions when Actions is available.
2. Compatibility path: run `npm run build:pages`. It copies the verified static export into the repository root, allowing branch-based GitHub Pages hosting to continue while the account-level Actions billing lock is unresolved.

The live site remains static; Next.js is a build-time architecture, not a required server.

## Content maintenance

- Project evidence and technology labels: `data/portfolio.ts`
- Page composition: `app/page.tsx`
- Global metadata and structured data: `app/layout.tsx`
- Design system and responsive behavior: `app/globals.css`
- Reusable interactions: `components/`

## Design principles

- Evidence before title inflation
- Semantic static HTML before client enhancement
- Accessible primitives for complex interaction
- Restrained motion with reduced-motion support
- Dependencies must have a specific product or maintenance benefit
- No analytics or tracking by default

## License

Source code is available under the [MIT License](LICENSE). Portfolio content and personal brand materials remain the property of Sulthon Kaffaah Al Farizzi.
