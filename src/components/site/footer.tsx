"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import {
  footerServices,
  navItems,
  siteConfig,
  socialLinks,
} from "@/lib/site-data";
import { scrollToSection } from "@/lib/use-active-section";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="mt-auto border-t border-white/5 bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-ivory">
                {siteConfig.shortName}
              </span>
              <span className="mb-1 inline-block size-1.5 rounded-full bg-gold" />
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-vb">
              Constructions
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-vb">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-md border border-white/10 text-muted-vb transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.18em] text-ivory">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-vb transition-colors hover:text-gold"
                  >
                    <span className="size-1 rounded-full bg-white/10 transition-colors group-hover:bg-gold" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.18em] text-ivory">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerServices.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection("#services")}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-vb transition-colors hover:text-gold"
                  >
                    <ArrowRight className="size-3 text-white/15 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.18em] text-ivory">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted-vb">
              Subscribe to our newsletter for the latest updates and projects.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="h-10 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-ivory placeholder:text-muted-vb/70 outline-none transition-colors focus:border-gold/60"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gold text-sm font-semibold text-[#0a0e14] transition-all hover:brightness-110"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>

            {/* Contact links */}
            <div className="mt-5 space-y-1.5 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="block text-muted-vb transition-colors hover:text-gold"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.emailHref}
                className="block break-words text-muted-vb transition-colors hover:text-gold"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-vb">{siteConfig.copyright}</p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-muted-vb"
          >
            Crafted with <span className="text-gold">precision</span> &amp; care.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
