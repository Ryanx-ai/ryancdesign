# Founder walkthrough: Eureka + Pangea

Preserve the RCD shell, uniform 16:10 gallery, Pufflet and Luna interfaces.

## Design direction

- Eureka: white #FFFFFF, charcoal #231F20, amber #FAB81A, orange #F08421,
  soft grey #F7F7F7. Reuse the supplied outlined wordmark, not a substitute font.
  Helvetica/Inter UI; left-aligned course details. Catalogue → modules → proposal
  is the central workflow. Course facts come from the supplied 2026–2027 working
  catalogue; module groupings are an explicitly new interface proposal.
- Pangea: pale green #EDF1DF, forest #234C37, moss #D4E8B5, cream #FFF7E8,
  black #000000. Keep the world dominant. Destroy actions black out the simulated
  world, not the whole website; tools, status and recovery remain accessible.
  Side-by-side live/reference views distinguish the consequence clearly.
- Phings names the inhabitants; Pangea becomes the canonical portfolio title and
  route. Preserve old URLs with one-way redirects, never duplicate entries.
- Software credits: Figma/Illustrator as directed, plus Blender for Pangea/Pufflet.
  Any new Blender study is labelled with its actual provenance, not presented as
  evidence of a historical process. Do not fabricate screenshots.

## QA

Check desktop, tablet and 390px; keyboard/touch alternatives; grow/destroy/reset,
comparison and inhabitants; catalogue search/filter → module selection → proposal;
empty selection recovery; old URL redirects; metadata/sitemap; lint/typecheck/build.
Commit to canonical main, allow Vercel Git deployment and verify www.ryanc.design.

## Verification — 22 October 2026

- Lint, typecheck and production build pass. All 21 portfolio routes generate.
- Local production smoke: 25 sitemap destinations return 200; 150 referenced
  image assets exist. Both former Pangea/Phings entry URLs redirect to `/work/pangea`.
- Browser checks at 1440px, 768px and 390px: course selection, proposal outline,
  delivery-format warning and empty-selection recovery; black-world destruction,
  restore, comparison and inhabitants. No horizontal overflow or runtime errors
  observed. Corrected the recovery button's inherited low-contrast text colour.
- Existing Auth.js/JOSE Edge warnings remain; no auth/dependency changes in this patch.
- Blender 2.93.5 produced genuine clay/material renders from the checked-in script.
  Native application-window capture stalled, so no simulated Blender UI is published.
  The editable scene is archived locally; the public images are actual render output.
