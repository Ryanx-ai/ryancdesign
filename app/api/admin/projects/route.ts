import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "node:fs/promises";
import path from "node:path";

const safe = (value: string) => value.replace(/"/g, "\\\"").replace(/\n/g, " ");

export async function POST(request: Request) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  const slug = String(data.slug === "new" ? data.title : data.slug).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!slug || !data.title) return NextResponse.json({ error: "Title and slug required" }, { status: 400 });
  const status = ["draft", "published", "archived"].includes(data.status) ? data.status : "draft";
  const mdx = `---\ntitle: "${safe(data.title)}"\nsummary: "${safe(data.summary)}"\nyear: "${safe(data.year)}"\nrole: "${safe(data.role)}"\ncategory: "${safe(data.category)}"\nfeatured: false\nstatus: "${status}"\ncover: "${safe(data.cover)}"\ngallery: []\n---\n${data.body || ""}\n`;
  await fs.writeFile(path.join(process.cwd(), "content/projects", `${slug}.mdx`), mdx, "utf8");
  return NextResponse.json({ ok: true, slug });
}
