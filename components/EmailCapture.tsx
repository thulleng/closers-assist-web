"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function EmailCapture({
  placeholder = "your@email.com",
  buttonText = "Join Waitlist",
  className = "",
}: {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(email: string) {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mlgapykd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-[15px] font-medium text-deal">
        You&rsquo;re on the list. We&rsquo;ll be in touch.
      </p>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <input
        id="email-capture"
        type="email"
        placeholder={placeholder}
        disabled={status === "loading"}
        className="flex-1 rounded-xl border border-white/20 bg-white/8 px-4 py-4 text-[15px] text-white placeholder:text-ash backdrop-blur focus:border-deal focus:outline-none focus:ring-1 focus:ring-deal disabled:opacity-50"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit((e.target as HTMLInputElement).value);
          }
        }}
      />
      <button
        type="button"
        disabled={status === "loading"}
        className="btn-loud button-glow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-7 py-4 text-[15px] font-bold disabled:opacity-50"
        onClick={() => {
          const input = document.getElementById("email-capture") as HTMLInputElement;
          handleSubmit(input?.value ?? "");
        }}
      >
        {status === "loading" ? "Sending…" : buttonText}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
      {status === "error" && (
        <p className="w-full text-center text-sm text-red-400">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
