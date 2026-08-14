"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { builtProjects, type BuiltProject } from "@/lib/built-projects";
import { EditorialHeading } from "./editorial-heading";

function ProjectVisual({ project, expanded = false }: { project: BuiltProject; expanded?: boolean }) {
  if (project.media[0]) return <Image src={project.media[0]} alt={`${project.title} preview`} fill sizes={expanded ? "90vw" : "(max-width:800px) 100vw, 33vw"} />;
  return <div className={`development-placeholder ${project.status}`} aria-label={`${project.title} development placeholder`}><Code2 aria-hidden="true" /><span>{project.status === "coming-soon" ? "COMING SOON" : "ACTIVE BUILD"}</span><i /></div>;
}

export function ProjectsPreview() {
  const [selected, setSelected] = useState<BuiltProject | null>(null);
  const reduced = useReducedMotion();
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [close, selected]);

  return <main className="projects-preview shell">
    <header><span className="eyebrow">Founder preview · Noindex</span><EditorialHeading before="Things I’m" emphasis="building." /><p>This development surface prepares the future Projects system. It is deliberately absent from production navigation.</p></header>
    <div className="built-project-grid">{builtProjects.map((project, index) => <motion.article className="built-project-card" key={project.slug} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: index * .06 }}>
      <button type="button" className="built-project-open" onClick={() => setSelected(project)} aria-label={`Preview ${project.title}`}><div className="built-project-media"><ProjectVisual project={project} /></div><div className="built-project-copy"><div className="built-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>{project.title}</h2><p>{project.descriptor}</p><small>{project.status === "coming-soon" ? "Reserved for future release" : "Open preview"}</small></div></button>
      {project.liveUrl ? <a className="built-project-live" href={project.liveUrl} target="_blank" rel="noreferrer">Open Live Site <ArrowUpRight size={14} /></a> : null}
    </motion.article>)}</div>
    <AnimatePresence>{selected ? <motion.div className="built-project-dialog" role="dialog" aria-modal="true" aria-label={`${selected.title} project preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="built-project-backdrop" onClick={close} aria-label="Close project preview" /><motion.article className="built-project-panel" initial={reduced ? false : { y: 24, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: .99 }}><button className="built-project-close" onClick={close} aria-label="Close project preview"><X /></button><div className="built-project-panel-media"><ProjectVisual project={selected} expanded /></div><div className="built-project-panel-copy"><div className="built-project-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>{selected.title}</h2><p>{selected.summary || selected.descriptor}</p>{selected.details ? <ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}{selected.media.slice(1).length ? <div className="built-project-panel-gallery">{selected.media.slice(1).map((src) => <figure key={src}><Image src={src} alt={`${selected.title} supporting visual`} fill sizes="(max-width:900px) 90vw, 36vw" /></figure>)}</div> : null}{selected.sourceNote ? <small>{selected.sourceNote}</small> : null}<div className="actions">{selected.caseStudyUrl ? <a className="button" href={selected.caseStudyUrl}>View Case Study</a> : null}{selected.liveUrl ? <a className="button primary" href={selected.liveUrl} target="_blank" rel="noreferrer">Open Live Site <ArrowUpRight size={14} /></a> : null}</div></div></motion.article></motion.div> : null}</AnimatePresence>
  </main>;
}
