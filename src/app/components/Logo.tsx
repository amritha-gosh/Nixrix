import { motion } from "motion/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        {/* Mark */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D9488] to-[#06B6D4] shadow-[0_10px_24px_rgba(6,182,212,0.25)]">
          <span
            className="text-lg font-bold text-white"
            style={{
              fontFamily: '"Inter","Montserrat",system-ui,sans-serif',
              letterSpacing: "-0.03em",
            }}
          >
            N
          </span>
          <div className="absolute inset-[1px] rounded-[11px] border border-white/15" />
        </div>

        {/* Wordmark */}
        <div className="leading-none">
          <span
            className="block bg-gradient-to-r from-white via-[#D1FAE5] to-[#67E8F9] bg-clip-text text-xl font-semibold tracking-tight text-transparent md:text-2xl"
            style={{
              fontFamily: '"Inter","Montserrat",system-ui,sans-serif',
              letterSpacing: "-0.02em",
            }}
          >
            NIXRIX
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-slate-400 md:text-[11px]">
            Digital Systems
          </span>
        </div>
      </div>
    </motion.div>
  );
}
