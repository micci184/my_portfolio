import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://micci184.dev";
  // 一度だけ日付を生成して再利用
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // フラグメント識別子（#）はサイトマップでは無効なため、
    // SPAのセクションはトップページのみに含め、個別のエントリは作成しない
  ];
}
