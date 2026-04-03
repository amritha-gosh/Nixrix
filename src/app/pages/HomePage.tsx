import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  BarChart3,
  Bot,
  Settings2,
  Building2,
  Clock,
  Users,
  ChevronDown,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Service = {
  icon: React.ReactNode;
  label: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  tier: "quick" | "signature" | "agency";
};

type Step = {
  number: string;
  title: string;
  body: string;
};

type TrustItem = {
  icon: React.ReactNode;
  stat: string;
  label: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Spark",
    price: "£497",
    description: "A clean, fast one-page website that puts your business online properly — no bloat, no faff.",
    features: ["Mobile-first design", "SEO foundations", "Contact form", "Live within 5 days"],
    tier: "quick",
  },
  {
    icon: <Bot className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Magnet",
    price: "£397",
    description: "A dedicated landing page built around one goal: turning visitors into leads.",
    features: ["Conversion-focused layout", "Lead capture form", "CRM-ready", "A/B tested copy"],
    tier: "quick",
  },
  {
    icon: <Settings2 className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Connector",
    price: "£497",
    description: "HubSpot set up properly — pipeline, contacts, follow-up tasks — so no lead slips through.",
    features: ["Full CRM setup", "Pipeline stages", "Email templates", "Team onboarding"],
    tier: "quick",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Launchpad",
    price: "£1,497",
    description: "A full business website — designed, built, and ready to generate enquiries from day one.",
    features: ["Multi-page site", "SEO-optimised", "Lead capture", "Analytics setup"],
    tier: "signature",
  },
  {
    icon: <Settings2 className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Command",
    price: "£1,997",
    description: "CRM, automation, and a live dashboard — your business running smarter in one connected system.",
    features: ["HubSpot CRM", "Make.com automation", "Live dashboard", "Workflow setup"],
    tier: "signature",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Intelligence",
    price: "From £1,200",
    description: "A Power BI dashboard that turns your raw data into decisions — without switching anything out.",
    features: ["Power BI build", "Live data feeds", "KPI tracking", "Plain-language insights"],
    tier: "signature",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Autopilot",
    price: "From £997",
    description: "AI-powered document processing and workflow automation — the manual work stops here.",
    features: ["Document AI", "Workflow automation", "Make.com builds", "Time savings report"],
    tier: "signature",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    label: "Letting Agencies",
    name: "Agency Smart Pack",
    price: "£2,697",
    description: "Built specifically for UK letting agencies — website, CRM, and automation in one complete pack.",
    features: ["Agency website", "Tenant/landlord CRM", "Lead automation", "Compliance-aware"],
    tier: "agency",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Free Digital Audit",
    body: "We review your current website, tools, and workflow in one 30-minute conversation. No jargon, no pressure.",
  },
  {
    number: "02",
    title: "Clear Recommendation",
    body: "You get a plain-English summary of what's costing you time and leads — and exactly what to fix first.",
  },
  {
    number: "03",
    title: "We Build It",
    body: "We deliver fast, using tools you already have. No ripping anything out. No months-long projects.",
  },
  {
    number: "04",
    title: "You Run Smarter",
    body: "Your new system runs in the background — capturing leads, automating tasks, giving you data to act on.",
  },
];

const trustItems: TrustItem[] = [
  {
    icon: <Shield className="h-6 w-6 text-[#E8230A]" />,
    stat: "UK Registered",
    label: "England & Wales, 2025",
  },
  {
    icon: <Building2 className="h-6 w-6 text-[#E8230A]" />,
    stat: "Leeds-Based",
    label: "Real team, real timezone",
  },
  {
    icon: <Clock className="h-6 w-6 text-[#E8230A]" />,
    stat: "5–10 Days",
    label: "Average delivery time",
  },
  {
    icon: <Users className="h-6 w-6 text-[#E8230A]" />,
    stat: "No Migration",
    label: "We add to what you have",
  },
];

const painPoints = [
  "You're still copying data between spreadsheets manually",
  "Your website looks fine but generates zero enquiries",
  "Leads come in but no-one follows up fast enough",
  "You have no idea which part of your business is actually performing",
];

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Noise texture SVG data URI ───────────────────────────────────────────────

const noiseStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundSize: "180px 180px",
};

// ─── Page component ───────────────────────────────────────────────────────────

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "quick" | "signature" | "agency">("all");

  const filteredServices =
    activeFilter === "all" ? services : services.filter((s) => s.tier === activeFilter);

  const tierColour = (tier: Service["tier"]) => {
    if (tier === "quick") return "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/20";
    if (tier === "agency") return "bg-[#1A1208]/8 text-[#1A1208] border-[#1A1208]/20";
    return "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/30";
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FDFAF5]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
      <SEOHead
        title="UK Business Automation & Websites | NIXRIX — Stop Losing Time"
        description="NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, automation, CRM systems, and live dashboards. Leeds-based. No migration. From £397."
        keywords="UK business automation, letting agency automation Leeds, workflow automation small business, HubSpot CRM setup UK, business website Leeds, Power BI dashboard UK"
        schemaType="organization"
      />

      <ChatbotWidget />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FDFAF5 0%, #F5EFE4 60%, #FDFAF5 100%)" }}
      >
        {/* Noise grain overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-60" style={noiseStyle} />

        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Red accent blob */}
        <motion.div
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A18 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A0e 0%, transparent 70%)" }}
          animate={{ scale: [1.05, 1, 1.05] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#E8230A]/25 bg-white px-4 py-2 shadow-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#E8230A]" />
                <span className="text-sm font-semibold text-[#1A1208]">
                  UK-based · Leeds · Registered in England &amp; Wales
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="text-5xl font-bold leading-[1.06] tracking-tight text-[#1A1208] sm:text-6xl lg:text-[4.25rem]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Stop Losing Time.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#E8230A]">Start Running</span>
                  <motion.span
                    className="absolute bottom-1 left-0 z-0 h-3 w-full rounded-sm bg-[#E8230A]/12"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>{" "}
                Smarter.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 }}
                className="mt-6 max-w-xl text-lg leading-8 text-[#6B6256] sm:text-xl"
              >
                We help UK small businesses replace repetitive manual work with automation, smart websites, CRM systems, and live data dashboards —{" "}
                <span className="font-semibold text-[#1A1208]">without changing a single tool you already use.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.5 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="group h-14 rounded-xl bg-[#E8230A] px-8 text-base font-semibold text-white shadow-[0_8px_30px_rgba(232,35,10,0.30)] transition-all hover:bg-[#C01A05] hover:shadow-[0_12px_40px_rgba(232,35,10,0.38)]"
                    >
                      Book a Free Discovery Call
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>

                <Link to="/services">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-xl border-2 border-[#1A1208]/20 bg-white/70 px-8 text-base font-semibold text-[#1A1208] backdrop-blur-sm transition-all hover:border-[#E8230A]/40 hover:bg-white"
                    >
                      See Our Packages
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Pain points checklist */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 space-y-3"
              >
                {painPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="text-sm text-[#6B6256]">{point}</span>
                  </motion.div>
                ))}
                <div className="pt-1 text-sm font-semibold text-[#E8230A]">
                  ↑ If any of these sound familiar, you're in the right place.
                </div>
              </motion.div>
            </div>

            {/* Right column — dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mx-auto w-full max-w-lg"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Card glow */}
                <div className="absolute -inset-4 rounded-[36px] bg-[#E8230A]/8 blur-2xl" />

                <div className="relative overflow-hidden rounded-[28px] border border-[#1A1208]/10 bg-white shadow-[0_24px_80px_rgba(26,18,8,0.12)]">
                  {/* Browser chrome */}
                  <div className="flex items-center justify-between border-b border-[#1A1208]/8 bg-[#FDFAF5] px-5 py-3.5">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#E8230A]/60" />
                      <div className="h-3 w-3 rounded-full bg-[#E8230A]/30" />
                      <div className="h-3 w-3 rounded-full bg-[#E8230A]/15" />
                    </div>
                    <div className="rounded-full bg-[#E8230A]/8 px-3 py-1 text-[11px] font-medium text-[#E8230A]">
                      nixrix.com — live
                    </div>
                    <div className="w-16" />
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Top stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Leads this week", val: "14", change: "+40%", up: true },
                        { label: "Hours saved", val: "22h", change: "automated", up: true },
                        { label: "Follow-ups sent", val: "100%", change: "on time", up: true },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-2xl bg-[#FDFAF5] p-3.5 border border-[#1A1208]/6">
                          <div className="text-[10px] text-[#6B6256] leading-4">{stat.label}</div>
                          <div className="mt-1 text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Clash Display', sans-serif" }}>{stat.val}</div>
                          <div className="text-[10px] font-medium text-[#E8230A]">{stat.change}</div>
                        </div>
                      ))}
                    </div>

                    {/* Automation flow */}
                    <div className="rounded-2xl border border-[#E8230A]/12 bg-[#FDFAF5] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1A1208]">Live Automation Flow</span>
                        <span className="rounded-full bg-[#E8230A]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#E8230A]">Running</span>
                      </div>
                      {[
                        { step: "New enquiry received", done: true },
                        { step: "HubSpot contact created", done: true },
                        { step: "Basil notified by email", done: true },
                        { step: "Follow-up task assigned", done: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-1.5">
                          <div className={`h-2 w-2 rounded-full ${item.done ? "bg-[#E8230A]" : "bg-[#1A1208]/15"}`} />
                          <span className={`text-xs ${item.done ? "text-[#1A1208]" : "text-[#6B6256]"}`}>{item.step}</span>
                          {item.done && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-[#E8230A]" />}
                        </div>
                      ))}
                    </div>

                    {/* Service tags */}
                    <div className="flex flex-wrap gap-2">
                      {["Website", "HubSpot CRM", "Automation", "Dashboard", "AI Chatbot"].map((tag) => (
                        <span key={tag} className="rounded-full border border-[#1A1208]/12 bg-[#FDFAF5] px-3 py-1 text-[11px] font-medium text-[#6B6256]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link to="/contact">
                      <div className="mt-1 w-full rounded-xl bg-[#E8230A] py-3 text-center text-sm font-semibold text-white shadow-[0_6px_20px_rgba(232,35,10,0.25)] transition hover:bg-[#C01A05]">
                        Book Free Discovery Call →
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20 flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-[#6B6256]/50" />
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="border-y border-[#1A1208]/8 bg-white py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-2 text-center">
                  {item.icon}
                  <div className="text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {item.stat}
                  </div>
                  <div className="text-sm text-[#6B6256]">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A20 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
              Who We Help
            </span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Sound Familiar?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
              We work with UK small businesses who are growing fast but stuck doing too much manually.
              Here's what we hear every week.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-5 w-5" />,
                title: "\"I spend hours every week on tasks a system should do.\"",
                solution: "Automation fixes this.",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "\"Our website looks okay but it's not bringing in any leads.\"",
                solution: "A conversion-focused rebuild fixes this.",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "\"We lose track of leads and miss follow-ups all the time.\"",
                solution: "A HubSpot CRM setup fixes this.",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "\"I have no real visibility on how the business is actually performing.\"",
                solution: "A live dashboard fixes this.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8230A]/15 text-[#E8230A]">
                    {card.icon}
                  </div>
                  <p className="mb-3 text-sm leading-7 text-white/80" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
                    {card.title}
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8230A]/15 px-3 py-1 text-xs font-semibold text-[#E8230A]">
                    <CheckCircle2 className="h-3 w-3" />
                    {card.solution}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#FDFAF5] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
              The Process
            </span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              How We Work
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#6B6256]">
              Simple, fast, and completely transparent. From first call to live system in days — not months.
            </p>
          </ScrollReveal>

          <div className="relative grid gap-8 md:grid-cols-4">
            {/* Connecting line on desktop */}
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#E8230A]/20 to-transparent md:block" />

            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-2xl border border-[#1A1208]/8 bg-white p-6 shadow-[0_4px_24px_rgba(26,18,8,0.06)]"
                >
                  <div
                    className="mb-4 text-4xl font-bold text-[#E8230A]/15"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {step.number}
                  </div>
                  <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-[#E8230A] text-center leading-8 text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#1A1208]">{step.title}</h3>
                  <p className="text-sm leading-7 text-[#6B6256]">{step.body}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5EFE4] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
              Our Packages
            </span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Pick Your Starting Point
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B6256]">
              Named packages with clear prices. No hidden costs. No vague proposals.
              Start with one thing and build from there.
            </p>
          </ScrollReveal>

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {(["all", "quick", "signature", "agency"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  activeFilter === filter
                    ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_16px_rgba(232,35,10,0.25)]"
                    : "border-[#1A1208]/15 bg-white text-[#6B6256] hover:border-[#E8230A]/40"
                }`}
              >
                {filter === "all" && "All Packages"}
                {filter === "quick" && "Quick Wins"}
                {filter === "signature" && "Signature"}
                {filter === "agency" && "Letting Agencies"}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredServices.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="group flex h-full flex-col rounded-2xl border border-[#1A1208]/8 bg-white p-6 shadow-[0_4px_20px_rgba(26,18,8,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(26,18,8,0.10)]"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${tierColour(service.tier)}`}>
                      {service.icon}
                      {service.label}
                    </div>
                  </div>

                  <h3 className="mb-1 text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {service.name}
                  </h3>
                  <div className="mb-3 text-2xl font-bold text-[#E8230A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {service.price}
                  </div>
                  <p className="mb-5 text-sm leading-7 text-[#6B6256] flex-grow">
                    {service.description}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#1A1208]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <div className="w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white">
                      Enquire →
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Monthly retainers callout */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 rounded-2xl border border-[#1A1208]/10 bg-white p-8 text-center shadow-sm">
              <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#E8230A]">Monthly Support</div>
              <h3 className="mb-3 text-2xl font-bold text-[#1A1208]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                NIXRIX Grow Retainers
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-[#6B6256]">
                Ongoing support, updates, and optimisation — from £197/month. Lite, Standard, and Pro plans available.
              </p>
              <Link to="/services">
                <Button className="rounded-xl bg-[#1A1208] px-8 text-white hover:bg-[#E8230A]">
                  View All Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── NO MIGRATION PROMISE ──────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
                Our Promise
              </span>
              <h2
                className="mt-4 text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                We Add. We Never Replace.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#6B6256]">
                Most agencies want to rip out your existing tools and replace them with their preferred stack.
                We don't. We connect to what you already have, layer in intelligence, and make everything work together —
                without disrupting your operations for a single day.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "No forced platform migrations",
                  "No months of downtime",
                  "Works with your existing email, CRM, and spreadsheets",
                  "Your team keeps their current workflow — just automated",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E8230A]" />
                    <span className="text-[#1A1208]">{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-[#1A1208]/8 bg-[#FDFAF5] p-8">
                <div className="mb-6 text-4xl font-bold text-[#E8230A]/15" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  15,000+
                </div>
                <div className="mb-2 text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  UK Letting Agencies
                </div>
                <p className="mb-6 text-[#6B6256]">
                  Our primary niche. We've built a dedicated package — the Agency Smart Pack — specifically for UK letting agencies who are drowning in manual admin and losing landlords to more responsive competitors.
                </p>
                <Link to="/contact">
                  <Button className="rounded-xl bg-[#E8230A] text-white hover:bg-[#C01A05]">
                    Agency Smart Pack — £2,697
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="border-y border-[#1A1208]/8 bg-[#FDFAF5] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
            {[
              { target: 5, suffix: " days", label: "Average delivery" },
              { target: 15000, suffix: "+", label: "UK letting agencies — our primary niche" },
              { target: 997, suffix: "", label: "Starting price for automation builds" },
              { target: 100, suffix: "%", label: "No-migration delivery — always" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div>
                  <div
                    className="text-4xl font-bold text-[#E8230A]"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {stat.target === 997 ? "£" : ""}
                    <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-[#6B6256]">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT SECTION ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <ScrollReveal>
              <Link to="/blog/automation-for-uk-letting-agencies" className="group block rounded-2xl border border-[#1A1208]/8 bg-[#FDFAF5] p-6 transition hover:border-[#E8230A]/25 hover:shadow-[0_8px_30px_rgba(26,18,8,0.08)]">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]">Guide</div>
                <h3 className="mb-2 text-lg font-bold text-[#1A1208] group-hover:text-[#E8230A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  Automation for UK Letting Agencies
                </h3>
                <p className="text-sm leading-7 text-[#6B6256]">
                  How smart automation is saving letting agents 10+ hours a week — and why your competitors are already doing it.
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]">
                  Read guide <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link to="/blog/business-automation-services-leeds" className="group block rounded-2xl border border-[#1A1208]/8 bg-[#FDFAF5] p-6 transition hover:border-[#E8230A]/25 hover:shadow-[0_8px_30px_rgba(26,18,8,0.08)]">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]">Guide</div>
                <h3 className="mb-2 text-lg font-bold text-[#1A1208] group-hover:text-[#E8230A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  Business Automation Services in Leeds
                </h3>
                <p className="text-sm leading-7 text-[#6B6256]">
                  Why Leeds-based SMEs are turning to workflow automation to grow faster without hiring more staff.
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]">
                  Read guide <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col justify-between rounded-2xl bg-[#E8230A] p-6 text-white">
                <div>
                  <Star className="mb-4 h-6 w-6 text-white/70" />
                  <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    Not sure where to start?
                  </h3>
                  <p className="text-sm leading-7 text-white/80">
                    Tell us about your business in 2 minutes and we'll tell you exactly what would make the biggest difference — for free.
                  </p>
                </div>
                <Link to="/contact" className="mt-6 block">
                  <div className="rounded-xl bg-white py-3 text-center text-sm font-semibold text-[#E8230A] transition hover:bg-white/90">
                    Book a Free 30-Min Call →
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A22 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
              Ready When You Are
            </span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Let's Fix What's Slowing You Down.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60">
              Book a free 30-minute discovery call. We'll look at your current setup, identify the biggest time and lead leaks, and tell you exactly how to fix them. No pitch, no pressure.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-14 rounded-xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_8px_30px_rgba(232,35,10,0.35)] hover:bg-[#C01A05] hover:shadow-[0_12px_40px_rgba(232,35,10,0.45)]"
                  >
                    Book Free Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="/services">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-xl border-2 border-white/20 bg-transparent px-10 text-base font-semibold text-white hover:border-white/40 hover:bg-white/8"
                  >
                    View Packages &amp; Pricing
                  </Button>
                </motion.div>
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/35">
              NIXRIX LTD · Registered in England &amp; Wales · Leeds, UK · hello@nixrix.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
