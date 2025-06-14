"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
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

    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, index * 700);
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <div className="inline-block">
            <div className="glass px-6 py-3 rounded-full neon-glow">
              <span className="text-primary font-mono text-sm">
                ● Available for hire
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-heading text-primary">micci184</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Full Stack Engineer
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-slate">
              & Cloud Architect
            </h3>
            <p className="text-xl md:text-2xl text-slate max-w-2xl mx-auto">
              Building scalable cloud solutions with cutting-edge technologies
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg neon-glow"
            onClick={() => {
              const portfolioComponent = document.getElementById("portfolio");
              if (portfolioComponent) {
                const event = new CustomEvent("changeSection", {
                  detail: { section: "projects" as SectionId },
                });
                portfolioComponent.dispatchEvent(event);
              }
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
            onClick={() => {
              const portfolioComponent = document.getElementById("portfolio");
              if (portfolioComponent) {
                const event = new CustomEvent("changeSection", {
                  detail: { section: "contact" as SectionId },
                });
                portfolioComponent.dispatchEvent(event);
              }
            }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>

        <div className="terminal glass max-w-3xl mx-auto mt-12">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="text-gray-400 text-sm ml-4">
              micci184@cloud-workstation
            </span>
          </div>
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div key={index} className="text-sm">
                {line.startsWith("$") ? (
                  <span className="text-primary">{line}</span>
                ) : line.includes("Account:") ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.includes("Ready") || line.includes("nodes") ? (
                  <span className="text-green-400">{line}</span>
                ) : (
                  <span className="text-cyan-400">{line}</span>
                )}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-primary">$ </span>
              <div className="w-2 h-4 bg-primary ml-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
