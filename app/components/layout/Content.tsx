"use client";

import { useEffect, useRef } from "react";
import { SectionId } from "./Portfolio";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

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

export default function Content({ activeSection }: ContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = document.getElementById(activeSection);
    if (sectionElement && containerRef.current) {
      containerRef.current.scrollTo({
        top: sectionElement.offsetTop,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {sections.map(({ id, component: Component }) => (
        <section key={id} id={id} className="h-screen snap-center">
          <Component />
        </section>
      ))}
    </div>
  );
}
