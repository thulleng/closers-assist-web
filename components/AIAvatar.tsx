"use client";

/**
 * AIAvatar — Glowing AI head/profile SVG illustration.
 *
 * Matches the neon green / gold Closers Assist design system.
 * Three variants: "profile" (side view head), "circuit" (geometric face),
 * "holo" (holographic head with data rings).
 *
 * Pure SVG + CSS. Zero images.
 */

import { useEffect, useState } from "react";

type Variant = "profile" | "circuit" | "holo";

export default function AIAvatar({
  variant = "holo",
  size = 200,
  className = "",
  accentColor = "green", // "green" | "gold" | "mixed"
}: {
  variant?: Variant;
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
    green: { primary: "#00FF88", secondary: "#10B981", glow: "rgba(0,255,136,0.4)" },
    gold: { primary: "#FBBF24", secondary: "#F59E0B", glow: "rgba(251,191,36,0.4)" },
    mixed: { primary: "#00FF88", secondary: "#FBBF24", glow: "rgba(0,255,136,0.35)" },
  };

  const c = colors[accentColor];

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
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background: `radial-gradient(circle, ${c.glow} 0%, transparent 60%)`,
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {variant === "profile" && <ProfileHead size={size} colors={c} />}
      {variant === "circuit" && <CircuitFace size={size} colors={c} />}
      {variant === "holo" && <HoloHead size={size} colors={c} />}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Variant: Profile Head (side view) ─────────────────────────────────── */

function ProfileHead({ size, colors }: { size: number; colors: { primary: string; secondary: string; glow: string } }) {
  const s = size / 200;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="absolute inset-0"
      style={{ filter: `drop-shadow(0 0 20px ${colors.glow})` }}
    >
      {/* Head outline */}
      <path
        d="M100 30 C60 30 35 55 35 90 C35 120 50 145 75 155 L75 180 L95 175 L95 165 C110 168 130 160 145 145 C165 125 175 95 170 65 C165 45 140 30 100 30Z"
        fill="none"
        stroke={colors.primary}
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Brain / neural area */}
      <path
        d="M100 35 C70 35 52 52 45 80 C40 100 50 125 70 140"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      {/* Neural nodes */}
      {[[80,50],[95,45],[110,50],[70,65],[60,85],[55,70],[95,60],[85,75]].map(([x,y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={s * 2.5}
          fill={i % 3 === 0 ? colors.primary : "none"}
          stroke={colors.primary}
          strokeWidth="1"
          opacity={0.3 + Math.random() * 0.4}
        >
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Eye — glowing */}
      <ellipse cx="60" cy="92" rx="6" ry="5" fill={colors.primary} opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Data ring around head */}
      <ellipse
        cx="100"
        cy="95"
        rx="50"
        ry="12"
        fill="none"
        stroke={colors.primary}
        strokeWidth="0.8"
        strokeDasharray="6 6"
        opacity="0.3"
        transform="rotate(-10, 100, 95)"
      >
        <animateTransform attributeName="transform" type="rotate" values="-10 100 95;5 100 95;-10 100 95" dur="6s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

/* ── Variant: Circuit Face (geometric robot) ───────────────────────────── */

function CircuitFace({ size, colors }: { size: number; colors: { primary: string; secondary: string; glow: string } }) {
  const s = size / 200;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="absolute inset-0"
      style={{ filter: `drop-shadow(0 0 16px ${colors.glow})` }}
    >
      {/* Face plate — hexagonal */}
      <polygon
        points="100,20 155,50 155,110 100,140 45,110 45,50"
        fill="none"
        stroke={colors.primary}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <polygon
        points="100,35 140,57 140,103 100,125 60,103 60,57"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Eyes */}
      <circle cx="75" cy="70" r="8" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="125" cy="70" r="8" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      {/* Eye centers */}
      <circle cx="75" cy="70" r="3" fill={colors.primary} opacity="0.7" />
      <circle cx="125" cy="70" r="3" fill={colors.primary} opacity="0.7" />
      {/* Mouth — data line */}
      <path
        d="M70 100 L85 95 L100 100 L115 95 L130 100"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="1"
        strokeDasharray="4 2"
        opacity="0.6"
      >
        <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" />
      </path>
      {/* Circuit lines */}
      {[[55,40,55,20],[145,40,145,20],[40,80,20,80],[160,80,180,80],[55,120,55,140],[145,120,145,140]].map(([x1,y1,x2,y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={colors.primary}
          strokeWidth="0.8"
          opacity="0.3"
        />
      ))}
      {/* Corner nodes */}
      {[[55,20],[145,20],[20,80],[180,80],[55,140],[145,140]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="none" stroke={colors.primary} strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ── Variant: Holo Head (3D holographic) ───────────────────────────────── */

function HoloHead({ size, colors }: { size: number; colors: { primary: string; secondary: string; glow: string } }) {
  const s = size / 200;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="absolute inset-0"
      style={{ filter: `drop-shadow(0 0 24px ${colors.glow})` }}
    >
      {/* Outer rotating ring */}
      <ellipse
        cx="100" cy="100" rx="85" ry="20"
        fill="none"
        stroke={colors.primary}
        strokeWidth="1"
        strokeDasharray="8 4"
        opacity="0.25"
      >
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite" />
      </ellipse>

      {/* Second ring */}
      <ellipse
        cx="100" cy="100" rx="75" ry="35"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="0.8"
        strokeDasharray="4 6"
        opacity="0.2"
      >
        <animateTransform attributeName="transform" type="rotate" values="360 100 100;0 100 100" dur="15s" repeatCount="indefinite" />
      </ellipse>

      {/* Head shape */}
      <path
        d="M100 30 C130 30 155 50 160 80 C165 110 145 140 120 155 L120 175 L100 170 L80 175 L80 155 C55 140 35 110 40 80 C45 50 70 30 100 30Z"
        fill="none"
        stroke={colors.primary}
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Face plate polygon */}
      <polygon
        points="100,50 135,70 135,115 100,135 65,115 65,70"
        fill="rgba(0,255,136,0.03)"
        stroke={colors.secondary}
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Eyes — horizontal slits */}
      <line x1="75" y1="78" x2="90" y2="78" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="110" y1="78" x2="125" y2="78" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </line>

      {/* Mouth — equalizer bars */}
      {[[95,105,3],[100,100,5],[105,98,4],[110,100,6],[115,103,3]].map(([x,y,h], i) => (
        <line
          key={i}
          x1={x} y1={y} x2={x} y2={y + (h as number)}
          stroke={i % 2 === 0 ? colors.primary : colors.secondary}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        >
          <animate attributeName="y2" values={`${y};${y + (h as number)};${y}`} dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Data particles around head */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 55 + Math.random() * 20;
        const cx = 100 + Math.cos(angle) * dist;
        const cy = 100 + Math.sin(angle) * dist * 0.4;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={1.5}
            fill={i % 3 === 0 ? colors.secondary : colors.primary}
            opacity={0.3}
          >
            <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}
