/**
 * パフォーマンスメトリクスを測定するためのユーティリティ
 * Core Web Vitalsなどのパフォーマンス指標を収集・分析するための関数を提供
 */

// Web Vitalsの主要指標の型定義
export interface PerformanceMetrics {
  // Largest Contentful Paint - 最大コンテンツ描画時間
  lcp?: number;
  // First Input Delay - 初回入力遅延
  fid?: number;
  // Cumulative Layout Shift - 累積レイアウトシフト
  cls?: number;
  // First Contentful Paint - 初回コンテンツ描画
  fcp?: number;
  // Time to Interactive - インタラクティブになるまでの時間
  tti?: number;
  // Total Blocking Time - 合計ブロッキング時間
  tbt?: number;
  // Speed Index - 速度指標
  si?: number;
}

/**
 * パフォーマンスエントリを取得する
 * @param entryType パフォーマンスエントリの種類
 * @returns パフォーマンスエントリの配列
 */
export function getPerformanceEntries(entryType: string): PerformanceEntry[] {
  if (typeof window === "undefined" || !window.performance) {
    return [];
  }

  return window.performance.getEntriesByType(entryType);
}

/**
 * LCP (Largest Contentful Paint) の値を取得する
 * @returns LCPの値（ミリ秒）またはundefined
 */
export function getLCP(): number | undefined {
  if (typeof window === "undefined" || !window.performance) {
    return undefined;
  }

  const entries = window.performance.getEntriesByType(
    "largest-contentful-paint"
  );
  const lcpEntry = entries[entries.length - 1]; // Get the most recent LCP entry

  return lcpEntry ? lcpEntry.startTime : undefined;
}

/**
 * FCP (First Contentful Paint) の値を取得する
 * @returns FCPの値（ミリ秒）またはundefined
 */
export function getFCP(): number | undefined {
  if (typeof window === "undefined" || !window.performance) {
    return undefined;
  }

  const entries = window.performance.getEntriesByType("paint");
  const fcpEntry = entries.find(
    (entry) => entry.name === "first-contentful-paint"
  );

  return fcpEntry ? fcpEntry.startTime : undefined;
}

/**
 * CLS (Cumulative Layout Shift) の値を計算する
 * 注: 正確なCLS値を取得するにはLayoutShift APIが必要で、
 * このシンプルな実装はブラウザのサポート状況によって動作が異なります
 * @returns CLSの値またはundefined
 */
export function getCLS(): number | undefined {
  if (typeof window === "undefined" || !window.PerformanceObserver) {
    return undefined;
  }

  // この関数は実際のCLSを計算するためにはPerformanceObserverの設定が必要
  // 実際の実装ではWeb Vitalsライブラリの使用を推奨
  return undefined;
}

/**
 * すべてのパフォーマンスメトリクスを収集する
 * @returns パフォーマンスメトリクスのオブジェクト
 */
export function collectPerformanceMetrics(): PerformanceMetrics {
  return {
    lcp: getLCP(),
    fcp: getFCP(),
    cls: getCLS(),
    // 他のメトリクスは実際の実装で追加
  };
}

/**
 * パフォーマンスメトリクスをコンソールに出力する
 * 開発時のデバッグ用
 */
export function logPerformanceMetrics(): void {
  if (typeof window === "undefined") return;

  // ページ読み込み完了後にメトリクスを収集
  window.addEventListener("load", () => {
    // 少し遅延させてLCPなどの値が確定するのを待つ
    setTimeout(() => {
      const metrics = collectPerformanceMetrics();
      console.log("Performance Metrics:", metrics);

      // メトリクスの評価（良い/普通/悪い）
      if (metrics.lcp) {
        if (metrics.lcp < 2500) {
          console.log("LCP: Good ✅", metrics.lcp.toFixed(2), "ms");
        } else if (metrics.lcp < 4000) {
          console.log(
            "LCP: Needs Improvement ⚠️",
            metrics.lcp.toFixed(2),
            "ms"
          );
        } else {
          console.log("LCP: Poor ❌", metrics.lcp.toFixed(2), "ms");
        }
      }

      if (metrics.fcp) {
        if (metrics.fcp < 1800) {
          console.log("FCP: Good ✅", metrics.fcp.toFixed(2), "ms");
        } else if (metrics.fcp < 3000) {
          console.log(
            "FCP: Needs Improvement ⚠️",
            metrics.fcp.toFixed(2),
            "ms"
          );
        } else {
          console.log("FCP: Poor ❌", metrics.fcp.toFixed(2), "ms");
        }
      }
    }, 3000);
  });
}
