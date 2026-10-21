"use client";

import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { ProjectsNavItem } from "./projects-nav-item";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";
import { ui } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.getElementById("navigation-toggle")?.focus(); } };
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/#top" className="brand" aria-label="Return to top"><BrandMark size={30} /></Link>
    <div className="mobile-nav-actions"><Link className="resume-cta" href="/resume">{ui.navigation.resume[locale]}</Link><button id="navigation-toggle" aria-controls="primary-links" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div>
    <div className={`navlinks${open ? " is-open" : ""}`} id="primary-links" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
      <Link href="/#portfolio">{ui.navigation.portfolio[locale]}</Link><ProjectsNavItem /><Link className="resume-cta" href="/resume">{ui.navigation.resume[locale]}</Link><Link href="/#contact">{ui.navigation.contact[locale]}</Link><LanguageSwitcher />
    </div>
  </nav>;
}
