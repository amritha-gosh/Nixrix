import { motion } from "motion/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span
        className="flex items-end text-4xl md:text-5xl font-black uppercase select-none"
        style={{
          fontFamily: '"Montserrat", "Poppins", "Inter", system-ui, sans-serif',
          letterSpacing: "0.08em",
        }}
      >
        {/* N */}
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0D9488] to-[#0b7d73]">
          N
        </span>

        {/* I */}
        <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-b from-[#06B6D4] to-[#0D9488]">
          I
        </span>

        {/* X – hero letter */}
        <motion.span
          className="relative mx-1 text-transparent bg-clip-text bg-gradient-to-br from-[#06B6D4] via-[#0D9488] to-[#06B6D4]"
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25 }}
          style={{ letterSpacing: "0.12em" }}
        >
          X
          {/* Accent underline */}
          <span className="absolute left-1/2 -bottom-2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0D9488]" />
        </motion.span>

        {/* R */}
        <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-b from-[#0D9488] to-[#06B6D4]">
          R
        </span>

        {/* I */}
        <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-b from-[#06B6D4] to-[#0D9488]">
          I
        </span>

        {/* X */}
        <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-br from-[#0D9488] to-[#06B6D4]">
          X
        </span>
      </span>
    </motion.div>
  );
}
