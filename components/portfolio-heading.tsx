"use client";

import { ui } from "@/lib/i18n";
import { EditorialHeading } from "./editorial-heading";
import { Reveal } from "./motion";
import { useLanguage } from "./language-provider";

export function PortfolioHeading() {
  const { locale } = useLanguage();
  return <Reveal className="portfolio-reveal portfolio-chapter-heading">
    <EditorialHeading eyebrow={ui.portfolio.eyebrow[locale]} before={ui.portfolio.titleBefore[locale]} emphasis={ui.portfolio.titleEmphasis[locale]} />
    <p>{ui.portfolio.description[locale]}</p>
  </Reveal>;
}
