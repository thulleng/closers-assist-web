"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Smartphone } from "lucide-react";

export default function TelegramLinkClient() {
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") ?? null;
  const chatId = searchParams?.get("chat_id") ?? null;

  const [status, setStatus] = useState<"idle" | "linking" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code || !chatId) return;
    // Auto-link on page load if params present
    linkTelegram();
  }, [code, chatId]); // eslint-disable-line react-hooks/exhaustive-deps

  const linkTelegram = async () => {
    setStatus("linking");
    setError("");

    try {
      const res = await fetch("/api/telegram/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: Number(chatId), code }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setError(data.error || "Failed to link");
      }
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  };

  if (!code || !chatId) return null; // No linking params — marketing page shows instead

  return (
    <div className="mx-auto max-w-md text-center">
      {status === "linking" && (
        <div className="glass-panel rounded-2xl p-10">
          <Loader2 className="mx-auto h-10 w-10 text-deal animate-spin" strokeWidth={2} />
          <h2 className="mt-6 font-display text-2xl font-bold text-white">Connecting your agent...</h2>
          <p className="mt-2 text-sm text-ash">One moment — linking your Telegram to Closers Assist.</p>
        </div>
      )}

      {status === "done" && (
        <div className="glass-panel rounded-2xl p-10">
          <CheckCircle className="mx-auto h-12 w-12 text-deal" strokeWidth={2} />
          <h2 className="mt-6 font-display text-2xl font-bold text-white">You&apos;re connected!</h2>
          <p className="mt-2 text-sm text-ash">
            Your Closers Assist agent is now live in Telegram. Go back to the chat and try it:
          </p>
          <div className="mt-4 rounded-xl bg-slate/50 p-4 text-left">
            <code className="text-[13px] text-bone">
              &ldquo;I just sold a Camry to Jane Foster — full deal, $3,200 front gross&rdquo;
            </code>
          </div>
          <a
            href="https://t.me/ClosersAssistBot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-loud mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base"
          >
            Open Telegram Chat
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="glass-panel rounded-2xl p-10">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" strokeWidth={2} />
          <h2 className="mt-6 font-display text-2xl font-bold text-white">Connection failed</h2>
          <p className="mt-2 text-sm text-ash">{error || "Something went wrong."}</p>
          <button
            onClick={linkTelegram}
            className="btn-loud mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base"
          >
            Try Again
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <p className="mt-3 text-xs text-muted">
            Make sure you&apos;re signed in to closersassist.com first.
          </p>
        </div>
      )}
    </div>
  );
}
