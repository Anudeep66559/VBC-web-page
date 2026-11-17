"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { heroCards } from "@/lib/site-data";
import { scrollToSection } from "@/lib/use-active-section";

function FloatingCardStack() {
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.setProperty("--px", String(dx));
      el.style.setProperty("--py", String(dy));
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="relative mx-auto flex h-full w-full max-w-md flex-col items-center justify-center gap-5 px-2 py-8 sm:max-w-lg"
      style={
        {
          "--px": "0",
          "--py": "0",
        } as React.CSSProperties
      }
    >
      {heroCards.map((card, i) => {
        const Icon = card.icon;
        const offsets = [
          { x: -30, y: -90, rot: -6 },
          { x: 30, y: 0, rot: 4 },
          { x: -20, y: 90, rot: -3 },
        ];
        const off = offsets[i];
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40, rotate: off.rot }}
            animate={{ opacity: 1, y: 0, rotate: off.rot }}
            transition={{
              delay: 0.6 + i * 0.18,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glass-card pointer-events-none absolute w-[300px] rounded-2xl p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:w-[340px]"
            style={{
              left: `calc(50% - 150px + ${off.x}px)`,
              top: `calc(50% - 90px + ${off.y}px)`,
              transform: `translate(
                calc(var(--px) * ${(i + 1) * 18}px),
                calc(var(--py) * ${(i + 1) * 18}px)
              )`,
              transition: "transform 0.25s ease-out",
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-start gap-4"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-ivory">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-vb">
                  {card.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-deep pt-[72px]"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 size-[460px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-24 size-[520px] rounded-full bg-gold/5 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f4f1ea 1px, transparent 1px), linear-gradient(to bottom, #f4f1ea 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-gold" />
            Construction Excellence Since 2011
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Building Your Vision
            <br />
            With{" "}
            <span className="relative inline-block text-gold">
              Excellence
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gold"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-vb sm:text-lg lg:mx-0"
          >
            From residential landmarks to commercial spaces, Veerabhadra
            Constructions delivers enduring structures built with precision,
            fine materials, and a relentless commitment to quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[#0a0e14] shadow-[0_12px_30px_-10px_rgba(201,162,39,0.7)] transition-all hover:brightness-110 sm:w-auto"
            >
              View Our Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-ivory transition-all hover:border-gold/50 hover:bg-gold/[0.06] sm:w-auto"
            >
              Free Consultation
              <ArrowUpRight className="size-4" />
            </button>
          </motion.div>
        </div>

        {/* Right: floating cards */}
        <div className="relative hidden h-[520px] lg:block">
          <FloatingCardStack />
        </div>

        {/* Mobile fallback cards (stacked, simpler) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
          {heroCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                className="glass-card flex items-start gap-3 rounded-2xl p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold ring-1 ring-gold/30">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-ivory">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-vb">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-vb md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
