"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

// SectionIdをenumとしてエクスポート
export enum SectionId {
  Home = "home",
  About = "about",
  Experience = "experience",
  Projects = "projects",
  Contact = "contact",
}

export default function Portfolio() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Content />
    </div>
  );
}
