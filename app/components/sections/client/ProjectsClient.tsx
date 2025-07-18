'use client';

import { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Project, projects } from '@/app/data/projects';
import ProjectLinks from './ProjectLinks';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectFilters from './ProjectFilters';

export default function ProjectsClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // プロジェクトカードクリック時の処理
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // フィルター変更時の処理
  const handleFilterChange = (filtered: Project[]) => {
    setFilteredProjects(filtered);
  };

  return (
    <>
      {/* フィルター */}
      <ProjectFilters projects={projects} onFilterChange={handleFilterChange} />

      {/* プロジェクト一覧 */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:neon-glow cursor-pointer"
              onClick={() => handleProjectClick(project)}
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

                {/* Link Icons */}
                <ProjectLinks github={project.github} live={project.live} />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-light-slate line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* 技術タグ */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* 期間と役割 */}
                {(project.period || project.role) && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {project.period && (
                      <div>
                        <span className="font-medium">期間:</span> {project.period}
                      </div>
                    )}
                    {project.role && (
                      <div>
                        <span className="font-medium">役割:</span> {project.role}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">条件に一致するプロジェクトがありません</p>
            <Button 
              variant="link" 
              onClick={() => setFilteredProjects(projects)}
              className="mt-2"
            >
              すべて表示
            </Button>
          </div>
        )}
      </div>

      {/* GitHub リンク */}
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

      {/* プロジェクト詳細モーダル */}
      <ProjectDetailModal 
        project={selectedProject} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
}