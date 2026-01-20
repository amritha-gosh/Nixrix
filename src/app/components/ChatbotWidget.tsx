import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Message {
  type: 'bot' | 'user' | 'system';
  text: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [liveChatRequested, setLiveChatRequested] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting after a short delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              type: 'bot',
              text: "👋 Hi! I'm the NIXRIX AI Assistant. I can help answer questions about our services, pricing, and process.",
              timestamp: new Date()
            }
          ]);
          
          // Follow-up message
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, {
                type: 'bot',
                text: "What can I help you with today? Or would you prefer to speak with someone from our team?",
                timestamp: new Date()
              }]);
            }, 1000);
          }, 1500);
        }, 1500);
      }, 500);
    }
  }, [isOpen]);

  const quickReplies = [
    "What services do you offer?",
    "How much does a website cost?",
    "Tell me about AI chatbots",
    "How long does it take?"
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Live chat related keywords
    if (lowerMessage.includes('speak') || lowerMessage.includes('talk') || 
        lowerMessage.includes('human') || lowerMessage.includes('person') ||
        lowerMessage.includes('live') || lowerMessage.includes('real')) {
      return "I'd be happy to connect you with our team! Click the 'Request Live Chat' button below to notify us, and we'll reach out to you shortly via email or phone.";
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
      return "NIXRIX offers 5 main service groups:\n\n✅ Website Design (from £249)\n✅ AI Chatbots (from £399)\n✅ Intelligent Websites with Power BI Dashboards\n✅ Automation & SEO Services\n✅ Custom Business Solutions\n\nAll websites are modern, responsive, and built with the latest technology. Which service interests you?";
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('much') || lowerMessage.includes('pricing')) {
      return "Our flexible pricing starts from:\n\n💰 Basic Website: £249\n💰 Website + Chatbot: £399+\n💰 Intelligent Website (with Dashboard): Custom quote\n💰 Full Business Solution: Custom quote\n\nPricing depends on:\n• Number of pages & features\n• AI chatbot integration\n• Dashboard/Power BI requirements\n• Custom functionality\n\nWould you like a personalized quote?";
    }
    
    if (lowerMessage.includes('chatbot') || lowerMessage.includes('ai') || lowerMessage.includes('bot')) {
      return "Our AI Chatbots are perfect for:\n\n🤖 24/7 automated customer support\n💬 Lead capture & qualification\n📚 Instant FAQ responses\n🌐 Multi-language support\n📊 Conversation analytics\n\nChatbots are custom-trained on YOUR business content and can be embedded on any page. Pricing starts from £399 for website + chatbot integration.\n\nThis conversation is powered by one! 😊";
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('fast') || lowerMessage.includes('quick')) {
      return "Our typical project timeline:\n\n⏱️ Discovery Call: 30-60 minutes\n📋 Planning & Design: 3-5 days\n💻 Development: 4-7 days\n🧪 Testing & Review: 1-2 days\n🚀 Launch: 1 day\n\n✅ Total: 10-14 days for complete websites\n✅ We can start within 1-2 weeks after our initial call!\n\nNeed it faster? We offer express delivery options.";
    }
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('kpi') || lowerMessage.includes('power bi') || lowerMessage.includes('data') || lowerMessage.includes('analytics')) {
      return "Our Intelligent Websites with Power BI Dashboards include:\n\n📊 Embedded Power BI dashboards\n📈 Real-time KPI tracking\n💡 Plain-language insights & explanations\n🔔 Automated alerts & notifications\n📱 Mobile-responsive design\n🔐 Secure data access\n\nPerfect for data-driven businesses and SMEs. Check out our Dashboard Demo to see it in action!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return "Great! You can contact us at:\n\n📧 hello@nixrix.com\n📍 Leeds, UK\n⏰ Response time: Within 24 hours\n\n💬 Or click 'Request Live Chat' below to speak with our team directly!\n\nWe're here to help bring your digital vision to life.";
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('example') || lowerMessage.includes('show')) {
      return "You're experiencing a live demo right now! 😊\n\nThis AI chatbot is an example of what we build. Explore more demos:\n\n• Dashboard Demo - See Power BI integration\n• Chatbot Demo - Advanced AI features\n• Website Showcase - Portfolio examples\n• Service Demos - Industry-specific sites\n\nAll live and interactive!";
    }
    
    if (lowerMessage.includes('seo') || lowerMessage.includes('google') || lowerMessage.includes('ranking') || lowerMessage.includes('search')) {
      return "Our SEO & Optimization services include:\n\n🔍 Technical SEO (speed, structure, mobile)\n📝 On-page optimization (meta tags, content)\n🔗 Schema markup & rich snippets\n📊 Google Search Console setup\n📈 Performance monitoring\n\nAll websites are built SEO-ready from day one. We can also provide ongoing SEO management!";
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('workflow') || lowerMessage.includes('automate')) {
      return "We build powerful automation solutions:\n\n⚡ Workflow automation\n📧 Email marketing integration\n🔗 CRM connectivity\n📊 Automated reporting\n💬 Chatbot-to-CRM lead capture\n\nStreamline your business processes and save time. Want to discuss your automation needs?";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based') || lowerMessage.includes('leeds')) {
      return "We're based in Leeds, UK! 🇬🇧\n\nWhile we're proudly Yorkshire-based, we serve clients across the UK and internationally. All communication is remote-friendly via:\n\n• Video calls (Zoom, Teams)\n• Email: hello@nixrix.com\n• Phone consultations\n\nDistance is no barrier to great work!";
    }
    
    if (lowerMessage.includes('quote') || lowerMessage.includes('proposal') || lowerMessage.includes('estimate')) {
      return "I'd love to get you a custom quote!\n\nTo provide an accurate estimate, our team will need to understand:\n\n✓ Your business goals\n✓ Desired features\n✓ Timeline expectations\n✓ Integration requirements\n\nClick 'Request Live Chat' or email us at hello@nixrix.com and we'll prepare a personalized proposal within 24-48 hours!";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! 😊\n\nIs there anything else I can help you with? Or would you like to speak with our team directly?";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Great to chat with you!\n\nHow can I help you today? I can answer questions about our services, pricing, timelines, or connect you with our team for a personalized conversation.";
    }
    
    return "That's a great question! For detailed information, I recommend:\n\n1️⃣ Browsing our Services page\n2️⃣ Checking out our live demos\n3️⃣ Requesting a free consultation\n4️⃣ Speaking with our team directly\n\nFeel free to ask me anything about:\n• Website Design\n• AI Chatbots\n• Power BI Dashboards\n• Automation & SEO\n• Pricing & Timelines\n\nOr click 'Request Live Chat' to speak with someone!";
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      text: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        type: 'bot',
        text: getBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleRequestLiveChat = () => {
    setLiveChatRequested(true);
    
    // Add system message
    const systemMessage: Message = {
      type: 'system',
      text: "🔔 Live chat requested! Our team has been notified and will contact you shortly at hello@nixrix.com or via phone if you've provided your details.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);

    // Send notification email (in real implementation, this would call an API)
    // For now, we'll just show a follow-up message
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botResponse: Message = {
          type: 'bot',
          text: "Thank you! We'll get back to you as soon as possible. In the meantime, feel free to continue asking me questions or browse our website.\n\nExpected response time: Within 2-4 hours during business hours (Mon-Fri, 9am-6pm GMT).",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    }, 1000);
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
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ maxHeight: '650px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold">NIXRIX AI Assistant</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online - AI Powered
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.type === 'bot' || msg.type === 'system' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'bot' 
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                      : msg.type === 'system'
                      ? 'bg-blue-50 text-blue-800 shadow-sm border border-blue-200'
                      : 'bg-[#0D9488] text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'bot' ? 'text-gray-400' : 
                      msg.type === 'system' ? 'text-blue-400' : 
                      'text-white/70'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
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
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Live Chat Request Button */}
            {!liveChatRequested && messages.length > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-200">
                <motion.button
                  onClick={handleRequestLiveChat}
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
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message) {
                      handleSend();
                    }
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
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI Chatbot by NIXRIX – Live Demo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
