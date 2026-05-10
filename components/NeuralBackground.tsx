"use client";

/**
 * NeuralBackground — Animated connected-node network.
 *
 * Subtle particle system with connecting lines that fade in/out.
 * Use as a background layer behind content sections.
 * Pure CSS + canvas-free (div-based for simplicity).
 * 
 * Props:
 *   - density: number of nodes (default 20)
 *   - color: "green" | "gold" | "mixed" (default "green")
 *   - opacity: background opacity (default 0.03)
 *   - className: additional classes
 */

import { useEffect, useRef, useState, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
}

export default function NeuralBackground({
  density = 20,
  color = "green",
  opacity = 0.03,
  className = "",
}: {
  density?: number;
  color?: "green" | "gold" | "mixed";
  opacity?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const animFrame = useRef<number>(0);

  const colors = {
    green: { dot: "rgba(0,255,136,0.6)", line: "rgba(0,255,136,0.08)" },
    gold: { dot: "rgba(251,191,36,0.6)", line: "rgba(251,191,36,0.06)" },
    mixed: { dot: "rgba(0,255,136,0.5)", line: "rgba(0,255,136,0.06)" },
  };

  const initNodes = useCallback(
    (w: number, h: number) => {
      const arr: Node[] = [];
      for (let i = 0; i < density; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.2 + Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
      return arr;
    },
    [density]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ w: width, h: height });
      setNodes(initNodes(width, height));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [initNodes]);

  // Animate nodes
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      setNodes((prev) =>
        prev.map((n) => {
          let nx = n.x + n.vx;
          let ny = n.y + n.vy;
          let nvx = n.vx;
          let nvy = n.vy;

          if (nx < 0 || nx > dimensions.w) nvx *= -1;
          if (ny < 0 || ny > dimensions.h) nvy *= -1;

          nx = Math.max(0, Math.min(dimensions.w, nx));
          ny = Math.max(0, Math.min(dimensions.h, ny));

          return {
            ...n,
            x: nx,
            y: ny,
            vx: nvx,
            vy: nvy,
            pulse: n.pulse + 0.02,
          };
        })
      );
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animFrame.current);
    };
  }, [dimensions]);

  const dotColor = colors[color].dot;
  const lineColor = colors[color].line;
  const maxDist = Math.min(dimensions.w, dimensions.h) * 0.35;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        {/* Connection lines */}
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > maxDist) return null;

            const alpha = (1 - dist / maxDist) * 0.4;
            return (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lineColor}
                strokeWidth="0.5"
                opacity={alpha}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: n.x,
            top: n.y,
            width: n.size,
            height: n.size,
            transform: "translate(-50%, -50%)",
            background: color === "mixed" && i % 3 === 0
              ? "rgba(251,191,36,0.6)"
              : dotColor,
            boxShadow: color === "mixed" && i % 3 === 0
              ? `0 0 ${n.size * 2}px rgba(251,191,36,0.4)`
              : `0 0 ${n.size * 2}px rgba(0,255,136,0.4)`,
            opacity: n.opacity * (0.6 + 0.4 * Math.sin(n.pulse)),
          }}
        />
      ))}
    </div>
  );
}
