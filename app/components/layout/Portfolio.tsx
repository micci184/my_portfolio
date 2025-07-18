"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { ThemeToggle } from "../../../components/theme-toggle";
import { Button } from "../../../components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useMediaQuery } from "../hooks/useMediaQuery";

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
  
  // useMediaQueryフックを使用して、メディアクエリの変更を監視
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // モバイル表示時にサイドバーを閉じる
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const portfolioElement = document.getElementById("portfolio");
    if (portfolioElement) {
      const handleSectionChange = (event: Event) => {
        const customEvent = event as CustomEvent<{ section: SectionId }>;
        setActiveSection(customEvent.detail.section);
        if (isMobile) {
          setIsSidebarOpen(false);
        }
      };
      portfolioElement.addEventListener("changeSection", handleSectionChange);
      return () => {
        portfolioElement.removeEventListener(
          "changeSection",
          handleSectionChange
        );
      };
    }
  }, [isMobile]);

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

      {/* Mobile Sidebar Overlay - モバイル表示時のオーバーレイ */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-30 bg-black/60 transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* モバイルサイドバー - 表示時のみレンダリング */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed left-0 top-0 z-40 h-full transition-transform duration-300 ease-in-out translate-x-0"
        >
          <Sidebar {...sidebarProps} isCollapsed={false} />
        </div>
      )}

      <main
        className={cn(
          "relative flex-1 transition-all duration-300 ease-in-out",
          !isMobile && (isSidebarCollapsed ? "md:ml-20" : "md:ml-64")
        )}
        role="main"
        aria-label="ポートフォリオコンテンツ"
      >
        <div className="absolute right-4 top-4 z-50 flex items-center gap-3 sm:right-6 sm:top-6">
          <ThemeToggle />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="h-12 w-12 rounded-full" // タッチターゲットサイズを大きく
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-sidebar"
              aria-label={
                isSidebarOpen ? "サイドバーを閉じる" : "サイドバーを開く"
              }
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">
                {isSidebarOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
              </span>
            </Button>
          )}
        </div>
        
        {/* コンテンツセクション */}
        <Content activeSection={activeSection} />
        
        {/* 背景エフェクト - モバイルではエフェクトを簡素化 */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          {/* モバイルでは小さく、エフェクトを簡素化 */}
          <div className={`absolute right-1/4 top-1/4 ${isMobile ? 'h-48 w-48' : 'h-72 w-72'} animate-pulse-slow rounded-full bg-primary/10 blur-3xl`}></div>
          {!isMobile && (
            <div className="delay-2000 absolute bottom-1/4 left-1/4 h-72 w-72 animate-pulse-slow rounded-full bg-secondary/10 blur-3xl"></div>
          )}
        </div>
      </main>
    </div>
  );
}