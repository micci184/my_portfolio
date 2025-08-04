"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionId } from "../../layout/Portfolio";

interface SectionNavigationButtonsProps {
  onSectionChange: (section: SectionId) => void;
}

export default function SectionNavigationButtons({
  onSectionChange,
}: SectionNavigationButtonsProps) {
  const sections = [
    { id: SectionId.About, label: "About" },
    { id: SectionId.Experience, label: "Experience" },
    { id: SectionId.Projects, label: "Projects" },
    { id: SectionId.Contact, label: "Contact" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {sections.map(({ id, label }) => (
        <Button
          key={id}
          variant="outline"
          size="lg"
          className="group border-primary px-4 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          onClick={() => onSectionChange(id)}
        >
          <span>{label}</span>
          <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
      ))}
    </div>
  );
}
