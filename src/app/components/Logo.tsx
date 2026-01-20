import { motion } from 'motion/react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <span 
        className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0D9488] bg-clip-text text-transparent"
        style={{ 
          fontFamily: '"Montserrat", "Poppins", "Inter", system-ui, sans-serif',
          letterSpacing: '0.05em',
          fontWeight: 900
        }}
      >
        NIXRIX
      </span>
    </motion.div>
  );
}
