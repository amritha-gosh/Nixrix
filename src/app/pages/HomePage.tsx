import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, MessageSquare, BarChart3, Sparkles, Zap, Check, TrendingUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { motion } from 'motion/react';

export function HomePage() {
  const coreServices = [
    {
      image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400&h=300&fit=crop',
      title: 'Website Design',
      description: 'From one-page sites to full business platforms—responsive, fast, and SEO-ready.',
      features: ['One-page websites', 'Business websites', 'Portfolio sites', 'E-commerce ready']
    },
    {
      image: 'https://images.unsplash.com/photo-1751448582395-27fc57293f1a?w=400&h=300&fit=crop',
      title: 'AI Chatbots',
      description: 'Intelligent chatbots that answer questions, capture leads, and engage visitors 24/7.',
      features: ['FAQ automation', 'Lead capture', 'Custom training', 'Multi-language']
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      title: 'Intelligent Websites',
      description: 'Websites with embedded KPI dashboards, live data, insights, and automated alerts.',
      features: ['Power BI dashboards', 'Real-time data', 'KPI explanations', 'Automated alerts']
    },
    {
      image: 'https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=400&h=300&fit=crop',
      title: 'Automation & SEO',
      description: 'Workflow automation, technical SEO setup, and performance optimization.',
      features: ['Workflow automation', 'Technical SEO', 'Performance tuning', 'Analytics setup']
    },
  ];

  const demoShowcase = [
    {
      title: 'Live Dashboard Demo',
      description: 'See how we embed Power BI dashboards with plain-language insights',
      icon: <BarChart3 className="w-16 h-16" />,
      tag: 'Interactive Demo',
      link: '/demo/dashboard',
      image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      title: 'AI Chatbot Demo',
      description: 'Try our intelligent chatbot that understands your business',
      icon: <MessageSquare className="w-16 h-16" />,
      tag: 'Live Feature',
      link: '/demo/chatbot',
      image: 'https://images.unsplash.com/photo-1757310998309-87a97e562ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      title: 'Website Showcase',
      description: 'Modern, responsive designs with smooth animations',
      icon: <Globe className="w-16 h-16" />,
      tag: 'Portfolio',
      link: '/demo/website',
      image: 'https://images.unsplash.com/photo-1630522790545-67ad2cb700fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
  ];

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '£199', label: 'Starting From' },
    { value: '10-14', label: 'Days to Launch' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead 
        title="NIXRIX - Modern Business Websites with AI & Dashboards | UK Web Design"
        description="Professional websites starting from £199. AI chatbots, KPI dashboards, automation, and SEO. Based in Leeds, UK. Transform your digital presence with intelligent web solutions."
        keywords="web design UK, business websites, AI chatbot, KPI dashboard, Power BI integration, website automation, SEO services, Leeds web design, intelligent websites, SME web solutions"
        schemaType="organization"
      />
      <ChatbotWidget />

      {/* Hero Section - Full Width with Enhanced Visuals */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80"></div>
          
          {/* Animated Mesh Gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(13, 148, 136, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Abstract Tech Visual - Right Side */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1644088379091-d574269d422f?w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-[#06B6D4]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 30, 0],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating Dashboard Mockup */}
          <motion.div
            className="hidden xl:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[500px]"
            initial={{ opacity: 0, x: 100, rotateY: -20 }}
            animate={{ opacity: 0.15, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateY: [-5, 5, -5]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-[#06B6D4]/30 to-[#0D9488]/30 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-[#0D9488]/30 to-[#06B6D4]/30 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="h-20 bg-gradient-to-br from-[#06B6D4]/20 to-transparent rounded"></div>
                    <div className="h-20 bg-gradient-to-br from-[#0D9488]/20 to-transparent rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6 px-5 py-2.5 bg-[#06B6D4]/10 backdrop-blur-sm rounded-full border border-[#06B6D4]/30"
            >
              <span className="text-[#06B6D4] text-sm font-semibold">Modern Digital Solutions for Growing Businesses</span>
            </motion.div>
            
            {/* Headline - Staggered Animation */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  Websites Built for
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#0D9488] to-[#06B6D4] animate-gradient">
                    Real Business Results
                  </span>
                </h1>
              </motion.div>
            </div>
            
            {/* Subheadline */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              From simple portfolios to advanced platforms with AI chatbots, live dashboards, and automation.
              <span className="text-[#06B6D4] font-semibold"> Starting from just £199.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/contact">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="relative bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:shadow-2xl text-white text-lg px-10 py-7 group overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Start Your Project
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0D9488]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/work">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-7 backdrop-blur-sm">
                    View Live Demos
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.3 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400 group-hover:text-[#06B6D4] transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #0D9488 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">What We Build</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Choose Your Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple websites to advanced platforms—flexible services that grow with your business.
              All projects start from £199.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors cursor-pointer overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <motion.img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check className="w-4 h-4 text-[#0D9488] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/services" className="text-[#0D9488] font-semibold text-sm inline-flex items-center group">
                        Learn More
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              <strong>Projects start from £199.</strong> Final pricing depends on features and complexity.
            </p>
            <Link to="/services">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white">
                  View All Services & Pricing
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Showcase */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">See It In Action</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Live Feature Demos
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This website itself demonstrates our advanced capabilities—try the chatbot, explore the demos.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoShowcase.map((demo, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
                <Link to={demo.link}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group"
                  >
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-[#06B6D4] transition-colors cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <motion.img
                          src={demo.image}
                          alt={demo.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <span className="bg-[#06B6D4] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                            {demo.tag}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06B6D4] transition-colors">
                          {demo.title}
                        </h3>
                        <p className="text-gray-400 mb-4 text-sm">{demo.description}</p>
                        <span className="text-[#06B6D4] font-semibold text-sm inline-flex items-center">
                          Try Demo
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] via-[#0c8479] to-[#06B6D4]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              From £199 to full custom solutions. Let's discuss your project and create a website that works for your business.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100 text-lg px-12 py-7 shadow-2xl">
                  Start Your Project Today
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