"use client";

import { useRef, useState } from "react";
import type { NextConcept } from "@/lib/types";

type VideoState =
  | { status: "idle" }
  | { status: "generating"; startedAt: number }
  | { status: "done"; url: string }
  | { status: "error"; message: string };

export default function NextIteration({ concepts }: { concepts: NextConcept[] }) {
  const [videos, setVideos] = useState<Record<string, VideoState>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  async function generate(concept: NextConcept) {
    setVideos((v) => ({ ...v, [concept.id]: { status: "generating", startedAt: Date.now() } }));
    try {
      const start = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: concept.veoPrompt }),
      });
      const startJson = await start.json();
      if (!start.ok) throw new Error(startJson.error ?? "Failed to start generation");
      let operation = startJson.operation;

      const poll = async () => {
        const res = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operation }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Generation failed");
        if (json.done && json.url) {
          setVideos((v) => ({ ...v, [concept.id]: { status: "done", url: json.url } }));
          return;
        }
        operation = json.operation;
        timers.current[concept.id] = setTimeout(() => poll().catch(fail), 8000);
      };
      const fail = (e: unknown) =>
        setVideos((v) => ({ ...v, [concept.id]: { status: "error", message: (e as Error).message } }));
      poll().catch(fail);
    } catch (e) {
      setVideos((v) => ({ ...v, [concept.id]: { status: "error", message: (e as Error).message } }));
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {concepts.map((c, i) => {
        const vs = videos[c.id] ?? { status: "idle" };
        const risk = ["Safe iteration", "New-hook test", "Exploratory swing"][i] ?? "Concept";
        return (
          <div key={c.id} className="flex flex-col rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-panel)] p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--chrome-muted)]">
                {risk}
              </span>
              <span className="text-[10px] text-[var(--chrome-muted)]">{c.format}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold">{c.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--chrome-muted)]">{c.hypothesis}</p>

            <div className="mt-3 rounded-lg bg-pink-400/10 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-300">Hook</div>
              <p className="mt-1 text-xs italic">“{c.hook}”</p>
            </div>

            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--chrome-muted)]">Script beats</div>
              <ol className="mt-1 space-y-1 text-xs">
                {c.scriptOutline.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[var(--chrome-muted)]">{j + 1}.</span> {b}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-2 text-[10px] text-emerald-300/80">↳ exploits: {c.basedOnLearning}</div>

            <details className="mt-3">
              <summary className="cursor-pointer text-[11px] font-semibold text-[var(--chrome-muted)]">
                Veo prompt (8s teaser)
              </summary>
              <p className="mt-1 whitespace-pre-wrap rounded-lg bg-black/30 p-2 text-[11px] leading-relaxed text-[var(--chrome-muted)]">
                {c.veoPrompt}
              </p>
            </details>

            <div className="mt-auto pt-4">
              {vs.status === "idle" && (
                <button
                  onClick={() => generate(c)}
                  className="w-full rounded-lg bg-[var(--m-purple)] py-2.5 text-xs font-semibold text-white transition hover:brightness-110"
                >
                  ▶ Generate 8s teaser with Veo
                </button>
              )}
              {vs.status === "generating" && (
                <div className="pulse-soft rounded-lg border border-[var(--m-purple)] py-2.5 text-center text-xs font-semibold text-[#b9b4f0]">
                  Veo is rendering… (~1–2 min)
                </div>
              )}
              {vs.status === "done" && (
                <video src={vs.url} controls loop className="w-full rounded-lg" />
              )}
              {vs.status === "error" && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">
                  {vs.message}
                  <button onClick={() => generate(c)} className="ml-2 underline">
                    retry
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
