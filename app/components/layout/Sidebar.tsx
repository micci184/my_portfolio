"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionId } from "./Portfolio";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [isMounted, setIsMounted] = useState(false);

  // クライアントサイドでのみマウント状態を更新
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSectionClick = (section: SectionId) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onToggle(); // サイドバーを閉じる
  };

  // サーバーサイドレンダリング時は何も表示しない
  if (!isMounted) return null;

  const sections = [
    { id: SectionId.Home, label: "Home" },
    { id: SectionId.About, label: "About" },
    { id: SectionId.Experience, label: "Experience" },
    { id: SectionId.Projects, label: "Projects" },
    { id: SectionId.Contact, label: "Contact" },
  ];

  return (
    <>
      {/* モバイルメニューボタン */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>

      {/* サイドバー */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out md:translate-x-0 md:border-r md:border-border",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="mt-16 md:mt-8">
            <div className="mb-8 text-center">
              <h1 className="text-xl font-bold text-primary">micci184</h1>
              <p className="text-sm text-muted-foreground">Full Stack Engineer</p>
            </div>

            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  className={cn(
                    "w-full rounded-md px-4 py-2 text-left text-sm transition-colors",
                    activeSection === id
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => handleSectionClick(id)}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} micci184
          </div>
        </div>
      </div>

      {/* オーバーレイ（モバイルのみ） */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}
