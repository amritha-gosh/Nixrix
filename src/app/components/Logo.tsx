import { motion } from "motion/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        {/* Mark — red square with N */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A] shadow-[0_8px_22px_rgba(232,35,10,0.32)]">
          <span
            className="relative z-10 text-[1.15rem] font-bold tracking-tight text-white"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.02em" }}
          >
            N
          </span>
          {/* inner highlight */}
          <div className="absolute inset-[1px] rounded-[11px] border border-white/20" />
          {/* top-left corner dot accent */}
          <div className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-white/40" />
        </div>

        {/* Wordmark */}
        <div className="leading-none">
          <span
            className="block text-xl font-semibold tracking-tight text-white md:text-2xl"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              letterSpacing: "-0.025em",
            }}
          >
            NIXRIX
          </span>
          <span
            className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 md:text-[11px]"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
          >
            Digital Systems
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/** Light variant for use on cream/white backgrounds */
export function LogoLight({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8230A] shadow-[0_8px_22px_rgba(232,35,10,0.28)]">
          <span
            className="relative z-10 text-[1.15rem] font-bold tracking-tight text-white"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.02em" }}
          >
            N
          </span>
          <div className="absolute inset-[1px] rounded-[11px] border border-white/20" />
          <div className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-white/40" />
        </div>
        <div className="leading-none">
          <span
            className="block text-xl font-semibold tracking-tight text-[#1A1208] md:text-2xl"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", letterSpacing: "-0.025em" }}
          >
            NIXRIX
          </span>
          <span
            className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-[#6B6256]/70 md:text-[11px]"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
          >
            Digital Systems
          </span>
        </div>
      </div>
    </motion.div>
  );
}
