import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { Reveal } from "./motion";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Reveal><Link className="project" href={`/work/${project.slug}`}><div className="project-media"><Image src={project.cover} alt={`${project.title} project`} fill sizes="(max-width: 800px) 100vw, 60vw" /></div><div className="project-body"><div><span className="project-index">{String(index + 1).padStart(2, "0")} / {project.year}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="tags">{project.role.split("|").map((tag) => <span className="tag" key={tag}>{tag.trim()}</span>)}</div></div><span className="button project-cta">View case study <ArrowUpRight size={15} /></span></div></Link></Reveal>;
}
