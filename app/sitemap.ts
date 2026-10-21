import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { getVisibleLiveProjects } from "@/lib/live-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.ryanc.design";
  const liveProjectRoutes = getVisibleLiveProjects().flatMap((project) => project.caseStudyUrl ? [{ url: `${base}${project.caseStudyUrl}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .9 }] : []);
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, { url: `${base}/resume`, changeFrequency: "monthly", priority: .9 }, ...liveProjectRoutes, ...getProjects().map((project) => ({ url: `${base}/work/${project.slug}`, changeFrequency: "yearly" as const, priority: .8 }))];
}
