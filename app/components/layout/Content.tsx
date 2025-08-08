"use client";

import { useEffect, useState } from "react";
import { SectionId } from "./Portfolio";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Content() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [visibleSections, setVisibleSections] = useState<SectionId[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // スクロール検出とアクティブセクション更新
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return; // モバイルではスクロール検出を無効化

      const sections = [
        { id: SectionId.Home, ref: document.getElementById(SectionId.Home) },
        { id: SectionId.About, ref: document.getElementById(SectionId.About) },
        { id: SectionId.Experience, ref: document.getElementById(SectionId.Experience) },
        { id: SectionId.Projects, ref: document.getElementById(SectionId.Projects) },
        { id: SectionId.Contact, ref: document.getElementById(SectionId.Contact) },
      ];

      const visible: SectionId[] = [];
      let newActiveSection = activeSection;

      // 各セクションの可視性をチェック
      sections.forEach(({ id, ref }) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

        if (isVisible) {
          visible.push(id);
          newActiveSection = id;
        }
      });

      setVisibleSections(visible);
      if (visible.length > 0) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期化時に一度実行

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, isMobile]);

  return (
    <main className="flex flex-col">
      <section id={SectionId.Home} className="h-screen">
        <HomeSection />
      </section>

      <section id={SectionId.About} className="min-h-screen">
        <AboutSection />
      </section>

      <section id={SectionId.Experience} className="min-h-screen">
        <ExperienceSection />
      </section>

      <section id={SectionId.Projects} className="min-h-screen">
        <ProjectsSection />
      </section>

      <section id={SectionId.Contact} className="min-h-screen">
        <ContactSection />
      </section>
    </main>
  );
}
