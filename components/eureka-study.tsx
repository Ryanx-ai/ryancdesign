"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, FileText, Layers, Library, Plus, Search, X } from "lucide-react";
import { catalogueCourses } from "@/lib/eureka-catalogue";

const screens = [{name:"Course catalogue",icon:Library},{name:"Module builder",icon:Layers},{name:"Proposal draft",icon:FileText}] as const;
type Screen = typeof screens[number]["name"];
type Selection = {courseId:string; activity:string};

export function EurekaStudy() {
  const [screen,setScreen] = useState<Screen>("Course catalogue");
  const [courseId,setCourseId] = useState("junior-coders");
  const [query,setQuery] = useState("");
  const [pillar,setPillar] = useState("All");
  const [selected,setSelected] = useState<Selection[]>([]);
  const [proposal,setProposal] = useState({name:"A first step into coding",audience:"School enrichment programme",format:"Bootcamp"});
  const [notice,setNotice] = useState("");
  const course = catalogueCourses.find(item=>item.id===courseId) ?? catalogueCourses[2];
  const visible = catalogueCourses.filter(item=>(pillar==="All"||item.pillar===pillar)&&`${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
  const chosenCourses = catalogueCourses.filter(item=>selected.some(selection=>selection.courseId===item.id));
  const incompatible = chosenCourses.filter(item=>!item.formats.includes(proposal.format));
  function toggle(activity:string) {
    const exists=selected.some(item=>item.courseId===course.id&&item.activity===activity);
    setSelected(current=>exists?current.filter(item=>!(item.courseId===course.id&&item.activity===activity)):[...current,{courseId:course.id,activity}]);
    setNotice(`${activity} ${exists?"removed from":"added to"} the proposal.`);
  }
  function openCourse(id:string) {setCourseId(id);setScreen("Module builder");setNotice("");}
  return <div className="eureka-app catalogue-app">
    <header><Image src="/content/projects/eureka/cms-lockup.svg" width={327} height={85} alt="Eureka"/><span>Curriculum Management System<br/><small>Catalogue-to-proposal interface study</small></span></header>
    <div className="eureka-workspace eureka-workspace-v3">
      <nav className="eureka-rail" aria-label="Eureka concept screens">{screens.map(({name,icon:Icon})=><button key={name} aria-pressed={screen===name} onClick={()=>{setScreen(name);setNotice("");}}><Icon size={17}/>{name}</button>)}</nav>
      <div className="eureka-library">
        <div className="catalogue-heading"><span className="study-kicker">ESA · 2026–2027</span><h3>{screen}</h3><p>{screen==="Course catalogue"?"Find a course, review its activities, then assemble a proposal.":screen==="Module builder"?"Turn course activities into a reusable proposal outline.":"Review the outline before curriculum and commercial approval."}</p></div>
        {screen==="Course catalogue" ? <>
          <label className="study-search"><Search size={17}/><span className="sr-only">Search courses</span><input placeholder="Search courses" value={query} onChange={event=>setQuery(event.target.value)}/></label>
          <div className="catalogue-filters" role="group" aria-label="Course pillar">{["All","Science","Technology","Engineering","Math","Design"].map(name=><button key={name} aria-pressed={pillar===name} onClick={()=>setPillar(name)}>{name}</button>)}</div>
          <div className="catalogue-courses">{visible.map(item=><article key={item.id}><span>{item.pillar} · Ages {item.ages}</span><h4>{item.title}</h4><p>{item.description}</p><small>{item.formats.join(" / ")}</small><button onClick={()=>openCourse(item.id)}>Build modules <ArrowRight size={15}/><span className="sr-only"> for {item.title}</span></button></article>)}</div>
          {!visible.length && <div className="catalogue-empty"><p>No courses match these filters.</p><button onClick={()=>{setQuery("");setPillar("All");}}>Clear filters</button></div>}
        </> : screen==="Module builder" ? <>
          <label className="catalogue-course-select">Source course<select value={courseId} onChange={event=>{setCourseId(event.target.value);setNotice("");}}>{catalogueCourses.map(item=><option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <div className="catalogue-course-detail"><span>{course.pillar} · Ages {course.ages}</span><h4>{course.title}</h4><p>{course.description}</p><small>{course.formats.join(" / ")} · Catalogue p. {course.page}</small></div>
          <h4 className="catalogue-module-label">Activities → proposal modules</h4><p className="catalogue-note">Suggested grouping from the catalogue’s learning activities. Select the parts relevant to the brief.</p>
          <div className="catalogue-module-list">{course.activities.map((activity,index)=>{const added=selected.some(item=>item.courseId===course.id&&item.activity===activity);return <article key={activity}><span>{String(index+1).padStart(2,"0")}</span><strong>{activity}</strong><button aria-pressed={added} aria-label={`${added?"Remove":"Add"} ${activity}`} onClick={()=>toggle(activity)}>{added?<Check size={18}/>:<Plus size={18}/>}</button></article>;})}</div>
        </> : <>
          <div className="eureka-programme-form"><label>Proposal title<input maxLength={90} value={proposal.name} onChange={event=>setProposal({...proposal,name:event.target.value})}/></label><label>Audience / brief<input maxLength={100} value={proposal.audience} onChange={event=>setProposal({...proposal,audience:event.target.value})}/></label><label>Delivery format<select value={proposal.format} onChange={event=>setProposal({...proposal,format:event.target.value})}>{["Workshop","Bootcamp","Regular classes","GoGlobal"].map(format=><option key={format}>{format}</option>)}</select></label></div>
          {selected.length ? <div className="catalogue-proposal"><span>Proposal outline · draft</span><h4>{proposal.name.trim()||"Untitled proposal"}</h4><p>{proposal.audience.trim()||"Audience to be confirmed"} · {proposal.format}</p>{chosenCourses.map(item=><section key={item.id}><h5>{item.title}</h5><small>Ages {item.ages} · Source: catalogue p. {item.page}</small><ol>{selected.filter(selection=>selection.courseId===item.id).map(selection=><li key={selection.activity}>{selection.activity}</li>)}</ol></section>)}<p className="catalogue-note">Duration, sequencing, pricing and delivery feasibility need team review. This is an outline, not a client-ready quotation.</p></div>:<div className="catalogue-empty"><h4>Start with a course.</h4><p>Select at least one activity to build the proposal outline.</p><button className="eureka-action" onClick={()=>setScreen("Course catalogue")}>Browse courses</button></div>}
          {incompatible.length>0 && <p className="catalogue-warning" role="status">Check delivery: {incompatible.map(item=>item.title).join(", ")} {incompatible.length===1?"does":"do"} not list {proposal.format} in the catalogue. Choose another format or confirm an adaptation with the curriculum team.</p>}
        </>}
        <p className="catalogue-feedback" role="status">{notice}</p>
      </div>
      <aside className="eureka-program"><span className="study-kicker">Proposal workspace</span><h4>{selected.length} {selected.length===1?"module":"modules"} selected</h4><p>From {chosenCourses.length} {chosenCourses.length===1?"course":"courses"}</p>{selected.length?<ol>{selected.map(item=><li key={`${item.courseId}-${item.activity}`}><span>{item.activity}</span><button aria-label={`Remove ${item.activity} from proposal`} onClick={()=>{setSelected(current=>current.filter(selection=>selection!==item));setNotice(`${item.activity} removed from the proposal.`);}}><X size={16}/></button></li>)}</ol>:<p>Pick activities from a course. Your selection stays here as you browse.</p>}<button className="eureka-action" onClick={()=>setScreen("Proposal draft")}>Review draft <ArrowRight size={15}/></button><small className="catalogue-note">No client data or live sales system is connected.</small></aside>
    </div><footer className="eureka-demo-note">Selected courses from the founder-supplied ESA working catalogue. Module grouping and proposal UI are new design studies. Changes reset on reload.</footer>
  </div>;
}
