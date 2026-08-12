import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return <section className="section shell" id={id}><Reveal className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</Reveal>{children}</section>;
}
