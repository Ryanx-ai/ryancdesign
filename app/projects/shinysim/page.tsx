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
      <div className="shinysim-intro"><p>I started ShinySim as a small Flask experiment inspired by Pokémon shiny hunting. I rebuilt it to explore encounter probability, real game data and a clearer simulation interface.</p><a className="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit Site <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </header>

    <figure className="shinysim-lead shell"><div><Image src="/projects/shinysim/final-desktop.jpg" alt="The final ShinySim desktop workspace" fill priority sizes="(max-width:1480px) calc(100vw - 40px), 1440px" /></div><figcaption>The deployed simulator brings encounter, controls, context, route editing, rules and session feedback into one responsive workspace.</figcaption></figure>

    <section className="shinysim-story shell" aria-label="ShinySim development story">
      <EvidencePhase index="01" title="Legacy prototype" copy="The first Python and Flask version supported weighted encounters and shiny odds. It also exposed problems: actions needed a server round trip, route totals were not validated and Auto Hunt blocked other work." image="/projects/shinysim/legacy-interface.jpg" alt="The original Flask ShinySim interface" caption="A genuine local reconstruction from the preserved Flask source." />
      <EvidencePhase index="02" title="Simulation foundation" copy="I moved the simulation into a TypeScript layer separate from React. Typed routes and results made the rules clearer. Controlled random inputs made tests repeatable, while validation checked that encounter probabilities added up correctly." layout="right" />
      <EvidencePhase index="03" title="Interface rebuild" copy="I made the current encounter the main focus, with controls, history and settings around it. Watched Hunt, Auto Hunt and Stop remain separate actions." image="/projects/shinysim/simulator-controls.png" alt="ShinySim current encounter and simulation controls" caption="Encounter hierarchy and the three intentional run modes." />
      <EvidencePhase index="04" title="PokéAPI-backed encounters" copy="The PokéAPI adapter filters encounters by game and method, excludes unsupported conditions and combines duplicate slots. The editor distinguishes provider data from changes made by the user." image="/projects/shinysim/route-editor.png" alt="ShinySim game context and route editor" caption="Provider context, route authenticity, editable slots and strict total validation." layout="right" />
      <EvidencePhase index="05" title="Game-aware rules" copy="Each game uses its own rules rather than one shared shiny rate. Where supported, users can enable the Shiny Charm and see the resulting probability." image="/projects/shinysim/game-rules.png" alt="ShinySim Generation VI rules with Shiny Charm enabled" caption="Generation-aware odds, charm availability and effective probability." />
      <EvidencePhase index="06" title="Coverage validation" copy="The documented audit checked 18,479 candidate contexts and retained 5,306 selections across 26 games. It excluded incomplete records, unsupported conditions and guaranteed acquisitions instead of presenting them as ordinary hunts." layout="right" />
      <EvidencePhase index="07" title="Final product" copy="The final workspace supports game and method search, route loading, editable encounters and bounded history. At this checkpoint, 116 automated tests covered the rules, data and hunt behaviour. The main lesson was that clear controls only help if the underlying encounter data is trustworthy." image="/projects/shinysim/final-mobile.jpg" alt="The final ShinySim mobile experience" caption="The same task hierarchy preserved in a deliberate 390-pixel mobile flow." />
    </section>

    <section className="shinysim-ending shell"><span className="eyebrow">Live product</span><h2>Try the simulator.</h2><a className="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit ShinySim <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main>;
}
