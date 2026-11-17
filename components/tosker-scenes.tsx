"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "@/app/projects/tosker/tosker.module.css";

const scenes = [
  { name: "Plan on the Map", file: "map-workspace.png", width: 1440, height: 1000, alt: "Tosker Map-first desktop with a three-stop synthetic Marina route and Location Cards", caption: "The Map stays in view. Route tabs, Location Cards and search sit over it. Actual FP4 review capture with synthetic participants and places." },
  { name: "Read the route", file: "drive-route.png", width: 1440, height: 1000, alt: "Tosker Drive route through Singapore with gold road geometry, leg distances and estimated journey times", caption: "Drive mode adds road geometry and leg estimates. Walking and driving support remain region- and provider-dependent; this is a planning tool, not turn-by-turn navigation." },
  { name: "Keep Chat alongside", file: "chat-composition.png", width: 1728, height: 1100, alt: "Tosker desktop layout with a compact Chat companion beside the Map and route tray", caption: "Chat opens beside the trip without replacing it. This layout-test capture deliberately uses an offline basemap; the visible draft and accounts are synthetic QA content." },
];

export function ToskerScenes() {
  const [selected, setSelected] = useState(0);
  const scene = scenes[selected];
  return <div className={styles.scenes}>
    <div className={styles.sceneControls} role="group" aria-label="Choose a Tosker screenshot">
      {scenes.map((item, index) => <button key={item.file} type="button" aria-pressed={selected === index} aria-controls="tosker-scene" onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <figure id="tosker-scene" className={styles.capture}>
      <a href={`/projects/tosker/${scene.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${scene.name} (new tab)`}>
        <Image src={`/projects/tosker/${scene.file}`} width={scene.width} height={scene.height} alt={scene.alt} sizes="(max-width: 1480px) calc(100vw - 40px), 1280px" />
      </a>
      <figcaption aria-live="polite">{scene.caption}<span>Open the image to inspect it at full size.</span></figcaption>
    </figure>
  </div>;
}
