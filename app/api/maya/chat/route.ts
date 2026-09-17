import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_LENGTH = 12;

function publicApiUrl() {
  const configured = process.env.MAYA_PUBLIC_API_URL || process.env.MAYA_API_URL;
  if (!configured) return null;
  return configured.replace(/\/$/, "") + "/api/public/maya/chat";
}

export async function POST(request: Request) {
  const endpoint = publicApiUrl();
  if (!endpoint) {
    return NextResponse.json({ success: false, error: "Maya is temporarily unavailable." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const input = body as { message?: unknown; history?: unknown };
  const message = typeof input.message === "string" ? input.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  if (!message) {
    return NextResponse.json({ success: false, error: "A message is required." }, { status: 400 });
  }

  const history = Array.isArray(input.history)
    ? input.history.slice(-MAX_HISTORY_LENGTH).map((item) => {
        const entry = item as { role?: unknown; content?: unknown };
        return {
          role: entry.role === "assistant" ? "assistant" : "user",
          content: typeof entry.content === "string" ? entry.content.trim().slice(0, 1600) : "",
        };
      }).filter((item) => item.content)
    : [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, error: "Maya is temporarily unavailable." },
        { status: upstream.status >= 500 ? 502 : upstream.status }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, error: "Maya is temporarily unavailable." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
