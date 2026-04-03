import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/app/components/Logo";
import { motion } from "motion/react";

const FONTS = {
  heading: "'DM Serif Display', Georgia, serif",
  body: "'Outfit', system-ui, sans-serif",
};

export function Footer() {
  const services = [
    { label: "The Spark — One Page Website",   path: "/services" },
    { label: "The Magnet — Lead Landing Page", path: "/services" },
    { label: "The Connector — HubSpot CRM",    path: "/services" },
    { label: "NIXRIX Launchpad",               path: "/services" },
    { label: "NIXRIX Command",                 path: "/services" },
    { label: "NIXRIX Intelligence",            path: "/services" },
    { label: "NIXRIX Autopilot",               path: "/services" },
    { label: "Agency Smart Pack",              path: "/services" },
  ];

  const company = [
    { label: "About Us",    path: "/about"        },
    { label: "Services",    path: "/services"     },
    { label: "How We Work", path: "/how-we-work"  },
    { label: "Blog",        path: "/blog"         },
    { label: "Contact",     path: "/contact"      },
  ];

  const legal = [
    { label: "Privacy Policy",   path: "/privacy"  },
    { label: "Terms of Service", path: "/terms"    },
    { label: "Cookie Policy",    path: "/cookies"  },
  ];

  return (
    <footer
      className="bg-[#1A1208] text-white"
      style={{ fontFamily: FONTS.body }}
    >
      {/* ── CTA strip ── */}
      <div className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/8 bg-white/[0.03] p-8 sm:flex-row sm:items-center">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E8230A]"
                style={{ fontFamily: FONTS.body }}
              >
                Ready to start?
              </p>
              <h3
                className="mt-2 text-2xl font-normal text-white"
                style={{ fontFamily: FONTS.heading }}
              >
                Book a free 30 minute discovery call.
              </h3>
              <p
                className="mt-1 text-sm font-light text-white/45"
                style={{ fontFamily: FONTS.body }}
              >
                No pitch. No pressure. Just honest advice on what will make the biggest difference.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center rounded-xl bg-[#E8230A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(232,35,10,0.30)] transition-all hover:bg-[#C01A05] hover:shadow-[0_12px_36px_rgba(232,35,10,0.40)]"
                style={{ fontFamily: FONTS.body }}
              >
                Book Free Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Logo />
            </Link>
            <p
              className="mt-5 text-sm font-light leading-[1.85] text-white/45"
              style={{ fontFamily: FONTS.body }}
            >
              We help UK small businesses replace repetitive manual work with smart websites,
              automation, CRM systems and live data dashboards. Without changing a single tool
              you already use.
            </p>

            {/* Contact details */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@nixrix.com"
                className="flex items-center gap-2.5 text-sm font-light text-white/50 transition-colors hover:text-[#E8230A]"
                style={{ fontFamily: FONTS.body }}
              >
                <Mail className="h-4 w-4 shrink-0 text-[#E8230A]" />
                hello@nixrix.com
              </a>
              <a
                href="tel:07492712144"
                className="flex items-center gap-2.5 text-sm font-light text-white/50 transition-colors hover:text-[#E8230A]"
                style={{ fontFamily: FONTS.body }}
              >
                <Phone className="h-4 w-4 shrink-0 text-[#E8230A]" />
                07492 712144
              </a>
              <div className="flex items-center gap-2.5 text-sm font-light text-white/50">
                <MapPin className="h-4 w-4 shrink-0 text-[#E8230A]" />
                Leeds, England
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:border-[#E8230A]/35 hover:bg-[#E8230A]/10 hover:text-[#E8230A]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:border-[#E8230A]/35 hover:bg-[#E8230A]/10 hover:text-[#E8230A]"
                aria-label="Twitter / X"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
              style={{ fontFamily: FONTS.body }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.path}
                    className="text-sm font-light text-white/45 transition-colors hover:text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
              style={{ fontFamily: FONTS.body }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-sm font-light text-white/45 transition-colors hover:text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4
              className="mb-5 mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
              style={{ fontFamily: FONTS.body }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-sm font-light text-white/45 transition-colors hover:text-[#E8230A]"
                    style={{ fontFamily: FONTS.body }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Niche + registration */}
          <div>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
              style={{ fontFamily: FONTS.body }}
            >
              Our Niche
            </h4>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
              <div
                className="mb-1 text-3xl font-normal text-[#E8230A]/20"
                style={{ fontFamily: FONTS.heading }}
              >
                15,000+
              </div>
              <div
                className="mb-2 text-sm font-semibold text-white/80"
                style={{ fontFamily: FONTS.body }}
              >
                UK Letting Agencies
              </div>
              <p
                className="text-xs font-light leading-6 text-white/40"
                style={{ fontFamily: FONTS.body }}
              >
                Our dedicated Agency Smart Pack was built specifically for letting agencies
                losing landlords to more responsive competitors.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center text-xs font-semibold text-[#E8230A] transition-colors hover:text-white"
                style={{ fontFamily: FONTS.body }}
              >
                Ask about it <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {[
                "Registered in England and Wales",
                "No migration policy",
                "5 to 10 day delivery",
              ].map((badge) => (
                <div
                  key={badge}
                  className="inline-flex w-full items-center gap-2 rounded-lg border border-white/6 bg-white/[0.02] px-3 py-2 text-xs font-light text-white/40"
                  style={{ fontFamily: FONTS.body }}
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8230A]/60" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p
            className="text-xs font-light text-white/28"
            style={{ fontFamily: FONTS.body }}
          >
            © 2026 NIXRIX LTD. All rights reserved. Registered in England and Wales.
          </p>
          <p
            className="text-xs font-light text-white/28"
            style={{ fontFamily: FONTS.body }}
          >
            Built in Leeds with intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
