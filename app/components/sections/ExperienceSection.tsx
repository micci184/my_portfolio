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
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Professional Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium text-lg">
                        {exp.company}
                      </span>
                      <span className="text-slate">•</span>
                      <span className="text-slate">{exp.period}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                <p className="text-light-slate text-lg mb-6 leading-relaxed">
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
