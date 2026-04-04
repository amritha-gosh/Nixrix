import { useState } from "react";
import { Link }      from "react-router-dom";
import { Send, MapPin, Mail, Phone, Clock, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { Button }        from "@/app/components/ui/button";
import { Input }         from "@/app/components/ui/input";
import { Label }         from "@/app/components/ui/label";
import { Textarea }      from "@/app/components/ui/textarea";
import { ScrollReveal }  from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead }       from "@/app/components/SEOHead";
import { motion }        from "motion/react";
import { Tag, DotPattern, RedOrb, BG, F, injectFonts } from "./_nixrix-helpers";

injectFonts();

const serviceOptions = [
  { value:"",              label:"Select what you need help with"    },
  { value:"spark",         label:"The Spark — One page website"      },
  { value:"impression",    label:"The Impression — Logo and brand kit"},
  { value:"magnet",        label:"The Magnet — Lead landing page"    },
  { value:"connector",     label:"The Connector — HubSpot CRM setup" },
  { value:"launchpad",     label:"NIXRIX Launchpad — Full website"    },
  { value:"command",       label:"NIXRIX Command — CRM and automation"},
  { value:"momentum",      label:"NIXRIX Momentum — Social content"  },
  { value:"intelligence",  label:"NIXRIX Intelligence — Power BI"    },
  { value:"autopilot",     label:"NIXRIX Autopilot — AI automation"  },
  { value:"agency_smart",  label:"Agency Smart Pack — Letting agencies"},
  { value:"retainer",      label:"NIXRIX Grow Retainer — Monthly support"},
  { value:"not_sure",      label:"Not sure yet — help me decide"     },
];

export function ContactPage() {
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", service:"", message:"" });
  const [focused, setFocused] = useState<string|null>(null);
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim())         { setStatus("error"); setStatusMsg("Please enter your name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setStatus("error"); setStatusMsg("Please enter a valid email address."); return; }
    if (!form.service)             { setStatus("error"); setStatusMsg("Please select what you need help with."); return; }
    if (!form.message.trim())      { setStatus("error"); setStatusMsg("Please tell us a bit about your situation."); return; }

    const subject = `NIXRIX Enquiry — ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Company: ${form.company.trim() || "Not provided"}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || "Not provided"}`,
      `Service of interest: ${serviceOptions.find(o=>o.value===form.service)?.label || form.service}`,
      ``,`Message:`, form.message.trim(),
    ].join("\n");

    window.location.href = `mailto:hello@nixrix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    setStatusMsg("Your email app should open with your enquiry pre-filled. Send it to complete your enquiry.");
  }

  const ic = (field: string) =>
    `border-[#1A1208]/18 bg-[#FAF5EC] text-[#1A1208] placeholder:text-[#6B6256]/45 transition-all focus:border-[#E8230A]/50 focus:ring-1 focus:ring-[#E8230A]/25 ${focused===field?"border-[#E8230A]/50 ring-1 ring-[#E8230A]/25":""}`;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: F.b }}>
      <SEOHead title="Contact NIXRIX | Book a Free Discovery Call — Leeds UK" description="Book a free 30 minute discovery call with NIXRIX. Tell us about your business and we will tell you exactly what would make the biggest difference. hello@nixrix.com | 07492 712144" keywords="contact NIXRIX, book UK business automation call, NIXRIX discovery call Leeds, letting agency automation enquiry UK" schemaType="local" canonicalPath="/contact" />
      <ChatbotWidget />

      {/* HERO — lightest */}
      <section className="relative overflow-hidden py-24 lg:py-28" style={{ background: BG.hero }}>
        <DotPattern opacity={0.04} />
        <RedOrb className="-right-20 -top-16" size={420} />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs text-[#6B6256]/55" style={{ fontFamily: F.b }}>
              <li><Link to="/" className="hover:text-[#E8230A]">Home</Link></li><li>/</li>
              <li aria-current="page" className="text-[#E8230A]">Contact</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}><Tag>Get in Touch</Tag></motion.div>
          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2 }} className="text-4xl font-normal leading-[1.1] text-[#1A1208] sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: F.h }}>
            Let's Talk About<br /><em className="text-[#E8230A]" style={{ fontStyle:"italic" }}>Your Business.</em>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38 }} className="mx-auto mt-6 max-w-xl text-lg font-light leading-[1.85] text-[#1A1208]/68" style={{ fontFamily: F.b }}>
            Book a free 30 minute discovery call or send your enquiry below. We respond the same day with clear next steps.
          </motion.p>
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.5 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:07492712144" className="inline-flex items-center gap-2 rounded-full border border-[#1A1208]/16 bg-white/80 px-4 py-2 text-sm font-medium text-[#1A1208] transition hover:border-[#E8230A]/35" style={{ fontFamily: F.b }}><Phone className="h-3.5 w-3.5 text-[#E8230A]" />07492 712144</a>
            <a href="mailto:hello@nixrix.com" className="inline-flex items-center gap-2 rounded-full border border-[#1A1208]/16 bg-white/80 px-4 py-2 text-sm font-medium text-[#1A1208] transition hover:border-[#E8230A]/35" style={{ fontFamily: F.b }}><Mail className="h-3.5 w-3.5 text-[#E8230A]" />hello@nixrix.com</a>
            <a href="https://wa.me/447492712144" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1A1208]/16 bg-white/80 px-4 py-2 text-sm font-medium text-[#1A1208] transition hover:border-[#E8230A]/35" style={{ fontFamily: F.b }}><MessageSquare className="h-3.5 w-3.5 text-[#E8230A]" />WhatsApp</a>
          </motion.div>
        </div>
      </section>

      {/* FORM + SIDEBAR — s1 */}
      <section className="py-20" style={{ background: BG.s1 }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">

            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="rounded-2xl border border-[#1A1208]/10 bg-white p-8 shadow-[0_4px_20px_rgba(26,18,8,0.06)] md:p-10">
                  <h2 className="mb-1 text-2xl font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>Send Your Enquiry</h2>
                  <p className="mb-8 text-sm font-light text-[#1A1208]/55" style={{ fontFamily: F.b }}>Fill in the form below. Your email app will open with your enquiry pre-filled and ready to send.</p>

                  {status === "success" && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800" style={{ fontFamily: F.b }}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{statusMsg}
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700" style={{ fontFamily: F.b }}>{statusMsg}</div>
                  )}

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Your Name *</Label>
                        <Input id="name" name="name" required value={form.name} onChange={onChange} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} placeholder="Jane Smith" className={ic("name")} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Company Name</Label>
                        <Input id="company" name="company" value={form.company} onChange={onChange} onFocus={()=>setFocused("company")} onBlur={()=>setFocused(null)} placeholder="Your Business Ltd" className={ic("company")} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Email Address *</Label>
                        <Input id="email" name="email" type="email" required value={form.email} onChange={onChange} onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)} placeholder="you@yourbusiness.com" className={ic("email")} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Phone (optional)</Label>
                        <Input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} placeholder="07xxx xxxxxx" className={ic("phone")} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="service" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>What do you need help with? *</Label>
                      <select id="service" name="service" required value={form.service} onChange={onChange} onFocus={()=>setFocused("service")} onBlur={()=>setFocused(null)} className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none ${ic("service")}`} style={{ fontFamily: F.b }}>
                        {serviceOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>Tell us about your situation *</Label>
                      <Textarea id="message" name="message" required rows={5} value={form.message} onChange={onChange} onFocus={()=>setFocused("message")} onBlur={()=>setFocused(null)} placeholder="Tell us what is slowing you down, what you are trying to achieve, or what you want to change." className={ic("message")} style={{ fontFamily: F.b }} />
                    </div>
                    <motion.div whileHover={{ scale:1.01 }} whileTap={{ scale:0.99 }}>
                      <Button type="submit" size="lg" className="w-full rounded-xl bg-[#E8230A] py-6 text-base font-semibold text-white shadow-[0_8px_28px_rgba(232,35,10,0.28)] hover:bg-[#C01A05]" style={{ fontFamily: F.b }}>
                        <Send className="mr-2 h-4 w-4" />Send Enquiry via Email
                      </Button>
                    </motion.div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-light text-[#1A1208]/45" style={{ fontFamily: F.b }}><Clock className="h-3.5 w-3.5" />We typically respond within a few hours during business days.</span>
                      <span className="text-[11px] text-[#1A1208]/35" style={{ fontFamily: F.b }}>We never share or sell your data.</span>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl border border-[#1A1208]/10 bg-white p-6 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                  <h3 className="mb-5 text-lg font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>Contact Details</h3>
                  <div className="space-y-4">
                    {[
                      { icon:<Mail className="h-4 w-4 text-[#E8230A]"/>, label:"Email", val:"hello@nixrix.com", href:"mailto:hello@nixrix.com" },
                      { icon:<Phone className="h-4 w-4 text-[#E8230A]"/>, label:"Phone", val:"07492 712144", href:"tel:07492712144" },
                      { icon:<MapPin className="h-4 w-4 text-[#E8230A]"/>, label:"Location", val:"Leeds, England", href:null },
                      { icon:<Clock className="h-4 w-4 text-[#E8230A]"/>, label:"Response", val:"Same day", href:null },
                    ].map((item,i)=>(
                      <motion.div key={i} whileHover={{ x:3 }} transition={{ type:"spring", stiffness:300 }} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8230A]/8">{item.icon}</div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1208]/45" style={{ fontFamily: F.b }}>{item.label}</p>
                          {item.href ? <a href={item.href} className="text-sm font-medium text-[#E8230A] hover:text-[#C01A05]" style={{ fontFamily: F.b }}>{item.val}</a> : <p className="text-sm font-medium text-[#1A1208]" style={{ fontFamily: F.b }}>{item.val}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-[#1A1208]/10 bg-[#F5EDE0] p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-base font-normal text-[#1A1208]" style={{ fontFamily: F.h }}>
                    <MessageSquare className="h-4 w-4 text-[#E8230A]" />What Happens Next
                  </h3>
                  <ol className="space-y-3">
                    {["Your email app opens with your enquiry pre-filled","You send it directly to hello@nixrix.com","We review and reply the same day","We agree a time for your free 30 minute call","You get a clear written recommendation within 24 hours"].map((step,i)=>(
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8230A] text-[10px] font-bold text-white">{i+1}</span>
                        <span className="text-xs font-light leading-5 text-[#1A1208]/68" style={{ fontFamily: F.b }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="rounded-2xl bg-[#E8230A] p-6 text-white">
                  <h3 className="mb-2 text-base font-normal" style={{ fontFamily: F.h }}>Not sure what you need?</h3>
                  <p className="mb-4 text-sm font-light leading-6 text-white/80" style={{ fontFamily: F.b }}>Select "Not sure yet" in the form and tell us what is slowing you down. We will figure out the right starting point together.</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white" style={{ fontFamily: F.b }}>No obligation <ArrowRight className="h-3 w-3" /></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — s2 */}
      <section className="border-t border-[#1A1208]/8 py-12" style={{ background: BG.s2 }}>
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon:"🇬🇧", stat:"UK Registered",     sub:"England and Wales" },
              { icon:"📍",  stat:"Leeds Based",        sub:"Real team, real timezone" },
              { icon:"⚡",  stat:"Fast Delivery",      sub:"From sign-off to live" },
              { icon:"🔗",  stat:"No Migration",       sub:"We add, never replace" },
            ].map((item,i)=>(
              <ScrollReveal key={i} delay={i*0.08}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{item.stat}</p>
                  <p className="text-xs font-light text-[#1A1208]/55" style={{ fontFamily: F.b }}>{item.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
