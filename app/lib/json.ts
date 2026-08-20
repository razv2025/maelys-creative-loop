// Defensive JSON parsing shared by server and client: strips code fences and
// junk, repairs the glitches models occasionally emit even in JSON mode.

export function parseJsonLoose<T>(text: string): T {
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
  } catch {
    try {
      return JSON.parse(repairJson(t)) as T;
    } catch (e) {
      throw new Error(
        `Model returned unparseable JSON (${(e as Error).message}). First 200 chars: ${t.slice(0, 200)}`
      );
    }
  }
}

/**
 * Repair common model glitches: raw newlines/tabs inside string literals,
 * unescaped inner quotes, trailing commas.
 */
export function repairJson(t: string): string {
  let out = "";
  let inStr = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (!inStr) {
      if (ch === '"') inStr = true;
      out += ch;
      continue;
    }
    if (ch === "\\") {
      out += ch + (t[i + 1] ?? "");
      i++;
    } else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (ch === '"') {
      const rest = t.slice(i + 1).match(/^\s*([,}\]:])/);
      if (rest) {
        inStr = false;
        out += ch;
      } else {
        out += '\\"';
      }
    } else out += ch;
  }
  return out.replace(/,(\s*[}\]])/g, "$1");
}
