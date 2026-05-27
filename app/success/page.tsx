"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Mail,
  Loader2,
  RefreshCw,
  Send,
  ExternalLink,
  Copy,
} from "lucide-react";

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [accountReady, setAccountReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [magicLink, setMagicLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [provisioningStatus, setProvisioningStatus] = useState<string | null>(null);

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

      if (data.magicLink) {
        setMagicLink(data.magicLink);
      }

      if (data.provisioningStatus) {
        setProvisioningStatus(data.provisioningStatus);
      }

      if (data.accountReady) {
        setAccountReady(true);
        setLoading(false);
        setPolling(false);
      } else if (data.status === "paid" || data.status === "complete") {
        setLoading(false);
        setTimeout(() => checkSession(), 2000);
      } else {
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

  async function handleResendMagicLink() {
    if (!email) return;
    setResending(true);
    try {
      const r = await fetch("/api/auth/resend-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (r.ok) {
        setResent(true);
        if (data.magicLink) {
          setMagicLink(data.magicLink);
        }
      }
    } catch {}
    setResending(false);
  }

  function handleCopyLink() {
    if (magicLink) {
      navigator.clipboard.writeText(magicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  // ── Payment still processing (will auto-retry) ───────────────────────
  if (error && !email && polling) {
    return (
      <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <Loader2 className="w-10 h-10 text-[#10B981] animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Processing your payment
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Stripe is confirming your payment. Almost done.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <Loader2 className="w-3 h-3 animate-spin" />
            Checking automatically...
          </div>
        </div>
      </main>
    );
  }

  // ── Genuine error (no session, network failure) ──────────────────────
  if (error && !email && !polling) {
    return (
      <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-9 h-9 text-[#10B981]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Your payment is processing
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            We're setting everything up. You'll get an email with a login link
            within a minute — no password needed.
          </p>
          <p className="text-xs text-gray-600">
            Questions?{" "}
            <a
              href="mailto:thul@dealclozr.com"
              className="text-[#10B981] hover:underline"
            >
              thul@dealclozr.com
            </a>
          </p>
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
            Spinning up your agent...
          </p>
          <p className="text-sm text-gray-500 mb-6">
            <span className="text-gray-300 font-medium">{email}</span>
          </p>
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-[#10B981] animate-spin" />
            <p className="text-xs text-gray-600">
              Your AI agent is being provisioned. You&apos;ll get a login link
              as soon as it&apos;s ready — usually under 60 seconds.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ── Account ready — show magic link flow ──────────────────────────────
  const isProvisioned = provisioningStatus === "provisioned";

  return (
    <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-9 h-9 text-[#10B981]" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">You&apos;re in!</h1>
        <p className="text-gray-400 text-lg mb-6">
          Your Deal Clozr subscription is active{isProvisioned ? " and your agent is ready" : ". Your agent is being provisioned"}.
        </p>

        {/* Magic link card */}
        <div className="bg-white/[0.03] border border-[#10B981]/20 rounded-xl p-6 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
              {magicLink ? (
                <ExternalLink className="w-5 h-5 text-[#10B981]" />
              ) : (
                <Mail className="w-5 h-5 text-[#10B981]" />
              )}
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                {magicLink ? "Click to get started" : "Check your email"}
              </h2>
              <p className="text-gray-500 text-xs">
                {magicLink
                  ? "Click the button below to set up your agent"
                  : `We sent a login link to:`}
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

          {/* Magic link — show directly when available */}
          {magicLink ? (
            <div className="space-y-3">
              <a
                href={magicLink}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#10B981] px-5 py-3.5 text-sm font-bold text-black hover:bg-[#0ea271] transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                Sign in to Deal Clozr — no password needed
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/[0.15] transition-all"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    Copied link to clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy link instead
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              <ol className="space-y-2 text-sm text-gray-400 mb-4">
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold shrink-0">1.</span>
                  Open the email from Deal Clozr
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold shrink-0">2.</span>
                  Click <span className="text-white font-medium">&ldquo;Sign in to Deal Clozr&rdquo;</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold shrink-0">3.</span>
                  You&apos;ll land directly in your agent setup — no password needed
                </li>
              </ol>

              <div className="border-t border-white/[0.06] pt-4 space-y-3">
                <button
                  onClick={handleResendMagicLink}
                  disabled={resending || resent}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/[0.15] transition-all disabled:opacity-50"
                >
                  {resent ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      Magic link resent — check your inbox
                    </>
                  ) : resending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Didn&apos;t get it? Resend magic link
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600">
                  Check your spam folder if you don&apos;t see it. Still stuck?{" "}
                  <a
                    href={`mailto:thul@dealclozr.com?subject=Magic%20link%20for%20${encodeURIComponent(email || "")}`}
                    className="text-[#10B981] hover:underline"
                  >
                    Email Thul directly
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Already have password? */}
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
            href="mailto:thul@dealclozr.com"
            className="text-[#10B981] hover:underline"
          >
            thul@dealclozr.com
          </a>
        </p>
      </div>
    </main>
  );
}
