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
  ) as PerformanceEntry[];
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

  const entries = window.performance.getEntriesByType(
    "paint"
  ) as PerformanceEntry[];
  const fcpEntry = entries.find(
    (entry) => entry.name === "first-contentful-paint"
  );

  return fcpEntry ? fcpEntry.startTime : undefined;
}

/**
 * CLS (Cumulative Layout Shift) の値を取得する
 * @returns CLSの値またはundefined
 */
export function getCLS(): number | undefined {
  if (typeof window === "undefined" || !window.performance) {
    return undefined;
  }

  const entries = window.performance.getEntriesByType("layout-shift") as any[];
  let clsValue = 0;

  entries.forEach((entry) => {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  });

  return clsValue;
}

/**
 * LCP値をリアルタイムで監視する（PerformanceObserverを使用）
 * @param callback LCP値が更新されるたびに呼び出されるコールバック関数
 * @returns 監視を停止するための関数
 */
export function observeLCP(
  callback: (lcp: number) => void
): (() => void) | undefined {
  if (typeof window === "undefined" || !window.PerformanceObserver) {
    return undefined;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        callback(lastEntry.startTime);
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });

    // 監視を停止するための関数を返す
    return () => observer.disconnect();
  } catch (error) {
    console.warn("PerformanceObserver for LCP not supported:", error);
    return undefined;
  }
}

/**
 * すべてのパフォーマンスメトリクスを収集する
 * @param useObserver PerformanceObserverを使用してリアルタイム測定を行うかどうか
 * @returns パフォーマンスメトリクスのオブジェクト
 */
export function collectPerformanceMetrics(
  useObserver = false
): PerformanceMetrics {
  const metrics: PerformanceMetrics = {
    lcp: getLCP(),
    fcp: getFCP(),
    cls: getCLS(),
    // 他のメトリクスは実際の実装で追加
  };

  // PerformanceObserverを使用する場合、より正確なLCP値を取得
  if (useObserver && typeof window !== "undefined") {
    const stopObserver = observeLCP((lcp) => {
      metrics.lcp = lcp;
    });

    // 一定時間後に監視を停止（メモリリーク防止）
    if (stopObserver) {
      setTimeout(stopObserver, 10000); // 10秒後に停止
    }
  }

  return metrics;
}

/**
 * パフォーマンスメトリクスをコンソールに出力する
 * 開発時のデバッグ用
 */
export function logPerformanceMetrics(): void {
  if (typeof window === "undefined") return;

  let finalMetrics: PerformanceMetrics = {};
  let stopLCPObserver: (() => void) | undefined;

  // LCPの監視を開始
  stopLCPObserver = observeLCP((lcp) => {
    finalMetrics.lcp = lcp;
  });

  // ページの状態変化やアンロード時にメトリクスを最終化
  const finalizeAndLog = () => {
    if (stopLCPObserver) {
      stopLCPObserver();
    }

    const metrics = {
      ...collectPerformanceMetrics(),
      ...finalMetrics, // LCPの最新値で上書き
    };

    console.log("Performance Metrics:", metrics);

    // メトリクスの評価（良い/普通/悪い）
    if (metrics.lcp) {
      if (metrics.lcp < 2500) {
        console.log("LCP: Good ✅", metrics.lcp.toFixed(2), "ms");
      } else if (metrics.lcp < 4000) {
        console.log("LCP: Needs Improvement ⚠️", metrics.lcp.toFixed(2), "ms");
      } else {
        console.log("LCP: Poor ❌", metrics.lcp.toFixed(2), "ms");
      }
    }

    if (metrics.fcp) {
      if (metrics.fcp < 1800) {
        console.log("FCP: Good ✅", metrics.fcp.toFixed(2), "ms");
      } else if (metrics.fcp < 3000) {
        console.log("FCP: Needs Improvement ⚠️", metrics.fcp.toFixed(2), "ms");
      } else {
        console.log("FCP: Poor ❌", metrics.fcp.toFixed(2), "ms");
      }
    }
  };

  // ページ読み込み完了後にメトリクスを収集
  window.addEventListener("load", () => {
    // 少し遅延させてLCPなどの値が確定するのを待つ
    setTimeout(() => {
      const initialMetrics = collectPerformanceMetrics();
      finalMetrics = { ...finalMetrics, ...initialMetrics };
    }, 3000);
  });

  // ページが非表示になるかアンロードされる時に最終化
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      finalizeAndLog();
    }
  });

  window.addEventListener("pagehide", finalizeAndLog);
}
