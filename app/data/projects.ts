export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "金融システムクラウド移行プロジェクト",
    description:
      "大規模金融機関のオンプレミスシステムをAWSへ移行するプロジェクト。マルチAZ構成、自動スケーリング、ロードバランシングを実装し、災害対策としてマルチリージョン構成を採用。99.99%の可用性と40%のコスト削減を実現。",
    tech: [
      "AWS",
      "EC2",
      "RDS Aurora",
      "ELB",
      "CloudFormation",
      "Lambda",
      "CloudWatch",
      "Route53",
      "Terraform",
      "Ansible",
    ],
    github: "https://github.com/micci184/financial-cloud-migration",
    live: "https://case-study.micci184.dev/financial-cloud",
    image: "/images/projects/financial-cloud.webp",
    featured: true,
  },
  {
    id: 2,
    title: "マイクロサービスベースのフィンテックアプリ",
    description:
      "Kubernetes上で動作するマイクロサービスアーキテクチャを採用したフィンテックアプリケーション。CI/CDパイプラインの自動化、ブルー/グリーンデプロイメント、カナリアリリースを実装。デプロイ時間を30分から5分に短縮。",
    tech: [
      "Kubernetes",
      "Docker",
      "Go",
      "gRPC",
      "PostgreSQL",
      "Redis",
      "Istio",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
    github: "https://github.com/micci184/fintech-microservices",
    live: "https://fintech-demo.micci184.dev",
    image: "/images/projects/fintech-app.webp",
    featured: true,
  },
  {
    id: 3,
    title: "ECサイトフロントエンド最適化",
    description:
      "大規模ECサイトのフロントエンド改善プロジェクト。React、TypeScriptを使用したコンポーネント設計とパフォーマンス最適化により、ページ読み込み速度を60%改善。アクセシビリティ対応とレスポンシブデザインの実装。",
    tech: [
      "React", 
      "TypeScript", 
      "Next.js", 
      "Tailwind CSS", 
      "Jest", 
      "React Testing Library", 
      "Storybook"
    ],
    github: "https://github.com/micci184/ecommerce-frontend",
    live: "https://ecommerce-demo.micci184.dev",
    image: "/images/projects/ecommerce-frontend.webp",
    featured: true,
  },
  {
    id: 4,
    title: "インフラ監視ダッシュボード",
    description:
      "複数のクラウド環境を一元監視するダッシュボードシステム。Prometheus、Grafanaを活用したメトリクス収集と可視化、アラート自動化を実装。障害検知時間を平均15分短縮し、システム全体の安定性を向上。",
    tech: [
      "Prometheus", 
      "Grafana", 
      "Alertmanager", 
      "Node Exporter", 
      "AWS CloudWatch", 
      "Google Cloud Monitoring", 
      "Slack API"
    ],
    github: "https://github.com/micci184/monitoring-dashboard",
    live: "https://monitoring-demo.micci184.dev",
    image: "/images/projects/monitoring-dashboard.webp",
    featured: false,
  },
  {
    id: 5,
    title: "Infrastructure as Code テンプレート",
    description:
      "AWSインフラをコードで管理するためのTerraformモジュールセット。VPC、EKS、RDS、監視、セキュリティ設定など、ベストプラクティスに基づいた構成を提供。複数環境での一貫したインフラ構築を実現。",
    tech: [
      "Terraform", 
      "AWS", 
      "CloudFormation", 
      "GitHub Actions", 
      "Terratest", 
      "Checkov"
    ],
    github: "https://github.com/micci184/aws-terraform-modules",
    live: "https://terraform-modules.micci184.dev",
    image: "/images/projects/terraform-modules.webp",
    featured: false,
  },
];
