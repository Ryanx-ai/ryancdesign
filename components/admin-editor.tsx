"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Initial = { slug: string; title: string; summary: string; year: string; role: string; category: string; cover: string; body: string };

export function AdminEditor({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [state, setState] = useState("");
  const update = (key: keyof Initial, value: string) => setData((current) => ({ ...current, [key]: value }));
  async function save(status: "draft" | "published" | "archived") {
    setState("Saving…");
    const response = await fetch("/api/admin/projects", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, status }) });
    if (!response.ok) { setState("Unable to save"); return; }
    const output = await response.json();
    setState("Saved");
    if (initial.slug === "new") router.replace(`/admin/editor/${output.slug}`);
    router.refresh();
  }
  return <div className="admin-card"><div className="field"><label>Title</label><input value={data.title} onChange={(event) => update("title", event.target.value)} /></div><div className="field"><label>Slug</label><input value={data.slug} onChange={(event) => update("slug", event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))} /></div><div className="field"><label>Summary / SEO description</label><textarea className="summary-field" value={data.summary} onChange={(event) => update("summary", event.target.value)} /></div><div className="field-grid"><div className="field"><label>Year</label><input value={data.year} onChange={(event) => update("year", event.target.value)} /></div><div className="field"><label>Category</label><input value={data.category} onChange={(event) => update("category", event.target.value)} /></div></div><div className="field"><label>Role / tags (use |)</label><input value={data.role} onChange={(event) => update("role", event.target.value)} /></div><div className="field"><label>Cover image URL</label><input value={data.cover} onChange={(event) => update("cover", event.target.value)} /></div><div className="field"><label>MDX content</label><textarea value={data.body} onChange={(event) => update("body", event.target.value)} /></div><div className="actions"><button className="button primary" onClick={() => save("published")}>Publish</button><button className="button" onClick={() => save("draft")}>Save draft</button><button className="button" onClick={() => save("archived")}>Archive</button>{data.slug !== "new" && <a className="button" href={`/work/${data.slug}`} target="_blank" rel="noreferrer">Preview</a>}<span className="save-state">{state}</span></div></div>;
}
