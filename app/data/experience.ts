export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    title: "クラウドインフラエンジニア",
    company: "株式会社テックジャパン",
    period: "2022年4月 - 現在",
    description:
      "大規模金融システムのクラウド移行プロジェクトをリード。AWSとGCPを活用したハイブリッドクラウド環境の設計と実装を担当。セキュリティとコスト最適化を重視したアーキテクチャ設計を行い、運用効率の向上に貢献。",
    achievements: [
      "AWS認定ソリューションアーキテクト プロフェッショナル取得",
      "インフラコスト40%削減を実現",
      "システム可用性99.99%達成",
      "マルチリージョン災害対策システム構築",
      "セキュリティ監査で指摘ゼロを達成"
    ],
  },
  {
    title: "DevOpsエンジニア",
    company: "テックスタートアップ株式会社",
    period: "2020年6月 - 2022年3月",
    description:
      "フィンテックサービスのバックエンド開発とインフラ構築を担当。マイクロサービスアーキテクチャの設計・実装、CI/CDパイプラインの構築、Kubernetesクラスタの運用管理を行い、サービスの安定運用と迅速なデプロイを実現。",
    achievements: [
      "Kubernetes環境の構築と運用自動化",
      "デプロイ時間を30分から5分に短縮",
      "マイクロサービスアーキテクチャへの移行完了",
      "障害検知・復旧の自動化システム構築",
      "チーム向けDevOpsトレーニングを実施"
    ],
  },
  {
    title: "Webアプリケーションエンジニア",
    company: "デジタルソリューションズ株式会社",
    period: "2019年4月 - 2020年5月",
    description:
      "ECサイトのフロントエンド開発を担当。React、TypeScriptを使用したモダンなUI実装と、パフォーマンス最適化を実施。バックエンドチームと連携し、RESTful APIの設計と実装にも参加。",
    achievements: [
      "Reactコンポーネントライブラリの構築",
      "ページ読み込み速度を60%改善",
      "レスポンシブデザインの実装と最適化",
      "アクセシビリティ対応によるWCAG準拠",
      "Jest/RTLによるテスト自動化の導入"
    ],
  },
];
