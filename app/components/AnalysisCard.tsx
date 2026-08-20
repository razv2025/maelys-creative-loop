"use client";

import type { CreativeAnalysis } from "@/lib/types";

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "accent" }) {
  const styles =
    tone === "warn"
      ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
      : tone === "accent"
        ? "bg-pink-400/15 text-pink-300 border-pink-400/30"
        : "bg-white/5 text-[var(--chrome-text)] border-white/10";
  return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs ${styles}`}>{children}</span>;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">{title}</div>
      {children}
    </div>
  );
}

export default function AnalysisCard({ analysis }: { analysis: CreativeAnalysis }) {
  const a = analysis;
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Block title="Hook (first 3 seconds)">
        <p className="text-sm italic">“{a.hook.text}”</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip tone="accent">{a.hook.type}</Chip>
          <Chip>{a.format.style}</Chip>
          <Chip>{Math.round(a.format.durationSeconds)}s</Chip>
        </div>
        <p className="mt-2 text-xs text-[var(--chrome-muted)]">{a.hook.strengthRationale}</p>
      </Block>

      <Block title="Angle & Promise">
        <p className="text-sm font-medium">{a.angle}</p>
        <p className="mt-1 text-xs text-[var(--chrome-muted)]">{a.promise}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {a.emotionalDrivers.map((d) => (
            <Chip key={d}>{d}</Chip>
          ))}
        </div>
      </Block>

      <Block title="Audience">
        <p className="text-sm">{a.audience.persona}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip>{a.audience.ageRange}</Chip>
          <Chip tone="accent">{a.audience.awarenessStage}</Chip>
        </div>
        <ul className="mt-2 space-y-1 text-xs text-[var(--chrome-muted)]">
          {a.audience.painPoints.slice(0, 4).map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
      </Block>

      <Block title="Claims made in the ad">
        <ul className="space-y-1 text-xs">
          {a.claims.slice(0, 6).map((cl) => (
            <li key={cl}>• {cl}</li>
          ))}
        </ul>
      </Block>

      <Block title="Compliance flags → LP must hedge">
        {a.complianceFlags.length === 0 ? (
          <p className="text-xs text-[var(--chrome-muted)]">No unhedged claims detected.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {a.complianceFlags.map((f) => (
              <Chip key={f} tone="warn">
                ⚠ {f}
              </Chip>
            ))}
          </div>
        )}
        <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">
          Objections handled
        </div>
        <ul className="mt-1 space-y-1 text-xs">
          {a.objectionsHandled.slice(0, 3).map((o) => (
            <li key={o}>• {o}</li>
          ))}
        </ul>
      </Block>

      <Block title="Creator & product">
        <p className="text-sm">
          {a.format.creatorPresent ? (a.format.creatorName ?? "Unnamed creator") : "No creator (brand asset)"}
        </p>
        {a.format.creatorPersona && <p className="mt-1 text-xs text-[var(--chrome-muted)]">{a.format.creatorPersona}</p>}
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip>{a.product.name}</Chip>
          {a.format.visualElements.slice(0, 4).map((v) => (
            <Chip key={v}>{v}</Chip>
          ))}
        </div>
      </Block>

      <div className="lg:col-span-3 rounded-xl border border-pink-400/25 bg-pink-400/5 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-300">
          Recommended LP archetype: {a.recommendedArchetype}
        </div>
        <p className="mt-1 text-sm text-[var(--chrome-text)]">{a.archetypeRationale}</p>
      </div>
    </div>
  );
}
