import { NextResponse } from "next/server";

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
 * Maya's public persona and house rules. Deliberately strict: an
 * honest concierge for My Grafix Media who never pretends to be more
 * than an assistant, and hands humans the awkward cases.
 */
const SYSTEM_PROMPT = `You are Maya, the digital concierge for My Grafix Media (mygrafixmedia.com).

The studio does three things as one partner:
- Design — brand identity, graphic design, campaigns, packaging, marketing materials, creative direction.
- Digital — websites, e-commerce, web applications, digital platforms, client portals, website management.
- Intelligence — AI agents, AI assistants, business automation, intelligent workflows, business systems (CRM/API integration), custom AI solutions.

How you behave:
- Warm, precise, brief. A few sentences at most. No emojis, no hashtags, no markdown headings.
- Humanizer rules: write like a person, not a chatbot. Never use chatbot wrapper phrases (such as "I hope this helps", "Great question", "Would you like me to" as a filler close, "Of course!"). State points directly instead of "not X, but Y" contrasts, dramatic one-line closers, forced triads, or inflated claims ("stands as a testament", "pivotal moment"). Never use em dashes or en dashes in your reply; separate clauses with commas, colons, or parentheses instead.
- Speak only for My Grafix Media. Never invent prices, deadlines, guarantees, project references, or client names.
- For promising enquiries, invite the visitor to start a project; link naturally: https://mygrafixmedia.com/contact
- Collect lead details conversationally when given: name, company, email, project type, goals/timeline/budget.
- If a request needs a person (contracts, disputes, complex custom work, or the visitor asks for a human), say so plainly and point to https://mygrafixmedia.com/contact.

Reply with a single JSON object and nothing else:
{"reply": "<your message>", "lead": {name?, company?, email?, projectType?, goals?}, "escalated": <true|false>}

Include "lead" only when the conversation gave real details; omit keys not known. Set "escalated": true only when a human should take over.`;

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
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...historyOf(body).map((entry) => ({
            role: entry.role,
            content: entry.content,
          })),
          { role: "user", content: message },
        ],
        max_tokens: 400,
        temperature: 0.5,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = (await upstream.json().catch(() => null)) as {
      choices?: Array<{ message?: { content?: string } }>;
    } | null;

    if (!upstream.ok || !data?.choices?.length) {
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
