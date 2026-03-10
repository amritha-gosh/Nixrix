import { motion } from "motion/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <span
        className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-[#0D9488] to-[#06B6D4] bg-clip-text text-transparent"
        style={{
          fontFamily: '"Inter","Montserrat",system-ui,sans-serif',
          letterSpacing: "-0.01em",
        }}
      >
        NIXRIX
      </span>
    </motion.div>
  );
}
