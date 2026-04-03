import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Phone, FileText, Wrench, Zap, ChevronDown } from "lucide-react";
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

const steps = [
  {
    number:"01",
    icon:<Phone className="h-6 w-6" />,
    title:"Free Discovery Call",
    subtitle:"30 minutes. No pitch. Just honest feedback.",
    body:"We start with a free 30 minute call where we look at your current website, tools, and workflow together. You tell us what is slowing you down. We ask the right questions.",
    details:[
      "Review your current website and lead capture setup",
      "Understand your existing tools (email, CRM, spreadsheets)",
      "Identify the biggest time and lead gaps",
      "Discuss your team size and how you currently work",
      "No obligation, no sales pressure",
    ],
    timeline:"30 minutes",
    image:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
  },
  {
    number:"02",
    icon:<FileText className="h-6 w-6" />,
    title:"Clear Written Recommendation",
    subtitle:"Plain English. No jargon. Exactly what to fix first.",
    body:"After the call, you receive a written summary of what we found and which package we recommend. You get a clear scope, a clear price, and a clear delivery timeline before anything starts.",
    details:[
      "Written summary of what is costing you time and leads",
      "Specific package recommendation with rationale",
      "Clear price confirmed in writing",
      "Delivery timeline agreed upfront",
      "No surprises, no scope creep",
    ],
    timeline:"Within 24 hours of the call",
    image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
  {
    number:"03",
    icon:<Wrench className="h-6 w-6" />,
    title:"We Build It",
    subtitle:"Fast delivery. Your tools stay. Nothing gets disrupted.",
    body:"Once you approve the proposal, we build. We work with the tools you already have — no migration required. You get a review period before anything goes live.",
    details:[
      "We build on top of what you already use",
      "No platform migrations or tool switches",
      "Regular progress updates throughout",
      "5 day review period after delivery",
      "Any amends addressed before sign-off",
    ],
    timeline:"5 to 10 days from sign-off",
    image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
  },
  {
    number:"04",
    icon:<Zap className="h-6 w-6" />,
    title:"You Run Smarter",
    subtitle:"Live system. Leads captured. Work automated. Data visible.",
    body:"Your system goes live and starts working in the background. Leads get captured and followed up automatically. You can see exactly what is happening in your business without chasing anyone for updates.",
    details:[
      "Full handover with documentation and training",
      "Team onboarding call where relevant",
      "All automations tested and running",
      "Analytics and tracking verified",
      "Optional monthly support retainer available",
    ],
    timeline:"Ongoing after launch",
    image:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
  },
];

const faqs = [
  { q:"Do I have to change my existing tools?", a:"No. That is the core of our no-migration promise. We connect to and automate around whatever you already use. Nothing gets switched out." },
  { q:"How long does a typical project take?", a:"Quick Win packages are typically live within 5 days of sign-off. Signature packages take 7 to 14 days depending on scope. We confirm the timeline in writing before anything starts." },
  { q:"What if I am not sure which package I need?", a:"Book a free discovery call. That is exactly what it is for. We look at your situation and tell you honestly what fits. There is no obligation to proceed." },
  { q:"Can I start small and add more later?", a:"Absolutely. Many clients start with a Quick Win package and add Signature packages as they grow. Everything we build is designed to connect together." },
  { q:"Do you offer ongoing support after delivery?", a:"Yes. Our NIXRIX Grow retainers (£197, £397 and £797 per month) provide ongoing support, updates and optimisation. We can discuss these after delivery." },
  { q:"What information do you need from me to start?", a:"After the discovery call and proposal approval, we typically need access credentials for your existing tools, your brand assets, and around 2 to 3 hours of your time across the project. We handle everything else." },
];

export function HowWeWorkPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily:F.b, background:"#FDFAF5" }}>
      <SEOHead
        title="How We Work | NIXRIX UK Business Automation"
        description="NIXRIX's 4 step process: free discovery call, clear recommendation, fast build, live system. From first call to running smarter in 5 to 10 days."
        keywords="how NIXRIX works, UK automation process, business automation delivery, no migration policy, NIXRIX Leeds"
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
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Process</span>
            <div className="h-px w-7 bg-[#E8230A]" />
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.75rem]" style={{ fontFamily:F.h }}>
            From First Call to
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Live System</em> in Days.
          </motion.h1>

          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
            A simple four step process. Transparent at every stage. No long projects, no surprise costs,
            no disruption to how your team currently works.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.5 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E8230A]/25 bg-white/80 px-5 py-2.5 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-[#E8230A]" />
            <span className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>
              Most projects live in 5 to 10 days
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={0.05}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}>

                  {/* Content */}
                  <motion.div
                    whileHover={{ x: i % 2 === 0 ? 4 : -4 }}
                    transition={{ type:"spring", stiffness:300 }}
                    className="rounded-2xl border border-[#1A1208]/10 bg-white p-8 shadow-[0_4px_20px_rgba(26,18,8,0.06)]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8230A] text-white shadow-[0_6px_18px_rgba(232,35,10,0.30)]">
                          {step.icon}
                        </div>
                        <span className="text-5xl font-normal text-[#E8230A]/12" style={{ fontFamily:F.h }}>
                          {step.number}
                        </span>
                      </div>
                      <div className="rounded-full bg-[#E8230A]/10 px-3 py-1.5 text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>
                        {step.timeline}
                      </div>
                    </div>

                    <h3 className="mb-1 text-2xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{step.title}</h3>
                    <p className="mb-4 text-sm font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>{step.subtitle}</p>
                    <p className="mb-6 text-sm font-light leading-7 text-[#1A1208]/70" style={{ fontFamily:F.b }}>{step.body}</p>

                    <div className="space-y-2 border-t border-[#1A1208]/8 pt-5">
                      {step.details.map((d, di) => (
                        <motion.div key={di}
                          initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }}
                          viewport={{ once:true }} transition={{ delay:di*0.07 }}
                          className="flex items-center gap-2 text-sm text-[#1A1208]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                          <span className="font-medium" style={{ fontFamily:F.b }}>{d}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Image */}
                  <ScrollReveal direction={i % 2 === 0 ? "right" : "left"} delay={0.15}>
                    <motion.div whileHover={{ scale:1.01 }} transition={{ type:"spring", stiffness:200 }}
                      className="relative overflow-hidden rounded-2xl">
                      <img src={step.image} alt={step.title} className="h-72 w-full object-cover lg:h-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/45 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8230A] text-xl font-bold text-white shadow-[0_6px_20px_rgba(232,35,10,0.38)]">
                        {i + 1}
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NO MIGRATION CALLOUT ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background:"#EDE4D4" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"36px 36px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Core Principle</span>
              <div className="h-px w-7 bg-[#E8230A]" />
            </div>
            <h2 className="text-3xl font-normal text-[#1A1208] md:text-4xl" style={{ fontFamily:F.h }}>
              We Add. We Never Replace.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily:F.b }}>
              Throughout every step of the process, we work with your existing tools — email, spreadsheets,
              CRM, or whatever your team uses today. Nothing gets ripped out. Nothing gets disrupted.
              Your team keeps their workflow. It just becomes faster, smarter, and more automatic.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "No forced platform migrations",
                "No months of downtime",
                "Works alongside existing tools",
                "5 to 10 day typical delivery",
              ].map((tag, i) => (
                <span key={i} className="rounded-full border border-[#E8230A]/20 bg-white px-4 py-2 text-sm font-medium text-[#1A1208]" style={{ fontFamily:F.b }}>
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background:"#F5EDE0" }}>
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Common Questions</span>
              <div className="h-px w-7 bg-[#E8230A]" />
            </div>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>
              Questions We Get Asked
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <FaqItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"radial-gradient(circle, #FDFAF5 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
        <motion.div className="pointer-events-none absolute -right-24 -top-16 h-[420px] w-[420px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A1C 0%, transparent 68%)" }}
          animate={{ scale:[1,1.09,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-7 bg-[#E8230A]/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]/85" style={{ fontFamily:F.b }}>Ready to Start</span>
              <div className="h-px w-7 bg-[#E8230A]/70" />
            </div>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily:F.h }}>
              Step One Takes
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>30 Minutes.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>
              Book a free discovery call. We look at your current setup and tell you exactly what to fix first.
              No pitch, no pressure.
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
                    View All Packages
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

// ── Inline FAQ accordion ──────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white"
      animate={{ borderColor: open ? "#E8230A" : "rgba(26,18,8,0.1)" }}
      transition={{ duration:0.2 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="pr-4 text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }} className="shrink-0">
          <ChevronDown className="h-4 w-4 text-[#E8230A]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.25, ease:"easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#1A1208]/8 px-6 pb-5 pt-4">
              <p className="text-sm font-light leading-7 text-[#1A1208]/70" style={{ fontFamily:F.b }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

