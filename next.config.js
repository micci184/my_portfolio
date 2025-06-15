/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 画像最適化の設定
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
