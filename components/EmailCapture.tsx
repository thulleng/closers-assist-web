"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmailCapture({
  placeholder = "your@email.com",
  buttonText = "Start free →",
  className = "",
}: {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}) {
  const router = useRouter();

  function handleSubmit(email: string) {
    if (email) {
      window.location.href = `mailto:thul@closersassist.com?subject=Early Access Request&body=Hi Thul, I want early access to Closers Assist.%0A%0AEmail: ${encodeURIComponent(email)}`;
    } else {
      router.push("/pricing");
    }
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <input
        id="email-capture"
        type="email"
        placeholder={placeholder}
        className="flex-1 rounded-xl border border-white/20 bg-white/8 px-4 py-4 text-[15px] text-white placeholder:text-ash backdrop-blur focus:border-deal focus:outline-none focus:ring-1 focus:ring-deal"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit((e.target as HTMLInputElement).value);
          }
        }}
      />
      <button
        type="button"
        className="btn-loud button-glow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-7 py-4 text-[15px] font-bold"
        onClick={() => {
          const input = document.getElementById("email-capture") as HTMLInputElement;
          handleSubmit(input?.value ?? "");
        }}
      >
        {buttonText}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
