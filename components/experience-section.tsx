"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Bot, Boxes, Braces, Code2, Cpu, DraftingCompass, Image, PencilRuler, Sparkles, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { SiArduino, SiAutocad, SiBlender, SiClaude, SiCplusplus, SiFigma, SiFlask, SiGit, SiGithub, SiHtml5, SiJavascript, SiMiro, SiNextdotjs, SiObsstudio, SiPython, SiReact, SiRhinoceros, SiScratch, SiSharp, SiSketch, SiSqlite, SiSwift, SiTypescript, SiUnity, SiUnrealengine, SiVercel, SiWebflow } from "react-icons/si";
import { achievements, education, toolGroups, work, type ExperienceItem, type ExperienceMetric } from "@/lib/experience";
import { localize, type Locale } from "@/lib/i18n";
import { EditorialHeading } from "./editorial-heading";
import { useLanguage } from "./language-provider";

const copy = {
  en: {
    educationLabel: "Education",
    educationBefore: "Where I learned to",
    educationEmphasis: "Create",
    careerLabel: "Professional Career",
    careerBefore: "Places I’ve helped",
    careerEmphasis: "Grow",
    achievementsLabel: "Achievements",
    achievementsBefore: "A few things I’m",
    achievementsEmphasis: "proud of",
    toolsLabel: "Technical Skills",
    toolsBefore: "The Tools Behind the",
    toolsEmphasis: "Work",
    showMore: "Show more",
    showLess: "Show less",
  },
  zh: {
    educationLabel: "教育",
    educationBefore: "学习如何",
    educationEmphasis: "创造",
    careerLabel: "职业经历",
    careerBefore: "我参与推动的",
    careerEmphasis: "成长",
    achievementsLabel: "成就",
    achievementsBefore: "一些让我",
    achievementsEmphasis: "引以为傲的事",
    toolsLabel: "技术技能",
    toolsBefore: "支撑作品的",
    toolsEmphasis: "工具",
    showMore: "展开",
    showLess: "收起",
  },
};

function ExpandableText({ text, locale }: { text: string; locale: Locale }) {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const node = paragraph.current;
    if (!node) return;
    const measure = () => setOverflowing(node.scrollHeight > node.clientHeight + 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  return <div className={`experience-description${overflowing ? " overflowing" : ""}${expanded ? " expanded" : ""}`}>
    <p ref={paragraph}>{text}</p>
    {overflowing || expanded ? <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? copy[locale].showLess : `${copy[locale].showMore} ›`}</button> : null}
  </div>;
}

function Metrics({ metrics, locale }: { metrics?: ExperienceMetric[]; locale: Locale }) {
  return metrics?.length ? <div className="experience-metrics">{metrics.map((metric) => <div key={`${metric.value}-${metric.label.en}`}><strong>{metric.value}</strong><span>{localize(metric.label, locale)}</span></div>)}</div> : null;
}

function TimelineItems({ items, locale }: { items: ExperienceItem[]; locale: Locale }) {
  const reduced = useReducedMotion();
  return <div className="experience-items">{items.map((item, index) => <motion.article className="experience-item" key={`${item.period}-${item.organisation}`} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .5, delay: Math.min(index * .05, .2), ease: [.22, 1, .36, 1] }}>
    <span className="experience-node" aria-hidden="true" />
    <div className="experience-meta"><span>{item.period}</span>{item.meta ? <small>{localize(item.meta, locale)}</small> : null}</div>
    <div className="experience-copy"><h3>{item.organisation}</h3><strong>{localize(item.role, locale)}</strong><ExpandableText text={localize(item.description, locale)} locale={locale} /><Metrics metrics={item.metrics} locale={locale} /></div>
  </motion.article>)}</div>;
}

const toolIcons = [PencilRuler, Boxes, Code2];

const brandIcons: Record<string, IconType> = {
  Figma: SiFigma, Sketch: SiSketch, Rhino: SiRhinoceros, AutoCAD: SiAutocad, Blender: SiBlender,
  Arduino: SiArduino, Unity: SiUnity, "Unreal Engine": SiUnrealengine, Miro: SiMiro, Webflow: SiWebflow, OBS: SiObsstudio, Scratch: SiScratch,
  TypeScript: SiTypescript, JavaScript: SiJavascript, Python: SiPython, "C++": SiCplusplus, "C#": SiSharp, Swift: SiSwift,
  "HTML / CSS": SiHtml5, React: SiReact, "Next.js": SiNextdotjs, Flask: SiFlask, Git: SiGit, GitHub: SiGithub, Vercel: SiVercel,
  "SQL / SQLite": SiSqlite, Claude: SiClaude,
};

const fallbackIcons: Record<string, IconType> = {
  Illustrator: DraftingCompass, Photoshop: Image, "After Effects": Sparkles, "Premiere Pro": Video, KeyShot: Sparkles, ZBrush: DraftingCompass,
  "OpenAI API": Bot, Codex: Braces, "LLM Integration": Cpu, "Prompt Engineering": Sparkles,
};

export function ExperienceSection() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { locale } = useLanguage();
  const text = copy[locale];
  const { scrollYProgress } = useScroll({ target: section, offset: ["start .8", "end .75"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .35 });

  return <section className="experience-section shell" id="experience" ref={section}>
    <div className="experience-life">
      <div className="experience-line" aria-hidden="true"><motion.i style={{ scaleY: reduced ? 1 : lineProgress }} /></div>
      <section className="experience-chapter"><EditorialHeading eyebrow={text.educationLabel} before={text.educationBefore} emphasis={text.educationEmphasis} /><TimelineItems items={education} locale={locale} /></section>
      <section className="experience-chapter"><EditorialHeading eyebrow={text.careerLabel} before={text.careerBefore} emphasis={text.careerEmphasis} /><TimelineItems items={work} locale={locale} /></section>
      <section className="experience-chapter"><EditorialHeading eyebrow={text.achievementsLabel} before={text.achievementsBefore} emphasis={text.achievementsEmphasis} /><div className="achievement-list">{achievements.map((item) => <article key={`${item.year}-${item.title}`}><span>{item.year}</span><div><h3>{item.title}</h3><p>{localize(item.detail, locale)}</p><Metrics metrics={item.metrics} locale={locale} /></div></article>)}</div></section>
    </div>
    <section className="experience-chapter toolkit"><EditorialHeading eyebrow={text.toolsLabel} before={text.toolsBefore} emphasis={text.toolsEmphasis} /><div className="tool-groups">{toolGroups.map((group, index) => { const GroupIcon = toolIcons[index]; return <article key={group.name.en}><div className="tool-column-line" aria-hidden="true" /><header><h3><GroupIcon size={17} aria-hidden="true" />{localize(group.name, locale)}</h3>{group.descriptor ? <p>{localize(group.descriptor, locale)}</p> : null}</header><div className="tool-sections">{group.sections.map((toolSection) => <section key={toolSection.name?.en ?? group.name.en}>{toolSection.name ? <h4>{localize(toolSection.name, locale)}</h4> : null}<div className="tool-list">{toolSection.tools.map((tool) => { const ToolIcon = brandIcons[tool] ?? fallbackIcons[tool] ?? Code2; return <span key={tool}><ToolIcon aria-hidden="true" />{tool}</span>; })}</div></section>)}</div></article>; })}</div></section>
  </section>;
}
