import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

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
};

const root = path.join(process.cwd(), "content/projects");

export function getProjects({ includeUnpublished = false } = {}): Project[] {
  if (!fs.existsSync(root)) return [];
  const projects = fs.readdirSync(root).filter((file) => file.endsWith(".mdx")).map((file) => {
    const raw = fs.readFileSync(path.join(root, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: String(data.title),
      summary: String(data.summary),
      year: String(data.year),
      role: String(data.role),
      category: String(data.category),
      featured: data.featured !== false,
      status: String(data.status || "published"),
      cover: String(data.cover),
      gallery: Array.isArray(data.gallery) ? data.gallery.map(String) : [],
      body: content.trim(),
      readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
      translations: data.translations && typeof data.translations === "object" ? data.translations as Partial<Record<Locale, ProjectTranslation>> : {},
    };
  });
  return projects.filter((project) => includeUnpublished || project.status === "published").sort((a, b) => b.year.localeCompare(a.year));
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  const translation = project.translations[locale];
  if (!translation) return project;
  return { ...project, title: translation.title || project.title, summary: translation.summary || project.summary, body: translation.body || project.body };
}

export function getProject(slug: string, options?: { includeUnpublished?: boolean }) {
  return getProjects(options).find((project) => project.slug === slug);
}
