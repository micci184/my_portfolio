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
    <div className="flex h-full items-center justify-center p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Let's Build Something Amazing
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-light-slate md:text-xl">
            I'm always interested in new opportunities and exciting cloud
            projects. Whether you need a cloud architect, full-stack developer,
            or just want to chat about tech, feel free to reach out!
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:neon-glow md:p-8">
            <Mail className="mx-auto mb-4 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-slate mb-4">Drop me a line anytime</p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="mailto:contact@micci184.dev">Send Email</a>
            </Button>
          </div>

          <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:neon-glow md:p-8">
            <Download className="mx-auto mb-4 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12" />
            <h3 className="text-xl font-semibold text-white mb-2">Resume</h3>
            <p className="text-slate mb-4">View my full experience</p>
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
          <h3 className="mb-8 text-2xl font-semibold text-white">
            Connect With Me
          </h3>
          <div className="flex justify-center gap-4 md:gap-6">
            {socialItems.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:neon-glow md:h-16 md:w-16"
              >
                <Icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
