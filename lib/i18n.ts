export type Locale = "en" | "zh";
export type LocalizedText = Record<Locale, string>;

export const localeStorageKey = "rcd-locale";

export const ui = {
  navigation: {
    portfolio: { en: "Portfolio", zh: "作品集" },
    contact: { en: "Contact", zh: "联系" },
    projects: { en: "Projects", zh: "项目" },
    comingSoon: { en: "Coming Soon", zh: "即将推出" },
  },
  portfolio: {
    title: { en: "Portfolio", zh: "作品集" },
    subtitle: { en: "Exploratory · Speculative · Applied", zh: "探索 · 推演 · 实践" },
    showAll: { en: "Show all", zh: "查看全部" },
    hideAll: { en: "Hide all", zh: "收起" },
  },
  contact: {
    heading: { en: "Let’s connect.", zh: "保持联系。" },
    email: { en: "Email", zh: "电邮" },
    whatsapp: { en: "WhatsApp", zh: "WhatsApp" },
    linkedin: { en: "LinkedIn", zh: "LinkedIn" },
    github: { en: "GitHub", zh: "GitHub" },
    resume: { en: "Résumé", zh: "履历" },
  },
  ryan: {
    heading: { en: "I am Ryan.", zh: "我是 Ryan。" },
    roles: {
      en: ["Builder", "Designer", "Strategist", "Entrepreneur"],
      zh: ["创造者", "设计师", "策略师", "创业者"],
    },
  },
} satisfies Record<string, unknown>;

export function localize(text: LocalizedText, locale: Locale) {
  return text[locale];
}
