import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle,
  Globe,
  Bot,
  BarChart3,
  Workflow,
  Briefcase,
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
      icon: BarChart3,
    },
    {
      title: "Strategy first",
      description:
        "We design around your business goals, not just visuals, so the final product actually serves a purpose.",
      icon: Briefcase,
    },
    {
      title: "Fast execution",
      description:
        "We aim to keep projects clear, efficient, and structured so you can move forward without unnecessary delays.",
      icon: Workflow,
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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.18),transparent_28%)]" />

          <motion.div
            className="absolute -top-16 left-[-80px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-[-60px] right-[-40px] h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-24 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              UK-based digital systems for growing businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Websites Built for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Real Business Results
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
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
                className="h-14 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 px-8 text-base text-white shadow-lg hover:scale-[1.02] hover:shadow-2xl"
              >
                Book Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link to="/work">
                <Button
                  variant="outline"
                  className="h-14 rounded-xl border-white/30 bg-transparent px-8 text-base text-white hover:bg-white hover:text-gray-900"
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-gray-950/80 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 h-4 w-40 rounded bg-white/10" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent p-4">
                        <BarChart3 className="mb-4 h-6 w-6 text-cyan-400" />
                        <div className="h-3 w-16 rounded bg-white/15" />
                        <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-teal-500/20 to-transparent p-4">
                        <Bot className="mb-4 h-6 w-6 text-teal-400" />
                        <div className="h-3 w-16 rounded bg-white/15" />
                        <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                      <div className="mb-3 h-3 w-28 rounded bg-white/15" />
                      <div className="space-y-2">
                        <div className="h-2.5 w-full rounded bg-white/10" />
                        <div className="h-2.5 w-4/5 rounded bg-white/10" />
                        <div className="h-2.5 w-3/5 rounded bg-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white">
                        <Workflow className="h-4 w-4 text-cyan-400" />
                        Workflow-ready
                      </div>
                    </div>

                    <div className="rounded-xl border border-teal-400/20 bg-teal-400/10 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white">
                        <BarChart3 className="h-4 w-4 text-teal-400" />
                        Insight-driven
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white">
                        <Bot className="h-4 w-4 text-white/80" />
                        Lead-focused
                      </div>
                    </div>

                    <Button
                      onClick={() => setAuditOpen(true)}
                      className="h-11 w-full rounded-xl bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Book Free Audit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Services
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Digital solutions built around your business
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We help growing businesses improve visibility, lead generation, and digital functionality with practical systems that support real business needs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    </div>

                    <CardContent className="flex h-full flex-col p-7">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {service.description}
                      </p>

                      <ul className="mt-5 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start text-sm text-gray-700">
                            <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        <Link
                          to="/services"
                          className="inline-flex items-center font-semibold text-teal-700"
                        >
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Why NIXRIX
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              More than a website
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We build digital experiences that do more than look good — they are designed to support growth, improve clarity, and create better business functionality.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-7">
                      <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 p-3 text-teal-700">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900">{reason.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {reason.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-950 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Trust signals
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Built with business growth in mind
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              NIXRIX is designed to help businesses move beyond brochure-style websites into more functional, scalable digital systems.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur"
              >
                <div className="text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]" />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Ready to grow your business with a stronger digital system?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Let’s identify what your website needs now, what can be improved, and what should be built next.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setAuditOpen(true)}
              className="h-14 rounded-xl bg-white px-8 text-base text-[#0D9488] hover:bg-gray-100"
            >
              Book Free Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-xl border-white/70 bg-transparent px-8 text-base text-white hover:bg-white hover:text-gray-900"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
