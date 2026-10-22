"use client";

import Image from "next/image";
import { useState } from "react";
import { CloudFog, Droplets, Flame, Leaf, Mountain, RotateCcw, Sprout, Sun, Trees } from "lucide-react";

const tools = [
  { name: "Plant", mode: "Grow", icon: Sprout },
  { name: "Water", mode: "Grow", icon: Droplets },
  { name: "Sunlight", mode: "Grow", icon: Sun },
  { name: "Nutrients", mode: "Grow", icon: Leaf },
  { name: "Fire", mode: "Destroy", icon: Flame },
  { name: "Pollution", mode: "Destroy", icon: CloudFog },
  { name: "Hazard", mode: "Destroy", icon: Mountain },
] as const;
type Tool = typeof tools[number]["name"];
type Patch = { growth: number; effect: Tool | null };
const initialWorld = (): Patch[] => Array.from({ length: 12 }, (_, i) => ({ growth: [1, 5, 8].includes(i) ? 1 : 0, effect: null }));
const responses: Record<Tool, string> = {
  Plant: "A new plant takes root.", Water: "The ground is watered and new growth appears.",
  Sunlight: "Warm light reaches this patch.", Nutrients: "The plants grow fuller.",
  Fire: "Fire leaves scorched ground.", Pollution: "Pollution clouds the patch.", Hazard: "Rubble covers the damaged ground.",
};

/** Deliberately scripted, session-local visual study; no simulation or persistence. */
export function PhingsStudy() {
  const [mode, setMode] = useState<"Grow" | "Destroy">("Grow");
  const [tool, setTool] = useState<Tool>("Plant");
  const [world, setWorld] = useState(initialWorld);
  const [notice, setNotice] = useState("Select an element, then choose a patch of ground.");
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState<"World" | "Compare" | "Inhabitants">("World");
  const [destroyed, setDestroyed] = useState(false);
  function restore() { setWorld(initialWorld()); setDestroyed(false); setMode("Grow"); setTool("Plant"); setNotice("World restored. The Phings can return."); }
  function place(index: number, choice: Tool = tool) {
    const destructive = ["Fire", "Pollution", "Hazard"].includes(choice);
    setDestroyed(destructive);
    setWorld(current => current.map((patch, i) => i === index ? {
      growth: destructive ? 0 : Math.min(3, patch.growth + (choice === "Sunlight" ? 0 : 1)),
      effect: choice,
    } : patch));
    setNotice(destructive ? `${choice} has darkened the world. Restore the world or use a Grow element to bring it back.` : `Patch ${index + 1}: ${responses[choice]}`);
    setDragging(false);
  }
  return <div className="terrarium">
    <header><div><strong>Pangea</strong><span>A small world, inhabited by Phings</span></div><button onClick={restore}><RotateCcw size={14}/> Restore world</button></header>
    <div className="pangea-views" role="group" aria-label="Pangea views">{(["World","Compare","Inhabitants"] as const).map(name=><button key={name} aria-pressed={view===name} onClick={()=>{setView(name);if(name==="Compare"){setDestroyed(true);setNotice("Compare a living world with the blacked-out destruction state. Restore to try another direction.");}}}>{name}</button>)}</div>
    <div className="terrarium-layout">
      <div className={`pangea-stage ${view==="Compare"?"is-comparing":""}`}>
      {view==="Compare" && <div className="terrarium-world pangea-reference"><Image src="/projects/pangea/world-concept.webp" alt="Living Pangea landscape before disruption" fill sizes="(max-width: 800px) 100vw, 450px"/><span className="terrarium-label">Before / living world</span><span className="terrarium-world-caption">Reference state</span></div>}
      {view==="Inhabitants" ? <div className="pangea-inhabitants"><span>The inhabitants</span><h3>Meet the Phings.</h3><p>Small forms that belong to the world, not a menu of tasks.</p><Image src="/content/projects/phings/characters.webp" alt="Three Phing inhabitants in cream, moss and clay" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 900px"/><p className="pangea-character-note">Character concept art · not a final roster</p></div> : <div className={`terrarium-world ${dragging ? "is-dragging" : ""} ${destroyed?"is-destroyed":""}`}>
        <Image src="/projects/pangea/world-concept.webp" alt="Pangea concept landscape with forest and a river" fill sizes="(max-width: 800px) 100vw, 900px"/>
        <span className="terrarium-label">{view==="Compare"?"After / your intervention":"The clearing"}</span>
        {destroyed && <div className="pangea-blackout"><Flame size={26}/><strong>The world has gone dark.</strong><span>Growth and inhabitants are no longer visible.</span></div>}
        <div className="terrarium-patches" role="group" aria-label="Terrarium placement patches">
          {world.map((patch, index) => {
            const Effect = tools.find(item => item.name === patch.effect)?.icon;
            const state = patch.effect?.toLowerCase() || "untouched";
            return <button key={index} className={`terrarium-patch effect-${state}`} aria-label={`Patch ${index + 1}, ${patch.growth ? "planted" : "open ground"}${patch.effect ? ", " + patch.effect.toLowerCase() : ""}. Apply ${tool.toLowerCase()}`}
              onClick={() => place(index)}
              onDragOver={event => { if (event.dataTransfer.types.includes("application/x-phings-tool")) { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; } }}
              onDrop={event => { event.preventDefault(); const choice = tools.find(item => item.name === event.dataTransfer.getData("application/x-phings-tool")); if (choice) place(index, choice.name); }}>
              <span className="terrarium-ground" aria-hidden="true"/>
              {patch.growth > 0 && <span className={`terrarium-plant growth-${patch.growth}`} aria-hidden="true"><Trees/><Sprout/></span>}
              {Effect && <span className="terrarium-effect" aria-hidden="true"><Effect/></span>}
              <span className="terrarium-target" aria-hidden="true">+</span>
            </button>;
          })}
        </div>
        <span className="terrarium-world-caption">Interactive concept · scripted visual responses</span>
      </div>}
      </div>
      <aside>
        {view==="Inhabitants" ? <div className="pangea-field-notes"><span className="study-kicker">Pangea / Phings</span><h3>A world and its inhabitants.</h3><p>Pangea is the environment. Phings are the small creatures that live within it.</p><p>Their simple forms leave room for behaviour and character to develop through play.</p><button onClick={()=>setView("World")}>Return to the world</button></div> : <>
        <div className="terrarium-modes" role="group" aria-label="Terrarium interaction mode">{(["Grow", "Destroy"] as const).map(item => <button key={item} aria-pressed={mode === item} onClick={() => { setMode(item); setTool(item === "Grow" ? "Plant" : "Fire"); }}>{item}</button>)}</div>
        <h3>{mode === "Grow" ? "Help it grow." : "Change its course."}</h3>
        <p>{mode === "Grow" ? "Add something the world can use." : "See how disruption changes the ground."}</p>
        <div className="terrarium-tools" role="group" aria-label={`${mode} elements`}>{tools.filter(item => item.mode === mode).map(({ name, icon: Icon }) =>
          <button key={name} draggable aria-pressed={tool === name} onClick={() => setTool(name)}
            onDragStart={event => { setTool(name); setDragging(true); event.dataTransfer.setData("application/x-phings-tool", name); event.dataTransfer.effectAllowed = "copy"; }} onDragEnd={() => setDragging(false)}>
            <Icon size={21}/><span>{name}</span>
          </button>)}</div>
        {destroyed && <button className="pangea-restore" onClick={restore}><RotateCcw size={16}/> Bring the world back</button>}
        <p className="terrarium-help">Drag an element onto the clearing, or select it and tap a patch. Keyboard: Tab to a patch and press Enter. Destruction blacks out the world; it never removes your controls.</p>
        <p className="terrarium-notice" role="status">{notice}</p>
        </>}
      </aside>
    </div>
    <footer>Speculative game interface. Changes stay in this page and reset on reload.</footer>
  </div>;
}
