"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Content } from "./Content";
import { ThemeToggle } from "../../../components/theme-toggle";
import { Button } from "../../../components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "../../../lib/utils";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "contact";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile overlay
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // For desktop collapse
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
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

  const sidebarProps = {
    activeSection,
    setActiveSection: handleSectionChange,
    isCollapsed: isSidebarCollapsed,
    setIsCollapsed: setIsSidebarCollapsed,
    isMobile,
  };

  return (
    <div id="portfolio" className="flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar {...sidebarProps} isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-30 bg-black/60 transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar {...sidebarProps} isCollapsed={false} />
      </div>

      <main
        className={cn(
          "relative flex-1 transition-all duration-300 ease-in-out",
          !isMobile && (isSidebarCollapsed ? "md:ml-20" : "md:ml-64")
        )}
      >
        <div className="absolute right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
          <ThemeToggle />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-full"
            >
              {isSidebarOpen ? <X /> : <Menu />}
              <span className="sr-only">
                {isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              </span>
            </Button>
          )}
        </div>
        <Content activeSection={activeSection} />
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-1/4 top-1/4 h-72 w-72 animate-pulse-slow rounded-full bg-primary/10 blur-3xl"></div>
          <div className="delay-2000 absolute bottom-1/4 left-1/4 h-72 w-72 animate-pulse-slow rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}
