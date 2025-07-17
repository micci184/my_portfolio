'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * 画像最適化のためのカスタムフック
 * デバイスのサイズに応じて最適な画像サイズを提供します
 */
export function useImageOptimization() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  /**
   * 画像のサイズ属性を計算する
   * @param defaultWidth デフォルトの幅
   * @param defaultHeight デフォルトの高さ
   * @returns 最適化された画像のサイズ
   */
  const getOptimizedImageSize = (defaultWidth: number, defaultHeight: number) => {
    if (isMobile) {
      // モバイル向けに最適化
      return {
        width: Math.round(defaultWidth * 0.8),
        height: Math.round(defaultHeight * 0.8),
      };
    } else if (isTablet) {
      // タブレット向けに最適化
      return {
        width: Math.round(defaultWidth * 0.9),
        height: Math.round(defaultHeight * 0.9),
      };
    }
    
    // デスクトップはデフォルトサイズ
    return {
      width: defaultWidth,
      height: defaultHeight,
    };
  };
  
  /**
   * 画像のサイズ指定を生成する
   * @returns サイズ指定文字列
   */
  const getImageSizes = () => {
    if (isMobile) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    } else if (isTablet) {
      return '(max-width: 1024px) 50vw, 33vw';
    }
    return '33vw';
  };
  
  /**
   * 画像の読み込み優先度を決定する
   * @param isImportant 重要な画像かどうか
   * @returns 優先度設定
   */
  const getImagePriority = (isImportant: boolean) => {
    return isImportant || isMobile;
  };
  
  return {
    getOptimizedImageSize,
    getImageSizes,
    getImagePriority,
    isMobile,
    isTablet
  };
}