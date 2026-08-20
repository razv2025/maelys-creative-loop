// Real MAËLYS creative assets, extracted from the 5 live GET-DREAMY landing
// pages scraped on 2026-08-20 (see research/lp-analysis.md). Served from
// MAËLYS's own wown CDN — every use is provenance-labeled in the UI as
// "maelyscosmetics.com". In production this is the DAM/asset-service layer.

const CDN = "https://wown.maelyscosmetics.com/api/assets/maelys-ec";

export const MAELYS_ASSETS = {
  logo: `${CDN}/a4aa66ef-ee82-41e3-b579-e3e77411098c/logo-black.svg`,
  heroGeneric: `${CDN}/92189ae2-3b8a-4997-b959-e24d914919cf/generic-d-v1.png`, // woman + jar, bedside lamp, dark-left for text overlay
  heroGenericMobile: `${CDN}/e86d4d89-fb7a-40bc-b107-674849241028/generic-m-v1.png`,
  heroCaroline: `${CDN}/ec689a0a-74d4-4845-8b31-38bb7ade31c6/caroline-banner-desktop-v2-x1and5.png`,
  jar: `${CDN}/045cb96c-d076-43cf-bda6-7ab0440cb2a9/get-dreamy.png`, // clean product shot
  beforeAfter56: `${CDN}/7dbe413e-9d1f-4a3d-a5a0-6b92d81b570b/slider-3.jpg`, // real Day 1 → Day 56
  beforeAfterBelly: `${CDN}/18958851-253a-4bfc-b221-c8c59b8b7413/get-dreamy-caroline-loose-skin-slide-1.png`, // real Day 1/56, anonymous body
  howToSteps: [
    `${CDN}/6d52a479-1020-4d0b-a407-fa2d3dbba8f1/tab-1-step-1.png`, // apply the whip
    `${CDN}/b1f59021-3823-4a5e-953c-fb06f075fc26/tab-1-step-2-.png`, // massage in
    `${CDN}/1c33638d-45a3-4992-bc9f-0e3d44552f95/tab-1-step-3.png`, // overnight
  ],
  // Caroline Baudino's likeness — use ONLY when the analyzed ad actually
  // features Caroline (creator-likeness rights are per-campaign).
  carolinePortrait: `${CDN}/02dbb054-4623-4a0e-9a37-f8d38b8c27f4/reasons-3-var-2-desktop.png`,
  texture: `${CDN}/c3d83cb9-139a-4b29-a4e7-34b954ac9f89/slider-5.jpg`, // whipped texture, "Clinically proven to"
  statsCard: `${CDN}/1c1337e4-5984-462e-9e67-5661018a5286/slider-7.jpg`, // 90/83/80 card with jar in hand
  ultaBadge: `${CDN}/b1164112-dab1-4bff-8bb2-010ae3059f98/get-dreamy-ulta.png`,
  press: {
    Allure: `${CDN}/51ed9c98-da9a-4082-9ebd-af3a2a74d96b/allure-logo.svg`,
    InStyle: `${CDN}/fedad89c-163d-4c25-a064-4fcb356b6bec/in-style-logo.svg`,
    Forbes: `${CDN}/825dcd9b-e440-49e1-b127-a11e5b293652/forbes-logo.svg`,
    "Yahoo!": `${CDN}/7298e4e1-94fa-4eba-bffd-b544c60b100a/yahoo-logo.svg`,
    TODAY: `${CDN}/018e3c24-9e33-479e-9f10-e2de35e8cde6/today-logo.svg`,
    Bazaar: `${CDN}/66e28003-f76c-4128-ba70-00bc00d5f968/bazaar.svg`,
  } as Record<string, string>,
};

export const ASSET_SOURCE_LABEL = "maelyscosmetics.com · scraped 2026-08-20";
