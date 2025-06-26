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
    // CSSの最適化（インライン化）
    optimizeCss: {
      // crittersを使用してCSSをインライン化
      inlineImportedCss: true,
      // crittersの設定
      prune: true,
    },
    // サーバーコンポーネントの最適化
    serverMinification: true,
  },
  // webpack設定のカスタマイズ
  webpack: (config, { dev, isServer }) => {
    // 開発環境でのキャッシュ設定
    if (dev) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7日間
        name: isServer ? "server-development" : "client-development",
      };
    }

    // 本番環境でのキャッシュ設定
    if (!dev) {
      config.cache = {
        type: "filesystem",
        compression: "gzip",
        buildDependencies: {
          config: [__filename],
        },
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30日間
        name: isServer ? "server-production" : "client-production",
      };
    }

    // vendor-chunksの最適化
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            name: (module) => {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              if (!packageName) return null;

              // 特定のパッケージをグループ化
              if (packageName.includes("@radix-ui")) return "vendor-radix-ui";
              if (packageName.includes("lucide-react")) return "vendor-lucide";
              if (packageName.includes("class-variance-authority"))
                return "vendor-cva";
              if (packageName.includes("@floating-ui"))
                return "vendor-floating-ui";

              return `vendor-${packageName.replace("@", "")}`;
            },
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
          common: {
            name: "common",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
  // ビルド出力の最適化
  output: "standalone",
};

module.exports = nextConfig;
