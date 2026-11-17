"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { aboutParagraphs, stats, siteConfig } from "@/lib/site-data";
import { useCountUp } from "@/lib/use-count-up";

function StatCounter({
  value,
  suffix,
  prefix,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0 sm:pl-6">
      <span
        ref={ref}
        className="block font-serif text-3xl font-semibold text-gold sm:text-4xl"
      >
        {prefix}
        {current.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-muted-vb sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative bg-deep py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#131820] to-[#0a0e14] p-1 sm:aspect-[4/3] lg:aspect-[4/5]">
              {/* Diagonal gold pattern */}
              <div className="pattern-diagonal-gold absolute inset-0 opacity-60" />
              {/* Radial gold glow */}
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[80px]" />
              </div>
              {/* Center logo icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center gap-5">
                  <div className="flex size-28 items-center justify-center rounded-2xl border border-gold/30 bg-gold/[0.06] text-gold shadow-[0_24px_60px_-20px_rgba(201,162,39,0.4)] sm:size-32">
                    <img
                      src="/images/about-logo.jpg"
                      alt="Veerabhadra Constructions mark"
                      className="size-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-gold/80">
                    <span className="h-px w-8 bg-gold/40" />
                    <Building2 className="size-5" />
                    <span className="h-px w-8 bg-gold/40" />
                  </div>
                  <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted-vb">
                    Est. {siteConfig.founded}
                  </p>
                </div>
              </div>
            </div>

            {/* Gold badge bottom-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-5 -right-3 flex flex-col items-center rounded-2xl border border-gold/40 bg-panel px-6 py-4 text-center shadow-[0_20px_50px_-20px_rgba(201,162,39,0.5)] sm:right-4 sm:bottom-6"
            >
              <span className="font-serif text-3xl font-bold leading-none text-gold">
                16+
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-vb">
                Years of Craft
              </span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold"
            >
              <span className="size-1.5 rounded-full bg-gold" />
              Our Story
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 font-serif text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-[42px]"
            >
              A foundation built on{" "}
              <span className="text-gold">trust &amp; precision</span>
            </motion.h2>

            <div className="mt-6 space-y-4">
              {aboutParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.16 + i * 0.1 }}
                  className="text-sm leading-relaxed text-muted-vb sm:text-base"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-y-8 rounded-2xl border border-white/5 bg-panel/60 p-6 backdrop-blur sm:p-8 lg:mt-24 lg:grid-cols-4 lg:gap-0"
        >
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              prefix={s.prefix}
              label={s.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
