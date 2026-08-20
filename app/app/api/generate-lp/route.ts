import { NextRequest, NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini";
import { lpPrompt } from "@/lib/prompts";
import type { GenerateLpResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { analysis, archetype } = await req.json();
    if (!analysis || !archetype)
      return NextResponse.json({ error: "analysis and archetype required" }, { status: 400 });
    const result = await generateJson<GenerateLpResponse>(lpPrompt(analysis, archetype), 0.8);
    return NextResponse.json(result);
  } catch (e) {
    console.error("generate-lp error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
