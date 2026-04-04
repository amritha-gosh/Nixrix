import { useState } from "react";
import { Link }      from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone, FileText, Wrench, Zap, ChevronDown } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion, AnimatePresence } from "motion/react";
import { Tag, HoverCard, ReviewRibbon, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

const steps = [
  { n:"01", icon:<Phone className="h-6 w-6"/>, title:"Free Discovery Call", sub:"30 minutes. No pitch. Just honest feedback.", body:"We start with a free call where we look at your current website, tools, and workflow together. You tell us what is slowing you down. We ask the right questions.", details:["Review your current website and lead capture setup","Understand your existing tools","Identify the biggest time and lead gaps","Understand your team and how you currently work","No obligation, no sales pressure"], img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop" },
  { n:"02", icon:<FileText className="h-6 w-6"/>, title:"Clear Written Recommendation", sub:"Plain English. Exactly what to fix first.", body:"After the call, you receive a written summary of what we found and which package we recommend. You get a clear scope and a clear delivery expectation before anything starts.", details:["Written summary of what is costing you time and leads","Specific package recommendation with rationale","Clear scope confirmed in writing","Delivery expectation agreed upfront","No surprises, no scope creep"], img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop" },
  { n:"03", icon:<Wrench className="h-6 w-6"/>, title:"We Build It", sub:"Fast delivery. Your tools stay. Nothing gets disrupted.", body:"Once you approve the proposal, we build. We work with the tools you already have. No migration required. You get a review period before anything goes live.", details:["We build on top of what you already use","No platform migrations or tool switches","Regular progress updates throughout","Review period after delivery","Any amends addressed before sign-off"], img:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop" },
  { n:"04", icon:<Zap className="h-6 w-6"/>, title:"You Run Smarter", sub:"Live system. Leads captured. Work automated.", body:"Your system goes live and starts working in the background. Leads get captured and followed up automatically. You can see exactly what is happening without chasing anyone for updates.", details:["Full handover with documentation and training","Team onboarding call where relevant","All automations tested and running","Analytics and tracking verified","Optional monthly support retainer available"], img:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop" },
];

const faqs = [
  { q:"Do I have to change my existing tools?", a:"No. That is the core of our no-migration promise. We connect to and automate around the tools you already use. Nothing gets switched out." },
  { q:"How fast is delivery?", a:"Quick Win packages are typically live within a few days of sign-off. Signature packages take a few days to a couple of weeks depending on scope. We confirm the delivery expectation in writing before anything starts." },
  { q:"What if I am not sure which package I need?", a:"Book a free discovery call. That is exactly what it is for. We look at your situation and tell you honestly what fits. There is no obligation to proceed." },
  { q:"Can I start small and add more later?", a:"Absolutely. Many clients start with a Quick Win package and add Signature packages as they grow. Everything we build is designed to connect together." },
  { q:"Do you offer ongoing support after delivery?", a:"Yes. Our NIXRIX Grow retainers (Lite, Standard and Pro) provide ongoing support, updates and optimisation. We can discuss these after delivery." },
  { q:"What information do you need from me to get started?", a:"After the discovery call and proposal approval, we typically need access credentials for your existing tools, your brand assets, and around two to three hours of your time across the project. We handle everything else." },
  { q:"Will there be any disruption to my current business?", a:"No. Our no-migration approach means we build alongside your existing systems. Your team keeps working as normal throughout. There is no downtime and no disruption." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white"
      animate={{ borderColor: open ? "#E8230A" : "rgba(26,18,8,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-6 py-4 text-left">
        <span className="pr-4 text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
          <ChevronDown className="h-4 w-4 text-[#E8230A]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }} transition={{ duration:0.24, ease:"easeInOut" }} className="overflow-hidden">
            <div className="border-t border-[#1A1208]/8 px-6 pb-5 pt-4">
              <p className="text-sm font-light leading-7 text-[#1A1208]/68" style={{ fontFamily: F.b }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HowWeWorkPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="How We Work | NIXRIX UK Business Automation — 4 Step Process" description="NIXRIX's simple 4-step process: free discovery call, clear recommendation, fast build, live system. From first conversation to running smarter." keywords="how NIXRIX works, UK automation delivery process, business automation no disruption, no migration CRM setup UK" schemaType="organization" canonicalPath="/how-we-work" />
      <ChatbotWidget />

      {/* HERO */}
      <section className="relative overflow-hidden py-28 lg:py-32" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        <RedOrb className="-right-20 -top-20" size={440} />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/55" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li><li>/</li>
              <li aria-current="page" className="text-[#E8230A]">How We Work</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}><Tag>Our Process</Tag></motion.div>
          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }} className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: F.h }}>
            From First Call to<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Live System.</em> Fast.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/68" style={{ fontFamily: F.b }}>
            A simple four step process. Transparent at every stage. No long projects, no surprise costs, no disruption to how your team currently works.
          </motion.p>
        </div>
      </section>

      {/* STEPS — alternating layout — s1 */}
      <section className="py-24" style={{ background: BG.s1 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={0.04}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${i%2!==0 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <motion.div whileHover={{ x: i%2===0 ? 4 : -4 }} transition={{ type:"spring", stiffness:300 }}
                    className="rounded-2xl border border-[#1A1208]/10 bg-white p-8 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8230A] text-white shadow-[0_6px_18px_rgba(232,35,10,0.30)]">{step.icon}</div>
                      <span className="text-5xl font-normal text-[#E8230A]/12" style={{ fontFamily: F.h }}>{step.n}</span>
                    </div>
                    <h3 className="mb-1 text-2xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>{step.title}</h3>
                    <p className="mb-4 text-sm font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>{step.sub}</p>
                    <p className="mb-6 text-sm font-light leading-7 text-[#1A1208]/68" style={{ fontFamily: F.b }}>{step.body}</p>
                    <div className="space-y-2 border-t border-[#1A1208]/8 pt-5">
                      {step.details.map((d, di) => (
                        <motion.div key={di} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:di*0.07 }} className="flex items-center gap-2 text-sm text-[#1A1208]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                          <span className="font-medium" style={{ fontFamily: F.b }}>{d}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <ScrollReveal direction={i%2===0 ? "right" : "left"} delay={0.15}>
                    <HoverCard className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8">
                      <img src={step.img} alt={step.title} className="h-72 w-full object-cover lg:h-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/45 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8230A] text-xl font-bold text-white shadow-[0_6px_20px_rgba(232,35,10,0.38)]">{i+1}</div>
                    </HoverCard>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NO MIGRATION CALLOUT — s2 */}
      <section className="relative overflow-hidden py-18 pb-20 pt-20" style={{ background: BG.s2 }}>
        <DotPattern opacity={0.025} />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <Tag>Our Core Principle</Tag>
            <h2 className="text-3xl font-normal text-[#1A1208] md:text-4xl" style={{ fontFamily: F.h }}>We Add. We Never Replace.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily: F.b }}>Throughout every step of the process, we work with your existing tools. Nothing gets ripped out. Nothing gets disrupted. Your team keeps their workflow. It just becomes faster, smarter, and more automatic.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["No forced platform migrations","No downtime","Works alongside existing tools","Your workflow stays the same"].map((tag,i)=>(
                <span key={i} className="rounded-full border border-[#E8230A]/20 bg-white px-4 py-2 text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>{tag}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ — s3 */}
      <section className="py-24" style={{ background: BG.s3 }}>
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <Tag>Common Questions</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>Questions We Get Asked</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i*0.06}>
                <FaqItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS RIBBON */}
      <section style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 text-center">
          <ScrollReveal><Tag>What Clients Say</Tag><h2 className="text-3xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>Trusted by UK Businesses</h2></ScrollReveal>
        </div>
        <ReviewRibbon bg={BG.s2} /><div className="pb-14" style={{ background: BG.s2 }} />
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <DotPattern opacity={0.05} /><RedOrb className="-right-24 -top-16" size={420} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Ready to Start</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>Step One Takes<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>30 Minutes.</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily: F.b }}>Book a free discovery call. We look at your current setup and tell you exactly what to fix first. No pitch, no pressure.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]" style={{ fontFamily: F.b }}>Book Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Button></motion.div></Link>
              <Link to="/services"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5" style={{ fontFamily: F.b }}>View All Packages</Button></motion.div></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
