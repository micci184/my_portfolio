"use client";

import { useEffect, useRef, useState } from "react";
import { SectionId } from "./Portfolio";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";
import { useMediaQuery } from "../hooks/useMediaQuery";

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // スクロール動作を最適化
  useEffect(() => {
    const sectionElement = document.getElementById(activeSection);
    if (sectionElement && containerRef.current) {
      // スクロール動作を最適化
      containerRef.current.scrollTo({
        top: sectionElement.offsetTop,
        behavior: isMobile ? "auto" : "smooth", // モバイルではスムーススクロールを無効化してパフォーマンス改善
      });

      // スクリーンリーダーのためのフォーカス管理
      const focusableElement = sectionElement.querySelector(
        'button, [tabindex="0"], input, select, textarea, [href]'
      );
      if (focusableElement instanceof HTMLElement) {
        // スクロールアニメーションの完了を監視
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                focusableElement.focus({ preventScroll: true });
                observer.disconnect();
              }
            });
          },
          { threshold: 0.5 } // 閾値を下げてより早くフォーカスする
        );
        observer.observe(sectionElement);
      }
    }
  }, [activeSection, isMobile]);

  // スワイプジェスチャーの処理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // 最小スワイプ距離
    
    if (!isSignificantSwipe) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex === -1) return;

    // スワイプ方向に基づいて次または前のセクションに移動
    const portfolioElement = document.getElementById("portfolio");
    if (portfolioElement) {
      if (distance > 0 && currentIndex < sections.length - 1) {
        // 上にスワイプした場合は次のセクションへ
        const nextSection = sections[currentIndex + 1].id;
        portfolioElement.dispatchEvent(
          new CustomEvent("changeSection", { detail: { section: nextSection } })
        );
      } else if (distance < 0 && currentIndex > 0) {
        // 下にスワイプした場合は前のセクションへ
        const prevSection = sections[currentIndex - 1].id;
        portfolioElement.dispatchEvent(
          new CustomEvent("changeSection", { detail: { section: prevSection } })
        );
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll overscroll-none snap-y snap-mandatory"
      aria-live="polite"
      role="region"
      aria-label="ポートフォリオセクション"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {sections.map(({ id, component: Component, label }) => (
        <section
          key={id}
          id={id}
          className={`h-screen snap-center ${isMobile ? 'pt-16' : 'pt-24'}`}
          aria-label={label}
          tabIndex={0}
          aria-current={activeSection === id ? "true" : "false"}
        >
          <Component />
        </section>
      ))}
    </div>
  );
}