import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";
import { parseCaseBlocks, type CaseBlock } from "./case-blocks";

export type ProjectTranslation = { title?: string; summary?: string; body?: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  category: string;
  featured: boolean;
  status: string;
  cover: string;
  gallery: string[];
  body: string;
  readingTime: number;
  translations: Partial<Record<Locale, ProjectTranslation>>;
  collection: "portfolio" | "projects";
  designDate: string;
  dateEvidence: string;
  publishDate: string;
  projectStatus: "concept" | "prototype" | "shipped" | "archived";
  credits: string;
  thumbnail: string;
  /** Optional editorial order, independent of the project's historical date. */
  portfolioOrder: number;
  sections: CaseBlock[];
};

const root = path.join(process.cwd(), "content/projects");

export function getProjects({ includeUnpublished = false, collection = "portfolio" }: { includeUnpublished?: boolean; collection?: "portfolio" | "projects" | "all" } = {}): Project[] {
  if (!fs.existsSync(root)) return [];
  const projects = fs.readdirSync(root).filter((file) => file.endsWith(".mdx")).map((file) => {
    const raw = fs.readFileSync(path.join(root, file), "utf8");
    const { data, content } = matter(raw);
    const project: Project = {
      slug: file.replace(/\.mdx$/, ""),
      title: String(data.title),
      summary: String(data.summary),
      year: String(data.year || ""),
      role: String(data.role),
      category: String(data.category),
      featured: data.featured !== false,
      status: String(data.status || "published"),
      cover: String(data.cover),
      gallery: Array.isArray(data.gallery) ? data.gallery.map(String) : [],
      body: content.trim(),
      readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
      translations: data.translations && typeof data.translations === "object" ? data.translations as Partial<Record<Locale, ProjectTranslation>> : {},
      collection: data.collection === "projects" ? "projects" : "portfolio",
      designDate: /^\d{4}(-\d{2}){0,2}$/.test(String(data.designDate || "")) ? String(data.designDate) : "",
      dateEvidence: String(data.dateEvidence || ""),
      publishDate: String(data.publishDate || ""),
      projectStatus: data.projectStatus === "prototype" || data.projectStatus === "shipped" || data.projectStatus === "archived" ? data.projectStatus : "concept",
      credits: String(data.credits || ""),
      thumbnail: String(data.thumbnail || ""),
      portfolioOrder: typeof data.portfolioOrder === "number" ? data.portfolioOrder : Number.MAX_SAFE_INTEGER,
      sections: parseCaseBlocks(data.sections),
    };
    return project;
  });
  return projects.filter((project) => (includeUnpublished || project.status === "published") && (collection === "all" || project.collection === collection)).sort((a, b) => a.portfolioOrder - b.portfolioOrder || (b.designDate || b.year).localeCompare(a.designDate || a.year));
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  const translation = project.translations[locale];
  if (!translation) return project;
  return { ...project, title: translation.title || project.title, summary: translation.summary || project.summary, body: translation.body || project.body };
}

export function getProject(slug: string, options?: { includeUnpublished?: boolean }) {
  return getProjects(options).find((project) => project.slug === slug);
}
