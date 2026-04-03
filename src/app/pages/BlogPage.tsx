/**
 * NIXRIX — BlogPage.tsx
 * Blog listing + two published SEO articles
 * Cream backgrounds, red accents, no teal
 * Routes: /blog, /blog/automation-for-uk-letting-agencies, /blog/business-automation-services-leeds
 */

import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";
import { Button }        from "@/app/components/ui/button";

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

// ── Article data ──────────────────────────────────────────────────────────────
const articles = [
  {
    slug: "automation-for-uk-letting-agencies",
    title: "Automation for UK Letting Agencies: How Smart Systems Save 10 or More Hours Every Week",
    excerpt: "Most UK letting agencies are losing time, losing landlords, and missing leads not because they do not work hard enough but because their systems are not working at all. Here is what smart automation actually looks like in practice.",
    category: "Letting Agencies",
    readTime: "6 min read",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop",
    seoTitle: "Automation for UK Letting Agencies | Save 10 Hours Per Week | NIXRIX",
    seoDesc: "How UK letting agencies are using automation to follow up faster, reduce admin, and stop losing landlords to more responsive competitors. NIXRIX, Leeds.",
    seoKeywords: "letting agency automation UK, HubSpot for letting agencies, automate letting agency admin, landlord lead automation Leeds",
    content: `
      <h2>The Problem Most Letting Agencies Have But Few Talk About</h2>
      <p>There are over 15,000 letting agencies in the UK. The vast majority of them are small to medium businesses run by people who got into property because they love property — not because they love spreadsheets, manual follow-up emails, and chasing landlords who enquired three days ago and have now gone somewhere else.</p>
      <p>The issue is not effort. Most letting agency teams work hard. The issue is systems. Or more accurately: the complete absence of them.</p>
      <p>Here is what a typical week looks like for a letting agency without automation in place:</p>
      <ul>
        <li>A landlord enquires through the website on Tuesday afternoon. Nobody sees it until Wednesday morning. By then the landlord has already spoken to a competitor who called back within the hour.</li>
        <li>A viewing is booked. The email confirmation gets sent manually. The follow-up reminder gets forgotten because someone was on another call.</li>
        <li>A tenant asks the same question about deposit protection for the fourth time this month. The reply is typed out fresh each time because the template is in a Word document on someone's desktop.</li>
        <li>End of month reporting means someone spending three hours pulling numbers from a spreadsheet that should have been updated automatically.</li>
      </ul>
      <p>None of this is unusual. All of it is fixable.</p>

      <h2>What Automation Actually Means for a Letting Agency</h2>
      <p>Automation does not mean replacing your team. It means making your team faster, more consistent, and less reliant on remembering things.</p>
      <p>For a letting agency, practical automation looks like this:</p>

      <h3>1. Every Enquiry Gets Followed Up Within Minutes</h3>
      <p>When a landlord or prospective tenant submits a form on your website, their details are automatically created as a contact in HubSpot. An email goes to the relevant team member within 60 seconds. A task is created in the CRM with a deadline for follow-up. The enquirer receives an automated acknowledgement that feels personal, not generic.</p>
      <p>The result is that no enquiry ever gets missed. Your response time drops from hours to minutes. And in a market where landlords are comparing three agencies at once, being the one that responds first is often the deciding factor.</p>

      <h3>2. Viewing Confirmations and Reminders Happen Automatically</h3>
      <p>Once a viewing is booked, the confirmation email goes out automatically. A reminder goes out 24 hours before. A post-viewing follow-up lands the day after. None of this requires anyone to remember to do it. It just happens.</p>

      <h3>3. Your CRM Tracks Every Landlord and Tenant Relationship</h3>
      <p>HubSpot configured properly for a letting agency means you can see at a glance which landlords are active, which properties are available, which tenancies are coming up for renewal, and which leads have not been followed up. It turns a fragmented email inbox into a structured system.</p>

      <h3>4. Monthly Reporting Takes Minutes Not Hours</h3>
      <p>When your data is flowing into a live dashboard, your end of month reporting stops being a manual exercise. The numbers are already there. Updated in real time. In plain English.</p>

      <h2>What the Agency Smart Pack Includes</h2>
      <p>NIXRIX built the Agency Smart Pack specifically for UK letting agencies. It is not a generic website and CRM bundle. It is built around the specific workflows that letting agencies actually use.</p>
      <p>For £2,697 it includes a professional agency website, a fully configured HubSpot CRM with tenant and landlord pipelines, automation from website enquiry to HubSpot contact to team notification, email follow-up templates written for letting agency contexts, and a compliance-aware setup. Delivered in 7 to 10 days.</p>

      <h2>The Agencies Already Doing This Are Winning</h2>
      <p>The letting agencies that have invested in connected systems are not just saving time. They are winning business that less responsive competitors are losing. Speed of response is the single biggest factor landlords cite when choosing a letting agency. Automation gives you that speed without needing to be glued to your inbox all day.</p>
      <p>If you are still operating on a combination of manual emails, spreadsheets, and a website that does not connect to anything, the gap between you and your connected competitors is growing every week.</p>
      <p>The good news is it is not complicated to fix. Book a free 30 minute call with NIXRIX and we will show you exactly what your agency could look like with proper systems in place.</p>
    `,
  },
  {
    slug: "business-automation-services-leeds",
    title: "Business Automation Services in Leeds: Why Local SMEs Are Choosing Smart Systems Over Extra Staff",
    excerpt: "Leeds has a growing community of small businesses doing serious work. The ones pulling ahead have one thing in common: they have stopped doing manually what a system can do automatically. Here is why that shift matters and how it works.",
    category: "UK Business Automation",
    readTime: "5 min read",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=700&fit=crop",
    seoTitle: "Business Automation Services Leeds | NIXRIX UK SME Automation",
    seoDesc: "Why Leeds-based SMEs are turning to workflow automation, HubSpot CRM and live dashboards to grow faster without hiring more staff. NIXRIX, Leeds.",
    seoKeywords: "business automation Leeds, workflow automation UK SME, HubSpot setup Leeds, Power BI dashboard Leeds, automation agency Leeds",
    content: `
      <h2>Leeds Businesses Are Growing. The Question Is Whether Their Systems Are Keeping Up.</h2>
      <p>Leeds has a genuinely strong small business community. From professional services in the city centre to independent retailers in the surrounding areas, there is real ambition here. But ambition only takes you so far if the operational infrastructure is not keeping pace.</p>
      <p>The pattern we see consistently across Leeds-based SMEs is this: the business grows, the team grows, but the systems stay the same. What was manageable at five clients becomes chaotic at fifty. What could be handled by one person through sheer effort requires three people and still gets missed.</p>
      <p>The answer, for most businesses at this stage, is not more staff. It is better systems.</p>

      <h2>What Business Automation Actually Means for a Small Business</h2>
      <p>The phrase business automation gets used a lot and means almost nothing on its own. So here is what it looks like in practice for a typical Leeds SME:</p>

      <h3>Lead Capture and Follow-Up</h3>
      <p>A new enquiry comes through your website. Without automation: it sits in an inbox, gets read when someone has a moment, and followed up when someone remembers. With automation: the enquiry creates a contact in your CRM, notifies the right person immediately, and triggers a follow-up task with a deadline. The prospective client hears from you within minutes, not days.</p>

      <h3>Repetitive Admin That Eats Half the Week</h3>
      <p>Most small business owners can name immediately the tasks they do every week that should not require a human. Sending the same confirmation email. Updating a spreadsheet after every sale. Chasing the same overdue invoice. These are not complex tasks. They are just time-consuming. Automation handles them in the background while your team focuses on work that actually requires their skills.</p>

      <h3>Visibility on What Is Actually Happening</h3>
      <p>The other thing that holds growing businesses back is the absence of data. Not raw data — most businesses have plenty of that sitting in spreadsheets and CRMs and email inboxes. Usable data. Data that tells you at a glance which part of the business is performing, where leads are coming from, which products or services are most profitable, and where your team's time is actually going.</p>
      <p>A Power BI dashboard connected to your existing tools gives you that visibility in real time without anyone needing to compile a report.</p>

      <h2>Why Local Matters</h2>
      <p>NIXRIX is based in Leeds. That matters for two reasons.</p>
      <p>First, we understand the Leeds market. We know the industries, the pace, and the kinds of businesses operating here. We are not applying a template built for London agencies to Yorkshire SMEs.</p>
      <p>Second, we are genuinely accessible. When you book a call with NIXRIX you speak to the founders. You get a response the same day. The person who builds your system is the same person who agreed the scope with you. There is no account management layer between you and the people doing the work.</p>

      <h2>The No-Migration Principle</h2>
      <p>One of the most common objections we hear from Leeds businesses considering automation is: we do not have time to change our systems. We are too busy to migrate everything to a new platform.</p>
      <p>Our answer is simple: we do not ask you to. NIXRIX's core principle is that we add to what you already have. We connect to your existing email, your existing spreadsheets, your existing CRM. We build automation on top of the tools your team already knows. Nothing gets switched out. Nothing gets disrupted. Your workflow continues as it was — it just becomes faster and more automatic.</p>

      <h2>Where to Start</h2>
      <p>If you are a Leeds-based business spending too much time on manual work, missing leads, or making decisions without clear data, the best first step is a free 30 minute discovery call.</p>
      <p>In that call we look at your current setup together, identify the biggest time and lead gaps, and recommend the right starting point. There is no obligation to proceed and no pressure to buy anything on the call.</p>
      <p>Book yours at nixrix.com/contact.</p>
    `,
  },
];

// ── Blog listing ──────────────────────────────────────────────────────────────
function BlogListing() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily:F.b, background:"#FDFAF5" }}>
      <SEOHead
        title="Blog | NIXRIX UK Business Automation"
        description="Guides and insights on business automation, letting agency systems, CRM setup, Power BI dashboards, and workflow automation for UK small businesses."
        keywords="UK business automation blog, letting agency automation guide, HubSpot CRM guide, Power BI SME, workflow automation UK"
      />
      <ChatbotWidget />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-28"
        style={{ background:"linear-gradient(145deg, #EDD8BB 0%, #F0E2C8 45%, #F5EDE0 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage:"radial-gradient(circle, #1A1208 1px, transparent 1px)", backgroundSize:"38px 38px" }} />
        <motion.div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full"
          style={{ background:"radial-gradient(circle, #E8230A14 0%, transparent 68%)" }}
          animate={{ scale:[1,1.1,1] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-7 bg-[#E8230A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8230A]" style={{ fontFamily:F.b }}>Insights and Guides</span>
            <div className="h-px w-7 bg-[#E8230A]" />
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }}
            className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.75rem]" style={{ fontFamily:F.h }}>
            Practical Guides for
            <br />
            <em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>UK Small Businesses.</em>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }}
            className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-[#1A1208]/70" style={{ fontFamily:F.b }}>
            No filler. No generic advice. Just practical guides on automation, CRM, dashboards, and
            digital systems — written for UK businesses that want real results.
          </motion.p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {articles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i*0.1}>
                <Link to={`/blog/${article.slug}`}>
                  <motion.div whileHover={{ y:-7, borderColor:"#E8230A", boxShadow:"0 18px 48px rgba(232,35,10,0.12)" }}
                    transition={{ type:"spring", stiffness:260 }}
                    className="group overflow-hidden rounded-2xl border border-[#1A1208]/10 bg-white shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                    <div className="h-52 overflow-hidden">
                      <motion.img src={article.image} alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E8230A]/10 px-3 py-1 text-[11px] font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>
                          <Tag className="h-3 w-3" />{article.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-light text-[#1A1208]/45" style={{ fontFamily:F.b }}>
                          <Clock className="h-3 w-3" />{article.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-light text-[#1A1208]/45" style={{ fontFamily:F.b }}>
                          <Calendar className="h-3 w-3" />{article.date}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-normal leading-snug text-[#1A1208] transition group-hover:text-[#E8230A]" style={{ fontFamily:F.h }}>
                        {article.title}
                      </h2>
                      <p className="mb-4 text-sm font-light leading-7 text-[#1A1208]/60" style={{ fontFamily:F.b }}>
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8230A]" style={{ fontFamily:F.b }}>
                        Read the guide <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon card */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 rounded-2xl border border-dashed border-[#1A1208]/14 bg-[#F5EDE0] p-8 text-center">
              <p className="mb-1 text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>More guides coming soon</p>
              <p className="text-sm font-light text-[#1A1208]/55" style={{ fontFamily:F.b }}>
                We are writing practical guides on HubSpot for small businesses, Power BI for non-technical teams,
                and how to automate your most repetitive workflows.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#1A1208] py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"radial-gradient(circle, #FDFAF5 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-normal text-white md:text-4xl" style={{ fontFamily:F.h }}>
              Ready to Put This Into Practice?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-light leading-[1.85] text-white/55" style={{ fontFamily:F.b }}>
              Book a free discovery call and we will show you exactly how these systems would work for your business.
            </p>
            <Link to="/contact" className="mt-8 inline-block">
              <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                <Button size="lg"
                  className="h-13 rounded-2xl bg-[#E8230A] px-9 text-base font-semibold text-white shadow-[0_10px_36px_rgba(232,35,10,0.38)] hover:bg-[#C01A05]"
                  style={{ fontFamily:F.b }}>
                  Book Free Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// ── Single article view ───────────────────────────────────────────────────────
function ArticleView({ article }: { article: typeof articles[0] }) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily:F.b, background:"#FDFAF5" }}>
      <SEOHead
        title={article.seoTitle}
        description={article.seoDesc}
        keywords={article.seoKeywords}
      />
      <ChatbotWidget />

      {/* Hero image */}
      <section className="relative h-72 overflow-hidden lg:h-96">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/70 via-[#1A1208]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#E8230A] px-3 py-1 text-[11px] font-semibold text-white" style={{ fontFamily:F.b }}>
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-light text-white/60" style={{ fontFamily:F.b }}>
                <Clock className="h-3 w-3" />{article.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-light text-white/60" style={{ fontFamily:F.b }}>
                <Calendar className="h-3 w-3" />{article.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16" style={{ background:"#FDFAF5" }}>
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-light text-[#1A1208]/45" style={{ fontFamily:F.b }}>
            <Link to="/blog" className="hover:text-[#E8230A]">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1A1208]/65">{article.category}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Content */}
            <article>
              <h1 className="mb-6 text-3xl font-normal leading-[1.2] text-[#1A1208] sm:text-4xl" style={{ fontFamily:F.h }}>
                {article.title}
              </h1>

              <div
                className="prose-content text-[#1A1208]/80"
                style={{ fontFamily:F.b }}
                dangerouslySetInnerHTML={{ __html: article.content
                  .replace(/<h2>/g, `<h2 style="font-family:${F.h};font-size:1.5rem;font-weight:400;color:#1A1208;margin:2rem 0 0.75rem;line-height:1.3">`)
                  .replace(/<h3>/g, `<h3 style="font-family:${F.h};font-size:1.2rem;font-weight:400;color:#1A1208;margin:1.75rem 0 0.5rem;font-style:italic">`)
                  .replace(/<p>/g, `<p style="font-size:0.95rem;line-height:1.85;margin-bottom:1rem;font-weight:300">`)
                  .replace(/<ul>/g, `<ul style="margin:0.75rem 0 1rem 1.25rem;space-y:0.25rem">`)
                  .replace(/<li>/g, `<li style="font-size:0.9rem;line-height:1.7;font-weight:300;margin-bottom:0.35rem;list-style-type:disc">`)
                }}
              />

              {/* Article CTA */}
              <div className="mt-12 rounded-2xl bg-[#E8230A] p-8 text-white">
                <h3 className="mb-2 text-xl font-normal" style={{ fontFamily:F.h }}>Ready to put this into practice?</h3>
                <p className="mb-5 text-sm font-light leading-7 text-white/80" style={{ fontFamily:F.b }}>
                  Book a free 30 minute discovery call. We will look at your current setup and tell you
                  exactly what to fix first.
                </p>
                <Link to="/contact">
                  <Button className="rounded-xl bg-white text-[#E8230A] hover:bg-white/92 font-semibold" style={{ fontFamily:F.b }}>
                    Book Free Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-[#1A1208]/10 bg-white p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">
                <h4 className="mb-4 text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>Related Services</h4>
                <div className="space-y-2">
                  {[
                    { label:"Agency Smart Pack", path:"/services" },
                    { label:"The Connector (HubSpot)", path:"/services" },
                    { label:"NIXRIX Command", path:"/services" },
                    { label:"NIXRIX Intelligence", path:"/services" },
                  ].map((s, i) => (
                    <Link key={i} to={s.path}
                      className="flex items-center justify-between rounded-lg border border-[#1A1208]/8 px-4 py-2.5 text-sm font-medium text-[#1A1208] transition hover:border-[#E8230A]/30 hover:text-[#E8230A]"
                      style={{ fontFamily:F.b }}>
                      {s.label}
                      <ChevronRight className="h-3.5 w-3.5 text-[#E8230A]/60" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#1A1208]/10 bg-[#F5EDE0] p-5">
                <h4 className="mb-2 text-sm font-semibold text-[#1A1208]" style={{ fontFamily:F.b }}>Other Guides</h4>
                {articles.filter(a => a.slug !== article.slug).map(a => (
                  <Link key={a.slug} to={`/blog/${a.slug}`}
                    className="group mt-3 block rounded-xl border border-[#1A1208]/10 bg-white p-4 transition hover:border-[#E8230A]/30">
                    <p className="text-xs font-semibold text-[#E8230A] transition group-hover:text-[#E8230A]" style={{ fontFamily:F.b }}>
                      {a.category}
                    </p>
                    <p className="mt-1 text-sm font-light leading-5 text-[#1A1208]" style={{ fontFamily:F.b }}>
                      {a.title.slice(0,60)}...
                    </p>
                  </Link>
                ))}
              </div>

              <Link to="/contact">
                <div className="rounded-2xl bg-[#1A1208] p-5 text-white transition hover:bg-[#E8230A]">
                  <p className="mb-1 text-sm font-semibold" style={{ fontFamily:F.b }}>Book a Free Call</p>
                  <p className="text-xs font-light text-white/65" style={{ fontFamily:F.b }}>
                    30 minutes. No pressure. Just honest advice.
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white/80" style={{ fontFamily:F.b }}>
                    Book now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </aside>
          </div>

          {/* Back to blog */}
          <div className="mt-12 border-t border-[#1A1208]/8 pt-8">
            <Link to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1208]/60 transition hover:text-[#E8230A]"
              style={{ fontFamily:F.b }}>
              ← Back to all guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Router component ──────────────────────────────────────────────────────────
export function BlogPage() {
  const { slug } = useParams<{ slug?: string }>();
  if (slug) {
    const article = articles.find(a => a.slug === slug);
    if (article) return <ArticleView article={article} />;
    // 404 fallback
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:"#FDFAF5", fontFamily:F.b }}>
        <div className="text-center">
          <h1 className="text-4xl font-normal text-[#1A1208] mb-4" style={{ fontFamily:F.h }}>Article not found</h1>
          <Link to="/blog">
            <Button className="bg-[#E8230A] text-white hover:bg-[#C01A05]">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  return <BlogListing />;
}
