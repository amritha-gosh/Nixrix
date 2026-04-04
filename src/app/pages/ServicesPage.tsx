import { useState } from "react";
import { Link }      from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Layers, Globe, Bot, Settings2, BarChart3, Zap, Building2, TrendingUp, Palette } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion, AnimatePresence } from "motion/react";
import { Tag, HoverCard, ReviewRibbon, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

type Pkg = {
  icon: React.ReactNode;
  tier: "quick" | "signature" | "agency" | "retainer";
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  bestFor: string;
  image: string;
};

const packages: Pkg[] = [
  { icon:<Globe className="h-5 w-5"/>, tier:"quick", name:"The Spark", tagline:"One clean page. Live in days.", description:"A fast, professional one-page website that puts your business properly online. Mobile first, SEO foundations built in, contact form connected.", includes:["Mobile first responsive design","On-page SEO foundations","Contact form setup","Netlify hosting and domain connection","Fast delivery"], bestFor:"Businesses that need a proper digital presence fast without a complex multi-page site.", image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop" },
  { icon:<Palette className="h-5 w-5"/>, tier:"quick", name:"The Impression", tagline:"Logo and brand kit that means business.", description:"A professional logo, brand colour palette, typography, and brand guidelines delivered as a usable kit your team can apply immediately.", includes:["Primary logo and variations","Brand colour palette","Typography selection","Brand guidelines document","Logo files in all formats"], bestFor:"New businesses or existing businesses whose branding no longer represents what they have become.", image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop" },
  { icon:<Bot className="h-5 w-5"/>, tier:"quick", name:"The Magnet", tagline:"One page. One goal. Maximum leads.", description:"A single conversion-focused landing page built around one action: turning visitors into enquiries. No distractions, no navigation away from the CTA.", includes:["Conversion focused layout","Lead capture form","CRM connection","Optimised headline and copy","A/B ready structure"], bestFor:"Businesses running ads, campaigns, or outreach that need a dedicated high-converting destination.", image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop" },
  { icon:<Settings2 className="h-5 w-5"/>, tier:"quick", name:"The Connector", tagline:"HubSpot set up properly. Every lead tracked.", description:"A full HubSpot CRM setup configured for your business — pipeline stages, contact properties, follow-up tasks, and email templates written and loaded.", includes:["HubSpot account setup","Pipeline stages configured","Contact property setup","Email templates written","Team onboarding call"], bestFor:"Businesses that have leads coming in but no system to track, manage, or follow up consistently.", image:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop" },
  { icon:<Globe className="h-5 w-5"/>, tier:"signature", name:"NIXRIX Launchpad", tagline:"Full business website. Built to convert.", description:"A complete multi-page business website designed, built and delivered ready to generate enquiries. SEO optimised, analytics connected, lead capture working from day one.", includes:["Multi-page responsive website","On-page SEO throughout","Lead capture forms and flows","Google Analytics GA4 setup","Sitemap submitted to Google","Review period after delivery"], bestFor:"Businesses that need a full, credible website that works as a 24/7 sales tool.", image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop" },
  { icon:<Settings2 className="h-5 w-5"/>, tier:"signature", name:"NIXRIX Command", tagline:"CRM, automation and dashboard. One connected system.", description:"Your CRM, automation workflows, and a live KPI dashboard all set up and connected. Every lead tracked, every follow-up automated, every decision informed by data.", includes:["HubSpot CRM full setup","Make.com automation workflows","Live KPI dashboard build","Tally form connected to HubSpot","Email alert automation","Team onboarding and documentation"], bestFor:"Businesses ready to stop doing manual work and start running on connected, automated systems.", image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop" },
  { icon:<TrendingUp className="h-5 w-5"/>, tier:"signature", name:"NIXRIX Momentum", tagline:"Monthly social media and content.", description:"Regular LinkedIn and social content written, scheduled and published in your brand voice. For business owners who know consistency matters but don't have the time.", includes:["Monthly LinkedIn content calendar","Posts written in your brand voice","Scheduling and publishing","Engagement monitoring","Monthly performance summary"], bestFor:"Business owners who want a consistent professional presence on LinkedIn without doing it themselves.", image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop" },
  { icon:<BarChart3 className="h-5 w-5"/>, tier:"signature", name:"NIXRIX Intelligence", tagline:"Power BI dashboard. Live data. Plain English.", description:"A fully built Power BI dashboard connected to your existing data sources, showing exactly what is happening in your business in real time.", includes:["Power BI dashboard full build","Live data source connections","KPI selection and tracking","Plain language insight labels","Automated alerts for key thresholds","Staff training session"], bestFor:"Businesses with data sitting in spreadsheets, CRMs, or tools they cannot easily read.", image:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop" },
  { icon:<Zap className="h-5 w-5"/>, tier:"signature", name:"NIXRIX Autopilot", tagline:"AI document processing. Repetitive work, handled.", description:"AI-powered document processing and workflow automation using Make.com. The admin tasks that eat your week get handled automatically.", includes:["Workflow audit and mapping","Make.com automation build","Document AI processing setup","Integration with existing tools","Testing and handover","Documentation"], bestFor:"Businesses spending significant time on document processing, data entry, or repetitive admin tasks.", image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop" },
  { icon:<Building2 className="h-5 w-5"/>, tier:"agency", name:"Agency Smart Pack", tagline:"Built for UK letting agencies. Everything connected.", description:"A complete digital system built specifically for UK letting agencies — website, CRM, and automation all set up and working together.", includes:["Professional agency website","Tenant and landlord CRM setup","Lead automation from website to HubSpot","Email follow-up templates for lettings","Compliance-aware configuration","Team onboarding and training"], bestFor:"UK letting agencies losing landlord enquiries, spending hours on manual admin, or operating without a connected digital system.", image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop" },
  { icon:<Layers className="h-5 w-5"/>, tier:"retainer", name:"NIXRIX Grow Lite", tagline:"Basic ongoing support and monitoring.", description:"Monthly website updates, uptime monitoring, and priority email support. For businesses that want peace of mind without a large ongoing commitment.", includes:["Monthly website updates","Uptime and performance monitoring","Priority email support","Monthly health check report"], bestFor:"Businesses that want professional ongoing maintenance without intensive support needs.", image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop" },
  { icon:<Layers className="h-5 w-5"/>, tier:"retainer", name:"NIXRIX Grow Standard", tagline:"Ongoing support, optimisation and reporting.", description:"Regular updates, monthly reporting, CRM health checks, and SEO monitoring. For businesses actively using their NIXRIX system and wanting continuous improvement.", includes:["Up to 5 hours monthly support","Monthly performance report","CRM health checks","SEO monitoring","Content updates","Priority response within 4 hours"], bestFor:"Businesses running on NIXRIX systems who want regular optimisation and a reliable support partner.", image:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop" },
  { icon:<Layers className="h-5 w-5"/>, tier:"retainer", name:"NIXRIX Grow Pro", tagline:"Full ongoing support, automation and strategy.", description:"Everything in Standard plus automation improvements, content updates, strategy calls, and priority support. For businesses where NIXRIX is a core operational tool.", includes:["Up to 12 hours monthly support","Monthly strategy call","Automation monitoring and improvement","Content updates and new pages","Proactive suggestions","Same day emergency response"], bestFor:"Businesses where NIXRIX systems are central to operations and continuous improvement matters.", image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop" },
];

const tierCls = (t: string) =>
  t === "quick"   ? "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/22" :
  t === "agency"  ? "bg-[#1A1208]/8  text-[#1A1208] border-[#1A1208]/15" :
  t === "retainer"? "bg-[#E8230A]/8  text-[#E8230A] border-[#E8230A]/18" :
                    "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/22";

const tierLabel = (t: string) =>
  t === "quick" ? "Quick Win" : t === "agency" ? "Letting Agencies" : t === "retainer" ? "Monthly Support" : "Signature";

function PkgCard({ pkg }: { pkg: Pkg }) {
  const [open, setOpen] = useState(false);
  return (
    <HoverCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
      <div className="relative h-44 overflow-hidden">
        <motion.img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${tierCls(pkg.tier)}`} style={{ fontFamily: F.b }}>{tierLabel(pkg.tier)}</span>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-6">
        {/* Package name in red */}
        <h3 className="mb-1 text-xl font-normal text-[#E8230A]" style={{ fontFamily: F.h }}>{pkg.name}</h3>
        <p className="mb-3 text-xs font-semibold text-[#6B6256]" style={{ fontFamily: F.b }}>{pkg.tagline}</p>
        <p className="mb-5 flex-grow text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>{pkg.description}</p>

        <button
          onClick={() => setOpen(!open)}
          className="mb-3 flex w-full items-center justify-between rounded-xl border border-[#1A1208]/10 px-4 py-2.5 text-sm font-semibold text-[#1A1208] transition hover:border-[#E8230A]/30"
          style={{ fontFamily: F.b }}
        >
          {open ? "Hide details" : "See what's included"}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown className="h-4 w-4 text-[#E8230A]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mb-4 space-y-2 border-t border-[#1A1208]/8 pt-4">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#1A1208]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                    <span className="font-medium" style={{ fontFamily: F.b }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4 rounded-xl bg-[#E8230A]/5 p-4">
                <p className="text-xs font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>Best for</p>
                <p className="mt-1 text-sm font-light text-[#1A1208]/70" style={{ fontFamily: F.b }}>{pkg.bestFor}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to="/contact">
          <div className="w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white" style={{ fontFamily: F.b }}>
            Enquire →
          </div>
        </Link>
      </div>
    </HoverCard>
  );
}

export function ServicesPage() {
  const [filter, setFilter] = useState<"all"|"quick"|"signature"|"agency"|"retainer">("all");
  const filtered = filter === "all" ? packages : packages.filter(p => p.tier === filter);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="Services and Packages | NIXRIX UK Business Automation" description="Named automation and website packages with transparent scopes. Websites, CRM, automation, Power BI dashboards, AI document processing, and letting agency systems. NIXRIX, Leeds." keywords="UK business automation packages, HubSpot CRM setup UK, Power BI dashboard UK, website automation Leeds, letting agency automation package UK" schemaType="service" canonicalPath="/services" />
      <ChatbotWidget />

      {/* HERO — lightest */}
      <section className="relative overflow-hidden py-28 lg:py-32" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        <RedOrb className="-right-20 -top-20" size={440} />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/55" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li><li>/</li>
              <li aria-current="page" className="text-[#E8230A]">Services</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}>
            <Tag>Our Packages</Tag>
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }} className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: F.h }}>
            Named Packages.
            <br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Transparent Scopes.</em> No Guesswork.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/68" style={{ fontFamily: F.b }}>
            Every NIXRIX package has a defined scope. Start with one thing, add more as your business grows. No hidden costs, no vague proposals.
          </motion.p>
        </div>
      </section>

      {/* PACKAGES — s1 */}
      <section className="relative overflow-hidden py-24" style={{ background: BG.s1 }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(#1A1208 1px,transparent 1px),linear-gradient(90deg,#1A1208 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {([{key:"all",label:"All Packages"},{key:"quick",label:"Quick Wins"},{key:"signature",label:"Signature"},{key:"agency",label:"Letting Agencies"},{key:"retainer",label:"Monthly Support"}] as const).map(({key,label})=>(
              <button key={key} onClick={()=>setFilter(key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${filter===key ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.24)]" : "border-[#1A1208]/14 bg-white text-[#1A1208]/70 hover:border-[#E8230A]/30 hover:text-[#1A1208]"}`}
                style={{ fontFamily: F.b }}>{label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.06}>
                <PkgCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING NOTE — s2 */}
      <section className="py-14" style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-2xl border-l-4 border-[#E8230A] bg-white p-8 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
              <h3 className="mb-4 text-2xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>How Scoping Works</h3>
              <p className="mb-3 text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Quick Win packages have a fixed, defined scope. Signature packages have a published starting scope — confirmed after a free 30 minute discovery call where we understand your exact requirements.</p>
              <p className="text-sm font-light text-[#1A1208]/65" style={{ fontFamily: F.b }}>NIXRIX Intelligence and NIXRIX Autopilot vary in scope depending on the number of data sources, document types, and workflows involved. We will confirm the exact scope in writing before anything starts. No surprises, no scope creep.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* REVIEWS RIBBON — s2 */}
      <section style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 text-center">
          <ScrollReveal><Tag>What Clients Say</Tag><h2 className="text-3xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>Trusted by UK Businesses</h2></ScrollReveal>
        </div>
        <ReviewRibbon bg={BG.s2} /><div className="pb-14" style={{ background: BG.s2 }} />
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <DotPattern opacity={0.05} /><RedOrb className="-right-24 top-0" size={420} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Not Sure Where to Start</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>Tell Us What You Need.<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>We Will Tell You What Fits.</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily: F.b }}>Book a free 30 minute discovery call. We will look at your situation and recommend the right starting point.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact"><motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}><Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]" style={{ fontFamily: F.b }}>Book Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Button></motion.div></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
