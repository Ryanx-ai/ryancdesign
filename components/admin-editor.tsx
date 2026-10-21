"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CaseBlock } from "@/lib/case-blocks";

type Initial = { slug:string; title:string; summary:string; year:string; role:string; category:string; cover:string; body:string; designDate?:string; dateEvidence?:string; credits?:string; thumbnail?:string; projectStatus?:string; collection?:string; sections?:CaseBlock[] };
export function AdminEditor({initial}:{initial:Initial}) {
  const router=useRouter();
  const [data,setData]=useState({...initial,designDate:initial.designDate||"",dateEvidence:initial.dateEvidence||"",credits:initial.credits||"",thumbnail:initial.thumbnail||"",collection:initial.collection||"portfolio",projectStatus:initial.projectStatus||"concept"});
  const [blocks,setBlocks]=useState(JSON.stringify(initial.sections||[],null,2));
  const [state,setState]=useState("");
  const [saving,setSaving]=useState(false);
  const fields=["title","slug","summary","year","designDate","dateEvidence","category","role","cover","thumbnail","credits"] as const;
  const labels:Record<typeof fields[number],string>={title:"Title",slug:"Slug",summary:"Summary / SEO description",year:"Display year (leave blank if unknown)",designDate:"Design date (YYYY, YYYY-MM or YYYY-MM-DD)",dateEvidence:"Date evidence",category:"Category",role:"Role / focus",cover:"Cover image path",thumbnail:"Thumbnail path (optional)",credits:"Source credits and limitations"};
  async function save(status:"draft"|"published"|"archived") {
    let sections:unknown;
    try { sections=JSON.parse(blocks); } catch { setState("Sections must be valid JSON."); return; }
    setSaving(true);setState("Saving…");
    try {
      const response=await fetch("/api/admin/projects",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...data,status,sections})});
      const output=await response.json();
      if(!response.ok){setState(output.error || "Unable to save");return;}
      setState("Saved locally. Commit and deploy to publish to production.");
      if(initial.slug==="new")router.replace(`/admin/editor/${output.slug}`);
      router.refresh();
    } catch {setState("Unable to reach the editor. Your changes are still in this form.");}
    finally {setSaving(false);}
  }
  return <div className="admin-card">{fields.map(key=><div className="field" key={key}><label htmlFor={`editor-${key}`}>{labels[key]}</label><input id={`editor-${key}`} value={data[key]} disabled={key==="slug" && initial.slug!=="new"} onChange={e=>setData(current=>({...current,[key]:e.target.value}))}/></div>)}<div className="field-grid"><div className="field"><label htmlFor="editor-collection">Collection</label><select id="editor-collection" value={data.collection} onChange={e=>setData(s=>({...s,collection:e.target.value}))}><option value="portfolio">Portfolio</option><option value="projects">Projects</option></select></div><div className="field"><label htmlFor="editor-project-status">Project maturity</label><select id="editor-project-status" value={data.projectStatus} onChange={e=>setData(s=>({...s,projectStatus:e.target.value}))}>{["concept","prototype","shipped","archived"].map(s=><option key={s} value={s}>{s}</option>)}</select></div></div><div className="field"><label htmlFor="editor-body">MDX body</label><textarea id="editor-body" value={data.body} onChange={e=>setData(s=>({...s,body:e.target.value}))}/></div><div className="field"><label htmlFor="editor-sections">Editorial sections (JSON)</label><p>Optional typed blocks: text, image, pair, parts, palette, mockup and reflection. Existing gallery and translation fields are preserved.</p><textarea id="editor-sections" value={blocks} onChange={e=>setBlocks(e.target.value)} spellCheck={false}/></div><div className="actions"><button disabled={saving} className="button primary" onClick={()=>save("published")}>Publish locally</button><button disabled={saving} className="button" onClick={()=>save("draft")}>Save draft</button><button disabled={saving} className="button" onClick={()=>save("archived")}>Archive</button><span className="save-state" role="status">{state}</span></div></div>;
}
