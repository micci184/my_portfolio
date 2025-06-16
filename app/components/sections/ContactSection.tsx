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
    <div className="flex items-center justify-center h-full p-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-light-slate max-w-2xl mx-auto leading-relaxed">
            I'm always interested in new opportunities and exciting cloud
            projects. Whether you need a cloud architect, full-stack developer,
            or just want to chat about tech, feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group">
            <Mail className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-slate mb-4">Drop me a line anytime</p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="mailto:contact@micci184.dev">Send Email</a>
            </Button>
          </div>

          <div className="glass p-8 rounded-2xl hover:neon-glow transition-all duration-300 group">
            <Download className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
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
          <h3 className="text-2xl font-semibold text-white mb-8">
            Connect With Me
          </h3>
          <div className="flex justify-center gap-6">
            {socialItems.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300 group"
              >
                <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
