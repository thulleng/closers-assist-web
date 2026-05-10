"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number; // 0 = fixed, 0.5 = half scroll speed, 1 = normal
  className?: string;
};

/**
 * Simple parallax wrapper — background/foreground layers move at different speeds.
 * Uses transform: translateY tied to scroll position via requestAnimationFrame.
 */
export default function ParallaxSection({ children, speed = 0.5, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    const onScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const offset = scrolled * (1 - speed) * 0.3;
      el.style.transform = `translateY(${offset}px)`;
    };

    const loop = () => {
      onScroll();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
