"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "ホーム", href: "/" },
  { name: "プロジェクト", href: "/projects" },
  { name: "ブログ", href: "/blog" },
  { name: "お問い合わせ", href: "/contact" },
  { name: "テスト", href: "/testing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40"
        aria-label="メインナビゲーション"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link 
                  href="/" 
                  className="text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label="ポートフォリオホームページ"
                >
                  My Portfolio
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8" role="menubar">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                      pathname === item.href
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                    role="menuitem"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <ThemeToggle />
            </div>
            <div className="flex items-center sm:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="sr-only">{isMenuOpen ? "メニューを閉じる" : "メニューを開く"}</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1" role="menu">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary",
                    pathname === item.href
                      ? "bg-primary/10 border-l-4 border-primary text-foreground"
                      : "border-l-4 border-transparent text-muted-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-foreground"
                  )}
                  role="menuitem"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-3">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
