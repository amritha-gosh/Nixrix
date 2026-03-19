import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  BarChart3,
  Check,
  Sparkles,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ScrollReveal } from "@/app/components/ScrollReveal";
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
        intent: "Complimentary Digital Systems Audit",
        note: "Corporate offer (no discounts / no codes).",
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
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    Complimentary Digital Systems Audit (UK-based)
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                    Request the Audit
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    We’ll review your website + lead flow and suggest improvements for conversion, CRM readiness, automation, and reporting.
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

  const coreServices = [
    {
      image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=900&h=700&fit=crop",
      title: "Website Design",
      description: "From one-page sites to full business platforms—responsive, fast, and SEO-ready.",
      features: ["One-page websites", "Business websites", "Portfolio sites", "E-commerce ready"],
    },
    {
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=700&fit=crop",
      title: "AI Chatbots",
      description: "Chatbots that engage visitors, answer questions, and capture enquiries—24/7.",
      features: ["FAQ automation", "Lead capture", "Custom training", "Multi-language"],
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop",
      title: "Intelligent Websites",
      description: "Websites with embedded KPI dashboards, live data visibility, and decision insights.",
      features: ["Power BI dashboards", "Real-time data", "KPI explanations", "Automated alerts"],
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=700&fit=crop",
      title: "Automation & SEO",
      description: "Lead workflows, CRM readiness, technical SEO, and performance optimisation.",
      features: ["Workflow automation", "Technical SEO", "Performance tuning", "Analytics setup"],
    },
  ];

  const demoShowcase = [
    {
      title: "Live Dashboard Demo",
      description: "See how we embed dashboards with plain-language insights",
      icon: <BarChart3 className="h-14 w-14" />,
      tag: "Interactive Demo",
      link: "/demo/dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    },
    {
      title: "AI Chatbot Demo",
      description: "Try a realistic assistant designed for lead capture and support",
      icon: <MessageSquare className="h-14 w-14" />,
      tag: "Live Feature",
      link: "/demo/chatbot",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    },
    {
      title: "Website Showcase",
      description: "Modern, responsive designs with smooth interactions",
      icon: <Globe className="h-14 w-14" />,
      tag: "Experience",
      link: "/demo/website",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07121A]">
      <SEOHead
        title="NIXRIX - Modern Business Websites with AI, Automation & Dashboards | UK"
        description="UK-based digital systems partner for SMEs. Websites, AI chatbots, automation workflows, CRM readiness, and KPI dashboards."
        keywords="web design UK, SME automation, AI chatbot, KPI dashboard, Power BI integration, CRM workflows, technical SEO, intelligent websites"
        schemaType="organization"
      />

      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#0f172a_0%,#08111a_40%,#030712_100%)]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-[#06131d]/70 to-[#020617]/40" />

          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          <motion.div
            className="absolute -left-16 top-0 h-80 w-80 rounded-full bg-[#06B6D4]/15 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 16, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0D9488]/15 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -16, 0], scale: [1.08, 1, 1.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/10 px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-[#7DD3FC]">
                  UK-based • Building intelligent digital systems for growing SMEs
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
                className="text-4xl font-bold tracking-tight leading-[1.05] text-white sm:text-5xl lg:text-6xl"
              >
                Websites Built for{" "}
                <span className="bg-gradient-to-r from-[#67E8F9] via-[#2DD4BF] to-[#67E8F9] bg-clip-text text-transparent">
                  Real Business Results
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45 }}
              >
                From simple portfolios to advanced platforms with AI chatbots, live dashboards, CRM-ready lead capture, and automation.
                <span className="font-semibold text-[#67E8F9]"> Built to scale with your business.</span>
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={() => setAuditOpen(true)}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-8 py-6 text-base text-white shadow-[0_14px_40px_rgba(6,182,212,0.28)] hover:shadow-[0_18px_55px_rgba(6,182,212,0.36)]"
                  >
                    <span className="relative z-10 flex items-center">
                      Request a Complimentary Audit
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0D9488]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>

                <Link to="/work">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 bg-white/5 px-8 py-6 text-base text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
                    >
                      View Live Demos
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="mx-auto w-full max-w-xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.32 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
                <div className="absolute -bottom-5 right-3 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl" />

                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#07131d]">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                      </div>
                      <div className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-200">
                        live digital preview
                      </div>
                    </div>

                    <div className="grid gap-3 p-4 md:grid-cols-[1.15fr_0.85fr]">
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-cyan-300/10 bg-gradient-to-br from-cyan-400/10 to-white/[0.03] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold text-white">Business Snapshot</div>
                              <div className="text-[11px] text-white/50">Performance overview</div>
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
                              <div className="text-[11px] text-white/55">Tasks</div>
                              <div className="mt-1 text-xl font-bold text-white">24</div>
                              <div className="text-[10px] text-teal-200">live</div>
                            </div>
                            <div className="rounded-xl bg-white/5 p-3">
                              <div className="text-[11px] text-white/55">Reports</div>
                              <div className="mt-1 text-xl font-bold text-white">12</div>
                              <div className="text-[10px] text-white/60">ready</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="mb-3 text-sm font-semibold text-white">Capability Layer</div>

                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                                <span>Website performance</span>
                                <span>86%</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10">
                                <motion.div
                                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: "86%" }}
                                  transition={{ duration: 1.1, delay: 0.8 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                                <span>Lead readiness</span>
                                <span>78%</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10">
                                <motion.div
                                  className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: "78%" }}
                                  transition={{ duration: 1.1, delay: 1 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                                <span>Automation setup</span>
                                <span>69%</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10">
                                <motion.div
                                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: "69%" }}
                                  transition={{ duration: 1.1, delay: 1.2 }}
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
                          <div className="text-sm font-semibold text-white">Shopify Stores</div>
                          <div className="mt-1 text-[11px] leading-5 text-white/70">
                            Clean storefront experiences with scalable commerce foundations.
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ y: -4 }}
                          className="rounded-2xl border border-teal-300/10 bg-gradient-to-br from-teal-400/15 to-teal-400/5 p-4"
                        >
                          <div className="text-sm font-semibold text-white">Odoo Support</div>
                          <div className="mt-1 text-[11px] leading-5 text-white/70">
                            Better operational structure with connected digital workflows.
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ y: -4 }}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <div className="text-sm font-semibold text-white">FAQ Chatbot</div>
                          <div className="mt-1 text-[11px] leading-5 text-white/70">
                            Capture enquiries and support visitors more efficiently.
                          </div>
                        </motion.div>

                        <Button
                          onClick={() => setAuditOpen(true)}
                          className="h-11 w-full rounded-xl bg-white text-slate-900 hover:bg-slate-100"
                        >
                          Request Audit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-2 backdrop-blur-sm">
              <motion.div
                className="h-3 w-1 rounded-full bg-white/50"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#07121A_0%,#0B1C25_100%)] py-24">
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(103,232,249,0.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <motion.div
          className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#67E8F9]">
              What We Build
            </span>
            <h2 className="mt-4 mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Choose Your Level
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-8 text-slate-300">
              From simple websites to advanced platforms—flexible services that grow with your business.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {coreServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260 }}>
                  <Card className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-50 shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition hover:border-[#2DD4BF]/35 hover:shadow-[0_20px_55px_rgba(6,182,212,0.14)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.45 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        Flexible service
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mb-4 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>

                      <ul className="mb-6 space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm leading-6 text-slate-700">
                            <Check className="mr-2 mt-1 h-4 w-4 shrink-0 text-[#0D9488]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/services"
                        className="inline-flex items-center text-sm font-semibold text-[#0D9488] transition hover:text-[#06B6D4]"
                      >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-12 text-center">
            <p className="mb-6 text-slate-300">
              Not sure what you need? We’ll guide you with a quick audit and clear recommendations.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Button
                size="lg"
                onClick={() => setAuditOpen(true)}
                variant="outline"
                className="rounded-xl border-2 border-[#2DD4BF] bg-transparent text-[#67E8F9] hover:bg-[#0D9488] hover:text-white"
              >
                Request Complimentary Audit
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* DEMO SHOWCASE */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#0b1220_45%,#083344_100%)] py-24">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ x: [0, 22, 0], y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#67E8F9]">
              See It In Action
            </span>
            <h2 className="mt-4 mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Live Feature Demos
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-8 text-slate-300">
              This website itself demonstrates our advanced capabilities—try the chatbot, explore the demos.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {demoShowcase.map((demo, index) => (
              <ScrollReveal key={index} delay={index * 0.12} direction={index % 2 === 0 ? "left" : "right"}>
                <Link to={demo.link}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    className="group"
                  >
                    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition hover:border-[#06B6D4]/35 hover:shadow-[0_20px_55px_rgba(6,182,212,0.14)]">
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={demo.image}
                          alt={demo.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.45 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-transparent" />
                        <div className="absolute right-3 top-3 z-10">
                          <span className="rounded-full bg-[#06B6D4] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                            {demo.tag}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#0D9488]">
                          {demo.title}
                        </h3>
                        <p className="mb-4 text-sm leading-7 text-slate-600">{demo.description}</p>
                        <span className="inline-flex items-center text-sm font-semibold text-[#0D9488]">
                          Try Demo
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#07121A_0%,#0B1C25_55%,#0F172A_100%)] py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <motion.div
            className="absolute left-10 top-10 h-48 w-48 rounded-full bg-[#06B6D4]/12 blur-3xl"
            animate={{ x: [0, 15, 0], y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#0D9488]/12 blur-3xl"
            animate={{ x: [0, -15, 0], y: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Ready to Build Something That Actually Works?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-slate-300">
              Let’s map your goals, fix the gaps, and build a system that converts—then scales.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-12 py-7 text-lg text-white shadow-[0_16px_40px_rgba(6,182,212,0.22)] hover:shadow-[0_20px_55px_rgba(6,182,212,0.32)]"
                >
                  Request Complimentary Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 bg-white/5 px-12 py-7 text-lg text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
