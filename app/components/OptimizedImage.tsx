'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { useImageOptimization } from './hooks/useImageOptimization';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  defaultWidth: number;
  defaultHeight: number;
  lowQualityPlaceholder?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * 最適化された画像コンポーネント
 * - レスポンシブサイズ対応
 * - 遅延読み込み
 * - プレースホルダー表示
 */
export default function OptimizedImage({
  src,
  alt,
  defaultWidth,
  defaultHeight,
  lowQualityPlaceholder = false,
  priority = false,
  className,
  containerClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { getOptimizedImageSize, getImageSizes, getImagePriority, isMobile } = useImageOptimization();
  const { width, height } = getOptimizedImageSize(defaultWidth, defaultHeight);
  const shouldPrioritize = getImagePriority(priority);
  
  // モバイルでのパフォーマンス最適化のため、画面内に入ったときのみ画像を読み込む
  const [inView, setInView] = useState(shouldPrioritize);
  
  useEffect(() => {
    // priorityがtrueの場合は常に表示
    if (shouldPrioritize) {
      setInView(true);
      return;
    }
    
    // Intersection Observerを使用して、画面内に入ったときに画像を読み込む
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // 10%表示されたら読み込み開始
    );
    
    const element = document.getElementById(`image-container-${alt?.replace(/\s+/g, '-')}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [alt, shouldPrioritize]);

  return (
    <div 
      id={`image-container-${alt?.replace(/\s+/g, '-')}`}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ width: '100%', height: 'auto', aspectRatio: `${width}/${height}` }}
    >
      {inView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          sizes={getImageSizes()}
          priority={shouldPrioritize}
          loading={shouldPrioritize ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      ) : (
        // プレースホルダー
        <div 
          className={cn(
            'w-full h-full bg-muted/30 animate-pulse',
            className
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
