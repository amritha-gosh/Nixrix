import { useMemo, useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  MessageSquare,
  Sparkles,
  Loader2,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { SEOHead } from "@/app/components/SEOHead";
import { motion } from "motion/react";

type ContactLeadPayload = {
  type: "CONTACT_FORM";
  name: string;
  email: string;
  phone?: string;
  businessType: string;
  serviceInterest: string;
  message: string;
  welcomeCode?: string;
  source: "contact";
  pageUrl: string;
};

export function ContactPage() {
  // Same code used on homepage
  const WELCOME_CODE = "NIXWELCOME";

  // Serverless endpoint (we’ll wire this next)
  // Set in .env: VITE_LEAD_ENDPOINT="https://your-backend-domain/api/lead"
  const LEAD_ENDPOINT = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT || "/api/lead";

  const serviceOptions = useMemo(
    () => [
      { value: "full-system", label: "Full SME Digital System (Website + CRM + Automation + Dashboards)" },
      { value: "website", label: "Conversion Website" },
      { value: "crm-automation", label: "CRM + Automation Workflows" },
      { value: "dashboards", label: "Dashboards & KPI Reporting" },
      { value: "chatbot", label: "AI Chatbot + Lead Capture" },
      { value: "seo", label: "SEO + Visibility" },
      { value: "custom", label: "Custom / Not sure yet" },
    ],
    []
  );

  const businessTypeOptions = useMemo(
    () => [
      { value: "retail", label: "Retail" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "local-services", label: "Local Services" },
      { value: "trading-distribution", label: "Trading / Distribution" },
      { value: "other", label: "Other" },
    ],
    []
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    serviceInterest: "full-system",
    message: "",
    welcomeCode: "",
    useWelcomeCode: true,
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setStatusMsg("Please enter your name.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus("error");
      setStatusMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.businessType) {
      setStatus("error");
      setStatusMsg("Please select your business type.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setStatusMsg("Please tell us a bit about what you need.");
      return;
    }

    setStatus("loading");
    setStatusMsg("");

    const payload: ContactLeadPayload = {
      type: "CONTACT_FORM",
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      businessType: formData.businessType,
      serviceInterest: formData.serviceInterest,
      message: formData.message.trim(),
      welcomeCode: formData.useWelcomeCode ? (formData.welcomeCode.trim() || WELCOME_CODE) : undefined,
      source: "contact",
      pageUrl: window.location.href,
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      setStatusMsg("Thanks! We’ve received your message. We’ll get back to you as soon as possible.");

      setTimeout(() => {
        setStatus("idle");
        setStatusMsg("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessType: "",
          serviceInterest: "full-system",
          message: "",
          welcomeCode: "",
          useWelcomeCode: true,
        });
      }, 2500);
    } catch (err) {
      setStatus("error");
      setStatusMsg("Couldn’t send right now. Please try again in a moment, or email us directly.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Contact NIXRIX – Free SME Tech Audit | Websites + CRM + Automation + Dashboards"
        description="Book a free SME Tech Audit with Nixrix. We build full digital systems: conversion websites, lead capture + CRM-ready workflows, automation, and KPI dashboards."
        keywords="SME tech audit, website and CRM, business automation, dashboards, contact Nixrix, Leeds digital solutions"
      />

      <ChatbotWidget />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[#06B6D4]/10 backdrop-blur-sm rounded-full border border-[#06B6D4]/30">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-[#06B6D4] text-sm font-semibold">Free SME Tech Audit</span>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Let’s Build a System That Brings Leads
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Tell us what you need — we’ll reply with clear next steps and a structured plan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <Card className="border-2 shadow-xl">
                  <CardContent className="p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Book Your Free Audit</h2>
                    <p className="text-gray-600 mb-8">
                      Share a few details — we’ll reply with a clear plan. No jargon, no pressure.
                    </p>

                    {status === "success" ? (
                      <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request received</h3>
                        <p className="text-gray-600">{statusMsg || "We’ll get back to you shortly."}</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Status banner */}
                        {status === "error" && (
                          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {statusMsg}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                            <Label htmlFor="name" className="font-medium">
                              Your Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="John Smith"
                              className={`transition-all ${focusedField === "name" ? "ring-2 ring-[#0D9488]" : ""}`}
                            />
                          </motion.div>

                          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                            <Label htmlFor="email" className="font-medium">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="john@example.com"
                              className={`transition-all ${focusedField === "email" ? "ring-2 ring-[#0D9488]" : ""}`}
                            />
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                            <Label htmlFor="phone" className="font-medium">
                              Phone (optional)
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="07xxx xxxxxx"
                              className={`transition-all ${focusedField === "phone" ? "ring-2 ring-[#0D9488]" : ""}`}
                            />
                          </motion.div>

                          <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                            <Label htmlFor="businessType" className="font-medium">
                              Business Type *
                            </Label>
                            <select
                              id="businessType"
                              name="businessType"
                              required
                              value={formData.businessType}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("businessType")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none transition-all ${
                                focusedField === "businessType" ? "ring-2 ring-[#0D9488]" : ""
                              }`}
                            >
                              <option value="">Select one</option>
                              {businessTypeOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        </div>

                        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                          <Label htmlFor="serviceInterest" className="font-medium">
                            What do you want help with? *
                          </Label>
                          <select
                            id="serviceInterest"
                            name="serviceInterest"
                            required
                            value={formData.serviceInterest}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("serviceInterest")}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none transition-all ${
                              focusedField === "serviceInterest" ? "ring-2 ring-[#0D9488]" : ""
                            }`}
                          >
                            {serviceOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </motion.div>

                        {/* Welcome code */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-start gap-3">
                            <input
                              id="useWelcomeCode"
                              name="useWelcomeCode"
                              type="checkbox"
                              checked={formData.useWelcomeCode}
                              onChange={handleChange}
                              className="mt-1 h-4 w-4 accent-[#0D9488]"
                            />
                            <div className="flex-1">
                              <Label htmlFor="useWelcomeCode" className="font-semibold text-gray-900">
                                Apply Welcome Code
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">
                                Use <span className="font-bold text-gray-900">{WELCOME_CODE}</span> to unlock the welcome offer.
                              </p>

                              {formData.useWelcomeCode && (
                                <div className="mt-3">
                                  <Input
                                    name="welcomeCode"
                                    value={formData.welcomeCode}
                                    onChange={handleChange}
                                    placeholder={WELCOME_CODE}
                                    className="bg-white"
                                  />
                                  <p className="text-xs text-gray-500 mt-2">
                                    Leave empty to auto-apply <span className="font-semibold">{WELCOME_CODE}</span>.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                          <Label htmlFor="message" className="font-medium">
                            Tell us what you want to achieve *
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Example: We want more enquiries, better follow-up, and a dashboard to track leads and conversions…"
                            rows={6}
                            className={`transition-all ${focusedField === "message" ? "ring-2 ring-[#0D9488]" : ""}`}
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:shadow-2xl text-white shadow-lg"
                            disabled={status === "loading"}
                          >
                            {status === "loading" ? (
                              <>
                                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                Sending…
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 w-5 h-5" />
                                Send Request
                              </>
                            )}
                          </Button>
                        </motion.div>

                        <div className="text-center text-sm text-gray-500">
                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4" /> We typically respond within 24 hours.
                          </span>
                          <div className="mt-2 inline-flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck className="w-4 h-4" />
                            We don’t sell your data.
                          </div>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <ScrollReveal delay={0.2}>
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                    <div className="space-y-5">
                      <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Mail className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Email</p>
                          <a href="mailto:hello@nixrix.com" className="text-[#06B6D4] hover:underline">
                            hello@nixrix.com
                          </a>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Phone className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Phone</p>
                          <a href="tel:07492712144" className="text-[#06B6D4] hover:underline">
                            07492 712144
                          </a>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <MapPin className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Location</p>
                          <p className="text-gray-600">Leeds, United Kingdom</p>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Clock className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Response Time</p>
                          <p className="text-gray-600">Typically within 24 hours</p>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Card className="bg-gradient-to-br from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-[#0D9488]" />
                      What Happens Next?
                    </h3>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">1.</span>
                        <span>We review your request and reply with next steps</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">2.</span>
                        <span>We schedule a quick call to understand your workflow and goals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">3.</span>
                        <span>You receive a structured plan and proposal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">4.</span>
                        <span>If it’s a fit, we build and launch your system</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Card className="border-l-4 border-[#06B6D4] shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <ClipboardCheck className="w-5 h-5 text-[#0D9488]" />
                      Welcome Code Offer
                    </h3>
                    <p className="text-sm text-gray-600">
                      Mention <strong className="text-gray-900">{WELCOME_CODE}</strong> to unlock the welcome offer on your first project.
                      We’ll explain what’s included after reviewing your request.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Common Questions</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How quickly can we get started?",
                a: "Once we understand your goals and scope, we’ll share a clear plan and timeline.",
              },
              {
                q: "What if I already have a website?",
                a: "We can improve conversions, add lead tracking, introduce automation, and plug in dashboards without rebuilding everything.",
              },
              {
                q: "Do I need technical knowledge?",
                a: "No. We keep everything simple and explain it in plain English with clear steps.",
              },
              {
                q: "Can you connect CRM and workflows later?",
                a: "Yes. We can build the foundations first and expand into CRM, automation, dashboards, and integrations as you grow.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 text-base">{faq.q}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
