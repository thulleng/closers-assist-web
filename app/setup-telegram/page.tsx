"use client";

import Link from "next/link";
import {
  ArrowRight, MessageCircle, UserPlus, Key, Copy, Check, ExternalLink,
  Smartphone, Zap, Bot, Loader2, Shield,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all font-mono";

export default function SetupTelegramPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    bot_username?: string;
    bot_name?: string;
    already_setup?: boolean;
    error?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tokenInput.trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/telegram/register-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bot_token: trimmed }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,136,204,0.12), transparent 70%)" }} />

        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <FadeIn>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/20 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Step-by-Step
              </span>
            </div>

            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
              Your bot.
              <br />
              <span className="text-shine font-black">Your agent. Your name.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
              Create your own Telegram bot, name it whatever you want, and connect it
              to your Deal Clozr agent. Takes <strong className="text-white">2 minutes</strong>.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
              <Smartphone className="h-4 w-4" />
              Works on phone, tablet, desktop
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 py-20">
          {/* Video walkthrough — responsive embed */}
          <FadeIn>
            <div className="mb-12">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/20 px-3.5 py-1.5 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                    Watch First
                  </span>
                </span>
              </div>
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {/* Mobile video (portrait) — shown on mobile */}
                <video
                  className="block sm:hidden w-full h-auto"
                  src="https://dealclozr.com/videos/botfather-setup-mobile.mp4"
                  poster=""
                  controls
                  preload="metadata"
                  playsInline
                >
                  Your browser doesn't support video.
                </video>
                {/* Desktop video (landscape) — shown on tablet+ */}
                <video
                  className="hidden sm:block w-full h-auto"
                  src="https://dealclozr.com/videos/botfather-setup-desktop.mp4"
                  poster=""
                  controls
                  preload="metadata"
                  playsInline
                >
                  Your browser doesn't support video.
                </video>
              </div>
              <p className="mt-3 text-center text-xs text-muted">
                🎧 Sound on. 90 seconds — no coding needed.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {/* Step 1 */}
            <FadeIn>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-deal to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-2 h-full w-px bg-gradient-to-b from-deal/40 to-transparent" />
                </div>
                <div className="min-w-0 pb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-deal/20 text-[10px] font-bold text-deal">1</span>
                    <h2 className="text-lg font-bold text-white">Open Telegram</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-ash">
                    If you don&rsquo;t have it yet, download Telegram first &mdash; it&rsquo;s free and takes 30 seconds.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://t.me/botfather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-loud inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open @BotFather
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── BOTFATHER CHEAT SHEET ── */}
            <FadeIn>
              <div className="ml-14 mb-8 rounded-xl border border-deal/20 bg-deal/5 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-deal mb-3">
                  📋 Read This Before You Talk to BotFather
                </p>
                <div className="space-y-3 text-sm text-ash">
                  <div className="flex gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">①</span>
                    <div>
                      <p className="font-semibold text-white">Tap Start</p>
                      <p>When BotFather opens, tap the blue <strong>START</strong> button at the bottom of your screen.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">②</span>
                    <div>
                      <p className="font-semibold text-white">Type this exactly: <code className="rounded bg-white/10 px-1.5 py-0.5 text-deal-light font-mono text-xs">/newbot</code></p>
                      <p>Then tap send. Don't worry about the list of commands — just type <code className="rounded bg-white/10 px-1.5 py-0.5 text-deal-light font-mono text-xs">/newbot</code>.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">③</span>
                    <div>
                      <p className="font-semibold text-white">Give it a name</p>
                      <p>BotFather will ask: <em>"Alright, a new bot. How are we going to call it? Please choose a name for your bot."</em></p>
                      <p className="mt-1">Type whatever name you want — like <strong>Maya</strong>, <strong>Ace</strong>, <strong>Coach</strong>, or <strong>Jake</strong>. This is what people see when they chat with it.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">④</span>
                    <div>
                      <p className="font-semibold text-white">Give it a username (ends in <code className="rounded bg-white/10 px-1.5 py-0.5 text-deal-light font-mono text-xs">_bot</code>)</p>
                      <p>BotFather will ask: <em>"Good. Now let's choose a username for your bot. It must end in 'bot'. Like 'TetrisBot' or 'tetris_bot'."</em></p>
                      <p className="mt-1">Type something unique like <strong>YourNameAgentBot</strong> or <strong>YourNameCloserBot</strong>. If it says "Sorry, this username is already taken," just add a number like <strong>YourNameBot123</strong>.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">⑤</span>
                    <div>
                      <p className="font-semibold text-white">Copy the token</p>
                      <p>BotFather will reply with a long message. Look for <strong>"Use this token to access the HTTP API:"</strong> — the line right under it is your token. It looks like:</p>
                      <p className="mt-1 font-mono text-xs text-deal-light bg-white/5 rounded-lg px-3 py-2 inline-block">1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-ABC123</p>
                      <p className="mt-1">Tap the token to copy it, then paste it in the box below.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-deal to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-2 h-full w-px bg-gradient-to-b from-deal/40 to-transparent" />
                </div>
                <div className="min-w-0 pb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-deal/20 text-[10px] font-bold text-deal">2</span>
                    <h2 className="text-lg font-bold text-white">Name Your Bot</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-ash">
                    Pick a name that feels like YOUR agent — something you&rsquo;d actually message throughout the day. <strong>Maya</strong>, <strong>Ace</strong>, <strong>Coach</strong>, <strong>Jake</strong> — whatever fits.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-deal to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-2 h-8 w-px bg-gradient-to-b from-deal/40 to-transparent" />
                </div>
                <div className="min-w-0 pb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-deal/20 text-[10px] font-bold text-deal">3</span>
                    <h2 className="text-lg font-bold text-white">Paste Your Token</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-ash">
                    BotFather will send you an HTTP API token. It looks like a long string of letters and numbers. Tap to copy it, then paste it below.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TOKEN FORM ── */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5" id="paste-token">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 py-16">
          <FadeIn>
            <div className="loud-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-deal to-emerald-400">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Connect Now</div>
                  <div className="text-xs text-ash">Paste your bot token below. It stays encrypted.</div>
                </div>
              </div>

              {result?.ok ? (
                <div className="text-center py-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-deal/20">
                    <Check className="h-8 w-8 text-deal" strokeWidth={3} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {result.already_setup ? "Already Connected!" : "Connected!"}
                  </h3>
                  <p className="text-sm text-ash mb-2">
                    Your bot <span className="font-mono text-deal-light">{result.bot_username}</span> is now linked to your agent.
                  </p>
                  <p className="text-xs text-muted mb-6">
                    Open Telegram and message your bot. Your agent will reply.
                  </p>
                  <a
                    href={`https://t.me/${result.bot_username?.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-loud inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Message @{result.bot_username?.replace("@", "")}
                  </a>
                  <p className="mt-4">
                    <Link
                      href="/dashboard"
                      className="text-xs text-deal hover:underline"
                    >
                      Go to dashboard →
                    </Link>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder="Paste your token here..."
                        className={inputCls}
                        disabled={loading}
                        autoComplete="off"
                      />
                    </div>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                      <p className="text-xs text-amber-400 font-semibold mb-1">Keep this private:</p>
                      <p className="text-xs text-muted">Your bot token is like a password. Only paste it here on Deal Clozr &mdash; never share it publicly.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !tokenInput.trim()}
                      className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:opacity-50"
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Connecting...</>
                      ) : (
                        <><Zap className="h-4 w-4" /> Connect Bot to My Agent</>
                      )}
                    </button>
                  </div>

                  {result?.error && (
                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {result.error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 py-16">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl font-black text-white">
                Why your own bot?
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 loud-card rounded-xl p-4">
                <Check className="mt-0.5 h-4 w-4 text-deal shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">You own it</p>
                  <p className="text-xs text-ash">It&rsquo;s your bot with your name on it. Not a generic shared account.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 loud-card rounded-xl p-4">
                <Check className="mt-0.5 h-4 w-4 text-deal shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">Personal to you</p>
                  <p className="text-xs text-ash">Name it something natural. You&rsquo;ll message it every day.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 loud-card rounded-xl p-4">
                <Check className="mt-0.5 h-4 w-4 text-deal shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">Instant setup</p>
                  <p className="text-xs text-ash">Paste your token, we wire it up. Open Telegram and go.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 py-16 text-center">
          <FadeIn>
            <h2 className="font-display text-2xl font-black text-white mb-2">
              Not ready yet?
            </h2>
            <p className="text-sm text-ash mb-6">
              Try the shared demo bot first &mdash; no setup needed.
            </p>
            <Link
              href="/telegram"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-ash hover:text-white hover:border-white/20 transition-all"
            >
              View Telegram Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
