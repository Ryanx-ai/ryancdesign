import { Github, Linkedin, Mail } from "lucide-react";
import { getProjects } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { ProjectGallery } from "@/components/project-gallery";
import { HeroEnvironment } from "@/components/hero-environment";
import { CursorTrail } from "@/components/cursor-trail";
import { ScrollStory } from "@/components/scroll-story";

export default function Home() {
  const projects = getProjects();
  return <main className="landing-experience">
    <div className="stars" /><HeroEnvironment /><CursorTrail /><ScrollStory />
    <section className="gallery-section shell" id="portfolio"><Reveal className="portfolio-reveal"><h2>Portfolio</h2></Reveal><ProjectGallery projects={projects} /></section>
    <section className="section shell" id="contact"><Reveal className="contact-card"><h2>Let’s Connect</h2><div className="contact-links"><a className="button primary" href="mailto:ryanchinqf2@gmail.com">Email <Mail size={15} /></a><a className="button" href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={15} /></a><a className="button" href="https://github.com/Ryanx-ai" target="_blank" rel="noreferrer">GitHub <Github size={15} /></a><a className="button" href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer">Résumé</a></div></Reveal></section>
  </main>;
}
