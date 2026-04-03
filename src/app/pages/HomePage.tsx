import { Link } from "react-router-dom";
import { useState } from "react";
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
  Star,
  Layers,
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
  description: string;
  features: string[];
  tier: "quick" | "signature" | "agency";
};

// ─── Services data (no prices — belong on /services page) ─────────────────────

const services: Service[] = [
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Spark",
    description: "A clean, fast one-page website that puts your business online properly — no bloat, no faff.",
    features: ["Mobile-first design", "SEO foundations", "Contact form", "Live within 5 days"],
    tier: "quick",
  },
  {
    icon: <Bot className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Magnet",
    description: "A dedicated landing page built around one goal: turning visitors into leads.",
    features: ["Conversion-focused layout", "Lead capture form", "CRM-ready", "Optimised copy"],
    tier: "quick",
  },
  {
    icon: <Settings2 className="h-5 w-5" />,
    label: "Quick Win",
    name: "The Connector",
    description: "HubSpot set up properly — pipeline, contacts, follow-up tasks — so no lead slips through.",
    features: ["Full CRM setup", "Pipeline stages", "Email templates", "Team onboarding"],
    tier: "quick",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Launchpad",
    description: "A full business website — designed, built, and ready to generate enquiries from day one.",
    features: ["Multi-page site", "SEO-optimised", "Lead capture", "Analytics setup"],
    tier: "signature",
  },
  {
    icon: <Settings2 className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Command",
    description: "CRM, automation, and a live dashboard — your business running smarter in one connected system.",
    features: ["HubSpot CRM", "Make.com automation", "Live dashboard", "Workflow setup"],
    tier: "signature",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Intelligence",
    description: "A Power BI dashboard that turns your raw data into clear decisions — without switching anything out.",
    features: ["Power BI build", "Live data feeds", "KPI tracking", "Plain-language insights"],
    tier: "signature",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Signature",
    name: "NIXRIX Autopilot",
    description: "AI-powered document processing and workflow automation — the manual work stops here.",
    features: ["Document AI", "Workflow automation", "Make.com builds", "Time savings report"],
    tier: "signature",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    label: "Letting Agencies",
    name: "Agency Smart Pack",
    description: "Built specifically for UK letting agencies — website, CRM, and automation in one complete pack.",
    features: ["Agency website", "Tenant/landlord CRM", "Lead automation", "Compliance-aware"],
    tier: "agency",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Discovery Call",
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

const painPoints = [
  "Spending hours on tasks a system should handle automatically",
  "A website that looks fine but generates zero enquiries",
  "Leads slipping through because follow-ups happen too late",
  "No real visibility on how your business is actually performing",
];

// ─── Tier badge colour ────────────────────────────────────────────────────────

function tierBadge(tier: Service["tier"]) {
  if (tier === "quick") return "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/20";
  if (tier === "agency") return "bg-[#1A1208]/8 text-[#1A1208] border-[#1A1208]/15";
  return "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/20";
}

// ─── Animated 3D Hero Background ─────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm cream gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #FDFAF5 0%, #F2E8D8 40%, #EDE0CB 65%, #F8F2E8 100%)",
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.065]"
        style={{
          backgroundImage:
            "linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* Diagonal ruled lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={`${i * 8 - 10}%`}
            y1="0%"
            x2={`${i * 8 + 20}%`}
            y2="100%"
            stroke="#1A1208"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Primary red orb — top right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          top: "-18%",
          right: "-10%",
          background:
            "radial-gradient(circle at 38% 38%, rgba(232,35,10,0.14) 0%, rgba(192,26,5,0.07) 42%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, 18, 0], y: [0, 14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary orb — bottom left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 440,
          height: 440,
          bottom: "-12%",
          left: "-8%",
          background:
            "radial-gradient(circle at 62% 62%, rgba(232,35,10,0.09) 0%, rgba(192,26,5,0.04) 44%, transparent 70%)",
        }}
        animate={{ scale: [1.05, 1, 1.05], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating 3D geometric shapes ── */}

      {/* Large rotated square — top right */}
      <motion.div
        className="absolute rounded-2xl border border-[#E8230A]/14 bg-[#E8230A]/5"
        style={{ width: 110, height: 110, top: "9%", right: "16%", rotate: 16 }}
        animate={{ y: [0, -20, 0], rotate: [16, 24, 16], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Medium square — left mid */}
      <motion.div
        className="absolute rounded-xl border border-[#1A1208]/10 bg-[#1A1208]/[0.03]"
        style={{ width: 68, height: 68, top: "40%", left: "5%", rotate: -14 }}
        animate={{ y: [0, 16, 0], rotate: [-14, -8, -14], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Small square — lower right */}
      <motion.div
        className="absolute rounded-lg border border-[#E8230A]/18 bg-[#E8230A]/6"
        style={{ width: 42, height: 42, bottom: "24%", right: "26%", rotate: 32 }}
        animate={{ y: [0, -12, 0], rotate: [32, 42, 32] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Ring — upper left quadrant */}
      <motion.div
        className="absolute rounded-full border-[2px] border-[#E8230A]/16"
        style={{ width: 90, height: 90, top: "20%", left: "24%", rotate: 0 }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Small ring — lower centre */}
      <motion.div
        className="absolute rounded-full border border-[#1A1208]/14"
        style={{ width: 52, height: 52, bottom: "18%", left: "44%", rotate: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.2 }}
      />

      {/* Diamond — right mid */}
      <motion.div
        className="absolute border border-[#E8230A]/12 bg-[#E8230A]/[0.035]"
        style={{ width: 50, height: 50, top: "52%", right: "9%", rotate: 45, borderRadius: 8 }}
        animate={{ y: [0, -16, 0], rotate: [45, 56, 45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Tiny diamond — top centre-right */}
      <motion.div
        className="absolute border border-[#1A1208]/10 bg-[#1A1208]/[0.025]"
        style={{ width: 32, height: 32, top: "30%", right: "36%", rotate: 45, borderRadius: 5 }}
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      {/* Pulse dot cluster */}
      {[
        { top: "29%", left: "42%", delay: 0 },
        { top: "31%", left: "45%", delay: 0.35 },
        { top: "27%", left: "44%", delay: 0.7 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-[#E8230A]/28"
          style={{ top: dot.top, left: dot.left }}
          animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
        />
      ))}

      {/* Grain noise */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`,
          backgroundSize: "190px 190px",
        }}
      />
    </div>
  );
}

// ─── Section heading helper ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      <div className="h-px w-8 bg-[#E8230A]" />
      <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
        {children}
      </span>
      <div className="h-px w-8 bg-[#E8230A]" />
    </div>
  );
}

function SectionLabelLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-8 bg-[#E8230A]" />
      <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
        {children}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "quick" | "signature" | "agency">("all");
  const filtered = activeFilter === "all" ? services : services.filter((s) => s.tier === activeFilter);

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#FDFAF5]"
      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
    >
      <SEOHead
        title="UK Business Automation & Websites | NIXRIX — Stop Losing Time"
        description="NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, automation, CRM systems, and live dashboards. Leeds-based. No migration."
        keywords="UK business automation, letting agency automation Leeds, workflow automation small business, HubSpot CRM setup UK, business website Leeds, Power BI dashboard UK"
        schemaType="organization"
      />

      <ChatbotWidget />

      {/* ╔══════════════════════╗
          ║  HERO                ║
          ╚══════════════════════╝ */}
      <section className="relative min-h-[94vh] overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6 lg:px-8 lg:pt-44">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="h-px w-10 bg-[#E8230A]" />
              <span
                className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]"
                style={{ letterSpacing: "0.14em" }}
              >
                UK Business Automation · Leeds
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2 }}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-[#1A1208] sm:text-[3.75rem] lg:text-[4.5rem]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Stop Losing Time.
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Start Running</span>
                <motion.span
                  className="absolute -bottom-1 left-0 z-0 h-[5px] w-full rounded-full bg-[#E8230A]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.88, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              <span className="text-[#E8230A]">Smarter.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="mt-7 max-w-2xl text-xl leading-9 text-[#6B6256]"
            >
              We help UK small businesses replace repetitive manual work with automation,
              smart websites, CRM systems, and live data dashboards —{" "}
              <span className="font-semibold text-[#1A1208]">
                without changing a single tool you already use.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                  <Button
                    size="lg"
                    className="group h-14 rounded-xl bg-[#E8230A] px-9 text-base font-semibold text-white shadow-[0_8px_32px_rgba(232,35,10,0.28)] transition-all hover:bg-[#C01A05] hover:shadow-[0_14px_44px_rgba(232,35,10,0.38)]"
                  >
                    Book a Free Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="/services">
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-xl border-2 border-[#1A1208]/18 bg-white/80 px-9 text-base font-semibold text-[#1A1208] backdrop-blur-sm transition-all hover:border-[#E8230A]/30 hover:bg-white"
                  >
                    See Our Services
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Pain points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.7 }}
              className="mt-12 space-y-3"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B6256]/60">
                Sound familiar?
              </p>
              {painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.38, delay: 0.76 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                  <span className="text-sm leading-6 text-[#6B6256]">{point}</span>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.22 }}
                className="pt-1 text-sm font-semibold text-[#E8230A]"
              >
                You're in the right place. →
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-[#6B6256]/35" />
        </motion.div>
      </section>

      {/* ╔══════════════════════╗
          ║  WHO WE HELP         ║
          ╚══════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A1A 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A10 0%, transparent 70%)" }}
          animate={{ scale: [1.06, 1, 1.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionLabel>Who We Help</SectionLabel>
            <h2
              className="text-4xl font-bold tracking-tight text-white md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Sound Familiar?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/55">
              We work with UK small businesses who are growing fast but stuck doing too much manually.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-5 w-5" />,
                title: "\"I spend hours every week on tasks a system should handle.\"",
                solution: "Automation fixes this",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "\"Our website looks okay but it's not bringing in any leads.\"",
                solution: "Conversion-focused rebuild fixes this",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "\"We lose track of leads and miss follow-ups constantly.\"",
                solution: "HubSpot CRM setup fixes this",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "\"I have no real visibility on how the business is performing.\"",
                solution: "Live dashboard fixes this",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8230A]/15 text-[#E8230A]">
                    {card.icon}
                  </div>
                  <p
                    className="mb-4 flex-grow text-sm leading-7 text-white/75"
                    style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
                  >
                    {card.title}
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8230A]/12 px-3 py-1.5 text-xs font-semibold text-[#E8230A]">
                    <CheckCircle2 className="h-3 w-3" />
                    {card.solution}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════╗
          ║  SERVICES            ║
          ╚══════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#F5EFE4] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel>Our Services</SectionLabel>
            <h2
              className="text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              What We Build for You
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B6256]">
              Named packages with transparent scopes. Start with one thing and build from there — at your pace.
            </p>
          </ScrollReveal>

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {(
              [
                { key: "all", label: "All Services" },
                { key: "quick", label: "Quick Wins" },
                { key: "signature", label: "Signature" },
                { key: "agency", label: "Letting Agencies" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  activeFilter === key
                    ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.22)]"
                    : "border-[#1A1208]/14 bg-white text-[#6B6256] hover:border-[#E8230A]/30 hover:text-[#1A1208]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="group flex h-full flex-col rounded-2xl border border-[#1A1208]/8 bg-white p-6 shadow-[0_4px_20px_rgba(26,18,8,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(26,18,8,0.10)]"
                >
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${tierBadge(service.tier)}`}
                    >
                      {service.icon}
                      {service.label}
                    </span>
                  </div>

                  <h3
                    className="mb-3 text-lg font-bold text-[#1A1208]"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {service.name}
                  </h3>
                  <p className="mb-5 flex-grow text-sm leading-7 text-[#6B6256]">
                    {service.description}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#1A1208]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to="/services">
                    <div className="w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white">
                      Learn More →
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Retainer callout */}
          <ScrollReveal delay={0.25}>
            <div className="mt-10 rounded-2xl border border-[#1A1208]/10 bg-white p-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Layers className="h-4 w-4 text-[#E8230A]" />
                <span className="text-sm font-semibold uppercase tracking-widest text-[#E8230A]">
                  Monthly Support
                </span>
              </div>
              <h3
                className="mb-3 text-2xl font-bold text-[#1A1208]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                NIXRIX Grow Retainers
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-[#6B6256]">
                Ongoing support, updates, and optimisation — for businesses who want continuous improvement, not just a one-off project.
              </p>
              <Link to="/services">
                <Button className="rounded-xl bg-[#1A1208] px-8 text-white hover:bg-[#E8230A]">
                  View All Packages &amp; Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ╔══════════════════════╗
          ║  HOW IT WORKS        ║
          ╚══════════════════════╝ */}
      <section className="bg-[#FDFAF5] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionLabel>The Process</SectionLabel>
            <h2
              className="text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              How We Work
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#6B6256]">
              From first call to live system — fast, transparent, and built around what you already have.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-2xl border border-[#1A1208]/8 bg-white p-7 shadow-[0_4px_24px_rgba(26,18,8,0.06)]"
                >
                  <div
                    className="mb-5 text-5xl font-bold text-[#E8230A]/10"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {step.number}
                  </div>
                  <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8230A] text-xs font-bold text-white shadow-[0_4px_12px_rgba(232,35,10,0.28)]">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#1A1208]">{step.title}</h3>
                  <p className="text-sm leading-7 text-[#6B6256]">{step.body}</p>
                  {i < steps.length - 1 && (
                    <div className="absolute -right-3.5 top-1/2 z-10 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-[#E8230A]/30 md:block" />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════╗
          ║  NO MIGRATION        ║
          ╚══════════════════════╝ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <SectionLabelLeft>Our Promise</SectionLabelLeft>
              <h2
                className="text-4xl font-bold tracking-tight text-[#1A1208] md:text-5xl"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                We Add.
                <br />
                We Never Replace.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#6B6256]">
                Most agencies want to rip out your existing tools and replace them with their preferred stack.
                We don't. We connect to what you already have, layer in intelligence, and make everything work
                together — without disrupting your operations for a single day.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "No forced platform migrations",
                  "No months of downtime or disruption",
                  "Works alongside your existing email, CRM, and spreadsheets",
                  "Your team keeps their workflow — just automated",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E8230A]" />
                    <span className="text-[#1A1208]">{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8 bg-[#FDFAF5] p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #1A1208 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="mb-2 text-6xl font-bold text-[#E8230A]/12"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    15,000+
                  </div>
                  <div
                    className="mb-2 text-xl font-bold text-[#1A1208]"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    UK Letting Agencies
                  </div>
                  <p className="mb-6 leading-7 text-[#6B6256]">
                    Our primary niche. We've built a dedicated package — the Agency Smart Pack — specifically
                    for UK letting agencies drowning in manual admin and losing landlords to more responsive
                    competitors.
                  </p>
                  <Link to="/contact">
                    <Button className="rounded-xl bg-[#E8230A] text-white shadow-[0_6px_20px_rgba(232,35,10,0.22)] hover:bg-[#C01A05]">
                      Ask about the Agency Smart Pack
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════╗
          ║  GUIDES / SEO        ║
          ╚══════════════════════╝ */}
      <section className="bg-[#FDFAF5] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal>
              <Link
                to="/blog/automation-for-uk-letting-agencies"
                className="group block h-full rounded-2xl border border-[#1A1208]/8 bg-white p-6 transition hover:border-[#E8230A]/22 hover:shadow-[0_8px_30px_rgba(26,18,8,0.08)]"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]">Guide</div>
                <h3
                  className="mb-2 text-lg font-bold text-[#1A1208] transition group-hover:text-[#E8230A]"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Automation for UK Letting Agencies
                </h3>
                <p className="text-sm leading-7 text-[#6B6256]">
                  How smart automation is saving letting agents 10+ hours a week — and why competitors are already doing it.
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]">
                  Read guide <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link
                to="/blog/business-automation-services-leeds"
                className="group block h-full rounded-2xl border border-[#1A1208]/8 bg-white p-6 transition hover:border-[#E8230A]/22 hover:shadow-[0_8px_30px_rgba(26,18,8,0.08)]"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]">Guide</div>
                <h3
                  className="mb-2 text-lg font-bold text-[#1A1208] transition group-hover:text-[#E8230A]"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
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
              <div className="flex h-full flex-col justify-between rounded-2xl bg-[#E8230A] p-6 text-white">
                <div>
                  <Star className="mb-4 h-6 w-6 text-white/55" />
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
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

      {/* ╔══════════════════════╗
          ║  FINAL CTA           ║
          ╚══════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Red orbs */}
        <motion.div
          className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A1E 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A12 0%, transparent 68%)" }}
          animate={{ scale: [1.05, 1, 1.05] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating shapes */}
        <motion.div
          className="pointer-events-none absolute right-[14%] top-[18%] h-14 w-14 rounded-xl border border-[#E8230A]/16"
          style={{ rotate: 20 }}
          animate={{ y: [0, -16, 0], rotate: [20, 30, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[24%] left-[12%] h-10 w-10 rounded-full border border-white/8"
          animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <SectionLabel>Ready When You Are</SectionLabel>

            <h2
              className="text-4xl font-bold tracking-tight text-white md:text-5xl"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Let's Fix What's
              <br />
              Slowing You Down.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/55">
              Book a free 30-minute discovery call. We'll look at your current setup, identify the biggest
              time and lead leaks, and tell you exactly how to fix them. No pitch, no pressure.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-14 rounded-xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_8px_32px_rgba(232,35,10,0.35)] hover:bg-[#C01A05] hover:shadow-[0_14px_44px_rgba(232,35,10,0.45)]"
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
                    className="h-14 rounded-xl border-2 border-white/18 bg-transparent px-10 text-base font-semibold text-white hover:border-white/32 hover:bg-white/5"
                  >
                    View Packages &amp; Pricing
                  </Button>
                </motion.div>
              </Link>
            </div>

            <p className="mt-10 text-sm text-white/28">
              NIXRIX LTD · Registered in England &amp; Wales · Leeds, UK · hello@nixrix.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
