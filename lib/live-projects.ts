export type LiveProject = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  /** Only visible projects are included in public project surfaces and metadata. */
  visible: boolean;
  caseStudyUrl: string;
  liveUrl: string;
};

export const liveProjects: LiveProject[] = [
  {
    slug: "shinysim",
    name: "ShinySim",
    image: "/projects/shinysim/final-desktop.jpg",
    imageAlt: "ShinySim's deployed simulator workspace",
    visible: true,
    caseStudyUrl: "/projects/shinysim",
    liveUrl: "https://shiny-simulator-6997a1geq-pangea6.vercel.app/",
  },
];

export function getVisibleLiveProjects() {
  return liveProjects.filter((project) => project.visible);
}
