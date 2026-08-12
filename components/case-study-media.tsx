"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "@/lib/content";
import type { EditorialBeat } from "@/lib/project-editorial";

export function CaseStudyMedia({ project, beats }: { project: Project; beats: EditorialBeat[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); if (event.key === "Tab") { event.preventDefault(); closeButton.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); trigger.current?.focus(); };
  }, [active]);

  const open = (index: number, node: HTMLButtonElement) => { trigger.current = node; setActive(index); };
  const image = active === null ? null : active === -1 ? project.cover : project.gallery[active];
  const beat = active === null ? null : active === -1 ? { title: `${project.title} overview`, copy: project.summary } : beats[active];

  const lead = <button className="case-lead shell case-image-button" onClick={(event) => open(-1, event.currentTarget)} aria-label={`Enlarge ${project.title} overview`}><Image src={project.cover} alt={`${project.title} overview`} fill priority sizes="(max-width:1480px) calc(100vw - 40px), 1440px" /></button>;

  if (project.slug === "beyond") return <>{lead}
    <section className="editorial-sequence shell beyond-sequence">
      <article className="editorial-beat poster-system">
        <div className="poster-pair">{project.gallery.map((src, index) => <button key={src} className="case-image-button poster" onClick={(event) => open(index, event.currentTarget)} aria-label={`Enlarge ${beats[index].title}`}><Image src={src} alt={`${project.title}: ${beats[index].title}`} fill sizes="(max-width:800px) calc(100vw - 40px), 46vw" /></button>)}</div>
        <div><span>01—02</span><h2>Dining beyond Earth</h2><p>The paired posters frame commercial space dining as both an emerging service category and a designed luxury experience. Together they use a shared dark field, orbital imagery and editorial hierarchy to connect research-led context with a speculative vision of the journey, while keeping the proposition grounded in the visible project material.</p></div>
      </article>
    </section>
    {image && beat && <Lightbox src={image} title={beat.title} description={beat.copy} close={() => setActive(null)} closeButton={closeButton} />}
  </>;

  return <>{lead}
    <section className="editorial-sequence shell">{project.gallery.map((src, imageIndex) => { const item = beats[imageIndex]; const informationDense = ["rebranding-extensions", "synthesizing-brands", "visual-literacy", "sia-landing-page"].includes(project.slug); const layout = informationDense ? "wide" : item.layout || (imageIndex % 3 === 1 ? "right" : imageIndex % 3 === 2 ? "wide" : "left"); return <article className={`editorial-beat ${layout}`} key={src}><button className="case-image-button" onClick={(event) => open(imageIndex, event.currentTarget)} aria-label={`Enlarge ${item.title}`}><Image src={src} alt={`${project.title}: ${item.title}`} fill sizes={layout === "wide" ? "(max-width:1480px) calc(100vw - 40px), 1440px" : "(max-width:800px) calc(100vw - 40px), (max-width:1480px) 62vw, 920px"} /></button><div><span>{String(imageIndex + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.copy}</p></div></article>; })}</section>
    {image && beat && <Lightbox src={image} title={beat.title} description={beat.copy} close={() => setActive(null)} closeButton={closeButton} />}
  </>;
}

function Lightbox({ src, title, description, close, closeButton }: { src: string; title: string; description: string; close: () => void; closeButton: React.RefObject<HTMLButtonElement | null> }) {
  return <div className="image-lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title"><button className="lightbox-backdrop" onClick={close} aria-label="Close image preview" /><div className="lightbox-content"><button ref={closeButton} className="lightbox-close" onClick={close} aria-label="Close image preview"><X size={20} /></button><div className="lightbox-image"><Image src={src} alt={title} fill priority sizes="96vw" /></div><div className="lightbox-caption"><h2 id="lightbox-title">{title}</h2><p>{description}</p></div></div></div>;
}
