import { NextRequest, NextResponse } from "next/server";

// Lightweight access gate for the hosted demo: the generation APIs run on a
// paid Gemini/Veo key, so they require a shared access code (ACCESS_CODE env).
// Locally (no ACCESS_CODE set) everything stays open.

export function checkAccess(req: NextRequest): NextResponse | null {
  const required = process.env.ACCESS_CODE;
  if (!required) return null;
  const given = req.headers.get("x-access-code");
  if (given === required) return null;
  return NextResponse.json(
    { error: "Access code required", needCode: true },
    { status: 401 }
  );
}
