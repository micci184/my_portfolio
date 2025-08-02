'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/app/data/projects';

interface ProjectFiltersProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export default function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
  // すべての技術を抽出
  const [technologies, setTechnologies] = useState<string[]>([]);
  
  // 選択されたフィルター
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  // 技術の一覧を初期化
  useEffect(() => {
    const allTechnologies = new Set<string>();

    projects.forEach(project => {
      // 技術の追加
      project.tech.forEach(tech => allTechnologies.add(tech));
    });

    setTechnologies(Array.from(allTechnologies));
  }, [projects]);

  // フィルタリング処理
  useEffect(() => {
    const filteredProjects = projects.filter(project => {
      // 技術フィルター
      const techMatch = selectedTechnologies.length === 0 || 
        selectedTechnologies.some(tech => project.tech.includes(tech));
      
      return techMatch;
    });

    onFilterChange(filteredProjects);
  }, [selectedTechnologies, projects, onFilterChange]);

  // カテゴリ関連の関数は削除

  // 技術の選択/解除
  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) 
        : [...prev, tech]
    );
  };

  // フィルターのリセット
  const resetFilters = () => {
    setSelectedTechnologies([]);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* フィルターセクションのタイトル */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">プロジェクトフィルター</h3>
        {selectedTechnologies.length > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            リセット
          </Button>
        )}
      </div>

      {/* カテゴリフィルターは削除 - Project型からcategoryプロパティが削除されたため */}

      {/* 技術フィルター */}
      {technologies.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">使用技術</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <Badge 
                key={tech}
                variant={selectedTechnologies.includes(tech) ? "secondary" : "outline"}
                className="cursor-pointer hover:bg-secondary/20"
                onClick={() => toggleTechnology(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}