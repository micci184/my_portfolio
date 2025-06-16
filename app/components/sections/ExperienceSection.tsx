import { ChevronRight } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function ExperienceSection() {
  const experiences: Experience[] = [
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

  return (
    <div className="flex h-full items-center justify-center p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
          Professional Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:neon-glow md:p-8"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative z-10">
                <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white md:text-2xl">
                      {exp.title}
                    </h3>
                    <div className="flex flex-col items-start gap-1 text-slate sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-lg font-medium text-primary">
                        {exp.company}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ChevronRight className="absolute right-6 top-6 h-6 w-6 text-primary transition-transform duration-300 group-hover:translate-x-1 lg:static lg:block" />
                </div>

                <p className="mb-6 leading-relaxed text-light-slate">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <span
                      key={i}
                      className="glass px-4 py-2 rounded-full text-sm text-primary border border-primary/20"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
