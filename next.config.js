/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 画像最適化の設定
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 外部パッケージのバンドリングを最適化
  // Pagesルーターでも自動的に外部パッケージをバンドルする
  bundlePagesRouterDependencies: true,
  // バンドルから除外する特定のパッケージ
  serverExternalPackages: [],
  // Next.js 15のクライアント側ルーターキャッシュの設定
  experimental: {
    staleTimes: {
      dynamic: 30, // 動的ルートのキャッシュ時間（秒）
      static: 180, // 静的ルートのキャッシュ時間（秒）
    },
    // PPRはcanaryバージョンでのみ使用可能なため無効化
    // ppr: 'incremental',
    // next/after APIを有効化
    after: true,
  },
};

module.exports = nextConfig;
