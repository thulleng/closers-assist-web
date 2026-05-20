"use client";

import { usePathname, useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function ChatFloat() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const isHome = pathname === "/";

  const handleClick = () => {
    if (isHome) {
      // Scroll to chat section on homepage
      const el = document.getElementById("chat");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      // Navigate to homepage chat section
      router.push("/#chat");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Chat with Sassy"
      className="
        fixed z-50 bottom-6 right-6
        hidden md:flex items-center gap-2.5
        rounded-2xl bg-deal px-4 py-3 text-pit
        shadow-[0_8px_32px_rgba(16,185,129,0.35)]
        hover:bg-deal-hover active:scale-95
        transition-all duration-200
      "
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
      <span className="text-[13px] font-bold">Chat with Sassy</span>
    </button>
  );
}
