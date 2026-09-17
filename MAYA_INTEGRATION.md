# Maya website assistant integration

## Architecture

The website renders Maya from `components/maya/MayaAssistant.tsx` and sends messages to the same-origin Next.js route:

`POST /api/maya/chat` â†’ `MAYA_API_URL/api/public/maya/chat`

The browser never receives `MAYA_API_KEY`, OpenRouter credentials, Telegram credentials, or Worker internals.

The public Worker route is implemented in the related `mygrafix-dashboard-worker` project:

`POST /api/public/maya/chat`

It uses the existing Worker rate limiter, server-side OpenRouter access, bounded conversation history, and a strict My Grafix knowledge prompt. It can notify Telegram when Maya marks a conversation as requiring human input.

## Required Worker secrets/configuration

The Worker deployment must have:

- `OPENROUTER_API_KEY` â€” existing server-side AI provider secret
- `TELEGRAM_BOT_TOKEN` â€” required for Telegram escalation
- `TELEGRAM_HOME_CHANNEL` or `MAYA_ESCALATION_CHAT_ID` â€” internal Telegram destination
- `PUBLIC_MAYA_MODEL` â€” optional; otherwise `OPENROUTER_MODEL` or `openai/gpt-4o-mini` is used
- `APP_URL` â€” optional; defaults to `https://mygrafixmedia.com`

The website only needs its existing `MAYA_API_URL`, pointing at the Worker root. `MAYA_PUBLIC_API_URL` may be used to override that root if needed.

## Deployment boundary

The Worker source change has been validated with `wrangler deploy --dry-run` but has **not** been deployed automatically. Deploy the related Worker after reviewing the new handler and configuring the secrets. Until then, the website displays a human-friendly connection fallback and links to `/contact`.

## Scope limits

The public assistant is read-only. It does not access dashboard data, execute tools, create records, or send outreach. Lead details are collected conversationally and included in an escalation message when Maya needs human guidance; a persistent lead CRM write can be added later through an explicitly designed backend endpoint.

## Voice ("Talk to Maya")

Voice is an interface layer over the same Maya agent — it adds no second
conversation history or intelligence. Speech recognition runs in the
browser (Web Speech API); replies are spoken through OpenRouter's
OpenAI-compatible speech endpoint using Fish Audio S2.1 Pro.

Flow:

`microphone ? browser speech recognition ? transcript ? shared Maya chat flow ? reply text ? POST /api/maya/speech ? OpenRouter /api/v1/audio/speech (Fish Audio) ? audio playback`

### New pieces

- `lib/tts.ts` — `TextToSpeechProvider` boundary plus the
  `OpenRouterFishAudioProvider`. Swap providers here without touching the
  voice UI or Maya logic.
- `app/api/maya/speech/route.ts` — same-origin proxy; receives `{ text }`,
  returns MP3 bytes. The OpenRouter key stays server-side. Nothing is
  cached or stored.
- `components/maya/useMayaVoice.ts` — explicit voice state machine
  (idle / listening / transcribing / speaking / unsupported /
  permission-denied / error), recognition + playback lifecycle, autoplay
  unlock, interruption (press the mic mid-reply to stop Maya and talk).
- `components/maya/MayaAssistant.tsx` — mic control and status line.
  Voice transcripts and text messages share the same conversation
  history; text chat is unchanged and still works when voice is
  unavailable (unsupported browsers keep the mic hidden and show a
  one-line fallback).

### Website configuration

- `OPENROUTER_API_KEY` — server-side secret for the website runtime
  (voice TTS). Never exposed to the browser.
- `OPENROUTER_TTS_MODEL` — optional. Defaults to
  `fish-audio/s2.1-pro-free:free` (current free development model);
  set to `fish-audio/s2.1-pro` in production.
- `MAYA_TTS_VOICE` — optional; Fish Audio voice id. Empty = model default.

Privacy: the microphone is only active between an explicit press and the
final transcript; nothing is recorded in the background, and no audio or
transcript is persisted.

## OpenRouter-only chat (current)

`POST /api/maya/chat` now calls OpenRouter `/api/v1/chat/completions`
directly from the same-origin route — the same provider as voice. The
Worker `/api/public/maya/chat` proxy is retained as legacy but is no
longer required: the Worker's Telegram escalation hook no longer runs,
and lead details flow back from the model JSON response shape the UI
already renders. The site's `/api/contact` route is unchanged and still
sends enquiries via `MAYA_API_URL` + `MAYA_CLIENT_ID`.

Website runtime configuration:

- `OPENROUTER_API_KEY` — required for both chat and voice.
- `OPENROUTER_CHAT_MODEL` — optional; default `openai/gpt-4o-mini`.
- `OPENROUTER_TTS_MODEL` — optional; default `fish-audio/s2.1-pro-free:free`.
- `MAYA_TTS_VOICE` — optional voice id; empty = model default.
- `MAYA_API_URL` + `MAYA_CLIENT_ID` — still required for the contact
  form, but no longer used by Maya chat.
