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
  en: { caseStudy: "Case Study", visitSite: "Visit Site", comingSoon: "Coming Soon" },
  zh: { caseStudy: "案例研究", visitSite: "访问网站", comingSoon: "即将推出" },
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
      {project.caseStudyUrl ? <Link className={`live-project-media ${project.mediaFit}`} href={project.caseStudyUrl} aria-label={`${text.caseStudy}: ${project.name}`}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 50vw, 420px" />
      </Link> : <div className={`live-project-media ${project.mediaFit}`}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 50vw, 420px" />
      </div>}
      <div className="live-project-copy">
        {project.category ? <span className="live-project-category">{project.category}</span> : null}
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        {project.caseStudyUrl ? <div className="live-project-actions">
          <Link href={project.caseStudyUrl}>{text.caseStudy}<ArrowRight size={15} aria-hidden="true" /></Link>
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{text.visitSite}<ArrowUpRight size={15} aria-hidden="true" /></a> : <button type="button" disabled className="project-visit-disabled" aria-label={`${text.visitSite} — ${text.comingSoon}`}>{text.visitSite}<span>{text.comingSoon}</span></button>}
        </div> : <span className="live-project-status">{text.comingSoon}</span>}
      </div>
    </article>)}</div>
  </section>;
}
