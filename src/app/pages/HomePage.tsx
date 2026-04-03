import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, Zap, Globe, BarChart3,
  Bot, Settings2, Building2, Clock, Users,
  ChevronDown, Star, Layers, Quote,
} from "lucide-react";
import { Button }       from "@/app/components/ui/button";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }      from "@/app/components/SEOHead";
import { motion }       from "motion/react";

// ── Font injection ────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const id = "nixrix-gfonts";
  if (!document.getElementById(id)) {
    const l = document.createElement("link");
    l.id   = id;
    l.rel  = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  }
}

const F = {
  h: "'Playfair Display', Georgia, serif",
  b: "'Plus Jakarta Sans', system-ui, sans-serif",
};

// ── Palette (all sections reference these) ───────────────────────────────────
// Cream light  #FDFAF5  — hero + process
// Cream mid    #F5EDE0  — services + no-migration
// Cream warm   #EDE4D4  — who-we-help + reviews + seo
// Dark ink     #1A1208  — marquee + final CTA only
// Red          #E8230A

// ── Types ─────────────────────────────────────────────────────────────────────
type Service = {
  image: string; label: string; name: string;
  description: string; features: string[];
  tier: "quick" | "signature" | "agency"; icon: React.ReactNode;
};
type Review = {
  name: string; role: string; company: string;
  avatar: string; text: string; stars: number;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const services: Service[] = [
  { image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop", label:"Quick Win",        name:"The Spark",        description:"One clean page. Professional presence live in five days. No bloat, no waiting months for something simple.",                                                    features:["Mobile first design","SEO foundations built in","Contact form ready","Live within 5 days"],           tier:"quick",     icon:<Globe    className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop", label:"Quick Win",        name:"The Magnet",       description:"One page, one goal. Built specifically to turn visitors into enquiries with nothing getting in the way.",                                                     features:["Conversion focused layout","Lead capture form","CRM connected","Copy optimised for action"],           tier:"quick",     icon:<Bot      className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop", label:"Quick Win",        name:"The Connector",    description:"HubSpot configured properly so every lead gets tracked, followed up and never falls through a gap again.",                                                   features:["Full CRM setup","Pipeline stages","Email templates","Team onboarding call"],                           tier:"quick",     icon:<Settings2 className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", label:"Signature",        name:"NIXRIX Launchpad", description:"A full business website built to generate enquiries from day one. Designed, built and handed over ready to convert.",                                         features:["Multi page site","SEO optimised throughout","Lead capture flows","Analytics setup"],                   tier:"signature", icon:<Globe    className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",    label:"Signature",        name:"NIXRIX Command",   description:"CRM, automation and a live dashboard working together. Your whole operation connected and visible in one place.",                                            features:["HubSpot CRM","Make.com automation","Live KPI dashboard","Workflow setup"],                             tier:"signature", icon:<Settings2 className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop",    label:"Signature",        name:"NIXRIX Intelligence",description:"Power BI dashboard that shows you exactly what is happening in your business, updated live, in plain English.",                                            features:["Power BI build","Live data connections","KPI tracking","Plain language insights"],                     tier:"signature", icon:<BarChart3 className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop", label:"Signature",        name:"NIXRIX Autopilot", description:"AI handles your document processing and repetitive workflows. The admin that eats your week gets handled automatically.",                                   features:["Document AI processing","Workflow automation","Make.com builds","Time savings report"],                tier:"signature", icon:<Zap      className="h-4 w-4" /> },
  { image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",    label:"Letting Agencies", name:"Agency Smart Pack", description:"Website, CRM and automation built specifically for UK letting agencies. Everything a modern agency needs, connected and working.",                          features:["Agency website","Tenant and landlord CRM","Lead automation","Compliance aware setup"],                 tier:"agency",    icon:<Building2 className="h-4 w-4" /> },
];

const reviews: Review[] = [
  { name:"Sarah Whitmore", role:"Director", company:"Whitmore Properties, Leeds", avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face", text:"We were losing landlord enquiries because nobody was following up fast enough. NIXRIX set up our HubSpot in a week. Every lead now gets a response within the hour automatically. We signed three new landlords in the first month.", stars:5 },
  { name:"Marcus Reid", role:"Managing Director", company:"Reid and Co Accountants, Manchester", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", text:"I was spending two hours a day on things that should have been automatic. The Autopilot package sorted our document processing completely. I genuinely do not know how we managed without it.", stars:5 },
  { name:"Priya Sharma", role:"Operations Manager", company:"Greenfield Lettings, Birmingham", avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face", text:"Our old website looked fine but it was doing nothing. NIXRIX rebuilt it and connected it to our CRM. We went from three web enquiries a month to fourteen. The difference is substantial.", stars:5 },
];

const steps = [
  { number:"01", title:"Free Discovery Call",     body:"Thirty minutes. We look at your current setup, tools and workflow. You get honest feedback, not a sales pitch.",            image:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop" },
  { number:"02", title:"Clear Recommendation",    body:"You get a written summary of exactly what is costing you time and leads, and which package fixes it first.",               image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
  { number:"03", title:"We Build It",             body:"Fast delivery using tools you already have. Nothing gets ripped out. No three month projects. No surprises.",              image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" },
  { number:"04", title:"You Run Smarter",         body:"Your system runs in the background. Leads get captured. Tasks get done. You see everything in one dashboard.",             image:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" },
];

// ── Tool marquee items ────────────────────────────────────────────────────────
const toolItems = [
  { name:"HubSpot",  color:"#FF7A59", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><circle cx="16" cy="16" r="6" fill="#FF7A59"/><circle cx="16" cy="7" r="3" fill="#FF7A59"/><circle cx="23" cy="21" r="3" fill="#FF7A59"/><circle cx="9" cy="21" r="3" fill="#FF7A59"/></svg> ) },
  { name:"Make",     color:"#6D00CC", logo:( <svg viewBox="0 0 36 24" className="h-7 w-auto" fill="none"><rect x="0" y="4" width="10" height="10" rx="3" fill="#6D00CC"/><rect x="13" y="4" width="10" height="10" rx="3" fill="#9B4DFF"/><rect x="26" y="4" width="10" height="10" rx="3" fill="#C084FC"/></svg> ) },
  { name:"Power BI", color:"#F2C811", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="20" width="6" height="10" rx="2" fill="#F2C811"/><rect x="11" y="13" width="6" height="17" rx="2" fill="#F2C811"/><rect x="20" y="6" width="6" height="24" rx="2" fill="#E8A600"/></svg> ) },
  { name:"Notion",   color:"#1A1208", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="2" width="28" height="28" rx="6" fill="#1A1208"/><rect x="7" y="8" width="8" height="3" rx="1.5" fill="white"/><rect x="7" y="14" width="18" height="2" rx="1" fill="white" opacity="0.6"/><rect x="7" y="19" width="14" height="2" rx="1" fill="white" opacity="0.6"/><rect x="7" y="24" width="16" height="2" rx="1" fill="white" opacity="0.4"/></svg> ) },
  { name:"Analytics",color:"#F9AB00", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="3" y="20" width="6" height="10" rx="3" fill="#F9AB00"/><rect x="13" y="12" width="6" height="18" rx="3" fill="#E37400"/><circle cx="26" cy="8" r="6" fill="#E37400"/><circle cx="26" cy="8" r="3" fill="white"/></svg> ) },
  { name:"Tally",    color:"#0F0F0F", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect x="2" y="2" width="28" height="28" rx="7" fill="#0F0F0F"/><rect x="7" y="9" width="18" height="2.5" rx="1.25" fill="white"/><rect x="7" y="15" width="12" height="2.5" rx="1.25" fill="white" opacity="0.7"/><rect x="7" y="21" width="14" height="2.5" rx="1.25" fill="white" opacity="0.5"/></svg> ) },
  { name:"Netlify",  color:"#00C7B7", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="#00C7B7"/><circle cx="16" cy="17" r="3" fill="white"/></svg> ) },
  { name:"Zapier",   color:"#FF4A00", logo:( <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none"><rect width="32" height="32" rx="8" fill="#FF4A00"/><path d="M8 16 L16 8 L24 16 L16 24 Z" fill="white" opacity="0.9"/><circle cx="16" cy="16" r="3" fill="#FF4A00"/></svg> ) },
];
const marqueeItems = [...toolItems, ...toolItems, ...toolItems];

// ── Helpers ────────────────────────────────────────────────────────────────────

function TierBadge({ tier, label }: { tier: Service["tier"]; label: string }) {
  const cls =
    tier === "quick"   ? "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/25" :
    tier === "agency"  ? "bg-[#1A1208]/8  text-[#1A1208] border-[#1A1208]/18" :
                         "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/22";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${cls}`} style={{ fontFamily: F.b }}>
      {label}
    </span>
  );
}

function SectionTag({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/70" : "bg-[#E8230A]"}`} />
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? "text-[#E8230A]/85" : "text-[#E8230A]"}`}
        style={{ fontFamily: F.b }}
      >
        {children}
      </span>
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/70" : "bg-[#E8230A]"}`} />
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#E8230A] text-[#E8230A]" />
      ))}
    </div>
  );
}

// Red-border hover card wrapper
function HoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{
        y: -7,
        borderColor: "#E8230A",
        boxShadow: "0 20px 52px rgba(232,35,10,0.14), 0 0 0 1px rgba(232,35,10,0.18)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Hero circuit background ───────────────────────────────────────────────────
// Positioned on the right 60% of the viewport, never enters the left text zone.
function CircuitBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm cream gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 75% at 68% 42%, #F5E8D3 0%, #EFE0C4 32%, #E9D8B8 58%, #F8F2E8 100%)",
        }}
      />

      {/* Circuit SVG — right 60%, no text overlap */}
      <svg
        className="absolute right-0 top-0 h-full w-[58%] opacity-[0.12]"
        viewBox="0 0 580 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <defs>
          <style>{`
            @keyframes tDash { from{stroke-dashoffset:360}to{stroke-dashoffset:0} }
            @keyframes tDashR{ from{stroke-dashoffset:0}to{stroke-dashoffset:360} }
            @keyframes nPulse { 0%,100%{opacity:.35}50%{opacity:.9} }
            .ta { stroke-dasharray:14 7; animation:tDash  3.8s linear infinite }
            .tb { stroke-dasharray:14 7; animation:tDashR 5.2s linear infinite }
            .tc { stroke-dasharray:10 5; animation:tDash  6.5s linear infinite }
            .td { stroke-dasharray:10 5; animation:tDashR 4.1s linear infinite }
          `}</style>
        </defs>

        {/* Horizontals */}
        <line x1="0" y1="110" x2="580" y2="110" stroke="#1A1208" strokeWidth="1"   className="ta" />
        <line x1="0" y1="230" x2="580" y2="230" stroke="#E8230A" strokeWidth="1"   className="tb" />
        <line x1="0" y1="360" x2="580" y2="360" stroke="#1A1208" strokeWidth="1"   className="tc" style={{animationDelay:"1s"}} />
        <line x1="0" y1="490" x2="580" y2="490" stroke="#E8230A" strokeWidth="0.8" className="ta" style={{animationDelay:"1.5s"}} />
        <line x1="0" y1="620" x2="580" y2="620" stroke="#1A1208" strokeWidth="0.8" className="td" />

        {/* Verticals */}
        <line x1="75"  y1="0" x2="75"  y2="800" stroke="#1A1208" strokeWidth="0.8" className="tb" style={{animationDelay:"0.4s"}} />
        <line x1="195" y1="0" x2="195" y2="800" stroke="#E8230A" strokeWidth="1"   className="tc" style={{animationDelay:"0.9s"}} />
        <line x1="330" y1="0" x2="330" y2="800" stroke="#1A1208" strokeWidth="0.8" className="ta" style={{animationDelay:"1.7s"}} />
        <line x1="465" y1="0" x2="465" y2="800" stroke="#E8230A" strokeWidth="0.8" className="td" style={{animationDelay:"0.2s"}} />

        {/* L connectors */}
        <path d="M75 110 L195 110 L195 230" stroke="#E8230A" strokeWidth="1.2" fill="none" className="tc" />
        <path d="M330 230 L465 230 L465 360" stroke="#1A1208" strokeWidth="1.2" fill="none" className="tb" style={{animationDelay:"0.6s"}} />
        <path d="M75  360 L195 360 L195 490" stroke="#E8230A" strokeWidth="1"   fill="none" className="ta" style={{animationDelay:"1.9s"}} />
        <path d="M330 490 L465 490 L465 620" stroke="#1A1208" strokeWidth="1"   fill="none" className="td" />

        {/* Nodes */}
        {[
          [75,110],[195,110],[330,110],[465,110],
          [75,230],[195,230],[330,230],[465,230],
          [75,360],[195,360],[330,360],[465,360],
          [75,490],[195,490],[330,490],[465,490],
          [75,620],[195,620],[330,620],[465,620],
        ].map(([cx, cy], i) => (
          <circle
            key={i} cx={cx} cy={cy} r={i % 5 === 0 ? 3.5 : 2.2}
            fill={i % 3 === 0 ? "#E8230A" : "#1A1208"}
            style={{
              animation: `nPulse ${2.2 + (i % 4) * 0.55}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.3}s`,
            }}
          />
        ))}

        {/* Travelling signals */}
        <circle r="3.5" fill="#E8230A" opacity="0.65">
          <animateMotion dur="3.8s" repeatCount="indefinite"><mpath href="#sp1" /></animateMotion>
        </circle>
        <circle r="2.5" fill="#1A1208" opacity="0.55">
          <animateMotion dur="5.2s" repeatCount="indefinite" begin="1.4s"><mpath href="#sp2" /></animateMotion>
        </circle>
        <circle r="2" fill="#E8230A" opacity="0.5">
          <animateMotion dur="6.5s" repeatCount="indefinite" begin="0.7s"><mpath href="#sp3" /></animateMotion>
        </circle>

        <path id="sp1" d="M0 110 L580 110" fill="none" />
        <path id="sp2" d="M195 0 L195 800" fill="none" />
        <path id="sp3" d="M75 110 L195 110 L195 230 L330 230 L330 360 L465 360 L465 490" fill="none" />
      </svg>

      {/* Left-side warm mask so hero text is always clean */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #EDD8BB 0%, #EDD8BB 25%, rgba(237,216,187,0.7) 42%, rgba(237,216,187,0.2) 58%, transparent 72%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          backgroundSize:"200px 200px",
        }}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all"|"quick"|"signature"|"agency">("all");
  const filtered = activeFilter === "all" ? services : services.filter((s) => s.tier === activeFilter);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b, background: "#FDFAF5" }}>
      <SEOHead
        title="UK Business Automation and Websites | NIXRIX"
        description="NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, automation, CRM systems, and live dashboards. Leeds based. No migration."
        keywords="UK business automation, letting agency automation Leeds, workflow automation small business, HubSpot CRM setup UK, business website Leeds, Power BI dashboard"
        schemaType="organization"
      />
      <ChatbotWidget />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#EDD8BB" }}>
        <CircuitBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-36 sm:px-6 lg:px-8 lg:pt-44">
          <div className="max-w-[620px]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex items-center gap-3"
            >
              <motion.div
                className="h-2 w-2 rounded-full bg-[#E8230A]"
                animate={{ scale:[1,1.7,1], opacity:[0.6,1,0.6] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily: F.b }}>
                UK Business Automation · Leeds
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="text-[3rem] font-normal leading-[1.07] text-[#1A1208] sm:text-[3.75rem] lg:text-[4.75rem]"
              style={{ fontFamily: F.h }}
            >
              Stop Losing Time.
              <br />
              <span className="relative inline-block">
                <em className="text-[#E8230A]" style={{ fontStyle: "italic" }}>Start Running</em>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-[#E8230A]/35"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, delay: 0.9, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <br />
              Smarter.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="mt-7 max-w-lg text-lg font-light leading-[1.85] text-[#1A1208]/75"
              style={{ fontFamily: F.b }}
            >
              We help UK small businesses replace repetitive manual work with automation,
              smart websites, CRM systems, and live dashboards.{" "}
              <span className="font-semibold text-[#1A1208]">
                Without changing a single tool you already use.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                  <Button
                    size="lg"
                    className="group h-14 rounded-2xl bg-[#E8230A] px-9 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.28)] transition-all hover:bg-[#C01A05] hover:shadow-[0_16px_48px_rgba(232,35,10,0.40)]"
                    style={{ fontFamily: F.b }}
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
                    className="h-14 rounded-2xl border-2 border-[#1A1208]/22 bg-[#FDFAF5]/80 px-9 text-base font-medium text-[#1A1208] backdrop-blur-sm transition-all hover:border-[#E8230A]/40 hover:bg-[#FDFAF5]"
                    style={{ fontFamily: F.b }}
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
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12 space-y-3"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1208]/50" style={{ fontFamily: F.b }}>
                Sound familiar?
              </p>
              {[
                "Spending hours every week on tasks a system should handle",
                "A website that looks fine but generates almost no enquiries",
                "Leads slipping away because follow-ups happen too late",
                "No clear picture of how the business is actually performing",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.76 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                  <span className="text-sm font-medium leading-6 text-[#1A1208]/80" style={{ fontFamily: F.b }}>{point}</span>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 }}
                className="pt-1 text-sm font-semibold text-[#E8230A]"
                style={{ fontFamily: F.b }}
              >
                You are in the right place.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-[#1A1208]/30" />
        </motion.div>
      </section>

      {/* ═══════════════════════ MARQUEE (dark ribbon) ═══════════════════════ */}
      <div className="relative overflow-hidden bg-[#1A1208] py-5">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#1A1208] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#1A1208] to-transparent" />
        <motion.div
          className="flex items-center gap-0"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((tool, i) => (
            <div key={i} className="flex shrink-0 items-center gap-4 px-10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] p-2">
                {tool.logo}
              </div>
              <span className="whitespace-nowrap text-base font-semibold text-white/55" style={{ fontFamily: F.b }}>
                {tool.name}
              </span>
              <div className="ml-6 h-5 w-px bg-white/12" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════ WHO WE HELP (cream warm) ═══════════════════════ */}
      <section className="relative overflow-hidden py-24" style={{ background: "#EDE4D4" }}>
        {/* Subtle animated orb */}
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #E8230A22 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag>Who We Help</SectionTag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              Does This Sound Like Your Business?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily: F.b }}>
              We work with UK small businesses growing fast but stuck doing too much by hand.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon:<Clock className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", title:"Hours lost every week to tasks a system should be doing", solution:"Automation fixes this" },
              { icon:<Globe className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", title:"A website that looks okay but brings in almost no enquiries", solution:"Conversion rebuild fixes this" },
              { icon:<Users className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", title:"Leads coming in but nobody following up fast enough", solution:"HubSpot CRM fixes this" },
              { icon:<BarChart3 className="h-5 w-5"/>, img:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop", title:"No real visibility on what part of the business is performing", solution:"Live dashboard fixes this" },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <HoverCard className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-[#FDFAF5]">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img src={card.img} alt={card.solution} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/55 to-transparent" />
                    <div className="absolute bottom-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8230A]/15 text-[#E8230A]">
                      {card.icon}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="mb-4 text-sm font-medium leading-7 text-[#1A1208]/80" style={{ fontFamily: F.h, fontStyle:"italic", fontSize:"0.9rem" }}>
                      "{card.title}"
                    </p>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8230A]/10 px-3 py-1.5 text-xs font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>
                      <CheckCircle2 className="h-3 w-3" />
                      {card.solution}
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES (cream mid) ═══════════════════════ */}
      <section className="relative overflow-hidden py-28" style={{ background: "#F5EDE0" }}>
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"linear-gradient(#1A1208 1px,transparent 1px),linear-gradient(90deg,#1A1208 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <SectionTag>Our Services</SectionTag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              What We Build for You
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily: F.b }}>
              Named packages. Transparent scopes. Start with one thing and scale from there.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {([{key:"all",label:"All Services"},{key:"quick",label:"Quick Wins"},{key:"signature",label:"Signature"},{key:"agency",label:"Letting Agencies"}] as const).map(({key,label})=>(
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === key
                    ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.24)]"
                    : "border-[#1A1208]/16 bg-white text-[#1A1208]/70 hover:border-[#E8230A]/35 hover:text-[#1A1208]"
                }`}
                style={{ fontFamily: F.b }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.07}>
                <HoverCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <div className="relative h-44 overflow-hidden">
                    <motion.img src={service.image} alt={service.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <TierBadge tier={service.tier} label={service.label} />
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="mb-3 text-xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>
                      {service.name}
                    </h3>
                    <p className="mb-5 flex-grow text-sm font-light leading-7 text-[#1A1208]/70" style={{ fontFamily: F.b }}>
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {service.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#1A1208]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                          <span className="font-medium" style={{ fontFamily: F.b }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/services">
                      <div className="w-full rounded-xl border-2 border-[#E8230A]/22 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white" style={{ fontFamily: F.b }}>
                        Learn More
                      </div>
                    </Link>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-[#1A1208]/12 bg-white p-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-[#E8230A]">
                <Layers className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: F.b }}>Monthly Support</span>
              </div>
              <h3 className="mb-3 text-2xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>
                NIXRIX Grow Retainers
              </h3>
              <p className="mx-auto mb-6 max-w-xl font-light text-[#1A1208]/65" style={{ fontFamily: F.b }}>
                Ongoing support, updates and optimisation for businesses who want continuous progress rather than one-off projects.
              </p>
              <Link to="/services">
                <Button className="rounded-xl bg-[#1A1208] px-8 text-white hover:bg-[#E8230A]" style={{ fontFamily: F.b }}>
                  View All Packages and Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS (cream light) ═══════════════════════ */}
      <section className="py-24" style={{ background: "#FDFAF5" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag>The Process</SectionTag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              How We Work Together
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg font-light leading-8 text-[#1A1208]/65" style={{ fontFamily: F.b }}>
              First call to live system in days, not months. Transparent at every step.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <HoverCard className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img src={step.image} alt={step.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/60 to-transparent" />
                    <div className="absolute bottom-3 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8230A] text-xs font-bold text-white shadow-[0_4px_14px_rgba(232,35,10,0.38)]">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 text-4xl font-normal text-[#E8230A]/15" style={{ fontFamily: F.h }}>{step.number}</div>
                    <h3 className="mb-2 text-base font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{step.title}</h3>
                    <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>{step.body}</p>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NO MIGRATION (cream mid) ═══════════════════════ */}
      <section className="py-20" style={{ background: "#F5EDE0" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-7 bg-[#E8230A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8230A]" style={{ fontFamily: F.b }}>Our Promise</span>
              </div>
              <h2 className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
                We Add.
                <br />
                <em style={{ fontStyle:"italic" }}>We Never Replace.</em>
              </h2>
              <p className="mt-5 text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily: F.b }}>
                Most agencies want to rip out your existing tools and replace them with their preferred stack.
                We don't. We connect to what you already have, layer intelligence on top, and make everything
                work together without disrupting your operations for a single day.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "No forced platform migrations",
                  "No months of downtime or disruption",
                  "Works alongside your existing email, CRM and spreadsheets",
                  "Your team keeps their workflow. It just becomes automatic.",
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8230A]" />
                    <span className="font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>{point}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <HoverCard className="relative overflow-hidden rounded-2xl border border-[#1A1208]/10">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop"
                  alt="UK letting agency office"
                  className="h-72 w-full object-cover lg:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/72 via-[#1A1208]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-1 text-5xl font-normal text-[#E8230A]/30" style={{ fontFamily: F.h }}>15,000+</div>
                  <div className="mb-2 text-xl font-semibold text-white" style={{ fontFamily: F.b }}>UK Letting Agencies</div>
                  <p className="mb-5 text-sm font-light leading-6 text-white/70" style={{ fontFamily: F.b }}>
                    Our primary niche. The Agency Smart Pack was built specifically for letting agencies
                    losing landlords to more responsive competitors.
                  </p>
                  <Link to="/contact">
                    <Button className="rounded-xl bg-[#E8230A] text-white shadow-[0_6px_20px_rgba(232,35,10,0.30)] hover:bg-[#C01A05]" style={{ fontFamily: F.b }}>
                      Ask About the Agency Smart Pack
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </HoverCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ REVIEWS (cream warm) ═══════════════════════ */}
      <section className="relative overflow-hidden py-24" style={{ background: "#EDE4D4" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"36px 36px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag>Client Reviews</SectionTag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              What Our Clients Say
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <HoverCard className="flex h-full flex-col rounded-2xl border border-[#1A1208]/10 bg-white p-7 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <Stars count={review.stars} />
                  <Quote className="mt-4 h-7 w-7 text-[#E8230A]/22" />
                  <p className="mt-3 flex-grow text-sm font-light leading-[1.9] text-[#1A1208]/75" style={{ fontFamily: F.b }}>
                    {review.text}
                  </p>
                  <div className="mt-6 flex items-center gap-4 border-t border-[#1A1208]/8 pt-5">
                    <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#E8230A]/18" />
                    <div>
                      <div className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{review.name}</div>
                      <div className="text-xs font-light text-[#1A1208]/60" style={{ fontFamily: F.b }}>{review.role}, {review.company}</div>
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SEO GUIDES (cream light) ═══════════════════════ */}
      <section className="py-20" style={{ background: "#FDFAF5" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal>
              <Link to="/blog/automation-for-uk-letting-agencies" className="group block h-full overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white transition-all hover:border-[#E8230A] hover:shadow-[0_12px_40px_rgba(232,35,10,0.12)]">
                <div className="h-44 overflow-hidden">
                  <motion.img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=400&fit=crop" alt="Letting agency automation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>Guide</div>
                  <h3 className="mb-2 text-lg font-normal text-[#1A1208] transition group-hover:text-[#E8230A]" style={{ fontFamily: F.h }}>Automation for UK Letting Agencies</h3>
                  <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>How smart automation saves letting agents 10 or more hours a week and why competitors are already using it.</p>
                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>Read the guide <ArrowRight className="ml-1 h-4 w-4" /></div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link to="/blog/business-automation-services-leeds" className="group block h-full overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white transition-all hover:border-[#E8230A] hover:shadow-[0_12px_40px_rgba(232,35,10,0.12)]">
                <div className="h-44 overflow-hidden">
                  <motion.img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=400&fit=crop" alt="Leeds business automation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>Guide</div>
                  <h3 className="mb-2 text-lg font-normal text-[#1A1208] transition group-hover:text-[#E8230A]" style={{ fontFamily: F.h }}>Business Automation Services in Leeds</h3>
                  <p className="text-sm font-light leading-7 text-[#1A1208]/65" style={{ fontFamily: F.b }}>Why Leeds based SMEs are turning to workflow automation to grow faster without hiring more staff.</p>
                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>Read the guide <ArrowRight className="ml-1 h-4 w-4" /></div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#E8230A] sm:col-span-2 lg:col-span-1">
                <div className="h-44 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=400&fit=crop" alt="Free discovery call" className="h-full w-full object-cover opacity-25" />
                </div>
                <div className="flex flex-grow flex-col justify-between p-6">
                  <div>
                    <Star className="mb-4 h-6 w-6 text-white/55" />
                    <h3 className="mb-2 text-xl font-normal text-white" style={{ fontFamily: F.h }}>Not sure where to start?</h3>
                    <p className="text-sm font-light leading-7 text-white/82" style={{ fontFamily: F.b }}>Tell us about your business in two minutes. We will tell you exactly what would make the biggest difference, for free.</p>
                  </div>
                  <Link to="/contact" className="mt-5 block">
                    <div className="rounded-xl bg-white py-3 text-center text-sm font-semibold text-[#E8230A] transition hover:bg-white/93" style={{ fontFamily: F.b }}>
                      Book a Free 30 Minute Call
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CTA (dark — only dark section remaining) ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage:"radial-gradient(circle, #FDFAF5 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
        <motion.div
          className="pointer-events-none absolute -right-32 -top-20 h-[540px] w-[540px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A1C 0%, transparent 68%)" }}
          animate={{ scale:[1,1.09,1] }}
          transition={{ duration:16, repeat:Infinity, ease:"easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A10 0%, transparent 68%)" }}
          animate={{ scale:[1.05,1,1.05] }}
          transition={{ duration:12, repeat:Infinity, ease:"easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-[14%] top-[18%] h-14 w-14 rounded-xl border border-[#E8230A]/20"
          animate={{ y:[0,-16,0], rotate:[18,28,18] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <SectionTag onDark>Ready When You Are</SectionTag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>
              Let's Fix What's
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Slowing You Down.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/60" style={{ fontFamily: F.b }}>
              Book a free 30 minute discovery call. We look at your current setup, find the biggest
              time and lead gaps, and tell you exactly what to fix. No pitch. No pressure.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05] hover:shadow-[0_16px_48px_rgba(232,35,10,0.48)]" style={{ fontFamily: F.b }}>
                    Book Free Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 border-white/18 bg-transparent px-10 text-base font-medium text-white hover:border-white/35 hover:bg-white/5" style={{ fontFamily: F.b }}>
                    View Packages and Pricing
                  </Button>
                </motion.div>
              </Link>
            </div>
            <p className="mt-10 text-sm font-light text-white/28" style={{ fontFamily: F.b }}>
              NIXRIX LTD · Registered in England and Wales · Leeds, UK · hello@nixrix.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
