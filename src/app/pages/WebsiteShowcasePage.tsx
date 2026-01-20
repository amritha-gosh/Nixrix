import { ArrowLeft, Zap, Smartphone, Search, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { SEOHead } from '@/app/components/SEOHead';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { motion } from 'motion/react';

export function WebsiteShowcasePage() {
  const features = [
    {
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile devices',
      icon: <Smartphone className="w-8 h-8" />,
      demo: 'Try resizing your browser to see responsive behavior'
    },
    {
      title: 'Performance Optimized',
      description: 'Fast loading times with optimized assets and lazy loading',
      icon: <Gauge className="w-8 h-8" />,
      demo: 'This page loads in under 2 seconds'
    },
    {
      title: 'SEO Ready',
      description: 'Proper meta tags, structured data, and semantic HTML',
      icon: <Search className="w-8 h-8" />,
      demo: 'View page source to see SEO implementation'
    },
    {
      title: 'Modern Animations',
      description: 'Smooth scroll effects, hover states, and micro-interactions',
      icon: <Zap className="w-8 h-8" />,
      demo: 'Scroll and hover to see animations in action'
    },
  ];

  const designElements = [
    'Clean, professional typography',
    'Consistent color scheme and branding',
    'Intuitive navigation structure',
    'Clear call-to-action buttons',
    'Accessible design (WCAG compliant)',
    'Fast, smooth page transitions'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Modern Website Showcase - Design & Performance Demo | NIXRIX"
        description="See our modern website design in action. Responsive layouts, smooth animations, SEO optimization, and performance-focused development."
        keywords="website showcase, modern web design, responsive website, performance optimization"
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
              Modern Website Showcase
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              This website itself is the demo! Every page demonstrates modern design principles, 
              performance optimization, and professional interactions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* This Site is the Demo */}
          <ScrollReveal>
            <Card className="mb-12 bg-gradient-to-r from-[#0D9488]/10 to-[#06B6D4]/10 border-2 border-[#0D9488]/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  You're Experiencing the Demo Right Now
                </h2>
                <p className="text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto">
                  The NIXRIX website you're browsing is itself a live demonstration of our capabilities. 
                  Every feature you see—animations, responsive design, chatbot, SEO—is what we build for clients.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-[#0D9488] mb-1">Smooth Animations</p>
                    <p className="text-xs text-gray-600">Scroll to see reveal effects</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-[#0D9488] mb-1">Hover Interactions</p>
                    <p className="text-xs text-gray-600">Cards elevate on hover</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-[#0D9488] mb-1">Live Chatbot</p>
                    <p className="text-xs text-gray-600">Try it in the bottom-right</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-[#0D9488]/10 rounded-xl flex items-center justify-center text-[#0D9488]">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p className="text-sm text-blue-900">
                          <strong>Try it:</strong> {feature.demo}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Design Elements */}
          <ScrollReveal>
            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Design Principles Applied
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {designElements.map((element, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-[#0D9488] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{element}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Interactive Demo Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ScrollReveal>
              <Card className="bg-gradient-to-br from-gray-50 to-white border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Explore the Website</h3>
                  <div className="space-y-3">
                    <Link to="/services">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="p-4 bg-white border-2 rounded-lg hover:border-[#0D9488] transition-colors cursor-pointer"
                      >
                        <p className="font-semibold text-gray-900">Services Page</p>
                        <p className="text-sm text-gray-600">See expandable accordion layout</p>
                      </motion.div>
                    </Link>
                    <Link to="/contact">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="p-4 bg-white border-2 rounded-lg hover:border-[#0D9488] transition-colors cursor-pointer"
                      >
                        <p className="font-semibold text-gray-900">Contact Page</p>
                        <p className="text-sm text-gray-600">Fully responsive form with micro-interactions</p>
                      </motion.div>
                    </Link>
                    <Link to="/how-it-works">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="p-4 bg-white border-2 rounded-lg hover:border-[#0D9488] transition-colors cursor-pointer"
                      >
                        <p className="font-semibold text-gray-900">How It Works</p>
                        <p className="text-sm text-gray-600">Step-by-step timeline animation</p>
                      </motion.div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="bg-gradient-to-br from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Built With:</p>
                      <p className="text-sm text-gray-600">React, TypeScript, Tailwind CSS, Motion</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Performance:</p>
                      <p className="text-sm text-gray-600">Optimized loading, lazy loading, code splitting</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">SEO:</p>
                      <p className="text-sm text-gray-600">Meta tags, structured data, semantic HTML</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Accessibility:</p>
                      <p className="text-sm text-gray-600">ARIA labels, keyboard navigation, screen reader support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-to-r from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready for Your Own Modern Website?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We'll build a website with the same level of polish, performance, and modern design you see here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
                      Start Your Project
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline" className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/5">
                      View Services
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
