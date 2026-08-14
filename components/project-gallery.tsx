"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

const ratios = ["cinematic", "portrait", "square", "tall", "landscape", "portrait"];

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const { locale } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const archive = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const close = useCallback(() => setSelected(null), []);
  const step = useCallback((direction: number) => setSelected((current) => current === null ? 0 : (current + direction + projects.length) % projects.length), [projects.length]);

  useEffect(() => {
    document.body.style.overflow = selected === null ? "" : "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (selected === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [close, selected, step]);

  const project = selected === null ? null : projects[selected];
  return <>
    <div ref={archive} className={`portfolio-archive ${expanded ? "expanded" : "curated"}`}><div className="masonry" role="list">
      {projects.map((item, index) => <motion.button className={`gallery-item ${ratios[index % ratios.length]} ${item.featured ? "featured" : ""}`} key={item.slug} onClick={() => setSelected(index)} layoutId={reduced ? undefined : `project-${item.slug}`} whileHover={reduced ? undefined : { y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} role="listitem" aria-label={`Open ${item.title}`}>
        <Image src={item.cover} alt={`${item.title} project cover`} fill sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" />
        <span className="gallery-caption"><strong>{item.title}</strong><small>{item.category} · {item.year}</small></span>
      </motion.button>)}
    </div><div className="archive-smoke" aria-hidden="true" /></div><button className="archive-toggle" type="button" aria-expanded={expanded} onClick={() => { setExpanded((value) => !value); if (expanded) requestAnimationFrame(() => archive.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" })); }}>{expanded ? ui.portfolio.hideAll[locale] : ui.portfolio.showAll[locale]}</button>
    <AnimatePresence>
      {project && <motion.div className="project-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }} role="dialog" aria-modal="true" aria-label={`${project.title} project details`}>
        <button className="overlay-backdrop" onClick={close} aria-label="Close project" />
        <motion.article className="overlay-canvas" layoutId={reduced ? undefined : `project-${project.slug}`} transition={{ type: "spring", stiffness: 220, damping: 30 }}>
          <header className="overlay-toolbar"><span>{String(selected! + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><button onClick={close} aria-label="Close project"><X /></button></header>
          <div className="overlay-hero"><Image src={project.cover} alt={`${project.title} expanded view`} fill priority sizes="90vw" /></div>
          <div className="overlay-copy"><div><span className="eyebrow">{project.category} · {project.year}</span><h2>{project.title}</h2></div><div><p>{project.summary}</p><p className="overlay-role">{project.role}</p><Link href={`/work/${project.slug}`} className="button">Open case study <ArrowUpRight size={15} /></Link></div></div>
          {project.gallery.length > 0 && <div className="overlay-gallery">{project.gallery.slice(0, 3).map((src, imageIndex) => <figure key={src}><Image src={src} alt={`${project.title} detail ${imageIndex + 1}`} fill sizes="45vw" /></figure>)}</div>}
          <nav className="overlay-nav" aria-label="Browse projects"><button onClick={() => step(-1)}><ArrowLeft size={17} /> Previous</button><button onClick={() => step(1)}>Next <ArrowRight size={17} /></button></nav>
        </motion.article>
      </motion.div>}
    </AnimatePresence>
  </>;
}
