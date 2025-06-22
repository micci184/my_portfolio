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
  // 実際の実装では、CSSの計算済みスタイルを取得し、
  // 背景色と前景色のコントラスト比を計算する必要があります
  // この実装は簡易的なものです
  return [];
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
