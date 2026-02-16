import { useState } from "react";
import { motion } from "motion/react";
import { SEOHead } from "@/app/components/SEOHead";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { ArrowRight, ShieldCheck } from "lucide-react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Digital Marketing Intern",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [note, setNote] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setStatus("error"), setNote("Please enter your name.");
    if (!isValidEmail(form.email)) return setStatus("error"), setNote("Please enter a valid email.");
    if (!form.message.trim()) return setStatus("error"), setNote("Please add a short message.");

    setStatus("loading");
    setNote("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "CAREERS",
          name: form.name.trim(),
          email: form.email.trim(),
          message: `Role: ${form.role}\n\n${form.message.trim()}`,
          source: "careers",
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setNote("Thanks — we’ll email you back soon.");
      setForm({ name: "", email: "", role: "Digital Marketing Intern", message: "" });
    } catch {
      setStatus("error");
      setNote("Couldn’t send right now. Please try again, or email hello@nixrix.com.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Careers | NIXRIX"
        description="Join NIXRIX. Internships and future roles across digital marketing, web systems, automation and analytics."
        keywords="NIXRIX careers, digital marketing internship, web development internship, automation, Power BI"
      />
      <ChatbotWidget />

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30">
              <span className="text-[#06B6D4] text-sm font-semibold">UK-based • Remote-friendly</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mt-6">Careers at NIXRIX</h1>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl leading-relaxed">
              We build intelligent digital systems for SMEs — websites, CRM-ready lead flows, automation and dashboards.
              If you want real-world experience on real projects, apply below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="border-2 shadow-xl">
              <CardContent className="p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Apply</h2>
                <p className="text-gray-600 mt-2">
                  Share a short intro + any links (LinkedIn/portfolio). We’ll respond soon.
                </p>

                <form onSubmit={submit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                    />
                    <Input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="Email address"
                      type="email"
                    />
                  </div>

                  <select
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                  >
                    <option>Digital Marketing Intern</option>
                    <option>Web / Systems Intern</option>
                    <option>Data / Power BI Intern</option>
                    <option>Business Development (Future)</option>
                    <option>Other</option>
                  </select>

                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Brief intro + what you want to work on + links."
                    rows={6}
                  />

                  {note && (
                    <div
                      className={`rounded-lg px-4 py-3 text-sm border ${
                        status === "success"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-rose-50 text-rose-900 border-rose-200"
                      }`}
                    >
                      {note}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#0D9488] hover:bg-[#0c8479] text-white"
                    disabled={status === "loading"}
                  >
                    <span className="inline-flex items-center gap-2">
                      Submit Application
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4" />
                    We only use your info to respond.
                  </div>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
