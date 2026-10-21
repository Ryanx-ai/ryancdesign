import { getProjects } from "@/lib/content";
import { ProjectGallery } from "@/components/project-gallery";
import { ScrollStory } from "@/components/scroll-story";
import { PortfolioHeading } from "@/components/portfolio-heading";
import { ContactSection } from "@/components/contact-section";
import { LiveProjectsSection } from "@/components/live-projects-section";

export default function Home() {
  // Keep complete case-study blocks on their server-rendered routes, not in the gallery payload.
  const projects = getProjects().map(({slug,title,summary,year,role,category,featured,cover,thumbnail,gallery})=>({slug,title,summary,year,role,category,featured,cover,thumbnail,gallery}));
  return <main className="landing-experience" id="top">
    <ScrollStory />
    <section className="gallery-section shell" id="portfolio"><PortfolioHeading /><ProjectGallery projects={projects} /></section>
    <LiveProjectsSection />
    <ContactSection />
  </main>;
}
