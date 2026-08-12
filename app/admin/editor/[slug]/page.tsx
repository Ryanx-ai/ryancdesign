import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/content";
import { AdminEditor } from "@/components/admin-editor";

export default async function Editor({ params }: { params: Promise<{ slug: string }> }) {
  if (!await auth()) redirect("/admin/login");
  const { slug } = await params;
  const project = slug === "new" ? null : getProject(slug, { includeUnpublished: true });
  const initial = project || { slug: "new", title: "", summary: "", year: String(new Date().getFullYear()), role: "Product Design", category: "Product", cover: "", body: "## Overview\n\n" };
  return <main className="admin shell"><span className="eyebrow">{project ? "Edit project" : "New project"}</span><h1>{project?.title || "Untitled project"}</h1><AdminEditor initial={initial} /></main>;
}
