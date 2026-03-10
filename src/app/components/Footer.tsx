import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/app/components/Logo";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              High-performance websites with smart integrations for growing businesses.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <MapPin size={16} className="mr-2 text-[#06B6D4]" />
                Leeds, UK
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <Mail size={16} className="mr-2 text-[#06B6D4]" />
                <a href="mailto:hello@nixrix.com" className="hover:text-[#06B6D4] transition-colors">
                  hello@nixrix.com
                </a>
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <Phone size={16} className="mr-2 text-[#06B6D4]" />
                <a href="tel:07492712144" className="hover:text-[#06B6D4] transition-colors">
                  07492 712144
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  E-commerce & ERP
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Dashboards & AI Chatbots
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-[#06B6D4] text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2026 NIXRIX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
