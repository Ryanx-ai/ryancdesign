export type ProjectTag = "BRANDING" | "DEV" | "UX";
export type BuiltProjectStatus = "active" | "coming-soon";

export type BuiltProject = {
  slug: string;
  title: string;
  tags: ProjectTag[];
  status: BuiltProjectStatus;
  descriptor: string;
  summary?: string;
  media: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  details?: string[];
  sourceNote?: string;
};

export const builtProjects: BuiltProject[] = [
  {
    slug: "shiny-pokemon-simulator",
    title: "Shiny Pokémon Simulator",
    tags: ["DEV"],
    status: "active",
    descriptor: "An encounter simulator being rebuilt for the modern web.",
    summary: "The original Flask application supports manual and Spacebar encounters, automatic hunting until a shiny appears, editable Pokémon names and configurable encounter rates.",
    media: [],
    details: ["Original: Python · Flask · HTML · CSS", "Future rebuild: Next.js · TypeScript · React"],
    sourceNote: "Authentic Python source catalogued locally; no screenshots published yet.",
  },
  {
    slug: "kuro-cat-hotel",
    title: "Kuro Cat Hotel",
    tags: ["BRANDING", "UX"],
    status: "active",
    descriptor: "A flexible identity system for a contemporary cat hotel.",
    summary: "A concise brand story spanning adaptive marks, typography, colour, motifs, physical applications and digital expression.",
    media: ["/projects/kuro/kuro-hotel.jpg", "/projects/kuro/kuro-wordmark.svg"],
    liveUrl: "https://kurocats.sg",
    details: ["Identity · Brand system · Applications", "Helvetica Neue · Garamond"],
    sourceNote: "Preview uses authentic Kuro photography and an original brand-system wordmark.",
  },
  { slug: "luna", title: "Luna", tags: ["DEV", "UX"], status: "coming-soon", descriptor: "Coming soon.", media: [] },
  { slug: "cheshire", title: "Cheshire", tags: ["DEV"], status: "coming-soon", descriptor: "Coming soon.", media: [] },
];
