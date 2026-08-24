import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { getVisibleLiveProjects } from "@/lib/live-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.ryanc.design";
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, ...getVisibleLiveProjects().map((project) => ({ url: `${base}${project.caseStudyUrl}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .9 })), ...getProjects().map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .8 }))];
}
