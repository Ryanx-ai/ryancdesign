import Image from "next/image";
import { ArrowDown, Github, Mail, Linkedin } from "lucide-react";
import { getProjects } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { RotatingTitle } from "@/components/rotating-title";
import { ProjectGallery } from "@/components/project-gallery";
import { HeroEnvironment } from "@/components/hero-environment";
import { PortraitConstellation } from "@/components/portrait-constellation";
import { CursorTrail } from "@/components/cursor-trail";

export default function Home() {
  const projects = getProjects();
  return <main>
    <section className="hero"><div className="stars" /><HeroEnvironment /><CursorTrail /><div className="shell hero-grid"><Reveal><h1 className="hero-sequence sequence-1">RyanC</h1><div className="hero-role hero-sequence sequence-2"><RotatingTitle /></div><p className="hero-copy hero-sequence sequence-3">Designing products, building ventures, and creating meaningful experiences across technology, education, and innovation.</p><div className="actions hero-sequence sequence-4"><a className="button primary" href="#work">View portfolio <ArrowDown size={15} /></a><a className="button" href="mailto:ryanchinqf2@gmail.com">Contact <Mail size={15} /></a><a className="button" href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={15} /></a><a className="button" href="https://github.com/Ryanx-ai" target="_blank" rel="noreferrer">GitHub <Github size={15} /></a></div></Reveal><Reveal delay={.12}><div className="portrait-frame hero-sequence sequence-5"><Image src="/images/ryan/portrait.jpg" alt="RyanC celebrating amid gold confetti" fill priority sizes="(max-width: 800px) 68vw, 38vw" /><PortraitConstellation /></div></Reveal></div></section>
    <section className="gallery-section shell" id="work"><Reveal className="gallery-intro"><span className="eyebrow">Selected archive</span><h2>Work, visually.</h2><p>Product, experience, venture and education work—curated for exploration.</p></Reveal><ProjectGallery projects={projects} /></section>
    <section className="section shell" id="contact"><Reveal className="contact-card"><h2>Let’s Connect</h2><a className="button primary" href="mailto:ryanchinqf2@gmail.com">ryanchinqf2@gmail.com <Mail size={15} /></a></Reveal></section>
  </main>;
}
