"use client";

import Link from "next/link";
import { ui } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

export function ProjectsNavItem() {
  const { locale } = useLanguage();
  return <Link href="/#projects">{ui.navigation.projects[locale]}</Link>;
}
