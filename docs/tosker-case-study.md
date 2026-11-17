# Tosker portfolio archive — 17 November 2026

## Direction before implementation

A travel journal told through a working shared map, with the original gold squirrel as its signature.

Keep RyanC's Inter / EB Garamond typography and existing navigation. Use Tosker Night #080D10, raised teal #18262B, Ivory #F4EFE6, Gold #C89C5D and Pink #FF4F91 within the case study. Left-align story and captions; centre only the identity specimen. Large screenshots, quiet editorial text, generous space. No fabricated user metrics, continuous-tracking claims or generic feature-card wall.

Compared layouts:

```
A: logo + story / full product scene / brand / decisions / pause
B: giant logo / brand tiles / small product gallery / story
```

Choose A: the trip problem and working product lead; brand supports the story rather than burying the product. The squirrel is the visual signature. Responsive scenes and a small screenshot selector serve inspection, not simulated product interaction.

## Source and public-asset review

Tosker source remains at recovery 9007afb, application a5a4eff. Read-only feature verification: README.md and docs/MS7-4-FP4-RELEASE-2026-10-27.md in the Tosker repository. All existing Tosker WIP preserved. No application restart, new fixtures, GPS, provider calls, data writes, capacity renewal or infrastructure changes.

Original SVGs: public/brand/toskerlogo-icon-main.svg and toskerlogo-full-white.svg. These are the actual identity assets, not unapproved mascot explorations.

Screenshot copies are unchanged, individually visually reviewed, from isolated synthetic QA evidence:

| Portfolio file | Original Tosker evidence |
| --- | --- |
| map-workspace.png | .git/ms74-fp4/browser/real-map-1793017059601-1440.png |
| drive-route.png | .git/ms74-fp4/browser/geography-1793078559769-drive.png |
| chat-composition.png | .git/ms74-fp4/browser/composition-1728x1100.png |
| mobile-map.png | .git/ms74-fp4/browser/real-map-1793017059601-390x844.png |
| card-actions.png | .git/ms74-fp4/browser/card-menu-390.png |
| location-consent.png | .git/ms74-fp3/consent-320.png |
| remove-confirmation.png | .git/ms74-fp4/browser/card-nuke-confirmation.png |

No personal conversation, real account profile/avatar or real device position is published. QA room labels remain truthful. Map attribution remains visible. Chat/action evidence uses an offline map fixture and is explicitly labelled; it is not represented as a successful basemap render. Consent capture is identified as the earlier FP3 interaction retained into FP4. The current beta footer's historical FP3 label is not a release assertion.

Brand origin is founder-supplied. Ratatoskr's messenger role cross-checked against Gylfaginning XVI, Brodeur translation (University of Oslo Bibliotheca Polyglotta). “Connector between realms” is Ryan's brand interpretation, not a claim that the myth describes a benevolent guide.

## Publishing boundaries

Only ryancdesign / www.ryanc.design changes. Tosker is first in the shared public project list. Case study and metadata say paused personal beta, with no promise of a working public onboarding or active sharing service. No general-access demo link added. MS7.4 remains unlocked. Long-term movement and voice/video remain future work. This is a portfolio archive, not a GitHub repository archive or service shutdown.

## Verification

- TypeScript and repository ESLint passed.
- Production build passed, including all 37 static pages and the new /projects/tosker route (2.15 kB route JS).
- Existing next-auth/jose dependency emits CompressionStream / DecompressionStream Edge compatibility warnings. This change does not alter authentication or dependencies.
- Browser checks at 320, 390, 768, 900 and 1440 pixels found no document-width overflow. Phone layout and keyboard focus reviewed; scene selection worked with Space and Enter. Full-resolution screenshot links have descriptive accessible names and preserve source images.
- Homepage browser verified project order: Tosker, ShinySim, Pokémon Checkmate: Galaxy. Existing case study routes retained; sitemap derives the new route from the shared project list.
- Public source scan found no credential-pattern matches. Assets visually reviewed before copying. No new dependency or external image-generation service used.
- Release target verified: pangea6 / ryancdesign, www.ryanc.design, GitHub Ryanx-ai/ryancdesign main. Prior canonical commit: 9f0381a556f451ef99ab31c3677333b212e5d8d9. Revert only this portfolio commit to roll back; no Tosker database or application rollback is involved.
