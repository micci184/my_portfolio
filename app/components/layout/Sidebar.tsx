"use client";

import * as React from "react";
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
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { SectionId } from "./Portfolio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";

interface NavItemData {
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
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobile: boolean;
}

interface NavItemProps {
  item: NavItemData;
  activeSection: SectionId;
  isCollapsed: boolean;
  onClick: () => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  isCollapsed,
  setIsCollapsed,
  isMobile,
}: SidebarProps) {
  const navItems: NavItemData[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Send },
  ];

  const socialItems: SocialItem[] = [
    { name: "GitHub", icon: Github, href: "https://github.com/micci184" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/micci184" },
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

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
      aria-label="サイトナビゲーション"
      id={isMobile ? "mobile-sidebar" : "desktop-sidebar"}
    >
      <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-4">
        <nav
          className="flex flex-col gap-y-2"
          role="navigation"
          aria-label="メインナビゲーション"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              activeSection={activeSection}
              isCollapsed={isCollapsed}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col items-center gap-y-4 p-4">
        <div
          className={cn(
            "flex items-center justify-center",
            isCollapsed ? "flex-col gap-y-4" : "gap-x-4"
          )}
          role="list"
          aria-label="ソーシャルリンク"
        >
          {socialItems.map((item) => (
            <SocialItem key={item.name} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-pressed={isCollapsed}
            aria-label={
              isCollapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"
            }
          >
            {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
            <span className="sr-only">
              {isCollapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
            </span>
          </Button>
        )}
      </div>
    </aside>
  );
}

function NavItem({ item, activeSection, onClick, isCollapsed }: NavItemProps) {
  const isActive = activeSection === item.id;
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              variant={isActive ? "default" : "ghost"}
              className="h-12 w-12"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant={isActive ? "default" : "ghost"}
      className="h-12 w-full justify-start gap-x-4 px-4"
      aria-current={isActive ? "page" : undefined}
    >
      <item.icon className="h-6 w-6" />
      <span>{item.label}</span>
    </Button>
  );
}

function SocialItem({
  item,
  isCollapsed,
}: {
  item: SocialItem;
  isCollapsed: boolean;
}) {
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${item.name}を開く（新しいタブ）`}
              role="listitem"
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">{item.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-foreground"
      aria-label={`${item.name}を開く（新しいタブ）`}
      role="listitem"
    >
      <item.icon className="h-5 w-5" />
      <span className="sr-only">{item.name}</span>
    </a>
  );
}
