import { NextRequest, NextResponse } from "next/server";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { ai, generateJsonFromVideo } from "@/lib/gemini";
import { ANALYSIS_PROMPT } from "@/lib/prompts";
import { checkAccess } from "@/lib/auth";
import type { CreativeAnalysis } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

// Phased to fit serverless response-timeout limits (Amplify SSR ≈ 30s):
//   phase "upload"  — demo name or multipart file → upload to Gemini Files API
//   phase "status"  — poll the file until ACTIVE
//   phase "generate"— run the video-understanding call → CreativeAnalysis
export async function POST(req: NextRequest) {
  const denied = checkAccess(req);
  if (denied) return denied;
  try {
    const g = ai();
    const contentType = req.headers.get("content-type") ?? "";

    // ---- upload (multipart) ----
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
      if (file.size > 100 * 1024 * 1024)
        return NextResponse.json({ error: "File too large (max 100MB)" }, { status: 400 });
      const tmp = path.join(os.tmpdir(), `ad-upload-${Date.now()}.mp4`);
      await fs.writeFile(tmp, Buffer.from(await file.arrayBuffer()));
      const uploaded = await g.files.upload({ file: tmp, config: { mimeType: file.type || "video/mp4" } });
      await fs.unlink(tmp).catch(() => {});
      return NextResponse.json({ file: fileInfo(uploaded) });
    }

    const body = await req.json();

    // ---- upload (demo video, fetched from our own static origin) ----
    if (body.phase === "upload" && body.demo) {
      const name = path.basename(String(body.demo));
      if (!name.endsWith(".mp4"))
        return NextResponse.json({ error: "Invalid demo name" }, { status: 400 });
      // Local dev has the file on disk; hosted serverless doesn't ship public/,
      // so fall back to fetching it from our own CDN origin.
      const localPath = path.join(process.cwd(), "public", "demo-ads", name);
      let tmp = localPath;
      try {
        await fs.access(localPath);
      } catch {
        const url = new URL(`/demo-ads/${name}`, req.nextUrl.origin).toString();
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Could not fetch demo video (${res.status})`);
        tmp = path.join(os.tmpdir(), `demo-${Date.now()}-${name}`);
        await fs.writeFile(tmp, Buffer.from(await res.arrayBuffer()));
      }
      const uploaded = await g.files.upload({ file: tmp, config: { mimeType: "video/mp4" } });
      if (tmp !== localPath) await fs.unlink(tmp).catch(() => {});
      return NextResponse.json({ file: fileInfo(uploaded) });
    }

    // ---- status poll ----
    if (body.phase === "status" && body.fileName) {
      const f = await g.files.get({ name: body.fileName });
      return NextResponse.json({ file: fileInfo(f) });
    }

    // ---- generate ----
    if (body.phase === "generate" && body.fileUri) {
      const analysis = await generateJsonFromVideo<CreativeAnalysis>(
        body.fileUri,
        body.mimeType ?? "video/mp4",
        ANALYSIS_PROMPT
      );
      return NextResponse.json({ analysis });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (e) {
    console.error("analyze error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

function fileInfo(f: { name?: string; uri?: string; mimeType?: string; state?: unknown }) {
  return { name: f.name, uri: f.uri, mimeType: f.mimeType, state: String(f.state ?? "") };
}
