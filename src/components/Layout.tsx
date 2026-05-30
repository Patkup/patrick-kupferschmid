import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";
import {
  BarChart2,
  FolderOpen,
  Globe,
  LayoutDashboard,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import type { ReactNode, ElementType } from "react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/insights", label: "Insights", icon: BarChart2 },
  { href: "/partners", label: "Partners", icon: Users },
] as const;

const LANGUAGES = ["en", "de", "fr"] as const;
type Lang = (typeof LANGUAGES)[number];

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ElementType;
}) {
  const [location] = useLocation();
  const isActive =
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      )}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/insights": "Insights",
  "/partners": "Partners",
};

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();

  const pageTitle =
    location.startsWith("/projects/")
      ? "Project Detail"
      : (PAGE_TITLES[location] ?? "");

  const nextLang = (): Lang => {
    const idx = LANGUAGES.indexOf(language as Lang);
    return LANGUAGES[(idx + 1) % LANGUAGES.length];
  };

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-5 dark:border-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <LayoutDashboard size={16} />
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Patrick K.
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2025 Patrick Kupferschmid
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(nextLang())}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
