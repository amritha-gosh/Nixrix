import { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { SEOHead } from '@/app/components/SEOHead';
import { motion } from 'motion/react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', businessType: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Contact Us - Free Consultation | NIXRIX Web Design Leeds"
        description="Get in touch for a free consultation. Web design services starting from £199. Based in Leeds, UK. Fast response within 24 hours."
        keywords="contact web designer, free consultation, Leeds web design, NIXRIX contact, web design quote"
      />
      <ChatbotWidget />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let's Build Something Great
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Book a free consultation and let's discuss how we can help grow your business online.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <Card className="border-2 shadow-xl">
                  <CardContent className="p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Book a Free Consultation
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Tell us about your project and we'll get back to you within 24 hours.
                    </p>

                    {submitted ? (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600">
                          We've received your message and will get back to you within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="name" className="font-medium">Your Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="John Smith"
                              className={`transition-all ${focusedField === 'name' ? 'ring-2 ring-[#0D9488]' : ''}`}
                            />
                          </motion.div>

                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="email" className="font-medium">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="john@example.com"
                              className={`transition-all ${focusedField === 'email' ? 'ring-2 ring-[#0D9488]' : ''}`}
                            />
                          </motion.div>
                        </div>

                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="businessType" className="font-medium">What are you looking for? *</Label>
                          <select
                            id="businessType"
                            name="businessType"
                            required
                            value={formData.businessType}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('businessType')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none transition-all ${focusedField === 'businessType' ? 'ring-2 ring-[#0D9488]' : ''}`}
                          >
                            <option value="">Select an option</option>
                            <option value="website">Website Design</option>
                            <option value="chatbot">Website + AI Chatbot</option>
                            <option value="dashboard">Intelligent Website (Dashboards)</option>
                            <option value="automation">Automation & SEO</option>
                            <option value="custom">Custom Project</option>
                            <option value="other">Not Sure / Other</option>
                          </select>
                        </motion.div>

                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="message" className="font-medium">Tell us about your project *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Describe your business and what you're looking to achieve..."
                            rows={6}
                            className={`transition-all ${focusedField === 'message' ? 'ring-2 ring-[#0D9488]' : ''}`}
                          />
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-[#0D9488] hover:bg-[#0c8479] text-white shadow-lg"
                          >
                            <Send className="mr-2 w-5 h-5" />
                            Send Message
                          </Button>
                        </motion.div>

                        <p className="text-sm text-gray-500 text-center">
                          We'll respond within 24 hours. Usually much sooner.
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <ScrollReveal delay={0.2}>
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                    <div className="space-y-5">
                      <motion.div 
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Mail className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Email</p>
                          <a
                            href="mailto:hello@nixrix.com"
                            className="text-[#06B6D4] hover:underline"
                          >
                            hello@nixrix.com
                          </a>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Phone className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Phone</p>
                          <a
                            href="tel:07492712144"
                            className="text-[#06B6D4] hover:underline"
                          >
                            07492 712144
                          </a>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <MapPin className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Location</p>
                          <p className="text-gray-600">Leeds, United Kingdom</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mr-4">
                          <Clock className="w-5 h-5 text-[#0D9488]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Response Time</p>
                          <p className="text-gray-600">Within 24 hours</p>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Card className="bg-gradient-to-br from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-[#0D9488]" />
                      What Happens Next?
                    </h3>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">1.</span>
                        <span>We'll review your message and respond within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">2.</span>
                        <span>Schedule a 30-minute discovery call to discuss your needs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">3.</span>
                        <span>Receive a transparent proposal with timeline and pricing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-[#0D9488] mr-3 mt-0.5">4.</span>
                        <span>If it's a good fit, we start building your project</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Card className="border-l-4 border-[#06B6D4] shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Pricing Information
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong className="text-[#0D9488]">Projects start from £199</strong> for simple websites.
                    </p>
                    <p className="text-sm text-gray-600">
                      Final pricing depends on features, complexity, and integrations. We provide clear, transparent quotes—no hidden fees.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Common Questions
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How long does it take to get started?',
                a: 'After our discovery call, we typically start within 1–2 weeks. Projects take 10–14 days for full websites.'
              },
              {
                q: 'What if I already have a website?',
                a: 'No problem! We can add dashboards, chatbots, or optimization to your existing site.'
              },
              {
                q: 'Do I need technical knowledge?',
                a: 'Absolutely not. We design everything in plain English with clear guidance.'
              },
              {
                q: 'Can I update the website myself?',
                a: 'Yes! We provide a content management system and full training.'
              }
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-2 hover:border-[#0D9488] transition-colors">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 text-base">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}