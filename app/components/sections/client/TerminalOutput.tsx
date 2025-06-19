"use client";

import { useState, useEffect } from "react";

interface TerminalOutputProps {
  initialLines?: string[];
}

export default function TerminalOutput({
  initialLines = [],
}: TerminalOutputProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>(initialLines);

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

  return (
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
          <span className="text-primary-foreground dark:text-primary">$ </span>
          <div className="ml-2 h-4 w-2 animate-pulse bg-primary-foreground dark:bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
