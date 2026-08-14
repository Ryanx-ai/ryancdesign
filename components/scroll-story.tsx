"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { FileText, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

function Materialise({ text, anchor }: { text: string; anchor: string }) {
  return <span className="materialise-line" aria-label={text}>{text.split("").map((letter, index) => <motion.span className={`${text.endsWith(anchor) && index >= text.length - anchor.length ? "anchor-word" : ""}${letter === "D" ? " terminal-d" : ""}`} aria-hidden="true" key={`${letter}-${index}`} initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: .65, delay: index * .045, ease: [.22, 1, .36, 1] }}>{letter === " " ? "\u00a0" : letter === "D" ? <span className="terminal-d-glyph">D</span> : letter}</motion.span>)}</span>;
}

function TypeIdentity({ identities }: { identities: string[] }) {
  const [word, setWord] = useState(0); const [count, setCount] = useState(0); const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setCount(identities[0].length); return; }
    const current = identities[word];
    const pause = !deleting && count === current.length;
    const empty = deleting && count === 0;
    const timer = window.setTimeout(() => {
      if (pause) setDeleting(true);
      else if (empty) { setDeleting(false); setWord((value) => (value + 1) % identities.length); }
      else setCount((value) => value + (deleting ? -1 : 1));
    }, pause ? 1200 : empty ? 260 : deleting ? 54 : 92);
    return () => window.clearTimeout(timer);
  }, [count, deleting, identities, reduced, word]);
  return <span className="typed-identity" aria-live="polite">{identities[word].slice(0, count)}<i aria-hidden="true" /></span>;
}

export function ScrollStory() {
  const philosophy = useRef<HTMLElement>(null); const reduced = useReducedMotion();
  const { locale } = useLanguage();
  const { scrollYProgress: philosophyProgress } = useScroll({ target: philosophy, offset: ["start start", "end start"] });
  const philosophyOpacity = useTransform(philosophyProgress, [.45, .88], [1, 0], { clamp: true });
  const philosophyScale = useTransform(philosophyProgress, [.4, 1], [1, 1.08], { clamp: true });
  const philosophySpread = useTransform(philosophyProgress, [.45, 1], ["0em", ".32em"], { clamp: true });

  return <div className="splice-story">
    <section ref={philosophy} className="splice splice-philosophy">
      <motion.div className="philosophy-content" style={reduced ? undefined : { opacity: philosophyOpacity, scale: philosophyScale, letterSpacing: philosophySpread }}>
        <BrandMark size={58} /><h1><Materialise text="CULTURED MIND" anchor="MIND" /><Materialise text="SKILFUL HAND" anchor="HAND" /></h1><Image className="philosophy-signature" src="/images/ryan/signature.png" alt="RyanC signature" width={978} height={455} />
        <div className="story-prompt"><span>See how it connects</span><i /></div>
      </motion.div>
    </section>
    <section className="splice splice-ryan">
      <motion.div className="ryan-intro shell" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: .55 }} transition={{ duration: .7 }}>
        <div className="ryan-copy"><h2>{ui.ryan.heading[locale]}</h2><TypeIdentity identities={ui.ryan.roles[locale]} /><div className="ryan-actions" aria-label="Connect with Ryan"><a href="mailto:ryanchinqf2@gmail.com" aria-label="Email Ryan"><Mail size={17} /><span>{ui.contact.email[locale]}</span></a><a href="https://wa.me/6591443890" target="_blank" rel="noreferrer" aria-label="Message Ryan on WhatsApp"><MessageCircle size={17} /><span>{ui.contact.whatsapp[locale]}</span></a><a href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer" aria-label="Ryan on LinkedIn"><Linkedin size={17} /><span>LinkedIn</span></a><a href="https://github.com/Ryanx-ai" target="_blank" rel="noreferrer" aria-label="Ryan on GitHub"><Github size={17} /><span>GitHub</span></a><a href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer" aria-label="Ryan’s résumé"><FileText size={17} /><span>{ui.contact.resume[locale]}</span></a></div></div>
        <motion.div className="orbital-portrait" initial={reduced ? false : { opacity: 0, scale: .88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .5 }} transition={{ type: "spring", stiffness: 100, damping: 22 }}><i /><i /><div><Image src="/images/ryan/portrait.jpg" alt="RyanC celebrating amid gold confetti" fill priority sizes="(max-width:800px) 72vw, 38vw" /></div></motion.div>
      </motion.div>
    </section>
  </div>;
}
