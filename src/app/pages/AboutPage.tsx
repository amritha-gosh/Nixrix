import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Shield, Clock,
  Users, Heart, Target, TrendingUp,
} from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";

// ── Font injection ─────────────────────────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("nixrix-gfonts")) {
  const l = document.createElement("link");
  l.id = "nixrix-gfonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
  document.head.appendChild(l);
}

const F = { h: "'Playfair Display', Georgia, serif", b: "'Plus Jakarta Sans', system-ui, sans-serif" };

// ── Values ─────────────────────────────────────────────────────────────────────
const values = [
  { icon: <Shield className="h-6 w-6" />, title: "No Migration, Ever", body: "We add to what you already have. Platforms stay. Tools stay. Your team's routine stays. What changes is the ceiling on what you can achieve with them." },
  { icon: <Clock className="h-6 w-6" />, title: "Delivered While It Still Matters", body: "Every week of delay is a week of missed leads. We move fast because we understand the cost of waiting for a system that should already be working." },
  { icon: <Target className="h-6 w-6" />, title: "Honest Above All Else", body: "We tell you what you actually need. If a smaller package solves your problem, we say so. Long-term trust matters more than a larger first invoice." },
  { icon: <Heart className="h-6 w-6" />, title: "Built for UK Businesses", body: "We are a UK company building for UK businesses. We understand the market, the pace, the compliance context, and what your clients actually expect." },
  { icon: <TrendingUp className="h-6 w-6" />, title: "Results, Not Reports", body: "We measure success by leads captured, hours saved, and decisions made with confidence. Not by documents produced or hours logged." },
  { icon: <Users className="h-6 w-6" />, title: "You Work With the People Building It", body: "No account managers. No handoffs. The founders are involved in every project. When you ask a question, the person who answers it is the person who built it." },
];

// ── Section tag ────────────────────────────────────────────────────────────────
function Tag({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
      <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? "text-[#E8230A]/80" : "text-[#E8230A]"}`} style={{ fontFamily: F.b }}>
        {children}
      </span>
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
    </div>
  );
}

function TagLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-px w-7 bg-[#E8230A]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily: F.b }}>{children}</span>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>

      {/* ── ON-PAGE SEO HEAD ─────────────────────────────────────────────────── */}
      <SEOHead
        title="About NIXRIX | UK Business Automation Company — Leeds"
        description="NIXRIX is a Leeds-based UK business automation company helping SMEs replace manual work with smart websites, CRM systems, automation and live dashboards. No migration required."
        keywords="about NIXRIX, UK business automation company Leeds, UK SME automation, no migration automation, HubSpot CRM setup Leeds, letting agency automation UK"
        schemaType="organization"
      />
      <ChatbotWidget />

      {/* ── HERO — lightest bg ────────────────────────────────────────────────── */}
      <section
        aria-label="About NIXRIX hero"
        className="relative overflow-hidden py-28 lg:py-36"
        style={{ background: "linear-gradient(160deg, #FAF5EC 0%, #F5EDE0 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        <motion.div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,35,10,0.10) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          {/* Schema breadcrumb signal */}
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/60" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-[#E8230A]">About</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Tag>About NIXRIX</Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: F.h }}
          >
            We Help UK Small Businesses
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle: "italic" }}>Stop Losing Time</em>
            <br />
            and Start Running Smarter.
          </motion.h1>

          {/* H1-supporting paragraph — keyword-rich for SEO */}
          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.38 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/70"
            style={{ fontFamily: F.b }}
          >
            NIXRIX is a Leeds-based UK business automation company, registered in England and Wales. We help
            UK SMEs and letting agencies replace repetitive manual work with smart websites, CRM systems,
            automation workflows, and live data dashboards — without changing a single tool they already use.
          </motion.p>
        </div>
      </section>

      {/* ── FOUNDER STORY — one step darker ─────────────────────────────────── */}
      <section
        aria-label="NIXRIX founder story and mission"
        className="py-24"
        style={{ background: "#F5EDE0" }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            <ScrollReveal direction="left">
              <TagLeft>Our Story</TagLeft>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
                Built From Frustration.
                <br />
                <em style={{ fontStyle: "italic" }}>Driven By What's Possible.</em>
              </h2>

              {/* Emotional / psychological copy — speaks to pain before solution */}
              <div className="mt-6 space-y-4">
                <p className="text-lg font-light leading-[1.85] text-[#1A1208]/72" style={{ fontFamily: F.b }}>
                  NIXRIX started with a simple observation: the businesses doing the most meaningful work —
                  the local letting agent building community, the accountant who knows every client by name,
                  the small consultancy punching above its weight — were being held back by systems that
                  never quite worked together.
                </p>
                <p className="text-base font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily: F.b }}>
                  Leads slipping through because nobody saw the enquiry in time. Decisions being made
                  on gut feeling because the data was buried in three different spreadsheets. Entire
                  afternoons lost to tasks that should have been handled automatically before lunch.
                </p>
                <p className="text-base font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily: F.b }}>
                  We knew the technology existed to fix all of it. The problem was that most of the
                  companies offering it wanted to replace everything the business already had. New
                  platform. New tools. Six months of disruption. A price tag that only made sense for
                  companies ten times the size.
                </p>
                <p className="text-base font-semibold leading-[1.85] text-[#1A1208]" style={{ fontFamily: F.b }}>
                  So we built NIXRIX around a different philosophy: add intelligence to what already
                  exists. Make it work. Make it fast. Make it honest.
                </p>
              </div>

              {/* Trust signals as microcopy */}
              <div className="mt-8 space-y-3">
                {[
                  "Make advanced automation accessible to every UK SME",
                  "Deliver results in days, not months",
                  "Be the honest partner, not the agency that oversells",
                  "Specialise deeply in UK letting agencies first",
                ].map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }}
                className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=640&fit=crop"
                  alt="NIXRIX founders working on UK business automation"
                  className="h-[440px] w-full object-cover lg:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/68 via-[#1A1208]/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl border border-white/14 bg-[#1A1208]/72 p-5 backdrop-blur-sm">
                    {/* Pull quote — psychological authority signal */}
                    <p className="text-sm font-light leading-6 text-white/82" style={{ fontFamily: F.b, fontStyle: "italic" }}>
                      "The businesses that are going to win the next five years are not necessarily the biggest ones.
                      They are the ones that are running smarter — with better systems, better data, and less time
                      lost to work that should already be automatic."
                    </p>
                    <p className="mt-3 text-xs font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>
                      The Founders, NIXRIX — Leeds, 2025
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MISSION + VISION — two steps darker ─────────────────────────────── */}
      <section
        aria-label="NIXRIX mission and vision"
        className="py-24"
        style={{ background: "#EDE4D4" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>Mission and Vision</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              What We Are Building Toward
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily: F.b }}>
              A UK where no small business owner spends their afternoon doing what a system should do.
            </p>
          </ScrollReveal>

          <div className="grid gap-7 sm:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop",
                label: "Mission",
                title: "Every Lead Gets Followed Up",
                body: "Automated CRM and follow-up systems that capture every enquiry and respond before a competitor does. No lead slips through a gap.",
              },
              {
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop",
                label: "Vision",
                title: "Every Website Earns Its Keep",
                body: "A business website that generates enquiries consistently, not one that just confirms you exist. Connected, conversion-focused, and alive with data.",
              },
              {
                img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=700&h=450&fit=crop",
                label: "Purpose",
                title: "Every Decision Backed by Data",
                body: "Live dashboards that show business owners exactly what is working and what needs attention right now — in plain English, not just numbers on a screen.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -7, borderColor: "#E8230A", boxShadow: "0 20px 52px rgba(232,35,10,0.13)" }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white"
                >
                  <div className="h-44 overflow-hidden">
                    <motion.img src={card.img} alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>
                      {card.label}
                    </span>
                    <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>{card.title}</h3>
                    <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>{card.body}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES — three steps darker ──────────────────────────────────────── */}
      <section
        aria-label="NIXRIX values and principles"
        className="py-24"
        style={{ background: "#E5D9C6" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>Our Values</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              What We Stand For
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light leading-8 text-[#1A1208]/60" style={{ fontFamily: F.b }}>
              Six principles that shape every recommendation, every build, and every conversation.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "#E8230A", boxShadow: "0 18px 48px rgba(232,35,10,0.11)" }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="rounded-2xl border border-[#1A1208]/10 bg-white p-7"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A]/10 text-[#E8230A]">
                    {v.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>{v.title}</h3>
                  <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>{v.body}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NIXRIX — warm list ────────────────────────────────────────────── */}
      <section
        aria-label="Why choose NIXRIX"
        className="py-20"
        style={{ background: "#EDE4D4" }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            <ScrollReveal>
              <TagLeft>Why Choose Us</TagLeft>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208]" style={{ fontFamily: F.h }}>
                Why Businesses
                <br />
                <em style={{ fontStyle: "italic" }}>Choose NIXRIX</em>
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  { icon: "🇬🇧", title: "UK registered and UK based", body: "Registered in England and Wales. Based in Leeds. We know your market and your timezone." },
                  { icon: "⚡", title: "Fast delivery", body: "Most projects are live significantly faster than any other agency will quote you." },
                  { icon: "🔗", title: "No migration required", body: "We build on top of your existing tools. Nothing gets disrupted. Nothing gets switched out." },
                  { icon: "💬", title: "Direct founder access", body: "You speak to the founders throughout. Not an account manager reading notes." },
                  { icon: "📊", title: "Transparent named packages", body: "Clear scope. Clear price. No vague proposals and no hidden extras." },
                  { icon: "🏠", title: "Letting agency specialists", body: "Over 15,000 UK letting agencies. We built a dedicated package specifically for them." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 rounded-xl border border-[#1A1208]/8 bg-white p-4">
                    <span className="mt-0.5 text-xl leading-none">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{item.title}</p>
                      <p className="text-xs font-light text-[#1A1208]/60" style={{ fontFamily: F.b }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=640&fit=crop"
                  alt="UK letting agency and SME automation team Leeds"
                  className="h-[480px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/68 via-[#1A1208]/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl border border-white/14 bg-[#1A1208]/72 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-normal text-[#E8230A]/28" style={{ fontFamily: F.h }}>15,000+</p>
                    <p className="mt-1 text-base font-semibold text-white" style={{ fontFamily: F.b }}>UK Letting Agencies</p>
                    <p className="mt-1 text-xs font-light text-white/58" style={{ fontFamily: F.b }}>Our primary niche. The Agency Smart Pack was built specifically for them.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — dark ─────────────────────────────────────────────────── */}
      <section aria-label="Contact NIXRIX" className="relative overflow-hidden bg-[#1A1208] py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, #FAF5EC 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="pointer-events-none absolute -right-32 -top-20 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,35,10,0.12) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.09, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Work With Us</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>
              Ready to Build Something
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle: "italic" }}>That Actually Works?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily: F.b }}>
              Book a free 30 minute discovery call. We look at your current setup and tell you exactly
              what to fix first. No pitch. No pressure.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]" style={{ fontFamily: F.b }}>
                    Book Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5" style={{ fontFamily: F.b }}>
                    View Our Packages
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
