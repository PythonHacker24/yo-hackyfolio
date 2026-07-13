"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts from 0 up to the numeric part of `value` when scrolled into view —
 * fast at first, easing out to land on the final number. Non-numeric
 * prefix/suffix (e.g. "80.7K", "85%") are preserved as-is.
 */
export function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const match = value.match(/\d+(\.\d+)?/);
  const target = match ? parseFloat(match[0]) : null;
  const decimals = match?.[1] ? match[1].length - 1 : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  const [display, setDisplay] = useState(() => (target === null ? value : (0).toFixed(decimals)));

  useEffect(() => {
    if (!inView || target === null) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * t); // expo-out: rapid start, gentle landing
      setDisplay((t >= 1 ? target : target * eased).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimals, duration]);

  return <span ref={ref}>{target === null ? value : `${prefix}${display}${suffix}`}</span>;
}
