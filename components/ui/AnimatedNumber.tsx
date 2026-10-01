"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  /** Where the count starts (default 0). Can be higher than `value` to count down. */
  from?: number;
  prefix?: string;
  suffix?: string;
  /** Duration in ms. */
  duration?: number;
};

/**
 * Counts from `from` to `value` when scrolled into view. Server-renders the
 * final value so the number is correct without JavaScript.
 */
export function AnimatedNumber({ value, from = 0, prefix = "", suffix = "", duration = 2200 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  // Before first paint, reset to the start value (unless the user prefers reduced motion).
  useLayoutEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setDisplay(from);
  }, [from]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // ease-out
          setDisplay(Math.round(from + (value - from) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
