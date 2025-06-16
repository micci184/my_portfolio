import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 環境変数またはデフォルト値からサイトURLを取得
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://micci184.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
