export type LiveProject = {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  mediaFit: "cover" | "contain";
  status: "live" | "coming-soon";
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
    image: "/projects/shinysim/shinysim-logo.png",
    imageAlt: "ShinySim logo",
    mediaFit: "contain",
    status: "live",
    visible: true,
    caseStudyUrl: "/projects/shinysim",
    liveUrl: "https://shiny-simulator.vercel.app/",
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
