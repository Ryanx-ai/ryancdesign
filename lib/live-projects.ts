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
    image: "/projects/shinysim/final-desktop.jpg",
    imageAlt: "ShinySim's deployed simulator workspace",
    mediaFit: "cover",
    status: "live",
    visible: true,
    caseStudyUrl: "/projects/shinysim",
    liveUrl: "https://shiny-simulator-6997a1geq-pangea6.vercel.app/",
  },
  {
    slug: "luna-vault",
    name: "Luna Vault",
    description: "A living workspace for professional brand handover, governance, and confident asset sharing.",
    image: "/projects/luna-vault-full.png",
    imageAlt: "Luna Vault",
    mediaFit: "contain",
    status: "coming-soon",
    visible: true,
  },
];

export function getVisibleLiveProjects() {
  return liveProjects.filter((project) => project.visible);
}
