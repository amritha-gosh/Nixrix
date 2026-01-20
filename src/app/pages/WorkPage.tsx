import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { motion } from 'motion/react';

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Website Design', 'Dashboards', 'AI Chatbots', 'Portfolios'];

  const projects = [
    {
      title: 'Service Business Website',
      category: 'Website Design',
      description: 'Conversion-focused website with booking integration and service listings.',
      image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=600&h=400&fit=crop',
      status: 'View Demo',
      tags: ['Responsive', 'Booking System', 'SEO Optimized'],
      demoLink: '/demo/service-business'
    },
    {
      title: 'E-commerce Analytics Dashboard',
      category: 'Dashboards',
      description: 'Real-time KPI dashboard with sales insights and automated alerts.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      status: 'View Demo',
      tags: ['Power BI', 'Real-time Data', 'Automated Alerts'],
      demoLink: '/demo/dashboard'
    },
    {
      title: 'Creative Portfolio Website',
      category: 'Portfolios',
      description: 'Minimalist portfolio with image galleries and smooth animations.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
      status: 'View Demo',
      tags: ['Portfolio', 'Animations', 'Gallery'],
      demoLink: '/demo/portfolio'
    },
    {
      title: 'AI Customer Support Website',
      category: 'AI Chatbots',
      description: 'Business website with integrated AI chatbot for 24/7 support.',
      image: 'https://images.unsplash.com/photo-1751448582395-27fc57293f1a?w=600&h=400&fit=crop',
      status: 'View Demo',
      tags: ['AI Chatbot', 'Lead Gen', 'Support'],
      demoLink: '/demo/chatbot'
    },
    {
      title: 'Professional Services Website',
      category: 'Website Design',
      description: 'Corporate website with case studies and client testimonials.',
      image: 'https://images.unsplash.com/photo-1758519291531-e96279895745?w=600&h=400&fit=crop',
      status: 'Coming Soon',
      tags: ['Corporate', 'Case Studies', 'B2B'],
      demoLink: '#'
    },
    {
      title: 'Startup Dashboard Platform',
      category: 'Dashboards',
      description: 'Custom dashboard for tracking startup metrics and growth.',
      image: 'https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=600&h=400&fit=crop',
      status: 'Coming Soon',
      tags: ['Startup', 'Metrics', 'Team Insights'],
      demoLink: '#'
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Our Work - Portfolio & Demos | NIXRIX"
        description="Explore our portfolio of websites, dashboards, and digital solutions. View live demos of our work."
      />
      <ChatbotWidget />

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Our Work
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our collection of websites, dashboards, and digital solutions. Each project is crafted to deliver real business value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-14 md:top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="group overflow-hidden border-2 hover:border-[#0D9488] transition-all shadow-lg hover:shadow-2xl">
                    <div className="aspect-video overflow-hidden bg-gray-200 relative">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <motion.span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            project.status === 'View Demo'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.status}
                        </motion.span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0D9488] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.status === 'View Demo' ? (
                        <Link to={project.demoLink}>
                          <motion.div
                            className="inline-flex items-center text-[#0D9488] font-semibold group-hover:gap-2 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            View Demo
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </Link>
                      ) : (
                        <span className="inline-flex items-center text-gray-400 font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Demo projects are created for demonstration purposes to showcase our capabilities and design approach. 
              Client projects are kept confidential unless explicitly permitted for display.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create a digital solution that drives results for your business.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:shadow-xl text-white text-lg px-10 py-6 group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
