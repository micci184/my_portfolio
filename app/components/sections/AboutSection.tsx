import { Cloud, Server, Shield, Cpu } from "lucide-react";

interface SkillGroup {
  category: string;
  skills: string[];
}

export default function AboutSection() {
  const cloudSkills: SkillGroup[] = [
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

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
            <div className="space-y-4 text-light-slate text-lg leading-relaxed">
              <p>
                Hi! I'm{" "}
                <span className="text-primary font-semibold">micci184</span>, a
                passionate full-stack engineer and cloud architect who
                specializes in building scalable, cloud-native applications. My
                journey started in 2019, and I've since focused on mastering
                both development and cloud infrastructure.
              </p>
              <p>
                Today, I specialize in designing and implementing cloud
                solutions on AWS and Google Cloud Platform, building
                microservices architectures, and creating high-performance web
                applications. I have extensive experience with containerization,
                orchestration, and DevOps practices.
              </p>
              <p>
                When I'm not architecting cloud solutions, you'll find me
                contributing to open source projects, exploring new cloud
                services, or sharing knowledge about cloud-native development
                patterns.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cloudSkills.map((skillGroup) => (
                <div key={skillGroup.category} className="glass p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-muted rounded text-xs text-light-slate border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass p-8 rounded-2xl neon-glow float-animation">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-background" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">5+ Years</h4>
                  <p className="text-slate">Cloud & Development Experience</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-slate">Cloud Projects</div>
                </div>
                <div className="glass p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-slate">Uptime SLA</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-primary" />
                  <span className="text-white">Cloud Architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-primary" />
                  <span className="text-white">Microservices Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-white">Security & Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span className="text-white">Performance Optimization</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h5 className="text-white font-semibold mb-2">
                  Certifications
                </h5>
                <div className="space-y-1 text-sm text-light-slate">
                  <div>• AWS Solutions Architect</div>
                  <div>• Google Cloud Professional</div>
                  <div>• Kubernetes Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
