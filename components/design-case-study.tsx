import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { DesignStudy } from "./design-study";

export function DesignCaseStudy({project,previous,next}:{project:Project;previous:Project;next:Project}) {
  return <main className={`design-case design-case-${project.slug}`}>
    <header className="design-opening shell"><Link className="back" href="/#portfolio"><ArrowLeft size={15}/> Portfolio</Link><p className="design-discipline">{project.category}</p><h1>{project.title}</h1><div className="design-introduction"><p>{project.summary}</p><dl><div><dt>Focus</dt><dd>{project.role}</dd></div><div><dt>Status</dt><dd>{project.projectStatus === "prototype" ? "Local prototype + interface study" : "Design concept"}</dd></div>{project.year && <div><dt>Design</dt><dd>{project.year}</dd></div>}</dl></div></header>
    <figure className="design-cover shell"><Image src={project.cover} alt={`${project.title} visual identity`} width={1600} height={1000} priority sizes="(max-width: 800px) 100vw, 1200px"/></figure>
    <div className="design-story shell">{project.sections.map((block,i)=><section className={`design-block block-${block.type}`} key={`${block.title}-${i}`} aria-labelledby={`section-${i}`}><div className="design-block-heading"><span className="design-index">{String(i+1).padStart(2,"0")}</span><h2 id={`section-${i}`}>{block.title}</h2>{block.text && <p>{block.text}</p>}</div>{block.images?.length ? <div className={`design-media ${block.images.length>1 ? "media-pair" : ""}`}>{block.images.map(image=><figure key={image.src}><Image src={image.src} alt={image.alt} width={1600} height={1000} sizes="(max-width: 800px) 100vw, 1100px"/><figcaption>{image.caption}</figcaption></figure>)}</div> : null}{block.items?.length ? <div className={block.type === "palette" ? "design-palette" : "design-parts"}>{block.items.map(item=><div key={item.title}>{block.type === "palette" && /^#[0-9a-f]{6}$/i.test(item.text) ? <i style={{background:item.text}}/> : null}<h3>{item.title}</h3><p>{item.text}</p></div>)}</div> : null}{block.study && <DesignStudy kind={block.study}/>}</section>)}</div>
    {project.credits && <aside className="design-provenance shell"><h2>Source & scope</h2><p>{project.credits}</p>{project.dateEvidence && <p>{project.dateEvidence}</p>}</aside>}
    <nav className="case-ending shell" aria-label="Project navigation"><Link href={`/work/${previous.slug}`}><ArrowLeft size={17}/><span><small>Previous project</small>{previous.title}</span></Link><Link className="portfolio-return" href="/#portfolio">Portfolio</Link><Link href={`/work/${next.slug}`}><span><small>Next project</small>{next.title}</span><ArrowRight size={17}/></Link></nav>
  </main>;
}
