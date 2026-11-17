"use client";

import { motion } from "framer-motion";
import { contactItems } from "@/lib/site-data";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-[#0c1119] py-20 sm:py-28"
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
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 font-serif text-3xl font-semibold text-ivory sm:text-4xl lg:text-[44px]"
          >
            Start Your <span className="text-gold">Project</span>
          </motion.h2>
        </div>

        {/* Contact info — full width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-4xl text-center lg:mt-16"
        >
          <h3 className="font-serif text-2xl font-semibold text-ivory sm:text-3xl">
            Let&apos;s Build Together
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-vb sm:text-base">
            Have a project in mind? Whether it&apos;s a residential dream home,
            a commercial space, or a renovation — we&apos;d love to hear about
            it. Reach out and let&apos;s start the conversation.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="group flex items-start gap-4 rounded-xl border border-white/8 bg-panel/70 p-5 text-left transition-all hover:border-gold/30 hover:bg-panel">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold group-hover:text-[#0a0e14]">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-vb">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-sm text-ivory">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block"
                  aria-label={item.label}
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
