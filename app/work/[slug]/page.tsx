import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";
import { projectEditorial } from "@/lib/project-editorial";
import { CaseStudyMedia } from "@/components/case-study-media";

export const dynamicParams = false;
export function generateStaticParams() { return getProjects().map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); if (!project) return {}; return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, images: [project.cover] }, twitter: { card: "summary_large_image", images: [project.cover] } }; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getProject(slug); if (!project) notFound();
  const projects = getProjects(); const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]; const next = projects[(index + 1) % projects.length];
  const beats = projectEditorial[slug];
  if (!beats || beats.length !== project.gallery.length) throw new Error(`Editorial sequence does not match gallery for ${slug}`);
  const context = project.body.replace(/^##\s+[^\n]+\n+/, "").trim();
  return <main className="editorial-case"><header className="case-opening shell"><Link className="back" href="/#portfolio"><ArrowLeft size={15} /> Portfolio</Link><span className="eyebrow">{project.category} · {project.year}</span><h1>{project.title}</h1><div className="case-intro"><div><p>{project.summary}</p>{context && <p className="case-context">{context}</p>}</div><p><strong>Role</strong><br />{project.role}</p></div></header><CaseStudyMedia project={project} beats={beats} /><nav className="case-ending shell" aria-label="Project navigation"><Link href={`/work/${previous.slug}`}><ArrowLeft size={17} /><span><small>Previous project</small>{previous.title}</span></Link><Link className="portfolio-return" href="/#portfolio">Portfolio</Link><Link href={`/work/${next.slug}`}><span><small>Next project</small>{next.title}</span><ArrowRight size={17} /></Link></nav></main>;
}
