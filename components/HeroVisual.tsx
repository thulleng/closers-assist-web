"use client";

/**
 * HeroVisual — Animated AI-themed illustration for Deal Clozr.
 *
 * Dark background, glowing neon-green core, circuit lines radiating outward,
 * floating industry icons orbiting the center. Pure CSS + inline SVG.
 * Zero dependencies. Zero images to load.
 *
 * Matches the dealclozr.com design system: neon green #10B981 / #00FF88,
 * pit black #050506, gold accents #FBBF24.
 */

import { useEffect, useRef, useState } from "react";
import {
  Car,
  Home,
  Shield,
  Sun,
  Monitor,
  HeartPulse,
  ShoppingBag,
  Zap,
} from "lucide-react";

const INDUSTRY_ICONS = [
  { Icon: Car,          label: "Auto",       angle: 0   },
  { Icon: Home,         label: "Real Estate", angle: 45  },
  { Icon: Shield,       label: "Insurance",   angle: 90  },
  { Icon: Sun,          label: "Solar",       angle: 135 },
  { Icon: Monitor,      label: "SaaS",        angle: 180 },
  { Icon: HeartPulse,   label: "Medical",     angle: 225 },
  { Icon: ShoppingBag,  label: "Retail",      angle: 270 },
  { Icon: Zap,          label: "All 18+",    angle: 315 },
];

function IconNode({
  Icon,
  angle,
  radius,
  isVisible,
  delay,
}: {
  Icon: React.ElementType;
  angle: number;
  radius: number;
  isVisible: boolean;
  delay: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      className="absolute transition-all duration-1000 ease-out"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/10 border border-neon-green/20 backdrop-blur-sm shadow-[0_0_16px_rgba(0,255,136,0.15)]">
        <Icon className="h-4 w-4 text-neon-green" strokeWidth={2} />
      </div>
    </div>
  );
}

function CircuitLine({ angle, radius, isVisible }: { angle: number; radius: number; isVisible: boolean }) {
  const rad = (angle * Math.PI) / 180;
  const x2 = Math.cos(rad) * radius;
  const y2 = Math.sin(rad) * radius;
  // Draw from center to the icon position
  const midX = Math.cos(rad) * (radius * 0.5);
  const midY = Math.sin(rad) * (radius * 0.5);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <line
        x1="50%"
        y1="50%"
        x2={`${50 + (x2 / 4) * 100 / 100}%`}
        y2={`${50 + (y2 / 4) * 100 / 100}%`}
        stroke="rgba(0,255,136,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          strokeDashoffset: isVisible ? 0 : 100,
        }}
      />
    </svg>
  );
}

export default function HeroVisual({
  size = 400,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = size * 0.38;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow behind core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background: "radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 60%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Outer orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed pointer-events-none"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderColor: "rgba(0,255,136,0.1)",
          animation: "spin-slower 60s linear infinite",
        }}
      />

      {/* Middle orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed pointer-events-none"
        style={{
          width: size * 0.65,
          height: size * 0.65,
          borderColor: "rgba(251,191,36,0.08)",
          animation: "spin-slow 40s linear infinite reverse",
        }}
      />

      {/* Circuit lines to icons */}
      {INDUSTRY_ICONS.map((item) => (
        <CircuitLine
          key={item.angle}
          angle={item.angle}
          radius={radius}
          isVisible={visible}
        />
      ))}

      {/* Industry icons orbiting */}
      {INDUSTRY_ICONS.map((item, i) => (
        <IconNode
          key={item.angle}
          Icon={item.Icon}
          angle={item.angle + (visible ? 0 : 20)}
          radius={radius}
          isVisible={visible}
          delay={i * 80}
        />
      ))}

      {/* Central AI Core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ease-out"
        style={{
          transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.5})`,
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 0.2,
            height: size * 0.2,
            background: "radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 70%)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />

        {/* Hexagonal core */}
        <div className="relative flex items-center justify-center">
          {/* Hexagon container */}
          <svg
            width={size * 0.18}
            height={size * 0.18}
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_30px_rgba(0,255,136,0.5)]"
          >
            {/* Outer hex ring */}
            <polygon
              points="50,5 90,27 90,73 50,95 10,73 10,27"
              fill="none"
              stroke="rgba(0,255,136,0.4)"
              strokeWidth="1.5"
              className="origin-center"
              style={{ animation: "spin-slower 30s linear infinite", transformOrigin: "50% 50%" }}
            />
            {/* Inner hex */}
            <polygon
              points="50,15 83,32 83,68 50,85 17,68 17,32"
              fill="rgba(0,255,136,0.08)"
              stroke="rgba(0,255,136,0.6)"
              strokeWidth="1"
            />
            {/* Center diamond */}
            <polygon
              points="50,30 70,50 50,70 30,50"
              fill="rgba(0,255,136,0.2)"
              stroke="#00FF88"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.6))" }}
            />
            {/* Inner dot */}
            <circle
              cx="50"
              cy="50"
              r="8"
              fill="#00FF88"
              style={{ filter: "drop-shadow(0 0 12px rgba(0,255,136,0.8))" }}
            />
          </svg>

          {/* "DC" text in center */}
          <span
            className="absolute font-display text-[10px] font-black text-pit pointer-events-none select-none"
            style={{
              textShadow: "0 0 6px rgba(0,255,136,0.5)",
            }}
          >
            DC
          </span>
        </div>
      </div>

      {/* Floating particles */}
      {visible &&
        Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360 + Math.random() * 20;
          const dist = radius * (0.5 + Math.random() * 0.4);
          const rad = (angle * Math.PI) / 180;
          const px = Math.cos(rad) * dist;
          const py = Math.sin(rad) * dist;

          return (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `calc(50% + ${px}px)`,
                top: `calc(50% + ${py}px)`,
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                background: i % 3 === 0 ? "#FBBF24" : "#00FF88",
                boxShadow: i % 3 === 0
                  ? "0 0 4px rgba(251,191,36,0.6)"
                  : "0 0 4px rgba(0,255,136,0.6)",
                animation: `float-particle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.4 + Math.random() * 0.4,
              }}
            />
          );
        })}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(4px, -8px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
