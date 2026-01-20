import { ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { SEOHead } from '@/app/components/SEOHead';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { motion } from 'motion/react';

export function ServiceBusinessDemo() {
  const services = [
    { title: 'Plumbing Services', description: 'Emergency & routine plumbing' },
    { title: 'Electrical Work', description: 'Licensed electrician services' },
    { title: 'HVAC Installation', description: 'Heating & cooling solutions' },
    { title: 'Home Repairs', description: 'General maintenance & fixes' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Service Business Website Demo | NIXRIX"
        description="Example service business website with booking integration, contact forms, and conversion-focused design."
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
            <strong>Demo Website:</strong> This is an example service business website layout
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0D9488] to-[#06B6D4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Home Services You Can Trust
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Licensed, insured, and available 24/7 for emergency repairs across Leeds and Yorkshire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-[#0D9488] hover:bg-gray-100">
                  Book a Service
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0D9488]">
                  Call: 0113 123 4567
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-white font-bold mb-4">Quick Contact</h3>
                <div className="space-y-3 text-white/90">
                  <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 0113 123 4567</p>
                  <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@homeservices.co.uk</p>
                  <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 24/7 Emergency Service</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">Professional solutions for all your home service needs</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }}>
                  <Card className="border-2 hover:border-[#0D9488] transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-[#0D9488]" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="border-2 border-[#0D9488]/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Book a Service Today
                </h2>
                <div className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="tel" placeholder="Phone Number" />
                  <Input type="email" placeholder="Email Address" />
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Select Service</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>General Repairs</option>
                  </select>
                  <Button className="w-full bg-[#0D9488] hover:bg-[#0c8479] text-white" size="lg">
                    Request a Callback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Info */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What This Demo Shows:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>✓ Conversion-focused hero section</div>
                <div>✓ Clear service offerings</div>
                <div>✓ Integrated booking form</div>
                <div>✓ Mobile-responsive design</div>
                <div>✓ Trust elements (24/7, licensed)</div>
                <div>✓ Smooth scroll animations</div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/contact">
                  <Button className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
                    Get Your Service Website
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
