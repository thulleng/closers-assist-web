"use client";

/**
 * DealFlowVisual — Animated deal pipeline showing deals → cash → growth.
 *
 * Floating deal cards that animate along a pipeline with dollar amounts.
 * Perfect for pricing pages and "how it works" sections.
 * Pure CSS + SVG. Zero images.
 */

import { useEffect, useState } from "react";

interface DealCard {
  id: number;
  label: string;
  amount: number;
  delay: number;
  y: number;
  opacity: number;
}

export default function DealFlowVisual({
  size = 400,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [cards] = useState<DealCard[]>([
    { id: 1, label: "RAV4 XLE", amount: 2500, delay: 0, y: 30, opacity: 1 },
    { id: 2, label: "Camry SE", amount: 1800, delay: 2, y: 15, opacity: 0.85 },
    { id: 3, label: "Tundra Ltd", amount: 4200, delay: 4, y: 0, opacity: 0.7 },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const w = size;
  const h = size * 0.7;
  const cx = w / 2;
  const cy = h / 2;

  return (
    <div
      className={`relative mx-auto transition-all duration-1000 ease-out ${className}`}
      style={{
        width: w,
        height: h,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: w * 0.7,
          height: h * 0.8,
          background: "radial-gradient(ellipse, rgba(0,255,136,0.08) 0%, transparent 60%)",
        }}
      />

      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0"
      >
        {/* Pipeline track — horizontal line */}
        <line
          x1={w * 0.05}
          y1={cy}
          x2={w * 0.95}
          y2={cy}
          stroke="rgba(0,255,136,0.15)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />

        {/* Track nodes */}
        {[0.15, 0.35, 0.55, 0.75, 0.95].map((frac, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={w * frac}
              cy={cy}
              r={i === 2 ? 6 : 4}
              fill={i === 2 ? "rgba(0,255,136,0.3)" : "rgba(0,255,136,0.1)"}
              stroke={i === 2 ? "#00FF88" : "rgba(0,255,136,0.3)"}
              strokeWidth={i === 2 ? 1.5 : 1}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            {i === 2 && (
              <circle cx={w * frac} cy={cy} r={12} fill="none" stroke="#00FF88" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {/* Animated dollar signs flowing along pipeline */}
        {[0, 1, 2].map((i) => (
          <text
            key={`flow-${i}`}
            x={w * 0.05}
            y={cy - 20}
            fill="#00FF88"
            fontSize="16"
            fontWeight="bold"
            opacity="0.4"
            fontFamily="system-ui"
          >
            $
            <animateMotion
              dur={`${3 + i * 1.5}s`}
              repeatCount="indefinite"
              path={`M${w * 0.05},${cy - 20} L${w * 0.95},${cy - 20}`}
              begin={`${i * 1.2}s`}
            />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + i * 1.5}s`} repeatCount="indefinite" begin={`${i * 1.2}s`} />
          </text>
        ))}

        {/* Arrow at end of pipeline */}
        <polygon
          points={`${w * 0.93},${cy - 6} ${w * 0.98},${cy} ${w * 0.93},${cy + 6}`}
          fill="rgba(0,255,136,0.4)"
        >
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
        </polygon>
      </svg>

      {/* Floating deal cards */}
      {cards.map((card, i) => (
        <div
          key={card.id}
          className="absolute left-0 right-0 mx-auto rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all"
          style={{
            width: size * 0.45,
            top: `${15 + i * 28}%`,
            opacity: visible ? card.opacity : 0,
            transform: `translateY(${visible ? 0 : 20}px)`,
            transitionDelay: `${card.delay * 100}ms`,
            transitionDuration: "800ms",
            zIndex: 3 - i,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-neon-green">
                {card.label}
              </div>
              <div className="text-[11px] text-ash mt-0.5">
                Deal closed
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-bold text-neon-green glow-text-green">
                +${card.amount.toLocaleString()}
              </div>
              <div className="text-[9px] text-muted font-mono uppercase">
                Commission
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom text — the value prop */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 10}px)`,
          transitionDelay: "800ms",
        }}
      >
        <div className="font-display text-base font-bold text-gold">
          One deal pays for 10 years.
        </div>
        <div className="text-[10px] text-muted mt-1 font-mono uppercase tracking-[1px]">
          $29.99/mo · Cancel anytime
        </div>
      </div>

      <style jsx>{`
        .glow-text-green {
          text-shadow: 0 0 12px rgba(0,255,136,0.4);
        }
      `}</style>
    </div>
  );
}
