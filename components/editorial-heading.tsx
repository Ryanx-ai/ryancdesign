import type { ReactNode } from "react";

export function EditorialHeading({ before, emphasis, after, eyebrow, className = "" }: { before?: ReactNode; emphasis: ReactNode; after?: ReactNode; eyebrow?: ReactNode; className?: string }) {
  return <div className={`editorial-heading ${className}`}>{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}<h2>{before ? <>{before}{" "}</> : null}<em>{emphasis}</em>{after ? <>{" "}{after}</> : null}</h2></div>;
}
