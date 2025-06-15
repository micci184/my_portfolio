"use client";

import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Terminal,
  Code,
  Zap,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";
import { SectionId } from "./Portfolio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  id: SectionId;
  name: string;
  icon: React.ElementType;
}

interface SocialItem {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

interface SidebarProps {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const navItems: NavItem[] = [
    { id: "home", name: "Home", icon: Terminal },
    { id: "about", name: "About", icon: Code },
    { id: "experience", name: "Experience", icon: Zap },
    { id: "projects", name: "Projects", icon: Globe },
    { id: "contact", name: "Contact", icon: Mail },
  ];

  const socialItems: SocialItem[] = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/micci184",
      color: "#333",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/micci184",
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/micci184",
      color: "#0077B5",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/micci184",
      color: "#E4405F",
    },
  ];

  return (
    <div className="w-80 glass border-r border-border/20 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-border/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center neon-glow">
            <span className="text-background font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">micci184</h1>
            <p className="text-sm text-slate">Cloud Engineer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {navItems.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
                activeSection === id
                  ? "bg-primary/10 text-primary border border-primary/20 neon-glow"
                  : "text-slate hover:text-white hover:bg-muted/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{name}</span>
              {activeSection === id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Social Links */}
      <div className="p-6 border-t border-border/20">
        <div className="flex justify-center gap-4">
          {socialItems.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:neon-glow transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 text-slate group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="p-6 border-t border-border/20">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate">Available for work</span>
        </div>
      </div>

      <div className="mt-auto p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
