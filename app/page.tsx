import Portfolio from "@/app/components/layout/Portfolio";
import JsonLd from "@/app/components/JsonLd";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "micci184",
    jobTitle: "Full Stack Engineer & Cloud Architect",
    url: "https://micci184.dev",
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
    url: "https://micci184.dev",
    description:
      "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <Portfolio />
    </>
  );
}
