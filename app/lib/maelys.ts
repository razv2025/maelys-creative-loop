// MAËLYS brand system + funnel facts, extracted from a teardown of the 5 live
// GET-DREAMY landing pages (research/lp-analysis.md). Used to ground prompts
// and to render generated pages in an authentic MAËLYS skin.

export const BRAND = {
  colors: {
    text: "#120d0e",
    ctaBg: "#ffafc4",
    ctaText: "#ffffff",
    sectionPink: "#f4d8e2",
    lightPink: "#FFE0E9",
    palePink: "#FFF5F8",
    sectionBeige: "#f6f3f0",
    beigeLight: "#fbfaf8",
    dark: "#120d0e",
    productAccent: "#57539E",
    productTint: "#eae7ff",
    success: "#218a31",
    gold: "#B8A568",
  },
  logoUrl:
    "https://wown.maelyscosmetics.com/api/assets/maelys-ec/a4aa66ef-ee82-41e3-b579-e3e77411098c/logo-black.svg",
  pressLogos: ["Allure", "InStyle", "Forbes", "Yahoo!", "TODAY", "Fashion Times"],
};

export const OFFER_FACTS = `
MAËLYS core offer — "Try Before You Buy" (TBYB):
- Pay ~$5 shipping today (button framed "TRY BEFORE YOU BUY | $0"), 21-day (3-week) home trial, charged after trial unless returned.
- One-time: "NOW $0 — $54 if you keep it".
- Subscribe & save: "NOW $0 — $43.20 if you keep it" (20% off, ships every 30 days). Perks: 20% off all orders / Cancel or change anytime / 10% cash-back in loyalty points / FREE full-size gift ($35–$62 value).
- Guarantee copy: "Pay only shipping today. Use it at home. If you love it, keep it. If it's not for you, send it back before your trial ends, and you won't be charged the full price."
- Social proof numbers in use: 10,000+ 5-star reviews; 2,000,000+ jars sold; #1 best-seller at Ulta; 250M+ TikTok views; 125,000+ real user videos.
- Clinical stats in use: 90% smoother-looking skin / 83% visibly tighter / 80% improved look of loose skin — footnote "Self-assessment on 30 participants after 56 days. Individual results may vary."
- Product: GET-DREAMY Overnight Toning Body Whip with Milk Thistle + Magnesium (the purple jar). Cross-sells: RE-LURE serum, B-TIGHT mask.
`;

export const VOICE_RULES = `
MAËLYS copy voice rules (follow exactly):
- Warm, empathetic girlfriend-expert tone. Second person ("you", "your skin"). Grade 5–7 reading level.
- Fragment cadence for emphasis: "No complicated routines. No extra effort. No extra time."
- Empowerment, never shame: "You deserve to enjoy your results — not hide the parts that changed along the way."
- Objection-first honesty is on-brand: "Let's be honest, you've tried creams before. They didn't work."
- COMPLIANCE (critical): every efficacy claim must be perceptual/hedged — "tightens THE LOOK OF loose skin", "smooths THE APPEARANCE OF cellulite", "loose-LOOKING skin", "VISIBLY tighter". Never promise physical change (never "removes cellulite", "tightens skin", "fixes loose skin" unqualified). Clinical numbers always get a self-assessment footnote.
- Recurring on-brand phrases: "works while you sleep", "clinically proven", "rich, cloudy whip", "Try Before You Buy", "See the results you want or don't pay!", "real women, real results", "the purple jar", "Consistency is key".
- Risk reversal is the master theme — the trial IS the offer, the guarantee, and the top reason to act.
`;

export const ARCHETYPE_SPECS = `
MAËLYS's proven LP archetypes (choose per ad):
1. "advertorial" — long-form: hero claim → press bar → before/afters → mechanism (5 benefit cards) → clinical stats → offer → emotional "why it works" → reviews → how-to-use → FAQ → guarantee. Best for problem-aware cold traffic from generic or explainer ads. Creator variant: swap H1 to "{Creator} swears by this body whip to…" + hero image only.
2. "advertorial-compact" — offer-first: hero ("Tone the look of saggy skin, or don't pay") → 4 benefits → offer widget → ingredients accordion → clinical stats → reviews → Us-vs-Them → emotional close → FAQ. Best for retargeting / product-aware traffic or ads that already did the persuasion work.
3. "listicle-creator" — "{N} reasons {Creator} swears by this body whip": creator credential card → numbered reasons each embedding a first-person creator quote → clinical stats interleaved → creator testimonial → reviews → product explainer → FAQ → offer. Best for creator/UGC ads — the LP must continue the creator's voice so the hook doesn't decay after the click.
4. "exploratory-story" — NOT in MAËLYS's current set (exploratory test cell): editorial first-person narrative ("I lost 40 lbs. Nobody warned me about this.") that mirrors the ad's story beat-for-beat, then transitions to mechanism → stats → offer. Best for high-emotion story ads where even the listicle feels too "salesy" for the click-through moment.
`;
