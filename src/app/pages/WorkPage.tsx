import { Link }       from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";
import { Tag, HoverCard, ReviewRibbon, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

const projects = [
  { id:"meridian", tag:"Letting Agency", name:"Meridian Lettings", location:"Leeds, UK", service:"Agency Smart Pack", image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&h=650&fit=crop", challenge:"Landlord enquiries were arriving through the website but nobody was following up consistently. The team had no CRM, no pipeline visibility, and no way to know which leads had gone cold.", solution:"We deployed the Agency Smart Pack — a professional agency website connected directly to a fully configured HubSpot CRM. Every form submission now creates a contact, notifies the right team member, and triggers an automated follow-up sequence.", results:["Landlord response time dramatically reduced","Every enquiry tracked with full pipeline visibility","Follow-up automation running without team input","Professional new website generating consistent enquiries"], type:"Website + CRM + Automation" },
  { id:"apex", tag:"Professional Services", name:"Apex Accounting", location:"Manchester, UK", service:"NIXRIX Autopilot", image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=650&fit=crop", challenge:"The team was spending several hours per week copying client data between systems, chasing document approvals by email, and manually sending the same onboarding sequence to every new client.", solution:"NIXRIX Autopilot — a Make.com automation workflow that handles document processing, client onboarding emails, and data sync between their practice management software and HubSpot.", results:["Client onboarding sequence fully automated","Document processing handled without team input","Data sync running between three tools with no manual copying","Significant weekly hours saved across the team"], type:"CRM + Automation + Workflow" },
  { id:"greenview", tag:"Letting Agency", name:"Greenview Lettings", location:"Birmingham, UK", service:"NIXRIX Intelligence", image:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1000&h=650&fit=crop", challenge:"The director had data in three different systems and no way to see performance across all three without spending hours compiling a manual report at month-end.", solution:"NIXRIX Intelligence built a Power BI dashboard connecting all three data sources into one live view, updated in real time.", results:["Month-end reporting reduced from hours to minutes","Live visibility on landlord pipeline and property performance","Team activity tracked without manual updates","Faster, more confident business decisions"], type:"Power BI Dashboard" },
  { id:"nova", tag:"Business Consultancy", name:"Nova Consulting Group", location:"Leeds, UK", service:"NIXRIX Launchpad", image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=650&fit=crop", challenge:"A respected consultancy running entirely on word-of-mouth but with no website presence that reflected the quality of their work. Prospective clients were Googling the company and finding almost nothing.", solution:"NIXRIX Launchpad — a full multi-page business website built to convert, with SEO foundations throughout, lead capture connected to HubSpot, and Google Analytics configured from day one.", results:["Professional website live and generating inbound enquiries","Appearing in Google search results within weeks","Lead capture connected and CRM populated automatically","Team able to point prospects to a site that matches their reputation"], type:"Full Business Website + SEO" },
];

export function WorkPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="Our Work | NIXRIX UK Business Automation Projects" description="See how NIXRIX has helped UK letting agencies, accountants, consultancies and SMEs replace manual work with smart websites, CRM automation and live Power BI dashboards." keywords="NIXRIX work portfolio, UK business automation case studies, letting agency CRM project, HubSpot automation example, Power BI dashboard UK SME" schemaType="organization" canonicalPath="/work" />
      <ChatbotWidget />

      {/* HERO — lightest */}
      <section className="relative overflow-hidden py-28 lg:py-32" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        <RedOrb className="-right-20 -top-20" size={440} />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/55" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li><li>/</li>
              <li aria-current="page" className="text-[#E8230A]">Our Work</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}><Tag>Our Work</Tag></motion.div>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }} className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: F.h }}>
            Real Businesses.<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Real Systems. Real Results.</em>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mx-auto mt-7 max-w-2xl text-lg font-light leading-[1.85] text-[#1A1208]/68" style={{ fontFamily: F.b }}>
            Every project below is a real brief, a real challenge, and a real outcome. See how NIXRIX has helped UK businesses replace manual work with connected, automated digital systems.
          </motion.p>
        </div>
      </section>

      {/* PROJECTS — s1 */}
      <section className="py-24" style={{ background: BG.s1 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={0.04}>
                <article className={`grid items-center gap-12 lg:grid-cols-2 ${i%2!==0 ? "lg:[&>*:first-child]:order-2" : ""}`}>

                  {/* Image */}
                  <HoverCard className="relative overflow-hidden rounded-2xl border border-[#1A1208]/8 shadow-[0_8px_40px_rgba(26,18,8,0.10)]">
                    <img src={project.image} alt={`${project.name} — ${project.type}`} className="h-72 w-full object-cover lg:h-96" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/55 via-[#1A1208]/10 to-transparent" />
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full bg-[#E8230A] px-4 py-1.5 text-xs font-semibold text-white shadow-lg" style={{ fontFamily: F.b }}>{project.tag}</span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="rounded-xl border border-white/14 bg-[#1A1208]/70 px-4 py-3 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>Package Used</p>
                        {/* Package name in red */}
                        <p className="mt-0.5 text-sm font-semibold text-[#E8230A]" style={{ fontFamily: F.b }}>{project.service}</p>
                        <p className="text-xs font-light text-white/60" style={{ fontFamily: F.b }}>{project.type}</p>
                      </div>
                    </div>
                  </HoverCard>

                  {/* Content */}
                  <div>
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#E8230A]" style={{ fontFamily: F.b }}>{project.location}</span>
                    <h2 className="mb-5 text-3xl font-normal text-[#1A1208] md:text-4xl" style={{ fontFamily: F.h }}>{project.name}</h2>

                    <div className="mb-4 rounded-xl border border-[#1A1208]/8 bg-white p-5">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B6256]" style={{ fontFamily: F.b }}>The challenge</p>
                      <p className="text-sm font-light leading-7 text-[#1A1208]/68" style={{ fontFamily: F.b }}>{project.challenge}</p>
                    </div>

                    <div className="mb-4 rounded-xl border border-[#1A1208]/8 bg-white p-5">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B6256]" style={{ fontFamily: F.b }}>What we built</p>
                      <p className="text-sm font-light leading-7 text-[#1A1208]/68" style={{ fontFamily: F.b }}>{project.solution}</p>
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

      {/* REVIEWS — s2 */}
      <section style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <Tag>Client Reviews</Tag>
            <h2 className="text-4xl font-normal text-[#1A1208] md:text-5xl" style={{ fontFamily: F.h }}>What Our Clients Say</h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light text-[#1A1208]/60" style={{ fontFamily: F.b }}>Real feedback from UK business owners who replaced manual work with NIXRIX systems.</p>
          </ScrollReveal>
        </div>
        <ReviewRibbon bg={BG.s2} /><div className="pb-16" style={{ background: BG.s2 }} />
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-[#1A1208] py-28">
        <DotPattern opacity={0.05} /><RedOrb className="-right-24 -top-16" size={420} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <Tag onDark>Start Your Project</Tag>
            <h2 className="text-4xl font-normal text-white md:text-5xl" style={{ fontFamily: F.h }}>Your Business Could Be<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>The Next One Here.</em></h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-white/55" style={{ fontFamily: F.b }}>Book a free 30 minute discovery call. We look at your current setup and tell you exactly what to build first.</p>
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
