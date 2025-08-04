'use client';

import { useState, useEffect, memo } from 'react';
import Image, { ImageProps } from 'next/image';
import { useImageOptimization } from './hooks/useImageOptimization';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  defaultWidth: number;
  defaultHeight: number;
  lowQualityPlaceholder?: boolean;
  className?: string;
  containerClassName?: string;
  /**
   * 画像の詳細な説明（スクリーンリーダー用）
   * alt属性が短い場合に補足情報として使用
   */
  longDescription?: string;
}

/**
 * 最適化された画像コンポーネント
 * - レスポンシブサイズ対応
 * - 遅延読み込み
 * - プレースホルダー表示
 */
function OptimizedImage({
  src,
  alt,
  defaultWidth,
  defaultHeight,
  lowQualityPlaceholder = false,
  priority = false,
  className,
  containerClassName,
  longDescription,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { getOptimizedImageSize, getImageSizes, getImagePriority } = useImageOptimization();
  const { width, height } = getOptimizedImageSize(defaultWidth, defaultHeight);
  const shouldPrioritize = getImagePriority(priority);
  
  // 画像のユニークID生成（安全な文字列に変換）
  const safeAltText = alt?.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '') || 'image';
  const imageId = `image-${safeAltText}-${Math.floor(Math.random() * 1000)}`;
  const containerId = `container-${imageId}`;
  const descriptionId = longDescription ? `desc-${imageId}` : undefined;
  
  // モバイルでのパフォーマンス最適化のため、画面内に入ったときのみ画像を読み込む
  const [inView, setInView] = useState(shouldPrioritize);
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
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
      { 
        threshold: 0.1,  // 10%表示されたら読み込み開始
        rootMargin: '200px' // 画面外200pxの位置から先読み開始
      }
    );
    
    const element = document.getElementById(containerId);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [containerId, shouldPrioritize]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setLoadingStatus('loaded');
  };

  const handleImageError = () => {
    setLoadingStatus('error');
  };

  return (
    <figure 
      id={containerId}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ width: '100%', height: 'auto', aspectRatio: `${width}/${height}` }}
    >
      {longDescription && (
        <div id={descriptionId} className="sr-only">
          {longDescription}
        </div>
      )}
      
      {inView ? (
        <>
          <Image
            id={imageId}
            src={src}
            alt={alt || ''} // 空の文字列をデフォルトとして設定
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
            onLoad={handleImageLoad}
            onError={handleImageError}
            aria-describedby={descriptionId}
            {...props}
          />
          {/* 読み込み状態をスクリーンリーダーに通知 */}
          <div 
            aria-live="polite" 
            className="sr-only"
          >
            {loadingStatus === 'loading' && '画像を読み込み中です'}
            {loadingStatus === 'error' && '画像の読み込みに失敗しました'}
          </div>
        </>
      ) : (
        // プレースホルダー
        <div 
          className={cn(
            'w-full h-full bg-muted/30 animate-pulse',
            className
          )}
          aria-hidden="true"
          role="presentation"
        >
          <span className="sr-only">画像読み込み準備中</span>
        </div>
      )}
    </figure>
  );
}

// メモ化してコンポーネントの不要な再レンダリングを防止
export default memo(OptimizedImage);
