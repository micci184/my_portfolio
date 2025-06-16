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
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-4xl space-y-6 md:space-y-8">
        <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">
          Professional Experience
        </h2>

        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:neon-glow sm:p-6 md:p-8"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative z-10">
                <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold md:text-xl lg:text-2xl">
                      {exp.title}
                    </h3>
                    <div className="flex flex-col items-start gap-1 text-slate sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-base font-medium text-primary md:text-lg">
                        {exp.company}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-sm md:text-base">{exp.period}</span>
                    </div>
                  </div>
                  <ChevronRight className="absolute right-4 top-4 hidden h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1 sm:right-6 sm:top-6 md:h-6 md:w-6 lg:static lg:block" />
                </div>

                <p className="mb-4 text-sm leading-relaxed text-light-slate md:mb-6 md:text-base">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <span
                      key={i}
                      className="glass rounded-full px-3 py-1 text-xs text-primary/80 sm:px-4 sm:py-2 sm:text-sm md:border md:border-primary/20"
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
