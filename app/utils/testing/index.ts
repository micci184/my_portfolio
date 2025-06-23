/**
 * テスト・検証ユーティリティのエクスポート
 */

// パフォーマンスメトリクス
export {
  type PerformanceMetrics,
  getPerformanceEntries,
  getLCP,
  getFCP,
  getCLS,
  collectPerformanceMetrics,
  logPerformanceMetrics,
} from "./performance-metrics";

// ブラウザ互換性
export {
  type BrowserCompatibility,
  getBrowserInfo,
  isFeatureSupported,
  checkFeatureSupport,
  collectBrowserCompatibility,
  logBrowserCompatibility,
} from "./browser-compatibility";

// アクセシビリティ
export {
  type AccessibilityIssue,
  checkImagesForAlt,
  checkFormLabels,
  checkHeadingHierarchy,
  checkContrastRatio,
  detectAccessibilityIssues,
  logAccessibilityIssues,
} from "./accessibility-checker";

// 関数を直接インポートして使用
import { logPerformanceMetrics } from "./performance-metrics";
import { logBrowserCompatibility } from "./browser-compatibility";
import { logAccessibilityIssues } from "./accessibility-checker";

/**
 * すべてのテストユーティリティを実行する
 * 開発モードでのみ実行されるべき関数
 * Next.jsでクライアントサイドで環境変数にアクセスするため、NEXT_PUBLIC_プレフィックスが必要
 */
export function runAllTests(): void {
  if (
    typeof window === "undefined" ||
    process.env.NEXT_PUBLIC_IS_PRODUCTION === "true"
  ) {
    return;
  }

  console.log("テスト・検証ユーティリティを実行中...");

  // パフォーマンスメトリクスの収集と表示
  setTimeout(() => {
    logPerformanceMetrics();
  }, 3000);

  // ブラウザ互換性情報の収集と表示
  logBrowserCompatibility();

  // アクセシビリティの問題を検出して表示
  setTimeout(() => {
    logAccessibilityIssues();
  }, 1000);
}
