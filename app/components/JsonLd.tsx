import Script from "next/script";
import { createHash } from "crypto";

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

/**
 * JSON-LDを出力するコンポーネント
 * SSRで出力されるため、SEO効果を最大化します
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  // データの内容からハッシュを生成し、安定したIDを作成
  const stableId =
    id ||
    `json-ld-${createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex")
      .substring(0, 8)}`;

  return (
    <Script
      id={stableId}
      type="application/ld+json"
      strategy="beforeInteractive"
      // JSON.stringifyによりエスケープ済みなのでXSS問題なし
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
