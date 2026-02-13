import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/app/components/Logo";

type NavLink = { name: string; path: string; match?: "exact" | "startsWith" };

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinks: NavLink[] = [
    { name: "Home", path: "/", match: "exact" },
    { name: "Solutions", path: "/solutions", match: "startsWith" },
    { name: "Industries", path: "/industries", match: "startsWith" },
    { name: "Case Studies", path: "/case-studies", match: "startsWith" },
    { name: "How It Works", path: "/how-it-works", match: "exact" },
    { name: "Pricing", path: "/pricing", match: "exact" },
    { name: "Contact", path: "/contact", match: "exact" },
  ];

  const isActive = (link: NavLink) => {
    const p = location.pathname;
    if (link.match === "exact") return p === link.path;

    // startsWith match (also treat old routes as active during transition)
    if (p.startsWith(link.path)) return true;

    // Transitional mapping so old URLs still highlight correctly
    if (link.path === "/solutions" && p.startsWith("/services")) return true;
    if (link.path === "/case-studies" && p.startsWith("/work")) return true;
    if (link.path === "/industries" && (p.startsWith("/demo") || p.startsWith("/industries"))) return true;

    return false;
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/50"
          : "bg-gradient-to-r from-white via-[#06B6D4]/5 to-[#0D9488]/5 border-b border-gray-100"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-16" : "h-18"
          }`}
        >
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                  isActive(link)
                    ? "text-[#0D9488]"
                    : "text-gray-700 hover:text-[#0D9488] hover:bg-gradient-to-r hover:from-[#06B6D4]/10 hover:to-[#0D9488]/10"
                }`}
              >
                {link.name}
                {isActive(link) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-full"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#0D9488] to-[#06B6D4] shadow-lg hover:shadow-2xl transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10">Book Free SME Tech Audit</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0D9488]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-[#06B6D4]/10 hover:to-[#0D9488]/10 transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 space-y-2 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                      isActive(link)
                        ? "text-[#0D9488] bg-gradient-to-r from-[#06B6D4]/10 to-[#0D9488]/10"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  to="/contact"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="block bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all text-center font-semibold shadow-md"
                >
                  Book Free SME Tech Audit
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
