import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/projects-preview"] }, sitemap: "https://www.ryanc.design/sitemap.xml" }; }
