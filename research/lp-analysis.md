# MAËLYS Landing Page Teardown — GET-DREAMY Loose-Skin Funnel

Source: 5 HTML files curl'd from maelyscosmetics.com on 2026-08-20, in `/Users/razvakil/Claude/Maelys/research/lps/`.
All 5 pages sell **one product**: GET-DREAMY Overnight Toning Body Whip (product id 409, canonical PDP `https://www.maelyscosmetics.com/body/get-dreamy`), with an upsell to the GET-DREAMY + RE-LURE duo.

| File | Archetype | HTML size | Bundle name |
|---|---|---|---|
| get-dreamy-general-loose-skin.html | Long-form advertorial (generic) | 317 KB | `get-dreamy-froya-caroline-lp-1` |
| get-dreamy-caroline-loose-skin.html | Same advertorial, creator-headline variant | 317 KB | `get-dreamy-froya-caroline-lp-1` (shared) |
| get-dreamy-loose-skin.html | Compact "offer-first" advertorial (Ulta-co-branded bundle `ulta-maelys-loose-skin`) | 189 KB | `ulta-maelys-loose-skin` |
| get-dreamy-cb-5-reasons.html | Creator listicle ("5 reasons") | 383 KB | `get-dreamy-im8-lp-2` |
| quiz_looseskin.html | Quiz funnel (Next.js app shell) | 30 KB | Next.js `/quiz/[name]` route |

---

## 1. Page archetypes & narrative arcs (with quoted copy)

### 1a. General advertorial — `get-dreamy-general-loose-skin.html`

Ordered section structure (headline copy quoted verbatim):

1. **Announcement bar / social-proof strip**: "10,000+ 5-star reviews | 2,000,000+ jars sold"
2. **Hero** — H1: *"Visibly tighten loose skin caused by weight loss in 30 days"*
   Subhead: *"Over 2 million jars sold, this clinically proven body whip tightens the look of loose, saggy skin after GLP-1 or major weight loss."*
   CTA: `TRY BEFORE YOU BUY` + risk reversal line *"See the results you want or don't pay!"*
   Hero badges: "#1 BEST-SELLER · TRY IT FOR JUST $5 · OVER 2 MILLION JARS SOLD!"
   Benefit bullets: "Skin looks smoother & firmer / Loose-looking skin visibly tightened / Cellulite appearance improved / Confidence back after weight loss"
3. **Press bar** — H2: *"As seen in.."* — Allure, InStyle, Forbes, Yahoo, Today, Fashion Times logos + two press pull-quotes: *"My Skin Drinks Up MAËLYS GET-DREAMY Overnight Toning Whip"* / *"Best Overall Body Lotions for Aging Skin"*
4. **Before/after UGC** — H2: *"No one has before & afters like GET-DREAMY"*. 6 tagged B/A cards ("Skin roughness", "Loose skin") with named quotes, e.g. Shelly, 37: *"This picture is proof that your product works. I was honestly shocked!"*; Mallisa, 41: *"I lost weight, but was left with loose skin. The only thing that helped is your cream!"*
5. **Mechanism** — eyebrow "BACKED BY CLINICAL RESULTS", H2: *"How the overnight system for post-weight-loss skin works"*, sub: *"5 clinically backed benefits… No extreme treatments, just nightly body care."* Five H3 benefit cards: Tightens The Look Of Loose Skin / Smooths The Appearance Of Cellulite (Milk Thistle) / Reduces The Look Of Skin Roughness (Uva-Ursi) / Hydrates Skin So It Looks Plumper (Glycerin) / Works While You Sleep.
6. **Clinical proof** — eyebrow "30 WOMEN. 56 DAYS.", H2: *"Women were shocked by results in an independent clinical trial"*. Stat tiles: **90%** smoother skin / **83%** visibly tighter / **80%** loose-skin appearance, footnote *"Self-assessment on 30 participants after 56 days. Individual results may vary."*
7. **Offer block #1** — H2: *"GET-DREAMY keeps selling out for a reason (Try it before you buy today)"* + "FREE TRIAL / Free trial ends in: 00:15:06" countdown. Two radio options: "Try it & subscribe — NOW $0, $43.20 if you keep it" (perks: 20% off all orders / Cancel or change anytime / 10% cash-back in loyalty points / "Free gift! FREE full-size AHA Body Scrub ($35 value!)") vs "Try it now — NOW $0, $54 if you keep it". Button: `TRY BEFORE YOU BUY | $0`, sub-line *"Pay for shipping today and $43.20 $54 after you try it at home."*
8. **Brand story** — eyebrow "THE STORY BEHIND THE PRODUCT", H2: *"We're MAËLYS"* — *"MAËLYS was born out of the need for body care solutions that didn't exist… one clinically proven body solution at a time."* + clinical-testing methodology paragraphs.
9. **Why it works (3 numbered reasons)** — H2: *"Why GET-DREAMY is so powerful for post-weight-loss skin"*: "1. LOOSE SKIN NEEDS CONSISTENT CARE / 2. NIGHTTIME IS YOUR EASIEST ROUTINE WINDOW / 3. THE FORMULA TARGETS TEXTURE + TONE" + emotional block "BODY CONFIDENCE AFTER WEIGHT LOSS": *"You deserve to enjoy your results — not hide the parts that changed along the way."*
10. **Feature checklist ticker**: "Clinically Proven Formula · Simple 1-Step Routine · Rich Cloudy Texture · Addictive Scent · ULTA #1 Best-Seller · 250M+ TikTok Views · Try Before You Buy · Real User Reviews"
11. **Review wall** — eyebrow "RAW, UNEDITED REVIEWS", H2: *"Real customers, real results"* — 17 blockquote reviews (see §5).
12. **Guarantee restate** — H2: *"Try GET-DREAMY at home before you pay full price"* — *"Pay only shipping today. Use it at home. If you love it, keep it. If it's not for you, send it back before your trial ends, and you won't be charged the full price."*
13. **UGC video wall** — H2: *"125,000+ real user videos and counting"* (12 autoplay Vimeo clips).
14. **Offer block #2** — H2: *"Thousands of 5-star reviews - try GET-DREAMY risk-free today"* (same offer widget + countdown).
15. **How to use** — H2: *"Effortless, effective body care. Because skin tightening shouldn't be complicated"* — 3 steps: APPLY THE BODY WHIP / MASSAGE IN CIRCULAR MOTIONS / OVERNIGHT CARE (*"Consistency is key — the more you use it, the better your skin can look."*)
16. **Ingredients / quality** — H2: *"Why women are switching to GET-DREAMY after weight loss"* — Ingredients (Milk Thistle, Uva-Ursi, Magnesium, Glycerin, Shea Butter, Coconut Oil, Passionfruit Seed Oil, Chamomile Extract, Vitamin E) / High Quality / Formula.
17. **Virality recap** — eyebrow "THE PURPLE JAR EVERYONE KEEPS TALKING ABOUT", H2: *"Why GET-DREAMY became the viral body whip for loose-looking skin"* (3 cards incl. "BLEW UP ON SOCIAL MEDIA": *"became an Ulta #1 best-seller, gained over 250M TikTok views, and inspired 125,000+ real user videos"*).
18. **Offer block #3** + **post-ATC upsell modal**: "Try this all-day body firming routine… GET-DREAMY + RE-LURE… If you don't see results, you don't pay! — TRY BEFORE YOU BUY | $0 — Pay for shipping today and $51.20 ~~$64~~ after you try it at home." / decline: "No, thanks."
19. **Final guarantee CTA** — repeat of §12 with `TRY BEFORE YOU BUY >`.

Arc in one line: **Claim → Authority (press) → Proof (B/A) → Mechanism → Clinical stats → Offer → Brand trust → Rationalization → Social volume → Offer → Usage → Ingredients → Virality → Offer**. Offer widget appears 3x; CTA ~9x.

### 1b. Creator variant — `get-dreamy-caroline-loose-skin.html`

**Identical to 1a except two things** (verified by full-text diff):
- H1 swapped to: *"Caroline Baudino swears by this body whip to tone the look of loose skin"*
- Hero image swapped: `generic-d-v1.png`/`generic-m-v1.png` → `caroline-banner-desktop-v2-x1and5.png`/`caroline-banner-mobile.png`
Everything else — every section, review, offer — is byte-identical, served from the same CSS/JS bundle (`get-dreamy-froya-caroline-lp-1`, suggesting the template is reused across creators, e.g. "Froya"). Creator personalization = **headline + hero banner only** (an ad-hook-match layer, not a rebuilt page).

### 1c. Compact advertorial — `get-dreamy-loose-skin.html` (Ulta bundle)

1. **Announcement bar**: "10,000+ 5-star reviews | 1,000,000+ jars sold" (note: 1M here vs 2M on the other pages)
2. **Hero** — H1: *"Tone the look of saggy skin, or don't pay"*; sub: *"Try a full-size jar at home for 3 weeks and only pay if you see results at the end of your trial!"*; CTA `TRY BEFORE YOU BUY`.
3. **Benefits** — H2: *"Firm loose skin while you sleep"*: "Smoother texture / Tighter-looking skin / Deep hydration / Relaxing night boost — Infused with Magnesium to help you unwind."
4. **Offer block** — H2: *"Claim your trial now"* + countdown "FREE TRIAL Trial ends in: 00:15:06" (same widget as 1a).
5. **Ingredients accordion** — H2: *"Formulated with"* + tabs: Why GET-DREAMY works / Clinical results / How to use / Benefits, e.g. *"Milk Thistle: A potent antioxidant known for its ability to improve and smooth the appearance of fatty skin."*
6. **Clinical stats** — H2: *"Tested by women, proven by results"* (same 90/83/80).
7. **B/A + reviews** — H2s: *"Join millions of women toning their loose skin"* (3 Yotpo-style dated reviews) and *"Real women, real results"*.
8. **Comparison** — H2: *"Us vs. Them"*: *"The only clinically proven body-toning whip is Ulta's #1 best-seller for a reason: there's nothing like it on the market!"* (table shipped as images `them-d.png`/`them-mob.png`).
9. **Emotional close** — H2: *"You're going to love looking in the mirror"* — *"Feel more confident in your skin, just in time for summer"* + CTA.
10. **FAQ** — H2: *"Any last questions?"* — 4 accordions (best results / TBYB mechanics / stacking with B-TIGHT & RE-LURE / pregnancy).
11. **Full INCI ingredients list** + RE-LURE duo upsell modal.

### 1d. Listicle — `get-dreamy-cb-5-reasons.html`

1. **Hero** — eyebrow "Clinically proven formula", H1: *"5 reasons Caroline Baudino swears by this body whip"*; sub: *"After helping millions of women feel confident in their skin again, this is the one thing she recommends when your skin doesn't look as firm, smooth, or tight as it used to — and it's just $5 to try!"*; CTA; stat chips "10K+ 5-star reviews / 1M+ jars sold / #1 best-seller".
2. **Creator credential card**: "Trusted by — Caroline Baudino — Podcast host, Fashion influencer — Motivating you to look & feel your best at any age."
3. **Trust ticker** (marquee, repeated dozens of times in DOM): "Made in the USA · Clinically proven · Try before you buy · #1 best-seller at Ulta · 10K+ 5-star reviews"
4. **Reason 01** — *"You can try it before you pay"* — with embedded creator quote: *"The fact that you can try it, use it, and see if it works for you for three weeks? That's a good amount of time!"* Tag: "Try it risk-free".
5. **Reason 02** — *"She understands what so many women are dealing with"* — *"I had loose skin after around age 42, and I looked everywhere for a solution."* Tag: "#1 best-seller".
6. **Reason 03** — *"Because workouts don't fix loose skin"* — *"You can dress well. Take care of yourself. Show up every day. But your skin? It doesn't always look as smooth or firm as it used to."* + *"I hear people saying things like, 'I don't want to show my legs. I don't want anyone to see my cellulite.'"* — interleaved clinical stats block ("Tested by women, proven by results", 90/83/80).
7. **Reason 04** — *"It works while you sleep"* — *"No complicated routines. No extra effort. No extra time."* + creator quote *"It's the perfect addition to your nighttime routine."*
8. **Reason 05** — *"'Women don't believe anything works anymore.'"* — *"Let's be honest, you've tried creams before. They didn't work."* Tag: "Results you can see".
9. **Creator testimonial** — H2: *"Trusted by Caroline"* — full quote combining reasons 2+3.
10. **Review carousel** — H2: *"What women are saying about GET-DREAMY"* (5 titled Yotpo reviews).
11. **Product explainer** — H2: *"The same formula Caroline uses to target loose, saggy skin"* + tabs "01 How to use / 02 What's inside? / 03 Advisory board".
12. **Advisory board** — H2: *"Advisory board"* — 5 named experts with quotes (Dr. Mara Weinstein Velez, Nyamka Roberts-Smith, Dr. Hadley King, Dr. Bertha Baum, Shamara Bondaroff) — *"every bold claim is backed by real results and strengthened by the insight of our expert advisory board."*
13. **Ingredients / clinical accordions** (note different footnote here: *"Self-assessment on 33 participants after 28 days."*).
14. **B/A wall** ("Trusted by real women, just like you") → **Us vs. Them** (image) → **review wall** ("See why GET-DREAMY has 10,000+ reviews") → **positioning claim**: *"The only clinically proven body toning whip"*.
15. **FAQ** → **Offer block** ("Try Before You Buy", countdown; free gift here = *"FREE full-size Body Serum with Subscribe & Save. ($62 value!)"*) → RE-LURE duo upsell modal → full INCI list.
Also has a **collapsible sticky ATC bar** (`im8-lp-1-sticky-atc`) — the only page with one.

### 1e. Quiz — `quiz_looseskin.html`

Next.js (App Router / RSC) shell; full quiz config embedded in the flight payload (`self.__next_f.push`). Extracted config — system name **"GET DREAMY LOOSE SKIN TBYB"**, `resultRedirectUrl: "/get-dreamy-ifitworks?quizCompleted=true"`, `totalQuestions: 7`:

1. Q1 (binary, auto-advance): *"Ready to make your beauty sleep \*actually\* beautiful?"* — "✨ Yes, let's do it! / 🤔 I'm curious…" — header promise: *"Complete the quiz (~1 minute) to unlock a free mystery gift worth $35!"*
2. Q2 (multi-select pills): *"Which areas are you focusing on for a firmer, more toned look?"* — Thighs 🦵 / Buttocks 🍑 / Arms 💪 / Stomach 🤰 / All over ✨
3. Q3 (grid): *"What is your primary body skin concern?"* — Loss of firmness / Uneven texture / Dryness & dullness / Signs of aging
4. **Interstitial "DID YOU KNOW?"**: *"Your skin works the night shift — Studies show skin cell regeneration nearly doubles while you sleep, making it the prime time for effective treatments."*
5. Q4 (slider, default 7/10): *"How important is a simple, quick-to-use product in your routine?"*
6. Q5 (grid): *"What's your current relationship with body care?"*
7. Q6 (binary): *"Do you prefer your body products to work while you're active or while you rest?"*
8. **"Analyzing your results…"** screen ("YOUR PICKS — We're finding the perfect clinically proven solution for your goals.")
9. Q7 (commitment question — both answers are yes): *"Are you ready to discover the secret to waking up to dreamier skin?"* — "😍 Yes! Show me my match! / ✨ I'm ready for results"
10. **Result**: "YOUR PERSONALIZED RECOMMENDATION — Meet your dream body solution" → CTA `TRY BEFORE YOU BUY` → redirects to `/get-dreamy-ifitworks?quizCompleted=true`.

The "quiz" is theater: **every path resolves to GET-DREAMY** (single hardcoded result). Its function is micro-commitment building (yes-laddering), segment data capture, and warm hand-off to a dedicated LP.

---

## 2. Copy voice

- **Tone**: warm, empathetic girlfriend-expert. Second-person "you/your skin" everywhere; "she" framing on creator pages (*"She understands what so many women are dealing with"*). Empowerment over shame: *"You deserve to enjoy your results — not hide the parts that changed along the way."* Objection-first honesty: *"Let's be honest, you've tried creams before. They didn't work."*
- **Reading level**: ~grade 5–7. Short declaratives, fragment cadence for rhythm: *"No complicated routines. No extra effort. No extra time."* / *"You can dress well. Take care of yourself. Show up every day. But your skin?"*
- **Persuasion devices**:
  - *Risk reversal as the master theme* — "Try Before You Buy" is simultaneously offer, guarantee, and reason #1.
  - *Urgency*: countdown "Free trial ends in: 00 Hrs 15 Min 06 Sec" (hardcoded 15-minute timer), "keeps selling out for a reason".
  - *Social proof numbers*: 10,000+/10K+ 5-star reviews, 1M/2M+ jars sold, 250M+ TikTok views, 125,000+ user videos, #1 best-seller at Ulta, "millions of women".
  - *Clinical authority*: "independent clinical trial", 90/83/80 stat tiles, advisory board of board-certified dermatologists, "Made in the USA".
  - *Before/after* imagery with age-stamped first names ("Shelly, 37 — Verified Buyer").
  - *Trend-jacking*: explicit **GLP-1** targeting ("after GLP-1 or major weight loss").
  - *Identity/emotion close*: "You're going to love looking in the mirror", "my body is mine again".
- **Recurring phrases** (use these in a generator): "tighten the look of loose skin", "the appearance of cellulite", "loose, saggy skin", "works while you sleep", "clinically proven", "rich, cloudy whip/texture", "Consistency is key", "Try Before You Buy", "See the results you want or don't pay!", "real women / real results", "Verified Buyer", "#1 best-seller at Ulta", "night(ly) routine", "Addictive Scent", "the purple jar".
- **Claim hedging (cosmetic-claim compliance pattern)**: benefits are always perceptual — "tighten **the look of**", "smooth **the appearance of**", "reduce **the look of** skin roughness", "loose-**looking** skin", "**visibly** tighter", "helps support the appearance of". Clinical stats are framed as participant self-assessment with footnotes: *"Self-assessment on 30 participants after 56 days. Individual results may vary. Best results with consistent nightly use."* Never "removes cellulite" or "tightens skin" unqualified. Ingredient claims are mechanism-lite: "known for its ability to…", "helps smooth…".

---

## 3. Product & offer

- **Product**: GET-DREAMY Overnight Toning Body Whip "with Milk Thistle + Magnesium" (not B-TIGHT/B-FLAT; those appear only as cross-sell mentions in FAQ: "pairs really well with our B-TIGHT… start with our RE-LURE Tight & Tone Body Serum").
- **Core offer — "Try Before You Buy" (TBYB)**: pay shipping only today (~$5; hero badge "TRY IT FOR JUST $5", button says "| $0"), 21-day home trial ("3 weeks"), full price pre-authorized, charged after trial unless returned ("We'll send you a return label on the house"; "The upfront shipping fee is non-refundable").
- **Price ladder**:
  - One-time ("Try it now"): "NOW $0 — **$54** if you keep it"
  - Subscribe ("Try it & subscribe — Ships every 30 days"): "NOW $0 — **$43.20** if you keep it" (= 20% off), perks "20% off all orders / Cancel or change anytime / 10% cash-back in loyalty points" + free gift: "FREE full-size AHA Body Scrub ($35 value!)" (advertorials) or "FREE full-size Body Serum with Subscribe & Save ($62 value!)" (listicle).
  - Post-ATC upsell modal: "GET-DREAMY + RE-LURE" duo — "Pay for shipping today and **$51.20** ~~$64~~ after you try it at home. / If you don't see results, you don't pay!" / decline: "No, thanks."
- **CTA texts**: `TRY BEFORE YOU BUY`, `TRY BEFORE YOU BUY | $0`, `TRY BEFORE YOU BUY >`, `Try it & subscribe`, quiz: `Continue` / `Next` / `Almost there…` / `TRY BEFORE YOU BUY`.
- **Guarantee copy**: *"Pay only shipping today. Use it at home. If you love it, keep it. If it's not for you, send it back before your trial ends, and you won't be charged the full price."* / *"Not obsessed? You can send it back, no questions asked!"*

---

## 4. Branding / design tokens (extracted from live CSS `get-dreamy-froya-caroline-lp-1.min.css`)

**Color system (CSS custom properties, verbatim):**

```css
--NEW-BLACK: #120d0e;            /* primary text / dark sections / secondary CTA bg */
--NEW-PINK: #ffafc4;             /* PRIMARY CTA background, white text */
--NEW-LIGHT-PINK / --TIGHT---Light-Pink: #FFE0E9;
--NEW-PINK-LIGHT: #FFF5F8;
--NEW-DARK-PINK: #d0597a;        /* (alt value in file: #B2687B) */
--NEW-BEIGE-N1: #fbfaf8;  --NEW-BEIGE-N2: #f6f3f0;  --NEW-BEIGE-N3: #ebe5e2;
--NEW-BEIGE-N4: #bcb2ac;  --NEW-BEIGE-N5: #968e89;  --NEW-BEIGE-N6: #5a524d;
--DREAMY---Dark-Purple: #57539E; /* GET-DREAMY product accent (listicle sections, jar color) */
--Light-Purple: #eae7ff;         /* lavender tint panels */
--NEW-GREEN: #5aaf67; --ACCENT-GREEN: #218a31; --LIGHT-GREEN: #eaf8ec;  /* checkmarks/success */
--NEW-ERROR: #c23d3d;
--NEW-GOLD: #B8A568;  --Body-bg: #ffffff;
```
Observed inline usage: section bgs `#f4d8e2` (soft pink), `#f6f3f0`/`#f7f3f0` (warm beige), `#f7f7f7`; CTA `background-color:#ffafc4; color:#ffffff`; dark blocks `#120d0e` with white text; listicle swaps pink for `#57539E`/`#EAE7FF` (product-line theming: DREAMY = purple).

**Typography (self-hosted @font-face):**
- **Poppins** (Regular 400 / Medium 500 / SemiBold 600 / Bold) — body, UI, buttons (`/fonts/Poppins/…`)
- **Larken** (Medium 500 + Medium Italic) — serif display headlines (`/fonts/Larken/…`)
- **Morganite Bold 700** — condensed display for big numbers/stats
- Montserrat appears as a minor fallback. Pattern: Larken serif for emotional H1/H2s, Poppins for everything else, Morganite for "90%" stat tiles.

**Logo & assets:**
- Logo (black SVG): `https://wown.maelyscosmetics.com/api/assets/maelys-ec/a4aa66ef-ee82-41e3-b579-e3e77411098c/logo-black.svg`
- Press logos (SVGs on same asset CDN): allure-logo.svg, in-style-logo.svg, forbes-logo.svg, yahoo-logo.svg, today-logo.svg, fashion-times-logo.svg
- Ulta badge: `…/get-dreamy-ulta.png` ("#1 best-seller ULTA GET-DREAMY")
- Asset CDN pattern: `https://wown.maelyscosmetics.com/api/assets/maelys-ec/{uuid}/{slug}.{png|svg}` with on-the-fly `?format=avif&quality=80` / `?format=webp` variants served via `<picture>`.
- **Image style**: warm-toned lifestyle photography of women 35–55, purple jar hero shots, phone-frame UGC before/afters split-labeled, marquee ticker strips, rounded-2xl cards, emoji used liberally in quiz UI.

**Favicon**: `/favicon-32x32.png`. Title tag everywhere: "Clinically proven body solutions | MAËLYS".

---

## 5. Social proof assets

- **Counts**: "10,000+ 5-star reviews", "1,000,000+ / 2,000,000+ jars sold" (inconsistent across pages), "#1 best-seller at Ulta", "250M+ TikTok views", "125,000+ real user videos", "millions of women".
- **Press**: 6 logos (Allure, InStyle, Forbes, Yahoo, Today, Fashion Times) but only 2 attributed quotes.
- **Clinical**: 90% / 83% / 80% stat tiles; footnote variants "30 participants / 56 days" (advertorials) and "33 participants / 28 days" (listicle accordion) — inconsistent.
- **Expert**: 5-person advisory board with credentials + Instagram handles (listicle only).
- **UGC**: 12 autoplay Vimeo testimonial clips per advertorial; 6 tagged before/after cards with name+age ("Shelly, 37 — Verified Buyer"); 17 raw blockquote reviews (deliberately unpolished, typos left in: "silly smooth", "big git Maelys"); Yotpo-formatted dated reviews with titles ("So far so Good", "A MUST HAVE!").
- **Caroline personalization mechanics**: two tiers —
  1. *Cheap variant* (caroline-loose-skin): swap H1 + hero banner on the shared advertorial template; zero other changes.
  2. *Deep variant* (cb-5-reasons): dedicated listicle where the creator IS the structure — credential card ("Podcast host, Fashion influencer"), 5 first-person quotes woven into reasons, "Trusted by Caroline" testimonial block, "The same formula Caroline uses…" product section. Quotes are relatable-authority style: *"I had loose skin after around age 42, and I looked everywhere for a solution."*

---

## 6. Tech stack signals

- **Platform**: NOT a Shopify theme page. Custom in-house LP platform ("**wown**" — `wown.maelyscosmetics.com` asset/image API; quiz is a Next.js App-Router app at `/quiz/[name]` with RSC flight payload; LPs are statically built with per-page bundles `/css/{lp}.min.css` + `/js/{lp}.bundle.js` with content-hash query strings). Commerce backend: `data-domain="https://www.maelyscosmetics.com"`, `data-product-id="409"` — headless cart ("mini-cart-react-app.css" on quiz page). Bundle naming (`froya-caroline-lp-1`, `im8-lp-2`, `ulta-maelys-loose-skin`) implies templated cloning per creator/traffic source.
- **A/B testing**: VWO (`dev.visualwebsiteoptimizer.com`, `account_id = 900503`, synchronous SmartCode with `settings_tolerance = 2000` ms — blocks first paint up to 2s).
- **Analytics/pixels**: GTM container `GTM-PPLTDF7R` (all 5 pages) — TikTok pixel references visible; other pixels likely injected via GTM at runtime.
- **Reviews/loyalty**: Yotpo (`cdn-widgetsrepository.yotpo.com`, `cdn-loyalty.yotpo.com` — 10% cash-back loyalty program).
- **Consent**: iubenda cookie banner.
- **Video**: Vimeo progressive-redirect MP4s (720p/1080p), autoplay muted inline.
- **Quiz engine**: homegrown (config JSON in Next.js payload; answer styles `binary|pills|grid|list|slider`, `autoAdvance`, interstitial `dreamyInfo`, fake-loader `dreamyAnalyzing`, `dreamyResult`) — no third-party quiz vendor (no Octane/Jebbit/Typeform signatures).

---

## 7. CRO critique — concrete weaknesses & opportunities

1. **VWO loaded synchronously with a 2,000 ms settings_tolerance** blocks render on every page; combined with 12 autoplay 1080p Vimeo videos and 100+ images per advertorial (317–383 KB of HTML alone), mobile LCP is badly compromised. Evidence: `settings_tolerance = 2000` in the inline SmartCode; `<video autoplay>` × 12; **zero `loading="lazy"` attributes on the general/caroline pages** (the listicle has 23 — the fix exists in-house but wasn't applied to the highest-traffic template).
2. **DOM duplication doubles weight**: every section is rendered twice (separate mobile/desktop markup — every H2 appears 2x in extraction), and the listicle's trust ticker repeats its 5 chips ~35 times in raw DOM. Replace with CSS-responsive single render + CSS animation loop.
3. **Price-message dissonance at the decision point**: hero badge says "TRY IT FOR JUST $5", button says "TRY BEFORE YOU BUY | $0", sub-line says "$43.20 $54 after you try it" — three different numbers within one scroll. The $0 framing plus pre-authorization risks post-trial chargeback/return shock (a CVR win that leaks into refund rate). Test one consistent frame: "Try it for $5 shipping — full 3-week trial."
4. **Offer widget forces an unselected radio choice** ("Please select an option." error is pre-rendered). Defaulting to the subscribe option (clearly labeled, cancel-anytime) or one-time option would remove a guaranteed friction/error state at the ATC moment.
5. **Fake/static countdown**: timer is hardcoded at 00:15:06 in HTML and restarts every visit; sophisticated buyers (and ad reviewers) discount it, and it contradicts the premium "clinically proven" trust posture. Replace with real scarcity (inventory of trial slots, shipping cutoff) or drop it.
6. **Trust-number inconsistencies across the funnel**: 1M vs 2M jars sold; clinical footnote "30 participants / 56 days" vs "33 participants / 28 days" on the same product; FAQ references a "What is preauthorization?" question "below" that doesn't exist on any page. Anyone cross-shopping two LPs (common from ads) can catch these.
7. **"Us vs. Them" comparison shipped as a PNG** (`them-d.png`) — invisible to screen readers/SEO, un-testable in VWO, and blurry on zoom. Rebuild as HTML table with brand tokens; it's also currently the *only* competitor-handling section — an obvious A/B lever.
8. **Caroline advertorial personalization is too shallow to justify the hook**: only H1 + banner change, so a viewer arriving from a Caroline ad gets zero Caroline content below the fold (no quote, no video, no "Trusted by Caroline" block, which already exists on the listicle and could be transplanted as a module). Hook-match decays immediately after the hero.
9. **No sticky ATC on the two long advertorials** (~19 sections deep) — only the listicle has the collapsible sticky bar (`im8-lp-1-sticky-atc`). Mid-page readers on the advertorials must scroll to one of 3 offer blocks; port the sticky bar template-wide.
10. **Quiz result page under-delivers on its own promises**: header promises "a free mystery gift worth $35!" but the result screen ("Meet your dream body solution") never mentions the gift, shows no price/offer detail, and the personalization is cosmetic (single hardcoded product, answers unused in the reveal copy). Echoing the user's selected zones/concern in the result headline ("Your match for **thighs + loss of firmness**…") and restating the $35 gift would lift quiz→LP click-through; passing answers into `/get-dreamy-ifitworks` copy would lift downstream CVR.
11. (Bonus) **Review hygiene**: typos in curated quotes ("Vikcy, 31", "Smells and feels grest!") read as sloppiness rather than rawness when they appear in designed cards; keep raw typos only inside clearly Yotpo-styled review UI.

---

## 8. Reusable LP template spec (generator schemas)

Shared design tokens for all archetypes:

```jsonc
{
  "brand": {
    "colors": {
      "text": "#120d0e", "ctaBg": "#ffafc4", "ctaText": "#ffffff",
      "sectionPink": "#f4d8e2", "sectionBeige": "#f6f3f0", "sectionGray": "#f7f7f7",
      "dark": "#120d0e", "productAccent": "#57539E", "productTint": "#eae7ff",
      "success": "#218a31", "error": "#c23d3d"
    },
    "fonts": { "display": "Larken Medium (serif)", "body": "Poppins Regular/Medium/SemiBold", "statNumbers": "Morganite Bold" },
    "logo": "logo-black.svg (wown asset CDN)",
    "voice": ["grade 5-7", "second person", "hedge all claims with 'the look/appearance of' + 'visibly'",
              "fragment cadence for emphasis", "footnote every stat: 'Self-assessment on N participants after D days.'"]
  },
  "offer": {
    "type": "TBYB", "trialDays": 21, "shippingToday": "$5 (framed as $0 product cost)",
    "oneTimePrice": "$54", "subscribePrice": "$43.20 (20% off, ships every 30 days)",
    "subscribePerks": ["20% off all orders", "Cancel or change anytime", "10% cash-back in loyalty points", "free gift ($35-$62 value)"],
    "upsell": { "bundle": "GET-DREAMY + RE-LURE", "price": "$51.20 (was $64)" },
    "ctaText": "TRY BEFORE YOU BUY | $0",
    "guaranteeCopy": "Pay only shipping today... send it back before your trial ends, and you won't be charged the full price."
  }
}
```

### Archetype A — Long-form advertorial (generic or creator-headline variant)

```jsonc
{
  "archetype": "advertorial",
  "slots": {
    "announcementBar": "{reviewCount}+ 5-star reviews | {jarsSold}+ jars sold",
    "hero": {
      "h1": "outcome + audience + timeframe",            // "Visibly tighten loose skin caused by weight loss in 30 days"
      "h1_creatorVariant": "{creator} swears by this {productNoun} to {hedgedOutcome}",
      "subhead": "{socialProofNumber} + clinically proven + {audiencePain}",  // GLP-1 hook-match slot
      "riskLine": "See the results you want or don't pay!",
      "badges": ["#1 BEST-SELLER", "TRY IT FOR JUST $5", "OVER {N} JARS SOLD!"],
      "benefitBullets": 4, "heroImage": "generic-or-creator banner"
    },
    "pressBar": { "h2": "As seen in..", "logos": 6, "pullQuotes": 2 },
    "beforeAfterWall": { "h2": "No one has before & afters like {PRODUCT}", "cards": 6,
      "cardSchema": { "tags": ["Skin roughness","Loose skin"], "quote": "...", "attribution": "{Name}, {Age} Verified Buyer" } },
    "mechanism": { "eyebrow": "BACKED BY CLINICAL RESULTS", "h2": "How the {routineMoment} system for {audience} works",
      "benefitCards": 5, "cardSchema": { "h3": "Hedged benefit", "body": "{ingredient} + mechanism + 'the look of'" } },
    "clinicalStats": { "eyebrow": "{N} WOMEN. {D} DAYS.", "h2": "Women were shocked by results in an independent clinical trial",
      "stats": [{ "pct": 90, "label": "SMOOTHER SKIN" }, { "pct": 83 }, { "pct": 80 }], "footnote": "required" },
    "offerBlock": "shared offer widget + countdown",       // appears 3x: after stats, after UGC, after virality
    "brandStory": { "eyebrow": "THE STORY BEHIND THE PRODUCT", "h2": "We're MAËLYS", "paragraphs": 5 },
    "whyItWorks": { "h2": "Why {PRODUCT} is so powerful for {audience}", "numberedReasons": 3, "emotionalCards": 3 },
    "featureTicker": ["Clinically Proven Formula", "Simple 1-Step Routine", "...8 chips"],
    "reviewWall": { "eyebrow": "RAW, UNEDITED REVIEWS", "h2": "Real customers, real results", "quotes": 15-17 },
    "guaranteeCta": { "h2": "Try {PRODUCT} at home before you pay full price", "body": "guaranteeCopy", "cta": true },
    "ugcVideoWall": { "h2": "{videoCount}+ real user videos and counting", "videos": 12 },
    "howToUse": { "h2": "Effortless, effective body care...", "steps": 3 },
    "ingredients": { "h2": "Why women are switching...", "chips": 9, "tabs": ["Ingredients","High Quality","Formula"] },
    "viralityRecap": { "eyebrow": "THE PURPLE JAR EVERYONE KEEPS TALKING ABOUT", "cards": 3 },
    "upsellModal": "duo bundle", "finalCta": "guaranteeCta repeat"
  }
}
```

### Archetype B — Compact offer-first advertorial

```jsonc
{ "archetype": "advertorial-compact",
  "order": ["announcementBar",
    { "hero": { "h1": "outcome-or-don't-pay", "subhead": "trial mechanics ('full-size jar at home for 3 weeks')" } },
    { "benefits": { "h2": "{outcome} while you sleep", "bullets": 4 } },
    { "offerBlock": { "h2": "Claim your trial now", "countdown": true } },
    { "ingredientsAccordion": { "h2": "Formulated with", "tabs": ["Why it works","Clinical results","How to use","Benefits"] } },
    { "clinicalStats": { "h2": "Tested by women, proven by results" } },
    { "reviews": { "h2": "Join millions of women {verb}-ing their {problem}" } },
    { "usVsThem": { "h2": "Us vs. Them", "claim": "The only clinically proven {category}..." } },
    { "emotionalClose": { "h2": "You're going to love looking in the mirror", "seasonHook": "just in time for {season}" } },
    { "faq": { "h2": "Any last questions?", "items": 4 } },
    "fullIngredients", "upsellModal"] }
```

### Archetype C — Creator listicle ("N reasons")

```jsonc
{ "archetype": "listicle-creator",
  "slots": {
    "hero": { "eyebrow": "Clinically proven formula",
      "h1": "{N} reasons {creator} swears by this {productNoun}",
      "subhead": "creator credential + audience pain + 'just $5 to try'",
      "statChips": ["10K+ 5-star reviews", "1M+ jars sold", "#1 best-seller"] },
    "creatorCard": { "name": "", "title": "Podcast host, Fashion influencer", "tagline": "Motivating you to..." },
    "trustTicker": ["Made in the USA","Clinically proven","Try before you buy","#1 best-seller at Ulta","10K+ 5-star reviews"],
    "reasons": [   // each: number chip, h3, body with embedded creator quote, tag chip
      { "n": "01", "h3": "risk-reversal reason", "creatorQuote": "...", "tag": "Try it risk-free" },
      { "n": "02", "h3": "creator empathy/origin story", "creatorQuote": "I had {problem} after around age {age}..." },
      { "n": "03", "h3": "myth-bust ('workouts don't fix {problem}')", "interleave": "clinicalStats" },
      { "n": "04", "h3": "effortlessness ('works while you sleep')" },
      { "n": "05", "h3": "skepticism reason, quoted: '\"Women don't believe anything works anymore.\"'" } ],
    "creatorTestimonial": { "h2": "Trusted by {creator}", "fullQuote": "combines reasons 2+3" },
    "reviewCarousel": { "h2": "What women are saying about {PRODUCT}", "titledReviews": 5 },
    "productExplainer": { "h2": "The same formula {creator} uses to target {problem}",
      "tabs": ["01 How to use", "02 What's inside?", "03 Advisory board"] },
    "advisoryBoard": { "experts": 5, "schema": { "name": "", "credential": "Board Certified Dermatologist", "quote": "", "handle": "@..." } },
    "then": ["beforeAfterWall", "usVsThem", "reviewWall", "positioningClaim: 'The only clinically proven {category}'",
             "faq", "offerBlock", "upsellModal", "fullIngredients"],
    "stickyAtcBar": true }
}
```

### Archetype D — Quiz funnel

```jsonc
{ "archetype": "quiz",
  "config": { "systemName": "{PRODUCT} {SEGMENT} TBYB", "totalQuestions": 7,
    "incentive": "Complete the quiz (~1 minute) to unlock a free mystery gift worth $35!",
    "resultRedirectUrl": "/{product-lp}?quizCompleted=true" },
  "steps": [
    { "type": "binary", "role": "micro-yes opener", "q": "Ready to make your {benefit} *actually* {adjective}?", "autoAdvance": true },
    { "type": "pills-multi", "role": "zone segmentation", "q": "Which areas are you focusing on...?", "answers": "emoji + body zones" },
    { "type": "grid", "role": "concern segmentation", "q": "What is your primary {category} concern?" },
    { "type": "interstitial", "label": "DID YOU KNOW?", "title": "educational hook tied to mechanism", "cta": "Next" },
    { "type": "slider", "q": "How important is a simple, quick-to-use product...?", "default": 7 },
    { "type": "grid", "role": "routine maturity", "q": "What's your current relationship with {category}?" },
    { "type": "binary", "role": "steer toward product USP", "q": "...while you're active or while you rest?" },
    { "type": "analyzing", "copy": "Analyzing your results... We're finding the perfect clinically proven solution for your goals." },
    { "type": "commitment", "q": "Are you ready to discover the secret to...?", "bothAnswersYes": true },
    { "type": "result", "label": "YOUR PERSONALIZED RECOMMENDATION", "title": "Meet your dream {category} solution",
      "cta": "TRY BEFORE YOU BUY", "improvement": "echo user's zone/concern selections + restate gift" } ] }
```

---

## Appendix: notable raw-copy bank for voice cloning

- "Over 2 million jars sold, this clinically proven body whip tightens the look of loose, saggy skin after GLP-1 or major weight loss."
- "See the results you want or don't pay!"
- "Tone the look of saggy skin, or don't pay"
- "No extreme treatments, just nightly body care."
- "The rich, cloudy whip melts into your nightly routine so you can care for your body while you rest — no 10-step routine needed."
- "You deserve to enjoy your results — not hide the parts that changed along the way."
- "No extra appointment. No complicated steps. No morning rush."
- "Your body changes. Your skin can't always keep up."
- "Let's be honest, you've tried creams before. They didn't work."
- "We believe in the product enough to let you try it first. Pay only shipping today and keep it only if you love it."
- "Consistency is key! Apply the product nightly for your best skin yet."
- "Not obsessed? You can send it back, no questions asked!"
- "Feel more confident in your skin, just in time for summer"
- "The only clinically proven body-toning whip is Ulta's #1 best-seller for a reason: there's nothing like it on the market!"
- Customer voice: "I really like it, my body is mine again..absolutely love it." / "I use it before bed and by morning I feel like a whole new woman."
