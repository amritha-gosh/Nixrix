import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.65,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Build initial state
  const hidden = {
    opacity: 0,
    scale: 0.95,
    y: direction === "up" ? 44 : direction === "down" ? -44 : 0,
    x: direction === "left" ? 44 : direction === "right" ? -44 : 0,
    rotateX: direction === "up" ? 10 : direction === "down" ? -10 : 0,
    rotateY: direction === "left" ? -8 : direction === "right" ? 8 : 0,
  };

  const visible = {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    rotateY: 0,
  };

  return (
    /* Perspective wrapper — perspective must be on the PARENT, not the animated element */
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        initial={hidden}
        animate={isInView ? visible : hidden}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
