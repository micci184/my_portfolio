export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  // 新しいフィールド
  period?: string; // プロジェクト期間
  role?: string; // 担当した役割
  achievements?: string[]; // 成果・実績
  category?: string[]; // プロジェクトカテゴリ
  images?: string[]; // 追加の画像（スライドショー用）
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Cloud-Native E-commerce Platform",
    description:
      "Scalable microservices architecture deployed on AWS with auto-scaling, load balancing, and multi-region deployment. Handles 100K+ concurrent users with 99.9% uptime.",
    tech: [
      "AWS",
      "Kubernetes",
      "Docker",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Terraform",
    ],
    github: "https://github.com/micci184/ecommerce-platform",
    live: "https://ecommerce-platform.vercel.app",
    image: "/images/projects/ecommerce-platform.webp",
    featured: true,
    period: "2024年1月 - 2024年6月",
    role: "テックリード・クラウドアーキテクト",
    achievements: [
      "マイクロサービスアーキテクチャの設計と実装",
      "AWS EKSを活用したKubernetesクラスタの構築",
      "CI/CDパイプラインの構築によるデプロイ時間の80%削減",
      "99.9%の可用性を実現するマルチリージョン構成の設計"
    ],
    category: ["クラウド", "マイクロサービス", "DevOps"],
    images: [
      "/images/projects/ecommerce-platform.webp",
      "/images/projects/ecommerce-platform-2.webp",
      "/images/projects/ecommerce-platform-3.webp"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description:
      "Real-time analytics platform using Google Cloud ML APIs, BigQuery for data processing, and React for visualization. Processes 1M+ events daily with machine learning insights.",
    tech: [
      "Google Cloud",
      "BigQuery",
      "Cloud Functions",
      "React",
      "Python",
      "TensorFlow",
      "Docker",
    ],
    github: "https://github.com/micci184/analytics-dashboard",
    live: "https://analytics-dashboard.com",
    image: "/images/projects/analytics-dashboard.webp",
    featured: true,
    period: "2023年8月 - 2024年2月",
    role: "フルスタックエンジニア・MLエンジニア",
    achievements: [
      "BigQueryとCloud Functionsを活用したリアルタイムデータパイプラインの構築",
      "TensorFlowを使用した予測モデルの開発と実装",
      "Reactによる直感的なダッシュボードUIの設計と実装",
      "データ処理時間を従来の1/10に短縮"
    ],
    category: ["AI/ML", "データ分析", "クラウド"],
    images: [
      "/images/projects/analytics-dashboard.webp",
      "/images/projects/analytics-dashboard-2.webp",
      "/images/projects/analytics-dashboard-3.webp"
    ]
  },
  {
    id: 3,
    title: "Infrastructure as Code Template",
    description:
      "Complete Terraform modules for AWS infrastructure deployment. Includes VPC setup, EKS cluster, RDS, monitoring, and security configurations with best practices.",
    tech: ["Terraform", "AWS", "Kubernetes", "Helm", "Prometheus", "Grafana"],
    github: "https://github.com/micci184/aws-terraform-modules",
    live: "https://terraform-modules.micci184.dev",
    image: "/images/projects/terraform-modules.webp",
    featured: false,
    period: "2023年5月 - 2023年7月",
    role: "インフラエンジニア・DevOpsエンジニア",
    achievements: [
      "再利用可能なTerraformモジュールの設計と実装",
      "セキュリティベストプラクティスに準拠したAWSリソース構成の自動化",
      "インフラのプロビジョニング時間を90%削減",
      "Prometheusとgrafanaを活用した包括的なモニタリングシステムの構築"
    ],
    category: ["DevOps", "インフラ", "クラウド"],
    images: [
      "/images/projects/terraform-modules.webp",
      "/images/projects/terraform-modules-2.webp"
    ]
  },
];
