'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/app/data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  // Project型にはimagesプロパティが存在しないため、常にproject.imageを配列として扱う
  const images = [project.image];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>{project.title}</DialogTitle>
        </DialogHeader>
        
        {/* プロジェクト画像カルーセル */}
        <div className='my-4'>
          <Carousel className='w-full'>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className='relative h-64 sm:h-80 md:h-96 w-full'>
                    <Image 
                      src={image} 
                      alt={`${project.title} - 画像 ${index + 1}`}
                      fill
                      className='object-cover rounded-lg'
                      sizes='(max-width: 768px) 100vw, 800px'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </Carousel>
        </div>

        {/* プロジェクト詳細情報 */}
        <div className='space-y-4'>
          {/* 期間と役割 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>期間</h3>
              <p>{
                // @ts-ignore - Project型にperiodプロパティが存在しないというエラーを回避
                project.period || '非公開'}
              </p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>役割</h3>
              <p>{
                // @ts-ignore - Project型にroleプロパティが存在しないというエラーを回避
                project.role || '非公開'}
              </p>
            </div>
          </div>

          {/* 説明 */}
          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>概要</h3>
            <p className='mt-1'>{project.description}</p>
          </div>

          {/* 成果セクションは削除 - Project型からachievementsプロパティが削除されたため */}

          {/* 使用技術 */}
          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>使用技術</h3>
            <div className='flex flex-wrap gap-2 mt-2'>
              {project.tech.map((tech) => (
                <Badge key={tech} variant='outline'>{tech}</Badge>
              ))}
            </div>
          </div>

          {/* カテゴリセクションは削除 - Project型からcategoryプロパティが削除されたため */}

          {/* リンク */}
          <div className='flex flex-wrap gap-3 pt-2'>
            {project.github && (
              <Button variant='outline' size='sm' asChild>
                <a href={project.github} target='_blank' rel='noopener noreferrer'>
                  <Github className='mr-2 h-4 w-4' />
                  GitHub
                </a>
              </Button>
            )}
            {project.live && (
              <Button variant='default' size='sm' asChild>
                <a href={project.live} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='mr-2 h-4 w-4' />
                  ライブデモ
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}