"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/lib/site-data";

export function Projects() {
  return (
    <section id="projects" className="relative bg-deep py-20 sm:py-28">
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
            Our Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 font-serif text-3xl font-semibold text-ivory sm:text-4xl lg:text-[44px]"
          >
            Featured <span className="text-gold">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-sm leading-relaxed text-muted-vb sm:text-base"
          >
            A selection of landmarks we&apos;ve delivered across Karimnagar —
            each one a testament to our commitment to quality and lasting value.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (i % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative h-[360px] overflow-hidden rounded-2xl border border-white/8 sm:h-[420px]"
            >
              {/* Background image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-[#0a0e14]/70 to-[#0a0e14]/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e14]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Arrow icon top-right */}
              <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-gold/30 bg-[#0a0e14]/60 text-gold backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-[#0a0e14]">
                <ArrowUpRight className="size-4" />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                  {project.category}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-ivory sm:text-3xl">
                  {project.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-vb">
                  <MapPin className="size-3.5 text-gold" />
                  <span>{project.location}</span>
                  {project.year && (
                    <>
                      <span className="text-white/20">•</span>
                      <span>{project.year}</span>
                    </>
                  )}
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 text-center text-sm text-muted-vb"
        >
          ...and <span className="text-gold">many more</span> landmark projects
          delivered with pride.
        </motion.p>
      </div>
    </section>
  );
}
