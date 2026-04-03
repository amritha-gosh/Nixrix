import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, Sparkles, Mail, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Link } from "react-router-dom";

const F = {
  b: "'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif",
};

interface Message {
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

// ─── Full NIXRIX knowledge base ───────────────────────────────────────────────

const KB: { test: (s: string) => boolean; answer: string }[] = [
  // ── Company ──
  {
    test: (s) =>
      /what is nixrix|who are nixrix|about nixrix|tell me about|what do you do|nixrix do|nixrix offer/.test(s),
    answer:
      "NIXRIX is a Leeds-based UK digital systems company registered in England and Wales.\n\nWe help UK small businesses replace repetitive manual work with smart websites, automation, CRM systems, and live data dashboards — without changing a single tool you already use.\n\nOur tagline is simple: Stop Losing Time. Start Running Smarter.",
  },
  {
    test: (s) => /where are you|location|based|leeds|uk|england|registered/.test(s),
    answer:
      "We are based in Leeds, UK, and registered in England and Wales (2025).\n\nWe work with businesses across the UK, though our main niche is UK letting agencies and UK SMEs.",
  },
  {
    test: (s) => /team|who built|founders|staff|people|basil|amritha|ritik/.test(s),
    answer:
      "NIXRIX was co-founded by Basil Benoy (Commercial Lead) and Amritha Gosh (Operations Lead and Website Owner).\n\nOur team includes a Lead Developer, a Data and Analytics Lead, and a Content and LinkedIn support function.\n\nWe are a small, focused team — which means your project gets real attention, not a junior handoff.",
  },

  // ── Letting agencies ──
  {
    test: (s) =>
      /letting agenc|landlord|tenant|property|estate agent|agency smart|smart pack/.test(s),
    answer:
      "Letting agencies are our primary niche. There are over 15,000 letting agencies in the UK, and most are losing time and landlords to more responsive competitors.\n\nWe built the Agency Smart Pack specifically for UK letting agencies. It includes:\n• A professional agency website\n• Tenant and landlord CRM setup\n• Lead automation so no enquiry is missed\n• Compliance-aware configuration\n\nPrice: £2,697 as a complete pack.\n\nBook a free call and we'll show you exactly what it includes for your agency.",
  },

  // ── Services overview ──
  {
    test: (s) =>
      /service|offer|package|what can you|what you do|help with|products/.test(s),
    answer:
      "NIXRIX offers two tiers of service:\n\nQUICK WINS (fast, focused fixes):\n• The Spark — one-page website (£497)\n• The Impression — logo and brand kit (£497)\n• The Magnet — landing page and lead capture (£397)\n• The Connector — HubSpot CRM setup (£497)\n\nSIGNATURE PACKAGES:\n• NIXRIX Launchpad — full business website (£1,497)\n• NIXRIX Command — CRM, automation and dashboard (£1,997)\n• NIXRIX Momentum — monthly social media (£797/month)\n• NIXRIX Intelligence — Power BI dashboard (£1,200–£3,500)\n• NIXRIX Autopilot — AI document processing and automation (£997–£2,500)\n\nLETTING AGENCIES:\n• Agency Smart Pack — full agency system (£2,697)\n\nMONTHLY SUPPORT:\n• Grow Lite — £197/month\n• Grow Standard — £397/month\n• Grow Pro — £797/month",
  },

  // ── Website ──
  {
    test: (s) =>
      /website|web design|web build|build me a site|one.page|landing page|launchpad|spark/.test(s),
    answer:
      "We build several types of website:\n\n• The Spark (£497) — one clean page, live within 5 days, mobile first, SEO ready\n• The Magnet (£397) — a single conversion-focused landing page built to capture leads\n• NIXRIX Launchpad (£1,497) — a full multi-page business website with SEO, analytics, and lead capture\n• Agency Smart Pack (£2,697) — built specifically for UK letting agencies\n\nAll websites are responsive, fast, and connected to your CRM if needed.\n\nWant to know which is right for you? Book a free discovery call.",
  },

  // ── CRM / HubSpot ──
  {
    test: (s) =>
      /crm|hubspot|connector|pipeline|follow.up|contact management|lead tracking/.test(s),
    answer:
      "We set up HubSpot CRM properly — not just the account, but the whole system.\n\nThe Connector package (£497) includes:\n• Full HubSpot CRM setup\n• Pipeline stages configured for your business\n• Email follow-up templates written and loaded\n• Team onboarding so everyone knows how to use it\n\nFor more complex setups, NIXRIX Command (£1,997) adds automation and a live dashboard on top of the CRM.",
  },

  // ── Automation ──
  {
    test: (s) =>
      /automat|make.com|zapier|workflow|manual work|time.saving|autopilot|repetitive/.test(s),
    answer:
      "Automation is one of our core specialisms. We use Make.com to build automation workflows that connect your tools.\n\nExamples of what we automate:\n• New website enquiry creates a HubSpot contact and notifies your team\n• Document processing handled by AI (NIXRIX Autopilot)\n• Follow-up emails sent automatically after a set time\n• Lead data synced between your website, CRM and spreadsheets\n\nNIXRIX Autopilot (from £997) is our dedicated automation package.\nNIXRIX Command (£1,997) combines CRM, automation and a dashboard together.",
  },

  // ── Dashboard / Power BI ──
  {
    test: (s) =>
      /dashboard|power bi|kpi|data|analytics|reporting|intelligence|insight|visualis/.test(s),
    answer:
      "We build live Power BI dashboards that show you exactly how your business is performing — updated in real time, in plain English.\n\nNIXRIX Intelligence (from £1,200) includes:\n• Full Power BI dashboard build\n• Live data connections to your existing tools\n• KPI tracking for the metrics that matter\n• Plain language explanations so the whole team can understand it\n\nDashboards can also be embedded into your website for client-facing data visibility.",
  },

  // ── AI chatbot ──
  {
    test: (s) => /chatbot|ai chat|chat|bot|assistant|faq bot|ai agent/.test(s),
    answer:
      "We build AI-powered chatbots that sit on your website and handle FAQs, capture leads, and support visitors 24/7.\n\nOur chatbots are:\n• Trained specifically on your business\n• Set up to capture lead details\n• Branded to match your website\n• Available as part of NIXRIX Launchpad or NIXRIX Command\n\nThe chatbot you are using right now is built by NIXRIX.",
  },

  // ── No migration ──
  {
    test: (s) =>
      /migration|replace|existing tool|current system|switch|change platform|keep/.test(s),
    answer:
      "Our core principle is: we add, we never replace.\n\nWe connect to the tools and systems you already use. We never force you to migrate platforms, switch CRMs, or rebuild from scratch.\n\nThis means:\n• No disruption to your current operations\n• Your team keeps their existing workflow\n• Everything just gets connected and automated on top of what you already have",
  },

  // ── Pricing ──
  {
    test: (s) => /price|pricing|cost|how much|quote|budget|afford|expensive/.test(s),
    answer:
      "Our packages have clear, published prices:\n\nQUICK WINS:\n• The Spark — £497\n• The Impression — £497\n• The Magnet — £397\n• The Connector — £497\n\nSIGNATURE:\n• NIXRIX Launchpad — £1,497\n• NIXRIX Command — £1,997\n• NIXRIX Momentum — £797/month\n• NIXRIX Intelligence — £1,200 to £3,500\n• NIXRIX Autopilot — £997 to £2,500\n\nSPECIALIST:\n• Agency Smart Pack — £2,697\n\nMONTHLY RETAINERS:\n• Grow Lite — £197/month\n• Grow Standard — £397/month\n• Grow Pro — £797/month\n\nNot sure which is right for you? Book a free 30-minute call and we'll tell you exactly what fits your situation.",
  },

  // ── How it works / process ──
  {
    test: (s) =>
      /how do you work|process|timeline|steps|how long|delivery|how it work/.test(s),
    answer:
      "Our process has four steps:\n\n1. Free Discovery Call (30 minutes)\nWe look at your current setup, tools and workflow. You get honest feedback.\n\n2. Clear Recommendation\nA plain-English summary of what to fix first and which package fits best.\n\n3. We Build It\nFast delivery using tools you already have. No long projects. No surprises.\n\n4. You Run Smarter\nYour system runs in the background — leads captured, tasks automated, data visible.\n\nMost projects are delivered in 5 to 10 days from sign-off.",
  },

  // ── Delivery time ──
  {
    test: (s) => /how long|deadline|fast|quick|days|week|turnaround|delivery time/.test(s),
    answer:
      "Most of our projects are delivered in 5 to 10 days from sign-off.\n\nQuick Win packages (The Spark, The Magnet, The Connector) are typically live within 5 days.\n\nSignature packages like NIXRIX Command or NIXRIX Intelligence take 7 to 14 days depending on scope.\n\nWe will always give you a clear delivery timeline before we start.",
  },

  // ── SEO ──
  {
    test: (s) =>
      /seo|search engine|google rank|keyword|meta|organic|sitemap|search visibility/.test(s),
    answer:
      "SEO foundations are built into every website we make.\n\nThis includes:\n• Proper meta titles and descriptions for every page\n• Image alt tags\n• Structured heading hierarchy\n• Sitemap submitted to Google Search Console\n• Google Analytics GA4 set up\n• On-page content written with target keywords\n\nWe also write SEO content pages specifically for your target market — for example, 'automation for UK letting agencies' and 'business automation services Leeds'.",
  },

  // ── Monthly support / retainers ──
  {
    test: (s) =>
      /retainer|monthly|ongoing|support|maintenance|grow lite|grow standard|grow pro/.test(s),
    answer:
      "We offer three monthly support retainers:\n\n• Grow Lite — £197/month\nBasic updates, monitoring and priority email support.\n\n• Grow Standard — £397/month\nOngoing updates, optimisation, monthly reporting and CRM health checks.\n\n• Grow Pro — £797/month\nFull ongoing support, automation improvements, content updates and strategy calls.\n\nRetainers are recommended after any Signature package to keep your system performing at its best.",
  },

  // ── Social media / content ──
  {
    test: (s) =>
      /social media|content|linkedin post|instagram|momentum|posts|marketing/.test(s),
    answer:
      "NIXRIX Momentum (£797/month) is our monthly social media and content package.\n\nIt includes:\n• Regular LinkedIn and social posts\n• Content written in your brand voice\n• Scheduling and publishing\n• Monthly performance summary\n\nThis is designed for business owners who know they need consistent content but don't have the time to do it themselves.",
  },

  // ── Contact ──
  {
    test: (s) =>
      /contact|email|call|talk|speak|get in touch|book|phone|reach/.test(s),
    answer:
      "You can reach us at:\n\nEmail: hello@nixrix.com\nPhone: 07492 712144\nLocation: Leeds, UK\n\nOr use the Contact Us button below to book a free 30-minute discovery call directly. We respond the same day.",
  },

  // ── Start / get started ──
  {
    test: (s) =>
      /get started|start|begin|first step|sign up|ready|how do i begin|where do i start/.test(s),
    answer:
      "The best first step is a free 30-minute discovery call.\n\nIn that call we:\n• Look at your current website, tools and workflow\n• Tell you exactly what is costing you time and leads\n• Recommend the right package for your situation\n\nThere is no pressure and no pitch. Just honest advice.\n\nUse the Contact Us button below to book yours.",
  },
];

function getBotResponse(userMessage: string): string {
  const s = userMessage.toLowerCase();
  const match = KB.find((k) => k.test(s));
  if (match) return match.answer;
  return "I can help you with questions about:\n\n• NIXRIX services and packages\n• Pricing\n• Websites, CRM, automation, dashboards\n• How we work and delivery times\n• Letting agency solutions\n• Monthly support options\n\nOr use the Contact Us button below to speak directly with the team.";
}

const quickReplies = [
  "What services do you offer?",
  "How much does it cost?",
  "Do you work with letting agencies?",
  "How long does delivery take?",
  "What is the no-migration policy?",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatbotWidget() {
  const [isOpen, setIsOpen]       = useState(false);
  const [message, setMessage]     = useState("");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [isTyping, setIsTyping]   = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef            = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            type: "bot",
            text: "Hello! I'm the NIXRIX Assistant. I know everything about our services, packages, pricing, and how we work.\n\nWhat would you like to know?",
            timestamp: new Date(),
          },
        ]);
      }, 700);
    }
  }, [isOpen, messages.length]);

  const pushBot = (text: string) => {
    setIsTyping(true);
    const delay = 650 + Math.random() * 400;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text, timestamp: new Date() }]);
    }, delay);
  };

  const handleSend = (overrideText?: string) => {
    const userText = (overrideText ?? message).trim();
    if (!userText) return;
    setMessages((prev) => [
      ...prev,
      { type: "user", text: userText, timestamp: new Date() },
    ]);
    setMessage("");
    setShowQuick(false);
    pushBot(getBotResponse(userText));
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.div
        className="fixed bottom-6 right-6 z-[60]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#E8230A] text-white shadow-[0_8px_28px_rgba(232,35,10,0.40)] transition-colors hover:bg-[#C01A05]"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open NIXRIX chat"
        >
          {!isOpen && (
            <motion.span
              className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 z-[59] w-[calc(100vw-2rem)] max-w-[420px] overflow-hidden rounded-3xl border border-[#1A1208]/10 bg-white shadow-[0_24px_80px_rgba(26,18,8,0.18)]"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ maxHeight: "680px" }}
          >
            {/* Header */}
            <div className="bg-[#1A1208] px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#E8230A]">
                    <Sparkles className="h-5 w-5 text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1A1208] bg-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: F.b }}>
                      NIXRIX Assistant
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-white/55" style={{ fontFamily: F.b }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Online · Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/8 hover:text-white"
                  aria-label="Close chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="h-80 space-y-3 overflow-y-auto px-4 py-4"
              style={{ background: "#FDFAF5" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 }}
                  className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.type === "bot"
                        ? "border border-[#1A1208]/8 bg-white text-[#1A1208] shadow-sm"
                        : "bg-[#E8230A] text-white"
                    }`}
                  >
                    <p
                      className="whitespace-pre-line text-sm leading-relaxed"
                      style={{ fontFamily: F.b }}
                    >
                      {msg.text}
                    </p>
                    <p
                      className={`mt-1 text-[10px] ${
                        msg.type === "bot" ? "text-[#6B6256]/60" : "text-white/60"
                      }`}
                      style={{ fontFamily: F.b }}
                    >
                      {msg.timestamp.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl border border-[#1A1208]/8 bg-white px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-[#E8230A]/40"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick replies */}
              {showQuick && messages.length >= 1 && !isTyping && (
                <div className="space-y-2 pt-1">
                  <p
                    className="text-center text-[11px] text-[#6B6256]/60"
                    style={{ fontFamily: F.b }}
                  >
                    Quick questions
                  </p>
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSend(reply)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      whileHover={{ x: 3 }}
                      className="flex w-full items-center justify-between rounded-xl border border-[#1A1208]/10 bg-white px-4 py-2.5 text-left text-sm text-[#1A1208] transition hover:border-[#E8230A]/35 hover:bg-[#E8230A]/4"
                      style={{ fontFamily: F.b }}
                    >
                      {reply}
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#E8230A]/60" />
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CTA */}
            <div className="border-t border-[#1A1208]/6 bg-[#FDFAF5] px-4 py-3">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                  <Button
                    className="w-full rounded-xl bg-[#E8230A] text-white hover:bg-[#C01A05]"
                    style={{ fontFamily: F.b }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Book a Free Discovery Call
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Input */}
            <div className="border-t border-[#1A1208]/6 bg-white px-4 py-3">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about NIXRIX..."
                  className="flex-1 rounded-xl border-[#1A1208]/12 bg-[#FDFAF5] text-sm text-[#1A1208] placeholder:text-[#6B6256]/50 focus:border-[#E8230A]/40 focus:ring-[#E8230A]/20"
                  style={{ fontFamily: F.b }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) handleSend();
                  }}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!message.trim()}
                  className="rounded-xl bg-[#E8230A] hover:bg-[#C01A05] disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p
                className="mt-2 text-center text-[10px] text-[#6B6256]/45"
                style={{ fontFamily: F.b }}
              >
                NIXRIX Assistant · Powered by NIXRIX
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
