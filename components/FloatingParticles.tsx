"use client";

import { useEffect, useRef } from "react";

/**
 * Pure CSS floating particle network — no canvas, no JS animation loop.
 * Renders 20 dots that float upward with staggered delays and durations.
 */
export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Spawn particles dynamically to avoid hydration mismatch with random positions
    const count = 20;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = 6 + Math.random() * 10;
      const hue = Math.random() > 0.6 ? "cyan" : "green";
      const color = hue === "green" ? "rgba(16,185,129,0.5)" : "rgba(0,229,255,0.4)";

      dot.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 ${size * 3}px ${color};
        animation: particle-rise ${duration}s linear infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
      `;
      frag.appendChild(dot);
    }
    el.appendChild(frag);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes particle-rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
