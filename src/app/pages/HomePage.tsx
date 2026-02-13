import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Sparkles, ShieldCheck, Loader2, CheckCircle, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { Input } from "@/app/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

type AuditPayload = {
  type: "WELCOME_CODE"; // keep backend compatibility (we're using it for Audit requests)
  email: string;
  source: "homepage";
  pageUrl: string;
  meta?: Record<string, string>;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

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
        region: "UK",
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
      setMsg("Done — we’ll email you the audit booking details shortly.");
      setTimeout(() => onClose(), 1400);
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
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-gray-950/95 to-gray-900/95 shadow-2xl">
              <div className="p-6 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5" />
                    Complimentary Audit (UK-based)
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Get Your Digital Systems Audit
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    We’ll review your website + lead flow and suggest quick wins for conversion, CRM, automation and reporting.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submit} className="p-6 sm:p-7 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/90">Work email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-12 rounded-2xl"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {msg}
                  </div>
                )}
                {status === "success" && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                    {msg}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white shadow-lg hover:shadow-2xl"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </span>
                  ) : status === "success" ? (
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Request Audit
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="w-4 h-4" />
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

  const coreServices = useMemo(
    () => [
      {
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=650&fit=crop&q=80",
        title: "Conversion Websites",
        description: "Luxury-grade design, fast performance, and messaging built to convert visitors into enquiries.",
        features: ["Premium UI/UX", "Conversion-focused structure", "SEO-ready foundations", "Mobile-first build"],
      },
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=650&fit=crop&q=80",
        title: "Business Intelligence",
        description: "Dashboards and KPI reporting that turn raw activity into clear decisions—without the confusion.",
        features: ["KPI dashboards", "Plain-language insights", "Automated reporting", "Performance visibility"],
      },
      {
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&h=650&fit=crop&q=80",
        title: "CRM & Automation",
        description: "Lead capture → pipeline → follow-ups → tasks. Systems that reduce manual work and prevent lost leads.",
        features: ["CRM-ready lead capture", "Workflow automation", "Task & follow-up flows", "Proposal-ready pipelines"],
      },
      {
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=650&fit=crop&q=80",
        title: "Operational Integration",
        description: "Connect your website with your operational tools—ideal for distribution, trading, and scaling SMEs.",
        features: ["ERP/ops integration", "Inventory & orders visibility", "Data syncing", "Scalable infrastructure"],
      },
    ],
    []
  );

  const industries = useMemo(
    () => [
      {
        title: "Retail",
        image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=900&h=650&fit=crop&q=80",
        points: ["Visibility & local growth", "Lead capture that converts", "Simple reporting"],
      },
      {
        title: "Distribution & Trading",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&h=650&fit=crop&q=80",
        points: ["Order flow clarity", "Pipeline & margin visibility", "Operational automation"],
      },
      {
        title: "Manufacturing",
        image: "https://images.unsplash.com/photo-1581092580501-5cfa6f1e1b23?w=900&h=650&fit=crop&q=80",
        points: ["Performance dashboards", "Process visibility", "Structured digital systems"],
      },
      {
        title: "Service Businesses",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&h=650&fit=crop&q=80",
        points: ["Bookings & follow-ups", "CRM pipelines", "Automation that saves time"],
      },
    ],
    []
  );

  const demos = useMemo(
    () => [
      {
        title: "Live KPI Dashboard",
        description: "A realistic view of how performance reporting can look inside your website.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=720&fit=crop&q=80",
        link: "/demo/dashboard",
        tag: "Interactive",
      },
      {
        title: "AI Assistant + Lead Capture",
        description: "A premium chatbot experience designed to qualify enquiries and route them properly.",
        image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=1200&h=720&fit=crop&q=80",
        link: "/demo/chatbot",
        tag: "Live",
      },
      {
        title: "Website Experience Showcase",
        description: "Micro-interactions, motion, and high-end UI patterns for modern brands.",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=720&fit=crop&q=80",
        link: "/demo/website",
        tag: "Premium UI",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEOHead
        title="NIXRIX — Intelligent Digital Systems & Automation for Growing SMEs (UK)"
        description="UK-based digital systems partner for SMEs. Premium websites, CRM-ready lead capture, automation workflows, and KPI dashboards—built to scale."
        keywords="SME automation UK, business systems, CRM workflows, KPI dashboards, premium web design, digital transformation SMEs"
        schemaType="organization"
      />
      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO (Luxury / premium) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Luxury background layers */}
        <div className="absolute inset-0">
          {/* Subtle premium grid */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Animated mesh gradients */}
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                "radial-gradient(900px circle at 18% 35%, rgba(6,182,212,0.28) 0%, transparent 55%), radial-gradient(800px circle at 82% 62%, rgba(13,148,136,0.22) 0%, transparent 55%)",
                "radial-gradient(900px circle at 22% 60%, rgba(13,148,136,0.24) 0%, transparent 55%), radial-gradient(800px circle at 78% 35%, rgba(6,182,212,0.26) 0%, transparent 55%)",
                "radial-gradient(900px circle at 18% 35%, rgba(6,182,212,0.28) 0%, transparent 55%), radial-gradient(800px circle at 82% 62%, rgba(13,148,136,0.22) 0%, transparent 55%)",
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating premium glows */}
          <motion.div
            className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-[#06B6D4]/15 rounded-full blur-3xl"
            animate={{ x: [0, -24, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-[620px] h-[620px] bg-[#0D9488]/15 rounded-full blur-3xl"
            animate={{ x: [0, 26, 0], y: [0, -22, 0], scale: [1.06, 1, 1.06] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right-side luxury “glass” panel */}
          <div className="absolute right-0 top-0 bottom-0 w-[54%] hidden lg:block">
            <motion.div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-950/60 to-gray-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 text-sm font-semibold">
                UK-based • Serving SMEs across the UK & beyond
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] text-white"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Premium Digital Systems
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#0D9488] to-[#06B6D4]">
                Built to Scale Your Business
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
            >
              We engineer connected ecosystems—web, CRM-ready lead capture, automation workflows and KPI reporting—
              so your business runs smoother, responds faster, and converts more.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white shadow-xl hover:shadow-2xl"
                >
                  Request Complimentary Audit
                  <motion.span
                    className="ml-2 inline-flex"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>

              <Link to="/services">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-2xl border-2 border-white/35 text-white hover:bg-white hover:text-gray-950 backdrop-blur-sm"
                  >
                    Explore Solutions
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              {[
                "Conversion-first UX",
                "CRM-ready pipelines",
                "Automation workflows",
                "KPI visibility",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/25 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* SERVICES (images, premium cards) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">What We Deliver</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 mt-4 mb-6">
              Systems That Feel Premium — and Work Like Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beautiful customer-facing experiences, backed by connected operations: lead capture, automation, and reporting.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden border-2 hover:border-[#0D9488] transition-colors rounded-3xl">
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35 }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-gray-950/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
                          <Sparkles className="w-3.5 h-3.5" />
                          Premium build
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-950 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-5 text-sm leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check className="w-4 h-4 text-[#0D9488] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Link
                          to="/services"
                          className="text-[#0D9488] font-semibold text-sm inline-flex items-center group"
                        >
                          Explore details
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES (preview) */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.10]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "58px 58px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Industry Fit</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Built for SMEs That Need Clarity, Speed & Control
            </h2>
            <p className="text-xl text-white/65 max-w-3xl mx-auto">
              We adapt the system architecture to your workflow—so your digital presence and operations stay aligned.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                <Card className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.35 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {item.points.map((p) => (
                        <li key={p} className="text-sm text-white/75 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/25 text-white hover:bg-white hover:text-gray-950 rounded-2xl h-14 px-8"
                >
                  Explore Industry Solutions
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 mt-4 mb-6">
              Consultancy-Led Delivery. Engineering-Level Execution.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured method that keeps scope clear, progress visible, and outcomes measurable.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Audit & Strategy",
                desc: "We understand your workflow, audience, and bottlenecks—then define the system blueprint.",
                img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=650&fit=crop&q=80",
              },
              {
                title: "System Architecture",
                desc: "We plan the website + lead flow + CRM readiness + automation paths before we build.",
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=650&fit=crop&q=80",
              },
              {
                title: "Build & Integrate",
                desc: "We implement with premium UI and robust integrations—no fragile shortcuts.",
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=650&fit=crop&q=80",
              },
              {
                title: "Optimise & Scale",
                desc: "We refine conversion, automate follow-ups, and add reporting to keep improving results.",
                img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=650&fit=crop&q=80",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <Card className="rounded-3xl overflow-hidden border-2 hover:border-[#0D9488] transition-colors">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <motion.img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.35 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-2xl bg-gray-950 text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-950 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMOS (positioned as “system demonstrations”) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Live Demonstrations</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 mt-4 mb-6">
              See the System Feel — Not Just the Screens
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This website is part portfolio, part proof. Explore realistic demonstrations of what we implement.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demos.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <Link to={d.link} className="group">
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                    <Card className="rounded-3xl overflow-hidden border-2 hover:border-[#06B6D4] transition-colors">
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={d.image}
                          alt={d.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.35 }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/10 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/10 border border-white/15 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur">
                            {d.tag}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-950 mb-2 group-hover:text-[#0D9488] transition-colors">
                          {d.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{d.description}</p>
                        <span className="text-[#0D9488] font-semibold text-sm inline-flex items-center">
                          View demo
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Upgrade Your Digital Infrastructure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              If you want premium design *and* systems that actually run your business better—let’s map it properly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="bg-white text-gray-950 hover:bg-gray-100 text-lg px-10 h-14 rounded-2xl shadow-2xl"
                >
                  Request Complimentary Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/60 text-white hover:bg-white hover:text-gray-950 text-lg px-10 h-14 rounded-2xl"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>

            <div className="mt-8 text-sm text-white/80 inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              UK-based delivery • Remote-friendly • Structured process
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
