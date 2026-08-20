import { NextRequest, NextResponse } from "next/server";
import { ai, VEO_MODEL } from "@/lib/gemini";
import { checkAccess } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 300;

// POST { prompt } -> starts a Veo generation, returns the operation (JSON).
// POST { operation } -> polls; when done, returns the video as base64 (no
// filesystem writes — serverless hosts have a read-only public/).
export async function POST(req: NextRequest) {
  const denied = checkAccess(req);
  if (denied) return denied;
  try {
    const body = await req.json();
    const g = ai();

    if (body.prompt) {
      let operation;
      try {
        operation = await g.models.generateVideos({
          model: VEO_MODEL,
          prompt: body.prompt,
          config: { aspectRatio: "9:16", numberOfVideos: 1 },
        });
      } catch (e) {
        // Some Veo models only support 16:9 — retry once.
        if (String(e).toLowerCase().includes("aspect")) {
          operation = await g.models.generateVideos({
            model: VEO_MODEL,
            prompt: body.prompt,
            config: { aspectRatio: "16:9", numberOfVideos: 1 },
          });
        } else throw e;
      }
      return NextResponse.json({ operation });
    }

    if (body.operation?.name) {
      // Poll via REST: the SDK's operation objects don't survive JSON
      // round-trips through the client.
      const apiKey = process.env.GOOGLE_API_KEY!;
      const opRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${body.operation.name}`,
        { headers: { "x-goog-api-key": apiKey } }
      );
      const op = await opRes.json();
      if (!opRes.ok) {
        return NextResponse.json(
          { error: `Poll failed: ${JSON.stringify(op.error ?? op)}` },
          { status: 500 }
        );
      }
      if (!op.done) {
        return NextResponse.json({ operation: { name: body.operation.name }, done: false });
      }
      if (op.error) {
        return NextResponse.json(
          { error: `Veo generation failed: ${JSON.stringify(op.error)}` },
          { status: 500 }
        );
      }
      const resp = op.response ?? {};
      const videoUri =
        resp.generateVideoResponse?.generatedSamples?.[0]?.video?.uri ??
        resp.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) {
        return NextResponse.json(
          { error: `Veo returned no video (possibly safety-filtered): ${JSON.stringify(resp).slice(0, 300)}` },
          { status: 500 }
        );
      }
      const dl = await fetch(videoUri, { headers: { "x-goog-api-key": apiKey }, redirect: "follow" });
      if (!dl.ok) {
        return NextResponse.json({ error: `Video download failed (${dl.status})` }, { status: 500 });
      }
      const buf = Buffer.from(await dl.arrayBuffer());
      return NextResponse.json({ done: true, videoBase64: buf.toString("base64") });
    }

    return NextResponse.json({ error: "prompt or operation required" }, { status: 400 });
  } catch (e) {
    console.error("generate-video error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
