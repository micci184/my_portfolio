"use client";

import { Button } from "@/components/ui/button";
import { Play, Mail } from "lucide-react";
import { SectionId } from "@/app/components/layout/Portfolio";

interface SectionNavigationButtonsProps {
  onSectionChange: (section: SectionId) => void;
}

export default function SectionNavigationButtons({
  onSectionChange,
}: SectionNavigationButtonsProps) {
  const handleSectionChange = (section: SectionId) => {
    try {
      const portfolioElement = document.getElementById("portfolio");
      if (portfolioElement) {
        const event = new CustomEvent("changeSection", {
          detail: { section },
        });
        portfolioElement.dispatchEvent(event);
      } else {
        console.warn("Portfolio element not found for section navigation");
      }
      onSectionChange(section);
    } catch (error) {
      console.error("Error during section navigation:", error);
      // フォールバック：直接コールバックを実行
      onSectionChange(section);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      role="navigation"
      aria-label="セクションナビゲーション"
    >
      <Button
        size="lg"
        className="w-full bg-primary px-6 py-3 text-base text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none neon-glow sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
        onClick={() => handleSectionChange("projects")}
        aria-label="プロジェクトセクションを表示"
      >
        <Play className="mr-2 h-5 w-5" aria-hidden="true" />
        <span>View My Work</span>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full border-primary px-6 py-3 text-base text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
        onClick={() => handleSectionChange("contact")}
        aria-label="お問い合わせセクションを表示"
      >
        <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
        <span>Get In Touch</span>
      </Button>
    </div>
  );
}
