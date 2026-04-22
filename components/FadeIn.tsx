"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span";
  /** Skip animation entirely — renders visible immediately, no observer */
  instant?: boolean;
};

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
  instant = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Skip animation for instant elements or elements already in the viewport
    if (instant) return;

    const el = ref.current;
    if (!el) return;

    // If the element is already in the viewport on mount, don't animate
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      return;
    }

    // Below the fold — hide and observe
    setVisible(false);
    setAnimated(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, instant]);

  if (instant) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animated ? "transition-all duration-700 ease-out" : ""} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </Component>
  );
}
