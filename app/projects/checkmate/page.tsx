import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from "lucide-react";

const root = "/projects/checkmate";
export const metadata: Metadata = {
  title: "Pokémon Checkmate: Galaxy",
  description: "Translating Pokémon team-building into a readable browser auto-battler: game systems, interaction design, evolution, economy and an authoritative multiplayer prototype.",
  alternates: { canonical: root },
  openGraph: { title: "Pokémon Checkmate: Galaxy — RyanC", url: root, description: "A game systems and development case study. V1 prototype; not publicly playable.", images: [`${root}/checkmate-v1-hero.jpg`] },
  twitter: { card: "summary_large_image", images: [`${root}/checkmate-v1-hero.jpg`] },
};

function PlayUnavailable() {
  return <div className="checkmate-unavailable"><button className="button" type="button" disabled aria-label="Visit Site — Coming Soon"><LockKeyhole size={15} aria-hidden="true" /> Visit Site</button><span>Coming Soon · Not public yet</span></div>;
}
function Gameplay({file,alt,caption,hero=false}:{file:string;alt:string;caption:string;hero?:boolean}) {
  return <figure className={hero ? "shinysim-lead shell checkmate-gameplay" : "shinysim-evidence checkmate-gameplay"}>
    <div className="checkmate-pan" tabIndex={0} role="region" aria-label={`${alt}. Scroll horizontally on smaller screens.`} data-lenis-prevent>
      <div className="checkmate-canvas"><Image src={`${root}/${file}`} alt={alt} width={1600} height={1180} priority={hero} sizes="(max-width: 800px) 960px, (max-width: 1480px) calc(100vw - 40px), 1440px" /></div>
    </div>
    <figcaption>{caption}<span className="checkmate-pan-hint">Swipe or use the arrow keys to explore the full interface.</span></figcaption>
  </figure>;
}
const loop = [
  ["Recruit", "Spend gold on a five-slot draft."],
  ["Position", "Put each role where it can matter."],
  ["Synergize", "Build bonuses across unique families."],
  ["Battle", "Let the team act autonomously."],
  ["Evolve", "Turn matching copies into stronger forms."],
  ["Adapt", "Rebuild around rewards and rivals."],
];
export default function CheckmateCaseStudy() {
  return <main className="shinysim-case checkmate-case">
    <header className="shinysim-opening shell">
      <Link className="back" href="/#projects"><ArrowLeft size={15} aria-hidden="true" /> Projects</Link>
      <span className="eyebrow">Game systems · Interaction · Development</span>
      <h1>Pokémon Checkmate:<br/><em>Galaxy</em></h1>
      <div className="shinysim-intro"><p>What if Pokémon team-building became an auto-battler? A competitive browser game concept inspired by Pokémon, TFT and Magic Chess—built around drafting, positioning and the decisions that happen before a battle begins.</p><PlayUnavailable /></div>
      <dl className="checkmate-metadata"><div><dt>Role</dt><dd>Product Designer / Game Systems Designer / Developer</dd></div><div><dt>Focus</dt><dd>Game Systems / UIUX / Frontend / Competitive Multiplayer</dd></div><div><dt>Year</dt><dd>2026</dd></div><div><dt>Status</dt><dd>V1 Prototype / In Development</dd></div></dl>
    </header>

    <Gameplay hero file="checkmate-v1-hero.jpg" alt="Pokémon Checkmate Galaxy gameplay with a six-unit formation, five active synergies, Cynthia, Kirlia details and the Wormhole Market" caption="The V1 working surface: decisions on the board, information at the edges, and economy within reach. Captured from a documented midgame QA fixture." />

    <section className="shinysim-story shell" aria-label="Checkmate design and development story">
      <article className="shinysim-phase text-only"><div className="shinysim-phase-copy"><span>01 — The design challenge</span><h2>Keep the identity.<br/>Reduce the complexity.</h2><p>Pokémon arrives with hundreds of creatures, types, evolutions, moves and relationships. Recreating all of that would bury the strategy. Checkmate translates familiar identities into a smaller, legible system: five combat roles, stable family traits, five gold tiers and one signature move per Pokémon.</p><p className="checkmate-following">The galaxy premise brings Pokémon and Trainers from different eras into one arena. Players recruit partners, build compositions and adapt to escalating encounters. The challenge is reading a team—not managing four moves for every creature.</p></div></article>

      <article className="checkmate-loop-section"><div className="shinysim-phase-copy"><span>02 — The core system</span><h2>One loop. Different decisions.</h2></div><ol className="checkmate-loop">{loop.map(([title,copy],i)=><li key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p>{i<loop.length-1&&<ArrowRight size={16} aria-hidden="true"/>}</li>)}</ol><p className="checkmate-supporting">Gold and interest create a reason to wait. The shop creates a reason to spend. Held Items strengthen one partner; Wishes change the direction of the whole lineup.</p></article>

      <article className="shinysim-phase text-only"><div className="shinysim-phase-copy"><span>03 — Evolution as progression</span><h2>A star upgrade you can recognise.</h2><p>Evolution becomes the visual language of auto-battler progression. Three equal-star copies merge into the next form: three Dreepy become Drakloak, then three Drakloak become Dragapult. Nine original copies complete the family.</p></div><div className="checkmate-evolution">{[["Dreepy","dreepy.png","1★","1 copy"],["Drakloak","drakloak.png","2★","3 copies total"],["Dragapult","dragapult.png","3★","9 copies total"]].map(([name,image,stars,copies],i)=><div key={name}><Image src={`${root}/${image}`} alt={name} width={120} height={120} unoptimized/><span>{stars}</span><h3>{name}</h3><p>{copies}</p>{i<2&&<ArrowRight className="evolution-arrow" size={22} aria-hidden="true"/>}</div>)}</div><p className="checkmate-supporting">Two-stage families keep their final form at 3★ with stronger stats. Legendaries use a separate two-copy upgrade rule. Ditto is a bench utility that supplies one normal copy, with explicit restrictions.</p></article>

      <article className="shinysim-phase"><div className="shinysim-phase-copy"><span>04 — Composition over commands</span><h2>Two ways to connect a team.</h2><p>Type traits—Fire, Water, Dragon, Ghost, Steel and others—cross with Attacker, Speedster, All-Rounder, Defender and Supporter roles. Only unique deployed families count, making diversity a strategic choice rather than rewarding duplicate stacking.</p><p className="checkmate-following">The detail panel keeps HP, Attack, Defense, Sp. Attack and Sp. Defense readable. Starting energy, attack range and a signature move give each partner a distinct job without recreating traditional Pokémon battles.</p></div><figure className="checkmate-detail-figure"><Image src={`${root}/checkmate-details.jpg`} alt="Kirlia detail panel showing stats, Psychic Collapse and Wise Glasses" width={250} height={580} sizes="(max-width:800px) 280px, 300px"/><figcaption>One selected partner connects composition, combat identity and item choices.</figcaption></figure></article>

      <article className="shinysim-phase text-only"><div className="shinysim-phase-copy"><span>05 — Trainers above the team</span><h2>A different strategic starting point.</h2><p>Trainers act as commanders: a passive shapes the run, and a charged power changes the next decision. Red rewards discovering type synergies. Cynthia favours higher-cost partners and can prepare one ally for the next fight. May supports economy; N rewards surviving partners.</p></div><div className="checkmate-trainer-notes"><div><h3>Red / Adaptability</h3><p>Explore combinations. Earn gold for activating new type synergies, then empower a carry.</p></div><div><h3>Cynthia / Preparation</h3><p>Invest deliberately. Strengthen elite partners and choose the ally that needs a Champion’s protection.</p></div></div></article>

      <article className="shinysim-phase"><div className="shinysim-phase-copy"><span>06 — From planning to a working surface</span><h2>Build the rules before the spectacle.</h2><p>The source planning had overlaps and a cut-off prompt. The first step was consolidating a V1 contract: 24 normal families, utility Ditto, four gated Legendaries and a seven-by-six board. Pokémon data was separated from combat logic so balance could change without rewriting the renderer.</p><p className="checkmate-following">The first complete interface proved the shop, bench and placement loop. Later passes tightened board proportions and touch targets, while preserving the Checkmate wordmark, Galaxy subtitle and lavender cosmic palette.</p></div><figure className="shinysim-evidence checkmate-process"><div><Image src={`${root}/process-first-workspace.jpg`} alt="First complete Checkmate desktop interface after a Pichu purchase, before the compact layout refinement" fill sizes="(max-width:800px) calc(100vw - 40px), 58vw"/></div><figcaption>Actual development capture: the early shop and bench working together. The later pass reduced vertical travel between the board and market.</figcaption></figure></article>

      <article className="shinysim-phase text-only"><div className="shinysim-phase-copy"><span>07 — Making combat trustworthy</span><h2>One set of rules.<br/>Two ways to play.</h2><p>A deterministic TypeScript engine handles movement, targeting, attacks, energy and ultimates. Practice runs it locally. Private multiplayer rooms use a Node/WebSocket server that owns purchases, the shared pool, combat seeds and outcomes; clients render the resulting battle timeline.</p></div><div className="checkmate-architecture"><span>Player action</span><ArrowRight size={16}/><span>Server validation</span><ArrowRight size={16}/><span>Shared rules + seeded combat</span><ArrowRight size={16}/><span>Battle playback</span></div><p className="checkmate-supporting">Twelve rule and integration tests cover merges, inventory, deterministic combat, eight-player rooms, reconnect and persisted placement. Three browser scenarios check the practice loop, mobile interaction and two-browser round synchronization. These are prototype validation results, not a claim of production-ready ranked play.</p></article>

      <article className="shinysim-phase right"><div className="shinysim-phase-copy"><span>08 — Interface under pressure</span><h2>Keep the next action readable.</h2><p>Desktop separates the board, team synergies, selected Pokémon and market. On mobile, the same hierarchy becomes a vertical flow with larger bench targets and stacked recruitment cards. Click/tap positioning provides an alternative to drag-and-drop.</p><p className="checkmate-following">Battle effects expose what the engine is doing: movement, attack trails, damage, health, energy and automatic signature moves. The player’s control stays in preparation, where it can remain deliberate.</p></div><figure className="shinysim-evidence checkmate-process checkmate-combat-crop"><div><Image src={`${root}/checkmate-combat.jpg`} alt="Checkmate combat frame with opposing teams, an attack trail and damage feedback" fill sizes="(max-width:800px) calc(100vw - 40px), 58vw"/></div><figcaption>Actual seeded combat, captured from the final QA fixture. Mobile playtest evidence is archived alongside the source.</figcaption></figure></article>

      <article className="checkmate-result"><div className="shinysim-phase-copy"><span>09 — V1 result</span><h2>A playable foundation for balance.</h2><p>V1 demonstrates the complete preparation–combat–reward loop, with enough real interactions to test a composition rather than click through a mockup.</p></div><ul>{["Drafting, gold, interest and XP","Board positioning and bench management","Evolution and Ditto transformation","Type and role synergies","Four Trainers, ten Held Items and six Wishes","Automatic combat and cosmic reward choices","Pokémon details and searchable roster","Private 2–8-player rooms and guest-seat standings"].map(item=><li key={item}><Check size={15} aria-hidden="true"/>{item}</li>)}</ul></article>
    </section>

    <div className="checkmate-final-shot"><Gameplay file="checkmate-evolution.jpg" alt="Final Checkmate V1 interface after a ninth-copy merge into three-star Dragapult" caption="A real shop command turns the ninth family copy into 3★ Dragapult. The interface reflects the evolved form, updated stats and preserved formation." /></div>

    <section className="shinysim-ending shell checkmate-ending"><span className="eyebrow">Next / Beyond V1</span><h2>Room for another season.</h2><p>Public online hosting, authenticated ranked matchmaking and a roguelike campaign come next. The generic trait system leaves room for regional forms, Paradox Pokémon, Ultra Beasts and stranger Wormhole encounters. Those are future directions; current Legendaries are available only through the practice lab flag, with campaign unlocks still to come.</p><PlayUnavailable/><p className="checkmate-legal">Pokémon Checkmate is an unofficial, non-commercial fan project created for design and development exploration. Pokémon and related properties belong to their respective owners.</p><Link className="back" href="/#projects"><ArrowLeft size={15} aria-hidden="true"/> Back to Projects</Link></section>
  </main>;
}
