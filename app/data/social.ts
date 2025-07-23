import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export interface SocialItem {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

export const socialItems: SocialItem[] = [
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
