"use client";

import { useMemo, useRef, useState } from "react";
import AnalysisCard from "@/components/AnalysisCard";
import LandingPagePreview from "@/components/LandingPagePreview";
import NextIteration from "@/components/NextIteration";
import { computeLearnings, fleetPerformance, DATASET_META, MODULE_LEARNINGS } from "@/lib/mockPerformance";
import type { Archetype, CreativeAnalysis, GenerateLpResponse, NextConcept, SourceType } from "@/lib/types";

const SOURCE_CHIP: Record<SourceType, { bg: string; label: string }> = {
  "ad-analysis": { bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", label: "ad analysis" },
  "maelys-site": { bg: "bg-pink-400/15 text-pink-300 border-pink-400/30", label: "maelys.com" },
  "internal-data": { bg: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30", label: "internal data" },
  competitor: { bg: "bg-amber-500/15 text-amber-300 border-amber-500/30", label: "competitor" },
  operator: { bg: "bg-sky-500/15 text-sky-300 border-sky-500/30", label: "your direction" },
};

function SourceChip({ type, detail }: { type?: SourceType; detail?: string }) {
  if (!type || !SOURCE_CHIP[type]) return null;
  const s = SOURCE_CHIP[type];
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${s.bg}`}>
      {s.label}
      {detail ? ` · ${detail}` : ""}
    </span>
  );
}

const DEMO_ADS = [
  { file: "ugc-review-short.mp4", label: "UGC review — short", meta: "creator ad · 30s" },
  { file: "ugc-review-long.mp4", label: "UGC review — long", meta: "creator ad · 98s" },
  { file: "official-product-explainer.mp4", label: "Product explainer", meta: "brand ad · 139s" },
  { file: "brand-nighttime-ritual.mp4", label: "Nighttime ritual", meta: "brand short · 19s" },
];

const ARCHETYPES: { id: Archetype; label: string; desc: string }[] = [
  { id: "advertorial", label: "Advertorial", desc: "Long-form: claim → proof → mechanism → stats → offer. Cold, problem-aware traffic." },
  { id: "advertorial-compact", label: "Compact / offer-first", desc: "Offer up top, lean persuasion. Retargeting & product-aware traffic." },
  { id: "listicle-creator", label: "Creator listicle", desc: "“5 reasons {creator} swears by…” — continues the creator’s voice." },
  { id: "exploratory-story", label: "Story (exploratory)", desc: "Editorial first-person narrative mirroring the ad. New test cell." },
];

const STEPS = ["Ad Intelligence", "Landing Page", "Next Creative"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  // Stage 1
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CreativeAnalysis | null>(null);
  const [adName, setAdName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Stage 2
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [generatingLp, setGeneratingLp] = useState(false);
  const [lp, setLp] = useState<GenerateLpResponse | null>(null);
  const [mobile, setMobile] = useState(true);
  const [showProv, setShowProv] = useState(true);
  const [direction, setDirection] = useState("");

  // Stage 4
  const [concepts, setConcepts] = useState<NextConcept[] | null>(null);
  const [generatingConcepts, setGeneratingConcepts] = useState(false);

  // The unified internal dataset is a DATA SOURCE for generation — we can't
  // know how the new page performs. Learnings are computed from the fixed
  // historical fleet only.
  const learnings = useMemo(() => computeLearnings(fleetPerformance()), []);

  function goto(s: number) {
    setStep(s);
    setMaxStep((m) => Math.max(m, s));
  }

  async function analyze() {
    setError(null);
    setAnalyzing(true);
    setAnalysis(null);
    try {
      let res: Response;
      if (uploadFile) {
        const fd = new FormData();
        fd.append("file", uploadFile);
        setAdName(uploadFile.name);
        res = await fetch("/api/analyze", { method: "POST", body: fd });
      } else if (selectedDemo) {
        setAdName(DEMO_ADS.find((d) => d.file === selectedDemo)?.label ?? selectedDemo);
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ demo: selectedDemo }),
        });
      } else return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Analysis failed");
      setAnalysis(json.analysis);
      setArchetype(json.analysis.recommendedArchetype);
      setLp(null);
      setConcepts(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setAnalyzing(false);
    }
  }

  async function generateLp() {
    if (!analysis || !archetype) return;
    setError(null);
    setGeneratingLp(true);
    try {
      const res = await fetch("/api/generate-lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, archetype, direction: direction.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Generation failed");
      setLp(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setGeneratingLp(false);
    }
  }

  async function generateConcepts() {
    if (!analysis) return;
    setError(null);
    setGeneratingConcepts(true);
    try {
      const res = await fetch("/api/next-concepts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, learnings }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Generation failed");
      setConcepts(json.concepts);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setGeneratingConcepts(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Creative <span style={{ color: "var(--m-cta)" }}>Loop</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--chrome-muted)]">
              MAËLYS AI acquisition engine — working prototype: ad in → landing page out → learnings → next creative.
            </p>
          </div>
          <span className="rounded-full border border-[var(--chrome-border)] px-3 py-1 text-[11px] text-[var(--chrome-muted)]">
            Head of AI home assignment · Raz Vakil
          </span>
        </div>

        {/* Stepper */}
        <nav className="mt-6 flex flex-wrap gap-2">
          {STEPS.map((s, i) => {
            const enabled = i <= maxStep || (i === 1 && !!analysis) || (i >= 2 && !!lp);
            const active = step === i;
            return (
              <button
                key={s}
                disabled={!enabled}
                onClick={() => goto(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-pink-400/60 bg-pink-400/15 text-pink-200"
                    : enabled
                      ? "border-[var(--chrome-border)] bg-[var(--chrome-panel)] hover:border-pink-400/40"
                      : "cursor-not-allowed border-[var(--chrome-border)] opacity-40"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    active ? "bg-pink-400 text-black" : "bg-white/10"
                  }`}
                >
                  {i + 1}
                </span>
                {s}
              </button>
            );
          })}
        </nav>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>
      )}

      {/* ---- Stage 1: Ad intelligence ---- */}
      {step === 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">1 · Feed the engine a video ad</h2>
            <p className="mt-1 text-sm text-[var(--chrome-muted)]">
              Pick a real MAËLYS-related ad below, or upload any video ad. Gemini watches the full video — audio,
              on-screen text, pacing — and extracts its creative DNA.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_ADS.map((d) => (
              <button
                key={d.file}
                onClick={() => {
                  setSelectedDemo(d.file);
                  setUploadFile(null);
                }}
                onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play().catch(() => {})}
                onMouseLeave={(e) => {
                  const v = e.currentTarget.querySelector("video");
                  if (v) {
                    v.pause();
                    v.currentTime = 0;
                  }
                }}
                className={`overflow-hidden rounded-xl border text-left transition ${
                  selectedDemo === d.file && !uploadFile
                    ? "border-pink-400/70 ring-1 ring-pink-400/40"
                    : "border-[var(--chrome-border)] hover:border-pink-400/40"
                }`}
              >
                <video src={`/demo-ads/${d.file}`} muted loop playsInline preload="metadata" className="aspect-video w-full object-cover" />
                <div className="bg-[var(--chrome-panel)] p-3">
                  <div className="text-xs font-semibold">{d.label}</div>
                  <div className="text-[10px] text-[var(--chrome-muted)]">{d.meta}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInput}
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setUploadFile(f);
                if (f) setSelectedDemo(null);
              }}
            />
            <button
              onClick={() => fileInput.current?.click()}
              className="rounded-lg border border-dashed border-[var(--chrome-border)] px-4 py-2.5 text-xs text-[var(--chrome-muted)] hover:border-pink-400/40"
            >
              {uploadFile ? `📼 ${uploadFile.name}` : "⬆ Or upload any video ad"}
            </button>
            <button
              onClick={analyze}
              disabled={analyzing || (!selectedDemo && !uploadFile)}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-black transition enabled:hover:brightness-110 disabled:opacity-40"
              style={{ background: "var(--m-cta)" }}
            >
              {analyzing ? "Watching the ad…" : "Analyze ad →"}
            </button>
            {analyzing && (
              <span className="pulse-soft text-xs text-[var(--chrome-muted)]">
                Uploading to Gemini → video understanding → structured creative DNA (~30–60s)
              </span>
            )}
          </div>

          {analysis && (
            <>
              <AnalysisCard analysis={analysis} />
              <div className="flex justify-end">
                <button
                  onClick={() => goto(1)}
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold text-black hover:brightness-110"
                  style={{ background: "var(--m-cta)" }}
                >
                  Build the landing page →
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* ---- Stage 2: Landing page ---- */}
      {step === 1 && analysis && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">2 · Generate the hook-matched landing page</h2>
            <p className="mt-1 text-sm text-[var(--chrome-muted)]">
              The page continues the exact ad she clicked — same hook, angle and voice — built on MAËLYS’s proven
              archetypes, real offer mechanics, and compliance-hedged claims.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHETYPES.map((a) => (
              <button
                key={a.id}
                onClick={() => setArchetype(a.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  archetype === a.id
                    ? "border-pink-400/70 bg-pink-400/10"
                    : "border-[var(--chrome-border)] bg-[var(--chrome-panel)] hover:border-pink-400/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{a.label}</span>
                  {analysis.recommendedArchetype === a.id && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                      ENGINE PICK
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--chrome-muted)]">{a.desc}</p>
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="direction" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">
              Creative direction <span className="normal-case font-normal">(optional — added to the generation prompt)</span>
            </label>
            <textarea
              id="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              rows={2}
              maxLength={2000}
              placeholder={'e.g. "Lead with the GLP-1 angle", "warmer, big-sister tone", "emphasize the money-back guarantee, target women 55+"…'}
              className="mt-1.5 w-full resize-y rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-3 text-sm placeholder:text-[var(--chrome-muted)]/60 focus:border-sky-400/50 focus:outline-none"
            />
            <p className="mt-1 text-[10px] text-[var(--chrome-muted)]">
              Your direction is honored for tone and emphasis but can’t override compliance hedging or the real offer
              facts — and it shows up in the provenance panel as <span className="text-sky-300">your direction</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={generateLp}
              disabled={generatingLp || !archetype}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-black transition enabled:hover:brightness-110 disabled:opacity-40"
              style={{ background: "var(--m-cta)" }}
            >
              {generatingLp ? "Writing the page…" : lp ? "Regenerate ↻" : "Generate landing page →"}
            </button>
            {generatingLp && (
              <span className="pulse-soft text-xs text-[var(--chrome-muted)]">
                Grounded in the ad analysis + MAËLYS funnel facts + voice rules (~20–40s)
              </span>
            )}
          </div>

          {lp && (
            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
              <div>
                <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-[var(--chrome-border)] bg-[var(--chrome-panel)] px-4 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-3 rounded bg-black/30 px-2 py-0.5 text-[10px] text-[var(--chrome-muted)]">
                      maelyscosmetics.com/{lp.content.seo.slug}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setShowProv(!showProv)}
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${showProv ? "bg-emerald-500/20 text-emerald-300" : "text-[var(--chrome-muted)]"}`}
                      title="Label every section with the data source that shaped it"
                    >
                      🏷 Provenance {showProv ? "on" : "off"}
                    </button>
                    <button
                      onClick={() => setMobile(true)}
                      className={`rounded px-2 py-0.5 text-[10px] ${mobile ? "bg-pink-400/20 text-pink-200" : "text-[var(--chrome-muted)]"}`}
                    >
                      📱 Mobile
                    </button>
                    <button
                      onClick={() => setMobile(false)}
                      className={`rounded px-2 py-0.5 text-[10px] ${!mobile ? "bg-pink-400/20 text-pink-200" : "text-[var(--chrome-muted)]"}`}
                    >
                      🖥 Desktop
                    </button>
                  </div>
                </div>
                <div className="max-h-[75vh] overflow-y-auto rounded-b-xl border border-[var(--chrome-border)] bg-neutral-300 p-0">
                  <LandingPagePreview content={lp.content} mobile={mobile} showProvenance={showProv} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Hook match</div>
                  <p className="mt-1 text-xs leading-relaxed">{lp.content.hookMatchNote}</p>
                </div>

                {lp.sourcesUsed.length > 0 && (
                  <div className="rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">
                      Data sources used on this page
                    </div>
                    <ul className="mt-2 space-y-2">
                      {lp.sourcesUsed.map((s, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          <SourceChip type={s.type} detail={s.source} />
                          <span className="ml-1.5 text-[var(--chrome-muted)]">{s.usedFor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lp.structureDecisions.length > 0 && (
                  <div className="rounded-xl border border-indigo-400/25 bg-indigo-400/5 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                      Structure decisions — driven by data
                    </div>
                    <ul className="mt-2 space-y-2">
                      {lp.structureDecisions.map((d, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          <SourceChip type={d.sourceType} detail={d.basedOn} />
                          <span className="ml-1.5">{d.decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--chrome-muted)]">
                  Recommendations to beat the current pages
                </div>
                {lp.recommendations.map((r) => (
                  <div key={r.title} className="rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold">{r.title}</span>
                      <span className="shrink-0 rounded-full bg-pink-400/15 px-2 py-0.5 text-[9px] font-bold text-pink-300">
                        {r.expectedImpact}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--chrome-muted)]">{r.detail}</p>
                    {r.sourceType && (
                      <div className="mt-2">
                        <SourceChip type={r.sourceType} detail={r.source} />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => goto(2)}
                  className="w-full rounded-lg px-6 py-2.5 text-sm font-semibold text-black hover:brightness-110"
                  style={{ background: "var(--m-cta)" }}
                >
                  Close the loop: next creative →
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ---- Stage 3: Next creative ---- */}
      {step === 2 && analysis && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">3 · The loop closes: internal data → new creative</h2>
            <p className="mt-1 text-sm text-[var(--chrome-muted)]">
              The new page's own performance is unknown until it runs — so this stage consumes the{" "}
              <em>historical</em> internal data as a source. The concept generator is prompted with attribute-level
              learnings (and competitor angle gaps); each concept states its hypothesis, cites what it exploits, and
              ships with a production-ready Veo prompt — generate a real 8-second AI video teaser right here.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-400/25 bg-indigo-400/5 p-4">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-indigo-300">Inputs consumed by the concept generator</h3>
              <SourceChip type="internal-data" detail="data/performance.json" />
            </div>
            <p className="mb-3 text-[11px] text-[var(--chrome-muted)]">
              Attribute-level learnings computed from the unified historical dataset ({DATASET_META.standsInFor.join(" + ")},
              window {DATASET_META.window}) — plus competitor angle gaps (amber-chipped in the concepts below).
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {learnings.map((l) => (
                <div key={l.dimension} className="rounded-lg bg-black/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">{l.dimension}</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                      +{l.liftPct}% ROAS
                    </span>
                  </div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-300">▲ {l.winner}</span>
                    <span className="mx-1.5 text-[var(--chrome-muted)]">beats</span>
                    <span className="font-semibold text-red-300/80">▼ {l.loser}</span>
                  </div>
                </div>
              ))}
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-[11px] font-semibold text-indigo-300">
                A/B test archive → standing directives (also applied to the landing page in stage 2)
              </summary>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {MODULE_LEARNINGS.map((l) => (
                  <div key={l.id} className="rounded-lg bg-black/20 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">{l.id}</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300">{l.effect}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[var(--chrome-muted)]">{l.finding}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
          {!concepts && (
            <button
              onClick={generateConcepts}
              disabled={generatingConcepts}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-black transition enabled:hover:brightness-110 disabled:opacity-40"
              style={{ background: "var(--m-cta)" }}
            >
              {generatingConcepts ? "Thinking like a creative strategist…" : "Generate 3 next-iteration concepts →"}
            </button>
          )}
          {concepts && <NextIteration concepts={concepts} />}
          {concepts && (
            <p className="text-[11px] text-[var(--chrome-muted)]">
              In production: winning teasers graduate to full 30s creator briefs or extended AI generations, launch via
              the Meta API into a structured test, and their results feed the next cycle. The loop never sleeps —
              fitting, for a brand whose product works while you do.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
