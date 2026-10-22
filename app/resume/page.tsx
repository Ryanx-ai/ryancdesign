import type { Metadata } from "next";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { ResumeIntroduction } from "@/components/resume-introduction";
export const metadata: Metadata = { title: "Resume", description: "RyanC’s experience across design, education, product innovation and regional growth.", alternates: { canonical: "/resume" }, openGraph: { title: "RyanC — Resume", url: "/resume" } };
export default function ResumePage() {
  return <main className="resume-page"><ResumeIntroduction/><ExperienceSection careerFirst/><ContactSection/></main>;
}
