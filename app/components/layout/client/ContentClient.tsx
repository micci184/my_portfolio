"use client";

import { useEffect, useRef } from "react";
import { SectionId } from "../Portfolio";

interface ContentClientProps {
  activeSection: SectionId;
  children: React.ReactNode;
}

export function ContentClient({ activeSection, children }: ContentClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = document.getElementById(activeSection);
    if (sectionElement && containerRef.current) {
      containerRef.current.scrollTo({
        top: sectionElement.offsetTop,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {children}
    </div>
  );
}
