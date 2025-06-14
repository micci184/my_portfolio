"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "contact";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // イベントリスナーを追加して、セクション変更イベントを処理
    const handleSectionChange = (e: Event) => {
      const { section } = (e as CustomEvent<{ section: SectionId }>).detail;
      setActiveSection(section);
    };

    const portfolioElement = document.getElementById("portfolio");
    portfolioElement?.addEventListener(
      "changeSection",
      handleSectionChange as EventListener
    );

    return () => {
      portfolioElement?.removeEventListener(
        "changeSection",
        handleSectionChange as EventListener
      );
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "about":
        return <AboutSection />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div
      id="portfolio"
      className="min-h-screen flex bg-background text-foreground overflow-hidden"
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ease-in-out transform ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          {renderContent()}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
