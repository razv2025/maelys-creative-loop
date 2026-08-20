import { NextRequest, NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini";
import { nextConceptsPrompt } from "@/lib/prompts";
import type { NextConcept } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { analysis, learnings } = await req.json();
    if (!analysis || !learnings)
      return NextResponse.json({ error: "analysis and learnings required" }, { status: 400 });
    const result = await generateJson<{ concepts: NextConcept[] }>(
      nextConceptsPrompt(analysis, learnings),
      0.9
    );
    return NextResponse.json(result);
  } catch (e) {
    console.error("next-concepts error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
