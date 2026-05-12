"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-deal/20 px-4 py-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(5,5,6,0.95)" }}
    >
      <Link
        href="/pricing"
        className="btn-loud group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-bold"
      >
        Get Started — $29.99/mo
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
