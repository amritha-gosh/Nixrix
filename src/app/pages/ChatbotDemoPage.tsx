import { ArrowLeft, MessageCircle, Send, Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { SEOHead } from '@/app/components/SEOHead';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { motion } from 'motion/react';

export function ChatbotDemoPage() {
  const conversationFlow = [
    { type: 'user', text: 'Hi, what services do you offer?' },
    { type: 'bot', text: 'Hello! We offer 5 main service groups:\n• Website Design (from £199)\n• AI Chatbots (from £399)\n• Intelligent Websites with Dashboards\n• Automation & SEO\n• Custom Solutions\n\nWhich would you like to know more about?' },
    { type: 'user', text: 'Tell me about AI chatbots' },
    { type: 'bot', text: 'Our AI chatbots are perfect for:\n• 24/7 customer support\n• Lead capture & qualification\n• FAQ automation\n• Multi-language support\n\nThey\'re custom-trained on your business content and integrate seamlessly with your website.' },
    { type: 'user', text: 'How much does it cost?' },
    { type: 'bot', text: 'Chatbot integration starts from £399 including website setup. The final price depends on:\n• Conversation complexity\n• Number of integrations (CRM, email, etc.)\n• Custom training requirements\n\nWould you like a custom quote?' },
  ];

  const features = [
    {
      title: 'Natural Conversations',
      description: 'AI understands context and provides human-like responses',
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: 'Lead Capture',
      description: 'Automatically qualify and capture visitor information',
      icon: <User className="w-6 h-6" />
    },
    {
      title: 'Custom Training',
      description: 'Trained on your FAQs, services, and business knowledge',
      icon: <Bot className="w-6 h-6" />
    },
    {
      title: '24/7 Availability',
      description: 'Never miss a lead—chatbot works around the clock',
      icon: <Send className="w-6 h-6" />
    },
  ];

  const useCases = [
    {
      title: 'Customer Support',
      example: 'Answer common questions, troubleshoot issues, escalate complex queries to human agents'
    },
    {
      title: 'Lead Generation',
      example: 'Qualify leads, collect contact details, schedule consultations automatically'
    },
    {
      title: 'Product Recommendations',
      example: 'Guide customers to the right product/service based on their needs'
    },
    {
      title: 'Appointment Booking',
      example: 'Schedule meetings, send calendar invites, manage availability'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="AI Chatbot Demo - Live Conversation Example | NIXRIX"
        description="See how our AI chatbots engage visitors, capture leads, and provide 24/7 support. Custom-trained on your business knowledge."
        keywords="AI chatbot demo, live chatbot, customer support automation, lead capture bot"
      />
      <ChatbotWidget />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-white text-sm font-semibold">Live Demo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Chatbot in Action
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Try the chatbot widget on this page! It's a live example of what we can build for your business—trained on your content and ready to engage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Call to Action - Try Widget */}
          <ScrollReveal>
            <Card className="mb-12 bg-gradient-to-r from-[#0D9488]/10 to-[#06B6D4]/10 border-2 border-[#0D9488]/30">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-[#0D9488] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  👉 Try the Live Chatbot (Bottom Right)
                </h2>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Click the chat icon in the bottom-right corner to experience a working AI chatbot. 
                  It's trained to answer questions about NIXRIX services.
                </p>
                <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-md">
                  <p className="text-sm text-gray-700">
                    <strong>Try asking:</strong> "What services do you offer?" or "How much does a website cost?"
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Conversation Example */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Example Conversation Flow
                </h2>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {conversationFlow.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${
                            message.type === 'user' 
                              ? 'bg-[#0D9488] text-white' 
                              : 'bg-gray-100 text-gray-800'
                          } p-4 rounded-2xl`}>
                            <div className="flex items-center gap-2 mb-2">
                              {message.type === 'bot' ? (
                                <Bot className="w-4 h-4" />
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                              <span className="text-xs font-semibold">
                                {message.type === 'bot' ? 'AI Assistant' : 'Visitor'}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Key Features
                </h2>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="border-2 hover:border-[#0D9488] transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center text-[#0D9488]">
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Use Cases */}
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <strong>Example:</strong> {useCase.example}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-to-r from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Add AI to Your Website?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We'll build and train a custom chatbot for your business, 
                  integrate it with your website, and help you improve customer engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
                      Get Your Chatbot
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline" className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/5">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}