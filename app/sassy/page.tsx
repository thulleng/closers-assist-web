'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SassyPage() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const ask = async (msg?: string) => {
    const text = msg || message;
    if (!text.trim()) return;
    setLoading(true);
    setReply('');
    try {
      const res = await fetch('/api/chat/sassy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch {
      setReply('Try me again! ⚡');
    }
    setLoading(false);
  };

  const quickActions = [
    { label: '💰 My MTD', query: 'What are my MTD numbers?' },
    { label: '🎯 Next Bonus', query: 'How close am I to the next bonus tier?' },
    { label: '📊 This Month', query: 'Summarize my month so far' },
    { label: '🛡️ Build Time', query: 'When is my next build block?' },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28 text-center border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-300">Deal Clozr COO</span>
          </div>
          <h1 className="font-black text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Sassy</span>.
          </h1>
          <p className="mt-3 font-black text-2xl md:text-3xl text-zinc-500">Dora closes. Sassy counts.</p>
          <p className="mt-6 text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            While Dora handles prospects, <strong className="text-cyan-300">Sassy</strong> tracks every deal, calculates every commission, and tells you exactly how close you are to the next bonus tier — before you even ask.
          </p>
        </div>
      </section>

      {/* Chat + Quick Actions */}
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl border border-cyan-500/10 bg-black/60 backdrop-blur p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <div>
              <h2 className="font-bold text-lg text-cyan-400">Sassy</h2>
              <p className="text-xs text-zinc-500">Ask me about deals, commissions, bonus tiers, and life ops</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-600">Live</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => ask(action.query)}
                disabled={loading}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-colors disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Reply */}
          {reply && (
            <div className="mb-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-4">
              <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">{reply}</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mb-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-4">
              <p className="text-sm text-cyan-400 animate-pulse">Sassy is thinking...</p>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask()}
              placeholder="How many units do I have this month?"
              className="flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => ask()}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black hover:bg-cyan-400 disabled:opacity-50 transition-colors"
            >
              {loading ? '...' : 'Ask'}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          <Link href="/" className="text-cyan-500 hover:underline">← Back to Dora</Link>
          {' · '}Built on the floor by Thul Leng · Sun Toyota, Holiday FL
        </p>
      </section>
    </main>
  );
}
