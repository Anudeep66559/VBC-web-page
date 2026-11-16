"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { contactItems } from "@/lib/site-data";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Please complete the form",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    // Simulate async submit (no backend).
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    setForm(initialForm);
    toast({
      title: "Message sent",
      description: "Thank you for reaching out. We'll respond within 24 hours.",
    });
    setTimeout(() => setDone(false), 4000);
  };

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

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-semibold text-ivory sm:text-3xl">
              Let&apos;s Build Together
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-vb sm:text-base">
              Have a project in mind? Whether it&apos;s a residential dream home,
              a commercial space, or a renovation — we&apos;d love to hear about
              it. Reach out and let&apos;s start the conversation.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="group flex items-start gap-4 rounded-xl border border-white/8 bg-panel/70 p-4 transition-all hover:border-gold/30 hover:bg-panel">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold group-hover:text-[#0a0e14]">
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

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/8 bg-panel/60 p-6 backdrop-blur sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className="border-white/10 bg-white/[0.03] text-ivory placeholder:text-muted-vb/70 focus-visible:border-gold/60"
                    required
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 ..."
                    className="border-white/10 bg-white/[0.03] text-ivory placeholder:text-muted-vb/70 focus-visible:border-gold/60"
                  />
                </Field>
              </div>
              <Field label="Email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                  className="border-white/10 bg-white/[0.03] text-ivory placeholder:text-muted-vb/70 focus-visible:border-gold/60"
                  required
                />
              </Field>
              <Field label="Message">
                <Textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="min-h-[120px] resize-y border-white/10 bg-white/[0.03] text-ivory placeholder:text-muted-vb/70 focus-visible:border-gold/60"
                  required
                />
              </Field>

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-full bg-gold text-sm font-semibold text-[#0a0e14] transition-all hover:brightness-110 disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : done ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-vb">
                We respect your privacy. Your details are only used to contact
                you about your project.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-vb">
        {label}
      </span>
      {children}
    </label>
  );
}
