"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Mail,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [accountReady, setAccountReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("session_id")
      : null;

  async function checkSession() {
    if (!sessionId) {
      setLoading(false);
      setError("No session found. If you completed payment, check your email.");
      return;
    }

    setPolling(true);
    try {
      const r = await fetch(`/api/checkout/session?session_id=${sessionId}`);
      const data = await r.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        setPolling(false);
        return;
      }

      setEmail(data.email || null);

      if (data.accountReady) {
        setAccountReady(true);
        setLoading(false);
        setPolling(false);
      } else if (data.status === "paid" || data.status === "complete") {
        // Payment confirmed but account not provisioned yet — keep polling
        setLoading(false);
        setTimeout(() => checkSession(), 2000);
      } else {
        // Payment not yet confirmed
        setLoading(false);
        setPolling(false);
        setError("Payment still processing. This can take a moment.");
        setTimeout(() => checkSession(), 3000);
      }
    } catch {
      setError("Could not verify payment. Check your email for a login link.");
      setLoading(false);
      setPolling(false);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  // ── Loading state ────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <Loader2 className="w-10 h-10 text-[#10B981] animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Confirming your payment...
          </h1>
          <p className="text-gray-400 text-sm">This takes just a second.</p>
        </div>
      </main>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────
  if (error && !email) {
    return (
      <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
            <RefreshCw className="w-9 h-9 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Almost there
          </h1>
          <p className="text-gray-400 text-sm mb-8">{error}</p>
          <button
            onClick={checkSession}
            className="inline-flex items-center gap-2 bg-[#10B981] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#059669] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Check again
          </button>
        </div>
      </main>
    );
  }

  // ── Polling (account not ready yet) ──────────────────────────────────
  if (!accountReady && email) {
    return (
      <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-9 h-9 text-[#10B981]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Payment confirmed!
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Setting up your account...
          </p>
          <p className="text-sm text-gray-500 mb-6">
            We're provisioning your agent for{" "}
            <span className="text-gray-300 font-medium">{email}</span>
          </p>
          <Loader2 className="w-6 h-6 text-[#10B981] animate-spin mx-auto" />
          <p className="text-xs text-gray-600 mt-4">
            {polling ? "This usually takes under 10 seconds." : "Checking..."}
          </p>
        </div>
      </main>
    );
  }

  // ── Account ready — show magic link flow ──────────────────────────────
  return (
    <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-9 h-9 text-[#10B981]" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">You're in!</h1>
        <p className="text-gray-400 text-lg mb-6">
          Payment confirmed. Your ClosersAssist subscription is now active.
        </p>

        {/* Magic link card */}
        <div className="bg-white/[0.03] border border-[#10B981]/20 rounded-xl p-6 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Check your email
              </h2>
              <p className="text-gray-500 text-xs">
                We sent a login link to:
              </p>
            </div>
          </div>

          {email && (
            <div className="bg-black/40 border border-white/[0.06] rounded-lg px-4 py-3 mb-4">
              <p className="text-gray-200 font-medium text-sm break-all">
                {email}
              </p>
            </div>
          )}

          <ol className="space-y-2 text-sm text-gray-400 mb-4">
            <li className="flex gap-2">
              <span className="text-[#10B981] font-bold shrink-0">1.</span>
              Open the email from ClosersAssist
            </li>
            <li className="flex gap-2">
              <span className="text-[#10B981] font-bold shrink-0">2.</span>
              Click <span className="text-white font-medium">“Sign in to ClosersAssist”</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#10B981] font-bold shrink-0">3.</span>
              You'll land directly in your agent setup — no password needed
            </li>
          </ol>

          <p className="text-xs text-gray-600">
            Didn't get it? Check spam or{" "}
            <a
              href={`mailto:thul@closersassist.com?subject=Resend%20magic%20link%20for%20${encodeURIComponent(email || "")}`}
              className="text-[#10B981] hover:underline"
            >
              email us
            </a>
            . We'll resend within minutes.
          </p>
        </div>

        {/* Fallback CTA */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Already have a password?
          <ArrowRight className="w-3 h-3" />
        </Link>

        <p className="text-gray-600 text-xs mt-8">
          Questions?{" "}
          <a
            href="mailto:thul@closersassist.com"
            className="text-[#10B981] hover:underline"
          >
            thul@closersassist.com
          </a>
        </p>
      </div>
    </main>
  );
}
