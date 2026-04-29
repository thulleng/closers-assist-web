"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap } from "lucide-react";

const INPUT_CLS =
  "w-full rounded-xl border border-iron bg-pit px-4 py-3 text-sm text-bone placeholder:text-muted focus:border-deal/60 focus:outline-none transition-colors";
const LABEL_CLS =
  "block text-xs font-medium text-ash mb-1.5 uppercase tracking-wider";

function friendlyError(msg: string): string {
  if (msg.includes("Invalid login credentials"))
    return "Wrong email or password. Double-check and try again.";
  if (msg.includes("Email not confirmed"))
    return "Please confirm your email first — check your inbox for a verification link.";
  if (msg.includes("User already registered"))
    return "An account with this email already exists. Sign in instead.";
  if (msg.includes("Password should be"))
    return "Password must be at least 6 characters.";
  if (msg.includes("rate limit") || msg.includes("too many"))
    return "Too many attempts. Please wait a minute and try again.";
  return msg;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get("next") ?? "/dashboard/auto";

  // "password" | "signup" | "magic"
  const [mode, setMode] = useState<"password" | "signup" | "magic">("password");

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [success, setSuccess]   = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);

  function switchMode(m: "password" | "signup" | "magic") {
    setMode(m);
    setError(null);
    setSuccess(null);
    setSent(false);
  }

  // ── Email + password sign-in ─────────────────────────────────────────────
  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(friendlyError(error.message));
    } else {
      router.push(next);
    }

    setLoading(false);
  }

  // ── Sign up ──────────────────────────────────────────────────────────────
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(friendlyError(error.message));
    } else if (data.session) {
      // Email confirmation is disabled in Supabase dashboard — session is live immediately
      router.push("/onboarding");
    } else {
      // Confirmation still enabled — prompt user to check email
      setSuccess("Account created! Check your email to confirm, then come back to sign in.");
    }

    setLoading(false);
  }

  // ── Magic link ───────────────────────────────────────────────────────────
  async function handleMagicLink(e: React.FormEvent) {
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
      setError(friendlyError(error.message));
    } else {
      setSent(true);
    }

    setLoading(false);
  }

  // ── Magic link sent confirmation ─────────────────────────────────────────
  if (sent) {
    return (
      <div className="rounded-2xl border border-deal/40 bg-deal/5 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deal/15 mx-auto mb-4">
          <Zap className="h-6 w-6 text-deal" fill="currentColor" />
        </div>
        <h2 className="text-xl font-bold text-bone mb-2">Check your email</h2>
        <p className="text-sm text-ash leading-relaxed">
          We sent a magic link to{" "}
          <span className="text-bone font-medium">{email}</span>.
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

  const isPasswordMode = mode === "password";
  const isSignUpMode   = mode === "signup";
  const isMagicMode    = mode === "magic";

  return (
    <div className="rounded-2xl border border-iron bg-slate p-8">

      {/* ── Mode toggle: Sign In / Sign Up ── */}
      {!isMagicMode && (
        <div className="flex rounded-xl border border-iron bg-pit p-1 mb-7">
          <button
            type="button"
            onClick={() => switchMode("password")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              isPasswordMode
                ? "bg-deal text-pit"
                : "text-ash hover:text-bone"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              isSignUpMode
                ? "bg-deal text-pit"
                : "text-ash hover:text-bone"
            }`}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* ── Magic link header ── */}
      {isMagicMode && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-bone mb-1">Sign in with email link</h1>
          <p className="text-sm text-ash">
            We&apos;ll send a magic link — no password needed.
          </p>
        </div>
      )}

      {/* ── Sign up success banner ── */}
      {success && (
        <div className="rounded-xl border border-deal/30 bg-deal/10 px-4 py-3 text-sm text-deal mb-5">
          {success}
        </div>
      )}

      {/* ── Error banner ── */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 mb-5">
          {error}
        </div>
      )}

      {/* ── Password sign-in form ── */}
      {isPasswordMode && (
        <form onSubmit={handlePasswordSignIn} className="space-y-4">
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="you@dealership.com"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={LABEL_CLS} style={{ marginBottom: 0 }}>Password</label>
              <button
                type="button"
                className="text-xs text-muted hover:text-ash transition-colors underline underline-offset-2"
                onClick={() => alert("Password reset coming soon — use magic link for now.")}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={INPUT_CLS}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-loud w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>
      )}

      {/* ── Sign-up form ── */}
      {isSignUpMode && (
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="you@dealership.com"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="At least 6 characters"
              className={INPUT_CLS}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-loud w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </form>
      )}

      {/* ── Magic link form ── */}
      {isMagicMode && (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="you@dealership.com"
              className={INPUT_CLS}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-loud w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending link..." : "Send magic link →"}
          </button>
        </form>
      )}

      {/* ── Divider + secondary option ── */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-iron" />
        <span className="text-xs text-muted">or</span>
        <div className="flex-1 h-px bg-iron" />
      </div>

      {isMagicMode ? (
        <button
          type="button"
          onClick={() => switchMode("password")}
          className="mt-4 w-full rounded-xl border border-iron bg-pit px-4 py-3 text-sm text-ash hover:text-bone hover:border-iron/80 transition-colors font-medium"
        >
          Sign in with password instead
        </button>
      ) : (
        <button
          type="button"
          onClick={() => switchMode("magic")}
          className="mt-4 w-full rounded-xl border border-iron bg-pit px-4 py-3 text-sm text-ash hover:text-bone hover:border-iron/80 transition-colors font-medium"
        >
          Or sign in with email link
        </button>
      )}
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
