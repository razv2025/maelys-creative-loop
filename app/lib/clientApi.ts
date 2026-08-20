"use client";

// Client-side API helper: attaches the access code (if the user entered one)
// and surfaces 401s as a typed error so the UI can prompt for the code.

export class NeedCodeError extends Error {
  constructor() {
    super("Access code required");
    this.name = "NeedCodeError";
  }
}

export function getAccessCode(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("cl-access-code") ?? "";
}

export function setAccessCode(code: string) {
  localStorage.setItem("cl-access-code", code);
}

export async function api<T = unknown>(path: string, body: BodyInit | object): Promise<T> {
  const headers: Record<string, string> = { "x-access-code": getAccessCode() };
  let payload: BodyInit;
  if (body instanceof FormData) {
    payload = body;
  } else {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  const res = await fetch(path, { method: "POST", headers, body: payload });
  const json = await res.json();
  if (res.status === 401 && json.needCode) {
    window.dispatchEvent(new CustomEvent("cl-need-code"));
    throw new NeedCodeError();
  }
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json as T;
}

/** Decode a base64 mp4 into an object URL for a <video> element. */
export function base64ToVideoUrl(b64: string): string {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
}
