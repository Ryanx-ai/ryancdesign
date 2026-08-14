"use client";

import { useEffect, useRef, useState } from "react";

export function ProjectsNavItem() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  function reveal() {
    setOpen(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 1800);
  }

  return <button
    type="button"
    className="branding-link"
    data-tooltip="Coming Soon"
    data-open={open || undefined}
    onClick={reveal}
    onBlur={() => setOpen(false)}
    aria-label="Projects — coming soon"
  >Projects</button>;
}
