export interface SkillGroup {
  category: string;
  skills: string[];
}

export const cloudSkills: SkillGroup[] = [
  {
    category: "AWSサービス",
    skills: [
      "EC2 (仮想サーバー構築と運用)",
      "ECS/Fargate (コンテナオーケストレーション)",
      "Lambda (サーバーレス関数開発)",
      "S3 (オブジェクトストレージ管理)",
      "RDS/Aurora (データベース設計と運用)",
      "CloudFormation (インフラのコード化)",
      "CloudWatch (監視とログ管理)",
      "API Gateway (REST/WebSocket API構築)",
      "Route53 (DNS管理)",
      "VPC (ネットワーク設計)",
      "IAM (アクセス権限管理)",
    ],
  },
  {
    category: "Google Cloudサービス",
    skills: [
      "Compute Engine (仮想マシン管理)",
      "Cloud Run (コンテナサービス)",
      "BigQuery (データ分析基盤)",
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
      "AWS GuardDuty (脅威検知)",
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
