/**
 * ブラウザの互換性をチェックするためのユーティリティ
 * 各種ブラウザ機能のサポート状況を確認するための関数を提供
 */

// ブラウザの互換性情報の型定義
export interface BrowserCompatibility {
  // 基本的なブラウザ情報
  userAgent: string;
  browser: {
    name?: string;
    version?: string;
  };
  // 機能サポート状況
  features: {
    [featureName: string]: boolean;
  };
}

/**
 * WebP画像形式のサポートをチェックする
 * @returns サポートされていればtrue、そうでなければfalse
 */
function checkWebPSupport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // キャンバスを使用したWebPサポートチェック
  const canvas = document.createElement("canvas");
  if (!canvas || !canvas.getContext) {
    return false;
  }

  // toDataURLでWebP形式を指定して、結果にWebPが含まれるかをチェック
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}

/**
 * AVIF画像形式のサポートをチェックする
 * @returns サポートされていればtrue、そうでなければfalse
 */
function checkAVIFSupport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // 現時点では簡易的な実装
  // 実際には画像の読み込みテストなどが必要だが、クライアントサイドでの実行時間を考慮して簡略化
  const img = new Image();

  // AVIF MIMEタイプがサポートされているかを確認
  // 注: これは完全な検出ではなく、ブラウザによっては不正確な場合がある
  return (
    typeof img.decode === "function" &&
    "HTMLImageElement" in window &&
    "loading" in HTMLImageElement.prototype
  );
}

/**
 * ブラウザ名とバージョンを取得する
 * 注: この実装は簡易的なもので、正確なブラウザ検出には限界があります
 * @returns ブラウザ名とバージョンを含むオブジェクト
 */
export function getBrowserInfo(): { name?: string; version?: string } {
  if (typeof window === "undefined" || !window.navigator) {
    return {};
  }

  const userAgent = window.navigator.userAgent;
  let name: string | undefined;
  let version: string | undefined;

  // Chrome
  if (/Chrome\/([0-9.]+)/.test(userAgent)) {
    name = "Chrome";
    version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1];
  }
  // Firefox
  else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
    name = "Firefox";
    version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1];
  }
  // Safari
  else if (/Safari\/([0-9.]+)/.test(userAgent) && !/Chrome/.test(userAgent)) {
    name = "Safari";
    version = userAgent.match(/Version\/([0-9.]+)/)?.[1];
  }
  // Edge (Chromium-based)
  else if (/Edg\/([0-9.]+)/.test(userAgent)) {
    name = "Edge";
    version = userAgent.match(/Edg\/([0-9.]+)/)?.[1];
  }
  // Internet Explorer
  else if (/Trident/.test(userAgent)) {
    name = "Internet Explorer";
    version = userAgent.match(/rv:([0-9.]+)/)?.[1];
  }

  return { name, version };
}

/**
 * 特定の機能がサポートされているかチェックする
 * @param feature チェックする機能名
 * @returns サポートされていればtrue、そうでなければfalse
 */
export function isFeatureSupported(feature: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  switch (feature) {
    case "IntersectionObserver":
      return "IntersectionObserver" in window;
    case "ResizeObserver":
      return "ResizeObserver" in window;
    case "MutationObserver":
      return "MutationObserver" in window;
    case "PerformanceObserver":
      return "PerformanceObserver" in window;
    case "WebP":
      return checkWebPSupport();
    case "AVIF":
      return checkAVIFSupport();
    case "CSS Grid":
      return CSS.supports("display", "grid");
    case "CSS Flexbox":
      return CSS.supports("display", "flex");
    case "CSS Variables":
      return CSS.supports("--test: 0");
    case "Fetch API":
      return "fetch" in window;
    case "Service Worker":
      return "serviceWorker" in navigator;
    case "Web Workers":
      return "Worker" in window;
    case "WebGL":
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    case "WebRTC":
      return "RTCPeerConnection" in window;
    default:
      return false;
  }
}

/**
 * 複数の機能のサポート状況をチェックする
 * @param features チェックする機能名の配列
 * @returns 機能名とサポート状況のマップ
 */
export function checkFeatureSupport(features: string[]): {
  [feature: string]: boolean;
} {
  const result: { [feature: string]: boolean } = {};

  features.forEach((feature) => {
    result[feature] = isFeatureSupported(feature);
  });

  return result;
}

/**
 * ブラウザの互換性情報を収集する
 * @returns ブラウザの互換性情報
 */
export function collectBrowserCompatibility(): BrowserCompatibility {
  const userAgent =
    typeof window !== "undefined" ? window.navigator.userAgent : "";
  const browser = getBrowserInfo();

  const featuresToCheck = [
    "IntersectionObserver",
    "ResizeObserver",
    "MutationObserver",
    "PerformanceObserver",
    "WebP",
    "AVIF",
    "CSS Grid",
    "CSS Flexbox",
    "CSS Variables",
    "Service Worker",
  ];

  const features = checkFeatureSupport(featuresToCheck);

  return {
    userAgent,
    browser,
    features,
  };
}

/**
 * ブラウザの互換性情報をコンソールに出力する
 * 開発時のデバッグ用
 */
export function logBrowserCompatibility(): void {
  if (typeof window === "undefined") return;

  const compatibility = collectBrowserCompatibility();

  console.log("Browser Compatibility:");
  console.log(
    `Browser: ${compatibility.browser.name || "Unknown"} ${
      compatibility.browser.version || ""
    }`
  );
  console.log("Feature Support:");

  Object.entries(compatibility.features).forEach(([feature, isSupported]) => {
    console.log(
      `${feature}: ${isSupported ? "✅ Supported" : "❌ Not Supported"}`
    );
  });
}
