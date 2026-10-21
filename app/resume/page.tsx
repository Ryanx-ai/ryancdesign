import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { ResumeIntroduction } from "@/components/resume-introduction";
import { getProjects } from "@/lib/content";
export const metadata: Metadata = { title: "Resume", description: "RyanC’s experience across design, education, product innovation and regional growth.", alternates: { canonical: "/resume" }, openGraph: { title: "RyanC — Resume", url: "/resume" } };
export default function ResumePage() {
  const selected = getProjects().filter(p => ["beyond", "alpha-electrics", "isolert"].includes(p.slug));
  return <main className="resume-page"><ResumeIntroduction/><ExperienceSection careerFirst/><section className="resume-selected shell"><h2>Selected work</h2><div>{selected.map(p=><Link key={p.slug} href={`/work/${p.slug}`}><span>{p.category}</span><h3>{p.title}</h3><p>{p.summary}</p></Link>)}</div></section><ContactSection/></main>;
}
