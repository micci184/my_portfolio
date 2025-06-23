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
 * RGB色文字列をRGB値オブジェクトに変換する
 */
function parseRgbString(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return null;
  
  const [, r, g, b] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10)
  };
}

/**
 * RGBA色文字列をRGB値オブジェクトに変換する（アルファ値を考慮）
 */
function parseRgbaString(rgba: string): { r: number; g: number; b: number; a: number } | null {
  const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (!match) return null;
  
  const [, r, g, b, a] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    a: parseFloat(a)
  };
}

/**
 * Hex色をRGB値に変換する
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * RGB値から相対輝度を計算する（WCAG 2.1準拠）
 */
function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * 2つの色の間のコントラスト比を計算する（WCAG 2.1準拠）
 */
function calculateContrastRatio(color1: string, color2: string): number {
  let rgb1: { r: number; g: number; b: number } | null = null;
  let rgb2: { r: number; g: number; b: number } | null = null;
  
  // color1の解析
  if (color1.startsWith('rgb(')) {
    rgb1 = parseRgbString(color1);
  } else if (color1.startsWith('rgba(')) {
    const rgba = parseRgbaString(color1);
    if (rgba) {
      rgb1 = { r: rgba.r, g: rgba.g, b: rgba.b };
    }
  } else if (color1.startsWith('#')) {
    rgb1 = hexToRgb(color1);
  } else {
    // Named colors support (basic implementation)
    const namedColors: { [key: string]: string } = {
      'black': '#000000', 'white': '#ffffff', 'red': '#ff0000',
      'green': '#008000', 'blue': '#0000ff', 'yellow': '#ffff00',
      'cyan': '#00ffff', 'magenta': '#ff00ff', 'silver': '#c0c0c0',
      'gray': '#808080', 'grey': '#808080'
    };
    if (namedColors[color1.toLowerCase()]) {
      rgb1 = hexToRgb(namedColors[color1.toLowerCase()]);
    }
  }
  
  // color2の解析
  if (color2.startsWith('rgb(')) {
    rgb2 = parseRgbString(color2);
  } else if (color2.startsWith('rgba(')) {
    const rgba = parseRgbaString(color2);
    if (rgba) {
      rgb2 = { r: rgba.r, g: rgba.g, b: rgba.b };
    }
  } else if (color2.startsWith('#')) {
    rgb2 = hexToRgb(color2);
  } else {
    const namedColors: { [key: string]: string } = {
      'black': '#000000', 'white': '#ffffff', 'red': '#ff0000',
      'green': '#008000', 'blue': '#0000ff', 'yellow': '#ffff00',
      'cyan': '#00ffff', 'magenta': '#ff00ff', 'silver': '#c0c0c0',
      'gray': '#808080', 'grey': '#808080'
    };
    if (namedColors[color2.toLowerCase()]) {
      rgb2 = hexToRgb(namedColors[color2.toLowerCase()]);
    }
  }
  
  if (!rgb1 || !rgb2) return 1; // エラー時は最低値を返す
  
  const lum1 = calculateRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 要素の実効的な背景色を取得する
 * 親要素を辿って背景色が設定されている最も近い要素の色を返す
 */
function getEffectiveBackgroundColor(element: Element): string {
  let currentElement: Element | null = element;
  let backgroundColor = 'transparent';
  
  while (currentElement && backgroundColor === 'transparent') {
    const style = window.getComputedStyle(currentElement);
    backgroundColor = style.backgroundColor;
    
    if (backgroundColor === 'transparent' || backgroundColor === 'rgba(0, 0, 0, 0)') {
      currentElement = currentElement.parentElement;
    }
  }
  
  // 最終的に背景色が見つからなかった場合はデフォルトの白を返す
  return backgroundColor === 'transparent' ? 'rgb(255, 255, 255)' : backgroundColor;
}

/**
 * コントラスト比の実装が正しいかを検証する
 * 単体テスト代わりの関数
 */
function validateContrastRatioImplementation(): boolean {
  // 黒と白のコントラスト比は21:1
  const blackWhite = calculateContrastRatio('rgb(0,0,0)', 'rgb(255,255,255)');
  if (Math.abs(blackWhite - 21) > 0.1) return false;
  
  // 中間グレーと白のコントラスト比は約3:1
  const greyWhite = calculateContrastRatio('rgb(128,128,128)', 'rgb(255,255,255)');
  if (Math.abs(greyWhite - 3) > 0.3) return false;
  
  return true;
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
      
      // フォントサイズと太さに基づいて大きなテキストかどうかを判定
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = style.fontWeight;
      const isLargeText = fontSize >= 18 || 
                         (fontSize >= 14 && (fontWeight === "bold" || parseInt(fontWeight) >= 700));
      
      // WCAG AA基準のしきい値
      const threshold = isLargeText ? 3 : 4.5;
      
      if (contrastRatio < threshold) {
        // コントラスト比が非常に低い場合は critical、それ以外は serious
        const impact = contrastRatio < 2 ? "critical" : "serious";
        
        issues.push({
          element: element as HTMLElement,
          type: "low-contrast",
          description: `コントラスト比が低すぎます (${contrastRatio.toFixed(2)}:1, 必要: ${threshold}:1以上)`,
          impact,
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
        });
      }
    } catch (error) {
      // 色の解析でエラーが発生した場合はスキップ（ログは出力しない）
      // コンソールに警告を出すとパフォーマンスに影響する可能性があるため
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
