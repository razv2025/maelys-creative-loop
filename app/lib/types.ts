// Shared types for the Creative Loop prototype.

export type Archetype =
  | "advertorial"
  | "advertorial-compact"
  | "listicle-creator"
  | "exploratory-story"; // exploratory: narrative/editorial style not in MAËLYS's current set

export interface CreativeAnalysis {
  // What the ad says
  transcript: string;
  hook: {
    text: string; // spoken/visual hook in first 3s
    type: string; // e.g. "problem callout", "creator confession", "before/after tease"
    strengthRationale: string;
  };
  angle: string; // core persuasion angle, e.g. "post-weight-loss loose skin"
  promise: string; // the specific outcome the ad promises
  format: {
    style: string; // "UGC talking head" | "product explainer" | "lifestyle montage" ...
    creatorPresent: boolean;
    creatorName: string | null;
    creatorPersona: string | null; // e.g. "relatable woman 45+, post-weight-loss"
    durationSeconds: number;
    visualElements: string[]; // e.g. ["before/after", "product demo", "text overlays"]
  };
  audience: {
    persona: string; // who this ad targets
    ageRange: string;
    painPoints: string[];
    awarenessStage: string; // problem-aware | solution-aware | product-aware
  };
  claims: string[]; // claims made, as stated
  emotionalDrivers: string[]; // e.g. ["confidence", "skepticism relief"]
  objectionsHandled: string[];
  product: {
    name: string;
    category: string;
  };
  complianceFlags: string[]; // unhedged claims that need "the look of" hedging on the LP
  recommendedArchetype: Archetype;
  archetypeRationale: string;
}

// ---- Landing page content (slots the generator fills) ----

export interface OfferBlock {
  headline: string;
  subscribeLabel: string;
  subscribePrice: string;
  subscribePerks: string[];
  oneTimeLabel: string;
  oneTimePrice: string;
  ctaText: string;
  subLine: string;
  guaranteeLine: string;
}

export interface ReviewItem {
  quote: string;
  name: string;
  age?: number;
  tag?: string;
}

export interface StatTile {
  pct: number;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ReasonItem {
  n: string; // "01"
  title: string;
  body: string;
  creatorQuote?: string;
  tag?: string;
}

export interface LandingPageContent {
  archetype: Archetype;
  hookMatchNote: string; // how the page mirrors the ad hook (for the recs panel)
  announcementBar: string;
  hero: {
    eyebrow?: string;
    h1: string;
    subhead: string;
    riskLine: string;
    badges: string[];
    benefitBullets: string[];
    ctaText: string;
  };
  pressBar?: { h2: string; quotes: string[] };
  creatorCard?: { name: string; title: string; tagline: string };
  trustTicker: string[];
  beforeAfter?: {
    h2: string;
    cards: { tags: string[]; quote: string; attribution: string }[];
  };
  mechanism?: {
    eyebrow: string;
    h2: string;
    sub: string;
    cards: { title: string; body: string }[];
  };
  reasons?: ReasonItem[]; // listicle archetype
  clinicalStats: {
    eyebrow: string;
    h2: string;
    stats: StatTile[];
    footnote: string;
  };
  offer: OfferBlock;
  emotionalClose: { h2: string; body: string };
  reviews: { h2: string; items: ReviewItem[] };
  howToUse?: { h2: string; steps: { title: string; body: string }[] };
  faq: { h2: string; items: FaqItem[] };
  guarantee: { h2: string; body: string };
  stickyBar: { text: string; ctaText: string };
  seo: { title: string; slug: string };
}

// ---- Provenance: which data source drove a given choice ----

export type SourceType =
  | "ad-analysis" // the uploaded video, analyzed by Gemini
  | "maelys-site" // scraped maelyscosmetics.com LPs: assets, offer facts, voice
  | "internal-data" // unified performance dataset (Meta+GA4+LTV+A/B)
  | "competitor" // scraped competitor funnels
  | "operator"; // free-text creative direction typed by the user

export interface SourceUse {
  type: SourceType;
  source: string; // e.g. "AB-2026-03", "crepe-erase-2", "ad transcript"
  usedFor: string; // what it influenced on this page
}

export interface StructureDecision {
  decision: string; // e.g. "Clinical stats placed before first offer"
  basedOn: string; // e.g. "AB-2026-07"
  sourceType: SourceType;
}

export interface LpRecommendation {
  title: string;
  detail: string;
  expectedImpact: string; // e.g. "ATC +", "CVR +", "trust"
  sourceType?: SourceType;
  source?: string; // learning id / competitor insight id / "ad analysis"
}

export interface GenerateLpResponse {
  content: LandingPageContent;
  recommendations: LpRecommendation[];
  sourcesUsed: SourceUse[];
  structureDecisions: StructureDecision[];
}

// ---- Mock performance ----

export interface CreativePerf {
  id: string;
  name: string;
  attributes: {
    hookType: string;
    angle: string;
    format: string;
    creator: string | null;
    lpArchetype: Archetype;
  };
  spend: number;
  impressions: number;
  ctr: number; // %
  cpm: number; // $
  thumbstop: number; // % 3s views / impressions
  cvr: number; // %
  cpa: number; // $
  roas: number;
  status: "scaling" | "testing" | "fatiguing" | "retired";
}

export interface AttributeLearning {
  dimension: string; // "Hook type" | "Angle" | "Format" | "LP archetype"
  winner: string;
  loser: string;
  liftPct: number; // ROAS lift of winner vs dimension average
  insight: string;
}

// ---- Next iteration ----

export interface NextConcept {
  id: string;
  title: string;
  hypothesis: string; // grounded in a learning
  hook: string;
  scriptOutline: string[];
  format: string;
  veoPrompt: string; // full text-to-video prompt
  basedOnLearning: string;
}
