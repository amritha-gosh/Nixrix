import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  Quote,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { motion, useMotionValue, useSpring } from "motion/react";

// ─── Google Fonts injection ───────────────────────────────────────────────────
// DM Serif Display (headings) + Outfit (body)
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap";
if (!document.head.querySelector('link[href*="DM+Serif"]')) {
  document.head.appendChild(fontLink);
}

// ─── CSS vars + global overrides ─────────────────────────────────────────────
const FONTS = {
  heading: "'DM Serif Display', Georgia, serif",
  body: "'Outfit', system-ui, sans-serif",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Service = {
  image: string;
  label: string;
  name: string;
  description: string;
  features: string[];
  tier: "quick" | "signature" | "agency";
  icon: React.ReactNode;
};

type Review = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  stars: number;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
    label: "Quick Win",
    name: "The Spark",
    description: "One clean page. Professional presence live in five days. No bloat, no waiting months for something simple.",
    features: ["Mobile first design", "SEO foundations built in", "Contact form ready", "Live within 5 days"],
    tier: "quick",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop",
    label: "Quick Win",
    name: "The Magnet",
    description: "One page, one goal. Built specifically to turn visitors into enquiries with nothing getting in the way.",
    features: ["Conversion focused layout", "Lead capture form", "CRM connected", "Copy optimised for action"],
    tier: "quick",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop",
    label: "Quick Win",
    name: "The Connector",
    description: "HubSpot configured properly so every lead gets tracked, followed up and never falls through a gap again.",
    features: ["Full CRM setup", "Pipeline stages", "Email templates", "Team onboarding call"],
    tier: "quick",
    icon: <Settings2 className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    label: "Signature",
    name: "NIXRIX Launchpad",
    description: "A full business website built to generate enquiries from day one. Designed, built and handed over ready to convert.",
    features: ["Multi page site", "SEO optimised throughout", "Lead capture flows", "Analytics setup"],
    tier: "signature",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    label: "Signature",
    name: "NIXRIX Command",
    description: "CRM, automation and a live dashboard working together. Your whole operation connected and visible in one place.",
    features: ["HubSpot CRM", "Make.com automation", "Live KPI dashboard", "Workflow setup"],
    tier: "signature",
    icon: <Settings2 className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop",
    label: "Signature",
    name: "NIXRIX Intelligence",
    description: "Power BI dashboard that shows you exactly what is happening in your business, updated live, in plain English.",
    features: ["Power BI build", "Live data connections", "KPI tracking", "Plain language insights"],
    tier: "signature",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
    label: "Signature",
    name: "NIXRIX Autopilot",
    description: "AI handles your document processing and repetitive workflows. The admin that eats your week gets handled automatically.",
    features: ["Document AI processing", "Workflow automation", "Make.com builds", "Time savings report"],
    tier: "signature",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    label: "Letting Agencies",
    name: "Agency Smart Pack",
    description: "Website, CRM and automation built specifically for UK letting agencies. Everything a modern agency needs, connected and working.",
    features: ["Agency website", "Tenant and landlord CRM", "Lead automation", "Compliance aware setup"],
    tier: "agency",
    icon: <Building2 className="h-4 w-4" />,
  },
];

const reviews: Review[] = [
  {
    name: "Sarah Whitmore",
    role: "Director",
    company: "Whitmore Properties, Leeds",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
    text: "We were losing landlord enquiries because nobody was following up fast enough. NIXRIX set up our HubSpot in a week. Every lead now gets a response within the hour automatically. We signed three new landlords in the first month.",
    stars: 5,
  },
  {
    name: "Marcus Reid",
    role: "Managing Director",
    company: "Reid & Co Accountants, Manchester",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    text: "I was spending two hours a day on things that should have been automatic. The Autopilot package sorted our document processing completely. I genuinely do not know how we managed without it.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    company: "Greenfield Lettings, Birmingham",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
    text: "Our old website looked fine but it was doing nothing. NIXRIX rebuilt it and connected it to our CRM. We went from three web enquiries a month to fourteen. The difference is night and day.",
    stars: 5,
  },
];

const steps = [
  {
    number: "01",
    title: "Free Discovery Call",
    body: "Thirty minutes. We look at your current setup, tools and workflow. You get honest feedback, not a sales pitch.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    number: "02",
    title: "Clear Recommendation",
    body: "You get a written summary of exactly what is costing you time and leads, and which package fixes it first.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    number: "03",
    title: "We Build It",
    body: "Fast delivery using tools you already have. Nothing gets ripped out. No three month projects. No surprises.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
  {
    number: "04",
    title: "You Run Smarter",
    body: "Your system runs in the background. Leads get captured. Tasks get done. You see everything in one dashboard.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
];

// ─── Tool logos (SVG inline, copyright safe for integration showcases) ─────────

function ToolLogos() {
  const tools = [
    {
      name: "HubSpot",
      logo: (
        <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="8" fill="#FF7A59" />
          <circle cx="20" cy="9" r="3" fill="#FF7A59" />
          <circle cx="29" cy="26" r="3" fill="#FF7A59" />
          <circle cx="11" cy="26" r="3" fill="#FF7A59" />
          <text x="36" y="25" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#33475B">HubSpot</text>
        </svg>
      ),
    },
    {
      name: "Make",
      logo: (
        <svg viewBox="0 0 100 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="12" width="16" height="16" rx="4" fill="#6D00CC" />
          <rect x="22" y="12" width="16" height="16" rx="4" fill="#9B4DFF" />
          <rect x="42" y="12" width="16" height="16" rx="4" fill="#C084FC" />
          <text x="62" y="25" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#1A1208">make</text>
        </svg>
      ),
    },
    {
      name: "Power BI",
      logo: (
        <svg viewBox="0 0 110 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="20" width="8" height="18" rx="2" fill="#F2C811" />
          <rect x="14" y="12" width="8" height="26" rx="2" fill="#F2C811" />
          <rect x="26" y="6" width="8" height="32" rx="2" fill="#E8A600" />
          <text x="40" y="25" fontFamily="Arial" fontSize="11" fontWeight="700" fill="#1A1208">Power BI</text>
        </svg>
      ),
    },
    {
      name: "Notion",
      logo: (
        <svg viewBox="0 0 100 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="28" height="32" rx="4" fill="#1A1208" />
          <rect x="8" y="10" width="8" height="3" rx="1.5" fill="white" />
          <rect x="8" y="16" width="16" height="2" rx="1" fill="white" opacity="0.6" />
          <rect x="8" y="21" width="13" height="2" rx="1" fill="white" opacity="0.6" />
          <rect x="8" y="26" width="15" height="2" rx="1" fill="white" opacity="0.4" />
          <text x="38" y="25" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#1A1208">Notion</text>
        </svg>
      ),
    },
    {
      name: "Google Analytics",
      logo: (
        <svg viewBox="0 0 130 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="22" width="8" height="14" rx="4" fill="#F9AB00" />
          <rect x="14" y="14" width="8" height="22" rx="4" fill="#E37400" />
          <circle cx="30" cy="10" r="8" fill="#E37400" />
          <circle cx="30" cy="10" r="4" fill="white" />
          <text x="44" y="25" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#1A1208">Analytics</text>
        </svg>
      ),
    },
    {
      name: "Tally",
      logo: (
        <svg viewBox="0 0 90 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="8" width="26" height="24" rx="5" fill="#0F0F0F" />
          <rect x="7" y="14" width="16" height="2.5" rx="1.25" fill="white" />
          <rect x="7" y="19" width="11" height="2.5" rx="1.25" fill="white" opacity="0.7" />
          <rect x="7" y="24" width="13" height="2.5" rx="1.25" fill="white" opacity="0.5" />
          <text x="34" y="25" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#1A1208">Tally</text>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      {tools.map((tool, i) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.08, y: -2 }}
          className="opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          title={tool.name}
        >
          {tool.logo}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated Workflow Hero Background ───────────────────────────────────────
// Nodes connected by animated dashed lines representing automation/data flow

function WorkflowBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  // Node positions (percentage-based)
  const nodes = [
    { cx: 8, cy: 20, r: 6, delay: 0, label: "CRM" },
    { cx: 22, cy: 10, r: 5, delay: 0.4, label: "Forms" },
    { cx: 22, cy: 35, r: 5, delay: 0.8, label: "Email" },
    { cx: 40, cy: 22, r: 8, delay: 0.2, label: "Automation" },
    { cx: 58, cy: 12, r: 5, delay: 0.6, label: "Dashboard" },
    { cx: 58, cy: 38, r: 5, delay: 1.0, label: "Leads" },
    { cx: 72, cy: 24, r: 6, delay: 0.3, label: "Alerts" },
    { cx: 85, cy: 14, r: 5, delay: 0.7, label: "Reports" },
    { cx: 85, cy: 36, r: 4, delay: 1.1, label: "AI" },
    { cx: 95, cy: 25, r: 6, delay: 0.5, label: "Growth" },
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3],
    [3, 4], [3, 5], [4, 6], [5, 6],
    [6, 7], [6, 8], [7, 9], [8, 9],
  ];

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #F5E8D5 0%, #F0E0C8 30%, #EDD8BC 55%, #F8F2E8 100%)",
        }}
      />

      {/* Parallax layer that follows mouse */}
      <motion.div
        className="absolute inset-0"
        style={{ x: springX, y: springY }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 50"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Animated dash for flowing lines */}
            <style>{`
              @keyframes flowDash {
                to { stroke-dashoffset: -20; }
              }
              @keyframes flowDash2 {
                to { stroke-dashoffset: -20; }
              }
              .flow-line {
                stroke-dasharray: 3 2;
                animation: flowDash 2s linear infinite;
              }
              .flow-line-slow {
                stroke-dasharray: 3 2;
                animation: flowDash 3.5s linear infinite;
              }
              .flow-line-fast {
                stroke-dasharray: 2 1.5;
                animation: flowDash 1.4s linear infinite;
              }
              @keyframes nodePulse {
                0%, 100% { r: 1.2; opacity: 0.7; }
                50% { r: 1.8; opacity: 1; }
              }
              @keyframes nodeGlow {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.9; }
              }
            `}</style>

            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft glow for red nodes */}
            <filter id="redGlow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection edges */}
          {edges.map(([from, to], i) => {
            const a = nodes[from];
            const b = nodes[to];
            const speedClass = i % 3 === 0 ? "flow-line-fast" : i % 2 === 0 ? "flow-line" : "flow-line-slow";
            return (
              <line
                key={i}
                x1={`${a.cx}%`} y1={`${a.cy * 2}%`}
                x2={`${b.cx}%`} y2={`${b.cy * 2}%`}
                stroke="#E8230A"
                strokeWidth="0.18"
                strokeOpacity="0.22"
                className={speedClass}
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            );
          })}

          {/* Data packets travelling along lines */}
          {edges.slice(0, 6).map(([from, to], i) => {
            const a = nodes[from];
            const b = nodes[to];
            return (
              <circle key={`packet-${i}`} r="0.35" fill="#E8230A" opacity="0.6" filter="url(#redGlow)">
                <animateMotion
                  dur={`${1.8 + i * 0.4}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                >
                  <mpath href={`#edge-path-${i}`} />
                </animateMotion>
              </circle>
            );
          })}

          {/* Invisible paths for animateMotion */}
          {edges.slice(0, 6).map(([from, to], i) => {
            const a = nodes[from];
            const b = nodes[to];
            return (
              <path
                key={`path-${i}`}
                id={`edge-path-${i}`}
                d={`M ${a.cx}% ${a.cy * 2}% L ${b.cx}% ${b.cy * 2}%`}
                fill="none"
                stroke="none"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={i}>
              {/* Outer glow ring */}
              <circle
                cx={`${node.cx}%`}
                cy={`${node.cy * 2}%`}
                r={node.r * 0.55}
                fill="none"
                stroke="#E8230A"
                strokeWidth="0.15"
                opacity="0"
                style={{
                  animation: `nodeGlow ${2 + node.delay}s ease-in-out infinite`,
                  animationDelay: `${node.delay}s`,
                }}
              />
              {/* Main node */}
              <circle
                cx={`${node.cx}%`}
                cy={`${node.cy * 2}%`}
                r={i === 3 ? 1.1 : 0.7}
                fill={i === 3 ? "#E8230A" : "#1A1208"}
                opacity={i === 3 ? 0.5 : 0.25}
                filter={i === 3 ? "url(#redGlow)" : "url(#glow)"}
                style={{
                  animation: `nodePulse ${2.5 + node.delay * 0.5}s ease-in-out infinite`,
                  animationDelay: `${node.delay}s`,
                }}
              />
              {/* Label */}
              <text
                x={`${node.cx}%`}
                y={`${node.cy * 2 + 2.2}%`}
                textAnchor="middle"
                fontSize="1.4"
                fill="#1A1208"
                opacity="0.18"
                fontFamily="Outfit, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Warm vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, transparent 40%, rgba(237,216,188,0.45) 100%)",
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}

// ─── Tier badge ───────────────────────────────────────────────────────────────
function TierBadge({ tier, label }: { tier: Service["tier"]; label: string }) {
  const cls =
    tier === "quick"
      ? "bg-[#E8230A]/10 text-[#E8230A] border-[#E8230A]/20"
      : tier === "agency"
      ? "bg-[#1A1208]/8 text-[#1A1208] border-[#1A1208]/15"
      : "bg-[#6B6256]/10 text-[#6B6256] border-[#6B6256]/22";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <div className={`h-px w-7 ${light ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-[#E8230A]/80" : "text-[#E8230A]"}`}
        style={{ fontFamily: FONTS.body }}
      >
        {children}
      </span>
      <div className={`h-px w-7 ${light ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
    </div>
  );
}

// ─── Star row ─────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#E8230A] text-[#E8230A]" />
      ))}
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "quick" | "signature" | "agency">("all");
  const filtered = activeFilter === "all" ? services : services.filter((s) => s.tier === activeFilter);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#FDFAF5]"
      style={{ fontFamily: FONTS.body }}
    >
      <SEOHead
        title="UK Business Automation and Websites | NIXRIX"
        description="NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, automation, CRM systems, and live dashboards. Leeds based. No migration."
        keywords="UK business automation, letting agency automation Leeds, workflow automation small business, HubSpot CRM setup UK, business website Leeds, Power BI dashboard"
        schemaType="organization"
      />

      <ChatbotWidget />

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        <WorkflowBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-40 lg:px-8 lg:pt-48">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex items-center gap-3"
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-[#E8230A]"
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8230A]"
                style={{ fontFamily: FONTS.body }}
              >
                UK Business Automation · Leeds
              </span>
            </motion.div>

            {/* H1 — DM Serif Display */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="text-[3.25rem] font-normal leading-[1.08] text-[#1A1208] sm:text-6xl lg:text-[5rem]"
              style={{ fontFamily: FONTS.heading }}
            >
              Stop Losing Time.
              <br />
              <em
                className="not-italic text-[#E8230A]"
                style={{ fontFamily: FONTS.heading, fontStyle: "italic" }}
              >
                Start Running
              </em>
              <br />
              Smarter.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="mt-8 max-w-xl text-lg font-light leading-[1.8] text-[#6B6256]"
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
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
                  <Button
                    size="lg"
                    className="group h-14 rounded-2xl bg-[#E8230A] px-9 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.30)] transition-all hover:bg-[#C01A05] hover:shadow-[0_16px_48px_rgba(232,35,10,0.40)]"
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
                    className="h-14 rounded-2xl border-2 border-[#1A1208]/16 bg-white/75 px-9 text-base font-medium text-[#1A1208] backdrop-blur-sm transition-all hover:border-[#E8230A]/30 hover:bg-white"
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
              className="mt-14 space-y-3"
            >
              <p
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B6256]/55"
                style={{ fontFamily: FONTS.body }}
              >
                Sound familiar?
              </p>
              {[
                "Spending hours every week on tasks a system should handle",
                "A website that looks fine but generates almost no enquiries",
                "Leads slipping away because follow-ups happen too late",
                "No clear picture of how your business is actually performing",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.76 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                  <span className="text-sm font-light leading-6 text-[#6B6256]">{point}</span>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 }}
                className="pt-1 text-sm font-semibold text-[#E8230A]"
              >
                You are in the right place.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-[#6B6256]/35" />
        </motion.div>
      </section>

      {/* ════════════════════════════════
          TOOL INTEGRATIONS
      ════════════════════════════════ */}
      <section className="border-b border-[#1A1208]/6 bg-white py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p
            className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6256]/50"
            style={{ fontFamily: FONTS.body }}
          >
            Tools we connect and build with
          </p>
          <ToolLogos />
        </div>
      </section>

      {/* ════════════════════════════════
          WHO WE HELP
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1A1208] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A18 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag light>Who We Help</SectionTag>
            <h2
              className="text-4xl font-normal text-white md:text-5xl"
              style={{ fontFamily: FONTS.heading }}
            >
              Does This Sound Like Your Business?
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-white/50"
              style={{ fontFamily: FONTS.body }}
            >
              We work with UK small businesses growing fast but stuck doing too much by hand.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-5 w-5" />,
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
                title: "Hours lost every week to tasks a system should be doing",
                solution: "Automation fixes this",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
                title: "A website that looks okay but brings in almost no enquiries",
                solution: "Conversion rebuild fixes this",
              },
              {
                icon: <Users className="h-5 w-5" />,
                img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
                title: "Leads coming in but nobody following up fast enough",
                solution: "HubSpot CRM fixes this",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
                title: "No real visibility on what part of the business is performing",
                solution: "Live dashboard fixes this",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04]"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <motion.img
                      src={card.img}
                      alt={card.solution}
                      className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:opacity-55 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8230A]/20 text-[#E8230A]">
                      {card.icon}
                    </div>
                  </div>
                  <div className="p-5">
                    <p
                      className="mb-4 text-sm font-light leading-7 text-white/70"
                      style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "0.9rem" }}
                    >
                      "{card.title}"
                    </p>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8230A]/12 px-3 py-1.5 text-xs font-semibold text-[#E8230A]">
                      <CheckCircle2 className="h-3 w-3" />
                      {card.solution}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SERVICES
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F5EFE4] py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1A1208 1px, transparent 1px), linear-gradient(90deg, #1A1208 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <SectionTag>Our Services</SectionTag>
            <h2
              className="text-4xl font-normal text-[#1A1208] md:text-5xl"
              style={{ fontFamily: FONTS.heading }}
            >
              What We Build for You
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[#6B6256]"
              style={{ fontFamily: FONTS.body }}
            >
              Named packages. Transparent scopes. Start with one thing and scale from there.
            </p>
          </ScrollReveal>

          {/* Filters */}
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
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === key
                    ? "border-[#E8230A] bg-[#E8230A] text-white shadow-[0_4px_18px_rgba(232,35,10,0.24)]"
                    : "border-[#1A1208]/14 bg-white text-[#6B6256] hover:border-[#E8230A]/30 hover:text-[#1A1208]"
                }`}
                style={{ fontFamily: FONTS.body }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -7 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  onHoverStart={() => setHoveredService(i)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1208]/8 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)] transition-shadow hover:shadow-[0_14px_44px_rgba(26,18,8,0.11)]"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <TierBadge tier={service.tier} label={service.label} />
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    <h3
                      className="mb-3 text-xl font-normal text-[#1A1208]"
                      style={{ fontFamily: FONTS.heading }}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="mb-5 flex-grow text-sm font-light leading-7 text-[#6B6256]"
                      style={{ fontFamily: FONTS.body }}
                    >
                      {service.description}
                    </p>

                    <ul className="mb-6 space-y-2">
                      {service.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#1A1208]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8230A]" />
                          <span className="font-light">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/services">
                      <div className="w-full rounded-xl border-2 border-[#E8230A]/20 py-2.5 text-center text-sm font-semibold text-[#E8230A] transition-all group-hover:border-[#E8230A] group-hover:bg-[#E8230A] group-hover:text-white">
                        Learn More
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Retainer strip */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-[#1A1208]/10 bg-white p-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-[#E8230A]">
                <Layers className="h-4 w-4" />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ fontFamily: FONTS.body }}
                >
                  Monthly Support
                </span>
              </div>
              <h3
                className="mb-3 text-2xl font-normal text-[#1A1208]"
                style={{ fontFamily: FONTS.heading }}
              >
                NIXRIX Grow Retainers
              </h3>
              <p
                className="mx-auto mb-6 max-w-xl font-light text-[#6B6256]"
                style={{ fontFamily: FONTS.body }}
              >
                Ongoing support, updates and optimisation for businesses who want continuous progress
                rather than one-off projects.
              </p>
              <Link to="/services">
                <Button
                  className="rounded-xl bg-[#1A1208] px-8 text-white hover:bg-[#E8230A]"
                  style={{ fontFamily: FONTS.body }}
                >
                  View All Packages and Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════
          HOW IT WORKS  — image cards
      ════════════════════════════════ */}
      <section className="bg-[#FDFAF5] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag>The Process</SectionTag>
            <h2
              className="text-4xl font-normal text-[#1A1208] md:text-5xl"
              style={{ fontFamily: FONTS.heading }}
            >
              How We Work Together
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-lg font-light leading-8 text-[#6B6256]"
              style={{ fontFamily: FONTS.body }}
            >
              First call to live system in days, not months. Transparent at every step.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="group overflow-hidden rounded-2xl border border-[#1A1208]/8 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)] hover:shadow-[0_12px_40px_rgba(26,18,8,0.10)]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/60 to-transparent" />
                    <div className="absolute bottom-3 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8230A] text-xs font-bold text-white shadow-[0_4px_12px_rgba(232,35,10,0.35)]">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <div
                      className="mb-3 text-4xl font-normal text-[#E8230A]/12"
                      style={{ fontFamily: FONTS.heading }}
                    >
                      {step.number}
                    </div>
                    <h3
                      className="mb-2 text-base font-semibold text-[#1A1208]"
                      style={{ fontFamily: FONTS.body }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm font-light leading-7 text-[#6B6256]"
                      style={{ fontFamily: FONTS.body }}
                    >
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          NO MIGRATION PROMISE
      ════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-7 bg-[#E8230A]" />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E8230A]"
                  style={{ fontFamily: FONTS.body }}
                >
                  Our Promise
                </span>
              </div>
              <h2
                className="text-4xl font-normal leading-tight text-[#1A1208] md:text-5xl"
                style={{ fontFamily: FONTS.heading }}
              >
                We Add.
                <br />
                <em style={{ fontStyle: "italic" }}>We Never Replace.</em>
              </h2>
              <p
                className="mt-5 text-lg font-light leading-[1.85] text-[#6B6256]"
                style={{ fontFamily: FONTS.body }}
              >
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
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8230A]" />
                    <span
                      className="font-light text-[#1A1208]"
                      style={{ fontFamily: FONTS.body }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop"
                  alt="UK letting agency office"
                  className="h-72 w-full rounded-2xl object-cover lg:h-96"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1A1208]/70 via-[#1A1208]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div
                    className="mb-1 text-5xl font-normal text-[#E8230A]/25"
                    style={{ fontFamily: FONTS.heading }}
                  >
                    15,000+
                  </div>
                  <div
                    className="mb-2 text-xl font-semibold text-white"
                    style={{ fontFamily: FONTS.body }}
                  >
                    UK Letting Agencies
                  </div>
                  <p
                    className="mb-5 text-sm font-light leading-6 text-white/70"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Our primary niche. The Agency Smart Pack was built specifically for letting agencies
                    losing landlords to more responsive competitors.
                  </p>
                  <Link to="/contact">
                    <Button className="rounded-xl bg-[#E8230A] text-white shadow-[0_6px_20px_rgba(232,35,10,0.30)] hover:bg-[#C01A05]">
                      Ask About the Agency Smart Pack
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          REVIEWS
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F5EFE4] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #1A1208 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <SectionTag>Client Reviews</SectionTag>
            <h2
              className="text-4xl font-normal text-[#1A1208] md:text-5xl"
              style={{ fontFamily: FONTS.heading }}
            >
              What Our Clients Say
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="flex h-full flex-col rounded-2xl border border-[#1A1208]/8 bg-white p-7 shadow-[0_4px_20px_rgba(26,18,8,0.06)]"
                >
                  {/* Stars */}
                  <Stars count={review.stars} />

                  {/* Quote icon */}
                  <Quote className="mt-4 h-7 w-7 text-[#E8230A]/20" />

                  {/* Review text */}
                  <p
                    className="mt-3 flex-grow text-sm font-light leading-[1.9] text-[#6B6256]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    {review.text}
                  </p>

                  {/* Reviewer */}
                  <div className="mt-6 flex items-center gap-4 border-t border-[#1A1208]/6 pt-5">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-[#E8230A]/15"
                    />
                    <div>
                      <div
                        className="text-sm font-semibold text-[#1A1208]"
                        style={{ fontFamily: FONTS.body }}
                      >
                        {review.name}
                      </div>
                      <div
                        className="text-xs font-light text-[#6B6256]"
                        style={{ fontFamily: FONTS.body }}
                      >
                        {review.role}, {review.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SEO GUIDES
      ════════════════════════════════ */}
      <section className="bg-[#FDFAF5] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal>
              <Link
                to="/blog/automation-for-uk-letting-agencies"
                className="group block h-full overflow-hidden rounded-2xl border border-[#1A1208]/8 bg-white transition hover:border-[#E8230A]/20 hover:shadow-[0_10px_36px_rgba(26,18,8,0.09)]"
              >
                <div className="h-40 overflow-hidden">
                  <motion.img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=400&fit=crop"
                    alt="Letting agency automation"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div
                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Guide
                  </div>
                  <h3
                    className="mb-2 text-lg font-normal text-[#1A1208] transition group-hover:text-[#E8230A]"
                    style={{ fontFamily: FONTS.heading }}
                  >
                    Automation for UK Letting Agencies
                  </h3>
                  <p
                    className="text-sm font-light leading-7 text-[#6B6256]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    How smart automation saves letting agents 10 or more hours a week and why
                    competitors are already using it.
                  </p>
                  <div
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Read the guide <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link
                to="/blog/business-automation-services-leeds"
                className="group block h-full overflow-hidden rounded-2xl border border-[#1A1208]/8 bg-white transition hover:border-[#E8230A]/20 hover:shadow-[0_10px_36px_rgba(26,18,8,0.09)]"
              >
                <div className="h-40 overflow-hidden">
                  <motion.img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=400&fit=crop"
                    alt="Leeds business automation"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div
                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Guide
                  </div>
                  <h3
                    className="mb-2 text-lg font-normal text-[#1A1208] transition group-hover:text-[#E8230A]"
                    style={{ fontFamily: FONTS.heading }}
                  >
                    Business Automation Services in Leeds
                  </h3>
                  <p
                    className="text-sm font-light leading-7 text-[#6B6256]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Why Leeds based SMEs are turning to workflow automation to grow faster without
                    hiring more staff.
                  </p>
                  <div
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Read the guide <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#E8230A]">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=400&fit=crop"
                    alt="Free discovery call"
                    className="h-full w-full object-cover opacity-30"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="mb-2 text-xl font-normal text-white"
                    style={{ fontFamily: FONTS.heading }}
                  >
                    Not sure where to start?
                  </h3>
                  <p
                    className="text-sm font-light leading-7 text-white/80"
                    style={{ fontFamily: FONTS.body }}
                  >
                    Tell us about your business in 2 minutes. We will tell you exactly what
                    would make the biggest difference, for free.
                  </p>
                  <Link to="/contact" className="mt-5 block">
                    <div
                      className="rounded-xl bg-white py-3 text-center text-sm font-semibold text-[#E8230A] transition hover:bg-white/92"
                      style={{ fontFamily: FONTS.body }}
                    >
                      Book a Free 30 Minute Call
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FINAL CTA
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #FDFAF5 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -right-32 -top-20 h-[540px] w-[540px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A1C 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, #E8230A10 0%, transparent 68%)" }}
          animate={{ scale: [1.05, 1, 1.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating shape */}
        <motion.div
          className="pointer-events-none absolute right-[14%] top-[20%] h-14 w-14 rounded-xl border border-[#E8230A]/18"
          animate={{ y: [0, -16, 0], rotate: [18, 28, 18] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[22%] left-[10%] h-9 w-9 rounded-full border border-white/8"
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <SectionTag light>Ready When You Are</SectionTag>

            <h2
              className="text-4xl font-normal text-white md:text-5xl"
              style={{ fontFamily: FONTS.heading }}
            >
              Let's Fix What's
              <br />
              <em style={{ fontStyle: "italic", color: "#E8230A" }}>
                Slowing You Down.
              </em>
            </h2>

            <p
              className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/50"
              style={{ fontFamily: FONTS.body }}
            >
              Book a free 30 minute discovery call. We look at your current setup, find the biggest
              time and lead gaps, and tell you exactly what to fix. No pitch. No pressure.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-14 rounded-2xl bg-[#E8230A] px-10 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05] hover:shadow-[0_16px_48px_rgba(232,35,10,0.48)]"
                    style={{ fontFamily: FONTS.body }}
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
                    className="h-14 rounded-2xl border-2 border-white/16 bg-transparent px-10 text-base font-medium text-white hover:border-white/30 hover:bg-white/5"
                    style={{ fontFamily: FONTS.body }}
                  >
                    View Packages and Pricing
                  </Button>
                </motion.div>
              </Link>
            </div>

            <p
              className="mt-10 text-sm font-light text-white/25"
              style={{ fontFamily: FONTS.body }}
            >
              NIXRIX LTD · Registered in England and Wales · Leeds, UK · hello@nixrix.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
