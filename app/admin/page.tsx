import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getProjects } from "@/lib/content";
import { redirect } from "next/navigation";

export default async function Admin() {
  if (!await auth()) redirect("/admin/login");
  const projects = getProjects({ includeUnpublished: true });
  return <main className="admin shell"><div className="admin-header"><div><span className="eyebrow">Content workspace</span><h1>Projects</h1></div><form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button className="button">Log out</button></form></div><div className="timeline"><Link className="timeline-row" href="/admin/editor/new"><strong>New project</strong><span>Create a draft MDX record</span><span>+</span></Link>{projects.map((project) => <Link className="timeline-row" href={`/admin/editor/${project.slug}`} key={project.slug}><strong>{project.title}</strong><span>{project.category} · {project.status}</span><span>→</span></Link>)}</div></main>;
}
