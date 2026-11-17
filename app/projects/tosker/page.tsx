import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowDown, MapPin, MessagesSquare, NotebookPen, Heart, Flag, Check, Bookmark } from "lucide-react";
import { ToskerScenes } from "@/components/tosker-scenes";
import styles from "./tosker.module.css";

const root = "/projects/tosker";
export const metadata: Metadata = {
  title: "Tosker — A shared map for going together",
  description: "Ryan Chin’s personal travel project: the Ratatoskr-inspired identity, collaborative trip planning, Map-first workspace and privacy-conscious location design. A paused beta, documented through real product captures.",
  alternates: { canonical: root },
  openGraph: { title: "Tosker — RyanC", url: root, description: "From travelling with friends to designing and building a shared Map, Chat and Board.", images: [`${root}/map-workspace.png`] },
  twitter: { card: "summary_large_image", images: [`${root}/map-workspace.png`] },
};

function PhoneCapture({ file, alt, title, caption, width, height }: {file:string;alt:string;title:string;caption:string;width:number;height:number}) {
  return <figure className={styles.phone}>
    <a href={`${root}/${file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} screenshot at full size (new tab)`}><Image src={`${root}/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 600px) 280px, 320px" /></a>
    <figcaption><h3>{title}</h3><p>{caption}</p></figcaption>
  </figure>;
}

export default function ToskerCaseStudy() {
  return <main className={styles.page}>
    <header className={`${styles.opening} shell`}>
      <Link className={styles.back} href="/#projects"><ArrowLeft size={16} aria-hidden="true"/> Projects</Link>
      <div className={styles.introGrid}>
        <div><p className={styles.discipline}>Independent project · 2026</p><h1>Tosker</h1><p className={styles.headline}>A shared map for<br/>going together.</p></div>
        <div className={styles.introCopy}><p>Trips with friends gave me a question I couldn’t put down: what would a map look like if the group was the starting point?</p><p>I designed and built Tosker to bring places, plans and conversations into the same shared space.</p><a className={styles.jump} href="#product">Explore the product <ArrowDown size={16} aria-hidden="true"/></a></div>
      </div>
      <dl className={styles.metadata}><div><dt>My role</dt><dd>Founder, brand & product designer<br/>AI-assisted development</dd></div><div><dt>Scope</dt><dd>Identity, UX, interface<br/>Full-stack web application</dd></div><div><dt>Checkpoint</dt><dd>Personal beta<br/>Development paused, November 2026</dd></div></dl>
    </header>

    <div className={`${styles.identityScene} shell`} aria-label="Tosker brand identity">
      <div className={styles.identityOrbit} aria-hidden="true"><i/><i/><i/></div>
      <Image src={`${root}/wordmark.svg`} alt="Tosker original identity: a faceted gold squirrel beside an ivory serif wordmark" width={900} height={260} priority className={styles.wordmark}/>
      <p>Places to go. People to go with.</p>
    </div>

    <section className={`${styles.story} shell`} aria-labelledby="origin-title">
      <div><p className={styles.sectionLabel}>The personal starting point</p><h2 id="origin-title">The route was easy.<br/>The together part wasn’t.</h2></div>
      <div className={styles.prose}><p>I travel a lot with friends. We could find directions in Google Maps or Waze, but the way we used those tools never quite fit how we planned and moved as a group.</p><p>Choosing the next stop, keeping a shared plan and knowing what everyone meant still felt like separate jobs. I wanted a place where the map and the conversation could stay together.</p><p>That became Tosker. Group movement was the ambition. Collaborative planning became the foundation I could build, test and refine first.</p></div>
    </section>

    <section className={`${styles.product} shell`} id="product" aria-labelledby="product-title">
      <div className={styles.sectionIntro}><p className={styles.sectionLabel}>The working product</p><h2 id="product-title">Let the place hold<br/>the conversation.</h2><p>The Map is the workspace. Chat and Board come alongside when needed, while the route and its places stay in context.</p></div>
      <ToskerScenes />
      <div className={styles.surfaceNotes}>
        <div><MapPin aria-hidden="true"/><h3>Map</h3><p>Find a place, preview it and explicitly add it. Arrange stops into routes and keep saved places beyond a single itinerary.</p></div>
        <div><MessagesSquare aria-hidden="true"/><h3>Chat</h3><p>Discuss the trip beside the Map. Opening, closing or switching panels preserves the conversation and the draft.</p></div>
        <div><NotebookPen aria-hidden="true"/><h3>Board</h3><p>Keep plans and notes that need to outlast the chat stream in a shared companion panel.</p></div>
      </div>
    </section>

    <section className={`${styles.brandSection} shell`} aria-labelledby="brand-title">
      <div className={styles.brandSpecimen}><Image src={`${root}/squirrel.svg`} alt="The angular Tosker squirrel symbol, with an upright folded tail" width={480} height={480} sizes="(max-width: 800px) 70vw, 420px"/><span>Ratatoskr → Tosker</span></div>
      <div className={styles.prose}><p className={styles.sectionLabel}>A name with somewhere to go</p><h2 id="brand-title">A small connector<br/>between worlds.</h2><p>Tosker is shortened from Ratatoskr, the squirrel that travels along Yggdrasil, the world tree in Norse mythology, carrying messages between its inhabitants.</p><p>I took that movement between worlds as a metaphor for connection: between people, between places, and between an idea for a trip and actually going together.</p><p>The faceted squirrel gives the identity a compact, recognisable silhouette. Warm gold and an expressive serif wordmark bring character to the dark interface; the restrained geometry carries through to pins and rounded panels.</p><p className={styles.sourceNote}>The myth’s messenger is mischievous. The idea of a helpful connector is Tosker’s interpretation. <a href="https://www2.hf.uio.no/polyglotta/index.php?cid=672843&level=2&mid=&page=fulltext&vid=866&view=fulltext" target="_blank" rel="noopener noreferrer">Source: Gylfaginning, XVI.</a></p></div>
      <div className={styles.palette} aria-label="Tosker colour palette">{[["Night","#080D10"],["Ivory","#F4EFE6"],["Gold","#C89C5D"],["Pink","#FF4F91"]].map(([name,colour])=><div key={name}><i style={{backgroundColor:colour}}/><span>{name}<small>{colour}</small></span></div>)}</div>
    </section>

    <section className={`${styles.memory} shell`} aria-labelledby="memory-title">
      <div className={styles.sectionIntro}><p className={styles.sectionLabel}>Designing what stays</p><h2 id="memory-title">A place is bigger<br/>than one itinerary.</h2><p>A saved Map Pin and a Route Location have different jobs. A pin remembers the place. A Location Card belongs to a particular route. Adding a pin to a route creates a new card; removing either doesn’t erase the other.</p></div>
      <div className={styles.pinStates} aria-label="Four Map Pin states">{[[Heart,"Favourite"],[Flag,"Want to go"],[Check,"Been here"],[Bookmark,"Saved"]].map(([Icon,label])=>{const StateIcon=Icon as typeof Heart;return <div key={label as string}><StateIcon size={26} aria-hidden="true"/><span>{label as string}</span></div>;})}</div>
      <p className={styles.smallNote}>Map Pin states, shown here as an editorial summary of the implemented model.</p>
      <div className={styles.decisions}><div><h3>Private visibility, shared decisions.</h3><p>Hide affects my Map. Skip affects the shared route. Keeping those actions separate makes the consequence clearer to everyone.</p></div><div><h3>Deleting should feel different.</h3><p>“Nuke” names the place, explains who is affected and asks for confirmation. Its red treatment separates a permanent action from everyday edits.</p></div></div>
      <figure className={styles.confirmation}><a href={`${root}/remove-confirmation.png`} target="_blank" rel="noopener noreferrer" aria-label="Open removal confirmation screenshot (new tab)"><Image src={`${root}/remove-confirmation.png`} alt="Tosker Nuke confirmation explicitly naming the synthetic place, preserving other routes and independent Map Pins, with a red Nuke place button" width={1440} height={1000} sizes="(max-width:800px) calc(100vw - 40px), 900px"/></a><figcaption>Actual confirmation from the isolated review build. Permanent actions explain their scope before they execute.</figcaption></figure>
    </section>

    <section className={`${styles.mobileSection} shell`} aria-labelledby="mobile-title">
      <div className={styles.sectionIntro}><p className={styles.sectionLabel}>The details that earn trust</p><h2 id="mobile-title">Together, by choice.</h2><p>Location is useful—and personal. Locate starts with a private view. Sharing requires a clear audience and an explicit choice: broad area, precise position, or Keep private.</p></div>
      <div className={styles.phones}>
        <PhoneCapture file="mobile-map.png" width={390} height={844} title="The trip on a smaller screen" alt="Tosker phone-sized Map workspace showing synthetic route cards, search and compact controls" caption="The same Map, search and route hierarchy at 390 pixels, with companion panels within reach."/>
        <PhoneCapture file="location-consent.png" width={320} height={900} title="Consent before coordinates" alt="Tosker location consent with broad area selected by default, a separate precise option and Keep private" caption="The FP3 consent flow retained into FP4: one manual snapshot, up to five minutes, with a separate choice for precise sharing."/>
        <PhoneCapture file="card-actions.png" width={390} height={900} title="A smaller set of actions" alt="Eight Tosker Location Card actions with visible keyboard focus and red Nuke action" caption="Eight purposeful actions with a distinct destructive choice. This isolated interaction test uses an offline basemap."/>
      </div>
      <div className={styles.privacyNote}><h3>Sharing has an end.</h3><p>Stop Sharing, expiry and loss of access remove the shared view. There is no continuous or background tracking in this version. Temporary server state has a deletion workflow; database recovery retention is disclosed separately, rather than described as instant erasure everywhere.</p></div>
    </section>

    <section className={`${styles.buildSection} shell`} aria-labelledby="build-title">
      <div><p className={styles.sectionLabel}>From design to a working beta</p><h2 id="build-title">The interface was only<br/>half the work.</h2></div>
      <div className={styles.prose}><p>I worked across the identity, interaction model and implementation, using AI-assisted development to turn the product decisions into a working application.</p><p>The foundation uses Next.js and TypeScript, MapLibre for rendering, Geoapify behind a replaceable provider boundary, Clerk for identity, Neon for persistence and Ably for realtime updates.</p><p>Separate test accounts exercised shared state and access boundaries. Responsive checks, reconnect behaviour, consent expiry and deletion checks became part of release acceptance—not just the appearance of a successful screen.</p><p>The most important lesson: a shared map needs to explain ownership as carefully as it explains geography. People need to know what is theirs, what changes for the group and what disappears when they leave.</p></div>
    </section>

    <section className={`${styles.ending} shell`} aria-labelledby="pause-title"><p className={styles.sectionLabel}>A deliberate pause</p><h2 id="pause-title">The next trip can wait.</h2><p>In November 2026, I paused Tosker to settle into work. This case study preserves the brand, the working beta and the decisions behind it.</p><p>The completed foundation brings shared planning, conversation and optional location snapshots together. Continuous group movement and voice/video remain future directions. The beta is a personal development project, not a finished navigation service.</p><div className={styles.archiveStatus}><span>Archived here for review</span><span>Last product release: October 2026</span></div><Link className={styles.back} href="/#projects"><ArrowLeft size={16} aria-hidden="true"/> Back to projects</Link></section>
    <aside className={`${styles.evidenceNote} shell`}>Product scenes are authentic development captures with synthetic review content. QA labels are retained; offline layout tests are identified in their captions. Map imagery: Geoapify, OpenMapTiles and OpenStreetMap contributors.</aside>
  </main>;
}
