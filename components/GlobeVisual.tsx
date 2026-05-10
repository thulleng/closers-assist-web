"use client";

/**
 * GlobeVisual — Glowing 3D network globe with orbiting rings and data nodes.
 *
 * Matches the "global connectivity / AI network" imagery from references.
 * Neon green + gold on dark. Pure SVG + CSS animations.
 */

import { useEffect, useState } from "react";

export default function GlobeVisual({
  size = 300,
  className = "",
  accentColor = "green",
}: {
  size?: number;
  className?: string;
  accentColor?: "green" | "gold" | "mixed";
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const colors = {
    green: { primary: "#00FF88", secondary: "#10B981", glow: "rgba(0,255,136,0.35)" },
    gold: { primary: "#FBBF24", secondary: "#F59E0B", glow: "rgba(251,191,36,0.35)" },
    mixed: { primary: "#00FF88", secondary: "#FBBF24", glow: "rgba(0,255,136,0.3)" },
  };

  const c = colors[accentColor];
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.3;

  // Pre-compute node positions on the sphere
  const nodes = [
    // Longitude lines (vertical rings)
    { lng: 0, lat: 30 }, { lng: 45, lat: -20 }, { lng: 90, lat: 45 },
    { lng: 135, lat: -35 }, { lng: 180, lat: 15 }, { lng: 225, lat: -45 },
    { lng: 270, lat: 25 }, { lng: 315, lat: -10 },
    // Equatorial
    { lng: 30, lat: 0 }, { lng: 150, lat: 0 }, { lng: 270, lat: 0 },
  ];

  const nodesXY = nodes.map(({ lng, lat }) => {
    const phi = (lat * Math.PI) / 180;
    const theta = (lng * Math.PI) / 180;
    const x = cx + r * Math.cos(phi) * Math.sin(theta);
    const y = cy + r * Math.sin(phi);
    return { x, y };
  });

  return (
    <div
      className={`relative mx-auto transition-all duration-1000 ease-out ${className}`}
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? 1 : 0.8})`,
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          background: `radial-gradient(circle, ${c.glow} 0%, transparent 60%)`,
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        {/* Outer orbit ring 1 */}
        <ellipse
          cx={cx} cy={cy} rx={r * 1.5} ry={r * 0.35}
          fill="none"
          stroke={c.primary}
          strokeWidth="0.8"
          strokeDasharray="6 4"
          opacity="0.2"
        >
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="25s" repeatCount="indefinite" />
        </ellipse>

        {/* Outer orbit ring 2 — tilted */}
        <ellipse
          cx={cx} cy={cy} rx={r * 1.5} ry={r * 0.35}
          fill="none"
          stroke={c.secondary}
          strokeWidth="0.6"
          strokeDasharray="3 5"
          opacity="0.15"
          transform={`rotate(60, ${cx}, ${cy})`}
        >
          <animateTransform attributeName="transform" type="rotate" values={`60 ${cx} ${cy};420 ${cx} ${cy}`} dur="18s" repeatCount="indefinite" />
        </ellipse>

        {/* Globe sphere — wireframe circles */}
        {/* Equator */}
        <ellipse
          cx={cx} cy={cy} rx={r} ry={r * 0.4}
          fill="rgba(0,255,136,0.03)"
          stroke={c.primary}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Prime meridian */}
        <ellipse
          cx={cx} cy={cy} rx={r * 0.4} ry={r}
          fill="none"
          stroke={c.primary}
          strokeWidth="0.8"
          opacity="0.35"
        />
        {/* Diagonal ring */}
        <ellipse
          cx={cx} cy={cy} rx={r * 0.85} ry={r * 0.55}
          fill="none"
          stroke={c.secondary}
          strokeWidth="0.6"
          strokeDasharray="4 3"
          opacity="0.25"
          transform={`rotate(30, ${cx}, ${cy})`}
        />

        {/* Grid lines — latitude */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((latFrac, i) => {
          const ly = cy + latFrac * r;
          const lrx = r * Math.sqrt(1 - latFrac * latFrac);
          const lry = r * 0.15 * Math.sqrt(1 - latFrac * latFrac);
          return (
            <ellipse
              key={`lat-${i}`}
              cx={cx} cy={ly}
              rx={lrx} ry={lry}
              fill="none"
              stroke={c.primary}
              strokeWidth="0.3"
              opacity={0.15}
            />
          );
        })}

        {/* Network nodes on globe surface */}
        {nodesXY.map((n, i) => (
          <g key={`node-${i}`}>
            {/* Node dot */}
            <circle
              cx={n.x} cy={n.y} r={2.5}
              fill={i % 4 === 0 ? c.secondary : c.primary}
              opacity="0.6"
            >
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.5 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
            </circle>
            {/* Node glow */}
            <circle
              cx={n.x} cy={n.y} r={6}
              fill="none"
              stroke={c.primary}
              strokeWidth="0.5"
              opacity="0.3"
            >
              <animate attributeName="r" values="4;8;4" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Connection lines between nodes */}
        {nodesXY.map((a, i) =>
          nodesXY.slice(i + 1, i + 4).map((b, j) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > r * 1.4) return null;
            return (
              <line
                key={`conn-${i}-${j}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={c.primary}
                strokeWidth="0.4"
                opacity={0.12}
              />
            );
          })
        )}

        {/* Outer data streams — curved paths from globe to edges */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const startX = cx + Math.cos(angle) * r * 0.9;
          const startY = cy + Math.sin(angle) * r * 0.9;
          const endX = cx + Math.cos(angle) * r * 1.6;
          const endY = cy + Math.sin(angle) * r * 1.6;
          return (
            <line
              key={`stream-${i}`}
              x1={startX} y1={startY} x2={endX} y2={endY}
              stroke={i % 2 === 0 ? c.primary : c.secondary}
              strokeWidth="1"
              strokeDasharray={`${3 + i * 2} ${4 + i}`}
              opacity="0.2"
            >
              <animate attributeName="stroke-dashoffset" values="0;20" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </line>
          );
        })}
      </svg>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
