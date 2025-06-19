/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 画像最適化の設定
  images: {
    // リモートパターンの設定（外部画像用）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // 画像最適化の詳細設定
    formats: ["image/avif", "image/webp"],
    // デフォルトの画質設定（75%が最適なバランス）
    quality: 75,
    // キャッシュ期間を1年に設定（31536000秒）
    minimumCacheTTL: 31536000,
    // 画像サイズのプリセット（よく使用されるサイズ）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 外部パッケージのバンドリングを最適化
  // Pagesルーターでも自動的に外部パッケージをバンドルする
  bundlePagesRouterDependencies: true,
  // バンドルから除外する特定のパッケージ
  serverExternalPackages: [],
  // Next.js 15の設定
  experimental: {
    // クライアント側ルーターキャッシュの設定
    staleTimes: {
      dynamic: 30, // 動的ルートのキャッシュ時間（秒）
      static: 180, // 静的ルートのキャッシュ時間（秒）
    },
    // PPRはcanaryバージョンでのみ使用可能なため無効化
    // ppr: 'incremental',
    // サーバーアクション最適化
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // キャッシュ最適化
    optimizeServerReact: true,
    // 静的ページの生成最適化
    optimizeCss: true,
    // サーバーコンポーネントの最適化
    serverMinification: true,
    // 画像最適化
    optimizeImages: true,
  },
};

module.exports = nextConfig;
