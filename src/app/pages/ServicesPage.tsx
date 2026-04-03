/**
 * NIXRIX — ServicesPage.tsx
 * All real named packages with correct prices
 * Filter tabs: Quick Wins / Signature / Agency / Retainers
 * Accordion for package details
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, Zap, Globe, BarChart3,
  Bot, Settings2, Building2, Palette, TrendingUp,
  Layers, ChevronDown,
} from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion, AnimatePresence } from "motion/react";

if (typeof document !== "undefined") {
  const id = "nixrix-gfonts";
  if (!document.getElementById(id)) {
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  }
}

const F = { h:"'Playfair Display', Georgia, serif", b:"'Plus Jakarta Sans', system-ui, sans-serif" };

// ── Package data ──────────────────────────────────────────────────────────────
type Pkg = {
  icon: React.ReactNode;
  tier: "quick" | "signature" | "agency" | "retainer";
  name: string;
  price: string;
  tagline: string;
  description: string;
  includes: string[];
  bestFor: string;
  image: string;
};

const packages: Pkg[] = [
  // QUICK WINS
  {
    icon: <Globe className="h-5 w-5" />, tier:"quick",
    name:"The Spark", price:"£497",
    tagline:"One clean page. Live in 5 days.",
    description:"A fast, professional one-page website that puts your business properly online. Mobile first, SEO foundations built in, contact form connected.",
    includes:["Mobile first responsive design","On-page SEO foundations","Contact form setup","Netlify hosting and domain connection","Delivered in 5 days"],
    bestFor:"Businesses that need a proper digital presence fast without a complex multi-page site.",
    image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
  },
  {
    icon: <Palette className="h-5 w-5" />, tier:"quick",
    name:"The Impression", price:"£497",
    tagline:"Logo and brand kit that means business.",
    description:"A professional logo, brand colour palette, typography, and brand guidelines delivered as a usable kit your team can apply immediately.",
    includes:["Primary logo and variations","Brand colour palette","Typography selection","Brand guidelines document","Logo files in all formats"],
    bestFor:"New businesses or existing businesses whose branding no longer represents what they have become.",
    image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
  },
  {
    icon: <Bot className="h-5 w-5" />, tier:"quick",
    name:"The Magnet", price:"£397",
    tagline:"One page. One goal. Maximum leads.",
    description:"A single conversion-focused landing page built around one action: turning visitors into enquiries. No distractions, no navigation away from the CTA.",
    includes:["Conversion focused layout","Lead capture form","CRM connection (HubSpot or email)","Optimised headline and copy","A/B ready structure"],
    bestFor:"Businesses running ads, campaigns, or outreach that need a dedicated high-converting destination.",
    image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop",
  },
  {
    icon: <Settings2 className="h-5 w-5" />, tier:"quick",
    name:"The Connector", price:"£497",
    tagline:"HubSpot set up properly. Every lead tracked.",
    description:"A full HubSpot CRM setup configured for your business — pipeline stages, contact properties, follow-up task templates, and email templates written and loaded.",
    includes:["HubSpot account setup","Pipeline stages configured","Contact property setup","7 email templates written","Team onboarding call"],
    bestFor:"Businesses that have leads coming in but no system to track, manage, or follow up consistently.",
    image:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop",
  },

  // SIGNATURE
  {
    icon: <Globe className="h-5 w-5" />, tier:"signature",
    name:"NIXRIX Launchpad", price:"£1,497",
    tagline:"Full business website. Built to convert.",
    description:"A complete multi-page business website designed, built and delivered ready to generate enquiries. SEO optimised, analytics connected, and lead capture working from day one.",
    includes:["Multi-page responsive website","On-page SEO throughout","Lead capture forms and flows","Google Analytics GA4 setup","Sitemap submitted to Google","5 day review period after delivery"],
    bestFor:"Businesses that need a full, credible website that works as a 24/7 sales tool.",
    image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    icon: <Settings2 className="h-5 w-5" />, tier:"signature",
    name:"NIXRIX Command", price:"£1,997",
    tagline:"CRM, automation and dashboard. One connected system.",
    description:"Your CRM, automation workflows, and a live KPI dashboard all set up and connected. Every lead tracked, every follow-up automated, every decision informed by data.",
    includes:["HubSpot CRM full setup","Make.com automation workflows","Live KPI dashboard build","Tally form connected to HubSpot","Email alert automation","Team onboarding and documentation"],
    bestFor:"Businesses ready to stop doing manual work and start running on connected, automated systems.",
    image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />, tier:"signature",
    name:"NIXRIX Momentum", price:"£797/month",
    tagline:"Monthly social media and content. Consistently visible.",
    description:"Regular LinkedIn and social content written, scheduled and published in your brand voice. Designed for business owners who know consistency matters but don't have the time.",
    includes:["Monthly LinkedIn content calendar","Posts written in your brand voice","Scheduling and publishing","Engagement monitoring","Monthly performance summary"],
    bestFor:"Business owners who want a consistent professional presence on LinkedIn without doing it themselves.",
    image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />, tier:"signature",
    name:"NIXRIX Intelligence", price:"From £1,200",
    tagline:"Power BI dashboard. Live data. Plain English.",
    description:"A fully built Power BI dashboard connected to your existing data sources, showing you exactly what is happening in your business in real time and in language anyone can understand.",
    includes:["Power BI dashboard full build","Live data source connections","KPI selection and tracking","Plain language insight labels","Automated alerts for key thresholds","Staff training session"],
    bestFor:"Businesses with data that is currently sitting in spreadsheets, CRMs, or tools they cannot easily read.",
    image:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop",
  },
  {
    icon: <Zap className="h-5 w-5" />, tier:"signature",
    name:"NIXRIX Autopilot", price:"From £997",
    tagline:"AI document processing. Repetitive work, handled.",
    description:"AI-powered document processing and workflow automation using Make.com. The admin tasks that eat your week get handled automatically without anyone needing to touch them.",
    includes:["Workflow audit and mapping","Make.com automation build","Document AI processing setup","Integration with existing tools","Testing and time savings report","Handover documentation"],
    bestFor:"Businesses spending significant time on document processing, data entry, or repetitive administrative tasks.",
    image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
  },

  // AGENCY
  {
    icon: <Building2 className="h-5 w-5" />, tier:"agency",
    name:"Agency Smart Pack", price:"£2,697",
    tagline:"Built for UK letting agencies. Everything connected.",
    description:"A complete digital system built specifically for UK letting agencies — website, CRM, and automation all set up and working together. Landlord and tenant flows configured, no leads missed.",
    includes:["Professional agency website","Tenant and landlord CRM setup","Lead automation from website to HubSpot","Email follow-up templates for lettings","Compliance-aware configuration","Team onboarding and training"],
    bestFor:"UK letting agencies losing landlord enquiries, spending hours on manual admin, or operating without a connected digital system.",
    image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
  },

  // RETAINERS
  {
    icon: <Layers className="h-5 w-5" />, tier:"retainer",
    name:"NIXRIX Grow Lite", price:"£197/month",
    tagline:"Basic ongoing support and monitoring.",
    description:"Monthly website updates, uptime monitoring, and priority email support. For businesses that want peace of mind without a large commitment.",
    includes:["Monthly website updates (up to 2 hours)","Uptime and performance monitoring","Priority email support","Monthly health check report"],
    bestFor:"Businesses that want professional ongoing maintenance without intensive support needs.",
    image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
  },
  {
    icon: <Layers className="h-5 w-5" />, tier:"retainer",
    name:"NIXRIX Grow Standard", price:"£397/month",
    tagline:"Ongoing support, optimisation and reporting.",
    description:"Regular updates, monthly reporting, CRM health checks, and SEO monitoring. For businesses actively using their NIXRIX system and wanting continuous improvement.",
    includes:["Up to 5 hours monthly support","Monthly performance report","CRM health checks","SEO monitoring","Content updates","Priority response within 4 hours"],
    bestFor:"Businesses running on NIXRIX systems who want regular optimisation and a reliable support partner.",
    image:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
  },
  {
    icon: <Layers className="h-5 w-5" />, tier:"retainer",
    name:"NIXRIX Grow Pro", price:"£797/month",
    tagline:"Full ongoing support, automation and strategy.",
    description:"Everything in Standard plus automation improvements, content updates, strategy calls, and unlimited priority support. For businesses where NIXRIX is a core operational tool.",
    includes:["Up to 12 hours monthly support","Monthly strategy call","Automation monitoring and improvement","Content updates and new pages","Proactive suggestions","Same day emergency response"],
    bestFor:"Businesses where NIXRIX systems are central to operations and continuous improvement matters.",
    image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
];

function TierLabel({ tier }: { tier: Pkg["tier"] }) {
  const map = {
    quick:    { label:"Quick Win",       cls:"bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/22" },
    signature:{ label:"Signature",       cls:"bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/22" },
    agency:   { label:"Letting Agencies",cls:"bg-[#1A1208]/8  text-[#1A1208] border-[#1A1208]/15" },
    retainer: { label:"Monthly Support", cls:"bg-[#E8230A]/8  text-[#E8230A] border-[#E8230A]/18" },
  }[tier];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${map.cls}`} style={{ fontFamily:F.b }}>
      {map.label}
    </span>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ y: open ? 0 : -6, borderColor:"#E8230A", boxShadow:"0 18px 48px rgba(232,35,10,0.12)" }}
      transition={{ type:"spring", stiffness:260 }}
      className="overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 to-transparent" />
        <div className="absolute bottom-3 left-4"><TierLabel tier={pkg.tier} /></div>
      </div>

      {/* Header */}
      <div className="p-6">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{pkg.name}</h3>
          <span className="shrink-0 text-xl font-semibold text-[#E8230A]" style={{ fontFamily:F.h }}>{pkg.price}</span>
        </div>
        <p className="mb-3 text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>{pkg.tagline}</p>
        <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{pkg.description}</p>

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-[#1A1208]/10 px-4 py-2.5 text-sm font-semibold text-[#1A1208] transition hover:border-[#E8230A]/30 hover:bg-[#E8230A]/4"
          style={{ fontFamily:F.b }}
        >
          {open ? "Hide details" : "See what's included"}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }}>
            <ChevronDown className="h-4 w-4 text-[#E8230A]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:"auto" }}
              exit={{ opacity:0, height:0 }}
              transition={{ duration:0.28, ease:"easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-2 border-t border-[#1A1208]/8 pt-4">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#1A1208]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="font-medium" style={{ fontFamily:F.b }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-[#E8230A]/5 p-4">
                <p className="text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>Best for</p>
                <p className="mt-1 text-sm font-light text-[#1A1208]/75" style={{ fontFamily:F.b }}>{pkg.bestFor}</p>
              </div>
              <Link to="/contact">
                <div className="mt-4 w-full rounded-xl bg-[#E8230A] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#C01A05]" style={{ fontFamily:F.b }}>
                  Enquire About This Package →
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <Link to="/contact">
            <div className="mt-3 w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition hover:border-[#E8230A] hover:bg-[#E8230A] hover:text-white" style={{ fontFamily:F.b }}>
              Enquire →
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function ServicesPage() {
  const [filter, setFilter] = useState<"all"|"quick"|"signature"|"agency"|"retainer">("all");
  const filtered = filter === "all" ? packages : packages.filter(p => p.tier === filter);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily:F.b, background:"#FDFAF5" }}>
      <SEOHead
        title="Services and Packages | NIXRIX UK Business Automation"
        description="Named packages with clear prices. Websites, CRM setup, automation, Power BI dashboards, AI document processing, and letting agency systems. NIXRIX, Leeds."
        keywords="UK business automation packages, HubSpot CRM setup, Power BI dashboard, website automation, letting agency automation, NIXRIX services Leeds"
        schemaType="service"
      />
      <ChatbotWidget />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 lg:py-32"
        style={{ background:"linear-gradient(145deg, #EDD8BB 0%, #F0E2C8 45%, #F5EDE0 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"38px 38px" }} />
        <motion.div className="pointer-events-none absolute right-0 top-0 h-[460px] w-[460px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A14 0%, transparent 68%)" }}
          animate={{ scale:[1,1.1,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-7 bg-[#E8230A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Packages</span>
            <div className="h-px w-7 bg-[#E8230A]" />
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.75rem]" style={{ fontFamily:F.h }}>
            Named Packages.
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Clear Prices.</em> No Guesswork.
          </motion.h1>

          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
            Every NIXRIX package has a defined scope and a published price. Start with one thing,
            add more as your business grows. No hidden costs, no vague proposals.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label:"Quick Wins from £397", bg:"bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/20" },
              { label:"Signature from £1,497", bg:"bg-[#1A1208]/8 text-[#1A1208] border-[#1A1208]/15" },
              { label:"Agency Smart Pack £2,697", bg:"bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/20" },
              { label:"Monthly from £197/month", bg:"bg-[#E8230A]/8 text-[#E8230A] border-[#E8230A]/18" },
            ].map((b, i) => (
              <span key={i} className={`rounded-full border px-4 py-2 text-xs font-semibold ${b.bg}`} style={{ fontFamily:F.b }}>{b.label}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background:"#F5EDE0" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:"linear-gradient(#1A1208 1px,transparent 1px),linear-gradient(90deg,#1A1208 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {([
              { key:"all",       label:"All Packages"     },
              { key:"quick",     label:"Quick Wins"       },
              { key:"signature", label:"Signature"        },
              { key:"agency",    label:"Letting Agencies" },
              { key:"retainer",  label:"Monthly Support"  },
            ] as const).map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  filter === key
                    ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.24)]"
                    : "border-[#1A1208]/14 bg-white text-[#1A1208]/70 hover:border-[#E8230A]/30 hover:text-[#1A1208]"
                }`}
                style={{ fontFamily:F.b }}>
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.07}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NOTE ─────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-2xl border-l-4 border-[#E8230A] bg-white p-8 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
              <h3 className="mb-4 text-2xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>How Pricing Works</h3>
              <div className="space-y-3 text-[#1A1208]/70" style={{ fontFamily:F.b }}>
                <p className="text-sm font-medium text-[#1A1208]">
                  All Quick Win packages have fixed prices. Signature packages have published starting prices —
                  the final price is confirmed after a free 30 minute discovery call where we understand your exact scope.
                </p>
                <p className="text-sm font-light">
                  NIXRIX Intelligence (Power BI) ranges from £1,200 to £3,500 depending on the number of data sources
                  and complexity of the dashboard. NIXRIX Autopilot ranges from £997 to £2,500 depending on
                  the number of workflows and document types.
                </p>
                <p className="text-sm font-light">
                  No hidden fees. No surprise invoices. You get a written proposal before anything starts.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"radial-gradient(circle, #FDFAF5 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
        <motion.div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A1C 0%, transparent 68%)" }}
          animate={{ scale:[1,1.09,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]/85" style={{ fontFamily:F.b }}>Not Sure Where to Start</span>
              <div className="h-px w-7 bg-[#E8230A]/70" />
            </div>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily:F.h }}>
              Tell Us What You Need.
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>We Will Tell You What Fits.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>
              Book a free 30 minute discovery call. We will look at your situation and recommend the right
              starting point. No pressure, no pitch.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                  <Button size="lg"
                    className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]"
                    style={{ fontFamily:F.b }}>
                    Book Free Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
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
