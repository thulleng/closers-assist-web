"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import RealChat from "./RealChat";

const PATH_TO_INDUSTRY: Record<string, string> = {
  auto: "auto",
  "real-estate": "real-estate",
  insurance: "insurance",
  solar: "solar",
  saas: "saas",
  medical: "medical",
  retail: "retail",
};

function industryFromPath(pathname: string): string {
  const segment = pathname.split("/")[2] ?? "";
  return PATH_TO_INDUSTRY[segment] ?? "auto";
}

export default function ChatFloat() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  // Dashboard pages have their own DashboardChat — don't double up
  if (isDashboard) return null;

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

  const handleClick = () => {
    if (isDashboard) {
      // Open embedded chat drawer on dashboard pages
      setOpen((prev) => !prev);
    } else if (isHome) {
      // Scroll to chat section on homepage
      const el = document.getElementById("chat");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      // Navigate to homepage chat
      router.push("/#chat");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat drawer — dashboard only */}
      {isDashboard && (
        <div
          ref={drawerRef}
          className={`
            fixed z-50 flex flex-col transition-all duration-300 ease-out
            bottom-[56px] left-0 right-0 h-[calc(100vh-56px)]
            md:bottom-6 md:right-6 md:left-auto md:w-[420px] md:h-[600px] md:rounded-2xl
            ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}
          `}
          style={{ background: "rgba(5,5,6,0.97)" }}
        >
          <div className="flex h-full flex-col overflow-hidden border border-white/10 md:rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-deal/20">
                  <MessageCircle className="h-3.5 w-3.5 text-deal" strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-white">Sassy</span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-deal/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-deal">
                    <span className="h-1 w-1 rounded-full bg-deal" />
                    Live
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ash transition-colors hover:bg-white/8 hover:text-bone"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            {/* Chat body */}
            <div className="flex-1 overflow-hidden [&>div]:h-full [&>div]:rounded-none [&>div]:border-0">
              <RealChat industry={industry} />
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isDashboard ? (open ? "Close chat" : "Open chat") : "Chat with Sassy"}
        className={`
          fixed z-50 flex items-center gap-2.5
          bottom-20 right-4 md:bottom-6 md:right-6
          rounded-2xl text-pit
          shadow-[0_8px_32px_rgba(16,185,129,0.35)]
          hover:bg-deal-hover active:scale-95
          transition-all duration-200
          h-12 w-12 md:h-auto md:w-auto md:px-4 md:py-3
          justify-center
          ${open ? "bg-slate text-bone" : "bg-deal"}
        `}
      >
        {open ? (
          <X className="h-5 w-5 md:h-4 md:w-4" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="h-5 w-5 md:h-4 md:w-4" strokeWidth={2.2} />
        )}
        <span className="hidden md:inline text-[13px] font-bold">
          {open ? "Close" : isDashboard ? "Chat with Sassy" : "Chat with Sassy"}
        </span>
      </button>
    </>
  );
}
