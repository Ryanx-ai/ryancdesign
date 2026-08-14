"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { achievements, education, toolGroups, work, type ExperienceItem } from "@/lib/experience";
import { localize, type Locale } from "@/lib/i18n";
import { EditorialHeading } from "./editorial-heading";
import { useLanguage } from "./language-provider";

const copy = {
  en: {
    eyebrow: "Experience",
    introBefore: "Designing across",
    introEmphasis: "disciplines.",
    intro: "Six years across education, technology, design and startup environments—building products, services, ventures, partnerships and systems.",
    educationBefore: "Where I learned to",
    educationEmphasis: "make things.",
    workBefore: "Things I’ve helped",
    workEmphasis: "build.",
    achievementsBefore: "A few things I’m",
    achievementsEmphasis: "proud of.",
    toolsBefore: "The tools behind the",
    toolsEmphasis: "work.",
  },
  zh: {
    eyebrow: "经历",
    introBefore: "跨越不同领域的",
    introEmphasis: "设计实践。",
    intro: "六年横跨教育、科技、设计与创业环境——构建产品、服务、事业、合作关系与系统。",
    educationBefore: "学习如何",
    educationEmphasis: "把想法做出来。",
    workBefore: "我参与推动的",
    workEmphasis: "事业。",
    achievementsBefore: "一些让我",
    achievementsEmphasis: "引以为傲的事。",
    toolsBefore: "支撑作品的",
    toolsEmphasis: "工具。",
  },
};

function TimelineItems({ items, locale }: { items: ExperienceItem[]; locale: Locale }) {
  return <div className="experience-items">{items.map((item, index) => <motion.article className="experience-item" key={`${item.organisation}-${item.role.en}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .6, delay: Math.min(index * .06, .24), ease: [.22, 1, .36, 1] }}>
    <span className="experience-node" aria-hidden="true" />
    <div className="experience-meta"><span>{item.period || "—"}</span>{item.meta ? <small>{localize(item.meta, locale)}</small> : null}</div>
    <div className="experience-copy"><h3>{item.organisation}</h3><strong>{localize(item.role, locale)}</strong><p>{localize(item.description, locale)}</p></div>
  </motion.article>)}</div>;
}

export function ExperienceSection() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { locale } = useLanguage();
  const text = copy[locale];
  const { scrollYProgress } = useScroll({ target: section, offset: ["start .75", "end .7"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .35 });

  return <section className="experience-section shell" id="experience" ref={section}>
    <header className="experience-opening">
      <EditorialHeading eyebrow={text.eyebrow} before={text.introBefore} emphasis={text.introEmphasis} />
      <p>{text.intro}</p>
      <div className="experience-roles" aria-label={locale === "en" ? "Roles" : "角色"}><span>{locale === "en" ? "Builder" : "创造者"}</span><span>{locale === "en" ? "Designer" : "设计师"}</span><span>{locale === "en" ? "Strategist" : "策略师"}</span><span>{locale === "en" ? "Entrepreneur" : "创业者"}</span></div>
    </header>
    <div className="experience-journey">
      <div className="experience-line" aria-hidden="true"><motion.i style={{ scaleY: reduced ? 1 : lineProgress }} /></div>
      <section className="experience-chapter"><EditorialHeading before={text.educationBefore} emphasis={text.educationEmphasis} /><TimelineItems items={education} locale={locale} /></section>
      <section className="experience-chapter"><EditorialHeading before={text.workBefore} emphasis={text.workEmphasis} /><TimelineItems items={work} locale={locale} /></section>
      <section className="experience-chapter"><EditorialHeading before={text.achievementsBefore} emphasis={text.achievementsEmphasis} /><div className="achievement-list">{achievements.map((item) => <article key={item.title}><span>{item.year || "RCD"}</span><div><h3>{item.title}</h3><p>{localize(item.detail, locale)}</p></div></article>)}</div></section>
      <section className="experience-chapter toolkit"><EditorialHeading before={text.toolsBefore} emphasis={text.toolsEmphasis} /><div className="tool-groups">{toolGroups.map((group) => <article key={group.name.en}><h3>{localize(group.name, locale)}</h3><div>{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div></section>
    </div>
  </section>;
}
