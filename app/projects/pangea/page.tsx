import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./pangea.module.css";

const root = "/projects/pangea";
export const metadata: Metadata = {
  title: "Pangea — Coming Soon",
  description: "An initial concept for a living-world experiment. You shape the environment. Small digital lifeforms find their own way. Concept only; development not started.",
  alternates: { canonical: root },
  openGraph: {
    title: "Pangea — Life Finds a Way. | RyanC",
    description: "Coming soon. An artificial-life concept exploring simple beginnings and different possible futures. Development not started.",
    url: root,
    images: [`${root}/pangea-social.png`],
  },
  twitter: { card: "summary_large_image", images: [`${root}/pangea-social.png`] },
};

const pressures = [
  ["Terrain", "A clearing. A river. A different route."],
  ["Resources", "Enough to survive. A reason to explore."],
  ["Climate", "Conditions that might favour a different form."],
  ["Opportunity", "Something unfamiliar to encounter."],
];

export default function PangeaCaseStudy() {
  return <main className={`shinysim-case ${styles.case}`}>
    <header className={`shinysim-opening shell ${styles.opening}`}>
      <Link className="back" href="/#projects"><ArrowLeft size={15} aria-hidden="true" /> Projects</Link>
      <span className="eyebrow">Artificial life · Simulation · Speculative design</span>
      <div className={styles.identity}>
        <div><h1>Pangea</h1><p className={styles.tagline}>Life Finds a Way.</p></div>
        <div className={styles.status}><span>Coming Soon</span><p>Concept only<br />Development not started</p></div>
      </div>
      <div className="shinysim-intro"><p>A living-world experiment exploring what happens when we create the conditions for digital life, then allow it to find its own way through them.</p></div>
    </header>

    <figure className={`shell ${styles.world}`}>
      <Image src={`${root}/world-concept.webp`} alt="Original pixel-art world concept: forest clearings, water and rocky terrain dwarf a few tiny primitive Phings" width={1536} height={1024} priority sizes="(max-width:1320px) calc(100vw - 40px), 1280px" />
      <figcaption><span>01 / World exploration</span>Original concept art. An imagined environment, not gameplay.</figcaption>
    </figure>

    <div className={`shinysim-story shell ${styles.story}`}>
      <section className={styles.idea} aria-labelledby="pangea-idea">
        <div className="shinysim-phase-copy"><span>01 — The idea</span><h2 id="pangea-idea">A living world,<br />shaped together.</h2></div>
        <div className={styles.body}><p>Humans shape the environment. Phings live inside it. The idea begins with basic instincts and ways to perceive and interact with the world.</p><p>What happens afterwards should increasingly belong to them.</p><p className={styles.principle}>We code the conditions for life.<br />We do not script the life that emerges.</p></div>
      </section>

      <section className={`shinysim-phase ${styles.phings}`} aria-labelledby="pangea-phings">
        <div className="shinysim-phase-copy"><span>02 — The Phings</span><h2 id="pangea-phings">Small beings.<br />Open possibilities.</h2><p>Phings would begin as primitive blobs with basic survival drives. No assigned destiny, authored personality or secret understanding of the player. Their simulated world would be the only environment available to them.</p></div>
        <figure className={styles.study}><Image src={`${root}/phings-concept.webp`} alt="Three provisional pixel-art Phing studies sharing a simple blob body, with slight changes in colour and proportions" width={1536} height={1024} sizes="(max-width:800px) calc(100vw - 40px), 740px" /><figcaption><span>02 / Primitive life studies</span>Related forms, not finished species. Initial visual direction only.</figcaption></figure>
      </section>

      <section aria-labelledby="pangea-world">
        <div className="shinysim-phase-copy"><span>03 — You shape the world</span><h2 id="pangea-world">Change the conditions.</h2><p>The player would change the environment, without directly controlling individual Phings. They would experience the consequences and make their own way through them.</p></div>
        <ul className={styles.pressures}>{pressures.map(([title, copy]) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ul>
      </section>

      <section aria-labelledby="pangea-learning">
        <div className="shinysim-phase-copy"><span>04 — Learning to live / Future questions</span><h2 id="pangea-learning">Same beginning.<br />Different possibilities.</h2><p>Could experience, inheritance and interaction produce behaviour we did not explicitly author? Could different environments favour different descendants? These are questions to explore, not working systems.</p></div>
        <figure className={styles.adaptation}>
          <div className={styles.branch}><div className={styles.origin}><span>Same primitive life</span><p>A small, shared beginning.</p></div><ArrowRight aria-hidden="true" size={22} /><ul><li><span>Wet ground</span><p>Could a flatter form help?</p></li><li><span>Scarce resources</span><p>Could a smaller form persist?</p></li><li><span>Cooler terrain</span><p>Could a rounder form help?</p></li></ul></div>
          <figcaption><span>03 / Environment → adaptation</span>A speculative design sketch, not a biological prediction or an implemented evolution system.</figcaption>
        </figure>
      </section>

      <section className={styles.questions} aria-label="Longer-term questions">
        <div className="shinysim-phase-copy"><span>05 — Do they know you’re there?</span><h2>Only what they<br />could discover.</h2><p>A Phing should never secretly know something it could not have learned through its senses, inheritance, communication or experience.</p><p>If it eventually detected patterns behind unexplained environmental changes, that understanding would have to come from observation.</p></div>
        <div className={styles.body}><span className={styles.smallLabel}>Research directions only</span><h3>Learning. Language. Culture.</h3><p>Future explorations might ask how primitive sounds acquire shared meaning, or how cooperation and social habits arise from simpler interactions.</p><p>Even a player’s voice could someday enter as rhythm, loudness and acoustic patterns, without translated words or an explanation of who made the sound.</p><p>These are speculative design directions. No claim of consciousness or sentience is intended.</p></div>
      </section>

      <section className={styles.idea} aria-labelledby="pangea-new-world">
        <div className="shinysim-phase-copy"><span>06 — A new world every time</span><h2 id="pangea-new-world">Another chance<br />to grow.</h2></div>
        <div className={styles.body}><p>Each future world could offer a different possible history. Same beginning. Different pressures. Different Phings. Different outcome.</p><p>The leaf marks a beginning. What follows remains an open question.</p></div>
      </section>
    </div>

    <section className={`shinysim-ending shell ${styles.ending}`}>
      <span className="eyebrow">Current status / Coming Soon</span><h2>A small beginning.</h2>
      <p className={styles.development}>Concept only · Development not started</p>
      <p>Pangea is an experimental concept. This page documents the idea and its first visual explorations. A future prototype would start small: a world, a few Phings and basic environmental interactions, before exploring survival, learning and change across generations.</p>
      <Link className="button" href="/#projects">Back to projects <ArrowRight size={15} aria-hidden="true" /></Link>
    </section>
  </main>;
}
