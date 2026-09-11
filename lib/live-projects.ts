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
    image: "/projects/checkmate/checkmate-v1-hero.jpg",
    imageAlt: "Pokémon Checkmate Galaxy V1: cosmic board, team synergies, Pokémon details and Wormhole Market",
    mediaFit: "cover",
    status: "prototype",
    category: "Game Systems / UIUX / Development",
    visible: true,
    caseStudyUrl: "/projects/checkmate",
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
