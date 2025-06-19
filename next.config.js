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
  // Next.js 15のクライアント側ルーターキャッシュの設定
  experimental: {
    staleTimes: {
      dynamic: 30, // 動的ルートのキャッシュ時間（秒）
      static: 180, // 静的ルートのキャッシュ時間（秒）
    },
    // Partial Prerendering (PPR)を段階的に導入
    ppr: "incremental",
  },
};

module.exports = nextConfig;
