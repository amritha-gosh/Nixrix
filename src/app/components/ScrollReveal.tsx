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
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial: Record<string, number | string> = {
    opacity: 0,
    scale: 0.94,
  };

  if (direction === "up")    { initial.y = 48; initial.rotateX = 8; }
  if (direction === "down")  { initial.y = -48; initial.rotateX = -8; }
  if (direction === "left")  { initial.x = 48; initial.rotateY = -6; }
  if (direction === "right") { initial.x = -48; initial.rotateY = 6; }
  if (direction === "none")  { /* no transform */ }

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0 }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
