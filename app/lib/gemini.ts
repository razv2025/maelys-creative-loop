import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

export const ANALYSIS_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
export const COPY_MODEL = process.env.GEMINI_COPY_MODEL || ANALYSIS_MODEL;
export const VEO_MODEL = process.env.VEO_MODEL || "veo-3.1-fast-generate-preview";

let client: GoogleGenAI | null = null;

export function ai(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Add it to app/.env.local (GOOGLE_API_KEY=...)"
    );
  }
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
}

/** Upload a local video file to the Gemini Files API and wait until ACTIVE. */
export async function uploadVideo(filePath: string, mimeType = "video/mp4") {
  const g = ai();
  let file = await g.files.upload({ file: filePath, config: { mimeType } });
  const deadline = Date.now() + 180_000;
  while (file.state === "PROCESSING") {
    if (Date.now() > deadline) throw new Error("Video processing timed out");
    await new Promise((r) => setTimeout(r, 3000));
    file = await g.files.get({ name: file.name! });
  }
  if (file.state !== "ACTIVE") {
    throw new Error(`Video upload failed (state=${file.state})`);
  }
  return file;
}

/** Retry transient API failures (503 high demand / 429 rate limit) with backoff. */
async function withRetry<T>(fn: () => Promise<T>, tries = 4): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = String(e);
      const transient = /"code":\s*(503|429)|UNAVAILABLE|RESOURCE_EXHAUSTED|overloaded|high demand/i.test(msg);
      if (!transient || i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 4000 * (i + 1)));
    }
  }
  throw lastErr;
}

/** Call Gemini with a video part + prompt, expecting a JSON object back. */
export async function generateJsonFromVideo<T>(
  fileUri: string,
  mimeType: string,
  prompt: string
): Promise<T> {
  const g = ai();
  const res = await withRetry(() =>
    g.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: createUserContent([createPartFromUri(fileUri, mimeType), prompt]),
      config: { responseMimeType: "application/json", temperature: 0.4 },
    })
  );
  return parseJson<T>(res.text ?? "");
}

/** Text-only JSON generation. */
export async function generateJson<T>(prompt: string, temperature = 0.7): Promise<T> {
  const g = ai();
  const res = await withRetry(() =>
    g.models.generateContent({
      model: COPY_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature },
    })
  );
  return parseJson<T>(res.text ?? "");
}

/** Defensive JSON parsing: strips code fences and trailing junk. */
export function parseJson<T>(text: string): T {
  let t = text.trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start > 0 || (end > -1 && end < t.length - 1)) {
    t = t.slice(start, end + 1);
  }
  try {
    return JSON.parse(t) as T;
  } catch (e) {
    throw new Error(
      `Model returned unparseable JSON (${(e as Error).message}). First 200 chars: ${t.slice(0, 200)}`
    );
  }
}
