// Deterministic synthetic Meta performance data for the demo dashboard.
// In production this is the ingestion layer: Meta Marketing API insights joined
// to the creative-attribute taxonomy produced at analysis time.

import type { AttributeLearning, CreativePerf, CreativeAnalysis, Archetype } from "./types";

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FLEET: Omit<CreativePerf, "spend" | "impressions" | "ctr" | "cpm" | "thumbstop" | "cvr" | "cpa" | "roas" | "status">[] = [
  { id: "cr-101", name: "Caroline confession — loose skin", attributes: { hookType: "creator confession", angle: "post-weight-loss loose skin", format: "UGC talking head", creator: "Caroline B.", lpArchetype: "listicle-creator" } },
  { id: "cr-102", name: "GLP-1 callout — static→whip demo", attributes: { hookType: "problem callout", angle: "GLP-1 loose skin", format: "demo", creator: null, lpArchetype: "advertorial" } },
  { id: "cr-103", name: "Before/after tease — 30 days", attributes: { hookType: "result tease", angle: "post-weight-loss loose skin", format: "testimonial compilation", creator: null, lpArchetype: "advertorial" } },
  { id: "cr-104", name: "Product explainer — clinical", attributes: { hookType: "question", angle: "cellulite appearance", format: "product explainer", creator: null, lpArchetype: "advertorial-compact" } },
  { id: "cr-105", name: "Nighttime ritual — ASMR", attributes: { hookType: "pattern interrupt", angle: "works while you sleep", format: "lifestyle montage", creator: null, lpArchetype: "advertorial-compact" } },
  { id: "cr-106", name: "Skeptic converts — 'nothing works'", attributes: { hookType: "creator confession", angle: "skepticism relief", format: "UGC talking head", creator: "Dana R.", lpArchetype: "listicle-creator" } },
];

// Attribute biases: what the synthetic account has "learned".
const HOOK_BIAS: Record<string, number> = { "creator confession": 1.35, "problem callout": 1.1, "result tease": 1.0, question: 0.8, "pattern interrupt": 0.75 };
const FORMAT_BIAS: Record<string, number> = { "UGC talking head": 1.3, demo: 1.1, "testimonial compilation": 1.0, "product explainer": 0.8, "lifestyle montage": 0.75 };
const LP_BIAS: Record<string, number> = { "listicle-creator": 1.25, advertorial: 1.05, "advertorial-compact": 0.85, "exploratory-story": 1.0 };

export function fleetPerformance(currentAdName?: string, analysis?: CreativeAnalysis): CreativePerf[] {
  const fleet = [...FLEET];
  if (analysis && currentAdName) {
    fleet.unshift({
      id: "cr-100",
      name: `▶ ${currentAdName} (this ad)`,
      attributes: {
        hookType: analysis.hook.type,
        angle: analysis.angle,
        format: analysis.format.style,
        creator: analysis.format.creatorName,
        lpArchetype: analysis.recommendedArchetype as Archetype,
      },
    });
  }
  return fleet.map((c) => {
    const r = rng(hashStr(c.id + c.name));
    const bias =
      (HOOK_BIAS[c.attributes.hookType] ?? 1) *
      (FORMAT_BIAS[c.attributes.format] ?? 1) *
      (LP_BIAS[c.attributes.lpArchetype] ?? 1);
    const spend = Math.round(2000 + r() * 28000);
    const cpm = +(9 + r() * 8).toFixed(2);
    const impressions = Math.round((spend / cpm) * 1000);
    const thumbstop = +(18 + r() * 14 * bias).toFixed(1);
    const ctr = +((0.9 + r() * 1.4) * bias).toFixed(2);
    const cvr = +((2.2 + r() * 2.2) * bias).toFixed(2);
    const clicks = impressions * (ctr / 100);
    const purchases = Math.max(1, Math.round(clicks * (cvr / 100)));
    const cpa = +(spend / purchases).toFixed(2);
    const aov = 62;
    const roas = +((purchases * aov) / spend).toFixed(2);
    const status: CreativePerf["status"] =
      roas >= 1.6 ? "scaling" : roas >= 1.1 ? "testing" : roas >= 0.8 ? "fatiguing" : "retired";
    return { ...c, spend, impressions, ctr, cpm, thumbstop, cvr, cpa, roas, status };
  });
}

export function computeLearnings(fleet: CreativePerf[]): AttributeLearning[] {
  const dims: { dimension: string; get: (c: CreativePerf) => string }[] = [
    { dimension: "Hook type", get: (c) => c.attributes.hookType },
    { dimension: "Format", get: (c) => c.attributes.format },
    { dimension: "Angle", get: (c) => c.attributes.angle },
    { dimension: "LP archetype", get: (c) => c.attributes.lpArchetype },
  ];
  const overall = avg(fleet.map((c) => c.roas));
  return dims.map(({ dimension, get }) => {
    const groups = new Map<string, number[]>();
    fleet.forEach((c) => {
      const k = get(c);
      groups.set(k, [...(groups.get(k) ?? []), c.roas]);
    });
    const ranked = [...groups.entries()]
      .map(([k, v]) => ({ k, roas: avg(v) }))
      .sort((a, b) => b.roas - a.roas);
    const winner = ranked[0];
    const loser = ranked[ranked.length - 1];
    const liftPct = Math.round(((winner.roas - overall) / overall) * 100);
    return {
      dimension,
      winner: winner.k,
      loser: loser.k,
      liftPct,
      insight: `${winner.k} averages ${winner.roas.toFixed(2)} ROAS vs ${overall.toFixed(2)} account average (${liftPct >= 0 ? "+" : ""}${liftPct}%); ${loser.k} underperforms at ${loser.roas.toFixed(2)}.`,
    };
  });
}

function avg(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);
}
