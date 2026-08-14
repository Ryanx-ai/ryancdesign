import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsPreview } from "@/components/projects-preview";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projects Preview", robots: { index: false, follow: false } };

export default function ProjectsPreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <ProjectsPreview />;
}
