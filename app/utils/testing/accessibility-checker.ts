/**
 * アクセシビリティをチェックするためのユーティリティ
 * 基本的なアクセシビリティ問題を検出するための関数を提供
 */

// アクセシビリティチェックの結果の型定義
export interface AccessibilityIssue {
  element: HTMLElement;
  type: string;
  description: string;
  impact: "critical" | "serious" | "moderate" | "minor";
  helpUrl?: string;
}

/**
 * 画像のalt属性をチェックする
 * @returns 見つかった問題の配列
 */
export function checkImagesForAlt(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }

  const issues: AccessibilityIssue[] = [];
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.hasAttribute("alt")) {
      issues.push({
        element: img as HTMLElement,
        type: "missing-alt",
        description: "画像にalt属性がありません",
        impact: "serious",
        helpUrl: "https://www.w3.org/WAI/tutorials/images/decision-tree/",
      });
    } else if (img.alt === "" && !img.getAttribute("role")) {
      // 装飾的な画像の場合は空のalt属性が適切ですが、
      // roleが指定されていない場合は警告を出します
      issues.push({
        element: img as HTMLElement,
        type: "empty-alt-without-role",
        description:
          '装飾的な画像にはrole="presentation"を追加することを検討してください',
        impact: "minor",
        helpUrl: "https://www.w3.org/WAI/tutorials/images/decorative/",
      });
    }
  });

  return issues;
}

/**
 * フォームのラベルをチェックする
 * @returns 見つかった問題の配列
 */
export function checkFormLabels(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }

  const issues: AccessibilityIssue[] = [];
  const formControls = document.querySelectorAll("input, select, textarea");

  formControls.forEach((control) => {
    const id = control.getAttribute("id");
    if (!id) {
      issues.push({
        element: control as HTMLElement,
        type: "missing-id",
        description: "フォームコントロールにIDがありません",
        impact: "moderate",
        helpUrl: "https://www.w3.org/WAI/tutorials/forms/labels/",
      });
      return;
    }

    const hasLabel = document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = control.getAttribute("aria-label");
    const hasAriaLabelledBy = control.getAttribute("aria-labelledby");

    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        element: control as HTMLElement,
        type: "missing-label",
        description: "フォームコントロールにラベルがありません",
        impact: "serious",
        helpUrl: "https://www.w3.org/WAI/tutorials/forms/labels/",
      });
    }
  });

  return issues;
}

/**
 * 見出しの階層をチェックする
 * @returns 見つかった問題の配列
 */
export function checkHeadingHierarchy(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }

  const issues: AccessibilityIssue[] = [];
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1), 10);

    // h1が複数ある場合は警告
    if (level === 1 && lastLevel === 1) {
      issues.push({
        element: heading as HTMLElement,
        type: "multiple-h1",
        description: "ページに複数のh1があります",
        impact: "moderate",
        helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
      });
    }

    // 見出しレベルがスキップされている場合（例：h1からh3へ）
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({
        element: heading as HTMLElement,
        type: "skipped-heading-level",
        description: `見出しレベルがスキップされています（h${lastLevel}からh${level}）`,
        impact: "moderate",
        helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
      });
    }

    lastLevel = level;
  });

  return issues;
}

/**
 * コントラスト比をチェックする（簡易版）
 * 注: 正確なコントラスト比の計算には背景色と前景色の正確な値が必要です
 * この関数は簡易的な実装で、実際のアプリケーションではより高度なライブラリの使用を推奨します
 * @returns 見つかった問題の配列
 */
export function checkContrastRatio(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }

  const issues: AccessibilityIssue[] = [];
  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    if (color && backgroundColor) {
      const contrastRatio = calculateContrastRatio(color, backgroundColor);
      const isLargeText =
        parseFloat(style.fontSize) >= 18 ||
        (parseFloat(style.fontSize) >= 14 && style.fontWeight === "bold");
      const threshold = isLargeText ? 3 : 4.5;

      if (contrastRatio < threshold) {
        issues.push({
          element: element as HTMLElement,
          type: "low-contrast",
          description: `コントラスト比が低すぎます (${contrastRatio.toFixed(
            2
          )}:1)`,
          impact: "serious",
          helpUrl:
            "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
        });
      }
    }
  });

  return issues;
}

/**
 * 色からRGB値を抽出する補助関数
 * @param color CSSの色表現
 * @returns RGB値の配列 [r, g, b]
 */
function extractRGB(color: string): number[] {
  // rgb(r, g, b) または rgba(r, g, b, a) 形式の場合
  const rgbMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
  );
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }

  // 16進数表記の場合
  const hexMatch = color.match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
  if (hexMatch) {
    return [
      parseInt(hexMatch[1], 16),
      parseInt(hexMatch[2], 16),
      parseInt(hexMatch[3], 16),
    ];
  }

  // 簡易16進数表記の場合
  const shortHexMatch = color.match(/#([a-f\d])([a-f\d])([a-f\d])/i);
  if (shortHexMatch) {
    return [
      parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
      parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
      parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
    ];
  }

  // デフォルト値（黒）
  return [0, 0, 0];
}

/**
 * 色の相対輝度を計算する
 * WCAG 2.0 の定義に基づく: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * @param rgb RGB値の配列 [r, g, b]
 * @returns 相対輝度 (0～1)
 */
function calculateRelativeLuminance(rgb: number[]): number {
  // sRGBの各成分を0～1の範囲に正規化
  const normalized = rgb.map((val) => val / 255);

  // 各成分に対して相対輝度の計算を行う
  const transformed = normalized.map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // 輝度の計算（赤:0.2126, 緑:0.7152, 青:0.0722の重み付け）
  return (
    0.2126 * transformed[0] + 0.7152 * transformed[1] + 0.0722 * transformed[2]
  );
}

/**
 * 2つの色のコントラスト比を計算する
 * @param color1 前景色
 * @param color2 背景色
 * @returns コントラスト比 (1～21)
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = extractRGB(color1);
  const rgb2 = extractRGB(color2);

  const luminance1 = calculateRelativeLuminance(rgb1);
  const luminance2 = calculateRelativeLuminance(rgb2);

  // 明るい方を分子、暗い方を分母にする
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  // コントラスト比の計算式: (L1 + 0.05) / (L2 + 0.05)
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * アクセシビリティの問題を検出する
 * @returns 見つかった問題の配列
 */
export function detectAccessibilityIssues(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }

  const issues = [
    ...checkImagesForAlt(),
    ...checkFormLabels(),
    ...checkHeadingHierarchy(),
    ...checkContrastRatio(),
  ];

  return issues;
}

/**
 * アクセシビリティの問題をコンソールに出力する
 * 開発時のデバッグ用
 */
export function logAccessibilityIssues(): void {
  if (typeof document === "undefined") return;

  // DOMが完全に読み込まれた後にチェックを実行
  window.addEventListener("DOMContentLoaded", () => {
    const issues = detectAccessibilityIssues();

    if (issues.length === 0) {
      console.log("✅ アクセシビリティの問題は検出されませんでした");
      return;
    }

    console.log(
      `⚠️ ${issues.length}件のアクセシビリティの問題が検出されました:`
    );

    issues.forEach((issue, index) => {
      console.group(`問題 ${index + 1}: ${issue.type}`);
      console.log("説明:", issue.description);
      console.log("影響度:", issue.impact);
      console.log("要素:", issue.element);
      if (issue.helpUrl) {
        console.log("詳細情報:", issue.helpUrl);
      }
      console.groupEnd();
    });
  });
}
