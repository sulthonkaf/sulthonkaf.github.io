# Sulthon KAF — Portfolio

Personal portfolio for **Sulthon Kaffaah Al Farizzi**, published with GitHub Pages at [sulthonkaf.github.io](https://sulthonkaf.github.io/).

## What this site communicates

- Selected full-stack, AI, and digital-health work
- Evidence-led project outcomes and technical scope
- Product, architecture, engineering, and delivery capabilities
- Clear contact paths for professional opportunities

## Architecture

The site intentionally uses a zero-build static architecture:

- Semantic HTML5
- Modern responsive CSS with light and dark themes
- Small dependency-free JavaScript enhancement layer
- Native GitHub Pages deployment
- Dependency-free validation in GitHub Actions

This keeps the site fast, portable, auditable, and easy to maintain.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Quality principles

- Progressive enhancement: core content remains available without JavaScript
- Accessibility: keyboard focus, semantic landmarks, reduced-motion support, and high-contrast themes
- Performance: no framework runtime, icon library, or animation dependency
- Discoverability: canonical URL, Open Graph metadata, structured data, robots policy, and sitemap

The project-specific [engineering knowledge checklist](docs/engineering-checklist.md)
connects these principles to focused review prompts and further reading.

## Updating content

- Edit project narratives and metrics in `index.html`
- Adjust visual tokens and layout in `style.css`
- Keep interactions in `script.js` small and optional
- Update the sitemap `lastmod` value after meaningful releases

Run the same structural validation used in CI with:

```bash
python scripts/validate.py
node --check script.js
```

## License

Source code is available under the repository’s [MIT License](LICENSE). Portfolio content and personal brand materials remain the property of Sulthon Kaffaah Al Farizzi.
