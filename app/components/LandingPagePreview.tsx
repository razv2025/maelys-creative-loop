"use client";

import { useState } from "react";
import type { LandingPageContent, SourceType } from "@/lib/types";
import { MAELYS_ASSETS } from "@/lib/assets";

// Renders generated LP content in an authentic MAËLYS skin. Imagery is pulled
// live from MAËLYS's own CDN (assets extracted from their 5 scraped LPs) and
// every section can display a provenance chip showing which data source
// shaped it: the ad analysis, maelyscosmetics.com, the unified internal
// dataset, or competitor research.

const PROV_STYLE: Record<SourceType | "generated", { bg: string; label: string }> = {
  "ad-analysis": { bg: "#1e7c3c", label: "ad analysis" },
  "maelys-site": { bg: "#c94f74", label: "maelys.com" },
  "internal-data": { bg: "#57539e", label: "internal data" },
  competitor: { bg: "#b45309", label: "competitor" },
  operator: { bg: "#0369a1", label: "your direction" },
  generated: { bg: "#6b7280", label: "AI copy · illustrative" },
};

function Prov({
  show,
  tags,
}: {
  show: boolean;
  tags: { type: SourceType | "generated"; note?: string }[];
}) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute right-2 top-2 z-10 flex flex-wrap justify-end gap-1">
      {tags.map((t, i) => (
        <span
          key={i}
          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow"
          style={{ background: PROV_STYLE[t.type].bg, opacity: 0.92 }}
          title={t.note}
        >
          {PROV_STYLE[t.type].label}
          {t.note ? ` · ${t.note}` : ""}
        </span>
      ))}
    </div>
  );
}

function Cta({ text, big = false }: { text: string; big?: boolean }) {
  return (
    <button
      className={`rounded-full font-semibold tracking-wide text-white shadow-md transition hover:brightness-105 ${
        big ? "px-10 py-4 text-base" : "px-7 py-3 text-sm"
      }`}
      style={{ background: "var(--m-cta)" }}
    >
      {text}
    </button>
  );
}

function Jar({ size = 120 }: { size?: number }) {
  // Stylized fallback if the CDN product shot fails to load.
  return (
    <div className="relative mx-auto flex items-center justify-center rounded-2xl" style={{ width: size, height: size * 0.9 }}>
      <div className="absolute inset-x-[12%] top-0 h-[22%] rounded-t-xl" style={{ background: "#c9c5f2" }} />
      <div
        className="absolute inset-x-[6%] bottom-0 h-[78%] rounded-b-2xl rounded-t-md flex items-center justify-center"
        style={{ background: "var(--m-purple)" }}
      >
        <span className="text-white text-center leading-tight" style={{ fontSize: size * 0.09 }}>
          MAËLYS
          <br />
          <b style={{ fontSize: size * 0.1 }}>GET-DREAMY</b>
        </span>
      </div>
    </div>
  );
}

function ImagePlaceholder({
  label,
  h = 180,
  tone = "pink",
}: {
  label: string;
  h?: number;
  tone?: "pink" | "beige" | "purple";
}) {
  const bg =
    tone === "purple"
      ? "linear-gradient(135deg, var(--m-lavender), #d4cff5)"
      : tone === "beige"
        ? "linear-gradient(135deg, var(--m-beige), #ece4dd)"
        : "linear-gradient(135deg, var(--m-light-pink), var(--m-pink))";
  return (
    <div
      className="flex w-full items-center justify-center rounded-xl text-center text-xs font-medium"
      style={{ height: h, background: bg, color: "#00000066" }}
    >
      {label}
    </div>
  );
}

function Stars() {
  return (
    <span className="text-sm tracking-widest" style={{ color: "var(--m-gold)" }}>
      ★★★★★
    </span>
  );
}

export default function LandingPagePreview({
  content,
  mobile,
  showProvenance = false,
}: {
  content: LandingPageContent;
  mobile: boolean;
  showProvenance?: boolean;
}) {
  const c = content;
  const isListicle = c.archetype === "listicle-creator";
  const isStory = c.archetype === "exploratory-story";
  const accent = isListicle || isStory ? "var(--m-purple)" : "var(--m-cta)";
  const [logoOk, setLogoOk] = useState(true);
  const [jarOk, setJarOk] = useState(true);
  const [baOk, setBaOk] = useState(true);
  const sp = showProvenance;

  return (
    <div
      className={`lp-root relative mx-auto overflow-hidden rounded-b-xl ${mobile ? "max-w-[420px]" : "max-w-[980px]"}`}
    >
      {/* Announcement bar */}
      <div className="relative px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white" style={{ background: "var(--m-text)" }}>
        <Prov show={sp} tags={[{ type: "maelys-site", note: "proof numbers" }]} />
        {c.announcementBar}
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-center border-b border-black/5 py-3">
        <Prov show={sp} tags={[{ type: "maelys-site", note: "logo asset" }]} />
        {logoOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MAELYS_ASSETS.logo} alt="MAËLYS" className="h-6" onError={() => setLogoOk(false)} />
        ) : (
          <span className="lp-serif text-xl font-semibold tracking-[0.25em]">MAËLYS</span>
        )}
      </div>

      {/* Hero */}
      <section className="relative px-6 pb-10 pt-8 text-center" style={{ background: "var(--m-pale-pink)" }}>
        <Prov
          show={sp}
          tags={[
            { type: "ad-analysis", note: "H1 mirrors ad hook" },
            { type: "maelys-site", note: "product imagery + offer" },
          ]}
        />
        {c.hero.eyebrow && (
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--m-purple)" }}>
            {c.hero.eyebrow}
          </div>
        )}
        <h1 className="lp-serif mx-auto max-w-xl text-3xl leading-snug md:text-4xl">{c.hero.h1}</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-black/70">{c.hero.subhead}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {c.hero.badges.map((b) => (
            <span key={b} className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm">
              {b}
            </span>
          ))}
        </div>
        <div className={`mx-auto mt-6 grid max-w-2xl items-center gap-6 ${mobile ? "" : "grid-cols-2"}`}>
          {jarOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={MAELYS_ASSETS.jar}
              alt="GET-DREAMY Overnight Toning Body Whip"
              className="mx-auto w-full max-w-[280px]"
              onError={() => setJarOk(false)}
            />
          ) : (
            <Jar size={mobile ? 150 : 200} />
          )}
          <ul className="space-y-2 text-left text-sm">
            {c.hero.benefitBullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span style={{ color: "var(--m-success)" }}>✓</span> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7">
          <Cta text={c.hero.ctaText} big />
          <div className="mt-2 text-xs font-medium text-black/60">{c.hero.riskLine}</div>
        </div>
      </section>

      {/* Trust ticker */}
      <div className="relative overflow-hidden border-y border-black/5 bg-white py-2">
        <Prov show={sp} tags={[{ type: "maelys-site", note: "trust chips pattern" }]} />
        <div className="ticker flex w-max gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-black/60">
          {[...c.trustTicker, ...c.trustTicker, ...c.trustTicker].map((t, i) => (
            <span key={i}>✦ {t}</span>
          ))}
        </div>
      </div>

      {/* Creator card (listicle) */}
      {c.creatorCard?.name && (
        <section className="relative px-6 py-8" style={{ background: "var(--m-lavender)" }}>
          <Prov show={sp} tags={[{ type: "ad-analysis", note: "creator from video" }]} />
          <div className="mx-auto flex max-w-md items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl" style={{ background: "var(--m-pink)" }}>
              👩🏻‍🦰
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--m-purple)" }}>
                Trusted by
              </div>
              <div className="lp-serif text-lg">{c.creatorCard.name}</div>
              <div className="text-xs text-black/60">{c.creatorCard.title}</div>
              <div className="mt-1 text-xs italic text-black/50">{c.creatorCard.tagline}</div>
            </div>
          </div>
        </section>
      )}

      {/* Press bar */}
      {c.pressBar && (
        <section className="relative bg-white px-6 py-8 text-center">
          <Prov show={sp} tags={[{ type: "maelys-site", note: "press logo assets" }]} />
          <h2 className="lp-serif text-xl">{c.pressBar.h2}</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {Object.entries(MAELYS_ASSETS.press).map(([name, url]) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={name} src={url} alt={name} className="h-5 opacity-60" onError={(e) => ((e.target as HTMLImageElement).outerHTML = `<span class='lp-serif italic text-black/40'>${name}</span>`)} />
            ))}
          </div>
          <div className={`mx-auto mt-5 grid max-w-2xl gap-3 ${mobile ? "" : "grid-cols-2"}`}>
            {c.pressBar.quotes.map((q) => (
              <blockquote key={q} className="rounded-xl p-4 text-sm italic" style={{ background: "var(--m-beige)" }}>
                “{q}”
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Reasons (listicle) */}
      {c.reasons && c.reasons.length > 0 && (
        <section className="relative bg-white px-6 py-10">
          <Prov
            show={sp}
            tags={[
              { type: "ad-analysis", note: "quotes from ad transcript" },
              { type: "internal-data", note: "AB-2026-14 creator depth" },
            ]}
          />
          <div className="mx-auto max-w-2xl space-y-8">
            {c.reasons.map((r) => (
              <div key={r.n} className="flex gap-4">
                <div className="lp-stat shrink-0 text-4xl font-semibold" style={{ color: accent }}>
                  {r.n}
                </div>
                <div>
                  <h3 className="lp-serif text-lg leading-snug">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{r.body}</p>
                  {r.creatorQuote && (
                    <blockquote className="mt-3 rounded-xl p-3 text-sm italic" style={{ background: "var(--m-lavender)" }}>
                      “{r.creatorQuote}”
                    </blockquote>
                  )}
                  {r.tag && (
                    <span
                      className="mt-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                      style={{ background: accent }}
                    >
                      {r.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Before / after */}
      {c.beforeAfter && (
        <section className="relative px-6 py-10 text-center" style={{ background: "var(--m-beige)" }}>
          <Prov
            show={sp}
            tags={[
              { type: "maelys-site", note: "real clinical B/A photo" },
              { type: "generated", note: "quotes" },
            ]}
          />
          <h2 className="lp-serif mx-auto max-w-lg text-2xl">{c.beforeAfter.h2}</h2>
          <div className={`mx-auto mt-6 grid max-w-3xl gap-4 ${mobile ? "" : "grid-cols-3"}`}>
            {c.beforeAfter.cards.map((card, i) => (
              <div key={i} className="rounded-2xl bg-white p-3 text-left shadow-sm">
                {i === 0 && baOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={MAELYS_ASSETS.beforeAfter56}
                    alt="Day 1 vs Day 56 clinical before/after"
                    className="w-full rounded-xl"
                    onError={() => setBaOk(false)}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    <ImagePlaceholder label="Before" h={110} tone="beige" />
                    <ImagePlaceholder label="After" h={110} tone="pink" />
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {card.tags.map((t) => (
                    <span key={t} className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase" style={{ background: "var(--m-light-pink)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs italic leading-relaxed text-black/70">“{card.quote}”</p>
                <div className="mt-1 text-[10px] font-semibold text-black/50">{card.attribution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mechanism */}
      {c.mechanism && (
        <section className="relative bg-white px-6 py-10 text-center">
          <Prov
            show={sp}
            tags={[
              { type: "maelys-site", note: "texture asset + ingredient facts" },
              { type: "ad-analysis", note: "claims hedged from ad" },
            ]}
          />
          <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--m-purple)" }}>
            {c.mechanism.eyebrow}
          </div>
          <h2 className="lp-serif mx-auto mt-2 max-w-lg text-2xl">{c.mechanism.h2}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-black/60">{c.mechanism.sub}</p>
          <div className={`mx-auto mt-6 grid max-w-3xl items-center gap-4 ${mobile ? "" : "grid-cols-[240px_1fr]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MAELYS_ASSETS.texture} alt="GET-DREAMY whipped texture" className="mx-auto w-full max-w-[240px] rounded-2xl" />
            <div className="grid gap-3 sm:grid-cols-2">
              {c.mechanism.cards.map((card) => (
                <div key={card.title} className="rounded-2xl p-5 text-left" style={{ background: "var(--m-pale-pink)" }}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clinical stats */}
      <section className="relative px-6 py-12 text-center text-white" style={{ background: "var(--m-text)" }}>
        <Prov
          show={sp}
          tags={[
            { type: "maelys-site", note: "real 90/83/80 trial stats" },
            { type: "internal-data", note: "AB-2026-07 stats before offer" },
          ]}
        />
        <div className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--m-cta)" }}>
          {c.clinicalStats.eyebrow}
        </div>
        <h2 className="lp-serif mx-auto mt-2 max-w-lg text-2xl">{c.clinicalStats.h2}</h2>
        <div className={`mx-auto mt-8 grid max-w-2xl gap-6 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
          {c.clinicalStats.stats.map((s) => (
            <div key={s.label}>
              <div className="lp-stat text-6xl font-semibold" style={{ color: "var(--m-cta)" }}>
                {s.pct}%
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-[10px] text-white/50">{c.clinicalStats.footnote}</div>
      </section>

      {/* Offer */}
      <section className="relative px-6 py-12" style={{ background: "var(--m-pink)" }}>
        <Prov
          show={sp}
          tags={[
            { type: "maelys-site", note: "real TBYB offer + prices" },
            { type: "internal-data", note: "AB-2026-11 single price frame" },
          ]}
        />
        <h2 className="lp-serif mx-auto max-w-lg text-center text-2xl">{c.offer.headline}</h2>
        <div className="mx-auto mt-6 max-w-md space-y-3">
          <label className="block cursor-pointer rounded-2xl border-2 bg-white p-4" style={{ borderColor: accent }}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="inline-block h-4 w-4 rounded-full border-4" style={{ borderColor: accent }} />
                {c.offer.subscribeLabel}
              </span>
              <span className="text-xs font-bold">{c.offer.subscribePrice}</span>
            </div>
            <ul className="mt-3 space-y-1 pl-6 text-xs text-black/70">
              {c.offer.subscribePerks.map((p) => (
                <li key={p}>
                  <span style={{ color: "var(--m-success)" }}>✓</span> {p}
                </li>
              ))}
            </ul>
          </label>
          <label className="block cursor-pointer rounded-2xl border-2 border-black/10 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="inline-block h-4 w-4 rounded-full border-2 border-black/30" />
                {c.offer.oneTimeLabel}
              </span>
              <span className="text-xs font-bold">{c.offer.oneTimePrice}</span>
            </div>
          </label>
          <div className="pt-2 text-center">
            <Cta text={c.offer.ctaText} big />
            <div className="mt-2 text-xs text-black/60">{c.offer.subLine}</div>
            <div className="mt-1 text-xs font-semibold">{c.offer.guaranteeLine}</div>
          </div>
        </div>
      </section>

      {/* Emotional close */}
      <section className="relative bg-white px-6 py-12 text-center">
        <Prov show={sp} tags={[{ type: "ad-analysis", note: "emotional drivers" }]} />
        <h2 className="lp-serif mx-auto max-w-md text-2xl">{c.emotionalClose.h2}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70">{c.emotionalClose.body}</p>
      </section>

      {/* Reviews */}
      <section className="relative px-6 py-10" style={{ background: "var(--m-beige)" }}>
        <Prov show={sp} tags={[{ type: "generated", note: "prod: Yotpo reviews by angle" }]} />
        <h2 className="lp-serif text-center text-2xl">{c.reviews.h2}</h2>
        <div className={`mx-auto mt-6 grid max-w-3xl gap-3 ${mobile ? "" : "grid-cols-3"}`}>
          {c.reviews.items.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
              <Stars />
              {r.tag && <div className="mt-1 text-xs font-semibold">{r.tag}</div>}
              <p className="mt-2 text-xs leading-relaxed text-black/70">“{r.quote}”</p>
              <div className="mt-2 text-[10px] font-semibold text-black/50">
                {r.name}
                {r.age ? `, ${r.age}` : ""} · Verified Buyer
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      {c.howToUse && (
        <section className="relative bg-white px-6 py-10 text-center">
          <Prov show={sp} tags={[{ type: "maelys-site", note: "usage steps pattern" }]} />
          <h2 className="lp-serif mx-auto max-w-md text-2xl">{c.howToUse.h2}</h2>
          <div className={`mx-auto mt-6 grid max-w-2xl gap-4 ${mobile ? "" : "grid-cols-3"}`}>
            {c.howToUse.steps.map((s, i) => (
              <div key={i} className="rounded-2xl p-4 text-left" style={{ background: "var(--m-lavender)" }}>
                <div className="lp-stat text-2xl" style={{ color: "var(--m-purple)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 text-xs font-bold uppercase tracking-wide">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-black/70">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative bg-white px-6 py-10">
        <Prov show={sp} tags={[{ type: "internal-data", note: "AB-2026-19 objection order" }]} />
        <h2 className="lp-serif text-center text-2xl">{c.faq.h2}</h2>
        <div className="mx-auto mt-5 max-w-xl space-y-2">
          {c.faq.items.map((f) => (
            <details key={f.q} className="rounded-xl border border-black/10 p-4">
              <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Guarantee */}
      <section className="relative px-6 py-12 text-center" style={{ background: "var(--m-pale-pink)" }}>
        <Prov show={sp} tags={[{ type: "maelys-site", note: "real guarantee terms" }]} />
        <h2 className="lp-serif mx-auto max-w-md text-2xl">{c.guarantee.h2}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70">{c.guarantee.body}</p>
        <div className="mt-6">
          <Cta text={c.hero.ctaText} big />
        </div>
      </section>

      {/* Footer */}
      <div className="px-6 py-6 text-center text-[10px] text-white/60" style={{ background: "var(--m-text)" }}>
        © MAËLYS Cosmetics · Results may vary. Statements reflect participant self-assessment. ·{" "}
        <span className="text-white/40">Generated by Creative Loop (prototype)</span>
      </div>

      {/* Sticky ATC bar */}
      <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur">
        {sp && (
          <span
            className="absolute -top-2.5 right-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow"
            style={{ background: PROV_STYLE["internal-data"].bg }}
          >
            internal data · AB-2026-03 sticky ATC +9%
          </span>
        )}
        <span className="text-xs font-semibold">{c.stickyBar.text}</span>
        <Cta text={c.stickyBar.ctaText} />
      </div>
    </div>
  );
}
