"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          setEmail(data.email || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#050506] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-9 h-9 text-[#10B981]" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">You're in!</h1>
        <p className="text-gray-400 text-lg mb-8">
          Payment confirmed. Your ClosersAssist subscription is now active.
        </p>

        {/* Email confirmation */}
        {!loading && email && (
          <p className="text-sm text-gray-500 mb-8">
            Confirmation sent to{" "}
            <span className="text-gray-300">{email}</span>
          </p>
        )}

        {/* Next steps */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 mb-8 text-left">
          <h2 className="text-white font-semibold mb-3">Next steps</h2>
          <ol className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-3">
              <span className="text-[#10B981] font-bold">1.</span>
              Check your email for login instructions
            </li>
            <li className="flex gap-3">
              <span className="text-[#10B981] font-bold">2.</span>
              Set up your agent with your skills, scripts, and CRM
            </li>
            <li className="flex gap-3">
              <span className="text-[#10B981] font-bold">3.</span>
              Start closing more deals
            </li>
          </ol>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#10B981] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#059669] transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-gray-600 text-xs mt-8">
          Questions? Email{" "}
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
