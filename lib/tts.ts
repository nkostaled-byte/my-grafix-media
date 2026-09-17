/**
 * TEXT-TO-SPEECH PROVIDER BOUNDARY
 *
 * Maya's voice output is an interface layer, not a hard dependency. The
 * voice UI and the Maya agent only ever talk to this module, so the
 * provider can be swapped without touching them again.
 *
 * Configuration is server-side only — the browser receives finished audio
 * bytes from the same-origin route, never a provider key.
 */

export type SpeechSynthesisResult = {
  /** Raw audio bytes in the requested format. */
  audio: ArrayBuffer;
  /** MIME type of `audio` (e.g. audio/mpeg). */
  contentType: string;
};

export interface TextToSpeechProvider {
  /** Stable identifier, surfaced for diagnostics. */
  readonly id: string;
  /** Synthesize speech from plain text. */
  synthesize(
    text: string,
    options?: { signal?: AbortSignal }
  ): Promise<SpeechSynthesisResult>;
}

const OPENROUTER_SPEECH_URL = "https://openrouter.ai/api/v1/audio/speech";

/**
 * Fish Audio S2.1 Pro, routed through OpenRouter's OpenAI-compatible
 * speech endpoint. The free S2.1 Pro development model is the default;
 * switch to the production model via OPENROUTER_TTS_MODEL when ready.
 */
class OpenRouterFishAudioProvider implements TextToSpeechProvider {
  readonly id = "openrouter-fish-audio";
  private apiKey: string;
  private model: string;
  private voice: string;

  constructor(apiKey: string, model: string, voice: string) {
    this.apiKey = apiKey;
    this.model = model;
    this.voice = voice;
  }

  async synthesize(
    text: string,
    options?: { signal?: AbortSignal }
  ): Promise<SpeechSynthesisResult> {
    const response = await fetch(OPENROUTER_SPEECH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        model: this.model,
        input: text,
        /* Fish Audio documents an empty voice as "model default". */
        voice: this.voice,
        response_format: "mp3",
      }),
      signal: options?.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `TTS provider responded ${response.status}`
      );
    }

    return {
      audio: await response.arrayBuffer(),
      contentType: response.headers.get("content-type") || "audio/mpeg",
    };
  }
}

/** Reads provider selection + configuration from server-side env. */
export function getTextToSpeechProvider(): TextToSpeechProvider | null {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const model =
    process.env.OPENROUTER_TTS_MODEL || "fish-audio/s2.1-pro-free:free";
  const voice = process.env.MAYA_TTS_VOICE || "";

  return new OpenRouterFishAudioProvider(apiKey, model, voice);
}
