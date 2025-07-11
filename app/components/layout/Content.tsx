"use client";

import { useEffect, useRef } from "react";
import { SectionId } from "./Portfolio";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

const sections: { id: SectionId; component: React.FC; label: string }[] = [
  { id: "home", component: HomeSection, label: "ホーム" },
  { id: "about", component: AboutSection, label: "自己紹介" },
  { id: "experience", component: ExperienceSection, label: "経歴" },
  { id: "projects", component: ProjectsSection, label: "プロジェクト" },
  { id: "contact", component: ContactSection, label: "お問い合わせ" },
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

      // スクリーンリーダーのためのフォーカス管理
      const focusableElement = sectionElement.querySelector(
        'button, [tabindex="0"]'
      );
      if (focusableElement instanceof HTMLElement) {
        // タイマーを設定してスクロールが完了した後にフォーカスを移動
        setTimeout(() => {
          focusableElement.focus();
        }, 500);
      }
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      aria-live="polite"
      role="region"
      aria-label="ポートフォリオセクション"
    >
      {sections.map(({ id, component: Component, label }) => (
        <section
          key={id}
          id={id}
          className="h-screen snap-center pt-24"
          aria-label={label}
          tabIndex={activeSection === id ? 0 : -1}
          aria-hidden={activeSection !== id}
        >
          <Component />
        </section>
      ))}
    </div>
  );
}
