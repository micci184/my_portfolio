import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

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
      }
    );
  } catch (e) {
    console.log(`Error generating OG image: ${e}`);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
