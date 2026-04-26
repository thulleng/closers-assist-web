"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Minus } from "lucide-react";
import RealChat from "./RealChat";

// Map dashboard path segments to industry slugs RealChat expects
const PATH_TO_INDUSTRY: Record<string, string> = {
  auto:         "auto",
  "real-estate": "real-estate",
  insurance:    "insurance",
  solar:        "solar",
  saas:         "saas",
  medical:      "medical",
  retail:       "retail",
};

function industryFromPath(pathname: string): string {
  const segment = pathname.split("/")[2] ?? "";
  return PATH_TO_INDUSTRY[segment] ?? "auto";
}

export default function ChatFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isDashboard = pathname.startsWith("/dashboard");
  const industry = industryFromPath(pathname);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll when drawer open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!isDashboard) return null;

  return (
    <>
      {/* Backdrop — mobile only */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed z-50 flex flex-col transition-all duration-300 ease-out
          /* Mobile: slides up from bottom, sits above bottom nav */
          bottom-[60px] left-0 right-0 h-[72vh]
          /* Desktop: fixed panel bottom-right */
          md:bottom-6 md:right-6 md:left-auto md:w-[400px] md:h-[580px] md:rounded-2xl
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}
        `}
        style={{ background: "rgba(5,5,6,0.97)" }}
      >
        {/* Drawer border */}
        <div className="flex h-full flex-col overflow-hidden border border-white/10 md:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-deal/20">
                <MessageSquare className="h-3.5 w-3.5 text-deal" strokeWidth={2.2} />
              </div>
              <div>
                <span className="text-[13px] font-semibold text-white">Your Agent</span>
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-deal/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-deal">
                  <span className="h-1 w-1 rounded-full bg-deal" />
                  Live
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ash transition-colors hover:bg-white/8 hover:text-bone"
              >
                <Minus className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ash transition-colors hover:bg-white/8 hover:text-bone"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Chat — remove the outer border/radius since drawer provides it */}
          <div className="flex-1 overflow-hidden [&>div]:h-full [&>div]:rounded-none [&>div]:border-0">
            <RealChat industry={industry} />
          </div>
        </div>
      </div>

      {/* FAB — floating action button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close agent chat" : "Talk to your agent"}
        className={`
          fixed z-50 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(16,185,129,0.35)] transition-all duration-200
          /* Mobile: sits above bottom nav */
          bottom-[72px] right-4
          /* Desktop */
          md:bottom-6 md:right-6
          ${open
            ? "rounded-xl bg-slate border border-iron px-4 py-2.5 text-ash hover:text-bone"
            : "rounded-2xl bg-deal px-4 py-3 text-pit hover:bg-deal-hover active:scale-95"
          }
        `}
      >
        {open ? (
          <>
            <X className="h-4 w-4" strokeWidth={2.5} />
            <span className="text-[13px] font-semibold">Close</span>
          </>
        ) : (
          <>
            <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
            <span className="text-[13px] font-bold">Talk to your Agent</span>
          </>
        )}
      </button>
    </>
  );
}
