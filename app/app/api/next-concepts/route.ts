import { NextRequest, NextResponse } from "next/server";
import { streamJson } from "@/lib/gemini";
import { nextConceptsPrompt } from "@/lib/prompts";
import { competitorPromptBlock } from "@/lib/grounding";
import { checkAccess } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 300;

// Streamed for the same serverless-timeout reason as generate-lp.
export async function POST(req: NextRequest) {
  const denied = checkAccess(req);
  if (denied) return denied;
  try {
    const { analysis, learnings } = await req.json();
    if (!analysis || !learnings)
      return NextResponse.json({ error: "analysis and learnings required" }, { status: 400 });
    return streamJson(nextConceptsPrompt(analysis, learnings, competitorPromptBlock()), 0.9);
  } catch (e) {
    console.error("next-concepts error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
