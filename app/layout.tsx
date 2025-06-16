import { ThemeProvider } from "next-themes";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "micci184 - Full Stack Engineer & Cloud Architect",
  description:
    "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
  keywords: [
    "micci184",
    "Full Stack Engineer",
    "Cloud Architect",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AWS",
    "GCP",
    "Azure",
  ],
  authors: [{ name: "micci184" }],
  creator: "micci184",
  publisher: "micci184",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://micci184.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micci184 - Full Stack Engineer & Cloud Architect",
    description:
      "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
    url: "https://micci184.dev",
    siteName: "micci184 Portfolio",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "micci184 Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "micci184 - Full Stack Engineer & Cloud Architect",
    description:
      "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
    creator: "@micci184",
    images: ["/images/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
