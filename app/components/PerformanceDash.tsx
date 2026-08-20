"use client";

import type { AttributeLearning, CreativePerf } from "@/lib/types";

const STATUS_STYLE: Record<CreativePerf["status"], string> = {
  scaling: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  testing: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  fatiguing: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  retired: "bg-white/5 text-[var(--chrome-muted)] border-white/10",
};

export default function PerformanceDash({
  fleet,
  learnings,
}: {
  fleet: CreativePerf[];
  learnings: AttributeLearning[];
}) {
  const maxRoas = Math.max(...fleet.map((c) => c.roas));
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold">Creative fleet — last 14 days</h3>
          <span className="text-[11px] text-[var(--chrome-muted)]">
            Synthetic data · in production: Meta Marketing API insights joined to the creative-attribute taxonomy
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--chrome-border)] text-[10px] uppercase tracking-wider text-[var(--chrome-muted)]">
                <th className="py-2 pr-3">Creative</th>
                <th className="py-2 pr-3">Hook / Format / LP</th>
                <th className="py-2 pr-3 text-right">Spend</th>
                <th className="py-2 pr-3 text-right">CPM</th>
                <th className="py-2 pr-3 text-right">Thumbstop</th>
                <th className="py-2 pr-3 text-right">CTR</th>
                <th className="py-2 pr-3 text-right">CVR</th>
                <th className="py-2 pr-3 text-right">CPA</th>
                <th className="py-2 pr-3 text-right">ROAS</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map((c) => (
                <tr key={c.id} className={`border-b border-[var(--chrome-border)]/50 ${c.id === "cr-100" ? "bg-pink-400/5" : ""}`}>
                  <td className="py-2.5 pr-3 font-medium">{c.name}</td>
                  <td className="py-2.5 pr-3 text-[var(--chrome-muted)]">
                    {c.attributes.hookType} · {c.attributes.format} · {c.attributes.lpArchetype}
                  </td>
                  <td className="py-2.5 pr-3 text-right">${c.spend.toLocaleString()}</td>
                  <td className="py-2.5 pr-3 text-right">${c.cpm}</td>
                  <td className="py-2.5 pr-3 text-right">{c.thumbstop}%</td>
                  <td className="py-2.5 pr-3 text-right">{c.ctr}%</td>
                  <td className="py-2.5 pr-3 text-right">{c.cvr}%</td>
                  <td className="py-2.5 pr-3 text-right">${c.cpa}</td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(c.roas / maxRoas) * 100}%`, background: "var(--m-cta)" }}
                        />
                      </div>
                      <span className="w-9 text-right font-semibold">{c.roas.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">What the engine learned this cycle</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {learnings.map((l) => (
            <div key={l.dimension} className="rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">
                  {l.dimension}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  +{l.liftPct}% ROAS
                </span>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-semibold text-emerald-300">▲ {l.winner}</span>
                <span className="mx-2 text-[var(--chrome-muted)]">beats</span>
                <span className="font-semibold text-red-300/80">▼ {l.loser}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--chrome-muted)]">{l.insight}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[var(--chrome-muted)]">
          These attribute-level learnings are exactly what feeds the next stage: the concept generator is prompted with
          them, so every new brief exploits a measured winner or deliberately explores a gap.
        </p>
      </div>
    </div>
  );
}
