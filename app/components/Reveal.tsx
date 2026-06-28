"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll reveal: a section drifts up while it sharpens from a soft blur and
 * fades in — a focus-pull rather than a slide. Fires once, when ~15% of the
 * block enters the viewport. Honors prefers-reduced-motion via framer.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 32, scale: 0.985, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
        // sharpen a touch faster than it travels, so it reads as a focus-pull
        filter: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
