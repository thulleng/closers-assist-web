"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[400px] w-[400px] rounded-full opacity-40"
      style={{
        background:
          "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.06) 30%, transparent 60%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
