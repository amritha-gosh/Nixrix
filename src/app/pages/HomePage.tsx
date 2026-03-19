import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle,
  Check,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { Input } from "@/app/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type AuditPayload = {
  type: "WELCOME_CODE";
  email: string;
  source: "homepage";
  pageUrl: string;
  meta?: Record<string, string>;
};

function AuditModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const LEAD_ENDPOINT = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT || "/api/lead";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setStatus("idle");
      setMsg("");
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMsg("");

    const payload: AuditPayload = {
      type: "WELCOME_CODE",
      email: email.trim(),
      source: "homepage",
      pageUrl: window.location.href,
      meta: {
        intent: "Free Digital Systems Audit",
        note: "Homepage audit request",
      },
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      setMsg("Thanks — we’ll email you the next steps shortly.");
      setTimeout(() => onClose(), 1200);
    } catch {
      setStatus("error");
      setMsg("Couldn’t send right now. Please try again, or email hello@nixrix.com.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/95 to-gray-950/95 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    Free Digital Systems Audit
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white">Book Your Audit</h3>
                  <p className="mt-2 text-sm text-white/70">
                    We’ll review your website, lead flow, and opportunities for
                    conversion, CRM readiness, automation, and reporting.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={submit} className="space-y-4 p-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/90">Work email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {msg}
                  </div>
                )}

                {status === "success" && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                    {msg}
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white shadow-lg hover:shadow-2xl"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </span>
                  ) : status === "success" ? (
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Request Audit
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="h-4 w-4" />
                  We don’t sell your data.
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function HomePage() {
  const [auditOpen, setAuditOpen] = useState(false);

  const services = [
    {
      title: "Business Websites",
      description:
        "Custom websites designed to present your business clearly, perform well, and convert visitors into enquiries.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      features: ["Responsive design", "SEO-ready structure", "Lead-focused pages"],
    },
    {
      title: "FAQ Chatbots",
      description:
        "Simple chatbot experiences that answer questions, improve response time, and guide visitors efficiently.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
      features: ["FAQ responses", "Lead capture support", "Better visitor experience"],
    },
    {
      title: "Dashboards & Insights",
      description:
        "Live KPI visibility and reporting layers that help businesses understand performance and act faster.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      features: ["KPI visibility", "Business reporting", "Decision support"],
    },
    {
      title: "Automation & Workflows",
      description:
        "Digital workflows and system-ready foundations that reduce manual work and improve operational efficiency.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
      features: ["Workflow support", "CRM readiness", "Scalable foundations"],
    },
  ];

  const reasons = [
    {
      title: "Results-driven",
      description:
        "We focus on websites and systems that support visibility, conversion, and practical business outcomes.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
    },
    {
      title: "Strategy first",
      description:
        "We design around your business goals, not just visuals, so the final product actually serves a purpose.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    },
    {
      title: "Fast execution",
      description:
        "We aim to keep projects clear, efficient, and structured so you can move forward without unnecessary delays.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    },
  ];

  const stats = [
    {
      value: "UK-Based",
      label: "Professional delivery for modern businesses",
    },
    {
      value: "SME-Focused",
      label: "Built for growing businesses without in-house tech teams",
    },
    {
      value: "CRM-Ready",
      label: "Lead capture and system-friendly website structure",
    },
    {
      value: "Automation-Led",
      label: "Workflows, reporting, and digital efficiency in mind",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEOHead
        title="NIXRIX - Business Websites, Dashboards, Automation & AI"
        description="NIXRIX builds high-performance business websites with dashboards, automation, chatbots, and integrated digital systems for growing SMEs."
        keywords="NIXRIX, business websites, automation, dashboards, chatbot, SME digital solutions"
        schemaType="organization"
      />

      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#0f172a_0%,#0b1220_35%,#081018_100%)]">
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-20 left-[-60px] h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-60px] right-[-40px] h-80 w-80 rounded-full bg-teal-500/15 blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, -18, 0], scale: [1.06, 1, 1.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/3 h-52 w-52 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"
            animate={{ y: [0, 25, 0], opacity: [0.18, 0.3, 0.18] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/20" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-24 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              UK-based digital systems for growing businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Websites Built for{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Real Business Results
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
            >
              NIXRIX builds business websites with dashboards, automation, chatbot functionality,
              and system-ready foundations that help SMEs improve visibility, conversion, and operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                onClick={() => setAuditOpen(true)}
                className="h-14 rounded-xl bg-gradient-to-r from-[#0D9488] via-[#0ea5a3] to-[#06B6D4] px-8 text-base text-white shadow-[0_12px_40px_rgba(6,182,212,0.25)] transition hover:scale-[1.02] hover:shadow-[0_18px_50px_rgba(6,182,212,0.35)]"
              >
                Book Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link to="/work">
                <Button
                  variant="outline"
                  className="h-14 rounded-xl border-cyan-300/30 bg-white/5 px-8 text-base text-white backdrop-blur hover:bg-white hover:text-slate-900"
                >
                  View Work
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 right-2 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.35, 0.2, 0.35] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/10 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#07131d]">
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-200">
                      live system preview
                    </div>
                  </div>

                  <div className="grid gap-3 p-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-cyan-300/10 bg-gradient-to-br from-cyan-400/10 to-white/[0.03] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">Business Overview</div>
                            <div className="text-[11px] text-white/50">Live operational snapshot</div>
                          </div>
                          <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] text-emerald-300">
                            Active
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-xl bg-cyan-400/10 p-3">
                            <div className="text-[11px] text-white/55">Leads</div>
                            <div className="mt-1 text-xl font-bold text-white">128</div>
                            <div className="text-[10px] text-cyan-200">+18%</div>
                          </div>

                          <div className="rounded-xl bg-teal-400/10 p-3">
                            <div className="text-[11px] text-white/55">Enquiries</div>
                            <div className="mt-1 text-xl font-bold text-white">46</div>
                            <div className="text-[10px] text-teal-200">steady</div>
                          </div>

                          <div className="rounded-xl bg-white/5 p-3">
                            <div className="text-[11px] text-white/55">Tasks</div>
                            <div className="mt-1 text-xl font-bold text-white">12</div>
                            <div className="text-[10px] text-white/60">active</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="mb-3 text-sm font-semibold text-white">Reporting & Insights</div>

                        <div className="space-y-3">
                          <div>
                            <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                              <span>Lead conversion</span>
                              <span>72%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                                initial={{ width: 0 }}
                                animate={{ width: "72%" }}
                                transition={{ duration: 1.2, delay: 0.6 }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                              <span>Response efficiency</span>
                              <span>84%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                                initial={{ width: 0 }}
                                animate={{ width: "84%" }}
                                transition={{ duration: 1.2, delay: 0.8 }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                              <span>Workflow completion</span>
                              <span>63%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                                initial={{ width: 0 }}
                                animate={{ width: "63%" }}
                                transition={{ duration: 1.2, delay: 1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-cyan-300/10 bg-gradient-to-br from-cyan-400/15 to-cyan-400/5 p-4"
                      >
                        <div className="text-sm font-semibold text-white">CRM-ready lead capture</div>
                        <div className="mt-1 text-[11px] leading-5 text-white/70">
                          Structured enquiry flow designed for handoff and follow-up.
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-teal-300/10 bg-gradient-to-br from-teal-400/15 to-teal-400/5 p-4"
                      >
                        <div className="text-sm font-semibold text-white">FAQ chatbot support</div>
                        <div className="mt-1 text-[11px] leading-5 text-white/70">
                          Answer common questions and guide visitors smoothly.
                        </div>
                      </motion.div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="mb-3 text-sm font-semibold text-white">System status</div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-white/70">
                            <span>Website structure</span>
                            <span className="text-emerald-300">Ready</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-white/70">
                            <span>Dashboard layer</span>
                            <span className="text-cyan-300">Connected</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-white/70">
                            <span>Automation flow</span>
                            <span className="text-teal-300">Active</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => setAuditOpen(true)}
                        className="h-11 w-full rounded-xl bg-gradient-to-r from-white to-slate-100 text-slate-900 hover:from-slate-50 hover:to-white"
                      >
                        Book Free Audit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600"
            >
              Services
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl"
            >
              Digital solutions built around your business
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-slate-600"
            >
              We help growing businesses improve visibility, lead generation, and digital functionality with practical systems that support real business needs.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:shadow-[0_20px_50px_rgba(13,148,136,0.16)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                      Professional digital delivery
                    </div>
                  </div>

                  <CardContent className="flex h-full flex-col p-7">
                    <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm text-slate-700">
                          <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <Link
                        to="/services"
                        className="inline-flex items-center font-semibold text-teal-700 transition hover:text-cyan-600"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NIXRIX */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-teal-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600"
            >
              Why NIXRIX
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl"
            >
              More than a website
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-slate-600"
            >
              We build digital experiences that do more than look good — they are designed to support growth, improve clarity, and create better business functionality.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:shadow-[0_20px_45px_rgba(13,148,136,0.12)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={reason.image}
                      alt={reason.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur">
                      NIXRIX approach
                    </div>
                  </div>

                  <CardContent className="p-7">
                    <h3 className="text-xl font-semibold text-slate-900">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#062f2c_0%,#0b3f3f_45%,#0b5560_100%)] py-20 md:py-24">
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200"
            >
              Trust signals
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              Built with business growth in mind
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-teal-50/85"
            >
              NIXRIX is designed to help businesses move beyond brochure-style websites into more functional, scalable digital systems.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/10 p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur"
              >
                <div className="bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/75">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-100 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-r from-[#0D9488] via-[#0f766e] to-[#06B6D4] p-10 text-center shadow-[0_25px_80px_rgba(13,148,136,0.22)] md:p-14"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-white sm:text-5xl">
                Ready to grow your business with a stronger digital system?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
                Let’s identify what your website needs now, what can be improved, and what should be built next.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setAuditOpen(true)}
                    className="h-14 rounded-xl bg-white px-8 text-base text-[#0D9488] hover:bg-slate-100"
                  >
                    Book Free Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>

                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-xl border-white/70 bg-transparent px-8 text-base text-white hover:bg-white hover:text-slate-900"
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
