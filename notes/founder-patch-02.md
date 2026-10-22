# Founder walkthrough patch 02 — 22 October 2026

## Direction before implementation

Preserve the black/cyan RCD shell, CMSH, stars, legacy artwork, existing project tiles and factual résumé content. New work is contained to the requested gallery, case-study and résumé surfaces.

- Gallery: original artwork contained within existing masonry dimensions; a consistent bottom-left title and metadata sits over a restrained contrast gradient. No generated text over the centre of the image.
- Pufflet marketing: ink #101425, cream #F4EFE6, lime #B4F28B, lavender #8B78F8 and pink #FF4F91. Inter, bold compact headings and readable information. One expressive mascot/launch composition; quieter benefits, use cases and illustrative pricing. Distinct from the restrained deployment application.
- Pufflet app: dashboard → import → configure → build → success, with a recoverable failed-build example. All fixture data and proposed pricing labelled illustrative. No upload transmission, OAuth, secrets, hosting or backend. Keyboard alternatives accompany drag/drop.
- Phings: one companion/world concept, reusing Pangea environments and provisional character art. AI-companion interaction is a new design direction, not a historical shipped capability.
- Luna: source-led Moonlight Black #0B0B0C, panel #151517, violet #A78BFA, foreground #F1F1F2. Brand family, identity, collection version and shared preview are distinct surfaces, not generic KPI dashboards.
- Résumé: download first, concise summary, existing career/education/achievements/skills/contact. Remove oversized name and URL.

The plan deliberately separates expressive brand marketing from usable application UI; it does not apply the same card template to both. Existing portfolio typography and colours stay unchanged outside the requested areas.

## Sources

- Luna Vault read-only checkout: commit afe3150, 1 August 2026. README, product model, navigation, Brand/Collection types, BrandsIndex, IdentityWorkspace and CollectionDetail inspected. Actual navigation: Brands, Collections, Timeline; utility Archive, Settings, Help. Active MVP is Brand → Wrap → Collection → Share/Download. Session-local data; authentication, persistence and enforced secure access remain future work. No Luna Vault repository changes or deployment.
- Existing Phings explicitly describes itself as the creature/interface layer of Pangea; both use the same source world and creature artwork. Consolidation is warranted. Historical MDX, component and assets remain in the repository.
- Pufflet original vector mascot/lockup and palette are retained. Founder subsequently supplied the gallery, résumé and Pufflet website references. The website follows the dark ink hero, lime emphasis, dimensional cloud turtle and lighter product sections, without reproducing the reference layout or inventing commercial capabilities. New mascot applications are present-day generated design concepts, not historical process evidence.

## Image generation provenance

New raster mascot applications use the built-in image-generation tool with the original cropped SVG rendered to PNG as identity reference. Original SVG files and all existing thumbnails remain unmodified. Selected outputs are transparent WebP derivatives, 1200px wide, approximately 60KB each.

- `public/content/projects/pufflet/mascot-welcome.webp`: dimensional welcome pose, used in the marketing hero and mascot application showcase.
- `public/content/projects/pufflet/mascot-rest.webp`: closed-eye resting pose with cloud cushion, used in the closing CTA and mascot application showcase.
- `public/content/projects/luna/vault-lockup.png`: unchanged original Luna Vault full logo copied from its reference repository. No runtime cross-repository dependency.

Prompt directions (summarised):

1. Stylized-concept / transparent mascot application. Use the original flat Pufflet mascot as the strict identity reference. Preserve its squat lime turtle body, oversized scalloped white cloud shell, two black eyes, rounded feet and short tail. Create a premium matte-vinyl dimensional render in three-quarter view, with one front foot lifted in welcome. Soft studio light, gentle lavender shadow, no lettering, props, extra character features or ground plane.
2. Stylized-concept / alternate mascot application. Use the original identity and first dimensional render as references. Keep the same geometry, proportions, palette and material. A contented resting pose, small closed-arc eyes and a simple cloud cushion. Transparent background, no mouth, clothing, text or UI. Preserve the identity rather than redesigning the character.

## QA scope

React review: no new dependencies, effects, global listeners, network calls or animation timers. All prototype state is local and event-driven; inputs are labelled; buttons are keyboard-operable; selected views use pressed states; form and build errors are visible. File import displays filenames only and never reads or uploads file contents. Pricing, build logs, domains, telemetry and collection publication are explicitly illustrative.

Verified locally at 1440px, 768px and 390px: gallery metadata/image containment, no oversized overlays, overlay previous/next/Escape, download-first résumé, Pufflet responsive marketing and application, Luna identity/version workflow, Phings companion example. No horizontal overflow or missing rendered images in checked surfaces. Existing employment, education, achievements and skills source content is unchanged.

Pangea retains its original MDX record as archived and all historical assets; `/work/pangea` and `/projects/pangea` permanently redirect to `/work/phings`. Public collection contains 21 entries after consolidation. Existing published artwork files remain byte-for-byte unchanged.

Final local gates: ESLint passed; TypeScript passed; production build passed (36 static pages, 21 portfolio routes). Production server reached Ready on port 3000. Thirty public-route/PDF/redirect checks passed. Sitemap excludes archived Pangea; Harpie remains 404; unauthenticated admin redirects. Browser checks reported no console errors, broken images or horizontal overflow on the inspected desktop/tablet/mobile surfaces. Eureka search/selection and existing gallery overlay navigation remain functional.

An intentionally invalid `/work/harpie` request returns the expected 404, but Next.js logs an internal `NoFallbackError` for that unknown statically generated route. Valid published routes return 200. This framework diagnostic is outside the requested presentation changes; no checks or error reporting were suppressed.

Safety: no original public artwork, dependency manifests, résumé facts or Luna Vault source files changed. No environment files, caches, local absolute paths or credentials are included in this patch.
