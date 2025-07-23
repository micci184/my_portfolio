import { SectionId } from "./Portfolio";
import { HomeSection } from "../sections/HomeSection";
import { AboutSection } from "../sections/AboutSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ContactSection } from "../sections/ContactSection";
import { ContentClient } from "./client/ContentClient";

const sections: { id: SectionId; component: React.FC }[] = [
  { id: "home", component: HomeSection },
  { id: "about", component: AboutSection },
  { id: "experience", component: ExperienceSection },
  { id: "projects", component: ProjectsSection },
  { id: "contact", component: ContactSection },
];

interface ContentProps {
  activeSection: SectionId;
}

export function Content({ activeSection }: ContentProps) {
  return (
    <ContentClient activeSection={activeSection}>
      {sections.map(({ id, component: Component }) => (
        <section key={id} id={id} className="h-screen snap-center pt-24">
          <Component />
        </section>
      ))}
    </ContentClient>
  );
}
