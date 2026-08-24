"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getVisibleLiveProjects } from "@/lib/live-projects";
import { ui } from "@/lib/i18n";
import { EditorialHeading } from "./editorial-heading";
import { Reveal } from "./motion";
import { useLanguage } from "./language-provider";

const copy = {
  en: { caseStudy: "Case Study", visitSite: "Visit Site" },
  zh: { caseStudy: "案例研究", visitSite: "访问网站" },
};

export function LiveProjectsSection() {
  const { locale } = useLanguage();
  const text = copy[locale];
  const projects = getVisibleLiveProjects();

  return <section className="live-projects-section shell" id="projects">
    <Reveal className="portfolio-reveal portfolio-chapter-heading">
      <EditorialHeading eyebrow={ui.projects.eyebrow[locale]} before={ui.projects.titleBefore[locale]} emphasis={ui.projects.titleEmphasis[locale]} />
      <p>{ui.projects.description[locale]}</p>
    </Reveal>
    <div className="live-project-list">{projects.map((project) => <article className="live-project-card" key={project.slug}>
      <Link className="live-project-media" href={project.caseStudyUrl} aria-label={`${text.caseStudy}: ${project.name}`}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 680px) calc(100vw - 40px), 520px" />
      </Link>
      <div className="live-project-copy">
        <h2>{project.name}</h2>
        <div className="live-project-actions">
          <Link href={project.caseStudyUrl}>{text.caseStudy}<ArrowRight size={16} aria-hidden="true" /></Link>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{text.visitSite}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </article>)}</div>
  </section>;
}
