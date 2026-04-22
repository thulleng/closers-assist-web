"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span";
};

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible — content is readable immediately, animation is progressive enhancement
  const [visible, setVisible] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // On mount, reset to hidden so we can animate in
    setVisible(false);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(el);
    setAnimated(true);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animated ? "transition-all duration-700 ease-out" : ""} ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </Component>
  );
}
