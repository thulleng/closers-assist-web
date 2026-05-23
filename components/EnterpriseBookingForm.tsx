// Replace the booking section with this embedded Calendly-style form

import { useState } from "react";
import { Check } from "lucide-react";

export function EnterpriseBookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      teamSize: (form.elements.namedItem("teamSize") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/enterprise/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError("Network error. Try again or email thul@dealclozr.com.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-[#10B981]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Thanks — you're booked
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Thul will reach out within 24 hours to set up your discovery call.
          No pitch decks. Just a conversation about your team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Smith"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#10B981]/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-gray-400 mb-1.5">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@dealership.com"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#10B981]/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-gray-400 mb-1.5">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Sun Toyota"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#10B981]/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="teamSize" className="block text-sm text-gray-400 mb-1.5">
          Team size
        </label>
        <select
          id="teamSize"
          name="teamSize"
          required
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#10B981]/40 transition-colors appearance-none"
        >
          <option value="" className="bg-[#111]">Select...</option>
          <option value="1-5" className="bg-[#111]">1-5 reps</option>
          <option value="6-15" className="bg-[#111]">6-15 reps</option>
          <option value="16-50" className="bg-[#111]">16-50 reps</option>
          <option value="50+" className="bg-[#111]">50+ reps</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5">
          What's the biggest challenge on your floor right now?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="We're struggling with..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#10B981]/40 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-black font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? "Sending…" : "Request a Call"}
      </button>

      <p className="text-gray-600 text-xs text-center">
        No spam. No auto-sequences. Thul reads every one.
      </p>
    </form>
  );
}
