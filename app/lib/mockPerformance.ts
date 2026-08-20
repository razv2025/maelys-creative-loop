// Fixed synthetic performance layer — loads the checked-in unified dataset
// (data/performance.json) that stands in for Meta insights + GA4 + LTV +
// the A/B test archive, joined on the Creative Genome. Deterministic: every
// demo run sees the same numbers and makes the same, explainable choices.

import dataset from "@/data/performance.json";
import type { AttributeLearning, CreativePerf, CreativeAnalysis, Archetype } from "./types";

export interface ModuleLearning {
  id: string;
  module: string;
  test: string;
  finding: string;
  effect: string;
  appliesTo: string[];
  directive: string;
}

export const DATASET_META = dataset._meta;
export const MODULE_LEARNINGS: ModuleLearning[] = dataset.moduleLearnings;

interface DatasetCreative {
  id: string;
  name: string;
  attributes: { hookType: string; angle: string; format: string; creator: string | null; lpArchetype: string };
  meta: { spend: number; impressions: number; cpm: number; thumbstop: number; ctr: number; cvr: number; cpa: number; roas: number };
  ga4: { engagedScrollPct: number; avgLpDwellSec: number };
  ltv: { d90LtvToCac: number; refundRatePct: number };
  status: string;
}

function toPerf(c: DatasetCreative): CreativePerf {
  return {
    id: c.id,
    name: c.name,
    attributes: { ...c.attributes, lpArchetype: c.attributes.lpArchetype as Archetype },
    spend: c.meta.spend,
    impressions: c.meta.impressions,
    ctr: c.meta.ctr,
    cpm: c.meta.cpm,
    thumbstop: c.meta.thumbstop,
    cvr: c.meta.cvr,
    cpa: c.meta.cpa,
    roas: c.meta.roas,
    status: c.status as CreativePerf["status"],
  };
}

export function fleetPerformance(currentAdName?: string, analysis?: CreativeAnalysis): CreativePerf[] {
  const fleet = (dataset.creatives as DatasetCreative[]).map(toPerf);
  if (analysis && currentAdName) {
    // The just-analyzed ad joins the fleet as a new test cell: its KPIs are
    // projected from the dataset average of creatives sharing its attributes.
    const peers = fleet.filter(
      (c) =>
        c.attributes.hookType === analysis.hook.type ||
        c.attributes.format === analysis.format.style
    );
    const base = peers.length ? peers : fleet;
    const avg = (f: (c: CreativePerf) => number) =>
      +(base.reduce((a, c) => a + f(c), 0) / base.length).toFixed(2);
    fleet.unshift({
      id: "cr-100",
      name: `▶ ${currentAdName} (this ad — projected from ${base.length} attribute peers)`,
      attributes: {
        hookType: analysis.hook.type,
        angle: analysis.angle,
        format: analysis.format.style,
        creator: analysis.format.creatorName,
        lpArchetype: analysis.recommendedArchetype as Archetype,
      },
      spend: 500,
      impressions: Math.round((500 / avg((c) => c.cpm)) * 1000),
      ctr: avg((c) => c.ctr),
      cpm: avg((c) => c.cpm),
      thumbstop: avg((c) => c.thumbstop),
      cvr: avg((c) => c.cvr),
      cpa: avg((c) => c.cpa),
      roas: avg((c) => c.roas),
      status: "testing",
    });
  }
  return fleet;
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
