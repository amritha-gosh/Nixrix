import { Target, Lightbulb, TrendingUp, Users, Award, Globe2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const values = [
    {
      icon: <Lightbulb className="w-10 h-10 text-[#0D9488]" />,
      title: 'Innovation First',
      description: 'We stay ahead of digital trends, bringing cutting-edge solutions like AI, business intelligence, and automation to growing businesses.',
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#0D9488]" />,
      title: 'Results-Driven',
      description: 'Every solution we build is designed to deliver measurable business impact—whether that\'s leads, revenue, or operational efficiency.',
    },
    {
      icon: <Users className="w-10 h-10 text-[#0D9488]" />,
      title: 'Client Partnership',
      description: 'We work as an extension of your team, providing transparent communication and collaborative problem-solving throughout.',
    },
    {
      icon: <Award className="w-10 h-10 text-[#0D9488]" />,
      title: 'Quality & Precision',
      description: 'From design to deployment, we maintain the highest standards of quality, performance, and security in every project.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="About NIXRIX - Corporate Digital Solutions Company | UK"
        description="NIXRIX is a growing corporate digital solutions company based in Leeds, UK. We build intelligent websites with AI, dashboards, and automation for modern businesses."
        keywords="about NIXRIX, digital solutions company, UK web development, corporate website design, business intelligence"
      />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">About NIXRIX</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Building Digital Solutions That Drive Growth
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're a corporate digital solutions company empowering businesses with intelligent websites, 
              AI-powered tools, and data-driven insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                  Transforming Businesses Through Technology
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    NIXRIX exists to make advanced digital technology accessible to growing businesses. 
                    We believe that every company, regardless of size, should have access to intelligent 
                    websites, AI automation, and business intelligence tools.
                  </p>
                  <p>
                    Our mission is to bridge the gap between complex technology and practical business needs, 
                    delivering solutions that are powerful, user-friendly, and built for real-world results.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <motion.div 
                  className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1762242298589-582f5f6c3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Modern technology and digital solutions"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/10 to-[#06B6D4]/10"></div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Our Vision</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              The Future of Business Websites
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We envision a future where every business website is intelligent, data-driven, and actively 
              contributes to business growth—not just a static online presence.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Engagement',
                description: 'Every website equipped with intelligent chatbots that capture leads and provide instant support.',
              },
              {
                title: 'Data-Driven Decisions',
                description: 'Businesses using embedded dashboards and insights to make informed, strategic decisions.',
              },
              {
                title: 'Automated Workflows',
                description: 'Digital platforms that automate routine tasks, freeing businesses to focus on growth.',
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide every decision we make and every solution we build.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-2 hover:border-[#0D9488] transition-all h-full">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <motion.div 
                          className="flex-shrink-0 w-16 h-16 bg-[#0D9488]/10 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {value.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Our Approach</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                  How We Work With Clients
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Strategic Consultation',
                      description: 'We begin by understanding your business challenges and objectives deeply.',
                    },
                    {
                      title: 'Tailored Solutions',
                      description: 'Every project is custom-designed to meet your specific requirements—no templates.',
                    },
                    {
                      title: 'Agile Development',
                      description: 'Fast, iterative development with regular check-ins and transparent progress updates.',
                    },
                    {
                      title: 'Ongoing Partnership',
                      description: 'We don\'t disappear after launch—continuous support and optimization included.',
                    },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <Card className="bg-gradient-to-br from-[#0D9488] to-[#06B6D4] border-0 shadow-2xl">
                <CardContent className="p-8 text-white">
                  <h3 className="text-3xl font-bold mb-6">Why Businesses Choose Us</h3>
                  <ul className="space-y-4">
                    {[
                      'Fast delivery (10-14 days)',
                      'Transparent pricing from £199',
                      'Advanced features (AI, dashboards, automation)',
                      'Professional, corporate-grade quality',
                      'Based in the UK (Leeds)',
                      'Ongoing support & maintenance',
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Growth & Innovation */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Committed to Growth & Innovation
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              As a growing corporate digital solutions company, we continuously invest in emerging technologies, 
              industry best practices, and professional development to ensure we're always delivering 
              cutting-edge solutions to our clients.
            </p>
            <p className="text-lg text-gray-700 mb-10">
              Our commitment is to be the trusted digital partner that grows alongside your business—providing 
              scalable, future-proof solutions that adapt as your needs evolve.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white px-10 py-6 shadow-xl">
                  Work With Us
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}