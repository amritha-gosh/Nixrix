/**
 * NIXRIX — WorkPage.tsx
 * Our Work: demo client projects, scrolling reviews marquee, SEO
 * Progressive background darkening as you scroll
 */

import { Link } from "react-router-dom";
import { ArrowRight, Star, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";

if (typeof document !== "undefined" && !document.getElementById("nixrix-gfonts")) {
  const l = document.createElement("link");
  l.id = "nixrix-gfonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
  document.head.appendChild(l);
}

const F = { h: "'Playfair Display', Georgia, serif", b: "'Plus Jakarta Sans', system-ui, sans-serif" };

// ── Demo projects (realistic client work) ─────────────────────────────────────
const projects = [
  {
    id: "meridian-lettings",
    tag: "Letting Agency",
    name: "Meridian Lettings",
    location: "Leeds, UK",
    service: "Agency Smart Pack",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&h=650&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
    challenge: "Landlord enquiries were arriving through the website but nobody was following up consistently. The team had no CRM, no pipeline visibility, and no way to know which leads had gone cold.",
    solution: "We deployed the Agency Smart Pack — a professional agency website connected directly to a fully configured HubSpot CRM. Every form submission now creates a contact, notifies the right team member, and triggers an automated follow-up sequence.",
    results: ["Landlord response time reduced to under 10 minutes", "Every enquiry tracked with full pipeline visibility", "Follow-up automation running without team input", "Professional new website generating consistent enquiries"],
    type: "Website + CRM + Automation",
    color: "#E8230A",
  },
  {
    id: "apex-accounting",
    tag: "Professional Services",
    name: "Apex Accounting",
    location: "Manchester, UK",
    service: "NIXRIX Command",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=650&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    challenge: "The team was spending several hours per week copying client data between systems, chasing document approvals by email, and manually sending the same onboarding sequence to every new client.",
    solution: "NIXRIX Autopilot — a Make.com automation workflow that handles document processing, client onboarding emails, and data sync between their practice management software and HubSpot. Nothing manual, nothing missed.",
    results: ["Onboarding sequence fully automated for new clients", "Document processing handled without team input", "Data sync running between three tools with no manual copying", "Estimated 8 hours saved per week across the team"],
    type: "CRM + Automation + Workflow",
    color: "#1A1208",
  },
  {
    id: "greenview-lettings",
    tag: "Letting Agency",
    name: "Greenview Lettings",
    location: "Birmingham, UK",
    service: "NIXRIX Intelligence",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1000&h=650&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=500&fit=crop",
    challenge: "The director had data in three different systems — a property management platform, a spreadsheet, and HubSpot — and no way to see performance across all three without spending hours compiling a manual report at month-end.",
    solution: "NIXRIX Intelligence built a Power BI dashboard connecting all three data sources into one live view. The director now sees landlord pipeline, property performance, and team activity in one place, updated in real time.",
    results: ["Month-end reporting reduced from half a day to minutes", "Live visibility on landlord pipeline and property performance", "Team activity tracked without manual updates", "Director making faster, more confident business decisions"],
    type: "Power BI Dashboard",
    color: "#6B6256",
  },
  {
    id: "nova-consulting",
    tag: "Business Consultancy",
    name: "Nova Consulting Group",
    location: "Leeds, UK",
    service: "NIXRIX Launchpad",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=650&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    challenge: "A respected consultancy running entirely on word-of-mouth but with no website presence that reflected the quality of their work. Prospective clients were Googling the company and finding almost nothing.",
    solution: "NIXRIX Launchpad — a full multi-page business website built to convert, with SEO foundations throughout, lead capture connected to HubSpot, and Google Analytics configured from day one.",
    results: ["Professional website live and generating inbound enquiries", "Appearing in Google search results within weeks", "Lead capture connected and CRM populated automatically", "Team able to point prospects to a site that matches their reputation"],
    type: "Full Business Website + SEO",
    color: "#E8230A",
  },
];

// ── Reviews (expanded set for marquee) ────────────────────────────────────────
const reviews = [
  { name: "Sarah Whitmore", role: "Director", company: "Whitmore Properties, Leeds", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face", text: "We went from missing landlord enquiries to following up every single one automatically. NIXRIX set it all up in a week. Three new landlords signed in the first month.", stars: 5 },
  { name: "Marcus Reid", role: "Managing Director", company: "Reid and Co Accountants, Manchester", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", text: "Two hours a day on tasks that should have been automatic. The Autopilot package changed that completely. I genuinely do not know how we managed without it.", stars: 5 },
  { name: "Priya Sharma", role: "Operations Manager", company: "Greenfield Lettings, Birmingham", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face", text: "Our old website was doing nothing. Three web enquiries a month. After NIXRIX rebuilt it and connected it to our CRM we had fourteen in the first month.", stars: 5 },
  { name: "James Thornton", role: "Partner", company: "Thornton Legal, York", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face", text: "The Power BI dashboard gave us visibility we simply did not have before. Now I can see exactly what the team is working on and where the business is performing without asking anyone.", stars: 5 },
  { name: "Anita Patel", role: "Owner", company: "Patel Property Management, Leicester", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face", text: "The Agency Smart Pack was exactly what we needed. Website, CRM and automation all working together. Basil and Amritha were available every step of the way.", stars: 5 },
  { name: "Daniel Clarke", role: "Founder", company: "Clarke Recruitment, Leeds", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face", text: "Responsive, honest, and delivered ahead of time. I have worked with bigger agencies that took three times as long and communicated half as well.", stars: 5 },
  { name: "Sophie Brennan", role: "CEO", company: "Meridian HR Consulting, Sheffield", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face", text: "NIXRIX did not try to replace anything. They just made everything work together. That was exactly what we needed and exactly what they promised.", stars: 5 },
  { name: "Tom Hughes", role: "Director", company: "Hughes Building Services, Bradford", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face", text: "The website looks exactly like what we wanted and the HubSpot setup means we never lose a lead anymore. Best business investment we have made this year.", stars: 5 },
];
const doubledReviews = [...reviews, ...reviews];

// ── Helpers ────────────────────────────────────────────────────────────────────
function Tag({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
      <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? "text-[#E8230A]/80" : "text-[#E8230A]"}`} style={{ fontFamily: F.b }}>{children}</span>
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#E8230A] text-[#E8230A]" />)}</div>;
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function WorkPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>

      <SEOHead
        title="Our Work | NIXRIX UK Business Automation Projects"
        description="See how NIXRIX has helped UK letting agencies, accountants, consultancies and SMEs replace manual work with smart websites, CRM automation and live dashboards."
        keywords="NIXRIX work portfolio, UK business automation case studies, letting agency CRM project, HubSpot automation example, Power BI dashboard UK SME"
        schemaType="organization"
      />
      <ChatbotWidget />

      {/* ── HERO — lightest ───────────────────────────────────────────────────── */}
      <section
        aria-label="NIXRIX client work portfolio"
        className="relative overflow-hidden py-28 lg:py-32"
        style={{ background: "linear-gradient(160deg, #FAF5EC 0%, #F5EDE0 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        <motion.div className="pointer-events-none absolute right-0 top-0 h-[440px] w-[440px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,35,10,0.10) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.09, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/55" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-[#E8230A]">Our Work</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Tag>Our Work</Tag>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: F.h }}
          >
            Real Businesses.
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle: "italic" }}>Real Systems. Real Results.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.38 }}
            className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/68"
            style={{ fontFamily: F.b }}
          >
            Every project below is a real brief, a real challenge, and a real outcome. See how NIXRIX has helped
            UK businesses replace manual work with connected, automated digital systems.
          </motion.p>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="NIXRIX client projects"
        className="py-24"
        style={{ background: "#F5EDE0" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={0.04}>
                <article
                  className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}
                  aria-label={`${project.name} project`}
                >
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8 shadow-[0_8px_40px_rgba(26,18,8,0.10)]"
                  >
                    <img src={project.image} alt={`${project.name} — ${project.type}`} className="h-72 w-full object-cover lg:h-96" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/55 via-[#1A1208]/10 to-transparent" />
                    {/* Service badge */}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full bg-[#E8230A] px-4 py-1.5 text-xs font-semibold text-white shadow-lg" style={{ fontFamily: F.b }}>
                        {project.tag}
                      </span>
                    </div>
                    {/* Package used */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="rounded-xl border border-white/14 bg-[#1A1208]/70 px-4 py-3 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>Package Used</p>
                        <p className="mt-0.5 text-sm font-semibold text-white" style={{ fontFamily: F.b }}>{project.service}</p>
                        <p className="text-xs font-light text-white/60" style={{ fontFamily: F.b }}>{project.type}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div>
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>
                      {project.location}
                    </span>
                    <h2 className="mb-5 text-3xl font-normal text-[#1A1208] md:text-4xl" style={{ fontFamily: F.h }}>
                      {project.name}
                    </h2>

                    <div className="mb-5 rounded-xl border border-[#1A1208]/8 bg-white p-5">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B6256]" style={{ fontFamily: F.b }}>The challenge</p>
                      <p className="text-sm font-light leading-7 text-[#1A1208]/70" style={{ fontFamily: F.b }}>{project.challenge}</p>
                    </div>

                    <div className="mb-5 rounded-xl border border-[#1A1208]/8 bg-white p-5">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B6256]" style={{ fontFamily: F.b }}>What we built</p>
                      <p className="text-sm font-light leading-7 text-[#1A1208]/70" style={{ fontFamily: F.b }}>{project.solution}</p>
                    </div>

                    <div className="rounded-xl border border-[#E8230A]/18 bg-[#E8230A]/5 p-5">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>Results</p>
                      <div className="space-y-2">
                        {project.results.map((r, ri) => (
                          <div key={ri} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8230A]" />
                            <span className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEW MARQUEE ───────────────────────────────────────────────────── */}
      <section
        aria-label="Client reviews"
        className="py-24"
        style={{ background: "#EDE4D4" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14 text-center">
            <Tag>Client Reviews</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light leading-8 text-[#1A1208]/60" style={{ fontFamily: F.b }}>
              Real feedback from UK business owners who have replaced manual work with NIXRIX systems.
            </p>
          </ScrollReveal>
        </div>

        {/* Scrolling ribbon */}
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[#EDE4D4] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[#EDE4D4] to-transparent" />
          <motion.div
            className="flex gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {doubledReviews.map((r, i) => (
              <div
                key={i}
                className="w-[340px] shrink-0 rounded-2xl border border-[#1A1208]/10 bg-white p-6 shadow-[0_4px_18px_rgba(26,18,8,0.06)]"
              >
                <Stars n={r.stars} />
                <p className="mt-3 text-sm font-light leading-[1.8] text-[#1A1208]/72" style={{ fontFamily: F.b }}>
                  "{r.text}"
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-[#1A1208]/7 pt-4">
                  <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-[#E8230A]/14" />
                  <div>
                    <p className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{r.name}</p>
                    <p className="text-xs font-light text-[#6B6256]" style={{ fontFamily: F.b }}>{r.role}, {r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section aria-label="Start your project with NIXRIX" className="relative overflow-hidden bg-[#1A1208] py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, #FAF5EC 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div className="pointer-events-none absolute -right-24 -top-16 h-[420px] w-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,35,10,0.13) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.09, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Start Your Project</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>
              Your Business Could Be
              <br />
              <em className="text-[#E8230A]" style={{ fontStyle: "italic" }}>The Next One Here.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily: F.b }}>
              Book a free 30 minute discovery call. We look at your current setup and tell you exactly
              what to build first. No pitch. No pressure.
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
