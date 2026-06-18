'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SassyPage() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat/sassy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch {
      setReply('Try me again! ⚡');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-300">Deal Clozr COO</span>
          </div>
          <h1 className="font-black text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
            Meet <span className="text-cyan-400">Sassy</span>.
            <br />
            Dora closes. Sassy counts.
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-xl mx-auto">
            While Dora handles prospects, Sassy tracks every deal, calculates every commission, and tells you exactly how close you are to the next bonus tier.
          </p>
        </div>
      </section>

      {/* Chat */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="font-bold text-cyan-400">Sassy</h2>
              <p className="text-xs text-zinc-500">Ask me about your deals, commissions, and bonus tiers</p>
            </div>
          </div>
          {reply && (
            <div className="mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
              <p className="text-sm text-zinc-200">{reply}</p>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask()}
              placeholder="How many units do I have this month?"
              className="flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={ask}
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
