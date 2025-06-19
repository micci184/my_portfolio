"use client";

import { Button } from "@/components/ui/button";
import { Play, Mail } from "lucide-react";
import { SectionId } from "@/components/layout/Portfolio";

interface SectionNavigationButtonsProps {
  onSectionChange: (section: SectionId) => void;
}

export default function SectionNavigationButtons({
  onSectionChange,
}: SectionNavigationButtonsProps) {
  // セクション変更のためのハンドラ関数
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
      // 正常時：イベント後にコールバック実行
      onSectionChange(section);
    } catch (error) {
      console.error("Error during section navigation:", error);
      // フォールバック：直接コールバックを実行
      onSectionChange(section);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        size="lg"
        className="w-full bg-primary px-6 py-3 text-base text-primary-foreground hover:bg-primary/90 neon-glow sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
        onClick={() => handleSectionChange("projects")}
      >
        <Play className="mr-2 h-5 w-5" />
        View My Work
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full border-primary px-6 py-3 text-base text-primary hover:bg-primary/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
        onClick={() => handleSectionChange("contact")}
      >
        <Mail className="mr-2 h-5 w-5" />
        Get In Touch
      </Button>
    </div>
  );
}
