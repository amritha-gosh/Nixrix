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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navLinks: NavLink[] = [
    { name: "Home",        path: "/",            match: "exact"      },
    { name: "About",       path: "/about",        match: "exact"      },
    { name: "Services",    path: "/services",     match: "startsWith" },
    { name: "How We Work", path: "/how-we-work",  match: "exact"      },
    { name: "Blog",        path: "/blog",         match: "startsWith" },
    { name: "Contact",     path: "/contact",      match: "exact"      },
  ];

  const isActive = (link: NavLink) => {
    const p = location.pathname;
    if (link.match === "exact") return p === link.path;
    if (p.startsWith(link.path)) return true;
    if (link.path === "/services"   && p.startsWith("/solutions"))    return true;
    if (link.path === "/how-we-work" && p.startsWith("/how-it-works")) return true;
    if (link.path === "/blog"        && p.startsWith("/articles"))     return true;
    return false;
  };

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/8 bg-[#1A1208]/92 shadow-[0_8px_32px_rgba(26,18,8,0.32)] backdrop-blur-xl"
            : "border-b border-white/6 bg-[#1A1208]/80 backdrop-blur-lg"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16" : "h-[4.5rem]"
            }`}
          >
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex shrink-0 items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Logo />
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden items-center md:flex">
              {/* Pill container */}
              <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-1 backdrop-blur">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link) ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  >
                    {isActive(link) && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-[#E8230A] shadow-[0_4px_16px_rgba(232,35,10,0.35)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* CTA button */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="ml-4"
              >
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group inline-flex items-center justify-center rounded-xl bg-[#E8230A] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(232,35,10,0.28)] transition-all duration-200 hover:bg-[#C01A05] hover:shadow-[0_12px_32px_rgba(232,35,10,0.38)]"
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  Book Free Call
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile hamburger ── */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl border border-white/12 bg-white/[0.06] p-2.5 text-white/80 transition-colors hover:bg-white/[0.10] md:hidden"
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Mobile drawer ── */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <div className="mb-4 space-y-1 rounded-2xl border border-white/10 bg-[#1A1208]/96 p-3 shadow-[0_16px_48px_rgba(26,18,8,0.5)] backdrop-blur-xl">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
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
                            ? "bg-[#E8230A] text-white shadow-[0_4px_14px_rgba(232,35,10,0.30)]"
                            : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                        }`}
                        style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.04 }}
                  >
                    <Link
                      to="/contact"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-2 flex items-center justify-center rounded-xl bg-[#E8230A] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(232,35,10,0.30)]"
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                    >
                      Book a Free Discovery Call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
