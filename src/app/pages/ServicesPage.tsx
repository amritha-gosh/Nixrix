import { Link } from 'react-router-dom';
import { Globe, MessageSquare, BarChart3, Zap, Search, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export function ServicesPage() {
  const serviceGroups = [
    {
      id: 'website-design',
      icon: <Globe className="w-12 h-12" />,
      title: 'Website Design (Core)',
      tagline: 'Professional, responsive websites built for growth',
      description: 'From single-page sites to full business platforms—clean, fast, mobile-ready, and SEO-optimized from day one.',
      pricing: 'Starting from £199',
      services: [
        { name: 'One-Page Websites', desc: 'Perfect for landing pages, portfolios, or campaign sites' },
        { name: 'Business Websites', desc: 'Multi-page sites for service businesses and SMEs' },
        { name: 'Portfolio Websites', desc: 'Showcase your work beautifully with modern design' },
        { name: 'E-commerce Ready', desc: 'Online stores with product catalogues and checkout' }
      ],
      features: [
        'Mobile-first responsive design',
        'Performance optimization',
        'On-page SEO ready',
        'Content management system',
        'Contact forms & integrations',
        'SSL security & hosting setup'
      ],
      benefits: 'Great for businesses that need a strong digital presence without complexity.'
    },
    {
      id: 'ai-chatbots',
      icon: <MessageSquare className="w-12 h-12" />,
      title: 'Websites with AI Chatbots',
      tagline: 'Engage visitors 24/7 with intelligent automation',
      description: 'Add AI-powered chatbots to your website for automated support, lead capture, and customer engagement.',
      pricing: 'Website + Chatbot from £399',
      services: [
        { name: 'FAQ Chatbots', desc: 'Answer common questions automatically' },
        { name: 'Lead Capture Bots', desc: 'Qualify and capture leads while you sleep' },
        { name: 'Support Chatbots', desc: '24/7 customer support automation' },
        { name: 'Custom Training', desc: 'Trained on your business content and FAQs' }
      ],
      features: [
        'AI-powered conversations',
        'Custom training on your content',
        'Lead capture & qualification',
        'Multi-language support',
        'CRM integration',
        '24/7 availability'
      ],
      benefits: 'Perfect for businesses wanting to automate customer engagement and capture more leads.'
    },
    {
      id: 'intelligent-websites',
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Intelligent Websites (Advanced)',
      tagline: 'Websites with embedded KPI dashboards & insights',
      description: 'Turn your website into a business intelligence tool with live dashboards, automated insights, and data-driven decision making.',
      pricing: 'Contact for custom quote',
      services: [
        { name: 'Power BI Dashboard Integration', desc: 'Embed live dashboards directly into your site' },
        { name: 'Real-Time Data Refresh', desc: 'Auto-updating metrics and KPIs' },
        { name: 'Plain-Language Insights', desc: 'Explanations next to every metric' },
        { name: 'Automated Alerts', desc: 'Get notified when KPIs hit thresholds' }
      ],
      features: [
        'Power BI dashboard embedding',
        'Live or scheduled data refresh',
        'KPI explanations in plain English',
        'Automated email/Slack alerts',
        'Multiple data source connections',
        'Custom metric tracking'
      ],
      benefits: 'Ideal for data-driven businesses that want insights and metrics directly on their website.'
    },
    {
      id: 'automation-seo',
      icon: <Zap className="w-12 h-12" />,
      title: 'Automation & Optimization',
      tagline: 'Make your website work smarter',
      description: 'Workflow automation, lead follow-ups, and advanced optimization to maximize your website performance.',
      pricing: 'Add-on from £149',
      services: [
        { name: 'Workflow Automation', desc: 'Automate repetitive tasks and processes' },
        { name: 'Lead Follow-Up Automation', desc: 'Automatic email sequences for new leads' },
        { name: 'Data-Triggered Actions', desc: 'Actions based on user behavior or metrics' },
        { name: 'Business Process Optimization', desc: 'Streamline operations through automation' }
      ],
      features: [
        'Custom workflow automation',
        'Email marketing integration',
        'Lead nurturing sequences',
        'CRM synchronization',
        'Analytics event tracking',
        'Zapier/Make integrations'
      ],
      benefits: 'For businesses that want to save time and scale operations through automation.'
    },
    {
      id: 'seo-technical',
      icon: <Search className="w-12 h-12" />,
      title: 'SEO & Technical Setup',
      tagline: 'Get found online and perform better',
      description: 'Technical SEO, on-page optimization, and performance tuning to help your website rank and convert.',
      pricing: 'Included or from £199',
      services: [
        { name: 'Technical SEO Setup', desc: 'Site structure, indexing, and crawlability' },
        { name: 'On-Page SEO', desc: 'Meta tags, headers, schema markup' },
        { name: 'Performance Optimization', desc: 'Speed, loading times, Core Web Vitals' },
        { name: 'SEO-Ready Architecture', desc: 'Built for search engines from day one' }
      ],
      features: [
        'Technical SEO audit & setup',
        'On-page optimization',
        'Schema markup',
        'Performance optimization',
        'Google Search Console setup',
        'Analytics & tracking'
      ],
      benefits: 'Essential for businesses that want to be found online and convert more visitors.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Web Design Services - AI Chatbots, Dashboards & SEO | NIXRIX"
        description="Flexible web design services from £199. Choose from website design, AI chatbots, KPI dashboards, automation, and SEO. Custom solutions for UK businesses."
        keywords="web design services, AI chatbot integration, KPI dashboard, Power BI, SEO services, website automation, UK web development"
        schemaType="service"
      />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Services
            </motion.span>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Flexible Solutions for Every Business
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              From simple websites to advanced platforms with AI, dashboards, and automation.
              Choose what you need, add features as you grow.
            </motion.p>
            <motion.div
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-white text-lg">
                <span className="font-bold text-[#06B6D4]">Starting from £199</span> • Final pricing depends on features and complexity
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Groups */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Service Level
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mix and match services to create the perfect solution for your business.
            </p>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-6">
            {serviceGroups.map((group, index) => (
              <ScrollReveal key={group.id} delay={index * 0.1}>
                <AccordionItem value={group.id} className="border-0">
                  <Card className="border-2 hover:border-[#0D9488] transition-all duration-300 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline p-0">
                      <CardContent className="p-8 w-full">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                              {group.icon}
                            </div>
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{group.title}</h3>
                                <p className="text-[#06B6D4] font-semibold">{group.tagline}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="inline-block bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                                  {group.pricing}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{group.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-8 pb-8 pt-4 border-t">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                            <ul className="space-y-3">
                              {group.services.map((service, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Check className="w-5 h-5 text-[#0D9488] mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <strong className="text-gray-900">{service.name}</strong>
                                    <p className="text-sm text-gray-600">{service.desc}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {group.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start">
                                  <Check className="w-4 h-4 text-[#0D9488] mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-[#06B6D4] p-4 mb-6 rounded-r">
                          <p className="text-sm text-blue-900">
                            <strong>Best for:</strong> {group.benefits}
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <Link to="/contact" className="flex-1 sm:flex-none">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0c8479] text-white">
                                Discuss This Service
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </motion.div>
                          </Link>
                          <Link to="/demo">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button variant="outline" className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/5">
                                View Demo
                              </Button>
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="border-l-4 border-[#0D9488] shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How Pricing Works</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Projects start from £199</strong> for simple one-page websites.
                  </p>
                  <p>
                    Final pricing depends on:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Number of pages and features</li>
                    <li>Integration requirements (CRM, chatbot, dashboards)</li>
                    <li>Customization and design complexity</li>
                    <li>Data sources and automation needs</li>
                  </ul>
                  <p>
                    <strong>We provide transparent quotes</strong> after understanding your requirements.
                    No hidden fees, no surprises.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] to-[#06B6D4]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure What You Need?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a free consultation and we'll recommend the best solution for your business.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-10 py-6 shadow-2xl">
                  Get a Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}