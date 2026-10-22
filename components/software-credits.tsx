export function SoftwareCredits({tools}:{tools:string[]}) {
  if (!tools.length) return null;
  return <section className="software-credits shell" aria-label="Software used"><h2>Software used</h2><ul>{tools.map(tool=><li key={tool}>{tool}</li>)}</ul></section>;
}
