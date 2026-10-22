"use client";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";
export function ResumeIntroduction() {
  const {locale}=useLanguage();
  return <header className="resume-opening shell"><h1 className="sr-only">{locale === "zh" ? "RyanC 履历" : "RyanC — Résumé"}</h1><a className="button resume-download" href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer">{locale === "zh" ? "下载履历 PDF" : "Download Résumé PDF"}<span aria-hidden="true">↗</span></a><p className="resume-summary">{locale === "zh" ? "跨学科设计师、创造者与创业者，拥有设计、教育、科技与业务发展经验。" : "Multidisciplinary designer, builder and entrepreneur with experience across design, education, technology and business development."}</p><nav aria-label="Resume sections"><a href="#career">{locale === "zh" ? "经历" : "Experience"}</a><a href="#education">{locale === "zh" ? "教育" : "Education"}</a><a href="#skills">{locale === "zh" ? "技能" : "Skills"}</a><a href="#contact">{ui.contact.heading[locale]}</a></nav></header>;
}
