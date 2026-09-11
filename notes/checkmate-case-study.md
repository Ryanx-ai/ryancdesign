# Pokémon Checkmate: Galaxy case study

Added 2026-09-11 after the game reached its documented V1 checkpoint (`6dab119`, Ryanx-ai/PKMNcheckmate-galaxy, codex/v1-foundation).

- Route: `/projects/checkmate`.
- Listing: public homepage Projects section (`/#projects`), between ShinySim and Tosker.
- Rendering: existing ShinySim editorial layout/classes, site typography/navigation and responsive card system. Checkmate-specific styling is scoped to `.checkmate-case` and its evidence components.
- CTA: active Case Study; native disabled Visit Site with Coming Soon / Not public yet. No game URL, localhost URL or empty anchor.
- Gameplay assets: final hero, detail panel, combat and ninth-copy evolution. Original Checkmate wordmark and Galaxy identity are present in the actual screenshots.
- Process: actual early shop/bench workspace screenshot; four chronological development/playtest captures remain in the Checkmate repository under `docs/process`.
- Final gameplay captures use a documented staged QA fixture, not a claim of an organically earned run. Captures are generated with `scripts/capture-portfolio.ts` in the game repo. The evolution screenshot exercises the actual shop/merge command, and combat uses the actual engine.
- Web images: locally optimized JPEGs, responsive Next Image delivery; pixel sprites from the game's bundled and attributed PokéAPI assets. No new generated logo or fabricated interface.
- Systems represented: draft/shop, economy/interest/XP, bench/positioning, evolution/Ditto, type/role synergies, trainer passive/power, held items, Wishes/rewards, stats/roster, deterministic combat, private 2–8-seat authority/reconnect and provisional guest-seat standings.
- Future: public hosting, authenticated ranked matchmaking, campaign/meta unlocks and additional seasonal traits/forms. Public competitive MMR is not claimed.
- QA: lint, typecheck and 29-route production build passed. Browser checks at 1440, 820 and 390 pixels verified the route, disabled controls, active case-study links, horizontal image panning within its container, no page overflow, no runtime exceptions and preserved ShinySim live link. Sitemap includes the new case study. ShinySim and Tosker records remain unchanged.
