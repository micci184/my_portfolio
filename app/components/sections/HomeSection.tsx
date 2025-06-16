"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Mail } from "lucide-react";
import { SectionId } from "../layout/Portfolio";

export default function HomeSection() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    // Simulate terminal loading with cloud focus
    const lines = [
      "$ whoami",
      "micci184 - Full Stack Engineer & Cloud Architect",
      "$ cat skills.txt",
      "JavaScript, TypeScript, React, Node.js, AWS, GCP...",
      "$ aws sts get-caller-identity",
      "Account: ************ | Role: CloudArchitect",
      "$ kubectl get nodes",
      "Ready    3 nodes running in production",
      "$ terraform --version",
      "Terraform v1.6.0 on linux_amd64",
      "$ ls projects/",
      "3d-game-engine/ ai-assistant/ cloud-infrastructure/",
      "$ echo 'Ready to build scalable cloud solutions!'",
      "Ready to build scalable cloud solutions!",
      "$",
    ];

    const tids: NodeJS.Timeout[] = [];
    lines.forEach((line, index) => {
      const id = setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, index * 700);
      tids.push(id);
    });

    return () => tids.forEach(clearTimeout);
  }, []);

  // セクション変更のためのハンドラ関数
  const handleSectionChange = (section: SectionId) => {
    const portfolioElement = document.getElementById("portfolio");
    if (portfolioElement) {
      const event = new CustomEvent("changeSection", {
        detail: { section },
      });
      portfolioElement.dispatchEvent(event);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="mx-auto w-full max-w-4xl space-y-6 text-center md:space-y-8">
        <div className="space-y-4 md:space-y-6">
          <div className="inline-block">
            <div className="glass rounded-full px-4 py-2 neon-glow sm:px-6 sm:py-3">
              <span className="font-mono text-xs text-primary sm:text-sm">
                ● Available for hire
              </span>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4">
            <h1 className="font-heading text-primary">micci184</h1>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Full Stack Engineer
            </h2>
            <h3 className="text-xl font-semibold text-muted-foreground sm:text-2xl md:text-3xl">
              & Cloud Architect
            </h3>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Building scalable cloud solutions with cutting-edge technologies
            </p>
          </div>
        </div>

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

        <div className="terminal mx-auto mt-8 max-w-3xl md:mt-12">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="text-gray-400 text-sm ml-4">
              micci184@cloud-workstation
            </span>
          </div>
          <div className="p-4 space-y-2 text-left">
            {terminalLines.map((line, index) => (
              <div key={index} className="text-xs sm:text-sm">
                {line.startsWith("$") ? (
                  <span className="text-primary-foreground dark:text-primary">
                    {line}
                  </span>
                ) : line.includes("Account:") ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.includes("Ready") || line.includes("nodes") ? (
                  <span className="text-green-400">{line}</span>
                ) : (
                  <span className="whitespace-pre-wrap break-words text-cyan-400">
                    {line}
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-primary-foreground dark:text-primary">
                ${" "}
              </span>
              <div className="ml-2 h-4 w-2 animate-pulse bg-primary-foreground dark:bg-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
