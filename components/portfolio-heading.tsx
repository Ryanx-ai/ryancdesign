"use client";

import { ui } from "@/lib/i18n";
import { Reveal } from "./motion";
import { useLanguage } from "./language-provider";

export function PortfolioHeading() {
  const { locale } = useLanguage();
  return <Reveal className="portfolio-reveal"><h2>{ui.portfolio.title[locale]}</h2><p>{ui.portfolio.subtitle[locale]}</p></Reveal>;
}
