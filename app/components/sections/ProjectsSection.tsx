import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { projects } from "@/app/data/projects";

// クライアントコンポーネントのインタラクティブな部分を分離するためのコンポーネント
import ProjectLinks from "./client/ProjectLinks";

export function ProjectsSection() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <div
                key={project.id}
                className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:neon-glow"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56"
                    priority={project.featured}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />

                  {/* Link Icons - クライアントコンポーネントに分離 */}
                  <ProjectLinks github={project.github} live={project.live} />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-light-slate">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8 text-center md:mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary px-6 py-3 text-base text-primary hover:bg-primary/10 sm:px-8 sm:py-4"
            asChild
          >
            <a
              href="https://github.com/micci184"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
