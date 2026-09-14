# Engineering knowledge checklist

This checklist turns the broad reading list in
[Every Programmer Should Know](https://github.com/mtdvio/every-programmer-should-know)
into a small, project-specific review for this portfolio.

The upstream collection is a reference library, not a required curriculum. Use
the links when a relevant problem appears and record evidence in the pull
request instead of treating every resource as mandatory reading.

## Before merging

- [ ] **Strings:** keep documents in UTF-8, declare the page language, and do
  not make assumptions about names or other human-readable text.
- [ ] **Time:** use standards-based dates and time zones; do not calculate
  calendar values by hand.
- [ ] **Security:** commit no secrets, give external links safe `rel`
  attributes, and review third-party resources before embedding them.
- [ ] **UX and accessibility:** preserve semantic landmarks, keyboard access,
  visible focus, readable contrast, and reduced-motion behavior.
- [ ] **Performance:** justify every new runtime dependency and large asset;
  retain the zero-build approach unless measured requirements demand a change.
- [ ] **SEO:** keep the title, description, canonical URL, social metadata,
  `robots.txt`, and `sitemap.xml` consistent.
- [ ] **Operations:** run the local quality commands and preview the site with
  JavaScript enabled and disabled.

## Verification example

```bash
python scripts/validate.py
node --check script.js
python -m http.server 8000
```

After starting the server, open `http://localhost:8000` and verify the page at
mobile and desktop widths. The automated checks cover structural invariants;
the browser review covers behavior and presentation that static validation
cannot prove.

## Learning priorities for this repository

1. **Now:** strings and falsehoods, security, UX/usability, SEO, and practices.
2. **Next:** latency, browser memory, JavaScript internals, and architecture.
3. **Later:** distributed systems and platform engineering when a project has
   services, persistent data, or operational scale that requires them.

## Attribution

Adapted for this project's scope from
[`mtdvio/every-programmer-should-know`](https://github.com/mtdvio/every-programmer-should-know),
licensed under
[CC BY 4.0](https://github.com/mtdvio/every-programmer-should-know/blob/master/LICENSE).

