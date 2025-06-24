"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import {
  collectPerformanceMetrics,
  collectBrowserCompatibility,
  detectAccessibilityIssues,
  type PerformanceMetrics,
  type BrowserCompatibility,
  type AccessibilityIssue,
} from "@/app/utils/testing";

export default function TestingDashboard() {
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({});
  const [browserCompatibility, setBrowserCompatibility] =
    useState<BrowserCompatibility | null>(null);
  const [accessibilityIssues, setAccessibilityIssues] = useState<
    AccessibilityIssue[]
  >([]);
  const [activeTab, setActiveTab] = useState("performance");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初期ロード時にテストを実行
    const runTests = () => {
      setIsLoading(true);

      // パフォーマンスメトリクス収集
      setTimeout(() => {
        setPerformanceMetrics(collectPerformanceMetrics());

        // ブラウザ互換性
        setBrowserCompatibility(collectBrowserCompatibility());

        // アクセシビリティ
        setAccessibilityIssues(detectAccessibilityIssues());

        setIsLoading(false);
      }, 2000); // ページ読み込み完了後に少し遅延させて測定
    };

    window.addEventListener("load", runTests);

    // すでにロード済みの場合は直接実行
    if (document.readyState === "complete") {
      runTests();
    }

    return () => {
      window.removeEventListener("load", runTests);
    };
  }, []);

  // パフォーマンスメトリクスの評価
  const getPerformanceRating = (
    metric: string,
    value?: number
  ): { status: "good" | "needs-improvement" | "poor"; label: string } => {
    if (value === undefined) {
      return { status: "needs-improvement", label: "測定不可" };
    }

    switch (metric) {
      case "lcp":
        if (value < 2500) return { status: "good", label: "良好" };
        if (value < 4000)
          return { status: "needs-improvement", label: "改善の余地あり" };
        return { status: "poor", label: "改善が必要" };
      case "fcp":
        if (value < 1800) return { status: "good", label: "良好" };
        if (value < 3000)
          return { status: "needs-improvement", label: "改善の余地あり" };
        return { status: "poor", label: "改善が必要" };
      case "cls":
        if (value < 0.1) return { status: "good", label: "良好" };
        if (value < 0.25)
          return { status: "needs-improvement", label: "改善の余地あり" };
        return { status: "poor", label: "改善が必要" };
      default:
        return { status: "needs-improvement", label: "不明" };
    }
  };

  // テストを再実行
  const handleRunTests = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPerformanceMetrics(collectPerformanceMetrics());
      setBrowserCompatibility(collectBrowserCompatibility());
      setAccessibilityIssues(detectAccessibilityIssues());
      setIsLoading(false);
    }, 1000);
  };

  // ステータスバッジのレンダリング
  const renderStatusBadge = (status: "good" | "needs-improvement" | "poor") => {
    switch (status) {
      case "good":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> 良好
          </Badge>
        );
      case "needs-improvement":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <AlertTriangle className="w-3 h-3 mr-1" /> 要改善
          </Badge>
        );
      case "poor":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="w-3 h-3 mr-1" /> 問題あり
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">テスト・検証ダッシュボード</h1>
        <Button onClick={handleRunTests} disabled={isLoading} variant="outline">
          {isLoading ? "テスト実行中..." : "テストを再実行"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
          <TabsTrigger value="compatibility">ブラウザ互換性</TabsTrigger>
          <TabsTrigger value="accessibility">アクセシビリティ</TabsTrigger>
        </TabsList>

        {/* パフォーマンスタブ */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LCP */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>LCP (Largest Contentful Paint)</span>
                  {renderStatusBadge(
                    getPerformanceRating("lcp", performanceMetrics.lcp).status
                  )}
                </CardTitle>
                <CardDescription>最大コンテンツ描画時間</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {performanceMetrics.lcp
                    ? `${performanceMetrics.lcp.toFixed(2)} ms`
                    : "測定中..."}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ページの主要なコンテンツが表示されるまでの時間。2.5秒未満が理想的です。
                </p>
              </CardContent>
            </Card>

            {/* FCP */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>FCP (First Contentful Paint)</span>
                  {renderStatusBadge(
                    getPerformanceRating("fcp", performanceMetrics.fcp).status
                  )}
                </CardTitle>
                <CardDescription>初回コンテンツ描画時間</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {performanceMetrics.fcp
                    ? `${performanceMetrics.fcp.toFixed(2)} ms`
                    : "測定中..."}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ページの最初のコンテンツが表示されるまでの時間。1.8秒未満が理想的です。
                </p>
              </CardContent>
            </Card>

            {/* CLS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>CLS (Cumulative Layout Shift)</span>
                  {renderStatusBadge(
                    getPerformanceRating("cls", performanceMetrics.cls).status
                  )}
                </CardTitle>
                <CardDescription>累積レイアウトシフト</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {performanceMetrics.cls !== undefined
                    ? performanceMetrics.cls.toFixed(3)
                    : "測定中..."}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ページの視覚的な安定性を示す指標。0.1未満が理想的です。
                </p>
              </CardContent>
            </Card>

            {/* 総合評価 */}
            <Card>
              <CardHeader>
                <CardTitle>総合パフォーマンス評価</CardTitle>
                <CardDescription>Core Web Vitalsの総合評価</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert
                  className={`
                  ${
                    !performanceMetrics.lcp
                      ? "bg-gray-50"
                      : performanceMetrics.lcp < 2500 &&
                        (performanceMetrics.fcp || 0) < 1800
                      ? "bg-green-50"
                      : performanceMetrics.lcp > 4000 ||
                        (performanceMetrics.fcp || 0) > 3000
                      ? "bg-red-50"
                      : "bg-yellow-50"
                  }
                `}
                >
                  <AlertTitle className="flex items-center">
                    {!performanceMetrics.lcp ? (
                      <Info className="h-4 w-4 mr-2" />
                    ) : performanceMetrics.lcp < 2500 &&
                      (performanceMetrics.fcp || 0) < 1800 ? (
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    ) : performanceMetrics.lcp > 4000 ||
                      (performanceMetrics.fcp || 0) > 3000 ? (
                      <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                    )}
                    {!performanceMetrics.lcp
                      ? "測定中..."
                      : performanceMetrics.lcp < 2500 &&
                        (performanceMetrics.fcp || 0) < 1800
                      ? "良好"
                      : performanceMetrics.lcp > 4000 ||
                        (performanceMetrics.fcp || 0) > 3000
                      ? "改善が必要"
                      : "改善の余地あり"}
                  </AlertTitle>
                  <AlertDescription>
                    {!performanceMetrics.lcp
                      ? "パフォーマンスメトリクスを測定中です..."
                      : performanceMetrics.lcp < 2500 &&
                        (performanceMetrics.fcp || 0) < 1800
                      ? "主要なパフォーマンス指標は良好です。"
                      : performanceMetrics.lcp > 4000 ||
                        (performanceMetrics.fcp || 0) > 3000
                      ? "パフォーマンスに問題があります。最適化が必要です。"
                      : "パフォーマンスに改善の余地があります。"}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 互換性タブ */}
        <TabsContent value="compatibility">
          <Card>
            <CardHeader>
              <CardTitle>ブラウザ互換性</CardTitle>
              <CardDescription>現在のブラウザの互換性情報</CardDescription>
            </CardHeader>
            <CardContent>
              {browserCompatibility ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">ブラウザ情報</h3>
                    <p>
                      <strong>ブラウザ:</strong>{" "}
                      {browserCompatibility.browser.name || "不明"}{" "}
                      {browserCompatibility.browser.version || ""}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {browserCompatibility.userAgent}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">機能サポート</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(browserCompatibility.features).map(
                        ([feature, isSupported]) => (
                          <div key={feature} className="flex items-center">
                            {isSupported ? (
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                            )}
                            <span>{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p>ブラウザ情報を取得中...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* アクセシビリティタブ */}
        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>アクセシビリティチェック</span>
                <Badge
                  variant="outline"
                  className={`
                  ${
                    accessibilityIssues.length === 0
                      ? "bg-green-50 text-green-700 border-green-200"
                      : accessibilityIssues.some(
                          (issue) =>
                            issue.impact === "critical" ||
                            issue.impact === "serious"
                        )
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                `}
                >
                  {accessibilityIssues.length === 0 ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" /> 問題なし
                    </>
                  ) : accessibilityIssues.some(
                      (issue) =>
                        issue.impact === "critical" ||
                        issue.impact === "serious"
                    ) ? (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />{" "}
                      {accessibilityIssues.length}件の問題
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />{" "}
                      {accessibilityIssues.length}件の警告
                    </>
                  )}
                </Badge>
              </CardTitle>
              <CardDescription>
                アクセシビリティに関する問題の検出
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accessibilityIssues.length === 0 ? (
                <Alert className="bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>問題は検出されませんでした</AlertTitle>
                  <AlertDescription>
                    基本的なアクセシビリティチェックでは問題が見つかりませんでした。
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {accessibilityIssues.map((issue, index) => (
                    <Alert
                      key={index}
                      className={`
                      ${
                        issue.impact === "critical" ||
                        issue.impact === "serious"
                          ? "bg-red-50"
                          : issue.impact === "moderate"
                          ? "bg-yellow-50"
                          : "bg-blue-50"
                      }
                    `}
                    >
                      <AlertTitle className="flex items-center">
                        {issue.impact === "critical" ||
                        issue.impact === "serious" ? (
                          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                        ) : issue.impact === "moderate" ? (
                          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                        ) : (
                          <Info className="h-4 w-4 mr-2 text-blue-600" />
                        )}
                        {issue.type}
                      </AlertTitle>
                      <AlertDescription>
                        <p>{issue.description}</p>
                        {issue.helpUrl && (
                          <a
                            href={issue.helpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 block"
                          >
                            詳細情報
                          </a>
                        )}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
