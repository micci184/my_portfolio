import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// OGイメージ生成をキャッシュするように設定
export const dynamic = "force-static";
// Edgeランタイムは使用しない（force-staticと競合するため）
// export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title =
      searchParams.get("title") ||
      "micci184 - Full Stack Engineer & Cloud Architect";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "white",
            background: "#0f172a",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {title}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url),
              { cache: "force-cache" }
            ).then((res) => res.arrayBuffer()),
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    return new Response(`Failed to generate OG image: ${e}`, {
      status: 500,
    });
  }
}
