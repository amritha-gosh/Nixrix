import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, Sparkles, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Link } from "react-router-dom";

interface Message {
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              type: "bot",
              text: "👋 Hi! I’m the NIXRIX Assistant. I can answer questions about our website services, AI chatbots, dashboards, e-commerce, ERP integration, SEO, and our process.",
              timestamp: new Date(),
            },
            {
              type: "bot",
              text: "Ask me anything, or use the Contact Us button below if you'd like to discuss your project.",
              timestamp: new Date(),
            },
          ]);
        }, 900);
      }, 400);
    }
  }, [isOpen, messages.length]);

  const quickReplies = [
    "What services do you offer?",
    "Do you build e-commerce websites?",
    "Can you integrate ERP or stock systems?",
    "How do you work?",
  ];

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (
      lower.includes("service") ||
      lower.includes("offer") ||
      lower.includes("do you do") ||
      lower.includes("what do you do")
    ) {
      return (
        "We mainly build business websites with custom features based on client needs.\n\n" +
        "Our services include:\n" +
        "• Business website design\n" +
        "• AI chatbot integration\n" +
        "• KPI dashboards and business insights\n" +
        "• Automation and workflow setup\n" +
        "• E-commerce websites\n" +
        "• ERP / stock / order system integrations\n" +
        "• SEO and technical optimisation"
      );
    }

    if (
      lower.includes("ecommerce") ||
      lower.includes("e-commerce") ||
      lower.includes("shopify") ||
      lower.includes("woocommerce") ||
      lower.includes("store")
    ) {
      return (
        "Yes — we build e-commerce websites and online stores.\n\n" +
        "We can work with:\n" +
        "• Shopify\n" +
        "• WooCommerce\n" +
        "• Custom e-commerce setups\n\n" +
        "We can also support stock, orders, checkout flows, and operational integrations."
      );
    }

    if (
      lower.includes("erp") ||
      lower.includes("inventory") ||
      lower.includes("stock") ||
      lower.includes("order management")
    ) {
      return (
        "Yes — we can integrate websites with ERP-style workflows and stock/order systems.\n\n" +
        "This can include:\n" +
        "• stock visibility\n" +
        "• inventory sync\n" +
        "• order flow management\n" +
        "• invoicing / operations support\n" +
        "• reporting dashboards"
      );
    }

    if (
      lower.includes("dashboard") ||
      lower.includes("kpi") ||
      lower.includes("analytics") ||
      lower.includes("data")
    ) {
      return (
        "We can add KPI dashboards and business insight tools to websites.\n\n" +
        "Examples include:\n" +
        "• lead and enquiry tracking\n" +
        "• performance reporting\n" +
        "• sales / operational summaries\n" +
        "• visual dashboards with plain-language insights"
      );
    }

    if (
      lower.includes("seo") ||
      lower.includes("ranking") ||
      lower.includes("google") ||
      lower.includes("search")
    ) {
      return (
        "Yes — we provide SEO and technical setup.\n\n" +
        "This includes:\n" +
        "• on-page SEO structure\n" +
        "• technical optimisation\n" +
        "• metadata and schema basics\n" +
        "• speed and performance improvements\n" +
        "• search visibility foundations"
      );
    }

    if (
      lower.includes("how do you work") ||
      lower.includes("process") ||
      lower.includes("timeline") ||
      lower.includes("how we work")
    ) {
      return (
        "Our process is simple:\n\n" +
        "1. Discovery & audit\n" +
        "2. Planning & structure\n" +
        "3. Design & development\n" +
        "4. Integrations & optimisation\n" +
        "5. Launch & support\n\n" +
        "We adapt the project timeline based on the scope and features required."
      );
    }

    if (
      lower.includes("price") ||
      lower.includes("pricing") ||
      lower.includes("cost") ||
      lower.includes("quote")
    ) {
      return (
        "Pricing depends on the type of website, features, integrations, and complexity.\n\n" +
        "We usually recommend discussing your requirements first so we can provide the right scope and quote."
      );
    }

    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("call") ||
      lower.includes("talk")
    ) {
      return (
        "You can contact us through the Contact page or email us at hello@nixrix.com.\n\n" +
        "Use the Contact Us button below and we’ll get back to you."
      );
    }

    return (
      "I can help with:\n" +
      "• website services\n" +
      "• e-commerce websites\n" +
      "• ERP / stock integrations\n" +
      "• dashboards & analytics\n" +
      "• AI chatbots\n" +
      "• SEO\n\n" +
      "Or you can use the Contact Us button below to discuss your project."
    );
  };

  const pushBotMessage = (text: string, delay = 850) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text, timestamp: new Date() }]);
    }, delay);
  };

  const handleSend = () => {
    const userText = message.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { type: "user", text: userText, timestamp: new Date() }]);
    setMessage("");
    pushBotMessage(getBotResponse(userText), 800 + Math.random() * 400);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 80);
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
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
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

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 text-xs bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Answers
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
                  className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[84%] p-3 rounded-2xl ${
                      msg.type === "bot"
                        ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                        : "bg-[#0D9488] text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.type === "bot" ? "text-gray-400" : "text-white/70"}`}>
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

              {messages.length <= 2 && !isTyping && (
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

              <div ref={messagesEndRef} />
            </div>

            {/* Contact CTA */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-200">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) handleSend();
                  }}
                />
                <Button
                  size="icon"
                  className="bg-[#0D9488] hover:bg-[#0c8479]"
                  onClick={handleSend}
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">NIXRIX Assistant</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
