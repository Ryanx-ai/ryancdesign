"use client";

import { useEffect, useRef, useState } from "react";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

export function ProjectsNavItem() {
  const { locale } = useLanguage();
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
    data-tooltip={ui.navigation.comingSoon[locale]}
    data-open={open || undefined}
    onClick={reveal}
    onBlur={() => setOpen(false)}
    aria-label={`${ui.navigation.projects[locale]} — ${ui.navigation.comingSoon[locale]}`}
  >{ui.navigation.projects[locale]}</button>;
}
