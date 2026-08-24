import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const liveUrl = "https://shiny-simulator.vercel.app/";

export const metadata: Metadata = {
  title: "ShinySim",
  description: "How ShinySim evolved from a Flask experiment into a typed, data-driven, multi-generation shiny-hunting simulator.",
  alternates: { canonical: "/projects/shinysim" },
  openGraph: {
    title: "ShinySim — RyanC",
    description: "A product and engineering case study spanning simulation architecture, PokéAPI integration, game-aware rules and validated encounter coverage.",
    images: ["/projects/shinysim/final-desktop.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/projects/shinysim/final-desktop.jpg"] },
};

type EvidencePhaseProps = {
  index: string;
  title: string;
  copy: string;
  image?: string;
  alt?: string;
  caption?: string;
  layout?: "left" | "right";
};

function EvidencePhase({ index, title, copy, image, alt, caption, layout = "left" }: EvidencePhaseProps) {
  return <article className={`shinysim-phase ${layout}${image ? "" : " text-only"}`}>
    <div className="shinysim-phase-copy"><span>{index}</span><h2>{title}</h2><p>{copy}</p></div>
    {image ? <figure className="shinysim-evidence"><div><Image src={image} alt={alt ?? ""} fill sizes="(max-width:800px) calc(100vw - 40px), 58vw" /></div>{caption ? <figcaption>{caption}</figcaption> : null}</figure> : null}
  </article>;
}

export default function ShinySimCaseStudy() {
  return <main className="shinysim-case">
    <header className="shinysim-opening shell">
      <Link className="back" href="/#projects"><ArrowLeft size={15} aria-hidden="true" /> Projects</Link>
      <span className="eyebrow">Product · Interaction · Engineering</span>
      <h1>ShinySim</h1>
      <div className="shinysim-intro"><p>ShinySim evolved from a small Flask coding experiment into a typed, data-driven, multi-generation shiny-hunting simulator—combining product framing, interaction design, probability modelling and deliberate data-quality controls.</p><a className="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit Site <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </header>

    <figure className="shinysim-lead shell"><div><Image src="/projects/shinysim/final-desktop.jpg" alt="The final ShinySim desktop workspace" fill priority sizes="(max-width:1480px) calc(100vw - 40px), 1440px" /></div><figcaption>The deployed simulator brings encounter, controls, context, route editing, rules and session feedback into one responsive workspace.</figcaption></figure>

    <section className="shinysim-story shell" aria-label="ShinySim development story">
      <EvidencePhase index="01" title="Legacy prototype" copy="The original Python and Flask experiment proved weighted encounters and a one-in-n shiny outcome. It also revealed the limits of server-rendered actions, coupled session state, unvalidated route totals and a blocking Auto Hunt loop." image="/projects/shinysim/legacy-interface.jpg" alt="The original Flask ShinySim interface" caption="A genuine local reconstruction from the preserved Flask source." />
      <EvidencePhase index="02" title="Simulation foundation" copy="The rebuild began with a pure TypeScript domain layer. Explicit route, result and session types separated probability from React, while injected randomness made boundary conditions deterministic and strict fixed-point validation prevented misleading encounter tables." layout="right" />
      <EvidencePhase index="03" title="Interface rebuild" copy="The new single-page workspace gives the current encounter priority, then separates direct controls, statistics, history and configuration. Watched Hunt, fast-forward Auto Hunt and manual stopping remain distinct and understandable." image="/projects/shinysim/simulator-controls.png" alt="ShinySim current encounter and simulation controls" caption="Encounter hierarchy and the three intentional run modes." />
      <EvidencePhase index="04" title="PokéAPI-backed encounters" copy="A typed adapter filters version-specific location data by method, excludes unsupported conditions, aggregates duplicate slots and enriches each route with levels and sprite metadata. The interface clearly distinguishes authentic provider data from local edits." image="/projects/shinysim/route-editor.png" alt="ShinySim game context and route editor" caption="Provider context, route authenticity, editable slots and strict total validation." layout="right" />
      <EvidencePhase index="05" title="Game-aware rules" copy="Game selection now resolves through a rules registry rather than one global denominator. Earlier titles use their generation’s base rate, while eligible later games expose Shiny Charm rolls and a transparent effective probability." image="/projects/shinysim/game-rules.png" alt="ShinySim Generation VI rules with Shiny Charm enabled" caption="Generation-aware odds, charm availability and effective probability." />
      <EvidencePhase index="06" title="Coverage validation" copy="A discovery and audit pipeline examined 18,479 candidate contexts and generated 5,306 truthful selections across 26 games. Conditional, incomplete and deterministic acquisition records were documented and excluded rather than normalized into misleading hunt tables." layout="right" />
      <EvidencePhase index="07" title="Final product" copy="The released product supports searchable game-to-method navigation, live route loading, editable encounters, bounded history and responsive behavior. Its 116 automated tests cover probability, validation, state transitions, provider reliability, catalog integrity and performance-sensitive hunt behavior." image="/projects/shinysim/final-mobile.jpg" alt="The final ShinySim mobile experience" caption="The same task hierarchy preserved in a deliberate 390-pixel mobile flow." />
    </section>

    <section className="shinysim-ending shell"><span className="eyebrow">Live product</span><h2>Try the simulator.</h2><a className="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit ShinySim <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main>;
}
