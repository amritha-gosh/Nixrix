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
  Workflow,
  Store,
  Briefcase,
  LineChart,
  Bot,
  Search,
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
      features: ["Responsive builds", "SEO-ready structure", "Lead-focused pages"],
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "E-commerce & Integrations",
      description:
        "Online stores and connected systems that support product sales, operations, and backend workflows.",
      features: ["Store setup", "Payment integration", "Business system connection"],
      icon: <Store className="h-6 w-6" />,
    },
    {
      title: "Dashboards & Insights",
      description:
        "Live reporting and KPI dashboards that help business owners understand performance and act faster.",
      features: ["KPI visibility", "Reporting layers", "Decision support"],
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      title: "Automation & Chatbots",
      description:
        "Lead capture, FAQ chatbots, and workflow automation that reduce manual work and improve responsiveness.",
      features: ["FAQ chatbot", "Lead workflows", "CRM readiness"],
      icon: <Bot className="h-6 w-6" />,
    },
  ];

  const differentiators = [
    {
      title: "More than a website",
      description:
        "We build websites with real business functionality — not just visual pages.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Built around operations",
      description:
        "From enquiries to dashboards and workflows, your digital presence can support how your business runs.",
      icon: <Workflow className="h-6 w-6" />,
    },
    {
      title: "Ready for growth",
      description:
        "Our systems are designed to support better visibility, lead generation, and long-term scale.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
  ];

  const industries = [
    {
      title: "Retail",
      description:
        "Sell online, strengthen visibility, and support daily operations with the right digital setup.",
    },
    {
      title: "Trading & Distribution",
      description:
        "Connect enquiry flow, product visibility, and backend processes more effectively.",
    },
    {
      title: "Local Services",
      description:
        "Capture leads faster, improve trust, and create a smoother customer journey.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discover",
      description:
        "We learn about your business, goals, current gaps, and what your website actually needs to achieve.",
    },
    {
      step: "02",
      title: "Plan",
      description:
        "We structure the right solution — pages, user flow, integrations, lead capture, and functionality.",
    },
    {
      step: "03",
      title: "Design & Build",
      description:
        "We create a clean, responsive experience that reflects your business and supports conversion.",
    },
    {
      step: "04",
      title: "Launch & Improve",
      description:
        "We launch properly and help you improve performance, visibility, and future readiness.",
    },
  ];

  const demos = [
    {
      title: "Dashboard Demo",
      description:
        "See how reporting and KPI visibility can be embedded into a business website experience.",
      link: "/demo/dashboard",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      tag: "Interactive",
    },
    {
      title: "Chatbot Demo",
      description:
        "Try a lead-focused assistant designed to answer FAQs and guide visitors efficiently.",
      link: "/demo/chatbot",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
      tag: "FAQ Assistant",
    },
    {
      title: "Website Experience",
      description:
        "Explore a modern responsive website experience built with stronger UI, flow, and business clarity.",
      link: "/demo/website",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      tag: "Preview",
    },
  ];

  const blogPreview = [
    {
      title: "Why most SME websites fail to generate leads",
      excerpt:
        "The common mistakes that stop websites from converting — and how growing businesses can fix them.",
      category: "Growth",
      slug: "/blog/why-most-sme-websites-fail-to-generate-leads",
    },
    {
      title: "How dashboards help small businesses make faster decisions",
      excerpt:
        "Why visibility matters, what to track, and how reporting can improve performance across teams.",
      category: "Insights",
      slug: "/blog/how-dashboards-help-small-businesses-make-faster-decisions",
    },
    {
      title: "What an FAQ chatbot can actually do for your business website",
      excerpt:
        "From answering common questions to improving lead capture, here’s where chatbots create real value.",
      category: "Automation",
      slug: "/blog/what-an-faq-chatbot-can-actually-do-for-your-business-website",
    },
  ];

  const stats = [
    { value: "UK-Based", label: "Professional delivery" },
    { value: "SME-Focused", label: "Built for growing businesses" },
    { value: "CRM-Ready", label: "Lead capture & handoff" },
    { value: "Automation", label: "Workflows & support" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEOHead
        title="NIXRIX - Business Websites, Automation, Dashboards & AI | UK"
        description="NIXRIX builds high-performance business websites with dashboards, automation, AI chatbots, and integrated functionality for growing SMEs."
        keywords="NIXRIX, business websites UK, AI chatbot website, SME automation, KPI dashboards, e-commerce integration, CRM-ready websites, SEO website agency UK"
        schemaType="organization"
      />

      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.18),transparent_28%)]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-[#06B6D4]" />
              UK-based digital systems for growing businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl"
            >
              Websites Built for{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#0D9488] bg-clip-text text-transparent">
                Real Business Results
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl"
            >
              From business websites to dashboards, automation, CRM-ready lead capture,
              and FAQ chatbots — NIXRIX builds digital systems designed to support
              growth, visibility, and better operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={() => setAuditOpen(true)}
                className="h-14 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-8 text-base text-white shadow-xl hover:shadow-2xl"
              >
                Book Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-xl border-white/30 bg-transparent px-8 text-base text-white hover:bg-white hover:text-gray-900"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((item, i) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="text-left"
                >
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-sm text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-[#06B6D4]/15 blur-3xl" />
              <div className="absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[#0D9488]/15 blur-3xl" />

              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
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
                        <div className="rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-transparent p-4">
                          <BarChart3 className="mb-4 h-6 w-6 text-[#06B6D4]" />
                          <div className="h-3 w-16 rounded bg-white/15" />
                          <div className="mt-2 h-6 w-20 rounded bg-white/10" />
                        </div>
                        <div className="rounded-xl bg-gradient-to-br from-[#0D9488]/20 to-transparent p-4">
                          <MessageSquare className="mb-4 h-6 w-6 text-[#0D9488]" />
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
                      <div className="rounded-xl border border-[#06B6D4]/20 bg-[#06B6D4]/10 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                          <CheckCircle className="h-4 w-4 text-[#06B6D4]" />
                          Lead capture ready
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#0D9488]/20 bg-[#0D9488]/10 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                          <CheckCircle className="h-4 w-4 text-[#0D9488]" />
                          Reporting connected
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                          <CheckCircle className="h-4 w-4 text-white/80" />
                          Built to scale
                        </div>
                      </div>
                      <Button
                        onClick={() => setAuditOpen(true)}
                        className="h-11 w-full rounded-xl bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Get a Free Audit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY NIXRIX */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              Why NIXRIX
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
              More than a website
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Most business websites look fine but do very little to support growth.
              NIXRIX builds digital systems with the functionality, structure, and
              visibility growing businesses actually need.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {differentiators.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <Card className="h-full rounded-2xl border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:border-[#0D9488]/40 hover:shadow-xl">
                  <CardContent className="p-7">
                    <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-r from-[#06B6D4]/10 to-[#0D9488]/10 p-3 text-[#0D9488]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              Services
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
              Solutions built around your business
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Flexible services designed to help you improve visibility, generate leads,
              and support your operations more effectively.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.08}>
                <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#0D9488]/40 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-r from-[#06B6D4]/10 to-[#0D9488]/10 p-3 text-[#0D9488]">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {service.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm text-gray-700">
                          <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <Link
                        to="/services"
                        className="inline-flex items-center font-semibold text-[#0D9488]"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              Who we help
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
              Built for growing businesses
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We work best with businesses that need a stronger online presence and
              better digital support without building an in-house tech team.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {industries.map((industry, index) => (
              <ScrollReveal key={industry.title} delay={index * 0.1}>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:border-[#0D9488]/40 hover:bg-white hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900">{industry.title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{industry.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-gray-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              How we work
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              A structured process, built for clarity
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              We keep the process simple, collaborative, and focused on building
              something useful for your business.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
                  <div className="text-sm font-semibold tracking-[0.2em] text-[#06B6D4]">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-we-work">
              <Button
                variant="outline"
                className="rounded-xl border-white/20 bg-transparent text-white hover:bg-white hover:text-gray-900"
              >
                See Full Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* DEMOS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              Proof of capability
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
              See what’s possible
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Explore example experiences that show how NIXRIX combines websites with
              dashboards, chatbots, and interactive business functionality.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {demos.map((demo, index) => (
              <ScrollReveal key={demo.title} delay={index * 0.1}>
                <Link to={demo.link} className="group block h-full">
                  <Card className="h-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={demo.image}
                        alt={demo.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                        {demo.tag}
                      </span>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 transition group-hover:text-[#0D9488]">
                        {demo.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {demo.description}
                      </p>

                      <div className="mt-5 inline-flex items-center font-semibold text-[#0D9488]">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
              <Search className="h-4 w-4" />
              Blog
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
              Insights for growing businesses
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Useful content designed to help businesses understand websites, visibility,
              automation, dashboards, and growth opportunities.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {blogPreview.map((post, index) => (
              <ScrollReveal key={post.title} delay={index * 0.1}>
                <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-7">
                    <span className="inline-flex w-fit rounded-full bg-[#06B6D4]/10 px-3 py-1 text-xs font-semibold text-[#0D9488]">
                      {post.category}
                    </span>

                    <h3 className="mt-5 text-xl font-semibold text-gray-900">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>

                    <div className="mt-auto pt-6">
                      <Link
                        to={post.slug}
                        className="inline-flex items-center font-semibold text-[#0D9488]"
                      >
                        Read article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button
                variant="outline"
                className="rounded-xl border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
              >
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]" />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white sm:text-5xl">
              Ready to turn your website into a growth system?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              Let’s identify what your business needs now, what can be improved, and
              what should be built next.
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
