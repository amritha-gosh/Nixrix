import { useEffect, useRef, useState } from "react";
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
      email?: string;
      phone?: string;
      message?: string;
      source: "chatbot";
      pageUrl: string;
      meta?: Record<string, any>;
    }
  | {
      type: "CHAT_MESSAGE";
      message: string;
      source: "chatbot";
      pageUrl: string;
    };

export function ChatbotWidget() {
  const LEAD_ENDPOINT = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT || "/api/lead";

  // Put WhatsApp number in international format WITHOUT "+" (UK example: 447492712144)
  const WHATSAPP_NUMBER = String((import.meta as any)?.env?.VITE_WHATSAPP_NUMBER || "447492712144").replace(/\D/g, "");
  const SUPPORT_EMAIL = String((import.meta as any)?.env?.VITE_SUPPORT_EMAIL || "hello@nixrix.com");

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
    preferredContact: "whatsapp" as "whatsapp" | "email",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, mode, leadStatus]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              type: "bot",
              text: "👋 Hi! I’m the NIXRIX Assistant. I can help with websites, lead capture, automation, dashboards, and SEO foundations.",
              timestamp: new Date(),
            },
            {
              type: "bot",
              text: "What would you like help with today? You can also request a callback from our team anytime.",
              timestamp: new Date(),
            },
          ]);
        }, 850);
      }, 450);
    }
  }, [isOpen, messages.length]);

  const quickReplies = [
    "What do you build for SMEs?",
    "Can you set up CRM + automation?",
    "Do you do dashboards & KPI reporting?",
    "How does the process work?",
  ];

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("call") || lower.includes("callback") || lower.includes("human") || lower.includes("live")) {
      return "No problem — tap **Request Callback** below and share your details (WhatsApp or Email).";
    }

    if (lower.includes("service") || lower.includes("offer") || lower.includes("build")) {
      return (
        "We build **full SME digital systems**, not just websites:\n\n" +
        "✅ Conversion Website\n✅ Lead Capture + CRM-ready tracking\n✅ Automation workflows\n✅ KPI Dashboards & reporting\n✅ SEO foundations\n\n" +
        "What’s your business type and your #1 goal (more leads / better follow-up / better visibility)?"
      );
    }

    if (lower.includes("dashboard") || lower.includes("kpi") || lower.includes("analytics")) {
      return "Yes — we embed dashboards and track leads, conversions, pipeline stages, and response times. Want a callback to discuss your workflow?";
    }

    if (lower.includes("crm") || lower.includes("automation") || lower.includes("workflow")) {
      return "Absolutely — website lead capture → CRM pipeline, follow-ups, tasks/reminders, and onboarding workflows. Tap **Request Callback** when ready.";
    }

    if (lower.includes("contact") || lower.includes("email") || lower.includes("whatsapp")) {
      return `You can reach us at:\n\n📧 ${SUPPORT_EMAIL}\n💬 WhatsApp (use the WhatsApp button in the callback form)\n\nOr request a callback below.`;
    }

    return "Tell me your business type and your goal — I’ll suggest the best setup.";
  };

  const pushBotMessage = (text: string, delay = 850) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text, timestamp: new Date() }]);
    }, delay);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const userText = message.trim();

    setMessages((prev) => [...prev, { type: "user", text: userText, timestamp: new Date() }]);
    setMessage("");

    pushBotMessage(getBotResponse(userText), 850 + Math.random() * 500);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(handleSend, 80);
  };

  const openLeadForm = () => {
    setMode("lead");
    setLeadStatus("idle");
    setLeadMsg("");
    setMessages((prev) => [...prev, { type: "system", text: "🔔 Great — share your details below and we’ll get back to you.", timestamp: new Date() }]);
  };

  const buildWhatsappLink = () => {
    const text =
      `Hi NIXRIX, I’d like a callback.\n\n` +
      `Name: ${lead.name || "-"}\n` +
      `Email: ${lead.email || "-"}\n` +
      `Phone: ${lead.phone || "-"}\n` +
      `Message: ${lead.message || "-"}\n` +
      `Page: ${window.location.href}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoLink = () => {
    const subject = "NIXRIX Callback Request";
    const body =
      `Hi NIXRIX,\n\nI’d like a callback.\n\n` +
      `Name: ${lead.name || "-"}\n` +
      `Email: ${lead.email || "-"}\n` +
      `Phone: ${lead.phone || "-"}\n` +
      `Message: ${lead.message || "-"}\n` +
      `Page: ${window.location.href}\n`;
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

    if (lead.preferredContact === "email") {
      if (!isValidEmail(email)) {
        setLeadStatus("error");
        setLeadMsg("Please enter a valid email address.");
        return;
      }
    } else {
      if (!isValidPhone(phone)) {
        setLeadStatus("error");
        setLeadMsg("Please enter a valid WhatsApp/phone number.");
        return;
      }
    }

    setLeadStatus("loading");
    setLeadMsg("");

    const payload: LeadPayload = {
      type: "CHAT_LIVE_REQUEST",
      name,
      email: email || undefined,
      phone: phone || undefined,
      message: msg || undefined,
      source: "chatbot",
      pageUrl: window.location.href,
      meta: { preferredContact: lead.preferredContact },
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

      setMessages((prev) => [...prev, { type: "system", text: "✅ Request received. Our team will contact you soon.", timestamp: new Date() }]);

      setTimeout(() => {
        setMode("chat");
        pushBotMessage("While you wait — tell me your business type and goal, and I’ll suggest the best setup.", 800);
      }, 850);

      setLead({ name: "", email: "", phone: "", message: "", preferredContact: "whatsapp" });
    } catch {
      setLeadStatus("error");
      setLeadMsg("Couldn’t send right now. Please try again, or message us on WhatsApp / email.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0D9488] text-white rounded-full p-4 shadow-2xl hover:bg-[#0c8479] transition-colors relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open chat"
        >
          {!isOpen && (
            <motion.span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
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
                    <p className={`text-xs mt-1 ${msg.type === "bot" ? "text-gray-400" : msg.type === "system" ? "text-blue-400" : "text-white/70"}`}>
                      {msg.timestamp.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}

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
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}

              {mode === "lead" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">Request a callback</div>
                      <div className="text-xs text-gray-500 mt-1">Choose WhatsApp or Email — we’ll contact you soon.</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setLead((p) => ({ ...p, preferredContact: "whatsapp" }))}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition ${
                        lead.preferredContact === "whatsapp" ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={() => setLead((p) => ({ ...p, preferredContact: "email" }))}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition ${
                        lead.preferredContact === "email" ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
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

                    {lead.preferredContact === "email" ? (
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={lead.email}
                          onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                          placeholder="Email *"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={lead.phone}
                          onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="WhatsApp number *"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                        />
                      </div>
                    )}

                    <textarea
                      value={lead.message}
                      onChange={(e) => setLead((p) => ({ ...p, message: e.target.value }))}
                      placeholder="What do you need help with? (optional)"
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 focus:border-[#06B6D4]/40"
                    />

                    <Button type="submit" className="w-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white" disabled={leadStatus === "loading"}>
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

                    <div className="grid grid-cols-2 gap-2">
                      <a href={buildWhatsappLink()} target="_blank" rel="noreferrer" className="w-full">
                        <Button variant="outline" className="w-full border-2">
                          WhatsApp Us
                        </Button>
                      </a>
                      <a href={buildMailtoLink()} className="w-full">
                        <Button variant="outline" className="w-full border-2">
                          Email Us
                        </Button>
                      </a>
                    </div>

                    {leadStatus === "error" && <div className="text-xs rounded-xl px-3 py-2 border border-red-200 bg-red-50 text-red-700">{leadMsg}</div>}
                    {leadStatus === "success" && <div className="text-xs rounded-xl px-3 py-2 border border-emerald-200 bg-emerald-50 text-emerald-800">{leadMsg}</div>}

                    <p className="text-[11px] text-gray-500 leading-relaxed">By submitting, you agree to be contacted about your enquiry. We don’t sell your data.</p>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {mode === "chat" && !liveChatRequested && messages.length > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-200">
                <motion.button
                  onClick={openLeadForm}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="w-4 h-4" />
                  Request Callback
                  <Phone className="w-4 h-4" />
                </motion.button>
              </div>
            )}

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
