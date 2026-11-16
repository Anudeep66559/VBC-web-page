"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  start?: number;
  duration?: number;
  decimals?: number;
}

/**
 * Count-up animation that triggers when the element is visible.
 * Returns a ref to attach and the current value.
 */
export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { start = 0, duration = 1800 } = options;
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const next = Math.round(start + (target - start) * eased);
              setValue(next);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, start, duration]);

  return { ref, value };
}
