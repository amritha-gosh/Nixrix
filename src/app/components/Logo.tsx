import { motion } from "motion/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <span
        className="relative inline-block text-3xl md:text-4xl font-extrabold leading-none"
        style={{
          fontFamily: '"Montserrat","Inter",system-ui,sans-serif',
          letterSpacing: "-0.02em",
        }}
      >
        {/* subtle glow */}
        <span className="absolute inset-0 blur-md opacity-30 bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0D9488] rounded-lg" />

        {/* main text */}
        <span className="relative bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0D9488] bg-clip-text text-transparent">
          NIXRIX
        </span>

        {/* accent: make N + X feel “designed” */}
        <span className="pointer-events-none absolute -top-1 left-[0.08em] h-[0.18em] w-[1.35em] rounded-full bg-[#06B6D4]/25 blur-[1px]" />
        <span className="pointer-events-none absolute -bottom-1 left-[1.65em] h-[0.18em] w-[1.15em] rounded-full bg-[#0D9488]/25 blur-[1px]" />
      </span>
    </motion.div>
  );
}
