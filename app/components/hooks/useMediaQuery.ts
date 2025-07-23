'use client';

import { useState, useEffect } from 'react';

/**
 * メディアクエリの状態を監視するカスタムフック
 * @param query メディアクエリ文字列（例: '(max-width: 768px)'）
 * @returns メディアクエリに一致するかどうかのブール値
 */
export function useMediaQuery(query: string): boolean {
  // SSRの場合はデフォルトでfalseを返す
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // ブラウザ環境でのみwindow.matchMediaを使用
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // 初期状態を設定
      setMatches(media.matches);

      // メディアクエリの変更を監視する関数
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // リスナーを追加
      media.addEventListener('change', listener);

      // クリーンアップ関数
      return () => {
        media.removeEventListener('change', listener);
      };
    }
    
    // SSRの場合は何もしない
    return undefined;
  }, [query]);

  return matches;
}
