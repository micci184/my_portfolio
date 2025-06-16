import { ThemeProvider } from "next-themes";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = localFont({
  src: "../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "micci184 - Full Stack Engineer & Cloud Architect",
  description:
    "Portfolio of micci184, a Full Stack Engineer and Cloud Architect specializing in cloud-native applications and infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
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
