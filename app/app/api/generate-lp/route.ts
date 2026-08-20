import { NextRequest, NextResponse } from "next/server";
import { streamJson } from "@/lib/gemini";
import { lpPrompt } from "@/lib/prompts";
import { competitorPromptBlock, moduleLearningsPromptBlock } from "@/lib/grounding";
import { checkAccess } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 300;

// Streams the model's JSON as text chunks: long generations would hit
// serverless buffered-response timeouts (Amplify ≈30s); streaming sends
// bytes immediately. The client assembles + repairs + parses.
export async function POST(req: NextRequest) {
  const denied = checkAccess(req);
  if (denied) return denied;
  try {
    const { analysis, archetype, direction } = await req.json();
    if (!analysis || !archetype)
      return NextResponse.json({ error: "analysis and archetype required" }, { status: 400 });
    return streamJson(
      lpPrompt(
        analysis,
        archetype,
        moduleLearningsPromptBlock(archetype),
        competitorPromptBlock(),
        typeof direction === "string" ? direction.slice(0, 2000) : undefined
      ),
      0.8
    );
  } catch (e) {
    console.error("generate-lp error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
