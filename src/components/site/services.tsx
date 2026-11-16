"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { scrollToSection } from "@/lib/use-active-section";

export function Services() {
  return (
    <section
      id="services"
      className="relative border-y border-white/5 bg-[#0c1119] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold"
          >
            <span className="size-1.5 rounded-full bg-gold" />
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 font-serif text-3xl font-semibold text-ivory sm:text-4xl lg:text-[44px]"
          >
            Our <span className="text-gold">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-sm leading-relaxed text-muted-vb sm:text-base"
          >
            From concept to completion, we offer a complete range of construction
            services designed to bring your vision to life with quality,
            integrity, and precision.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-panel transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(201,162,39,0.35)]"
              >
                {/* Top gold border draw on hover */}
                <span className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />

                {/* Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden sm:h-40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131820] via-[#131820]/40 to-transparent" />
                  <span className="absolute left-4 top-4 font-serif text-xs font-semibold text-gold">
                    {service.number}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold transition-transform duration-500 group-hover:rotate-[20deg]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-ivory">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-vb">
                    {service.description}
                  </p>
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-ivory"
                  >
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
