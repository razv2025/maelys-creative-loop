"use client";

// Dev/QA route: renders the LP renderer with fixture content (no API needed).
// Also serves as a demo fallback. Toggle archetype with the buttons.

import { useState } from "react";
import LandingPagePreview from "@/components/LandingPagePreview";
import type { LandingPageContent } from "@/lib/types";

const advertorial: LandingPageContent = {
  archetype: "advertorial",
  hookMatchNote:
    "The hero mirrors the ad's confession hook: 'I lost the weight — nobody warned me about the loose skin.'",
  announcementBar: "10,000+ 5-star reviews | 2,000,000+ jars sold",
  hero: {
    h1: "Visibly tighten loose skin caused by weight loss in 30 days",
    subhead:
      "Over 2 million jars sold, this clinically proven body whip tightens the look of loose, saggy skin after GLP-1 or major weight loss.",
    riskLine: "See the results you want or don't pay!",
    badges: ["#1 BEST-SELLER", "TRY IT FOR JUST $5", "OVER 2 MILLION JARS SOLD!"],
    benefitBullets: [
      "Skin looks smoother & firmer",
      "Loose-looking skin visibly tightened",
      "Cellulite appearance improved",
      "Confidence back after weight loss",
    ],
    ctaText: "TRY BEFORE YOU BUY | $0",
  },
  pressBar: {
    h2: "As seen in..",
    quotes: [
      "My skin drinks up MAËLYS GET-DREAMY Overnight Toning Whip",
      "Best overall body lotion for aging skin",
    ],
  },
  trustTicker: [
    "Made in the USA",
    "Clinically proven",
    "Try before you buy",
    "#1 best-seller at Ulta",
    "10K+ 5-star reviews",
  ],
  beforeAfter: {
    h2: "No one has before & afters like GET-DREAMY",
    cards: [
      {
        tags: ["Loose skin"],
        quote: "This picture is proof that your product works. I was honestly shocked!",
        attribution: "Shelly, 37 · Verified Buyer",
      },
      {
        tags: ["Skin roughness"],
        quote: "I lost weight, but was left with loose skin. The only thing that helped is your cream!",
        attribution: "Mallisa, 41 · Verified Buyer",
      },
      {
        tags: ["Loose skin"],
        quote: "By morning I feel like a whole new woman.",
        attribution: "Dana, 45 · Verified Buyer",
      },
    ],
  },
  mechanism: {
    eyebrow: "BACKED BY CLINICAL RESULTS",
    h2: "How the overnight system for post-weight-loss skin works",
    sub: "Clinically backed benefits. No extreme treatments, just nightly body care.",
    cards: [
      { title: "Tightens the look of loose skin", body: "The rich, cloudy whip helps skin look visibly firmer with consistent nightly use." },
      { title: "Smooths the appearance of cellulite", body: "Milk Thistle, a potent antioxidant, improves the look of uneven texture." },
      { title: "Hydrates so skin looks plumper", body: "Glycerin draws in moisture while Shea Butter locks it down overnight." },
      { title: "Works while you sleep", body: "No complicated routines. No extra effort. No extra time." },
    ],
  },
  clinicalStats: {
    eyebrow: "30 WOMEN. 56 DAYS.",
    h2: "Women were shocked by results in an independent clinical trial",
    stats: [
      { pct: 90, label: "Smoother-looking skin" },
      { pct: 83, label: "Visibly tighter" },
      { pct: 80, label: "Improved look of loose skin" },
    ],
    footnote: "Self-assessment on 30 participants after 56 days. Individual results may vary.",
  },
  offer: {
    headline: "GET-DREAMY keeps selling out for a reason — try it before you buy",
    subscribeLabel: "Try it & subscribe",
    subscribePrice: "NOW $0 — $43.20 if you keep it",
    subscribePerks: [
      "20% off all orders",
      "Cancel or change anytime",
      "10% cash-back in loyalty points",
      "FREE full-size AHA Body Scrub ($35 value!)",
    ],
    oneTimeLabel: "Try it now",
    oneTimePrice: "NOW $0 — $54 if you keep it",
    ctaText: "TRY BEFORE YOU BUY | $0",
    subLine: "Pay for shipping today and $43.20 after you try it at home.",
    guaranteeLine: "See the results you want or don't pay!",
  },
  emotionalClose: {
    h2: "You're going to love looking in the mirror",
    body: "You deserve to enjoy your results — not hide the parts that changed along the way.",
  },
  reviews: {
    h2: "Real customers, real results",
    items: [
      { quote: "My body is mine again. Absolutely love it.", name: "Karen", age: 52, tag: "A MUST HAVE!" },
      { quote: "I use it before bed and by morning I feel like a whole new woman.", name: "Beth", age: 44 },
      { quote: "Third jar in. The texture of my stomach looks so much smoother.", name: "Rosa", age: 39 },
      { quote: "Skeptical at first — the trial convinced me.", name: "Amanda", age: 47, tag: "So far so good" },
      { quote: "The scent alone is worth it. And my arms look tighter.", name: "Denise", age: 55 },
      { quote: "Finally something for after the weight loss.", name: "Priya", age: 42 },
    ],
  },
  howToUse: {
    h2: "Effortless, effective body care",
    steps: [
      { title: "Apply the body whip", body: "A generous layer on clean, dry skin before bed." },
      { title: "Massage in circular motions", body: "Until fully absorbed. Takes under a minute." },
      { title: "Overnight care", body: "Consistency is key — the more you use it, the better your skin can look." },
    ],
  },
  faq: {
    h2: "Any last questions?",
    items: [
      { q: "How does Try Before You Buy work?", a: "Pay only shipping today. Use it at home for 3 weeks. If you love it, keep it. If not, send it back before your trial ends and you won't be charged the full price." },
      { q: "When will I see results?", a: "Most women report their skin looks smoother within a few weeks of consistent nightly use. Clinical participants self-assessed results over 56 days." },
      { q: "Can I use it with other MAËLYS products?", a: "Yes — it pairs well with B-TIGHT and the RE-LURE Tight & Tone Body Serum for an all-day routine." },
      { q: "Is it safe during pregnancy?", a: "We recommend consulting your doctor before use during pregnancy or nursing." },
    ],
  },
  guarantee: {
    h2: "Try GET-DREAMY at home before you pay full price",
    body: "Pay only shipping today. Use it at home. If you love it, keep it. If it's not for you, send it back before your trial ends, and you won't be charged the full price.",
  },
  stickyBar: { text: "GET-DREAMY · 3-week home trial", ctaText: "TRY BEFORE YOU BUY" },
  seo: { title: "Visibly tighten loose skin | MAËLYS", slug: "get-dreamy-loose-skin-v2" },
};

const listicle: LandingPageContent = {
  ...advertorial,
  archetype: "listicle-creator",
  hookMatchNote: "Continues Jackie's UGC review voice from the ad into the page.",
  hero: {
    ...advertorial.hero,
    eyebrow: "Clinically proven formula",
    h1: "5 reasons Jackie swears by this body whip for loose skin",
    subhead:
      "After trying everything for the look of loose skin, this is the one thing she recommends — and it's just $5 to try.",
  },
  creatorCard: {
    name: "Jackie M.",
    title: "Honest-review creator",
    tagline: "Real reviews for real women — no filters, no scripts.",
  },
  pressBar: undefined,
  beforeAfter: undefined,
  mechanism: undefined,
  howToUse: undefined,
  reasons: [
    { n: "01", title: "You can try it before you pay", body: "Pay shipping today, use a full-size jar at home for 3 weeks, and only keep it if you love what you see.", creatorQuote: "Three weeks is a real amount of time to know if it works for you.", tag: "Try it risk-free" },
    { n: "02", title: "She's been where you are", body: "Loose-looking skin after weight changes is exactly why Jackie started testing body care on camera.", creatorQuote: "I looked everywhere for a solution — and I show you everything, the good and the bad." },
    { n: "03", title: "Because workouts don't fix loose skin", body: "You can train, eat well, show up every day. But your skin? It doesn't always keep up.", tag: "#1 best-seller" },
    { n: "04", title: "It works while you sleep", body: "No complicated routines. No extra effort. No extra time.", creatorQuote: "It's literally the last thing I do before bed." },
    { n: "05", title: "“Women don't believe anything works anymore.”", body: "Let's be honest, you've tried creams before. They didn't work. That's exactly why the trial exists.", tag: "Results you can see" },
  ],
};

export default function Preview() {
  const [which, setWhich] = useState<"advertorial" | "listicle">("advertorial");
  const [mobile, setMobile] = useState(false);
  const [prov, setProv] = useState(true);
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setWhich("advertorial")} className={`rounded-full border px-4 py-1.5 text-xs ${which === "advertorial" ? "border-pink-400 text-pink-300" : "border-[var(--chrome-border)]"}`}>Advertorial fixture</button>
        <button onClick={() => setWhich("listicle")} className={`rounded-full border px-4 py-1.5 text-xs ${which === "listicle" ? "border-pink-400 text-pink-300" : "border-[var(--chrome-border)]"}`}>Listicle fixture</button>
        <button onClick={() => setMobile(!mobile)} className="rounded-full border border-[var(--chrome-border)] px-4 py-1.5 text-xs">{mobile ? "📱 mobile" : "🖥 desktop"}</button>
        <button onClick={() => setProv(!prov)} className={`rounded-full border px-4 py-1.5 text-xs ${prov ? "border-emerald-400 text-emerald-300" : "border-[var(--chrome-border)]"}`}>🏷 provenance {prov ? "on" : "off"}</button>
      </div>
      <div className="rounded-xl bg-neutral-300 p-4">
        <LandingPagePreview content={which === "advertorial" ? advertorial : listicle} mobile={mobile} showProvenance={prov} />
      </div>
    </div>
  );
}
