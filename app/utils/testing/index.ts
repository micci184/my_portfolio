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

/**
 * すべてのテストユーティリティを実行する
 * 開発モードでのみ実行されるべき関数
 */
export function runAllTests(): void {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return;
  }

  // 各種テストを実行
  window.addEventListener("load", () => {
    setTimeout(() => {
      console.group("🧪 テスト・検証結果");

      // パフォーマンスメトリクス
      console.group("📊 パフォーマンスメトリクス");
      logPerformanceMetrics();
      console.groupEnd();

      // ブラウザ互換性
      console.group("🌐 ブラウザ互換性");
      logBrowserCompatibility();
      console.groupEnd();

      // アクセシビリティ
      console.group("♿ アクセシビリティ");
      logAccessibilityIssues();
      console.groupEnd();

      console.groupEnd();
    }, 3000);
  });
}
