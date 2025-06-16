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
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
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
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56"
                    priority={project.featured}
                  />

                  {/* Link Icons */}
                  <div className="absolute top-3 right-3 flex gap-2 sm:top-4 sm:right-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow sm:h-10 sm:w-10"
                    >
                      <Github className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow sm:h-10 sm:w-10"
                    >
                      <ExternalLink className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </a>
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-light-slate">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-muted px-2.5 py-1 text-xs text-primary/80 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8 text-center md:mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary px-6 py-3 text-base text-primary hover:bg-primary/10 sm:px-8 sm:py-4"
            asChild
          >
            <a
              href="https://github.com/micci184"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
