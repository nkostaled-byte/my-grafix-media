"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMayaVoice } from "./useMayaVoice";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

type MayaResponse = {
  reply: string;
  lead?: {
    name?: string;
    company?: string;
    email?: string;
    projectType?: string;
    goals?: string;
  };
  escalated?: boolean;
};

const starters = [
  "I need a website",
  "I want to improve my brand",
  "Tell me about AI agents",
  "I have a project in mind",
];

const welcome: Message = {
  role: "assistant",
  content:
    "Hi, I’m Maya. I can help you explore My Grafix Media, find the right direction for your business, or help you start a project.",
};

const EASE = [0.33, 1, 0.68, 1] as const;

export function MayaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  /* Whether the turn in flight was spoken, so the status line can say
     "Thinking…" and the reply can be voiced. */
  const [voiceTurn, setVoiceTurn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const voice = useMayaVoice({
    onTranscript: (text) => void sendMessage(text, { voice: true }),
  });

  const { stopAll: stopVoice } = useMayaVoice({
    onTranscript: (text) => void sendMessage(text, { voice: true }),
  });

  const closePanel = useCallback(() => {
    stopVoice();
    setOpen(false);
  }, [stopVoice]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closePanel]);

  async function sendMessage(
    value = input,
    turn: { voice?: boolean } = {}
  ) {
    const message = value.trim();
    if (!message || sending) return;

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setInput("");
    setVoiceTurn(!!turn.voice);
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/maya/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: nextMessages.slice(-12),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) throw new Error("Maya unavailable");

      const data = payload.data as MayaResponse;
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
      /* Same conversation, spoken: the reply goes to the voice layer. */
      if (turn.voice) {
        setVoiceTurn(false);
        await voice.speakReply(data.reply);
      }
    } catch {
      setError(
        "I’m having a little trouble connecting right now. You can still start a project below and the My Grafix Media team will get back to you."
      );
      setVoiceTurn(false);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.45 }}
        onClick={() => setOpen(true)}
        aria-label="Open Maya assistant"
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground hairline backdrop-blur-xl transition-colors duration-200 hover:bg-surface-raised hover:hairline-strong"
      >
        <MayaMark compact />
        <span>Ask Maya</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close Maya assistant"
              onClick={closePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px]"
            />
            <motion.section
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="maya-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed inset-x-3 bottom-3 z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[12px] card-elevated bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[min(380px,calc(100vw-3rem))]"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <MayaMark />
                  <div>
                    <h2 id="maya-title" className="text-sm font-semibold tracking-[-0.02em]">
                      Maya
                    </h2>
                    <p className="mono-label text-subtle">My Grafix Media concierge</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  aria-label="Close Maya"
                  className="rounded-[6px] p-2 text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-foreground"
                >
                  <span aria-hidden="true" className="text-lg leading-none">×</span>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5" aria-live="polite">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                      <p className={message.role === "user" ? "max-w-[86%] rounded-[8px] rounded-br-[3px] bg-foreground px-3.5 py-2.5 text-sm leading-relaxed text-background" : "max-w-[92%] rounded-[8px] rounded-bl-[3px] bg-surface-raised px-3.5 py-2.5 text-sm leading-relaxed text-foreground hairline"}>
                        {message.content}
                      </p>
                    </div>
                  ))}

                  {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {starters.map((starter) => (
                        <button
                          type="button"
                          key={starter}
                          onClick={() => sendMessage(starter)}
                          className="rounded-[6px] px-3 py-2 text-left text-xs text-muted hairline transition-colors duration-200 hover:text-accent-brand hover:hairline-strong"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  )}

                  {sending && (
                    <p
                      className="mono-label flex items-center gap-2 text-subtle"
                      aria-label="Maya is responding"
                    >
                      Maya is responding
                      <span className="flex items-center gap-1" aria-hidden="true">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="node-pulse h-1 w-1 rounded-full bg-accent-brand"
                            style={{
                              animationDelay: `${i * 0.22}s`,
                              animationDuration: "1.2s",
                            }}
                          />
                        ))}
                      </span>
                    </p>
                  )}
                  {error && (
                    <div className="space-y-3 rounded-[8px] bg-surface-raised px-3.5 py-3 text-sm leading-relaxed text-muted hairline">
                      <p>{error}</p>
                      <Link href="/contact" onClick={() => setOpen(false)} className="inline-flex font-medium text-accent-brand underline-offset-4 hover:underline">
                        Start a Project
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border p-4">
                {/* Voice status — text first, motion only as reinforcement */}
                {sending && voiceTurn ? null : voice.phase !== "idle" && (
                  <VoiceStatus voice={voice} />
                )}
                {sending && voiceTurn && (
                  <p
                    className="mono-label mb-2 flex items-center gap-2 text-subtle"
                    aria-live="polite"
                  >
                    Thinking
                    <span className="flex items-center gap-1" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="node-pulse h-1 w-1 rounded-full bg-accent-brand"
                          style={{
                            animationDelay: `${i * 0.22}s`,
                            animationDuration: "1.2s",
                          }}
                        />
                      ))}
                    </span>
                  </p>
                )}
                <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="flex items-center gap-2">
                  {voice.phase !== "unsupported" && (
                    <VoiceButton voice={voice} disabled={sending} />
                  )}
                  <label htmlFor="maya-message" className="sr-only">Message Maya</label>
                  <input
                    ref={inputRef}
                    id="maya-message"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask Maya anything…"
                    maxLength={1200}
                    disabled={sending}
                    className="min-w-0 flex-1 rounded-[6px] bg-surface-raised px-3.5 py-2.5 text-sm text-foreground border border-border outline-none transition-colors placeholder:text-subtle focus:border-accent-brand"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || sending}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-foreground text-background transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
                <p className="kicker mt-3 text-center text-subtle">Design · Digital · Intelligence</p>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MayaMark({ compact = false }: { compact?: boolean }) {
  return (
    <span aria-hidden="true" className={compact ? "grid h-4 w-4 grid-cols-2 overflow-hidden rounded-[4px]" : "grid h-8 w-8 grid-cols-2 overflow-hidden rounded-[6px]"}>
      <span className="bg-[#35abd1]" />
      <span className="bg-[#f18954]" />
      <span className="bg-[#6e67d1]" />
      <span className="bg-[#d84796]" />
    </span>
  );
}

/* ---------- Voice interface layer ---------- */

function MicIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={active ? "text-accent-brand" : undefined}
    >
      <rect
        x="6"
        y="1.75"
        width="4"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M3.5 7.75a4.5 4.5 0 0 0 9 0"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M8 12.25v2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4.75" y="4.75" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function VoiceButton({
  voice,
  disabled,
}: {
  voice: ReturnType<typeof useMayaVoice>;
  disabled: boolean;
}) {
  const speaking = voice.phase === "speaking";
  const listening = voice.phase === "listening";

  const label = speaking
    ? "Stop Maya speaking and talk"
    : listening
      ? "Stop listening"
      : "Talk to Maya";

  return (
    <button
      type="button"
      onClick={voice.toggle}
      disabled={disabled}
      aria-label={label}
      aria-pressed={listening}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border transition-colors duration-200",
        listening
          ? "border-accent-brand text-accent-brand"
          : speaking
            ? "border-border text-foreground"
            : "border-border text-muted hover:border-accent-brand hover:text-accent-brand",
        disabled && "cursor-not-allowed opacity-35"
      )}
    >
      {speaking ? <StopIcon /> : <MicIcon active={listening} />}
      {listening && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[6px] ring-1 ring-accent-brand/60"
        />
      )}
    </button>
  );
}

function VoiceStatus({ voice }: { voice: ReturnType<typeof useMayaVoice> }) {
  switch (voice.phase) {
    case "listening":
      return (
        <p
          className="mono-label mb-2 flex items-center gap-2 text-accent-brand"
          aria-live="polite"
        >
          Listening
          {voice.interim ? (
            <span className="text-muted">“{voice.interim}”</span>
          ) : (
            <span className="flex items-center gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="node-pulse h-1 w-1 rounded-full bg-accent-brand"
                  style={{
                    animationDelay: `${i * 0.22}s`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </span>
          )}
          <span className="text-subtle">— press again to send</span>
        </p>
      );
    case "transcribing":
      return (
        <p className="mono-label mb-2 text-subtle" aria-live="polite">
          Preparing your words…
        </p>
      );
    case "speaking":
      return (
        <p
          className="mono-label mb-2 flex items-center gap-2 text-subtle"
          aria-live="polite"
        >
          Maya is speaking
          <span className="flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="node-pulse h-1 w-1 rounded-full bg-accent-brand"
                style={{
                  animationDelay: `${i * 0.22}s`,
                  animationDuration: "1.2s",
                }}
              />
            ))}
          </span>
          <span className="text-subtle">— press the mic to interrupt</span>
        </p>
      );
    case "unsupported":
      return (
        <p className="mono-label mb-2 text-subtle" aria-live="polite">
          Voice isn’t available in this browser — Maya still listens by text
          below.
        </p>
      );
    case "permission-denied":
    case "error": {
      const blockedUrl = voice.blockedAudioUrl;
      return (
        <div className="mb-2 space-y-2">
          <p className="text-sm leading-relaxed text-muted" aria-live="assertive">
            {voice.message}
          </p>
          {blockedUrl && (
            <button
              type="button"
              onClick={() => {
                void new Audio(blockedUrl).play();
              }}
              className="mono-label text-accent-brand underline-offset-4 hover:underline"
            >
              Play reply
            </button>
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

