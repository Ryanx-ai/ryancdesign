import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";

export const dynamicParams = false;
export function generateStaticParams() { return getProjects().map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); if (!project) return {}; return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, images: [project.cover] }, twitter: { card: "summary_large_image", images: [project.cover] } }; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = getProjects().filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 2);
  const blocks = project.body.split(/\n\n+/);
  return <main><header className="case-hero shell"><Link className="back" href="/#work"><ArrowLeft size={15} /> Selected work</Link><span className="eyebrow case-eyebrow">{project.category}</span><h1>{project.title}</h1><div className="case-meta"><p>{project.summary}</p><p><strong>Role</strong><br />{project.role}</p><p><strong>Year</strong><br />{project.year}<br /><br />{project.readingTime} min read</p></div></header><div className="case-cover shell"><Image src={project.cover} alt={`${project.title} hero`} fill priority sizes="100vw" /></div><section className="section case-copy">{blocks.map((block, index) => block.startsWith("## ") ? <h2 key={index}>{block.slice(3)}</h2> : <p key={index}>{block}</p>)}</section>{project.gallery.length > 0 && <div className="gallery shell">{project.gallery.map((src, index) => <figure key={src}><Image src={src} alt={`${project.title} process image ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 50vw" /></figure>)}</div>}{related.length > 0 && <Section id="related" eyebrow="Continue exploring" title="Related work."><div className="project-grid">{related.map((item, index) => <ProjectCard key={item.slug} project={item} index={index} />)}</div></Section>}</main>;
}
