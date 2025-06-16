"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Content from "@/components/layout/Content";
import Header from "@/components/layout/Header";
import { ThemeToggle } from "@components/theme-toggle";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "contact";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
  };

  return (
    <div className="flex bg-background text-foreground">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="relative flex-1 overflow-y-auto">
        <ThemeToggle className="absolute right-6 top-6 z-50" />
        <Header />
        <Content activeSection={activeSection} />
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>
      </main>
    </div>
  );
}
