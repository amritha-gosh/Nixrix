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

  const hidden = {
    opacity: 0,
    scale: 0.96,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    rotateX: direction === "up" ? 8 : direction === "down" ? -8 : 0,
    rotateY: direction === "left" ? -6 : direction === "right" ? 6 : 0,
  };

  const visible = { opacity: 1, scale: 1, y: 0, x: 0, rotateX: 0, rotateY: 0 };

  return (
    /* Perspective MUST be on the parent wrapper, not the animated element */
    <div ref={ref} className={className} style={{ perspective: "900px" }}>
      <motion.div
        initial={hidden}
        animate={isInView ? visible : hidden}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
