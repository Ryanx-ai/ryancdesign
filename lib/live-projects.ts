export type LiveProject = {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  mediaFit: "cover" | "contain" | "wordmark";
  status: "live" | "prototype" | "coming-soon";
  category?: string;
  /** Only visible projects are included in public project surfaces and metadata. */
  visible: boolean;
  caseStudyUrl?: string;
  liveUrl?: string;
};

export const liveProjects: LiveProject[] = [
  {
    slug: "shinysim",
    name: "ShinySim",
    description: "Born from my love for Pokémon — an experiment in global API data, probability, and the RNG systems behind games.",
    image: "/projects/shinysim/shinysim-logo.svg",
    imageAlt: "ShinySim logo",
    mediaFit: "wordmark",
    status: "live",
    visible: true,
    caseStudyUrl: "/projects/shinysim",
    liveUrl: "https://shiny-simulator.vercel.app/",
  },
  {
    slug: "checkmate",
    name: "Pokémon Checkmate: Galaxy",
    description: "Translating Pokémon team-building into a competitive browser auto-battler through systems design, interaction and a playable multiplayer prototype.",
    image: "/projects/checkmate/checkmate-logo.png",
    imageAlt: "Pokémon Checkmate: Galaxy logo",
    mediaFit: "contain",
    status: "prototype",
    category: "Game Systems / UIUX / Development",
    visible: true,
    caseStudyUrl: "/projects/checkmate",
    liveUrl: "https://pkmn-checkmate-galaxy.vercel.app",
  },
  {
    slug: "pangea",
    name: "Pangea",
    description: "A living world simulation where digital lives grow, learn and adapt. You shape the environment. They shape what comes next.",
    image: "/projects/pangea/pangea-card.svg",
    imageAlt: "The original Pangea leaf and wordmark, rendered in dark green pixels on light green",
    mediaFit: "cover",
    status: "coming-soon",
    category: "Artificial Life / Simulation / Speculative Design",
    visible: true,
    caseStudyUrl: "/projects/pangea",
  },
  {
    slug: "tosker",
    name: "Tosker",
    description: "A shared digital room for the things we do together.",
    image: "/projects/toskerlogo-full-white.svg",
    imageAlt: "Tosker",
    mediaFit: "contain",
    status: "coming-soon",
    visible: true,
  },
];

export function getVisibleLiveProjects() {
  return liveProjects.filter((project) => project.visible);
}
