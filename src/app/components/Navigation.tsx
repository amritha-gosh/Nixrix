import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/app/components/Logo";

type NavLink = { name: string; path: string; match?: "exact" | "startsWith" };

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks: NavLink[] = [
    { name: "Home", path: "/", match: "exact" },
    { name: "About Us", path: "/about", match: "exact" },
    { name: "Services", path: "/services", match: "startsWith" },
    { name: "How We Work", path: "/how-we-work", match: "exact" },
    { name: "Blog", path: "/blog", match: "startsWith" },
    { name: "Contact", path: "/contact", match: "exact" },
  ];

  const isActive = (link: NavLink) => {
    const p = location.pathname;

    if (link.match === "exact") return p === link.path;
    if (p.startsWith(link.path)) return true;

    // legacy support while transitioning
    if (link.path === "/services" && p.startsWith("/solutions")) return true;
    if (link.path === "/how-we-work" && p.startsWith("/how-it-works")) return true;
    if (link.path === "/blog" && p.startsWith("/articles")) return true;

    return false;
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#07121A]/85 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "border-b border-white/10 bg-[#07121A]/70 backdrop-blur-lg"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-[4.5rem]"}`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 backdrop-blur">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(link)
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive(link) && (
                    <motion.span
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0D9488] to-[#06B6D4]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="ml-4">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(6,182,212,0.25)] transition-all duration-200 hover:shadow-[0_18px_40px_rgba(6,182,212,0.32)]"
              >
                Book Free Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition-colors hover:bg-white/[0.1] md:hidden"
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
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 space-y-2 rounded-2xl border border-white/10 bg-[#07121A]/95 p-3 backdrop-blur-xl">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link)
                          ? "bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-4 py-3 text-center text-sm font-semibold text-white shadow-md"
                  >
                    Book Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
