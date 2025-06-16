import {
  Mail,
  Download,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialItem {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

export default function ContactSection() {
  const socialItems: SocialItem[] = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/micci184",
      color: "#333",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/micci184",
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/micci184",
      color: "#0077B5",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/micci184",
      color: "#E4405F",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center p-4 pb-20 sm:p-6 md:p-8 md:pb-8">
      <div className="mx-auto w-full max-w-4xl space-y-10 text-center md:space-y-12">
        <div>
          <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
            Let's Build Something Amazing
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-light-slate md:text-lg">
            I'm always interested in new opportunities and exciting cloud
            projects. Whether you need a cloud architect, full-stack developer,
            or just want to chat about tech, feel free to reach out!
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2 md:gap-8">
          <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:neon-glow">
            <Mail className="mx-auto mb-3 h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10" />
            <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
              Email
            </h3>
            <p className="mb-4 text-sm text-slate md:text-base">
              Drop me a line anytime
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="mailto:contact@micci184.dev">Send Email</a>
            </Button>
          </div>

          <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:neon-glow">
            <Download className="mx-auto mb-3 h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10" />
            <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
              Resume
            </h3>
            <p className="mb-4 text-sm text-slate md:text-base">
              View my full experience
            </p>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-xl font-semibold md:mb-8 md:text-2xl">
            Connect With Me
          </h3>
          <div className="flex justify-center gap-4 md:gap-6">
            {socialItems.map(({ name, icon: Icon, href, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow md:h-14 md:w-14"
                style={{
                  borderColor: color,
                  borderWidth: "2px",
                }}
              >
                <Icon
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 md:h-7 md:w-7"
                  style={{ color: color }}
                />
                <span className="sr-only">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
