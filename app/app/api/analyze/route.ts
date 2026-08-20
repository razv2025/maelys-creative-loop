import { NextRequest, NextResponse } from "next/server";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { uploadVideo, generateJsonFromVideo } from "@/lib/gemini";
import { ANALYSIS_PROMPT } from "@/lib/prompts";
import type { CreativeAnalysis } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    let filePath: string;
    let cleanup: string | null = null;

    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
      if (file.size > 200 * 1024 * 1024)
        return NextResponse.json({ error: "File too large (max 200MB)" }, { status: 400 });
      const buf = Buffer.from(await file.arrayBuffer());
      filePath = path.join(os.tmpdir(), `ad-upload-${Date.now()}.mp4`);
      await fs.writeFile(filePath, buf);
      cleanup = filePath;
    } else {
      const { demo } = await req.json();
      const name = path.basename(String(demo ?? ""));
      if (!name.endsWith(".mp4"))
        return NextResponse.json({ error: "Invalid demo name" }, { status: 400 });
      filePath = path.join(process.cwd(), "public", "demo-ads", name);
    }

    const uploaded = await uploadVideo(filePath);
    const analysis = await generateJsonFromVideo<CreativeAnalysis>(
      uploaded.uri!,
      uploaded.mimeType ?? "video/mp4",
      ANALYSIS_PROMPT
    );

    if (cleanup) await fs.unlink(cleanup).catch(() => {});
    return NextResponse.json({ analysis });
  } catch (e) {
    console.error("analyze error", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
