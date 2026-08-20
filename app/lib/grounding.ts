// Server-side grounding loader: competitor insights scraped from real
// competitor funnels (research/competitor-insights.json) and module-level
// A/B learnings from the unified internal dataset. Both are injected into
// generation prompts, and the model must cite what it used — that's how the
// UI can prove each data source actually shaped the page.

import fs from "fs";
import path from "path";
import { MODULE_LEARNINGS, type ModuleLearning } from "./mockPerformance";

export interface CompetitorInsight {
  id: string;
  tactic: string;
  detail: string;
  maelysGap: boolean;
}

export interface Competitor {
  id: string;
  brand: string;
  product: string;
  url: string;
  positioning: string;
  offer: string;
  insights: CompetitorInsight[];
}

export interface CompetitorData {
  fetchedAt: string;
  competitors: Competitor[];
  angleGaps: string[];
}

let cached: CompetitorData | null | undefined;

export function loadCompetitorData(): CompetitorData | null {
  if (cached !== undefined) return cached;
  const candidates = [
    path.join(process.cwd(), "..", "research", "competitor-insights.json"),
    path.join(process.cwd(), "research", "competitor-insights.json"),
    path.join(process.cwd(), "data", "competitor-insights.json"),
  ];
  for (const p of candidates) {
    try {
      cached = JSON.parse(fs.readFileSync(p, "utf8")) as CompetitorData;
      return cached;
    } catch {
      /* try next */
    }
  }
  cached = null;
  return null;
}

export function learningsForArchetype(archetype: string): ModuleLearning[] {
  return MODULE_LEARNINGS.filter((l) => l.appliesTo.includes(archetype));
}

export function competitorPromptBlock(): string {
  const data = loadCompetitorData();
  if (!data) return "(no competitor data available)";
  const lines = data.competitors.flatMap((c) =>
    c.insights.map(
      (i) =>
        `- [${i.id}] ${c.brand} (${c.url}): ${i.tactic} — ${i.detail}${i.maelysGap ? " (MAËLYS gap: they do this, MAËLYS's pages don't)" : ""}`
    )
  );
  return `Scraped ${data.fetchedAt} from live competitor funnels:\n${lines.join("\n")}\nAngle gaps across the market: ${data.angleGaps.join(" · ")}`;
}

export function moduleLearningsPromptBlock(archetype: string): string {
  const ls = learningsForArchetype(archetype);
  if (!ls.length) return "(none apply)";
  return ls
    .map((l) => `- [${l.id}] ${l.finding} → directive: ${l.directive} (${l.effect})`)
    .join("\n");
}
