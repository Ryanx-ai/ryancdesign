# October webfolio release

## Scope

Preserve Next 15, file-backed content, Auth.js, self-hosted fonts, CMSH and existing case-study URLs. Move factual experience into /resume with prominent reciprocal navigation. Extend existing MDX with validated editorial blocks; legacy studies keep their renderer.

Portfolio additions: Pufflet, Phings, Luna, Eureka CMS, and the existing Pangea study. Projects retains Checkmate, ShinySim and Tosker. Pangea's previous URL permanently redirects to its portfolio case study.

Harpie is excluded at the founder's request. TaskMaster and SVVARM remain unpublished because source evidence was unavailable. No invented dates, outcomes or historical process.

## Superseding art direction

No generated exploratory sketches are published. Assets and provenance remain locally in ignored .local-archive/sketches/. Harpie's draft is archived outside content and public assets.

The black/cyan shell remains intact. Original artwork, restrained prose, varied editorial blocks and functional interface studies carry the narrative. New UI studies are explicitly labelled concepts, not shipped services or historical screenshots.

## Evidence

- Pufflet: eight supplied vector logo pages and nine-page identity guide reviewed. Original paths preserved; lockup and mascot use cropped SVG viewBoxes. October 2026 guide establishes date and palette.
- Phings: source Ryanx-ai/pangea-phings, commit 01525b6, September 2026. Source concept illustrations carry explicit AI provenance. New interface does not claim to simulate life.
- Luna: source Ryanx-ai/luna-design, commit c818e48, July 2026. Local brand studio pilot, not Luna Vault or production SaaS. Original lockup and source palette choices retained.
- Eureka: README and development log establish module-first curriculum planning. Original templates remain intermittently iCloud-dataless. Interface uses clearly illustrative content, no private database, and no unsupported design date.
- Pangea: existing concept and evidence preserved; collection and navigation updated only.

## Release gates

Responsive/interface/accessibility checks, asset and route audit, lint, typecheck, production build, full diff and secret review, main push, matching Vercel production deployment Ready, then public smoke test. Successful local checks or push alone are not deployment proof.

## Local validation — 21 October 2026

- Lint and TypeScript passed; production build generated 36 static pages including all 22 portfolio routes.
- Thirty public routes checked against the production build; no unexpected failures. Pangea redirects permanently, Harpie returns 404 and is absent from sitemap, unauthenticated admin redirects, and the write API returns 401.
- Desktop, 768px tablet and 390px mobile studies inspected. Entry-path controls, habitat views, palette/name continuity and curriculum selection/search work. Mobile navigation, résumé anchors, gallery next/previous, Escape/focus restoration and show/hide checked.
- No missing content assets, public sketch files, Harpie references in application code, absolute local paths or detected secret patterns. Private environment, dependencies, build output and local archives are ignored.
- Existing Auth.js/Jose Edge compression API build warnings remain; no dependency changes were made. New case-study prose is English; the existing language switch remains available for shared site navigation and résumé content.

## Resumed regression pass

The founder clarified that Pufflet, Phings, Luna and Eureka are the only new case studies; existing work remains. Harpie is excluded. Pangea is an existing study, not a newly authored case.

Tested long/empty Luna names, Eureka no-results and empty-selection recovery, Phings view/habitat independence, and Pufflet Enter/Space keyboard activation. Fixed one issue: long unbroken names could clip in Luna's Guidelines panel; they now wrap without changing the regular layout. Editorial parser tests accept only the four implemented studies and reject Harpie, empty image blocks, external media URLs and unknown block types.
