"use client";

import { useState } from "react";
import { Check, FileText, Layers, LayoutDashboard, Pencil, Plus, Search, X } from "lucide-react";

type Module = { id: number; name: string; track: string; detail: string; morsels: number; status: "Draft" | "Active" };
const samples: Module[] = [
  { id:1, name:"Paper structures", track:"Engineering", detail:"Fold, test and compare.", morsels:3, status:"Active" },
  { id:2, name:"Light and shadow", track:"Science", detail:"Observe a changing outline.", morsels:4, status:"Active" },
  { id:3, name:"Patterns in nature", track:"Math", detail:"Find a rule, then test it.", morsels:3, status:"Draft" },
  { id:4, name:"Design a small shelter", track:"Design", detail:"Build around a constraint.", morsels:5, status:"Active" },
];
const screens = [{ name:"Dashboard", icon:LayoutDashboard }, { name:"Module library", icon:Layers }, { name:"Programme builder", icon:FileText }] as const;
type Screen = typeof screens[number]["name"] | "Edit module";

/** New UI concept from documented workflows; no source database or private lessons. */
export function EurekaStudy() {
  const [screen,setScreen] = useState<Screen>("Dashboard");
  const [modules,setModules] = useState(samples);
  const [query,setQuery] = useState("");
  const [selected,setSelected] = useState<number[]>([1]);
  const [draft,setDraft] = useState<Module>(samples[0]);
  const [error,setError] = useState("");
  const [notice,setNotice] = useState("");
  const [programme,setProgramme] = useState({name:"Learning through making",track:"Design",duration:"Half day"});
  const shown = modules.filter(m=>`${m.name} ${m.track}`.toLowerCase().includes(query.toLowerCase()));
  const edit=(module:Module)=>{setDraft({...module});setScreen("Edit module");setError("");setNotice("");};
  const toggle=(id:number)=>setSelected(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id]);
  return <div className="eureka-app"><header><strong>eureka<span>Curriculum workspace</span></strong><span className="study-small">New UI concept · sample content</span></header>
    <div className="eureka-workspace eureka-workspace-v3">
      <nav className="eureka-rail" aria-label="Eureka concept screens">{screens.map(({name,icon:Icon})=><button key={name} aria-pressed={screen===name} onClick={()=>{setScreen(name);setNotice("");setError("");}}><Icon size={17}/>{name}</button>)}</nav>
      <div className="eureka-library">
        <div className="eureka-title"><div><span className="study-kicker">Curriculum</span><h3>{screen}</h3></div>{screen!=="Edit module" && <button className="eureka-action" onClick={()=>edit({id:Math.max(...modules.map(m=>m.id))+1,name:"",track:"Science",detail:"",morsels:0,status:"Draft"})}><Plus size={15}/> New module</button>}</div>
        {screen==="Dashboard" ? <><p className="eureka-intro">Find teaching material and assemble a programme.</p><div className="eureka-overview"><div><strong>{modules.length}</strong><span>Sample modules</span></div><div><strong>{modules.filter(m=>m.status==="Draft").length}</strong><span>Drafts</span></div><div><strong>{selected.length}</strong><span>Selected modules</span></div></div><h4>Module overview</h4><div className="eureka-list">{modules.map(m=><article key={m.id}><div><strong>{m.name}</strong><small>{m.track} · {m.status} · {m.morsels} morsels</small></div><button aria-label={`Edit ${m.name}`} onClick={()=>edit(m)}><Pencil size={15}/></button></article>)}</div></>
        : screen==="Edit module" ? <form className="eureka-editor" onSubmit={event=>{event.preventDefault();if(!draft.name.trim()){setError("Enter a module name.");return;}setModules(current=>current.some(m=>m.id===draft.id)?current.map(m=>m.id===draft.id?{...draft,name:draft.name.trim()}:m):[...current,{...draft,name:draft.name.trim()}]);setScreen("Module library");setQuery("");setNotice("Module saved in this demo. Reloading resets all changes.");}}>
          <label>Module name<input value={draft.name} maxLength={80} aria-invalid={Boolean(error)} aria-describedby={error?"eureka-name-error":undefined} onChange={e=>setDraft({...draft,name:e.target.value})}/></label>
          <label>Track<select value={draft.track} onChange={e=>setDraft({...draft,track:e.target.value})}>{["Science","Tech","Engineering","Design","Math"].map(track=><option key={track}>{track}</option>)}</select></label>
          <label>Description<textarea value={draft.detail} maxLength={300} rows={3} onChange={e=>setDraft({...draft,detail:e.target.value})}/></label>
          <label>Status<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value==="Active"?"Active":"Draft"})}><option>Draft</option><option>Active</option></select></label>
          <p>{draft.morsels} sample morsels. Activity editing is outside this interface study.</p>
          {error && <p id="eureka-name-error" role="alert">{error}</p>}
          <div><button className="eureka-action" type="submit">Save sample module</button> <button type="button" onClick={()=>{setScreen("Module library");setError("");}}>Cancel</button></div>
        </form>
        : <>{screen==="Programme builder" && <div className="eureka-programme-form"><h4>Programme info</h4><label>Programme name<input value={programme.name} maxLength={80} onChange={e=>setProgramme({...programme,name:e.target.value})}/></label><div><label>Track<select value={programme.track} onChange={e=>setProgramme({...programme,track:e.target.value})}>{["Science","Tech","Engineering","Design","Math"].map(track=><option key={track}>{track}</option>)}</select></label><label>Duration<input value={programme.duration} maxLength={40} onChange={e=>setProgramme({...programme,duration:e.target.value})}/></label></div><p>Sample programme details · changes stay in this page.</p></div>}<label className="study-search"><Search size={17}/><span className="sr-only">Search sample modules</span><input placeholder="Find a module" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="eureka-departments">{["Science","Tech","Engineering","Design","Math"].filter(track=>shown.some(m=>m.track===track)).map(track=><section key={track} className="eureka-department"><h4>{track}</h4><div className="eureka-modules">{shown.filter(m=>m.track===track).map(m=><article key={m.id}><span>{m.track} · {m.status}</span><h4>{m.name}</h4><p>{m.detail}</p><footer><small>{m.morsels} morsels</small><div><button aria-label={`Edit ${m.name}`} onClick={()=>edit(m)}><Pencil size={16}/></button><button aria-label={`${selected.includes(m.id)?"Remove":"Add"} ${m.name}`} aria-pressed={selected.includes(m.id)} onClick={()=>toggle(m.id)}>{selected.includes(m.id)?<Check size={17}/>:<Plus size={17}/>}</button></div></footer></article>)}</div></section>)}</div>{!shown.length && <p role="status">No modules match. Clear the search or try another track.</p>}</>}
        {notice && <p role="status" className="eureka-save-note">{notice}</p>}
      </div>
      <aside className="eureka-program"><span className="study-kicker">Your programme</span><h4>{programme.name.trim() || "Untitled programme"}</h4><p>{programme.track} · {programme.duration || "Duration not set"} · sample</p><ol aria-live="polite">{selected.map(id=>{const entry=modules.find(m=>m.id===id);return entry?<li key={id}><span>{entry.name}</span><button aria-label={`Remove ${entry.name} from programme`} onClick={()=>toggle(id)}><X size={14}/></button></li>:null;})}</ol>{!selected.length && <p>Add a module from the library to begin.</p>}<div className="eureka-guidance"><Check size={16}/><span>Keep your selection while browsing or editing.</span></div></aside>
    </div><footer className="eureka-demo-note">Illustrative lessons only. No private curriculum or learner data. Changes are local and reset on reload.</footer>
  </div>;
}
