import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parseCaseBlocks } from "@/lib/case-blocks";

export async function POST(request:Request) {
  if(!await auth())return NextResponse.json({error:"Unauthorized"},{status:401});
  // Git-first content must not report success for writes to an ephemeral Vercel filesystem.
  if(process.env.VERCEL)return NextResponse.json({error:"Production is read-only. Edit in the local repository, then commit and deploy."},{status:409});
  try {
    const data:unknown=await request.json();
    if(!data || typeof data!=="object")throw new Error("Invalid project");
    const fields=data as Record<string,unknown>;
    for(const key of ["title","slug","summary","year","role","category","cover","body"]){if(typeof fields[key]!=="string")throw new Error(`Invalid ${key}`);}
    const slug=String(fields.slug==="new" ? fields.title : fields.slug).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    if(!slug || !String(fields.title).trim())throw new Error("Title and slug required");
    if(fields.designDate && !/^\d{4}(-\d{2}){0,2}$/.test(String(fields.designDate)))throw new Error("Use YYYY, YYYY-MM or YYYY-MM-DD for design date");
    if(fields.collection && !["portfolio","projects"].includes(String(fields.collection)))throw new Error("Invalid collection");
    const file=path.join(process.cwd(),"content/projects",`${slug}.mdx`);
    let existing:Record<string,unknown>={};
    try {existing=matter(await fs.readFile(file,"utf8")).data;}
    catch(error){if(!(error instanceof Error && "code" in error && error.code==="ENOENT"))throw error;}
    const updated:Record<string,unknown>={...existing};
    for(const key of ["title","summary","year","role","category","cover","designDate","dateEvidence","credits","thumbnail","collection","projectStatus"]){if(fields[key]!==undefined){if(typeof fields[key]!=="string")throw new Error(`Invalid ${key}`);updated[key]=fields[key];}}
    if(fields.sections!==undefined)updated.sections=parseCaseBlocks(fields.sections);
    updated.status=["published","draft","archived"].includes(String(fields.status)) ? fields.status : "draft";
    if(!("gallery" in updated))updated.gallery=[];
    await fs.writeFile(file,matter.stringify(String(fields.body),updated),"utf8");
    return NextResponse.json({ok:true,slug});
  } catch(error) {return NextResponse.json({error:error instanceof Error ? error.message : "Unable to save project"},{status:400});}
}
