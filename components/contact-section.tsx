"use client";

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { ui } from "@/lib/i18n";
import { Reveal } from "./motion";
import { useLanguage } from "./language-provider";

export function ContactSection() {
  const { locale } = useLanguage();
  const text = ui.contact;
  return <section className="section shell" id="contact"><Reveal className="contact-card"><h2>{text.heading[locale]}</h2><div className="contact-links"><a className="button primary" href="mailto:ryanchinqf2@gmail.com">{text.email[locale]} <Mail size={15} /></a><a className="button" href="https://wa.me/6591443890" target="_blank" rel="noreferrer">{text.whatsapp[locale]} <MessageCircle size={15} /></a><a className="button" href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">{text.linkedin[locale]} <Linkedin size={15} /></a><a className="button" href="https://github.com/Ryanx-ai" target="_blank" rel="noreferrer">{text.github[locale]} <Github size={15} /></a><a className="button" href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer">{text.resume[locale]}</a></div></Reveal></section>;
}
