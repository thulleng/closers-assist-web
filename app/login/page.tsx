"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard/auto";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-deal/40 bg-deal/5 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deal/15 mx-auto mb-4">
          <Zap className="h-6 w-6 text-deal" fill="currentColor" />
        </div>
        <h2 className="text-xl font-bold text-bone mb-2">Check your email</h2>
        <p className="text-sm text-ash leading-relaxed">
          We sent a magic link to <span className="text-bone font-medium">{email}</span>.
          <br />
          Click it to sign in — no password needed.
        </p>
        <button
          type="button"
          onClick={() => { setSent(false); setEmail(""); }}
          className="mt-6 text-xs text-muted hover:text-ash transition-colors underline underline-offset-2"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-iron bg-slate p-8">
      <h1 className="text-2xl font-bold text-bone mb-1">Sign in to Closers Assist</h1>
      <p className="text-sm text-ash mb-8">
        Enter your email and we&apos;ll send you a magic link — no password needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-ash mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="email"
            placeholder="you@dealership.com"
            className="w-full rounded-xl border border-iron bg-pit px-4 py-3 text-sm text-bone placeholder:text-muted focus:border-deal/60 focus:outline-none transition-colors"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-loud w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending link..." : "Send magic link →"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-deal">
            <Zap className="h-5 w-5 text-pit" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-bone">
            Closers Assist
          </span>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-iron bg-slate p-8 animate-pulse h-64" />
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-muted">
          By signing in you agree to our{" "}
          <a href="/terms" className="underline hover:text-ash transition-colors">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-ash transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
