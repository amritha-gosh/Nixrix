import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { SEOHead } from '@/app/components/SEOHead';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { motion } from 'motion/react';

export function PortfolioDemo() {
  const projects = [
    { title: 'Brand Identity Design', category: 'Branding', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop' },
    { title: 'Mobile App UI/UX', category: 'Digital Design', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
    { title: 'Website Redesign', category: 'Web Design', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop' },
    { title: 'Packaging Design', category: 'Product Design', image: 'https://images.unsplash.com/photo-1620287341260-ab5c7bb5ea83?w=600&h=400&fit=crop' },
    { title: 'Editorial Layout', category: 'Print Design', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop' },
    { title: 'Social Media Campaign', category: 'Marketing', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Creative Portfolio Demo | NIXRIX"
        description="Example portfolio website with visual galleries, smooth animations, and modern design."
      />
      <ChatbotWidget />

      {/* Back Button */}
      <div className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/work">
            <Button variant="ghost" className="text-gray-600 hover:text-[#0D9488]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Work
            </Button>
          </Link>
        </div>
      </div>

      {/* Demo Label */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Demo Website:</strong> This is an example creative portfolio layout
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Creative Designer
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Crafting beautiful digital experiences through thoughtful design and strategic thinking.
            </p>
            <Button size="lg" className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
              View My Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-[#06B6D4] font-semibold mb-2">{project.category}</p>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0D9488] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm a creative designer with 8+ years of experience helping brands tell their stories 
              through compelling visual design and user-centered experiences.
            </p>
            <Button size="lg" variant="outline" className="border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white">
              Get In Touch
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Info */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What This Demo Shows:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                <div>✓ Minimalist portfolio layout</div>
                <div>✓ Image-focused galleries</div>
                <div>✓ Hover zoom animations</div>
                <div>✓ Smooth scroll reveals</div>
                <div>✓ Category organization</div>
                <div>✓ Professional presentation</div>
              </div>
              <div className="text-center">
                <Link to="/contact">
                  <Button className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
                    Get Your Portfolio Website
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
