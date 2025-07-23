export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    title: "Senior Cloud Engineer",
    company: "TechCorp",
    period: "2022 - Present",
    description:
      "Leading cloud infrastructure design and implementation for enterprise applications. Architecting scalable solutions on AWS and Google Cloud with focus on cost optimization and security.",
    achievements: [
      "AWS Solutions Architect",
      "50% cost reduction",
      "99.9% uptime SLA",
      "Multi-region deployment",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description:
      "Built cloud-native applications with modern tech stack. Implemented CI/CD pipelines, containerized applications, and managed Kubernetes clusters in production.",
    achievements: [
      "Docker & K8s expert",
      "CI/CD automation",
      "Microservices architecture",
      "Real-time systems",
    ],
  },
  {
    title: "Frontend Developer",
    company: "WebStudio",
    period: "2019 - 2020",
    description:
      "Developed responsive web applications and collaborated with DevOps teams to implement modern deployment strategies using cloud platforms.",
    achievements: [
      "React specialist",
      "Cloud deployment",
      "Performance optimization",
      "Modern tooling",
    ],
  },
];
