import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  BarChart3,
  Check,
  Sparkles,
  Zap,
  TrendingUp,
  Workflow,
  ClipboardCheck,
  ShieldCheck,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { motion } from "motion/react";

type LeadPayload = {
  type: "WELCOME_CODE";
  email: string;
  source: "homepage";
  pageUrl: string;
  meta?: Record<string, string>;
};

export function HomePage() {
  // ✅ No prices anywhere. Welcome code lead-capture only.
  const WELCOME_CODE = "NIXWELCOME";

  // Endpoint for serverless backend (we’ll set this later in Vercel/Netlify/Cloudflare):
  // Example: VITE_LEAD_ENDPOINT="https://your-worker.yourdomain.workers.dev/api/lead"
  const LEAD_ENDPOINT = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT || "/api/lead";

  const [welcomeEmail, setWelcomeEmail] = useState("");
  const [welcomeStatus, setWelcomeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [welcomeMsg, setWelcomeMsg] = useState<string>("");

  const stats = useMemo(
    () => [
      { value: "SME", label: "Built for UK SMEs" },
      { value: "CRM+", label: "Lead system ready" },
      { value: "KPI", label: "Dashboards & insights" },
      { value: "AUTO", label: "Automation workflows" },
    ],
    []
  );

  const corePillars = useMemo(
    () => [
      {
        icon: <Globe className="w-10 h-10" />,
        title: "Conversion Website",
        description:
          "A fast, modern site built to turn visitors into enquiries — with clear messaging and strong CTAs.",
        bullets: ["Conversion-first layout", "Local + technical SEO", "Analytics tracking", "Performance optimised"],
      },
      {
        icon: <Workflow className="w-10 h-10" />,
        title: "CRM + Automation",
        description:
          "Capture leads, automate follow-ups, and keep every enquiry tracked — so nothing slips through.",
        bullets: ["Lead capture forms", "Pipeline setup (CRM-ready)", "Follow-up automation", "Task workflow"],
      },
      {
        icon: <BarChart3 className="w-10 h-10" />,
        title: "Dashboards & Insights",
        description:
          "Know what’s working — live KPIs, performance visibility, and reporting you can act on.",
        bullets: ["KPI dashboards", "Plain-language insights", "Sales/lead reporting", "Ongoing improvement plan"],
      },
    ],
    []
  );

  const demoShowcase = useMemo(
    () => [
      {
        title: "KPI Dashboard Preview",
        description: "A realistic management dashboard with KPIs and actionable insights.",
        icon: <BarChart3 className="w-14 h-14" />,
        tag: "Interactive Preview",
        link: "/demo/dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
      },
      {
        title: "AI Chatbot Lead Capture",
        description: "A chatbot that answers questions and captures enquiries 24/7.",
        icon: <MessageSquare className="w-14 h-14" />,
        tag: "Live Feature",
        link: "/demo/chatbot",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&fit=crop",
      },
      {
        title: "Modern Website Showcase",
        description: "Clean UI, smooth interactions, and conversion-focused sections.",
        icon: <Globe className="w-14 h-14" />,
        tag: "Realistic UI",
        link: "/demo/website",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80&fit=crop",
      },
    ],
    []
  );

  const systemIncludes = useMemo(
    () => [
      {
        icon: <ClipboardCheck className="w-6 h-6" />,
        title: "Automated Proposals",
        description: "Template-driven quoting that’s faster, consistent, and ready to automate end-to-end.",
      },
      {
        icon: <Workflow className="w-6 h-6" />,
        title: "Task & Delivery Workflow",
        description: "A structured flow: enquiry → proposal → delivery → handover, with visibility throughout.",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Lead Tracking + CRM-ready",
        description: "Every enquiry captured and tracked—built to plug into your CRM when you’re ready.",
      },
      {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Clean Operating Setup",
        description: "Tracking, permissions, and documentation-ready structure to keep things organised.",
      },
    ],
    []
  );

  function scrollToWelcome() {
    const el = document.getElementById("welcome");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function isValidEmail(email: string) {
    // Simple email check (good enough for launch)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  async function submitWelcome(e: React.FormEvent) {
    e.preventDefault();

    const email = welcomeEmail.trim();
    if (!isValidEmail(email)) {
      setWelcomeStatus("error");
      setWelcomeMsg("Please enter a valid email address.");
      return;
    }

    setWelcomeStatus("loading");
    setWelcomeMsg("");

    const payload: LeadPayload = {
      type: "WELCOME_CODE",
      email,
      source: "homepage",
      pageUrl: window.location.href,
      meta: { code: WELCOME_CODE },
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setWelcomeStatus("success");
      setWelcomeMsg("Done! We’ve received your request and will email your welcome code details shortly.");
      setWelcomeEmail("");
    } catch (err) {
      setWelcomeStatus("error");
      setWelcomeMsg("Couldn’t send right now. Please try again, or use the Contact page.");
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead
        title="NIXRIX – Full SME Digital Systems (Website + CRM + Automation + Dashboards) | UK"
        description="Nixrix builds full digital systems for SMEs: conversion websites, CRM-ready lead capture + automation workflows, and KPI dashboards. Websites with built-in intelligence."
        keywords="SME digital transformation, website + CRM, business automation, KPI dashboards, UK web design, lead capture, workflow automation, dashboards"
        schemaType="organization"
      />

      <ChatbotWidget />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
          <motion.div
            className="absolute inset-0 opacity-25"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.28) 0%, transparent 55%)",
                "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.28) 0%, transparent 55%)",
                "radial-gradient(circle at 50% 80%, rgba(13, 148, 136, 0.28) 0%, transparent 55%)",
                "radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.28) 0%, transparent 55%)",
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-[#06B6D4]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -25, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], x: [0, -25, 0], y: [0, 25, 0], opacity: [0.45, 0.25, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating “system card” */}
          <motion.div
            className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-[520px]"
            initial={{ opacity: 0, x: 80, rotateY: -14 }}
            animate={{ opacity: 0.16, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gradient-to-r from-[#06B6D4]/30 to-[#0D9488]/30 rounded w-1/2" />
                  <div className="h-8 w-8 rounded-lg bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-24 bg-gradient-to-br from-[#06B6D4]/18 to-transparent rounded-xl" />
                  <div className="h-24 bg-gradient-to-br from-[#0D9488]/18 to-transparent rounded-xl" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                  <div className="h-3 bg-white/10 rounded w-3/5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[#06B6D4]/10 backdrop-blur-sm rounded-full border border-[#06B6D4]/30"
            >
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-[#06B6D4] text-sm font-semibold">Websites with built-in intelligence</span>
            </motion.div>

            {/* Headline */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
                className="text-5xl md:text-7xl lg:text-7xl font-bold text-white leading-tight"
              >
                Full SME Digital Systems
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.42 }}
                className="text-3xl md:text-5xl font-bold leading-tight mt-3"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#0D9488] to-[#06B6D4]">
                  Website + Lead Capture + Automation + Dashboards
                </span>
              </motion.h2>
            </div>

            {/* Value copy + micro taglines */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6 }}
            >
              Turn your website into a growth machine — not just an online brochure.
              <span className="text-white font-semibold"> Capture leads, follow up automatically, and track performance</span>{" "}
              with a system designed around your business.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              {[
                { icon: <Zap className="w-4 h-4" />, text: "More enquiries, less chasing" },
                { icon: <Workflow className="w-4 h-4" />, text: "Workflows that save time" },
                { icon: <TrendingUp className="w-4 h-4" />, text: "KPIs you can actually use" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Structured & professional delivery" },
              ].map((chip, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 text-sm"
                >
                  <span className="text-[#06B6D4]">{chip.icon}</span>
                  {chip.text}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.9 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  size="lg"
                  onClick={scrollToWelcome}
                  className="relative bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:shadow-2xl text-white text-lg px-10 py-7 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Claim Welcome Code
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
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

              <Link to="/case-studies">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-7 backdrop-blur-sm"
                  >
                    View Case Studies
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 1.05 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + index * 0.08 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 group-hover:text-[#06B6D4] transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div className="w-1 h-3 bg-white/50 rounded-full" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* CORE PILLARS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">What we deliver</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">A system — not just a website</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear visibility, less manual work, and a setup built to scale as your business grows.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {corePillars.map((p, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260 }} className="h-full">
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-[#06B6D4]/15 to-[#0D9488]/15 text-[#0D9488]">
                          {p.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-5 leading-relaxed">{p.description}</p>
                      <ul className="space-y-2 mb-6">
                        {p.bullets.map((b, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <Check className="w-4 h-4 text-[#0D9488] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {["Retail", "Manufacturing", "Local Services"].map((t, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.35} className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Want a clear plan first? Get a free audit and we’ll recommend the best setup for your business.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/solutions">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
                  >
                    See What’s Included
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white" onClick={scrollToWelcome}>
                  Claim Welcome Code
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* SYSTEM INCLUDES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">What’s inside the system</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Make your business easier to run</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              We organise the full flow: enquiry → proposal → delivery → reporting — so you can focus on growth.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {systemIncludes.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Card className="h-full border hover:border-[#0D9488]/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-[#06B6D4]/15 to-[#0D9488]/15 text-[#0D9488]">
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO SHOWCASE */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">See it in action</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Realistic system previews</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore previews of dashboards, chatbot lead capture, and modern UI interactions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoShowcase.map((demo, index) => (
              <ScrollReveal key={index} delay={index * 0.12} direction={index % 2 === 0 ? "left" : "right"}>
                <Link to={demo.link}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }} className="group">
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-[#06B6D4] transition-colors cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <motion.img
                          src={demo.image}
                          alt={demo.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }}
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
                          Open Preview
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

      {/* WELCOME CODE EMAIL CAPTURE */}
      <section id="welcome" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, #06B6D4 1px, transparent 1px)", backgroundSize: "52px 52px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-[#0D9488]/25 bg-gradient-to-r from-[#06B6D4]/10 to-[#0D9488]/10 p-8 md:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#0D9488]/20 text-sm font-semibold text-gray-800">
                    <Sparkles className="w-4 h-4 text-[#0D9488]" />
                    Welcome Offer
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mt-4">
                    Claim your Welcome Code
                  </h3>

                  <p className="text-gray-600 mt-3 leading-relaxed text-lg">
                    Enter your email — we’ll send you the welcome offer details and the next-step plan.
                    <span className="font-semibold text-gray-900"> No spam.</span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {[
                      { icon: <ClipboardCheck className="w-4 h-4" />, text: "Free SME Tech Audit" },
                      { icon: <Workflow className="w-4 h-4" />, text: "System blueprint" },
                      { icon: <Mail className="w-4 h-4" />, text: "Welcome code via email" },
                      { icon: <ShieldCheck className="w-4 h-4" />, text: "Structured rollout plan" },
                    ].map((t, i) => (
                      <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-gray-200 text-sm text-gray-700">
                        <span className="text-[#0D9488]">{t.icon}</span>
                        {t.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[420px]">
                  <div className="rounded-xl bg-white/70 border border-gray-200 p-5 mb-4">
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Your code</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{WELCOME_CODE}</div>
                    <div className="text-sm text-gray-600 mt-1">We’ll email you the offer details after you submit.</div>
                  </div>

                  <form onSubmit={submitWelcome} className="space-y-3">
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        value={welcomeEmail}
                        onChange={(e) => setWelcomeEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                        autoComplete="email"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white py-6 text-base shadow-lg hover:shadow-2xl"
                        disabled={welcomeStatus === "loading"}
                      >
                        {welcomeStatus === "loading" ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending…
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            Get Welcome Code
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        )}
                      </Button>
                    </motion.div>

                    {welcomeStatus !== "idle" && (
                      <div
                        className={`text-sm rounded-xl px-4 py-3 border ${
                          welcomeStatus === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-red-50 border-red-200 text-red-700"
                        }`}
                      >
                        {welcomeMsg}
                        {welcomeStatus === "error" && (
                          <div className="mt-2">
                            <Link to="/contact" className="font-semibold underline">
                              Or use the Contact page
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 leading-relaxed">
                      By submitting, you agree to be contacted about your enquiry. We don’t sell your data.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
              Ready to make your website actually work for your business?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book a free SME Tech Audit — we’ll map what you need and recommend the best rollout plan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-12 py-7 shadow-2xl" onClick={scrollToWelcome}>
                  Claim Welcome Code
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-2 border-white/60 text-white hover:bg-white hover:text-gray-900 text-lg px-12 py-7">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
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
