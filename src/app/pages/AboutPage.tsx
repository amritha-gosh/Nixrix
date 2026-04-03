/**
 * NIXRIX — AboutPage.tsx
 * Fonts: Playfair Display (headings) + Plus Jakarta Sans (body)
 * Palette: cream backgrounds, red accents, ink dark, no teal
 */

import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Zap, Shield, Clock,
  Users, Heart, Target, TrendingUp,
} from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";

// ── Font injection ────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const id = "nixrix-gfonts";
  if (!document.getElementById(id)) {
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  }
}

const F = {
  h: "'Playfair Display', Georgia, serif",
  b: "'Plus Jakarta Sans', system-ui, sans-serif",
};


// ── Values ────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "No Migration, Ever",
    body: "We add to what you already have. We never force you to switch platforms, migrate data or disrupt your team. Your tools stay. They just get smarter.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Speed That Respects Your Time",
    body: "Most of our projects are live in 5 to 10 days. We move fast because we know how much every week of delay costs a small business.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Honest Recommendations",
    body: "We tell you what you actually need, not what costs the most. If a Quick Win package solves your problem, we say so.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "UK Businesses First",
    body: "We are a UK company building for UK businesses. We understand your market, your timezone, and what your clients expect.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Results Over Activity",
    body: "We measure success by leads captured, time saved, and decisions made faster. Not by pages delivered or hours logged.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Small Team, Full Attention",
    body: "You work directly with the founders and our lead developer. No juniors, no handoffs to a different team after the call.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b, background: "#FDFAF5" }}>
      <SEOHead
        title="About NIXRIX | UK Business Automation Company, Leeds"
        description="NIXRIX is a Leeds-based UK startup helping small businesses replace manual work with automation, smart websites, CRM and live dashboards. Meet the team."
        keywords="about NIXRIX, UK business automation company, Leeds automation startup, NIXRIX team, no migration policy"
      />
      <ChatbotWidget />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{ background: "linear-gradient(145deg, #EDD8BB 0%, #F0E2C8 40%, #F5EDE0 100%)" }}
      >
        {/* Subtle dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"38px 38px" }} />
        {/* Red glow */}
        <motion.div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A14 0%, transparent 68%)" }}
          animate={{ scale:[1,1.1,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
            className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#E8230A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily:F.b }}>About NIXRIX</span>
            <div className="h-px w-8 bg-[#E8230A]" />
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-6xl" style={{ fontFamily:F.h }}>
            We Help UK Small Businesses
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Stop Losing Time</em> and Start
            <br />
            Running Smarter.
          </motion.h1>

          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
            NIXRIX is a Leeds-based digital systems company registered in England and Wales. We were founded
            in 2025 with one belief: small businesses should have access to the same automation, CRM, and
            dashboard tools that large businesses take for granted — without the cost, the complexity, or
            the months of disruption.
          </motion.p>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-7 bg-[#E8230A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Mission</span>
              </div>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>
                Add Intelligence to
                <br />
                <em style={{ fontStyle:"italic" }}>What You Already Have.</em>
              </h2>
              <p className="mt-5 text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
                NIXRIX exists to make advanced digital tools accessible to every UK small business. Not just
                the ones with large IT budgets or in-house developers.
              </p>
              <p className="mt-4 text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
                We do that through a single principle: we never replace the tools and systems you already use.
                We connect to them, automate around them, and build dashboards on top of them. Your team keeps
                working the way they work. It just becomes faster, smarter, and more visible.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Make automation accessible to businesses without tech teams",
                  "Deliver fast, without months of disruption",
                  "Be the honest partner, not the agency that oversells",
                  "Focus on UK SMEs and UK letting agencies first",
                ].map((p, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay:i*0.08 }}
                    className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="text-sm font-medium text-[#1A1208]" style={{ fontFamily:F.b }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <motion.div whileHover={{ scale:1.01 }} transition={{ type:"spring", stiffness:200 }}
                className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=640&fit=crop"
                  alt="NIXRIX team working"
                  className="h-[420px] w-full object-cover lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl border border-white/20 bg-[#1A1208]/70 p-5 backdrop-blur-sm">
                    <p className="text-sm font-light leading-6 text-white/80" style={{ fontFamily:F.b }}>
                      "We built NIXRIX because we kept seeing the same problem: great UK businesses held back by
                      manual work, slow follow-ups, and no real visibility on performance. We knew there was a
                      smarter way."
                    </p>
                    <p className="mt-3 text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>
                      Basil Benoy &amp; Amritha Gosh — Co-Founders, NIXRIX
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background:"#F5EDE0" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:"linear-gradient(#1A1208 1px,transparent 1px),linear-gradient(90deg,#1A1208 1px,transparent 1px)", backgroundSize:"56px 56px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Vision</span>
              <div className="h-px w-7 bg-[#E8230A]" />
            </div>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>
              Every UK Small Business Running Smarter.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>
              We envision a UK where no small business owner is stuck copying data between spreadsheets, chasing
              leads manually, or making decisions without data. That future is already possible. We just help
              businesses get there.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop",
                title:"Every Lead Gets Followed Up",
                body:"Automated CRM systems that capture, assign and follow up every enquiry without anyone having to remember to do it.",
              },
              {
                img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop",
                title:"Every Website Earns Its Keep",
                body:"Websites that are not just online brochures but active lead generation machines, connected to the business behind them.",
              },
              {
                img:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=700&h=450&fit=crop",
                title:"Every Decision Backed by Data",
                body:"Live dashboards that show business owners exactly what is working, what is not, and what needs attention right now.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i*0.12}>
                <motion.div whileHover={{ y:-7, borderColor:"#E8230A", boxShadow:"0 20px 52px rgba(232,35,10,0.13)" }}
                  transition={{ type:"spring", stiffness:260 }}
                  className="overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white">
                  <div className="h-44 overflow-hidden">
                    <motion.img src={card.img} alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{card.title}</h3>
                    <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{card.body}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Values</span>
              <div className="h-px w-7 bg-[#E8230A]" />
            </div>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>
              What We Stand For
            </h2>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i*0.08}>
                <motion.div whileHover={{ y:-6, borderColor:"#E8230A", boxShadow:"0 18px 48px rgba(232,35,10,0.11)" }}
                  transition={{ type:"spring", stiffness:260 }}
                  className="rounded-2xl border border-[#1A1208]/10 bg-white p-7">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A]/10 text-[#E8230A]">
                    {v.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{v.title}</h3>
                  <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{v.body}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background:"#EDE4D4" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"36px 36px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>The Team</span>
              <div className="h-px w-7 bg-[#E8230A]" />
            </div>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>
              Small Team. Full Attention.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>
              You work directly with the people building your system. No account managers, no handoffs.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i*0.1}>
                <motion.div whileHover={{ y:-7, borderColor:"#E8230A", boxShadow:"0 20px 52px rgba(232,35,10,0.13)" }}
                  transition={{ type:"spring", stiffness:260 }}
                  className="overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/55 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded-full bg-[#E8230A]/90 px-3 py-1 text-[10px] font-semibold text-white" style={{ fontFamily:F.b }}>
                        {member.days}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-0.5 text-base font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>{member.name}</h3>
                    <p className="mb-3 text-xs font-medium text-[#E8230A]" style={{ fontFamily:F.b }}>{member.role}</p>
                    <p className="text-xs font-light leading-6 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{member.bio}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NIXRIX ───────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background:"#F5EDE0" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-7 bg-[#E8230A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Why Choose Us</span>
              </div>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208]" style={{ fontFamily:F.h }}>
                Why Businesses
                <br />
                <em style={{ fontStyle:"italic" }}>Choose NIXRIX</em>
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  { icon:"🇬🇧", title:"UK registered and UK based",    body:"Registered in England and Wales. Based in Leeds. We know your market." },
                  { icon:"⚡", title:"5 to 10 day delivery",           body:"Most projects are live faster than any other agency will quote." },
                  { icon:"🔗", title:"No migration required",          body:"We build on top of your existing tools. Nothing gets disrupted." },
                  { icon:"💬", title:"Direct founder access",          body:"You speak to Basil and Amritha throughout. Not an account manager." },
                  { icon:"📊", title:"Transparent named packages",     body:"Clear scope. Clear price. No vague proposals or hidden extras." },
                  { icon:"🏠", title:"Letting agency specialists",     body:"15,000+ UK letting agencies. We built a dedicated package just for them." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay:i*0.07 }}
                    className="flex items-start gap-4 rounded-xl border border-[#1A1208]/8 bg-white p-4">
                    <span className="mt-0.5 text-xl leading-none">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>{item.title}</p>
                      <p className="text-xs font-light text-[#1A1208]/60" style={{ fontFamily:F.b }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=640&fit=crop"
                  alt="NIXRIX team collaboration"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/65 via-[#1A1208]/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl border border-white/15 bg-[#1A1208]/75 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-normal text-[#E8230A]/30" style={{ fontFamily:F.h }}>15,000+</p>
                    <p className="mt-1 text-base font-semibold text-white" style={{ fontFamily:F.b }}>UK Letting Agencies</p>
                    <p className="mt-1 text-xs font-light text-white/60" style={{ fontFamily:F.b }}>Our primary niche. The Agency Smart Pack was built specifically for them.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"radial-gradient(circle, #FDFAF5 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
        <motion.div className="pointer-events-none absolute -right-32 -top-20 h-[500px] w-[500px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A1C 0%, transparent 68%)" }}
          animate={{ scale:[1,1.09,1] }} transition={{ duration:16, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]/85" style={{ fontFamily:F.b }}>Work With Us</span>
              <div className="h-px w-7 bg-[#E8230A]/70" />
            </div>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily:F.h }}>
              Ready to Build Something
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>That Actually Works?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>
              Book a free 30 minute discovery call. We will look at your current setup and tell you exactly
              what to fix first. No pitch. No pressure.
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
              <Link to="/services">
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                  <Button size="lg" variant="outline"
                    className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5"
                    style={{ fontFamily:F.b }}>
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
