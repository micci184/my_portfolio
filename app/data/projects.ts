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
  },
];
