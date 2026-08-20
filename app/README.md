# Creative Loop — MAËLYS AI Acquisition Engine (prototype)

**Head of AI home assignment, Part 2 — Raz Vakil**

**Live demo:** https://main.d1ogm4mrqh7c8u.amplifyapp.com (generation requires an
access code) · **Part 1 deck:** [/deck.html](https://main.d1ogm4mrqh7c8u.amplifyapp.com/deck.html)
· Hosted on AWS Amplify, auto-deploys from `main`.

A working prototype of the closed creative loop: a Meta video ad goes in, a
hook-matched MAËLYS landing page comes out, performance learnings are computed
per creative attribute, and those learnings generate the next ad — including a
real AI-generated video teaser (Google Veo).

```
┌─────────────┐   ┌──────────────────┐   ┌──────────────────────┐
│ 1. VIDEO AD │ → │ 2. LANDING PAGE  │ → │ 3. NEXT CREATIVE     │
│  Gemini     │   │  hook-matched,   │   │  concepts + Veo      │──┐
│  video      │   │  MAËLYS arche-   │   │  8s teaser           │  │
│  analysis   │   │  types + voice   │   │                      │  │
└─────────────┘   └────────▲─────────┘   └──────────▲───────────┘  │
      ▲                    └──── internal data ─────┘              │
      │             (Meta+GA4+LTV+A/B — a SOURCE for generation;   │
      │              the new page's own performance is unknown)    │
      └──────────────────────── the loop closes ───────────────────┘
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

**3 · Next Creative** (`/api/next-concepts`, `/api/generate-video`) — the
unified internal dataset (`data/performance.json`: Meta KPIs + GA4 + LTV +
A/B archive per Genome-tagged creative) is consumed here as a **data source**
— deliberately not shown as a dashboard, because the just-generated page's
own performance is unknown until it runs. Attribute-level learnings (per hook
type, format, angle, LP archetype) plus competitor angle gaps prompt three
briefs with explicit hypotheses at three risk levels (safe iteration, new-hook
test, exploratory swing), each citing the learning or competitor insight it
exploits. Each ships with a production-ready Veo prompt; one click generates
a real 8-second 9:16 video teaser via Veo. In production the measurement join
is the Meta Marketing API + GA4 + LTV pipeline described in the Part 1 deck.

## Data-source provenance — proving the sources are used

The assignment lists competitive data (Ads Library, competitor sites) and
internal data (Meta KPIs, GA4, LTV, A/B tests) as inputs. The prototype
doesn't just claim to use them — it labels every use:

| Source | Where it lives | How it's used | Label |
|---|---|---|---|
| MAËLYS site (5 scraped LPs) | `../research/lp-analysis.md`, `lib/assets.ts`, `lib/maelys.ts` | Archetype schemas, voice/compliance rules, real TBYB offer facts, brand tokens, **real CDN imagery** (jar, clinical before/after, texture, press logos) | pink `maelys.com` chips |
| Competitor funnels (4, scraped live) | `../research/competitor-insights.json` | Injected into generation prompts; recommendations and exploratory ad concepts must cite insight ids (e.g. `[truly-beauty-1]`) | amber `competitor` chips |
| Unified internal data (fixed synthetic) | `data/performance.json` | Fleet KPIs + **module-level A/B learnings** (`AB-2026-*`) whose directives the LP generator must apply and cite (stats-before-offer, single price frame, sticky ATC, FAQ objection order…) | indigo `internal data` chips |
| The ad itself | Gemini video analysis | Hook-matched H1, creator voice, hedged claims | green `ad analysis` chips |

Toggle **🏷 Provenance** on the generated page to see per-section chips; the
sidebar shows "Data sources used", "Structure decisions — driven by data"
(each citing its learning id), and source-tagged recommendations. AI-written
testimonial copy is explicitly labeled `AI copy · illustrative`.

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
