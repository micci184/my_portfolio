import Portfolio from "@/app/components/layout/Portfolio";
import JsonLd from "@/app/components/JsonLd";

// 構造化データを定数としてコンポーネント外で定義
// 不変データなので再レンダリング時に再生成されない
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "micci184",
  jobTitle: "Full Stack Engineer & Cloud Architect",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://micci184.dev",
  sameAs: [
    "https://github.com/micci184",
    "https://twitter.com/micci184",
    "https://www.linkedin.com/in/micci184/",
  ],
  knowsAbout: [
    "Web Development",
    "Cloud Architecture",
    "DevOps",
    "TypeScript",
    "React",
    "Next.js",
    "AWS",
    "GCP",
    "Azure",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "micci184 Portfolio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://micci184.dev",
  description:
    "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
};

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} id="person-schema" />
      <JsonLd data={websiteSchema} id="website-schema" />
      <Portfolio />
    </>
  );
}
