"use client";

import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return <div className="language-switcher" role="group" aria-label="Language">
    <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" className={locale === "zh" ? "active" : ""} onClick={() => setLocale("zh")} aria-pressed={locale === "zh"}>中文</button>
  </div>;
}
