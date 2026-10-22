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
  function place(index: number, choice: Tool = tool) {
    const destructive = ["Fire", "Pollution", "Hazard"].includes(choice);
    setWorld(current => current.map((patch, i) => i === index ? {
      growth: destructive ? 0 : Math.min(3, patch.growth + (choice === "Sunlight" ? 0 : 1)),
      effect: choice,
    } : patch));
    setNotice(`Patch ${index + 1}: ${responses[choice]}`);
    setDragging(false);
  }
  return <div className="terrarium">
    <header><div><strong>Pangea</strong><span>Phings / digital terrarium</span></div><button onClick={() => { setWorld(initialWorld()); setNotice("World reset. Choose an element to begin again."); }}><RotateCcw size={14}/> Reset world</button></header>
    <div className="terrarium-layout">
      <div className={`terrarium-world ${dragging ? "is-dragging" : ""}`}>
        <Image src="/projects/pangea/world-concept.webp" alt="Pangea concept landscape with forest and a river" fill sizes="(max-width: 800px) 100vw, 900px"/>
        <span className="terrarium-label">The clearing</span>
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
      </div>
      <aside>
        <div className="terrarium-modes" role="group" aria-label="Terrarium interaction mode">{(["Grow", "Destroy"] as const).map(item => <button key={item} aria-pressed={mode === item} onClick={() => { setMode(item); setTool(item === "Grow" ? "Plant" : "Fire"); }}>{item}</button>)}</div>
        <h3>{mode === "Grow" ? "Help it grow." : "Change its course."}</h3>
        <p>{mode === "Grow" ? "Add something the world can use." : "See how disruption changes the ground."}</p>
        <div className="terrarium-tools" role="group" aria-label={`${mode} elements`}>{tools.filter(item => item.mode === mode).map(({ name, icon: Icon }) =>
          <button key={name} draggable aria-pressed={tool === name} onClick={() => setTool(name)}
            onDragStart={event => { setTool(name); setDragging(true); event.dataTransfer.setData("application/x-phings-tool", name); event.dataTransfer.effectAllowed = "copy"; }} onDragEnd={() => setDragging(false)}>
            <Icon size={21}/><span>{name}</span>
          </button>)}</div>
        <p className="terrarium-help">Drag an element onto the clearing, or select it and tap a patch. Keyboard: Tab to a patch and press Enter.</p>
        <p className="terrarium-notice" role="status">{notice}</p>
      </aside>
    </div>
    <footer>Speculative game interface. Changes stay in this page and reset on reload.</footer>
  </div>;
}
