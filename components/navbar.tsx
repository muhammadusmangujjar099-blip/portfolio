"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { sectionIds, sections, type SectionId } from "@/lib/site";
import { cn, scrollToSection } from "@/lib/utils";
import { usePalette } from "./palette-provider";
import { StatusPill } from "./status-pill";

export function Navbar() {
  const active = useScrollSpy(sectionIds);
  const { setOpen } = usePalette();
  const [menu, setMenu] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: SectionId) => {
    setMenu(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-3 rounded-xl border px-3 py-2 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "border-cyber/25 bg-night/85" : "border-line bg-night/60"
        )}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
          className="flex items-center gap-2 font-display text-base font-semibold"
          aria-label="Back to top"
        >
          <span className="font-mono text-cyber" aria-hidden="true">&gt;_</span>
          usman
        </a>

        <StatusPill className="hidden md:inline-flex" />
        <StatusPill compact className="md:hidden" />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                active === s.id ? "text-cyber" : "text-mist hover:text-ink"
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-cyber/10"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open command bar"
          className="ml-auto flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-mist transition-colors hover:border-cyber/40 hover:text-ink lg:ml-0"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Command bar</span>
          <span className="kbd" aria-hidden="true">{isMac ? "⌘" : "Ctrl"} K</span>
        </button>

        <button
          onClick={() => setMenu((m) => !m)}
          aria-expanded={menu}
          aria-controls="mobile-nav"
          aria-label={menu ? "Close menu" : "Open menu"}
          className="rounded-lg border border-line p-2 text-mist hover:text-ink lg:hidden"
        >
          {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="mx-auto mt-2 flex max-w-6xl flex-col rounded-xl border border-line bg-night/95 p-2 backdrop-blur-xl lg:hidden"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={cn(
                  "rounded-lg px-3 py-3 text-left text-sm",
                  active === s.id ? "bg-cyber/10 text-cyber" : "text-ink hover:bg-white/5"
                )}
              >
                {s.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
