import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";
import { projectEditorial } from "@/lib/project-editorial";

export const dynamicParams = false;
export function generateStaticParams() { return getProjects().map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); if (!project) return {}; return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, images: [project.cover] }, twitter: { card: "summary_large_image", images: [project.cover] } }; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getProject(slug); if (!project) notFound();
  const projects = getProjects(); const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]; const next = projects[(index + 1) % projects.length];
  const beats = projectEditorial[slug];
  if (!beats || beats.length !== project.gallery.length) throw new Error(`Editorial sequence does not match gallery for ${slug}`);
  return <main className="editorial-case"><header className="case-opening shell"><Link className="back" href="/#portfolio"><ArrowLeft size={15} /> Portfolio</Link><span className="eyebrow">{project.category} · {project.year}</span><h1>{project.title}</h1><div className="case-intro"><p>{project.summary}</p><p><strong>Role</strong><br />{project.role}</p></div></header><figure className="case-lead shell"><Image src={project.cover} alt={`${project.title} overview`} fill priority sizes="(max-width:1320px) calc(100vw - 40px), 1280px" /></figure><section className="editorial-sequence shell">{project.gallery.map((src, imageIndex) => { const beat = beats[imageIndex]; const layout = beat.layout || (imageIndex % 3 === 1 ? "right" : imageIndex % 3 === 2 ? "wide" : "left"); return <article className={`editorial-beat ${layout}`} key={src}><figure><Image src={src} alt={`${project.title}: ${beat.title}`} fill sizes={layout === "wide" ? "(max-width:1320px) calc(100vw - 40px), 1280px" : "(max-width:800px) calc(100vw - 40px), 800px"} /></figure><div><span>{String(imageIndex + 1).padStart(2, "0")}</span><h2>{beat.title}</h2><p>{beat.copy}</p></div></article>; })}</section><nav className="case-ending shell" aria-label="Project navigation"><Link href={`/work/${previous.slug}`}><ArrowLeft size={17} /><span><small>Previous project</small>{previous.title}</span></Link><Link className="portfolio-return" href="/#portfolio">Portfolio</Link><Link href={`/work/${next.slug}`}><span><small>Next project</small>{next.title}</span><ArrowRight size={17} /></Link></nav></main>;
}
