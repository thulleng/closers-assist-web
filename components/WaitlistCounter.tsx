"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp } from "lucide-react";

export default function WaitlistCounter() {
  const target = 47; // current early access signups
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("waitlist-counter");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div
      id="waitlist-counter"
      className="group inline-flex items-center gap-4 rounded-2xl border border-deal/20 bg-gradient-to-r from-deal/[0.06] to-emerald-500/[0.04] px-6 py-4 backdrop-blur transition-all hover:border-deal/40 hover:from-deal/[0.1] hover:to-emerald-500/[0.08]"
    >
      {/* Avatar stack */}
      <div className="flex -space-x-2.5">
        {["bg-deal", "bg-gold-light", "bg-[#0088cc]"].map((color, i) => (
          <div
            key={i}
            className={`h-10 w-10 rounded-full ${color} border-2 border-pit flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
            style={{ zIndex: 3 - i, transitionDelay: `${i * 50}ms` }}
          >
            <Users className="h-4 w-4 text-pit" strokeWidth={3} />
          </div>
        ))}
      </div>

      {/* Number + label */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-3xl font-black text-deal tabular-nums leading-none">
            {visible ? count : 0}
          </span>
          {visible && count >= target && (
            <TrendingUp className="h-4 w-4 text-emerald-400 animate-bounce" />
          )}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 leading-tight">
          CLOSERS DEPLOYED
        </div>
      </div>
    </div>
  );
}
