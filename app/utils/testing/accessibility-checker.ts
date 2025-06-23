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
    const hex = namedColors[color1.toLowerCase()];
    if (hex) {
      rgb1 = hexToRgb(hex);
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
    const hex = namedColors[color2.toLowerCase()];
    if (hex) {
      rgb2 = hexToRgb(hex);
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
 * 要素の実際の背景色を取得する（親要素の背景色を考慮）
 */
function getEffectiveBackgroundColor(element: Element): string {
  let currentElement = element as HTMLElement;
  
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    const backgroundColor = style.backgroundColor;
    
    // 透明でない背景色が見つかった場合
    if (backgroundColor &&
        backgroundColor !== 'rgba(0, 0, 0, 0)' &&
        backgroundColor !== 'transparent' &&
        backgroundColor !== 'initial' &&
        backgroundColor !== 'inherit') {
      return backgroundColor;
    }
    
    currentElement = currentElement.parentElement as HTMLElement;
  }
  
  // デフォルトは白色（一般的なブラウザのデフォルト）
  return 'rgb(255, 255, 255)';
}

/**
 * コントラスト比チェック機能の妥当性を検証する
 * 開発時のデバッグ用関数
 */
function validateContrastRatioImplementation(): boolean {
  try {
    // 既知の色の組み合わせでテスト
    const testCases = [
      { color1: 'rgb(0, 0, 0)', color2: 'rgb(255, 255, 255)', expected: 21 },
      { color1: '#000000', color2: '#ffffff', expected: 21 },
      { color1: 'rgb(255, 255, 255)', color2: 'rgb(0, 0, 0)', expected: 21 },
      { color1: 'rgb(128, 128, 128)', color2: 'rgb(255, 255, 255)', expected: 3.95 },
    ];
    
    for (const testCase of testCases) {
      const ratio = calculateContrastRatio(testCase.color1, testCase.color2);
      if (Math.abs(ratio - testCase.expected) > 0.1) {
        console.warn(`コントラスト比計算の検証に失敗: ${testCase.color1} vs ${testCase.color2}, 期待値: ${testCase.expected}, 実際: ${ratio.toFixed(2)}`);
        return false;
      }
    }
    
    console.log('✅ コントラスト比計算の検証が成功しました');
    return true;
  } catch (error) {
    console.error('コントラスト比実装の検証中にエラーが発生:', error);
    return false;
  }
}
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
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
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
 * 要素の実際の背景色を取得する（親要素の背景色を考慮）
 */
function getEffectiveBackgroundColor(element: Element): string {
  let currentElement = element as HTMLElement;
  
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    const backgroundColor = style.backgroundColor;
    
    // 透明でない背景色が見つかった場合
    if (backgroundColor && 
        backgroundColor !== 'rgba(0, 0, 0, 0)' && 
        backgroundColor !== 'transparent' &&
        backgroundColor !== 'initial' &&
        backgroundColor !== 'inherit') {
      return backgroundColor;
    }
    
    currentElement = currentElement.parentElement as HTMLElement;
  }
  
  // デフォルトは白色（一般的なブラウザのデフォルト）
  return 'rgb(255, 255, 255)';
}

/**
 * コントラスト比チェック機能の妥当性を検証する
 * 開発時のデバッグ用関数
 */
function validateContrastRatioImplementation(): boolean {
  try {
    // 既知の色の組み合わせでテスト
    const testCases = [
      { color1: 'rgb(0, 0, 0)', color2: 'rgb(255, 255, 255)', expected: 21 },
      { color1: '#000000', color2: '#ffffff', expected: 21 },
      { color1: 'rgb(255, 255, 255)', color2: 'rgb(0, 0, 0)', expected: 21 },
      { color1: 'rgb(128, 128, 128)', color2: 'rgb(255, 255, 255)', expected: 3.95 },
    ];
    
    for (const testCase of testCases) {
      const ratio = calculateContrastRatio(testCase.color1, testCase.color2);
      if (Math.abs(ratio - testCase.expected) > 0.1) {
        console.warn(`コントラスト比計算の検証に失敗: ${testCase.color1} vs ${testCase.color2}, 期待値: ${testCase.expected}, 実際: ${ratio.toFixed(2)}`);
        return false;
      }
    }
    
    console.log('✅ コントラスト比計算の検証が成功しました');
    return true;
  } catch (error) {
    console.error('コントラスト比実装の検証中にエラーが発生:', error);
    return false;
  }
}

/**
 * コントラスト比をチェックする（WCAG 2.1 AA基準完全準拠）
 * テキストと背景のコントラスト比を正確に計算し、WCAGガイドラインに従って評価します
 * - 通常のテキスト: 4.5:1 以上
 * - 大きなテキスト（18px以上、または14px以上かつbold）: 3:1 以上
 * - 親要素の背景色を考慮した正確な計算を実行
 * - パフォーマンス最適化により、表示されているテキスト要素のみを対象
 * @returns 見つかった問題の配列
 */
export function checkContrastRatio(): AccessibilityIssue[] {
  if (typeof document === "undefined") {
    return [];
  }
  
  // 開発環境でのみコントラスト比計算の妥当性を検証
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    validateContrastRatioImplementation();
  }
  
  const issues: AccessibilityIssue[] = [];
  
  // より効率的な要素選択（テキストを含む可能性が高い要素のみ）
  const textElements = document.querySelectorAll(
    'p, span, div, h1, h2, h3, h4, h5, h6, a, button, label, li, td, th, legend, caption, summary, figcaption, blockquote, cite, code, pre, em, strong, small, mark, ins, del, sub, sup'
  );
  
  // 深いネストを避けるため、最大チェック数を制限
  const maxElementsToCheck = 1000;
  const elementsToCheck = Array.from(textElements).slice(0, maxElementsToCheck);
  
  const visibleTextElements = elementsToCheck.filter(element => {
    const style = window.getComputedStyle(element);
    const hasDirectTextContent = Array.from(element.childNodes).some(
      node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );
    
    const isVisible = style.display !== 'none' && 
                     style.visibility !== 'hidden' && 
                     parseFloat(style.opacity) > 0.1 &&
                     parseFloat(style.fontSize) > 8; // 8px未満のテキストは除外
    
    return hasDirectTextContent && isVisible;
  });
  
  visibleTextElements.forEach((element) => {
    try {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = getEffectiveBackgroundColor(element);
      
      // 有効な色情報がない場合はスキップ
      if (!color || !backgroundColor) {
        return;
      }
      
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
    }
  });
  
  return issues;
}
    g: parseInt(g, 10),
    b: parseInt(b, 10),
  };
}

/**
 * RGBA色文字列をRGB値オブジェクトに変換する（アルファ値を考慮）
 */
function parseRgbaString(
  rgba: string
): { r: number; g: number; b: number; a: number } | null {
  const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (!match) return null;

  const [, r, g, b, a] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    a: parseFloat(a),
  };
}

/**
 * Hex色をRGB値に変換する
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * RGB値から相対輝度を計算する（WCAG 2.1準拠）
 */
function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * 要素の実効的な背景色を取得する
 * 親要素を辿って背景色が設定されている最も近い要素の色を返す
 */
function getEffectiveBackgroundColor(element: Element): string {
  let currentElement: Element | null = element;
  let backgroundColor = "transparent";

  while (currentElement && backgroundColor === "transparent") {
    const style = window.getComputedStyle(currentElement);
    backgroundColor = style.backgroundColor;

    if (
      backgroundColor === "transparent" ||
      backgroundColor === "rgba(0, 0, 0, 0)"
    ) {
      currentElement = currentElement.parentElement;
    }
  }

  // 最終的に背景色が見つからなかった場合はデフォルトの白を返す
  return backgroundColor === "transparent"
    ? "rgb(255, 255, 255)"
    : backgroundColor;
}

/**
 * コントラスト比の実装が正しいかを検証する
 * 単体テスト代わりの関数
 */
function validateContrastRatioImplementation(): boolean {
  // 黒と白のコントラスト比は21:1
  const blackWhite = calculateContrastRatio("rgb(0,0,0)", "rgb(255,255,255)");
  if (Math.abs(blackWhite - 21) > 0.1) return false;

  // 中間グレーと白のコントラスト比は約3:1
  const greyWhite = calculateContrastRatio(
    "rgb(128,128,128)",
    "rgb(255,255,255)"
  );
  if (Math.abs(greyWhite - 3) > 0.3) return false;

  return true;
}

/**
 * 2つの色の間のコントラスト比を計算する（WCAG 2.1準拠）
 */
function calculateContrastRatio(color1: string, color2: string): number {
  let rgb1: { r: number; g: number; b: number } | null = null;
  let rgb2: { r: number; g: number; b: number } | null = null;

  // color1の解析
  if (color1.startsWith("rgb(")) {
    rgb1 = parseRgbString(color1);
  } else if (color1.startsWith("rgba(")) {
    const rgba = parseRgbaString(color1);
    if (rgba) rgb1 = { r: rgba.r, g: rgba.g, b: rgba.b };
  } else if (color1.startsWith("#")) {
    rgb1 = hexToRgb(color1);
  } else {
    const namedColors: { [key: string]: string } = {
      black: "#000000",
      white: "#ffffff",
      red: "#ff0000",
      green: "#008000",
      blue: "#0000ff",
      yellow: "#ffff00",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      silver: "#c0c0c0",
      gray: "#808080",
      grey: "#808080",
    };
    const hex = namedColors[color1.toLowerCase()];
    if (hex) rgb1 = hexToRgb(hex);
  }

  // color2の解析
  if (color2.startsWith("rgb(")) {
    rgb2 = parseRgbString(color2);
  } else if (color2.startsWith("rgba(")) {
    const rgba = parseRgbaString(color2);
    if (rgba) rgb2 = { r: rgba.r, g: rgba.g, b: rgba.b };
  } else if (color2.startsWith("#")) {
    rgb2 = hexToRgb(color2);
  } else {
    const namedColors: { [key: string]: string } = {
      black: "#000000",
      white: "#ffffff",
      red: "#ff0000",
      green: "#008000",
      blue: "#0000ff",
      yellow: "#ffff00",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      silver: "#c0c0c0",
      gray: "#808080",
      grey: "#808080",
    };
    const hex = namedColors[color2.toLowerCase()];
    if (hex) rgb2 = hexToRgb(hex);
  }

  if (!rgb1 || !rgb2) return 1; // 解析失敗時は最低値を返す

  const lum1 = calculateRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
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
      const isBold =
        parseInt(style.fontWeight, 10) >= 700 || style.fontWeight === "bold";
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);

      // WCAGガイドラインに基づく閾値
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
 * @param color CSS色文字列
 * @returns RGB値の配列 [r, g, b]
 */
function extractRGB(color: string): number[] {
  // RGB形式
  if (color.startsWith("rgb(")) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
      ];
    }
  }

  // RGBA形式
  if (color.startsWith("rgba(")) {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (match) {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
      ];
    }
  }

  // HEX形式
  if (color.startsWith("#")) {
    const hex = color.substring(1);
    if (hex.length === 3) {
      // 短縮形式 (#RGB)
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    } else if (hex.length === 6) {
      // 通常形式 (#RRGGBB)
      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
      ];
    }
  }

  return [0, 0, 0];
}

/**
 * アクセシビリティの問題を検出する
 * @returns 見つかった問題の配列
 */
export function detectAccessibilityIssues(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  // 各種チェックを実行
  issues.push(...checkImagesForAlt());
  issues.push(...checkFormLabels());
  issues.push(...checkHeadingHierarchy());
  issues.push(...checkContrastRatio());

  return issues;
}

/**
 * アクセシビリティの問題をコンソールに出力する
 * 開発時のデバッグ用
 */
export function logAccessibilityIssues(): void {
  if (typeof document === "undefined") return;

  const issues = detectAccessibilityIssues();

  if (issues.length === 0) {
    console.log("✅ アクセシビリティの問題は検出されませんでした");
    return;
  }

  console.log(`🚨 ${issues.length}件のアクセシビリティの問題が検出されました:`);

  const groupedIssues: { [key: string]: AccessibilityIssue[] } = {};
  issues.forEach((issue) => {
    if (!groupedIssues[issue.type]) {
      groupedIssues[issue.type] = [];
    }
    groupedIssues[issue.type].push(issue);
  });

  Object.entries(groupedIssues).forEach(([type, typeIssues]) => {
    console.group(`${type} (${typeIssues.length}件)`);
    typeIssues.forEach((issue) => {
      console.log(`- ${issue.description} [${issue.impact}]`);
      console.log(issue.element);
      if (issue.helpUrl) {
        console.log(`  詳細: ${issue.helpUrl}`);
      }
    });
    console.groupEnd();
  });
}
