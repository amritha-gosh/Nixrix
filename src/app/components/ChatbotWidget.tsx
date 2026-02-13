import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, User, Phone, Mail, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Message {
  type: "bot" | "user" | "system";
  text: string;
  timestamp: Date;
}

type LeadPayload =
  | {
      type: "CHAT_LIVE_REQUEST";
      name: string;
      email: string;
      phone?: string;
      message?: string;
      welcomeCode?: string;
      source: "chatbot";
      pageUrl: string;
    }
  | {
      type: "CHAT_MESSAGE";
      message: string;
      source: "chatbot";
      pageUrl: string;
    };

export function ChatbotWidget() {
  const WELCOME_CODE = "NIXWELCOME";
  const LEAD_ENDPOINT = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT || "/api/lead";

  const [isOpen, setIsOpen] = useState(false);

  // Chat state
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Lead capture state
  const [mode, setMode] = useState<"chat" | "lead">("chat");
  const [liveChatRequested, setLiveChatRequested] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMsg, setLeadMsg] = useState("");

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    useWelcomeCode: true,
    welcomeCode: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, mode, leadStatus]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting after a short delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              type: "bot",
              text: "👋 Hi! I’m the NIXRIX Assistant. I can help you understand what we build — websites with built-in intelligence (lead capture, automation, dashboards).",
              timestamp: new Date(),
            },
          ]);

          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                {
                  type: "bot",
                  text: "What would you like help with today? You can also request a callback from our team anytime.",
                  timestamp: new Date(),
                },
              ]);
            }, 900);
          }, 1100);
        }, 900);
      }, 450);
    }
  }, [isOpen, messages.length]);

  const quickReplies = [
    "What do you build for SMEs?",
    "How does the welcome code work?",
    "Can you set up CRM + automation?",
    "How long does a project take?",
  ];

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    // Human / callback / live chat
    if (
      lower.includes("speak") ||
      lower.includes("talk") ||
      lower.includes("human") ||
      lower.includes("person") ||
      lower.includes("live") ||
      lower.includes("real") ||
      lower.includes("call") ||
      lower.includes("callback")
    ) {
      return "No problem — you can request a callback from our team. Tap **Request Live Chat with Team** below and enter your details.";
    }

    // Services
    if (lower.includes("service") || lower.includes("offer") || lower.includes("do") || lower.includes("build")) {
      return (
        "We build **full SME digital systems**, not just websites:\n\n" +
        "✅ Conversion Website (clear messaging + strong CTAs)\n" +
        "✅ Lead Capture + CRM-ready tracking\n" +
        "✅ Automation workflows (follow-ups, tasks, handovers)\n" +
        "✅ KPI Dashboards & reporting\n" +
        "✅ SEO foundations & visibility\n\n" +
        "Tell me your business type (Retail / Manufacturing / Services) and your main goal — more leads, better follow-up, or better visibility?"
      );
    }

    // Welcome code
    if (lower.includes("welcome") || lower.includes("code") || lower.includes("offer")) {
      return (
        "Our **Welcome Code** is a limited-time offer for first-time clients.\n\n" +
        "If you request a callback and mention the code, we’ll include bonus setup in your rollout plan.\n\n" +
        "Tap **Request Live Chat with Team** and we’ll email you the details."
      );
    }

    // Pricing-like questions (no numbers)
    if (lower.includes("cost") || lower.includes("price") || lower.includes("pricing") || lower.includes("budget")) {
      return (
        "We don’t use one-size pricing because every SME system is different.\n\n" +
        "After a quick audit call, we’ll send a clear proposal based on:\n" +
        "• pages/features\n" +
        "• CRM + automation needs\n" +
        "• dashboards/reporting\n" +
        "• timeline\n\n" +
        "If you want, request a callback and we’ll give you a precise plan + quote."
      );
    }

    // Timeline
    if (lower.includes("time") || lower.includes("long") || lower.includes("fast") || lower.includes("quick") || lower.includes("timeline")) {
      return (
        "Typical delivery depends on scope, but the process is:\n\n" +
        "1) Audit & plan\n" +
        "2) Build & review\n" +
        "3) Launch & improve\n\n" +
        "If you share what you need (website only vs full system), I can guide you on a realistic timeline."
      );
    }

    // Dashboards / analytics
    if (lower.includes("dashboard") || lower.includes("kpi") || lower.includes("power bi") || lower.includes("data") || lower.includes("analytics")) {
      return (
        "Yes — we can embed dashboards and track KPIs like:\n\n" +
        "📊 leads, conversions, enquiries\n" +
        "📈 sales performance\n" +
        "🧾 pipeline stages\n" +
        "⏱ response times\n\n" +
        "We also add plain-language insights so it’s easy to understand."
      );
    }

    // CRM / automation
    if (lower.includes("crm") || lower.includes("automation") || lower.includes("workflow") || lower.includes("automate") || lower.includes("follow up")) {
      return (
        "Absolutely. We can set up:\n\n" +
        "⚡ lead capture → CRM pipeline\n" +
        "📧 automated follow-ups\n" +
        "✅ tasks/reminders for your team\n" +
        "📄 proposal / onboarding workflow (optional)\n\n" +
        "Want the callback team to review your current process? Tap the button below."
      );
    }

    // Contact info
    if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
      return (
        "You can reach us at:\n\n" +
        "📧 hello@nixrix.com\n" +
        "📍 Leeds, UK\n\n" +
        "Or request a callback via the button below."
      );
    }

    return (
      "I can help with:\n• conversion websites\n• lead capture + CRM-ready setup\n• automation workflows\n• dashboards & reporting\n• SEO foundations\n\n" +
      "What’s your business type and your #1 goal right now?"
    );
  };

  const pushBotMessage = (text: string, delay = 900) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text, timestamp: new Date() }]);
    }, delay);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const userText = message;

    const userMessage: Message = {
      type: "user",
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Optional: send chat message to backend later (not required for launch)
    // const payload: LeadPayload = { type: "CHAT_MESSAGE", message: userText, source: "chatbot", pageUrl: window.location.href };

    pushBotMessage(getBotResponse(userText), 900 + Math.random() * 600);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 100);
  };

  const openLeadForm = () => {
    setMode("lead");
    setLeadStatus("idle");
    setLeadMsg("");

    // Add system message
    setMessages((prev) => [
      ...prev,
      {
        type: "system",
        text: "🔔 Great — share your details below and we’ll get back to you.",
        timestamp: new Date(),
      },
    ]);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = lead.name.trim();
    const email = lead.email.trim();
    const phone = lead.phone.trim();
    const msg = lead.message.trim();

    if (!name) {
      setLeadStatus("error");
      setLeadMsg("Please enter your name.");
      return;
    }
    if (!isValidEmail(email)) {
      setLeadStatus("error");
      setLeadMsg("Please enter a valid email address.");
      return;
    }

    setLeadStatus("loading");
    setLeadMsg("");

    const payload: LeadPayload = {
      type: "CHAT_LIVE_REQUEST",
      name,
      email,
      phone: phone || undefined,
      message: msg || undefined,
      welcomeCode: lead.useWelcomeCode ? (lead.welcomeCode.trim() || WELCOME_CODE) : undefined,
      source: "chatbot",
      pageUrl: window.location.href,
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setLeadStatus("success");
      setLiveChatRequested(true);
      setLeadMsg("Done! We’ve received your request. We’ll contact you shortly.");

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: "✅ Request received. Our team will contact you soon.",
          timestamp: new Date(),
        },
      ]);

      // Return to chat after a moment
      setTimeout(() => {
        setMode("chat");
        pushBotMessage("While you wait — tell me your business type and goal, and I’ll suggest the best setup.", 850);
      }, 900);

      setLead({
        name: "",
        email: "",
        phone: "",
        message: "",
        useWelcomeCode: true,
        welcomeCode: "",
      });
    } catch (err) {
      setLeadStatus("error");
      setLeadMsg("Couldn’t send right now. Please try again, or email hello@nixrix.com.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0D9488] text-white rounded-full p-4 shadow-2xl hover:bg-[#0c8479] transition-colors relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open chat"
        >
          {!isOpen && (
            <motion.span
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border-2 border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ maxHeight: "680px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold">NIXRIX Assistant</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors" aria-label="Minimize">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>

              {/* Mode pill */}
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                  {mode === "chat" ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Quick Answers
                    </>
                  ) : (
                    <>
                      <User className="w-3.5 h-3.5" />
                      Callback Request
                    </>
                  )}
                </div>

                {mode === "lead" && (
                  <button
                    className="text-xs text-white/80 hover:text-white underline"
                    onClick={() => {
                      setMode("chat");
                      setLeadStatus("idle");
                      setLeadMsg("");
                    }}
                  >
                    Back to chat
                  </button>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="h-96 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {/* Messages */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`flex ${msg.type === "bot" || msg.type === "system" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[84%] p-3 rounded-2xl ${
                      msg.type === "bot"
                        ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                        : msg.type === "system"
                        ? "bg-blue-50 text-blue-800 shadow-sm border border-blue-200"
                        : "bg-[#0D9488] text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.type === "bot" ? "text-gray-400" : msg.type === "system" ? "text-blue-400" : "text-white/70"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
              {mode === "chat" && messages.length <= 2 && !isTyping && (
                <div className="flex flex-col gap-2 pt-2">
                  <p className="text-xs text-gray-500 text-center mb-1">Quick questions:</p>
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-sm p-2 bg-white border border-gray-200 rounded-lg hover:border-[#0D9488] hover:bg-[#0D9488]/5 transition-all text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.08 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Lead form */}
              {mode === "lead" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">Request a callback</div>
                      <div className="text-xs text-gray-500 mt-1">Enter your details — we’ll contact you soon.</div>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-[#06B6D4]/15 to-[#0D9488]/15 border border-[#0D9488]/20 px-3 py-1.5 rounded-full font-semibold text-gray-800">
                      Code: {WELCOME_CODE}
                    </div>
                  </div>

                  <form onSubmit={submitLead} className="space-y-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        value={lead.name}
                        onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name *"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        value={lead.email}
                        onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                        placeholder="Email *"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        value={lead.phone}
                        onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="Phone (optional)"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                      />
                    </div>

                    <textarea
                      value={lead.message}
                      onChange={(e) => setLead((p) => ({ ...p, message: e.target.value }))}
                      placeholder="What do you need help with? (optional)"
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                    />

                    <label className="flex items-start gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={lead.useWelcomeCode}
                        onChange={(e) => setLead((p) => ({ ...p, useWelcomeCode: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 accent-[#0D9488]"
                      />
                      Apply Welcome Code
                      <span className="font-semibold text-gray-800">{WELCOME_CODE}</span>
                    </label>

                    {lead.useWelcomeCode && (
                      <Input
                        value={lead.welcomeCode}
                        onChange={(e) => setLead((p) => ({ ...p, welcomeCode: e.target.value }))}
                        placeholder={WELCOME_CODE}
                        className="bg-white"
                      />
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white"
                      disabled={leadStatus === "loading"}
                    >
                      {leadStatus === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </span>
                      ) : leadStatus === "success" ? (
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Send Request
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>

                    {leadStatus === "error" && (
                      <div className="text-xs rounded-xl px-3 py-2 border border-red-200 bg-red-50 text-red-700">{leadMsg}</div>
                    )}
                    {leadStatus === "success" && (
                      <div className="text-xs rounded-xl px-3 py-2 border border-emerald-200 bg-emerald-50 text-emerald-800">{leadMsg}</div>
                    )}

                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      By submitting, you agree to be contacted about your enquiry. We don’t sell your data.
                    </p>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Live Chat Request Button */}
            {mode === "chat" && !liveChatRequested && messages.length > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-200">
                <motion.button
                  onClick={openLeadForm}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="w-4 h-4" />
                  Request Live Chat with Team
                  <Phone className="w-4 h-4" />
                </motion.button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              {mode === "chat" ? (
                <>
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim()) handleSend();
                      }}
                    />
                    <Button size="icon" className="bg-[#0D9488] hover:bg-[#0c8479]" onClick={handleSend} disabled={!message.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">NIXRIX – Live Website Demo</p>
                </>
              ) : (
                <div className="text-xs text-gray-600 text-center">
                  Tip: You can go back to chat anytime using <span className="font-semibold">Back to chat</span>.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
