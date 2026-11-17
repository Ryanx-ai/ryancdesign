export type LiveProject = {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  mediaFit: "cover" | "contain" | "wordmark";
  status: "live" | "prototype" | "coming-soon" | "paused";
  category?: string;
  /** Only visible projects are included in public project surfaces and metadata. */
  visible: boolean;
  caseStudyUrl?: string;
  liveUrl?: string;
};

export const liveProjects: LiveProject[] = [
  {
    slug: "tosker",
    name: "Tosker",
    description: "Born from travelling with friends. A shared map for the places, plans and conversations that make a trip together.",
    image: "/projects/tosker/wordmark.svg",
    imageAlt: "Tosker — gold squirrel and ivory wordmark",
    mediaFit: "contain",
    status: "paused",
    category: "Brand / Product design / Development",
    visible: true,
    caseStudyUrl: "/projects/tosker",
  },
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
];

export function getVisibleLiveProjects() {
  return liveProjects.filter((project) => project.visible);
}
