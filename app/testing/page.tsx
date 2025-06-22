import { Metadata } from "next";
import TestingDashboard from "@/app/components/testing/TestingDashboard";

export const metadata: Metadata = {
  title: "テスト・検証ダッシュボード | My Portfolio",
  description:
    "Next.js 15.3.3 および React 19.1.0 のパフォーマンス、互換性、アクセシビリティのテスト・検証ダッシュボード",
};

export default function TestingPage() {
  return (
    <main>
      <TestingDashboard />
    </main>
  );
}
