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
  // すべてのカテゴリと技術を抽出
  const [categories, setCategories] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  
  // 選択されたフィルター
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  // カテゴリと技術の一覧を初期化
  useEffect(() => {
    const allCategories = new Set<string>();
    const allTechnologies = new Set<string>();

    projects.forEach(project => {
      // カテゴリの追加
      if (project.category) {
        project.category.forEach(cat => allCategories.add(cat));
      }
      
      // 技術の追加
      project.tech.forEach(tech => allTechnologies.add(tech));
    });

    setCategories(Array.from(allCategories));
    setTechnologies(Array.from(allTechnologies));
  }, [projects]);

  // フィルタリング処理
  useEffect(() => {
    const filteredProjects = projects.filter(project => {
      // カテゴリフィルター
      const categoryMatch = selectedCategories.length === 0 || 
        (project.category && selectedCategories.some(cat => project.category?.includes(cat)));
      
      // 技術フィルター
      const techMatch = selectedTechnologies.length === 0 || 
        selectedTechnologies.some(tech => project.tech.includes(tech));
      
      return categoryMatch && techMatch;
    });

    onFilterChange(filteredProjects);
  }, [selectedCategories, selectedTechnologies, projects, onFilterChange]);

  // カテゴリの選択/解除
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

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
    setSelectedCategories([]);
    setSelectedTechnologies([]);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* フィルターセクションのタイトル */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">プロジェクトフィルター</h3>
        {(selectedCategories.length > 0 || selectedTechnologies.length > 0) && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            リセット
          </Button>
        )}
      </div>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">カテゴリ</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

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
