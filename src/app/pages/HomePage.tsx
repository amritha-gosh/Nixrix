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
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Request the Audit
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
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
      image: "https://images.unsplash.com/photo-1751448582395-27fc57293f1a?w=900&h=700&fit=crop",
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
      image: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=900&h=700&fit=crop",
      title: "Automation & SEO",
      description: "Lead workflows, CRM readiness, technical SEO, and performance optimisation.",
      features: ["Workflow automation", "Technical SEO", "Performance tuning", "Analytics setup"],
    },
  ];

  const demoShowcase = [
    {
      title: "Live Dashboard Demo",
      description: "See how we embed dashboards with plain-language insights",
      icon: <BarChart3 className="h-16 w-16" />,
      tag: "Interactive Demo",
      link: "/demo/dashboard",
      image: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "AI Chatbot Demo",
      description: "Try a realistic assistant designed for lead capture and support",
      icon: <MessageSquare className="h-16 w-16" />,
      tag: "Live Feature",
      link: "/demo/chatbot",
      image: "https://images.unsplash.com/photo-1757310998309-87a97e562ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "Website Showcase",
      description: "Modern, responsive designs with smooth interactions",
      icon: <Globe className="h-16 w-16" />,
      tag: "Experience",
      link: "/demo/website",
      image: "https://images.unsplash.com/photo-1630522790545-67ad2cb700fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  const stats = [
    { value: "UK", label: "Based • Global Delivery" },
    { value: "CRM", label: "Lead-ready systems" },
    { value: "Automation", label: "Workflows & follow-ups" },
    { value: "Insights", label: "Dashboards & reporting" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEOHead
        title="NIXRIX - Modern Business Websites with AI, Automation & Dashboards | UK"
        description="UK-based digital systems partner for SMEs. Websites, AI chatbots, automation workflows, CRM readiness, and KPI dashboards."
        keywords="web design UK, SME automation, AI chatbot, KPI dashboard, Power BI integration, CRM workflows, technical SEO, intelligent websites, Shopify, Odoo"
        schemaType="organization"
      />

      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,#111827_0%,#0f172a_40%,#020617_100%)]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/40" />

          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "54px 54px",
              }}
            />
          </div>

          <motion.div
            className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#06B6D4]/15 blur-3xl"
            animate={{ x: [0, 35, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0D9488]/15 blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, -20, 0], scale: [1.06, 1, 1.06] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"
            animate={{ y: [0, 26, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute right-0 top-0 bottom-0 hidden w-1/2 lg:block">
            <motion.div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1644088379091-d574269d422f?w=1200&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute right-20 top-20 h-72 w-72 rounded-full bg-[#06B6D4]/10 blur-3xl"
            animate={{ scale: [1, 1.12, 1], x: [0, 24, 0], y: [0, -18, 0], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#0D9488]/10 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], x: [0, -24, 0], y: [0, 18, 0], opacity: [0.35, 0.2, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/10 px-5 py-2.5 backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-[#7DD3FC]">
                UK-based • Building intelligent digital systems for growing SMEs
              </span>
            </motion.div>

            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
                  Websites Built for
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.42 }}
              >
                <h1 className="text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
                  <span className="bg-gradient-to-r from-[#67E8F9] via-[#2DD4BF] to-[#67E8F9] bg-clip-text text-transparent">
                    Real Business Results
                  </span>
                </h1>
              </motion.div>
            </div>

            <motion.p
              className="mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58 }}
            >
              From simple portfolios to advanced platforms with AI chatbots, live dashboards, CRM-ready lead capture, and automation.
              <span className="font-semibold text-[#67E8F9]"> Built to scale with your business.</span>
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.74 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-10 py-7 text-lg text-white shadow-[0_15px_40px_rgba(6,182,212,0.25)] hover:shadow-[0_20px_55px_rgba(6,182,212,0.35)]"
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
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/40 bg-white/5 px-10 py-7 text-lg text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
                  >
                    View Live Demos
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group cursor-default rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-center backdrop-blur-sm"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.08 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  <motion.div
                    className="mb-2 text-2xl font-bold text-white md:text-3xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.15 + index * 0.08, type: "spring", stiffness: 220 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-400 transition-colors group-hover:text-[#67E8F9]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="mx-auto hidden w-full max-w-2xl lg:block"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute -bottom-8 right-4 h-32 w-32 rounded-full bg-teal-400/20 blur-2xl" />

              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07131d]/95">
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

                  <div className="grid gap-4 p-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-4">
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
                                transition={{ duration: 1.2, delay: 0.8 }}
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
                                transition={{ duration: 1.2, delay: 1 }}
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
                                transition={{ duration: 1.2, delay: 1.2 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
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
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2 backdrop-blur-sm">
            <motion.div
              className="h-3 w-1 rounded-full bg-white/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-50 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-teal-50 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#06B6D4]">
              What We Build
            </span>
            <h2 className="mt-4 mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Choose Your Level
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              From simple websites to advanced platforms—flexible services that grow with your business.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280 }}
                >
                  <Card className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition hover:border-[#0D9488]/35 hover:shadow-[0_22px_55px_rgba(13,148,136,0.14)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.45 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        Flexible service
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-slate-600">{service.description}</p>

                      <ul className="mb-6 space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-700">
                            <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
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
            <p className="mb-6 text-slate-600">
              Not sure what you need? We’ll guide you with a quick audit and clear recommendations.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Button
                size="lg"
                onClick={() => setAuditOpen(true)}
                variant="outline"
                className="rounded-xl border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
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
            <h2 className="mt-4 mb-6 text-4xl font-bold text-white md:text-5xl">
              Live Feature Demos
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-300">
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
                    <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-sm transition hover:border-[#06B6D4]/40 hover:bg-white/[0.07]">
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={demo.image}
                          alt={demo.title}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.45 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
                        <div className="absolute right-3 top-3 z-10">
                          <span className="rounded-full bg-[#06B6D4] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                            {demo.tag}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#67E8F9]">
                          {demo.title}
                        </h3>
                        <p className="mb-4 text-sm text-slate-300">{demo.description}</p>
                        <span className="inline-flex items-center text-sm font-semibold text-[#67E8F9]">
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
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]" />
        <div className="absolute inset-0 opacity-[0.09]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute left-10 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 15, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-cyan-200/10 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Build Something That Actually Works?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90">
              Let’s map your goals, fix the gaps, and build a system that converts—then scales.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="bg-white px-12 py-7 text-lg text-[#0D9488] shadow-2xl hover:bg-slate-100"
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
                    className="border-2 border-white/70 bg-transparent px-12 py-7 text-lg text-white hover:bg-white hover:text-slate-900"
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
