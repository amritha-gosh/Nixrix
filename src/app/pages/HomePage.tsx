import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Globe, MessageSquare, BarChart3, Check, Sparkles, ShieldCheck, X, Loader2, CheckCircle } from "lucide-react";
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
  type: "WELCOME_CODE"; // keep backend compatibility
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
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/95 to-gray-950/95 shadow-2xl">
              <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5" />
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
                  className="rounded-xl p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/90">Work email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl"
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
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white shadow-lg hover:shadow-2xl"
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

  const coreServices = [
    {
      image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400&h=300&fit=crop",
      title: "Website Design",
      description: "From one-page sites to full business platforms—responsive, fast, and SEO-ready.",
      features: ["One-page websites", "Business websites", "Portfolio sites", "E-commerce ready"],
    },
    {
      image: "https://images.unsplash.com/photo-1751448582395-27fc57293f1a?w=400&h=300&fit=crop",
      title: "AI Chatbots",
      description: "Chatbots that engage visitors, answer questions, and capture enquiries—24/7.",
      features: ["FAQ automation", "Lead capture", "Custom training", "Multi-language"],
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      title: "Intelligent Websites",
      description: "Websites with embedded KPI dashboards, live data visibility, and decision insights.",
      features: ["Power BI dashboards", "Real-time data", "KPI explanations", "Automated alerts"],
    },
    {
      image: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=400&h=300&fit=crop",
      title: "Automation & SEO",
      description: "Lead workflows, CRM readiness, technical SEO, and performance optimisation.",
      features: ["Workflow automation", "Technical SEO", "Performance tuning", "Analytics setup"],
    },
  ];

  const demoShowcase = [
    {
      title: "Live Dashboard Demo",
      description: "See how we embed dashboards with plain-language insights",
      icon: <BarChart3 className="w-16 h-16" />,
      tag: "Interactive Demo",
      link: "/demo/dashboard",
      image: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "AI Chatbot Demo",
      description: "Try a realistic assistant designed for lead capture and support",
      icon: <MessageSquare className="w-16 h-16" />,
      tag: "Live Feature",
      link: "/demo/chatbot",
      image: "https://images.unsplash.com/photo-1757310998309-87a97e562ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "Website Showcase",
      description: "Modern, responsive designs with smooth interactions",
      icon: <Globe className="w-16 h-16" />,
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
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead
        title="NIXRIX - Modern Business Websites with AI, Automation & Dashboards | UK"
        description="UK-based digital systems partner for SMEs. Websites, AI chatbots, automation workflows, CRM readiness, and KPI dashboards."
        keywords="web design UK, SME automation, AI chatbot, KPI dashboard, Power BI integration, CRM workflows, technical SEO, intelligent websites"
        schemaType="organization"
      />
      <ChatbotWidget />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* HERO — same structure, luxury background upgrade */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Premium background layers (still your style) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />

          {/* Luxury dot grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "54px 54px",
              }}
            />
          </div>

          {/* Animated Mesh Gradient (subtle, premium) */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.30) 0%, transparent 52%)",
                "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.30) 0%, transparent 52%)",
                "radial-gradient(circle at 50% 80%, rgba(13, 148, 136, 0.28) 0%, transparent 52%)",
                "radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.30) 0%, transparent 52%)",
              ],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />

          {/* Right-side visual stays like before */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <motion.div
              className="absolute inset-0 opacity-20"
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

        {/* Floating elements kept (just slightly more subtle) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-[#06B6D4]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, 26, 0], y: [0, -22, 0], opacity: [0.28, 0.45, 0.28] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], x: [0, -26, 0], y: [0, 22, 0], opacity: [0.45, 0.28, 0.45] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating mockup stays but calmer */}
          <motion.div
            className="hidden xl:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[500px]"
            initial={{ opacity: 0, x: 100, rotateY: -14 }}
            animate={{ opacity: 0.14, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotateY: [-4, 4, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-[#06B6D4]/30 to-[#0D9488]/30 rounded w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-[#0D9488]/30 to-[#06B6D4]/30 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="h-20 bg-gradient-to-br from-[#06B6D4]/20 to-transparent rounded" />
                    <div className="h-20 bg-gradient-to-br from-[#0D9488]/20 to-transparent rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Content (keep wording style, remove pricing) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6 px-5 py-2.5 bg-[#06B6D4]/10 backdrop-blur-sm rounded-full border border-[#06B6D4]/30"
            >
              <span className="text-[#06B6D4] text-sm font-semibold">
                UK-based • Building intelligent digital systems for growing SMEs
              </span>
            </motion.div>

            <div className="mb-8">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  Websites Built for
                </h1>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#0D9488] to-[#06B6D4] animate-gradient">
                    Real Business Results
                  </span>
                </h1>
              </motion.div>
            </div>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              From simple portfolios to advanced platforms with AI chatbots, live dashboards, CRM-ready lead capture, and automation.
              <span className="text-[#06B6D4] font-semibold"> Built to scale with your business.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="relative bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:shadow-2xl text-white text-lg px-10 py-7 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Request a Complimentary Audit
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="ml-2 w-5 h-5" />
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-7 backdrop-blur-sm"
                  >
                    View Live Demos
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Keep stats style (no numbers, premium) */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400 group-hover:text-[#06B6D4] transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator (same) */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Grid (same section, just remove pricing lines) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">What We Build</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Choose Your Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple websites to advanced platforms—flexible services that grow with your business.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors cursor-pointer overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check className="w-4 h-4 text-[#0D9488] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/services" className="text-[#0D9488] font-semibold text-sm inline-flex items-center group">
                        Learn More
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Not sure what you need? We’ll guide you with a quick audit and clear recommendations.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button
                size="lg"
                onClick={() => setAuditOpen(true)}
                variant="outline"
                className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
              >
                Request Complimentary Audit
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Showcase (same) */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">See It In Action</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Live Feature Demos
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This website itself demonstrates our advanced capabilities—try the chatbot, explore the demos.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoShowcase.map((demo, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction={index % 2 === 0 ? "left" : "right"}>
                <Link to={demo.link}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }} className="group">
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-[#06B6D4] transition-colors cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <motion.img
                          src={demo.image}
                          alt={demo.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <span className="bg-[#06B6D4] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                            {demo.tag}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06B6D4] transition-colors">
                          {demo.title}
                        </h3>
                        <p className="text-gray-400 mb-4 text-sm">{demo.description}</p>
                        <span className="text-[#06B6D4] font-semibold text-sm inline-flex items-center">
                          Try Demo
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

      {/* CTA Section (same feel, premium wording) */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something That Actually Works?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let’s map your goals, fix the gaps, and build a system that converts—then scales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-12 py-7 shadow-2xl"
                >
                  Request Complimentary Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/70 text-white hover:bg-white hover:text-gray-900 text-lg px-12 py-7"
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
