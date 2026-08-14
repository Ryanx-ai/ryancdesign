"use client";

import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { ProjectsNavItem } from "./projects-nav-item";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";
import { ui } from "@/lib/i18n";

export function Navigation() {
  const { locale } = useLanguage();
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/#top" className="brand" aria-label="Return to top"><BrandMark size={30} /></Link>
    <div className="navlinks">
      <Link href="/#portfolio">{ui.navigation.portfolio[locale]}</Link><Link href="/#contact">{ui.navigation.contact[locale]}</Link><ProjectsNavItem /><LanguageSwitcher />
    </div>
  </nav>;
}
