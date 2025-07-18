import { ThemeProvider } from "next-themes";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP as FontSans, JetBrains_Mono, Noto_Sans_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

// フォント読み込みの最適化
const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap", // テキストの早期表示のためにswapを使用
  preload: true,
  fallback: ["system-ui", "sans-serif"], // フォールバックフォントを明示的に指定
  adjustFontFallback: true, // フォントフォールバックの自動調整
});

// 英語用モノスペースフォント
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// 日本語対応モノスペースフォント
const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-mono",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// モノスペースフォント変数の統合
const fontMono = {
  variable: "--font-mono",
  className: `${jetBrainsMono.variable} ${notoSansMono.variable}`,
};

// 環境変数またはデフォルト値からサイトURLを取得
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://micci184.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: "micci184 - Full Stack Engineer & Cloud Architect",
  description:
    "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
  // 重要度の高いキーワードに絞り込み
  keywords: [
    "micci184",
    "Full Stack Engineer",
    "Cloud Architect",
    "Next.js",
    "AWS",
  ],
  // 一貫性のある設定
  authors: [{ name: "micci184" }],
  creator: "micci184",
  // robots設定はデフォルトのため省略可能だが、明示的に記述
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micci184 - Full Stack Engineer & Cloud Architect",
    description:
      "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
    url: siteUrl,
    siteName: "micci184 Portfolio",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "micci184 Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "micci184 - Full Stack Engineer & Cloud Architect",
    description:
      "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
    creator: "@micci184",
    site: "@micci184", // サイト運営用アカウント
    images: [`${siteUrl}/images/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* プリロードの最適化 */}
        <link
          rel="preload"
          href="/images/og-image.png"
          as="image"
          type="image/png"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
