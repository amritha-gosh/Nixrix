/**
 * NIXRIX — shared page helpers
 * Import from this file in every page component.
 */
import { motion } from "motion/react";
import { Star }   from "lucide-react";
import { ReactNode } from "react";

// ── Fonts ──────────────────────────────────────────────────────────────────────
export function injectFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("nixrix-gfonts")) return;
  const l = document.createElement("link");
  l.id = "nixrix-gfonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
  document.head.appendChild(l);
}

export const F = {
  h: "'Playfair Display', Georgia, serif",
  b: "'Plus Jakarta Sans', system-ui, sans-serif",
};

// ── Backgrounds — lightest at top, darkens as page scrolls ────────────────────
export const BG = {
  hero: "linear-gradient(160deg,#FAF5EC 0%,#F5EDE0 100%)",  // lightest — always hero
  s1:   "#F5EDE0",   // one step darker
  s2:   "#EDE4D4",   // two steps
  s3:   "#E5D9C6",   // three steps
  dark: "#1A1208",   // only marquee ribbon + final CTA
};

// ── Section tag ────────────────────────────────────────────────────────────────
export function Tag({ children, onDark = false, center = true }: { children: ReactNode; onDark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? "text-[#E8230A]/80" : "text-[#E8230A]"}`}
        style={{ fontFamily: F.b }}
      >
        {children}
      </span>
      <div className={`h-px w-7 ${onDark ? "bg-[#E8230A]/60" : "bg-[#E8230A]"}`} />
    </div>
  );
}

// ── HoverCard — red border + glow on hover ────────────────────────────────────
export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, borderColor: "#E8230A", boxShadow: "0 20px 52px rgba(232,35,10,0.13), 0 0 0 1px rgba(232,35,10,0.18)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
export function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#E8230A] text-[#E8230A]" />)}
    </div>
  );
}

// ── Review data — shared across all pages ────────────────────────────────────
export const ALL_REVIEWS = [
  { name: "Sarah Whitmore",  role: "Director",           company: "Whitmore Properties, Leeds",       avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face", text: "We went from missing landlord enquiries to following up every single one automatically. NIXRIX set it all up in a week. Three new landlords signed in the first month.", stars: 5 },
  { name: "Marcus Reid",     role: "Managing Director",  company: "Reid and Co Accountants, Manchester", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", text: "I was spending two hours a day on tasks that should have been automatic. The Autopilot package changed that completely. I genuinely do not know how we managed without it.", stars: 5 },
  { name: "Priya Sharma",    role: "Operations Manager", company: "Greenfield Lettings, Birmingham",    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face", text: "Our old website was doing nothing. After NIXRIX rebuilt it and connected it to our CRM we went from three web enquiries a month to fourteen in the first month.", stars: 5 },
  { name: "James Thornton",  role: "Partner",            company: "Thornton Legal, York",              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face", text: "The Power BI dashboard gave us visibility we simply did not have before. Now I can see exactly where the business is performing without asking anyone.", stars: 5 },
  { name: "Anita Patel",     role: "Owner",              company: "Patel Property Management, Leicester", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face", text: "The Agency Smart Pack was exactly what we needed. Website, CRM and automation all working together. The team was available every step of the way.", stars: 5 },
  { name: "Daniel Clarke",   role: "Founder",            company: "Clarke Recruitment, Leeds",          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face", text: "Responsive, honest, and delivered ahead of time. I have worked with bigger agencies that took three times as long and communicated half as well.", stars: 5 },
  { name: "Sophie Brennan",  role: "CEO",                company: "Meridian HR Consulting, Sheffield",  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face", text: "NIXRIX did not try to replace anything. They just made everything work together. That was exactly what we needed and exactly what they promised.", stars: 5 },
  { name: "Tom Hughes",      role: "Director",           company: "Hughes Building Services, Bradford", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face", text: "The website looks exactly like what we wanted and the HubSpot setup means we never lose a lead anymore. Best business investment we have made this year.", stars: 5 },
  { name: "Claire Sutton",   role: "MD",                 company: "Sutton Financial Planning, Leeds",   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face", text: "What impressed me most was how fast it happened. We had a full working system in days not weeks. No disruption, no technical headaches, just results.", stars: 5 },
  { name: "Ravi Nair",       role: "Co-Founder",         company: "NairTech Solutions, Manchester",     avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop&crop=face", text: "The no-migration approach was the deciding factor for us. We kept everything we had and NIXRIX just made it all work together seamlessly.", stars: 5 },
];

// ── Scrolling Review Ribbon ───────────────────────────────────────────────────
export function ReviewRibbon({ bg = "#EDE4D4" }: { bg?: string }) {
  const doubled = [...ALL_REVIEWS, ...ALL_REVIEWS];
  return (
    <div className="relative overflow-hidden py-4" style={{ background: bg }}>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28" style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28" style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />
      <motion.div
        className="flex gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((r, i) => (
          <div key={i} className="w-[320px] shrink-0 rounded-2xl border border-[#1A1208]/10 bg-white p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">
            <Stars n={r.stars} />
            <p className="mt-3 text-sm font-light leading-[1.8] text-[#1A1208]/70" style={{ fontFamily: F.b }}>"{r.text}"</p>
            <div className="mt-4 flex items-center gap-3 border-t border-[#1A1208]/7 pt-3">
              <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-[#E8230A]/14" />
              <div>
                <p className="text-sm font-semibold text-[#1A1208]" style={{ fontFamily: F.b }}>{r.name}</p>
                <p className="text-xs font-light text-[#6B6256]" style={{ fontFamily: F.b }}>{r.role}, {r.company}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Dot pattern overlay ───────────────────────────────────────────────────────
export function DotPattern({ opacity = 0.045 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ opacity,
      backgroundImage: "radial-gradient(circle, #1A1208 1px, transparent 1px)",
      backgroundSize: "38px 38px",
    }} />
  );
}

// ── Dark section animated orb ─────────────────────────────────────────────────
export function RedOrb({ className = "", size = 460 }: { className?: string; size?: number }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ width: size, height: size, background: "radial-gradient(circle, rgba(232,35,10,0.13) 0%, transparent 68%)" }}
      animate={{ scale: [1, 1.09, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
