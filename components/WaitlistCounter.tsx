"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function WaitlistCounter() {
  const [count, setCount] = useState(0);
  const target = 47; // current early access signups

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= target) {
            clearInterval(interval);
            return target;
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }, 300);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-deal/30 bg-deal/[0.04] px-5 py-3 backdrop-blur">
      <div className="flex -space-x-2">
        {["bg-deal", "bg-gold-light", "bg-[#0088cc]"].map((color, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full ${color} border-2 border-pit flex items-center justify-center`}
            style={{ zIndex: 3 - i }}
          >
            <Users className="h-3.5 w-3.5 text-pit" strokeWidth={3} />
          </div>
        ))}
      </div>
      <div>
        <div className="font-mono text-lg font-bold text-deal tabular-nums">
          {count}
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-ash">
          Closers Deployed
        </div>
      </div>
    </div>
  );
}
