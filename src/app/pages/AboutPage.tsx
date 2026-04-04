import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Clock, Users, Heart, Target, TrendingUp } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";
import { Tag, HoverCard, ReviewRibbon, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

const values = [
  { icon:<Shield className="h-6 w-6"/>, title:"No Migration, Ever", body:"We add to what you already have. Platforms stay. Tools stay. What changes is the ceiling on what you can achieve with them." },
  { icon:<Clock className="h-6 w-6"/>, title:"Delivered While It Still Matters", body:"Every week of delay is a week of missed leads. We move fast because we understand the real cost of waiting." },
  { icon:<Target className="h-6 w-6"/>, title:"Honest Above All Else", body:"We tell you what you actually need. If a smaller package solves your problem, we say so. Long-term trust matters more." },
  { icon:<Heart className="h-6 w-6"/>, title:"Built for UK Businesses", body:"A UK company building for UK businesses. We understand the market, the pace, and what your clients actually expect." },
  { icon:<TrendingUp className="h-6 w-6"/>, title:"Results, Not Reports", body:"We measure success by leads captured, hours saved, and decisions made with confidence." },
  { icon:<Users className="h-6 w-6"/>, title:"You Work With the People Building It", body:"No account managers. No handoffs. The founders are involved in every project from first call to delivery." },
];

export function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="About NIXRIX | UK Business Automation Company — Leeds" description="NIXRIX is a Leeds-based UK business automation company helping SMEs replace manual work with smart websites, CRM systems, automation and live dashboards. No migration required." keywords="about NIXRIX, UK business automation company Leeds, UK SME automation, no migration automation, HubSpot CRM Leeds, letting agency automation UK" schemaType="organization" canonicalPath="/about" />
      <ChatbotWidget />

      {/* HERO — lightest */}
      <section className="relative overflow-hidden py-28 lg:py-36" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        <RedOrb className="-right-24 -top-24" size={480} />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/60" style={{ fontFamily:F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li><li>/</li>
              <li aria-current="page" className="text-[#E8230A]">About</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}>
            <Tag>About NIXRIX</Tag>
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }} className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily:F.h }}>
            We Help UK Small Businesses<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Stop Losing Time</em><br />and Start Running Smarter.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
            NIXRIX is a Leeds-based UK business automation company, registered in England and Wales. We help UK SMEs and letting agencies replace repetitive manual work with smart websites, CRM systems, automation workflows, and live data dashboards — without changing a single tool they already use.
          </motion.p>
        </div>
      </section>

      {/* FOUNDER STORY — s1 */}
      <section className="py-24" style={{ background: BG.s1 }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="mb-5 flex items-center gap-3"><div className="h-px w-7 bg-[#E8230A]"/><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Story</span></div>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>Built From Frustration.<br /><em style={{ fontStyle:"italic" }}>Driven By What's Possible.</em></h2>
              <div className="mt-6 space-y-4">
                <p className="text-lg font-light leading-[1.85] text-[#1A1208]/72" style={{ fontFamily:F.b }}>NIXRIX started with a simple observation: the businesses doing the most meaningful work — the local letting agent building community, the accountant who knows every client by name, the small consultancy punching above its weight — were being held back by systems that never quite worked together.</p>
                <p className="text-base font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily:F.b }}>Leads slipping through because nobody saw the enquiry in time. Decisions made on gut feeling because the data was buried in three different spreadsheets. Entire afternoons lost to tasks that should have been handled automatically before lunch.</p>
                <p className="text-base font-light leading-[1.85] text-[#1A1208]/65" style={{ fontFamily:F.b }}>We knew the technology existed to fix all of it. The problem was that most companies offering it wanted to replace everything the business already had. New platform. New tools. Six months of disruption. A price tag that only made sense for companies ten times the size.</p>
                <p className="text-base font-semibold leading-[1.85] text-[#1A1208]" style={{ fontFamily:F.b }}>So we built NIXRIX around a different philosophy: add intelligence to what already exists. Make it work. Make it fast. Make it honest.</p>
              </div>
              <div className="mt-8 space-y-3">
                {["Make advanced automation accessible to every UK SME","Deliver results in days, not months","Be the honest partner, not the agency that oversells","Specialise deeply in UK letting agencies first"].map((p,i)=>(
                  <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="text-sm font-medium text-[#1A1208]" style={{ fontFamily:F.b }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <HoverCard className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=640&fit=crop" alt="NIXRIX founders working on UK business automation" className="h-[440px] w-full object-cover lg:h-[520px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/68 via-[#1A1208]/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl border border-white/14 bg-[#1A1208]/72 p-5 backdrop-blur-sm">
                    <p className="text-sm font-light leading-6 text-white/82" style={{ fontFamily:F.b, fontStyle:"italic" }}>"The businesses that are going to win the next five years are not necessarily the biggest ones. They are the ones running smarter — with better systems, better data, and less time lost to work that should already be automatic."</p>
                    <p className="mt-3 text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>The Founders, NIXRIX — Leeds, 2025</p>
                  </div>
                </div>
              </HoverCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MISSION/VISION — s2 */}
      <section className="py-24" style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>Mission and Vision</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>What We Are Building Toward</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>A UK where no small business owner spends their afternoon doing what a system should do.</p>
          </ScrollReveal>
          <div className="grid gap-7 sm:grid-cols-3">
            {[
              { img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop", label:"Mission", title:"Every Lead Gets Followed Up", body:"Automated CRM systems that capture every enquiry and respond before a competitor does." },
              { img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop", label:"Vision", title:"Every Website Earns Its Keep", body:"A business website that generates enquiries consistently, connected, conversion-focused, and alive with data." },
              { img:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=700&h=450&fit=crop", label:"Purpose", title:"Every Decision Backed by Data", body:"Live dashboards showing business owners exactly what is working and what needs attention — in plain English." },
            ].map((card,i)=>(
              <ScrollReveal key={i} delay={i*0.12}>
                <HoverCard className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white">
                  <div className="h-44 overflow-hidden"><motion.img src={card.img} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-6">
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily:F.b }}>{card.label}</span>
                    <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{card.title}</h3>
                    <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{card.body}</p>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — s3 */}
      <section className="py-24" style={{ background: BG.s3 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>Our Values</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>What We Stand For</h2>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v,i)=>(
              <ScrollReveal key={i} delay={i*0.07}>
                <HoverCard className="rounded-2xl border border-[#1A1208]/10 bg-white p-7">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A]/10 text-[#E8230A]">{v.icon}</div>
                  <h3 className="mb-2 text-lg font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{v.title}</h3>
                  <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{v.body}</p>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS RIBBON */}
      <section style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 text-center">
          <ScrollReveal><Tag>What Clients Say</Tag><h2 className="text-3xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>Trusted by UK Businesses</h2></ScrollReveal>
        </div>
        <ReviewRibbon bg={BG.s2} /><div className="pb-14" style={{ background:BG.s2 }} />
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <DotPattern opacity={0.05} /><RedOrb className="-right-32 -top-20" size={500} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Work With Us</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily:F.h }}>Ready to Build Something<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>That Actually Works?</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>Book a free 30 minute discovery call. We look at your current setup and tell you exactly what to fix first. No pitch. No pressure.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]" style={{ fontFamily:F.b }}>Book Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Button></motion.div></Link>
              <Link to="/services"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5" style={{ fontFamily:F.b }}>View Our Packages</Button></motion.div></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
