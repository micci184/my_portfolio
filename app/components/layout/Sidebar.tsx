"use client";

import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Send,
} from "lucide-react";
import { SectionId } from "@/components/layout/Portfolio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ThemeToggle } from "@components/theme-toggle";

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ElementType;
}

interface SocialItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

interface NavItemProps {
  item: NavItem;
  activeSection: SectionId;
  onClick: () => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Send },
  ];

  const socialItems: SocialItem[] = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/micci184",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/micci184",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/micci184",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/micci184",
    },
  ];

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-20 flex-col items-center justify-between border-r border-border bg-card py-8">
      <div className="flex flex-col items-center gap-y-6">
        <nav className="flex flex-col items-center gap-y-4">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              activeSection={activeSection}
              onClick={() => handleSectionChange(item.id)}
            />
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-y-6">
        <ThemeToggle />
        {socialItems.map(({ name, icon: Icon, href }) => (
          <TooltipProvider key={name}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{name}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">{name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  );
}

function NavItem({ item, activeSection, onClick }: NavItemProps) {
  const isActive = activeSection === item.id;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
