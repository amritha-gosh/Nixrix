import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/app/components/Logo";

const F = { b: "'Plus Jakarta Sans', system-ui, sans-serif" };

type NavLink = { name: string; path: string; match: "exact" | "startsWith" };

const navLinks: NavLink[] = [
  { name: "Home",        path: "/",           match: "exact"      },
  { name: "About",       path: "/about",       match: "exact"      },
  { name: "Services",    path: "/services",    match: "startsWith" },
  { name: "How We Work", path: "/how-we-work", match: "exact"      },
  { name: "Our Work",    path: "/work",        match: "exact"      },
  { name: "Blog",        path: "/blog",        match: "startsWith" },
  { name: "Contact",     path: "/contact",     match: "exact"      },
];

export function Navigation() {
  const location = useLocation();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const isActive = (link: NavLink) => {
    const p = location.pathname;
    if (link.match === "exact") return p === link.path;
    if (p.startsWith(link.path)) return true;
    if (link.path === "/work" && p.startsWith("/case-studies")) return true;
    if (link.path === "/how-we-work" && p.startsWith("/how-it-works")) return true;
    if (link.path === "/blog" && p.startsWith("/articles")) return true;
    return false;
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/8 bg-[#1A1208]/94 shadow-[0_8px_32px_rgba(26,18,8,0.32)] backdrop-blur-xl"
          : "border-b border-white/6 bg-[#1A1208]/82 backdrop-blur-lg"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-[4.5rem]"}`}>

          {/* Logo */}
          <Link to="/" onClick={scrollTop} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-1 backdrop-blur">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={scrollTop}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link) ? "text-white" : "text-white/55 hover:text-white"}`}
                  style={{ fontFamily: F.b }}
                >
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#E8230A] shadow-[0_4px_16px_rgba(232,35,10,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="ml-4">
              <Link
                to="/contact"
                onClick={scrollTop}
                className="group inline-flex items-center rounded-xl bg-[#E8230A] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(232,35,10,0.28)] transition-all hover:bg-[#C01A05] hover:shadow-[0_12px_32px_rgba(232,35,10,0.38)]"
                style={{ fontFamily: F.b }}
              >
                Book Free Call
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/12 bg-white/[0.06] p-2.5 text-white/80 transition-colors hover:bg-white/[0.10] md:hidden"
            whileTap={{ scale: 0.93 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={20} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={20} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <div className="mb-4 space-y-1 rounded-2xl border border-white/10 bg-[#1A1208]/96 p-3 shadow-[0_16px_48px_rgba(26,18,8,0.5)] backdrop-blur-xl">
                {navLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link
                      to={link.path}
                      onClick={() => { setMenuOpen(false); scrollTop(); }}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive(link) ? "bg-[#E8230A] text-white shadow-[0_4px_14px_rgba(232,35,10,0.30)]" : "text-white/60 hover:bg-white/[0.06] hover:text-white"}`}
                      style={{ fontFamily: F.b }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04 }}>
                  <Link
                    to="/contact"
                    onClick={() => { setMenuOpen(false); scrollTop(); }}
                    className="mt-2 flex items-center justify-center rounded-xl bg-[#E8230A] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(232,35,10,0.30)]"
                    style={{ fontFamily: F.b }}
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
  );
}
