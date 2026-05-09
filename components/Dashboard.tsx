import {
  type DashboardData,
  variantStyles,
} from "@/lib/dashboard-types";
import { AlertTriangle, Zap } from "lucide-react";
import FadeIn from "@/components/FadeIn";

function fmtUSD(n: number): string {
  return "$" + Math.abs(n).toLocaleString();
}

export default function Dashboard({ data }: { data: DashboardData }) {
  const progressPct = Math.min(
    (data.progress.current / data.progress.target) * 100,
    100
  );
  const markerPct = data.progress.marker
    ? (data.progress.marker.value / data.progress.target) * 100
    : null;

  return (
    <section className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-[480px] space-y-4 px-4 py-10">
        {/* HEADER */}
        <FadeIn>
          <div className="glass-panel p-4">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-5 w-1.5 rounded-sm bg-deal shadow-[0_0_12px_rgba(16,185,129,0.5)]" aria-hidden />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[1.5px] text-deal-light">
                {data.period}
              </span>
            </div>
            <div className="ml-[14px] text-[13px] text-ash">{data.subtitle}</div>
          </div>
        </FadeIn>

        {/* SUMMARY METRICS GRID (4 cards) */}
        <FadeIn delay={50}>
          <div className="grid grid-cols-2 gap-3">
            {data.metrics.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl p-3.5 ${
                  m.highlight
                    ? "neon-border glass-panel"
                    : "glass-panel"
                }`}
              >
                <div className="mb-1 text-[10px] font-medium uppercase tracking-[1px] text-ash">
                  {m.label}
                </div>
                <div
                  className={`font-mono text-[22px] font-medium md:text-2xl ${
                    m.highlight || m.money
                      ? "glow-text-green"
                      : "text-bone"
                  }`}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* DEALS TABLE */}
        <FadeIn delay={100}>
          <div className="glass-panel p-4">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-neon-green" strokeWidth={2.2} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-green">
                {data.dealsTitle}
              </span>
            </div>
            <div className="grid grid-cols-[1fr_90px_46px_70px] gap-2 border-b border-white/10 pb-2.5 font-mono text-[10px] font-medium uppercase tracking-[1px] text-muted">
              <span>{data.dealColumns.customer}</span>
              <span>{data.dealColumns.type}</span>
              <span className="text-right">{data.dealColumns.middle}</span>
              <span className="text-right">{data.dealColumns.right}</span>
            </div>

            {data.deals.map((d, i) => {
              const middleText = data.formatMiddle
                ? data.formatMiddle(d)
                : d.units != null
                  ? d.units.toString()
                  : "—";
              const rightText = data.formatRight
                ? data.formatRight(d)
                : fmtUSD(d.commission);

              return (
                <div
                  key={d.id}
                  className={`grid grid-cols-[1fr_90px_46px_70px] items-center gap-2 py-2.5 text-[13px] ${
                    i < data.deals.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="text-bone">{d.customer}</span>
                  <span>
                    <span
                      className={`inline-block rounded px-1.5 py-[3px] text-[10px] font-medium ${variantStyles[d.type.variant]}`}
                    >
                      {d.type.label}
                    </span>
                  </span>
                  <span
                    className={`text-right font-mono ${
                      d.units == null ? "text-muted" : "text-ash"
                    }`}
                  >
                    {middleText}
                  </span>
                  <span className="text-right font-mono text-bone">
                    {rightText}
                  </span>
                </div>
              );
            })}

            {data.moreDealsRow && (
              <div className="grid grid-cols-[1fr_90px_46px_70px] items-center gap-2 border-t border-white/10 pt-2.5 text-[13px]">
                <span className="text-bone">{data.moreDealsRow.label}</span>
                <span className="text-[11px] text-muted">Various</span>
                <span className="text-right font-mono text-ash">
                  {data.moreDealsRow.middle}
                </span>
                <span className="text-right font-mono text-bone">
                  {data.moreDealsRow.right}
                </span>
              </div>
            )}
          </div>
        </FadeIn>

        {/* OPTIONAL ALERT CARD (e.g. solar clawback) */}
        {data.alert && (
          <FadeIn delay={120}>
            <div className="glass-panel border-warn/30 bg-warn/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-3.5 w-3.5 text-warn"
                  strokeWidth={2}
                />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-warn">
                  {data.alert.label}
                </span>
              </div>
              <div className="mb-1 text-[13px] text-bone">
                {data.alert.title}
              </div>
              <div className="text-[11px] text-ash">{data.alert.body}</div>
            </div>
          </FadeIn>
        )}

        {/* PROGRESS BAR */}
        <FadeIn delay={150}>
          <div className="neon-border glass-panel p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,255,136,0.6)]" aria-hidden />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-green">
                {data.progress.label}
              </span>
            </div>
            <div
              className="mb-3 text-[14px] text-bone"
              dangerouslySetInnerHTML={{ __html: data.progress.description }}
            />

            <div className="relative mb-3 h-2.5 overflow-hidden rounded-full bg-black/40 border border-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #00FF88, #10B981, #059669)",
                  boxShadow: "0 0 16px rgba(0, 255, 136, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              />
              {markerPct !== null && (
                <div
                  className="absolute -top-0.5 -bottom-0.5 w-[2px] bg-warn shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                  style={{ left: `${markerPct}%` }}
                  aria-hidden
                />
              )}
            </div>

            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted">
                0 {data.progress.unit}
              </span>
              <span className="font-medium text-neon-green">
                {data.progress.current} {data.progress.unit} sold
              </span>
              <span className="text-muted">
                {data.progress.target} {data.progress.unit}
              </span>
            </div>

            {data.progress.caption && (
              <div
                className="mt-3 border-t border-white/5 pt-3 text-[12px] text-ash"
                dangerouslySetInnerHTML={{ __html: data.progress.caption }}
              />
            )}
          </div>
        </FadeIn>

        {/* EARNINGS BREAKDOWN */}
        <FadeIn delay={200}>
          <div className="glass-panel p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(245,158,11,0.5)]" aria-hidden />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-gold-light">
                {data.earningsTitle}
              </span>
            </div>
            {data.earnings.map((line, i) => {
              const amountStr =
                (line.deduction ? "-" : "") + fmtUSD(line.amount);

              if (line.subtotal) {
                return (
                  <div
                    key={i}
                    className="mt-1 flex justify-between border-y border-white/10 py-2.5 text-[13px]"
                  >
                    <span className="font-medium text-bone">{line.label}</span>
                    <span className="font-mono font-medium text-bone">
                      {amountStr}
                    </span>
                  </div>
                );
              }

              if (line.total) {
                return (
                  <div key={i}>
                    <div className="mt-2 flex items-baseline justify-between rounded-lg p-3 pb-3 pt-3 text-[15px] money-card">
                      <span className="font-bold text-pit">{line.label}</span>
                      <span className="font-mono text-lg font-bold text-pit">
                        {amountStr}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className="flex justify-between py-[7px] text-[13px]"
                >
                  <span className="text-ash">{line.label}</span>
                  <span
                    className={`font-mono ${line.deduction ? "text-alert" : "text-bone"}`}
                  >
                    {amountStr}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* NEXT MILESTONES */}
        <FadeIn delay={250}>
          <div className="neon-border-purple glass-panel p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(123,47,255,0.6)]" aria-hidden />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-purple">
                NEXT MILESTONES
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {data.milestones.map((m, i) => (
                <div
                  key={i}
                  className="text-[13px] leading-[1.5] text-bone"
                >
                  <span className="font-medium text-neon-green">{m.leading}</span>
                  {" → "}
                  <span dangerouslySetInnerHTML={{ __html: m.reward }} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
