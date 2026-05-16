import { Shield, CreditCard, Clock, Lock } from "lucide-react";
import Link from "next/link";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  sub: string;
}

const items: TrustItem[] = [
  {
    icon: <Lock className="h-4 w-4" strokeWidth={2.5} />,
    title: "Your data stays yours",
    sub: "No training on your deals",
  },
  {
    icon: <Clock className="h-4 w-4" strokeWidth={2.5} />,
    title: "14-day free trial",
    sub: "Cancel in 1 click. No contracts.",
  },
  {
    icon: <CreditCard className="h-4 w-4" strokeWidth={2.5} />,
    title: "No credit card required",
    sub: "Start closing. Decide later.",
  },
  {
    icon: <Shield className="h-4 w-4" strokeWidth={2.5} />,
    title: "Month-to-month",
    sub: "No long-term lock-in. Ever.",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur">
      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 text-deal-light">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">
                  {item.title}
                </div>
                <div className="text-[11px] text-muted">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link
            href="/privacy"
            className="text-[11px] text-muted underline underline-offset-2 hover:text-ash transition-colors"
          >
            Read our privacy policy →
          </Link>
        </div>
      </div>
    </section>
  );
}
