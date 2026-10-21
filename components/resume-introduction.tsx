"use client";
import Link from "next/link";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";
export function ResumeIntroduction() {
  const {locale}=useLanguage();
  return <header className="resume-opening shell"><p>{locale === "zh" ? "设计师 · 创造者 · 创业者" : "Designer, builder and entrepreneur"}</p><h1>RyanC</h1><p className="resume-summary">{ui.ryan.summary[locale]}</p><Link className="resume-portfolio" href="/#portfolio"><span>{locale === "zh" ? "作品集" : "Portfolio"}</span>RyanC.design <span aria-hidden="true">↗</span></Link><a className="button" href="/documents/ryan-chin-resume.pdf" target="_blank" rel="noreferrer">{locale === "zh" ? "下载履历 PDF" : "Download résumé PDF"}</a><nav aria-label="Resume sections"><a href="#career">{locale === "zh" ? "经历" : "Experience"}</a><a href="#education">{locale === "zh" ? "教育" : "Education"}</a><a href="#skills">{locale === "zh" ? "技能" : "Skills"}</a><a href="#contact">{ui.contact.heading[locale]}</a></nav></header>;
}
