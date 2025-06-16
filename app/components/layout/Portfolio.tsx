"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Content from "@/components/layout/Content";
import { ThemeToggle } from "@components/theme-toggle";
import { Button } from "@components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "contact";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false); // Make sure sidebar isn't stuck open in desktop view
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex bg-background text-foreground">
      <div className={cn(!isMobile ? "block" : "hidden")}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
        />
      </div>

      {isMobile && isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="fixed left-0 top-0 z-40 h-full">
            <Sidebar
              activeSection={activeSection}
              setActiveSection={handleSectionChange}
            />
          </div>
        </>
      )}

      <main className="relative flex-1">
        <div className="absolute right-6 top-6 z-50 flex items-center gap-4">
          <ThemeToggle />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu />
              <span className="sr-only">Open sidebar</span>
            </Button>
          )}
        </div>
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
