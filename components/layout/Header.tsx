"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("mygrafix-theme");
    const nextTheme: "light" | "dark" = stored === "dark" || stored === "light"
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    if (nextTheme === "dark") {
      window.setTimeout(() => setTheme(nextTheme), 0);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("mygrafix-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE.out }}
        className={cn(
          /* Pill bar retained — large radius is the correct treatment for
             primary navigation. Elevation whisper-level, never cast. */
          "fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[1060px] -translate-x-1/2 rounded-full border transition-all duration-300",
          isScrolled
            ? "border-border bg-background/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-xl"
        )}
      >
        <nav className="mx-auto">
          <div className="flex h-14 items-center justify-between px-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
            >
              <Image
                src="/logo.png"
                alt="My Grafix Media"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                My Grafix Media
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative rounded-full px-3 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {/* Inactive links get a hairline that travels in on hover. */}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-border transition-transform duration-200 ease-out group-hover:scale-x-100"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        initial={false}
                        layoutId="header-active-page"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent-brand"
                        transition={{
                          layout: {
                            duration: reduce ? 0 : 0.32,
                            ease: EASE.out,
                          },
                          opacity: { duration: reduce ? 0 : 0.12 },
                        }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <div className="ml-2">
                <Button href="/contact" size="default" className="!rounded-full">
                  Start a Project
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-px w-5 bg-foreground transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-px w-5 bg-foreground transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-px w-5 bg-foreground transition-all"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel — floating card anchored below the header bar */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE.out }}
              className="fixed left-4 right-4 top-[4.75rem] z-40 mx-auto max-w-[1060px] overflow-hidden rounded-[24px] border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.2)] md:hidden"
            >
              <nav className="px-6 pb-6 pt-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-border py-4 text-lg font-medium transition-colors",
                          isActive ? "text-foreground" : "text-muted hover:text-foreground"
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-brand" aria-hidden="true" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="border-b border-border py-2"
                >
                  <ThemeToggle theme={theme} onToggle={toggleTheme} mobile />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.05 }}
                  className="pt-6"
                >
                  <Button
                    href="/contact"
                    size="large"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start a Project
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle({
  theme,
  onToggle,
  mobile = false,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      className={cn(
        "mono-label inline-flex items-center gap-2 rounded-full text-muted hairline transition-colors duration-200 hover:text-foreground hover:hairline-strong",
        mobile ? "w-full justify-between px-3 py-2.5" : "px-2.5 py-1.5"
      )}
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {theme === "dark" ? "☼" : "☾"}
      </span>
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
