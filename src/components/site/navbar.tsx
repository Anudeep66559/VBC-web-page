"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site-data";
import { useActiveSection, scrollToSection } from "@/lib/use-active-section";

const sectionIds = navItems.map((n) => n.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gold"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/5 bg-[#0a0e14]/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <button
            onClick={() => handleNav("#home")}
            className="group flex items-center gap-2 text-left"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="font-serif text-xl font-semibold tracking-tight text-ivory sm:text-2xl">
              {siteConfig.shortName}
            </span>
            <span className="mb-1 inline-block size-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
            <span className="hidden font-sans text-xs uppercase tracking-[0.25em] text-muted-vb sm:inline">
              Constructions
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-gold"
                        : "text-ivory/80 hover:text-ivory"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("#contact")}
              className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-[#0a0e14] shadow-[0_8px_24px_-8px_rgba(201,162,39,0.6)] transition-all hover:shadow-[0_10px_30px_-6px_rgba(201,162,39,0.85)] hover:brightness-110 sm:inline-block"
            >
              Get a Quote
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-ivory transition-colors hover:bg-white/5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/5 bg-[#0a0e14]/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                {navItems.map((item, index) => {
                  const id = item.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => handleNav(item.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-white/5 text-gold"
                            : "text-ivory/90 hover:bg-white/5"
                        )}
                      >
                        {item.label}
                        <span className="text-xs text-muted-vb">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  );
                })}
                <li className="mt-2">
                  <button
                    onClick={() => handleNav("#contact")}
                    className="w-full rounded-full bg-gold px-5 py-3 text-sm font-semibold text-[#0a0e14]"
                  >
                    Get a Quote
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
