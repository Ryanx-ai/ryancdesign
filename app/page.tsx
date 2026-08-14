import { getProjects } from "@/lib/content";
import { ProjectGallery } from "@/components/project-gallery";
import { ScrollStory } from "@/components/scroll-story";
import { PortfolioHeading } from "@/components/portfolio-heading";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const projects = getProjects();
  return <main className="landing-experience" id="top">
    <ScrollStory />
    <section className="gallery-section shell" id="portfolio"><PortfolioHeading /><ProjectGallery projects={projects} /></section>
    <ExperienceSection />
    <ContactSection />
  </main>;
}
