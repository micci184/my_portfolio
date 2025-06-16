import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
}

export function ProjectsSection() {
  const projects: Project[] = [
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
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      featured: false,
    },
  ];

  return (
    <div className="flex h-full items-center justify-center p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <div
                key={project.id}
                className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:neon-glow"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-64"
                    priority={project.featured}
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-light-slate">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted rounded-full text-sm text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4"
            asChild
          >
            <a
              href="https://github.com/micci184"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
