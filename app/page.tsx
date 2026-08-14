import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { getProjects } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { ProjectGallery } from "@/components/project-gallery";
import { ScrollStory } from "@/components/scroll-story";

export default function Home() {
  const projects = getProjects();
  return <main className="landing-experience" id="top">
    <ScrollStory />
    <section className="gallery-section shell" id="portfolio"><Reveal className="portfolio-reveal"><h2>Portfolio</h2><p>Exploratory · Speculative · Applied</p></Reveal><ProjectGallery projects={projects} /></section>
    <section className="section shell" id="contact"><Reveal className="contact-card"><h2>Let’s connect.</h2><div className="contact-links"><a className="button primary" href="mailto:ryanchinqf2@gmail.com">Email <Mail size={15} /></a><a className="button" href="https://wa.me/6591443890" target="_blank" rel="noreferrer">WhatsApp <MessageCircle size={15} /></a><a className="button" href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={15} /></a><a className="button" href="https://github.com/Ryanx-ai" target="_blank" rel="noreferrer">GitHub <Github size={15} /></a><a className="button" href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer">Résumé</a></div></Reveal></section>
  </main>;
}
