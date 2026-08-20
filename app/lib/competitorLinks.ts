// Client-safe lookup: competitor insight ids → the competitor's live page.
// Data is the scraped competitor-insights.json (canonical copy in
// research/; mirrored into data/ so the client bundle can use it).

import competitorData from "@/data/competitor-insights.json";

export interface CompetitorRef {
  id: string; // insight or competitor id
  brand: string;
  url: string;
  host: string;
}

const refs: CompetitorRef[] = [];
for (const comp of competitorData.competitors) {
  const host = comp.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
  refs.push({ id: comp.id, brand: comp.brand, url: comp.url, host });
  for (const ins of comp.insights) {
    refs.push({ id: ins.id, brand: comp.brand, url: comp.url, host });
  }
}

/** Find competitor references mentioned in a text (e.g. "[truly-beauty-1]"). */
export function competitorRefsIn(text: string | undefined): CompetitorRef[] {
  if (!text) return [];
  const seen = new Map<string, CompetitorRef>();
  for (const r of refs) {
    if (text.includes(r.id)) seen.set(r.url, r);
  }
  return [...seen.values()];
}
