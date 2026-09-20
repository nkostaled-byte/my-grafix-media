"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { UIEvent } from "react";

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

/* Follow threshold: how close to the bottom counts as "reading the newest
   messages" when a reply arrives. */
const FOLLOW_THRESHOLD = 80;

export function MayaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const followRef = useRef(true);

  const closePanel = useCallback(() => {
    setOpen(false);
  }, []);

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

  /* Follow new messages only when the visitor is already near the bottom. */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !followRef.current) return;
    container.scrollTo({ top: container.scrollHeight });
  }, [messages, sending, error]);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const distance = container.scrollHeight - container.scrollTop - container.clientHeight;
    followRef.current = distance <= FOLLOW_THRESHOLD;
  }, []);

  async function sendMessage(value = input) {
    const message = value.trim();
    if (!message || sending) return;

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setInput("");
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
    } catch {
      setError(
        "I’m having a little trouble connecting right now. You can still start a project below and the My Grafix Media team will get back to you."
      );
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
        className="fixed bottom-6 right-6 z-40 inline-flex h-11 items-center gap-2.5 rounded-[6px] bg-background/90 px-5 text-sm font-medium text-foreground hairline backdrop-blur-xl transition-all duration-200 ease-out hover:bg-surface-raised hover:hairline-strong active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-brand"
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="maya-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed inset-x-2.5 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 h-[min(80dvh,640px)] max-h-[85dvh] flex flex-col overflow-hidden rounded-[12px] border border-border card-elevated bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[min(380px,calc(100vw-3rem))] sm:h-[min(560px,calc(100dvh-3rem))]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border pl-5 pr-2.5 py-2.5">
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
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-foreground"
                >
                  <span aria-hidden="true" className="text-lg leading-none">×</span>
                </button>
              </div>

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5"
                aria-live="polite"
              >
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                      <p className={message.role === "user" ? "max-w-[86%] rounded-[10px] rounded-br-[3px] bg-foreground px-3.5 py-2.5 text-sm leading-relaxed text-background" : "max-w-[92%] rounded-[10px] rounded-bl-[3px] bg-surface-raised px-3.5 py-2.5 text-sm leading-relaxed text-foreground hairline"}>
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
                          onClick={() => {
                            followRef.current = true;
                            void sendMessage(starter);
                          }}
                          className="rounded-[8px] px-3 py-2 text-left text-xs text-muted hairline transition-colors duration-200 hover:text-accent-brand hover:hairline-strong"
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
                    <div className="space-y-3 rounded-[10px] bg-surface-raised px-3.5 py-3 text-sm leading-relaxed text-muted hairline">
                      <p>{error}</p>
                      <Link href="/contact" onClick={() => setOpen(false)} className="inline-flex font-medium text-accent-brand underline-offset-4 hover:underline">
                        Start a Project
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="flex items-center gap-2">
                  <label htmlFor="maya-message" className="sr-only">Message Maya</label>
                  <input
                    ref={inputRef}
                    id="maya-message"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask Maya anything…"
                    maxLength={1200}
                    disabled={sending}
                    className="min-w-0 flex-1 rounded-[8px] bg-surface-raised px-3.5 py-2.5 text-base text-foreground border border-border outline-none transition-colors placeholder:text-subtle focus:border-accent-brand"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || sending}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-foreground text-background transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
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
