'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Project } from '@/app/data/projects';
import ProjectLinks from './ProjectLinks';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectFilters from './ProjectFilters';
import { cn } from '@/lib/utils';

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);
  const [focusedProjectIndex, setFocusedProjectIndex] = useState<number>(-1);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // プロジェクトカードクリック時の処理
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // フィルター変更時の処理
  const handleFilterChange = (filtered: Project[]) => {
    setFilteredProjects(filtered);
    // フィルター変更時にフォーカスをリセット
    setFocusedProjectIndex(-1);
  };
  
  // キーボードイベント処理
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, project: Project, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ': // スペースキー
        e.preventDefault();
        handleProjectClick(project);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (index < filteredProjects.length - 1) {
          setFocusedProjectIndex(index + 1);
          projectRefs.current[index + 1]?.focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (index > 0) {
          setFocusedProjectIndex(index - 1);
          projectRefs.current[index - 1]?.focus();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (index + 2 < filteredProjects.length) {
          setFocusedProjectIndex(index + 2);
          projectRefs.current[index + 2]?.focus();
        } else if (index + 1 < filteredProjects.length) {
          setFocusedProjectIndex(index + 1);
          projectRefs.current[index + 1]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index - 2 >= 0) {
          setFocusedProjectIndex(index - 2);
          projectRefs.current[index - 2]?.focus();
        } else if (index - 1 >= 0) {
          setFocusedProjectIndex(index - 1);
          projectRefs.current[index - 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* フィルター */}
      <ProjectFilters projects={initialProjects} onFilterChange={handleFilterChange} />

      {/* プロジェクト一覧 */}
      <section 
        aria-labelledby="projects-heading"
        className="mt-6"
      >
        <h2 id="projects-heading" className="sr-only">プロジェクト一覧</h2>
        <div 
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
          role="list"
          aria-label="プロジェクト一覧"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el: HTMLDivElement | null) => { projectRefs.current[index] = el; }}
                className={cn(
                  "glass group overflow-hidden rounded-2xl transition-all duration-300 hover:neon-glow focus:neon-glow focus:outline-none",
                  "cursor-pointer"
                )}
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => handleKeyDown(e, project, index)}
                tabIndex={0}
                role="listitem"
                aria-label={`プロジェクト: ${project.title}`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6"
                    aria-hidden="false"
                  >
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
                  <div 
                    className="flex flex-wrap gap-2"
                    aria-label="使用技術"
                  >
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span 
                        className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm"
                        aria-label={`その他${project.tech.length - 5}個の技術`}
                      >
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* 期間と役割 */}
                  {(project.period || project.role) && (
                    <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      {project.period && (
                        <div>
                          <dt className="font-medium inline">期間: </dt>
                          <dd className="inline">{project.period}</dd>
                        </div>
                      )}
                      {project.role && (
                        <div>
                          <dt className="font-medium inline">役割: </dt>
                          <dd className="inline">{project.role}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="col-span-full text-center py-12"
              role="alert"
            >
              <p className="text-muted-foreground">条件に一致するプロジェクトがありません</p>
              <Button 
                variant="link" 
                onClick={() => setFilteredProjects(initialProjects)}
                className="mt-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                すべて表示
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* GitHub リンク */}
      <div className="mt-8 text-center md:mt-12">
        <Button
          size="lg"
          variant="outline"
          className="border-primary px-6 py-3 text-base text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-8 sm:py-4"
          asChild
        >
          <a
            href="https://github.com/micci184"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHubですべてのプロジェクトを見る（新しいウィンドウで開く）"
          >
            <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            GitHubですべてのプロジェクトを見る
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
