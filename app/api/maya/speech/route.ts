import { NextResponse } from "next/server";
import { getTextToSpeechProvider } from "@/lib/tts";

export const runtime = "nodejs";

/**
 * Voice for Maya — same-origin waystation between the browser and the
 * text-to-speech provider. The browser sends text, receives audio bytes.
 * The provider key lives in server env only, and nothing is cached or
 * stored: each request is synthesized fresh.
 */

const MAX_TEXT_LENGTH = 800;

export async function POST(request: Request) {
  const provider = getTextToSpeechProvider();
  if (!provider) {
    return NextResponse.json(
      { success: false, error: "Voice is temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const input = body as { text?: unknown };
  const text = typeof input.text === "string" ? input.text.trim().slice(0, MAX_TEXT_LENGTH) : "";
  if (!text) {
    return NextResponse.json(
      { success: false, error: "Text is required." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const result = await provider.synthesize(text, { signal: controller.signal });
    return new NextResponse(result.audio, {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Voice is temporarily unavailable." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
