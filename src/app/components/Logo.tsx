import { motion } from "motion/react";

const F = { b: "'Plus Jakarta Sans', system-ui, sans-serif" };

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A] shadow-[0_8px_22px_rgba(232,35,10,0.32)]">
          <span className="relative z-10 text-lg font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>N</span>
          <div className="absolute inset-[1px] rounded-[11px] border border-white/18" />
          <div className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-white/38" />
        </div>
        <div className="leading-none">
          <span className="block text-xl font-semibold tracking-tight text-white md:text-2xl" style={{ fontFamily: F.b, letterSpacing: "-0.024em" }}>
            NIXRIX
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 md:text-[11px]" style={{ fontFamily: F.b }}>
            Digital Systems
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function LogoLight({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A] shadow-[0_8px_22px_rgba(232,35,10,0.28)]">
          <span className="relative z-10 text-lg font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>N</span>
          <div className="absolute inset-[1px] rounded-[11px] border border-white/18" />
        </div>
        <div className="leading-none">
          <span className="block text-xl font-semibold tracking-tight text-[#1A1208] md:text-2xl" style={{ fontFamily: F.b, letterSpacing: "-0.024em" }}>
            NIXRIX
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-[#6B6256]/65 md:text-[11px]" style={{ fontFamily: F.b }}>
            Digital Systems
          </span>
        </div>
      </div>
    </motion.div>
  );
}
