"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmailCapture({
  placeholder = "your@email.com",
  buttonText = "Get Started",
  className = "",
}: {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mlgapykd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        // redirect to onboarding after brief delay
        setTimeout(() => {
          router.push(`/onboarding?email=${encodeURIComponent(email)}`);
        }, 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-deal/40 bg-deal/10 px-5 py-4 backdrop-blur">
        <Loader2 className="h-5 w-5 animate-spin text-deal" />
        <span className="text-[15px] font-medium text-deal-light">
          Taking you to setup…
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={status === "loading"}
        className="flex-1 rounded-xl border border-white/20 bg-white/8 px-4 py-4 text-[15px] text-white placeholder:text-ash backdrop-blur focus:border-deal focus:outline-none focus:ring-1 focus:ring-deal disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-loud button-glow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-7 py-4 text-[15px] font-bold disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Setting up…
          </>
        ) : (
          <>
            {buttonText}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="w-full text-center text-sm text-red-400">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
