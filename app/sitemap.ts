import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ryanc.design";
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, ...getProjects().map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .8 }))];
}
