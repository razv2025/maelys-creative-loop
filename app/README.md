# Creative Loop — MAËLYS AI Acquisition Engine (prototype)

**Head of AI home assignment, Part 2 — Raz Vakil**

A working prototype of the closed creative loop: a Meta video ad goes in, a
hook-matched MAËLYS landing page comes out, performance learnings are computed
per creative attribute, and those learnings generate the next ad — including a
real AI-generated video teaser (Google Veo).

```
┌─────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│ 1. VIDEO AD │ → │ 2. LANDING PAGE  │ → │ 3. PERFORMANCE   │ → │ 4. NEXT CREATIVE │
│  Gemini     │   │  hook-matched,   │   │  attribute-level │   │  concepts + Veo  │
│  video      │   │  MAËLYS arche-   │   │  learnings       │   │  8s teaser       │──┐
│  analysis   │   │  types + voice   │   │  (synthetic)     │   │                  │  │
└─────────────┘   └──────────────────┘   └──────────────────┘   └─────────────────┘  │
      ▲                                                                              │
      └──────────────────────────── the loop closes ─────────────────────────────────┘
```

## Run it

```bash
cd app
npm install
echo "GOOGLE_API_KEY=<your key>" > .env.local   # Gemini + Veo (Veo needs a paid key)
npm run dev
# open http://localhost:3000
```

Four real ad videos ship in `public/demo-ads/` (MAËLYS official + UGC-style
reviews of GET-DREAMY, pulled from YouTube), or upload any video ad.

## What each stage does

**1 · Ad Intelligence** (`/api/analyze`) — the video is uploaded to the Gemini
Files API and watched natively (audio, on-screen text, pacing). Output is a
structured **creative DNA** record: hook (text + taxonomy type), angle, promise,
format, audience persona and awareness stage, claims, emotional drivers,
objections handled, **compliance flags** (unhedged efficacy claims the LP must
hedge), and a recommended LP archetype. This taxonomy is the backbone of the
whole engine — it's what performance is later measured *against*.

**2 · Landing Page** (`/api/generate-lp`) — generation is grounded in a
teardown of MAËLYS's five live GET-DREAMY landing pages
(`../research/lp-analysis.md`): their four proven archetypes (long advertorial,
compact offer-first, creator listicle, quiz) plus one exploratory archetype
(editorial story). The prompt carries MAËLYS's real offer mechanics (Try Before
You Buy, $43.20/$54 ladder, guarantee copy), voice rules (grade 5–7,
fragment cadence, mandatory "the look of" claim hedging), and real social-proof
numbers — the model fills content slots, it never invents funnel facts. The
page renders in an authentic MAËLYS skin (brand tokens extracted from their
live CSS) with a recommendations panel of testable ideas to beat the current
pages.

**3 · Performance** — synthetic Meta KPIs (CPM, thumbstop, CTR, CVR, CPA, ROAS)
for a fleet of creatives, each tagged with its attribute taxonomy. Learnings
are computed per **attribute** (hook type, format, angle, LP archetype), not
per ad — the core mechanism that makes the loop self-improving rather than
merely self-measuring. In production this layer is the Meta Marketing API +
GA4 + LTV join described in the Part 1 deck.

**4 · Next Creative** (`/api/next-concepts`, `/api/generate-video`) — the
concept generator is prompted with the measured learnings and returns three
briefs with explicit hypotheses at three risk levels (safe iteration, new-hook
test, exploratory swing). Each ships with a production-ready Veo prompt;
one click generates a real 8-second 9:16 video teaser via Veo.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind 4 · `@google/genai`
(Gemini `gemini-flash-latest` for analysis/copy, Veo `veo-3.0-fast-generate-001`
for video — both overridable via env).

## Honest prototype shortcuts

- Performance data is synthetic (deterministic, seeded) — the join described
  above is design, not implementation.
- LP imagery is placeholder blocks; production pulls from the brand DAM.
- Testimonials on generated pages are illustrative placeholders, clearly
  voice-matched but not real customers — a production system would slot in
  Yotpo reviews filtered by the ad's angle.
- No auth, no persistence, no queue — every run is stateless.
