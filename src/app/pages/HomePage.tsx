import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Zap, Globe, BarChart3, Bot, Settings2, Building2, Clock, Users, ChevronDown, Layers } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";
import { Tag, HoverCard, ReviewRibbon, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

// ── Tool logos ─────────────────────────────────────────────────────────────────
const tools = [
  { name:"HubSpot",  logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><circle cx="16" cy="16" r="6" fill="#FF7A59"/><circle cx="16" cy="7" r="3" fill="#FF7A59"/><circle cx="23" cy="21" r="3" fill="#FF7A59"/><circle cx="9" cy="21" r="3" fill="#FF7A59"/></svg> },
  { name:"Make",     logo:<svg viewBox="0 0 36 24" className="h-7 w-auto" fill="none"><rect x="0" y="4" width="10" height="10" rx="3" fill="#6D00CC"/><rect x="13" y="4" width="10" height="10" rx="3" fill="#9B4DFF"/><rect x="26" y="4" width="10" height="10" rx="3" fill="#C084FC"/></svg> },
  { name:"Power BI", logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="20" width="6" height="10" rx="2" fill="#F2C811"/><rect x="11" y="13" width="6" height="17" rx="2" fill="#F2C811"/><rect x="20" y="6" width="6" height="24" rx="2" fill="#E8A600"/></svg> },
  { name:"Notion",   logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="2" width="28" height="28" rx="6" fill="#1A1208"/><rect x="7" y="8" width="8" height="3" rx="1.5" fill="white"/><rect x="7" y="14" width="18" height="2" rx="1" fill="white" opacity="0.6"/><rect x="7" y="19" width="14" height="2" rx="1" fill="white" opacity="0.6"/></svg> },
  { name:"Analytics",logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="3" y="20" width="6" height="10" rx="3" fill="#F9AB00"/><rect x="13" y="12" width="6" height="18" rx="3" fill="#E37400"/><circle cx="26" cy="8" r="6" fill="#E37400"/><circle cx="26" cy="8" r="3" fill="white"/></svg> },
  { name:"Tally",    logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="2" width="28" height="28" rx="7" fill="#0F0F0F"/><rect x="7" y="9" width="18" height="2.5" rx="1.25" fill="white"/><rect x="7" y="15" width="12" height="2.5" rx="1.25" fill="white" opacity="0.7"/><rect x="7" y="21" width="14" height="2.5" rx="1.25" fill="white" opacity="0.5"/></svg> },
  { name:"Zapier",   logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect width="32" height="32" rx="8" fill="#FF4A00"/><path d="M8 16 L16 8 L24 16 L16 24 Z" fill="white" opacity="0.9"/><circle cx="16" cy="16" r="3" fill="#FF4A00"/></svg> },
  { name:"Netlify",  logo:<svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="#00C7B7"/><circle cx="16" cy="17" r="3" fill="white"/></svg> },
];
const tripled = [...tools,...tools,...tools];

// ── Services (no prices) ───────────────────────────────────────────────────────
const services = [
  { img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop", label:"Quick Win",        name:<><span className="text-[#E8230A]">The Spark</span></>,        nameStr:"The Spark",        desc:"One clean, fast page. Professional presence live in days without waiting months for something simple.", features:["Mobile first","SEO foundations","Contact form","Fast delivery"], tier:"quick" },
  { img:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop", label:"Quick Win",        name:<><span className="text-[#E8230A]">The Magnet</span></>,       nameStr:"The Magnet",       desc:"One page, one goal. Built specifically to turn visitors into enquiries with nothing getting in the way.", features:["Conversion layout","Lead capture","CRM connected","Optimised copy"], tier:"quick" },
  { img:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop", label:"Quick Win",        name:<><span className="text-[#E8230A]">The Connector</span></>,    nameStr:"The Connector",    desc:"HubSpot configured properly so every lead gets tracked, followed up and never falls through a gap again.", features:["Full CRM setup","Pipeline stages","Email templates","Team onboarding"], tier:"quick" },
  { img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", label:"Signature",        name:<><span className="text-[#E8230A]">NIXRIX Launchpad</span></>,  nameStr:"NIXRIX Launchpad",  desc:"A full business website built to generate enquiries from day one. Designed, built and ready to convert.", features:["Multi-page site","SEO throughout","Lead capture","Analytics setup"], tier:"signature" },
  { img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",    label:"Signature",        name:<><span className="text-[#E8230A]">NIXRIX Command</span></>,    nameStr:"NIXRIX Command",    desc:"CRM, automation and a live dashboard working together. Your whole operation connected in one place.", features:["HubSpot CRM","Make.com automation","Live dashboard","Workflow setup"], tier:"signature" },
  { img:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop",    label:"Signature",        name:<><span className="text-[#E8230A]">NIXRIX Intelligence</span></>,nameStr:"NIXRIX Intelligence",desc:"Power BI dashboard showing exactly what is happening in your business, live, in plain English.", features:["Power BI build","Live data","KPI tracking","Plain language"], tier:"signature" },
  { img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop", label:"Signature",        name:<><span className="text-[#E8230A]">NIXRIX Autopilot</span></>,  nameStr:"NIXRIX Autopilot",  desc:"AI handles your document processing and repetitive workflows. The admin that eats your week stops.", features:["Document AI","Workflow automation","Make.com builds","Time savings"], tier:"signature" },
  { img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",    label:"Letting Agencies", name:<><span className="text-[#E8230A]">Agency Smart Pack</span></>, nameStr:"Agency Smart Pack",  desc:"Website, CRM and automation built specifically for UK letting agencies. Everything connected and working.", features:["Agency website","Tenant/landlord CRM","Lead automation","Compliance aware"], tier:"agency" },
];

const tierBg = (t: string) => t==="quick" ? "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/22" : t==="agency" ? "bg-[#1A1208]/8 text-[#1A1208] border-[#1A1208]/15" : "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/22";

export function HomePage() {
  const [filter, setFilter] = useState<"all"|"quick"|"signature"|"agency">("all");
  const filtered = filter==="all" ? services : services.filter(s=>s.tier===filter);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="UK Business Automation and Websites | NIXRIX — Stop Losing Time" description="NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, CRM automation, Power BI dashboards and Make.com workflows. Leeds. No migration." keywords="UK business automation, letting agency automation Leeds, HubSpot CRM setup UK, workflow automation small business, business website Leeds, Power BI dashboard UK" schemaType="organization" canonicalPath="/" />
      <ChatbotWidget />

      {/* ── HERO — lightest cream ─────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        {/* Circuit SVG — right half only */}
        <svg className="pointer-events-none absolute right-0 top-0 h-full w-[58%] opacity-[0.10]" viewBox="0 0 580 800" fill="none" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
          <defs><style>{`.ta{stroke-dasharray:14 7;animation:tD 3.8s linear infinite}.tb{stroke-dasharray:14 7;animation:tDR 5.2s linear infinite}.tc{stroke-dasharray:10 5;animation:tD 6.5s linear infinite}.td{stroke-dasharray:10 5;animation:tDR 4.1s linear infinite}@keyframes tD{from{stroke-dashoffset:360}to{stroke-dashoffset:0}}@keyframes tDR{from{stroke-dashoffset:0}to{stroke-dashoffset:360}}`}</style></defs>
          <line x1="0" y1="110" x2="580" y2="110" stroke="#1A1208" strokeWidth="1" className="ta"/><line x1="0" y1="230" x2="580" y2="230" stroke="#E8230A" strokeWidth="1" className="tb"/><line x1="0" y1="360" x2="580" y2="360" stroke="#1A1208" strokeWidth="1" className="tc" style={{animationDelay:"1s"}}/><line x1="0" y1="490" x2="580" y2="490" stroke="#E8230A" strokeWidth="0.8" className="ta" style={{animationDelay:"1.5s"}}/><line x1="0" y1="620" x2="580" y2="620" stroke="#1A1208" strokeWidth="0.8" className="td"/>
          <line x1="75" y1="0" x2="75" y2="800" stroke="#1A1208" strokeWidth="0.8" className="tb" style={{animationDelay:"0.4s"}}/><line x1="195" y1="0" x2="195" y2="800" stroke="#E8230A" strokeWidth="1" className="tc" style={{animationDelay:"0.9s"}}/><line x1="330" y1="0" x2="330" y2="800" stroke="#1A1208" strokeWidth="0.8" className="ta" style={{animationDelay:"1.7s"}}/><line x1="465" y1="0" x2="465" y2="800" stroke="#E8230A" strokeWidth="0.8" className="td" style={{animationDelay:"0.2s"}}/>
          <path d="M75 110 L195 110 L195 230" stroke="#E8230A" strokeWidth="1.2" fill="none" className="tc"/><path d="M330 230 L465 230 L465 360" stroke="#1A1208" strokeWidth="1.2" fill="none" className="tb" style={{animationDelay:"0.6s"}}/><path d="M75 360 L195 360 L195 490" stroke="#E8230A" strokeWidth="1" fill="none" className="ta" style={{animationDelay:"1.9s"}}/><path d="M330 490 L465 490 L465 620" stroke="#1A1208" strokeWidth="1" fill="none" className="td"/>
          {[[75,110],[195,110],[330,110],[465,110],[75,230],[195,230],[330,230],[465,230],[75,360],[195,360],[330,360],[465,360],[75,490],[195,490],[330,490],[465,490],[75,620],[195,620],[330,620],[465,620]].map(([cx,cy],i)=>(
            <circle key={i} cx={cx} cy={cy} r={i%5===0?3.5:2.2} fill={i%3===0?"#E8230A":"#1A1208"} style={{animation:`nP ${2.2+(i%4)*0.55}s ease-in-out infinite`,animationDelay:`${(i%7)*0.3}s`}} />
          ))}
          <style>{`@keyframes nP{0%,100%{opacity:.3}50%{opacity:.85}}`}</style>
          <circle r="3.5" fill="#E8230A" opacity="0.6"><animateMotion dur="3.8s" repeatCount="indefinite"><mpath href="#sp1"/></animateMotion></circle>
          <circle r="2.5" fill="#1A1208" opacity="0.5"><animateMotion dur="5.2s" repeatCount="indefinite" begin="1.4s"><mpath href="#sp2"/></animateMotion></circle>
          <path id="sp1" d="M0 110 L580 110" fill="none"/><path id="sp2" d="M195 0 L195 800" fill="none"/>
        </svg>
        {/* Left warm mask */}
        <div className="pointer-events-none absolute inset-0" style={{ background:"linear-gradient(to right,#F5EDE0 0%,#F5EDE0 22%,rgba(245,237,224,0.7) 40%,rgba(245,237,224,0.15) 58%,transparent 72%)" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-36 sm:px-6 lg:px-8 lg:pt-44">
          <div className="max-w-[640px]">
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }} className="mb-8 flex items-center gap-3">
              <motion.div className="h-2 w-2 rounded-full bg-[#E8230A]" animate={{ scale:[1,1.7,1], opacity:[0.6,1,0.6] }} transition={{ duration:2.2, repeat:Infinity }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily:F.b }}>UK Business Automation · Leeds</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }} className="text-[3rem] font-normal leading-[1.07] text-[#1A1208] sm:text-[3.75rem] lg:text-[4.5rem]" style={{ fontFamily:F.h }}>
              Stop Losing Time.
              <br />
              <span className="relative inline-block">
                <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Start Running</em>
                <motion.span className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-[#E8230A]/30" initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.65, delay:0.9, ease:"easeOut" }} style={{ transformOrigin:"left" }} />
              </span>
              <br />Smarter.
            </motion.h1>

            <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mt-7 max-w-lg text-lg font-light leading-[1.85] text-[#1A1208]/72" style={{ fontFamily:F.b }}>
              We help UK small businesses replace repetitive manual work with automation, smart websites, CRM systems, and live dashboards.{" "}
              <span className="font-semibold text-[#1A1208]">Without changing a single tool you already use.</span>
            </motion.p>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.52 }} className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact">
                <motion.div whileHover={{ scale:1.025 }} whileTap={{ scale:0.975 }}>
                  <Button size="lg" className="group h-14 rounded-2xl bg-[#E8230A] px-9 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.28)] hover:bg-[#C01A05] hover:shadow-[0_16px_48px_rgba(232,35,10,0.40)]" style={{ fontFamily:F.b }}>
                    Book a Free Discovery Call <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div whileHover={{ scale:1.025 }} whileTap={{ scale:0.975 }}>
                  <Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-[#1A1208]/16 bg-white/80 px-9 text-base font-medium text-[#1A1208] backdrop-blur-sm hover:border-[#E8230A]/30 hover:bg-white" style={{ fontFamily:F.b }}>
                    See Our Services
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.7 }} className="mt-12 space-y-3">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1208]/50" style={{ fontFamily:F.b }}>Sound familiar?</p>
              {["Spending hours every week on tasks a system should handle","A website that looks fine but generates almost no enquiries","Leads slipping away because follow-ups happen too late","No clear picture of how the business is actually performing"].map((p,i)=>(
                <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.35, delay:0.76+i*0.1 }} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                  <span className="text-sm font-medium leading-6 text-[#1A1208]/78" style={{ fontFamily:F.b }}>{p}</span>
                </motion.div>
              ))}
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.25 }} className="pt-1 text-sm font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>You are in the right place.</motion.p>
            </motion.div>
          </div>
        </div>
        <motion.div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2" animate={{ y:[0,9,0] }} transition={{ duration:2.2, repeat:Infinity }}>
          <ChevronDown className="h-6 w-6 text-[#1A1208]/30" />
        </motion.div>
      </section>

      {/* ── TOOL MARQUEE — dark ribbon ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1A1208] py-5">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#1A1208] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#1A1208] to-transparent" />
        <motion.div className="flex items-center gap-0" animate={{ x:["0%","-33.33%"] }} transition={{ duration:32, repeat:Infinity, ease:"linear" }}>
          {tripled.map((t,i)=>(
            <div key={i} className="flex shrink-0 items-center gap-4 px-10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] p-2">{t.logo}</div>
              <span className="whitespace-nowrap text-base font-semibold text-white/55" style={{ fontFamily:F.b }}>{t.name}</span>
              <div className="ml-6 h-5 w-px bg-white/12" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── WHO WE HELP — s1 ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background: BG.s1 }}>
        <DotPattern opacity={0.03} />
        <motion.div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-40" style={{ background:"radial-gradient(circle,rgba(232,35,10,0.12) 0%,transparent 68%)" }} animate={{ scale:[1,1.1,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>Who We Help</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>Does This Sound Like Your Business?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>We work with UK small businesses growing fast but stuck doing too much by hand.</p>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon:<Clock className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", title:"Hours lost every week to tasks a system should be doing", solution:"Automation fixes this" },
              { icon:<Globe className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", title:"A website that looks okay but brings in almost no enquiries", solution:"Conversion rebuild fixes this" },
              { icon:<Users className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", title:"Leads coming in but nobody following up fast enough", solution:"HubSpot CRM fixes this" },
              { icon:<BarChart3 className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop", title:"No real visibility on what part of the business is performing", solution:"Live dashboard fixes this" },
            ].map((card,i)=>(
              <ScrollReveal key={i} delay={i*0.1}>
                <HoverCard className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img src={card.img} alt={card.solution} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/55 to-transparent" />
                    <div className="absolute bottom-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8230A]/15 text-[#E8230A]">{card.icon}</div>
                  </div>
                  <div className="p-5">
                    <p className="mb-4 text-sm font-medium leading-7 text-[#1A1208]/78" style={{ fontFamily:F.h, fontStyle:"italic", fontSize:"0.9rem" }}>"{card.title}"</p>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8230A]/10 px-3 py-1.5 text-xs font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>
                      <CheckCircle2 className="h-3 w-3" />{card.solution}
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — s2 ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: BG.s2 }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(#1A1208 1px,transparent 1px),linear-gradient(90deg,#1A1208 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <Tag>Our Services</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>What We Build for You</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>Named packages. Transparent scopes. Start with one thing and scale from there.</p>
          </ScrollReveal>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {([{key:"all",label:"All Services"},{key:"quick",label:"Quick Wins"},{key:"signature",label:"Signature"},{key:"agency",label:"Letting Agencies"}] as const).map(({key,label})=>(
              <button key={key} onClick={()=>setFilter(key)} className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${filter===key?"border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.24)]":"border-[#1A1208]/14 bg-white text-[#1A1208]/70 hover:border-[#E8230A]/30 hover:text-[#1A1208]"}`} style={{ fontFamily:F.b }}>{label}</button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((s,i)=>(
              <ScrollReveal key={s.nameStr} delay={i*0.07}>
                <HoverCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <div className="relative h-44 overflow-hidden">
                    <motion.img src={s.img} alt={s.nameStr} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 to-transparent" />
                    <div className="absolute bottom-3 left-4"><span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${tierBg(s.tier)}`} style={{ fontFamily:F.b }}>{s.label}</span></div>
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="mb-3 text-xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>{s.name}</h3>
                    <p className="mb-5 flex-grow text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{s.desc}</p>
                    <ul className="mb-6 space-y-2">
                      {s.features.map((f,fi)=>(
                        <li key={fi} className="flex items-center gap-2 text-sm text-[#1A1208]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                          <span className="font-medium" style={{ fontFamily:F.b }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/services">
                      <div className="w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white" style={{ fontFamily:F.b }}>Learn More</div>
                    </Link>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-[#1A1208]/10 bg-white p-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-[#E8230A]"><Layers className="h-4 w-4" /><span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily:F.b }}>Monthly Support</span></div>
              <h3 className="mb-3 text-2xl font-normal text-[#1A1208]" style={{ fontFamily:F.h }}>NIXRIX Grow Retainers</h3>
              <p className="mx-auto mb-6 max-w-xl font-light text-[#1A1208]/65" style={{ fontFamily:F.b }}>Ongoing support, updates and optimisation — for businesses who want continuous progress rather than one-off projects.</p>
              <Link to="/services"><Button className="rounded-xl bg-[#1A1208] px-8 text-white hover:bg-[#E8230A]" style={{ fontFamily:F.b }}>View All Packages <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS — s3 ────────────────────────────────────────── */}
      <section className="py-24" style={{ background: BG.s3 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <Tag>The Process</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>How We Work Together</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily:F.b }}>First call to live system, fast. Transparent at every step.</p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n:"01", title:"Free Discovery Call", body:"30 minutes. We look at your current setup together. You get honest feedback, not a sales pitch.", img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop" },
              { n:"02", title:"Clear Recommendation", body:"A written summary of what is costing you time and leads, and which package fixes it first.", img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
              { n:"03", title:"We Build It", body:"Fast delivery using tools you already have. Nothing gets ripped out. No long projects. No surprises.", img:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" },
              { n:"04", title:"You Run Smarter", body:"Your system runs in the background. Leads captured. Tasks automated. Data visible.", img:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" },
            ].map((step,i)=>(
              <ScrollReveal key={i} delay={i*0.12}>
                <HoverCard className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img src={step.img} alt={step.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/60 to-transparent" />
                    <div className="absolute bottom-3 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8230A] text-xs font-bold text-white shadow-[0_4px_14px_rgba(232,35,10,0.38)]">{i+1}</div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 text-4xl font-normal text-[#E8230A]/12" style={{ fontFamily:F.h }}>{step.n}</div>
                    <h3 className="mb-2 text-base font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>{step.title}</h3>
                    <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily:F.b }}>{step.body}</p>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS RIBBON SECTION ──────────────────────────────────── */}
      <section style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <Tag>Client Reviews</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>What Our Clients Say</h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light text-[#1A1208]/60" style={{ fontFamily:F.b }}>Real feedback from UK business owners who have replaced manual work with NIXRIX systems.</p>
          </ScrollReveal>
        </div>
        <ReviewRibbon bg={BG.s2} />
        <div className="pb-16" />
      </section>

      {/* ── NO MIGRATION ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: BG.s3 }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-3"><div className="h-px w-7 bg-[#E8230A]" /><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8230A]" style={{ fontFamily:F.b }}>Our Promise</span></div>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl" style={{ fontFamily:F.h }}>We Add.<br /><em style={{ fontStyle:"italic" }}>We Never Replace.</em></h2>
              <p className="mt-5 text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>Most agencies want to rip out your tools and replace them with their preferred stack. We don't. We connect to what you already have, layer intelligence on top, and make everything work together without disrupting your operations for a single day.</p>
              <div className="mt-8 space-y-4">
                {["No forced platform migrations","No downtime or disruption","Works alongside your existing email, CRM and spreadsheets","Your team keeps their workflow. It just becomes automatic."].map((p,i)=>(
                  <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8230A]" />
                    <span className="font-medium text-[#1A1208]" style={{ fontFamily:F.b }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <HoverCard className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8">
                <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop" alt="UK letting agency office" className="h-72 w-full object-cover lg:h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/72 via-[#1A1208]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-1 text-5xl font-normal text-[#E8230A]/28" style={{ fontFamily:F.h }}>15,000+</div>
                  <div className="mb-2 text-xl font-semibold text-white" style={{ fontFamily:F.b }}>UK Letting Agencies</div>
                  <p className="mb-5 text-sm font-light leading-6 text-white/65" style={{ fontFamily:F.b }}>Our primary niche. The Agency Smart Pack was built specifically for letting agencies losing landlords to more responsive competitors.</p>
                  <Link to="/contact"><Button className="rounded-xl bg-[#E8230A] text-white shadow-[0_6px_20px_rgba(232,35,10,0.30)] hover:bg-[#C01A05]" style={{ fontFamily:F.b }}>Ask About the Agency Smart Pack <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                </div>
              </HoverCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — dark ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <DotPattern opacity={0.05} />
        <RedOrb className="-right-32 -top-20" size={520} />
        <motion.div className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full" style={{ background:"radial-gradient(circle,rgba(232,35,10,0.10) 0%,transparent 68%)" }} animate={{ scale:[1.05,1,1.05] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Ready When You Are</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily:F.h }}>Let's Fix What's<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Slowing You Down.</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>Book a free 30 minute discovery call. We look at your current setup, find the biggest time and lead gaps, and tell you exactly what to fix. No pitch. No pressure.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]" style={{ fontFamily:F.b }}>Book Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Button></motion.div></Link>
              <Link to="/services"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5" style={{ fontFamily:F.b }}>View Packages</Button></motion.div></Link>
            </div>
            <p className="mt-10 text-sm font-light text-white/28" style={{ fontFamily:F.b }}>NIXRIX LTD · Registered in England and Wales · Leeds, UK · hello@nixrix.com</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
