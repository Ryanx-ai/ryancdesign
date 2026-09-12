# Pangea portfolio concept — 2026-09-12

**Coming Soon · Concept only · Development not started**

## Architecture

The public card and case study live in this repository at `/#projects` and `/projects/pangea`. The existing project data collection, site layout, navigation, editorial classes, typography and automatic sitemap are reused. The Coming Soon card links internally and renders plain status text without an external Visit Site CTA or disabled product button.

`Ryanx-ai/pangea-phings` is the canonical repository for Pangea concept documentation, brand sources, artwork originals and future separately authorized development. Its `Pangea Phings Dev` checkout contains no app scaffold or runtime. No standalone Pangea deployment is needed.

## Assets

Delivery copies are under `public/projects/pangea/`. The card is a crisp pixel-grid derivation of supplied `Pangea_Logo-03.svg`, retaining its actual lowercase wordmark and leaf, with dark green `#234c37` on light green `#d4e8b5`. The uppercase logo seen in the reference mockup was not substituted for the supplied original. A PNG social export accompanies it.

The original world and three related primitive Phing studies were generated with the built-in image generation tool. PNG originals and full prompts are preserved in the Pangea repository. The portfolio uses WebP delivery copies. The adaptation sketch is semantic HTML/CSS, with an editable concept SVG archived in Pangea. All three visuals are clearly labelled as conceptual, and future behaviour is described as speculative.

## Validation

- `npm run lint`, `npm run typecheck` and final `npm run build` pass.
- `/projects/pangea` is statically generated; no new API, service, dependency or runtime was added.
- Browser layout checks at 1440, 768, 390 and 320 pixels found no horizontal overflow.
- Both concept images load; accessible image descriptions and captions are present.
- Coming Soon, Concept only and Development not started are visible in the opening and current-status section.
- Portfolio card exposes two internal links to `/projects/pangea`, zero product buttons and no external URL.
- A fresh browser session verifies card → case study → back to `/#projects`. An earlier automation session became unresponsive and was replaced before concluding the check.
- Canonical metadata resolves to `https://www.ryanc.design/projects/pangea`; sitemap derives the entry automatically.

Production publication uses the established Vercel Git integration for this repository’s `main` branch and project `ryancdesign`. A READY deployment and canonical-domain browser checks must be confirmed separately after the publishing commit. Final deployment evidence is recorded in the task’s verification report.
