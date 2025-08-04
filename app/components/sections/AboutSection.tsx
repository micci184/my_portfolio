import { Cloud, Server, Shield, Cpu } from "lucide-react";
import { skillCategories } from "@/app/data/skills";

export default function AboutSection() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
              About Me
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-light-slate md:text-lg">
              <p>
                Hi! I'm{" "}
                <span className="font-semibold text-primary">micci184</span>, a
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
            <h3 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {skillCategories.slice(0, 4).map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="glass rounded-lg p-3 sm:p-4"
                >
                  <h4 className="mb-3 text-base font-semibold text-primary md:text-lg">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-border bg-muted px-2 py-1 text-[10px] text-slate sm:text-xs"
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

        <div className="relative hidden lg:block">
          <div className="glass float-animation rounded-2xl p-6 neon-glow">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary sm:h-16 sm:w-16">
                  <Cloud className="h-6 w-6 text-primary-foreground sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground sm:text-xl">
                    5+ Years
                  </h4>
                  <p className="text-slate text-sm sm:text-base">
                    Cloud & Development Experience
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="glass rounded-lg p-3 text-center sm:p-4">
                  <div className="text-xl font-bold text-primary sm:text-2xl">
                    50+
                  </div>
                  <div className="text-xs text-slate sm:text-sm">
                    Cloud Projects
                  </div>
                </div>
                <div className="glass rounded-lg p-3 text-center sm:p-4">
                  <div className="text-xl font-bold text-primary sm:text-2xl">
                    99.9%
                  </div>
                  <div className="text-xs text-slate sm:text-sm">
                    Uptime SLA
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <Cloud className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Cloud Architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Microservices Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Security & Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    Performance Optimization
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3 sm:pt-4">
                <h5 className="mb-2 font-semibold text-foreground">
                  Certifications
                </h5>
                <div className="space-y-1 text-xs text-light-slate sm:text-sm">
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
