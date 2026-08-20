import { ARCHETYPE_SPECS, OFFER_FACTS, VOICE_RULES } from "./maelys";
import type { CreativeAnalysis, AttributeLearning } from "./types";

export const ANALYSIS_PROMPT = `
You are the creative-intelligence module of MAËLYS Cosmetics' acquisition engine.
MAËLYS is a DTC body-care brand (clinically tested products like the GET-DREAMY
Overnight Toning Body Whip) acquiring customers via Meta video ads. Analyze the
attached video ad end-to-end: audio, on-screen text, visuals, pacing.

${ARCHETYPE_SPECS}

Return ONLY a JSON object with exactly this shape (no markdown):
{
  "transcript": "verbatim transcript of all spoken words; if none, describe the audio",
  "hook": { "text": "the hook in the first ~3 seconds (spoken or on-screen)", "type": "hook taxonomy label, e.g. 'problem callout' | 'creator confession' | 'result tease' | 'question' | 'pattern interrupt'", "strengthRationale": "1-2 sentences on why this hook does/doesn't stop the scroll" },
  "angle": "the persuasion angle in a short phrase, e.g. 'post-weight-loss loose skin'",
  "promise": "the specific outcome promised to the viewer",
  "format": { "style": "'UGC talking head' | 'product explainer' | 'lifestyle montage' | 'demo' | 'testimonial compilation' | other", "creatorPresent": true/false, "creatorName": "name if identifiable else null", "creatorPersona": "e.g. 'relatable woman 45+, post-weight-loss journey' or null", "durationSeconds": 0, "visualElements": ["before/after", "product texture demo", ...] },
  "audience": { "persona": "who this ad speaks to", "ageRange": "e.g. 35-55", "painPoints": ["..."], "awarenessStage": "'problem-aware' | 'solution-aware' | 'product-aware'" },
  "claims": ["every efficacy claim made, as literally stated"],
  "emotionalDrivers": ["confidence", ...],
  "objectionsHandled": ["objections the ad pre-empts, e.g. 'creams never work'"],
  "product": { "name": "product shown/named", "category": "e.g. body toning cream" },
  "complianceFlags": ["claims stated WITHOUT perceptual hedging ('tightens skin' vs 'tightens the LOOK of skin') that the landing page must hedge"],
  "recommendedArchetype": "'advertorial' | 'advertorial-compact' | 'listicle-creator' | 'exploratory-story'",
  "archetypeRationale": "2-3 sentences: why this archetype best continues this ad's momentum, referencing awareness stage and format"
}
`;

export function lpPrompt(
  analysis: CreativeAnalysis,
  archetype: string,
  moduleLearningsBlock: string,
  competitorBlock: string
): string {
  return `
You are the landing-page generator of MAËLYS Cosmetics' acquisition engine.
A shopper just clicked a Meta video ad. Your job: a landing page that CONTINUES
that exact ad — same hook, same angle, same voice — so the promise she clicked
on is the first thing she sees ("message match"). Everything must be grounded
in MAËLYS's real funnel facts below; never invent prices, stats, or offers.

== THE AD SHE CLICKED (structured analysis) — source type "ad-analysis" ==
${JSON.stringify(analysis, null, 2)}

== MAËLYS FUNNEL FACTS (use these verbatim numbers) — source type "maelys-site", source "offer facts (scraped LPs)" ==
${OFFER_FACTS}

== VOICE — source type "maelys-site" ==
${VOICE_RULES}

== INTERNAL DATA: module-level A/B learnings that apply to this archetype — source type "internal-data", cite by [id] ==
(unified dataset: Meta insights + GA4 + LTV + A/B archive)
${moduleLearningsBlock}
You MUST follow every directive above when structuring the page, and record
each one you applied in "structureDecisions" (cite the [id]).

== COMPETITIVE DATA: scraped competitor funnels — source type "competitor", cite by [id] ==
${competitorBlock}
Use competitor insights ONLY for differentiation and for the recommendations
list (never copy a competitor's claims). When a recommendation is inspired by
a competitor tactic or counters one, cite its [id] as the source.

== TARGET ARCHETYPE: "${archetype}" ==
${ARCHETYPE_SPECS}

Rules:
- The hero H1 must mirror the ad's hook/promise (hedged for compliance). If a creator is present and archetype is "listicle-creator", the creator IS the page: name them in the H1, write 5 first-person quotes in their voice consistent with the ad transcript.
- Fix every complianceFlag: hedge those claims on the page ("the look of", "visibly", "the appearance of").
- Testimonials/reviews: write realistic first-name + age attributions (e.g. "Shelly, 37"), voice-matched to the ad's audience persona and pain points. These are illustrative placeholders for the demo.
- For "exploratory-story": open with a first-person editorial narrative (3-4 short paragraphs) that retells the ad's story, THEN pivot to mechanism → stats → offer.
- reasons: REQUIRED (5 items) when archetype is "listicle-creator", otherwise omit or empty array.
- mechanism + beforeAfter + pressBar + howToUse: include for "advertorial"; keep "advertorial-compact" lean (omit pressBar/beforeAfter, keep mechanism to 4 cards).

Return ONLY a JSON object:
{
  "content": {
    "archetype": "${archetype}",
    "hookMatchNote": "1-2 sentences: exactly how the hero mirrors the ad hook",
    "announcementBar": "...",
    "hero": { "eyebrow": "optional", "h1": "...", "subhead": "...", "riskLine": "...", "badges": ["..."], "benefitBullets": ["...4 items"], "ctaText": "TRY BEFORE YOU BUY | $0" },
    "pressBar": { "h2": "As seen in..", "quotes": ["2 short press-style pull quotes"] },
    "creatorCard": { "name": "", "title": "", "tagline": "" },
    "trustTicker": ["5 short trust chips"],
    "beforeAfter": { "h2": "...", "cards": [ { "tags": ["..."], "quote": "...", "attribution": "Name, Age · Verified Buyer" } ] },
    "mechanism": { "eyebrow": "...", "h2": "...", "sub": "...", "cards": [ { "title": "...", "body": "..." } ] },
    "reasons": [ { "n": "01", "title": "...", "body": "...", "creatorQuote": "...", "tag": "..." } ],
    "clinicalStats": { "eyebrow": "30 WOMEN. 56 DAYS.", "h2": "...", "stats": [ { "pct": 90, "label": "..." }, { "pct": 83, "label": "..." }, { "pct": 80, "label": "..." } ], "footnote": "Self-assessment on 30 participants after 56 days. Individual results may vary." },
    "offer": { "headline": "...", "subscribeLabel": "Try it & subscribe", "subscribePrice": "NOW $0 — $43.20 if you keep it", "subscribePerks": ["..."], "oneTimeLabel": "Try it now", "oneTimePrice": "NOW $0 — $54 if you keep it", "ctaText": "TRY BEFORE YOU BUY | $0", "subLine": "Pay for shipping today and $43.20 after you try it at home.", "guaranteeLine": "See the results you want or don't pay!" },
    "emotionalClose": { "h2": "...", "body": "..." },
    "reviews": { "h2": "...", "items": [ { "quote": "...", "name": "...", "age": 41, "tag": "..." } ] },
    "howToUse": { "h2": "...", "steps": [ { "title": "...", "body": "..." } ] },
    "faq": { "h2": "Any last questions?", "items": [ { "q": "...", "a": "..." } ] },
    "guarantee": { "h2": "...", "body": "..." },
    "stickyBar": { "text": "...", "ctaText": "TRY BEFORE YOU BUY" },
    "seo": { "title": "...", "slug": "get-dreamy-..." }
  },
  "recommendations": [
    { "title": "...", "detail": "why + what to test, referencing this specific ad/page", "expectedImpact": "'ATC lift' | 'CVR lift' | 'trust' | 'AOV lift'", "sourceType": "'ad-analysis' | 'maelys-site' | 'internal-data' | 'competitor'", "source": "the [id] or short name of what inspired this rec" }
  ],
  "structureDecisions": [
    { "decision": "what you did to the page structure/copy", "basedOn": "[id] of the learning/insight that drove it", "sourceType": "'internal-data' | 'competitor' | 'ad-analysis' | 'maelys-site'" }
  ],
  "sourcesUsed": [
    { "type": "'ad-analysis' | 'maelys-site' | 'internal-data' | 'competitor'", "source": "specific id/name", "usedFor": "one line: what it shaped on this page" }
  ]
}
Provide 4-6 recommendations: concrete, testable ideas to beat MAËLYS's current pages for THIS traffic — every one must carry sourceType+source. At least one recommendation must come from a competitor insight [id] and at least one from an internal-data learning [id].
structureDecisions: list EVERY applied internal-data directive plus any structural choice driven by the ad analysis (e.g. "listicle chosen because creator UGC ad").
sourcesUsed: 4-8 entries summarizing every data source consulted for this page.
Reviews: 6 items. FAQ: 4 items (first item MUST answer trial billing per [AB-2026-19]). beforeAfter cards: 3-4. All copy in MAËLYS voice.
`;
}

export function nextConceptsPrompt(
  analysis: CreativeAnalysis,
  learnings: AttributeLearning[],
  competitorBlock = "(no competitor data available)"
): string {
  return `
You are the concept generator of MAËLYS Cosmetics' self-improving acquisition
engine. The loop: ads run → performance is measured per creative ATTRIBUTE
(hook type, angle, format, LP archetype) → learnings steer the next generation
of creative briefs → new ads are produced (human creators or AI video).

== THE CURRENT AD (analyzed) ==
Hook: ${analysis.hook.text} (type: ${analysis.hook.type})
Angle: ${analysis.angle} | Promise: ${analysis.promise}
Format: ${analysis.format.style} | Audience: ${analysis.audience.persona}

== ATTRIBUTE-LEVEL LEARNINGS FROM THE ACCOUNT (this cycle) — source "internal-data" ==
${JSON.stringify(learnings, null, 2)}

== COMPETITIVE DATA: what competitors run — source "competitor", cite by [id] ==
${competitorBlock}

${VOICE_RULES}

Generate 3 NEXT-ITERATION ad concepts. Each must exploit at least one learning
(say which in basedOnLearning — cite internal dimensions and/or competitor [id]s).
Vary the risk profile: #1 = safe iteration on the winner, #2 = new-hook test on
a proven angle, #3 = exploratory swing — prefer an angle from the competitor
angle-gap list for #3, citing it.

Each concept needs a "veoPrompt": a production-ready text-to-video prompt for
Google Veo (8-second vertical 9:16 ad clip). Veo prompt best practices: one
continuous shot or 2 quick cuts max; describe subject, setting, camera, lighting,
mood, and any spoken line in quotes with the speaker described; photorealistic
UGC-style iPhone footage aesthetic unless the concept calls for something else;
end with the product (purple jar of MAËLYS GET-DREAMY body whip) clearly visible.
Compliance: any efficacy language inside the video must be hedged ("the look of").

Return ONLY JSON:
{ "concepts": [ {
  "id": "concept-1",
  "title": "short memorable name",
  "hypothesis": "we believe X because learning Y",
  "hook": "the first-3-seconds hook, verbatim",
  "scriptOutline": ["beat 1", "beat 2", "beat 3", "beat 4"],
  "format": "e.g. UGC talking head, 30s",
  "veoPrompt": "full Veo prompt for the 8s teaser version of this concept",
  "basedOnLearning": "which learning this exploits"
} ] }
`;
}
