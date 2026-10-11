import { NextResponse } from "next/server";
import { PROPOSED_SYSTEM_PROMPT } from "@/lib/maya-config";

// CAUTION: static type-checking here needs a Node `globalThis` shim —
// see AGENTS.md note in this same section. Do not "fix" in ways that ship
// untested production code.
export const runtime = "nodejs";

/**
 * Maya chat — direct OpenRouter (OpenAI-compatible) chat completion.
 * Same-origin route keeps the OpenRouter key server-side. Voice shares
 * this same agent; it is only another input/output interface.
 */

export const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_LENGTH = 12;
const MAX_REPLY_LENGTH = 1600;

/**
 * Maya's persona and house rules are imported from lib/maya-config.ts.
 */

function chatModel() {
  return process.env.OPENROUTER_CHAT_MODEL || "openai/gpt-4o-mini";
}

type HistoryEntry = { role: "user" | "assistant"; content: string };

function historyOf(input: unknown): HistoryEntry[] {
  const raw = (input as { history?: unknown }).history;
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-MAX_HISTORY_LENGTH)
    .map((item): HistoryEntry => {
      const entry = item as { role?: unknown; content?: unknown };
      return {
        role: entry.role === "assistant" ? "assistant" : "user",
        content: typeof entry.content === "string" ? entry.content.trim().slice(0, 1600) : "",
      };
    })
    .filter((item) => item.content);
}

/**
 * The model replies as a JSON object per the system prompt, but never
 * trust it blindly: pull the reply out of whatever came back, and only
 * pass on a plausible lead/escalation.
 */
function parseReply(raw: string) {
  let text = raw.trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenced) text = fenced[1].trim();

  const start = text.indexOf("{");
  const candidate = start >= 0 ? text.slice(start) : null;

  if (candidate) {
    try {
      const parsed = JSON.parse(candidate) as {
        reply?: unknown;
        lead?: unknown;
        escalated?: unknown;
      };
      const reply =
        typeof parsed.reply === "string"
          ? parsed.reply.trim().slice(0, MAX_REPLY_LENGTH)
          : "";
      if (reply) {
        return {
          reply,
          lead: (parsed.lead && typeof parsed.lead === "object" ? parsed.lead : undefined) as
            | Record<string, unknown>
            | undefined,
          escalated: parsed.escalated === true,
        };
      }
    } catch {
      /* fall through to raw text */
    }
  }

  return { reply: text.slice(0, MAX_REPLY_LENGTH), lead: undefined, escalated: false };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Maya is temporarily unavailable." },
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

  const message =
    typeof (body as { message?: unknown }).message === "string"
      ? (body as { message: string }).message.trim().slice(0, MAX_MESSAGE_LENGTH)
      : "";
  if (!message) {
    return NextResponse.json(
      { success: false, error: "A message is required." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const history = historyOf(body);

    // The messages array for OpenRouter. We must avoid duplicating the current
    // user message if it's already the last entry in the history sent by the
    // frontend, and ensure the conversation starts with a user message if
    // the system prompt is followed by an assistant message (welcome).
    const apiMessages: any[] = [
      { role: "system", content: PROPOSED_SYSTEM_PROMPT }
    ];

    // Add history entries, but avoid duplicating the current message at the end
    for (let i = 0; i < history.length; i++) {
      const entry = history[i];
      // If this is the last entry in history and it matches the current message,
      // skip it because we'll append the message explicitly below (or vice versa).
      if (i === history.length - 1 && entry.role === "user" && entry.content === message) {
        continue;
      }
      apiMessages.push({ role: entry.role, content: entry.content });
    }

    // Always append the current user message last to ensure the latest input is processed
    apiMessages.push({ role: "user", content: message });

    const upstream = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "HTTP-Referer": "https://mygrafixmedia.com",
        "X-Title": "My Grafix Media",
      },
      body: JSON.stringify({
        model: chatModel(),
        messages: apiMessages,
        max_tokens: 400,
        temperature: 0.5,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = (await upstream.json().catch(() => null)) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string; code?: number };
    } | null;

    if (!upstream.ok || !data?.choices?.length) {
      const errorDetail = data?.error?.message || upstream.statusText || "Unknown error";
      console.error(`[Maya API Error] ${upstream.status}: ${errorDetail}`);

      return NextResponse.json(
        { success: false, error: "Maya is temporarily unavailable." },
        { status: upstream.status >= 500 ? 502 : 502 }
      );
    }

    const raw = data.choices[0]?.message?.content ?? "";
    const parsed = parseReply(raw || "");

    return NextResponse.json(
      {
        success: true,
        data: {
          reply: parsed.reply || "I’m here, try me again in a moment.",
          ...(parsed.lead ? { lead: parsed.lead } : {}),
          escalated: parsed.escalated,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Maya is temporarily unavailable." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
