export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AWSクラウド",
    skills: [
      "EC2 (仮想サーバー)",
      "S3 (ストレージ)",
      "RDS (データベース)",
      "Lambda (サーバーレス関数)",
      "EKS (Kubernetes管理)",
      "CloudFront (CDN)",
      "Route53 (DNS管理)",
      "CloudWatch (監視)",
      "IAM (アクセス管理)",
      "VPC (ネットワーク設計)",
    ],
  },
  {
    category: "Google Cloud",
    skills: [
      "Compute Engine (仮想マシン)",
      "Cloud Storage (オブジェクトストレージ)",
      "Pub/Sub (メッセージングサービス)",
      "Cloud Functions (サーバーレス関数)",
      "GKE (Kubernetes管理)",
      "Cloud Monitoring (監視サービス)",
    ],
  },
  {
    category: "DevOpsツール",
    skills: [
      "Docker (コンテナ化とイメージ管理)",
      "Kubernetes (コンテナオーケストレーション)",
      "Terraform (IaCツール)",
      "Ansible (構成管理)",
      "Jenkins (CI/CDパイプライン)",
      "GitHub Actions (CI/CD自動化)",
      "ArgoCD (GitOpsツール)",
      "Helm (Kubernetesパッケージ管理)",
    ],
  },
  {
    category: "監視とセキュリティ",
    skills: [
      "Prometheus (メトリクス収集)",
      "Grafana (ダッシュボード構築)",
      "ELK Stack (ログ管理と分析)",
      "AWS Security Hub (セキュリティ管理)",
      "AWS WAF (ウェブアプリケーションファイアウォール)",
      "AWS GuardDuty (脆威検知)",
      "Vault (シークレット管理)",
      "OWASPセキュリティチェック",
    ],
  },
  {
    category: "プログラミング言語",
    skills: [
      "JavaScript/TypeScript (フロントエンド開発)",
      "Python (自動化スクリプト、データ処理)",
      "Go (マイクロサービス開発)",
      "Bash (シェルスクリプト)",
      "SQL (データベース操作)",
      "HCL (Terraform設定言語)",
      "YAML (Kubernetesマニフェスト、CI/CD設定)",
    ],
  },
  {
    category: "フロントエンド技術",
    skills: [
      "React (コンポーネント開発)",
      "Next.js (Reactフレームワーク)",
      "Tailwind CSS (スタイル設計)",
      "Jest/RTL (フロントエンドテスト)",
      "Storybook (コンポーネントカタログ)",
      "Redux/Context API (状態管理)",
      "Responsive Design (マルチデバイス対応)",
      "Webパフォーマンス最適化",
    ],
  },
];