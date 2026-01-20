import { Link } from 'react-router-dom';
import { Search, PenTool, Code, TestTube, Rocket, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { motion } from 'motion/react';

export function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: <Search className="w-12 h-12 text-white" />,
      title: 'Discovery & Requirements',
      description: 'We start by understanding your business goals, target audience, and project requirements.',
      details: [
        'Business goals & objectives discussion',
        'Website type & feature requirements',
        'AI chatbot & automation needs assessment',
        'Dashboard & analytics requirements',
        'Budget & timeline planning'
      ],
      timeline: '1-2 days',
      color: 'from-[#0D9488] to-[#06B6D4]'
    },
    {
      number: '02',
      icon: <PenTool className="w-12 h-12 text-white" />,
      title: 'Design & Architecture',
      description: 'We create the blueprint for your website, including design, structure, and technical planning.',
      details: [
        'Website design & wireframes',
        'AI chatbot conversation planning',
        'Dashboard layout & KPI selection',
        'SEO structure & content strategy',
        'Technical architecture planning'
      ],
      timeline: '3-5 days',
      color: 'from-[#06B6D4] to-[#0891b2]'
    },
    {
      number: '03',
      icon: <Code className="w-12 h-12 text-white" />,
      title: 'Build & Integration',
      description: 'We develop your website and integrate all requested features including AI, dashboards, and automation.',
      details: [
        'Website development (responsive & fast)',
        'AI chatbot integration & training',
        'Power BI dashboard embedding',
        'Automation & workflow setup',
        'SEO implementation & optimization'
      ],
      timeline: '5-8 days',
      color: 'from-[#0891b2] to-[#0D9488]'
    },
    {
      number: '04',
      icon: <TestTube className="w-12 h-12 text-white" />,
      title: 'Review, Optimize & Test',
      description: 'Thorough testing and optimization to ensure everything works perfectly before launch.',
      details: [
        'UX testing & refinement',
        'Performance & speed optimization',
        'SEO validation & checks',
        'Data & automation testing',
        'Cross-browser & device testing'
      ],
      timeline: '2-3 days',
      color: 'from-[#0D9488] to-[#14b8a6]'
    },
    {
      number: '05',
      icon: <Rocket className="w-12 h-12 text-white" />,
      title: 'Launch & Support',
      description: 'We launch your website and provide ongoing support to ensure continued success.',
      details: [
        'Website deployment & launch',
        'Training & documentation',
        'Analytics & tracking setup',
        'Ongoing support & maintenance',
        'Optional enhancements & updates'
      ],
      timeline: '1-2 days',
      color: 'from-[#14b8a6] to-[#06B6D4]'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="How It Works - Our Process | NIXRIX"
        description="Discover our 5-step process from discovery to launch. We build websites, AI chatbots, dashboards, and automation in 10-14 days."
        keywords="web design process, how we work, website development, AI chatbot integration, dashboard development"
      />
      <ChatbotWidget />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our proven 5-step process takes you from discovery to launch in 10–14 days. 
              Clear, collaborative, and designed for success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps - Storyboard Style */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0D9488] via-[#06B6D4] to-[#0D9488] transform -translate-x-1/2"></div>

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                  }`}>
                    {/* Content */}
                    <motion.div 
                      className={index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}
                      whileHover={{ x: index % 2 === 0 ? 5 : -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="border-2 hover:border-[#0D9488] transition-all shadow-xl">
                        <CardContent className="p-8">
                          <div className="flex items-center justify-between mb-6">
                            <motion.div 
                              className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {step.icon}
                            </motion.div>
                            <span className="text-6xl font-bold text-gray-100">{step.number}</span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                              What We Do:
                            </h4>
                            <ul className="space-y-3">
                              {step.details.map((detail, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  <Check className="w-5 h-5 text-[#0D9488] mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t">
                            <span className="text-sm text-gray-600">Timeline</span>
                            <span className="inline-block bg-gradient-to-r from-[#0D9488]/10 to-[#06B6D4]/10 text-[#0D9488] px-4 py-2 rounded-full text-sm font-semibold">
                              {step.timeline}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Visual Indicator */}
                    <motion.div 
                      className={`hidden lg:flex justify-center ${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className={`w-32 h-32 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-2xl relative`}>
                        <span className="text-4xl font-bold text-white">{step.number}</span>
                        {index < steps.length - 1 && (
                          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-[#06B6D4] to-transparent"></div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="border-l-4 border-[#0D9488] shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Total Timeline</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-sm text-gray-600 mb-2">Standard Website Project</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-[#0D9488] to-[#06B6D4] bg-clip-text text-transparent">
                      10–14 days
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-sm text-gray-600 mb-2">Starting Price</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#0D9488] bg-clip-text text-transparent">
                      £199
                    </p>
                  </motion.div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Timelines assume you can provide feedback and content within 1–2 business days at each stage. 
                  We work flexibly around your schedule and keep you updated throughout the entire process.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Our Process Different
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine speed with quality, ensuring every project is built to the highest standards.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Delivery',
                description: 'Complete projects in 10-14 days without compromising on quality',
                icon: '⚡'
              },
              {
                title: 'Full Transparency',
                description: 'Clear communication, realistic timelines, and honest feedback',
                icon: '🎯'
              },
              {
                title: 'Ongoing Support',
                description: 'We don\'t disappear after launch—ongoing support included',
                icon: '🤝'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors text-center">
                    <CardContent className="p-6">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] to-[#06B6D4]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book a free consultation and let's discuss your project.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-12 py-6 shadow-2xl">
                  Start Your Project
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
