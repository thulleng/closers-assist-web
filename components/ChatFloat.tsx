"use client";

import { usePathname, useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function ChatFloat() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const isHome = pathname === "/";

  const handleClick = () => {
    if (isHome) {
      const el = document.getElementById("chat");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      router.push("/#chat");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Chat with Sassy"
      className="
        fixed z-50 flex items-center gap-2.5
        bottom-20 right-4 md:bottom-6 md:right-6
        rounded-2xl bg-deal text-pit
        shadow-[0_8px_32px_rgba(16,185,129,0.35)]
        hover:bg-deal-hover active:scale-95
        transition-all duration-200
        h-12 w-12 md:h-auto md:w-auto md:px-4 md:py-3
        justify-center
      "
    >
      <MessageCircle className="h-5 w-5 md:h-4 md:w-4" strokeWidth={2.2} />
      <span className="hidden md:inline text-[13px] font-bold">Chat with Sassy</span>
    </button>
  );
}
