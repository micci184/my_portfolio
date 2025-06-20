"use client";

import { Github, ExternalLink } from "lucide-react";

interface ProjectLinksProps {
  github: string;
  live: string;
}

export default function ProjectLinks({ github, live }: ProjectLinksProps) {
  return (
    <div className="absolute top-3 right-3 flex gap-2 sm:top-4 sm:right-4">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="glass flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow sm:h-10 sm:w-10"
      >
        <Github className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </a>
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className="glass flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow sm:h-10 sm:w-10"
      >
        <ExternalLink className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </a>
    </div>
  );
}
