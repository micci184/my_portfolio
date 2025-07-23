export interface SkillGroup {
  category: string;
  skills: string[];
}

export const cloudSkills: SkillGroup[] = [
  {
    category: "AWS Services",
    skills: [
      "EC2",
      "ECS",
      "Lambda",
      "S3",
      "RDS",
      "CloudFormation",
      "CloudWatch",
      "API Gateway",
    ],
  },
  {
    category: "Google Cloud",
    skills: [
      "Compute Engine",
      "Cloud Run",
      "BigQuery",
      "Cloud Storage",
      "Pub/Sub",
      "Cloud Functions",
    ],
  },
  {
    category: "DevOps & Infrastructure",
    skills: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "Jenkins",
      "GitHub Actions",
    ],
  },
  {
    category: "Monitoring & Security",
    skills: [
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "AWS IAM",
      "Cloud Security",
      "Network Security",
    ],
  },
];
